"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserPlantField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserPlantField.init(
    {
      userId: DataTypes.INTEGER,
      cropId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      fertilizerOptionId: DataTypes.INTEGER,
      plantName: DataTypes.STRING,
      plantQty: DataTypes.INTEGER,
      plantQtyUmoId: DataTypes.INTEGER,
      description: DataTypes.TEXT
    },
    {
      sequelize,
      tableName: "user_plant_fields",
      modelName: "UserPlantField",
    }
  );
  return UserPlantField;
};
