'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GeneralCropInformation extends Model {
    static associate(models) {}
  }
  GeneralCropInformation.init(
    {
      cropType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Option',
          key: 'id',
        },
      },
      cropVariety: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Crop',
          key: 'id',
        },
      },
      region: DataTypes.TEXT,
      recommendedRegion: DataTypes.TEXT,
      temperature: DataTypes.STRING,
      humidity: DataTypes.STRING,
      radiation: DataTypes.STRING,
      rainfall: DataTypes.STRING,
      evapotranspiration: DataTypes.STRING,
      expectedYield: DataTypes.STRING,
      season: DataTypes.STRING,
      recommendedSeason: DataTypes.STRING,
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organization: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Organization',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'GeneralCropInformation',
      tableName: 'general_crop_information',
    },
  );
  return GeneralCropInformation;
};
