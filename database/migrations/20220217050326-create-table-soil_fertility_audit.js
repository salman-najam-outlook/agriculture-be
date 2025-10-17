'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('soil_fertility_audit',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        cropType: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            as: 'crop',
            model: 'options',
            key: 'id',
          },
          onDelete: 'CASCADE'
        },
        soilTestingNo: {
          type: Sequelize.STRING,
          allowNull: true
        },
        soilTestingOftenId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            as: 'soilTestingOften',
            model: 'options',
            key: 'id',
          },
          onDelete: 'CASCADE'
        },
        mitigativeMeasure: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        soilFertilizersNo: {
          type: Sequelize.STRING,
          allowNull: true
        },
        applyLimeNo: {
          type: Sequelize.STRING,
          allowNull: true
        },
        organicInputsNo: {
          type: Sequelize.STRING,
          allowNull: true
        },
        produceOrganicInput: {
          type: Sequelize.BOOLEAN,
          allowNull: true
        },
        soilPractices: {
          type: Sequelize.BOOLEAN,
          allowNull: true
        },
        soilRisksNo: {
          type: Sequelize.STRING,
          allowNull: true
        },
        soilRiskMitigate: {
          type: Sequelize.BOOLEAN,
          allowNull: true
        },
        soilRiskMitigateMeasures: {
          type: Sequelize.STRING,
          allowNull: true
        },
        limingSchedule: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            as: 'limingSchedules',
            model: 'options',
            key: 'id',
          },
          onDelete: 'CASCADE'
        }
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('soil_fertility_audit');
  }
};
