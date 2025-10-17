'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSoilPrepPracticeFarms extends Model {
    static associate() {

    }
  }
  MapSoilPrepPracticeFarms.init(
    {
      soil_prep_practiceId: DataTypes.INTEGER,
      userFarmId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'map_soil_prep_practice_farms',
      modelName: 'MapSoilPrepPracticeFarms',
    }
  );
  return MapSoilPrepPracticeFarms;
};
