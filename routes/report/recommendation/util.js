const _ = require("lodash");
var moment = require("moment");
const db = require(rootPath + "/models");

let langObj = {
  en: "english",
  hi: "hindi",
  mr: "marathi",
  ne: "nepali",
  es: "spanish",
  id: "indonesian",
  in: "indonesian",
  ar: "arabic",
  pt: "portugese",
  fr: "french",
  vi: "vietnamese",
  am: "amharic",
  so: "somali",
  om: "oromo",
  bn: "bengali",
  sw: "swahili",
  el: "greek",
  tr: "turkish",
  nl:"dutch"
};

function translateEnglishToNepali(englishNumber) {
  const englishToNepaliMap = {
    0: "०",
    1: "१",
    2: "२",
    3: "३",
    4: "४",
    5: "५",
    6: "६",
    7: "७",
    8: "८",
    9: "९",
  };

  let nepaliNumber = "";
  for (let i = 0; i < englishNumber.length; i++) {
    const digit = englishNumber[i];
    const nepaliDigit = englishToNepaliMap[digit];
    nepaliNumber += nepaliDigit || digit;
  }

  return nepaliNumber;
}

exports.landPrepration = async (req) => {
  const {
    cropType: cropTypeId,
    cropVariety: cropVarietyId,
    module: moduleId,
    moduleAttr: moduleAttrId,
    historyId: id,
  } = req.query;
  const { id: userId } = req.user;
  const { lang = "en" } = req.headers;

  const moduleAttr = await db.CropRecommendationModuleAttribute.findOne({
    attributes: ["id", "name"],
    where: { id: moduleAttrId },
  });

  let query = {
    where: { id },
    attributes: ["id"],
  };

  switch (moduleAttr.name) {
    case "Soil/Land preparation activities":
      query.include = [
        {
          model: db.Soil_prep_activity,
          as: "activities",
          attributes: ["name"],
        },
      ];
      break;
    case "Land preparation window":
      query.attributes = ["id", "startDate", "endDate"];
      break;
    default:
      break;
  }

  let userData = await db.Soil_prep_practice.findOne(query);
  let comparisonData = [];
  switch (moduleAttr.name) {
    case "Soil/Land preparation activities":
      comparisonData = [
        [req.simpleTranslate(userData?.dataValues?.activities?.name || userData?.activities?.name)],
      ];
      break;
    case "Land Prepration window":
      comparisonData = [
        [
          req.simpleTranslate("Start date"),
          [userData?.dataValues?.startDate || userData?.startDate],
        ],
        [req.simpleTranslate("End date"), [userData?.dataValues?.endDate || userData?.endDate]],
      ];
      break;
    default:
      break;
  }

  let where = {
    cropTypeId,
    ...(!_.isEmpty(cropVarietyId)
      ? { cropVarietyId }
      : { cropVarietyId: null }),
    moduleAttrId,
    moduleId,
  };
  let report = {};
  if (lang === "en") {
    let query = {
      raw: true,
      attributes: {
        exclude: [
          "id",
          "moduleId",
          "moduleAttrId",
          "cropVarietyId",
          "cropTypeId",
          "createdAt",
          "updatedAt",
          "hindi",
          "marathi",
          "nepali",
          "spanish",
          "indonesian",
          "arabic",
          "portugese",
          "french",
          "vietnamese",
          "amharic",
          "somali",
          "oromo",
          "bengali",
          "swahili",
          "turkish",
          "greek",
        ],
      },
      where,
    };
    report = await db.CropRecommendation.findOne(query);
  } else if (lang !== "en") {
    report = await req.translateRecommendation(
      "CropRecommendation",
      lang,
      where
    );
  }

  report.comparisonData = comparisonData;

  return { userData, report };
};

exports.soilMgmt = async (req) => {
  const {
    cropType: cropTypeId,
    cropVariety: cropVarietyId,
    module: moduleId,
    moduleAttr: moduleAttrId,
    historyId: id,
  } = req.query;
  const { id: userId } = req.user;
  const { lang = "en" } = req.headers;

  const moduleAttr = await db.CropRecommendationModuleAttribute.findOne({
    attributes: ["id", "name"],
    where: { id: moduleAttrId },
  });

  let soilQuery = {
    where: { id },
    attributes: ["id"],
  };

  switch (moduleAttr.name) {
    case "Soil type":
      soilQuery.include = [
        {
          model: db.SoilType,
          as: "soil_type",
          attributes: ["id", "name"],
          through: { attributes: [], where: { type: "soil_type" } },
        },
      ];
      break;
    case "Soil health status":
      soilQuery.attributes = ["id", "soilHealth"];
      break;
    case "pH (number)":
      soilQuery.attributes = ["id", ["ph", "currentValue"]];
      break;
    case "Soil Organic Carbon (%)":
      soilQuery.attributes = ["id", ["soilOrganicCarbon", "currentValue"]];
      break;
    case "Nitrogen (kg/ha)":
      soilQuery.attributes = ["id", ["nitrogen", "currentValue"]];
      soilQuery.include = [
        {
          model: db.UnitsList,
          as: "nitrogen_units",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
      ];
      break;
    case "Phosphorus (kg/ha)":
      soilQuery.attributes = ["id", ["phosphorus", "currentValue"]];
      soilQuery.include = [
        {
          model: db.UnitsList,
          as: "phosphorus_units",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
      ];
      break;
    case "Potassium (kg/ha)":
      soilQuery.attributes = ["id", ["potassium", "currentValue"]];
      soilQuery.include = [
        {
          model: db.UnitsList,
          as: "potassium_units",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
      ];
      break;
    case "Other nutrients (ppm)":
      soilQuery.attributes = ["id", ["sulfur", "currentValue"]];
      soilQuery.include = [
        {
          model: db.UnitsList,
          as: "sulfur_units",
          attributes: ["id", "name", "abbvr", "unitType", "factor"],
        },
      ];
      break;
    case "Nitrogen fertilizer rate (Field crops: kg N/ha, Tree crops: g N/tree/year)":
      soilQuery.attributes = ["id", "nitrogenContent"];
      break;
    case "Phosphorus fertilizer rate (Field crops: kg P2O5/ha, Tree crops: g P2O5/tree/year)":
      soilQuery.attributes = ["id", "phosphorusContent"];
      break;
    case "Potassium fertilizer rate (Field crops: kg K2O/ha, Tree crops: kg K2O/tree/year)":
      soilQuery.attributes = ["id", "potassiumContent"];
      break;
    default:
      break;
  }

  const userData = await db.SoilManagement.findOne(soilQuery);
  let comparisonData = [];

  const { type } = await db.CropRecommendationModuleAttribute.findOne({
    where: { id: moduleAttrId },
  });

  let where = {
    cropTypeId,
    ...(!_.isEmpty(cropVarietyId)
      ? { cropVarietyId }
      : { cropVarietyId: null }),
    moduleAttrId,
    moduleId,
  };
  let query = {
    raw: true,
    attributes: {
      exclude: [
        "id",
        "moduleId",
        "moduleAttrId",
        "cropVarietyId",
        "cropTypeId",
        "createdAt",
        "updatedAt",
        "hindi",
        "marathi",
        "nepali",
        "spanish",
        "indonesian",
        "arabic",
        "portugese",
        "french",
        "vietnamese",
        "amharic",
        "somali",
        "oromo",
        "bengali",
        "swahili",
        "turkish",
        "greek",
        "dutch"
      ],
    },
    where,
  };
  let scaleQuery = {
    raw: true,
    where,
  };
  let report = {};
  switch (type) {
    case "scale":
      report = await db.ScaleRecommendation.findOne(query);
      if (lang === "en") {
        scaleQuery = {
          ...scaleQuery,
          where: {
            ...scaleQuery.where,
            language: "english",
          },
        };
        report = await db.ScaleRecommendation.findOne(scaleQuery);
      } else {
        scaleQuery = {
          ...scaleQuery,
          where: {
            ...scaleQuery.where,
            language: langObj[lang],
          },
        };
        report = await db.ScaleRecommendation.findOne(scaleQuery);

        if (!report) {
          scaleQuery = {
            ...scaleQuery,
            where: {
              ...scaleQuery.where,
              language: "english",
            },
          };
          report = await db.ScaleRecommendation.findOne(scaleQuery);
        }
      }
      break;
    default:
      if (lang === "en") {
        report = await db.CropRecommendation.findOne(query);
      } else if (lang !== "en") {
        report = await req.translateRecommendation(
          "CropRecommendation",
          lang,
          where
        );
      }
      break;
  }
  switch (moduleAttr.name) {
    case "Soil type":
      comparisonData = [userData?.soil_type.map((item) => req.simpleTranslate(item.name))];
      break;
    case "Soil Health Status)":
      comparisonData = [[userData?.dataValues?.soilHealth]];
      break;
    case "pH (number)":
      comparisonData = [
        [
          req.simpleTranslate("Our recommendation"),
          [
            `${report?.startOpr ?? ""}${report?.start ?? ""}${
              report?.endOpr ?? ""
            }${report?.end ?? ""}${report?.unit ?? ""}`,
          ],
        ],
        [req.simpleTranslate("Your soil pH"), [userData?.dataValues?.currentValue]],
      ];
      break;
    case "Soil Organic Carbon (%)":
      comparisonData = [
        [
          req.simpleTranslate("Our recommendation"),
          [
            `${report?.startOpr ?? ""}${report?.start ?? ""}${
              report?.endOpr ?? ""
            }${report?.end ?? ""}${report?.unit ?? ""}`,
          ],
        ],
        [req.simpleTranslate("Your soil organic carbon"), [userData?.dataValues?.currentValue]],
      ];
      break;
    case "Nitrogen (kg/ha)":
      comparisonData = [
        [
          req.simpleTranslate("Our recommendation"),
          [
            `${report?.startOpr ?? ""}${report?.start ?? ""}${
              report?.endOpr ?? ""
            }${report?.end ?? ""}${report?.unit ?? ""}`,
          ],
        ],
        [req.simpleTranslate("Your soil nitrogen"), [userData?.dataValues?.currentValue]],
      ];
      break;
    case "Phosphorus (kg/ha)":
      comparisonData = [
        [
          req.simpleTranslate("Our recommendation"),
          [
            `${report?.startOpr ?? ""}${report?.start ?? ""}${
              report?.endOpr ?? ""
            }${report?.end ?? ""}${report?.unit ?? ""}`,
          ],
        ],
        [req.simpleTranslate("Your soil phosphorus"), [userData?.dataValues?.currentValue]],
      ];
      break;
    case "Potassium (kg/ha)":
      comparisonData = [
        [
          req.simpleTranslate("Our recommendation"),
          [
            `${report?.startOpr ?? ""}${report?.start ?? ""}${
              report?.endOpr ?? ""
            }${report?.end ?? ""}${report?.unit ?? ""}`,
          ],
        ],
        [req.simpleTranslate("Your soil potassium"), [userData?.dataValues?.currentValue]],
      ];

      break;
    case "Other nutrients (ppm)":
      comparisonData = [
        [
          req.simpleTranslate("Our recommendation"),
          [
            `${report?.startOpr ?? ""}${report?.start ?? ""}${
              report?.endOpr ?? ""
            }${report?.end ?? ""}${report?.unit ?? ""}`,
          ],
        ],
        [req.simpleTranslate("Your soil sulfur"), [userData?.dataValues?.currentValue]],
      ];
      break;
    case "Nitrogen fertilizer rate (Field crops: kg N/ha, Tree crops: g N/tree/year)":
      comparisonData = [[userData?.dataValues?.nitrogenContent]];
      break;
    case "Phosphorus fertilizer rate (Field crops: kg P2O5/ha, Tree crops: g P2O5/tree/year)":
      comparisonData = [[userData?.dataValues?.phosphorusContent]];
      break;
    case "Potassium fertilizer rate (Field crops: kg K2O/ha, Tree crops: kg K2O/tree/year)":
      comparisonData = [[userData?.dataValues?.potassiumContent]];
      break;
    default:
      break;
  }
  if (report) report.comparisonData = comparisonData;

  return { userData, report };
};

exports.sowingPlanting = async (req) => {
  const {
    cropType: cropTypeId,
    cropVariety: cropVarietyId,
    module: moduleId,
    moduleAttr: moduleAttrId,
    historyId: id,
  } = req.query;
  const { id: userId } = req.user;
  const { lang = "en" } = req.headers;

  const moduleAttr = await db.CropRecommendationModuleAttribute.findOne({
    attributes: ["id", "name"],
    where: { id: moduleAttrId },
  });

  let sowingQuery = {
    where: { id },
    attributes: ["id"],
  };
  switch (moduleAttr.name) {
    case "Planting/Sowing windows":
      sowingQuery.attributes = ["id", "startDate", "endDate"];
      break;
    case "Planting material":
      sowingQuery.attributes = ["id"];
      sowingQuery.include = [
        {
          model: db.PlantingTypes,
          as: "sowing_planting_type_assoc",
        },
      ];
      break;
    case "Planting rate per hectare":
      sowingQuery.attributes = ["id", "seedingRate"];
      break;
    case "Plant row spacing (field crop: cm, Tree crop: m)":
      sowingQuery.attributes = ["id", "rowSpacing"];
      break;
    case "In-row plant spacing  (field crop: cm, Tree crop: m)":
      sowingQuery.attributes = ["id", "inRowSpacing"];
      break;
    case "Plant population density per ha":
      sowingQuery.attributes = ["id", "density"];
      break;
    case "Planting depth (cm)":
      sowingQuery.attributes = ["id", "depth"];
      break;
    default:
      break;
  }

  const userData = await db.Sowing.findOne(sowingQuery);
  let comparisonData = [];
  switch (moduleAttr.name) {
    case "Planting/Sowing windows":
      comparisonData = [
        [
          req.simpleTranslate("Start date"),
          [userData?.dataValues?.startDate || userData?.startDate],
        ],
        [req.simpleTranslate("End date"), [userData?.dataValues?.endDate || userData?.endDate]],
      ];
      break;
    case "Planting material":
      comparisonData = [
        userData?.sowing_planting_type_assoc?.map((item) => req.simpleTranslate(item?.name)),
      ];
      break;
    case "Planting rate per hectare":
      comparisonData = [
        [`${userData?.dataValues?.seedingRate || userData?.seedingRate}`],
      ];
      break;
    case "Plant row spacing (field crop: cm, Tree crop: m)":
      comparisonData = [
        [`${userData?.dataValues?.rowSpacing || userData?.rowSpacing}`],
      ];
      break;
    case "In-row plant spacing  (field crop: cm, Tree crop: m)":
      comparisonData = [
        [`${userData?.dataValues?.inRowSpacing || userData?.inRowSpacing}`],
      ];
      break;
    case "Plant population density per ha":
      comparisonData = [
        [`${userData?.dataValues?.density || userData?.density}`],
      ];
      break;
    case "Planting depth (cm)":
      comparisonData = [[`${userData?.dataValues?.depth || userData?.depth}`]];
      break;
    default:
      break;
  }

  const { type } = await db.CropRecommendationModuleAttribute.findOne({
    where: { id: moduleAttrId },
  });

  let where = {
    cropTypeId,
    ...(!_.isEmpty(cropVarietyId)
      ? { cropVarietyId }
      : { cropVarietyId: null }),
    moduleAttrId,
    moduleId,
  };
  let query = {
    raw: true,
    attributes: {
      exclude: [
        "id",
        "moduleId",
        "moduleAttrId",
        "cropVarietyId",
        "cropTypeId",
        "createdAt",
        "updatedAt",
        "hindi",
        "marathi",
        "nepali",
        "spanish",
        "indonesian",
        "arabic",
        "portugese",
        "french",
        "vietnamese",
        "amharic",
        "somali",
        "oromo",
        "bengali",
        "swahili",
        "turkish",
        "greek",
        "dutch"
      ],
    },
    where,
  };

  let report;
  switch (type) {
    case "scale":
      report = await db.ScaleRecommendation.findOne(query);
      break;
    default:
      if (lang === "en") {
        report = await db.CropRecommendation.findOne(query);
      } else if (lang !== "en") {
        report = await req.translateRecommendation(
          "CropRecommendation",
          lang,
          where
        );
      }
  }
  if (report) report.comparisonData = comparisonData;

  return { userData, report };
};

exports.irrigation = async (req) => {
  const {
    cropType: cropTypeId,
    cropVariety: cropVarietyId,
    module: moduleId,
    moduleAttr: moduleAttrId,
    historyId: id,
  } = req.query;
  const { id: userId } = req.user;
  const { lang = "en" } = req.headers;

  const moduleAttr = await db.CropRecommendationModuleAttribute.findOne({
    attributes: ["id", "name"],
    where: { id: moduleAttrId },
  });

  let irrigationQuery = {
    where: { id },
    attributes: ["id"],
  };

  switch (moduleAttr.name) {
    case "Irrigation schedule/frequency":
      irrigationQuery.include = [
        {
          model: db.IrrigationSchedule,
          as: "irrigation_schedule",
          attributes: ["id", "name"],
        },
      ];
      break;
    case "Type of irrigation":
      irrigationQuery.include = [
        {
          model: db.IrrigationType,
          as: "irrigation_type",
          attributes: ["id", "name"],
        },
      ];
      break;
    case "Quantity of water used for irrigation (mm)":
      irrigationQuery.include = [
        {
          model: db.IrrigationDate,
          as: "irrigation_dates",
          attributes: ["date"],
        },
      ];
      irrigationQuery.attributes = ["id", "waterVolumeUsed"];
      break;
    default:
      break;
  }

  const userData = await db.Irrigation.findOne(irrigationQuery);
  let comparisonData = [];
  switch (moduleAttr.name) {
    case "Irrigation schedule/frequency":
      comparisonData = [[req.simpleTranslate(userData?.irrigation_schedule?.name)]];
      break;
    case "Type of irrigation":
      comparisonData = [[req.simpleTranslate(userData?.dataValues?.irrigation_type?.name)]];
      break;
    case "Quantity of water used for irrigation (mm)":
      comparisonData = [
        [
          req.simpleTranslate("Your date of irrigation"),
          userData?.irrigation_dates?.map((item) => item?.date) || [],
        ],
        [req.simpleTranslate("Your water volume"), [userData?.dataValues?.waterVolumeUsed]],
      ];
      break;
    default:
      break;
  }

  let where = {
    cropTypeId,
    ...(!_.isEmpty(cropVarietyId)
      ? { cropVarietyId }
      : { cropVarietyId: null }),
    moduleAttrId,
    moduleId,
  };
  let report = {};
  if (lang === "en") {
    let query = {
      raw: true,
      attributes: {
        exclude: [
          "id",
          "moduleId",
          "moduleAttrId",
          "cropVarietyId",
          "cropTypeId",
          "createdAt",
          "updatedAt",
          "hindi",
          "marathi",
          "nepali",
          "spanish",
          "indonesian",
          "arabic",
          "portugese",
          "french",
          "vietnamese",
          "amharic",
          "somali",
          "oromo",
          "bengali",
          "swahili",
          "turkish",
          "greek",
          "dutch"
        ],
      },
      where,
    };
    report = await db.CropRecommendation.findOne(query);
  } else if (lang !== "en") {
    report = await req.translateRecommendation(
      "CropRecommendation",
      lang,
      where
    );
  }
  if (report) report.comparisonData = comparisonData;

  return { userData, report };
};

exports.weeding = async (req) => {
  const {
    cropType: cropTypeId,
    cropVariety: cropVarietyId,
    module: moduleId,
    moduleAttr: moduleAttrId,
    historyId: id,
  } = req.query;
  const { id: userId } = req.user;
  const { lang = "en" } = req.headers;

  const moduleAttr = await db.CropRecommendationModuleAttribute.findOne({
    attributes: ["id", "name"],
    where: { id: moduleAttrId },
  });

  const userData = await db.Weed.findOne({
    attributes: ["id", "weedingDays"],
    where: {
      id,
    },
    include: [
      {
        model: db.weed_date,
        as: "weed_dates",
        attributes: ["date"],
      },
      {
        model: db.WeedMethod,
        as: "weed_method",
        attributes: ["id", "name"],
      },
      {
        model: db.WeedMethod,
        as: "weed_data_manual_method",
        through: { model: db.weeddata_method, attributes: [] },
        attributes: ["id", "name"],
      }
    ],
  });

  let comparisonData = [
    [
      req.simpleTranslate("Weeding date"),
      userData?.dataValues?.weed_dates?.map((item) => item?.date) || [],
    ],
    [
      req.simpleTranslate("Days after sowing"),
      [userData?.dataValues?.weedingDays],
    ],
    [
      req.simpleTranslate("Weeding Method"),
      [req.simpleTranslate(userData?.dataValues?.weed_method?.name)],
    ],
  ];

  switch (moduleAttr.name) {
    case "Herbicide used":
      comparisonData = [
        ...comparisonData,
      ];
      break;
    case "Cultural/ Mechanical/ Manual/ Biological":
      comparisonData = [
        ...comparisonData,
        [
          req.simpleTranslate("Type of cultural/mechanical/manual method"),
          userData?.dataValues?.weed_data_manual_method?.map((item) =>
            req.simpleTranslate(item.name)
          ) || [],
        ],
      ];
      break;
    default:
      comparisonData;
      break;
  }

  let where = {
    cropTypeId,
    ...(!_.isEmpty(cropVarietyId)
      ? { cropVarietyId }
      : { cropVarietyId: null }),
    moduleAttrId,
    moduleId,
  };
  let report = {};
  if (lang === "en") {
    let query = {
      raw: true,
      attributes: {
        exclude: [
          "id",
          "moduleId",
          "moduleAttrId",
          "cropVarietyId",
          "cropTypeId",
          "createdAt",
          "updatedAt",
          "hindi",
          "marathi",
          "nepali",
          "spanish",
          "indonesian",
          "arabic",
          "portugese",
          "french",
          "vietnamese",
          "amharic",
          "somali",
          "oromo",
          "bengali",
          "swahili",
          "turkish",
          "greek",
          "dutch"
        ],
      },
      where,
    };
    report = await db.CropRecommendation.findOne(query);
  } else if (lang !== "en") {
    report = await req.translateRecommendation(
      "CropRecommendation",
      lang,
      where
    );
  }
  if (report) report.comparisonData = comparisonData;
  return { userData, report };
};

exports.harvesting = async (req) => {
  const {
    cropType: cropTypeId,
    cropVariety: cropVarietyId,
    module: moduleId,
    moduleAttr: moduleAttrId,
    historyId: id,
  } = req.query;
  const { id: userId } = req.user;
  const { lang = "en" } = req.headers;

  const moduleAttr = await db.CropRecommendationModuleAttribute.findOne({
    attributes: ["id", "name"],
    where: { id: moduleAttrId },
  });

  let harvestQuery = {
    where: { id },
    attributes: ["id"],
  };

  switch (moduleAttr.name) {
    case "Yield per hectare (tonnes/ha).":
      harvestQuery.attributes = ["id", "totalFreshYield", "totalDryYield"];
      break;
    case "Harvest period - Days after sowing (field crops)":
      harvestQuery.attributes = [
        "id",
        "start_date_harvesting",
        "end_date_harvesting",
        "daysHarvesting",
      ];
      break;
    case "Harvesting method":
      harvestQuery.include = [
        {
          model: db.HarvestMethod,
          as: "method_for_harvesting",
          attributes: ["id", "title"],
        },
      ];
      break;
    case "Yield loss (%)":
      harvestQuery.include = [
        {
          model: db.harvest_reason_for_loss,
          as: "harvest_reason_for_loss",
          attributes: ["id", "name"],
        },
      ];
      harvestQuery.attributes = ["id", "yieldLosses"];
      break;
    case "Crop Residue Retention(%)":
      harvestQuery.attributes = ["id", "cropResidueManagement"];
      break;
    default:
      break;
  }

  const userData = await db.Harvest.findOne(harvestQuery);
  let comparisonData = [];

  switch (moduleAttr.name) {
    case "Yield per hectare (tonnes/ha).":
      comparisonData = [
        [
          req.simpleTranslate("Your yield (tonnes/ha)"),
          [
            userData?.dataValues?.totalFreshYield ??
              0 + userData?.dataValues?.totalDryYield ??
              0,
          ],
        ],
        [],
      ];
      break;
    case "Harvest period - Days after sowing (field crops)":
      comparisonData = [
        [
          req.simpleTranslate("Your harvesting date"),
          [userData?.dataValues?.start_date_harvesting],
        ],
        [
          req.simpleTranslate("Days after sowing"),
          [userData?.dataValues?.daysHarvesting],
        ],
      ];
      break;
    case "Method of Harvesting":
      comparisonData = [
        [
          req.simpleTranslate(
            userData?.dataValues?.method_for_harvesting?.title
          ),
        ],
      ];
      break;
    case "Yield loss (%)":
      comparisonData = [
        [
          req.simpleTranslate("Yield losses"),
          [userData?.dataValues?.yieldLosses],
        ],
        [
          req.simpleTranslate("Reason"),
          [
            req.simpleTranslate(
              userData?.dataValues?.harvest_reason_for_loss?.name
            ),
          ],
        ],
      ];
      break;
    case "Crop Residue Retention(%)":
      comparisonData = [[userData?.dataValues?.cropResidueManagement]];
      break;
    default:
      break;
  }

  let where = {
    cropTypeId,
    ...(!_.isEmpty(cropVarietyId)
      ? { cropVarietyId }
      : { cropVarietyId: null }),
    moduleAttrId,
    moduleId,
  };
  let report = {};
  if (lang === "en") {
    let query = {
      raw: true,
      attributes: {
        exclude: [
          "id",
          "moduleId",
          "moduleAttrId",
          "cropVarietyId",
          "cropTypeId",
          "createdAt",
          "updatedAt",
          "hindi",
          "marathi",
          "nepali",
          "spanish",
          "indonesian",
          "arabic",
          "portugese",
          "french",
          "vietnamese",
          "amharic",
          "somali",
          "oromo",
          "bengali",
          "swahili",
          "turkish",
          "greek",
          "dutch"
        ],
      },
      where,
    };
    report = await db.CropRecommendation.findOne(query);
  } else if (lang !== "en") {
    report = await req.translateRecommendation(
      "CropRecommendation",
      lang,
      where
    );
  }
  if (report) report.comparisonData = comparisonData;

  return { userData, report };
};

exports.storage = async (req) => {
  const {
    cropType: cropTypeId,
    cropVariety: cropVarietyId,
    module: moduleId,
    moduleAttr: moduleAttrId,
    historyId: id,
  } = req.query;
  const { id: userId } = req.user;
  const { lang = "en" } = req.headers;

  const moduleAttr = await db.CropRecommendationModuleAttribute.findOne({
    attributes: ["id", "name"],
    where: { id: moduleAttrId },
  });

  let storageQuery = {
    where: { id },
    attributes: ["id"],
  };

  switch (moduleAttr.name) {
    case "Number of days after harvesting":
      storageQuery.attributes = ["id", "startDate", "endDate"];
      break;
    case "Number of days in storage":
      storageQuery.attributes = ["id", "durationOfStorage"];
      break;
    case "Storage process/method":
      storageQuery.include = [
        {
          model: db.CropStorageMethod,
          as: "cropStorage_method",
          attributes: ["id", "name"],
        },
      ];
      break;
    case "Type of storage":
      storageQuery.include = [
        {
          model: db.CropStorageType,
          as: "cropStorage_type",
          attributes: ["id", "name"],
        },
      ];
      break;
    default:
      break;
  }

  const userData = await db.CropStorage.findOne(storageQuery);
  let comparisonData = [];

  switch (moduleAttr.name) {
    case "Number of days after harvesting":
      comparisonData = [
        [
          `${moment(userData?.dataValues?.endDate).diff(
            moment(userData?.dataValues?.startDate),
            "days"
          )} ${req.simpleTranslate("days")} (${req.simpleTranslate("Date")}: ${moment(userData?.dataValues?.endDate).format(
            "MM/DD/YYYY"
          )})`,
        ],
      ];
      break;
    case "Number of days in storage":
      comparisonData = [[userData?.dataValues?.durationOfStorage]];
      break;
    case "Storage Process/Method":
      comparisonData = [
        [req.simpleTranslate(userData?.dataValues?.cropStorage_method?.name)],
      ];
      break;
    case "Type of Storage":
      comparisonData = [
        [req.simpleTranslate(userData?.dataValues?.cropStorage_type?.name)],
      ];
      break;
    default:
      break;
  }

  let where = {
    cropTypeId,
    ...(!_.isEmpty(cropVarietyId)
      ? { cropVarietyId }
      : { cropVarietyId: null }),
    moduleAttrId,
    moduleId,
  };
  let report = {};
  if (lang === "en") {
    let query = {
      raw: true,
      attributes: {
        exclude: [
          "id",
          "moduleId",
          "moduleAttrId",
          "cropVarietyId",
          "cropTypeId",
          "createdAt",
          "updatedAt",
          "hindi",
          "marathi",
          "nepali",
          "spanish",
          "indonesian",
          "arabic",
          "portugese",
          "french",
          "vietnamese",
          "amharic",
          "somali",
          "oromo",
          "bengali",
          "swahili",
          "turkish",
          "greek",
          "dutch"
        ],
      },
      where,
    };
    report = await db.CropRecommendation.findOne(query);
  } else if (lang !== "en") {
    report = await req.translateRecommendation(
      "CropRecommendation",
      lang,
      where
    );
  }
  if (report) report.comparisonData = comparisonData;

  return { userData, report };
};
