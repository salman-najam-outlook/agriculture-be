'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GeneralCropInformationRecommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Option, {
        foreignKey: 'id',
        sourceKey: 'cropTypeId',
        as: 'cropType',
      });
      this.hasOne(models.Crop, {
        foreignKey: 'id',
        sourceKey: 'cropVarietyId',
        as: 'cropVariety',
      });
    }
  }
  GeneralCropInformationRecommendation.init(
    {
      cropTypeId: DataTypes.INTEGER,
      cropVarietyId: DataTypes.INTEGER,
      region: DataTypes.STRING,
      season: DataTypes.STRING,
      requiredDaysForCropMature: DataTypes.STRING,
      potentialYield: DataTypes.STRING,
      storability: DataTypes.STRING,
      maturityIndices: DataTypes.STRING,
      uniqueFactorOfVariety: DataTypes.STRING,
      language: DataTypes.STRING,
      harvestingSeason: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'GeneralCropInformationRecommendation',
    }
  );
  return GeneralCropInformationRecommendation;
};
