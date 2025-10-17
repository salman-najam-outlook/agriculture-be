"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      "map_nutrient_management_and_fertilizer_mixture",
      {
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
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(
      "map_nutrient_management_and_fertilizer_mixture"
    );
  },
};
