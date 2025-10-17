'use strict';
const path = require("path");
const moment = require("moment")

let jsonData =[
  {
    "English": "Honey",
    "Hindi": "शहद",
    "Marathi": "मध",
    "Spanish": "Miel",
    "Nepali": "मधु"
  },
  {
    "English": "Natural (Dry)",
    "Hindi": "प्राकृतिक (सूखी)",
    "Marathi": "प्राकृतिक (कोरडी)",
    "Spanish": "Natural (Seco)",
    "Nepali": "प्राकृतिक (खोला)"
  },
  {
    "English": "Wine",
    "Hindi": "शराब",
    "Marathi": "मद्य",
    "Spanish": "Vino",
    "Nepali": "रक्सी"
  },
  {
    "English": "Semi-Washed",
    "Hindi": "आधी धुली हुई",
    "Marathi": "अर्धधुले",
    "Spanish": "Semi-Lavado",
    "Nepali": "अर्धधुल्नुभएको"
  },
  {
    "English": "Full-Washed",
    "Hindi": "पूर्ण धुले हुए",
    "Marathi": "पूर्ण धुवून",
    "Spanish": "Totalmente Lavado",
    "Nepali": "पुरै धुलेको"
  },
  {
  "English": "Completed",
  "Hindi": "पूर्ण",
  "Marathi": "पूर्ण",
  "Spanish": "Completado",
  "Nepali": "पूरा भयो"
  },
  {
  "English": "Parchment Coffee",
  "Hindi": "पार्चमेंट कॉफ़ी",
  "Marathi": "पार्चमेंट कॉफी",
  "Spanish": "Café pergamino",
  "Nepali": "पार्चमेन्ट कफी"
  },
  {
  "English": "Quality Control",
  "Hindi": "गुणवत्ता नियंत्रण",
  "Marathi": "गुणवत्ता नियंत्रण",
  "Spanish": "Control de calidad",
  "Nepali": "गुणस्तर नियन्त्रण"
  },
  {
  "English": "Batch Production",
  "Hindi": "बैच उत्पादन",
  "Marathi": "बैच उत्पादन",
  "Spanish": "Producción en lotes",
  "Nepali": "बैच उत्पादन"
  },
  {
  "English": "Green Beans",
  "Hindi": "हरे बीन्स",
  "Marathi": "हिरव्या बियाणे",
  "Spanish": "Frijoles verdes",
  "Nepali": "हरियो बीन्स"
  },
  {
  "English": "Cupping",
  "Hindi": "कपिंग",
  "Marathi": "कपिंग",
  "Spanish": "Cata",
  "Nepali": "कपिङ"
  }
  
]




module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // console.log(jsonData, "jsonData")

      let langaugeObjects = jsonData.map(el => {
        el.createdAt= moment.utc().format("YYYY-MM-DD HH:mm:ss")
        el.updatedAt= moment.utc().format("YYYY-MM-DD HH:mm:ss")

        return el
      })
      
      // await queryInterface.bulkDelete(
      //   "global_translation_metadata",
      //   {english: currencyList},
      //   {},
      //   {}
      // );

     let rest = await queryInterface.bulkInsert(
        "global_translation_metadata",
        langaugeObjects,
        {},
        {}
      );
      console.log(rest, 'inserted')
    } catch (error) {
      console.log(error)
    }


  },
  down: async (queryInterface, Sequelize) => {

  },
};
