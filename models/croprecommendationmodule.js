'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropRecommendationModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CropRecommendationModule.init(
    {
      name: DataTypes.STRING,
      ddName: DataTypes.STRING,
      moduleNum: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'CropRecommendationModule',
      paranoid: true,
    }
  );
  return CropRecommendationModule;
};
