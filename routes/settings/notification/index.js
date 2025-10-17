const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validateSettings = require(rootPath + '/helpers/validators/settings');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /settings/notification:
 *   get:
 *     description: Fetch notification settings of the user
 *     tags: [Settings - Notification]
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "pushNotificationType": [ "system_updates", "report_updates" ], "emailNotificationType": [ "system_updates" ], "soundSetting": { "enabled": "customNotification", "allNotification": "sound", "customNotification": { "reminders": "sound", "report_updates": "sound", "system_updates": "sound", "important_messages_from_administrator": "sound" } } } }
 *
 */
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const settings = await getUsersNotificationSetting(userId);

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: settings,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /settings/notification:
 *   put:
 *     description: save notification settings of the user
 *     tags: [Settings - Notification]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *     requestBody:
 *         content:
 *             application/json:
 *                 example: { "pushNotificationType": [ "system_updates", "report_updates", "reminders" ], "emailNotificationType": [ "system_updates" ], "soundSetting": { "enabled": "customNotification", "allNotification": "sound", "customNotification": { "system_updates": "sound", "reminders": "sound", "report_updates": "sound", "important_messages_from_administrator": "sound" } } }
 *                 schema:
 *                     type: object
 *                     properties:
 *                         pushNotificationType:
 *                             type: array
 *                             items:
 *                                 type: string
 *                                 enum: [system_updates,reminders,report_updates,important_messages_from_administrator]
 *                         emailNotificationType:
 *                             type: array
 *                             items:
 *                                 type: string
 *                                 enum: [system_updates,reminders,report_updates,important_messages_from_administrator]
 *                         soundSetting:
 *                             type: object
 *                             properties:
 *                               enabled:
 *                                 type: string
 *                                 enum: [allNotification, customNotification]
 *                               allNotification:
 *                                 type: string
 *                                 enum: [sound, vibrate, mute]
 *                               customNotification:
 *                                 type: object
 *                                 properties:
 *                                   system_updates:
 *                                     type: string
 *                                     enum: [sound, vibrate, mute]
 *                                   reminders:
 *                                     type: string
 *                                     enum: [sound, vibrate, mute]
 *                                   report_updates:
 *                                     type: string
 *                                     enum: [sound, vibrate, mute]
 *                                   important_messages_from_administrator:
 *                                     type: string
 *                                     enum: [sound, vibrate, mute]
 *     responses:
 *       200:
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
 *               example: { "success": true, "code": 200, "message": "saved successfully.", "data": { "pushNotificationType": [ "system_updates", "report_updates", "reminders" ], "emailNotificationType": [ "system_updates" ], "soundSetting": { "enabled": "customNotification", "allNotification": "sound", "customNotification": { "reminders": "sound", "report_updates": "sound", "system_updates": "sound", "important_messages_from_administrator": "sound" } } } }
 *
 */
router.put(
  '/',
  auth,
  validateSettings.notificationSettingCreate(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { pushNotificationType, emailNotificationType, soundSetting } =
        req.body;

      const setNotification = {
        userId,
        pushNotificationType,
        emailNotificationType,
        soundSetting,
      };

      await db.UserAppNotificationSetting.upsert(setNotification);
      const settings = await getUsersNotificationSetting(userId);

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: settings,
        })
      );
    } catch (err) {
      await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @description get user notification settings
 * @param {*} userId
 * @returns object
 */
async function getUsersNotificationSetting(userId) {
  const notificationSettings = await db.UserAppNotificationSetting.findOne({
    raw: true,
    where: { userId },
    attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] },
  });

  return notificationSettings;
}

module.exports = router;
