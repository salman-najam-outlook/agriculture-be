#!/usr/bin/env node
const app = require("../../app");

const db = require(rootPath + "/models");
const importPestAndSymptoms = require("./index");

async function main() {
  await db.PestTypeAndCropType.destroy({
    where: {},
    truncate: true,
  });
  // await db.PestInfestationSymptom.destroy({
  //   where: {},
  // });
  // await db.PestType.destroy({
  //   where: {},
  // });

  await importPestAndSymptoms();
  console.log("ran successfully............");
  process.exit();
}

main();
