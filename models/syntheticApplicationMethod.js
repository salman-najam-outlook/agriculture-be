'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SyntheticApplicationMethod extends Model {
    static associate() {

    }
  }
  SyntheticApplicationMethod.init(
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
      tableName: 'synthetic_application_method',
      modelName: 'SyntheticApplicationMethod',
    }
  );
  return SyntheticApplicationMethod;
};
