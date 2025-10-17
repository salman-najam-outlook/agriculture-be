const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const { serverError, successRespSync } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const validate = require(rootPath + '/helpers/validation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /crop:
 *   get:
 *     summary: Fetch all the crop list and Search is also available on the crop name.
 *     description: Fetch all the crop list and Search is also available on the crop name.
 *     tags: [Crop]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Number of records you want to fetch
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: Integer
 *         description: The number of records to skip before starting to collect the result set
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Name of the crop you want to find
 *       - in: query
 *         name: croptype
 *         required: false
 *         schema:
 *           type: string
 *         description: ID of croptype you want to fetch
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *               example: {"success": true,"code": 200,"message": "Fetched successfully.","data": {"num_rows": 3,"info": [{"id": 2,"name": "rice"},{"id": 9,"name": "mango"},{"id": 19,"name": "banana fruit"}]}}
 *
 *       500:
 *         description: Server error
 */
router.get(
  '/',
  auth,
  translation,
  validate.listValidation(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { page, limit, name, croptype } = req.query;
      let where = {};
      // check if crop type id is set or not
      if (notEmpty(croptype)) {
        where.cropTypeOptId = croptype;
        where[Op.or] = [
          { userId: null },
          { userId: req.user.id },
        ]
      }

      // check if search is not null and undefined
      if (name != null && name != undefined && name.length > 0) {
        where.name = {
          [Op.like]: '%' + name + '%',
        };
      }

      // generating query
      let query = {
        attributes: ['id', 'name', ['cropTypeOptId', 'cropTypeId']],
        where,
      };

      // check if page and limit is not empty
      if (notEmpty(page) && notEmpty(limit)) {
        limit = parseInt(limit);

        query.offset = (page - 1) * limit;
        query.limit = limit;
      }

      // fetch data from DB
      let result = await db.Crop.findAll(query);
      result = {
        num_rows: result.length,
        data: result,
      };
      if (req.headers.lang && req.headers.lang != 'en') {
        result = req.translateFunction(result, globalTranslationCache, {
          lvl1: true,
          lvl2: false,
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



/**
 * @swagger
 * /crop/type:
 *   post:
 *     summary: API for creating a crop type
 *     description: API for creating a crop type.
 *     tags: [Crop]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         example:
 *           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: API for creating a crop type
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *            example:
 *              {"name":"peach","groupName":"crop-type","countryId":1}
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
 *                     properties:
 *                 example: {"success": true,"code": 200,"message": "crop type has been created successfully.","data": {"id": 233,"groupName": "crop-type","name": "peach","userId": 171,"updatedAt": "2022-03-12T11:23:55.548Z","createdAt": "2022-03-12T11:23:55.548Z"}}
 *
 */

router.post(
  '/type',
  auth,
  validate.cropTypePost(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const { createOption } = require(rootPath + '/helpers/controller/option');
      req.body.groupName = 'crop-type'; // set group name to default
      const option = await createOption(req, true);
      // send response
      return res.json(
        successRespSync({
          msg: success.CROP_TYPE_CREATED,
          data: option,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get('/traceability/options/:croptypeId', translation, async (req, res) => {
  try {
    const croptypeId = req.params.croptypeId;
    let rejectionOptions ,productTypeOptions 
    if(croptypeId == 7942 ) {
      rejectionOptions = await db.CroptypeRejection.findAll({
        where: {
          croptypeId: parseInt(croptypeId),
        },
      });
  
       productTypeOptions = await db.CroptypeProductType.findAll({
        where: {
          croptypeId: parseInt(croptypeId),
        },
      });
    } else {
      rejectionOptions = await db.CroptypeRejection.findAll({
        where: {
          croptypeId: { [Op.is]: null },
        },
      });
  
       productTypeOptions = await db.CroptypeProductType.findAll({
        where: {
          croptypeId: { [Op.is]: null },
        },
      });
    }


    let results = {}
    results.productTypeOptions = productTypeOptions
    results.rejectionOptions = rejectionOptions

    if (req.headers.lang && req.headers.lang !== 'en') {
      results = req.translateFunction(results, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
      });
    }

    return res.json(successRespSync({
      msg: success.FETCH,
      data: results,
    }));

  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

const cropInclusionFilter = [
  "acai palm",
  "alfalfa",
  "apple",
  "avocado",
  "banana",
  "barley",
  "black pepper",
  "blueberry",
  "broccoli",
  "cabbage",
  "cardamom",
  "carrot",
  "cashew",
  "cassava",
  "cauliflower",
  "chilli",
  "clover",
  "cocoa",
  "coffee",
  "corn",
  "maize",
  "cotton",
  "cowpea",
  "date palm",
  "dry beans",
  "garlic",
  "ginger",
  "grape",
  "green gram",
  "kidney bean",
  "lemon",
  "lettuce",
  "mango",
  "nutmeg & mace",
  "oil palm",
  "olives",
  "onion",
  "orange",
  "papaya",
  "pea",
  "pearl millet",
  "pigeon pea",
  "pine",
  "pineapple",
  "pomegranate",
  "potato",
  "quinoa",
  "rapeseed",
  "rhodes",
  "rice",
  "rose",
  "safflower",
  "sesame",
  "sorghum",
  "soybean",
  "strawberry",
  "sugarcane",
  "sunflower",
  "sweet potato",
  "tea",
  "timothy",
  "tobacco",
  "tomato",
  "turmeric",
  "watermelon",
  "wheat"
];

router.get(
  '/comprehensive-crops',
  auth,
  translation,
  async (req, res) => {
    try {
      const cropTypes = await db.Option.findAll({
        where: {
          groupName: 'crop-type'
        }
      });

      const filteredCropTypes = cropTypes.filter((cropType) => {
        for (const crop of cropInclusionFilter) {
          if (cropType.name.toLowerCase().includes(crop)) {
            return true;
          }
        }
        return false;
      });

      const deduplicatedCropTypes = [];

      for (const crop of filteredCropTypes) {
        try {
          const {
            name,
            ...cropData
          } = crop.dataValues;

          const genericName = name.replaceAll(/\([a-zA-Z|\s]*\)/gm, '').trim().toLowerCase();

          for (const deduped of deduplicatedCropTypes) {
            if (deduped.name === genericName) {
              throw new Error("duplicated")
            }
          }

          deduplicatedCropTypes.push({
            name: genericName,
            ...cropData
          });
        } catch (e) {
          if (e.message !== "duplicated") throw new Error(e);
        }
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: deduplicatedCropTypes
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  '/comparision-crops',
  auth,
  translation,
  async (req, res) => {
    try {
      const { country } = req.query;
      const userId = req.user.id;

      // Step 1: Check if there are any crops available for the country (regardless of user registration)
      let countryCropsWhereClause = {
        groupName: 'crop-type'
      };

      if (country) {
        countryCropsWhereClause.region = {
          [Op.like]: `%${country}%`
        };
      }

      const allCropsForCountry = await db.Option.findAll({
        where: countryCropsWhereClause,
        attributes: ['id'],
        raw: true
      });

      const isCropAvailableForCountry = allCropsForCountry.length > 0;

      // Step 2: Get unique crop type IDs that the user has registered
      const userRegisteredCrops = await db.UserfarmCrop.findAll({
        where: { userId: userId },
        attributes: ['cropTypeOptId'],
        raw: true
      });

      // Extract unique crop type IDs
      const userCropTypeIds = [...new Set(userRegisteredCrops.map(crop => crop.cropTypeOptId))];

      // Step 3: Check if user has registered any crops for this country
      let userCropsForCountryWhereClause = {
        groupName: 'crop-type',
        id: { [Op.in]: userCropTypeIds }
      };

      if (country) {
        userCropsForCountryWhereClause.region = {
          [Op.like]: `%${country}%`
        };
      }

      const userCropsForCountry = await db.Option.findAll({
        where: userCropsForCountryWhereClause,
        attributes: ['id'],
        raw: true
      });

      const hasUserRegisteredCropsForCountry = userCropsForCountry.length > 0;

      // Step 4: If user has no crops registered for this country, return early with flags
      if (userCropTypeIds.length === 0 || !hasUserRegisteredCropsForCountry) {
        return res.json(
          successRespSync({
            msg: success.FETCH,
            data: {
              crops: [],
              isCropAvailableForCountry: isCropAvailableForCountry,
              hasUserRegisteredCropsForCountry: hasUserRegisteredCropsForCountry
            }
          })
        );
      }

      // Step 5: Build where clause for options (only user's registered crops for this country)
      const whereClause = {
        groupName: 'crop-type',
        id: { [Op.in]: userCropTypeIds }
      };

      // Add country filter if provided
      if (country) {
        whereClause.region = {
          [Op.like]: `%${country}%`
        };
      }

      // Step 6: Fetch crop types efficiently
      const cropTypes = await db.Option.findAll({
        where: whereClause,
        attributes: ['id', 'name', 'userId', 'region', 'countryCode', 'groupName', 'recordId', 'info', 'createdAt', 'updatedAt'],
        raw: true
      });

      // Step 7: Add userId from userfarmcrops to each crop type
      const cropTypesWithUserId = cropTypes.map(cropType => ({
        ...cropType,
        userFarmCropUserId: userId // Add the userId from userfarmcrops
      }));

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            crops: cropTypesWithUserId,
            isCropAvailableForCountry: isCropAvailableForCountry,
            hasUserRegisteredCropsForCountry: hasUserRegisteredCropsForCountry
          }
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

const variety = require('./variety');
const traceability = require('./purchase_traceability');
router.use('/variety', auth, variety);
router.use('/traceability/purchase', auth, traceability);


const batch_traceability = require('./batch_traceability');
router.use('/batch_traceability', auth, batch_traceability);

module.exports = router;
