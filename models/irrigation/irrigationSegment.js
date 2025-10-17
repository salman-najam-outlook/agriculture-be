'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IrrigationSegment extends Model {
    static associate(models) {
      // define association here
    }
  }
  IrrigationSegment.init(
    {
      segment: {
        type: DataTypes.INTEGER,
        references: {
          model: 'geofences',
          key: 'id',
        },
      },
      irrigation: {
        type: DataTypes.INTEGER,
        references: {
          model: 'irrigation',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'IrrigationSegment',
      tableName: 'irrigation_segment',
    }
  );
  return IrrigationSegment;
};
