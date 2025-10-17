const express = require("express");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const db = require(rootPath + "/models");

const {
  successRespSync,
  serverError,
  errorResp,
  errorRespSync,
} = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");

const fileUpload = require(rootPath + "/middleware/file_upload");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");

const _ = require("lodash");
const QRCode = require("qrcode");
const moment = require("moment");
const translation = require(rootPath + "/middleware/translation");
const { Op } = require("sequelize");
const insertTraceabilityExternalId = require(rootPath + "/helpers/externalTracebilityId");

const includeAssociations = (parchmentCoffeeId = null) => [
  {
    model: db.UnitsList,
    as: "parchmentCheckingUnit",
    attributes: ["id", "name", "abbvr", "unitType", "factor"],
  },
  {
    model: db.ParchmentProductType,
    as: "productType",
    attributes: ["id", "name"]
  },
  {
    model: db.Cupping,
    as: "cuppingData",
  },
  {
    model: db.ParchmentQualityGrading,
    as: "qualityGradings",
    attributes: [
      ["uniqueIdentifier", "id"],
      "qualityTitle",
      "quantity",
      "quantityUnit",
      "qualityScore",
      "label",
      "unitSize",
      "unitSizeUnit",
    ],
    include: [
      {
        model: db.Cupping,
        as: "gradingCuppingData",
        required: false,
        where: {
          quality_grading_id: {
            [Op.col]: 'qualityGradings.uniqueIdentifier'
          },
        }
      },
      {
        model: db.ParchmentCupping,
        as: "gradingCuppings",
        where: parchmentCoffeeId
          ? {
              parchmentCoffeeId: parchmentCoffeeId,
            }
          : {},
        required: false,
        include: [
          {
            model: db.DryMillingCuppingAcidity,
            as: "cupping_acidity",
            attributes: ["id", "value"],
          },
          {
            model: db.DryMillingCuppingBalance,
            as: "cupping_balance",
            attributes: ["id", "value"],
          },
          {
            model: db.DryMillingCuppingBody,
            as: "cupping_body",
            attributes: ["id", "value"],
          },
          {
            model: db.DryMillingCuppingFlavour,
            as: "cupping_flavour",
            attributes: ["id", "value"],
          },
        ],
      },
    ],
  },
  {
    model: db.BuyingStationOrder,
    as: "buyingStationOrder",
    attributes: { exclude: ["qrCode", "isdeleted", "createdAt", "updatedAt"] },
    include: [
      {
        model: db.BuyingStationProcessingBatch,
        through: {
          model: db.BuyingStationProcessingBatchAndOrder,
          attributes: [],
        },
        attributes: ["batchRating"],
        as: "processingBatch",
      },
      {
        model: db.user,
        as: "buyingStation",
        attributes: ["firstName","middleName", "lastName", "fullName"],
      },
    ],
  },
];

/**
 * @swagger
 * /coffee/dry-milling/parchment-coffee/options:
 *   get:
 *     description: List all parchment coffee options
 *     tags: [Coffee]
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
 *         description: On success response if data is present related to parchment coffee.
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
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data:
 *                   count: 1
 *                   rows:
 *                   - cuppingAcidity: ['id': 1, 'value': 6]
 *                     cuppingBalance: ['id': 1, 'value': 6]
 *                     cuppingBody: ['id': 1, 'value': 6]
 *                     cuppingFlavour: ['id': 1, 'value': 6]
 */
router.get(
  "/options",
  auth,
  // validate.listValidation(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      const cuppingAcidity = await db.DryMillingCuppingAcidity.findAll({
        attributes: ["id", "value"],
      });
      const cuppingBalance = await db.DryMillingCuppingBalance.findAll({
        attributes: ["id", "value"],
      });
      const cuppingBody = await db.DryMillingCuppingBody.findAll({
        attributes: ["id", "value"],
      });
      const cuppingFlavour = await db.DryMillingCuppingFlavour.findAll({
        attributes: ["id", "value"],
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            cuppingAcidity,
            cuppingBalance,
            cuppingBody,
            cuppingFlavour,
          },
        })
      );
    } catch (e) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /coffee/dry-milling/parchment-coffee:
 *   post:
 *     description: Create parchment coffee
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: Request body for submitting new contact us inquiry
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                image:
 *                  type: string
 *              required:
 *                - name
 *            example:
 *              {
 *                "buyingStationParchmentId": 1,
 *                "purchaseDate": "2022-06-08",
 *                "barcode": "barcodeStr",
 *                "parchmentChecking": "Parchment checking",
 *                "parchmentCheckingUnitId": 4,
 *                "qualityControlHumidity": 20,
 *                "qualityControlDensity": 70,
 *                "qualityControlDensityUnit": "kg",
 *                "parchmentQualityScore": "C",
 *                "batchProductionKilogramAsalan": 5,
 *                "batchProductionDensity": 55,
 *                "batchProductionDensityUnit": "kg",
 *                "batchProductionPrimaryDefect": 60,
 *                "batchProductionSecondaryDefect": 70,
 *                "greenBeansTotal": 44,
 *                "greenBeansBags": 34,
 *                "greenBeansId": "GB-001",
 *                "greenBeansExpiry": "2022-06-08",
 *                "greenBeansLabel": "Green bean label",
 *                "totalWaste": "40",
 *                "qualityGradings": [
 *                  {
 *                    "id": "GB-0233-1",
 *                    "qualityTitle": "Expert",
 *                    "quantity": "500",
 *                    "quantityUnit": "kg",
 *                    "qualityScore": "A",
 *                    "label": "",
 *                    "unitSize": "133",
 *                    "unitSizeUnit": "bag",
 *                    "cuppings": [
 *                      {
 *                        "parchmentQualityGradingId": "GB-0233-1",
 *                        "cuppingTime": "2022-06-12 10:22:55",
 *                        "cupperName": "Cupper name",
 *                        "cuppingFragrance": "Cupper fragrance",
 *                        "cuppingAromas": "Cupper aromas",
 *                        "cuppingFlavour": "1",
 *                        "cuppingAcidity": "1",
 *                        "cuppingAcidityRange": "high",
 *                        "cuppingBody": "1",
 *                        "cuppingBodyRange": "low",
 *                        "cuppingAfterTaste": "after taste",
 *                        "cuppingBalance": "1",
 *                        "cuppingBalanceRange": "1",
 *                        "cuppingNote": "cupping note",
 *                        "cuppingFile": "",
 *                        "finalScore": "60",
 *                      }
 *                    ],
 *                  },
 *                  {
 *                    "id": "GB-0233-2",
 *                    "qualityTitle": "Domestic",
 *                    "quantity": "500",
 *                    "quantityUnit": "kg",
 *                    "qualityScore": "B",
 *                    "label": "",
 *                    "unitSize": "133",
 *                    "unitSizeUnit": "bag",
 *                    "cuppings": [
 *                      {
 *                        "parchmentQualityGradingId": "GB-0233-2",
 *                        "cuppingTime": "2022-06-12 10:22:55",
 *                        "cupperName": "Cupper name",
 *                        "cuppingFragrance": "Cupper fragrance",
 *                        "cuppingAromas": "Cupper aromas",
 *                        "cuppingFlavour": "1",
 *                        "cuppingAcidity": "1",
 *                        "cuppingAcidityRange": "high",
 *                        "cuppingBody": "1",
 *                        "cuppingBodyRange": "low",
 *                        "cuppingAfterTaste": "after taste",
 *                        "cuppingBalance": "1",
 *                        "cuppingBalanceRange": "1",
 *                        "cuppingNote": "cupping note",
 *                        "cuppingFile": "",
 *                        "finalScore": "40",
 *                      }
 *                    ],
 *                  }
 *                ],
 *                "cuppings": [],
 *                "status": "Completed",
 *                "recordId": "test123"
 *              }
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
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Data successfully created.
 *
 */
router.post(
  "/",
  auth,
  duplicateRecordId.handleDuplicateRecordId("ParchmentCoffee"),
  async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      const userId = req.user.id;
      let {
        productTypeId,
        purchaseDate,
        buyingStationParchmentId,
        barcode,
        parchmentChecking,
        parchmentCheckingUnitId,
        qualityControlHumidity,
        qualityControlDensity,
        qualityControlDensityUnit,
        parchmentQualityScore,
        batchProductionKilogramAsalan,
        batchProductionDensity,
        batchProductionDensityUnit,
        batchProductionPrimaryDefect,
        batchProductionSecondaryDefect,
        greenBeansTotal,
        greenBeansBags,
        greenBeansId,
        greenBeansExpiry,
        greenBeansLabel,
        qualityGradings,
        cuppings = [],
        status,
        recordId,
        buyingStationParchments,
      } = req.body;
      const set = {
        dryMillingUserId: userId,
        productTypeId,
        buyingStationParchmentId,
        purchaseDate: moment.utc(purchaseDate, "YYYY-MM-DD"),
        barcode,
        parchmentChecking,
        parchmentCheckingUnitId,
        qualityControlHumidity,
        qualityControlDensity,
        qualityControlDensityUnit,
        parchmentQualityScore: parchmentQualityScore || "",
        batchProductionKilogramAsalan,
        batchProductionDensity,
        batchProductionDensityUnit,
        batchProductionPrimaryDefect,
        batchProductionSecondaryDefect,
        greenBeansTotal,
        greenBeansBags,
        greenBeansId,
        greenBeansExpiry,
        greenBeansLabel,
        status,
        recordId,
      };
      if (!status) {
        delete set.status;
      }

      // for (let keyName in req.files) {
      //     const { size, location, key } = req.files?.[keyName].pop();
      //     set[keyName] = { size, location, key };
      // }

      // if (cuppingFile && typeof cuppingFile == "object") {
      //     set.cuppingFile = {
      //       s3_key: cuppingFile.s3_key,
      //       file_name: `${process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/"}${cuppingFile.s3_key}`
      //     }
      // }

      let parchmentCoffee = await db.ParchmentCoffee.create(set);
      let parchmentCode = null

      const productType = await db.ParchmentProductType.findOne({ where : { id: productTypeId }})

      if(productType.name === 'Coffee') {
        parchmentCode = `GB-${parchmentCoffee.id}-${
          Number(parchmentCoffee.id) % 10
        }`;
      } else {
        parchmentCode = `HP-${parchmentCoffee.id}-${
          Number(parchmentCoffee.id) % 10
        }`;
      }

      const externalId = await insertTraceabilityExternalId(
        "parchment_coffee",
        parchmentCoffee.id
      );
    
      if (externalId) {
        await parchmentCoffee.set({ external_id: externalId.id }).save({ transaction });
      }

      await parchmentCoffee.set({ greenBeansId: parchmentCode }).save({ transaction });
      let cuppingsData = [...cuppings];

      if (qualityGradings && qualityGradings.length) {
        qualityGradings = qualityGradings.map((qualityGrading) => {
          const uniqueIdentifier = qualityGrading.id;

          if (qualityGrading.cuppings && qualityGrading.cuppings.length) {
            cuppingsData.push(...qualityGrading.cuppings);
          }

          delete qualityGrading.id;

          if (qualityGrading.cuppings) delete qualityGrading.cuppings;

          return {
            ...qualityGrading,
            parchmentCoffeeId: parchmentCoffee.id,
            uniqueIdentifier,
          };
        });

        let promiseArr = [],
          promArrRes = [],
          updatePromArr = [];

        qualityGradings.forEach(async (qg) => {
          promiseArr.push(await db.ParchmentQualityGrading.create(qg));
        });

        promArrRes = await Promise.all(promiseArr);

        promArrRes.forEach((upProm) => {
          updatePromArr.push(
            upProm
              .set({
                uniqueIdentifier: `GB-${upProm.id}-${
                  upProm.parchmentCoffeeId
                }-${Number(upProm.id) % 10}`,
              })
              .save({ transaction })
          );
        });

        await Promise.all(updatePromArr);

        // await db.ParchmentQualityGrading.bulkCreate(qualityGradings);
      }

      if (cuppingsData && cuppingsData.length) {
        cuppingsData = cuppingsData.map((cupping) => {
          return {
            ...cupping,
            cuppingTime: cupping.cuppingTime
              ? moment.utc(cupping.cuppingTime, "YYYY-MM-DD")
              : null,
            parchmentCoffeeId: parchmentCoffee.id,
          };
        });

        await db.ParchmentCupping.bulkCreate(cuppingsData, { transaction });
      }

      let _parchmentCoffee = await db.ParchmentCoffee.findOne({
        where: { id: parchmentCoffee.id },
        include: includeAssociations(parchmentCoffee.id),
      });

      if (
        _parchmentCoffee.buyingStationOrder &&
        _parchmentCoffee.buyingStationOrder.processingBatch &&
        _parchmentCoffee.buyingStationOrder.processingBatch.length
      ) {
        _parchmentCoffee.buyingStationOrder.batchRating =
          _parchmentCoffee.buyingStationOrder.processingBatch[0].batchRating;
        delete _parchmentCoffee.buyingStationOrder.processingBatch;
      }

      let batchParchmentMap = [];
      buyingStationParchments.forEach((el) => {
        batchParchmentMap.push({
          parchmentCoffeeId: parchmentCoffee.id,
          buyingStationParchmentId: el.buyingStationParchmentId,
          huskCode: el?.huskCode,
          quantity: el.quantity,
        });
      });

      await db.ParchmentCoffeeProcessingBatch.bulkCreate(batchParchmentMap, {
        transaction,
      });

      let cuppingArr = [];
      if (qualityGradings && qualityGradings.length) {
        qualityGradings.forEach((qG) => {
          if (qG.gradingCuppingData.length ) {
            qG.gradingCuppingData.forEach(async (qcd) => {
              let {
                module_type,
                module_id,
                quality_grading_id,
                cupping_name,
                cupping_date,
                roasting_time,
                roasting_temperature,
                roasting_temperature_unit,
                fragrance,
                fragrance_break,
                fragrance_dry,
                fragrance_qualities,
                flavour,
                flavour_qualities,
                after_taste,
                after_taste_qualities,
                acidity,
                acidity_qualities,
                body,
                body_level,
                body_qualities,
                uniformity,
                clean_cup,
                sweetness,
                overall,
                defect_cups,
                defect_intensity,
                defect_value,
                final_score,
                recordId,
              } = qcd
              cuppingArr.push(
                {
                  module_type,
                  module_id: parchmentCoffee.id,
                  quality_grading_id,
                  cupping_name,
                  cupping_date,
                  roasting_time,
                  roasting_temperature,
                  roasting_temperature_unit,
                  fragrance,
                  fragrance_break,
                  fragrance_dry,
                  fragrance_qualities: fragrance_qualities.join("|"),
                  flavour,
                  flavour_qualities: flavour_qualities.join("|"),
                  after_taste,
                  after_taste_qualities: after_taste_qualities.join("|"),
                  acidity,
                  acidity_qualities: acidity_qualities.join("|"),
                  body,
                  body_level,
                  body_qualities: body_qualities.join("|"),
                  uniformity,
                  clean_cup,
                  sweetness,
                  overall,
                  defect_cups,
                  defect_intensity,
                  defect_value,
                  final_score,
                }
              )
            })
          }
        })
      }

      await db.Cupping.bulkCreate(cuppingArr, {
        transaction,
      });

      await transaction.commit();

      _parchmentCoffee = await db.ParchmentCoffee.findOne({
        where: { id: parchmentCoffee.id },
        include: includeAssociations(parchmentCoffee.id),
      });

      if (
        _parchmentCoffee.buyingStationOrder &&
        _parchmentCoffee.buyingStationOrder.processingBatch &&
        _parchmentCoffee.buyingStationOrder.processingBatch.length
      ) {
        _parchmentCoffee.buyingStationOrder.batchRating =
          _parchmentCoffee.buyingStationOrder.processingBatch[0].batchRating;
        delete _parchmentCoffee.buyingStationOrder.processingBatch;
      }

      return res.json(
        successRespSync({
          msg: success.INSERTED,
          data: _parchmentCoffee,
        })
      );
    } catch (err) {
      await transaction.rollback();
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

/**
 * @swagger
 * /coffee/dry-milling/parchment-coffee/update:
 *   put:
 *     description: Update parchment coffee
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDkwNTE0OTMsImV4cCI6MTY0OTExMTQ5M30.0Z2_N28-K_0Nx1lPV5hjssFCtdb3p5Xw7iQcvZf5IAI'
 *     requestBody:
 *       description: Request body for submitting new contact us inquiry
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                image:
 *                  type: string
 *              required:
 *                - name
 *            example:
 *              {
 *                "id": 1,
 *                "buyingStationParchmentId": 1,
 *                "purchaseDate": "2022-06-08",
 *                "barcode": "barcodeStr",
 *                "parchmentChecking": "Parchment checking",
 *                "parchmentCheckingUnitId": 4,
 *                "qualityControlHumidity": 20,
 *                "qualityControlDensity": 70,
 *                "qualityControlDensityUnit": "kg",
 *                "parchmentQualityScore": "C",
 *                "batchProductionKilogramAsalan": 5,
 *                "batchProductionDensity": 55,
 *                "batchProductionDensityUnit": "kg",
 *                "batchProductionPrimaryDefect": 60,
 *                "batchProductionSecondaryDefect": 70,
 *                "greenBeansTotal": 44,
 *                "greenBeansBags": 34,
 *                "greenBeansExpiry": "2022-06-08",
 *                "greenBeansLabel": "Green beans label",
 *                "greenBeansId": "GB-001",
 *                "qualityGradings": [
 *                  {
 *                    "id": "GB-0233-1",
 *                    "qualityTitle": "Expert2",
 *                    "quantity": "500",
 *                    "quantityUnit": "kg",
 *                    "qualityScore": "A",
 *                    "label": "",
 *                    "unitSize": "133",
 *                    "unitSizeUnit": "bag",
 *                    "cuppings": {
 *                      "parchmentQualityGradingId": "GB-0233-1",
 *                      "cuppingTime": "2022-06-12 10:22:55",
 *                      "cupperName": "Cupper name",
 *                      "cuppingFragrance": "Cupper fragrance",
 *                      "cuppingAromas": "Cupper aromas",
 *                      "cuppingFlavour": "1",
 *                      "cuppingAcidity": "1",
 *                      "cuppingAcidityRange": "high",
 *                      "cuppingBody": "1",
 *                      "cuppingBodyRange": "low",
 *                      "cuppingAfterTaste": "after taste",
 *                      "cuppingBalance": "1",
 *                      "cuppingBalanceRange": "1",
 *                      "cuppingNote": "cupping note",
 *                      "cuppingFile": "",
 *                      "finalScore": "70",
 *                    }
 *                  },
 *                  {
 *                    "id": "GB-0233-2",
 *                    "qualityTitle": "Domestic2",
 *                    "quantity": "500",
 *                    "quantityUnit": "kg",
 *                    "qualityScore": "A",
 *                    "label": "",
 *                    "unitSize": "133",
 *                    "unitSizeUnit": "bag",
 *                    "cuppings": {
 *                      "parchmentQualityGradingId": "GB-0233-2",
 *                      "cuppingTime": "2022-06-12 10:22:55",
 *                      "cupperName": "Cupper name",
 *                      "cuppingFragrance": "Cupper fragrance",
 *                      "cuppingAromas": "Cupper aromas",
 *                      "cuppingFlavour": "1",
 *                      "cuppingAcidity": "1",
 *                      "cuppingAcidityRange": "high",
 *                      "cuppingBody": "1",
 *                      "cuppingBodyRange": "low",
 *                      "cuppingAfterTaste": "after taste",
 *                      "cuppingBalance": "1",
 *                      "cuppingBalanceRange": "1",
 *                      "cuppingNote": "cupping note",
 *                      "cuppingFile": "",
 *                      "finalScore": "30",
 *                    }
 *                  }
 *                ],
 *                "cuppings": [],
 *                "status": "Completed",
 *                "recordId": "test123"
 *              }
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
 *                 example:
 *                   success: true
 *                   code: 200
 *                   message: Data successfully updated.
 *
 */
router.put("/update", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    let {
      id,
      productTypeId,
      purchaseDate,
      buyingStationParchmentId,
      barcode,
      parchmentChecking,
      parchmentCheckingUnitId,
      qualityControlHumidity,
      qualityControlDensity,
      qualityControlDensityUnit,
      parchmentQualityScore,
      batchProductionKilogramAsalan,
      batchProductionDensity,
      batchProductionDensityUnit,
      batchProductionPrimaryDefect,
      batchProductionSecondaryDefect,
      greenBeansTotal,
      greenBeansBag,
      greenBeansId,
      greenBeansExpiry,
      greenBeansLabel,
      qualityGradings,
      cuppings = [],
      status,
      recordId,
    } = req.body;
    const set = {
      purchaseDate: moment.utc(purchaseDate, "YYYY-MM-DD"),
      barcode,
      productTypeId,
      buyingStationParchmentId,
      parchmentChecking,
      parchmentCheckingUnitId,
      qualityControlHumidity,
      qualityControlDensity,
      qualityControlDensityUnit,
      parchmentQualityScore: parchmentQualityScore || "",
      batchProductionKilogramAsalan,
      batchProductionDensity,
      batchProductionDensityUnit,
      batchProductionPrimaryDefect,
      batchProductionSecondaryDefect,
      greenBeansTotal,
      greenBeansBag,
      greenBeansId,
      greenBeansExpiry,
      greenBeansLabel,
      status,
      recordId,
    };

    // for (let keyName in req.files) {
    //     const { size, location, key } = req.files?.[keyName].pop();
    //     set[keyName] = { size, location, key };
    // }

    // if (cuppingFile && typeof cuppingFile == "object") {
    //   let parchmentRes = await db.ParchmentCoffee.findOne({
    //       where: { id: id },
    //   });
    //   let param = {
    //     Bucket: process.env.AWS_PUBLIC_BUCKET,
    //     Key: parchmentRes.cuppingFile.s3_key,
    //   }
    //   await deleteFileS3(param)
    //   set.cuppingFile =set.cuppingFile = {
    //     s3_key: cuppingFile.s3_key,
    //     file_name: `${process.env.PUBLIC_BUCKET_URL || "https://dimitra-public-images.s3.amazonaws.com/"}${cuppingFile.s3_key}`
    //   }
    //  }

    let cuppingsData = [...cuppings];

    await db.ParchmentQualityGrading.destroy({
      where: {
        parchmentCoffeeId: id,
      },
    });

    if (qualityGradings && qualityGradings.length) {
      qualityGradings = qualityGradings.map((qualityGrading) => {
        const uniqueIdentifier = qualityGrading.id;
        delete qualityGrading.id;

        if (qualityGrading.cuppings && qualityGrading.cuppings.length) {
          cuppingsData.push(...qualityGrading.cuppings);
        }

        return {
          ...qualityGrading,
          parchmentCoffeeId: id,
          uniqueIdentifier,
        };
      });

      let promiseArr = [],
        promArrRes = [],
        updatePromArr = [];

      qualityGradings.forEach((qg) => {
        promiseArr.push(db.ParchmentQualityGrading.create(qg));
      });

      promArrRes = await Promise.all(promiseArr);

      promArrRes.forEach((upProm) => {
        updatePromArr.push(
          upProm
            .set({
              uniqueIdentifier: `GB-${upProm.id}-${upProm.parchmentCoffeeId}-${
                Number(upProm.id) % 10
              }`,
            })
            .save()
        );
      });

      await Promise.all(updatePromArr);
    }

    await db.ParchmentCupping.destroy({
      where: {
        parchmentCoffeeId: id,
      },
    });

    if (cuppingsData && cuppingsData.length) {
      cuppingsData = cuppingsData.map((cupping) => {
        return {
          ...cupping,
          cuppingTime: cupping.cuppingTime
            ? moment.utc(cupping.cuppingTime, "YYYY-MM-DD")
            : null,
          parchmentCoffeeId: id,
        };
      });

      await db.ParchmentCupping.bulkCreate(cuppingsData);
    }

    await db.ParchmentCoffee.update(set, {
      where: { id },
    });

    let _parchmentCoffee = await db.ParchmentCoffee.findOne({
      where: { id: id },
      include: includeAssociations(id),
    });

    if (
      _parchmentCoffee.buyingStationOrder &&
      _parchmentCoffee.buyingStationOrder.processingBatch &&
      _parchmentCoffee.buyingStationOrder.processingBatch.length
    ) {
      _parchmentCoffee.buyingStationOrder.batchRating =
        _parchmentCoffee.buyingStationOrder.processingBatch[0].batchRating;
      delete _parchmentCoffee.buyingStationOrder.processingBatch;
    }

    let cuppingArr = [];
      if (qualityGradings && qualityGradings.length) {
        qualityGradings.forEach((qG) => {
          if (qG.gradingCuppingData.length ) {
            qG.gradingCuppingData.forEach(async (qcd) => {
              let {
                module_type,
                module_id,
                quality_grading_id,
                cupping_name,
                cupping_date,
                roasting_time,
                roasting_temperature,
                roasting_temperature_unit,
                fragrance,
                fragrance_break,
                fragrance_dry,
                fragrance_qualities,
                flavour,
                flavour_qualities,
                after_taste,
                after_taste_qualities,
                acidity,
                acidity_qualities,
                body,
                body_level,
                body_qualities,
                uniformity,
                clean_cup,
                sweetness,
                overall,
                defect_cups,
                defect_intensity,
                defect_value,
                final_score,
                recordId,
              } = qcd
              cuppingArr.push(
                {
                  module_type,
                  module_id: id,
                  quality_grading_id,
                  cupping_name,
                  cupping_date,
                  roasting_time,
                  roasting_temperature,
                  roasting_temperature_unit,
                  fragrance,
                  fragrance_break,
                  fragrance_dry,
                  fragrance_qualities: fragrance_qualities.join("|"),
                  flavour,
                  flavour_qualities: flavour_qualities.join("|"),
                  after_taste,
                  after_taste_qualities: after_taste_qualities.join("|"),
                  acidity,
                  acidity_qualities: acidity_qualities.join("|"),
                  body,
                  body_level,
                  body_qualities: body_qualities.join("|"),
                  uniformity,
                  clean_cup,
                  sweetness,
                  overall,
                  defect_cups,
                  defect_intensity,
                  defect_value,
                  final_score,
                }
              )
            })
          }
        })
      }

      await db.Cupping.bulkCreate(cuppingArr, {
        transaction,
      });

    return res.json(
      successRespSync({
        msg: success.UPDATED,
        data: _parchmentCoffee,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /coffee/dry-milling/parchment-coffee/warehouse-options:
 *   get:
 *     description: List all register parchment coffee information which have not been used in warehouse as per the users
 *     tags: [Coffee]
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
 *         description: On success response if data is present related to parchment coffee.
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
 *               example: { "success": true, "code": 200, "message": "Fetched successfully.", "data": [ { "id": 17, "name": "hemant rathore786", "dryMillingParchment": [ { "id": 1, "parchmentQualityScore": "C", "greenBeansTotal": 44, "greenBeansBags": 34, "purchaseDate": "2022-06-08", "idNum": "GB-48-1", "createdDate": "2022-11-28", "buyingStationProcessingBatch": { "id": 48, "buyingStationOrder": [ { "id": 20, "coffeeSpecies": { "id": 1, "name": "three" }, "coffeeVariety": { "id": 1, "name": "two" } }, { "id": 21, "coffeeSpecies": { "id": 1, "name": "three" }, "coffeeVariety": { "id": 1, "name": "two" } } ] } } ] } ] }
 */
router.get("/warehouse-options", auth, translation, async (req, res) => {
  try {
    let where = {
      // '$dryMillingParchment.dryMillingUserId$': userId,
      "$dryMillingParchment.usedForWarehouse$": false,
    };

    // get parchment coffee list
    let rows = await db.user.findAll({
      subQuery: false,
      where,
      order: [
        [db.Sequelize.literal("name"), "asc"],
        ["dryMillingParchment", "createdAt", "desc"],
      ],
      attributes: [
        "id",
        [
          db.Sequelize.fn(
            "CONCAT",
            db.Sequelize.col("user.firstName"),
            " ",
            db.Sequelize.fn("COALESCE", db.Sequelize.col("user.middleName"), ""),
            " ",
            db.Sequelize.col("user.lastName")
          ),
          "name",
        ],
      ],      
      include: [
        {
          required: true,
          model: db.ParchmentCoffee,
          as: "dryMillingParchment",
          attributes: [
            "id",
            "greenBeansTotal",
            "greenBeansBags",
            "purchaseDate",
            [
              db.Sequelize.fn(
                "CONCAT",
                "GB-",
                db.Sequelize.col(
                  "dryMillingParchment.buyingStationParchmentId"
                ),
                "-",
                db.Sequelize.col("dryMillingParchment.id")
              ),
              "idNum",
            ],
            [
              db.Sequelize.fn(
                "DATE_FORMAT",
                db.Sequelize.col("dryMillingParchment.createdAt"),
                "%Y-%m-%d"
              ),
              "createdDate",
            ],
          ],
          include: [
            {
              model: db.BuyingStationProcessingBatch,
              as: "buyingStationProcessingBatch",
              attributes: ["id"],
              include: [
                {
                  model: db.BuyingStationOrder,
                  as: "buyingStationOrder",
                  attributes: ["id"],
                  include: [
                    {
                      model: db.CoffeeSpecies,
                      as: "coffeeSpecies",
                      attributes: ["id", "name"],
                    },
                    {
                      model: db.CoffeeVariety,
                      as: "coffeeVariety",
                      attributes: ["id", "name"],
                    },
                  ],
                  through: {
                    attributes: [],
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    rows = await Promise.all(
      rows?.map(async (user) => {
        user = await user.toJSON();

        user.dryMillingParchment = user.dryMillingParchment.map((parchment) => {
          const species =
            parchment.parchmentCoffeeProcessingBatches &&
            parchment.parchmentCoffeeProcessingBatches.length
              ? parchment.parchmentCoffeeProcessingBatches.map(
                  (parchmentCoffeeProcessingBatch) => {
                    return parchmentCoffeeProcessingBatch
                      ?.buyingStationProcessingBatch?.buyingStationOrder[0]
                      ?.coffeeSpecies;
                  }
                )
              : [];
          const varieties =
            parchment.parchmentCoffeeProcessingBatches &&
            parchment.parchmentCoffeeProcessingBatches.length
              ? parchment.parchmentCoffeeProcessingBatches.map(
                  (parchmentCoffeeProcessingBatch) => {
                    return parchmentCoffeeProcessingBatch
                      ?.buyingStationProcessingBatch?.buyingStationOrder[0]
                      ?.coffeeVariety;
                  }
                )
              : [];
          const qrCode = JSON.stringify({
            id: parchment.idNum,
            purchaseDate: parchment.purchaseDate,
            species: species,
            varieties: varieties,
          });
          // const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

          return { ...parchment, qrCode };
        });

        return user;
      })
    );
    // get buyingstation parchment out list

    usersRes = await db.user.findAll({
      where: { organization: req.user.organization },
    });
    buyingStationWhere = usersRes?.map((userEl) => userEl.id);

    let buyingStationParchData = await db.user.findAll({
      attributes: ["firstName","middleName", "lastName", "fullName", "id"],
      where: {
        id: buyingStationWhere,
      },
      include: {
        model: db.BuyingStationProcessingBatch,
        as: "buyingStationProcessingBatches",
        required: true,
        include: [
          {
            model: db.user,
            as: "buyingStation",
            attributes: ["firstName","middleName", "lastName", "fullName"],
          },
          {
            model: db.BuyingStationOrder,
            through: "BuyingStationProcessingBatchAndOrder",
            as: "buyingStationOrder",
            attributes: ["id"],
            include: [
              {
                model: db.CoffeeSpecies,
                as: "coffeeSpecies",
                attributes: ["id", "name"],
              },
              {
                model: db.CoffeeVariety,
                as: "coffeeVariety",
                attributes: ["id", "name"],
              },
              {
                model: db.user,
                as: "buyingStation",
                attributes: ["firstName","middleName", "lastName", "fullName"],
              },
            ],
            through: {
              attributes: [],
            },
          },
        ],
      },
    });

    let buyingStationParchDataCopy = JSON.parse(
      JSON.stringify(buyingStationParchData)
    );
    let finalBuyingStationData = buyingStationParchDataCopy.map((el) => {
      let tmpObj = {};
      tmpObj.id = el.id;
      tmpObj.name = el.fullName;
      tmpObj.buyingStationProcessingBatches = [];
      tmpObj.buyingStationProcessingBatches =
        el.buyingStationProcessingBatches.filter((fel) => {
          if (fel.parchmentOut) {
            let tmpVar = fel.buyingStation.fullName;
            fel.buyingStation = tmpVar;
            return fel;
          } else {
            return;
          }
        });

      tmpObj.type = "BUYING_STATION";
      return tmpObj;
    });
    rows = [
      ...rows.map((el) => {
        el.type = "DRY_MILLING";
        return el;
      }),
      ...finalBuyingStationData.filter((fel) => {
        if (fel.buyingStationProcessingBatches.length > 0) {
          return fel;
        } else {
          return;
        }
      }),
    ];

    // for translation
    const { lang } = req?.headers;
    if (lang && lang !== "en") {
      rows = req.translateFunction(rows, globalTranslationCache, {
        lvl1: true,
        moduleName: "coffee/dryMilling/parchmentCoffee",
      });
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: rows,
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /coffee/dry-milling/parchment-coffee/list-warehouse:
 *   get:
 *     description: List all register parchment coffee informations which have not been used in warehouse
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: query
 *        name: page
 *        schema:
 *          type: int
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: int
 *        example:
 *          10
 *      - in: query
 *        name: col
 *        schema:
 *          type: string
 *        example:
 *          id
 *      - in: query
 *        name: desc
 *        schema:
 *          type: boolean
 *        example:
 *          true
 *     responses:
 *       200:
 *         description: On success response if data is present related to parchment coffee.
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
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data:
 *                   count: 1
 *                   rows:
 *                   - id: 16
 */
router.get("/list-warehouse", auth, translation, async (req, res) => {
  try {
    let { page = 1, limit = 10, col = "id", desc = "true" } = req.query;
    limit = parseInt(limit);
    const { id: userId } = req.user;
    let { count: totalRows, rows } = await db.ParchmentCoffee.findAndCountAll({
      where: {
        dryMillingUserId: userId,
        usedForWarehouse: false,
      },
      offset: (page - 1) * limit,
      limit: limit,
      distinct: true,
      order: [[col, desc == "false" ? "ASC" : "DESC"]],
      include: includeAssociations(),
    });

    rows = await Promise.all(
      rows?.map(async (parchmentCoffee) => {
        parchmentCoffee = await parchmentCoffee.toJSON();

        const {
          id,
          purchaseDate,
          buyingStationParchmentId,
          buyingStationOrder,
          qualityControlDensity,
          qualityControlHumidity,
          parchmentQualityScore,
          greenBeansBags,
          greenBeansTotal,
          cuppingData,
          greenBeansId
        } = parchmentCoffee;
        const cuppingResult = cuppingData.map((cupping) => ({
          ...cupping,
          fragrance_qualities: cupping.fragrance_qualities
            ? cupping.fragrance_qualities.split("|")
            : [],
          flavour_qualities: cupping.flavour_qualities
            ? cupping.flavour_qualities.split("|")
            : [],
          after_taste_qualities: cupping.after_taste_qualities
            ? cupping.after_taste_qualities.split("|")
            : [],
          acidity_qualities: cupping.acidity_qualities
            ? cupping.acidity_qualities.split("|")
            : [],
          body_qualities: cupping.body_qualities
            ? cupping.body_qualities.split("|")
            : [],
        }));
        const qrCode = JSON.stringify({
          buyingStationParchmentId,
          buyingStationOrder,
          qualityControlDensity,
          qualityControlHumidity,
          parchmentQualityScore,
          parchmentCode: greenBeansId,
          quantity: greenBeansBags,
          id,
          purchaseDate,
          weight: greenBeansTotal,
        });

        return {
          ...parchmentCoffee,
          weight: greenBeansTotal,
          quantity: greenBeansBags,
          qrCode,
          cuppingData: cuppingResult,
        };
      })
    );

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      rows = req.translateFunction(rows, globalTranslationCache, {
        lvl1: true,
        moduleName: "coffee/dryMilling/parchmentCoffee",
      });
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          totalRows,
          numRows: rows?.length ?? 0,
          rows,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /coffee/dry-milling/parchment-coffee/list-outbound:
 *   get:
 *     description: List all register parchment coffee informations which have not been sent for outbound warehouse
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: query
 *        name: page
 *        schema:
 *          type: int
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: int
 *        example:
 *          10
 *      - in: query
 *        name: col
 *        schema:
 *          type: string
 *        example:
 *          id
 *      - in: query
 *        name: desc
 *        schema:
 *          type: boolean
 *        example:
 *          true
 *     responses:
 *       200:
 *         description: On success response if data is present related to parchment coffee.
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
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data:
 *                   count: 1
 *                   rows:
 *                   - id: 16
 */
router.get("/list-outbound", auth, translation, async (req, res) => {
  try {
    let { page = 1, limit = 10, col = "id", desc = "true" } = req.query;
    limit = parseInt(limit);
    const { id: userId } = req.user;
    let { count: totalRows, rows } = await db.ParchmentCoffee.findAndCountAll({
      where: {
        dryMillingUserId: userId,
        outboundSent: false,
        usedForWarehouse: true,
      },
      offset: (page - 1) * limit,
      limit: limit,
      distinct: true,
      order: [[col, desc == "false" ? "ASC" : "DESC"]],
      include: includeAssociations(),
    });

    rows = await Promise.all(
      rows?.map(async (parchmentCoffee) => {
        parchmentCoffee = await parchmentCoffee.toJSON();

        const {
          id,
          purchaseDate,
          buyingStationParchmentId,
          buyingStationOrder,
          qualityControlDensity,
          qualityControlHumidity,
          parchmentQualityScore,
          greenBeansBags,
          greenBeansTotal,
          greenBeansId
        } = parchmentCoffee;
        const qrCodeData = {
          buyingStationParchmentId,
          buyingStationOrder,
          qualityControlDensity,
          qualityControlHumidity,
          parchmentQualityScore,
          parchmentCode: greenBeansId,
          id,
          purchaseDate,
          quantity: greenBeansBags,
          weight: greenBeansTotal,
        };
        const qrCode = await QRCode.toDataURL(JSON.stringify(qrCodeData));

        return {
          ...parchmentCoffee,
          weight: greenBeansTotal,
          quantity: greenBeansBags,
          qrCode,
        };
      })
    );
    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      rows = req.translateFunction(rows, globalTranslationCache, {
        lvl1: true,
        moduleName: "coffee/dryMilling/parchmentCoffee",
      });
    }
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          totalRows,
          numRows: rows?.length ?? 0,
          rows,
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

/**
 * @swagger
 * /coffee/dry-milling/parchment-coffee/list:
 *   get:
 *     description: List all register parchment coffee informations
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: query
 *        name: page
 *        schema:
 *          type: int
 *        example:
 *          1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: int
 *        example:
 *          10
 *      - in: query
 *        name: col
 *        schema:
 *          type: string
 *        example:
 *          id
 *      - in: query
 *        name: desc
 *        schema:
 *          type: boolean
 *        example:
 *          true
 *      - in: query
 *        name: parchmentId
 *        schema:
 *          type: string
 *        example:
 *           PC-001
 *      - in: query
 *        name: status
 *        description: choose from ['All', 'Completed', 'Parchment Coffee', 'Quality Control', 'Batch Production', 'Green Beans', 'Cupping']
 *        schema:
 *          type: string
 *        example:
 *          all
 *     responses:
 *       200:
 *         description: On success response if data is present related to parchment coffee.
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
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data:
 *                   count: 1
 *                   rows:
 *                   - id: 16
 */
router.get(
  "/list",
  auth,
  translation,
  // validate.listValidation(),
  // validationErrorHandler,
  async (req, res) => {
    try {
      let {
        page = 1,
        limit = 10,
        col = "id",
        desc = "true",
        status,
        parchmentId = null,
      } = req.query;
      let { id: userId } = req.user;
      limit = parseInt(limit);
      let where = { dryMillingUserId: userId };

      if (!_.isEmpty(status)) {
        if (status.toLowerCase() !== "all") {
          where.status = status;
        }
      }

      if (parchmentId) {
        if (parchmentId.includes("PC-")) {
          parchmentId = parchmentId.split("PC-")[1];
        }

        where.id = parchmentId;
      }

      let { count: totalRows, rows } = await db.ParchmentCoffee.findAndCountAll(
        {
          attributes: {
            exclude: ["dryMillingUserId"],
          },
          where,
          offset: (page - 1) * limit,
          limit: limit,
          distinct: true,
          order: [[col, desc == "false" ? "ASC" : "DESC"]],
          include: includeAssociations(),
        }
      );

      rows = JSON.parse(JSON.stringify(rows));
      rows = rows.map((data) => ({
        ...data,
        qualityGradings: data.qualityGradings.map((qG) => ({
          ...qG,
          gradingCuppingData: qG.gradingCuppingData.map((cupping) => ({
            ...cupping,
            fragrance_qualities: cupping.fragrance_qualities
              ? cupping.fragrance_qualities.split("|")
              : [],
            flavour_qualities: cupping.flavour_qualities
              ? cupping.flavour_qualities.split("|")
              : [],
            after_taste_qualities: cupping.after_taste_qualities
              ? cupping.after_taste_qualities.split("|")
              : [],
            acidity_qualities: cupping.acidity_qualities
              ? cupping.acidity_qualities.split("|")
              : [],
            body_qualities: cupping.body_qualities
              ? cupping.body_qualities.split("|")
              : [],
            balance_qualities: cupping.balance_qualities
              ? cupping.balance_qualities.split("|")
              : [],
          })),
        })),
        cuppingData: data.cuppingData.map((cupping) => ({
          ...cupping,
          fragrance_qualities: cupping.fragrance_qualities
            ? cupping.fragrance_qualities.split("|")
            : [],
          flavour_qualities: cupping.flavour_qualities
            ? cupping.flavour_qualities.split("|")
            : [],
          after_taste_qualities: cupping.after_taste_qualities
            ? cupping.after_taste_qualities.split("|")
            : [],
          acidity_qualities: cupping.acidity_qualities
            ? cupping.acidity_qualities.split("|")
            : [],
          body_qualities: cupping.body_qualities
            ? cupping.body_qualities.split("|")
            : [],
          balance_qualities: cupping.balance_qualities
            ? cupping.balance_qualities.split("|")
            : [],
        })),
      }));
      rows = await Promise.all(
        rows?.map(async (parchmentCoffee) => {
          // parchmentCoffee = await parchmentCoffee.toJSON();

          if (
            parchmentCoffee.buyingStationOrder &&
            parchmentCoffee.buyingStationOrder.processingBatch &&
            parchmentCoffee.buyingStationOrder.processingBatch.length
          ) {
            parchmentCoffee.buyingStationOrder.batchRating =
              parchmentCoffee.buyingStationOrder.processingBatch[0].batchRating;
            delete parchmentCoffee.buyingStationOrder.processingBatch;
          }

          const {
            id,
            purchaseDate,
            buyingStationParchmentId,
            buyingStationOrder,
            qualityControlDensity,
            qualityControlHumidity,
            parchmentQualityScore,
            greenBeansBags,
            greenBeansTotal,
            greenBeansId
          } = parchmentCoffee;
          const qrCode = JSON.stringify({
            buyingStationParchmentId,
            buyingStationOrder,
            qualityControlDensity,
            qualityControlHumidity,
            parchmentQualityScore,
            parchmentCode: greenBeansId,
            id,
            purchaseDate,
            quantity: greenBeansBags,
            weight: greenBeansTotal,
          });

          return {
            ...parchmentCoffee,
            weight: greenBeansTotal,
            quantity: greenBeansBags,
            qrCode,
          };
        })
      );

      const { lang } = req?.headers;

      if (lang && lang !== "en") {
        rows = req.translateFunction(rows, globalTranslationCache, {
          lvl1: true,
          moduleName: "coffee/dryMilling/parchmentCoffee",
        });
      }

      rows?.forEach((el) => {
        if (el.greenBeansLabel) {
          let parsedObj = JSON.parse(el.greenBeansLabel);
          parsedObj.labelUrl = `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${el.external_id}`;
          el.greenBeansLabel = JSON.stringify(parsedObj);
        }
        if (el.qualityGradings) {
          el.qualityGradings.forEach(qualityGrading => {
            if(qualityGrading.label) {
              let parsedObj = JSON.parse(qualityGrading.label);
              parsedObj.labelUrl = `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${el.external_id}`;
              qualityGrading.label = JSON.stringify(parsedObj);
            }
          })
        }
        el.externalLabelUrl = `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${el.external_id}`
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: {
            totalRows,
            numRows: rows?.length ?? 0,
            rows,
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
 * /coffee/dry-milling/parchment-coffee/{id}:
 *   get:
 *     description: Fetch details of the register parchment coffee with id
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: path
 *        name: id
 *        schema:
 *          type: int
 *          minimum: 1
 *        example:
 *          1
 *     responses:
 *       200:
 *         description: On success response if data is present related to the id.
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
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data:
 *                     id: 16
 */
router.get(
  "/:id",
  auth,
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { id: userId } = req.user;
      let { id } = req.params;

      let parchmentCoffee = await db.ParchmentCoffee.findOne({
        where: { id },
        include: includeAssociations(id),
      });

      if (!parchmentCoffee || !parchmentCoffee.id) {
        throw new Error("Parchment coffee not found");
      }

      parchmentCoffee = await parchmentCoffee.toJSON();

      if (
        parchmentCoffee.buyingStationOrder &&
        parchmentCoffee.buyingStationOrder.processingBatch &&
        parchmentCoffee.buyingStationOrder.processingBatch.length
      ) {
        parchmentCoffee.buyingStationOrder.batchRating =
          parchmentCoffee.buyingStationOrder.processingBatch[0].batchRating;
        delete parchmentCoffee.buyingStationOrder.processingBatch;
      }

      const {
        purchaseDate,
        buyingStationParchmentId,
        buyingStationOrder,
        qualityControlDensity,
        qualityControlHumidity,
        parchmentQualityScore,
        greenBeansBags,
        greenBeansTotal,
      } = parchmentCoffee;
      const qrCode = {
        buyingStationParchmentId,
        buyingStationOrder,
        qualityControlDensity,
        qualityControlHumidity,
        parchmentQualityScore,
        parchmentCode: `PC-${id}`,
        id,
        purchaseDate,
        quantity: greenBeansBags,
        weight: greenBeansTotal,
      };

      parchmentCoffee.weight = greenBeansTotal;
      parchmentCoffee.quantity = greenBeansBags;

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { parchmentCoffee, qrCode },
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

// for tracebility
router.get(
  "/tracebility/:id",
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { id } = req.params;

      let parchmentCoffee = await db.ParchmentCoffee.findOne({
        where: { id },
        include: [
          {
            model: db.Cupping,
            as: "cuppingData",
          },
          {
            model: db.ParchmentCoffeeProcessingBatch,
            as: "parchmentBatchMap",
            include: [
              {
                model: db.BuyingStationProcessingBatch,
                as: "buyingStationProcessingBatch",

                include: [
                  {
                    model: db.BuyingStationOrder,
                    as: "buyingStationOrder",
                    through: "BuyingStationProcessingBatchAndOrder",
                    include: [
                      {
                        model: db.BuyingStationProcessingBatch,
                        through: {
                          model: db.BuyingStationProcessingBatchAndOrder,
                          attributes: [],
                        },
                        attributes: ["batchRating"],
                        as: "processingBatch",
                      },
                      {
                        model: db.user,
                        as: "buyingStation",
                        attributes: [
                          "address",
                          "firstName",
                          "middleName",
                          "lastName",
                          "fullName",
                        ],
                      },
                      {
                        model: db.user,
                        as: "farmer",
                      },
                      {
                        model: db.Plantations,
                        as: "plantations",
                        include: [
                          {
                            model: db.CoffeeVariety,
                            as: "coffeeVariety",
                          },
                          {
                            model: db.HorticultureInformation,
                            as: "horticultureInformation",
                            through: {
                              model: db.HorticultureInformationMapData,
                              attributes: ["number_of_trees"],
                            },
                          },
                          {
                            model: db.WindBreaker,
                            as: "windBreakerTree",
                            through: {
                              model: db.WindBreakerTreeMapData,
                              attributes: ["number_of_trees"],
                            },
                          },
                          {
                            model: db.ShadeTree,
                            as: "shadeTree",
                            through: {
                              model: db.ShadeTreeMapData,
                              attributes: ["number_of_trees"],
                            },
                          },
                          {
                            model: db.user_farm,
                            as: "userFarms",
                            through: "PlantationsUserFarmsMap",
                          },
                          {
                            model: db.CoffeeLandImages,
                            as: "coffeeLandImages",
                          },
                        ],
                      },
                      {
                        model: db.user_farm,
                        as: "userFarms",
                      },
                      {
                        model: db.CoffeeSpecies,
                        as: "coffeeSpecies",
                      },
                      {
                        model: db.CoffeeVariety,
                        as: "coffeeVariety",
                      },
                      {
                        model: db.CoffeeType,
                        as: "coffeeType",
                        required: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: db.user,
            as: "dryMilling",
            attributes: ["address", "firstName","middleName", "lastName", "fullName"],
          },
        ],
      });

      if (!parchmentCoffee || !parchmentCoffee.id) {
        throw new Error("Parchment coffee not found");
      }

      parchmentCoffee = await parchmentCoffee.toJSON();
      const org_id = await db.user.findOne({ 
        where: { id: parchmentCoffee.dryMillingUserId},
        attributes: ["organization"]
      })

      let globalSetting = {};
      const unitArea = await db.GlobalSetting.findOne({
        attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
        include: [
          {
            model: db.UnitsList,
            as: "areaUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
        ],
        where: { org_id: org_id.dataValues.organization }
      });
      
      globalSetting["areaunit"] = unitArea.areaUnit;
      globalSetting["weightunit"] = unitArea.weightUnit;

      if (
        parchmentCoffee.buyingStationOrder &&
        parchmentCoffee.buyingStationOrder.processingBatch &&
        parchmentCoffee.buyingStationOrder.processingBatch.length
      ) {
        parchmentCoffee.buyingStationOrder.batchRating =
          parchmentCoffee.buyingStationOrder.processingBatch[0].batchRating;
        delete parchmentCoffee.buyingStationOrder.processingBatch;
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { parchmentCoffee, globalSetting },
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
 * /coffee/dry-milling/parchment-coffee/buying-station-processing-batch/{batchCode}:
 *   get:
 *     description: Fetch details of the register buying station procession batch checking with id
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: path
 *        name: batchCode
 *        schema:
 *          type: string
 *          minimum: 1
 *        example:
 *          1
 *     responses:
 *       200:
 *         description: On success response if data is present related to the id.
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
 *                 success: true
 *                 code: 200
 *                 message: Fetched successfully.
 *                 data:
 *                     batchCode: PB-0001
 */
router.get(
  "/buying-station-processing-batch/:batchCode",
  auth,
  // validationErrorHandler,
  async (req, res) => {
    try {
      let { id: userId } = req.user;
      let { batchCode } = req.params;

      let buyingStationProcessingBatch =
        await db.BuyingStationProcessingBatch.findOne({
          where: { batchCode },
          include: [
            {
              model: db.BuyingStationOrder,
              through: {
                model: db.BuyingStationProcessingBatchAndOrder,
                attributes: [],
              },
              as: "buyingStationOrder",
              attributes: {
                exclude: ["qrCode", "isdeleted", "createdAt", "updatedAt"],
              },
              include: [
                {
                  model: db.user,
                  as: "buyingStation",
                  attributes: ["firstName","middleName", "lastName", "fullName"],
                },
              ],
            },
          ],
        });

      if (!buyingStationProcessingBatch || !buyingStationProcessingBatch.id) {
        return res.json(
          await errorResp({
            code: success.code.OK,
            msg: "Buying station processing batch not found.",
          })
        );
      }

      buyingStationProcessingBatch =
        await buyingStationProcessingBatch.toJSON();

      const { batchRating } = buyingStationProcessingBatch;
      const { coffeeCherryPic } =
        buyingStationProcessingBatch.buyingStationOrder;
      let fullName = "";

      if (
        buyingStationProcessingBatch.buyingStationOrder &&
        buyingStationProcessingBatch.buyingStationOrder.length
      ) {
        fullName =
          buyingStationProcessingBatch.buyingStationOrder[0].buyingStation
            .fullName;
      }

      const qrCode = JSON.stringify({
        batchRating,
        coffeeCherryPic,
        buyingStation: fullName,
      });

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: { buyingStationProcessingBatch, qrCode },
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
 * /coffee/dry-milling/parchment-coffee/delete/{id}:
 *   delete:
 *     description: Delete parchment coffee data with id
 *     tags: [Coffee]
 *     parameters:
 *      - in: header
 *        name: oauth-token
 *        required: true
 *        schema:
 *          type: string
 *        example:
 *          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Mjl9LCJpYXQiOjE2NDgxODYyNTQsImV4cCI6MTY0ODI0NjI1NH0.ZpH6Y3CcHTaAkLtJtFQqsbe40kWhup299AHJqhNjG1g'
 *      - in: path
 *        name: id
 *        schema:
 *          type: int
 *          minimum: 1
 *        example:
 *          1
 *     responses:
 *       200:
 *         description: On success response if data is present related to the id.
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
 *                 success: true
 *                 code: 200
 *                 message: Parchment coffee data deleted successfully.
 *                 data:
 */
router.delete(
  "/delete/:id",
  auth,
  // validatorSoilMgmt.exist(),
  // validationErrorHandler,
  async function (req, res) {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;

      const transaction = await db.sequelize.transaction();
      try {
        await db.ParchmentCupping.destroy({
          where: {
            parchmentCoffeeId: id,
          },
        });
        await db.ParchmentCupping.destroy({
          where: {
            parchmentCoffeeId: id,
          },
        });
        await db.ParchmentCoffee.destroy({
          where: { id: id, dryMillingUserId: userId },
          transaction,
        });

        await transaction.commit();
        return res.json(
          successRespSync({
            msg: "Parchment coffee deleted.",
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
  }
);

module.exports = router;
