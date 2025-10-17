const { check, oneOf, param, body, query } = require("express-validator");
exports.validateCreateCoffeeHarvesting = () => {
    return [
        check("harvestingDate").notEmpty().withMessage('Harvesting date is required').isISO8601().withMessage('Harvesting Date format should be YYYY-MM-DD'),
        check("plantationId").notEmpty().withMessage('plantation id is required').isInt(),
        check("quality").notEmpty().withMessage('Quality is required').isString().isIn(["A", "B", "C", "D", "E"]).withMessage('Quality must be one of ["A", "B", "C", "D", "E"]'),
        check("coffeeYield").notEmpty().withMessage('Yield is required').isFloat(),
        check("coffeeYieldUnitId").notEmpty().withMessage('coffeeYieldUnitId is required').isInt(),
        check("reasonForLossId").optional().notEmpty().withMessage('reason for loss should be integer').isInt(),
        check("recordId").notEmpty().withMessage('recordId is required').isString(),
    ];
  };
exports.validateCoffeeHarvestingQuery = () => {
    return [
        check("page").optional().notEmpty().withMessage('page should be integer').isInt(),
        check("limit").optional().notEmpty().withMessage('limit should be integer').isInt(),
        check("startDate").optional().notEmpty().isISO8601().withMessage('start Date format should be YYYY-MM-DD'),
        check("endDate").optional().notEmpty().isISO8601().withMessage('end Date format should be YYYY-MM-DD'),
        check("dateType").optional().isString().isIn(["by_time", "comparison_time"]).withMessage('date Type value should be either by_time or comparison_time'),
        check("byTimeStartDate").notEmpty().withMessage('By time start date is required').isISO8601().withMessage('By time start data format should be YYYY-MM-DD'),
        check("byTimeEndDate").notEmpty().withMessage('By time end date is required').isISO8601().withMessage('By time end data format should be YYYY-MM-DD'),
        check("comparisonTimeStartDate").notEmpty().withMessage('Comparison time start date is required').isISO8601().withMessage('Comparison time start data format should be YYYY-MM-DD'),
        check("comparisonTimeEndDate").notEmpty().withMessage('Comparison time end date is required').isISO8601().withMessage('Comparison time end data format should be YYYY-MM-DD'),
        check("byTimeText").notEmpty().withMessage('by Time Text is required').isString(),
        check("comparisonTimeText").notEmpty().withMessage('comparison Time Text is required').isString(),
    ];
};