'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinalReportBatchProcessing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.FinalProductManagement, {
        sourceKey: 'final_product_id',
        foreignKey: 'id',
        as: 'finalProduct',
      });
      this.belongsTo(models.BatchProcessingManagement, {
        foreignKey: 'processing_batch_id',
        as: 'batchProcessing',
      });
    }
  }
  FinalReportBatchProcessing.init(
    {
      final_product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'final_product_management',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      processing_batch_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'batch_processing_management',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      batch_quantity: {
        type: DataTypes.DOUBLE,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'map_final_product_and_processing_batches',
      modelName: 'FinalReportBatchProcessing',
      paranoid: true,
    }
  );
  return FinalReportBatchProcessing;
};
