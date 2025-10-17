'use strict';
const moment = require("moment");
const {  admin_modules, permissions } = require("../../helpers/consts");

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
     let adminRolesModilesPermissionsData = []
      let adminModulesData = [];
      const adminModulesObj = {};
          for(let key in admin_modules) {
              adminModulesData= []
              for(let key1 in admin_modules[key]) {
              
                  admin_modules[key][key1].forEach(element => {
                      adminModulesData.push(`${key.split(' ').join('_').toLocaleLowerCase()}_${element}`,)
                  });


              }
              adminModulesObj[key.split(' ').join('_').toLocaleLowerCase()] = adminModulesData
          }



          for(let key in adminModulesObj) {
              adminModulesObj[key].forEach(adminModule => {
                  permissions.forEach(permission => {
                      adminRolesModilesPermissionsData.push({
                          id: `${adminModule}_${permission}`,
                          role_id: key,
                          module_id: adminModule,
                          permission_id: permission,
                          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                      })
                  })
              
              })
          }

     await queryInterface.bulkInsert("roles_modules_permissions", adminRolesModilesPermissionsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
