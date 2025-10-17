"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Pea Aphids",
        swahili: "Chawa wa Maharage",
      },
      {
        english: "Leaf Miner",
        swahili: "Chawa wa Majani",
      },
      {
        english: "Pea Stem fly",
        swahili: "Nzi wa Shina la Maharage",
      },
      {
        english: "Pod Borer",
        swahili: "Chawa wa Vikungu",
      },
      {
        english: "Pea Moth",
        swahili: "Kunguni wa Maharage",
      },
      {
        english: "Pea Weevil/ bruchid",
        swahili: "Korongo wa Maharage",
      },
      {
        english: "Pea Thrips",
        swahili: "Thrips wa Maharage",
      },

      {
        english:
          "A colony consists of winged and wingless adults and various sizes of nymphs. Aphids may be black, yellow, or pink, but mostly are various shades of green.",
        swahili:
          "Kundi linajumuisha watu wazima wenye mabawa na wasio na mabawa na ukubwa mbalimbali wa nymphs. Aphids inaweza kuwa nyeusi, njano, au nyekundu, lakini zaidi ni vivuli mbalimbali vya kijani.",
      },
      {
        english:
          "Feeding by large numbers discolors foliage, curls leaves, and damages developing buds.",
        swahili:
          "Kulisha kwa idadi kubwa hubadilisha rangi ya majani, kukunja majani, na kuharibu buds zinazokua.",
      },
      {
        english:
          "They suck the sap of the cells, owing to which the leaves turn pale and yellow.",
        swahili:
          "Wananyonya utomvu wa seli, kwa sababu ambayo majani yanageuka rangi na manjano.",
      },
      {
        english:
          "Larvae of the insect make a tunnel in the leaf, causing severe damage.",
        swahili:
          "Mabuu ya wadudu hufanya handaki kwenye jani, na kusababisha uharibifu mkubwa.",
      },
      {
        english:
          "The large number of tunnels made by the larvae between the lower and upper epidermis interferes with photosynthesis and the proper growth of the plants, making them look unattractive.",
        swahili:
          "Idadi kubwa ya vichuguu vinavyotengenezwa na mabuu kati ya epidermis ya chini na ya juu huingilia photosynthesis na ukuaji sahihi wa mimea, na kuifanya kuonekana isiyofaa.",
      },
      {
        english: "Drying dropping of leaves in severe cases",
        swahili: "Kukausha kuacha majani katika hali mbaya",
      },
      {
        english:
          "The maggot of the insect damages the internal tissue; consequently, the entire plant dies. The damage is more acute when the crop is sown early.",
        swahili:
          "Fuu wa mdudu huharibu tishu za ndani; kwa hivyo, mmea wote hufa. Uharibifu ni mkubwa zaidi wakati mazao yanapandwa mapema.",
      },
      {
        english:
          "The adults also cause damage by puncturing the leaves, and the injured parts turn yellow.",
        swahili:
          "Watu wazima pia husababisha uharibifu kwa kutoboa majani, na sehemu zilizojeruhiwa zinageuka manjano.",
      },
      {
        english:
          "The damage is more severe on seedlings than on the grown-up plants",
        swahili:
          "Uharibifu ni mbaya zaidi kwenye miche kuliko kwenye mimea iliyokua",
      },
      {
        english:
          "The caterpillar makes a hole in pods and feeds upon developing seed.",
        swahili: "Kiwavi hutoboa maganda na hula wakati mbegu zinazokua.",
      },
      {
        english:
          "In the early stages, they feed on the foliage and sometimes cause serious defoliation.",
        swahili:
          "Katika hatua za mwanzo, hula kwenye majani na wakati mwingine husababisha ukataji mkubwa wa majani.",
      },
      {
        english:
          "During the reproductive stage, they bore the developing pod and feed on the seeds with their head typically thrust inside and most of the part of the body outside.",
        swahili:
          "Wakati wa hatua ya uzazi, walibeba ganda linalokua na kulisha mbegu kwa kawaida kichwa chao kikiingizwa ndani na sehemu kubwa ya mwili nje.",
      },
      {
        english:
          "The caterpillars feed on the developing peas in the pods; they also leave frass, which contaminates the end produce.",
        swahili:
          "Viwavi hula kwenye mbaazi zinazokua kwenye maganda; pia huacha frass, ambayo huchafua mazao ya mwisho.",
      },
      {
        english:
          "Within each pod, 1 or 2 individual peas tend to be partially eaten, and attacked pods may develop a yellow appearance and ripen early.",
        swahili:
          "Ndani ya kila ganda, mbaazi 1 au 2 huliwa kwa sehemu, na maganda yaliyoshambuliwa yanaweza kuwa na mwonekano wa manjano na kuiva mapema.",
      },
      {
        english:
          "When pea pods are opened for shelling, one or more creamy white caterpillars, up to 14 mm long, with dark dots on the body may be found eating into the peas",
        swahili:
          "Wakati maganda ya njegere yanapofunguliwa kwa ajili ya kung'oa, viwavi mmoja au zaidi wa rangi ya krimu, wenye urefu wa milimita 14, wakiwa na madoa meusi mwilini wanaweza kupatikana wakila ndani ya mbaazi",
      },
      {
        english: "Adults feed on blossoms and lay eggs on young pods.",
        swahili:
          "Watu wazima hula kwenye maua na hutaga mayai kwenye maganda machanga.",
      },
      {
        english:
          "Larvae, after hatching from the eggs, burrow into green seed.",
        swahili:
          "Mabuu, baada ya kuanguliwa kutoka kwenye mayai, huchimba kwenye mbegu ya kijani.",
      },
      {
        english:
          "The larvae burrow straight through the pods to feed on the seed, so they are not readily found for identification until the seed is mature (above), and it is too late for control.",
        swahili:
          "Mabuu huchimba moja kwa moja kupitia kwenye maganda ili kulisha mbegu, kwa hivyo hawapatikani kwa urahisi kwa ajili ya kutambuliwa hadi mbegu imekomaa (juu), na ni kuchelewa sana kudhibiti.",
      },
      {
        english:
          "Leaves fed upon by thrips often become dull green and later develop a silvery-white discoloration on the upper surface.",
        swahili:
          "Majani yanayolishwa na thrips mara nyingi huwa kijani kibichi na baadaye hubadilika rangi kuwa nyeupe-fedha kwenye sehemu ya juu.",
      },
      {
        english:
          "The discolored areas are usually marked by many tiny black excrement spots.",
        swahili:
          "Maeneo yaliyobadilika rangi huwa yana alama ya madoa madogo meusi ya kinyesi.",
      },
      {
        english:
          "When thrips feed on developing tissues at the shoot tip or in flower buds, they can cause distorted growth.",
        swahili:
          "Wakati thrips hula kwa tishu zinazoendelea kwenye ncha ya chipukizi au kwenye maua, zinaweza kusababisha ukuaji potofu.",
      },
      {
        english: "Wilt",
        swahili: "Wilt",
      },
      {
        english: "Powdery Mildew",
        swahili: "Ukungu wa Poda",
      },
      {
        english: "Rust",
        swahili: "Kutu",
      },
      {
        english: "Root rot",
        swahili: "Kuoza kwa mizizi",
      },
      {
        english: "Pod Spot and Ascochyta Blight",
        swahili: "Madoa ya Poda na Ugonjwa wa Ascochyta",
      },
      {
        english: "Downy mildew",
        swahili: "Ugonjwa wa Downy",
      },
      {
        english: "Mosaic and Streak",
        swahili: "Musa na Streak",
      },
      {
        english: "Yellowing of lower leaves and stunting of plants.",
        swahili: "Majani ya chini ya manjano na kudumaa kwa mimea.",
      },
      {
        english: "The stem may be slightly swollen and brittle near the soil.",
        swahili: "Shina linaweza kuvimba kidogo na brittle karibu na udongo.",
      },
      {
        english:
          "Externally, the root system appears healthy; however, secondary root rots are likely to occur on plants wilted for long periods.",
        swahili:
          "Kwa nje, mfumo wa mizizi unaonekana kuwa na afya; hata hivyo, kuoza kwa mizizi ya pili kuna uwezekano wa kutokea kwenye mimea iliyonyauka kwa muda mrefu.",
      },
      {
        english:
          "It attacks leaves first, producing faint, slightly discolored specks from which grayish white powdery growth of mycelium develops.",
        swahili:
          "Hushambulia majani kwanza, na kutoa vijidudu hafifu, vilivyobadilika rangi kidogo ambapo ukuaji wa unga mweupe wa mycelium hukua.",
      },
      {
        english: "Powdery growth spreads over leaf, stem, and pod.",
        swahili: "Ukuaji wa unga huenea juu ya jani, shina na ganda.",
      },
      {
        english: "The leaves turn yellow and die.",
        swahili: "Majani yanageuka manjano na kufa.",
      },
      {
        english:
          "The stem of the plant becomes malformed and the affected plant dies out.",
        swahili: "Shina la mmea huharibika na mmea ulioathiriwa hufa.",
      },
      {
        english: "Yellow spots having aecia in round or elongated clusters.",
        swahili:
          "Madoa ya manjano yaliyo na aecia katika makundi ya mviringo au marefu.",
      },
      {
        english:
          "Then the uredopustules develop which are powdery and light brown in appearance.",
        swahili:
          "Kisha uredopustules hukua ambayo ni ya unga na hudhurungi kwa sura.",
      },
      {
        english:
          "Reddish brown to black streaks appear on primary and secondary roots.",
        swahili:
          "Michirizi ya kahawia nyekundu hadi nyeusi inaonekana kwenye mizizi ya msingi na ya pili.",
      },
      {
        english:
          "These streaks coalesce at later stages, leading to girdling of the lower stem.",
        swahili:
          "Michirizi hii huungana katika hatua za baadaye, na kusababisha kuziba kwa shina la chini.",
      },
      {
        english:
          "Red discoloration of the vascular system can be seen, especially near cotyledon attachment.",
        swahili:
          "Kubadilika kwa rangi nyekundu ya mfumo wa mishipa kunaweza kuonekana, haswa karibu na kiambatisho cha cotyledon.",
      },
      {
        english:
          "Black to purplish streaks on stems reaching from the root zone to about 25 cm up the stem.",
        swahili:
          "Michirizi nyeusi hadi ya rangi ya zambarau kwenye shina inayofika kutoka eneo la mizizi hadi takriban sm 25 juu ya shina.",
      },
      {
        english: "Leaf spots are gray-purplish.",
        swahili: "Madoa ya majani yana rangi ya kijivu-zambarau.",
      },
      {
        english:
          "Foot and stem lesions girdle and weaken the stem, leading to crop lodging and yield loss.",
        swahili:
          "Vidonda vya miguu na shina hufunga na kudhoofisha shina, na kusababisha upotevu wa mazao na upotezaji wa mavuno.",
      },
      {
        english:
          "A grayish white, moldy growth appears on the lower leaf surface, and a yellowish area appears on the opposite side of the leaf.",
        swahili:
          "Kijivu cheupe, ukuaji wa ukungu huonekana kwenye uso wa chini wa jani, na eneo la manjano huonekana upande wa pili wa jani.",
      },
      {
        english:
          "Infected leaves can turn yellow and die if the weather is cool and damp.",
        swahili:
          "Majani yaliyoambukizwa yanaweza kugeuka manjano na kufa ikiwa hali ya hewa ni baridi na unyevu.",
      },
      {
        english: "Stems may be distorted and stunted.",
        swahili: "Mashina yanaweza kupotoshwa na kudumaa.",
      },
      {
        english:
          "Brown blotches appear on pods, and mold may grow inside pods.",
        swahili:
          "Madoa ya hudhurungi huonekana kwenye maganda, na ukungu unaweza kuota ndani ya maganda.",
      },
      {
        english: "Mottled patterns on leaves.",
        swahili: "Miundo ya mottled kwenye majani.",
      },
      {
        english: "Yellow leaf veins.",
        swahili: "Mishipa ya majani ya manjano.",
      },
      {
        english:
          "Downward curling of leaflets as well as a transient clearing and swelling of leaf veins in most cultivars.",
        swahili:
          "Kupinda kwa vipeperushi chini pamoja na kusafisha kwa muda mfupi na uvimbe wa mishipa ya majani katika aina nyingi za mimea.",
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
