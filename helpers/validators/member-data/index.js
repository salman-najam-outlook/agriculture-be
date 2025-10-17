const { check, oneOf, param, body, query } = require("express-validator");

exports.farmStatusChange = () => {
    return [
        check("status").notEmpty().withMessage('Status is required').isString().isIn(["approved", "pending", "rejected"]).withMessage('Status must be one of ["approved", "rejected", "pending"]'),
    ];
  };
exports.farmLimitValidate = () => {
    return [
        check("farm_limit").notEmpty().withMessage('farm_limit is required').isInt(),
    ];
  };