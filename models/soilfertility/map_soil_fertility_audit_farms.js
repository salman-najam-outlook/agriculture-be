'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSoilFertilityAuditFarms extends Model {
    static associate() {

    }
  }
  MapSoilFertilityAuditFarms.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      userFarmId: DataTypes.INTEGER,
      soilFertilityAuditId: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: 'map_soil_fertility_audit_farms',
      modelName: 'MapSoilFertilityAuditFarms',
    }
  );
  return MapSoilFertilityAuditFarms;
};
