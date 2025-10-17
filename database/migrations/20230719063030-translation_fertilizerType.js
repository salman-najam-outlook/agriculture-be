"use strict";

const data = [
  {
    English: "Organic",
    Hindi: "कार्बनिक",
    Marathi: "सास्थायी",
    Spanish: "Orgánico",
    Indonesian: "Organik",
    Portugese: "Orgânico",
    Nepali: "जैविक",
    French: "BIO",
    Arabic: "عضوي",
    Swahili: "Kikaboni",
    Bengali: "জৈব",
    Oromo: "Organic kan jedhu",
    Somali: "Nafaqada",
    Vietnamese: "Hữu cơ",
    Amharic: "የተሻለ",
    Greek: "Οργανική",
    Mandarin: "有机肥",
    Japanese: "有機",
    Turkish: "Organik",
  },
  {
    English: "Synthetic",
    Hindi: "कृत्रिम",
    Marathi: "सिंथेटिक",
    Spanish: "Sintético",
    Indonesian: "Sintetik",
    Portugese: "Sintético",
    Nepali: "सिंथेटिक",
    French: "Synthétique",
    Arabic: "اصطناعي",
    Swahili: "Kikemia",
    Bengali: "সিনথেটিক",
    Oromo: "Synteetik",
    Somali: "Abaar",
    Vietnamese: "Tổng hợp",
    Amharic: "ስነጥበባችሁ",
    Greek: "Συνθετική",
    Mandarin: "合成肥",
    Japanese: "合成",
    Turkish: "Sentetik",
  },
  {
    English: "Soil",
    Hindi: "मिट्टी",
    Marathi: "माती",
    Spanish: "Suelo",
    Indonesian: "Tanah",
    Portugese: "Solo",
    Nepali: "माटो",
    French: "Sol",
    Arabic: "تربة",
    Swahili: "Udongo",
    Bengali: "মাটি",
    Oromo: "Sitti",
    Somali: "Dhirta",
    Vietnamese: "Đất",
    Amharic: "ተንሸራታችሁ",
    Greek: "Έδαφος",
    Mandarin: "土壤",
    Japanese: "土壌",
    Turkish: "Toprak",
  },
  {
    English: "Foliar Fertilization",
    Hindi: "पर्ण निषेचन",
    Marathi: "पर्णासंबंधी फर्टिलायझेशन",
    Spanish: "Fertilización foliar",
    Indonesian: "Foliar Pemupukan",
    Portugese: "Fertilização foliar",
    Nepali: "पत्ते उर्वरण",
    French: "Fertilisation foliaire",
    Arabic: "تسميد ورقي",
    Swahili: "Urutubishaji wa Majani",
    Bengali: "পত্রিতে খাদ",
    Oromo: "Falyari",
    Somali: "Falyari",
    Vietnamese: "Lá",
    Amharic: "ፎሊያል እይታ",
    Greek: "Φυλλική Λίπανση",
    Mandarin: "叶面施肥",
    Japanese: "葉面散布",
    Turkish: "Foliar Gübreleme",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
