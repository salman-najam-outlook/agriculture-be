'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TreeType extends Model {
    static associate(models) {
      // Define associations here
      this.hasMany(models.TreeSpecies, {
        foreignKey: 'tree_type_id',
        as: 'species'
      });
    }
  }

  TreeType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'TreeType',
      tableName: 'tree_type',
      timestamps: true, 
    }
  );

  return TreeType;
};