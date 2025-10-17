'use strict';

const { Model } = require('sequelize');
const db = require(rootPath + '/models');

module.exports = (sequelize, DataTypes) => {
  class Cupping extends Model { 
    static associate(models) {
      this.belongsTo(models.ParchmentQualityGrading, {
        foreignKey: 'quality_grading_id',
        targetKey: 'uniqueIdentifier',
        as: 'parchmentQualityGrading',
      });
    }
    }
  Cupping.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      module_type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      module_id: {
        type: DataTypes.INTEGER
      },
      quality_grading_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cupping_name: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      cupping_date: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      roasting_time: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      roasting_temperature: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      roasting_temperature_unit: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      fragrance: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      fragrance_break: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      fragrance_dry: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      fragrance_qualities: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      flavour: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      flavour_qualities: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      after_taste: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      after_taste_qualities: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      acidity: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      acidity_qualities: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      balance: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      balance_qualities: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      body: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      body_level: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      body_qualities: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      uniformity: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      clean_cup: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      sweetness: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      overall: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      defect_cups: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      defect_intensity: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      defect_value: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      final_score: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: 'cupping',
      modelName: 'Cupping',
      paranoid: true,
      deletedAt: 'deletedAt',
    }
  );
  return Cupping;
};
