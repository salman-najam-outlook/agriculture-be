'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Symptoms also appear on the stem and severely infected plants get blighted.",
        arabic: "تظهر الأعراض أيضًا على الساق والنباتات المصابة بشدة تصاب بالذبول."
      },
      {
        english: "This is an important disease causing economic loss particularly in arabica coffee.",
        arabic: "هذا مرض مهم يسبب خسائر اقتصادية بشكل خاص في البن العربي."
      },
      {
        english: "On the lower surface of the infected leaves, small pale yellowish spots appear early after the first rains in the season.",
        arabic: "على السطح السفلي للأوراق المصابة، تظهر بقع صفراء فاتحة صغيرة مبكرًا بعد أول أمطار في الموسم."
      },
      {
        english: "These spots soon increase in size and number, and many such spots coalesce at severity causing premature defoliation. Severe defoliation leads to debilitation of the bushes and results in poor cropping in the succeeding seasons.",
        arabic: "تزيد هذه البقع قريبًا من حيث الحجم والعدد، وتتلاقى العديد من هذه البقع عند شدة الإصابة مما يسبب التساقط المبكر للأوراق. يؤدي التساقط الشديد إلى الضعف في الأشجار ويؤدي إلى إنتاج ضعيف في المواسم اللاحقة."
      },
      {
        english: "Necrotic spots on the exposed surface of green berries enlarge and cover the major portion.",
        arabic: "تتوسع البقع النخرية على السطح المعرض للثمار الخضراء وتغطي الجزء الرئيسي."
      },
      {
        english: "Fruit skin shrivels and sticks fast to the parchment.",
        arabic: "تجفّ جلد الثمار ويلتصق بسرعة بالورق."
      },
      {
        english: "The centers of the spots turn grayish-white and are encircled by a distinct ring (0.2–0.6 inches in diameter) of brown tissue",
        arabic: "تتحول مراكز البقع إلى اللون الأبيض الرمادي وتحيط بها حلقة مميزة (بقطر 0.2-0.6 بوصة) من الأنسجة البنية."
      },
      {
        english: "Circular brown spots with light-brown/grey centers, surrounded by a wide dark brown ring and and yellow halos, around 15 mm wide appear on leaves",
        arabic: "تظهر بقع بنية دائرية بمراكز بنية فاتحة / رمادية، محاطة بحلقة بنية داكنة وهالات صفراء عريضة، بعرض حوالي 15 مم على الأوراق."
      },
      {
        english: "The spots mostly occur between the veins and also on the margins. Sometimes spots grow into large blotches, and a leaf bligh occurs.",
        arabic: "تحدث البقع بشكل رئيسي بين الأوردة وأيضًا على الحواف. في بعض الأحيان تنمو البقع إلى بقع كبيرة، ويحدث تآكل للأوراق."
      },
      {
        english: "This usually happens in cooler, wet areas above 600 m altitude. Infections on the berries are generally smaller, around 5 mm wide, but sometimes they cover the whole berry.",
        arabic: "غالبًا ما يحدث ذلك في المناطق الباردة والرطبة التي تزيد عن 600 متر فوق مستوى سطح البحر. الإصابات على الثمار عادة أصغر حجمًا، بعرض حوالي 5 مم، ولكن في بعض الأحيان تغطي الثمرة بأكملها."
      },
      {
        english: "Monitor for this disease and treat at early stages of development on berries and branches.",
        arabic: "راقب هذا المرض وعالجه في المراحل الأولى من التطور على الثمار والأغصان."
      },
      {
        english: "Early symptoms may be leaf yellowing and drop of leaves that are found mid-branch, small 'spots or lesions' on ripening berries",
        arabic: "الأعراض الأولية قد تكون تصفير الأوراق وتساقط الأوراق التي توجد في منتصف الفرع، بقع صغيرة أو آفات صغيرة على الثمار المستديرة."
      },
      {
        english: "Dark browning of lateral or vertical stem(s), vertical tip die-back, and premature berry death.",
        arabic: "تحول الجذعان الجانبيان أو العموديان إلى اللون البني الداكن، انكسار النصل العمودي، وموت الثمار المبكر."
      },
      {
        english: "Water-soaked spots on leaves which are delimited by leaf veins, giving them an angular appearance;",
        arabic: "بقع مشبعة بالماء على الأوراق تتميز بها الأوراق بواسطة الأوردة، مما يمنحها مظهرًا زاويًا؛"
      },
      {
        english: "Lesions Increase in size and turn black and necrotic;",
        arabic: "تزيد الآفات في الحجم وتتحول إلى اللون الأسود وتصبح نخرية؛"
      },
      {
        english: "Leaves Drop from the plant; disease may also cause elongated gray-black lesions extending from the leaves to petioles and stem which are known as the 'blackarm' phase;",
        arabic: "تتساقط الأوراق من النبات؛ قد يسبب المرض أيضًا آفات رمادية سوداء ممتدة من الأوراق إلى العنقوديات والساق التي تعرف بالمرحلة 'الذراع الأسود'؛"
      },
      {
        english: "Initial symptoms on young seedlings are yellowing and browning of cotyledons, followed by a brown ring on the petiole.",
        arabic: "الأعراض الأولية على شتلات البذور الصغيرة هي تصفير وتحول لون الاوراق الأولية إلى اللون البني، تليها حلقة بنية على العنقود."
      },
      {
        english: "Finally wilting & drying of the seedling occurs. Symptom at later stages includes loss of turgidity, yellowing, drooping and wilting starting from older leaves.",
        arabic: "أخيرًا، يحدث ذبول وجفاف الشتلة. الأعراض في مراحل متقدمة تتضمن فقدان الانتصاب، تصفير الأوراق، الانحناء والذبول ابتداءً من الأوراق الأكبر سنًا."
      },
      {
        english: "Browning or blackening of vascular tissues occur on the stem and spreads upwards and downwards. Infected plants appear stunted with fewer bolls.",
        arabic: "تحدث تحولات باللون البني أو التسود في أنسجة الأوعية على الساق وتنتشر لأعلى ولأسفل. النباتات المصابة تظهر متعثرة مع وجود أقل عدد من الثمار."
      },
      {
        english: "The disease may occur in all stages but more severe when plants are 45-60 days old.",
        arabic: "قد يحدث المرض في جميع المراحل ولكنه أكثر حدة عندما تكون النباتات عمرها 45-60 يومًا."
      },
      {
        english: "Each spot has a central lesion surrounded by concentric rings. Several spots coalesce together to form blighted areas. The affected leaves become brittle and fall off.",
        arabic: "كل بقعة تحتوي على آفة مركزية محاطة بحلقات متماثلة. تتلاقى العديد من البقع معًا لتشكيل مناطق مصابة. تصبح الأوراق المتأثرة هشة وتتساقط."
      },
      {
        english: "Sometimes stem lesions are also seen. In severe cases, the spots may appear on bracts and bolls.",
        arabic: "في بعض الأحيان يتم رؤية آفات على الساق أيضًا. في حالات شديدة، قد تظهر البقع على الأغطية والثمار."
      },
      {
        english: "Anthracnose in cotton can occur in all growth stages of the plant and it can affect all tissues.",
        arabic: "يمكن أن يحدث مرض الأنثراكنوز في القطن في جميع مراحل نمو النبات ويمكن أن يؤثر على جميع الأنسجة."
      },
      {
        english: "It produces small reddish to light brown circular spots with black necrotic margins on the cotyledons and primary leaves.",
        arabic: "ينتج عنه بقع دائرية صغيرة من اللون الأحمر الفاتح إلى اللون البني الفاتح مع حواف سوداء نخرية على الأوراق الأولية والأوراق الرئيسية."
      },
      {
        english: "If the lesions develop on the collar region, the stem may be girdled, causing seedling or young plants to wilt and die.",
        arabic: "إذا ظهرت الآفات في منطقة الياقة، قد يتم قطع الساق، مما يؤدي إلى ذبول وموت الشتلة أو النباتات الصغيرة."
      },
      {
        english: "It affects the crop in square and boll formation stages Bronzing of veins followed by interveinal chlorosis, yellowing and scorching of leaves",
        arabic: "يؤثر على المحصول في مراحل تكوين السيد والكبس. تصبغ الأوردة يليها الكلوروز بين الأورقة وتصفيرها وحرقها."
      },
      {
        english: "Leaves exhibit drying of leaf margins and areas between veins known as 'tiger stripe symptom'",
        arabic: "تظهر الأوراق جفاف حواف الأوراق والمناطق بين الأوردة المعروفة باسم 'أعراض خطوط النمر'."
      },
      {
        english: "Affected plants remain barren showing pinkish discoloration in stem and wood. It may produce smaller bolls",
        arabic: "النباتات المتأثرة تبقى عقيمة تظهر بها تلون وردي في الساق والخشب. قد تنتج كبس أصغر حجماً."
      },
      {
        english: "Small irregular brown lesions on leaves which expand and turn gray-brown or dark brown with concentric zones",
        arabic: "بقع بنية غير منتظمة الشكل على الأوراق تتوسع وتتحول إلى لون رمادي بني أو بني داكن مع مناطق متماثلة."
      },
      {
        english: "Older areas of lesions may dry out and drop from leaves causing shot hole",
        arabic: "مناطق الآفات القديمة قد تجف وتتساقط من الأوراق مما يسبب ثقبًا مثل الرصاص."
      },
      {
        english: "Lesions Coalesce to form large necrotic patches",
        arabic: "تتلاقى الآفات لتشكيل تجمعات كبيرة من البقع النخرية."
      },
      {
        english: "Small, dark brown necrotic spots on leaves which may be surrounded by a zone of yellow tissue",
        arabic: "بقع بنية داكنة صغيرة نخرية على الأوراق قد تكون محاطة بمنطقة من الأنسجة الصفراء."
      },
      {
        english: "Water soaked spots on pods which turn brown and necrotic",
        arabic: "بقع مشبعة بالماء على القرون تتحول إلى اللون البني وتصبح نخرية."
      },
      {
        english: "Pods may twist and distort in the area of infection.",
        arabic: "القرون قد تلتوي وتشوه في منطقة الإصابة."
      },
      {
        english: "Initially, the symptoms appear as small yellow/white spots on leaves.",
        arabic: "في البداية، تظهر الأعراض على شكل بقع صفراء / بيضاء صغيرة على الأوراق."
      },
      {
        english: "Later the spots become enlarged and show raised brick red rust pustules (uredinia).",
        arabic: "في وقت لاحق، تتوسع البقع وتظهر بثرات حمراء زاهية مرتفعة (يوريدينيا)."
      },
      {
        english: "Normally these pustules are surrounded by a yellow halo. Premature leaf drop may occur if the disease is severe.",
        arabic: "عادة، يحاط هذه البثرات بحلقة صفراء. قد يحدث تساقط الأوراق المبكر إذا كان المرض شديدًا."
      },
      {
        english: "Flowers covered in white, cottony fungal growth;",
        arabic: "الزهور مغطاة بنمو فطري أبيض قطني؛"
      },
      {
        english: "Small, circular, dark green, water-soaked lesions on pods, leaves, and branches which enlarge and become slimy",
        arabic: "بقع دائرية صغيرة باللون الأخضر الداكن ومشبعة بالماء على القرون والأوراق والفروع تتوسع وتصبح مخزنة."
      },
      {
        english: "Cottony white growth may be visible on lesions during periods of high humidity; death of branches and/or the entire plant.",
        arabic: "قد يكون نمو أبيض قطني مرئيًا على البقع خلال فترات الرطوبة العالية؛ موت الفروع و / أو النبات بأكمله."
      },
      {
        english: "Water-soaked spots on leaves which enlarge and become necrotic",
        arabic: "بقع مشبعة بالماء على الأوراق تتوسع وتصبح نخرية."
      },
      {
        english: "Spots may be surrounded by a zone of yellow discoloration; lesions coalesce and give the plant a burned appearance",
        arabic: "قد تكون البقع محاطة بمنطقة من التلون الأصفر؛ الآفات تتلاقى وتعطي النبات مظهراً محروقاً."
      },
      {
        english: "Leaves That die remain attached to the plant; circular, sunken, red-brown lesions may be present on pods; pod lesions may ooze during humid conditions.",
        arabic: "الأوراق التي تموت تبقى معلقة على النبات؛ قد تكون البقع الدائرية الغارقة اللون البني الأحمر موجودة على القرون؛ قد تنزف البقع على القرون خلال ظروف الرطوبة."
      },
      {
        english: "On tomato, the affected area may be mistaken for sunscald. Sunscald develops as a white discoloration, but it occurs on the upper portions of the fruit, often the shoulders.",
        arabic: "على الطماطم، قد يتم الخلط بين المنطقة المصابة والتعرض للشمس. يظهر التعرض للشمس على شكل تلون أبيض، لكنه يحدث في الأجزاء العلوية من الثمار، غالبًا على الكتفين."
      },
      {
        english: "Blossom end rot may also occur on the sides of the pepper fruit near the blossom end.",
        arabic: "قد يحدث أيضًا تعفن طرف الزهرة على جوانب ثمار الفلفل بالقرب من طرف الزهرة."
      },
      {
        english: "Molds often colonize the damaged area of affected fruit, resulting in a dark brown or black appearance.",
        arabic: "غالبًا ما تستوطن الفطريات المنطقة التالفة من الثمار المتأثرة، مما يؤدي إلى ظهور اللون البني الداكن أو الأسود."
      },
      {
        english: "The new growth of plants with tomato yellow leaf curl has reduced internodes, giving the plant a stunted appearance",
        arabic: "النمو الجديد للنباتات المصابة بلفحة الأوراق الصفراء للطماطم يحتوي على الأعقاب المقلصة، مما يمنح النبات مظهراً متعثراً."
      },
      {
        english: "The new leaves are also greatly reduced in size and wrinkled, are yellowed between the veins, and have margins that curl upward, giving them a cup-like appearance.",
        arabic: "الأوراق الجديدة أيضًا ذات حجم كبير ومتجعدة، وتصفر بين الأوردة، ولها حواف تنثني لأعلى، مما يمنحها مظهرًا شبيهاً بالكوب."
      },
      {
        english: "Flowers may appear but usually will drop before fruit is set",
        arabic: "قد تظهر الزهور ولكن عادة ما تسقط قبل تكوين الثمار."
      },
      {
        english: "The fungus attacks the foliage causing characteristic leaf spots and blight. Early blight is first observed on the plants as small, black lesions mostly on the older foliage.",
        arabic: "الفطر يهاجم الأوراق مما يسبب بقع الأوراق المميزة واللفح. يُلاحظ اللفح الباكر على النباتات كبقع سوداء صغيرة بشكل أساسي على الأوراق القديمة."
      },
      {
        english: "Spots enlarge, and by the time they are one-fourth inch in diameter or larger, concentric rings in a bull's eye pattern can be seen in the center of the diseased area.",
        arabic: "تتوسع البقع، وعندما يصبح قطرها ربع بوصة أو أكبر، يمكن رؤية حلقات متماثلة في نمط عين الثور في وسط المنطقة المصابة."
      },
      {
        english: "Tissue surrounding the spots may turn yellow. If high temperature and humidity occur at this time, much of the foliage is killed.",
        arabic: "قد تتحول الأنسجة المحيطة بالبقع إلى اللون الأصفر. إذا حدث ارتفاع في درجة الحرارة والرطوبة في هذا الوقت، فإن الكثير من الأوراق يمكن أن تموت."
      },
      {
        english: "Brownish-green spots appear on the leaf margins and leaf tops. Later, large areas of the leaves turn brown completely.",
        arabic: "تظهر بقع بنية خضراء على حواف الأوراق وأعلى الأوراق. في وقت لاحق، تتحول مناطق كبيرة من الأوراق إلى اللون البني تمامًا."
      },
      {
        english: "During wet weather, lesions on the lower side of the leaves may be covered with a gray to white moldy growth, making it easier to distinguish healthy from dead leaf tissue.",
        arabic: "خلال الطقس الرطب، قد تكون البقع على الجانب السفلي للأوراق مغطاة بنمو عفني أبيض إلى رمادي، مما يجعل من السهل التمييز بين الأنسجة الصحية والميتة للأوراق."
      },
      {
        english: "Greyish-green to dirty-brown and wrinkled stains appear on the fruits. At these spots, the fruit flesh is hardened.",
        arabic: "تظهر بقع بلون أصفر رمادي إلى بني متسخ ومجعد على الثمار. في هذه البقع، يتم تصلب لحم الثمار."
      },
      {
        english: "Characteristic symptoms of bacterial wilt are the rapid and complete wilting of normal grown-up plants.",
        arabic: "الأعراض المميزة للذبول البكتيري هي الذبول السريع والكامل للنباتات النامية بشكل طبيعي."
      },
      {
        english: "Lower leaves may drop before wilting. Pathogen is mostly confined to the vascular region; in advantage cases, it may invade the cortex and pith and cause yellow-brown discoloration of tissues.",
        arabic: "قد تتساقط الأوراق السفلية قبل الذبول. الطريقة الباثوجينية محصورة بشكل أساسي في المنطقة الوعائية؛ في حالات الاستفادة، قد تغزو القشرة والنخاع وتسبب تلوينًا أصفر بني للأنسجة."
      },
      {
        english: "Infected plant parts when cut and immersed in clear water, a white streak of bacterial ooze is seen coming out from cut ends.",
        arabic: "عند قص الأجزاء المصابة من النبات ووضعها في الماء الصافي، يمكن رؤية خط أبيض من العصارة البكتيرية يخرج من الأطراف المقطوعة."
      },
      {
        english: "The first symptom of the disease is clearing of the veinlets and chlorosis of the leaves.",
        arabic: "أول أعراض المرض هو تصفية الأوردة الصغيرة والكلوروز للأوراق."
      },
      {
        english: "The younger leaves may die in succession and the entire may wilt and die in a course of few days. Soon the petiole and the leaves droop and wilt.",
        arabic: "الأوراق الصغيرة قد تموت على التوالي وتذبل النبتة بأكملها وتموت في غضون أيام قليلة. قريبًا، تنحني وتذبل العنقود والأوراق."
      },
      {
        english: "In young plants, the symptom consists of clearing of veinlets and dropping of petioles. In the field, yellowing of the lower leaves first, and affected leaflets wilt and die.",
        arabic: "في النباتات الصغيرة، تتضمن الأعراض تصفية الأوردة الصغيرة وسقوط العنقود. في الحقل، يحدث تصفير الأوراق السفلية أولاً، وتذبل وتموت الأوراق المتأثرة."
      },
      {
        english: "The disease is characterized by light and dark green mottling on the leaves, often accompanied by wilting of young leaves on sunny days when plants first become infected.",
        arabic: "المرض يتميز بالتشمشمة الخضراء الفاتحة والداكنة على الأوراق، غالبًا ما يرافقها ذبول الأوراق الصغيرة في الأيام المشمسة عندما تصبح النباتات مصابة لأول مرة."
      },
      {
        english: "The leaflets of affected leaves are usually distorted, puckered, and smaller than normal. Sometimes the leaflets become indented, resulting in 'fern leaf' symptoms.",
        arabic: "غالبًا ما تكون أوراق النباتات المصابة ذات الصفائح مشوهة ومتجعدة، وأصغر من الحجم الطبيعي. في بعض الأحيان، تصبح الأوراق متعرجة، مما يؤدي إلى ظهور أعراض 'ورقة الفرن'."
      },
      {
        english: "The virus is spread by contact with clothes, the hands of working labor, touching infected plants with healthy ones, plant debris, and implements.",
        arabic: "الفيروس ينتشر عن طريق الاتصال بالملابس، وأيدي العمال، ولمس النباتات المصابة بالنباتات السليمة، وبقايا النباتات، والأدوات."
      },
      {
        english: "Black Spot On leaves are formed which enlarge rapidly and cause the fall of the leaf. When the main stem at the base is damaged, the entire vine wilts and sheds all the leaves and spikes.",
        arabic: "تتشكل بقع سوداء على الأوراق وتتوسع بسرعة مما يؤدي إلى سقوط الورقة. عندما يتم تضرر الساق الرئيسية في القاعدة، تتجعد الكروم بأكملها وتتساقط جميع الأوراق والسنابل."
      },
      {
        english: "The tender leaves and succulent shoot tips of freshly emerging runner shoots trailing on the soil turn black when infected.",
        arabic: "تتحول الأوراق الناعمة وأطراف السيقان اللحمية للسيقان الجديدة الناشئة والتي تجري على الأرض إلى اللون الأسود عند الإصابة."
      },
      {
        english: "The disease spreads to the entire vine from these infected runner shoots and leaves during intermittent showers due to rain splash.",
        arabic: "المرض ينتشر إلى الكروم بأكملها من هذه السيقان الجارية المصابة والأوراق خلال الزخات المتقطعة نتيجة لرذاذ المطر."
      },
      {
        english: "It can be distinguished from the pollu (hollow berry) caused by the beetle by the presence of characteristic cracks on the infected berries.",
        arabic: "يمكن التمييز بينه وبين الثمار الفارغة التي تسببها الخنفساء من خلال وجود شقوق مميزة على الثمار المصابة."
      },
      {
        english: "The affected berries show brown sunken patches during the early stages, and their further development is affected.",
        arabic: "تظهر الثمار المصابة بقعًا بنية مستوية خلال المراحل المبكرة، وتتأثر تطورها اللاحق."
      },
      {
        english: "In later stages, the discoloration gradually increases, and the berries show the characteristic cross-splitting. Finally, the berries turn black and dry. The fungus also causes angular to irregular brownish lesions with a chlorotic halo on the leaves.",
        arabic: "في المراحل اللاحقة، يزداد التلون تدريجياً، وتظهر الثمار الشقوق الصليبية المميزة. في النهاية، تتحول الثمار إلى اللون الأسود وتجف. الفطر يسبب أيضًا بقع بنية غير منتظمة ذات حلقة خضراء على الأوراق."
      },
      {
        english: "Infected cuttings show greyish lesions on leaves and stems.",
        arabic: "تظهر القصب المصابة بقع رمادية على الأوراق والسيقان."
      },
      {
        english: "White-Colored Mycelium appears which later girdles the stem, causing rotting and wilting.",
        arabic: "يظهر ميسيليوم أبيض اللون والذي فيما بعد يحيط بالساق، مما يتسبب في العفن والذبول."
      },
      {
        english: "Small whitish to cream-colored grain-like sclerotial bodies appear on the mature lesions.",
        arabic: "تظهر جسيمات صلبة صفراء فاتحة اللون تشبه الحبوب على الآفات الناضجة."
      },
      {
        english: "Root necrosis and galling are the primary symptoms of the disease.",
        arabic: "تعفن الجذور والانتفاخ هما الأعراض الرئيسيتين للمرض."
      },
      {
        english: "Foliar yellowing (mild to moderate), followed by defoliation, die-back is seen.",
        arabic: "يُرى تصفير الأوراق (خفيف إلى معتدل)، تليها تساقط الأوراق وتدهور النبات."
      },
      {
        english: "In more pronounced conditions whole vine die. Browning of vascular tissue is seen if Fusarium sp. Is associated with the disease.",
        arabic: "في الظروف الأكثر تفاقماً، يمكن أن تموت الكرمة بأكملها. يمكن رؤية تحول الأنسجة الوعائية إلى اللون البني إذا كانت سلالة Fusarium مرتبطة بالمرض."
      },
      {
        english: "The disease is characterized by drying up of mature and immature branches from the tip downwards.",
        arabic: "يتميز المرض بالجفاف التام للفروع الناضجة وغير الناضجة من الطرف إلى الأسفل."
      },
      {
        english: "A few other fungi have been isolated from such trees.",
        arabic: "تم عزل بضعة فطريات أخرى من مثل هذه الأشجار."
      },
      {
        english: "The infected branches should be cut and removed, and the cut end pasted with Bordeaux mixture 1%.",
        arabic: "يجب قطع الفروع المصابة وإزالتها، وتلصيق الطرف المقطوع بخليط بوردو 1٪."
      },
      {
        english: "Two types of blights are noticed in nutmeg. The first is a white thread blight wherein fine white hyphae aggregate to form fungal threads that traverse along the stem underneath the leaves in a fan-shaped or irregular manner causing blight in the affected portions.",
        arabic: "تُلاحظ نوعان من البياضات في الجوزة. الأولى هي بياض الخيط حيث تتجمع ألياف فطرية بيضاء دقيقة لتشكيل خيوط فطرية تعبر على طول الساق تحت الأوراق بشكل مروحي أو غير منتظم مما يسبب البياض في الأجزاء المتضررة."
      },
      {
        english: "The second type of blight is called horsehair blight. Fine black silky threads of the fungus form an irregular, loose network on the stems and leaves.",
        arabic: "النوع الثاني من البياضات يُسمى بياض الشعر. تتشكل خيوط الفطر الحريرية السوداء الدقيقة على شكل شبكة غير منتظمة وفضفاضة على السيقان والأوراق."
      },
      {
        english: "These strands cause blight of leaves and stems. However, these threads hold up the detached, dried leaves on the tree, giving the appearance of a bird's nest when viewed from a distance.",
        arabic: "هذه الخيوط تسبب بياض الأوراق والسيقان. ومع ذلك، تحمل هذه الخيوط الأوراق المنفصلة والجافة على الشجرة، مما يمنحها مظهر عش الطائر عند النظر من مسافة بعيدة."
      },
      {
        english: "Immature fruit split, fruit rot, and fruit drop are serious in a majority of nutmeg. Immature fruit splitting and shedding are noticed in some trees without any apparent infection.",
        arabic: "تتسبب تشقق الثمار الناضجة وتعفن الثمار وتساقط الثمار في جدية في غالبية أشجار الجوزة. يُلاحظ تشقق الثمار الناضجة وتساقطها في بعض الأشجار بدون وجود عدوى ظاهرة."
      },
      {
        english: "In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discoloration of the rind resulting in rotting.",
        arabic: "في حالة تعفن الثمار، تبدأ العدوى من السيقان كبقع داكنة وتمتد تدريجياً إلى الثمار، مما يتسبب في تلوين القشرة باللون البني مع العفن."
      },
      {
        english: "In advanced stages, the mace also rots, emitting a foul smell. Phytophthora sp. and Diplodia natalensis have been isolated from affected fruits.",
        arabic: "في المراحل المتقدمة، يتعفن البيج، مصدرًا رائحة كريهة. تم عزل Phytophthora sp. و Diplodia natalensis من الثمار المتأثرة."
      },
      {
        english: "Necrotic spots develop on the lamina which are encircled by a chlorotic halo.",
        arabic: "تظهر بقع نخرية على اللامينا والتي تحيط بها هالة خضراء."
      },
      {
        english: "In advanced stages, the necrotic spots become brittle and fall off resulting in shot holes.",
        arabic: "في المراحل المتقدمة، تصبح البقع النخرية هشة وتتساقط مما يؤدي إلى تكوين فتحات صغيرة."
      },
      {
        english: "The infected branches should be cut and removed. The cut end should be pasted with Bordeaux paste.",
        arabic: "يجب قطع الفروع المصابة وإزالتها. يجب تلصيق الطرف المقطوع بمعجون بوردو."
      },
      {
        english: "The disease is a destructive one, widely distributed wherever the crop is grown.",
        arabic: "المرض هو مرض مدمر، ينتشر على نطاق واسع في أي مكان يتم فيه زراعة المحصول."
      },
      {
        english: "The most affected components are the number of seeds per head and the seed yield per plant.",
        arabic: "أكثر المكونات تأثيرًا هي عدد البذور في الرأس وإنتاج البذور لكل نبات."
      },
      {
        english: "Spots first appear on lower leaves, later spread to middle and upper leaves. At later stages, spots may be formed on petioles, stem, and ray florets.",
        arabic: "تظهر البقع أولاً على الأوراق السفلية، ثم تنتشر إلى الأوراق الوسطى والعليا. في مراحل لاحقة، قد تتكون بقع على السيقان والسيقان وزهور الأشعة."
      },
      {
        english: "It is more prominent in the rabi season, and in the kharif season, the appearance is usually late.",
        arabic: "تكون أكثر وضوحاً في موسم الربيع، وفي موسم الخريف، غالباً ما يكون الظهور متأخرًا."
      },
      {
        english: "Uredo pustules appear first on the lower leaves. Uredo pustules appear on the younger leaves and later spread over the entire vegetative surface covering stems, petioles, floral bracts, and petals.",
        arabic: "تظهر بقع Uredo أولاً على الأوراق السفلية. تظهر بقع Uredo على الأوراق الصغيرة وتنتشر لاحقًا على السطح النباتي بأكمله، مغطية السيقان والسيقان وغطاء الزهر والأزهار."
      },
      {
        english: "Uredia often coalesce to cover large areas on the affected plant parts.",
        arabic: "غالبًا ما تتحد بقع Uredia لتغطية مناطق كبيرة على أجزاء النبات المتأثرة."
      },
      {
        english: "Symptoms of the disease are evident as seedling damping off, systemic infection, local foliar lesions, and basal root or stem galls.",
        arabic: "تظهر أعراض المرض كتخمير الشتلات، والعدوى النظامية، والبقع الورقية المحلية، والتورمات في الجذور الأساسية أو السيقان."
      },
      {
        english: "First symptoms are yellowing of the first pair of true leaves.",
        arabic: "أول أعراض المرض هي تصفير الزوج الأول من الأوراق الحقيقية."
      },
      {
        english: "Sunflower plants carrying systemic infection are severely stunted, and leaves are entirely chlorotic.",
        arabic: "نباتات عباد الشمس التي تحمل العدوى النظامية يتم تقزيمها بشدة، والأوراق تكون كليًا كلوروزية."
      },
      {
        english: "Water-soaked circular or angular spots on leaves with a greasy, greenish appearance on lower leaves.",
        arabic: "بقع مستديرة أو زوايا مشبعة بالماء على الأوراق بمظهر دهني أخضر على الأوراق السفلية."
      },
      {
        english: "Lesions are usually gray with a darker margin; some lesions may have a narrow yellow border; tiny black fungal fruiting bodies may be present in the lesions.",
        arabic: "البقع عادة ما تكون رمادية مع حافة أغمق؛ قد تحتوي بعض البقع على حافة صفراء ضيقة؛ قد تكون الجسيمات الفطرية السوداء الصغيرة حاضرة في البقع."
      },
      {
        english: "Yellow or chlorotic spots on leaves.",
        arabic: "بقع صفراء أو كلوروتيك على الأوراق."
      },
      {
        english: "Dark olive green spots on leaves and fruit; may be a velvety growth on spots on undersides of leaves; twisting of leaves.",
        arabic: "بقع زيتونية داكنة على الأوراق والثمار؛ قد تكون هناك نمومتمرد على البقع على الجوانب السفلية للأوراق؛ انعطاف الأوراق."
      },
      {
        english: "Distorted leaves; severely infected leaves turn yellow and drop from the tree.",
        arabic: "أوراق مشوهة؛ الأوراق المصابة بشدة تتحول إلى اللون الأصفر وتسقط من الشجرة."
      },
      {
        english: "Fire blight symptoms may appear on the blossoms, shoots, branches, trunk, and rootstock.",
        arabic: "قد تظهر أعراض جفاف النار على الأزهار، والبراعم، والفروع، والجذع، وجذر النبات."
      },
      {
        english: "Watery exudate may be present on infected areas.",
        arabic: "قد يكون هناك إفراز مائي على المناطق المصابة."
      },
      {
        english: "Blighted blossoms appear wilted, shriveled, and brown. Young fruitlets are also very susceptible.",
        arabic: "الأزهار المصابة تبدو متجعدة ومتقشرة وبنية اللون. الثمار الصغيرة أيضًا عرضة للإصابة بشكل كبير."
      },
      {
        english: "Leaf spots are first yellow, then turn bright orange-red, often with a bright red border.",
        arabic: "تكون بقع الأوراق أولاً صفراء، ثم تتحول إلى اللون الأحمر البرتقالي الزاهي، غالبًا مع حدود حمراء زاهية."
      },
      {
        english: "Small, raised, black dots form in the center of leaf spots on the upper leaf surface when the leaf spots mature.",
        arabic: "تتشكل نقاط سوداء صغيرة مرتفعة في وسط بقع الأوراق على السطح العلوي للورقة عندما تنضج بقع الأوراق."
      },
      {
        english: "Rarely, green to brown irregular spots with black dots form on the fruit surface. Fruit spots do not extend deep into the fruit.",
        arabic: "نادرًا ما تتشكل بقع خضراء إلى بنية غير منتظمة بنقاط سوداء على سطح الثمرة. البقع على الثمار لا تمتد بعمق داخل الثمرة."
      },
      {
        english: "Large brown rotten areas can form anywhere on the fruit but are most common on the blossom end.",
        arabic: "يمكن تكوين مناطق تعفن بنية كبيرة في أي مكان على الثمرة ولكنها تكون أكثر شيوعًا على الجزء الزهري."
      },
      {
        english: "Brown to black concentric rings can often be seen on larger infections.",
        arabic: "يمكن رؤية غالبًا حلقات دائرية بنية إلى سوداء على العدوى الكبيرة."
      },
      {
        english: "The flesh of the apple is brown but remains firm. Small, black spots can be seen on older fruit infections.",
        arabic: "لحم التفاح باللون البني ولكنه يظل ثابتًا. يمكن رؤية بقع سوداء صغيرة على الثمار القديمة المصابة."
      },
      {
        english: "It attacks the leaves, flowers, stalks of panicle and fruits, causing a superficial white powdery appearance on it.",
        arabic: "يهاجم الأوراق والزهور وسيقان الجوزة والثمار، مما يتسبب في ظهور بودرة بيضاء سطحية عليها."
      },
      {
        english: "The disease spreads by wind very rapidly. Generally, the infection starts from the inflorescence and spreads downwards, covering the floral axis, tender leaves, and soft stem.",
        arabic: "المرض ينتشر بواسطة الرياح بسرعة كبيرة. عمومًا، تبدأ العدوى من التزهير وتنتشر للأسفل، تغطي المحور الزهري والأوراق الناعمة والساق الناعم."
      },
      {
        english: "Flowers fail to open, blacken, or become brown, dry, and may fall from panicles.",
        arabic: "الزهور لا تنفتح، وتصبح سوداء، أو بنية، وجافة، وقد تتساقط من الكتل."
      },
      {
        english: "On leaves, lesions start as small, angular, brown to black spots that can enlarge to form extensive dead areas.",
        arabic: "على الأوراق، تبدأ البقع كبقع صغيرة زاوية بنية إلى سوداء يمكن أن تتوسع لتشكيل مناطق ميتة واسعة."
      },
      {
        english: "The first symptoms on panicles are small black or dark-brown spots, which can enlarge, coalesce, and kill the flowers before fruits are produced. Petioles, twigs, and stems are also susceptible and develop into a typical black color.",
        arabic: "أول أعراض العدوى على الكتل هي بقع سوداء صغيرة أو بنية داكنة، يمكن أن تتوسع وتتجمع وتقتل الزهور قبل أن تنتج الثمار. العناقيد والأغصان والسيقان أيضًا عرضة للإصابة وتتطور إلى لون أسود تقليدي."
      },
      {
        english: "Twig dieback occurs when severe, elongated, blackened lesions form on stems and twigs die back apically.",
        arabic: "انخفاض الأغصان يحدث عندما تتشكل بقع سوداء مستديرة، طويلة على الأغصان وتتراجع الأغصان من الأعلى إلى الأسفل."
      },
      {
        english: "Vegetative Malformation: It is more commonly found on young seedlings. It is characterized by disrupting of apical growth resulting in several small flushes.",
        arabic: "تشوه النمو الخضري: يوجد عادة بشكل أكبر على الشتلات الصغيرة. يتميز بتعطيل النمو القمي مما يؤدي إلى تكوين عدة انبعاثات صغيرة."
      },
      {
        english: "The multi-branching of the shoot apex with scaly leaves is known as 'Bunchy Top' or 'Witches' Broom'. The malformed seedlings remain stunted and die.",
        arabic: "الفرع المتعدد لقمة السيقان مع أوراق قشرية يعرف باسم 'Bunchy Top' أو 'Witches' Broom'. الشتلات المشوهة تظل متقزمة وتموت."
      },
      {
        english: "Floral Malformation: In malformation of inflorescence, shows variation in the panicle. Malformed head dries up in a black mass and persists for a long time.",
        arabic: "تشوه الزهري: في تشوه التزهير، تظهر تغييرات في الكتلة. تجف الرأس المشوه في كتلة سوداء وتستمر لفترة طويلة."
      },
      {
        english: "The disease is noticed on leaves, leaf stalks, stems, twigs, branches, and fruits, initially producing water-soaked lesions, later turning into a typical canker.",
        arabic: "يلاحظ المرض على الأوراق وأعناق الأوراق والسيقان والأغصان والفروع والثمار، مما يؤدي في البداية إلى تكوين بقع مشبعة بالماء، ثم تتحول لتصبح تقرحة نموذجية."
      },
      {
        english: "Water-soaked irregular satellites to angular raised lesions measuring 1-4 mm in diameter are formed. These lesions are light yellow in color, initially with a yellow halo but with age enlarge or coalesce to form irregular necrotic cankerous patches with dark brown color.",
        arabic: "تتشكل بقع مستديرة أو مرتفعة غير منتظمة مشبعة بالماء بقطر يتراوح بين 1-4 ملم. هذه البقع لونها أصفر فاتح في البداية مع هالة صفراء، ولكن مع تقدم العمر تتوسع أو تتجمع لتشكيل تقرحات غير منتظمة متعفنة بلون بني داكن."
      },
      {
        english: "Water-soaked, dark brown to black-colored lesions are observed, which gradually develop into cankerous, raised or flat spots. These spots often burst, extruding gummy substances containing highly contagious bacterial cells.",
        arabic: "يُلاحظ وجود تقرحات مشبعة بالماء باللون البني الداكن إلى الأسود، والتي تتطور تدريجيًا إلى بقع قرحية مرتفعة أو مسطحة. تنفجر هذه البقع في كثير من الأحيان، مما يسفر عن إخراج مواد لزجة تحتوي على خلايا بكتيرية معديّة للغاية."
      },
      {
        english: "The pathogen causing dieback, tip dieback, graft union blight, twig blight, seedling rot, wood stain, stem-end rot, black root rot, fruit rot, dry rot, brown rot of panicle, etc.",
        arabic: "المسبب الرئيسي للتصفير، وانخفاض الأطراف، وجفاف اتحاد الزرع، وذبول الأغصان، وتعفن الشتلات، وتلطيخ الخشب، وتعفن أطراف السيقان، وتعفن الجذور السوداء، وتعفن الثمار، والتعفن الجاف، وتعفن الجزء العلوي للكتلة، وما إلى ذلك."
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
