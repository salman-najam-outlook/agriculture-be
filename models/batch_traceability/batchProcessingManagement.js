"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BatchProcessingManagement extends Model {
    static associate(models) {
      this.belongsTo(models.Option, {
        foreignKey: "crop_type",
        as: "cropType",
      });
      this.belongsToMany(models.PurchaseOrderManagement, {
        through: "MapPurchaseOrderAndProcessingBatches",
        foreignKey: "processing_batch_id",
        otherKey: "purchase_order_id",
        as: "purchaseOrders",
      });
      this.belongsToMany(models.FinalProductManagement, {
        through: "FinalReportBatchProcessing",
        foreignKey: "processing_batch_id",
        otherKey: "final_product_id",
        as: "finalProducts",
      });
      this.hasMany(models.AllPurchaseTraceabilityImages, {
        foreignKey: "batch_id",
        as: "batch_images",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      this.belongsToMany(
        models.CroptypeRejection,
        {
          through:"AllTraceabilityRejection",
          foreignKey:"batch_id",
          otherKey:"reason_id",
          as: "WasteReasons"
        }
      );
      this.hasOne(models.PackagingUnit, {
        foreignKey: "batch_id",
      });
      this.hasOne(models.Organization, {
        foreignKey: "id",
        as: "organization",
        sourceKey: "org_id",
      });
      this.belongsTo(models.user, {
        foreignKey: "userId",
        as: "user",
      });
      this.hasMany(models.Pallets, {
        foreignKey: "batch_id",
      });
    }
  }

  BatchProcessingManagement.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date_of_issue: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      crop_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "options",
          key: "id",
        },
      },
      quality_grade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      private_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      public_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      org_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      waste_quantity: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      final_quantity: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      available_quantity: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      lot_id: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      external_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
      isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "BatchProcessingManagement",
      tableName: "batch_processing_management",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      paranoid: true, // Enables soft delete
      deletedAt: "deletedAt", // Custom deletedAt column name
      timestamps: true,
      hooks: {
        afterCreate: async (batch, options) => {
          batch.lot_id = `CB-00${String(batch.id).padStart(3, "0")}`;
          await batch.save();
        },
        beforeUpdate: (batch, options) => {
          batch.lot_id = `CB-00${String(batch.id).padStart(3, "0")}`;
        },
      },
    }
  );

  return BatchProcessingManagement;
};
