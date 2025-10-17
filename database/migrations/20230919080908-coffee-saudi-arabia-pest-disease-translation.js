"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english:
          "Coffee berry borer is the most serious pest of coffee worldwide.",
        arabic: "حفار ثمار القهوة هو أخطر آفات القهوة في العالم.",
      },
      {
        english:
          "The female beetle bores into the berries through the navel region and makes tunnels in the hard bean, laying about 15 eggs.",
        arabic:
          "أنثى الخنفساء تحفر الثمار عبر منطقة السرة وتصنع أنفاقا في الحبة الصلبة، وتضع حوالي 15 بيضة.",
      },
      {
        english:
          "The larvae feed on the beans, making small tunnels. A typical pinhole at the tip of the berries indicates the presence of the pest, which damages young as well as ripe berries. In severe infestation, 30 to 80% of berries may be affected, resulting in heavy crop loss.",
        arabic:
          "تتغذى اليرقات على الفول، وتشكل أنفاقًا صغيرة. ويشير وجود ثقب صغير عند طرف التوت إلى وجود الآفة، مما يؤدي إلى إتلاف التوت الصغير والناضج أيضًا. وفي الإصابة الشديدة، قد يتأثر 30 إلى 80٪ من التوت مما أدى إلى خسائر فادحة في المحاصيل.",
      },
      {
        english: "Serious pest of Arabica coffee.",
        arabic: "آفة خطيرة تصيب القهوة العربية.",
      },
      {
        english: "Infested plants show external ridges around the stem.",
        arabic: "النباتات المصابة تظهر عليها نتوءات خارجية حول الساق.",
      },
      {
        english: "Affected plants also show yellowing and wilting of leaves.",
        arabic: "كما تظهر النباتات المصابة اصفرار وذبول أوراقها.",
      },
      {
        english:
          "Withered (faster in young branches and delayed in older twigs) or dried branches, attacked leaves fall prematurely.",
        arabic:
          "الذبل (أسرع في الفروع الصغيرة وتأخر في الأغصان القديمة) أو الفروع المجففة، تتساقط الأوراق المهاجمة قبل الأوان.",
      },
      {
        english: "Terminal leaves wilt, droop, and dry up.",
        arabic: "الأوراق الطرفية تذبل وتتدلى وتجف.",
      },
      {
        english:
          "Severe infestation can result in the loss of a considerable number of productive branches.",
        arabic:
          "يمكن أن تؤدي الإصابة الشديدة إلى فقدان عدد كبير من الفروع الإنتاجية.",
      },
      {
        english:
          "The larva causes damage in Arabica and Robusta coffee by boring into young stems, primary and secondary branches to feed on the wood.",
        arabic:
          "تسبب اليرقة أضرارًا في قهوة أرابيكا وروبوستا عن طريق ثقب السيقان الصغيرة والفروع الأولية والثانوية لتتغذى على الخشب.",
      },
      {
        english:
          "In the early stages of attack, young plants or branches show signs of wilting. Infested parts bear one or two holes through which pellet-like excrement of the larva hangs out and accumulates at the base of the plant.",
        arabic:
          "في المراحل الأولى من الهجوم، تظهر على النباتات أو الفروع الصغيرة علامات الذبول. وتحمل الأجزاء المصابة ثقبًا أو ثقبين يتدلى من خلالها فضلات اليرقة الشبيهة بالكريات ويتراكم في قاعدة النبات.",
      },
      {
        english: "In advanced cases, the branch or the whole plant dries up.",
        arabic: "في الحالات المتقدمة يجف الفرع أو النبات كله.",
      },
      {
        english: "Berry Borer",
        arabic: "بيري بورير",
      },
      {
        english: "White Stem Borer",
        arabic: "حفار الجذع الأبيض",
      },
      {
        english: "Shot Hole Borer",
        arabic: "حفار الثقب بالرصاص",
      },
      {
        english: "Red Borer",
        arabic: "الحفار الأحمر",
      },
      {
        english:
          "This is an important disease causing economic loss particularly in arabica coffee.",
        arabic: "هذا مرض مهم يسبب خسارة اقتصادية خاصة في القهوة العربية.",
      },
      {
        english:
          "On the lower surface of the infected leaves, small pale yellowish spots appear early after the first rains in the season.",
        arabic:
          "على السطح السفلي للأوراق المصابة تظهر بقع صغيرة صفراء شاحبة في وقت مبكر بعد هطول الأمطار الأولى في الموسم.",
      },
      {
        english:
          "These spots soon increase in size and number, and many such spots coalesce at severity causing premature defoliation.severe defoliation leads to debilitation of the bushes and results in poor cropping in the succeeding seasons.",
        arabic:
          "سرعان ما تزداد هذه البقع في الحجم والعدد، وتتجمع العديد من هذه البقع عند شدة مما يسبب تساقط الأوراق المبكر. ويؤدي تساقط الأوراق الشديد إلى إضعاف الشجيرات ويؤدي إلى ضعف المحاصيل في المواسم التالية.",
      },
      {
        english:
          "Necrotic spots on the exposed surface of green berries enlarge and cover the major portion.",
        arabic:
          "البقع النخرية الموجودة على السطح المكشوف للتوت الأخضر تتوسع وتغطي الجزء الأكبر.",
      },
      {
        english: "Fruit skin shrivels and sticks fast to the parchment.",
        arabic: "قشرة الفاكهة تذبل وتلتصق بسرعة بالرق.",
      },
      {
        english:
          "The centers of the spots turn grayish-white and are encircled by a distinct ring (0.2–0.6 inches in diameter) of brown tissue",
        arabic:
          "تتحول مراكز البقع إلى اللون الأبيض المائل للرمادي وتحيط بها حلقة مميزة (قطرها 0.2-0.6 بوصة) من الأنسجة البنية",
      },
      {
        english:
          "Circular brown spots with light-brown/grey centers, surrounded by a wide dark brown ring and and yellow halos, around 15 mm wide appear on leaves",
        arabic:
          "بقع بنية دائرية ذات مراكز بنية فاتحة/رمادية، محاطة بحلقة بنية داكنة واسعة وهالات صفراء، بعرض حوالي 15 ملم تظهر على الأوراق",
      },
      {
        english:
          "The spots mostly occur between the veins and also on the margins. Sometimes spots grow into large blotches, and a leaf bligh occurs.",
        arabic:
          "تحدث البقع في الغالب بين الأوردة وأيضًا على الهوامش. وفي بعض الأحيان تنمو البقع إلى بقع كبيرة، ويحدث تمزق الأوراق.",
      },
      {
        english:
          "This usually happens in cooler, wet areas above 600 m altitude. Infections on the berries are generally smaller, around 5 mm wide, but sometimes they cover the whole berry.",
        arabic:
          "يحدث هذا عادةً في المناطق الباردة والرطبة التي يزيد ارتفاعها عن 600 متر. تكون العدوى على التوت أصغر عمومًا، ويبلغ عرضها حوالي 5 ملم، ولكنها في بعض الأحيان تغطي التوت بأكمله.",
      },
      {
        english:
          "Monitor for this disease and treat at early stages of development on berries and branches.",
        arabic:
          "مراقبة هذا المرض وعلاجه في المراحل المبكرة من التطور على التوت والفروع.",
      },
      {
        english:
          "Early symptoms may be leaf yellowing and drop of leaves that are found mid-branch, small 'spots or lesions' on ripening berries",
        arabic:
          "قد تكون الأعراض المبكرة عبارة عن اصفرار الأوراق وتساقط الأوراق الموجودة في منتصف الفرع، أو وجود بقع أو آفات صغيرة على الثمار الناضجة",
      },
      {
        english:
          "Dark browning of lateral or vertical stem(s), vertical tip die-back, and premature berry death.",
        arabic:
          "التحول إلى اللون البني الداكن للساق (السيقان) الجانبية أو الرأسية، وتراجع الطرف العمودي، وموت التوت المبكر.",
      },
      {
        english: "Leaf Rust",
        arabic: "صدأ الأوراق",
      },
      {
        english: "Berry Blotch",
        arabic: "بيري بلوتش",
      },
      {
        english: "Cercospora Leaf Spot",
        arabic: "بقعة أوراق السيركوسبورا",
      },
      {
        english: "Anthracnose / Dieback",
        arabic: "أنثراكنوز / ديباك",
      },
      {
        english: "Coffee (saudi arabia)",
        arabic: "القهوة (المملكة العربية السعودية)",
      },
      {
        english: "Leaf bud formation stage",
        arabic: "مرحلة تكوين برعم الورقة",
      },
      {
        english: "Flowwering stage",
        arabic: "مرحلة الإزهار",
      },
      {
        english: "Bean filling stage",
        arabic: "مرحلة تعبئة الفول",
      },
      {
        english: "Maturity/harvesting stage",
        arabic: "مرحلة النضج/الحصاد",
      },
      {
        english: "Self pruning stage",
        arabic: "مرحلة التقليم الذاتي",
      },
      {
        english: "Vegetative stage",
        arabic: "المرحلة الخضرية",
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
