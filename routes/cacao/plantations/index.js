const express = require("express");
const moment = require("moment");
const { body } = require("express-validator");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const fileUpload = require(rootPath + "/middleware/file_upload");
const S3 = require(rootPath + "/components/s3upload");
const { deleteFileS3 } = require("../../../helpers/aws_s3");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
const _ = require("lodash");
const {
  createCacaoPlantationValidations,
} = require("../../../helpers/validation");
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
const insertTraceabilityExternalId = require(rootPath + "/helpers/externalTracebilityId");

const multer = require("multer");
var aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_TICKET_BUCKET,
});

router.use("/production-chart", require("./productionCharts"));
router.use("/selling-report", require("./sellingReport"));

const includeAssociations = [
  {
    model: db.user_farm,
    as: "userFarms",
    through: {
      model: db.CacaoPlantationsUserFarmsMap,
      attributes: ["id", "farm_id"],
    },
    attributes: ["farmName"],
  },
  {
    model: db.Geofence,
    as: "segments",
    through: {
      model: db.CacaoPlantationsGeofenceMap,
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
    model: db.CacaoManageTrees,
    as: "manageCacaoTreesData",
  },
  {
    model: db.CacaoManageRemovedTrees,
    as: "manageCacaoRemovedTreesData",
  },
  {
    attributes: ["id", "name", "cacao_species"],
    model: db.CacaoVariety,
    as: "cacaoVariety",
  },
  {
    attributes: ["id", "name"],
    model: db.CacaoSpecies,
    as: "cacaoSpecies",
  },
  {
    model: db.UnitsList,
    as: "expectedYieldUnitId",
  },
  {
    model: db.ShadeTree,
    as: "shadeTree",
    through: {
      model: db.CacaoShadeTreeMapData,
      attributes: ["id", "number_of_trees"],
    },
    attributes: ["id", "name", "status"],
  },
  {
    model: db.WindBreaker,
    as: "windBreakerTree",
    through: {
      model: db.CacaoWindBreakerTreeMapData,
      attributes: ["id", "number_of_trees"],
    },
    attributes: ["id", "name", "status"],
  },
  {
    model: db.HorticultureInformation,
    as: "horticultureInformation",
    through: {
      model: db.CacaoHorticultureInformationMapData,
      attributes: ["id", "number_of_trees"],
    },
    attributes: ["id", "name", "status"],
  },
  {
    attributes: ["id", "file_name", "s3_key"],
    model: db.CacaoLandImages,
    as: "cacaoLandImages",
  },
];

router.post(
  "/",
  auth,
  duplicateRecordId.handleDuplicateRecordId("CacaoPlantations"),
  createCacaoPlantationValidations(),
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
        cacaoVariety,
        cacaoSpecies,
        noOfCacaoTrees,
        shadeTree,
        windBreakerTree,
        horticultureInformation,
        expectedYield,
        expectedYieldUnitId,
        recordId,
        images,
        bearingFruitStatus,
        noOfTreeBearingFruit,
        timeToBearFruit,
        isExistingPlantation,
      } = req.body;

      const isRecordIdExists = await db.CacaoPlantations.findOne({
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
        const response = await db.CacaoPlantations.create(
          {
            user_id: userId,
            plantation_name: plantationName,
            cacao_species: cacaoSpecies,
            expected_yield: expectedYield,
            expected_yield_unit_id: expectedYieldUnitId,
            no_of_cacao_trees: noOfCacaoTrees,
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
          if (cacaoVariety && cacaoVariety.length > 0) {
            const cacaoPlantVariety = cacaoVariety.map((variety_id) => {
              return {
                cacao_plantation_id: response.id,
                cacao_variety_id: variety_id,
              };
            });
            await db.CacaoPlantationVarieties.bulkCreate(cacaoPlantVariety, {
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
            await db.CacaoPlantationsUserFarmsMap.bulkCreate(farmData, {
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
            await db.CacaoPlantationsGeofenceMap.bulkCreate(segmentData, {
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
            await db.CacaoShadeTreeMapData.bulkCreate(shadeTreeData, {
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
            await db.CacaoWindBreakerTreeMapData.bulkCreate(
              windBreakerTreeData,
              {
                transaction,
              }
            );
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
            await db.CacaoHorticultureInformationMapData.bulkCreate(
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
            await db.CacaoLandImages.bulkCreate(filesArr, { transaction });
          }

          const externalId = await insertTraceabilityExternalId(
            "cacao_plantation",
            response.id
          );

          if (externalId) {
            await response
              .set({ external_traceability_id: externalId.id })
              .save({ transaction });
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
        let { id } = await db.CacaoPlantations.findOne({
          attributes: ["id"],
          where: {
            recordId,
          },
        });

        let set = {
          plantation_name: plantationName,
          cacao_species: cacaoSpecies,
          no_of_cacao_trees: noOfCacaoTrees,
          time_to_bear_fruit: timeToBearFruit,
          bearing_fruit_status: bearingFruitStatus,
          no_of_trees_bearing_fruit: noOfTreeBearingFruit,
          expected_yield: expectedYield,
          expected_yield_unit_id: expectedYieldUnitId,
          recordId,
        };
        await db.CacaoPlantations.update(set, {
          where: { id },
          transaction,
        });

        if (cacaoVariety && cacaoVariety.length > 0) {
          const cacaoPlantVariety = cacaoVariety.map((variety_id) => {
            return {
              cacao_plantation_id: id,
              cacao_variety_id: variety_id,
            };
          });
          await db.CacaoPlantationVarieties.bulkCreate(cacaoPlantVariety, {
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
          await db.CacaoPlantationsUserFarmsMap.destroy({
            where: {
              plantation_id: id,
            },
          });
          await db.CacaoPlantationsUserFarmsMap.bulkCreate(farmData, {
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
          await db.CacaoPlantationsGeofenceMap.destroy({
            where: {
              plantation_id: id,
            },
          });
          await db.CacaoPlantationsGeofenceMap.bulkCreate(segmentData, {
            transaction,
          });
        }
        if (shadeTree) {
          await db.CacaoShadeTreeMapData.destroy({
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
          await db.CacaoShadeTreeMapData.bulkCreate(shadeTreeData, {
            transaction,
          });
        }
        if (windBreakerTree) {
          await db.CacaoWindBreakerTreeMapData.destroy({
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
          await db.CacaoWindBreakerTreeMapData.bulkCreate(windBreakerTreeData, {
            transaction,
          });
        }
        if (horticultureInformation) {
          await db.CacaoHorticultureInformationMapData.destroy({
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
          await db.CacaoHorticultureInformationMapData.bulkCreate(
            horticultureInformationData,
            { transaction }
          );
        }
        if (images && images.length > 0) {
          filesArr = [];
          // Deleting Existing files from S3
          const images = await db.CacaoLandImages.findAll({
            where: {
              plantation_id: id,
            },
          });
          if (images && images.length > 0) {
            images.forEach(async (item) => {
              // file to be deleted
              var param = {
                Bucket: process.env.AWS_PUBLIC_BUCKET,
                Key: item.s3_key,
              };
              await deleteFileS3(param);
            });
            await db.CacaoLandImages.destroy({
              where: {
                plantation_id: id,
              },
            });
          }

          images.forEach(async (res, index) => {
            filesArr.push({
              plantation_id: id,
              file_name: `${
                process.env.PUBLIC_BUCKET_URL ||
                "https://dimitra-public-images.s3.amazonaws.com/"
              }${res.s3_key}`,
              s3_key: res.s3_key,
            });
          });
          await db.CacaoLandImages.bulkCreate(filesArr, { transaction });
        }

        await transaction.commit();

        const response = await db.CacaoPlantations.findOne({
          attributes: [
            "id",
            "user_id",
            "plantation_name",
            "no_of_cacao_trees",
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
          include: includeAssociations,
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
      cacaoSpecies,
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
    if (cacaoSpecies && cacaoSpecies != "All") {
      where.cacao_species = {
        [Op.in]: cacaoSpecies,
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
    const count = await db.CacaoPlantations.count({
      ...query,
    });

    const response = await db.CacaoPlantations.findAll({
      ...query,
      include: includeAssociations,
    });

    let responseData = response.map((item) => {
      let tempItem = JSON.parse(JSON.stringify(item));
      let externalQRLink=`https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${item.external_traceability_id}`

      return {
        ...tempItem,
        external_traceability_link:externalQRLink,
        userFarms: tempItem.userFarms.map((uf) => ({
          ...uf.CacaoPlantationsUserFarmsMap,
          name: uf.farmName,
        })),
        segments: tempItem.segments.map((s) => ({
          ...s.CacaoPlantationsGeofenceMap,
          name: s.geofenceName,
          farm: {
            ...s.farm,
          },
        })),
        shadeTree: tempItem.shadeTree.map((st) => ({
          ...st.CacaoShadeTreeMapData,
          id: st.id,
          name: st.name,
          status: st.status,
          number_of_trees: st.CacaoShadeTreeMapData.number_of_trees,
          shade_tree_map_data_id: st.CacaoShadeTreeMapData.id,
        })),
        windBreakerTree: tempItem.windBreakerTree.map((wbt) => ({
          id: wbt.id,
          name: wbt.name,
          status: wbt.status,
          number_of_trees: wbt.CacaoWindBreakerTreeMapData.number_of_trees,
          wind_breaker_tree_map_data_id: wbt.CacaoWindBreakerTreeMapData.id,
        })),
        horticultureInformation: tempItem.horticultureInformation.map((hi) => ({
          id: hi.id,
          name: hi.name,
          status: hi.status,
          number_of_trees:
            hi.CacaoHorticultureInformationMapData.number_of_trees,
          horticulture_information_map_data_id:
            hi.CacaoHorticultureInformationMapData.id,
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
          { lvl1: true, lvl2: true, moduleName: "cacao/plantations" }
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

router.put(
  "/:id",
  auth,
  createCacaoPlantationValidations(),
  validationErrorHandler,
  async function (req, res) {
    let transaction = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      const { id } = req.params;
      let {
        plantationName,
        farmIds,
        segmentIds,
        cacaoVariety,
        cacaoSpecies,
        expectedYield,
        expectedYieldUnitId,
        shadeTree,
        windBreakerTree,
        horticultureInformation,
        images,
        recordId,
        noOfCacaoTrees,
        bearingFruitStatus,
        noOfTreeBearingFruit,
        timeToBearFruit,
        isExistingPlantation,
      } = req.body;

      let set = {
        plantation_name: plantationName,
        cacao_species: cacaoSpecies,
        expected_yield: expectedYield,
        expected_yield_unit_id: expectedYieldUnitId,
        recordId,
        no_of_cacao_trees: noOfCacaoTrees,
        bearing_fruit_status: bearingFruitStatus,
        no_of_trees_bearing_fruit: noOfTreeBearingFruit,
        time_to_bear_fruit: timeToBearFruit,
        isExistingPlantation: isExistingPlantation || false,
      };

      const plantationExists = await db.CacaoPlantations.findOne({
        where: {
          id,
          is_deleted: false,
          user_id: userId,
        },
      });
      if (plantationExists) {
        await db.CacaoPlantations.update(set, {
          where: { id },
          transaction,
        });

        if (cacaoVariety && cacaoVariety.length > 0) {
          const cacaoPlantVariety = cacaoVariety.map((variety_id) => {
            return {
              cacao_plantation_id: id,
              cacao_variety_id: variety_id,
            };
          });
          await db.CacaoPlantationVarieties.bulkCreate(cacaoPlantVariety, {
            transaction,
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
          await db.CacaoPlantationsUserFarmsMap.destroy({
            where: {
              plantation_id: id,
            },
          });
          await db.CacaoPlantationsUserFarmsMap.bulkCreate(farmData, {
            transaction,
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
          await db.CacaoPlantationsGeofenceMap.destroy({
            where: {
              plantation_id: id,
            },
          });
          await db.CacaoPlantationsGeofenceMap.bulkCreate(segmentData, {
            transaction,
          });
        }
        if (shadeTree) {
          await db.CacaoShadeTreeMapData.destroy({
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
          await db.CacaoShadeTreeMapData.bulkCreate(shadeTreeData, {
            transaction,
          });
        }
        if (windBreakerTree) {
          await db.CacaoWindBreakerTreeMapData.destroy({
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
          await db.CacaoWindBreakerTreeMapData.bulkCreate(windBreakerTreeData, {
            transaction,
          });
        }
        if (horticultureInformation) {
          await db.CacaoHorticultureInformationMapData.destroy({
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
          await db.CacaoHorticultureInformationMapData.bulkCreate(
            horticultureInformationData,
            { transaction }
          );
        }
        if (images && images.length > 0) {
          const incomingImages = images;
          let deleteImages = [];
          let uploadImages = [],
            existingImages = [];

          // Deleting Existing files from S3
          existingImages = await db.CacaoLandImages.findAll({
            where: {
              s3_key: {
                [Op.in]: images.map((i) => i.s3_key),
              },
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
            await db.CacaoLandImages.destroy({
              where: {
                s3_key: {
                  [Op.in]: deleteImages.map((d) => d.s3_key),
                },
              },
            });
          }

          let filesArr = [];
          incomingImages.forEach(async (res, index) => {
            filesArr.push({
              plantation_id: id,
              s3_key: res.s3_key,
              file_name: `${
                process.env.PUBLIC_BUCKET_URL ||
                "https://dimitra-public-images.s3.amazonaws.com/"
              }${res.s3_key}`,
            });
          });
          await db.CacaoLandImages.bulkCreate(filesArr, { transaction });
        }
        await transaction.commit();

        const response = await db.CacaoPlantations.findOne({
          where: {
            id,
          },
          include: includeAssociations,
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
      await transaction.rollback();
      return serverError(res, error);
    }
  }
);

router.delete("/:id", auth, async function (req, res) {
  let transaction = await db.sequelize.transaction();
  try {
    const { id } = req.params;

    const response = await db.CacaoPlantations.update(
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

router.get("/getDropdownData", auth, translation, async function (req, res) {
  try {
    const cacaoVariety = await db.CacaoVariety.findAll({
      distinct: true,
      attributes: ["id", "name", "cacao_species"],
      where: {
        isDeleted: false,
      },
    });
    const cacaoSpecies = await db.CacaoSpecies.findAll({
      group: ["name"],
      distinct: true,
      attributes: ["id", "name"],
      where: {
        isDeleted: false,
      },
    });
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

    const cacaoDeliveryMethods = await db.CacaoDeliveryMethod.findAll({
      attributes: ["id", "name"],
    });

    let responseData = {
      cacaoVariety,
      cacaoSpecies,
      shadeTree,
      windBreakerTree,
      horticultureInformation,
      cacaoDeliveryMethods,
    };

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      responseData = req.translateFunction(
        responseData,
        globalTranslationCache,
        {
          lvl1: true,
          lvl2: true,
          moduleName: "cacao/plantations",
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

router.post(
  "/manageTrees/add",
  auth,
  translation,
  async function (req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      let { plantationId, date, cacaoSpecies, cacaoVariety, noOfCacaoTrees } =
        req.body;

      const response = await db.CacaoManageTrees.create(
        {
          plantation_id: plantationId,
          cacao_species: cacaoSpecies,
          date,
          no_of_cacao_trees: noOfCacaoTrees,
        },
        { transaction }
      );

      if (cacaoVariety && cacaoVariety.length > 0) {
        const cacaoTreesVarietyObj = cacaoVariety.map((variety_id) => {
          return {
            manage_cacao_trees_id: response.id,
            cacao_variety_id: variety_id,
          };
        });
        await db.ManageCacaoTreesVarieties.bulkCreate(cacaoTreesVarietyObj, {
          transaction,
        });
      }

      await db.CacaoPlantations.increment("no_of_cacao_trees", {
        by: noOfCacaoTrees,
        where: { id: plantationId },
        transaction,
      });

      // const getcurrentTreesCount = await db.CacaoPlantations.findOne({
      //   attributes: ["no_of_cacao_trees"],
      //   where: {
      //     id: plantationId,
      //   },
      // });

      // const currentTreesCount = getcurrentTreesCount.no_of_cacao_trees;
      // await db.CacaoPlantations.update(
      //   {
      //     no_of_cacao_trees: currentTreesCount + noOfCacaoTrees,
      //   },
      //   {
      //     where: { id: plantationId },
      //     transaction,
      //   }
      // );
      await transaction.commit();
      return res.json(
        successRespSync({
          msg: `Trees added successfully.`,
          data: response,
        })
      );
    } catch (error) {
      await transaction.rollback();
      return serverError(res, error);
    }
  }
);

router.post(
  "/manageTrees/remove",
  auth,
  translation,
  async function (req, res) {
    const transaction = await db.sequelize.transaction();
    try {
      let { plantationId, date, noOfCacaoTrees, comment } = req.body;

      const response = await db.CacaoManageRemovedTrees.create(
        {
          plantation_id: plantationId,
          date,
          no_of_cacao_trees: noOfCacaoTrees,
          reason: comment,
        },
        { transaction }
      );

      const getcurrentTreesCount = await db.CacaoPlantations.findOne({
        attributes: ["no_of_cacao_trees"],
        where: {
          id: plantationId,
        },
      });

      const currentTreesCount = getcurrentTreesCount.no_of_cacao_trees;

      if (currentTreesCount - noOfCacaoTrees < 0) {
        return res.json(
          errorRespSync({
            msg: "No of trees cannot be negative.",
          })
        );
      }
      await db.CacaoPlantations.update(
        {
          no_of_cacao_trees: currentTreesCount - noOfCacaoTrees,
        },
        {
          where: { id: plantationId },
          transaction,
        }
      );
      await transaction.commit();
      return res.json(
        successRespSync({
          msg: `Trees removed successfully.`,
          data: response,
        })
      );
    } catch (error) {
      await transaction.rollback();
      return serverError(res, error);
    }
  }
);

router.get(
  "/manageTrees/:plantationId",
  auth,
  translation,
  async function (req, res) {
    try {
      const plantationId = req.params.plantationId;
      let addResponse = await db.CacaoManageTrees.findAll({
        where: {
          plantation_id: plantationId,
        },
      });

      let removeResponse = await db.CacaoManageRemovedTrees.findAll({
        where: {
          plantation_id: plantationId,
        },
      });

      // Add an 'action' property to each response
      const addResponseWithAction = addResponse.map((item) => {
        return { ...item.toJSON(), action: "add", id: `add_${item.id}` };
      });

      const removeResponseWithAction = removeResponse.map((item) => {
        return { ...item.toJSON(), action: "remove", id: `remove_${item.id}` };
      });
      const combinedResponse = [
        ...addResponseWithAction,
        ...removeResponseWithAction,
      ];

      return res.json(
        successRespSync({
          msg: "Data fetched successfully.",
          data: combinedResponse,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

router.get(
  "/removedTrees/:plantationId",
  auth,
  translation,
  async function (req, res) {
    try {
      const plantationId = req.params.plantationId;
      const response = await db.CacaoManageRemovedTrees.findAll({
        where: {
          plantation_id: plantationId,
        },
      });

      return res.json(
        successRespSync({
          msg: "Data fetched successfully.",
          data: response,
        })
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
);

router.get("/farm/:farmId/", auth, translation, async function (req, res) {
  try {
    const farmId = req.params.farmId;
    const { zoneId } = req.query;

    let zoneIdsRelatedToFarm = [];

    let farmAndZonePlantation = [];

    if (farmId) {
      const response = await db.CacaoPlantations.findAll({
        attributes: ["id", "plantation_name"],
        include: [
          {
            attributes: ["id", "name"],
            model: db.CacaoVariety,
            as: "cacaoVariety",
          },
          {
            attributes: ["id", "name"],
            model: db.CacaoSpecies,
            as: "cacaoSpecies",
          },
          {
            attributes: ["farm_id"],
            model: db.CacaoPlantationsUserFarmsMap,
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
        allZonePlantations = await db.CacaoPlantations.findAll({
          attributes: ["id", "plantation_name"],
          include: [
            {
              attributes: ["id", "name"],
              model: db.CacaoVariety,
              as: "cacaoVariety",
            },
            {
              attributes: ["id", "name"],
              model: db.CacaoSpecies,
              as: "cacaoSpecies",
            },
            {
              attributes: ["segment_id"],
              model: db.CacaoPlantationsGeofenceMap,
              as: "plantationsGeofenceMap",
              where: {
                segment_id: zoneIdsRelatedToFarm,
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
      zonePlantations = await db.CacaoPlantations.findAll({
        attributes: ["id", "plantation_name"],
        include: [
          {
            attributes: ["id", "name"],
            model: db.CacaoVariety,
            as: "cacaoVariety",
          },
          {
            attributes: ["id", "name"],
            model: db.CacaoSpecies,
            as: "cacaoSpecies",
          },
          {
            attributes: ["segment_id"],
            model: db.CacaoPlantationsGeofenceMap,
            as: "plantationsGeofenceMap",
            where: {
              segment_id: zoneId,
            },
          },
        ],
      });
    }

    return res.json(
      successRespSync({
        msg: "Dropdown data fetched successfully.",
        data: zoneId ? zonePlantations : farmAndZonePlantation,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.post("/shadeTree", auth, async function (req, res) {
  try {
    const { name } = req.body;
    let userId = req.user.id;
    const windBreakerRes = await db.ShadeTree.create({
      name,
      created_by: userId,
      status: "active",
    });
    return res.json(
      successRespSync({
        msg: "Shade  tree created",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.post("/windBreaker", auth, async function (req, res) {
  try {
    const { name } = req.body;
    let userId = req.user.id;
    const windBreakerRes = await db.WindBreaker.create({
      name,
      created_by: userId,
      status: "active",
    });
    return res.json(
      successRespSync({
        msg: "Wind breaker tree created",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

router.post("/horticultureInfo", auth, async function (req, res) {
  try {
    const { name } = req.body;
    let userId = req.user.id;
    const windBreakerRes = await db.HorticultureInformation.create({
      name,
      created_by: userId,
      status: "enabled",
    });
    return res.json(
      successRespSync({
        msg: "Intercropped Culivation is added",
        data: windBreakerRes,
      })
    );
  } catch (error) {
    return serverError(res, error);
  }
});

module.exports = router;
