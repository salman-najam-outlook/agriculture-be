const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { successResp, errorResp, serverError, errorRespSync } = require(rootPath +
  '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
  const { Op } = require('sequelize');
const { getCoordinateHash } = require('../../../../helpers/geo-utils');
const { syncFarmerDataToOCC } = require(rootPath + '/helpers/occ-komodo');


// get list of all zones in a farm location
router.get(
  '/zone/:id',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id, search, page, limit } = req.params;
      let where = {  geofenceName: { [Op.not]: null } }; //geofenceName is the only thing differentiating location geofence from zone geofence
      where = id ? { ...where, farmLocationId: id } : where;
      if (search) {
        where = {
          ...where,
          [Op.or]: [
            {
              geofenceName: { [Op.like]: `%${search}%` }
            }
          ]
        };
      }
  
      const query = {
        where
      };
      const countWhere = {
        where
      };
      if (page && limit) {
        query.offset = (page - 1) * limit;
        query.limit = limit;
      }
  
      let result = { totalCount: 0, count: 0, rows: [] };
      result = await db.Geofence.findAndCountAll({
        include: [
          {
            model: db.GeofenceCoordinate,
            as: 'geofence_coordinates'
          }
        ],
        ...query,
      });
  
      let zoneArr = []
  
      zoneArr = result.rows.map(el => el.id)
  

  
      const count = await db.Geofence.count({
        ...countWhere,
      });
      result.totalCount = count;
      result.count = result.rows.length;
    
      return res.json(
        await successResp({
          msg: result != null ? success.FETCH : error.NO_DATA,
          data: result,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.json(errorRespSync({ msg: err.message }));
    }
  }
);

// get all farm location of a farm
router.get(
  '/:farmId',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { farmId } = req.params;
      let where = { farmId, isDeleted: 0 };
      let query = {
        where,
      };

      let result = await db.FarmLocation.findAll({
        include: [
          {
            model: db.user_farm
          },
          {
            model: db.Geofence,
            where: { deletedAt: null, geofenceName: null},
            required: false,
            as: "mainGeofence",
            include: [{
              model: db.GeofenceCoordinate,
              as: "geofence_coordinates"
            }],
          },
        ],
        ...query
      });
    
      return res.json(
        await successResp({
          msg: result != null ? success.FETCH : error.NO_DATA,
          data: result,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

// get a single geofence by geofence id
router.get(
  '/geofence/:id',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id } = req.params;
      let where = { id, deletedAt: null};
      let query = {
        where,
      };

      let result = await db.Geofence.findOne({
        include: [
          {
            model: db.GeofenceCoordinate,
            as: "geofence_coordinates"
          },
          {
            model: db.TreeDetail,
            as: "tree_details",
            attributes:['id','farmId','zoneId']
          },
        ],
        ...query
      });
    
      return res.json(
        await successResp({
          msg: result != null ? success.FETCH : error.NO_DATA,
          data: result,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

// get a the main farmlocation by farmlocation id
router.get(
  '/farmlocation/:id',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id } = req.params;
      let where = { id, isDeleted: 0};
      let query = {
        where,
      };

      let result = await db.FarmLocation.findOne({
        include: [
          {
            model: db.Geofence,
            where: { deletedAt: null, geofenceName: null},
            required: false,
            as: "mainGeofence",
            include: [{
              model: db.GeofenceCoordinate,
              as: "geofence_coordinates"
            }],
          },
        ],
        ...query
      });
    
      return res.json(
        await successResp({
          msg: result != null ? success.FETCH : error.NO_DATA,
          data: result,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

// post farm locaiton only
router.post(
  '/farmlocation',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      //  req.user.id doesnt work here because admin may create the location on user's behest. So get farm's real user, basically check if farm was created by technician or not
      const transaction = await db.sequelize.transaction();
      let createFarmLocationInput = req.body
      let userId
      let farmRes = await db.user_farm.findOne({where: {id: createFarmLocationInput.farmId }})
      userId = farmRes.userId

      const isPrimaryExists = await db.FarmLocation.findOne({
        where: {
          userId,
          farmId: createFarmLocationInput.farmId,
          isDeleted: 0,
          isPrimary: 1,
        },
      });
      let finalInput = {
        ...createFarmLocationInput,
        area:
          createFarmLocationInput.area === ''
            ? 0
            : createFarmLocationInput.area,
        isPrimary: isPrimaryExists ? 0 : 1,
      };
      let locationData = await db.FarmLocation.create({
        ...finalInput,
        userId,
      }, {transaction});
  
      const farmLocationId = locationData.id;
      let locationGeofence = {
        userId,
        farmId: finalInput.farmId,
        farmLocationId,
        geofenceArea: finalInput.area,
        geofenceAreaUOMId: finalInput.areaUomId,
        geofenceParameter: finalInput.parameter,
        geofenceRadius: finalInput.geofenceRadius,
        geofenceCenterLat: finalInput.geofenceCenterLat,
        geofenceCenterLog: finalInput.geofenceCenterLog,
        geofenceParameterUOMId: finalInput.areaUomId,
        coordinateHash:
          createFarmLocationInput.farmLocationGeofence && createFarmLocationInput.farmLocationGeofence.length
            ? getCoordinateHash(createFarmLocationInput.farmLocationGeofence)
            : getCoordinateHash({
                lat: finalInput.geofenceCenterLat,
                log: finalInput.geofenceCenterLog,
                radius: finalInput.geofenceRadius,
              }),
      };
  
      const geofence = await db.Geofence.create(locationGeofence, {
        transaction,
      });
  
      let locationGeofenceCoordinates =
        createFarmLocationInput.farmLocationGeofence;
  
      if (
        locationGeofenceCoordinates &&
        locationGeofenceCoordinates.length > 0
      ) {
        const farmCoordinates = locationGeofenceCoordinates.map((data) => {
          const { lat, log } = data;
          return {
            geoFenceId: geofence.id, // mind the geoFenceId camel case in GeofenceCoordinate
            lat,
            log,
          };
        });
  
        await db.GeofenceCoordinate.bulkCreate(farmCoordinates, {
          transaction,
        });
      }
      await transaction.commit()
  
      return res.json(
        await successResp({
          msg: locationData != null ? success.FETCH : error.NO_DATA,
          data: locationData,
        })
      );
    } catch (error) {
      await transaction.rollback()
      logErrorOccurred(__filename, error);
      return serverError(res, error);
    }
  }
);

// put farm locaiton only
router.put(
  '/farmlocation/:locationId',
  auth,
  validationErrorHandler,
  async (req, res) => {
    let {locationId} = req.params
    let updateFarmLocationInput = req.body
    let transaction = await db.sequelize.transaction();
    try {
      let farmLocationSet = {
        address: updateFarmLocationInput.address,
        area: updateFarmLocationInput.area,
        city: updateFarmLocationInput.city,
        areaUomId: updateFarmLocationInput.areaUomId,
        country: updateFarmLocationInput.country,
        farmNumber: updateFarmLocationInput.farmNumber,
        lat: updateFarmLocationInput.lat,
        log: updateFarmLocationInput.log,
        parameter: updateFarmLocationInput.parameter,
        state: updateFarmLocationInput.state,
        street: updateFarmLocationInput.street,
        geofenceRadius:  updateFarmLocationInput?.geofenceRadius,
        geofenceCenterLat:  updateFarmLocationInput?.geofenceCenterLat,
        geofenceCenterLog:  updateFarmLocationInput?.geofenceCenterLog,

      }
      await db.FarmLocation.update(
        { ...farmLocationSet },
        {
          where: { id: locationId },
          transaction,
        },
      );

      // const farmLocationId = updateFarmLocationInput.id;
      let locationGeofence = {
        // id: updateFarmLocationInput.geofenceId,
        geofenceArea: updateFarmLocationInput.area,
        geofenceAreaUOMId: updateFarmLocationInput.areaUomId,
        geofenceParameter: updateFarmLocationInput.parameter,
        geofenceParameterUOMId: updateFarmLocationInput.areaUomId,
        geofenceRadius:  updateFarmLocationInput?.geofenceRadius,
        geofenceCenterLat:  updateFarmLocationInput?.geofenceCenterLat,
        geofenceCenterLog:  updateFarmLocationInput?.geofenceCenterLog,
      };

      await db.Geofence.update(locationGeofence, {
        where: {  id: updateFarmLocationInput.mainGeofence.id },
        transaction: transaction,
      });

      let locationGeofenceCoordinates =
        updateFarmLocationInput.mainGeofence.geofence_coordinates;

      if (locationGeofenceCoordinates?.length) {
        await db.GeofenceCoordinate.destroy({
          where: {
            geofenceId: updateFarmLocationInput.mainGeofence.id,
          },
          transaction,
        });

        const farmCoordinates = locationGeofenceCoordinates.map((data) => {
          const { lat, log } = data;
          return {
            geoFenceId: updateFarmLocationInput.mainGeofence.id,
            lat,
            log,
          };
        });

        await db.GeofenceCoordinate.bulkCreate(farmCoordinates, {
          transaction,
        });
      }
      await transaction.commit();
      
      return res.json(
        await successResp({
          msg: updateFarmLocationInput ? success.UPDATED : error.NOT_FOUND,
            data: updateFarmLocationInput
        })
      );
    } catch (err) {
      await transaction.rollback();

      logErrorOccurred(__filename, error);
      return serverError(res, error);
    }
    return;
  }
);


module.exports = router;
