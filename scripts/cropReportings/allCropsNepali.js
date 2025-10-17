#!/usr/bin/env node
const {
    getAuthToken,
    getSheetsName,
  } = require('../../components/googleSheetsService');
const spreadsheetId = '1gOOyvURcqixt5XQAnfTUlfyhFLOI2c_do9YShBVL_xM';
const cropReportNepaliImportData = require("./cropReportNepali");
const sheetData = (cropName) => [
  {
    parameterIndex: 0,
    range: `${cropName}!A22:F32`,
    recommendationDataIndex: 3,
    report: 'Land Preparation Report',
  },
  {
    parameterIndex: 0,
    range: `${cropName}!A35:F36`,
    recommendationDataIndex: 3,
    report: 'Land Preparation Report',
  },
  {
    parameterIndex: 0,
    range: `${cropName}!A39:F50`,
    recommendationDataIndex: 3,
    report: 'Sowing/Planting Report',
  },
  {
    parameterIndex: 0,
    range: `${cropName}!A55:F62`,
    recommendationDataIndex: 3,
    report: 'Soil Management Report',
  },
  {
    parameterIndex: 0,
    range: `${cropName}!A65:F69`,
    recommendationDataIndex: 3,
    report: 'Soil Management Report',
  },
  {
    parameterIndex: 0,
    range: `${cropName}!A74:F77`,
    recommendationDataIndex: 3,
    report: 'Irrigation Report',
  },
  {
    parameterIndex: 0,
    range: `${cropName}!A90:F90`,
    recommendationDataIndex: 3,
    report: 'Weeding Report',
  },
  {
    parameterIndex: 0,
    range: `${cropName}!A93:F95`,
    recommendationDataIndex: 3,
    report: 'Weeding Report',
  },
  {
    parameterIndex: 0,
    range: `${cropName}!A121:F133`,
    recommendationDataIndex: 3,
    report: 'Harvesting Report',
  },
  {
    parameterIndex: 0,
    range: `${cropName}!A140:F140`,
    recommendationDataIndex: 4,
    report: 'Storage Report',
  },
  {
    parameterIndex: 0,
    range: `${cropName}!A143:F145`,
    recommendationDataIndex: 4,
    report: 'Storage Report',
  },
  {
    range: `${cropName}!A98:G99`,
    report: 'Special Operations',
    type: 'Special Operations',
  },
  {
    range: `${cropName}!A104:M108`,
    report: 'Pest and Disease Management Report',
    type: 'Pests',
  },
  {
    range: `${cropName}!A110:Q114`,
    report: 'Pest and Disease Management Report',
    type: 'Diseases',
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
      ?.filter(({ properties }) => !excludedSheetNames.includes(properties.title.trim()))
      ?.map(({ properties }) => properties.title);

      for (let i = 0; i < allSheetNames.length; i += 10) {
          const chunk = allSheetNames.slice(i, i + 10);
          console.log('chunk =>', chunk);

        for (let j = 0; j < chunk.length; j++) {
          sheetName = chunk[j];

          let cropTypeArray = sheetName.split('-');
          const crop = cropTypeArray[0].charAt(0).toUpperCase() + cropTypeArray[0].slice(1);
          const country = cropTypeArray[1].charAt(0).toUpperCase() + cropTypeArray[1].slice(1);
    
          let cropType = `${crop.trim()} (${country})`;
  
          await cropReportNepaliImportData(cropType, sheetData(sheetName));
        }

        // await new Promise(resolve => setTimeout(resolve, 10000));
        console.log('******************************');
      }
    } catch(error) {
    console.log(error.message, error.stack);
  }
}

