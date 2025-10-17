const express = require('express');
const router = express.Router();
var Sequelize = require('sequelize');
const { weatherSettingCreate } = require('../../../helpers/validators/settings');

// loading models
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const {
  errorResp,
  successRespSync,
  successResp,
  errorRespSync,
  serverError,
} = require(rootPath + '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language'); // constant messages
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general'); // constant messages
// validation modules
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /settings/weather:
 *   get:
 *     description: Fetch weather settings of the user
 *     tags: [Settings - Weather]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                    success: true
 *                    code: 200
 *                    message: Weather Setting fetched successfully.
 *                    data:
 *                      countryId: null
 *                      stateId: null
 *                      showOnDashboard: false
 *                      displayBy: hourly
 *                      updateFrequency: hourly
 *
 */
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const weatherSettings = await db.UserWeatherSettings.findOne({
      where: { userId: userId },
    })

    const users = !weatherSettings && await db.user.findOne({
      where: { id: userId }, attributes: ['countryId', 'stateId']
    });

    return res.json(
      successRespSync({
        msg: success.WEATHER_SETTING_FETCHED,
        data: {
          countryId: weatherSettings?.countryId || users?.countryId,
          stateId: weatherSettings?.stateId || users?.stateId,
          showOnDashboard: weatherSettings?.showOnDashboard || false,
          displayBy: weatherSettings?.displayBy || 'hourly',
          updateFrequency: weatherSettings?.updateFrequency || 'hourly'
        }
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});



const updateExistingSetting = async (req, res, transaction) => {
  try {
    const userId = req.user.id;

    let updateSet = {
      countryId: req.body.countryId,
      stateId: req.body.stateId,
      showOnDashboard: req.body.showOnDashboard,
      displayBy: req.body.displayBy,
      updateFrequency: req.body.updateFrequency
    }
    const updatedData = await db.UserWeatherSettings.update(updateSet, { where: { userId: userId } });


    return res.json(
      successRespSync({
        msg: success.WEATHER_SETTING_UPDATED,
        data: updateSet
      })
    );

  } catch (err) {
    await transaction?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
}


/**
 * @swagger
 * /settings/weather:
 *   post:
 *     description: Save weather Setting of user. If setting of user aleady exists, it updates
 *     tags: [Settings - Weather]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     requestBody:
 *       description: saves weather setting of user
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                countryId:
 *                  type: integer
 *                  required: true 
 *                  description: Country Id of the User
 *                stateId:
 *                  type: integer
 *                  required: true
 *                  description: State Id of the User
 *                showOnDashboard:
 *                  type: boolean 
 *                  required: true
 *                displayBy:
 *                  type: string 
 *                  enum: ["log-in", "hourly", "daily", "weekly"]
 *                  required: true
 *                updateFrequency:
 *                  type: string 
 *                  enum: ["hourly", "daily", "weekly"]
 *                  required: true
 *     responses:
 *       200:
 *         description: Successfully return the response if save is successfull
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Storage Setting saved successfully.
 *                  data:
 *                    id: 2
 *                    userId: 246
 *                    countryId: 1
 *                    stateId: 2
 *                    showOnDashboard: true
 *                    displayBy: hourly
 *                    updateFrequency: hourly
 *                    updatedAt: 2022-07-26T15:46:06.221Z
 *                    createdAt: 2022-07-26T15:46:06.221Z
 *                  
 *
 */
router.post('/', auth, weatherSettingCreate(), validationErrorHandler, async (req, res) => {
  const userId = req.user.id;

  const transaction = await db.sequelize.transaction();
  try {

    const existingSetting = await db.UserWeatherSettings.findOne({
      where:{
        userId
      }
    });
    
    if (existingSetting) await updateExistingSetting(req, res, transaction);
    else {
      const weatherSetting = await db.UserWeatherSettings.create({
        userId,
        countryId: req.body.countryId,
        stateId: req.body.stateId,
        showOnDashboard: req.body.showOnDashboard,
        displayBy: req.body.displayBy,
        updateFrequency: req.body.updateFrequency
      }, {
        transaction,
      });

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.WEATHER_SETTING_ADDED,
          data: existingSetting || weatherSetting
        })
      );
    }
  } catch (err) {
    await transaction?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


/**
 * @swagger
 * /settings/weather:
 *   delete:
 *     description: Delete weather setting of user
 *     tags: [Settings - Weather]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     responses:
 *       200:
 *         description: On success response if data is present related to the id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example:
 *                 success: true
 *                 code: 200
 *                 message: Weather Setting deleted successfully.
 *                 data:
 */
router.delete('/', auth, async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const userId = req.user.id;
    const weatherSetting = await db.UserWeatherSettings.findOne({
      where: {
        userId: userId
      },
    });
    if (weatherSetting === null) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.TARGET_NOT_FOUND,
        })
      );
    }

    await db.UserWeatherSettings.destroy(
      {
        where: {
          id: weatherSetting.id
        },
      },
      { transaction: t }
    );

    await t.commit();
    return res.json(
      successRespSync({
        msg: success.WEATHER_SETTING_DELETED,
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
