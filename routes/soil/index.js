const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const { serverError, successRespSync } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const { listValidation } = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

router.use('/management', require('./management'));
router.use('/information', require('./information'));

/**
 * @swagger
 * /soil/type:
 *   get:
 *     description: List all the soil types
 *     tags: [Soil Options]
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
 *                    num_rows: 5
 *                    info:
 *                    - image: https://dimitra-private.s3.amazonaws.com/Soil/20211218145343Sandysoil.png?AWSAccessKeyId=AKIAXGW3CQWTJL4BH3MK&Expires=1648546823&Signature=wpoZ6YXj4PJn34b1FidFfafCdg8%3D
 *                      id: 2
 *                      name: Sandy soil
 *                      imageS3Key: Soil/20211218145343Sandysoil.png
 */
router.get(
  '/type',
  auth,
  translation,
  listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page, limit, name } = req.query;
      limit = parseInt(limit);
      let where = {};
      // check if search is not null and undefined
      if (name != null && name != undefined && name.length > 0) {
        where.name = {
          [Op.like]: '%' + name + '%',
        };
      }

      // generating query
      let query = {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where,
      };
      if (notEmpty(page) && notEmpty(limit)) {
        limit = parseInt(limit);
        query.offset = (page - 1) * limit;
        query.limit = limit;
      }

      // fetch data from DB
      let result = await db.SoilType.findAll(query);
      result = {
        num_rows: result.length,
        data: result,
      };

      result.data = req.translateFunction(result.data, globalTranslationCache, {
        lvl1: true,
        lvl2: false,
        moduleName: null,
      });
      // send response
      return res.json(
        successRespSync({
          msg: result == null ? success.NO_RESPONSE : success.FETCH,
          data: result,
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
 * /soil/PH:
 *   get:
 *     description: List all the soil PH options
 *     tags: [Soil Options]
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
 *                    num_rows: 1
 *                    info:
 *                    - id: 1
 *                      type: acidic
 *                      greaterThen: 0
 *                      lessThen: 7
 */
router.get(
  '/PH',
  auth,
  listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page, limit, name } = req.query;
      limit = parseInt(limit);
      let where = {};
      // check if search is not null and undefined
      if (name != null && name != undefined && name.length > 0) {
        where.type = {
          [Op.like]: '%' + name + '%',
        };
      }

      // generating query
      let query = {
        attributes: ['id', 'type', 'greaterThen', 'lessThen'],
        offset: (page - 1) * limit,
        limit: limit,
        where,
      };

      // fetch data from DB
      let result = await db.Soil_PH.findAll(query);
      result = {
        num_rows: result.length,
        data: result,
      };

      // send response
      return res.json(
        successRespSync({
          msg: result == null ? success.NO_RESPONSE : success.FETCH,
          data: result,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
