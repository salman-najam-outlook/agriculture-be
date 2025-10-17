"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChangeOwnership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChangeOwnership.init(
    {
      userId: DataTypes.INTEGER,
      oldOwnerId: DataTypes.INTEGER,
      newOwnerId: DataTypes.INTEGER,
      animalId: DataTypes.INTEGER,
      oldOwnerName: DataTypes.STRING,
      oldOwnerAddress: DataTypes.TEXT,
      oldOwnerFarmRegNo: DataTypes.STRING,
      newOwnerName: DataTypes.STRING,
      newOwnerAddress: DataTypes.TEXT,
      newOwnerFarmRegNo: DataTypes.STRING,
      livestockTagNo: DataTypes.STRING,
      livestockTypeOptionId: DataTypes.STRING,
      animalBreedId: DataTypes.STRING,
      livestockDob: DataTypes.DATE,
      dateOfTransfer: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "change_ownerships",
      modelName: "ChangeOwnership",
    }
  );
  return ChangeOwnership;
};