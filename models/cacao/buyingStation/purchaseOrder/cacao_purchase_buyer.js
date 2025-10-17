"use strict";
const moment = require("moment");
const _ = require("lodash");
const { v4: uuid } = require('uuid');
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CacaoCoffeePurchaseBuyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  CacaoCoffeePurchaseBuyer.init(
    {
     name: DataTypes.STRING,
     buyer_belong_to: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "cacao_purchase_buyers",
      modelName: "CacaoCoffeePurchaseBuyer",
    }
  );
  return CacaoCoffeePurchaseBuyer;
};
