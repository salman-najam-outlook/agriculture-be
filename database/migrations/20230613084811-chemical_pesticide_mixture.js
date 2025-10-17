"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pest_management_chemical_mixture", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pestManagementChemicalTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pest_management_chemical_pesticides_type",
          key: "id",
        },
      },
      pestManagementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pest_managements",
          key: "id",
        },
      },
      ingredientName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      percentage: {
        type: Sequelize.FLOAT,
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
      quantity: {
        type: Sequelize.FLOAT,
      },
      quantityUnitId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("pest_management_chemical_mixture");
  },
};
