"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CacaoLandImages extends Model {
    static associate(models) {
      // define association here
    }
  }
  CacaoLandImages.init(
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
          model: 'CacaoPlantations',
          key: 'id',
        }
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      s3_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "cacao_land_images",
      modelName: "CacaoLandImages",
    }
  );
  return CacaoLandImages;
};