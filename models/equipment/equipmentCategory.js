"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EquipmentCategory extends Model {}
  EquipmentCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "equipment_category",
      modelName: "EquipmentCategory",
    }
  );
  return EquipmentCategory;
};
