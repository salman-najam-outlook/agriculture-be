const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const db = require(rootPath + '/models');
const { successRespSync, errorRespSync, serverError } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { irrigationStageValidator } = require(rootPath +
  '/helpers/validators/irrigation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /irrigation/schedules:
 *   get:
 *     description: Returns all schedules for irrigation
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
 *                   data: {id: 2, name: Daily}
 *
 *
 */
router.get('/', auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    let schedule = await db.IrrigationSchedule.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'ASC']],
      where: {
        userId: {
          [Op.or]: [userId, null],
        },
      },
    });
    schedule = req.translateFunction(schedule,  globalTranslationCache, {
      lvl1: true,
      lvl2: false
    })
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: schedule,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /irrigation/schedules:
 *   post:
 *     description: Add new schedules of irrigation
 *     tags: [Irrigation]
 *     requestBody:
 *       description: Request body for creting new schedules
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
 *              name: My First Schedules
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
 *                   message: Irrigation schedules added successfully.
 *                   data: {"id": 12,"name": "My new schedules"}
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
      const schedule = await db.IrrigationSchedule.findOne({
        where: {
          userId: {
            [Op.or]: [userId, null],
          },
          name,
        },
      });
      if (schedule !== null) {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: error.IRRIGATION_SCHEDULE_EXISTS,
            code: error.code.CONFLICT,
            data: { id: schedule.id, name: schedule.name },
          })
        );
      }
      const irrigationSchedule = await db.IrrigationSchedule.create({
        name,
        userId,
      });
      return res.json(
        successRespSync({
          msg: success.IRRIGATION_SCHEDULE_CREATED,
          data: { id: irrigationSchedule.id, name: irrigationSchedule.name },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
