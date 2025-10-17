'use strict';
const path = require("path");
const moment = require("moment")

let jsonData = [
  {
    "english": "Holes on leaves/fruits/grain",
    "hindi": "पत्तियों/फलों/अनाज पर छिद्र",
    "marathi": "पानांवरील/फळांवरील/धान्यांवरील उबाण",
    "nepali": "पात/फल/अन्नमा छिद्रहरू",
    "spanish": "Agujeros en hojas/frutas/granos"
  },
  {
    "english": "Rolled and curled leaves",
    "hindi": "मुड़ी हुई और मुड़ी हुई पत्तियाँ",
    "marathi": "मोडलेले आणि मोडवलेले पाने",
    "nepali": "लपेटिएका र लपेटिएका पातहरू",
    "spanish": "Hojas enrolladas y rizadas"
  },
  {
    "english": "Dead shoots",
    "hindi": "मरे हुए शूट्स",
    "marathi": "मृत शूट्स",
    "nepali": "मृत फोहोरहरू",
    "spanish": "Brotaciones muertas"
  },
  {
    "english": "Stunted/poor growth",
    "hindi": "रुकावटपूर्ण/दुर्बल विकास",
    "marathi": "क्षुद्र/दुर्बल वाढ",
    "nepali": "बाधाग्रस्त/कमजोर बढी",
    "spanish": "Crecimiento atrofiado/pobre"
  },
  {
    "english": "Distorted plants/leaves",
    "hindi": "विकृत पौधे/पत्तियाँ",
    "marathi": "विकृत पिके/पाने",
    "nepali": "विकृत पादप/पातहरू",
    "spanish": "Plantas/hojas distorsionadas"
  },
  {
    "english": "Plant wilting",
    "hindi": "पौधे की सुस्ती",
    "marathi": "पिके वावटणे",
    "nepali": "पादप बिरामी",
    "spanish": "Marchitamiento de la planta"
  },
  {
    "english": "Irregular and chewed leaves/stems",
    "hindi": "अनियमित और चबाए हुए पत्तियाँ/तने",
    "marathi": "अनियमित आणि उघडेलेले पाने/शेर",
    "nepali": "अनियमित र चुस्केका पातहरू/बाटा",
    "spanish": "Hojas/tallos irregulares y masticados"
  },
  {
    "english": "Dying of the new leaves",
    "hindi": "नए पत्तियों का मरना",
    "marathi": "नवीन पानांची मरणासाठी",
    "nepali": "नयाँ पातहरूको मृत्यु",
    "spanish": "Muerte de las hojas nuevas"
  },
  {
    "english": "Presence of larvae",
    "hindi": "कीटकों की मौजूदगी",
    "marathi": "लार्वांची उपस्थिती",
    "nepali": "कीटकहरूको उपस्थिति",
    "spanish": "Presencia de larvas"
  },
  {
    "english": "Presence of droppings",
    "hindi": "मल की मौजूदगी",
    "marathi": "बोळ्यांची उपस्थिती",
    "nepali": "विषको उपस्थिति",
    "spanish": "Presencia de excrementos"
  },
  {
    "english": "Weak stems",
    "hindi": "कमजोर डंठल",
    "marathi": "कमजोर शेरे",
    "nepali": "कमजोर तने",
    "spanish": "Tallos débiles"
  },
  {
    "english": "Presence of webs",
    "hindi": "जाल की मौजूदगी",
    "marathi": "वेब्सची उपस्थिती",
    "nepali": "जालको उपस्थिति",
    "spanish": "Presencia de telarañas"
  },
  {
    "english": "Weak roots",
    "hindi": "कमजोर जड़",
    "marathi": "कमजोर मूळे",
    "nepali": "कमजोर जड",
    "spanish": "Raíces débiles"
  },
  {
    "english": "Shoot and capsule borer",
    "hindi": "शूट और कैप्सूल बोरर",
    "marathi": "शूट आणि कॅप्सुल बोरर",
    "nepali": "शूट र क्याप्सुल बोरर",
    "spanish": "Barrenador de brotes y cápsulas"
  },
  {
    "english": "Aphids",
    "hindi": "एफिड्स",
    "marathi": "एफिड्स",
    "nepali": "एफिड्स",
    "spanish": "Pulgones"
  },
  {
    "english": "Shoot fly",
    "hindi": "शूट फ्लाई",
    "marathi": "शूट फ्लाय",
    "nepali": "शूट फ्लाइ",
    "spanish": "Mosca de los brotes"
  },
  {
    "english": "Nematodes",
    "hindi": "नेमाटोड्स",
    "marathi": "नेमाटोड्स",
    "nepali": "नेमाटोड्स",
    "spanish": "Nematodos"
  },
  {
    "english": "Cut worms",
    "hindi": "कटवॉर्म्स",
    "marathi": "कट वर्म्स",
    "nepali": "कट वर्म्स",
    "spanish": "Gusanos cortadores"
  },
  {
    "english": "Thrips",
    "hindi": "थ्रिप्स",
    "marathi": "थ्रिप्स",
    "nepali": "थ्रिप्स",
    "spanish": "Trips"
  },
  {
    "english": "Quinoa moth",
    "hindi": "किनोआ मॉथ",
    "marathi": "किनोआ मॉथ",
    "nepali": "क्विनोआ मोथ",
    "spanish": "Polilla de quinua"
  },
  {
    "english": "Leaf miner files",
    "hindi": "पत्ते खाद्यक्षिप्त करते हैं",
    "marathi": "पाने माईनर फाइल्स",
    "nepali": "पातकर्मी फाइलहरू",
    "spanish": "Minadores de hojas"
  },
  {
    "english": "Cassava Green Mite (Mononychellus tanajoa)",
    "hindi": "कसावा हरी माइट (मोनोनिकेल्लस तनाजोआ)",
    "marathi": "कॅसाव्या हिरव्या माइट (मोनोनिकेल्लस तानाजोवा)",
    "nepali": "कसावा हरिया माइट (मोनोनिकेलस तनाजोआ)",
    "spanish": "Ácaro verde de la yuca (Mononychellus tanajoa)"
  },
  {
    "english": "Cassava mealy bug",
    "hindi": "कसावा मीली बग",
    "marathi": "कॅसाव्या अळी बग",
    "nepali": "कसावा मीली बग",
    "spanish": "Cochinilla de la yuca"
  },
  {
    "english": "Whitefly (Aleurodicus dispersus)",
    "hindi": "सफेद मक्खी (अलेयुरोडिकस डिस्परसस)",
    "marathi": "पांढरी फुटली (अलेयुरोडिकस डिस्परसस)",
    "nepali": "सेतो जिरा (अल्युरोडिकस डिस्परसस)",
    "spanish": "Mosca blanca (Aleurodicus dispersus)"
  },
  {
    "english": "Variegated cricket (Zonocerus variegatus)",
    "hindi": "बहुरंगी टिड्डा (जोनोसरस वेरिजाटस)",
    "marathi": "बहुरंगी टिडका (झोनोसेरस वेरिजाटस)",
    "nepali": "विविध टिट्टा (जोनोसेरस वेरिगेटस)",
    "spanish": "Grillo variegado (Zonocerus variegatus)"
  },
  {
    "english": "Onion Thrips",
    "hindi": "प्याज थ्रिप्स",
    "marathi": "कांदा थ्रिप्स",
    "nepali": "प्याज थ्रिप्स",
    "spanish": "Trips de cebolla"
  },
  {
    "english": "Eriophyid mite",
    "hindi": "इरियोफिड माइट",
    "marathi": "एरियोफिड माइट",
    "nepali": "एरियोफिड माइट",
    "spanish": "Ácaro eriófido"
  },
  {
    "english": "Onion Maggot",
    "hindi": "प्याज मैगट",
    "marathi": "कांदा मॅगट",
    "nepali": "प्याज म्यागट",
    "spanish": "Gusano de la cebolla"
  },
  {
    "english": "Earwig",
    "hindi": "ईयरविग",
    "marathi": "ईअरविग",
    "nepali": "इअर्विग",
    "spanish": "Tijereta"
  },
  {
    "english": "Tea mites and spider mites",
    "hindi": "चाय माइट्स और स्पाइडर माइट्स",
    "marathi": "चहा माईट्स आणि स्पायडर माईट्स",
    "nepali": "चिया माइटहरू र माकै माइटहरू",
    "spanish": "Ácaros del té y ácaros araña"
  },
  {
    "english": "Tea Cutworms",
    "hindi": "चाय कटवॉर्म्स",
    "marathi": "चहा कट वर्म्स",
    "nepali": "चिया कट वर्म्स",
    "spanish": "Gusanos cortadores de té"
  },
  {
    "english": "Tea Crickets",
    "hindi": "चाय क्रिकेट्स",
    "marathi": "चहा क्रिकेट्स",
    "nepali": "चिया क्रिकेटहरू",
    "spanish": "Grillos del té"
  },
  {
    "english": "Tea mosquito bug",
    "hindi": "चाय मच्छर बग",
    "marathi": "चहा मच्छर बग",
    "nepali": "चिया मच्छर बग",
    "spanish": "Chinche mosquitero del té"
  },
  {
    "english": "Pyrilla",
    "hindi": "पायरिला",
    "marathi": "पायरिला",
    "nepali": "पाइरिला",
    "spanish": "Pirilla"
  },
  {
    "english": "Wooly Aphid",
    "hindi": "वूली एफिड",
    "marathi": "वुली एफिड",
    "nepali": "वुली एफिड",
    "spanish": "Áfido lanoso"
  },
  {
    "english": "Borer",
    "hindi": "बोरर",
    "marathi": "बोरर",
    "nepali": "बोरर",
    "spanish": "Barrenador"
  },
  {
    "english": "White grub",
    "hindi": "सफेद ग्रब",
    "marathi": "पांढरा ग्रब",
    "nepali": "सेतो ग्रब",
    "spanish": "Larva blanca"
  },
  {
    "english": "Internode Borer",
    "hindi": "अंतरग्रंथि बोरर",
    "marathi": "इंटरनोड बोरर",
    "nepali": "इन्टरनोड बोरर",
    "spanish": "Barrenador del entrenudo"
  },
  {
    "english": "Mealybug",
    "hindi": "मीलीबग",
    "marathi": "मिलीबग",
    "nepali": "मिलीबग",
    "spanish": "Cochinilla"
  },
  {
    "english": "Early shoot borer",
    "hindi": "एर्ली शूट बोरर",
    "marathi": "आधीच्या शूट बोरर",
    "nepali": "इर्ली शूट बोरर",
    "spanish": "Barrenador temprano de brotes"
  },
  {
    "english": "Corm Weevil",
    "hindi": "कोर्म वीविल",
    "marathi": "कॉर्म वीविल",
    "nepali": "कोर्म विविल",
    "spanish": "Picudo del cormo"
  },
  {
    "english": "Pseudostem Weevil",
    "hindi": "झूलावट वीविल",
    "marathi": "काहीतरीचे वीविल",
    "nepali": "प्सेउडोस्टेम विविल",
    "spanish": "Picudo del pseudotallo"
  },
  {
    "english": "Nematode",
    "hindi": "नेमाटोड",
    "marathi": "नेमाटोड",
    "nepali": "नेमाटोड",
    "spanish": "Nematodo"
  },
  {
    "english": "Stem borer",
    "hindi": "दंड बोरर",
    "marathi": "शंकु बोरर",
    "nepali": "डंड बोरर",
    "spanish": "Barrenador del tallo"
  },
  {
    "english": "Fall armyworm",
    "hindi": "गिरने वाला सेनापति कीट",
    "marathi": "पडणारी लालसरंगी किड",
    "nepali": "पड्ने सेना किट",
    "spanish": "Gusano militar caído"
  },
  {
    "english": "Ear head bug",
    "hindi": "कान सिर बग",
    "marathi": "कान शिरी किडा",
    "nepali": "कान सिर बग",
    "spanish": "Chinche de espiga"
  },
  {
    "english": "Rice Stem borer",
    "hindi": "धान डंड बोरर",
    "marathi": "तांदूळ शंकु बोरर",
    "nepali": "चामल डंड बोरर",
    "spanish": "Barrenador del tallo de arroz"
  },
  {
    "english": "Rice Hispa",
    "hindi": "धान हिस्पा",
    "marathi": "तांदूळ हिस्पा",
    "nepali": "चामल हिस्पा",
    "spanish": "Hispa del arroz"
  },
  {
    "english": "Leaf folder",
    "hindi": "पत्ते फोल्डर",
    "marathi": "पाने फोल्डर",
    "nepali": "पात फोल्डर",
    "spanish": "Plegador de hojas"
  },
  {
    "english": "Plant hopper",
    "hindi": "पौधा हॉपर",
    "marathi": "वनस्पती हॉपर",
    "nepali": "बवासीर हपर",
    "spanish": "Saltahojas de planta"
  },
  {
    "english": "Stem fly",
    "hindi": "तना मक्खी",
    "marathi": "टाक माऊ",
    "nepali": "डंड माछा",
    "spanish": "Mosca de tallo"
  },
  {
    "english": "Pod borer",
    "hindi": "फलक बोरर",
    "marathi": "फळांचे बोरर",
    "nepali": "फलक बोरर",
    "spanish": "Barrenador de vainas"
  },
  {
    "english": "White fly",
    "hindi": "सफेद मक्खी",
    "marathi": "पांढरी फुटली",
    "nepali": "सेतो झिरा",
    "spanish": "Mosca blanca"
  },
  {
    "english": "Armyworm",
    "hindi": "सेनापति कीट",
    "marathi": "लालसरंगी किड",
    "nepali": "सेना किट",
    "spanish": "Gusano militar"
  },
  {
    "english": "Bulb Mites",
    "hindi": "बल्ब माइट्स",
    "marathi": "डोंगर टिपके",
    "nepali": "वटा माइटहरू",
    "spanish": "Ácaros de bulbos"
  },
  {
    "english": "Red spider mite",
    "hindi": "लाल माकै माइट",
    "marathi": "लाल टिपका",
    "nepali": "रातो माइट",
    "spanish": "Ácaro rojo"
  },
  {
    "english": "Safflower aphid",
    "hindi": "सैफलावर अफीड",
    "marathi": "खरफूस अफीड",
    "nepali": "सफ्लोवर अफिड",
    "spanish": "Áfido del cártamo"
  },
  {
    "english": "Safflower gram pod borer/ capsule borer",
    "hindi": "सैफलावर ग्राम पॉड बोरर/कैप्सूल बोरर",
    "marathi": "खरफूस ग्राम पॉड बोरर/कॅप्सूल बोरर",
    "nepali": "सफ्लोवर ग्राम पॉड बोरर/क्याप्सुल बोरर",
    "spanish": "Barrenador de vainas/granos de cártamo"
  },
  {
    "english": "Safflower caterpillar",
    "hindi": "सैफलावर अरजी या गुच्छे खानारी पतंग",
    "marathi": "खरफूस आंडांचे खाणारी पांडुरंग",
    "nepali": "सफ्लोवर तिते",
    "spanish": "Oruga del cártamo"
  },
  {
    "english": "safflower bud fly/capsule fly",
    "hindi": "सैफलावर टाकायला जाऊन जीव",
    "marathi": "खरफूसावर टाकायला जाऊन जीव",
    "nepali": "सफ्लोवर फूलहरूमा फ्लाई/क्याप्सुल फ्लाई",
    "spanish": "Moscas de capullo/cápsula de cártamo"
  },
  {
    "english": "Cotton American boll worm",
    "hindi": "कपास अमेरिकन बोल वर्म",
    "marathi": "कापूस अमेरिकन बोल वर्म",
    "nepali": "सफेद धान अमेरिकन बोल वर्म",
    "spanish": "Gusano americano de algodón"
  },
  {
    "english": "Cotton Spotted boll worm",
    "hindi": "कपास स्पॉटेड बोल वर्म",
    "marathi": "कापूस स्पॉटेड बोल वर्म",
    "nepali": "सफेद धान चित्रित बोल वर्म",
    "spanish": "Gusano moteado de algodón"
  },
  {
    "english": "Cotton Pink boll worm",
    "hindi": "कपास गुलाबी बोल वर्म",
    "marathi": "कापूस गुलाबी बोल वर्म",
    "nepali": "सफेद धान गुलाबी बोल वर्म",
    "spanish": "Gusano rosado de algodón"
  },
  {
    "english": "Cotton Jassid",
    "hindi": "कपास जैसिड",
    "marathi": "कापूस जॅसिड",
    "nepali": "सफेद धान जसिड",
    "spanish": "Jasíd del algodón"
  },
  {
    "english": "Coffee berry borer",
    "hindi": "कॉफी बेरी बोरर",
    "marathi": "कॉफी बेरी बोरर",
    "nepali": "कफि बेरी बोरर",
    "spanish": "Barrenador de la baya del café"
  },
  {
    "english": "Coffee White stem borer",
    "hindi": "कॉफी सफेद डंड बोरर",
    "marathi": "कॉफी पांढरे डोंगर बोरर",
    "nepali": "कफि सेतो डंड बोरर",
    "spanish": "Barrenador blanco del tallo del café"
  },
  {
    "english": "Coffee Shot hole borer",
    "hindi": "कॉफी शॉट होल बोरर",
    "marathi": "कॉफी शॉट होल बोरर",
    "nepali": "कफि शट होल बोरर",
    "spanish": "Barrenador del agujero de disparo del café"
  },
  {
    "english": "Coffee Red borer",
    "hindi": "कॉफी लाल बोरर",
    "marathi": "कॉफी लाल बोरर",
    "nepali": "कफि रातो बोरर",
    "spanish": "Barrenador rojo del café"
  },
  {
    "english": "Tomato Gram pod borer",
    "hindi": "टमाटर ग्राम पॉड बोरर",
    "marathi": "टोमॅटो ग्राम पॉड बोरर",
    "nepali": "गोलभेडा ग्राम पॉड बोरर",
    "spanish": "Barrenador de vainas de tomate"
  },
  {
    "english": "Tomato Leaf eating caterpillar",
    "hindi": "टमाटर पत्ता खाने वाला तितली",
    "marathi": "टोमॅटो पाने खाणारी पांडुरंग",
    "nepali": "गोलभेडा पात खाने तिते",
    "spanish": "Oruga que come hojas de tomate"
  },
  {
    "english": "Tomato Whitefly",
    "hindi": "टमाटर सफेद मक्खी",
    "marathi": "टोमॅटो पांढरी फुटली",
    "nepali": "गोलभेडा सेतो झिरा",
    "spanish": "Mosca blanca del tomate"
  },
  {
    "english": "Tomato Serpentine leaf miner.",
    "hindi": "टमाटर सर्पेंटाइन पत्ती माइनर।",
    "marathi": "टोमॅटो सर्पेंटाइन पाने मायनर।",
    "nepali": "गोलभेडा सर्पेन्टाइन पात माइनर।",
    "spanish": "Minador de hojas serpentinas del tomate."
  },
  {
    "english": "European Skipper",
    "hindi": "यूरोपियन स्किपर",
    "marathi": "यूरोपियन स्किपर",
    "nepali": "युरोपेली स्किपर",
    "spanish": "Saltamontes europeo"
  },
  {
    "english": "Cereal rust mite adults",
    "hindi": "अन्नद्रव्ये धान रस्ट माईट वयस्क",
    "marathi": "पिशवे तांदूळ रस्ट मायट प्रौढ",
    "nepali": "अन्नद्रव्ये धान रस्ट माईट वयस्क",
    "spanish": "Ácaros adultos de la roya de los cereales"
  },
  {
    "english": "Wireworms",
    "hindi": "तारमक्खी",
    "marathi": "तार कीटक",
    "nepali": "तारमक्खी",
    "spanish": "Gusanos de alambre"
  },
  {
    "english": "Grasshopper",
    "hindi": "टिड्डी",
    "marathi": "तितड",
    "nepali": "टिड्डी",
    "spanish": "Saltamontes"
  },
  {
    "english": "Bihar hair caterpiller",
    "hindi": "बिहार केश कीट",
    "marathi": "बिहार केशांचे पांडुरंग",
    "nepali": "बिहार केश तिते",
    "spanish": "Oruga de pelo de Bihar"
  },
  {
    "english": "Cabbage buterfly",
    "hindi": "कैबेज केळी",
    "marathi": "कोबी केळी",
    "nepali": "गोबीको तिते",
    "spanish": "Mariposa de la col"
  },
  {
    "english": "Mustard aphid",
    "hindi": "सरसों अफीड",
    "marathi": "मोहरी अफीड",
    "nepali": "तोरीको झिरा",
    "spanish": "Áfido del mostaza"
  },
  {
    "english": "Mustard sawfly",
    "hindi": "सरसों लाटी कीट",
    "marathi": "मोहरी सोडका",
    "nepali": "तोरीको सासी तिते",
    "spanish": "Avispa sierra de mostaza"
  },
  {
    "english": "Bean Aphids",
    "hindi": "फलियांच्या पानांवरील अफिड",
    "marathi": "शेंगा अफिड",
    "nepali": "बिनको झिरा",
    "spanish": "Áfidos de frijol"
  },
  {
    "english": "Blister beetle",
    "hindi": "ब्लिस्टर बीटल",
    "marathi": "ब्लिस्टर बीटल",
    "nepali": "ब्लिस्टर बिटल",
    "spanish": "Escarabajo ampolla"
  },
  {
    "english": "Blue butterfly",
    "hindi": "नीला तितली",
    "marathi": "निळा पांडुरंग",
    "nepali": "निलको तिते",
    "spanish": "Mariposa azul"
  },
  {
    "english": "Gram pod borer",
    "hindi": "चने की बीज कीट",
    "marathi": "चण्याचे पांडुरंग",
    "nepali": "बटमासको झिरा",
    "spanish": "Barrenador de vainas de gram"
  },
  {
    "english": "Earhead bug",
    "hindi": "इयरहेड बग",
    "marathi": "इयरहेड बग",
    "nepali": "इयरहेड बग",
    "spanish": "Chinche de la espiga"
  },
  {
    "english": "Ear Head caterpillar",
    "hindi": "इयर हेड केटरपिलर",
    "marathi": "इयर हेड केटरपिलर",
    "nepali": "इयर हेड तिते",
    "spanish": "Oruga de cabeza de espiga"
  },
  {
    "english": "Pink stem borer",
    "hindi": "गुलाबी डंड बोरर",
    "marathi": "गुलाबी डोंगर बोरर",
    "nepali": "गुलाबी डंड बोरर",
    "spanish": "Barrenador del tallo rosado"
  },
  {
    "english": "Plant lice (Aphids)",
    "hindi": "पौधे के जूए (एफिड्स)",
    "marathi": "वनस्पती जुना (एफिड्स)",
    "nepali": "रुख किटाणु (एफिड्स)",
    "spanish": "Piojos de planta (áfidos)"
  },
  {
    "english": "Leaf webber or roller and capsule borer",
    "hindi": "पत्तियों वेबर या रोलर और कैप्सूल बोरर",
    "marathi": "पाने वेबर किंवा रोलर आणि कॅप्सूल बोरर",
    "nepali": "पात किसिमले वा रोलर र कैप्सुल भोरर",
    "spanish": "Tejedor o enrollador de hojas y barrenador de cápsulas"
  },
  {
    "english": "Gall fly",
    "hindi": "गॉल फ्लाई",
    "marathi": "गॉल फ्लाय",
    "nepali": "गॉल फ्लाई",
    "spanish": "Moscas de agallas"
  },
  {
    "english": "Sesame leafhopper",
    "hindi": "तिल की पत्ती मारने वाला",
    "marathi": "तीळाच्या पानांवरील अफिड",
    "nepali": "तिलको पात माइनर",
    "spanish": "Cigarrilla del sésamo"
  },
  {
    "english": "Hawk moth",
    "hindi": "हॉक मोथ",
    "marathi": "हॉक मोथ",
    "nepali": "हक मोथ",
    "spanish": "Polilla halcón"
  },
  {
    "english": "Earwig: Anisolabis stali",
    "hindi": "ईयरविग: अनीसोलाबिस स्टाली",
    "marathi": "ईयरविग: अनीसोलाबिस स्टाली",
    "nepali": "इयरविग: अनीसोलाबिस स्टाली",
    "spanish": "Tijereta: Anisolabis stali"
  },
  {
    "english": "Alfalfa Looper",
    "hindi": "अल्फाल्फा लूपर",
    "marathi": "अल्फाल्फा लूपर",
    "nepali": "अल्फाल्फा लूपर",
    "spanish": "Gusano de la alfalfa"
  },
  {
    "english": "Alfalfa Aphid",
    "hindi": "अल्फाल्फा एफिड",
    "marathi": "अल्फाल्फा अफिड",
    "nepali": "अल्फाल्फा अफिड",
    "spanish": "Áfido de la alfalfa"
  },
  {
    "english": "Cutworms",
    "hindi": "कटवर्म",
    "marathi": "कटवर्म",
    "nepali": "कटवर्म्स",
    "spanish": "Orugas cortadoras"
  },
  {
    "english": "Fruit Rust,Thrips",
    "hindi": "फल जंग, ठ्रिप्स",
    "marathi": "फळ रस्ट, ठ्रिप्स",
    "nepali": "फल जंग, ठ्रिप्स",
    "spanish": "Moho de frutas, trips"
  },
  {
    "english": "Slugs",
    "hindi": "केकडा",
    "marathi": "केकडा",
    "nepali": "केकडा",
    "spanish": "Caracoles"
  },
  {
    "english": "Gram caterpillar",
    "hindi": "चने की गुड़िया",
    "marathi": "चण्याचे शंकू",
    "nepali": "बटमासको राजच",
    "spanish": "Oruga de gram"
  },
  {
    "english": "Fruit fly",
    "hindi": "फल मक्खी",
    "marathi": "फळ माकडी",
    "nepali": "फल ठिट्ठा",
    "spanish": "Mosca de la fruta"
  },
  {
    "english": "Leaf miner",
    "hindi": "पत्ते माइनर",
    "marathi": "पाने माइनर",
    "nepali": "पात माइनर",
    "spanish": "Minador de hojas"
  },
  {
    "english": "Citrus Psyllid",
    "hindi": "नींबू का प्सिलिड",
    "marathi": "लिंबाचा प्सिलिड",
    "nepali": "नींबूको प्सिलिड",
    "spanish": "Psílido de los cítricos"
  },
  {
    "english": "Scale Insects",
    "hindi": "स्केल किट",
    "marathi": "स्केल किड",
    "nepali": "स्केल किट्स",
    "spanish": "Insectos escama"
  },
  {
    "english": "Aphids & Mealy Bugs",
    "hindi": "अफिड और मीली बग्स",
    "marathi": "अफिड्स आणि मिलीबग्स",
    "nepali": "एफिड र मिली किरा",
    "spanish": "Áfidos y cochinillas"
  },
  {
    "english": "Scale Insects:",
    "hindi": "स्केल किट:",
    "marathi": "स्केल किड:",
    "nepali": "स्केल किट्स:",
    "spanish": "Insectos escama:"
  },
  {
    "english": "Leaf Miner",
    "hindi": "पत्ते माइनर",
    "marathi": "पाने माइनर",
    "nepali": "पात माइनर",
    "spanish": "Minador de hojas"
  },
  {
    "english": "Black Aphids",
    "hindi": "काले एफिड्स",
    "marathi": "काळे अफिड्स",
    "nepali": "कालो झिरा",
    "spanish": "Áfidos negros"
  },
  {
    "english": "Termites",
    "hindi": "दीमक",
    "marathi": "दिमक",
    "nepali": "खतमला",
    "spanish": "Termitas"
  },
  {
    "english": "Olive fruit fly",
    "hindi": "जैतून फल मक्खी",
    "marathi": "जैतून फळ माकडी",
    "nepali": "तेलको फल ठिट्ठा",
    "spanish": "Mosca de la fruta del olivo"
  },
  {
    "english": "Olive moth",
    "hindi": "जैतून कीट",
    "marathi": "जैतून किड",
    "nepali": "तेलको किट",
    "spanish": "Polilla de oliva"
  },
  {
    "english": "Black scale",
    "hindi": "काली स्केल",
    "marathi": "काळी स्केल",
    "nepali": "कालो किट्टा",
    "spanish": "Escama negra"
  },
  {
    "english": "Mealy bugs",
    "hindi": "मीली बग्स",
    "marathi": "मिलीबग्स",
    "nepali": "मिली किरा",
    "spanish": "Cochinillas"
  },
  {
    "english": "Tea mosquitoe bugs",
    "hindi": "चाय मच्छर कीट",
    "marathi": "चहा मच्छर किड",
    "nepali": "चिया मच्छर किरा",
    "spanish": "Insectos mosquitos del té"
  },
  {
    "english": "Flatid Plant hoppers",
    "hindi": "फ्लेटिड प्लांट हॉपर्स",
    "marathi": "फ्लॅटिड प्लॅंट हॉपर्स",
    "nepali": "फ्लाटिड प्लान्ट हपर्स",
    "spanish": "Saltahojas planos"
  },
  {
    "english": "Aphids",
    "hindi": "एफिड्स",
    "marathi": "अफिड्स",
    "nepali": "एफिड्स",
    "spanish": "Áfidos"
  },
  {
    "english": "Mexican bean beetle",
    "hindi": "मैक्सिकन बीन किट",
    "marathi": "मेक्सिकन बीन किड",
    "nepali": "मेक्सिकन खसी किट",
    "spanish": "Escarabajo mexicano de frijol"
  },
  {
    "english": "Leafminers",
    "hindi": "पत्ते माइनर्स",
    "marathi": "पाने माइनर्स",
    "nepali": "पात माइनर्स",
    "spanish": "Minadores de hojas"
  },
  {
    "english": "Corn earworm",
    "hindi": "मकई की खेती का कीट",
    "marathi": "मका किटक",
    "nepali": "कोर्न कीट",
    "spanish": "Gusano del maíz"
  },
  {
    "english": "White scale",
    "hindi": "सफेद स्केल",
    "marathi": "पांढरी स्केल",
    "nepali": "सेतो किट्टा",
    "spanish": "Escama blanca"
  },
  {
    "english": "Shield scale",
    "hindi": "ढाल स्केल",
    "marathi": "ढाल स्केल",
    "nepali": "ढाल किट्टा",
    "spanish": "Escama escudo"
  },
  {
    "english": "Leaf beetle",
    "hindi": "पत्ते कीट",
    "marathi": "पान किड",
    "nepali": "पात किट्टा",
    "spanish": "Escarabajo de hojas"
  },
  {
    "english": "Capitulum borer",
    "hindi": "कैपिटलम बोरर",
    "marathi": "कॅपिटूलम बोरर",
    "nepali": "क्यापिट्युलम बोरर",
    "spanish": "Barrenador de capítulos"
  },
  {
    "english": "Tobacco caterpillar",
    "hindi": "तंबाकू कीटक",
    "marathi": "टोबॅको किडक",
    "nepali": "तामाको किरा",
    "spanish": "Oruga del tabaco"
  },
  {
    "english": "Leaf hopper",
    "hindi": "पत्ते कीट",
    "marathi": "पान किड",
    "nepali": "पात किट्टा",
    "spanish": "Saltahojas"
  },
  {
    "english": "Sunflower beetle",
    "hindi": "सूरजमुखी का कीट",
    "marathi": "सुर्यफूल किड",
    "nepali": "सूर्यमुखी कीट",
    "spanish": "Escarabajo del girasol"
  },
  {
    "english": "Mealy bug",
    "hindi": "मीली बग",
    "marathi": "मिलीबग",
    "nepali": "मिली किरा",
    "spanish": "Cochinilla"
  },
  {
    "english": "Grasshopper",
    "hindi": "टिड्डी",
    "marathi": "उंबरळी",
    "nepali": "तित्तिर",
    "spanish": "Saltamontes"
  },
  {
    "english": "Mango Hopper (Idioscopus clypealis)",
    "hindi": "आम हॉपर (इडियोस्कोपस क्लाइपीलिस)",
    "marathi": "आंबा हॉपर (इडियोस्कोपस क्लायपेलिस)",
    "nepali": "आप्रिकोट हपर (इडियोस्कोपस क्लाइपेलिस)",
    "spanish": "Saltador del mango (Idioscopus clypealis)"
  },
  {
    "english": "Mango Mealy Bug (Drosicha mangiferae)",
    "hindi": "आम मिली बग (द्रोसिका मैंगीफेरे)",
    "marathi": "आंबा मिलीबग (द्रोसिका मैंगिफेरे)",
    "nepali": "आमको मिलीबग (द्रोसिका मैंगिफेरे)",
    "spanish": "Cochinilla del mango (Drosicha mangiferae)"
  },
  {
    "english": "Mango Bark Eating Caterpillar (Indarbela quadrinotata)",
    "hindi": "आम कीट खाने वाली कैटरपिलर (इंदारबेला क्वाड्रिनोटाटा)",
    "marathi": "आंबा किटक खाणारी कॅटरपिलर (इंदारबेला क्वॅड्रिनोटाटा)",
    "nepali": "आप्रिकोट बार्क खाने वाला रुई (इन्डारबेला क्वाड्रिनोटाटा)",
    "spanish": "Oruga que come corteza de mango (Indarbela quadrinotata)"
  },
  {
    "english": "Mango fruit fly: Bactrocera dorsalis",
    "hindi": "आम का फल मक्खी: बैक्ट्रोसेरा डॉर्सालिस",
    "marathi": "आंबा फळ माकडी: बॅक्ट्रोसेरा डोर्सालिस",
    "nepali": "आम फल ठिट्ठा: बैक्ट्रोसेरा डोर्सालिस",
    "spanish": "Mosca de la fruta del mango: Bactrocera dorsalis"
  },
  {
    "english": "Red spider mite",
    "hindi": "लाल चूहे का कीट",
    "marathi": "लाल मेंडीची किड",
    "nepali": "रातो सानो किट्टा",
    "spanish": "Ácaro rojo"
  },
  {
    "english": "Woolly aphids",
    "hindi": "ऊनदार एफिड्स",
    "marathi": "उनदार अफिड्स",
    "nepali": "ऊनदार एफिड्स",
    "spanish": "Áfidos lanudos"
  },
  {
    "english": "San jose scale",
    "hindi": "सैन जोस स्केल",
    "marathi": "सॅन जोस स्केल",
    "nepali": "सान जोस स्केल",
    "spanish": "Escama de San José"
  },
  {
    "english": "Codling moth",
    "hindi": "कोडलिंग मॉथ",
    "marathi": "कॉडलिंग मॉथ",
    "nepali": "कोडलिंग मोथ",
    "spanish": "Polilla de la manzana"
  },
  {
    "english": "European red mite",
    "hindi": "यूरोपियन लाल चूहे का कीट",
    "marathi": "युरोपियन लाल मेंडीची किड",
    "nepali": "युरोपियन रातो सानो किट्टा",
    "spanish": "Ácaro rojo europeo"
  },
  {
    "english": "Placement",
    "hindi": "स्थाननिर्धारण",
    "marathi": "स्थाननिर्धारण",
    "nepali": "स्थाननिर्धारण",
    "spanish": "Colocación"
  },
  {
    "english": "Band Placement",
    "hindi": "बैंड स्थाननिर्धारण",
    "marathi": "बैंड स्थाननिर्धारण",
    "nepali": "बैंड स्थाननिर्धारण",
    "spanish": "Colocación en banda"
  },
  {
    "english": "Foliar Application",
    "hindi": "पर्णियांत्रिक आवेदन",
    "marathi": "पत्रारोपण",
    "nepali": "पर्णियांत्रिक लागत",
    "spanish": "Aplicación foliar"
  },
  {
    "english": "Injection into Soil",
    "hindi": "मिट्टी में इंजेक्शन",
    "marathi": "मातीत इंजेक्शन",
    "nepali": "मिट्टीमा इन्जेक्शन गर्नु",
    "spanish": "Inyección en suelo"
  },
  {
		"english" : "Potasium chloride",
		"hindi" : "पोटेशियम क्लोराइड",
		"marathi" : "पोटॅशियम क्लोराइड",
		"nepali" : "पोटासियम क्लोराइड",
		"spanish" : "Cloruro de potasio",
		"swahili" : "Kloridi ya potasiamu",
		"indonesian" : "Potasium klorida",
		"french" : "Chlorure de potassium",
		"portugese" : "Cloreto de Potássio",
		"arabic" : "كلوريد البوتاسيوم",
		"bengali" : "পটাসিয়াম ক্লোরাইড",
		"oromo" : "Pootaasiyeemii kilooraayidii",
		"somali" : "Potassium chloride",
		"vietnamese" : "Kali clorua",
		"amharic" : "ፖታሲየም ክሎራይድ",
		"greek" : "Χλωριούχο κάλιο",
		"mandarin" : "氯化钾",
		"turkish" : "Potasyum klorür"
	},
	{
		"english" : "Potasium phosphate",
		"hindi" : "पोटेशियम फास्फेट",
		"marathi" : "पोटॅशियम फॉस्फेट",
		"nepali" : "पोटासियम फोस्फेट",
		"spanish" : "Fosfato de potasio",
		"swahili" : "Fosfati ya potasiamu",
		"indonesian" : "Kalium fosfat",
		"french" : "Phosphate de potassium",
		"portugese" : "Fosfato de potássio",
		"arabic" : "فوسفات البوتاسيوم",
		"bengali" : "পটাসিয়াম ফসফেট",
		"oromo" : "Pootaasiyeemii fosfeetii",
		"somali" : "Potassium phosphate",
		"vietnamese" : "Kali photphat",
		"amharic" : "ፖታሲየም ፎስፌት",
		"greek" : "Φωσφορικό κάλιο",
		"mandarin" : "磷酸钾",
		"turkish" : "Potasyum fosfat"
	},
	{
		"english" : "Potasium sulphate",
		"hindi" : "पोटेशियम सल्फेट",
		"marathi" : "पोटॅशियम सल्फेट",
		"nepali" : "पोटासियम सल्फेट",
		"spanish" : "Sulfato de potasio",
		"swahili" : "Sulfa ya potasiamu",
		"indonesian" : "Kalium sulfat",
		"french" : "Sulfate de potassium",
		"portugese" : "Sulfato de potássio",
		"arabic" : "كبريتات البوتاسيوم",
		"bengali" : "পটাসিয়াম সালফেট",
		"oromo" : "Pootaasiyeemii salfeet",
		"somali" : "Potassium sulphate",
		"vietnamese" : "Kali sunphat",
		"amharic" : "ፖታሲየም ሰልፌት",
		"greek" : "Θειικό κάλιο",
		"mandarin" : "硫酸钾",
		"turkish" : "Potasyum sülfat"
	},
	{
		"english" : "Potasium nitrate",
		"hindi" : "पोटेशियम नाइट्रेट ",
		"marathi" : "पोटॅशिअम नायट्रेट",
		"nepali" : "पोटासियम नाइट्रेट",
		"spanish" : "Nitrato de potasio",
		"swahili" : "Nitrati ya potasiamu",
		"indonesian" : "Potasium nitrat",
		"french" : "Nitrate de potassium",
		"portugese" : "Nitrato de potássio",
		"arabic" : "نترات البوتاسيوم",
		"bengali" : "পটাসিয়াম নাইট্রেট",
		"oromo" : "Pootaasiyeemii naayitreetii",
		"somali" : "Potassium nitrate",
		"vietnamese" : "Kali nitrat",
		"amharic" : "ፖታሲየም ናይትሬት",
		"greek" : "Νιτρικό κάλιο",
		"mandarin" : "硝酸钾",
		"turkish" : "Potasyum nitrat"
	},
  {
    "english": "Ugandan shilling",
    "hindi": "युगांडाई शिलिंग",
    "marathi": "युगांडन शिलिंग",
    "nepali": "युगान्डी शिलिङ",
    "spanish": "Chelín ugandés"
  },
  {
    "english": "Indian rupee",
    "hindi": "भारतीय रुपया",
    "marathi": "भारतीय रुपया",
    "nepali": "भारतीय रूपया",
    "spanish": "Rupia india"
  },
  {
    "english": "United States dollar",
    "hindi": "संयुक्त राज्य अमेरिकी डॉलर",
    "marathi": "युनायटेड स्टेट्स डॉलर",
    "nepali": "संयुक्त राज्य डलर",
    "spanish": "Dólar estadounidense"
  },
  {
    "english": "Indonesian Rupiah",
    "hindi": "इंडोनेशियाई रुपियाह",
    "marathi": "इंडोनेशियन रुपियाह",
    "nepali": "इन्डोनेसियाली रुपियाह",
    "spanish": "Rupia indonesia"
  },
  {
    "english": "Euro",
    "hindi": "यूरो",
    "marathi": "यूरो",
    "nepali": "युरो",
    "spanish": "Euro"
  },
  {
    "english": "Singapore Dollar",
    "hindi": "सिंगापुर डॉलर",
    "marathi": "सिंगापूर डॉलर",
    "nepali": "सिंगापुर डलर",
    "spanish": "Dólar de Singapur"
  },
  {
    "english": "Brazilian Real",
    "hindi": "ब्राज़ीली रियाल",
    "marathi": "ब्राझिलियन रियाल",
    "nepali": "ब्राजिलियाली रियाल",
    "spanish": "Real brasileño"
  },
  {
    "english": "Canadian Dollar",
    "hindi": "कनाडियन डॉलर",
    "marathi": "कॅनेडियन डॉलर",
    "nepali": "क्यानाडियन डलर",
    "spanish": "Dólar canadiense"
  },
  {
    "english": "CFP Franc",
    "hindi":"सीएफपी फ्रैंक",
    "marathi": "सीएफपी फ्रँक",
    "nepali": "सीएफपी फ्रँक",
    "spanish": "Franco CFP"
  },
  {
    "english": "French Franc",
    "hindi": "फ़्रांसीसी फ्रैंक",
    "marathi": "फ्रेंच फ्रँक",
    "nepali": "फ्रेन्च फ्रँक",
    "spanish": "Franco francés"
  },
  {
    "english": "Italian Lira",
    "hindi": "इटालियन लीरा",
    "marathi": "इटालियन लिरा",
    "nepali": "इटालियन लीरा",
    "spanish": "Lira italiana"
  },
  {
    "english": "Kuwaiti Dinar",
    "hindi": "कुवैती दीनार",
    "marathi": "कुवेती दिनार",
    "nepali": "कुवेती दिनार",
    "spanish": "Dinar kuwaití"
  },
  {
    "english": "Mexican Peso",
    "hindi": "मैक्सिकन पेसो",
    "marathi": "मेक्सिकन पेसो",
    "nepali": "मेक्सिकन पेसो",
    "spanish": "Peso mexicano"
  },
  {
    "english": "Nepalese Rupee",
    "hindi": "नेपाली रुपिया",
    "marathi": "नेपाली रुपया",
    "nepali": "नेपाली रूपैयाँ",
    "spanish": "Rupia nepalesa"
  },
  {
    "english": "United Arab Emirates Dirham",
    "hindi": "संयुक्त अरब अमीरात दिर्हाम",
    "marathi": "संयुक्त अरब अमीरात दिर्हाम",
    "nepali": "संयुक्त अरब इमिरातहरूको दिर्हाम",
    "spanish": "Dirham de los Emiratos Árabes Unidos"
  }

]


let currencyList = ["Ugandan shilling",
"Indian rupee",
"United States dollar",
"Indonesian Rupiah",
"Euro",
"Singapore Dollar",
"Brazilian Real",
"Canadian Dollar",
"CFP Franc",
"French Franc",
"Italian Lira",
"Kuwaiti Dinar",
"Mexican Peso",
"Nepalese Rupee",
"United Arab Emirates Dirham",]



module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log(jsonData, "jsonData")

      let langaugeObjects = jsonData.map(el => {
        el.createdAt= moment.utc().format("YYYY-MM-DD HH:mm:ss")
        el.updatedAt= moment.utc().format("YYYY-MM-DD HH:mm:ss")

        return el
      })
      
      await queryInterface.bulkDelete(
        "global_translation_metadata",
        {english: currencyList},
        {},
        {}
      );

      await queryInterface.bulkInsert(
        "global_translation_metadata",
        langaugeObjects,
        {},
        {}
      );
    } catch (error) {
      console.log(error)
    }


  },
  down: async (queryInterface, Sequelize) => {

  },
};
