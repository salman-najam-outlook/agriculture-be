'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSowingFarms extends Model {
    static associate(models) {
      this.hasOne(models.Sowing, {
        foreignKey: 'id',
        sourceKey: 'sowingId',
        as: 'sowing',
      });
    }
  }
  MapSowingFarms.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      userFarmId: DataTypes.INTEGER,
      sowingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'map_sowing_farms',
      modelName: 'MapSowingFarms',
    }
  );
  return MapSowingFarms;
};
