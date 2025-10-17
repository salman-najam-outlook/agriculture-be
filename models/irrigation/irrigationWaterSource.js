'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IrrigationWaterSource extends Model {
    static associate(models) {
      this.hasMany(models.IrrigationWaterSourceOrigin, {
        foreignKey: 'waterType',
        as: 'waterReosurceOrigins',
      });
    }
  }
  IrrigationWaterSource.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.NUMBER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'IrrigationWaterSource',
      tableName: 'irrigation_water_source',
      indexes: [
        {
          unique: true,
          fields: ['name', 'userId'],
        },
      ],
    }
  );
  return IrrigationWaterSource;
};
