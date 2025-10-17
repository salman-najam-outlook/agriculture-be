'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const roles = ['super_admin'];
      const permissions = ["put", "get", "post", "delete"];
      const userRolePermissions = [];

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
          { transaction,
            updateOnDuplicate: ["role_id", "updatedAt"],
          }
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
          { transaction,
            updateOnDuplicate: ["name", "parent_module_id", "isDeleted", "updatedAt"],
           }
        );
      }

      for (const role of roles) {
        for (const permission of permissions) {
          userRolePermissions.push({
            id: `${role}_user_management_enterprises_${permission}`,
            role_id: role,
            module_id: 'super_admin_enterprises',
            permission_id: permission,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }

      await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRolePermissions, {
        transaction,
        updateOnDuplicate: ["permitted", "updatedAt"],
      });

      // Insert 'Enterprises' menu under 'user_management' parent menu
      const [parentMenu] = await queryInterface.sequelize.query(
        `SELECT id FROM sidebar_menu WHERE id = 'user_management'`,
        { type: Sequelize.QueryTypes.SELECT, transaction }
      );

      if (parentMenu) {
        const [existingMenu] = await queryInterface.sequelize.query(
          `SELECT id FROM sidebar_menu WHERE id = 'enterprises' AND parent_menu_id = 'user_management' AND organization = :organization`,
          {
            type: Sequelize.QueryTypes.SELECT,
            replacements: { organization: user.organization },
            transaction
          }
        );
  
        if (existingMenu.length > 0) {
          // Update existing menu
          await queryInterface.bulkUpdate(
            "sidebar_menu",
            {
              name: 'Enterprises',
              route_path_name: 'Enterprises',
              icon: '/icons/enterprises.png',
              active: 1,
              order: 1,
              updatedAt: new Date(),
            },
            {
              id: 'enterprises',
              parent_menu_id: 'user_management',
              organization: user.organization,
            },
            { transaction }
          );
        } else {
          // Insert new menu
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
                organization: user.organization,
                order: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            {
              transaction,
            }
          );
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
     },
};