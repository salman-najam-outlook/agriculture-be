'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LimingMaterial extends Model {
    static associate() {

    }
  }
  LimingMaterial.init(
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
      tableName: 'liming_material',
      modelName: 'LimingMaterial',
    }
  );
  return LimingMaterial;
};
