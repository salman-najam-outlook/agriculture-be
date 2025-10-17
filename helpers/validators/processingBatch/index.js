const db = require(rootPath + '/models');
const { check } = require('express-validator');

exports.postCreate = () => {
  return [
    check('startDate')
      .trim()
      .notEmpty()
      .withMessage('startDate is required')
      .isDate({ format: 'MM/DD/YYYY', delimiters: ['/'] })
      .withMessage('invalid date'),
    check('endDate')
      .trim()
      .notEmpty()
      .withMessage('endDate is required')
      .isDate({ format: 'MM/DD/YYYY', delimiters: ['/'] })
      .withMessage('invalid date'),
    // check('totalCoffeeCherryQty')
    //   .trim()
    //   .notEmpty()
    //   .withMessage('totalCoffeeCherryQty is required')
    //   .escape(),
    // check('humidity')
    //   .trim()
    //   .notEmpty()
    //   .withMessage('humidity is required')
    //   .escape(),
    // check('recordId')
    //   .if(check('recordId').notEmpty())
    //   .trim()
    //   .notEmpty()
    //   .withMessage('recordId is required')
    //   .escape(),
    // check('temperature')
    //   .trim()
    //   .notEmpty()
    //   .withMessage('temperature is required')
    //   .escape(),
    // check('waterContent')
    //   .trim()
    //   .notEmpty()
    //   .withMessage('waterContent is required')
    //   .escape(),
    // check('batchRating')
    //   .trim()
    //   .notEmpty()
    //   .withMessage('batchRating is required')
    //   .escape(),
    // check('purchasingNum')
    //   .isArray({ min: 1 })
    //   .withMessage('purchasingNum is required and must be an array'),
    // check('purchasingNum')
    //   .custom(async (order, { req }) => {
    //     console.log(JSON.parse(order), "------purchasingNum----")
    //     const status1 = await db.BuyingStationOrder.findOne({
    //       where: { id: order.orderId },
    //     });
    //     if (status1 === null)
    //       throw new Error(`purchase orderId:${order.orderId} doesn't exist`);
    //   }),
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
  const status = ['completed', 'inprocess', 'all'];
  return [
    check('dateRange')
      .if(check('dateRange').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('dateRange is required')
      .isString(),
    check('status')
      .if(check('status').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('status is required')
      .isIn(status),
  ];
};

exports.parchmentOut = () => {
  return [
    check('parchmentOut')
      .trim()
      .notEmpty()
      .withMessage('parchmentOut is required')
      .bail()
      .isFloat()
      .withMessage('invalid input'),
    check('processingBatchId')
      .trim()
      .notEmpty()
      .withMessage('parchmentOut is required')
      .escape()
      .custom(async (processingBatchId) => {
        const status = await db.BuyingStationProcessingBatch.findOne({
          where: { id: processingBatchId },
        });
        if (status === null) throw new Error(`processingBatchId doesn't exist`);
      }),
  ];
};

exports.createProcessingBatchAdmin = () => {
  const batchRating = ['Platinum', 'Gold', 'Silver', 'Bronze', 'A', 'B', 'C', 'D', 'E',];
  return [
    check('startDate')
      .trim()
      .notEmpty()
      .withMessage('startDate is required')
      .bail()
      .isString(),
    check('endDate')
      .trim()
      .notEmpty()
      .withMessage('endDate is required')
      .bail()
      .isString(),
    check('purchasingNum')
      .notEmpty()
      .withMessage('purchasingNum is required')
      .bail()
      .isArray({ min: 1 }),
    check('totalCoffeeCherryQty')
      .trim()
      .notEmpty()
      .withMessage('totalCoffeeCherryQty is required')
      .bail()
      .isFloat(),
    // check('humidity')
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage('humidity is required')
    //   .bail()
    //   .isFloat(),
    // check('density')
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage('density is required')
    //   .bail()
    //   .isFloat(),
    // check('temperature')
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage('temperature is required')
    //   .bail()
    //   .isFloat(),
    // check('waterContent')
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage('waterContent is required')
    //   .bail()
    //   .isFloat(),
    check('processingTypeId')
      .trim()
      .notEmpty()
      .withMessage('processingTypeId is required')
      .bail()
      .isInt(),
    // check('batchRating')
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage('batchRating is required')
    //   .bail()
    //   .isIn(batchRating),
    check('buyingStationId')
      .trim()
      .notEmpty()
      .withMessage('buyingStationId is required')
      .bail()
      .isInt(),
  ];
};
exports.updateProcessingBatchAdmin = () => {
  const batchRating = ['Platinum', 'Gold', 'Silver', 'Bronze', 'A', 'B', 'C', 'D', 'E',];
  return [
    check('batchId')
      .trim()
      .notEmpty()
      .withMessage('batchId is required')
      .bail()
      .isInt()
      .bail()
      .custom(async (id) => {
        const status = await db.BuyingStationProcessingBatch.findOne({
          attributes: ['id'],
          where: { id },
        });
        if (status === null) throw new Error("Processing batch doesn't exist");
      }),
    check('startDate')
      .trim()
      .notEmpty()
      .withMessage('startDate is required')
      .bail()
      .isString(),
    check('endDate')
      .trim()
      .notEmpty()
      .withMessage('endDate is required')
      .bail()
      .isString(),
    check('purchasingNum')
      .notEmpty()
      .withMessage('purchasingNum is required')
      .bail()
      .isArray({ min: 1 }),
    check('totalCoffeeCherryQty')
      .trim()
      .notEmpty()
      .withMessage('totalCoffeeCherryQty is required')
      .bail()
      .isFloat(),
    // check('humidity')
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage('humidity is required')
    //   .bail()
    //   .isFloat(),
    // check('density')
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage('density is required')
    //   .bail()
    //   .isFloat(),
    // check('temperature')
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage('temperature is required')
    //   .bail()
    //   .isFloat(),
    // check('waterContent')
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage('waterContent is required')
    //   .bail()
    //   .isFloat(),
    check('processingTypeId')
      .trim()
      .notEmpty()
      .withMessage('processingTypeId is required')
      .bail()
      .isInt(),
    // check('batchRating')
    //   .optional()
    //   .trim()
    //   .notEmpty()
    //   .withMessage('batchRating is required')
    //   .bail()
    //   .isIn(batchRating),
    check('buyingStationId')
      .trim()
      .notEmpty()
      .withMessage('buyingStationId is required')
      .bail()
      .isInt(),
  ];
};
exports.deleteProcessingBatchAdmin = () => {
  return [
    check('batchId')
      .trim()
      .notEmpty()
      .withMessage('batchId is required')
      .bail()
      .isInt()
      .bail()
      .custom(async (id) => {
        const status = await db.BuyingStationProcessingBatch.findOne({
          attributes: ['id'],
          where: { id },
        });
        if (status === null) throw new Error("Processing batch doesn't exist");
      }),
  ];
};
exports.getProcessingBatchAdmin = () => {
  return [
    check('batchCode')
      .trim()
      .notEmpty()
      .withMessage('batchCode is required')
      .bail()
      .isString(),
  ];
};
