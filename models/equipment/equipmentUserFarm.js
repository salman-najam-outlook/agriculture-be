"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EquipmentUserFarm extends Model {
    static associate(models) {
      this.belongsTo(models.user_farm, {
        foreignKey: 'farmID',
        as: 'farm',
      });
      this.belongsTo(models.Equipment, {
        foreignKey: 'equipmentID',
        as: 'equipment',
      });
    }
  }
  EquipmentUserFarm.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      equipmentID: DataTypes.INTEGER,
      farmID: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "equipment_userfarm",
      modelName: "EquipmentUserFarm",
      indexes: [
        {
          unique: true,
          fields: ["equipmentID", "farmID"],
        },
      ],
    }
  );
  return EquipmentUserFarm;
};
