'use strict';
const path = require("path");
const moment = require("moment")

let jsonData = [
  {
    "english": "Typica (Bergandal, Sidikalang - Sumatera).",
    "hindi": "टिपिका (बेर्गेन्डल, सिदिकालाङ्ग - सुमातेरा)",
    "marathi": "टायपिका (बर्गंडल, सिडिकलांग - सुमतेरा).",
    "nepali": "टिपिका (बेर्गेन्डल, सिदिकालाङ्ग - सुमातेरा)",
    "spanish": "Typica (Bergandal, Sidikalang - Sumatera): Typica (Bergandal, Sidikalang - Sumatera)"
  },
  {
    "english": "Hibrido de Timor (HDT, Cross breed Arabica-Robusta; Tim-tim, Aceh)",
    "hindi": "हिब्रिडो डे तिमोर (एचडीटी, अरबिका-रोबुस्टा सङ्क्रमण; टिम-टिम, अचेह)",
    "marathi": "हिब्रिडो डी तिमोर (एचडीटी, क्रॉस ब्रीड अरबीका-रोबस्टा; टिम-टिम, आचे)",
    "nepali": "हिब्रिडो डे तिमोर (एचडीटी, अरबिका-रोबुस्टा सङ्क्रमण; टिम-टिम, अचेह)",
    "spanish": "Híbrido de Timor (HDT, cruce entre Arábica y Robusta; Tim-tim, Aceh)"
  },
  {
    "english": "Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)",
    "hindi": "लाइनी एस (एस-२८८, एस-७९५, आन्दुङ्गसरी, कोमास्टी; अचेह, फ्लोरेस)",
    "marathi": "लीनी एस (एस -288, एस -795,, नुंगसारी, कोमास्टी; आचे, फ्लोरेस)",
    "nepali": "लाइनी एस (एस-२८८, एस-७९५, आन्दुङ्गसरी, कोमास्टी; अचेह, फ्लोरेस)",
    "spanish": "Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)"
  },
  {
    "english": "Ethiopian lines (Rambung Abyssina, USDA)",
    "hindi": "इथियोपियन लाइनहरू (रम्बुङ एबिसिना, यूएसडीए)",
    "marathi": "इथिओपियन लाईन्स (रॅमबंग अबिसिना, यूएसडीए)",
    "nepali": "इथियोपियन लाइनहरू (रम्बुङ एबिसिना, यूएसडीए)",
    "spanish": "Líneas etíopes (Rambung Abyssina, USDA)"
  },
  {
    "english": "Mundo Nova (Silang Typica-Bourbon, from Brazil)",
    "hindi": "मुण्डो नोवा (सिलाङ्ग टिपिका-बोरबन, ब्राजिलबाट)",
    "marathi": "मुंडो नोव्हा (सिलांग टायपिका-बोर्बन, ब्राझीलहून)",
    "nepali": "मुण्डो नोवा (सिलाङ्ग टिपिका-बोरबन, ब्राजिलबाट)",
    "spanish": "Mundo Nova (Silang Typica-Bourbon, de Brasil)"
  },
  {
    "english": "Catimor Lines (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - mix breed arabica-robusta).",
    "hindi": "कातिमोर लाइनहरू (आन्दुङ्गसरी, आटेङ, जालुक, कार्तिका/कातुई/कटाई - अरबिका-रोबुस्टा मिश्रण)",
    "marathi": "कॅटिमोर लाईन्स (नुंगसारी, अटेंग, जलक, कार्तिका/कॅटुई/कटाई - मिक्स ब्रीड अरबीका -रोबस्टा).",
    "nepali": "कातिमोर लाइनहरू (आन्दुङ्गसरी, आटेङ, जालुक, कार्तिका/कातुई/कटाई - अरबिका-रोबुस्टा मिश्रण)",
    "spanish": "Líneas de Catimor (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - mezcla de arábica-robusta)"
  },
  {
    "english": "Amarello De Botucatu",
    "hindi": "अमारेलो डे बोटुकाटु",
    "marathi": "अमरेल्लो डी बोटुकाटू",
    "nepali": "अमारेलो डे बोटुकाटु",
    "spanish": "Amarello De Botucatu"
  },
  {
    "english": "Benguet",
    "hindi": "बेङ्गेट",
    "marathi": "बेंगुएट",
    "nepali": "बेङ्गेट",
    "spanish": "Benguet"
  },
  {
    "english": "Bergendal",
    "hindi": "बेर्गेन्डल",
    "marathi": "बर्गेन्डल",
    "nepali": "बेर्गेन्डल",
    "spanish": "Bergendal"
  },
  {
    "english": "Bergundal Aka Garundang",
    "hindi": "बेर्गुण्डल अका गरुन्डाङ",
    "marathi": "बर्गंडल उर्फ ​​गारुंडांग",
    "nepali": "बेर्गुण्डल अका गरुन्डाङ",
    "spanish": "Bergundal Aka Garundang"
  },
  {
    "english": "Bmj",
    "hindi": "बिएम्जे",
    "marathi": "बीएमजे",
    "nepali": "बिएम्जे",
    "spanish": "Bmj"
  },
  {
    "english": "Boubon Mayaguez 71",
    "hindi": "बोउबन मयागुएज ७१",
    "marathi": "बाउबन मायागेझ 71",
    "nepali": "बोउबन मयागुएज ७१",
    "spanish": "Boubon Mayaguez 71"
  },
  {
    "english": "Bourbon",
    "hindi": "बोरबन",
    "marathi": "बोर्बन",
    "nepali": "बोरबन",
    "spanish": "Bourbon"
  },
  {
    "english": "Bourbon Chocolá",
    "hindi": "बोरबन चोकोला",
    "marathi": "बोर्बन चॉकोल",
    "nepali": "बोरबन चोकोला",
    "spanish": "Bourbon Chocolá"
  },
  {
    "english": "Bourbon Mayaguez 139",
    "hindi": "बोरबन मयागुएज १३९",
    "marathi": "बोर्बन मायाग्झ 139",
    "nepali": "बोरबन मयागुएज १३९",
    "spanish": "Bourbon Mayaguez 139"
  },
  {
    "english": "Bourbon Mayaguez 71",
    "hindi": "बोरबन मयागुएज ७१",
    "marathi": "बोर्बन मायाग्झ 71",
    "nepali": "बोरबन मयागुएज ७१",
    "spanish": "Bourbon Mayaguez 71"
  },
  {
    "english": "Catuai",
    "hindi": "कातुई",
    "marathi": "कॅटुई",
    "nepali": "कातुई",
    "spanish": "Catuai"
  },
  {
    "english": "Chickumalgur",
    "hindi": "चिक्कुमलगुर",
    "marathi": "चिकमलगूर",
    "nepali": "चिक्कुमलगुर",
    "spanish": "Chickumalgur"
  },
  {
    "english": "Criollo",
    "hindi": "क्रियोलो",
    "marathi": "क्रिओलो",
    "nepali": "क्रियोलो",
    "spanish": "Criollo"
  },
  {
    "english": "Culi Arabica",
    "hindi": "कुली अरबिका",
    "marathi": "कुली अरबीका",
    "nepali": "कुली अरबिका",
    "spanish": "Culi Arabica"
  },
  {
    "english": "Djimma",
    "hindi": "जिम्मा",
    "marathi": "Djimma",
    "nepali": "जिम्मा",
    "spanish": "Djimma"
  },
  {
    "english": "Iapar59",
    "hindi": "इयापर ५९",
    "marathi": "आयएपीएआर 59",
    "nepali": "इयापर ५९",
    "spanish": "Iapar59"
  },
  {
    "english": "Ibairi",
    "hindi": "इबैरी",
    "marathi": "इबैरी",
    "nepali": "इबैरी",
    "spanish": "Ibairi"
  },
  {
    "english": "Jember/S795",
    "hindi": "जेम्बर/एस७९५",
    "marathi": "जेम्बर/एस 795",
    "nepali": "जेम्बर/एस७९५",
    "spanish": "Jember/S795"
  },
  {
    "english": "K20",
    "hindi": "के२०",
    "marathi": "के 20",
    "nepali": "के२०",
    "spanish": "K20"
  },
  {
    "english": "Kalossi",
    "hindi": "कालोस्सी",
    "marathi": "कालोसी",
    "nepali": "कालोस्सी",
    "spanish": "Kalossi"
  },
  {
    "english": "Kp423",
    "hindi": "केपी ४२३",
    "marathi": "केपी 423",
    "nepali": "केपी ४२३",
    "spanish": "Kp423"
  },
  {
    "english": "Lintong",
    "hindi": "लिन्टोङ",
    "marathi": "लिंटोंग",
    "nepali": "लिन्टोङ",
    "spanish": "Lintong"
  },
  {
    "english": "Nyasaland",
    "hindi": "न्यासाल्यान्ड",
    "marathi": "न्यासालँड",
    "nepali": "न्यासाल्यान्ड",
    "spanish": "Nyasaland"
  },
  {
    "english": "Ouro Bronze",
    "hindi": "ओरो ब्रोन्ज",
    "marathi": "Brow कांस्य",
    "nepali": "ओरो ब्रोन्ज",
    "spanish": "Ouro Bronze"
  },
  {
    "english": "Ouro Verde",
    "hindi": "ओरो भेर्डे",
    "marathi": "Urodo verde",
    "nepali": "ओरो भेर्डे",
    "spanish": "Ouro Verde"
  },
  {
    "english": "Pluma Hidalgo",
    "hindi": "प्लुमा हिदाल्गो",
    "marathi": "प्लुमा हिडाल्गो",
    "nepali": "प्लुमा हिदाल्गो",
    "spanish": "Pluma Hidalgo"
  },
  {
    "english": "Pop3303/21",
    "hindi": "पोप३३०३/२१",
    "marathi": "POP3303/21",
    "nepali": "पोप३३०३/२१",
    "spanish": "Pop3303/21"
  },
  {
    "english": "Semperflorens",
    "hindi": "सेम्पर्फ्लोरेन्स",
    "marathi": "Semperfloren",
    "nepali": "सेम्पर्फ्लोरेन्स",
    "spanish": "Semperflorens"
  },
  {
    "english": "Sidikalang",
    "hindi": "सिदिकालाङ्ग",
    "marathi": "सिडिकलांग",
    "nepali": "सिदिकालाङ्ग",
    "spanish": "Sidikalang"
  },
  {
    "english": "Sl14",
    "hindi": "एसएल१४",
    "marathi": "एसएल 14",
    "nepali": "एसएल१४",
    "spanish": "Sl14"
  },
  {
    "english": "Sumatra Lintong",
    "hindi": "सुमात्रा लिन्टोङ",
    "marathi": "सुमात्रा लिंटोंग",
    "nepali": "सुमात्रा लिन्टोङ",
    "spanish": "Sumatra Lintong"
  },
  {
    "english": "Usda762",
    "hindi": "यूएसडीए ७६२",
    "marathi": "यूएसडीए 762",
    "nepali": "यूएसडीए ७६२",
    "spanish": "Usda762"
  },
  {
    "english": "Villalobos",
    "hindi": "विलालोबोस",
    "marathi": "व्हिलालोबोस",
    "nepali": "विलालोबोस",
    "spanish": "Villalobos"
  },
  {
    "english": "Walichu/ Wolisho",
    "hindi": "वालिचु/वोलिशो",
    "marathi": "वालिचू/ वोलिशो",
    "nepali": "वालिचु/वोलिशो",
    "spanish": "Walichu/Wolisho"
  },
  {
    "english": "Yirgacheffe",
    "hindi": "यिर्गाचेफ्फे",
    "marathi": "येरगाचेफ",
    "nepali": "यिर्गाचेफ्फे",
    "spanish": "Yirgacheffe"
  },
  {
    "english": "Catimor (hybrid of Caturra x Timor)",
    "hindi": "कातिमोर (केटुर्रा x तिमोरको मिश्रण)",
    "marathi": "कॅटिमोर (कॅटुर्रा एक्स तिमोरचा संकर)",
    "nepali": "कातिमोर (केटुर्रा x तिमोरको मिश्रण)",
    "spanish": "Catimor (híbrido de Caturra x Timor)"
  },
  {
    "english": "Jawa (Java Coffee, !700AD)",
    "hindi": "जावा (जाभा कफी, १७००ए.डी.)",
    "marathi": "जावा (जावा कॉफी,! 700 एडी)",
    "nepali": "जावा (जाभा कफी, १७००ए.डी.)",
    "spanish": "Jawa (Café Java, 700 dC)"
  },
  {
    "english": "Arabusta (HDT; Hibrid of sterile CArabica and C.Robusta)",
    "hindi": "अराबुस्टा (एचडीटी; निष्क्रिय काराबिका र कारारोबुस्टाको हाइब्रिड)",
    "marathi": "अरबस्टा (एचडीटी; निर्जंतुकीकरण कॅरेबिका आणि सी. रोबस्टाचे हिब्रिड)",
    "nepali": "अराबुस्टा (एचडीटी; निष्क्रिय काराबिका र कारारोबुस्टाको हाइब्रिड)",
    "spanish": "Arabusta (HDT; híbrido de estéril CArabica y CRobusta)"
  },
  {
    "english": "Brs 1216",
    "hindi": "बीआरएस १२१६",
    "marathi": "बीआरएस 1216",
    "nepali": "बीआरएस १२१६",
    "spanish": "Brs 1216"
  },
  {
    "english": "Brs 2336",
    "hindi": "बीआरएस २३३६",
    "marathi": "बीआरएस 2336",
    "nepali": "बीआरएस २३३६",
    "spanish": "Brs 2336"
  },
  {
    "english": "Brs 3210",
    "hindi": "बीआरएस ३२१०",
    "marathi": "बीआरएस 3210",
    "nepali": "बीआरएस ३२१०",
    "spanish": "Brs 3210"
  },
  {
    "english": "Brs 3213",
    "hindi": "बीआरएस ३२१३",
    "marathi": "बीआरएस 3213",
    "nepali": "बीआरएस ३२१३",
    "spanish": "Brs 3213"
  },
  {
    "english": "Culi Robusta",
    "hindi": "कुली रोबुस्टा",
    "marathi": "कुली रोबस्टा",
    "nepali": "कुली रोबुस्टा",
    "spanish": "Culi Robusta"
  },
  {
    "english": "Jasli",
    "hindi": "जास्ली",
    "marathi": "जसली",
    "nepali": "जास्ली",
    "spanish": "Jasli"
  },
  {
    "english": "Kapeng Alamid",
    "hindi": "कापेंग आलामिद",
    "marathi": "कपेन्ग अलमिड",
    "nepali": "कापेंग आलामिद",
    "spanish": "Kapeng Alamid"
  },
  {
    "english": "Kopi Luwak",
    "hindi": "कोपी लुवाक",
    "marathi": "कोपी लुवाक",
    "nepali": "कोपी लुवाक",
    "spanish": "Kopi Luwak"
  },
  {
    "english": "Selection 1r",
    "hindi": "सेलेक्सन १र",
    "marathi": "निवड 1 आर",
    "nepali": "सेलेक्सन १र",
    "spanish": "Selección 1r"
  },
  {
    "english": "Selection 2r",
    "hindi": "सेलेक्सन २र",
    "marathi": "निवड 2 आर",
    "nepali": "सेलेक्सन २र",
    "spanish": "Selección 2r"
  },
  {
    "english": "Selection 3r",
    "hindi": "सेलेक्सन ३र",
    "marathi": "निवड 3 आर",
    "nepali": "सेलेक्सन ३र",
    "spanish": "Selección 3r"
  },
  {
    "english": "Sln 270",
    "hindi": "एसएलएन २७०",
    "marathi": "एसएलएन 270",
    "nepali": "एसएलएन २७०",
    "spanish": "Sln 270"
  },
  {
    "english": "Sln 274",
    "hindi": "एसएलएन २७४",
    "marathi": "एसएलएन 274",
    "nepali": "एसएलएन २७४",
    "spanish": "Sln 274"
  },
  {
    "english": "BP42",
    "hindi": "बिपी ४२",
    "marathi": "बीपी 42",
    "nepali": "बिपी ४२",
    "spanish": "BP42"
  },
  {
    "english": "BP234",
    "hindi": "बिपी २३४",
    "marathi": "बीपी 234",
    "nepali": "बिपी २३४",
    "spanish": "BP234"
  },
  {
    "english": "BP288",
    "hindi": "बिपी २८८",
    "marathi": "बीपी 288",
    "nepali": "बिपी २८८",
    "spanish": "BP288"
  },
  {
    "english": "BP358",
    "hindi": "बिपी ३५८",
    "marathi": "बीपी 358",
    "nepali": "बिपी ३५८",
    "spanish": "BP358"
  },
  {
    "english": "BP409",
    "hindi": "बिपी ४०९",
    "marathi": "बीपी 409",
    "nepali": "बिपी ४०९",
    "spanish": "BP409"
  },
  {
    "english": "Kape Barako",
    "hindi": "कापे बाराको",
    "marathi": "कपे बराको",
    "nepali": "कापे बाराको",
    "spanish": "Kape Barako"
  },
  {
    "english": "Sln288",
    "hindi": "एसएलएन २८८",
    "marathi": "एसएलएन 288",
    "nepali": "एसएलएन २८८",
    "spanish": "Sln288"
  },
  {
    "english": "Sln10",
    "hindi": "एसएलएन १०",
    "marathi": "एसएलएन 10",
    "nepali": "एसएलएन १०",
    "spanish": "Sln10"
  },
  {
    "english": "Abyssinia 3",
    "hindi": "अबिसिनिया ३",
    "marathi": "अ‍ॅबिसिनिया 3",
    "nepali": "अबिसिनिया ३",
    "spanish": "Abyssinia 3"
  },
  {
    "english": "Anacafe 14",
    "hindi": "आनाकाफे १४",
    "marathi": "अ‍ॅनाकाफे 14",
    "nepali": "आनाकाफे १४",
    "spanish": "Anacafe 14"
  },
  {
    "english": "Ateng",
    "hindi": "आटेङ",
    "marathi": "अटेंग",
    "nepali": "आटेङ",
    "spanish": "Ateng"
  },
  {
    "english": "Castillo Pueblo Bello",
    "hindi": "कास्टिलो पुएब्लो",
    "marathi": "कॅस्टिलो पुएब्लो बेलो",
    "nepali": "कास्टिलो पुएब्लो",
    "spanish": "Castillo Pueblo Bello"
  },
  {
    "english": "Catiga Mg2",
    "hindi": "काटिगा एमजी२",
    "marathi": "कॅटिगा एमजी 2",
    "nepali": "काटिगा एमजी२",
    "spanish": "Catiga Mg2"
  },
  {
    "english": "Catimor 129",
    "hindi": "कातिमोर १२९",
    "marathi": "कॅटिमोर 129",
    "nepali": "कातिमोर १२९",
    "spanish": "Catimor 129"
  },
  {
    "english": "Catimor F6.",
    "hindi": "कातिमोर एफ६",
    "marathi": "कॅटिमोर एफ 6.",
    "nepali": "कातिमोर एफ६",
    "spanish": "Catimor F6"
  },
  {
    "english": "Catucai",
    "hindi": "काटुकाई",
    "marathi": "कॅटुकाई",
    "nepali": "काटुकाई",
    "spanish": "Catucai"
  },
  {
    "english": "Costa Rica 95 Aka Cr-95",
    "hindi": "कोस्टा रिका ९५ अका सीआर-९५",
    "marathi": "कोस्टा रिका 95 उर्फ ​​सीआर -95",
    "nepali": "कोस्टा रिका ९५ अका सीआर-९५",
    "spanish": "Costa Rica 95, también conocido como Cr-95"
  },
  {
    "english": "Cr (Costa Rica) 95",
    "hindi": "सीआर (कोस्टा रिका) ९५",
    "marathi": "सीआर (कोस्टा रिका) 95",
    "nepali": "सीआर (कोस्टा रिका) ९५",
    "spanish": "Cr (Costa Rica) 95"
  },
  {
    "english": "Cuscatleco",
    "hindi": "कुस्काट्लेको",
    "marathi": "Cuscatleco",
    "nepali": "कुस्काट्लेको",
    "spanish": "Cuscatleco"
  },
  {
    "english": "Gayo Satu",
    "hindi": "गायो सातु",
    "marathi": "गायो सातू",
    "nepali": "गायो सातु",
    "spanish": "Gayo Satu"
  },
  {
    "english": "Hibrido De Timor",
    "hindi": "हिब्रिडो डे तिमोर",
    "marathi": "Hibrido de तिमोर",
    "nepali": "हिब्रिडो डे तिमोर",
    "spanish": "Híbrido De Timor"
  },
  {
    "english": "Iapar 59",
    "hindi": "इयापर ५९",
    "marathi": "आयएपीएआर 59",
    "nepali": "इयापर ५९",
    "spanish": "Iapar 59"
  },
  {
    "english": "Icafe 95",
    "hindi": "इकाफे ९५",
    "marathi": "आयकॅफ 95",
    "nepali": "इकाफे ९५",
    "spanish": "Icafe 95"
  },
  {
    "english": "IHcafe 90",
    "hindi": "आइएचकाफे ९०",
    "marathi": "IHCAFE 90",
    "nepali": "आइएचकाफे ९०",
    "spanish": "IHcafe 90"
  },
  {
    "english": "Ipar 103",
    "hindi": "इपार १०३",
    "marathi": "आयपार 103",
    "nepali": "इपार १०३",
    "spanish": "Ipar 103"
  },
  {
    "english": "Komasti",
    "hindi": "कोमास्ती",
    "marathi": "कोमास्टी",
    "nepali": "कोमास्ती",
    "spanish": "Komasti"
  },
  {
    "english": "Lempira",
    "hindi": "लेम्पिरा",
    "marathi": "लेम्पिरा",
    "nepali": "लेम्पिरा",
    "spanish": "Lempira"
  },
  {
    "english": "Obata Rojo",
    "hindi": "ओबाटा रोजो",
    "marathi": "ओबाटा रोजो",
    "nepali": "ओबाटा रोजो",
    "spanish": "Obata Rojo"
  },
  {
    "english": "Rab C15",
    "hindi": "रेब सी१५",
    "marathi": "रॅब सी 15",
    "nepali": "रेब सी१५",
    "spanish": "Rab C15"
  },
  {
    "english": "Rambung",
    "hindi": "राम्बुंग",
    "marathi": "रॅमबंग",
    "nepali": "राम्बुंग",
    "spanish": "Rambung"
  },
  {
    "english": "S.12 Kaffa",
    "hindi": "एस.१२ काफ्फा",
    "marathi": "एस .१२ काफा",
    "nepali": "एस.१२ काफ्फा",
    "spanish": "S12 Kaffa"
  },
  {
    "english": "Sigarar Utang",
    "hindi": "सिगारार उताङ",
    "marathi": "सिगरार उटांग",
    "nepali": "सिगारार उताङ",
    "spanish": "Sigarar Utang"
  },
  {
    "english": "T5175",
    "hindi": "टी५१७५",
    "marathi": "टी 5175",
    "nepali": "टी५१७५",
    "spanish": "T5175"
  },
  {
    "english": "T5296",
    "hindi": "टी५२९६",
    "marathi": "टी 5296",
    "nepali": "टी५२९६",
    "spanish": "T5296"
  },
  {
    "english": "T8667",
    "hindi": "टी८६६७",
    "marathi": "टी 8667",
    "nepali": "टी८६६७",
    "spanish": "T8667"
  },
  {
    "english": "Hybrid",
    "hindi": "हाइब्रिड",
    "marathi": "संकरित",
    "nepali": "हाइब्रिड",
    "spanish": "Hibrido"
  },
  {
    "english": "Bourbon",
    "hindi": "बोरबन",
    "marathi": "बोर्बन",
    "nepali": "बोरबन",
    "spanish": "Bourbon"
  },
  {
    "english": "Dadap (Eurythrina lithosperma)",
    "hindi": "ददप (युरिथ्रिना लिथोस्पर्मा)",
    "marathi": "दादाप (युरीथ्रिना लिथोस्पर्मा)",
    "nepali": "ददप (युरिथ्रिना लिथोस्पर्मा)",
    "spanish": "Dadap (Eurythrina lithosperma)"
  },
  {
    "english": "Gamal (Glirisidia)",
    "hindi": "गामल (ग्लिरिसिडिया)",
    "marathi": "गॅमल (ग्लिरिसिडिया)",
    "nepali": "गामल (ग्लिरिसिडिया)",
    "spanish": "Gamal (Glirisidia)"
  }
]

let deleteWhereIn = []
jsonData.forEach(el => {
  deleteWhereIn.push(el.english)
})



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
        {english: deleteWhereIn},
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
