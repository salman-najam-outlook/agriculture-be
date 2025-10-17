'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'CoffeeHarvesting',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        harvestingDate: {
          allowNull: false,
          type: Sequelize.DATE
        },
        plantationId: {
          type: Sequelize.INTEGER,
          references: { model: 'plantations', key: 'id' },
        },
        noOfTrees: {
          type: Sequelize.INTEGER,
        },
        quality: {
          type: Sequelize.STRING,
        },
        coffeeYield: {
          type: Sequelize.STRING,
        },
        coffeeYieldUnitId: {
          type: Sequelize.INTEGER,
        },
        yieldLosses: {
          type: Sequelize.STRING,
        },
        reasonForLossId: {
          type: Sequelize.INTEGER,
          references: { model: 'harvest_reason_for_losses', key: 'id' },
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        isDeleted: {
          type: Sequelize.BOOLEAN,
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
      'CoffeeHarvesting'
    );
  }
};
