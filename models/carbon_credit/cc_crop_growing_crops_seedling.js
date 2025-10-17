"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditCropGrowingCropSeedling extends Model {
    static associate(models) {
      CarbonCreditCropGrowingCropSeedling.belongsTo(models.CarbonCreditCropGrowingCrop, {
        foreignKey: 'crop_growing_crop_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      
      CarbonCreditCropGrowingCropSeedling.belongsTo(models.Seedlings, {
        foreignKey: 'seedling_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  
  CarbonCreditCropGrowingCropSeedling.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      crop_growing_crop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'carbon_credit_crop_growing_crops',
          key: 'id'
        }
      },
      seedling_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'seedling',
          key: 'id'
        }
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'recordId'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      modelName: "CarbonCreditCropGrowingCropSeedling",
      tableName: "carbon_credit_crop_growing_crops_seedlings",
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  
  return CarbonCreditCropGrowingCropSeedling;
};