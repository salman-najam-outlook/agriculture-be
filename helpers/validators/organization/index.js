const { check } = require('express-validator');

exports.logoUpdate = () => {
  return [
    check('base64Logo')
      .trim()
      .notEmpty()
      .withMessage('logo in base64 string is required')
      .bail()
      .isString(),
    check('recordId')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('recordId is required')
      .bail()
      .isString(),
  ];
};

exports.splashUpdate = () => {
  return [
    check('base64Splash')
      .trim()
      .notEmpty()
      .withMessage('Splash in base64 string is required')
      .bail()
      .isString(),
  ];
};
