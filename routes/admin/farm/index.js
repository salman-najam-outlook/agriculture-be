const express = require('express');
const router = express.Router();
const _ = require('lodash');
const moment = require('moment');
const { Op } = require('sequelize');
const axios = require("axios")
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + "/middleware/translation");
const { logErrorOccurred, notEmpty, fileFilterGen } = require(rootPath +
  '/helpers/general');
const { error, success } = require(rootPath + '/helpers/language');
const { getCountries, getStates } = require('country-state-picker');
const { generateRandomString } = require('../../../helpers/utils');
const { addOfflineFarmerForAdmin } = require('../../../common/addOfflineFarmer');
const validate = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
const { syncFarmerDataToOCC } = require(rootPath + '/helpers/occ-komodo');
const S3 = require(rootPath + '/components/s3upload');
var aws = require("aws-sdk");
const multer = require("multer");
var multerS3 = require("multer-s3");
const { getPerimeterFromCircularInFeet } = require('../../../helpers/geo-utils');
const { getAreaFromCircularInAcre } = require('../../../helpers/geo-utils');
const { updateDefaultUnitForCacaoByUserId } = require(rootPath +
  "/helpers/defaultUnitConfigCacaoUser");
const { getAreaFromPolygonsInAcre, getPerimeterFromPolygonsInFeet } = require(rootPath + '/helpers/geo-utils.js');
const { v4: uuid } = require('uuid');
const md5 = require('md5');


const cropInstance = axios.create({
  baseURL: process.env.PYTHON_LAND_WEATHER_BASE_API || "https://land-score-api-pre-prod.dimitra.dev"
});

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_PUBLIC_BUCKET,
});
// storage configuration
const storage = multerS3({
  s3,
  bucket: process.env.AWS_PUBLIC_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    // create custom key name on s3 cloud
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
var params, whiteListMimeTypes, lang;
// allowed mime types
whiteListMimeTypes = ["image/jpeg", "image/png", "image/svg+xml",  "image/jpg", "application/pdf"];
// params
params = {
  bucket: process.env.AWS_PUBLIC_BUCKET,
  whiteListMimeTypes,
};
// allowed mimetypes
const fileFilter = fileFilterGen(whiteListMimeTypes); // get filter function
var upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2000000 },
});

const {
  farmDeleteValidation,
  farmPutValidation,
  farmPostValidation,
  fetchOneValidation,
} = require(rootPath + '/helpers/validation');
const {
    successRespSync,
    successResp,
    serverError,
    errorResp,
    errorRespSync,
  } = require(rootPath + '/helpers/api');

router.use('/segment',require("./segment"))
router.use('/location',require("./location"))
router.use('/bulk-upload', require('./bulk-upload'));
router.use('/farm-name-validation', require('./farm-name-validation'));
router.use('/farm-calendar-activities', require('./farm-calendar-activities'));


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

router.get(
  '/countries/all',
  auth,
  async (req, res) => {
    try {
      const countries = getCountries()
      return res.json(
        await successResp({
          msg: success.FETCH,
          data: countries
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

router.get(
  '/states/:country_code',
  auth,
  async (req, res) => {
    try {
      const { country_code } = req.params;
      const states = getStates(country_code)
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
  }
);



/**
 * @swagger
 * /list/options:
 *   get:
 *     summary: Fetch options from the option table using groupName and name(for searching puporse)
 *     description: Fetch options from the option table using groupName and name(for searching puporse)
 *     tags: [Options]
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
 *         name: name
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Name
 *       - in: query
 *         name: country
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Country Flag
 *       - in: query
 *         name: groupName
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Group name
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "num_rows": 15, "info": [ { "info": null, "id": 235, "name": "Cattle farm yard manure", "recordId": null } ] } }
 */

router.get(
  "/options",
  auth,
  translation,
  validate.optionValidationGet(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page, limit, name, groupName } = req.query;
      let where = { groupName };
      let orgId = req.user.organization;
      // check if search is not null and undefined
      if (notEmpty(name)) {
        where.name = {
          [Op.like]: "%" + name + "%",
        };
      }
    
   

      if (groupName === "certification") {
        const globalCertifications = [
          "Global G.A.P.",
          "Rainforest Alliance",
          "Fair Trade",
          "Organic",
          "Woman's Hand",
          "Carbon Neutral",
        ];

        where[Op.or] = [
          { name: { [Op.in]: globalCertifications } },
          {
            userId: {
              [db.Sequelize.Op.in]: db.sequelize.literal(`(
                SELECT id FROM users WHERE organization = ${db.sequelize.escape(orgId)}
              )`),
            },
          },
        ];
      } 

      if (groupName === 'crop-type') {
        where.countryCode = req.user.countryIsoCode
      }

        // generating query
        let query = {
          attributes: ["id", "name", "info", "recordId","userId"],
          where,
        };

         
      // check if page and limit is not empty
      if (notEmpty(page) && notEmpty(limit)) {
        limit = parseInt(limit);

        query.offset = (page - 1) * limit;
        query.limit = limit;
      }

      // fetch data from DB
      let result = await db.Option.findAll(query);
      let resultCpy = JSON.parse(JSON.stringify(result))
      resultCpy = resultCpy.map(el => {
        el.codeName = el.name
        return el
      })

      result = {
        num_rows: result.length,
        data: resultCpy,
      };

      const { lang } = req?.headers;
      if (lang && lang !== "en") {
        result.data= req.translateFunction( result.data, globalTranslationCache, {
          lvl1: true,
        });
      }

      // send response
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


router.post(
  '/',
  auth,
  farmPostValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { createFarmSegment, createFarmLocation, createCircularGeofence } = require(rootPath + '/helpers/controller');
      const recordId = md5(uuid());
      const {
        userId,
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
        technicianId,
        farmGeofenceName,
        farmGeofenceCategory,
        farmGeofenceRadius,
        farmGeofenceType,
        productionType,
        certifications,
        farmTitleDocumentUrl,
        farmNumber,
        areaSyncFromDeforestation = false,
        farm_created_from  = 'admin'
      } = req.body;

      let set = {
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
        farmTitleDocument:farmTitleDocumentUrl,
        dimitraFarmId: uuid(),
        farm_created_from
      };

      if(areaSyncFromDeforestation){
        set.area = area;
        set.parameter = parameter;
      }
      else{
        if (farmGeofenceType === 'circular') {
          set.parameter = getPerimeterFromCircularInFeet(farmGeofenceRadius);
          set.area = getAreaFromCircularInAcre(farmGeofenceRadius);
        } else {
          if (Array.isArray(farmGeofence)) {
            set.parameter = getPerimeterFromPolygonsInFeet(farmGeofence) ?? set.parameter;
            set.area = getAreaFromPolygonsInAcre(farmGeofence) ?? set.area;
          }
        }
      }
     

      // check if the farm name and registration number is unique together
      const { isUniqueRegNoAndFarmNameTogether,farmAlreadyRegistered } = require(rootPath +
        '/helpers/controller');
      const isRegistered = await farmAlreadyRegistered(req);
      if(isRegistered){
        return res.status(success.code.OK).json(
          await errorResp({
            code: success.code.OK,
            msg: error.FARM_EXIST_ALREADY
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

      if (isTechnician && !userId) {
        // find user with the existing farmerId
        let existingUser 
        if(farmerId) {
           existingUser = await db.user_farm.findOne({
            where: {
              farmerId
            },
            include: [
              {
                model: db.user,
                as: 'user',
                where: {
                  organization: req.user.organization
                }
              }
            ]
          })
        }
        if (existingUser) {
          set.userId = existingUser.userId
        } else {
          req.body = {
            ...req.body,
            name: req.body.farmerFirstName || '' + " " + req.body?.farmerMiddleName || '' + " " + req.body.farmerLastName || '',
            address: req.body.address,
          }
          let newFarmerId = await addOfflineFarmerForAdmin(req, res, true, true)
          set.userId = newFarmerId
        }
        set.technicianId = technicianId
      } else {
        set.farmerFirstName = farmerFirstName
        set.farmerMiddleName = farmerMiddleName
        set.farmerLastName = farmerLastName
      }


      

      // remove undefined values before inserting
      Object.keys(set).forEach((key) => {
        set[key] == undefined || set[key] == null ? delete set[key] : {};
      });

      // initialize/start the transaction
      const transaction = await db.sequelize.transaction();
      try {
        // generate invite link
        const inviteLink = process.env.SITEURL
        ? process.env.SITEURL + '?q=aGVsbG8gd29ybGQ='
        : 'https://' + req.get('host') + '?q=aGVsbG8gd29ybGQ=';
        set.inviteLink = inviteLink
        // insert farm data into DB
        let farm = await db.user_farm.create(set, {
          transaction,
        });
        const farmId = farm.id; // farm id

        //create farm certificate;
        if(certifications && certifications.length){
          const farmCertificates = certifications.map(id=>({
            certificateId:id,
            farmId
          }));
  
          await db.FarmCertificate.bulkCreate(farmCertificates,{transaction});
        }

        // check if the farming goals array is not empty
        if (notEmpty(farmingGoals)) {
          const farmingGoalsArr = farmingGoals.map((data) => {
            const { farmingGoalOptId, farmingGoal } = data;
            return {
              farmId,
              userId:set.userId,
              farmingGoalOptId,
              farmingGoal,
            };
          });
          // insert farming goals if array is not empty
          await db.UserFarmingGoal.bulkCreate(farmingGoalsArr, {
            transaction,
          });
        }

        // check if farm geofeces coordinates are there in the body
        if (notEmpty(farmGeofence)) {
          const farmCoordinates = farmGeofence.map((data) => {
            const { lat, log } = data;
            return {
              farmId,
              userId:set.userId,
              lat,
              log,
            };
          });
          // insert data into the user farm coordinates
          await db.UserFarmCoordinate.bulkCreate(farmCoordinates, {
            transaction,
          });
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
          street: street ?? '',
          userId: set.userId, // admin is technician so use new user id
          farmGeofenceRadius: farmGeofenceRadius,
          farmGeofenceType: farmGeofenceType,
          recordId: md5(uuid()),
        };

         //both main polygon and circular geofence will be created in createFarmLocation
        const locationData = await createFarmLocation(farmLocationInput, req, transaction)
        let geofenceArr = []
        // check if segment is not empty then insert it
        if (notEmpty(segments)) {
          geofenceArr = await createFarmSegment({ farmId, req, newUserId: set.userId, farmLocationId: locationData.id }, transaction); // admin is technician so use new user id
        }

        // commit transaction
        await transaction.commit();
        await syncFarmerDataToOCC(set.userId);


        //sync farm data to DDS

        const farmResponse = await db.user_farm.findOne({
          where: {
            id : farmId
          },
         });


        // send response back to the client
        return res.json(
          await successResp({
            msg: success.FARM_ADDED,
            data: {
              id: farm.id,
              farm,
              segments: geofenceArr,
            },
            success:true
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
  '/:id',
  auth,
  fetchOneValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { id } = req.params;
      let where = { id, isDeleted: 0 };
      let query = {
        include: [
          {
            attributes: ['id', 'cropTypeOptId'],
            model: db.UserfarmCrop,
            as: 'farmCrops',
            include: [
              {
                attributes: [
                  'id',
                  [
                    db.sequelize.literal(
                      '`farmCrops->cropVariety->crop`.`name`'
                    ),
                    'cropName',
                  ],
                ],
                model: db.UserfarmCropVariety,
                as: 'cropVariety',
                include: [{ model: db.Crop, as: 'crop', attributes: [] }],
              },
            ],
          },
          {
            attributes: ['id', 'displayName'],
            model: db.userLiveStock,
            as: 'farmLivestocks',
            through: { attributes: [] },
          },
          {
            attributes: ['id', 'displayName'],
            model: db.Equipment,
            as: 'farmEquipments',
            through: { attributes: [] },
          },
          {
            as: 'segments',
            model: db.Geofence,
            required: false,
            attributes: [
              'id',
              'geofenceName',
              'geofenceArea',
              'geofenceParameter',
              'geofenceCategory',
              'geofenceAreaUOMId',
              'geofenceParameterUOMId',
              'geofenceRadius',
              'geofenceCenterLat',
              'geofenceCenterLog',
              'isPrimary'
            ],
            include: [
              {
                model: db.GeofenceCoordinate,
                attributes: ['id', 'lat', 'log'],
                as: 'coordinates',
                required: false,
              },
            ],
          },
          {
            model: db.user,
            as: 'includeFarmOwner',
            attributes: ['id', 'firstName','middleName', 'lastName', 'fullName'],
          },
          {
            model: db.Option,
            as: 'includeFarmType',
            attributes: ['id', 'name'],
          },
          {
            model: db.Option,
            as: 'includeProductionSystem',
            attributes: ['id', 'name'],
          },
          {
            attributes: ['farmId', 'lat', 'log'],
            model: db.UserFarmCoordinate,
            as: 'coordinates',
          },
          {
            model: db.Option,
              as: 'farmCertifications',
              attributes:['id','name']
          },{
            model:db.UserFarmingGoal,
            as:'farmGoals'
          },
          {
            model: db.user,
            as: 'user',
            required: true,
            where: {
              organization: req.user.organization,
            },
            attributes: ['id', 'firstName','middleName', 'lastName']
          },
        ],
        attributes: [
          'id',
          'userId',
          'farmName',
          'ownerName',
          'registrationNo',
          'farmOwnershipType',
          'address',
          'district',
          'zipCode',
          'farmingActivity',
          'area',
          'areaUomId',
          'parameter',
          'lat',
          'log',
          'createdAt',
          // new
          'farmType',
          'productionSystem',
          'farmOwner',
          'country',
          'state',
          'city',
          'govRegistrationNum',
          'contractMating',
          'cooperativeId',
          'licenceNum',
          'licenceExpiryDate',
          'regulatorName',
          'regulatorRepresentiveName',
          'houseNum',
          'street',
          'farmerFirstName',
          'farmerMiddleName',
          'farmerLastName',
          'farmerId',
          'isTechnician',
          'productionType',
          'farmGeofenceName',
          'farmGeofenceCategory',
          'farmTitleDocument',
          'dimitraFarmId',
          'farmerRegistrationId',
          'farmRegistrationId'
        ],
        where,
      };

      let result = await db.user_farm.findOne(query);
      if(!result) {
        return res.json(
          errorRespSync({
            code: error.code.NOT_FOUND,
            msg: error.DOESNT_EXISTS,
          })
        );
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

router.post('/farm_upload',auth, async (req, res, next) => {
  let fileUpload = upload.fields([{ name: "file", maxCount: 1 }]);
  fileUpload(req, res, function (err) {
    if (err instanceof multer.MulterError || err) {
      return res.json(errorRespSync({ code: 200, msg: err.message }));
    } else {
      next();
    }
  });
},async(req,res)=>{
  try{
    const farmTitleDocument =
    req.files && req.files["file"]
      ? req.files["file"][0]
      : null;

    return res.json(
      successRespSync({
        msg: success.UPLOADED,
        data: {
          farmTitleDocument
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
})

router.put(
  '/',
  auth,
  // farmPutValidation(),
  validationErrorHandler,
  async (req, res) => {

    console.log(req.body)
    
    // initialize/start the transaction
    const transaction = await db.sequelize.transaction();

    try {
      const userFirstName = req.user.firstName
      const userMiddleName = req.user.middleName
      const userLastName = req.user.lastName
      const {
        userId,
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
        technicianId,
        recordId,
        farmGeofenceName,
        farmGeofenceCategory,
        productionType,
        certifications,
        farmTitleDocumentUrl,
        circularGeofenceId,
        farmGeofenceRadius,
        farmGeofenceType,
        areaSyncFromDeforestation = false,
      } = req.body;

      const farmId = id; // assigning farm id to farmId var.
      let set = {
        userId,
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
        // isTechnician,
        recordId,
        farmGeofenceName,
        farmGeofenceCategory,
        productionType,
        farmTitleDocument : farmTitleDocumentUrl
      };

      if (Array.isArray(farmGeofence)) {
        set.parameter = getPerimeterFromPolygonsInFeet(farmGeofence) ?? set.parameter;
        set.area = getAreaFromPolygonsInAcre(farmGeofence) ?? set.area;
      }
    

      if (isTechnician && !userId) {
        // find user with the existing farmerId
        let existingUser = await db.user_farm.findOne({
          where: {
            farmerId
          },
          include: [
            {
              model: db.user,
              as: 'user',
              where: {
                organization: req.user.organization
              }
            }
          ]
        })
        if (existingUser) {
          set.userId = existingUser.userId
          set.oldUserId = existingUser.userId
          set.farmerFirstName = existingUser.firstName
          set.farmerMiddleName = existingUser.middleName
          set.farmerLastName = existingUser.lastName
        } else { 
          req.body = {
            ...req.body,
            name: req.body.farmerFirstName + " " + req.body.farmerMiddleName + " " + req.body.farmerLastName,
            address: req.body.address,
          }
          let newFarmerId = await addOfflineFarmerForAdmin(req, res, true, true)
          set.userId = newFarmerId
          set.oldUserId = newFarmerId
        }
        set.technicianId = technicianId
      } else {
        let userRes = await db.user.findOne({
          where: {
            id: userId
          }
        })
        userRes.firstName = farmerFirstName
        userRes.middleName = farmerMiddleName
        userRes.lastName = farmerLastName
        await userRes.save()
        set.farmerFirstName = farmerFirstName
        set.farmerMiddleName = farmerMiddleName
        set.farmerLastName = farmerLastName
        set.userId = userId
        set.oldUserId = userId
        // set.technicianId = null
      }

      // remove undefined values before inserting
      Object.keys(set).forEach((key) => {
        set[key] == undefined || set[key] == null ? delete set[key] : {};
      });

      // check if the farm name and registration number is unique together
      const { isUniqueRegNoAndFarmNameTogether } = require(rootPath +
        '/helpers/controller');
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
        await db.FarmCertificate.destroy({ // delete if old farm certificate exists;
          where: {
            farmId,
          },
          transaction,
        });
        
        if(certifications && certifications.length){
          const farmCertificates = certifications.map(id=>({
            certificateId:id,
            farmId
          }));
  
          await db.FarmCertificate.bulkCreate(farmCertificates,{transaction});
        }
      
        set.isTechnician= true // always true because its from admin side
        set.adminTechnicianId = req.user.id // admin id is technician id

        // insert farm data into DB
        let [result] = await db.user_farm.update(set, {
          where: {
            id,
          },
          transaction,
        });

        // check if the farming goals array is not empty
        if (notEmpty(farmingGoals) && result) {
          const farmingGoalsArr = farmingGoals.map((data) => {
            const { farmingGoalOptId, farmingGoal } = data;
            return {
              farmId,
              userId:set.userId,
              farmingGoalOptId,
              farmingGoal,
            };
          });

          // Delete old farming goals
          await db.UserFarmingGoal.destroy({
            where: {
              farmId,
            },
            transaction,
          });
          // insert farming goals if array is not empty
          await db.UserFarmingGoal.bulkCreate(farmingGoalsArr, {
            transaction,
          });
        }

        // check if farm geofeces coordinates are there in the body
        if (notEmpty(farmGeofence) && result) {
          const farmCoordinates = farmGeofence.map((data) => {
            const { lat, log } = data;
            return {
              farmId,
              userId:set.userId,
              lat,
              log,
            };
          });

          // Delete old coordinated of geofencing
          await db.UserFarmCoordinate.destroy({
            where: {
              farmId,
            },
            transaction,
          });

          // insert data into the user farm coordinates
          await db.UserFarmCoordinate.bulkCreate(farmCoordinates, {
            transaction,
          });

        }

        //if farmGeofence not present delete farm coordinates
        if(!farmGeofence && farmGeofenceRadius ) {
            // Delete old coordinated of geofencing
            await db.UserFarmCoordinate.destroy({
            where: {
              farmId,
            },
            transaction,
          });
        }

        // update circular geofence from deforestation
        if (areaSyncFromDeforestation) {
          const geofenceRes = await db.Geofence.findOne({
            where: {
              isPrimary: 1,
              farmId: id, 
            },
            transaction
          });
        
          if (geofenceRes) {
            geofenceRes.geofenceArea = area;
            geofenceRes.geofenceCenterLat = lat || null;
            geofenceRes.geofenceCenterLog = log || null;
            geofenceRes.geofenceRadius = farmGeofenceRadius || null;
            await geofenceRes.save({ transaction });
          }
        }
        else{
          if(circularGeofenceId) {
            // update circular geofence data
            let geofenceSet = {
              "geofenceName" : farmGeofenceName,
              "geofenceArea" : area,
              "geofenceCategory" : farmGeofenceCategory,
              "geofenceRadius" : farmGeofenceRadius,
              "geofenceCenterLat" : lat,
              "geofenceCenterLog" : log,
  
            }
  
            await db.Geofence.update(geofenceSet, {
              where: {
                id: circularGeofenceId
              },
              transaction,
            });
          }
        }
     
  
              

        await transaction.commit();
        await syncFarmerDataToOCC(set.userId);



       
        //queue to create farm in livestock microservice
        const farmResponse = await db.user_farm.findOne({
          where: {id},
          include:[
            {
              model: db.Option,
                as: 'farmCertifications',
                attributes:['id','name']
            }
          ]});



        return res.json(
          await successResp({
            msg: result ? success.UPDATED : error.NOT_FOUND,
            data: {
              inviteLink: farmResponse?.dataValues?.inviteLink,
              farm: farmResponse
            }
          })
        );
      } catch (err) {
        console.log(err)
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
  '/',
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

      // update delete flag in the farm table
      let [result] = await db.user_farm.update(set, {
        where: {
          id: farmId,
          // userId,
        },
      });

      const farmRes = await db.user_farm.findOne({
        where:{
          id:farmId
        }
      })




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

router.get('/options/farms-with-zones', auth, async (req, res) => {
  try {
    const { organization } = req.user;
    const users = await db.user.findAll({
      attributes: ['id'],
      where: {
        organization,
      },
    });
    const userIds = users.map((user) => user.id);
    const farmWithSegments = await db.user_farm.findAll({
      attributes: ['id', 'farmName'],
      where: {
        isDeleted: false,
        [Op.or]: [{ userId: { [Op.in]: userIds } }, { technicianId: { [Op.in]: userIds } }],
      },
      include: [
        {
          model: db.Geofence,
          as: 'segments',
          attributes: ['id', 'geofenceName', 'geofenceRadius', 'isPrimary'],
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
      ],
      order: [['createdAt', 'DESC']]
    });
    return res.json(farmWithSegments);
  } catch (error) {
    console.error(error);
    logErrorOccurred(__filename, error);
    return serverError(res, err);
  }
});


router.get('/dds/farms', auth, async (req, res) => {
  try {
    const {page = 1,limit = 20, search} = req.query
    const offset = (page - 1) * Number(limit)

    const { organization, subOrgId } = req.user;
    
    const whereQuery = {
      isDeleted: 0
    }
    if(search){
      whereQuery[Op.and] = [{
        farmName: {
          [Op.like]:'%' + search + '%'
        }
      }]
    }
    const { count: totalRows, rows } = await db.user_farm.findAndCountAll({
      attributes: ["id", "address", "farmType", "farmName", "farmOwner", "ownerName",  "area", "district", "region", "registrationNo", "farmerFirstName", "farmerLastName", "farmerMiddleName", "country", "state", "city", "street", "area",'lat','log',"farmerId",'createdAt'],
      where: whereQuery,
      include: [
        {
          model: db.UserFarmCoordinate,
          as: "farmCoordinates",
          required: false,
        },
        {
          model: db.Geofence,
          as: "circularGeofence",
          where: { isPrimary: true, geofenceRadius: { [Op.not]: null } },
          attributes: ["id", "geofenceRadius", "geofenceCenterLat", "geofenceCenterLog"],
          required: false,
        },
        {
          model: db.user,
          as: "user",
          attributes: ["id", "address", "firstName", "organization", "middleName","lastName", "fullName", "profilePicUrl","country"],
          required: true,
          where:{
            organization:organization,
            ...(subOrgId && {subOrganizationId: subOrgId})
          }
        }
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: db.UserFarmCoordinate, as: 'farmCoordinates' }, 'id', 'ASC'] 
      ],
      offset:offset,
      limit:Number(limit),
      distinct: true,
    });
    return res.json({ totalRows, rows });
  } catch (error) {
    console.log(error)
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

router.get("/croptype/:farmId", auth, validationErrorHandler, async(req, res)=>{
  const {farmId} = req.params
  const apiKey = process.env.GOOGLE_API_KEY;
  try {
    const data = await db.user_farm.findOne({ where: {id: farmId }})
    const lat = data?.get('lat')
    const long = data?.get('log')
    const country = await getCountryName(lat, long, apiKey)
    const cropType = await getCropType(country)
     
    return res.json(
      await successResp({
        msg: success.FETCH,
        data: cropType,
      })
    );
  } catch (error) {
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
})

const getCountryName = async (lat, lon, apiKey) => {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json';
  try {
    const response = await axios.get(url, {
      params: {
        latlng: `${lat},${lon}`,
        key: apiKey,
      },
    });

    if (response.data.status !== 'OK') {
      throw new Error(`Geocoding API error: ${response.data.status}`);
    }

    const results = response.data.results;
    const country = results.find((result) =>
      result.types.includes('country')
    )?.formatted_address;

    if (country) {
      return country;
    } else {
      throw new Error('Country not found in Geocoding response');
    }
  } catch (error) {
    throw new Error('Failed to fetch country name');
  }
};


const getCropType = async(country)=> {

  try {
    const response = await cropInstance.get("/get-regions")
    const data = response?.data?.data;
    const matchingCountry = data?.find(
      (item) => item.country.toLowerCase() === country.toLowerCase()
    );

    if (!matchingCountry) {
      return {
        continent: null,
        country: null,
        countryCode: null,
        crops: [],
      };
    }

    const arr = matchingCountry.states.flatMap(state =>
      state.crops.map((cropName, index) => {
        const cropId = Object.entries(state.crop_ids[0]).find(([key]) => key === cropName)?.[1];
        return { id: cropId, name: cropName };
      })
    );

    return {
      continent: matchingCountry.continent,
      country: matchingCountry.country,
      countryCode: matchingCountry.countryCode,
      crops: arr
    };
  } catch (error) {
    console.log(error, "error")
    throw new Error(error.response?.data?.error || error.message || 'Request failed');
  }
}

module.exports = router;