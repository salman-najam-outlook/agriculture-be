"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FarmReport extends Model {
    static associate(models) {
        this.belongsTo(models.user_farm, {
            foreignKey: 'farmId',
            as: 'user_farm'
          });
    }
  }

  FarmReport.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      farmId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user_farm",
          key: "id",
        },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "farm_reports",
      modelName: "FarmReport",
    }
  );

  return FarmReport;
};
