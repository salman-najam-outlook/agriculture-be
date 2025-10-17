const db = require(rootPath + "/models");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const Queue = require('bull');
const axios = require("axios")
const { Op } = require('sequelize');
const { v4: uuid } = require('uuid');
const { getCoordinateHash } = require('../geo-utils');

const createGeofenceQueue = new Queue('createGeofenceQueue', {
  redis: {
      maxRetriesPerRequest: null,
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || '',
  },
});
const createGeofenceCoordsQueue = new Queue('createGeofenceCoordsQueue', {
  redis: {
      maxRetriesPerRequest: null,
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || '',
  },
});

createGeofenceQueue.process(async function (job, done) {
  try {

    // call livestock farm sync graphql service to post farm
    delete job.data.geoFenceData.createdAt
    delete job.data.geoFenceData.updatedAt
    job.data.geoFenceData.syncId = job.data.geoFenceData?.id
    // delete job.data.geoFenceData.id
    const endpoint = process.env.LIVESTOCK_SYNC_URL || "http://localhost:4043/graphql";
    const headers = {
      "content-type": "application/json",
        // "Authorization": "<token>"
    };
    let query = `mutation {
      createGeofence(createGeofenceInput: {`

      for(let key in job.data.geoFenceData) {
        if(job.data.geoFenceData[key]) {
          if(isNaN(job.data.geoFenceData[key])) {
            query += `
              ${key}: "${job.data.geoFenceData[key]}",`
          } else {
            query += `
            ${key}: ${parseInt(job.data.geoFenceData[key])},`
          }
        
        }
      }
      query += `}  
          ) {
        id
      }
      }`
    const graphqlQuery = {
      // "operationName": "fetchAuthor",
      query: query,
      variables: job.data.geoFenceData,
    };

    const response = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: graphqlQuery
    });

          
    done(null, 'console result')
    job.progress(100)
  } catch (error) {
    // create farm queue failed
    done(null, 'res')
    console.log(error)
  }

});
createGeofenceCoordsQueue.process(async function (job, done) {
  try {

    // call livestock farm sync graphql service to post farm

    const endpoint = process.env.LIVESTOCK_SYNC_URL || "http://localhost:4043/graphql";
    const headers = {
      "content-type": "application/json",
        // "Authorization": "<token>"
    };
    let query = `mutation {
      createManyGeofenceCoords(createGeofenceInputArr: { geoFenceCoords:`
      query += JSON.stringify(job.data.geoFenceCoordData).replace(/"/g, '')

      query += `}  
          ) {
        id
      }
      }`
    const graphqlQuery = {
      // "operationName": "fetchAuthor",
      query: query,
      variables: job.data.geoFenceCoordData,
    };

    const response = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: graphqlQuery
    });

          
    done(null, 'console result')
    job.progress(100)
  } catch (error) {
    // create farm queue failed
    done(null, 'res')
    console.log(error)
  }

});
/**
 * @desc update segments details of the farm
 */
exports.updateFarmSegment = async ({ id, req }, transaction) => {
  // update farm segments

  const userId = req.user.id;
  const {
    farmId,
    coordinates,
    geofenceName,
    geofenceArea,
    geofenceAreaUOMId,
    geofenceParameter,
    geofenceParameterUOMId,
    geofenceCategory,
    geofenceRadius,
    geofenceCenterLat,
    geofenceCenterLog,
    
  } = req.body;
  let set = {
    farmId,
    geofenceName,
    geofenceArea,
    geofenceAreaUOMId,
    geofenceParameter,
    geofenceParameterUOMId,
    geofenceCategory,
    geofenceRadius,
    geofenceCenterLat,
    geofenceCenterLog,
  };
  // remove undefined values before inserting
  Object.keys(set).forEach((key) => {
    set[key] == undefined || set[key] == null ? delete set[key] : {};
  });
  // update geofencing data
  let geofence = await db.Geofence.update(set, {
    where: { id },
  });

  if (notEmpty(coordinates)) {
    // Add geofence id with lat and log
    let geofenceCoordinate = coordinates.map((element) => {
      element.geoFenceId = id;
      return element;
    });
    // Delete old coordinated of geofencing
    await db.GeofenceCoordinate.destroy(
      {
        where: {
          geoFenceId: id,
        },
      }
    );
    // insert new coordinate of geofencing
    await db.GeofenceCoordinate.bulkCreate(geofenceCoordinate);
  }
  return true;
};

exports.createCircularGeofence = async ({ farmId, req, isPrimary, locationId }) => {
  // creating farm segments
  const { segments, recordId : farmPostRecordId } = req.body;
  const userId = req.user.id;

  recordAlreadyExists = await db.Geofence.findAll({
    where: {
      recordId: {
        [Op.eq]: farmPostRecordId
      }
    }
  })
  if(recordAlreadyExists.length > 0) {
    throw new Error("Farm recordId already exists")
  }
  // have to do this because segment creation data structure is different
  let geofenceName = req.body.farmGeofenceName || req.body.geofenceName || segments[0].geofenceName,
    geofenceArea = req.body.area || req.body.geofenceArea || segments[0].geofenceArea,
    geofenceAreaUOMId = req.body.areaUomId || req.body.geofenceAreaUOMId || segments[0].geofenceAreaUOMId,
    geofenceParameter = req.body.parameter || req.body.geofenceParameter || segments[0].geofenceParameter,
    geofenceParameterUOMId = req.body.parameterUomId || req.body.geofenceParameterUOMId || segments[0].geofenceParameterUOMId,
    geofenceRadius = req.body.farmGeofenceRadius || req.body.geofenceRadius || segments[0].geofenceRadius,
    geofenceCenterLat = req.body.farmGeofenceCenterLat || req.body.geofenceCenterLat || segments[0].geofenceCenterLat,
    geofenceCenterLog = req.body.farmGeofenceCenterLog || req.body.geofenceCenterLog || segments[0].geofenceCenterLog,
    segmentPostRecordId = farmPostRecordId || req.body.recordId,
    geofenceCategory = req.body.farmGeofenceCategory || req.body.geofenceCategory || segments[0].geofenceCategory

  let set = {
    userId,
    farmId,
    geofenceName,
    geofenceArea,
    geofenceAreaUOMId,
    geofenceParameter,
    geofenceParameterUOMId,
    geofenceRadius,
    geofenceCenterLat,
    geofenceCenterLog,
    geofenceCategory,
    recordId : segmentPostRecordId || farmPostRecordId, // this is the handle segment creation from segment post api and farm post api
    dimitraGeofenceId: uuid(),
    isPrimary: isPrimary ? true : false,
    farmLocationId: locationId,
    coordinateHash: getCoordinateHash({
      lat: geofenceCenterLat,
      log: geofenceCenterLog,
      radius: geofenceRadius,
    }),
  };
  // remove undefined values before inserting
  Object.keys(set).forEach((key) => {
    set[key] == undefined || set[key] == null ? delete set[key] : {};
  });

  // insert into geofence table
  let geofence = await db.Geofence.create(set);
   
  return geofence;
};

/**
 * @desc Create segments of the farm
 */
exports.createFarmSegment = async ({ farmId, req, newUserId, farmLocationId }, ) => {
  // creating farm segments
  const { segments, recordId : farmPostRecordId } = req.body;
  const userId = newUserId || req.user.id; // admin is technician so use new user id
  const size = segments.length;
  let geofenceArr = [], geofencesRes = null, recordIdArr = [], recordAlreadyExists = [];
  recordIdArr.push(farmPostRecordId);
  recordIdArr = [...recordIdArr, ...segments.filter(segment => !!segment).map(el => el.recordId)];

  recordAlreadyExists = await db.Geofence.findAll({
    where: {
      recordId: {
        [Op.in]: recordIdArr
      }
    }
  })
  if(recordAlreadyExists.length > 0) {
    throw new Error("segment recordId already exists")
  }
  for (let i = 0; i < size; i++) {
    if(!segments[i]) continue;
    const {
      coordinates,
      geofenceName,
      geofenceArea,
      geofenceAreaUOMId,
      geofenceParameter,
      geofenceParameterUOMId,
      walkAndMeasure,
      recordId : segmentPostRecordId ,
      geofenceCategory,
      locationId,
      geofenceRadius,
      geofenceCenterLat,
      geofenceCenterLog,
    } = segments[i];
    let set = {
      userId,
      farmId,
      geofenceName: geofenceName || req?.body?.farmGeofenceName,
      geofenceArea,
      geofenceAreaUOMId,
      geofenceParameter,
      geofenceParameterUOMId,
      geofenceRadius,
      geofenceCenterLat,
      geofenceCenterLog,
      geofenceCategory,
      recordId : segmentPostRecordId || farmPostRecordId, // this is the handle segment creation from segment post api and farm post api
      dimitraGeofenceId: uuid(),
      farmLocationId: locationId || farmLocationId,
      coordinateHash: Array.isArray(coordinates) && coordinates.length ? getCoordinateHash(coordinates) : getCoordinateHash({
        lat: geofenceCenterLat,
        log: geofenceCenterLog,
        radius: geofenceRadius,
      }),
    };
    // remove undefined values before inserting
    Object.keys(set).forEach((key) => {
      set[key] == undefined || set[key] == null ? delete set[key] : {};
    });
    // insert into geofence table
    let geofence = await db.Geofence.create(set,);
    geofenceArr.push(geofence)

    //queue to create geofence in livestock microservice
    createGeofenceQueue.add({ geoFenceData: geofence }, { jobId: new Date().getTime() });

    // Add geofence id with lat and log
    let geofenceCoordinate = coordinates.map((element) => {
      element.geoFenceId = geofence.id;
      return element;
    });
    // insert coordinates into geofence-coordinate table
    await db.GeofenceCoordinate.bulkCreate(geofenceCoordinate,);

    //queue to create geofence in livestock microservice
    // createGeofenceCoordsQueue.add({ geoFenceCoordData: geofenceCoordinate }, { jobId: new Date().getTime() });
    }


    
  return geofenceArr.length > 0 ? geofenceArr : true;
};

exports.createFarmLocation = async (createFarmLocationInput, req) => {
  try {
    const isPrimaryExists = await db.FarmLocation.findOne({
      where: {
        // userId: createFarmLocationInput.userId,
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
      userId: createFarmLocationInput.userId,
      recordId: createFarmLocationInput?.locationRecordId || new Date().getTime()
    });

    const farmLocationId = locationData.id;
    let locationGeofence = {
      userId: createFarmLocationInput.userId,
      farmId: finalInput.farmId,
      farmLocationId,
      geofenceArea: finalInput.area,
      geofenceAreaUOMId: finalInput.areaUomId,
      geofenceParameter: finalInput.parameter,
      geofenceParameterUOMId: finalInput.areaUomId,
      isPrimary: true,
      recordId: createFarmLocationInput?.zoneRecordId || new Date().getTime()
    };

    if(createFarmLocationInput?.farmGeofenceType && createFarmLocationInput?.farmGeofenceType == "circular") {
      await db.Geofence.update({farmLocationId}, {where :{farmId: createFarmLocationInput.farmId}})
        let set = {
          userId: createFarmLocationInput.userId,
          farmId: createFarmLocationInput.farmId,
          geofenceName: createFarmLocationInput.farmGeofenceName,
          geofenceArea: createFarmLocationInput.area,
          geofenceAreaUOMId: createFarmLocationInput.areaUomId,
          geofenceParameter: createFarmLocationInput.parameter,
          geofenceParameterUOMId: createFarmLocationInput.areaUomId,
          geofenceRadius: createFarmLocationInput.farmGeofenceRadius,
          geofenceCenterLat: createFarmLocationInput.farmGeofenceCenterLat || createFarmLocationInput.lat,
          geofenceCenterLog: createFarmLocationInput.farmGeofenceCenterLog || createFarmLocationInput.log,
          geofenceCategory: createFarmLocationInput.farmGeofenceCategory,
          recordId : createFarmLocationInput?.zoneRecordId || new Date().getTime(), // this is to handle segment creation from segment post api and farm post api
          dimitraGeofenceId: uuid(),
          farmLocationId:locationData.id,
          isPrimary: true,
          coordinateHash: getCoordinateHash({
            lat: createFarmLocationInput.farmGeofenceCenterLat || createFarmLocationInput.lat,
            log: createFarmLocationInput.farmGeofenceCenterLog || createFarmLocationInput.log,
            radius: createFarmLocationInput.farmGeofenceRadius,
          }),
        };
        // remove undefined values before inserting
        Object.keys(set).forEach((key) => {
          set[key] == undefined || set[key] == null ? delete set[key] : {};
        });
        let geofence
        // for backward compatibility
        if(!createFarmLocationInput.zoneRecordId){
          // insert into geofence table
           geofence = await db.Geofence.create(set, { where: {recordId: createFarmLocationInput.zoneRecordId} });
        } else {
          let geofenceRes = await db.Geofence.findOne({ where: {recordId: createFarmLocationInput.zoneRecordId} });
          let geofence
          if(geofenceRes) {
            geofence = await db.Geofence.update(set, { where: {recordId: createFarmLocationInput.zoneRecordId} });
          } else {
            geofence = await db.Geofence.create(set);
          }

        }
      
    } else {
      await db.Geofence.update({farmLocationId: farmLocationId}, {where :{farmId: createFarmLocationInput.farmId}})
      if(createFarmLocationInput.farmLocationGeofence && createFarmLocationInput.farmLocationGeofence.length) {
        locationGeofence.coordinateHash = getCoordinateHash(createFarmLocationInput.farmLocationGeofence);
      }
      let geofence, geofenceRes
      // for backward compatibility
      if(!createFarmLocationInput.zoneRecordId){
        // insert into geofence table
         geofence = await db.Geofence.create(locationGeofence);
      } else {
         geofenceRes = await db.Geofence.findOne({ where: {recordId: createFarmLocationInput.zoneRecordId} });
         geofence
        if(geofenceRes) {
          geofence = await db.Geofence.update(locationGeofence, { where: {recordId: createFarmLocationInput.zoneRecordId} });
        } else {
          geofence = await db.Geofence.create(locationGeofence);
        }

      }
        let locationGeofenceCoordinates =
          createFarmLocationInput.farmLocationGeofence;

        if (
          locationGeofenceCoordinates &&
          locationGeofenceCoordinates.length > 0
        ) {
          await db.GeofenceCoordinate.destroy({
            where: {
              geoFenceId: geofenceRes?.id || geofence?.id,
            }
          });
          const farmCoordinates = locationGeofenceCoordinates.map((data) => {
            const { lat, log } = data;
            return {
              geoFenceId: geofenceRes?.id || geofence?.id, // mind the geoFenceId camel case in GeofenceCoordinate
              lat,
              log,
            };
          });

          await db.GeofenceCoordinate.bulkCreate(farmCoordinates);
        }

    }


    return locationData;
  } catch (error) {
    console.log('Farm create error', error);
    throw error;
  }
}
