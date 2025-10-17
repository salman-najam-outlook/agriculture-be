const express = require('express');
const router = express.Router();
const moment = require('moment');
const { QueryTypes } = require('sequelize');
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { successResp, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const {
  createShipmentValidation,
  updateShipmentValidation,
  getShipmentsValidation,
} = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

const { logErrorOccurred } = require(rootPath + '/helpers/general');

/**
 * @swagger
 * /shipment/dashboard:
 *   get:
 *     description: Fetch data related to shipment for the dashboard
 *     tags: [Shipment]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *     responses:
 *       200:
 *         description: On success response if data is present.
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
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                    total: 2
 *                    complete: 0
 *                    active: 0
 *
 */
router.get('/dashboard', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // fetch DATA from the table
    const query = `select count(*) as total,
    count(if(status='complete',1,null)) as complete,
    count(if(status='active',1,null)) as active
    from shipments
    where userId=:userId`;
    // execute query
    let dashboard = await db.sequelize.query(query, {
      replacements: { userId },
      type: QueryTypes.SELECT,
      plain: true,
    });

    // send response
    return res.json(
      await successResp({
        msg: dashboard == null ? success.NO_RESPONSE : success.FETCH,
        data: dashboard,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /shipment:
 *   get:
 *     description: List shipments of the user
 *     tags: [Shipment]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *      - in: query
 *        name: page
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          10
 *     responses:
 *       200:
 *         description: On success response if data is present.
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
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                    numRows: 3
 *                    info:
 *                    - id: 1
 *                      pointOfDestination:
 *                      status: pending
 *                      etaDate: '2021-08-22T00:00:00.000Z'
 *                      order:
 */
router.get(
  '/',
  auth,
  getShipmentsValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      let { page, limit = 10 } = req.query;
      limit = parseInt(limit);

      // fetch DATA from the table
      let shipment = await db.shipment.findAll({
        attributes: ['id', 'pointOfDestination', 'status', 'etaDate'],
        where: { userId },
        offset: (page - 1) * limit,
        limit: limit,
        subQuery: false,
        include: { model: db.order, attributes: ['orderNo', 'description'] },
      });

      // send response
      return res.json(
        await successResp({
          msg: shipment == null ? success.NO_RESPONSE : success.FETCH,
          data: Array.isArray(shipment)
            ? { numRows: shipment.length, data: shipment }
            : shipment,
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
 * /shipment:
 *   put:
 *     description: Update shipment information(shipment)
 *     tags: [Shipment]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *     requestBody:
 *       description: Update shipment information with shipment id
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  id:
 *                    type: integer
 *                  productNumber:
 *                    type: string
 *                  productDescription:
 *                    type: string
 *                  weight:
 *                    type: float
 *                  weightUomId:
 *                    type: integer
 *                  quantity:
 *                    type: float
 *                  quantityUomId:
 *                    type: integer
 *                  costPer:
 *                    type: float
 *                  hsCode:
 *                    type: integer
 *                  duty:
 *                    type: float
 *                  subtotal:
 *                    type: float
 *                  total:
 *                    type: float
 *              example:
 *                  id: 1
 *                  productNumber: 21
 *                  productDescription: mohali punjab
 *                  weight: '250'
 *                  weightUomId: '2'
 *                  quantity: '100'
 *                  quantityUomId: '1'
 *                  costPer: '12'
 *                  hsCode: '1522562'
 *                  duty: '12'
 *                  subtotal: '120'
 *                  total: '200'
 *     responses:
 *       200:
 *         description: on success response
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
 *                  success: true
 *                  code: 200
 *                  message: Shipment updated successfully.
 *                  data: {}
 *
 */
router.put(
  '/',
  auth,
  updateShipmentValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let {
        id,
        sellerId,
        shippingAddress,
        pointOfOrigin,
        reference,
        currency,
        buyerId,
        receiverAddress,
        pointOfDestination,
        paymentTerms,
        productNumber,
        productDescription,
        weight,
        weightUomId,
        quantity,
        quantityUomId,
        costPer,
        hsCode,
        duty,
        subtotal,
        total,
      } = req.body;

      const set = {
        sellerId,
        shippingAddress,
        pointOfOrigin,
        reference,
        currency,
        buyerId,
        receiverAddress,
        pointOfDestination,
        paymentTerms,
        productNumber,
        productDescription,
        weight,
        weightUomId,
        quantity,
        quantityUomId,
        costPer,
        hsCode,
        duty,
        subtotal,
        total,
      };

      // remove undefined values before inserting
      Object.keys(set).forEach((key) => {
        set[key] == undefined || set[key] == null ? delete set[key] : {};
      });

      // update shipment information into DB
      await db.shipment.update(set, { where: { id } });

      // send response back to client
      return res.json(
        await successResp({
          msg: success.SHIPMENT_UPDATED,
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
 * /shipment:
 *   post:
 *     description: Create new shipment(shipment)
 *     tags: [Shipment]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *     requestBody:
 *       description: Create new shipment of the user
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  invoiceDate:
 *                    type: string
 *                  etaDate:
 *                    type: string
 *                  orderId:
 *                    type: integer
 *              example:
 *                  invoiceDate: '08/19/21'
 *                  etaDate: '08/22/21'
 *                  orderId: 2
 *     responses:
 *       200:
 *         description: on success response
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
 *                  success: true
 *                  code: 200
 *                  message: Shipment created successfully.
 *                  data:
 *                    id: 4
 *                    userId: 17
 *                    invoiceDate: '2021-08-19T00:00:00.000Z'
 *                    etaDate: '2021-08-22T00:00:00.000Z'
 *                    orderId: 2
 *                    status: pending
 *                    updatedAt: '2022-03-29T12:05:57.628Z'
 *                    createdAt: '2022-03-29T12:05:57.628Z'
 *
 */
router.post(
  '/',
  auth,
  createShipmentValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const ACCEPT_FORMAT = process.env.ACCEPT_DATE_FORMAT;
      const status = 'pending';
      let { invoiceDate, etaDate, orderId } = req.body;

      // convert string into JS DateTime
      invoiceDate = moment.utc(invoiceDate, ACCEPT_FORMAT);
      etaDate = moment.utc(etaDate, ACCEPT_FORMAT);

      let set = {
        userId,
        invoiceDate,
        etaDate,
        orderId,
        status,
      };
      // remove undefined values before inserting
      Object.keys(set).forEach((key) => {
        set[key] == undefined || set[key] == null ? delete set[key] : {};
      });

      // insert farm data into DB
      let shipment = await db.shipment.create(set);
      return res.json(
        await successResp({
          msg: success.SHIPMENT_CREATED,
          data: shipment,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
