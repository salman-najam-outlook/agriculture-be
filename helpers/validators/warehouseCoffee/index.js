const { check } = require('express-validator');
const { Op } = require('sequelize');
const db = require(rootPath + '/models');

// custom rules
// check valid soil mgmt id
const validFarmId = async (id, { req }) => {
  const { id: userId } = req.user;
  const status = await db.user_farm.findOne({
    attributes: ['id'],
    where: { id, [Op.or]: [{ userId: userId }, { technicianId: userId }] },
  });
  if (status === null) {
    throw new Error('Invalid farm number');
  }
};

exports.get = () => {
  return [
    check('farm')
      .notEmpty()
      .withMessage('This field is required')
      .bail()
      .isInt()
      .withMessage('Invalid farm field')
      .bail()
      .escape()
      .custom(validFarmId),
  ];
};

exports.saveInbound = () => {
  return [
    check("productNameId").notEmpty().withMessage('productNameId is required').bail().isInt(),
    check("senderId").optional().notEmpty().withMessage('senderId is required').bail().isInt(),
    check("unitCount").notEmpty().withMessage('unitCount is required'),

    check("quantity").notEmpty().withMessage('quantity is required').bail().isFloat(),
    check("unitSize").notEmpty().withMessage('unitSize is required').bail().isFloat(),
    check("amount").optional().notEmpty().withMessage('amount is required').bail().isFloat(),

    check("quantityUom").notEmpty().withMessage('quantityUom is required').bail().isObject(),
    check("amountUom").optional().notEmpty().withMessage('amountUom is required').bail().isObject(),
    check("unitUom").notEmpty().withMessage('unitUom is required').bail().isObject(),

    check("images").optional().notEmpty().withMessage('images is required').bail().isArray({min:1}),
    check("images.*").isString().withMessage('name must be a string').bail().trim().notEmpty().withMessage('name can not be blank'),
    check("lots").optional().notEmpty().withMessage('lots is required').bail().isArray({min:1}),

    // check("productED").notEmpty().withMessage('productED is required').bail().isString(),
    check("recordId").optional().notEmpty().withMessage('recordId is required').bail().isString(),
    // check("type").notEmpty().withMessage('type should be dry_milling or buying_station').bail().isString(),
  ];
};

exports.listInbound = () => {
  desc = [
    "true",
    "false"
  ];

  return [
    check("search").optional().notEmpty().withMessage('search is required').isString(),
    check("lowQty").optional().notEmpty().withMessage('lowQty is required').isInt(),
    check("expDays").optional().notEmpty().withMessage('expDays is required').isInt(),
    check("page").optional().notEmpty().withMessage('page is required').isInt(),
    check("limit").optional().notEmpty().withMessage('limit is required').isInt(),
    check("col").optional().notEmpty().withMessage('col is required').isString(),
    check("desc").optional().notEmpty().withMessage('desc is required').isIn(desc),
  ];
};

exports.saveCuppingInbound = () => {

  return [
    check("inbound_warehouse_id").notEmpty().withMessage('Inbound warehouse id is required').isInt(),
    check("cupping_name").notEmpty().withMessage('Cupping name is required').isString(),
    check("cupping_time").notEmpty().withMessage('Cupping name is required').isISO8601().withMessage('Cupping time format should be YYYY-MM-DD'),
    check("roasting_time").notEmpty().withMessage('Roasting time is required').isFloat(),
    check("roasting_temperature").notEmpty().withMessage('Roasting temperature is required').isFloat(),
    check("roasting_temperature_unit").notEmpty().withMessage('Roasting temperature unit is required').isString(),
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

exports.saveCuppingOutbound = () => {

  return [
    check("outbound_warehouse_id").notEmpty().withMessage('Outbound warehouse id is required').isInt(),
    check("cupping_name").notEmpty().withMessage('Cupping name is required').isString(),
    check("cupping_time").notEmpty().withMessage('Cupping name is required').isISO8601().withMessage('Roasting time must be a valid date'),
    check("roasting_time").notEmpty().withMessage('Roasting time is required').isFloat(),
    check("roasting_temperature").notEmpty().withMessage('Roasting temperature is required').isFloat(),
    check("roasting_temperature_unit").notEmpty().withMessage('Roasting temperature unit is required').isString(),
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

exports.saveOutbound = () => {

  return [
      check("clientName").notEmpty().withMessage('clientName is required').isString(),
      check("warehouseProductName").notEmpty().withMessage('warehouseProductName is required').isString(),
      check("recordId").optional().notEmpty().withMessage('recordId is required').isString(),

      check("warehouseProductNameId").notEmpty().withMessage('warehouseProductNameId is required').isInt(),
      check("inboundLotId").notEmpty().withMessage('inboundLotId is required').isInt(),
      check("unitCount").notEmpty().withMessage('unitCount is required'),

      check("unitSize").notEmpty().withMessage('unitSize is required').isFloat(),
      check("totalQty").optional().notEmpty().withMessage('totalQty is required').isFloat(),
      check("amount").optional().notEmpty().withMessage('amount is required').isFloat(),

      check("unitUom").notEmpty().withMessage('unitUom is required').isObject(),
      check("totalQtyUom").optional().notEmpty().withMessage('totalQtyUom is required').isObject(),
      check("amountUom").optional().notEmpty().withMessage('amountUom is required').isObject(),
  ];
};

exports.inboundLotOutboundHistory = () => {
  return [
    check("inboundLotId").trim().notEmpty().withMessage('inboundLotId is required').isInt(),
    check("page").optional().trim().notEmpty().withMessage('page is required').isInt(),
    check("limit").optional().trim().notEmpty().withMessage('limit is required').isInt(),
  ];
};

exports.listOutbound = () => {
  desc = [
    "true",
    "false"
  ];

  return [
    check("dateRange").optional().notEmpty().withMessage('dateRange is required').isString(),
    check("search").optional().notEmpty().withMessage('search is required').isString(),
    check("page").optional().notEmpty().withMessage('page is required').isInt(),
    check("limit").optional().notEmpty().withMessage('limit is required').isInt(),
    check("col").optional().notEmpty().withMessage('col is required').isString(),
    check("desc").optional().notEmpty().withMessage('desc is required').isIn(desc),
  ];
};

exports.saveProductName = () => {
  return [
    check("name").trim().notEmpty().withMessage('name is required').isString(),
    check("recordId").optional().notEmpty().withMessage('recordId is required').isString(),
  ];
};

