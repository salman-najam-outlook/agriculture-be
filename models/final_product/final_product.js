'use strict';
const moment = require('moment');
const _ = require('lodash');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinalProductManagement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.user, {
        sourceKey: 'buyer_id',
        foreignKey: 'id',
        as: 'buyer',
      })
      this.hasOne(models.user, {
        sourceKey: 'user_id',
        foreignKey: 'id',
        as: 'user',
      })
      this.hasOne(models.Option, {
        sourceKey: 'crop_type',
        foreignKey: 'id',
        as: 'crop',
      })
      this.belongsToMany(models.BatchProcessingManagement, {
        through: 'FinalReportBatchProcessing',
        foreignKey: 'final_product_id',
        otherKey: 'processing_batch_id',
        as: 'batchProcessing',
      });
      this.belongsToMany(models.CroptypeRejection, {
        through: 'AllTraceabilityRejection',
        foreignKey: 'final_product_id',
        otherKey: 'reason_id',
        as: 'rejectionReason',
      });
      this.hasMany(models.AllPurchaseTraceabilityImages, {
        foreignKey: "final_product_id",
        as: "final_product_images",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
      this.hasOne(models.PackagingUnit, {
        foreignKey: "final_product_id",
        as: "packingUnit",
      });
      this.hasMany(models.Pallets, {
        foreignKey: "final_product_id",
        as: "pallets",
      });


    }
  }
  FinalProductManagement.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      lot_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      issued_date: DataTypes.DATE,
      user_id: DataTypes.INTEGER,
      buyer_id: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      crop_type: DataTypes.INTEGER,
      quality: DataTypes.STRING,
      quantity: DataTypes.FLOAT,
      hasWaste: DataTypes.BOOLEAN,
      waste_quantity: DataTypes.INTEGER,
      final_quantity: DataTypes.FLOAT,
      private_info: DataTypes.TEXT,
      public_info: DataTypes.TEXT,
      isComplete: DataTypes.BOOLEAN,
      recordId: DataTypes.STRING,
      external_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
    },
    {
      sequelize,
      tableName: 'final_product_management',
      modelName: 'FinalProductManagement',
      timestamps: true,
      paranoid: true,
    }
  );
  return FinalProductManagement;
};
