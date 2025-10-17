#!/usr/bin/env node

const db = require(rootPath + "/models");
const _ = require("lodash");
const {
  getAuthToken,
  getSpreadSheetValues,
} = require("../../components/googleSheetsService.js");
const { Op } = require("sequelize");
const { spanishTranslation } = require("./translationKeys/spanish.js");

const spreadsheetId = "1YbdazZcq5eeBiE8oRzdMeYBUQ4iuYVw34taGDrugFIk";

module.exports = async function importSpanishData(cropType, sheetData) {
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
      if (parameterName === "nombre de plaga/insecto") {
        pestRecommendations = await getPestRecommendations(
          valueRange,
          module,
          _cropType
        );
        console.log(pestRecommendations);
      } else if (
        parameterName === "nombre de la enfermedad" ||
        parameterName === "síntoma de la enfermedad"
      ) {
        let diseaseRecommendationsData = await getDiseaseRecommendations(
          valueRange,
          module,
          _cropType
        );
        diseaseRecommendations = diseaseRecommendationsData;
      } else if (
        parameterName === "práctica" ||
        parameterName === "método y período de práctica."
      ) {
        await getSpecialOperations(valueRange, module, _cropType);
      } else {
        for (let i = 0; i < valueRange.values.length; i++) {
          let dataRows = valueRange.values[i];
          if (
            spanishTranslation[
              dataRows[currentSheetData.parameterIndex]?.trim()
            ]
          ) {
            try {
              let moduleAttribute =
                await db.CropRecommendationModuleAttribute.findOne({
                  where: {
                    ddName:
                      spanishTranslation[
                        dataRows[currentSheetData.parameterIndex]?.trim()
                      ],
                    moduleId: module.id,
                  },
                });
              if (moduleAttribute && moduleAttribute.type === "info") {
                await db.CropRecommendationModuleAttribute.update(
                  {
                    spanish: dataRows[currentSheetData.parameterIndex],
                  },
                  {
                    where: {
                      id: moduleAttribute.id,
                    },
                  },
                  {}
                );
                const spanish = dataRows[
                  currentSheetData.recommendationDataIndex
                ]
                  ?.split("•")
                  ?.filter((val) => val?.trim() !== "")
                  ?.map((val) => val?.trim());
                await db.CropRecommendation.update(
                  { spanish },
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
      !operationData["Práctica"]?.trim().startsWith("Ver DD aquí") &&
      operationData["Práctica"]?.trim() !== ""
  );

  for (let operationData of operations) {
    const practice = operationData["Práctica"]?.trim();

    if (spanishTranslation[practice]) {
      let operationPractice =
        await db.CropObservationSpecialOperationPractice.findOne({
          where: {
            practice: {
              [Op.like]: `%${spanishTranslation[practice]}%`,
            },
            cropTypeId: _cropType?.id,
          },
        });

      await db.CropObservationSpecialOperationPractice.update(
        {
          spanish: practice,
        },
        {
          where: {
            practice: {
              [Op.like]: `%${spanishTranslation[practice?.trim()]}%`,
            },
            cropTypeId: _cropType?.id,
          },
        },
        {}
      );
      if (operationPractice) {
        const spanish = operationData[" Método y período de práctica."]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());

        await db.SpecialOperationRecommendation.update(
          {
            spanish,
          },
          {
            where: {
              practice: {
                [Op.like]: `%${spanishTranslation[practice]}%`,
              },
              cropTypeId: _cropType?.id,
              practiceId: operationPractice.id,
            },
          },
          {}
        );
        if (operationPractice) {
          const spanish = operationData["Método y período de práctica."]
            ?.split("•")
            ?.filter((val) => val?.trim() !== "")
            ?.map((val) => val?.trim());

          await db.SpecialOperationRecommendation.update(
            {
              spanish,
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
      !operationData["Nombre de la enfermedad"]
        ?.trim()
        .startsWith("Ver DD aquí") &&
      !operationData["Nombre de la enfermedad"]
        ?.trim()
        .startsWith(
          "Ver DD para métodos culturales/mecánicos/biológicos de control de plagas"
        ) &&
      operationData["Nombre de la enfermedad"]?.trim() !== ""
  );

  for (diseaseData of diseases) {
    const diseaseName = diseaseData["Nombre de la enfermedad"]?.trim();

    console.log(spanishTranslation[diseaseName], diseaseName, _cropType.id)

    if (spanishTranslation[diseaseName]) {
      let disease = await db.CropObservationDisease.findOne({
        where: {
          name: {
            [db.Sequelize.Op.like]: `%${spanishTranslation[diseaseName]}%`,
          },
        },
      });

      if (disease) {
        await db.CropObservationDisease.update(
          {
            spanish: diseaseName,
          },
          {
            where: { id: disease.id },
          }
        );

        const diseaseRecommendation =
          await db.PestAndDiseaseRecommendation.findOne({
            where: {
              language: "spanish",
              cropTypeId: _cropType.id,
              diseaseId: disease.id,
            },
          });

        if (!diseaseRecommendation) {
          const symptoms = diseaseData["síntoma de la enfermedad"]
            ?.split("•")
            ?.filter((val) => val?.trim() !== "")
            ?.map((val) => val?.trim());
          const prevention = diseaseData["Prevención recomendada"]
            ?.split("•")
            ?.filter((val) => val?.trim() !== "")
            ?.map((val) => val?.trim());
          const treatment = diseaseData["Tratamiento recomendado"]
            ?.split("•")
            ?.filter((val) => val?.trim() !== "")
            ?.map((val) => val?.trim());

          diseaseRecommendations.push({
            cropTypeId: _cropType?.id,
            diseaseId: disease.id,
            symptoms,
            prevention,
            treatment,
            language: "spanish",
          });
        }
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
      !operationData["Nombre de plaga/insecto"]
        ?.trim()
        .startsWith("Ver DD aquí") &&
      !operationData["Nombre de plaga/insecto"]
        ?.trim()
        .startsWith(
          "Ver DD para métodos culturales/mecánicos/biológicos de control de plagas"
        ) &&
      operationData["Nombre de plaga/insecto"]?.trim() !== ""
  );
  for (pestData of pests) {
    const pestName = pestData["Nombre de plaga/insecto"]?.trim();
    if (spanishTranslation[pestName]) {
      let pest = await db.CropObservationPestInfestation.findOne({
        where: {
          name: {
            [db.Sequelize.Op.like]: `%${spanishTranslation[pestName]}%`,
          },
        },
      });

      if (pest) {
        await db.CropObservationPestInfestation.update(
          {
            spanish: pestName,
          },
          {
            where: { id: pest.id },
          },
          {}
        );

        const pestRecommendation =
          await db.PestAndDiseaseRecommendation.findOne({
            where: {
              language: "spanish",
              cropTypeId: _cropType.id,
              pestId: pest.id,
            },
          });
        if (!pestRecommendation) {
          const symptoms = pestData["Síntoma de plaga/insecto"]
            ?.split("•")
            ?.filter((val) => val?.trim() !== "")
            ?.map((val) => val?.trim());
          const prevention = pestData["Prevención recomendada"]
            ?.split("•")
            ?.filter((val) => val?.trim() !== "")
            ?.map((val) => val?.trim());
          const treatment = pestData["Tratamiento recomendado"]
            ?.split("•")
            ?.filter((val) => val?.trim() !== "")
            ?.map((val) => val?.trim());

          pestRecommendations.push({
            cropTypeId: _cropType.id,
            pestId: pest.id,
            symptoms,
            prevention,
            treatment,
            language: "spanish",
          });
        }
      }
    }
  }
  return pestRecommendations;
}
