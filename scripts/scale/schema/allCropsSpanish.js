#!/usr/bin/env node
const {
  getAuthToken,
  getSheetsName,
} = require("../../../components/googleSheetsService");
const spreadsheetId = "1YbdazZcq5eeBiE8oRzdMeYBUQ4iuYVw34taGDrugFIk";
const cropScaleReportImportDataSpanish = require("../importScaleRecommendationSpanish");

const sheetData = (cropName) => [
  {
    range: `${cropName}!A57:F61`,
    scaleIndex: 3,
    recommendationIndex: 4,
    report: "Soil Management Report",
  },
  {
    range: `${cropName}!A62:F62`,
    scaleIndex: 3,
    noteIndex: 4,
    recommendationIndex: 5,
    report: "Soil Management Report",
  },
];
const excludedSheetNames = [
  'Plantilla de recorte (OFICIAL)',
  'Plantilla de recorte (en revisión)',
  'PRESENTACIONES',
  'versiones coincidentes',
  'Crop template (under revision)',
];

const cropTypesToImport = ['coffee', 'sugarcane', 'soybean'];

module.exports = async function importAllCropsSpanish() {
  try {
    const auth = await getAuthToken();
    const { sheets } = await getSheetsName(spreadsheetId, auth);
    const allSheetNames = sheets
      ?.filter(({ properties }) => !excludedSheetNames.includes(properties.title.trim()))
      ?.map(({ properties }) => properties.title);

    for (let i = 0; i < allSheetNames.length; i += 10) {
      const chunk = allSheetNames.slice(i, i + 10);
      console.log('chunk =>', chunk);
      for (let j = 0; j < chunk.length; j++) {
        sheetName = chunk[j];

        let cropTypeArray = sheetName.split("-");
        const crop =
          cropTypeArray[0].charAt(0).toUpperCase() + cropTypeArray[0].slice(1);
        const country =
          cropTypeArray[1].charAt(0).toUpperCase() + cropTypeArray[1].slice(1);
        let cropType = `${crop.trim()} (${country})`;
        if(!cropTypesToImport.includes(crop.trim().toLowerCase())) continue;

        await cropScaleReportImportDataSpanish(cropType, sheetData(sheetName));
      }

      console.log("******************************");
    }
  } catch (error) {
    console.log(error.message, error.stack);
  }
};
