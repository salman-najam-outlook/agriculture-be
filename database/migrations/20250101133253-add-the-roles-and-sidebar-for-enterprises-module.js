"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const roles = ['super_admin'];
      // Assign 'super_admin' role to the user with the email 'internal@dimitra.io'
      const [user] = await queryInterface.sequelize.query(
        `SELECT id,organization FROM users WHERE email = 'internal@admin.io'`,
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

      // Insert 'Enterprises' module under 'super_admin' parent module
      const [parentModule] = await queryInterface.sequelize.query(
        `SELECT id FROM parent_modules WHERE id = 'super_admin'`,
        { type: Sequelize.QueryTypes.SELECT, transaction }
      );

      if (parentModule) {
        await queryInterface.bulkInsert(
          "modules",
          [
            {
              id: 'super_admin_enterprises',
              name: 'Enterprises',
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
            id: `${role}_user_management_enterprises_${permission}`,
            role_id: role,
            module_id: `${role}_enterprises`,
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

      // Insert 'Enterprises' menu under 'user_management' parent menu
      const [parentMenu] = await queryInterface.sequelize.query(
        `SELECT id FROM sidebar_menu WHERE id = 'user_management'`,
        { type: Sequelize.QueryTypes.SELECT, transaction }
      );

      if (parentMenu) {
        await queryInterface.bulkInsert(
          "sidebar_menu",
          [
            {
              id: 'enterprises',
              name: 'Enterprises',
              parent_menu_id: 'user_management',
              route_path_name: 'Enterprises',
              icon: '/icons/enterprises.png',
              active: 1,
              organization:user.organization,
              order: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
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

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Remove 'solok_admin' role from the user with the email 'internal@dimitra.io'
      const [user] = await queryInterface.sequelize.query(
        `SELECT id FROM users WHERE email = 'internal@dimitra.io'`,
        { type: Sequelize.QueryTypes.SELECT, transaction }
      );

      if (user) {
        const roleId = 'solok_admin';
        const adminUserRoleId = `${user.id}_${roleId}`;
        await queryInterface.bulkDelete(
          "admin_user_roles",
          {
            id: adminUserRoleId,
          },
          { transaction }
        );
      }

      // Remove 'Enterprises' menu from 'user_management' parent menu
      await queryInterface.bulkDelete(
        "sidebar_menu",
        { id: 'enterprises' },
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