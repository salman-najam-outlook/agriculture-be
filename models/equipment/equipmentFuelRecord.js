"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EquipmentFuelRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EquipmentFuelRecord.belongsTo(models.Equipment, {
        foreignKey: 'equipment_id',
        as: 'equipment'
      });
    }
  }
  
  EquipmentFuelRecord.init(
    {
      equipment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'equipment',
          key: 'id'
        }
      },
      record_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      fuel_amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      fuel_unit: {
        type: DataTypes.ENUM(
          "litre",
          "gallon",
          "fluid_ounce",
          "quart"
        ),
        allowNull: false
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "EquipmentFuelRecord",
      tableName: "equipment_fuel_records",
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  
  return EquipmentFuelRecord;
};