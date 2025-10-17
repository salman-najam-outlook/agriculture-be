'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LimingApplicationFrequency extends Model {
    static associate() {

    }
  }
  LimingApplicationFrequency.init(
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
      tableName: 'liming_application_frequency',
      modelName: 'LimingApplicationFrequency',
    }
  );
  return LimingApplicationFrequency;
};
