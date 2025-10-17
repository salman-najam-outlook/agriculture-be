const { check } = require('express-validator');
const db = require(rootPath + '/models');

const desc = ['true', 'false'];

exports.get = () => [
  check('page').if(check('page').notEmpty()).trim().notEmpty().isInt(),
  check('limit').if(check('limit').notEmpty()).trim().notEmpty().isInt(),
  check('col').if(check('col').notEmpty()).trim().notEmpty().isString(),
  check('desc').if(check('desc').notEmpty()).trim().notEmpty().isIn(desc),
  check('success').if(check('success').notEmpty()).trim().notEmpty().escape(),
];

exports.delete = () => [
  check('id')
    .trim()
    .notEmpty()
    .withMessage('uploadId is required')
    .isInt()
    .bail()
    .custom(async (id) => {
      const status = await db.UserImport.findOne({
        where: { id, isDeleted: '0' },
        attributes: ['id', 'location'],
      });
      if (status == null) throw new Error("uploadId doesn't exist");
    }),
];
