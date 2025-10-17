"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Mealy bug",
        swahili: "Mdudu wa unga",
      },
      {
        english:
          "Ants and mealy bugs pose a serious threat to pineapple production because the ants carry the mealy bugs from diseased plants onto healthy plants resulting in the spread of the disease throughout the field.",
        swahili:
          "Mchwa na wadudu wa unga ni tishio kubwa kwa uzalishaji wa mananasi kwa sababu mchwa hubeba mende kutoka kwa mimea yenye magonjwa na kuwapeleka kwenye mimea yenye afya na hivyo kusababisha kuenea kwa ugonjwa huo shambani.",
      },
      {
        english:
          "Severe infestations can cause wilting of the leaves with the leaves eventually turning orange-brown and withering.",
        swahili:
          "Mashambulizi makali yanaweza kusababisha kunyauka kwa majani na hatimaye kugeuka rangi ya chungwa-kahawia na kunyauka.",
      },
      {
        english:
          "Control becomes more difficult if there are weeds and other local plants acting as hosts for the mealy bug. Initial control should be directed against the ants to ensure success.",
        swahili:
          "Udhibiti unakuwa mgumu zaidi ikiwa kuna magugu na mimea mingine ya kienyeji inayofanya kazi kama mwenyeji wa mdudu wa unga. Udhibiti wa awali unapaswa kuelekezwa dhidi ya mchwa ili kuhakikisha mafanikio.",
      },
      {
        english: "Nematodes",
        swahili: "Nematodes",
      },
      {
        english:
          "Pest nematodes are tiny slender unsegmented worms that infest plant roots, reducing root growth and causing root death thus reducing the plant’s ability to absorb water and nutrients.",
        swahili:
          "Nematode wadudu ni minyoo wadogo wembamba ambao hawajagawanyika ambao hushambulia mizizi ya mimea, kupunguza ukuaji wa mizizi na kusababisha kifo cha mizizi hivyo kupunguza uwezo wa mmea kunyonya maji na virutubisho.",
      },
      {
        english:
          "The result is a poorly developed root system causing stunting of plants.",
        swahili:
          "Matokeo yake ni mfumo duni wa mizizi na kusababisha kudumaa kwa mimea.",
      },
      {
        english:
          "Leaves turn yellow  and then red and are less erect than those of healthy plants. Tips are withered.",
        swahili:
          "Majani yanageuka manjano na kisha mekundu na hayajasimama kidogo kuliko yale ya mimea yenye afya. Vidokezo vimenyauka.",
      },
      {
        english: "Butterfly larvae",
        swahili: "Mabuu ya kipepeo",
      },
      {
        english: "Butterfly larvae can damage flowers.",
        swahili: "Mabuu ya kipepeo yanaweza kuharibu maua.",
      },
      {
        english:
          "The adult butterflies lay eggs when the plants are at the flowering stage.",
        swahili:
          "Vipepeo wazima hutaga mayai wakati mimea iko kwenye hatua ya maua.",
      },
      {
        english: "Fruits are also affected by larvae.",
        swahili: "Matunda pia huathiriwa na mabuu.",
      },
      {
        english: "Rodents",
        swahili: "Panya",
      },
      {
        english:
          "Rats can be very destructive pests in pineapple fields and also pose a serious hazard to pineapples in storage",
        swahili:
          "Panya wanaweza kuwa wadudu waharibifu katika mashamba ya mananasi na pia kuwa hatari kubwa kwa mananasi kwenye hifadhi",
      },
      {
        english:
          "Rats damage pineapples in the field when they bite, urinate and or defecate on the crop making the fruits unmarketable.",
        swahili:
          "Panya huharibu mananasi shambani wanapouma, kukojoa au kujisaidia kwenye mazao na kufanya matunda yasinunuliwe.",
      },
      {
        english:
          "Even higher crop loss due to rodent damage may occur where pineapples are stored",
        swahili:
          "Hata upotevu mkubwa wa mazao kutokana na uharibifu wa panya unaweza kutokea pale mananasi yanapohifadhiwa",
      },
      {
        english: "Mealybug wilt",
        swahili: "Mealybug wilt",
      },
      {
        english:
          "The most visible symptom is a bright bronze to red colouration of the leaves of the young plant or a pinkish and/or yellowish colouration of the older leaves.",
        swahili:
          "Dalili inayoonekana zaidi ni rangi ya shaba inayong'aa hadi nyekundu ya majani ya mmea mchanga au rangi ya waridi na/au manjano ya majani mazee.",
      },
      {
        english: "Wilting starts at the tip of the leaves.",
        swahili: "Kunyauka huanza kwenye ncha ya majani.",
      },
      {
        english:
          "If the plants continue to grow, the leaves lose turgidity and curl outwards",
        swahili:
          "Ikiwa mimea inaendelea kukua, majani hupoteza unyevu na kujikunja nje",
      },
      {
        english: "Root Rot",
        swahili: "Kuoza kwa mizizi",
      },
      {
        english:
          "These fungal problems are caused by various Phytophthora and Pythium species.",
        swahili:
          "Matatizo haya ya fangasi husababishwa na aina mbalimbali za Phytophthora na Pythium.",
      },
      {
        english:
          "The symptoms of root rots are a reduction in plant growth with the development of reddish coloured leaves and the browning of the leaf margins.",
        swahili:
          "Dalili za kuoza kwa mizizi ni kupungua kwa ukuaji wa mmea na ukuaji wa majani yenye rangi nyekundu na kubadilika kwa ukingo wa majani.",
      },
      {
        english: "Affected plants eventually die",
        swahili: "Mimea iliyoathiriwa hatimaye hufa",
      },
      {
        english: "Phytophthora heart rot",
        swahili: "Phytophthora moyo kuoza",
      },
      {
        english:
          "The symptoms are rotting at the base of the leaves in the centre of the leaf whorl (heart) of young non-flowering plants.",
        swahili:
          "Dalili ni kuoza kwenye sehemu ya chini ya majani katikati ya jani (moyo) la mimea michanga isiyotoa maua.",
      },
      {
        english:
          "In a more developed stage, young leaves can easily be pulled from the plant.",
        swahili:
          "Katika hatua iliyoendelea zaidi, majani machanga yanaweza kuvutwa kwa urahisi kutoka kwa mmea.",
      },
      {
        english: "The base of the leaves eventually rots and has a bad smell.",
        swahili: "Kiasi cha majani hatimaye huoza na kuwa na harufu mbaya.",
      },
      {
        english: "Fruitlet core rot",
        swahili: "Kuoza kwa msingi wa matunda",
      },
      {
        english:
          "Fruitlet Core Rot is caused by a combination of Penicillium and Fusarium spp.",
        swahili:
          "Fruitlet Core Rot husababishwa na mchanganyiko wa Penicillium na Fusarium spp.",
      },
      {
        english:
          "Although the symptoms of this disease generally appear during storage, infection starts in the field. Mites are thought to be associated with this disease, through causing injury to the fruitlets.",
        swahili:
          "Ingawa dalili za ugonjwa huu kwa ujumla huonekana wakati wa kuhifadhi, maambukizi huanza shambani. Utitiri wanadhaniwa kuhusishwa na ugonjwa huu, kwa kusababisha kuumia kwa matunda.",
      },
      {
        english:
          "The infected tissue of the fruit has a water-soaked appearance which eventually discolours becoming light to dark brown.",
        swahili:
          "Tishu iliyoambukizwa ya tunda ina mwonekano uliolowa maji ambayo hatimaye hubadilika rangi na kuwa nyepesi hadi kahawia iliyokolea.",
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

  async down(queryInterface, Sequelize) {},
};
