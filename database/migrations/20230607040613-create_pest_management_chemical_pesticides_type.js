"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pest_management_chemical_pesticides_type", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pestManagementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pest_managements",
          key: "id",
        },
      },
      pesticideName: {
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
      pesticideQuantity: {
        type: Sequelize.INTEGER,
      },
      pesticideQuantityUnitId: {
        type: Sequelize.INTEGER,
      },
      pesticideActiveIngredient: {
        type: Sequelize.STRING,
      },
      pesticideDoseRate: {
        type: Sequelize.DOUBLE,
      },
      pesticideDoseRateUnitId: {
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
    await queryInterface.dropTable("pest_management_chemical_pesticides_type");
  },
};
