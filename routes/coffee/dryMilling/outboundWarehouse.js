const express = require('express');
const router = express.Router();
const _ = require('lodash');
const moment = require('moment');
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId');
const warehouseValidator = require(rootPath +
  '/helpers/validators/warehouseCoffee');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const includeAssociations = [
];

/**
 * @swagger
 * /coffee/dry-milling/outbound-warehouse:
 *   post:
 *     description: Create outbound warehouse 
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: Request body for submitting new contact us inquiry
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                clientName: 
 *                    type: string
 *                warehouseProductNameId: 
 *                    type: integer
 *                warehouseProductName: 
 *                    type: integer
 *                inboundLotId: 
 *                    type: integer
 *                unitSize: 
 *                    type: float
 *                unitCount: 
 *                    type: integer
 *                unitUom: 
 *                    type: object
 *                    properties: 
 *                        name:
 *                            type: string
 *                        id:
 *                            type: integer
 *                totalQty:
 *                    type: string
 *                totalQtyUom:
 *                    type: object
 *                    properties: 
 *                        name:
 *                            type: string
 *                        id:
 *                            type: integer
 *                amount:
 *                    type: string
 *                amountUom:
 *                    type: object
 *                    properties: 
 *                        name:
 *                            type: string
 *                        id:
 *                            type: integer
 *                recordId: 
 *                    type: string
 *              required:
 *                - clientName
 *                - warehouseProductNameId
 *                - warehouseProductName
 *                - inboundLotId
 *                - unitSize
 *                - unitCount
 *                - unitUom
 *            example: { "clientName": "John Cena", "warehouseProductNameId": "1", "warehouseProductName": "Coffea arabica", "inboundLotId": "2", "unitSize": "100", "unitCount": "2", "unitUom": { "name": "bags", "id": null }, "totalQty": 200, "totalQtyUom": { "id": null, "name": "kg" }, "amount": 600, "amountUom": { "id": null, "name": "$" }, "recordId": "test121" }
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
 *                 example: { "success": true, "code": 200, "message": "Inserted successfully.", "data": { "id": 1, "clientName": "John Cena", "warehouseProductNameId": "1", "warehouseProductName": "Coffea arabica", "inboundLotId": "2", "unitSize": "100", "unitCount": "2", "unitUom": { "name": "bags", "id": null }, "totalQty": 200, "totalQtyUom": { "id": null, "name": "kg" }, "amount": 600, "amountUom": { "id": null, "name": "$" }, "recordId": "test121", "userId": 118, "updatedAt": "2022-12-02T08:23:53.298Z", "createdAt": "2022-12-02T08:23:53.298Z" } }
 *
 */
router.post(
  '/',
  auth,
  duplicateRecordId.handleDuplicateRecordId('DryMillingOutboundWarehouse'),
  warehouseValidator.saveOutbound(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const {
        clientId,
        clientName,
        warehouseProductNameId,
        warehouseProductName,
        inboundLotId,
        unitSize,
        unitCount,
        unitUom,
        totalQty,
        totalQtyUom,
        amount,
        amountUom,
        recordId,
      } = req.body;

      const set = {
        clientId,
        clientName,
        warehouseProductNameId,
        warehouseProductName,
        inboundLotId,
        unitSize,
        unitCount,
        unitUom,
        totalQty,
        totalQtyUom,
        amount,
        amountUom,
        recordId,
        userId: userId,
      };

      let outboundWarehouse = await db.DryMillingOutboundWarehouse.create(set);
      // await db.ParchmentCoffee.update(
      //   { outboundSent: true },
      //   { where: { id: parchmentId } }
      // );

      return res.json(
        successRespSync({
          msg: success.INSERTED,
          data: outboundWarehouse,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.post(
  '/save-cupping',
  auth,
  warehouseValidator.saveCuppingOutbound(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let {
        outbound_warehouse_id,
        cupping_name,
        fragrance,
        cupping_time,
        aromas,
        flavour,
        acidity,
        acidity_range,
        body,
        body_range,
        after_taste,
        balance,
        balance_range,
        note,
        final_score,
        roasting_time,
        roasting_temperature,
        roasting_temperature_unit,
        qualities,
        uniformity,
        clean_cup,
        sweetness,
        defect_cups,
        defect_intensity,
        fragrance_break,
        fragrance_dry,
        fragrance_qualities,
        flavour_qualities,
        after_taste_qualities,
        acidity_intensity,
        acidity_qualities,
        body_level,
        body_qualities,
        overall,
        defect_value,
      } = req.body;

      let outboundWarehouseCupping = await db.OutboundWarehouseCupping.create({
        outbound_warehouse_id,
        cupping_name,
        fragrance,
        cupping_time,
        aromas,
        flavour,
        acidity,
        acidity_range,
        body,
        body_range,
        after_taste,
        balance,
        balance_range,
        note,
        final_score,
        roasting_time,
        roasting_temperature,
        roasting_temperature_unit,
        qualities,
        uniformity,
        clean_cup,
        sweetness,
        defect_cups,
        defect_intensity,
        fragrance_break,
        fragrance_dry,
        fragrance_qualities: fragrance_qualities.join('|'),
        flavour_qualities: flavour_qualities.join('|'),
        after_taste_qualities: after_taste_qualities.join('|'),
        acidity_intensity,
        acidity_qualities: acidity_qualities.join('|'),
        body_level,
        body_qualities: body_qualities.join('|'),
        overall,
        defect_value,
      });

      outboundWarehouseCupping.fragrance_qualities = outboundWarehouseCupping.fragrance_qualities ? outboundWarehouseCupping.fragrance_qualities.split('|') : [];
      outboundWarehouseCupping.flavour_qualities = outboundWarehouseCupping.flavour_qualities ? outboundWarehouseCupping.flavour_qualities.split('|') : [];
      outboundWarehouseCupping.after_taste_qualities = outboundWarehouseCupping.after_taste_qualities ? outboundWarehouseCupping.after_taste_qualities.split('|') : [];
      outboundWarehouseCupping.acidity_qualities = outboundWarehouseCupping.acidity_qualities ? outboundWarehouseCupping.acidity_qualities.split('|') : [];
      outboundWarehouseCupping.body_qualities = outboundWarehouseCupping.body_qualities ? outboundWarehouseCupping.body_qualities.split('|') : [];

      return res.json(
        successRespSync({
          msg: success.OUTBOUND_CUPPING,
          data: outboundWarehouseCupping,
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
 * /coffee/dry-milling/outbound-warehouse/update:
 *   put:
 *     description: Update outbound warehouse 
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: Request body for submitting new contact us inquiry
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                image:
 *                  type: string
 *              required:
 *                - name
 *            example:
 *              {
 *                "id": 1,
 *                "clientName": "John Haze",
 *                "parchmentId": 1,
 *                "parchmentBarcode": "barcodeStr",
 *                "product": "product",
 *                "orderDetail": "23",
 *                "amount": 100,
 *                "quantity": 10,
 *                "outboundUnitValue": 110,
 *              }
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
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Data successfully updated.
 *
 */
router.put(
    '/update',
    auth,
    async (req, res) => {
        try {
            const userId = req.user.id;
            const {
                id,
                amount,
                parchmentId,
                product,
                parchmentBarcode,
                clientName,
                orderDetail,
                quantity,
                outboundUnitValue,
                recordId,
            } = req.body;
            const set = {
                amount,
                parchmentId,
                parchmentBarcode,
                product,
                clientName,
                orderDetail,
                quantity,
                outboundUnitValue,
                recordId,
            };

            for (let keyName in req.files) {
                const { size, location, key } = req.files?.[keyName].pop();
                set[keyName] = { size, location, key };
            }

            const _outboundWarehouse = await db.DryMillingOutboundWarehouse.findOne({
              where: { id }
            });

            if (!_outboundWarehouse) {
              throw new Error("Not found");
            }
          
            await db.ParchmentCoffee.update(
              { outboundSent: false },
              { where: { id: _outboundWarehouse.parchmentId } }
            );

            let outboundWarehouse = await db.DryMillingOutboundWarehouse.update(set, {
                where: { id },
            });

            await db.ParchmentCoffee.update(
              { outboundSent: true },
              { where: { id: parchmentId } }
            );

            return res.json(
                successRespSync({
                    msg: success.UPDATED,
                    data: outboundWarehouse,
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
 * /coffee/dry-milling/outbound-warehouse/list:
 *   get:
 *     description: List all register outbound warehouse information
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: query
 *        name: page
 *        schema:
 *          type: int
 *        example:
 *          1
 *      - in: query
 *        name: col
 *        description: provide column name to be sorted
 *        schema:
 *          type: string
 *        example:
 *          id
 *      - in: query
 *        name: desc
 *        schema:
 *          type: string
 *          enum: [true, false]
 *        example:
 *          true
 *      - in: query
 *        name: limit
 *        schema:
 *          type: int
 *        example:
 *          10
 *      - in: query
 *        name: dateRange
 *        description: seperate date by hyphen(-) for sending from and to date respectively
 *        schema:
 *          type: string
 *        example: 01/01/2012-12/31/2022
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 2, "clientName": "John Doe", "warehouseProductNameId": 4, "warehouseProductName": "new product", "inboundLotId": 1, "unitSize": null, "unitCount": null, "unitUom": null, "totalQty": 40, "totalQtyUom": { "id": null, "name": "kg" }, "amount": 600, "amountUom": { "id": null, "name": "$" }, "recordId": "test121", "outboundCode": "OB-02", "inboundCode": "IB-01", "createdDate": "30/11/2022", "qrCode": "{\"id\":2,\"clientName\":\"John Doe\",\"warehouseProductNameId\":4,\"warehouseProductName\":\"new product\",\"inboundLotId\":1,\"unitSize\":null,\"unitCount\":null,\"unitUom\":null,\"totalQty\":40,\"totalQtyUom\":{\"id\":null,\"name\":\"kg\"},\"amount\":600,\"amountUom\":{\"id\":null,\"name\":\"$\"},\"recordId\":\"test121\",\"outboundCode\":\"OB-02\",\"inboundCode\":\"IB-01\",\"createdDate\":\"30/11/2022\"}" } ] }
 */
router.get(
  '/list',
  auth,
  warehouseValidator.listOutbound(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page = 1, limit = 10, col = 'id', desc = 'true', dateRange, search } = req.query;
      let { id: userId } = req.user;
      limit = parseInt(limit);

      // where condition with condition
      let where = { userId: userId };
      // for searching
      if (!_.isEmpty(search)) {
        const fields = ['warehouseProductName', 'totalQty', 'clientName'];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }
      // for date filter
      if (!_.isEmpty(dateRange)) {
        const dates = dateRange.split('-');
        dates[0] = moment
          .utc(dates[0], process.env.ACCEPT_DATE_FORMAT)
          .format('YYYY-MM-DD 00:00:00');
        dates[1] =  moment
          .utc(dates[1], process.env.ACCEPT_DATE_FORMAT)
          .format('YYYY-MM-DD 23:59:59');
        console.log(dates);
        where.createdAt = { [db.Sequelize.Op.between]: dates };
      }

      let rows = await db.DryMillingOutboundWarehouse.findAll({
        attributes: {
          exclude: ['userId', 'isdeleted', 'updatedAt', 'createdAt'],
          include: [
            [
              db.Sequelize.fn(
                'concat',
                'OB-0',
                db.Sequelize.col('DryMillingOutboundWarehouse.id')
              ),
              'outboundCode',
            ],
            [
              db.Sequelize.fn(
                'concat',
                'IB-0',
                db.Sequelize.col('DryMillingOutboundWarehouse.inboundLotId')
              ),
              'inboundCode',
            ],
            [
              db.Sequelize.fn(
                'DATE_FORMAT',
                db.Sequelize.col('DryMillingOutboundWarehouse.createdAt'),
                '%d/%m/%Y'
              ),
              'createdDate',
            ],
          ],
        },
        where,
        offset: (page - 1) * limit,
        limit: limit,
        distinct: true,
        order: [[db.Sequelize.literal(col), desc == 'false' ? 'ASC' : 'DESC']],
        include: [
          {
            model: db.Cupping,
            as: 'cuppingData',
          },
        ],
      });

      rows = await Promise.all(
        rows?.map(async (outboundWarehouse) => {
          outboundWarehouse = await outboundWarehouse.toJSON();

          const { cuppingData } = outboundWarehouse;

          const cuppingResult = cuppingData.map(cupping => ({
            ...cupping,
            fragrance_qualities: cupping.fragrance_qualities ? cupping.fragrance_qualities.split('|') : [],
            flavour_qualities: cupping.flavour_qualities ? cupping.flavour_qualities.split('|') : [],
            after_taste_qualities: cupping.after_taste_qualities ? cupping.after_taste_qualities.split('|') : [],
            acidity_qualities: cupping.acidity_qualities ? cupping.acidity_qualities.split('|') : [],
            body_qualities: cupping.body_qualities ? cupping.body_qualities.split('|') : [],
            balance_qualities: cupping.balance_qualities ? cupping.balance_qualities.split('|') : [],
          }));

          const qrCode = JSON.stringify({...outboundWarehouse, cuppingData: cuppingResult});
          return { ...outboundWarehouse, qrCode, cuppingData: cuppingResult };
        })
      );

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


/**
 * @swagger
 * /coffee/dry-milling/outbound-warehouse/lot-history/{inboundLotId}:
 *   get:
 *     description: get outbound history of the inbound lot
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: path
 *        name: inboundLotId
 *        required: true
 *        schema:
 *          type: int
 *        example:
 *          1
 *      - in: query
 *        name: page
 *        schema:
 *          type: int
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: int
 *        example:
 *          10
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "inboundLot": { "inboundLotCode": "IB-02", "quantity": 100, "availableQuantity": 80, "images": [ { "s3Key": "img1222", "s3Location": "https://dimitra-public-images.s3.amazonaws.com/img1222" }, { "s3Key": "img1233", "s3Location": "https://dimitra-public-images.s3.amazonaws.com/img1233" } ] }, "outboundHistory": [ { "id": 5, "outboundCode": "OB-05", "clientName": "John Doe", "totalQty": 20, "totalQtyUom": { "id": null, "name": "kg" }, "createdDate": "30/11/2022", "warehouseProductName": "new product" } ] } }
 */
 router.get(
   '/lot-history/:inboundLotId',
   auth,
   warehouseValidator.inboundLotOutboundHistory(),
   validationErrorHandler,
   async (req, res) => {
     try {
       let { inboundLotId } = req.params;
       let { page = 1, limit = 10 } = req.query;
       limit = parseInt(limit);

       let outboundHistory = await db.DryMillingOutboundWarehouse.findAll({
         attributes: [
           'id',
           [
             db.Sequelize.fn(
               'concat',
               'OB-0',
               db.Sequelize.col('DryMillingOutboundWarehouse.id')
             ),
             'outboundCode',
           ],
           'clientName',
           'totalQty',
           'totalQtyUom',
           [
             db.Sequelize.fn(
               'DATE_FORMAT',
               db.Sequelize.col('DryMillingOutboundWarehouse.createdAt'),
               '%d/%m/%Y'
             ),
             'createdDate',
           ],
           'warehouseProductName',
         ],
         where: { inboundLotId },
         offset: (page - 1) * limit,
         limit: limit,
         raw: true,
       });

       let inboundLot = await db.DryMillingInboundWarehouse.findOne({
         attributes: [
           [
             db.Sequelize.fn(
               'concat',
               'IB-0',
               db.Sequelize.col('DryMillingInboundWarehouse.id')
             ),
             'inboundLotCode',
           ],
           'quantity',
           [
             db.Sequelize.literal(
               'DryMillingInboundWarehouse.quantity - COALESCE((SELECT SUM(dmow.totalQty) from `dry_milling_outbound_warehouse` as dmow where inboundLotId=DryMillingInboundWarehouse.id),0)'
             ),
             'availableQuantity',
           ],
           'images',
         ],
         where: { id: inboundLotId },
         raw: true,
       });

      outboundHistory = outboundHistory?.map((outbound) => {
        const qrCode = JSON.stringify({
          productName: outbound.warehouseProductName,
          productNameId: outbound.warehouseProductNameId,
          lotId: inboundLot.inboundLotCode,
          totalQuantity: outbound.totalQty,
          totalQuantityUom: outbound.totalQtyUom,
          unitSize: outbound.unitSize,
          unitUom: outbound.unitUom,
        });
        return { ...outbound, qrCode };
      });

        return res.json(
         successRespSync({
           msg: success.FETCH,
           data: { inboundLot, outboundHistory },
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
 * /coffee/dry-milling/outbound-warehouse/{id}:
 *   get:
 *     description: Fetch details of the register outbound warehouse with id
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: path
 *        name: id
 *        schema:
 *          type: int
 *          minimum: 1
 *        example:
 *          1
 *     responses:
 *       200:
 *         description: On success response if data is present related to the id.
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
 *               example:
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data:
 *                     id: 16
 */
router.get(
  '/:id',
  auth,
  // validationErrorHandler,
  async (req, res) => {
    try {
        let { id: userId } = req.user;
        let { id } = req.params;

        let outboundWarehouse = await db.DryMillingOutboundWarehouse.findOne({
            where: { id, userId: userId },
            include: includeAssociations,
        });

        outboundWarehouse = await outboundWarehouse.toJSON();

        const { amount, product, quantity, outboundUnitValue, outboundUnitId, recordId } = outboundWarehouse;
        const qrCode = ({
          amount,
          product,
          quantity,
          outboundUnitId,
          outboundUnitValue,
          recordId
        });

        return res.json(
            successRespSync({
                msg: success.FETCH,
                data: { outboundWarehouse, qrCode },
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
 * /coffee/dry-milling/outbound-warehouse/delete/{id}:
 *   delete:
 *     description: Delete outbound warehouse data with id
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: path
 *        name: id
 *        schema:
 *          type: int
 *          minimum: 1
 *        example:
 *          1
 *     responses:
 *       200:
 *         description: On success response if data is present related to the id.
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
 *               example:
 *                 success: true
 *                 code: 200
 *                 message: Outbound warehouse data deleted successfully.
 *                 data:
 */
router.delete(
  '/delete/:id',
  auth,
  // validatorSoilMgmt.exist(),
  // validationErrorHandler,
  async function (req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;

      const transaction = await db.sequelize.transaction();
      try {
        await db.DryMillingOutboundWarehouse.destroy({
          where: { id: id, userId: userId },
          transaction,
        });

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: 'Dry milling outbound warehouse deleted.',
          })
        );
      } catch (err) {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
