'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSowingCrop extends Model {
    static associate() {

    }
  }
  MapSowingCrop.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      cropId: DataTypes.INTEGER,
      sowingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'map_sowing_crop',
      modelName: 'MapSowingCrop',
    }
  );
  return MapSowingCrop;
};
