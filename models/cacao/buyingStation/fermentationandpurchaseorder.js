'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CacaoFermentationAndPurchaseOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(models.CacaoFermentationProcess,{
      //   sourceKey:"fermentationId",
      //   foreignKey:"id",
      //   as:"fermentationProcess"
      // })
    }
  }
  CacaoFermentationAndPurchaseOrder.init({
    purchaseOrderId: DataTypes.INTEGER,
    fermentationId: DataTypes.INTEGER,
    isdeleted:DataTypes.DATE,
  }, {
    sequelize,
    paranoid:true,
    deletedAt:'isdeleted',
    tableName: 'cacao_fermentation_and_purchase_orders',
    modelName: 'CacaoFermentationAndPurchaseOrder',
  });
  return CacaoFermentationAndPurchaseOrder;
};