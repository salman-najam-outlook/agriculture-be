const { check, oneOf } = require('express-validator');
const dateFormat = 'MM/DD/YYYY';
exports.cropStorageMethodValidator = () => [
  check('name', 'Name is required').trim().notEmpty(),
];

exports.cropStorageTypeValidator = () => [
  check('name', 'Name is required').trim().notEmpty(),
];

exports.cropStorageDataValidator = () => [
  oneOf([check('farm').exists().isInt(), check('segment').exists().isInt()]),
  check('area', 'Area is required').trim().notEmpty().isNumeric(),
  check('didYieldStoredInBags')
    .if(check('didYieldStoredInBags').notEmpty())
    .trim()
    .notEmpty()
    .isIn(['1', '0']),
  check('yieldStoredInBags')
    .if(check('didYieldStoredInBags').equals('1'))
    .isArray({ min: 1 })
    .withMessage('yieldStoredInBags is required and can not be empty'),
  check('yieldStoredInBags.*.bagQty')
    .notEmpty()
    .withMessage('bagQty can not be empty')
    .isFloat(),
  check('yieldStoredInBags.*.bagCount')
    .notEmpty()
    .withMessage('bagCount can not be empty')
    .isInt(),
  // check('yieldStoredInBags.*.bagUom')
  //   .notEmpty()
  //   .withMessage('bagUom can not be empty')
  //   .isInt(),
  //check('cropId').optional().isInt(),
  //check('cropVariety').optional().isArray(),
  check('startDate', 'Start date is required')
    .trim()
    .notEmpty()
    .isDate({ format: dateFormat, strictMode: true })
    .withMessage('invalid start date format'),
  check('endDate', 'End date is required')
    .trim()
    .notEmpty()
    .isDate({ format: dateFormat, strictMode: true })
    .withMessage('invalid end date format'),
  check('durationOfStorage', 'Duration of storage is required')
    .trim()
    .notEmpty()
    .isNumeric(),
  check('yieldStored', 'Yield stored is required')
    .trim()
    .notEmpty()
    .isNumeric(),
];
