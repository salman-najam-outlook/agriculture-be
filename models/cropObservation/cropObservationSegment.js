'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropObservationSegment extends Model {
    static associate(models) {}
  }
  CropObservationSegment.init(
    {
      segment: {
        type: DataTypes.INTEGER,
        references: {
          model: 'geofences',
          key: 'id',
        },
      },
      observation: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_observation',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CropObservationSegment',
      tableName: 'crop_observation_segment',
      timestamps: false,
    }
  );
  return CropObservationSegment;
};
