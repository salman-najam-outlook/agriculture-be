const { check } = require('express-validator');
const db = require(rootPath + '/models');

// custom rules
// check valid soil mgmt id
const validFarmId = async (id, { req }) => {
  const { id: userId } = req.user;
  const status = await db.user_farm.findOne({
    attributes: ['id'],
    where: { id, userId },
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
    // check("productNameId").notEmpty().withMessage('productNameId is required').bail().isInt(),
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
    // check("lots").optional().notEmpty().withMessage('lots is required').bail().isArray({min:1}),  

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


exports.saveOutbound = () => {

  return [
      check("clientName").notEmpty().withMessage('clientName is required').isString(),
      check("productName").notEmpty().withMessage('ProductName is required').isString(),
      check("recordId").optional().notEmpty().withMessage('recordId is required').isString(),

      check("productNameId").notEmpty().withMessage('ProductNameId is required').isInt(),
      check("inboundLotId").notEmpty().withMessage('inboundLotId is required').isInt(),
      check("unitCount").optional().notEmpty().withMessage('unitCount is required'),

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

