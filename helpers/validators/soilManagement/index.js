const { check, oneOf } = require('express-validator');
const db = require(rootPath + '/models');

// custom rules
// check valid soil mgmt id
const validSoilMgmtId = async (id, { req }) => {
  const { id: userId } = req.user;
  const status = await db.SoilManagement.findOne({
    attributes: ['id'],
    where: { id, userId },
  });
  if (status === null) {
    throw new Error('Invalid soil mgmt id');
  }
};

exports.general = () => {
  return [
    oneOf(
      [
        check('farmIds').isArray({ min: 1 }).withMessage('must be an array'),
        check('segmentIds').isArray({ min: 1 }).withMessage('must be an array'),
      ],
      'farmId or segmentId is required'
    ),
    check('soilType').isArray({ min: 1 }).withMessage('must be an array'),
    check('area')
      .trim()
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isFloat()
      .withMessage('Invalid area field'),
    check('cropType')
      .optional({ checkFalsy: true })
      .isInt()
      .withMessage('Invalid cropType field'),
    check('cropVariety')
      .optional({ checkFalsy: true })
      .isArray()
      .withMessage('cropVariety must be an array'),
    check('bulkDensity')
      .optional({ checkFalsy: true })
      .isFloat()
      .withMessage('Invalid bulkDensity field'),
    check('inputType')
      .optional({ checkFalsy: true })
      .isArray()
      .withMessage('Invalid inputType field'),
    check('doneSoilTestingBefore')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required'),
    check('ph')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isFloat()
      .withMessage('Invalid ph field'),
    check('soilOrganicCarbon')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isFloat()
      .withMessage('Invalid soilOrganicCarbon field'),
    check('nitrogen')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isFloat()
      .withMessage('Invalid nitrogen field'),
    check('nitrogenUnits')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isInt()
      .withMessage('Invalid nitrogenUnits field'),
    check('phosphorus')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isFloat()
      .withMessage('Invalid phosphorus field'),
    check('phosphorusUnits')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isInt()
      .withMessage('Invalid phosphorusUnits field'),
    check('potassium')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isFloat()
      .withMessage('Invalid potassium field'),
    check('potassiumUnits')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isInt()
      .withMessage('Invalid potassiumUnits field'),
    check('sulfur')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isFloat()
      .withMessage('Invalid sulfur field'),
    check('sulfurUnits')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isInt()
      .withMessage('Invalid sulfurUnits field'),
    check('dateOfApplication')
      .optional({ checkFalsy: true })
      .notEmpty()
      .withMessage('This field is required'),
    check('stage')
      .optional({ checkFalsy: true })
      .notEmpty()
      .escape()
      .withMessage('This field is required')
      .isInt()
      .withMessage('Invalid stage field'),
    // check('limingMaterial')
    //   .optional({ checkFalsy: true })
    //   .isArray()
    //   .withMessage('must be an array'),
    // check('totalLimeApplied')
    //   .optional({ checkFalsy: true })
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isFloat()
    //   .withMessage('Invalid totalLimeApplied field'),
    // check('totalLimeAppliedUnits')
    //   .optional({ checkFalsy: true })
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isInt()
    //   .withMessage('Invalid totalLimeAppliedUnits field'),
    // check('limingRate')
    //   .optional({ checkFalsy: true })
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isFloat()
    //   .withMessage('Invalid limingRate field'),
    // check('limingRateUnits')
    //   .optional({ checkFalsy: true })
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isInt()
    //   .withMessage('Invalid limingRateUnits field'),
    // check('limingApplicationFrequency')
    //   .optional({ checkFalsy: true })
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isInt()
    //   .withMessage('Invalid limingApplicationFrequency field'),
    // check('soilApplicationMethod')
    //   .optional({ checkFalsy: true })
    //   .isArray()
    //   .withMessage('must be an array'),

    // [TODO] check to see if these fields can be removed
    // check('organicInputs').isArray().withMessage('must be an array'),
    // check('totalOrganicInputApplied')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isFloat()
    //   .withMessage('Invalid totalOrganicInputApplied field'),
    // check('totalOrganicInputAppliedUnit')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isInt()
    //   .withMessage('Invalid totalOrganicInputAppliedUnit field'),
    // check('organicInputsApplicationRate')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isFloat()
    //   .withMessage('Invalid organicInputsApplicationRate field'),
    // check('organicInputsApplicationRateUnit')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isInt()
    //   .withMessage('Invalid organicInputsApplicationRateUnit field'),
    // check('organicInputsApplicationFrequency')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isInt()
    //   .withMessage('Invalid organicInputsApplicationFrequency field'),
    // check('organicApplicationMethod').isArray().withMessage('must be an array'),
    // [TODO] check to see if these fields can be removed
    // check('syntheticFertilizers').isArray().withMessage('must be an array'),
    // check('nitrogenContent')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isFloat()
    //   .withMessage('Invalid nitrogenContent field'),
    // check('phosphorusContent')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isFloat()
    //   .withMessage('Invalid phosphorusContent field'),
    // check('potassiumContent')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isFloat()
    //   .withMessage('Invalid potassiumContent field'),
    // check('totalSyntheticFertilizerUsed')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isFloat()
    //   .withMessage('Invalid totalSyntheticFertilizerUsed field'),
    // check('totalSyntheticFertilizerUsedUnit')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isInt()
    //   .withMessage('Invalid totalSyntheticFertilizerUsedUnit field'),
    // check('syntheticFertilizerApplicationRate')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isFloat()
    //   .withMessage('Invalid syntheticFertilizerApplicationRate field'),
    // check('syntheticFertilizerApplicationRateUnit')
    //   .notEmpty()
    //   .escape()
    //   .withMessage('This field is required')
    //   .isInt()
    //   .withMessage('Invalid syntheticFertilizerApplicationRateUnit field'),
    // check('syntheticApplicationMethod')
    //   .isArray()
    //   .withMessage('must be an array'),
  ];
};

exports.exist = () => {
  return [
    check('id')
      .trim()
      .notEmpty()
      .withMessage('This field is required')
      .bail()
      .isInt()
      .bail()
      .escape()
      .custom(validSoilMgmtId),
  ];
};
