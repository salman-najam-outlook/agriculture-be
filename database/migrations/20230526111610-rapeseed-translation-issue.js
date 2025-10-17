'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        "English": "Rapeseed",
        "Hindi": "रेपसीड",
        "Marathi": "रेपसीड",
        "Spanish": "Colas",
        "Indonesian": "Rapeseed",
        "Portugese": "Colza",
        "Nepali": "रेपसीड",
        "French": "En colza",
        "Arabic": "بذور اللفت",
        "Swahili": "रेपसीड",
        "Bengali": "র‌্যাপিড",
        "Oromo": "",
        "Somali": "Kupsemated",
        "Vietnamese": "Hạt cải dầu",
        "Amharic": "ሰልፍ",
        "Greek": "Κραδαίος",
        "Mandarin": "菜籽",
        "Japanese": "菜種",
        "Turkish": "Kolza tohumu"
      },
      {
        "English": "Rapeseed ( European Union )",
        "Hindi": "रेपसीड (यूरोपीय संघ)",
        "Marathi": "रेपसीड (युरोपियन युनियन)",
        "Spanish": "Colza (Unión Europea)",
        "Indonesian": "Rapeseed (Uni Eropa)",
        "Portugese": "Colza (União Europeia)",
        "Nepali": "रेपसीड (युरोपेली संघ)",
        "French": "Pançais (Union européenne)",
        "Arabic": "بذور اللفت (الاتحاد الأوروبي)",
        "Swahili": "रेपसीड (यूरोपीय संघ)",
        "Bengali": "র‌্যাপিড (ইউরোপীয় ইউনিয়ন)",
        "Oromo": "",
        "Somali": "Rapsemated (Midowga Yurub)",
        "Vietnamese": "Hạt cải dầu (Liên minh châu Âu)",
        "Amharic": "(የአውሮፓ ህብረት)",
        "Greek": "Κρατήστε (Ευρωπαϊκή Ένωση)",
        "Mandarin": "Rapeseed（欧盟）",
        "Japanese": "菜種（欧州連合）",
        "Turkish": "Atılım (Avrupa Birliği)"
      },
      {
        "English": "Rapeseed (China)",
        "Hindi": "रेपसीड (चीन)",
        "Marathi": "रेपसीड (चीन)",
        "Spanish": "Colza (China)",
        "Indonesian": "Rapeseed (Cina)",
        "Portugese": "Colza (China)",
        "Nepali": "रेपसीड (चीन)",
        "French": "Pançais (Chine)",
        "Arabic": "بذور بذور (الصين)",
        "Swahili": "रेपसीड (चीन)",
        "Bengali": "রেপসিড (চীন)",
        "Oromo": "",
        "Somali": "Kupsemated (china)",
        "Vietnamese": "Redsed (Trung Quốc)",
        "Amharic": "ሰረቀ (ቻይና)",
        "Greek": "Κρατήστε (Κίνα)",
        "Mandarin": "Rapeseed（中国）",
        "Japanese": "菜種（中国）",
        "Turkish": "Atılım (Çin)"
      },
      {
        "English": "Rapeseed (Canada)",
        "Hindi": "रेपसीड (कनाडा)",
        "Marathi": "रेपसीड (कॅनडा)",
        "Spanish": "Colza (Canadá)",
        "Indonesian": "Rapeseed (Kanada)",
        "Portugese": "Colza (Canadá)",
        "Nepali": "रेपसीड (क्यानाडा)",
        "French": "Rappeed (Canada)",
        "Arabic": "بذور بذور (كندا)",
        "Swahili": "रेपसीड (कनाडा)",
        "Bengali": "রেপসিড (কানাডা)",
        "Oromo": "",
        "Somali": "Rapsemated (Kanada)",
        "Vietnamese": "Redsed (Canada)",
        "Amharic": "የተሰነጠቀ (ካናዳ)",
        "Greek": "Κρατσάη (Καναδάς)",
        "Mandarin": "Rapeseed（加拿大）",
        "Japanese": "菜種（カナダ）",
        "Turkish": "Kolza tohumu (Kanada)"
      },
      {
        "English": "Rapeseed (India)",
        "Hindi": "रेपसीड (भारत)",
        "Marathi": "रेपसीड (भारत)",
        "Spanish": "Colza (India)",
        "Indonesian": "Rapeseed (India)",
        "Portugese": "Colza (Índia)",
        "Nepali": "रेपसीड (भारत)",
        "French": "Rappeed (Inde)",
        "Arabic": "بذور اللفت (الهند)",
        "Swahili": "रेपसीड (भारत)",
        "Bengali": "র‌্যাপিড (ভারত)",
        "Oromo": "",
        "Somali": "Rapsemated (India)",
        "Vietnamese": "Redsed (Ấn Độ)",
        "Amharic": "ተሽሯል (ህንድ)",
        "Greek": "Κρατήστε (Ινδία)",
        "Mandarin": "Rapeseed（印度）",
        "Japanese": "菜種（インド）",
        "Turkish": "Sermaye (Hindistan)"
      }
     ];
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
