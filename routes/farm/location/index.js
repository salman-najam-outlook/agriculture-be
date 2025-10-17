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
const { getCoordinateHash } = require('../../../helpers/geo-utils');
  // post farm locaiton zone
router.post(
  '/zone',
  auth,
  validationErrorHandler,
  async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      let createLocationZoneInput = req.body
      let originalFarmId, originalLocationId, farmRes;
      let userId = req.user.id;

      if(createLocationZoneInput.farmId < 1) {
        farmRes = await db.user_farm.findOne({where: {recordId: createLocationZoneInput.farmRecordId }})
        userId = farmRes?.userId
        if(farmRes?.isTechnician){
          userId = farmRes?.technicianId;
        }
        originalFarmId = farmRes?.id
      } else {
        farmRes = await db.user_farm.findOne({where: {id: createLocationZoneInput.farmId }})
        userId = farmRes.get('userId')
        if(farmRes.get('isTechnician') && +farmRes.get('technicianId')) {
          userId = farmRes.get('technicianId');
        }
        originalFarmId = farmRes.id
      }

      let locationRes;
      if(createLocationZoneInput.locationId < 1) {
        locationRes = await db.FarmLocation.findOne({where: {recordId: createLocationZoneInput.locationRecordId }})
        originalLocationId = locationRes?.id
      } else {
        locationRes = await db.FarmLocation.findOne({where: {id: createLocationZoneInput.locationId }})
        originalLocationId = locationRes.id
      }

      
      const isPrimaryExists = await db.Geofence.findOne({
          where: {
            userId,
            farmLocationId: locationRes.id,
            deletedAt: null,
            isPrimary: 1,
          },
        });


      let locationGeofence = {
        userId: req.user.id,
        farmId: createLocationZoneInput.farmId,
        farmLocationId: createLocationZoneInput.locationId,
        geofenceName: createLocationZoneInput.geofenceName,
        geofenceCategory: createLocationZoneInput.geofenceCategory,
        geofenceArea: createLocationZoneInput.area,
        geofenceAreaUOMId: createLocationZoneInput.areaUomId,
        geofenceParameter: createLocationZoneInput.parameter,
        geofenceParameterUOMId: createLocationZoneInput.areaUomId,
        geofenceRadius:  createLocationZoneInput.geofenceRadius,
        geofenceCenterLat:  createLocationZoneInput.geofenceCenterLat,
        geofenceCenterLog:  createLocationZoneInput.geofenceCenterLog,
        isPrimary: isPrimaryExists ? 0 : 1,
        recordId: createLocationZoneInput.recordId,
        coordinateHash:
          createLocationZoneInput.geofenceCoordinates && createLocationZoneInput.geofenceCoordinates.length
            ? getCoordinateHash(createLocationZoneInput.geofenceCoordinates)
            : getCoordinateHash({
                lat: createLocationZoneInput.geofenceCenterLat,
                log: createLocationZoneInput.geofenceCenterLog,
                radius: createLocationZoneInput.geofenceRadius,
              }),
      };


      locationGeofence = {...locationGeofence,farmId:originalFarmId , farmLocationId: originalLocationId}
  
      const geofence = await db.Geofence.create(locationGeofence, {
        transaction,
      });

      let locationGeofenceCoordinates =
      createLocationZoneInput.geofenceCoordinates;

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
          msg: geofence != null ? success.SAVED : error.NO_DATA,
          data: geofence,
        })
      );
    } catch (error) {
      await transaction.rollback()
      logErrorOccurred(__filename, error);
      return serverError(res, error);
    }
  }
);

  // put farm locaiton zone
  router.put(
    '/zone/:zoneId',
    auth,
    validationErrorHandler,
    async (req, res) => {
      const transaction = await db.sequelize.transaction();
      let createLocationZoneInput = req.body
      let {zoneId} = req.params

      let locationGeofence = {
        userId: req.user.id,
        farmId: createLocationZoneInput.farmId,
        farmLocationId: createLocationZoneInput.locationId,
        geofenceName: createLocationZoneInput.geofenceName,
        geofenceCategory: createLocationZoneInput.geofenceCategory,
        geofenceArea: createLocationZoneInput.area,
        geofenceAreaUOMId: createLocationZoneInput.areaUomId,
        geofenceParameter: createLocationZoneInput.parameter,
        geofenceParameterUOMId: createLocationZoneInput.areaUomId,
        geofenceRadius:  createLocationZoneInput.geofenceRadius,
        geofenceCenterLat:  createLocationZoneInput.geofenceCenterLat,
        geofenceCenterLog:  createLocationZoneInput.geofenceCenterLog,
        isPrimary: createLocationZoneInput.isPrimary ?? 0
      };
  
      const geofence = await db.Geofence.update(locationGeofence, {
        where: {  id: zoneId },
        transaction,
      });

      let locationGeofenceCoordinates =
      createLocationZoneInput.geofenceCoordinates;

    if (
      locationGeofenceCoordinates &&
      locationGeofenceCoordinates.length > 0
    ) {
      const farmCoordinates = locationGeofenceCoordinates.map((data) => {
        const { lat, log } = data;
        return {
          lat,
          log,
        };
      });

    await db.GeofenceCoordinate.destroy({
        where: {
          geofenceId: zoneId,
        },
        transaction,
      });

      await db.GeofenceCoordinate.bulkCreate(farmCoordinates, {
        transaction,
      });
    }

    
      await transaction.commit()
  
      return res.json(
        await successResp({
          msg: createLocationZoneInput != null ? success.SAVED : error.NO_DATA,
          data: createLocationZoneInput,
        })
      );
    }
  );

// post farm locaiton only
router.post(
    '/',
    auth,
    validationErrorHandler,
    async (req, res) => {
      //  req.user.id doesnt work here because admin may create the location on user's behest. So get farm's real user, basically check if farm was created by technician or not
      const transaction = await db.sequelize.transaction();
      try {
        let createFarmLocationInput = req.body
        let existingFarmId, farmRes, userId

        
      // handle farm and location offline case
      // when user creates both farm and location on offline mode, use recordId instead

        if(createFarmLocationInput.farmId < 1) {
           farmRes = await db.user_farm.findOne({where: {recordId: createFarmLocationInput.farmRecordId }})
           userId = farmRes?.userId
           if(farmRes?.isTechnician){
            userId = farmRes?.technicianId;
          }
           existingFarmId = farmRes?.id
        } else {
          farmRes = await db.user_farm.findOne({where: {id: createFarmLocationInput.farmId }})
          userId = farmRes?.userId
          if(farmRes?.isTechnician){
            userId = farmRes?.technicianId;
          }
          existingFarmId = farmRes.id
        }

        const isPrimaryExists = await db.FarmLocation.findOne({
          where: {
            userId,
            farmId: existingFarmId,
            isDeleted: 0,
            isPrimary: 1,
          },
        });
        let finalInput = {
          ...createFarmLocationInput,
          farmId:existingFarmId,
          area: isPrimaryExists ?
           ( createFarmLocationInput.area === ''
              ? 0
              : createFarmLocationInput.area) : null,
          parameter: isPrimaryExists ?
          ( createFarmLocationInput.parameter === ''
              ? 0
              : createFarmLocationInput.parameter) : null,
          isPrimary: isPrimaryExists ? 0 : 1,
        };
        let locationData = await db.FarmLocation.create({
          ...finalInput,
          userId,
        }, {transaction});
    
        const farmLocationId = locationData.id;
        let locationGeofence = {
          userId,
          farmId: existingFarmId || finalInput.farmId,
          farmLocationId,
          geofenceArea: finalInput.area,
          geofenceAreaUOMId: finalInput.areaUomId,
          geofenceParameter: finalInput.parameter,
          geofenceParameterUOMId: finalInput.areaUomId,
          geofenceRadius:  finalInput.geofenceRadius,
          geofenceCenterLat:  finalInput.geofenceCenterLat,
          geofenceCenterLog:  finalInput.geofenceCenterLog,
          isPrimary: true,
          recordId: finalInput.zoneRecordId || new Date().getTime(),
          coordinateHash: createFarmLocationInput.farmLocationGeofence && createFarmLocationInput.farmLocationGeofence.length
            ? getCoordinateHash(createFarmLocationInput.farmLocationGeofence)
            : getCoordinateHash({
                lat: finalInput.geofenceCenterLat,
                log: finalInput.geofenceCenterLog,
                radius: finalInput.geofenceRadius,
              }),
        };


        if(createFarmLocationInput.farmId < 1) {
          farmRes = await db.user_farm.findOne({where: {recordId: createFarmLocationInput.farmRecordId }})
          userId = farmRes?.userId
          if(farmRes?.isTechnician){
            userId = farmRes?.technicianId;
          }
          existingFarmId = farmRes?.id
       } else {
         farmRes = await db.user_farm.findOne({where: {id: createFarmLocationInput.farmId }})
         userId = farmRes?.userId
         if(farmRes?.isTechnician){
            userId = farmRes?.technicianId;
          }
         existingFarmId = farmRes.id
       }
    
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
            msg: locationData != null ? success.SAVED : error.NO_DATA,
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
    '/:locationId',
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
          geofenceRadius:  updateFarmLocationInput.geofenceRadius,
          geofenceCenterLat:  updateFarmLocationInput.geofenceCenterLat,
          geofenceCenterLog:  updateFarmLocationInput.geofenceCenterLog,
  
        }
        await db.FarmLocation.update(
          { ...farmLocationSet },
          {
            where: { id: locationId },
            transaction,
          },
        );

        //update farm user_farm data also
        if(updateFarmLocationInput.isPrimary && updateFarmLocationInput.farmId) {
          await db.user_farm.update(
            { 
              address: updateFarmLocationInput.address,
              area: updateFarmLocationInput.area,
              city: updateFarmLocationInput.city,
              country: updateFarmLocationInput.country,
              lat: updateFarmLocationInput.lat,
              log: updateFarmLocationInput.log,
              parameter: updateFarmLocationInput.parameter,
              state: updateFarmLocationInput.state,
              street: updateFarmLocationInput.street,
             },
            {
              where: { id: updateFarmLocationInput.farmId },
              transaction,
            },
          )
        }
  
        // const farmLocationId = updateFarmLocationInput.id;
        let locationGeofence = {
          // id: updateFarmLocationInput.geofenceId,
          geofenceArea: updateFarmLocationInput.area,
          geofenceAreaUOMId: updateFarmLocationInput.areaUomId,
          geofenceParameter: updateFarmLocationInput.parameter,
          geofenceParameterUOMId: updateFarmLocationInput.areaUomId,
          geofenceRadius:  updateFarmLocationInput.geofenceRadius,
          geofenceCenterLat:  updateFarmLocationInput.geofenceCenterLat,
          geofenceCenterLog:  updateFarmLocationInput.geofenceCenterLog,
        };
  
        await db.Geofence.update(locationGeofence, {
          where: {  id: updateFarmLocationInput.geofenceId },
          transaction: transaction,
        });
  
        let locationGeofenceCoordinates =
          updateFarmLocationInput.farmLocationGeofence;
  
        if (locationGeofenceCoordinates?.length) {
          await db.GeofenceCoordinate.destroy({
            where: {
              geofenceId: updateFarmLocationInput.geofenceId,
            },
            transaction,
          });
  
          const farmCoordinates = locationGeofenceCoordinates.map((data) => {
            const { lat, log } = data;
            return {
              geoFenceId: updateFarmLocationInput.geofenceId,
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
    }
  );



  module.exports = router;
