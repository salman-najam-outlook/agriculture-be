"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PestType extends Model {
    static associate(models) {
      this.hasMany(models.PestInfestationSymptom, {
        foreignKey: "pestTypeId",
        as: "symptoms",
      });
      this.hasMany(models.PestManagementPestType, {
        as: "pest",
        foreignKey: "pestTypeId",
      });
    }
  }

  PestType.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cropName: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "pest_types",
      modelName: "PestType",
    }
  );

  return PestType;
};
