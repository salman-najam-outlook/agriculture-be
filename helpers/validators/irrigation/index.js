const { check, oneOf } = require('express-validator');

exports.irrigationWaterSourceValidator = () => [
  check('name', 'Name is required').trim().notEmpty(),
];

exports.irrigationWaterOriginValidator = () => [
  check('name', 'Name is required').trim().notEmpty(),
  check('source', 'Water Source is required').trim().notEmpty(),
];

exports.irrigationTypeValidator = () => [
  check('name', 'Name is required').trim().notEmpty(),
];

exports.irrigationTypeUpdatedValidator = () => [
  check('name', 'Name is required').trim().notEmpty(),
  check('category', 'Category is required').trim().notEmpty(),
  check('parentId', 'Parent ID is required').isInt().withMessage('Parent ID must be a valid integer'),
];

exports.irrigationStageValidator = () => [
  check('name', 'Name is required').trim().notEmpty(),
];

exports.irrigationDataValidator = () => [
  oneOf([check('farm').exists().isInt(), check('segment').exists().isInt()]),
  check('area', 'Area is required').trim().notEmpty().isNumeric(),
  check('waterSource', 'Water source is required')
    .trim()
    .notEmpty(),
    // .isIn(['Rainfed', 'Irrigation'])
    // .withMessage('Water source must be either Rainfed or Irrigation'),
  check('irrigationWaterSource', 'Irrigation water source is required')
    .trim()
    .notEmpty()
    .isInt(),
  check('cropVariety').optional().isArray(),
  check('cropId').optional().isInt(),
  check('irrigationWaterSourceOrigin').optional(),
  check('waterVolumeUsed').optional(),
  check('irrigatedArea').optional(),
  check('irrigationDate', 'Irrigations Dates are required')
    .isArray()
    .notEmpty(),
  check('irrigationStage', 'Irrigation stage is required')
    .trim()
    .notEmpty()
    .isInt(),
  check('irrigationSchedule', 'Irrigation schedule is required')
    .trim()
    .notEmpty()
    .isInt()
    .withMessage('Please select valid irrigation schedule'),
  check('totalDays', 'Total number of days is required')
    .trim()
    .notEmpty()
    .isNumeric(),
  check('irrigationType', 'Irrigation type is required')
    .trim()
    .notEmpty()
    .isInt(),
];
