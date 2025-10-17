'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'map_warehouse_inbound_processing_batches',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        processingBatchId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'BuyingStationProcessingBatches',
            key: 'id',
          },
        },
        warehouseInboundId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'dry_milling_inbound_warehouse',
            key: 'id',
          },
        },
        processingBatch: {
          type: Sequelize.JSON,
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
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(
      'map_warehouse_inbound_processing_batches'
    );
  },
};
