#!/usr/bin/env node
const {
  getAuthToken,
  getSheetsName,
} = require("../../../components/googleSheetsService");
const spreadsheetId = '1gOOyvURcqixt5XQAnfTUlfyhFLOI2c_do9YShBVL_xM';
const cropScaleReportImportDataNepali = require("../importScaleRecommendationNepali");
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
  'क्रप टेम्प्लेट (आधिकारिक)',
  'क्रप टेम्प्लेट (संशोधन अन्तर्गत)',
  'प्रस्तुतिहरू',
  'मिल्दो संस्करणहरू',
];

module.exports = async function importAllCropsNepali() {
  try {
    const auth = await getAuthToken();
    const { sheets } = await getSheetsName(spreadsheetId, auth);
    const allSheetNames = sheets
      ?.filter(
        ({ properties }) => !excludedSheetNames.includes(properties.title.trim()))
      ?.map(({ properties }) => properties.title);

    for (let i = 0; i < allSheetNames.length; i += 10) {
      const chunk = allSheetNames.slice(i, i + 10);
      console.log("chunk =>", chunk);

      for (let j = 0; j < chunk.length; j++) {
        sheetName = chunk[j];

        let cropTypeArray = sheetName.split("-");
        const crop =
          cropTypeArray[0].charAt(0).toUpperCase() + cropTypeArray[0].slice(1);
        const country =
          cropTypeArray[1].charAt(0).toUpperCase() + cropTypeArray[1].slice(1);

        let cropType = `${crop.trim()} (${country})`;

        await cropScaleReportImportDataNepali(cropType, sheetData(sheetName));
      }

      // await new Promise(resolve => setTimeout(resolve, 10000));
      console.log("******************************");
    }
  } catch (error) {
    console.log(error.message, error.stack);
  }
};
