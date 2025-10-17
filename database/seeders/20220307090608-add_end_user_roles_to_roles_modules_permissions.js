'use strict';
const moment = require("moment");
const { modules, permissions } = require("../../helpers/consts");

const roles = ["end_user"]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const rolesModilesPermissionsData = [];
     roles.forEach((role) =>
      modules.forEach((module) => {
        permissions.forEach((permission) => {
          rolesModilesPermissionsData.push({
            id: `${role}_${module}_${permission}`,
            role_id: role,
            module_id: module,
            permission_id: permission,
            createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          })
        })
      })
     
     );
     await queryInterface.bulkInsert("roles_modules_permissions", rolesModilesPermissionsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("roles_modules_permissions", null, {
      truncate: true,
      cascade: false,
    });
  }
};
