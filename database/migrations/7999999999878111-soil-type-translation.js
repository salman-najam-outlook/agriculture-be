'use strict';
const path = require("path");
let jsonData = [
  {
    "english": "Sandy loam soil",
    "spanish": "Suelo franco arenoso"
  },
  {
    "english": "Clay loam soil",
    "spanish": "Suelo franco arcilloso"
  },
  {
    "english": "Silt loam soil",
    "spanish": "Suelo franco limoso"
  },
 
]
const {readFileSync} = require("fs")
const xlsx = require("xlsx")
const moment = require("moment")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log(jsonData, "jsonData")

      let langaugeObjects = jsonData.map(el => {
        el.createdAt= moment.utc().format("YYYY-MM-DD HH:mm:ss")
        el.updatedAt= moment.utc().format("YYYY-MM-DD HH:mm:ss")

        return el
      })

      await queryInterface.bulkInsert(
        "global_translation_metadata",
        langaugeObjects,
        {},
        {}
      );
    } catch (error) {
      console.log(error)
    }


  },
  down: async (queryInterface, Sequelize) => {

  },
};
