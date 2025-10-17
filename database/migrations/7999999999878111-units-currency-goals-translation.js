'use strict';
const path = require("path");
const moment = require("moment")

let jsonData = [
  {
    "english": "Gram",
    "hindi": "ग्राम",
    "marathi": "हरभरा",
    "nepali": "चना",
    "spanish": "Gramo"
  },
  {
    "english": "Kilogram",
    "hindi": "किलोग्राम",
    "marathi": "किलोग्राम",
    "nepali": "किलोग्राम",
    "spanish": "Kilogramo"
  },
  {
    "english": "Pound",
    "hindi": "पाउंड",
    "marathi": "पाउंड",
    "nepali": "बेवारिस जन्तु",
    "spanish": "Libra"
  },
  {
    "english": "Centimeter",
    "hindi": "सेंटीमीटर",
    "marathi": "सेंटीमीटर",
    "nepali": "सेन्टीमिटर",
    "spanish": "Centímetro"
  },
  {
    "english": "Meter",
    "hindi": "मीटर",
    "marathi": "मीटर",
    "nepali": "मीटर",
    "spanish": "Metro"
  },
  {
    "english": "Liter-Per-Hectar",
    "hindi": "प्रतिष्ठित",
    "marathi": "लिटर-प्रति-हेक्टर",
    "nepali": "लिटर-प्रति-हेक्टर",
    "spanish": "Litro-por hectar"
  },
  {
    "english": "Milliliters per Square Meter",
    "hindi": "प्रति वर्ग मीटर मिलिलिटर",
    "marathi": "मिलीलीटर प्रति चौरस मीटर",
    "nepali": "प्रति वर्ग मीटर मिलिलिटर",
    "spanish": "Mililitros por metro cuadrado"
  },
  {
    "english": "Kilogram per Acre",
    "hindi": "किलोग्राम प्रति एकड़",
    "marathi": "प्रति एकर किलोग्राम",
    "nepali": "प्रति एकर किलोग्राम",
    "spanish": "Kilogramo por acre"
  },
  {
    "english": "Kilogram per Hectare",
    "hindi": "किलोग्राम प्रति हेक्टेयर",
    "marathi": "प्रति हेक्टर किलोग्राम",
    "nepali": "प्रति हेक्टर किलोग्राम",
    "spanish": "Kilogramo por hectárea"
  },
  {
    "english": "Tonnes per Hectare",
    "hindi": "टन प्रति हेक्टेयर",
    "marathi": "प्रति हेक्टर टन",
    "nepali": "प्रति हेक्स हेक्स",
    "spanish": "Toneladas por hectárea"
  },
  {
    "english": "Bushels per Hectare",
    "hindi": "प्रति हेक्टेयर बुशल",
    "marathi": "प्रति हेक्टर बुशेल",
    "nepali": "विक्रेता प्रति हेक्टर",
    "spanish": "Bushels por hectárea"
  },
  {
    "english": "Bushels per Acre",
    "hindi": "प्रति एकड़ बुशल",
    "marathi": "प्रति एकर बुशेल",
    "nepali": "प्रति एकर बुशेहरू",
    "spanish": "Bushels por acre"
  },
  {
    "english": "Bags per Hectare",
    "hindi": "प्रति हेक्टेयर बैग",
    "marathi": "प्रति हेक्टर पिशव्या",
    "nepali": "झोला प्रति हेक्टर",
    "spanish": "Bolsas por hectárea"
  },
  {
    "english": "Bags per Acre",
    "hindi": "प्रति एकड़ बैग",
    "marathi": "प्रति एकर पिशव्या",
    "nepali": "प्रति एकर झोला",
    "spanish": "Bolsas por acre"
  },
  {
    "english": "Tonnes per Acre",
    "hindi": "टन प्रति एकड़",
    "marathi": "टन प्रति एकर",
    "nepali": "प्रति एकर टन",
    "spanish": "Toneladas por acre"
  },
  {
    "english": "Kilogram/Tree",
    "hindi": "किलोग्राम/पेड़",
    "marathi": "किलोग्राम/झाड",
    "nepali": "किलोग्राम / रूख",
    "spanish": "Kilogramo/árbol"
  },
  {
    "english": "Acre",
    "hindi": "एकड़",
    "marathi": "एकर",
    "nepali": "एकेर",
    "spanish": "Acre"
  },
  {
    "english": "Hectares",
    "hindi": "हेक्टेयर",
    "marathi": "हेक्टर",
    "nepali": "हेक्टर",
    "spanish": "Hectáreas"
  },
  {
    "english": "Millimetres",
    "hindi": "मिलीमीटर",
    "marathi": "मिलिमीटर",
    "nepali": "मिलिमिटर",
    "spanish": "Milímetros"
  },
  {
    "english": "Centimeter",
    "hindi": "सेंटीमीटर",
    "marathi": "सेंटीमीटर",
    "nepali": "सेन्टीमिटर",
    "spanish": "Centímetro"
  },
  {
    "english": "Meter",
    "hindi": "मीटर",
    "marathi": "मीटर",
    "nepali": "मीटर",
    "spanish": "Metro"
  },
  {
    "english": "Acre",
    "hindi": "एकड़",
    "marathi": "एकर",
    "nepali": "एकेर",
    "spanish": "Acre"
  },
  {
    "english": "Hectare",
    "hindi": "हैक्टर",
    "marathi": "हेक्टर",
    "nepali": "हे देखि लागेको",
    "spanish": "Hectárea"
  },
  {
    "english": "Millileter",
    "hindi": "मिलीलीटर",
    "marathi": "मिलीलीटर",
    "nepali": "मिलीटर",
    "spanish": "Mililéter"
  },
  {
    "english": "Liter",
    "hindi": "लीटर",
    "marathi": "लिटर",
    "nepali": "लिइर",
    "spanish": "Litro"
  },
  {
    "english": "Acre",
    "hindi": "एकड़",
    "marathi": "एकर",
    "nepali": "एकेर",
    "spanish": "Acre"
  },
  {
    "english": "Hectare",
    "hindi": "हैक्टर",
    "marathi": "हेक्टर",
    "nepali": "हे देखि लागेको",
    "spanish": "Hectárea"
  },
  {
    "english": "Kg",
    "hindi": "किलोग्राम",
    "marathi": "किलो",
    "nepali": "के। जि",
    "spanish": "Kg"
  },
  {
    "english": "Tonnes",
    "hindi": "टन",
    "marathi": "टन",
    "nepali": "लामो",
    "spanish": "Tonelada"
  },
  {
    "english": "Kilogram per Acre",
    "hindi": "किलोग्राम प्रति एकड़",
    "marathi": "प्रति एकर किलोग्राम",
    "nepali": "प्रति एकर किलोग्राम",
    "spanish": "Kilogramo por acre"
  },
  {
    "english": "Kilogram per Hectare",
    "hindi": "किलोग्राम प्रति हेक्टेयर",
    "marathi": "प्रति हेक्टर किलोग्राम",
    "nepali": "प्रति हेक्टर किलोग्राम",
    "spanish": "Kilogramo por hectárea"
  },
  {
    "english": "Tonnes per Acre",
    "hindi": "टन प्रति एकड़",
    "marathi": "टन प्रति एकर",
    "nepali": "प्रति एकर टन",
    "spanish": "Toneladas por acre"
  },
  {
    "english": "Tonnes per Hectare",
    "hindi": "टन प्रति हेक्टेयर",
    "marathi": "प्रति हेक्टर टन",
    "nepali": "प्रति हेक्स हेक्स",
    "spanish": "Toneladas por hectárea"
  },
  {
    "english": "Litres/hectare",
    "hindi": "लीटर/हेक्टेयर",
    "marathi": "लिटर/हेक्टर",
    "nepali": "लिटर / हेक्टर",
    "spanish": "Litros/hectárea"
  },
  {
    "english": "Ounces/hectare",
    "hindi": "औंस/हेक्टेयर",
    "marathi": "औंस/हेक्टर",
    "nepali": "औन्स / हेक्टर",
    "spanish": "Onzas/hectáreas"
  },
  {
    "english": "mg/hectare",
    "hindi": "एमजी/हेक्टेयर",
    "marathi": "मिलीग्राम/हेक्टर",
    "nepali": "MG / हेक्टर",
    "spanish": "mg/hectárea"
  },
  {
    "english": "g/hectare",
    "hindi": "जी/हेक्टेयर",
    "marathi": "जी/हेक्टर",
    "nepali": "g / हेक्टर",
    "spanish": "g/hectárea"
  },
  {
    "english": "kg/hectare",
    "hindi": "किलो/हेक्टेयर",
    "marathi": "किलो/हेक्टर",
    "nepali": "KG / हेक्टर",
    "spanish": "kg/hectárea"
  },
  {
    "english": "Litres",
    "hindi": "लीटर",
    "marathi": "लिटर",
    "nepali": "साहिकरिका बोट",
    "spanish": "Litros"
  },
  {
    "english": "Ounces",
    "hindi": "औंस",
    "marathi": "औंस",
    "nepali": "औसत",
    "spanish": "Onzas"
  },
  {
    "english": "mg",
    "hindi": "एमजी",
    "marathi": "मिलीग्राम",
    "nepali": "मिग",
    "spanish": "mg"
  },
  {
    "english": "kg",
    "hindi": "किलोग्राम",
    "marathi": "किलो",
    "nepali": "के। जि",
    "spanish": "kg"
  },
  {
    "english": "g",
    "hindi": "जी",
    "marathi": "जी",
    "nepali": "g",
    "spanish": "gramo"
  },
  {
    "english": "Gallons/acre",
    "hindi": "गैलन/एकड़",
    "marathi": "गॅलन/एकर",
    "nepali": "Gallons / एकर",
    "spanish": "Galones/acre"
  },
  {
    "english": "Gallons/hectare",
    "hindi": "गैलन/हेक्टेयर",
    "marathi": "गॅलन/हेक्टर",
    "nepali": "Gallons / हेक्टर",
    "spanish": "Galones/hectáreas"
  },
  {
    "english": "Liters/hectare",
    "hindi": "लीटर/हेक्टेयर",
    "marathi": "लिटर/हेक्टर",
    "nepali": "लिटर / हेक्टर",
    "spanish": "Litros/hectárea"
  },
  {
    "english": "Liters/acre",
    "hindi": "लीटर/एकड़",
    "marathi": "लिटर/एकर",
    "nepali": "लिटर / एकर",
    "spanish": "Litros/acre"
  },
  {
    "english": "Centimeter",
    "hindi": "सेंटीमीटर",
    "marathi": "सेंटीमीटर",
    "nepali": "सेन्टीमिटर",
    "spanish": "Centímetro"
  },
  {
    "english": "Meter",
    "hindi": "मीटर",
    "marathi": "मीटर",
    "nepali": "मीटर",
    "spanish": "Metro"
  },
  {
    "english": "kg/ha",
    "hindi": "किलो/हेक्टेयर",
    "marathi": "किलो/हेक्टर",
    "nepali": "केजी / हे",
    "spanish": "kg/ha"
  },
  {
    "english": "ppm",
    "hindi": "पीपीएम",
    "marathi": "पीपीएम",
    "nepali": "पीपीएम",
    "spanish": "PPM"
  },
  {
    "english": "mg/l",
    "hindi": "एमजी/एल",
    "marathi": "मिलीग्राम/एल",
    "nepali": "MG / l",
    "spanish": "mg/l"
  },
  {
    "english": "Kg per hectare",
    "hindi": "प्रति हेक्टेयर",
    "marathi": "प्रति हेक्टर किलो",
    "nepali": "प्रति हेक्टर kg",
    "spanish": "Kg por hectárea"
  },
  {
    "english": "Kg per acre",
    "hindi": "प्रति एकड़ किलो",
    "marathi": "प्रति एकर किलो",
    "nepali": "Kg प्रति एकर",
    "spanish": "Kg por acre"
  },
  {
    "english": "Tonne per hectare",
    "hindi": "टन प्रति हेक्टेयर",
    "marathi": "प्रति हेक्टर टन",
    "nepali": "प्रति हेक्टर टन",
    "spanish": "Tonelada por hectárea"
  },
  {
    "english": "Tonne per acre",
    "hindi": "टन प्रति एकड़",
    "marathi": "प्रति एकर टन",
    "nepali": "प्रति एकर टन",
    "spanish": "Tonelada por acre"
  },
  {
    "english": "Pounds",
    "hindi": "पाउंड",
    "marathi": "पाउंड",
    "nepali": "अग्लो राख्नु",
    "spanish": "Libras"
  },
  {
    "english": "Grams",
    "hindi": "ग्राम",
    "marathi": "ग्रॅम",
    "nepali": "गाम",
    "spanish": "Gramos"
  },
  {
    "english": "Kilograms",
    "hindi": "किलोग्राम",
    "marathi": "किलोग्राम",
    "nepali": "किलोग्राम",
    "spanish": "Kilogramos"
  },
  {
    "english": "Tonnes",
    "hindi": "टन",
    "marathi": "टन",
    "nepali": "लामो",
    "spanish": "Tonelada"
  },
  {
    "english": "Tonne per acre",
    "hindi": "टन प्रति एकड़",
    "marathi": "प्रति एकर टन",
    "nepali": "प्रति एकर टन",
    "spanish": "Tonelada por acre"
  },
  {
    "english": "Kg per hectare",
    "hindi": "प्रति हेक्टेयर",
    "marathi": "प्रति हेक्टर किलो",
    "nepali": "प्रति हेक्टर kg",
    "spanish": "Kg por hectárea"
  },
  {
    "english": "Kg per acre",
    "hindi": "प्रति एकड़ किलो",
    "marathi": "प्रति एकर किलो",
    "nepali": "Kg प्रति एकर",
    "spanish": "Kg por acre"
  },
  {
    "english": "Tonne per hectare",
    "hindi": "टन प्रति हेक्टेयर",
    "marathi": "प्रति हेक्टर टन",
    "nepali": "प्रति हेक्टर टन",
    "spanish": "Tonelada por hectárea"
  },
  {
    "english": "Kilograms",
    "hindi": "किलोग्राम",
    "marathi": "किलोग्राम",
    "nepali": "किलोग्राम",
    "spanish": "Kilogramos"
  },
  {
    "english": "Tonnes",
    "hindi": "टन",
    "marathi": "टन",
    "nepali": "लामो",
    "spanish": "Tonelada"
  },
  {
    "english": "Pounds",
    "hindi": "पाउंड",
    "marathi": "पाउंड",
    "nepali": "अग्लो राख्नु",
    "spanish": "Libras"
  },
  {
    "english": "Tonne per hectare",
    "hindi": "टन प्रति हेक्टेयर",
    "marathi": "प्रति हेक्टर टन",
    "nepali": "प्रति हेक्टर टन",
    "spanish": "Tonelada por hectárea"
  },
  {
    "english": "Tonne per acre",
    "hindi": "टन प्रति एकड़",
    "marathi": "प्रति एकर टन",
    "nepali": "प्रति एकर टन",
    "spanish": "Tonelada por acre"
  },
  {
    "english": "Kg per acre",
    "hindi": "प्रति एकड़ किलो",
    "marathi": "प्रति एकर किलो",
    "nepali": "Kg प्रति एकर",
    "spanish": "Kg por acre"
  },
  {
    "english": "Kg per hectare",
    "hindi": "प्रति हेक्टेयर",
    "marathi": "प्रति हेक्टर किलो",
    "nepali": "प्रति हेक्टर kg",
    "spanish": "Kg por hectárea"
  },
  {
    "english": "Kilograms",
    "hindi": "किलोग्राम",
    "marathi": "किलोग्राम",
    "nepali": "किलोग्राम",
    "spanish": "Kilogramos"
  },
  {
    "english": "Tonnes",
    "hindi": "टन",
    "marathi": "टन",
    "nepali": "लामो",
    "spanish": "Tonelada"
  },
  {
    "english": "Pounds",
    "hindi": "पाउंड",
    "marathi": "पाउंड",
    "nepali": "अग्लो राख्नु",
    "spanish": "Libras"
  },
  {
    "english": "kg/ha",
    "hindi": "किलो/हेक्टेयर",
    "marathi": "किलो/हेक्टर",
    "nepali": "केजी / हे",
    "spanish": "kg/ha"
  },
  {
    "english": "ppm",
    "hindi": "पीपीएम",
    "marathi": "पीपीएम",
    "nepali": "पीपीएम",
    "spanish": "PPM"
  },
  {
    "english": "mg/l",
    "hindi": "एमजी/एल",
    "marathi": "मिलीग्राम/एल",
    "nepali": "MG / l",
    "spanish": "mg/l"
  },
  {
    "english": "kg/ml",
    "hindi": "किग्रा/एमएल",
    "marathi": "किलो/मिली",
    "nepali": "KG / ML",
    "spanish": "kg/ml"
  },
  {
    "english": "g/ml",
    "hindi": "जी/एमएल",
    "marathi": "जी/एमएल",
    "nepali": "g / ml",
    "spanish": "g/ml"
  },
  {
    "english": "kg/ha",
    "hindi": "किलो/हेक्टेयर",
    "marathi": "किलो/हेक्टर",
    "nepali": "केजी / हे",
    "spanish": "kg/ha"
  },
  {
    "english": "ppm",
    "hindi": "पीपीएम",
    "marathi": "पीपीएम",
    "nepali": "पीपीएम",
    "spanish": "PPM"
  },
  {
    "english": "mg/l",
    "hindi": "एमजी/एल",
    "marathi": "मिलीग्राम/एल",
    "nepali": "MG / l",
    "spanish": "mg/l"
  },
  {
    "english": "mg/l",
    "hindi": "एमजी/एल",
    "marathi": "मिलीग्राम/एल",
    "nepali": "MG / l",
    "spanish": "mg/l"
  },
  {
    "english": "kg/ha",
    "hindi": "किलो/हेक्टेयर",
    "marathi": "किलो/हेक्टर",
    "nepali": "केजी / हे",
    "spanish": "kg/ha"
  },
  {
    "english": "ppm",
    "hindi": "पीपीएम",
    "marathi": "पीपीएम",
    "nepali": "पीपीएम",
    "spanish": "PPM"
  },
  {
    "english": "Pounds",
    "hindi": "पाउंड",
    "marathi": "पाउंड",
    "nepali": "अग्लो राख्नु",
    "spanish": "Libras"
  },
  {
    "english": "Kilograms",
    "hindi": "किलोग्राम",
    "marathi": "किलोग्राम",
    "nepali": "किलोग्राम",
    "spanish": "Kilogramos"
  },
  {
    "english": "Tonnes",
    "hindi": "टन",
    "marathi": "टन",
    "nepali": "लामो",
    "spanish": "Tonelada"
  },
  {
    "english": "Milligrams (N)/Liter",
    "hindi": "मिलीग्राम (एन)/लीटर",
    "marathi": "मिलीग्राम (एन)/लिटर",
    "nepali": "मिलिग्रामहरू (n) / लिटर",
    "spanish": "Miligramos (n)/litro"
  },
  {
    "english": "Kg (N)/hectare",
    "hindi": "किलो (एन)/हेक्टेयर",
    "marathi": "किलो (एन)/हेक्टर",
    "nepali": "Kg (n) / हेक्टर",
    "spanish": "Kg (n)/hectárea"
  },
  {
    "english": "parts (N)/million",
    "hindi": "भागों (एन)/मिलियन",
    "marathi": "भाग (एन)/दशलक्ष",
    "nepali": "भागहरू (एन) / मिलियन",
    "spanish": "Partes (n)/millones"
  },
  {
    "english": "Milligrams (P2O5)/Liter",
    "hindi": "मिलीग्राम (P2O5)/लीटर",
    "marathi": "मिलीग्राम (पी 2 ओ 5)/लिटर",
    "nepali": "मिलिग्रामहरू (P2O5) / लिटर",
    "spanish": "Miligramos (P2O5)/litro"
  },
  {
    "english": "Kg (P2O5)/hectare",
    "hindi": "किलो (P2O5)/हेक्टेयर",
    "marathi": "किलो (पी 2 ओ 5)/हेक्टर",
    "nepali": "केजी (P2O5) / हेक्टर",
    "spanish": "Kg (P2O5)/hectárea"
  },
  {
    "english": "parts (P2O5)/million",
    "hindi": "भागों (P2O5)/मिलियन",
    "marathi": "भाग (पी 2 ओ 5)/दशलक्ष",
    "nepali": "भागहरू (P2O5) / मिलियन",
    "spanish": "Partes (P2O5)/millones"
  },
  {
    "english": "Milligrams (K20)/Liter",
    "hindi": "मिलीग्राम (K20)/लीटर",
    "marathi": "मिलीग्राम (के 20)/लिटर",
    "nepali": "मिलिग्रामहरू (K20) / लिटर",
    "spanish": "Miligramos (K20)/litro"
  },
  {
    "english": "Kg (K20)/hectare",
    "hindi": "केजी (K20)/हेक्टेयर",
    "marathi": "किलो (के 20)/हेक्टर",
    "nepali": "KG (K20) / हेक्टर",
    "spanish": "Kg (k20)/hectárea"
  },
  {
    "english": "parts (K20)/million",
    "hindi": "भागों (K20)/मिलियन",
    "marathi": "भाग (के 20)/दशलक्ष",
    "nepali": "भागहरू (K20) / मिलियन",
    "spanish": "Partes (K20)/millones"
  },
  {
    "english": "kg per centimetre cube",
    "hindi": "किलोमीटर क्यूब",
    "marathi": "किलो टक्के क्यूब",
    "nepali": "kg प्रति सेन्टिमिटर क्युब",
    "spanish": "kg por ciento de cubo"
  },
  {
    "english": "kg/cm3",
    "hindi": "किलो/सेमी 3",
    "marathi": "केजी/सेमी 3",
    "nepali": "KG / CM3",
    "spanish": "kg/cm3"
  },
  {
    "english": "gr/m3",
    "hindi": "जीआर/एम 3",
    "marathi": "जीआर/एम 3",
    "nepali": "GR / M3",
    "spanish": "Gr/M3"
  },
  {
    "english": "Ugandan shilling",
    "hindi": "युगांडा शिलिंग",
    "marathi": "युगांडन शिलिंग",
    "nepali": "युगान्डिन शिलिंग",
    "spanish": "Chelín ugandés"
  },
  {
    "english": "Indian rupee",
    "hindi": "भारतीय रुपया",
    "marathi": "भारतीय रुपया",
    "nepali": "भारतीय रुपैया",
    "spanish": "Rupia india"
  },
  {
    "english": "United States dollar",
    "hindi": "यूनाइटेड स्टेट का डॉलर",
    "marathi": "युनायटेड स्टेट्स डॉलर",
    "nepali": "संयुक्त राज्यका डलर",
    "spanish": "dólar de los Estados Unidos"
  },
  {
    "english": "Indonesian Rupiah",
    "hindi": "इंडोनेशियाई रूपिया",
    "marathi": "इंडोनेशियन रुपीया",
    "nepali": "इन्डोनेसियाली Rupah",
    "spanish": "Rupia indonesia"
  },
  {
    "english": "Euro",
    "hindi": "यूरो",
    "marathi": "युरो",
    "nepali": "यूरो",
    "spanish": "Euro"
  },
  {
    "english": "Singapore Dollar",
    "hindi": "सिंगापुर का डॉलर",
    "marathi": "सिंगापूर डॉलर",
    "nepali": "सिंगापुर डलर",
    "spanish": "Dolar de Singapur"
  },
  {
    "english": "Brazilian Real",
    "hindi": "ब्राजीली रियल",
    "marathi": "ब्राझिलियन वास्तविक",
    "nepali": "ब्राजिलियन वास्तविक",
    "spanish": "Real brasileño"
  },
  {
    "english": "Canadian Dollar",
    "hindi": "कैनेडियन डॉलर",
    "marathi": "कॅनेडियन डॉलर",
    "nepali": "क्यानाडाली डलर",
    "spanish": "Dolar canadiense"
  },
  {
    "english": "CFP Franc",
    "hindi": "सीएफपी फ्रैंक",
    "marathi": "सीएफपी फ्रँक",
    "nepali": "CFP फ्रान्क",
    "spanish": "Franco de CFP"
  },
  {
    "english": "French Franc",
    "hindi": "फ्रेंच फ्रैंक",
    "marathi": "फ्रेंच फ्रँक",
    "nepali": "फ्रेन्च फ्रान्क",
    "spanish": "Francés"
  },
  {
    "english": "Italian Lira",
    "hindi": "इटालियन लीरा",
    "marathi": "इटालियन लीरा",
    "nepali": "इटालियन लीरा",
    "spanish": "Lira italiana"
  },
  {
    "english": "Kuwaiti Dinar",
    "hindi": "कुवैती दीनार",
    "marathi": "कुवैती दिनार",
    "nepali": "Kuwaiti Deear",
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
    "hindi": "नेपाली रूप",
    "marathi": "नेपाळी रुपया",
    "nepali": "नेपाली रुपैयाँ",
    "spanish": "Rupia nepalí"
  },
  {
    "english": "United Arab Emirates Dirham",
    "hindi": "संयुक्त अरब अमीरात दिरहम",
    "marathi": "संयुक्त अरब अमिराती दिरहॅम",
    "nepali": "संयुक्त अरब एमिरेट्स दिरहम",
    "spanish": "Emiratos Árabes Unidos Dirham"
  },
  {
    "english": "Increasing The Yields",
    "hindi": "पैदावार बढ़ाना",
    "marathi": "उत्पन्न वाढवित आहे",
    "nepali": "उत्पादन बढाउँदै",
    "spanish": "Aumentando los rendimientos"
  },
  {
    "english": "Optimize The Use Of Synthetic Fertilizers",
    "hindi": "सिंथेटिक उर्वरकों के उपयोग का अनुकूलन करें",
    "marathi": "कृत्रिम खतांचा वापर अनुकूलित करा",
    "nepali": "सिंथेटिक मलहरूको प्रयोग अनुकूलन गर्नुहोस्",
    "spanish": "Optimizar el uso de fertilizantes sintéticos"
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
