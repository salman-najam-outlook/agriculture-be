'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IrrigationStage extends Model {
    static associate(models) {}
  }
  IrrigationStage.init(
    {
      name: { type: DataTypes.STRING },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'IrrigationStage',
      tableName: 'irrigation_stage',
    }
  );
  return IrrigationStage;
};
