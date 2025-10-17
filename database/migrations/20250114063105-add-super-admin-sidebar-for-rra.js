'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const roles = ['super_admin'];
      // Assign 'super_admin' role to the user with the email 'superadministrator@dimitra.io'
      const [user] = await queryInterface.sequelize.query(
        `SELECT id, organization FROM users WHERE email = 'superadministrator@dimitra.io'`,
        { type: Sequelize.QueryTypes.SELECT, transaction }
      );

      if (user) {
        const roleId = 'super_admin';
        const adminUserRoleId = `${user.id}_${roleId}`;
        await queryInterface.bulkInsert(
          "admin_user_roles",
          [
            {
              id: adminUserRoleId,
              user_id: user.id,
              role_id: roleId,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          { transaction }
        );
      }

      // Insert 'Regional Risk Assessment' module under 'super_admin' parent module
      const [parentModule] = await queryInterface.sequelize.query(
        `SELECT id FROM parent_modules WHERE id = 'super_admin'`,
        { type: Sequelize.QueryTypes.SELECT, transaction }
      );

      if (parentModule) {
        await queryInterface.bulkInsert(
          "modules",
          [
            {
              id: 'super_admin_dds_regional_risk_assessment',
              name: 'Regional Risk Assessment',
              parent_module_id: 'super_admin',
              isDeleted: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          { transaction }
        );
      }

      const permissions = ["put", "get", "post", "delete"];
      const userRolePermissions = [];
      for (const role of roles) {
        for (const permission of permissions) {
          userRolePermissions.push({
            id: `${role}_dds_regional_risk_assessment_${permission}`,
            role_id: role,
            module_id: `${role}_dds_regional_risk_assessment`,
            permission_id: permission,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
      await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRolePermissions,  {
        transaction,
        updateOnDuplicate: ["id", "role_id"],
      });

      // Insert 'Regional Risk Assessment' menu under 'eudr_due_deligence' parent menu
      const [parentMenu] = await queryInterface.sequelize.query(
        `SELECT id FROM sidebar_menu WHERE id = 'eudr_due_deligence'`,
        { type: Sequelize.QueryTypes.SELECT, transaction }
      );

      if (parentMenu) {
        await queryInterface.bulkInsert(
          "sidebar_menu",
          [
            {
              id: 'dds_regional_risk_assessment',
              name: 'Regional Risk Assessment',
              parent_menu_id: 'eudr_due_deligence',
              route_path_name: 'regionalRiskAssessment',
              icon: '/icons/regional_risk_assessment.png',
              active: 1,
              organization: user.organization,
              order: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          { 
            transaction,
            updateOnDuplicate: ["id", "parent_menu_id","organization"],
           }
        );
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
      // Remove 'super_admin' role from the user with the email 'superadministrator@dimitra.io'
      const [user] = await queryInterface.sequelize.query(
        `SELECT id FROM users WHERE email = 'superadministrator@dimitra.io'`,
        { type: Sequelize.QueryTypes.SELECT, transaction }
      );

      if (user) {
        const roleId = 'super_admin';
        const adminUserRoleId = `${user.id}_${roleId}`;
        await queryInterface.bulkDelete(
          "admin_user_roles",
          {
            id: adminUserRoleId,
          },
          { transaction }
        );
      }

      // Remove 'Regional Risk Assessment' menu from 'user_management' parent menu
      await queryInterface.bulkDelete(
        "sidebar_menu",
        { id: 'dds_regional_risk_assessment' },
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