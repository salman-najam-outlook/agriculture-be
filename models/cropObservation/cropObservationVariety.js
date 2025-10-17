'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationVariety extends Model {
    static associate(models) {}
  }
  CropObservationVariety.init(
    {
      observation: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation',
          key: 'id',
        },
      },
      cropVariety: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crops',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CropObservationVariety',
      tableName: 'crop_observation_variety',
      timestamps: false,
    }
  );
  return CropObservationVariety;
};
