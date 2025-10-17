"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiseaseDetectionImages extends Model {
    static associate(models) {
  
    }
  }

  DiseaseDetectionImages.init(
    {
      id: {
        type: DataTypes.INTEGER ,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      disease_detect_id: {
        type: DataTypes.INTEGER ,
        allowNull: false,
        references: {
          model: 'DiseaseDetection',
          key: 'id',
        }
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      s3_key: {
        type: DataTypes.STRING,
        allowNull: true,
      },
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
      tableName: "disease_detection_images",
      modelName: "DiseaseDetectionImages",
    }
  );

  return DiseaseDetectionImages;
};
