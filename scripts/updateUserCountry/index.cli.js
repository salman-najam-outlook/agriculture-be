#!/usr/bin/env node
const app = require("../../app");
const updateUserCountry = require("./index");

async function main() {
  try {
    await updateUserCountry();
    console.log("ran successfully............");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

main();
