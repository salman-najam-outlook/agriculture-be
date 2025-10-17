'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapSoilFertilityAuditCrop extends Model {
    static associate() {
    }
  }
  MapSoilFertilityAuditCrop.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cropId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'crop',
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'MapSoilFertilityAuditCrop',
      tableName: 'map_soil_fertility_audit_crop',
    }
  );
  return MapSoilFertilityAuditCrop;
};
