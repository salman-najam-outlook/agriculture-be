'use strict';
const moment = require("moment");
const { syntheticFertilizers } = require("../../helpers/consts");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const syntheticFertilizersData = [];
     syntheticFertilizers.forEach((item) =>
     syntheticFertilizersData.push({
         name: item,
         createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
         updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
       })
     );
     await queryInterface.bulkInsert("synthetic_fertilizers", syntheticFertilizersData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
