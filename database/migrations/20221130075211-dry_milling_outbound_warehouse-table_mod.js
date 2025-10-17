'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('dry_milling_outbound_warehouse');
    await queryInterface.createTable('dry_milling_outbound_warehouse', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      clientName: {
        type: Sequelize.STRING,
      },
      warehouseProductNameId: {
        type: Sequelize.INTEGER,
      },
      warehouseProductName: {
        type: Sequelize.STRING,
      },
      inboundLotId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'dry_milling_inbound_warehouse',
          key: 'id',
        },
      },
      unitSize: {
        type: Sequelize.FLOAT,
      },
      unitUom: {
        type: Sequelize.JSON,
      },
      unitCount: {
        type: Sequelize.INTEGER,
      },
      totalQty: {
        type: Sequelize.FLOAT,
      },
      totalQtyUom: {
        type: Sequelize.JSON,
      },
      amount: {
        type: Sequelize.FLOAT,
      },
      amountUom: {
        type: Sequelize.JSON,
      },
      isdeleted: {
        type: Sequelize.DATE,
      },
      recordId: {
        type: Sequelize.STRING,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dry_milling_outbound_warehouse');
    await queryInterface.createTable('dry_milling_outbound_warehouse', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      clientName: {
        type: Sequelize.STRING,
      },
      orderDetail: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      outboundUnitValue: {
        type: Sequelize.INTEGER,
      },
      outboundUnitId: {
        type: Sequelize.INTEGER,
      },
      isdeleted: {
        type: Sequelize.DATE,
      },
      recordId: {
        type: Sequelize.STRING,
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
      parchmentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      parchmentBarcode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
};
