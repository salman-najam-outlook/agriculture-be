'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cacao_purchase_orders', 'availableWeight', {
      type: Sequelize.FLOAT,
      allowNull: true,
      comment: 'Remaining weight that can be proccessed'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('cacao_purchase_orders', 'availableWeight');
  }
};
