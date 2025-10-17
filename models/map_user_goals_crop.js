'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapUserGoalsCrop extends Model {
    static associate() {

    }
  }
  MapUserGoalsCrop.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      cropId: DataTypes.INTEGER,
      userGoalId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'map_user_goals_crop',
      modelName: 'MapUserGoalsCrop',
    }
  );
  return MapUserGoalsCrop;
};
