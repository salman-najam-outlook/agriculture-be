'use strict';
const path = require("path");
let jsonData = [
  {
    "english": "Germination/emergence",
    "hindi": "अंकुरण/उद्भव",
    "marathi": "उगवण/उदय",
    "nepali": "अंकुरण / उष्रक",
    "spanish": "Germinación/emergencia"
  },
  {
    "english": "Tillering/canopy development",
    "hindi": "टिलरिंग/चंदवा विकास",
    "marathi": "टिलरिंग/छत विकास",
    "nepali": "टिलरिंग / क्यानोपी विकास",
    "spanish": "Desarrollo de canopy/canoph"
  },
  {
    "english": "Grand growth/elongation",
    "hindi": "भव्य विकास/बढ़ाव",
    "marathi": "भव्य वाढ/वाढ",
    "nepali": "भव्य वृद्धि / विस्तारित",
    "spanish": "Gran crecimiento/alargamiento"
  },
  {
    "english": "Ripening/maturation",
    "hindi": "परिपक्वता/परिपक्वता",
    "marathi": "पिकविणे/परिपक्वता",
    "nepali": "पाकेको / परिपक्वता",
    "spanish": "Maduración/maduración"
  },
  {
    "english": "Germination/emergence",
    "hindi": "अंकुरण/उद्भव",
    "marathi": "उगवण/उदय",
    "nepali": "अंकुरण / उष्रक",
    "spanish": "Germinación/emergencia"
  },
  {
    "english": "Vegetative growth",
    "hindi": "वनस्पति विकास",
    "marathi": "वनस्पतिवत् होणारी वाढ",
    "nepali": "वनस्पति वृद्धि",
    "spanish": "Crecimiento vegetativo"
  },
  {
    "english": "Bulb initiation",
    "hindi": "बल्ब दीक्षा",
    "marathi": "बल्ब दीक्षा",
    "nepali": "बल्ब दीक्षा",
    "spanish": "Iniciación de la bombilla"
  },
  {
    "english": "Bulb development",
    "hindi": "बल्ब विकास",
    "marathi": "बल्ब विकास",
    "nepali": "बल्ब विकास",
    "spanish": "Desarrollo de bulbo"
  },
  {
    "english": "Maturation/harvesting",
    "hindi": "परिपक्वता/कटाई",
    "marathi": "परिपक्वता/कापणी",
    "nepali": "महत्व / कटनी गर्दै",
    "spanish": "Maduración/cosecha"
  },
  {
    "english": "Germination/emergence",
    "hindi": "अंकुरण/उद्भव",
    "marathi": "उगवण/उदय",
    "nepali": "अंकुरण / उष्रक",
    "spanish": "Germinación/emergencia"
  },
  {
    "english": "Rosette",
    "hindi": "थाली",
    "marathi": "गुलाब",
    "nepali": "रोसिट",
    "spanish": "Rosetón"
  },
  {
    "english": "Stem elongation",
    "hindi": "उपजी बढ़ाव",
    "marathi": "स्टेम वाढवणे",
    "nepali": "स्टेम विस्तारकन",
    "spanish": "Alargamiento"
  },
  {
    "english": "Branching",
    "hindi": "शाखाओं में",
    "marathi": "शाखा",
    "nepali": "धर्मखाति",
    "spanish": "Derivación"
  },
  {
    "english": "Flowering",
    "hindi": "कुसुमित",
    "marathi": "फुलांचे",
    "nepali": "बुरो",
    "spanish": "Floración"
  },
  {
    "english": "Maturation/harvesting",
    "hindi": "परिपक्वता/कटाई",
    "marathi": "परिपक्वता/कापणी",
    "nepali": "महत्व / कटनी गर्दै",
    "spanish": "Maduración/cosecha"
  },
  {
    "english": "Crop establishment stage",
    "hindi": "फसल प्रतिष्ठान चरण",
    "marathi": "पीक स्थापना टप्पा",
    "nepali": "बाली स्थापना चरण",
    "spanish": "Etapa de establecimiento de cultivos"
  },
  {
    "english": "Vegetative stage",
    "hindi": "वनस्पति चरण",
    "marathi": "वनस्पतिवत् होणारी अवस्था",
    "nepali": "वनस्पति अवस्था",
    "spanish": "Etapa vegetativa"
  },
  {
    "english": "Tuber formation stage",
    "hindi": "कंद -निर्माण चरण",
    "marathi": "कंद निर्मितीचा टप्पा",
    "nepali": "ट्यूबर गठन चरण",
    "spanish": "Etapa de formación de tubérculos"
  },
  {
    "english": "Tuber development stage",
    "hindi": "कंद विकास चरण",
    "marathi": "कंद विकासाचा टप्पा",
    "nepali": "टबर विकास चरण",
    "spanish": "Etapa de desarrollo de tubérculos"
  },
  {
    "english": "Harvest stage",
    "hindi": "फसल का मंच",
    "marathi": "कापणीचा टप्पा",
    "nepali": "फसलको चरण",
    "spanish": "Etapa de cosecha"
  },
  {
    "english": "Emergence stage",
    "hindi": "उद्भव चरण",
    "marathi": "उदय अवस्था",
    "nepali": "उद्भव चरण",
    "spanish": "Etapa de emergencia"
  },
  {
    "english": "Vegetative stage",
    "hindi": "वनस्पति चरण",
    "marathi": "वनस्पतिवत् होणारी अवस्था",
    "nepali": "वनस्पति अवस्था",
    "spanish": "Etapa vegetativa"
  },
  {
    "english": "Flowering stage",
    "hindi": "फूल",
    "marathi": "फुलांचा टप्पा",
    "nepali": "फूल फुल्ने अवस्था",
    "spanish": "Etapa de floración"
  },
  {
    "english": "Fruit development stage",
    "hindi": "फल विकास चरण",
    "marathi": "फळ विकासाचा टप्पा",
    "nepali": "फल विकास चरण",
    "spanish": "Etapa de desarrollo de la fruta"
  },
  {
    "english": "Ripening stage",
    "hindi": "पकने की अवस्था",
    "marathi": "पिकणारा टप्पा",
    "nepali": "पापिंग चरण",
    "spanish": "Etapa de maduración"
  },
  {
    "english": "Harvest stage",
    "hindi": "फसल का मंच",
    "marathi": "कापणीचा टप्पा",
    "nepali": "फसलको चरण",
    "spanish": "Etapa de cosecha"
  },
  {
    "english": "Emergence stage",
    "hindi": "उद्भव चरण",
    "marathi": "उदय अवस्था",
    "nepali": "उद्भव चरण",
    "spanish": "Etapa de emergencia"
  },
  {
    "english": "1st to nth trifoliolate stage",
    "hindi": "1 से nth trifoliolate चरण",
    "marathi": "1 ला एनटीएच ट्रायफोलिओलेट स्टेज",
    "nepali": "पहिलो एनठी ट्रिफरोइज्ड स्टेजसम्म",
    "spanish": "Primera etapa trifoliolada"
  },
  {
    "english": "Beginning bloom/first flower stage",
    "hindi": "शुरुआत ब्लूम/फर्स्ट फ्लावर स्टेज",
    "marathi": "प्रारंभ ब्लूम/पहिला फ्लॉवर स्टेज",
    "nepali": "बरन / पहिलो फूल चरण सुरु गर्नुहोस्",
    "spanish": "Comenzando Bloom/Primera etapa de flores"
  },
  {
    "english": "Full bloom/flower in top two nodes stage",
    "hindi": "शीर्ष दो नोड्स चरण में पूर्ण खिल/फूल",
    "marathi": "शीर्ष दोन नोड्स स्टेजमध्ये पूर्ण ब्लूम/फ्लॉवर",
    "nepali": "शीर्ष दुई नोड चरणमा पूर्ण ब्लुम / फूल",
    "spanish": "Floración/flor completa en la etapa de dos nodos superiores"
  },
  {
    "english": "Pod stage",
    "hindi": "पॉड स्टेज",
    "marathi": "पॉड स्टेज",
    "nepali": "पोड स्टेज",
    "spanish": "Etapa de vaina"
  },
  {
    "english": "Initial maturity satge",
    "hindi": "प्रारंभिक परिपक्वता संतुष्ट",
    "marathi": "प्रारंभिक परिपक्वता sagge",
    "nepali": "प्रारम्भिक परिपक्वता सतर्क",
    "spanish": "Madurez inicial Satge"
  },
  {
    "english": "Harvesting",
    "hindi": "फसल काटने वाले",
    "marathi": "कापणी",
    "nepali": "फसल काट्नु",
    "spanish": "Cosecha"
  },
  {
    "english": "Stage 0 (Pre-emergence)",
    "hindi": "चरण 0 (पूर्व-उभरता)",
    "marathi": "स्टेज 0 (पूर्व-उदय)",
    "nepali": "चरण 0 (पूर्व-उद्भवन)",
    "spanish": "Etapa 0 (preemergencia)"
  },
  {
    "english": "Stage 1 (Emerged)",
    "hindi": "चरण 1 (उभरा)",
    "marathi": "स्टेज 1 (उदयास आला)",
    "nepali": "चरण 1 (देखा पर्यो)",
    "spanish": "Etapa 1 (emergido)"
  },
  {
    "english": "Stage 2 (cob development)",
    "hindi": "चरण 2 (कोब विकास)",
    "marathi": "स्टेज 2 (सीओबी विकास)",
    "nepali": "चरण 2 (COB विकास)",
    "spanish": "Etapa 2 (desarrollo de COB)"
  },
  {
    "english": "Stage 3 (vegetative growth pre-flowering)",
    "hindi": "स्टेज 3 (वनस्पति वृद्धि पूर्व-फूल)",
    "marathi": "स्टेज 3 (वनस्पतिवत् होणारी वाढ पूर्व-फुलांची वाढ)",
    "nepali": "चरण ((वनस्पति बृद्धि प्रि-फूल फुल्ने)",
    "spanish": "Etapa 3 (crecimiento vegetativo previo a la floración)"
  },
  {
    "english": "Stage 4 (flowering- pollination)",
    "hindi": "चरण 4 (फूल-परागण)",
    "marathi": "स्टेज 4 (फुलांचे परागकण)",
    "nepali": "चरण 4 (फूल फुल्ने पराग)",
    "spanish": "Etapa 4 (polinización en flor)"
  },
  {
    "english": "Stage 5 (kernel development)",
    "hindi": "चरण 5 (कर्नेल विकास)",
    "marathi": "स्टेज 5 (कर्नल डेव्हलपमेंट)",
    "nepali": "चरण ((कर्नेल विकास)",
    "spanish": "Etapa 5 (desarrollo del núcleo)"
  },
  {
    "english": "Stage 6 (grain filling)",
    "hindi": "चरण 6 (अनाज भरने)",
    "marathi": "स्टेज 6 (धान्य भरणे)",
    "nepali": "चरण 6 (अन्न भरिने)",
    "spanish": "Etapa 6 (relleno de grano)"
  },
  {
    "english": "Stage 7 (maturity)",
    "hindi": "चरण 7 (परिपक्वता)",
    "marathi": "स्टेज 7 (परिपक्वता)",
    "nepali": "चरण ((परिपक्वता)",
    "spanish": "Etapa 7 (madurez)"
  },
  {
    "english": "Stage 8 (Harvest)",
    "hindi": "स्टेज 8 (हार्वेस्ट)",
    "marathi": "स्टेज 8 (कापणी)",
    "nepali": "चरण ((फसल)",
    "spanish": "Etapa 8 (cosecha)"
  },
  {
    "english": "Emergence stage",
    "hindi": "उद्भव चरण",
    "marathi": "उदय अवस्था",
    "nepali": "उद्भव चरण",
    "spanish": "Etapa de emergencia"
  },
  {
    "english": "Stolon formation stage",
    "hindi": "स्टोलन गठन चरण",
    "marathi": "स्टोलोन फॉर्मेशन स्टेज",
    "nepali": "स्टोन गठन चरण",
    "spanish": "Etapa de formación de Stolon"
  },
  {
    "english": "Tuber formation stage",
    "hindi": "कंद -निर्माण चरण",
    "marathi": "कंद निर्मितीचा टप्पा",
    "nepali": "ट्यूबर गठन चरण",
    "spanish": "Etapa de formación de tubérculos"
  },
  {
    "english": "Tuber developement stage",
    "hindi": "कंद विकास चरण",
    "marathi": "कंद विकासाचा टप्पा",
    "nepali": "ट्यूबर डीइडल स्टेज",
    "spanish": "Etapa de desarrollo de tubérculos"
  },
  {
    "english": "Tuber development stage",
    "hindi": "कंद विकास चरण",
    "marathi": "कंद विकासाचा टप्पा",
    "nepali": "टबर विकास चरण",
    "spanish": "Etapa de desarrollo de tubérculos"
  },
  {
    "english": "Harvest stage",
    "hindi": "फसल का मंच",
    "marathi": "कापणीचा टप्पा",
    "nepali": "फसलको चरण",
    "spanish": "Etapa de cosecha"
  },
  {
    "english": "First Vegetative phase",
    "hindi": "पहला वनस्पति चरण",
    "marathi": "पहिला वनस्पतिवत् होणारी अवस्था",
    "nepali": "पहिलो वनस्पति चरण",
    "spanish": "Primera fase vegetativa"
  },
  {
    "english": "Second Vegetative phase",
    "hindi": "द्वितीय वनस्पति चरण",
    "marathi": "दुसरा वनस्पतिवत् होणारी अवस्था",
    "nepali": "दोस्रो वनस्पति चरण",
    "spanish": "Segunda fase vegetativa"
  },
  {
    "english": "Flowering / Reproductive phase",
    "hindi": "फूल -प्रजनन चरण",
    "marathi": "फुलांचा / पुनरुत्पादक टप्पा",
    "nepali": "फूल फुल्ने / प्रजनन चरण",
    "spanish": "Fase de floración / reproductiva"
  },
  {
    "english": "Harvest / Reproductive phase",
    "hindi": "कटाई / प्रजनन चरण",
    "marathi": "कापणी / पुनरुत्पादक टप्पा",
    "nepali": "फसल / प्रजनन चरण",
    "spanish": "Fase de cosecha / reproductiva"
  },
  {
    "english": "Post harvest phase",
    "hindi": "हार्वेस्ट चरण",
    "marathi": "कापणीनंतरचा टप्पा",
    "nepali": "फसल चरण चरण",
    "spanish": "Fase de post cosecha"
  },
  {
    "english": "Emergence",
    "hindi": "उद्भव",
    "marathi": "उदय",
    "nepali": "उज्जाड",
    "spanish": "Aparición"
  },
  {
    "english": "Square formation",
    "hindi": "वर्ग निर्माण",
    "marathi": "चौरस निर्मिती",
    "nepali": "वर्ग गठन",
    "spanish": "Formación cuadrada"
  },
  {
    "english": "Flowering",
    "hindi": "कुसुमित",
    "marathi": "फुलांचे",
    "nepali": "बुरो",
    "spanish": "Floración"
  },
  {
    "english": "Boll formation",
    "hindi": "बॉल गठन",
    "marathi": "बॉल फॉरमेशन",
    "nepali": "बाल गठन",
    "spanish": "Formación de cápsulas"
  },
  {
    "english": "Maturation",
    "hindi": "परिपक्वता",
    "marathi": "परिपक्वता",
    "nepali": "तर्कश्चा",
    "spanish": "Maduración"
  },
  {
    "english": "Leaf bud formation stage",
    "hindi": "पत्ती कली गठन चरण",
    "marathi": "लीफ कळी निर्मितीचा टप्पा",
    "nepali": "पात डपर्मेसन स्टेज",
    "spanish": "Etapa de formación de brotes de hoja"
  },
  {
    "english": "Flowwering stage",
    "hindi": "प्रवाह की अवस्था",
    "marathi": "फ्लोव्हिंग स्टेज",
    "nepali": "फूल फुल्दै",
    "spanish": "Etapa de control de flujo"
  },
  {
    "english": "Bean filling stage",
    "hindi": "बीन भरने की अवस्था",
    "marathi": "बीन फिलिंग स्टेज",
    "nepali": "Bean भर्न चरण",
    "spanish": "Etapa de llenado de frijoles"
  },
  {
    "english": "Maturity/harvesting stage",
    "hindi": "परिपक्वता/कटाई चरण",
    "marathi": "परिपक्वता/कापणीचा टप्पा",
    "nepali": "परिपक्वता / फसल चरण",
    "spanish": "Etapa de madurez/cosecha"
  },
  {
    "english": "Self pruning stage",
    "hindi": "स्व -प्रूनिंग स्टेज",
    "marathi": "स्वत: ची छाटणी स्टेज",
    "nepali": "स्वयं pruning अवस्था",
    "spanish": "Etapa de la poda"
  },
  {
    "english": "Vegetative stage",
    "hindi": "वनस्पति चरण",
    "marathi": "वनस्पतिवत् होणारी अवस्था",
    "nepali": "वनस्पति अवस्था",
    "spanish": "Etapa vegetativa"
  },
  {
    "english": "First Vegetative phase",
    "hindi": "पहला वनस्पति चरण",
    "marathi": "पहिला वनस्पतिवत् होणारी अवस्था",
    "nepali": "पहिलो वनस्पति चरण",
    "spanish": "Primera fase vegetativa"
  },
  {
    "english": "Second Vegetative phase",
    "hindi": "द्वितीय वनस्पति चरण",
    "marathi": "दुसरा वनस्पतिवत् होणारी अवस्था",
    "nepali": "दोस्रो वनस्पति चरण",
    "spanish": "Segunda fase vegetativa"
  },
  {
    "english": "Flowering / Reproductive phase",
    "hindi": "फूल -प्रजनन चरण",
    "marathi": "फुलांचा / पुनरुत्पादक टप्पा",
    "nepali": "फूल फुल्ने / प्रजनन चरण",
    "spanish": "Fase de floración / reproductiva"
  },
  {
    "english": "Harvest / Reproductive phase",
    "hindi": "कटाई / प्रजनन चरण",
    "marathi": "कापणी / पुनरुत्पादक टप्पा",
    "nepali": "फसल / प्रजनन चरण",
    "spanish": "Fase de cosecha / reproductiva"
  },
  {
    "english": "Post harvest first vegetative stage",
    "hindi": "पोस्ट हार्वेस्ट पहले वनस्पति चरण",
    "marathi": "कापणीनंतर प्रथम वनस्पतिवत् होणारी अवस्था",
    "nepali": "फसल कटनी पहिलो वनस्पति चरण",
    "spanish": "Post Harvest Primera etapa vegetativa"
  },
  {
    "english": "Germination stage",
    "hindi": "अंकुरण चरण",
    "marathi": "उगवण स्टेज",
    "nepali": "अंकुरण चरण",
    "spanish": "Etapa de germinación"
  },
  {
    "english": "Transplanting stage",
    "hindi": "प्रत्यारोपण अवस्था",
    "marathi": "प्रत्यारोपणाचा टप्पा",
    "nepali": "ट्रान्सप्लान्ट स्टेज",
    "spanish": "Etapa de trasplante"
  },
  {
    "english": "Vegetative stage",
    "hindi": "वनस्पति चरण",
    "marathi": "वनस्पतिवत् होणारी अवस्था",
    "nepali": "वनस्पति अवस्था",
    "spanish": "Etapa vegetativa"
  },
  {
    "english": "Bulbing stage",
    "hindi": "थपकी का मंच",
    "marathi": "बल्बिंग स्टेज",
    "nepali": "बल्लिंग चरण",
    "spanish": "Estantería"
  },
  {
    "english": "Maturity",
    "hindi": "परिपक्वता",
    "marathi": "परिपक्वता",
    "nepali": "परिपक्कता",
    "spanish": "Madurez"
  },
  {
    "english": "Harvesting",
    "hindi": "फसल काटने वाले",
    "marathi": "कापणी",
    "nepali": "फसल काट्नु",
    "spanish": "Cosecha"
  },
  {
    "english": "Germination stage",
    "hindi": "अंकुरण चरण",
    "marathi": "उगवण स्टेज",
    "nepali": "अंकुरण चरण",
    "spanish": "Etapa de germinación"
  },
  {
    "english": "Vegetative stage",
    "hindi": "वनस्पति चरण",
    "marathi": "वनस्पतिवत् होणारी अवस्था",
    "nepali": "वनस्पति अवस्था",
    "spanish": "Etapa vegetativa"
  },
  {
    "english": "Bulbing stage",
    "hindi": "थपकी का मंच",
    "marathi": "बल्बिंग स्टेज",
    "nepali": "बल्लिंग चरण",
    "spanish": "Estantería"
  },
  {
    "english": "Maturation phase",
    "hindi": "परिपक्वता चरण",
    "marathi": "परिपक्वता टप्पा",
    "nepali": "मोटारारी चरण",
    "spanish": "Fase de maduración"
  },
  {
    "english": "Harvesting phase",
    "hindi": "कटाई का चरण",
    "marathi": "कापणीचा टप्पा",
    "nepali": "फसल चरणहरू",
    "spanish": "Fase de cosecha"
  },
  {
    "english": "Sprouting emergence of the bud",
    "hindi": "कली का अंकुरित होना",
    "marathi": "अंकुर फुटणे",
    "nepali": "अंकको उम्रपान गर्ने उम्रपान गर्दै",
    "spanish": "Brote de aparición del brote"
  },
  {
    "english": "Flowering",
    "hindi": "कुसुमित",
    "marathi": "फुलांचे",
    "nepali": "बुरो",
    "spanish": "Floración"
  },
  {
    "english": "Fruit formation",
    "hindi": "फलों का निर्माण",
    "marathi": "फळांची निर्मिती",
    "nepali": "फल गठन",
    "spanish": "Formación de frutas"
  },
  {
    "english": "Fruit development",
    "hindi": "फल -विकास",
    "marathi": "फळ विकास",
    "nepali": "फलत्व विकास",
    "spanish": "Desarrollo de frutas"
  },
  {
    "english": "Maturation",
    "hindi": "परिपक्वता",
    "marathi": "परिपक्वता",
    "nepali": "तर्कश्चा",
    "spanish": "Maduración"
  },
  {
    "english": "Harvesting",
    "hindi": "फसल काटने वाले",
    "marathi": "कापणी",
    "nepali": "फसल काट्नु",
    "spanish": "Cosecha"
  },
  {
    "english": "Emergence stage",
    "hindi": "उद्भव चरण",
    "marathi": "उदय अवस्था",
    "nepali": "उद्भव चरण",
    "spanish": "Etapa de emergencia"
  },
  {
    "english": "Leaf Development",
    "hindi": "पत्ती विकास",
    "marathi": "पानांचा विकास",
    "nepali": "पापा विकास",
    "spanish": "Desarrollo de hojas"
  },
  {
    "english": "Rosette stage",
    "hindi": "रोज़ेट स्टेज",
    "marathi": "रोसेट स्टेज",
    "nepali": "रोस्टेट चरण",
    "spanish": "Escenario de roseta"
  },
  {
    "english": "Inflorescence emergence",
    "hindi": "पुष्पद्रता उद्भव",
    "marathi": "फुलणे उदय",
    "nepali": "Infloreishivage इजरानिट",
    "spanish": "Emergencia de inflorescencia"
  },
  {
    "english": "Flowering stage:",
    "hindi": "फूलों की अवस्था:",
    "marathi": "फुलांचा टप्पा:",
    "nepali": "फूल फुल्ने अवस्था:",
    "spanish": "Etapa de floración:"
  },
  {
    "english": "Siliqua stage",
    "hindi": "सिलिका मंच",
    "marathi": "सिलिका स्टेज",
    "nepali": "शालीन अवस्था",
    "spanish": "Escenario de Siliqua"
  },
  {
    "english": "Ripening phase",
    "hindi": "पकने का चरण",
    "marathi": "पिकणारा टप्पा",
    "nepali": "पाकेको चरण",
    "spanish": "Fase de maduración"
  },
  {
    "english": "Harvesting phase",
    "hindi": "कटाई का चरण",
    "marathi": "कापणीचा टप्पा",
    "nepali": "फसल चरणहरू",
    "spanish": "Fase de cosecha"
  },
  {
    "english": "Vegetative phase",
    "hindi": "वनस्पति चरण",
    "marathi": "वनस्पतीचा टप्पा",
    "nepali": "वनस्पति चरण",
    "spanish": "Fase vegetativa"
  },
  {
    "english": "Flowering / Reproductive phase",
    "hindi": "फूल -प्रजनन चरण",
    "marathi": "फुलांचा / पुनरुत्पादक टप्पा",
    "nepali": "फूल फुल्ने / प्रजनन चरण",
    "spanish": "Fase de floración / reproductiva"
  },
  {
    "english": "Harvest / Reproductive phase",
    "hindi": "कटाई / प्रजनन चरण",
    "marathi": "कापणी / पुनरुत्पादक टप्पा",
    "nepali": "फसल / प्रजनन चरण",
    "spanish": "Fase de cosecha / reproductiva"
  },
  {
    "english": "Emergence stage",
    "hindi": "उद्भव चरण",
    "marathi": "उदय अवस्था",
    "nepali": "उद्भव चरण",
    "spanish": "Etapa de emergencia"
  },
  {
    "english": "Early vegetative stage",
    "hindi": "प्रारंभिक वनस्पति चरण",
    "marathi": "लवकर वनस्पतिवत् होणारी अवस्था",
    "nepali": "प्रारम्भिक वनस्पति चरण",
    "spanish": "Etapa vegetativa temprana"
  },
  {
    "english": "Active tillering stage",
    "hindi": "सक्रिय टिलरिंग स्टेज",
    "marathi": "सक्रिय टिलरिंग स्टेज",
    "nepali": "सक्रिय tillering चरण",
    "spanish": "Etapa de semilla activa"
  },
  {
    "english": "Half bloom stage - 1 st cut",
    "hindi": "हाफ ब्लूम स्टेज - 1 सेंट कट",
    "marathi": "अर्धा ब्लूम स्टेज - 1 सेंट कट",
    "nepali": "आधा ब्लूम स्टेज - 1 TA काटिएको",
    "spanish": "Etapa de mitad de floración - 1 st Cut"
  },
  {
    "english": "Regrowth period",
    "hindi": "पुनरावृत्ति अवधि",
    "marathi": "पुन्हा कालावधी",
    "nepali": "रेग्रोथ अवधि",
    "spanish": "Período de nuevo"
  },
  {
    "english": "2nd cut of timothy grass",
    "hindi": "टिमोथी घास का दूसरा कट",
    "marathi": "तीमथ्य गवतचा दुसरा कट",
    "nepali": "दोस्रो तिँगाएको घाँस",
    "spanish": "Segundo corte de hierba de timoteo"
  },
  {
    "english": "Germination and emergence",
    "hindi": "अंकुरण और उद्भव",
    "marathi": "उगवण आणि उदय",
    "nepali": "अंकुरण र उदय",
    "spanish": "Germinación y emergencia"
  },
  {
    "english": "Vegetative stage",
    "hindi": "वनस्पति चरण",
    "marathi": "वनस्पतिवत् होणारी अवस्था",
    "nepali": "वनस्पति अवस्था",
    "spanish": "Etapa vegetativa"
  },
  {
    "english": "Early bud",
    "hindi": "अर्ली कली",
    "marathi": "लवकर अंकुर",
    "nepali": "चिनिएको अटो",
    "spanish": "Brote"
  },
  {
    "english": "Late bud",
    "hindi": "स्वर्गीय कली",
    "marathi": "उशीरा अंकुर",
    "nepali": "ढिलो बुनेको",
    "spanish": "Brote"
  },
  {
    "english": "Flowering",
    "hindi": "कुसुमित",
    "marathi": "फुलांचे",
    "nepali": "बुरो",
    "spanish": "Floración"
  },
  {
    "english": "Regrowth",
    "hindi": "regrowth",
    "marathi": "पुन्हा",
    "nepali": "Rergrowth",
    "spanish": "Renovación"
  },
  {
    "english": "Emergence stage",
    "hindi": "उद्भव चरण",
    "marathi": "उदय अवस्था",
    "nepali": "उद्भव चरण",
    "spanish": "Etapa de emergencia"
  },
  {
    "english": "Early vegetative stage",
    "hindi": "प्रारंभिक वनस्पति चरण",
    "marathi": "लवकर वनस्पतिवत् होणारी अवस्था",
    "nepali": "प्रारम्भिक वनस्पति चरण",
    "spanish": "Etapa vegetativa temprana"
  },
  {
    "english": "Active tillering stage",
    "hindi": "सक्रिय टिलरिंग स्टेज",
    "marathi": "सक्रिय टिलरिंग स्टेज",
    "nepali": "सक्रिय tillering चरण",
    "spanish": "Etapa de semilla activa"
  },
  {
    "english": "Growth stage",
    "hindi": "वृद्धि चरण",
    "marathi": "वाढीचा टप्पा",
    "nepali": "वृद्धिशाला",
    "spanish": "Etapa de crecimiento"
  },
  {
    "english": "Harvesting stage - 1 st cut",
    "hindi": "कटाई का चरण - 1 सेंट कट",
    "marathi": "कापणीचा टप्पा - 1 एसटी कट",
    "nepali": "फसल कटनी स्टेज - 1 st काटिएको",
    "spanish": "Etapa de cosecha - 1 st Cut"
  },
  {
    "english": "Regrowth period",
    "hindi": "पुनरावृत्ति अवधि",
    "marathi": "पुन्हा कालावधी",
    "nepali": "रेग्रोथ अवधि",
    "spanish": "Período de nuevo"
  },
  {
    "english": "2nd cut of rhodes grass",
    "hindi": "रोड्स घास का दूसरा कट",
    "marathi": "रोड्स गवतचा दुसरा कट",
    "nepali": "रन घाँसको दोस्रो कट",
    "spanish": "Segundo corte de hierba de Rhodes"
  },
  {
    "english": "Germination stage",
    "hindi": "अंकुरण चरण",
    "marathi": "उगवण स्टेज",
    "nepali": "अंकुरण चरण",
    "spanish": "Etapa de germinación"
  },
  {
    "english": "Seedling stage",
    "hindi": "अंकुर",
    "marathi": "बीपासून नुकतेच तयार झालेले रोप",
    "nepali": "खरिद चरण",
    "spanish": "Etapa de plántula"
  },
  {
    "english": "More leaf stage",
    "hindi": "अधिक पत्ती मंच",
    "marathi": "अधिक पानांचा टप्पा",
    "nepali": "थप पातको चरण",
    "spanish": "Más etapa de la hoja"
  },
  {
    "english": "Foliage formation",
    "hindi": "पत्ते का निर्माण",
    "marathi": "पर्णसंभार निर्मिती",
    "nepali": "पत्ते गठन",
    "spanish": "Formación de follaje"
  },
  {
    "english": "Foilage growth",
    "hindi": "पन्नी वृद्धि",
    "marathi": "फॉइलेज ग्रोथ",
    "nepali": "पूर्णजूर वृद्धि",
    "spanish": "Crecimiento de frusaje"
  },
  {
    "english": "Harvesting stage",
    "hindi": "कटाई का चरण",
    "marathi": "कापणीचा टप्पा",
    "nepali": "फसल कटौती स्टेज",
    "spanish": "Etapa de cosecha"
  },
  {
    "english": "Emergence stage",
    "hindi": "उद्भव चरण",
    "marathi": "उदय अवस्था",
    "nepali": "उद्भव चरण",
    "spanish": "Etapa de emergencia"
  },
  {
    "english": "Initial Growth",
    "hindi": "प्रारंभिक वृद्धि",
    "marathi": "प्रारंभिक वाढ",
    "nepali": "प्रारम्भिक वृद्धि",
    "spanish": "Crecimiento inicial"
  },
  {
    "english": "Casing Split and Root Growth",
    "hindi": "आवरण विभाजन और जड़ वृद्धि",
    "marathi": "केसिंग विभाजन आणि मूळ वाढ",
    "nepali": "Cainging विभाजित र मूल वृद्धि",
    "spanish": "División de carcasa y crecimiento de la raíz"
  },
  {
    "english": "Leaf Growth",
    "hindi": "पत्ती वृद्धि",
    "marathi": "पानांची वाढ",
    "nepali": "पातको वृद्धि",
    "spanish": "Crecimiento de la hoja"
  },
  {
    "english": "Flowering",
    "hindi": "कुसुमित",
    "marathi": "फुलांचे",
    "nepali": "बुरो",
    "spanish": "Floración"
  },
  {
    "english": "Pod filling",
    "hindi": "फली भरना",
    "marathi": "पॉड फिलिंग",
    "nepali": "पोड भरिने",
    "spanish": "Relleno de la vaina"
  },
  {
    "english": "Maturity",
    "hindi": "परिपक्वता",
    "marathi": "परिपक्वता",
    "nepali": "परिपक्कता",
    "spanish": "Madurez"
  },
  {
    "english": "Emergence stage",
    "hindi": "उद्भव चरण",
    "marathi": "उदय अवस्था",
    "nepali": "उद्भव चरण",
    "spanish": "Etapa de emergencia"
  },
  {
    "english": "leaf visiblestage",
    "hindi": "पत्ती का विजिटल",
    "marathi": "लीफ व्हिसिबलस्टेज",
    "nepali": "पात देख्दछ",
    "spanish": "Visible de hoja"
  },
  {
    "english": "Growing point differentiation (GPD) stage",
    "hindi": "बढ़ते बिंदु भेदभाव (GPD) चरण",
    "marathi": "वाढती बिंदू भिन्नता (जीपीडी) स्टेज",
    "nepali": "बढ्दो पोइन्ट भिन्नता (जीपीडी) स्टेज",
    "spanish": "Etapa de diferenciación de puntos de crecimiento (GPD)"
  },
  {
    "english": "flag leaf stage",
    "hindi": "झंडा -पत्र",
    "marathi": "ध्वज पानांचा टप्पा",
    "nepali": "फ्ल्याग पात चरण",
    "spanish": "etapa de la hoja de la bandera"
  },
  {
    "english": "Boot stage",
    "hindi": "बूट चरण",
    "marathi": "बूट स्टेज",
    "nepali": "बुट चरण",
    "spanish": "Etapa de arranque"
  },
  {
    "english": "Reproductive or heading stages",
    "hindi": "प्रजनन या शीर्षक चरण",
    "marathi": "पुनरुत्पादक किंवा शीर्षकाचे टप्पे",
    "nepali": "प्रजनन वा हेडिंग चरणहरू",
    "spanish": "Etapas reproductivas o de rumbo"
  },
  {
    "english": "Flowering stage",
    "hindi": "फूल",
    "marathi": "फुलांचा टप्पा",
    "nepali": "फूल फुल्ने अवस्था",
    "spanish": "Etapa de floración"
  },
  {
    "english": "Milk stage",
    "hindi": "दूध का मंच",
    "marathi": "दुधाचा टप्पा",
    "nepali": "दुदुटा अवस्था",
    "spanish": "Etapa de leche"
  },
  {
    "english": "Dough stage",
    "hindi": "आटा मंच",
    "marathi": "पीठ स्टेज",
    "nepali": "आटा चरण",
    "spanish": "Etapa de masa"
  },
  {
    "english": "Seedling stage",
    "hindi": "अंकुर",
    "marathi": "बीपासून नुकतेच तयार झालेले रोप",
    "nepali": "खरिद चरण",
    "spanish": "Etapa de plántula"
  },
  {
    "english": "Pre flowering",
    "hindi": "पूर्व -फूल",
    "marathi": "प्री फ्लॉवरिंग",
    "nepali": "Preighindive",
    "spanish": "Prefloramiento"
  },
  {
    "english": "Pre reproduction",
    "hindi": "पूर्व प्रजनन",
    "marathi": "पूर्व पुनरुत्पादन",
    "nepali": "प्रि प्रजनन",
    "spanish": "Reproducción previa"
  },
  {
    "english": "Early and Mid Bloom",
    "hindi": "जल्दी और मध्य खिलना",
    "marathi": "लवकर आणि मध्यम मोहोर",
    "nepali": "प्रारम्भिक र मध्य फूल",
    "spanish": "Floración temprana y media"
  },
  {
    "english": "Late Bloom",
    "hindi": "लेट ब्लूम",
    "marathi": "उशीरा ब्लूम",
    "nepali": "ढिलो खिल",
    "spanish": "Floración tardía"
  },
  {
    "english": "Harvesting",
    "hindi": "फसल काटने वाले",
    "marathi": "कापणी",
    "nepali": "फसल काट्नु",
    "spanish": "Cosecha"
  },
  {
    "english": "Germination stage",
    "hindi": "अंकुरण चरण",
    "marathi": "उगवण स्टेज",
    "nepali": "अंकुरण चरण",
    "spanish": "Etapa de germinación"
  },
  {
    "english": "Panicle initiation",
    "hindi": "पन्ना",
    "marathi": "पॅनिकल दीक्षा",
    "nepali": "Panicle दीक्षा",
    "spanish": "Iniciación de la panícula"
  },
  {
    "english": "Boot stage",
    "hindi": "बूट चरण",
    "marathi": "बूट स्टेज",
    "nepali": "बुट चरण",
    "spanish": "Etapa de arranque"
  },
  {
    "english": "50% stigma emergence",
    "hindi": "50% कलंक उद्भव",
    "marathi": "50% कलंक उदय",
    "nepali": "% 0% stigma उतार",
    "spanish": "50% de emergencia de estigma"
  },
  {
    "english": "Milk stage",
    "hindi": "दूध का मंच",
    "marathi": "दुधाचा टप्पा",
    "nepali": "दुदुटा अवस्था",
    "spanish": "Etapa de leche"
  },
  {
    "english": "Dough stage",
    "hindi": "आटा मंच",
    "marathi": "पीठ स्टेज",
    "nepali": "आटा चरण",
    "spanish": "Etapa de masa"
  },
  {
    "english": "Physiological maturity",
    "hindi": "शारीरिक परिपक्वता",
    "marathi": "शारीरिक परिपक्वता",
    "nepali": "शारीरिक परिपक्वता",
    "spanish": "Madurez fisiológica"
  },
  {
    "english": "Germination stage",
    "hindi": "अंकुरण चरण",
    "marathi": "उगवण स्टेज",
    "nepali": "अंकुरण चरण",
    "spanish": "Etapa de germinación"
  },
  {
    "english": "Vegetative stage",
    "hindi": "वनस्पति चरण",
    "marathi": "वनस्पतिवत् होणारी अवस्था",
    "nepali": "वनस्पति अवस्था",
    "spanish": "Etapa vegetativa"
  },
  {
    "english": "Flower initiation and flowering stage",
    "hindi": "फूलों की दीक्षा और फूलों की अवस्था",
    "marathi": "फ्लॉवर दीक्षा आणि फुलांचा टप्पा",
    "nepali": "फूल पहल र फूल फुल्ने अवस्था",
    "spanish": "Iniciación de flores y etapa de floración"
  },
  {
    "english": "Fruiting stage",
    "hindi": "फलने -फूलने की अवस्था",
    "marathi": "फळ देणारी अवस्था",
    "nepali": "फलफूल चरण",
    "spanish": "Etapa fructíaca"
  },
  {
    "english": "Maturity stage",
    "hindi": "परिपक्वता अवस्था",
    "marathi": "परिपक्वता टप्पा",
    "nepali": "परिपक्वता देश",
    "spanish": "Etapa de madurez"
  },
  {
    "english": "Harvesting stage",
    "hindi": "कटाई का चरण",
    "marathi": "कापणीचा टप्पा",
    "nepali": "फसल कटौती स्टेज",
    "spanish": "Etapa de cosecha"
  },
  {
    "english": "Transplanting stage",
    "hindi": "प्रत्यारोपण अवस्था",
    "marathi": "प्रत्यारोपणाचा टप्पा",
    "nepali": "ट्रान्सप्लान्ट स्टेज",
    "spanish": "Etapa de trasplante"
  },
  {
    "english": "Plant establishment stage",
    "hindi": "संयंत्र प्रतिष्ठान चरण",
    "marathi": "वनस्पती स्थापना स्टेज",
    "nepali": "बोट स्थापना चरण",
    "spanish": "Etapa de establecimiento de plantas"
  },
  {
    "english": "Cupping stage",
    "hindi": "कूड़ा",
    "marathi": "कूपिंग स्टेज",
    "nepali": "कन्टेड स्टेज",
    "spanish": "Estadía"
  },
  {
    "english": "Head development stage",
    "hindi": "प्रधान विकास चरण",
    "marathi": "डोके विकासाचा टप्पा",
    "nepali": "टाउको विकास चरण",
    "spanish": "Etapa de desarrollo de la cabeza"
  },
  {
    "english": "Maturity stage",
    "hindi": "परिपक्वता अवस्था",
    "marathi": "परिपक्वता टप्पा",
    "nepali": "परिपक्वता देश",
    "spanish": "Etapa de madurez"
  },
  {
    "english": "Harvesting stage",
    "hindi": "कटाई का चरण",
    "marathi": "कापणीचा टप्पा",
    "nepali": "फसल कटौती स्टेज",
    "spanish": "Etapa de cosecha"
  },
  {
    "english": "vegetative",
    "hindi": "वनस्पतिक",
    "marathi": "वनस्पती",
    "nepali": "वंश",
    "spanish": "vegetativo"
  },
  {
    "english": "Flowering",
    "hindi": "कुसुमित",
    "marathi": "फुलांचे",
    "nepali": "बुरो",
    "spanish": "Floración"
  },
  {
    "english": "Pod development",
    "hindi": "फली विकास",
    "marathi": "पीओडी विकास",
    "nepali": "पोड विकास",
    "spanish": "Desarrollo de la vaina"
  },
  {
    "english": "Maturity",
    "hindi": "परिपक्वता",
    "marathi": "परिपक्वता",
    "nepali": "परिपक्कता",
    "spanish": "Madurez"
  },
  {
    "english": "First Vegetative phase",
    "hindi": "पहला वनस्पति चरण",
    "marathi": "पहिला वनस्पतिवत् होणारी अवस्था",
    "nepali": "पहिलो वनस्पति चरण",
    "spanish": "Primera fase vegetativa"
  },
  {
    "english": "Second Vegetative phase",
    "hindi": "द्वितीय वनस्पति चरण",
    "marathi": "दुसरा वनस्पतिवत् होणारी अवस्था",
    "nepali": "दोस्रो वनस्पति चरण",
    "spanish": "Segunda fase vegetativa"
  },
  {
    "english": "Flowering / Reproductive phase",
    "hindi": "फूल -प्रजनन चरण",
    "marathi": "फुलांचा / पुनरुत्पादक टप्पा",
    "nepali": "फूल फुल्ने / प्रजनन चरण",
    "spanish": "Fase de floración / reproductiva"
  },
  {
    "english": "Harvest / Reproductive phase",
    "hindi": "कटाई / प्रजनन चरण",
    "marathi": "कापणी / पुनरुत्पादक टप्पा",
    "nepali": "फसल / प्रजनन चरण",
    "spanish": "Fase de cosecha / reproductiva"
  },
  {
    "english": "First Vegetative phase",
    "hindi": "पहला वनस्पति चरण",
    "marathi": "पहिला वनस्पतिवत् होणारी अवस्था",
    "nepali": "पहिलो वनस्पति चरण",
    "spanish": "Primera fase vegetativa"
  },
  {
    "english": "Second Vegetative phase",
    "hindi": "द्वितीय वनस्पति चरण",
    "marathi": "दुसरा वनस्पतिवत् होणारी अवस्था",
    "nepali": "दोस्रो वनस्पति चरण",
    "spanish": "Segunda fase vegetativa"
  },
  {
    "english": "Flowering / Reproductive phase",
    "hindi": "फूल -प्रजनन चरण",
    "marathi": "फुलांचा / पुनरुत्पादक टप्पा",
    "nepali": "फूल फुल्ने / प्रजनन चरण",
    "spanish": "Fase de floración / reproductiva"
  },
  {
    "english": "Harvest / Reproductive phase",
    "hindi": "कटाई / प्रजनन चरण",
    "marathi": "कापणी / पुनरुत्पादक टप्पा",
    "nepali": "फसल / प्रजनन चरण",
    "spanish": "Fase de cosecha / reproductiva"
  },
  {
    "english": "Vegetative phase",
    "hindi": "वनस्पति चरण",
    "marathi": "वनस्पतीचा टप्पा",
    "nepali": "वनस्पति चरण",
    "spanish": "Fase vegetativa"
  },
  {
    "english": "Flowering / Reproductive phase",
    "hindi": "फूल -प्रजनन चरण",
    "marathi": "फुलांचा / पुनरुत्पादक टप्पा",
    "nepali": "फूल फुल्ने / प्रजनन चरण",
    "spanish": "Fase de floración / reproductiva"
  },
  {
    "english": "Harvest / Reproductive phase",
    "hindi": "कटाई / प्रजनन चरण",
    "marathi": "कापणी / पुनरुत्पादक टप्पा",
    "nepali": "फसल / प्रजनन चरण",
    "spanish": "Fase de cosecha / reproductiva"
  },
  {
    "english": "Post harvest phase",
    "hindi": "हार्वेस्ट चरण",
    "marathi": "कापणीनंतरचा टप्पा",
    "nepali": "फसल चरण चरण",
    "spanish": "Fase de post cosecha"
  },
  {
    "english": "Vegetative phase",
    "hindi": "वनस्पति चरण",
    "marathi": "वनस्पतीचा टप्पा",
    "nepali": "वनस्पति चरण",
    "spanish": "Fase vegetativa"
  },
  {
    "english": "Flowering / Reproductive phase",
    "hindi": "फूल -प्रजनन चरण",
    "marathi": "फुलांचा / पुनरुत्पादक टप्पा",
    "nepali": "फूल फुल्ने / प्रजनन चरण",
    "spanish": "Fase de floración / reproductiva"
  },
  {
    "english": "Harvest / Reproductive phase",
    "hindi": "कटाई / प्रजनन चरण",
    "marathi": "कापणी / पुनरुत्पादक टप्पा",
    "nepali": "फसल / प्रजनन चरण",
    "spanish": "Fase de cosecha / reproductiva"
  },
  {
    "english": "Post harvest phase",
    "hindi": "हार्वेस्ट चरण",
    "marathi": "कापणीनंतरचा टप्पा",
    "nepali": "फसल चरण चरण",
    "spanish": "Fase de post cosecha"
  }
]
const xlsx = require("xlsx")
const moment = require("moment")

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
