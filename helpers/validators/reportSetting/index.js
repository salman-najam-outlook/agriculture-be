const { check } = require('express-validator');
const db = require(rootPath + '/models');

const downloadingPreference = ['cellular data', 'wifi data', 'both'];

const customIsIn = (value) => {
    if (!downloadingPreference.includes(value.toLowerCase())) {
      throw new Error(`${value} is not a valid option`);
    }
    return true;
};

exports.save = () => {
  const enableOfflineReport = ['1', '0'];
  const downloadingPreference = ['cellular data', 'with data', 'both'];
  const scheduleType = [
    'when automatically connected',
    'daily',
    'weekly',
    'bi-weekly',
    'monthly',
    'custom',
  ];
  const custom = [
    'specific days in a week',
    'after a specific number of days',
    'after a specific number of weeks',
    'after a specific number of months',
  ];
  const customInterval = [
    'weekly',
    'once every 2 weeks',
    'once every 3 weeks',
    'once every 1 month',
    'once every 2 months',
    'once every 3 months',
    'once every 6 months',
  ];
  const customPeriodUom = ['days', 'weeks', 'months'];
  const customWeeks = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  return [
    check('customPeriodQty')
      .optional({ checkFalsy: true })
      .trim()
      .notEmpty()
      .withMessage('customPeriodQty is required'),
    check('customStartDate')
      .optional({ checkFalsy: true })
      .trim()
      .notEmpty()
      .withMessage('customStartDate is required'),
    check('cropReports')
      .isArray()
      .withMessage('cropReport must be an array'),
    check('cropReports.*')
      .trim()
      .notEmpty()
      .withMessage('cropReports id is required')
      .isInt(),
    check('enableOfflineReport')
      .trim()
      .notEmpty()
      .withMessage('enableOfflineReport is required')
      .isIn(enableOfflineReport),
    check('downloadingPreference')
      .trim()
      .notEmpty()
      .withMessage('downloadingPreference is required')
      .custom(customIsIn),
    check('scheduleType')
      .trim()
      .notEmpty()
      .withMessage('scheduleType is required')
      .isIn(scheduleType),
    check('custom')
      .optional({ checkFalsy: true })
      .trim()
      .notEmpty()
      .withMessage('custom is required')
      .isIn(custom),
    check('customInterval')
      .optional({ checkFalsy: true })
      .trim()
      .notEmpty()
      .withMessage('customInterval is required')
      .isIn(customInterval),
    check('customPeriodUom')
      .optional({ checkFalsy: true })
      .trim()
      .notEmpty()
      .withMessage('customPeriodUom is required')
      .isIn(customPeriodUom),
    check('customWeeks')
      .if(check('customWeeks').notEmpty())
      // .optional({ checkFalsy: true })
      .isArray({ min: 1 })
      .withMessage('customWeeks must be an array'),
    check('customWeeks.*')
      .trim()
      .notEmpty()
      .withMessage('customWeeks is required')
      .isIn(customWeeks),
  ];
};
