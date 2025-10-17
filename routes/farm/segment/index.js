const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { successResp, errorResp, serverError } = require(rootPath +
  '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
  const { Op } = require('sequelize');
const { syncFarmerDataToOCC } = require(rootPath + '/helpers/occ-komodo');

/**
 * @swagger
 * /farm/segment:
 *   delete:
 *     summary: Delete farm segment details and coordinates
 *     description: Delete farm segment details and coordinates
 *     tags: [Farm]
 *     requestBody:
 *       description: Delete farm segment details and coordinates
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: { "id":539 }
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
  '/',
  auth,
  validate.farmSegmentValidation_delete(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id } = req.body;
      const userId = req.user.id;

      // Check if user has the farm segment id provided
      const isExist = await db.Geofence.findOne({
        attributes: ['id', 'farmId'],
        where: { id, userId },
      });
      // if not exist then send error message back to client
      if (isExist == null) {
        return res
          .status(success.code.OK)
          .json(
            await successResp({ code: success.code.OK, msg: error.NOT_FOUND })
          );
      }
      let farmId = isExist.farmId;
      // start tansaction
      const transaction = await db.sequelize.transaction();
      try {
        // Delete geofence details
        const status = await db.Geofence.destroy({
          where: { id, userId },
          transaction,
        });
        // check if the geofence details is deleted or not
        if (status) {
          // Delete geofencing coordinates
          await db.GeofenceCoordinate.destroy({
            where: {
              geoFenceId: id,
            },
            transaction,
          });
        }
        // commit if everything is good
        await transaction.commit();
        await syncFarmerDataToOCC(userId);
        // send response back to the client
        return res.json(
          await successResp({
            msg: success.DELETED,
          })
        );
      } catch (err) {

        if (err?.parent?.errno == 1451) {
           return res
          .status(success.code.OK)
          .json(
            await errorResp({ code: success.code.OK, msg: "Zone is being used in other modules" })
          );
         
        } else {
          await transaction?.rollback();
          logErrorOccurred(__filename, err);
          return serverError(res, err);
        }

      }
    } catch (err) {
      if (err?.parent?.errno == 1451) {
          return res
          .status(success.code.OK)
          .json(
            await errorResp({ code: success.code.OK, msg: "Zone is being used in other modules" })
          );
       
      } else {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
    }
  }
);

/**
 * @desc Update farm segment details
 * */

/**
 * @swagger
 * /farm/segment:
 *   put:
 *     summary: Update farm segment details
 *     description: Update farm segment details
 *     tags: [Farm]
 *     requestBody:
 *       description: Update farm segment details
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: { "id":148, "farmId":539, "coordinates":[{"lat":3.456,"log":3.456,"geoFenceId":1}], "geofenceName":"RiceFarmUpdated", "geofenceArea":4002, "geofenceAreaUOMId":1, "geofenceParameter":7001, "geofenceParameterUOMId":1, }
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
 *                 example: { "success": true, "code": 200, "message": "Farm segment is updated successfully.", "data": {} }
 */

router.put(
  '/',
  auth,
  validate.farmSegmentValidation_put(),
  validationErrorHandler,
  async (req, res) => {
    try {
      // return res.json(req.body);

      const { updateFarmSegment } = require(rootPath + '/helpers/controller');
      const { id } = req.body;
      const userId = req.user.id;

      // Check if user has the farm segment id provided
      const isExist = await db.Geofence.findOne({
        attributes: ['id', 'farmId'],
        where: { id, userId },
      });
      // if not exist then send error message back to client
      if (isExist == null) {
        return res
          .status(success.code.OK)
          .json(
            await errorResp({ code: success.code.OK, msg: error.NOT_FOUND })
          );
      }

      // start tansaction
      const transaction = await db.sequelize.transaction();

      try {
        await updateFarmSegment({ id, req }, transaction);
        // commit if everything is good
        await transaction.commit();
        // send response back to the client
        await syncFarmerDataToOCC(userId);
        return res.json(
          await successResp({
            msg: success.FARM_SEGMENT_UPDATED,
          })
        );
      } catch (err) {
        await transaction?.rollback();
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
 * @desc Create segment of the farm
 * */

/**
 * @swagger
 * /farm/segment:
 *   post:
 *     summary: Create farm segment details
 *     description: Create farm segment details
 *     tags: [Farm]
 *     requestBody:
 *       description: Create farm segment details
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"farmId":539, segments: [{"coordinates":[{"lat":3.456,"log":3.456,"geoFenceId":1}], "geofenceName":"RiceFarmUpdated", "geofenceArea":4002, "geofenceAreaUOMId":1, "geofenceParameter":7002, "geofenceParameterUOMId":1,},{"coordinates":[{"lat":3.456,"log":3.456,"geoFenceId":1}], "geofenceName":"RiceFarmUpdated", "geofenceArea":4002, "geofenceAreaUOMId":1, "geofenceParameter":7003, "geofenceParameterUOMId":1,}] }
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
 *                 example: { "success": true, "code": 200, "message": "Farm segment is updated successfully.", "data": {} }
 */

router.post(
  '/',
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { createFarmSegment, createCircularGeofence } = require(rootPath + '/helpers/controller');
      const { farmId, segments } = req.body;
      // start tansaction
      const transaction = await db.sequelize.transaction();
      let result, geofenceArr = [], geofenceRes

      try {
        if(segments[0].geofenceType && segments[0].geofenceType =="circular") {
          let farmLocationRes = await db.FarmLocation.findOne({where : {
            farmId,
            isPrimary: true
          }})
           geofenceRes = await createCircularGeofence({farmId, req, isPrimary: false, locationId: farmLocationRes?.id})
          
          await syncFarmerDataToOCC(req.user.id);

        } else {
          let farmLocationRes = await db.FarmLocation.findOne({where : {
            farmId,
            isPrimary: true
           }})
          geofenceArr = await createFarmSegment({ farmId, req, newUserId: null, farmLocationId: farmLocationRes.id }, transaction);
          // return res.json(result);
          // commit if everything is good
       
          await syncFarmerDataToOCC(req.user.id);
  
  
          if(geofenceArr.length > 0) {
            result = await db.Geofence.findAll({
              include: [
                {
                  model: db.GeofenceCoordinate,
                  attributes: ["lat", "log"],
                  as: "coordinates",
                },
              ],
              // attributes: ['id', 'geofenceName', 'geofenceArea', 'geofenceParameter'],
              where: {
                id: {
                  [Op.in]: geofenceArr.map((el) => el.id),
                },
                userId: req.user.id,
              },
            });
           }

        }
        await transaction.commit();
  
      } catch (err) {
        await transaction?.rollback();
        logErrorOccurred(__filename, err);
        return serverError(res, err);
      }
      // send response back to the client
      return res.json(
        await successResp({
          msg: success.FARM_SEGMENT_CREATED,
          data: (geofenceArr && geofenceArr[0]) ||  geofenceRes || {}
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);

      return serverError(res, err);
    }
  }
);

/**
 * @desc get list of the segment of the user farms
 * */

/**
 * @swagger
 * /farm/segment:
 *   get:
 *     summary: Get list of the segment of the user farms
 *     description: Get list of the segment of the user farms
 *     tags: [Farm]
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
  '/',
  auth,
  validate.fetchGeofencingValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      // const { page } = req.body;
      const { page } = req.query;
      const limit = 10;

      // Get all the geolocation of the user
      let geofences = await db.Geofence.findAll({
        include: [
          {
            model: db.GeofenceCoordinate,
            attributes: ['lat', 'log'],
            as: 'coordinates',
          },
          {
            model: db.user_farm,
            attributes: ['id', 'farmName', 'address', 'isDeleted'],
            as: 'farm',
            where: {
              isDeleted: 0,
            },
          },
        ],
        // attributes: ['id', 'geofenceName', 'geofenceArea', 'geofenceParameter'],
        where: { userId },
        offset: (page - 1) * limit,
        limit: limit,
      });

      // send response
      return res.json(
        await successResp({
          msg: geofences == null ? success.NO_RESPONSE : success.FETCH,
          data: geofences,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);

      return serverError(res, err);
    }
  }
);

module.exports = router;
