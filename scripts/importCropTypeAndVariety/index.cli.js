#!/usr/bin/env node
const app = require('../../app');
const importCropTypeVarietyAndInfo = require('./script');
const swahiliTranslation = require('./translationKeys/swahili');
const db = require(rootPath + "/models");

const CROP_INFORMATION_RECOMMENDATIONS = [
  {
    language: 'swahili',
    sheetName: 'swahili!A2:K',
    spreadsheetId: '1IheivyM9bVIvkDjJQ--Zkcx6VDPcES8nSUmfnrnVPEI',
    translation: swahiliTranslation,
  },
];

async function main() {
  console.log('=================================');
  console.log('Crop Type, Variety and General Crop Information Recommendation Import Begin');
  console.log('=================================');
  await db.GeneralCropInformationRecommendation.destroy(
    {
      where: {},
      truncate: true,
    }
  );

  await importCropTypeVarietyAndInfo({
    spreadsheetId: '1IheivyM9bVIvkDjJQ--Zkcx6VDPcES8nSUmfnrnVPEI',
    sheetName: 'Crop* types and varieties-english-all crops!A2:K',
    language: 'english',
    translation: {},
    shouldImportTypeAndVariety: true,
  });

  await Promise.all(
    CROP_INFORMATION_RECOMMENDATIONS.map((config) =>
      importCropTypeVarietyAndInfo(config)
    )
  );

  console.log('=================================');
  console.log('Crop Type, Variety and General Crop Information Recommendation Imported Successfully');
  console.log('=================================');
  process.exit();
}

main();
