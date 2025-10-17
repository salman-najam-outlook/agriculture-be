const express = require("express");
const { Op } = require("sequelize");
const moment = require("moment");
const { concat } = require("lodash");
const XLSX = require("xlsx");
const stream = require("stream");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const db = require(rootPath + "/models");
const auth = require(rootPath + "/middleware/auth");
const translation = require(rootPath + "/middleware/translation");
const { logErrorOccurred, notEmpty } = require(rootPath + "/helpers/general");
const { error, success } = require(rootPath + "/helpers/language");
const { successRespSync, serverError, errorRespSync } = require(rootPath +
  "/helpers/api");
const farmActivityPdf = require(rootPath + "/helpers/farmActivityPdf");

const circularJson = (array) => {
  return JSON.stringify(array, (key, value) => {
    // If the value is an object with a "parent" property, it's a circular reference
    if (key === "parent" && typeof value === "object" && value !== null) {
      return; // return undefined to remove the circular reference
    }
    return value; // return the original value for other properties
  });
};

const getLandPreparationData = async (
  userId,
  farmId,
  cropType,
  startDate,
  endDate,
  dates,
  req,
) => {
  let landPreprationQuery = {
    where: {
      userId,
      ...(cropType?.length ? { cropId: cropType } : {}),
      ...(startDate
        ? {
            [Op.or]: [
              {
                startDate: {
                  [Op.between]: [startDate, endDate],
                },
              },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          }
        : {}),
      ...(dates?.length
        ? {
            [Op.or]: [
              {
                startDate: {
                  [Op.in]: dates,
                },
              },
              {
                createdAt: {
                  [Op.in]: dates,
                },
              },
            ],
          }
        : {}),
    },
    include: [
      {
        model: db.user_farm,
        attributes: [],
        required: true,
        where: {
          ...(farmId?.length ? { id: farmId } : {}),
        },
      },
      {
        model: db.Option,
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "areaunit",
        attributes: [],
      },
      {
        model: db.SoilPrepPracticeCost,
        as: "cost",
        attributes: [
          "totalNumberOfWorkers",
          "totalNumberOfHours",
          "totalCost",
          "currencyId",
        ],
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      },
    ],
    attributes: [
      "id",
      "area",
      "days",
      "startDate",
      "endDate",
      [db.Sequelize.col("Option.name"), "crop"],
      [db.Sequelize.col("areaunit.abbvr"), "areaUnit"],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(soil_prep_activity.name) FROM soil_prep_activity
          INNER JOIN map_soil_prep_practice_activity mp1 ON mp1.activityId = soil_prep_activity.id
          WHERE mp1.soil_prep_practiceId = Soil_prep_practice.id
            )`
        ),
        "soilPrepActivities",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(soil_types.name) FROM soil_types
          INNER JOIN map_soil_prep_practice_soil_type mp1 ON mp1.soilTypeId = soil_types.id
          WHERE mp1.soil_prep_practiceId = Soil_prep_practice.id
            )`
        ),
        "soilType",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(equipment_name.name) FROM equipment_name
           INNER JOIN equipment eq1 ON eq1.equipmentName = equipment_name.id
           INNER JOIN soil_prep_practice_equipments mp1 ON mp1.equipmentId = eq1.id
           WHERE mp1.soil_prep_practiceId = Soil_prep_practice.id
            )`
        ),
        "equipment",
      ],
      [
        farmId?.length
          ? db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
               INNER JOIN map_soil_prep_practice_farms mp1 ON mp1.userFarmId = user_farms.id
               WHERE mp1.soil_prep_practiceId = Soil_prep_practice.id AND user_farms.id IN (${
                 typeof farmId === "array" ? farmId?.join(",") : farmId
               })
                )`
            )
          : db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
           INNER JOIN map_soil_prep_practice_farms mp1 ON mp1.userFarmId = user_farms.id
           WHERE mp1.soil_prep_practiceId = Soil_prep_practice.id
            )`
            ),
        "farms",
      ],
      "createdAt",
    ],
  };

  let landPerparation = await db.Soil_prep_practice.findAll(
    landPreprationQuery
  );
  landPerparation = JSON.parse(circularJson(landPerparation));
  landPerparation = landPerparation?.map((item) => {
    return {
      ...item,
      activity: req.simpleTranslate("Land Preparation"),
    };
  });
  return landPerparation;
};

const getSoilInformationData = async (
  userId,
  farmId,
  startDate,
  endDate,
  dates,
  req,
) => {
  let soilInformationQuery = {
    where: {
      userId,
      ...(startDate
        ? {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          }
        : {}),
      ...(dates?.length
        ? {
            createdAt: {
              [Op.in]: dates,
            },
          }
        : {}),
    },
    include: [
      {
        model: db.user_farm,
        as: "farms",
        attributes: [],
        required: true,
        where: {
          ...(farmId?.length ? { id: farmId } : {}),
        },
      },
      {
        model: db.SoilInformationCost,
        as: "cost",
        attributes: [
          "totalNumberOfWorkers",
          "totalNumberOfHours",
          "totalCost",
          "currencyId",
        ],
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      },
      {
        model: db.UnitsList,
        as: "sulfurUnit",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "potassiumUnit",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "phosphorusUnit",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "nitrogenUnit",
        attributes: [],
      },
    ],
    attributes: [
      "id",
      "soilHealth",
      "ph",
      "soilOrganicCarbon",
      "nitrogen",
      "phosphorus",
      "potassium",
      "sulfur",
      "soilTest",
      [db.Sequelize.col("nitrogenUnit.abbvr"), "nitrogenunit"],
      [db.Sequelize.col("phosphorusUnit.abbvr"), "phosphorusunit"],
      [db.Sequelize.col("potassiumUnit.abbvr"), "potassiumunit"],
      [db.Sequelize.col("sulfurUnit.abbvr"), "sulfurunit"],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(soil_types.name) FROM soil_types
          INNER JOIN soil_information_soil_type mp1 ON mp1.soilTypeId = soil_types.id
          WHERE mp1.soilInformationId = SoilInformation.id
            )`
        ),
        "soilType",
      ],
      [
        farmId?.length
          ? db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
               INNER JOIN soil_information_farm mp1 ON mp1.farmId = user_farms.id
               WHERE mp1.soilInformationId = SoilInformation.id AND user_farms.id IN (${
                 typeof farmId === "array" ? farmId?.join(",") : farmId
               })
                )`
            )
          : db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
              INNER JOIN soil_information_farm mp1 ON mp1.farmId = user_farms.id
              WHERE mp1.soilInformationId = SoilInformation.id 
            )`
            ),
        "farm",
      ],
      "createdAt",
    ],
  };

  let soilInformation = await db.SoilInformation.findAll(soilInformationQuery);
  soilInformation = JSON.parse(circularJson(soilInformation));
  soilInformation = soilInformation?.map((item) => {
    return {
      ...item,
      activity: req.simpleTranslate("Soil Information"),
    };
  });
  return soilInformation;
};

const getNutrientManagementData = async (
  userId,
  farmId,
  cropType,
  startDate,
  endDate,
  dates,
  req,
) => {
  let nutrientManagementQuery = {
    where: {
      userId,
      ...(cropType?.length ? { cropTypeId: cropType } : {}),
      ...(startDate
        ? {
            [Op.or]: [
              {
                dateOfApplication: {
                  [Op.between]: [startDate, endDate],
                },
              },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          }
        : {}),
      ...(dates?.length
        ? {
            [Op.or]: [
              {
                dateOfApplication: {
                  [Op.in]: dates,
                },
              },
              {
                createdAt: {
                  [Op.in]: dates,
                },
              },
            ],
          }
        : {}),
    },
    include: [
      {
        model: db.user_farm,
        as: "farms",
        attributes: [],
        required: true,
        where: {
          ...(farmId?.length ? { id: farmId } : {}),
        },
      },
      {
        model: db.Option,
        as: "cropType",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "fertilizerAppliedAreaUnit",
        attributes: [],
      },
      {
        model: db.SoilApplicationStage,
        as: "applicationStage",
        attributes: [],
      },
      {
        model: db.NutrientManagementCost,
        as: "cost",
        attributes: [
          "totalNumberOfWorkers",
          "totalNumberOfHours",
          "totalCost",
          "currencyId",
        ],
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      },
      {
        model: db.MapNutrientManagementAndFertilizerMixture,
        as: "fertilizerInputs",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: db.NutrientManagementFertilizerInputs,
            as: "nutrientManagementFertilizerInput",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            include: [
              {
                model: db.Currency,
                as: "currency",
              },
              {
                model: db.FertilizerInputType,
                as: "fertilizerType",
                attributes: ["id", "name"],
              },
              {
                model: db.SoilApplicationMethod,
                as: "applicationMethod",
                attributes: ["id", "name"],
              },
              {
                model: db.UnitsList,
                as: "applicationRateUnit",
                attributes: ["id", "name", "abbvr", "unitType", "factor"],
              },
              {
                model: db.NutrientManagementFertilizerMixture,
                as: "mixtures",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                include: [
                  {
                    model: db.Currency,
                    as: "currency",
                  },
                  {
                    model: db.UnitsList,
                    as: "quantityUnit",
                    attributes: ["id", "name", "abbvr", "unitType", "factor"],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    attributes: [
      "id",
      "cropTypeId",
      "dateOfApplication",
      "daysAfterSowing",
      "fertilizerAppliedArea",
      [db.Sequelize.col("cropType.name"), "crop"],
      [db.Sequelize.col("applicationStage.name"), "applicationstage"],
      [
        db.Sequelize.col("fertilizerAppliedAreaUnit.abbvr"),
        "fertilizerAppliedareaUnit",
      ],
      [
        farmId?.length
          ? db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
               INNER JOIN nutrient_management_farm mp1 ON mp1.farmId = user_farms.id
               WHERE mp1.nutrientManagementId = NutrientManagement.id AND user_farms.id IN (${
                 typeof farmId === "array" ? farmId?.join(",") : farmId
               })
                )`
            )
          : db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
              INNER JOIN nutrient_management_farm mp1 ON mp1.farmId = user_farms.id
              WHERE mp1.nutrientManagementId = NutrientManagement.id
            )`
            ),
        "farm",
      ],
      "createdAt",
    ],
  };

  let nutrientManagement = await db.NutrientManagement.findAll(
    nutrientManagementQuery
  );
  nutrientManagement = JSON.parse(circularJson(nutrientManagement));
  nutrientManagement = nutrientManagement?.map((item) => {
    return {
      ...item,
      activity: req.simpleTranslate("Nutrient Management"),
    };
  });
  return nutrientManagement;
};

const getWeedingData = async (
  userId,
  farmId,
  cropType,
  startDate,
  endDate,
  dates,
  req,
) => {
  let weedingReportQuery = {
    where: {
      userId,
      ...(cropType?.length ? { cropTypeId: cropType } : {}),
      ...(startDate
        ? {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          }
        : {}),
      ...(dates?.length
        ? {
            createdAt: {
              [Op.in]: dates,
            },
          }
        : {}),
    },
    include: [
      {
        model: db.user_farm,
        attributes: [],
        required: true,
        where: {
          ...(farmId?.length ? { id: farmId } : {}),
        },
      },
      {
        model: db.Option,
        as: "weed_cropType",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "weed_area_unit_id",
        attributes: [],
      },
      {
        model: db.WeedMethod,
        as: "weed_method",
        attributes: [],
      },
      {
        model: db.MapWeedingAndHerbicideInputs,
        as: "weedingHerbicideInputs",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
        include: [
          {
            model: db.WeedingHerbicideInputs,
            as: "input",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            include: [
              {
                model: db.Currency,
                as: "currency",
              },
              {
                model: db.WeedMethod,
                as: "applicationMethod",
                attributes: ["id", "name"],
              },
              {
                model: db.UnitsList,
                as: "herbicideQuantityUnit",
                attributes: ["id", "name", "abbvr", "unitType", "factor"],
              },
              {
                model: db.UnitsList,
                as: "herbicideRateUnit",
                attributes: ["id", "name", "abbvr", "unitType", "factor"],
              },
              {
                model: db.WeedingHerbicideMixture,
                as: "mixtures",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                include: [
                  {
                    model: db.Currency,
                    as: "currency",
                  },
                  {
                    model: db.UnitsList,
                    as: "quantityUnit",
                    attributes: ["id", "name", "abbvr", "unitType", "factor"],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        model: db.WeedCost,
        as: "cost",
        attributes: [
          "totalNumberOfWorkers",
          "totalNumberOfHours",
          "totalCost",
          "currencyId",
        ],
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      },
    ],
    attributes: [
      "id",
      "area",
      "weedingDays",
      "weed_method_id",
      [db.Sequelize.col("weed_cropType.name"), "crop"],
      [db.Sequelize.col("weed_method.name"), "weedMethod"],
      [db.Sequelize.col("weed_area_unit_id.abbvr"), "weedAreaUnit"],
      [
        farmId?.length
          ? db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
               INNER JOIN map_weed_farms mp1 ON mp1.userFarmId = user_farms.id
               WHERE mp1.weedId = Weed.id AND user_farms.id IN (${
                 typeof farmId === "array" ? farmId?.join(",") : farmId
               })
                )`
            )
          : db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
              INNER JOIN map_weed_farms mp1 ON mp1.userFarmId = user_farms.id
              WHERE mp1.weedId = Weed.id
            )`
            ),
        "farms",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(weed_dates.date) FROM weed_dates
        WHERE weed_dates.weed_id = Weed.id
      )`
        ),
        "weedDates",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(weed_type.name) FROM weed_type
          INNER JOIN weeddata_types mp1 ON mp1.weedTypeId = weed_type.id
        WHERE mp1.weedId = Weed.id
      )`
        ),
        "weedType",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(weed_methods.name) FROM weed_methods
          INNER JOIN weeddata_methods mp1 ON mp1.weedMethodId = weed_methods.id
        WHERE mp1.weedId = Weed.id
      )`
        ),
        "weedDataMethod",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(weed_stage.name) FROM weed_stage
          INNER JOIN weeddata_stages mp1 ON mp1.weedStageId = weed_stage.id
        WHERE mp1.weedId = Weed.id
      )`
        ),
        "weedStage",
      ],
      "createdAt",
    ],
  };

  let weedManagement = await db.Weed.findAll(weedingReportQuery);
  weedManagement = JSON.parse(circularJson(weedManagement));
  weedManagement = weedManagement?.map((item) => {
    return {
      ...item,
      activity: req.simpleTranslate("Weeding"),
    };
  });

  return weedManagement;
};

const getHarvestingData = async (
  userId,
  farmId,
  cropType,
  startDate,
  endDate,
  dates,
  req,
) => {
  let harvestingQuery = {
    where: {
      userId,
      ...(cropType?.length ? { cropType: cropType } : {}),
      ...(startDate
        ? {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          }
        : {}),
      ...(dates?.length
        ? {
            createdAt: {
              [Op.in]: dates,
            },
          }
        : {}),
    },
    include: [
      {
        model: db.user_farm,
        as: "harvest_farm",
        attributes: [],
        required: true,
        where: {
          ...(farmId?.length ? { id: farmId } : {}),
        },
      },
      {
        model: db.Option,
        as: "harvest_cropType",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "harvest_area_unit_id",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "harvest_total_fresh_yield_unit_id",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "harvest_total_dry_yield_unit_id",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "harvest_total_planned_fresh_yield_unit_id",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "harvest_total_planned_dry_yield_unit_id",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "harvest_yield_for_sale_unit_id",
        attributes: [],
      },
      {
        model: db.HarvestMethod,
        as: "method_for_harvesting",
        attributes: [],
      },
      {
        model: db.harvest_reason_for_loss,
        as: "harvest_reason_for_loss",
        attributes: [],
      },
      {
        model: db.HarvestCost,
        as: "cost",
        attributes: [
          "totalNumberOfWorkers",
          "totalNumberOfHours",
          "totalCost",
          "currencyId",
        ],
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      },
    ],
    attributes: [
      "id",
      "area",
      "start_date_harvesting",
      "end_date_harvesting",
      "daysHarvesting",
      "totalFreshYield",
      "totalDryYield",
      "total_planned_fresh_yield",
      "total_planned_dry_yield",
      "yieldForHouseholdConsumption",
      "yieldForSale",
      "yieldLosses",
      "cropResidueManagement",
      [db.Sequelize.col("harvest_cropType.name"), "crop"],
      [db.Sequelize.col("harvest_area_unit_id.abbvr"), "areaUnit"],
      [
        db.Sequelize.col("harvest_total_fresh_yield_unit_id.abbvr"),
        "freshYieldUnit",
      ],
      [
        db.Sequelize.col("harvest_total_dry_yield_unit_id.abbvr"),
        "dryYieldUnit",
      ],
      [
        db.Sequelize.col("harvest_total_planned_fresh_yield_unit_id.abbvr"),
        "plannedFreshYieldUnit",
      ],
      [
        db.Sequelize.col("harvest_total_planned_dry_yield_unit_id.abbvr"),
        "plannedDeyYieldUnit",
      ],
      [
        db.Sequelize.col("harvest_yield_for_sale_unit_id.abbvr"),
        "yieldForSaleUnit",
      ],
      [db.Sequelize.col("harvest_reason_for_loss.name"), "reasonForLoss"],
      [
        farmId?.length
          ? db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
               INNER JOIN harvesting_farm mp1 ON mp1.farmId = user_farms.id
               WHERE mp1.harvestId = Harvest.id AND user_farms.id IN (${
                 typeof farmId === "array" ? farmId?.join(",") : farmId
               })
                )`
            )
          : db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
              INNER JOIN harvesting_farm mp1 ON mp1.farmId = user_farms.id
              WHERE mp1.harvestId = Harvest.id
            )`
            ),
        "farms",
      ],
      [db.Sequelize.col("method_for_harvesting.title"), "methodForHarvesting"],
      [
        db.Sequelize.literal(
          `(SELECT GROUP_CONCAT(HarvestMethodTypes.name) FROM HarvestMethodTypes
            INNER JOIN harvest_method ON harvest_method.id = HarvestMethodTypes.harvestMethodId
            WHERE harvest_method.id = Harvest.methodForHarvesting)`
        ),
        "harvestMethodType",
      ],
      "createdAt",
    ],
  };

  let harvesting = await db.Harvest.findAll(harvestingQuery);
  harvesting = JSON.parse(circularJson(harvesting));
  harvesting = harvesting?.map((item) => {
    return {
      ...item,
      activity: req.simpleTranslate("Harvesting"),
    };
  });
  return harvesting;
};

const getIrrigationData = async (
  userId,
  farmId,
  cropType,
  startDate,
  endDate,
  dates,
  req,
) => {
  let irrigationReportQuery = {
    where: {
      userId,
      ...(cropType?.length ? { cropId: cropType } : {}),
      ...(startDate
        ? {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          }
        : {}),
      ...(dates?.length
        ? {
            createdAt: {
              [Op.in]: dates,
            },
          }
        : {}),
    },
    include: [
      {
        model: db.user_farm,
        as: "irrigation_farm",
        attributes: [],
        required: true,
        where: {
          ...(farmId?.length ? { id: farmId } : {}),
        },
      },
      {
        model: db.IrrigationWaterSource,
        as: "irrigation_waterSource",
        attributes: [],
      },
      {
        model: db.IrrigationWaterSourceOrigin,
        as: "irrigation_waterSourceOrigin",
        attributes: [],
      },
      {
        model: db.IrrigationStage,
        as: "irrigation_stage",
        attributes: [],
      },
      {
        model: db.IrrigationType,
        as: "irrigation_type",
        attributes: [],
      },
      {
        model: db.IrrigationSchedule,
        as: "irrigation_schedule",
        attributes: [],
      },
      {
        model: db.Option,
        as: "irrigation_cropType",
        attributes: [],
      },
      {
        model: db.IrrigationCost,
        as: "cost",
        attributes: [
          "totalNumberOfWorkers",
          "totalNumberOfHours",
          "totalCost",
          "currencyId",
        ],
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      },
    ],
    attributes: [
      "id",
      "area",
      "irrigatedArea",
      "totalDays",
      "waterVolumeUsed",
      [db.Sequelize.col("irrigation_cropType.name"), "crop"],
      [
        db.Sequelize.col("irrigation_waterSource.name"),
        "irrigationWaterSource",
      ],
      [
        db.Sequelize.col("irrigation_waterSourceOrigin.name"),
        "irrigationWaterSourceOrigin",
      ],
      [db.Sequelize.col("irrigation_stage.name"), "irrigationStage"],
      [db.Sequelize.col("irrigation_type.name"), "irrigationType"],
      [db.Sequelize.col("irrigation_schedule.name"), "irrigationSchedule"],

      [
        farmId?.length
          ? db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
               INNER JOIN irrigation_farm mp1 ON mp1.farm = user_farms.id
               WHERE mp1.irrigation = Irrigation.id AND user_farms.id IN (${
                 typeof farmId === "array" ? farmId?.join(",") : farmId
               })
                )`
            )
          : db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
              INNER JOIN irrigation_farm mp1 ON mp1.farm = user_farms.id
              WHERE mp1.irrigation = Irrigation.id
            )`
            ),
        "farms",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(irrigation_date.date) FROM irrigation_date
        WHERE irrigation_date.irrigation = Irrigation.id
      )`
        ),
        "irrigationDates",
      ],
      "createdAt",
    ],
  };

  let irrigation = await db.Irrigation.findAll(irrigationReportQuery);
  irrigation = JSON.parse(circularJson(irrigation));
  irrigation = irrigation?.map((item) => {
    return {
      ...item,
      activity: req.simpleTranslate("Irrigation"),
    };
  });

  return irrigation;
};

const getStorageData = async (
  userId,
  farmId,
  cropType,
  startDate,
  endDate,
  dates,
  req,
) => {
  const query = {
    where: {
      userId,
      ...(cropType?.length ? { cropId: cropType } : {}),
      ...(startDate
        ? {
            [Op.or]: [
              {
                startDate: {
                  [Op.between]: [startDate, endDate],
                },
              },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          }
        : {}),
      ...(dates?.length
        ? {
            [Op.or]: [
              {
                startDate: {
                  [Op.in]: dates,
                },
              },
              {
                createdAt: {
                  [Op.in]: dates,
                },
              },
            ],
          }
        : {}),
    },
    include: [
      {
        model: db.user_farm,
        as: "crop_storage_farm",
        attributes: [],
        required: true,
        where: {
          ...(farmId?.length ? { id: farmId } : {}),
        },
      },
      {
        model: db.CropStorageMethod,
        as: "cropStorage_method",
        attributes: [],
      },
      {
        model: db.CropStorageType,
        as: "cropStorage_type",
        attributes: [],
      },
      {
        model: db.Option,
        as: "crop_storage_cropType",
        attributes: [],
      },
      {
        model: db.CropStorageBagsStored,
        as: "bags_stored",
        attributes: ["bagQty", "bagCount"],
      },
      {
        model: db.CropStorageCost,
        as: "cost",
        attributes: [
          "totalNumberOfWorkers",
          "totalNumberOfHours",
          "totalCost",
          "currencyId",
        ],
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      },
    ],
    attributes: [
      "id",
      "area",
      "startDate",
      "endDate",
      "durationOfStorage",
      "yieldStored",
      "didYieldStoredInBags",
      [db.Sequelize.col("crop_storage_cropType.name"), "crop"],
      [db.Sequelize.col("cropStorage_method.name"), "cropStorageMethod"],
      [db.Sequelize.col("cropStorage_type.name"), "cropStoragetype"],
      [
        farmId?.length
          ? db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
               INNER JOIN crop_storage_farm mp1 ON mp1.farm = user_farms.id
               WHERE mp1.cropStorage = CropStorage.id AND user_farms.id IN (${
                 typeof farmId === "array" ? farmId?.join(",") : farmId
               })
                )`
            )
          : db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
              INNER JOIN crop_storage_farm mp1 ON mp1.farm = user_farms.id
              WHERE mp1.cropStorage = CropStorage.id
            )`
            ),
        "farms",
      ],
      "createdAt",
    ],
  };

  let storageData = await db.CropStorage.findAll(query);
  storageData = JSON.parse(circularJson(storageData));
  storageData = storageData?.map((item) => {
    return {
      ...item,
      activity: req.simpleTranslate("Storage"),
    };
  });
  return storageData;
};

const getSowingData = async (
  userId,
  farmId,
  cropType,
  startDate,
  endDate,
  dates,
  req,
) => {
  const query = {
    where: {
      userId,
      ...(cropType?.length ? { cropId: cropType } : {}),
      ...(startDate
        ? {
            [Op.or]: [
              {
                startDate: {
                  [Op.between]: [startDate, endDate],
                },
              },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          }
        : {}),
      ...(dates?.length
        ? {
            [Op.or]: [
              {
                startDate: {
                  [Op.in]: dates,
                },
              },
              {
                createdAt: {
                  [Op.in]: dates,
                },
              },
            ],
          }
        : {}),
    },
    include: [
      {
        model: db.user_farm,
        attributes: [],
        required: true,
        where: {
          ...(farmId?.length ? { id: farmId } : {}),
        },
      },
      {
        model: db.Option,
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "areaunit",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "seedingunit",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "rowspacing",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "inrowspacing",
        attributes: [],
      },
      {
        model: db.UnitsList,
        as: "depthspacing",
        attributes: [],
      },
      {
        model: db.SowingCost,
        as: "cost",
        attributes: [
          "totalNumberOfWorkers",
          "totalNumberOfHours",
          "totalCost",
          "currencyId",
        ],
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      },
    ],
    attributes: [
      "id",
      "area",
      "startDate",
      "endDate",
      "days",
      "seedingRate",
      "rowSpacing",
      "inRowSpacing",
      "density",
      "depth",
      [db.Sequelize.col("Option.name"), "crop"],
      [db.Sequelize.col("areaunit.abbvr"), "areaUnit"],
      [db.Sequelize.col("seedingunit.abbvr"), "seedingUnit"],
      [db.Sequelize.col("rowspacing.abbvr"), "rowSpacingUnit"],
      [db.Sequelize.col("inrowspacing.abbvr"), "inRowSpacingUnit"],
      [db.Sequelize.col("depthspacing.abbvr"), "depthSpacingUnit"],
      [
        farmId?.length
          ? db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
               INNER JOIN map_sowing_farms mp1 ON mp1.userFarmId = user_farms.id
               WHERE mp1.sowingId = Sowing.id AND user_farms.id IN (${
                 typeof farmId === "array" ? farmId?.join(",") : farmId
               })
                )`
            )
          : db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
              INNER JOIN map_sowing_farms mp1 ON mp1.userFarmId = user_farms.id
              WHERE mp1.sowingId = Sowing.id
            )`
            ),
        "farms",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(planting_types.name) FROM planting_types
          INNER JOIN map_sowing_planting_type mp1 ON mp1.plantingTypeId = planting_types.id
          WHERE mp1.sowingId = Sowing.id
            )`
        ),
        "plantingTypes",
      ],
      "createdAt",
    ],
  };

  let sowingData = await db.Sowing.findAll(query);
  sowingData = JSON.parse(circularJson(sowingData));
  sowingData = sowingData?.map((item) => {
    return {
      ...item,
      activity: req.simpleTranslate("Sowing/Planting"),
    };
  });
  return sowingData;
};

const getDiseaseManagement = async (
  userId,
  farmId,
  cropType,
  startDate,
  endDate,
  dates,
  req,
) => {
  const query = {
    where: {
      userId,
      ...(cropType?.length ? { cropTypeId: cropType } : {}),
      ...(startDate
        ? {
            [Op.or]: [
              {
                dateOfFirstDiseaseDetection: {
                  [Op.between]: [startDate, endDate],
                },
              },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          }
        : {}),
      ...(dates?.length
        ? {
            [Op.or]: [
              {
                dateOfFirstDiseaseDetection: {
                  [Op.in]: dates,
                },
              },
              {
                createdAt: {
                  [Op.in]: dates,
                },
              },
            ],
          }
        : {}),
    },
    include: [
      {
        model: db.user_farm,
        as: "diseaseManagementFarms",
        attributes: [],
        required: true,
        where: {
          ...(farmId?.length ? { id: farmId } : {}),
        },
      },
      {
        model: db.UnitsList,
        as: "areaUnit",
        attributes: [],
      },
      {
        model: db.Option,
        as: "cropType",
        attributes: [],
      },
      {
        model: db.CropStage,
        as: "cropStage",
        attributes: [],
      },
      {
        model: db.DiseaseType,
        as: "diseaseType",
        attributes: ["id", "name"],
        through: {
          attributes: [],
          model: db.DiseaseManagementDiseaseType,
        },
      },
      {
        model: db.DiseaseSymptoms,
        as: "diseaseSymptoms",
        attributes: ["id", "symptoms"],
        through: {
          attributes: [],
          model: db.DiseaseManagementSymptoms,
        },
      },
      {
        model: db.DiseaseControlTypes,
        as: "diseaseControlType",
        attributes: [],
      },
      {
        model: db.DiseaseCulturalManualMethods,
        as: "culturalManualMethod",
        attributes: [],
      },
      {
        model: db.DiseaseManagementChemicalType,
        as: "diseaseChemicalTypes",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
          {
            model: db.UnitsList,
            as: "chemicalQuantityUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
          {
            model: db.UnitsList,
            as: "chemicalDoseRateUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
          {
            model: db.Option,
            as: "applicationMethod",
            attributes: ["id", "name"],
          },
          {
            model: db.DiseaseManagementChemicalMixture,
            as: "mixtures",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
            include: [
              {
                model: db.Currency,
                as: "currency",
              },
              {
                model: db.UnitsList,
                as: "quantityUnit",
                attributes: ["id", "name", "abbvr", "unitType", "factor"],
              },
            ],
          },
        ],
      },
      {
        model: db.DiseaseManagementCost,
        as: "cost",
        attributes: [
          "totalNumberOfWorkers",
          "totalNumberOfHours",
          "totalCost",
          "currencyId",
        ],
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      },
    ],
    attributes: [
      "id",
      "area",
      "dateOfFirstDiseaseDetection",
      "numberOfPlantsAffected",
      "diseaseControlStartDate",
      "diseaseControlDuration",
      [db.Sequelize.col("cropType.name"), "crop"],
      [db.Sequelize.col("areaUnit.abbvr"), "areaunit"],
      [db.Sequelize.col("cropStage.name"), "cropstage"],
      [db.Sequelize.col("diseaseControlType.name"), "controlType"],
      [
        db.Sequelize.col("culturalManualMethod.name"),
        "diseaseCulturalManualMethod",
      ],
      [
        farmId?.length
          ? db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
               INNER JOIN disease_management_farms mp1 ON mp1.farmId = user_farms.id
               WHERE mp1.diseaseManagementId = DiseaseManagement.id AND user_farms.id IN (${
                 typeof farmId === "array" ? farmId?.join(",") : farmId
               })
                )`
            )
          : db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
              INNER JOIN disease_management_farms mp1 ON mp1.farmId = user_farms.id
              WHERE mp1.diseaseManagementId = DiseaseManagement.id 
            )`
            ),
        "farms",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(disease_management_other_control_date.date) FROM disease_management_other_control_date
        WHERE disease_management_other_control_date.diseaseManagementId = DiseaseManagement.id
      )`
        ),
        "dates",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(plant_parts.name) FROM plant_parts
          INNER JOIN disease_management_affected_plant_parts mp1 ON mp1.plantPartId = plant_parts.id
          WHERE mp1.diseaseManagementId = DiseaseManagement.id
            )`
        ),
        "plantParts",
      ],
      "createdAt",
    ],
  };

  let diseaseManagement = await db.DiseaseManagement.findAll(query);
  diseaseManagement = JSON.parse(circularJson(diseaseManagement));
  diseaseManagement = diseaseManagement?.map((item) => {
    return {
      ...item,
      activity: req.simpleTranslate("Disease Management"),
    };
  });
  return diseaseManagement;
};

const getPestManagement = async (
  userId,
  farmId,
  cropType,
  startDate,
  endDate,
  dates,
  req,
) => {
  const query = {
    where: {
      userId,
      ...(cropType?.length ? { cropTypeId: cropType } : {}),
      ...(startDate
        ? {
            [Op.or]: [
              {
                dateOfFirstPestDetection: {
                  [Op.between]: [startDate, endDate],
                },
              },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          }
        : {}),
      ...(dates?.length
        ? {
            [Op.or]: [
              {
                dateOfFirstPestDetection: {
                  [Op.in]: dates,
                },
              },
              {
                createdAt: {
                  [Op.in]: dates,
                },
              },
            ],
          }
        : {}),
    },
    include: [
      {
        model: db.user_farm,
        as: "pestManagementFarms",
        attributes: [],
        required: true,
        where: {
          ...(farmId?.length ? { id: farmId } : {}),
        },
      },
      {
        model: db.UnitsList,
        as: "areaUnit",
        attributes: [],
      },
      {
        model: db.Option,
        as: "cropType",
        attributes: [],
      },
      {
        model: db.CropStage,
        as: "cropStage",
        attributes: [],
      },
      {
        model: db.PestInfestationSymptom,
        as: "pestManagementInfestationSymptoms",
        attributes: ["id", "name"],
        through: {
          attributes: [],
          model: db.PestManagementInfestationSymptom,
        },
      },
      {
        model: db.PestType,
        as: "pestTypes",
        attributes: ["id", "name"],
        through: {
          attributes: [],
          model: db.PestManagementPestType,
        },
      },
      {
        model: db.PestControlType,
        as: "pestControlType",
        attributes: [],
      },
      {
        model: db.PestCulturalManualMethod,
        as: "culturalManualMethod",
        attributes: [],
      },
      {
        model: db.PestManagementChemicalPesticidesType,
        as: "pestChemicalPesticidesTypes",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
          {
            model: db.UnitsList,
            as: "pesticideQuantityUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
          {
            model: db.UnitsList,
            as: "pesticideDoseRateUnit",
            attributes: ["id", "name", "abbvr", "unitType", "factor"],
          },
          {
            model: db.Option,
            as: "applicationMethod",
            attributes: ["id", "name"],
          },
          {
            model: db.PestManagementChemicalMixture,
            as: "mixtures",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Currency,
                as: "currency",
              },
              {
                model: db.UnitsList,
                as: "quantityUnit",
                attributes: ["id", "name", "abbvr", "unitType", "factor"],
              },
            ],
          },
        ],
      },
      {
        model: db.PestManagementCost,
        as: "cost",
        attributes: [
          "totalNumberOfWorkers",
          "totalNumberOfHours",
          "totalCost",
          "currencyId",
        ],
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      },
    ],
    attributes: [
      "id",
      "area",
      "dateOfFirstPestDetection",
      "numberOfPlantsAffected",
      "startOfPestControl",
      "pestControlDuration",
      [db.Sequelize.col("cropType.name"), "crop"],
      [db.Sequelize.col("areaUnit.abbvr"), "areaunit"],
      [db.Sequelize.col("cropStage.name"), "cropstage"],
      [db.Sequelize.col("pestControlType.name"), "controlType"],
      [
        db.Sequelize.col("culturalManualMethod.name"),
        "pestCulturalManualMethod",
      ],
      [
        farmId?.length
          ? db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
               INNER JOIN pest_management_farms mp1 ON mp1.farmId = user_farms.id
               WHERE mp1.pestManagementId = PestManagement.id AND user_farms.id IN (${
                 typeof farmId === "array" ? farmId?.join(",") : farmId
               })
                )`
            )
          : db.Sequelize.literal(
              `(Select GROUP_CONCAT(user_farms.farmName) FROM user_farms
              INNER JOIN pest_management_farms mp1 ON mp1.farmId = user_farms.id
              WHERE mp1.pestManagementId = PestManagement.id 
            )`
            ),
        "farms",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(pest_management_other_control_date.date) FROM pest_management_other_control_date
        WHERE pest_management_other_control_date.pestManagementId = PestManagement.id
      )`
        ),
        "otherDates",
      ],
      [
        db.Sequelize.literal(
          `(Select GROUP_CONCAT(plant_parts.name) FROM plant_parts
          INNER JOIN pest_management_affected_plant_parts mp1 ON mp1.plantPartId = plant_parts.id
          WHERE mp1.pestManagementId = PestManagement.id
            )`
        ),
        "affectedPlantParts",
      ],
      "createdAt",
    ],
  };

  let pestManagement = await db.PestManagement.findAll(query);
  pestManagement = JSON.parse(circularJson(pestManagement));
  pestManagement = pestManagement?.map((item) => {
    return {
      ...item,
      activity: req.simpleTranslate("Pest Management"),
    };
  });
  return pestManagement;
};

const getCropObservation = async (
  userId,
  farmId,
  cropType,
  startDate,
  endDate,
  dates,
  req,
) => {
  const query = {
    where: {
      userId,
      ...(cropType?.length ? { cropType: cropType } : {}),
      ...(startDate
        ? {
            [Op.or]: [
              {
                dateOfObservation: {
                  [Op.between]: [startDate, endDate],
                },
              },
              {
                createdAt: {
                  [Op.between]: [startDate, endDate],
                },
              },
            ],
          }
        : {}),
      ...(dates?.length
        ? {
            [Op.or]: [
              {
                dateOfObservation: {
                  [Op.in]: dates,
                },
              },
              {
                createdAt: {
                  [Op.in]: dates,
                },
              },
            ],
          }
        : {}),
    },
    include: [
      {
        model: db.Option,
        as: "cropObservation_cropType",
        attributes: ["id", "name"],
      },
      {
        model: db.Option,
        as: "cropObservation_cropSeason",
        attributes: ["id", "name"],
      },
      {
        model: db.CropObservationGrowthStage,
        as: "cropObservation_growthStage",
        attributes: ["id", "name"],
      },
      {
        model: db.CropObservationLeafSize,
        as: "cropObservation_leafSize",
        attributes: ["id", "name"],
      },
      {
        model: db.CropObservationJointType,
        as: "cropObservation_jointType",
        attributes: ["id", "name"],
      },
      {
        model: db.user_farm,
        as: "cropObservation_farm",
        through: { model: db.CropObservationFarm, attributes: [] },
        attributes: ["id", "farmName"],
        required: true,
        where: {
          ...(farmId?.length ? { id: farmId } : {}),
        },
        include: [
          {
            attributes: [
              "id",
              "geofenceName",
              "geofenceArea",
              "geofenceParameter",
            ],
            model: db.Geofence,
            as: "segments",
          },
        ],
      },
      {
        model: db.Geofence,
        as: "cropObservation_segment",
        through: { model: db.CropObservationSegment, attributes: [] },
        attributes: ["id", "geofenceName", "farmId"],
        include: [
          {
            model: db.user_farm,
            as: "farm",
            attributes: ["id", "farmName"],
          },
        ],
      },
      {
        model: db.Crop,
        as: "cropObservation_cropVariety",
        through: { model: db.CropObservationVariety, attributes: [] },
        attributes: ["id", "name"],
      },
      {
        model: db.CropObservationDisease,
        as: "cropObservation_diseases",
        through: { model: db.CropObservationDiseaseList, attributes: [] },
        attributes: ["id", "name", "organism"],
      },
      {
        model: db.CropObservationDeficiency,
        as: "cropObservation_deficiency",
        through: { model: db.CropObservationDeficiencyList, attributes: [] },
        attributes: ["id", "name", "element"],
      },
      {
        model: db.CropObservationPestInfestation,
        as: "cropObservation_pestInfestation",
        through: {
          model: db.CropObservationPestInfestationList,
          attributes: [],
        },
        attributes: ["id", "name"],
      },
      {
        model: db.CropObservationToxicity,
        as: "cropObservation_toxicity",
        through: {
          model: db.CropObservationToxicityList,
          attributes: [],
        },
        attributes: ["id", "name", "element"],
      },
      {
        model: db.CropObservationCost,
        as: "cost",
        attributes: [
          "totalNumberOfWorkers",
          "totalNumberOfHours",
          "totalCost",
          "currencyId",
        ],
        include: [
          {
            model: db.Currency,
            as: "currency",
          },
        ],
      },
    ],
  };

  let cropObservation = await db.CropObservation.findAll(query);
  cropObservation = JSON.parse(circularJson(cropObservation));
  cropObservation = cropObservation?.map((item) => {
    return {
      ...item,
      activity: req.simpleTranslate("Crop Observation"),
    };
  });
  return cropObservation;
};

router.get("/", auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    let {
      activity = null,
      farmId = null,
      cropType = null,
      daysFilter,
      startDate,
      endDate,
      dates = null,
      sortBy = "asc",
    } = req.query;

    if (daysFilter) {
      switch (daysFilter) {
        case "currentWeek":
          startDate = moment().startOf("week").utc().startOf("day");
          endDate = moment().endOf("week").utc().endOf("day");
          break;
        case "lastWeek":
          startDate = moment()
            .subtract(1, "week")
            .startOf("week")
            .utc()
            .startOf("day");
          endDate = moment()
            .subtract(1, "week")
            .endOf("week")
            .utc()
            .endOf("day");
          break;
        case "currentMonth":
          startDate = moment().startOf("month").utc().startOf("day");
          endDate = moment().endOf("month").utc().endOf("day");
          break;
        case "lastMonth":
          startDate = moment()
            .subtract(1, "month")
            .startOf("month")
            .utc()
            .startOf("day");
          endDate = moment()
            .subtract(1, "month")
            .endOf("month")
            .utc()
            .endOf("day");
          break;
        case "currentYear":
          startDate = moment().startOf("year").utc().startOf("day");
          endDate = moment().endOf("year").utc().endOf("day");
          break;
        case "lastYear":
          startDate = moment()
            .subtract(1, "year")
            .startOf("year")
            .utc()
            .startOf("day");
          endDate = moment()
            .subtract(1, "year")
            .endOf("year")
            .utc()
            .endOf("day");
          break;
        default:
          break;
      }
    }

    startDate = startDate
      ? moment.utc(startDate, process.env.ACCEPT_DATE_FORMAT).startOf("day")
      : null;

    endDate = endDate
      ? moment.utc(endDate, process.env.ACCEPT_DATE_FORMAT).endOf("day")
      : null;

    if (dates) {
      dates = dates
        ?.split("-")
        ?.map((date) =>
          moment
            .utc(date, process.env.ACCEPT_DATE_FORMAT)
            .format(process.env.DB_DATE_FORMAT)
        );
    }
    if (activity) {
      activity = activity?.split("-");
    }
    if (farmId) {
      farmId = farmId?.split("-");
    }
    if (cropType) {
      cropType = cropType?.split("-");
    }

    let farmActivity = [];

    if (activity?.includes("Land Preparation")) {
      let landPreparation = await getLandPreparationData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(landPreparation);
    }

    if (activity?.includes("Soil Information")) {
      let soilInformation = await getSoilInformationData(
        userId,
        farmId,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(soilInformation);
    }

    if (activity?.includes("Nutrient Management")) {
      let nutrientManagement = await getNutrientManagementData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(nutrientManagement);
    }
    if (activity?.includes("Weeding")) {
      let weedManagement = await getWeedingData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(weedManagement);
    }
    if (activity?.includes("Harvesting")) {
      let harvesting = await getHarvestingData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(harvesting);
    }
    if (activity?.includes("Irrigation")) {
      let irrigation = await getIrrigationData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(irrigation);
    }
    if (activity?.includes("Storage")) {
      let storage = await getStorageData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(storage);
    }
    if (activity?.includes("Sowing/Planting")) {
      let sowing = await getSowingData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(sowing);
    }
    if (activity?.includes("Disease Management")) {
      let diseaseManagement = await getDiseaseManagement(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(diseaseManagement);
    }
    if (activity?.includes("Pest Management")) {
      let pestManagement = await getPestManagement(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(pestManagement);
    }
    if (activity?.includes("Crop Observation")) {
      let cropObservation = await getCropObservation(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(cropObservation);
    }

    let totalCost = 0;
    let currency;

    for (let i = 0; i < farmActivity.length; i++) {
      let _totalCost = 0;
      totalCost = totalCost + (farmActivity[i]?.cost?.totalCost || 0);
      _totalCost = _totalCost + (farmActivity[i]?.cost?.totalCost || 0);
      currency = farmActivity[i]?.cost?.currency;
      if (farmActivity[i]?.fertilizerInputs?.length) {
        for (let j = 0; j < farmActivity[i].fertilizerInputs?.length; j++) {
          let _cost = 0;
          let _currency;

          totalCost =
            totalCost +
            (farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.cost || 0);
          _totalCost =
            _totalCost +
            (farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.cost || 0);
          _cost =
            _cost +
            (farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.cost || 0);
          currency =
            farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.currency || null;
          _currency =
            farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.currency || null;
          _currency =
            farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.currency || null;

          if (
            farmActivity[i]?.fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.mixtures?.length
          ) {
            for (
              let k = 0;
              k <
              farmActivity[i].fertilizerInputs[j]
                ?.nutrientManagementFertilizerInput?.mixtures?.length;
              k++
            ) {
              totalCost =
                totalCost +
                (farmActivity[i].fertilizerInputs[j]
                  ?.nutrientManagementFertilizerInput?.mixtures[k]?.cost || 0);
              _totalCost =
                _totalCost +
                (farmActivity[i].fertilizerInputs[j]
                  ?.nutrientManagementFertilizerInput?.mixtures[k]?.cost || 0);
              _cost =
                _cost +
                (farmActivity[i].fertilizerInputs[j]
                  ?.nutrientManagementFertilizerInput?.mixtures[k]?.cost || 0);

              currency =
                currency ||
                farmActivity[i].fertilizerInputs[j]
                  ?.nutrientManagementFertilizerInput?.mixtures[k]?.currency;
              _currency =
                _currency ||
                farmActivity[i].fertilizerInputs[j]
                  ?.nutrientManagementFertilizerInput?.mixtures[k]?.currency;
            }
          }
          farmActivity[i].fertilizerInputs[
            j
          ].nutrientManagementFertilizerInput.cost = _cost;
          farmActivity[i].fertilizerInputs[
            j
          ].nutrientManagementFertilizerInput.currency = currency;
        }
      }
      if (farmActivity[i]?.weedingHerbicideInputs?.length) {
        for (
          let j = 0;
          j < farmActivity[i].weedingHerbicideInputs?.length;
          j++
        ) {
          let _cost = 0;
          let _currency;

          totalCost =
            totalCost +
            (farmActivity[i].weedingHerbicideInputs[j]?.input?.cost || 0);
          _totalCost =
            _totalCost +
            (farmActivity[i].weedingHerbicideInputs[j]?.input?.cost || 0);
          _cost =
            _cost +
            (farmActivity[i].weedingHerbicideInputs[j]?.input?.cost || 0);
          currency =
            farmActivity[i].weedingHerbicideInputs[j]?.input?.currency || null;
          _currency =
            farmActivity[i].weedingHerbicideInputs[j]?.input?.currency || null;
          _currency =
            farmActivity[i].weedingHerbicideInputs[j]?.input?.currency || null;

          if (
            farmActivity[i]?.weedingHerbicideInputs[j]?.input?.mixtures?.length
          ) {
            for (
              let k = 0;
              k <
              farmActivity[i].weedingHerbicideInputs[j]?.input?.mixtures
                ?.length;
              k++
            ) {
              totalCost =
                totalCost +
                (farmActivity[i].weedingHerbicideInputs[j]?.input?.mixtures[k]
                  ?.cost || 0);
              _totalCost =
                _totalCost +
                (farmActivity[i].weedingHerbicideInputs[j]?.input?.mixtures[k]
                  ?.cost || 0);
              _cost =
                _cost +
                (farmActivity[i].weedingHerbicideInputs[j]?.input?.mixtures[k]
                  ?.cost || 0);

              currency =
                currency ||
                farmActivity[i].weedingHerbicideInputs[j]?.input?.mixtures[k]
                  ?.currency;
              _currency =
                _currency ||
                farmActivity[i].weedingHerbicideInputs[j]?.input?.mixtures[k]
                  ?.currency;
            }
          }
          farmActivity[i].weedingHerbicideInputs[j].input.cost = _cost;
          farmActivity[i].weedingHerbicideInputs[j].input.currency = currency;
        }
      }
      if (farmActivity[i]?.diseaseChemicalTypes?.length) {
        for (let j = 0; j < farmActivity[i].diseaseChemicalTypes.length; j++) {
          let _cost = 0;
          let _currency;
          totalCost =
            totalCost + (farmActivity[i].diseaseChemicalTypes[j]?.cost || 0);
          _totalCost =
            _totalCost + (farmActivity[i].diseaseChemicalTypes[j]?.cost || 0);
          _cost = _cost + (farmActivity[i].diseaseChemicalTypes[j]?.cost || 0);
          currency = farmActivity[i].diseaseChemicalTypes[j]?.currency || null;
          _currency = farmActivity[i].diseaseChemicalTypes[j]?.currency || null;
          if (farmActivity[i]?.diseaseChemicalTypes[j]?.mixtures?.length) {
            for (
              let k = 0;
              k < farmActivity[i].diseaseChemicalTypes[j]?.mixtures?.length;
              k++
            ) {
              totalCost =
                totalCost +
                (farmActivity[i].diseaseChemicalTypes[j]?.mixtures[k]?.cost ||
                  0);
              _totalCost =
                _totalCost +
                (farmActivity[i].diseaseChemicalTypes[j]?.mixtures[k]?.cost ||
                  0);
              _cost =
                _cost +
                (farmActivity[i].diseaseChemicalTypes[j]?.mixtures[k]?.cost ||
                  0);
              _currency =
                _currency ||
                farmActivity[i].diseaseChemicalTypes[j]?.mixtures[k]?.currency;
              currency =
                currency ||
                farmActivity[i].diseaseChemicalTypes[j]?.mixtures[k]?.currency;
            }
          }
          farmActivity[i].diseaseChemicalTypes[j].cost = _cost;
          farmActivity[i].diseaseChemicalTypes[j].currency = _currency;
        }
      }
      if (farmActivity[i]?.pestChemicalPesticidesTypes?.length) {
        for (
          let j = 0;
          j < farmActivity[i].pestChemicalPesticidesTypes.length;
          j++
        ) {
          let _cost = 0;
          let _currency;
          totalCost =
            totalCost +
            (farmActivity[i].pestChemicalPesticidesTypes[j]?.cost || 0);
          _totalCost =
            _totalCost +
            (farmActivity[i].pestChemicalPesticidesTypes[j]?.cost || 0);
          _cost =
            _cost + (farmActivity[i].pestChemicalPesticidesTypes[j]?.cost || 0);
          currency =
            farmActivity[i].pestChemicalPesticidesTypes[j]?.currency || null;
          _currency =
            farmActivity[i].pestChemicalPesticidesTypes[j]?.currency || null;
          _currency =
            farmActivity[i].pestChemicalPesticidesTypes[j]?.currency || null;
          if (
            farmActivity[i]?.pestChemicalPesticidesTypes[j]?.mixtures?.length
          ) {
            for (
              let k = 0;
              k <
              farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures?.length;
              k++
            ) {
              totalCost =
                totalCost +
                (farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures[k]
                  ?.cost || 0);
              _totalCost =
                _totalCost +
                (farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures[k]
                  ?.cost || 0);
              _cost =
                _cost +
                (farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures[k]
                  ?.cost || 0);

              currency =
                currency ||
                farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures[k]
                  ?.currency;
              _currency =
                _currency ||
                farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures[k]
                  ?.currency;
            }
          }
          farmActivity[i].pestChemicalPesticidesTypes[j].cost = _cost;
          farmActivity[i].pestChemicalPesticidesTypes[j].currency = currency;
        }
      }
      farmActivity[i].totalCost = _totalCost;
      farmActivity[i].currency = currency;
    }

    farmActivity.sort((a, b) =>
      moment(a.createdAt).isAfter(moment(b.createdAt)) ? -1 : 1
    );

    farmActivity.forEach(item => {
       item.activity = req.simpleTranslate(item.activity)
    })
    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { totalCost, data: farmActivity, currency },
      })
    );
  } catch (error) {
    console.log(error);
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

router.get("/:type", auth, translation, async (req, res) => {
  try {
    const userId = req.user.id;
    const { type } = req.params;
    let {
      activity = null,
      farmId = null,
      cropType = null,
      daysFilter,
      startDate,
      endDate,
      dates = null,
      sortBy = "asc",
    } = req.query;

    if (daysFilter) {
      switch (daysFilter) {
        case "currentWeek":
          startDate = moment().startOf("week").utc().startOf("day");
          endDate = moment().endOf("week").utc().endOf("day");
          break;
        case "lastWeek":
          startDate = moment()
            .subtract(1, "week")
            .startOf("week")
            .utc()
            .startOf("day");
          endDate = moment()
            .subtract(1, "week")
            .endOf("week")
            .utc()
            .endOf("day");
          break;
        case "currentMonth":
          startDate = moment().startOf("month").utc().startOf("day");
          endDate = moment().endOf("month").utc().endOf("day");
          break;
        case "lastMonth":
          startDate = moment()
            .subtract(1, "month")
            .startOf("month")
            .utc()
            .startOf("day");
          endDate = moment()
            .subtract(1, "month")
            .endOf("month")
            .utc()
            .endOf("day");
          break;
        case "currentYear":
          startDate = moment().startOf("year").utc().startOf("day");
          endDate = moment().endOf("year").utc().endOf("day");
          break;
        case "lastYear":
          startDate = moment()
            .subtract(1, "year")
            .startOf("year")
            .utc()
            .startOf("day");
          endDate = moment()
            .subtract(1, "year")
            .endOf("year")
            .utc()
            .endOf("day");
          break;
        default:
          break;
      }
    }

    startDate = startDate
      ? moment.utc(startDate, process.env.ACCEPT_DATE_FORMAT).startOf("day")
      : null;

    endDate = endDate
      ? moment.utc(endDate, process.env.ACCEPT_DATE_FORMAT).endOf("day")
      : null;

    if (dates) {
      dates = dates
        ?.split("-")
        ?.map((date) =>
          moment.utc(date, process.env.ACCEPT_DATE_FORMAT).endOf("day")
        );
    }
    if (activity) {
      activity = activity?.split("-");
    }
    if (farmId) {
      farmId = farmId?.split("-");
    }
    if (cropType) {
      cropType = cropType?.split("-");
    }

    let farmActivity = [];

    if (activity?.includes("Land Preparation")) {
      let landPreparation = await getLandPreparationData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(landPreparation);
    }

    if (activity?.includes("Soil Information")) {
      let soilInformation = await getSoilInformationData(
        userId,
        farmId,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(soilInformation);
    }

    if (activity?.includes("Nutrient Management")) {
      let nutrientManagement = await getNutrientManagementData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(nutrientManagement);
    }
    if (activity?.includes("Weeding")) {
      let weedManagement = await getWeedingData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(weedManagement);
    }
    if (activity?.includes("Harvesting")) {
      let harvesting = await getHarvestingData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(harvesting);
    }
    if (activity?.includes("Irrigation")) {
      let irrigation = await getIrrigationData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(irrigation);
    }
    if (activity?.includes("Storage")) {
      let storage = await getStorageData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(storage);
    }
    if (activity?.includes("Sowing/Planting")) {
      let sowing = await getSowingData(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(sowing);
    }
    if (activity?.includes("Disease Management")) {
      let diseaseManagement = await getDiseaseManagement(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(diseaseManagement);
    }
    if (activity?.includes("Pest Management")) {
      let pestManagement = await getPestManagement(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(pestManagement);
    }
    if (activity?.includes("Crop Observation")) {
      let cropObservation = await getCropObservation(
        userId,
        farmId,
        cropType,
        startDate,
        endDate,
        dates,
        req,
      );
      farmActivity = farmActivity.concat(cropObservation);
    }

    let totalCost = 0;
    let currency;

    for (let i = 0; i < farmActivity.length; i++) {
      farmActivity[i].createdAt = moment(farmActivity[i].createdAt).format(
        "DD/MM/YYYY"
      );
      if (farmActivity[i].activity === "Harvesting") {
        farmActivity[i].start_date_harvesting = moment(
          farmActivity[i].start_date_harvesting
        ).format("DD/MM/YYYY");
        farmActivity[i].end_date_harvesting = moment(
          farmActivity[i].end_date_harvesting
        ).format("DD/MM/YYYY");
      }
      if (farmActivity[i].activity === "Irrigation") {
        const dates = farmActivity[i].irrigationDates.split(",");
        farmActivity[i].irrigationDates = dates
          .map((item) => moment(item).format("DD/MM/YYYY"))
          .join(", ");
      }
      if (farmActivity[i].activity === "Pest Management") {
        const dates = farmActivity[i]?.otherDates?.split(",");
        farmActivity[i].otherDates = dates
          ?.map((item) => moment(item).format("DD/MM/YYYY"))
          ?.join(", ");
      }
      if (farmActivity[i].activity === "Disease Management") {
        const dates = farmActivity[i]?.dates?.split(",");
        farmActivity[i].dates = dates
          ?.map((item) => moment(item).format("DD/MM/YYYY"))
          ?.join(", ");
        farmActivity[i].dateOfFirstDiseaseDetection = moment(
          farmActivity[i].dateOfFirstDiseaseDetection
        ).format("DD/MM/YYYY");
        farmActivity[i].diseaseControlStartDate = moment(
          farmActivity[i].diseaseControlStartDate
        ).format("DD/MM/YYYY");
      }
      let _totalCost = 0;
      totalCost = totalCost + (farmActivity[i]?.cost?.totalCost || 0);
      _totalCost = _totalCost + (farmActivity[i]?.cost?.totalCost || 0);
      currency = farmActivity[i]?.cost?.currency;
      if (farmActivity[i]?.fertilizerInputs?.length) {
        for (let j = 0; j < farmActivity[i].fertilizerInputs?.length; j++) {
          let _cost = 0;
          let _currency;

          totalCost =
            totalCost +
            (farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.cost || 0);
          _totalCost =
            _totalCost +
            (farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.cost || 0);
          _cost =
            _cost +
            (farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.cost || 0);
          currency =
            farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.currency || null;
          _currency =
            farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.currency || null;
          _currency =
            farmActivity[i].fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.currency || null;

          if (
            farmActivity[i]?.fertilizerInputs[j]
              ?.nutrientManagementFertilizerInput?.mixtures?.length
          ) {
            for (
              let k = 0;
              k <
              farmActivity[i].fertilizerInputs[j]
                ?.nutrientManagementFertilizerInput?.mixtures?.length;
              k++
            ) {
              totalCost =
                totalCost +
                (farmActivity[i].fertilizerInputs[j]
                  ?.nutrientManagementFertilizerInput?.mixtures[k]?.cost || 0);
              _totalCost =
                _totalCost +
                (farmActivity[i].fertilizerInputs[j]
                  ?.nutrientManagementFertilizerInput?.mixtures[k]?.cost || 0);
              _cost =
                _cost +
                (farmActivity[i].fertilizerInputs[j]
                  ?.nutrientManagementFertilizerInput?.mixtures[k]?.cost || 0);

              currency =
                currency ||
                farmActivity[i].fertilizerInputs[j]
                  ?.nutrientManagementFertilizerInput?.mixtures[k]?.currency;
              _currency =
                _currency ||
                farmActivity[i].fertilizerInputs[j]
                  ?.nutrientManagementFertilizerInput?.mixtures[k]?.currency;
            }
          }
          farmActivity[i].fertilizerInputs[
            j
          ].nutrientManagementFertilizerInput.cost = _cost;
          farmActivity[i].fertilizerInputs[
            j
          ].nutrientManagementFertilizerInput.currency = currency;
        }
      }
      if (farmActivity[i]?.diseaseChemicalTypes?.length) {
        for (let j = 0; j < farmActivity[i].diseaseChemicalTypes.length; j++) {
          let _cost = 0;
          let _currency;
          totalCost =
            totalCost + (farmActivity[i].diseaseChemicalTypes[j]?.cost || 0);
          _totalCost =
            _totalCost + (farmActivity[i].diseaseChemicalTypes[j]?.cost || 0);
          _cost = _cost + (farmActivity[i].diseaseChemicalTypes[j]?.cost || 0);
          currency = farmActivity[i].diseaseChemicalTypes[j]?.currency || null;
          _currency = farmActivity[i].diseaseChemicalTypes[j]?.currency || null;
          if (farmActivity[i]?.diseaseChemicalTypes[j]?.mixtures?.length) {
            for (
              let k = 0;
              k < farmActivity[i].diseaseChemicalTypes[j]?.mixtures?.length;
              k++
            ) {
              totalCost =
                totalCost +
                (farmActivity[i].diseaseChemicalTypes[j]?.mixtures[k]?.cost ||
                  0);
              _totalCost =
                _totalCost +
                (farmActivity[i].diseaseChemicalTypes[j]?.mixtures[k]?.cost ||
                  0);
              _cost =
                _cost +
                (farmActivity[i].diseaseChemicalTypes[j]?.mixtures[k]?.cost ||
                  0);
              _currency =
                _currency ||
                farmActivity[i].diseaseChemicalTypes[j]?.mixtures[k]?.currency;
              currency =
                currency ||
                farmActivity[i].diseaseChemicalTypes[j]?.mixtures[k]?.currency;
            }
          }
          farmActivity[i].diseaseChemicalTypes[j].cost = _cost;
          farmActivity[i].diseaseChemicalTypes[j].currency = _currency;
        }
      }
      if (farmActivity[i]?.pestChemicalPesticidesTypes?.length) {
        for (
          let j = 0;
          j < farmActivity[i].pestChemicalPesticidesTypes.length;
          j++
        ) {
          let _cost = 0;
          let _currency;
          totalCost =
            totalCost +
            (farmActivity[i].pestChemicalPesticidesTypes[j]?.cost || 0);
          _totalCost =
            _totalCost +
            (farmActivity[i].pestChemicalPesticidesTypes[j]?.cost || 0);
          _cost =
            _cost + (farmActivity[i].pestChemicalPesticidesTypes[j]?.cost || 0);
          currency =
            farmActivity[i].pestChemicalPesticidesTypes[j]?.currency || null;
          _currency =
            farmActivity[i].pestChemicalPesticidesTypes[j]?.currency || null;
          _currency =
            farmActivity[i].pestChemicalPesticidesTypes[j]?.currency || null;
          if (
            farmActivity[i]?.pestChemicalPesticidesTypes[j]?.mixtures?.length
          ) {
            for (
              let k = 0;
              k <
              farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures?.length;
              k++
            ) {
              totalCost =
                totalCost +
                (farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures[k]
                  ?.cost || 0);
              _totalCost =
                _totalCost +
                (farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures[k]
                  ?.cost || 0);
              _cost =
                _cost +
                (farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures[k]
                  ?.cost || 0);

              currency =
                currency ||
                farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures[k]
                  ?.currency;
              _currency =
                _currency ||
                farmActivity[i].pestChemicalPesticidesTypes[j]?.mixtures[k]
                  ?.currency;
            }
          }
          farmActivity[i].pestChemicalPesticidesTypes[j].cost = _cost;
          farmActivity[i].pestChemicalPesticidesTypes[j]._currency = currency;
        }
      }
      farmActivity[i].totalCost = _totalCost;
      farmActivity[i].currency = currency;
    }

    // farmActivity.sort((a, b) =>
    //   moment(a.createdAt).isAfter(moment(b.createdAt)) ? -1 : 1
    // );

    let farms = null;

    if (farmId?.length) {
      farms = await db.user_farm?.findAll({
        where: { id: farmId, isDeleted: 0 },
      });
      farms = farms?.map((item) => item?.farmName)?.join(", ");
    }

    const data = {
      // title: "My Farm Activity",
      title: req.simpleTranslate("My Farm Activity"),
      info: farmActivity,
      cost: totalCost,
      currency,
      farms,
      date: startDate
        ? `${moment(startDate, process.env.ACCEPT_DATE_FORMAT).format(
            "DD MMMM YYYY"
          )} To ${moment(endDate, process.env.ACCEPT_DATE_FORMAT).format(
            "DD MMMM YYYY"
          )}`
        : "",
    };
    let filepath = "";
    if (type === "pdf") {
      const pdfData = await farmActivityPdf(data, req.headers.lang);
      if (!pdfData) {
        return res.json(
          errorRespSync({
            msg: "PDF report generation failed.",
          })
        );
      } else {
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=" + pdfData.fileName,
        });
        fs.createReadStream(pdfData.path).pipe(res);
        return;
      }
    } else if (type === "csv") {
      filepath = await generateExcelReport("csv", data.info);

      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=farmActivityReport.csv`,
      });
      fs.createReadStream(filepath).pipe(res);
      return;
    } else if (type === "xlsx") {
      filepath = await generateExcelReport("xlsx", data.info);

      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=farmActivityReport.xlsx`,
      });
      fs.createReadStream(filepath).pipe(res);
      return;
    }
  } catch (error) {
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

const generateExcelReport = async (csvOrXlsx, response) => {
  try {
    const flattenObject = (obj, parentKey = "") => {
      let result = {};
      for (const key in obj) {
        const propName = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === "object" && obj[key] !== null) {
          Object.assign(result, flattenObject(obj[key], propName));
        } else {
          result[propName] = obj[key];
        }
      }
      return result;
    };

    const flattenedResponse = response.map((item) => {
      if (item.activity === "Land Preparation") {
        return {
          "Farm/Zone Name": item?.farms,
          "Start Date": item?.startDate,
          "End Date": item?.endDate,
          "Area Planted": `${item?.area || ""} ${item?.areaUnit || ""}`,
          "Crop Type": item?.crop,
          "Soil Type": item?.soilType,
          "Soil Preparation Activity": item?.soilPrepActivities,
          "Number Of Days": item?.days,
          "Tools And Equipment Used In Land Preparation": item?.equipment,
          "Total Cost": `${item?.cost?.currency.symbol || ''} ${item?.cost?.totalCost || ''}`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || '',
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || '',
          "Activity": "Land Preparation"
        };
      }
      if (item.activity === "Soil Information") {
        return {
          Date: item?.createdAt,
          "Soil Type": item?.soilType,
          "Soil Health": item?.soilHealth,
          pH: item?.ph,
          "Soil Organic Carbon": `${item?.soilOrganicCarbon} %`,
          Nitrogen: `${item?.nitrogen} ${item?.nitrogenunit || ""}`,
          Phosphorus: `${item?.phosphorus} ${item?.phosphorusunit || ""}`,
          Potassium: `${item?.potassium} ${item?.potassiumunit || ""}`,
          Sulfur: `${item?.sulfur} ${item?.sulfurunit || ""}`,
          "Soil Test": item?.soilTest,
          "Total Cost": `${item?.cost?.currency.symbol || ''} ${item?.cost?.totalCost || ''}`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || '',
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || '',
          "Activity": "Soil Information"
        };
      }
      if (item.activity === "Nutrient Management") {
        return {
          "Farm/Zone Name": item?.farms,
          Date: item?.dateOfApplication,
          "Area Planted": `${item?.fertilizerAppliedArea || ""} ${
            item?.fertilizerAppliedareaUnit || ""
          }`,
          "Crop Type": item?.crop,
          "Days After Sowing": item?.daysAfterSowing,
          "Application Stage": item?.applicationstage,
          "Total Cost": `${item?.cost?.currency.symbol || ''} ${item?.cost?.totalCost || ''}`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || '',
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || '',
          "Activity": "Nutrient Management"
        };
      }
      if (item.activity === "Weeding") {
        return {
          "Farm/Zone Name": item?.farms,
          Date: item?.weedDates,
          "Area Planted": `${item?.area || ""} ${item?.weedAreaUnit || ""}`,
          "Crop Type": item?.crop,
          "Type Of Weed": item?.weedType,
          "Weeding Stage(S)": item?.weedStage,
          "Number Of Days Of Weeding Stage(S)": item?.weedingDays,
          "Methods Of Weeding": item?.weedMethod,
          "Cultural/Manual/Method": item?.weedDataMethod,
          "Total Cost": `${item?.cost?.currency.symbol || ''} ${item?.cost?.totalCost || ''}`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || '',
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || '',
          "Activity": "Weeding"
        };
      }
      if (item.activity === "Harvesting") {
        return {
          "Farm/Zone Name": item?.farms,
          "Start Date of Harvesting": item?.start_date_harvesting,
          "End Date of Harvesting": item?.end_date_harvesting,
          "Area Planted": `${item?.area || ""} ${item?.areaUnit || ""}`,
          "Crop Type": item?.crop,
          "Total Number Of Days": item?.daysHarvesting,
          "Total Actual Yield": `${
            item?.totalFreshYield || 0 + item?.totalDryYield || 0
          } ${item?.freshYieldUnit || ""}`,
          "Total Planned Yield": `${
            item?.total_planned_fresh_yield ||
            0 + item?.total_planned_dry_yield ||
            0
          } ${item?.plannedFreshYieldUnit || ""}`,
          "Yield For HouseHold Consuption": item?.yieldForHouseholdConsumption,
          "Yield For Sale": `${item?.yieldForSale} ${item?.yieldForSaleUnit}`,
          "Method Of Harvesting": item?.methodForHarvesting,
          "Yield Losses": `${item?.yieldLosses} %`,
          "Reason For Losses": item?.reasonForLoss,
          "Total Cost": `${item?.cost?.currency.symbol || ''} ${item?.cost?.totalCost || ''}`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || '',
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || '',
          "Activity": "Harvesting"
        };
      }
      if (item.activity === "Irrigation") {
        return {
          "Farm/Zone Name": item?.farms,
          Date: item?.createdAt,
          "Area Planted": `${item?.area || ""}`,
          "Crop Type": item?.crop,
          "Water Source": item?.irrigationWaterSource,
          "Irrigation Water Source": item?.irrigationWaterSourceOrigin,
          "Irrigated Area": item?.irrigatedArea,
          "Date of Irrigation": item?.irrigationDates,
          "Stage of Irrigation": item?.irrigationStage,
          "Irrigation/Schedule": item?.irrigationSchedule,
          "Type of Irrigation": item?.irrigationType,
          "Total Number of Days": item?.totalDays,
          "Water Volume Used": item?.waterVolumeUsed,
          "Total Cost": `${item?.cost?.currency.symbol || ''} ${item?.cost?.totalCost || ''}`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || '',
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || '',
          "Activity": "Irrigation"
        };
      }
      if (item.activity === "Storage") {
        return {
          "Farm/Zone Name": item?.farms,
          Date: item?.createdAt,
          "Area Planted": `${item?.area || ""}`,
          "Crop Type": item?.crop,
          "Duration of Storage": `${item?.durationOfStorage} days`,
          "Yield Stored": item?.yieldStored,
          "Storage Process Method": item?.cropStorageMethod,
          "Storage Type": item?.cropStoragetype,
          "Total Cost": `${item?.cost?.currency.symbol || ''} ${item?.cost?.totalCost || ''}`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || '',
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || '',
          "Activity": "Storage"
        };
      }
      if (item.activity === "Sowing/Planting") {
        return {
          "Farm/Zone Name": item?.farms,
          Date: item?.createdAt,
          "Area Planted": `${item?.area || ""} ${item?.area || ""}`,
          "Crop Type": item?.crop,
          "Number of Days": item?.days,
          "Type of Planting Material": item?.plantingTypes,
          "Planting Rate": `${item?.seedingRate} ${item?.seedingUnit}`,
          "Plant Row Spacing": `${item?.rowSpacing} ${item?.rowSpacingUnit}`,
          "Plant In Row Spacing": `${item?.inRowSpacing} ${item?.inRowSpacingUnit}`,
          "Plant Population/Density": `${item?.density}`,
          "Planting depth": `${item?.depth} ${item?.depthSpacingUnit}`,
          "Total Cost": `${item?.cost?.currency.symbol || ''} ${item?.cost?.totalCost || ''}`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || '',
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || '',
          "Activity": "Sowing/Planting"
        };
      }
      if (item.activity === "Disease Management") {
        return {
          "Farm/Zone Name": item?.farms,
          Date: item?.createdAt,
          "Area Planted": `${item?.area || ""} ${item?.areaunit || ""}`,
          "Crop Type": item?.crop,
          "Date Disease Detection": item?.dateOfFirstDiseaseDetection,
          "Crop Stage": item?.cropstage,
          "Number of Plants Affected": item?.numberOfPlantsAffected,
          "Plant Part(s) Affected": item?.plantParts,
          "Disease Name": item.diseaseType?.map(item=>
            item.name)?.join(', '),
          "Disease Symptoms": item.diseaseSymptoms?.map(item=>
            item.symptoms)?.join(', '),
          "Cultural/Manual Pest Control Method": item?.diseaseCulturalManualMethod,
          "Disease Control Start Date": item?.diseaseControlStartDate,
          "Disease Control Duration": item?.diseaseControlDuration,
          "Other Date(s) of Disease Control": item?.dates,
          "Total Cost": `${item?.cost?.currency.symbol || ''} ${item?.cost?.totalCost || ''}`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || '',
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || '',
          "Activity": "Disease Management"
        };
      }
      if (item.activity === "Pest Management") {
        return {
          "Farm/Zone Name": item?.farms,
          Date: item?.dateOfFirstPestDetection,
          "Area Planted": `${item?.area || ""} ${item?.areaunit || ""}`,
          "Crop Type": item?.crop,
          "Number of Plants Affected": item?.numberOfPlantsAffected,
          "Crop Stage": item?.cropstage,
          "Type of Pest": item?.pestTypes?.map((item) => item.name)?.join(", "),
          "Pest Infestation Symptoms": item?.pestManagementInfestationSymptoms
            ?.map((item) => item.name)
            ?.join(", "),
          "Type of Pest Control": item?.controlType,
          "Other Date of Pest Control": item?.otherDates,
          "Cultural/Manual Pest Control Method": item?.pestCulturalManualMethod,
          "Total Cost": `${item?.cost?.currency.symbol || ''} ${item?.cost?.totalCost || ''}`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || '',
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || '',
          "Activity": "Pest Management"
        };
      }
      if (item.activity === "Crop Observation") {
        return {
          "Farm/Zone Name": item?.cropObservation_farm?.map(item => item.farmName)?.join(", "),
          Date: item?.createdAt,
          "Area Planted": `${item?.areaPlanted || ""}`,
          "Crop Type": item?.cropObservation_cropType?.name,
          "Crop Season": item?.cropObservation_cropSeason?.name,
          "Growth Stage": item?.cropObservation_growthStage?.name,
          "Germination Rate": item?.germinationRate,
          "Leaf Colour/Appearance": item?.leafColor,
          "Leaf Size": item?.cropObservation_leafSize?.name,
          "Stem Colour": item?.stemColor,
          "Stem Thickness": item?.stemThickness,
          "Plant Height": item?.plantHeight,
          "Tiller Number": item?.tillerNumber,
          "Appearance of Flowers": item?.appreanceOfFlower,
          "Joint Type": item?.cropObservation_jointType?.name,
          "Nitrogen Deficiency": item?.cropObservation_deficiency?.filter(item => item.element === 'nitrogen').map(item => item.name)?.join(', '),
          "Nitrogen Toxicity": item?.cropObservation_toxicity?.filter(item => item.element === 'nitrogen').map(item => item.name)?.join(', '),
          "Phosphorus Deficiency": item?.cropObservation_deficiency?.filter(item => item.element === 'phosphorus').map(item => item.name)?.join(', '),
          "Phosphorus Toxicity": item?.cropObservation_toxicity?.filter(item => item.element === 'phosphorus').map(item => item.name)?.join(', '),
          "Potassium Deficiency": item?.cropObservation_deficiency?.filter(item => item.element === 'potassium').map(item => item.name)?.join(', '),
          "Pest Infestations": item?.cropObservation_pestInfestation?.map(item => item.name)?.join(', '),
          "Viral Diseases": item?.cropObservation_diseases?.filter(item => item.organism === 'virus').map(item => item.name)?.join(', '),
          "Bacterial Diseases": item?.cropObservation_diseases?.filter(item => item.organism === 'bacteria').map(item => item.name)?.join(', '),
          "Fungal Diseases": item?.cropObservation_diseases?.filter(item => item.organism === 'fungi').map(item => item.name)?.join(', '),
          "Total Cost": `${item.cost?.currency.symbol || ''} ${item?.cost?.totalCost || ''}`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || '',
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || '',
          "Activity": "Crop Observation"
        };
      }
    });

    const workbook = XLSX.utils.book_new();

    const directoryPath = "files";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const sanitizeSheetName = (name) => {
      return name?.replace(/[:\\\/?*\[\]]/g, ""); // Remove invalid characters
    };

    const groupedData = {};
    flattenedResponse.forEach((item) => {
      const activityKey = sanitizeSheetName(item.Activity);
      if (!groupedData[activityKey]) {
        groupedData[activityKey] = [];
      }
      groupedData[activityKey].push(item);
    });

    Object.entries(groupedData).forEach(([activityKey, activityData]) => {
      const worksheet = XLSX.utils.json_to_sheet(activityData);
      XLSX.utils.book_append_sheet(workbook, worksheet, activityKey);
    });

    // const worksheet = XLSX.utils.json_to_sheet(response);
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Farm Activity Report");

    const filePath = path.resolve(
      __dirname,
      `../../../files/farm-activity-report.xlsx`
    );
    XLSX.writeFile(workbook, filePath);

    if (csvOrXlsx === "xlsx") {
      return filePath;
    }

    if (csvOrXlsx === "csv") {
      const allData = [];
      workbook.SheetNames.forEach((sheetName) => {
        const sheetData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        allData.push(sheetData);
      });
      const csvFilePath = path.resolve(
        __dirname,
        `../../../files/farm-activity-report.csv`
      );
      fs.writeFileSync(csvFilePath, allData.join("\n"), "utf-8");
      return csvFilePath;
    }

    return;
  } catch (err) {
    console.log("Error processing request: " + err);
  }
};

module.exports = router;
