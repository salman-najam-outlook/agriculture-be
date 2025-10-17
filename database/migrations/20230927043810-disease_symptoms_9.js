'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Powdery growth spreads over leaf, stem, and pod.",
        arabic: "ينتشر النمو المسحوقي على الورقة والساق والقرون."
      },
      {
        english: "The leaves turn yellow and die.",
        arabic: "تصبح الأوراق صفراء وتموت."
      },
      {
        english: "The stem of the plant becomes malformed and the affected plant dies out.",
        arabic: "تصبح ساق النبات مشوهة والنبات المصاب يموت."
      },
      {
        english: "Yellow spots having aecia in round or elongated clusters.",
        arabic: "تظهر بقع صفراء تحتوي على عيون بشكل دائري أو مستديرة المجموعات."
      },
      {
        english: "Then the uredopustules develop which are powdery and light brown in appearance.",
        arabic: "ثم تتطور البقع البرتقالية المسحوقة والبنية الفاتحة في المظهر."
      },
      {
        english: "Reddish brown to black streaks appear on primary and secondary roots.",
        arabic: "تظهر خطوط بنية حمراء إلى سوداء على الجذور الأولية والثانوية."
      },
      {
        english: "These streaks coalesce at later stages, leading to girdling of the lower stem.",
        arabic: "تتلاقى هذه الخطوط في مراحل لاحقة، مما يؤدي إلى تضييق الساق السفلية."
      },
      {
        english: "Red discoloration of the vascular system can be seen, especially near cotyledon attachment.",
        arabic: "يمكن رؤية تلون أحمر في الجهاز الوعائي، خاصة بالقرب من تثبيت اللفاصلات."
      },
      {
        english: "Black to purplish streaks on stems reaching from the root zone to about 25 cm up the stem.",
        arabic: "خطوط سوداء إلى بنفسجية على السيقان تمتد من منطقة الجذر إلى حوالي 25 سم في الساق."
      },
      {
        english: "Leaf spots are gray-purplish.",
        arabic: "بقع الأوراق رمادية إلى بنفسجية."
      },
      {
        english: "Foot and stem lesions girdle and weaken the stem, leading to crop lodging and yield loss.",
        arabic: "تآكل القدم والساق يشدان ويضعفان الساق، مما يؤدي إلى انكسار النباتات وفقدان العائد."
      },
      {
        english: "A grayish white, moldy growth appears on the lower leaf surface, and a yellowish area appears on the opposite side of the leaf.",
        arabic: "يظهر نمو عفني أبيض رمادي على السطح السفلي للورقة، وتظهر منطقة صفراء على الجانب الآخر من الورقة."
      },
      {
        english: "Infected leaves can turn yellow and die if the weather is cool and damp.",
        arabic: "يمكن أن تصبح الأوراق المصابة صفراء وتموت إذا كان الجو باردًا ورطبًا."
      },
      {
        english: "Stems may be distorted and stunted.",
        arabic: "السيقان قد تكون مشوهة وقزمة."
      },
      {
        english: "Brown blotches appear on pods, and mold may grow inside pods.",
        arabic: "تظهر بقع بنية على القرون، ويمكن أن ينمو العفن داخل القرون."
      },
      {
        english: "Mottled patterns on leaves.",
        arabic: "أنماط متعددة الألوان على الأوراق."
      },
      {
        english: "Yellow leaf veins.",
        arabic: "عروق الأوراق صفراء."
      },
      {
        english: "Downward curling of leaflets as well as a transient clearing and swelling of leaf veins in most cultivars.",
        arabic: "تجعيد أطراف الأوراق لأسفل بالإضافة إلى تصحيح وتضخم مؤقت للأوراق في معظم الأصناف."
      },
      {
        english: "The disease generally appears as a soft, watery, and slimy decay of the taproot. The decay rapidly consumes the core of the carrot, often leaving the epidermis/peel intact.",
        arabic: "تظهر المرض عادة على شكل تدهور لين ومائي ومخاطي للجذر الرئيسي. يستهلك التدهور بسرعة نواة الجزر، مما يترك البشرة الخارجية سليمة عادةً."
      },
      {
        english: "Rotted tissues retain their natural color until they completely decay. The infected carrot is not fit for consumption and unsellable.",
        arabic: "الأنسجة المتعفنة تحتفظ بلونها الطبيعي حتى تتدهور بالكامل. الجزر المصاب بالعدوى لا يصلح للاستهلاك ولا يمكن بيعه."
      },
      {
        english: "A foul odor may be associated with soft rot.",
        arabic: "ربما يترافق مع العفن اللين رائحة كريهة."
      },
      {
        english: "Whitish powdery growth on the undersurface of the leaves.",
        arabic: "نمو مسحوقي أبيض على السطح السفلي للأوراق."
      },
      {
        english: "As the disease progresses, powdery spots appear on both surfaces of the leaves and on stems.",
        arabic: "مع تقدم المرض، تظهر بقع مسحوقية على كلا السطحين للأوراق وعلى السيقان."
      },
      {
        english: "Under severe disease pressure, the leaves turn brown, twisted, and brittle before shriveling and dying.",
        arabic: "تحت ضغط المرض الشديد، تصبح الأوراق بنية وملتوية وهشة قبل أن تتجف وتموت."
      },
      {
        english: "Older leaves are attacked first.",
        arabic: "تتعرض الأوراق القديمة للهجوم أولاً."
      },
      {
        english: "Dark grey to brown spots, angular, with yellow margins, occur on the leaves and petioles.",
        arabic: "تحدث بقع رمادية داكنة إلى بنية، زاوية، مع هوامش صفراء، على الأوراق والعناقيد."
      },
      {
        english: "Under favorable conditions, the spots merge and the leaves rapidly blacken, wither, and die.",
        arabic: "تحت ظروف ملائمة، تتداخل البقع وتسود الأوراق بسرعة وتجف وتموت."
      },
      {
        english: "Stunted vines.",
        arabic: "أعناق قصيرة."
      },
      {
        english: "Narrow yellow leaves with deformed edges.",
        arabic: "أوراق ضيقة صفراء بأطراف مشوهة."
      },
      {
        english: "Yield reductions in roots.",
        arabic: "انخفاضات في العائد من الجذور."
      },
      {
        english: "Symptoms generally are seen at harvest, after curing or after storage.",
        arabic: "عادة ما تظهر الأعراض عند الحصاد، بعد التجفيف أو بعد التخزين."
      },
      {
        english: "A dry, firm, dark-colored rot that does not extend into the cortex of the sweet potato root.",
        arabic: "تدهور جاف وصلب وملون باللون الداكن والذي لا يمتد إلى القشرة الخارجية لجذر البطاطا الحلوة."
      },
      {
        english: "Dark sunken, darkish spots on the roots and the lower parts of the stem.",
        arabic: "بقع مغمورة باللون الداكن على الجذور والأجزاء السفلية من الساق."
      },
      {
        english: "Necrotic spots observed on lower leaves.",
        arabic: "تلاحظ بقع نخرية على الأوراق السفلية."
      },
      {
        english: "Discoloring, wilting, and death of foliage and, eventually, the death of the sweet potato vine.",
        arabic: "تغير اللون والذبول وموت الأوراق وفي النهاية، موت نبات البطاطا الحلوة."
      },
      {
        english: "It rapidly spreads in high moisture and low temperature.",
        arabic: "إنه ينتشر بسرعة في الرطوبة العالية ودرجة حرارة منخفضة."
      },
      {
        english: "Black specks observed on tubers.",
        arabic: "رؤية نقاط سوداء على الدرنات."
      },
      {
        english: "Affected plants show drying up.",
        arabic: "النباتات المصابة تظهر تجفافًا."
      },
      {
        english: "Unhealthy plants with leaf discoloration.",
        arabic: "نباتات غير صحية مع تغيير لون الأوراق."
      },
      {
        english: "Wilting leaves.",
        arabic: "ذبول الأوراق."
      },
      {
        english: "Stunted growth.",
        arabic: "نمو متوقف."
      },
      {
        english: "White powdery growth is visible on the plant.",
        arabic: "نمو أبيض مسحوقي يظهر على النبات."
      },
      {
        english: "Infected leaves turn purplish and drop.",
        arabic: "الأوراق المصابة تتحول إلى اللون الأرجواني وتتساقط."
      },
      {
        english: "Flower buds may fail to open.",
        arabic: "ربما تفشل براعم الزهور في الفتح."
      },
      {
        english: "Conspicuous circular black spots with fringed margins appear on either side of leaves.",
        arabic: "ظهور بقع سوداء دائرية واضحة مع حواف مشقوقة على كل جانب من الأوراق."
      },
      {
        english: "Leaves become chlorotic.",
        arabic: "تصبح الأوراق كلوروتية."
      },
      {
        english: "Leaves dry up and drop prematurely.",
        arabic: "تجف الأوراق وتتساقط مبكراً."
      },
      {
        english: "Yellowing in a mosaic pattern. Chlorotic (yellow) rings or wavy lines (which can look similar to leaf miner damage).",
        arabic: "تصبح الأوراق صفراء بنمط فسيفسائي. حلقات كلوروتية (صفراء) أو خطوط مموجة (التي يمكن أن تبدو مماثلة لأضرار معدن الأوراق)."
      },
      {
        english: "Yellowing of the veins.",
        arabic: "تصبح الشرايين صفراء."
      },
      {
        english: "Mottled flower color.",
        arabic: "لون الزهور متموج."
      },
      {
        english: "New crown galls are usually pale colored and somewhat round.",
        arabic: "عادة ما تكون الأورام التاجية الجديدة ذات لون فاتح ومستديرة إلى حد ما."
      },
      {
        english: "As they enlarge, they become rough, irregularly shaped, and hard.",
        arabic: "مع توسيعها، تصبح خشنة وغير منتظمة الشكل، وصلبة."
      },
      {
        english: "Crown gall can easily be confused with the graft union, but the graft union will not continue to grow larger.",
        arabic: "يمكن بسهولة الخلط بين أورام التاج وواجهة الزرع، لكن واجهة الزرع لن تستمر في النمو بشكل أكبر."
      },
      {
        english: "The germinating seedling turns brown-red and dies.",
        arabic: "الشتلة الناشئة تتحول إلى اللون البني الأحمر وتموت."
      },
      {
        english: "Irregular to round brown spots with chlorotic halos appear on leaves, and later spread to the stem.",
        arabic: "ظهور بقع بنية غير منتظمة إلى دائرية مع هالات كلوروتية على الأوراق، وتنتشر في وقت لاحق إلى الساق."
      },
      {
        english: "Stem may break, pods are also infected leading to shriveled seeds.",
        arabic: "قد تنكسر الساق وتصاب القرون أيضًا مما يؤدي إلى تجفيف البذور."
      },
      {
        english: "It is caused by a virus transmitted by aphids.",
        arabic: "يُسببه فيروس يتم نقله عن طريق الخنافس."
      },
      {
        english: "The affected leaves become pale yellow and exhibit mosaic, vein banding symptoms.",
        arabic: "تصبح الأوراق المتأثرة صفراء فاتحة وتظهر أعراض فسيفساء وتمييز الشرايين."
      },
      {
        english: "The affected leaves become reduced in size and show puckering. Pods are also reduced and become twisted.",
        arabic: "تصغر الأوراق المتأثرة في الحجم وتظهر تجعيدًا. القرون أيضًا تتناقص وتتعرج."
      },
      {
        english: "Powdery mildew is visible on all the aerial parts of the affected plants.",
        arabic: "العفن البودري مرئي على جميع الأجزاء الهوائية للنباتات المصابة."
      },
      {
        english: "Symptoms first start from leaves and then spread to stem, branches, and pods.",
        arabic: "الأعراض تبدأ أولاً من الأوراق ثم تنتشر إلى الساق والفروع والقرون."
      },
      {
        english: "This white growth consists of the fungus and its spores.",
        arabic: "هذا النمو الأبيض يتألف من الفطر وبذوره."
      },
      {
        english: "The fungus attacks all aerial parts and at any stage of plant growth.",
        arabic: "الفطر يهاجم جميع الأجزاء الهوائية في أي مرحلة من مراحل نمو النبات."
      },
      {
        english: "Symptoms include circular, black, sunken spots with a dark center and bright red-orange margins on leaves and pods.",
        arabic: "تشمل الأعراض بقعًا دائرية سوداء مموسة بمركز داكن وحواف حمراء برتقالية ساطعة على الأوراق والقرون."
      },
      {
        english: "In severe infections, the affected parts wither off.",
        arabic: "في العدوى الشديدة، تتجفف الأجزاء المتأثرة."
      },
      {
        english: "Symptoms begin appearing at 4 weeks as raised white cankers at the base of the stem.",
        arabic: "تبدأ الأعراض في الظهور بعد 4 أسابيع على شكل قروح بيضاء مرتفعة عند قاعدة الساق."
      },
      {
        english: "The affected plants become stunted with dark green and mottled leaves that are reduced in size.",
        arabic: "تصبح النباتات المتأثرة متقزمة مع وجود أوراق خضراء داكنة ومتقشرة بحجم صغير."
      },
      {
        english: "Leaves of affected plants dry and drop.",
        arabic: "تجف وتتساقط أوراق النباتات المتأثرة."
      },
      {
        english: "Small irregular brown lesions on leaves which expand and turn gray-brown or dark brown with concentric zones",
        arabic: "بقع بنية غير منتظمة صغيرة على الأوراق تتوسع وتتحول إلى بني رمادي أو بني داكن مع مناطق مركزية متموجة."
      },
      {
        english: "Older areas of lesions may dry out and drop from leaves causing shot hole",
        arabic: "قد تجف المناطق القديمة للبقع وتتساقط من الأوراق مما يسبب ثقب الرصاص."
      },
      {
        english: "Lesions coalesce to form large necrotic patches",
        arabic: "تتداخل البقع لتشكيل بقع نخرية كبيرة."
      },
      {
        english: "Small, dark brown to black lesions on cotyledons; oval or eye-shaped lesions on stems which turn sunken and brown with purple to red margins",
        arabic: "بقع بنية داكنة صغيرة إلى سوداء على الجناحين. بقع بيضاوية أو على شكل عين على السيقان التي تصبح مموسة وبنية مع هوامش بنفسجية إلى حمراء."
      },
      {
        english: "Stems may break if cankers weaken stem; pods drying and shrinking above areas of visible symptoms",
        arabic: "السيقان قد تنكسر إذا أضعفت القروح السيقان. تجفيف وتقلص القرون فوق مناطق الأعراض المرئية."
      },
      {
        english: "Reddish brown spots on pods which become circular and sunken with rust colored margin",
        arabic: "بقع بنية حمراء على القرون التي تصبح دائرية ومموسة مع هامش بني مصدأ."
      },
      {
        english: "The leaves of the affected plants become yellowish in color, then drop and finally the whole plant dries out",
        arabic: "تصبح أوراق النباتات المتأثرة بلون أصفر، ثم تتساقط وأخيرًا يجف النبات بأكمله."
      },
      {
        english: "Blackened tissue at the base of stem",
        arabic: "نسيج أسود في قاعدة الساق."
      },
      {
        english: "Symptoms may be present on only one side of the plant",
        arabic: "قد تكون الأعراض موجودة فقط على جانب واحد من النبات."
      },
      {
        english: "Caused by fungus, it occurs in young seedlings and grown-up plants",
        arabic: "يسببه الفطر، ويحدث في الشتلات الصغيرة والنباتات الكبيرة."
      },
      {
        english: "Affected plants show formation of dark brown lesions on the stem near soil surface",
        arabic: "تظهر النباتات المتأثرة تكوين بقع بنية داكنة على الساق بالقرب من سطح التربة."
      },
      {
        english: "Plants dry prematurely, particularly when they face drought stress",
        arabic: "تجف النباتات مبكرًا، خصوصًا عند مواجهة إجهاد الجفاف."
      },
      {
        english: "It is transmitted by eriophyid mites from one plant to another",
        arabic: "يتم نقلها عن طريق العث الصغير من نبات إلى آخر."
      },
      {
        english: "Affected plant becomes pale green and reduces leaf size. No flowering and deformity",
        arabic: "النبات المتأثر يصبح أخضر فاتح ويقلل من حجم الأوراق. لا توجد زهور وتشوهات."
      },
      {
        english: "Affected plants remain stunted and branch profusely, as a result of which they appear bushy. No flowers and fruits are borne on such affected plants resulting in total loss of yield",
        arabic: "النباتات المتأثرة تظل متقزمة وتفرع بوفرة، نتيجة لذلك تبدو مشعشعة. لا توجد زهور وفواكه على هذه النباتات المتأثرة مما يؤدي إلى فقدان إجمالي للمحصول."
      },
      {
        english: "Symptoms appear on all aerial parts of plants as small, circular, necrotic spots that develop quickly, forming typical concentric rings",
        arabic: "تظهر الأعراض على جميع الأجزاء الهوائية للنباتات على شكل بقع صغيرة دائرية نخرية تتطور بسرعة، مكونة حلقات مركزية نموذجية."
      },
      {
        english: "Water-soaked, circular to irregular spots occur. The center of the spot is straw-colored with raised reddish-brown margins",
        arabic: "ظهور بقع دائرية إلى غير منتظمة مشبعة بالماء. مركز البقعة بلون قشي مع هوامش بنية محمرة مرتفعة."
      },
      {
        english: "The spots are initially light brown and later turn dark brown. In severe infection, defoliation and drying of infected leaves, branches, and flower buds",
        arabic: "تكون البقع أولاً بنية فاتحة وتتحول فيما بعد إلى بني داكن. في العدوى الشديدة، يمكن أن تتساقط الأوراق وتجفف الأوراق المصابة والفروع وبراعم الزهور."
      },
      {
        english: "The disease first appears in the form of yellow, diffused spots scattered on the leaf lamina; such spots slowly expand and in later stages",
        arabic: "تظهر المرض أولاً على شكل بقع صفراء متشتتة مبعثرة على سطح الورقة. تمتد هذه البقع ببطء وفي مراحل لاحقة"
      },
      {
        english: "Yellow patches alternated with green patches developed on the leaves",
        arabic: "تطور بقع صفراء تتناوب مع بقع خضراء على الأوراق."
      },
      {
        english: "Such spots slowly expand and in later stages of disease development, affected leaflets show broad, yellow patches alternating with green color",
        arabic: "تمتد هذه البقع ببطء وفي مراحل متقدمة من تطور المرض، تظهر أوراق الشجيرات المتأثرة ببقع صفراء عريضة تتناوب مع اللون الأخضر."
      },
      {
        english: "The powdery mildew symptoms appear mostly on older leaves, however, in severe cases even young buds and pods also get infected",
        arabic: "تظهر أعراض العفن البودري بشكل أساسي على الأوراق القديمة، ومع ذلك، في حالات شديدة حتى البراعم الصغيرة والقرون تصاب أيضًا."
      },
      {
        english: "Symptoms appear as dull red spots, limited by veins, appear on the upper surface of leaves and later white powdery patches develop on both surfaces",
        arabic: "تظهر الأعراض على شكل بقع حمراء باهتة، محددة بواسطة الشرايين، على السطح العلوي للأوراق وفي وقت لاحق تتطور بقع بيضاء مسحوقية على السطحين."
      },
      {
        english: "Entire lower leaf surface gets covered with powdery growth, leading to defoliation. The disease is also known to cause stunting of young plants and significantly reduces nodulation",
        arabic: "تغطي السطح السفلي للأوراق بالكامل بنمو مسحوقي، مما يؤدي إلى تساقط الأوراق. يُعرف أيضًا أن المرض يسبب تقزم النباتات الصغيرة ويقلل بشكل كبير من تكوين العقد."
      },
      {
        english: "Phytophthora blight resembles damping off disease as the seedlings die suddenly",
        arabic: "يشبه مرض فيتوفثورا مرض تساقط الشتلات حيث تموت الشتلات فجأة."
      },
      {
        english: "Infected plants have water-soaked lesions on their leaves",
        arabic: "النباتات المصابة لديها بقع مشبعة بالماء على أوراقها."
      },
      {
        english: "Brown to black, slightly sunken lesions on their stems and petioles",
        arabic: "بقع بنية إلى سوداء، مغمورة قليلاً على سيقانهم وأعناق أوراقهم."
      },
      {
        english: "Lesions girdle the main stems or branches which break at this point",
        arabic: "البقع تحيط بالسيقان الرئيسية أو الفروع التي تنكسر في هذا النقطة."
      },
      {
        english: "Causing several types of spots on the leaves and petioles of affected plants",
        arabic: "تسبب أنواعًا متعددة من البقع على أوراق وأعناق أوراق النباتات المتأثرة."
      },
      {
        english: "The spots are triangular in outline and are raised above the surface of the leaf; very rarely, the upper surface is infected",
        arabic: "البقع ذات ملامح مثلثة ومرتفعة فوق سطح الورقة؛ ونادرًا ما يتم الإصابة بالسطح العلوي للورقة."
      },
      {
        english: "Infected leaves start drying, and in severe cases, defoliation may take place",
        arabic: "تبدأ الأوراق المصابة في التجفيف، وفي حالات الإصابة الشديدة، قد يحدث تساقط للأوراق."
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
