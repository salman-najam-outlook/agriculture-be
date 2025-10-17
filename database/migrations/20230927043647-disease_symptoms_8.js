'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "As the disease progresses, spots enlarge and coalesce to form large rough areas over the fruit surface.",
        arabic: "مع تقدم المرض، تتكبد البقع وتتلاقى لتكوين مناطق كبيرة خشنة على سطح الفاكهة."
      },
      {
        english: "Cracking of these rough areas may allow secondary organisms to penetrate and rot the fruit.",
        arabic: "قد تسمح تشققات هذه المناطق الخشنة بانتشار الكائنات الثانوية لاختراق الفاكهة وتعفنها."
      },
      {
        english: "The most visible symptom is a bright bronze to red coloration of the leaves of the young plant or a pinkish and/or yellowish coloration of the older leaves.",
        arabic: "أبرز عرض هو احمرار الأوراق من اللون البرونزي الزاهي إلى اللون الأحمر عند النبات الصغير أو احمرار و/أو صفراء عند الأوراق الأكبر سنًا."
      },
      {
        english: "Wilting starts at the tip of the leaves.",
        arabic: "الذبول يبدأ من طرف الأوراق."
      },
      {
        english: "If the plants continue to grow, the leaves lose turgidity and curl outwards",
        arabic: "إذا استمر النبات في النمو، تفقد الأوراق الانتفاخ وتلتوي للخارج"
      },
      {
        english: "These fungal problems are caused by various Phytophthora and Pythium species.",
        arabic: "هذه المشاكل الفطرية تسببها أنواع مختلفة من أنواع Phytophthora و Pythium."
      },
      {
        english: "The symptoms of root rots are a reduction in plant growth with the development of reddish-colored leaves and the browning of the leaf margins.",
        arabic: "أعراض تعفن الجذور تشمل انخفاض نمو النبات مع تطور أوراق ذات لون أحمر واحتراق حواف الأوراق."
      },
      {
        english: "Affected plants eventually die",
        arabic: "النباتات المتأثرة تموت في النهاية"
      },
      {
        english: "The symptoms are rotting at the base of the leaves in the center of the leaf whorl (heart) of young non-flowering plants.",
        arabic: "الأعراض تشمل تعفن قاعدة الأوراق في وسط دوائر الأوراق (القلب) للنباتات الصغيرة غير المزهرة."
      },
      {
        english: "In a more developed stage, young leaves can easily be pulled from the plant.",
        arabic: "في مرحلة أكثر تطورًا، يمكن سحب الأوراق الصغيرة بسهولة من النبات."
      },
      {
        english: "The base of the leaves eventually rots and has a bad smell.",
        arabic: "قاعدة الأوراق تتعفن في النهاية وتصدر رائحة كريهة."
      },
      {
        english: "Fruitlet Core Rot is caused by a combination of Penicillium and Fusarium spp.",
        arabic: "يسبب تعفن نواة الثمار مزيج من أنواع الفطريات Penicillium و Fusarium."
      },
      {
        english: "Although the symptoms of this disease generally appear during storage, infection starts in the field. Mites are thought to be associated with this disease, through causing injury to the fruitlets.",
        arabic: "على الرغم من أن أعراض هذا المرض تظهر عادة أثناء التخزين، إلا أن العدوى تبدأ في الحقل. يُعتقد أن الفايات مرتبطة بهذا المرض من خلال تسببها في إصابة الثمرات."
      },
      {
        english: "The infected tissue of the fruit has a water-soaked appearance which eventually discolours becoming light to dark brown.",
        arabic: "الأنسجة المصابة في الفاكهة تظهر بمظهر مشبع بالماء والذي يتحول في النهاية إلى لون بني فاتح إلى داكن."
      },
      {
        english: "The leaves of the affected plants become yellow.",
        arabic: "أوراق النباتات المتأثرة تصبح صفراء."
      },
      {
        english: "Water soaked appearance is found at the base of the pseudostem and rotting takes place at the basal portion.",
        arabic: "يتم العثور على مظهر مشبع بالماء في قاعدة الساق الزائفة ويحدث التعفن في الجزء القاعدي."
      },
      {
        english: "The affected rhizomes become soft and pulpy and plants easily collapse on pressing.",
        arabic: "تصبح الدرنات المتأثرة طرية ولبنية وتنهار النباتات بسهولة عند الضغط عليها."
      },
      {
        english: "The spots of 1-2mm diameter appear in more numbers, covering both sides of leaf.",
        arabic: "تظهر بقع قطرها 1-2 مم بأعداد أكبر، تغطي كلتا جانبي الورقة."
      },
      {
        english: "The attacked leaf presents a reddish-brown appearance instead of the normal green color.",
        arabic: "الورقة المصابة تظهر بلون بني أحمر بدلاً من اللون الأخضر الطبيعي."
      },
      {
        english: "These spots coalesce to form irregular bigger patches.",
        arabic: "هذه البقع تتلاقى لتكوين تجمعات غير منتظمة أكبر."
      },
      {
        english: "The symptoms of the disease start as a water-soaked spot and later turns as a white spot surrounded by dark brown margins and a yellow halo.",
        arabic: "تبدأ أعراض المرض كبقعة مشبعة بالماء وتتحول لاحقًا إلى بقعة بيضاء محاطة بحواف بنية داكنة وهالة صفراء."
      },
      {
        english: "Yello halo",
        arabic: "هالة صفراء"
      },
      {
        english: "The lesions enlarge and adjacent lesions coalesce to form necrotic areas.",
        arabic: "تتوسع البقع وتتلاقى البقع المجاورة لتكوين مناطق نخرية."
      },
      {
        english: "Wilting",
        arabic: "الذبول"
      },
      {
        english: "Wilting of leaves",
        arabic: "الذبول الأوراق"
      },
      {
        english: "Stunted growth",
        arabic: "النمو البطيء"
      },
      {
        english: "Small brown lesions near top of berries (early on)",
        arabic: "بقع بنية صغيرة بالقرب من أعلى الثمار (في وقت مبكر)"
      },
      {
        english: "Powdery dead young leaves",
        arabic: "أوراق شابة جافة مسحوقة"
      },
      {
        english: "Soft and mushy rotten holes or areas on fruit",
        arabic: "فتحات أو مناطق رطبة ومتسخة على الفاكهة"
      },
      {
        english: "An early symptom of the disease is upward curling of the leaf margins.",
        arabic: "واحدة من أعراض المرض في مراحله المبكرة هي تجعيد حواف الأوراق لأعلى."
      },
      {
        english: "White powdery splotches on the top of leaves or stems",
        arabic: "بقع مسحوقية بيضاء على الجزء العلوي من الأوراق أو السيقان"
      },
      {
        english: "Leaves look like they’re dusted with white powder (especially the underside)",
        arabic: "تبدو الأوراق وكأنها مغطاة بمسحوق أبيض (خصوصًا من الجهة السفلية)"
      },
      {
        english: "Spots may later turn into tan or white centers with rusty-brown margins",
        arabic: "قد تتحول البقع فيما بعد إلى مراكز بنية فاتحة أو بيضاء محاطة بحواف بنية صدئة"
      },
      {
        english: "Spots may merge together and kill whole leaves",
        arabic: "البقع قد تندمج معًا وتؤدي إلى موت الأوراق بأكملها"
      },
      {
        english: "Black or brown leathery texture on fruits near spots",
        arabic: "نسيج جلدي أسود أو بني على الفواكه بالقرب من البقع"
      },
      {
        english: "It is fast acting as strawberry plants can suddenly wilt and die.",
        arabic: "إنها سريعة العمل حيث يمكن لنباتات الفراولة أن تذبل فجأة وتموت."
      },
      {
        english: "This disease affects the outer leaves first; they become yellow and eventually take on a scorched appearance.",
        arabic: "هذا المرض يؤثر أولاً على الأوراق الخارجية؛ حيث تصبح صفراء وفي النهاية تبدو محروقة."
      },
      {
        english: "It enters through roots and affects the water-conducting tissues in the crown",
        arabic: "يدخل من خلال الجذور ويؤثر على أنسجة نقل الماء في الجذع"
      },
      {
        english: "Wilting foliage in spite of ample water",
        arabic: "ذبول الأوراق على الرغم من وجود ماء كافي"
      },
      {
        english: "Older leaves drying and dying off while younger leaves remain green",
        arabic: "تجف وتموت الأوراق القديمة بينما تظل الأوراق الصغيرة خضراء"
      },
      {
        english: "Orange or reddish-brown coloration in center of crowns",
        arabic: "لون برتقالي أو بني أحمر في وسط النباتات"
      },
      {
        english: "Irregular dark purple or brown spots scattered over leaf surface",
        arabic: "بقع داكنة بنفسجية أو بنية غير منتظمة متناثرة على سطح الأوراق"
      },
      {
        english: "Spots with purple centers and no defined border (the leaf spot disease has a clear margin)",
        arabic: "بقع بمركز بنفسجي وبدون حدود محددة (مرض بقعة الورق له حافة واضحة)"
      },
      {
        english: "Dead leaves, flowers, or fruit (in severe infections)",
        arabic: "أوراق أو زهور أو ثمار ميتة (في العدوى الشديدة)"
      },
      {
        english: "Lesions or \"spots\" are more numerous on upper leaf surfaces and appear circular to irregular in shape.",
        arabic: "البقع أو الآفات أكثر انتشارًا على السطح العلوي للأوراق وتبدو دائرية إلى غير منتظمة الشكل."
      },
      {
        english: "These lesions often have definite reddish-purple to rusty-brown borders that surround a necrotic area.",
        arabic: "غالبًا ما تكون هذه الآفات لها حدود بنفسجية حمراء وحدود بنية صدئية وتحيط بمنطقة نخرية."
      },
      {
        english: "Susceptible varieties can be defoliated partly or completely by late summer.",
        arabic: "يمكن أن تفقد الأصناف الحساسة أجزاء أو كليًا من أوراقها في أواخر الصيف."
      },
      {
        english: "Gray and tan lesions that begin at leaf margins",
        arabic: "آفات رمادية وبنية تبدأ على حواف الأوراق"
      },
      {
        english: "Blotches spread to cover first new leaves of spring plants",
        arabic: "البقع تنتشر لتغطي أولى أوراق النباتات في الربيع"
      },
      {
        english: "Brownish decay of the fruit calyx (green leaves on top of berries) that is purely cosmetic",
        arabic: "تعفن بني لقاعدة الثمار (الأوراق الخضراء على أعلى الثمار) وهذا أمر جمالي بحت"
      },
      {
        english: "Rapid wilting and death of lots of plants",
        arabic: "ذبول سريع وموت للعديد من النباتات"
      },
      {
        english: "Leaves turn dry, yellow, reddish, or brown at the margins and in the veins. New leaves stop developing",
        arabic: "الأوراق تجف وتصبح صفراء أو حمراء أو بنية عند الحواف وفي الأوردة. الأوراق الجديدة تتوقف عن التطور"
      },
      {
        english: "Bluish or brownish-black blotches on runners",
        arabic: "بقع زرقاء أو بنية سوداء على الأجزاء العابرة"
      },
      {
        english: "Infected plants are stunted, with few runners and few fruit.",
        arabic: "النباتات المصابة متقزمة، مع عدد قليل من الأجزاء العابرة وعدد قليل من الثمار."
      },
      {
        english: "New leaves are with bluish-green and may wilt",
        arabic: "الأوراق الجديدة زرقاء خضراء وقد تتجهم"
      },
      {
        english: "Older leaves may be reddish orange to yellow tinged",
        arabic: "الأوراق القديمة قد تكون بلون برتقالي أحمر إلى أصفر ملون"
      },
      {
        english: "Blotches are delineated by leaf veins",
        arabic: "البقع محددة بواسطة الأوردة الورقية"
      },
      {
        english: "Central dark brown to purple zone with reddish or lighter brown outer areas",
        arabic: "منطقة مركزية بنية داكنة إلى بنفسجية مع مناطق بنية حمراء أو فاتحة بنية خارجية"
      },
      {
        english: "They have formed in older, necrotic diseased tissue and are diagnostic for Phomopsis leaf blight.",
        arabic: "قد تكون قد تكونت في الأنسجة المصابة القديمة ونخرية وتستخدم للتشخيص في حالة مرض الأوراق في Phomopsis."
      },
      {
        english: "Brown or black colored spots on green and ripe berries",
        arabic: "بقع بنية أو سوداء على الثمار الخضراء والناضجة"
      },
      {
        english: "Spots appear water-soaked",
        arabic: "تبدو البقع وكأنها مشبعة بالماء"
      },
      {
        english: "There are several spots on each berry ",
        arabic: "هناك العديد من البقع على كل ثمار"
      },
      {
        english: "Infects strawberry bloom and green or mature fruit.",
        arabic: "يصيب زهرة الفراولة والثمار الخضراء أو الناضجة."
      },
      {
        english: "Infected blossom clusters turn brown and die.",
        arabic: "تتحول أكوام الزهور المصابة إلى اللون البني وتموت."
      },
      {
        english: "Green fruit become hard and leathery.",
        arabic: "تصبح الثمار الخضراء صلبة وجلدية."
      },
      {
        english: "Slimy or crusty beadlike structures that cover straw, lower leaves, sometimes petioles.",
        arabic: "هياكل مثل الخرز الزلقة أو المتهالكة تغطي القش والأوراق السفلية أحيانًا العنقاء."
      },
      {
        english: "Creamy-white, grey, purple or yellow.",
        arabic: "أبيض كريمي، رمادي، بنفسجي أو أصفر."
      },
      {
        english: "Eventually produce fruiting structures that are marshmallow-like in texture and produce powdery dry black spores.",
        arabic: "تنتج في نهاية المطاف هياكل إنتاج الثمار تشبه الخطمي وتنتج بوغات سوداء جافة مسحوقة."
      },
      {
        english: "Fewer fine feeder roots and a bushy appearance",
        arabic: "جذور المغذي الدقيقة أقل وجاذبية مظهر الشجيرات"
      },
      {
        english: "Reddish-brown lesions on feeder roots (root lesion nematode), swells or galls on feeder roots (root knot nematode).",
        arabic: "آفات بنية حمراء على جذور المغذي (الخنفساء الجذرية) ، واحتقان أو انتفاخ على جذور المغذي (الخنفساء الجذرية)."
      },
      {
        english: "Uneven plant growth",
        arabic: "نمو النبات غير المتساوي"
      },
      {
        english: "Some symptoms",
        arabic: "بعض الأعراض"
      },
      {
        english: "Symptoms 1",
        arabic: "أعراض 1"
      },
      {
        english: "Symptoms 2",
        arabic: "أعراض 2"
      },
      {
        english: "Some symptoms",
        arabic: "بعض الأعراض"
      },
      {
        english: "Symptoms 3",
        arabic: "أعراض 3"
      },
      {
        english: "Symptoms 4",
        arabic: "أعراض 4"
      },
      {
        english: "The disease is characterized by drying up of mature and immature branches from the tip downwards.",
        arabic: "يتميز المرض بجفاف الفروع الناضجة وغير الناضجة من القمة إلى الأسفل."
      },
      {
        english: "A few other fungi have been isolated from such trees.",
        arabic: "تم عزل بعض الفطريات الأخرى من هذه الأشجار."
      },
      {
        english: "The infected branches should be cut and removed and the cut end pasted with Bordeaux mixture 1%",
        arabic: "يجب قطع الفروع المصابة وإزالتها وتلصيق الطرف المقطوع بخليط بوردو 1٪"
      },
      {
        english: "Two types of blights are noticed in nutmeg. The first is a white thread blight wherein fine white hyphae aggregate to form fungal threads that traverse along the stem underneath the leaves in a fan shaped or irregular manner causing blight in the affected portions.",
        arabic: "تُلاحظ نوعان من الأمراض في الجوزة. الأولى هي داء الخيط الأبيض حيث تتجمع الفيفا عالية البياض لتشكيل خيوط فطرية تعبر عبر الساق تحت الأوراق بشكل مروحي أو غير منتظم مما يسبب ضررًا في الأجزاء المصابة."
      },
      {
        english: "The second type of blight is called horse hair blight. Fine black silky threads of the fungus form an irregular, loose network on the stems and leaves.",
        arabic: "النوع الثاني من الأمراض يسمى داء شعر الحصان. تشكل خيوط الفطر الحريرية السوداء الدقيقة شبكة غير منتظمة ومفتوحة على السيقان والأوراق."
      },
      {
        english: "These strands cause blight of leaves and stems. However, these threads hold up the detached, dried leaves on the tree, giving the appearance of a birds nest, when viewed from a distance.",
        arabic: "هذه الخيوط تسبب ضررًا في الأوراق والسيقان. ومع ذلك، تحمل هذه الخيوط الأوراق المنفصلة والجافة على الشجرة، مما يعطي مظهر عش الطيور عند النظر من بعيد."
      },
      {
        english: "Immature fruit split, fruit rot and fruit drop are serious in a majority of nutmeg, Immature fruit splitting and shed- ding are noticed in some trees without any apparent infection.",
        arabic: "تتحدق الثمار الغير ناضجة، تعفن الثمار وتساقط الثمار بشكل كبير في معظم أشجار الجوزة، تلاحظ تشقق الثمار الغير ناضجة وتساقطها في بعض الأشجار دون وجود عدوى واضحة."
      },
      {
        english: "In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discolouration of the rind resulting in rotting.",
        arabic: "في حالة تعفن الثمار، تبدأ العدوى من العقدة الثمرية كآفات داكنة وتمتد تدريجياً إلى الثمار، مما يتسبب في اصفرار القشرة وتعفنها."
      },
      {
        english: "In advanced stages, the mace also rots emitting a foul smell. Phytophthora sp. And Diplodia natalensis have been isolated from affected fruits.",
        arabic: "في مراحل متقدمة، تعفن البذور أيضًا مع انبعاث رائحة كريهة. تم عزل Phytophthora sp. و Diplodia natalensis من الثمار المصابة."
      },
      {
        english: "Necrotic spots develop on the lamina which are encircled by a chlorotic halo.",
        arabic: "تتطور بقع نخرية على الورقة وتحيط بها هالة خضراء."
      },
      {
        english: "In advanced stages the necrotic spots become brittle and fall off resulting in shot holes.",
        arabic: "في المراحل المتقدمة، تصبح البقع النخرية هشة وتتساقط مما يؤدي إلى ثقوب صغيرة."
      },
      {
        english: "The infected branches should be cut and removed. The cut end should be pasted with Bordeaux paste.",
        arabic: "يجب قطع وإزالة الأفرع المصابة. يجب لصق الطرف المقطوع بمعجون بوردو 1%."
      },
      {
        english: "Water soaked lesions on leaves",
        arabic: "تتطور بقع مشبعة بالماء على الأوراق."
      },
      {
        english: "Entire bush appears burnt",
        arabic: "الشجيرة بأكملها تبدو محروقة."
      },
      {
        english: "Blackish brownish coloration of leaf sheath",
        arabic: "اصطباغ أسود أو بني في غمدة الورقة."
      },
      {
        english: "Yellowing of lower leaves and stunting of plants.",
        arabic: "تصفر الأوراق السفلى وتقزم النباتات."
      },
      {
        english: "The stem may be slightly swollen and brittle near the soil.",
        arabic: "قد يكون الساق متورمًا قليلاً وهشًا بالقرب من التربة."
      },
      {
        english: "Externally, the root system appears healthy; however, secondary root rots are likely to occur on plants wilted for long periods.",
        arabic: "خارجياً، يبدو الجهاز الجذري سليمًا. ومع ذلك، من المحتمل حدوث تلف ثانوي للجذور على النباتات المذبولة لفترات طويلة."
      },
      {
        english: "It attacks leaves first, producing faint, slightly discolored specks from which grayish white powdery growth of mycelium develops.",
        arabic: "تهاجم الأوراق أولاً، مما ينتج عنه نقاط باهتة ملونة قليلاً منها تنمو نمو رمادي أبيض مسحوقي للفطريات."
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
