const express = require("express");
const router = express.Router();
const translation = require(rootPath + "/middleware/translation");
const db = require(rootPath + "/models");
const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { success, error } = require(rootPath + "/helpers/language");
const { fetchOneValidation } = require(rootPath + "/helpers/validation");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const {
  dryMilling,
  processingBatch,
  purchaseOrder,
  plantation,
  parchmentCoffee,
  coffeeProcessingBatch,
  coffeePurchaseOrder,
  coffeePlantation,
  getFinalProductData,
  getBatchData,
  getPurchaseData
} = require("./utils");
const _ = require("lodash")

/**
 * @swagger
 * /traceability/search/{external_id}:
 *   get:
 *     description: Check if Record with provided external ID exists.
 *     tags: [Traceability]
 *     parameters:
 *      - in: path
 *        name: external_id
 *        schema:
 *          type: string
 *        example:
 *          "EID-00000"
 *     responses:
 *       200:
 *         description: On success response if data is present related to parchment coffee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   msg:
 *                     type: string
 *                   data:
 *                     type: object
 *               example: {
 *                  success: true,
 *                  code: 200,
 *                  message: "Fetched successfully.",
 *                  data: {
 *                      id: "EID-0000",
 *                      type: "cacao_plantation",
 *                      type_id: 5,
 *                      createdAt: "2024-01-23T11:49:50.000Z",
 *                      updatedAt: "2024-01-23T11:49:50.000Z"
 *                      }
 *                  }
 */
router.get("/search/:external_id", translation, async (req, res) => {
  try {
    const { external_id: id } = req.params;
    const existData = await db.TraceabilityExternalId.findOne({
      where: { id },
    });
    if (!existData) {
      return res.json(
        successRespSync({
          msg: success.NOT_FOUND,
        })
      );
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: existData,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename,err);
    return serverError(res,err);
  }
});

router.get("/coffee/:user_id", async (req, res) => {
  try {
    let { user_id } = req.params;
    if (user_id > 0) {
      let user = await db.user.findOne({
        where: {
          id: user_id,
        },
      });

      const { organization, subOrgId } = user;
      let traceability = await db.Traceability.findOne({
          where: { 
           include: [
            {
              attributes: [],
              model: db.user,
              as: "user",
              where:  { 
                organization,
                ...(subOrgId ? {subOrganizationId: subOrgId } : {})
              },
              required: true,
            },
          ],
       },
      });
      res.json(
        await successRespSync({
          msg: success.FETCH,
          data: traceability,
        })
      );
    } else {
      res.json(
        await successRespSync({
          msg: success.NOT_FOUND,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename,err);
    return serverError(res,err);
  }
});
router.get("/cacao/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    if (user_id > 0) {
      let user = await db.user.findOne({
        where: {
          id: user_id,
        },
      });

      let traceability = await db.CacaoTraceability.findOne({
        where: { organization_id: user.organization },
      });
      res.json(
        await successRespSync({
          msg: success.FETCH,
          data: traceability,
        })
      );
    } else {
      res.json(
        await successRespSync({
          msg: "Result not found.",
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename,err);
    return serverError(res,err);
  }
});

router.get("/crop/:user_id", async (req, res) => {
  try {
    let { user_id } = req.params;
    if (user_id > 0) {
      let user = await db.user.findOne({
        where: {
          id: user_id,
        },
      });

      let traceability = await db.CropsTraceability.findOne({
        where: { organization_id: user.organization },
      });
      res.json(
        await successRespSync({
          msg: success.FETCH,
          data: traceability,
        })
      );
    } else {
      res.json(
        await successRespSync({
          msg: success.NOT_FOUND,
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename,err);
    return serverError(res,err);
  }
});

router.get("/crop/final_product/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    if (user_id > 0) {
      let user = await db.user.findOne({
        where: {
          id: user_id,
        },
      });

      let traceability = await db.CropTraceability.findOne({
        where: { organization_id: user.organization },
      });
      res.json(
        await successRespSync({
          msg: success.FETCH,
          data: traceability,
        })
      );
    } else {
      res.json(
        await successRespSync({
          msg: "Result not found.",
        })
      );
    }
  } catch (err) {
    logErrorOccurred(__filename,err);
    return serverError(res,err);
  }
});

router.get("/crop-detail", async (req, res) => {
  try {
    const { external_id, type } = req.query;
    let finalProductDetail = {};

    switch (type) {
      case "final_product":
        finalProductDetail =  await getFinalProductData(external_id);
        userId = finalProductDetail?.finalProductData?.user_id;
        break;
      case "batch_mgmt":
        finalProductDetail =  await getBatchData(external_id);
        userId = finalProductDetail?.processingBatch[0]?.userId ;
        break;
      case "purchase_confirmation":
        finalProductDetail =  await getPurchaseData(external_id);
        userId = finalProductDetail?.purchaseOrder[0]?.userId ;
        break;
    }

    if (!finalProductDetail) {
      return res.json(
        successRespSync({
          msg: "Crop traceability detail not found.",
        })
      );
    }
    const org_id = await db.user.findOne({
      where: { id: userId },
      attributes: ["organization"],
    });



    let globalSetting = {};
    const unitArea = await db.GlobalSetting.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      include: [
        {
          model: db.UnitsList,
          as: "areaUnit",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
        {
          model: db.UnitsList,
          as: "weightUnit",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
      ],
      where: { org_id: org_id.dataValues.organization },
    });
    const userUnit = await db.UserUnitConfiguration.findOne({
      where: {
        userId,
      },
      include: [
        {
          model: db.UnitTypes,
          as: "user_config_unitType",
          where: {
            name: "Weight-Area",
          },
        },
        {
          model: db.UnitsList,
          as: "user_config_unit",
        },
      ],
    });

    globalSetting["areaunit"] = unitArea?.areaUnit;
    globalSetting["weightunit"] = userUnit?.user_config_unit;


    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { 
          finalProductDetail: finalProductDetail.finalProductData,
          processingBatch: finalProductDetail.processingBatch,
          purchaseOrder: finalProductDetail.purchaseOrder,
          globalSetting,
          userId,
          userFarms: finalProductDetail.farmData
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename,err);
    return serverError(res,err);
  }
});

router.get("/coffee-detail", async (req, res) => {
  try {
    const { external_id, type } = req.query;
    let traceabilityDetail = {};

    let userFarms = [];
    let userId = 0;
    switch (type) {
      case "parchment_coffee":
        traceabilityDetail = await parchmentCoffee(external_id);
        userFarms = traceabilityDetail?.farmData;
        userId = traceabilityDetail ? traceabilityDetail.parchmentCoffeeData?.dryMillingUserId : 0;
        break;
      case "coffee_processing_batch":
        traceabilityDetail = await coffeeProcessingBatch(external_id);
        userFarms = traceabilityDetail?.farmData;
        userId = traceabilityDetail ? traceabilityDetail.processingBatchData?.buyingStationId : 0;
        break;
      case "coffee_purchase_order":
        traceabilityDetail = await coffeePurchaseOrder(external_id);
        userFarms = traceabilityDetail?.farmData;
        userId = traceabilityDetail ? traceabilityDetail.purchaseOrderData?.buyingStationId : 0;
        break;
      case "coffee_plantation":
        traceabilityDetail =  await coffeePlantation(external_id);
        userFarms = traceabilityDetail?.farmData;
        userId = traceabilityDetail ? traceabilityDetail.plantationData?.user_id : 0;
        break;
    }

    if (!traceabilityDetail) {
      return res.json(
        successRespSync({
          msg: "Coffee traceability detail not found.",
        })
      );
    }
    const org_id = await db.user.findOne({
      where: { id: userId },
      attributes: ["organization"],
    });

    let globalSetting = {};
    const unitArea = await db.GlobalSetting.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      include: [
        {
          model: db.UnitsList,
          as: "areaUnit",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
        {
          model: db.UnitsList,
          as: "weightUnit",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
      ],
      where: { org_id: org_id.dataValues.organization },
    });
    const userUnit = await db.UserUnitConfiguration.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: db.UnitTypes,
          as: 'user_config_unitType',
          where: {
             "name": ["TotalSyntheticFertilizerUsedWeightUnit", "Area", "Weight-Area"],
          }
        },
        {
          model: db.UnitsList,
          as: 'user_config_unit',
        },
      ],
    });
    if(userUnit && userUnit.length > 0) {
      userUnit.forEach(unit => {
        globalSetting[unit.user_config_unitType.name ] = unit
      })

    }

    globalSetting["areaunit"] = unitArea?.areaUnit;
    globalSetting["weightunit"] = userUnit?.user_config_unit;

    if (
      traceabilityDetail.buyingStationOrder &&
      traceabilityDetail.buyingStationOrder.processingBatch &&
      traceabilityDetail.buyingStationOrder.processingBatch.length
    ) {
      traceabilityDetail.buyingStationOrder.batchRating =
        traceabilityDetail.buyingStationOrder.processingBatch[0].batchRating;
      delete traceabilityDetail.buyingStationOrder.processingBatch;
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { 
          parchmentCoffee: traceabilityDetail.parchmentCoffeeData ?? null,
          processingBatch: traceabilityDetail.processingBatchData ?? null,
          purchaseOrder: traceabilityDetail.purchaseOrderData ?? null,
          plantation: traceabilityDetail.plantationData ?? null,
          userFarms,
          globalSetting,
          userId 
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename,err);
    return serverError(res,err);
  }
});

router.get("/cacao-detail", async (req, res) => {
  try {
    const { external_id, type } = req.query;
    let userId = 0;
    let traceabilityDetail = {};
    switch (type) {
      case "dry_milling_cacao":
        traceabilityDetail = await dryMilling(external_id);
        userId = traceabilityDetail ? traceabilityDetail.cacaoDryingProcessData.dryRegisterUserId : 0;
        break;
      case "cacao_processing_batch":
        traceabilityDetail = await processingBatch(external_id);
        userId = traceabilityDetail ? traceabilityDetail.cacaoFermentationData[0].buyingStationId : 0;
        break;
      case "cacao_purchase_order":
        traceabilityDetail = await purchaseOrder(external_id);
        userId = traceabilityDetail ? traceabilityDetail.purchaseOrderData[0].buyingStationId : 0;
        break;
      case "cacao_plantation":
        traceabilityDetail = await plantation(external_id);
        userId = traceabilityDetail ? traceabilityDetail.plantationData.user_id : 0;
        break;
    }

    if (!traceabilityDetail) {
      return res.json(
        successRespSync({
          msg: "Cacao data not found",
        })
      );
    }

    const org_id = await db.user.findOne({
      where: { id: userId },
      attributes: ["organization"],
    });

    let globalSetting = {};
     let unitRes = await db.UserUnitConfiguration.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: db.UnitTypes,
          as: 'user_config_unitType',
          where: {
             "name": ["TotalSyntheticFertilizerUsedWeightUnit", "Area", "Weight-Area"],
          }
        },
        {
          model: db.UnitsList,
          as: 'user_config_unit',
        },
      ],
    });

    if(unitRes && unitRes.length > 0) {
      unitRes.forEach(unit => {
        globalSetting[unit.user_config_unitType.name ] = unit
      })

    }

    globalSetting["areaunit"] = await db.GlobalSetting.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      include: [
        {
          model: db.UnitsList,
          as: "areaUnit",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
        {
          model: db.UnitsList,
          as: "weightUnit",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
      ],
      where: { org_id },
    });

    //default global area unit
    if (Object.keys(globalSetting).length) {
      globalSetting["areaunit"] = await db.UnitsList.findOne({
        where: { name: "Acre" },
        attributes: ["id", "name", "abbvr", "unitType", "factor"],
      });
      globalSetting["weightunit"] = await db.UnitsList.findOne({
        where: { name: "Kilogram" },
        attributes: ["id", "name", "abbvr", "unitType", "factor"],
      });
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          cacaoDrying: traceabilityDetail.cacaoDryingProcessData ?? null,
          cacaoFermentation: traceabilityDetail.cacaoFermentationData ?? null,
          purchaseOrder: _.uniqBy(traceabilityDetail.purchaseOrderData, 'id' )?? null,
          plantation: traceabilityDetail.plantationData ?? null,
          userFarms: _.uniqBy(traceabilityDetail.farmData, 'id') ?? null,
          globalSetting,
          userId,
        },
      })
    );
  } catch (err) {
    console.log(err);
    return serverError(res, err);
  }
});

router.get("/farm-setting/:id", async (req, res) => {
  const { id } = req.params;
  let where = { id, isDeleted: 0 };

  let query = {
    attributes: [
      "id",
      "farmName",
      "ownerName",
      "registrationNo",
      "address",
      "district",
      "zipCode",
      "area",
      "parameter",
      "lat",
      "log",
      "farmOwner",
      "country",
      "state",
      "city",
      "houseNum",
      "street",
      "farmerFirstName",
      "farmerMiddleName",
      "farmerLastName",
      "isTechnician",
    ],
    where,
  };

  let result = await db.user_farm.findOne(query);
  let traceabilityDetail = await db.FarmTraceability.findOne({ where: { id } });

  return res.json(
    await successRespSync({
      msg: result != null ? success.FETCH : error.NO_DATA,
      data: {
        farmDetail: result,
        traceabilityDetail,
      },
    })
  );
});
module.exports = router;