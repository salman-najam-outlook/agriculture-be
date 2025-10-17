const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const turf = require("@turf/turf");
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { successResp, serverError, errorResp } = require(rootPath +
  "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const validate = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const { syncFarmerDataToOCC } = require(rootPath + '/helpers/occ-komodo');

const validateLocation = async (coordinates) => {
  const response = await axios.get(
    "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
  );
  const landPolygons = response.data;
  let point = []
  if(coordinates.length > 1) {
    const points = coordinates.map((location) => {
      return [location.log, location.lat];
    });
     point = turf.multiPoint(points);
  } else {
     point = turf.point([coordinates[0].log, coordinates[0].lat]);
  }
  for (const feature of landPolygons.features) {
    if (turf.booleanWithin(point, feature)) {
      return true;
    }
  }
  return false;
};

/**
 * @swagger
 * /geofencing:
 *   post:
 *     summary: Add geofencing of the farm
 *     description: Add geofencing of the farm
 *     tags: [Geofencing]
 *     requestBody:
 *       description: Add geofencing of the farm
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example: {  "farmId":348, "segments": [ { "coordinates": [ { "lat": 3.456, "log": 3.456, "geoFenceId": 1 } ], "geofenceName": "Rice Segment", "geofenceArea": 600, "geofenceAreaUOMId": 1, "geofenceParameter": 900, "geofenceParameterUOMId": 1 } ], }
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
 *                 example: { "success": true, "code": 200, "message": "Geofencing added successfully.", "data": {} }
 */

router.post(
  "/",
  auth,
  validate.farmSegmentValidation_post(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { createFarmSegment } = require(rootPath + "/helpers/controller");
      const { farmId } = req.body;

      // start tansaction
      const transaction = await db.sequelize.transaction();

      try {
        await createFarmSegment({ farmId, req }, transaction);
        // commit if everything is good
        await transaction.commit();
        await syncFarmerDataToOCC(req.user.id);
      } catch (err) {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
      // send response back to the client
      return res.json(
        await successResp({
          msg: success.GEOFENCE_ADDED,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);

      return serverError(res, err);
    }
  }
);

/**
 * @desc Fetch geofencing of the farm [Geofencing]
 * */

/**
 * @swagger
 * /geofencing:
 *   get:
 *     summary: Fetch geofencing of the farm
 *     description: Fetch geofencing of the farm
 *     tags: [Geofencing]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Page number
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 141, "geofenceName": "test", "geofenceArea": 276.88, "geofenceParameter": 308.7, "coordinates": [], "farm": { "id": 348, "farmName": "farm1", "address": "Fun City, Sri Muktsar Sahib", "isDeleted": false } }, { "id": 148, "geofenceName": "RiceFarmUpdated", "geofenceArea": 4002, "geofenceParameter": 7001, "coordinates": [ { "lat": 3.456, "log": 3.456 } ], "farm": { "id": 539, "farmName": "myFarm", "address": "test-address", "isDeleted": false } }, { "id": 149, "geofenceName": "RiceFarmUpdated", "geofenceArea": 4002, "geofenceParameter": 7002, "coordinates": [ { "lat": 3.456, "log": 3.456 } ], "farm": { "id": 539, "farmName": "myFarm", "address": "test-address", "isDeleted": false } }, { "id": 150, "geofenceName": "RiceFarmUpdated", "geofenceArea": 4002, "geofenceParameter": 7003, "coordinates": [ { "lat": 3.456, "log": 3.456 } ], "farm": { "id": 539, "farmName": "myFarm", "address": "test-address", "isDeleted": false } } ] }
 */

router.get(
  "/",
  auth,
  validate.fetchGeofencingValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
 
      let userId = req.user.id;
      // const { page } = req.body;
      const { page , limit = 10, farmerId} = req.query;
      userId = farmerId ? farmerId : userId;

      let queryOptions = {
        include: [
          {
            model: db.Unit,
            attributes: [["field", "name"], "abbreviation"],
            as: "areaUnit",
          },
          {
            model: db.Unit,
            attributes: [["field", "name"], "abbreviation"],
            as: "parameterUnit",
          },
          {
            model: db.GeofenceCoordinate,
            attributes: ["lat", "log"],
            as: "coordinates",
          },
          {
            model: db.user_farm,
            attributes: ["id", "farmName", "farmGeofenceName"],
            as: "farms",
          },
        ],
        attributes: ["id", "geofenceName", "geofenceArea", "geofenceParameter",'deletedAt'],
        where: { userId, 
          [db.Sequelize.Op.and]: [
           { geofenceArea: { [db.Sequelize.Op.ne]: null }},
            {geofenceArea: { [db.Sequelize.Op.gt]: parseInt(0) }},
          ]
         },

        order: [["id", "DESC"]],
        paranoid:true
      }

      if (limit) {
        const limitValue = parseInt(limit);
        const offsetValue = (page - 1) * limitValue;
        queryOptions.limit = limitValue;
        queryOptions.offset = offsetValue;
      }

      // Get all the geolocation of the user
      let geofences = await db.Geofence.findAndCountAll(queryOptions);
      let totalCount = await db.Geofence.count({
        where: {
          userId
        },
        paranoid:true
      })
      const totalPages = limit ? Math.ceil(totalCount / limit) : undefined;
      return res.json(
        await successResp({
          msg: geofences == null ? success.NO_RESPONSE : success.FETCH,
          data: {
            data: geofences.rows,
            pagination: limit ? {
            totalItems: totalCount,
            totalPages,
            currentPage: parseInt(page),
            pageSize: parseInt(limit),
          } : undefined,
          }
          
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);

      return serverError(res, err);
    }
  }
);

//Geofance Delete
router.delete(
    "/",
    auth,
    validate.geofenceDeleteValidation(),
    validationErrorHandler,
    async (req, res) => {
        try {
            const userId = req.user.id
            const { geofenceId, isPermanentDelete = false } = req.body;
            const geofence = await db.Geofence.findOne({
                where:{
                    id:geofenceId,
                    userId:userId
                }
            })
            await geofence.destroy({
              force:isPermanentDelete
            })
            await syncFarmerDataToOCC(userId);
            return res.json(
                await successResp({
                    msg: success.DELETED
                })
            );

        } catch (err){
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    }
)

router.put(
    "/restore",
    auth,
    validate.geofenceRestoreValidation(),
    validationErrorHandler,
    async (req, res) => {
        try {
            const userId = req.user.id
            const { geofenceId } = req.body;
            const geofence = await db.Geofence.findOne({
                where:{
                  id:geofenceId,
                  userId:userId
              },
              paranoid:false
            })
            await geofence.restore()
            await syncFarmerDataToOCC(userId);

            return res.json(
                await successResp({
                    msg: success.RESTORE
                })
            );
        } catch (err){
            logErrorOccurred(__filename, err);
            return serverError(res, err);
        }
    }
)


/**
 * @swagger
 * /geofencing/validate-location:
 *   post:
 *     summary: Validate Location that farm is land
 *     description: Validate Location that farm is land
 *     tags: [Geofencing]
 *     requestBody:
 *       description: Validate Location that Farm is Land
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example: {"coordinates": [{  "lat": 3.456, "log": 3.456 }]}
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
 *                 example: { "success": true, "code": 200, "message": "Location is on land"}
 */
router.post("/validate-location", auth, async (req, res) => {
  const { coordinates } = req.body;
  const result = await validateLocation(coordinates);
  if (!result) {
    return res.json(
      await errorResp({
        code: 400,
        msg: "Location is Not Valid",
      })
    );
  }

  return res.json(
    await successResp({
      msg: "It is a valid location",
    })
  );
});

module.exports = router;
