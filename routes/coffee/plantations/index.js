const express = require("express");
const moment = require("moment");
const { body } = require("express-validator");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const fileUpload = require(rootPath + "/middleware/file_upload");
const S3 = require(rootPath + "/components/s3upload");
const { deleteFileS3 } = require("../../../helpers/aws_s3");
const _ = require("lodash");
const {
  createPlantationValidations,
  updatePlantationValidations,
  markStatusValidation,
} = require("../../../helpers/validation");
const insertTraceabilityExternalId = require(rootPath +
  "/helpers/externalTracebilityId");
const validationErrorHandler = require("../../../middleware/validation_error_handler");
const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const {} = require("../../../models");
const db = require(rootPath + "/models");
const { Op, literal } = require("sequelize");
const { getCalculatedPlantationStatus } = require("./utils");

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
 * /coffee/farmers/plantation:
 *   post:
 *     description: Create Plantation
 *     tags: [Coffee-plantation]
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
 *            example: { "plantationName": "Sujan plantation 3", "farmIds": [ 2680 ], "segmentIds": [], "recordId": 123123123133211231231233111119, "coffeeVariety": 8, "coffeeSpecies": 8, "shadeTree": [ { "id": 5, "numberOfTrees": 32 }, { "id": 6, "numberOfTrees": 33 } ], "windBreakerTree": [ { "id": 13, "numberOfTrees": 42 }, { "id": 14, "numberOfTrees": 43 } ], "coffeeLandArea": 100, "horticultureInformation": [ { "id": 7, "numberOfTrees": 52 } ], "expectedYield": 200, "images": [{ "s3_key": "4ddf6f73-fab5-43e2-8c9f-b641fc2efe47.1656590556705.png" }], "noOfCoffeeTrees": 111, "seedlingId": 48, "bearingFruitStatus": true, "noOfTreeBearingFruit": null, "timeToBearFruit": null }
 *            schema:
 *              type: object
 *              properties:
 *                plantationName:
 *                    type: string
 *                farmIds:
 *                    type: array
 *                    items:
 *                        type: integer
 *                segmentIds:
 *                    type: array
 *                    items:
 *                        type: integer
 *                recordId:
 *                    type: string
 *                coffeeVariety:
 *                    type: integer
 *                coffeeSpecies:
 *                    type: integer
 *                shadeTree:
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                            id:
 *                                type: integer
 *                            numberOfTrees:
 *                                type: integer
 *
 *                windBreakerTree:
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                            id:
 *                                type: integer
 *                            numberOfTrees:
 *                                type: integer
 *                coffeeLandArea:
 *                    type: float
 *                horticultureInformation:
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                            id:
 *                                type: integer
 *                            numberOfTrees:
 *                                type: integer
 *                expectedYield:
 *                    type: float
 *                images:
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                            s3_key:
 *                                type: string
 *                noOfCoffeeTrees:
 *                    type: integer
 *                seedlingId:
 *                    type: integer
 *                bearingFruitStatus:
 *                    type: boolean
 *                noOfTreeBearingFruit:
 *                    type: integer
 *                timeToBearFruit:
 *                    type: integer
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
router.post(
  "/",
  auth,
  createPlantationValidations(),
  validationErrorHandler,
  async function (req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      const organization = req.user.organization;
      let {
        plantationName,
        farmIds,
        segmentIds,
        coffeeVariety,
        coffeeSpecies,
        noOfCoffeeTrees,
        shadeTree,
        windBreakerTree,
        horticultureInformation,
        expectedYield,
        recordId,
        images,
        seedlingId,
        bearingFruitStatus,
        noOfTreeBearingFruit,
        timeToBearFruit,
        isExistingPlantation,
      } = req.body;

      const isRecordIdExists = await db.Plantations.findOne({
        where: {
          recordId,
          is_deleted: false,
          user_id: userId,
        },
      });

      const calculatedStatus = await getCalculatedPlantationStatus(
        userId,
        organization
      );

      if (!isRecordIdExists) {
        const response = await db.Plantations.create(
          {
            user_id: userId,
            plantation_name: plantationName,
            coffee_species: coffeeSpecies,
            expected_yield: expectedYield,
            no_of_coffee_trees: noOfCoffeeTrees,
            time_to_bear_fruit: timeToBearFruit,
            bearing_fruit_status: bearingFruitStatus,
            no_of_trees_bearing_fruit: noOfTreeBearingFruit,
            isExistingPlantation: isExistingPlantation || false,
            status: calculatedStatus.status,
            plantationStatus: calculatedStatus.plantationStatus,
            recordId,
          },
          { transaction }
        );

        if (response) {
          if (coffeeVariety && coffeeVariety.length > 0) {
            const plantationVarietyObj = coffeeVariety.map((variety_id) => {
              return {
                coffee_plantation_id: response.id,
                coffee_variety_id: variety_id,
              };
            });
            await db.CoffeePlantationVarieties.bulkCreate(
              plantationVarietyObj,
              { transaction }
            );
          }
          if (farmIds && farmIds.length > 0) {
            // Check if farm belongs to user
            const farmDataDataPromises = farmIds.map(async (_farmId) => {
              const _farm = await db.user_farm.findOne({
                where: {
                  [Op.and]: [
                    {
                      [Op.or]: [
                        { id: _farmId}, 
                        { recordId: _farmId }
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
              if (_farm) {
                return {
                  farm_id: _farm.id,
                  plantation_id: response.id,
                };
              }
            });
            
            const farmData = await Promise.all(farmDataDataPromises);

            await db.PlantationsUserFarmsMap.bulkCreate(farmData, {
              transaction,
            });
          }
          if (segmentIds && segmentIds.length > 0) {
            // Check if farm belongs to user
            const segmentsDataPromises = segmentIds.map(async (segmentId) => {
              const segment = await db.Geofence.findOne({
                where: {
                  [Op.or]: [{ id: segmentId }, { recordId: segmentId }]
                }
              });
              if (segment) {
                return {
                  segment_id: segment.id,
                  plantation_id: response.id,
                };
              }
            });
            const segmentData = await Promise.all(segmentsDataPromises);
            await db.PlantationsGeofenceMap.bulkCreate(segmentData, {
              transaction,
            });
          }
          if (shadeTree) {
            let shadeTreeData = [];
            shadeTree.forEach((item) => {
              shadeTreeData.push({
                plantation_id: response.id,
                shade_tree_id: item.id,
                number_of_trees: item.numberOfTrees,
              });
            });
            await db.ShadeTreeMapData.bulkCreate(shadeTreeData, {
              transaction,
            });
          }
          if (windBreakerTree) {
            let windBreakerTreeData = [];
            windBreakerTree.forEach((item) => {
              windBreakerTreeData.push({
                plantation_id: response.id,
                wind_breaker_tree_id: item.id,
                number_of_trees: item.numberOfTrees,
              });
            });
            await db.WindBreakerTreeMapData.bulkCreate(windBreakerTreeData, {
              transaction,
            });
          }
          if (horticultureInformation) {
            let horticultureInformationData = [];
            horticultureInformation.forEach((item) => {
              horticultureInformationData.push({
                plantation_id: response.id,
                horticulture_information_id: item.id,
                number_of_trees: item.numberOfTrees,
              });
            });
            await db.HorticultureInformationMapData.bulkCreate(
              horticultureInformationData,
              { transaction }
            );
          }
          if (images && images.length > 0) {
            let filesArr = [];

            images.forEach(async (res, index) => {
              filesArr.push({
                plantation_id: response.id,
                s3_key: res.s3_key,
                file_name: `${
                  process.env.PUBLIC_BUCKET_URL ||
                  "https://dimitra-public-images.s3.amazonaws.com/"
                }${res.s3_key}`,
              });
            });
            await db.CoffeeLandImages.bulkCreate(filesArr, { transaction });
          }
          if (seedlingId) {
            const manageTrees = await db.ManageTrees.create(
              {
                plantation_id: response.id,
                seedling_id: seedlingId,
                date: timeToBearFruit,
                coffee_species: coffeeSpecies,
                no_of_coffee_trees: noOfCoffeeTrees,
                comment: `Plantation created with Seedling Lot no: ${seedlingId}`,
              },
              { transaction }
            );
            if (coffeeVariety && coffeeVariety.length > 0) {
              const manageTreesVarietyObj = coffeeVariety.map((variety_id) => {
                return {
                  manage_trees_id: manageTrees.id,
                  coffee_variety_id: variety_id,
                };
              });
              await db.ManageTreesVarieties.bulkCreate(manageTreesVarietyObj, {
                transaction,
              });
            }
            await db.Seedlings.update(
              { seedlingStatus: "completed" },
              { where: { id: seedlingId }, transaction }
            );
            await db.MapPlantationSeedling.upsert(
              {
                plantationId: response.id,
                seedlingId,
                date: timeToBearFruit,
                timeToBearFruitStatus: bearingFruitStatus,
              },
              { transaction }
            );
          }
          const externalId = await insertTraceabilityExternalId(
            "coffee_plantation",
            response.id
          );

          if (externalId) {
            await db.Plantations.update(
              {
                external_traceability_id: externalId.id,
              },
              {
                where: { id: response.id },
                transaction,
              }
            );
          }
        }
        await transaction.commit();
        return res.json(
          successRespSync({
            msg: "Plantation has been created.",
            data: response,
          })
        );
      } else {
        let { id } = await db.Plantations.findOne({
          attributes: ["id"],
          where: {
            recordId,
          },
        });

        let set = {
          plantation_name: plantationName,
          coffee_species: coffeeSpecies,
          no_of_coffee_trees: noOfCoffeeTrees,
          time_to_bear_fruit: timeToBearFruit,
          bearing_fruit_status: bearingFruitStatus,
          no_of_trees_bearing_fruit: noOfTreeBearingFruit,
          expected_yield: expectedYield,
          recordId,
        };
        await db.Plantations.update(set, {
          where: { id },
          transaction,
        });
        if (coffeeVariety && coffeeVariety.length > 0) {
          const plantationVarietyObj = coffeeVariety.map((variety_id) => {
            return {
              coffee_plantation_id: id,
              coffee_variety_id: variety_id,
            };
          });
          await db.CoffeePlantationVarieties.bulkCreate(plantationVarietyObj, {
            transaction,
          });
        }

        if (farmIds && farmIds.length > 0) {
          // Check if farm belongs to user
          const farmDataDataPromises = farmIds.map(async (_farmId) => {
            const _farm = await db.user_farm.findOne({
              where: {
                [Op.and]: [
                  {
                    [Op.or]: [
                      { id: _farmId}, 
                      { recordId: _farmId }
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
            if (_farm) {
              return {
                farm_id: _farm.id,
                plantation_id: response.id,
              };
            }
          });
          const farmData = await Promise.all(farmDataDataPromises);
          await db.PlantationsUserFarmsMap.destroy({
            where: {
              plantation_id: id,
            },
          });
          await db.PlantationsUserFarmsMap.bulkCreate(farmData, {
            transaction,
          });
        }
        if (segmentIds && segmentIds.length > 0) {
          // Check if farm belongs to user
          const segmentsDataPromises = segmentIds.map(async (segmentId) => {
            const segment = await db.Geofence.findOne({
              where: {
                [Op.or]: [{ id: segmentId }, { recordId: segmentId }]
              }
            });
            if (segment) {
              return {
                segment_id: segment.id,
                plantation_id: response.id,
              };
            }
          });
          const segmentData = await Promise.all(segmentsDataPromises);
          await db.PlantationsGeofenceMap.destroy({
            where: {
              plantation_id: id,
            },
          });
          await db.PlantationsGeofenceMap.bulkCreate(segmentData, {
            transaction,
          });
        }
        if (shadeTree) {
          await db.ShadeTreeMapData.destroy({
            where: {
              plantation_id: id,
            },
          });
          let shadeTreeData = [];
          shadeTree.forEach((item) => {
            shadeTreeData.push({
              plantation_id: id,
              shade_tree_id: item.id,
              number_of_trees: item.numberOfTrees,
            });
          });
          await db.ShadeTreeMapData.bulkCreate(shadeTreeData, { transaction });
        }
        if (windBreakerTree) {
          await db.WindBreakerTreeMapData.destroy({
            where: {
              plantation_id: id,
            },
          });
          let windBreakerTreeData = [];
          windBreakerTree.forEach((item) => {
            windBreakerTreeData.push({
              plantation_id: id,
              wind_breaker_tree_id: item.id,
              number_of_trees: item.numberOfTrees,
            });
          });
          await db.WindBreakerTreeMapData.bulkCreate(windBreakerTreeData, {
            transaction,
          });
        }
        if (horticultureInformation) {
          await db.HorticultureInformationMapData.destroy({
            where: {
              plantation_id: id,
            },
          });
          let horticultureInformationData = [];
          horticultureInformation.forEach((item) => {
            horticultureInformationData.push({
              plantation_id: id,
              horticulture_information_id: item.id,
              number_of_trees: item.numberOfTrees,
            });
          });
          await db.HorticultureInformationMapData.bulkCreate(
            horticultureInformationData,
            { transaction }
          );
        }
        // if (images && images.length > 0) {
        //   filesArr = [];
        //   // Deleting Existing files from S3
        //   const images = await db.CoffeeLandImages.findAll({
        //     where: {
        //       plantation_id: id,
        //     },
        //   });
        //   if (images && images.length > 0) {
        //     images.forEach(async (item) => {
        //       // file to be deleted
        //       var param = {
        //         Bucket: process.env.AWS_PUBLIC_BUCKET,
        //         Key: item.s3_key,
        //       };
        //       await deleteFileS3(param);
        //     });
        //     await db.CoffeeLandImages.destroy({
        //       where: {
        //         plantation_id: id,
        //       },
        //     });
        //   }

        //   images.forEach(async (res, index) => {
        //     filesArr.push({
        //       plantation_id: id,
        //       file_name: `${
        //         process.env.PUBLIC_BUCKET_URL ||
        //         "https://dimitra-public-images.s3.amazonaws.com/"
        //       }${res.s3_key}`,
        //       s3_key: res.s3_key,
        //     });
        //   });
        //   await db.CoffeeLandImages.bulkCreate(filesArr, { transaction });
        // }

        await transaction.commit();

        const response = await db.Plantations.findOne({
          attributes: [
            "id",
            "user_id",
            "plantation_name",
            "no_of_coffee_trees",
            "time_to_bear_fruit",
            "bearing_fruit_status",
            "no_of_trees_bearing_fruit",
            "expected_yield",
            "is_deleted",
            "recordId",
            "createdAt",
            "updatedAt",
          ],
          where: {
            id,
          },
          include: [
            {
              model: db.user_farm,
              as: "userFarms",
              through: {
                model: db.PlantationsUserFarmsMap,
                attributes: ["id", "farm_id"],
              },
              attributes: ["farmName"],
            },
            {
              model: db.Geofence,
              as: "segments",
              through: {
                model: db.PlantationsGeofenceMap,
                attributes: ["id", "segment_id"],
              },
              attributes: ["geofenceName"],
            },
            {
              attributes: ["id", "name", "status", "coffee_species"],
              model: db.CoffeeVariety,
              as: "CoffeeVariety",
            },
            {
              attributes: ["id", "name", "status"],
              model: db.CoffeeSpecies,
              as: "coffeeSpecies",
            },
            {
              model: db.ShadeTree,
              as: "shadeTree",
              through: {
                model: db.ShadeTreeMapData,
                attributes: ["id", "number_of_trees"],
              },
              attributes: ["name", "status"],
            },
            {
              model: db.WindBreaker,
              as: "windBreakerTree",
              through: {
                model: db.WindBreakerTreeMapData,
                attributes: ["id", "number_of_trees"],
              },
              attributes: ["name", "status"],
            },
            {
              model: db.HorticultureInformation,
              as: "horticultureInformation",
              through: {
                model: db.HorticultureInformationMapData,
                attributes: ["id", "number_of_trees"],
              },
              attributes: ["name", "status"],
            },
            {
              attributes: ["id", "file_name", "s3_key"],
              model: db.CoffeeLandImages,
              as: "coffeeLandImages",
            },
          ],
        });

        return res.json(
          successRespSync({
            msg: "Plantation data updated successfully.",
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
 * /coffee/farmers/plantation:
 *   get:
 *     description: Get Plantation Data
 *     tags: [Coffee-plantation]
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
 *        name: plantationName
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
 *               example: { "success": true, "code": 200, "message": "Plantations data successfully fetched.", "data": { "count": 3, "responseData": [ { "id": 2, "user_id": 17, "plantation_name": "", "coffee_variety": null, "coffee_species": null, "no_of_coffee_trees": 1000, "expected_yield": 11, "bearing_fruit_status": false, "time_to_bear_fruit": null, "no_of_trees_bearing_fruit": null, "recordId": null, "plantationStatus": "active", "createdAt": null, "rejection_reason": null, "userFarms": [], "segments": [], "manageTreesData": [ { "id": 10, "date": "2022-02-02T00:00:00.000Z", "seedling_id": 1, "coffee_species": 8, "coffee_variety": 7, "no_of_coffee_trees": 10, "comment": "nothing special", "seedling": { "id": 1, "seedling_date": "2022-07-09T18:30:00.000Z", "coffee_variety": 8, "coffee_species": 8, "no_of_seeds": 300, "origin_of_the_seeds": "Japan", "seed_producer": "Seedling Producer", "is_deleted": false, "no_of_coffee_trees": 22, "time_to_bear_fruit": "2022-02-02", "bearing_fruit_status": null, "seedlingStatus": "completed", "recordId": null, "createdAt": null, "coffeeVariety": { "id": 8, "name": "Hibrido de Timor (HDT, Cross breed Arabica-Robusta; Tim-tim, Aceh)", "status": "Active", "coffee_species": 8 }, "coffeeSpecies": { "id": 8, "name": "Arabica", "status": "Active" } } } ], "coffeeVariety": null, "coffeeSpecies": null, "shadeTree": [], "windBreakerTree": [], "horticultureInformation": [], "coffeeLandImages": [] } ] } }
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
      plantationName,
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
      where.plantation_name = {
        [Op.like]: `%${searchPhrase}%`,
      };
    }
    if (plantationName && plantationName != "All") {
      where.plantation_name = {
        [Op.in]: plantationName,
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
    const count = await db.Plantations.count({
      ...query,
    });

    const response = await db.Plantations.findAll({
      ...query,
      attributes: {
        exclude: ["updatedAt", "status", "coffee_species", "is_deleted"],
      },
      include: [
        {
          model: db.Seedlings,
          as: "seedlings",
          through: {
            attributes: [
              "bearingFruitStatus",
              "timeToBearFruit",
              "producedCoffeeTreeCount",
            ],
          },
          attributes: {
            exclude: [
              "updatedAt",
              "is_deleted",
              "coffee_species",
              "no_of_coffee_trees",
              "time_to_bear_fruit",
              "bearing_fruit_status",
            ],
          },
          include: [
            {
              attributes: ["id", "name", "status", "coffee_species"],
              model: db.CoffeeVariety,
              as: "coffeeVariety",
            },
            {
              attributes: ["id", "name", "status"],
              model: db.CoffeeSpecies,
              as: "coffeeSpecies",
            },
          ],
        },
        {
          model: db.user_farm,
          as: "userFarms",
          through: {
            model: db.PlantationsUserFarmsMap,
            attributes: ["id", "farm_id"],
          },
          attributes: ["farmName"],
        },
        {
          model: db.Geofence,
          as: "segments",
          through: {
            model: db.PlantationsGeofenceMap,
            attributes: ["id", "segment_id"],
          },
          attributes: ["geofenceName"],
          include: [
            {
              model: db.user_farm,
              as: "farm",
              attributes: ["id", "farmName"],
            },
          ],
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
          include: [
            {
              model: db.CoffeeVariety,
              as: "CoffeeVariety",
              attributes: ["id", "name", "status", "coffee_species"],
            },
          ],
        },
        {
          attributes: ["id", "name", "status", "coffee_species"],
          model: db.CoffeeVariety,
          as: "CoffeeVariety",
        },
        {
          attributes: ["id", "name", "status"],
          model: db.CoffeeSpecies,
          as: "coffeeSpecies",
        },
        {
          model: db.ShadeTree,
          as: "shadeTree",
          through: {
            model: db.ShadeTreeMapData,
            attributes: ["id", "number_of_trees"],
          },
          attributes: ["id", "name", "status"],
        },
        {
          model: db.WindBreaker,
          as: "windBreakerTree",
          through: {
            model: db.WindBreakerTreeMapData,
            attributes: ["id", "number_of_trees"],
          },
          attributes: ["id", "name", "status"],
        },
        {
          model: db.HorticultureInformation,
          as: "horticultureInformation",
          through: {
            model: db.HorticultureInformationMapData,
            attributes: ["id", "number_of_trees"],
          },
          attributes: ["id", "name", "status"],
        },
        {
          attributes: ["id", "file_name", "s3_key"],
          model: db.CoffeeLandImages,
          as: "coffeeLandImages",
        },
      ],
    });

    let responseData = response.map((item) => {
      let tempItem = JSON.parse(JSON.stringify(item));
      let externalQR=`https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${item.external_traceability_id}`
      return {
        ...tempItem,
        external_traceability_link:externalQR,
        userFarms: tempItem.userFarms.map((uf) => ({
          ...uf.PlantationsUserFarmsMap,
          name: uf.farmName,
        })),
        segments: tempItem.segments.map((s) => ({
          ...s.PlantationsGeofenceMap,
          name: s.geofenceName,
          farm: {
            ...s.farm,
          },
        })),
        shadeTree: tempItem.shadeTree.map((st) => ({
          ...st.ShadeTreeMapData,
          id: st.id,
          name: st.name,
          status: st.status,
          number_of_trees: st.ShadeTreeMapData.number_of_trees,
          shade_tree_map_data_id: st.ShadeTreeMapData.id,
        })),
        windBreakerTree: tempItem.windBreakerTree.map((wbt) => ({
          id: wbt.id,
          name: wbt.name,
          status: wbt.status,
          number_of_trees: wbt.WindBreakerTreeMapData.number_of_trees,
          wind_breaker_tree_map_data_id: wbt.WindBreakerTreeMapData.id,
        })),
        horticultureInformation: tempItem.horticultureInformation.map((hi) => ({
          id: hi.id,
          name: hi.name,
          status: hi.status,
          number_of_trees: hi.HorticultureInformationMapData.number_of_trees,
          horticulture_information_map_data_id:
            hi.HorticultureInformationMapData.id,
        })),
      };
    });

    if (!response) {
      return res.json(
        errorRespSync({
          msg: "Plantations data not found.",
        })
      );
    } else {
      const { lang } = req?.headers;

      if (lang && lang !== "en") {
        responseData = req.translateFunction(
          responseData,
          globalTranslationCache,
          { lvl1: true, lvl2: true, moduleName: "coffee/plantations" }
        );
      }

      return res.json(
        successRespSync({
          msg: "Plantations data successfully fetched.",
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
 * /coffee/farmers/plantation/{id}:
 *   put:
 *     description: Edit/Update Plantation Data
 *     tags: [Coffee-plantation]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            example: { "plantationName": "Sujan plantation 3", "farmIds": [ 2680 ], "segmentIds": [], "recordId": 123123123133211231231233111119, "coffeeVariety": 8, "coffeeSpecies": 8, "shadeTree": [ { "id": 5, "numberOfTrees": 32 }, { "id": 6, "numberOfTrees": 33 } ], "windBreakerTree": [ { "id": 13, "numberOfTrees": 42 }, { "id": 14, "numberOfTrees": 43 } ], "coffeeLandArea": 100, "horticultureInformation": [ { "id": 7, "numberOfTrees": 52 } ], "expectedYield": 200, "images": [{ "s3_key": "4ddf6f73-fab5-43e2-8c9f-b641fc2efe47.1656590556705.png" }], "noOfCoffeeTrees": 111, "seedlingId": 48, "bearingFruitStatus": true, "noOfTreeBearingFruit": null, "timeToBearFruit": null }
 *            schema:
 *              type: object
 *              properties:
 *                plantationName:
 *                    type: string
 *                farmIds:
 *                    type: array
 *                    items:
 *                        type: integer
 *                segmentIds:
 *                    type: array
 *                    items:
 *                        type: integer
 *                recordId:
 *                    type: string
 *                coffeeVariety:
 *                    type: integer
 *                coffeeSpecies:
 *                    type: integer
 *                shadeTree:
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                            id:
 *                                type: integer
 *                            numberOfTrees:
 *                                type: integer
 *
 *                windBreakerTree:
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                            id:
 *                                type: integer
 *                            numberOfTrees:
 *                                type: integer
 *                coffeeLandArea:
 *                    type: float
 *                horticultureInformation:
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                            id:
 *                                type: integer
 *                            numberOfTrees:
 *                                type: integer
 *                expectedYield:
 *                    type: float
 *                images:
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                            s3_key:
 *                                type: string
 *                noOfCoffeeTrees:
 *                    type: integer
 *                seedlingId:
 *                    type: integer
 *                bearingFruitStatus:
 *                    type: boolean
 *                noOfTreeBearingFruit:
 *                    type: integer
 *                timeToBearFruit:
 *                    type: integer
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
router.put(
  "/:id",
  auth,
  updatePlantationValidations(),
  validationErrorHandler,
  async function (req, res) {

    try {
      const userId = req.user.id;
      const { id } = req.params;
      let {
        plantationName,
        farmIds,
        segmentIds,
        coffeeVariety,
        coffeeSpecies,
        expectedYield,
        shadeTree,
        windBreakerTree,
        horticultureInformation,
        images,
        recordId,
        noOfCoffeeTrees,
        bearingFruitStatus,
        noOfTreeBearingFruit,
        timeToBearFruit,
        isExistingPlantation,
      } = req.body;

      let set = {
        plantation_name: plantationName,
        coffee_species: coffeeSpecies,
        expected_yield: expectedYield,
        recordId,
        no_of_coffee_trees: noOfCoffeeTrees,
        bearing_fruit_status: bearingFruitStatus,
        no_of_trees_bearing_fruit: noOfTreeBearingFruit,
        time_to_bear_fruit: timeToBearFruit,
        isExistingPlantation: isExistingPlantation || false,
      };

      const plantationExists = await db.Plantations.findOne({
        where: {
          id,
          is_deleted: false,
          user_id: userId,
        },
      });
      if (plantationExists) {
        await db.Plantations.update(set, {
          where: { id },

        });

        if (coffeeVariety && coffeeVariety.length > 0) {
          const plantationVarietyObj = coffeeVariety.map((variety_id) => {
            return {
              coffee_plantation_id: id,
              coffee_variety_id: variety_id,
            };
          });
          await db.CoffeePlantationVarieties.bulkCreate(plantationVarietyObj, {

          });
        }

        if (farmIds && farmIds.length > 0) {
          // Check if farm belongs to user
          let farmData = [];
          farmIds.forEach((item) => {
            farmData.push({
              plantation_id: id,
              farm_id: item,
            });
          });
          await db.PlantationsUserFarmsMap.destroy({
            where: {
              plantation_id: id,
            },
          });
          await db.PlantationsUserFarmsMap.bulkCreate(farmData, {

          });
        }
        if (segmentIds && segmentIds.length > 0) {
          // Check if farm belongs to user
          let segmentData = [];
          segmentIds.forEach((item) => {
            segmentData.push({
              plantation_id: id,
              segment_id: item,
            });
          });
          await db.PlantationsGeofenceMap.destroy({
            where: {
              plantation_id: id,
            },
          });
          await db.PlantationsGeofenceMap.bulkCreate(segmentData, {

          });
        }
        if (shadeTree) {
          await db.ShadeTreeMapData.destroy({
            where: {
              plantation_id: id,
            },
          });
          let shadeTreeData = [];
          shadeTree.forEach((item) => {
            shadeTreeData.push({
              plantation_id: id,
              shade_tree_id: item.id,
              number_of_trees: item.numberOfTrees,
            });
          });
          await db.ShadeTreeMapData.bulkCreate(shadeTreeData, {  });
        }
        if (windBreakerTree) {
          await db.WindBreakerTreeMapData.destroy({
            where: {
              plantation_id: id,
            },
          });
          let windBreakerTreeData = [];
          windBreakerTree.forEach((item) => {
            windBreakerTreeData.push({
              plantation_id: id,
              wind_breaker_tree_id: item.id,
              number_of_trees: item.numberOfTrees,
            });
          });
          await db.WindBreakerTreeMapData.bulkCreate(windBreakerTreeData, {

          });
        }
        if (horticultureInformation) {
          await db.HorticultureInformationMapData.destroy({
            where: {
              plantation_id: id,
            },
          });
          let horticultureInformationData = [];
          horticultureInformation.forEach((item) => {
            horticultureInformationData.push({
              plantation_id: id,
              horticulture_information_id: item.id,
              number_of_trees: item.numberOfTrees,
            });
          });
          await db.HorticultureInformationMapData.bulkCreate(
            horticultureInformationData,

          );
        }
        if (images && images.length > 0) {
          const incomingImages = images;
          let deleteImages = [];
          let uploadImages = [],
            existingImages = [];

          // Deleting Existing files from S3
          existingImages = await db.CoffeeLandImages.findAll({
            where: {
              plantation_id: id
            },
            raw: true
          });

          if (existingImages && existingImages.length > 0) {
            deleteImages = _.differenceBy(
              existingImages,
              incomingImages,
              "s3_key"
            );
            uploadImages = _.differenceBy(
              incomingImages,
              existingImages,
              "s3_key"
            );

            deleteImages.forEach(async (item) => {
              // file to be deleted
              var param = {
                Bucket: process.env.AWS_PUBLIC_BUCKET,
                Key: item.s3_key,
              };
              await deleteFileS3(param);
            });
            await db.CoffeeLandImages.destroy({
              where: {
                s3_key: {
                  [Op.in]: deleteImages.map((d) => d.s3_key),
                },
              },
            });
          }

          let filesArr = [];
          uploadImages.forEach(async (res, index) => {
            filesArr.push({
              plantation_id: id,
              s3_key: res.s3_key,
              file_name: `${
                process.env.PUBLIC_BUCKET_URL ||
                "https://dimitra-public-images.s3.amazonaws.com/"
              }${res.s3_key}`,
            });
          });
          await db.CoffeeLandImages.bulkCreate(filesArr, {  });
        } else {
          await db.CoffeeLandImages.destroy({
            where: {
              plantation_id: id
            },
          });
        }


        const response = await db.Plantations.findOne({
          attributes: [
            "id",
            "user_id",
            "plantation_name",
            "no_of_coffee_trees",
            "time_to_bear_fruit",
            "bearing_fruit_status",
            "no_of_trees_bearing_fruit",
            "expected_yield",
            "is_deleted",
            "plantationStatus",
            "isExistingPlantation",
            "recordId",
            "createdAt",
            "updatedAt",
          ],
          where: {
            id,
          },
          include: [
            {
              model: db.user_farm,
              as: "userFarms",
              through: {
                model: db.PlantationsUserFarmsMap,
                attributes: ["id", "farm_id"],
              },
              attributes: ["farmName"],
            },
            {
              model: db.Geofence,
              as: "segments",
              through: {
                model: db.PlantationsGeofenceMap,
                attributes: ["id", "segment_id"],
              },
              attributes: ["geofenceName"],
            },
            {
              attributes: ["id", "name", "status", "coffee_species"],
              model: db.CoffeeVariety,
              as: "CoffeeVariety",
            },
            {
              attributes: ["id", "name", "status"],
              model: db.CoffeeSpecies,
              as: "coffeeSpecies",
            },
            {
              model: db.ShadeTree,
              as: "shadeTree",
              through: {
                model: db.ShadeTreeMapData,
                attributes: ["id", "number_of_trees"],
              },
              attributes: ["name", "status"],
            },
            {
              model: db.WindBreaker,
              as: "windBreakerTree",
              through: {
                model: db.WindBreakerTreeMapData,
                attributes: ["id", "number_of_trees"],
              },
              attributes: ["name", "status"],
            },
            {
              model: db.HorticultureInformation,
              as: "horticultureInformation",
              through: {
                model: db.HorticultureInformationMapData,
                attributes: ["id", "number_of_trees"],
              },
              attributes: ["name", "status"],
            },
            {
              attributes: ["id", "file_name", "s3_key"],
              model: db.CoffeeLandImages,
              as: "coffeeLandImages",
            },
          ],
        });

        return res.json(
          successRespSync({
            msg: "Plantations data updated successfully",
            data: response,
          })
        );
      } else {
        return res.json(
          errorRespSync({
            msg: "Plantation data not found",
          })
        );
      }
    } catch (error) {

      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /coffee/farmers/plantation/{id}:
 *   delete:
 *     description: Delete Plantation Data
 *     tags: [Coffee-plantation]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
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
router.delete("/:id", auth, async function (req, res) {
  let transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;

    const response = await db.Plantations.update(
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
          msg: "Plantations data has been deleted.",
        })
      );
    } else {
      await transaction.rollback();
      return res.json(
        errorRespSync({
          msg: "Plantation data not found",
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
 * /coffee/farmers/plantation/getDropdownData:
 *   get:
 *     description: Get All Dynamic data for dropdowns
 *     tags: [Coffee-plantation]
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
 */
router.get("/getDropdownData", auth, translation, async function (req, res) {
  try {
    const coffeeVariety = await db.CoffeeVariety.findAll({
      // group: ['name'],
      // distinct: true,
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
    const coffeeTypes = await db.CoffeeType.findAll();
    const shadeTree = await db.ShadeTree.findAll({
      group: ["name"],
      distinct: true,
      attributes: ["id", "name", "status"],
      where: {
        [Op.or]: [
          { "$user.organization$": req.user.organization },
          { created_by: null },
        ],
        isDeleted: false
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
    const windBreakerTree = await db.WindBreaker.findAll({
      group: ["name"],
      distinct: true,
      attributes: ["id", "name", "status"],
      where: {
        [Op.or]: [
          { "$user.organization$": req.user.organization },
          { created_by: null },
        ],
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
    const horticultureInformation = await db.HorticultureInformation.findAll({
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
    const productType = await db.ParchmentProductType.findAll({
      attributes: ["id", "name"],
    });

    let responseData = {
      coffeeVariety,
      coffeeSpecies,
      shadeTree,
      windBreakerTree,
      horticultureInformation,
      coffeeTypes,
      productType,
    };

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      responseData = req.translateFunction(
        responseData,
        globalTranslationCache,
        {
          lvl1: true,
          lvl2: true,
          moduleName: "coffee/plantations",
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
 * /coffee/farmers/plantation/manageTrees/{type}:
 *   post:
 *     description: Post Manage Trees Data
 *     tags: [Coffee-plantation]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *      - in: path
 *        name: type
 *        required: true
 *        schema:
 *          type: string
 *          enum: [add,remove]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            example: { "plantationId": 66, "seedlingId": 3, "coffeeVariety": 9, "coffeeSpecies": 8, "noOfCoffeeTrees": 1000, "date": null, "comment": "Trees add test" }
 *            schema:
 *              type: object
 *              properties:
 *                plantationId:
 *                    type: integer
 *                seedlingId:
 *                    type: integer
 *                coffeeVariety:
 *                    type: integer
 *                coffeeSpecies:
 *                    type: integer
 *                noOfCoffeeTrees:
 *                    type: integer
 *                date:
 *                    type: string
 *                comment:
 *                    type: string
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
router.post("/manageTrees/:type", auth, translation, async function (req, res) {
  const transaction = await db.sequelize.transaction();
  try {
    const type = req.params.type;
    let {
      plantationId,
      seedlingId,
      date,
      coffeeSpecies,
      coffeeVariety,
      noOfCoffeeTrees,
      comment,
      bearingFruitStatus,
    } = req.body;

    const response = await db.ManageTrees.create(
      {
        plantation_id: plantationId,
        seedling_id: seedlingId,
        coffee_species: coffeeSpecies,
        date,
        no_of_coffee_trees:
          type === "add" ? noOfCoffeeTrees : noOfCoffeeTrees * -1,
        comment,
      },
      { transaction }
    );

    if (coffeeVariety && coffeeVariety.length > 0) {
      const manageTreesVarietyObj = coffeeVariety.map((variety_id) => {
        return {
          manage_trees_id: response.id,
          coffee_variety_id: variety_id,
        };
      });
      await db.ManageTreesVarieties.bulkCreate(manageTreesVarietyObj, {
        transaction,
      });
    }

    const getcurrentTreesCount = await db.Plantations.findOne({
      attributes: ["no_of_coffee_trees"],
      where: {
        id: plantationId,
      },
    });

    const currentTreesCount = getcurrentTreesCount.no_of_coffee_trees;

    if (type === "remove" && currentTreesCount - noOfCoffeeTrees < 0) {
      return res.json(
        errorRespSync({
          msg: "No of trees cannot be negative.",
        })
      );
    }

    if (type === "add") {
      await db.Plantations.update(
        {
          no_of_coffee_trees: currentTreesCount + noOfCoffeeTrees,
        },
        {
          where: { id: plantationId },
          transaction,
        }
      );
      if (seedlingId) {
        await db.Seedlings.update(
          { seedlingStatus: "completed" },
          { where: { id: seedlingId }, transaction }
        );
        await db.MapPlantationSeedling.upsert(
          {
            plantationId,
            seedlingId,
            date: date,
            timeToBearFruitStatus: bearingFruitStatus,
          },
          { transaction }
        );
      }
    } else {
      await db.Plantations.update(
        {
          no_of_coffee_trees: currentTreesCount - noOfCoffeeTrees,
        },
        {
          where: { id: plantationId },
          transaction,
        }
      );
    }
    await transaction.commit();
    return res.json(
      successRespSync({
        msg: `Trees ${type === "add" ? "added" : "removed"} successfully.`,
        data: response,
      })
    );
  } catch (error) {
    await transaction.rollback();
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /coffee/farmers/plantation/manageTrees/{plantationId}:
 *   get:
 *     description: Get Manage Trees Data
 *     tags: [Coffee-plantation]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *      - in: path
 *        name: plantationId
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               example: { "success": true, "code": 200, "message": "Dropdown data fetched successfully.", "data": [] }
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
router.get(
  "/manageTrees/:plantationId",
  auth,
  translation,
  async function (req, res) {
    try {
      const plantationId = req.params.plantationId;
      const response = await db.ManageTrees.findAll({
        where: {
          plantation_id: plantationId,
        },
      });

      return res.json(
        successRespSync({
          msg: "Dropdown data fetched successfully.",
          data: response,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

/**
 * @swagger
 * /coffee/farmers/plantation/farm/{farmId}:
 *   get:
 *     description: Get Plantation of a farm
 *     tags: [Coffee-plantation]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *      - in: path
 *        name: farmId
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *        '200':
 *           description: Success
 *           content:
 *             application/json:
 *               example: { "success": true, "code": 200, "message": "Dropdown data fetched successfully.", "data": [] }
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
router.get("/farm/:farmId/", auth, translation, async function (req, res) {
  try {
    const farmId = req.params.farmId;
    const { zoneId } = req.query;

    let zoneIdsRelatedToFarm = [];

    let farmAndZonePlantation = [];

    if (farmId) {
      const response = await db.Plantations.findAll({
        attributes: ["id", "plantation_name"],
        include: [
          {
            attributes: ["id", "name"],
            model: db.CoffeeVariety,
            as: "CoffeeVariety",
          },
          {
            attributes: ["id", "name"],
            model: db.CoffeeSpecies,
            as: "coffeeSpecies",
          },
          {
            attributes: ["farm_id"],
            model: db.PlantationsUserFarmsMap,
            as: "plantationUserFarmsMap",
            where: {
              farm_id: farmId,
            },
          },
        ],
      });

      const geoFenceIDs = await db.Geofence.findAll({
        where: {
          farmId,
        },
        attributes: ["id"],
      });

      zoneIdsRelatedToFarm = geoFenceIDs.map((zone) => zone.id);
      let allZonePlantations = [];

      if (zoneIdsRelatedToFarm && zoneIdsRelatedToFarm.length > 0) {
        allZonePlantations = await db.Plantations.findAll({
          attributes: ["id", "plantation_name"],
          include: [
            {
              attributes: ["id", "name"],
              model: db.CoffeeVariety,
              as: "CoffeeVariety",
            },
            {
              attributes: ["id", "name"],
              model: db.CoffeeSpecies,
              as: "coffeeSpecies",
            },
            {
              attributes: ["segment_id"],
              model: db.PlantationsGeofenceMap,
              as: "plantationsGeofenceMap",
              where: {
                segment_id: {
                  [Op.in]: zoneIdsRelatedToFarm,
                },
              },
            },
          ],
        });
      }

      farmAndZonePlantation = [...allZonePlantations, ...response];
    }

    // plantations by zone id

    let zonePlantations = [];
    if (zoneId) {
      zonePlantations = await db.Plantations.findAll({
        attributes: ["id", "plantation_name"],
        include: [
          {
            attributes: ["id", "name"],
            model: db.CoffeeVariety,
            as: "CoffeeVariety",
          },
          {
            attributes: ["id", "name"],
            model: db.CoffeeSpecies,
            as: "coffeeSpecies",
          },
          {
            attributes: ["segment_id"],
            model: db.PlantationsGeofenceMap,
            as: "plantationsGeofenceMap",
            where: {
              segment_id: zoneId,
            },
          },
        ],
      });
    }

    let finalRes = []
    finalRes = [...zonePlantations, ...farmAndZonePlantation]

    return res.json(
      successRespSync({
        msg: "Dropdown data fetched successfully.",
        data: finalRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

/**
 * @swagger
 * /coffee/farmers/plantation/{id}/markStatus:
 *   put:
 *     description: Update Mark Staus
 *     tags: [Coffee-plantation]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            example: { seedlingId: 2, bearingFruitStatus: "producing_fruits / need_more_time", timeToBearFruit: "2022-12-01", producedCoffeeTreeCount: 123 }
 *            schema:
 *              type: object
 *              properties:
 *                plantationId:
 *                    type: integer
 *                seedlingId:
 *                    type: integer
 *                bearingFruitStatus:
 *                    type: string
 *                timeToBearFruit:
 *                    type: string
 *                producedCoffeeTreeCount:
 *                    type: integer
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
router.put(
  "/:id/markStatus",
  auth,
  markStatusValidation(),
  validationErrorHandler,
  async function (req, res) {
    let transaction = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      const { id } = req.params;
      let {
        seedlingId,
        bearingFruitStatus,
        timeToBearFruit,
        producedCoffeeTreeCount,
      } = req.body;

      let set = {
        bearingFruitStatus,
        timeToBearFruit,
        producedCoffeeTreeCount,
      };

      const plantationExists = await db.MapPlantationSeedling.findOne({
        where: {
          plantationId: id,
          seedlingId,
        },
      });
      if (plantationExists) {
        await db.MapPlantationSeedling.update(set, {
          where: {
            plantationId: id,
            seedlingId,
          },
          transaction,
        });

        const response = await db.Plantations.findOne({
          where: { id },
          attributes: { exclude: ["updatedAt", "status", "is_deleted"] },
          include: [
            {
              model: db.Seedlings,
              as: "seedlings",
              through: {
                attributes: [
                  "bearingFruitStatus",
                  "timeToBearFruit",
                  "producedCoffeeTreeCount",
                ],
              },
              attributes: {
                exclude: [
                  "updatedAt",
                  "is_deleted",
                  "coffee_variety",
                  "coffee_species",
                  "no_of_coffee_trees",
                  "time_to_bear_fruit",
                  "bearing_fruit_status",
                ],
              },
            },
            {
              model: db.user_farm,
              as: "userFarms",
              through: {
                model: db.PlantationsUserFarmsMap,
                attributes: ["id", "farm_id"],
              },
              attributes: ["farmName"],
            },
            {
              model: db.Geofence,
              as: "segments",
              through: {
                model: db.PlantationsGeofenceMap,
                attributes: ["id", "segment_id"],
              },
              attributes: ["geofenceName"],
              include: [
                {
                  model: db.user_farm,
                  as: "farm",
                  attributes: ["id", "farmName"],
                },
              ],
            },
            {
              attributes: [
                "id",
                "date",
                "seedling_id",
                "coffee_species",
                "coffee_variety",
                "no_of_coffee_trees",
                "comment",
              ],
              model: db.ManageTrees,
              as: "manageTreesData",
            },
            {
              attributes: ["id", "name", "status", "coffee_species"],
              model: db.CoffeeVariety,
              as: "CoffeeVariety",
            },
            {
              attributes: ["id", "name", "status"],
              model: db.CoffeeSpecies,
              as: "coffeeSpecies",
            },
            {
              model: db.ShadeTree,
              as: "shadeTree",
              through: {
                model: db.ShadeTreeMapData,
                attributes: ["id", "number_of_trees"],
              },
              attributes: ["id", "name", "status"],
            },
            {
              model: db.WindBreaker,
              as: "windBreakerTree",
              through: {
                model: db.WindBreakerTreeMapData,
                attributes: ["id", "number_of_trees"],
              },
              attributes: ["id", "name", "status"],
            },
            {
              model: db.HorticultureInformation,
              as: "horticultureInformation",
              through: {
                model: db.HorticultureInformationMapData,
                attributes: ["id", "number_of_trees"],
              },
              attributes: ["id", "name", "status"],
            },
            {
              attributes: ["id", "file_name", "s3_key"],
              model: db.CoffeeLandImages,
              as: "coffeeLandImages",
            },
          ],
        });

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: "Seedlings Information data updated successfully",
            data: response,
          })
        );
      } else {
        return res.json(
          errorRespSync({
            msg: "Seedlings Information data not found",
          })
        );
      }
    } catch (error) {
      await transaction.rollback();
      return serverError(res, error);
    }
  }
);

module.exports = router;
