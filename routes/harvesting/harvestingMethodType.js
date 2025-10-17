const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const { serverError, successRespSync } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /harvesting/method/types/{id}:
 *   get:
 *     description: Returns all types of harvesting method  (user specific)
 *     tags: [Harvesting]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: harvest method id
 *         schema:
 *           type: integer
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
 *                   data: [{id: 1, name: Manual (hand) harvesting}]
 *
 *
 */
router.get(
  '/:id',
  auth,
  translation,
  validationErrorHandler,
  async (req, res) => {
    let { id } = req.params;
    try {
      let orderBy = [['id', 'ASC']];

      let query = {
        raw: true,
        where: {
          harvestMethodId: id,
        },
        order: orderBy,
        attributes: ['id', 'harvestMethodId', 'name'],
      };
      // fetch data from DB
      let result = await db.HarvestMethodType.findAll(query);
      result = req.translateFunction(result, globalTranslationCache, {
        lvl1: true,
        lvl2: false,
      });

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
