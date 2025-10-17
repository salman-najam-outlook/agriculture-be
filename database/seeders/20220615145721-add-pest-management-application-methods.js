'use strict';

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
    queryInterface.bulkInsert('options', [
      { groupName: "pest-application-methods", name: "Hydraulic nozzles/sprayers" },
      { groupName: "pest-application-methods", name: "Electrostatically charged sprayers" },
      { groupName: "pest-application-methods", name: "Aerial spraying" },
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
