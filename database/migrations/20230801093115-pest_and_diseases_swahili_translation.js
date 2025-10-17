"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "False codling moth",
        swahili: "Nondo ya uwongo ya kuweka codling",
      },
      {
        english: "Thrips",
        swahili: "Thrips",
      },
      {
        english: "Scales",
        swahili: "Mizani",
      },
      {
        english: "Fruit fly",
        swahili: "Kuruka kwa matunda",
      },
      {
        english:
          "FCM larvae tunnel into the fruit, leaving behind a characteristic entry hole and a brown.",
        swahili:
          "Mtaro wa mabuu wa FCM ndani ya tunda, ukiacha shimo la kuingia na hudhurungi.",
      },
      {
        english:
          "Corky patch on the fruit surface feeding on the pulp and seeds.",
        swahili:
          "Kipande cha corky kwenye uso wa matunda kulisha kwenye massa na mbegu.",
      },
      {
        english: "Larvae can cause fruit to drop prematurely from the tree.",
        swahili:
          "Mabuu yanaweza kusababisha matunda kuanguka mapema kutoka kwa mti.",
      },
      {
        english:
          "Thrips feed on the leaves of avocado trees, causing them to become distorted, curled, and discolored.",
        swahili:
          "Thrips hula kwenye majani ya miti ya parachichi, na kusababisha kupotoshwa, kujikunja na kubadilika rangi.",
      },
      {
        english: "The leaves may also have a silvery appearance.",
        swahili: "Majani pia yanaweza kuwa na mwonekano wa silvery.",
      },
      {
        english:
          " It can damage the flowers of avocado trees, resulting in reduced fruit set and yield.",
        swahili:
          "Inaweza kuharibu maua ya miti ya parachichi, na kusababisha kupungua kwa matunda na mavuno.",
      },
      {
        english:
          "Scales feed on the sap of avocado leaves, causing them to turn yellow and wilt.",
        swahili:
          "Mizani hula utomvu wa majani ya parachichi, na kuwafanya kugeuka manjano na kunyauka.",
      },
      {
        english:
          "The leaves may also have a sticky residue on them and it can cause damage to the bark of avocado trees, resulting in cracks and lesions.",
        swahili:
          "Majani pia yanaweza kuwa na mabaki ya kunata na inaweza kusababisha uharibifu wa gome la miti ya parachichi, na kusababisha nyufa na vidonda.",
      },
      {
        english: "This can lead to reduced tree vigor and yield.",
        swahili:
          "Hii inaweza kusababisha kupungua kwa nguvu ya miti na mavuno.",
      },
      {
        english:
          "Fruit flies lay their eggs in the skin of the avocado fruit, resulting in small puncture marks on the surface, The eggs hatch into larvae, which feed on the flesh of the avocado fruit.",
        swahili:
          "Nzi wa matunda hutaga mayai yao kwenye ngozi ya tunda la parachichi, na hivyo kusababisha alama ndogo za kuchomwa juu ya uso, Mayai hayo huanguliwa na kuwa mabuu, ambao hula nyama ya tunda la parachichi.",
      },
      {
        english:
          "This can result in the fruit becoming soft and mushy, and may also cause premature ripening and In severe cases of fruit fly infestation.",
        swahili:
          "Hii inaweza kusababisha matunda kuwa laini na mushy, na pia inaweza kusababisha kukomaa mapema na Katika hali mbaya ya matunda infestation infestation.",
      },
      {
        english: "The avocado fruit may drop prematurely from the tree.",
        swahili: "Tunda la parachichi linaweza kuanguka mapema kutoka kwa mti.",
      },
      {
        english: "Root rot",
        swahili: "Kuoza kwa mizizi",
      },
      {
        english: "Anthracnose",
        swahili: "Ugonjwa wa Anthracnose",
      },
      {
        english: "Cercospora Fruit Spot",
        swahili: "Doa ya Matunda ya Cercospora",
      },
      {
        english: "Scab disease",
        swahili: "Ugonjwa wa kikohozi",
      },
      {
        english:
          "The first signs of the disease are observed in the tree canopy.",
        swahili: "Ishara za kwanza za ugonjwa huzingatiwa kwenye mti wa mti.",
      },
      {
        english:
          "Leaves are small, pale green, often wilted with brown tips, and drop readily.",
        swahili:
          "Majani ni madogo, ya kijani kibichi, mara nyingi hunyauka na ncha za kahawia, na huanguka kwa urahisi.",
      },
      {
        english:
          "Shoots die back from the tips, and eventually the tree is reduced to a bare framework of dying branches.",
        swahili:
          "Shoots hufa nyuma kutoka kwa vidokezo, na hatimaye mti hupunguzwa kwa mfumo wazi wa matawi ya kufa.",
      },
      {
        english:
          "Plants can get anthracnose at any stage, but it causes the most damage between flowering and harvesting.",
        swahili:
          "Mimea inaweza kupata anthracnose katika hatua yoyote, lakini husababisha uharibifu mkubwa kati ya maua na kuvuna.",
      },
      {
        english:
          "Dry spots, dark brown in color, form on the skin, leading to abnormal development.",
        swahili:
          "Matangazo kavu, hudhurungi katika rangi, huunda kwenye ngozi, na kusababisha maendeleo yasiyo ya kawaida.",
      },
      {
        english: "In severe attacks, the young fruits drop.",
        swahili: "Katika mashambulizi makali, matunda ya vijana hupungua.",
      },
      {
        english:
          "Symptoms occur on leaves, fruit, twigs and fruit stems at any time during the growing season",
        swahili:
          "Dalili hutokea kwenye majani, matunda, matawi na shina za matunda wakati wowote wakati wa msimu wa ukuaji",
      },
      {
        english:
          "Small, light-yellow spots later changing to reddish-brown appear on fruits and leaves which eventually become hard and crack.",
        swahili:
          "Madoa madogo ya manjano-nyepesi baadaye yanayobadilika na kuwa nyekundu-kahawia huonekana kwenye matunda na majani ambayo hatimaye huwa magumu na kupasuka.",
      },
      {
        english:
          "On fruit, the first sign of infection is a darkening of the epidermis followed by swelling of the underlying tissues which raises a small dark spot.",
        swahili:
          "Juu ya matunda, ishara ya kwanza ya maambukizi ni giza ya epidermis ikifuatiwa na uvimbe wa tishu za msingi ambayo huinua doa ndogo ya giza.",
      },
      {
        english:
          "Symptoms on fruit initially appear as corky, raised, oval or irregular shaped brown to purplish-brown spots.",
        swahili:
          "Dalili za matunda mwanzoni huonekana kama madoa ya rangi ya zambarau, iliyoinuliwa, ya mviringo au isiyo ya kawaida yenye umbo la kahawia hadi madoa ya rangi ya zambarau.",
      },
      {
        english:
          "As the disease progresses, spots enlarge and coalesce to form large rough areas over the fruit surface.",
        swahili:
          "Ugonjwa unapoendelea, madoa huongezeka na kuungana na kuunda sehemu kubwa mbaya juu ya uso wa matunda.",
      },
      {
        english:
          "Cracking of these rough areas may allow secondary organisms to penetrate and rot the fruit.",
        swahili:
          "Kupasuka kwa sehemu hizi mbaya kunaweza kuruhusu viumbe vya pili kupenya na kuoza matunda.",
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
