"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SeedlingsWindBreakerTreeMapData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SeedlingsWindBreakerTreeMapData.init(
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
      wind_breaker_tree_id: {
        type: DataTypes.INTEGER ,
        allowNull: false,
        references: {
          model: 'WindBreaker',
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
      tableName: "seedlings_wind_breaker_tree_map_data",
      modelName: "SeedlingsWindBreakerTreeMapData",
    }
  );
  return SeedlingsWindBreakerTreeMapData;
};