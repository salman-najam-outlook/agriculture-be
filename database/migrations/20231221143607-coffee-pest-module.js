'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Berry Borer",
        amharic: "ቤሪ ቦረር",
      },
      {
        english: "Coffee berry borer is the most serious pest of coffee worldwide.",
        amharic: "የቡና ቤሪ ቦረር በዓለም ዙሪያ በጣም የከፋ የቡና ተባዮች ነው።"
      },
      {
        english: "The female beetle bores into the berries through the navel region and makes tunnels in the hard bean, laying about 15 eggs.",
        amharic: "ሴቷ ጥንዚዛ በእምብርት አካባቢ ወደ ፍሬዎቹ ውስጥ ትገባለች እና በጠንካራው ባቄላ ውስጥ ዋሻዎችን ትሰራለች ፣ 15 ያህል እንቁላሎች ትጥላለች።"
      },
      {
        english: "The larvae feed on the beans, making small tunnels. A typical pinhole at the tip of the berries indicates the presence of the pest, which damages young as well as ripe berries. In severe infestation, 30 to 80% of berries may be affected, resulting in heavy crop loss.",
        amharic: "እጮቹ ባቄላዎችን ይመገባሉ, ትናንሽ ዋሻዎችን ይሠራሉ. በቤሪው ጫፍ ላይ ያለው የተለመደ የፒንሆል ተባዮቹን መኖሩን ያሳያል, ይህም ወጣት እና የበሰሉ ፍሬዎችን ይጎዳል. በከባድ ወረራ ከ 30 እስከ 80% የቤሪ ፍሬዎች ሊጎዱ ይችላሉ. ከፍተኛ የሆነ የሰብል መጥፋት ያስከትላል።"
      },
      {
        english: "White Stem Borer",
        amharic: "ነጭ ግንድ ቦረር",
      },
      {
        english: "Serious pest of Arabica coffee.",
        amharic: "አረቢካ ቡና ከባድ ተባይ.",
      },
      {
        english: "Infested plants show external ridges around the stem.",
        amharic: "የተበከሉ ተክሎች ከግንዱ ዙሪያ ውጫዊ ሽክርክሪቶችን ያሳያሉ."
      },
      {
        english: "Affected plants also show yellowing and wilting of leaves.",
        amharic: "የተጎዱ ተክሎችም ቢጫ እና ቅጠሎችን ያሳያሉ.",
      },
      {
        english: "Shot Hole Borer",
        amharic: "ሾት ሆል ቦረር",
      },
      {
        english: "Withered (faster in young branches and delayed in older twigs) or dried branches, attacked leaves fall prematurely.",
        amharic: "የደረቁ (በወጣት ቅርንጫፎች ውስጥ በፍጥነት እና በአሮጌ ቅርንጫፎች ውስጥ ዘግይተዋል) ወይም የደረቁ ቅርንጫፎች, የተጠቁት ቅጠሎች ያለጊዜው ይወድቃሉ.",
      },
      {
        english: "Terminal leaves wilt, droop, and dry up.",
        amharic: "የመጨረሻ ቅጠሎች ይረግፋሉ፣ ይረግፋሉ እና ይደርቃሉ።"
      },
      {
        english: "Severe infestation can result in the loss of a considerable number of productive branches.",
        amharic: "ኃይለኛ ወረርሽኙ ብዙ ቁጥር ያላቸው ምርታማ ቅርንጫፎችን መጥፋት ሊያስከትል ይችላል."
      },
      {
        english: "Red Borer",
        amharic: "ቀይ ቦረር",
      },
      {
        english: "The larva causes damage in Arabica and Robusta coffee by boring into young stems, primary and secondary branches to feed on the wood.",
        amharic: "ትላጩ በእንጨቱ ላይ ለመመገብ በወጣት ግንዶች፣ የመጀመሪያ እና ሁለተኛ ደረጃ ቅርንጫፎች በመሰላቸት በአረብኛ እና ሮቡስታ ቡና ላይ ጉዳት ያደርሳል።"
      },
      {
        english: "In the early stages of attack, young plants or branches show signs of wilting. Infested parts bear one or two holes through which pellet-like excrement of the larva hangs out and accumulates at the base of the plant.",
        amharic: "በጥቃቱ የመጀመሪያ ደረጃ ላይ ወጣት ተክሎች ወይም ቅርንጫፎች የመጥለቅለቅ ምልክቶች ይታያሉ. የተበከሉት ክፍሎች አንድ ወይም ሁለት ጉድጓዶች ይይዛሉ, በዚህም ምክንያት በእጽዋቱ ስር የሚከማቸበት ፔሌት መሰል እጭ ሰገራ."
      },
      {
        english: "In advanced cases, the branch or the whole plant dries up.",
        amharic: "በላቁ ሁኔታዎች ቅርንጫፉ ወይም ሙሉው ተክል ይደርቃል."
      },
      {
        english: "Leaf Rust",
        amharic: "ቅጠል ዝገት",
      },
      {
        english: "This is an important disease causing economic loss particularly in arabica coffee.",
        amharic: "ይህ በተለይ በአረብ ቡና ላይ ኢኮኖሚያዊ ኪሳራ የሚያመጣ ጠቃሚ በሽታ ነው."
      },
      {
        english: "On the lower surface of the infected leaves, small pale yellowish spots appear early after the first rains in the season.",
        amharic: "በበሽታው በተበከሉት ቅጠሎች የታችኛው ክፍል ላይ በበጋው ወቅት ከመጀመሪያው ዝናብ በኋላ ትንሽ ቢጫማ ነጠብጣቦች ይታያሉ."
      },
      {
        english: "These spots soon increase in size and number, and many such spots coalesce at severity causing premature defoliation.severe defoliation leads to debilitation of the bushes and results in poor cropping in the succeeding seasons.",
        amharic: "እነዚህ ቦታዎች ብዙም ሳይቆይ በመጠን እና በቁጥር ይጨምራሉ, እና ብዙ እንደዚህ ያሉ ቦታዎች በክብደታቸው ይተባበራሉ."
      },
      {
        english: "Berry Blotch",
        amharic: "ቤሪ ብሎች",
      },
      {
        english: "Necrotic spots on the exposed surface of green berries enlarge and cover the major portion.",
        amharic: "በአረንጓዴው የቤሪ ፍሬዎች ላይ በተሸፈነው ቦታ ላይ የኔክሮቲክ ነጠብጣቦች ትልቅ እና ዋናውን ክፍል ይሸፍናሉ."
      },
      {
        english: "Fruit skin shrivels and sticks fast to the parchment.",
        amharic: "የፍራፍሬ ቆዳ ይንጠባጠባል እና ከብራና ጋር በፍጥነት ይጣበቃል."
      },
      {
        english: "The centers of the spots turn grayish-white and are encircled by a distinct ring (0.2–0.6 inches in diameter) of brown tissue",
        amharic: "የቦታዎቹ ማዕከሎች ወደ ግራጫ-ነጭነት ይለወጣሉ እና በተለየ ቀለበት (ዲያሜትር 0.2-0.6 ኢንች) ቡናማ ቲሹ የተከበቡ ናቸው"
      },
      {
        english: "Cercospora Leaf Spot",
        amharic: "Cercospora ቅጠል ቦታ",
      },
      {
        english: "Circular brown spots with light-brown/grey centers, surrounded by a wide dark brown ring and and yellow halos, around 15 mm wide appear on leaves",
        amharic: "ክብ ቡኒ ነጠብጣቦች ከብርሃን-ቡናማ/ግራጫ ማዕከሎች ጋር፣ በሰፊ ጥቁር ቡናማ ቀለበት እና በቢጫ ሃሎዎች የተከበቡ፣ 15 ሚሊ ሜትር ስፋት ያላቸው በቅጠሎች ላይ ይታያሉ"
      },
      {
        english: "The spots mostly occur between the veins and also on the margins. Sometimes spots grow into large blotches, and a leaf bligh occurs.",
        amharic: "ነጥቦቹ በአብዛኛው በደም ሥር እና እንዲሁም በዳርቻዎች መካከል ይከሰታሉ. አንዳንድ ጊዜ ነጠብጣቦች ወደ ትላልቅ ጉድፍቶች ያድጋሉ, እና የቅጠል ግርዶሽ ይከሰታል."
      },
      {
        english: "This usually happens in cooler, wet areas above 600 m altitude. Infections on the berries are generally smaller, around 5 mm wide, but sometimes they cover the whole berry.",
        amharic: "ይህ በአብዛኛው የሚከሰተው ከ 600 ሜትር ከፍታ ባላቸው ቀዝቃዛና እርጥብ ቦታዎች ነው. በቤሪዎቹ ላይ ያለው ኢንፌክሽን በአጠቃላይ ትንሽ ነው, በ 5 ሚሊ ሜትር ስፋት, ነገር ግን አንዳንድ ጊዜ ሙሉውን የቤሪ ፍሬዎች ይሸፍናሉ."
      },
      {
        english: "Anthracnose / Dieback",
        amharic: "Anthracnose / Dieback",
      },
      {
        english: "Monitor for this disease and treat at early stages of development on berries and branches.",
        amharic: "ይህን በሽታ ይከታተሉ እና በመጀመሪያ የእድገት ደረጃዎች በቤሪ እና ቅርንጫፎች ላይ ማከም."
      },
      {
        english: "Early symptoms may be leaf yellowing and drop of leaves that are found mid-branch, small 'spots or lesions' on ripening berries",
        amharic: "የመጀመሪያዎቹ ምልክቶች ቅጠል ወደ ቢጫነት እና በቅርንጫፍ መሃል ላይ የሚገኙት ቅጠሎች, ትንሽ 'ቦታዎች ወይም ጉዳቶች' በሚበስሉ ፍሬዎች ላይ ሊሆኑ ይችላሉ"
      },
      {
        english: "Dark browning of lateral or vertical stem(s), vertical tip die-back, and premature berry death.",
        amharic: "የጎን ወይም የቋሚ ግንድ(ዎች) ጥቁር ቡኒ፣ የቁመት ጫፍ ሞት-ኋላ እና ያለጊዜው የቤሪ ሞት።"
      },
      {
        english: "Coffee wilt disease",
        amharic: "የቡና እብጠት በሽታ",
      },
      {
        english: "It is a common wilt that results in complete death of coffee trees it infects. This vascular disease is induced by the fungal pathogen known by its (Fusarium xylarioides).",
        amharic: "በሚያጠቃው የቡና ዛፎች ሙሉ በሙሉ መሞትን የሚያስከትል የተለመደ ዊልት ነው. ይህ የደም ቧንቧ በሽታ የሚከሰተው በፈንገስ በሽታ አምጪ ተህዋሲያን (Fusarium xylarioides) ነው."
      },
      {
        english: "Due to the nature of coffee wilt disease, coffee plants often exhibit symptoms of disruption to vascular systems. Internal symptoms are disturbances to conduction of water in the plant.",
        amharic: "በቡና ዊልት በሽታ ተፈጥሮ ምክንያት የቡና ተክሎች ብዙውን ጊዜ የደም ሥር ስርአቶች ላይ የመረበሽ ምልክቶችን ያሳያሉ. የውስጥ ምልክቶች በእጽዋት ውስጥ የውሃ መተላለፍን መጣስ ናቸው."
      },
      {
        english: "External symptoms include loss of moisture on leaves, discoloration, leaf loss, dieback of the infected region, swelling of trunks, cracks in mature trees and lastly plant death",
        amharic: "ውጫዊ ምልክቶች በቅጠሎች ላይ እርጥበት ማጣት, ቀለም መቀየር, ቅጠሎች መጥፋት, የተበከለው አካባቢ መጥፋት, የዛፎች እብጠት, የበሰሉ ዛፎች ስንጥቅ እና በመጨረሻም የእፅዋት ሞት ናቸው."
      },

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
    for (const obj of data) {
      await queryInterface.bulkDelete('global_translation_metadata', { english: data[obj].english }, {}, {});
    }
  }
};
