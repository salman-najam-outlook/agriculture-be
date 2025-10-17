"use strict";

const { or } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const menuItems = [
      {
        active: 1,
        icon: "/icons/bar.png",
        id: "crops_trace_overview",
        name: "Crops Overview",
        order: 1,
        route: "CropsTraceOverview",
        subMenus: [
          {
            icon: "/icons/log.png",
            id: "traceability",
            label: "traceability",
            name: "Traceability",
            order: 1,
            parent_menu_id: "crops_trace_overview",
            route: "CropsTraceOverviewTraceability",
          },
        ],
      },
    ];

    let sql = `
      SELECT o.id as orgId, r.id as adminRole 
      FROM organization o 
      JOIN roles r ON o.id = r.organization 
      WHERE o.name IN ('Dimitra Internal', 'Dimitra', 'Solok') 
      GROUP BY o.id, r.id;
    `;

    let parentMenuEntries = [];
    let childMenuEntries = [];
    try {
      const orgRoleList = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
      });

      const orgIDs = [...new Set(orgRoleList.map((orgRole) => orgRole.orgId))];
      orgIDs.forEach((orgId) => {
        parentMenuEntries.push(...createParentMenuEntries(menuItems, orgId));

        // Create child menu entries for each orgId
        menuItems.forEach((menu) => {
          if (menu.subMenus && menu.subMenus.length > 0) {
            childMenuEntries.push(...createChildMenuEntries(menu, orgId));
          }
        });
      });
      try {
        await queryInterface.bulkInsert("sidebar_menu", parentMenuEntries, {
          transaction,
          updateOnDuplicate: ["id", "organization"],
        });
        await queryInterface.bulkInsert("sidebar_menu", childMenuEntries, {
          transaction,
          updateOnDuplicate: ["id", "organization"],
        });
      } catch (error) {
        throw error;
      }
      for (const data of orgRoleList) {
        let { orgId, adminRole } = data;
        adminRole = adminRole.split(" ").join("_").toLowerCase();

        // Prepare entries
        const parentModuleEntries = createParentModuleEntries(
          menuItems,
          adminRole
        );
        const parentPermissions = createParentPermissions(menuItems, adminRole);

        // Insert parent modules and check if insertion was successful
        const insertedParentModules = await checkAndInsertModules(
          queryInterface,
          transaction,
          parentModuleEntries,
          Sequelize
        );

        if (insertedParentModules.length === 0) {
        
          continue;
        }

        try {
          await queryInterface.bulkInsert(
            "admin_users_roles_modules_permissions",
            parentPermissions,
            {
              transaction,
              updateOnDuplicate: ["id", "role_id"],
            }
          );
        } catch (error) {
          throw error;
        }

        // Insert child modules, menus, and permissions
        for (const menu of menuItems) {
          if (menu.subMenus && menu.subMenus.length > 0) {
            // const childMenuEntries = createChildMenuEntries(menu, orgId);
            const childModuleEntries = createChildModuleEntries(
              menu,
              adminRole
            );
            const childPermissions = createChildPermissions(menu, adminRole);

            // Insert child modules and check if insertion was successful
            const insertedChildModules = await checkAndInsertModules(
              queryInterface,
              transaction,
              childModuleEntries,
              Sequelize
            );
            if (insertedChildModules.length === 0) {
              continue;
            }
            try {
              await queryInterface.bulkInsert(
                "admin_users_roles_modules_permissions",
                childPermissions,
                {
                  transaction,
                  updateOnDuplicate: ["id", "role_id"],
                }
              );
            } catch (error) {
              throw error;
            }
          }
        }
      }

      await transaction.commit();
    } catch (err) {
      console.error("Error in transaction", err);
      await transaction.rollback();
    }
  },
};

// Helper function to create parent menu entries
function createParentMenuEntries(menuItems, orgId) {
  return menuItems.map((menu) => ({
    id: menu.id,
    name: menu.name,
    parent_menu_id: null,
    route_path_name: menu.route,
    icon: menu.icon,
    active: menu.active,
    order: menu.order,
    organization: orgId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
}

// Helper function to create parent module entries
function createParentModuleEntries(menuItems, adminRole) {
  return menuItems.map((menu) => ({
    id: `${adminRole}_${menu.id}`,
    name: menu.name,
    parent_module_id: adminRole,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
}

// Helper function to create parent permissions
function createParentPermissions(menuItems, adminRole) {
  const methodsArray = ["put", "get", "post", "delete"];
  const permissions = [];

  menuItems.forEach((menu) => {
    methodsArray.forEach((method) => {
      permissions.push({
        id: `${adminRole}_${menu.id}_${method}`,
        role_id: adminRole,
        module_id: `${adminRole}_${menu.id}`,
        permission_id: method,
        permitted: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  });

  return permissions;
}

// Helper function to create child menu entries
function createChildMenuEntries(menu, orgId) {
  return menu.subMenus.map((subMenu) => ({
    id: `${menu.id}_${subMenu.id}`,
    name: subMenu.name,
    parent_menu_id: menu.id,
    route_path_name: subMenu.route,
    icon: subMenu.icon,
    active: 1,
    order: subMenu.order,
    organization: orgId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
}

// Helper function to create child module entries
function createChildModuleEntries(menu, adminRole) {
  return menu.subMenus.map((subMenu) => ({
    id: `${adminRole}_${menu.id}_${subMenu.id}`,
    name: subMenu.name,
    parent_module_id: `${adminRole}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
}

// Helper function to create child permissions
function createChildPermissions(menu, adminRole) {
  const methodsArray = ["put", "get", "post", "delete"];
  const permissions = [];

  menu.subMenus.forEach((subMenu) => {
    methodsArray.forEach((method) => {
      permissions.push({
        id: `${adminRole}_${menu.id}_${subMenu.id}_${method}`,
        role_id: adminRole,
        module_id: `${adminRole}_${menu.id}_${subMenu.id}`,
        permission_id: method,
        permitted: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  });

  return permissions;
}

// Unified function to check and insert modules
async function checkAndInsertModules(
  queryInterface,
  transaction,
  moduleEntries,
  Sequelize
) {
  const insertedModules = [];

  for (const module of moduleEntries) {
    try {
      // If there is a parent_module_id, check if the parent module exists
      if (module.parent_module_id) {
        const existingModule = await queryInterface.sequelize.query(
          `SELECT id FROM parent_modules WHERE id = :parent_module_id`,
          {
            replacements: { parent_module_id: module.parent_module_id },
            type: Sequelize.QueryTypes.SELECT,
          }
        );

        if (existingModule.length === 0) {
          continue; // Skip insertion if parent is not found
        }
      }

      // Insert module into the table
      await queryInterface.bulkInsert("modules", [module], {
        transaction,
        updateOnDuplicate: ["id", "parent_module_id"],
      });

      insertedModules.push(module);
    } catch (error) {
      console.error(`Error inserting module ${module.id}`, error);
      throw error;
    }
  }

  return insertedModules;
}
