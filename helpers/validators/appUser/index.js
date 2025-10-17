const { check } = require('express-validator');
const db = require('../../../models');

exports.appUserValidation = () => {
  const status = ['0', '1'];
  return [
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),

    check('countryCode').notEmpty().withMessage('Country code is required'),
 
    check('country').notEmpty().withMessage('Country is required'),
    check('state').notEmpty().withMessage('State is required'),
    // check('village').notEmpty().withMessage('Village is required'),
    check('status').notEmpty().withMessage('Status is required').isIn(status),
    check('membershipTypeId')
      .notEmpty()
      .trim()
      .notEmpty()
      .withMessage('Membership type is required'),
    check('membershipExtendedDays')
      .if(check('membershipExtendedDays').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('Membership Extended Days are required'),
    check('membershipExtensionReason')
      .if(check('membershipExtensionReason').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('Membership Extended reason is required'),
  ];
};

exports.userListValidation = () => {
  return [
    check('membershipType')
      .if(check('membershipType').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('Membership Type is required'),
    check('membershipValidity')
      .if(check('membershipValidity').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('Membership validity is required')
      .isIn([
        'expired',
        'lessThen1Month',
        '1-8Months',
        '6-12Months',
        'moreThan1Year',
        'custom',
      ]),
    check('membershipRemainingDays')
      .if(check('membershipRemainingDays').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('Membership remaining days are required')
      .isInt(),
  ];
};

exports.preRegisterSetPassword = () => {
  return [
    check('password').trim().notEmpty().withMessage('password is required'),
    check('confirmPassword').trim().notEmpty().withMessage('Confirm password is required'),
  ]};

exports.preRegisterUserValidation = () => {
  return [
    check('firstName').trim().notEmpty().withMessage('First name is required'),
    check('lastName').trim().notEmpty().withMessage('Last name is required'),
    check('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .normalizeEmail()
      .isEmail()
      .bail()
      .custom(async (email) => {
        const user = await db.user.findOne({ where: { email } });
        if (user !== null && user?.preRegistrationStatus == 'inprogress')
          throw new Error('We have already received your request');
        if (
          user !== null ||
          (user !== null && user?.preRegistrationStatus == 'complete')
        )
          throw new Error('User already registered');
      }),
    check('countryId').trim().notEmpty().withMessage('Country id is required'),
    check('countryIsoCode').trim().notEmpty().withMessage('Country id is required'),
    check('countryCode')
      .optional({ checkFalsy: true })
      .notEmpty()
      .withMessage('Country code is required'),
    check('mobile')
      .optional({ checkFalsy: true })
      .notEmpty()
      .withMessage('Country id is required')
      .isMobilePhone()
      .bail()
      .custom(async (mobile) => {
        const user = await db.user.findOne({ where: { mobile } });
        if (user !== null && user?.preRegistrationStatus == 'inprogress')
          throw new Error('We have already received your request');
        if (
          user !== null ||
          (user !== null && user?.preRegistrationStatus == 'complete')
        )
          throw new Error('User already registered');
      }),
    check('permissionToContact')
      .optional({ checkFalsy: true })
      .notEmpty()
      .withMessage('Country id is required'),
  ];
};
