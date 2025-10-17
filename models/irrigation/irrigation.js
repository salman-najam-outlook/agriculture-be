"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Irrigation extends Model {
    static associate(models) {
      this.belongsToMany(models.user_farm, {
        through: "IrrigationFarm",
        foreignKey: "irrigation",
        otherKey: "farm",
        as: "irrigation_farm",
      });
      this.belongsToMany(models.Geofence, {
        through: "IrrigationSegment",
        foreignKey: "irrigation",
        otherKey: "segment",
        as: "irrigation_segment",
      });
      this.belongsToMany(models.Crop, {
        through: "IrrigationCropVariety",
        foreignKey: "irrigation",
        otherKey: "cropVariety",
        as: "irrigation_cropVariety",
      });
      this.belongsToMany(models.IrrigationWaterSource, {
        through: "UserIrrigationWaterSource",
        foreignKey: "irrigationId",
        otherKey: "waterSourceId",
        as: "water_sources",
      });
      this.belongsToMany(models.IrrigationWaterSourceOrigin, {
        through: "UserIrrigationWaterSourceOrigin",
        foreignKey: "irrigationId",
        otherKey: "waterSourceOriginId",
        as: "water_source_origins",
      });
      this.belongsTo(models.Option, {
        foreignKey: "cropId",
        as: "irrigation_cropType",
      });
      // this.belongsTo(models.Option, {
      //   foreignKey: 'waterSource',
      //   as: 'water_source',
      // });
      this.belongsTo(models.IrrigationWaterSource, {
        foreignKey: "irrigationWaterSource",
        as: "irrigation_waterSource",
      });
      this.belongsTo(models.IrrigationWaterSourceOrigin, {
        foreignKey: "irrigationWaterSourceOrigin",
        as: "irrigation_waterSourceOrigin",
      });
      this.belongsTo(models.IrrigationStage, {
        foreignKey: "irrigationStage",
        as: "irrigation_stage",
      });
      this.belongsTo(models.IrrigationType, {
        foreignKey: "irrigationType",
        as: "irrigation_type",
      });
      this.belongsTo(models.IrrigationSchedule, {
        foreignKey: "irrigationSchedule",
        as: "irrigation_schedule",
      });
      this.hasMany(models.IrrigationDate, {
        foreignKey: "irrigation",
        as: "irrigation_dates",
      });
      this.belongsTo(models.IrrigationTypeUpdated, {
        foreignKey: "irrigationTypeUpdated",
        as: "irrigation_type_updated",
      });
      // this.belongsTo(models.Option, {
      //   foreignKey: "otherIrrigationType",
      //   as: "other_irrigation_type",
      // });
      this.hasOne(models.IrrigationCost, {
        foreignKey: "irrigationId",
        as: "cost",
      });
      this.hasOne(models.PlantationTraceability, {
        foreignKey: 'activity_id',
        as: 'traceability',
        constraints: false,
      });
    }
  }
  Irrigation.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      area: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      cropId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Option",
          key: "id",
        },
      },
      // waterSource: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      irrigationWaterSource: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "irrigation_water_source",
          key: "id",
        },
      },
      irrigationWaterSourceOrigin: {
        type: DataTypes.INTEGER,
        references: {
          model: "irrigation_watersource_origin",
          key: "id",
        },
      },
      irrigatedArea: DataTypes.DOUBLE,
      irrigationStage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "irrigation_stage",
          key: "id",
        },
      },
      irrigationSchedule: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "irrigation_schedule",
          key: "id",
        },
      },
      totalDays: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      irrigationType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "irrigation_type",
          key: "id",
        },
      },
      irrigationTypeUpdated: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Array of irrigation type subcategory IDs (JSON format)",
      },
      waterSourceUpdated: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Multi-select water source data as JSON array",
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Unique ID sent from app for offline mode",
      },
      waterVolumeUsed: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Irrigation",
      tableName: "irrigation",
    }
  );
  return Irrigation;
};
