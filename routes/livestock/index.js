const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const db = require(rootPath + '/models');
const auth = require(rootPath + '/middleware/auth');
const { liveStockRegistrationValidator } = require(rootPath +
  '/helpers/validators/livestock');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');
const { logErrorOccurred, notEmpty } = require(rootPath + '/helpers/general');
const { error, success } = require(rootPath + '/helpers/language');
const { successRespSync, errorRespSync, serverError } = require(rootPath +
  '/helpers/api');
const {
  validateLiveStockRegistationData,
  getLiveStockData,
  removeExistingFarmSegmentAndClass,
  addLiveStockToFarm,
  addLiveStockToSegment,
  addClassToLiveStock,
} = require('./utils');

/**
 * @swagger
 * /livestocks/class:
 *   get:
 *     description: Returns all classes of animal / Usage of animals
 *     tags: [Livestock]
 *     responses:
 *       200:
 *         description: Successfully return the list of the animal class
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LiveStock-Class'
 */
router.get('/class', auth, async (req, res) => {
  const result = await db.LiveStockClass.findAll({
    order: [['id', 'ASC']],
    attributes: ['id', 'name'],
  });
  return res.json(
    successRespSync({
      msg: success.FETCH,
      data: result,
    })
  );
});

/**
 * @swagger
 * /livestocks/parents/{id}:
 *   get:
 *     summary:
 *     description:
 *     tags: [Livestock]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of livestock
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": { "Sire": [ { "id": 39, "displayName": "vss", "userId": 26, "livestock": 1, "breed": 2, "stage": 1, "dam": 10, "surrogate": 10, "sire": 36, "tagNumber": "hfu", "identificationNumber": "vxhdufj", "gender": "male", "dateOfBirth": null, "weight": "25000", "group": 10, "quantity": 1, "createdAt": "2022-01-20T05:07:48.000Z", "updatedAt": "2022-01-20T05:07:48.000Z", "livestock_name": { "id": 1, "name": "Cattle", "livestock_species": { "id": 1, "name": "Bovine" } }, "livestock_breed": { "id": 2, "name": "Angus 2", "livestock": 1, "userId": 26, "createdAt": "2021-12-29T12:33:34.000Z", "updatedAt": "2021-12-29T12:33:34.000Z" }, "livestock_stage": { "id": 1, "name": "Calf" }, "user_livestock_farm": [ { "id": 211, "farmName": "Farmin" } ], "user_livestock_segment": [], "user_livestock_class": [ { "id": 3, "name": "Eggs" }, { "id": 5, "name": "Hunting" } ] }, { "id": 38, "displayName": "vuvjv", "userId": 171, "livestock": 1, "breed": 3, "stage": 1, "dam": 10, "surrogate": 10, "sire": 34, "tagNumber": "dhxh", "identificationNumber": "hxhcjc", "gender": "male", "dateOfBirth": null, "weight": "20000", "group": 7, "quantity": 1, "createdAt": "2022-01-20T03:34:03.000Z", "updatedAt": "2022-01-20T03:34:03.000Z", "livestock_name": { "id": 1, "name": "Cattle", "livestock_species": { "id": 1, "name": "Bovine" } }, "livestock_breed": { "id": 3, "name": "new breed", "livestock": 1, "userId": 26, "createdAt": "2022-01-04T02:13:50.000Z", "updatedAt": "2022-01-04T02:13:50.000Z" }, "livestock_stage": { "id": 1, "name": "Calf" }, "user_livestock_farm": [ { "id": 211, "farmName": "Farmin" } ], "user_livestock_segment": [], "user_livestock_class": [ { "id": 3, "name": "Eggs" }, { "id": 5, "name": "Hunting" } ] }, { "id": 37, "displayName": "jcjjf", "userId": 26, "livestock": 1, "breed": 2, "stage": 1, "dam": 24, "surrogate": 24, "sire": 1, "tagNumber": "hxhc", "identificationNumber": "HC", "gender": "male", "dateOfBirth": null, "weight": "46", "group": 6, "quantity": 1, "createdAt": "2022-01-14T06:38:37.000Z", "updatedAt": "2022-01-14T06:38:37.000Z", "livestock_name": { "id": 1, "name": "Cattle", "livestock_species": { "id": 1, "name": "Bovine" } }, "livestock_breed": { "id": 2, "name": "Angus 2", "livestock": 1, "userId": 26, "createdAt": "2021-12-29T12:33:34.000Z", "updatedAt": "2021-12-29T12:33:34.000Z" }, "livestock_stage": { "id": 1, "name": "Calf" }, "user_livestock_farm": [ { "id": 211, "farmName": "Farmin" } ], "user_livestock_segment": [], "user_livestock_class": [ { "id": 2, "name": "Meat" }, { "id": 5, "name": "Hunting" } ] }, { "id": 36, "displayName": "jcjjf", "userId": 26, "livestock": 1, "breed": 2, "stage": 1, "dam": 24, "surrogate": 24, "sire": 1, "tagNumber": "hxhc", "identificationNumber": "HC", "gender": "male", "dateOfBirth": null, "weight": "46", "group": 6, "quantity": 1, "createdAt": "2022-01-14T06:37:28.000Z", "updatedAt": "2022-01-14T06:37:28.000Z", "livestock_name": { "id": 1, "name": "Cattle", "livestock_species": { "id": 1, "name": "Bovine" } }, "livestock_breed": { "id": 2, "name": "Angus 2", "livestock": 1, "userId": 26, "createdAt": "2021-12-29T12:33:34.000Z", "updatedAt": "2021-12-29T12:33:34.000Z" }, "livestock_stage": { "id": 1, "name": "Calf" }, "user_livestock_farm": [ { "id": 211, "farmName": "Farmin" } ], "user_livestock_segment": [], "user_livestock_class": [ { "id": 2, "name": "Meat" }, { "id": 5, "name": "Hunting" } ] }, { "id": 34, "displayName": "Item", "userId": 26, "livestock": 1, "breed": 2, "stage": 1, "dam": 24, "surrogate": 24, "sire": 1, "tagNumber": "hxhd", "identificationNumber": "hxjfj", "gender": "male", "dateOfBirth": null, "weight": "25", "group": 7, "quantity": 1, "createdAt": "2022-01-14T00:51:42.000Z", "updatedAt": "2022-01-14T05:53:11.000Z", "livestock_name": { "id": 1, "name": "Cattle", "livestock_species": { "id": 1, "name": "Bovine" } }, "livestock_breed": { "id": 2, "name": "Angus 2", "livestock": 1, "userId": 26, "createdAt": "2021-12-29T12:33:34.000Z", "updatedAt": "2021-12-29T12:33:34.000Z" }, "livestock_stage": { "id": 1, "name": "Calf" }, "user_livestock_farm": [ { "id": 226, "farmName": "ghj" }, { "id": 211, "farmName": "Farmin" } ], "user_livestock_segment": [], "user_livestock_class": [ { "id": 3, "name": "Eggs" }, { "id": 4, "name": "Sports" } ] }, { "id": 1, "displayName": "Hello Livestock", "userId": 26, "livestock": 1, "breed": 2, "stage": 1, "dam": null, "surrogate": null, "sire": null, "tagNumber": "#123", "identificationNumber": "ID-123", "gender": "male", "dateOfBirth": null, "weight": "90", "group": 2, "quantity": 1, "createdAt": "2021-12-29T12:34:00.000Z", "updatedAt": "2021-12-29T12:34:00.000Z", "livestock_name": { "id": 1, "name": "Cattle", "livestock_species": { "id": 1, "name": "Bovine" } }, "livestock_breed": { "id": 2, "name": "Angus 2", "livestock": 1, "userId": 26, "createdAt": "2021-12-29T12:33:34.000Z", "updatedAt": "2021-12-29T12:33:34.000Z" }, "livestock_stage": { "id": 1, "name": "Calf" }, "user_livestock_farm": [], "user_livestock_segment": [], "user_livestock_class": [] } ], "Dam": [ { "id": 42, "displayName": "uff", "userId": 171, "livestock": 1, "breed": 2, "stage": 1, "dam": 24, "surrogate": 24, "sire": null, "tagNumber": "hxhfh", "identificationNumber": null, "gender": "female", "dateOfBirth": "2022-01-11T19:00:00.000Z", "weight": null, "group": null, "quantity": 1, "createdAt": "2022-01-27T03:29:06.000Z", "updatedAt": "2022-01-27T03:29:06.000Z", "livestock_name": { "id": 1, "name": "Cattle", "livestock_species": { "id": 1, "name": "Bovine" } }, "livestock_breed": { "id": 2, "name": "Angus 2", "livestock": 1, "userId": 26, "createdAt": "2021-12-29T12:33:34.000Z", "updatedAt": "2021-12-29T12:33:34.000Z" }, "livestock_stage": { "id": 1, "name": "Calf" }, "user_livestock_farm": [ { "id": 211, "farmName": "Farmin" } ], "user_livestock_segment": [], "user_livestock_class": [ { "id": 4, "name": "Sports" } ] }, { "id": 24, "displayName": "goat", "userId": 67, "livestock": 1, "breed": 14, "stage": null, "dam": 10, "surrogate": 10, "sire": null, "tagNumber": "345", "identificationNumber": "12", "gender": "female", "dateOfBirth": null, "weight": "34", "group": 16, "quantity": 1, "createdAt": "2022-01-07T12:09:29.000Z", "updatedAt": "2022-01-07T12:09:29.000Z", "livestock_name": { "id": 1, "name": "Cattle", "livestock_species": { "id": 1, "name": "Bovine" } }, "livestock_breed": { "id": 14, "name": "44", "livestock": 1, "userId": 67, "createdAt": "2022-01-06T05:33:30.000Z", "updatedAt": "2022-01-06T05:33:30.000Z" }, "livestock_stage": null, "user_livestock_farm": [], "user_livestock_segment": [], "user_livestock_class": [] }, { "id": 10, "displayName": "goat", "userId": 67, "livestock": 1, "breed": 14, "stage": 9, "dam": null, "surrogate": null, "sire": 1, "tagNumber": "12", "identificationNumber": "22", "gender": "female", "dateOfBirth": null, "weight": "33000", "group": 16, "quantity": 1, "createdAt": "2022-01-06T05:35:03.000Z", "updatedAt": "2022-01-28T04:34:32.000Z", "livestock_name": { "id": 1, "name": "Cattle", "livestock_species": { "id": 1, "name": "Bovine" } }, "livestock_breed": { "id": 14, "name": "44", "livestock": 1, "userId": 67, "createdAt": "2022-01-06T05:33:30.000Z", "updatedAt": "2022-01-06T05:33:30.000Z" }, "livestock_stage": { "id": 9, "name": "66" }, "user_livestock_farm": [], "user_livestock_segment": [], "user_livestock_class": [] } ] } }
 */

router.get('/parents/:id', auth, async (req, res) => {
  const resultMale = await db.userLiveStock.findAll({
    order: [['id', 'DESC']],
    include: [
      {
        model: db.LiveStock,
        as: 'livestock_name',
        attributes: ['id', 'name'],
        include: [
          {
            model: db.Species,
            as: 'livestock_species',
            attributes: ['id', 'name'],
          },
        ],
      },
      {
        model: db.LiveStockBreed,
        as: 'livestock_breed',
      },
      {
        model: db.LiveStockStage,
        as: 'livestock_stage',
        attributes: ['id', 'name'],
      },
      {
        model: db.user_farm,
        as: 'user_livestock_farm',
        through: { model: db.userLiveStockFarm, attributes: [] },
        attributes: ['id', 'farmName'],
      },
      {
        model: db.Geofence,
        as: 'user_livestock_segment',
        attributes: ['id', 'geofenceName'],
        through: { model: db.userLiveStockSegment, attributes: [] },
      },
      {
        model: db.LiveStockClass,
        as: 'user_livestock_class',
        attributes: ['id', 'name'],
        through: {
          model: db.userLiveStockClass,
          attributes: [],
        },
      },
    ],
    where: {
      quantity: 1,
      livestock: req.params.id,
      gender: 'male',
    },
  });
  const resultFemale = await db.userLiveStock.findAll({
    order: [['id', 'DESC']],
    include: [
      {
        model: db.LiveStock,
        as: 'livestock_name',
        attributes: ['id', 'name'],
        include: [
          {
            model: db.Species,
            as: 'livestock_species',
            attributes: ['id', 'name'],
          },
        ],
      },
      {
        model: db.LiveStockBreed,
        as: 'livestock_breed',
      },
      {
        model: db.LiveStockStage,
        as: 'livestock_stage',
        attributes: ['id', 'name'],
      },
      {
        model: db.user_farm,
        as: 'user_livestock_farm',
        through: { model: db.userLiveStockFarm, attributes: [] },
        attributes: ['id', 'farmName'],
      },
      {
        model: db.Geofence,
        as: 'user_livestock_segment',
        attributes: ['id', 'geofenceName'],
        through: { model: db.userLiveStockSegment, attributes: [] },
      },
      {
        model: db.LiveStockClass,
        as: 'user_livestock_class',
        attributes: ['id', 'name'],
        through: {
          model: db.userLiveStockClass,
          attributes: [],
        },
      },
    ],
    where: {
      quantity: 1,
      livestock: req.params.id,
      gender: 'female',
    },
  });
  return res.json(
    successRespSync({
      msg: success.FETCH,
      data: { Sire: resultMale, Dam: resultFemale },
    })
  );
});

/**
 * @swagger
 * /livestocks/species:
 *   get:
 *     summary:
 *     description:
 *     tags: [Livestock]
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 1, "name": "Bovine", "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "livestocks": [ { "id": 1, "name": "Cattle", "species": 1, "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "stages": [], "breeds": [] }, { "id": 2, "name": "Buffalo", "species": 1, "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "stages": [], "breeds": [] }, { "id": 3, "name": "Water buffalo", "species": 1, "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "stages": [], "breeds": [] } ] }, { "id": 2, "name": "Ovine", "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "livestocks": [ { "id": 4, "name": "Sheep", "species": 2, "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "stages": [], "breeds": [] } ] }, { "id": 3, "name": "Caprine", "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "livestocks": [ { "id": 5, "name": "Goat", "species": 3, "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "stages": [ { "id": 10, "name": "calf", "livestock": 5, "userId": 171, "createdAt": "2022-01-06T05:41:45.000Z", "updatedAt": "2022-01-06T05:41:45.000Z" } ], "breeds": [] } ] }, { "id": 4, "name": "Swine", "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "livestocks": [ { "id": 6, "name": "Pigs", "species": 4, "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "stages": [ { "id": 13, "name": "Goat", "livestock": 6, "userId": 171, "createdAt": "2022-01-07T03:07:42.000Z", "updatedAt": "2022-01-07T03:07:42.000Z" }, { "id": 21, "name": "Fish", "livestock": 6, "userId": 171, "createdAt": "2022-03-28T15:10:37.000Z", "updatedAt": "2022-03-28T15:10:37.000Z" } ], "breeds": [] } ] }, { "id": 5, "name": "Poulty", "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "livestocks": [ { "id": 7, "name": "Chicken", "species": 5, "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "stages": [], "breeds": [] }, { "id": 8, "name": "Duck", "species": 5, "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "stages": [], "breeds": [] } ] }, { "id": 6, "name": "Equine", "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "livestocks": [ { "id": 9, "name": "Horse", "species": 6, "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "stages": [], "breeds": [] }, { "id": 10, "name": "Donkey", "species": 6, "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "stages": [], "breeds": [] } ] }, { "id": 7, "name": "Wildlife", "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "livestocks": [ { "id": 11, "name": "Game", "species": 7, "createdAt": "2021-12-19T10:07:05.000Z", "updatedAt": "2021-12-19T10:07:05.000Z", "stages": [], "breeds": [] } ] } ] }
 */

router.get('/species', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.Species.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: db.LiveStock,
          as: 'livestocks',
          include: [
            {
              model: db.LiveStockStage,
              as: 'stages',
              where: { userId },
              required: false,
            },
            {
              model: db.LiveStockBreed,
              as: 'breeds',
              where: { userId },
              required: false,
            },
          ],
        },
      ],
    });
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
 * /livestocks:
 *   get:
 *     summary:
 *     description:
 *     tags: [Livestock]
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
 *         name: species
 *         required: false
 *         schema:
 *           type: String
 *         description: Species
 *       - in: query
 *         name: animalClass
 *         required: false
 *         schema:
 *           type: String
 *         description: Animal Class
 *       - in: query
 *         name: farm
 *         required: false
 *         schema:
 *           type: String
 *         description: Farm
 *       - in: query
 *         name: segment
 *         required: false
 *         schema:
 *           type: String
 *         description: Segment
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: String
 *         description: Type
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: String
 *         description: asc | dsc
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
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 42, "displayName": "uff", "userId": 171, "livestock": 1, "breed": 2, "stage": 1, "dam": 24, "surrogate": 24, "sire": null, "tagNumber": "hxhfh", "identificationNumber": null, "gender": "female", "dateOfBirth": "2022-01-11T19:00:00.000Z", "weight": null, "group": null, "quantity": 1, "createdAt": "2022-01-27T03:29:06.000Z", "updatedAt": "2022-01-27T03:29:06.000Z", "livestock_name": { "id": 1, "name": "Cattle", "livestock_species": { "id": 1, "name": "Bovine" } }, "livestock_breed": { "id": 2, "name": "Angus 2", "livestock": 1, "userId": 26, "createdAt": "2021-12-29T12:33:34.000Z", "updatedAt": "2021-12-29T12:33:34.000Z" }, "livestock_stage": { "id": 1, "name": "Calf" }, "parent_dam": { "id": 24, "displayName": "goat" }, "parent_sire": null, "parent_surrogate": { "id": 24, "displayName": "goat" }, "livestock_group": null, "user_livestock_farm": [ { "id": 211, "farmName": "Farmin" } ], "user_livestock_segment": [], "user_livestock_class": [ { "id": 4, "name": "Sports" } ] } ] }
 */

router.get('/', auth, async (req, res) => {
  try {
    let { page, limit, species, animalClass, farm, segment, type, order } =
      req.query;
    let orderBy = [['createdAt', 'DESC']];
    if (notEmpty(order)) {
      orderBy =
        order === 'asc' ? [['displayName', 'ASC']] : [['displayName', 'DESC']];
    }
    let where = { userId: req.user.id };
    if (notEmpty(animalClass)) {
      const livestockListWithClass = await db.userLiveStock.findAll({
        where,
        raw: true,
        include: [
          {
            model: db.LiveStockClass,
            as: 'user_livestock_class',
            attributes: ['id'],
            where: { id: animalClass.split('-') },
            through: {
              model: db.userLiveStockClass,
              attributes: [],
            },
          },
        ],
      });
      const livestockListWithClassIds = livestockListWithClass.map(
        (item) => item.id
      );
      where.id = livestockListWithClassIds;
    }
    let livestockListWithFarmIds = [];
    let livestockListWithSegmentIds = [];
    if (notEmpty(farm)) {
      const livestockListWithFarm = await db.userLiveStock.findAll({
        where,
        raw: true,
        include: [
          {
            model: db.user_farm,
            as: 'user_livestock_farm',
            required: true,
            through: {
              model: db.userLiveStockFarm,
              attributes: [],
              where: { farm: farm.split('-') },
            },
            attributes: ['id', 'farmName'],
          },
        ],
      });
      livestockListWithFarmIds = livestockListWithFarm.map((item) => item.id);
    }

    if (notEmpty(segment)) {
      const livestockListWithSegment = await db.userLiveStock.findAll({
        where,
        raw: true,
        include: [
          {
            model: db.Geofence,
            as: 'user_livestock_segment',
            attributes: ['id', 'geofenceName'],
            required: true,
            through: {
              model: db.userLiveStockSegment,
              attributes: [],
              where: { segment: segment.split('-') },
            },
          },
        ],
      });
      livestockListWithSegmentIds = livestockListWithSegment.map(
        (item) => item.id
      );
    }

    if (notEmpty(farm) || notEmpty(segment)) {
      where.id = [
        ...new Set(
          livestockListWithFarmIds.concat(livestockListWithSegmentIds)
        ),
      ];
    }

    let query = {
      where,
      order: orderBy,
      include: [
        {
          model: db.LiveStock,
          as: 'livestock_name',
          attributes: ['id', 'name'],
          include: [
            {
              model: db.Species,
              as: 'livestock_species',
              attributes: ['id', 'name'],
            },
          ],
        },
        {
          model: db.LiveStockBreed,
          as: 'livestock_breed',
        },
        {
          model: db.LiveStockStage,
          as: 'livestock_stage',
          attributes: ['id', 'name'],
        },
        {
          model: db.userLiveStock,
          as: 'parent_dam',
          attributes: ['id', 'displayName'],
        },
        {
          model: db.userLiveStock,
          as: 'parent_sire',
          attributes: ['id', 'displayName'],
        },
        {
          model: db.userLiveStock,
          as: 'parent_surrogate',
          attributes: ['id', 'displayName'],
        },
        {
          model: db.LiveStockGroup,
          as: 'livestock_group',
          attributes: ['id', 'name'],
        },
        {
          model: db.user_farm,
          as: 'user_livestock_farm',
          through: { model: db.userLiveStockFarm, attributes: [] },
          attributes: ['id', 'farmName'],
        },
        {
          model: db.Geofence,
          as: 'user_livestock_segment',
          attributes: ['id', 'geofenceName'],
          through: { model: db.userLiveStockSegment, attributes: [] },
        },
        {
          model: db.LiveStockClass,
          as: 'user_livestock_class',
          attributes: ['id', 'name'],
          through: {
            model: db.userLiveStockClass,
            attributes: [],
          },
        },
      ],
    };
    if (notEmpty(species)) {
      where['$livestock_name.livestock_species.id$'] = species.split('-');
    }
    if (notEmpty(type) && ['set', 'single'].includes(type)) {
      const typeFilter = {};
      type === 'set' ? (typeFilter[Op.gt] = 1) : (typeFilter[Op.lt] = 2);
      where.quantity = typeFilter;
    }

    if (notEmpty(page) && notEmpty(limit)) {
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }
    const userLiveStocks = await db.userLiveStock.findAll(query);
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: userLiveStocks,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /livestocks:
 *   post:
 *     summary: Add livestock
 *     description: Add livestock
 *     tags: [Livestock]
 *     requestBody:
 *       description: Add livestock
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *            example: {"farm":[], "segment":[2,3], "animalClass":[2,3], livestock: 4, "quantity":2, "tagNumber": null, "gender": "male", "weight": null, "dam": null, "surrogate": null, "sire": null, "group":null, "breed":null}
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
 *                 example: { "success": true, "code": 200, "message": "Livestock is added successfully.", "data": { "id": 54, "livestock": 4, "quantity": 2, "gender": null, "userId": 171, "tagNumber": null, "weight": null, "dam": null, "surrogate": null, "sire": null, "updatedAt": "2022-03-29T11:54:32.383Z", "createdAt": "2022-03-29T11:54:32.383Z" } }
 */

router.post(
  '/',
  auth,
  liveStockRegistrationValidator(),
  validationErrorHandler,
  async (req, res) => {
    console.log('req.body :>> ', req.body);
    const userId = req.user.id;
    const { farm, segment, animalClass, ...rest } = req.body;
    const liveStockData = getLiveStockData(rest, userId);
    const t = await db.sequelize.transaction();
    try {
      await validateLiveStockRegistationData(
        liveStockData,
        userId,
        segment,
        farm
      );
      const registeredLiveStock = await db.userLiveStock.create(liveStockData, {
        transaction: t,
      });
      if (farm?.length) {
        await addLiveStockToFarm(farm, registeredLiveStock, t);
      }
      if (segment?.length) {
        await addLiveStockToSegment(segment, registeredLiveStock, t);
      }
      if (animalClass?.length) {
        await addClassToLiveStock(animalClass, registeredLiveStock, t);
      }
      await t.commit();
      return res.json(
        successRespSync({
          msg: success.LIVESTOCK_ADDED,
          data: registeredLiveStock,
        })
      );
    } catch (err) {
      await t?.rollback();
      logErrorOccurred(__filename, err);
      if (err?.msg && err?.customValidationError) {
        return res.json(
          errorRespSync({
            msg: err.msg,
            code: error.code.UNPROCESSABLE_ENTITY,
          })
        );
      }
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        const msg = `Foreign key constraint failed for ${JSON.stringify(
          err.fields
        )}`;
        return res.json(
          errorRespSync({
            msg,
            code: error.code.UNPROCESSABLE_ENTITY,
          })
        );
      }
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /livestocks/{id}:
 *   put:
 *     summary: Update livestock
 *     description: Update livestock
 *     tags: [Livestock]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of livestock
 *     requestBody:
 *       description: Add livestock
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *            example: {"farm":[], "segment":[2,3], "animalClass":[2,3], livestock: 4, "quantity":2, "tagNumber": "hek22", "gender": "male", "weight": null, "dam": null, "surrogate": null, "sire": null, "group":null, "breed":null}
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
 *                 example: { "success": true, "code": 200, "message": "Livestock is updated successfully.", "data": { "livestock": 4, "quantity": 1, "tagNumber": "hek22", "gender": "male", "userId": 171 } }
 */

router.put(
  '/:id',
  auth,
  liveStockRegistrationValidator(),
  validationErrorHandler,
  async (req, res) => {
    const userId = req.user.id;
    const { farm, segment, animalClass, ...rest } = req.body;
    const liveStockData = getLiveStockData(rest, userId);
    const t = await db.sequelize.transaction();
    try {
      await validateLiveStockRegistationData(
        liveStockData,
        userId,
        segment,
        farm
      );
      const registeredLiveStock = await db.userLiveStock.findOne({
        where: {
          userId,
          id: req.params.id,
        },
      });
      if (registeredLiveStock === null) {
        throw {
          msg: 'Registered Livestock Doesnot Exist.',
          customValidationError: true,
        };
      }
      await db.userLiveStock.update(
        liveStockData,
        {
          where: {
            id: req.params.id,
          },
        },
        {
          transaction: t,
        }
      );
      await removeExistingFarmSegmentAndClass(req.params.id, t);
      if (farm?.length) {
        await addLiveStockToFarm(farm, registeredLiveStock, t);
      }
      if (segment?.length) {
        await addLiveStockToSegment(segment, registeredLiveStock, t);
      }
      if (animalClass?.length) {
        await addClassToLiveStock(animalClass, registeredLiveStock, t);
      }
      await t.commit();
      return res.json(
        successRespSync({
          msg: success.LIVESTOCK_UPDATED,
          data: liveStockData,
        })
      );
    } catch (err) {
      await t?.rollback();
      logErrorOccurred(__filename, err);
      if (err?.msg && err?.customValidationError) {
        return res.json(
          errorRespSync({
            msg: err.msg,
            code: error.code.UNPROCESSABLE_ENTITY,
          })
        );
      }
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        const msg = `Foreign key constraint failed for ${JSON.stringify(
          err.fields
        )}`;
        return res.json(
          errorRespSync({
            msg,
            code: error.code.UNPROCESSABLE_ENTITY,
          })
        );
      }
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /livestocks/{id}:
 *   delete:
 *     summary: Delete livestock
 *     description: Delete livestock
 *     tags: [Livestock]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: Integer
 *         description: ID of livestock
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
 *                 example: { "success": true, "code": 200, "message": "Registered Livestock is removed successfully.", "data": { "id": 54, "displayName": null, "userId": 171, "livestock": 4, "breed": null, "stage": null, "dam": null, "surrogate": null, "sire": null, "tagNumber": null, "identificationNumber": null, "gender": null, "dateOfBirth": null, "weight": null, "group": null, "quantity": 2, "createdAt": "2022-03-29T11:54:32.000Z", "updatedAt": "2022-03-29T11:54:32.000Z" } }
 */

router.delete('/:id', auth, async (req, res) => {
  const registeredLiveStock = await db.userLiveStock.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });
  if (registeredLiveStock === null) {
    return res.json(
      errorRespSync({
        msg: error.LIVESTOCK_NOT_FOUND,
        code: error.code.NOT_FOUND,
      })
    );
  }
  const t = await db.sequelize.transaction();
  try {
    await removeExistingFarmSegmentAndClass(req.params.id, t);
    await db.userLiveStock.destroy(
      {
        where: {
          id: req.params.id,
          userID: req.user.id,
        },
      },
      { transaction: t }
    );
    await t.commit();
    return res.json(
      successRespSync({
        msg: success.LIVESTOCK_DELETED,
        data: registeredLiveStock,
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.json(
        errorRespSync({
          code: error.code.CONFLICT,
          msg: error.LIVESTOCK_IS_PARENT,
        })
      );
    }
    return serverError(res, err);
  }
});

module.exports = router;
