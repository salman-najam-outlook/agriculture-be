'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuyingStationProcessingBatchAndOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.BuyingStationProcessingBatch, {
        sourceKey: 'processingBatchId',
        foreignKey: 'id',
        as: 'processingBatch',
      });
    }
  }
  BuyingStationProcessingBatchAndOrder.init(
    {
      orderId: DataTypes.INTEGER,
      processingBatchId: DataTypes.INTEGER,
      isdeleted: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'BuyingStationProcessingBatchAndOrder',
      paranoid: true,
      deletedAt: 'isdeleted',
    }
  );
  return BuyingStationProcessingBatchAndOrder;
};
