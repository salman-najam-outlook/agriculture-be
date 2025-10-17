const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { error, success } = require(rootPath + '/helpers/language');
const { successRespSync, errorRespSync, serverError } = require(rootPath +
  '/helpers/api');
const { liveStockGroupValidator } = require(rootPath +
  '/helpers/validators/livestock');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /livestocks/groups:
 *   get:
 *     summary: Get Livestock group of user
 *     description: Get Livestock group of user
 *     tags: [Livestock-Groups]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 2, "name": "Group 1", "userId": 171, "createdAt": "2021-12-27T04:53:03.000Z", "updatedAt": "2021-12-27T04:53:03.000Z" }, { "id": 10, "name": "Cows herd", "userId": 171, "createdAt": "2022-01-04T04:26:13.000Z", "updatedAt": "2022-01-04T04:26:13.000Z" } ] }
 */

router.get('/', auth, async (req, res) => {
  try {
    const result = await db.LiveStockGroup.findAll({
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
 * /livestocks/groups:
 *   post:
 *     summary: Add Livestock group of user
 *     description: Add Livestock group of user
 *     tags: [Livestock-Groups]
 *     requestBody:
 *       description: Add Livestock group of user
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *            example:
 *              {"name":"Fish-Group"}
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
 *                 example: { "success": true, "code": 200, "message": "Animal group is added successfully.", "data": { "id": 19, "userId": 171, "name": "Fish-Group", "updatedAt": "2022-03-29T13:20:16.830Z", "createdAt": "2022-03-29T13:20:16.830Z" } }
 */

router.post(
  '/',
  auth,
  liveStockGroupValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.user.id;
      const groupExists = await db.LiveStockGroup.findOne({
        where: {
          userId,
          name,
        },
      });
      if (groupExists !== null) {
        return res.json(
          errorRespSync({
            code: error.code.CONFLICT,
            msg: error.ANIMAL_GROUP_EXISTS,
          })
        );
      }
      const result = await db.LiveStockGroup.create({
        userId,
        name,
      });
      return res.json(
        successRespSync({
          msg: success.ANIMAL_GROUP_ADDED,
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
