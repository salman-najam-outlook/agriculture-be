'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapUserGoalFarms extends Model {
    static associate() {

    }
  }
  MapUserGoalFarms.init(
    {
      userGoalId: DataTypes.INTEGER,
      userFarmId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'map_user_goal_farms',
      modelName: 'MapUserGoalFarms',
    }
  );
  return MapUserGoalFarms;
};
