const express = require("express");
const moment = require("moment");
const { body } = require("express-validator");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const fileUpload = require(rootPath + "/middleware/file_upload");
const { deleteFileS3 } = require("../../../helpers/aws_s3");
const { removeEmptyValuesFromObject } = require(rootPath + "/helpers/general");
const {
  createSeedlingValidations,
  updateSeedlingValidations,
} = require("../../../helpers/validation");
const validationErrorHandler = require("../../../middleware/validation_error_handler");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api")
const {} = require("../../../models")
const db = require(rootPath + "/models")
const { Op, literal } = require("sequelize")
const _ = require("lodash")

const multer = require("multer");
var aws = require("aws-sdk");
const { sortCoffeeVarieties } = require('../../../helpers/coffee-variety');
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_TICKET_BUCKET,
});

/**
 * @swagger
 * /coffee/farmers/seedling:
 *   post:
 *     description: create seedling
 *     tags: [Coffee-seedling]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            example: { "seedlingDate": "07/10/2022", "coffeeVariety": 8, "coffeeSpecies": 8, "seedProducer": "Seedling Producer", "originOfTheSeeds": "Japan", "noOfSeeds": 300, "recordId": "seedlingRecordId3" }
 *            schema:
 *              type: object
 *              properties:
 *                originOfTheSeeds:
 *                  type: string
 *                seedProducer:
 *                  type: string
 *                coffeeSpecies:
 *                  type: integer
 *                coffeeVariety:
 *                  type: integer
 *                seedlingDate:
 *                  type: string
 *                noOfSeeds:
 *                  type: integer
 *                recordId:
 *                  type: string
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
 */
router.post("/", auth,
  createSeedlingValidations(),
  validationErrorHandler,
  async function (req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      let {
        seedlingDate,
        coffeeVariety = "",
        coffeeSpecies = "",
        seedProducer,
        originOfTheSeeds,
        noOfSeeds,
        recordId,
      } = req.body;

      const isRecordIdExists = await db.Seedlings.findOne({
        where: {
          recordId,
          is_deleted: false,
          user_id: userId,
        },
      });

      if (!isRecordIdExists) {
        const response = await db.Seedlings.create(
          {
            user_id: userId,
            seedling_date: seedlingDate,
            coffee_species: coffeeSpecies,
            no_of_seeds: noOfSeeds,
            seed_producer: seedProducer,
            origin_of_the_seeds: originOfTheSeeds,
            recordId: recordId,
          },
          { transaction }
        );

        if (coffeeVariety && coffeeVariety.length > 0) {
          const seedingVarietyObj = coffeeVariety.map((variety_id) => {
            return {
              coffee_seeding_id: response.id,
              coffee_variety_id: variety_id,
            };
          });
          await db.CoffeeSeedingVarieties.bulkCreate(seedingVarietyObj, {
            transaction,
          });
        }
  
        await transaction.commit()
        return res.json(
          successRespSync({
            msg: "Seedling has been created.",
            data: response,
          })
        );
      } else {
        let { id } = await db.Seedlings.findOne({
          attributes: ["id"],
          where: {
            recordId,
          },
        });

        let set = {
          seedling_date: seedlingDate,
          coffee_species: coffeeSpecies,
          no_of_seeds: noOfSeeds,
          seed_producer: seedProducer,
          origin_of_the_seeds: originOfTheSeeds,
        };

        await db.Seedlings.update(set, {
          where: { id },
          transaction,
        });

        if (coffeeVariety && coffeeVariety.length > 0) {
          const seedingVarietyObj = coffeeVariety.map((variety_id) => {
            return {
              coffee_seeding_id: id,
              coffee_variety_id: variety_id,
            };
          });
          await db.CoffeeSeedingVarieties.bulkCreate(seedingVarietyObj, {
            transaction,
          });
        }

        await transaction.commit();

        const response = await db.Seedlings.findOne({
          where: {
            id
          },
          include: [
            {
              attributes: ["id", "name", "status", "coffee_species"],
              model: db.CoffeeVariety,
              as: "CoffeeVariety"         
            },
            {
              attributes: ["id", "name", "status"],
              model: db.CoffeeSpecies,
              as: "coffeeSpecies"         
            },
            {
              attributes: ["id", "date", "seedling_id", 'coffee_species', 'no_of_coffee_trees', 'comment'],
              model: db.ManageTrees,
              as: "manageTreesData",
              includes: [
                {
                  attributes: ["id", "name", "status", "coffee_species"],
                  model: db.CoffeeVariety,
                  as: "CoffeeVariety"         
                },
              ]
            },
          ]
        })

        return res.json(
          successRespSync({
            msg: "Seedling data updated successfully",
            data: response,
          })
        );
      }
    } catch (error) {
      await transaction.rollback();
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /coffee/farmers/seedling:
 *   get:
 *     description: Get Seedling Data
 *     tags: [Coffee-seedling]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *      - in: query
 *        name: page
 *        schema:
 *          type: string
 *      - in: query
 *        name: limit
 *        schema:
 *          type: string
 *      - in: query
 *        name: searchPhrase
 *        schema:
 *          type: string
 *      - in: query
 *        name: coffeeVariety
 *        schema:
 *          type: string
 *      - in: query
 *        name: coffeeSpecies
 *        schema:
 *          type: string
 *      - in: query
 *        name: order
 *        schema:
 *          type: string
 *      - in: query
 *        name: orderType
 *        schema:
 *          type: string
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
 *
 */
router.get("/", auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;

    // Filters
    let where = {
      [Op.and]: [
        {
          user_id: userId,
          is_deleted: false,
        },
      ],
    };
    let query = {};
    query.order = [];
    let {
      page,
      limit,
      searchPhrase,
      coffeeVariety,
      coffeeSpecies,
      order,
      orderType,
    } = req.query;
    if (!order) {
      query.order.push(["createdAt", "DESC"]);
    } else {
      query.order.push([order, orderType]);
    }

    if (searchPhrase) {
      where.source_of_seeds = {
        [Op.like]: `%${searchPhrase}%`,
      };
    }
    // if( plantationName && plantationName != "All"){
    //   where.plantation_name = {
    //     [Op.in]: plantationName
    //   }
    // }
    if (coffeeVariety && coffeeVariety != "All") {
      where.coffee_variety = {
        [Op.in]: coffeeVariety,
      };
    }
    if (coffeeSpecies && coffeeSpecies != "All") {
      where.coffee_species = {
        [Op.in]: coffeeSpecies,
      };
    }
    query.where = where;
    if (page && limit) {
      page = parseInt(page);
      limit = parseInt(limit);
      query.offset = (page - 1) * limit;
      query.limit = limit;
    }

    // count number of plantations
    const count = await db.Seedlings.count({
      ...query,
    });

    const response = await db.Seedlings.findAll({
      ...query,
      attributes: {
        exclude: ["updatedAt"],
      },
      include: [
        {
          model: db.Plantations,
          as: 'plantations',
          through: { attributes: [] },
        },
        {
          attributes: ["id", "date", "seedling_id", 'coffee_species', 'no_of_coffee_trees', 'comment'],
          model: db.ManageTrees,
          as: "manageTreesData",
          includes: [
            {
              attributes: ["id", "name", "status", "coffee_species"],
              model: db.CoffeeVariety,
              as: "CoffeeVariety"         
            },
          ]
        },
        {
          attributes: ["id", "name", "status", "coffee_species"],
          model: db.CoffeeVariety,
          as: "coffeeVariety"         
        },
        {
          attributes: ["id", "name", "status"],
          model: db.CoffeeSpecies,
          as: "coffeeSpecies"         
        }
      ]
    })

    let responseData = response.map((item) => {
      let tempItem = JSON.parse(JSON.stringify(item));

      return {
        ...tempItem,
      };
    });

    if (!response) {
      return res.json(
        errorRespSync({
          msg: "Seedlings data not found.",
        })
      );
    } else {
      const { lang } = req?.headers;

      if (lang && lang !== "en") {
        responseData = req.translateFunction(
          responseData,
          globalTranslationCache,
          {
            lvl2: true,
            moduleName: "coffee/seedlings",
          }
        );
      }
      return res.json(
        successRespSync({
          msg: "Seedlings data successfully fetched.",
          data: {
            count,
            responseData,
          },
        })
      );
    }
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /coffee/farmers/seedling/bear-fruit-status:
 *   put:
 *     description: update bearing status for plantation seedling
 *     tags: [Coffee-seedling]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            example: { "seedlingId": "1", "plantationId": "2", "no_of_coffee_trees": "22", "time_to_bear_fruit": "2022-02-02", "bearing_fruit_status": "" }
 *            schema:
 *              type: object
 *              properties:
 *                seedlingId:
 *                  type: integer
 *                plantationId:
 *                  type: integer
 *                no_of_coffee_trees:
 *                  type: integer
 *                time_to_bear_fruit:
 *                  type: date
 *                bearing_fruit_status:
 *                  type: string
 *                  enum: [producing_fruits,need_more_time]
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               example: { "success": true, "code": 200, "message": "Seedling data updated successfully", "data": { "id": 1, "no_of_coffee_trees": "22", "time_to_bear_fruit": "2022-02-02", "bearing_fruit_status": null, "updatedAt": "2022-12-20T06:52:37.391Z" } }
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                   code:
 *                     type: integer
 *                   message:
 *                     type: string
 */
router.put(
  "/bear-fruit-status",
  auth,
  validationErrorHandler,
  async function (req, res) {
    try {
      const userId = req.user.id;
      let {
        plantationId,
        seedlingId,
        no_of_coffee_trees,
        time_to_bear_fruit,
        bearing_fruit_status,
      } = req.body;

      // find the seedling data
      const [plantation, seedling] = await Promise.all([
        db.Plantations.findOne({
          attributes: ["id", "plantationStatus"],
          where: {
            id: plantationId,
            is_deleted: false,
            user_id: userId,
          },
        }),
        db.Seedlings.findOne({
          attributes: [
            "id",
            "no_of_coffee_trees",
            "time_to_bear_fruit",
            "bearing_fruit_status",
          ],
          where: {
            id: seedlingId,
            is_deleted: false,
            user_id: userId,
          },
        }),
      ]);
      if (plantation === null) throw new Error("plantation not found");
      if (seedling === null) throw new Error("seedling not found");

      // update record
      const setPlantation = { plantationStatus: "active" };
      const setMapSeedlingPlantation = {
        bearingFruitStatus: bearing_fruit_status,
        timeToBearFruit: time_to_bear_fruit,
        producedCoffeeTreeCount: no_of_coffee_trees,
      };
      removeEmptyValuesFromObject(setMapSeedlingPlantation);

      var transaction = await db.sequelize.transaction();

      // update bearing information
      await db.MapPlantationSeedling.update(setMapSeedlingPlantation, {
        where: {
          plantationId,
          seedlingId,
        },
        transaction,
      });

      // mark plantation active if met condition
      if (
        plantation.plantationStatus != "active" &&
        !_.isEmpty(no_of_coffee_trees)
      )
        await plantation?.set(setPlantation).save({ transaction });

      await transaction.commit();

      return res.json(
        successRespSync({
          msg: "Seedling data updated successfully",
        })
      );
    } catch (err) {
      await transaction?.rollback();
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /coffee/farmers/seedling/{id}:
 *   put:
 *     description: Edit/Update Seedling Data
 *     tags: [Coffee-seedling]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            example: { "seedlingDate": "07/10/2022", "coffeeVariety": 8, "coffeeSpecies": 8, "seedProducer": "Seedling Producer", "originOfTheSeeds": "Japan", "noOfSeeds": 300, "recordId": "seedlingRecordId3" }
 *            schema:
 *              type: object
 *              properties:
 *                originOfTheSeeds:
 *                  type: string
 *                seedProducer:
 *                  type: string
 *                coffeeSpecies:
 *                  type: integer
 *                coffeeVariety:
 *                  type: integer
 *                seedlingDate:
 *                  type: string
 *                noOfSeeds:
 *                  type: integer
 *                recordId:
 *                  type: string
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
 */
router.put("/:id", auth,
  createSeedlingValidations(),
  validationErrorHandler,
  async function (req, res) {
    let transaction = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      const { id } = req.params;
      let {
        seedlingDate,
        coffeeVariety = "",
        coffeeSpecies = "",
        seedProducer,
        originOfTheSeeds,
        noOfSeeds,
        recordId,
      } = req.body;

      let set = {
        seedling_date: seedlingDate,
        coffee_species: coffeeSpecies,
        no_of_seeds: noOfSeeds,
        seed_producer: seedProducer,
        origin_of_the_seeds: originOfTheSeeds,
      };

      const seedlingExists = await db.Seedlings.findOne({
        where: {
          id,
          is_deleted: false,
          user_id: userId,
        },
      });
      if (seedlingExists) {
        await db.Seedlings.update(set, {
          where: { id },
          transaction,
        });

        if (coffeeVariety && coffeeVariety.length > 0) {
          const seedingVarietyObj = coffeeVariety.map((variety_id) => {
            return {
              coffee_seeding_id: id,
              coffee_variety_id: variety_id,
            };
          });
          await db.CoffeeSeedingVarieties.bulkCreate(seedingVarietyObj, {
            transaction,
          });
        }

        await transaction.commit();

        const response = await db.Seedlings.findAll({
          where: {
            id,
          },
          include: [
            {
              attributes: ["id", "name", "status", "coffee_species"],
              model: db.CoffeeVariety,
              as: "CoffeeVariety"         
            },
            {
              attributes: ["id", "name", "status"],
              model: db.CoffeeSpecies,
              as: "coffeeSpecies",
            },
            {
              attributes: [
                "id",
                "date",
                "seedling_id",
                "coffee_species",
                "no_of_coffee_trees",
                "comment",
              ],
              model: db.ManageTrees,
              as: "manageTreesData",
              includes: [
                {
                  attributes: ["id", "name", "status", "coffee_species"],
                  model: db.CoffeeVariety,
                  as: "CoffeeVariety"         
                },
              ],
            },
          ],
        });

        return res.json(
          successRespSync({
            msg: "Seedling data updated successfully",
            data: response,
          })
        );
      } else {
        await transaction.rollback();
        return res.json(
          errorRespSync({
            msg: "Seedling data not found",
          })
        );
      }
    } catch (error) {
      await transaction.rollback();
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /coffee/farmers/seedling:
 *   delete:
 *     description: delete Seedling Data
 *     tags: [Coffee-seedling]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
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
 *
 */
router.delete("/:id", auth, async function (req, res) {
  let transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;
    const response = await db.Seedlings.update(
      { is_deleted: true },
      {
        where: { id },
        transaction,
      }
    );

    if (response && response[0] === 1) {
      await transaction.commit();
      return res.json(
        successRespSync({
          msg: "Seedling data has been deleted.",
        })
      );
    } else {
      await transaction.rollback();
      return res.json(
        errorRespSync({
          msg: "Seedling data not found",
          code: 500,
        })
      );
    }
  } catch (error) {
    await transaction.rollback();
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /coffee/farmers/seedling/getDropdownData:
 *   get:
 *     description: Get All Dynamic data for dropdowns
 *     tags: [Coffee-seedling]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
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
 *
 */
router.get("/getDropdownData", auth, translation, async function (req, res) {
  try {
    const userId = req.user.id;
    const coffeeVariety = await db.CoffeeVariety.findAll({
      group: ["name"],
      distinct: true,
      attributes: ["id", "name", "status", "coffee_species"],
      where: {
        [Op.or]: [
          { "$user.organization$": req.user.organization },
          { created_by: null },
        ],
        isDeleted: false,
      },
      include: [
        {
          model: db.user,
          as: "user",
          required: false,
          attributes: ["id"],
        },
      ],
    });
    sortCoffeeVarieties(coffeeVariety);
    const coffeeSpecies = await db.CoffeeSpecies.findAll({
      group: ["name"],
      distinct: true,
      attributes: ["id", "name", "status"],
      where: {
        [Op.or]: [
          { "$user.organization$": req.user.organization },
          { created_by: null },
        ],
        isDeleted: false,
      },
      include: [
        {
          model: db.user,
          as: "user",
          required: false,
          attributes: ["id"],
        },
      ],
    });
    let responseData = {
      coffeeVariety,
      coffeeSpecies,
    };

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      responseData = req.translateFunction(
        responseData,
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "coffee/seedlings",
        }
      );
    }

    return res.json(
      successRespSync({
        msg: "Dropdown data fetched successfully.",
        data: {
          ...responseData,
        },
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /coffee/farmers/seedling:
 *   post:
 *     description: Add seedling to plantation
 *     tags: [Coffee-seedling]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                noOfCoffeeTrees:
 *                  type: integer
 *                date:
 *                  type: string
 *                seedlingId:
 *                  type: integer
 *                plantationId:
 *                  type: integer
 *            example: { "date": "07/10/2022", "noOfCoffeeTrees": 300, "seedlingId": 27, "plantationId": 66 }
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
 */
router.post("/addSeedlingToPlantation", auth, translation, async function (req, res) {
  const transaction = await db.sequelize.transaction()
  try {
    let {
      plantationId,
      seedlingId,
      date,
      noOfCoffeeTrees
    } = req.body

      const seedling = await db.Seedlings.findOne({
        where: {
          [Op.or]: [
            {
              id: seedlingId,
            },
            { recordId: seedlingId },
          ],
        },
      });


      const plantation = await db.Plantations.findOne({
        where: {
          [Op.or]: [
            {
              id: plantationId,
            },
            { recordId: plantationId },
          ],
        },
      });

      if (seedling && plantation) {
        const response = await db.ManageTrees.create(
          {
            plantation_id: plantation.id,
            seedling_id: seedling.id,
            date,
            no_of_coffee_trees: noOfCoffeeTrees || 0,
          },
          { transaction }
        );

        const currentTreesCount = plantation.no_of_coffee_trees;

        await db.Plantations.update(
          {
            no_of_coffee_trees: Number(currentTreesCount) + Number(noOfCoffeeTrees || 0),
          },
          {
            where: { id: plantation.id },
            transaction,
          }
        );

        // map plantation and seedlings
        await db.MapPlantationSeedling.upsert(
          {
            plantationId: plantation.id,
            seedlingId: seedling.id,
          },
          { transaction }
        );

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: `Seedling added to Plantation.`,
            data: response,
          })
        );
      } else {
        return serverError(res, { message: "Seedling and Plantation doesn't exists" })
      }
    } catch (error) {
      await transaction.rollback();
      return serverError(res, error);
    }
  }
);

module.exports = router;
