'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
     queryInterface.addColumn('soil_management_organic_inputs', 'requestIdOrganicInputs', {
      type: Sequelize.STRING,
      default: ''
     })

     queryInterface.addColumn('soil_management_organic_inputs', 'requestStatusOrganicInputs', {
      type: Sequelize.STRING,
      default: ''
     })
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
