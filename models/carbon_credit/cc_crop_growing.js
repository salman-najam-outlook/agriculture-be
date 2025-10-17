"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditCropGrowing extends Model {
    static associate(models) {
      CarbonCreditCropGrowing.belongsTo(models.CarbonCreditProjectFarm, {
        foreignKey: 'farm_project_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      CarbonCreditCropGrowing.hasMany(models.CarbonCreditCropGrowingCrop, {
        foreignKey: 'crop_growing_id',
        as: 'crop_growing_crops'
      });

      CarbonCreditCropGrowing.hasMany(models.CarbonCreditCropGrowingEquipment, {
        foreignKey: 'crop_growing_id',
        as: 'crop_growing_equipments'
      })
    }
  }
  
  CarbonCreditCropGrowing.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      farm_project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'carbon_credit_project_farm',
          key: 'id'
        }
      },
      practice_type: {
        type: DataTypes.ENUM("monocropping", "intercropping", "no_crop"),
        allowNull: false
      },
      has_livestock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      modelName: "CarbonCreditCropGrowing",
      tableName: "carbon_credit_crop_growing",
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  
  return CarbonCreditCropGrowing;
};