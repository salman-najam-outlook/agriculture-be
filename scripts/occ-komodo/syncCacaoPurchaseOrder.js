const { Op } = require('sequelize');
const app = require('../../app');
const db = require(rootPath + '/models');
const { syncCacaoPurchaseOrderDataToOCC, FARMER_ROLES, ORGANIZATION_CODES } = require(rootPath + '/helpers/occ-komodo');

async function syncCacaoPurchaseOrderToOCC() {
  const purchaseOrders = await db.CacaoPurchaseOrder.findAll({
    where: {
      isdeleted: null,
    },
    attributes: ['id'],
    include: [
      {
        model: db.user,
        as: 'farmer',
        attributes: ['id'],
        required: true,
        where: {
          [Op.and]: [
            { id_number: { [Op.not]: null } },
            { id_number: { [Op.ne]: '' } },
          ]
        },
        include: [
          {
            model: db.Membership,
            attributes: ['id'],
            as: 'user_membership',
            through: { attributes: [] },
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
        ],
      },
    ],
  });
  await Promise.all(purchaseOrders.map((order) => syncCacaoPurchaseOrderDataToOCC(order.id)));
  process.exit(1);
}

syncCacaoPurchaseOrderToOCC();
