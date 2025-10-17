"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CoffeeLandImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CoffeeLandImages.init(
    {
      id: {
        type: DataTypes.INTEGER ,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      plantation_id: {
        type: DataTypes.INTEGER ,
        allowNull: false,
        references: {
          model: 'Plantations',
          key: 'id',
        }
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mediaType: {
        type: DataTypes.ENUM(['image', 'video']),
        allowNull: true,
      },
      s3_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      tableName: "coffee_land_images",
      modelName: "CoffeeLandImages",
    }
  );
  return CoffeeLandImages;
};