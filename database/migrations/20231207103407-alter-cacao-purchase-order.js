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
    await queryInterface.removeColumn('cacao_purchase_orders','product_type');

    await queryInterface.addColumn('cacao_purchase_orders', 'product_type', {
      allowNull: true,
      type: Sequelize.ENUM('fruit', 'dry_grains_seeds', 'wet_grains_seeds'),
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
