const express = require('express');
const router = express.Router();
const auth = require(rootPath + '/middleware/auth');
const translation = require(rootPath + '/middleware/translation');
const db = require(rootPath + '/models');
const { Op } = require('sequelize');
const { successRespSync, errorRespSync, serverError } = require(rootPath + '/helpers/api');
const { success, error } = require(rootPath + '/helpers/language');
const { logErrorOccurred } = require(rootPath + '/helpers/general');
const {
  irrigationWaterSourceValidator,
  irrigationWaterOriginValidator,
} = require(rootPath + '/helpers/validators/irrigation');
const validationErrorHandler = require(rootPath +
  '/middleware/validation_error_handler');

/**
 * @swagger
 * /irrigation/waterSources:
 *   get:
 *     description: Returns all water source and their respective origins (admin added and only user specific)
 *     tags: [Irrigation]
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
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                       waterReosurceOrigins:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: [{"id": 1,"name": "Ground Water","waterReosurceOrigins": [{"id": 3,"name": "Well"}]}]
 *
 *
 */
router.get('/', auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    let waterSources = await db.IrrigationWaterSource.findAll({
      attributes: ['id', 'name'],
      order: [['id', 'ASC']],
      where: {
        userId: {
          [Op.or]: [userId, null],
        },
      },
      include: [
        {
          model: db.IrrigationWaterSourceOrigin,
          as: 'waterReosurceOrigins',
          attributes: ['id', 'name'],
          where: { userId: { [Op.or]: [userId, null] } },
          required: false,
        },
      ],
    });

    waterSources = req.translateFunction(waterSources,  globalTranslationCache, {
      lvl1: true,
      lvl2: true
    })
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: waterSources,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /irrigation/waterSources/:id/getOrigins:
 *   get:
 *     description: Returns list of origins for water source
 *     tags: [Irrigation]
 *     parameters:
 *       - in: param
 *         name: id
 *         schema:
 *           type: integer
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
 *                   data: [{"id": 3,"name": "Well"},{"id": 4,"name": "Borehole"}]
 *
 *
 */
router.get('/:id/getOrigins', auth,translation, async (req, res) => {
  try {
    const userId = req.user.id;
    let id = req.params.id
    let origins
    if (Array.isArray(JSON.parse(id))) {
        origins = await db.IrrigationWaterSourceOrigin.findAll({
        attributes: ['id', 'name'],
        order: [['id', 'ASC']],
        where: {
          userId: {
            [Op.or]: [userId, null],
          },
          waterType: {
            [Op.in]: JSON.parse(id)
          }
        },
      });
    } else {
        origins = await db.IrrigationWaterSourceOrigin.findAll({
        attributes: ['id', 'name'],
        order: [['id', 'ASC']],
        where: {
          userId: {
            [Op.or]: [userId, null],
          },
          waterType: id,
        },
      });
    }
    origins = req.translateFunction(origins,  globalTranslationCache, {
      lvl1: true,
      lvl2: false
    })
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: origins,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /irrigation/waterSources:
 *   post:
 *     description: Add new water source by user
 *     tags: [Irrigation]
 *     requestBody:
 *       description: Request body for creting new water source
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *              required:
 *                - name
 *            example:
 *              name: My First Water Source
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
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Fetched successfully.
 *                   data: {"id": 6,"name": "My Water Source 2"}
 *        '409':
 *           description: Conflict
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
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: false
 *                   code: 409
 *                   message: Irrigation water source already exist.
 *                   data: {"id": 6,"name": "My Water Source 2"}
 *
 */
router.post(
  '/',
  auth,
  irrigationWaterSourceValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { name } = req.body;
      const exists = await db.IrrigationWaterSource.findOne({
        where: {
          name,
          userId,
        },
      });
      if (exists !== null) {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: error.IRRIGATION_WATER_SOURCE_EXISTS,
            code: error.code.CONFLICT,
            data: { id: exists.id, name: exists.name },
          })
        );
      }
      const irrigationWaterSource = await db.IrrigationWaterSource.create({
        name,
        userId,
      });
      return res.json(
        successRespSync({
          msg: success.IRRIGATION_WATER_SOURCE_CREATED,
          data: {
            id: irrigationWaterSource.id,
            name: irrigationWaterSource.name,
          },
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
 * /irrigation/waterSources/origins:
 *   post:
 *     description: Add new water source origin by user
 *     tags: [Irrigation]
 *     requestBody:
 *       description: Request body for creting new water source (Source in request body refers to water source E.g ground water, surface water)
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                source:
 *                  type: integer
 *              required:
 *                - name
 *                - source
 *            example:
 *              name: My First Water Source Origin
 *              source: 1
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
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Irrigation water source origin added successfully.
 *                   data: {"id": 6,"name": "My Custom water source origin"}
 *        '404':
 *           description: Water Source Doesnot Exist - If the source id doesnot exist in DB
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
 *                 example:
 *                   success: false
 *                   code: 404
 *                   message: Irrigation water source doesnot exist.
 *        '409':
 *           description: Water Source Origin Already Exist
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
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                 example:
 *                   success: false
 *                   code: 404
 *                   message: Irrigation water source origin already exist.
 *                   data: {"id": 6,"name": "My Custom water source origin"}
 */
router.post(
  '/origins',
  auth,
  irrigationWaterOriginValidator(),
  validationErrorHandler,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, source } = req.body;
      const irrigationWaterSource = await db.IrrigationWaterSource.findOne({
        where: {
          userId: {
            [Op.or]: [userId, null],
          },
          id: source,
        },
      });
      if (irrigationWaterSource === null) {
        return res.status(error.code.NOT_FOUND).json(
          errorRespSync({
            msg: error.IRRIGATION_WATER_SOURCE_DOESNOT_EXISTS,
            code: error.code.NOT_FOUND,
          })
        );
      }
      const exists = await db.IrrigationWaterSourceOrigin.findOne({
        where: {
          name,
          waterType: source,
          userId,
        },
      });
      if (exists !== null) {
        return res.status(error.code.CONFLICT).json(
          errorRespSync({
            msg: error.IRRIGATION_WATER_SOURCE_ORIGIN_EXISTS,
            code: error.code.CONFLICT,
            data: { id: exists.id, name: exists.name },
          })
        );
      }
      const irrigationWaterSourceOrigin =
        await db.IrrigationWaterSourceOrigin.create({
          name,
          userId,
          waterType: source,
        });
      return res.json(
        successRespSync({
          msg: success.IRRIGATION_WATER_SOURCE_ORIGIN_CREATED,
          data: {
            id: irrigationWaterSourceOrigin.id,
            name: irrigationWaterSourceOrigin.name,
          },
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
 * /irrigation/waterSources/cropWaterMgmt:
 *   get:
 *     description: Get water sources
 *     tags: [Irrigation]
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
 *                       id:
 *                        type: integer
 *                       name:
 *                        type: string
 *                 example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 47, "name": "rainfed" }, { "id": 48, "name": "irrigated" } ] }
 */

router.get('/cropWaterMgmt', auth, translation, async (req, res) => {
  try {
    let waterSources = await db.Option.findAll({
      attributes: ['id', 'name'],
      where: {
        groupName: "crop-water-mgmt",
      }
    });

    // map the water sources and add water_source_type field
    waterSources = waterSources.map(source => {
      const sourceData = source.toJSON();
      // Add water_source_type field based on name
      if (sourceData.name) {
        if (sourceData.name.toLowerCase().includes('rainfed')) {
          sourceData.water_source_type = 'RAINFED_WATER';
        } else if (sourceData.name.toLowerCase().includes('irrigation')) {
          sourceData.water_source_type = 'IRRIGATED_WATER';
        } else {
          sourceData.water_source_type = 'OTHER'; 
        }
      }
      return sourceData;
    });
      
    waterSources = req.translateFunction(waterSources, globalTranslationCache, {
      lvl1: true,
      lvl2: false
    });
    
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: waterSources,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});
module.exports = router;
