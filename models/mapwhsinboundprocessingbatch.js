'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MapWHSInboundProcessingBatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MapWHSInboundProcessingBatch.init(
    {
      userId: DataTypes.INTEGER,
      warehouseInboundId: DataTypes.INTEGER,
      processingBatchId: DataTypes.INTEGER,
      processingBatch: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: 'MapWHSInboundProcessingBatch',
      tableName: 'map_warehouse_inbound_processing_batches',
    }
  );
  return MapWHSInboundProcessingBatch;
};
