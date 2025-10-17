"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EquipmentModeOfOperation extends Model {}

  EquipmentModeOfOperation.init(
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
      tableName: "equipment_mode_of_operation",
      modelName: "EquipmentModeOfOperation",
      indexes: [
        {
          unique: true,
          fields: ["name", "userID"],
        },
      ],
    }
  );
  return EquipmentModeOfOperation;
};
