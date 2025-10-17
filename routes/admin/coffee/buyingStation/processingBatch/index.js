const express = require('express');
const router = express.Router();
const _ = require('lodash');
const moment = require('moment');
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { success } = require(rootPath + '/helpers/language');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const validatorPB = require(rootPath + '/helpers/validators/processingBatch');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
// Fix: Remove destructuring, use default export
const insertTraceabilityExternalId = require(rootPath + '/helpers/externalTracebilityId');

/**
 * @swagger
 * /admin/coffee/buying-station/processing-batch:
 *   post:
 *     summary: create processing batch for buying station
 *     description: create processing batch for buying station
 *     tags: [Admin-BuyingStation-ProcessingBatch]
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
 *              example: { "startDate": "01/12/2022", "endDate": "12/12/2022", "totalCoffeeCherryQty": 500, "humidity": 12, "temperature": 22, "waterContent": 36, "processingTypeId": 1, "batchRating": "gold", "purchasingNum": [ 11 ], "density": 1.2, "buyingStationId": "17" }
 *              properties:
 *                buyingStationId:
 *                    type: integer
 *                startDate:
 *                    type: string
 *                endDate:
 *                    type: string
 *                totalCoffeeCherryQty:
 *                    type: float
 *                humidity:
 *                    type: float
 *                temperature:
 *                    type: float
 *                waterContent:
 *                    type: float
 *                processingTypeId:
 *                    type: integer
 *                batchRating:
 *                    type: string
 *                    enum: [Platinum,Gold,Silver,Bronze]
 *                purchasingNum:
 *                    type: array
 *                    items:
 *                        type: integer
 *                density:
 *                    type: float
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
  '/',
  auth,
  validatorPB.createProcessingBatchAdmin(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const {
        startDate,
        endDate,
        totalCoffeeCherryQty,
        humidity,
        temperature,
        waterContent,
        processingTypeId,
        batchRating,
        purchasingNum,
        density,
        buyingStationId,
      } = req.body;

      const set = {
        startDate: startDate,
        endDate: endDate,
        totalCoffeeCherryQty,
        humidity,
        temperature,
        waterContent,
        processingTypeId,
        batchRating,
        purchasingNum,
        density,
        buyingStationId,
      };

      var transaction = await db.sequelize.transaction();

      let processingBatch = await db.BuyingStationProcessingBatch.create(set, {
        transaction,
      });
      batchCode = `PB-000${processingBatch?.id}`;
      await processingBatch.set({ batchCode }).save({ transaction });

      const setMapOrderAndProcessingBatch = purchasingNum?.map((orderId) => ({
        orderId,
        processingBatchId: processingBatch.id,
      }));
      await db.BuyingStationProcessingBatchAndOrder.bulkCreate(
        setMapOrderAndProcessingBatch,
        { transaction }
      );

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
 * /admin/coffee/buying-station/processing-batch:
 *   put:
 *     summary: update processing batch details with batchId
 *     description: update processing batch details with batchId
 *     tags: [Admin-BuyingStation-ProcessingBatch]
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
 *              example: { "batchId": "54", "buyingStationId": "17", "startDate": "01/12/2022", "endDate": "12/12/2022", "totalCoffeeCherryQty": 50000, "humidity": 122, "temperature": 22, "waterContent": 36, "processingTypeId": 1, "batchRating": "gold", "purchasingNum": [ 11 ], "density": 1.2 }
 *              properties:
 *                batchId:
 *                    type: integer
 *                buyingStationId:
 *                    type: integer
 *                startDate:
 *                    type: string
 *                endDate:
 *                    type: string
 *                totalCoffeeCherryQty:
 *                    type: float
 *                humidity:
 *                    type: float
 *                temperature:
 *                    type: float
 *                waterContent:
 *                    type: float
 *                processingTypeId:
 *                    type: integer
 *                batchRating:
 *                    type: string
 *                    enum: [Platinum,Gold,Silver,Bronze]
 *                purchasingNum:
 *                    type: array
 *                    items:
 *                        type: integer
 *                density:
 *                    type: float
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
  '/',
  auth,
  validatorPB.updateProcessingBatchAdmin(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const {
        batchId,
        buyingStationId,
        startDate,
        endDate,
        totalCoffeeCherryQty,
        humidity,
        temperature,
        waterContent,
        processingTypeId,
        batchRating,
        purchasingNum,
        density,
      } = req.body;

      const set = {
        startDate: startDate,
        endDate: endDate,
        totalCoffeeCherryQty,
        humidity,
        temperature,
        waterContent,
        processingTypeId,
        batchRating,
        purchasingNum,
        density,
        buyingStationId,
      };

      var transaction = await db.sequelize.transaction();

      // update purchase order and processing batch map
      const setMapOrderAndProcessingBatch = purchasingNum?.map((orderId) => ({
        orderId,
        processingBatchId: batchId,
      }));
      // delete insert
      await db.BuyingStationProcessingBatchAndOrder.destroy({
        where: { processingBatchId: batchId },
        transaction,
      });
      await db.BuyingStationProcessingBatchAndOrder.bulkCreate(
        setMapOrderAndProcessingBatch,
        { transaction }
      );

      // update processing batch details
      const where = { id: batchId };
      await db.BuyingStationProcessingBatch.update(set, {
        where,
        transaction,
      });

      await transaction.commit();

      // get updated details
      const batch = await getProcessingBatch(where);

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: batch,
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
 * /admin/coffee/buying-station/processing-batch:
 *   delete:
 *     summary: delete processing batch with id
 *     description: delete processing batch with id
 *     tags: [Admin-BuyingStation-ProcessingBatch]
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
 *            example: { "batchId": 3 }
 *            schema:
 *              type: object
 *              properties:
 *                  batchId:
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
 *               example: { "success": true, "code": 200, "message": "Deleted successfully.", "data": { "id": 54, "batchCode": "PB-00054", "isdeleted": "2022-12-08T12:32:29.919Z", "updatedAt": "2022-12-08T12:32:29.921Z" } }
 */
router.delete(
  '/',
  auth,
  validatorPB.deleteProcessingBatchAdmin(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { batchId: id } = req.body;

      let where = { id };
      const batch = await db.BuyingStationProcessingBatch.findOne({
        where,
        attributes: ['id', 'batchCode'],
      });
      if (batch === null) throw new Error("processing batch doesn't exist");

      // delete the order
      await batch?.destroy();

      return res.json(
        successRespSync({
          msg: success.DELETED,
          data: batch,
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
 * /admin/coffee/buying-station/processing-batch/{batchCode}:
 *   get:
 *     summary: fetch processing batch details with batchCode
 *     description: fetch processing batch details with batchCode
 *     tags: [Admin-BuyingStation-ProcessingBatch]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: batchCode
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "startDate": "01/12/2022", "endDate": "12/12/2022", "parchmentReady": false, "id": 52, "batchCode": "PB-00052", "buyingStationId": 17, "totalCoffeeCherryQty": 500, "humidity": 12, "temperature": 22, "waterContent": 36, "batchRating": "Gold", "isdeleted": null, "parchmentTarget": null, "processingTypeId": 1, "parchmentOut": null, "density": 1.2, "createdAt": "2022-12-08T10:10:19.000Z", "buyingStationOrder": [], "processingType": { "id": 1, "name": "Honey" }, "qrCode": "{\"id\":52,\"batchCode\":\"PB-00052\",\"startDate\":\"01/12/2022\",\"endDate\":\"12/12/2022\",\"parchmentOut\":null,\"parchmentReady\":false,\"batchRating\":\"Gold\"}" } }
 */
router.get(
  '/:batchCode',
  auth,
  validatorPB.getProcessingBatchAdmin(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { batchCode } = req.params;

      let where = { batchCode };
      const batch = await getProcessingBatch(where);

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: batch,
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
async function getProcessingBatch(where) {
  let batch = await (
    await db.BuyingStationProcessingBatch.findOne({
      where,
      attributes: { exclude: ['updatedAt'] },
      include: [
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
              attributes: ['firstName','middleName', 'lastName', 'fullName'],
            },
          ],
        },
        {
          model: db.ProcessingType,
          as: 'processingType',
        },
      ],
    })
  )?.toJSON();

  if (batch) {
    batch.qrCode = JSON.stringify({
      id: batch?.id,
      batchCode: batch?.batchCode,
      startDate: batch?.startDate,
      endDate: batch?.endDate,
      parchmentOut: batch?.parchmentOut,
      parchmentReady: batch?.parchmentReady,
      parchmentType: batch?.parchmentType,
      batchRating: batch?.batchRating,
      buyingStation: batch?.buyingStation,
      coffeeCherryPic: batch?.coffeeCherryPic,
    });
  }

  return batch;
}


router.put(
  '/:batchCode',
  auth,
  async (req, res) => {
    try {
      const {
        parchmentOut
      } = req.body;
      const { batchCode } = req.params;
      const set = {
        parchmentOut
      };

      var transaction = await db.sequelize.transaction();

      // update processing batch details
      const where = batchCode && batchCode.toString().startsWith('PB-') ? { batchCode } : { id: Number(batchCode) };
      await db.BuyingStationProcessingBatch.update(set, {
        where,
        transaction,
      });

      // fetch batch to derive fields for parchment coffee creation
      const batch = await db.BuyingStationProcessingBatch.findOne({ where, transaction });
      if (!batch) throw new Error("processing batch doesn't exist");

      // Only create when parchmentOut is provided and > 0, and mapping not already present
      const existingMap = await db.ParchmentCoffeeProcessingBatch.findOne({
        where: { buyingStationParchmentId: batch.batchCode },
        transaction,
      });

      if (parchmentOut != null && Number(parchmentOut) > 0 && !existingMap) {
        // Resolve kg unit id
        const kgUnit = await db.UnitsList.findOne({ where: { abbvr: 'kg' }, transaction });
        const kgUnitId = kgUnit?.id || 2;

        // Resolve productTypeId for 'Coffee' (optional)
        const coffeeProductType = await db.ParchmentProductType.findOne({ where: { name: 'Coffee' }, transaction });
        const productTypeId = coffeeProductType?.id || null;

        // Normalize purchase date to YYYY-MM-DD
        const purchaseDate = batch?.endDate
          ? moment(batch.endDate, ['MM/DD/YYYY','YYYY-MM-DD']).format('YYYY-MM-DD')
          : moment().format('YYYY-MM-DD');

        // Create parchment coffee
        const parchmentSet = {
          dryMillingUserId: batch?.buyingStationId || null,
          productTypeId,
          purchaseDate,
          barcode: batch.batchCode,
          parchmentChecking: Number(parchmentOut),
          parchmentCheckingUnitId: kgUnitId,
          status: 'Completed',
          qualityControlHumidity: batch.humidity || null,
          qualityControlDensity: batch.density || null,
          batchProductionKilogramAsalan: batch.totalCoffeeCherryQty || null,
          huskCode: batch.huskCode || null
        };

        const parchmentCoffee = await db.ParchmentCoffee.create(parchmentSet, { transaction });

        // Generate green beans code based on product type name
        let greenBeansCode = `GB-${parchmentCoffee.id}-${Number(parchmentCoffee.id) % 10}`;
        if (coffeeProductType && coffeeProductType.name !== 'Coffee') {
          greenBeansCode = `HP-${parchmentCoffee.id}-${Number(parchmentCoffee.id) % 10}`;
        }

        // Insert external traceability id
        const externalIdRecord = await insertTraceabilityExternalId('parchment_coffee', parchmentCoffee.id);
        const eid =
          externalIdRecord?.id ||
          (await db.TraceabilityExternalId.findOne({
            where: { type: 'parchment_coffee', type_id: parchmentCoffee.id },
            transaction,
          }))?.id;
        
        if (eid) {
          await parchmentCoffee.set({ external_id: eid }).save({ transaction });
        }

        // Save code
        await parchmentCoffee.set({ greenBeansId: greenBeansCode }).save({ transaction });

        // Map batch to parchment coffee with quantity details
        await db.ParchmentCoffeeProcessingBatch.create({
          parchmentCoffeeId: parchmentCoffee.id,
          buyingStationParchmentId: batch.batchCode,
          quantity: Number(parchmentOut),
          quantityUnit: 'kg',
        }, { transaction });
      }

      await transaction.commit();

      // get updated details
      const updatedBatch = await getProcessingBatch({ batchCode: batch.batchCode });

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: updatedBatch,
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