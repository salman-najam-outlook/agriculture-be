"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DiseaseManagementDiseaseType extends Model {
    static associate(models) {
      this.belongsTo(models.DiseaseManagement, {
        as: "diseaseManagement",
        foreignKey: "diseaseManagementId",
      });
      this.belongsTo(models.DiseaseType, {
        as: "disease",
        foreignKey: "diseaseId",
      });
    }
  }

  DiseaseManagementDiseaseType.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      diseaseManagementId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      diseaseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "disease_management_disease_type",
      modelName: "DiseaseManagementDiseaseType",
    }
  );

  return DiseaseManagementDiseaseType;
};
