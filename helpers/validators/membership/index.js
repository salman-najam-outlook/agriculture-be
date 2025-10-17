const { check } = require('express-validator');
const db = require(rootPath + '/models');

exports.getMembershipDetails = () => {
  return [
    check('organizationId')
      .trim()
      .notEmpty()
      .withMessage('This field is required')
      .bail()
      .isInt()
      .bail()
      .escape()
      .custom(async (id, { req }) => {
        const { id: userId } = req.user;
        const status = await db.Organization.findOne({
          raw: true,
          where: { id },
          include: [
            {
              required: true,
              where: { userId },
              model: db.MapUserOrganization,
              as: 'mapUserOrganization',
              attributes: [],
            },
          ],
        });
        if (status === null) throw new Error('invalid organization id');
      }),
  ];
};

exports.updateUserMembership = () => {
  return [
    check('organizationId')
      .trim()
      .notEmpty()
      .withMessage('This field is required')
      .bail()
      .isInt()
      .bail()
      .escape()
      .custom(async (id, { req }) => {
        const { id: userId } = req.user;
        const status = await db.Organization.findOne({
          raw: true,
          where: { id },
          include: [
            {
              required: true,
              where: { userId },
              model: db.MapUserOrganization,
              as: 'mapUserOrganization',
              attributes: [],
            },
          ],
        });
        if (status === null) throw new Error('invalid organization id');
      }),
    check('membershipId')
      .trim()
      .notEmpty()
      .withMessage('This field is required')
      .bail()
      .isInt()
      .bail()
      .escape()
      .custom(async (membership_id, { req }) => {
        const { id: user_id } = req.user;

        let status = await db.Membership.findOne({
          include: [
            {
              required: true,
              where: { user_id, membership_id },
              model: db.UserMembershipMap,
              as: 'membershipMap',
              attributes: [],
            },
          ],
        });

        if (status === null) throw new Error('invalid membership id');
      }),
  ];
};
