'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'BuyingStationProcessingBatchAndOrders',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        orderId: {
          type: Sequelize.INTEGER,
          references: { model: 'BuyingStationOrders', key: 'id' },
        },
        processingBatchId: {
          type: Sequelize.INTEGER,
          references: { model: 'BuyingStationProcessingBatches', key: 'id' },
        },
        isdeleted: {
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn(
            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
          ),
        },
      },
      { uniqueKeys: { orderId: { fields: ['orderId'] } } }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BuyingStationProcessingBatchAndOrders');
  },
};
