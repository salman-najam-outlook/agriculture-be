'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BuyingStationProcessingBatches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      batchCode: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.DATEONLY,
      },
      endDate: {
        type: Sequelize.DATEONLY,
      },
      totalCoffeeCherryQty: {
        type: Sequelize.FLOAT,
      },
      humidity: {
        type: Sequelize.FLOAT,
      },
      temperature: {
        type: Sequelize.FLOAT,
      },
      waterContent: {
        type: Sequelize.FLOAT,
      },
      batchRating: {
        type: Sequelize.ENUM('Platinum', 'Gold', 'Silver', 'Bronze'),
      },
      parchmentTarget: {
        type: Sequelize.FLOAT,
      },
      parchmentOut: {
        type: Sequelize.FLOAT,
      },
      recordId: {
        type: Sequelize.STRING,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BuyingStationProcessingBatches');
  },
};
