const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { success } = require(rootPath + '/helpers/language');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const translation = require(rootPath + '/middleware/translation');


/**
 * @swagger
 * /currency:
 *   get:
 *     summary: list all the currencies.
 *     description: list all the currencies.
 *     tags: [Currency]
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
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 1, "symbol": "USh", "abbreviation": "UGX", "name": "Ugandan shilling", "createdAt": "2022-05-18T00:58:23.000Z", "updatedAt": "2022-05-18T00:58:23.000Z" }, { "id": 2, "symbol": "₹", "abbreviation": "INR", "name": "Indian rupee", "createdAt": "2022-05-18T00:58:23.000Z", "updatedAt": "2022-05-18T00:58:23.000Z" }, { "id": 3, "symbol": "$", "abbreviation": "USD", "name": "United States dollar", "createdAt": "2022-05-18T00:58:23.000Z", "updatedAt": "2022-05-18T00:58:23.000Z" } ] }
 */
router.get('/', auth, translation, async function (req, res) {
  try {
    let currencies = await db.Currency.findAll();
    if (req.headers.lang && req.headers.lang != 'en') {
      currencies =  req.translateFunction(currencies, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
      })
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: currencies,
      })
    );
  } catch (err) {
    return serverError(res, err);
  }
});

module.exports = router;
