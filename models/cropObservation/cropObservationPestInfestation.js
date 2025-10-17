'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationPestInfestation extends Model {
    static associate(models) {}
  }
  CropObservationPestInfestation.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
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
      modelName: 'CropObservationPestInfestation',
      tableName: 'crop_observation_pest_infestation',
      timestamps: false,
    }
  );
  return CropObservationPestInfestation;
};
