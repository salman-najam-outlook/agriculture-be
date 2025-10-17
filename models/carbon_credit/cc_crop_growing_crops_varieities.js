'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditCropGrowingCropVariety extends Model {
    static associate(models) {
      // Define associations
      CarbonCreditCropGrowingCropVariety.belongsTo(models.CarbonCreditCropGrowingCrop, {
        foreignKey: 'crop_growing_crop_id',
        as: 'crop_growing_crop'
      });
      
      CarbonCreditCropGrowingCropVariety.belongsTo(models.Crop, {
        foreignKey: 'crop_variety_id',
        as: 'crop_variety'
      });
    }
  }
  
  CarbonCreditCropGrowingCropVariety.init({
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
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    crop_variety_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'crops',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    recordId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'recordId'
    },
  }, {
    sequelize,
    modelName: 'CarbonCreditCropGrowingCropVariety',
    tableName: 'carbon_credit_crop_growing_crop_varieties',
    timestamps: false
  });
  
  return CarbonCreditCropGrowingCropVariety;
};