'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('BuyingStationProcessingBatchAndOrders', {
      fields: ['orderId'],
      name: 'orderId1',
      unique: false,
    });
    await queryInterface.removeIndex(
      'BuyingStationProcessingBatchAndOrders',
      'orderId'
    );
  },

  async down(queryInterface, Sequelize) {},
};
