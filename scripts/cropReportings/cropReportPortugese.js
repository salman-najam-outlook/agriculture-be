#!/usr/bin/env node

const db = require(rootPath + "/models");
const _ = require("lodash");
const {
  getAuthToken,
  getSpreadSheetValues,
} = require("../../components/googleSheetsService.js");
const { Op } = require("sequelize");
const { portugeseTranslation } = require("./translationKeys/portugese.js");

const spreadsheetId = "1j9eAAalC-bf00XmHVv-VdbU1cKYVwpI_kZfFh8xDIT8";

module.exports = async function importPortugeseData(cropType, sheetData) {
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
    if (_.isEmpty(_cropType)) {
      console.log('MISSING CROP TYPE', cropType);
      return false
    };

    for (let i = 0; i < response.data.valueRanges.length; i++) {
      const valueRange = response.data.valueRanges[i];
      const currentSheetData = sheetData[i];
      const module = await db.CropRecommendationModule.findOne({
        attributes: ["id"],
        where: { name: currentSheetData.report },
      });
      const parameterName = valueRange.values[0][0].toLowerCase()?.trim();
      if (parameterName === "nome da praga/inseto") {
        pestRecommendations = await getPestRecommendations(
          valueRange,
          module,
          _cropType
        );
      } else if (
        parameterName === "nome da doença" ||
        parameterName === "sintoma de doença"
      ) {
        let diseaseRecommendationsData = await getDiseaseRecommendations(
          valueRange,
          module,
          _cropType
        );
        diseaseRecommendations = diseaseRecommendationsData;
      } else if (
        parameterName === "prática" ||
        parameterName === "método e período de prática"
      ) {
        await getSpecialOperations(valueRange, module, _cropType);
      } else {
        for (let i = 0; i < valueRange.values.length; i++) {
          let dataRows = valueRange.values[i];
          if (
            portugeseTranslation[
              dataRows[currentSheetData.parameterIndex]?.trim()
            ]
          ) {
            try {
              let moduleAttribute =
                await db.CropRecommendationModuleAttribute.findOne({
                  where: {
                    ddName:
                      portugeseTranslation[
                        dataRows[currentSheetData.parameterIndex]?.trim()
                      ],
                    moduleId: module.id,
                  },
                });
              if (moduleAttribute && moduleAttribute.type === "info") {
                await db.CropRecommendationModuleAttribute.update(
                  {
                    portugese: dataRows[currentSheetData.parameterIndex],
                  },
                  {
                    where: {
                      id: moduleAttribute.id,
                    },
                  },
                  {}
                );
                const portugese = dataRows[
                  currentSheetData.recommendationDataIndex
                ]
                  ?.split("•")
                  ?.filter((val) => val?.trim() !== "")
                  ?.map((val) => val?.trim());
                await db.CropRecommendation.update(
                  { portugese },
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
          } else {
            console.log('MISSING TRANSLATION', dataRows[currentSheetData.parameterIndex]?.trim());
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
      !operationData["Prática"]?.trim().startsWith("Ver DD aqui") &&
      operationData["Prática"]?.trim() !== ""
  );

  for (let operationData of operations) {
    const practice = operationData["Prática"]?.trim();

    if (portugeseTranslation[practice]) {
      let operationPractice =
        await db.CropObservationSpecialOperationPractice.findOne({
          where: {
            practice: {
              [Op.like]: `%${portugeseTranslation[practice]}%`,
            },
            cropTypeId: _cropType?.id,
          },
        });

      await db.CropObservationSpecialOperationPractice.update(
        {
          portugese: practice,
        },
        {
          where: {
            practice: {
              [Op.like]: `%${portugeseTranslation[practice]}%`,
            },
            cropTypeId: _cropType?.id,
          },
        },
        {}
      );
      if (operationPractice) {
        const portugese = operationData["Método e período de prática"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());

        await db.SpecialOperationRecommendation.update(
          {
            portugese,
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
    } else {
      console.log('MISSING TRANSLATION SPECIAL', practice);
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
      !operationData["nome da doença"]?.trim().startsWith("Ver DD") &&
      !operationData["nome da doença"]
        ?.trim()
        .startsWith("Veja DD para método químico de controle de pragas") &&
      operationData["nome da doença"]?.trim() !== ""
  );

  for (diseaseData of diseases) {
    const diseaseName = diseaseData["nome da doença"];

    if (portugeseTranslation[diseaseName?.trim()]) {
      let disease = await db.CropObservationDisease.findOne({
        where: { name: portugeseTranslation[diseaseName?.trim()] },
      });

      if (disease) {
        await db.CropObservationDisease.update(
          {
            portugese: diseaseName,
          },
          {
            where: { id: disease.id },
          }
        );
        const symptoms = diseaseData["sintoma de doença"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const prevention = diseaseData["Prevenção Recomendada"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const treatment = diseaseData["Tratamento recomendado"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());

        diseaseRecommendations.push({
          cropTypeId: _cropType?.id,
          diseaseId: disease.id,
          symptoms,
          prevention,
          treatment,
          language: "portugese",
        });
      }
    } else {
      console.log('MISSING TRANSLATION DISEASE', diseaseName?.trim());
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
      !operationData["Nome da praga/inseto"]?.trim().startsWith("Ver DD") &&
      !operationData["Nome da praga/inseto"]
        ?.trim()
        .startsWith(
          "Veja DD para métodos culturais/mecânicos/biológicos de controle de pragas"
        ) &&
      operationData["Nome da praga/inseto"]?.trim() !== ""
  );
  for (pestData of pests) {
    const pestName = pestData["Nome da praga/inseto"]?.trim();
    if (portugeseTranslation[pestName]) {
      let pest = await db.CropObservationPestInfestation.findOne({
        where: { name: portugeseTranslation[pestName] },
      });

      if (pest) {
        await db.CropObservationPestInfestation.update(
          {
            portugese: pestName,
          },
          {
            where: { id: pest.id },
          },
          {}
        );
        const symptoms = pestData["Sintoma de praga/inseto"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const prevention = pestData["Prevenção Recomendada"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());
        const treatment = pestData["Tratamento recomendado"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());

        pestRecommendations.push({
          cropTypeId: _cropType.id,
          pestId: pest.id,
          symptoms,
          prevention,
          treatment,
          language: "portugese",
        });
      }
    } else {
      console.log('MISSING TRANSLATION PEST', pestName);
    }
  }

  return pestRecommendations;
}
