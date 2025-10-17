"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CacaoPlantationsUserFarmsMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user_farm, {
        foreignKey: 'farm_id',
        targetKey: 'id',
        as: 'userFarms'
      });
      this.belongsTo(models.CacaoPlantations, {
        foreignKey: 'plantation_id',
        targetKey: 'id',
        as: 'plantations'
      });
    }
  }
  CacaoPlantationsUserFarmsMap.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      plantation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CacaoPlantations',
          key: 'id',
        }
      },
      farm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user_farm',
          key: 'id',
        }
      }
    },
    {
      sequelize,
      tableName: "cacao_plantations_user_farms_map",
      modelName: "CacaoPlantationsUserFarmsMap",
    }
  );
  return CacaoPlantationsUserFarmsMap;
};