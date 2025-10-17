'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Rust-colored pustules form on the lower leaf surfaces.",
        arabic: "تشكل قروح بلون الصدأ على الأسطح السفلية للأوراق."
      },
      {
        english: "Severely infected leaves turn yellow, wilt, and then drop off of the plant.",
        arabic: "تتحول الأوراق المصابة بشدة إلى اللون الأصفر، تذبل، ثم تتساقط عن النبات."
      },
      {
        english: "Stems and pods may also be infected. It affects most types of beans under humid conditions",
        arabic: "السيقان والقرون يمكن أن تُصاب أيضًا. إنها تؤثر على معظم أنواع الفاصولياء في الظروف الرطبة."
      },
      {
        english: "Symptoms of bean common mosaic virus (BCMV) are cupping and twisting of leaves with a light and dark green mosaic pattern.",
        arabic: "أعراض فيروس تجعد وتلويح الأوراق مع نمط موزاييك أخضر فاتح وأخضر داكن."
      },
      {
        english: "The dark green tissue is often bubbled and/or in bands next to the veins.",
        arabic: "النسيج الأخضر الداكن غالبًا ما يكون متدرجًا و / أو في تجاعيد بجوار الأوردة."
      },
      {
        english: "Affected plants produce smaller, curled pods with a greasy appearance resulting in poor yields.",
        arabic: "النباتات المتأثرة تنتج قرونًا صغيرة ملتوية ذات مظهر دهني مما يؤدي إلى حصاد ضعيف."
      },
      {
        english: "The initial symptoms of sweet orange scab form on very young fruit as lesions that are slightly raised and pink to light brown.",
        arabic: "تظهر أعراض الصدأ البرتقالي الحلو الأولية على الفاكهة الصغيرة جدًا على شكل آفات مرتفعة قليلاً ولونها وردي إلى بني فاتح."
      },
      {
        english: "The lesion color changes to yellowish brown and eventually to dark gray.",
        arabic: "يتغير لون الآفة إلى بني أصفر ثم تدريجياً إلى رمادي داكن."
      },
      {
        english: "Orange scab can cause premature fruit drop and stunt young nursery trees and new field plantings, but has little impact on fruit quality.",
        arabic: "يمكن أن يتسبب الصدأ البرتقالي في التساقط المبكر للثمار وتقزيم الأشجار الصغيرة في مشاتل الأشجار وزراعة الحقول الجديدة، لكنه له تأثير ضئيل على جودة الثمار."
      },
      {
        english: "Trees infected with tristeza show light green foliage, and some leaf drop.",
        arabic: "تظهر أشجار المصابة بالتريستيزا أوراق خضراء فاتحة، وتساقط بعض الأوراق."
      },
      {
        english: "Feeder roots die from the tip towards the main root.",
        arabic: "تموت الجذور المتغذية من الطرف نحو الجذر الرئيسي."
      },
      {
        english: "Yellow seedlings, Stem pitting, poor fruit quality",
        arabic: "البادئات الصفراء، نقر الساق، جودة ضعيفة للثمار"
      },
      {
        english: "Lopsided, bitter, hard fruit with small, dark aborted seeds",
        arabic: "ثمار مائلة، مرة، صلبة مع بذور مجهضة صغيرة وداكنة"
      },
      {
        english: "Fruit that remains green even when ripe",
        arabic: "ثمار تظل خضراء حتى عندما تكون ناضجة"
      },
      {
        english: "Asymmetrical blotchy mottling of leaves, yellow shoots, twig dieback",
        arabic: "تغطية شكلية غير متماثلة على الأوراق، وأفرع صفراء، وذبول أفرع صغيرة"
      },
      {
        english: "Leaves turn to pale green.",
        arabic: "تتحول الأوراق إلى اللون الأخضر الفاتح."
      },
      {
        english: "On leaves, cottony white mycelial growth develops and appears white.",
        arabic: "على الأوراق، تتطور نموات أبيض قطني وتظهر باللون الأبيض."
      },
      {
        english: "White downy growth appears on the surface of the leaves.",
        arabic: "نمو أبيض قطني يظهر على سطح الأوراق."
      },
      {
        english: "White downy growth appears on the surface of the leaves.",
        arabic: "نمو أبيض قطني يظهر على سطح الأوراق."
      },
      {
        english: "Seedlings topple after emerging from soil.",
        arabic: "البادئات تسقط بعد ظهورها من التربة."
      },
      {
        english: "It occurs at ground or below ground level.",
        arabic: "يحدث على مستوى الأرض أو تحت مستوى الأرض."
      },
      {
        english: "Infected tissues appear soft and water soaked.",
        arabic: "تظهر الأنسجة المصابة رخوة ومشبعة بالماء."
      },
      {
        english: "Bacterial soft rot is mainly a problem on mature bulbs.",
        arabic: "التعفن الرخو البكتيري هو مشكلة أساسية على البصل الناضج."
      },
      {
        english: "Affected scales first appear water-soaked and pale yellow to light brown.",
        arabic: "الأوزان المتأثرة تظهر أولاً مشبعة بالماء ولونها أصفر فاتح إلى بني فاتح."
      },
      {
        english: "As the soft rot progresses, invaded fleshy scales become soft",
        arabic: "مع تقدم التعفن الرخو، تصبح الأوزان اللحمية المُغزاة ناعمة."
      },
      {
        english: "Infection usually is through neck tissues as foliage dies down at maturity.",
        arabic: "العدوى عادة ما تكون من خلال أنسجة العنق بينما تموت الأوراق عند النضوج."
      },
      {
        english: "Infected bulbs are discoloured black around the neck, and affected scales shrivel.",
        arabic: "البصل المصاب يتغير لونه إلى الأسود حول العنق، والأوزان المتأثرة تجف."
      },
      {
        english: "Masses of powdery black spores develop as streaks along veins on and between outer dry scale",
        arabic: "تتطور كتل من الأبواغ السوداء المسودة كخطوط على طول الأوردة على وبين الأوزان الجافة الخارجية."
      },
      {
        english: "Infection usually is through neck tissues as foliage dies down at maturity.",
        arabic: "العدوى عادة ما تكون من خلال أنسجة العنق بينما تموت الأوراق عند النضوج."
      },
      {
        english: "Infected bulbs are discoloured green around the neck, and affected scales shrivel.",
        arabic: "البصل المصاب يتغير لونه إلى الأخضر حول العنق، والأوزان المتأثرة تجف."
      },
      {
        english: "Masses of powdery green spores generally are arranged as streaks along veins on",
        arabic: "تكون كتل من الأبواغ الخضراء المسودة عمومًا مرتبة على شكل خطوط على طول الأوردة."
      },
      {
        english: "The initial symptoms are yellowing and dieback of leaf tips.",
        arabic: "الأعراض الأولية هي تصفير وذبول أطراف الأوراق."
      },
      {
        english: "Later, scales, stem plates and roots get destroyed.",
        arabic: "في وقت لاحق، يتم تدمير الأوزان وألواح الساق والجذور."
      },
      {
        english: "The bulbs become soft and water soaked.",
        arabic: "البصل يصبح ناعمًا ومشبعًا بالماء."
      },
      {
        english: "Leaves show lesions that maybe diamond or spindle-shaped.",
        arabic: "الأوراق تظهر بها آفات قد تكون ماسية أو على شكل مغزل."
      },
      {
        english: "They are straw-colored and sometimes have distinct green center with yellow borders.",
        arabic: "لونها لون القش وأحيانًا لها مركز أخضر واضح مع حواف صفراء."
      },
      {
        english: "Flower stalks are infected in later stages.",
        arabic: "سيتم معالجة أعراض العدوى في المراحل المتأخرة."
      },
      {
        english: "The earliest symptom of garlic rust is small, circular to elongate white flecks that occur on both sides of leaves.",
        arabic: "أول عرض لصدأ الثوم هو بقع بيضاء صغيرة دائرية إلى مستطيلة تظهر على الجانبين من الأوراق."
      },
      {
        english: "As the disease progresses, these small spots expand, and the leaf tissue covering the lesions ruptures and masses of orange, powdery spores (uredospores) then become visible as pustules.",
        arabic: "مع تقدم المرض، تتوسع هذه البقع الصغيرة، وينفتح النسيج الورقي الذي يغطي الآفات وتصبح كتل من الأبواغ البرتقالية مسودة (أبواغ الأوريدو) ثم تظهر كقروح."
      },
      {
        english: "Severely infected leaves are almost entirely covered with pustules, resulting in extensive yellowing, wilting and premature drying of leaves.",
        arabic: "الأوراق المصابة بشدة مغطاة تقريبًا بالكامل بالقروح، مما يؤدي إلى تصفير وذبول وجفاف مبكر مكثف للأوراق."
      },
      {
        english: "Abnormal elongation of the neck.",
        arabic: "تمدد غير طبيعي للعنق."
      },
      {
        english: "Twisting, curling of leaves.",
        arabic: "تلويح ولف الأوراق."
      },
      {
        english: "Water-soaked lesions that are pale yellow in colour appear initially on leaf blades.",
        arabic: "تظهر آفات مشبعة بالماء ذات لون أصفر فاتح في البداية على ألواح الأوراق."
      },
      {
        english: "Parts of spear leaf petiole or rachi turning brown",
        arabic: "أجزاء من ساق أو سياق أوراق الرمح تتحول إلى اللون البني."
      },
      {
        english: "Discoloration may be associated with a wet rot",
        arabic: "التلون قد يكون مرتبطًا بالتعفن الرطب."
      },
      {
        english: "Spear leaf may be wilted and/or chlorotic",
        arabic: "سياق أوراق الرمح قد يتجول و / أو يصبح أصفر."
      },
      {
        english: "Reduced growth of palm and older fronds turning chlorotic or necrotic",
        arabic: "نمو مقلل للنخيل وأوراقه القديمة تتحول إلى الأصفر أو تنخرط."
      },
      {
        english: "Pale green foliage",
        arabic: "أوراق خضراء فاتحة"
      },
      {
        english: "Drooping fronds",
        arabic: "أوراق تنحني"
      },
      {
        english: "Field palms may exhibit a bright yellow chlorosis of leaves in the mid-canopy which starts at the tip pf the pinnae and moves towards petioles before affecting adjacent fronds and spreading to older leaves in the canopy.",
        arabic: "قد تظهر أشجار النخيل في الحقل تصفر ساطع للأوراق في الطبقة الوسطى من الغطاء النباتي الذي يبدأ من الطرف الأخير للأوراق ويتجه نحو السياقات قبل التأثير على الأوراق المجاورة والانتشار إلى الأوراق الأكبر في الغطاء."
      },
      {
        english: "In older palms, lower leaves wilt and dry out and fronds break close to the base of the trunk; new fronds are chlorotic and stunted.",
        arabic: "في أشجار النخيل القديمة، تذبل الأوراق السفلية وتجف والأوراق تنكسر بالقرب من قاعدة الجذع؛ الأوراق الجديدة تصبح أصفر فاتحة ومقززة."
      },
      {
        english: "Drying of leaves",
        arabic: "تجفيف الأوراق"
      },
      {
        english: "Tiny black spots on leaves which enlarge into 2 mm long elliptical, elongated lesions",
        arabic: "بقع سوداء صغيرة على الأوراق تتوسع إلى آفات بيضاوية طويلة بطول 2 مم"
      },
      {
        english: "Lesions may expand and be surrounded by black tissue and chlorosis between lesions",
        arabic: "قد تتوسع الآفات وتكون محاطة بأنسجة سوداء وتصفر بين الآفات"
      },
      {
        english: "Lesions may be present on leaf petioles and rachis",
        arabic: "قد تكون الآفات موجودة على سياقات الأوراق وسياق الأوراق"
      },
      {
        english: "Leaf symptoms include round, brown spots with concentric rings",
        arabic: "أعراض الأوراق تتضمن بقعًا دائرية باللون البني مع حلقات متمركزة"
      },
      {
        english: "Spots often have a yellow halo, and can crack through the middle",
        arabic: "البقع غالبًا ما تكون لها هالة صفراء ويمكن أن تتصدع في منتصفها"
      },
      {
        english: "As the disease spreads, leaves can develop enough spots that they begin to meld together to create large necrotic areas on leaves",
        arabic: "مع انتشار المرض، يمكن أن تطور الأوراق ما يكفي من البقع حتى تبدأ في الاندماج معًا لتكوين مناطق نخر كبيرة على الأوراق"
      },
      {
        english: "The young radical and the plumule are killed and there is complete rotting of the seedlings",
        arabic: "الجذر الصغير والسياق الجنيني يتم قتلهما ويحدث تعفن كامل للبادئات"
      },
      {
        english: "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level",
        arabic: "المرحلة بعد الظهور مميزة بالعدوى للأنسجة الصغيرة والشابة للعنق على مستوى الأرض"
      },
      {
        english: "The seedlings topple over or  collapse",
        arabic: "البادئات تنكسر أو تنهار"
      },
      {
        english: "First appear as chlorotic or yellow (angular) areas near the leaf margins",
        arabic: "تظهر أولاً كمناطق تصفيرية أو صفراء (زاوية) بالقرب من حواف الأوراق"
      },
      {
        english: "Yellow area extends to veins and midrib forming characteristic ‘v’ shaped chlorotic spots which later turn black",
        arabic: "تمتد المنطقة الصفراء إلى الأوردة والسياق الوسطي مكونة بقع تصفيرية على شكل 'V' مميزة تتحول في وقت لاحق إلى اللون الأسود"
      },
      {
        english: "Veins and veinlets turn brown and finally black",
        arabic: "الأوردة والوريدات تتحول إلى اللون البني وأخيراً إلى اللون الأسود"
      },
      {
        english: "Small purplish brown spots on under surface of leaves",
        arabic: "بقع صغيرة بنية محمرة على السطح السفلي للأوراق"
      },
      {
        english: "Small, pale yellow angular spots on upper surface of leaves, with downy growth on the under surface",
        arabic: "بقع صفراء فاتحة صغيرة زاوية على السطح العلوي للأوراق، مع نمو أبيض قطني على السطح السفلي"
      },
      {
        english: "The spots coalesce and the leaves shrivel and dries up prematurel",
        arabic: "البقع تندمج والأوراق تتقلص وتجف مبكراً"
      },
      {
        english: "Leaves sometime show signs of wilting or water loss",
        arabic: "الأوراق في بعض الأحيان تظهر علامات على التجفيف أو فقدان الماء"
      },
      {
        english: "The stalk near the ground become water-soaked with brownish discolouration and are easily breakable.",
        arabic: "يصبح السياق بالقرب من الأرض مشبعًا بالماء بتلون بني ويمكن كسره بسهولة."
      },
      {
        english: "The rotting tissues emit a putrid smell.",
        arabic: "الأنسجة المتعفنة تنبعث منها رائحة كريهة."
      },
      {
        english: "Small yellowish round or oval spots appear on the leaves",
        arabic: "بقع صغيرة صفراء دائرية أو بيضاوية تظهر على الأوراق"
      },
      {
        english: "Yellowish spots enlarge and become elliptical",
        arabic: "البقع الصفراء تتوسع وتصبح بيضاوية"
      },
      {
        english: "Center becomes straw coloured with a reddish brown margin",
        arabic: "المركز يصبح باللون القش مع حافة بنية حمراء"
      },
      {
        english: "Disease appears at pre-flowering stage in 40-50 days old plants but can also occur on younger plants",
        arabic: "يظهر المرض في مرحلة ما قبل الإزهار في النباتات التي تبلغ 40-50 يومًا من العمر ولكن يمكن أن يحدث أيضًا في النباتات الأصغر سنًا"
      },
      {
        english: "Symptoms develop on leaves, sheaths and stalks and can later spread to ears",
        arabic: "تظهر الأعراض على الأوراق والغمد والسياقات ويمكن أن تنتشر لاحقًا إلى الأذنين"
      },
      {
        english: "On leaves and sheaths, a number of soaked, discolored concentric bands and rings are visible, often brown, tan or gray in color",
        arabic: "على الأوراق والغمد، يمكن رؤية عدد من الخواص المشبعة بالمياه والمتلونة بشكل تركيزي وحلقات، غالبًا باللون البني أو البيج أو الرمادي"
      },
      {
        english: "It is characterized by the presence of long, narrow, brownish, interveinal stripes on leaves",
        arabic: "يتميز بوجود خطوط بنية ضيقة وطويلة بين الأوراق"
      },
      {
        english: "Whitish downy fungal growth may be observed on close examination on underside of the stripes",
        arabic: "يمكن مشاهدة نمو فطري أبيض على الجانب السفلي للخطوط عند فحصها عن كثب"
      },
      {
        english: "Early-stage symptoms are visible as flecks or blobs on the lowermost leaves, giving them a burnt appearance",
        arabic: "تظهر أعراض المرحلة المبكرة على شكل بقع أو كتل على أسفل الأوراق السفلية، مما يمنحها مظهرًا محروقًا"
      },
      {
        english: "Entire crop give a blasted or burnt appearance",
        arabic: "المحصول بأكمله يظهر بمظهر منفجر أو محروق"
      },
      {
        english: "Neck region of panicle develops a black color and shrivels completely / partially grain set inhibited, panicle breaks at the neck and hangs",
        arabic: "منطقة العنق للسنبلة تتطور بلون أسود وتجف تمامًا / جزئيًا وتتوقف عن النمو، والسنبلة تنكسر عند العنق وتتعلق"
      },
      {
        english: "Nodal Blast: Nodes become black and break up",
        arabic: "انفجار العقد: تصبح العقد سوداء وتتكسر"
      },
      {
        english: "Water-soaked to yellowish stripes on leaf blades or starting at leaf tips",
        arabic: "خطوط مشبعة بالمياه إلى صفراء على ألواح الأوراق أو تبدأ من أطراف الأوراق"
      },
      {
        english: "Appearance of bacterial ooze that looks like a milky or opaque dewdrop on young lesions early in the morning",
        arabic: "ظهور سائل بكتيري يبدو مثل قطرة ندى لبنية أو غير شفافة على اللويحات الصغيرة في الصباح الباكر"
      },
      {
        english: "Lessions turn yellow to white as the disease advances",
        arabic: "البقع تتحول من اللون الأصفر إلى الأبيض مع تقدم المرض"
      },
      {
        english: "Leaves become yellow or orange-yellow, may also have rust-colored spots",
        arabic: "تصبح الأوراق صفراء أو صفراء برتقالية، وقد تحمل أيضًا بقعًا بنية اللون"
      },
      {
        english: "Discoloration begins from leaf tip and extends down to the blade or the lower leaf portion",
        arabic: "يبدأ التلوين من طرف الورقة ويمتد إلى الجزء السفلي من الشفرة أو الجزء السفلي للورقة"
      },
      {
        english: "Delayed flowering, - panicles small and not completely exerted",
        arabic: "تأخر الإزهار، - سنابل صغيرة وليست مكتملة"
      },
      {
        english: "Irregular spots or lesions, with dark reddish brown margins and gray center",
        arabic: "بقع غير منتظمة أو آفات، بحواف بنية حمراء داكنة ومركز رمادي"
      },
      {
        english: "Discoloration in the flag leaf sheath",
        arabic: "تغيير اللون في غمدة الورقة العليا"
      },
      {
        english: "Lesions enlarge and often coalesce and may cover the entire leaf sheath",
        arabic: "البقع تتكبير وتندمج في كثير من الأحيان وقد تغطي غمدة الورقة بأكملها"
      },
      {
        english: "Tan or reddish-brown lesions (spots) develop first on the underside of leaves",
        arabic: "البقع البنية أو البنية الحمراء تظهر أولاً على الجانب السفلي للأوراق"
      },
      {
        english: "Symptoms begin on leaves in the lower plant canopy",
        arabic: "تبدأ الأعراض على الأوراق في الطبقة السفلية للنبات"
      },
      {
        english: "Small pustules (blisters) develop in the lesions, which break open and release masses of tan spores",
        arabic: "تتطور بثور صغيرة في البقع، والتي تنفتح وتطلق كميات من البذور البنية"
      },
      {
        english: "Mottling appears as light and dark green patches on individual leaves",
        arabic: "التشويه يظهر على شكل تجمعات خضراء فاتحة وداكنة على أوراق النبات الفردية"
      },
      {
        english: "Symptoms are most obvious on young, rapidly growing leaves",
        arabic: "الأعراض تكون واضحة بشكل أكبر على الأوراق الشابة ذات النمو السريع"
      },
      {
        english: "The disease is characterized by light and day green mottling on the leaves often accompanied by wilting of young leaves in sunny days when plants first become infected.",
        arabic: "المرض يتميز بوجود تشويه خضري فاتح وداكن على الأوراق غالبًا مصاحبًا لذبول الأوراق الشابة في الأيام المشمسة عندما يتعرض النبات للعدوى لأول مرة"
      },
      {
        english: "Symptoms usually begin in the upper canopy because young leaves are most susceptible",
        arabic: "الأعراض تبدأ عادة في الطبقة العلوية للشجرة لأن الأوراق الشابة هي الأكثر عرضة للإصابة"
      },
      {
        english: "Small, angular, reddish-brown lesions are surrounded by a yellow halo.",
        arabic: "البقع الصغيرة والزاوية والبنية الحمراء محاطة بهالة صفراء."
      },
      {
        english: "As the disease progresses, lesions often grow together to produce large, irregularly shaped dead areas",
        arabic: "مع تقدم المرض، غالبًا ما تنمو البقع معًا لتكوين مناطق كبيرة من الموت بأشكال غير منتظمة"
      },
      {
        english: "Foliar symptoms can be similar to those of sudden death syndrome and stem canker and appear after early pod set",
        arabic: "الأعراض الورقية يمكن أن تكون مشابهة لتلك الظاهرة في متلازمة الموت المفاجئ وقلق الساق وتظهر بعد تكوين القرون المبكر"
      },
      {
        english: "Stem symptoms usually occur prior to leaf symptoms",
        arabic: "الأعراض على الساق تحدث عادة قبل الأعراض على الأوراق"
      },
      {
        english: "Can occur even if foliar symptoms never appear",
        arabic: "يمكن أن يحدث حتى إذا لم تظهر الأعراض على الأوراق"
      },
      {
        english: "Yellow powdery pustules appear on leaves, forming stripes",
        arabic: "ظهور بثور بودرية صفراء على الأوراق، تشكل خطوط"
      },
      {
        english: "Minimum temperature in the range of 7-13 degree C coupled with 85-100% relative humidity during night and maximum temperature in the range of 15-24 degree C during day are congenial for infection, development and spread of disease.",
        arabic: "درجة الحرارة الدنيا في نطاق 7-13 درجة مئوية مع نسبة رطوبة نسبية تتراوح بين 85-100٪ أثناء الليل وأقصى درجة حرارة في نطاق 15-24 درجة مئوية أثناء النهار مناسبة للعدوى والتطور وانتشار المرض."
      },
      {
        english: "The characteristic symptom of yellow rust is of parallel rows of yellowish orange coloured pustules on the leaves of adult plants",
        arabic: "الأعراض المميزة للصدأ الأصفر تتمثل في صفوف متوازية من بثور برتقالية صفراء اللون على أوراق النباتات البالغة"
      },
      {
        english: "Mild symptoms may be present prior to heading, including yellowish leaf streaks and stiff, dark green leaves",
        arabic: "قد تكون الأعراض الخفيفة موجودة قبل التفتيت، بما في ذلك تكتلات صفراء على الأوراق وأوراق خضراء داكنة صلبة"
      },
      {
        english: "Olives",
        arabic: "زيتون"
      },
      {
        english: "The fungus destroys the ears completely, turning them into a black loose powdery mass consisting of spores and leaving behind the rachis only.",
        arabic: "الفطر يدمر الآذان تمامًا، محولًا إياها إلى كتلة بودرية سوداء فضفاضة تتكون من البذور ويترك فقط الرتشيس وراءه."
      },
      {
        english: "Leaf rust attacks foliage only",
        arabic: "صدأ الأوراق يهاجم الأوراق فقط"
      },
      {
        english: "This rust disease occurs wherever wheat, barley and other cereal crops are grown",
        arabic: "هذا المرض الصدأ يحدث في أي مكان يتم فيه زراعة القمح والشعير والمحاصيل الحبوبية الأخرى"
      },
      {
        english: "Identifying symptoms are dusty, reddish-orange to reddish-brown fruiting bodies that appear on the leaf surface.",
        arabic: "الأعراض المميزة هي أجسام ثمرية غبارية باللون البرتقالي الأحمر إلى اللون البني الأحمر تظهر على سطح الورقة."
      },
      {
        english: "An early symptom of bacterial leaf spot is small, water-soaked leaf spots on the older leaves of the plant",
        arabic: "أحد أعراض التصدع البكتيري على الأوراق هو بقع ماء صغيرة على الأوراق القديمة للنبات"
      },
      {
        english: "They can be caused by one or a combination of leaf spotting pathogens. Pyrenophora tritici-repentis causes tan spot on leaves and can also infect wheat kernels causing red or pink smudge and black point",
        arabic: "يمكن أن تسببها أحد أو مزيج من ممرضات تكوين البقع على الأوراق. Pyrenophora tritici-repentis يسبب بقعة بنية على الأوراق ويمكنه أيضًا عدوى حبوب القمح مما يؤدي إلى تكوين بقع حمراء أو وردية ونقطة سوداء"
      },
      {
        english: "Severely infected kernels can result in significant downgrading of seed quality.",
        arabic: "يمكن أن تؤدي حبوب القمح المصابة بشكل شديد إلى تقليل كبير في جودة البذور."
      },
      {
        english: "Olive knot can cause the death of small branches and twigs as well as the progressive debilitation of the tree, although it rarely kills it",
        arabic: "قد يسبب عقدة الزيتون موت الفروع الصغيرة والغصون بالإضافة إلى التضخم التدريجي للشجرة، على الرغم من أنه نادرًا ما يؤدي إلى موتها"
      },
      {
        english: "Crop production is reduced in terms of both fruit quantity and size",
        arabic: "يتم تقليل إنتاج المحصول من حيث كمية الفاكهة وحجمها"
      },
      {
        english: "Olives from infected branches have an unpleasant smell and a bitter, rancid taste",
        arabic: "الزيتون من الفروع المصابة له رائحة غير مرغوب فيها وطعم مر ورائحة عفنة"
      },
      {
        english: "The symptoms of this disease are generally lesions on the leaf blade, petiole, fruit peduncle and fruit.",
        arabic: "عادةً ما تكون أعراض هذا المرض عبارة عن آفات على شفرة الورقة وعجينة الفاكهة وسيقان الفاكهة والثمرة."
      },
      {
        english: "These occur on the upper surface of the leaves in the form of small round blotches with a grey or muddy spot in the centre 6–10 mm in diameter, reminiscent of a peacock’s eye.",
        arabic: "تحدث هذه الظاهرة على السطح العلوي للأوراق على شكل بقع دائرية صغيرة مع بقعة رمادية أو عرضية في المركز بقطر يتراوح من 6-10 ملم، تشبه عين الطاووس."
      },
      {
        english: "Defoliation, twig death and bloom failure may ensue",
        arabic: "قد تتبعها التساقطات، وموت الغصون وفشل الازدهار"
      },
      {
        english: "Infected trees have slowly thinning canopies and appear weak",
        arabic: "الأشجار المصابة تمتلك أغصانًا تصبح أكثر رقة تدريجيًا وتظهر بشكل ضعيفة"
      },
      {
        english: "This symptom often develops first on one side of the tree and then progresses over several years to involve the whole tree",
        arabic: "غالبًا ما تظهر هذه الأعراض أولاً على جانب واحد من الشجرة ثم تتقدم على مر السنين لتشمل الشجرة بأكملها"
      },
      {
        english: "The bark and outer wood of the upper roots and crown show discoloration",
        arabic: "يظهر تغيير لون اللحاء والخشب الخارجي للجذور العليا والتاج"
      },
      {
        english: "Phytophthora-infected trees have reduced growth, thin canopies, and often die.",
        arabic: "الأشجار المصابة بـ Phytophthora لديها نمو مقلوب وأغصان رقيقة، وغالبًا ما تموت."
      },
      {
        english: "If the disease progresses rapidly, trees may die in 1 or 2 years",
        arabic: "إذا تقدم المرض بسرعة، فإن الأشجار قد تموت في عام أو عامين"
      },
      {
        english: "Roots rotted by Phytophthora are dark and trees affected for long periods by Phytophthora root rot may have few root hairs",
        arabic: "تتحلل الجذور التي تمت الاصابة بها بواسطة Phytophthora والأشجار التي تأثرت لفترات طويلة بسبب التسمم الجذري بواسطة Phytophthora قد تمتلك قليل من شعيرات الجذر"
      },
      {
        english: "Symptoms Disease is most commonly observed on aboveground plant parts",
        arabic: "تماما. الأعراض الدائرية الخضراء تظهر على الأوراق، وتشكل خطوطًا"
      },
      {
        english: "Diseased tissues may first appear as water-soaked areas",
        arabic: "قد تظهر الأنسجة المصابة أولاً على أنها مناطق مشبعة بالمياه"
      },
      {
        english: "Turn a bleached white or brownish color with fluffy, cottony-white mycelium generally present",
        arabic: "تتحول إلى لون أبيض مبيض أو بني مع وجود ميسيليوم أبيض كتاني عادة"
      },
      {
        english: "The young radical and the plumule are killed and there is complete rotting of the seedlings",
        arabic: "الجذر الصغير والبصلة يتم قتلهما وهناك تعفن كامل للشتلات"
      },
      {
        english: "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level",
        arabic: "يتميز المرحلة ما بعد الظهور بالعدوى للأنسجة الصغيرة والشباب للعنق على مستوى الأرض"
      },
      {
        english: "The seedlings topple over or  collapse",
        arabic: "الشتلات تسقط أو تنهار"
      },
      {
        english: "First appear as chlorotic or yellow (angular) areas near the leaf margins",
        arabic: "تظهر أولاً كمناطق خضراء متلازمة أو صفراء (زاوية) بالقرب من حواف الأوراق"
      },
      {
        english: "Yellow area extends to veins and midrib forming characteristic ‘v’ shaped chlorotic spots which later turn black",
        arabic: "المنطقة الصفراء تمتد إلى الأوردة والعرقوبة مكونة بقعًا خضراء متميزة على شكل 'v' تتحول لاحقًا إلى اللون الأسود"
      },
      {
        english: "Veins and veinlets turn brown and finally black",
        arabic: "الأوردة والأوركولات تتحول إلى اللون البني وأخيراً الأسود"
      },
      {
        english: "Small purplish brown spots on under surface of leaves",
        arabic: "بقع صغيرة بنية زهرية على السطح السفلي للأوراق"
      },
      {
        english: "Small, pale yellow angular spots on upper surface of leaves, with downy growth on the under surface",
        arabic: "بقع صغيرة زاوية بلون أصفر فاتح على السطح العلوي للأوراق، مع نمو ناعم على السطح السفلي"
      },
      {
        english: "The spots coalesce and the leaves shrivel and dries up prematurel",
        arabic: "تندمج البقع وتتقشر ورقة النبات وتجف مبكرًا"
      },
      {
        english: "Stem infections by sclerotia first appear just after flowering and are accompanied by a soft, watery rot of basal stems.",
        arabic: "العدوى على الساق بواسطة براعم الجذور تظهر أولاً بعد الإزهار وتترافق مع تعفن ناعم ومائي للأجذور القاعدية."
      },
      {
        english: "These lesions enlarge into a watery, rotten mass of tissue that is covered by a white moldy growth.",
        arabic: "تتضخم هذه البقع إلى كتلة ناعمة ومتعفنة من الأنسجة تغطيها نمو فطري أبيض."
      },
      {
        english: "Dark, irregularly-shaped sclerotia are often found in and around infected stems. Infection of stems and branches will cause affected plant parts to wilt and later die, taking on a bleached and dried.",
        arabic: "غالبًا ما يتم العثور على براعم داكنة غير منتظمة الشكل داخل وحول الأجذور المصابة. ستتسبب العدوى في السيقان والفروع في تجفيف أجزاء النبات المتأثرة ومن ثم الموت، مع تحولها إلى لون أبيض وجفافها."
      },
      {
        english: "Safflower plants a few weeks after planting or at flowering stage are commonly attacked",
        arabic: "غالبًا ما يتم مهاجمة نباتات الزعفران بعد عدة أسابيع من الزراعة أو في مرحلة الإزهار"
      },
      {
        english: "Circular to irregular brown sunken spots of 3-10 mm diameter are formed on leaves",
        arabic: "تتشكل بقع بنية دائرية إلى غير منتظمة متجمعة بقطر يتراوح بين 3-10 ملم على الأوراق"
      },
      {
        english: "In severe infections bracts are also affected with reddish brown spots.affected flower buds turn brown and die.",
        arabic: "في العدوى الشديدة يتم أيضًا التأثير على الألفاظ بواسطة بقع بنية حمراء. تتحول البراعم المصابة بالزهور إلى اللون البني وتموت."
      },
      {
        english: "A white powder-like powder is deposited on the leaves,twigs and stems of safflower.",
        arabic: "تتم ترسيب مسحوق أبيض شبيه بالمسحوق على أوراق الزعفران والغصون والأجذور."
      },
      {
        english: "Due to its effect, the process of photosynthesis is inhibited",
        arabic: "بسبب تأثيره، يتم تثبيط عملية البناء الضوئي"
      },
      {
        english: "The affected part of the plant turns black and dries up.",
        arabic: "الجزء المصاب من النبات يتحول إلى اللون الأسود ويجف"
      },
      {
        english: "Dark necrotic lesions 2-5 mm in diameter are formed first on hypocotyls and cotyledons.",
        arabic: "تتشكل بقع نخرية داكنة بقطر 2-5 ملم أولاً على سيقان الجذور والأوراق الفلقية."
      },
      {
        english: "In mature plants, small brown to dark brown concentric spots of 1-2 mm appear on leaves.",
        arabic: "في النباتات الناضجة، تظهر بقع بنية صغيرة إلى بنية داكنة متجمعة بقطر 1-2 ملم على الأوراق."
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
