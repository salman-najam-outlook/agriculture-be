const express = require("express");
const router = express.Router();
const _ = require("lodash");
const moment = require("moment");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { success } = require(rootPath + "/helpers/language");
const { successResp, successRespSync, serverError, errorRespSync } = require(rootPath + "/helpers/api");
const S3 = require(rootPath + "/components/s3upload");
const { v4: randomSting } = require("uuid");
const { addOfflineFarmer } = require(rootPath + "/common/addOfflineFarmer");
const { listValidation } = require(rootPath + "/helpers/validation");
const validatorPurchaseOrder = require(rootPath +
  "/helpers/validators/purchaseOrder");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

const generatePDF = require(rootPath + "/helpers/pdfGenerator");

const circularJson = (array) => {
  return JSON.stringify(array, (key, value) => {
    // If the value is an object with a "parent" property, it's a circular reference
    if (key === "parent" && typeof value === "object" && value !== null) {
      return; // return undefined to remove the circular reference
    }
    return value; // return the original value for other properties
  });
};

/**
 * @swagger
 * /admin/coffee/buying-station/purchase-order:
 *   post:
 *     summary: create purchase order
 *     description: create purchase order
 *     tags: [Admin-BuyingStation-PurchaseOrder]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  buyingStationId:
 *                    type: integer
 *                  farmerId:
 *                    type: integer
 *                  farmId:
 *                    type: integer
 *                  plantationId:
 *                    type: integer
 *                  speciesId:
 *                    type: integer
 *                  varietyId:
 *                    type: integer
 *                  coffeeCherryQty:
 *                    type: float
 *                  coffeeCherryQlty:
 *                    type: string
 *                    enum: [A,B,C,D,E]
 *                  perKgPrice:
 *                    type: float
 *                  grandTotal:
 *                    type: float
 *                  isPaid:
 *                    type: boolean
 *                  purchasedAt:
 *                    type: date
 *                  coffeeCherryPic:
 *                    type: string
 *            example: { "farmerId": "265", "farmId": "265","plantationId": "265", "speciesId": "265", "varietyId": "265",  "coffeeCherryQty": "1", "coffeeCherryQlty": "C", "perKgPrice": "1000", "grandTotal": "1000", "isPaid": "1", "purchasedAt": "12/20/2022", "coffeeCherryPic": "data:image/png;base64," }
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                 example: { "success": true, "code": 200, "message": "Inserted successfully.", "data": { "purchasedAt": "12/20/2022", "dateOfEntry": "07/05/2022", "id": 9, "buyingStationId": 17, "farmerId": "265", "coffeeCherryQty": "1", "coffeeCherryQlty": "C", "perKgPrice": "1000", "grandTotal": "1000", "coffeeCherryPic": { "location": "https://dimitra-public-images.s3.amazonaws.com/31459e7b-a255-4b9f-a10e-29eca2c9c85e.1657018448628.png", "key": "31459e7b-a255-4b9f-a10e-29eca2c9c85e.1657018448628.png" }, "updatedAt": "2022-07-05T10:54:10.247Z", "createdAt": "2022-07-05T10:54:10.213Z", "orderCode": "PO-0009" } }
 *
 */
router.post(
  "/",
  auth,
  validatorPurchaseOrder.createPurchaseOrderAdmin(),
  validationErrorHandler,
  async (req, res) => {
    try {
      // const  = req.user.id;
      const {
        buyingStationId,
        farmerId,
        farmId,
        plantationId,
        speciesId,
        varietyId,
        coffeeCherryQty,
        coffeeCherryQlty,
        perKgPrice,
        grandTotal,
        purchasedAt,
        coffeeCherryPic,
        coffeeTypeId,
      } = req.body;

      let set = {
        buyingStationId,
        farmerId,
        farmId,
        plantationId,
        speciesId,
        varietyId,
        coffeeCherryQty,
        coffeeCherryQlty,
        perKgPrice,
        grandTotal: parseFloat(grandTotal),
        coffeeTypeId,
        purchasedAt: moment
          .utc(purchasedAt, process.env.ACCEPT_DATE_FORMAT)
          .format(process.env.DB_ONLYDATE_FORMAT),
      };

      if (!_.isEmpty(coffeeCherryPic)) {
        const uploadedFile = await S3.uploadBase64({
          bucket: process.env.AWS_PUBLIC_BUCKET,
          fileName: `buyingStation/cherry/${randomSting()}`,
          base64: coffeeCherryPic,
        });
        set = {
          ...set,
          coffeeCherryPic: {
            s3_key: uploadedFile.Key,
            file_name: uploadedFile.Location,
          },
        };
      }

      var transaction = await db.sequelize.transaction();

      let buyingStationOrder = await db.BuyingStationOrder.create(set, {
        transaction,
      });
      orderCode = `PO-000${buyingStationOrder?.id}`;
      await buyingStationOrder.set({ orderCode }).save({ transaction });

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: buyingStationOrder,
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.post(
  "/update",
  auth,
  async function(req, res) {
    try {
      let { status } = req.query;
      let {buyingStation, buyingStationId, parentAccount } = req.body;
      let updatedBuyingStation;
      if (status === 'local') {
        let set = {
          userId: parentAccount,
          buyingStationOrderId: buyingStation,
        }
        const exist = db.BuyingStationFarmer.findOne({ where: { userId: buyingStationId }})
        if (exist) {
          db.BuyingStationFarmer.update({ buyingStationOrderId: buyingStation }, { where: { userId: buyingStationId} })
        } else {
          await db.BuyingStationFarmer.create(set);
        }
        updatedBuyingStation = await db.BuyingStationOrder.update({ buyingStationId: parentAccount, status: 'local'}, { where: {
          id: buyingStation
        }});
      } else if (status === 'global') {
        updatedBuyingStation = await db.BuyingStationOrder.update({ status: 'global'}, { where: {
          id: buyingStation
        }});
      } else if (status === 'merged') {
         updatedBuyingStation = await db.BuyingStationOrder.update({ buyingStationId: parentAccount, status: 'merged'}, 
         { where: { id: buyingStation }})
      }
      res.json(
        await successResp({
          msg: success.UPDATED,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
)

router.get(
  "/list",
  auth,
  listValidation(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { organization } = req.user;
      let { page = 1, limit = 10, order, search } = req.query;
      limit = parseInt(limit);

      let where;
      if (!_.isEmpty(search)) {
        const fields = ["firstName","middleName", "lastName"];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        where = { [db.Sequelize.Op.or]: searchQuery };
      }
      const data = await db.BuyingStationOrder.findAndCountAll({
        include: [
          {
            model: db.user,
            as: "farmer",
            attributes: ["fullName", "firstName","middleName", "lastName", "address"],
            where: { ...where, organization },
          },
          {
            model: db.user,
            as: "buyingStation",
            attributes: ["fullName", "firstName","middleName", "lastName", "address"],
            where: { organization },
          },
        ],
        offset: (page - 1) * limit,
        limit: limit,
        order: [["createdAt", order]],
        distinct: true,
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            count: data.count,
            numRows: data.rows?.length || 0,
            rows: data.rows,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.post("/import", auth, validationErrorHandler, async (req, res) => {
  try {
    const { buyingStationId, data } = req.body;

    data.map(async (po) => {
      let farmerId;
      const farmer = await db.user.findOne({
        attributes: ["id"],
        where: {
          id: po.FarmerID,
          organization: req.user.organization,
          active: true,
        },
      });
      if (!farmer) {
        req.body = {
          ...req.body,
          name: po.FarmerName,
          address: po.FarmerAddress,
        };
        farmerId = await addOfflineFarmer(req, res, true);
      }
      let set = {
        buyingStationId,
        farmerId: farmer?.id ? po.FarmerID : farmerId,
        coffeeCherryQty: po.Quantity,
        coffeeCherryQlty: po.Quality,
        perKgPrice: po.PricePerKG,
        grandTotal: po.Quantity * po.PricePerKG,
        purchasedAt: moment
          .utc(po.PurchaseDate, process.env.ACCEPT_DATE_FORMAT)
          .format(process.env.DB_ONLYDATE_FORMAT),
      };
      let buyingStationOrder = await db.BuyingStationOrder.create(set);
      orderCode = `PO-000${buyingStationOrder?.id}`;
      await buyingStationOrder.set({ orderCode }).save();
    });
    return res.json(
      successRespSync({
        msg: success.REGISTERED,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /admin/coffee/buying-station/purchase-order:
 *   put:
 *     summary: update purchase order with order code
 *     description: update purchase order with order code
 *     tags: [Admin-BuyingStation-PurchaseOrder]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  orderId:
 *                    type: integer
 *                  farmerId:
 *                    type: integer
 *                  farmId:
 *                    type: integer
 *                  plantationId:
 *                    type: integer
 *                  speciesId:
 *                    type: integer
 *                  varietyId:
 *                    type: integer
 *                  coffeeCherryQty:
 *                    type: float
 *                  coffeeCherryQlty:
 *                    type: string
 *                    enum: [A,B,C,D,E]
 *                  perKgPrice:
 *                    type: float
 *                  grandTotal:
 *                    type: float
 *                  isPaid:
 *                    type: boolean
 *                  purchasedAt:
 *                    type: date
 *                  coffeeCherryPic:
 *                    type: string
 *            example: { "orderId": "22", "buyingStationId": "273", "farmerId": "265", "farmId": "265", "plantationId": "265", "speciesId": "2", "varietyId": "3", "coffeeCherryQty": "10000", "coffeeCherryQlty": "B", "perKgPrice": "250", "grandTotal": "2500000", "purchasedAt": "12/20/2022", "coffeeCherryPic": data:image/png;base64, "isPaid": "1" }
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                 example: { "success": true, "code": 200, "message": "saved successfully.", "data": { "purchasedAt": "12/20/2022", "dateOfEntry": "12/07/2022", "id": 22, "orderCode": "PO-00022", "farmerId": 265, "farmId": 265, "plantationId": 265, "speciesId": 2, "varietyId": 3, "buyingStationId": 273, "coffeeCherryQty": 10000, "coffeeCherryQlty": "B", "coffeeCherryPic": { "s3_key": "cherry-122", "file_name": "https://dimitra-public-images.s3.amazonaws.com/cherry-122" }, "perKgPrice": 250, "grandTotal": 2500000, "createdAt": "2022-12-07T08:08:08.000Z", "farmer": { "id": 265, "firstName": "santosh", "lastName": null }, "userFarms": { "id": 265, "farmName": "farm-1" }, "coffeeVariety": { "id": 3, "name": "Test Coffee variety 1" }, "coffeeSpecies": { "id": 2, "name": "Robusta" }, "plantations": null, "qrCodeDataString": "{\"id\":22,\"perKgPrice\":250,\"grandTotal\":2500000,\"farmer\":{\"id\":265,\"firstName\":\"santosh\",\"lastName\":null},\"coffeeCherryQty\":10000,\"purchasedAt\":\"12/20/2022\",\"orderCode\":\"PO-00022\"}" } }
 *
 */
router.put(
  "/",
  auth,
  validatorPurchaseOrder.updatePurchaseOrderAdmin(),
  validationErrorHandler,
  async (req, res) => {
    try {
      // const  = req.user.id;
      const {
        orderId,
        buyingStationId,
        farmerId,
        farmId,
        plantationId,
        speciesId,
        varietyId,
        coffeeCherryQty,
        coffeeCherryQlty,
        perKgPrice,
        grandTotal,
        purchasedAt,
        coffeeTypeId,
        coffeeCherryPic,
      } = req.body;

      let set = {
        buyingStationId,
        farmerId,
        farmId,
        plantationId,
        speciesId,
        varietyId,
        coffeeCherryQty,
        coffeeCherryQlty,
        coffeeTypeId,
        perKgPrice,
        grandTotal,
        purchasedAt: moment
          .utc(purchasedAt, process.env.ACCEPT_DATE_FORMAT)
          .format(process.env.DB_ONLYDATE_FORMAT),
      };

      if (!_.isEmpty(coffeeCherryPic)) {
        const uploadedFile = await S3.uploadBase64({
          bucket: process.env.AWS_PUBLIC_BUCKET,
          fileName: `buyingStation/cherry/${randomSting()}`,
          base64: coffeeCherryPic,
        });
        set = {
          ...set,
          coffeeCherryPic: {
            s3_key: uploadedFile.Key,
            file_name: uploadedFile.Location,
          },
        };
      }

      const where = { id: orderId };
      await db.BuyingStationOrder.update(set, { where });
      const order = await getPurchaseOrder(where);

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

/**
 * @swagger
 * /admin/coffee/buying-station/purchase-order:
 *   delete:
 *     summary: delete purchase order with id
 *     description: delete purchase order with id
 *     tags: [Admin-BuyingStation-PurchaseOrder]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            example: { "orderId": 3 }
 *            schema:
 *              type: object
 *              properties:
 *                  orderId:
 *                    type: integer
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
 *               example: { "success": true, "code": 200, "message": "Deleted successfully.", "data": { "id": 3, "orderCode": "PO-0003", "isdeleted": "2022-12-08T06:45:46.149Z", "updatedAt": "2022-12-08T06:45:46.149Z" } }
 */
router.delete(
  "/",
  auth,
  validatorPurchaseOrder.deletePurchaseOrderAdmin(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { orderId: id } = req.body;

      let where = { id };
      const order = await db.BuyingStationOrder.findOne({
        where,
        attributes: ["id", "orderCode"],
      });
      if (order === null) throw new Error("order doesn't exist");

      // delete the order
      await order?.destroy();

      return res.json(
        successRespSync({
          msg: success.DELETED,
          data: order,
        })
      );
    } catch (err) {
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

/**
 * @description get purchase order details with order code
 * @param {*} where
 */
async function getPurchaseOrder(where) {
  const order = await (
    await db.BuyingStationOrder.findOne({
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
          model: db.CoffeeVariety,
          as: "coffeeVariety",
          attributes: ["id", "name"],
        },
        {
          model: db.CoffeeSpecies,
          as: "coffeeSpecies",
          attributes: ["id", "name"],
        },
        {
          model: db.Plantations,
          as: "plantations",
          attributes: ["id", "plantation_name"],
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
      coffeeCherryQty: order?.coffeeCherryQty,
      purchasedAt: order?.purchasedAt,
      orderCode: order?.orderCode,
    };
    order.qrCodeDataString = JSON.stringify(qrCodeData);
  }

  return order;
}

router.get(
  "/download/:type",
  auth,
  listValidation(),
  validationErrorHandler,
  async function (req, res) {
    try {
      const { organization } = req.user;
      let { type } = req.params;
      let { page = 1, limit = 10, order, search } = req.query;
      limit = parseInt(limit);

      let where;
      if (!_.isEmpty(search)) {
        const fields = ["firstName","middleName", "lastName"];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        where = { [db.Sequelize.Op.or]: searchQuery };
      }
      let data = await db.BuyingStationOrder.findAll({
        include: [
          {
            model: db.user,
            as: "farmer",
            attributes: [],
            where: { ...where, organization },
          },
          {
            model: db.user,
            as: "buyingStation",
            attributes: [],
            where: { organization },
          },
        ],
        attributes: [
          [
            db.Sequelize.fn(
              "CONCAT",
              db.Sequelize.fn(
                "COALESCE",
                db.Sequelize.col("farmer.firstName"),
                ""
              ),
              " ",
              db.Sequelize.fn(
                "COALESCE",
                db.Sequelize.col("farmer.middleName"),
                ""
              ),
              " ",
              db.Sequelize.fn(
                "COALESCE",
                db.Sequelize.col("farmer.lastName"),
                ""
              )
            ),
            "Name", // Alias for the concatenated full name of the farmer including middle name
          ],
          [
            db.Sequelize.fn(
              "COALESCE",
              db.Sequelize.col("farmer.address"),
              ""
            ),
            "Address", // Alias for the farmer's address
          ],
          [
            db.Sequelize.fn(
              "CONCAT",
              db.Sequelize.fn(
                "COALESCE",
                db.Sequelize.col("buyingStation.firstName"),
                ""
              ),
              " ",
              db.Sequelize.fn(
                "COALESCE",
                db.Sequelize.col("buyingStation.middleName"),
                ""
              ),
              " ",
              db.Sequelize.fn(
                "COALESCE",
                db.Sequelize.col("buyingStation.lastName"),
                ""
              )
            ),
            "Buying Station", // Alias for the concatenated full name of the buying station including middle name
          ],
          ["purchasedAt", "Registration Date"], // Alias for the purchase date
          ["coffeeCherryQty", "Quantity"], // Alias for the quantity of coffee cherries
          ["perKgPrice", "Price Per KG"], // Alias for the price per kilogram
        ],
        
        offset: (page - 1) * limit,
        limit: limit,
        order: [["createdAt", order]],
        distinct: true,
      });

      data = JSON.parse(circularJson(data));

      let filepath = "";
      if (type === "pdf") {
        const _data = {
          title: "Manage Offline Farmer",
          subHeader: {
            report: "Manage Offline Farmer",
          },
          tableData: data,
        };
        const pdfData = await generatePDF(_data, req);
        if (!pdfData) {
          return res.json(
            errorRespSync({
              msg: "PDF report generation failed.",
            })
          );
        } else {
          res.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "attachment; filename=" + pdfData.fileName,
          });
          fs.createReadStream(pdfData.path).pipe(res);
          return;
        }
      } else if (type === "csv") {
        filepath = await generateExcelReport("csv", data);

        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename=manageOffilineFarmer.csv`,
        });
        fs.createReadStream(filepath).pipe(res);
        return;
      } else if (type === "xlsx") {
        filepath = await generateExcelReport("xlsx", data);

        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename=manageOffilineFarmer.xlsx`,
        });
        fs.createReadStream(filepath).pipe(res);
        return;
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

const generateExcelReport = async (csvOrXlsx, response) => {
  try {
    const workbook = XLSX.utils.book_new();

    const directoryPath = "files";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const worksheet = XLSX.utils.json_to_sheet(response);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Order Report");

    const filePath = path.resolve(
      __dirname,
      `../../../../../files/purchase-order-report.xlsx`
    );
    XLSX.writeFile(workbook, filePath);

    if (csvOrXlsx === "xlsx") {
      return filePath;
    }

    if (csvOrXlsx === "csv") {
      const csvWorkbook = XLSX.readFile(filePath);
      const csvWorksheet = csvWorkbook.Sheets[csvWorkbook.SheetNames[0]];
      const csvData = XLSX.utils.sheet_to_csv(csvWorksheet);
      const csvFilePath = path.resolve(
        __dirname,
        `../../../../../files/purchase-order-report.csv`
      );
      fs.writeFileSync(csvFilePath, csvData, "utf-8");
      return csvFilePath;
    }

    return;
  } catch (err) {
    console.log("Error processing request: " + err);
  }
};
module.exports = router;
