"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EquipmentGroup extends Model {}
  EquipmentGroup.init(
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
      tableName: "equipment_group",
      modelName: "EquipmentGroup",
      indexes: [
        {
          unique: true,
          fields: ["name", "userID"],
        },
      ],
    }
  );
  return EquipmentGroup;
};
