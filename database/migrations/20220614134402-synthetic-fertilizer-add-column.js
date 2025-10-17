'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     queryInterface.addColumn('synthetic_fertilizers', 'requestId', {
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
