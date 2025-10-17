'use strict';
const moment = require("moment");
const {  admin_modules } = require("../../helpers/consts");

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
     let sidebarModulesData = []

     for(let key in admin_modules) {
         for(let key1 in admin_modules[key]) {
             admin_modules[key][key1].forEach(el => {
                 let parentModule = `${key.split(' ').join('_').toLocaleLowerCase()}`
                 let module = `${key1.split(' ').join('_').toLocaleLowerCase()}`
                 sidebarModulesData.push({
                     id: `${parentModule}_${module}_${el}`,
                     sidebar_menu_id: `${parentModule}_${module}`,
                     module_id: `${parentModule}_${el}`,
                     createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                     updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                 })
             })
         }
     }
     await queryInterface.bulkInsert("map_sidebar_modules", sidebarModulesData, {});
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
