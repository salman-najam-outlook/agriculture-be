"use strict";

/** @type {import('sequelize').Model} */
module.exports = (sequelize, DataTypes) => {
  const SoilAnalysisParameterRange = sequelize.define(
    "SoilAnalysisParameterRange",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      analysis_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "SoilAnalysisMetadata", // Reference to the SoilAnalysisMetadata model
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      parameter_key: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "SoilAnalysisMetadata", // References the 'name' field in the SoilAnalysis model
          key: "name",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      range: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uncertainty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "soil_analysis_parameter_ranges",
      timestamps: true, // Ensures `createdAt` and `updatedAt` fields are included
    }
  );

  SoilAnalysisParameterRange.associate = function (models) {
    // Association with the SoilAnalysis model
    SoilAnalysisParameterRange.belongsTo(models.SoilAnalysisMetadata, {
      foreignKey: "analysis_id",
      as: "soil_analysis",
    });
  };

  return SoilAnalysisParameterRange;
};