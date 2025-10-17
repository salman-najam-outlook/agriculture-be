"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SoilInformation extends Model {
    static associate(models) {
      this.belongsToMany(models.user_farm, {
        as: "farms",
        through: "SoilInformationFarm",
        foreignKey: "soilInformationId",
        otherKey: "farmId",
      });
      this.belongsToMany(models.Geofence, {
        as: "segments",
        through: "SoilInformationSegment",
        foreignKey: "soilInformationId",
        otherKey: "segmentId",
      });
      this.belongsToMany(models.SoilType, {
        as: "soilType",
        through: "SoilInformationSoilType",
        foreignKey: "soilInformationId",
        otherKey: "soilTypeId",
      });
      this.hasOne(models.SoilInformationCost, {
        foreignKey: "soilInformationId",
        as: "cost",
      });

      this.belongsTo(models.UnitsList, {
        foreignKey: "sulfurUnitId",
        as: "sulfurUnit",
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: "potassiumUnitId",
        as: "potassiumUnit",
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: "phosphorusUnitId",
        as: "phosphorusUnit",
      });
      this.belongsTo(models.UnitsList, {
        foreignKey: "nitrogenUnitId",
        as: "nitrogenUnit",
      });
      this.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      });
      this.belongsTo(models.Option, {
        foreignKey: 'cropType',
        as: 'crop_type',
      });
    }
  }
  SoilInformation.init(
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
      soilHealth: {
        type: DataTypes.ENUM("Fertile", "Medium fertile", "Low fertile"),
      },
      ph: {
        type: DataTypes.DOUBLE,
      },
      soilTest: {
        type: DataTypes.BOOLEAN,
      },
      soilTestLocationLat: { type: DataTypes.FLOAT },
      soilTestLocationLog: { type: DataTypes.FLOAT },
      soilTestLocationAddr: { type: DataTypes.TEXT },
      soilTestLocationFarmId: { type: DataTypes.INTEGER },
      soilOrganicCarbon: {
        type: DataTypes.DOUBLE,
      },
     
      nitrogen: {
        type: DataTypes.DOUBLE,
      },
      nitrogenUnitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      phosphorus: {
        type: DataTypes.DOUBLE,
      },
      phosphorusUnitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      potassium: {
        type: DataTypes.DOUBLE,
      },
      potassiumUnitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sulfur: {
        type: DataTypes.DOUBLE,
      },
      sulfurUnitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      calcium: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
     
      magnesium: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
     
      iron: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
     
      zinc: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
     
      boron: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      
      cropType: {
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
      tableName: "soil_information",
      modelName: "SoilInformation",
      paranoid:true,
      deletedAt: 'deletedAt'
    }
  );
  return SoilInformation;
};
