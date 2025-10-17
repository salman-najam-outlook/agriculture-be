'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "Yellow leaves",
        arabic: "أوراق صفراء"
      },
      {
        english: "Circular to irregular-shaped water-soaked spots on leaves.",
        arabic: "بقع مائية مستديرة إلى غير منتظمة على الأوراق."
      },
      {
        english: "Broad yellow hollow may be seen around lesions.",
        arabic: "قد يظهر تجويف أصفر واسع حول البقع."
      },
      {
        english: "Round black spots on leaves",
        arabic: "بقع سوداء دائرية على الأوراق"
      },
      {
        english: "Spots enlarged and concentric rings in a bull's eye pattern seen in the center of the diseased area",
        arabic: "تتوسع البقع وتظهر حلقات مركزية بنمط عين الثور في وسط المنطقة المصابة."
      },
      {
        english: "Infected tubers shows a brown, corky dry rot.",
        arabic: "الدرنات المصابة تظهر عفناً جافاً بنياً ومنتفخاً."
      },
      {
        english: "Plants shows dwarfing",
        arabic: "النباتات تظهر بشكل أقزم"
      },
      {
        english: "If affected tubers cut across, the browning of the xylem vessel is seen, and upon squeezing, the whitish bacterial oozes out.",
        arabic: "إذا تم قطع الدرنات المصابة عبرياً، سيتم رؤية تحول الأوعية الخشبية إلى اللون البني، وعند الضغط، سيتدفق الإفراز البكتيري الأبيض."
      },
      {
        english: "Plant shows wilting",
        arabic: "النبات يظهر متعبًا"
      },
      {
        english: "Arial tubers",
        arabic: "درنات جوية"
      },
      {
        english: "On tubers, black sclerotial bodies are formed.",
        arabic: "على الدرنات، يتم تكوين أجسام سكليروتية سوداء."
      },
      {
        english: "Raised, hard, black patches on the surface of the tuber",
        arabic: "بقع سوداء مرتفعة وصلبة على سطح الدرن"
      },
      {
        english: "Wilting",
        arabic: "الذبول"
      },
      {
        english: "Wilting of leaves",
        arabic: "ذبول الأوراق"
      },
      {
        english: "Stunted growth",
        arabic: "نمو متوقف"
      },
      {
        english: "Whitish growth of fungus",
        arabic: "نمو فطري أبيض"
      },
      {
        english: "Pods turn brown to black",
        arabic: "القرون تتحول من اللون البني إلى اللون الأسود"
      },
      {
        english: "Beans become discolored as a result of infection",
        arabic: "يصبح الفاصوليا غير ملونة نتيجة العدوى"
      },
      {
        english: "Earliest symptom is the appearance of a greyish brown water soaked lesion on the outer bark",
        arabic: "أول عرض هو ظهور بقعة مشبعة بالماء بلون رمادي بني على اللحاء الخارجية"
      },
      {
        english: "Cankers appear either on the main trunk, jorquettes or fan branches",
        arabic: "التقرحات تظهر إما على الجذع الرئيسي أو الفروع أو الأغصان"
      },
      {
        english: "A reddish brown liquid oozes out from these lesions, which later dries up to form rusty deposits",
        arabic: "تتدفق سائلة بنية حمراء من هذه التقرحات، والتي تجف لاحقًا لتشكيل ترسبات صدئة"
      },
      {
        english: "First indication of the disease is a characteristic yellowing of one or two leaves on the second or third flush behind the growing tip",
        arabic: "أول علامة على المرض هي اصفرار مميز لإحدى أو اثنتين من الأوراق على الاندفاعة الثانية أو الثالثة خلف الطرف المتنامي"
      },
      {
        english: "Diseased leaves fall within a few days of turning yellow and the other leaves on the shoot show similar symptoms",
        arabic: "تتساقط الأوراق المصابة في غضون أيام قليلة من اصفرارها وتظهر الأوراق الأخرى على الساق أعراض مماثلة"
      },
      {
        english: "When the infected shoot is split lengthwise there is always a characteristic brown streaking",
        arabic: "عند تقسيم الساق المصاب طوليًا، هناك دائمًا تمييز لوني بني"
      },
      {
        english: "Light-brown honey dew in the head just after flowering",
        arabic: "ندى العسل باللون البني الفاتح في الرأس مباشرة بعد الإزهار"
      },
      {
        english: "The black purple, cattle-horn like, ergots covered with white sphacelia are produced in the infected flowers replacing the seeds",
        arabic: "يتم إنتاج الشوائب السوداء البنفسجية المشابهة لقرون البقر المغطاة بالفطر الأبيض في الزهور المصابة محل البذور"
      },
      {
        english: "Sugary droplets on the infected flower parts.",
        arabic: "قطرات سكرية على أجزاء الزهور المصابة"
      },
      {
        english: "The lesions are drab, rectangular to long oval and about 2-5 x 1-2 mm in size.",
        arabic: "البقع مملة، مستطيلة إلى بيضاوية طويلة وبحجم حوالي 2-5 x 1-2 مم."
      },
      {
        english: "Leaf Lesion",
        arabic: "بقعة الورقة"
      },
      {
        english: "Yellow leaves",
        arabic: "أوراق صفراء"
      },
      {
        english: "Swelling lessions at early spring",
        arabic: "تورم البقع في بداية الربيع"
      },
      {
        english: "Reddish brown to iron rust colour lessions",
        arabic: "البقع باللون البني القرمزي إلى لون الصدأ"
      },
      {
        english: "Blackened stems and shrivelled grain",
        arabic: "تسود السيقان ويتقشر الحبوب"
      },
      {
        english: "The lesions are at first purplish black small spots and then become round and ash white",
        arabic: "البقع في البداية صغيرة بنفسجية سوداء وتصبح لاحقا دائرية ورمادية بيضاء"
      },
      {
        english: "Leaf blight with rolling from leaf tip",
        arabic: "المرض الجرثومي مع التلويح من طرف الورقة"
      },
      {
        english: "Death of immature leaves",
        arabic: "موت الأوراق الناضجة"
      },
      {
        english: "Branch dieback",
        arabic: "تراجع الفروع"
      },
      {
        english: "Thinning of the canopy.",
        arabic: "ترقيق الغطاء النباتي."
      },
      {
        english: "Wilted, yellowed, or browned leaves.",
        arabic: "الأوراق متعبة، صفراء، أو بنية."
      },
      {
        english: "The stems develop water-soaked spots which later may be covered with a cottony white growth.",
        arabic: "السيقان تطور بقعاً مشبعة بالماء يمكن أن تغطى فيما بعد بنمو أبيض قطني."
      },
      {
        english: "As the disease progresses, affected portions of the stem develop a bleached appearance, and eventually the tissues shred.",
        arabic: "مع تقدم المرض، تتطور الأجزاء المصابة من السيقان بمظهر مبيض، وفي نهاية المطاف تمزق الأنسجة."
      },
      {
        english: "Girdling of the stem results in premature ripening and in lodging of plants.",
        arabic: "عقد الساق يؤدي إلى نضوج مبكر وسقوط النباتات."
      },
      {
        english: "Stem become hollow due to internal rotting.",
        arabic: "السيقان تصبح مجوفة بسبب العفن الداخلي."
      },
      {
        english: "Midrib cracking of lower leaves, browning of veins and withering is observed.",
        arabic: "تشقق العرق الأوسط للأوراق السفلية، وتحول الأوراق إلى اللون البني، وذبول يُلاحظ."
      },
      {
        english: "In severe cases, the vesicular bundles of the stem also turn brown and the plant collapses.",
        arabic: "في حالات الشدة، تتحول حزم الهواء في الساق أيضًا إلى اللون البني وينهار النبات."
      },
      {
        english: "Patches of the crop wilt, exhibit stunted growth and have swollen, misshapen roots which decay by rotting.",
        arabic: "تذبل أجزاء من المحصول، وتظهر نموًا متوقفًا وتحتوي على جذور منتفخة وغير منتظمة تتعفن بواسطة العفن."
      },
      {
        english: "Tiny nodules to large club shaped outgrowths develop in root system.",
        arabic: "تتطور عقد صغيرة إلى نموات كبيرة على شكل نادي في نظام الجذر."
      },
      {
        english: "Leaves turn pale green or yellow followed by wilting and under severe conditions the plants die",
        arabic: "تتحول الأوراق إلى اللون الأخضر الباهت أو الأصفر تليها الذبول وفي حالات الشدة يموت النباتات"
      },
      {
        english: "Leaf spots initially are angular, translucent, light green, later developing into grayish-white irregular necrotic (dead) patches.",
        arabic: "البقع على الأوراق في البداية زاوية وشفافة ولونها أخضر فاتح، ثم تتطور لتصبح بقعًا رمادية بيضاء غير منتظمة تنكسر (ميتة)."
      },
      {
        english: "The stems of flower clusters become swollen.",
        arabic: "تصبح سيقان مجموعات الأزهار منتفخة."
      },
      {
        english: "Frequently associated with white rust. May develop late in the season on turnip-type (Polish) canola varieties.",
        arabic: "غالباً مرتبط بالصدأ الأبيض. قد يتطور في وقت متأخر من الموسم على أصناف الكانولا من النوع اللفتي (البولندي)."
      },
      {
        english: "Damping-off may occur if plants are infected at the seedling stage due to infected seed.",
        arabic: "قد يحدث تعفن البذور إذا تمت الإصابة بالنباتات في مرحلة الشتل بسبب البذور المصابة."
      },
      {
        english: "Plants affected after the seedling stage may be stunted. Generalized leaf spots, becoming numerous across the field, have been observed in fall-planted crops after initial windblown spore (ascospore) infections.",
        arabic: "قد تكون النباتات المتأثرة بعد مرحلة الشتل متقزمة. تم مراقبة بقع الأوراق العامة التي تصبح عديدة في الحقل في محاصيل الخريف بعد الإصابات الأولية بالبذور العائمة بالرياح (الأسكوسبور)."
      },
      {
        english: "Brown-to-black rot can be found inside affected stems. Vascular tissues may turn black in color prior to external rot symptoms.",
        arabic: "يمكن العثور على عفن بني إلى أسود داخل السيقان المتأثرة. قد تتحول الأنسجة الوعائية إلى اللون الأسود قبل ظهور أعراض العفن الخارجية."
      },
      {
        english: "The stems develop water-soaked spots which later may be covered with a cottony white growth.",
        arabic: "تطور السيقان بقع مشبعة بالماء والتي يمكن أن تغطى فيما بعد بنمو أبيض قطني."
      },
      {
        english: "Hard black bodies, the sclerotia, are formed inside the stem and occasionally on the stem surface.",
        arabic: "تتكون أجسام سوداء صلبة، السكليروتيا، داخل السيقان وأحيانًا على سطح السيقان."
      },
      {
        english: "Girdling of the stem results in premature ripening and in lodging of plants.",
        arabic: "عقد الساق يؤدي إلى نضوج مبكر وسقوط النباتات."
      },
      {
        english: "First signs are red, yellow or purple colours at the ends or edges of older leaves, then yellowing in the middle of the leaf.",
        arabic: "أول علامات هي الألوان الحمراء أو الصفراء أو البنفسجية في أطراف أو حواف الأوراق القديمة، ثم الإصفرار في منتصف الورقة."
      },
      {
        english: "Late infected plants show leaf symptoms but are not stunted and have lower yield loss.",
        arabic: "النباتات المصابة في وقت متأخر تظهر أعراضًا على الأوراق ولكنها ليست متقزمة وتفقد جزءًا أقل من العائد."
      },
      {
        english: "Colours are more intense between leaf veins and on the upper side of the leaf.",
        arabic: "الألوان تكون أكثر كثافة بين الأوراق وعلى الجانب العلوي من الورقة."
      },
      {
        english: "Verticillium wilt in canola most often appear near the end of the season as the plants begin to ripen.",
        arabic: "الذبول الأفقي في الكانولا يظهر في معظم الأحيان قرب نهاية الموسم عندما تبدأ النباتات في النضوج."
      },
      {
        english: "While the stem is still green, a vertical yellow or brown band extending up one side of the stem may be visible.",
        arabic: "بينما السيقان ما زالت خضراء، يمكن أن تكون مرئية شريطًا أصفرًا أو بنيًا عموديًا يمتد على جانب واحد من الساق."
      },
      {
        english: "Infected plants are often stunted and pale, and produce fewer flowers, branches and pods.",
        arabic: "النباتات المصابة غالباً ما تكون متقزمة وباهتة، وتنتج أقل عددًا من الزهور والفروع والقرون."
      },
      {
        english: "Yellow to brown spots on the upper leaf surface  which have white dust-like spores on the corresponding under leaf surface.",
        arabic: "بقع صفراء إلى بنية على السطح العلوي للورقة تحتوي على بذور شبيهة بالغبار بيضاء على السطح السفلي المقابل."
      },
      {
        english: "Swellings on roots and stems",
        arabic: "تورمات على الجذور والسيقان"
      },
      {
        english: "Flowers get malformed and become sterile.",
        arabic: "تصبح الزهور مشوهة وعديمة الخصوبة."
      },
      {
        english: "First symptoms may appear as small, light green spots, which later turn white and finally result in blister-like, raised, white pustules, usually on the lower leaf surface.",
        arabic: "قد تظهر أعراضًا أولية كبقع خضراء فاتحة صغيرة، تتحول فيما بعد إلى اللون الأبيض وتؤدي أخيرًا إلى بثرات بيضاء على شكل فقاعة مرتفعة، عادةً على السطح السفلي للورقة."
      },
      {
        english: "Seed pedicels may terminate and form staghorns without seeds developing. Seed yield and quality are severely reduced.",
        arabic: "قد تنتهي سيقان البذور وتتكون قرون دون تطور البذور. إنتاج البذور وجودة البذور يقل بشكل كبير."
      },
      {
        english: "Pustules can develop on the upper or lower leaf surfaces or on stems and consist of masses of sporangia.",
        arabic: "يمكن أن تتطور بثرات على السطح العلوي أو السفلي للورقة أو على السيقان وتتألف من تجمعات من البذور."
      },
      {
        english: "The fungus attacks all aerial part parts and at any stage of plant growth.",
        arabic: "الفطر يهاجم جميع أجزاء النبات التي تكون في الهواء وفي أي مرحلة من مراحل نمو النبات."
      },
      {
        english: "Symptoms are circular, black, sunken spots with dark center and bright red orange margins on leaves and pods.",
        arabic: "الأعراض عبارة عن بقع دائرية سوداء ممتلئة بمنتصف داكن وحواف حمراء برتقالية مشرقة على الأوراق والقرون."
      },
      {
        english: "Irregular spots, and dead areas on leaves that often follow the veins of the leaves",
        arabic: "بقع غير منتظمة، ومناطق ميتة على الأوراق تتبع غالباً الأوردة في الأوراق"
      },
      {
        english: "Spots produced are small, numerous in number with pale brown centre and reddish brown margin.",
        arabic: "البقع المتكونة صغيرة وعددها كبير مع وسط بني فاتح وحواف بنية حمراء."
      },
      {
        english: "Small necrotic flecks that enlarge to form circular, tan or grey spots.",
        arabic: "بقع نخرية صغيرة تتكبد لتشكيل بقع دائرية بنية أو رمادية."
      },
      {
        english: "The center of the lesions dry out and has a white appearance",
        arabic: "منتصف البقع يجف ويكون ذو مظهر أبيض"
      },
      {
        english: "The affected leaves turn yellow in colour and brown irregular lesions appear on leaves.",
        arabic: "تتحول الأوراق المتأثرة إلى اللون الأصفر وتظهر بقع بنية غير منتظمة عليها."
      },
      {
        english: "The affected plants dry up gradually. When the tap root of the affected plant is split open, reddening of internal tissues is visible.",
        arabic: "تجف النباتات المتأثرة تدريجياً. عند فتح الجذر الرئيسي للنبات المتأثر، يمكن رؤية احمرار الأنسجة الداخلية."
      },
      {
        english: "In the initial stages, the fungus causes seed rot, seedling blight and root rot symptoms.",
        arabic: "في المراحل الأولية، يسبب الفطر تعفن البذور، ومرض الشتلة، وأعراض عفن الجذور."
      },
      {
        english: "The earliest symptoms appear on youngest leaves as chlorosis around some lateral veins and its branches near the margin.",
        arabic: "تظهر أولى الأعراض على أصغر الأوراق كتخلل أخضر حول بعض الأوردة الجانبية وفروعها بالقرب من الحافة."
      },
      {
        english: "The leaves show curling of margin downwards.",
        arabic: "الأوراق تظهر تجعد حافة أسفل."
      },
      {
        english: "The veins show reddish brown discolouration on the under surface which also extends to the petiole.",
        arabic: "الأوردة تظهر تلونًا أحمر بني على السطح السفلي والذي يمتد أيضًا إلى العنق."
      },
      {
        english: "White powdery patches appear on leaves and other green parts which later become dull coloured.",
        arabic: "تظهر بقع بيضاء مسحوقية على الأوراق وأجزاء أخرى خضراء تصبح فيما بعد بلون باهت."
      },
      {
        english: "In severe infections, foliage becomes yellow causing premature defoliation.",
        arabic: "في الإصابات الشديدة، تصبح الأوراق صفراء مما يسبب التساقط المبكر للأوراق."
      },
      {
        english: "When the infection is severe, both the surfaces of the leaves are completely covered by whitish powdery growth.",
        arabic: "عندما تكون الإصابة شديدة، يتم تغطية كلتا السطحين للأوراق بالنمو البيضاوي البودري."
      },
      {
        english: "Spots produced are small, numerous in number with pale brown centre and reddish brown margin.",
        arabic: "البقع المتكونة صغيرة وعددها كبير مع وسط بني فاتح وحواف بنية حمراء."
      },
      {
        english: "Similar spots also occur on branches and pods.",
        arabic: "تظهر بقع مماثلة أيضًا على الفروع والقرون."
      },
      {
        english: "Under favourable environmental conditions, severe leaf spotting and defoliation occurs at the time of flowering and pod formation.",
        arabic: "تحدث بقع الأوراق الشديدة والتساقط في ظروف بيئية مواتية في وقت الزهور وتكوين القرون."
      },
      {
        english: "ther",
        arabic: "البقع المتكونة صغيرة وعددها كبير مع وسط بني فاتح وحواف بنية حمراء."
      },
      {
        english: "These enlarge gradually and turn as raised brown streaks spreading upwards.",
        arabic: "تتوسع هذه تدريجياً وتتحول إلى خطوط بنية مرتفعة تنتشر نحو الأعلى."
      },
      {
        english: "Plants are stunted and leaves dark green, mottled and reduced in size.",
        arabic: "النباتات تكون متقزمة والأوراق خضراء داكنة، منقطة وأصغر حجمًا."
      },
      {
        english: "Normal leaves on the affected plants drop suddenly and dry.",
        arabic: "تسقط الأوراق الطبيعية على النباتات المتأثرة فجأة وتجف."
      },
      {
        english: "Initially mild scattered yellow spots appear on young leaves.",
        arabic: "في البداية، تظهر بقع صفراء مبعثرة خفيفة على الأوراق الشابة."
      },
      {
        english: "The next trifoliate leaves emerging from the growing apex show irregular yellow and green patches alternating with each other.",
        arabic: "الأوراق الثلاثية الفصوص التالية الناشئة من القمة المتنامية تظهر بقع صفراء وخضراء غير منتظمة تتناوب مع بعضها البعض."
      },
      {
        english: "Spots gradually increase in size and ultimately some leaves turn completely yellow.",
        arabic: "البقع تزيد تدريجياً في الحجم وفي نهاية المطاف تتحول بعض الأوراق بالكامل إلى اللون الأصفر."
      },
      {
        english: "All floral parts are transformed into green leafy structures followed by abundant vein clearing in different flower parts.",
        arabic: "تتحول جميع أجزاء الزهور إلى هياكل خضراء ورقية تليها تنظيف وريدي وفير في أجزاء مختلفة من الزهور."
      },
      {
        english: "In severe infection, the entire inflorescences is replaced by short twisted leaves closely arranged on a stem with short internodes, abundant abnormal branches bend down",
        arabic: "في الإصابة الشديدة، يتم استبدال جميع أزهار الإزهار بأوراق ملتوية قصيرة مرتبة بشكل وثيق على ساق بأقسام قصيرة، وفروع غير طبيعية وفيرة تنحني إلى الأسفل"
      },
      {
        english: "Finally, plants look like witches broom.",
        arabic: "أخيرًا، تبدو النباتات مثل مكناسة الساحرات."
      },
      {
        english: "Plants of all stage are affected.",
        arabic: "النباتات في جميع المراحل تتأثر."
      },
      {
        english: "Water soaked, small and irregular spots are formed on the leaves which later increases and turn brown, under favourable conditions.",
        arabic: "تتكون بقع مشبعة بالماء صغيرة وغير منتظمة على الأوراق والتي تتزايد لاحقًا وتتحول إلى اللون البني، في ظروف ملائمة."
      },
      {
        english: "Leaves become dry and brittle, severely infected leaves defoliate",
        arabic: "تصبح الأوراق جافة وهشة، وتسقط الأوراق المصابة بشدة."
      },
      {
        english: "Disease appears as small, angular brown leaf spots of 3 mm diameter with gray center and dark margin delimited by veins.",
        arabic: "يظهر المرض على شكل بقع صغيرة زاوية بنية بقطر 3 ملم مع مركز رمادي وحافة داكنة محددة بالأوردة."
      },
      {
        english: "In severity of the disease defoliation occurs.",
        arabic: "في حالة شدة المرض، يحدث تساقط للأوراق."
      },
      {
        english: "Under favourable conditions, the disease spreads to leaf petiole, stem and capsules producing linear dark coloured deep seated lesions.",
        arabic: "تحت الظروف الملائمة، ينتشر المرض إلى ساق الورقة والساق والكبسولات، مما يؤدي إلى تكوين بقع داكنة طويلة الشكل وعميقة."
      },
      {
        english: "The fungus attacks young seedling, their stem become water soaked soft and incapable of supporting the seedling which falls over and dies.",
        arabic: "الفطر يهاجم الشتلة الصغيرة، حيث تصبح ساقها مشربة بالماء وناعمة وغير قادرة على دعم الشتلة التي تسقط وتموت."
      },
      {
        english: "On older seedlings elongated brownish black lesions appear which increase in length and width girdling",
        arabic: "على الشتلات الكبيرة في العمر، تظهر بقع سوداء بنية ممتدة تزيد في الطول والعرض وتحيط بالساق."
      },
      {
        english: "The stem and plant dies.",
        arabic: "الساق والنبات يموتان."
      },
      {
        english: "The leaves turn yellow and then dry up slowly.",
        arabic: "تصبح الأوراق صفراء ثم تجف ببطء."
      },
      {
        english: "Begin drying of leaf tip downwards.",
        arabic: "تبدأ جفاف نصف الورقة من الأعلى إلى الأسفل."
      },
      {
        english: "The entire plant shows complete drying of the foliage",
        arabic: "النبات بأكمله يظهر جفافاً كاملاً للأوراق."
      },
      {
        english: "Leaves turn to pale green.",
        arabic: "تصبح الأوراق خضراء فاتحة."
      },
      {
        english: "On leaves, cottony white mycelial growth develops and appears white.",
        arabic: "على الأوراق، يتطور نمو فطري أبيض قطني ويظهر بلون أبيض."
      },
      {
        english: "White downy growth appears on the surface of the leaves.",
        arabic: "يظهر نمو قطني أبيض على سطح الأوراق."
      },
      {
        english: "Botrytis is the major disease of onions in cool climate areas.",
        arabic: "البوتريتس هو المرض الرئيسي للبصل في المناطق ذات المناخ البارد."
      },
      {
        english: "Light infections do not affect yields but heavy infections causing major yield reductions can occur.",
        arabic: "الإصابات الخفيفة لا تؤثر على العائدات ولكن الإصابات الشديدة التي تؤدي إلى تقليل كبير في العائدات يمكن أن تحدث."
      },
      {
        english: "Hundreds of white specks are seen on the foliage.",
        arabic: "يمكن رؤية مئات من البقع البيضاء على الأوراق."
      },
      {
        english: "Seedlings topple after emerging from soil.",
        arabic: "تسقط الشتلات بعد خروجها من التربة."
      },
      {
        english: "It occurs at ground or below ground level.",
        arabic: "يحدث على سطح الأرض أو تحت مستوى الأرض."
      },
      {
        english: "Infected tissues appear soft and water soaked.",
        arabic: "تظهر الأنسجة المصابة ناعمة ومشربة بالماء."
      },
      {
        english: "Black smut sori are seen at the base of the leaves and leaf surface.",
        arabic: "تظهر بقع البقع السوداء عند قاعدة الأوراق وعلى سطح الأوراق."
      },
      {
        english: "Black powdery mass is seen after rupturing of sorus wall.",
        arabic: "تظهر كتلة مسحوقية سوداء بعد انفجار جدار البقعة."
      },
      {
        english: "The infection progresses inward from leaf to leaf",
        arabic: "تتقدم العدوى نحو الداخل من ورقة إلى أخرى."
      },
      {
        english: "The initial symptoms are yellowing and dieback of leaf tips.",
        arabic: "الأعراض الأولية هي تصفير أطراف الأوراق وموتها."
      },
      {
        english: "Later, scales, stem plates and roots get destroyed.",
        arabic: "فيما بعد، تتم تدمير الأوزان وألواح الساق والجذور."
      },
      {
        english: "The bulbs become soft and water soaked.",
        arabic: "تصبح البصلات ناعمة ومشربة بالماء."
      },
      {
        english: "Begins as small, elliptical lesions.",
        arabic: "تبدأ كبقع بنية صغيرة وبيضاوية."
      },
      {
        english: "Lesions turn purplish-brown progressively surrounded by chlorotic margins.",
        arabic: "تتحول البقع تدريجياً إلى اللون البني الأرجواني محاطة بحواف خضراء فاتحة."
      },
      {
        english: "Lesions begin at tip of older leaves and accumulate on the leaves making it fall off",
        arabic: "تبدأ البقع عند طرف الأوراق القديمة وتتراكم على الأوراق مما يؤدي إلى سقوطها."
      },
      {
        english: "Yellow to orange colored small flecks develop in the middle of the leaf.",
        arabic: "تتطور بقع صغيرة باللون الأصفر إلى البرتقالي في منتصف الورقة."
      },
      {
        english: "Flecks spread to form elongated, spindle shaped to ovate, diffused spots.",
        arabic: "تنتشر البقع لتشكيل بقع طويلة مستدقة إلى بيضاوية متشعبة."
      },
      {
        english: "Flecks are surrounded by a characteristic pink margin.",
        arabic: "تحيط البقع بحافة زرقاء خاصة بها."
      },
      {
        english: "Abnormal elongation of the neck.",
        arabic: "تمدد غير طبيعي للعنق."
      },
      {
        english: "Abnormal elongation of the neck.",
        arabic: "تمدد غير طبيعي للعنق."
      },
      {
        english: "Water-soaked lesions that are pale yellow in color appear initially on leaf blades.",
        arabic: "تظهر بقع مشربة بالماء ذات لون أصفر فاتح بدايةً على أوراق النبات."
      },
      {
        english: "Infected leaves develop yellow streaks that spread progressively leading to yellow leaves.",
        arabic: "تطور الأوراق المصابة خطوط صفراء تنتشر تدريجياً مما يؤدي إلى تحول الأوراق إلى اللون الأصفر."
      },
      {
        english: "Leaves curl and plants wilt.",
        arabic: "تتجعد الأوراق ويذبل النبات."
      },
      {
        english: "Bulbs do not grow to full size although they are firm and solid.",
        arabic: "البصل لا ينمو إلى الحجم الكامل على الرغم من أنه قوي وصلب."
      },
      {
        english: "Leaves show lesions that maybe diamond or spindle-shaped.",
        arabic: "تظهر الأوراق بقعًا قد تكون بشكل الماس أو بشكل مغزول."
      },
      {
        english: "They are straw-colored and sometimes have distinct green center with yellow borders.",
        arabic: "لونها قشي وأحيانًا لها مركز أخضر مميز مع حواف صفراء."
      },
      {
        english: "Flower stalks are infected in later stages.",
        arabic: "تصاب سيقان الزهور في مراحل لاحقة."
      },
      {
        english: "Reduced bulb size",
        arabic: "تقليل حجم البصل."
      },
      {
        english: "Roots turn pink or maroon when infected.",
        arabic: "تتحول الجذور إلى اللون الوردي أو الأرجواني عند الإصابة."
      },
      {
        english: "In severe cases the roots may die and the plants become weakened",
        arabic: "في حالات شديدة، قد تموت الجذور ويصبح النبات مضعفًا."
      },
      {
        english: "Infection usually is through neck tissues as foliage dies down at maturity.",
        arabic: "العدوى عادةً من خلال أنسجة العنق مع تراجع الأوراق عند النضوج."
      },
      {
        english: "Infected bulbs are discoloured black around the neck, and affected scales shrivel.",
        arabic: "البصل المصاب يتغير لونه إلى اللون الأسود حول العنق، والأوزان المتضررة تتقشر."
      },
      {
        english: "Masses of powdery black spores develop as streaks along veins on and between outer dry scale",
        arabic: "تتطور كتل من البواغير السوداء المسحوقة كشرائط على طول الأوردة على وبين الأوزان الجافة الخارجية."
      },
      {
        english: "Infection usually is through neck tissues as foliage dies down at maturity.",
        arabic: "العدوى عادةً من خلال أنسجة العنق مع تراجع الأوراق عند النضوج."
      },
      {
        english: "Infected bulbs are discoloured green around the neck, and affected scales shrivel.",
        arabic: "البصل المصاب يتغير لونه إلى اللون الأخضر حول العنق، والأوزان المتضررة تتقشر."
      },
      {
        english: "Masses of powdery green spores generally are arranged as streaks along veins on",
        arabic: "عادةً ما تكون كتل من البواغير الخضراء المسحوقة مرتبة كشرائط على طول الأوردة على"
      },
      {
        english: "Bacterial soft rot is mainly a problem on mature bulbs.",
        arabic: "التعفن اللين البكتيري هو في الأساس مشكلة تواجه البصل الناضج."
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
