#!/usr/bin/env node

const db = require(rootPath + "/models");
const s3 = require(rootPath + "/components/s3upload.js");
const _ = require("lodash");
const mime = require("mime-types");
const {
  getAuthToken,
  getSpreadSheetValues,
  downloadFileFromDrive,
} = require("../../components/googleSheetsService.js");
const { Op } = require("sequelize");

const spreadsheetId = "1UP0Iz61s_JIBzeGZgxxYxLzihxhOCxf5PVfKdS_0zEk";

module.exports = async function importData(cropType, sheetData) {
  try {
    // const sheetName = 'wheat-libya';
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
            { [Op.like]: `%${cropType}%`},
            { [Op.like]: `%${cropType.replace('( ', '(').replace(' )', ')')}%`},
            { [Op.like]: `%${cropType.replace('(', '( ').replace(')', ' )')}%`}
          ]
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
        valueRange.values[0][0].toLowerCase() === "pest / insect name" ||
        valueRange.values[0][0].toLowerCase() === "pest/insect name" ||
        valueRange.values[0][0].toLowerCase() === "pests / insects" ||
        valueRange.values[0][0].toLowerCase() === "pests/insects" ||
        valueRange.values[0][0].toLowerCase() === "insects"
      ) {
        pestRecommendationsData = await getPestRecommendations(
          valueRange,
          module,
          _cropType
        );
        console.log("pestRecommendationsData", pestRecommendationsData);
        pestRecommendations = pestRecommendationsData.pestRecommendations;
        pestImages = pestRecommendationsData.pestImages;
      } else if (
        valueRange.values[0][0].toLowerCase() === "diseases name" ||
        valueRange.values[0][0].toLowerCase() === "disease name" ||
        valueRange.values[0][0].toLowerCase() === "pests / diseases" ||
        valueRange.values[0][0].toLowerCase() === "pests/diseases" ||
        valueRange.values[0][0].toLowerCase() === "disease"
      ) {
        let diseaseRecommendationsData = await getDiseaseRecommendations(
          valueRange,
          module,
          _cropType
        );
        diseaseRecommendations =
          diseaseRecommendationsData.diseaseRecommendations;
        diseaseImages = diseaseRecommendationsData.diseaseImages;
      } else if (
        valueRange.values[0][0].toLowerCase() === "practice" ||
        valueRange.values[0][0].toLowerCase() ===
          "method & period of practice" ||
        valueRange.values[0][0].toLowerCase() ===
          "method and period of practice"
      ) {
        let specialOperationData = await getSpecialOperations(
          valueRange,
          module,
          _cropType
        );
        specialOperations = specialOperationData;
      } else {
        // for (dataRows of valueRange.values) {
        for (let i = 0; i < valueRange.values.length; i++) {
          let dataRows = valueRange.values[i];

          if (dataRows[currentSheetData.parameterIndex]) {
            try {
              let moduleAttribute =
                await db.CropRecommendationModuleAttribute.findOne({
                  where: { ddName: dataRows[currentSheetData.parameterIndex], moduleId: module.id },
                });
              console.log("module attribute -=>", moduleAttribute);

              if (!moduleAttribute) {
                try {
                  moduleAttribute =
                    await db.CropRecommendationModuleAttribute.create({
                      name: dataRows[currentSheetData.parameterIndex],
                      ddName: dataRows[currentSheetData.parameterIndex],
                      moduleId: module.id,
                      type: "info",
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    });
                } catch (e) {
                  console.log(e);
                }
              }

              if (moduleAttribute && moduleAttribute.type === "info") {
                const recommendation = dataRows[
                  currentSheetData.recommendationDataIndex
                ]
                  ?.split("•")
                  ?.filter((val) => val?.trim() !== "")
                  ?.map((val) => val?.trim());
                
                 recommendation && recommendation?.toString() !== 'See DD here' && !_.isEmpty(recommendation) && cropRecommendations.push({
                  cropTypeId: _cropType?.id,
                  moduleId: module.id,
                  moduleAttrId: moduleAttribute.id,
                  recommendation,
                });
              }
            } catch (e) {
              console.log("error =>", e);
            }
          }
        }
      }
    }

    console.log("cropRecommendations =>", cropRecommendations);
    console.log("specialOperations =>", specialOperations);
    await db.CropRecommendation.bulkCreate(cropRecommendations, {});
    await db.PestAndDiseaseRecommendation.bulkCreate(
      [...pestRecommendations, ...diseaseRecommendations],
      {}
    );
    if (!_.isEmpty(diseaseImages)) {
      await diseaseImagesSaveAndUpload(diseaseImages);
    }
    if (!_.isEmpty(pestImages)) {
      await pestImagesSaveAndUpload(pestImages);
    }

    if (!_.isEmpty(specialOperations)) {
      await db.SpecialOperationRecommendation.bulkCreate(specialOperations, {});
    }

    console.log(`output for ${cropType}`);
    console.log(
      "================================================================="
    );
    return true;
  } catch (error) {
    console.log(error)
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
    (operationData) => operationData["Practice"] !== "See DD here"
  ).filter(operationData => !_.isEmpty(operationData["Practice"]))

  for (operationData of operations) {
    let operationPractice =
      await db.CropObservationSpecialOperationPractice.findOne({
        where: {
          practice: operationData["Practice"].trim(),
          cropTypeId: _cropType?.id,
        },
      });

    if (!operationPractice) {
      operationPractice =
        await db.CropObservationSpecialOperationPractice.create({
          practice: operationData["Practice"].trim(),
          cropTypeId: _cropType?.id,
        });
    }

    if (operationPractice) {
      const periodSummary =
        operationData["Method & period of practice"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim()) ||
        operationData["Method and period of practice"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim()) || operationData["Method and Period of practice"]
          ?.split("•")
          ?.filter((val) => val?.trim() !== "")
          ?.map((val) => val?.trim());

      specialOperations.push({
        cropTypeId: _cropType?.id,
        practiceId: operationPractice.id,
        periodSummary,
      });
    }
  }
  return specialOperations;
}

async function getDiseaseRecommendations(valueRange, module, _cropType) {
  let diseases = [];
  let diseaseRecommendations = [];
  let diseaseImages = [];

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
    (item) => item["Disease symptom"] !== "See DD here"
  ).filter(
    (item) => item["Disease symptom"] !== "Textual"
  );

  for (diseaseData of diseases) {
    let disease = await db.CropObservationDisease.findOne({
      where: { name: diseaseData["Disease name"].trim() },
    });

    if (!disease) {
      disease = await db.CropObservationDisease.create({
        name: diseaseData["Disease name"].trim(),
      });
    }

    if (disease) {
      const symptoms = diseaseData["Disease symptom"]
        ?.split("•")
        ?.filter((val) => val?.trim() !== "")
        ?.map((val) => val?.trim());
      const prevention = diseaseData["Recommended Prevention"]
        ?.split("•")
        ?.filter((val) => val?.trim() !== "")
        ?.map((val) => val?.trim());
      const treatment = diseaseData["Recommended Treatment"]
        ?.split("•")
        ?.filter((val) => val?.trim() !== "")
        ?.map((val) => val?.trim());
      const imagesLinks = diseaseData["Link to pictures"]
        ?.split("\n")
        ?.filter((val) => val?.trim() !== "")
        ?.map((val) => val?.trim());

      diseaseRecommendations.push({
        cropTypeId: _cropType?.id,
        diseaseId: disease.id,
        symptoms,
        prevention,
        treatment,
        language: 'english'
      });
      diseaseImages.push({
        cropTypeId: _cropType?.id,
        diseaseId: disease.id,
        imagesLinks,
      });
    }
  }
  return { diseaseRecommendations, diseaseImages };
}

async function getPestRecommendations(valueRange, module, _cropType) {
  let pests = [];
  let pestRecommendations = [];
  let pestImages = [];

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
    (item) => item["Pest/Insect symptom"] !== "See DD here"
  ).filter(
    (item) => item["Pest/Insect symptom"] !== "Textual"
  );

  for (pestData of pests) {
    let pest = await db.CropObservationPestInfestation.findOne({
      where: { name: pestData["Pest/insect name"].trim() },
    });

    if (!pest) {
      // pest = await db.CropObservationDisease.create({
      pest = await db.CropObservationPestInfestation.create({
        name: pestData["Pest/insect name"].trim(),
      });
    }

    if (pest) {
      const symptoms = pestData["Pest/Insect symptom"]
        ?.split("•")
        ?.filter((val) => val?.trim() !== "")
        ?.map((val) => val?.trim());
      const prevention = pestData["Recommended Prevention"]
        ?.split("•")
        ?.filter((val) => val?.trim() !== "")
        ?.map((val) => val?.trim());
      const treatment = pestData["Recommended Treatment"]
        ?.split("•")
        ?.filter((val) => val?.trim() !== "")
        ?.map((val) => val?.trim());
      const imagesLinks = pestData["Link to pictures"]
        ?.split("\n")
        ?.filter((val) => val?.trim() !== "")
        ?.map((val) => val?.trim());

      pestRecommendations.push({
        cropTypeId: _cropType.id,
        pestId: pest.id,
        symptoms,
        prevention,
        treatment,
        language: 'english'
      });
      pestImages.push({
        cropTypeId: _cropType?.id,
        pestId: pest.id,
        imagesLinks,
      });
    }
  }

  return { pestRecommendations, pestImages };
}

async function diseaseImagesSaveAndUpload(diseaseData) {
  // format pest data
  diseaseData = diseaseData.reduce(
    (final, { cropTypeId, diseaseId, imagesLinks }) => {
      imagesLinks?.forEach((url) => {
        const fileId = url.match(/[-\w]{25,}/)[0];
        final.push({ cropTypeId, diseaseId, url, fileId });
      });
      return final;
    },
    []
  );

  for (let { cropTypeId, diseaseId, fileId } of diseaseData) {
    const diseaseImage = await db.DiseaseImage.findOne({ where: { fileId } });
    let set = { cropTypeId, diseaseId };

    if (diseaseImage === null) {
      const result = await downloadFileFromDrive(fileId);
      if (result === false) continue;
      // upload file into s3
      let type = mime.extension(result.headers?.["content-type"]);
      const buffer = Buffer.from(result.data);
      const uploadData = await s3.uploadBuffer({
        buffer,
        type,
        name: "disease-img/",
      });
      const { Key: s3Key, Location: s3Location } = uploadData;
      if (_.isEmpty(s3Key)) continue;
      set = { ...set, s3Key, s3Location, fileId };
      await db.DiseaseImage.create(set);
    } else {
      await diseaseImage.set(set).save();
    }
    console.log(fileId);
  }

  console.log(diseaseData);
}

async function pestImagesSaveAndUpload(pestData) {
  // format pest data
  pestData = pestData.reduce((final, { cropTypeId, pestId, imagesLinks }) => {
    imagesLinks?.forEach((url) => {
      const fileId = url.match(/[-\w]{25,}/)[0];
      final.push({ cropTypeId, pestId, url, fileId });
    });
    return final;
  }, []);

  for (let { cropTypeId, pestId, fileId } of pestData) {
    const pestImage = await db.PestImage.findOne({ where: { fileId } });
    let set = { cropTypeId, pestId };

    if (pestImage === null) {
      const result = await downloadFileFromDrive(fileId);
      if (result === false) continue;
      // upload file into s3
      let type = mime.extension(result.headers?.["content-type"]);
      const buffer = Buffer.from(result.data);
      const uploadData = await s3.uploadBuffer({
        buffer,
        type,
        name: "pest-img/",
      });
      const { Key: s3Key, Location: s3Location } = uploadData;
      if (_.isEmpty(s3Key)) continue;
      set = { ...set, s3Key, s3Location, fileId };
      await db.PestImage.create(set);
    } else {
      await pestImage.set(set).save();
    }
    console.log(fileId);
  }

  console.log(pestData);
}
