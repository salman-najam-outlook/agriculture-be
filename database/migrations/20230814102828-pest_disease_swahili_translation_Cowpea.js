"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Pod borers",
        swahili: "Vipekecha ganda",
      },
      {
        english: "Armyworms",
        swahili: "Minyoo ya jeshi",
      },
      {
        english: "Root knot nematodes",
        swahili: "Nematodes ya fundo la mizizi",
      },
      {
        english: "Flower thrips",
        swahili: "Vidonda vya maua",
      },
      {
        english: "Bacterial blight",
        swahili: "Ugonjwa wa bakteria",
      },
      {
        english: "Cowpea mosaic",
        swahili: "Mosaic ya kunde",
      },
      {
        english: "Powdery mildew",
        swahili: "Koga ya unga",
      },
      {
        english: "Anthracnose",
        swahili: "Anthracnose",
      },
      {
        english: "Macrophomina root rot",
        swahili: "Kuoza kwa mizizi ya macrophomina",
      },
      {
        english: "Bore holes on the buds, flower or pods.",
        swahili: "Kutoboa mashimo kwenye buds, maua au maganda.",
      },
      {
        english: "Infested pods and flowers are webbed together.",
        swahili: "Maganda na maua yaliyoshambuliwa yameunganishwa pamoja.",
      },
      {
        english:
          "Defoliation in early stages & later feed on seed larvae thrust head inside the pods and the rest of the body hanging out & make round holes.",
        swahili:
          "Kukauka kwa majani katika hatua za awali na baadaye kulisha mabuu ya mbegu na kusukuma kichwa ndani ya maganda na sehemu nyingine ya mwili kuning'inia na kutengeneza mashimo ya duara.",
      },
      {
        english:
          "Damage by the worms comprises singular or grouped shaped holes on the leaves of infested plants.",
        swahili:
          "Uharibifu wa minyoo hujumuisha mashimo ya umbo la umoja au makundi kwenye majani ya mimea iliyoshambuliwa.",
      },
      {
        english: "Under heavy infestations, windowing of leaves is observed.",
        swahili:
          "Chini ya mashambulizi makubwa, madirisha ya majani huzingatiwa.",
      },
      {
        english:
          "Egg clusters appear as cottony or fuzzy substance on the leaf surface.",
        swahili:
          "Vikundi vya mayai huonekana kama kitu cha pamba au chepesi kwenye uso wa jani.",
      },
      {
        english: "They usually appear sporadically within a cowpea field.",
        swahili:
          "Kwa kawaida huonekana mara kwa mara ndani ya shamba la kunde.",
      },
      {
        english:
          "Symptoms include stunting, yellowing, wilting, and formation of galls on host roots. Infected plants occur in patches in the field.",
        swahili:
          "Dalili ni pamoja na kudumaa, kuwa na rangi ya njano, kunyauka, na kutengeneza nyongo kwenye mizizi inayoishi. Mimea iliyoambukizwa hutokea kwenye mabaka shambani.",
      },
      {
        english:
          "Infected roots become knotty; in severely infected plants, the root system is reduced, and the rootlets are almost completely absent.",
        swahili:
          "Mizizi iliyoambukizwa huwa na mafundo; katika mimea iliyoambukizwa sana, mfumo wa mizizi hupunguzwa, na mizizi haipo kabisa.",
      },
      {
        english:
          "Damage is prominent on petioles, leaves, and flowers that are heavily infested.",
        swahili:
          "Uharibifu ni maarufu kwenye petioles, majani, na maua ambayo yameathiriwa sana.",
      },
      {
        english:
          "Damaged petioles and leaves have tiny holes surrounded by discolored areas.",
        swahili:
          "Petioles na majani yaliyoharibiwa yana mashimo madogo yaliyozungukwa na maeneo yenye rangi.",
      },
      {
        english: "Infested flowers are brown, dried, or completely distorted.",
        swahili:
          "Maua yaliyoshambuliwa ni kahawia, kavu, au yamepotoshwa kabisa.",
      },
      {
        english: "The germinating seedling turns brown-red and dies.",
        swahili: "Mche unaoota hubadilika kuwa kahawia-nyekundu na kufa.",
      },
      {
        english:
          "Irregular to round brown spots with chlorotic halos appear on leaves, and later spread to the stem.",
        swahili:
          "Madoa ya kahawia yasiyo ya kawaida na ya mviringo yenye halo ya klorotiki huonekana kwenye majani, na baadaye kuenea kwenye shina.",
      },
      {
        english:
          "Stem may break, pods are also infected leading to shriveled seeds.",
        swahili:
          "Shina linaweza kuvunjika, maganda pia yameambukizwa na kusababisha mbegu kunyauka.",
      },
      {
        english: "It is caused by a virus transmitted by aphids.",
        swahili: "Inasababishwa na virusi vinavyoenezwa na aphids.",
      },
      {
        english:
          "The affected leaves become pale yellow and exhibit mosaic, vein banding symptoms.",
        swahili:
          "Majani yaliyoathiriwa yana rangi ya manjano iliyopauka na huonyesha dalili za utepe wa mosai, za ukanda wa mshipa.",
      },
      {
        english:
          "The affected leaves become reduced in size and show puckering. Pods are also reduced and become twisted.",
        swahili:
          "Majani yaliyoathiriwa hupungua kwa ukubwa na huonyesha kuchubuka. Maganda pia hupunguzwa na kupindika.",
      },
      {
        english:
          "Powdery mildew is visible on all the aerial parts of the affected plants.",
        swahili:
          "Ukoga wa unga huonekana kwenye sehemu zote za angani za mimea iliyoathiriwa.",
      },
      {
        english:
          "Symptoms first start from leaves and then spread to stem, branches, and pods.",
        swahili:
          "Dalili kwanza huanza kutoka kwa majani na kisha kuenea hadi shina, matawi na maganda.",
      },
      {
        english: "This white growth consists of the fungus and its spores.",
        swahili: "Ukuaji huu mweupe unajumuisha fangasi na vijidudu vyake.",
      },
      {
        english:
          "The fungus attacks all aerial parts and at any stage of plant growth.",
        swahili:
          "Kuvu hushambulia sehemu zote za angani na katika hatua yoyote ya ukuaji wa mmea.",
      },
      {
        english:
          "Symptoms include circular, black, sunken spots with a dark center and bright red-orange margins on leaves and pods.",
        swahili:
          "Dalili ni pamoja na madoa ya mviringo, meusi, yaliyozama na katikati yenye giza na ukingo wa rangi nyekundu-machungwa kwenye majani na maganda.",
      },
      {
        english: "In severe infections, the affected parts wither off.",
        swahili: "Katika maambukizi makali, sehemu zilizoathirika hunyauka.",
      },
      {
        english:
          "Symptoms begin appearing at 4 weeks as raised white cankers at the base of the stem.",
        swahili:
          "Dalili huanza kuonekana baada ya wiki 4 kama vipele vyeupe vilivyoinuliwa kwenye msingi wa shina.",
      },
      {
        english:
          "The affected plants become stunted with dark green and mottled leaves that are reduced in size.",
        swahili:
          "Mimea iliyoathiriwa hudumaa kwa kijani kibichi na majani madoadoa ambayo hupunguzwa ukubwa.",
      },
      {
        english: "Leaves of affected plants dry and drop.",
        swahili: "Majani ya mimea iliyoathiriwa hukauka na kushuka.",
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
