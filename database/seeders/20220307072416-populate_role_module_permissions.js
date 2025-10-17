'use strict';
const moment = require("moment");
const { roles, modules, permissions } = require("../../helpers/consts");

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
     const modulesArr = [];
     for(let key in modules) {
       for(let key1 in modules[key]) {
           modules[key][key1].forEach(element => {
 
               modulesArr.push(element)
           });
       }
     }
     const rolesModilesPermissionsData = [];
     roles.forEach((role) =>
     modulesArr.forEach((module) => {
        permissions.forEach((permission) => {
          rolesModilesPermissionsData.push({
            id: `${role.id}_${module}_${permission}`,
            role_id: role.id,
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
