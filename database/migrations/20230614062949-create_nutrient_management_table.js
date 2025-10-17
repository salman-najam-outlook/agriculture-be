"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("nutrient_management", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      cropTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "options",
          key: "id",
        },
      },
      dateOfApplication: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      applicationStageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "soil_application_stage",
          key: "id",
        },
      },
      daysAfterSowing: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fertilizerAppliedArea: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      fertilizerAppliedAreaUnitId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      recordId: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "Unique ID sent from app for offline mode",
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
    await queryInterface.dropTable('nutrient_management');
  },
};
