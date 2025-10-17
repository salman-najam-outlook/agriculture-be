"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HorticultureInformationMapData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HorticultureInformationMapData.init(
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
      horticulture_information_id: {
        type: DataTypes.INTEGER ,
        allowNull: false,
        references: {
          model: 'HorticultureInformation',
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
      tableName: "horticulture_information_map_data",
      modelName: "HorticultureInformationMapData",
    }
  );
  return HorticultureInformationMapData;
};