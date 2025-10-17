'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LimingRate extends Model {
    static associate() {

    }
  }
  LimingRate.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: 'liming_rate',
      modelName: 'LimingRate',
    }
  );
  return LimingRate;
};
