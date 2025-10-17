const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const db = require(rootPath + '/models');
const { serverError, successRespSync, errorRespSync } = require(rootPath + '/helpers/api');
const { error, success } = require(rootPath + '/helpers/language');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const { equipmentValidator } = require(rootPath +
  '/helpers/validators/equipment');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const {
  validateEquipmentPayloadDataExistsInDB,
  getUserFarmData,
  validateFarmsAndSegmentsPayloadData,
  addEquipmentToFarm,
  addEquipmentToFarmSegment,
  addEquipmentActivityToEquipment,
  updateEquipmentActivityToEquipment,
  checkIfEquipmentNameExistsInDB,
  validateActivityBelongsToCategoryInDB,
} = require('./utils');

/**
 * @desc fetch equipments of user
 */
/**
 * @swagger
 * /equipments:
 *   get:
 *     summary: API for fetching equipments of user.
 *     description: API for fetching equipments of user.
 *     tags: [Equipment]
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
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *         description: asc | desc
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *         description: set | single
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of equipment category
 *       - in: query
 *         name: activity
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of equipment activity
 *       - in: query
 *         name: modeOfOperation
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of equipment's mode of operation
 *       - in: query
 *         name: farm
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of farm
 *       - in: query
 *         name: segment
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of segment
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
 *                 example: {"success": true,"code": 200,"message": "Fetched successfully.","data": [{"id": 103,"displayName": "Tractor 1","userID": 171,"group": null,"category": 2,"activity": 2,"equipmentName": 2,"identificationNumber": null,"serialNumber": null,"modelOrBrand": null,"yearOfManufacture": null,"yearOfPurchase": null,"modeOfOperation": null,"quantity": 1,"fuelType": null,"energyConsumption": null,"loanStatus": null,"equipmentType": "single","createdAt": "2022-02-16T05:20:21.000Z","updatedAt": "2022-02-16T05:20:21.000Z","EquipmentGroup": null,"equipment_mode_of_operation": null,"equipment_category": {"id": 2,"name": "Crop production equipment","createdAt": "2021-12-06T16:40:31.000Z","updatedAt": "2021-12-06T16:40:31.000Z"},"equipment_activity": {"id": 2,"name": "Land preparation","category": 2,"createdAt": "2021-12-06T16:40:31.000Z","updatedAt": "2021-12-06T16:40:31.000Z"},"equipment_name": {"id": 2,"name": "Muttock"},"equipment_farm": [],"equipment_geoFence": []}]}
 */

router.get('/', auth, translation, async (req, res) => {
  try {
    let {
      page,
      limit,
      order,
      type,
      category,
      activity,
      group,
      modeOfOperation,
      farm,
      segment,
    } = req.query;
    let where = {
      userID: req.user.id,
    };
    let orderBy = [['createdAt', 'DESC']];
    if (notEmpty(order)) {
      orderBy =
        order === 'asc' ? [['displayName', 'ASC']] : [['displayName', 'DESC']];
    }
    if (notEmpty(type) && ['set', 'single'].includes(type)) {
      const typeFilter = {};
      type === 'set' ? (typeFilter[Op.gt] = 1) : (typeFilter[Op.lt] = 2);
      where.quantity = typeFilter;
    }
    let equipmentWithFarmIds = [];
    let segmentWithFarmIds = [];
    if (notEmpty(farm)) {
      const equipmentWithFarm = await db.Equipment.findAll({
        where,
        raw: true,
        include: [
          { model: db.EquipmentGroup },
          {
            model: db.user_farm,
            as: 'equipment_farm',
            required: true,
            through: {
              model: db.EquipmentUserFarm,
              attributes: [],
              where: { farmID: farm.split('-') },
            },
            attributes: ['id', 'farmName'],
          },
        ],
      });
      equipmentWithFarmIds = equipmentWithFarm.map((item) => item.id);
    }
    if (notEmpty(segment)) {
      const segmentWithFarm = await db.Equipment.findAll({
        where,
        raw: true,
        include: [
          { model: db.EquipmentGroup },
          {
            model: db.Geofence,
            as: 'equipment_geoFence',
            required: true,
            attributes: ['id', 'geofenceName'],
            through: {
              model: db.EquipmentUserSegment,
              attributes: [],
              where: { geoFenceID: segment.split('-') },
            },
          },
        ],
      });
      segmentWithFarmIds = segmentWithFarm.map((item) => item.id);
    }

    if (notEmpty(farm) || notEmpty(segment)) {
      where.id = [...new Set(equipmentWithFarmIds.concat(segmentWithFarmIds))];
    }

    if (notEmpty(category)) {
      where.category = category.split('-');
    }
    if (notEmpty(activity)) {
      where.activity = activity.split('-');
    }
    if (notEmpty(group)) {
      where.group = group.split('-');
    }
    if (notEmpty(modeOfOperation)) {
      where.modeOfOperation = modeOfOperation.split('-');
    }
    let query = {
      where,
      order: orderBy,
      include: [
        { model: db.Option, as: 'fuel_type', attributes: ['id', 'name'] },
        { model: db.Option, as: 'loan_status', attributes: ['id', 'name'] },
        { model: db.Option, as: 'equipment_type', attributes: ['id', 'name'] },
        { model: db.EquipmentGroup },
        {
          model: db.EquipmentModeOfOperation,
          as: 'equipment_mode_of_operation',
        },
        {
          model: db.EquipmentCategory,
          as: 'equipment_category',
        },
        {
          model: db.EquipmentActivity,
          as: 'equipment_equipment_activity',
          attributes:['id', 'name'],
          through:{
            model: db.EquipmentEquipmentActivity
          }
        },
        {
          model: db.EquipmentFuelRecord,
          as: 'equipment_fuel_records',
          attributes: ['record_date', 'fuel_unit', 'fuel_amount']
        },
        {
          model: db.EquipmentName,
          as: 'equipment_name',
          attributes: ['id', 'name'],
        },
        {
          model: db.user_farm,
          as: 'equipment_farm',
          through: { model: db.EquipmentUserFarm, attributes: [] },
          attributes: ['id', 'farmName'],
        },
        {
          model: db.Geofence,
          as: 'equipment_geoFence',
          attributes: ['id', 'geofenceName'],
          through: { model: db.EquipmentUserSegment, attributes: [] },
        },
      ],
    };
    if (notEmpty(page) && notEmpty(limit)) {
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    let equipments = await db.Equipment.findAll(query);

    equipments = req.translateFunction(equipments, globalTranslationCache, {
      lvl1: true,
      lvl2: true,
      moduleName: 'equipments',
    });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: equipments,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @desc add new equipment
 */
/**
 * @swagger
 * /equipments:
 *   post:
 *     summary: API for adding new equipment.
 *     description: API for adding new equipment.
 *     tags: [Equipment]
 *     requestBody:
 *       description: API for adding new equipment
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"farm":[1],"segment":[2],"displayName":"test","category":2,"activity":2,"group":3,"modeOfOperation":2,"equipmentName":2,"identificationNumber":"58","serialNumber":343,"modelOrBrand":"gh200","yearOfManufacture":2012,"yearOfPurchase":2012,"quantity":2,"fuelType":"Petrol","energyConsumption":22,"loanStatus":"Cleared","isDefault":1,"equipmentType":"set"}
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
 *                 example: {"success": true,"code": 200,"message": "Equipment is added successfully.","data": {"id": 119,"displayName": "testone","category": 2,"activity": 2,"group": 3,"modeOfOperation": 2,"equipmentName": 2,"identificationNumber": "58","serialNumber": 343,"modelOrBrand": "gh200","yearOfManufacture": 2012,"yearOfPurchase": 2012,"quantity": 2,"fuelType": "Petrol","energyConsumption": 22,"loanStatus": "Cleared","equipmentType": "set","userID": 171,"updatedAt": "2022-03-12T14:34:24.382Z","createdAt": "2022-03-12T14:34:24.382Z"}}
 */

router.post(
  '/',
  auth,
  equipmentValidator(),
  validationErrorHandler,
  async (req, res) => {
    let { farm, segment, ...equipmentData } = { ...req.body };
    let equipment = Object.fromEntries(
      Object.entries(equipmentData).filter(([_, v]) => v)
    );
    equipment['userID'] = req.user.id;
    // Validate display name to be unique
    const entryExists = await db.Equipment.findOne({
      where: {
        userID: equipment.userID,
        displayName: equipment.displayName,
      },
    });
    if (entryExists !== null) {
      return res.json(
        errorRespSync({
          code: error.code.CONFLICT,
          msg: error.EQUIPMENT_EXISTS,
          data: entryExists,
        })
      );
    }
    const t = await db.sequelize.transaction();
    try {
      // Check if activity belongs in provided category
      if (equipment?.category || equipment?.activityIds?.length) {
        await validateActivityBelongsToCategoryInDB(equipment, res);
      }
      // Check if equipment name exists
      //await checkIfEquipmentNameExistsInDB(equipment, res);
      // Check if group exists, energy consumption and
      // mode of operation exist andbelongs to user
      await validateEquipmentPayloadDataExistsInDB(equipment, res);
      if (segment?.length) {
        await validateFarmsAndSegmentsPayloadData(segment, farm, res);
      }

      const userFarms = await getUserFarmData();
      const {activityIds, ...equipmentRest} = equipment

      //  Equipment Data
      const equipmentData = await db.Equipment.create(equipmentRest, {
        transaction: t,
      });
      if(activityIds?.length){
        await addEquipmentActivityToEquipment(activityIds, equipmentData, t)
      }
      // Equipment belongs to a farm
      if (farm?.length) {
        await addEquipmentToFarm(userFarms, farm, res, t, equipmentData.id);
      }
      // Equipment belong to a farm segment
      if (segment?.length) {
        await addEquipmentToFarmSegment(
          userFarms,
          segment,
          res,
          t,
          equipmentData.id
        );
      }
      await t.commit();
      return res.json(
        successRespSync({
          msg: success.EQUIPMENT_ADDED,
          data: equipmentData,
        })
      );
    } catch (err) {
      await t?.rollback();
      logErrorOccurred(__filename, err);
      if (err?.msg && err?.customValidationError) {
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: err.msg,
          })
        );
      }
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        const msg = `Foreign key constraint failed for ${JSON.stringify(
          err.fields
        )}`;
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg,
          })
        );
      }
      return serverError(res, err);
    }
  }
);

/**
 * @desc add new equipment
 */
/**
 * @swagger
 * /equipments/{id}:
 *   put:
 *     summary: API for updating equipment.
 *     description: API for updating equipment.
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of equipment
 *     requestBody:
 *       description: API for updating equipment
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *            example: {"farm":[1],"segment":[2],"displayName":"test","category":2,"activity":2,"group":3,"modeOfOperation":2,"equipmentName":2,"identificationNumber":"58","serialNumber":343,"modelOrBrand":"gh200","yearOfManufacture":2012,"yearOfPurchase":2012,"quantity":2,"fuelType":"Petrol","energyConsumption":22,"loanStatus":"Cleared","isDefault":1,"equipmentType":"set"}
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
 *                 example: { "success": true,"code": 200,"message": "Equipment is updated successfully.","data": {"displayName": "testupd","category": 2,"activity": 2,"group": 3,"modeOfOperation": 2,"equipmentName": 2,"identificationNumber": "58","serialNumber": 343,"modelOrBrand": "gh200","yearOfManufacture": 2012,"yearOfPurchase": 2012,"quantity": 2,"fuelType": "Petrol","energyConsumption": 22,"loanStatus": "Cleared","isDefault": 1,"equipmentType": "set","userID": 171}}
 */

router.put(
  '/:id',
  auth,
  validationErrorHandler,
  async (req, res) => {
    let { farm, segment, ...equipmentData } = { ...req.body };
    let equipment = Object.fromEntries(
      Object.entries(equipmentData).filter(([_, v]) => v)
    );
    equipment['userID'] = req.user.id;
    // Validate display name to be unique
    const currentEquipmentData = await db.Equipment.findOne({
      where: {
        id: req.params.id,
        userID: req.user.id,
      },
    });
    if (currentEquipmentData === null) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.EQUIPMENT_NOT_FOUND,
        })
      );
    }
    const t = await db.sequelize.transaction();
    try {
      // Check if activity belongs in provided category
      if (equipment?.category && equipment?.activity?.length) {
        await validateActivityBelongsToCategoryInDB(equipment, res);
      }
      // Check if equipment name exists
      if (equipment?.equipmentName) {
        await checkIfEquipmentNameExistsInDB(equipment, res);
      }
      // Check if group exists, energy consumption and
      // mode of operation exist andbelongs to user
      await validateEquipmentPayloadDataExistsInDB(equipment, res);

      const userFarms = await getUserFarmData();
      if (segment?.length && farm?.length) {
        await validateFarmsAndSegmentsPayloadData(segment, farm, res);
      }
      const {activity, ...restEquipment} = equipment
      //  Equipment Data
      const updatedEquipmentData = await db.Equipment.update(restEquipment, {
        where: {
          id: req.params.id,
        },
        transaction: t,
      });
      await db.EquipmentUserFarm.destroy({
        where: {
          equipmentID: currentEquipmentData.id,
        },
      });
      await db.EquipmentUserSegment.destroy({
        where: {
          equipmentID: currentEquipmentData.id,
        },
      });
      if(activity?.length){
        await updateEquipmentActivityToEquipment(activity, currentEquipmentData, t)
      }
      // Equipment belongs to a farm
      if (farm?.length) {
        await addEquipmentToFarm(
          userFarms,
          farm,
          res,
          t,
          currentEquipmentData.id
        );
      }
      if (segment?.length) {
        await addEquipmentToFarmSegment(
          userFarms,
          segment,
          res,
          t,
          currentEquipmentData.id
        );
      }
      // Equipment belong to a farm segment
      await t.commit();
      return res.json(
        successRespSync({
          msg: success.EQUIPMENT_UPDATED,
          data: {id: parseInt(req.params.id),...updatedEquipmentData},
        })
      );
    } catch (err) {
      await t?.rollback();
      logErrorOccurred(__filename, err);
      if (err?.msg && err?.customValidationError) {
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg: err.msg,
          })
        );
      }
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        const msg = `Foreign key constraint failed for ${JSON.stringify(
          err.fields
        )}`;
        return res.json(
          errorRespSync({
            code: error.code.UNPROCESSABLE_ENTITY,
            msg,
          })
        );
      }
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /equipments/{id}:
 *   delete:
 *     summary: API for deleting equipment.
 *     description: API for deleting equipment.
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of equipment
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
 *                 example: { "success": true,"code": 200,"message": "Equipment is removed successfully.","data": {"displayName": "testupd","category": 2,"activity": 2,"group": 3,"modeOfOperation": 2,"equipmentName": 2,"identificationNumber": "58","serialNumber": 343,"modelOrBrand": "gh200","yearOfManufacture": 2012,"yearOfPurchase": 2012,"quantity": 2,"fuelType": "Petrol","energyConsumption": 22,"loanStatus": "Cleared","isDefault": 1,"equipmentType": "set","userID": 171}}
 */
router.delete('/:id', auth, async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const equipment = await db.Equipment.findOne({
      where: {
        id: req.params.id,
        userID: req.user.id,
      },
    });
    if (equipment === null) {
      return res.json(
        errorRespSync({
          msg: error.EQUIPMENT_NOT_FOUND,
          code: error.code.NOT_FOUND,
        })
      );
    }
    //Detach equipment activity
    await db.EquipmentEquipmentActivity.destroy({
      where:{
        equipment_id:equipment.id
      }
    }, {transaction : t})
    
    await db.Equipment.destroy(
      {
        where: {
          id: req.params.id,
          userID: req.user.id,
        },
      },
      { transaction: t }
    );
    await db.EquipmentUserFarm.destroy(
      {
        where: {
          equipmentID: equipment.id,
        },
      },
      { transaction: t }
    );
    await db.EquipmentUserSegment.destroy(
      {
        where: {
          equipmentID: equipment.id,
        },
      },
      { transaction: t }
    );
    await t.commit();
    return res.json(
      successRespSync({
        msg: success.EQUIPMENT_DELETED,
        data: equipment,
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});


/**
 * @swagger
 * /equipments/fuelType:
 *   get:
 *     summary: API for getting fuel type.
 *     description: API for getting fuel type.
 *     tags: [Equipment]
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
 */

router.get('/fuelType', auth, translation, async (req, res) => {
  try {
    let fuelTypeRes = await db.Option.findAll({
      attributes: ["id", "name", "recordId"],
      where: {
        [Op.or]: [
          { [Op.and]: [{ userId: req.user.id, groupName: "fuel-type" }] },
          { [Op.and]: [{ userId: null, groupName: "fuel-type" }] },
        ],
      },
    });

    fuelTypeRes = req.translateFunction(fuelTypeRes, globalTranslationCache, {
      lvl1: true,
      lvl2: false,
    })
    return res.json(
      successRespSync({
        msg: 'Fueltype successfully fetched',
        data: fuelTypeRes,
      })
    )
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post('/fuelType', auth, translation, async (req, res) => {
  try {
  const {name} = req.body
  let fuelTypeRes = []

  fuelTypeRes = await db.Option.create({
    name,
    groupName: 'fuel-type',
    userId: req.user.id,
    recordId: req.body.recordId
  })

  
    return res.json(
      successRespSync({
        msg: 'Fueltype successfully created',
        data: fuelTypeRes,
      })
    )
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /equipments/loanStatus:
 *   get:
 *     summary: API for getting loan status.
 *     description: API for getting loan status.
 *     tags: [Equipment]
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
 */

router.get('/loanStatus', auth, translation, async (req, res) => {
  try {
    let loanStatusRes = await db.Option.findAll({
      attributes: ["id", "name"],
      where: {
        groupName: "loan-status"
      }
    })
    loanStatusRes = req.translateFunction(loanStatusRes, globalTranslationCache, {
      lvl1: true,
      lvl2: false,
    })
    return res.json(
      successRespSync({
        msg: success.EQUIPMENT_DELETED,
        data: loanStatusRes,
      })
    )
  } catch (err) {
    logErrorOccurred(__filename, err);
    return res.json(errorRespSync());
  }
});

/**
 * @swagger
 * /equipments/equipmentType:
 *   get:
 *     summary: API for getting Equipment type.
 *     description:  API for getting Equipment type.
 *     tags: [Equipment]
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
 */

router.get('/equipmentType', auth, translation, async (req, res) => {
  try {
    let equipTypeRes = await db.Option.findAll({
      attributes: ["id", "name", "recordId"],
      where: {
        groupName: "equipment-type"
      }
    })
    let englishRes = JSON.parse(JSON.stringify(equipTypeRes))
    equipTypeRes = req.translateFunction(equipTypeRes, globalTranslationCache, {
      lvl1: true,
      lvl2: false,
    })
    let resObj = []
    equipTypeRes.forEach(lres => {
      englishRes.filter(res => {
        if (res.id === lres.id) {
          resObj.push({
            id: res.id,
            name: lres.name,
            englishName: res.name,
          })
        }
      })
    })
    return res.json(
      successRespSync({
        msg: success.EQUIPMENT_DELETED,
        data: resObj,
      })
    )
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post(
  '/:id/fuel-record', 
  auth, 
  translation, 
  async (req, res) => {
  try {
    const {
      record_date,
      fuel_unit,
      fuel_amount,
      recordId
    } = req.body
  
    const equipment_id = req.params.id;

    if (!equipment_id || !record_date || !fuel_amount || !fuel_unit) {
      errorRespSync({
        code: error.code.BAD_REQUEST,
        msg: error.EQUIPMENT_FUEL_RECORD_MISSING
      })
    }

    const fuelRecord = await db.EquipmentFuelRecord.create({
      equipment_id,
      fuel_amount,
      fuel_unit,
      record_date,
      recordId
    });
  
    return res.json(
      successRespSync({
        msg: 'Fuel Record successfully created',
        data: fuelRecord,
      })
    )
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.delete(
  '/fuel-record/:id', 
  auth, 
  translation, 
  async (req, res) => {
  try {
    const fuel_record_id = req.params.id;

    if (!fuel_record_id) {
      errorRespSync({
        code: error.code.BAD_REQUEST,
        msg: error.EQUIPMENT_FUEL_RECORD_MISSING
      });
    }

    const fuelRecordExists = await db.EquipmentFuelRecord.findOne({
      where: {
        [Op.or]: [
          { id: fuel_record_id },
          { recordId: fuel_record_id }
        ]
      }
    });

    if (!fuelRecordExists) {
      errorRespSync({
        code: error.code.BAD_REQUEST,
        msg: error.EQUIPMENT_FUEL_RECORD_MISSING
      });
    }

    await db.EquipmentFuelRecord.delete({
      where: {
        id: fuelRecordExists.id
      }
    });

    return res.json(
      successRespSync({
        msg: 'Fuel Record successfully deleted',
        data: fuelRecordExists,
      })
    )
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

module.exports = router;
