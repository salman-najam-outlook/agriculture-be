"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const sidebarMenu = [
      {
        id: "green_beans",
        name: "Green beans",
        parent_menu_id: "crops_overview",
        route_path_name: "Green beans",
        icon: "/icons/users.png",
        order: 5,
      },
    ];

    const permissions = ["get", "post", "put", "delete"];

    let sidebarMenus = [];

    const organizations = await queryInterface.sequelize.query(`
      SELECT DISTINCT o.*
      FROM organization o
      JOIN sidebar_menu sm ON sm.organization = o.id
      WHERE sm.id = 'crops_overview'
    `, { type: Sequelize.QueryTypes.SELECT });

    // Extract organization IDs from the result
    const organizationIds = organizations.map(org => org.id);

    const adminRoles = await queryInterface.select(null, "roles", {
      where: {
        organization: { [Sequelize.Op.in]: organizationIds },
        role_type: "admin",
      },
    });
    const roles = adminRoles.map((role) => role.id);

    organizationIds.forEach((orgId) => {
      sidebarMenu.forEach((menuItem) => {
        sidebarMenus.push({
          ...menuItem,
          organization: orgId,
        });
      });
    });

    const adminUserRolesModules = [];
    const modules = [];
    const adminSidebarMenu = [];
    const mapSidebarModules = [];

    roles.map((role) => {
      sidebarMenus.forEach((item) => {
        modules.push({
          id: role + "_" + item.id,
          name: item.name,
          parent_module_id: role,
          id_name: role + "_" + item.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        adminSidebarMenu.push({
          id: role + "_" + item.id,
          role_id: role,
          sidebar_menu_id: item.id,
          sidebar_menu_name: item.name,
          active: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        mapSidebarModules.push({
          id: role + "_" + item.id,
          sidebar_menu_id: role + "_" + item.id,
          module_id: role + "_" + item.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        permissions.forEach((permission) => {
          adminUserRolesModules.push({
            id: role + "_" + item.id + "_" + permission,
            role_id: role,
            module_id: role + "_" + item.id,
            permission_id: permission,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });
    });

    await queryInterface.bulkInsert("modules", modules, {
      updateOnDuplicate: ["id"],
    });
    await queryInterface.bulkInsert("sidebar_menu", sidebarMenus, {
      updateOnDuplicate: ["id"],
    });
    await queryInterface.bulkInsert("admin_sidebar_menu", adminSidebarMenu, {
      updateOnDuplicate: ["id"],
    });
    await queryInterface.bulkInsert("map_sidebar_modules", mapSidebarModules, {
      updateOnDuplicate: ["id"],
    });
    await queryInterface.bulkInsert(
      "admin_users_roles_modules_permissions",
      adminUserRolesModules,
      {
        updateOnDuplicate: ["id"],
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
