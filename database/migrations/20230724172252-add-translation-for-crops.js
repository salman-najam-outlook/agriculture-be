'use strict';

const langArr = [
  {
    english: "Plant row spacing (field crop: cm, Tree crop: m)",
    swahili: "Umbali wa safu ya mimea (mazao ya shamba: cm, mazao ya miti: m)",
  },
  {
    english: "Planting pit size (length x breadth x depth) (m)\n(Tree crop only)",
    swahili: "Ukubwa wa shimo la kupanda (urefu x upana x kina) (m) (Maua ya miti pekee)",
  },
  {
    english: "Date and stage of irrigation  (can be >1)",
    swahili: "Tarehe na hatua ya umwagiliaji (inaweza kuwa >1)",
  },
  {
    english: "Phosphorus fertilizer rate (Field crops: kg P2O5/ha, Tree crops: g P2O5/tree/year)",
    swahili: "Kiwango cha mbolea ya fosforasi (Mazao ya shamba: kg P2O5/ha, Mazao ya miti: g P2O5/mche/mwaka)",
  },
  {
    english: "Potassium fertilizer rate (Field crops: kg K2O/ha, Tree crops: kg K2O/tree/year)",
    swahili: "Kiwango cha mbolea ya potasiamu (Mazao ya shambani: kg K2O/ha, Mazao ya miti: kg K2O/kila mti/mwaka)",
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      for (const obj in langArr) {
        await queryInterface.sequelize.query(`UPDATE CropRecommendationModuleAttributes SET swahili = '${obj.swahili}' WHERE name = '${obj.english}';`);
      }
    } catch (err) {
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
  }
};