const { check } = require('express-validator');
const db = require(rootPath + '/models');

exports.create = () => {
  const notify = ['user', 'admin'];
  return [
    check('notify')
      .notEmpty()
      .withMessage('This field is required')
      .bail()
      .isIn(notify)
      .escape(),
    check('message')
      .trim()
      .notEmpty()
      .withMessage('This field is required')
      .escape(),
    check('users')
      // .if(check('users').notEmpty())
      .isArray({ min: 1 })
      .withMessage('must be an array and not empty'),
    check('users.*')
      .trim()
      .notEmpty()
      .withMessage('array values can not be empty')
      .isInt()
      .escape(),
  ];
};

exports.markSeen = () => {
  return [
    check('notificationId').isArray({ min: 1 }).withMessage('must be an array'),
    check('notificationId.*')
      .trim()
      .notEmpty()
      .withMessage('array values can not be empty')
      .isInt()
      .escape(),
  ];
};

exports.list = () => {
  const order = ['asc', 'desc', 'ASC', 'DESC'];
  const seen = ['0', '1'];
  return [
    check('seen')
      .if(check('seen').exists())
      .trim()
      .notEmpty()
      .withMessage('seen is required')
      .isIn(seen)
      .withMessage(`must be ${seen.join(', ')}`)
      .escape(),
    check('page')
      .if(check('page').exists())
      .trim()
      .notEmpty()
      .withMessage('page is required')
      .isInt({ min: 1 })
      .withMessage('must be a number')
      .escape(),
    check('limit')
      .if(check('limit').exists())
      .trim()
      .notEmpty()
      .withMessage('limit is required')
      .isInt({ min: 0 })
      .withMessage('must be a number')
      .escape(),
    check('orderBy')
      .if(check('orderBy').exists())
      .trim()
      .notEmpty()
      .withMessage('orderBy is required')
      .isString()
      .withMessage('should be a column name')
      .escape(),
    check('order')
      .if(check('order').exists())
      .trim()
      .notEmpty()
      .withMessage('order is required')
      .isIn(order)
      .withMessage(`must be ${order.join(', ')}`)
      .escape(),
  ];
};
