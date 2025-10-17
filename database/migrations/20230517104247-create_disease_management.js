"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("disease_managements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      area: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
      },
      areaUnitId: {
        type: Sequelize.INTEGER,
      },
      cropTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "options",
          key: "id",
        },
      },
      dateOfFirstDiseaseDetection: {
        type: Sequelize.DATE,
      },
      cropStageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numberOfPlantsAffected: {
        type: Sequelize.INTEGER,
      },
      diseaseControlTypeId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      diseaseControlStartDate: {
        type: Sequelize.DATE,
      },
      diseaseControlDuration: {
        type: Sequelize.INTEGER,
      },
      diseaseControlOtherDate: {
        type: Sequelize.DATE,
      },
      culturalManualMethodId: {
        type: Sequelize.INTEGER,
      },
      culturalManualMethodArea: {
        type: Sequelize.DOUBLE,
      },
      culturalManualMethodAreaUnitId: {
        type: Sequelize.INTEGER,
      },
      chemicalType: {
        type: Sequelize.STRING,
      },
      chemicalAppliedArea: {
        type: Sequelize.DOUBLE,
      },
      chemicalAppliedAreaUnitId: {
        type: Sequelize.INTEGER,
      },
      chemicalActiveIngredient: {
        type: Sequelize.STRING,
      },
      totalChemicalUsed: {
        type: Sequelize.DOUBLE,
      },
      totalChemicalUsedUnitId: {
        type: Sequelize.INTEGER,
      },
      chemicalApplicationRate: {
        type: Sequelize.DOUBLE,
      },
      chemicalApplicationRateUnitId: {
        type: Sequelize.INTEGER,
      },
      chemicalEfficacy: {
        type: Sequelize.DOUBLE,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("disease_managements");
  },
};
