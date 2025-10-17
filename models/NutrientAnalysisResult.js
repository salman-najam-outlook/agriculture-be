"use strict";

/** @type {import('sequelize').Model} */
module.exports = (sequelize, DataTypes) => {
  const NutrientAnalysisResult = sequelize.define(
    "NutrientAnalysisResult",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      area: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      areaUnit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cropDetail: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      fertilizers: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      userFertilizers: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      soilInfo: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      cropLeftOnField: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      recommendations: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      totalCost: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "nutrient_analysis_results",
      timestamps: true,
    }
  );

  return NutrientAnalysisResult;
};