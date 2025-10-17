'use strict';
const { Model } = require('sequelize');
const s3 = require(rootPath + '/components/s3');
module.exports = (sequelize, DataTypes) => {
  class ComprehensnsiveAnalysisReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ComprehensnsiveAnalysisReportsAndCropType, {
        sourceKey: 'id',
        foreignKey: 'comprehensnsiveAnalysisReportsId',
        as: 'mapedCropTypeId',
      });
    }
  }
  ComprehensnsiveAnalysisReport.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      order: DataTypes.INTEGER,
      fileS3Key: DataTypes.STRING,
      english: DataTypes.STRING,
      hindi: DataTypes.STRING,
      marathi: DataTypes.STRING,
      nepali: DataTypes.STRING,
      spanish: DataTypes.STRING,
      indonesian: DataTypes.STRING,
      arabic: DataTypes.STRING,
      portugese: DataTypes.STRING,
      french: DataTypes.STRING,
      vietnamese: DataTypes.STRING,
      amharic: DataTypes.STRING,
      somali: DataTypes.STRING,
      oromo: DataTypes.STRING,
      bengali: DataTypes.STRING,
      swahili: DataTypes.STRING,
      greek: DataTypes.STRING,
      turkish: DataTypes.STRING,
      dutch: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'comprehensnsive_analysis_reports',
      modelName: 'ComprehensnsiveAnalysisReport',
    }
  );
  return ComprehensnsiveAnalysisReport;
};
