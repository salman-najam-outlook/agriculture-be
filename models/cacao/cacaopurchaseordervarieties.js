'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoPurchaseOrderVarieties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CacaoPurchaseOrderVarieties.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    cacao_purchase_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cacao_purchase_orders',
        key: 'id',
      },
    },
    cacao_variety_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cacao_variety',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'CacaoPurchaseOrderVarieties',
    tableName: 'cacao_purchase_order_varieties'
  });
  return CacaoPurchaseOrderVarieties;
};