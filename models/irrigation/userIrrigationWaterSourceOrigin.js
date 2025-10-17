'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserIrrigationWaterSourceOrigin extends Model {
    static associate(models) {
    }
  }
  UserIrrigationWaterSourceOrigin.init(
    {
      irrigationId: {
        type: DataTypes.INTEGER,
      },
      waterSourceOriginId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'UserIrrigationWaterSourceOrigin',
      tableName: 'user_irrigation_water_source_origins',
    }
  );
  return UserIrrigationWaterSourceOrigin;
};
