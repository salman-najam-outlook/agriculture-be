const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const db = require(rootPath + '/models');
const { serverError, successRespSync, errorRespSync } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { cropStorageMethodValidator } = require(rootPath +
  '/helpers/validators/cropStorage');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /crop/storage/methods:
 *   get:
 *     description: Returns all crop storage methods
 *     tags: [Crop Storage]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
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
 *                   data: {id: 2, name: Drying}
 *
 *
 */
router.get('/', auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    let cropStorageMethod = await db.CropStorageMethod.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'ASC']],
      where: {
        userId: {
          [Op.or]: [userId, null],
        },
      },
    });
    if (req.headers.lang && req.headers.lang != 'en') {
      cropStorageMethod = req.translateFunction(cropStorageMethod, globalTranslationCache, {
        lvl1: true,
        lvl2: false
      })
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: cropStorageMethod,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /crop/storage/methods:
 *   post:
 *     description: Add new crop storage method
 *     tags: [Crop Storage]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: Request body for creting new crop storage method
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *              required:
 *                - name
 *            example:
 *              name: My First Storage Method
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
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Crop storage method added successfully.
 *                   data: {"id": 12,"name": "My First Storage Method"}
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
 *                 example:
 *                   success: false
 *                   code: 409
 *                   message: Crop storage method already exist.
 *                   data: {"id": 12,"name": "Existing method name"}
 */
router.post(
  '/',
  auth,
  cropStorageMethodValidator(),
  validationErrorHandler,
  async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;
    try {
      const exists = await db.CropStorageMethod.findOne({
        where: {
          userId: {
            [Op.or]: [userId, null],
          },
          name,
        },
      });
      if (exists !== null) {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: error.CROP_STORAGE_METHOD_EXISTS,
            code: error.code.CONFLICT,
            data: { id: exists.id, name: exists.name },
          })
        );
      }
      const cropStorage = await db.CropStorageMethod.create({
        name,
        userId,
      });
      return res.json(
        successRespSync({
          msg: success.CROP_STORAGE_METHOD_CREATED,
          data: { id: cropStorage.id, name: cropStorage.name },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
