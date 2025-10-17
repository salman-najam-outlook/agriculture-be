"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CroptypeRejection extends Model {

    static associate(models) {
      this.belongsTo(models.Crop, {
        foreignKey: "cropTypeId",
        as: "cropType",
    });
    }
  }

  CroptypeRejection.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    croptypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "options",
        key: "id"
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: "croptype_rejection",
    modelName: "CroptypeRejection"
  });

  return CroptypeRejection;
};
