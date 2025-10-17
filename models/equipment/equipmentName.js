"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // Tools
  class EquipmentName extends Model {
    static associate(models) {
      this.belongsTo(models.Equipment, {
        foreignKey: 'id',
        targetKey: 'equipmentName',
      });

      this.belongsToMany(models.EquipmentActivity, {
        through: 'equipment_name_equipment_activity'
      });
    }
  }
  EquipmentName.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recordId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "equipment_name",
      modelName: "EquipmentName",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: [
            "name", 
            "userID"
          ],
        },
      ],
    }
  );
  return EquipmentName;
};
