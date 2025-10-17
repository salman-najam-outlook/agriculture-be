'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoWarehouseProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CacaoWarehouseProduct.init({
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    recordId:{
      type:DataTypes.STRING,
      allowNull:true
    },
    isdeleted:{
      type:DataTypes.DATE,
      allowNull:true,
    }
  }, {
    sequelize,
    modelName: 'CacaoWarehouseProduct',
    tableName: 'cacao_warehouse_products',
    paranoid: true,
    deletedAt:'isdeleted'
  });
  return CacaoWarehouseProduct;
};