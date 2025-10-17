const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const { errorRespSync, serverError, successRespSync } = require(rootPath +
  '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { harvestingMethodValidator } = require(rootPath +
  '/helpers/validators/harvesting');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /harvesting/method:
 *   post:
 *     description: Add new harvesting method for user
 *     tags: [Harvesting]
 *     requestBody:
 *       description: Request body for creting new harvesting data
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
 *              {"title": "Manual"}
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
 *                       title:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Harvesting Method added successfully.
 *                   data: {"id": 3,"title": "Manual (hand) harvesting"}
 *        '409':
 *           description: Conflict
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
 *                       title:
 *                        type: string
 *                 example:
 *                   success: false
 *                   code: 409
 *                   message: Harvesting method already exist.
 *                   data: {"id": 1,"title": "Manual (hand) harvesting"}
 *
 */
router.post(
  '/',
  auth,
  harvestingMethodValidator(),
  validationErrorHandler,
  async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      const { title } = req.body;
      const exists = await db.HarvestMethod.findOne({
        where: {
          title,
          userId: {
            [Op.or]: [userId, null],
          },
        },
      });
      if (exists !== null) {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: error.HARVESTING_METHOD_EXISTS,
            code: error.code.CONFLICT,
            data: { id: exists.id, title: exists.title },
          })
        );
      }
      const set = {
        userId,
        title,
      };
      const result = await db.HarvestMethod.create(set, {
        transaction: t,
      });

      await t.commit();
      return res.json(
        successRespSync({
          msg: success.HARVEST_METHOD_CREATED,
          data: {
            id: result.id,
            title: result.title,
          },
        })
      );
    } catch (err) {
      await t?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc Fetch all the harvest method list by user.
 */

/**
 * @swagger
 * /harvesting/method:
 *   get:
 *     description: Returns all harvesting method (user specific)
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
  let { order } = req.query;
  try {
    let orderBy = [['createdAt', 'ASC']];

    const userId = req.user.id;
    let query = {
      raw: true,
      where: {
        userId: {
          [Op.or]: [userId, null],
        },
      },
      order: orderBy,
      attributes: ['id', 'title'],
    };
    // fetch data from DB
    let result = await db.HarvestMethod.findAll(query);
    result = req.translateFunction(result, globalTranslationCache, {
      lvl1: true,
      lvl2: false,
      moduleName: 'harvesting/method',
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
