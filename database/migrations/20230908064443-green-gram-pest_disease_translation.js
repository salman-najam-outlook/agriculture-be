"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Anthracnose",
        swahili: "Anthracnose",
      },
      {
        english:
          "The fungus attacks all aerial part parts and at any stage of plant growth.",
        swahili:
          "Kuvu hushambulia sehemu zote za angani na katika hatua yoyote ya ukuaji wa mmea.",
      },
      {
        english:
          "Symptoms are circular, black, sunken spots with dark center and bright red orange margins on leaves and pods.",
        swahili:
          "Dalili ni madoa ya mviringo, meusi, yaliyozama na katikati meusi na ukingo wa rangi ya chungwa nyekundu kwenye majani na maganda.",
      },
      {
        english:
          "Irregular spots, and dead areas on leaves that often follow the veins of the leaves",
        swahili:
          "Matangazo yasiyo ya kawaida, na maeneo yaliyokufa kwenye majani ambayo mara nyingi hufuata mishipa ya majani",
      },
      {
        english: "Cercospora leaf spot",
        swahili: "Cercospora jani doa",
      },
      {
        english:
          "Spots produced are small, numerous in number with pale brown centre and reddish brown margin.",
        swahili:
          "Madoa yanayozalishwa ni madogo, mengi kwa idadi na katikati ya rangi ya kahawia iliyofifia na ukingo wa rangi nyekundu ya kahawia.",
      },
      {
        english:
          "Small necrotic flecks that enlarge to form circular, tan or grey spots.",
        swahili:
          "Mishipa midogo ya necrotic ambayo hukua na kuunda madoa ya mviringo, ya rangi nyekundu au ya kijivu.",
      },
      {
        english: "The center of the lesions dry out and has a white appearance",
        swahili: "Katikati ya vidonda hukauka na ina mwonekano mweupe",
      },
      {
        english: "Dry Root Rot and Leaf Blight",
        swahili: "Kuoza kwa mizizi kavu na ukungu wa majani",
      },
      {
        english:
          "The affected leaves turn yellow in colour and brown irregular lesions appear on leaves.",
        swahili:
          "Majani yaliyoathiriwa yanageuka manjano kwa rangi na vidonda vya kahawia visivyo kawaida huonekana kwenye majani.",
      },
      {
        english:
          "The affected plants dry up gradually. When the tap root of the affected plant is split open, reddening of internal tissues is visible.",
        swahili:
          "Mimea iliyoathiriwa hukauka hatua kwa hatua. Wakati mzizi wa mmea ulioathiriwa umegawanyika wazi, reddening ya tishu za ndani huonekana.",
      },
      {
        english:
          "In the initial stages, the fungus causes seed rot, seedling blight and root rot symptoms.",
        swahili:
          "Katika hatua za awali, fangasi husababisha kuoza kwa mbegu, ukungu wa miche na dalili za kuoza kwa mizizi.",
      },
      {
        english: "Leaf Crinkle",
        swahili: "Kuna kwa majani",
      },
      {
        english:
          "The earliest symptoms appear on youngest leaves as chlorosis around some lateral veins and its branches near the margin.",
        swahili:
          "Dalili za mwanzo huonekana kwenye majani machanga zaidi kama chlorosis karibu na mishipa ya pembeni na matawi yake karibu na ukingo.",
      },
      {
        english: "The leaves show curling of margin downwards.",
        swahili: "Majani yanaonyesha kujikunja kwa ukingo kuelekea chini.",
      },
      {
        english:
          "The veins show reddish brown discolouration on the under surface which also extends to the petiole.",
        swahili:
          "Mishipa huonyesha rangi nyekundu ya kahawia kwenye sehemu ya chini ambayo pia huenea hadi kwenye petiole.",
      },
      {
        english: "Powdery Mildew",
        swahili: "Koga ya unga",
      },
      {
        english:
          "White powdery patches appear on leaves and other green parts which later become dull coloured.",
        swahili:
          "Mabaka meupe ya unga huonekana kwenye majani na sehemu nyingine za kijani kibichi ambazo baadaye huwa na rangi iliyofifia.",
      },
      {
        english:
          "In severe infections, foliage becomes yellow causing premature defoliation.",
        swahili:
          "Katika maambukizo makali, majani huwa ya manjano na kusababisha ukataji wa majani mapema.",
      },
      {
        english:
          "When the infection is severe, both the surfaces of the leaves are completely covered by whitish powdery growth.",
        swahili:
          "Wakati maambukizi ni makali, nyuso zote za majani zimefunikwa kabisa na ukuaji wa unga mweupe.",
      },
      {
        english: "Rust",
        swahili: "Kutu",
      },
      {
        english:
          "Spots produced are small, numerous in number with pale brown centre and reddish brown margin.",
        swahili:
          "Madoa yanayozalishwa ni madogo, mengi kwa idadi na katikati ya rangi ya kahawia iliyofifia na ukingo wa rangi nyekundu ya kahawia.",
      },
      {
        english: "Similar spots also occur on branches and pods.",
        swahili: "Madoa sawa pia hutokea kwenye matawi na maganda.",
      },
      {
        english:
          "Under favourable environmental conditions, severe leaf spotting and defoliation occurs at the time of flowering and pod formation.",
        swahili:
          "Chini ya hali nzuri ya mazingira, uonekanaji mkali wa majani na uharibifu wa majani hutokea wakati wa maua na kuunda maganda.",
      },
      {
        english: "ther",
        swahili: "hapo",
      },
      {
        english: "Stem canker",
        swahili: "Uvimbe wa shina",
      },
      {
        english:
          "These enlarge gradually and turn as raised brown streaks spreading upwards.",
        swahili:
          "Hizi huongezeka polepole na kugeuka kama michirizi ya kahawia iliyoinuliwa inayoenea juu.",
      },
      {
        english:
          "Plants are stunted and leaves dark green, mottled and reduced in size.",
        swahili:
          "Mimea imedumaa na huacha kijani kibichi, chenye madoadoa na kupungua kwa ukubwa.",
      },
      {
        english: "Normal leaves on the affected plants drop suddenly and dry.",
        swahili:
          "Majani ya kawaida kwenye mimea iliyoathiriwa huanguka ghafla na kavu.",
      },
      {
        english: "Yellow Mosaic",
        swahili: "Mosaic ya Njano",
      },
      {
        english:
          "Initially mild scattered yellow spots appear on young leaves.",
        swahili:
          "Hapo awali madoa mepesi ya manjano yaliyotawanyika yanaonekana kwenye majani machanga.",
      },
      {
        english:
          "The next trifoliate leaves emerging from the growing apex show irregular yellow and green patches alternating with each other.",
        swahili:
          "Majani matatu yanayofuata yanayotoka kwenye kilele kinachokua yanaonyesha mabaka yasiyo ya kawaida ya manjano na kijani yakipishana.",
      },
      {
        english:
          "Spots gradually increase in size and ultimately some leaves turn completely yellow.",
        swahili:
          "Madoa huongezeka polepole kwa ukubwa na hatimaye baadhi ya majani yanageuka manjano kabisa.",
      },
      {
        english: "Bean Aphids",
        swahili: "Aphids ya maharagwe",
      },
      {
        english:
          "Leaves, inflorescence stalk, and young pods covered with dark-colored aphids",
        swahili:
          "Majani, bua la maua, na maganda machanga yaliyofunikwa na vidukari vya rangi nyeusi",
      },
      {
        english: "Leaf mottling and crinkling, and plant dwarfing",
        swahili: "Majani yanayopepesuka na kukunjamana, na mmea mwembamba",
      },
      {
        english: "Honeydew secretion with black ant movements",
        swahili: "Usiri wa asali na harakati za mchwa mweusi",
      },
      {
        english: "Blister beetle",
        swahili: "Mende ya malengelenge",
      },
      {
        english: "The adult blister beetle primarily feeds on flowers",
        swahili: "Mende ya malengelenge ya watu wazima hulisha maua",
      },
      {
        english: "Feeding damage can also be found on tender leaves and shoots",
        swahili:
          "Uharibifu wa kulisha unaweza pia kupatikana kwenye majani ya zabuni na shina",
      },
      {
        english:
          "The beetles often attack beans in swarms but generally in small patches within the field",
        swahili:
          "Mende mara nyingi hushambulia maharagwe kwenye makundi lakini kwa ujumla katika mabaka madogo ndani ya shamba",
      },
      {
        english: "Blue butterfly",
        swahili: "Kipepeo ya bluu",
      },
      {
        english: "Buds, flowers, and young pods with boreholes",
        swahili: "Buds, maua, na maganda machanga yenye visima",
      },
      {
        english: "Presence of slug-like caterpillar",
        swahili: "Kuwepo kwa kiwavi kama koa",
      },
      {
        english: "Honeydew secretion with black ant movements",
        swahili: "Usiri wa asali na harakati za mchwa mweusi",
      },
      {
        english: "Gram pod borer",
        swahili: "Gram pod borer",
      },
      {
        english: "Defoliation in early stages",
        swahili: "Kukausha majani katika hatua za mwanzo",
      },
      {
        english:
          "Larva's head alone thrust inside the pods and the rest of the body hanging out",
        swahili:
          "Kichwa cha lava peke yake kilisukuma ndani ya maganda na mwili wote ukining'inia",
      },
      {
        english: "Pods with round holes",
        swahili: "Pods zilizo na mashimo ya pande zote",
      },
      {
        english: "Grass blue butterfly",
        swahili: "Kipepeo ya bluu ya nyasi",
      },
      {
        english:
          "Buds, flowers, and young pods with boreholes and presence of slug-like caterpillar",
        swahili:
          "Buds, maua, na maganda machanga yenye visima na uwepo wa kiwavi kama koa",
      },
      {
        english: "Larval entry hole on the pod is plugged with excreta",
        swahili: "Shimo la mabuu kwenye ganda limechomekwa na kinyesi",
      },
      {
        english:
          "Pod damage is characterized by multiple holes per pod, made by individual larva",
        swahili:
          "Uharibifu wa ganda unaonyeshwa na mashimo mengi kwa kila ganda, iliyotengenezwa na mabuu ya kibinafsi",
      },
      {
        english: "Leafhopper",
        swahili: "Mbwa wa majani",
      },
      {
        english: "Leaves mottled and yellowish in color",
        swahili: "Majani yakiwa na rangi ya manjano",
      },
      {
        english: "Green color insects found under the surface of leaves",
        swahili: "Wadudu wa rangi ya kijani hupatikana chini ya uso wa majani",
      },
      {
        english: "Yellowing of leaves from tip to downwards",
        swahili: "Majani ya njano kutoka ncha hadi chini",
      },
      {
        english: "Lab lab bug or Stink bug",
        swahili: "Mdudu wa maabara au mdudu wa Uvundo",
      },
      {
        english:
          "Both nymphs and adults cluster on the tender shoots and suck the sap",
        swahili:
          "Nymphs na watu wazima hukusanyika kwenye shina laini na kunyonya maji",
      },
      {
        english: "Heavily infested vines dry and shed away",
        swahili: "Mizabibu iliyoshambuliwa sana hukauka na kumwaga",
      },
      {
        english: "Moderately infested plants remain weak and stunted in growth",
        swahili:
          "Mimea iliyoshambuliwa kwa wastani hubaki dhaifu na kudumaa katika ukuaji",
      },
      {
        english: "Pod bugs",
        swahili: "Wadudu wa ganda",
      },
      {
        english: "Pods with black spots",
        swahili: "Maganda yenye madoa meusi",
      },
      {
        english: "Shedding of green pods",
        swahili: "Kumwaga maganda ya kijani",
      },
      {
        english: "Poorly filled pods with shriveled grains inside",
        swahili: "Maganda yaliyojazwa vibaya na nafaka zilizokauka ndani",
      },
      {
        english: "Spiny pod borer",
        swahili: "Spiny pod borer",
      },
      {
        english: "Dropping of flowers and young pods",
        swahili: "Kuanguka kwa maua na maganda madogo",
      },
      {
        english:
          "Older pods marked with a brown spot where a larva has entered",
        swahili:
          "Maganda ya zamani yenye alama ya doa ya kahawia ambapo lava ameingia",
      },
      {
        english:
          "Caterpillar first feeds on foliage, later bores into pods and feeds on seeds",
        swahili:
          "Kiwavi kwanza hula majani, baadaye hutoboa kwenye maganda na kulisha mbegu",
      },
      {
        english: "Spotted pod borer",
        swahili: "Kipekecha madoadoa",
      },
      {
        english: "Defoliation in early stages",
        swahili: "Kukausha majani katika hatua za mwanzo",
      },
      {
        english:
          "Larva's head alone thrust inside the pods and the rest of the body hanging out",
        swahili:
          "Kichwa cha lava peke yake kilisukuma ndani ya maganda na mwili wote ukining'inia",
      },
      {
        english: "Pods with round holes",
        swahili: "Pods zilizo na mashimo ya pande zote",
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
