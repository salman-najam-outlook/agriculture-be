'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Affected scales first appear water-soaked and pale yellow to light brown.",
        arabic: "الأوزان المتضررة تظهر أولاً بشكل مشبعة بالماء وبلون أصفر باهت إلى بني فاتح."
      },
      {
        english: "As the soft rot progresses, invaded fleshy scales become soft",
        arabic: "مع تقدم التعفن اللين، تصبح الأوزان اللحمية المصابة طرية"
      },
      {
        english: "Leaves turn yellow",
        arabic: "تتحول الأوراق إلى اللون الأصفر"
      },
      {
        english: "Main root system rots away.",
        arabic: "الجذور الرئيسية تتعفن وتتلاشى."
      },
      {
        english: "Tea bush eventually dies.",
        arabic: "أخيرًا يموت الشجيرة الشاي."
      },
      {
        english: "Decline of the bush",
        arabic: "انخفاض الشجيرة"
      },
      {
        english: "Wood bears superficial irregular dark‐grey to black raised patches",
        arabic: "الخشب يحمل تصاعدات سطحية غير منتظمة بلون رمادي داكن إلى أسود"
      },
      {
        english: "Dead branches carry small black patches.",
        arabic: "الفروع الميتة تحمل بقعًا سوداء صغيرة."
      },
      {
        english: "Yellow or brown foliage on affected branches",
        arabic: "أوراق صفراء أو بنية على الفروع المصابة"
      },
      {
        english: "Lesions at the collar region of the bush",
        arabic: "بؤر في منطقة العنق للشجيرة"
      },
      {
        english: "Dead wood can be seen by scraping back the bark",
        arabic: "يمكن رؤية الخشب الميت عند خرق اللحاء"
      },
      {
        english: "Small, oval, pale yellow-green spots appearing on young leaves.",
        arabic: "ظهور بقع صغيرة بلون أصفر فاتح-أخضر باهت على الأوراق الصغيرة بشكل بيضاوي."
      },
      {
        english: "Spots are surrounded by a narrow, yellow zone.",
        arabic: "البقع محاطة بمنطقة ضيقة صفراء."
      },
      {
        english: "Eventually, the dried tissue falls, leading to defoliation",
        arabic: "في النهاية، يسقط النسيج المجفف، مما يؤدي إلى تساقط الأوراق"
      },
      {
        english: "Seedlings develop yellowish cotyledons and may be reddish on the underside; seedlings may die within two to four weeks after planting.",
        arabic: "الشتلات تطور عند الانبات فحمراء على الجهة السفلية؛ الشتلات قد تموت خلال أسبوعين إلى أربعة أسابيع بعد الزراعة."
      },
      {
        english: "Leaves may have a bluish-green cast.",
        arabic: "قد تكون الأوراق لونها أخضر زرقاوي."
      },
      {
        english: "Roots are grayish or light brown, water-soaked, and have a reduced mass.",
        arabic: "الجذور رمادية أو بنية فاتحة، مشبعة بالماء، ولديها كتلة مخفضة."
      },
      {
        english: "Plants appear stunted and yellow.",
        arabic: "النباتات تبدو متقزمة وصفراء."
      },
      {
        english: "Lateral and fibrous roots are reduced.",
        arabic: "الجذور الجانبية والجذور الأليافية تتقلص."
      },
      {
        english: "Existing roots may be black and rotted.",
        arabic: "الجذور القائمة قد تكون سوداء ومتعفنة."
      },
      {
        english: "Seedlings fail to emerge or die soon after emergence.",
        arabic: "الشتلات لا تنمو أو تموت قريبًا بعد الظهور."
      },
      {
        english: "Plants appear stunted, yellow or reddish-purple lower leaves, may be wilted.",
        arabic: "النباتات تبدو متقزمة، الأوراق السفلية صفراء أو بنية حمراء، قد تكون متذبولة."
      },
      {
        english: "Taproots have tan to brown or red-brown to black lesions and can be rotted just below the crown",
        arabic: "الجذور الرئيسية لديها بقع بلون التان إلى البني أو البني الأحمر إلى الأسود ويمكن أن تتعفن مباشرة أدناه."
      },
      {
        english: "Seedlings fail to emerge or die soon after emergence.",
        arabic: "الشتلات لا تنمو أو تموت قريبًا بعد الظهور."
      },
      {
        english: "If emergence occurs, plants appear stunted, yellowish, may be wilted.",
        arabic: "إذا حدث الانبات، تبدو النباتات متقزمة، صفراء، قد تكون متذبولة."
      },
      {
        english: "Roots appear waterlogged, mushy, rotted.",
        arabic: "الجذور تبدو مشبعة بالماء، طرية، متعفنة."
      },
      {
        english: "Stunted plants have many spindly, shortened stems and small, light green to yellow leaflets.",
        arabic: "النباتات المتقزمة لديها العديد من السيقان النحيلة والمختصرة وأوراق صغيرة خضراء فاتحة إلى صفراء."
      },
      {
        english: "Outer vascular taproot tissue becomes yellow to dark golden brown.",
        arabic: "يصبح النسيج الخارجي للجذور الرئيسية الوعائية أصفر إلى بني ذهبي داكن."
      },
      {
        english: "Leaves may be cupped.",
        arabic: "قد تكون الأوراق مقوسة."
      },
      {
        english: "Seedlings fail to emerge or die soon after emergence.",
        arabic: "الشتلات لا تنمو أو تموت قريبًا بعد الظهور."
      },
      {
        english: "Tan, sunken, and elliptical lesions develop on the taproot where lateral roots emerge",
        arabic: "تظهر بقع بلون التان، منخفضة، وبيضاوية على الجذر الرئيسي حيث تنمو الجذور الجانبية."
      },
      {
        english: "During the winter, existing root lesions turn black.",
        arabic: "خلال فصل الشتاء، تصبح بقع الجذور القائمة سوداء."
      },
      {
        english: "Scattered, wilted plants are the first evidence.",
        arabic: "النباتات المتناثرة المتذبولة هي الدليل الأول."
      },
      {
        english: "One side of the stem may wilt and die or the whole plant may be affected.",
        arabic: "قد تتدلي إحدى جوانب الساق وتموت أو قد تتأثر النبات بأكمله."
      },
      {
        english: "Stems and leaves appear bleached",
        arabic: "السيقان والأوراق تبدو باهتة."
      },
      {
        english: "Stem tips wilt and bend forming a 'shepherd's crook'",
        arabic: "أطراف السيقان تتدلي وتنحني مكونة عصا الراعي."
      },
      {
        english: "Diamond-shaped, ash-gray lesions with dark-brown to purple borders develop on lower stems.",
        arabic: "تظهر بقع بشكل الماس بلون رمادي رمادي مع حواف بنية داكنة إلى بنفسجية على السيقان السفلية."
      },
      {
        english: "Lesions may girdle the stem, causing plants to wilt, drop leaves, and have straw-colored shoots.",
        arabic: "قد تحيط البقع بالسيقان، مما يؤدي إلى ذبول النباتات وتساقط الأوراق وظهور سيقان بلون قشي."
      },
      {
        english: "Systemic symptoms, such as chlorosis, generally appear on the second leaf, and all the subsequent leaves and panicles of the infected plant show symptoms.",
        arabic: "تظهر الأعراض النظامية، مثل تموج الأوراق، عادة على الورقة الثانية، وتظهر جميع الأوراق والسنابل اللاحقة للنبات المصاب أعراضًا."
      },
      {
        english: "Leaf symptoms begin as chlorosis at the base of the leaf lamina, and successively higher leaves show a progression of greater leaf area coverage by the symptoms.",
        arabic: "تبدأ أعراض الأوراق كتموج في قاع ورقة اللمينا، وتظهر الأوراق الأعلى تباعًا تظاهرات أكبر من مساحة الورق المغطاة بالأعراض."
      },
      {
        english: "Infected chlorotic areas produce a massive amount of asexual spores, generally on the lower surface, giving the leaf a 'downy' appearance.",
        arabic: "تنتج المناطق المصابة بالتموج كمية ضخمة من البواغي اللاجنسية، عادة على السطح السفلي، مما يمنح الورقة مظهرًا 'منتفخًا'."
      },
      {
        english: "Rust symptoms first appear on lower leaves as typical pustules containing reddish-brown powder (uredospores).",
        arabic: "تظهر أعراض الصدأ أولاً على الأوراق السفلية كبثور نمطية تحتوي على مسحوق بني أحمر (عديم الجنسية)."
      },
      {
        english: "Later, dark brown teliospores are produced. Symptoms can occur on both the upper and lower surfaces of the leaves but mostly on the upper surface and also on the stem. Highly susceptible cultivars develop large pustules on leaf blades and sheaths.",
        arabic: "فيما بعد، يتم إنتاج بواغي بني غامق. يمكن أن تحدث الأعراض على كل من السطحين العلوي والسفلي للأوراق ولكن في الغالب على السطح العلوي وأيضًا على الساق. الأصناف ذات القابلية العالية تطور بثور كبيرة على أوراق الشفرات والغمر."
      },
      {
        english: "It appears, generally after the grain-filling stage, causing little or no loss in grain yield.",
        arabic: "يظهر عادة بعد مرحلة ملء الحبوب، مما يتسبب في فقدان قليل أو عدم فقدان في محصول الحبوب."
      },
      {
        english: "In the infected florets, ovaries are converted into structures called sori.",
        arabic: "في الأزهار المصابة، تتحول المبايض إلى هياكل تسمى بالبواغي."
      },
      {
        english: "The sori are larger than grains and appear as enlarged, oval to conical bodies projecting somewhat beyond the glumes in place of grains. Initially,",
        arabic: "البواغي أكبر من الحبوب وتظهر على شكل هياكل متضخمة بيضاوية إلى مخروطية تبرز إلى حد ما ما وراء القوالب بدلاً من الحبوب. في البداية,"
      },
      {
        english: "The sori are bright green but later turn brown to black",
        arabic: "البواغي خضراء زاهية ولكن في وقت لاحق تتحول إلى اللون البني إلى الأسود"
      },
      {
        english: "The disease is easily identified as a honeydew substance of creamy to light pinkish ooze out of the infected florets which contains numerous conidia.",
        arabic: "يمكن تحديد المرض بسهولة عن طريق مادة عسلية منتفخة بين اللونين الكريمي والزهري الفاتح تنتشر من الأزهار المصابة والتي تحتوي على أعداد كبيرة من البواغي."
      },
      {
        english: "Within two weeks, these droplets dry out as hard dark black structures larger than seeds, protruding out from the florets in place of grain, which are called sclerotia.",
        arabic: "في غضون أسبوعين، تجف هذه القطرات متحولة إلى هياكل سوداء صلبة أكبر من البذور، تبرز من الأزهار بدلاً من الحبوب، وتسمى بالجسيمات."
      },
      {
        english: "Here the loss in grain yield is directly proportional to the percentage of infection as the infected seed is fully transformed into sclerotium.",
        arabic: "هنا يكون فقدان إنتاج الحبوب متناسبًا مباشرة مع نسبة العدوى حيث يتم تحول البذرة المصابة بالكامل إلى الجسيم."
      },
      {
        english: "Stalks become discoloured and hollow.",
        arabic: "تصبح السيقان غير ملونة وفارغة."
      },
      {
        english: "Internal tissues are reddened with intermingled transverse white spots",
        arabic: "تحمر الأنسجة الداخلية مع وجود بقع بيضاء عرضية متداخلة"
      },
      {
        english: "A sour smell emanates.",
        arabic: "رائحة حامضة تنبعث."
      },
      {
        english: "Whip-like structure of 25 – 150 cm. Whip covered by translucent silvery membrane enclosing a mass of black powdery spores.",
        arabic: "هيكل شبيه بالسوط بطول 25 - 150 سم. السوط مغطى بغشاء فضي شفاف يحتوي على كتلة من البواغي السوداء المسحوقة."
      },
      {
        english: "Initial thin canes with elongated internodes later become reduced in length.",
        arabic: "السيقان الرقيقة الأولية ذات الأنسجة الداخلية الممتدة تصبح في وقت لاحق أقصر."
      },
      {
        english: "Profuse sprouting of lateral buds with narrow, erect leaves especially in ratoon crop",
        arabic: "نمو كثيف للبراعم الجانبية مع وجود أوراق ضيقة مستقيمة خاصة في محصول القصب المعاد."
      },
      {
        english: "Rusty appearance on leaves",
        arabic: "مظهر صدئ على الأوراق"
      },
      {
        english: "Premature death of the leaf.",
        arabic: "وفاة مبكرة للورقة."
      },
      {
        english: "These spots turn red-brown to brown in color",
        arabic: "تتحول هذه البقع إلى اللون البني الأحمر إلى اللون البني"
      },
      {
        english: "Proliferation of vegetative buds",
        arabic: "تكاثر البراعم الخضرية"
      },
      {
        english: "The tillers bear pale yellow to completely chlorotic leaves",
        arabic: "الأفرع تحمل أوراقًا صفراء شاحبة إلى كاملة الاصفرار"
      },
      {
        english: "The canes are thin with short internodes",
        arabic: "السيقان رقيقة مع أنسجة داخلية قصيرة"
      },
      {
        english: "Yellowing of the leaf midrib on the underside of the leaf",
        arabic: "إصفرار الوريقة على السطح السفلي للورقة"
      },
      {
        english: "Discoloration of leaves",
        arabic: "تغير لون الأوراق"
      },
      {
        english: "Bunchy appearance of the plant",
        arabic: "مظهر النبات كومة"
      },
      {
        english: "Stunted growth",
        arabic: "نمو متوقف"
      },
      {
        english: "Affected leaves are brittle with their margins rolled upwards.",
        arabic: "الأوراق المتأثرة هشة مع تجعيد حوافها لأعلى."
      },
      {
        english: "Do not produce bunches of any commercial value",
        arabic: "لا تنتج كومًا له قيمة تجارية"
      },
      {
        english: "Yellowing of lower leaves, including leaf blades and petioles.",
        arabic: "إصفرار الأوراق السفلية، بما في ذلك أوراق اللمينا وأعناق الأوراق."
      },
      {
        english: "Yellowish to reddish streaks are noted with intensification of color towards the rhizome.",
        arabic: "يُلاحظ وجود خطوط صفراء إلى حمراء على الخاصرة مع زيادة اللون نحو الدرنة."
      },
      {
        english: "Longitudinal splitting of pseudostem.",
        arabic: "تشقق طولي للسيقان الزائفة."
      },
      {
        english: "Infected fruits become black and rotten.",
        arabic: "تصبح الثمار المصابة سوداء ومتعفنة."
      },
      {
        english: "Black lesions on the pedicel.",
        arabic: "بقع سوداء على العنقود."
      },
      {
        english: "Fruit shrivelled",
        arabic: "انكمشت الثمرة."
      },
      {
        english: "Reduced bunch size and uneven ripening of fruit",
        arabic: "تقليل حجم العنقود ونضوج غير متساوي للثمرة"
      },
      {
        english: "Reduces the plant's photosynthetic potential.",
        arabic: "تقليل إمكانية النبات في التمثيل الضوئي."
      },
      {
        english: "Defoliation",
        arabic: "تساقط الأوراق"
      },
      {
        english: "Small water-soaked tan spots on outer leaves",
        arabic: "بقع صغيرة مشبعة بالماء بلون بني فاتح على الأوراق الخارجية"
      },
      {
        english: "Shot-hole appearance on the plant",
        arabic: "مظهر الثقوب على النبات"
      },
      {
        english: "Outer leaves often break off",
        arabic: "غالبًا ما تتكسر الأوراق الخارجية"
      },
      {
        english: "Soft watery lesions on leaves",
        arabic: "بقع مائية ناعمة على الأوراق"
      },
      {
        english: "Leaves collapse and lie on the soil surface",
        arabic: "الأوراق تنهار وتقع على سطح التربة"
      },
      {
        english: "Black fungal structures on infected leaf tissue",
        arabic: "هياكل فطرية سوداء على أنسجة الأوراق المصابة"
      },
      {
        english: "White fungal growth on both sides of leaves",
        arabic: "نمو فطري أبيض على الجانبين من الأوراق"
      },
      {
        english: "Leaves turning yellow or brown",
        arabic: "الأوراق تتحول إلى اللون الأصفر أو البني"
      },
      {
        english: "Small black fruiting bodies may be visible",
        arabic: "يمكن رؤية هياكل مثمرة سوداء صغيرة"
      },
      {
        english: "Small chlorotic spots on old leaves",
        arabic: "بقع صفراء صغيرة على الأوراق القديمة"
      },
      {
        english: "Lesions may fall out creating holes",
        arabic: "قد تتساقط البقع وتتسبب في تكوين ثقوب"
      },
      {
        english: "Wilting leaves and plant death",
        arabic: "ذبول الأوراق وموت النبات"
      },
      {
        english: "Veins enlarged and clear",
        arabic: "الأوعية الليفية تتوسع وتصبح واضحة"
      },
      {
        english: "Puckered or ruffled leaves",
        arabic: "أوراق متجعدة أو مموجة"
      },
      {
        english: "Upright outer leaves",
        arabic: "أوراق خارجية متسامرة"
      },
      {
        english: "Circular lesions and black patches on chili pods",
        arabic: "بقع دائرية وبقع سوداء على قرون الفلفل الحار"
      },
      {
        english: "Irregular brown spots with dark brown holes on leaves and stems",
        arabic: "بقع بنية غير منتظمة مع ثقوب بنية داكنة على الأوراق والسيقان"
      },
      {
        english: "The affected fruits may fall off subsequently",
        arabic: "قد تتساقط الثمار المصابة لاحقًا"
      },
      {
        english: "Black lesions on stems",
        arabic: "بقع سوداء على السيقان"
      },
      {
        english: "Circular gray-brown lesions on leaves and wilting of the plant",
        arabic: "بقع دائرية بنية رمادية على الأوراق وذبول النبات"
      },
      {
        english: "Dark lesions on fruit which may be covered in white sporangia",
        arabic: "بقع داكنة على الثمار قد تكون مغطاة ببيض متكتل أبيض"
      },
      {
        english: "Upward curling in the leaves, crinkling appearance",
        arabic: "تجعيد أعلى في الأوراق، مظهر متجعد"
      },
      {
        english: "Shortening of petioles, internodes, and bunchy leaves",
        arabic: "تقصير الأعناق والأنسجة الداخلية وأوراق كومية"
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
        arabic: "إصفرار طفيف أولي للأوراق وذبول الأوراق العليا"
      },
      {
        english: "The vascular system of the plant is discoloured",
        arabic: "الجهاز الوعائي للنبات ملون بشكل غير طبيعي"
      },
      {
        english: "Dieback of twigs",
        arabic: "موت أطراف الأفرع"
      },
      {
        english: "Premature leaf drop",
        arabic: "تساقط الأوراق المبكر"
      },
      {
        english: "Dark staining on fruit",
        arabic: "تلويث داكن على الثمار"
      },
      {
        english: "The disease causes small, round blister-like formations on leaves, branches, stems, new shoots, and fruit",
        arabic: "المرض يسبب تشكيلات صغيرة دائرية تشبه الفقاعات على الأوراق والأفرع والسيقان والأفرع الجديدة والثمار"
      },
      {
        english: "Crater-like lesions form on the surface surrounded by an oily, water-soaked margin or yellow halo",
        arabic: "تتشكل بقع مشابهة للفوهة على السطح محاطة بحافة زيتية مشبعة بالماء أو هالة صفراء"
      },
      {
        english: "In young fruit, an ooze of resinous substance may be observed.",
        arabic: "في الثمار الصغيرة، يمكن مشاهدة تسرب مادة راتنجية."
      },
      {
        english: "Citrus scab attacks the fruit, leaves, and twigs, producing slightly raised, irregular scabby or wart-like outgrowths.",
        arabic: "مرض الصدأ في الحمضيات يصيب الثمار والأوراق والأغصان، مما ينتج عنه نموات مرتفعة قليلاً ومنتظمة قليلاً أو نموات تشبه الثؤلول أو الثؤلول."
      },
      {
        english: "The scabs are grey or pinkish at first and become darker with age. They are more common on lemon fruits than leaves.",
        arabic: "الثؤلول رمادية أو زهرية في البداية وتصبح أغمق مع التقدم في العمر. إنها أكثر شيوعًا على ثمار الليمون من الأوراق."
      },
      {
        english: "The raised lumps associated with scab can be confused with symptoms caused by the disease botrytis or with wind-rub abrasions.",
        arabic: "النتوءات المرتفعة المرتبطة بالثؤلول يمكن أن تتسبب في الخلط بينها وبين الأعراض الناجمة عن مرض البوتريت أو بالتآكل الناجم عن الرياح."
      },
      {
        english: "Light green foliage, poor new growth, leaves may be dropping from the tree",
        arabic: "أوراق خضراء فاتحة، نمو جديد ضعيف، قد تتساقط الأوراق من الشجرة"
      },
      {
        english: "Severely infected trees are stunted and bushy in appearance with chlorotic leaves and brittle twigs",
        arabic: "الأشجار المصابة بشدة تكون متقزمة وكثيفة في المظهر مع وجود أوراق خضراء باهتة وأغصان هشة"
      },
      {
        english: "Some strains of the virus cause elongated pits in the trunk and branches, which give the wood a rope-like appearance.",
        arabic: "بعض سلالات الفيروس تسبب حفرًا ممتدة في الجذع والأغصان، مما يمنح الخشب مظهرًا شبيهًا بالحبل."
      },
      {
        english: "Yellowing of leaf veins, blotchy mottling on leaf blades",
        arabic: "إصفرار عروق الورقة، تشقق بقعي على شفرات الأوراق"
      },
      {
        english: "Twig and limb dieback and fruits dropping prematurely",
        arabic: "موت الفروع والأغصان وتساقط الثمار مبكرًا"
      },
      {
        english: "Small, misshapen fruit and fruit very bitter.",
        arabic: "ثمار صغيرة مشوهة ومرة للغاية."
      },
      {
        english: "Pale brown sunken spots may appear on the cotyledons of infected seedlings.",
        arabic: "قد تظهر بقع بنية فاتحة مغوارة على أوراق الفلفل الحار الشابة المصابة."
      },
      {
        english: "Lesions on leaves are dark brown.",
        arabic: "البقع على الأوراق بنية داكنة."
      },
      {
        english: "They are restricted to the veins on the lower leaf surface. On stems, lesions are elongated and sunken.",
        arabic: "تقتصر على الأوراق السفلية. على السيقان، تعد البقع ممتدة ومغوارة."
      },
      {
        english: "The fungus produces a grey mould on the lower surface of the spots.",
        arabic: "الفطر ينتج عفن رمادي على السطح السفلي للبقع."
      },
      {
        english: "Infected pods have brown blotches",
        arabic: "القرون المصابة بها بقع بنية."
      },
      {
        english: "The spots may increase in size, join together, and cause yellowing and necrosis of the affected leaves",
        arabic: "قد تزداد حجمًا وتنضم معًا، وتتسبب في إصفرار ونخر الأوراق المصابة."
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
