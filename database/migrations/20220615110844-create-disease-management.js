'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DiseaseManagements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      farmId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_farms',
          key: 'id',
        },
      },
      area: {
        type: Sequelize.FLOAT,
      },
      cropTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'options',
          key: 'id',
        },
      },
      cropVarietyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'crops',
          key: 'id',
        },
      },
      firstSignDetectionDate: {
        type: Sequelize.DATE,
      },
      cropStageId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'options',
          key: 'id',
        },
      },
      numOfPlantAffected: {
        type: Sequelize.INTEGER,
      },
      fungalDiseaseControlMeasure: {
        type: Sequelize.TEXT,
      },
      bacterialDiseaseControlMeasure: {
        type: Sequelize.TEXT,
      },
      viralDiseaseControlMeasure: {
        type: Sequelize.TEXT,
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
      culturalMechanicalBiologicalDCMAppliedArea: {
        type: Sequelize.FLOAT,
      },
      usedChemicalType: {
        type: Sequelize.STRING,
      },
      chemicalAppliedToArea: {
        type: Sequelize.FLOAT,
      },
      chemicalActiveIngredient: {
        type: Sequelize.STRING,
      },
      totalChemicalUsed: {
        type: Sequelize.FLOAT,
      },
      chemicalApplicationRate: {
        type: Sequelize.FLOAT,
      },
      chemicalEfficacy: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('DiseaseManagements');
  },
};
