'use strict';
const moment = require("moment");
const { modules } = require("../../helpers/consts");
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
     const parentModulesData = [];
     for(let key in modules) {
      
               parentModulesData.push({
                   id: key.split(' ').join('_').toLocaleLowerCase(),
                   name: key,
                   createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                   updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
               })
      
     }
      await queryInterface.bulkInsert("parent_modules", parentModulesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("parent_modules", null, {
      truncate: true,
      cascade: false,
    });
  }
};
