"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("disease_management_chemical_type", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      diseaseManagementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "disease_managements",
          key: "id",
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cost: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      currencyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Currencies",
          key: "id",
        },
      },
      chemicalQuantity: {
        type: Sequelize.INTEGER,
      },
      chemicalQuantityUnitId: {
        type: Sequelize.INTEGER,
      },
      chemicalActiveIngredient: {
        type: Sequelize.STRING,
      },
      chemicalDoseRate: {
        type: Sequelize.DOUBLE,
      },
      chemicalDoseRateUnitId: {
        type: Sequelize.INTEGER,
      },
      applicationMethodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "options",
          key: "id",
        },
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
    await queryInterface.dropTable("disease_management_chemical_type");
  },
};
