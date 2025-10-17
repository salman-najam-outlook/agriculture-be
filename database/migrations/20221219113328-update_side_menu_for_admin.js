"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // const sidebarMenu = [
    //   {
    //     id: "member_data",
    //     name: "Member Data",
    //     parent_menu_id: null,
    //     route_path_name: "MemberData",
    //     icon: "/icons/member-data.png",
    //     order: 11,
    //     organization: 1,
    //   },
    //   {
    //     id: "farmers",
    //     name: "Farmers",
    //     parent_menu_id: "member_data",
    //     route_path_name: "Farmers",
    //     icon: null,
    //     order: 1,
    //     organization: 1,
    //   },
    //   {
    //     id: "buying_station",
    //     name: "Buying Station",
    //     parent_menu_id: "member_data",
    //     route_path_name: "BuyingStation",
    //     icon: null,
    //     order: 2,
    //     organization: 1,
    //   },
    //   {
    //     id: "processors",
    //     name: "Processors",
    //     parent_menu_id: "member_data",
    //     route_path_name: "Processors",
    //     icon: null,
    //     order: 3,
    //     organization: 1,
    //   },
    //   {
    //     id: "change_log",
    //     name: "Change Log",
    //     parent_menu_id: "member_data",
    //     route_path_name: "ChangeLog",
    //     icon: null,
    //     order: 4,
    //     organization: 1,
    //   },
    // ];

    // const roles = ["admin"];
    // const permissions = ["get", "post", "put", "delete"];

    // const adminUserRolesModules = [];
    // const modules = [];
    // const adminSidebarMenu = [];
    // const mapSidebarModules = [];

    // roles.map((role) => {
    //   sidebarMenu.forEach((item) => {
    //     modules.push({
    //       id: role + "_" + item.id,
    //       name: item.name,
    //       parent_module_id: role,
    //       id_name: role + "_" + item.id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     });
    //     adminSidebarMenu.push({
    //       id: role + "_" + item.id,
    //       role_id: role,
    //       sidebar_menu_id: item.id,
    //       sidebar_menu_name: item.name,
    //       active: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     });
    //     mapSidebarModules.push({
    //       id: role + "_" + item.id,
    //       sidebar_menu_id: role + "_" + item.id,
    //       module_id: role + "_" + item.id,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     });
    //     permissions.forEach((permission) => {
    //       adminUserRolesModules.push({
    //         id: role + "_" + item.id + "_" + permission,
    //         role_id: role,
    //         module_id: role + "_" + item.id,
    //         permission_id: permission,
    //         permitted: 1,
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //       });
    //     });
    //   });
    // });

    // await queryInterface.bulkInsert("modules", modules);
    // await queryInterface.bulkInsert("admin_sidebar_menu", adminSidebarMenu);
    // await queryInterface.bulkInsert("map_sidebar_modules", mapSidebarModules);
    // await queryInterface.bulkInsert(
    //   "admin_users_roles_modules_permissions",
    //   adminUserRolesModules
    // );
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
