'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');
const _ = require('lodash');
module.exports = (sequelize, DataTypes) => {
  class CacaoFermentationProcess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(models.CacaoPurchaseOrder,{
      //   sourceKey:"purchaseOrder",
      //   foreignKey:"id",
      //   as:"cacaoPurchaseOrder"
      // })
    
      this.belongsToMany(models.CacaoPurchaseOrder, {
        through: "CacaoFermentationAndPurchaseOrder",
        foreignKey: "fermentationId",
        otherKey: "purchaseOrderId",
        as: "cacaoPurchaseOrder",
      });

      this.belongsToMany(models.CacaoBatchVisualIdentification,{
        through:'CacaoFermentationAndBatchVisual',
        foreignKey:'fermentationId',
        otherKey:'batchVisualId',
        as:'fermentationBatchVisual'
      })

      this.hasOne(models.CacaoFermentationMethod,{
        sourceKey:'fermentationMethod',
        foreignKey:'id',
        as:'fermentationMethodName'
      })

      this.hasOne(models.user, {
        sourceKey: 'buyingStationId',
        foreignKey: 'id',
        as: 'fermentationUser',
      });

      this.hasMany(models.CacaoFermentationDryingProcess,{
        sourceKey:"fermentationCode",
        foreignKey:"fermentationId",
        as:"fermentationDryRegister"
      })

      this.belongsToMany(models.CacaoDryingProcess, {
        through: "CacaoFermentationDryingProcess",
        foreignKey: "fermentationId",
        otherKey: "dryRegisterId",
        as: "cacaoDryingProcess",
      });

  
      // this.hasMany(models.CacaoFermentationDryingProcess, {
      //   foreignKey: "fermentationId",
      //   sourceKey: "id",
      //   as: "fermentationsDryingProcess",
      // });
    }
  }
  CacaoFermentationProcess.init({
    startDate: {
      type: DataTypes.DATEONLY,
      get() {
        const startDate = this.getDataValue('startDate');
        if (_.isEmpty(startDate)) return null;
        return moment
          .utc(startDate, process.env.DB_ONLYDATE_FORMAT)
          .format(process.env.ACCEPT_DATE_FORMAT);
      },
    },
    endDate: {
      type: DataTypes.DATEONLY,
      get() {
        const endDate = this.getDataValue('endDate');
        if (_.isEmpty(endDate)) return null;
        return moment
          .utc(endDate, process.env.DB_ONLYDATE_FORMAT)
          .format(process.env.ACCEPT_DATE_FORMAT);
      },
    },
    // purchaseOrder:{
    //   type:DataTypes.INTEGER,
    //   allowNull:false,
    //   references:{
    //     model:'CacaoPurchaseOrder',
    //     key:'id'
    //   }
    // },
    fermentationCode:{
      type:DataTypes.STRING(10),
      allowNull:true,
    },
    external_id:{
      type:DataTypes.STRING(10),
      allowNull:true
    },
    buyingStationId:{
      type: DataTypes.INTEGER,
      allowNull:true,
    },
    initialWeight:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    finalWeight:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    performance:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    fermentationPercentage:{
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    fermentationMethod:{
      type:DataTypes.INTEGER,
      references:{
        model:'CacaoFermentationMethod',
        key:'id',
      },
      allowNull:true,
    },
    status:{
      type:DataTypes.ENUM('All','Completed','Pending'),
      allowNull:true,
    },
    isdeleted:{
      type:DataTypes.DATE,
      allowNull:true,
    },
    fermentationReady: {
      type: DataTypes.VIRTUAL,
      get() {
        const endDate = this.getDataValue('endDate');
        return (
          moment
            .utc()
            .isAfter(moment.utc(endDate, process.env.DB_ONLYDATE_FORMAT)) ||
          false
        );
      },
    },
    recordId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    external_traceability_id: {
      type: DataTypes.STRING(20),
    },
  }, {
    sequelize,
    tableName: 'cacao_fermentation_process',
    modelName:'CacaoFermentationProcess',
    paranoid:true,
    deletedAt:'isdeleted'
  });
  return CacaoFermentationProcess;
};