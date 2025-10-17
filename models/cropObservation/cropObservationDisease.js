'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationDisease extends Model {
    static associate(models) {}
  }
  CropObservationDisease.init(
    {
      name: DataTypes.STRING,
      organism: DataTypes.ENUM('virus', 'bacteria', 'fungi'),
      hindi: {
        type: DataTypes.STRING,
      },
      marathi: {
        type: DataTypes.STRING,
      },
      nepali: {
        type: DataTypes.STRING,
      },
      spanish: {
        type: DataTypes.STRING,
      },
      indonesian: {
        type: DataTypes.STRING,
      },
      arabic: {
        type: DataTypes.STRING,
      },
      portugese: {
        type: DataTypes.STRING,
      },
      french: {
        type: DataTypes.STRING,
      },
      swahili: {
        type: DataTypes.STRING,
      },
      bengali: {
        type: DataTypes.STRING,
      },
      oromo: {
        type: DataTypes.STRING,
      },
      somali: {
        type: DataTypes.STRING,
      },
      amharic: {
        type: DataTypes.STRING,
      },
      vietnamese: {
        type: DataTypes.STRING,
      },
      turkish: {
        type: DataTypes.STRING,
      },
      greek: {
        type: DataTypes.STRING,
      },
      dutch: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'CropObservationDisease',
      tableName: 'crop_observation_disease',
      timestamps: false,
    }
  );
  return CropObservationDisease;
};
