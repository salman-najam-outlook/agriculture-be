"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditCropGrowingCrop extends Model {
    static associate(models) {
      CarbonCreditCropGrowingCrop.belongsTo(models.CarbonCreditCropGrowing, {
        foreignKey: 'crop_growing_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        as: "crop_growing"
      });
      
      CarbonCreditCropGrowingCrop.belongsTo(models.Option, {
        foreignKey: 'crop_type_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        as: "crop_types"
      });

      CarbonCreditCropGrowingCrop.belongsToMany(models.Seedlings, {
        through: models.CarbonCreditCropGrowingCropSeedling,
        foreignKey: 'crop_growing_crop_id',
        otherKey: 'seedling_id',
        as: 'seedlings'
      });
      
      CarbonCreditCropGrowingCrop.belongsToMany(models.Sowing, {
        through: models.CarbonCreditCropGrowingCropSowing,
        foreignKey: 'crop_growing_crop_id',
        otherKey: 'sowing_id',
        as: 'sowings'
      });
      
      CarbonCreditCropGrowingCrop.belongsToMany(models.NutrientManagementFertilizerInputs, {
        through: models.CarbonCreditCropGrowingCropFertilizer,
        foreignKey: 'crop_growing_crop_id',
        otherKey: 'fertilizer_id',
        as: 'fertilizers'
      });

      CarbonCreditCropGrowingCrop.hasMany(models.CarbonCreditCropGrowingCropVariety, {
        foreignKey: 'crop_growing_crop_id',
        as: 'crop_varieties'
      });
    }
  }
  
  CarbonCreditCropGrowingCrop.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      crop_growing_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'carbon_credit_crop_growing',
          key: 'id'
        }
      },
      crop_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'options',
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
      modelName: "CarbonCreditCropGrowingCrop",
      tableName: "carbon_credit_crop_growing_crops",
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  
  return CarbonCreditCropGrowingCrop;
};