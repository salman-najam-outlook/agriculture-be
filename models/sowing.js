'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sowing extends Model {
    static associate(models) {
      this.belongsToMany(models.Geofence, {
        as: 'segments',
        through: models.MapSowingGeofences,
        foreignKey: 'sowingId',
      });

      this.belongsToMany(models.user_farm, {
        through: models.MapSowingFarms,
        foreignKey: 'sowingId',
      });

      this.belongsToMany(models.Crop, {
        through: models.MapSowingCrop,
        foreignKey: 'sowingId',
      });

      this.belongsTo(models.UnitsList, {
        as: 'areaunit',
        foreignKey: 'areaUnitId',
      });

      this.belongsTo(models.UnitsList, {
        as: 'seedingunit',
        foreignKey: 'seedingUnitId',
      });

      this.belongsTo(models.UnitsList, {
        as: 'rowspacing',
        foreignKey: 'rowSpacingUnitId',
      });

      this.belongsTo(models.UnitsList, {
        as: 'inrowspacing',
        foreignKey: 'inRowSpacingUnitId',
      });

      this.belongsTo(models.UnitsList, {
        as: 'depthspacing',
        foreignKey: 'depthUnitId',
      });

      this.belongsTo(models.Option, {
        foreignKey: 'cropId',
      });

      this.belongsToMany(models.PlantingTypes, {
        through: 'MapSowingPlantingType',
        foreignKey: 'sowingId',
        otherKey: 'plantingTypeId',
        as: 'sowing_planting_type_assoc',
      });
      this.hasOne(models.SowingCost, {
        foreignKey: "sowingId",
        as: "cost",
      });
      this.hasMany(models.PlantationTraceability, {
        foreignKey: 'plantation_id',
        sourceKey: 'id',
        as: 'traceability',
      });
    }
  }
  Sowing.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      plantation_id: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: false,
        comment: 'User-provided plantation ID for sowing records'
      },
      plantation_status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: 'Plantation status - true for active, false for inactive'
      },

      area: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      areaUnitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      cropId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      days: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      seedingRate: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      seedingUnitId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { as: 'seedingunit', model: 'units', key: 'id' },
        onDelete: 'CASCADE',
      },
      rowSpacing: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      rowSpacingUnitId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { as: 'rowspacing', model: 'units', key: 'id' },
        onDelete: 'CASCADE',
      },
      inRowSpacing: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      inRowSpacingUnitId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { as: 'inrowspacing', model: 'units', key: 'id' },
        onDelete: 'CASCADE',
      },
      density: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      depth: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      depthUnitId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: { as: 'depthspacing', model: 'units', key: 'id' },
        onDelete: 'CASCADE',
      },
      recordId: {
        allowNull: true,
        type: DataTypes.STRING,
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
      tableName: 'sowing',
      modelName: 'Sowing',
    }
  );
  return Sowing;
};
