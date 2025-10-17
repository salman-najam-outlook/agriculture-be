'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.bulkInsert('options', [
      { groupName: "pest-application-methods", name: "Hydraulic nozzles/sprayers" },
      { groupName: "pest-application-methods", name: "Electrostatically charged sprayers" },
      { groupName: "pest-application-methods", name: "Aerial spraying" },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
