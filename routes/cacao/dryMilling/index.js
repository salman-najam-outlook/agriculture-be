const express = require("express");
const router = express.Router();
const auth = require(rootPath + "/middleware/auth");
const db = require(rootPath + "/models");
const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const duplicateRecordId = require(rootPath + "/middleware/duplicateRecordId");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const flavor = require("./flavor");
const production = require("./production");
const cacaoDryMillingValidator = require(rootPath +
  "/helpers/validators/cacao/dryMilling");
const insertTraceabilityExternalId = require(rootPath +
  "/helpers/externalTracebilityId");
const validationErrorHandler = require(rootPath + 
  "/middleware/validation_error_handler");
const translation = require(rootPath + "/middleware/translation");

router.get("/", translation, auth, async (req, res) => {
  try {
    let { page = 1, limit = 10, col = "id", desc = "true" } = req.query;
    limit = parseInt(limit);
    const { id: userId } = req.user;
    const { lang } = req?.headers;
    let { count: totalRows, rows } =
      await db.CacaoDryingProcess.findAndCountAll({
        where: {
          dryRegisterUserId: userId,
          isdeleted: null,
        },
        include: [
          {
            model: db.CacaoDryMillingFlavor,
            as: "dryMillingFlavor",
            required: false,
            attributes: ["id", "name"],
          },
          {
            model: db.DryingType,
            as: "cacaoDryingType",
            required: false,
            attributes: ["id", "name"],
          },
          {
            model: db.CacaoFermentationDryingProcess,
            as: "fermentationsDryingProcess",
            required: false,
            include: [
              {
                model: db.CacaoFermentationProcess,
                as: "fermentation",
              },
            ],
          },
          {
            model: db.CacaoScreenedBeans,
            required: false,
            as: "cacaoScreenedBeans",
          }
        ],
        offset: (page - 1) * limit,
        limit: limit,
        order: [[col, desc == "false" ? "ASC" : "DESC"]],
      });

    rows = JSON.parse(JSON.stringify(rows));

    rows?.forEach((el) => {
      if (el?.label) {
        let parsedObj = JSON.parse(el?.label);
        parsedObj.labelUrl = `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${el.external_traceability_id}`;
        el.label = JSON.stringify(parsedObj);
      }
      el.externalLabelUrl = `https://${process.env.TRACEABILITY_URL}/trace-your-product/#/new-traceability?id=${el.external_traceability_id}`
    });

    if (lang && lang !== "en") {
      rows = req.translateFunction(
        rows, 
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "cacao/drymilling",
        }
      )
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
  } catch (error) {
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

router.post(
  "/",
  auth,
  duplicateRecordId.handleDuplicateRecordId("CacaoDryingProcess"),
  cacaoDryMillingValidator.validateDryMilling(),
  async (req, res) => {
    const { id: userId } = req.user;
    try {
      const {
        dryingInitialDate,
        initialWeight,
        preDryingTime,
        dryingTime,
        typeOfDrying,
        label,
        dryingHumidity,
        dryingFlavor,
        dryingType,
        finalWeight,
        weightPerBag,
        numberOfBags,
        fermentations,
        recordId,
        finalPercentOfFermentation,
        screenedBeans = [], // New field for screened beans data
        isFiltered
      } = req.body;
      
      let set = {
        dryRegisterUserId: userId,
        dryingInitialDate,
        initialWeight,
        preDryingTime,
        dryingTime,
        typeOfDrying: typeOfDrying ? typeOfDrying : null,
        label,
        dryingHumidity,
        dryingFlavor,
        dryingType,
        finalWeight,
        weightPerBag,
        numberOfBags,
        recordId,
        finalPercentOfFermentation,
        isFiltered
      };

      let dryingProcess = await db.CacaoDryingProcess.create(set);

      dryingCode = `PC-000${dryingProcess?.id}`;

      const externalId = await insertTraceabilityExternalId(
        "dry_milling_cacao",
        dryingProcess?.id
      );

      let fermentationMap = [];

      if (dryingProcess && dryingProcess.id && externalId && externalId.id) {
        await db.CacaoDryingProcess.update(
          { dryingCode, external_traceability_id: externalId.id },
          {
            where: {
              id: dryingProcess?.id,
            },
          }
        );

        if (fermentations && fermentations.length) {
          fermentationMap = await fermentations.map((fermentation) => {
            return {
              fermentationId: fermentation.fermentationCode,
              dryRegisterId: dryingProcess?.id,
            };
          });
          await db.CacaoFermentationDryingProcess.bulkCreate(fermentationMap);
        }

        // Create screened beans entries
        if (screenedBeans && screenedBeans.length > 0) {
          const screenedBeansData = screenedBeans.map(bean => ({
            dryProcessId: dryingProcess.id,
            grade: bean.grade,
            quantity: bean.quantity
          }));
          await db.CacaoScreenedBeans.bulkCreate(screenedBeansData);
        }

        dryingProcess = await db.CacaoDryingProcess.findOne({
          where: {
            id: dryingProcess?.id,
          },
          include: [
            {
              model: db.CacaoFermentationProcess,
              as: "fermentations",
              required: false,
            },
            {
              model: db.DryingType,
              as: "cacaoDryingType",
              required: false,
              attributes: ['id', 'name']
            },
            {
              model: db.CacaoScreenedBeans,
              required: false,
              as: "cacaoScreenedBeans",
            }
          ],
        });
      }

      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: { dryingProcess },
        })
      );
    } catch (err) {
      console.log(err);
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get("/drying-type", translation, auth, async function (req, res) {
  const transaction = await db.sequelize.transaction();
  const { lang } = req?.headers;

  try {
    let dryingType = await db.DryingType.findAll();
    if (lang && lang !== "en") {
      dryingType = req.translateFunction(
        dryingType, 
        globalTranslationCache,
        {
          lvl1: true,
          moduleName: "cacao/drymilling",
        }
      );
    }
    
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { dryingType },
      })
    );
  } catch (err) {
    await transaction.rollback();
    logErrorOccurred(__filename, err);
    return serverError(req, res);
  }
});

router.post(
  "/drying-type",
  auth,
  validationErrorHandler,
  cacaoDryMillingValidator.validateDryingType(),
  async function (req, res) {
    let transaction = await db.sequelize.transaction();
    try {
      const dryingType = await db.DryingType.create({
        name: req.body.name,
      });

      await transaction.commit();
      return res.json(
        successRespSync({
          msg: success.REGISTERED,
          data: { dryingType },
        })
      );
    } catch (err) {
      await transaction.rollback();
      logErrorOccurred(__filename, err);
      return serverError(req, err);
    }
  }
);
router.use("/production", production);

router.use("/flavor", flavor);

router.use("/traceability", require("./traceability"));

module.exports = router;