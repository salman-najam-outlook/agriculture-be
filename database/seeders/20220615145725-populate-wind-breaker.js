'use strict';
const { QueryTypes } = require('sequelize');
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
     let userRes =  await queryInterface.sequelize.query('select * from users', { type: QueryTypes.SELECT })
    queryInterface.bulkInsert('wind_breaker_tree', [
      { name: "coffee", created_by: userRes[0].id },
      { name: "tea", created_by: userRes[0].id },
      { name: "horticulture", created_by: userRes[0].id },

    ]);
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
