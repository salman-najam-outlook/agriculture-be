"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PestInfestationSymptom extends Model {
    static associate(models) {
      this.belongsTo(models.PestType, { foreignKey: "pestTypeId" });
    }
  }

  PestInfestationSymptom.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      pestTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "PestType",
          key: "id",
        },
      },
      name: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "pest_infestation_symptoms",
      modelName: "PestInfestationSymptom",
    }
  );

  return PestInfestationSymptom;
};
