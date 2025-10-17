"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Weevil",
        swahili: "Mdudu",
      },
      {
        english: "Tuber moth",
        swahili: "Tuber nondo",
      },
      {
        english: "Aphids",
        swahili: "Viwangu",
      },
      {
        english: "Whitefly",
        swahili: "Nzi mweupe",
      },
      {
        english: "Sweet Potato Virus disease",
        swahili: "Ugonjwa wa Virusi vya Viazi vitamu",
      },
      {
        english: "Black rot",
        swahili: "Kuoza nyeusi",
      },
      {
        english: "Early blight",
        swahili: "Ugonjwa wa mapema",
      },
      {
        english: "Black scurf",
        swahili: "Scurp nyeusi",
      },
      {
        english: "Potato mosaic virus",
        swahili: "Virusi vya mosaic ya viazi",
      },
      {
        english: "An infested tuber is often riddled with cavities or tunnels.",
        swahili:
          "Kiazi kilichoshambuliwa mara nyingi kimejaa mashimo au vichuguu.",
      },
      {
        english:
          "Thickening and malformation of vines and often cracking of the tissue.",
        swahili:
          "Kunenepa na kuharibika kwa mizabibu na mara nyingi kupasuka kwa tishu.",
      },
      {
        english: "Discoloration, cracking, or wilting of damaged vines.",
        swahili:
          "Kubadilika rangi, kupasuka, au kunyauka kwa mizabibu iliyoharibiwa.",
      },
      {
        english: "It is a pest of field and storage.",
        swahili: "Ni wadudu wa shamba na hifadhi.",
      },
      {
        english: "Larva tunnels into foliage, stem, and tubers.",
        swahili: "Vichuguu vya lava ndani ya majani, shina na mizizi.",
      },
      {
        english: "Galleries are formed near tuber eyes.",
        swahili: "Nyumba za sanaa huundwa karibu na macho ya mizizi.",
      },
      {
        english: "Damage the undersides of leaves by sucking their plant sap.",
        swahili:
          "Huharibu sehemu za chini za majani kwa kunyonya maji ya mmea.",
      },
      {
        english:
          "They damage young and soft parts of plants such as new leaves and shoots.",
        swahili:
          "Huharibu sehemu changa na laini za mimea kama vile majani mapya na machipukizi.",
      },
      {
        english: "Leaves become rolled up and turn pale and gradually dry up.",
        swahili: "Majani yanakunjamana na kugeuka rangi na kukauka taratibu.",
      },
      {
        english: "Development of sooty mold on the plant.",
        swahili: "Maendeleo ya ukungu wa sooty kwenye mmea.",
      },
      {
        english: "Blackening of the leaves that dry and fall off.",
        swahili: "Majani yanayokauka na kuanguka kuwa meusi.",
      },
      {
        english: "Chlorotic spots, yellowing.",
        swahili: "Matangazo ya klorotiki, ya manjano.",
      },
      {
        english: "Stunted vines.",
        swahili: "Mizabibu iliyodumaa.",
      },
      {
        english: "Narrow yellow leaves with deformed edges.",
        swahili: "Majani nyembamba ya manjano na kingo zilizoharibika.",
      },
      {
        english: "Yield reductions in roots.",
        swahili: "Kupungua kwa mazao katika mizizi.",
      },
      {
        english:
          "Symptoms generally are seen at harvest, after curing or after storage.",
        swahili:
          "Dalili kwa ujumla huonekana wakati wa mavuno, baada ya kuponya au baada ya kuhifadhi.",
      },
      {
        english:
          "A dry, firm, dark-colored rot that does not extend into the cortex of the sweet potato root.",
        swahili:
          "Uozo mkavu, thabiti, wa rangi nyeusi ambao hauenei kwenye gamba la mizizi ya viazi vitamu.",
      },
      {
        english:
          "Dark sunken, darkish spots on the roots and the lower parts of the stem.",
        swahili:
          "Madoa meusi yaliyozama kwenye mizizi na sehemu za chini za shina.",
      },
      {
        english: "Necrotic spots observed on lower leaves.",
        swahili: "Matangazo ya necrotic yanaonekana kwenye majani ya chini.",
      },
      {
        english:
          "Discoloring, wilting, and death of foliage and, eventually, the death of the sweet potato vine.",
        swahili:
          "Kubadilika rangi, kunyauka, na kufa kwa majani na, hatimaye, kifo cha mzabibu wa viazi vitamu.",
      },
      {
        english: "It rapidly spreads in high moisture and low temperature.",
        swahili: "Inaenea kwa kasi katika unyevu wa juu na joto la chini.",
      },
      {
        english: "Black specks observed on tubers.",
        swahili: "Madoa meusi yanaonekana kwenye mizizi.",
      },
      {
        english: "Affected plants show drying up.",
        swahili: "Mimea iliyoathiriwa inaonyesha kukauka.",
      },
      {
        english:
          "In infected tubers, at the time of sprouting, black, brown color appears on eyes.",
        swahili:
          "Katika mizizi iliyoambukizwa, wakati wa kuota, rangi nyeusi, kahawia inaonekana kwenye macho.",
      },
      {
        english: "Unhealthy plants with leaf discoloration.",
        swahili: "Mimea isiyo na afya yenye rangi ya majani.",
      },
      {
        english: "Wilting leaves.",
        swahili: "Majani yaliyokauka.",
      },
      {
        english: "Stunted growth.",
        swahili: "Ukuaji uliopungua.",
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
