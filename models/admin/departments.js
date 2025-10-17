"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Departments extends Model {
    static associate(models) {
      // define association here
    }
  }
  Departments.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "departments",
      modelName: "Departments",
    }
  );
  return Departments;
};
