"use strict";

/** @type {import('sequelize').Model} */
module.exports = (sequelize, DataTypes) => {
  const SoilAnalysisRequest = sequelize.define(
    "SoilAnalysisRequest",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["FAILED", "SUCCESS", "PENDING"]],
        },
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      refreshAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "soil_analysis_request",
      timestamps: true, // Automatically adds createdAt and updatedAt
    }
  );

  SoilAnalysisRequest.associate = function (models) {
    // Association with SoilAnalysisMetadata
    SoilAnalysisRequest.hasMany(models.SoilAnalysisMetadata, {
      foreignKey: "requestId",
      as: "soil_analysis_metadata",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return SoilAnalysisRequest;
};