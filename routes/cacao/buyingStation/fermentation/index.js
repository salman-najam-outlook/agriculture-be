const express = require("express");
const router = express.Router();
const _ = require("lodash");
const moment = require("moment");
const { Op } = require("sequelize");
const auth = require(rootPath + "/middleware/auth");
const db = require(rootPath + "/models");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const { success, error } = require(rootPath + "/helpers/language");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");
const translation = require(rootPath + "/middleware/translation");
const insertTraceabilityExternalId = require(rootPath +
  "/helpers/externalTracebilityId");

const formentationStatusInt = (status) => {
  const statusObj = {
    Pending: 0,
    Completed: 1,
    All: 2,
  };
  return statusObj[status];
};

// CREATE VISUAL-IDENTIFICATION
router.post("/visual-identification", auth, async (req, res) => {

  try {
    const { name } = req.body;

    let data = await db.CacaoBatchVisualIdentification.create({ name, userId: req.user.id });


    return res.json(
      successRespSync({
        msg: success.REGISTERED,
        data: data,
      })
    );
  } catch (err) {

    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get("/visual-identification", auth, async (req, res) => {
  try {
    let data = await db.CacaoBatchVisualIdentification.findAll({
      where: {
        userId: req.user.id
      }
    });
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: data,
      })
    );
  } catch (err) {
    await t?.rollback();
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.post("/", auth, async (req, res) => {
  const { id: userId } = req.user;



  try {
    const {
      startDate,
      endDate,
      purchaseOrder,
      initialWeight,
      finalWeight,
      performance,
      fermentationPercentage,
      fermentationMethod,
      status = "Pending",
      visualIdentification,
      recordId,
    } = req.body;

    const set = {
      startDate: moment
        .utc(startDate, process.env.ACCEPT_DATE_FORMAT)
        .format(process.env.DB_ONLYDATE_FORMAT),
      endDate: moment
        .utc(endDate, process.env.ACCEPT_DATE_FORMAT)
        .format(process.env.DB_ONLYDATE_FORMAT),
      initialWeight,
      finalWeight,
      performance,
      fermentationPercentage,
      fermentationMethod,
      status,
      visualIdentification,
      buyingStationId: userId,
      recordId,
    };
    let fermentationProcess = await db.CacaoFermentationProcess.create(set, {

    });
    let fermentationCode = `PB-000${fermentationProcess?.id}`;
    let external_id = `Dd-00${fermentationProcess?.id}`;
    const externalId = await insertTraceabilityExternalId(
      "cacao_processing_batch",
      fermentationProcess.id
    );
    await fermentationProcess
      .set({
        fermentationCode,
        external_id,
        external_traceability_id: externalId.id,
      })
      .save();

    for (let [index, purchase] of purchaseOrder.entries()) {
      let cacaoPurchaseOrder = await db.CacaoPurchaseOrder.findOne({
        where: {
          [Op.or]: [{ id: purchase.orderId }, { recordId: purchase.orderId }],
        },
        attributes: ["availableWeight", "id"],
      });
      if (!cacaoPurchaseOrder) {
        throw new Error(error.PURCHASE_ORDER_NOT_FOUND);
      }
      let updatedWeight =
        cacaoPurchaseOrder.availableWeight - purchase.quantity;
      if (updatedWeight < 0) updatedWeight = 0
      await db.CacaoPurchaseOrder.update(
        {
          availableWeight: updatedWeight,
        },
        {
          where: { id: cacaoPurchaseOrder.id },
        },

      );
      if(cacaoPurchaseOrder.id) {
        await db.CacaoFermentationAndPurchaseOrder.create(
          {
            purchaseOrderId: parseInt(cacaoPurchaseOrder.id),
            fermentationId: fermentationProcess.id,
          },

        );
        await db.CacaoFermentationAndBatchVisual.create({
          batchVisualId: visualIdentification[index],
          fermentationId: fermentationProcess.id,
        });
      }
      
    }

    // CREATE FERMENTATION VISUAL IDENTIFICATION

    let newfermentationProcess = await db.CacaoFermentationProcess.findOne({
      where: {
        id: fermentationProcess.id,
      },
      include: [
        {
          model: db.CacaoFermentationMethod,
          as: "fermentationMethodName",
          attributes: ["name"],
        },
        {
          model: db.CacaoPurchaseOrder,
          as: "cacaoPurchaseOrder",
          required: false,
          exclude: ["CacaoFermentationAndPurchaseOrder"],
          include: [
            {
              model: db.user_farm,
              as: "userFarms",
              attributes: ["id", "farmName"],
            },
            {
              model: db.user,
              as: "farmer",
              attributes: ["firstName","middleName", "lastName"],
            },
            {
              model: db.CacaoVariety,
              as: "cacaoVariety",
              attributes: ["id", "name"],
            },
            {
              model: db.CacaoSpecies,
              as: "cacaoSpecies",
              attributes: ["id", "name"],
            },
            {
              model: db.CacaoPlantations,
              as: "cacaoPlantations",
              attributes: ["id", "plantation_name"],
            },
          ],
        },
        {
          model: db.CacaoBatchVisualIdentification,
          as: "fermentationBatchVisual",
          attributes: ["id", "name"],
          required: false,
        },
      ],
    });



    return res.json(
      successRespSync({
        msg: success.REGISTERED,
        data: newfermentationProcess,
      })
    );
  } catch (error) {
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

router.get("/", auth, translation, async (req, res) => {
  try {
    let {
      page = 1,
      limit = 1000,
      col = "id",
      order = "desc",
      dateRange,
      status,
      search,
    } = req.query;
    limit = parseInt(limit);
    const { id: buyingStationId } = req.user;

    let where = { buyingStationId };
    if (!_.isEmpty(dateRange)) {
      dateRange = dateRange
        .split("-")
        ?.map((date) =>
          moment
            .utc(date, process.env.ACCEPT_DATE_FORMAT)
            .format(process.env.DB_ONLYDATE_FORMAT)
        );
      where.startDate = { [db.Sequelize.Op.between]: dateRange };
    }

    if (!_.isEmpty(status)) {
      switch (status) {
        case "completed":
          where.endDate = {
            [db.Sequelize.Op.lt]: moment
              .utc()
              .format(process.env.DB_ONLYDATE_FORMAT),
          };
          break;
        case "pending":
          where.endDate = {
            [db.Sequelize.Op.gte]: moment
              .utc()
              .format(process.env.DB_ONLYDATE_FORMAT),
          };
          break;
        default:
      }
    }

    if (!_.isEmpty(search)) {
      const fields = [
        "fermentationCode",
        "initialWeight",
        "finalWeight",
        "performance",
        "fermentationPercentage",
        "fermentationMethod",
      ];
      const searchQuery = fields.map((col) => {
        return {
          [col]: {
            [db.Sequelize.Op.substring]: search,
          },
        };
      });
      where = { ...where, [db.Sequelize.Op.or]: searchQuery };
    }

    let { count: totalRows, rows } =
      await db.CacaoFermentationProcess.findAndCountAll({
        where: {
          ...where,
        },
        offset: (page - 1) * limit,
        limit: limit,
        order: [[col, order]],
        distinct: true,
        attributes: { include: [["external_traceability_id", "external_id"] ], exclude: ["updatedAt", "external_id"] },
        include: [
          {
            model: db.CacaoFermentationMethod,
            as: "fermentationMethodName",
            attributes: ["name"],
          },
          {
            model: db.CacaoPurchaseOrder,
            as: "cacaoPurchaseOrder",
            required: false,
            include: [
              {
                model: db.user_farm,
                as: "userFarms",
                attributes: ["id", "farmName"],
              },
              {
                model: db.user,
                as: "farmer",
                attributes: ["firstName","middleName", "lastName"],
              },
              {
                model: db.CacaoVariety,
                as: "cacaoVariety",
                attributes: ["id", "name"],
              },
              {
                model: db.CacaoSpecies,
                as: "cacaoSpecies",
                attributes: ["id", "name"],
              },
              {
                model: db.CacaoPlantations,
                as: "cacaoPlantations",
                attributes: ["id", "plantation_name"],
              },
              {
                model: db.Currency,
                as: 'currency'
              }
            ],
          },
          {
            model: db.CacaoBatchVisualIdentification,
            as: "fermentationBatchVisual",
            attributes: ["id", "name"],
            required: false,
          },
          // {
          //     model: db.CacaoPurchaseOrder,
          //     as: 'cacaoPurchaseOrder',
          //     attributes: {
          //         exclude: ['isdeleted', 'createdAt', 'updatedAt'],
          //     },
          //     include: [
          //         {
          //             model: db.user,
          //             as: 'buyingStation',
          //             attributes: ['firstName', 'lastName', 'fullName'],
          //         },
          //         {
          //             model: db.user,
          //             as: 'farmer',
          //             attributes: ['firstName', 'lastName'],
          //         },
          //         {
          //             model: db.user_farm,
          //             as: 'userFarms',
          //             attributes: ['id', 'farmName'],
          //         },
          //         {
          //             model: db.CacaoVariety,
          //             as: 'cacaoVariety',
          //             attributes: ["id", "name",],
          //         },
          //         {
          //             model: db.CacaoSpecies,
          //             as: 'cacaoSpecies',
          //             attributes: ["id", "name",],
          //         },
          //         {
          //             model: db.CacaoPlantations,
          //             as: 'cacaoPlantations',
          //             attributes: ['id', 'plantation_name'],
          //         },
          //     ]
          // },
        ],
      });

    rows = await Promise.all(
      rows?.map(async (fermentation) => {
        fermentation = await fermentation.toJSON();
        const { buyingStation } = fermentation;

        let buyingStationName = "";
        buyingStationName = buyingStation && buyingStation.fullName;
        // add qr code string for the pruchase order

        const {
          startDate,
          endDate,
          fermentationReady,
          fermentationCode,
          initialWeight,
          finalWeight,
          performance,
          fermentationPercentage,
          recordId,
          external_traceability_id
        } = fermentation;
        let qrCode = JSON.stringify({
          id: fermentation.id,
          startDate: startDate,
          endDate: endDate,
          fermentationReady: fermentationReady,
          fermentationCode: fermentationCode,
          initialWeight: initialWeight,
          finalWeight: finalWeight,
          fermentationMethodName: fermentation.fermentationMethodName?.name,
          performance,
          fermentationPercentage,
          recordId,
          external_traceability_id
        });

        const statusCode = formentationStatusInt(fermentation.status);

        let externalQR = `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${external_traceability_id}`;

        return {
          ...fermentation,
          statusCode,
          buyingStation: buyingStationName,
          qrCode,
          externalQR,
        };
      })
    );

    const { lang } = req?.headers;

    if (lang && lang !== "en") {
      rows = req.translateFunction(rows, globalTranslationCache, {
        lvl1: true,
        moduleName: "cacao/buyingStation/fermentation",
      });
    }

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: {
          fermentationprocess: { totalRows, numRows: rows?.length ?? 0, rows },
        },
      })
    );
  } catch (err) {
    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.get(
  "/methods",
  translation,
  validationErrorHandler,
  async (req, res) => {
    try {
      let fermentationMethods = await db.CacaoFermentationMethod.findAll();
      const { lang } = req?.headers;
      if (lang && lang !== "en") {
        fermentationMethods = req.translateFunction(
          fermentationMethods,
          globalTranslationCache,
          {
            lvl1: true,
          }
        );
      }

      return res.json(
        successRespSync({
          msg: success.FETCH,
          data: fermentationMethods,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.put("/complete", auth, async (req, res) => {

  try {
    const { fermentationId, fermentationStatus = "Completed" } = req.body;

    let fermentationProcess = await db.CacaoFermentationProcess.update(
      {
        status: fermentationStatus,
      },
      {
        where: {
          id: fermentationId,
        },
      },

    );

    fermentationProcess = await db.CacaoFermentationProcess.findOne({
      where: {
        id: fermentationId,
      },

    });



    return res.json(
      successRespSync({
        msg: success.UPDATED,
        data: fermentationProcess,
      })
    );
  } catch (error) {

    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

router.put("/:fermentationId", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { fermentationId } = req.params;
    const {
      startDate,
      endDate,
      purchaseOrder,
      initialWeight,
      finalWeight,
      performance,
      fermentationPercentage,
      fermentationMethod,
      status,
      visualIdentification,
    } = req.body;

    let set = {
      ...(startDate && { startDate: startDate }),
      ...(endDate && { endDate: endDate }),
      ...(initialWeight && { initialWeight: initialWeight }),
      ...(finalWeight && { finalWeight: finalWeight }),
      ...(performance && { performance: performance }),
      ...(fermentationPercentage && {
        fermentationPercentage: fermentationPercentage,
      }),
      ...(fermentationMethod && { fermentationMethod: fermentationMethod }),
      ...(status && { status: status }),
    };


    let fermentationUpdate = await db.CacaoFermentationProcess.update(set, {
      where: {
        id: fermentationId,
      },

    });

    if (purchaseOrder && purchaseOrder.length > 0) {
      // delete old cacao purchase order
      await db.CacaoFermentationAndPurchaseOrder.destroy({
        where: {
          fermentationId: fermentationId,
        },

      });

      const setFermentationAndPurchase = purchaseOrder?.map((orderId) => ({
        purchaseOrderId: orderId?.orderId || orderId,
        fermentationId: fermentationId,
      }));
      await db.CacaoFermentationAndPurchaseOrder.bulkCreate(
        setFermentationAndPurchase,

      );
    }

    if (visualIdentification && visualIdentification.length > 0) {
      // delete old cacao visual identification
      await db.CacaoFermentationAndBatchVisual.destroy({
        where: {
          fermentationId: fermentationId,
        },

      });
      const setFermentationVisual = visualIdentification?.map((vId) => ({
        batchVisualId: parseInt(vId),
        fermentationId: fermentationId,
      }));

      await db.CacaoFermentationAndBatchVisual.bulkCreate(
        setFermentationVisual,

      );
    }



    let resData = await db.CacaoFermentationProcess.findOne({
      where: {
        id: fermentationId,
      },
      include: [
        {
          model: db.CacaoFermentationMethod,
          as: "fermentationMethodName",
          attributes: ["name"],
        },
        {
          model: db.CacaoPurchaseOrder,
          as: "cacaoPurchaseOrder",
          required: false,
          exclude: ["CacaoFermentationAndPurchaseOrder"],
          include: [
            {
              model: db.user_farm,
              as: "userFarms",
              attributes: ["id", "farmName"],
            },
            {
              model: db.user,
              as: "farmer",
              attributes: ["firstName","middleName", "lastName"],
            },
            {
              model: db.CacaoVariety,
              as: "cacaoVariety",
              attributes: ["id", "name"],
            },
            {
              model: db.CacaoSpecies,
              as: "cacaoSpecies",
              attributes: ["id", "name"],
            },
            {
              model: db.CacaoPlantations,
              as: "cacaoPlantations",
              attributes: ["id", "plantation_name"],
            },
          ],
        },
        {
          model: db.CacaoBatchVisualIdentification,
          as: "fermentationBatchVisual",
          attributes: ["id", "name"],
          required: false,
        },
      ],
    });

    return res.json(
      successRespSync({
        msg: success.UPDATED,
        data: resData,
      })
    );
  } catch (err) {

    logErrorOccurred(__filename, err);
    return serverError(res, err);
  }
});

router.delete(
  "/:fermentationId",
  auth,
  validationErrorHandler,
  async (req, res) => {
    try {
      const { fermentationId } = req.params;
      let set = {
        isdeleted: new Date(),
      };


      let fermentationProcess = await db.CacaoFermentationProcess.update(set, {
        where: {
          id: fermentationId,
        },
      });


      return res.json(
        successRespSync({
          msg: success.DELETED,
          data: {},
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
