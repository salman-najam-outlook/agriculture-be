"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Soil_prep_activity extends Model {
    static associate(models) {
      this.hasMany(models.Soil_prep_practice, { foreignKey: "activityId" });
      this.belongsTo(models.user, { as: "users", foreignKey: "userId" });
    }
  }
  Soil_prep_activity.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "soil_prep_activity",
      modelName: "Soil_prep_activity",
    }
  );
  return Soil_prep_activity;
};
