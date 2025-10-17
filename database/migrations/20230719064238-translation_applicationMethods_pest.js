'use strict';

const data = [
  {
    "english": "Hydraulic nozzles/sprayers",
    "swahili": "Vipu vya majimaji/vinyunyuziaji"
  },
  {
    "english": "Electrostatically charged sprayers",
    "swahili": "Vinyunyiziaji vinavyochajiwa na umeme"
  },
  {
    "english": "Aerial spraying",
    "swahili": "Kunyunyizia angani"
  },
  {
    "english": "Fumigation",
    "swahili": "Kufukiza"
  },
  {
    "english": "Days after sowing when pest was detected",
    "swahili": "Siku baada ya kupanda wakati wadudu waligunduliwa"
  },
  {
    "english": "Germination",
    "swahili": "Kuota"
  },
  {
    "english": "Three leaf stage",
    "swahili": "Hatua tatu za majani"
  },
  {
    "english": "Stem elongation",
    "swahili": "Urefu wa shina"
  },
  {
    "english": "Tillering",
    "swahili": "Kulima"
  },
  {
    "english": "Flag leaf",
    "swahili": "Jani la bendera"
  },
  {
    "english": "Branching",
    "swahili": "Kuweka matawi"
  },
  {
    "english": "Bulb initiation",
    "swahili": "Kuanzishwa kwa balbu"
  },
  {
    "english": "Bulb formation",
    "swahili": "Uundaji wa balbu"
  },
  {
    "english": "Budding",
    "swahili": "Chipukizi"
  },
  {
    "english": "Flowering",
    "swahili": "Maua"
  },
  {
    "english": "Grain filling",
    "swahili": "Kujaza nafaka"
  },
  {
    "english": "Ripening/maturity",
    "swahili": "Kukomaa/kukomaa"
  },
  {
    "english": "Cultural/Natural",
    "swahili": "Utamaduni/Asili"
  },
  {
    "english": "Chemical",
    "swahili": "Kemikali"
  },
  {
    "english": "None",
    "swahili": "Hakuna"
  },
  {
    "english": "Deep ploughing",
    "swahili": "Kulima kwa kina"
  },
  {
    "english": "Natural enemies/parasitism",
    "swahili": "Maadui wa asili/vimelea"
  },
  {
    "english": "Push and pull",
    "swahili": "Kusukuma na kuvuta"
  },
  {
    "english": "Ash and chilli",
    "swahili": "Majivu na pilipili"
  },
  {
    "english": "Plant extracts",
    "swahili": "Dondoo za mimea"
  },
  {
    "english": "Weeding",
    "swahili": "Kupalilia"
  },
  {
    "english": "Use of mesh",
    "swahili": "Matumizi ya mesh"
  },
  {
    "english": "Uprooting of infested plants by hand",
    "swahili": "Kung'oa mimea iliyoshambuliwa kwa mikono"
  },
  {
    "english": "Traps and bagging",
    "swahili": "Mitego na mifuko"
  },
  {
    "english": "Bio pesticides",
    "swahili": "Dawa za wadudu"
  },
  {
    "english": "Bio fumigation",
    "swahili": "Ufukizo wa kibiolojia"
  },
  {
    "english": "Scarecrows",
    "swahili": "Scarecrows"
  },
  {
    "english": "Tillage",
    "swahili": "Kulima"
  },
  {
    "english": "Pruning",
    "swahili": "Kupogoa"
  },
  {
    "english": "Hand picking of pests",
    "swahili": "Kuokota wadudu kwa mikono"
  },
  {
    "english": "Leaves",
    "swahili": "Majani"
  },
  {
    "english": "Stem",
    "swahili": "Shina"
  },
  {
    "english": "Grain",
    "swahili": "Nafaka"
  },
  {
    "english": "Tuber",
    "swahili": "Tuber"
  },
  {
    "english": "Bulb",
    "swahili": "Balbu"
  },
  {
    "english": "Fruit",
    "swahili": "Matunda"
  },
  {
    "english": "Roots",
    "swahili": "Mizizi"
  },
  {
    "english": "Flowers",
    "swahili": "Maua"
  },
  {
    "english": "Cultural/Mechanical/Biological",
    "swahili": "Kiutamaduni/Mitambo/Kibaolojia"
  },
  {
    "english": "chemical",
    "swahili": "kemikali"
  },
  {
    "english": "Remove diseased plant",
    "swahili": "Ondoa mmea wenye ugonjwa"
  },
  {
    "english": "Mulching",
    "swahili": "Kutandaza"
  },
  {
    "english": "Crop rotation",
    "swahili": "Mzunguko wa mazao"
  },
  {
    "english": "Planting resistant cultivars",
    "swahili": "Kupanda mimea sugu"
  },
  {
    "english": "Use of oils and soaps",
    "swahili": "Matumizi ya mafuta na sabuni"
  },
  {
    "english": "Use of bio fumigants",
    "swahili": "Matumizi ya vifukizo vya kibayolojia"
  },
  {
    "english": "Others",
    "swahili": "Wengine"
  }
]


module.exports = {
  async up (queryInterface, Sequelize) {
    for (const row of data) {
      let sql =
        "SELECT * FROM global_translation_metadata WHERE english = :english";
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
          id: global_trans?.map(item => item.id)
        });
      }
      // insert case
      else {
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
