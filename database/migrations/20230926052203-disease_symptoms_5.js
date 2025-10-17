'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "It is characterized by drying back of twigs from top to downwards, particularly in older trees followed by drying of leaves which gives an appearance of fire scorch.",
        arabic: "يتميز بجفاف الأغصان من الأعلى إلى الأسفل ، خاصة في الأشجار القديمة ، تليها جفاف الأوراق مما يعطي مظهر حروق النار."
      },
      {
        english: "Internal browning in wood tissue is observed when it is slit open along with the long axis.",
        arabic: "يلاحظ وجود تلون بني داخلي في أنسجة الخشب عند فتحه على طول المحور الطويل."
      },
      {
        english: "Symptoms of the disease are noticeable only on old leaves",
        arabic: "تظهر أعراض المرض فقط على الأوراق القديمة"
      },
      {
        english: "Initially, the lesions are angular, minute, irregular, yellow to light brown, scattered over leaf lamina.",
        arabic: "في البداية ، تكون البقع زاوية صغيرة ، غير منتظمة ، صفراء إلى بنية فاتحة ، متفرقة على سطح الورقة."
      },
      {
        english: "As the lesions enlarge their colour changes from brown to cinnamon and they become almost irregular.",
        arabic: "مع توسع البقع ، يتغير لونها من البني إلى القرفة وتصبح غير منتظمة تقريبًا."
      },
      {
        english: "Symptoms become visible when the mango fruits attain marbel size",
        arabic: "تصبح الأعراض مرئية عندما يصل ثمار المانجو إلى حجم الرخامة"
      },
      {
        english: "Small etiolated area develops near the distal end of the fruit which gradually spreads, turns nearly black and covers the tip of the fruit completely",
        arabic: "تنمو منطقة مشققة صغيرة بالقرب من الطرف البعيد للثمرة وتنتشر تدريجيًا ، تتحول تقريبًا إلى اللون الأسود وتغطي طرف الثمرة بالكامل"
      },
      {
        english: "The black area remains hard and the growth of the fruit is checked.",
        arabic: "تظل المنطقة السوداء صلبة ويتم إيقاف نمو الثمرة."
      },
      {
        english: "Yellow leaves",
        arabic: "أوراق صفراء"
      },
      {
        english: "Pale or yellow choloric lesions on leaves surface",
        arabic: "بقع صفراء شاحبة أو صفراء في سطح الأوراق"
      },
      {
        english: "Lesions turn pink, red, purple, or light-brown, depending on the plant’s pigments",
        arabic: "تتحول الآفات إلى اللون الوردي أو الأحمر أو الأرجواني أو البني الفاتح، اعتمادًا على صبغات النبات"
      },
      {
        english: "Round black spots on leaves",
        arabic: "بقع سوداء دائرية على الأوراق"
      },
      {
        english: "Pale or yellow choloric lesions on leaves surface",
        arabic: "آفات شاحبة أو صفراء على سطح الأوراق"
      },
      {
        english: "White downy growth appears on the surface of the leaves.",
        arabic: "يظهر نمو أبيض كثيف على سطح الأوراق"
      },
      {
        english: "Initial symptoms are small, humid spots on the upper-third part of the stalk.",
        arabic: "الأعراض الأولية هي بقع صغيرة رطبة في الثلث العلوي من الساق"
      },
      {
        english: "The foliage becomes chlorotic and wilts",
        arabic: "تصبح الأوراق شاحبة وتذبل"
      },
      {
        english: "Panicle does not form grain and the stalk bends downward and tends to break easily.",
        arabic: "السنبلة لا تتشكل والساق تنحني نحو الأسفل وتتجه للكسر بسهولة"
      },
      {
        english: "Dwarfing and bronze discolouration of the leaflets.",
        arabic: "تقزم وتلون برونزي للأوراق الصغيرة"
      },
      {
        english: "Lesions on the leaves are of irregular shape, and are bronze to reddish-brown with darker edges.",
        arabic: "الآفات على الأوراق غير منتظمة الشكل، وتكون برونزية إلى بني أحمر مع حواف أغمق"
      },
      {
        english: "Stems shows necrosis",
        arabic: "تظهر السيقان تنخر"
      },
      {
        english: "Small irregular spots in leaves and stems",
        arabic: "بقع صغيرة غير منتظمة في الأوراق والسيقان"
      },
      {
        english: "Wilting",
        arabic: "الذبول"
      },
      {
        english: "Cankers on old twings and brances",
        arabic: "قرحات على الأغصان والفروع القديمة"
      },
      {
        english: "Stunted growth",
        arabic: "نمو متقزم"
      },
      {
        english: "Stunted sterile bushy shoots",
        arabic: "أغصان متقزمة وعقيمة"
      },
      {
        english: "Drying of entire clump",
        arabic: "جفاف الحزمة بأكملها"
      },
      {
        english: "Drying of plants",
        arabic: "جفاف النباتات"
      },
      {
        english: "Mosaic apprearance on leaves",
        arabic: "مظهر موزاييكي على الأوراق"
      },
      {
        english: "Drying, withering of leaves and finally plants die",
        arabic: "جفاف وذبول الأوراق وأخيرًا يموت النبات"
      },
      {
        english: "Leaves becomes necrotic and dries",
        arabic: "تصبح الأوراق نخرية وتجف"
      },
      {
        english: "Brittle pseudostem",
        arabic: "ساق زائفة هشة"
      },
      {
        english: "Lodging",
        arabic: "انكسار النباتات"
      },
      {
        english: "Deformed leaves",
        arabic: "أوراق مشوهة"
      },
      {
        english: "Yellow or pale green leaf spots",
        arabic: "بقع صفراء أو خضراء باهتة على الأوراق"
      },
      {
        english: "Reduced vegetative growth",
        arabic: "نمو نباتي مقلل"
      },
      {
        english: "Cankers on young stems",
        arabic: "قروح على السيقان الشابة"
      },
      {
        english: "Brown necrosis on leaves",
        arabic: "نخر بني على الأوراق"
      },
      {
        english: "Drying stems",
        arabic: "جفاف السيقان"
      },
      {
        english: "Angular spots on limb",
        arabic: "بقع زاوية على الأغصان"
      },
      {
        english: "Foliage burns",
        arabic: "احتراق الأوراق"
      },
      {
        english: "Leaves wilt",
        arabic: "ذبول الأوراق"
      },
      {
        english: "Necrosis of roots",
        arabic: "نخر الجذور"
      },
      {
        english: "Knots in the roots",
        arabic: "عقد في الجذور"
      },
      {
        english: "Root rot",
        arabic: "عفن الجذور"
      },
      {
        english: "The disease appears as small red colored spots on both surfaces of the leaf.",
        arabic: "تظهر المرض على شكل بقع حمراء صغيرة على كلتا وجهي الورقة."
      },
      {
        english: "The center of the spot is white in color encircled by red, purple or brown margin.",
        arabic: "مركز البقعة أبيض اللون محاط بحافة حمراء أو بنفسجية أو بنية."
      },
      {
        english: "Numerous small black dots like acervuli are seen on the white surface of the lesions.",
        arabic: "يمكن رؤية العديد من النقاط السوداء الصغيرة مثل الأكيرفولي على السطح الأبيض للبقع."
      },
      {
        english: "Develop a fluffy white or pinkish coloration. C. lunata colors the grain black.",
        arabic: "تظهر تلك البقع بلون أبيض ممتلئ أو بلون وردي. الفطريات تجعل الحبوب باللون الأسود."
      },
      {
        english: "Grain infected with these fungi develop a fluffy white or pinkish coloration.",
        arabic: "تظهر الحبوب المصابة بهذه الفطريات بلون أبيض ممتلئ أو بلون وردي."
      },
      {
        english: "Curvularia lunata is also frequently encountered and this fungus colors the grains black.",
        arabic: "كما يتم التعامل مع العديد من الأحيان مع فطر الكورفولاريا لوناتا وهذا الفطر يجعل الحبوب سوداء اللون."
      },
      {
        english: "The individual grains are replaced by smut sori. Sori are covered with creamy skin.",
        arabic: "تحل مكان الحبوب الفردية حبوب الفطر. تكون حبوب الفطر مغطاة بجلد كريمي."
      },
      {
        english: "Sori can be localized at a particular part of the head, or can occur over the entire inflorescence.",
        arabic: "يمكن تحديد سوري في جزء معين من الرأس، أو يمكن أن تحدث على الزهرة بأكملها."
      },
      {
        english: "Ratoon crops exhibit a higher disease incidence",
        arabic: "يظهر محاصيل الراتون معدل إصابة أعلى"
      },
      {
        english: "It invades the growing points of young plants, either through oospore or conidial infection.",
        arabic: "إنه يغزو نقاط نمو النباتات الصغيرة، إما من خلال العدوى بالبوغات أو الكونيديا."
      },
      {
        english: "As the leaves unfold they exhibit green or yellow coloration.",
        arabic: "مع كشف الأوراق، يظهر لون أخضر أو أصفر."
      },
      {
        english: "Abundant downy white growth is produced on the lower surface of the leaves, which consists of sporangiophores and sporangia.",
        arabic: "تنمو نموًا أبيضًا وزهري الكثافة على السطح السفلي للأوراق، والذي يتألف من الأسياخ الإنجابية والأسياخ."
      },
      {
        english: "The entire ear head is either completely or partially replaced by a large whitish gall.",
        arabic: "يتم استبدال الأذن الكاملة أو جزء منها بواسطة ورم كبير بلون أبيض."
      },
      {
        english: "The spores are blown away, exposing the dark filaments",
        arabic: "يتم تفجير البوغات، مكشوفة الألياف الداكنة"
      },
      {
        english: "Relatively small proportion of the florets are infected.",
        arabic: "نسبة صغيرة نسبيًا من الأزهار مصابة."
      },
      {
        english: "The sori or spore sacs are cylindrical, elongate, usually slightly curved with a relatively thick creamy-brown covering membrane.",
        arabic: "سوري أو أكياس البوغات هي أسطوانية، مطولة، عادة مائلة قليلاً مع غلاف سميك نسبياً بلون بني كريمي."
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
