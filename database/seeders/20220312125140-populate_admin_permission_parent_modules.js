'use strict';
const moment = require("moment");
const { admin_modules } = require("../../helpers/consts");

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
     const adminParentModulesData = [];
     for(let key in admin_modules) {
      
               adminParentModulesData.push({
                   id: key.split(' ').join('_').toLocaleLowerCase(),
                   name: key,
                   module_type: "admin",
                   createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                   updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
               })
      
     }
      await queryInterface.bulkInsert("parent_modules", adminParentModulesData, {});
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
