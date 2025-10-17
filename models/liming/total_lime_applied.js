'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TotalLimeApplied extends Model {
    static associate() {

    }
  }
  TotalLimeApplied.init(
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
      tableName: 'total_lime_applied',
      modelName: 'TotalLimeApplied',
    }
  );
  return TotalLimeApplied;
};
