"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        english: "Powdery mildew",
        arabic: "البياض الدقيقي",
      },
      {
        english: "Foot rot",
        arabic: "تعفن القدم",
      },
      {
        english: "Anthracnose",
        arabic: "أنثراكنوز",
      },
      {
        english: "Papaya ring spot",
        arabic: "بقعة حلقة البابايا",
      },
      {
        english:
          "On the undersurface of disease leaves are found patches of whitish powder growth",
        arabic:
          "توجد على السطح السفلي لأوراق المرض بقع من نمو مسحوق أبيض اللون",
      },
      {
        english:
          "On upper surfaces, leaves at the infection site show blotches of yellow or pale green usually near vein, surrounded by normally colored tissue.",
        arabic:
          "على الأسطح العلوية، تظهر على الأوراق في موقع الإصابة بقع صفراء أو خضراء شاحبة عادة بالقرب من الوريد، محاطة بأنسجة ملونة بشكل طبيعي.",
      },
      {
        english:
          "Occasionally, fungus may attack the stem of young seedling when grown under reduced light condition.",
        arabic:
          "في بعض الأحيان، قد تهاجم الفطريات ساق الشتلات الصغيرة عندما تنمو تحت ظروف الإضاءة المنخفضة.",
      },
      {
        english:
          "It is characterized by the appearance of water-soaked patches on the stem near the ground level.",
        arabic:
          "ويتميز بظهور بقع مبللة بالماء على الساق بالقرب من مستوى الأرض.",
      },
      {
        english:
          "These patches enlarge rapidly and girdle the stem, causing rotting of the tissues, which then turn dark brown or black. If the disease attack is mild, only one side of the stem rots and the plants remain stunted.",
        arabic:
          "تتضخم هذه البقع بسرعة وتطوق الجذع، مما يتسبب في تعفن الأنسجة، التي تتحول بعد ذلك إلى اللون البني الداكن أو الأسود. وإذا كانت نوبة المرض خفيفة، فإن جانبًا واحدًا فقط من الجذع يتعفن وتظل النباتات متقزمة.",
      },
      {
        english:
          "Fruit if formed are shriveled and malformed. Gradually the plant dies.",
        arabic: "الثمرة إذا تشكلت تذبل وتتشوه. ويموت النبات تدريجياً.",
      },
      {
        english:
          "The disease occurs both in the field and in storage conditions.",
        arabic: "يحدث المرض في الحقل وفي ظروف التخزين.",
      },
      {
        english:
          "The spots on fruits first appear as brown superficial discoloration of the skin which develops into circular, slightly sunken areas and 1 to 3 cm in dia.",
        arabic:
          "تظهر البقع على الثمار أولاً على شكل تغير سطحي بني في لون الجلد يتطور إلى مناطق دائرية غائرة قليلاً ويبلغ قطرها من 1 إلى 3 سم.",
      },
      {
        english:
          "Gradually the lesions coalesce and sparse mycelia growth appears on the margins of the spots.",
        arabic: "تتجمع الآفات تدريجيًا ويظهر نمو فطري متفرق على أطراف البقع.",
      },
      {
        english:
          "Infected plant initially shows chlorosis on youngest leaves followed by vein clearing, rugosity and prominent mottling of laminae.",
        arabic:
          "يظهر النبات المصاب في البداية داء الاخضرار على الأوراق الحديثة، يتبعه تطهير الأوردة، والخشونة، وتبقع الصفيحة بشكل بارز.",
      },
      {
        english:
          "Malformation and reduction of the lamina which may become extremely filiform.",
        arabic: "تشوه وتقليص الصفيحة التي قد تصبح خيطية للغاية.",
      },
      {
        english:
          "Characteristically elongated dark green streak develop on petiole and upper half of the stems, infected fruits show circular concentric rings causes upto 56-60 % yield loss.",
        arabic:
          "يتطور خط أخضر داكن ممدود بشكل مميز على سويقات والنصف العلوي من السيقان، وتظهر الثمار المصابة حلقات دائرية متحدة المركز مما يؤدي إلى خسارة تصل إلى 56-60٪ في المحصول.",
      },
      {
        english: "Mealy bug",
        arabic: "حشرة دقيقة",
      },
      {
        english: "Aphids",
        arabic: "المن",
      },
      {
        english: "Fruit fly",
        arabic: "ذبابة الفاكهة",
      },
      {
        english: "Grasshopper",
        arabic: "الجراد",
      },
      {
        english:
          "Flattened oval to round disc-like insect covered in waxy substance on tree branches",
        arabic:
          "حشرة مسطحة بيضاوية إلى قرصية مستديرة الشكل ومغطاة بمادة شمعية على أغصان الأشجار",
      },
      {
        english: "Insects attract ants which may also be present",
        arabic: "الحشرات تجذب النمل الذي قد يكون موجودا أيضا",
      },
      {
        english:
          "Insect colony may also be associated with growth of sooty mold due to fungal colonization of sugary honeydew excreted by the insect",
        arabic:
          "قد تترافق مستعمرة الحشرات أيضًا مع نمو العفن السخامي بسبب الاستعمار الفطري للندوة العسلية التي تفرزها الحشرة",
      },
      {
        english: "Colonize on the underside of tender leaves",
        arabic: "الاستعمار على الجانب السفلي من أوراق العطاء",
      },
      {
        english: "Premature shedding of flowers and curling of leaves",
        arabic: "تساقط الزهور مبكرًا وتجعد الأوراق",
      },
      {
        english: "Wilting and distortion of leaves and young shoots",
        arabic: "ذبول وتشوه الأوراق والبراعم الصغيرة",
      },
      {
        english:
          "The female punctures outer wall of mature fruits with the help of its pointed ovipositor and insert eggs in small clusters inside mesocarp of mature fruits",
        arabic:
          "تقوم الأنثى بثقب الجدار الخارجي للثمار الناضجة بمساعدة جهاز وضع البيض المدبب وإدخال البيض في مجموعات صغيرة داخل ميزوكارب الثمار الناضجة",
      },
      {
        english: "On hatching, the maggots feed on fruit pulp",
        arabic: "عند الفقس، تتغذى الديدان على لب الفاكهة",
      },
      {
        english:
          "The infested fruits start rotting due to further secondary infection",
        arabic: "الثمار المصابة تبدأ بالتعفن بسبب المزيد من العدوى الثانوية",
      },
      {
        english:
          "Both nymphs and adults suck the sap from the lower leaf surfaces which leads to yellowing",
        arabic:
          "تمتص كل من الحوريات والبالغات النسغ من أسطح الأوراق السفلية مما يؤدي إلى الاصفرار",
      },
      {
        english:
          "When several insects suck the sap from the same leaf, yellow spots appear on the leaves",
        arabic:
          "عندما تمتص عدة حشرات النسغ من نفس الورقة، تظهر بقع صفراء على الأوراق",
      },
      {
        english: "Crinkling, curling, bronzing, and drying, or “hopper burn”",
        arabic: "التجعيد، والتجعيد، والبرونز، والتجفيف، أو حرق القادوس",
      },
      {
        english: "Papaya (Saudi Arabia)",
        arabic: "البابايا (المملكة العربية السعودية)",
      },
      {
        english: "Red lady",
        arabic: "سيدة حمراء",
      },
      {
        english: "Red bella",
        arabic: "بيلا حمراء",
      },
      {
        english: "Potato (Saudi Arabia)",
        arabic: "البطاطس (المملكة العربية السعودية)",
      },
      {
        english: "Spunta",
        arabic: "سبونتا",
      },
      {
        english: "Ajax",
        arabic: "اياكس",
      },
      {
        english: "Mirka",
        arabic: "ميركا",
      },
      {
        english: "Diamont",
        arabic: "ديامونت",
      },
      {
        english: "Espunta",
        arabic: "اسبونتا",
      },
      {
        english: "Citrix",
        arabic: "سيتريكس",
      },
      {
        english: "Frizia",
        arabic: "فريزيا",
      },
      {
        english: "Kawalic",
        arabic: "كواليتش",
      },
      {
        english: "Aboulx",
        arabic: "أبوليكس",
      },
      {
        english: "Mondial",
        arabic: "مونديال",
      },
      {
        english: "Victoria",
        arabic: "فيكتوريا",
      },
      {
        english: "Safaren",
        arabic: "سافرين",
      },
      {
        english: "Edward",
        arabic: "إدوارد",
      },
      {
        english: "Etfadoal",
        arabic: "اتفاضال",
      },
      {
        english: "Date Palm (Saudi arabia)",
        arabic: "نخيل التمر (المملكة العربية السعودية)",
      },
      {
        english: "Ajwa",
        arabic: "عجوة",
      },
      {
        english: "Safawi",
        arabic: "صفوي",
      },
      {
        english: "Khalas",
        arabic: "خلاص",
      },
      {
        english: "Sukkari",
        arabic: "السكري",
      },
      {
        english: "Khadrawy",
        arabic: "الخضراوي",
      },
      {
        english: "Olive (Saudi Arabia)",
        arabic: "الزيتون (المملكة العربية السعودية)",
      },
      {
        english: "Arbosona",
        arabic: "أربوسونا",
      },
      {
        english: "Arbequina",
        arabic: "أربيكوينا",
      },
      {
        english: "Picual",
        arabic: "بيكوال",
      },
      {
        english: "Koroneiki",
        arabic: "كورنيليوس",
      },
      {
        english: "Kaissy H-85",
        arabic: "كيسي H-85",
      },
      {
        english: "Picual H-78",
        arabic: "بيكوال H-78",
      },
      {
        english: "Sorani",
        arabic: "الصوراني",
      },
      {
        english: "K-18",
        arabic: "ك-18",
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
