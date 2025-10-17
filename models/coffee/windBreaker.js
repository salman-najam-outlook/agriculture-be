'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WindBreaker extends Model {

    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: 'created_by',
        targetKey: 'id',
        as: 'user'
      });
    }
  }
  WindBreaker.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      created_by: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'wind_breaker_tree',
      modelName: 'WindBreaker'
    }
  );
  return WindBreaker;
};
