'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IrrigationSchedule extends Model {
    static associate(models) {
      // define association here
    }
  }
  IrrigationSchedule.init(
    {
      name: DataTypes.STRING,
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
      modelName: 'IrrigationSchedule',
      tableName: 'irrigation_schedule',
    }
  );
  return IrrigationSchedule;
};
