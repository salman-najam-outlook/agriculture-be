const db = require(rootPath + '/models');
const { check } = require('express-validator');

exports.storageSettingCreate = () => {
  return [
    check('useDefaultStorage')
      .notEmpty()
      .withMessage('useDefaultStorage is required')
      .isBoolean()
      .withMessage("useDefaultStorage must be a boolean"),
    check('saveCropReport')
      .notEmpty()
      .withMessage('saveCropReport is required')
      .isBoolean()
      .withMessage("saveCropReport must be a boolean"),
    check('saveSateliteReport')
      .notEmpty()
      .withMessage('saveSateliteReport is required')
      .isBoolean()
      .withMessage("saveSateliteReport must be a boolean"),
    check('saveWeatherReport')
      .notEmpty()
      .withMessage('saveWeatherReport is required')
      .isBoolean()
      .withMessage("saveWeatherReport must be a boolean"),
  ];
};

exports.currencySettingCreate = () => {
  return [
    check('currencyId')
      .trim()
      .notEmpty()
      .withMessage('currencyId is required')
      .isInt({ min: 1 })
      .custom(async (currencyId) => {
        const status = await db.Currency.findOne({
          where: { id: currencyId },
        });
        if (status === null) throw new Error(`currencyId doesn't exist`);
      }),
  ];
};

exports.weatherSettingCreate = () => {
  const displayBy = ["log-in", "hourly", "daily", "weekly"];
  const updateFrequency = ["hourly", "daily", "weekly"];
  return [
    check('countryId')
      .trim()
      .notEmpty()
      .withMessage('countryId is required')
     ,
    check('stateId')
      .trim()
      .notEmpty()
      .withMessage('stateId is required')
     ,
    check('showOnDashboard')
      .notEmpty()
      .withMessage('showOnDashboard is required')
      .isBoolean()
      .withMessage("showOnDashboard must be a boolean"),
    // check('displayBy')
    //   .trim()
    //   .notEmpty()
    //   .withMessage('displayBy is required')
    //   .isIn(displayBy),
    check('updateFrequency')
      .trim()
      .notEmpty()
      .withMessage('updateFrequency is required')
      .isIn(updateFrequency),
  ];
};

exports.generalSettingCreate = () => {
  const preferredMapView = ['Default', 'Satellite', 'Terrain'];
  return [
    check('units').if(check('units').notEmpty()).isArray({ min: 1 }),
    check('units.*.unitTypeId').trim().isInt(),
    check('units.*.unitId').trim().isInt(),
    check('preferredMapView')
      .optional({ checkFalsy: true })
      .trim()
      .notEmpty()
      .withMessage('preferredMapView is required')
      .bail()
      .isIn(preferredMapView),
    check('preferredCountry')
      .trim()
      .notEmpty()
      .withMessage('preferredCountry is required')
      .bail()
      .isString(),
    check('preferredState')
      .trim()
      .notEmpty()
      .withMessage('preferredState is required')
      .bail()
      .isString(),
    check('preferredDistrict')
      .optional({ checkFalsy: true })
      .trim()
      .notEmpty()
      .withMessage('preferredDistrict is required')
      .bail()
      .isString(),
    check('preferredCity')
      .trim()
      .notEmpty()
      .withMessage('preferredCity is required')
      .bail()
      .isString(),
  ];
};
exports.notificationSettingCreate = () => {
  const notificationTypes = [
    'email_updates',
    'system_updates',
    'reminders',
    'report_updates',
    'important_messages_from_administrator',
  ];
  const soundEnabled = ['allNotification', 'customNotification'];
  const notification = ['sound', 'vibrate', 'mute'];
  return [
    check('pushNotificationType')
      .if(check('pushNotificationType').notEmpty())
      .isArray({ min: 1 }),
    check('pushNotificationType.*').isIn(notificationTypes),
    check('emailNotificationType')
      .if(check('emailNotificationType').notEmpty())
      .isArray({ min: 1 }),
    check('emailNotificationType.*').isIn(notificationTypes),
    check('soundSetting.enabled').isIn(soundEnabled),
    check('soundSetting.allNotification')
      .if(async (val, { req }) => {
        const { enabled } = req.body?.soundSetting;
        if (enabled != 'allNotification') throw new Error('false');
      })
      .isIn(notification),
    check('soundSetting.customNotification.system_updates')
      .if(async (val, { req }) => {
        const { enabled } = req.body?.soundSetting;
        if (enabled != 'customNotification') throw new Error('false');
      })
      .isIn(notification),
    check('soundSetting.customNotification.reminders')
      .if(async (val, { req }) => {
        const { enabled } = req.body?.soundSetting;
        if (enabled != 'customNotification') throw new Error('false');
      })
      .isIn(notification),
    check('soundSetting.customNotification.report_updates')
      .if(async (val, { req }) => {
        const { enabled } = req.body?.soundSetting;
        if (enabled != 'customNotification') throw new Error('false');
      })
      .isIn(notification),
    check(
      'soundSetting.customNotification.important_messages_from_administrator'
    )
      .if(async (val, { req }) => {
        const { enabled } = req.body?.soundSetting;
        if (enabled != 'customNotification') throw new Error('false');
      })
      .isIn(notification),
  ];
};
