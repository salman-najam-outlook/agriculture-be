'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     queryInterface.addColumn('organic_inputs', 'requestId', {
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
