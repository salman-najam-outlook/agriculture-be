'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IrrigationWaterSourceOrigin extends Model {
    static associate(models) {
      this.belongsTo(models.IrrigationWaterSource, {
        foreignKey: 'waterType',
        as: 'source',
      });
    }
  }
  IrrigationWaterSourceOrigin.init(
    {
      name: DataTypes.STRING,
      waterType: {
        type: DataTypes.NUMBER,
        references: {
          model: 'irrigation_water_source',
          key: 'id',
        },
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
      modelName: 'IrrigationWaterSourceOrigin',
      tableName: 'irrigation_watersource_origin',
      indexes: [
        {
          unique: true,
          fields: ['name', 'waterType', 'userId'],
        },
      ],
    }
  );
  return IrrigationWaterSourceOrigin;
};
