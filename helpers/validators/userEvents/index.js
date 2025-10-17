const { check } = require('express-validator');
const db = require(rootPath + '/models');

exports.getEvent = () => {
  return [
    check('sDate')
      .trim()
      .notEmpty()
      .withMessage('start date is required')
      .bail()
      .isString(),
    check('eDate')
      .trim()
      .notEmpty()
      .withMessage('end date is required')
      .bail()
      .isString(),
    check('search')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('keyword is required')
      .isString(),
  ];
};

exports.saveEvent = () => {
  const repeat = [
    'no_repeat',
    'every_day',
    'every_week',
    'every_month',
    'every_year',
  ];
  const reminderPeriod = ['days', 'months'];

  return [
    check('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('title is required')
      .bail(),
    check('moduleId')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('moduleId is required')
      .bail(),
    check('subModuleId')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('subModuleId is required')
      .bail(),
    // check('cropTypeId')
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage('cropTypeId is required')
    //   .bail(),
    check('description')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('description is required')
      .bail(),
    check('colorPreference')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('colorPreference is required')
      .bail(),
    check('addToGCal')
      .trim()
      .notEmpty()
      .withMessage('addToGCal is required')
      .bail(),
    check('repeat')
      .trim()
      .notEmpty()
      .withMessage('repeat is required')
      .isIn(repeat),
    check('startDateTime')
      .trim()
      .notEmpty()
      .withMessage('startDateTime is required')
      .isString(),
    check('endDateTime')
      .trim()
      .notEmpty()
      .withMessage('endDateTime is required')
      .isString(),
    check('allDay')
      .trim()
      .notEmpty()
      .withMessage('allDay is required')
      .isBoolean(),
    check('cropVarieties')
      .isArray()
      .withMessage('cropVarieties must be an array'),
    check('reminders')
      .optional(),
    check('reminders.*.num').optional().isInt().withMessage('must be a number'),
    check('reminders.*.period')
      .optional()
      .isIn(reminderPeriod)
      .withMessage('period is required'),
  ];
};

exports.getReminder = () => {
  return [
    check('next')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('number of days is required')
      .bail()
      .isString(),
  ];
};

exports.updateReminder = () => {
  return [
    check('eventCalId')
      .trim()
      .notEmpty()
      .withMessage('eventCalId is required')
      .isInt(),
    check('reminderId')
      .trim()
      .notEmpty()
      .withMessage('reminderId is required')
      .isString(),
    check('remindOn')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('new reminder date is required'),
  ];
};
