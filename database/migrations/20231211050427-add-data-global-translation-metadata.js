'use strict';

const moment = require("moment");

const lagnuageObject = [
  {
    english: "Crop Land",
    hindi:"फसल भूमि",
    marathi: "पीक जमीन",
    nepali: "बाली जमिन",
    spanish: "Tierra de cultivo",
    indonesian: "Lahan Tanaman",
    arabic: "أرض المحاصيل",
    portugese: "Terra de colheita",
    french: "Terres cultivées",
    swahili: "Ardhi ya Mazao",
    bengali: "ফসলি জমি",
    oromo: "Lafa Midhaanii",
    somali: "Dhul-beereedka",
    amharic: "የሰብል መሬት",
    vietnamese: "Đất trồng trọt",
    turkish: "Mahsul Arazisi",
    mandarin: "农田",
    greek: "Καλλιέργεια Γη",
    japanese:"耕作地",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    english: "Planted Forest",
    hindi:"रोपित वन",
    marathi: "लावलेले जंगल",
    nepali: "रोपिएको वन",
    spanish: "bosque plantado",
    indonesian: "Hutan yang Ditanam",
    arabic: "غابة مزروعة",
    portugese: "Floresta Plantada",
    french: "Forêt plantée",
    swahili: "Msitu uliopandwa",
    bengali: "লাগানো বন",
    oromo: "Bosona Dhaabbate",
    somali: "Kaymaha la beeray",
    amharic: "የተከለው ጫካ",
    vietnamese: "Rừng trồng",
    turkish: "Ekili Orman",
    mandarin: "人工林",
    greek: "Φυτευμένο δάσος",
    japanese:"人工林",
    createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "global_translation_metadata",
        lagnuageObject,
        {},
        {}
      );
    } catch (err) {
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    for (const obj of lagnuageObject) {
      await queryInterface.bulkDelete(
        "global_translation_metadata",
        { english: lagnuageObject[obj].english },
        {},
        {}
      );
    }
  }
};
