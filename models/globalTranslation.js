'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GlobalTranslation extends Model {
    static associate(models) {}
  }
  GlobalTranslation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      english: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hindi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marathi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nepali: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      spanish: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      indonesian: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arabic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      portugese: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      french: {
        type: DataTypes.STRING,
        allowNull: false,
      },     
      swahili: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bengali: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      oromo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      somali: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amharic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vietnamese: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      turkish: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      greek: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dutch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      italian: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'GlobalTranslation',
      tableName: 'global_translation_metadata',
    },
  );
  return GlobalTranslation;
};
