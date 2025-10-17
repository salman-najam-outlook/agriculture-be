"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Audit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Audit.init(
    {
      category: DataTypes.ENUM("crop", "livestock", "farm"),
      question: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "audit",
      modelName: "Audit",
    }
  );
  return Audit;
};
