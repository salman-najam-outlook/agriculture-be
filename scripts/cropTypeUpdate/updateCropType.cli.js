#!/usr/bin/env node
const app = require("../../app");
const updateCropType = require("./cropType");
const updateIsoCode = require("./updateRegion");

async function main() {
  await updateCropType();
  await updateIsoCode();
  process.exit();
}

main();
