"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiseaseDetection extends Model {
    static associate(models) {

      this.hasMany(models.DiseaseDetectionImages, {
        foreignKey: 'disease_detect_id',
        as: 'diseaseDetectionImages',
      })

    }
  }

  DiseaseDetection.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cropTypeId: {
        type: DataTypes.STRING(100),
      },
      primaryAccuracy: DataTypes.FLOAT,
      primaryClass: DataTypes.STRING(250),
      primaryInfoLink: DataTypes.STRING(250),
      primaryClassId: DataTypes.STRING(100),
      primaryClassImage: DataTypes.STRING(250),
      secondaryAccuracy: DataTypes.FLOAT,
      secondaryClass: DataTypes.STRING(250),
      secondaryInfoLink: DataTypes.STRING(250),
      secondaryClassId: DataTypes.STRING(100),
      secondaryClassImage: DataTypes.STRING(250),
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: "disease_detection",
      modelName: "DiseaseDetection",
    }
  );

  return DiseaseDetection;
};
