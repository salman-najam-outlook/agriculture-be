'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('dry_milling_inbound_warehouse', 'parchmentId', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: "userId"
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'dry_milling_inbound_warehouse',
      'parchmentId'
    );
  }
};
