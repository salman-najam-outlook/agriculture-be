'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ManageTreesVarieties extends Model {
    static associate(models) {}
  }
  ManageTreesVarieties.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      manage_trees_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'manage_trees',
          key: 'id',
        },
      },
      coffee_variety_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'coffee_variety',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'ManageTreesVarieties',
      tableName: 'manage_trees_varieties',
    }
  );
  return ManageTreesVarieties;
};
