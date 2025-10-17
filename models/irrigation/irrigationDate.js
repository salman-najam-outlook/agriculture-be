'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IrrigationDate extends Model {
    static associate(models) {}
  }
  IrrigationDate.init(
    {
      irrigation: {
        type: DataTypes.INTEGER,
        references: {
          model: 'irrigation',
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'IrrigationDate',
      tableName: 'irrigation_date',
    }
  );
  return IrrigationDate;
};
