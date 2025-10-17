"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("soil_management_cost", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      soilManagementId: {
        allowNull: false,
        references: {
          model: 'soil_managements',
          key: 'id',
        },
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE'
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
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("soil_management_cost");
  },
};
