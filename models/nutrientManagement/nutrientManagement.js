"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NutrientManagement extends Model {
    static associate(models) {
      this.belongsTo(models.Option, {
        foreignKey: "cropTypeId",
        as: "cropType",
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: "fertilizerAppliedAreaUnitId",
        as: "fertilizerAppliedAreaUnit",
      });
      this.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      });
      this.belongsTo(models.SoilApplicationStage, {
        foreignKey: 'applicationStageId',
        as: 'applicationStage',
      });
      this.belongsToMany(models.user_farm, {
        as: "farms",
        through: "NutrientManagementFarm",
        foreignKey: "nutrientManagementId",
        otherKey: "farmId",
      });
      this.belongsToMany(models.Geofence, {
        as: "segments",
        through: "NutrientManagementSegment",
        foreignKey: "nutrientManagementId",
        otherKey: "segmentId",
      });
      this.hasMany(models.MapNutrientManagementAndFertilizerMixture, {
        foreignKey: "nutrientManagementId",
        as: "fertilizerInputs",
      });
      this.hasOne(models.NutrientManagementCost, {
        foreignKey: 'nutrientManagementId',
        as: 'cost',
      });
      this.hasMany(models.PlantationTraceability, {
        foreignKey: 'activity_id',
        as: 'traceability',
        scope: {
          activity_type: 'NUTRIENT_MANAGEMENT',
        },
      });
      this.hasOne(models.Sowing, {
        foreignKey: 'id',
        as: 'sowing',
        constraints: false,
        scope: {
          activity_type: 'SOWING_PLANTING',
        },
      });
      this.hasOne(models.Irrigation, {
        foreignKey: 'id',
        as: 'irrigation',
        constraints: false,
        scope: {
          activity_type: 'IRRIGATION',
        },
      });
    }
  }
  NutrientManagement.init(
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
      cropTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "options",
          key: "id",
        },
      },
      dateOfApplication: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      applicationStageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      daysAfterSowing: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fertilizerAppliedArea: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      fertilizerAppliedAreaUnitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Unique ID sent from app for offline mode",
      },
    },
    {
      sequelize,
      tableName: "nutrient_management",
      modelName: "NutrientManagement",
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
  return NutrientManagement;
};
