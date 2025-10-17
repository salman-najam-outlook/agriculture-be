'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Commodity extends Model {
    static associate(models) {
    }
  }
  Commodity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING
    },
    {
      sequelize,
      tableName: 'commodity',
      modelName: 'Commodity'
    }
  );
  return Commodity;
};
