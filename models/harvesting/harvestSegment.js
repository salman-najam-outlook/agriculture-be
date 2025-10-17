'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HarvestingSegment extends Model {
    static associate(models) {
      // define association here
    }
  }
  HarvestingSegment.init(
    {
      segment: {
        type: DataTypes.INTEGER,
        references: {
          model: 'geofences',
          key: 'id',
        },
      },
      harvestId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'harvest',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'HarvestingSegment',
      tableName: 'harvesting_segment',
    }
  );
  return HarvestingSegment;
};