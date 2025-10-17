"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SeedlingsShadeTreeMapData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SeedlingsShadeTreeMapData.init(
    {
      id: {
        type: DataTypes.INTEGER ,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      seedling_id: {
        type: DataTypes.INTEGER ,
        allowNull: false,
        references: {
          model: 'Seedlings',
          key: 'id',
        }
      },
      shade_tree_id: {
        type: DataTypes.INTEGER ,
        allowNull: false,
        references: {
          model: 'ShadeTree',
          key: 'id',
        }
      },
      number_of_trees: {
        type: DataTypes.INTEGER,
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
      tableName: "seedlings_shade_tree_map_data",
      modelName: "SeedlingsShadeTreeMapData",
    }
  );
  return SeedlingsShadeTreeMapData;
};