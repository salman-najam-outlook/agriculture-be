"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditCropGrowingCropFertilizer extends Model {
    static associate(models) {
      CarbonCreditCropGrowingCropFertilizer.belongsTo(models.CarbonCreditCropGrowingCrop, {
        foreignKey: 'crop_growing_crop_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
      
      CarbonCreditCropGrowingCropFertilizer.belongsTo(models.NutrientManagementFertilizerInputs, {
        foreignKey: 'fertilizer_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });
    }
  }
  
  CarbonCreditCropGrowingCropFertilizer.init(
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
      fertilizer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'nutrient_management_fertilizer_inputs',
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
      modelName: "CarbonCreditCropGrowingCropFertilizer",
      tableName: "carbon_credit_crop_growing_crops_fertilizers",
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  
  return CarbonCreditCropGrowingCropFertilizer;
};