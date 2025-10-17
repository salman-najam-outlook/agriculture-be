'use strict';
const userRoleIds = ['farmer', 'coffee_farmer'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.insert(
        null,
        'modules',
        {
          id: 'coffee/farmers/purchase-order',
          name: 'Purchase Order',
          parent_module_id: 'coffee',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction }
      );

      const userRoleModules = userRoleIds.map((userRoleId) => ({
        id: `${userRoleId}_purchase_order`,
        user_role_id: userRoleId,
        module_id: 'coffee/farmers/purchase-order',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await queryInterface.bulkInsert('user_role_modules', userRoleModules, { transaction });

      const organizations = await queryInterface.select(null, 'organization', {
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
              userRoleMembershipModulePermissions.push({
                id: `${userRoleId}_${userMembership.id}_purchase_order_${permission.id}`,
                user_role_id: userRoleId,
                module_id: 'coffee/farmers/purchase-order',
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
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const organizations = await queryInterface.select(null, 'organization', {
        transaction,
      });
      const organizationIds = organizations.map((organization) => organization.id);
      const userMemberships = await queryInterface.select(null, 'user_membership', {
        where: { org_id: { [Sequelize.Op.in]: organizationIds } },
        transaction,
      });
      const permissions = await queryInterface.select(null, 'permissions', { transaction });
      if (permissions && permissions.length > 0 && userMemberships && userMemberships.length > 0) {
        const userRoleMembershipModulePermissionIds = [];
        for (const userMembership of userMemberships) {
          for (const permission of permissions) {
            for (const userRoleId of userRoleIds) {
              userRoleMembershipModulePermissionIds.push(`${userRoleId}_${userMembership.id}_purchase_order_${permission.id}`);
            }
          }
        }
        await queryInterface.bulkDelete(
          'user_role_membership_module_permission',
          {
            id: { [Sequelize.Op.in]: userRoleMembershipModulePermissionIds },
          },
          { transaction }
        );
      }

      const userRoleModuleIds = userRoleIds.map((userRoleId) => `${userRoleId}_purchase_order`);
      await queryInterface.bulkDelete(
        'user_role_modules',
        {
          id: { [Sequelize.Op.in]: userRoleModuleIds },
        },
        { transaction }
      );

      await queryInterface.bulkDelete(
        'modules',
        {
          id: 'coffee/farmers/purchase-order',
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },
};
