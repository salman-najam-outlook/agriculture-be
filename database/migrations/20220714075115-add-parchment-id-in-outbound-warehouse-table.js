'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'dry_milling_outbound_warehouse',
      'parchmentId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        after: 'userId',
      }
    );
    await queryInterface.addColumn(
      'dry_milling_outbound_warehouse',
      'parchmentBarcode',
      {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'parchmentId',
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'dry_milling_outbound_warehouse',
      'parchmentId'
    );
    await queryInterface.removeColumn(
      'dry_milling_outbound_warehouse',
      'parchmentBarcode'
    );
  }
};
