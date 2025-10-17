'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CarbonCreditCropGrowingEquipment extends Model {
    static associate(models) {
      CarbonCreditCropGrowingEquipment.belongsTo(models.CarbonCreditCropGrowing, {
        foreignKey: 'crop_growing_id',
        as: 'cropGrowing',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      CarbonCreditCropGrowingEquipment.belongsTo(models.Equipment, {
        foreignKey: 'equipment_id',
        as: 'equipment',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      CarbonCreditCropGrowingEquipment.belongsToMany(models.EquipmentFuelRecord, {
        through: models.CarbonCreditCropGrowingEquipmentFuelRecord,
        foreignKey: 'carbon_credit_crop_growing_equipment_id',
        otherKey: 'equipment_fuel_record_id',
        as: 'fuelRecords'
      });
    }
  }

  CarbonCreditCropGrowingEquipment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      crop_growing_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      equipment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'recordId'
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
      modelName: 'CarbonCreditCropGrowingEquipment',
      tableName: 'carbon_credit_crop_growing_equipments',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return CarbonCreditCropGrowingEquipment;
};