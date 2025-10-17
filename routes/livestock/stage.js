const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { error, success } = require(rootPath + '/helpers/language');
const { successRespSync, errorRespSync, serverError } = require(rootPath +
  '/helpers/api');
const { liveStockAnimalTypeValidator } = require(rootPath +
  '/helpers/validators/livestock');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /livestocks/stages:
 *   get:
 *     summary: Get the Livestock of user
 *     description: Get the Livestock of user
 *     tags: [Livestock-Stage]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 10, "name": "calf", "livestock": 5, "userId": 171, "createdAt": "2022-01-06T05:41:45.000Z", "updatedAt": "2022-01-06T05:41:45.000Z" }, { "id": 13, "name": "Goat", "livestock": 6, "userId": 171, "createdAt": "2022-01-07T03:07:42.000Z", "updatedAt": "2022-01-07T03:07:42.000Z" } ] }
 */

router.get('/', auth, async (req, res) => {
  try {
    const result = await db.LiveStockStage.findAll({
      where: {
        userId: req.user.id,
      },
    });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: result,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /livestocks/stages:
 *   post:
 *     summary: Add the Livestock of user
 *     description: Add the Livestock of user
 *     tags: [Livestock-Stage]
 *     requestBody:
 *       description: Add the Livestock of user
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example: { "name":"Goat", "animalType":6  }
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
 *                 example: { "success": true, "code": 200, "message": "Stage is added successfully.", "data": { "id": 21, "userId": 171, "name": "Fish", "livestock": 6, "updatedAt": "2022-03-28T15:10:37.571Z", "createdAt": "2022-03-28T15:10:37.571Z" } }
 */

router.post(
  '/',
  auth,
  liveStockAnimalTypeValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { name, animalType } = req.body;
      const userId = req.user.id;
      const stageExists = await db.LiveStockStage.findOne({
        where: {
          userId,
          name,
          livestock: animalType,
        },
      });
      if (stageExists !== null) {
        return res.json(
          errorRespSync({
            code: error.code.CONFLICT,
            msg: error.LIVESTOCK_STAGE_EXISTS,
          })
        );
      }
      const result = await db.LiveStockStage.create({
        userId,
        name,
        livestock: animalType,
      });
      return res.json(
        successRespSync({
          msg: success.LIVESTOCK_STAGE_ADDED,
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
