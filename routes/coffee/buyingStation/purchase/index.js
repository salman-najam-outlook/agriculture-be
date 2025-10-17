const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { Op } = require('sequelize');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validatorPurchaseOrder = require(rootPath +
  '/helpers/validators/purchaseOrder');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const S3 = require(rootPath + '/components/s3upload');
const QRCode = require('qrcode');
const { createNotification, allAdmins, getWeightUnit, convertToHectares, convertToAlertsUnit } = require(rootPath + '/routes/notification/utils');
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId');
const translation = require(rootPath + "/middleware/translation");
const insertTraceabilityExternalId = require(rootPath + "/helpers/externalTracebilityId");


const getBuyingStationIncludes = (organization) => {
  return [
    {
      model: db.user,
      as: 'farmer',
      attributes: ['id', 'firstName', 'address','middleName', 'lastName', 'userType'],
      include: [
        {
          model: db.BuyingStationFarmer,
          as: "offlineFarmerData",
          required: false,
        },
      ],
      where: { organization },
    },
    {
      model: db.user_farm,
      as: 'userFarms',
      attributes: ['id', 'farmName'],
    },
    {
      model: db.Geofence,
      as: 'segments',
      attributes: ['id', 'geofenceName'],
    },
    {
      model:db.CacaoCoffeePurchaseBuyer,
      as:'coffeePurchaseBuyer',
      attributes:['id','name'] 
     },
    {
      model: db.CoffeeVariety,
      as: 'coffeeVariety',
      attributes: ["id", "name",],
    },
    {
      model: db.CoffeeSpecies,
      as: 'coffeeSpecies',
      attributes: ["id", "name",],
    },
    {
      model: db.Plantations,
      as: 'plantations',
      attributes: ['id', 'plantation_name'],
    },
    {
      model: db.CoffeeType,
      as: 'coffeeType',
      attributes: ['id', 'name'],
      required: false,
    },
  ];
}

const getPurchaseOrderResponseData = async (id, organization, translateFn) => {
  let purchaseOrderResponseData = await db.BuyingStationOrder.findOne({
    where: { id },
    include: getBuyingStationIncludes(organization),
  });
  purchaseOrderResponseData = purchaseOrderResponseData.toJSON();
  purchaseOrderResponseData.qrCodeDataString = JSON.stringify({
    id: purchaseOrderResponseData.id,
    perKgPrice: purchaseOrderResponseData.perKgPrice,
    grandTotal: purchaseOrderResponseData.grandTotal,
    farmer: purchaseOrderResponseData.farmer,
    userFarms: purchaseOrderResponseData.userFarms,
    coffeeCherryQty: purchaseOrderResponseData.coffeeCherryQty,
    purchasedAt: purchaseOrderResponseData.purchasedAt,
    orderCode: purchaseOrderResponseData.orderCode,
  });

  if(typeof purchaseOrderResponseData.coffeeCherryPic === 'string' && purchaseOrderResponseData.coffeeCherryPic.includes('base64')) {
    purchaseOrderResponseData.coffeeCherryPic = null;
  }

  if(purchaseOrderResponseData.coffeeType) {
    purchaseOrderResponseData.coffeeType.name = translateFn(purchaseOrderResponseData.coffeeType.name, globalTranslationCache);
  }
  if(purchaseOrderResponseData.farmer?.offlineFarmerData) {
    const offlineFarmerDataCopy = purchaseOrderResponseData.farmer.offlineFarmerData;
    delete offlineFarmerDataCopy.id;
    purchaseOrderResponseData.farmer = {
      ...purchaseOrderResponseData.farmer,
      ...offlineFarmerDataCopy,
    }
  }

  return purchaseOrderResponseData;
}

/**
 * @swagger
 * /coffee/buying-station/purchase:
 *   post:
 *     description: create purchase order
 *     tags: [Coffee Buying Station Purchase]
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
 *                  recordId:
 *                    type: string
 *                  coffeeCherryPic:
 *                    type: string
 *            example: { "farmerId": "265", "farmId": "265","plantationId": "265", "speciesId": "265", "varietyId": "265",  "coffeeCherryQty": "1", "coffeeCherryQlty": "C", "perKgPrice": "1000", "grandTotal": "1000", "isPaid": "1", "purchasedAt": "12/20/2022", "recordId": "1233334", "coffeeCherryPic": "data:image/png;base64," }
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
 *                 example: { "success": true, "code": 200, "message": "Inserted successfully.", "data": { "purchasedAt": "12/20/2022", "dateOfEntry": "07/05/2022", "id": 9, "buyingStationId": 17, "farmerId": "265", "coffeeCherryQty": "1", "coffeeCherryQlty": "C", "perKgPrice": "1000", "grandTotal": "1000", "recordId": "123331134", "coffeeCherryPic": { "location": "https://dimitra-public-images.s3.amazonaws.com/31459e7b-a255-4b9f-a10e-29eca2c9c85e.1657018448628.png", "key": "31459e7b-a255-4b9f-a10e-29eca2c9c85e.1657018448628.png" }, "updatedAt": "2022-07-05T10:54:10.247Z", "createdAt": "2022-07-05T10:54:10.213Z", "orderCode": "PO-0009" } }
 *
 */
router.post(
  '/',
  auth,
  duplicateRecordId.handleDuplicateRecordId('BuyingStationOrder'),
  // validatorPurchaseOrder.post(),
  validationErrorHandler,
  async (req, res) => {
    let transaction = await db.sequelize.transaction();
    try {
      let purchaseOrder;
      if(req.body.buyer){
        if (isNaN(parseInt(req.body.buyer, 10))){
           const buyerName = await createCoffeePurchaseOrderBuyer(req)
           req.body.buyer = buyerName.id  
        }
      } 

      // check if farmer exists
      let farmerExists = null
      farmerExists = await db.user.findOne({where: {
        id: req.body.farmerId
      }})
      if(!farmerExists){
        let { farmerName, address } = req.body;
        await db.user.create({id: req.body.farmerId, firstName: farmerName, address, organization: req.user.organization, userType: "offline", source: 'saas_api_coffee_purchase'})
      }

      if(req.body.farmerId && req.body.farmId) {
        purchaseOrder = await createPurchaseOrder(req, res, transaction)
        await transaction.commit()
        return res.json(
          successRespSync({
            msg: success.REGISTERED,
            data: purchaseOrder,
          })
        );
      } else if(req.body.farmerId > 0) {
        let { firstName, middleName, lastName, buyingStationOrderId, address, longitude, latitude } = req.body;
        purchaseOrder = await createPurchaseOrder(req, res, transaction, req.body.farmerId)

        let offlineUser = await db.user.findOne({where: {
          id: req.body.farmerId
        }})

        if(offlineUser.userType == "offline") {
           await db.BuyingStationFarmer.bulkCreate([{ userId: req.body.farmerId, address, longitude, latitude }], {
            transaction,
              updateOnDuplicate: ["address", "longitude", "latitude"] 
          });
        }
        await transaction.commit()

        return res.json(
          successRespSync({
            msg: success.REGISTERED,
            data: purchaseOrder,
          })
        );

      } else {
        let { firstName,middleName, lastName, buyingStationOrderId, address, longitude, latitude, userId } = req.body;
        let newUserId = await db.user.create({firstName,middleName, lastName, address, organization: req.user.organization, userType: "offline", source: 'saas_api_coffee_purchase'})

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
        if(membershipRes && Array.isArray(membershipRes) && membershipRes.length > 0) {
          await db.UserMembershipMap.create({
            user_id: newUserId.id,
            membership_id: membershipRes[0][0].id
          })
        }


        userId = newUserId.id
        purchaseOrder = await createPurchaseOrder(req, res, transaction, userId)

        await db.BuyingStationFarmer.bulkCreate([{ userId, buyingStationOrderId: purchaseOrder.id, address, longitude, latitude }], {
          transaction,
            updateOnDuplicate: ["address", "longitude", "latitude"] 
        });
        await transaction.commit()
        // await db.BuyingStationFarmer.create({ userId, buyingStationOrderId: purchaseOrder.id, address, longitude, latitude });
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

router.put(
  '/:orderId',
  auth,
  duplicateRecordId.handleDuplicateRecordId('BuyingStationOrder'),
  // validatorPurchaseOrder.post(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      const {orderId} = req.params
      const {
        farmerId,
        zoneId : segmentId,
        farmId,
        plantationId,
        speciesId,
        varietyId,
        coffeeCherryQty,
        coffeeCherryQlty,
        perKgPrice,
        grandTotal,
        purchasedAt,
        recordId,
        coffeeCherryPic,
        address, longitude, latitude,
        coffeeTypeId,
        currencyId
      } = req.body;
      let buyer = req.body.buyer
      if(req.body.buyer){
        if (isNaN(parseInt(req.body.buyer, 10))){
           const buyerName = await createCoffeePurchaseOrderBuyer(req)
           buyer = buyerName.id  
        }
      } 

      let set = {
        ...(farmerId && {farmerId: farmerId}),
        ...(farmId && {farmId: farmId}),
        ...(segmentId && {segmentId: segmentId}),
        ...(plantationId && {plantationId: plantationId}),
        ...(speciesId && {speciesId: speciesId}),
        // ...(varietyId && {varietyId: varietyId}),
        ...(coffeeCherryQty && {coffeeCherryQty: coffeeCherryQty}),
        ...(coffeeCherryQlty && {coffeeCherryQlty: coffeeCherryQlty}),
        ...(perKgPrice && {perKgPrice: perKgPrice}),
        ...(grandTotal && {grandTotal: grandTotal}),
        ...(buyer && {buyer:buyer}),
        ...(purchasedAt && {purchasedAt: moment.utc(purchasedAt, process.env.ACCEPT_DATE_FORMAT).format(process.env.DB_ONLYDATE_FORMAT)}),
        coffeeTypeId: coffeeTypeId || null,
        currency_id:currencyId || null
      };

      if (!_.isEmpty(coffeeCherryPic)) {

        set = {
          ...set, coffeeCherryPic: {
            s3_key: coffeeCherryPic.s3_key,
            file_name: `${process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/"}${coffeeCherryPic.s3_key}`
          }
        };
      }

      var transaction = await db.sequelize.transaction();




      if (varietyId && varietyId.length > 0) {
        await db.CoffeePurchaseOrderVarieties.destroy({
          where:{
            coffee_purchase_id : orderId
          },
          transaction
        });

        const purchaseVarietyObj = varietyId.map((variety_id) => {
          return {
            coffee_purchase_id: orderId,
            coffee_variety_id: variety_id
          }
        })
        await db.CoffeePurchaseOrderVarieties.bulkCreate(purchaseVarietyObj, { transaction })
      }

      let buyingStationOrder = await db.BuyingStationOrder.update(set, {
        where: {
          id: orderId
        },
        transaction,
      });
      // orderCode = `PO-000${buyingStationOrder?.id}`;
      // await buyingStationOrder.set({ orderCode }).save({ transaction });

      //update offline farmer data in user
      if (address) {
        await db.user.update({address} , {
          where: {
            id: farmerId,
            userType: 'offline',
          },
          transaction
        })
      }
      
      //update offline farmer data
      if(address || farmId > 0 || farmId == null) {
        await db.BuyingStationFarmer.update({address, longitude,latitude}, {
          where: {
            userId: farmerId
          },
          transaction
        });
      }

      await transaction.commit();

      let resObj = await db.BuyingStationOrder.findOne({
        where: {
          id: orderId
        }
      });
      return res.json(
        successRespSync({
          msg: success.UPDATED,
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


router.delete(
  '/:orderId',
  auth,
  duplicateRecordId.handleDuplicateRecordId('BuyingStationOrder'),
  validationErrorHandler,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      const {orderId} = req.params
      const {
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
        recordId,
        coffeeCherryPic,
      } = req.body;

      let set = {
        isdeleted: new Date()
      };

      var transaction = await db.sequelize.transaction();

      let buyingStationOrder = await db.BuyingStationOrder.update(set, {
        where: {
          id: orderId
        },
        transaction,
      });
      // orderCode = `PO-000${buyingStationOrder?.id}`;
      // await buyingStationOrder.set({ orderCode }).save({ transaction });

      await transaction.commit();

      let resObj = await db.BuyingStationOrder.findOne({
        where: {
          id: orderId
        }
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
 * /coffee/buying-station/purchase:
 *   get:
 *     description: list all created purchase order
 *     tags: [Coffee Buying Station Purchase]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: page
 *        schema:
 *          type: string
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: string
 *        example:
 *          10
 *      - in: query
 *        name: col
 *        schema:
 *          type: string
 *        example:
 *          id
 *      - in: query
 *        name: order
 *        schema:
 *          type: string
 *          enum: ['desc','asc']
 *      - in: query
 *        name: farmer
 *        description: seperate farmer id with forward slash(/)
 *        example: 265/1
 *        schema:
 *          type: string
 *      - in: query
 *        name: dateRange
 *        description: seperate date by hyphen(-) for sending from and to date respectively
 *        example: 01/01/2012-12/31/2022
 *        schema:
 *          type: string
 *      - in: query
 *        name: search
 *        description: search data from the list
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "buyingStationOrder": { "totalRows": 1, "numRows": 1, "rows": [ { "purchasedAt": "12/20/2022", "dateOfEntry": "07/05/2022", "id": 9, "orderCode": "PO-0009", "farmerId": 265, "buyingStationId": 17, "coffeeCherryQty": 1, "coffeeCherryQlty": "C", "coffeeCherryPic": { "key": "31459e7b-a255-4b9f-a10e-29eca2c9c85e.1657018448628.png", "location": "https://dimitra-public-images.s3.amazonaws.com/31459e7b-a255-4b9f-a10e-29eca2c9c85e.1657018448628.png" }, "perKgPrice": 1000, "grandTotal": 1000, "recordId": "123331134", "createdAt": "2022-07-05T10:54:10.000Z", "farmer": { "firstName": "santosh", "lastName": null }, "qrCode": "data:image/png;base64," } ] } } }
 */
router.get(
  '/',
  auth,
  validatorPurchaseOrder.list(),
  validatorPurchaseOrder.getAll(),
  validationErrorHandler,
  translation,
  async (req, res) => {
    try {
      const buyingStationId = req.user.id;
      const { organization } = req.user;
      let {
        page = 1,
        limit = 1000,
        col = 'id',
        order = 'desc',
        dateRange,
        farmer,
        search,
        // duration,
      } = req.query;
      limit = parseInt(limit);

      let where = { [db.Sequelize.Op.or]: [{ buyingStationId }, {status: 'global'}] };
      if (!_.isEmpty(dateRange)) {
        dateRange = dateRange
          .split('-')
          ?.map((date) =>
            moment
              .utc(date, process.env.ACCEPT_DATE_FORMAT)
              .format(process.env.DB_ONLYDATE_FORMAT)
          );
        where.purchasedAt = { [db.Sequelize.Op.between]: dateRange };
      }
      if (!_.isEmpty(farmer)) {
        farmer = farmer.split('/');
        where.farmerId = farmer;
      }
      if (!_.isEmpty(search)) {
        const fields = [
          'perKgPrice',
          'grandTotal',
          'coffeeCherryQty',
          'orderCode',
          'coffeeCherryQlty',
        ];
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
              'CONCAT',
              db.Sequelize.fn('COALESCE', db.Sequelize.col('farmer.firstName'), ''),
              ' ',
              db.Sequelize.fn('COALESCE', db.Sequelize.col('farmer.middleName'), ''),
              ' ',
              db.Sequelize.fn('COALESCE', db.Sequelize.col('farmer.lastName'), '')
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
        await db.BuyingStationOrder.findAndCountAll({
          include: [
            {
              model: db.user,
              as: 'farmer',
              attributes: ['id', 'firstName', 'address','middleName', 'lastName', 'userType'],
              include: [
                {
                  model: db.BuyingStationFarmer,
                  as: "offlineFarmerData",
                  required: false,
                },
              ],
              where: { organization },
            },
            {
              model: db.user_farm,
              as: 'userFarms',
              attributes: ['id', 'farmName'],
            },
            {
              model: db.Geofence,
              as: 'segments',
              attributes: ['id', 'geofenceName'],
            },
            {
              model: db.CoffeeVariety,
              as: 'coffeeVariety',
              attributes: ["id", "name",],
            },
            {
              model: db.CoffeeSpecies,
              as: 'coffeeSpecies',
              attributes: ["id", "name",],
            },
            {
              model: db.Plantations,
              as: 'plantations',
              attributes: ['id', 'plantation_name'],
            },
            {
              model: db.CoffeeType,
              as: 'coffeeType',
              attributes: ['id', 'name'],
              required: false,
            },
            {
              model: db.Currency,
              as: 'currency',
              required: false,
            },
          ],
          where,
          offset: (page - 1) * limit,
          limit: limit,
          order: [[col, order]],
          distinct: true,
          attributes: { exclude: ['updatedAt', 'isdeleted'] },
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
            coffeeCherryQty,
            purchasedAt,
            orderCode,
            external_id
          } = order;
          const qrCodeData = {
            id,
            perKgPrice,
            grandTotal,
            farmer,
            userFarms,
            coffeeCherryQty,
            purchasedAt,
            orderCode,
            external_id
          };
          let qrCodeDataString = JSON.stringify(qrCodeData);
          let externalQR=`https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${external_id}`
          return { ...order, qrCodeDataString, external_traceability_link:externalQR };
        })
      );

      let tempRow = JSON.parse(JSON.stringify(rows))
      let resRow = []
      resRow = tempRow.map(r => {
        if (typeof r.coffeeCherryPic == "string" && r.coffeeCherryPic.includes("base64")) {
          r.coffeeCherryPic = null
        }
        return r
      })


      resRow = resRow.map(el => {
        if(el.coffeeType) {
          el.coffeeType.name = req.simpleTranslate(el.coffeeType.name, globalTranslationCache);
        }
        if(el.farmer.offlineFarmerData) {
          let offlineFarmerDataCopy = JSON.parse(JSON.stringify(el.farmer.offlineFarmerData))
          offlineFarmerDataCopy && offlineFarmerDataCopy.id && delete offlineFarmerDataCopy.id
          let farmerObjCopy = JSON.parse(JSON.stringify(el.farmer))
          let elCopy = JSON.parse(JSON.stringify(el))

          elCopy.farmer = {
            ...farmerObjCopy,
            ...offlineFarmerDataCopy

          }
  
          return elCopy
        } else {
          return el
        }
      })
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            buyingStationOrder: { totalRows, numRows: rows?.length ?? 0, rows: resRow },
          },
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
 * /coffee/buying-station/purchase/orders:
 *   get:
 *     description: list all created order for which processing batch is not created yet for drop down options
 *     tags: [Coffee Buying Station Purchase]
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "purchasedAt": "12/20/2022", "id": 9, "perKgPrice": 1000, "grandTotal": 1000, "coffeeCherryQty": 1, "farmer": { "firstName": "santosh", "lastName": null } } ] }
 */
 router.get(
  '/orders',
  auth,
  validatorPurchaseOrder.list(),
  validationErrorHandler,
  translation,
  async (req, res) => {
    // for creating processing batch only
    try {
      let { page = 1, limit = 10000 } = req.query;
      limit = parseInt(limit);

      const where = {};
      where.availableWeight = { [db.Sequelize.Op.not]: 0 };

      let rows = await db.BuyingStationOrder.findAll({
        include: [
          {
            model: db.user,
            as: 'farmer',
            attributes: ['firstName','middleName', 'lastName'],
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
            as: 'userFarms',
            attributes: ['id', 'farmName'],
          },
          {
            model: db.Geofence,
            as: 'segments',
            attributes: ['id', 'geofenceName'],
          },
          {
            model: db.CoffeeVariety,
            as: 'coffeeVariety',
            attributes: ["id", "name",],
          },
          {
            model: db.CoffeeSpecies,
            as: 'coffeeSpecies',
            attributes: ["id", "name",],
          },
          {
           model:db.CacaoCoffeePurchaseBuyer,
           as:'coffeePurchaseBuyer',
           attributes:['id','name'] 
          },
          {
            model: db.Plantations,
            as: 'plantations',
            attributes: ['id', 'plantation_name'],
          },
          {
            model: db.Currency,
            as: 'currency',
            required: false,
          },
          {
            model: db.BuyingStationProcessingBatch,
            through: 'BuyingStationProcessingBatchAndOrder',
            as: 'processingBatch',
            include: [
              {
                model: db.ProcessingType,
                as: "processingType",
              }
            ],
            order: [['id', 'desc']],
          },
          {
            model: db.user,
            as: 'buyingStation',
          },
          {
            model: db.CoffeeType,
            as: 'coffeeType',
            required: false,
          },
        ],
        attributes: [
          'id',
          'orderCode',
          'perKgPrice',
          'grandTotal',
          'coffeeCherryQty',
          'purchasedAt',
          'availableWeight'
        ],
        where,
        offset: (page - 1) * limit,
        limit: limit,
        order: [['id', 'desc']],
        distinct: true,
      });

      // org filter
      rows = rows.filter(rowEl => (rowEl.buyingStation.organization == req.user.organization))


      // remove activation object
      let resRows = []
      resRows = JSON.parse(JSON.stringify(rows))
      rows = resRows.map(rowEl => {
        if(rowEl.coffeeType) {
          rowEl.coffeeType.name = req.simpleTranslate(rowEl.coffeeType.name, globalTranslationCache);
        }
        delete rowEl.farmer.activation
        return rowEl
      })

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

router.get('/coffee-purchase-buyers',auth, async (req, res) => {
  try {
    const cacaoPurchaseBuyers = await db.CacaoCoffeePurchaseBuyer.findAll({
      attributes:['id', 'name'],
      where:{
        buyer_belong_to:req.user.id
      }
    }) 
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data:cacaoPurchaseBuyers,
      })
    );
  }catch(err){
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
})

async function createCoffeePurchaseOrderBuyer(req) {
  let purchase_buyer = await db.CacaoCoffeePurchaseBuyer.create({
     name:req.body.buyer,
     buyer_belong_to:req.user.id
  })
  return purchase_buyer
}

async function createPurchaseOrder(req, res, transaction, newUserId) {
  const { organization, id: buyingStationId } = req.user;
  const {
    farmerId,
    farmId,
    buyer,
    zoneId : segmentId,
    plantationId,
    varietyId,
    speciesId,
    coffeeCherryQty,
    coffeeCherryQlty,
    perKgPrice,
    grandTotal,
    currencyId,
    purchasedAt,
    recordId,
    coffeeCherryPic,
    coffeeTypeId,
  } = req.body;

  let set = {
    buyingStationId,
    farmerId: newUserId || farmerId,
    segmentId,
    farmId,
    plantationId,
    speciesId,
    currency_id:currencyId,
    coffeeCherryQty,
    coffeeCherryQlty,
    perKgPrice,
    grandTotal,
    buyer,
    recordId,
    availableWeight: coffeeCherryQty,
    coffeeTypeId: coffeeTypeId || null,
    purchasedAt: moment.utc(purchasedAt, process.env.ACCEPT_DATE_FORMAT).format(process.env.DB_ONLYDATE_FORMAT),
  };

  if (!_.isEmpty(coffeeCherryPic)) {

    set = {
      ...set, coffeeCherryPic: {
        s3_key: coffeeCherryPic.s3_key,
        file_name: `${process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/"}${coffeeCherryPic.s3_key}`
      }
    };
  }
 
  let buyingStationOrder = await db.BuyingStationOrder.create(set, {
    transaction,
  });

  if (varietyId && varietyId.length > 0) {
    const purchaseOrderVarietyObj = varietyId.map((variety_id) => {
      return {
        coffee_purchase_id: buyingStationOrder.id,
        coffee_variety_id: variety_id
      }
    })
    await db.CoffeePurchaseOrderVarieties.bulkCreate(purchaseOrderVarietyObj, { transaction })
  }


  const externalId = await insertTraceabilityExternalId(
    "coffee_purchase_order",
    buyingStationOrder.id
  );

  if (externalId) {
    await db.BuyingStationOrder.update(
      {
        external_id: externalId.id,
      },
      {
        where: { id: buyingStationOrder.id },
        transaction,
      }
    );
  }

  orderCode = `PO-000${buyingStationOrder?.id}`;

  await db.BuyingStationOrder.update({orderCode}, {
    where: {
      id: buyingStationOrder.id
    },
    transaction,
  });

  buyingStationOrder =  await db.BuyingStationOrder.findOne({
    where: {
      id: buyingStationOrder.id
    },
    include:[
      {
        attributes: ["id", "name", "status", "coffee_species"],
        model: db.CoffeeVariety,
        as: "coffeeVariety",
      },
    ],
    transaction,
  });

  
  let harvestWhere = {
    organization,
  }

  // check crops exists or not;
  const coffeeData = await db.Option.findAll({
    attributes:['id', 'region'],
    where:{
      name:{
        [Op.like]:'%coffee%'
      }
    }
  })

  const coffeeCropIds = coffeeData.map(item=>item.id);
  const coffeeCountrys = coffeeData.map(item=>item.region)

  if(coffeeCropIds.length > 0){
    harvestWhere.cropId = {
      [Op.in]:coffeeCropIds
    };
    harvestWhere.country = {
      [Op.in]:coffeeCountrys
    }
  }
    const alertCriteria = await db.HarvestAlert.findOne({
      where: harvestWhere,
      include: [
        {
          model: db.Option,
          as: 'crop',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: db.UnitsList,
          as: "unit",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
      ],
    });

  
    if (alertCriteria) {

      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

      // converts baseMaxAllowed to kg / hector / year
      let maxAllowedPerKgHaYr = 0;
      if(alertCriteria && alertCriteria.maxAllowed && alertCriteria.unit){
        maxAllowedPerKgHaYr = parseFloat(await getWeightUnit(+alertCriteria.maxAllowed, alertCriteria.unit))
      }

      const coffeeData = await db.BuyingStationOrder.findAll({
        attributes: ['id','coffeeCherryQty'],
        include: [
          {
            model: db.user_farm,
            as: "userFarms",
            attributes: ["id", "farmName","area"],
          },
        ],
        where: {
          buyingStationId,
          createdAt: {
            [Op.gte]: twelveMonthsAgo,
          },
        },
      });


      let totalCoffeePerKgHaYr = new Promise(async (resolve, reject) => {
        try {
          let totalCoffeeYield = 0;

          for (const ch of coffeeData) {
              let coffeeYieldInKg = 0;
              let areaInHector = 1;
              let yieldPerHectare = 0;

              if (ch && ch.coffeeCherryQty) {
                coffeeYieldInKg += parseFloat(await getWeightUnit(+ch.coffeeCherryQty, alertCriteria.unit));
              }

              if (ch && ch.userFarms && ch.userFarms.area) {
                  areaInHector = await convertToHectares(ch.userFarms.area);
              }


              if(areaInHector){
                yieldPerHectare = coffeeYieldInKg / areaInHector;
              }

              totalCoffeeYield += yieldPerHectare;
          }

          resolve(totalCoffeeYield);
          } catch (error) {
              reject(error);
          }
        });

        // issue when technician user creates an offline farmer only, without assigning any farm to this new offline farmer
        let farm
        let newCoffeeQtyKgPerHA = 0;
        if(farmId) {
          farm = await db.user_farm.findOne({where: { id: farmId }})
        }

        if(farm && farm.area){
          const newAreaInHectare = await convertToHectares(farm.area);
          newCoffeeQtyKgPerHA = parseFloat(coffeeCherryQty/newAreaInHectare);
        }

        try{
          const [maxAllowed,totalCoffee ] = await Promise.allSettled([maxAllowedPerKgHaYr,totalCoffeePerKgHaYr]);

          const totalCoffeeQty = totalCoffee.value + newCoffeeQtyKgPerHA; // newly created quantity added

          if(maxAllowed.value < totalCoffeeQty){
            let totalReported = convertToAlertsUnit(totalCoffeeQty, alertCriteria.unit) + ' ' + alertCriteria.unit.abbvr+'/ha/yr'
            let maxAllowedConverted = convertToAlertsUnit(maxAllowed.value, alertCriteria.unit) + ' ' + alertCriteria.unit.abbvr+'/ha/yr'
            const listRes = await allAdmins(organization);
            const farmer = await db.user.findOne({ where: { id: set.farmerId }, attributes: ['firstName','middleName', 'lastName']})
            let message;
            let title = "High production Alert!";
            let type = "crop_harvest";
            if (farmId) {
             
                message = `High production Alert! Farm: ${farm.farmName}, Farmer: ${farmer.firstName} ${farmer.lastName}, Crop: Coffee, Total reported: ${totalReported}, Max allowed: ${maxAllowedConverted}`
              } else {
                message = `High production Alert! Farmer: ${farmer.firstName} ${farmer.lastName}, Crop: Coffee, Total reported: ${totalReported}, Max allowed: ${maxAllowedConverted}`
              }
              let notificationAdmin = {
                user: {
                  id: buyingStationId,
                },
                body: {
                  notify: 'admin',
                  title,
                  type,
                  message,
                  users: listRes,
                }
              }
              let notificationUser = {
                user: {
                  id: buyingStationId,
                },
                body: {
                  notify: 'user',
                  title,
                  type,
                  message,
                  users: [buyingStationId],
                }
              }
              if (alertCriteria.alertAdmin && alertCriteria.alertFarmer) {
                Promise.all([
                  await createNotification(notificationAdmin, ),
                  await createNotification(notificationUser, )
                ])
              } else if (alertCriteria.alertAdmin) {
                await createNotification(notificationAdmin, )
              } else if (alertCriteria.alertFarmer) {
                await createNotification(notificationUser, )
              }
          }

        }
        catch(error){
          console.error("Error:",error)
        }
    } 
  // await buyingStationOrder.set({ orderCode }).save({ transaction });

  // await transaction.commit();
  return buyingStationOrder
}

module.exports = router;
