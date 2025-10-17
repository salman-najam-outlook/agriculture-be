const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const QRCode = require('qrcode');
const { Op } = require('sequelize');
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId');
const processingBatchValidator = require(rootPath +
  '/helpers/validators/processingBatch');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const translation = require(rootPath + '/middleware/translation');
const insertTraceabilityExternalId = require(rootPath + "/helpers/externalTracebilityId");

/**
 * @swagger
 * /coffee/buying-station/processing:
 *   post:
 *     description: create a processing batch from orders
 *     tags: [Coffee Buying Station Processing]
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
 *                startDate:
 *                  type: date
 *                endDate:
 *                  type: date
 *                totalCoffeeCherryQty:
 *                  type: float
 *                humidity:
 *                  type: float
 *                temperature:
 *                  type: float
 *                waterContent:
 *                  type: float
 *                batchRating:
 *                  type: string
 *                  enum: [gold,platinum,silver,bronze]
 *                recordId:
 *                  type: string
 *                purchasingNum:
 *                  type: array
 *                  items:
 *                    type: integer
 *            example: { "startDate": "01/12/2022", "endDate": "12/12/2022", "processingTypeId": 1, "totalCoffeeCherryQty": 500, "humidity": 12, "temperature": 22, "temperatureUnitId": 553, "waterContent": 36, "batchRating": "gold", "recordId": "", "purchasingNum": [ { orderId: 208, quantity: 20 } ] }
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
 *                 example: { "success": true, "code": 200, "message": "Inserted successfully.", "data": { "processingBatch": { "startDate": "01/12/2022", "endDate": "12/12/2022", "parchmentReady": false, "id": 8, "totalCoffeeCherryQty": "500", "humidity": "12", "temperature": "22", "processingTypeId": 1, "processingType": { "id": 1, "name": "Honey" }, "waterContent": "36", "batchRating": "gold", "recordId": "", "updatedAt": "2022-07-05T04:39:13.378Z", "createdAt": "2022-07-05T04:39:13.363Z", "batchCode": "PB-0008" } } }
 *
 */
router.post(
  '/',
  auth,
  duplicateRecordId.handleDuplicateRecordId('BuyingStationProcessingBatch'),
  processingBatchValidator.postCreate(),
  validationErrorHandler,
  async (req, res) => {
    const { id: userId } = req.user;
    const { purchasingNum } = req.body;

    try {
      const {
        startDate,
        endDate,
        totalCoffeeCherryQty,
        humidity,
        temperature,
        temperatureUnitId,
        waterContent,
        processingTypeId,
        batchRating,
        purchasingNum,
        recordId,
        density,
        wasHuskProduced,
        quantityOfHusk
      } = req.body;

      const set = {
        startDate: moment.utc(startDate, process.env.ACCEPT_DATE_FORMAT).format(process.env.DB_ONLYDATE_FORMAT),
        endDate: moment.utc(endDate, process.env.ACCEPT_DATE_FORMAT).format(process.env.DB_ONLYDATE_FORMAT),
        totalCoffeeCherryQty,
        humidity,
        temperature,
        temperatureUnitId,
        waterContent,
        processingTypeId,
        batchRating,
        purchasingNum,
        recordId,
        density,
        buyingStationId: userId,
        wasHuskProduced,
        quantityOfHusk
      };

      var transaction = await db.sequelize.transaction();
      let processingBatch = await db.BuyingStationProcessingBatch.create(set, {
        transaction,
      });

      const externalId = await insertTraceabilityExternalId(
        "coffee_processing_batch",
        processingBatch.id
      );
          
      if (externalId) {
        const external_set = {
          external_id: externalId.id,
        }
        await processingBatch.set(external_set).save({ transaction });
      }

      let updateSet = {
        batchCode : `PB-000${processingBatch?.id}`
      }
      
      if(wasHuskProduced) {
        const huskExternalId = await insertTraceabilityExternalId(
          "husk_processing_batch",
          processingBatch.id
        );
        const huskCode = `HU-000${processingBatch?.id}`
        updateSet.huskCode = huskCode;
        updateSet.husk_external_id = huskExternalId.id;
      }
      await processingBatch.set(updateSet).save({ transaction });

      for (let purchase of purchasingNum) { 
        let purchaseOrder  = await db.BuyingStationOrder.findOne({ 
          where: {id: purchase.orderId },
          attributes: ['availableWeight','id'],
          transaction
        });
        if (!purchaseOrder) {
          throw new Error(error.PURCHASE_ORDER_NOT_FOUND)
        }

        let updatedWeight = purchaseOrder.availableWeight - purchase.quantity;
        if (updatedWeight < 0) updatedWeight = 0
        await db.BuyingStationOrder.update({ 
          availableWeight: updatedWeight 
        }, 
        { 
          where: { id: purchaseOrder.id }
        }, 
        { transaction })
        await db.BuyingStationProcessingBatchAndOrder.create(
          { 
            orderId: purchaseOrder.id, 
            processingBatchId: processingBatch.id 
          },
          { transaction }
        );
      }

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: processingBatch,
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
 * /coffee/buying-station/processing/types:
 *   get:
 *     description: list all processing types of a buyingstation processing
 *     tags: [Coffee Buying Station Processing]
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [{ "id": 1, "name": "Honey" }] }
 */
router.get('/types', translation, validationErrorHandler, async (req, res) => {
  try {
    let processingTypes = await db.ProcessingType.findAll();
    const { lang } = req?.headers;
    if (lang && lang !== 'en') {
      processingTypes = req.translateFunction(processingTypes, globalTranslationCache, {
        lvl1: true
      });
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: processingTypes,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /coffee/buying-station/processing:
 *   get:
 *     description: list all created processing batch of a buyingstation
 *     tags: [Coffee Buying Station Processing]
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
 *        name: status
 *        schema:
 *          type: string
 *          enum: [completed,inprocess,all]
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "processingBatch": { "totalRows": 1, "numRows": 1, "rows": [ { "startDate": "01/12/2022", "endDate": "12/12/2022", "parchmentReady": false, "id": 8, "batchCode": "PB-0008", "totalCoffeeCherryQty": 500, "humidity": 12, "temperature": 22, "waterContent": 36, "batchRating": "Gold", "recordId": "", "isdeleted": null, "parchmentTarget": null, "parchmentOut": null, "qrCode": null } ] } } }
 */
router.get(
  '/',
  auth,
  translation,
  processingBatchValidator.list(),
  processingBatchValidator.getAll(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let {
        page = 1,
        limit = 1000,
        col = 'id',
        order = 'desc',
        dateRange,
        status,
        search,
        showHistory = 'false'
      } = req.query;
      limit = parseInt(limit);
      const { id: buyingStationId } = req.user;

      let where = { buyingStationId };
      if (!_.isEmpty(dateRange)) {
        dateRange = dateRange
          .split('-')
          ?.map((date) =>
            moment
              .utc(date, process.env.ACCEPT_DATE_FORMAT)
              .format(process.env.DB_ONLYDATE_FORMAT)
          );
        where.startDate = { [db.Sequelize.Op.between]: dateRange };
      }
      if (!_.isEmpty(status)) {
        switch (status) {
          case 'completed':
            // where.endDate = {
            //   [db.Sequelize.Op.lt]: moment
            //     .utc()
            //     .format(process.env.DB_ONLYDATE_FORMAT),
            // };
            where.parchmentOut = {
              [db.Sequelize.Op.not]:null
            } 
            break;
          case 'inprocess':
            // where.endDate = {
            //   [db.Sequelize.Op.gte]: moment
            //     .utc()
            //     .format(process.env.DB_ONLYDATE_FORMAT),
            // };
            where.parchmentOut = {
              [db.Sequelize.Op.is]:null
            }
            break;
          default:
        }
      }
      if (!_.isEmpty(search)) {
        const fields = [
          'batchCode',
          'totalCoffeeCherryQty',
          'humidity',
          'temperature',
          'waterContent',
          'batchRating',
          'parchmentOut',
        ];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }
      if(showHistory === 'true') {
        where = { ...where }
      } else {
        where = { ...where, [db.Sequelize.Op.and]: db.Sequelize.literal(`(batchCode NOT IN (
          SELECT parchment_coffee_processing_batches.buyingStationParchmentId FROM parchment_coffee_processing_batches
        ))`) }
      }

      let { count: totalRows, rows } =
        await db.BuyingStationProcessingBatch.findAndCountAll({
          where: {
            ...where,
          },
          offset: (page - 1) * limit,
          limit: limit,
          order: [[col, order]],
          distinct: true,
          attributes: { exclude: ['updatedAt'] },
          include: [
            {
              model: db.ParchmentCoffeeProcessingBatch,
              as: 'parchmentCoffeeProcessingBatches',
            },
            {
              model: db.UnitsList,
              attributes: ["id", "name", "abbvr"],
              as: 'temperatureUnit',
              required: false,
            },
            {
              model: db.BuyingStationOrder,
              through: {
                model: db.BuyingStationProcessingBatchAndOrder,
                attributes: [],
              },
              as: 'buyingStationOrder',
              attributes: {
                exclude: ['qrCode', 'isdeleted', 'createdAt', 'updatedAt'],
              },
              include: [
                {
                  model: db.user,
                  as: 'buyingStation',
                  attributes: ['firstName', 'middleName','lastName', 'fullName'],
                },
                {
                  model: db.user,
                  as: 'farmer',
                  attributes: ['firstName', 'middleName','lastName'],
                },
                {
                  model: db.user_farm,
                  as: 'userFarms',
                  attributes: ['id', 'farmName'],
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
                  model: db.Currency,
                  as: "currency",
                },
              ]
            },
            {
              model: db.ProcessingType,
              as: 'processingType',
            },
            {
              model: db.user,
              as: 'buyingStation',
            },
          ],
        });

      // collect coffee species

      let coffeSpeciesStr = rows.map(mainRow => {
        let coffeeStr = mainRow.buyingStationOrder.map(subRow => {
          return subRow?.coffeeSpecies?.name || ''
        })
        return coffeeStr
      })

      coffeSpeciesStr = [...new Set(coffeSpeciesStr.flat())].join(',')

      rows = await Promise.all(
        rows?.map(async (batch) => {
          batch = await batch.toJSON();
          const {
            id,
            batchCode,
            startDate,
            endDate,
            parchmentOut,
            parchmentReady,
            parchmentType,
            batchRating,
            buyingStationOrder,
            processingType,
            buyingStation,
            wasHuskProduced,
            quantityOfHusk,
            huskCode,
            external_id,
            husk_external_id
          } = batch;
          let externalQR=`https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${external_id}`
          let externalHuskQR=`https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${husk_external_id}`
          let buyingStationName = ''
          buyingStationName = buyingStation && buyingStation.fullName

          // add qr code string for the pruchase order
          batch.buyingStationOrder = buyingStationOrder?.map((order) => {
            const {
              id,
              perKgPrice,
              grandTotal,
              farmer,
              coffeeCherryQty,
              purchasedAt,
              orderCode,
            } = order;
            const qrCodeData = {
              id,
              perKgPrice,
              grandTotal,
              farmer,
              coffeeCherryQty,
              purchasedAt,
              orderCode,
            };
            let qrCodeDataString = JSON.stringify(qrCodeData);
            return { ...order, qrCodeDataString };
          });
          // generate comman seperated purchase_order_num string
          batch.selectedPurchasingNums = buyingStationOrder
            ?.map(({ orderCode }) => orderCode)
            .join(', ');

          if (
            // parchmentReady === true &&
            parchmentOut !== null &&
            parchmentOut?.toString().trim() !== ''
          ) {
            let huskQrCode = null
            const { coffeeCherryPic = null } =
              buyingStationOrder?.filter(
                (purchaseOrder) => !_.isEmpty(purchaseOrder.coffeeCherryPic)
              )?.[0] || {};


            const qrCode = JSON.stringify({
              id,
              batchCode,
              startDate,
              endDate,
              parchmentOut,
              species: coffeSpeciesStr,
              processedCoffeeSource: buyingStationName,
              processType: processingType && processingType?.name,
              orderCode: batchCode,
              farmer: { firstName: buyingStationName.split(' ')[0], lastName: buyingStationName.split(' ')[1] },
              coffeeCherryQty: parchmentOut,
              purchasedAt: startDate

            });

            if(wasHuskProduced) {
              huskQrCode = JSON.stringify({
                id,
                batchCode,
                startDate,
                endDate,
                parchmentOut,
                species: coffeSpeciesStr,
                processedCoffeeSource: buyingStationName,
                processType: processingType && processingType?.name,
                orderCode: batchCode,
                farmer: { firstName: buyingStationName.split(' ')[0], lastName: buyingStationName.split(' ')[1] },
                coffeeCherryQty: parchmentOut,
                purchasedAt: startDate,
                huskCode,
                quantityOfHusk
              })
            }


            return { ...batch, buyingStation: buyingStationName, qrCode, huskQrCode, external_traceability_link:externalQR, husk_external_traceability_link: externalHuskQR  };
          }

          
          return { ...batch, buyingStation: buyingStationName, qrCode: null, huskQrCode: null, external_traceability_link:externalQR , husk_external_traceability_link: externalHuskQR };
        })
      );

      const { lang } = req?.headers;

      if (lang && lang !== 'en') {
        rows = req.translateFunction(rows, globalTranslationCache, {
          lvl1: true,
          moduleName: 'coffee/buyingStation/processing',
        });
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            processingBatch: { totalRows, numRows: rows?.length ?? 0, rows },
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
 * /coffee/buying-station/processing/parchment:
 *   put:
 *     description: save parchment out data
 *     tags: [Coffee Buying Station Processing]
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
 *                processingBatchId:
 *                  type: integer
 *                parchmentOut:
 *                  type: float
 *            example: { "processingBatchId": 1, "parchmentOut": 255 }
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
 *                 example: { "success": true, "code": 200, "message": "Parchment out saved successfully", "data": { "startDate": "01/12/2022", "endDate": "12/12/2022", "id": 6, "batchCode": "PB-0006", "totalCoffeeCherryQty": 500, "humidity": 12, "temperature": 22, "waterContent": 36, "batchRating": "Gold", "recordId": "", "parchmentTarget": null, "parchmentOut": 255, "updatedAt": "2022-07-05T07:38:12.697Z", "qrCode": "data:image/png;base64," } }
 *
 */
router.put(
  '/parchment',
  auth,
  processingBatchValidator.parchmentOut(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { processingBatchId, parchmentOut } = req.body;

      const set = { parchmentOut };

      let processingBatch = await db.BuyingStationProcessingBatch.findOne({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'parchmentReady', 'isdeleted'],
        },
        where: { id: processingBatchId },
      });
      const {
        id,
        batchCode,
        totalCoffeeCherryQty,
        batchRating,
        endDate,
        startDate,
      } = await processingBatch?.toJSON();
      await processingBatch.set(set).save();

      const qrCode = JSON.stringify({
        id,
        batchCode,
        totalCoffeeCherryQty,
        batchRating,
        endDate,
        startDate,
        parchmentOut,
      });

      return res.json(
        successRespSync({
          msg: success.PARCHMENT_ADDED,
          data: { ...(await processingBatch.toJSON()), qrCode },
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.put(
  '/:batchId',
  auth,
  duplicateRecordId.handleDuplicateRecordId('BuyingStationProcessingBatches'),
  // validatorPurchaseOrder.post(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { batchId } = req.params;
      const {
        startDate,
        endDate,
        totalCoffeeCherryQty,
        humidity,
        temperature,
        waterContent,
        purchasingNum,
        processingTypeId,
        batchRating,
        recordId,
        density,
        parchmentOut,
        wasHuskProduced,
        quantityOfHusk
      } = req.body;

      let set = {
        ...(startDate && { startDate: startDate }),
        ...(endDate && { endDate: endDate }),
        ...(totalCoffeeCherryQty && {
          totalCoffeeCherryQty: totalCoffeeCherryQty,
        }),
        ...(humidity && { humidity: humidity }),
        ...(temperature && { temperature: temperature }),
        ...(waterContent && { waterContent: waterContent }),
        ...(purchasingNum && { purchasingNum: purchasingNum }),
        ...(processingTypeId && { processingTypeId: processingTypeId }),
        ...(batchRating && { batchRating: batchRating }),
        ...(density && { density: density }),
        ...(parchmentOut && { parchmentOut: parchmentOut }),
        ...(wasHuskProduced && { wasHuskProduced: wasHuskProduced }),
        ...(quantityOfHusk && { quantityOfHusk: quantityOfHusk }),
      };

      var transaction = await db.sequelize.transaction();

      if(wasHuskProduced) {
        const huskCode = `HU-000${batchId}`
        set.huskCode = huskCode
      }

      let pBatchUpdate = await db.BuyingStationProcessingBatch.update(set, {
        where: {
          id: batchId,
        },
        transaction,
      });



      if (purchasingNum && purchasingNum.length > 0) {
        // delete old purchase order to batch relations
        await db.BuyingStationProcessingBatchAndOrder.destroy({
          where: {
            processingBatchId: batchId,
          },
          transaction,
        });

        const setMapOrderAndProcessingBatch = purchasingNum?.map((order) => ({
          orderId: order.orderId,
          processingBatchId: batchId,
        }));
        await db.BuyingStationProcessingBatchAndOrder.bulkCreate(
          setMapOrderAndProcessingBatch,
          { transaction }
        );
      }

      await transaction.commit();

      let resData = await db.BuyingStationProcessingBatch.findOne({
        where: {
          id: batchId,
        }
      });

      return res.json(
        successRespSync({
          msg: success.UPDATED,
          data: resData,
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
  '/:batchId',
  auth,
  duplicateRecordId.handleDuplicateRecordId('BuyingStationProcessingBatches'),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { batchId } = req.params;

      let set = {
        isdeleted: new Date(),
      };

      var transaction = await db.sequelize.transaction();

      let buyingStationOrder = await db.BuyingStationProcessingBatch.update(
        set,
        {
          where: {
            id: batchId,
          },
          transaction,
        }
      );
      // orderCode = `PO-000${buyingStationOrder?.id}`;
      // await buyingStationOrder.set({ orderCode }).save({ transaction });

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.DELETED,
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

module.exports = router;
