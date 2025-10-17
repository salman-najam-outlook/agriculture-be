'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CropComparisonAndRecommendationReport extends Model {
    static associate(models) {
      // Many-to-many relationship with Options (crop types) through junction table
      CropComparisonAndRecommendationReport.belongsToMany(models.Option, {
        through: 'crop_comparision_and_recommendation_reports_crop_type',
        foreignKey: 'crop_comparision_and_recommendation_report_id',
        otherKey: 'crop_type_id',
        as: 'cropTypes'
      });
    }
  }

  CropComparisonAndRecommendationReport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fileS3Key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    english: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hindi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    marathi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nepali: {
      type: DataTypes.STRING,
      allowNull: true
    },
    spanish: {
      type: DataTypes.STRING,
      allowNull: true
    },
    indonesian: {
      type: DataTypes.STRING,
      allowNull: true
    },
    arabic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    portugese: {
      type: DataTypes.STRING,
      allowNull: true
    },
    french: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vietnamese: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amharic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    somali: {
      type: DataTypes.STRING,
      allowNull: true
    },
    oromo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bengali: {
      type: DataTypes.STRING,
      allowNull: true
    },
    swahili: {
      type: DataTypes.STRING,
      allowNull: true
    },
    greek: {
      type: DataTypes.STRING,
      allowNull: true
    },
    turkish: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dutch: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'CropComparisonAndRecommendationReport',
    tableName: 'crop_comparision_and_recommendation_reports',
    timestamps: true
  });

  return CropComparisonAndRecommendationReport;
};