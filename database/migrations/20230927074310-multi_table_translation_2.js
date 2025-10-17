'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Onion Thrips",
        arabic: "تربس البصل"
      },
      {
        english: "Eriophyid mite",
        arabic: "عثة إيريوفيد"
      },
      {
        english: "Onion Maggot",
        arabic: "ديدان البصل"
      },
      {
        english: "Earwig",
        arabic: "المدردر"
      },
      {
        english: "Red spider mites",
        arabic: "عث العنكبوت الأحمر"
      },
      {
        english: "Bulb mite",
        arabic: "عثة البصل"
      },
      {
        english: "Tea mites and spider mites",
        arabic: "عث الشاي وعث العنكبوت"
      },
      {
        english: "Tea Cutworms",
        arabic: "دودة شاي"
      },
      {
        english: "Tea Crickets",
        arabic: "جراد الشاي"
      },
      {
        english: "Tea mosquito bug",
        arabic: "بق الشاي"
      },
      {
        english: "Tea Aphids",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Tea Termites",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Tea Black tea thrips",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Tea Scales",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Tea Nematodes",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Alfalfa Looper",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Alfalfa Aphid",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Armyworm",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Cutworms",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "False Chinch Bug",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Alfalfa Caterpillar",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Blister Beetles",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Clover Root Curculio",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Grasshoppers",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Weevil",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "White Grub",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Shoot fly",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Grasshopper",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Termites",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Grey Weevil",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Ear Head Bug",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Stem borer",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "White Grub",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Pyrilla",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Whiteflies",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Wooly aphid",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Internode borer",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Pseudostem weevil",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Aphids",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Nematode",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Thrips",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Aphids",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Armyworms",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Greenflies",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Slugs",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Thrips",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Mites",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Aphids",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Pod borer",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Brown citrus aphid",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Citrus leaf miner",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Thrips",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Citricolla scale or soft scales",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Citrus psyllid",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Leaf miner",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Pod borer",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Stem fly",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Black aphids",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Aphids",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Asian citrus psyllid",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Leaf miner",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Thrips",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Eriophyid mite",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Red spider mites",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Garlic cutworm",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Mealy bug",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Rhinoceros beetle",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Rodents",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Cabbage diamondback moth",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Leaf webber",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Cabbage borer",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Cabbage butterfly",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Stem borer",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Fall armyworm",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Shoot fly",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Ear head bug",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Stem borer",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Rice hispa",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Leaf folder",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Plant hopper",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Bugs",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Mole cricket and ground cricket",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Stem fly",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "Pod borer",
        arabic: "ترجمة باللغة العربية"
      },
      {
        english: "White fly",
        arabic: "ذبابة بيضاء"
      },
      {
        english: "Armyworm",
        arabic: "دودة الجيش"
      },
      {
        english: "Hairy caterpillar",
        arabic: "يرقة شعرية"
      },
      {
        english: "Aphid",
        arabic: "من ثنى"
      },
      {
        english: "Termites",
        arabic: "النمل الأبيض"
      },
      {
        english: "Pink stem borer",
        arabic: "دودة الساق الوردية"
      },
      {
        english: "Armyworm",
        arabic: "دودة الجيش"
      }
    ]
    


    for (const row of data) {
      let sql = "SELECT * FROM global_translation_metadata WHERE english = :english";
      const global_trans = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: row.english },
      });

      // update case
      if (global_trans && global_trans.length > 0) {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.bulkUpdate("global_translation_metadata", item, {
          id: global_trans?.map((item) => item.id),
        });
      } else {
        // Insert Case
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.insert(null, "global_translation_metadata", item);
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
