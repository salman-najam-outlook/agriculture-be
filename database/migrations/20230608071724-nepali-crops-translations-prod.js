'use strict';
const moment = require('moment');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        "English": "Agrifound Dark Red",
        "Nepali": "एग्रीफाउंड डार्क रेड"
      },
      {
        "English": "Agrifound Light Red",
        "Nepali": "एग्रीफाउंड लाइट रेड"
      },
      {
        "English": "Agrifound Red",
        "Nepali": "एग्रीफाउंड रेड"
      },
      {
        "English": "Agrifound Rose",
        "Nepali": "एग्रीफाउंड रोज"
      },
      {
        "English": "Agrifound White",
        "Nepali": "एग्रीफाउंड सेतो"
      },
      {
        "English": "Arad-H",
        "Nepali": "एराड-एच"
      },
      {
        "English": "Arka Bheem",
        "Nepali": "अर्टक बित्रामक"
      },
      {
        "English": "Arka Bindu",
        "Nepali": "अर्खा विन्दु"
      },
      {
        "English": "Arka Kalyan",
        "Nepali": "अर्क कल्याण"
      },
      {
        "English": "Arka Kihriman",
        "Nepali": "अर्खा किहिनेण"
      },
      {
        "English": "Arka Kirtinaan",
        "Nepali": "अर्खा किर्तिनान"
      },
      {
        "English": "Arka Lalima",
        "Nepali": "अरुखा लामाना"
      },
      {
        "English": "Arka Niketan",
        "Nepali": "अर्क नाइकेनन"
      },
      {
        "English": "Arka Pitambar",
        "Nepali": "अर्डा पिटामबार"
      },
      {
        "English": "Arka Pragathi",
        "Nepali": "अरुखा प्रविठी"
      },
      {
        "English": "Arka Sona",
        "Nepali": "अर्डा सोना"
      },
      {
        "English": "Arka Swadista",
        "Nepali": "अर्खा स्विडिस्टेसा"
      },
      {
        "English": "Arka Ujjwal",
        "Nepali": "अरुखा उजाजवल"
      },
      {
        "English": "Arka Vishwas",
        "Nepali": "अर्खा विशवास"
      },
      {
        "English": "Bangalore rose",
        "Nepali": "बंगलोर गुलाब"
      },
      {
        "English": "Bhima super red",
        "Nepali": "भीम सुपर रातो रातो"
      },
      {
        "English": "Bhima red",
        "Nepali": "भीम रातो"
      },
      {
        "English": "Bhima raj dark red",
        "Nepali": "भीमु राज गाढा रातो"
      },
      {
        "English": "Bhima Shakti red",
        "Nepali": "भीम शाक्य रेड"
      },
      {
        "English": "Bhima Kiran light red",
        "Nepali": "भीमा किरण लाइट लाल"
      },
      {
        "English": "Bhima light red",
        "Nepali": "भिम लाइट रेड"
      },
      {
        "English": "Bhima shubra white",
        "Nepali": "भिम शुभ्र श्वेत"
      },
      {
        "English": "Bhima shweta white",
        "Nepali": "भिम श्वेत श्वेत"
      },
      {
        "English": "Bhima Safed",
        "Nepali": "भिम सफेद"
      },
      {
        "English": "Early Grano",
        "Nepali": "प्रारम्भिक ग्राउंने"
      },
      {
        "English": "Kalyanpur Red Round",
        "Nepali": "कल्याणपुर रेड गोल"
      },
      {
        "English": "Nimar local",
        "Nepali": "निमरल स्थानीय"
      },
      {
        "English": "Phule Safeed",
        "Nepali": "फूले सफेद"
      },
      {
        "English": "Phule Survana",
        "Nepali": "फूले सुर्वाना"
      },
      {
        "English": "Phule Samarth",
        "Nepali": "फुल सार्थकार"
      },
      {
        "English": "Phule Swarna",
        "Nepali": "फूले स्वर्ण"
      },
      {
        "English": "Punjab Selection",
        "Nepali": "पंजाब चयन"
      },
      {
        "English": "Pusa Madhavi",
        "Nepali": "पुसा माधवी"
      },
      {
        "English": "Pusa Ridhi",
        "Nepali": "पुवेकी श्रीमती"
      },
      {
        "English": "Spanish brown",
        "Nepali": "स्पेनिश खैरो"
      },
      {
        "English": "Suprex",
        "Nepali": "निडर"
      },
      {
        "English": "Talaja Local",
        "Nepali": "तालाजा स्थानीय"
      },
      {
        "English": "Arka Bheem",
        "Nepali": "अर्टक बित्रामक"
      },
      {
        "English": "Arka Bindu",
        "Nepali": "अर्खा विन्दु"
      },
      {
        "English": "Arka Kihriman",
        "Nepali": "अर्खा किहिनेण"
      },
      {
        "English": "Arka Kirtinaan",
        "Nepali": "अर्खा किर्तिनान"
      },
      {
        "English": "Arka Lalima",
        "Nepali": "अरुखा लामाना"
      },
      {
        "English": "Arka Niketan",
        "Nepali": "अर्क नाइकेनन"
      },
      {
        "English": "Arka Pitambar",
        "Nepali": "अर्डा पिटामबार"
      },
      {
        "English": "Arka Pragathi",
        "Nepali": "अरुखा प्रविठी"
      },
      {
        "English": "Arka Sona",
        "Nepali": "अर्डा सोना"
      },
      {
        "English": "Arka Swadista",
        "Nepali": "अर्खा स्विडिस्टेसा"
      },
      {
        "English": "Arka Ujjwal",
        "Nepali": "अरुखा उजाजवल"
      },
      {
        "English": "Arka Vishwas",
        "Nepali": "अर्खा विशवास"
      },
      {
        "English": "Bangalore rose",
        "Nepali": "बंगलोर गुलाब"
      },
      {
        "English": "Bhima super red",
        "Nepali": "भीम सुपर रातो रातो"
      },
      {
        "English": "Bhima red",
        "Nepali": "भीम रातो"
      },
      {
        "English": "Bhima raj dark red",
        "Nepali": "भीमु राज गाढा रातो"
      },
      {
        "English": "Bhima Shakti red",
        "Nepali": "भीम शाक्य रेड"
      },
      {
        "English": "Bhima Kiran light red",
        "Nepali": "भीमा किरण लाइट लाल"
      },
      {
        "English": "Early Grano",
        "Nepali": "प्रारम्भिक ग्राउंने"
      },
      {
        "English": "Nimar local",
        "Nepali": "निमरल स्थानीय"
      },
      {
        "English": "Phule Samarth",
        "Nepali": "फुल सार्थकार"
      },
      {
        "English": "Punjab Selection",
        "Nepali": "पंजाब चयन"
      },
      {
        "English": "Pusa Ridhi",
        "Nepali": "पुवेकी श्रीमती"
      },
      {
        "English": "Spanish brown",
        "Nepali": "स्पेनिश खैरो"
      },
      {
        "English": "Suprex",
        "Nepali": "निडर"
      },
      {
        "English": "Talaja Local",
        "Nepali": "तालाजा स्थानीय"
      },
      {
        "English": "Bhima",
        "Nepali": "बम"
      },
      {
        "English": "Girna",
        "Nepali": "गेन्न"
      },
      {
        "English": "Manjira",
        "Nepali": "मजेररा"
      },
      {
        "English": "NIRA",
        "Nepali": "पौरा"
      },
      {
        "English": "Sagarmatyalu",
        "Nepali": "सगरतात"
      },
      {
        "English": "Sharda",
        "Nepali": "शारिडो"
      },
      {
        "English": "Tara",
        "Nepali": "सानो बेड़"
      },
      {
        "English": "early grano",
        "Nepali": "प्रारम्भिक ग्राउंने"
      },
      {
        "English": "banana fruit",
        "Nepali": "केना फल"
      },
      {
        "English": "banana fruit",
        "Nepali": "केना फल"
      },
      {
        "English": "Farsem",
        "Nepali": "शारम"
      },
      {
        "English": "Amazonas Embrapa",
        "Nepali": "अमेजनास एम्बर्यापा"
      },
      {
        "English": "Fibra",
        "Nepali": "रेरा"
      },
      {
        "English": "Espeto",
        "Nepali": "एसेटो"
      },
      {
        "English": "Mandim branca",
        "Nepali": "मन्डम ब्रान्का"
      },
      {
        "English": "Platina",
        "Nepali": "किसान"
      },
      {
        "English": "Sonara",
        "Nepali": "सुरारा"
      },
      {
        "English": "Jarina",
        "Nepali": "गिर्जात्रा"
      },
      {
        "English": "Arari",
        "Nepali": "एकी खेती"
      },
      {
        "English": "Cacau",
        "Nepali": "मकाउ"
      },
      {
        "English": "Taquari",
        "Nepali": "िताी"
      },
      {
        "English": "Liyaye",
        "Nepali": "लिययये"
      },
      {
        "English": "Vitamin A cassava",
        "Nepali": "भिटामिन एक कासाभा"
      },
      {
        "English": "Malyoha",
        "Nepali": "मालिआ"
      },
      {
        "English": "Sawa sawa",
        "Nepali": "आसा आसा"
      },
      {
        "English": "Mapendo",
        "Nepali": "औसत"
      },
      {
        "English": "Game changer",
        "Nepali": "खेल चिरून"
      },
      {
        "English": "Hope",
        "Nepali": "आशा"
      },
      {
        "English": "Poundable",
        "Nepali": "चंगड़ग"
      },
      {
        "English": "Farmer's pride",
        "Nepali": "किसानको गर्व"
      },
      {
        "English": "Dixon",
        "Nepali": "बक्सी पार्नु"
      },
      {
        "English": "Ayaya",
        "Nepali": "अयाया"
      },
      {
        "English": "Sunshine",
        "Nepali": "घाम"
      },
      {
        "English": "Fineface",
        "Nepali": "लिद्घ"
      },
      {
        "English": "Kirimumpale",
        "Nepali": "कर्मिटम"
      },
      {
        "English": "Magana",
        "Nepali": "मैदान"
      },
      {
        "English": "Abiriya",
        "Nepali": "अब्रिया"
      },
      {
        "English": "Sanje",
        "Nepali": "सांजे"
      },
      {
        "English": "Njule",
        "Nepali": "निजुल"
      },
      {
        "English": "Bao, Alodo-alodo",
        "Nepali": "बेओ, एल्डो-एल्डोो"
      },
      {
        "English": "Bukalasa",
        "Nepali": "बुकालासा"
      },
      {
        "English": "Fumba chai",
        "Nepali": "खुबपा चाई"
      },
      {
        "English": "AKENA",
        "Nepali": "अकना"
      },
      {
        "English": "Royal quinoa",
        "Nepali": "रोयल क्विनोआ"
      },
      {
        "English": "Blanca de Junin",
        "Nepali": "ब्लेन्का डे जून"
      },
      {
        "English": "Amarilla Marangani",
        "Nepali": "अमारिला मरांगनी"
      },
      {
        "English": "Blanca de Juli",
        "Nepali": "ब्लेन्का डे जुली"
      },
      {
        "English": "Kankolla",
        "Nepali": "कयोल्ला"
      },
      {
        "English": "Hulhuas",
        "Nepali": "हहूसूरस"
      },
      {
        "English": "Huacariz",
        "Nepali": "हुपाईज"
      },
      {
        "English": "Cheweca",
        "Nepali": "चेवेकी"
      },
      {
        "English": "Egyptian Pink",
        "Nepali": "इजिप्टियन गुलाबी"
      },
      {
        "English": "Elephant",
        "Nepali": "हाती"
      },
      {
        "English": "Tuscan",
        "Nepali": "दोन्तिन"
      },
      {
        "English": "Endory",
        "Nepali": "धिरी"
      },
      {
        "English": "Raghiani",
        "Nepali": "रघी"
      },
      {
        "English": "Rashli",
        "Nepali": "रशली"
      },
      {
        "English": "Jaminiya",
        "Nepali": "जैनियाया"
      },
      {
        "English": "Sebha",
        "Nepali": "हाबाकी"
      },
      {
        "English": "Barka",
        "Nepali": "बालुसा"
      },
      {
        "English": "Zerda",
        "Nepali": "जोडिन"
      },
      {
        "English": "Fezzan",
        "Nepali": "फेजजन"
      },
      {
        "English": "Mexicali",
        "Nepali": "मेक्सिकली"
      },
      {
        "English": "Masuli",
        "Nepali": "मास्ली"
      },
      {
        "English": "Khumal 4",
        "Nepali": "खुमल।"
      },
      {
        "English": "Ram",
        "Nepali": "भेंडा"
      },
      {
        "English": "Khumal 8",
        "Nepali": "खुमल।"
      },
      {
        "English": "Janaki",
        "Nepali": "जानकी"
      },
      {
        "English": "Judi",
        "Nepali": "जुडी"
      },
      {
        "English": "Supersweet",
        "Nepali": "सुक्षकहरू"
      },
      {
        "English": "Deccan Hybrid",
        "Nepali": "डिस्कोन संकर"
      },
      {
        "English": "Ganga safed",
        "Nepali": "गंगा सुरक्षित"
      },
      {
        "English": "Hi-starch",
        "Nepali": "हाई-स्टार्च"
      },
      {
        "English": "Paras",
        "Nepali": "पारा"
      },
      {
        "English": "White star",
        "Nepali": "सेतो तारा"
      },
      {
        "English": "Western Queen",
        "Nepali": "पश्चिमी रानी"
      },
      {
        "English": "Up- to-Date",
        "Nepali": "अप-टु-डेट"
      },
      {
        "English": "Pentland Dell",
        "Nepali": "पेन्टल्याण्ड डील"
      },
      {
        "English": "Pimpernel",
        "Nepali": "पाम्परलनेल"
      },
      {
        "English": "Majestic",
        "Nepali": "राजसितिक"
      },
      {
        "English": "Baraka",
        "Nepali": "बाराडाडा"
      },
      {
        "English": "Challenger",
        "Nepali": "चुनौती गर्ने व्यक्ति"
      },
      {
        "English": "Courage",
        "Nepali": "साहस"
      },
      {
        "English": "Victoria",
        "Nepali": "भिक्टोरिया"
      },
      {
        "English": "Innovator",
        "Nepali": "नवीनचक"
      },
      {
        "English": "Papa pastusa",
        "Nepali": "पापा पास्टससा"
      },
      {
        "English": "Papa sabanera",
        "Nepali": "पापा सबेन्द्र"
      },
      {
        "English": "Rubi",
        "Nepali": "र रुइ"
      },
      {
        "English": "Canchan",
        "Nepali": "लामो"
      },
      {
        "English": "Huaych’a",
        "Nepali": "हुजुओ'आ"
      },
      {
        "English": "Runapapa",
        "Nepali": "रनशिप"
      },
      {
        "English": "Phureja roja",
        "Nepali": "फोरेजा रोजा"
      },
      {
        "English": "Yuraj imilla",
        "Nepali": "युरेज इमिलामा"
      },
      {
        "English": "Jaspe",
        "Nepali": "अकपी"
      },
      {
        "English": "Robusta",
        "Nepali": "विपरीत"
      },
      {
        "English": "India",
        "Nepali": "भारत"
      },
      {
        "English": "ACC madam blue",
        "Nepali": "एसीडी म्याड निलो"
      },
      {
        "English": "Abbot",
        "Nepali": "अबूतोट"
      },
      {
        "English": "Erika",
        "Nepali": "एरिका"
      },
      {
        "English": "Jazzy",
        "Nepali": "उ कैजु"
      },
      {
        "English": "Krone",
        "Nepali": "कटोरो"
      },
      {
        "English": "Labella",
        "Nepali": "किलोमिल"
      },
      {
        "English": "Lady Amarilla",
        "Nepali": "महिला अमरिल्ला"
      },
      {
        "English": "Laperla",
        "Nepali": "लापाला"
      },
      {
        "English": "Little giant",
        "Nepali": "सानो विशाल"
      },
      {
        "English": "Melody",
        "Nepali": "स्वरमाधूर्य"
      },
      {
        "English": "Musica",
        "Nepali": "संगीतध"
      },
      {
        "English": "Umatilla Russet",
        "Nepali": "उमाटिला रिसेट"
      },
      {
        "English": "Norland",
        "Nepali": "नवलजरा"
      },
      {
        "English": "Irish Cobbler",
        "Nepali": "आयरिश कच्चा"
      },
      {
        "English": "Moutain rose",
        "Nepali": "म्यानुन उठियो"
      },
      {
        "English": "Cheiftan",
        "Nepali": "चेफ्नन"
      },
      {
        "English": "Viking",
        "Nepali": "वासिंग"
      },
      {
        "English": "Elba",
        "Nepali": "एलीज"
      },
      {
        "English": "Red La soda",
        "Nepali": "रातो ला सोडा"
      },
      {
        "English": "Lady Roseta",
        "Nepali": "लेडी रोसाटा"
      },
      {
        "English": "Jankdev",
        "Nepali": "जनकदेव"
      },
      {
        "English": "Khumal Bikas",
        "Nepali": "खुमल विक्रम"
      },
      {
        "English": "Ramsai",
        "Nepali": "रामईई"
      },
      {
        "English": "Golsai",
        "Nepali": "गोलैई"
      },
      {
        "English": "Saune",
        "Nepali": "सउन"
      },
      {
        "English": "Bharlange",
        "Nepali": "रगतण"
      },
      {
        "English": "Jirmale",
        "Nepali": "जिर्माल"
      },
      {
        "English": "Dambersi",
        "Nepali": "दमबारी"
      },
      {
        "English": "Ramala",
        "Nepali": "शौत"
      },
      {
        "English": "tukdah",
        "Nepali": "टेकडा"
      },
      {
        "English": "Copati",
        "Nepali": "कप्टेती"
      },
      {
        "English": "Kashi Amul",
        "Nepali": "काशी आलुल"
      },
      {
        "English": "Kashi Adarsh",
        "Nepali": "काशी आदर्श"
      },
      {
        "English": "Kashi Abhiman",
        "Nepali": "काशी अबहमनन"
      },
      {
        "English": "Kashi Anupam",
        "Nepali": "काशी शुमा"
      },
      {
        "English": "Kashi Sharad",
        "Nepali": "काशी शराद"
      },
      {
        "English": "Kashi Hemant",
        "Nepali": "काशी हेमन्ट"
      },
      {
        "English": "Kashi Amrit",
        "Nepali": "काशी अमृत"
      },
      {
        "English": "Kashi Vishesh",
        "Nepali": "काशी भिक्षा"
      },
      {
        "English": "Vaishali",
        "Nepali": "भलीली"
      },
      {
        "English": "Rupali",
        "Nepali": "रुपली"
      },
      {
        "English": "Rashmi",
        "Nepali": "रशैले"
      },
      {
        "English": "Rajni",
        "Nepali": "राजः"
      },
      {
        "English": "Sioux",
        "Nepali": "सिउक्स"
      },
      {
        "English": "Best of All",
        "Nepali": "सबै भन्दा राम्रो"
      },
      {
        "English": "Marglobe",
        "Nepali": "माघुलो"
      },
      {
        "English": "Roma",
        "Nepali": "रोबी"
      },
      {
        "English": "Punjab Chuhra",
        "Nepali": "पंजाब गैरा"
      },
      {
        "English": "Shivalik",
        "Nepali": "शिलीक"
      },
      {
        "English": "Versha",
        "Nepali": "भिहा"
      },
      {
        "English": "Bravo",
        "Nepali": "ब्राउभो"
      },
      {
        "English": "Archana",
        "Nepali": "पादरी हण"
      },
      {
        "English": "Rashmi",
        "Nepali": "रशैले"
      },
      {
        "English": "Sadabahar",
        "Nepali": "साह्रै साह्रै असहिब्द"
      },
      {
        "English": "Arka Ahuti",
        "Nepali": "अर्क अहुत"
      },
      {
        "English": "Arka Abha",
        "Nepali": "अरुखा अबशा"
      },
      {
        "English": "Arka Meghali",
        "Nepali": "अर्क मेघाली"
      },
      {
        "English": "Pant Bahar",
        "Nepali": "प्सान मार्हार"
      },
      {
        "English": "Arka Saurabh",
        "Nepali": "अर्खा सबरत"
      },
      {
        "English": "Arka Alok",
        "Nepali": "अर्क अलक"
      },
      {
        "English": "Sea Island cotton",
        "Nepali": "समुद्री टापु कपास"
      },
      {
        "English": "American Up-land cotton",
        "Nepali": "अमेरिकी अप-जग्गा कपास"
      },
      {
        "English": "Caturra",
        "Nepali": "क्यारारा"
      },
      {
        "English": "Catimor",
        "Nepali": "घामाखर एकावाह गर्नु"
      },
      {
        "English": "Catui",
        "Nepali": "क्याउसी"
      },
      {
        "English": "Mundo Novo",
        "Nepali": "मुन्डो नोभे"
      },
      {
        "English": "Typica",
        "Nepali": "टाइटाइ"
      },
      {
        "English": "Pache",
        "Nepali": "टुक्रा"
      },
      {
        "English": "Pacamara",
        "Nepali": "पकेदा"
      },
      {
        "English": "Typica",
        "Nepali": "टाइटाइ"
      },
      {
        "English": "Caturra",
        "Nepali": "क्यारारा"
      },
      {
        "English": "Catimor",
        "Nepali": "घामाखर एकावाह गर्नु"
      },
      {
        "English": "Caturra",
        "Nepali": "क्यारारा"
      },
      {
        "English": "Typica",
        "Nepali": "टाइटाइ"
      },
      {
        "English": "Maragogype",
        "Nepali": "मारागुगिप"
      },
      {
        "English": "Pache",
        "Nepali": "टुक्रा"
      },
      {
        "English": "Typica",
        "Nepali": "टाइटाइ"
      },
      {
        "English": "Caturra",
        "Nepali": "क्यारारा"
      },
      {
        "English": "Novo",
        "Nepali": "नोभो"
      },
      {
        "English": "Maragogype",
        "Nepali": "मारागुगिप"
      },
      {
        "English": "Mundo",
        "Nepali": "पानी देवीको घर"
      },
      {
        "English": "Catimor",
        "Nepali": "घामाखर एकावाह गर्नु"
      },
      {
        "English": "Garnica",
        "Nepali": "बिजुलीको"
      },
      {
        "English": "Marsellesa",
        "Nepali": "हस्तमास्का"
      },
      {
        "English": "Typica",
        "Nepali": "टाइटाइ"
      },
      {
        "English": "Kent",
        "Nepali": "कमिला"
      },
      {
        "English": "Nganda",
        "Nepali": "एनजीन्डा"
      },
      {
        "English": "Erecta.",
        "Nepali": "ईक्सा।"
      },
      {
        "English": "Sarchimor",
        "Nepali": "अफश"
      },
      {
        "English": "Catimor",
        "Nepali": "घामाखर एकावाह गर्नु"
      },
      {
        "English": "Kent",
        "Nepali": "कमिला"
      },
      {
        "English": "Jackson",
        "Nepali": "ज्याकसन"
      },
      {
        "English": "Devamachy",
        "Nepali": "भवरोची"
      },
      {
        "English": "Chandragiri",
        "Nepali": "चण्डीगिरी"
      },
      {
        "English": "Cauvery",
        "Nepali": "पानीभरि"
      },
      {
        "English": "Agaro",
        "Nepali": "अरुको"
      },
      {
        "English": "Arabica",
        "Nepali": "अरबीए"
      },
      {
        "English": "Barbuk Sudan",
        "Nepali": "बार्बू सुडान"
      },
      {
        "English": "Bedessa",
        "Nepali": "बेभासा"
      },
      {
        "English": "Dega",
        "Nepali": "डि निद्रा"
      },
      {
        "English": "H3",
        "Nepali": "एच गुडा"
      },
      {
        "English": "Harrar",
        "Nepali": "हार"
      },
      {
        "English": "Java",
        "Nepali": "जावास"
      },
      {
        "English": "native heirloom",
        "Nepali": "मूल निवासी ऊनीको"
      },
      {
        "English": "Rume Sudan",
        "Nepali": "रमेरा सुडानन"
      },
      {
        "English": "Sawa",
        "Nepali": "आका"
      },
      {
        "English": "Sidamo",
        "Nepali": "सिडमा"
      },
      {
        "English": "Tafari Kela",
        "Nepali": "ताफरी केला"
      },
      {
        "English": "Andog sari",
        "Nepali": "रबग साडी"
      },
      {
        "English": "Catimor",
        "Nepali": "घामाखर एकावाह गर्नु"
      },
      {
        "English": "Caturra",
        "Nepali": "क्यारारा"
      },
      {
        "English": "Ethiopian",
        "Nepali": "इथियोपियाली"
      },
      {
        "English": "Linie S",
        "Nepali": "जनी एस"
      },
      {
        "English": "Rasuna",
        "Nepali": "रसीना"
      },
      {
        "English": "Typica",
        "Nepali": "टाइटाइ"
      },
      {
        "English": "Castillo El Rosario",
        "Nepali": "टोस्टिनो एल रजारियोियो"
      },
      {
        "English": "Castillo El Tambo",
        "Nepali": "टोस्टरियन एल तखो"
      },
      {
        "English": "Castillo La Trinidad",
        "Nepali": "टोस्टिनो ला ट्रिनडड"
      },
      {
        "English": "Castillo Naranjal",
        "Nepali": "कास्टिलो नारानजल"
      },
      {
        "English": "Castillo Paraguaicito",
        "Nepali": "कास्टिनो परजीविटा"
      },
      {
        "English": "Castillo Santa Barbara",
        "Nepali": "कास्टिलो सान्ता बार्बेरा"
      },
      {
        "English": "Castillo®",
        "Nepali": "क्यास्टिलोको"
      },
      {
        "English": "Colombia",
        "Nepali": "कोलम्बिया"
      },
      {
        "English": "Catimor,",
        "Nepali": "क्यामरर,"
      },
      {
        "English": "Typica,",
        "Nepali": "टाइटाका,"
      },
      {
        "English": "Catuai.",
        "Nepali": "क्याटाई।"
      },
      {
        "English": "Liberica",
        "Nepali": "लाइबेरी"
      },
      {
        "English": "Exelsa",
        "Nepali": "अतिफटाक्टा"
      },
      {
        "English": "Moka",
        "Nepali": "मोछा"
      },
      {
        "English": "Culi",
        "Nepali": "कुली"
      },
      {
        "English": "Acaia",
        "Nepali": "अशियालिया"
      },
      {
        "English": "Catimor",
        "Nepali": "घामाखर एकावाह गर्नु"
      },
      {
        "English": "Caturra",
        "Nepali": "क्यारारा"
      },
      {
        "English": "Icatu",
        "Nepali": "परिचय"
      },
      {
        "English": "mara catura",
        "Nepali": "मारा क्यानुरा"
      },
      {
        "English": "maragogype",
        "Nepali": "मारागुगिप"
      },
      {
        "English": "mundo novo",
        "Nepali": "मुन्डो नोभे"
      },
      {
        "English": "Rasuna",
        "Nepali": "रसीना"
      },
      {
        "English": "Tupi",
        "Nepali": "तिफी"
      },
      {
        "English": "Bhima",
        "Nepali": "बम"
      },
      {
        "English": "Girna",
        "Nepali": "गेन्न"
      },
      {
        "English": "Manjira",
        "Nepali": "मजेररा"
      },
      {
        "English": "NIRA",
        "Nepali": "पौरा"
      },
      {
        "English": "Sagarmatyalu",
        "Nepali": "सगरतात"
      },
      {
        "English": "Sharda",
        "Nepali": "शारिडो"
      },
      {
        "English": "Tara",
        "Nepali": "सानो बेड़"
      },
      {
        "English": "Poovan",
        "Nepali": "पुभन"
      },
      {
        "English": "Monthan",
        "Nepali": "मोनाशान"
      },
      {
        "English": "Rasthali",
        "Nepali": "रशद्घ"
      },
      {
        "English": "Robusta",
        "Nepali": "विपरीत"
      },
      {
        "English": "Nendran",
        "Nepali": "नबरमकोन नर्वेद्रोनन"
      },
      {
        "English": "Red Banana",
        "Nepali": "रातो केट"
      },
      {
        "English": "Grand Naine",
        "Nepali": "भव्य नाइन"
      },
      {
        "English": "Karpooravalli",
        "Nepali": "कर्फोराभली"
      },
      {
        "English": "Monthan",
        "Nepali": "मोनाशान"
      },
      {
        "English": "yellow dwarf Bananas",
        "Nepali": "पहेंलो बौनाना केरा"
      },
      {
        "English": "Red dwarf Bananas.",
        "Nepali": "रातो बौनाना केरा।"
      },
      {
        "English": "green Bananas",
        "Nepali": "हरियो केरा"
      },
      {
        "English": "Green",
        "Nepali": "हरियो"
      },
      {
        "English": "Black",
        "Nepali": "अध्यारो"
      },
      {
        "English": "Arka Bheem",
        "Nepali": "अर्टक बित्रामक"
      },
      {
        "English": "Arka Bindu",
        "Nepali": "अर्खा विन्दु"
      },
      {
        "English": "Arka Kihriman",
        "Nepali": "अर्खा किहिनेण"
      },
      {
        "English": "Arka Kirtinaan",
        "Nepali": "अर्खा किर्तिनान"
      },
      {
        "English": "Arka Lalima",
        "Nepali": "अरुखा लामाना"
      },
      {
        "English": "Arka Niketan",
        "Nepali": "अर्क नाइकेनन"
      },
      {
        "English": "Arka Pitambar",
        "Nepali": "अर्डा पिटामबार"
      },
      {
        "English": "Arka Pragathi",
        "Nepali": "अरुखा प्रविठी"
      },
      {
        "English": "Arka Sona",
        "Nepali": "अर्डा सोना"
      },
      {
        "English": "Arka Swadista",
        "Nepali": "अर्खा स्विडिस्टेसा"
      },
      {
        "English": "Arka Ujjwal",
        "Nepali": "अरुखा उजाजवल"
      },
      {
        "English": "Arka Vishwas",
        "Nepali": "अर्खा विशवास"
      },
      {
        "English": "Bangalore rose",
        "Nepali": "बंगलोर गुलाब"
      },
      {
        "English": "Bhima super red",
        "Nepali": "भीम सुपर रातो रातो"
      },
      {
        "English": "Bhima red",
        "Nepali": "भीम रातो"
      },
      {
        "English": "Bhima raj dark red",
        "Nepali": "भीमु राज गाढा रातो"
      },
      {
        "English": "Bhima Shakti red",
        "Nepali": "भीम शाक्य रेड"
      },
      {
        "English": "Bhima Kiran light red",
        "Nepali": "भीमा किरण लाइट लाल"
      },
      {
        "English": "Early Grano",
        "Nepali": "प्रारम्भिक ग्राउंने"
      },
      {
        "English": "Nimar local",
        "Nepali": "निमरल स्थानीय"
      },
      {
        "English": "Phule Samarth",
        "Nepali": "फुल सार्थकार"
      },
      {
        "English": "Punjab Selection",
        "Nepali": "पंजाब चयन"
      },
      {
        "English": "Pusa Ridhi",
        "Nepali": "पुवेकी श्रीमती"
      },
      {
        "English": "Spanish brown",
        "Nepali": "स्पेनिश खैरो"
      },
      {
        "English": "Suprex",
        "Nepali": "निडर"
      },
      {
        "English": "Talaja Local",
        "Nepali": "तालाजा स्थानीय"
      },
      {
        "English": "Argene",
        "Nepali": "अर्गोइ"
      },
      {
        "English": "Serkamo",
        "Nepali": "सर्कोमो"
      },
      {
        "English": "S",
        "Nepali": "अनु"
      },
      {
        "English": "Tate",
        "Nepali": "टिउनु"
      },
      {
        "English": "Ahadu",
        "Nepali": "अदुक"
      },
      {
        "English": "Borkena",
        "Nepali": "बोर्स"
      },
      {
        "English": "Obsa",
        "Nepali": "ओभान"
      },
      {
        "English": "Dicho",
        "Nepali": "भूत"
      },
      {
        "English": "Barsan",
        "Nepali": "बाला"
      },
      {
        "English": "Lidan",
        "Nepali": "लिडान"
      },
      {
        "English": "Arkebe",
        "Nepali": "आक्राजीको"
      },
      {
        "English": "Smrat",
        "Nepali": "स्म्पमला"
      },
      {
        "English": "Bonay",
        "Nepali": "फसोन"
      },
      {
        "English": "Bhavani",
        "Nepali": "भवेनी"
      },
      {
        "English": "Panchali",
        "Nepali": "पंद्रनी"
      },
      {
        "English": "Sangam",
        "Nepali": "संग्रह"
      },
      {
        "English": "Pakola",
        "Nepali": "पाकोला"
      },
      {
        "English": "Canola Raya",
        "Nepali": "क्यानोला राई"
      },
      {
        "English": "Rainbow",
        "Nepali": "इन्दे्रनी"
      },
      {
        "English": "Amazon",
        "Nepali": "अमेजन"
      },
      {
        "English": "Mercedes",
        "Nepali": "मर्सिड्स"
      },
      {
        "English": "Endory",
        "Nepali": "धिरी"
      },
      {
        "English": "Raghiani",
        "Nepali": "रघी"
      },
      {
        "English": "Rashli",
        "Nepali": "रशली"
      },
      {
        "English": "Frontana",
        "Nepali": "कटरा"
      },
      {
        "English": "Mentana",
        "Nepali": "मानसिकता"
      },
      {
        "English": "Tucano",
        "Nepali": "टकनो"
      },
      {
        "English": "Vacaria",
        "Nepali": "खाली शुरुआत"
      },
      {
        "English": "Pavao",
        "Nepali": "पावास"
      },
      {
        "English": "Climax",
        "Nepali": "चरम बिन्दु"
      },
      {
        "English": "Richmond",
        "Nepali": "रिचाउन्ड"
      },
      {
        "English": "Rasant",
        "Nepali": "पानी परेको"
      },
      {
        "English": "Timfo",
        "Nepali": "तिनै"
      },
      {
        "English": "Alma",
        "Nepali": "मूगा"
      },
      {
        "English": "Basho",
        "Nepali": "जलविश्वाणा"
      },
      {
        "English": "Bounty",
        "Nepali": "पार्य"
      },
      {
        "English": "Champ",
        "Nepali": "म्पम्जोरीट्टी"
      },
      {
        "English": "Comtal",
        "Nepali": "सेवन"
      },
      {
        "English": "Tiller",
        "Nepali": "टियक"
      },
      {
        "English": "Climax",
        "Nepali": "चरम बिन्दु"
      },
      {
        "English": "Clair",
        "Nepali": "उपद्रव्य"
      },
      {
        "English": "Barfleo",
        "Nepali": "बारोफ्लो"
      },
      {
        "English": "Kootenai",
        "Nepali": "कोटिनैई"
      },
      {
        "English": "Barpenta",
        "Nepali": "बारी"
      },
      {
        "English": "Erecta",
        "Nepali": "ईक्सा"
      },
      {
        "English": "Richmond",
        "Nepali": "रिचाउन्ड"
      },
      {
        "English": "Toro",
        "Nepali": "टोरो"
      },
      {
        "English": "Mariposa",
        "Nepali": "मारिपोसा"
      },
      {
        "English": "Champlain",
        "Nepali": "च्यात्रीकोलिन"
      },
      {
        "English": "Finecut",
        "Nepali": "भुसी"
      },
      {
        "English": "Gulfcut",
        "Nepali": "गुनासोका"
      },
      {
        "English": "Pioneer",
        "Nepali": "नया काम गर्ने व्यक्ति"
      },
      {
        "English": "Reclaimar",
        "Nepali": "शटक"
      },
      {
        "English": "Salcut",
        "Nepali": "साल्कोट"
      },
      {
        "English": "Topcut",
        "Nepali": "टोपेट"
      },
      {
        "English": "Boma",
        "Nepali": "माूट"
      },
      {
        "English": "Callida",
        "Nepali": "कण्डिडा"
      },
      {
        "English": "Elmba",
        "Nepali": "एल्म्बी"
      },
      {
        "English": "Marina",
        "Nepali": "डुंगा घाट"
      },
      {
        "English": "Sabre",
        "Nepali": "रुखको शब"
      },
      {
        "English": "Toro",
        "Nepali": "टोरो"
      },
      {
        "English": "KP8",
        "Nepali": "केपी पृ"
      },
      {
        "English": "Nemcut",
        "Nepali": "निकै ध्यान"
      },
      {
        "English": "Asatsuyu",
        "Nepali": "साताउ"
      },
      {
        "English": "Katambora",
        "Nepali": "काटामारा"
      },
      {
        "English": "Tolgar",
        "Nepali": "असाधारण पार्नु"
      },
      {
        "English": "Egyptian Giant",
        "Nepali": "मिश्री राक्षस"
      },
      {
        "English": "Marmand",
        "Nepali": "मारालो"
      },
      {
        "English": "Edkawy",
        "Nepali": "एडवाबी"
      },
      {
        "English": "Pakmor-B",
        "Nepali": "पिकमोमोर-बी"
      },
      {
        "English": "Floradade",
        "Nepali": "भुराडा गर्नु"
      },
      {
        "English": "Mountain Fresh plus",
        "Nepali": "हिमाली ताजा प्लस"
      },
      {
        "English": "Mountain Spring",
        "Nepali": "पहाडी वसन्त"
      },
      {
        "English": "Polbig",
        "Nepali": "पोलबिग"
      },
      {
        "English": "Big Beef",
        "Nepali": "बिग बीफ"
      },
      {
        "English": "Boxcar Willie",
        "Nepali": "बक्सर जाई"
      },
      {
        "English": "Mortgage Lifter",
        "Nepali": "धितो लिटर"
      },
      {
        "English": "Red Pearl",
        "Nepali": "रातो मोती"
      },
      {
        "English": "Sun Gold",
        "Nepali": "सूजन सुन"
      },
      {
        "English": "Blackhawk",
        "Nepali": "कालो बाज"
      },
      {
        "English": "Valentine",
        "Nepali": "अलंजा"
      },
      {
        "English": "Black Eclipse",
        "Nepali": "कालो ग्रहण"
      },
      {
        "English": "Black Bear",
        "Nepali": "काली भालु"
      },
      {
        "English": "Abdin",
        "Nepali": "अबाइन्"
      },
      {
        "English": "Hadi ( Okra - leaf Barakat )",
        "Nepali": "हेली (ओट्रा - पात बाराकाट)"
      },
      {
        "English": "Kheiralla",
        "Nepali": "कयरीला"
      },
      {
        "English": "Wager",
        "Nepali": "तार"
      },
      {
        "English": "Burhan",
        "Nepali": "जफनुन"
      },
      {
        "English": "Khalifa",
        "Nepali": "खल्फा"
      },
      {
        "English": "Bukalasa Pedigree Albar",
        "Nepali": "बुकालासास पाईग्री एलबार"
      },
      {
        "English": "Serere Albar Type Uganda (SATU)",
        "Nepali": "सेरेरे अलबार प्रकार युगान्डा (सर्न)"
      },
      {
        "English": "Guaraní INTA BGRR",
        "Nepali": "गुरान इंडा ईंडा बीआर"
      },
      {
        "English": "NUOPAL RR",
        "Nepali": "नुपर आरआर"
      },
      {
        "English": "Purnima",
        "Nepali": "पूर्णिता"
      },
      {
        "English": "Jaydhar",
        "Nepali": "जयसाउरी"
      },
      {
        "English": "Malgari",
        "Nepali": "मारली"
      },
      {
        "English": "Abhadita,",
        "Nepali": "तरबदी,"
      },
      {
        "English": "Catuai,",
        "Nepali": "क्याटाआ,"
      },
      {
        "English": "Caturra,",
        "Nepali": "क्यार्फररा"
      },
      {
        "English": "Geisha,",
        "Nepali": "गेशा,"
      },
      {
        "English": "Mundo Novo",
        "Nepali": "मुन्डो नोभे"
      },
      {
        "English": "Catuai,",
        "Nepali": "क्याटाआ,"
      },
      {
        "English": "Typica,",
        "Nepali": "टाइटाका,"
      },
      {
        "English": "Caturra,",
        "Nepali": "क्यार्फररा"
      },
      {
        "English": "Lempira,",
        "Nepali": "लेम्पारा,"
      },
      {
        "English": "Hartman",
        "Nepali": "हार्टम्यान"
      },
      {
        "English": "Girard",
        "Nepali": "जिराडायण"
      },
      {
        "English": "Finch",
        "Nepali": "खुशी"
      },
      {
        "English": "Saffire",
        "Nepali": "सलाद"
      },
      {
        "English": "Centennial",
        "Nepali": "शताब्दी"
      },
      {
        "English": "Montola",
        "Nepali": "मोनोला"
      },
      {
        "English": "merah besar",
        "Nepali": "मराह बेस"
      },
      {
        "English": "curly green chilli",
        "Nepali": "घुमाउरो हरियो खोर्सानी"
      },
      {
        "English": "Red birds eye chilli",
        "Nepali": "रातो चराहरू आँखा खोर्सानी"
      },
      {
        "English": "green birds eye",
        "Nepali": "हरियो चराहरू आँखा"
      },
      {
        "English": "kanthari",
        "Nepali": "क्तारिरी"
      },
      {
        "English": "kashmiri chilli",
        "Nepali": "काश्मिरी खोर्सानी"
      },
      {
        "English": "Bhagya lakshmi",
        "Nepali": "भग्जित लक्ष्मी"
      },
      {
        "English": "birds eye chilli (dhani)",
        "Nepali": "चराहरू आँखा खोर्सानी (धानी)"
      },
      {
        "English": "guntur chilli",
        "Nepali": "गुन्तार खोर्सानी"
      },
      {
        "English": "tomato chilli",
        "Nepali": "टमाटर खोर्सानी"
      },
      {
        "English": "madras pari",
        "Nepali": "मद्रास पाई"
      },
      {
        "English": "ramnad mundu",
        "Nepali": "रैडौड मुन्डु"
      },
      {
        "English": "nagpur",
        "Nepali": "नागपुर"
      },
      {
        "English": "Crisphead",
        "Nepali": "क्रिस्चहेड़े"
      },
      {
        "English": "Butterhead",
        "Nepali": "हातहतथीज"
      },
      {
        "English": "Romaine",
        "Nepali": "रोमेनि"
      },
      {
        "English": "Loose leaf",
        "Nepali": "छाडा पात"
      },
      {
        "English": "Frisbee",
        "Nepali": "भ्रातृत्व"
      },
      {
        "English": "Radicchio",
        "Nepali": "रेडियोचिओ"
      },
      {
        "English": "Oak leaf lettuce",
        "Nepali": "ओक पात सलाद"
      },
      {
        "English": "stem lettuce",
        "Nepali": "स्टेम सलाद"
      },
      {
        "English": "Arugula",
        "Nepali": "अर्गुला"
      },
      {
        "English": "cress",
        "Nepali": "चा?"
      },
      {
        "English": "Endive",
        "Nepali": "धैर्य"
      },
      {
        "English": "coral lettuce",
        "Nepali": "कोरल सलाद"
      },
      {
        "English": "Mache",
        "Nepali": "घोटाला"
      },
      {
        "English": "Boston",
        "Nepali": "बोससमय"
      },
      {
        "English": "grand naine",
        "Nepali": "भव्य नाइन"
      },
      {
        "English": "Ambon banana",
        "Nepali": "अम्बोन केरा"
      },
      {
        "English": "Barangan",
        "Nepali": "बरंगन"
      },
      {
        "English": "Kepok banana",
        "Nepali": "केकक केरा"
      },
      {
        "English": "Mas banana",
        "Nepali": "मास्क केट"
      },
      {
        "English": "Cavendish",
        "Nepali": "उपदीना"
      },
      {
        "English": "Lampung banana",
        "Nepali": "बत्तींग केरा"
      },
      {
        "English": "Awk banana",
        "Nepali": "अडिब केरा"
      },
      {
        "English": "red banana",
        "Nepali": "रातो केट"
      },
      {
        "English": "Champa",
        "Nepali": "हल्कापा"
      },
      {
        "English": "Ronit",
        "Nepali": "मटन"
      },
      {
        "English": "Sper Elad",
        "Nepali": "शुक्र एलाड"
      },
      {
        "English": "Trailblazer",
        "Nepali": "ट्रेल्बेलजजेर"
      },
      {
        "English": "Vega",
        "Nepali": "भेगा"
      },
      {
        "English": "Candy",
        "Nepali": "मिश्री"
      },
      {
        "English": "Exacta",
        "Nepali": "अचल"
      },
      {
        "English": "Red Sky",
        "Nepali": "रातो आकाश"
      },
      {
        "English": "Redwing",
        "Nepali": "लालद्दा"
      },
      {
        "English": "Bhima Shubhra",
        "Nepali": "भीम शुप्रा"
      },
      {
        "English": "Brown Spanish",
        "Nepali": "खैरो स्पेनिश"
      },
      {
        "English": "Punjab Naroya",
        "Nepali": "पंजाब नाल"
      },
      {
        "English": "HERITAGE ENDURANCE",
        "Nepali": "उत्तराधिकार धीरज"
      },
      {
        "English": "SARDI-GRAZER",
        "Nepali": "सार्डी-ग्राजेर"
      },
      {
        "English": "Tenera",
        "Nepali": "खुट्टा"
      },
      {
        "English": "Tenera",
        "Nepali": "खुट्टा"
      },
      {
        "English": "Golden acre",
        "Nepali": "गोल्डन एकर"
      },
      {
        "English": "Danish ballhead",
        "Nepali": "डेनिनिश बलहेड"
      },
      {
        "English": "Kranti",
        "Nepali": "किराती"
      },
      {
        "English": "Tolgar",
        "Nepali": "असाधारण पार्नु"
      },
      {
        "English": "Smrat",
        "Nepali": "स्म्पमला"
      },
      {
        "English": "Arkebe",
        "Nepali": "आक्राजीको"
      },
      {
        "English": "Pakola",
        "Nepali": "पाकोला"
      },
      {
        "English": "Canola Raya",
        "Nepali": "क्यानोला राई"
      },
      {
        "English": "Rainbow",
        "Nepali": "इन्दे्रनी"
      },
      {
        "English": "Bonay",
        "Nepali": "फसोन"
      },
      {
        "English": "Bhavani",
        "Nepali": "भवेनी"
      },
      {
        "English": "Panchali",
        "Nepali": "पंद्रनी"
      },
      {
        "English": "Sangam",
        "Nepali": "संग्रह"
      },
      {
        "English": "Manado Malay",
        "Nepali": "महोदा मल्ले"
      },
      {
        "English": "North Moluccan Malay",
        "Nepali": "उत्तर मोल्कुन मलय"
      },
      {
        "English": "Ambon Malay",
        "Nepali": "अम्बोन मल्ले"
      },
      {
        "English": "Banda Malay",
        "Nepali": "बन्द मल्ले"
      },
      {
        "English": "Lampong",
        "Nepali": "बर्नगो"
      },
      {
        "English": "Muntok",
        "Nepali": "मुन् बञ्जा"
      },
      {
        "English": "Sarawak pepper",
        "Nepali": "सारवोक मरिच"
      },
      {
        "English": "Jambi",
        "Nepali": "हारी"
      },
      {
        "English": "Blackhawk",
        "Nepali": "कालो बाज"
      },
      {
        "English": "Valentine",
        "Nepali": "अलंजा"
      },
      {
        "English": "Black eclipse",
        "Nepali": "कालो ग्रहण"
      },
      {
        "English": "Black bear",
        "Nepali": "काली भालु"
      },
      {
        "English": "Baboon lemon",
        "Nepali": "बाबोनिन निम्बू"
      },
      {
        "English": "Brazilian sweet lemon",
        "Nepali": "ब्राजिल मिठो निम्बू"
      },
      {
        "English": "Bearss Lemons",
        "Nepali": "भालु लेमनहरू"
      },
      {
        "English": "Punjab Baramasi",
        "Nepali": "पंजाब बारामी"
      },
      {
        "English": "Punjab Galgal",
        "Nepali": "पंजाब ग्यालगल"
      },
      {
        "English": "Lucknow seedless",
        "Nepali": "लुक्ने अब"
      },
      {
        "English": "Pant Lemon (Seville)",
        "Nepali": "पन्त नींबर (सेभिल)"
      },
      {
        "English": "Lisbon lemon",
        "Nepali": "लिबोन कागजात"
      },
      {
        "English": "Jora tenga",
        "Nepali": "जोरा टेन्गा"
      },
      {
        "English": "Rough lemon",
        "Nepali": "कुनै खम्बामा कागती"
      },
      {
        "English": "Nepali Round",
        "Nepali": "नेपाली गोल"
      },
      {
        "English": "Chakradhar",
        "Nepali": "चक्रधर"
      },
      {
        "English": "Rasraj",
        "Nepali": "रसराज"
      },
      {
        "English": "Red dwarf Bananas",
        "Nepali": "रेड बौनाना केरा"
      },
      {
        "English": "Baswant 780",
        "Nepali": "बसवन्त ७८०"
      },
      {
        "English": "Hisar-2",
        "Nepali": "हिसार-२"
      },
      {
        "English": "Pusa Ratnar",
        "Nepali": "पुसा रत्नार"
      },
      {
        "English": "Pusa Red",
        "Nepali": "पुसा रातो"
      },
      {
        "English": "Pusa white flat",
        "Nepali": "पुसा सेतो फ्लैट"
      },
      {
        "English": "Pusa White Round",
        "Nepali": "पुसा सेतो गोल"
      },
      {
        "English": "Udaipur -101",
        "Nepali": "उदयपुर - १०१"
      },
      {
        "English": "Udaipur -102",
        "Nepali": "उदयपुर - १०२"
      },
      {
        "English": "Arad-H",
        "Nepali": "अराद-एच"
      },
      {
        "English": "Arka Kalyan",
        "Nepali": "अर्का कल्याण"
      },
      {
        "English": "Baswant 780",
        "Nepali": "बसवन्त ७८०"
      },
      {
        "English": "Bhima light red",
        "Nepali": "भीम हल्का रातो"
      },
      {
        "English": "Bhima shubra white",
        "Nepali": "भीम शुभ्र सेतो"
      },
      {
        "English": "Bhima shweta white",
        "Nepali": "भीम श्वेता सेतो"
      },
      {
        "English": "Bhima Safed",
        "Nepali": "भीम सफद"
      },
      {
        "English": "Hisar-2",
        "Nepali": "हिसार-२"
      },
      {
        "English": "Kalyanpur Red Round",
        "Nepali": "कल्याणपुर रातो राउन्ड"
      },
      {
        "English": "Phule Safeed",
        "Nepali": "फुले सुरक्षित"
      },
      {
        "English": "Phule Survana",
        "Nepali": "फुले सर्वाण"
      },
      {
        "English": "Phule Swarna",
        "Nepali": "फुले स्वर्ण"
      },
      {
        "English": "Pusa Madhavi",
        "Nepali": "पुसा माधवी"
      },
      {
        "English": "Pusa Ratnar",
        "Nepali": "पुसा रत्नार"
      },
      {
        "English": "Pusa Red",
        "Nepali": "पुसा रातो"
      },
      {
        "English": "Pusa white flat",
        "Nepali": "पुसा सेतो फ्लैट"
      },
      {
        "English": "Pusa White Round",
        "Nepali": "पुसा सेतो गोल"
      },
      {
        "English": "Udaipur -101",
        "Nepali": "उदयपुर - १०१"
      },
      {
        "English": "Udaipur -102",
        "Nepali": "उदयपुर - १०२"
      },
      {
        "English": "CoLk 94184 (Birendra)",
        "Nepali": "कोलक ९४१८४ (वीरेन्द्र)"
      },
      {
        "English": "CoOr 03151(Sabita)",
        "Nepali": "कोओर ०३१५१ (सविता)"
      },
      {
        "English": "CGKusum-1",
        "Nepali": "सीजीकुसुम-१"
      },
      {
        "English": "Malviya Kusum 305",
        "Nepali": "मालवीय कुसुम ३०५"
      },
      {
        "English": "Nag-7",
        "Nepali": "नाग-७"
      },
      {
        "English": "Nari 38",
        "Nepali": "नारी ३८"
      },
      {
        "English": "Phule Kusuma",
        "Nepali": "फुले कुसुमा"
      },
      {
        "English": "MY 5465",
        "Nepali": "मेरो ५४६५"
      },
      {
        "English": "SP 701284",
        "Nepali": "एसपी ७०१२८४"
      },
      {
        "English": "Adira 1",
        "Nepali": "आदिरा १"
      },
      {
        "English": "Adira 2",
        "Nepali": "आदिरा २"
      },
      {
        "English": "Adira 4",
        "Nepali": "आदिरा ४"
      },
      {
        "English": "Malang 1",
        "Nepali": "मलंग १"
      },
      {
        "English": "Malang 2",
        "Nepali": "मलङ २"
      },
      {
        "English": "Malang 4",
        "Nepali": "मलङ ४"
      },
      {
        "English": "Casca roxa",
        "Nepali": "कास्का रोक्सा"
      },
      {
        "English": "Mayombe",
        "Nepali": "मेयोम्बे"
      },
      {
        "English": "Musimwa",
        "Nepali": "मुसिम्वा"
      },
      {
        "English": "Obasanjo-2",
        "Nepali": "ओबासान्जो-२"
      },
      {
        "English": "Baba 70",
        "Nepali": "बाबा ७०"
      },
      {
        "English": "Nyaraboke",
        "Nepali": "न्याराबोके"
      },
      {
        "English": "Karangwa",
        "Nepali": "कराङवा"
      },
      {
        "English": "Kabiriti",
        "Nepali": "कबिरिति"
      },
      {
        "English": "Mingoro",
        "Nepali": "मिंगोरो"
      },
      {
        "English": "Kwatamumpale",
        "Nepali": "क्वातामुम्पाले"
      },
      {
        "English": "Ogwok",
        "Nepali": "ओग्वोक"
      },
      {
        "English": "NASE 19",
        "Nepali": "नासे १९"
      },
      {
        "English": "NAROCASS 1",
        "Nepali": "नारोकास १"
      },
      {
        "English": "NAROCASS 2",
        "Nepali": "नारोकास २"
      },
      {
        "English": "Inca red",
        "Nepali": "इन्का रातो"
      },
      {
        "English": "Rosada de Junin",
        "Nepali": "रोसाडा डे जुनिन"
      },
      {
        "English": "Mantaro",
        "Nepali": "मन्तारो"
      },
      {
        "English": "Rosada Taraco",
        "Nepali": "रोसाडा ताराको"
      },
      {
        "English": "Mokhtar",
        "Nepali": "मुख्तार"
      },
      {
        "English": "Sidi Masri",
        "Nepali": "सिदी मसरी"
      },
      {
        "English": "Zellaf",
        "Nepali": "जेलाफ"
      },
      {
        "English": "Kufra 1",
        "Nepali": "कुफ्रा १"
      },
      {
        "English": "Merjawi",
        "Nepali": "मर्जावी"
      },
      {
        "English": "Buhut 103",
        "Nepali": "बुहुत १०३"
      },
      {
        "English": "Embrapa 49",
        "Nepali": "एम्ब्रापा ४९"
      },
      {
        "English": "6505 B",
        "Nepali": "६५०५ बि"
      },
      {
        "English": "Chhommrong",
        "Nepali": "छोम्मरङ"
      },
      {
        "English": "Lekali Dhan 3",
        "Nepali": "लेकाली धन ३"
      },
      {
        "English": "Radha 4",
        "Nepali": "राधा ४"
      },
      {
        "English": "Sarju 52",
        "Nepali": "सरजु ५२"
      },
      {
        "English": "BP 1",
        "Nepali": "बीपी १"
      },
      {
        "English": "Agroceres 12",
        "Nepali": "कृषि उत्पादन १२"
      },
      {
        "English": "Ganga 4",
        "Nepali": "गंगा ४"
      },
      {
        "English": "Ganga 7",
        "Nepali": "गंगा ७"
      },
      {
        "English": "Rajendra hybrid makka 2",
        "Nepali": "राजेन्द्र हाइब्रिड मक्का २"
      },
      {
        "English": "Kawanda Comp A",
        "Nepali": "कवान्डा कम्प ए"
      },
      {
        "English": "Papa criolla",
        "Nepali": "पापा क्रियोला"
      },
      {
        "English": "Criolla Sua Pa",
        "Nepali": "क्रिओला सुआ पा"
      },
      {
        "English": "Criolla Dorada",
        "Nepali": "क्रिओला डोराडा"
      },
      {
        "English": "Qhoyllupapa",
        "Nepali": "छोइलुपापा"
      },
      {
        "English": "Qhenipapa",
        "Nepali": "केनिपापा"
      },
      {
        "English": "Wila imilla",
        "Nepali": "विल इमिला"
      },
      {
        "English": "Chiar Imilla",
        "Nepali": "चियर इमिला"
      },
      {
        "English": "Sani imilla",
        "Nepali": "सानी इमिला"
      },
      {
        "English": "Russet Norkotah",
        "Nepali": "रुसेट नोर्कोटाह"
      },
      {
        "English": "Ranger Russet",
        "Nepali": "रेंजर रुसेट"
      },
      {
        "English": "Red pontiac",
        "Nepali": "रातो पोन्टियाक"
      },
      {
        "English": "Kennebec",
        "Nepali": "केनेबेक"
      },
      {
        "English": "Yukon Gold",
        "Nepali": "युकोन गोल्ड"
      },
      {
        "English": "Kufri jyoti",
        "Nepali": "कुफरी ज्योति"
      },
      {
        "English": "Kufri sindhuri",
        "Nepali": "कुफरी सिन्धुरी"
      },
      {
        "English": "Kufri Chandramukhi",
        "Nepali": "कुफरी चन्द्रमुखी"
      },
      {
        "English": "Kufri Pukhraj",
        "Nepali": "कुफरी पुखराज"
      },
      {
        "English": "Kufri Khyati",
        "Nepali": "कुफरी ख्याती"
      },
      {
        "English": "Kufri Arun",
        "Nepali": "कुफरी अरुण"
      },
      {
        "English": "Kufri Surya",
        "Nepali": "कुफरी सूर्य"
      },
      {
        "English": "Kufri Kanchan",
        "Nepali": "कुफरी कञ्चन"
      },
      {
        "English": "Kufri Bahar",
        "Nepali": "कुफरी बहार"
      },
      {
        "English": "Kufri Megha",
        "Nepali": "कुफरी मेघा"
      },
      {
        "English": "Kufri jyoti",
        "Nepali": "कुफरी ज्योति"
      },
      {
        "English": "Kufri sindhuri",
        "Nepali": "कुफरी सिन्धुरी"
      },
      {
        "English": "Khumal Upahar",
        "Nepali": "खुमाल उपहार"
      },
      {
        "English": "Khumal Seto-1",
        "Nepali": "खुमाल सेतो-१"
      },
      {
        "English": "Chibesai",
        "Nepali": "चिबेसाई"
      },
      {
        "English": "Tukdah-135",
        "Nepali": "टुक्दा-१३५"
      },
      {
        "English": "Tukdah- 383",
        "Nepali": "टुक्दा- ३८३"
      },
      {
        "English": "Tukdah-78",
        "Nepali": "टुक्दा-७८"
      },
      {
        "English": "Happy Valley- 36",
        "Nepali": "ह्याप्पी भ्याली - ३६"
      },
      {
        "English": "Thurbo 3",
        "Nepali": "थर्बो ३"
      },
      {
        "English": "Sikkim 1",
        "Nepali": "सिक्किम १"
      },
      {
        "English": "Rungli 144",
        "Nepali": "रुङ्ली १४४"
      },
      {
        "English": "Kashi Aman",
        "Nepali": "काशी अमन"
      },
      {
        "English": "Pusa Ruby",
        "Nepali": "पुसा रुबी"
      },
      {
        "English": "Pusa Early Dwarf",
        "Nepali": "पुसा प्रारम्भिक बौना"
      },
      {
        "English": "Co 1",
        "Nepali": "सह १"
      },
      {
        "English": "Arka Vikas ( Sel 22 )",
        "Nepali": "अर्का विकास (सेल २२)"
      },
      {
        "English": "Arka Saurabh ( Sel - 4)",
        "Nepali": "अर्का सौरभ (सेल - ४)"
      },
      {
        "English": "Arka Ahuti ( Sel 11 )",
        "Nepali": "अर्का आहुती (सेल ११)"
      },
      {
        "English": "Arka Vardan ( FM hyb -2)",
        "Nepali": "अर्का वरदान (एफएम हाइब -२)"
      },
      {
        "English": "Arka Shreshta",
        "Nepali": "अर्का श्रेष्ठ"
      },
      {
        "English": "Round Pusa",
        "Nepali": "गोल पुसा"
      },
      {
        "English": "Pusa Hybrid -2",
        "Nepali": "पुसा हाइब्रिड -२"
      },
      {
        "English": "Pusa Red Plum",
        "Nepali": "पुसा रातो बेर"
      },
      {
        "English": "Solan Gola",
        "Nepali": "सोलन गोला"
      },
      {
        "English": "Pusa Gaurav",
        "Nepali": "पुसा गौरव"
      },
      {
        "English": "Narendra Tomato 1",
        "Nepali": "नरेन्द्र टमाटर १"
      },
      {
        "English": "Narendra Tomato 2",
        "Nepali": "नरेन्द्र टमाटर २"
      },
      {
        "English": "Bourbon",
        "Nepali": "बोर्बोन"
      },
      {
        "English": "Criollo",
        "Nepali": "क्रियोलो"
      },
      {
        "English": "Bourbon",
        "Nepali": "बोर्बोन"
      },
      {
        "English": "Bourbon",
        "Nepali": "बोर्बोन"
      },
      {
        "English": "Selection 10",
        "Nepali": "चयन १०"
      },
      {
        "English": "Abyssinia",
        "Nepali": "एबिसिनिया"
      },
      {
        "English": "Geisha(1931)",
        "Nepali": "गेशा (१९३१)"
      },
      {
        "English": "Geisha(1956)",
        "Nepali": "गेशा (१९५६)"
      },
      {
        "English": "Kudhumi/ Kurume",
        "Nepali": "कुधुमी/कुरुमे"
      },
      {
        "English": "Miqe",
        "Nepali": "माइक"
      },
      {
        "English": "Rambung",
        "Nepali": "रामबुङ"
      },
      {
        "English": "Walichu/ Wolisho",
        "Nepali": "वालिचु/वोलिशो"
      },
      {
        "English": "Yirgacheffe",
        "Nepali": "यिर्गाचेफे"
      },
      {
        "English": "Bergundal",
        "Nepali": "बर्गुन्डल"
      },
      {
        "English": "Bourbon",
        "Nepali": "बोर्बोन"
      },
      {
        "English": "Sidikalang",
        "Nepali": "सिडिकलाङ"
      },
      {
        "English": "Castillo Pueblo Bello",
        "Nepali": "कास्टिलो पुएब्लो बेलो"
      },
      {
        "English": "Bourbon",
        "Nepali": "बोर्बोन"
      },
      {
        "English": "Andong Sari",
        "Nepali": "अन्डोङ सारी"
      },
      {
        "English": "Bergundal",
        "Nepali": "बर्गुन्डल"
      },
      {
        "English": "Rambung",
        "Nepali": "रामबुङ"
      },
      {
        "English": "semperflorens",
        "Nepali": "सेम्परफ्लोरेन्स"
      },
      {
        "English": "CGKusum-1",
        "Nepali": "सीजीकुसुम-१"
      },
      {
        "English": "Malviya Kusum 305",
        "Nepali": "मालवीय कुसुम ३०५"
      },
      {
        "English": "Nag-7",
        "Nepali": "नाग-७"
      },
      {
        "English": "Nari 38",
        "Nepali": "नारी ३८"
      },
      {
        "English": "Phule Kusuma",
        "Nepali": "फुले कुसुमा"
      },
      {
        "English": "Dwarf Cavendish",
        "Nepali": "बौना क्याभेन्डिस"
      },
      {
        "English": "Neypoovan",
        "Nepali": "नेपूवन"
      },
      {
        "English": "Vayal vazhai",
        "Nepali": "व्याल वजाइ"
      },
      {
        "English": "Oolong",
        "Nepali": "ओलोङ"
      },
      {
        "English": "MY 5465",
        "Nepali": "मेरो ५४६५"
      },
      {
        "English": "SP 701284",
        "Nepali": "एसपी ७०१२८४"
      },
      {
        "English": "CoLk 94184 (Birendra)",
        "Nepali": "कोलक ९४१८४ (वीरेन्द्र)"
      },
      {
        "English": "CoOr 03151(Sabita)",
        "Nepali": "कोओर ०३१५१ (सविता)"
      },
      {
        "English": "Arad-H",
        "Nepali": "अराद-एच"
      },
      {
        "English": "Arka Kalyan",
        "Nepali": "अर्का कल्याण"
      },
      {
        "English": "Baswant 780",
        "Nepali": "बसवन्त ७८०"
      },
      {
        "English": "Bhima light red",
        "Nepali": "भीम हल्का रातो"
      },
      {
        "English": "Bhima shubra white",
        "Nepali": "भीम शुभ्र सेतो"
      },
      {
        "English": "Bhima shweta white",
        "Nepali": "भीम श्वेता सेतो"
      },
      {
        "English": "Bhima Safed",
        "Nepali": "भीम सफद"
      },
      {
        "English": "Hisar-2",
        "Nepali": "हिसार-२"
      },
      {
        "English": "Kalyanpur Red Round",
        "Nepali": "कल्याणपुर रातो राउन्ड"
      },
      {
        "English": "Phule Safeed",
        "Nepali": "फुले सुरक्षित"
      },
      {
        "English": "Phule Survana",
        "Nepali": "फुले सर्वाण"
      },
      {
        "English": "Phule Swarna",
        "Nepali": "फुले स्वर्ण"
      },
      {
        "English": "Pusa Madhavi",
        "Nepali": "पुसा माधवी"
      },
      {
        "English": "Pusa Ratnar",
        "Nepali": "पुसा रत्नार"
      },
      {
        "English": "Pusa Red",
        "Nepali": "पुसा रातो"
      },
      {
        "English": "Pusa white flat",
        "Nepali": "पुसा सेतो फ्लैट"
      },
      {
        "English": "Pusa White Round",
        "Nepali": "पुसा सेतो गोल"
      },
      {
        "English": "Udaipur -101",
        "Nepali": "उदयपुर - १०१"
      },
      {
        "English": "Udaipur -102",
        "Nepali": "उदयपुर - १०२"
      },
      {
        "English": "Adi",
        "Nepali": "आदि"
      },
      {
        "English": "Abasena",
        "Nepali": "अबसेना"
      },
      {
        "English": "Kelafo-74",
        "Nepali": "केलाफो-७४"
      },
      {
        "English": "Mehado-80",
        "Nepali": "महेदो-८०"
      },
      {
        "English": "E",
        "Nepali": "इ"
      },
      {
        "English": "Humera-1",
        "Nepali": "हुमेरा-१"
      },
      {
        "English": "Setit-1",
        "Nepali": "सेट-१"
      },
      {
        "English": "Shawarobit",
        "Nepali": "शावारोबिट"
      },
      {
        "English": "Pusa Vishal ML-818",
        "Nepali": "पुसा विशाल एमएल-८१८"
      },
      {
        "English": "Vaibhav",
        "Nepali": "वैभव"
      },
      {
        "English": "Pusa kalyani",
        "Nepali": "पुसा कल्याणी"
      },
      {
        "English": "Patan 66",
        "Nepali": "पाटन ६६"
      },
      {
        "English": "Gujrat sarsav - 1",
        "Nepali": "गुजरात सरसव - १"
      },
      {
        "English": "Qinyou- 10",
        "Nepali": "किनयो - १०"
      },
      {
        "English": "Amelando",
        "Nepali": "अमेलान्डो"
      },
      {
        "English": "Trinitario",
        "Nepali": "त्रिनिटारियो"
      },
      {
        "English": "Tiiti",
        "Nepali": "तिति"
      },
      {
        "English": "Hokuo",
        "Nepali": "होकुओ"
      },
      {
        "English": "Zenyatta",
        "Nepali": "जेन्याटा"
      },
      {
        "English": "Mohawk",
        "Nepali": "मोहक"
      },
      {
        "English": "Nemkat",
        "Nepali": "नेमकट"
      },
      {
        "English": "TV 23",
        "Nepali": "टिभी २३"
      },
      {
        "English": "Black Cat (06252)",
        "Nepali": "कालो बिरालो (०६२५२)"
      },
      {
        "English": "Barakat ( 90 )",
        "Nepali": "बरकत (९०)"
      },
      {
        "English": "Barac ( 67 ) Acala",
        "Nepali": "बराक (६७) अकाला"
      },
      {
        "English": "Siddig ( Sudan Pima)",
        "Nepali": "सिद्दिग (सुडान पिमा)"
      },
      {
        "English": "Siokra 1-4",
        "Nepali": "सिओक्रा १-४"
      },
      {
        "English": "Bikaneri Nerma",
        "Nepali": "बिकानेरी नेरमा"
      },
      {
        "English": "Eknath",
        "Nepali": "एकनाथ"
      },
      {
        "English": "Khandwa-2",
        "Nepali": "खाण्डवा-२"
      },
      {
        "English": "Badnawar-1",
        "Nepali": "बदनावार-१"
      },
      {
        "English": "Supriya",
        "Nepali": "सुप्रिया"
      },
      {
        "English": "Oker",
        "Nepali": "ओकर"
      },
      {
        "English": "Erlin",
        "Nepali": "एर्लिन"
      },
      {
        "English": "Cabai rawit",
        "Nepali": "केबाइ रवित"
      },
      {
        "English": "Cabai keriting",
        "Nepali": "क्याबाइ केरिटिंग"
      },
      {
        "English": "cayenne pepper(hottest chilli)",
        "Nepali": "लाल मिर्च (सबैभन्दा तातो खुर्सानी)"
      },
      {
        "English": "cabai ceremai",
        "Nepali": "क्याबाइ सेरेमाई"
      },
      {
        "English": "Bengkulu",
        "Nepali": "बेङ्कुलु"
      },
      {
        "English": "lembang",
        "Nepali": "लेम्बाङ"
      },
      {
        "English": "jwala",
        "Nepali": "ज्वाला"
      },
      {
        "English": "sangli sannam",
        "Nepali": "सांगली सन्म"
      },
      {
        "English": "G.T.sannam",
        "Nepali": "जी.टी.सनम"
      },
      {
        "English": "Bibb lettuce",
        "Nepali": "बिब सलाद"
      },
      {
        "English": "little gem lettuce",
        "Nepali": "सानो मणि सलाद"
      },
      {
        "English": "dwarf cavendish",
        "Nepali": "बौना क्याभेन्डिस"
      },
      {
        "English": "Raja bagus banana",
        "Nepali": "राजा बगस केरा"
      },
      {
        "English": "Jackfruit banana",
        "Nepali": "ज्याकफ्रुट केरा"
      },
      {
        "English": "Ebenezer",
        "Nepali": "इबेनेजर"
      },
      {
        "English": "Mercury",
        "Nepali": "बुध"
      },
      {
        "English": "Bhima Super",
        "Nepali": "भीम सुपर"
      },
      {
        "English": "Bhima Dark Red",
        "Nepali": "भीम गाढा रातो"
      },
      {
        "English": "Bhima Shweta",
        "Nepali": "भीम श्वेता"
      },
      {
        "English": "Pusa Madhv",
        "Nepali": "पुसा माधव"
      },
      {
        "English": "Raj 171",
        "Nepali": "राज १७१"
      },
      {
        "English": "ALFAMASTER 10",
        "Nepali": "अल्फामास्टर १०"
      },
      {
        "English": "Titan5",
        "Nepali": "टाइटन ५"
      },
      {
        "English": "sf force11",
        "Nepali": "एसएफ बल ११"
      },
      {
        "English": "SARDI 10",
        "Nepali": "सार्डी १०"
      },
      {
        "English": "HERITAGE 10",
        "Nepali": "हेरिटेज १०"
      },
      {
        "English": "ALFAMASTER 11",
        "Nepali": "अल्फामास्टर ११"
      },
      {
        "English": "Jersey wakefield",
        "Nepali": "जर्सी वेकफिल्ड"
      },
      {
        "English": "Pusa Drum Head",
        "Nepali": "पुसा ड्रम हेड"
      },
      {
        "English": "Pusa Mukta",
        "Nepali": "पुसा मुक्त"
      },
      {
        "English": "SAMSORG 45",
        "Nepali": "सामसर्ग ४५"
      },
      {
        "English": "SAMSORG 46",
        "Nepali": "सामसर्ग ४६"
      },
      {
        "English": "SAMSORG 47",
        "Nepali": "सामसर्ग ४७"
      },
      {
        "English": "SAMSORG 48",
        "Nepali": "सामसर्ग ४८"
      },
      {
        "English": "Pusa Vishal ML-818",
        "Nepali": "पुसा विशाल एमएल-८१८"
      },
      {
        "English": "Vaibhav",
        "Nepali": "वैभव"
      },
      {
        "English": "Shawarobit",
        "Nepali": "शावारोबिट"
      },
      {
        "English": "Qinyou- 10",
        "Nepali": "किनयो - १०"
      },
      {
        "English": "Pusa kalyani",
        "Nepali": "पुसा कल्याणी"
      },
      {
        "English": "Patan 66",
        "Nepali": "पाटन ६६"
      },
      {
        "English": "Gujrat sarsav - 1",
        "Nepali": "गुजरात सरसव - १"
      },
      {
        "English": "Kupang Malay",
        "Nepali": "कुपाङ मलय"
      },
      {
        "English": "Black cat (06252)",
        "Nepali": "कालो बिरालो (०६२५२)"
      },
      {
        "English": "Dorshapo",
        "Nepali": "दोर्सापो"
      },
      {
        "English": "PAU Baramasi-1",
        "Nepali": "पीएयू बारामासी-१"
      },
      {
        "English": "Gondhoraj",
        "Nepali": "गन्धोराज"
      },
      {
        "English": "Pat Nebu",
        "Nepali": "पाट नेबु"
      },
      {
        "English": "Kaji nemu",
        "Nepali": "काजी नेमु"
      },
      {
        "English": "Gol nemu",
        "Nepali": "गोल नेमु"
      },
      {
        "English": "BO 128 (Pramod)",
        "Nepali": "बीओ १२८ (प्रमोद)"
      },
      {
        "English": "Co-1",
        "Nepali": "को-१"
      },
      {
        "English": "Co-2",
        "Nepali": "को-२"
      },
      {
        "English": "Granex 429",
        "Nepali": "ग्रैनेक्स 429"
      },
      {
        "English": "Granex 55",
        "Nepali": "ग्रैनेक्स 55"
      },
      {
        "English": "HA 60",
        "Nepali": "एचए ६०"
      },
      {
        "English": "N 2-4-1",
        "Nepali": "एन २-४-१"
      },
      {
        "English": "N-257-9-1",
        "Nepali": "एन-२५७-९-१"
      },
      {
        "English": "N-53",
        "Nepali": "एन ५३"
      },
      {
        "English": "NHRDF Red",
        "Nepali": "एनएचआरडीएफ रेड"
      },
      {
        "English": "NHRDF Red 2",
        "Nepali": "एनएचआरडीएफ रेड २"
      },
      {
        "English": "NHRDF Red3",
        "Nepali": "एनएचआरडीएफ रेड ३"
      },
      {
        "English": "NHRDF Red4",
        "Nepali": "एनएचआरडीएफ रेड ४"
      },
      {
        "English": "S-48",
        "Nepali": "एस-४८"
      },
      {
        "English": "Tana F1",
        "Nepali": "ताना एफ१"
      },
      {
        "English": "VL-3",
        "Nepali": "भिएल-३"
      },
      {
        "English": "OC 671",
        "Nepali": "ओसी ६७१"
      },
      {
        "English": "COC 771",
        "Nepali": "सीओसी ७७१"
      },
      {
        "English": "COC 772",
        "Nepali": "सीओसी ७७२"
      },
      {
        "English": "COC 773",
        "Nepali": "सीओसी ७७३"
      },
      {
        "English": "COC 8001 (C 66191)",
        "Nepali": "सीओसी ८००१ (सी ६६१९१)"
      },
      {
        "English": "COC 774",
        "Nepali": "सीओसी ७७४"
      },
      {
        "English": "COC 775",
        "Nepali": "सीओसी ७७५"
      },
      {
        "English": "COC 776",
        "Nepali": "सीओसी ७७६"
      },
      {
        "English": "COC 777",
        "Nepali": "सीओसी ७७७"
      },
      {
        "English": "COC 778",
        "Nepali": "सीओसी ७७८"
      },
      {
        "English": "COC 779",
        "Nepali": "सीओसी ७७९"
      },
      {
        "English": "CO 419",
        "Nepali": "सीओ ४१९"
      },
      {
        "English": "CO 6304",
        "Nepali": "सीओ ६३०४"
      },
      {
        "English": "COC 8001",
        "Nepali": "सीओसी ८००१"
      },
      {
        "English": "COC 85061",
        "Nepali": "सीओसी ८५०६१"
      },
      {
        "English": "COC 86062",
        "Nepali": "सीओसी ८६०६२"
      },
      {
        "English": "COSi 86071",
        "Nepali": "सीओसी ८६०७१"
      },
      {
        "English": "COC 90063",
        "Nepali": "सीओसी ९००६३"
      },
      {
        "English": "CO 8021",
        "Nepali": "सीओ ८०२१"
      },
      {
        "English": "COC 91061",
        "Nepali": "सीओसी ९१०६१"
      },
      {
        "English": "COC 92061",
        "Nepali": "सीओसी ९२०६१"
      },
      {
        "English": "CO 8362",
        "Nepali": "सीओ ८३६२"
      },
      {
        "English": "COG 93076",
        "Nepali": "सीओजी ९३०७६"
      },
      {
        "English": "CO 8208",
        "Nepali": "सीओ ८२०८"
      },
      {
        "English": "COG 94077",
        "Nepali": "सीओजी ९४०७७"
      },
      {
        "English": "COG 95076",
        "Nepali": "सीओजी ९५०७६"
      },
      {
        "English": "CO 85019",
        "Nepali": "सीओ ८५०१९"
      },
      {
        "English": "COSi 95071",
        "Nepali": "सीओसी ९५०७१"
      },
      {
        "English": "COSi 96071",
        "Nepali": "सीओसी ९६०७१"
      },
      {
        "English": "CO 86010",
        "Nepali": "सीओ ८६०१०"
      },
      {
        "English": "COC 98061",
        "Nepali": "सीओसी ९८०६१"
      },
      {
        "English": "COSi 98071",
        "Nepali": "सीओसी ९८०७१"
      },
      {
        "English": "CO 86249",
        "Nepali": "सीओ ८६२४९"
      },
      {
        "English": "COC 99061",
        "Nepali": "कोसी ९९०६१"
      },
      {
        "English": "CO 86032",
        "Nepali": "को ८६०३२"
      },
      {
        "English": "COC (SC) 22",
        "Nepali": "कोसी (एससी) २२"
      },
      {
        "English": "CO Si (SC) 6",
        "Nepali": "को सी (एससी) ६"
      },
      {
        "English": "COG (SC) 5",
        "Nepali": "कोजी (एससी) ५"
      },
      {
        "English": "CoC 23",
        "Nepali": "कोसी २३"
      },
      {
        "English": "CoC 24",
        "Nepali": "कोसी २४"
      },
      {
        "English": "TNAU SC Si 7",
        "Nepali": "टीएनएयू एससी सी ७"
      },
      {
        "English": "TNAU SC Si 8",
        "Nepali": "टीएनएयू एससी सी ८"
      },
      {
        "English": "Co 0118 (Karan-2)",
        "Nepali": "को ०११८ (करण-२)"
      },
      {
        "English": "Co 0124 (Karan-5)",
        "Nepali": "को ०१२४ (करण-५)"
      },
      {
        "English": "Co 0218 (Shreyas)",
        "Nepali": "को ०२१८ (श्रेयस)"
      },
      {
        "English": "Co 0232 (Kamal)",
        "Nepali": "को ०२३२ (कमल)"
      },
      {
        "English": "Co 0233 (Kosi)",
        "Nepali": "को ०२३३ (कोसी)"
      },
      {
        "English": "Co 0237 (Karan-8)",
        "Nepali": "को ०२३७ (करण-८)"
      },
      {
        "English": "Co 0238 (Karan-4)",
        "Nepali": "को ०२३८ (करण-४)"
      },
      {
        "English": "Co 0239 (Karan-6)",
        "Nepali": "को ०२३९ (करण-६)"
      },
      {
        "English": "Co 0403 (Samriddhi)",
        "Nepali": "को ०४०३ (समृद्धि)"
      },
      {
        "English": "Co 05009 (Karan-10)",
        "Nepali": "को ०५००९ (करण-१०)"
      },
      {
        "English": "Co 05011 (Karan-9)",
        "Nepali": "को ०५०११ (करण-९)"
      },
      {
        "English": "Co 06027",
        "Nepali": "को ०६०२७"
      },
      {
        "English": "Co 06030",
        "Nepali": "को ०६०३०"
      },
      {
        "English": "Co 09022 (Karan 12)",
        "Nepali": "को ०९०२२ (करण १२)"
      },
      {
        "English": "Co 2001-13 (Sulabh)",
        "Nepali": "को २००१-१३ (सुलभ)"
      },
      {
        "English": "Co 2001-15 (Mangal)",
        "Nepali": "को २००१-१५ (मंगल)"
      },
      {
        "English": "Co 8371 (Bhima)",
        "Nepali": "को ८३७१ (भिम)"
      },
      {
        "English": "Co 85004 (Prabha)",
        "Nepali": "को ८५००४ (प्रभा)"
      },
      {
        "English": "Co 86032 (Nayana)",
        "Nepali": "को ८६०३२ (नयना)"
      },
      {
        "English": "Co 86249 (Bhavani)",
        "Nepali": "को ८६२४९ (भवानी)"
      },
      {
        "English": "Co 87025 (Kalyani)",
        "Nepali": "को ८७०२५ (कल्याणी)"
      },
      {
        "English": "Co 87044 (Uttara)",
        "Nepali": "को ८७०४४ (उत्तरा)"
      },
      {
        "English": "Co 87263 (Sarayu)",
        "Nepali": "को ८७२६३ (सरयू)"
      },
      {
        "English": "Co 87268 (Moti)",
        "Nepali": "को ८७२६८ (मोती)"
      },
      {
        "English": "Co 89029 (Gandak)",
        "Nepali": "को ८९०२९ (गण्डक)"
      },
      {
        "English": "Co 91010 (Dhanush)",
        "Nepali": "को ९१०१० (धनुष)"
      },
      {
        "English": "Co 94008 (Shyama)",
        "Nepali": "को ९४००८ (श्यामा)"
      },
      {
        "English": "Co 98014 (Karan-1)",
        "Nepali": "को ९८०१४ (करण-१)"
      },
      {
        "English": "Co 99004 (Damodar)",
        "Nepali": "को ९९००४ (दामोदर)"
      },
      {
        "English": "CoC 01061 (CoC (SC) 23)",
        "Nepali": "कोसी ०१०६१ (कोसी (एससी) २३)"
      },
      {
        "English": "CoH 119 (Haryana Ganna - 119)",
        "Nepali": "कोह ११९ (हरियाणा गन्ना - ११९)"
      },
      {
        "English": "CoH 128",
        "Nepali": "कोह १२८"
      },
      {
        "English": "CoH 2201 (Haryana-92)",
        "Nepali": "कोह २२०१ (हरियाणा-९२)"
      },
      {
        "English": "CoH 92201(Haryana-92)",
        "Nepali": "कोह ९२२०१ (हरियाणा-९२)"
      },
      {
        "English": "CoJ 20193 (CoJ 89)",
        "Nepali": "कोजे २०१९३ (कोजे ८९)"
      },
      {
        "English": "CoM 88121 (Krishna)",
        "Nepali": "कोम ८८१२१ (कृष्णा)"
      },
      {
        "English": "CoP 06436 (CoP 2061)",
        "Nepali": "कोप ०६४३६ (कोप २०६१)"
      },
      {
        "English": "CoPant 90223 (Pant 90223)",
        "Nepali": "कोपान्ट ९०२२३ (पान्ट ९०२२३)"
      },
      {
        "English": "CoPant 97222",
        "Nepali": "कोपान्ट ९७२२२"
      },
      {
        "English": "CoPk 05191 (Pratap Ganna-1)",
        "Nepali": "कोप्क ०५१९१ (प्रताप गन्ना-१)"
      },
      {
        "English": "CoS 1230 (Raseeli)",
        "Nepali": "कोसी १२३० (रसीली)"
      },
      {
        "English": "CoS 91230 (Raseeli)",
        "Nepali": "कोएस ९१२३० (रसीली)"
      },
      {
        "English": "CoS 94270 (Sweta)",
        "Nepali": "कोएस ९४२७० (स्वेता)"
      },
      {
        "English": "CoS 96268 (Mithas)",
        "Nepali": "कोएस ९६२६८ (मिठास)"
      },
      {
        "English": "CoS 96275 (Sweety)",
        "Nepali": "कोएस ९६२७५ (स्वीटी)"
      },
      {
        "English": "CoSe 01421 (Imarti)",
        "Nepali": "कोसे ०१४२१ (इमर्ती)"
      },
      {
        "English": "CoSe 92423 (Rajbhog)",
        "Nepali": "कोसे ९२४२३ (राजभोग)"
      },
      {
        "English": "CoSe 95255 (Rachna)",
        "Nepali": "कोसे ९५२५५ (रचना)"
      },
      {
        "English": "CoSe 95422 (Rasbhari)",
        "Nepali": "कोसे ९५४२२ (रसभरी)"
      },
      {
        "English": "CoSe 96234 (Rashmi)",
        "Nepali": "कोसे ९६२३४ (रश्मि)"
      },
      {
        "English": "CoSe 96436 (Jalpari)",
        "Nepali": "कोसे ९६४३६ (जलपरी)"
      },
      {
        "English": "CoSnk 05103",
        "Nepali": "कोसंक ०५१०३"
      },
      {
        "English": "CoSnk 05104",
        "Nepali": "कोसंक ०५१०४"
      },
      {
        "English": "A-2",
        "Nepali": "ए-२"
      },
      {
        "English": "A-300",
        "Nepali": "ए-३००"
      },
      {
        "English": "AKS-207",
        "Nepali": "एकेएस-२०७"
      },
      {
        "English": "Annigeri-1(A-1)",
        "Nepali": "अन्निगेरी-१ (ए-१)"
      },
      {
        "English": "DSH-129",
        "Nepali": "डीएसएच-१२९"
      },
      {
        "English": "DSH-185",
        "Nepali": "डीएसएच-१८५"
      },
      {
        "English": "IGKV Kusum (RSS 2016-03)",
        "Nepali": "आईजीकेभी कुसुम (आरएसएस २०१६-०३)"
      },
      {
        "English": "ISF-1",
        "Nepali": "आईएसएफ-१"
      },
      {
        "English": "ISF-764",
        "Nepali": "आईएसएफ-७६४"
      },
      {
        "English": "JSF-1",
        "Nepali": "जेएसएफ-१"
      },
      {
        "English": "JSF-97",
        "Nepali": "जेएसएफ-९७"
      },
      {
        "English": "JSF-99",
        "Nepali": "जेएसएफ-९९"
      },
      {
        "English": "JSI-7",
        "Nepali": "जेएसआई-७"
      },
      {
        "English": "JSI-73",
        "Nepali": "जेएसआई-७३"
      },
      {
        "English": "Lakshmi Priya (ISF 764)",
        "Nepali": "लक्ष्मी प्रिया (आईएसएफ ७६४)"
      },
      {
        "English": "MKH-11",
        "Nepali": "एमकेएच-११"
      },
      {
        "English": "MRSA-521",
        "Nepali": "एमआरएसए-५२१"
      },
      {
        "English": "N-62-8",
        "Nepali": "एन-६२-८"
      },
      {
        "English": "NARI-57",
        "Nepali": "नारी-५७"
      },
      {
        "English": "NARI-6",
        "Nepali": "नारी-६"
      },
      {
        "English": "NARI-96",
        "Nepali": "नारी-९६"
      },
      {
        "English": "NARI-H-15",
        "Nepali": "नारी-एच-१५"
      },
      {
        "English": "NARI-H-23",
        "Nepali": "नारी-एच-२३"
      },
      {
        "English": "NARI-NH-1",
        "Nepali": "नारी-एन-एच-१"
      },
      {
        "English": "PBNS-12",
        "Nepali": "पीबीएनएस-१२"
      },
      {
        "English": "PBNS-40",
        "Nepali": "पीबीएनएस-४०"
      },
      {
        "English": "PKV-Pink",
        "Nepali": "पीकेभी-पिङ्क"
      },
      {
        "English": "Pride (ISF 1)",
        "Nepali": "प्राइड (आईएसएफ १)"
      },
      {
        "English": "S-144",
        "Nepali": "एस-१४४"
      },
      {
        "English": "SSF-12-40",
        "Nepali": "एसएसएफ-१२-४०"
      },
      {
        "English": "SSF-13-71",
        "Nepali": "एसएसएफ-१३-७१"
      },
      {
        "English": "SSF-658",
        "Nepali": "एसएसएफ-६५८"
      },
      {
        "English": "SSF-708",
        "Nepali": "एसएसएफ-७०८"
      },
      {
        "English": "TSF-1",
        "Nepali": "टीएसएफ-१"
      },
      {
        "English": "Type-6503",
        "Nepali": "टाइप-६५०३"
      },
      {
        "English": "CC93-7711",
        "Nepali": "सीसी९३-७७११"
      },
      {
        "English": "CC93-7510",
        "Nepali": "सीसी९३-७५१०"
      },
      {
        "English": "CC01-1940",
        "Nepali": "सीसी०१-१९४०"
      },
      {
        "English": "CC84-75",
        "Nepali": "सिसी८४-७५"
      },
      {
        "English": "RD 7511",
        "Nepali": "आरडी ७५११"
      },
      {
        "English": "PR 61-632",
        "Nepali": "पीआर ६१-६३२"
      },
      {
        "English": "CO 421",
        "Nepali": "सीओ ४२१"
      },
      {
        "English": "POJ-2878",
        "Nepali": "पीओजे-२८७८"
      },
      {
        "English": "PR 11-41",
        "Nepali": "पीआर ११-४१"
      },
      {
        "English": "MZC 74-275",
        "Nepali": "एमजेडसी ७४-२७५"
      },
      {
        "English": "PR 62-66",
        "Nepali": "पीआर ६२-६६"
      },
      {
        "English": "UB 1/2",
        "Nepali": "यूबी १/२"
      },
      {
        "English": "UB 15/10",
        "Nepali": "यूबी १५/१०"
      },
      {
        "English": "UB 881-5",
        "Nepali": "यूबी ८८१-५"
      },
      {
        "English": "UB 477-2",
        "Nepali": "यूबी ४७७-२"
      },
      {
        "English": "BRS Purus",
        "Nepali": "बीआरएस पुरुष"
      },
      {
        "English": "TME 419",
        "Nepali": "टीएमई ४१९"
      },
      {
        "English": "F100",
        "Nepali": "एफ१००"
      },
      {
        "English": "Gbasumenge",
        "Nepali": "जीबसुमेन्गे"
      },
      {
        "English": "Ofumbachai",
        "Nepali": "ओफुम्बाचै"
      },
      {
        "English": "Icilcil",
        "Nepali": "इचिल्चिल"
      },
      {
        "English": "Ebwanaterak",
        "Nepali": "एब्वानाटेरक"
      },
      {
        "English": "NASE 14",
        "Nepali": "नासे १४"
      },
      {
        "English": "NASE 3",
        "Nepali": "नासे ३"
      },
      {
        "English": "NASE 1",
        "Nepali": "नासे १"
      },
      {
        "English": "Ccoito",
        "Nepali": "क्कोइतो"
      },
      {
        "English": "Salcedo INIA",
        "Nepali": "साल्सेडो इनिया"
      },
      {
        "English": "Illpa INIA",
        "Nepali": "इल्पा इनिया"
      },
      {
        "English": "INIA 415 - Pasankalla",
        "Nepali": "इनिया ४१५ - पासनकल्ला"
      },
      {
        "English": "INIA 420-Negra Collana",
        "Nepali": "इनिया ४२०-नेग्रा कोल्लाना"
      },
      {
        "English": "INIA 427 - Amarilla",
        "Nepali": "इनिया ४२७ - अमरिल्ला"
      },
      {
        "English": "INIA 431-Altiplano",
        "Nepali": "इनिया ४३१-अल्टिप्लानो"
      },
      {
        "English": "INIA 441- Senor del Huerto",
        "Nepali": "इनिया ४४१- सेन्योर देल हुएर्तो"
      },
      {
        "English": "13D843",
        "Nepali": "१३डी८४३"
      },
      {
        "English": "14G498",
        "Nepali": "१४जी४९८"
      },
      {
        "English": "13G519",
        "Nepali": "१३जी५१९"
      },
      {
        "English": "BRS 213",
        "Nepali": "बीआरएस २१३"
      },
      {
        "English": "BRS 282",
        "Nepali": "बीआरएस २८२"
      },
      {
        "English": "SL 958",
        "Nepali": "एसएल ९५८"
      },
      {
        "English": "SL 744",
        "Nepali": "एसएल ७४४"
      },
      {
        "English": "SL 525",
        "Nepali": "एसएल ५२५"
      },
      {
        "English": "DM6563 IPRO",
        "Nepali": "डीएम ६५६३ आईपीरो"
      },
      {
        "English": "DM 5958",
        "Nepali": "डीएम ५९५८"
      },
      {
        "English": "22-61 RY",
        "Nepali": "२२-६१ आरवाई"
      },
      {
        "English": "P005T13R",
        "Nepali": "पी००५टी१३आर"
      },
      {
        "English": "NSC Leroy RR2Y",
        "Nepali": "एनएससी लेरोय आरआर२वाई"
      },
      {
        "English": "UA 5612",
        "Nepali": "यूए ५६१२"
      },
      {
        "English": "JTN 5503",
        "Nepali": "जेटीएन ५५०३"
      },
      {
        "English": "AG 6534",
        "Nepali": "एजी ६५३४"
      },
      {
        "English": "BMX Garra",
        "Nepali": "बीएमएक्स गर्रा"
      },
      {
        "English": "BMX Icone",
        "Nepali": "बीएमएक्स आइकन"
      },
      {
        "English": "Monsoy M5892",
        "Nepali": "मोनसोय एम५८९२"
      },
      {
        "English": "AFS 110RR",
        "Nepali": "एएफएस ११०आरआर"
      },
      {
        "English": "TMG 7262 RR",
        "Nepali": "तिएमजी ७२६२ आरआर"
      },
      {
        "English": "BRS 284",
        "Nepali": "बीआरएस २८४"
      },
      {
        "English": "BRS 267",
        "Nepali": "बीआरएस २६७"
      },
      {
        "English": "Chianung 242",
        "Nepali": "चियानंग २४२"
      },
      {
        "English": "CH 45",
        "Nepali": "सीएच ४५"
      },
      {
        "English": "RH 245",
        "Nepali": "आरएच २४५"
      },
      {
        "English": "Bisi 222",
        "Nepali": "बिसी २२२"
      },
      {
        "English": "NK 7328",
        "Nepali": "एनके ७३२८"
      },
      {
        "English": "PV 61177 SRR",
        "Nepali": "पीवी ६११७७ एसआरआर"
      },
      {
        "English": "PV 61180 RIB",
        "Nepali": "पीवी ६११८० रिब"
      },
      {
        "English": "TH6079 VT2P",
        "Nepali": "टीएच ६०७९ भीटी२पी"
      },
      {
        "English": "PV 60172 RR",
        "Nepali": "पीवी ६०१७२ आरआर"
      },
      {
        "English": "Agroceres 303",
        "Nepali": "एग्रोसेरेस ३०३"
      },
      {
        "English": "C 929",
        "Nepali": "सी ९२९"
      },
      {
        "English": "Himalayan 123",
        "Nepali": "हिमालयन १२३"
      },
      {
        "English": "C6006",
        "Nepali": "सी६००६"
      },
      {
        "English": "Col 17",
        "Nepali": "कोल १७"
      },
      {
        "English": "Dl 507",
        "Nepali": "डीएल ५०७"
      },
      {
        "English": "N 7822",
        "Nepali": "एन ७८२२"
      },
      {
        "English": "SRM 553",
        "Nepali": "एसआरएम ५५३"
      },
      {
        "English": "T7677 VT2P",
        "Nepali": "टी७६७७ भीटी२पी"
      },
      {
        "English": "T2889 CONV",
        "Nepali": "टी२८८९ कन्व"
      },
      {
        "English": "T6107 VT2P",
        "Nepali": "टी६१०७ भीटी२पी"
      },
      {
        "English": "UH 615",
        "Nepali": "यूएच ६१५"
      },
      {
        "English": "H 517",
        "Nepali": "एच ५१७"
      },
      {
        "English": "Longe 1",
        "Nepali": "लोंगे १"
      },
      {
        "English": "Longe 4",
        "Nepali": "लोंगे ४"
      },
      {
        "English": "Longe 6H",
        "Nepali": "लोंगे ६एच"
      },
      {
        "English": "Longe 8H",
        "Nepali": "लोंगे ८एच"
      },
      {
        "English": "PAN 67",
        "Nepali": "प्यान ६७"
      },
      {
        "English": "DK 8051",
        "Nepali": "डीके ८०५१"
      },
      {
        "English": "DK 803 1",
        "Nepali": "डीके ८०३ १"
      },
      {
        "English": "UH 5402",
        "Nepali": "यूएच ५४०२"
      },
      {
        "English": "WE 2101",
        "Nepali": "डब्ल्यूई २१०१"
      },
      {
        "English": "PAN 7 M - 89",
        "Nepali": "प्यान ७ एम - ८९"
      },
      {
        "English": "BPI",
        "Nepali": "बीपीआई"
      },
      {
        "English": "R12",
        "Nepali": "आर १२"
      },
      {
        "English": "Criolla Ocarina",
        "Nepali": "क्रिओला ओकरीना"
      },
      {
        "English": "Luk’ys Ch’oqhepitus",
        "Nepali": "लुक्य्स च'ओखेपिटुस"
      },
      {
        "English": "AAC Shirley",
        "Nepali": "एएसी शर्ली"
      },
      {
        "English": "AAC Canada Gold Doree",
        "Nepali": "एएसी कैनडा गोल्ड दोरी"
      },
      {
        "English": "Russet Burbank",
        "Nepali": "रसेट बरबैंक"
      },
      {
        "English": "MS 42.3",
        "Nepali": "एमएस ४२.३"
      },
      {
        "English": "IPY -8",
        "Nepali": "आईपीवाई -८"
      },
      {
        "English": "Ct First",
        "Nepali": "सीटी फर्स्ट"
      },
      {
        "English": "PV 40",
        "Nepali": "पीवी ४०"
      },
      {
        "English": "PV 1",
        "Nepali": "पीवी १"
      },
      {
        "English": "AV 2",
        "Nepali": "एवी २"
      },
      {
        "English": "Dannock durn 668",
        "Nepali": "डैनोक डर्न ६६८"
      },
      {
        "English": "Dannock durn 777",
        "Nepali": "डैनोक डर्न ७७७"
      },
      {
        "English": "Pusa 120",
        "Nepali": "पूसा १२०"
      },
      {
        "English": "S-152",
        "Nepali": "एस-१५२"
      },
      {
        "English": "HS 102",
        "Nepali": "एचएस १०२"
      },
      {
        "English": "Arka Ashish ( IIHR - 674 )",
        "Nepali": "अर्का आशीष ( IIHR - ६७४ )"
      },
      {
        "English": "Arka Abha ( BWR 1)",
        "Nepali": "अर्का अभा ( बीडब्ल्यूआर १ )"
      },
      {
        "English": "Arka Alok ( BER - 5 )",
        "Nepali": "अर्का आलोक ( बीईआर - ५ )"
      },
      {
        "English": "Arka Vishal ( FM HYB -1)",
        "Nepali": "अर्का विशाल ( एफएम हाइब्रिड - १ )"
      },
      {
        "English": "Arka Abhijit ( BRH 2)",
        "Nepali": "अर्का अभिजित ( बीआरएच २ )"
      },
      {
        "English": "HS101",
        "Nepali": "एचएस १०१"
      },
      {
        "English": "Pusa Hybrid - 4",
        "Nepali": "पूसा हाइब्रिड - ४"
      },
      {
        "English": "Pant T-10",
        "Nepali": "पैंटी-१०"
      },
      {
        "English": "Pant T-3",
        "Nepali": "पैंटी-३"
      },
      {
        "English": "AC-238",
        "Nepali": "एसी-२३८"
      },
      {
        "English": "Catuai",
        "Nepali": "कैटुआई"
      },
      {
        "English": "SL 28",
        "Nepali": "एसएल २८"
      },
      {
        "English": "SL 14",
        "Nepali": "एसएल १४"
      },
      {
        "English": "KP 423",
        "Nepali": "केपी ४२३"
      },
      {
        "English": "selection 9/Sln.9/S.2790",
        "Nepali": "चयन ९/एसएलन.९/एस.२७९०"
      },
      {
        "English": "S795",
        "Nepali": "एस ७९५"
      },
      {
        "English": "Selection 7.3/ Sln.7.3",
        "Nepali": "चयन ७.३/एसएलन.७.३"
      },
      {
        "English": "Selection 6/Sln.6",
        "Nepali": "चयन ६/एसएलन.६"
      },
      {
        "English": "Selection 4/ Sln.4",
        "Nepali": "चयन ४/एसएलन.४"
      },
      {
        "English": "S288",
        "Nepali": "एस २८८"
      },
      {
        "English": "RAB C15",
        "Nepali": "आरएबी सी१५"
      },
      {
        "English": "Jember S795",
        "Nepali": "जेम्बर एस ७९५"
      },
      {
        "English": "cioccie / Choche",
        "Nepali": "चोसी / चोचे"
      },
      {
        "English": "USDA/USDA762",
        "Nepali": "यूएसडीए / यूएसडीए७६२"
      },
      {
        "English": "Hibrido de Timor (HDT) Tim Tim",
        "Nepali": "हिब्रिडो डे तिमोर (एचडीटी) तिम तिम"
      },
      {
        "English": "catuai",
        "Nepali": "कतुआई"
      },
      {
        "English": "IAPAR59",
        "Nepali": "आईएपीएआर ५९"
      },
      {
        "English": "jember S795",
        "Nepali": "जेम्बर एस ७९५"
      },
      {
        "English": "obata rojo",
        "Nepali": "ओबाटा रोजो"
      },
      {
        "English": "303/577 tea clone",
        "Nepali": "३०३/५७७ चाय क्लोन"
      },
      {
        "English": "6/8 tea clone",
        "Nepali": "६/८ चाय क्लोन"
      },
      {
        "English": "31/8 tea clone",
        "Nepali": "३१/८ चाय क्लोन"
      },
      {
        "English": "108/82 tea clone",
        "Nepali": "१०८/८२ चाय क्लोन"
      },
      {
        "English": "100/5 tea clone.",
        "Nepali": "१००/५ चाय क्लोन"
      },
      {
        "English": "CC 85-92",
        "Nepali": "सीसी ८५-९२"
      },
      {
        "English": "CC 84-75",
        "Nepali": "सीसी ८४-७५"
      },
      {
        "English": "V 71-51",
        "Nepali": "वी ७१-५१"
      },
      {
        "English": "CC 93-3895",
        "Nepali": "सीसी ९३-३८९५"
      },
      {
        "English": "CC 93-4418",
        "Nepali": "सीसी ९३-४४१८"
      },
      {
        "English": "CC 92-2198",
        "Nepali": "सीसी ९२-२१९८"
      },
      {
        "English": "CC 93-7510",
        "Nepali": "सीसी ९३-७५१०"
      },
      {
        "English": "CC 92-2804",
        "Nepali": "सीसी ९२-२८०४"
      },
      {
        "English": "CC 87-434",
        "Nepali": "सीसी ८७-४३४"
      },
      {
        "English": "Co 421",
        "Nepali": "को ४२१"
      },
      {
        "English": "CC 93-4181",
        "Nepali": "सीसी ९३-४१८१"
      },
      {
        "English": "CC 93-3826",
        "Nepali": "सीसी ९३-३८२६"
      },
      {
        "English": "CC 87-505",
        "Nepali": "सीसी ८७-५०५"
      },
      {
        "English": "CC 85-57",
        "Nepali": "सीसी ८५-५७"
      },
      {
        "English": "CC 85-47",
        "Nepali": "सीसी ८५-४७"
      },
      {
        "English": "CC 92-2154",
        "Nepali": "सीसी ९२-२१५४"
      },
      {
        "English": "CC 92-2188",
        "Nepali": "सीसी ९२-२१८८"
      },
      {
        "English": "CC 93-3817",
        "Nepali": "सीसी ९३-३८१७"
      },
      {
        "English": "CC 93-7711",
        "Nepali": "सीसी ९३-७७११"
      },
      {
        "English": "CC 01-1940",
        "Nepali": "सीसी ०१-१९४०"
      },
      {
        "English": "PR 1141",
        "Nepali": "पीआर ११४१"
      },
      {
        "English": "CC 86-45",
        "Nepali": "सीसी ८६-४५"
      },
      {
        "English": "Agrifound Dark Red",
        "Nepali": "एग्रीफाउंड डार्क रेड"
      },
      {
        "English": "Agrifound Light Red",
        "Nepali": "एग्रीफाउंड लाइट रेड"
      },
      {
        "English": "Agrifound Red",
        "Nepali": "एग्रीफाउंड रेड"
      },
      {
        "English": "Agrifound Rose",
        "Nepali": "एग्रीफाउंड रोज"
      },
      {
        "English": "Agrifound White",
        "Nepali": "एग्रीफाउंड व्हाइट"
      },
      {
        "English": "sjkjkjk",
        "Nepali": "स्जकजकजक"
      },
      {
        "English": "xyz",
        "Nepali": "एक्सवाईजेड"
      },
      {
        "English": "T-85",
        "Nepali": "टी-८५"
      },
      {
        "English": "MH-97-6(Boreda)",
        "Nepali": "एमएच-९७-६ (बोरेडा)"
      },
      {
        "English": "Rasa N - 26",
        "Nepali": "रासा एन - २६"
      },
      {
        "English": "NLV- 1",
        "Nepali": "एनएलवी- १"
      },
      {
        "English": "Narendra Mung-1 LGG-460",
        "Nepali": "नरेन्द्र मूंग-१ एलजीजी-४६०"
      },
      {
        "English": "SML-668",
        "Nepali": "एसएमएल-६६८"
      },
      {
        "English": "RMG-492",
        "Nepali": "आरएमजी-४९२"
      },
      {
        "English": "IPM-02-3",
        "Nepali": "आईपीएम-०२-३"
      },
      {
        "English": "HUM-16",
        "Nepali": "एचयूएम-१६"
      },
      {
        "English": "AKM-4",
        "Nepali": "एकेएम-४"
      },
      {
        "English": "PKV-Green Gold",
        "Nepali": "पीकेवी-ग्रीन गोल्ड"
      },
      {
        "English": "AKM-8802",
        "Nepali": "एकेएम-८८०२"
      },
      {
        "English": "BRSMG Camaleao",
        "Nepali": "बीआरएसएमजी कैमलिओ"
      },
      {
        "English": "Ouro Verde MG 2",
        "Nepali": "ओरो वेर्दे एमजी २"
      },
      {
        "English": "MGS Esmeralda",
        "Nepali": "एमजीएस एस्मेराल्डा"
      },
      {
        "English": "PBN - 2002",
        "Nepali": "पीबीएन - २००२"
      },
      {
        "English": "GSL - 1",
        "Nepali": "जीएसएल - १"
      },
      {
        "English": "HNS - 3",
        "Nepali": "एचएनएस - ३"
      },
      {
        "English": "PBN - 9501",
        "Nepali": "पीबीएन - ९५०१"
      },
      {
        "English": "PBN - 9502",
        "Nepali": "पीबीएन - ९५०२"
      },
      {
        "English": "PBN - 2001",
        "Nepali": "पीबीएन - २००१"
      },
      {
        "English": "GSL - 441",
        "Nepali": "जीएसएल - ४४१"
      },
      {
        "English": "HNS - 4",
        "Nepali": "एचएनएस - ४"
      },
      {
        "English": "Fengyou - 737",
        "Nepali": "फेंगयू - ७३७"
      },
      {
        "English": "Youyan - 10",
        "Nepali": "यौयन - १०"
      },
      {
        "English": "CS 117",
        "Nepali": "सीएस ११७"
      },
      {
        "English": "CS 123",
        "Nepali": "सीएस १२३"
      },
      {
        "English": "CS 141",
        "Nepali": "सीएस १४१"
      },
      {
        "English": "CATIE-R1",
        "Nepali": "कैटी-आर१"
      },
      {
        "English": "CATIE-R4",
        "Nepali": "कैटी-आर४"
      },
      {
        "English": "CC-137",
        "Nepali": "सीसी-१३७"
      },
      {
        "English": "ICS-95 T1",
        "Nepali": "आईसीएस-९५ टी१"
      },
      {
        "English": "PMCT-58",
        "Nepali": "पीएमसीटी-५८"
      },
      {
        "English": "CRIN TC-2",
        "Nepali": "क्रिन टीसी-२"
      },
      {
        "English": "CRIN TC-1",
        "Nepali": "क्रिन टीसी-१"
      },
      {
        "English": "CRIN TC-3",
        "Nepali": "क्रिन टीसी-३"
      },
      {
        "English": "CRIN TC-5",
        "Nepali": "क्रिन टीसी-५"
      },
      {
        "English": "BH 1146",
        "Nepali": "बीएच ११४६"
      },
      {
        "English": "Esmeralda 86",
        "Nepali": "एस्मेराल्डा ८६"
      },
      {
        "English": "JF 90",
        "Nepali": "जेएफ ९०"
      },
      {
        "English": "BR 18 Terena",
        "Nepali": "बीआर १८ टेरेना"
      },
      {
        "English": "Itasca",
        "Nepali": "इटास्का"
      },
      {
        "English": "Bottinia II",
        "Nepali": "बोटिनिया II"
      },
      {
        "English": "Winnetou",
        "Nepali": "विनेटौ"
      },
      {
        "English": "AmeriStand 201T",
        "Nepali": "अमेरिस्टैंड २०१टी"
      },
      {
        "English": "AmeriStand 435TQ RR",
        "Nepali": "अमेरिस्टैंड ४३५टीक्यू आरआर"
      },
      {
        "English": "AmeriStand 318TQ",
        "Nepali": "अमेरिस्टैंड ३१८टीक्यू"
      },
      {
        "English": "AmeriStand 419LH Brand",
        "Nepali": "अमेरिस्टैंड ४१९एलएच ब्रांड"
      },
      {
        "English": "AmeriStand 420LH RR Brand",
        "Nepali": "अमेरिस्टैंड ४२०एलएच आरआर ब्रांड"
      },
      {
        "English": "AmeriStand 480 HVXRR",
        "Nepali": "अमेरिस्टैंड ४८० हीवीएक्सआरआर"
      },
      {
        "English": "AmeriStand 481 HVXRR",
        "Nepali": "अमेरिस्टैंड ४८१ हीवीएक्सआरआर"
      },
      {
        "English": "AmeriStand 445NT",
        "Nepali": "अमेरिस्टैंड ४४५एनटी"
      },
      {
        "English": "AmeriStand 457TQ RR",
        "Nepali": "अमेरिस्टैंड ४५७टीक्यू आरआर"
      },
      {
        "English": "AmeriStand 415NT RR",
        "Nepali": "अमेरिस्टैंड ४१५एनटी आरआर"
      },
      {
        "English": "AmeriStand 416NT RR",
        "Nepali": "अमेरिस्टैंड ४१६एनटी आरआर"
      },
      {
        "English": "AmeriStand 427TQ",
        "Nepali": "अमेरिस्टैंड ४२७टीक्यू"
      },
      {
        "English": "AmeriStand 446NT",
        "Nepali": "अमेरिस्टैंड ४४६एनटी"
      },
      {
        "English": "AmeriStand 428TQ",
        "Nepali": "अमेरिस्टैंड ४२८टीक्यू"
      },
      {
        "English": "AmeriStand 455TQ RR",
        "Nepali": "अमेरिस्टैंड ४५५टीक्यू आरआर"
      },
      {
        "English": "AmeriStand 518NT",
        "Nepali": "अमेरिस्टैंड ५१८एनटी"
      },
      {
        "English": "KP4",
        "Nepali": "केपी ४"
      },
      {
        "English": "KG2",
        "Nepali": "केजी २"
      },
      {
        "English": "TV1",
        "Nepali": "टीवी १"
      },
      {
        "English": "TV14",
        "Nepali": "टीवी १४"
      },
      {
        "English": "TV16",
        "Nepali": "टीवी १६"
      },
      {
        "English": "TV17",
        "Nepali": "टीवी १७"
      },
      {
        "English": "TV20",
        "Nepali": "टीवी २०"
      },
      {
        "English": "TV22",
        "Nepali": "टीवी २२"
      },
      {
        "English": "UPASI 9  (Arthrey)",
        "Nepali": "यूपीएसआई ९ (अर्थ्रे)"
      },
      {
        "English": "UPASI 1 (Ever green)",
        "Nepali": "यूपीएसआई १ (एवर ग्रीन)"
      },
      {
        "English": "UPASI 10 (Pandian)",
        "Nepali": "यूपीएसआई १० (पांडियन)"
      },
      {
        "English": "UPASI 14 (Singara)",
        "Nepali": "यूपीएसआई १४ (सिंगारा)"
      },
      {
        "English": "UPASI 2 (Jayaram)",
        "Nepali": "यूपीएसआई २ (जयराम)"
      },
      {
        "English": "UPASI 17 (Swarna)",
        "Nepali": "यूपीएसआई १७ (स्वर्ण)"
      },
      {
        "English": "UPASI 24",
        "Nepali": "यूपीएसआई २४"
      },
      {
        "English": "UPASI 25",
        "Nepali": "यूपीएसआई २५"
      },
      {
        "English": "UPASI 16",
        "Nepali": "यूपीएसआई १६"
      },
      {
        "English": "UPASI 27",
        "Nepali": "यूपीएसआई २७"
      },
      {
        "English": "UPASI 28 (UPASI 10 * TRI2025)",
        "Nepali": "यूपीएसआई २८ (यूपीएसआई १० * ट्राई २०२५)"
      },
      {
        "English": "Cheyenne E448",
        "Nepali": "चेयेन ई४४८"
      },
      {
        "English": "GS 12",
        "Nepali": "जीएस १२"
      },
      {
        "English": "Nairouz (TH 99806)",
        "Nepali": "नैरोज (टीएच ९९८०६)"
      },
      {
        "English": "Tomaland (TH 01308)",
        "Nepali": "टोमालैंड (टीएच ०१३०८)"
      },
      {
        "English": "Tyrmes",
        "Nepali": "तायरमेस"
      },
      {
        "English": "S.209",
        "Nepali": "एस.209"
      },
      {
        "English": "PPP.1-2",
        "Nepali": "पीपीपी.१-२"
      },
      {
        "English": "ROC-1",
        "Nepali": "आरओसी-१"
      },
      {
        "English": "SS33",
        "Nepali": "एसएस३३"
      },
      {
        "English": "S.Q-5",
        "Nepali": "एस.क्यू-५"
      },
      {
        "English": "PET-8",
        "Nepali": "पेट-८"
      },
      {
        "English": "END-1",
        "Nepali": "एन्ड-१"
      },
      {
        "English": "EUR.2-2",
        "Nepali": "यूईआर.२-२"
      },
      {
        "English": "VF-145",
        "Nepali": "वीएफ-१४५"
      },
      {
        "English": "UCX-281",
        "Nepali": "यूसीएक्स-२८१"
      },
      {
        "English": "BHN 589 (V FF T)*",
        "Nepali": "बीएचएन ५८९ (वी एफ एफ टी)*"
      },
      {
        "English": "Celebrity (V FF N T A St)",
        "Nepali": "सेलिब्रिटी (वी एफ एफ एन टी ए स्ट)"
      },
      {
        "English": "Albar ( 57 ) 12 and Acrain",
        "Nepali": "अल्बार (५७) १२ र एक्रैन"
      },
      {
        "English": "Hamid ( BB - 82)",
        "Nepali": "हामिद (बीबी - ८२)"
      },
      {
        "English": "Knight ( BB - 90)",
        "Nepali": "नाइट (बीबी - ९०)"
      },
      {
        "English": "BGRR y Guaraní INTA BGRR",
        "Nepali": "बीजीआरआर वाय ग्वारनी इंटा बीजीआरआर"
      },
      {
        "English": "Pora 3 INTA BGRR",
        "Nepali": "पोरा ३ इंटा बीजीआरआर"
      },
      {
        "English": "Guazuncho 4 INTA BGRR",
        "Nepali": "गुज़ुनचो ४ इंटा बीजीआरआर"
      },
      {
        "English": "Guazuncho 2000 RR",
        "Nepali": "गुज़ुनचो २००० आरआर"
      },
      {
        "English": "DP402 BGRR",
        "Nepali": "डीपी४०२ बीजीआरआर"
      },
      {
        "English": "DP1238 BGRR",
        "Nepali": "डीपी१२३८ बीजीआरआर"
      },
      {
        "English": "Siokra L23",
        "Nepali": "सिओक्रा एल२३"
      },
      {
        "English": "Siokra V-16",
        "Nepali": "सिओक्रा वी-१६"
      },
      {
        "English": "Sicala V-2",
        "Nepali": "सिकाला वी-२"
      },
      {
        "English": "CS50",
        "Nepali": "सीएस५०"
      },
      {
        "English": "Sicot 189",
        "Nepali": "सिकॉट १८९"
      },
      {
        "English": "Sicot F-1",
        "Nepali": "सिकॉट एफ-१"
      },
      {
        "English": "CNPA ITA 90",
        "Nepali": "सीएनपीए आईटीए ९०"
      },
      {
        "English": "BRS ITA 96",
        "Nepali": "बीआरएस आईटीए ९६"
      },
      {
        "English": "CNPA ITA 97",
        "Nepali": "सीएनपीए आईटीए ९७"
      },
      {
        "English": "BRS ANTARES",
        "Nepali": "बीआरएस अंतरेस"
      },
      {
        "English": "BRS 286",
        "Nepali": "बीआरएस २८६"
      },
      {
        "English": "BRS ITA⁄BA",
        "Nepali": "बीआरएस आईटीए/बीए"
      },
      {
        "English": "BRS SUCUPIRA",
        "Nepali": "बीआरएस सुकुपिरा"
      },
      {
        "English": "DP 1646 B2XF",
        "Nepali": "डीपी १६४६ बी२एक्सएफ"
      },
      {
        "English": "DP 1840 B3XF",
        "Nepali": "डीपी १८४० बी३एक्सएफ"
      },
      {
        "English": "DP 1820 B3XF",
        "Nepali": "डीपी १८२० बी३एक्सएफ"
      },
      {
        "English": "DP 1845 B3XF",
        "Nepali": "डीपी १८४५ बी३एक्सएफ"
      },
      {
        "English": "NG 5711 B3XF",
        "Nepali": "एनजी ५७११ बी३एक्सएफ"
      },
      {
        "English": "NG 3406 B2XF",
        "Nepali": "एनजी ३४०६ बी२एक्सएफ"
      },
      {
        "English": "NG 4545 B2XF",
        "Nepali": "एनजी ४५४५ बी२एक्सएफ"
      },
      {
        "English": "NG 4936",
        "Nepali": "एनजी ४९३६ बी३एक्सएफ"
      },
      {
        "English": "B3XF",
        "Nepali": "पीएचवाई ४००"
      },
      {
        "English": "PHY 400",
        "Nepali": "पीएचवाई ४४४ डब्ल्यूआरएफ"
      },
      {
        "English": "PHY 444 WRF",
        "Nepali": "पीएचवाई ४८० डब्ल्यू३एफई"
      },
      {
        "English": "PHY 480 W3FE",
        "Nepali": "पीएचवाई ३५० डब्ल्यू३एफई"
      },
      {
        "English": "PHY 350 W3FE",
        "Nepali": "डब्ल्यू३एफई"
      },
      {
        "English": "W3FE",
        "Nepali": "एलएच ९००"
      },
      {
        "English": "LH 900",
        "Nepali": "एफ४१४"
      },
      {
        "English": "F414",
        "Nepali": "एफ 414"
      },
      {
        "English": "F 505",
        "Nepali": "एफ 505"
      },
      {
        "English": "H 777",
        "Nepali": "एच 777"
      },
      {
        "English": "RS-810",
        "Nepali": "आरएस-८१०"
      },
      {
        "English": "G-cot -12",
        "Nepali": "जी-कॉट -१२"
      },
      {
        "English": "MCU- 5VT",
        "Nepali": "एमसीयू-५वीटी"
      },
      {
        "English": "LK-861",
        "Nepali": "एलके-८६१"
      },
      {
        "English": "IHCAFE-90",
        "Nepali": "आईएचसीएफई-९०"
      },
      {
        "English": "Pacas",
        "Nepali": "पाकास"
      },
      {
        "English": "S-541",
        "Nepali": "एस-५४१"
      },
      {
        "English": "S-200",
        "Nepali": "एस-२००"
      },
      {
        "English": "S-400",
        "Nepali": "एस-४००"
      },
      {
        "English": "LBGB-77",
        "Nepali": "एलबीजीबी-७७"
      },
      {
        "English": "RIO DULCE INTA",
        "Nepali": "रियो डुल्से इंटा"
      },
      {
        "English": "IPORA GUAZU",
        "Nepali": "इपोरा गुआज़ू"
      },
      {
        "English": "LBH-8-INTA",
        "Nepali": "एलबीएच-८-इंटा"
      },
      {
        "English": "LB-66-INTA",
        "Nepali": "एलबी-६६-इंटा"
      },
      {
        "English": "S-208",
        "Nepali": "एस-२०८"
      },
      {
        "English": "C/W 4440",
        "Nepali": "सी/डब्ल्यू ४४४०"
      },
      {
        "English": "S-317",
        "Nepali": "एस-३१७"
      },
      {
        "English": "Mt.3697",
        "Nepali": "माउंटेन ३६९७"
      },
      {
        "English": "Cabai gendot",
        "Nepali": "कबाई गेंडोट"
      },
      {
        "English": "cabai katokkon",
        "Nepali": "कबाई कटोक्कोन"
      },
      {
        "English": "cabai domba",
        "Nepali": "कबाई डोम्बा"
      },
      {
        "English": "cabai hiyung",
        "Nepali": "कबाई हियुंग"
      },
      {
        "English": "lampung",
        "Nepali": "लम्पुंग"
      },
      {
        "English": "jalapeno",
        "Nepali": "जलापेनो"
      },
      {
        "English": "co1",
        "Nepali": "सीओ१"
      },
      {
        "English": "k1",
        "Nepali": "के१"
      },
      {
        "English": "hindupur-s7",
        "Nepali": "हिंदुपुर-एस७"
      },
      {
        "English": "tadappally",
        "Nepali": "तड़प्पली"
      },
      {
        "English": "sattur-s4",
        "Nepali": "सत्तुर-एस४"
      },
      {
        "English": "Batavia lettuce",
        "Nepali": "बटेविया लेट्यूस"
      },
      {
        "English": "pisang",
        "Nepali": "पिसांग"
      },
      {
        "English": "RB867515",
        "Nepali": "आरबी८६७५१५"
      },
      {
        "English": "RB966928",
        "Nepali": "आरबी९६६९२८"
      },
      {
        "English": "SP81-3250",
        "Nepali": "एसपी८१-३२५०"
      },
      {
        "English": "Yellow Queen F1",
        "Nepali": "येलो क्वीन एफ१"
      },
      {
        "English": "N-2-4-1",
        "Nepali": "एन-२-४-१"
      },
      {
        "English": "S-148",
        "Nepali": "एस-१४८"
      },
      {
        "English": "PHB 2884",
        "Nepali": "पीएचबी २८८४"
      },
      {
        "English": "PHB 2168",
        "Nepali": "पीएचबी २१६८"
      },
      {
        "English": "PSB 164",
        "Nepali": "पीएसबी १६४"
      },
      {
        "English": "PCB 164",
        "Nepali": "पीसीबी १६४"
      },
      {
        "English": "Stamina gt5",
        "Nepali": "स्टेमिना जीटी५"
      },
      {
        "English": "titan7",
        "Nepali": "टाइटन७"
      },
      {
        "English": "303/557 clone",
        "Nepali": "३०३/५५७ क्लोन"
      },
      {
        "English": "11/4 clone",
        "Nepali": "११/४ क्लोन"
      },
      {
        "English": "108/82 clone",
        "Nepali": "१०८/८२ क्लोन"
      },
      {
        "English": "7/9 clone",
        "Nepali": "७/९ क्लोन"
      },
      {
        "English": "100/5 clone",
        "Nepali": "१००/५ क्लोन"
      },
      {
        "English": "31/8 clone",
        "Nepali": "३१/८ क्लोन"
      },
      {
        "English": "12/19 clone",
        "Nepali": "१२/१९ क्लोन"
      },
      {
        "English": "12/12 clone",
        "Nepali": "१२/१२ क्लोन"
      },
      {
        "English": "6/8 clone",
        "Nepali": "६/८ क्लोन"
      },
      {
        "English": "6/10 clone",
        "Nepali": "६/१० क्लोन"
      },
      {
        "English": "31/11 clone",
        "Nepali": "३१/११ क्लोन"
      },
      {
        "English": "Nyelungkup",
        "Nepali": "न्येलुंगकप"
      },
      {
        "English": "PAU Baramasi",
        "Nepali": "पौ बारामासी"
      },
      {
        "English": "Bourbon",
        "Nepali": "बोर्बोन"
      },
      {
        "English": "TV 1",
        "Nepali": "टिभी १"
      },
      {
        "English": "Kopati 1",
        "Nepali": "कोपाटी १"
      },
      {
        "English": "C x R",
        "Nepali": "सी एक्स आर"
      },
      {
        "English": "Maragogipe",
        "Nepali": "मारागोगीपे"
      },
      {
        "English": "Bourbon/ moka",
        "Nepali": "बोर्बोन/मोका"
      },
      {
        "English": "karpoora poovan",
        "Nepali": "कर्पुर पूवन"
      },
      {
        "English": "Basrai",
        "Nepali": "बसराई"
      },
      {
        "English": "Singapuri",
        "Nepali": "सिङ्गापुरी"
      },
      {
        "English": "Chakrakeli",
        "Nepali": "चक्रकेली"
      },
      {
        "English": "Mundo Nova (Silang Typica-Bourbon from Brazil)",
        "Nepali": "मुन्डो नोभा (ब्राजिलबाट सिलाङ टाइपिका-बोर्बोन)"
      },
      {
        "English": "Catimor Lines (Andungsari Ateng Jaluk Kartika/Catuai/Katai - mix breed arabica-robusta).",
        "Nepali": "काटिमोर लाइन्स (अन्दुंगसरी एटेङ्ग जालुक कार्तिक/काटुआई/कटाई - मिक्स नस्ल अरेबिका-रोबस्टा)।"
      },
      {
        "English": "Agata",
        "Nepali": "अगाटा"
      },
      {
        "English": "Arabigo",
        "Nepali": "अरबिगो"
      },
      {
        "English": "Arusha",
        "Nepali": "आरुषा"
      },
      {
        "English": "Batian",
        "Nepali": "बाटियन"
      },
      {
        "English": "Benguet",
        "Nepali": "बेन्गुएट"
      },
      {
        "English": "Bergendal",
        "Nepali": "बर्गेन्डल"
      },
      {
        "English": "Bergundal Aka Garundang",
        "Nepali": "बर्गुन्डल उर्फ ​​गरुनडाङ"
      },
      {
        "English": "Bernardina",
        "Nepali": "बर्नार्डिना"
      },
      {
        "English": "Blawan Paumah",
        "Nepali": "ब्लवान पौमाह"
      },
      {
        "English": "Blue Mountain",
        "Nepali": "निलो पहाड"
      },
      {
        "English": "Bonifieur",
        "Nepali": "बोनिफायर"
      },
      {
        "English": "Bourbon Chocolá",
        "Nepali": "बोर्बोन चोकोला"
      },
      {
        "English": "Cera",
        "Nepali": "सेरा"
      },
      {
        "English": "Chickumalgur",
        "Nepali": "चिकुमलगुर"
      },
      {
        "English": "Coorgs",
        "Nepali": "कुर्ग्स"
      },
      {
        "English": "Culi Arabica",
        "Nepali": "कुली अरेबिका"
      },
      {
        "English": "Djimma",
        "Nepali": "जिम्मा"
      },
      {
        "English": "Emerald",
        "Nepali": "पन्ना"
      },
      {
        "English": "French Mission",
        "Nepali": "फ्रान्सेली मिशन"
      },
      {
        "English": "Gesha",
        "Nepali": "गेशा"
      },
      {
        "English": "Guatemala",
        "Nepali": "ग्वाटेमाला"
      },
      {
        "English": "Ibairi",
        "Nepali": "इबैरी"
      },
      {
        "English": "Jackson 2/1257",
        "Nepali": "ज्याक्सन २/१२५७"
      },
      {
        "English": "Kalossi",
        "Nepali": "कालोसी"
      },
      {
        "English": "Kona",
        "Nepali": "कोना"
      },
      {
        "English": "Laurina",
        "Nepali": "लौरिना"
      },
      {
        "English": "Lintong",
        "Nepali": "लिन्टोङ"
      },
      {
        "English": "Maracaturra",
        "Nepali": "माराकातुरा"
      },
      {
        "English": "Mayaguez",
        "Nepali": "मायागुएज"
      },
      {
        "English": "Mibirizi",
        "Nepali": "मिबिरिजी"
      },
      {
        "English": "Mocha/Mokka",
        "Nepali": "मोचा/मोक्का"
      },
      {
        "English": "Nyasaland",
        "Nepali": "न्यासाल्याण्ड"
      },
      {
        "English": "Old Chiks",
        "Nepali": "पुरानो चिक्स"
      },
      {
        "English": "Onix",
        "Nepali": "ओनिक्स"
      },
      {
        "English": "Orange Bourbon",
        "Nepali": "सुन्तला बोर्बोन"
      },
      {
        "English": "Ouro Bronze",
        "Nepali": "ओरो कांस्य"
      },
      {
        "English": "Pink Bourbon",
        "Nepali": "गुलाबी बोर्बोन"
      },
      {
        "English": "Pluma Hidalgo",
        "Nepali": "प्लुमा हिडाल्गो"
      },
      {
        "English": "Pop3303/21",
        "Nepali": "पप३३०३/२१"
      },
      {
        "English": "Red Bourbon",
        "Nepali": "रातो बोर्बोन"
      },
      {
        "English": "Rosa Morena",
        "Nepali": "रोजा मोरेना"
      },
      {
        "English": "Ruiru 11",
        "Nepali": "रुइरु ११"
      },
      {
        "English": "Safira",
        "Nepali": "सफिरा"
      },
      {
        "English": "Sagada",
        "Nepali": "सागडा"
      },
      {
        "English": "San Bernardo Aka Pache",
        "Nepali": "सान बर्नार्डो उर्फ ​​पाचे"
      },
      {
        "English": "San Ramon",
        "Nepali": "सान रामोन"
      },
      {
        "English": "Santos",
        "Nepali": "सान्तोस"
      },
      {
        "English": "Selection 9",
        "Nepali": "चयन ९"
      },
      {
        "English": "Sulawesi",
        "Nepali": "सुलावेसी"
      },
      {
        "English": "Sumatra",
        "Nepali": "सुमात्रा"
      },
      {
        "English": "Sumatra Lintong",
        "Nepali": "सुमात्रा लिन्टोङ"
      },
      {
        "English": "Tekisic",
        "Nepali": "टेकिसिक"
      },
      {
        "English": "Topazio",
        "Nepali": "टोपाजियो"
      },
      {
        "English": "Toraja",
        "Nepali": "तोराजा"
      },
      {
        "English": "Turmalina",
        "Nepali": "तुर्मलिना"
      },
      {
        "English": "Turquesa",
        "Nepali": "टर्केसा"
      },
      {
        "English": "Venecia",
        "Nepali": "भेनेसिया"
      },
      {
        "English": "Villa Sarchi",
        "Nepali": "विला सार्ची"
      },
      {
        "English": "Villalobos",
        "Nepali": "भिल्लालोबोस"
      },
      {
        "English": "Yellow Bourbon",
        "Nepali": "पहेंलो बोर्बोन"
      },
      {
        "English": "Culi Robusta",
        "Nepali": "कुली रोबस्टा"
      },
      {
        "English": "Jasli",
        "Nepali": "जसली"
      },
      {
        "English": "Kapeng Alamid",
        "Nepali": "कपेङ अलामिद"
      },
      {
        "English": "Kopi Luwak",
        "Nepali": "कोपी लुवाक"
      },
      {
        "English": "Nemaya",
        "Nepali": "नेमाया"
      },
      {
        "English": "Pandi",
        "Nepali": "पाण्डी"
      },
      {
        "English": "Pawi",
        "Nepali": "पवी"
      },
      {
        "English": "Rakimin",
        "Nepali": "रकिमिन"
      },
      {
        "English": "Wayanaad",
        "Nepali": "वायनाड"
      },
      {
        "English": "Kape Barako",
        "Nepali": "केपे बाराको"
      },
      {
        "English": "Abyssinia 3",
        "Nepali": "एबिसिनिया ३"
      },
      {
        "English": "Arabusta",
        "Nepali": "अरबस्ता"
      },
      {
        "English": "Arla",
        "Nepali": "अर्ला"
      },
      {
        "English": "Ateng",
        "Nepali": "एटेङ"
      },
      {
        "English": "Bogor Prada",
        "Nepali": "बोगोर प्राडा"
      },
      {
        "English": "Casiopea",
        "Nepali": "क्यासियोपिया"
      },
      {
        "English": "Castillo",
        "Nepali": "कास्टिलो"
      },
      {
        "English": "Catigua",
        "Nepali": "क्याटिगुआ"
      },
      {
        "English": "Catrenic",
        "Nepali": "क्याट्रेनिक"
      },
      {
        "English": "Evaluna",
        "Nepali": "इभालुना"
      },
      {
        "English": "Fronton",
        "Nepali": "फ्रन्टन"
      },
      {
        "English": "Gayo Satu",
        "Nepali": "गयो सातु"
      },
      {
        "English": "Hibrido De Timor",
        "Nepali": "हिब्रिडो डे टिमोर"
      },
      {
        "English": "Icafe 95",
        "Nepali": "आइकाफे ९५"
      },
      {
        "English": "Komasti",
        "Nepali": "कोमस्ती"
      },
      {
        "English": "Lempira",
        "Nepali": "लेम्पिरा"
      },
      {
        "English": "Limani",
        "Nepali": "लिमानी"
      },
      {
        "English": "Maracatu",
        "Nepali": "माराकातु"
      },
      {
        "English": "Milenio",
        "Nepali": "मिलेनियो"
      },
      {
        "English": "Mundo Maya",
        "Nepali": "मुन्डो माया"
      },
      {
        "English": "Nayarita",
        "Nepali": "नायरिता"
      },
      {
        "English": "Obata",
        "Nepali": "ओबाटा"
      },
      {
        "English": "Parainema",
        "Nepali": "पराइनेमा"
      },
      {
        "English": "Sigarar Utang",
        "Nepali": "सिगारर उटाङ"
      },
      {
        "English": "Starmaya",
        "Nepali": "स्टारमाया"
      },
      {
        "English": "Tabi",
        "Nepali": "ताबी"
      },
      {
        "English": "Timor",
        "Nepali": "तिमोर"
      },
      {
        "English": "Variedad Colombia",
        "Nepali": "भेरिडाड कोलम्बिया"
      },
      {
        "English": "Gs 12",
        "Nepali": "जीएस १२"
      },
      {
        "English": "Egyptian giant",
        "Nepali": "इजिप्टको विशाल"
      },
      {
        "English": "End-1",
        "Nepali": "अन्त्य-१"
      },
      {
        "English": "Pakmor-b",
        "Nepali": "पाकमोर- बि"
      },
      {
        "English": "Mountain fresh plus",
        "Nepali": "माउन्टेन ताजा प्लस"
      },
      {
        "English": "Mountain spring",
        "Nepali": "पहाडी वसन्त"
      },
      {
        "English": "Big beef",
        "Nepali": "ठूलो मासु"
      },
      {
        "English": "Boxcar willie",
        "Nepali": "बक्सकार विली"
      },
      {
        "English": "Mortgage lifter",
        "Nepali": "धितो लिफ्टर"
      },
      {
        "English": "Red pearl",
        "Nepali": "रातो मोती"
      },
      {
        "English": "Sun gold",
        "Nepali": "सूर्य सुन"
      },
      {
        "English": "Barac ( 67 ) acala",
        "Nepali": "बराक (६७) अकाला"
      },
      {
        "English": "Siddig ( sudan pima)",
        "Nepali": "सिद्दिग (सुडान पिमा)"
      },
      {
        "English": "Hadi ( okra - leaf barakat )",
        "Nepali": "हाडी (भिंडी - पात बराकत)"
      },
      {
        "English": "Serere albar type uganda (satu)",
        "Nepali": "सेरेरे अल्बार प्रकार युगान्डा (सतु)"
      },
      {
        "English": "Nuopal rr",
        "Nepali": "नुपाल आर"
      },
      {
        "English": "Sicot f-1",
        "Nepali": "सिकोट एफ-१"
      },
      {
        "English": "Ng 4936",
        "Nepali": "अंक ४९३६"
      },
      {
        "English": "Bikaneri nerma",
        "Nepali": "बिकानेरी नेरमा"
      },
      {
        "English": "Maran",
        "Nepali": "मारन"
      },
      {
        "English": "Nadia",
        "Nepali": "नादिया"
      },
      {
        "English": "Karakkal",
        "Nepali": "कराक्कल"
      },
      {
        "English": "Ernad Chernad",
        "Nepali": "एर्नाड चेरनाड"
      },
      {
        "English": "China",
        "Nepali": "चीन"
      },
      {
        "English": "Rio-De-Janeiro",
        "Nepali": "रियो-डि-जेनेरियो"
      },
      {
        "English": "Sleeva Local",
        "Nepali": "स्लिभा स्थानीय"
      },
      {
        "English": "Narasapattam",
        "Nepali": "नरसपट्टम"
      },
      {
        "English": "Varadha",
        "Nepali": "वरधा"
      },
      {
        "English": "Himachal",
        "Nepali": "हिमाचल"
      },
      {
        "English": "IISR",
        "Nepali": "आईआईएसआर"
      },
      {
        "English": "Dusehri",
        "Nepali": "दशहरी"
      },
      {
        "English": "Alphanso",
        "Nepali": "अल्फान्सो"
      },
      {
        "English": "LANGRA",
        "Nepali": "लान्ग्रा"
      },
      {
        "English": "Amarpali",
        "Nepali": "अमरपाली"
      },
      {
        "English": "Mallika",
        "Nepali": "मल्लिका"
      },
      {
        "English": "Bombay green",
        "Nepali": "बम्बई हरियो"
      },
      {
        "English": "Fazli",
        "Nepali": "फजली"
      },
      {
        "English": "Samarbehisht  Chausa",
        "Nepali": "समरबहिष्ट चौसा"
      },
      {
        "English": "Neelam",
        "Nepali": "नीलम"
      },
      {
        "English": "Sindhu",
        "Nepali": "सिन्धु"
      },
      {
        "English": "Arka aruna",
        "Nepali": "अर्का अरुणा"
      },
      {
        "English": "Arka Puneet",
        "Nepali": "अर्का पुनीत"
      },
      {
        "English": "Early kunwar",
        "Nepali": "प्रारम्भिक कुँवर"
      },
      {
        "English": "Early Synthetic",
        "Nepali": "प्रारम्भिक सिंथेटिक"
      },
      {
        "English": "Pusa Katki",
        "Nepali": "पुसा कटकी"
      },
      {
        "English": "Pant Gobhi-2",
        "Nepali": "पन्त गोभी-२"
      },
      {
        "English": "Pant Gobhi-3",
        "Nepali": "पन्त गोभी-३"
      },
      {
        "English": "Pusa Synthetic",
        "Nepali": "पुसा सिंथेटिक"
      },
      {
        "English": "Pant Shubhra",
        "Nepali": "पन्त शुभ्रा"
      },
      {
        "English": "Punjab Giant-26",
        "Nepali": "पञ्जाब जायन्ट-२६"
      },
      {
        "English": "Pusa Snowball-1",
        "Nepali": "पुसा स्नोबल-१"
      },
      {
        "English": "Pusa Snowball-2",
        "Nepali": "पुसा स्नोबल-२"
      },
      {
        "English": "Sonwball-16",
        "Nepali": "सोनबल-१६"
      },
      {
        "English": "Dania Kalimpong",
        "Nepali": "डानिया कालिम्पोङ"
      },
      {
        "English": "BUCK MAXIFLOR",
        "Nepali": "बक म्याक्सिफ्लोर"
      },
      {
        "English": "SURSEM ORION",
        "Nepali": "सुरसेम ओरियन"
      },
      {
        "English": "Light Speckled Kidney Bean",
        "Nepali": "हल्का दाग भएको किडनी बीन"
      },
      {
        "English": "Dark Red Kidney Bean",
        "Nepali": "गाढा रातो किडनी बीन"
      },
      {
        "English": "Pink Kidney Bean",
        "Nepali": "गुलाबी किडनी बीन"
      },
      {
        "English": "Yellow Kidney Beans",
        "Nepali": "पहेंलो किडनी बीन्स"
      },
      {
        "English": "Malviya - 137",
        "Nepali": "मालवीय - १३७"
      },
      {
        "English": "Arun",
        "Nepali": "अरुण"
      },
      {
        "English": "VL Rajma 125",
        "Nepali": "वीएल राजमा १२५"
      },
      {
        "English": "Arka Komal",
        "Nepali": "अर्का कोमल"
      },
      {
        "English": "Ooty-1",
        "Nepali": "उटी-१"
      },
      {
        "English": "Pusa Himalatha",
        "Nepali": "पुसा हिमालथा"
      },
      {
        "English": "Pusa Parvati",
        "Nepali": "पुसा पार्वती"
      },
      {
        "English": "Phule Surekha",
        "Nepali": "फुले सुरेखा"
      },
      {
        "English": "Pusa majesty",
        "Nepali": "पुसा महिमा"
      },
      {
        "English": "Pusa giant",
        "Nepali": "पुसा विशाल"
      },
      {
        "English": "Pusa delcious",
        "Nepali": "पुसा स्वादिष्ट"
      },
      {
        "English": "Pusa drawf",
        "Nepali": "पुसा ड्राफ"
      },
      {
        "English": "Coorg honey",
        "Nepali": "कुर्ग मह"
      },
      {
        "English": "Honey dew",
        "Nepali": "महको शीत"
      },
      {
        "English": "Golden queen",
        "Nepali": "सुनौलो रानी"
      },
      {
        "English": "Amasya beyazı",
        "Nepali": "अमास्या बेयाजी"
      },
      {
        "English": "Antep karası",
        "Nepali": "अघिल्लो कार"
      },
      {
        "English": "Bahceli karas",
        "Nepali": "बहसेली करास"
      },
      {
        "English": "Cavus",
        "Nepali": "काभस"
      },
      {
        "English": "Cevsen",
        "Nepali": "सेभसेन"
      },
      {
        "English": "Crimson",
        "Nepali": "क्रिमसन"
      },
      {
        "English": "Dimrit",
        "Nepali": "दिमृत"
      },
      {
        "English": "Hafizali",
        "Nepali": "हाफिजाली"
      },
      {
        "English": "Karasabi",
        "Nepali": "करासबी"
      },
      {
        "English": "Yamuna Safed-2",
        "Nepali": "यमुना सुरक्षित - २"
      },
      {
        "English": "Bhima Omkar",
        "Nepali": "भीम ओमकार"
      },
      {
        "English": "Godavari",
        "Nepali": "गोदावरी"
      },
      {
        "English": "Baswant",
        "Nepali": "बसवन्त"
      },
      {
        "English": "Lahsun 2",
        "Nepali": "लाहसुन २"
      },
      {
        "English": "Eva",
        "Nepali": "इभा"
      },
      {
        "English": "Gala",
        "Nepali": "गाला"
      },
      {
        "English": "Fuji",
        "Nepali": "फुजी"
      },
      {
        "English": "Honeycrisp",
        "Nepali": "हनीक्रिस्प"
      },
      {
        "English": "Red Delicious",
        "Nepali": "रातो स्वादिष्ट"
      },
      {
        "English": "Vitoria",
        "Nepali": "भिटोरिया"
      },
      {
        "English": "Timpson",
        "Nepali": "टिम्पसन"
      },
      {
        "English": "Red globe",
        "Nepali": "रातो ग्लोब"
      },
      {
        "English": "Italia",
        "Nepali": "इटालिया"
      },
      {
        "English": "Thampson",
        "Nepali": "थाम्पसन"
      },
      {
        "English": "Crimson red",
        "Nepali": "क्रिमसन रातो"
      },
      {
        "English": "Zinc Gahun 1",
        "Nepali": "जस्ता गाहुन १"
      },
      {
        "English": "Zinc Gahun 2",
        "Nepali": "जिंक गहुन २"
      },
      {
        "English": "Bheri-Ganga",
        "Nepali": "भेरी-गंगा"
      },
      {
        "English": "Himganga",
        "Nepali": "हिमगंगा"
      },
      {
        "English": "Khumal-Shakti",
        "Nepali": "खुमल-शक्ति"
      },
      {
        "English": "Borlaug 2020",
        "Nepali": "बोरलाग २०२०"
      },
      {
        "English": "Ghaiya-3",
        "Nepali": "घैया-३"
      },
      {
        "English": "Hardinath-4",
        "Nepali": "हरदिनाथ-४"
      },
      {
        "English": "Hardinath-5",
        "Nepali": "हरदिनाथ-५"
      },
      {
        "English": "Hardinath-6",
        "Nepali": "हरदिनाथ-६"
      },
      {
        "English": "Khumal Basmati-16",
        "Nepali": "खुमाल बासमती-१६"
      },
      {
        "English": "Ganga Sagar-1",
        "Nepali": "गंगा सागर-१"
      },
      {
        "English": "Ganga Sagar-2",
        "Nepali": "गंगा सागर-२"
      },
      {
        "English": "Cardinal",
        "Nepali": "कार्डिनल"
      },
      {
        "English": "Khumal Ujjwol",
        "Nepali": "खुमल उज्वल"
      },
      {
        "English": "Bajhang local",
        "Nepali": "बझाङ स्थानीय"
      },
      {
        "English": "Kathmandu local",
        "Nepali": "काठमाडौं स्थानीय"
      },
      {
        "English": "Pahilo Surjo",
        "Nepali": "पहिलो सुर्जो"
      },
      {
        "English": "Poshilo makai jawa",
        "Nepali": "पोशिलो मकै जावा"
      },
      {
        "English": "Srijan-1",
        "Nepali": "सृजन-१"
      },
      {
        "English": "Srijan-2",
        "Nepali": "सृजन-२"
      },
      {
        "English": "Srijan-3",
        "Nepali": "सृजन-३"
      },
      {
        "English": "Srijan-4",
        "Nepali": "सृजन-४"
      },
      {
        "English": "Madhuri",
        "Nepali": "माधुरी"
      },
      {
        "English": "Kalyan",
        "Nepali": "कल्याण"
      },
      {
        "English": "Pratiksha",
        "Nepali": "प्रतिक्षा"
      },
      {
        "English": "Pratigya",
        "Nepali": "प्रतिज्ञा"
      },
      {
        "English": "Birendra sagar",
        "Nepali": "वीरेन्द्र सागर"
      },
      {
        "English": "Palpa",
        "Nepali": "पाल्पा"
      },
      {
        "English": "Dhankuta",
        "Nepali": "धनकुटा"
      },
      {
        "English": "Taplejung",
        "Nepali": "ताप्लेजुङ"
      },
      {
        "English": "Diktel",
        "Nepali": "डिक्टेल"
      },
      {
        "English": "Arka Abha:",
        "Nepali": "अर्का आभा:"
      },
      {
        "English": "Srijana",
        "Nepali": "सृजना"
      },
      {
        "English": "Nepali Oxheart",
        "Nepali": "नेपाली ओक्सहार्ट"
      },
      {
        "English": "Navel orange",
        "Nepali": "नाभि सुन्तला"
      },
      {
        "English": "Blood orange",
        "Nepali": "रगत सुन्तला"
      },
      {
        "English": "Tanjerine",
        "Nepali": "तान्जेरिन"
      },
      {
        "English": "Acid less orange",
        "Nepali": "एसिड कम सुन्तला"
      },
      {
        "English": "Mandarin",
        "Nepali": "मन्डारिन"
      },
      {
        "English": "Seville orange",
        "Nepali": "सेभिल सुन्तला"
      },
      {
        "English": "Bahia",
        "Nepali": "बहिया"
      },
      {
        "English": "Lisbon",
        "Nepali": "लिस्बन"
      },
      {
        "English": "Nibuwa",
        "Nepali": "निबुवा"
      },
      {
        "English": "Eureka",
        "Nepali": "युरेका"
      },
      {
        "English": "Citron",
        "Nepali": "सिट्रोन"
      },
      {
        "English": "Jhambiri (rough lemon)",
        "Nepali": "झम्बिरी (खराब कागती)"
      },
      {
        "English": "Nepali oblong",
        "Nepali": "नेपाली आयताकार"
      },
      {
        "English": "Basrai dwarf",
        "Nepali": "बसराई बौना"
      },
      {
        "English": "william hybrid",
        "Nepali": "विलियम हाइब्रिड"
      },
      {
        "English": "malbhog",
        "Nepali": "मालभोग"
      },
      {
        "English": "dhusre",
        "Nepali": "धुसरे"
      },
      {
        "English": "mungre",
        "Nepali": "मुंग्रे"
      },
      {
        "English": "marche",
        "Nepali": "मार्च"
      },
      {
        "English": "dhose",
        "Nepali": "ढोसे"
      },
      {
        "English": "hazari",
        "Nepali": "हजारी"
      },
      {
        "English": "Patan red",
        "Nepali": "पाटन रातो"
      },
      {
        "English": "Nuwakot Local",
        "Nepali": "नुवाकोट स्थानीय"
      },
      {
        "English": "White Globe",
        "Nepali": "सेतो ग्लोब"
      },
      {
        "English": "White Globe",
        "Nepali": "सेतो ग्लोब"
      },
      {
        "English": "Pant T-10",
        "Nepali": "पैन्ट टि-१०"
      },
      {
        "English": "AC-238",
        "Nepali": "ए.सि-२३८"
      },
      {
        "English": "SL 14",
        "Nepali": "एसएल १४"
      },
      {
        "English": "CastilloÂ®",
        "Nepali": "कास्टिलो"
      },
      {
        "English": "303/577 tea clone",
        "Nepali": "३०३/५७७ चिया क्लोन"
      },
      {
        "English": "6/8 tea clone",
        "Nepali": "६/८ चिया क्लोन"
      },
      {
        "English": "31/8 tea clone",
        "Nepali": "३१/८ चिया क्लोन"
      },
      {
        "English": "tukdah 246",
        "Nepali": "तुक्दाह २४६"
      },
      {
        "English": "CP First",
        "Nepali": "सि.पि. फर्स्ट"
      },
      {
        "English": "Tv 14",
        "Nepali": "टिभी १४"
      },
      {
        "English": "Bannock Burn 668",
        "Nepali": "ब्यानक बर्न ६६८"
      },
      {
        "English": "Bannock Burn 777",
        "Nepali": "ब्यानक बर्न ७७७"
      },
      {
        "English": "Pacas",
        "Nepali": "पाकास"
      },
      {
        "English": "TRS1",
        "Nepali": "टिआरएस १"
      },
      {
        "English": "TR14",
        "Nepali": "टिआर १४"
      },
      {
        "English": "TR15",
        "Nepali": "टिआर १५"
      },
      {
        "English": "Matti",
        "Nepali": "मत्ती"
      },
      {
        "English": "Typica (Bergandal Sidikalang - Sumatera).",
        "Nepali": "टिपिका (बेर्गाण्डल सिदिकलांग - सुमातेरा)"
      },
      {
        "English": "Hibrido de Timor (HDT Cross breed Arabica-Robusta; Tim-tim Aceh)",
        "Nepali": "हाइब्रिडो डे टिमोर (एचडीटी; अरबिका-रोबुस्टा संकर जाती; टिम-टिम आचेह)"
      },
      {
        "English": "Linie S (S-288 S-795 Andungsari Komasti; Aceh Flores)",
        "Nepali": "लाइनी एस (एस-२८८ एस-७९५ आन्दुंगसारी कोमास्ति; आचेह फ्लोरेस)"
      },
      {
        "English": "Ethiopian lines (Rambung Abyssina USDA)",
        "Nepali": "इथियोपियन लाइनहरू (राम्बुंग अबिसिनिया USDA)"
      },
      {
        "English": "Cattura Cultivars (mutasi Bourbon; originated in Brazil)",
        "Nepali": "कट्टुरा कल्चर्स (म्युटेसी बोर्बोन; ब्राजिलमा उत्पन्न)"
      },
      {
        "English": "Amarello De Botucatu",
        "Nepali": "अमारेल्लो दे बोटुकाटु"
      },
      {
        "English": "Bmj",
        "Nepali": "बीएमजे"
      },
      {
        "English": "Boubon Mayaguez 71",
        "Nepali": "बोउबोन मयाग्वेज ७१"
      },
      {
        "English": "Bourbon Mayaguez 139",
        "Nepali": "बोर्बन मयाग्वेज १३९"
      },
      {
        "English": "Bourbon Mayaguez 71",
        "Nepali": "बोर्बन मयाग्वेज ७१"
      },
      {
        "English": "Jember/S795",
        "Nepali": "जेम्बर/एस ७९५"
      },
      {
        "English": "K20",
        "Nepali": "के २०"
      },
      {
        "English": "K7",
        "Nepali": "के ७"
      },
      {
        "English": "Kp423",
        "Nepali": "के.पी ४२३"
      },
      {
        "English": "Lekempti",
        "Nepali": "लेकेम्प्टी"
      },
      {
        "English": "Ouro Verde",
        "Nepali": "औरो भेर्दे"
      },
      {
        "English": "Pache Colis",
        "Nepali": "पाचे कोलिस"
      },
      {
        "English": "Pache Comum",
        "Nepali": "पाचे कोमुम"
      },
      {
        "English": "Sl14",
        "Nepali": "एसएल १४"
      },
      {
        "English": "Sl28",
        "Nepali": "एसएल २८"
      },
      {
        "English": "Sl34",
        "Nepali": "एसएल ३४"
      },
      {
        "English": "Usda762",
        "Nepali": "यूएसडीए ७६२"
      },
      {
        "English": "Catimor (hybrid of Caturra x Timor)",
        "Nepali": "केटिमोर (कटुर्रा र टिमोरको हाइब्रिड)"
      },
      {
        "English": "Jawa (Java Coffee !700AD)",
        "Nepali": "जावा (जावा कफी !७०० ईसा पूर्व)"
      },
      {
        "English": "Arabusta (HDT; Hibrid of sterile CArabica and C.Robusta)",
        "Nepali": "अराबुस्टा (एचडीटी; बंजर्का अरबिका र कॉफी रोबुस्टा को हाइब्रिड)"
      },
      {
        "English": "Brs 1216",
        "Nepali": "बीआरएस १२१६"
      },
      {
        "English": "Brs 2336",
        "Nepali": "बीआरएस २३३६"
      },
      {
        "English": "Brs 3210",
        "Nepali": "बीआरएस ३२१०"
      },
      {
        "English": "Brs 3213",
        "Nepali": "बीआरएस ३२१३"
      },
      {
        "English": "Selection 1r",
        "Nepali": "सेलेक्शन १आर"
      },
      {
        "English": "Selection 2r",
        "Nepali": "सेलेक्शन २आर"
      },
      {
        "English": "Selection 3r",
        "Nepali": "सेलेक्शन ३आर"
      },
      {
        "English": "Sln 270",
        "Nepali": "सेलएन २७०"
      },
      {
        "English": "Sln 274",
        "Nepali": "सेलएन २७४"
      },
      {
        "English": "TR4",
        "Nepali": "टीआर ४"
      },
      {
        "English": "TR5",
        "Nepali": "टीआर ५"
      },
      {
        "English": "TR6",
        "Nepali": "टीआर ६"
      },
      {
        "English": "TR7",
        "Nepali": "टीआर ७"
      },
      {
        "English": "TR8",
        "Nepali": "टीआर ८"
      },
      {
        "English": "BP42",
        "Nepali": "बीपी ४२"
      },
      {
        "English": "BP234",
        "Nepali": "बीपी २३४"
      },
      {
        "English": "BP288",
        "Nepali": "बीपी २८८"
      },
      {
        "English": "BP358",
        "Nepali": "बीपी ३५८"
      },
      {
        "English": "BP409",
        "Nepali": "बीपी ४०९"
      },
      {
        "English": "SA237",
        "Nepali": "एसए २३७"
      },
      {
        "English": "Sln288",
        "Nepali": "सेलएन २८८"
      },
      {
        "English": "Sln10",
        "Nepali": "सेलएन १०"
      },
      {
        "English": "Anacafe 14",
        "Nepali": "अनाकाफे १४"
      },
      {
        "English": "Catiga Mg2",
        "Nepali": "काटिगा एमजी २"
      },
      {
        "English": "Catimor 129",
        "Nepali": "केटिमोर १२९"
      },
      {
        "English": "Catimor F6.",
        "Nepali": "केटिमोर एफ ६"
      },
      {
        "English": "Catucai",
        "Nepali": "केटुकाई"
      },
      {
        "English": "Centroamericano",
        "Nepali": "सेंट्रोअमेरिकानो"
      },
      {
        "English": "Costa Rica 95 Aka Cr-95",
        "Nepali": "कोस्टा रिका ९५ (एकाए सीआर-९५)"
      },
      {
        "English": "Cr (Costa Rica) 95",
        "Nepali": "सीआर (कोस्टा रिका) ९५"
      },
      {
        "English": "Cuscatleco",
        "Nepali": "कुस्कतलेको"
      },
      {
        "English": "Iapar 59",
        "Nepali": "आईएपीएआर ५९"
      },
      {
        "English": "IHcafe 90",
        "Nepali": "आईएचकाफे ९०"
      },
      {
        "English": "Ipar 103",
        "Nepali": "आईपार १०३"
      },
      {
        "English": "Oro Azteca",
        "Nepali": "ओरो आज्टेका"
      },
      {
        "English": "Paraiso",
        "Nepali": "पराइसो"
      },
      {
        "English": "S.12 Kaffa",
        "Nepali": "एस. १२ काफ्फा"
      },
      {
        "English": "T5175",
        "Nepali": "टी ५१७५"
      },
      {
        "English": "T5296",
        "Nepali": "टी ५२९६"
      },
      {
        "English": "T8667",
        "Nepali": "टी ८६६७"
      },
      {
        "English": "Cheyenne e448",
        "Nepali": "चेयेन ई४४८"
      },
      {
        "English": "Nairouz (th 99806)",
        "Nepali": "नाइरूज (थि ९९८०६)"
      },
      {
        "English": "Tomaland (th 01308)",
        "Nepali": "टोमालैंड (थि ०१३०८)"
      },
      {
        "English": "Ppp.1-2",
        "Nepali": "पिपिपी. १-२"
      },
      {
        "English": "Roc-1",
        "Nepali": "रोक-१"
      },
      {
        "English": "Ss33",
        "Nepali": "एसएस ३३"
      },
      {
        "English": "S.q-5",
        "Nepali": "एस.क्यू-५"
      },
      {
        "English": "Pet-8",
        "Nepali": "पेट-८"
      },
      {
        "English": "Eur.2-2",
        "Nepali": "यूर.२-२"
      },
      {
        "English": "Vf-145",
        "Nepali": "भि.१४५"
      },
      {
        "English": "Ucx-281",
        "Nepali": "यूयूक्स-२८१"
      },
      {
        "English": "Bhn 589 (v ff t)*",
        "Nepali": "बीएचएन ५८९ (वी एफ एफ टी)*"
      },
      {
        "English": "Celebrity (v ff n t a st)",
        "Nepali": "सेलेब्रिटी (वी एफ एफ एन टी ए स्ट)"
      },
      {
        "English": "Albar ( 57 ) 12 and acrain",
        "Nepali": "अलबर (५७) १२ र एकरेन"
      },
      {
        "English": "Hamid ( bb - 82)",
        "Nepali": "हमिद (बीबी -८२)"
      },
      {
        "English": "Knight ( bb - 90)",
        "Nepali": "नाइट (बीबी -९०)"
      },
      {
        "English": "Bukalasa pedigree albar",
        "Nepali": "बुकलासा पेडिग्री अलबर"
      },
      {
        "English": "Bgrr y guaraní inta bgrr",
        "Nepali": "बीजीआरआर व ग्वारानी इन्ता बीजीआरआर"
      },
      {
        "English": "Pora 3 inta bgrr",
        "Nepali": "पोरा ३ इन्ता बीजीआरआर"
      },
      {
        "English": "Guaraní inta bgrr",
        "Nepali": "ग्वारानी इन्ता बीजीआरआर"
      },
      {
        "English": "Guazuncho 4 inta bgrr",
        "Nepali": "गुआजुंचो ४ इन्ता बीजीआरआर"
      },
      {
        "English": "Guazuncho 2000 rr",
        "Nepali": "गुआजुंचो २००० आरआर"
      },
      {
        "English": "Dp402 bgrr",
        "Nepali": "डीपी ४०२ बीजीआरआर"
      },
      {
        "English": "Dp1238 bgrr",
        "Nepali": "डीपी १२३८ बीजीआरआर"
      },
      {
        "English": "Siokra l23",
        "Nepali": "सियोक्रा एल २३"
      },
      {
        "English": "Siokra v-16",
        "Nepali": "सियोक्रा वी-१६"
      },
      {
        "English": "Sicala v-2",
        "Nepali": "सिकाला वी-२"
      },
      {
        "English": "Cs50",
        "Nepali": "सीएस ५०"
      },
      {
        "English": "Cnpa ita 90",
        "Nepali": "सीएनपीए इता ९०"
      },
      {
        "English": "Brs ita 96",
        "Nepali": "बीआरएस इता ९६"
      },
      {
        "English": "Cnpa ita 97",
        "Nepali": "सीएनपीए इता ९७"
      },
      {
        "English": "Brs antares",
        "Nepali": "बीआरएस अंतारेस"
      },
      {
        "English": "Brs 286",
        "Nepali": "बीआरएस २८६"
      },
      {
        "English": "Brs ita⁄ba",
        "Nepali": "बीआरएस इता/बा"
      },
      {
        "English": "Brs sucupira",
        "Nepali": "बीआरएस सुकुपिरा"
      },
      {
        "English": "Dp 1646 b2xf",
        "Nepali": "डीपी १६४६ बी२एक्सएफ"
      },
      {
        "English": "Dp 1840 b3xf",
        "Nepali": "डीपी १८४० बी३एक्सएफ"
      },
      {
        "English": "Dp 1820 b3xf",
        "Nepali": "डीपी १८२० बी३एक्सएफ"
      },
      {
        "English": "Dp 1845 b3xf",
        "Nepali": "डीपी १८४५ बी३एक्सएफ"
      },
      {
        "English": "Ng 5711 b3xf",
        "Nepali": "एनजी ५७११ बी३एक्सएफ"
      },
      {
        "English": "Ng 3406 b2xf",
        "Nepali": "एनजी ३४०६ बी२एक्सएफ"
      },
      {
        "English": "Ng 4545 b2xf",
        "Nepali": "एनजी ४५४५ बी२एक्सएफ"
      },
      {
        "English": "B3xf",
        "Nepali": "बी३एक्सएफ"
      },
      {
        "English": "Phy 400",
        "Nepali": "फाई ४००"
      },
      {
        "English": "Phy 444 wrf",
        "Nepali": "फाई ४४४ डब्ल्यूआरएफ"
      },
      {
        "English": "Phy 480 w3fe",
        "Nepali": "फाई ४८० डब्ल्यू३एफई"
      },
      {
        "English": "Phy 350 w3fe",
        "Nepali": "फाई ३५० डब्ल्यू३एफई"
      },
      {
        "English": "W3fe",
        "Nepali": "डब्ल्यू३एफई"
      },
      {
        "English": "Lh 900",
        "Nepali": "एलएच ९००"
      },
      {
        "English": "Rs-810",
        "Nepali": "आरएस-८१०"
      },
      {
        "English": "Mcu- 5vt",
        "Nepali": "एमसीयू-५वीटी"
      },
      {
        "English": "Lk-861",
        "Nepali": "एलके-८६१"
      },
      {
        "English": "Wynad Local",
        "Nepali": "वायनाद लोकल"
      },
      {
        "English": "Punjab Giant-35",
        "Nepali": "पंजाब जायन्ट-३५"
      },
      {
        "English": "VANDERHAVE VDH 480",
        "Nepali": "वैंडरहेव वीडीएच ४८०"
      },
      {
        "English": "NIDERA PARADISE 6",
        "Nepali": "निडेरा पैराडाइस ६"
      },
      {
        "English": "DEKALB DEKASOL 3881",
        "Nepali": "डेकाल्ब डेकासोल ३८८१"
      },
      {
        "English": "Carioca Kidney Bean (IAC 1850)",
        "Nepali": "कारियोका किडनी बीन (आईएसी १८५०)"
      },
      {
        "English": "P.D.R -14 (Uday)",
        "Nepali": "पी.डी.आर -१४ (उदय)"
      },
      {
        "English": "V.L - 63",
        "Nepali": "वी.एल -६३"
      },
      {
        "English": "Ambar (I.I.P.R -96-4)",
        "Nepali": "अम्बर (आई.आई.पी.आर -९६-४)"
      },
      {
        "English": "Utkarsh (I.I.P.R - 98-5)",
        "Nepali": "उत्कर्ष (आई.आई.पी.आर -९८-५)"
      },
      {
        "English": "RBL 6",
        "Nepali": "आरबीएल ६"
      },
      {
        "English": "YCD1",
        "Nepali": "वाईसीडी१"
      },
      {
        "English": "TKD1",
        "Nepali": "टीकेडी१"
      },
      {
        "English": "Pant Anupama* (UPF 191)",
        "Nepali": "पैन्ट अनुपमा* (यूपीएफ १९१)"
      },
      {
        "English": "Co2",
        "Nepali": "को२"
      },
      {
        "English": "Co3",
        "Nepali": "को३"
      },
      {
        "English": "Co4",
        "Nepali": "को४"
      },
      {
        "English": "Erenkoy beyazı",
        "Nepali": "एरेनकोय बेयाज़ी"
      },
      {
        "English": "TSH 565",
        "Nepali": "टीएसएच ५६५"
      },
      {
        "English": "ICS 95",
        "Nepali": "आईसीएस ९५"
      },
      {
        "English": "BMI 67",
        "Nepali": "बीएमआई ६७"
      },
      {
        "English": "IMC 67",
        "Nepali": "आईएमसी ६७"
      },
      {
        "English": "ICS 1",
        "Nepali": "आईसीएस १"
      },
      {
        "English": "ICS 6",
        "Nepali": "आईसीएस ६"
      },
      {
        "English": "ICS 39",
        "Nepali": "आईसीएस ३९"
      },
      {
        "English": "UF 667",
        "Nepali": "यूएफ ६६७"
      },
      {
        "English": "PG 18",
        "Nepali": "पीजी १८"
      },
      {
        "English": "BRS ISIS",
        "Nepali": "बीआरएस आईसिस"
      },
      {
        "English": "BRS NUBIA",
        "Nepali": "बीआरएस नूबिया"
      },
      {
        "English": "CSV 21S",
        "Nepali": "सीएसवी २१एस"
      },
      {
        "English": "CSV 23R",
        "Nepali": "सीएसवी २३आर"
      },
      {
        "English": "SS-72 (Super Shakti 72)",
        "Nepali": "एसएस-७२ (सुपर शक्ति ७२)"
      },
      {
        "English": "KFSH-1 (Kanchan F1)",
        "Nepali": "केएफएसएच-१ (कंचन एफ१)"
      },
      {
        "English": "NM 92",
        "Nepali": "एनएम ९२"
      },
      {
        "English": "NM 94",
        "Nepali": "एनएम ९४"
      },
      {
        "English": "VC 6372",
        "Nepali": "वीसी ६३७२"
      },
      {
        "English": "VC 3960 - 80",
        "Nepali": "वीसी ३९६० - ८०"
      },
      {
        "English": "CN9-5",
        "Nepali": "सीएन९-५"
      },
      {
        "English": "VC6173 B -10",
        "Nepali": "वीसी६१७३ बी -१०"
      },
      {
        "English": "VC1973A",
        "Nepali": "वीसी१९७३ए"
      },
      {
        "English": "VC6173B-11",
        "Nepali": "वीसी६१७३बी-११"
      },
      {
        "English": "VC6173A",
        "Nepali": "वीसी६१७३ए"
      },
      {
        "English": "Roma VF",
        "Nepali": "रोमा वीएफ"
      }
    ];
    let count = 0;
    for (const row of data) {
      let sql = 'SELECT * FROM global_translation_metadata WHERE english = :english';
      const global_trans = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: row.English }
      });

      // update case
      if (global_trans && global_trans.length > 0) {
        for (const gTrans of global_trans) {
          let item = {}
          for (let key in row) {
            const language = key.toLocaleLowerCase().trim();
            if (row[key]) {
              item[language] = row[key];
            }
          }
          item.updatedAt = moment.utc().format("YYYY-MM-DD HH:mm:ss");
          await queryInterface.bulkUpdate('global_translation_metadata', item, { id: gTrans.id });
          console.log("count: "+ count + " " + item.english);
          count++;
        }
      }
      // insert case
      else {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          if(row[key]) {
            item[language] = row[key];
          }
        }
        item.createdAt = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        item.updatedAt = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        await queryInterface.insert(null, 'global_translation_metadata', item);
        console.log("count: "+ count + " " + item.english);
        count++;
      }

    }
    console.log('Records: ', count);
  },

  async down(queryInterface, Sequelize) {

  }
};