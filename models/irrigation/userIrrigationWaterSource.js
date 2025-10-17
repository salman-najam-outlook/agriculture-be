'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserIrrigationWaterSource extends Model {
    static associate(models) {
    }
  }
  UserIrrigationWaterSource.init(
    {
      irrigationId: {
        type: DataTypes.INTEGER,
      },
      waterSourceId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'UserIrrigationWaterSource',
      tableName: 'user_irrigation_water_sources',
    }
  );
  return UserIrrigationWaterSource;
};
