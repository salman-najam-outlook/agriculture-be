'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SoilApplicationMethod extends Model {
    static associate() {

    }
  }
  SoilApplicationMethod.init(
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
      tableName: 'soil_application_method',
      modelName: 'SoilApplicationMethod',
    }
  );
  return SoilApplicationMethod;
};
