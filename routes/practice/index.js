const moment = require("moment"),
  express = require("express"),
  router = express.Router(),
  { Op } = require("sequelize"),
  db = require(rootPath + "/models"),
  { isArray, pick, isEmpty, difference } = require("lodash"),
  auth = require(rootPath + "/middleware/auth"),
  translation = require(rootPath + "/middleware/translation"),
  { error, success } = require(rootPath + "/helpers/language"),
  { errorResp, successRespSync, serverError } = require(rootPath +
    "/helpers/api");
const { logErrorOccurred } = require(rootPath + "/helpers/general");

router.use("/activity", auth, translation, require("./activity"));

const includeAssociations = [
  {
    model: db.Crop,
    attributes: ["id", "name"],
    through: { model: db.MapSoilPrepPracticeCrop, attributes: [] },
  },
  {
    model: db.Option,
    attributes: ["id", "name"],
  },

  {
    model: db.UnitsList,
    as: "areaunit",
    attributes: ["id", "name", "abbvr", "unitType", "factor"],
  },
  {
    model: db.Soil_prep_activity,
    as: "soilPrepActivities",
    attributes: ["id", "name"],
    through: { model: db.MapSoilPrepPracticeActivity, attributes: [] },
  },
  {
    model: db.user_farm,
    attributes: ["id", "farmName", "registrationNo"],
    through: { model: db.MapSoilPrepPracticeFarms, attributes: [] },
  },
  {
    model: db.SoilType,
    attributes: ["id", "name"],
    through: { model: db.Soil_prep_practice_soil_type, attributes: [] },
  },

  {
    model: db.Geofence,
    as: "segments",
    attributes: ["id", "geofenceName", "farmId"],
    include: [
      {
        as: "farm",
        model: db.user_farm,
        attributes: ["id", "farmName"],
      },
    ],
  },
  {
    model: db.Equipment,
    attributes: ["id", "displayName"],
    through: { model: db.Soil_prep_practice_equipments, attributes: [] },
  },
  {
    model: db.SoilPrepPracticeCost,
    as: "cost",
    attributes: [
      "totalNumberOfWorkers",
      "totalNumberOfHours",
      "totalCost",
      "currencyId",
    ],
    include: [
      {
        model: db.Currency,
        as: "currency",
      },
    ],
  },
];

/**
 * @swagger
 * /practice:
 *   post:
 *     summary: Create practice
 *     description: Create soil practice with equipments on certain segments
 *     tags: [Practices]
 *     requestBody:
 *       description: Practice details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               geofenceIds:
 *                 type: array
 *                 example: [50, 10]
 *               farmIds:
 *                 type: array
 *                 example: [50, 10]
 *               area:
 *                 type: integer
 *               areaUnitId:
 *                 type: integer
 *                 example: 5
 *               days:
 *                 type: integer
 *               activityId:
 *                 type: integer
 *               soilIds:
 *                 type: array
 *                 example: [50, 10]
 *               startDate:
 *                 type: date
 *               endDate:
 *                 type: date
 *               equipmentIds:
 *                 type: array
 *                 example: [50, 10]
 *               cropId:
 *                 type: integer
 *               cropVariety:
 *                 type: array
 *                 example: [50, 10]
 *     responses:
 *       200:
 *         description: Returns the practice JSON
 *       500:
 *         description: Server error
 */

router.post("/", auth, async function (req, res) {
  let transaction = null;
  try {
    let recordId = req.body.recordId;
    const userId = req.user.id
    let recordCheckRes = [];
    recordCheckRes = await db.Soil_prep_practice.findAll({
      where: { recordId },
    });
    if (recordCheckRes.length > 0) {
      return res.json(
        successRespSync({
          msg: success.PRACTICE_CREATED,
          data: {
            message: "recordId already exists",
          },
        })
      );
    }
    let reqFields = [
      "area",
      "areaUnitId",
      "days",
      "activityIds",
      "soilIds",
      "startDate",
      "endDate",
      "equipmentIds",
    ];
    let msg = null;
    reqFields.forEach(async function (field) {
      if (!req.body[field]) {
        msg = field + " is required";
        return;
      }
    });
    if (!req.body.farmIds && !req.body.geofenceIds) {
      msg = "farmIds or geofenceIds are required";
    }
    if (msg) {
      return res.status(error.code.SERVER_ERROR).json(
        await errorResp({
          msg: msg,
        })
      );
    }

    let arrayfield = ["equipmentIds", "soilIds"];
    arrayfield.forEach(async function (field) {
      if (!isArray(req.body[field])) {
        msg = field + " should be an array!";
      }
    });
    if (req.body.geofenceIds && !isArray(req.body.geofenceIds))
      msg = "geofenceIds should be an array!";
    if (req.body.farmIds && !isArray(req.body.farmIds))
      msg = "farmIds should be an array!";
    if (req.body.cropVariety && !isArray(req.body.cropVariety))
      msg = "cropVariety should be an array!";
    if (msg) {
      return res.status(error.code.SERVER_ERROR).json(
        await errorResp({
          msg: msg,
        })
      );
    }

    if (
      !moment(req.body.startDate).isValid() ||
      !moment(req.body.endDate).isValid()
    ) {
      return res.status(error.code.SERVER_ERROR).json(
        await errorResp({
          msg: "startDate and endDate must be date",
        })
      );
    }

    // if(moment(req.body.startDate).isBefore() || moment(req.body.endDate).isBefore())
    //   return res.status(error.code.SERVER_ERROR).json(await errorResp({
    //     msg: 'startDate and endDate must be in future'
    //   }));

    if (moment(req.body.endDate).isBefore(moment(req.body.startDate)))
      return res.status(error.code.SERVER_ERROR).json(
        await errorResp({
          msg: "endDate must be after startDate",
        })
      );

    transaction = await db.sequelize.transaction();

    let data = {
      area: req.body.area,
      areaUnitId: req.body.areaUnitId,
      days: req.body.days,
      userId: req.user.id,
      activityId: req.body.activityId,
      recordId: req.body.recordId,
      startDate: moment(req.body.startDate).format(),
      endDate: moment(req.body.endDate).format(),
    };
    if (req.body.cropId) data.cropId = req.body.cropId;

    let result = await db.Soil_prep_practice.create(data, { transaction });

    if (req.body.geofenceIds && req.body.geofenceIds.length) {
      const segmentDataPromises = req.body.geofenceIds.map(async (geofenceId) => {
        const segment = await db.Geofence.findOne({
          where: {
            [Op.or]: [{ id: geofenceId }, { recordId: geofenceId }]
          }
        });
        if(segment) {
          return {
            geofenceId: segment.id,
            soil_prep_practiceId: result.id,
          }
        }
      });
      const segmentData = await Promise.all(segmentDataPromises);
      await db.Soil_prep_practice_geofences.bulkCreate(segmentData, {
        transaction,
      });
    }

    if (req.body.farmIds && req.body.farmIds.length) {
      const farmDataPromises = req.body.farmIds.map(async (userFarmId) => {
        const _farm = await db.user_farm.findOne({
          where: {
            [Op.and]: [
              {
                [Op.or]: [
                  { id: userFarmId}, 
                  { recordId: userFarmId }
                ]
              },
              {
                [Op.or]: [
                  { userId: userId }, 
                  { technicianId: userId }
                ]
              },
              { isDeleted: 0 }
            ]
          }
        });
        if(_farm) {
          return {
            userFarmId: _farm.id,
            soil_prep_practiceId: result.id,
          }
        }
      });
      const farmData = await Promise.all(farmDataPromises);
      await db.MapSoilPrepPracticeFarms.bulkCreate(farmData, { transaction });
    }
    if (req.body.activityIds && req.body.activityIds.length) {
      let activityData = [];
      req.body.activityIds.forEach(function (activityId) {
        activityData.push({
          activityId,
          soil_prep_practiceId: result.id,
        });
      });
      await db.MapSoilPrepPracticeActivity.bulkCreate(activityData, {
        transaction,
      });
    }

    if (req.body.cropVariety && req.body.cropVariety.length) {
      let varieties = [];
      req.body.cropVariety.forEach(function (cropId) {
        varieties.push({
          cropId,
          soil_prep_practiceId: result.id,
        });
      });
      await db.MapSoilPrepPracticeCrop.bulkCreate(varieties, { transaction });
    }

    let soilData = [];
    req.body.soilIds.forEach(function (soilTypeId) {
      soilData.push({
        soilTypeId,
        soil_prep_practiceId: result.id,
      });
    });
    await db.Soil_prep_practice_soil_type.bulkCreate(soilData, { transaction });

    let equipmentData = [];
    req.body.equipmentIds.forEach(function (equipmentId) {
      equipmentData.push({
        equipmentId,
        soil_prep_practiceId: result.id,
      });
    });
    await db.Soil_prep_practice_equipments.bulkCreate(equipmentData, {
      transaction,
    });

    if (req.body.cost) {
      let { currencyId, totalNumberOfWorkers, totalNumberOfHours, totalCost } =
        req.body.cost;
      const soilPrepPracticeCost = {
        currencyId,
        totalNumberOfWorkers,
        totalNumberOfHours,
        totalCost,
        soil_prep_practiceId: result.id,
      };
      await db.SoilPrepPracticeCost.create(soilPrepPracticeCost, {
        transaction,
      });
    }

    await transaction.commit();

    let unitRes = await db.UnitsList.findOne({
      where: { id: result.dataValues.areaUnitId },
      raw: true,
    });
    result.dataValues.unitObj = unitRes;
    return res.json(
      successRespSync({
        msg: success.PRACTICE_CREATED,
        data: result,
      })
    );
  } catch (err) {
    if (transaction) transaction.rollback();
    console.log(err)
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /practice:
 *   get:
 *     summary: Get practice list
 *     description: Get the list of practices
 *     tags: [Practices]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: Integer
 *         description: Number of records you want to fetch
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: Integer
 *         description: The number of records to skip before starting to collect the result set
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *         description: ASC | DESC | createdAt
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
 *               example:
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data: {"success":true,"code":200,"message":"Fetched successfully.","data":[{"id":7,"days":30,"area":55,"areaUnitId":5,"userId":17,"startDate":"2022-02-12T20:17:46.000Z","endDate":"2022-09-12T20:17:46.000Z","cropId":9,"activityId":1,"createdAt":"2022-02-09T11:52:30.000Z","updatedAt":"2022-02-09T11:58:44.000Z","Crops":[{"id":39,"countryId":null,"cropTypeOptId":77,"name":"i have a good idea for what i want and want to be able and i don&#x27;t ⚄ the bar and i will call ? ","userId":17,"createdAt":"2021-12-10T11:59:01.000Z","updatedAt":"2021-12-10T11:59:01.000Z","MapSoilPrepPracticeCrop":{"id":3,"cropId":39,"soil_prep_practiceId":7,"createdAt":"2022-02-09T11:52:30.000Z","updatedAt":"2022-02-09T11:52:30.000Z","CropId":39}},{"id":40,"countryId":null,"cropTypeOptId":72,"name":"s. e e. e ehejeh","userId":17,"createdAt":"2021-12-10T12:03:13.000Z","updatedAt":"2021-12-10T12:03:13.000Z","MapSoilPrepPracticeCrop":{"id":4,"cropId":40,"soil_prep_practiceId":7,"createdAt":"2022-02-09T11:52:30.000Z","updatedAt":"2022-02-09T11:52:30.000Z","CropId":40}},{"id":41,"countryId":null,"cropTypeOptId":72,"name":"b and i will be able to send request to him as soon as i possible get ? and in","userId":17,"createdAt":"2021-12-10T12:03:20.000Z","updatedAt":"2021-12-10T12:03:20.000Z","MapSoilPrepPracticeCrop":{"id":5,"cropId":41,"soil_prep_practiceId":7,"createdAt":"2022-02-09T11:58:44.000Z","updatedAt":"2022-02-09T11:58:44.000Z","CropId":41}}],"Option":{"id":9,"name":"calcium","groupName":"fertilizer","userId":null,"createdAt":"2021-09-14T12:10:05.000Z","updatedAt":"2021-09-17T14:20:51.000Z"},"areaunit":{"id":5,"country_id":1,"field":"acre","unit_category_id":1,"unit_subCategory_id":3,"abbreviation":"acre","createdAt":"2021-11-08T11:42:44.000Z","updatedAt":"2021-11-08T11:43:04.000Z"},"user_farms":[],"segments":[{"id":2,"userId":17,"farmId":1,"farmAddress":null,"walkAndMeasure":null,"geofenceName":"Rice Segment","geofenceArea":8000,"geofenceAreaUOMId":1,"geofenceParameter":9000,"geofenceParameterUOMId":1,"createdAt":"2021-10-08T07:38:14.000Z","updatedAt":"2021-10-08T11:37:09.000Z","Soil_prep_practice_geofences":{"geofenceId":2,"soil_prep_practiceId":7,"createdAt":"2022-02-09T11:52:30.000Z","updatedAt":"2022-02-09T11:52:30.000Z"},"farm":{"id":1,"userId":17,"address":"Nainital, uttarakhand","district":0,"farmingGoalOptId":1,"zipCode":"","farmName":"corbett farm","registrationNo":"23423492343899883","ownerName":"","communityName":"","lat":0.9999999999,"log":0.9999999999,"farmingActivity":"","farmOwnershipType":"community","parameter":0,"area":3.372,"isPrimaryFarm":false,"isDeleted":false,"createdAt":"2021-10-05T14:27:20.000Z","updatedAt":"2021-11-02T04:37:58.000Z"}},{"id":5,"userId":17,"farmId":2,"farmAddress":null,"walkAndMeasure":null,"geofenceName":"Wheat Segment","geofenceArea":800,"geofenceAreaUOMId":1,"geofenceParameter":900,"geofenceParameterUOMId":1,"createdAt":"2021-10-08T10:39:42.000Z","updatedAt":"2021-10-18T18:42:50.000Z","Soil_prep_practice_geofences":{"geofenceId":5,"soil_prep_practiceId":7,"createdAt":"2022-02-09T11:52:30.000Z","updatedAt":"2022-02-09T11:52:30.000Z"},"farm":{"id":2,"userId":17,"address":"Nainital, uttarakhand","district":null,"farmingGoalOptId":null,"zipCode":null,"farmName":"Corbet Farmers","registrationNo":"sdfjdskfo233423","ownerName":null,"communityName":null,"lat":0.9999999999,"log":0.9999999999,"farmingActivity":null,"farmOwnershipType":"personal","parameter":null,"area":125.3,"isPrimaryFarm":null,"isDeleted":true,"createdAt":"2021-10-13T10:27:20.000Z","updatedAt":"2021-10-22T11:17:45.000Z"}}],"Equipment":[{"id":1,"displayName":"My equipment Updated","userID":17,"group":1,"category":2,"activity":2,"equipmentName":2,"identificationNumber":"ID-12938","serialNumber":"Serial-123","modelOrBrand":"Dimitra Inc","yearOfManufacture":2001,"yearOfPurchase":2002,"modeOfOperation":1,"quantity":3,"fuelType":"Diesel","energyConsumption":"123","loanStatus":"No_loan","createdAt":"2021-12-12T09:45:00.000Z","updatedAt":"2021-12-12T09:45:29.000Z","Soil_prep_practice_equipments":{"equipmentId":1,"soil_prep_practiceId":7,"createdAt":"2022-02-09T11:52:30.000Z","updatedAt":"2022-02-09T11:52:30.000Z"}},{"id":2,"displayName":"My second equipment","userID":17,"group":1,"category":2,"activity":2,"equipmentName":2,"identificationNumber":"cjjfjj","serialNumber":"hxchj","modelOrBrand":"yfuudud","yearOfManufacture":2015,"yearOfPurchase":2015,"modeOfOperation":1,"quantity":1,"fuelType":"Coal_Wood","energyConsumption":null,"loanStatus":"Uncleared","createdAt":"2021-12-12T09:46:07.000Z","updatedAt":"2021-12-12T09:46:07.000Z","Soil_prep_practice_equipments":{"equipmentId":2,"soil_prep_practiceId":7,"createdAt":"2022-02-09T11:52:30.000Z","updatedAt":"2022-02-09T11:52:30.000Z"}}],"Soil_prep_activity":{"id":1,"name":"Clearing of land","createdAt":"2022-02-02T09:23:58.000Z","updatedAt":"2022-02-02T09:23:58.000Z"},"SoilTypes":[{"image":"https://dimitra-private.s3.amazonaws.com/Soil/20211218145343Sandysoil.png?AWSAccessKeyId=AKIAXGW3CQWTHR7ULTTY&Expires=1644408970&Signature=FlTET906PnqGhr22SqmpZnjMEC4%3D","id":3,"name":"Sandy soil","imageS3Key":"Soil/20211218145343Sandysoil.png","createdAt":"2022-02-08T11:18:52.000Z","updatedAt":"2022-02-08T11:18:52.000Z","Soil_prep_practice_soil_type":{"id":2,"soilTypeId":3,"soil_prep_practiceId":7,"createdAt":"2022-02-09T11:52:30.000Z","updatedAt":"2022-02-09T11:52:30.000Z","SoilTypeId":3}}]}]}
 *
 *       500:
 *         description: Server error
 */

router.get("/", auth, translation, async (req, res) => {
  try {
    let { id: userId } = req.user;
    let { page = 1, limit = 10, col = "id", sort = "ASC" } = req.query;
    limit = parseInt(limit);

    let soilPrepPracticeList = await db.Soil_prep_practice.findAndCountAll({
      attributes: {
        exclude: ["userId"],
      },
      where: {
        userId,
      },
      offset: (page - 1) * limit,
      limit: limit,
      distinct: true,
      order: [[col, sort]],
      include: includeAssociations,
    });

    if (req.headers.lang && req.headers.lang != "en") {
      soilPrepPracticeList.rows = req.translateFunction(soilPrepPracticeList.rows, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
        moduleName: "land/soil/list",
      });
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: soilPrepPracticeList,
      })
    );
  } catch (error) {
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /practice/{id}:
 *   delete:
 *     summary: Delete practice
 *     description: Delete soil practice by id
 *     tags: [Practices]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: Integer
 *         description: Practice id
 *     responses:
 *       200:
 *         description: Returns the practice JSON
 *       500:
 *         description: Server error
 */
router.delete("/:id", auth, async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    await db.SoilPrepPracticeCost.destroy(
      { where: { soil_prep_practiceId: req.params.id } },
      {
        transaction,
      }
    );
    await db.Soil_prep_practice.destroy(
      {
        where: {
          userId: req.user.id,
          id: req.params.id,
        },
      },
      {
        transaction,
      }
    );

    await transaction.commit();
    return res.json(
      successRespSync({
        msg: success.PRACTICE_DELETED,
        data: {},
      })
    );
  } catch (error) {
    console.log(error);
    await transaction?.rollback();
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /practice/{id}:
 *   put:
 *     summary: Update practice
 *     description: Update soil practice with equipments on certain segments
 *     tags: [Practices]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: soil practice id
 *     requestBody:
 *       description: Practice details and it's id
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               geofenceIds:
 *                 type: array
 *                 example: [50, 10]
 *               farmIds:
 *                 type: array
 *                 example: [10, 50]
 *               area:
 *                 type: integer
 *               areaUnitId:
 *                 type: integer
 *                 example: 5
 *               days:
 *                 type: integer
 *               activityId:
 *                 type: integer
 *               soilIds:
 *                 type: array
 *               startDate:
 *                 type: date
 *               endDate:
 *                 type: date
 *               equipmentIds:
 *                 type: array
 *                 example: [50, 10]
 *               cropId:
 *                 type: integer
 *               cropVariety:
 *                 type: array
 *     responses:
 *       200:
 *         description: Returns the practice JSON
 *       500:
 *         description: Server error
 */

router.put("/:id", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    let {
      area,
      areaUnitId,
      activityIds = [],
      geofenceIds= [],
      startDate,
      endDate,
      days,
      cropId,
      soilIds = [],
      equipmentIds = [],
      cropVariety = [],
      farmIds = [],
      cost,
      recordId,
    } = req.body;

    if (startDate && endDate && moment(endDate).isBefore(moment(startDate))) {
      return res.status(error.code.SERVER_ERROR).json(
        await errorResp({
          msg: "endDate must be after startDate",
        })
      );
    }

    const transaction = await db.sequelize.transaction();

    try {
      const set = {
        area,
        areaUnitId,
        startDate,
        endDate,
        days,
        cropId,
        recordId,
      };

      Object.keys(set).forEach((key) => {
        set[key] == undefined || set[key] == null || set[key] == ""
          ? delete set[key]
          : {};
      });

      await db.Soil_prep_practice.update(set, {
        where: { id },
        transaction,
      });

      if (farmIds && farmIds.length) {
        const farmDataPromises = farmIds.map(async (userFarmId) => {
          const _farm = await db.user_farm.findOne({
            where: {
              [Op.and]: [
                {
                  [Op.or]: [
                    { id: userFarmId}, 
                    { recordId: userFarmId }
                  ]
                },
                {
                  [Op.or]: [
                    { userId: userId }, 
                    { technicianId: userId }
                  ]
                },
                { isDeleted: 0 }
              ]
            }
          });
          if(_farm) {
            return {
              userFarmId: _farm.id,
              soil_prep_practiceId: id,
            }
          }
        });
        const farmData = await Promise.all(farmDataPromises);
        await db.MapSoilPrepPracticeFarms.bulkCreate(farmData, {
          transaction,
        });
      }

      if (cropVariety && cropVariety.length) {
        cropVariety = [...new Set(cropVariety)];
        await db.MapSoilPrepPracticeCrop.destroy({
          where: {
            soil_prep_practiceId: id,
          },
          transaction: transaction,
        });
        let varietyData = cropVariety.map((cropId) => {
          return { cropId, soil_prep_practiceId: id };
        });
        await db.MapSoilPrepPracticeCrop.bulkCreate(varietyData, {
          transaction,
        });
      }

      if (geofenceIds && geofenceIds.length) {
        const segmentDataPromises = geofenceIds.map(async (geofenceId) => {
          const segment = await db.Geofence.findOne({
            where: {
              [Op.or]: [{ id: geofenceId }, { recordId: geofenceId }]
            }
          });
          if(segment) {
            return {
              geofenceId: segment.id,
              soil_prep_practiceId: id,
            }
          }
        });
        const segmentData = await Promise.all(segmentDataPromises);
        await db.Soil_prep_practice_geofences.bulkCreate(segmentData, {
          transaction,
        });
      }

      if (soilIds && soilIds.length) {
        soilIds = [...new Set(soilIds)];
        await db.Soil_prep_practice_soil_type.destroy({
          where: {
            soil_prep_practiceId: id,
          },
          transaction: transaction,
        });

        let soilData = soilIds.map((soilTypeId) => {
          return { soilTypeId, soil_prep_practiceId: id };
        });
        await db.Soil_prep_practice_soil_type.bulkCreate(soilData, {
          transaction,
        });
      }

      if (equipmentIds && equipmentIds.length) {
        equipmentIds = [...new Set(equipmentIds)];
        await db.Soil_prep_practice_equipments.destroy({
          where: {
            soil_prep_practiceId: id,
          },
          transaction: transaction,
        });

        let equipmentData = equipmentIds.map((equipmentId) => {
          return { equipmentId, soil_prep_practiceId: id };
        });
        await db.Soil_prep_practice_equipments.bulkCreate(equipmentData, {
          transaction,
        });
      }

      if (activityIds && activityIds.length) {
        activityIds = [...new Set(activityIds)];
        await db.MapSoilPrepPracticeActivity.destroy({
          where: {
            soil_prep_practiceId: id,
          },
          transaction: transaction,
        });

        let activityData = activityIds.map(function (activityId) {
          return { activityId, soil_prep_practiceId: id };
        });
        await db.MapSoilPrepPracticeActivity.bulkCreate(activityData, {
          transaction,
        });
      }

      if (cost) {
        await db.SoilPrepPracticeCost.destroy(
          { where: { soil_prep_practiceId: id } },
          {
            transaction,
          }
        );
        let {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
        } = req.body.cost;
        const soilPrepPracticeCost = {
          currencyId,
          totalNumberOfWorkers,
          totalNumberOfHours,
          totalCost,
          soil_prep_practiceId: id,
        };
        await db.SoilPrepPracticeCost.create(soilPrepPracticeCost, {
          transaction,
        });
      }

      await transaction.commit();

      const practice = await db.Soil_prep_practice.findOne({
        attributes: {
          exclude: ["userId"],
        },
        where: { id, userId },
        include: includeAssociations,
      });
      return res.json(
        successRespSync({
          msg: success.PRACTICE_UPDATED,
          data: practice,
        })
      );
    } catch (error) {
      await transaction?.rollback();
      logErrorOccurred(__filename, error);
      return serverError(res, error);
    }
  } catch (error) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
