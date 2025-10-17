"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Aphids",
        swahili: "Viwangu",
      },
      {
        english: "Curculios beetle",
        swahili: "Mende ya Curculios",
      },
      {
        english: "Rose scale insects",
        swahili: "Wadudu wadogo wa rose",
      },
      {
        english: "Rose chaffer beetle",
        swahili: "Mende wa rose",
      },
      {
        english: "Powdery mildew",
        swahili: "Koga ya unga",
      },
      {
        english: "Black spot",
        swahili: "Doa nyeusi",
      },
      {
        english: "Rose mosaic virus",
        swahili: "Virusi vya Rose mosaic",
      },
      {
        english: "Crown gall",
        swahili: "Uchungu wa taji",
      },
      {
        english: "Distorted flower buds and leaves.",
        swahili: "Matawi ya maua yaliyopotoka na majani.",
      },
      {
        english: "Sticky honeydew substance that is secreted by the aphids.",
        swahili: "Dutu inayonata ya asali ambayo hutolewa na aphids.",
      },
      {
        english: "Black sooty mold growing on the honeydew.",
        swahili: "Ukungu mweusi unaokua kwenye umande wa asali.",
      },
      {
        english: "Rose curculios are reddish-brown weevils with dark spots.",
        swahili: "Rose curculios ni weevils nyekundu-kahawia na madoa meusi.",
      },
      {
        english:
          "Adult rose curculios feed on the flower buds, poking their long snouts inside.",
        swahili:
          "Mimea ya waridi ya watu wazima hula kwenye machipukizi ya maua, wakiingiza pua zao ndani.",
      },
      {
        english: "If the flowers open, they will be full of ragged holes.",
        swahili: "Ikiwa maua yatafunguka, yatajaa mashimo chakavu.",
      },
      {
        english:
          "Mainly found on the stems and branches of the plant, lack of control will allow the pest to spread to flower stalks and petioles.",
        swahili:
          "Hasa hupatikana kwenye shina na matawi ya mmea, ukosefu wa udhibiti utaruhusu wadudu kuenea kwa mabua ya maua na petioles.",
      },
      {
        english:
          "Plants would be stunted, spindly, and with a white, flaky crust of scales on the bark.",
        swahili:
          "Mimea ingekuwa imedumaa, inasokota, na yenye ukoko mweupe, uliofifia wa magamba kwenye gome.",
      },
      {
        english: "Turn yellow and die back.",
        swahili: "Geuka njano na ufe nyuma.",
      },
      {
        english:
          "They have a voracious appetite and can quickly skeletonize leaves, leaving only the veins behind.",
        swahili:
          "Wana hamu ya kula na wanaweza kuweka mifupa haraka kwenye majani, na kuacha mishipa tu.",
      },
      {
        english:
          "Create holes in the fruits, making them less attractive and reducing seed viability.",
        swahili:
          "Tengeneza mashimo kwenye matunda, na kuyafanya yasiwe ya kuvutia na kupunguza uwezo wa mbegu.",
      },
      {
        english:
          "They can consume the petals and damage the blooms, reducing the aesthetic value of the roses.",
        swahili:
          "Wanaweza kutumia petals na kuharibu maua, na kupunguza thamani ya uzuri wa waridi.",
      },
      {
        english: "White powdery growth is visible on the plant.",
        swahili: "Ukuaji wa unga mweupe unaonekana kwenye mmea.",
      },
      {
        english: "Infected leaves turn purplish and drop.",
        swahili:
          "Majani yaliyoambukizwa hugeuka rangi ya zambarau na kuanguka.",
      },
      {
        english: "Flower buds may fail to open.",
        swahili: "Buds za maua zinaweza kushindwa kufunguka.",
      },
      {
        english:
          "Conspicuous circular black spots with fringed margins appear on either side of leaves.",
        swahili:
          "Madoa meusi ya duara yanayoonekana na pembezoni yanaonekana kila upande wa majani.",
      },
      {
        english: "Leaves become chlorotic.",
        swahili: "Majani huwa chlorotic.",
      },
      {
        english: "Leaves dry up and drop prematurely.",
        swahili: "Majani hukauka na kushuka kabla ya wakati.",
      },
      {
        english:
          "Yellowing in a mosaic pattern. Chlorotic (yellow) rings or wavy lines (which can look similar to leaf miner damage).",
        swahili:
          "Njano katika muundo wa mosai. Pete za klorotiki (njano) au mistari ya wavy (ambayo inaweza kuonekana sawa na uharibifu wa mchimbaji wa majani)",
      },
      {
        english: "Yellowing of the veins.",
        swahili: "Njano ya mishipa.",
      },
      {
        english: "Mottled flower color.",
        swahili: "Rangi ya maua ya mottled.",
      },
      {
        english: "New crown galls are usually pale colored and somewhat round.",
        swahili:
          "Nyungo mpya za taji kawaida huwa na rangi isiyo na rangi na pande zote.",
      },
      {
        english:
          "As they enlarge, they become rough, irregularly shaped, and hard.",
        swahili:
          "Wanapokua, huwa mbaya, wenye umbo lisilo la kawaida, na ngumu.",
      },
      {
        english:
          "Crown gall can easily be confused with the graft union, but the graft union will not continue to grow larger.",
        swahili:
          "Uchungu wa taji unaweza kuchanganyikiwa kwa urahisi na muungano wa ufisadi, lakini muungano wa ufisadi hautaendelea kukua zaidi.",
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
