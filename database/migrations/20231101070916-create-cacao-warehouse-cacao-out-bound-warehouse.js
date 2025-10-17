'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cacao_out_bound_warehouse', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      parchmentId:{
        allowNull:true,
        type:Sequelize.STRING,
      },
      inboundLotId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cacao_inbound_warehouse',
          key: 'id',
        },
      },
      clientName: {
        type: Sequelize.STRING
      },
      productNameId: {
        type: Sequelize.INTEGER,
      },
      productName: {
        type: Sequelize.STRING,
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
      isdeleted:{
        type: Sequelize.DATE,
      },
      recordId: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cacao_out_bound_warehouse');
  }
};