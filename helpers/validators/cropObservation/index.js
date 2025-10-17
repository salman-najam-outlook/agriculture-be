const { check, oneOf } = require('express-validator');

exports.cropObservationValidator = () => [
  check('areaPlanted', 'Area planted is required').trim().notEmpty(),
  oneOf([check('farm').exists().isInt(), check('segment').exists().isInt()]),
  check('cropSeason', 'Crop season is required').notEmpty().isInt(),
  check('dateOfObservation', 'Date of observation is required')
    .notEmpty()
    .isDate(),
];
