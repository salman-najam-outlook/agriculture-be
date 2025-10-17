'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSowingPlantingType extends Model {
    static associate() {

    }
  }
  MapSowingPlantingType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      sowingId: DataTypes.INTEGER,
      plantingTypeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'map_sowing_planting_type',
      modelName: 'MapSowingPlantingType',
    }
  );
  return MapSowingPlantingType;
};
