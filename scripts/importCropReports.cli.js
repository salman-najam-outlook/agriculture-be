#!/usr/bin/env node
const app = require("../app");
const db = require(rootPath + "/models");

const importAllCrops = require("./cropReportings/allCrops");
const importAllCropsSpanish = require("./cropReportings/allCropsSpanish");
const importAllCropsNepali = require("./cropReportings/allCropsNepali");
const importAllCropsSwahili = require("./cropReportings/allCropsSwahili");
const importAllCropsPortugese = require("./cropReportings/allCropsPortugese");


async function main() {
  // await Promise.all([
  //   db.CropRecommendation.destroy({ where: {}, truncate: true }),
  //   db.PestAndDiseaseRecommendation.destroy({ where: {}, truncate: true }),
  //   db.SpecialOperationRecommendation.destroy({ where: {}, truncate: true }),
  // ]);
  // await importAllCrops();
  // await importAllCropsSpanish();
  // await importAllCropsNepali();
  await importAllCropsSwahili();
  // await importAllCropsPortugese();
  process.exit();
}

main();
