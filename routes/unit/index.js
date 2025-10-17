const express = require('express');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const { serverError, successRespSync } = require(rootPath + '/helpers/api');
const { success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');

/**
 * @swagger
 * /unit/cat:
 *   get:
 *     summary: Get unit list
 *     description: Get the list of units
 *     tags: [Unit]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: type of the unit (area)
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: type of the unit category (herbicide | herbiciderate)
 *     responses:
 *       200:
 *         description: Returns the list of units
 *       500:
 *         description: Server error
 */
router.get('/cat', auth, async (req, res) => {
  const field = req.query.name ? req.query.trim() : null;
  let query = {};
  if (notEmpty(field)) {
    query.where = { field: unitType };
  }
  if (req.query.category) {
    query.where = query.where || {};
    if (req.query.category == 'herbicide') query.where.unit_category_id = 2;
    if (req.query.category == 'herbiciderate') query.where.unit_category_id = 3;
  }

  const units = await db.Unit.findAll(query);
  return res.json(
    successRespSync({
      msg: success.FETCH,
      data: units,
    })
  );
});

/**
 * @swagger
 * /unit:
 *   get:
 *     summary: Get unit list
 *     description: Get the list of units
 *     tags: [Unit]
 *     parameters:
 *       - in: header
 *         name: oauth-token
 *         required: true
 *         schema:
 *           type: string
 *         description: authorization token
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: type of the unit (area)
 *     responses:
 *       200:
 *         description: Returns the list of units
 *       500:
 *         description: Server error
 */
router.get('/', auth, translation, async (req, res) => {
  
  const unitType = req.query?.name?.trim();
  let query = {
    include: [
      {
        model: db.UnitsList,
        as: 'units',
      },
    ],
  };
  if (notEmpty(unitType)) {
    query.where = { name: unitType };
  }
  const units = await db.UnitTypes.findAll(query);
  if (req.headers.lang && req.headers.lang != 'en') {
    req.translateFunction(units, globalTranslationCache, {
      moduleName: 'unit',
      lvl1: false,
      lvl2: true,
    });
  }
  return res.json(
    successRespSync({
      msg: success.FETCH,
      data: units,
    })
  );
});

/**
 * @swagger
 * /unit/user:
 *   get:
 *     summary: Fetch unit configuration of the users
 *     description: Fetch unit configuration of the users
 *     tags: [Unit]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
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
 *               example:
 *                success: true
 *                code: 200
 *                message: Fetched successfully.
 *                data:
 *                  BulkDensity:
 *                    unitTypeId: 37
 *                    unitId: 120
 *                    name: kg/ml
 *                    abbvr: kg/ml
 *                    factor: '1000.0000000000'
 */
router.get('/user', auth, translation, async (req, res) => {
  const units = await db.UnitTypes.findAll({
    include: [
      {
        model: db.UserUnitConfiguration,
        as: 'units_user',
        where: { userId: req.user.id },
        include: {
          model: db.UnitsList,
          as: 'user_config_unit',
        },
      },
    ],
  });
  let userConfiguredUnits = {};
  units.forEach(
    (unit) =>
      (userConfiguredUnits[unit.name] = {
        unitTypeId: unit.id,
        unitId: unit.units_user[0].unitId,
        name: unit.units_user[0].user_config_unit.name,
        abbvr: unit.units_user[0].user_config_unit.abbvr,
        factor: unit.units_user[0].user_config_unit.factor,
      })
  );
  if (req.headers.lang && req.headers.lang != 'en') {
    req.translateFunction(userConfiguredUnits, globalTranslationCache, {
      moduleName: 'unit/user',
      lvl1: true,
      lvl2: true,
    });
  }
  return res.json(
    successRespSync({
      msg: success.FETCH,
      data: userConfiguredUnits,
    })
  );
});

/**
 * @swagger
 * /unit/user:
 *   post:
 *     summary: Set unit configuration of the user
 *     description: Set unit configuration of the user
 *     tags: [Unit]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     requestBody:
 *       description: Set unit configuration of the user
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                units:
 *                  type: array
 *                  items:
 *                   type: object
 *                   properties:
 *                    unitTypeId:
 *                      type: integer
 *                    unitId:
 *                      type: integer
 *              example:
 *                units:
 *                  - unitTypeId: 37
 *                    unitId: 120
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
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Configuration are saved successfully.
 *                  data:
 */
router.post('/user', auth, async (req, res) => {
  try {
    const { units } = req.body;
    let data = [];
    units.forEach((unit) =>
      data.push({
        unitType: unit.unitTypeId,
        unitId: unit.unitId,
        userId: req.user.id,
      })
    );
    await db.UserUnitConfiguration.bulkCreate(data, {
      updateOnDuplicate: ['unitId'],
    });
    return res.json(
      successRespSync({
        msg: success.CONFIGURATION_SAVED,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /unit/configure:
 *   get:
 *     summary: Fetch unit configuration
 *     description: Fetch unit configuration
 *     tags: [Unit]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
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
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Fetched successfully.
 *                  data:
 *                    - category: measurement
 *                      subCategory: area
 *                      unit:
 *                        id: 5
 *                        name: acre
 *                        abbreviation: acre
 */
router.get('/configure', auth, async (req, res) => {
  try {
    // require helper controller functions
    const unitConfiguration = require(rootPath + '/helpers/controller');
    let response = await unitConfiguration.getUserUnitConfigurations(req);

    // send response to client
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: response,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /unit/configure:
 *   post:
 *     summary: Set unit configuration
 *     description: Set unit configuration
 *     tags: [Unit]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *     requestBody:
 *       description: Set unit configuration of the user
 *       required: true
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                units:
 *                  type: array
 *                  items:
 *                     type: integer
 *              example:
 *                units:
 *                  - 5
 *                  - 9
 *                  - 6
 *                  - 15
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
 *               example:
 *                  success: true
 *                  code: 200
 *                  message: Configuration are saved successfully.
 *                  data:
 *                    - category: measurement
 *                      subCategory: area
 *                      unit:
 *                        id: 5
 *                        name: acre
 *                        abbreviation: acre
 */
router.post('/configure', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    let { units } = req.body;

    // remove duplicates if there
    units = [...new Set(units)];

    // fetch data of the units
    const data = await db.Unit.findAll({
      attributes: [
        ['id', 'unit_id'],
        'unit_category_id',
        'unit_subCategory_id',
      ],
      where: { id: units },
      raw: true,
    });

    // add user id with the array of object
    const set = data.map((data) => {
      return { userId, ...data };
    });

    // fetch data of the units from the unit table
    let userConfig = await db.UnitConfiguration.findAll({
      attributes: [
        'userId',
        'unit_id',
        'unit_category_id',
        'unit_subCategory_id',
      ],
      where: { userId },
      raw: true,
    });

    // update/insert configuration of the user/ create
    for (let config of set) {
      // check if the category or subcategory id is not 0
      if (config.unit_category_id == 0 || config.unit_subCategory_id == 0) {
        throw new Error(
          'invalid unit id. category and subcategory id should not be 0'
        );
      }

      // if the value exist then delete previous value
      userConfig.forEach((el, index) => {
        if (
          config.unit_category_id == el.unit_category_id &&
          config.unit_subCategory_id == el.unit_subCategory_id
        ) {
          // delete the repeated object with index
          userConfig.splice(index, 1);
        }
      });

      // insert into array if not present only if not 0
      if (config.unit_category_id != 0 && config.unit_subCategory_id != 0) {
        userConfig.push(config);
      }
    }

    // start transaction
    const transaction = await db.sequelize.transaction();

    try {
      // destroy user old unit configuration
      await db.UnitConfiguration.destroy({
        where: { userId },
        transaction,
      });
      // insert user unit configuration
      const result = await db.UnitConfiguration.bulkCreate(userConfig, {
        transaction,
      });

      // commit transaction
      await transaction.commit();

      // fetch the configured unit of the users and send it in response
      // require helper controller functions
      const unitConfiguration = require(rootPath + '/helpers/controller');
      const response = await unitConfiguration.getUserUnitConfigurations(req);

      // send response to client
      return res.json(
        successRespSync({
          msg: success.CONFIGURATION_SAVED,
          data: response,
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
});

module.exports = router;
