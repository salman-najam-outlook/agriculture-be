'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Get all organizations that have coffee_overview menu (or crops_overview for backward compatibility)
      const organizations = await queryInterface.sequelize.query(`
        SELECT DISTINCT o.*
        FROM organization o
        JOIN sidebar_menu sm ON sm.organization = o.id
        WHERE sm.id IN ('coffee_overview', 'crops_overview')
      `, { type: Sequelize.QueryTypes.SELECT });

      for (const org of organizations) {
        const organization = org.id;
        
        // Determine the correct parent menu ID (coffee_overview or crops_overview)
        const parentMenu = await queryInterface.sequelize.query(`
          SELECT id FROM sidebar_menu 
          WHERE id IN ('coffee_overview', 'crops_overview') AND organization = ${organization}
          LIMIT 1
        `, { type: Sequelize.QueryTypes.SELECT });
        
        if (parentMenu.length === 0) {
          continue; // Skip if no parent menu found
        }
        
        const parentMenuId = parentMenu[0].id;
        
        // Check if buying_station_coffee already exists
        const existingBuyingStation = await queryInterface.sequelize.query(`
          SELECT * FROM sidebar_menu 
          WHERE id = 'buying_station_coffee' AND organization = ${organization}
        `, { type: Sequelize.QueryTypes.SELECT });

        if (existingBuyingStation.length === 0) {
          
          // Create new buying station menu item under coffee_overview/crops_overview
          // Default name is "Buying Station" - conditional naming (Societies for NACCU) handled in API response
          const newBuyingStationMenu = {
            id: 'buying_station_coffee',
            name: 'Buying Station',
            parent_menu_id: parentMenuId,
            route_path_name: 'CoffeeBuyingStation',
            icon: '/icons/users.png',
            order: 4, // This will be after reports (order 3) and before green_beans (order 5)
            organization: organization,
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          };

          // Insert the new menu item
          await queryInterface.bulkInsert('sidebar_menu', [newBuyingStationMenu], {
            updateOnDuplicate: ['id'],
            transaction
          });
        } else {
          // Update the order to ensure it's positioned correctly
          await queryInterface.sequelize.query(`
            UPDATE sidebar_menu 
            SET \`order\` = 4, 
                name = 'Buying Station',
                route_path_name = 'CoffeeBuyingStation',
                icon = '/icons/users.png',
                active = 1,
                updatedAt = NOW()
            WHERE id = 'buying_station_coffee' AND organization = ${organization}
          `, { transaction });
        }

        // Update green_beans order to 5 to maintain proper sequence
        await queryInterface.sequelize.query(`
          UPDATE sidebar_menu 
          SET \`order\` = 5 
          WHERE id = 'green_beans' AND organization = ${organization}
        `, { transaction });

        // Get all admin parent modules for this organization
        const adminParentModules = await queryInterface.sequelize.query(`
          SELECT pm.* FROM parent_modules pm
          JOIN roles r ON pm.id = r.id
          WHERE r.organization = ${organization}
          AND (
            r.role_type = 'admin' 
            OR pm.id LIKE '%admin%' 
            OR pm.name LIKE '%admin%'
          )
        `, { type: Sequelize.QueryTypes.SELECT, transaction });

        const parentModuleIds = adminParentModules.map(module => module.id);
        const permissions = ["get", "post", "put", "delete"];

        // Create modules, admin_sidebar_menu, map_sidebar_modules, and permissions
        const modules = [];
        const adminSidebarMenu = [];
        const mapSidebarModules = [];
        const adminUserRolesModules = [];

        parentModuleIds.forEach(parentModuleId => {
          // Create module
          modules.push({
            id: `${parentModuleId}_buying_station_coffee`,
            name: 'Buying Station',
            parent_module_id: parentModuleId,
            id_name: `${parentModuleId}_buying_station_coffee`,
            createdAt: new Date(),
            updatedAt: new Date()
          });

          // Create admin sidebar menu
          adminSidebarMenu.push({
            id: `${parentModuleId}_buying_station_coffee`,
            role_id: parentModuleId,
            sidebar_menu_id: 'buying_station_coffee',
            sidebar_menu_name: 'Buying Station',
            active: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          });

          // Create map sidebar modules
          mapSidebarModules.push({
            id: `${parentModuleId}_buying_station_coffee`,
            sidebar_menu_id: `${parentModuleId}_buying_station_coffee`,
            module_id: `${parentModuleId}_buying_station_coffee`,
            createdAt: new Date(),
            updatedAt: new Date()
          });

          // Create permissions
          permissions.forEach(permission => {
            adminUserRolesModules.push({
              id: `${parentModuleId}_buying_station_coffee_${permission}`,
              role_id: parentModuleId,
              module_id: `${parentModuleId}_buying_station_coffee`,
              permission_id: permission,
              permitted: 1,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          });
        });

        // Insert all the new records with updateOnDuplicate to handle existing records
        if (modules.length > 0) {
          await queryInterface.bulkInsert('modules', modules, {
            updateOnDuplicate: ['id', 'name', 'parent_module_id', 'id_name', 'updatedAt'],
            transaction
          });
        }

        if (adminSidebarMenu.length > 0) {
          await queryInterface.bulkInsert('admin_sidebar_menu', adminSidebarMenu, {
            updateOnDuplicate: ['id', 'role_id', 'sidebar_menu_id', 'sidebar_menu_name', 'active', 'updatedAt'],
            transaction
          });
        }

        if (mapSidebarModules.length > 0) {
          await queryInterface.bulkInsert('map_sidebar_modules', mapSidebarModules, {
            updateOnDuplicate: ['id', 'sidebar_menu_id', 'module_id', 'updatedAt'],
            transaction
          });
        }

        if (adminUserRolesModules.length > 0) {
          await queryInterface.bulkInsert('admin_users_roles_modules_permissions', adminUserRolesModules, {
            updateOnDuplicate: ['id', 'role_id', 'module_id', 'permission_id', 'permitted', 'updatedAt'],
            transaction
          });
        }
      }

      await transaction.commit();
      console.log('Successfully added buying station to coffee overview submenu');
      
    } catch (err) {
      await transaction.rollback();
      console.error('Error adding buying station to coffee overview:', err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Get all organizations that have the new buying_station_coffee menu
      const organizations = await queryInterface.sequelize.query(`
        SELECT DISTINCT organization FROM sidebar_menu WHERE id = 'buying_station_coffee'
      `, { type: Sequelize.QueryTypes.SELECT });

      for (const org of organizations) {
        const organization = org.organization;
        
        // Get all admin parent modules for this organization
        const adminParentModules = await queryInterface.sequelize.query(`
          SELECT pm.* FROM parent_modules pm
          JOIN roles r ON pm.id = r.id
          WHERE r.organization = ${organization}
          AND (
            r.role_type = 'admin' 
            OR pm.id LIKE '%admin%' 
            OR pm.name LIKE '%admin%'
          )
        `, { type: Sequelize.QueryTypes.SELECT, transaction });

        const parentModuleIds = adminParentModules.map(module => module.id);

        // Remove all related records
        for (const parentModuleId of parentModuleIds) {
          // Remove permissions
          await queryInterface.sequelize.query(`
            DELETE FROM admin_users_roles_modules_permissions 
            WHERE module_id LIKE '${parentModuleId}_buying_station_coffee%'
          `, { transaction });

          // Remove map sidebar modules
          await queryInterface.sequelize.query(`
            DELETE FROM map_sidebar_modules 
            WHERE id = '${parentModuleId}_buying_station_coffee'
          `, { transaction });

          // Remove admin sidebar menu
          await queryInterface.sequelize.query(`
            DELETE FROM admin_sidebar_menu 
            WHERE id = '${parentModuleId}_buying_station_coffee'
          `, { transaction });

          // Remove modules
          await queryInterface.sequelize.query(`
            DELETE FROM modules 
            WHERE id = '${parentModuleId}_buying_station_coffee'
          `, { transaction });
        }

        // Remove the sidebar menu item
        await queryInterface.sequelize.query(`
          DELETE FROM sidebar_menu 
          WHERE id = 'buying_station_coffee' 
          AND organization = ${organization}
        `, { transaction });

        // Reset green_beans order back to original (if it was changed)
        await queryInterface.sequelize.query(`
          UPDATE sidebar_menu 
          SET \`order\` = 5 
          WHERE id = 'green_beans' AND organization = ${organization}
        `, { transaction });
      }

      await transaction.commit();
      console.log('Successfully removed buying station from coffee overview submenu');
      
    } catch (err) {
      await transaction.rollback();
      console.error('Error removing buying station from coffee overview:', err);
      throw err;
    }
  }
};
