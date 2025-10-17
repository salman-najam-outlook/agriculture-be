"use strict";
const { Model } = require("sequelize");
const Soil_prep_practice_geofences = require(`${rootPath}/models/soil_prep_practice_geofences.js`);
const MapWeedGeofences = require(`${rootPath}/models/weed/map_weed_geofences.js`)
const MapUserGoalGeofences = require(`${rootPath}/models/map_user_goal_geofences.js`)
const MapSoilFertilityAuditGeofences = require(`${rootPath}/models/soilfertility/map_soil_fertility_audit_geofences.js`)
const GeofenceCoordinate = require(`${rootPath}/models/geofenceCoordinate.js`)
const MapPlantingGeofencing = require(`${rootPath}/models/mapPlantingGeofencing.js`)
const surveyQuestionsResponse = require(`${rootPath}/models/surveyQuestionsResponse.js`)
const EquipmentUserSegment = require(`${rootPath}/models/equipment/equipmentUserSegment.js`)
const MapSowingGeofences = require(`${rootPath}/models/map_sowing_geofences.js`)
const MapHarvestingGeofencing = require(`${rootPath}/models/mapHarvestingGeofencing.js`)
const MapSoilpreparationGeofence = require(`${rootPath}/models/mapSoilpreparationGeofence.js`)

module.exports = (sequelize, DataTypes) => {
  class Geofence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Soil_prep_practice, {
        as: 'participants',
        through: models.Soil_prep_practice_geofences,
        foreignKey: 'geofenceId'
      });
      this.belongsTo(models.user_farm, {
        foreignKey: 'farmId',
        as: 'farms'
      });
      this.belongsTo(models.FarmLocation, {
        foreignKey: 'farmLocationId'
      });
      this.hasMany(models.GeofenceCoordinate, {
        foreignKey:'geoFenceId',
        as:'geofence_coordinates'
      });
      this.hasMany(models.TreeDetail, {
        foreignKey:'zoneId',
        as:'tree_details'
      })
      this.hasMany(models.MyTree, {
        foreignKey:'zone_id',
      })
    }
  }
  Geofence.init(
    {
      userId: DataTypes.INTEGER,
      farmId: DataTypes.INTEGER,
      //farmName: DataTypes.STRING,
      recordId: DataTypes.STRING,
      farmAddress: DataTypes.TEXT,
      walkAndMeasure: DataTypes.BOOLEAN,
      geofenceName: DataTypes.STRING,
      geofenceArea: DataTypes.FLOAT,
      geofenceAreaUOMId: DataTypes.INTEGER,
      farmLocationId: DataTypes.INTEGER,
      geofenceParameter: DataTypes.FLOAT,
      geofenceParameterUOMId: DataTypes.INTEGER,
      geofenceCategory: DataTypes.STRING,
      geofenceRadius: DataTypes.DOUBLE,
      geofenceCenterLat: DataTypes.DOUBLE,
      geofenceCenterLog: DataTypes.DOUBLE,
      isPrimary: DataTypes.BOOLEAN,
      dimitraGeofenceId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      coordinateHash: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      tableName: "geofences",
      modelName: "Geofence",
      deletedAt: 'deletedAt'
    }
  );
  //Delete Hooks (Work only in instance method)
  Geofence.beforeDestroy(async geofenceInstance => {
    return Promise.all([
      Soil_prep_practice_geofences(sequelize, DataTypes).destroy({
        where: {
          geofenceId: geofenceInstance.id
        }
      }),
      MapWeedGeofences(sequelize, DataTypes).destroy({
        where: {
          geofenceId: geofenceInstance.id
        }
      }),

      MapUserGoalGeofences(sequelize, DataTypes).destroy({
        where: {
          geoFenceId: geofenceInstance.id
        }
      }),

      MapSoilFertilityAuditGeofences(sequelize, DataTypes).destroy({
        where: {
          geofenceId: geofenceInstance.id
        }
      }),

      GeofenceCoordinate(sequelize, DataTypes).destroy({
        where: {
          geoFenceId: geofenceInstance.id
        }
      }),

      MapPlantingGeofencing(sequelize, DataTypes).destroy({
        where: {
          geoFenceId: geofenceInstance.id
        }
      }),

      surveyQuestionsResponse(sequelize, DataTypes).update({
        deletedAt: new Date()
      }, {
        where: {
          geofenceId: geofenceInstance.id
        }
      }),

      EquipmentUserSegment(sequelize, DataTypes).destroy({
        where: {
          geoFenceID: geofenceInstance.id
        }
      }),

      MapSowingGeofences(sequelize, DataTypes).destroy({
        where: {
          geofenceId: geofenceInstance.id
        }
      }),

      MapHarvestingGeofencing(sequelize, DataTypes).destroy({
        where: {
          geoFenceId: geofenceInstance.id
        }
      }),

      MapSoilpreparationGeofence(sequelize, DataTypes).destroy({
        where: {
          geoFenceId: geofenceInstance.id
        }
      })
    ])
  })

  //Restore hooks (Works only instance methods)
  Geofence.addHook('afterRestore', 'handleRestoredData', (geofenceInstance) => {
    return Promise.all([
      Soil_prep_practice_geofences(sequelize, DataTypes).restore({
        where: {
          geofenceId: geofenceInstance.id
        }
      }),
      MapWeedGeofences(sequelize, DataTypes).restore({
        where: {
          geofenceId: geofenceInstance.id
        }
      }),
      MapUserGoalGeofences(sequelize, DataTypes).restore({
        where: {
          geoFenceId: geofenceInstance.id
        }
      }),
      MapSoilFertilityAuditGeofences(sequelize, DataTypes).restore({
        where: {
          geofenceId: geofenceInstance.id
        }
      }),
      GeofenceCoordinate(sequelize, DataTypes).restore({
        where: {
          geoFenceId: geofenceInstance.id
        }
      }),
      MapPlantingGeofencing(sequelize, DataTypes).restore({
        where: {
          geoFenceId: geofenceInstance.id
        }
      }),
      EquipmentUserSegment(sequelize, DataTypes).restore({
        where: {
          geoFenceID: geofenceInstance.id
        }
      }),
      MapSowingGeofences(sequelize, DataTypes).restore({
        where: {
          geofenceId: geofenceInstance.id
        }
      }),
      MapHarvestingGeofencing(sequelize, DataTypes).restore({
        where: {
          geoFenceId: geofenceInstance.id
        }
      }),
      MapSoilpreparationGeofence(sequelize, DataTypes).restore({
        where: {
          geoFenceId: geofenceInstance.id
        }
      })
    ])
  })

  return Geofence;
};
