"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PestManagement extends Model {
    static associate(models) {
      this.belongsTo(models.UnitsList, {
        foreignKey: "areaUnitId",
        as: "areaUnit",
      });
      this.belongsTo(models.CropStage, {
        foreignKey: "cropStageId",
        as: "cropStage",
      });
      this.belongsTo(models.Option, {
        foreignKey: "cropTypeId",
        as: "cropType",
      });

      this.belongsToMany(models.Crop, {
        as: "cropVarieties",
        foreignKey: "pestManagementId",
        otherKey: "cropVarietyId",
        through: "PestManagementCropVariety",
      });
      this.belongsToMany(models.Option, {
        as: "applicationMethods",
        foreignKey: "pestManagementId",
        otherKey: "applicationMethodId",
        through: "PestManagementApplicationMethod",
      });
      this.belongsToMany(models.PlantPart, {
        as: "pestManagementAffectedPlantParts",
        foreignKey: "pestManagementId",
        otherKey: "plantPartId",
        through: "PestManagementAffectedPlantPart",
      });
      this.belongsToMany(models.PestInfestationSymptom, {
        as: "pestManagementInfestationSymptoms",
        foreignKey: "pestManagementId",
        otherKey: "pestInfestationSymptomId",
        through: "PestManagementInfestationSymptom",
      });
      this.belongsToMany(models.PestType, {
        as: "pestTypes",
        foreignKey: "pestManagementId",
        otherKey: "pestTypeId",
        through: "PestManagementPestType",
      });
      this.belongsToMany(models.user_farm, {
        as: "pestManagementFarms",
        through: "pest_management_farms",
        foreignKey: "pestManagementId",
        otherKey: "farmId",
      });
      this.belongsToMany(models.Geofence, {
        as: "pestManagementSegments",
        through: "pest_management_segments",
        foreignKey: "pestManagementId",
        otherKey: "segmentId",
      });
      this.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      });

      this.belongsTo(models.PestCulturalManualMethod, {
        as: "culturalManualMethod",
        foreignKey: "culturalManualMethodId",
      });
      this.hasMany(models.PestManagementOtherControlDate, {
        foreignKey: 'pestManagementId',
        as: 'otherDatesOfPestControl',
      });
      this.hasOne(models.PestManagementCost, {
        foreignKey: 'pestManagementId',
        as: 'cost',
      });
      this.belongsTo(models.PestControlType, {
        as: 'pestControlType',
        foreignKey: 'pestControlTypeId',
      });
      this.belongsTo(models.PestControlTypeOptions, {
        as: 'PestControlTypeOption',
        foreignKey: 'pestControlTypeOptionId',
      });

      this.belongsToMany(models.PestManagementChemicalPesticidesType, {
        through: models.MapPestManagementAndChemicalPesticides,
        as: "pestChemicalPesticidesTypes",
        foreignKey: "pestManagementId",
      });
      this.hasMany(models.PestManagementChemicalPesticidesType, {
        foreignKey: "pestManagementId",
        as: "orginalChemicalPesticidesTypes",
        onDelete: 'SET NULL',
      });
      this.hasMany(models.PlantationTraceability, {
        foreignKey: 'activity_id',
        as: 'traceability',
        scope: {
          activity_type: 'PEST_MANAGEMENT',
        },
      });
    }
  }

  PestManagement.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      area: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      areaUnitId: {
        type: DataTypes.INTEGER,
      },
      cropStageId: {
        type: DataTypes.INTEGER,
      },
      cropTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dateOfFirstPestDetection: {
        type: DataTypes.DATE,
      },
      numberOfPlantsAffected: {
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      pestControlTypeId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      pestControlTypeOptionId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      startOfPestControl: {
        type: DataTypes.DATE,
      },
      pestControlDuration: {
        type: DataTypes.INTEGER,
      },
      culturalManualMethodId: {
        type: DataTypes.INTEGER,
      },
      recordId: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "pest_managements",
      modelName: "PestManagement",
    }
  );

  return PestManagement;
};
