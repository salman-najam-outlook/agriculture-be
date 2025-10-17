const { Op } = require("sequelize");
const db = require(rootPath + "/models");
const moment = require("moment");

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
  ) => {
    let landPreprationQuery = {
      where: {
        userId,
      },
      include: [
        {
          model: db.user_farm,
          attributes: [],
          required: true,
          where: {
            ...(farmId && farmId?.length ? { id: farmId } : {}),
          },
        },
        {
          model: db.Option,
          attributes: [],
        },
        {
          model: db.Crop,
          attributes: ['id', 'name'],
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
          farmId && farmId?.length
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
        corpVariety: item.Crops?.map(x => x.name).join(', '),
        activity: "Land Preparation",
      };
    });
    return landPerparation;
  };
  
  const getSoilInformationData = async (
    userId,
    farmId,
  ) => {
    let soilInformationQuery = {
      where: {
        userId,
      },
      include: [
        {
          model: db.user_farm,
          as: "farms",
          attributes: ['id', 'farmName', 'area'],
          required: true,
          where: {
            ...(farmId && farmId?.length ? { id: farmId } : {}),
          },
          include: [
            {
              attributes: ["id", "cropTypeOptId"],
              model: db.UserfarmCrop,
              as: "farmCrops",
              through: { model: db.UserCropFarm, attributes: [] },
              include: [
                { attributes: ["id", "name"], as: "showCropTypes", model: db.Option },
              ],
            },
          ],
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
        [db.Sequelize.col("nitrogenUnit.abbvr"), "nitrogenUnit"],
        [db.Sequelize.col("phosphorusUnit.abbvr"), "phosphorusUnit"],
        [db.Sequelize.col("potassiumUnit.abbvr"), "potassiumUnit"],
        [db.Sequelize.col("sulfurUnit.abbvr"), "sulfurUnit"],
        [
          db.Sequelize.literal(
            `(Select GROUP_CONCAT(soil_types.name) FROM soil_types
            INNER JOIN soil_information_soil_type mp1 ON mp1.soilTypeId = soil_types.id
            WHERE mp1.soilInformationId = SoilInformation.id
              )`
          ),
          "soilType",
        ],
        "createdAt",
      ],
    };
  
    let soilInformation = await db.SoilInformation.findAll(soilInformationQuery);
    soilInformation = JSON.parse(circularJson(soilInformation));
    soilInformation = soilInformation?.map((item) => {
      return {
        ...item,
        crop: item?.farms?.map(x => x?.farmCrops?.map(y => y.showCropTypes.name).join(', ')).join(', '),
        area: item?.farms?.map(x => x.area).join(', '),
        farms: item?.farms?.map(x => x.farmName).join(', '),
        activity: "Soil Information",
      };
    });
    return soilInformation;
  };
  
  const getNutrientManagementData = async (
    userId,
    farmId,
  ) => {
    let nutrientManagementQuery = {
      where: {
        userId,
      },
      include: [
        {
          model: db.user_farm,
          as: "farms",
          attributes: ['id','farmName'],
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
        [db.Sequelize.col("applicationStage.name"), "applicationStage"],
        [
          db.Sequelize.col("fertilizerAppliedAreaUnit.abbvr"),
          "fertilizerAppliedAreaUnit",
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
        farms: item?.farms?.map(x => x.farmName).join(', '),
        activity: "Nutrient Management",
      };
    });
    return nutrientManagement;
  };
  
  const getWeedingData = async (
    userId,
    farmId,
  ) => {
    let weedingReportQuery = {
      where: {
        userId,
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
          model: db.Crop,
          as: "weed_variety",
          attributes: ['id', 'name'],
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
        weedDates: item.weedDates?.split(',').map(x => moment(x).format('YYYY-MM-DD')).join(', '),
        corpVariety: item.weed_variety?.map(x => x.name).join(', '),
        activity: "Weeding",
      };
    });
  
    return weedManagement;
  };
  
  const getHarvestingData = async (
    userId,
    farmId,
  ) => {
    let harvestingQuery = {
      where: {
        userId,
      },
      include: [
        {
          model: db.user_farm,
          as: "harvest_farm",
          attributes: [],
          required: true,
          where: {
            ...(farmId && farmId?.length ? { id: farmId } : {}),
          },
        },
        {
          model: db.Option,
          as: "harvest_cropType",
          attributes: [],
        },
        {
          model: db.Crop,
          as: "harvesting_variety",
          through: { model: db.harvest_variety, attributes: [] },
          attributes: ["id", "name"],
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
          farmId && farmId?.length
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
        corpVariety: item.harvesting_variety?.map(x => x.name).join(', '),
        activity: "Harvesting",
      };
    });
    return harvesting;
  };
  
  const getIrrigationData = async (
    userId,
    farmId,
  ) => {
    let irrigationReportQuery = {
      where: {
        userId,
      },
      include: [
        {
          model: db.user_farm,
          as: "irrigation_farm",
          attributes: [],
          required: true,
          where: {
            ...(farmId && farmId?.length ? { id: farmId } : {}),
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
          model: db.Option,
          as: "irrigation_cropType",
          attributes: [],
        },
        {
          model: db.IrrigationSchedule,
          as: "irrigation_schedule",
          attributes: [],
        },
        {
          model: db.Crop,
          as: "irrigation_cropVariety",
          attributes: ['id', 'name'],
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
          farmId && farmId?.length
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
        irrigationDates: item.irrigationDates?.split(',').map(x => moment(x).format('YYYY-MM-DD')).join(', '),
        corpVariety: item.irrigation_cropVariety?.map(x => x.name).join(', '),
        activity: "Irrigation",
      };
    });
  
    return irrigation;
  };
  
  const getStorageData = async (
    userId,
    farmId,
  ) => {
    const query = {
      where: {
        userId,
      },
      include: [
        {
          model: db.user_farm,
          as: "crop_storage_farm",
          attributes: [],
          required: true,
          where: {
            ...(farmId && farmId?.length ? { id: farmId } : {}),
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
          model: db.Crop,
          as: "storage_cropVariety",
          attributes: ['id', 'name'],
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
          farmId && farmId?.length
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
        corpVariety: item.storage_cropVariety?.map(x => x.name).join(', '),
        activity: "Storage",
      };
    });
    return storageData;
  };
  
  const getSowingData = async (
    userId,
    farmId,
  ) => {
    const query = {
      where: {
        userId,
      },
      include: [
        {
          model: db.user_farm,
          attributes: [],
          required: true,
          where: {
            ...(farmId && farmId?.length ? { id: farmId } : {}),
          },
        },
        {
          model: db.Option,
          attributes: [],
        },
        {
          model: db.Crop,
          attributes: ['id', 'name'],
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
          farmId && farmId?.length
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
        corpVariety: item.Crops?.map(x => x.name).join(', '),
        activity: "Sowing/Planting",
      };
    });
    return sowingData;
  };
  
  const getDiseaseManagement = async (
    userId,
    farmId,
  ) => {
    const query = {
      where: {
        userId,
      },
      include: [
        {
          model: db.user_farm,
          as: "diseaseManagementFarms",
          attributes: [],
          required: true,
          where: {
            ...(farmId && farmId?.length ? { id: farmId } : {}),
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
          model: db.Crop,
          as: "cropVarieties",
          attributes: ['id', 'name'],
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
          farmId && farmId?.length
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
        dates: item.dates?.split(',').map(x => moment(x).format('YYYY-MM-DD')).join(', '),
        corpVariety: item?.cropVarieties?.map(x => x.name),
        activity: "Disease Management",
      };
    });
    return diseaseManagement;
  };
  
  const getPestManagement = async (
    userId,
    farmId,
  ) => {
    const query = {
      where: {
        userId,
      },
      include: [
        {
          model: db.user_farm,
          as: "pestManagementFarms",
          attributes: [],
          required: true,
          where: {
            ...(farmId && farmId?.length ? { id: farmId } : {}),
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
          model: db.Crop,
          as: "cropVarieties",
          attributes: ['id', 'name'],
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
          farmId && farmId?.length
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
          "dates",
        ],
        [
          db.Sequelize.literal(
            `(Select GROUP_CONCAT(plant_parts.name) FROM plant_parts
            INNER JOIN pest_management_affected_plant_parts mp1 ON mp1.plantPartId = plant_parts.id
            WHERE mp1.pestManagementId = PestManagement.id
              )`
          ),
          "plantParts",
        ],
        "createdAt",
      ],
    };
  
    let pestManagement = await db.PestManagement.findAll(query);
    pestManagement = JSON.parse(circularJson(pestManagement));
    pestManagement = pestManagement?.map((item) => {
      return {
        ...item,
        dates: item.dates?.split(',').map(x => moment(x).format('YYYY-MM-DD')).join(', '),
        corpVariety: item?.cropVarieties?.map(x => x.name),
        activity: "Pest Management",
      };
    });
    return pestManagement;
  };
  
  const getCropObservation = async (
    userId,
    farmId,
  ) => {
    const query = {
      where: {
        userId,
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
            ...(farmId && farmId?.length ? { id: farmId } : {}),
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
        area: item?.areaPlanted,
        farms: item?.cropObservation_farm?.map(x => x.farmName) ,
        crop: item?.cropObservation_cropType?.name,
        corpVariety: item?.cropObservation_cropVariety?.map(x => x.name),
        activity: "Crop Observation",
      };
    });
    return cropObservation;
  };

  module.exports = {
    circularJson,
    getLandPreparationData,
    getSoilInformationData,
    getNutrientManagementData,
    getWeedingData,
    getHarvestingData,
    getIrrigationData,
    getStorageData,
    getSowingData,
    getDiseaseManagement,
    getPestManagement,
    getCropObservation
  }