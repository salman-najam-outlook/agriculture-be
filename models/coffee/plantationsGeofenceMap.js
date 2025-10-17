"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlantationsGeofenceMap extends Model {
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
      this.belongsTo(models.Plantations, {
        foreignKey: 'plantation_id',
        targetKey: 'id',
        as: 'plantations'
      });
    }
  }
  PlantationsGeofenceMap.init(
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
      segment_id: {
        type: DataTypes.INTEGER ,
        allowNull: true,
        references: {
          model: 'Geofence',
          key: 'id',
        }
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
      tableName: "plantations_geofence_map",
      modelName: "PlantationsGeofenceMap",
    }
  );
  return PlantationsGeofenceMap;
};