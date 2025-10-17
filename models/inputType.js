'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InputType extends Model {
    static associate() {

    }
  }
  InputType.init(
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
      tableName: 'input_type',
      modelName: 'InputType',
    }
  );
  return InputType;
};
