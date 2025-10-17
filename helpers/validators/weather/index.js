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
