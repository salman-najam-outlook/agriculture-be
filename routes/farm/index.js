const express = require("express");
const router = express.Router();
const _ = require("lodash");
const moment = require("moment");
const { Op } = require("sequelize");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const { error, success } = require(rootPath + "/helpers/language");
const querystring = require('querystring');

const he = require('he');
const {
  successRespSync,
  successResp,
  serverError,
  errorResp,
} = require(rootPath + "/helpers/api");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const {
  farmDeleteValidation,
  farmPutValidation,
  postFarmCropValidation,
  postFarmLivestockValidation,
  listValidation,
  postFarmEquipmentValidation,
  fetchOneValidation,
  getTillageValidation,
  plantingValidation,
  fetchPlantingValidation,
  fetchSinglePlantingValidation,
  updatePlantingValidation,
  postHarvestingValidation,
  postSoilpreparationValidation,
  farmPostValidation,
} = require(rootPath + "/helpers/validation");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
const convertEmptyStringToNull = require(rootPath +
  "/middleware/convertEmptyStringToNull");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const Queue = require("bull");
const { getCountries, getStates } = require("country-state-picker");
const { addOfflineFarmer } = require("../../common/addOfflineFarmer");
const { getPerimeterFromCircularInFeet } = require("../../helpers/geo-utils");
const { getAreaFromCircularInAcre } = require("../../helpers/geo-utils");
const { syncFarmerDataToOCC } = require(rootPath + "/helpers/occ-komodo");
const {
  getAreaFromPolygonsInAcre,
  getPerimeterFromPolygonsInFeet,
} = require(rootPath + "/helpers/geo-utils.js");
const { syncFarmData } = require("../../helpers/dds_sync");
router.use("/location", require("./location"));
const fs = require("fs");
const path = require("path");

const createFarmQueue = new Queue("createFarmQueue", {
  redis: {
    maxRetriesPerRequest: null,
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || "",
  },
});
const createFarmCoordsQueue = new Queue("createFarmCoordsQueue", {
  redis: {
    maxRetriesPerRequest: null,
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || "",
  },
});

const updateFarmQueue = new Queue("updateFarmQueue", {
  redis: {
    maxRetriesPerRequest: null,
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD || "",
  },
});

createFarmQueue.process(async function (job, done) {
  try {
    // call livestock farm sync graphql service to post farm
    delete job.data.farmData.createdAt;
    delete job.data.farmData.updatedAt;
    job.data.farmData.syncId = job.data.farmData?.id;
    const endpoint =
      process.env.LIVESTOCK_SYNC_URL || "http://localhost:4043/graphql";
    const headers = {
      "content-type": "application/json",
      // "Authorization": "<token>"
    };
    const graphqlQuery = {
      // "operationName": "fetchAuthor",
      query: `mutation {
            createFarm(createFarmInput: {
              userId:  ${parseInt(job.data.farmData?.userId)},
              farmName:  "${job.data.farmData?.farmName}",
              registrationNo:  ${job.data.farmData?.registrationNo},
              lat:  ${parseFloat(job.data.farmData?.lat)},
              log:  ${parseFloat(job.data.farmData?.log)},
              address:  "${job.data.farmData?.address}",
              area:  ${parseFloat(job.data.farmData?.area)},
              region: " ${job.data.farmData?.region}",
              farmOwnershipType:  "${job.data.farmData?.farmOwnershipType}",
              parameter:  ${parseFloat(job.data.farmData?.parameter)},
              syncId: ${parseInt(job.data.farmData?.id)}
            }  
              ) {
            id
          }
          }`,
      variables: job.data.farmData,
    };

    const response = await axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    });

    done(null, "console result");
    job.progress(100);
  } catch (error) {
    // create farm queue failed
    console.log(error);
    done(null, "res");
  }
});
createFarmCoordsQueue.process(async function (job, done) {
  try {
    // call livestock farm sync graphql service to post farm
    delete job.data.farmCoordsData.createdAt;
    delete job.data.farmCoordsData.updatedAt;
    job.data.farmCoordsData.syncId = job.data.farmCoordsData?.id;
    const endpoint =
      process.env.LIVESTOCK_SYNC_URL || "http://localhost:4043/graphql";
    const headers = {
      "content-type": "application/json",
      // "Authorization": "<token>"
    };

    let query = `mutation {
        createFarmCoords(
          createFarmCoordsInput:{ farmCoords:`;
    query += JSON.stringify(job.data.farmCoordsData).replace(/"/g, "");

    query += `}  
            ) {
          id
        }
        }`;
    const graphqlQuery = {
      // "operationName": "fetchAuthor",
      query: query,
      variables: job.data.farmCoordsData,
    };

    const response = await axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    });

    done(null, "console result");
    job.progress(100);
  } catch (error) {
    // create farm queue failed
    done(null, "res");
    console.log(error);
  }
});
updateFarmQueue.process(async function (job, done) {
  try {
    // call livestock farm sync graphql service to post farm
    delete job.data.farmData.createdAt;
    delete job.data.farmData.updatedAt;
    const endpoint =
      process.env.LIVESTOCK_SYNC_URL || "http://localhost:4043/graphql";
    const headers = {
      "content-type": "application/json",
      // "Authorization": "<token>"
    };
    const graphqlQuery = {
      // "operationName": "fetchAuthor",
      query: `mutation {
            updateFarm(updateFarmInput: {
              syncId: ${parseInt(job.data.farmData?.syncId)},
              userId:  ${parseInt(job.data.farmData?.userId)},
              farmName:  "${job.data.farmData?.farmName}",
              registrationNo:  ${job.data.farmData?.registrationNo},
              lat:  ${parseFloat(job.data.farmData?.lat)},
              log:  ${parseFloat(job.data.farmData?.log)},
              address:  "${job.data.farmData?.address}",
              area:  ${parseFloat(job.data.farmData?.area)},
              region: " ${job.data.farmData?.region}",
              farmOwnershipType:  "${job.data.farmData?.farmOwnershipType}",
              parameter:  ${parseFloat(job.data.farmData?.parameter)},
            }  
              ) {
            id
          }
          }`,
      variables: job.data.farmData,
    };

    const response = await axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    });

    done(null, "console result");
    job.progress(100);
  } catch (error) {
    // create farm queue failed
    console.log(error);
    done(null, "res");
  }
});

// createFarmQueue.on('completed', async function (job, result) {

// });

//######################### soil preparation section

// API to export geojson for farms
router.get("/geoJsons", async (req, res) => {
  const { farm_id } = req.query;
  const farmIds = farm_id.split(',');
  try {
    let obj = {
      type: "FeatureCollection",
    }
    let features = []
    for (let i=0; i < farmIds.length; i++) {
      const productionPlace = await db.user_farm.findOne({
        where: {
          id: farmIds[i],
          isDeleted: 0,
        },
        include: [
          {
            model: db.Geofence,
            as: 'segments',
            where: {
              deletedAt: { [Op.is]: null },
            },
            required: false,
            include: [
              {
                model: db.GeofenceCoordinate,
                as: 'geofence_coordinates',
                required: false,
              },
            ],
          },
          {
            model: db.UserFarmCoordinate,
            as: 'farmCoordinates',
            required: false,
          },
          {
            model: db.user,
            as: 'user',
            attributes: ['firstName', 'lastName', 'countryId']
          }
        ],
      })
      const allPrimary = productionPlace.segments.every(item => item.isPrimary === true);
      if (productionPlace && productionPlace.segments.length && allPrimary) {
        let feature = {
          type: "Feature",
          properties: {
            ...(productionPlace.farmName ? { ProductionPlace: productionPlace.farmName} : null ),
            ...(productionPlace.user ? { ProducerName: productionPlace.user.firstName + ' ' + productionPlace.user.lastName } : null ),
            ...(productionPlace.country ? { ProducerCountry: productionPlace.country } : null ),
            ...(productionPlace.address ? {Address: productionPlace.address} : null ),
          },
        }
        productionPlace.segments.forEach((gf) => {
          if (gf.isPrimary) {
            const farmCoo = productionPlace.farmCoordinates.map(({ lat, log }) => [parseFloat(log), parseFloat(lat)]);
            feature['geometry'] = gf.geofenceRadius === null
              ? {
                  type: 'Polygon',
                  coordinates: [[...farmCoo, farmCoo[0]]]
                }
              : {
                  type: 'Point',
                  coordinates: [gf.geofenceCenterLat, gf.geofenceCenterLog]
                };
          }
        })
        features.push(feature)
      }
    } 
    obj['features'] = features;
    const filePath = path.join(__dirname, 'allFarm.geojson');
  
    fs.writeFileSync(filePath, JSON.stringify(obj));
    res.download(filePath, 'allFarm.geojson', (err) => {
        if (err) {
            console.error('Error downloading the file:', err);
        } else {
            console.log('File downloaded successfully');
        }
    });
  }catch (err) {
    console.log(err)
  }
})
/**
 * @desc Collecting User soil preparation data [ to insert data of the soil preperation ]
 */
/**
 * @swagger
 * /farm/soilpreparation:
 *   post:
 *     summary: API for Collecting User soil preparation data to insert data of the soil preperation.
 *     description: API for Collecting User soil preparation data to insert data of the soil preperation..
 *     tags: [Farm]
 *     requestBody:
 *       description: API for Collecting User soil preparation data to insert data of the soil preperation.
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"startDate":"11/30/2021","endDate":"12/30/2021","fertilizerType":"liquid","fertilizerQty":10,"fertilizerQtyUomId":12,"comment":"test","geofences":[1,2],"tillage":[1,2]}
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Soil preparation data saved successfully.", "data": {} }
 */

router.post(
  "/soilpreparation",
  auth,
  postSoilpreparationValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const ACCEPT_FORMAT = process.env.ACCEPT_DATE_FORMAT;
      const userId = req.user.id;
      let {
        startDate,
        endDate,
        fertilizerType,
        fertilizerQty,
        fertilizerQtyUomId,
        comment,
        geofences,
        tillage,
      } = req.body;

      // convert date into UTC
      startDate = moment.utc(startDate, ACCEPT_FORMAT);
      endDate = moment.utc(endDate, ACCEPT_FORMAT);

      // start transaction
      const t = await db.sequelize.transaction();

      try {
        const set = {
          userId,
          startDate,
          endDate,
          fertilizerType,
          fertilizerQty,
          fertilizerQtyUomId,
          comment,
        };
        //################ insert into geofence table
        let soilpreparation = await db.UserSoilPrepration.create(set, {
          transaction: t,
        });

        //################ insert into MapSoilpreparationGeofence table
        let geofencesMapping = geofences.map((element) => {
          return {
            geoFenceId: element,
            soilPreparationId: soilpreparation.id,
          };
        });

        await db.MapSoilpreparationGeofence.bulkCreate(geofencesMapping, {
          transaction: t,
        });

        //################ insert into MapSoilpreparationTillage table
        let tillageMapping = tillage.map((element) => {
          return {
            tillageId: element,
            soilPreparationId: soilpreparation.id,
          };
        });

        await db.MapSoilpreparationTillage.bulkCreate(tillageMapping, {
          transaction: t,
        });

        // commit if everything is good
        await t.commit();
      } catch (err) {
        await t?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }

      // response to the client
      return res.json(
        await successResp({
          msg: success.SOILPREPARATIONDATA_ADDED,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

//######################### planting section

/**
 * @desc Fetch planted field list of the user[ fetch the list of the planting crops ]
 */
/**
 * @swagger
 * /farm/planting:
 *   get:
 *     summary: API for fetching planted field list of the user fetch the list of the planting crops.
 *     description: API for fetching planted field list of the user fetch the list of the planting crops..
 *     tags: [Farm]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Limit
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 */

router.get(
  "/planting",
  auth,
  fetchPlantingValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;

      const { page, limit } = req.body;

      // fetch data from the userplantfield table
      let cropsPlanted = await db.UserPlantField.findAll({
        include: [
          {
            model: db.Unit,
            attributes: ["abbreviation", ["field", "name"]],
            as: "plantQtyUnit",
          },
          {
            model: db.Geofence,
            attributes: ["id", "geofenceName"],
            through: {
              attributes: [],
            },
          },
        ],
        attributes: ["id", "plantName", "plantQty"],
        where: { userId },
        offset: (page - 1) * limit,
        limit: limit,
      });

      // response to the client
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: {
            num_rows: cropsPlanted.length,
            data: cropsPlanted,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc Fetch single planted crop by the user[ fetch planting crop information of a single crop with id]
 */
/**
 * @swagger
 * /farm/planting/{id}:
 *   get:
 *     summary: API for Fetching single planted crop by the user[ fetch planting crop information of a single crop with id].
 *     description: API for Fetching single planted crop by the user[ fetch planting crop information of a single crop with id].
 *     tags: [Farm]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: User plant field ID
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "id": 2, "plantName": "test2", "plantQty": 12, "plantQtyUnit": { "id": 1, "abbreviation": null, "name": "measurement" }, "Geofences": [ { "id": 2, "geofenceName": "Rice Segment" } ] } }
 */

router.get(
  "/planting/:id",
  auth,
  fetchSinglePlantingValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      // fetch data from the userplantfield table
      let cropDetails = await db.UserPlantField.findOne({
        include: [
          {
            model: db.Unit,
            attributes: ["id", "abbreviation", ["field", "name"]],
            as: "plantQtyUnit",
          },
          {
            model: db.Geofence,
            attributes: ["id", "geofenceName"],
            through: {
              attributes: [],
            },
          },
        ],
        attributes: ["id", "plantName", "plantQty"],
        where: { userId, id },
      });
      // response to the client
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: cropDetails,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc Plant a field in farm[ to update the data of the plantig crop ]
 */

/**
 * @swagger
 * /farm/planting:
 *   put:
 *     summary: API for Planting a field in farm[ to update the data of the plantig crop ].
 *     description: API for Planting a field in farm[ to update the data of the plantig crop ].
 *     tags: [Farm]
 *     requestBody:
 *       description: API for Planting a field in farm[ to update the data of the plantig crop ].
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"id":1,"startDate":"11/30/2021","endDate":"12/30/2021","plantName":"liquid","fertilizerOptionId":10,"plantQty":12,"plantQtyUmoId":1,"geofence":[1,2],"description":"test"}
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Crop information updated successfully.", "data": {} }
 */

router.put(
  "/planting",
  auth,
  updatePlantingValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const ACCEPT_FORMAT = process.env.ACCEPT_DATE_FORMAT;
      const userId = req.user.id;
      // request Data
      let {
        id,
        startDate,
        endDate,
        plantName,
        fertilizerOptionId,
        plantQty,
        plantQtyUmoId,
        description,
        geofence,
      } = req.body;

      // convert date into UTC
      startDate = moment.utc(startDate, ACCEPT_FORMAT);
      endDate = moment.utc(endDate, ACCEPT_FORMAT);

      // Data to be inserted
      let set = {
        userId,
        startDate,
        endDate,
        plantName,
        fertilizerOptionId,
        plantQty,
        plantQtyUmoId,
        description,
      };

      // start transaction
      const t = await db.sequelize.transaction();

      try {
        // update into geofence table
        const { userplantfieldUpdateStatus } = await db.UserPlantField.update(
          set,
          { where: { id }, transaction: t }
        );

        // Add geofence id with lat and log
        let mapping = geofence.map((element) => {
          return {
            geoFenceId: element,
            plantingId: id,
          };
        });

        // delete mapping and then insert again
        await db.MapPlantingGeofencing.destroy({
          where: {
            plantingId: id, // deletes all geofence with plantid
          },
          transaction: t,
        });

        // map planting to geofencing table
        await db.MapPlantingGeofencing.bulkCreate(mapping, {
          transaction: t,
        });

        // commit if everything is good
        await t.commit();

        // response to the client
        return res.json(
          await successResp({
            msg: success.CROP_INFO_UPDATED,
          })
        );
      } catch (err) {
        await t?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc Plant a field in farm[ to insert planting data into DB ]
 */
/**
 * @swagger
 * /farm/planting:
 *   post:
 *     summary: API for Planting a field in farm[ to insert planting data into DB ].
 *     description: API for Planting a field in farm[ to insert planting data into DB ]..
 *     tags: [Farm]
 *     requestBody:
 *       description: API for Planting a field in farm[ to insert planting data into DB ]..
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: { planting: [{"startDate":"11/30/2021","endDate":"12/30/2021","cropId":1,"plantName":"liquid","fertilizerOptionId":10,"plantQty":12,"plantQtyUmoId":1,"geofence":[1,2],"description":"test"},{"startDate":"11/30/2021","endDate":"12/30/2021","plantName":"liquid","fertilizerOptionId":10,"plantQty":12,"plantQtyUmoId":1,"geofence":[1,2],"description":"test"}]}
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Planting Data added successfully.", "data": {} }
 */

router.post(
  "/planting",
  auth,
  plantingValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { planting } = req.body;
      const ACCEPT_FORMAT = process.env.ACCEPT_DATE_FORMAT;
      // no. of planting added
      const size = planting.length;
      // start transaction
      const t = await db.sequelize.transaction();

      try {
        for (let i = 0; i < size; i++) {
          let {
            startDate,
            endDate,
            cropId,
            plantName,
            fertilizerOptionId,
            plantQty,
            plantQtyUmoId,
            description,
            geofence,
          } = planting[i];

          // convert date into UTC
          startDate = moment.utc(startDate, ACCEPT_FORMAT);
          endDate = moment.utc(endDate, ACCEPT_FORMAT);

          // Data to be inserted
          let set = {
            userId,
            startDate,
            endDate,
            cropId,
            plantName,
            fertilizerOptionId,
            plantQty,
            plantQtyUmoId,
            description,
          };

          // insert into geofence table
          let plant = await db.UserPlantField.create(set, { transaction: t });

          // Add geofence id with lat and log
          let mapping = geofence.map((element) => {
            return {
              geoFenceId: element,
              plantingId: plant.id,
            };
          });

          // map planting to geofencing table
          await db.MapPlantingGeofencing.bulkCreate(mapping, {
            transaction: t,
          });
        }
        // commit if everything is good
        await t.commit();
      } catch (err) {
        await t?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }

      // response to the client
      return res.json(
        await successResp({
          msg: success.PLANTING_ADDED,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

//######################### harvesting section
/**
 * @desc Collecting User harvesting information [ to insert harvesting data of the planted crop ]
 */

/**
 * @swagger
 * /farm/harvesting:
 *   post:
 *     summary: API for Collecting User harvesting information [ to insert harvesting data of the planted crop ].
 *     description: API for Collecting User harvesting information [ to insert harvesting data of the planted crop ].
 *     tags: [Farm]
 *     requestBody:
 *       description: API for Collecting User harvesting information [ to insert harvesting data of the planted crop ].
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: { harvesting: [{"startDate":"11/30/2021","endDate":"12/30/2021","plantedCropId":1,"plantName":"liquid","plantQty":12,"plantQtyUomId":1,"harvestedQty":2,"harvestedQtyUomId":1,"geofences":[1,2],"equipments":[1,2],"storageCondition":"test"},{"startDate":"11/30/2021","endDate":"12/30/2021","plantedCropId":1,"plantName":"liquid","plantQty":12,"plantQtyUomId":1,"harvestedQty":2,"harvestedQtyUomId":1,"geofences":[1,2],"equipments":[1,2],"storageCondition":"test"}]}
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "You have successfully added  harvesting Information ", "data": {} }
 */

router.post(
  "/harvesting",
  auth,
  postHarvestingValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const ACCEPT_FORMAT = process.env.ACCEPT_DATE_FORMAT;
      const userId = req.user.id;
      const { harvesting } = req.body;
      // no. of harvesting added
      const size = harvesting.length;
      // start transaction
      const t = await db.sequelize.transaction();

      try {
        for (let i = 0; i < size; i++) {
          let {
            plantedCropId,
            startDate,
            endDate,
            plantName,
            plantQty,
            plantQtyUomId,
            harvestedQty,
            harvestedQtyUomId,
            storageCondition,
            geofences,
            equipments,
          } = harvesting[i];

          // convert date into UTC
          startDate = moment.utc(startDate, ACCEPT_FORMAT);
          endDate = moment.utc(endDate, ACCEPT_FORMAT);

          // Data to be inserted
          let set = {
            userId,
            plantedCropId,
            startDate,
            endDate,
            plantName,
            plantQty,
            plantQtyUomId,
            harvestedQty,
            harvestedQtyUomId,
            storageCondition,
          };

          //################ insert into geofence table
          let harvest = await db.UserHarvestCrop.create(set, {
            transaction: t,
          });

          //################ insert into mapharvestinggeofencing table
          let geofencesMapping = geofences.map((element) => {
            return {
              geoFenceId: element,
              harvestingId: harvest.id,
            };
          });

          // map harvesting to geofencing table
          await db.MapHarvestingGeofencing.bulkCreate(geofencesMapping, {
            transaction: t,
          });

          //################ insert into mapharvestingfarmequipment table
          let equipmentMapping = equipments.map((element) => {
            return {
              userFarmEquipmentId: element,
              harvestingId: harvest.id,
            };
          });

          // map harvesting to geofencing table
          await db.MapHarvestingFarmequipment.bulkCreate(equipmentMapping, {
            transaction: t,
          });
        }
        // commit if everything is good
        await t.commit();
      } catch (err) {
        await t?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }

      // response to the client
      return res.json(
        await successResp({
          msg: success.HARVESTING_ADDED,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

//######################### tillage section

/**
 * @desc Fetch farm tillage list
 */

/**
 * @swagger
 * /farm/tillage:
 *   get:
 *     summary: API for Fetching farm tillage list.
 *     description: API for Fetching farm tillage list.
 *     tags: [Farm]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Limit
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 */

router.get(
  "/tillage",
  auth,
  getTillageValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { page, limit } = req.body;

      // generating query
      let query = {
        attributes: ["id", "name"],
        offset: (page - 1) * limit,
        limit: limit,
      };

      // fetch data from DB
      let result = await db.Tillage.findAll(query);
      result = {
        num_rows: result.length,
        data: result,
      };

      // response to the client
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: result,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc Fetch not harvested crop of the user.[ to show list of crop while adding harvesting data ]
 */
/**
 * @swagger
 * /farm/planted-crops:
 *   get:
 *     summary: API for Fetching not harvested crop of the user.[ to show list of crop while adding harvesting data ].
 *     description: API for Fetching not harvested crop of the user.[ to show list of crop while adding harvesting data ].
 *     tags: [Farm]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Limit
 *       - in: query
 *         name: plantName
 *         required: false
 *         schema:
 *           type: String
 *         description: Name of the Plant
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example:
 */

router.get(
  "/planted-crops",
  auth,
  listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;

      const { page, limit, plantName } = req.body;

      // fetch data from the userplantfield table
      let cropsPlanted = await db.UserPlantField.findAll({
        include: [
          {
            model: db.Unit,
            attributes: ["id", "abbreviation", ["field", "name"]],
            as: "plantQtyUnit",
          },
          {
            model: db.Geofence,
            attributes: ["id", "geofenceName"],
            through: {
              attributes: [],
            },
          },
        ],
        attributes: ["id", "plantName", "plantQty", "endDate"],
        where: {
          userId,
          endDate: {
            [Op.lt]: moment.utc(),
          },
          plantName: {
            [Op.like]: "%" + plantName + "%",
          },
        },

        offset: (page - 1) * limit,
        limit: limit,
        order: [["endDate", "ASC"]],
      });

      // response to the client
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: {
            num_rows: cropsPlanted.length,
            data: cropsPlanted,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

// ############## Farm Registration Section

/**
 * @desc Add user farm livestocks while registrations [Farm Registration]
 */
/**
 * @swagger
 * /farm/livestock:
 *   post:
 *     summary: API for Adding user farm livestocks while registrations [Farm Registration]
 *     description: API for Adding user farm livestocks while registrations [Farm Registration]
 *     tags: [Farm]
 *     requestBody:
 *       description: API for Adding user farm livestocks while registrations [Farm Registration].
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: { livestocks: [{"farmId":1,"quantity":2,"quantityUomId":1,"animalBreedId":2,"animalTypeId":12,"name":"test","lat":222.87,"log":222.87},{"farmId":2,"quantity":1,"quantityUomId":1,"animalBreedId":2,"animalTypeId":12,"name":"test","lat":222.87,"log":222.87}]}
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "You have successfully added  harvesting Information ", "data": {} }
 */

router.post(
  "/livestock",
  auth,
  postFarmLivestockValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { livestocks } = req.body;

      // create array of data to be inserted
      let set = livestocks.map((info) => {
        const {
          farmId,
          quantity,
          quantityUomId,
          animalBreedId,
          animalTypeId,
          name,
          lat,
          log,
        } = info;
        let set = {
          userId,
          farmId,
          quantity,
          quantityUomId,
          animalBreedId,
          animalTypeId,
          name,
          lat,
          log,
        };
        // remove undefined values before inserting
        Object.keys(set).forEach((key) => {
          set[key] == undefined || set[key] == null ? delete set[key] : {};
        });
        return set;
      });

      // insert farm equpment data into DB
      let result = await db.UserFarmLivestock.bulkCreate(set);
      return res.json(
        await successResp({
          msg: success.USER_FARM_LIVESTOCK_ADDED,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc Add user farm details [Farm Registration][for now user can register multiple form]
 */
/**
 * @swagger
 * /farm:
 *   post:
 *     summary: Add user farm details [Farm Registration][for now user can register multiple form].
 *     description: Add user farm details [Farm Registration][for now user can register multiple form].
 *     tags: [Farm]
 *     requestBody:
 *       description: Add user farm details [Farm Registration][for now user can register multiple form]
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: { "farmName": "New Heritage Town1", "registrationNo": "ASABBBG45566", "lat": 30.0222, "log": 31.0222, "address": "Nainital, uttarakhand", "area": 125.3, "areaUomId": 1, "parameter": 123, "parameterUomId": 1, "farmingGoals": [ { "farmingGoalOptId": "1", "farmingGoal": "third goals" } ], "farmOwnershipType": "personal", "farmGeofence": [], "farmType": 846, "productionSystem": 849, "farmOwner": 17, "segments": [{ "geofenceName": "huh", "geofenceArea": 0.703, "geofenceAreaUOMId": 2878, "geofenceParameter": 217.27417802313616, "geofenceParameterUOMId": 2878, "coordinates": [ { "lat": 30.755886091259313, "log": 76.65269058197737 }, { "lat": 30.755760182369567, "log": 76.65223997086287 }, { "lat": 30.755308407240477, "log": 76.65224734693766 }, { "lat": 30.7552562570413, "log": 76.65277976542711 } ] }], "country": "india", "state": "uttarakhand", "city": "nainital", "govRegistrationNum": "s323234d", "contractMating": "dsfs2323432", "cooperativeId": "sdfsdf3233", "licenceNum": "sdfsf333", "licenceExpiryDate": "2022-03-04", "regulatorName": "some name", "houseNum": "45d", "street": "new street", "regulatorRepresentiveName": "sahil" }
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Farm added successfully.", "data": { "inviteLink": "http://ec2-3-218-20-78.compute-1.amazonaws.com:3001?q=aGVsbG8gd29ybGQ=", "farm": { "id": 538, "userId": 171, "farmName": "myFarm", "registrationNo": 2, "lat": "23444.3", "log": "23444.3", "address": "test-address", "area": "2", "farmOwnershipType": "community", "parameter": 233, "updatedAt": "2022-03-23T12:25:40.152Z", "createdAt": "2022-03-23T12:25:40.152Z" } } }
 */

router.post(
  "/",
  auth,
  convertEmptyStringToNull(),
  duplicateRecordId.handleDuplicateRecordId("user_farm"),
  farmPostValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      // return res.json('hello world');
      const {
        createFarmSegment,
        createFarmLocation,
        createCircularGeofence,
      } = require(rootPath + "/helpers/controller");
      const userId = req.user.id;
      const userFirstName = req.user.firstName;
      const userMiddleName = req.user.middleName || '';
      const userLastName = req.user.lastName;
      let subOrganizationId = req.user.subOrgId || null;
      let {
        farmName,
        registrationNo,
        lat,
        log,
        address,
        region,
        area,
        areaUomId,
        farmOwnershipType,
        farmingGoals,
        farmGeofence,
        segments,
        parameter,
        // new
        farmType,
        productionSystem,
        farmOwner,
        country,
        state,
        city,
        govRegistrationNum,
        contractMating,
        cooperativeId,
        licenceNum,
        licenceExpiryDate,
        regulatorName,
        regulatorRepresentiveName,
        houseNum,
        street,
        recordId,
        farmerFirstName,
        farmerMiddleName,
        farmerLastName,
        farmerId,
        isTechnician,
        farmGeofenceName,
        farmGeofenceCategory,
        productionType,
        certifications,
        farmNumber,
        farmGeofenceRadius,
        farmGeofenceType,
        farm_created_from  = 'mobile',
        societyId,
      } = req.body;

      farmName = !farmName ? `farm - ${new Date().getTime()}` : farmName
      let set = {
        dimitraFarmId: uuidv4(),
        userId,
        farmName,
        registrationNo,
        lat,
        log,
        address,
        area,
        areaUomId,
        region,
        farmOwnershipType,
        parameter,
        farmType,
        productionSystem,
        farmOwner,
        country,
        state,
        city,
        govRegistrationNum,
        contractMating,
        cooperativeId,
        licenceNum,
        licenceExpiryDate,
        regulatorName,
        regulatorRepresentiveName,
        houseNum,
        street,
        recordId,
        farmerFirstName,
        farmerMiddleName,
        farmerLastName,
        farmerId,
        isTechnician,
        farmGeofenceName,
        farmGeofenceCategory,
        productionType,
        farm_created_from,
        societyId
      };
      set. farmName = he.decode(farmName).trim()

      if (farmGeofenceType === "circular") {
        set.parameter = getPerimeterFromCircularInFeet(farmGeofenceRadius);
        set.area = getAreaFromCircularInAcre(farmGeofenceRadius);
      } else {
        if (Array.isArray(farmGeofence)) {
          set.parameter =
            getPerimeterFromPolygonsInFeet(farmGeofence) ?? set.parameter;
          set.area = getAreaFromPolygonsInAcre(farmGeofence) ?? set.area;
        }
      }

      // check if the farm name and registration number is unique together
      const {
        isUniqueRegNoAndFarmNameTogether,
        farmAlreadyRegistered,
      } = require(rootPath + "/helpers/controller");
      const isRegistered = await farmAlreadyRegistered(req);
      if (isRegistered) {
        return res.status(success.code.OK).json(
          await errorResp({
            code: success.code.OK,
            msg: error.FARM_EXIST_ALREADY,
          })
        );
      }

      const isUnique = await isUniqueRegNoAndFarmNameTogether(req);
      // if not unique send error message
      if (!isUnique) {
        return res.status(success.code.OK).json(
          await errorResp({
            code: success.code.OK,
            msg: error.NOT_UNIQUE_FARMNAME_AND_REGISTRATIONNO,
          })
        );
      }

      if (isTechnician) {
           // find user with the existing farmerId
           let existingUser
           if(farmerId) {
             existingUser = await db.sequelize.query(`
              SELECT
                  uft.userId,
                  u2.firstName,
                  u2.middleName,
                  u2.lastName
              FROM
                  users u
              INNER JOIN user_farms uft ON
                  uft.technicianId = u.id
              INNER JOIN user_farms uf ON
                  uf.userId = uft.userId  
              INNER JOIN users u2 ON
                  u2.id = uf.userId      
              INNER JOIN organization o ON
                  u.organization = o.id
              WHERE
                  uft.farmerId = :farmerId
                  AND uft.isTechnician = 1
                  AND o.id = :orgId
                  AND u2.organization = :orgId
                  AND u.organization = :orgId
                  ${subOrganizationId ? "AND u.subOrganizationId = :subOrganizationId" : ""}
                  ${subOrganizationId ? "AND u2.subOrganizationId = :subOrganizationId" : ""}
              ORDER BY
	                uf.createdAt DESC 
            `, {
              replacements: { farmerId, orgId: req.user.organization, subOrganizationId },
              type: db.Sequelize.QueryTypes.SELECT,
            });

           }

          if (existingUser && Array.isArray(existingUser) && existingUser.length > 0) {
           
            set.userId = existingUser[0].userId
            set.oldUserId = existingUser[0].userId
            set.farmerFirstName = existingUser[0].firstName
            set.farmerMiddleName = existingUser[0].middleName
            set.farmerLastName = existingUser[0].lastName
          } else {
            req.body = {
              ...req.body,
              name: `${req.body.farmerFirstName || ""} ${req.body.farmerMiddleName || ""} ${req.body.farmerLastName || ""}`.trim(),
              address: req.body.address,
            }
            let newFarmerId = await addOfflineFarmer(req, res, true)
            set.userId = newFarmerId
            set.oldUserId = newFarmerId
          }
 
        set.technicianId = userId
      } else {
        set.farmerFirstName = userFirstName;
        set.farmerMiddleName = userMiddleName;
        set.farmerLastName = userLastName;
      }

      // remove undefined values before inserting
      Object.keys(set).forEach((key) => {
        set[key] == undefined || set[key] == null ? delete set[key] : {};
      });


      try {
        // certifications;
        let certificateIds = [];
        if (certifications && certifications.length) {
          for (const certificate of certifications) {
            if (certificate) {
              const { id, name } = certificate;
              if (id) {
                certificateIds.push(id);
              } else {
                const set = {
                  name,
                  groupName: "certification",
                  userId
                };
                const newCertificate = await db.Option.create(set, {

                });
                certificateIds.push(newCertificate.id);
              }
            }
          }
        }

        // generate invite link
        const inviteLink = process.env.SITEURL
          ? process.env.SITEURL + "?q=aGVsbG8gd29ybGQ="
          : "https://" + req.get("host") + "?q=aGVsbG8gd29ybGQ=";
        set.inviteLink = inviteLink;
        // insert farm data into DB
        let farm = await db.user_farm.create(set, {

        });
        const farmId = farm.id; // farm id

        if (certificateIds.length) {
          //create farm certificate;
          const farmCertificates = certificateIds.map((id) => ({
            certificateId: id,
            farmId,
          }));

          await db.FarmCertificate.bulkCreate(farmCertificates, {

          });
        }

        // check if the farming goals array is not empty
        if (
          farmingGoals &&
          Array.isArray(farmingGoals) &&
          notEmpty(farmingGoals)
        ) {
          const farmingGoalsArr = farmingGoals
            .filter((goal) => !!goal)
            .map((data) => {
              const { farmingGoalOptId, farmingGoal } = data;
              return {
                farmId,
                userId,
                farmingGoalOptId,
                farmingGoal,
              };
            });

          if (farmingGoalsArr.length) {
            // insert farming goals if array is not empty
            await db.UserFarmingGoal.bulkCreate(farmingGoalsArr, {

            });
          }
        }

        // check if farm geofeces coordinates are there in the body
        if (
          farmGeofence &&
          Array.isArray(farmGeofence) &&
          notEmpty(farmGeofence)
        ) {
          const farmCoordinates = farmGeofence
            .filter((data) => !!data)
            .map((data) => {
              const { lat, log } = data;
              return {
                farmId,
                userId,
                lat,
                log,
              };
            });

          if (farmCoordinates.length) {
            // insert data into the user farm coordinates
            await db.UserFarmCoordinate.bulkCreate(farmCoordinates, {

            });
            createFarmCoordsQueue.add(
              { farmCoordsData: farmCoordinates },
              { jobId: new Date().getTime() }
            );
          }
        }

        // insert farm locations
        const farmLocationInput = {
          isPrimary: 1,
          address: address,
          area: set.area || area,
          city: city,
          areaUomId: areaUomId,
          country: country,
          farmId: farmId,
          farmNumber: farmNumber,
          lat: lat,
          log: log,
          farmLocationGeofence: farmGeofence,
          parameter: parameter,
          state: state,
          street: street ?? "",
          userId: req.user.id,
          farmGeofenceType: req.body?.farmGeofenceType,
          farmGeofenceCenterLat: req.body?.farmGeofenceCenterLat,
          farmGeofenceCenterLog: req.body?.farmGeofenceCenterLog,
          farmGeofenceRadius: req.body?.farmGeofenceRadius,
          farmGeofenceName: req.body?.farmGeofenceName,
          farmGeofenceCategory: req.body?.farmGeofenceCategory,
          recordId,
          locationRecordId: req.body?.locationRecordId,
          zoneRecordId: req.body?.zoneRecordId,
        };

        //both main polygon and circular geofence will be created in createFarmLocation
        await createFarmLocation(farmLocationInput, req);
        let geofenceArr = [];
        // check if segment is not empty then insert it
        if (segments && Array.isArray(segments) && notEmpty(segments)) {
          geofenceArr = await createFarmSegment({ farmId, req }, );
        }



        await syncFarmerDataToOCC(userId);


        //sync farm data to DDS
        await syncFarmData("ADDED", {
          farmId,
          userId,
          farmName,
          areaInAcre: area,
          farmType: farmGeofenceType === "circular" ? "POINT" : "POLYGON",
          location: address,
          centerLatitude: req.body?.farmGeofenceCenterLat,
          centerLongitude: req.body?.farmGeofenceCenterLog,
          radius: req.body?.farmGeofenceRadius,
        }, farmGeofence);

        // send response back to the client
        return res.json(
          await successResp({
            msg: success.FARM_ADDED,
            data: {
              id: farm.id,
              inviteLink,
              farm,
              segments: geofenceArr,
            },
          })
        );
      } catch (err) {

        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc Update user farm details with the farm id
 */
/**
 * @swagger
 * /farm:
 *   put:
 *     summary: Update user farm details.
 *     description: Update user farm details.
 *     tags: [Farm]
 *     requestBody:
 *       description: Update user farm details.
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: { "id":"2", "farmName": "New Heritage Town1", "registrationNo": "ASABBBG45566", "lat": 30.0222, "log": 31.0222, "address": "Nainital, uttarakhand", "area": 125.3, "areaUomId": 1, "parameter": 123, "parameterUomId": 1, "farmingGoals": [ { "farmingGoalOptId": "1", "farmingGoal": "third goals" } ], "farmOwnershipType": "personal", "farmGeofence": [], "farmType": 846, "productionSystem": 849, "farmOwner": 17, "country": "india", "state": "uttarakhand", "city": "nainital", "govRegistrationNum": "s323234d", "contractMating": "dsfs2323432", "cooperativeId": "sdfsdf3233", "licenceNum": "sdfsf333", "licenceExpiryDate": "2022-03-04", "regulatorName": "some name", "houseNum": "45d", "street": "new street", "regulatorRepresentiveName": "sahil" }
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Updated successfully.", "data": {} }
 */

router.put(
  "/",
  auth,
  convertEmptyStringToNull(),
  farmPutValidation(),
  validationErrorHandler,
  async (req, res) => {
    const {
      createFarmSegment,
      createFarmLocation,
      createCircularGeofence,
    } = require(rootPath + "/helpers/controller");


    try {
    
      const userId = req.user.id;
      const userFirstName = req.user.firstName;
      const userMiddleName = req.user.middleName || '';
      const userLastName = req.user.lastName;
        let subOrganizationId = req.user.subOrgId || null;
      let {
        id,
        farmName,
        registrationNo,
        lat,
        log,
        address,
        region,
        area,
        parameter,
        areaUomId,
        farmOwnershipType,
        farmingGoalOptId,
        farmingGoals,
        farmGeofence,
        // new
        farmType,
        productionSystem,
        farmOwner,
        country,
        state,
        city,
        govRegistrationNum,
        contractMating,
        cooperativeId,
        licenceNum,
        licenceExpiryDate,
        regulatorName,
        regulatorRepresentiveName,
        houseNum,
        street,
        farmerFirstName,
        farmerMiddleName,
        farmerLastName,
        farmerId,
        isTechnician,
        recordId,
        farmGeofenceName,
        farmGeofenceCategory,
        productionType,
        certifications,
        technicianId,

        farmNumber,
        farmGeofenceRadius,
        farmGeofenceType,
        societyId
      } = req.body;

      technicianId = technicianId ? parseInt(technicianId) : technicianId

      const farmId = id; // assigning farm id to farmId var.
      let set = {
        farmName,
        registrationNo,
        lat,
        log,
        address,
        region,
        area,
        parameter,
        areaUomId,
        farmOwnershipType,
        farmingGoalOptId,
        // new
        farmType,
        productionSystem,
        farmOwner,
        country,
        state,
        city,
        govRegistrationNum,
        contractMating,
        cooperativeId,
        licenceNum,
        licenceExpiryDate,
        regulatorName,
        regulatorRepresentiveName,
        houseNum,
        street,
        farmerFirstName,
        farmerMiddleName,
        farmerLastName,
        farmerId,
        isTechnician,
        recordId,
        farmGeofenceName,
        farmGeofenceCategory,
        productionType,
        societyId
      };

      let farmResponseBeUpdate = await db.user_farm.findOne({
        where: {id}
      });
      if (farmGeofenceType === "circular") {
        set.parameter = getPerimeterFromCircularInFeet(farmGeofenceRadius);
        set.area = getAreaFromCircularInAcre(farmGeofenceRadius);
      } else {
        if (Array.isArray(farmGeofence)) {
          set.parameter =
            getPerimeterFromPolygonsInFeet(farmGeofence) ?? set.parameter;
          set.area = getAreaFromPolygonsInAcre(farmGeofence) ?? set.area;
        }
      }

      // certifications;
      let certificateIds = [];
      if (certifications && certifications.length) {
        for (const certificate of certifications) {
          if (certificate) {
            const { id, name } = certificate;
            if (id) {
              certificateIds.push(id);
            } else {
              const set = {
                name,
                groupName: "certification",
                userId
              };
              const newCertificate = await db.Option.create(set);
              certificateIds.push(newCertificate.id);
            }
          }
        }
      }

      if(!isTechnician) {
        set.farmerFirstName = userFirstName
        set.farmerMiddleName = userMiddleName;
        set.farmerLastName = userLastName
        set.userId = userId
        set.technicianId = 0
      } else if(isTechnician && farmResponseBeUpdate.oldUserId) {

        let existingUser
        if(farmerId) {
          existingUser = await db.sequelize.query(`
            SELECT
                uft.userId,
                u2.firstName,
                u2.middleName,
                u2.lastName
            FROM
                users u
            INNER JOIN user_farms uft ON
                uft.technicianId = u.id
            INNER JOIN user_farms uf ON
                uf.userId = uft.userId  
            INNER JOIN users u2 ON
                u2.id = uf.userId      
            INNER JOIN organization o ON
                u.organization = o.id
            WHERE
                uft.farmerId = :farmerId
                AND uft.isTechnician = 1
                AND o.id = :orgId
                AND u2.organization = :orgId
                AND u.organization = :orgId
                ${subOrganizationId ? "AND u.subOrganizationId = :subOrganizationId" : ""}
                ${subOrganizationId ? "AND u2.subOrganizationId = :subOrganizationId" : ""}
            ORDER BY
                uf.createdAt DESC 
          `, {
            replacements: { farmerId, orgId: req.user.organization, subOrganizationId },
            type: db.Sequelize.QueryTypes.SELECT,
          });

        }

        if (existingUser && Array.isArray(existingUser) && existingUser.length > 0) {
          set.userId = existingUser[0].userId

          set.farmerFirstName = existingUser[0].firstName
          set.farmerMiddleName = existingUser[0].middleName;
          set.farmerLastName = existingUser[0].lastName
          set.technicianId = userId
          await db.user_farm.update({farmerFirstName: existingUser[0].firstName, farmerMiddleName: existingUser[0].middleName, farmerLastName: existingUser[0].lastName}, {where: {id}})
        } else {
          set.userId = farmResponseBeUpdate.oldUserId
          set.technicianId = userId
  
          await db.user.update({firstName: farmerFirstName, middleName: farmerMiddleName , lastName: farmerLastName}, { where: { id: farmResponseBeUpdate.oldUserId } } )
        }
     
      } 
      else if(isTechnician && !technicianId) {
        let existingUser
        if(farmerId) {
          existingUser = await db.sequelize.query(`
            SELECT
                uft.userId,
                u2.firstName,
                u2.middleName,
                u2.lastName
            FROM
                users u
            INNER JOIN user_farms uft ON
                uft.technicianId = u.id
            INNER JOIN user_farms uf ON
                uf.userId = uft.userId  
            INNER JOIN users u2 ON
                u2.id = uf.userId      
            INNER JOIN organization o ON
                u.organization = o.id
            WHERE
                uft.farmerId = :farmerId
                AND uft.isTechnician = 1
                AND o.id = :orgId
                AND u2.organization = :orgId
                AND u.organization = :orgId
                ${subOrganizationId ? "AND u.subOrganizationId = :subOrganizationId" : ""}
                ${subOrganizationId ? "AND u2.subOrganizationId = :subOrganizationId" : ""}
            ORDER BY
                uf.createdAt DESC 
          `, {
            replacements: { farmerId, orgId: req.user.organization, subOrganizationId },
            type: db.Sequelize.QueryTypes.SELECT,
          });

        }


        if (existingUser && Array.isArray(existingUser) && existingUser.length > 0) {
          set.userId = existingUser[0].userId
          set.farmerFirstName = existingUser[0].firstName
          set.farmerMiddleName = existingUser[0].middleName;
          set.farmerLastName = existingUser[0].lastName
          set.technicianId = userId
          await db.user_farm.update({farmerFirstName: existingUser[0].firstName, farmerMiddleName: existingUser[0].middleName, farmerLastName: existingUser[0].lastName}, {where: {id}})
        } 
         else {
          req.body = {
            ...req.body,
            name: `${req.body.farmerFirstName || ""} ${req.body.farmerMiddleName || ""} ${req.body.farmerLastName || ""}`.trim(),
            address: req.body.address,
          }
          let newFarmerId = await addOfflineFarmer(req, res, true)
          set.userId = newFarmerId
          set.oldUserId = newFarmerId
        }
        set.technicianId = userId
      } 
      // remove undefined values before inserting
      Object.keys(set).forEach((key) => {
        set[key] == undefined || set[key] == null ? delete set[key] : {};
      });

      // check if the farm name and registration number is unique together
      const { isUniqueRegNoAndFarmNameTogether } = require(rootPath +
        "/helpers/controller");
      const isUnique = await isUniqueRegNoAndFarmNameTogether(req);
      // if not unique send error message
      if (!isUnique) {
        return res.status(success.code.OK).json(
          await errorResp({
            code: success.code.OK,
            msg: error.NOT_UNIQUE_FARMNAME_AND_REGISTRATIONNO,
          })
        );
      }

      try {
        //create farm certificate;
        await db.FarmCertificate.destroy({
          // delete if old farm certificate exists;
          where: {
            farmId,
          },
        });

        if (certificateIds.length) {
          const farmCertificates = certificateIds.map((id) => ({
            certificateId: id,
            farmId,
          }));
          await db.FarmCertificate.bulkCreate(farmCertificates);
        }

        // insert farm data into DB
        let [result] = await db.user_farm.update(set, {
          where: {
            id,
            [Op.or]: [{ userId: userId }, { technicianId: userId }],
          },
        });

        // check if the farming goals array is not empty
        // Delete old farming goals
        await db.UserFarmingGoal.destroy({
          where: {
            farmId,
          },
        });

        if (
          farmingGoals &&
          Array.isArray(farmingGoals) &&
          notEmpty(farmingGoals) &&
          result
        ) {
          const farmingGoalsArr = farmingGoals
            .filter((goal) => !!goal)
            .map((data) => {
              const { farmingGoalOptId, farmingGoal } = data;
              return {
                farmId,
                userId,
                farmingGoalOptId,
                farmingGoal,
              };
            });

          if (farmingGoalsArr.length) {
            // insert farming goals if array is not empty
            await db.UserFarmingGoal.bulkCreate(farmingGoalsArr, {});
          }
        }

        if (farmGeofence) {
          // Delete old coordinated of geofencing
          await db.UserFarmCoordinate.destroy({
            where: {
              farmId,
            },
          });
        }
        // check if farm geofeces coordinates are there in the body
        if (
          farmGeofence &&
          Array.isArray(farmGeofence) &&
          notEmpty(farmGeofence) &&
          result
        ) {
          const farmCoordinates = farmGeofence
            .filter((item) => !!item)
            .map((data) => {
              const { lat, log } = data;
              return {
                farmId,
                userId,
                lat,
                log,
              };
            });

          if (farmCoordinates.length) {
            // insert data into the user farm coordinates
            await db.UserFarmCoordinate.bulkCreate(farmCoordinates, {});
          }
        }

        if (farmGeofence?.length || farmGeofenceType === "circular") {
          const existingPrimaryLocation = await db.FarmLocation.findOne({
            where: {
              farmId,
              // userId,
              isDeleted: 0,
              isPrimary: 1,
            },
          });
          if (existingPrimaryLocation) {
            await db.FarmLocation.destroy({
              where: {
                id: existingPrimaryLocation?.id,
                isPrimary: 1,
              },
            });
            if (!req.body?.zoneRecordId) {
              // for backward compatibility
              await db.Geofence.destroy({
                where: {
                  farmId,
                  farmLocationId: existingPrimaryLocation.id,
                  isPrimary: 1,
                },
              });
            }
          }

          // only create new primary location only if none exist
          let farmLocationRes = await db.FarmLocation.findOne({
            where: {
              // userId: createFarmLocationInput.userId,
              farmId: farmId,
              isDeleted: 0,
            },
          });

          if (!farmLocationRes) {
            const farmLocationInput = {
              isPrimary: 1,
              address: address || existingPrimaryLocation?.address,
              area: set.area || area || existingPrimaryLocation?.area,
              city: city || existingPrimaryLocation?.city,
              areaUomId: areaUomId || existingPrimaryLocation?.areaUomId,
              country: country || existingPrimaryLocation?.country,
              farmId: farmId,
              farmNumber: farmNumber || existingPrimaryLocation?.farmNumber,
              lat: lat || existingPrimaryLocation?.lat,
              log: log || existingPrimaryLocation?.log,
              farmLocationGeofence: farmGeofence,
              parameter: parameter || existingPrimaryLocation?.parameter,
              state: state || existingPrimaryLocation?.state,
              street: street || existingPrimaryLocation?.street || "",
              userId: req.user.id,
              farmGeofenceType: req.body?.farmGeofenceType,
              farmGeofenceCenterLat: req.body?.farmGeofenceCenterLat,
              farmGeofenceCenterLog: req.body?.farmGeofenceCenterLog,
              farmGeofenceRadius: req.body?.farmGeofenceRadius,
              farmGeofenceName: req.body?.farmGeofenceName,
              farmGeofenceCategory: req.body?.farmGeofenceCategory,
              recordId: recordId || existingPrimaryLocation?.recordId,
              locationRecordId:
                req.body?.locationRecordId || existingPrimaryLocation?.recordId,
              zoneRecordId: req.body?.zoneRecordId,
            };
            //both main polygon and circular geofence will be created in createFarmLocation
            await createFarmLocation(farmLocationInput, req);
          }
        }

        await syncFarmerDataToOCC(req.user.id);


        //sync farm data to DDS
        await syncFarmData("UPDATED", {
          farmId,
          userId,
          farmName,
          areaInAcre: area,
          farmType: farmGeofenceType === "circular" ? "POINT" : "POLYGON",
          location: address,
          centerLatitude: req.body?.farmGeofenceCenterLat,
          centerLongitude: req.body?.farmGeofenceCenterLog,
          radius: req.body?.farmGeofenceRadius,
        }, farmGeofence);

        //queue to create farm in livestock microservice
        set.syncId = id;
        updateFarmQueue.add({ farmData: set }, { jobId: new Date().getTime() });

        const farmResponse = await db.user_farm.findOne({
          where: { id },
          include: [
            {
              model: db.Option,
              as: "farmCertifications",
              attributes: ["id", "name"],
            },
          ],
        });
        return res.json(
          await successResp({
            msg: result ? success.UPDATED : error.NOT_FOUND,
            data: {
              inviteLink: farmResponse?.dataValues?.inviteLink,
              farm: farmResponse,
            },
          })
        );
      } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc delete farm with farm id
 */
/**
 * @swagger
 * /farm:
 *   delete:
 *     summary: delete(soft delete) farm with farm id.
 *     description: delete(soft delete) farm with farm id.
 *     tags: [Farm]
 *     requestBody:
 *       description: delete(soft delete) farm with farm id
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: { "farmId":348}
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Deleted successfully.", "data": {} }
 */

router.delete(
  "/",
  auth,
  farmDeleteValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { farmId } = req.body;
      // update delete flag
      let set = {
        isDeleted: 1,
      };
      const checkCropsReg = await db.UserfarmCrop.findAll({
        where: {
          farmId,
        },
      });
      const checkCropsRegOther = await db.UserCropFarm.findAll({
        where: {
          farmId,
        },
      });
      if (checkCropsReg.length != 0 || checkCropsRegOther.length != 0) {
        return res.status(200).json(
          await errorResp({
            code: 200,
            msg: error.CROP_ASSOCIATED_TO_FARM,
          })
        );
      }
      // update delete flag in the farm table
      let [result] = await db.user_farm.update(set, {
        where: {
          id: farmId,
          // userId,
        },
      });
      await syncFarmerDataToOCC(userId);
      await syncFarmData('DELETED', { farmId, userId });

      // return response
      return res.json(
        await successResp({
          msg: result ? success.DELETED : 200,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @desc delete farm with farm id
 */
/**
 * @swagger
 * /farm/hard-delete:
 *   delete:
 *     summary: delete(hard delete) farm with farm id.
 *     description: delete(hard delete) farm with farm id.
 *     tags: [Farm]
 *     requestBody:
 *       description: delete(hard delete) farm with farm id
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: { "farmId":348}
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Deleted successfully.", "data": {} }
 */

router.delete(
  "/hard-delete",
  auth,
  // farmDeleteValidation(),
  validationErrorHandler,
  async (req, res) => {
    // const transaction = await db.sequelize.transaction({ timeout: 10000 });
    try {
      const userId = req.user.id;
      const { farmId } = req.body;
      const farmExist = await db.user_farm.findOne({
        where: {
          id: farmId,
          [Op.or]: [{ userId: userId }, { technicianId: userId }],
        },
      });
      if (farmExist) {
        const tablesToDelete = [
          { table: db.Event, condition: { farmId: farmId } },
          { table: db.UserCropFarm, condition: { farmId: farmId } },
          { table: db.IrrigationFarm, condition: { farm: farmId } },
          { table: db.CropObservationFarm, condition: { farm: farmId } },
          { table: db.SoilInformationFarm, condition: { farmId: farmId } },
          { table: db.SoilManagementFarm, condition: { farmId: farmId } },
          { table: db.Irrigation, condition: { farm: farmId } },
          {
            table: db.SoilInformation,
            condition: { soilTestLocationFarmId: farmId },
          },
          { table: db.UserCropGoalFarm, condition: { farmId: farmId } },
          { table: db.AuditResponse, condition: { farmId: farmId } },
          {
            table: db.CacaoPlantationsUserFarmsMap,
            condition: { farm_id: farmId },
          },
          { table: db.CropObservationFarm, condition: { farm: farmId } },
          { table: db.CropStorageFarm, condition: { farm: farmId } },
          { table: db.DiseaseManagementFarm, condition: { farmId: farmId } },
          { table: db.EquipmentUserFarm, condition: { farmID: farmId } },
          {
            table: db.SoilManagement,
            condition: { testLocationFarmId: farmId },
          },
          { table: db.HarvestingFarm, condition: { farmId: farmId } },
          {
            table: db.MapSoilFertilityAuditFarms,
            condition: { userFarmId: farmId },
          },
          {
            table: db.MapSoilPrepPracticeFarms,
            condition: { userFarmId: farmId },
          },
          { table: db.MapSowingFarms, condition: { userFarmId: farmId } },
          { table: db.MapUserGoalFarms, condition: { userFarmId: farmId } },
          { table: db.MapWeedFarms, condition: { userFarmId: farmId } },
          { table: db.UserfarmCrop, condition: { farmId: farmId } },
          { table: db.NutrientManagementFarm, condition: { farmId: farmId } },
          { table: db.PestManagementFarm, condition: { farmId: farmId } },
          { table: db.PlantationsUserFarmsMap, condition: { farm_id: farmId } },
          {
            table: db.surveyUserResponseEntityList,
            condition: { farmId: farmId },
          },
          { table: db.surveyQuestionsResponse, condition: { farmId: farmId } },
          { table: db.userLiveStockFarm, condition: { farm: farmId } },
          { table: db.FarmCertificate, condition: { farmId } },
          { table: db.FarmReport, condition: { farmId } },
          { table: db.PurchaseOrderManagement, condition: { farmId } },
          {
            rawQuery: `
              DELETE FROM survey_questions_response 
              WHERE surveyUserResponseEntityId IN (
                SELECT uuid FROM survey_user_response_entiity 
                WHERE farmId = ${farmId}
              )`,
          },
          {
            rawQuery: `
              DELETE FROM user_crop_farms 
              WHERE userFarmCropId IN (
                SELECT id FROM user_farm_crops 
                WHERE farmId = ${farmId}
              )`,
          },
        ];

        await Promise.all(
          tablesToDelete.map(async ({ table, condition, rawQuery }) => {
            if (table) {
              await table.destroy({
                where: condition,
                force: true,
                individualHooks: true,
              });
            } else if (rawQuery) {
              await db.sequelize.query(rawQuery);
            }
          })
        );
      } else {
        throw new Error("Farm doesn't exist");
      }

      const farmDeleted = await db.user_farm.destroy({
        where: {
          id: farmId,
          [Op.or]: [{ userId: userId }, { technicianId: userId }],
        },
        force: true,
      });

      // await transaction.commit();

      await syncFarmerDataToOCC(userId);
      return res.json(
        await successResp({
          msg: farmDeleted ? success.DELETED : 200,
        })
      );
    } catch (err) {
      console.log(err);
      // await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /farm:
 *   get:
 *     summary: Fetch user farm list.
 *     description: Fetch user farm list.
 *     tags: [Farm]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: string
 *         example: 1
 *         description: page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: string
 *         example: 5
 *       - in: query
 *         name: col
 *         required: false
 *         schema:
 *           type: string
 *         example: 'id'
 *         description: name of the column to sort
 *       - in: query
 *         name: desc
 *         required: false
 *         schema:
 *           type: enum(1,0)
 *         example: 1
 *         description: descending true or false
 *       - in: query
 *         name: segment
 *         required: false
 *         schema:
 *           type: enum(1,0)
 *         description: list with segment(1) or without segment(0)
 *       - in: query
 *         name: goal
 *         required: false
 *         schema:
 *           type: string
 *         description: id of the goal, for passing multiple id's seperate it by colon(:)
 *       - in: query
 *         name: ownership
 *         required: false
 *         schema:
 *           type: enum('personal', 'community','commercial')
 *         description: ownership type of the farm, for passing multiple id's seperate it by colon(:)
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: farmName
 *         required: false
 *         schema:
 *           type: string
 *         description: search by exact farm name
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "num_rows": 5, "info": [ { "createdAt": "09/05/2022", "id": 684, "userId": 17, "farmName": "New Heritage Town1", "ownerName": null, "registrationNo": "ASABBBG45566", "farmOwnershipType": "personal", "address": "Nainital, uttarakhand", "district": null, "zipCode": null, "farmingActivity": null, "area": 125.3, "parameter": 123, "lat": 30.0222, "log": 31.0222, "farmType": 846, "productionSystem": 849, "farmOwner": 17, "country": "india", "state": "uttarakhand", "city": "nainital", "govRegistrationNum": "s323234d", "contractMating": "dsfs2323432", "cooperativeId": "sdfsdf3233", "licenceNum": "sdfsf333", "licenceExpiryDate": "2022-03-04", "regulatorName": "some name", "regulatorRepresentiveName": "sahil", "houseNum": "45d", "street": "new street", "configuration": [ { "name": "area", "unit": { "id": 5, "name": "acre", "abbreviation": "acre" } }, { "name": "parameter", "unit": { "id": 15, "name": "meters", "abbreviation": "m" } } ], "coordinates": [], "farmCrops": [], "farmGoals": [ { "id": 1033, "farmingGoal": "third goals" } ], "farmLivestocks": [], "farmEquipments": [], "segments": [], "geofence": "Unmapped", "farmId": "agzon-684" } ] } }
 */

router.get(
  "/",
  listValidation(),
  validationErrorHandler,
  auth,
  translation,
  async (req, res) => {
    try {
      const userId = req.user.id;
      let {
        page = 1,
        limit,
        col = "id",
        desc = "1",
        search,
        ownership: farmOwnershipType,
        goal: farmingGoalOptId,
        segment,
        geofence,
        farmName,
      } = req.query;
      limit = limit ? parseInt(limit) : 100000;

      // check if society user
      let societyUserRes = await db.user.findOne({
      where: { id: userId },
        include: [
        {
          model: db.Membership,
          as: "user_membership",
          required: true,
          through: {
            model: db.UserMembershipMap,
          },
          include: [
            {
              model: db.UserRoleMembershipMap,
              as: "userRoleMembershipMap",
              where: {
                user_role_id: "society",
              },
              required: true,
            },
          ],
        },
      ],
      })

      let whereFarmGoal = null;
      let where = {
        [db.Sequelize.Op.or]: [
          { userId: userId }, 
          { technicianId: userId },
           ...(societyUserRes ? [{ societyId: userId }] : []),
        ],
        isDeleted: 0,
      };

      if (notEmpty(farmName)) {
        farmName = querystring.unescape(farmName).trim();
        farmName = he.encode(farmName).trim()
        where.farmName = {
          [Op.like]: "%" + farmName + "%",
        };
      }
      if (notEmpty(farmOwnershipType)) {
        farmOwnershipType = farmOwnershipType.split(":");
        where.farmOwnershipType = farmOwnershipType;
      }
      if (notEmpty(farmingGoalOptId)) {
        farmingGoalOptId = farmingGoalOptId.split(":");
        whereFarmGoal = {
          ...whereFarmGoal,
          farmingGoalOptId,
        };
      }

      // check if search query is not empty
      if (notEmpty(search)) {
        const fields = [
          "farmName",
          "ownerName",
          "farmOwnershipType",
          "address",
          "zipCode",
          "area",
          "parameter",
        ];
        const searchQuery = fields.map((col) => {
          return {
            [col]: {
              [db.Sequelize.Op.like]: "%" + search + "%",
            },
          };
        });
        where = { ...where, [db.Sequelize.Op.or]: searchQuery };
      }

      let query = {
        include: [
         
          {
            ...(geofence == 1 ? { required: true } : null),
            attributes: ["id", "lat", "log"],
            model: db.UserFarmCoordinate,
            as: "coordinates",
          },
          {
            attributes: ["id", "cropTypeOptId"],
            model: db.UserfarmCrop,
            as: "farmCrops",
            include: [
              {
                attributes: [
                  "id",
                  [
                    db.sequelize.literal(
                      "`farmCrops->cropVariety->crop`.`name`"
                    ),
                    "cropName",
                  ],
                ],
                model: db.UserfarmCropVariety,
                as: "cropVariety",
                include: [{ model: db.Crop, as: "crop", attributes: [] }],
              },
            ],
          },
          {
            attributes: ["id", "farmingGoal", "farmingGoalOptId"],
            model: db.UserFarmingGoal,
            as: "farmGoals",
            ...(whereFarmGoal === null
              ? null
              : { where: { ...whereFarmGoal } }),
          },
        
          {
            attributes: ["id", "displayName"],
            model: db.Equipment,
            as: "farmEquipments",
            through: { attributes: [] },
          },
         
          {
            model: db.user,
            as: "includeFarmOwner",
            attributes: [
              "id",
              "firstName",
              "middleName",
              "lastName",
              "fullName",
              "dimitraUserId",
            ],
          },
          {
            model: db.user,
            as: "society",
            attributes: [
              "id",
              "firstName",
              "middleName",
              "lastName",
              "fullName",
              "dimitraUserId",
              "mobile",
              "email",
            ],
            required: false
          },
          {
            model: db.Option,
            as: "includeFarmType",
            attributes: ["id", "name"],
          },
          {
            model: db.Option,
            as: "farmCertifications",
            attributes: ["id", "name"],
          },
          {
            model: db.user,
            as: "user",
            attributes: ["firstName", "middleName", "lastName"],
            where: { id: db.Sequelize.col("userId") }, // fetch farmer details using userId
          },
        ],
        attributes: [
          "id",
          "userId",
          "farmName",
          "ownerName",
          "registrationNo",
          "farmOwnershipType",
          "address",
          "district",
          "zipCode",
          "farmingActivity",
          "area",
          "parameter",
          "lat",
          "log",
          "createdAt",
          // new
          "farmType",
          "productionSystem",
          "farmOwner",
          "country",
          "state",
          "city",
          "govRegistrationNum",
          "contractMating",
          "cooperativeId",
          "licenceNum",
          "licenceExpiryDate",
          "regulatorName",
          "regulatorRepresentiveName",
          "houseNum",
          "street",
          "recordId",
          "farmerFirstName",
          "farmerMiddleName",
          "farmerLastName",
          "farmerId",
          "isTechnician",
          "inviteLink",
          "farmGeofenceName",
          "farmGeofenceCategory",
          "productionType",
          "technicianId",
          "dimitraFarmId",
          "societyId",
        ],
        where,
        limit,
        offset: (page - 1) * limit,
        order: [
          [col, desc == "1" ? "DESC" : "ASC"],
          ["coordinates", "id", "ASC"],
        ],
      };

      let [organization, result] = await Promise.all([
        db.sequelize.query(
          `select code from organization og inner join users u on og.id = u.organization where u.id=?`,
          {
            replacements: [userId],
            type: db.sequelize.QueryTypes.SELECT,
            plain: true,
          }
        ),
        db.user_farm.findAll(query),
      ]);

      let farmIdArr = result.map((el) => el.id);

      // fetch farm locations key is "locations"
      let farmLocations,
        farmSegments,
        circularGeofence,
        farmLocationsHash = {},
        farmSegmentsHash = {},
        circularGeofenceHash = {};
      farmLocations = await db.FarmLocation.findAll({
        where: {
          farmId: farmIdArr,
        },
        include: [
          {
            model: db.Geofence,
            where: { deletedAt: null },
            required: false,
            as: "zones",
            include: [
              {
                model: db.GeofenceCoordinate,
                as: "geofence_coordinates",
              },
            ],
          },
        ],
      });
      farmSegments = await db.Geofence.findAll({
        include: [
          {
            attributes: ["unit_subCategory_id"],
            model: db.UnitConfiguration,
            as: "configuration",
            required: false,
            where: {
              unit_subCategory_id: [3, 14],
            },
            include: [
              {
                model: db.Unit,
                attributes: [["field", "name"]],
                as: "subCategory",
              },
              {
                model: db.Unit,
                attributes: ["id", ["field", "name"], "abbreviation"],
                as: "unit",
              },
            ],
          },
          {
            model: db.GeofenceCoordinate,
            attributes: ["id", "lat", "log"],
            as: "coordinates",
            required: false,
          },
        ],
        where: {
          [Op.or]: [{ isPrimary: false }, { isPrimary: null }],
          farmId: farmIdArr,
        },
      });
      circularGeofence = await db.Geofence.findAll({
        where: {
          isPrimary: true,
          geofenceRadius: {
            [Op.ne]: null,
            [Op.not]: 0,
          },
          farmId: farmIdArr,
        },
        attributes: [
          "id",
          "geofenceRadius",
          "geofenceCenterLat",
          "geofenceCenterLog",
          "farmId",
        ],
      });

      farmLocations.forEach((el) => {
        farmLocationsHash[el.farmId] = [
          ...(farmLocationsHash[el.farmId] || []),
          el,
        ];
      });
      farmSegments.forEach((el) => {
        farmSegmentsHash[el.farmId] = [
          ...(farmSegmentsHash[el.farmId] || []),
          el,
        ];
      });
      circularGeofence.forEach((el) => {
        circularGeofenceHash[el.farmId] = [
          ...(circularGeofenceHash[el.farmId] || []),
          el,
        ];
      });

      // datasetObj[cus.customerId.customerName] = [ ...(datasetObj[cus.customerId.customerName] || []), tmpVar]

      // itemsById[item.id] = [...(itemsById[item.id] || []), item];

      // restructure data for sending in response if `result` not empty
      let response = [],
        translationException = []; // translation exception for enums
      if (notEmpty(result)) {
        for (let el of result) {
          el = await el.toJSON();
          el.locations = farmLocationsHash[el.id];
          el.segments = farmSegmentsHash[el.id];
          el.circularGeofence =
            Array.isArray(circularGeofenceHash[el.id]) &&
            circularGeofenceHash[el.id].length > 0
              ? circularGeofenceHash[el.id][0]
              : null;

          let { configuration, segments, mainLocation, locations } = el;
          el.geofence = req.simpleTranslate("Unmapped");
          if (el.coordinates && el.coordinates.length > 0) {
            el.geofence = req.simpleTranslate("Mapped");
          }

          if (
            el.circularGeofence !== undefined &&
            el.circularGeofence !== null
          ) {
            el.geofence = req.simpleTranslate("Mapped");
          }

          el.farmId = organization?.code + "-" + el.id;
          // update configuration values
          // el.configuration = configuration.map((config) => {
          //   return { name: req.simpleTranslate(config.subCategory?.name), unit: config?.unit };
          // });
          el.configuration = []; // since this field is not used in frontend so just send an empty array for old apps;

          let primaryLocation;

          if (notEmpty(locations)) {
            el.locations.forEach((item) => {
              if (item.isPrimary) {
                primaryLocation = item;
                item.area = el.area;
                item.parameter = el.parameter;
              }
              if (item.zones.length > 0) {
                item.zones.forEach((zoneItem) => {
                  if (zoneItem.isPrimary) {
                    zoneItem.geofenceArea = item.area;
                    zoneItem.geofenceParameter = item.parameter;
                  }
                });
              }
            });
          }

          // if (mainLocation && mainLocation.isPrimary) {
          //   el.mainLocation.area = el.area;
          //   el.mainLocation.parameter = el.parameter;

          //   if(el.mainLocation.zones.length > 0){
          //     el.mainLocation.zones.forEach((item)=>{
          //       if(item.isPrimary){
          //         item.geofenceArea = el.area;
          //         item.geofenceParameter = el.parameter;
          //       }
          //     })
          //   }
          // }

          if (notEmpty(segments)) {
            el.geofence = req.simpleTranslate("Mapped");
            el.segments = segments.filter((segment) => {
              let { configuration } = segment;
              // update configuration array inside segment array
              configuration = configuration.map((config) => {
                return {
                  name: req.simpleTranslate(config.subCategory?.name),
                  unit: config?.unit,
                };
              });

              // this is to exclude secondary geofences/zones
              if (segment?.farmLocationId == primaryLocation?.id) {
                return { ...segment, configuration };
              } else {
                return null;
              }
            });
          }
          if (notEmpty(el.farmEquipments)) {
            el.farmEquipments = req.translateFunction(
              el.farmEquipments,
              globalTranslationCache,
              {
                lvl1: true,
                lvl2: true,
              }
            );
          }
          let transExcepObj = {};
          transExcepObj.productionTypeValue = el.productionType;
          transExcepObj.farmOwnerShipValue = el.farmOwnershipType;
          translationException.push(transExcepObj);
          response.push(el);
        }
        response = req.translateFunction(response, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
        });
      }
      // doing it here because it will be difficult to find it on translation middleware later
      for (let i = 0; i < response.length; i++) {
        response[i].productionTypeValue =
          translationException[i].productionTypeValue;
        response[i].farmOwnerShipValue =
          translationException[i].farmOwnerShipValue;
        response[i].farmerFirstName = response[i].user?.firstName;
        response[i].farmerMiddleName = response[i].user?.middleName;
        response[i].farmerLastName = response[i].user?.lastName;
      }

      return res.json(
        await successResp({
          msg: success.FETCH,
          data: {
            num_rows: response.length,
            data: response,
          },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /farm/names:
 *   get:
 *     summary: List user farm names.
 *     description: List user farm names.
 *     tags: [Farm]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "farms": [ "corbett farm", "Corbet Farmers", "New Heritage Farm", "New Heritage Farms", "xjjss", "zkllflf", "smsmmgk", "hdhd", "hdhdffv", "jfjfjf", "xggxg", "bkj", "my new farm" ] } }
 */

router.get("/names", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    let farms = await db.user_farm.findAll({
      where: { userId },
      attributes: ["farmName"],
      group: ["farmName"],
    });

    farms = farms?.map(({ farmName }) => farmName);

    return res.json(
      await successResp({
        msg: success.FETCH,
        data: {
          farms,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return res.status(error.code.SERVER_ERROR).json(await errorResp());
  }
});

/**
 * @swagger
 * /farm/select-farmers:
 *   get:
 *     summary: get farmer list for drop downs.
 *     description: get farmer list for drop downs.
 *     tags: [Farm]
 *     parameters:
 *      - in: query
 *        name: search
 *        description: for searching farmer with name
 *        schema:
 *          type: string
 *        example: santosh
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "fullName": "hemant rathore", "id": 71, "firstName": "hemant", "lastName": "rathore" }, { "fullName": "fgf fgg", "id": 123136, "firstName": "fgf", "lastName": "fgg" } ] }
 */
router.get(
  "/select-farmers",
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { search } = req.query;
      let where = {};

      if (!_.isEmpty(search)) {
        const searchQuery = db.Sequelize.where(
          db.Sequelize.fn(
            "CONCAT",
            db.Sequelize.fn("COALESCE", db.Sequelize.col("firstName"), ""),
            " ",
            db.Sequelize.fn("COALESCE", db.Sequelize.col("middleName"), ""),
            " ",
            db.Sequelize.fn("COALESCE", db.Sequelize.col("lastName"), "")
          ),
          {
            [db.Sequelize.Op.substring]: search,
          }
        );
      
        where = { ...where, [db.Sequelize.Op.or]: [searchQuery] };
      }
      

      const farmers = await db.user.findAll({
        attributes: ["id", "fullName", "firstName", "middleName","lastName"],
        include: [
          {
            required: true,
            model: db.Membership,
            as: "user_membership",
            attributes: [],
            where,
            through: { required: true, attributes: [] },
            include: [
              {
                required: true,
                model: db.UserRoleMembershipMap,
                as: "userRoleMembershipMap",
                attributes: [],
                where: { user_role_id: "farmer" },
              },
            ],
          },
        ],
      });

      return res.json(
        await successResp({
          msg: success.FETCH,
          data: farmers,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /farm/primary:
 *   get:
 *     summary: fetch primary farm details of the user.
 *     description: fetch primary farm details of the user.
 *     tags: [Farm]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "createdAt": "04/07/2022", "id": 665, "address": "Rangadhampetha Chak, Maharashtra 442504, India", "district": null, "farmingGoalOptId": null, "zipCode": null, "farmName": "sodari", "region": null, "registrationNo": "12345#S", "ownerName": null, "communityName": null, "lat": 18.724574, "log": 80.1158988, "farmingActivity": null, "farmOwnershipType": "personal", "parameter": 329.375, "area": 12474.9, "farmType": null, "productionSystem": null, "farmOwner": null, "country": null, "state": null, "city": null, "govRegistrationNum": null, "contractMating": null, "cooperativeId": null, "licenceNum": null, "licenceExpiryDate": null, "regulatorName": null, "regulatorRepresentiveName": null, "houseNum": null, "street": null, "coordinates": [ { "farmId": 665, "lat": "18.72526049228991", "log": "80.11474750936033" }, { "farmId": 665, "lat": "18.72520270189818", "log": "80.11508043855427" }, { "farmId": 665, "lat": "18.72516205808947", "log": "80.11529367417097" }, { "farmId": 665, "lat": "18.725126812287822", "log": "80.1155411079526" } ], "farmCrops": [ { "id": 193, "cropTypeOptId": 100, "cropVariety": [ { "id": 589, "cropName": "Agrifound Light Red" } ] } ], "farmLivestocks": [], "farmEquipments": [], "segments": [], "includeFarmOwner": null, "includeFarmType": null, "includeProductionSystem": null, "geofence": "Unmapped" } }
 */
router.get(
  "/primary",
  auth,
  // fetchOneValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;

      let query = {
        include: [
          {
            attributes: ["farmId", "lat", "log"],
            model: db.UserFarmCoordinate,
            as: "coordinates",
          },
          {
            attributes: ["id", "cropTypeOptId"],
            model: db.UserfarmCrop,
            as: "farmCrops",
            include: [
              {
                attributes: [
                  "id",
                  [
                    db.sequelize.literal(
                      "`farmCrops->cropVariety->crop`.`name`"
                    ),
                    "cropName",
                  ],
                ],
                model: db.UserfarmCropVariety,
                as: "cropVariety",
                include: [{ model: db.Crop, as: "crop", attributes: [] }],
              },
            ],
          },
          {
            attributes: ["id", "displayName"],
            model: db.userLiveStock,
            as: "farmLivestocks",
            through: { attributes: [] },
          },
          {
            attributes: ["id", "displayName"],
            model: db.Equipment,
            as: "farmEquipments",
            through: { attributes: [] },
          },
          {
            as: "segments",
            model: db.Geofence,
            required: false,
            attributes: [
              "id",
              "geofenceName",
              "geofenceArea",
              "geofenceParameter",
              "geofenceCategory",
            ],
            include: [
              {
                model: db.GeofenceCoordinate,
                attributes: ["id", "lat", "log"],
                as: "coordinates",
                required: false,
              },
            ],
          },
          {
            model: db.user,
            as: "includeFarmOwner",
            attributes: ["id", "firstName", "middleName","lastName", "fullName"],
          },
          {
            model: db.Option,
            as: "includeFarmType",
            attributes: ["id", "name"],
          },
          {
            model: db.Option,
            as: "includeProductionSystem",
            attributes: ["id", "name"],
          },
        ],
        attributes: {
          exclude: ["updatedAt", "isPrimaryFarm", "isDeleted", "userId"],
        },
        where: {
          userId,
          isDeleted: 0,
        },
        order: [["createdAt", "ASC"]],
      };
      let result = await db.user_farm.findOne(query);

      if (result != null) {
        result = await result.toJSON();
        let { segments, licenceExpiryDate } = result;
        result.licenceExpiryDate = notEmpty(licenceExpiryDate)
          ? moment
              .utc(licenceExpiryDate, "YYYY-MM-DD")
              .format(process.env.DISPLAY_DATE_FORMAT)
          : null;
        result.geofence = notEmpty(segments)
          ? req.simpleTranslate("Mapped")
          : req.simpleTranslate("Unmapped");
      }

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

/**
 * @swagger
 * /farm/{id}:
 *   get:
 *     summary: Fetch details of the single farm of the user.
 *     description: Fetch details of the single farm of the user.
 *     tags: [Farm]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Farm ID
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "id": 683, "userId": 17, "farmName": "New Heritage Town", "ownerName": null, "address": "PCV4+C7M, Nayapati, Kathmandu", "district": null, "zipCode": null, "farmingActivity": null, "area": 125.3, "parameter": 123, "farmType": 846, "productionSystem": 849, "farmOwner": 17, "country": "india", "state": "uttarakhand", "city": "nainital", "govRegistrationNum": "s323234d", "contractMating": "dsfs2323432", "cooperativeId": "sdfsdf3233", "licenceNum": "sdfsf333", "licenceExpiryDate": "2022-03-04", "regulatorName": "some name", "regulatorRepresentiveName": "sahil", "houseNum": "45d", "street": "new street", "configuration": [ { "name": "area", "unit": { "id": 5, "name": "acre", "abbreviation": "acre" } }, { "name": "parameter", "unit": { "id": 15, "name": "meters", "abbreviation": "m" } } ], "coordinates": [], "segments": [] } }
 */

router.get(
  "/:id",
  auth,
  translation,
  fetchOneValidation(),
  validationErrorHandler,
  async (req, res) => {
    const {
      createFarmSegment,
      createFarmLocation,
      createCircularGeofence,
    } = require(rootPath + "/helpers/controller");
    // initialize/start the transaction

    try {
      const { id } = req.params;
      const userId = req.user.id;
      let where = {
        id,
        [db.Sequelize.Op.or]: [{ userId: userId }, { technicianId: userId }],
        isDeleted: 0,
      };

      // generating query
      // let query = {
      //   include: [
      //     {
      //       attributes: ['unit_subCategory_id'],
      //       model: db.UnitConfiguration,
      //       as: 'configuration',
      //       required: false,
      //       where: {
      //         unit_subCategory_id: [3, 14],
      //       },
      //       include: [
      //         {
      //           model: db.Unit,
      //           attributes: [['field', 'name']],
      //           as: 'subCategory',
      //         },
      //         {
      //           model: db.Unit,
      //           attributes: ['id', ['field', 'name'], 'abbreviation'],
      //           as: 'unit',
      //         },
      //       ],
      //     },
      //     {
      //       attributes: ['farmId', 'lat', 'log'],
      //       model: db.UserFarmCoordinate,
      //       as: 'coordinates',
      //     },
      //     {
      //       attributes: ['id', 'geofenceName'],
      //       model: db.Geofence,
      //       as: 'segments',
      //       include: [
      //         {
      //           model: db.Unit,
      //           attributes: [['field', 'name'], 'abbreviation'],
      //           as: 'areaUnit',
      //         },
      //         {
      //           model: db.Unit,
      //           attributes: [['field', 'name'], 'abbreviation'],
      //           as: 'parameterUnit',
      //         },
      //         {
      //           model: db.GeofenceCoordinate,
      //           attributes: ['lat', 'log'],
      //           as: 'coordinates',
      //         },
      //       ],
      //     },
      //   ],
      //   attributes: [
      //     'id',
      //     'userId',
      //     'farmName',
      //     'ownerName',
      //     'address',
      //     'district',
      //     'zipCode',
      //     'farmingActivity',
      //     'area',
      //     'parameter',
      //     // new
      //     'farmType',
      //     'productionSystem',
      //     'farmOwner',
      //     'country',
      //     'state',
      //     'city',
      //     'govRegistrationNum',
      //     'contractMating',
      //     'cooperativeId',
      //     'licenceNum',
      //     'licenceExpiryDate',
      //     'regulatorName',
      //     'regulatorRepresentiveName',
      //     'houseNum',
      //     'street',
      //   ],
      //   where,
      // };

      let query = {
        include: [
          {
            attributes: ["id", "cropTypeOptId"],
            model: db.UserfarmCrop,
            as: "farmCrops",
            include: [
              {
                attributes: [
                  "id",
                  [
                    db.sequelize.literal(
                      "`farmCrops->cropVariety->crop`.`name`"
                    ),
                    "cropName",
                  ],
                ],
                model: db.UserfarmCropVariety,
                as: "cropVariety",
                include: [{ model: db.Crop, as: "crop", attributes: [] }],
              },
            ],
          },
          {
            attributes: ["id", "displayName"],
            model: db.userLiveStock,
            as: "farmLivestocks",
            through: { attributes: [] },
          },
          {
            attributes: ["id", "displayName"],
            model: db.Equipment,
            as: "farmEquipments",
            through: { attributes: [] },
          },
          {
            model: db.user,
            as: "includeFarmOwner",
            attributes: ["id", "firstName", "middleName","lastName", "fullName"],
          },
          {
            model: db.Option,
            as: "includeFarmType",
            attributes: ["id", "name"],
          },
          {
            model: db.Option,
            as: "includeProductionSystem",
            attributes: ["id", "name"],
          },
          {
            attributes: ["farmId", "lat", "log"],
            model: db.UserFarmCoordinate,
            as: "coordinates",
          },
          {
            model: db.Option,
            as: "farmCertifications",
            attributes: ["id", "name"],
          },
        ],
        attributes: [
          "id",
          "userId",
          "farmName",
          "ownerName",
          "registrationNo",
          "farmOwnershipType",
          "address",
          "district",
          "zipCode",
          "farmingActivity",
          "area",
          "parameter",
          "lat",
          "log",
          "createdAt",
          // new
          "farmType",
          "productionSystem",
          "farmOwner",
          "country",
          "state",
          "city",
          "govRegistrationNum",
          "contractMating",
          "cooperativeId",
          "licenceNum",
          "licenceExpiryDate",
          "regulatorName",
          "regulatorRepresentiveName",
          "houseNum",
          "street",
          "farmerFirstName",
          "farmerMiddleName",
          "farmerLastName",
          "farmerId",
          "isTechnician",
          "recordId",
          "societyId"
        ],
        where,
      };
      let segmentsRes, circularGeofenceRes, mainLocationRes, locationsRes;
      segmentsRes = await db.Geofence.findAll({
        where: {
          farmId: id,
          [Op.or]: [{ isPrimary: false }, { isPrimary: null }],
        },
        attributes: [
          "id",
          "geofenceName",
          "geofenceArea",
          "geofenceParameter",
          "geofenceCategory",
          "geofenceRadius",
          "geofenceCenterLat",
          "geofenceCenterLog",
          "isPrimary",
          "recordId",
          "farmLocationId",
        ],
        include: [
          {
            model: db.GeofenceCoordinate,
            attributes: ["id", "lat", "log"],
            as: "coordinates",
            required: false,
          },
        ],
      });

      circularGeofenceRes = await db.Geofence.findOne({
        where: {
          farmId: id,
          isPrimary: true,
          geofenceRadius: {
            [Op.ne]: null,
            [Op.not]: 0,
          },
        },
      });

      mainLocationRes = await db.FarmLocation.findOne({
        where: {
          farmId: id,
          isPrimary: true,
        },
        include: [
          {
            model: db.Geofence,
            where: { deletedAt: null },
            required: false,
            as: "zones",
            include: [
              {
                model: db.GeofenceCoordinate,
                as: "geofence_coordinates",
                required: false,
              },
            ],
          },
        ],
      });
      locationsRes = await db.FarmLocation.findAll({
        where: {
          farmId: id,
        },
        include: [
          {
            model: db.Geofence,
            where: { deletedAt: null },
            required: false,
            as: "zones",
            include: [
              {
                model: db.GeofenceCoordinate,
                as: "geofence_coordinates",
              },
            ],
          },
        ],
      });

      let result = await db.user_farm.findOne(query);
      result = await result.toJSON();

      result.segments = segmentsRes;
      result.circularGeofence = circularGeofenceRes;
      result.mainLocation = mainLocationRes;
      result.locations = locationsRes;

      // this is to exclude  secondary zones
      let mainLocation = result?.mainLocation;
      result.segments = result.segments.filter((el) => {
        if (mainLocation?.id == el.farmLocationId) {
          return true;
        } else {
          return false;
        }
      });
      if (result != null) {
        let { segments, licenceExpiryDate } = result;
        result.licenceExpiryDate = notEmpty(licenceExpiryDate)
          ? moment
              .utc(licenceExpiryDate, "YYYY-MM-DD")
              .format(process.env.DISPLAY_DATE_FORMAT)
          : null;

        result.geofence = req.simpleTranslate("Unmapped");
        if (result.coordinates && result.coordinates.length > 0) {
          result.geofence = req.simpleTranslate("Mapped");
        }

        if (
          result.circularGeofence !== undefined &&
          result.circularGeofence !== null
        ) {
          result.geofence = req.simpleTranslate("Mapped");
        }

        if (notEmpty(segments)) {
          result.geofence = req.simpleTranslate("Mapped");
        }

        if (!result.mainLocation) {
          // if (result.coordinates?.length) {
          // insert farm locations
          const farmLocationInput = {
            isPrimary: 1,
            address: result.address,
            area: result.area,
            city: result.city,
            areaUomId: result.areaUomId,
            country: result.country,
            farmId: id,
            farmNumber: result.farmNumber,
            lat: result.lat,
            log: result.log,
            farmLocationGeofence: result.coordinates || [],
            parameter: result.parameter,
            state: result.state,
            street: result.street ?? "",
            userId: req.user.id,
            farmGeofenceType: req.body?.farmGeofenceType,
            farmGeofenceCenterLat: req.body?.farmGeofenceCenterLat,
            farmGeofenceCenterLog: req.body?.farmGeofenceCenterLog,
            farmGeofenceRadius: req.body?.farmGeofenceRadius,
            farmGeofenceName: req.body?.farmGeofenceName,
            farmGeofenceCategory: req.body?.farmGeofenceCategory,
            recordId: new Date().getTime(),
          };

          //both main polygon and circular geofence will be created in createFarmLocation
          await createFarmLocation(farmLocationInput, req);
          // }


          result = await db.user_farm.findOne(query);
        }

        if (notEmpty(result.locations)) {
          result.locations.forEach((item) => {
            if (item.isPrimary) {
              item.area = result.area;
              item.parameter = result.parameter;
            }
            if (item.zones.length > 0) {
              item.zones.forEach((zoneItem) => {
                if (zoneItem.isPrimary) {
                  zoneItem.geofenceArea = item.area;
                  zoneItem.geofenceParameter = item.parameter;
                }
              });
            }
          });
        }
      }

      delete result.mainLocation; // mainlocation just for checking the primary farm

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

// get single farm with no Auth
router.get(
  "/public/:id",
  fetchOneValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id } = req.params;
      let where = { id, isDeleted: 0 };

      let query = {
        include: [
          {
            attributes: ["id", "cropTypeOptId"],
            model: db.UserfarmCrop,
            as: "farmCrops",
            include: [
              {
                attributes: [
                  "id",
                  [
                    db.sequelize.literal(
                      "`farmCrops->cropVariety->crop`.`name`"
                    ),
                    "cropName",
                  ],
                ],
                model: db.UserfarmCropVariety,
                as: "cropVariety",
                include: [{ model: db.Crop, as: "crop", attributes: [] }],
              },
            ],
          },
          {
            attributes: ["id", "displayName"],
            model: db.userLiveStock,
            as: "farmLivestocks",
            through: { attributes: [] },
          },
          {
            attributes: ["id", "displayName"],
            model: db.Equipment,
            as: "farmEquipments",
            through: { attributes: [] },
          },
          {
            as: "segments",
            model: db.Geofence,
            required: false,
            attributes: [
              "id",
              "geofenceName",
              "geofenceArea",
              "geofenceParameter",
            ],
            include: [
              {
                model: db.GeofenceCoordinate,
                attributes: ["id", "lat", "log"],
                as: "coordinates",
                required: false,
              },
            ],
          },
          {
            model: db.user,
            as: "includeFarmOwner",
            attributes: ["id", "firstName", "middleName","lastName", "fullName"],
          },
          {
            model: db.Option,
            as: "includeFarmType",
            attributes: ["id", "name"],
          },
          {
            model: db.Option,
            as: "includeProductionSystem",
            attributes: ["id", "name"],
          },
          {
            attributes: ["farmId", "lat", "log"],
            model: db.UserFarmCoordinate,
            as: "coordinates",
          },
        ],
        attributes: [
          "id",
          "userId",
          "farmName",
          "ownerName",
          "registrationNo",
          "farmOwnershipType",
          "address",
          "district",
          "zipCode",
          "farmingActivity",
          "area",
          "parameter",
          "lat",
          "log",
          "createdAt",
          // new
          "farmType",
          "productionSystem",
          "farmOwner",
          "country",
          "state",
          "city",
          "govRegistrationNum",
          "contractMating",
          "cooperativeId",
          "licenceNum",
          "licenceExpiryDate",
          "regulatorName",
          "regulatorRepresentiveName",
          "houseNum",
          "street",
          "farmerFirstName",
          "farmerMiddleName",
          "farmerLastName",
          "farmerId",
          "isTechnician",
        ],
        where,
      };

      let result = await db.user.findAll({
        attributes: [
          [db.sequelize.fn("DISTINCT", db.sequelize.col("country")), "country"],
          [
            db.sequelize.fn("DISTINCT", db.sequelize.col("countryIsoCode")),
            "countryIsoCode",
          ],
        ],
        where: {
          id: {
            [Op.in]: userIds,
          },
          country: {
            [Op.not]: null,
          },
          countryIsoCode: {
            [Op.not]: null,
          },
        },
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

/**
 * @swagger
 * /farm/countries/all:
 *   get:
 *     summary: Fetch Country Dropdown for farm.
 *     description: Fetch Country Dropdown for farm.
 *     tags: [Farm]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDk3NTUxMTUsImV4cCI6MTY0OTgxNTExNX0.KgDwMvqMANCLH5NMRN3lmtUu4CA3WOIqNbDygTlw1cI'
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [{"name": "Afghanistan", code": "af", "dial_code": "+93"}] }
 */

router.get("/countries/all", auth, async (req, res) => {
  try {
    const countries = getCountries();
    return res.json(
      await successResp({
        msg: success.FETCH,
        data: countries,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /farm/states/{country_code}:
 *   get:
 *     summary: Fetch State Dropdown for farm.
 *     description: Fetch State Dropdown for farm.
 *     tags: [Farm]
 *     parameters:
 *       - in: path
 *         name: country_code
 *         required: true
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": ["Andaman and Nicobar Islands","Andhra Pradesh", "Arunachal Pradesh" ] }
 */

router.get("/states/:country_code", auth, async (req, res) => {
  try {
    const { country_code } = req.params;
    const states = getStates(country_code);
    return res.json(
      await successResp({
        msg: success.FETCH,
        data: states,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/user/offline-technician", auth, async (req, res) => {
  try {
    const { organization, id } = req.user;
    const farms = await db.user_farm.findAll({
      where: {
        technicianId: id,
        isDeleted: 0,
      },
      attributes: ["id", "isTechnician", "technicianId", "userId", "farmName"],
      include: [
        {
          model: db.user,
          as: "user",
          attributes: ["id", "firstName", "middleName","lastName", "fullName"],
          where: { organization },
        },
      ],
    });
    return res.json(
      await successResp({
        msg: success.FETCH,
        data: farms,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});



module.exports = router;
