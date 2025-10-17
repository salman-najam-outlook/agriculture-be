"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiseaseManagement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      this.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      });
      this.belongsTo(models.Option, {
        as: "applicationMethods",
        foreignKey: "diseaseManagementId",
        otherKey: "applicationMethodId",
        through: "DiseaseManagementChemicalType",
      });
      this.belongsToMany(models.Crop, {
        as: "cropVarieties",
        foreignKey: "diseaseManagementId",
        otherKey: "cropVarietyId",
        through: "DiseaseManagementCropVariety",
      });
      this.belongsToMany(models.PlantPart, {
        as: "diseaseManagementAffectedPlantParts",
        foreignKey: "diseaseManagementId",
        otherKey: "plantPartId",
        through: "DiseaseManagementAffectedPlantPart",
      });
      this.belongsToMany(models.DiseaseType, {
        as: "diseaseType",
        foreignKey: "diseaseManagementId",
        otherKey: "diseaseId",
        through: "DiseaseManagementDiseaseType",
      });
      this.belongsToMany(models.DiseaseSymptoms, {
        as: "diseaseSymptoms",
        foreignKey: "diseaseManagementId",
        otherKey: "symptomId",
        through: "DiseaseManagementSymptoms",
      });
      this.hasMany(models.DiseaseManagementControlOtherDate, {
        foreignKey: "diseaseManagementId",
        as: "diseaseControlOtherDates",
      });
      this.hasMany(models.DiseaseManagementChemicalType, {
        foreignKey: "diseaseManagementId",
        as: "originalChemicalTypes",
        onDelete: 'SET NULL',
      });
      this.belongsToMany(models.DiseaseManagementChemicalType, {
        through: models.DiseaseManagementChemicalTypeMap,
        as: 'diseaseChemicalTypes',
        foreignKey: 'diseaseManagementId',
      });
      this.belongsTo(models.DiseaseControlTypes, {
        as: "diseaseControlType",
        foreignKey: "diseaseControlTypeId",
      });
      this.belongsTo(models.DiseaseControlTypeOptions, {
        as: 'DiseaseControlTypeOption',
        foreignKey: 'diseaseControlTypeOptionId',
      });
      this.belongsTo(models.DiseaseCulturalManualMethods, {
        as: "culturalManualMethod",
        foreignKey: "culturalManualMethodId",
      });
      this.hasOne(models.DiseaseManagementCost, {
        foreignKey: 'diseaseManagementId',
        as: 'cost',
      });
      this.belongsToMany(models.user_farm, {
        as: "diseaseManagementFarms",
        through: "DiseaseManagementFarm",
        foreignKey: "diseaseManagementId",
        otherKey: "farmId",
      });
      this.belongsToMany(models.Geofence, {
        as: "diseaseManagementSegments",
        through: "DiseaseManagementSegment",
        foreignKey: "diseaseManagementId",
        otherKey: "segmentId",
      });
      this.hasMany(models.PlantationTraceability, {
        foreignKey: 'activity_id',
        as: 'traceability',
        scope: {
          activity_type: 'DISEASE_MANAGEMENT',
        },
      });
    }
  }
  DiseaseManagement.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      area: {
        type: DataTypes.DOUBLE,
      },
      areaUnitId: {
        type: DataTypes.INTEGER,
      },
      cropTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "options",
          key: "id",
        },
      },
      dateOfFirstDiseaseDetection: {
        type: DataTypes.DATE,
      },
      cropStageId: {
        type: DataTypes.INTEGER,
      },
      numberOfPlantsAffected: {
        type: DataTypes.INTEGER,
      },
      diseaseControlTypeId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      diseaseControlTypeOptionId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      diseaseControlStartDate: {
        type: DataTypes.DATE,
      },
      diseaseControlDuration: {
        type: DataTypes.INTEGER,
      },
      culturalManualMethodId: {
        type: DataTypes.INTEGER,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Unique ID sent from app for offline mode",
      },
    },
    {
      sequelize,
      modelName: "DiseaseManagement",
      tableName: "disease_managements",
    }
  );
  return DiseaseManagement;
};
