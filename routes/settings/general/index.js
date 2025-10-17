const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const validateSettings = require(rootPath + "/helpers/validators/settings");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const {
  countries,
} = require("../../../scripts/updateUserCountry/countiresIso");
const translation = require(rootPath + '/middleware/translation');

/**
 * @swagger
 * /settings/general:
 *   get:
 *     description: Fetch general settings of the user
 *     tags: [Settings - General]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "preferredMapView": "Default", "preferredCountry": "india", "preferredState": "punjab", "preferredDistrict": "mohali", "preferredCity": "mohali", "units": [ { "id": 1, "name": "Weight", "label": "Weight", "userSelectedUnit": null, "units": [ { "id": 1, "name": "Gram", "abbvr": "gm", "factor": null }, { "id": 2, "name": "Kilogram", "abbvr": "kg", "factor": "1000.0000000000" }, { "id": 3, "name": "Pound", "abbvr": "lb", "factor": "453.5920000000" } ] } ] } }
 *
 */
router.get("/", auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    let result = await getUsersGeneralSetting(userId);
    if (req.headers.lang && req.headers.lang != 'en') {
      let translateResult =  req.translateFunction(result.units, globalTranslationCache, {
        lvl1: true,
        lvl2: true,
        module: "settings/general",
        isArray: true
      })
      const excludeUnit = {units, ...data} = { ...result }
      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            ...excludeUnit,
            units: translateResult
          },
        })
      )
    }

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
});

/**
 * @swagger
 * /settings/general:
 *   put:
 *     description: save general settings of the user
 *     tags: [Settings - General]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MTd9LCJpYXQiOjE2NDg1NTAxNzYsImV4cCI6MTY0ODYxMDE3Nn0.tacCMSuqGtBnSqoieFkc2J3bXKUQqwxPRvbR25lM5IA'
 *     requestBody:
 *         content:
 *             application/json:
 *                 example: { "units": [ { "unitTypeId": 37, "unitId": 120 } ], "preferredMapView": "Satellite", "preferredCountry": "india", "preferredState": "punjab", "preferredDistrict": "mohali", "preferredCity": "mohali" }
 *                 schema:
 *                     type: object
 *                     properties:
 *                         units:
 *                             type: array
 *                             items:
 *                                 type: object
 *                                 properties:
 *                                     unitTypeId:
 *                                         type: integer
 *                                     unitId:
 *                                         type: integer
 *                         preferredMapView:
 *                             type: string
 *                             enum: ['Default', 'Satellite', 'Terrain']
 *                         preferredCountry:
 *                             type: string
 *                         preferredState:
 *                             type: string
 *                         preferredDistrict:
 *                             type: string
 *                         preferredCity:
 *                             type: string
 *     responses:
 *       200:
 *         description: On success response if data is present.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   success:
 *                     type: boolean
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *               example: { "success": true, "code": 200, "message": "saved successfully.", "data": { "preferredMapView": "Default", "preferredCountry": "india", "preferredState": "punjab", "preferredDistrict": "mohali", "preferredCity": "mohali", "units": [ { "id": 1, "name": "Weight", "label": "Weight", "userSelectedUnit": null, "units": [ { "id": 1, "name": "Gram", "abbvr": "gm", "factor": null }, { "id": 2, "name": "Kilogram", "abbvr": "kg", "factor": "1000.0000000000" }, { "id": 3, "name": "Pound", "abbvr": "lb", "factor": "453.5920000000" } ] } ] } }
 *
 */
router.put(
  "/",
  auth,
  // validateSettings.generalSettingCreate(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const {
        units,
        preferredMapView,
        preferredCountry,
        preferredCountryIsoCode,
        preferredState,
        preferredDistrict,
        preferredCity,
      } = req.body;

      var transaction = await db.sequelize.transaction();

      const country = countries.find(
        (item) => item.code === preferredCountryIsoCode
      );
      
      const setUserUpdate = {
        ...(preferredCountry && { countryId: preferredCountry }),
        ...(country?.name && { country: country?.name }),
        ...(preferredCountryIsoCode && { countryIsoCode: preferredCountryIsoCode }),
        ...(preferredState && { stateId: preferredState }),
        ...(preferredCity && { city: preferredCity }),
        ...(preferredDistrict && { district: preferredDistrict }),
      };
      let updateString = ''
      Object.keys(setUserUpdate).forEach(el => {
        updateString += `${el} = '${setUserUpdate[el]}',`
      })

      if(Object.values(setUserUpdate).filter(el => el).length > 0) {
        await db.user.update(setUserUpdate, { where: { id: userId } }, {transaction});
      }


      const setUnit =
        units?.map(({ unitTypeId: unitType, unitId }) => ({
          userId,
          unitType,
          unitId,
        })) || [];
      await db.UserUnitConfiguration.bulkCreate(setUnit, {
        updateOnDuplicate: ["unitId"],
        transaction,
      });

      const setPreferences = {
        userId,
        preferredMapView,
        preferredCountry,
        preferredState,
        preferredDistrict,
        preferredCity,
        preferredCountryIsoCode,
      };

  

      const [instance, created] = await db.UserGeneralSetting.upsert(
        setPreferences,
        {
          fields: [
            "preferredMapView",
            "preferredCountry",
            "preferredState",
            "preferredDistrict",
            "preferredCity",
            "preferredCountryIsoCode",
          ],
          transaction,
        }
      );

      await transaction.commit();

      const result = await getUsersGeneralSetting(userId);

      return res.json(
        successRespSync({
          msg: success.SAVED,
          data: result,
        })
      );
    } catch (err) {
     await transaction?.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @description get user general settings
 * @param {*} userId
 * @returns object
 */
async function getUsersGeneralSetting(userId) {
  let units = await db.UnitTypes.findAll({
    attributes: ["id", "name", "label"],
    include: [
      {
        required: false,
        model: db.UserUnitConfiguration,
        as: "userSelectedUnit",
        where: { userId },
        attributes: ["unitType", "unitId"],
      },
      {
        model: db.UnitsList,
        as: "units",
        attributes: ["id", "name", "abbvr", "factor"],
      },
    ],
  });
  const settings = await db.UserGeneralSetting.findOne({
    raw: true,
    attributes: { exclude: ["id", "userId", "createdAt", "updatedAt"] },
    where: { userId },
  });

  return { ...settings, units };
}

module.exports = router;
