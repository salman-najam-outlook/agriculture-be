const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');

const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const warehouseValidator = require(rootPath +
  '/helpers/validators/warehouseCoffee');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /coffee/warehouse/product/name:
 *   post:
 *     description: create a new product name for coffee in warehouse
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
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                recordId:
 *                  type: string
 *              required:
 *                - name
 *            example: { "name": "Coffea arabica", "recordId": "record112241" }
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
 *                 example: { "success": true, "code": 200, "data": { "id": 6, "name": "Coffea arabica", "recordId": "record112241" } }
 *
 */
router.post(
  '/name',
  auth,
  warehouseValidator.saveProductName(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, recordId } = req.body;

      const setProductName = { userId, name, recordId };
      let product = await db.WarehouseProductName.create(setProductName);
      product = await product?.toJSON();
      if (product) {
        delete product.createdAt;
        delete product.updatedAt;
        delete product.userId;
      }

      return res.json(
        successRespSync({
          msg: success.SAVE,
          data: product,
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
 * /coffee/warehouse/product/name:
 *   get:
 *     description: get products names registered for the warehouse
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 6, "name": "Coffea arabica", "recordId": "record112241" }, { "id": 5, "name": "Coffea canephora", "recordId": "record112244" } ] }
 */
router.get('/name', auth, validationErrorHandler, async (req, res) => {
  try {
    const userId = req.user.id;

    const products = await db.WarehouseProductName.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
      where: { userId },
      raw: true,
    });

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: products,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
