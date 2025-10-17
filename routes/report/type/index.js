const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const db = require(rootPath + '/models');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');


/**
 * @swagger
 * /report/types:
 *   get:
 *     summary: Get All Report types
 *     description: Returns all report types
 *     tags: [Report]
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
 *                     properties:
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{"id": 1,"name": "NDVI"}, {"id": 2,"name": "LSWI"}, {"id": 3,"name": "RECI"}, {"id": 4,"name": "MSAVI"}, {"id": 5,"name": "NDRE"}]
 *
 */

 router.get('/', auth, async (req, res) => {
    try {
      const reportTypes = await db.report_types.findAll({
        attributes:[
          'id', 'name'
        ]
      });
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: reportTypes,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  });

  module.exports = router;