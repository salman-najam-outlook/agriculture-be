"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EquipmentUserSegment extends Model {}
  EquipmentUserSegment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      equipmentID: DataTypes.INTEGER,
      geoFenceID: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "equipment_usersegment",
      modelName: "EquipmentUserSegment",
      indexes: [
        {
          unique: true,
          fields: ["equipmentID", "geoFenceID"],
        },
      ],
    }
  );
  return EquipmentUserSegment;
};
