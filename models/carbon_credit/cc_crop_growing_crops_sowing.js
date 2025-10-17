"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditCropGrowingCropSowing extends Model {
    static associate(models) {
      CarbonCreditCropGrowingCropSowing.belongsTo(models.CarbonCreditCropGrowingCrop, {
        foreignKey: 'crop_growing_crop_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      
      CarbonCreditCropGrowingCropSowing.belongsTo(models.Sowing, {
        foreignKey: 'sowing_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  
  CarbonCreditCropGrowingCropSowing.init(
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
      sowing_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sowing',
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
      modelName: "CarbonCreditCropGrowingCropSowing",
      tableName: "carbon_credit_crop_growing_crops_sowings",
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  
  return CarbonCreditCropGrowingCropSowing;
};