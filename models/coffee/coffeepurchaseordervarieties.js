'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CoffeePurchaseOrderVarieties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoffeePurchaseOrderVarieties.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    coffee_purchase_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BuyingStationOrders',
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
  }, {
    sequelize,
    modelName: 'CoffeePurchaseOrderVarieties',
    tableName: 'coffee_purchase_order_varieties'
  });
  return CoffeePurchaseOrderVarieties;
};