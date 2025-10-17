'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSoilPrepPracticeCrop extends Model {
    static associate() {

    }
  }
  MapSoilPrepPracticeCrop.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      cropId: DataTypes.INTEGER,
      soil_prep_practiceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'map_soil_prep_practice_crop',
      modelName: 'MapSoilPrepPracticeCrop',
    }
  );
  return MapSoilPrepPracticeCrop;
};
