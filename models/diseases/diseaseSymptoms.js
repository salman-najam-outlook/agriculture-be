"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiseaseSymptoms extends Model {
    static associate(models) {
      this.belongsTo(models.DiseaseType, { foreignKey: "diseaseTypeId" });
    }
  }

  DiseaseSymptoms.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      symptoms: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      diseaseTypeId: {
        type: DataTypes.STRING,
        references: {
          model: "DiseaseType",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "disease_symptoms",
      modelName: "DiseaseSymptoms",
    }
  );

  return DiseaseSymptoms;
};
