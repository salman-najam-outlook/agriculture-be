'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoOutBoundWarehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CacaoOutBoundWarehouse.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    parchmentId:{
      allowNull:true,
      type:DataTypes.STRING,
    },
    inboundLotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cacao_inbound_warehouse',
        key: 'id',
      },
    },
    clientName: {
      type: DataTypes.STRING,
    },
    productNameId: {
      type: DataTypes.INTEGER,
    },
    productName: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.FLOAT,
    },
    quantityUom: {
      type: DataTypes.JSON,
    },
    unitSize: {
      type: DataTypes.FLOAT,
    },
    unitUom: {
      type: DataTypes.JSON,
    },
    totalQty: {
      type: DataTypes.FLOAT,
    },
    totalQtyUom: {
      type: DataTypes.JSON,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    amountUom: {
      type: DataTypes.JSON,
    },
    isdeleted:{
      type: DataTypes.DATE,
    },
    recordId: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'CacaoOutBoundWarehouse',
    tableName: 'cacao_out_bound_warehouse',
    paranoid:true,
    deletedAt:'isdeleted'
  });
  return CacaoOutBoundWarehouse;
};