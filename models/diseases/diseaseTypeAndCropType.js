"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiseaseTypeAndCropType extends Model {
    static associate(models) {
      this.belongsTo(models.Option, {
        as: "crop",
        foreignKey: "cropTypeId",
      });
      this.belongsTo(models.DiseaseType, {
        as: "disease",
        foreignKey: "diseaseTypeId",
      });
    }
  }

  DiseaseTypeAndCropType.init(
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
      diseaseTypeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "DiseaseType",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "disease_type_and_crop_type",
      modelName: "DiseaseTypeAndCropType",
    }
  );

  return DiseaseTypeAndCropType;
};
