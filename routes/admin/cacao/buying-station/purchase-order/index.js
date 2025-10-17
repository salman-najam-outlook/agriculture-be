const _ = require("lodash");
const moment = require("moment");
const express = require("express");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const db = require(rootPath + "/models");
const { Op } = require("sequelize");
const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const validatorPurchaseOrder = require(rootPath +
  "/helpers/validators/purchaseOrder");
const validatorCacaoPurchaseOrder = require(rootPath +
  "/helpers/validators/cacao/purchase-order");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const S3 = require(rootPath + "/components/s3upload");
const QRCode = require("qrcode");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
const { syncCacaoPurchaseOrderDataToOCC } = require(rootPath + '/helpers/occ-komodo');

/**
 * CREATE PURCHASE ORDER
 */
router.post(
  "/",
  auth,
  // validatorPurchaseOrder.post(),
  duplicateRecordId.handleDuplicateRecordId("CacaoPurchaseOrder"),
  validationErrorHandler,
  async (req, res) => {
    let transaction = await db.sequelize.transaction();
    try {
      let purchaseOrder;
      if (req.body.farmerId && req.body.farmId) {
        purchaseOrder = await createCacaoPurchaseOrder(req, res, transaction);
        await transaction.commit();
        await syncCacaoPurchaseOrderDataToOCC(purchaseOrder?.id);
        return res.json(
          successRespSync({
            msg: success.REGISTERED,
            data: purchaseOrder,
          })
        );
      } else if (req.body.farmerId > 0) {
        let {
          firstName,
          middleName,
          lastName,
          purchaseOrderId,
          address,
          longitude,
          latitude,
        } = req.body;
        purchaseOrder = await createCacaoPurchaseOrder(
          req,
          res,
          transaction,
          req.body.farmerId
        );

        let offlineUser = await db.user.findOne({
          where: {
            id: req.body.farmerId,
          },
        });

        if (offlineUser.userType == "offline") {
          await db.CacaoBuyingStationFarmer.bulkCreate(
            [{ userId: req.body.farmerId, address, longitude, latitude }],
            {
              transaction,
              updateOnDuplicate: ["address", "longitude", "latitude"],
            }
          );
        }
        await transaction.commit();
        await syncCacaoPurchaseOrderDataToOCC(purchaseOrder?.id);

        return res.json(
          successRespSync({
            msg: success.REGISTERED,
            data: purchaseOrder,
          })
        );
      } else {
        let { firstName, lastName,middleName, address, longitude, latitude, userId } =
          req.body;
        let newUserId = await db.user.create({
          firstName,
          middleName,
          lastName,
          organization: req.user.organization,
          userType: "offline",
          source: 'saas_api_cacao_purchase_order'
        });

        //assign membership
        let membershipRes = await db.sequelize.query(`SELECT
          u.*
            FROM
              (
              SELECT
                um.*
              FROM
                user_role_membership_map AS um
              WHERE
                um.user_role_id = 'coffee_farmer'
                AND um.membership_id NOT IN (
                SELECT
                  membership_id
                FROM
                  user_role_membership_map
                WHERE
                  user_role_id = 'buying_station'
                )
            ) AS urmm
            INNER JOIN user_membership AS u ON
              urmm.membership_id = u.id
            where
          u.org_id = ${req.user.organization};`);
        if (
          membershipRes &&
          Array.isArray(membershipRes) &&
          membershipRes.length > 0
        ) {
          await db.UserMembershipMap.create({
            user_id: newUserId.id,
            membership_id: membershipRes[0][0].id,
          });
        }

        userId = newUserId.id;
        purchaseOrder = await createCacaoPurchaseOrder(
          req,
          res,
          transaction,
          userId
        );

        await db.CacaoBuyingStationFarmer.bulkCreate(
          [
            {
              userId,
              purchaseOrderId: purchaseOrder.id,
              address,
              longitude,
              latitude,
            },
          ],
          {
            transaction,
            updateOnDuplicate: ["address", "longitude", "latitude"],
          }
        );
        await transaction.commit();
        await syncCacaoPurchaseOrderDataToOCC(purchaseOrder?.id);
        // await db.CacaoBuyingStationFarmer.create({ userId, purchaseOrderId: purchaseOrder.id, address, longitude, latitude });
        return res.json(
          successRespSync({
            msg: success.REGISTERED,
            data: purchaseOrder,
          })
        );
      }
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * LISTING PURCHASE ORDER
 */

router.get("/", auth, validationErrorHandler, async (req, res) => {
  try {
    const buyingStationId = req.user.id;
    const { organization } = req.user;
    let {
      page = 1,
      limit = 1000,
      col = "id",
      order = "desc",
      dateRange,
      farmer,
      search,
      // duration,
    } = req.query;
    limit = parseInt(limit);

    let where = { [db.Sequelize.Op.or]: [{ buyingStationId }] };
    if (!_.isEmpty(dateRange)) {
      dateRange = dateRange
        .split("-")
        ?.map((date) =>
          moment
            .utc(date, process.env.ACCEPT_DATE_FORMAT)
            .format(process.env.DB_ONLYDATE_FORMAT)
        );
      where.purchasedAt = { [db.Sequelize.Op.between]: dateRange };
    }
    if (!_.isEmpty(farmer)) {
      farmer = farmer.split("/");
      where.farmerId = farmer;
    }
    if (!_.isEmpty(search)) {
      const fields = ["perKgPrice", "grandTotal", "orderCode"];
      const searchQuery = fields.map((col) => {
        return {
          [col]: {
            [db.Sequelize.Op.substring]: search,
          },
        };
      });
      searchQuery.push(
        db.Sequelize.where(
          db.Sequelize.fn(
            "CONCAT",
            db.Sequelize.fn("COALESCE", db.Sequelize.literal("`farmer`.`firstName`"), ""),
            " ",
            db.Sequelize.fn("COALESCE", db.Sequelize.literal("`farmer`.`middleName`"), ""),
            " ",
            db.Sequelize.fn("COALESCE", db.Sequelize.literal("`farmer`.`lastName`"), "")
          ),
          {
            [db.Sequelize.Op.substring]: search,
          }
        )
      );

      where = { ...where, [db.Sequelize.Op.or]: searchQuery };
    }
    // if (!_.isEmpty(duration)) {
    //   let durationDate;
    //   switch (duration) {
    //     case '7days':
    //       durationDate = moment
    //         .utc()
    //         .subtract(7, 'days')
    //         .format(process.env.DB_ONLYDATE_FORMAT);
    //       where.createdAt = { [db.Sequelize.Op.gt]: durationDate };
    //       break;
    //     default:
    //   }
    //   console.log();
    // }

    let { count: totalRows, rows } =
      await db.CacaoPurchaseOrder.findAndCountAll({
        include: [
          {
            model: db.user,
            as: "farmer",
            attributes: ["id", "firstName", "address","middleName", "lastName", "userType"],
            // include: [
            //   {
            //     model: db.CacaoBuyingStationFarmer,
            //     as: "offlineFarmerData",
            //     required: false,
            //   },
            // ],
            where: { organization },
          },
          {
            model: db.CacaoBuyingStationLandImages,
            as: "cacaoBuyingStationLandImages",
            attributes: ["id", "file_name", "s3_key"],
          },
          {
            model: db.user_farm,
            as: "userFarms",
            attributes: ["id", "farmName"],
          },
          {
            model: db.Geofence,
            as: "segments",
            attributes: ["id", "geofenceName"],
          },
          {
            model: db.CacaoVariety,
            as: "cacaoVariety",
            attributes: ["id", "name"],
          },
          {
            model: db.CacaoSpecies,
            as: "cacaoSpecies",
            attributes: ["id", "name"],
          },
          {
            model: db.CacaoPlantations,
            as: "cacaoPlantations",
            attributes: ["id", "plantation_name"],
          },
          {
            model: db.CacaoPlantations,
            as: "cacaoPlantataionPurchaseOrder",
            attributes: ["id", "plantation_name"],
          },
        ],
        where,
        offset: (page - 1) * limit,
        limit: limit,
        order: [[col, order]],
        distinct: true,
        attributes: { exclude: ["updatedAt", "isdeleted"] },
      });

    rows = await Promise.all(
      rows?.map(async (order) => {
        order = await order.toJSON();

        const {
          id,
          perKgPrice,
          grandTotal,
          farmer,
          userFarms,
          purchasedAt,
          orderCode,
        } = order;
        const qrCodeData = {
          id,
          perKgPrice,
          grandTotal,
          farmer,
          userFarms,
          purchasedAt,
          orderCode,
        };
        let qrCodeDataString = JSON.stringify(qrCodeData);
        return { ...order, qrCodeDataString };
      })
    );

    let tempRow = JSON.parse(JSON.stringify(rows));
    let resRow = [];
    resRow = tempRow.map((r) => {
      return r;
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          cacaoPurchaseOrder: {
            totalRows,
            numRows: rows?.length ?? 0,
            rows: resRow,
          },
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get(
  "/orders",
  auth,
  validatorPurchaseOrder.list(),
  validationErrorHandler,
  async (req, res) => {
    // for creating processing batch only
    try {
      let { page = 1, limit = 10000 } = req.query;
      limit = parseInt(limit);

      const where = {};

      let rows = await db.CacaoPurchaseOrder.findAll({
        include: [
          {
            model: db.user,
            as: "farmer",
            attributes: ["firstName","middleName", "lastName"],
            // include: [
            //   {
            //     model: db.activationKeys,
            //     as: 'activation',
            //     where: {
            //       org_id: req.user.organization || 3
            //     },
            //     required: false,
            //   }
            // ]
          },
          {
            model: db.user_farm,
            as: "userFarms",
            attributes: ["id", "farmName"],
          },
          {
            model: db.Geofence,
            as: "segments",
            attributes: ["id", "geofenceName"],
          },
          {
            model: db.CacaoVariety,
            as: "cacaoVariety",
            attributes: ["id", "name"],
          },
          {
            model: db.CacaoSpecies,
            as: "cacaoSpecies",
            attributes: ["id", "name"],
          },
          {
            model: db.CacaoPlantations,
            as: "cacaoPlantations",
            attributes: ["id", "plantation_name"],
          },
          {
            model: db.user,
            as: "buyingStation",
          },
          {
            model: db.CacaoPlantations,
            as: "cacaoPlantataionPurchaseOrder",
            attributes: ["id", "plantation_name"],
          },
        ],
        attributes: [
          "id",
          "orderCode",
          "perKgPrice",
          "grandTotal",
          "purchasedAt",
        ],
        where,
        offset: (page - 1) * limit,
        limit: limit,
        order: [["id", "desc"]],
        distinct: true,
      });

      // org filter
      rows = rows.filter(
        (rowEl) => rowEl.buyingStation.organization == req.user.organization
      );

      // remove activation object
      let resRows = [];
      resRows = JSON.parse(JSON.stringify(rows));
      rows = resRows.map((rowEl) => {
        delete rowEl.farmer.activation;
        return rowEl;
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: rows,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.put(
  "/",
  auth,
  validatorCacaoPurchaseOrder.updatePurchaseOrderAdmin(),
  validationErrorHandler,
  async (req, res) => {
    try {
      // const  = req.user.id;
      const {
        buyer,
        premiumPrice,
        orderId,
        buyingStationId,
        farmerId,
        farmId,
        plantationId,
        speciesId,
        varietyId,
        cacaoWeight,
        deliveryMethodId,
        perKgPrice,
        grandTotal,
        purchasedAt,
        cacaoType,
      } = req.body;

      let set = {
        buyer,
        premiumPrice,
        buyingStationId,
        farmerId,
        farmId,
        cacao_plantation: plantationId,
        speciesId,
        varietyId,
        cacaoWeight,
        cacaoType,
        cacao_delivery_method_id: deliveryMethodId,
        perKgPrice,
        grandTotal,
        purchasedAt: moment
          .utc(purchasedAt, process.env.ACCEPT_DATE_FORMAT)
          .format(process.env.DB_ONLYDATE_FORMAT),
      };

      //   if (!_.isEmpty(coffeeCherryPic)) {
      //     const uploadedFile = await S3.uploadBase64({
      //       bucket: process.env.AWS_PUBLIC_BUCKET,
      //       fileName: `buyingStation/cherry/${randomSting()}`,
      //       base64: coffeeCherryPic,
      //     });
      //     set = {
      //       ...set,
      //       coffeeCherryPic: {
      //         s3_key: uploadedFile.Key,
      //         file_name: uploadedFile.Location,
      //       },
      //     };
      //   }

      const where = { id: orderId };
      await db.CacaoPurchaseOrder.update(set, { where });
      const order = await getPurchaseOrder(where);
      await syncCacaoPurchaseOrderDataToOCC(orderId);

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: order,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.delete(
  "/:orderId",
  auth,
  duplicateRecordId.handleDuplicateRecordId("CacaoPurchaseOrder"),
  validationErrorHandler,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      const { orderId } = req.params;

      let set = {
        isdeleted: new Date(),
      };

      var transaction = await db.sequelize.transaction();

      let cacaoPurchaseOrder = await db.CacaoPurchaseOrder.update(set, {
        where: {
          id: orderId,
        },
        transaction,
      });
      await transaction.commit();

      let resObj = await db.CacaoPurchaseOrder.findOne({
        where: {
          id: orderId,
        },
      });
      return res.json(
        successRespSync({
          msg: success.DELETED,
          data: resObj,
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /admin/coffee/buying-station/purchase-order/{orderCode}:
 *   get:
 *     summary: list all created purchase order
 *     description: list all created purchase order
 *     tags: [Admin-BuyingStation-PurchaseOrder]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "purchasedAt": "12/20/2022", "dateOfEntry": "12/07/2022", "id": 23, "orderCode": "PO-00023", "farmerId": 265, "farmId": 265, "plantationId": 265, "speciesId": 2, "varietyId": 3, "buyingStationId": 273, "coffeeCherryQty": 1000, "coffeeCherryQlty": "A", "coffeeCherryPic": { "s3_key": "cherry-122", "file_name": "https://dimitra-public-images.s3.amazonaws.com/cherry-122" }, "perKgPrice": 250, "grandTotal": 250000, "createdAt": "2022-12-07T08:09:45.000Z", "farmer": { "id": 265, "firstName": "santosh", "lastName": null }, "userFarms": { "id": 265, "farmName": "farm-1" }, "coffeeVariety": { "id": 3, "name": "Test Coffee variety 1" }, "coffeeSpecies": { "id": 2, "name": "Robusta" }, "plantations": null, "qrCodeDataString": "{\"id\":23,\"perKgPrice\":250,\"grandTotal\":250000,\"farmer\":{\"id\":265,\"firstName\":\"santosh\",\"lastName\":null},\"coffeeCherryQty\":1000,\"purchasedAt\":\"12/20/2022\",\"orderCode\":\"PO-00023\"}" } }
 */
router.get(
  "/:orderCode",
  auth,
  validatorPurchaseOrder.getPurchaseOrderAdmin(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { orderCode } = req.params;

      let where = { orderCode };
      const order = await getPurchaseOrder(where);

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: order,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.post("/update", auth, async function (req, res) {
  try {
    let { status } = req.query;
    let { buyingStation, buyingStationId, parentAccount } = req.body;
    let updatedBuyingStation;
    if (status === "local") {
      let set = {
        userId: buyingStationId,
        purchaseOrderId: buyingStation,
      };
      const exist = db.CacaoBuyingStationFarmer.findOne({
        where: { userId: buyingStationId },
      });
      if (exist) {
        db.CacaoBuyingStationFarmer.update(
          { purchaseOrderId: buyingStation },
          { where: { userId: buyingStationId } }
        );
      } else {
        await db.CacaoBuyingStationFarmer.create(set);
      }
      updatedBuyingStation = await db.CacaoPurchaseOrder.update(
        { buyingStationId: parentAccount, status: "local" },
        {
          where: {
            id: buyingStation,
          },
        }
      );
    } else if (status === "global") {
      updatedBuyingStation = await db.CacaoPurchaseOrder.update(
        { status: "global" },
        {
          where: {
            id: buyingStation,
          },
        }
      );
    } else if (status === "merged") {
      updatedBuyingStation = await db.CacaoPurchaseOrder.update(
        { buyingStationId: parentAccount, status: "merged" },
        { where: { id: buyingStation } }
      );
    }
    await syncCacaoPurchaseOrderDataToOCC(buyingStation);
    res.json(
      await successRespSync({
        msg: success.UPDATED,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @description get purchase order details with order code
 * @param {*} where
 */
async function getPurchaseOrder(where) {
  const order = await (
    await db.CacaoPurchaseOrder.findOne({
      include: [
        {
          model: db.user,
          as: "farmer",
          attributes: ["id", "firstName","middleName", "lastName"],
        },
        {
          model: db.user_farm,
          as: "userFarms",
          attributes: ["id", "farmName"],
        },
        {
          model: db.CacaoVariety,
          as: "cacaoVariety",
          attributes: ["id", "name"],
        },
        {
          model: db.CacaoSpecies,
          as: "cacaoSpecies",
          attributes: ["id", "name"],
        },
        {
          model: db.CacaoPlantations,
          as: "cacaoPlantataionPurchaseOrder",
          attributes: ["id", "plantation_name"],
        },
        {
          model: db.CacaoDeliveryMethod,
          as: "cacaoDeliveryMethods",
          attributes: ["id", "name"],
        },
      ],
      where,
      attributes: { exclude: ["updatedAt", "isdeleted"] },
    })
  )?.toJSON();

  // generate qr code string
  if (order) {
    const qrCodeData = {
      id: order?.id,
      perKgPrice: order?.perKgPrice,
      grandTotal: order?.grandTotal,
      farmer: order?.farmer,
      cacaoWeight: order?.cacao_weight,
      deliveryMethodId: order?.cacao_delivery_method_id,
      speciesId: order?.cacao_species,
      varietyId: order?.cacao_variety,
      plantationId: order?.cacao_plantation,
      purchasedAt: order?.purchasedAt,
      orderCode: order?.orderCode,
    };
    order.qrCodeDataString = JSON.stringify(qrCodeData);
  }

  return order;
}

// CREATE CACAO PURCHASE ORDER

async function createCacaoPurchaseOrder(req, res, transaction, newUserId) {
  const buyingStationId = req.user.id;
  const {
    buyer,
    premiumPrice,
    farmerId,
    farmId,
    zoneId,
    plantationId,
    speciesId,
    varietyId,
    cacaoWeight,
    cacaoWeighUnitId,
    cacaoType,
    perKgPrice,
    grandTotal,
    recordId,
    purchasedAt,
    deliveryMethodId,
    images,
  } = req.body;

  let set = {
    buyer, // Once registered_buyer table is available, it will reference id of that table
    premiumPrice,
    buyingStationId,
    farmerId: newUserId || farmerId,
    farmId,
    zoneId,
    // cacao_plantation: plantationId,
    cacao_species: speciesId,
    cacao_variety: varietyId,
    cacao_weight: cacaoWeight,
    cacao_weight_unit_id: cacaoWeighUnitId,
    cacao_type: cacaoType,
    perKgPrice,
    grandTotal,
    recordId,
    cacao_delivery_method_id: deliveryMethodId,
    purchasedAt: moment
      .utc(purchasedAt, process.env.ACCEPT_DATE_FORMAT)
      .format(process.env.DB_ONLYDATE_FORMAT),
  };

  let purchaseOrder = await db.CacaoPurchaseOrder.create(set, {
    transaction,
  });

  orderCode = `PO-000${purchaseOrder?.id}`;

  if (images && images.length > 0) {
    let filesArr = [];

    images.forEach(async (res, index) => {
      filesArr.push({
        purchase_id: purchaseOrder.id,
        s3_key: res.s3_key,
        file_name: `${
          process.env.PUBLIC_BUCKET_URL ||
          "https://dimitra-public-images.s3.amazonaws.com/"
        }${res.s3_key}`,
      });
    });
    await db.CacaoBuyingStationLandImages.bulkCreate(filesArr, { transaction });
  }

  if (purchaseOrder && purchaseOrder.id) {
    // Create plantation_purchaseorder table;

    if (plantationId && plantationId.length > 0) {
      let setData = plantationId?.map((pId) => ({
        plantationId: pId,
        purchaseOrderId: purchaseOrder.id,
      }));

      await db.CacaoPlantationPurchaseOrder.bulkCreate(setData, {
        transaction,
      });
    }

    await db.CacaoPurchaseOrder.update(
      { orderCode },
      {
        where: {
          id: purchaseOrder?.id,
        },
        transaction,
      }
    );

    purchaseOrder = await db.CacaoPurchaseOrder.findOne({
      where: {
        id: purchaseOrder?.id,
      },
      include: [
        {
          model: db.CacaoBuyingStationLandImages,
          as: "cacaoBuyingStationLandImages",
          attributes: ["id", "file_name", "s3_key"],
        },
      ],
      transaction,
    });
  }

  return purchaseOrder;
}

module.exports = router;
