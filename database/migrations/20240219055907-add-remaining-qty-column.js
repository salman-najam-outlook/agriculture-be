'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('BuyingStationOrders', 'availableWeight', {
      type: Sequelize.FLOAT,
      allowNull: true,
      comment: 'Remaining weight that can be proccessed'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('BuyingStationOrders', 'availableWeight');
  }
};
