'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSoilPrepPracticeActivity extends Model {
    static associate() {

    }
  }
  MapSoilPrepPracticeActivity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      activityId: DataTypes.INTEGER,
      soil_prep_practiceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'map_soil_prep_practice_activity',
      modelName: 'MapSoilPrepPracticeActivity',
    }
  );
  return MapSoilPrepPracticeActivity;
};
