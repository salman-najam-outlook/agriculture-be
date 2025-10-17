const express = require('express');
const router = express.Router();
const _ = require('lodash');
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
  const includeAssociations = [];
  const includeCuppingAssociations = (module_id = null) => [
    {
      model: db.DryMillingInboundWarehouse,
      as: 'cuppingData',
      include: [
        {
            model: db.Cupping,
            as: 'cuppingData',
        },
      ],
      required: false,
    }
  ];

/**
 * @swagger
 * /coffee/dry-milling/inbound-warehouse:
 *   post:
 *     description: Create inbound warehouse
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
 *                productNameId: 
 *                    type: integer
 *                senderId: 
 *                    type: integer
 *                quantity: 
 *                    type: float
 *                quantityUom: 
 *                    type: object
 *                    properties: 
 *                        name:
 *                            type: string
 *                        id:
 *                            type: integer
 *                unitCount: 
 *                    type: integer
 *                unitSize: 
 *                    type: float
 *                unitUom: 
 *                    type: object
 *                    properties: 
 *                        name:
 *                            type: string
 *                        id:
 *                            type: integer
 *                amount: 
 *                    type: float
 *                amountUom: 
 *                    type: object
 *                    properties: 
 *                        name:
 *                            type: string
 *                        id:
 *                            type: integer
 *                productED: 
 *                    type: string
 *                images: 
 *                    type: array
 *                    items: 
 *                        type: string
 *                lots:
 *                    type: array
 *                    items: 
 *                        type: object
 *                        properties: 
 *                            id:
 *                                type: integer
 *                            coffee:
 *                                type: object
 *                                properties: 
 *                                    name:
 *                                        type: string
 *                                    greenBeansBagWeighInKg:
 *                                        type: float
 *                                    greenBeansBags:
 *                                        type: integer
 *                recordId: 
 *                    type: string
 *              required:
 *                - productNameId
 *                - quantity
 *                - quantityUom
 *                - unitCount
 *                - unitSize
 *                - unitUom
 *                - productED
 *            example: { "productNameId": "1", "senderId": "118", "quantity": 4400, "quantityUom": { "name": "kg", "id": null }, "unitCount": 220, "unitSize": 20, "unitUom": { "name": "bags", "id": null }, "amount": 100, "amountUom": { "name": "$", "id": null }, "productED": "2024-02-02", "images": [ "img1222" ], "lots": [ { "id": "25608", "coffee": { "name": "alibaba", "greenBeansBagWeighInKg": "4400", "greenBeansBags": "34" } } ], "recordId": "test123" }
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
 *                 example: { "success": true, "code": 200, "message": "Inserted successfully.", "data": { "id": 2, "userId": 118, "senderId": "870", "productNameId": "1", "quantity": 4400, "quantityUom": { "name": "kg", "id": null }, "unitSize": 20, "unitCount": 220, "unitUom": { "name": "bags", "id": null }, "amount": 100, "amountUom": { "name": "$", "id": null }, "productED": "2024-02-02", "images": [ { "s3Key": "img1222", "s3Location": "https://dimitra-public-images.s3.amazonaws.com/img1222" } ], "recordId": "test123", "updatedAt": "2022-12-02T08:19:31.494Z", "createdAt": "2022-12-02T08:19:31.494Z" } }
 */
router.post(
  '/',
  auth,
  duplicateRecordId.handleDuplicateRecordId('DryMillingInboundWarehouse'),
  warehouseValidator.saveInbound(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      let {
        productNameId,
        senderId,
        quantity,
        quantityUom,
        unitSize,
        unitCount,
        unitUom,
        amount,
        amountUom,
        productED,
        images,
        recordId,
        lots,
        type,
      } = req.body;

      // generate url for s3keys if images not empty
      images = images?.map((s3Key) => ({
        s3Key,
        s3Location: `${
          process.env.PUBLIC_BUCKET_URL ||
          'https://dimitra-public-images.s3.amazonaws.com/'
        }${s3Key}`,
      }));

      const setDryMillingInboundWarehouse = {
        userId,
        senderId,
        productNameId,
        quantity,
        quantityUom,
        unitSize,
        unitCount,
        unitUom,
        amount,
        amountUom,
        ...(productED && { productED: productED }),
        images,
        recordId,
        type
      };

      let inboundWarehouse = await db.DryMillingInboundWarehouse.create(
        setDryMillingInboundWarehouse
      );

      if (!_.isEmpty(lots)) {
        // we have 2 types of lots so farm drymilling and buyingstationbatches
        // save map between warehouse inbound and dry milling parchment
        let setMapWHSInboundDryMillingParchmentCoffee = []
        setMapWHSInboundDryMillingParchmentCoffee = lots?.filter(fel => fel.type == "DRY_MILLING").map(
          ({ id: dryMillingParchmentCoffeeId, coffee: parchment }) => ({
            warehouseInboundId: inboundWarehouse.id,
            userId,
            parchment,
            dryMillingParchmentCoffeeId,
          })
        );
        if(setMapWHSInboundDryMillingParchmentCoffee.length > 0)
         {
           await db.MapWHSInboundDryMillingParchmentCoffee.bulkCreate(
             setMapWHSInboundDryMillingParchmentCoffee
           );

            // update dry milling parchment coffee status
          await db.ParchmentCoffee.update(
            { usedForWarehouse: true },
            { where: { id: lots?.map(({ id }) => id) } }
          );

         }
         
        // changes for processingBatch
        let warehouseBatchMapEntries = []
        lots.forEach(lotEl => {
          if(lotEl.type == "BUYING_STATION") {
            warehouseBatchMapEntries.push({
              userId,
              warehouseInboundId: inboundWarehouse.id,
              processingBatchId: lotEl.id
            })
          }
        })

        if(warehouseBatchMapEntries.length > 0) {
          await db.MapWHSInboundProcessingBatch.bulkCreate(warehouseBatchMapEntries)
  
          await db.BuyingStationProcessingBatch.update(
            { usedForWarehouse: true },
            { where: { id: lots?.filter(fel => fel.type == "BUYING_STATION").map(({ id }) => id) } }
          );
        }

      }

      return res.json(
        successRespSync({
          msg: success.INSERTED,
          data: inboundWarehouse,
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
 * /coffee/dry-milling/inbound-warehouse/update:
 *   put:
 *     description: Update inbound warehouse
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
 *                "parchmentId": 1,
 *                "parchmentBarcode": "barcodeStr",
 *                "product": "product123",
 *                "amount": 100,
 *                "quantity": 10,
 *                "inboundUnitValue": 110,
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
router.put('/update', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      id,
      amount,
      parchmentId,
      parchmentBarcode,
      product,
      quantity,
      inboundUnitValue,
      recordId,
      type
    } = req.body;
    const set = {
      amount,
      parchmentId,
      parchmentBarcode,
      product,
      quantity,
      inboundUnitValue,
      recordId,
      type
    };

    const _inboundWarehouse = await db.DryMillingInboundWarehouse.findOne({
      where: { id },
    });

    if (!_inboundWarehouse) {
      throw new Error('Not found');
    }

    await db.ParchmentCoffee.update(
      { usedForWarehouse: false },
      { where: { id: _inboundWarehouse.parchmentId } }
    );

    for (let keyName in req.files) {
      const { size, location, key } = req.files?.[keyName].pop();
      set[keyName] = { size, location, key };
    }

    let inboundWarehouse = await db.DryMillingInboundWarehouse.update(set, {
      where: { id },
    });

    await db.ParchmentCoffee.update(
      { usedForWarehouse: true },
      { where: { id: parchmentId } }
    );

    return res.json(
      successRespSync({
        msg: success.UPDATED,
        data: inboundWarehouse,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /coffee/dry-milling/inbound-warehouse/list:
 *   get:
 *     description: List all register parchment coffee information
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
 *        name: limit
 *        schema:
 *          type: int
 *        example:
 *          10
 *      - in: query
 *        name: col
 *        schema:
 *          type: string
 *        example:
 *          id
 *      - in: query
 *        name: desc
 *        schema:
 *          type: boolean
 *        example:
 *          true
 *      - in: query
 *        name: expDays
 *        schema:
 *          type: integer
 *      - in: query
 *        name: lowQty
 *        schema:
 *          type: integer
 *      - in: query
 *        name: search
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: On success response if data is present related to dry milling inbound warehouse.
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 2, "quantity": 4400, "quantityUom": { "id": null, "name": "kg" }, "unitSize": 20, "unitUom": { "id": null, "name": "bags" }, "unitCount": 220, "amount": 100, "amountUom": { "id": null, "name": "$" }, "productED": "2024-02-02", "images": [ { "s3Key": "img1222", "s3Location": "https://dimitra-public-images.s3.amazonaws.com/img1222" } ], "recordId": "test123", "productExpDays": 427, "inboundLotCode": "IB-02", "totalAmount": 440000, "availableQuantity": 4200, "createdDate": "2022-12-02", "warehouseProduct": { "id": 1, "name": "Coffea arabica" }, "warehouseSender": { "id": 118, "name": "shehrozkhan" }, "qrCode": "{\"inboundLotId\":2,\"inboundLotCode\":\"IB-02\",\"warehouseProduct\":{\"id\":1,\"name\":\"Coffea arabica\"},\"amount\":100,\"amountUom\":{\"id\":null,\"name\":\"$\"},\"unitSize\":20,\"unitCount\":220,\"unitUom\":{\"id\":null,\"name\":\"bags\"},\"quantity\":4400,\"quantityUom\":{\"id\":null,\"name\":\"kg\"},\"recordId\":\"test123\"}" } ] }
 */
router.get(
  '/list',
  auth,
  warehouseValidator.listInbound(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let {
        page = 1,
        limit = 10,
        col = 'id',
        desc = 'true',
        lowQty,
        expDays,
        search,
      } = req.query;
      let { id: userId } = req.user;
      limit = parseInt(limit);

      // generate having condition based on condition
      let having = {};
      if (!_.isEmpty(lowQty)) {
        having = {
          ...having,
          $availableQuantity$: {
            [db.Sequelize.Op.lte]: lowQty,
          },
        };
      }
      if (!_.isEmpty(expDays)) {
        having = {
          ...having,
          $productExpDays$: {
            [db.Sequelize.Op.lte]: expDays,
          },
        };
      }

      // generate where condition based on condition
      let where = { userId: userId };
      // for searching
      if (!_.isEmpty(search)) {
        const fields = ['recordId', 'quantity', '$warehouseProduct.name$'];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.substring]: search,
            },
          };
        });
        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }

      let rows = await db.DryMillingInboundWarehouse.findAll({
        include: [
          {
            model: db.WarehouseProductName,
            as: 'warehouseProduct',
            attributes: ['id', 'name'],
          },
          {
            model: db.user,
            as: 'warehouseSender',
            attributes: [
              'id',
              [
                db.Sequelize.fn(
                  'CONCAT',
                  db.Sequelize.col('firstName'),
                  ' ',
                  db.Sequelize.fn('COALESCE', db.Sequelize.col('middleName'), ''),
                  ' ',
                  db.Sequelize.col('lastName')
                ),
                'name',
              ],
            ],
            
          },
          {
            model: db.Cupping,
            as: 'cuppingData',
          },
          // {
          //   model: db.InboundWarehouseCupping,
          //   as: 'inboundWarehouseCupping',
          //   attributes: ['cupping_name', 'fragrance'],
          // },
        ],
        attributes: {
          exclude: [
            'userId',
            'senderId',
            'productNameId',
            'isdeleted',
            'createdAt',
            'updatedAt',
          ],
          include: [
            [
              db.Sequelize.fn(
                'datediff',
                db.Sequelize.col('productED'),
                db.Sequelize.literal('CURRENT_DATE()')
              ),
              'productExpDays',
            ],
            [
              db.Sequelize.fn(
                'concat',
                'IB-0',
                db.Sequelize.col('DryMillingInboundWarehouse.id')
              ),
              'inboundLotCode',
            ],
            [
              db.Sequelize.literal(
                 'ROUND(DryMillingInboundWarehouse.amount*DryMillingInboundWarehouse.quantity, 2)'
              ),
              'totalAmount',
            ],
            [
              db.Sequelize.literal(
                'DryMillingInboundWarehouse.quantity - COALESCE((SELECT SUM(dmow.totalQty) from `dry_milling_outbound_warehouse` as dmow where inboundLotId=DryMillingInboundWarehouse.id),0)'
              ),
              'availableQuantity',
            ],
            [
              db.Sequelize.fn(
                'DATE_FORMAT',
                db.Sequelize.col('DryMillingInboundWarehouse.createdAt'),
                '%Y-%m-%d'
              ),
              'createdDate',
            ],
          ],
        },
        where,
        having,
        offset: (page - 1) * limit,
        limit: limit,
        order: [[col, desc == 'false' ? 'ASC' : 'DESC']],
        // raw: true,
        nest: true,
        subQuery: false,
      });

      rows = JSON.parse(JSON.stringify(rows));
      // for adding qrCode
      const data = await Promise.all(
        rows?.map( async (inboundWarehouse) => {
          const {
            id,
            inboundLotCode,
            warehouseProduct,
            amount,
            amountUom,
            unitSize,
            unitCount,
            unitUom,
            quantity,
            quantityUom,
            recordId,
            type,
            cuppingData
          } = inboundWarehouse;

          const cuppingResult = cuppingData.map(cupping => ({
            ...cupping,
            fragrance_qualities: cupping.fragrance_qualities ? cupping.fragrance_qualities.split('|') : [],
            flavour_qualities: cupping.flavour_qualities ? cupping.flavour_qualities.split('|') : [],
            after_taste_qualities: cupping.after_taste_qualities ? cupping.after_taste_qualities.split('|') : [],
            acidity_qualities: cupping.acidity_qualities ? cupping.acidity_qualities.split('|') : [],
            body_qualities: cupping.body_qualities ? cupping.body_qualities.split('|') : [],
            balance_qualities: cupping.balance_qualities ? cupping.balance_qualities.split('|') : [],
          }));

          const qrCode = JSON.stringify({
            inboundLotId: id,
            inboundLotCode,
            warehouseProduct,
            amount,
            amountUom,
            unitSize,
            unitCount,
            unitUom,
            quantity,
            quantityUom,
            recordId,
            type,
            cuppingResult
          });

          return { ...inboundWarehouse, qrCode, cuppingData: cuppingResult };
        })
      );

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: data,
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
  warehouseValidator.saveCuppingInbound(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let {
        inbound_warehouse_id,
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

      let inboundWarehouseCupping = await db.InboundWarehouseCupping.create({
        inbound_warehouse_id,
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

      inboundWarehouseCupping.fragrance_qualities = inboundWarehouseCupping.fragrance_qualities ? inboundWarehouseCupping.fragrance_qualities.split('|') : [];
      inboundWarehouseCupping.flavour_qualities = inboundWarehouseCupping.flavour_qualities ? inboundWarehouseCupping.flavour_qualities.split('|') : [];
      inboundWarehouseCupping.after_taste_qualities = inboundWarehouseCupping.after_taste_qualities ? inboundWarehouseCupping.after_taste_qualities.split('|') : [];
      inboundWarehouseCupping.acidity_qualities = inboundWarehouseCupping.acidity_qualities ? inboundWarehouseCupping.acidity_qualities.split('|') : [];
      inboundWarehouseCupping.body_qualities = inboundWarehouseCupping.body_qualities ? inboundWarehouseCupping.body_qualities.split('|') : [];

      return res.json(
        successRespSync({
          msg: success.INBOUND_CUPPING,
          data: inboundWarehouseCupping,
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
 * /coffee/dry-milling/inbound-warehouse/lots:
 *   get:
 *     description: List all inbound warehouse lots as a options for warehouse outbound creation
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
 *        name: limit
 *        schema:
 *          type: int
 *        example:
 *          10
 *      - in: query
 *        name: col
 *        schema:
 *          type: string
 *        example:
 *          id
 *      - in: query
 *        name: desc
 *        schema:
 *          type: boolean
 *        example:
 *          true
 *      - in: query
 *        name: warehouseProductNameId
 *        schema:
 *          type: integer
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 3, "unitSize": 100, "unitCount": 10, "unitUom": { "id": null, "name": "bags" }, "inboundLotCode": "IB-03", "totalAmount": 100000, "availableQuantity": 780 } ] }
 */
router.get(
  '/lots',
  auth,
  warehouseValidator.listInbound(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let {
        page = 1,
        limit = 100000,
        col = 'id',
        desc = 'true',
        warehouseProductNameId:productNameId,
      } = req.query;
      let { id: userId } = req.user;
      limit = parseInt(limit);

      // generate where condition based on condition
      let where = { userId: userId };
      if (!_.isEmpty(productNameId)) {
        where = { productNameId, ...where };
      }

      let rows = await db.DryMillingInboundWarehouse.findAll({
        attributes: [
          'id',
          'unitSize',
          'quantityUom',
          'unitCount',
          'unitUom',
          [
            db.Sequelize.fn(
              'concat',
              'IB-0',
              db.Sequelize.col('DryMillingInboundWarehouse.id')
            ),
            'inboundLotCode',
          ],
          [
            db.Sequelize.literal(
              'DryMillingInboundWarehouse.amount*DryMillingInboundWarehouse.quantity'
            ),
            'totalAmount',
          ],
          [
            db.Sequelize.literal(
              'DryMillingInboundWarehouse.quantity - COALESCE((SELECT SUM(dmow.totalQty) from `dry_milling_outbound_warehouse` as dmow where inboundLotId=DryMillingInboundWarehouse.id),0)'
            ),
            'availableQuantity',
          ],
        ],
        where,
        having: { $availableQuantity$: { [db.Sequelize.Op.gt]: 0 } },
        offset: (page - 1) * limit,
        limit: limit,
        order: [[col, desc == 'false' ? 'ASC' : 'DESC']],
        raw: true,
        nest: true,
        subQuery: false,
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

/**
 * @swagger
 * /coffee/dry-milling/inbound-warehouse/{id}:
 *   get:
 *     description: Fetch details of the register inbound warehouse with id
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

      let inboundWarehouse = await db.DryMillingInboundWarehouse.findOne({
        where: { id, userId: userId },
        include: includeAssociations,
      });

      inboundWarehouse = await inboundWarehouse.toJSON();

      const {
        amount,
        product,
        quantity,
        inboundUnitValue,
        inboundUnitId,
        recordId,
      } = inboundWarehouse;
      const qrCode = JSON.stringify({
        amount,
        product,
        quantity,
        inboundUnitId,
        inboundUnitValue,
        recordId,
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { inboundWarehouse, qrCode },
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
 * /coffee/dry-milling/inbound-warehouse/delete/{id}:
 *   delete:
 *     description: Delete inbound warehouse data with id
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
 *                 message: Inbound warehouse data deleted successfully.
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
        await db.DryMillingInboundWarehouse.destroy({
          where: { id: id, userId: userId },
          transaction,
        });

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: 'Dry milling inbound warehouse deleted.',
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