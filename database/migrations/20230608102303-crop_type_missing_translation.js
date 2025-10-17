'use strict';
let jsonData = [
  {
    "english": "Wheat (Nepal)",
    "nepali": "गहुँ (नेपाल)"
  },
  {
    "english": "Sorghum (Nepal)",
    "nepali": "ज्वार (नेपाल)"
  },
  {
    "english": "Green gram (Nepal)",
    "nepali": "हरियो चना (नेपाल)"
  },
  {
    "english": "Nutmeg&mace (Nepal)",
    "nepali": "जायफल र गदा (नेपाल)"
  },
  {
    "english": "Tomato (Nepal)",
    "nepali": "टमाटर (नेपाल)"
  },
  {
    "english": "Lemon (Nepal)",
    "nepali": "कागती (नेपाल)"
  },
  {
    "english": "Onion (Nepal)",
    "nepali": "प्याज (नेपाल)"
  },
  {
    "english": "Banana (Nepal)",
    "nepali": "केरा (नेपाल)"
  },
  {
    "english": "Pearl millet (Nepal)",
    "nepali": "मोती कोदो (नेपाल)"
  },
  {
    "english": "Ginger (Nepal)",
    "nepali": "अदुवा (नेपाल)"
  },
  {
    "english": "Garlic (Nepal)",
    "nepali": "लसुन (नेपाल)"
  },
  {
    "english": "Rapeseed ( Nepal )",
    "nepali": "तोरी (नेपाल)"
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
