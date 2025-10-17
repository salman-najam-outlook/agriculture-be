'use strict';
const userRoleIds = ['farmer'];
const organizationCodes = ['dimitra'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      let modules = [
        "purchase_confirmations",
        "batch_mgmt",
        "final_product",
        "production_chart",
      ]
      await queryInterface.insert(
        null,
        'parent_modules',
        {
          id: 'processing_station',
          name: 'Processing Station',
          module_type: 'app_user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );
      await queryInterface.bulkInsert(
        'modules',
        [{
          id: 'purchase_confirmations',
          name: 'Purchase Confirmations',
          parent_module_id: 'processing_station',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'batch_mgmt',
          name: 'Batch Management',
          parent_module_id: 'processing_station',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'final_product',
          name: 'Final Product',
          parent_module_id: 'processing_station',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'production_chart',
          name: 'Production Chart',
          parent_module_id: 'processing_station',
          createdAt: new Date(),
          updatedAt: new Date(),
        },],
        { transaction }
      );

      const userRoleModules = []

      modules.forEach(mod => {
        userRoleIds.forEach((userRoleId) => (
          userRoleModules.push({
            id: `${userRoleId}_${mod}`,
            user_role_id: userRoleId,
            module_id: mod,
            createdAt: new Date(),
            updatedAt: new Date(),
          })));
      })

      await queryInterface.bulkInsert('user_role_modules', userRoleModules, { transaction });

      const organizations = await queryInterface.select(null, 'organization', {
        where: { code: { [Sequelize.Op.in]: organizationCodes } },
        transaction,
      });
      const organizationIds = organizations.map((organization) => organization.id);
      const userMemberships = await queryInterface.select(null, 'user_membership', {
        where: { org_id: { [Sequelize.Op.in]: organizationIds } },
        transaction,
      });
      const permissions = await queryInterface.select(null, 'permissions', { transaction });
      if (permissions && permissions.length > 0 && userMemberships && userMemberships.length > 0) {
        const userRoleMembershipModulePermissions = [];
        for (const userMembership of userMemberships) {
          for (const permission of permissions) {
            for (const userRoleId of userRoleIds) {
              for (const moduleId of modules) {
                userRoleMembershipModulePermissions.push({
                  id: `${userRoleId}_${userMembership.id}_${moduleId}_${permission.id}`,
                  user_role_id: userRoleId,
                  module_id: moduleId,
                  membership_plan_id: userMembership.id,
                  permission_id: permission.id,
                  permitted: 1,
                  isdeleted: null,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                });
              }

            }
          }
        }
        await queryInterface.bulkInsert('user_role_membership_module_permission', userRoleMembershipModulePermissions, {
          transaction,
        });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {

  },
};
