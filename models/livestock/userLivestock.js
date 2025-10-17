"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userLiveStock extends Model {
    static associate(models) {
    }
  }
  userLiveStock.init(
    {
      displayName: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      livestock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "livestock",
          key: "id",
        },
      },
      breed: {
        type: DataTypes.INTEGER,
        references: {
          model: "livestock_breed",
          key: "id",
        },
      },
      stage: {
        type: DataTypes.INTEGER,
        references: {
          model: "livestock_stage",
          key: "id",
        },
      },
      dam: {
        type: DataTypes.INTEGER,
        references: {
          model: "user_livestock",
          key: "id",
        },
      },
      surrogate: {
        type: DataTypes.INTEGER,
        references: {
          model: "user_livestock",
          key: "id",
        },
      },
      sire: {
        type: DataTypes.INTEGER,
        references: {
          model: "user_livestock",
          key: "id",
        },
      },
      tagNumber: {
        type: DataTypes.STRING,
      },
      identificationNumber: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM({
          values: ["male", "female", "other"],
        }),
      },
      dateOfBirth: {
        type: DataTypes.DATE,
      },
      weight: DataTypes.DECIMAL,
      group: {
        type: DataTypes.INTEGER,
        references: {
          model: "livestock_group",
          key: "id",
        },
      },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userLiveStock",
      tableName: "user_livestock",
    }
  );
  return userLiveStock;
};
