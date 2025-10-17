'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GasUnits extends Model {
    static associate() {

    }
  }
  GasUnits.init(
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
      tableName: 'gas_units',
      modelName: 'GasUnits',
    }
  );
  return GasUnits;
};
