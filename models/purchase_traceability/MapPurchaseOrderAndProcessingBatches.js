'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapPurchaseOrderAndProcessingBatches extends Model {
    static associate(models) {
      // Define associations here, if any
      this.hasOne(models.BatchProcessingManagement, {
        sourceKey: 'processing_batch_id',
        foreignKey: 'id',
      });

      this.belongsTo(models.PurchaseOrderManagement, {
        foreignKey: 'purchase_order_id',
      });
    }
  }

  MapPurchaseOrderAndProcessingBatches.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      purchase_order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'purchase_order_management',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      processing_batch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'batch_processing_management',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      purchase_quantity: {
        type: DataTypes.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      tableName: 'map_purchase_order_and_processing_batches',
      modelName: 'MapPurchaseOrderAndProcessingBatches',
      timestamps: true, // Enable automatic timestamps
      updatedAt: 'updatedAt',
      createdAt: 'createdAt',
    }
  );

  return MapPurchaseOrderAndProcessingBatches;
};
