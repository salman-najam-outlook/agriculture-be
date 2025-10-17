#!/usr/bin/env node

const db = require(rootPath + "/models");
const _ = require("lodash");
const {
  getAuthToken,
  getSpreadSheetValues,
} = require("../../components/googleSheetsService.js");
const { Op } = require("sequelize");
const { swahiliTranslation } = require("./translationKeys/swahili.js");

const spreadsheetId = "1ekXfjvdn_YbEC1KfS6oKGpRBOt98WGboRmpx8QkE8OA";

module.exports = async function importSwahiliData(cropType, sheetData) {
  try {
    const sheetName = sheetData.map((data) => data.range);
    const auth = await getAuthToken();
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth,
    });

    let diseaseRecommendations = [];
    let pestRecommendations = [];
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
      const parameterName = valueRange.values[0][0].toLowerCase()?.trim();
      if (
        parameterName === "jina la wadudu/wadudu" ||
        parameterName === "dalili ya wadudu/wadudu"
      ) {
        pestRecommendations = await getPestRecommendations(
          valueRange,
          module,
          _cropType
        );
      } else if (
        parameterName === "jina la ugonjwa" ||
        parameterName === "dalili ya ugonjwa"
      ) {
        let diseaseRecommendationsData = await getDiseaseRecommendations(
          valueRange,
          module,
          _cropType
        );
        diseaseRecommendations = diseaseRecommendationsData;
      } else if (
        parameterName === "fanya mazoezi" ||
        parameterName === "mbinu na kipindi cha mazoezi"
      ) {
        await getSpecialOperations(valueRange, module, _cropType);
      } else {
        for (let i = 0; i < valueRange.values.length; i++) {
          let dataRows = valueRange.values[i];
          if (
            swahiliTranslation[
              dataRows[currentSheetData.parameterIndex]?.trim()
            ]
          ) {
            try {
              let moduleAttribute =
                await db.CropRecommendationModuleAttribute.findOne({
                  where: {
                    ddName:
                      swahiliTranslation[
                        dataRows[currentSheetData.parameterIndex]?.trim()
                      ],
                    moduleId: module.id,
                  },
                });
              if (moduleAttribute && moduleAttribute.type === "info") {
                await db.CropRecommendationModuleAttribute.update(
                  {
                    swahili: dataRows[currentSheetData.parameterIndex],
                  },
                  {
                    where: {
                      id: moduleAttribute.id,
                    },
                  },
                  {}
                );
                const swahili = dataRows[
                  currentSheetData.recommendationDataIndex
                ]
                  ?.split("•")
                  ?.filter((val) => val?.trim() !== "")
                  ?.map((val) => val?.trim());
                await db.CropRecommendation.update(
                  { swahili },
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
    console.log(error.message, error.stack);
  }
};

async function getSpecialOperations(valueRange, module, _cropType) {
  let operations = [];

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
      !operationData["Fanya mazoezi"]?.trim().startsWith("Angalia DD") &&
      !operationData["Fanya mazoezi"]?.trim().startsWith("Mbegu DD") &&
      !operationData["Fanya mazoezi"]?.trim().startsWith("Tazama DD") &&
      !operationData["Fanya mazoezi"]?.trim().startsWith("Maandishi") &&
      operationData["Fanya mazoezi"]?.trim() !== ""
  );

  for (let operationData of operations) {
    const practice = operationData["Fanya mazoezi"].trim();

    if (swahiliTranslation[practice]) {
      let operationPractice =
        await db.CropObservationSpecialOperationPractice.findOne({
          where: {
            practice: { [Op.like]: `%${swahiliTranslation[practice]}%` },
            cropTypeId: _cropType?.id,
          },
        });

      await db.CropObservationSpecialOperationPractice.update(
        {
          swahili: practice,
        },
        {
          where: {
            practice: { [Op.like]: `%${swahiliTranslation[practice]}%` },
            cropTypeId: _cropType?.id,
          },
        },
        {}
      );
      if (operationPractice) {
        const swahili = operationData["Mbinu na kipindi cha mazoezi"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());

        await db.SpecialOperationRecommendation.update(
          {
            swahili,
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
      !operationData["Jina la ugonjwa"]?.trim().startsWith("Angalia DD") &&
      !operationData["Jina la ugonjwa"]?.trim().startsWith("Mbegu DD") &&
      !operationData["Jina la ugonjwa"]?.trim().startsWith("Tazama DD") &&
      !operationData["Jina la ugonjwa"]?.trim().startsWith("Maandishi") &&
      operationData["Jina la ugonjwa"]?.trim() !== ""
  );

  for (diseaseData of diseases) {
    const diseaseName = diseaseData["Jina la ugonjwa"].trim();

    if (swahiliTranslation[diseaseName]) {
      let disease = await db.CropObservationDisease.findOne({
        where: { name: swahiliTranslation[diseaseName] },
      });

      if (disease) {
        await db.CropObservationDisease.update(
          {
            swahili: diseaseName,
          },
          {
            where: { id: disease.id },
          }
        );
        const symptoms = diseaseData["Dalili ya ugonjwa"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const prevention = diseaseData["Kinga Inayopendekezwa"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const treatment = diseaseData["Matibabu Iliyopendekezwa"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());

        diseaseRecommendations.push({
          cropTypeId: _cropType?.id,
          diseaseId: disease.id,
          symptoms,
          prevention,
          treatment,
          language: "swahili",
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

  pests = pests.filter(
    (operationData) =>
      !operationData["Jina la wadudu/wadudu"]
        ?.trim()
        .startsWith("Angalia DD") &&
      !operationData["Jina la wadudu/wadudu"]?.trim().startsWith("Mbegu DD") &&
      !operationData["Jina la wadudu/wadudu"]?.trim().startsWith("Tazama DD") &&
      !operationData["Jina la wadudu/wadudu"]?.trim().startsWith("Maandishi") &&
      operationData["Jina la wadudu/wadudu"]?.trim() !== ""
  );

  for (pestData of pests) {
    const pestName = pestData["Jina la wadudu/wadudu"].trim();
    if (swahiliTranslation[pestName]) {
      let pest = await db.CropObservationPestInfestation.findOne({
        where: { name: swahiliTranslation[pestName] },
      });

      if (pest) {
        await db.CropObservationPestInfestation.update(
          {
            swahili: pestName,
          },
          {
            where: { id: pest.id },
          },
          {}
        );
        const symptoms = pestData["Dalili ya wadudu/wadudu"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const prevention = pestData["Kinga Inayopendekezwa"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const treatment = pestData["Matibabu Iliyopendekezwa"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());

        pestRecommendations.push({
          cropTypeId: _cropType.id,
          pestId: pest.id,
          symptoms,
          prevention,
          treatment,
          language: "swahili",
        });
      }
    }
  }

  return pestRecommendations;
}
