'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('soil_management', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      farm: {
        type: Sequelize.INTEGER,
      },
      segment: {
        type: Sequelize.INTEGER,
      },
      area: {
        type: Sequelize.DOUBLE,
      },
      areaUnits: {
        type: Sequelize.INTEGER,
      },

      cropType: {
        type: Sequelize.INTEGER,
      },

      cropVariety: {
        type: Sequelize.JSON,
      },
      soilType: {
        type: Sequelize.JSON,
      },
      doneSoilTestingBefore: {
        type: Sequelize.BOOLEAN,
      },
      ph: {
        type: Sequelize.DOUBLE,
      },
      bulkDensity: {
        type: Sequelize.DOUBLE,
      },
      bulkDensityUnits: {
        type: Sequelize.INTEGER,
      },
      soilOrganicCarbon: {
        type: Sequelize.DOUBLE,
      },
      nitrogen: {
        type: Sequelize.DOUBLE,
      },
      nitrogenUnits: {
        type: Sequelize.INTEGER,
      },
      phosphorus: {
        type: Sequelize.DOUBLE,
      },
      phosphorusUnits: {
        type: Sequelize.INTEGER,
      },
      potassium: {
        type: Sequelize.DOUBLE,
      },
      potassiumUnits: {
        type: Sequelize.INTEGER,
      },
      sulfur: {
        type: Sequelize.DOUBLE,
      },
      sulfurUnits: {
        type: Sequelize.INTEGER,
      },
      inputType: {
        type: Sequelize.JSON,
      },
      dateOfApplication: {
        type: Sequelize.DATE,
      },
      stage: {
        type: Sequelize.INTEGER,
      },
      limingMaterial: {
        type: Sequelize.JSON,
      },
      totalLimeApplied: {
        type: Sequelize.DOUBLE,
      },
      totalLimeAppliedUnits: {
        type: Sequelize.INTEGER,
      },
      limingRate: {
        type: Sequelize.DOUBLE,
      },
      limingRateUnits: {
        type: Sequelize.INTEGER,
      },
      limingApplicationFrequency: {
        type: Sequelize.INTEGER,
      },
      soilApplicationMethod: {
        type: Sequelize.JSON,
      },
      organicInputs: {
        type: Sequelize.JSON,
      },
      totalOrganicInputApplied: {
        type: Sequelize.DOUBLE,
      },
      totalOrganicInputAppliedUnit: {
        type: Sequelize.STRING,
      },
      organicInputsApplicationRate: {
        type: Sequelize.DOUBLE,
      },
      organicInputsApplicationRateUnit: {
        type: Sequelize.STRING,
      },
      organicInputsApplicationFrequency: {
        type: Sequelize.INTEGER,
      },
      organicApplicationMethod: {
        type: Sequelize.INTEGER,
      },
      syntheticFertilizers: {
        type: Sequelize.JSON,
      },
      nitrogenContent: {
        type: Sequelize.DOUBLE,
      },
      phosphorusContent: {
        type: Sequelize.DOUBLE,
      },
      potassiumContent: {
        type: Sequelize.DOUBLE,
      },
      totalSyntheticFertilizerUsed: {
        type: Sequelize.DOUBLE,
      },
      totalSyntheticFertilizerUsedUnit: {
        type: Sequelize.STRING,
      },
      syntheticFertilizerApplicationRate: {
        type: Sequelize.DOUBLE,
      },
      syntheticFertilizerApplicationRateUnit: {
        type: Sequelize.STRING,
      },
      syntheticApplicationMethod: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('soil_management');
  },
};
