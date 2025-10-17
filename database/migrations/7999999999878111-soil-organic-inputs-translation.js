'use strict';
const path = require("path");

let jsonData = [
  {
    "english": "Bone Meal",
    "spanish": "Harina de hueso"
  },
  {
    "english": "Chicken Litter",
    "spanish": "Arena de pollo"
  },
  {
    "english": "Rock Phospate",
    "spanish": "Fospatado de roca"
  },
  {
    "english": "Manure",
    "spanish": "Estiércol"
  },
  
]
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
