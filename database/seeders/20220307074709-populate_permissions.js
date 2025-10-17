'use strict';
const moment = require("moment");
const { permissions } = require("../../helpers/consts");

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
     const permissionsData = [];
     permissions.forEach((item) =>
       permissionsData.push({
         id: item,
         name: item,
         createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
         updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
       })
     );
     await queryInterface.bulkInsert("permissions", permissionsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("permissions", null, {
      truncate: true,
      cascade: false,
    });
  }
};
