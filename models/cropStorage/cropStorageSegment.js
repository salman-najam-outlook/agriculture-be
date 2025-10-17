'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CropStorageSegment extends Model {
    static associate(models) {}
  }
  CropStorageSegment.init(
    {
      cropStorage: {
        type: DataTypes.INTEGER,
        references: {
          model: 'crop_storage',
          key: 'id',
        },
      },
      segment: {
        type: DataTypes.INTEGER,
        references: {
          model: 'geofences',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CropStorageSegment',
      tableName: 'crop_storage_segment',
    }
  );
  return CropStorageSegment;
};
