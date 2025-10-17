'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AllTraceabilityRejection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here if necessary
      this.belongsTo(models.BatchProcessingManagement, {
        foreignKey: 'batch_id',
        as: 'batch',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
      this.hasOne(models.FinalProductManagement, {
        sourceKey: 'final_product_id',
        foreignKey: 'id',
        as: 'finalProduct',
      });
      this.belongsTo(models.PurchaseOrderManagement, {
        foreignKey: 'purchase_order_id',
        as: 'purchaseOrder',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
      this.belongsTo(models.CroptypeRejection, {
        foreignKey: 'reason_id',
        as: 'rejectionReason',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }

  AllTraceabilityRejection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      batch_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'batch_processing_management',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
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
      reason_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'croptype_rejection',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: 'all_purchase_trace_rejections', // replace with your table name
      modelName: 'AllTraceabilityRejection', // replace with your model name
    }
  );

  return AllTraceabilityRejection;
};
