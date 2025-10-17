#!/usr/bin/env node
const app = require("../../app");
const db = require(rootPath + "/models");

const importAllCrops = require("./schema/allCrops");
const importAllCropsNepali = require("./schema/allCropsNepali");
const importAllCropsSwahili = require("./schema/allCropsSwahili");
const importAllCropsSpanish = require("./schema/allCropsSpanish");
const importAllCropsPortugese = require("./schema/allCropsPortugese");

async function main() {
  try {
    // await db.ScaleRecommendation.destroy({ where: {}, truncate: true });

    // await importAllCrops();
    // await importAllCropsNepali();
    await importAllCropsSwahili();
    // await importAllCropsSpanish();
    // await importAllCropsPortugese();

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

main();
