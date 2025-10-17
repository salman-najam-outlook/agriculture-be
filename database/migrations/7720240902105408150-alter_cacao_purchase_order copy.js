'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('cacao_purchase_orders', 'hasHarvestingDateInfo', {
      allowNull: true,
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.addColumn('cacao_purchase_orders', 'harvestingStartDate', {
      allowNull: true,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('cacao_purchase_orders', 'harvestingEndDate', {
      allowNull: true,
      type: Sequelize.DATE,
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
