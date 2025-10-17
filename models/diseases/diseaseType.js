"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiseaseType extends Model {
    static associate(models) {
      this.hasMany(models.DiseaseSymptoms, {
        foreignKey: "diseaseTypeId",
        as: "symptoms",
      });
    }
  }

  DiseaseType.init(
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
        type: DataTypes.STRING,
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
      tableName: "disease_types",
      modelName: "DiseaseType",
    }
  );

  return DiseaseType;
};
