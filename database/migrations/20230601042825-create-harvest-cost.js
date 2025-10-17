"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("harvest_costs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      harvestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "harvest",
          key: "id",
        },
      },
      currencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Currencies",
          key: "id",
        },
      },
      totalNumberOfWorkers: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      totalNumberOfHours: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      totalCost: {
        type: Sequelize.DOUBLE,
        allowNull: true,
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
    await queryInterface.dropTable('harvest_costs');
  },
};
