const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const db = require(rootPath + '/models');
const { Op } = require('sequelize');
const { successRespSync, errorRespSync, serverError } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { irrigationTypeValidator } = require(rootPath +
  '/helpers/validators/irrigation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
  const duplicateRecordId = require(rootPath + '/middleware/duplicateRecordId')

/**
 * @swagger
 * /irrigation/types:
 *   get:
 *     description: Returns all irrigation types (admin added and user specific)
 *     tags: [Irrigation]
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
 *                   data: [{id: 2, name: Surface irrigations}]
 *
 *
 */
router.get('/', auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    let irrigationTypes = await db.IrrigationType.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'ASC']],
      where: {
        userId: {
          [Op.or]: [userId, null],
        },
      },
    });

    irrigationTypes = req.translateFunction(irrigationTypes,  globalTranslationCache, {
      lvl1: true,
      lvl2: false
    })
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: irrigationTypes,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /irrigation/types:
 *   post:
 *     description: Add new irrigation type for user
 *     tags: [Irrigation]
 *     requestBody:
 *       description: Request body for creting new irrigation type
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
 *              name: My First Type
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
 *                   message: Irrigation type added successfully.
 *                   data: {"id": 3,"name": "My Custom irrigation type"}
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
 *                       name:
 *                        type: string
 *                 example:
 *                   success: false
 *                   code: 409
 *                   message: Irrigation type already exist.
 *                   data: {"id": 3,"name": "My Custom irrigation type"}
 *
 */
router.post(
  '/',
  auth,
  duplicateRecordId.handleDuplicateRecordId('IrrigationType'),
  irrigationTypeValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { name } = req.body;
      const exists = await db.IrrigationType.findOne({
        where: {
          name,
          userId: {
            [Op.or]: [userId, null],
          },
        },
      });
      if (exists !== null) {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: error.IRRIGATION_TYPE_EXISTS,
            code: error.code.CONFLICT,
            data: { id: exists.id, name: exists.name },
          })
        );
      }
      const irrigationType = await db.IrrigationType.create({
        name,
        userId,
      });
      return res.json(
        successRespSync({
          msg: success.IRRIGATION_TYPE_CREATED,
          data: {
            id: irrigationType.id,
            name: irrigationType.name,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);
module.exports = router;
