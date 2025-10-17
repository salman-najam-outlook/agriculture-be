'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Plants weakened by a lack of proper fertilizer or poor soils are more likely to be attacked than young, vigorously growing plants.",
        arabic: "من المرجح أن يتعرض النباتات التي تضعف نتيجة نقص التسميد السليم أو التربة الفقيرة أكثر من النباتات الشابة والتي تنمو بقوة."
      },
      {
        english: "Early symptoms of fruit blotch on foliage are useful in diagnosis. Small, water-soaked areas (a few millimeters in diameter) on cotyledons or leaves may develop, but they are easily overlooked.",
        arabic: "تكون أعراض مبكرة لبقع الثمار على الأوراق مفيدة في التشخيص. يمكن أن تتطور مناطق صغيرة مشربة بالماء (بقطر بضعة ملمترات) على الأوراق الأولية أو الأوراق، ولكن من السهل تجاهلها."
      },
      {
        english: "These later turn brown, but they remain small and do not severely damage leaves. However, the leaf spots serve as a source of the pathogen to infect fruit.",
        arabic: "تتحول هذه بعد ذلك إلى اللون البني، لكنها تبقى صغيرة ولا تلحق أضرارًا شديدة بالأوراق. ومع ذلك، تعتبر بقع الأوراق مصدرًا للممرض للعدوى الثمار."
      },
      {
        english: "Fruit infections first appear as small, water-soaked areas on the upper surface of melons.",
        arabic: "تظهر العدوى بالثمار أولاً على شكل مناطق صغيرة مشربة بالماء على السطح العلوي للبطيخ."
      },
      {
        english: "Initially, the blotches do not extend into the rind, but affected rinds eventually crack and become invaded by secondary pathogens.",
        arabic: "في البداية، لا تمتد البقع إلى القشرة، ولكن القشور المصابة في النهاية تتشقق وتصبح معرضة للهجوم من قبل الأمراض الفطرية الثانوية."
      },
      {
        english: "The disease is mostly confined to leaves, but stems and petioles may become diseased.",
        arabic: "المرض يقتصر بشكل أساسي على الأوراق، لكن السيقان والعناقيد قد تصبح مصابة."
      },
      {
        english: "Leaf spots first appear on younger leaves as small circular spots having dark green to purple margins, becoming white to light tan in the center.",
        arabic: "تظهر بقع الأوراق أولاً على الأوراق الصغيرة كبقع دائرية صغيرة لها حواف خضراء داكنة إلى بنفسجية، ثم تصبح بيضاء إلى بيج فاتح في المنتصف."
      },
      {
        english: "The leaf lamina around the spots may become chlorotic and eventually the entire leaf may turn yellow and fall off.",
        arabic: "قد تصبح الغشاء الورقي حول البقع كلوروتيكيًا وفي النهاية قد تتحول الأوراق بأكملها إلى اللون الأصفر وتتساقط."
      },
      {
        english: "Symptoms of mosaic appear on the youngest leaves when infection occurs at 6 – 8 leaves stage.",
        arabic: "تظهر أعراض الفسيفساء على الأوراق الصغيرة الأكثر شبابًا عندما يحدث العدوى في مرحلة 6-8 أوراق."
      },
      {
        english: "Leaves curl downwards and become mottled, distorted, wrinkled and reduced in size.",
        arabic: "تنطوي الأوراق للأسفل وتصبح متموجة ومشوهة ومجعدة وتصغر في الحجم."
      },
      {
        english: "Veins appear bunchy because of shortening of internodes.",
        arabic: "الأوردة تبدو متجمعة بسبب اختصار الفواصل بين العقد."
      },
      {
        english: "It is evident as a superficial, powdery, grayish-white growth on upper leaf surfaces, petioles, and even main stems of infected plants.",
        arabic: "يظهر على شكل نمو سطحي رقيق باللون الرمادي الأبيض المسود على السطوح العلوية للأوراق، والعناقيد، وحتى السيقان الرئيسية للنباتات المصابة."
      },
      {
        english: "Affected areas turn yellow then brown and die.",
        arabic: "تتحول المناطق المصابة إلى اللون الأصفر ثم البني وتموت."
      },
      {
        english: "Some early disease results from spores produced on overwintering cucurbit debris or weeds but the major source of disease inoculum is windblown spores from southern crops.",
        arabic: "تنتج بعض الإصابات المبكرة نتيجة للبواغي المنتجة على الحطام أو الأعشاب الطويلة البقاء لفصل الشتاء لكن المصدر الرئيسي لعوامل العدوى للمرض هو البواغي التي تنقلها الرياح من المحاصيل الجنوبية."
      },
      {
        english: "Symptoms first appear as dull, greyish green appearance to the foliage.",
        arabic: "تظهر الأعراض أولاً على شكل مظهر أخضر رمادي غامق باهت على الأوراق."
      },
      {
        english: "Affected vines wilt, become dry, turn brown and die.",
        arabic: "السيقان المصابة تتذبذب، وتصبح جافة، وتتحول إلى اللون البني وتموت."
      },
      {
        english: "Elongated brown lesions (dead areas) may develop along stems near the crown.",
        arabic: "قد تظهر تطورات على شكل بقع بنية ممتدة (مناطق ميتة) على طول السيقان بالقرب من الجذور."
      },
      {
        english: "Infected stems first appear water-soaked and then become dry, coarse, and tan.",
        arabic: "تبدو السيقان المصابة أولاً كمشروبة بالماء ثم تصبح جافة وخشنة ولونها بني."
      },
      {
        english: "Older stem lesions (dead tissue) reveal small black fruiting bodies (pycnidia) within the affected tissues.",
        arabic: "تكشف التطورات القديمة للأنسجة في السيقان (الأنسجة الميتة) عن جسيمات صغيرة سوداء للجسيمات المثمرة (بايسنيديا) داخل الأنسجة المتأثرة."
      },
      {
        english: "Stem lesions on melons exude a gummy, red-brown substance which may be mistaken for a symptom of Fusarium wilt.",
        arabic: "تفرز تطورات السيقان على البطيخ مادة لزجة باللون الأحمر البني يمكن أن تسبب الخطأ في التشخيص على أنها أحد أعراض مرض الذبول الفوزاري."
      },
      {
        english: "Powdery mildew first appears on the oldest leaves as yellow areas on the upper leaf surface.",
        arabic: "تظهر العفن البودري أولاً على الأوراق الأكبر سناً كمناطق صفراء على السطح العلوي للأوراق."
      },
      {
        english: "The white mildew on the underside of the leaf often can only be seen with the aid of a hand lens.",
        arabic: "العفن الأبيض على الجانب السفلي للورقة يمكن رؤيته غالبًا فقط بمساعدة عدسة اليد."
      },
      {
        english: "As the disease increases, the areas of whitish, powdery growth become more apparent and can cover both upper and lower leaf surfaces.",
        arabic: "مع تقدم المرض، تصبح مناطق النمو البيضاء البودرية أكثر وضوحًا ويمكن أن تغطي السطوح العلوية والسفلية للأوراق."
      },
      {
        english: "Initial symptoms are a slight flagging of the plants in midday even when abundant moisture is present.",
        arabic: "الأعراض الأولية هي انحناء طفيف للنباتات في وقت الظهيرة حتى عند وجود رطوبة وفيرة."
      },
      {
        english: "This flagging will continue to worsen so that, by the third or fourth day, many of the plants are completely wilted.",
        arabic: "سيستمر هذا الانحناء في التدهور بحيث يكون العديد من النباتات متذبذبة تمامًا بحلول اليوم الثالث أو الرابع."
      },
      {
        english: "Affected plants appear to lack feeder roots; other roots become slightly misshapen and thick.",
        arabic: "يبدو أن النباتات المصابة تفتقر إلى جذور الامتصاص؛ حيث تصبح الجذور الأخرى ذات شكل غير منتظم قليلاً وسميكة."
      },
      {
        english: "Symptoms are most striking on the new growth of young, rapidly growing plants.",
        arabic: "الأعراض هي أكثر إثارة على النمو الجديد للنباتات الصغيرة النمو بسرعة."
      },
      {
        english: "Leaves are dwarfed, misshapen, puckered, pale green in color, and exhibit mosaic patterns of light and dark green color.",
        arabic: "الأوراق تكون مصغرة، وغير منتظمة الشكل، ومجعدة، ولونها أخضر شاحب، وتظهر أنماط الفسيفساء بألوان خضراء فاتحة وخضراء داكنة."
      },
      {
        english: "Infected plants remain stunted throughout the season and may fail to set fruit or it will be small in size and poor in quality.",
        arabic: "النباتات المصابة تظل متقزمة طوال الموسم وقد تفشل في تكوين الثمار أو تكون صغيرة الحجم وجودة سيئة."
      },
      {
        english: "Sometimes the vine terminals of infected plants become erect and hover over the canopy.",
        arabic: "في بعض الأحيان، تصبح أطراف السيقان للنباتات المصابة مستقيمة وتتعلق فوق الغطاء."
      },
      {
        english: "Affected plants are often most numerous near edges of fields and appear in patches. Plants turn yellow and die back.",
        arabic: "غالبًا ما تكون النباتات المصابة أكثر عددًا بالقرب من حواف الحقول وتظهر على شكل تجمعات. النباتات تتحول إلى اللون الأصفر وتموت."
      },
      {
        english: "Numerous squash bugs may be present or there will be evidence of their prior feeding.",
        arabic: "قد يكون هناك العديد من حشرة القرع أو قد تكون هناك أدلة على تغذيتهم السابقة."
      },
      {
        english: "When basal stems of affected plants are cross-sectioned, a ring of light brown discoloration is evident around the outer part (phloem) of the vascular core.",
        arabic: "عند قص سيقان النباتات المتضررة عرضيًا، يتضح وجود حلقة من التلون البني الفاتح حول الجزء الخارجي (البلعم) للنواة الوعائية."
      },
      {
        english: "Aboveground, plants affected by root-knot nematode appear yellowed, stunted, or generally unthrifty.",
        arabic: "فوق الأرض، يظهر النباتات المتأثرة بالنيماتودا التي تسبب عقد الجذور باللون الأصفر، وتكون متقزمة، أو غالباً ما تكون في حالة غير صحية."
      },
      {
        english: "Affected areas often occur as patchy areas in a field or along a row of plants.",
        arabic: "غالبًا ما تحدث المناطق المتضررة كمناطق متقطعة في الحقل أو على طول صف نباتات."
      },
      {
        english: "Affected roots are disfigured, swollen, and stubby in appearance.",
        arabic: "الجذور المتضررة تكون مشوهة ومتورمة وقصيرة الطول في المظهر."
      },
      {
        english: "Symptoms first appear as yellowed wedge-shaped areas on older leaves, which eventually develop brown sectors.",
        arabic: "تظهر الأعراض أولاً على شكل مناطق على شكل مثلث أصفر على الأوراق القديمة، والتي تتطور في نهاية المطاف إلى مناطق بنية."
      },
      {
        english: "Crown leaves collapse and wilt extends along individual vines.",
        arabic: "تنهار أوراق التاج ويمتد الذبول على طول السيقان الفردية."
      },
      {
        english: "Wilt symptoms often are one-sided, in that individual vines wilt before the entire plant dies.",
        arabic: "عادةً ما تكون أعراض الذبول من جانب واحد، بحيث تذبل السيقان الفردية قبل أن يموت النبات بأكمله."
      },
      {
        english: "Externally gradual yellowing and drying of foliage, shrinkage/withering of canes.",
        arabic: "تصفر التدريجي وتجفيف الأوراق من الخارج، انكماش / ذبول الأعناب."
      },
      {
        english: "Some symptoms",
        arabic: "بعض الأعراض"
      },
      {
        english: "Custom Symptom 2",
        arabic: "أعراض مخصصة 2"
      },
      {
        english: "Circular lesions and black patches on chili pods",
        arabic: "تصنع اللويحات الدائرية والبقع السوداء على قرون الفلفل."
      },
      {
        english: "Irregular brown spots with dark brown holes on leaves and stems",
        arabic: "بقع بنية غير منتظمة مع ثقوب بنية داكنة على الأوراق والسيقان."
      },
      {
        english: "The affected fruits may fall off subsequently",
        arabic: "قد تتساقط الثمار المتضررة فيما بعد"
      },
      {
        english: "Black lesions on stems",
        arabic: "البقع السوداء على السيقان"
      },
      {
        english: "Circular gray-brown lesions on leaves and wilting the plant",
        arabic: "اللويحات الدائرية اللون الرمادي البني على الأوراق وذبول النبات"
      },
      {
        english: "Dark lesions on fruit which may be covered in white sporangia",
        arabic: "البقع الداكنة على الفاكهة والتي قد تكون مغطاة ببيضات بيضاء"
      },
      {
        english: "Upward curling in the leaves, crinkling appearance",
        arabic: "لف في الأوراق لأعلى، مظهر متجعد"
      },
      {
        english: "Shortening of petioles, internodes, and bunchy leaves",
        arabic: "تقصير السيقان والبينيات والأوراق المتجمعة"
      },
      {
        english: "Severe stunting in plants",
        arabic: "تقزم شديد في النباتات"
      },
      {
        english: "The leaves turn yellow and die",
        arabic: "تصفر الأوراق وتموت"
      },
      {
        english: "Initial slight yellowing of the foliage and wilting of the upper leaves",
        arabic: "اصفرار خفيف في الأوراق وذبول الأوراق العليا في البداية"
      },
      {
        english: "The vascular system of the plant is discolored",
        arabic: "الجهاز الوعائي للنبات ملون"
      },
      {
        english: "Corollas of expanded blossoms appear blighted; brown lesions on leaves which have come into contact with infected blossoms.",
        arabic: "تبدو أزهار مزدهرة متعفنة؛ بقع بنية على الأوراق التي جاءت في اتصال مع الأزهار المصابة."
      },
      {
        english: "Infected blossoms do not produce fruit",
        arabic: "الأزهار المصابة لا تنتج ثمارًا"
      },
      {
        english: "In large fields, severe infections are often visible as brown patches",
        arabic: "في الحقول الكبيرة، غالبًا ما تكون العدوى الشديدة مرئية كبقع بنية"
      },
      {
        english: "Infected berries are cream or pink in color and turn tan or gray",
        arabic: "الثمار المصابة باللون الكريمي أو الوردي وتتحول إلى اللون البني أو الرمادي"
      },
      {
        english: "Berries become shriveled and hard; shriveled skin of fruit breaks down to expose black rind of fungal tissue",
        arabic: "تصبح الثمار متقشرة وصلبة؛ تتفتت الجلد المتقشر للفاكهة ليظهر القشر الأسود للأنسجة الفطرية"
      },
      {
        english: "Death of infected shoots, leaves, and flowers",
        arabic: "موت الأفرع والأوراق والزهور المصابة"
      },
      {
        english: "White fluffy growth on the upper surfaces of leaves or the lower leaf surface",
        arabic: "نمو أبيض مصفوف على الأسطح العلوية للأوراق أو السطح السفلي للأوراق"
      },
      {
        english: "Leaves may be puckered in appearance; leaves may develop chlorotic spots with red borders",
        arabic: "قد تكون الأوراق متجعدة في المظهر؛ قد تظهر على الأوراق بقع كلوروتيك بحدود حمراء"
      },
      {
        english: "Leaves may drop from the plant",
        arabic: "قد تتساقط الأوراق من النبات"
      },
      {
        english: "Elongated reddish streaks on green stems, purplish red leaves, cupped leaves.",
        arabic: "خطوط حمراء ممتدة على السيقان الخضراء، أوراق حمراء زهرية، أوراق مجعدة."
      },
      {
        english: "Leaves may be elongated or strap-like.",
        arabic: "قد تكون الأوراق ممتدة أو شبيهة بالأشرطة."
      },
      {
        english: "Reddish-purple fruit",
        arabic: "فاكهة بلون أحمر أرجواني"
      },
      {
        english: "It is a soil-borne disease caused by the fungus Sclerotiniascelorotiorum.",
        arabic: "إنها مرض محمول عبر التربة يسببه فطر السليروتينيا سيلوروتيوروم."
      },
      {
        english: "The white rust fungus attacks the lower surface of the outer leaves, and plants suddenly die.",
        arabic: "فطر الصدأ الأبيض يهاجم السطح السفلي للأوراق الخارجية، والنباتات تموت فجأة."
      },
      {
        english: "White rust is an obligate parasite that attacks vegetative and flowering structures of the plants and can cause yellow lesions on the upper surface",
        arabic: "الصدأ الأبيض هو طفيلي إكراهي يهاجم الهياكل الخضرية والمزهرة للنباتات وقد يسبب تصبغات صفراء على السطح العلوي"
      },
      {
        english: "The young radical and the plumule are killed and there is complete rotting of the seedlings",
        arabic: "الجذر الشاب والزمبرة يموتان وهناك تعفن كامل للشتلات"
      },
      {
        english: "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level",
        arabic: "يتميز مرحلة ما بعد الظهور بالعدوى للأنسجة الصغيرة والشابة للقاعدة على سطح الأرض"
      },
      {
        english: "The seedlings topple over or  collapse",
        arabic: "الشتلات تنقلب أو تنهار"
      },
      {
        english: "First appear as chlorotic or yellow (angular) areas near the leaf margins",
        arabic: "تظهر أولاً كمناطق صفراء أو كلوروزية (زاوية) بالقرب من حواف الأوراق"
      },
      {
        english: "Yellow area extends to veins and midrib forming characteristic ‘v’ shaped chlorotic spots which later turn black",
        arabic: "المنطقة الصفراء تمتد إلى الأوردة والعرق وتكوين بقع كلوروزية بشكل حرف 'V' والتي تتحول فيما بعد إلى اللون الأسود"
      },
      {
        english: "Veins and veinlets turn brown and finally black",
        arabic: "الأوردة والوريدات تتحول إلى اللون البني وأخيراً إلى اللون الأسود"
      },
      {
        english: "Small purplish brown spots on the under surface of leaves",
        arabic: "بقع بنية صغيرة زهرية على السطح السفلي للأوراق"
      },
      {
        english: "Small, pale yellow angular spots on upper surface of leaves, with downy growth on the under surface",
        arabic: "بقع صفراء صغيرة زاوية فاتحة على السطح العلوي للأوراق، مع نمو مكتنز على السطح السفلي"
      },
      {
        english: "The spots coalesce and the leaves shrivel and dries up prematurel",
        arabic: "تتلاقى البقع وتتجف وتذبل الأوراق مبكرًا"
      },
      {
        english: "The first signs of the disease are observed in the tree canopy.",
        arabic: "تُلاحظ أول علامات المرض في سقف الشجرة."
      },
      {
        english: "Leaves are small, pale green, often wilted with brown tips, and drop readily.",
        arabic: "الأوراق صغيرة ولونها أخضر فاتح غالبًا ما تتجعد مع أطراف بنية وتتساقط بسهولة."
      },
      {
        english: "Shoots die back from the tips, and eventually the tree is reduced to a bare framework of dying branches.",
        arabic: "تموت الأفرع من الأطراف إلى الوراء، وفي نهاية المطاف يتم تقليل الشجرة إلى هيكل عاري من الفروع الميتة."
      },
      {
        english: "Plants can get anthracnose at any stage, but it causes the most damage between flowering and harvesting.",
        arabic: "يمكن للنباتات أن تصاب بالأنثراكنوز في أي مرحلة، لكنها تتسبب في أكبر أضرارها بين الإزهار والحصاد."
      },
      {
        english: "Dry spots, dark brown in color, form on the skin, leading to abnormal development.",
        arabic: "تتكون بقع جافة بلون بني داكن على الجلد، مما يؤدي إلى تطور غير طبيعي."
      },
      {
        english: "In severe attacks, the young fruits drop.",
        arabic: "في الهجمات الشديدة، تتساقط الثمار الصغيرة."
      },
      {
        english: "Symptoms occur on leaves, fruit, twigs and fruit stems at any time during the growing season",
        arabic: "تظهر الأعراض على الأوراق والثمار والفروع وسيقان الثمار في أي وقت خلال موسم النمو"
      },
      {
        english: "Small, light-yellow spots later changing to reddish-brown appear on fruits and leaves which eventually become hard and crack.",
        arabic: "تظهر بقع صغيرة صفراء فاتحة لاحقًا تتحول إلى بني أحمر على الثمار والأوراق التي تصبح في النهاية صلبة ومتشققة."
      },
      {
        english: "On fruit, the first sign of infection is a darkening of the epidermis followed by swelling of the underlying tissues which raises a small dark spot.",
        arabic: "على الفاكهة، أول علامة للعدوى هي اسمرار البشرة الخارجية تليها انتفاخ للأنسجة الداخلية مما يؤدي إلى ظهور بقعة داكنة صغيرة."
      },
      {
        english: "Symptoms on fruit initially appear as corky, raised, oval or irregular shaped brown to purplish-brown spots.",
        arabic: "تظهر الأعراض على الفاكهة في البداية على شكل بقع بنية إلى بنية أرجوانية مرتفعة أو بشكل بلي، بينما تميل إلى أن تكون المسامير كميمات،"
      }
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
