"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("nutrient_management_fertilizer_inputs", {
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
      fertilizerName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fertilizerTypeId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      currencyId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "Currencies",
          key: "id",
        },
      },
      cost: {
        allowNull: true,
        type: Sequelize.DOUBLE,
      },
      applicationRate: {
        allowNull: true,
        type: Sequelize.DOUBLE,
      },
      applicationRateUnitId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      applicationMethodId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "soil_application_method",
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
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("nutrient_management_fertilizer_inputs");
  },
};
