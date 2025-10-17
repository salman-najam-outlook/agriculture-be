"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AllPurchaseTraceabilityImages extends Model {
    static associate(models) {
      // Define associations here
      this.belongsTo(models.BatchProcessingManagement, {
        foreignKey: "batch_id",
        as: "batch",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      this.belongsTo(models.FinalProductManagement, {
        foreignKey: "final_product_id",
        as: "finalProduct",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });

      this.belongsTo(models.PurchaseOrderManagement, {
        foreignKey: "purchase_order_id",
        as: "purchaseOrder",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }

  AllPurchaseTraceabilityImages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      batch_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "BatchProcessingManagement",
          key: "id",
        },
      },
      final_product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "FinalProductManagement",
          key: "id",
        },
      },
      purchase_order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "PurchaseOrderManagement",
          key: "id",
        },
      },
      file_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      s3_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "all_purchase_traceability_images",
      modelName: "AllPurchaseTraceabilityImages",
    }
  );

  return AllPurchaseTraceabilityImages;
};
