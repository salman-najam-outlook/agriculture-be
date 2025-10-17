#!/usr/bin/env node
const {
    getAuthToken,
    getSheetsName,
  } = require("../../../components/googleSheetsService");
  const spreadsheetId = "1j9eAAalC-bf00XmHVv-VdbU1cKYVwpI_kZfFh8xDIT8";
  const cropScaleReportImportDataPortugese = require("../importScaleRecommendationPortugese");
  
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

  const SHEETS_TO_IMPORT = [
    'coffee-brazil',
    'coffee-colombia',
    'coffee-bolivia',
    'soybean-brazil',
    'soybean-bolivia',
    'sugarcane-brazil',
    'sugarcane-colombia',
    'sugarcane-bolivia',
    'mango-brazil',
  ];
  
  module.exports = async function importAllCropsPortugese() {
    try {
      const auth = await getAuthToken();
      const { sheets } = await getSheetsName(spreadsheetId, auth);
      const allSheetNames = sheets
        ?.filter(({ properties }) => SHEETS_TO_IMPORT.includes(properties.title?.trim()))
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
          const cropType = `${crop.trim()} (${country})`;
  
          await cropScaleReportImportDataPortugese(cropType, sheetData(sheetName));
        }
  
        console.log("******************************");
      }
    } catch (error) {
      console.log(error.message, error.stack);
    }
  };
  