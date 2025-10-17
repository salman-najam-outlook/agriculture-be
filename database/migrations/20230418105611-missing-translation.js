'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const data = [
      {
       "English": "rainy/wet season",
       "Hindi": "बरसात / गीला मौसम",
       "Marathi": "पावसाळी/ओला ऋतू",
       "Spanish": "estación lluviosa/mojada",
       "Indonesian": "musim hujan/basah",
       "Portugese": "estação chuvosa/úmida",
       "Nepali": "वर्षा / ओसिलो मौसम",
       "French": "saison des pluies/humide",
       "Arabic": "موسم الأمطار / الأمطار",
       "Swahili": "msimu wa mvua/mvua",
       "Bengali": "বর্ষা/ভেজা ঋতু",
       "Oromo": "yeroo roobaa/jiidha",
       "Somali": "xilli roobaadka/qoyan",
       "Vietnamese": "mùa mưa / ẩm ướt",
       "Amharic ": "ዝናባማ / እርጥብ ወቅት",
       "Greek": "βροχερή/υγρή περίοδος",
       "Mandarin": "雨季/雨季",
       "Japanese": "雨季・雨季",
       "Turkish": "yağmurlu/ıslak mevsim"
      },
    ]
    for (const row of data) {
      let sql = 'SELECT * FROM global_translation_metadata WHERE english = :english';
      const global_trans = await queryInterface.sequelize.query(sql, { 
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: row.English }
      });

      // update case
      if(global_trans && global_trans.length > 0) {
        let item = {}
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.bulkUpdate('global_translation_metadata', item, { id: global_trans[0].id });
      } 
      // insert case
      else {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.insert(null, 'global_translation_metadata', item);
      }
      
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
