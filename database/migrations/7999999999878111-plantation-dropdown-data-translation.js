'use strict';
const path = require("path");
const moment = require("moment")

let jsonData = [
  {
    "english": "Typica (Bergandal, Sidikalang - Sumatera).",
    "hindi": "टाइपिका (बर्गंडाल, सिदिकलंग - सुमातरा)।",
    "marathi": "टायपिका (बर्गंडल, सिडिकलांग - सुमतेरा).",
    "nepali": "टाइटिडा (बर्गर्ड, सिडिकिला ang - सूत्र)",
    "spanish": "Tipica (bergandia, sidikalang - sumatera)."
  },
  {
    "english": "Hibrido de Timor (HDT, Cross breed Arabica-Robusta; Tim-tim, Aceh)",
    "hindi": "Hibrido de Timor (HDT, क्रॉस ब्रीड अरबिका-रोबस्टा; टिम-टिम, ऐसह)",
    "marathi": "हिब्रिडो डी तिमोर (एचडीटी, क्रॉस ब्रीड अरबीका-रोबस्टा; टिम-टिम, आचे)",
    "nepali": "HIBRIDO DO TOROR (HDT, क्रस, क्रस ईरासिका-रोब्यासास; टिम-टिम, Aceh)",
    "spanish": "Hibrido de Timor (HDT, Cross Breed Arabica-Robusta; Tim-Tim, Aceh)"
  },
  {
    "english": "Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)",
    "hindi": "लिनी एस (एस -288, एस -795, एंडुंगसारी, कोमास्टी; ऐश, फ्लोर्स)",
    "marathi": "लीनी एस (एस -288, एस -795,, नुंगसारी, कोमास्टी; आचे, फ्लोरेस)",
    "nepali": "लिनी s (s-288, S-755, orungsari, कोमोस्टी; Aceh, flosels)",
    "spanish": "Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)"
  },
  {
    "english": "Ethiopian lines (Rambung Abyssina, USDA)",
    "hindi": "इथियोपियाई लाइनें (रामबंग एबिसिना, यूएसडीए)",
    "marathi": "इथिओपियन लाईन्स (रॅमबंग अबिसिना, यूएसडीए)",
    "nepali": "इथियोपियाली लाइनहरू (रामोसु g अरिसीना, संयुक्त राज्य अमेरिका)",
    "spanish": "Líneas etíopes (Rambung Abyssina, USDA)"
  },
  {
    "english": "Cattura Cultivars (mutasi Bourbon; originated in Brazil)",
    "hindi": "Cattura कल्टीवेटर्स (मुतासी बॉर्बन; ब्राजील में उत्पन्न)",
    "marathi": "कॅटुरा वाण (मुतासी बोर्बन; मूळ ब्राझीलमध्ये)",
    "nepali": "क्याटुरा खेताहरू (मशित्री बारबोन; ब्राजिलमा उत्पत्ति)",
    "spanish": "Cultivares de Cattura (Mutasi Bourbon; originado en Brasil)"
  },
  {
    "english": "Mundo Nova (Silang Typica-Bourbon, from Brazil)",
    "hindi": "मुंडो नोवा (सिलंग टाइपिका-बोरबॉन, ब्राजील से)",
    "marathi": "मुंडो नोव्हा (सिलांग टायपिका-बोर्बन, ब्राझीलहून)",
    "nepali": "मुन्डो नोभा (सिला give टाइमिल टाइप-ब्राम बार्जनबाट)",
    "spanish": "Mundo Nova (Silang tipica-bourbon, de Brasil)"
  },
  {
    "english": "Catimor Lines (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - mix breed arabica-robusta).",
    "hindi": "कैटिमोर लाइन्स (अंडुंगसारी, एटेंग, जलुक, कार्तिका/कटुई/काटाई - मिक्स नस्ल अरबिका -रॉबस्टा)।",
    "marathi": "कॅटिमोर लाईन्स (नुंगसारी, अटेंग, जलक, कार्तिका/कॅटुई/कटाई - मिक्स ब्रीड अरबीका -रोबस्टा).",
    "nepali": "क्यामर लाइनहरू (arungsari, Aten, jaluk, Kartika / caatuai / caatai ​​- Alerica-रोब्यासास)।",
    "spanish": "Líneas de catimor (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - Mix Breed Arabica -Robusta)."
  },
  {
    "english": "Acaia",
    "hindi": "अकायकार",
    "marathi": "अकिया",
    "nepali": "अशियालिया",
    "spanish": "Acaia"
  },
  {
    "english": "Agata",
    "hindi": "अगाता",
    "marathi": "अगाटा",
    "nepali": "अतार",
    "spanish": "Agata"
  },
  {
    "english": "Amarello De Botucatu",
    "hindi": "अमरेलो डे बोटुकातु",
    "marathi": "अमरेल्लो डी बोटुकाटू",
    "nepali": "Amarello D Botuuuchu",
    "spanish": "Amarello de Botucatu"
  },
  {
    "english": "Arabigo",
    "hindi": "अरबिगो",
    "marathi": "अरबीगो",
    "nepali": "अरबगो",
    "spanish": "Arabigo"
  },
  {
    "english": "Arusha",
    "hindi": "अरुशा",
    "marathi": "अरुशा",
    "nepali": "अरुद्घारा",
    "spanish": "Arusha"
  },
  {
    "english": "Batian",
    "hindi": "बैटियन",
    "marathi": "बॅटियन",
    "nepali": "झुटो भाग",
    "spanish": "Batiano"
  },
  {
    "english": "Benguet",
    "hindi": "बेंग्वेट",
    "marathi": "बेंगुएट",
    "nepali": "Beunuth",
    "spanish": "Benguet"
  },
  {
    "english": "Bergendal",
    "hindi": "बर्गेंडल",
    "marathi": "बर्गेन्डल",
    "nepali": "Bareendal",
    "spanish": "Bergendal"
  },
  {
    "english": "Bergundal Aka Garundang",
    "hindi": "बर्गुंडल उर्फ ​​गरुंडांग",
    "marathi": "बर्गंडल उर्फ ​​गारुंडांग",
    "nepali": "Begundal Aka hokundan",
    "spanish": "Bergarundal, también conocido como Garundang"
  },
  {
    "english": "Bernardina",
    "hindi": "बर्नार्डिना",
    "marathi": "बर्नार्डिना",
    "nepali": "बर्नार्डिना",
    "spanish": "Bernardina"
  },
  {
    "english": "Blawan Paumah",
    "hindi": "ब्लावन पमाह",
    "marathi": "ब्लावन पाउमाह",
    "nepali": "ब्लेवन पूह",
    "spanish": "Blawan Paumah"
  },
  {
    "english": "Blue Mountain",
    "hindi": "नीला पहाड़",
    "marathi": "ब्लू माउंटन",
    "nepali": "नीलो पर्वत",
    "spanish": "Montaña azul"
  },
  {
    "english": "Bmj",
    "hindi": "बीएमजे",
    "marathi": "बीएमजे",
    "nepali": "BMJ",
    "spanish": "BMJ"
  },
  {
    "english": "Bonifieur",
    "hindi": "बोनिफ़ीयर",
    "marathi": "बोनिफियर",
    "nepali": "बर्नलीर",
    "spanish": "Bonfieur"
  },
  {
    "english": "Boubon Mayaguez 71",
    "hindi": "बाउबोन मायाग्यूज़ 71",
    "marathi": "बाउबन मायागेझ 71",
    "nepali": "Boublon magagez",
    "spanish": "Boubon Mayaguez 71"
  },
  {
    "english": "Bourbon",
    "hindi": "बर्बन",
    "marathi": "बोर्बन",
    "nepali": "Brarbnty",
    "spanish": "Borbón"
  },
  {
    "english": "Bourbon Chocolá",
    "hindi": "बोरबॉन चॉकलेट",
    "marathi": "बोर्बन चॉकोल",
    "nepali": "Burnbn Chackáálá",
    "spanish": "Bourbon Chocolá"
  },
  {
    "english": "Bourbon Mayaguez 139",
    "hindi": "Bourbon Mayaguez 139",
    "marathi": "बोर्बन मायाग्झ 139",
    "nepali": "Burbnbon Mayagej 139",
    "spanish": "Bourbon Mayaguez 139"
  },
  {
    "english": "Bourbon Mayaguez 71",
    "hindi": "Bourbon Mayaguez 71",
    "marathi": "बोर्बन मायाग्झ 71",
    "nepali": "Burbnbon Mayagez",
    "spanish": "Bourbon Mayaguez 71"
  },
  {
    "english": "Catuai",
    "hindi": "Catuaí",
    "marathi": "कॅटुई",
    "nepali": "Xuuaa",
    "spanish": "Catuai"
  },
  {
    "english": "Caturra",
    "hindi": "कैटुर्रा",
    "marathi": "कॅटुरा",
    "nepali": "क्यारारा",
    "spanish": "Caturra"
  },
  {
    "english": "Cauvery",
    "hindi": "कावेरी",
    "marathi": "कावेरी",
    "nepali": "पानीभरि",
    "spanish": "Cauvery"
  },
  {
    "english": "Cera",
    "hindi": "मोम",
    "marathi": "सेरा",
    "nepali": "सिरा",
    "spanish": "Cera"
  },
  {
    "english": "Chandragiri",
    "hindi": "चंद्रगिरी",
    "marathi": "चंद्रगिरी",
    "nepali": "चण्डीगिरी",
    "spanish": "Chandragiri"
  },
  {
    "english": "Chickumalgur",
    "hindi": "चिकुमलगुर",
    "marathi": "चिकमलगूर",
    "nepali": "Chickumalgurur",
    "spanish": "Pollito"
  },
  {
    "english": "Coorgs",
    "hindi": "कूर्ग्स",
    "marathi": "कॉर्जेस",
    "nepali": "कोर्ग",
    "spanish": "Coorgs"
  },
  {
    "english": "Criollo",
    "hindi": "क्रिओल्लो",
    "marathi": "क्रिओलो",
    "nepali": "Criollo",
    "spanish": "Criollo"
  },
  {
    "english": "Culi Arabica",
    "hindi": "कुली अरबिका",
    "marathi": "कुली अरबीका",
    "nepali": "Culi अरबी अरबी",
    "spanish": "Culi Arábica"
  },
  {
    "english": "Djimma",
    "hindi": "जिममा",
    "marathi": "Djimma",
    "nepali": "Djimma",
    "spanish": "Djimma"
  },
  {
    "english": "Emerald",
    "hindi": "पन्ना",
    "marathi": "पाचू",
    "nepali": "एक पन्ना",
    "spanish": "Esmeralda"
  },
  {
    "english": "French Mission",
    "hindi": "फ्रेंच मिशन",
    "marathi": "फ्रेंच मिशन",
    "nepali": "फ्रेन्च मिशन",
    "spanish": "Misión francesa"
  },
  {
    "english": "Gesha",
    "hindi": "गेशा",
    "marathi": "गेशा",
    "nepali": "संख्याघा",
    "spanish": "Gesha"
  },
  {
    "english": "Guatemala",
    "hindi": "ग्वाटेमाला",
    "marathi": "ग्वाटेमाला",
    "nepali": "ग्वाटेमाला",
    "spanish": "Guatemala"
  },
  {
    "english": "Harrar",
    "hindi": "हैरार",
    "marathi": "हॅरार",
    "nepali": "हार",
    "spanish": "Hostil"
  },
  {
    "english": "Harrar",
    "hindi": "हैरार",
    "marathi": "हॅरार",
    "nepali": "हार",
    "spanish": "Hostil"
  },
  {
    "english": "Iapar59",
    "hindi": "Iapar59",
    "marathi": "आयएपीएआर 59",
    "nepali": "Iapar59",
    "spanish": "IAPAR59"
  },
  {
    "english": "Ibairi",
    "hindi": "इबैरी",
    "marathi": "इबैरी",
    "nepali": "Ibaari",
    "spanish": "Ibairi"
  },
  {
    "english": "Jackson",
    "hindi": "जैक्सन",
    "marathi": "जॅक्सन",
    "nepali": "ज्याकसन",
    "spanish": "Jackson"
  },
  {
    "english": "Jackson 2/1257",
    "hindi": "जैक्सन 2/1257",
    "marathi": "जॅक्सन 2/1257",
    "nepali": "ज्याक्सन 2/117777",
    "spanish": "Jackson 2/1257"
  },
  {
    "english": "Jember/S795",
    "hindi": "JEMBER/S795",
    "marathi": "जेम्बर/एस 795",
    "nepali": "जीम्बर / S795",
    "spanish": "Jember/S795"
  },
  {
    "english": "K20",
    "hindi": "K20",
    "marathi": "के 20",
    "nepali": "K20",
    "spanish": "K20"
  },
  {
    "english": "K7",
    "hindi": "K7",
    "marathi": "के 7",
    "nepali": "के ::",
    "spanish": "K7"
  },
  {
    "english": "Kalossi",
    "hindi": "कलोसी",
    "marathi": "कालोसी",
    "nepali": "Klosi",
    "spanish": "Kalossi"
  },
  {
    "english": "Kent",
    "hindi": "केंट",
    "marathi": "केंट",
    "nepali": "कमिला",
    "spanish": "Kent"
  },
  {
    "english": "Kona",
    "hindi": "Kona",
    "marathi": "कोना",
    "nepali": "को नाङगा",
    "spanish": "Kona"
  },
  {
    "english": "Kp423",
    "hindi": "Kp423",
    "marathi": "केपी 423",
    "nepali": "Kp423",
    "spanish": "KP423"
  },
  {
    "english": "Laurina",
    "hindi": "लॉरीना",
    "marathi": "लॉरिना",
    "nepali": "लरना",
    "spanish": "Laurina"
  },
  {
    "english": "Lekempti",
    "hindi": "लेकम्प्टी",
    "marathi": "लेकेम्पी",
    "nepali": "लेस्क्थेन्सी",
    "spanish": "Lekempti"
  },
  {
    "english": "Lintong",
    "hindi": "लिंटोंग",
    "marathi": "लिंटोंग",
    "nepali": "लिन्स्ट ong",
    "spanish": "Lintong"
  },
  {
    "english": "Maracaturra",
    "hindi": "माराकाटुर्रा",
    "marathi": "मराकेटुरा",
    "nepali": "मौराजत्रा",
    "spanish": "Maracaturra"
  },
  {
    "english": "Maragogipe",
    "hindi": "मरागोगिप",
    "marathi": "मॅरेगोगिप",
    "nepali": "मरागबाट",
    "spanish": "Margogipe"
  },
  {
    "english": "Maragogype",
    "hindi": "मरागोगाइप",
    "marathi": "मॅरेगोगाइप",
    "nepali": "मारागुगिप",
    "spanish": "Maragogipo"
  },
  {
    "english": "Mayaguez",
    "hindi": "Mayaguez",
    "marathi": "मायागेझ",
    "nepali": "मष्मिज",
    "spanish": "Mayaguez"
  },
  {
    "english": "Mibirizi",
    "hindi": "मिबिरिज़ी",
    "marathi": "मिबीरीझी",
    "nepali": "मिबीरिजिज",
    "spanish": "Mibirizi"
  },
  {
    "english": "Mocha/Mokka",
    "hindi": "मोचा/मोक्का",
    "marathi": "मोचा/मोक्का",
    "nepali": "मोचा / मोक्का",
    "spanish": "Mocha/mokka"
  },
  {
    "english": "Mundo Novo",
    "hindi": "मुंडो नोवो",
    "marathi": "मुंडो नोव्हो",
    "nepali": "मुन्डो नोभे",
    "spanish": "Mundo Novo"
  },
  {
    "english": "Nyasaland",
    "hindi": "न्यासालैंड",
    "marathi": "न्यासालँड",
    "nepali": "Nyasaland",
    "spanish": "Nyasaland"
  },
  {
    "english": "Old Chiks",
    "hindi": "पुरानी चीक्स",
    "marathi": "जुने चिक",
    "nepali": "पुरानो चीक्स",
    "spanish": "Viejos chiks"
  },
  {
    "english": "Onix",
    "hindi": "Onix",
    "marathi": "ओनिक्स",
    "nepali": "चंचित बनाउने",
    "spanish": "Onix"
  },
  {
    "english": "Orange Bourbon",
    "hindi": "नारंगी रंग का बोरबॉन",
    "marathi": "ऑरेंज बोर्बन",
    "nepali": "सुन्तला बारबोन",
    "spanish": "Bourbon naranja"
  },
  {
    "english": "Ouro Bronze",
    "hindi": "Ouro कांस्य",
    "marathi": "Brow कांस्य",
    "nepali": "Odo कांस्य",
    "spanish": "Bronce de Ouro"
  },
  {
    "english": "Ouro Verde",
    "hindi": "Ouro Verde",
    "marathi": "Urodo verde",
    "nepali": "Oro भद्दा",
    "spanish": "Ouro Verde"
  },
  {
    "english": "Pacamara",
    "hindi": "पैकमारा",
    "marathi": "Pacamara",
    "nepali": "पकेदा",
    "spanish": "Pacamara"
  },
  {
    "english": "Pacas",
    "hindi": "पचास",
    "marathi": "Pacas",
    "nepali": "पाक",
    "spanish": "Pacas"
  },
  {
    "english": "Pache",
    "hindi": "पचाना",
    "marathi": "पेचे",
    "nepali": "टुक्रा",
    "spanish": "Palacio"
  },
  {
    "english": "Pache Colis",
    "hindi": "पीच कोलिस",
    "marathi": "पेचे कॉलिस",
    "nepali": "पुत्रा कोष्ठी",
    "spanish": "Pache colis"
  },
  {
    "english": "Pache Comum",
    "hindi": "पचास",
    "marathi": "पेचे कॉमम",
    "nepali": "पुष्कार कमिन",
    "spanish": "Comum Pache"
  },
  {
    "english": "Pink Bourbon",
    "hindi": "गुलाबी रंग का बोरबॉन",
    "marathi": "गुलाबी बोर्बन",
    "nepali": "गुलाबी बीआरबोन",
    "spanish": "Bourbon rosa"
  },
  {
    "english": "Pluma Hidalgo",
    "hindi": "प्लुमा हिडाल्गो",
    "marathi": "प्लुमा हिडाल्गो",
    "nepali": "प्लममा hidalgalg",
    "spanish": "Pluma Hidalgo"
  },
  {
    "english": "Pop3303/21",
    "hindi": "POP3303/21",
    "marathi": "POP3303/21",
    "nepali": "POP3303 / 21",
    "spanish": "POP3303/21"
  },
  {
    "english": "Red Bourbon",
    "hindi": "लाल रंग का बोरबॉन",
    "marathi": "लाल बोर्बन",
    "nepali": "रातो बरबोन",
    "spanish": "Bourbon rojo"
  },
  {
    "english": "Rosa Morena",
    "hindi": "रोजा मोरेना",
    "marathi": "रोजा मोरेना",
    "nepali": "रोजा मोना",
    "spanish": "Rosa Morena"
  },
  {
    "english": "Rubi",
    "hindi": "रूबी",
    "marathi": "रुबी",
    "nepali": "र रुइ",
    "spanish": "Rubí"
  },
  {
    "english": "Ruiru 11",
    "hindi": "रुइरु 11",
    "marathi": "रुईरू 11",
    "nepali": "रुरीउ 11",
    "spanish": "Ruiru 11"
  },
  {
    "english": "Safira",
    "hindi": "सफिरा",
    "marathi": "सफिरा",
    "nepali": "सफीर",
    "spanish": "Safira"
  },
  {
    "english": "Sagada",
    "hindi": "सगदा",
    "marathi": "सागडा",
    "nepali": "सागाडा",
    "spanish": "Sagada"
  },
  {
    "english": "San Bernardo Aka Pache",
    "hindi": "सान बर्नार्डो उर्फ ​​पैक",
    "marathi": "सॅन बर्नार्डो उर्फ ​​पेचे",
    "nepali": "स्यान बर्नार्डो अकाए",
    "spanish": "San Bernardo, también conocido como Pache"
  },
  {
    "english": "San Ramon",
    "hindi": "सान रेमन",
    "marathi": "सॅन रॅमन",
    "nepali": "सेन रमिन",
    "spanish": "San Ramón"
  },
  {
    "english": "Santos",
    "hindi": "सैंटोस",
    "marathi": "सॅंटोस",
    "nepali": "सान्ती",
    "spanish": "Santos"
  },
  {
    "english": "Selection 9",
    "hindi": "चयन 9",
    "marathi": "निवड 9",
    "nepali": "चयन 9",
    "spanish": "Selección 9"
  },
  {
    "english": "Semperflorens",
    "hindi": "सेम्परफ्लोरेंस",
    "marathi": "Semperfloren",
    "nepali": "Semperflore",
    "spanish": "Semperflorens"
  },
  {
    "english": "Sidamo",
    "hindi": "सिदामो",
    "marathi": "सिदामो",
    "nepali": "सिडमा",
    "spanish": "Sidamo"
  },
  {
    "english": "Sidikalang",
    "hindi": "सिडिकलंग",
    "marathi": "सिडिकलांग",
    "nepali": "Sidikallag",
    "spanish": "Sidikalang"
  },
  {
    "english": "Sl14",
    "hindi": "SL14",
    "marathi": "एसएल 14",
    "nepali": "X14",
    "spanish": "SL14"
  },
  {
    "english": "Sl28",
    "hindi": "SL28",
    "marathi": "एसएल 28",
    "nepali": "स्ल 28",
    "spanish": "SL28"
  },
  {
    "english": "Sl34",
    "hindi": "SL34",
    "marathi": "एसएल 34",
    "nepali": "संकेत",
    "spanish": "SL34"
  },
  {
    "english": "Sulawesi",
    "hindi": "सुलावेसी",
    "marathi": "सुलावेसी",
    "nepali": "सुलेवीसी",
    "spanish": "Sulawesi"
  },
  {
    "english": "Sumatra",
    "hindi": "सुमात्रा",
    "marathi": "सुमात्रा",
    "nepali": "सुट्टारी",
    "spanish": "Sumatra"
  },
  {
    "english": "Sumatra Lintong",
    "hindi": "सुमात्रा लिंटोंग",
    "marathi": "सुमात्रा लिंटोंग",
    "nepali": "मोतारा लिन्ट ong",
    "spanish": "Sumatra Lintong"
  },
  {
    "english": "Tekisic",
    "hindi": "टेकिसिक",
    "marathi": "टेकिसिक",
    "nepali": "तस्करी",
    "spanish": "Tekisico"
  },
  {
    "english": "Topazio",
    "hindi": "पुष्पक",
    "marathi": "पुष्कराझिओ",
    "nepali": "टपजियो",
    "spanish": "Topazio"
  },
  {
    "english": "Toraja",
    "hindi": "तोरजा",
    "marathi": "तोराजा",
    "nepali": "तोराजा",
    "spanish": "Toraja"
  },
  {
    "english": "Turmalina",
    "hindi": "टफलिना",
    "marathi": "टर्मलिना",
    "nepali": "तुमाल्टिना",
    "spanish": "Turmalina"
  },
  {
    "english": "Turquesa",
    "hindi": "फ़िरक्वेसा",
    "marathi": "टर्कीसा",
    "nepali": "टर्न्डा",
    "spanish": "Turquesa"
  },
  {
    "english": "Typica",
    "hindi": "टाइपिका",
    "marathi": "टायपिका",
    "nepali": "टाइटाइ",
    "spanish": "Típica"
  },
  {
    "english": "Usda762",
    "hindi": "USDA762",
    "marathi": "यूएसडीए 762",
    "nepali": "USDA7622",
    "spanish": "USDA762"
  },
  {
    "english": "Venecia",
    "hindi": "वेनसिया",
    "marathi": "वेनेशिया",
    "nepali": "भेनेसिया",
    "spanish": "Venecia"
  },
  {
    "english": "Villa Sarchi",
    "hindi": "विला सरची",
    "marathi": "व्हिला सरर्ची",
    "nepali": "भिखेह अल",
    "spanish": "Villa sarchi"
  },
  {
    "english": "Villalobos",
    "hindi": "विलालोबोस",
    "marathi": "व्हिलालोबोस",
    "nepali": "Willllobos",
    "spanish": "Villalobos"
  },
  {
    "english": "Walichu/ Wolisho",
    "hindi": "वालिचू/ वोलिशो",
    "marathi": "वालिचू/ वोलिशो",
    "nepali": "वाइचु / Wolisho",
    "spanish": "Walichu/ Wolisho"
  },
  {
    "english": "Yellow Bourbon",
    "hindi": "पीले रंग का बोरबोन",
    "marathi": "पिवळा बोर्बन",
    "nepali": "पहेंलो बीआरबोन",
    "spanish": "Bourbon amarillo"
  },
  {
    "english": "Yirgacheffe",
    "hindi": "Yirgacheffe",
    "marathi": "येरगाचेफ",
    "nepali": "Yirgsce",
    "spanish": "Yirgacheffe"
  },
  {
    "english": "Catimor (hybrid of Caturra x Timor)",
    "hindi": "कैटिमोर (कैटुर्रा एक्स तिमोर का हाइब्रिड)",
    "marathi": "कॅटिमोर (कॅटुर्रा एक्स तिमोरचा संकर)",
    "nepali": "क्याटमोर (क्यार्फररा x टिमोरको हाइब्रिड)",
    "spanish": "Catimor (híbrido de Caturra x Timor)"
  },
  {
    "english": "Jawa (Java Coffee, !700AD)",
    "hindi": "जवा (जावा कॉफी; 700AD)",
    "marathi": "जावा (जावा कॉफी,! 700 एडी)",
    "nepali": "Awaa (जाभा कफी, 700AD)",
    "spanish": "Jawa (Java Coffee,! 700ad)"
  },
  {
    "english": "Arabusta (HDT; Hibrid of sterile CArabica and C.Robusta)",
    "hindi": "अरबस्टा (एचडीटी; बाँझ कारबिका और सी। रोबुस्टा का हाइब्रिड)",
    "marathi": "अरबस्टा (एचडीटी; निर्जंतुकीकरण कॅरेबिका आणि सी. रोबस्टाचे हिब्रिड)",
    "nepali": "अबब्स्टे (HDT; बाँझका केराबिका र सी.Berousta) को jibrid)",
    "spanish": "Arabusta (HDT; Hibrid de carabica estéril y C.Robusta)"
  },
  {
    "english": "Brs 1216",
    "hindi": "बीआरएस 1216",
    "marathi": "बीआरएस 1216",
    "nepali": "Brs 1216",
    "spanish": "BRS 1216"
  },
  {
    "english": "Brs 2336",
    "hindi": "बीआरएस 2336",
    "marathi": "बीआरएस 2336",
    "nepali": "Brs 23366",
    "spanish": "BRS 2336"
  },
  {
    "english": "Brs 3210",
    "hindi": "बीआरएस 3210",
    "marathi": "बीआरएस 3210",
    "nepali": "BRS210",
    "spanish": "BRS 3210"
  },
  {
    "english": "Brs 3213",
    "hindi": "बीआरएस 3213",
    "marathi": "बीआरएस 3213",
    "nepali": "Brs213",
    "spanish": "BRS 3213"
  },
  {
    "english": "Culi Robusta",
    "hindi": "कुली रोबस्टा",
    "marathi": "कुली रोबस्टा",
    "nepali": "Culi रोब्यास्ट्टा",
    "spanish": "Culi Robusta"
  },
  {
    "english": "Erecta",
    "hindi": "इरेक्टा",
    "marathi": "इरेक्टा",
    "nepali": "ईक्सा",
    "spanish": "Erecta"
  },
  {
    "english": "Icatu",
    "hindi": "इकतू",
    "marathi": "आयकॅटू",
    "nepali": "परिचय",
    "spanish": "Icatu"
  },
  {
    "english": "Jasli",
    "hindi": "जसली",
    "marathi": "जसली",
    "nepali": "Jasli",
    "spanish": "Jasli"
  },
  {
    "english": "Kapeng Alamid",
    "hindi": "कापेंग एलामिद",
    "marathi": "कपेन्ग अलमिड",
    "nepali": "Kapegn alagemid",
    "spanish": "Kapeng Alamid"
  },
  {
    "english": "Kopi Luwak",
    "hindi": "कोपी ल्यूवक",
    "marathi": "कोपी लुवाक",
    "nepali": "कोपी Lawak",
    "spanish": "Kopi Luwak"
  },
  {
    "english": "Nemaya",
    "hindi": "नेमाया",
    "marathi": "निमाया",
    "nepali": "नेगेव",
    "spanish": "Nemaya"
  },
  {
    "english": "Nganda",
    "hindi": "नगांडा",
    "marathi": "नगांडा",
    "nepali": "एनजीन्डा",
    "spanish": "Nganda"
  },
  {
    "english": "Pandi",
    "hindi": "पंडी",
    "marathi": "पांडी",
    "nepali": "पांडी",
    "spanish": "Pandi"
  },
  {
    "english": "Pawi",
    "hindi": "पाव",
    "marathi": "पवी",
    "nepali": "पंकी",
    "spanish": "Pawi"
  },
  {
    "english": "Rakimin",
    "hindi": "रकीमिन",
    "marathi": "रकीमिन",
    "nepali": "मिनिन",
    "spanish": "Rakimin"
  },
  {
    "english": "Selection 1r",
    "hindi": "चयन 1 आर",
    "marathi": "निवड 1 आर",
    "nepali": "चयन 1r",
    "spanish": "Selección 1R"
  },
  {
    "english": "Selection 2r",
    "hindi": "चयन 2r",
    "marathi": "निवड 2 आर",
    "nepali": "चयन 2r",
    "spanish": "Selección 2R"
  },
  {
    "english": "Selection 3r",
    "hindi": "चयन 3r",
    "marathi": "निवड 3 आर",
    "nepali": "चयन 3r",
    "spanish": "Selección 3r"
  },
  {
    "english": "Sln 270",
    "hindi": "एसएलएन 270",
    "marathi": "एसएलएन 270",
    "nepali": "SLN 270",
    "spanish": "SLN 270"
  },
  {
    "english": "Sln 274",
    "hindi": "एसएलएन 274",
    "marathi": "एसएलएन 274",
    "nepali": "SLN 244",
    "spanish": "SLN 274"
  },
  {
    "english": "TR4",
    "hindi": "ट्रोपिक रेस 4",
    "marathi": "टीआर 4",
    "nepali": "गाडी पठाउनु",
    "spanish": "TR4"
  },
  {
    "english": "TR5",
    "hindi": "टीआर 5",
    "marathi": "टीआर 5",
    "nepali": "गाडी ल्याउनु",
    "spanish": "TR5"
  },
  {
    "english": "TR6",
    "hindi": "TR6",
    "marathi": "टीआर 6",
    "nepali": "डग गर्नु",
    "spanish": "TR6"
  },
  {
    "english": "TR7",
    "hindi": "टीआर 7",
    "marathi": "टीआर 7",
    "nepali": "ड्रिगको",
    "spanish": "TR7"
  },
  {
    "english": "TR8",
    "hindi": "टीआर 8",
    "marathi": "टीआर 8",
    "nepali": "त्रि 8",
    "spanish": "TR8"
  },
  {
    "english": "BP42",
    "hindi": "BP42",
    "marathi": "बीपी 42",
    "nepali": "BP42",
    "spanish": "BP42"
  },
  {
    "english": "BP234",
    "hindi": "BP234",
    "marathi": "बीपी 234",
    "nepali": "BP234",
    "spanish": "BP234"
  },
  {
    "english": "BP288",
    "hindi": "BP288",
    "marathi": "बीपी 288",
    "nepali": "BP288",
    "spanish": "BP288"
  },
  {
    "english": "BP358",
    "hindi": "BP358",
    "marathi": "बीपी 358",
    "nepali": "BP358",
    "spanish": "BP358"
  },
  {
    "english": "BP409",
    "hindi": "BP409",
    "marathi": "बीपी 409",
    "nepali": "BP409",
    "spanish": "BP409"
  },
  {
    "english": "SA237",
    "hindi": "SA237",
    "marathi": "SA237",
    "nepali": "सार 237",
    "spanish": "SA237"
  },
  {
    "english": "Wayanaad",
    "hindi": "वायानाद",
    "marathi": "वायनाड",
    "nepali": "वेनानाद",
    "spanish": "Wayanaad"
  },
  {
    "english": "Exelsa",
    "hindi": "एक्सेलसा",
    "marathi": "एक्सेल्सा",
    "nepali": "अतिफटाक्टा",
    "spanish": "Exelsa"
  },
  {
    "english": "Kape Barako",
    "hindi": "काप बाराको",
    "marathi": "कपे बराको",
    "nepali": "Kape बाराको",
    "spanish": "Kape Barako"
  },
  {
    "english": "Liberica",
    "hindi": "लिबरिका",
    "marathi": "लिबेरिका",
    "nepali": "लाइबेरी",
    "spanish": "Libérica"
  },
  {
    "english": "Sln288",
    "hindi": "SLN288",
    "marathi": "एसएलएन 288",
    "nepali": "SLN288",
    "spanish": "SLN288"
  },
  {
    "english": "Sln10",
    "hindi": "SLN10",
    "marathi": "एसएलएन 10",
    "nepali": "Sln10",
    "spanish": "SLN10"
  },
  {
    "english": "Abyssinia 3",
    "hindi": "एबिसिनिया 3",
    "marathi": "अ‍ॅबिसिनिया 3",
    "nepali": "Abysinia 3",
    "spanish": "Abisinia 3"
  },
  {
    "english": "Anacafe 14",
    "hindi": "एनाकाफे 14",
    "marathi": "अ‍ॅनाकाफे 14",
    "nepali": "AACAFEE 14",
    "spanish": "Anacafe 14"
  },
  {
    "english": "Arabusta",
    "hindi": "अरबस्टा",
    "marathi": "अरबस्टा",
    "nepali": "अबब्स्टना",
    "spanish": "Arabusta"
  },
  {
    "english": "Arla",
    "hindi": "अरला",
    "marathi": "अरला",
    "nepali": "अरुला",
    "spanish": "Arla"
  },
  {
    "english": "Ateng",
    "hindi": "अटेंग",
    "marathi": "अटेंग",
    "nepali": "Ateng",
    "spanish": "Ateng"
  },
  {
    "english": "Batian",
    "hindi": "बैटियन",
    "marathi": "बॅटियन",
    "nepali": "झुटो भाग",
    "spanish": "Batiano"
  },
  {
    "english": "Bogor Prada",
    "hindi": "बोगोर प्रादा",
    "marathi": "बोगोर प्रादा",
    "nepali": "बोगर प्रसा",
    "spanish": "Bogor Prada"
  },
  {
    "english": "Casiopea",
    "hindi": "कैसियोपिया",
    "marathi": "कॅसिओपिया",
    "nepali": "क्यासिपोटा",
    "spanish": "Casiopea"
  },
  {
    "english": "Castillo",
    "hindi": "कैस्टिलो",
    "marathi": "कॅस्टिलो",
    "nepali": "टोकुरो",
    "spanish": "Castillo"
  },
  {
    "english": "Castillo El Rosario",
    "hindi": "कैस्टिलो एल रोसारियो",
    "marathi": "कॅस्टिलो एल रोझारियो",
    "nepali": "टोस्टिनो एल रजारियोियो",
    "spanish": "Castillo el Rosario"
  },
  {
    "english": "Castillo El Tambo",
    "hindi": "कैस्टिलो एल टैम्बो",
    "marathi": "कॅस्टिलो एल टॅम्बो",
    "nepali": "टोस्टरियन एल तखो",
    "spanish": "Castillo el Tambo"
  },
  {
    "english": "Castillo La Trinidad",
    "hindi": "कैस्टिलो ला त्रिनिदाद",
    "marathi": "कॅस्टिलो ला त्रिनिदाद",
    "nepali": "टोस्टिनो ला ट्रिनडड",
    "spanish": "Castillo la Trinidad"
  },
  {
    "english": "Castillo Naranjal",
    "hindi": "कैस्टिलो नारंजल",
    "marathi": "कॅस्टिलो नरंजल",
    "nepali": "कास्टिलो नारानजल",
    "spanish": "Castillo Naranjal"
  },
  {
    "english": "Castillo Paraguaicito",
    "hindi": "कैस्टिलो पैरागुआसिटो",
    "marathi": "कॅस्टिलो पॅरागुआइसीटो",
    "nepali": "कास्टिनो परजीविटा",
    "spanish": "Castillo paraguaicito"
  },
  {
    "english": "Castillo Pueblo Bello",
    "hindi": "कैस्टिलो प्यूब्लो बेल्लो",
    "marathi": "कॅस्टिलो पुएब्लो बेलो",
    "nepali": "कास्टिनो puebloll Beoo",
    "spanish": "Castillo pueblo bello"
  },
  {
    "english": "Castillo Santa Barbara",
    "hindi": "कैस्टिलो सांता बारबरा",
    "marathi": "कॅस्टिलो सांता बार्बरा",
    "nepali": "कास्टिलो सान्ता बार्बेरा",
    "spanish": "Castillo Santa Bárbara"
  },
  {
    "english": "Catiga Mg2",
    "hindi": "कैटिगा mg2",
    "marathi": "कॅटिगा एमजी 2",
    "nepali": "क्याटागा mg2",
    "spanish": "Catiga mg2"
  },
  {
    "english": "Catigua",
    "hindi": "कैटिगुआ",
    "marathi": "कॅटिगुआ",
    "nepali": "बलवाहु",
    "spanish": "Catigua"
  },
  {
    "english": "Catimor",
    "hindi": "कैटिमर",
    "marathi": "कॅटिमोर",
    "nepali": "घामाखर एकावाह गर्नु",
    "spanish": "Cátedra"
  },
  {
    "english": "Catimor 129",
    "hindi": "कैटिमोर 129",
    "marathi": "कॅटिमोर 129",
    "nepali": "Chaimer 129",
    "spanish": "CATIMOR 129"
  },
  {
    "english": "Catimor F6.",
    "hindi": "कैटिमोर एफ 6।",
    "marathi": "कॅटिमोर एफ 6.",
    "nepali": "क्यामर F6।",
    "spanish": "CATIMOR F6."
  },
  {
    "english": "Catrenic",
    "hindi": "कैटेनिक",
    "marathi": "कॅटेनिक",
    "nepali": "क्यारेनिकिक",
    "spanish": "Catrríico"
  },
  {
    "english": "Catucai",
    "hindi": "कैटुकाई",
    "marathi": "कॅटुकाई",
    "nepali": "र्गcaि",
    "spanish": "Catucai"
  },
  {
    "english": "Centroamericano",
    "hindi": "सेंट्रैमेरिकानो",
    "marathi": "सेंट्रोमेरिकानो",
    "nepali": "सेन्ट्रोम्रीनो",
    "spanish": "Centroamericano"
  },
  {
    "english": "Colombia",
    "hindi": "कोलंबिया",
    "marathi": "कोलंबिया",
    "nepali": "कोलम्बिया",
    "spanish": "Colombia"
  },
  {
    "english": "Costa Rica 95 Aka Cr-95",
    "hindi": "कोस्टा रिका 95 उर्फ ​​सीआर -95",
    "marathi": "कोस्टा रिका 95 उर्फ ​​सीआर -95",
    "nepali": "कोस्टा RICA 95 Aka c- 95।",
    "spanish": "Costa Rica 95 también conocido como CR-95"
  },
  {
    "english": "Cr (Costa Rica) 95",
    "hindi": "सीआर (कोस्टा रिका) 95",
    "marathi": "सीआर (कोस्टा रिका) 95",
    "nepali": "CR (कोस्टा रिका) 95।",
    "spanish": "CR (Costa Rica) 95"
  },
  {
    "english": "Cuscatleco",
    "hindi": "कुस्केटेको",
    "marathi": "Cuscatleco",
    "nepali": "Cuscatleco",
    "spanish": "Cuscatleco"
  },
  {
    "english": "Devamachy",
    "hindi": "देवमाची",
    "marathi": "देवमाची",
    "nepali": "भवरोची",
    "spanish": "Devamachy"
  },
  {
    "english": "Evaluna",
    "hindi": "Evalununa",
    "marathi": "इव्हुना",
    "nepali": "मूल्यालोौ",
    "spanish": "Evaluación"
  },
  {
    "english": "Fronton",
    "hindi": "बंटवीं",
    "marathi": "फ्रॉन्टन",
    "nepali": "चाडको कपडा",
    "spanish": "Frontón"
  },
  {
    "english": "Gayo Satu",
    "hindi": "गयो सतू",
    "marathi": "गायो सातू",
    "nepali": "Gayo sha",
    "spanish": "Gayo satu"
  },
  {
    "english": "Hibrido De Timor",
    "hindi": "हाइब्रिडो डे तिमोर",
    "marathi": "Hibrido de तिमोर",
    "nepali": "Hibrido डेमोटो",
    "spanish": "Hibrido de Timor"
  },
  {
    "english": "Iapar 59",
    "hindi": "IAPAR 59",
    "marathi": "आयएपीएआर 59",
    "nepali": "Iapar 59",
    "spanish": "IAPAR 59"
  },
  {
    "english": "Icafe 95",
    "hindi": "ICAFE 95",
    "marathi": "आयकॅफ 95",
    "nepali": "ICAEFE 95",
    "spanish": "ICAFE 95"
  },
  {
    "english": "IHcafe 90",
    "hindi": "Ihcafe 90",
    "marathi": "IHCAFE 90",
    "nepali": "Ihchee 90 0",
    "spanish": "Ihcafe 90"
  },
  {
    "english": "Ipar 103",
    "hindi": "IPAR 103",
    "marathi": "आयपार 103",
    "nepali": "IPar 103",
    "spanish": "IPAR 103"
  },
  {
    "english": "Java",
    "hindi": "जावा",
    "marathi": "जावा",
    "nepali": "जावास",
    "spanish": "Java"
  },
  {
    "english": "Komasti",
    "hindi": "कोमास्टी",
    "marathi": "कोमास्टी",
    "nepali": "KOMASTI",
    "spanish": "Komasti"
  },
  {
    "english": "Lempira",
    "hindi": "लेमपिरा",
    "marathi": "लेम्पिरा",
    "nepali": "Leppra",
    "spanish": "Lempira"
  },
  {
    "english": "Limani",
    "hindi": "लिनी",
    "marathi": "लिमानी",
    "nepali": "लीएईई",
    "spanish": "Limani"
  },
  {
    "english": "Maracatu",
    "hindi": "माराकतु",
    "marathi": "मराकटू",
    "nepali": "मारातोु",
    "spanish": "Maracatu"
  },
  {
    "english": "Marsellesa",
    "hindi": "मार्सलेसा",
    "marathi": "मार्सेलेसा",
    "nepali": "हस्तमास्का",
    "spanish": "Marsellesa"
  },
  {
    "english": "Milenio",
    "hindi": "मिलेनियो",
    "marathi": "मिलेनियो",
    "nepali": "मांसनायो",
    "spanish": "Milenio"
  },
  {
    "english": "Mundo Maya",
    "hindi": "मुंडो माया",
    "marathi": "मुंडो माया",
    "nepali": "मुन्डो माया",
    "spanish": "Mundo Maya"
  },
  {
    "english": "Nayarita",
    "hindi": "नयरिता",
    "marathi": "नायरिता",
    "nepali": "नायकटिता",
    "spanish": "Nayarita"
  },
  {
    "english": "Nemaya",
    "hindi": "नेमाया",
    "marathi": "निमाया",
    "nepali": "नेगेव",
    "spanish": "Nemaya"
  },
  {
    "english": "Obata",
    "hindi": "ओबेटा",
    "marathi": "ओबाटा",
    "nepali": "रगत",
    "spanish": "Obata"
  },
  {
    "english": "Obata Rojo",
    "hindi": "ओबटा रोजो",
    "marathi": "ओबाटा रोजो",
    "nepali": "OBA भर रोजो",
    "spanish": "Obata Rojo"
  },
  {
    "english": "Oro Azteca",
    "hindi": "ओरो एज़्टेका",
    "marathi": "ओरो अझ्टेका",
    "nepali": "ओरो अजेटे",
    "spanish": "Oro azteca"
  },
  {
    "english": "Parainema",
    "hindi": "परानीमा",
    "marathi": "पॅरिनेमा",
    "nepali": "अर्थेनीमा",
    "spanish": "Parainema"
  },
  {
    "english": "Paraiso",
    "hindi": "पैरासो",
    "marathi": "पॅरिसो",
    "nepali": "पर्दागो",
    "spanish": "Paraíso"
  },
  {
    "english": "Rab C15",
    "hindi": "RAB C15",
    "marathi": "रॅब सी 15",
    "nepali": "BAR C15",
    "spanish": "Rab C15"
  },
  {
    "english": "Rambung",
    "hindi": "रामबंग",
    "marathi": "रॅमबंग",
    "nepali": "रम्बु ng",
    "spanish": "Rambung"
  },
  {
    "english": "Rasuna",
    "hindi": "रसुना",
    "marathi": "रसुना",
    "nepali": "रसीना",
    "spanish": "Rasuna"
  },
  {
    "english": "S.12 Kaffa",
    "hindi": "S.12 काफा",
    "marathi": "एस .१२ काफा",
    "nepali": "S.12 Kaffa",
    "spanish": "S.12 Kaffa"
  },
  {
    "english": "Sarchimor",
    "hindi": "सरचिमोर",
    "marathi": "सारर्चीमर",
    "nepali": "अफश",
    "spanish": "Sarchimor"
  },
  {
    "english": "Sigarar Utang",
    "hindi": "सिगारर यूटंग",
    "marathi": "सिगरार उटांग",
    "nepali": "SIGARALE TETANG",
    "spanish": "Sigarros utang"
  },
  {
    "english": "Starmaya",
    "hindi": "स्टैमाया",
    "marathi": "स्टर्माया",
    "nepali": "स्टारमाया",
    "spanish": "Starmaya"
  },
  {
    "english": "T5175",
    "hindi": "T5175",
    "marathi": "टी 5175",
    "nepali": "T5175",
    "spanish": "T5175"
  },
  {
    "english": "T5296",
    "hindi": "T5296",
    "marathi": "टी 5296",
    "nepali": "T55296",
    "spanish": "T5296"
  },
  {
    "english": "T8667",
    "hindi": "T8667",
    "marathi": "टी 8667",
    "nepali": "T8667",
    "spanish": "T8667"
  },
  {
    "english": "Tabi",
    "hindi": "तबी",
    "marathi": "तबी",
    "nepali": "ताई",
    "spanish": "Tabi"
  },
  {
    "english": "Timor",
    "hindi": "तिमोर",
    "marathi": "तिमोर",
    "nepali": "तिमोथी",
    "spanish": "Timor"
  },
  {
    "english": "Tupi",
    "hindi": "टूपी",
    "marathi": "तुपी",
    "nepali": "तिफी",
    "spanish": "Tupi"
  },
  {
    "english": "Variedad Colombia",
    "hindi": "वरिडेड कोलम्बिया",
    "marathi": "व्हेरिडड कोलंबिया",
    "nepali": "विविध आयम्बिया",
    "spanish": "VariDad Colombia"
  },
  {
    "english": "Hybrid",
    "hindi": "हाइब्रिड",
    "marathi": "संकरित",
    "nepali": "Usbbrid",
    "spanish": "Híbrido"
  },
  {
    "english": "Pacamara",
    "hindi": "पैकमारा",
    "marathi": "Pacamara",
    "nepali": "पकेदा",
    "spanish": "Pacamara"
  },
  {
    "english": "Bourbon",
    "hindi": "बर्बन",
    "marathi": "बोर्बन",
    "nepali": "Brarbnty",
    "spanish": "Borbón"
  },
  {
    "english": "Typica",
    "hindi": "टाइपिका",
    "marathi": "टायपिका",
    "nepali": "टाइटाइ",
    "spanish": "Típica"
  },
  {
    "english": "Liberica",
    "hindi": "लिबरिका",
    "marathi": "लिबेरिका",
    "nepali": "लाइबेरी",
    "spanish": "Libérica"
  },
  {
    "english": "Robusta",
    "hindi": "रोबस्टा",
    "marathi": "रोबस्टा",
    "nepali": "विपरीत",
    "spanish": "Robusta"
  },
  {
    "english": "Arabica",
    "hindi": "अरेबिक",
    "marathi": "अरबीका",
    "nepali": "अरबीए",
    "spanish": "Árábica"
  },
  {
    "english": "Gamal (Gliricidia sepium)",
    "hindi": "गमल (ग्लिरिसिडिया सेपियम)",
    "marathi": "गॅमल (ग्लिरिसिडिया सेपियम)",
    "nepali": "ग्वाल (ग्लोरिरिडिडिया सेमिशिया)",
    "spanish": "Gamal (Gliricidia sepium)"
  },
  {
    "english": "Dadap (Eurythrina lithosperma)",
    "hindi": "दादप (यूरीथ्रिना लिथोस्पर्मा)",
    "marathi": "दादाप (युरीथ्रिना लिथोस्पर्मा)",
    "nepali": "पिडप (Erythtrina lithosperma)",
    "spanish": "DADAP (Eurythrina Lithosperma)"
  },
  {
    "english": "Sengon laut (Albizzia falcata)",
    "hindi": "सेंगोन लुट (अल्बिज़िया फालकाटा)",
    "marathi": "सेन्गॉन लॉट (अल्बिझिया फाल्काटा)",
    "nepali": "सेन्गोन लात (अल्बेझीज फाल्कटा)",
    "spanish": "Sengon Laut (Albizzia Falcata)"
  },
  {
    "english": "Lamtoro (Leucaena glauca)",
    "hindi": "लामटोरो (ल्यूकेना ग्लौका)",
    "marathi": "लॅमटोरो (ल्युकाएना ग्लूका)",
    "nepali": "लामाटोर (लेक्येना ग्लोूका)",
    "spanish": "Lamtoro (Leucaena Glauca)"
  },
  {
    "english": "Gamal (Glirisidia)",
    "hindi": "गमल (ग्लिरिसिडिया)",
    "marathi": "गॅमल (ग्लिरिसिडिया)",
    "nepali": "Gaual (ग्लोरिसिडिया)",
    "spanish": "Gamal (glirisidia)"
  },
  {
    "english": "Gamal (Gliricidia sepium)",
    "hindi": "गमल (ग्लिरिसिडिया सेपियम)",
    "marathi": "गॅमल (ग्लिरिसिडिया सेपियम)",
    "nepali": "ग्वाल (ग्लोरिरिडिडिया सेमिशिया)",
    "spanish": "Gamal (Gliricidia sepium)"
  },
  {
    "english": "Alpukat (Persea americana)",
    "hindi": "अल्पुकात (पर्सिया अमेरिकाना)",
    "marathi": "अल्पुकत (पर्सिया अमेरिकाना)",
    "nepali": "अल्पाकट (कोसिस अमेरी)",
    "spanish": "Alpukat (Persea Americana)"
  },
  {
    "english": "Pinus (hard pines)",
    "hindi": "पिनस (हार्ड पाइंस)",
    "marathi": "पिनस (हार्ड पाइन्स)",
    "nepali": "पिनस (कडा पाइन्स)",
    "spanish": "Pinus (pinos duros)"
  },
  {
    "english": "Wind Breaker Tree 1",
    "hindi": "विंड ब्रेकर ट्री 1",
    "marathi": "वारा ब्रेकर ट्री 1",
    "nepali": "हावा ब्रेकर रूख 1",
    "spanish": "Árbol de interruptores de viento 1"
  },
  {
    "english": "Kayumanis",
    "hindi": "कयुमनिस",
    "marathi": "कायमानिस",
    "nepali": "कायामनिसिस",
    "spanish": "Kayumanis"
  },
  {
    "english": "Karet",
    "hindi": "रब्बर",
    "marathi": "कारेट",
    "nepali": "कयरिट",
    "spanish": "Cajón"
  },
  {
    "english": "Kelapa",
    "hindi": "केलापा",
    "marathi": "केलापा",
    "nepali": "किंगापा",
    "spanish": "Kelapa"
  },
  {
    "english": "Damar",
    "hindi": "दामार",
    "marathi": "दामार",
    "nepali": "मन्द मुर",
    "spanish": "Damar"
  },
  {
    "english": "Belimbing",
    "hindi": "धूर्तता",
    "marathi": "बेलिमिंग",
    "nepali": "बेलबि।",
    "spanish": "Belimbing"
  }
]



module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log(jsonData, "jsonData")

      let langaugeObjects = jsonData.map(el => {
        el.createdAt= moment.utc().format("YYYY-MM-DD HH:mm:ss")
        el.updatedAt= moment.utc().format("YYYY-MM-DD HH:mm:ss")

        return el
      })

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
