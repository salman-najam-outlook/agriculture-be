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
const farmActivityPdf = require(rootPath + "/helpers/farmActivityPdf");
const { successRespSync, serverError, errorRespSync } = require(rootPath +
  "/helpers/api");

const {
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
  getCropObservation,
} = require("./utils");

// api/admin/member-data/farms/activity
router.get("/", auth, translation, async (req, res) => {
  try {
    let {
      userId = null,
      farmId = [],
      activity = [],
      sortBy = "asc",
    } = req.query;

    let farmActivity = [];

    const user = await db.user.findOne({
      where: {
        id: userId,
        organization: req.user.organization,
      },
      attributes: ['id'],
    });
    if(!user) {
      return res.json(
        errorRespSync({
          code: error.code.NOT_FOUND,
          msg: error.DOESNT_EXISTS,
        })
      );
    }

    if (activity.includes("Land Preparation")) {
      let landPreparation = await getLandPreparationData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(landPreparation);
    }

    if (activity.includes("Soil Information")) {
      let soilInformation = await getSoilInformationData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(soilInformation);
    }

    if (activity.includes("Nutrient Management")) {
      let nutrientManagement = await getNutrientManagementData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(nutrientManagement);
    }
    if (activity.includes("Weeding")) {
      let weedManagement = await getWeedingData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(weedManagement);
    }
    if (activity.includes("Harvesting")) {
      let harvesting = await getHarvestingData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(harvesting);
    }
    if (activity.includes("Irrigation")) {
      let irrigation = await getIrrigationData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(irrigation);
    }
    if (activity.includes("Storage")) {
      let storage = await getStorageData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(storage);
    }
    if (activity.includes("Sowing/Planting")) {
      let sowing = await getSowingData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(sowing);
    }
    if (activity.includes("Disease Management")) {
      let diseaseManagement = await getDiseaseManagement(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(diseaseManagement);
    }
    if (activity.includes("Pest Management")) {
      let pestManagement = await getPestManagement(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(pestManagement);
    }
    if (activity.includes("Crop Observation")) {
      let cropObservation = await getCropObservation(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(cropObservation);
    }

    let totalCost = 0;
    let currency;

    for (let i = 0; i < farmActivity.length; i++) {
      let _totalCost = 0;
      totalCost = totalCost + (farmActivity[i]?.cost?.totalCost || 0);
      _totalCost = _totalCost + (farmActivity[i]?.cost?.totalCost || 0);
      currency = currency || farmActivity[i]?.cost?.currency;
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
      moment(a.createdAt).isAfter(moment(b.createdAt)) ? 1 : -1
    );

    return res.json(
      successRespSync({
        msg: success.FETCH,
        data: { totalCost, data: farmActivity, currency },
      })
    );
  } catch (error) {
    logErrorOccurred(__filename, error);
    return serverError(res, error);
  }
});

router.get("/export-report", auth, translation, async (req, res) => {
  try {
    let {
      userId,
      activity = [],
      farmId = [],
      type,
      sortBy = "asc",
    } = req.query;

    if (activity) {
      activity = activity?.split("-");
    }
    if (farmId) {
      farmId = farmId?.split("-");
    }
    let farmActivity = [];

    if (activity.includes("Land Preparation")) {
      let landPreparation = await getLandPreparationData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(landPreparation);
    }

    if (activity.includes("Soil Information")) {
      let soilInformation = await getSoilInformationData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(soilInformation);
    }

    if (activity.includes("Nutrient Management")) {
      let nutrientManagement = await getNutrientManagementData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(nutrientManagement);
    }
    if (activity.includes("Weeding")) {
      let weedManagement = await getWeedingData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(weedManagement);
    }
    if (activity.includes("Harvesting")) {
      let harvesting = await getHarvestingData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(harvesting);
    }
    if (activity.includes("Irrigation")) {
      let irrigation = await getIrrigationData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(irrigation);
    }
    if (activity.includes("Storage")) {
      let storage = await getStorageData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(storage);
    }

    if (activity.includes("Sowing/Planting")) {
      let sowing = await getSowingData(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(sowing);
    }
    if (activity.includes("Disease Management")) {
      let diseaseManagement = await getDiseaseManagement(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(diseaseManagement);
    }
    if (activity.includes("Pest Management")) {
      let pestManagement = await getPestManagement(
        userId,
        farmId,
      );
      farmActivity = farmActivity.concat(pestManagement);
    }
    if (activity.includes("Crop Observation")) {
      let cropObservation = await getCropObservation(
        userId,
        farmId,
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
      title: "My Farm Activity",
      info: farmActivity,
      cost: totalCost,
      currency,
      farms,
    };
    let filepath = "";
    if (type === "pdf") {
      const pdfData = await farmActivityPdf(data);
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
      filepath = await generateExcelReport("csv", farmActivity);

      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=farmActivityReport.csv`,
      });
      fs.createReadStream(filepath).pipe(res);
      return;
    } else if (type === "xlsx") {
      filepath = await generateExcelReport("xlsx", farmActivity);

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
    console.log(response)
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
          "Total Cost": `${item?.cost?.currency.symbol || ""} ${
            item?.cost?.totalCost || ""
          }`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || "",
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || "",
          Activity: "Land Preparation",
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
          "Total Cost": `${item?.cost?.currency.symbol || ""} ${
            item?.cost?.totalCost || ""
          }`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || "",
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || "",
          Activity: "Soil Information",
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
          "Total Cost": `${item?.cost?.currency.symbol || ""} ${
            item?.cost?.totalCost || ""
          }`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || "",
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || "",
          Activity: "Nutrient Management",
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
          "Total Cost": `${item?.cost?.currency.symbol || ""} ${
            item?.cost?.totalCost || ""
          }`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || "",
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || "",
          Activity: "Weeding",
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
          "Total Cost": `${item?.cost?.currency.symbol || ""} ${
            item?.cost?.totalCost || ""
          }`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || "",
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || "",
          Activity: "Harvesting",
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
          "Total Cost": `${item?.cost?.currency.symbol || ""} ${
            item?.cost?.totalCost || ""
          }`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || "",
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || "",
          Activity: "Irrigation",
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
          "Total Cost": `${item?.cost?.currency.symbol || ""} ${
            item?.cost?.totalCost || ""
          }`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || "",
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || "",
          Activity: "Storage",
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
          "Total Cost": `${item?.cost?.currency.symbol || ""} ${
            item?.cost?.totalCost || ""
          }`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || "",
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || "",
          Activity: "Sowing/Planting",
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
          "Disease Name": item.diseaseType
            ?.map((item) => item.name)
            ?.join(", "),
          "Disease Symptoms": item.diseaseSymptoms
            ?.map((item) => item.symptoms)
            ?.join(", "),
          "Cultural/Manual Pest Control Method":
            item?.diseaseCulturalManualMethod,
          "Disease Control Start Date": item?.diseaseControlStartDate,
          "Disease Control Duration": item?.diseaseControlDuration,
          "Other Date(s) of Disease Control": item?.dates,
          "Total Cost": `${item?.cost?.currency.symbol || ""} ${
            item?.cost?.totalCost || ""
          }`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || "",
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || "",
          Activity: "Disease Management",
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
          "Total Cost": `${item?.cost?.currency.symbol || ""} ${
            item?.cost?.totalCost || ""
          }`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || "",
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || "",
          Activity: "Pest Management",
        };
      }
      if (item.activity === "Crop Observation") {
        return {
          "Farm/Zone Name": item?.cropObservation_farm
            ?.map((item) => item.farmName)
            ?.join(", "),
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
          "Nitrogen Deficiency": item?.cropObservation_deficiency
            ?.filter((item) => item.element === "nitrogen")
            .map((item) => item.name)
            ?.join(", "),
          "Nitrogen Toxicity": item?.cropObservation_toxicity
            ?.filter((item) => item.element === "nitrogen")
            .map((item) => item.name)
            ?.join(", "),
          "Phosphorus Deficiency": item?.cropObservation_deficiency
            ?.filter((item) => item.element === "phosphorus")
            .map((item) => item.name)
            ?.join(", "),
          "Phosphorus Toxicity": item?.cropObservation_toxicity
            ?.filter((item) => item.element === "phosphorus")
            .map((item) => item.name)
            ?.join(", "),
          "Potassium Deficiency": item?.cropObservation_deficiency
            ?.filter((item) => item.element === "potassium")
            .map((item) => item.name)
            ?.join(", "),
          "Pest Infestations": item?.cropObservation_pestInfestation
            ?.map((item) => item.name)
            ?.join(", "),
          "Viral Diseases": item?.cropObservation_diseases
            ?.filter((item) => item.organism === "virus")
            .map((item) => item.name)
            ?.join(", "),
          "Bacterial Diseases": item?.cropObservation_diseases
            ?.filter((item) => item.organism === "bacteria")
            .map((item) => item.name)
            ?.join(", "),
          "Fungal Diseases": item?.cropObservation_diseases
            ?.filter((item) => item.organism === "fungi")
            .map((item) => item.name)
            ?.join(", "),
          "Total Cost": `${item.cost?.currency.symbol || ""} ${
            item?.cost?.totalCost || ""
          }`,
          "Total Number Of Hours": item?.cost?.totalNumberOfHours || "",
          "Total Number Of Workers": item?.cost?.totalNumberOfWorkers || "",
          Activity: "Crop Observation",
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

    console.log(groupedData)

    Object.entries(groupedData).forEach(([activityKey, activityData]) => {
      const worksheet = XLSX.utils.json_to_sheet(activityData);
      XLSX.utils.book_append_sheet(workbook, worksheet, activityKey);
    });

    const filePath = path.resolve(
      __dirname,
      `../../../../../files/farm-activity-report.xlsx`
    );
    console.log(workbook)
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
        `../../../../../files/farm-activity-report.csv`
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
