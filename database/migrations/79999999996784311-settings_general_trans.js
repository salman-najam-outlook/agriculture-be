'use strict';
const moment = require("moment")
let jsonData = [
  {
    "english": "SynthenticFertilizerNitrogenUnit",
    "hindi": "संश्लेषण उर्वरक नाइट्रोजन इकाई",
    "marathi": "सिंथेंटिक खत नायट्रोजन युनिट",
    "nepali": "सिन्टेनरिक मलिक नाइट्रोजन एकाई",
    "spanish": "Unidad de nitrógeno de fertilizante sinténtico"
  },
  {
    "english": "SynthenticFertilizerPhosphorousUnit",
    "hindi": "संश्लेषण उर्वरक फॉस्फोरस एकक",
    "marathi": "सिंथेंटिक फॉस्फरस युनिट",
    "nepali": "सिन्टेन्डिक मल फाल्फोरजर एकाई",
    "spanish": "Unidad de fósforo de fertilizantes sinténticos"
  },
  {
    "english": "SynthenticFertilizerPotassiumUnit",
    "hindi": "संश्लेषण उर्वरक पोटेशियम इकाई",
    "marathi": "सिंथेंटिक खत पोटॅशियम युनिट",
    "nepali": "सिन्टेननिक मल पोटेशियम एकाई",
    "spanish": "Unidad de potasio de fertilizante sinténtico"
  },
  {
    "english": "CoffeeParchmentDensityUnit",
    "hindi": "कॉफी चर्मपत्र घनत्व इकाई",
    "marathi": "कॉफी चर्मपत्र घनता एकक",
    "nepali": "कफी पोर्चुमेन्ट घनत्व एकाई",
    "spanish": "Unidad de densidad de pergamino de café"
  },
  {
    "english": "Density",
    "hindi": "घनत्व",
    "marathi": "घनता",
    "nepali": "घनता",
    "spanish": "Densidad"
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("UPDATE unit_types SET name = 'SynthenticFertilizerNitrogenUnit' WHERE name LIKE 'SythenticFertilizerNitrogenUnit';");
    await queryInterface.sequelize.query("UPDATE unit_types SET name = 'SynthenticFertilizerPhosphorousUnit' WHERE name LIKE 'SythenticFertilizerPhosphorousUnit';");
    await queryInterface.sequelize.query("UPDATE unit_types SET name = 'SynthenticFertilizerPotassiumUnit' WHERE name LIKE 'SythenticFertilizerPotassiumUnit';");



    
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
  },

  down: async (queryInterface, Sequelize) => {

  },
};

