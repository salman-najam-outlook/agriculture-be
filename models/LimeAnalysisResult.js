"use strict";

/** @type {import('sequelize').Model} */
module.exports = (sequelize, DataTypes) => {
  const LimeCalculationResult = sequelize.define(
    "LimeAnalysisResult",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: [["FAILED", "SUCCESS", "PENDING"]],
        },
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      limePrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      env: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      targetPH: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      soilDepth: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      useCoordinates: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      areaUnit: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      currentPH: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      soilType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      currentSoilPh: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      limeNeeded: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      limeUnit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      success: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      totalCost: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      tableName: "lime_analysis_results",
      timestamps: true,
    }
  );

  return LimeCalculationResult;
};