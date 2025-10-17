"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CropObservationSpecialOperationPractice extends Model {
    static associate(models) {}
  }
  CropObservationSpecialOperationPractice.init(
    {
      cropTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "options",
          key: "id",
        },
        allowNull: false,
      },
      practice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      hindi: {
        type: DataTypes.STRING,
      },
      marathi: {
        type: DataTypes.STRING,
      },
      nepali: {
        type: DataTypes.STRING,
      },
      spanish: {
        type: DataTypes.STRING,
      },
      indonesian: {
        type: DataTypes.STRING,
      },
      arabic: {
        type: DataTypes.STRING,
      },
      portugese: {
        type: DataTypes.STRING,
      },
      french: {
        type: DataTypes.STRING,
      },
      swahili: {
        type: DataTypes.STRING,
      },
      bengali: {
        type: DataTypes.STRING,
      },
      oromo: {
        type: DataTypes.STRING,
      },
      somali: {
        type: DataTypes.STRING,
      },
      amharic: {
        type: DataTypes.STRING,
      },
      vietnamese: {
        type: DataTypes.STRING,
      },
      turkish: {
        type: DataTypes.STRING,
      },
      greek: {
        type: DataTypes.STRING,
      },
      dutch: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "CropObservationSpecialOperationPractice",
      tableName: "crop_observation_special_operation_practice",
    }
  );
  return CropObservationSpecialOperationPractice;
};
