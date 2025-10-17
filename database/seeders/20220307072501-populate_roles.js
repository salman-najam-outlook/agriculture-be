'use strict';
const moment = require("moment");
const { roles } = require("../../helpers/consts");

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
     const rolesData = [];
     roles.forEach((item) =>
       rolesData.push({
         id: item.id,
         name: item.name,
         createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
         updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
       })
     );
     await queryInterface.bulkInsert("roles", rolesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("roles", null, {
      truncate: true,
      cascade: false,
    });
  }
};
