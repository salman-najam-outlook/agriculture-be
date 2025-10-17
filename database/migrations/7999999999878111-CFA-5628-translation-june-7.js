'use strict';
const path = require("path");
const moment = require("moment")

let jsonData = [{
  "English": "Tillering stage",
  "Nepali": "ताकिमी अवस्था",
  "Marathi": "ताकण्याची टप्पी",
  "Spanish": "Etapa de macollamiento",
  "Hindi": "तिल्ली पड़ाव"
},
{
  "English": "Stem elongation",
  "Nepali": "बाँसो लामो हुने अवस्था",
  "Marathi": "कांड्याचे उभार",
  "Spanish": "Elongación del tallo",
  "Hindi": "बांस की वृद्धि"
},
{
  "English": "Panicle initiation",
  "Nepali": "पैनिकल सुरु",
  "Marathi": "शेवटचा अवस्था",
  "Spanish": "Inicio de la panícula",
  "Hindi": "पैनिकल प्रारंभ"
},
{
  "English": "Booting stage",
  "Nepali": "जूत्समाप्",
  "Marathi": "सुरुवातीचा अवस्था",
  "Spanish": "Etapa de brotación",
  "Hindi": "बूटिंग स्टेज"
},
{
  "English": "Flowering stage",
  "Nepali": "फूल खेताप्राप्ति",
  "Marathi": "फुलाची सुरुवात",
  "Spanish": "Etapa de floración",
  "Hindi": "फूलों की स्थिति"
},
{
  "English": "Milking stage",
  "Nepali": "दूध छार्ने अवस्था",
  "Marathi": "दूधाची टप्पी",
  "Spanish": "Etapa de ordeño",
  "Hindi": "दूध छाने का दौर"
},
{
  "English": "Dough stage",
  "Nepali": "डोआ अवस्था",
  "Marathi": "पिठाची टप्पी",
  "Spanish": "Etapa de amasado",
  "Hindi": "डो चरण"
},
{
  "English": "Mature stage",
  "Nepali": "परिपक्व अवस्था",
  "Marathi": "परिपक्व टप्पी",
  "Spanish": "Etapa madura",
  "Hindi": "परिपक्व चरण"
}]



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
