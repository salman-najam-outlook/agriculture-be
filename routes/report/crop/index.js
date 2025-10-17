const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { errorResp, successResp, serverError } = require(rootPath +
  '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const {
  validateCropGeneralInformation,
  validateCropReportId,
} = require(rootPath + '/helpers/validators/report');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const { getUserOrganization, getReports } = require('./utils');

/**
 * @swagger
 * /report/crop/general-information:
 *   post:
 *     summary: Get general information of crop variety - My Crop Report
 *     description: Returns information for a specific crop varierty for specific organization
 *     tags: [Crop Report]
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                cropType:
 *                  type: integer
 *                cropVariety:
 *                  type: integer
 *              required:
 *                - cropType
 *                - cropVariety
 *            example:
 *               {"cropType": 100,"cropVariety": 144}
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
router.post(
  '/general-information',
  auth,
  validateCropGeneralInformation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const language = req.headers['lang'] || 'en';
      const { cropType, cropVariety } = req.body;
      const organization = await getUserOrganization(userId);
      const data = await db.GeneralCropInformation.findOne({
        attributes: { exclude: ['id'] },
        where: {
          cropType,
          cropVariety,
          organization,
          language,
        },
      });
      return res.json(
        await successResp({
          msg: success.FETCH,
          data,
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
 * /report/crop/sowing:
 *   post:
 *     summary: Get sowing report - My Crop Report
 *     description: Returns information for a specific sowing entry
 *     tags: [Crop Report]
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *              required:
 *                - id
 *            example:
 *               {"id": 100}
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
 *                   data: {"sowingData":{"id":144,"area":34815.5,"areaUnitId":10,"startDate":"2022-03-15T19:00:00.000Z","endDate":"2022-03-30T19:00:00.000Z","cropId":72,"days":16,"userId":29,"seedingRate":50,"seedingUnitId":2,"rowSpacing":50,"rowSpacingUnitId":4,"inRowSpacing":10,"inRowSpacingUnitId":4,"density":100,"depth":20,"depthUnitId":4,"createdAt":"2022-03-15T18:49:09.000Z","updatedAt":"2022-03-15T18:49:09.000Z","user_farms":[{"id":547,"userId":69,"address":"Cruzeiro, Brasil,","district":null,"farmingGoalOptId":null,"zipCode":null,"farmName":"Farm Test","registrationNo":"","ownerName":null,"communityName":null,"lat":-15.8085876,"log":-47.9408978,"farmingActivity":null,"farmOwnershipType":"personal","parameter":676.324,"area":34815.5,"isPrimaryFarm":null,"isDeleted":false,"createdAt":"2022-03-15T18:29:18.000Z","updatedAt":"2022-03-15T18:31:49.000Z","MapSowingFarms":{"id":335,"userFarmId":547,"sowingId":144,"createdAt":"2022-03-15T18:49:09.000Z","updatedAt":"2022-03-15T18:49:09.000Z"}},{"id":331,"userId":29,"address":"1, Dashmesh Nagar, Sahibzada Ajit Singh Nagar","district":null,"farmingGoalOptId":null,"zipCode":null,"farmName":"bxb","registrationNo":"udhf","ownerName":null,"communityName":null,"lat":30.75549,"log":76.6523983,"farmingActivity":null,"farmOwnershipType":"personal","parameter":null,"area":0,"isPrimaryFarm":null,"isDeleted":true,"createdAt":"2022-02-07T02:47:42.000Z","updatedAt":"2022-03-24T06:31:04.000Z","MapSowingFarms":{"id":381,"userFarmId":331,"sowingId":144,"createdAt":"2022-03-15T18:49:09.000Z","updatedAt":"2022-03-15T18:49:09.000Z"}}],"segments":[{"id":2,"userId":29,"farmId":1,"farmAddress":null,"walkAndMeasure":null,"geofenceName":"Rice Segment","geofenceArea":8000,"geofenceAreaUOMId":1,"geofenceParameter":9000,"geofenceParameterUOMId":1,"createdAt":"2021-10-08T02:38:14.000Z","updatedAt":"2022-03-25T04:03:42.000Z","MapSowingGeofences":{"id":1,"geofenceId":2,"sowingId":144,"createdAt":"2022-03-15T18:49:09.000Z","updatedAt":"2022-03-15T18:49:09.000Z","GeofenceId":2},"farm":{"id":1,"userId":17,"address":"Nainital, uttarakhand","district":0,"farmingGoalOptId":1,"zipCode":"","farmName":"corbett farm","registrationNo":"23423492343899883","ownerName":"","communityName":"","lat":0.9999999999,"log":0.9999999999,"farmingActivity":"","farmOwnershipType":"community","parameter":0,"area":3.372,"isPrimaryFarm":false,"isDeleted":false,"createdAt":"2021-10-05T09:27:20.000Z","updatedAt":"2021-11-01T23:37:58.000Z"}}],"Crops":[{"id":40,"countryId":null,"cropTypeOptId":72,"name":"sugarcane-type-1","userId":17,"createdAt":"2021-12-10T07:03:13.000Z","updatedAt":"2021-12-10T07:03:13.000Z","MapSowingCrop":{"id":29,"cropId":40,"sowingId":144,"createdAt":"2022-02-15T01:37:24.000Z","updatedAt":"2022-02-15T01:37:24.000Z","CropId":40}},{"id":41,"countryId":null,"cropTypeOptId":72,"name":"sugarcane-type-2","userId":17,"createdAt":"2021-12-10T07:03:20.000Z","updatedAt":"2021-12-10T07:03:20.000Z","MapSowingCrop":{"id":30,"cropId":41,"sowingId":144,"createdAt":"2022-02-15T01:37:24.000Z","updatedAt":"2022-02-15T01:37:24.000Z","CropId":41}}],"Option":{"info":null,"id":72,"name":"sugarcane","groupName":"crop-type","userId":17,"createdAt":"2021-11-25T00:03:55.000Z","updatedAt":"2022-03-25T02:24:50.000Z"},"sowing_planting_type_assoc":[],"areaunit":{"id":10,"name":"Acre","abbvr":"Acre","unitType":5,"factor":null,"createdAt":"2022-01-12T09:48:04.000Z","updatedAt":"2022-01-12T09:48:04.000Z"},"seedingunit":{"id":2,"name":"Kilogram","abbvr":"kg","unitType":1,"factor":"1000.0000000000","createdAt":"2022-01-12T09:48:04.000Z","updatedAt":"2022-01-12T09:48:04.000Z"},"rowspacing":{"id":4,"name":"Centimeter","abbvr":"cm","unitType":2,"factor":null,"createdAt":"2022-01-12T09:48:04.000Z","updatedAt":"2022-01-12T09:48:04.000Z"},"inrowspacing":{"id":4,"name":"Centimeter","abbvr":"cm","unitType":2,"factor":null,"createdAt":"2022-01-12T09:48:04.000Z","updatedAt":"2022-01-12T09:48:04.000Z"},"depthspacing":{"id":4,"name":"Centimeter","abbvr":"cm","unitType":2,"factor":null,"createdAt":"2022-01-12T09:48:04.000Z","updatedAt":"2022-01-12T09:48:04.000Z"}},"reportData":[{"id": 1,"cropType": 100,"cropVariety": 88,"organization": 1,"language": "en","module": "sowing","info": "{\"sowing_window\":[\"For planting region, grow onions in Kharif season which starts from June to July.\",\"For Uttar Pradesh planting region, grow onions in Rabi season which starts from March to June.\"],\"planting_materials\":[2,\"planting material note\"],\"planting_rate\":[2,\"rate note\"],\"planting_row_spacing\":[2,\"row spacing note\"],\"in_row_plant_spacing\":[4,\"\"],\"plant_population_density\":[4,\"\"],\"planting_depth\":[4,\"this is note it can be empty\"]}","createdAt": "2022-03-07T04:12:23.000Z","updatedAt": "2022-03-07T04:12:23.000Z"}]}
 */
router.post(
  '/sowing',
  auth,
  validateCropReportId(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const language = req.headers['lang'] || 'en';
      const { id } = req.body;
      const organization = await getUserOrganization(userId);
      const sowing = await db.Sowing.findOne({
        where: {
          id,
          userId,
        },
        include: [
          db.user_farm,
          {
            model: db.Geofence,
            as: 'segments',
            include: [
              {
                as: 'farm',
                model: db.user_farm,
              },
            ],
          },
          db.Crop,
          db.Option,
          {
            model: db.PlantingTypes,
            as: 'sowing_planting_type_assoc',
          },
          {
            model: db.UnitsList,
            as: 'areaunit',
          },
          {
            model: db.UnitsList,
            as: 'seedingunit',
          },
          {
            model: db.UnitsList,
            as: 'rowspacing',
          },
          {
            model: db.UnitsList,
            as: 'inrowspacing',
          },
          {
            model: db.UnitsList,
            as: 'depthspacing',
          },
        ],
      });
      if (!sowing)
        return res
          .status(error.code.SERVER_ERROR)
          .json(await errorResp({ msg: 'Sowing Data Not Found', code: 404 }));
      const cropType = sowing?.Option?.id;
      let cropsIds = [];
      let sowingReport = {
        sowingData: sowing,
        reportData: [],
      };
      sowing.Crops.forEach((item) => {
        cropsIds.push(item.id);
      });
      if (cropsIds.length)
        sowingReport.reportData = await getReports(
          cropType,
          cropsIds,
          organization,
          language,
          'sowing'
        );
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: sowingReport,
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
 * /report/crop/land-preparation:
 *   post:
 *     summary: Get land preperation report - My Crop Report
 *     description: Returns information for a specific land preperation entry
 *     tags: [Crop Report]
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *              required:
 *                - id
 *            example:
 *               {"id": 100}
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
 *                   data: {"landPreperationData":{"id":186,"days":2,"area":188,"areaUnitId":10,"userId":29,"startDate":"2022-04-13T19:00:00.000Z","endDate":"2022-04-15T19:00:00.000Z","cropId":100,"activityId":2,"createdAt":"2022-03-07T10:19:37.000Z","updatedAt":"2022-03-07T10:19:37.000Z","Crops":[{"id":144,"countryId":null,"cropTypeOptId":100,"name":"Pusa White Round","userId":null,"createdAt":"2022-03-07T04:12:23.000Z","updatedAt":"2022-03-07T04:12:23.000Z","MapSoilPrepPracticeCrop":{"id":52,"cropId":144,"soil_prep_practiceId":186,"createdAt":"2022-03-07T10:19:37.000Z","updatedAt":"2022-03-07T10:19:37.000Z","CropId":144}}],"Option":{"info":null,"id":100,"name":"onion","groupName":"crop-type","userId":null,"createdAt":"2022-02-07T04:04:15.000Z","updatedAt":"2022-02-07T04:04:15.000Z"},"areaunit":{"id":10,"country_id":1,"field":"Kg per hectare","unit_category_id":1,"unit_subCategory_id":8,"abbreviation":"Kg\/hectare","createdAt":"2021-11-08T06:55:50.000Z","updatedAt":"2021-11-08T06:43:04.000Z"},"user_farms":[{"id":348,"userId":171,"address":"Fun City, Sri Muktsar Sahib","district":null,"farmingGoalOptId":null,"zipCode":null,"farmName":"farm1","registrationNo":"12","ownerName":null,"communityName":null,"lat":30.1910518,"log":74.4991783,"farmingActivity":null,"farmOwnershipType":"personal","parameter":null,"area":0,"isPrimaryFarm":null,"isDeleted":false,"createdAt":"2022-02-10T03:26:49.000Z","updatedAt":"2022-03-07T02:54:56.000Z","MapSoilPrepPracticeFarms":{"soil_prep_practiceId":186,"userFarmId":348,"createdAt":"2022-03-07T10:19:37.000Z","updatedAt":"2022-03-07T10:19:37.000Z"}}],"segments":[{"id":57,"userId":36,"farmId":207,"farmAddress":null,"walkAndMeasure":null,"geofenceName":"my segment 22","geofenceArea":8.807,"geofenceAreaUOMId":207,"geofenceParameter":146.836,"geofenceParameterUOMId":207,"createdAt":"2021-11-10T11:28:05.000Z","updatedAt":"2021-11-10T11:28:05.000Z","Soil_prep_practice_geofences":{"geofenceId":57,"soil_prep_practiceId":186,"createdAt":"2022-03-07T10:19:37.000Z","updatedAt":"2022-03-07T10:19:37.000Z"},"farm":{"id":207,"userId":36,"address":"M8HW+VF8, Koteshwor, Kathmandu","district":null,"farmingGoalOptId":null,"zipCode":null,"farmName":"manish farm 123 new 123","registrationNo":"qwe 123 qw","ownerName":null,"communityName":null,"lat":27.6801105,"log":85.345927,"farmingActivity":null,"farmOwnershipType":"community","parameter":569.25,"area":1.764,"isPrimaryFarm":null,"isDeleted":false,"createdAt":"2021-11-10T11:16:33.000Z","updatedAt":"2021-11-10T11:16:33.000Z"}}],"Equipment":[{"id":55,"displayName":"tractor","userID":67,"group":13,"category":3,"activity":8,"equipmentName":8,"identificationNumber":"7867","serialNumber":"6867","modelOrBrand":"2012","yearOfManufacture":2010,"yearOfPurchase":2014,"modeOfOperation":null,"quantity":1,"fuelType":4,"energyConsumption":null,"loanStatus":4,"equipmentType":4,"createdAt":"2022-01-17T05:28:27.000Z","updatedAt":"2022-01-17T05:28:27.000Z","Soil_prep_practice_equipments":{"equipmentId":55,"soil_prep_practiceId":186,"createdAt":"2022-03-07T10:19:37.000Z","updatedAt":"2022-03-07T10:19:37.000Z"}}],"Soil_prep_activity":{"id":2,"name":"First ploughing","createdAt":"2022-02-03T00:32:55.000Z","updatedAt":"2022-02-03T00:32:55.000Z"},"SoilTypes":[{"image":"https:\/\/dimitra-private.s3.amazonaws.com\/Soil\/20211218145344Siltsoil.png?AWSAccessKeyId=AKIAXGW3CQWTJL4BH3MK&Expires=1648651066&Signature=MWUnIVQGjoGqalKjBE1yJzJxabI%3D","id":4,"name":"Silt soil","imageS3Key":"Soil\/20211218145344Siltsoil.png","createdAt":"2022-02-08T06:54:55.000Z","updatedAt":"2022-02-08T06:54:55.000Z","Soil_prep_practice_soil_type":{"id":195,"soilTypeId":4,"soil_prep_practiceId":186,"createdAt":"2022-03-07T10:19:37.000Z","updatedAt":"2022-03-07T10:19:37.000Z","SoilTypeId":4}}], "reportData": [{"id": 1,"cropType": 100,"cropVariety": 88,"organization": 1,"language": "en","module": "land-preperation","info": "{\"land_preperation_window\":[\"For region, start planting onions in Kharif season which starts from June to July.\"],\"land_preperation_activity\":[\"Clearing of land\", \"First ploughing\", \"Harrowing\", \"Levelling\", \"Flooding\", \"Burning\"]}","createdAt": "2022-03-07T04:12:23.000Z","updatedAt": "2022-03-07T04:12:23.000Z"}]}}
 */

router.post(
  '/land-preparation',
  auth,
  validateCropReportId(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const language = req.headers['lang'] || 'en';
      const { id } = req.body;
      const organization = await getUserOrganization(userId);
      const landPreperation = await db.Soil_prep_practice.findOne({
        where: {
          id,
          userId,
        },
        include: [
          db.Crop,
          db.Option,
          {
            model: db.Unit,
            as: 'areaunit',
          },
          db.user_farm,
          {
            model: db.Geofence,
            as: 'segments',
            include: [
              {
                as: 'farm',
                model: db.user_farm,
              },
            ],
          },
          db.Equipment,
          db.Soil_prep_activity,
          db.SoilType,
          db.Crop,
        ],
      });
      if (!landPreperation)
        return res.status(error.code.SERVER_ERROR).json(
          await errorResp({
            msg: 'Land Preparation Data Not Found',
            code: 404,
          })
        );
      const cropType = landPreperation?.Option?.id;
      let cropsIds = [];
      let landPrepReport = {
        landPreperationData: landPreperation,
        reportData: [],
      };
      landPreperation.Crops.forEach((item) => {
        cropsIds.push(item.id);
      });
      if (cropsIds.length)
        landPrepReport.reportData = await getReports(
          cropType,
          cropsIds,
          organization,
          language,
          'land-preperation'
        );
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: landPrepReport,
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
 * /report/crop/soil-management:
 *   post:
 *     summary: Get soil management report - My Crop Report
 *     description: Returns information for a specific soil management entry
 *     tags: [Crop Report]
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *              required:
 *                - id
 *            example:
 *               {"id": 100}
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
 *                   data: {"soilManagementData":{"id":1,"userId":29,"farm":2,"segment":2,"area":3557.11,"areaUnits":10,"cropType":54,"cropVariety":[67],"soilType":[3,4],"doneSoilTestingBefore":false,"ph":5.45,"bulkDensity":0.8,"bulkDensityUnits":57,"soilOrganicCarbon":5,"nitrogen":7,"nitrogenUnits":58,"phosphorus":9,"phosphorusUnits":61,"potassium":11,"potassiumUnits":69,"sulfur":13,"sulfurUnits":65,"inputType":[248,249],"dateOfApplication":"2022-02-02T19:00:00.000Z","stage":278,"limingMaterial":[119,120],"totalLimeApplied":23,"totalLimeAppliedUnits":71,"limingRate":5,"limingRateUnits":78,"limingApplicationFrequency":253,"soilApplicationMethod":[286,287],"organicInputs":[237,238,241],"totalOrganicInputApplied":5,"totalOrganicInputAppliedUnit":"75","organicInputsApplicationRate":5,"organicInputsApplicationRateUnit":"81","organicInputsApplicationFrequency":271,"organicApplicationMethod":267,"syntheticFertilizers":[173,174],"nitrogenContent":22.2,"phosphorusContent":6.3,"potassiumContent":8,"totalSyntheticFertilizerUsed":58,"totalSyntheticFertilizerUsedUnit":"84","syntheticFertilizerApplicationRate":86,"syntheticFertilizerApplicationRateUnit":"86","syntheticApplicationMethod":[259,260],"createdAt":"2022-03-22T05:25:54.000Z","updatedAt":"2022-03-22T05:36:45.000Z","soil_type":[{"id":3,"name":"Clay soil"},{"id":4,"name":"Silt soil"}],"segment_data":{"id":2,"geofenceName":"Rice Segment"},"user_farm":{"id":2,"farmName":"Corbet Farmers","registrationNo":"sdfjdskfo233423"},"crop_variety":[{"id":67,"name":"rice test"}],"organic_inputs_application_frequency":{"id":271,"name":"Thrice every crop season"},"input_type":[{"id":248,"name":"Organic inputs"},{"id":249,"name":"Inorganic inputs"}],"liming_material":[{"id":119,"name":"Magnesite"},{"id":120,"name":"Cement kiln dust"}],"organic_inputs":[{"id":237,"name":"Pig farm yard manure"},{"id":238,"name":"Poultry litter"},{"id":241,"name":"Pig slurry"}],"synthetic_fertilizers":[{"id":173,"name":"CAN"},{"id":174,"name":"DAP"}],"synthetic_application_method":[{"id":259,"name":"Direct injection"},{"id":260,"name":"Aerial application"}],"organic_application_method":[{"id":267,"name":"Surface application and deep ploughed into the soil"}],"soil_application_method":[{"id":286,"name":"Raking"},{"id":287,"name":"Spading"}],"soil_application_stage":{"id":278,"name":"Tillering"},"crop_type":{"id":54,"name":"rice"},"liming_application_frequency":{"id":253,"name":"Every two years"},"area_units":{"id":10,"name":"Acre","abbvr":"Acre","unitType":5,"factor":null},"nitrogen_units":null,"sulfur_units":null,"potassium_units":null,"phosphorus_units":null,"total_lime_applied_units":null,"liming_rate_units":null,"organic_inputs_application_rate_unit":null,"synthetic_fertilizer_application_rate_unit":null,"total_synthetic_fertilizer_used_unit":null,"total_organic_input_applied_unit":null,"bulk_density_unit":null},"reportData": [{"id": 1,"cropType": 100,"cropVariety": 88,"organization": 1,"language": "en","soil-management": "sowing","info": "{\"organic_input\": [2,\"organic input note\"], \"nitrogen_fertilizer_rate\": [3,\"fertilizer note\"], \"phophorus_fertilizer_rate\": [3,\"phophorus_fertilizer note\"], \"potassium_fertilizer_rate\": [3,\"\"]}","createdAt": "2022-03-07T04:12:23.000Z","updatedAt": "2022-03-07T04:12:23.000Z"}]}
 */
router.post(
  '/soil-management',
  auth,
  validateCropReportId(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const language = req.headers['lang'] || 'en';
      const { id } = req.body;
      const organization = await getUserOrganization(userId);
      const soilManagement = await db.SoilManagement.findOne({
        where: {
          id,
          userId,
        },
        include: [
          {
            model: db.SoilType,
            as: 'soil_type',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'soil_type' } },
          },
          {
            model: db.Geofence,
            as: 'segment_data',
            attributes: ['id', 'geofenceName'],
          },
          {
            model: db.user_farm,
            as: 'user_farm',
            attributes: ['id', 'farmName', 'registrationNo'],
          },
          {
            model: db.Crop,
            as: 'crop_variety',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'crop_variety' } },
          },
          {
            model: db.Option,
            as: 'organic_inputs_application_frequency',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'input_type',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'input_type' } },
          },
          {
            model: db.Option,
            as: 'liming_material',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'liming_material' } },
          },
          {
            model: db.Option,
            as: 'organic_inputs',
            attributes: ['id', 'name'],
            through: { attributes: [], where: { type: 'organic_inputs' } },
          },
          {
            model: db.Option,
            as: 'synthetic_fertilizers',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'synthetic_fertilizers' },
            },
          },
          {
            model: db.Option,
            as: 'synthetic_application_method',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'synthetic_application_method' },
            },
          },
          {
            model: db.Option,
            as: 'organic_application_method',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'organic_application_method' },
            },
          },
          {
            model: db.Option,
            as: 'soil_application_method',
            attributes: ['id', 'name'],
            through: {
              attributes: [],
              where: { type: 'soil_application_method' },
            },
          },
          // with option table ends
          {
            model: db.Option,
            as: 'soil_application_stage',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'crop_type',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'liming_application_frequency',
            attributes: ['id', 'name'],
          },
          {
            model: db.UnitsList,
            as: 'area_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'nitrogen_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'sulfur_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'potassium_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'phosphorus_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'total_lime_applied_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'liming_rate_units',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'organic_inputs_application_rate_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'synthetic_fertilizer_application_rate_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'total_synthetic_fertilizer_used_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'total_organic_input_applied_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
          {
            model: db.UnitsList,
            as: 'bulk_density_unit',
            attributes: ['id', 'name', 'abbvr', 'unitType', 'factor'],
          },
        ],
      });
      if (!soilManagement)
        return res.status(error.code.SERVER_ERROR).json(
          await errorResp({
            msg: 'Soil Management Data Not Found',
            code: 404,
          })
        );
      const cropType = soilManagement?.cropType;
      let soilManagementReport = {
        soilManagementData: soilManagement,
        reportData: [],
      };
      if (soilManagement?.cropVariety.length)
        soilManagementReport.reportData = await getReports(
          cropType,
          soilManagement.cropVariety,
          organization,
          language,
          'soil-management'
        );
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: soilManagementReport,
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
 * /report/crop/irrigation:
 *   post:
 *     summary: Get irrigation report - My Crop Report
 *     description: Returns information for a specific irrigation entry
 *     tags: [Crop Report]
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *              required:
 *                - id
 *            example:
 *               {"id": 100}
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
 *                   data: {"irrigationData":{"id":4,"userId":29,"area":23348.95145,"cropId":54,"waterSource":47,"irrigationWaterSource":2,"irrigationWaterSourceOrigin":2,"irrigatedArea":474266.15545,"irrigationStage":4,"irrigationSchedule":3,"totalDays":"1.00","irrigationType":4,"waterVolumeUsed":4949000,"createdAt":"2022-02-08T08:23:12.000Z","updatedAt":"2022-02-22T03:56:56.000Z","irrigation_farm":[],"irrigation_segment":[{"id":69,"geofenceName":"my updated segment","farmId":211,"farm":{"id":211,"farmName":"Farmin"}},{"id":68,"geofenceName":"seg1","farmId":211,"farm":{"id":211,"farmName":"Farmin"}}],"irrigation_cropVariety":[{"id":55,"name":"blue java banana","cropTypeOptId":79}],"irrigation_waterSource":{"id":2,"name":"Surface water"},"irrigation_dates":[{"date":"2022-02-07T19:00:00.000Z"}],"irrigation_schedule":{"id":3,"name":"Bi-weekly"},"irrigation_waterSourceOrigin":{"id":2,"name":"Streams"},"irrigation_stage":{"id":4,"name":"Tillering"},"irrigation_type":{"id":4,"name":"Manual irrigation"},"irrigation_cropType":{"id":54,"name":"rice"},"water_source":{"id":47,"name":"rainfed"}},"reportData": [{"id": 1,"cropType": 100,"cropVariety": 88,"organization": 1,"language": "en","module": "irrigation","info": "{\"water_source\": [\"sample water source1\", \"sample water source 2\"],\"irrigation_water_source\": [\"sample irrigation water source1\", \"sample irrigation water source2\"],\"irrigation_schedule\": [\"schedule 1\", \"schedule 2\"],\"types_of_irrigation\": [\"irrigation type 1\", \"irrigation type 2\"],\"water_volume_per_irrigation_stage\": [2,\"sample note\"]}","createdAt": "2022-03-07T04:12:23.000Z","updatedAt": "2022-03-07T04:12:23.000Z"}]}
 */
router.post(
  '/irrigation',
  auth,
  validateCropReportId(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const language = req.headers['lang'] || 'en';
      const { id } = req.body;
      const organization = await getUserOrganization(userId);
      const irrigation = await db.Irrigation.findOne({
        where: {
          id,
          userId,
        },
        include: [
          {
            model: db.user_farm,
            as: 'irrigation_farm',
            through: { model: db.IrrigationFarm, attributes: [] },
            attributes: ['id', 'farmName'],
          },
          {
            model: db.Geofence,
            as: 'irrigation_segment',
            through: { model: db.IrrigationSegment, attributes: [] },
            attributes: ['id', 'geofenceName', 'farmId'],
            include: [
              {
                model: db.user_farm,
                as: 'farm',
                attributes: ['id', 'farmName'],
              },
            ],
          },
          {
            model: db.Crop,
            as: 'irrigation_cropVariety',
            through: { model: db.IrrigationCropVariety, attributes: [] },
            attributes: ['id', 'name', 'cropTypeOptId'],
          },
          {
            model: db.IrrigationWaterSource,
            as: 'irrigation_waterSource',
            attributes: ['id', 'name'],
          },
          {
            model: db.IrrigationDate,
            as: 'irrigation_dates',
            attributes: ['date'],
          },
          {
            model: db.IrrigationSchedule,
            as: 'irrigation_schedule',
            attributes: ['id', 'name'],
          },
          {
            model: db.IrrigationWaterSourceOrigin,
            as: 'irrigation_waterSourceOrigin',
            attributes: ['id', 'name'],
          },
          {
            model: db.IrrigationStage,
            as: 'irrigation_stage',
            attributes: ['id', 'name'],
          },
          {
            model: db.IrrigationType,
            as: 'irrigation_type',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'irrigation_cropType',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'water_source',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!irrigation)
        return res
          .status(error.code.SERVER_ERROR)
          .json(
            await errorResp({ msg: 'Irrigation Data Not Found', code: 404 })
          );
      const cropType = irrigation?.cropId;
      let cropsIds = [];
      let irrigationReport = {
        irrigationData: irrigation,
        reportData: [],
      };
      irrigation.irrigation_cropVariety.forEach((item) => {
        cropsIds.push(item.id);
      });
      if (cropsIds.length)
        irrigationReport.reportData = await getReports(
          cropType,
          cropsIds,
          organization,
          language,
          'irrigation'
        );
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: irrigationReport,
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
 * /report/crop/weeding:
 *   post:
 *     summary: Get weeding report - My Crop Report
 *     description: Returns information for a specific weeding entry
 *     tags: [Crop Report]
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *              required:
 *                - id
 *            example:
 *               {"id": 100}
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
 *                   data: {"weedData":{"id":40,"area":1221040000,"cropTypeId":null,"weedingDays":1,"weed_method_id":2,"herbicideType":"78","herbicideUsed":86,"herbicideUsedUnitId":46,"herbicideRate":56,"herbicideRateUnitId":41,"userId":29,"createdAt":"2022-02-28T01:55:33.000Z","updatedAt":"2022-02-28T01:55:49.000Z","area_unit_id":null,"user_farms":[{"id":407,"userId":67,"address":"XXC7+6PV, Layyah","district":null,"farmingGoalOptId":null,"zipCode":null,"farmName":"cucumber1","registrationNo":"","ownerName":null,"communityName":null,"lat":30.9703375,"log":70.9645714,"farmingActivity":null,"farmOwnershipType":"community","parameter":null,"area":1221040000,"isPrimaryFarm":null,"isDeleted":false,"createdAt":"2022-02-24T02:14:18.000Z","updatedAt":"2022-02-24T04:34:30.000Z","MapWeedFarms":{"weedId":40,"userFarmId":407,"createdAt":"2022-02-28T01:55:33.000Z","updatedAt":"2022-02-28T01:55:33.000Z"}}],"segments":[],"weed_dates":[{"date":"2022-02-21T19:00:00.000Z"}],"weed_cropType":null,"weed_variety":[],"weed_data_type":[{"id":1,"name":"Spear grass"}],"weed_data_stage":[{"id":1,"name":"Pre-emergence"}],"weed_method":{"id":2,"name":"Chemical"},"weed_data_manual_method":[],"weed_data_application_method":[{"id":9,"name":"Broadcast banding"}],"herbicideunit":{"id":46,"name":"Kilogram","abbvr":"kg","unitType":14,"factor":null,"createdAt":"2022-02-23T03:06:58.000Z","updatedAt":"2022-02-23T03:06:58.000Z"},"herbiciderateunit":{"id":41,"name":"Milliliter per Litter per Acre","abbvr":"ml\/L\/acre","unitType":13,"factor":null,"createdAt":"2022-02-23T03:06:58.000Z","updatedAt":"2022-02-23T03:06:58.000Z"},"weed_area_unit_id":null},"reportData": [{"id": 1,"cropType": 100,"cropVariety": 88,"organization": 1,"language": "en","module": "weed","info": "{\"date_of_weeding\": [\"2022-10-11\", \"2022-12-11\"],\"crop_stage_in_weeding\": [\"stage 1\", \"stage 2\"],\"method_of_weeding\": [\"method 1\", \"method 2\"],\"cultural_methods\": [\"culture manual mechanical method 1\", \"culture manual mechanical method 2\"],\"herbicide_used\": [\"used 1\", \"used 2\"],\"herbicide_rate\": [2,\"sample note\"],\"herbicide_method\": [\"method 1\", \"method 2\"]}","createdAt": "2022-03-07T04:12:23.000Z","updatedAt": "2022-03-07T04:12:23.000Z"}]}
 */

router.post(
  '/weeding',
  auth,
  validateCropReportId(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const language = req.headers['lang'] || 'en';
      const { id } = req.body;
      const organization = await getUserOrganization(userId);
      const weed = await db.Weed.findOne({
        where: {
          id,
          userId,
        },
        attributes: {
          exclude: [
            'cropVarietyId',
            'weedMethodId',
            'weedStageId',
            'weedTypeId',
          ],
        },
        include: [
          db.user_farm,
          {
            model: db.Geofence,
            as: 'segments',
            include: [
              {
                as: 'farm',
                model: db.user_farm,
              },
            ],
          },
          {
            model: db.weed_date,
            as: 'weed_dates',
            attributes: ['date'],
          },
          {
            model: db.Option,
            as: 'weed_cropType',
            attributes: ['id', 'name'],
          },
          {
            model: db.Crop,
            as: 'weed_variety',
            through: { model: db.weed_crop_vatiety, attributes: [] },
            attributes: ['id', 'name'],
          },
          {
            model: db.WeedType,
            as: 'weed_data_type',
            through: { model: db.weeddata_type, attributes: [] },
            attributes: ['id', 'name'],
          },
          {
            model: db.WeedStage,
            as: 'weed_data_stage',
            through: { model: db.weeddata_stage, attributes: [] },
            attributes: ['id', 'name'],
          },
          {
            model: db.WeedMethod,
            as: 'weed_method',
            attributes: ['id', 'name'],
          },
          {
            model: db.WeedMethod,
            as: 'weed_data_manual_method',
            through: { model: db.weeddata_method, attributes: [] },
            attributes: ['id', 'name'],
          },

          {
            model: db.UnitsList,
            as: 'herbicideunit',
          },
          {
            model: db.UnitsList,
            as: 'herbiciderateunit',
          },
          {
            model: db.UnitsList,
            as: 'weed_area_unit_id',
            attributes: ['id', 'abbvr'],
          },
        ],
      });

      if (!weed)
        return res
          .status(error.code.SERVER_ERROR)
          .json(await errorResp({ msg: 'Weeding Data Not Found', code: 404 }));
      const cropType = weed?.cropTypeId;
      let cropsIds = [];
      let weedReport = {
        weedData: weed,
        reportData: [],
      };
      weed.weed_variety.forEach((item) => {
        cropsIds.push(item.id);
      });
      if (cropsIds.length)
        weedReport.reportData = await getReports(
          cropType,
          cropsIds,
          organization,
          language,
          'weed'
        );
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: weedReport,
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
 * /report/crop/harvesting:
 *   post:
 *     summary: Get harvesting report - My Crop Report
 *     description: Returns information for a specific harvesting entry
 *     tags: [Crop Report]
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *              required:
 *                - id
 *            example:
 *               {"id": 100}
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
 *                   data: {"harvestData":{"id":59,"userId":29,"area":5,"cropType":49,"start_date_harvesting":"2022-05-01T19:00:00.000Z","end_date_harvesting":"2022-10-01T19:00:00.000Z","daysHarvesting":5,"totalFreshYield":5,"totalDryYield":5,"total_planned_fresh_yield":8,"total_planned_dry_yield":1,"yieldForHouseholdConsumption":5,"yieldForSale":5,"methodForHarvesting":1,"manualHarvesting":1,"mechanicalHarvesting":1,"yieldLosses":10,"resonForLoss":1,"cropResidueManagement":10,"area_unit_id":null,"total_fresh_yield_unit_id":null,"total_dry_yield_unit_id":null,"total_planned_fresh_yield_unit_id":null,"total_planned_dry_yield_unit_id":null,"yield_for_sale_unit_id":null,"createdAt":"2022-02-18T05:49:28.000Z","updatedAt":"2022-02-18T05:49:28.000Z","harvest_farm":[{"id":364,"farmName":"test farm"}],"harvest_segment":[],"harvesting_variety":[{"id":2,"name":"rice"}],"method_for_harvesting":{"id":1,"title":"Manual (hand) harvesting","harvest_method_type":[{"id":1,"name":"Knife"},{"id":2,"name":"Sickle"},{"id":3,"name":"Cutlass"},{"id":4,"name":"Reaper"},{"id":5,"name":"Axe"},{"id":6,"name":"Shears"},{"id":7,"name":"Rake"},{"id":8,"name":"Picker"},{"id":9,"name":"Shovel"},{"id":10,"name":"Pitchfork"},{"id":11,"name":"Hoe\/digger"},{"id":12,"name":"Fruit harvesting net with blade"},{"id":13,"name":"Blade cutter"},{"id":14,"name":"Plucker"}]},"harvest_reason_for_loss":{"id":1,"name":"Pests"},"harvest_cropType":{"id":49,"name":"mangos"},"harvest_area_unit_id":null,"harvest_total_fresh_yield_unit_id":null,"harvest_total_dry_yield_unit_id":null,"harvest_total_planned_fresh_yield_unit_id":null,"harvest_total_planned_dry_yield_unit_id":null,"harvest_yield_for_sale_unit_id":null},"reportData": [{"id": 1,"cropType": 100,"cropVariety": 88,"organization": 1,"language": "en","module": "harvesting","info": "{\"days_after_sowing\": [\"days 1\"],\"fresh_yield\": [2, \"sample note\"],\"dry_yield\": [3, \"sample note dry\"],\"yield_for_household\": [\"yield 1\"],\"yield_for_sale\": [\"sale 1\", \"sale 2\"],\"method_for_harvesting\": [\"harvest 1\", \"harvest 2\"],\"yield_losses\": [\"losses 1\", \"losses 2\"],\"crop_residue\": [\"residue 1\", \"residue 2\"]}","createdAt": "2022-03-07T04:12:23.000Z","updatedAt": "2022-03-07T04:12:23.000Z"}]}
 */

router.post(
  '/harvesting',
  auth,
  validateCropReportId(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const language = req.headers['lang'] || 'en';
      const { id } = req.body;
      const organization = await getUserOrganization(userId);
      const harvest = await db.Harvest.findOne({
        where: {
          id,
          userId,
        },

        include: [
          {
            model: db.user_farm,
            as: 'harvest_farm',
            through: { model: db.HarvestingFarm, attributes: [] },
            attributes: ['id', 'farmName'],
          },
          {
            model: db.Geofence,
            as: 'harvest_segment',
            through: { model: db.HarvestingSegment, attributes: [] },
            attributes: ['id', 'geofenceName'],
          },
          {
            model: db.Crop,
            as: 'harvesting_variety',
            through: { model: db.harvest_variety, attributes: [] },
            attributes: ['id', 'name'],
          },
          {
            model: db.HarvestMethod,
            as: 'method_for_harvesting',
            attributes: ['id', 'title'],
            include: [
              {
                model: db.HarvestMethodType,
                as: 'harvest_method_type',
                attributes: ['id', 'name'],
              },
            ],
          },
          {
            model: db.harvest_reason_for_loss,
            as: 'harvest_reason_for_loss',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'harvest_cropType',
            attributes: ['id', 'name'],
          },
          {
            model: db.UnitsList,
            as: 'harvest_area_unit_id',
            attributes: ['id', 'abbvr'],
          },
          {
            model: db.UnitsList,
            as: 'harvest_total_fresh_yield_unit_id',
            attributes: ['id', 'abbvr'],
          },
          {
            model: db.UnitsList,
            as: 'harvest_total_dry_yield_unit_id',
            attributes: ['id', 'abbvr'],
          },
          {
            model: db.UnitsList,
            as: 'harvest_total_planned_fresh_yield_unit_id',
            attributes: ['id', 'abbvr'],
          },
          {
            model: db.UnitsList,
            as: 'harvest_total_planned_dry_yield_unit_id',
            attributes: ['id', 'abbvr'],
          },
          {
            model: db.UnitsList,
            as: 'harvest_yield_for_sale_unit_id',
            attributes: ['id', 'abbvr'],
          },
        ],
      });

      if (!harvest)
        return res
          .status(error.code.SERVER_ERROR)
          .json(
            await errorResp({ msg: 'Harvesting Data Not Found', code: 404 })
          );
      const cropType = harvest?.cropType;
      let cropsIds = [];
      let harvestReport = {
        harvestData: harvest,
        reportData: [],
      };
      harvest.harvesting_variety.forEach((item) => {
        cropsIds.push(item.id);
      });
      if (cropsIds.length)
        harvestReport.reportData = await getReports(
          cropType,
          cropsIds,
          organization,
          language,
          'harvesting'
        );
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: harvestReport,
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
 * /report/crop/storage:
 *   post:
 *     summary: Get storage report - My Crop Report
 *     description: Returns information for a specific storage entry
 *     tags: [Crop Report]
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *              required:
 *                - id
 *            example:
 *               {"id": 100}
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
 *                   data: {"storageData":{"id":46,"area":67.388,"userId":29,"cropId":54,"startDate":"2022-03-21T19:00:00.000Z","endDate":"2022-03-30T19:00:00.000Z","durationOfStorage":10,"yieldStored":55,"storageMethod":null,"storageType":null,"createdAt":"2022-02-23T02:57:05.000Z","updatedAt":"2022-03-04T06:19:47.000Z","crop_storage_farm":[{"id":390,"farmName":"guava community"},{"id":478,"farmName":"peach ?"},{"id":477,"farmName":"radish"},{"id":476,"farmName":"potato ?"}],"crop_storage_segment":[],"storage_cropVariety":[{"id":84,"name":"abc","cropTypeOptId":54}],"cropStorage_method":null,"cropStorage_type":null,"crop_storage_cropType":{"id":54,"name":"rice"}},"reportData": [{"id": 1,"cropType": 100,"cropVariety": 88,"organization": 1,"language": "en","module": "storage","info": "{\"no_of_days_after_harvesting\": [\"Days 1\", \"Day 2\"],\"yield_stored\": [\"Storage 1\", \"Storage 2\"],\"number_of_days\": [2, \"notes\"],\"storage_process\": [\"Process 1\", \"Process 2\"],\"types_of_storage\": [\"storage 1\", \"storage 2\"]}","createdAt": "2022-03-07T04:12:23.000Z","updatedAt": "2022-03-07T04:12:23.000Z"}]}
 */

router.post(
  '/storage',
  auth,
  validateCropReportId(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const language = req.headers['lang'] || 'en';
      const { id } = req.body;
      const organization = await getUserOrganization(userId);
      const storage = await db.CropStorage.findOne({
        where: {
          id,
          userId,
        },
        include: [
          {
            model: db.user_farm,
            as: 'crop_storage_farm',
            through: { model: db.CropStorageFarm, attributes: [] },
            attributes: ['id', 'farmName'],
          },
          {
            model: db.Geofence,
            as: 'crop_storage_segment',
            through: { model: db.CropStorageSegment, attributes: [] },
            attributes: ['id', 'geofenceName', 'farmId'],
          },
          {
            model: db.Crop,
            as: 'storage_cropVariety',
            through: { model: db.StorageCropVariety, attributes: [] },
            attributes: ['id', 'name', 'cropTypeOptId'],
          },
          {
            model: db.CropStorageMethod,
            as: 'cropStorage_method',
            attributes: ['id', 'name'],
          },
          {
            model: db.CropStorageType,
            as: 'cropStorage_type',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'crop_storage_cropType',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!storage)
        return res
          .status(error.code.SERVER_ERROR)
          .json(await errorResp({ msg: 'Storage Data Not Found', code: 404 }));
      const cropType = storage?.cropId;
      let cropsIds = [];
      let storageReport = {
        storageData: storage,
        reportData: [],
      };
      storage.storage_cropVariety.forEach((item) => {
        cropsIds.push(item.id);
      });
      if (cropsIds.length)
        storageReport.reportData = await getReports(
          cropType,
          cropsIds,
          organization,
          language,
          'storage'
        );
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: storageReport,
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
 * /report/crop/observation:
 *   post:
 *     summary: Get Pest and Disease report - My Crop Report
 *     description: Returns information for a specific crop observation entry which contains pest and disease info
 *     tags: [Crop Report]
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *              required:
 *                - id
 *            example:
 *               {"id": 100}
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
 *                 data: {"observationData":{"id":5,"userId":29,"areaPlanted":65.757,"cropType":72,"cropSeason":42,"dateOfObservation":"2022-02-14T19:00:00.000Z","growthStage":4,"germinationRate":null,"leafColor":"green","leafSize":3,"stemColor":"abc.","stemThickness":990,"plantHeight":0,"tillerNumber":66,"appreanceOfFlower":"blue","jointType":1,"notes":"","doc":"","createdAt":"2022-02-18T00:22:52.000Z","updatedAt":"2022-03-01T03:50:03.000Z","cropObservation_cropType":{"id":72,"name":"sugarcane"},"cropObservation_cropSeason":{"id":42,"name":"winter"},"cropObservation_growthStage":{"id":4,"name":"Ripening\/maturation"},"cropObservation_leafSize":{"id":3,"name":"Medium"},"cropObservation_jointType":{"id":1,"name":"Straight"},"cropObservation_farm":[{"id":324,"farmName":"testing"},{"id":288,"farmName":"ch chh"},{"id":307,"farmName":"ydyh"}],"cropObservation_segment":[],"cropObservation_cropVariety":[{"id":26,"name":"test 2"},{"id":25,"name":"fruit"},{"id":73,"name":"rice"}],"cropObservation_diseases":[{"id":2,"name":"Mottling leaves","organism":"virus"},{"id":1,"name":"Necrotic spots","organism":"virus"},{"id":4,"name":"Ring pattern on the leaves","organism":"virus"},{"id":9,"name":"Fruit spotting","organism":"bacteria"},{"id":19,"name":"Leaf rot","organism":"fungi"},{"id":16,"name":"Leaf rusting","organism":"fungi"},{"id":21,"name":"Leaf spotting","organism":"fungi"}],"cropObservation_deficiency":[{"id":6,"name":"Curling and shedding of leaves","element":"nitrogen"},{"id":3,"name":"Early flowering","element":"nitrogen"},{"id":8,"name":"Purple\/reddish stems","element":"nitrogen"},{"id":12,"name":"Small leaf size","element":"phosphorus"},{"id":10,"name":"Stunted growth","element":"phosphorus"},{"id":14,"name":"Underdeveloped roots","element":"phosphorus"},{"id":18,"name":"Leaves look burnt at tip","element":"potassium"},{"id":19,"name":"Necrotic leaves","element":"potassium"},{"id":17,"name":"Poor root development","element":"potassium"},{"id":16,"name":"Purple spots on leaves","element":"potassium"}],"cropObservation_pestInfestation":[{"id":8,"name":"Dying of the new leaves","CropObservationPestInfestationList":{"createdAt":null}},{"id":1,"name":"Holes on leaves\/fruits\/grain","CropObservationPestInfestationList":{"createdAt":null}},{"id":7,"name":"Irregular and chewed leaves\/stems","CropObservationPestInfestationList":{"createdAt":null}}],"cropObservation_toxicity":[{"id":9,"name":"Fruit deformation","element":"nitrogen"},{"id":3,"name":"Shedding of leaves","element":"nitrogen"},{"id":5,"name":"Stiff and weak stem","element":"nitrogen"},{"id":6,"name":"Underdeveloped roots","element":"nitrogen"},{"id":13,"name":"Short internodes","element":"phosphorus"},{"id":11,"name":"Small leaf size","element":"phosphorus"},{"id":12,"name":"Stunted growth","element":"phosphorus"}]},"reportData":[{"variety1Data":"dataJson"},{"variety2Data":"dataJson"},{"variety3Data":"dataJson"}]}
 */

router.post(
  '/observation',
  auth,
  validateCropReportId(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const language = req.headers['lang'] || 'en';
      const { id } = req.body;
      const organization = await getUserOrganization(userId);
      const observation = await db.CropObservation.findOne({
        where: {
          id,
          userId,
        },
        include: [
          {
            model: db.Option,
            as: 'cropObservation_cropType',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'cropObservation_cropSeason',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'cropObservation_cropSeason',
            attributes: ['id', 'name'],
          },
          {
            model: db.CropObservationGrowthStage,
            as: 'cropObservation_growthStage',
            attributes: ['id', 'name'],
          },
          {
            model: db.CropObservationLeafSize,
            as: 'cropObservation_leafSize',
            attributes: ['id', 'name'],
          },
          {
            model: db.CropObservationJointType,
            as: 'cropObservation_jointType',
            attributes: ['id', 'name'],
          },
          {
            model: db.user_farm,
            as: 'cropObservation_farm',
            through: { model: db.CropObservationFarm, attributes: [] },
            attributes: ['id', 'farmName'],
          },
          {
            model: db.Geofence,
            as: 'cropObservation_segment',
            through: { model: db.CropObservationSegment, attributes: [] },
            attributes: ['id', 'geofenceName', 'farmId'],
            include: [
              {
                model: db.user_farm,
                as: 'farm',
                attributes: ['id', 'farmName'],
              },
            ],
          },
          {
            model: db.Crop,
            as: 'cropObservation_cropVariety',
            through: { model: db.CropObservationVariety, attributes: [] },
            attributes: ['id', 'name'],
          },
          {
            model: db.CropObservationDisease,
            as: 'cropObservation_diseases',
            through: { model: db.CropObservationDiseaseList, attributes: [] },
            attributes: ['id', 'name', 'organism'],
          },
          {
            model: db.CropObservationDeficiency,
            as: 'cropObservation_deficiency',
            through: {
              model: db.CropObservationDeficiencyList,
              attributes: [],
            },
            attributes: ['id', 'name', 'element'],
          },
          {
            model: db.CropObservationPestInfestation,
            as: 'cropObservation_pestInfestation',
            through: {
              model: db.CropObservationPestInfestationList,
              attributes: ['createdAt'],
            },
            attributes: ['id', 'name'],
          },
          {
            model: db.CropObservationToxicity,
            as: 'cropObservation_toxicity',
            through: {
              model: db.CropObservationToxicityList,
              attributes: [],
            },
            attributes: ['id', 'name', 'element'],
          },
        ],
      });

      if (!observation)
        return res.status(error.code.SERVER_ERROR).json(
          await errorResp({
            msg: 'Crop Observation Data Not Found',
            code: 404,
          })
        );
      const cropType = observation?.cropType;
      let cropsIds = [];
      let observationReport = {
        observationData: observation,
        reportData: [],
      };
      observation.cropObservation_cropVariety.forEach((item) => {
        cropsIds.push(item.id);
      });
      if (cropsIds.length)
        observationReport.reportData = await getReports(
          cropType,
          cropsIds,
          organization,
          language,
          'observation'
        );
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: observationReport,
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
 * /report/crop/crop-reports-by-types:
 *   get:
 *     summary: Get Crop Reports by types
 *     description: Returns the reports for the selected crop types
 *     tags: [Crop Report]
 *     parameters:
 *      - in: query
 *        name: crops_list
 *        schema:
 *          type: array
 *        example:
 *          [onion,potato,sugarcane]
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
 *                     type: array
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{ "id": 1,   "cropName": "onion", "fileS3Key": "Soil/Onion.pdf", "report": null,  "createdAt": "2022-07-07T12:15:04.000Z",  "updatedAt": "2022-07-07T12:15:04.000Z"},{ "id": 1,   "cropName": "sugarcane", "fileS3Key": "Soil/Onion.pdf", "report": null,  "createdAt": "2022-07-07T12:15:04.000Z",  "updatedAt": "2022-07-07T12:15:04.000Z"}]
 */
 router.get(
  '/crop-reports-by-types',
  auth,
  async (req, res) => {
    try {
     
      let {crops_list}=req.query;

      let report_data=[];

      for (const crop of crops_list) {
        const result = await  db.crops_reports.findOne({
          where:{
           cropName:crop
          },
         });
        report_data.push(result); 
      }

      return res.json(
        await successResp({
          msg: success.FETCH,
          data:report_data
        }),
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return res.status(error.code.SERVER_ERROR).json(await errorResp());
    }
  },
);


module.exports = router;
