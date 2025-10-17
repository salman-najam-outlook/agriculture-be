const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const db = require(rootPath + '/models');
const { successRespSync, errorRespSync, serverError } = require(rootPath +
  '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { irrigationStageValidator } = require(rootPath +
  '/helpers/validators/irrigation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /irrigation/stages:
 *   get:
 *     description: Returns all stages of irrigation
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
 *                   data: {id: 2, name: Sowing}
 *
 *
 */
router.get('/', auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    let stages = await db.IrrigationStage.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'ASC']],
      where: {
        userId: {
          [Op.or]: [userId, null],
        },
      },
    });
    stages = req.translateFunction(stages, globalTranslationCache, {
      lvl1: true,
      lvl2: false,
    });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: stages,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /irrigation/stages:
 *   post:
 *     description: Add new stages of irrigation
 *     tags: [Irrigation]
 *     requestBody:
 *       description: Request body for creting new stage
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
 *              name: My First Stage
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
 *                   message: Irrigation stage added successfully.
 *                   data: {"id": 12,"name": "My new irrigation stage 44"}
 */
router.post(
  '/',
  auth,
  irrigationStageValidator(),
  validationErrorHandler,
  async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;
    try {
      const stage = await db.IrrigationStage.findOne({
        where: {
          userId: {
            [Op.or]: [userId, null],
          },
          name,
        },
      });
      if (stage !== null) {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: error.IRRIGATION_STAGE_EXISTS,
            code: error.code.CONFLICT,
            data: { id: stage.id, name: stage.name },
          })
        );
      }
      const irrigationStage = await db.IrrigationStage.create({
        name,
        userId,
      });
      return res.json(
        successRespSync({
          msg: success.IRRIGATION_STAGE_CREATED,
          data: { id: irrigationStage.id, name: irrigationStage.name },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
