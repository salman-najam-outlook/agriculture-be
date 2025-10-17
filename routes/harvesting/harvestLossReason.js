const express = require('express');
const { Op } = require('sequelize');
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
 * /harvesting/loss_reason:
 *   get:
 *     description: Returns all reason fot losses  (user specific)
 *     tags: [Harvesting]
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
router.get('/', auth, translation, validationErrorHandler, async (req, res) => {
  try {
    let orderBy = [['name', 'ASC']];

    const userId = req.user.id;
    let query = {
      raw: true,
      where: {
        userId: {
          [Op.or]: [userId, null],
        },
      },
      order: orderBy,
      attributes: ['id', 'name'],
    };
    // fetch data from DB
    let result = await db.harvest_reason_for_loss.findAll(query);
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
});

module.exports = router;
