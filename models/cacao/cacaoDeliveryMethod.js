'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CacaoDeliveryMethod extends Model {
  }
  CacaoDeliveryMethod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: DataTypes.STRING,
      
    },
    {
      sequelize,
      tableName: 'cacao_delivery_methods',
      modelName: 'CacaoDeliveryMethod'
    }
  );
  return CacaoDeliveryMethod;
};
