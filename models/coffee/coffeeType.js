'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CoffeeType extends Model {
    static associate(models) {}
  }
  CoffeeType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'coffee_types',
      modelName: 'CoffeeType',
    }
  );
  return CoffeeType;
};
