'use strict';
const userRoleIds = ['farmer', 'coffee_farmer',];
const organizationCodes = ["dimitra", "dimitra_internal", "internal", "mi-cacao"];




/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {


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
              userRoleMembershipModulePermissions.push({
                id: `${userRoleId}_${userMembership.id}_forest_report_${permission.id}`,
                user_role_id: userRoleId,
                module_id: 'forest_report',
                membership_plan_id: userMembership.id,
                permission_id: permission.id,
                permitted: false,
                isdeleted: null,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            }
          }
        }
        for (let i = 0; i < userRoleMembershipModulePermissions.length; i++) {
          const element = userRoleMembershipModulePermissions[i];
          const userMemberships = await queryInterface.select(null, 'user_role_membership_module_permission', {
            where: { id: element.id },
            transaction,
            plain: true
          });
          if (!userMemberships) {
            await queryInterface.insert(null, 'user_role_membership_module_permission', element, {
              transaction,
            });
          }
        }

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
        const userRoleMembershipModulePermissionIds = [];
        for (const userMembership of userMemberships) {
          for (const permission of permissions) {
            for (const userRoleId of userRoleIds) {
              userRoleMembershipModulePermissionIds.push(`${userRoleId}_${userMembership.id}_forest_report_${permission.id}`);
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
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },
};
