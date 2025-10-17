#!/usr/bin/env node

const db = require(rootPath + "/models");
const s3 = require(rootPath + "/components/s3upload.js");
const _ = require("lodash");
const mime = require("mime-types");
const {
  getAuthToken,
  getSpreadSheetValues,
} = require("../../components/googleSheetsService.js");
const { Op } = require("sequelize");
const { nepaliTranslation } = require("./translationKeys/nepali.js");

const spreadsheetId = "1gOOyvURcqixt5XQAnfTUlfyhFLOI2c_do9YShBVL_xM";

module.exports = async function importNepaliData(cropType, sheetData) {
  try {
    const sheetName = sheetData.map((data) => data.range);
    const auth = await getAuthToken();
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });

    let cropRecommendations = [];
    let specialOperations = [];
    let diseaseRecommendations = [];
    let diseaseImages = [];
    let pestRecommendations = [];
    let pestImages = [];
    let _cropType = await db.Option.findOne({
      attributes: ["id"],
      where: {
        name: {
          [Op.or]: [
            { [Op.like]: `%${cropType}%` },
            {
              [Op.like]: `%${cropType.replace("( ", "(").replace(" )", ")")}%`,
            },
            {
              [Op.like]: `%${cropType.replace("(", "( ").replace(")", " )")}%`,
            },
          ],
        },
      },
    });
    // if crop type id is not found then return
    if (_.isEmpty(_cropType)) return false;

    for (let i = 0; i < response.data.valueRanges.length; i++) {
      const valueRange = response.data.valueRanges[i];
      const currentSheetData = sheetData[i];
      const module = await db.CropRecommendationModule.findOne({
        attributes: ["id"],
        where: { name: currentSheetData.report },
      });

      if (
        valueRange.values[0][0].toLowerCase() === " कीट/कीराको नाम" ||
        valueRange.values[0][0].toLowerCase() === " कीट/कीराको लक्षण"
      ) {
        let pestRecommendationsData = await getPestRecommendations(
          valueRange,
          module,
          _cropType
        );
        pestRecommendations = pestRecommendationsData;
      } else if (
        valueRange.values[0][0].toLowerCase() === " रोगको नाम" ||
        valueRange.values[0][0].toLowerCase() === " रोगको लक्षण"
      ) {
        let diseaseRecommendationsData = await getDiseaseRecommendations(
          valueRange,
          module,
          _cropType
        );
        diseaseRecommendations = diseaseRecommendationsData;
      } else if (
        valueRange.values[0][0].toLowerCase() === " अभ्यास गर्नुहोस्" ||
        valueRange.values[0][0].toLowerCase() === " विधि र अभ्यास अवधि"
      ) {
        await getSpecialOperations(valueRange, module, _cropType);
      } else {
        for (let i = 0; i < valueRange.values.length; i++) {
          let dataRows = valueRange.values[i];
          if (dataRows[currentSheetData.parameterIndex]) {
            try {
              console.log(
                ">>>>>>>",
                dataRows,
                dataRows[currentSheetData.parameterIndex],
                nepaliTranslation[dataRows[currentSheetData.parameterIndex]]
              );
              let moduleAttribute =
                await db.CropRecommendationModuleAttribute.findOne({
                  where: {
                    ddName:
                      nepaliTranslation[
                        dataRows[currentSheetData.parameterIndex]
                      ],
                    moduleId: module.id,
                  },
                });
              if (moduleAttribute && moduleAttribute.type === "info") {
                await db.CropRecommendationModuleAttribute.update(
                  {
                    nepali: dataRows[currentSheetData.parameterIndex],
                  },
                  {
                    where: {
                      id: moduleAttribute.id,
                    },
                  },
                  {}
                );
                const nepali = dataRows[
                  currentSheetData.recommendationDataIndex
                ]
                  ?.split("•")
                  ?.filter((val) => val?.trim() !== "")
                  ?.map((val) => val?.trim());
                await db.CropRecommendation.update(
                  { nepali },
                  {
                    where: {
                      moduleId: module.id,
                      cropTypeId: _cropType?.id,
                      moduleAttrId: moduleAttribute.id,
                    },
                  },
                  {}
                );
              }
            } catch (e) {
              console.log("error =>", e);
            }
          }
        }
      }
    }

    await db.PestAndDiseaseRecommendation.bulkCreate(
      [...pestRecommendations, ...diseaseRecommendations],
      {}
    );

    console.log(`output for ${cropType}`);
    console.log(
      "================================================================="
    );
    return true;
  } catch (error) {
    console.log(error);
    console.log(error.message, error.stack);
  }
};

async function getSpecialOperations(valueRange, module, _cropType) {
  let operations = [];
  let specialOperations = [];

  for (let k = 0; k < valueRange.values.length; k++) {
    const dataRows = valueRange.values[k];

    for (let j = 0; j < dataRows.length; j++) {
      if (j > 0) {
        if (k === 0) {
          const data =
            dataRows[j].split("• ").length === 2
              ? dataRows[j].split("• ")[1]
              : dataRows[j];

          operations.push({
            // moduleAttrId: moduleAttribute.id,
            [dataRows[0].trim()]: data,
          });
        } else if (operations.length) {
          operations[j - 1] = {
            ...operations[j - 1],
            [dataRows[0].trim()]: dataRows[j],
          };
        }
      }
    }
  }

  operations = operations.filter(
    (operationData) =>
      operationData["अभ्यास गर्नुहोस्"]?.trim() !== "डीडी हेर्नुहोस् यहाँ" ||
      operationData["अभ्यास गर्नुहोस्"]?.trim() !==
        "केवल अभ्यास नाम निर्दिष्ट गर्नुहोस्"
  );

  for (let operationData of operations) {
    const practice = operationData["अभ्यास गर्नुहोस्"].trim();

    if (nepaliTranslation[practice]) {
      let operationPractice =
        await db.CropObservationSpecialOperationPractice.findOne({
          where: {
            practice: { [Op.like]: `%${nepaliTranslation[practice]}%` },
            cropTypeId: _cropType?.id,
          },
        });

      await db.CropObservationSpecialOperationPractice.update(
        {
          nepali: practice,
        },
        {
          where: {
            practice: { [Op.like]: `%${nepaliTranslation[practice]}%` },
            cropTypeId: _cropType?.id,
          },
        },
        {}
      );
      if (operationPractice) {
        const nepali = operationData["विधि र अभ्यास अवधि"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());

        await db.SpecialOperationRecommendation.update(
          {
            nepali,
          },
          {
            where: {
              cropTypeId: _cropType?.id,
              practiceId: operationPractice.id,
            },
          },
          {}
        );
      }
    }
  }
}

async function getDiseaseRecommendations(valueRange, module, _cropType) {
  let diseases = [];
  let diseaseRecommendations = [];

  for (let k = 0; k < valueRange.values.length; k++) {
    const dataRows = valueRange.values[k];

    for (let j = 0; j < dataRows.length; j++) {
      if (j > 0) {
        if (k === 0) {
          // for disease name row
          const data =
            dataRows[j].split("• ").length === 2
              ? dataRows[j].split("• ")[1]
              : dataRows[j];

          diseases.push({
            // moduleAttrId: moduleAttribute.id,
            [dataRows[0].trim()]: data,
          });
        } else if (diseases.length) {
          diseases[j - 1] = {
            ...diseases[j - 1],
            [dataRows[0].trim()]: dataRows[j],
          };
        }
      }
    }
  }

  diseases = diseases.filter(
    (operationData) =>
      operationData["रोगको नाम"]?.trim() !== "डीडी हेर्नुहोस् यहाँ" &&
      operationData["रोगको नाम"] !== ""
  );

  for (diseaseData of diseases) {
    const diseaseName = diseaseData["रोगको नाम"].trim();

    if (nepaliTranslation[diseaseName]) {
      let disease = await db.CropObservationDisease.findOne({
        where: { name: nepaliTranslation[diseaseName] },
      });

      if (disease) {
        await db.CropObservationDisease.update(
          {
            nepali: diseaseName,
          },
          {
            where: { id: disease.id },
          }
        );
        const symptoms = diseaseData["रोगको लक्षण"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const prevention = diseaseData["सिफारिस गरिएको रोकथाम"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const treatment = diseaseData["सिफारिस गरिएको उपचार"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());

        diseaseRecommendations.push({
          cropTypeId: _cropType?.id,
          diseaseId: disease.id,
          symptoms,
          prevention,
          treatment,
          language: "nepali",
        });
      }
    }
  }
  return diseaseRecommendations;
}

async function getPestRecommendations(valueRange, module, _cropType) {
  let pests = [];
  let pestRecommendations = [];

  for (let k = 0; k < valueRange.values.length; k++) {
    const dataRows = valueRange.values[k];

    for (let j = 0; j < dataRows.length; j++) {
      if (j > 0) {
        if (k === 0) {
          // for pest name row
          const data =
            dataRows[j].split("• ").length === 2
              ? dataRows[j].split("• ")[1]
              : dataRows[j];

          pests.push({
            // moduleAttrId: moduleAttribute.id,
            [dataRows[0].trim()]: data,
          });
        } else if (pests.length) {
          pests[j - 1] = {
            ...pests[j - 1],
            [dataRows[0].trim()]: dataRows[j],
          };
        }
      }
    }
  }

  pests = pests
    .filter(
      (operationData) =>
        operationData["कीट/कीराको नाम"].trim() !== "डीडी हेर्नुहोस् यहाँ"
    )
    .filter((operationData) => operationData["अभ्यास गर्नुहोस्"] !== "");

  for (pestData of pests) {
    const pestName = pestData["कीट/कीराको नाम"].trim();
    if (nepaliTranslation[pestName]) {
      let pest = await db.CropObservationPestInfestation.findOne({
        where: { name: nepaliTranslation[pestName] },
      });

      if (pest) {
        await db.CropObservationPestInfestation.update(
          {
            nepali: pestName,
          },
          {
            where: { id: pest.id },
          },
          {}
        );
        const symptoms = pestData["कीट/कीराको लक्षण"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const prevention = pestData["सिफारिस गरिएको रोकथाम"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const treatment = pestData["सिफारिस गरिएको उपचार"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());

        pestRecommendations.push({
          cropTypeId: _cropType.id,
          pestId: pest.id,
          symptoms,
          prevention,
          treatment,
          language: "nepali",
        });
      }
    }
  }

  return pestRecommendations;
}
