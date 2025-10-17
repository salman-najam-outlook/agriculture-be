'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoLowStock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CacaoLowStock.init({
    quantity: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    barcode: DataTypes.STRING,
    product: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CacaoLowStock',
    tableName: 'cacao_low_stock'
  });
  return CacaoLowStock;
};