'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapWeedFarms extends Model {
    static associate() {

    }
  }
  MapWeedFarms.init(
    {
      weedId: DataTypes.INTEGER,
      userFarmId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'map_weed_farms',
      modelName: 'MapWeedFarms',
    }
  );
  return MapWeedFarms;
};
