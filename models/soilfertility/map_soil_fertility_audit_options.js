'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSoilFertilityAuditOptions extends Model {
    static associate() {
    }
  }
  MapSoilFertilityAuditOptions.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      optionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'options',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      soilFertilityAuditId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'soil_fertility_audit',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'MapSoilFertilityAuditOptions',
      tableName: 'map_soil_fertility_audit_options',
    }
  );
  return MapSoilFertilityAuditOptions;
};
