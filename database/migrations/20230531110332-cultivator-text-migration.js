'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        "English": "cultivator",
        "Hindi": "खेतिहर",
        "Marathi": "लागवड करणारा",
        "Spanish": "cultivador",
        "Indonesian": "petani",
        "Portugese": "cultivador",
        "Nepali": "चाकर",
        "French": "cultivateur",
        "Arabic": "المزارع",
        "Swahili": "खेतिहर",
        "Bengali": "কৃষক",
        "Oromo": "",
        "Somali": "beer-Garmis",
        "Vietnamese": "người trồng trọt",
        "Amharic": "ገበሬ",
        "Greek": "καλλιεργητής",
        "Mandarin": "中耕者",
        "Japanese": "耕運機",
        "Turkish": "kurutucu"
      },
      {
        "English": "unmapped",
        "Hindi": "तुच्छ",
        "Marathi": "अनपॅप केलेले",
        "Spanish": "sin mapeado",
        "Indonesian": "belum terpetakan",
        "Portugese": "não mapeado",
        "Nepali": "म्याप नगरिएको",
        "French": "non cartographié",
        "Arabic": "غير محفور",
        "Swahili": "तुच्छ",
        "Bengali": "আনম্যাপড",
        "Oromo": "",
        "Somali": "aan la soo koobi karin",
        "Vietnamese": "Unlaps",
        "Amharic": "አልተለወጠም",
        "Greek": "άκαμπτος",
        "Mandarin": "未铺装",
        "Japanese": "マップされていない",
        "Turkish": "kesilmemiş"
      }
     ]
    let count = 0;
    for (const row of data) {
      let sql = 'SELECT * FROM global_translation_metadata WHERE english = :english';
      const global_trans = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: row.English }
      });

      // update case
      if (global_trans && global_trans.length > 0) {
        for (const gTrans of global_trans) {
          let item = {}
          for (let key in row) {
            const language = key.toLocaleLowerCase().trim();
            if (row[key]) {
              item[language] = row[key];
            }
          }
          await queryInterface.bulkUpdate('global_translation_metadata', item, { id: gTrans.id });
          count++;
        }
      }
      // insert case
      else {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.insert(null, 'global_translation_metadata', item);
        count++;
      }

    }
    console.log('Records: ', count);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
