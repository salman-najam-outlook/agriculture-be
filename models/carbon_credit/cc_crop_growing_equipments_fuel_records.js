'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarbonCreditCropGrowingEquipmentFuelRecord extends Model {
    static associate(models) {
      CarbonCreditCropGrowingEquipmentFuelRecord.belongsTo(models.CarbonCreditCropGrowingEquipment, {
        foreignKey: 'carbon_credit_crop_growing_equipment_id',
        as: 'cropGrowingEquipment',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      
      CarbonCreditCropGrowingEquipmentFuelRecord.belongsTo(models.EquipmentFuelRecord, {
        foreignKey: 'equipment_fuel_record_id',
        as: 'fuelRecord',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  
  CarbonCreditCropGrowingEquipmentFuelRecord.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      carbon_credit_crop_growing_equipment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'carbon_credit_crop_growing_equipments',
          key: 'id'
        }
      },
      equipment_fuel_record_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'equipment_fuel_records',
          key: 'id'
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'CarbonCreditCropGrowingEquipmentFuelRecord',
      tableName: 'carbon_credit_crop_growing_equipments_fuel_records',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  
  return CarbonCreditCropGrowingEquipmentFuelRecord;
};