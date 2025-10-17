'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IrrigationType extends Model {
    static associate(models) {}
  }
  IrrigationType.init(
    {
      name: DataTypes.STRING,
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
      modelName: 'IrrigationType',
      tableName: 'irrigation_type',
      indexes: [
        {
          unique: true,
          fields: ['name', 'userId'],
        },
      ],
    }
  );
  return IrrigationType;
};
