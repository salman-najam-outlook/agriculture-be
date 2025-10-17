'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('parchment_coffees', 'status');
    await queryInterface.addColumn('parchment_coffees', 'status', {
      type: Sequelize.ENUM(),
      values: ['Completed', 'Parchment Coffee', 'Quality Control', 'Batch Production', 'Green Beans', 'Cupping'],
      defaultValue: 'Completed',
      after: 'outboundSent'
    });
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
