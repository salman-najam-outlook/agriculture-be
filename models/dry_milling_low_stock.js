'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dry_milling_low_stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dry_milling_low_stock.init({
    quantity: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    parchmentBarcode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dry_milling_low_stock',
  });
  return dry_milling_low_stock;
};