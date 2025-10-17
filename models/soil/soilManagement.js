'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoilManagement extends Model {
    static associate(models) {
      this.belongsToMany(models.Crop, {
        as: 'crop_variety',
        through: 'MapSoilManagementOption',
        foreignKey: 'soilManagementId',
        otherKey: 'optionId',
      });
      this.belongsToMany(models.SoilType, {
        as: 'soil_type',
        through: 'MapSoilManagementOption',
        foreignKey: 'soilManagementId',
        otherKey: 'optionId',
      });
      this.belongsTo(models.user_farm, {
        foreignKey: 'farm',
        as: 'user_farm',
      });
      this.belongsTo(models.Geofence, {
        foreignKey: 'segment',
        as: 'segment_data',
      });
      this.belongsToMany(models.user_farm, {
        as: 'soilManagementFarms',
        through: 'soil_management_farms',
        foreignKey: 'soilManagementId',
        otherKey: 'farmId',
      });
      this.belongsToMany(models.Geofence, {
        as: 'soilManagementSegments',
        through: 'soil_management_segments',
        foreignKey: 'soilManagementId',
        otherKey: 'segmentId',
      });

      // options assoication start
      this.belongsToMany(models.Option, {
        as: 'input_type',
        through: 'MapSoilManagementOption',
        foreignKey: 'soilManagementId',
        otherKey: 'optionId',
      });
      this.belongsToMany(models.Option, {
        as: 'liming_material',
        through: 'MapSoilManagementOption',
        foreignKey: 'soilManagementId',
        otherKey: 'optionId',
      });
      this.belongsToMany(models.Option, {
        as: 'organic_inputs',
        through: 'MapSoilManagementOption',
        foreignKey: 'soilManagementId',
        otherKey: 'optionId',
      });
      this.belongsToMany(models.Option, {
        as: 'synthetic_fertilizers',
        through: 'MapSoilManagementOption',
        foreignKey: 'soilManagementId',
        otherKey: 'optionId',
      });
      this.belongsToMany(models.Option, {
        as: 'synthetic_application_method',
        through: 'MapSoilManagementOption',
        foreignKey: 'soilManagementId',
        otherKey: 'optionId',
      });
      this.belongsToMany(models.Option, {
        as: 'organic_application_method',
        through: 'MapSoilManagementOption',
        foreignKey: 'soilManagementId',
        otherKey: 'optionId',
      });
      this.belongsToMany(models.Option, {
        as: 'soil_application_method',
        through: 'MapSoilManagementOption',
        foreignKey: 'soilManagementId',
        otherKey: 'optionId',
      });
      // options assoication ends
      this.belongsTo(models.Option, {
        foreignKey: 'stage',
        as: 'soil_application_stage',
      });
      this.belongsTo(models.Option, {
        foreignKey: 'limingApplicationFrequency',
        as: 'liming_application_frequency',
      });
      this.belongsTo(models.Option, {
        foreignKey: 'cropType',
        as: 'crop_type',
      });
      this.belongsTo(models.Option, {
        foreignKey: 'organicInputsApplicationFrequency',
        as: 'organic_inputs_application_frequency',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'areaUnits',
        as: 'area_units',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'cropHeightUnits',
        as: 'crop_height_units',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'sulfurUnits',
        as: 'sulfur_units',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'potassiumUnits',
        as: 'potassium_units',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'phosphorusUnits',
        as: 'phosphorus_units',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'nitrogenUnits',
        as: 'nitrogen_units',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'totalLimeAppliedUnits',
        as: 'total_lime_applied_units',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'limingRateUnits',
        as: 'liming_rate_units',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'organicInputsApplicationRateUnit',
        as: 'organic_inputs_application_rate_unit',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'syntheticFertilizerApplicationRateUnit',
        as: 'synthetic_fertilizer_application_rate_unit',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'totalSyntheticFertilizerUsedUnit',
        as: 'total_synthetic_fertilizer_used_unit',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'totalOrganicInputAppliedUnit',
        as: 'total_organic_input_applied_unit',
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: 'bulkDensityUnits',
        as: 'bulk_density_unit',
      });
      this.hasMany(models.SoilManagementSyntheticFertilizer, {
        as: 'syntheticFertilizersData',
        foreignKey: 'soilManagementId',
      });
      this.hasMany(models.SoilManagementOrganicInput, {
        as: 'organicInputsData',
        foreignKey: 'soilManagementId',
      });
      this.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  SoilManagement.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      farm: {
        type: DataTypes.INTEGER,
      },
      segment: DataTypes.INTEGER,
      area: {
        type: DataTypes.DOUBLE,
      },
      areaUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      cropType: {
        type: DataTypes.INTEGER,
      },

      cropVariety: DataTypes.JSON,
      soilType: DataTypes.JSON,
      doneSoilTestingBefore: {
        type: DataTypes.BOOLEAN,
      },
      soilHealth: {
        type: DataTypes.ENUM('Fertile', 'Medium fertile', 'Low fertile')
      },
      ph: {
        type: DataTypes.DOUBLE,
      },
      bulkDensity: {
        type: DataTypes.DOUBLE,
      },
      bulkDensityUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      soilOrganicCarbon: {
        type: DataTypes.DOUBLE,
      },
      nitrogen: {
        type: DataTypes.DOUBLE,
      },
      nitrogenUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      phosphorus: {
        type: DataTypes.DOUBLE,
      },
      phosphorusUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      potassium: {
        type: DataTypes.DOUBLE,
      },
      potassiumUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sulfur: {
        type: DataTypes.DOUBLE,
      },
      sulfurUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      inputType: DataTypes.JSON,
      dateOfApplication: {
        type: DataTypes.DATE,
      },
      stage: {
        type: DataTypes.INTEGER,
      },
      limingMaterial: DataTypes.JSON,
      totalLimeApplied: {
        type: DataTypes.DOUBLE,
      },
      totalLimeAppliedUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      limingRate: {
        type: DataTypes.DOUBLE,
      },
      limingRateUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      limingApplicationFrequency: {
        type: DataTypes.INTEGER,
      },
      soilApplicationMethod: DataTypes.JSON,
      // deprecated start
      organicInputs: DataTypes.JSON,
      totalOrganicInputApplied: {
        type: DataTypes.DOUBLE,
      },
      totalOrganicInputAppliedUnit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      organicInputsApplicationRate: {
        type: DataTypes.DOUBLE,
      },
      organicInputsApplicationRateUnit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      organicInputsApplicationFrequency: {
        type: DataTypes.INTEGER,
      },
      organicApplicationMethod: {
        type: DataTypes.INTEGER,
      },
      syntheticFertilizers: DataTypes.JSON,
      nitrogenContent: {
        type: DataTypes.DOUBLE,
      },
      phosphorusContent: {
        type: DataTypes.DOUBLE,
      },
      potassiumContent: {
        type: DataTypes.DOUBLE,
      },
      totalSyntheticFertilizerUsed: {
        type: DataTypes.DOUBLE,
      },
      totalSyntheticFertilizerUsedUnit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      syntheticFertilizerApplicationRate: {
        type: DataTypes.DOUBLE,
      },
      syntheticFertilizerApplicationRateUnit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      syntheticApplicationMethod: DataTypes.JSON,
      // deprecated end
      daysAfterSowing: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cropHeight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      cropHeightUnits: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Unique ID sent from app for offline mode',
      },
      testLocationLat: DataTypes.FLOAT,
      testLocationLog: DataTypes.FLOAT,
      testLocationAddr: DataTypes.TEXT,
      testLocationFarmId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'soil_management',
      modelName: 'SoilManagement',
    }
  );
  return SoilManagement;
};
