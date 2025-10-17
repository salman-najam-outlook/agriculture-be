const express = require('express');
const router = express.Router();
var Sequelize = require('sequelize');
const { storageSettingCreate } = require('../../../helpers/validators/settings');


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
 * /settings/storage:
 *   get:
 *     description: Fetch storage settings of the user
 *     tags: [Settings - Storage]
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
 *                    message: Storage Setting fetched successfully.
 *                    data:
 *                      useDefaultStorage: false
 *                      saveCropReport: false
 *                      saveSateliteReport: false
 *                      saveWeatherReport: false
 *
 */
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const storage = await db.UserStorageSettings.findOne({ userId: userId })

    const pdfReports = storage && await db.PdfReports.findOne({ userId: userId, settingsId: storage.id })
    return res.json(
      successRespSync({
        msg: success.STORAGE_SETTING_FETCHED,
        data: {
          useDefaultStorage: storage?.useDefaultStorage || false,
          saveCropReport: pdfReports?.saveCropReport || false,
          saveSateliteReport: pdfReports?.saveSateliteReport || false,
          saveWeatherReport: pdfReports?.saveWeatherReport || false
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

    await db.UserStorageSettings.update({
      useDefaultStorage: req.body.useDefaultStorage
    }, { where: { userId: userId } });

    const pdfSettings = {
      saveCropReport: req.body.saveCropReport,
      saveSateliteReport: req.body.saveSateliteReport,
      saveWeatherReport: req.body.saveWeatherReport,
    }
    await db.PdfReports.update({ ...pdfSettings }, { where: { userId: userId } },)
    return res.json(
      successRespSync({
        msg: success.STORAGE_SETTING_UPDATED,
        data: { ...req.body }
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
 * /settings/storage:
 *   post:
 *     description: Save Storage Setting of user. If setting of user aleady exists, it updates
 *     tags: [Settings - Storage]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     requestBody:
 *       description: saves storage setting of user
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                useDefaultStorage:
 *                  type: boolean 
 *                saveCropReport:
 *                  type: boolean 
 *                saveSateliteReport:
 *                  type: boolean 
 *                saveWeatherReport:
 *                  type: boolean 
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
 *                    useDefaultStorage: true
 *                    saveCropReport: true
 *                    saveSateliteReport: false
 *                    saveWeatherReport: false
 *
 */
router.post('/', auth, storageSettingCreate(), validationErrorHandler, async (req, res) => {
  const userId = req.user.id;

  const transaction = await db.sequelize.transaction();
  try {
    const storageSettings = {
      userId,
      useDefaultStorage: req.body.useDefaultStorage
    }
    const existingStorage = await db.UserStorageSettings.findOne({ userId: userId });
    if (existingStorage) await updateExistingSetting(req, res, transaction);
    else {

      const storage = await db.UserStorageSettings.create(storageSettings, {
        transaction,
      });

      const pdfSettings = {
        userId,
        storageId: storage.id,
        saveCropReport: req.body.saveCropReport,
        saveSateliteReport: req.body.saveSateliteReport,
        saveWeatherReport: req.body.saveWeatherReport,
      }

      await db.PdfReports.create(pdfSettings, { transaction })

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: success.STORAGE_SETTING_ADDED,
          data: { ...req.body }
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
 * /settings/storage:
 *   delete:
 *     description: Delete storge setting of user
 *     tags: [Settings - Storage]
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
 *                 message: Storage Setting deleted successfully.
 *                 data:
 */
router.delete('/', auth, async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const userId = req.user.id;
    const storageSettings = await db.UserStorageSettings.findOne({
      where: {
        userId: userId
      },
    });
    if (storageSettings === null) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.TARGET_NOT_FOUND,
        })
      );
    }
    await db.PdfReports.destroy(
      {
        where: {
          storageId: storageSettings.id
        },
      },
      { transaction: t }
    );

    await db.UserStorageSettings.destroy(
      {
        where: {
          id: storageSettings.id
        },
      },
      { transaction: t }
    );

    await t.commit();
    return res.json(
      successRespSync({
        msg: success.STORAGE_SETTING_DELETED,
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
