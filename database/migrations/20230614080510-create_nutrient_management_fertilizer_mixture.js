"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("nutrient_management_fertilizer_mixture", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nutrientManagementId: {
        allowNull: false,
        references: {
          model: "nutrient_management",
          key: "id",
        },
        type: Sequelize.INTEGER,
      },
      nutrientManagementFertilizerInputId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "nutrient_management_fertilizer_inputs",
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
      deletedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("nutrient_management_fertilizer_mixture");
  },
};
