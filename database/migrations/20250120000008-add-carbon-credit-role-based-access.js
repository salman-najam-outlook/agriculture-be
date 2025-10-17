'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      console.log('Adding clean carbon credit functionality...');

      // Define roles and their permissions
      const superAdminRole = 'super_admin';
      const adminRoles = ['dds_superadmin', 'esg_client_admin', 'operator_owner', 'solok_admin'];
      const permissions = ["put", "get", "post", "delete"];
      
      // Super admin gets all 3 sub-menus
      const superAdminSidebarItems = [
        'carbon_credit',
        'carbon_credit_projects', 
        'carbon_credit_users',
        'carbon_credit_plot_tree'
      ];

      // Admin roles get only 2 sub-menus (no plot tree mapping)
      const adminSidebarItems = [
        'carbon_credit',
        'carbon_credit_projects', 
        'carbon_credit_users'
      ];

      // Create parent modules for super admin if it doesn't exist
      const existingSuperAdminParent = await queryInterface.sequelize.query(
        `SELECT id FROM parent_modules WHERE id = ?`,
        {
          replacements: [superAdminRole],
          type: Sequelize.QueryTypes.SELECT,
          transaction
        }
      );

      if (existingSuperAdminParent.length === 0) {
        await queryInterface.bulkInsert('parent_modules', [{
          id: superAdminRole,
          name: 'Super Admin',
          module_type: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        }], { transaction });
        console.log('Created parent module for super_admin');
      }

      // Create parent modules for admin roles if they don't exist
      for (const role of adminRoles) {
        const existingParent = await queryInterface.sequelize.query(
          `SELECT id FROM parent_modules WHERE id = ?`,
          {
            replacements: [role],
            type: Sequelize.QueryTypes.SELECT,
            transaction
          }
        );

        if (existingParent.length === 0) {
          await queryInterface.bulkInsert('parent_modules', [{
            id: role,
            name: role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            module_type: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
          }], { transaction });
          console.log(`Created parent module for ${role}`);
        }
      }

      // Create modules for super admin (all 4 items)
      const superAdminModules = [];
      for (const sidebarItem of superAdminSidebarItems) {
        superAdminModules.push({
          id: `${superAdminRole}_${sidebarItem}`,
          name: sidebarItem.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          parent_module_id: superAdminRole,
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      await queryInterface.bulkInsert('modules', superAdminModules, {
        transaction,
        updateOnDuplicate: ["name", "parent_module_id", "updatedAt"],
      });

      // Create modules for admin roles (only 3 items, no plot tree)
      const adminModules = [];
      for (const role of adminRoles) {
        for (const sidebarItem of adminSidebarItems) {
          adminModules.push({
            id: `${role}_${sidebarItem}`,
            name: sidebarItem.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            parent_module_id: role,
            isDeleted: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }

      await queryInterface.bulkInsert('modules', adminModules, {
        transaction,
        updateOnDuplicate: ["name", "parent_module_id", "updatedAt"],
      });

      // Create permissions for super admin
      const superAdminPermissions = [];
      for (const sidebarItem of superAdminSidebarItems) {
        for (const permission of permissions) {
          superAdminPermissions.push({
            id: `${superAdminRole}_${sidebarItem}_${permission}`,
            role_id: superAdminRole,
            module_id: `${superAdminRole}_${sidebarItem}`,
            permission_id: permission,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }

      await queryInterface.bulkInsert('admin_users_roles_modules_permissions', superAdminPermissions, {
        transaction,
        updateOnDuplicate: ["id", "role_id"],
      });

      // Create permissions for admin roles
      const adminPermissions = [];
      for (const role of adminRoles) {
        for (const sidebarItem of adminSidebarItems) {
          for (const permission of permissions) {
            adminPermissions.push({
              id: `${role}_${sidebarItem}_${permission}`,
              role_id: role,
              module_id: `${role}_${sidebarItem}`,
              permission_id: permission,
              permitted: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        }
      }

      await queryInterface.bulkInsert('admin_users_roles_modules_permissions', adminPermissions, {
        transaction,
        updateOnDuplicate: ["id", "role_id"],
      });

      // Check if carbon credit menu already exists for organization 3
      const existingMenu = await queryInterface.sequelize.query(
        `SELECT id FROM sidebar_menu WHERE id = 'carbon_credit' AND organization = 3`,
        {
          type: Sequelize.QueryTypes.SELECT,
          transaction
        }
      );

      if (existingMenu.length === 0) {
        // Add Carbon Credit main menu for organization 3
        await queryInterface.bulkInsert(
          "sidebar_menu",
          [
            {
              id: 'carbon_credit',
              name: 'Carbon Credit',
              parent_menu_id: null,
              route_path_name: 'carbonCredit',
              icon: '/icons/carbon_factory.png',
              active: 1,
              organization: 3,
              order: 14,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          { transaction }
        );
        console.log('Added carbon credit main menu');

        // Add sub-menu items for organization 3
        const subMenus = [
          {
            id: 'carbon_credit_projects',
            name: 'Projects',
            parent_menu_id: 'carbon_credit',
            route_path_name: 'listProjects',
            icon: null,
            order: 1,
            active: 1,
            organization: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'carbon_credit_users',
            name: 'Carbon Credit Users',
            parent_menu_id: 'carbon_credit',
            route_path_name: 'listUsers',
            icon: null,
            order: 2,
            active: 1,
            organization: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'carbon_credit_plot_tree',
            name: 'Plot Tree Mapping',
            parent_menu_id: 'carbon_credit',
            route_path_name: 'treePlotAdd',
            icon: null,
            order: 3,
            active: 1,
            organization: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        await queryInterface.bulkInsert('sidebar_menu', subMenus, {
          transaction,
          updateOnDuplicate: ["id", "parent_menu_id", "organization"],
        });
        console.log('Added carbon credit sub-menus');
      } else {
        console.log('Carbon credit menu already exists for organization 3');
      }

      await transaction.commit();
      console.log('Successfully added clean carbon credit functionality');
      console.log('Super Admin: Projects, Users, Plot Tree Mapping');
      console.log('Admin Roles: Projects, Users (no Plot Tree Mapping)');
    } catch (error) {
      await transaction.rollback();
      console.error('Error adding carbon credit functionality:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      console.log('Removing carbon credit functionality...');

      const superAdminRole = 'super_admin';
      const adminRoles = ['dds_superadmin', 'esg_client_admin', 'operator_owner', 'solok_admin'];
      
      const superAdminSidebarItems = [
        'carbon_credit',
        'carbon_credit_projects', 
        'carbon_credit_users',
        'carbon_credit_plot_tree'
      ];

      const adminSidebarItems = [
        'carbon_credit',
        'carbon_credit_projects', 
        'carbon_credit_users'
      ];

      // Generate all possible module IDs
      const moduleIds = [];
      
      // Super admin modules
      for (const sidebarItem of superAdminSidebarItems) {
        moduleIds.push(`${superAdminRole}_${sidebarItem}`);
      }
      
      // Admin role modules
      for (const role of adminRoles) {
        for (const sidebarItem of adminSidebarItems) {
          moduleIds.push(`${role}_${sidebarItem}`);
        }
      }

      // Remove all permissions that reference these modules
      await queryInterface.sequelize.query(
        `DELETE FROM admin_users_roles_modules_permissions WHERE module_id IN (?)`,
        {
          replacements: [moduleIds],
          type: Sequelize.QueryTypes.DELETE,
          transaction
        }
      );
      console.log('Removed carbon credit permissions');

      // Remove all modules
      await queryInterface.sequelize.query(
        `DELETE FROM modules WHERE id IN (?)`,
        {
          replacements: [moduleIds],
          type: Sequelize.QueryTypes.DELETE,
          transaction
        }
      );
      console.log('Removed carbon credit modules');

      // Remove parent modules only if they don't have other children
      const allRoles = [superAdminRole, ...adminRoles];
      for (const role of allRoles) {
        const hasOtherModules = await queryInterface.sequelize.query(
          `SELECT COUNT(*) as count FROM modules WHERE parent_module_id = ?`,
          {
            replacements: [role],
            type: Sequelize.QueryTypes.SELECT,
            transaction
          }
        );
        
        if (hasOtherModules[0].count === 0) {
          await queryInterface.sequelize.query(
            `DELETE FROM parent_modules WHERE id = ?`,
            {
              replacements: [role],
              type: Sequelize.QueryTypes.DELETE,
              transaction
            }
          );
          console.log(`Removed parent module for ${role}`);
        } else {
          console.log(`Keeping parent module for ${role} (has other modules)`);
        }
      }

      // Remove sidebar menu items for organization 3
      await queryInterface.sequelize.query(
        `DELETE FROM sidebar_menu WHERE id IN (?) AND organization = 3`,
        {
          replacements: [['carbon_credit', 'carbon_credit_projects', 'carbon_credit_users', 'carbon_credit_plot_tree']],
          type: Sequelize.QueryTypes.DELETE,
          transaction
        }
      );
      console.log('Removed carbon credit sidebar menu items');

      await transaction.commit();
      console.log('Successfully removed carbon credit functionality');
    } catch (error) {
      await transaction.rollback();
      console.error('Error removing carbon credit functionality:', error);
      throw error;
    }
  }
};
