const { check, body } = require('express-validator');
const moment = require('moment');

exports.validateCropGeneralInformation = () => [
  check('cropTypeId').notEmpty().isInt(),
  check('cropVarietyId').notEmpty().isInt(),
];

exports.validateCropReportId = () => [check('id').notEmpty().isInt()];

exports.requestCropHealthReportValidation = [
  body('dateOfInterest')
    .notEmpty()
    .custom((value) => {
      const isValidDate = moment(value).isValid();
      if (!isValidDate) throw new Error('Date of interest is invalid');
      const isFutureDate = moment(value).isAfter();
      if (isFutureDate) throw new Error('Date of interest must be from past');

      return true;
    }),
  body('farmId').notEmpty(),
  body('geofenceIds').optional({ nullable: true }).isArray(),
  body('geofenceIds.*').notEmpty(),
  body('maxCloudCoverage').optional({ nullable: true }).isInt(),
];
