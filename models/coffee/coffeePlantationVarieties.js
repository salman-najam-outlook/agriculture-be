'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoffeePlantationVarieties extends Model {
    static associate(models) {
    }
  }
  CoffeePlantationVarieties.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      coffee_plantation_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'plantations',
          key: 'id',
        },
      },
      coffee_variety_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'coffee_variety',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CoffeePlantationVarieties',
      tableName: 'coffee_plantation_varieties',
    }
  );
  return CoffeePlantationVarieties;
};
