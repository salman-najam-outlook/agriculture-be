'use strict';
const moment = require("moment")
let jsonData = [
  {
    "English": "Increase Crop Health",
    "Hindi": "फसल स्वास्थ्य बढ़ाएँ",
    "Marathi": "पिकांचे आरोग्य वाढवा",
    "Spanish": "Aumente la salud de los cultivos",
    "Indonesian": "Meningkatkan Kesehatan Tanaman",
    "Portugese": "Aumentar a Saúde da Colheita",
    "Nepali": "बाली स्वास्थ्य बढाउनुहोस्",
    "French": "Augmenter la santé des cultures",
    "Arabic": "زيادة صحة المحاصيل",
    "Swahili": "Kuongeza Afya ya Mazao",
    "Bengali": "ফসলের স্বাস্থ্য বাড়ান",
    "Oromo": "Fayyaa Midhaanii Dabaluu",
    "Somali": "Kordhi Caafimaadka Dalagga",
    "Vietnamese": "Tăng sức khỏe cây trồng",
    "Amharic": "የሰብል ጤናን ይጨምሩ",
    "Greek": "Αύξηση της υγείας των καλλιεργειών",
    "Mandarin": "增加作物健康",
    "Japanese": "作物の健康を高める",
    "Turkish": "Mahsul Sağlığını Artırın"
   },
]
module.exports = {
  async up (queryInterface, Sequelize) {
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
