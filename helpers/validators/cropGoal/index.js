const { check } = require('express-validator');
const dateFormat = 'MM/DD/YYYY';

exports.getCropGoalValidation = () => {
  return [
    // check('sortBy').trim().notEmpty().withMessage('sortBy is required'),
    // check('order').trim().notEmpty().withMessage('order is required'),
  ];
};

exports.deleteCropGoalValidation = () => {
  return [
    check('id').trim().notEmpty().withMessage('crop goal id is required'),
  ];
};

exports.addCropGoalValidation = () => {
  return [
    // check('farmId').notEmpty().withMessage('farmId is required'),
    // check('farmSize').optional().notEmpty().withMessage('farmSize is required'),
    // check('farmSizeUom').notEmpty().withMessage('farmSizeUom is required'),
    check('cropTypeId').notEmpty().withMessage('cropTypeId is required'),
    check('cropVarieties')
      .optional()
      .isArray({ min: 1 })
      .withMessage('cropVarieties should be an array'),
    check('cropGoalType')
      .isArray()
      .withMessage('cropGoalType should be an array'),
    // check('harvestedYieldTarget')
    //   .notEmpty()
    //   .withMessage('harvestedYieldTarget is required'),
    // check('harvestedYieldTargetUom')
    //   .notEmpty()
    //   .withMessage('harvestedYieldTargetUom is required'),
    // check('incomeTarget').notEmpty().withMessage('incomeTarget is required'),
    // check('incomeTargetUom')
    //   .notEmpty()
    //   .withMessage('incomeTargetUom is required'),
    // check('syntheticFertilizerUsageTarget')
    //   .notEmpty()
    //   .withMessage('syntheticFertilizerUsageTarget is required'),
    // check('syntheticFertilizerUsageTargetUom')
    //   .notEmpty()
    //   .withMessage('syntheticFertilizerUsageTargetUom is required'),
    check('seasonName').notEmpty().withMessage('seasonName is required'),
    check('seasonStartDate')
      .notEmpty()
      .withMessage('seasonStartDate is required'),
    check('seasonEndDate').notEmpty().withMessage('seasonEndDate is required'),
    check('cropGoalType').notEmpty().withMessage('cropGoalType is required'),
    check('prevCropHistory')
      .optional()
      .isArray({ min: 1 })
      .withMessage('prevCropHistory is required')
  ];
};

exports.updateCropGoalValidation = () => {
  return [
    check('id').notEmpty().withMessage('id is required'),
    // check('farmId').notEmpty().withMessage('farmId is required'),
    // check('farmSize').optional().notEmpty().withMessage('farmSize is required'),
    // check('farmSizeUom').notEmpty().withMessage('farmSizeUom is required'),
    check('cropTypeId').notEmpty().withMessage('cropTypeId is required'),
    check('cropVarieties')
      .optional()
      .isArray({ min: 1 })
      .withMessage('cropVarieties should be an array'),
    check('cropGoalType')
      .isArray()
      .withMessage('cropGoalType should be an array'),
    // check('harvestedYieldTarget')
    //   .notEmpty()
    //   .withMessage('harvestedYieldTarget is required'),
    // check('harvestedYieldTargetUom')
    //   .notEmpty()
    //   .withMessage('harvestedYieldTargetUom is required'),
    // check('incomeTarget').notEmpty().withMessage('incomeTarget is required'),
    // check('incomeTargetUom')
    //   .notEmpty()
    //   .withMessage('incomeTargetUom is required'),
    // check('syntheticFertilizerUsageTarget')
    //   .notEmpty()
    //   .withMessage('syntheticFertilizerUsageTarget is required'),
    // check('syntheticFertilizerUsageTargetUom')
    //   .notEmpty()
    //   .withMessage('syntheticFertilizerUsageTargetUom is required'),
    check('seasonStartDate')
      .notEmpty()
      .withMessage('seasonStartDate is required'),
    check('seasonEndDate').notEmpty().withMessage('seasonEndDate is required'),
    check('cropGoalType').notEmpty().withMessage('cropGoalType is required'),
    check('prevCropHistory')
      .optional()
      .isArray({ min: 1 })
      .withMessage('prevCropHistory is required'),
    check('note').optional().trim().notEmpty().withMessage('note is required'),
  ];
};

exports.seasonCreateValidation = () => {
  return [
    check('seasonName').notEmpty().withMessage('seasonName is required'),
    check('seasonStartDate')
      .notEmpty()
      .withMessage('seasonStartDate is required'),
    check('seasonEndDate').notEmpty().withMessage('seasonEndDate is required'),
  ];
};

exports.updateFinalValueValidation = () => {
  return [
    check('goalId').notEmpty().withMessage('goalId is required'),
    check('yieldHarvested')
      .notEmpty()
      .withMessage('yieldHarvested is required'),
    check('seasonEndDate').notEmpty().withMessage('seasonEndDate is required'),
    check('yieldHarvestedUom')
      .notEmpty()
      .withMessage('yieldHarvestedUom is required'),
    check('marketValue').notEmpty().withMessage('marketValue is required'),
    check('marketValueUom')
      .notEmpty()
      .withMessage('marketValueUom is required'),
    check('syntheticFertilizerUsed')
      .notEmpty()
      .withMessage('syntheticFertilizerUsed is required'),
    check('syntheticFertilizerUsedUom')
      .notEmpty()
      .withMessage('syntheticFertilizerUsedUom is required'),
    check('maximizingYieldNote')
      .notEmpty()
      .withMessage('maximizingYieldNote is required'),
    check('maximizingIncomeNote')
      .notEmpty()
      .withMessage('maximizingIncomeNote is required'),
    check('syntheticFertilizerUsedNote')
      .notEmpty()
      .withMessage('syntheticFertilizerUsedNote is required'),
  ];
};
