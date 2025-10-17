"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Cutworms",
        swahili: "Minyoo",
      },
      {
        english: "African Armyworm",
        swahili: "Mdudu wa Jeshi la Kiafrika",
      },
      {
        english: "Bean Aphid",
        swahili: "Aphid ya Maharage",
      },
      {
        english: "Crown and Root Aphids",
        swahili: "Crown na Aphids ya Mizizi",
      },
      {
        english: "Cutworms feed on the roots.",
        swahili: "Minyoo hula kwenye mizizi.",
      },
      {
        english: "Causing small and large superficial holes.",
        swahili: "Kusababisha mashimo madogo na makubwa ya juu juu.",
      },
      {
        english: "Completely eat the leaves.",
        swahili: "Kula majani kabisa.",
      },
      {
        english:
          "The African army indirectly injures the carrot crop by destroying the stem or foliage. The crop cannot produce enough food when foliage is destroyed, reducing yields.",
        swahili:
          "Jeshi la Kiafrika linajeruhi zao la karoti kwa njia isiyo ya moja kwa moja kwa kuharibu shina au majani. Mazao hayawezi kutoa chakula cha kutosha wakati majani yanaharibiwa, na hivyo kupunguza mavuno.",
      },
      {
        english: "The African armyworm is also known as a caterpillar.",
        swahili: "Kiwavi wa Kiafrika pia anajulikana kama kiwavi.",
      },
      {
        english:
          "When the caterpillars are 3 cm long, they could have already caused massive losses.",
        swahili:
          "Wakati viwavi wana urefu wa sentimita 3, wanaweza kuwa tayari wamesababisha hasara kubwa.",
      },
      {
        english:
          "Bean aphid may transmit celery mosaic but little is known in this regard.",
        swahili:
          "Aphid ya maharagwe inaweza kusambaza celery mosaic lakini kidogo inajulikana katika suala hili.",
      },
      {
        english: "Bean aphid only occasionally builds up on carrots.",
        swahili:
          "Vidukari wa maharagwe mara kwa mara hujilimbikiza kwenye karoti.",
      },
      {
        english: "It is known regarding economic thresholds and damage.",
        swahili: "Inajulikana kuhusu vizingiti vya kiuchumi na uharibifu.",
      },
      {
        english:
          "These aphids occur infrequently and only occasionally cause injury.",
        swahili:
          "Vidukari hawa hutokea mara kwa mara na mara kwa mara husababisha majeraha.",
      },
      {
        english: "High populations may stunt growth.",
        swahili: "Idadi kubwa inaweza kudumaza ukuaji.",
      },
      {
        english:
          "It is more serious that the tops may be weakened by their feeding and break off during harvest, leaving the carrot in the ground.",
        swahili:
          "Ni mbaya zaidi kwamba vilele vinaweza kudhoofishwa na ulishaji wao na kuvunjika wakati wa mavuno, na kuacha karoti ardhini.",
      },
      {
        english: "Bacterial soft rot",
        swahili: "Kuoza laini kwa bakteria",
      },
      {
        english: "Powdery mildew",
        swahili: "Koga ya unga",
      },
      {
        english: "Leaf blight",
        swahili: "Uvimbe wa majani",
      },
      {
        english:
          "The disease generally appears as a soft, watery, and slimy decay of the taproot. The decay rapidly consumes the core of the carrot, often leaving the epidermis/peel intact.",
        swahili:
          "Ugonjwa huu kwa ujumla huonekana kama uozo laini, wa maji, na utelezi wa mzizi. Uozo huu hutumia kwa haraka kiini cha karoti, mara nyingi huacha epidermis/ganda likiwa sawa.",
      },
      {
        english:
          "Rotted tissues retain their natural color until they completely decay. The infected carrot is not fit for consumption and unsellable.",
        swahili:
          "Tishu zilizooza huhifadhi rangi yao ya asili hadi kuoza kabisa. Karoti iliyoambukizwa haifai kwa matumizi na haiwezi kuuzwa.",
      },
      {
        english: "A foul odor may be associated with soft rot.",
        swahili: "Harufu mbaya inaweza kuhusishwa na kuoza laini.",
      },
      {
        english: "Whitish powdery growth on the undersurface of the leaves.",
        swahili: "Ukuaji mweupe wa unga kwenye sehemu ya chini ya majani.",
      },
      {
        english:
          "As the disease progresses, powdery spots appear on both surfaces of the leaves and on stems.",
        swahili:
          "Wakati ugonjwa unavyoendelea, matangazo ya unga huonekana kwenye nyuso zote za majani na kwenye shina.",
      },
      {
        english:
          "Under severe disease pressure, the leaves turn brown, twisted, and brittle before shriveling and dying.",
        swahili:
          "Chini ya shinikizo kali la ugonjwa, majani hubadilika kuwa kahawia, kukunjamana, na kukauka kabla ya kusinyaa na kufa.",
      },
      {
        english: "Older leaves are attacked first.",
        swahili: "Majani ya zamani yanashambuliwa kwanza.",
      },
      {
        english:
          "Dark grey to brown spots, angular, with yellow margins, occur on the leaves and petioles.",
        swahili:
          "Madoa ya kijivu giza hadi kahawia, angular, na pembe za njano, hutokea kwenye majani na petioles.",
      },
      {
        english:
          "Under favorable conditions, the spots merge and the leaves rapidly blacken, wither, and die.",
        swahili:
          "Chini ya hali nzuri, madoa huungana na majani huwa meusi haraka, hunyauka na kufa.",
      },
    ];
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
          id: global_trans?.map((item) => item.id),
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
