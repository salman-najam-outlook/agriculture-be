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
 * /livestocks/breeds:
 *   get:
 *     summary: Get Livestock breed of user
 *     description: Get Livestock breed of user
 *     tags: [Livestock-Breed]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 3, "name": "new breed", "livestock": 1, "userId": 171, "createdAt": "2022-01-04T02:13:50.000Z", "updatedAt": "2022-01-04T02:13:50.000Z" }, { "id": 4, "name": "new breed 2", "livestock": 1, "userId": 171, "createdAt": "2022-01-04T02:23:31.000Z", "updatedAt": "2022-01-04T02:23:31.000Z" } ] }
 */

router.get('/', auth, async (req, res) => {
  try {
    const result = await db.LiveStockBreed.findAll({
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
 * /livestocks/breeds:
 *   post:
 *     summary: Add Livestock breed of user
 *     description: Add Livestock breed of user
 *     tags: [Livestock-Breed]
 *     requestBody:
 *       description: Add Livestock breed of user
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *            example:
 *              {"name":"Test-Breed", "animalType":1}
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
 *                 example: { "success": true, "code": 200, "message": "Breed is added successfully.", "data": { "id": 37, "userId": 171, "name": "Test-Breed", "livestock": 1, "updatedAt": "2022-03-29T13:35:14.808Z", "createdAt": "2022-03-29T13:35:14.808Z" } }
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
      const breedExists = await db.LiveStockBreed.findOne({
        where: {
          userId,
          name,
          livestock: animalType,
        },
      });
      if (breedExists !== null) {
        return res.json(
          errorRespSync({
            code: error.code.CONFLICT,
            msg: error.LIVESTOCK_EXISTS,
          })
        );
      }
      const result = await db.LiveStockBreed.create({
        userId,
        name,
        livestock: animalType,
      });
      return res.json(
        successRespSync({
          msg: success.LIVESTOCK_BREED_ADDED,
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
