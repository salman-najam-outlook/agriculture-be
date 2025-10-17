"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CacaoPlantationsGeofenceMap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Geofence, {
        foreignKey: 'segment_id',
        targetKey: 'id',
        as: 'segments'
      });
      this.belongsTo(models.CacaoPlantations, {
        foreignKey: 'plantation_id',
        targetKey: 'id',
        as: 'plantations'
      });
    }
  }
  CacaoPlantationsGeofenceMap.init(
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
      segment_id: {
        type: DataTypes.INTEGER ,
        allowNull: true,
        references: {
          model: 'Geofence',
          key: 'id',
        }
      },
    },
    {
      sequelize,
      tableName: "cacao_plantations_geofence_map",
      modelName: "CacaoPlantationsGeofenceMap",
    }
  );
  return CacaoPlantationsGeofenceMap;
};