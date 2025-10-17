'use strict';
const translations = [
  {
    english:"Total Fresh Yield",
    dutch:"Totaal verse opbrengst",
  },
  {
    english:"Total Dry Yield",
    dutch:"Totaal droge opbrengst",
  },
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   // insert translations in the global_translation_metadata
   
    translations.forEach(async (translation) => {
      let sql = "SELECT * FROM global_translation_metadata WHERE english = :english";
      const global = await queryInterface.sequelize.query(sql, { 
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: translation.english }
      });

      if(global && global.length > 0) {
        let item = {};
        for (let key in translation) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = translation[key];
        }
        await queryInterface.bulkUpdate('global_translation_metadata', item, { id: global[0].id });
      } else {
        let item = {};
        for (let key in translation) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = translation[key];
        }
        await queryInterface.insert(null, 'global_translation_metadata', item);
      }
    });
  },

  async down (queryInterface, Sequelize) {
    // remove translations from the global_translation_metadata
    translations.forEach(async (translation) => {
      let sql = "SELECT * FROM global_translation_metadata WHERE english = :english";
      const global = await queryInterface.sequelize.query(sql, { 
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: translation.english }
      });

      if(global && global.length > 0) {
        await queryInterface.bulkDelete('global_translation_metadata', { id: global[0].id });
      }
      
    });
  }
};
