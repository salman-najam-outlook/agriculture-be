"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PestTypeAndCropType extends Model {
    static associate(models) {
      this.belongsTo(models.Option, {
        as: "crop",
        foreignKey: "cropTypeId",
      });
      this.belongsTo(models.PestType, {
        as: "pest",
        foreignKey: "pestTypeId",
      });
    }
  }

  PestTypeAndCropType.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cropTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "options",
          key: "id",
        },
      },
      pestTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "PestType",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "pest_type_and_crop_type",
      modelName: "PestTypeAndCropType",
    }
  );

  return PestTypeAndCropType;
};
