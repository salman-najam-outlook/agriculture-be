'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    //  */
    await queryInterface.removeColumn("traceability_informations", "coffeeLandArea")
    await queryInterface.removeColumn("traceability_informations", "annualProduction")
    await queryInterface.removeColumn("traceability_informations", "farmAndZone")
    // await queryInterface.removeConstraint("traceability_informations", "traceability_informations_ibfk_2")
    // await queryInterface.removeColumn("traceability_informations", "farm_id")
    await queryInterface.renameColumn("traceability_informations", "farmer_history", "plantation_history")
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
