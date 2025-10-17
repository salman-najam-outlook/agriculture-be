const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { errorResp, successResp } = require(rootPath + '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const {
  validateCropGeneralInformation,
  validateCropReportId,
} = require(rootPath + '/helpers/validators/report');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
  const { getIrrigationReport,getLandPreprationAndSowingReport,getSoilManagementReports,getWeedingReports,pestAndDeseasManagement,harvestingReport,storageReport,getGeneralInformation} = require('./utils');
const moment = require('moment')  

/**
 * @swagger
 * /report/analysis-reports/comprehensive-analysis-report:
 *   get:
 *     summary: Get Comprehensive Analysis Reports
 *     description: Returns Comprehensive Analysis Reports
 *     tags: [Comprehensive Analysis Report]
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: int
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: int
 *        example:
 *          10
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
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {"cropType": 100,"cropVariety": 144,"region": "Region","recommendedRegion": "recommended region","temperature": "27 deg","humidity": "22 deg","radiation": "12 deg","rainfall": "no-rainfall","evapotranspiration": "transpiration","expectedYield": "expected yield","season": "summer","recommendedSeason": "winter","language": "en","organization": 1,"createdAt": "2022-02-03T01:18:51.000Z","updatedAt": "2022-02-03T01:18:51.000Z"}
 */
router.get(
  '/comprehensive-analysis-report',
  auth,
  async (req, res) => {
    try {
      let limit = parseInt(req.query.limit || 10);
      let offset = parseInt(req.query.offset || 0);
  
      let result = await db.ComprehensnsiveAnalysisReport.findAll({
        limit,
        offset
      });
      result = {
        num_rows: result.length,
        data: result,
      };
      return res.json(
        await successResp({
          msg: success.FETCH,
          data:result,
        }),
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  },
);

/**
 * @swagger
 * /report/analysis-reports/types:
 *   get:
 *     summary: Get Crop Report Types
 *     description: Returns Crop Report Types
 *     tags: [Comprehensive Analysis Report]
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
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {"cropType": 100,"cropVariety": 144,"region": "Region","recommendedRegion": "recommended region","temperature": "27 deg","humidity": "22 deg","radiation": "12 deg","rainfall": "no-rainfall","evapotranspiration": "transpiration","expectedYield": "expected yield","season": "summer","recommendedSeason": "winter","language": "en","organization": 1,"createdAt": "2022-02-03T01:18:51.000Z","updatedAt": "2022-02-03T01:18:51.000Z"}
 */
 router.get(
  '/types',
  auth,
  async (req, res) => {
    try {
      let result = await db.CropRecommendationModule.findAll({
      });
      return res.json(
        await successResp({
          msg: success.FETCH,
          data:result,
        }),
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  },
);



/**
 * @swagger
 * /report/analysis-reports/history:
 *   get:
 *     summary: Get User crop report history
 *     description: Get User crop report history
 *     tags: [Comprehensive Analysis Report]
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: int
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: int
 *        example:
 *          10
 *      - in: query
 *        name: moduleId
 *        schema:
 *          type: int
 *        example:
 *          1-Sowing/Land Prepration Report,2-Soil Management Report,3-Irrigation Report,4-Weeding Report,5-Pest and Disease Management Report,6-Harvesting Report,7- Storage Report
 *      - in: query
 *        name: startDate
 *        schema:
 *          type: string
 *        example:
 *          02/23/2022
 *      - in: query
 *        name: endDate
 *        schema:
 *          type: string
 *        example:
 *          03/23/2022
 *      - in: query
 *        name: daysFilter
 *        schema:
 *          type: string
 *        example:
 *          1-last 31 days,2-current month,3-previous month,4-current quater,5-last 12 months
 *      - in: query
 *        name: sortBy
 *        schema:
 *          type: string
 *        example:
 *          asc | desc
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
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {"cropType": 100,"cropVariety": 144,"region": "Region","recommendedRegion": "recommended region","temperature": "27 deg","humidity": "22 deg","radiation": "12 deg","rainfall": "no-rainfall","evapotranspiration": "transpiration","expectedYield": "expected yield","season": "summer","recommendedSeason": "winter","language": "en","organization": 1,"createdAt": "2022-02-03T01:18:51.000Z","updatedAt": "2022-02-03T01:18:51.000Z"}
 */
 router.get(
  '/history',
  auth,
  async (req, res) => {
    try {  
      const userId = req.user.id;
      const {sortBy,moduleId,daysFilter} = req.query;
      const page = parseInt(req.query.page);
      const pageSize = parseInt(req.query.limit);
      let startDate;
      let endDate;
      if(daysFilter)
      {
        if(daysFilter==1)
        {
          startDate =moment(new Date()).utc().subtract(31,'d')
          endDate = moment(new Date()).utc();
        }
        else if(daysFilter==2)
        {
          startDate = moment().startOf('month').utc()
          endDate = moment().endOf('month').utc()
        }
        else if(daysFilter==3)
        {
          startDate = moment().subtract(1,'month').startOf('month').utc();
          endDate = moment().subtract(1,'month').endOf('month').utc();
        }
        else if(daysFilter==4)
        {
          startDate = moment().quarter(moment().quarter()).startOf('quarter').utc();
          endDate = moment().quarter(moment().quarter()).endOf('quarter').utc();
        }
        else if(daysFilter==5)
        {
          startDate =moment().subtract(12,'month').utc()
          endDate = moment().utc();
        }
      }
      else{
       startDate =req.query.startDate?moment(new Date(req.query.startDate)).utc():null
       endDate = req.query.endDate?moment(new Date(req.query.endDate)).utc():null
      }
      if(req.query.endDate===req.query.startDate){
        endDate = moment(new Date(req.query.endDate)).add(1,'d')
      }  
     // const organization = await getUserOrganization(userId);
     let data;
     if(moduleId == 1)/**Sowing/Land Prepration Report */
     {
       data = await getLandPreprationAndSowingReport(userId, startDate, endDate, sortBy,page,pageSize);
     }
     else if(moduleId == 2){ /** Soil Management Report */
       data = await getSoilManagementReports(userId, startDate, endDate, sortBy,page,pageSize);
     } 
     else if(moduleId == 3){ /** Irrigation Report */
       data = await getIrrigationReport(userId, startDate, endDate, sortBy,page,pageSize);
     }
     else if(moduleId == 4){ /** Weeding Report */
      data = await getWeedingReports(userId, startDate, endDate, sortBy,page,pageSize);
     }
     else if(moduleId == 5){ /** Pest and Disease Management Report */
      data = await pestAndDeseasManagement(userId, startDate, endDate, sortBy,page,pageSize);
     }
     else if(moduleId == 6){ /** Harvesting Report */
      data = await harvestingReport(userId, startDate, endDate, sortBy,page,pageSize);
     }
     else if(moduleId == 7){ /** Storage Report */
      data = await storageReport(userId, startDate, endDate, sortBy,page,pageSize);
     }
    //  else if(moduleId == 8){ /** General Information Report */
    //  data = await getGeneralInformation(userId, startDate, endDate, sortBy,page,pageSize);
    //  }
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: data,
        }),
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  },
);

/**
 * @swagger
 * /report/analysis-reports/user-crops:
 *   get:
 *     summary: Get User Crops
 *     description: Returns User Crops
 *     tags: [Comprehensive Analysis Report]
 *     parameters:
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: Integer
 *         description: asc | desc
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: Integer
 *         description:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: Integer
 *         description:
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
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 91, "farmId": 322, "cropTypeOptId": 54, "expectedYield": 64646, "user_crop_farm": { "id": 322, "farmName": "My farm" }, "user_farm_crop_name": { "id": 54, "name": "rice", "groupName": "crop-type" }, "user_farm_crop_variety": [ { "id": 285, "crop_variety": { "id": 76, "name": "lima beans" } } ] } ] }
 */
 router.get(
  '/user-crops',
  auth,
  async (req, res) => {
    try {
      let {
        order,
        page,
        limit,
      } = req.query;
      const where = { userId: req.user.id };
      let orderBy = [['id', 'DESC']];
      if (notEmpty(order)) {
        orderBy =
          order === 'asc'
            ? [['user_farm_crop_name', 'name', 'ASC']]
            : [['user_farm_crop_name', 'name', 'DESC']];
      }
      let query = {
        where,
        order: orderBy,
        attributes:['id','farmId','cropTypeOptId','expectedYield',],
        include: [
          {
            model: db.user_farm,
            as: 'user_crop_farm',
            attributes: ['id', 'farmName'],
          },
          {
            model: db.Option,
            as: 'user_farm_crop_name',
            attributes: ['id', 'name','groupName'],
          },
          {
            model: db.UserfarmCropVariety,
            as: 'user_farm_crop_variety',
            attributes: ['id'],
            include: [
              {
                model: db.Crop,
                as: 'crop_variety',
                attributes: ['id', 'name'],
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
      const userFarmCrops = await db.UserfarmCrop.findAll(query);
      if (req.headers.lang && req.headers.lang != 'en') {
        req.translateFunction(userFarmCrops, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
          moduleName: 'farm/crop',
        });
      }
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: userFarmCrops,
        }),
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  },
);


/**
 * @swagger
 * /report/analysis-reports/general-report:
 *   get:
 *     summary: Get general crop report
 *     description: Returns general crop report
 *     tags: [Comprehensive Analysis Report]
 *     parameters:
 *       - in: query
 *         name: farmCropId
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Farm Crop ID
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
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 91, "farmId": 322, "cropTypeOptId": 54, "expectedYield": 64646, "user_crop_farm": { "id": 322, "farmName": "My farm" }, "user_farm_crop_name": { "id": 54, "name": "rice", "groupName": "crop-type" }, "user_farm_crop_variety": [ { "id": 285, "crop_variety": { "id": 76, "name": "lima beans" } } ] } ] }
 */


router.get(
  '/general-report',
  auth,
  async (req, res) => {
    try {
      let {
        farmCropId,
      } = req.query;
      let where = { userId: req.user.id,id: farmCropId};
      let query = {
        where,
        attributes:['id','farmId','cropTypeOptId','expectedYield','cropSeasonOptId'],
        include: [
          {
            model: db.user_farm,
            as: 'user_crop_farm',
            attributes: ['id', 'farmName',"region"],
          },
          {
            model: db.Option,
            as: 'user_farm_crop_name',
            attributes: ['id', 'name','groupName'],
          },
          {
            model: db.Option,
            as: 'cropSeason',
            attributes: ['id', 'name'],
          },
          {
            model: db.UserfarmCropVariety,
            as: 'user_farm_crop_variety',
            attributes: ['id'],
            include: [
              {
                model: db.Crop,
                as: 'crop_variety',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      };
      const userFarmCrops = await db.UserfarmCrop.findAll(query);
      if (req.headers.lang && req.headers.lang != 'en') {
        req.translateFunction(userFarmCrops, globalTranslationCache, {
          lvl1: true,
          lvl2: true,
          moduleName: 'farm/crop',
        });
      }
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: userFarmCrops,
        }),
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  },
);

module.exports = router;
