const express = require("express");
const router = express.Router();
const db = require(rootPath + "/models");
const { successRespSync, serverError } = require(rootPath + "/helpers/api");
const { success } = require(rootPath + "/helpers/language");
const { logErrorOccurred } = require(rootPath + "/helpers/general");
const auth = require(rootPath + "/middleware/auth");

const cuppingValidator = require(rootPath + "/helpers/validators/cupping");
const validationErrorHandler = require(rootPath +
  "/middleware/validation_error_handler");

/* /coffee/cupping/save*/
router.post(
  "/save",
  auth,
  cuppingValidator.saveCupping(),
  validationErrorHandler,
  async (req, res) => {
    try {
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
        balance,
        balance_qualities,
      } = req.body;

      let cupping = await db.Cupping.create({
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
        balance,
        balance_qualities: balance_qualities.join("|"),
        uniformity,
        clean_cup,
        sweetness,
        overall,
        defect_cups,
        defect_intensity,
        defect_value,
        final_score,
      });

      cupping = JSON.parse(JSON.stringify(cupping));

      cupping.fragrance_qualities = cupping.fragrance_qualities
        ? cupping.fragrance_qualities.split("|")
        : [];
      cupping.flavour_qualities = cupping.flavour_qualities
        ? cupping.flavour_qualities.split("|")
        : [];
      cupping.after_taste_qualities = cupping.after_taste_qualities
        ? cupping.after_taste_qualities.split("|")
        : [];
      cupping.acidity_qualities = cupping.acidity_qualities
        ? cupping.acidity_qualities.split("|")
        : [];
      cupping.body_qualities = cupping.body_qualities
        ? cupping.body_qualities.split("|")
        : [];
      cupping.balance_qualities = cupping.balance_qualities
        ? cupping.balance_qualities.split("|")
        : [];

      cupping["recordId"] = recordId;
      return res.json(
        successRespSync({
          msg: success.CUPPING,
          data: cupping,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

router.get(
  "/get",
  auth,
  cuppingValidator.getCupping(),
  validationErrorHandler,
  async (req, res) => {
    try {
      let { module_type, module_id } = req.query;

      let cuppingData = await db.Cupping.findAll({
        where: {
          module_type,
          module_id,
        },
        include: [
          {
            model: db.ParchmentQualityGrading,
            as: "parchmentQualityGrading",
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
                model: db.ParchmentCupping,
                as: "gradingCuppings",
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
        ],
      });
      cuppingData = JSON.parse(JSON.stringify(cuppingData));
      cuppingData = cuppingData.map((cupping) => ({
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
      }));

      return res.json(
        successRespSync({
          msg: "Cupping Data",
          data: cuppingData,
        })
      );
    } catch (err) {
      logErrorOccurred(__filename, err);
      return serverError(res, err);
    }
  }
);

module.exports = router;
