#!/usr/bin/env node
const { getAuthToken, getSheetsName } = require('../../../components/googleSheetsService');
const { swahiliTranslation } = require('../../cropReportings/translationKeys/swahili');
const spreadsheetId = '1ekXfjvdn_YbEC1KfS6oKGpRBOt98WGboRmpx8QkE8OA';
const cropScaleReportImportDataSwahili = require('../importScaleRecommendationSwahili');

const sheetData = (cropName) => [
  {
    range: `${cropName}!A57:F61`,
    scaleIndex: 3,
    recommendationIndex: 4,
    report: 'Soil Management Report',
  },
  {
    range: `${cropName}!A62:F62`,
    scaleIndex: 3,
    noteIndex: 4,
    recommendationIndex: 5,
    report: 'Soil Management Report',
  },
];

const cropTypesToImport = ['green gram', 'pineapple'];
module.exports = async function importAllCropsSwahili() {
  try {
    const auth = await getAuthToken();
    const { sheets } = await getSheetsName(spreadsheetId, auth);
    const allSheetNames = (sheets ?? []).map(({ properties }) => properties.title);

    for (let i = 0; i < allSheetNames.length; i += 10) {
      const chunk = allSheetNames.slice(i, i + 10);
      for (let j = 0; j < chunk.length; j++) {
        sheetName = chunk[j];

        let cropTypeArray = sheetName.split('-');
        let crop = cropTypeArray[0].charAt(0).toUpperCase() + cropTypeArray[0].slice(1);
        if(swahiliTranslation[cropTypeArray[0].trim()]) {
          crop = swahiliTranslation[cropTypeArray[0].trim()].charAt(0).toUpperCase() + swahiliTranslation[cropTypeArray[0].trim()].slice(1);
        }
        const country = cropTypeArray[1].charAt(0).toUpperCase() + cropTypeArray[1].slice(1);
        const cropType = `${crop.trim()} (${country})`;
        if(!cropTypesToImport.includes(crop.trim().toLowerCase())) continue;
        await cropScaleReportImportDataSwahili(cropType, sheetData(sheetName));
      }

      console.log('******************************');
    }
  } catch (error) {
    console.log(error.message, error.stack);
  }
};
