const { check, oneOf } = require('express-validator');
const dateFormat = "MM/DD/YYYY";
exports.harvestingMethodValidator = () => [
  check('title', 'title is required').trim().notEmpty(),
];

exports.HarvestDataValidation = () => [
    oneOf([
      check("farmId")
      .notEmpty()
      .withMessage("farmId is required")
      .isArray()
      .withMessage("Must be an array"),       
      check("segment")
      .notEmpty()
      .withMessage("segment is required")
      .isArray()
      .withMessage("Must be an array")]),
    check('area', 'area is required').trim().notEmpty().isNumeric(),
    check('start_date_harvesting', 'start date of harvesting is required').trim().notEmpty().isDate({ format: dateFormat, strictMode: true }).withMessage("invalid date format"),
    check('end_date_harvesting', 'end date of harvesting is required').trim().notEmpty().isDate({ format: dateFormat, strictMode: true }).withMessage("invalid date format"),
    check('daysHarvesting', 'daysHarvesting is required').trim().notEmpty().isNumeric(),
    check('totalFreshYield', 'totalFreshYield is required').trim().notEmpty().isNumeric(),
    check('totalDryYield', 'totalDryYield is required').trim().notEmpty().isNumeric(),
    // check('totalPlannedYield', 'totalPlannedYield is required').trim().notEmpty().isNumeric(),
    check('total_planned_fresh_yield', 'total planned fresh yield is required').trim().notEmpty().isNumeric(),
    check('total_planned_dry_yield', 'total planned dry yield is required').trim().notEmpty().isNumeric(),
    check('methodForHarvesting', 'methodForHarvesting is required').trim().notEmpty().isNumeric(),
    
];

