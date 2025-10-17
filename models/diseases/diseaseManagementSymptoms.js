"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DiseaseManagementSymptoms extends Model {
    static associate(models) {
      this.belongsTo(models.DiseaseManagement, {
        as: "diseaseManagement",
        foreignKey: "diseaseManagementId",
      });
      this.belongsTo(models.DiseaseSymptoms, {
        as: "symptoms",
        foreignKey: "symptomId",
      });
    }
  }

  DiseaseManagementSymptoms.init(
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
      symptomId: {
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
      tableName: "disease_management_symptoms",
      modelName: "DiseaseManagementSymptoms",
    }
  );

  return DiseaseManagementSymptoms;
};
