const { check } = require('express-validator');

exports.saveCupping = () => {

    return [
      check("module_type").notEmpty().withMessage('Module type is required').isString().isIn(["INBOUND_WAREHOUSE", "OUTBOUND_WAREHOUSE", "PARCHMENT_COFFEE"]).withMessage('Module type must be one of ["INBOUND_WAREHOUSE", "OUTBOUND_WAREHOUSE", "PARCHMENT_COFFEE"]'),
      check("module_id").notEmpty().withMessage('module id is required. It is the id of either INBOUND_WAREHOUSE or OUTBOUND_WAREHOUSE or PARCHMENT_COFFEE').isInt(),
      check("cupping_name").notEmpty().withMessage('Cupping name is required').isString(),
      check("cupping_date").notEmpty().withMessage('Cupping date is required').isISO8601().withMessage('Cupping date format should be YYYY-MM-DD'),
      check("roasting_time").notEmpty().withMessage('Roasting time is required').isFloat(),
      check("roasting_temperature").notEmpty().withMessage('Roasting temperature is required').isFloat(),
      check("roasting_temperature_unit").notEmpty().withMessage('Roasting temperature unit is required').isString().isIn(["C", "F", "K"]).withMessage('Temperature unit must be one of ["C", "F", "K"]'),
      check("fragrance").notEmpty().withMessage('Fragrance/Aromas is required').isFloat(),
      check("fragrance_break").notEmpty().withMessage('fragrance break is required').isFloat(),
      check("fragrance_dry").notEmpty().withMessage('fragrance dry is required').isFloat(),
      check("fragrance_qualities").optional().isArray().withMessage('Fragrance qualities must be an array'),
      check("fragrance_qualities.*").optional().isString().withMessage('Each item in fragrance qualities array must be a string'),
      check("flavour").notEmpty().withMessage('Flavor is required').isFloat(),
      check("flavour_qualities").optional().isArray().withMessage('Flavor qualities must be an array'),
      check("flavour_qualities.*").optional().isString().withMessage('Each item in flavor qualities array must be a string'),
      check("after_taste").notEmpty().withMessage('after taste is required').isFloat(),
      check("after_taste_qualities").optional().isArray().withMessage('after taste qualities must be an array'),
      check("after_taste_qualities.*").optional().isString().withMessage('Each item in after taste qualities array must be a string'),
      check("acidity").notEmpty().withMessage('acitity is required').isFloat(),
      check("acidity_qualities").optional().isArray().withMessage('acitity qualities must be an array'),
      check("acidity_qualities.*").optional().isString().withMessage('Each item in acitity qualities array must be a string'),
      check("body").notEmpty().withMessage('body is required').isFloat(),
      check("balance").notEmpty().withMessage('balance is required').isFloat(),
      check("balance_qualities").optional().isArray().withMessage('balance qualities must be an array'),
      check("body_level").notEmpty().withMessage('body level is required').isFloat(),
      check("body_qualities").optional().isArray().withMessage('body qualities must be an array'),
      check("body_qualities.*").optional().isString().withMessage('Each item in body qualities array must be a string'),
      check("uniformity").optional().notEmpty().withMessage('uniformity should have decimal value').isFloat(),
      check("clean_cup").optional().notEmpty().withMessage('clean cup should have decimal value').isFloat(),
      check("sweetness").optional().notEmpty().withMessage('sweetness should have decimal value').isFloat(),
      check("overall").optional().notEmpty().withMessage('overall should have decimal value').isFloat(),
      check("defect_cups").optional().notEmpty().withMessage('defect cups intensity should have decimal value').isFloat(),
      check("defect_intensity").optional().notEmpty().withMessage('defect intensity should have decimal value').isFloat(),
      check("defect_value").optional().notEmpty().withMessage('defect value intensity should have decimal value').isFloat(),
      check("final_score").optional().notEmpty().withMessage('defect value intensity should have decimal value').isFloat(),
    ];
  };

exports.getCupping = () => {
    return [
      check("module_type").notEmpty().withMessage('Module type is required').isString().isIn(["INBOUND_WAREHOUSE", "OUTBOUND_WAREHOUSE", "PARCHMENT_COFFEE"]).withMessage('Module type must be one of ["INBOUND_WAREHOUSE", "OUTBOUND_WAREHOUSE", "PARCHMENT_COFFEE"]'),
      check("module_id").notEmpty().withMessage('module id is required. It is the id of either INBOUND_WAREHOUSE or OUTBOUND_WAREHOUSE or PARCHMENT_COFFEE').isInt(),
    ];
  };