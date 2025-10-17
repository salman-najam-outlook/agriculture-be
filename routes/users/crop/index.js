const express = require('express');
const moment = require('moment');
const _ = require('lodash');
const router = express.Router();

/********************   Custom Modules    *********************/
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const { success } = require(rootPath + '/helpers/language');
const { successRespSync, serverError } = require(rootPath + '/helpers/api');
// validations
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /user/crop/history:
 *   put:
 *     summary: Update user crop history.
 *     description: Update user crop history.
 *     tags: [User-Crop]
 *     requestBody:
 *       description: Update user crop history.
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              { "id":2 , "cropHistory": [{"yieldHarvested":332, "farmingArea":223, "harvestedOn": {"start":"11/17/2021","end":"12/23/2021"}},]}
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
 *                 example: { "success": true, "code": 200, "message": "user crop history has been updated successfully.", "data": { "id": 117, "goalType": "crop", "goalName": "Pin?", "sowingDate": { "start": "01/03/2022", "end": null }, "harvestingDate": { "start": "12/03/2023", "end": null }, "expectedYield": 256, "note": "", "createdAt": "03/09/2022 6:20 am", "user_farms": [ { "farmName": "potato ?", "MapUserGoalFarms": { "userGoalId": 117, "userFarmId": 476, "createdAt": "2022-03-09T00:50:10.000Z", "updatedAt": "2022-03-09T00:50:10.000Z" } } ], "segments": [], "soilPH": null, "cropVariety": [ { "name": "lentil", "MapUserGoalsCrop": { "id": 44, "cropId": 64, "userGoalId": 117, "createdAt": "2022-03-09T00:50:10.000Z", "updatedAt": "2022-03-09T00:50:10.000Z", "CropId": 64 } } ], "cropType": { "name": "lentils" }, "cropHistory": [ { "id": 391, "harvestedOn": { "start": "11/17/2021", "end": "12/23/2021" }, "farmingArea": "223", "yieldHarvested": "332", "configuration": [] }, { "id": 390, "harvestedOn": { "start": "01/03/2022", "end": null }, "farmingArea": "56", "yieldHarvested": "86", "configuration": [ { "name": "yield", "unit": { "id": 10, "name": "Kg per hectare", "abbreviation": "Kg/hectare" } }, { "name": "area", "unit": { "id": 12, "name": "Square Meter", "abbreviation": "sq/m" } } ] } ] } }
 */

router.put(
  '/history',
  auth,
  validate.user_crophistory_put(),
  validationErrorHandler,
  async (req, res) => {
    try {
      // initialize transaction
      const transaction = await db.sequelize.transaction();

      try {
        // load helper controller
        const helper = require(rootPath + '/helpers/controller');

        // update crop history
        await helper.updateCropHistory(req, transaction);

        // commit transaction
        await transaction.commit();

        // get the updated goals data
        const goalDetails = await helper.getGoalDetails(req, {
          cropHistory: true,
        });

        // response to the client
        return res.json(
          successRespSync({
            msg: success.CROPHISTORY_UPDATED,
            data: goalDetails,
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
 * @desc Fetch all the registered crop varity of the user.
 */
/**
 * @swagger
 * /user/crop/variety:
 *   get:
 *     summary: Fetch all the registered crop varity of the user..
 *     description: Fetch all the registered crop varity of the user..
 *     tags: [User-Crop]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Page
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Limit
 *       - in: query
 *         name: cropId
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Crop ID
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "num_rows": 1, "info": [ { "id": 167, "name": "Arka Kirtinaan" } ] } }
 */

router.get(
  '/variety',
  auth,
  translation,
  validate.listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page, limit, cropId } = req.query;

      let where = {
        ...(!_.isEmpty(cropId) ? { cropTypeOptId: cropId } : null),
        userId: req.user.id,
      };
      let query = {
        raw: true,
        where,
        attributes: ['id'],
        include: [
          {
            model: db.UserfarmCropVariety,
            as: 'user_farm_crop_variety',
            include: [
              {
                model: db.Crop,
                as: 'crop_variety',
              },
            ],
          },
        ],
      };

      if (notEmpty(page) && notEmpty(limit)) {
        limit = parseInt(limit);
        query.offset = (page - 1) * limit;
        query.limit = limit;
      }
      let result = await db.UserfarmCrop.findAll(query);
      let registeredCropVariety = [];
      let registeredCropVarietyIds = {};
      if (result !== null) {
        result.map((item) => {
          if (
            item['user_farm_crop_variety.crop_variety.id'] &&
            !registeredCropVarietyIds[
              item['user_farm_crop_variety.crop_variety.id']
            ]
          ) {
            registeredCropVariety.push({
              id: item['user_farm_crop_variety.crop_variety.id'],
              cropTypeId:
                item['user_farm_crop_variety.crop_variety.cropTypeOptId'],
              name: item['user_farm_crop_variety.crop_variety.name'],
            });
            registeredCropVarietyIds[
              item['user_farm_crop_variety.crop_variety.id']
            ] = 1;
          }
        });
      }
      result = {
        num_rows: registeredCropVariety.length,
        data: registeredCropVariety,
      };

      if (req.headers.lang && req.headers.lang != 'en') {
        result.data = req.translateFunction(result.data, globalTranslationCache, {
          lvl1: true,
          lvl2: false
        })
      }
      return res.json(
        successRespSync({
          msg: result == null ? success.NO_RESPONSE : success.FETCH,
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
 * @desc Fetch all the registered crop type of the user.
 */
/**
 * @swagger
 * /user/crop/type:
 *   get:
 *     summary: Fetch all the registered crop type of the user..
 *     description: Fetch all the registered crop type of the user.
 *     tags: [User-Crop]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Page
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Limit
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Name
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "num_rows": 1, "info": [ { "id": 49, "name": "mangos" }, { "id": 54, "name": "rice" }, { "id": 72, "name": "sugarcane" }, { "id": 76, "name": "beans" }, { "id": 100, "name": "onion" }, { "id": 101, "name": "safflower" } ] } }
 */

router.get(
  '/type',
  auth,
  translation,
  validate.listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page = 1, limit = 1000, name } = req.query;
      limit = parseInt(limit);

      const { id: userId } = req.user;
      let where = {
        groupName: 'crop-type',
        [db.Sequelize.Op.or]: [
          {
            userId: null,
          },
          {
            userId: userId,
          },
        ],
      };

      // check if search is not null and undefined
      if (notEmpty(name)) {
        where.name = {
          [db.Sequelize.Op.like]: '%' + name + '%',
        };
      }

      let adminRegisteredCrop = await db.Option.findAll({
        include: [
          {
            model: db.UserfarmCrop,
            as: 'userCropTypes',
            where: { userId },
            attributes: [],
            required: false,
          },
        ],
        attributes: ['id', 'name'],
        where,
        group:['id'],
        offset: (page - 1) * limit,
        limit: limit,
      });

      let result = {
        num_rows: adminRegisteredCrop?.length,
        data: adminRegisteredCrop,
      };
      if (req.headers.lang && req.headers.lang != 'en') {
        result.data = req.translateFunction(
          result.data,
          globalTranslationCache,
          {
            lvl1: true,
            lvl2: false,
          }
        );
      }

      return res.json(
        successRespSync({
          msg: result == null ? success.NO_RESPONSE : success.FETCH,
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
 * /user/crop/reports/select:
 *   get:
 *     summary: list crop reports(Comprehensnsive Analysis Reports) of the user registered corp types.
 *     description: list crop reports(Comprehensnsive Analysis Reports) of the user registered corp types.
 *     tags: [User-Crop]
 *     responses:
 *        '200':
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 7, "name": "Cardamom.pdf" } ] }
 */
 router.get(
   '/reports/select',
   auth,
   translation,
   validate.listValidation(),
   validationErrorHandler,
   async (req, res) => {
     try {
       const { id: userId } = req.user;

       let userCropTypes = await db.Option.findAll({
         raw: true,
         include: [
           {
             model: db.UserfarmCrop,
             as: 'userCropTypes',
             where: { userId },
             attributes: [],
             required: false,
           },
         ],
         attributes: ['id', 'name'],
         where: {
           groupName: 'crop-type',
           [db.Sequelize.Op.or]: [{ userId: null }, { userId }],
         },
       });
       userCropTypes = userCropTypes?.map(({ id }) => id);

       const result = await db.ComprehensnsiveAnalysisReport.findAll({
         include: [
           {
             required: true,
             model: db.ComprehensnsiveAnalysisReportsAndCropType,
             as: 'mapedCropTypeId',
             attributes: [],
             where: {
               cropTypeId: userCropTypes,
             },
           },
         ],
         attributes: ['id', 'name'],
       });

       // if (req.headers.lang && req.headers.lang != 'en') {
       //   result.data = req.translateFunction(
       //     result.data,
       //     globalTranslationCache,
       //     {
       //       lvl1: true,
       //       lvl2: false,
       //     }
       //   );
       // }

       return res.json(
         successRespSync({
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

module.exports = router;
