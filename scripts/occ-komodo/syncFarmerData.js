const { Op } = require('sequelize');
const app = require('../../app');
const db = require(rootPath + '/models');
const { syncFarmerDataToOCC, FARMER_ROLES, ORGANIZATION_CODES } = require(rootPath + '/helpers/occ-komodo');

async function syncFarmerData() {
  const users = await db.user.findAll({
    attributes: ['id'],
    where: {
      [Op.and]: [
        { id_number: { [Op.not]: null } },
        { id_number: { [Op.ne]: '' } },
      ]
    },
    include: [
      {
        model: db.Membership,
        attributes: [],
        as: 'user_membership',
        through: { attributes: ['id'] },
        required: true,
        include: [
          {
            model: db.UserRoleMembershipMap,
            as: 'userRoleMembershipMap',
            attributes: [],
            required: true,
            where: {
              isDeleted: false,
              user_role_id: { [Op.in]: FARMER_ROLES },
            },
          },
          {
            model: db.Organization,
            as: 'org_assoc',
            required: true,
            where: {
              isDeleted: false,
              code: { [Op.in]: ORGANIZATION_CODES },
            },
            attributes: [],
          },
        ],
      },
      {
        model: db.user_farm,
        as: 'farms',
        required: true,
        attributes: [],
      },
    ],
  });
  await Promise.all(users.map((user) => syncFarmerDataToOCC(user.id)));
  process.exit(1);
}

syncFarmerData();
