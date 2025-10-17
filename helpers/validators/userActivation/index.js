const { check } = require('express-validator');
const db = require(rootPath + '/models');

exports.post = () => [
  check('uploadId')
    .trim()
    .notEmpty()
    .withMessage('uploadId is required')
    .isInt()
    .bail()
    .custom(async (id) => {
      const status = await db.UserImport.findOne({
        where: { id, isDeleted: '0' },
        attributes: ['id', 'location', 'status'],
      });
      if (status == null) throw new Error("uploadId doesn't exist");
      if (status.status == 'success')
        throw new Error('emails are sent already');
    }),
];
