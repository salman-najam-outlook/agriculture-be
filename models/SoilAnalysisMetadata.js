"use strict";

/** @type {import('sequelize').Model} */
module.exports = (sequelize, DataTypes) => {
  const SoilAnalysisMetadata = sequelize.define(
    "SoilAnalysisMetadata",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "SoilAnalysisRequest",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      cf: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "soil_analysis_metadata",
      timestamps: true, // Automatically adds createdAt and updatedAt
    }
  );

  SoilAnalysisMetadata.associate = function (models) {
    // Association with SoilAnalysisRequest
    SoilAnalysisMetadata.belongsTo(models.SoilAnalysisRequest, {
      foreignKey: "requestId",
      as: "request",
    });
    // Association with SoilAnalysisParameterRange
    SoilAnalysisMetadata.hasMany(models.SoilAnalysisParameterRange, {
      foreignKey: "analysis_id",
      as: "parameter_ranges",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return SoilAnalysisMetadata;
};