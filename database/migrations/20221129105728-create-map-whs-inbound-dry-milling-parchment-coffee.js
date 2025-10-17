'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'map_warehouse_inbound_dry_milling_parchment_coffees',
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
        dryMillingParchmentCoffeeId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'parchment_coffees',
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
        parchment: {
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
      'map_warehouse_inbound_dry_milling_parchment_coffees'
    );
  },
};
