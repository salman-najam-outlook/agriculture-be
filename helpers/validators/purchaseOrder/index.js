const { check } = require('express-validator');
const db = require(rootPath + '/models');

exports.post = () => {
  const coffeeCherryQlty = ['A', 'B', 'C', 'D', 'E'];
  const isPaid = ['1', '0', 1, 0];
  return [
    check('farmerId')
      .if(check('farmerId').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('farmerId is required')
      .bail()
      .isInt(),
    check('coffeeCherryQty')
      .trim()
      .notEmpty()
      .withMessage('coffeeCherryQty is required')
      .bail()
      .isFloat(),
    check('coffeeCherryQlty')
      .trim()
      .notEmpty()
      .withMessage('coffeeCherryQlty is required')
      .bail()
      .isIn(coffeeCherryQlty),
    check('perKgPrice')
      .trim()
      .notEmpty()
      .withMessage('perKgPrice is required')
      .bail()
      .isFloat(),
    check('grandTotal')
      .trim()
      .notEmpty()
      .withMessage('grandTotal is required')
      .bail()
      .isFloat(),
    check('isPaid')
      .trim()
      .notEmpty()
      .withMessage('isPaid is required')
      .bail()
      .isIn(isPaid),
    check('purchasedAt')
      .trim()
      .notEmpty()
      .withMessage('purchasedAt is required')
      .bail()
      .isDate({ format: 'MM/DD/YYYY', delimiters: ['/'] })
      .withMessage('invalid date'),
    check('recordId')
      .trim()
      .notEmpty()
      .withMessage('recordId is required')
      .bail()
      .isString(),
  ];
};

exports.list = () => {
  const order = ['asc', 'desc', 'ASC', 'DESC'];
  return [
    check('page')
      .if(check('page').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('page is required')
      .isInt({ min: 1 })
      .escape(),
    check('limit')
      .if(check('limit').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('limit is required')
      .isInt({ min: 0 })
      .escape(),
    check('col')
      .if(check('col').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('col is required')
      .isString()
      .escape(),
    check('order')
      .if(check('order').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('order is required')
      .isIn(order)
      .escape(),
    check('search')
      .if(check('search').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('search is required')
      .isString()
      .escape(),
  ];
};

exports.getAll = () => {
  return [
    check('dateRange')
      .if(check('dateRange').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('dateRange is required')
      .isString(),
    check('farmer')
      .if(check('farmer').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('farmer is required')
      .isString(),
  ];
};

exports.createPurchaseOrderAdmin = () => {
  const coffeeCherryQlty = ['A', 'B', 'C', 'D', 'E'];
  const isPaid = ['1', '0', 1, 0];
  return [
    check('coffeeCherryPic')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('coffeeCherryPic is required')
      .bail()
      .isInt(),
    check('buyingStationId')
      .trim()
      .notEmpty()
      .withMessage('buyingStationId is required')
      .bail()
      .isString(),
    check('farmerId')
      .if(check('farmerId').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('farmerId is required')
      .bail()
      .isInt(),
    check('coffeeCherryQty')
      .trim()
      .notEmpty()
      .withMessage('coffeeCherryQty is required')
      .bail()
      .isFloat(),
    check('coffeeCherryQlty')
      .trim()
      .notEmpty()
      .withMessage('coffeeCherryQlty is required')
      .bail()
      .isIn(coffeeCherryQlty),
    check('perKgPrice')
      .trim()
      .notEmpty()
      .withMessage('perKgPrice is required')
      .bail()
      .isFloat(),
    check('grandTotal')
      .trim()
      .notEmpty()
      .withMessage('grandTotal is required')
      .bail()
      .isFloat(),
    check('isPaid')
      .trim()
      .notEmpty()
      .withMessage('isPaid is required')
      .bail()
      .isIn(isPaid),
    check('purchasedAt')
      .trim()
      .notEmpty()
      .withMessage('purchasedAt is required')
      .bail()
      .isDate({ format: 'MM/DD/YYYY', delimiters: ['/'] })
      .withMessage('invalid date'),
  ];
};
exports.updatePurchaseOrderAdmin = () => {
  const coffeeCherryQlty = ['A', 'B', 'C', 'D', 'E'];
  const isPaid = ['1', '0', 1, 0];
  return [
    check('orderId')
      .trim()
      .notEmpty()
      .withMessage('orderId is required')
      .bail()
      .isInt()
      .bail()
      .custom(async (id) => {
        const status = await db.BuyingStationOrder.findOne({
          attributes: ['id'],
          where: { id },
        });
        if (status === null) throw new Error("Purchase order doesn't exist");
      }),
    check('coffeeCherryPic')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('coffeeCherryPic is required')
      .bail()
      .isString(),
    check('buyingStationId')
      .trim()
      .notEmpty()
      .withMessage('buyingStationId is required')
      .bail()
      .isInt(),
    check('farmerId')
      .if(check('farmerId').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('farmerId is required')
      .bail()
      .isInt(),
    check('coffeeCherryQty')
      .trim()
      .notEmpty()
      .withMessage('coffeeCherryQty is required')
      .bail()
      .isFloat(),
    check('coffeeCherryQlty')
      .trim()
      .notEmpty()
      .withMessage('coffeeCherryQlty is required')
      .bail()
      .isIn(coffeeCherryQlty),
    check('perKgPrice')
      .trim()
      .notEmpty()
      .withMessage('perKgPrice is required')
      .bail()
      .isFloat(),
    check('grandTotal')
      .trim()
      .notEmpty()
      .withMessage('grandTotal is required')
      .bail()
      .isFloat(),
    check('isPaid')
      .trim()
      .notEmpty()
      .withMessage('isPaid is required')
      .bail()
      .isIn(isPaid),
    check('purchasedAt')
      .trim()
      .notEmpty()
      .withMessage('purchasedAt is required')
      .bail()
      .isDate({ format: 'MM/DD/YYYY', delimiters: ['/'] })
      .withMessage('invalid date'),
  ];
};
exports.deletePurchaseOrderAdmin = () => {
  return [
    check('orderId')
      .trim()
      .notEmpty()
      .withMessage('orderId is required')
      .bail()
      .isInt()
      .bail()
      .custom(async (id) => {
        const status = await db.BuyingStationOrder.findOne({
          attributes: ['id'],
          where: { id },
        });
        if (status === null) throw new Error("Purchase order doesn't exist");
      }),
  ];
};
exports.getPurchaseOrderAdmin = () => {
  return [
    check('orderCode')
      .trim()
      .notEmpty()
      .withMessage('orderCode is required')
      .bail()
      .isString(),
  ];
};
