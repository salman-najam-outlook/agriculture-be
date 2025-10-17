'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ComprehensnsiveAnalysisReportsAndCropType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Option, {
        sourceKey: 'cropTypeId',
        foreignKey: 'id',
        as: 'cropType',
      });
    }
  }
  ComprehensnsiveAnalysisReportsAndCropType.init(
    {
      comprehensnsiveAnalysisReportsId: DataTypes.INTEGER,
      cropTypeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ComprehensnsiveAnalysisReportsAndCropType',
    }
  );
  return ComprehensnsiveAnalysisReportsAndCropType;
};
