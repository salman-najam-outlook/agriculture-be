"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EquipmentActivity extends Model {
    static associate(models) {
      this.belongsToMany(models.Equipment, {
        through: 'equipment_equipment_activity'
      });

      this.belongsToMany(models.EquipmentName, {
        through: 'EquipmentNameEquipmentActivity',
        foreignKey: 'equipmentActivityId',
        otherKey: 'equipmentNameId',
        as: 'activity_equipment_name',
      });
      this.hasMany(models.EquipmentNameEquipmentActivity, {
        foreignKey: 'equipmentActivityId',
        as: 'EquipmentNameEquipmentActivity'
      })

      this.belongsTo(models.EquipmentCategory, {
        foreignKey: 'category',
        targetKey: 'id',
        as: 'equipment_category_activity'
      });
    }
  }
  EquipmentActivity.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "equipment_category",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "equipment_activity",
      modelName: "EquipmentActivity",
    }
  );
  return EquipmentActivity;
};
