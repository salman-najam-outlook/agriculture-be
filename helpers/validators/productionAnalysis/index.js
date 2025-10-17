const { check } = require('express-validator');
const db = require(rootPath + '/models');

exports.addProductionTarget = () => {
  return [
    check('targetVal')
      .trim()
      .notEmpty()
      .withMessage('targetVal is required')
      .isFloat(),
    check('year')
      .trim()
      .notEmpty()
      .withMessage('year is required')
      .isInt({ min: 2000 }),
    check('recordId')
      .if(check('recordId').notEmpty())
      .trim()
      .notEmpty()
      .withMessage('recordId is required')
      .escape(),
  ];
};

exports.editProductionTarget = () => {
  return [
    check('targetVal')
      .trim()
      .notEmpty()
      .withMessage('targetVal is required')
      .isFloat(),
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

exports.chart = () => {
  const type = ['month', 'year'];
  return [
    check('type')
      .trim()
      .notEmpty()
      .withMessage('type is required')
      .isIn(type)
      .escape(),
    check('val').trim().notEmpty().withMessage('value is required').isString(),
  ];
};
