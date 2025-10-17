'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('dry_milling_inbound_warehouse');
    await queryInterface.createTable('dry_milling_inbound_warehouse', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      senderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      productNameId: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.FLOAT,
      },
      quantityUom: {
        type: Sequelize.JSON,
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
      amount: {
        type: Sequelize.FLOAT,
      },
      amountUom: {
        type: Sequelize.JSON,
      },
      productED: {
        type: Sequelize.DATEONLY,
      },
      images: {
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
    await queryInterface.dropTable('dry_milling_inbound_warehouse');
    await queryInterface.createTable('dry_milling_inbound_warehouse', {
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
      parchmentId: {
        type: Sequelize.TEXT,
      },
      parchmentBarcode: {
        type: Sequelize.STRING,
      },
      product: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.DOUBLE,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      inboundUnitValue: {
        type: Sequelize.INTEGER,
      },
      inboundUnitId: {
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
    });
  },
};
