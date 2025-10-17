'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [
      {
        english: "The sori, which vary in length from 3 to 18 mm, is the solid long black (often curved) pointed columella which extends almost the full length of the sorus and which remains conspicuous after the smut spores have been blown away",
        arabic: "السوري، والتي تتراوح طولها بين 3 و 18 ملم، هو السطح الصلب الأسود الطويل (غالباً ما يكون مقوسًا) القلم الذي يمتد تقريبًا على طول السوري والذي يبقى واضحًا بعد أن تم تفجير بوغات الفطر."
      },
      {
        english: "The first symptoms are small flecks on the lower leaves (purple, tan or red depending upon the cultivar).",
        arabic: "أول أعراض البقع الصغيرة على الأوراق السفلية (بنفسجية أو بيج أو حمراء اعتمادًا على الصنف)."
      },
      {
        english: "Pustules (uredosori) appear on both surfaces of leaf as purplish spots which rupture to release reddish powdery masses of uredospores.",
        arabic: "تظهر القروح (الأوريدوسوري) على كلا السطحين للورقة على شكل بقع بنفسجية تنفجر لتطلق كتلًا بودرية حمراء من البوغات الأوريدوسبور."
      },
      {
        english: "The pustules may also occur on the leaf sheaths and on the stalks of inflorescence",
        arabic: "القروح قد تحدث أيضًا على غمد الورقة وعلى سيقان الزهرة."
      },
      {
        english: "The young radical and the plumule are killed and there is complete rotting of the seedlings.",
        arabic: "يتم قتل الجذع الصغير والبرعم ويكون هناك تعفن كامل للشتلات."
      },
      {
        english: "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level.",
        arabic: "تتميز مرحلة ما بعد الظهور بالعدوى للأنسجة الصغيرة والصغيرة للياقة على مستوى الأرض."
      },
      {
        english: "The infected tissues become soft and water soaked. The seedlings topple over or collapse.",
        arabic: "تصبح الأنسجة المصابة ناعمة ومشربة بالماء. ينقلب الشتلات أو ينهار."
      },
      {
        english: "The disease is characterized by scattered, rapidly enlarging, irregular, brown, water-soaked lesions with characteristic gray-green borders.",
        arabic: "يتميز المرض بوجود بقع متناثرة، تتسع بسرعة، غير منتظمة، بنية اللون، مشربة بالماء مع حدود رمادية خضراء مميزة."
      },
      {
        english: "During mid nursery period causing leaf blight and blackening of roots and stems leading to death of seedlings. Water soaked brown to black lesions appear on the leaf.",
        arabic: "خلال منتصف فترة المشتل، مما يسبب تدهور الأوراق واصفرار الجذور والسيقان مما يؤدي إلى موت الشتلات. تظهر بقع بنية إلى سوداء مشربة بالماء على الورقة."
      },
      {
        english: "These patches enlarge and coalesce leading to wet rot of leaf tissue and midribs.",
        arabic: "تتوسع هذه البقع وتندمج مما يؤدي إلى تعفن الأنسجة والأوعية الوسطية الرطبة."
      },
      {
        english: "Just like damping off, sudden death of seedlings in patches is noticed in seed beds.",
        arabic: "تمامًا مثل الانخفاض المفاجئ، يتم ملاحظة موت فجائي للشتلات في البقع في أسرة البذور."
      },
      {
        english: "Blackening of the collar region, wilting and rotting of leaves are the symptoms.",
        arabic: "تسود المنطقة القريبة من الياقة، وتذبول وتعفن الأوراق هي الأعراض."
      },
      {
        english: "Yellowing (chlorosis) of older leaves, wilting of plants, or flagging of leaf tips",
        arabic: "تصفير (فقدان الكلوروفيل) للأوراق القديمة، وذبول النباتات، أو انحناء أطراف الأوراق"
      },
      {
        english: "Symptom appears as small water soaked spots with sunken center on leaves.",
        arabic: "تظهر الأعراض على شكل بقع مشربة بالماء صغيرة مع وسط منخفض على الأوراق."
      },
      {
        english: "Spots become white with brown margin.",
        arabic: "تصبح البقع بيضاء مع حافة بنية."
      },
      {
        english: "Lesions occur also on midribs, petioles and lateral veins causing distortion and ragged.",
        arabic: "البقع تحدث أيضًا على الأوعية الوسطية، وعرقوب الأوراق، والأوعية الجانبية مما يسبب التشوه والتمزق."
      },
      {
        english: "Several small, round brown lesions with 2-10 mm diameter on lower and mature leaves occur.",
        arabic: "تظهر عدة بقع بنية صغيرة ودائرية بقطر يتراوح بين 2 و 10 ملم على الأوراق السفلية والناضجة."
      },
      {
        english: "Typical lesion with white parchment center surrounded by brown or tan colored margin resembling eye of frog.",
        arabic: "بقعة نموذجية بمركز من ورق أبيض محاط بحافة بنية أو بلون تاني تشبه عين الضفدع."
      },
      {
        english: "Different spots coalesce causing drying of leaves which wither prematurely.",
        arabic: "تتجمع البقع المختلفة مما يؤدي إلى جفاف الأوراق التي تذبل مبكرًا."
      },
      {
        english: "Infected leaves show mottling veins show shortened internodes with small, distorted leaves.",
        arabic: "تظهر الأوراق المصابة تمويج الأوعية وتقصير الأنسجة الوسيطة مع أوراق صغيرة مشوهة."
      },
      {
        english: "In later growth of plant stunted and limited to basal suckers, and the vine eventually dies.",
        arabic: "في النمو اللاحق للنبات يصبح مقصرًا ومقتصرًا على القصب الأساسي، والكرم يموت في النهاية."
      },
      {
        english: "Dead and dying vines are usually present in a roughly circular pattern in the vineyard.",
        arabic: "عادةً ما تكون الكروم الميتة والمحتضرة موجودة في نمط دائري تقريبي في الكروم."
      },
      {
        english: "Disease plants show leaves with mottling or mosaic pattern of light green and dark-green areas.",
        arabic: "النباتات المصابة بالمرض تظهر أوراقًا بها نمط تمويج أو فسيفساء من المناطق الخضراء الفاتحة والخضراء الداكنة."
      },
      {
        english: "Vein clearing, greenish yellow mottling occur as primary symptoms on newly formed young leaves.",
        arabic: "ظهور تطهير الأوعية وتمويج أصفر زرعي كأعراض أولية على الأوراق الشابة التي تم تكوينها حديثًا."
      },
      {
        english: "Infection on young plants results in stunted growth, malformation, distortion and puckering of leaves. Dark-green blisters and sometime enations (leafy growth) appear on the dorsal side of the leaf.",
        arabic: "العدوى على النباتات الشابة تؤدي إلى نمو مقصور، وتشوه، وانحراف وتجعد الأوراق. بثور خضراء داكنة وأحيانًا تظهر تكوينات (نمو الأوراق) على الجانب الظهري للورقة."
      },
      {
        english: "The disease is characterized by scattered, rapidly enlarging, irregular, brown, water-soaked lesions with characteristic gray-green borders.",
        arabic: "المرض مميز بوجود بقع منتشرة وسريعة الانتشار وغير منتظمة وبنية اللون مشربة بالماء بحدود رمادية خضراء مميزة."
      },
      {
        english: "Symptom development occurs particularly during and immediately following periods of heavy rains and high relative humidity.",
        arabic: "تطور الأعراض يحدث خصوصًا أثناء فترات الأمطار الغزيرة وفورًا بعدها وأثناء الرطوبة النسبية العالية."
      },
      {
        english: "Wilting during the heat of the day.",
        arabic: "الذبول أثناء حرارة النهار."
      },
      {
        english: "Initially it appears on lower and older leaves as small brown, concentric circular lesions, which spread to upper leaves, petioles, stalks, and capsules even.",
        arabic: "في البداية يظهر على الأوراق السفلية والقديمة كبقع بنية صغيرة دائرية متمركزة، والتي تنتشر إلى الأوراق العليا وعقيقات الأوراق والسيقان، وحتى الكبسولات."
      },
      {
        english: "In warm weather under high humidity, the leaf spots enlarge, 1-3 cm in diameter, centers are necroses and turn brown with characteristic marking giving a target board appearance with a definite outline.",
        arabic: "في الطقس الدافئ تحت الرطوبة العالية، تتوسع بقع الأوراق بقطر 1-3 سم، وتتحول المراكز إلى نسيم وتصبح بنية مع علامة مميزة تعطي مظهر لوحة هدف بتحديد واضح."
      },
      {
        english: "In severe infection spots enlarge, coalesce, and damage large areas making leaves dark-brown, ragged, and worthless.",
        arabic: "في حالة العدوى الشديدة، تتوسع البقع وتندمج وتلحق أضرارًا كبيرة مما يجعل الأوراق بنية داكنة وممزقة ولا تصلح للاستخدام."
      },
      {
        english: "It is a complete root parasite affecting the yield and quality of tobacco.",
        arabic: "إنه طفيلي كامل للجذور يؤثر على العائد وجودة التبغ."
      },
      {
        english: "The shoots emerge in clusters, and their basal portion is attached to tobacco roots through which it draws nourishment and depletes the host, resulting in a yield loss of 24 to 52%. Affected plants become stunted, leaves turn pale, and wilt.",
        arabic: "تنمو الأفرع على شكل مجموعات، وجزءها القاعدي متصل بجذور التبغ من خلاله يستمد التغذية ويستنزف الجذم، مما يؤدي إلى فقدان العائد من 24 إلى 52 ٪. النباتات المصابة تصبح مقصورة، والأوراق تصبح شاحبة وذابلة."
      },
      {
        english: "Initially leaf tips droop, and as the attack intensifies, all the leaves wilt.",
        arabic: "في البداية، تتدلى أطراف الأوراق، ومع تصاعد الهجوم، تذبل جميع الأوراق."
      },
      {
        english: "Disease is characterized by downward curling & rolling of leaves; thickening; dark green in color with vein clearing effect; brittle; enation (cup like or frill like outgrowth), reduction in size.",
        arabic: "المرض مميز بانتفاخ ولف الأوراق نحو الأسفل؛ التضخم؛ لون أخضر داكن مع تأثير تنظيف الوريد؛ قابل للكسر؛ تكوينات (شكل أكواب أو نمو جانبي مثل السروج)؛ انقسام الحجم."
      },
      {
        english: "Infected plants become stunted due to shortening of internodes and the formation of more lateral branches.",
        arabic: "النباتات المصابة تصبح مقصورة بسبب اختصار الأنقاض وتكوين مزيد من الفروع الجانبية."
      },
      {
        english: "Flowers are deformed; partly or completely sterile.",
        arabic: "الزهور تتشوه؛ جزئيًا أو كليًا عقيمة."
      },
      {
        english: "Affected plants show leaves with mottling or mosaic pattern of light green and dark-green areas.",
        arabic: "النباتات المتضررة تظهر أوراقًا بها نمط تمويج أو فسيفساء من المناطق الخضراء الفاتحة والخضراء الداكنة."
      },
      {
        english: "Primary symptoms appear on newly formed young leaves as vein clearing, greenish yellow mottling.",
        arabic: "الأعراض الأولية تظهر على الأوراق الشابة التي تم تكوينها حديثًا كتطهير الأوعية وتمويج أصفر زرعي."
      },
      {
        english: "Darkgreen blisters and sometime enations (leafy growth) appear on the dorsal side of the leaf.",
        arabic: "البثور الخضراء الداكنة وأحيانًا التكوينات (نمو الأوراق) تظهر على الجانب الظهري للورقة."
      },
      {
        english: "Initially, greyish-white spots (about 0.5-cm in diameter) appear at the base of the lower leaves of the maturing plant.",
        arabic: "في البداية، تظهر بقع رمادية فاتحة (بقطر حوالي 0.5 سم) عند قاعدة الأوراق السفلية للنبات الناضج."
      },
      {
        english: "Sometimes leaves with incipient infection result in blemishes on curing, which reduce the commercial value of leaves.",
        arabic: "في بعض الأحيان، تؤدي الأوراق التي تحمل عدوى مبدئية إلى تكوين عيوب أثناء التجفيف، مما يقلل من القيمة التجارية للأوراق."
      },
      {
        english: "Such leaves, on curing, get scorched and show brown patches rendering them unfit for marketing.",
        arabic: "هذه الأوراق، عند التجفيف، تصبح محروقة وتظهر بها بقع بنية، مما يجعلها غير مناسبة للتسويق."
      },
      {
        english: "The leaves of the affected plants become yellow.",
        arabic: "أوراق النباتات المتضررة تصبح صفراء."
      },
      {
        english: "Water-soaked appearance is found at the base of the pseudostem, and rotting takes place at the basal portion.",
        arabic: "تظهر مظهر مشرب بالماء عند قاعدة الساق الزائفة، ويحدث التعفن في الجزء القاعدي."
      },
      {
        english: "The affected rhizomes become soft and pulpy, and plants easily collapse on pressing.",
        arabic: "تصبح الجذور الضائعة المتضررة ناعمة وعصيرية، وتنهار النباتات بسهولة عند الضغط عليها."
      },
      {
        english: "Mild drooping and curling of leaf margins of the lower leaf, and it progressively spreads through lower leaves to upper leaves.",
        arabic: "الانحناء الخفيف ولف حواف الأوراق السفلية، وينتشر تدريجيًا عبر الأوراق السفلية إلى الأوراق العليا."
      },
      {
        english: "At the severe condition, yellowing and wilting symptoms can be seen.",
        arabic: "في حالة الشدة، يمكن رؤية أعراض التصفير والذبول."
      },
      {
        english: "Milky ooze would be secreted from the affected pseudostem and rhizome when they are gently pressed by fingers.",
        arabic: "سيتم إفراز سائل أبيض من الساق الزائفة والجذم المتضررين عند الضغط عليهما بلطف بواسطة الأصابع."
      },
      {
        english: "The symptoms of the disease start as a water-soaked spot and later turns as a white spot surrounded by dark brown margins and a yellow halo.",
        arabic: "أعراض المرض تبدأ كبقعة مشربة بالماء وتتحول في وقت لاحق إلى بقعة بيضاء محاطة بأطراف بنية داكنة وهالة صفراء."
      },
      {
        english: "Yellow halo",
        arabic: "هالة صفراء"
      },
      {
        english: "The lesions enlarge and adjacent lesions coalesce to form necrotic areas.",
        arabic: "تتوسع البؤر وتتلاصق البؤر المجاورة لتشكيل مناطق نخرية."
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
        arabic: "نمو مقصور"
      },
      {
        english: "On the undersurface of disease leaves are found patches of whitish powder growth",
        arabic: "على السطح السفلي لأوراق المرض توجد بقع من النمو الأبيض المسحوق."
      },
      {
        english: "On upper surfaces, leaves at the infection site show blotches of yellow or pale green usually near veins, surrounded by normally colored tissue.",
        arabic: "على الأسطح العلوية، تظهر على الأوراق في موقع العدوى بقع صفراء أو خضراء فاتحة عادة بالقرب من الأوردة، محاطة بأنسجة ملونة بشكل طبيعي."
      },
      {
        english: "Occasionally, the fungus may attack the stem of young seedlings when grown under reduced light conditions.",
        arabic: "في بعض الأحيان، قد يهاجم الفطر ساق الشتلات الصغيرة عندما تنمو في ظروف إضاءة منخفضة."
      },
      {
        english: "It is characterized by the appearance of water-soaked patches on the stem near the ground level.",
        arabic: "يتميز بظهور بقع مشربة بالماء على الساق بالقرب من مستوى الأرض."
      },
      {
        english: "These patches enlarge rapidly and girdle the stem, causing rotting of the tissues, which then turn dark brown or black. If the disease attack is mild, only one side of the stem rots and the plants remain stunted.",
        arabic: "تتوسع هذه البقع بسرعة وتحيط بالساق، مما يسبب تعفن الأنسجة، ثم تتحول إلى اللون البني الداكن أو الأسود. إذا كانت الهجمة المرضية خفيفة، يتعفن جانب واحد فقط من الساق وتبقى النباتات مقصورة."
      },
      {
        english: "Fruit if formed are shriveled and malformed. Gradually the plant dies.",
        arabic: "إذا تم تكوين الثمار، فإنها تتقلص وتصبح مشوهة. تموت النباتات تدريجيا."
      },
      {
        english: "The disease occurs both in the field and in storage conditions.",
        arabic: "المرض يحدث في الحقل وفي ظروف التخزين على حد سواء."
      },
      {
        english: "The spots on fruits first appear as brown superficial discoloration of the skin which develops into circular, slightly sunken areas and 1 to 3 cm in diameter.",
        arabic: "تظهر البقع على الثمار أولاً على شكل تلوين بني سطحي للجلد يتطور إلى مناطق دائرية ذات انخفاض طفيف وبقطر من 1 إلى 3 سم."
      },
      {
        english: "Gradually the lesions coalesce and sparse mycelia growth appears on the margins of the spots.",
        arabic: "تتداخل البؤر تدريجياً ويظهر نمو الفطريات الخفيفة على حواف البقع."
      },
      {
        english: "Infected plant initially shows chlorosis on youngest leaves followed by vein clearing, rugosity and prominent mottling of laminae.",
        arabic: "يظهر النبات المصاب أولاً كتطهير على أوراقه الصغيرة تليه تطهير الأوردة وتجعيد الأوراق وتمويج الأوعية بشكل بارز."
      },
      {
        english: "Malformation and reduction of the lamina which may become extremely filiform.",
        arabic: "تشوه وانخفاض الأوعية التي قد تصبح شديدة التمويج."
      },
      {
        english: "Characteristically elongated dark green streaks develop on petiole and upper half of the stems, infected fruits show circular concentric rings causing up to 56-60% yield loss.",
        arabic: "تتطور بشكل مميز خطوط خضراء داكنة ممتدة على الساق والنصف العلوي من السيقان، والثمار المصابة تظهر حلقات متماثلة دائرية تسبب فقدانًا يصل إلى 56-60٪ من العائد."
      },
      {
        english: "Roughly circular yellowish discolorations, called oil spots. White down (sporulation of the fungus), particularly on the lower leaf surface.",
        arabic: "تلوينات صفراء دائرية تقريبية، تسمى بقع الزيت. البياض الأبيض (انتشار الفطر)، بشكل خاص على سطح الورقة السفلي."
      },
      {
        english: "The spots turn brown with time and severely infected leaves may drop.",
        arabic: "تتحول البقع إلى اللون البني مع مرور الوقت وقد تسقط الأوراق المصابة بشدة."
      },
      {
        english: "Infected shoot tips curl ('shepherd's crook') and a white down occurs on the stem (sporulation of the fungus)",
        arabic: "أطراف الأفرع المصابة تلتف ('عكاز الراعي') وتظهر بقع بيضاء على الساق (انتشار الفطر)."
      },
      {
        english: "The first powdery mildew lesions are frequently found on the undersides of leaves.",
        arabic: "غالباً ما توجد البؤر الأولية للعفن البودري على الجوانب السفلية للأوراق."
      },
      {
        english: "Very small orange to black spherical structures called cleistothecia develop on the upper and lower surfaces of leaves",
        arabic: "تتطور هياكل كروية صغيرة جدًا باللون البرتقالي إلى الأسود تسمى بالكليستوثيسيا على الأسطح العلوية والسفلية للأوراق."
      },
      {
        english: "The gradual degeneration of the fungus over the course of the season",
        arabic: "تدهور تدريجي للفطر على مدار الموسم."
      },
      {
        english: "The fungus will cause small round spots",
        arabic: "الفطر سيسبب بقع دائرية صغيرة"
      },
      {
        english: "As they age, they give way to small holes (leaving a 'shot-hole' appearance)",
        arabic: "مع تقدمها في العمر، تتحول إلى ثقوب صغيرة (مما يترك مظهرًا 'ثقب الرصاص')."
      },
      {
        english: "Shoots: Deep elongated cankers, greyish in the center with a black edge",
        arabic: "السيقان: قرحات ممتدة عميقة، بلون رمادي في الوسط مع حافة سوداء."
      },
      {
        english: "It can infect the green leaves and cause necrotic brown spots",
        arabic: "يمكن أن يصيب الأوراق الخضراء ويسبب بقعًا بنية نخرية"
      },
      {
        english: "Infected berries become covered with a greyish felt-like substance consisting of spores of the fungus",
        arabic: "الثمار المصابة تصبح مغطاة بمادة شبيهة بالصوف بلون رمادي تحتوي على بواغي الفطر."
      },
      {
        english: "Inflorescences can also be infected (b), causing the inflorescences to dry out or latent infections visible only at veraison.",
        arabic: "يمكن أن تصاب أيضًا بالتزهير (ب)، مما يؤدي إلى جفاف التزهير أو العدوى الكامنة التي يمكن رؤيتها فقط عند النضج."
      },
      {
        english: "Leaves: presence of small brown lesions (2 to 10 mm in diameter) surrounded by a darker margin a ring of small black fruiting bodies (black pustules)",
        arabic: "الأوراق: وجود بقع بنية صغيرة (من 2 إلى 10 ملم في القطر) محاطة بحافة داكنة وحلقة من الأجسام الثمرية السوداء الصغيرة (بثور سوداء)."
      },
      {
        english: "Berries: At first, the berries become whitish then purple to black",
        arabic: "الثمار: في البداية، تصبح الثمار بيضاء ثم بنفسجية إلى سوداء."
      },
      {
        english: "Berries: At the end of the season, berries will be covered by black pustules",
        arabic: "الثمار: في نهاية الموسم، ستكون الثمار مغطاة بثث سوداء."
      },
      {
        english: "Foliage spots first appear as small brown spots that are circular to angular in shape.",
        arabic: "تظهر بقع الأوراق أولاً على شكل بقع بنية صغيرة دائرية إلى زاوية."
      },
      {
        english: "Foliage spots are irregular and turn dark brown or black. Stem lesions can girdle the stem and cause vines to wilt.",
        arabic: "بقع الأوراق غير منتظمة وتتحول إلى اللون البني الداكن أو الأسود. قد تتدلى البقع على الساق وتتسبب في ذبول الكروم."
      },
      {
        english: "The most striking diagnostic symptoms are produced on the fruit, where circular, black, sunken cankers appear.",
        arabic: "أبرز الأعراض التشخيصية تظهر على الثمار، حيث تظهر قرحات دائرية سوداء منخفضة."
      },
      {
        english: "The disease starts as small, yellow spots which enlarge to form concentric rings on the upper leaf surfaces.",
        arabic: "يبدأ المرض كبقع صفراء صغيرة تتوسع لتشكل حلقات متماثلة على السطوح العلوية للأوراق."
      },
      {
        english: "The pathogen also may cause fruit injury.",
        arabic: "الممرض قد يتسبب أيضًا في إصابة الثمار."
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
