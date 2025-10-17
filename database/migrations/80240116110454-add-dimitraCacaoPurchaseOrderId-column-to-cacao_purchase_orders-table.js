'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('cacao_purchase_orders', 'dimitraCacaoPurchaseOrderId', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('cacao_purchase_orders', 'dimitraCacaoPurchaseOrderId');
  },
};
