#!/usr/bin/env node
const app = require("../../app");

const db = require(rootPath + "/models");
const importDiseaseAndSymptoms = require("./index");

async function main() {
  await db.DiseaseTypeAndCropType.destroy({
    where: {},
    truncate: true,
  });
  // await db.DiseaseSymptoms.destroy({
  //   where: {},
  // });
  // await db.DiseaseType.destroy({
  //   where: {},
  // });

  await importDiseaseAndSymptoms();
  console.log("ran successfully............");
  process.exit();
}

main();
