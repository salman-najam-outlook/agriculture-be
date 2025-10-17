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

    // await queryInterface.addColumn('cacao_purchase_orders', 'product_type', {
    //   allowNull: true,
    //   type: Sequelize.ENUM('Fruit', 'Dry Grains/Seeds', 'Wet Grains/Seeds'),
    // });

    await queryInterface.addColumn('cacao_purchase_orders', 'moisture', {
      allowNull: true,
      type: Sequelize.FLOAT
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
