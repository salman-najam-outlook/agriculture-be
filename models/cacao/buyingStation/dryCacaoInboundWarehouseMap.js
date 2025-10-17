'use strict';
const {
  Model, DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dryCacaoInboundWarehouseMap extends Model {
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
  dryCacaoInboundWarehouseMap.init({
    dryRegisterId: DataTypes.INTEGER,
    inboundLotId: DataTypes.INTEGER,
    isdeleted:DataTypes.DATE,
    totalLotQuantity: DataTypes.DOUBLE

  }, {
    sequelize,
    paranoid:true,
    deletedAt:'isdeleted',
    tableName: 'dry_cacao_inbound_warehouse_map',
    modelName: 'dryCacaoInboundWarehouseMap',
  });
  return dryCacaoInboundWarehouseMap;
};