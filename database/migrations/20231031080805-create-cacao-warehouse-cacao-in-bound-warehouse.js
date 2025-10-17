'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cacao_inbound_warehouse', {
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
      senderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      productNameId:{
        allowNull:true,
        type:Sequelize.INTEGER
      },
      quantity:{
        allowNull:true,
        type:Sequelize.FLOAT
      },
      quantityUom:{
        allowNull:true,
        type:Sequelize.JSON,
      },
      unitSize:{
        type:Sequelize.FLOAT,
        allowNull:true,
      },
      unitUom:{
        type:Sequelize.JSON,
        allowNull:true
      },
      unitCount: {
        type: Sequelize.FLOAT,
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
      type:{
        type:Sequelize.STRING,
        allowNull:true
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
    await queryInterface.dropTable('cacao_inbound_warehouse');
  }
};