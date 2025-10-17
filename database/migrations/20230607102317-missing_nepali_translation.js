'use strict';
let jsonData = [
  {
    "english": "Soil and Climatic Requirements",
    "nepali": "माटो र जलवायु आवश्यकताहरू"
  },
]
const moment = require("moment")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
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
