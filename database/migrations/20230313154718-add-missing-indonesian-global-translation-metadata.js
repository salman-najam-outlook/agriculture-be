"use strict";
const moment = require("moment");
const langaugeObjects = [
  {
    "id": 36133,
    "english": "Arusha",
    "indonesian": "Arusha"
  },
  {
    "id": 36134,
    "english": "Batian",
    "indonesian": "Batian"
  },
  {
    "id": 36138,
    "english": "Bernardina",
    "indonesian": "Bernardina"
  },
  {
    "id": 36139,
    "english": "Blawan Paumah",
    "indonesian": "Blawan Paumah"
  },
  {
    "id": 36140,
    "english": "Blue Mountain",
    "indonesian": "Blue Mountain"
  },
  {
    "id": 36142,
    "english": "Bonifieur",
    "indonesian": "Bonifieur"
  },
  {
    "id": 36149,
    "english": "Caturra",
    "indonesian": "Caturra"
  },
  {
    "id": 36150,
    "english": "Cauvery",
    "indonesian": "Cauvery"
  },
  {
    "id": 36151,
    "english": "Cera",
    "indonesian": "Cera"
  },
  {
    "id": 36152,
    "english": "Chandragiri",
    "indonesian": "Chandragiri"
  },
  {
    "id": 36154,
    "english": "Coorgs",
    "indonesian": "Coorgs"
  },
  {
    "id": 36158,
    "english": "Emerald",
    "indonesian": "Emerald"
  },
  {
    "id": 36159,
    "english": "French Mission",
    "indonesian": "Misi Perancis"
  },
  {
    "id": 36160,
    "english": "Gesha",
    "indonesian": "Gesha"
  },
  {
    "id": 36161,
    "english": "Guatemala",
    "indonesian": "Guatemala"
  },
  {
    "id": 36162,
    "english": "Harrar",
    "indonesian": "Harrar"
  },
  {
    "id": 36163,
    "english": "Harrar",
    "indonesian": "Harrar"
  },
  {
    "id": 36166,
    "english": "Jackson",
    "indonesian": "Jackson"
  },
  {
    "id": 36167,
    "english": "Jackson 2/1257",
    "indonesian": "Jackson 2/1257"
  },
  {
    "id": 36170,
    "english": "K7",
    "indonesian": "K7"
  },
  {
    "id": 36172,
    "english": "Kent",
    "indonesian": "Kent"
  },
  {
    "id": 36173,
    "english": "Kona",
    "indonesian": "Kona"
  },
  {
    "id": 36175,
    "english": "Laurina",
    "indonesian": "Laurina"
  },
  {
    "id": 36176,
    "english": "Lekempti",
    "indonesian": "Lekempti"
  },
  {
    "id": 36178,
    "english": "Maracaturra",
    "indonesian": "Maracaturra"
  },
  {
    "id": 36179,
    "english": "Maragogipe",
    "indonesian": "Maragogipe"
  },
  {
    "id": 36180,
    "english": "maragogype",
    "indonesian": "Maragogype"
  },
  {
    "id": 36181,
    "english": "Mayaguez",
    "indonesian": "Mayaguez"
  },
  {
    "id": 36182,
    "english": "Mibirizi",
    "indonesian": "Mibirizi"
  },
  {
    "id": 36183,
    "english": "Mocha/Mokka",
    "indonesian": "Mocha/Mokka"
  },
  {
    "id": 36184,
    "english": "Mundo Novo",
    "indonesian": "Mundo Novo"
  },
  {
    "id": 36186,
    "english": "Old Chiks",
    "indonesian": "Old Chiks"
  },
  {
    "id": 36187,
    "english": "Onix",
    "indonesian": "Onix"
  },
  {
    "id": 36188,
    "english": "Orange Bourbon",
    "indonesian": "Orange Bourbon"
  },
  {
    "id": 36191,
    "english": "Pacamara",
    "indonesian": "Pacamara"
  },
  {
    "id": 36192,
    "english": "Pacas",
    "indonesian": "Pacas"
  },
  {
    "id": 36193,
    "english": "Pache",
    "indonesian": "Pache"
  },
  {
    "id": 36194,
    "english": "Pache Colis",
    "indonesian": "Pache Colis"
  },
  {
    "id": 36195,
    "english": "Pache Comum",
    "indonesian": "Pache Comum"
  },
  {
    "id": 36196,
    "english": "Pink Bourbon",
    "indonesian": "Pink Bourbon"
  },
  {
    "id": 36199,
    "english": "Red Bourbon",
    "indonesian": "Red Bourbon"
  },
  {
    "id": 36200,
    "english": "Rosa Morena",
    "indonesian": "Rosa Morena"
  },
  {
    "id": 36201,
    "english": "Rubi",
    "indonesian": "Rubi"
  },
  {
    "id": 36202,
    "english": "Ruiru 11",
    "indonesian": "Ruiru 11"
  },
  {
    "id": 36203,
    "english": "Safira",
    "indonesian": "Safira"
  },
  {
    "id": 36204,
    "english": "Sagada",
    "indonesian": "Sagada"
  },
  {
    "id": 36205,
    "english": "San Bernardo Aka Pache",
    "indonesian": "San Bernardo Aka Pache"
  },
  {
    "id": 36206,
    "english": "San Ramon",
    "indonesian": "San Ramon"
  },
  {
    "id": 36207,
    "english": "Santos",
    "indonesian": "Santos"
  },
  {
    "id": 36208,
    "english": "Selection 9",
    "indonesian": "Selection 9"
  },
  {
    "id": 36210,
    "english": "Sidamo",
    "indonesian": "Sidamo"
  },
  {
    "id": 36213,
    "english": "Sl28",
    "indonesian": "Sl28"
  },
  {
    "id": 36214,
    "english": "Sl34",
    "indonesian": "Sl34"
  },
  {
    "id": 36215,
    "english": "Sulawesi",
    "indonesian": "Sulawesi"
  },
  {
    "id": 36216,
    "english": "Sumatra",
    "indonesian": "Sumatra"
  },
  {
    "id": 36218,
    "english": "Tekisic",
    "indonesian": "Tekisic"
  },
  {
    "id": 36219,
    "english": "Topazio",
    "indonesian": "Topazio"
  },
  {
    "id": 36220,
    "english": "Toraja",
    "indonesian": "Toraja"
  },
  {
    "id": 36221,
    "english": "Turmalina",
    "indonesian": "Turmalina"
  },
  {
    "id": 36222,
    "english": "Turquesa",
    "indonesian": "Turquesa"
  },
  {
    "id": 36223,
    "english": "Typica",
    "indonesian": "Typica"
  },
  {
    "id": 36225,
    "english": "Venecia",
    "indonesian": "Venecia"
  },
  {
    "id": 36226,
    "english": "Villa Sarchi",
    "indonesian": "Villa Sarchi"
  },
  {
    "id": 36229,
    "english": "Yellow Bourbon",
    "indonesian": "Yellow Bourbon"
  },
  {
    "id": 36239,
    "english": "Erecta",
    "indonesian": "Erecta"
  },
  {
    "id": 36240,
    "english": "Icatu",
    "indonesian": "Icatu"
  },
  {
    "id": 36244,
    "english": "Nemaya",
    "indonesian": "Nemaya"
  },
  {
    "id": 36245,
    "english": "Nganda",
    "indonesian": "Nganda"
  },
  {
    "id": 36246,
    "english": "Pandi",
    "indonesian": "Pandi"
  },
  {
    "id": 36247,
    "english": "Pawi",
    "indonesian": "Pawi"
  },
  {
    "id": 36248,
    "english": "Rakimin",
    "indonesian": "Rakimin"
  },
  {
    "id": 36254,
    "english": "TR4",
    "indonesian": "TR4"
  },
  {
    "id": 36255,
    "english": "TR5",
    "indonesian": "TR5"
  },
  {
    "id": 36256,
    "english": "TR6",
    "indonesian": "TR6"
  },
  {
    "id": 36257,
    "english": "TR7",
    "indonesian": "TR7"
  },
  {
    "id": 36258,
    "english": "TR8",
    "indonesian": "TR8"
  },
  {
    "id": 36264,
    "english": "SA237",
    "indonesian": "SA237"
  },
  {
    "id": 36265,
    "english": "Wayanaad",
    "indonesian": "Wayanaad"
  },
  {
    "id": 36266,
    "english": "Exelsa",
    "indonesian": "Exelsa"
  },
  {
    "id": 36268,
    "english": "Liberica",
    "indonesian": "Liberika"
  },
  {
    "id": 36273,
    "english": "Arabusta",
    "indonesian": "Arabusta"
  },
  {
    "id": 36274,
    "english": "Arla",
    "indonesian": "Arla"
  },
  {
    "id": 36276,
    "english": "Batian",
    "indonesian": "Batian"
  },
  {
    "id": 36277,
    "english": "Bogor Prada",
    "indonesian": "Bogor Prada"
  },
  {
    "id": 36278,
    "english": "Casiopea",
    "indonesian": "Casiopea"
  },
  {
    "id": 36279,
    "english": "Castillo",
    "indonesian": "Castillo"
  },
  {
    "id": 36280,
    "english": "Castillo El Rosario",
    "indonesian": "Castillo El Rosario"
  },
  {
    "id": 36281,
    "english": "Castillo El Tambo",
    "indonesian": "Castillo El Tambo"
  },
  {
    "id": 36282,
    "english": "Castillo La Trinidad",
    "indonesian": "Castillo La Trinidad"
  },
  {
    "id": 36283,
    "english": "Castillo Naranjal",
    "indonesian": "Castillo Naranjal"
  },
  {
    "id": 36284,
    "english": "Castillo Paraguaicito",
    "indonesian": "Castillo Paraguaicito"
  },
  {
    "id": 36286,
    "english": "Castillo Santa Barbara",
    "indonesian": "Castillo Santa Barbara"
  },
  {
    "id": 36288,
    "english": "Catigua",
    "indonesian": "Catigua"
  },
  {
    "id": 36289,
    "english": "Catimor",
    "indonesian": "Catimor"
  },
  {
    "id": 36292,
    "english": "Catrenic",
    "indonesian": "Catrenic"
  },
  {
    "id": 36294,
    "english": "Centroamericano",
    "indonesian": "Centroamericano"
  },
  {
    "id": 36295,
    "english": "Colombia",
    "indonesian": "Kolombia"
  },
  {
    "id": 36299,
    "english": "Devamachy",
    "indonesian": "Devamachy"
  },
  {
    "id": 36300,
    "english": "Evaluna",
    "indonesian": "Evaluna"
  },
  {
    "id": 36301,
    "english": "Fronton",
    "indonesian": "Fronton"
  },
  {
    "id": 36308,
    "english": "Java",
    "indonesian": "Jawa"
  },
  {
    "id": 36311,
    "english": "Limani",
    "indonesian": "Limani"
  },
  {
    "id": 36312,
    "english": "Maracatu",
    "indonesian": "Maracatu"
  },
  {
    "id": 36313,
    "english": "Marsellesa",
    "indonesian": "Marsellesa"
  },
  {
    "id": 36314,
    "english": "Milenio",
    "indonesian": "Milenio"
  },
  {
    "id": 36315,
    "english": "Mundo Maya",
    "indonesian": "Mundo Maya"
  },
  {
    "id": 36316,
    "english": "Nayarita",
    "indonesian": "Nayarita"
  },
  {
    "id": 36317,
    "english": "Nemaya",
    "indonesian": "Nemaya"
  },
  {
    "id": 36318,
    "english": "Obata",
    "indonesian": "Obata"
  },
  {
    "id": 36320,
    "english": "Oro Azteca",
    "indonesian": "Oro Azteca"
  },
  {
    "id": 36321,
    "english": "Parainema",
    "indonesian": "Parainema"
  },
  {
    "id": 36322,
    "english": "Paraiso",
    "indonesian": "Paraiso"
  },
  {
    "id": 36325,
    "english": "Rasuna",
    "indonesian": "Rasuna"
  },
  {
    "id": 36327,
    "english": "Sarchimor",
    "indonesian": "Sarchimor"
  },
  {
    "id": 36329,
    "english": "Starmaya",
    "indonesian": "Starmaya"
  },
  {
    "id": 36333,
    "english": "Tabi",
    "indonesian": "Tabi"
  },
  {
    "id": 36334,
    "english": "Timor",
    "indonesian": "Timor"
  },
  {
    "id": 36335,
    "english": "Tupi",
    "indonesian": "Tupi"
  },
  {
    "id": 36336,
    "english": "Variedad Colombia",
    "indonesian": "Varian Kolombia"
  },
  {
    "id": 36338,
    "english": "Pacamara",
    "indonesian": "Pacamara"
  },
  {
    "id": 36340,
    "english": "Typica",
    "indonesian": "Typica"
  },
  {
    "id": 36341,
    "english": "Liberica",
    "indonesian": "Liberika"
  },
  {
    "id": 36342,
    "english": "Robusta",
    "indonesian": "Robusta"
  },
  {
    "id": 36343,
    "english": "Arabica",
    "indonesian": "Arabika"
  },
  {
    "id": 36344,
    "english": "Gamal (Gliricidia sepium)",
    "indonesian": "Gamal (Gliricidia sepium)"
  },
  {
    "id": 36346,
    "english": "Sengon laut (Albizzia falcata)",
    "indonesian": "Sengon laut (Albizzia falcata)"
  },
  {
    "id": 36347,
    "english": "Lamtoro (Leucaena glauca)",
    "indonesian": "Lamtoro (Leucaena glauca)"
  },
  {
    "id": 36349,
    "english": "Gamal (Gliricidia sepium)",
    "indonesian": "Gamal (Gliricidia sepium)"
  },
  {
    "id": 36350,
    "english": "Alpukat (Persea americana)",
    "indonesian": "Alpukat (Persea americana)"
  },
  {
    "id": 36351,
    "english": "Pinus (hard pines)",
    "indonesian": "Pinus (pinus keras)"
  },
  {
    "id": 36352,
    "english": "Wind Breaker Tree 1",
    "indonesian": "Pohon Penahan Angin 1"
  },
  {
    "id": 36353,
    "english": "Kayumanis",
    "indonesian": "Kayumanis"
  },
  {
    "id": 36354,
    "english": "Karet",
    "indonesian": "Karet"
  },
  {
    "id": 36355,
    "english": "Kelapa",
    "indonesian": "Kelapa"
  },
  {
    "id": 36356,
    "english": "Damar",
    "indonesian": "Damar"
  },
  {
    "id": 36357,
    "english": "Belimbing",
    "indonesian": "Belimbing"
  },
  {
    "id": 36358,
    "english": "Gram",
    "indonesian": "Gram"
  },
  {
    "id": 36359,
    "english": "Kilogram",
    "indonesian": "Kilogram"
  },
  {
    "id": 36360,
    "english": "Pound",
    "indonesian": "Pound"
  },
  {
    "id": 36361,
    "english": "Centimeter",
    "indonesian": "Sentimeter"
  },
  {
    "id": 36362,
    "english": "Meter",
    "indonesian": "Meter"
  },
  {
    "id": 36363,
    "english": "Liter-Per-Hectar",
    "indonesian": "Liter-Per-Hektar"
  },
  {
    "id": 36364,
    "english": "Milliliters per Square Meter",
    "indonesian": "Mililiter per Meter Persegi"
  },
  {
    "id": 36365,
    "english": "Kilogram per Acre",
    "indonesian": "Kilogram per Hektar"
  },
  {
    "id": 36366,
    "english": "Kilogram per Hectare",
    "indonesian": "Kilogram per Hektar"
  },
  {
    "id": 36367,
    "english": "Tonnes per Hectare",
    "indonesian": "Ton per Hektar"
  },
  {
    "id": 36368,
    "english": "Bushels per Hectare",
    "indonesian": "Bushel per Hektar"
  },
  {
    "id": 36369,
    "english": "Bushels per Acre",
    "indonesian": "Bushel per Acre"
  },
  {
    "id": 36370,
    "english": "Bags per Hectare",
    "indonesian": "Tas per Hektar"
  },
  {
    "id": 36371,
    "english": "Bags per Acre",
    "indonesian": "Tas per Acre"
  },
  {
    "id": 36372,
    "english": "Tonnes per Acre",
    "indonesian": "Ton per Acre"
  },
  {
    "id": 36373,
    "english": "Kilogram/Tree",
    "indonesian": "Kilogram/Pohon"
  },
  {
    "id": 36374,
    "english": "acre",
    "indonesian": "acre"
  },
  {
    "id": 36375,
    "english": "Hectares",
    "indonesian": "Hektar"
  },
  {
    "id": 36376,
    "english": "Millimetres",
    "indonesian": "Milimeter"
  },
  {
    "id": 36377,
    "english": "Centimeter",
    "indonesian": "Sentimeter"
  },
  {
    "id": 36378,
    "english": "Meter",
    "indonesian": "Meter"
  },
  {
    "id": 36379,
    "english": "acre",
    "indonesian": "acre"
  },
  {
    "id": 36380,
    "english": "Hectare",
    "indonesian": "Hektar"
  },
  {
    "id": 36381,
    "english": "Millileter",
    "indonesian": "Mililiter"
  },
  {
    "id": 36382,
    "english": "Liter",
    "indonesian": "Liter"
  },
  {
    "id": 36383,
    "english": "acre",
    "indonesian": "acre"
  },
  {
    "id": 36384,
    "english": "Hectare",
    "indonesian": "Hektar"
  },
  {
    "id": 36385,
    "english": "Kg",
    "indonesian": "Kg"
  },
  {
    "id": 36386,
    "english": "Tonnes",
    "indonesian": "Ton"
  },
  {
    "id": 36387,
    "english": "Kilogram per Acre",
    "indonesian": "Kilogram per Acre"
  },
  {
    "id": 36388,
    "english": "Kilogram per Hectare",
    "indonesian": "Kilogram per Hektar"
  },
  {
    "id": 36389,
    "english": "Tonnes per Acre",
    "indonesian": "Ton per Acre"
  },
  {
    "id": 36390,
    "english": "Tonnes per Hectare",
    "indonesian": "Ton per Hektar"
  },
  {
    "id": 36391,
    "english": "Litres/hectare",
    "indonesian": "Liter per Hektar"
  },
  {
    "id": 36392,
    "english": "Ounces/hectare",
    "indonesian": "Ons per Hektar"
  },
  {
    "id": 36393,
    "english": "mg/hectare",
    "indonesian": "mg per Hektar"
  },
  {
    "id": 36394,
    "english": "g/hectare",
    "indonesian": "g per Hektar"
  },
  {
    "id": 36395,
    "english": "kg/hectare",
    "indonesian": "kg per Hektar"
  },
  {
    "id": 36396,
    "english": "Litres",
    "indonesian": "Liter"
  },
  {
    "id": 36397,
    "english": "Ounces",
    "indonesian": "Ons"
  },
  {
    "id": 36398,
    "english": "mg",
    "indonesian": "mg"
  },
  {
    "id": 36399,
    "english": "Kg",
    "indonesian": "Kg"
  },
  {
    "id": 36400,
    "english": "g",
    "indonesian": "g"
  },
  {
    "id": 36401,
    "english": "Gallons/acre",
    "indonesian": "Galon per acre"
  },
  {
    "id": 36402,
    "english": "Gallons/hectare",
    "indonesian": "Galon per hektar"
  },
  {
    "id": 36403,
    "english": "Liters/hectare",
    "indonesian": "Liter per hektar"
  },
  {
    "id": 36404,
    "english": "Liters/acre",
    "indonesian": "Liter per acre"
  },
  {
    "id": 36405,
    "english": "Centimeter",
    "indonesian": "Sentimeter"
  },
  {
    "id": 36406,
    "english": "Meter",
    "indonesian": "Meter"
  },
  {
    "id": 36407,
    "english": "kg/ha",
    "indonesian": "kg/ha"
  },
  {
    "id": 36408,
    "english": "ppm",
    "indonesian": "ppm"
  },
  {
    "id": 36410,
    "english": "Kg per hectare",
    "indonesian": "Kg per hektar"
  },
  {
    "id": 36411,
    "english": "Kg per acre",
    "indonesian": "Kg per acre"
  },
  {
    "id": 36412,
    "english": "Tonne per hectare",
    "indonesian": "Ton per hektar"
  },
  {
    "id": 36413,
    "english": "Tonne per acre",
    "indonesian": "Ton per acre"
  },
  {
    "id": 36415,
    "english": "Grams",
    "indonesian": "Gram"
  },
  {
    "id": 36416,
    "english": "Kilograms",
    "indonesian": "Kilogram"
  },
  {
    "id": 36418,
    "english": "Tonne per acre",
    "indonesian": "Ton per acre"
  },
  {
    "id": 36419,
    "english": "Kg per hectare",
    "indonesian": "Kg per hektar"
  },
  {
    "id": 36420,
    "english": "Kg per acre",
    "indonesian": "Kg per acre"
  },
  {
    "id": 36421,
    "english": "Tonne per hectare",
    "indonesian": "Ton per hektar"
  },
  {
    "id": 36422,
    "english": "Kilograms",
    "indonesian": "Kilogram"
  },
  {
    "id": 36425,
    "english": "Tonne per hectare",
    "indonesian": "Ton per hektar"
  },
  {
    "id": 36426,
    "english": "Tonne per acre",
    "indonesian": "Ton per acre"
  },
  {
    "id": 36427,
    "english": "Kg per acre",
    "indonesian": "Kg per acre"
  },
  {
    "id": 36428,
    "english": "Kg per hectare",
    "indonesian": "Kg per hektar"
  },
  {
    "id": 36429,
    "english": "Kilograms",
    "indonesian": "Kilogram"
  },
  {
    "id": 36432,
    "english": "kg/ha",
    "indonesian": "kg/ha"
  },
  {
    "id": 36433,
    "english": "ppm",
    "indonesian": "ppm"
  },
  {
    "id": 36435,
    "english": "kg/ml",
    "indonesian": "kg/ml"
  },
  {
    "id": 36436,
    "english": "g/ml",
    "indonesian": "g/ml"
  },
  {
    "id": 36437,
    "english": "kg/ha",
    "indonesian": "kg/ha"
  },
  {
    "id": 36438,
    "english": "ppm",
    "indonesian": "ppm"
  },
  {
    "id": 36441,
    "english": "kg/ha",
    "indonesian": "kg/ha"
  },
  {
    "id": 36442,
    "english": "ppm",
    "indonesian": "ppm"
  },
  {
    "id": 36444,
    "english": "Kilograms",
    "indonesian": "Kilogram"
  },
  {
    "id": 36446,
    "english": "Milligrams (N)/Liter",
    "indonesian": "Miligram (N)/Liter"
  },
  {
    "id": 36447,
    "english": "Kg (N)/hectare",
    "indonesian": "Kg (N)/hektar"
  },
  {
    "id": 36448,
    "english": "parts (N)/million",
    "indonesian": "bagian (N)/juta"
  },
  {
    "id": 36449,
    "english": "Milligrams (P2O5)/Liter",
    "indonesian": "Miligram (P2O5)/Liter"
  },
  {
    "id": 36450,
    "english": "Kg (P2O5)/hectare",
    "indonesian": "Kg (P2O5)/hektar"
  },
  {
    "id": 36451,
    "english": "parts (P2O5)/million",
    "indonesian": "bagian (P2O5)/juta"
  },
  {
    "id": 36452,
    "english": "Milligrams (K20)/Liter",
    "indonesian": "Miligram (K20)/Liter"
  },
  {
    "id": 36453,
    "english": "Kg (K20)/hectare",
    "indonesian": "Kg (K20)/hektar"
  },
  {
    "id": 36454,
    "english": "parts (K20)/million",
    "indonesian": "bagian (K20)/juta"
  },
  {
    "id": 36455,
    "english": "kg per centimetre cube",
    "indonesian": "kg per sentimeter kubik"
  },
  {
    "id": 36456,
    "english": "kg/cm3",
    "indonesian": "kg/cm³"
  },
  {
    "id": 36457,
    "english": "gr/m3",
    "indonesian": "gr/m³"
  },
  {
    "id": 36473,
    "english": "Increasing The Yields",
    "indonesian": "Meningkatkan Hasil"
  },
  {
    "id": 36474,
    "english": "Optimize The Use Of Synthetic Fertilizers",
    "indonesian": "Optimalkan Penggunaan Pupuk Sintetis"
  },
  {
    "id": 36478,
    "english": "Typica (Bergandal, Sidikalang - Sumatera).",
    "indonesian": "Typica (Bergandal, Sidikalang - Sumatera)"
  },
  {
    "id": 36479,
    "english": "Hibrido de Timor (HDT, Cross breed Arabica-Robusta; Tim-tim, Aceh)",
    "indonesian": "Hibrido de Timor (HDT, Persilangan Arabika-Robusta; Tim-tim, Aceh)"
  },
  {
    "id": 36480,
    "english": "Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)",
    "indonesian": "Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)"
  },
  {
    "id": 36481,
    "english": "Ethiopian lines (Rambung Abyssina, USDA)",
    "indonesian": "Garis Ethiopia (Rambung Abyssina, USDA)"
  },
  {
    "id": 36482,
    "english": "Mundo Nova (Silang Typica-Bourbon, from Brazil)",
    "indonesian": "Mundo Nova (Silang Typica-Bourbon, dari Brazil)"
  },
  {
    "id": 36483,
    "english": "Catimor Lines (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - mix breed arabica-robusta).",
    "indonesian": "Garis Catimor (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - persilangan arabika-robusta)"
  },
  {
    "id": 36484,
    "english": "Amarello De Botucatu",
    "indonesian": "Amarello De Botucatu"
  },
  {
    "id": 36485,
    "english": "Benguet",
    "indonesian": "Benguet"
  },
  {
    "id": 36486,
    "english": "Bergendal",
    "indonesian": "Bergendal"
  },
  {
    "id": 36487,
    "english": "Bergundal Aka Garundang",
    "indonesian": "Bergundal atau Garundang"
  },
  {
    "id": 36488,
    "english": "Bmj",
    "indonesian": "Bmj"
  },
  {
    "id": 36489,
    "english": "Boubon Mayaguez 71",
    "indonesian": "Boubon Mayaguez 71"
  },
  {
    "id": 36490,
    "english": "Bourbon",
    "indonesian": "Bourbon"
  },
  {
    "id": 36491,
    "english": "Bourbon Chocolá",
    "indonesian": "Bourbon Chocolá"
  },
  {
    "id": 36492,
    "english": "Bourbon Mayaguez 139",
    "indonesian": "Bourbon Mayaguez 139"
  },
  {
    "id": 36493,
    "english": "Bourbon Mayaguez 71",
    "indonesian": "Bourbon Mayaguez 71"
  },
  {
    "id": 36494,
    "english": "catuai",
    "indonesian": "catuai"
  },
  {
    "id": 36495,
    "english": "Chickumalgur",
    "indonesian": "Chickumalgur"
  },
  {
    "id": 36496,
    "english": "Criollo",
    "indonesian": "Criollo"
  },
  {
    "id": 36497,
    "english": "Culi Arabica",
    "indonesian": "Culi Arabika"
  },
  {
    "id": 36498,
    "english": "Djimma",
    "indonesian": "Djimma"
  },
  {
    "id": 36499,
    "english": "IAPAR59",
    "indonesian": "IAPAR59"
  },
  {
    "id": 36500,
    "english": "Ibairi",
    "indonesian": "Ibairi"
  },
  {
    "id": 36501,
    "english": "Jember/S795",
    "indonesian": "Jember/S795"
  },
  {
    "id": 36502,
    "english": "K20",
    "indonesian": "K20"
  },
  {
    "id": 36503,
    "english": "Kalossi",
    "indonesian": "Kalossi"
  },
  {
    "id": 36504,
    "english": "Kp423",
    "indonesian": "Kp423"
  },
  {
    "id": 36505,
    "english": "Lintong",
    "indonesian": "Lintong"
  },
  {
    "id": 36506,
    "english": "Nyasaland",
    "indonesian": "Nyasaland"
  },
  {
    "id": 36507,
    "english": "Ouro Bronze",
    "indonesian": "Ouro Bronze"
  },
  {
    "id": 36508,
    "english": "Ouro Verde",
    "indonesian": "Ouro Verde"
  },
  {
    "id": 36509,
    "english": "Pluma Hidalgo",
    "indonesian": "Pluma Hidalgo"
  },
  {
    "id": 36510,
    "english": "Pop3303/21",
    "indonesian": "Pop3303/21"
  },
  {
    "id": 36511,
    "english": "semperflorens",
    "indonesian": "semperflorens"
  },
  {
    "id": 36512,
    "english": "Sidikalang",
    "indonesian": "Sidikalang"
  },
  {
    "id": 36513,
    "english": "Sl14",
    "indonesian": "Sl14"
  },
  {
    "id": 36514,
    "english": "Sumatra Lintong",
    "indonesian": "Sumatra Lintong"
  },
  {
    "id": 36515,
    "english": "Usda762",
    "indonesian": "Usda762"
  },
  {
    "id": 36516,
    "english": "Villalobos",
    "indonesian": "Villalobos"
  },
  {
    "id": 36517,
    "english": "Walichu/ Wolisho",
    "indonesian": "Walichu/ Wolisho"
  },
  {
    "id": 36518,
    "english": "Yirgacheffe",
    "indonesian": "Yirgacheffe"
  },
  {
    "id": 36519,
    "english": "Catimor (hybrid of Caturra x Timor)",
    "indonesian": "Catimor (hibrida dari Caturra x Timor)"
  },
  {
    "id": 36520,
    "english": "Jawa (Java Coffee, !700AD)",
    "indonesian": "Jawa (Kopi Jawa, 700 M)"
  },
  {
    "id": 36521,
    "english": "Arabusta (HDT; Hibrid of sterile CArabica and C.Robusta)",
    "indonesian": "Arabusta (HDT; Hibrida antara Arabika steril dan Robusta)"
  },
  {
    "id": 36522,
    "english": "Brs 1216",
    "indonesian": "Brs 1216"
  },
  {
    "id": 36523,
    "english": "Brs 2336",
    "indonesian": "Brs 2336"
  },
  {
    "id": 36524,
    "english": "Brs 3210",
    "indonesian": "Brs 3210"
  },
  {
    "id": 36525,
    "english": "Brs 3213",
    "indonesian": "Brs 3213"
  },
  {
    "id": 36526,
    "english": "Culi Robusta",
    "indonesian": "Culi Robusta"
  },
  {
    "id": 36527,
    "english": "Jasli",
    "indonesian": "Jasli"
  },
  {
    "id": 36528,
    "english": "Kapeng Alamid",
    "indonesian": "Kapeng Alamid"
  },
  {
    "id": 36529,
    "english": "Kopi Luwak",
    "indonesian": "Kopi Luwak"
  },
  {
    "id": 36530,
    "english": "Selection 1r",
    "indonesian": "Seleksi 1r"
  },
  {
    "id": 36531,
    "english": "Selection 2r",
    "indonesian": "Seleksi 2r"
  },
  {
    "id": 36532,
    "english": "Selection 3r",
    "indonesian": "Seleksi 3r"
  },
  {
    "id": 36533,
    "english": "Sln 270",
    "indonesian": "Sln 270"
  },
  {
    "id": 36534,
    "english": "Sln 274",
    "indonesian": "Sln 274"
  },
  {
    "id": 36535,
    "english": "BP42",
    "indonesian": "BP42"
  },
  {
    "id": 36536,
    "english": "BP234",
    "indonesian": "BP234"
  },
  {
    "id": 36537,
    "english": "BP288",
    "indonesian": "BP288"
  },
  {
    "id": 36538,
    "english": "BP358",
    "indonesian": "BP358"
  },
  {
    "id": 36539,
    "english": "BP409",
    "indonesian": "BP409"
  },
  {
    "id": 36540,
    "english": "Kape Barako",
    "indonesian": "Kape Barako"
  },
  {
    "id": 36541,
    "english": "Sln288",
    "indonesian": "Sln288"
  },
  {
    "id": 36542,
    "english": "Sln10",
    "indonesian": "Sln10"
  },
  {
    "id": 36543,
    "english": "Abyssinia 3",
    "indonesian": "Abyssinia 3"
  },
  {
    "id": 36544,
    "english": "Anacafe 14",
    "indonesian": "Anacafe 14"
  },
  {
    "id": 36545,
    "english": "Ateng",
    "indonesian": "Ateng"
  },
  {
    "id": 36546,
    "english": "Castillo Pueblo Bello",
    "indonesian": "Castillo Pueblo Bello"
  },
  {
    "id": 36547,
    "english": "Catiga Mg2",
    "indonesian": "Catiga Mg2"
  },
  {
    "id": 36548,
    "english": "Catimor 129",
    "indonesian": "Catimor 129"
  },
  {
    "id": 36549,
    "english": "Catimor F6.",
    "indonesian": "Catimor F6."
  },
  {
    "id": 36550,
    "english": "Catucai",
    "indonesian": "Catucai"
  },
  {
    "id": 36551,
    "english": "Costa Rica 95 Aka Cr-95",
    "indonesian": "Costa Rica 95 (alias Cr-95)"
  },
  {
    "id": 36552,
    "english": "Cr (Costa Rica) 95",
    "indonesian": "Cr (Costa Rica) 95"
  },
  {
    "id": 36553,
    "english": "Cuscatleco",
    "indonesian": "Cuscatleco"
  },
  {
    "id": 36554,
    "english": "Gayo Satu",
    "indonesian": "Gayo Satu"
  },
  {
    "id": 36555,
    "english": "Hibrido De Timor",
    "indonesian": "Hibrida De Timor"
  },
  {
    "id": 36556,
    "english": "Iapar 59",
    "indonesian": "Iapar 59"
  },
  {
    "id": 36557,
    "english": "Icafe 95",
    "indonesian": "Icafe 95"
  },
  {
    "id": 36558,
    "english": "IHcafe 90",
    "indonesian": "IHcafe 90"
  },
  {
    "id": 36559,
    "english": "Ipar 103",
    "indonesian": "Ipar 103"
  },
  {
    "id": 36560,
    "english": "Komasti",
    "indonesian": "Komasti"
  },
  {
    "id": 36561,
    "english": "Lempira",
    "indonesian": "Lempira"
  },
  {
    "id": 36562,
    "english": "obata rojo",
    "indonesian": "obata rojo"
  },
  {
    "id": 36563,
    "english": "RAB C15",
    "indonesian": "RAB C15"
  },
  {
    "id": 36564,
    "english": "Rambung",
    "indonesian": "Rambung"
  },
  {
    "id": 36565,
    "english": "S.12 Kaffa",
    "indonesian": "S.12 Kaffa"
  },
  {
    "id": 36566,
    "english": "Sigarar Utang",
    "indonesian": "Sigarar Utang"
  },
  {
    "id": 36567,
    "english": "T5175",
    "indonesian": "T5175"
  },
  {
    "id": 36568,
    "english": "T5296",
    "indonesian": "T5296"
  },
  {
    "id": 36569,
    "english": "T8667",
    "indonesian": "T8667"
  },
  {
    "id": 36570,
    "english": "Hybrid",
    "indonesian": "Hibrida"
  },
  {
    "id": 36571,
    "english": "Bourbon",
    "indonesian": "Bourbon"
  },
  {
    "id": 36572,
    "english": "Dadap (Eurythrina lithosperma)",
    "indonesian": "Dadap (Eurythrina lithosperma)"
  },
  {
    "id": 36573,
    "english": "Gamal (Glirisidia)",
    "indonesian": "Gamal (Glirisidia)"
  },
  {
    "id": 36574,
    "english": "My Profile",
    "indonesian": "Profil Saya"
  },
  {
    "id": 36576,
    "english": "Holes on leaves/fruits/grain",
    "indonesian": "Celah di daun/buah/biji"
  },
  {
    "id": 36577,
    "english": "Rolled and curled leaves",
    "indonesian": "Daun bergulung dan berkerut"
  },
  {
    "id": 36578,
    "english": "Dead shoots",
    "indonesian": "Tunas mati"
  },
  {
    "id": 36579,
    "english": "Stunted/poor growth",
    "indonesian": "Pertumbuhan terhambat/rendah"
  },
  {
    "id": 36580,
    "english": "Distorted plants/leaves",
    "indonesian": "Tanaman/daun terdistorsi"
  },
  {
    "id": 36581,
    "english": "Plant wilting",
    "indonesian": "Tanaman layu"
  },
  {
    "id": 36582,
    "english": "Irregular and chewed leaves/stems",
    "indonesian": "Daun/tunas yang tergigit tidak beraturan"
  },
  {
    "id": 36583,
    "english": "Dying of the new leaves",
    "indonesian": "Kematian pada daun baru"
  },
  {
    "id": 36584,
    "english": "Presence of larvae",
    "indonesian": "Adanya larva"
  },
  {
    "id": 36585,
    "english": "Presence of droppings",
    "indonesian": "Adanya kotoran"
  },
  {
    "id": 36586,
    "english": "Weak stems",
    "indonesian": "Batang lemah"
  },
  {
    "id": 36587,
    "english": "Presence of webs",
    "indonesian": "Adanya jaring laba-laba"
  },
  {
    "id": 36588,
    "english": "Weak roots",
    "indonesian": "Akar lemah"
  },
  {
    "id": 36589,
    "english": "Shoot and capsule borer",
    "indonesian": "Penggerek tunas dan kapsul"
  },
  {
    "id": 36590,
    "english": "Aphids",
    "indonesian": "Kutu daun"
  },
  {
    "id": 36591,
    "english": "Shoot Fly",
    "indonesian": "Lalat tunas"
  },
  {
    "id": 36592,
    "english": "Nematodes",
    "indonesian": "Nematoda"
  },
  {
    "id": 36593,
    "english": "Cut worms",
    "indonesian": "Ulat penggerek"
  },
  {
    "id": 36594,
    "english": "Thrips",
    "indonesian": "Thrips"
  },
  {
    "id": 36595,
    "english": "Quinoa Moth",
    "indonesian": "Ulat quinoa"
  },
  {
    "id": 36596,
    "english": "Leaf miner files",
    "indonesian": "Serangga penambang daun"
  },
  {
    "id": 36597,
    "english": "Cassava Green Mite (Mononychellus tanajoa)",
    "indonesian": "Kutu hijau singkong (Mononychellus tanajoa)"
  },
  {
    "id": 36598,
    "english": "Cassava mealy bug",
    "indonesian": "Kutu putih singkong"
  },
  {
    "id": 36599,
    "english": "Whitefly (Aleurodicus dispersus)",
    "indonesian": "Kutu putih (Aleurodicus dispersus)"
  },
  {
    "id": 36600,
    "english": "Variegated cricket (Zonocerus variegatus)",
    "indonesian": "Belalang belang (Zonocerus variegatus)"
  },
  {
    "id": 36601,
    "english": "Onion Thrips",
    "indonesian": "Thrips Bawang"
  },
  {
    "id": 36602,
    "english": "Eriophyid mite",
    "indonesian": "Kutu Eriophyid"
  },
  {
    "id": 36603,
    "english": "Onion Maggot",
    "indonesian": "Ulat Bawang"
  },
  {
    "id": 36604,
    "english": "Earwig",
    "indonesian": "Kecoa"
  },
  {
    "id": 36605,
    "english": "Tea mites and spider mites",
    "indonesian": "Kutu teh dan kutu laba-laba"
  },
  {
    "id": 36606,
    "english": "Tea Cutworms",
    "indonesian": "Ulat pemotong teh"
  },
  {
    "id": 36607,
    "english": "Tea Crickets",
    "indonesian": "Belalang teh"
  },
  {
    "id": 36608,
    "english": "Tea mosquito bug",
    "indonesian": "Kutu kecil teh"
  },
  {
    "id": 36609,
    "english": "Pyrilla",
    "indonesian": "Pyrilla"
  },
  {
    "id": 36610,
    "english": "Wooly aphid",
    "indonesian": "Kutu daun berbulu"
  },
  {
    "id": 36611,
    "english": "Borer",
    "indonesian": "Penggerek"
  },
  {
    "id": 36612,
    "english": "White Grub",
    "indonesian": "Ulat tanah putih"
  },
  {
    "id": 36613,
    "english": "Internode borer",
    "indonesian": "Penggerek ruas"
  },
  {
    "id": 36614,
    "english": "Mealybug",
    "indonesian": "Kutu putih"
  },
  {
    "id": 36615,
    "english": "Early shoot borer",
    "indonesian": "Penggerek tunas awal"
  },
  {
    "id": 36616,
    "english": "Corm Weevil",
    "indonesian": "Kumbang umbi"
  },
  {
    "id": 36617,
    "english": "Pseudostem weevil",
    "indonesian": "Kumbang batang palsu"
  },
  {
    "id": 36618,
    "english": "Nematode",
    "indonesian": "Nematoda"
  },
  {
    "id": 36619,
    "english": "Stem Borer",
    "indonesian": "Penggerek batang"
  },
  {
    "id": 36620,
    "english": "Fall armyworm",
    "indonesian": "Ulat grayak"
  },
  {
    "id": 36621,
    "english": "Ear head bug",
    "indonesian": "Kutu kepala telinga"
  },
  {
    "id": 36622,
    "english": "Rice Stem borer",
    "indonesian": "Penggerek batang padi"
  },
  {
    "id": 36623,
    "english": "Rice hispa",
    "indonesian": "Kutu daun padi"
  },
  {
    "id": 36624,
    "english": "Leaf folder",
    "indonesian": "Penggulung daun"
  },
  {
    "id": 36625,
    "english": "Plant hopper",
    "indonesian": "Walang sangit"
  },
  {
    "id": 36626,
    "english": "Stem fly",
    "indonesian": "Lalat batang"
  },
  {
    "id": 36627,
    "english": "Pod Borer",
    "indonesian": "Penggerek polong"
  },
  {
    "id": 36628,
    "english": "White fly",
    "indonesian": "Kutu putih"
  },
  {
    "id": 36629,
    "english": "Armyworm",
    "indonesian": "Ulat grayak"
  },
  {
    "id": 36630,
    "english": "Bulb Mites",
    "indonesian": "Kutu bulb"
  },
    {
    "id": 36631,
    "english": "Red Spider Mite",
    "indonesian": "Kutu laba-laba merah"
  },
  {
    "id": 36632,
    "english": "Safflower aphid",
    "indonesian": "Kutu daun kenaf"
  },
  {
    "id": 36633,
    "english": "Safflower gram pod borer/ capsule borer",
    "indonesian": "Penggerek polong kenaf"
  },
  {
    "id": 36634,
    "english": "Safflower caterpillar",
    "indonesian": "Ulat kenaf"
  },
  {
    "id": 36635,
    "english": "safflower bud fly/capsule fly",
    "indonesian": "Lalat kenaf"
  },
  {
    "id": 36636,
    "english": "Cotton American boll worm",
    "indonesian": "Ulat kumbang kapas Amerika"
  },
  {
    "id": 36637,
    "english": "Cotton Spotted boll worm",
    "indonesian": "Ulat kumbang bintik kapas"
  },
  {
    "id": 36638,
    "english": "Cotton Pink boll worm",
    "indonesian": "Ulat kumbang merah kapas"
  },
  {
    "id": 36639,
    "english": "Cotton Jassid",
    "indonesian": "Jassid kapas"
  },
  {
    "id": 36640,
    "english": "Coffee berry borer",
    "indonesian": "Penggerek buah kopi"
  },
  {
    "id": 36641,
    "english": "Coffee White stem borer",
    "indonesian": "Penggerek batang putih kopi"
  },
  {
    "id": 36642,
    "english": "Coffee Shot hole borer",
    "indonesian": "Penggerek lubang tembak kopi"
  },
  {
    "id": 36643,
    "english": "Coffee Red borer",
    "indonesian": "Penggerek merah kopi"
  },
  {
    "id": 36644,
    "english": "Tomato Gram pod borer",
    "indonesian": "Penggerek polong tomat"
  },
  {
    "id": 36645,
    "english": "Tomato Leaf eating caterpillar",
    "indonesian": "Ulat pemakan daun tomat"
  },
  {
    "id": 36646,
    "english": "Tomato Whitefly",
    "indonesian": "Kutu putih tomat"
  },
  {
    "id": 36647,
    "english": "Tomato Serpentine leaf miner.",
    "indonesian": "Penggerek daun berbelit-belit tomat"
  },
  {
    "id": 36648,
    "english": "European skipper",
    "indonesian": "Kupu-kupu Eropa"
  },
  {
    "id": 36649,
    "english": "Cereal rust mite adults",
    "indonesian": "Kutu karat dewasa"
  },
  {
    "id": 36650,
    "english": "Wireworms",
    "indonesian": "Ulat kawat"
  },
  {
    "id": 36651,
    "english": "Grasshopper",
    "indonesian": "Belalang"
  },
  {
    "id": 36652,
    "english": "Bihar hair caterpiller",
    "indonesian": "Ulat bulu Bihar"
  },
  {
    "id": 36653,
    "english": "Cabbage buterfly",
    "indonesian": "Kupu-kupu kubis"
  },
  {
    "id": 36654,
    "english": "Mustard aphid",
    "indonesian": "Kutu daun sawi"
  },
  {
    "id": 36655,
    "english": "Mustard sawfly",
    "indonesian": "Sawfly sawi"
  },
  {
    "id": 36656,
    "english": "Bean Aphids",
    "indonesian": "Kutu daun kacang"
  },
  {
    "id": 36657,
    "english": "Blister Beetle",
    "indonesian": "Kumbang blister"
  },
  {
    "id": 36658,
    "english": "Blue butterfly",
    "indonesian": "Kupu-kupu biru"
  },
  {
    "id": 36659,
    "english": "Gram pod borer",
    "indonesian": "Penggerek polong"
  },
  {
    "id": 36660,
    "english": "Earhead Bug",
    "indonesian": "Kutu telinga"
  },
  {
    "id": 36661,
    "english": "Ear Head Caterpillar",
    "indonesian": "Ulat kepala telinga"
  },
  {
    "id": 36662,
    "english": "Pink Stem Borer",
    "indonesian": "Penggerek batang merah"
  },
  {
    "id": 36663,
    "english": "Plant Lice (Aphids)",
    "indonesian": "Kutu daun (Aphids)"
  },
  {
    "id": 36664,
    "english": "Leaf webber or roller and capsule borer",
    "indonesian": "Penggerek daun atau penggulung dan penggerek polong"
  },
  {
    "id": 36665,
    "english": "Gall fly",
    "indonesian": "Lalat gundul"
  },
  {
    "id": 36666,
    "english": "Sesame leafhopper",
    "indonesian": "Wereng daun wijen"
  },
  {
    "id": 36667,
    "english": "Hawk moth",
    "indonesian": "Kupu-kupu elang"
  },
  {
    "id": 36668,
    "english": "Earwig: Anisolabis stali",
    "indonesian": "Kecoa telinga: Anisolabis stali"
  },
  {
    "id": 36669,
    "english": "Alfalfa Looper",
    "indonesian": "Ulat kacang alfalfa"
  },
  {
    "id": 36670,
    "english": "Alfalfa Aphid",
    "indonesian": "Kutu daun alfalfa"
  },
  {
    "id": 36671,
    "english": "Cutworms",
    "indonesian": "Ulat penggerek"
  },
  {
    "id": 36672,
    "english": "Fruit Rust,Thrips",
    "indonesian": "Karat buah, thrips"
  },
  {
    "id": 36673,
    "english": "Slugs",
    "indonesian": "Siput"
  },
  {
    "id": 36674,
    "english": "Gram caterpillar",
    "indonesian": "Ulat penggerek polong"
  },
  {
    "id": 36675,
    "english": "Fruit fly",
    "indonesian": "Monyet buah"
  },
  {
    "id": 36676,
    "english": "Leaf Miner",
    "indonesian": "Penggerek daun"
  },
  {
    "id": 36677,
    "english": "Citrus psyllid",
    "indonesian": "Kutu psilida sitrus"
  },
  {
    "id": 36678,
    "english": "Scale Insects",
    "indonesian": "Serangga sisik"
  },
  {
    "id": 36679,
    "english": "Aphids & Mealy Bugs",
    "indonesian": "Kutu daun & kutu sisik"
  },
  {
    "id": 36680,
    "english": "Scale Insects:",
    "indonesian": "Serangga sisik:"
  },
  {
    "id": 36681,
    "english": "Leaf Miner",
    "indonesian": "Penggerek daun"
  },
  {
    "id": 36682,
    "english": "Black aphids",
    "indonesian": "Kutu hitam"
  },
  {
    "id": 36683,
    "english": "Termites",
    "indonesian": "Rayap"
  },
  {
    "id": 36684,
    "english": "Olive fruit fly",
    "indonesian": "Monyet buah zaitun"
  },
  {
    "id": 36685,
    "english": "Olive moth",
    "indonesian": "Ulat bulu-bulu zaitun"
  },
  {
    "id": 36686,
    "english": "Black Scale",
    "indonesian": "Serangga sisik hitam"
  },
  {
    "id": 36687,
    "english": "Mealy bugs",
    "indonesian": "Kutu sisik"
  },
  {
    "id": 36688,
    "english": "Tea mosquitoe bugs",
    "indonesian": "Kutu jassid teh"
  },
  {
    "id": 36689,
    "english": "Flatid Plant hoppers",
    "indonesian": "Wereng pohon flatid"
  },
  {
    "id": 36690,
    "english": "Aphids",
    "indonesian": "Kutu daun"
  },
  {
    "id": 36691,
    "english": "Mexican Bean Beetle",
    "indonesian": "Kumbang kacang Mexico"
  },
  {
    "id": 36692,
    "english": "Leafminers",
    "indonesian": "Penggerek daun"
  },
  {
    "id": 36693,
    "english": "Corn Earworm",
    "indonesian": "Ulat jagung telinga"
  },
  {
    "id": 36694,
    "english": "White Scale",
    "indonesian": "Serangga sisik putih"
  },
  {
    "id": 36695,
    "english": "Shield Scale",
    "indonesian": "Serangga sisik perisai"
  },
  {
    "id": 36696,
    "english": "Leaf Beetle",
    "indonesian": "Kumbang daun"
  },
  {
    "id": 36697,
    "english": "Capitulum Borer",
    "indonesian": "Penggerek capitulum"
  },
  {
    "id": 36698,
    "english": "Tobacco Caterpillar",
    "indonesian": "Ulat tembakau"
  },
  {
    "id": 36699,
    "english": "Leaf Hopper",
    "indonesian": "Wereng daun"
  },
  {
    "id": 36700,
    "english": "Sunflower Beetle",
    "indonesian": "Kumbang bunga matahari"
  },
  {
    "id": 36701,
    "english": "Mealy bug",
    "indonesian": "Kutu sisik"
  },
  {
    "id": 36702,
    "english": "Grasshopper",
    "indonesian": "Belalang"
  },
  {
    "id": 36703,
    "english": "Mango Hopper (Idioscopus clypealis)",
    "indonesian": "Wereng mangga (Idioscopus clypealis)"
  },
  {
    "id": 36704,
    "english": "Mango Mealy Bug (Drosicha mangiferae)",
    "indonesian": "Kutu sisik mangga (Drosicha mangiferae)"
  },
  {
    "id": 36705,
    "english": "Mango Bark Eating Caterpillar (Indarbela quadrinotata)",
    "indonesian": "Ulat penggerek kulit mangga (Indarbela quadrinotata)"
  },
  {
    "id": 36706,
    "english": "Mango fruit fly: Bactrocera dorsalis",
    "indonesian": "Monyet buah mangga: Bactrocera dorsalis"
  },
  {
    "id": 36707,
    "english": "Red Spider Mite",
    "indonesian": "Kutu laba-laba merah"
  },
  {
    "id": 36708,
    "english": "Woolly Aphids",
    "indonesian": "Kutu daun berbulu"
  },
  {
    "id": 36709,
    "english": "San Jose Scale",
    "indonesian": "Serangga sisik San Jose"
  },
  {
    "id": 36710,
    "english": "Codling Moth",
    "indonesian": "Ulat buah codling"
  },

  {
    "id": 36711,
    "english": "European Red Mite",
    "indonesian": "Kutu merah Eropa"
  },
  {
    "id": 36712,
    "english": "Placement",
    "indonesian": "Penempatan"
  },
  {
    "id": 36713,
    "english": "Band placement",
    "indonesian": "Penempatan pita"
  },
  {
    "id": 36714,
    "english": "Foliar application",
    "indonesian": "Aplikasi daun"
  },
  {
    "id": 36715,
    "english": "Injection into soil",
    "indonesian": "Injeksi ke tanah"
  },
  {
    "id": 36720,
    "english": "Ugandan shilling",
    "indonesian": "Shilling Uganda"
  },
  {
    "id": 36721,
    "english": "Indian rupee",
    "indonesian": "Rupee India"
  },
  {
    "id": 36722,
    "english": "United States dollar",
    "indonesian": "Dolar Amerika Serikat"
  },
  {
    "id": 36723,
    "english": "Indonesian Rupiah",
    "indonesian": "Rupiah Indonesia"
  },
  {
    "id": 36724,
    "english": "Euro",
    "indonesian": "Euro"
  },
  {
    "id": 36725,
    "english": "Singapore Dollar",
    "indonesian": "Dolar Singapura"
  },
  {
    "id": 36726,
    "english": "Brazilian Real",
    "indonesian": "Real Brasil"
  },
  {
    "id": 36727,
    "english": "Canadian Dollar",
    "indonesian": "Dolar Kanada"
  },
  {
    "id": 36728,
    "english": "CFP Franc",
    "indonesian": "Franc CFP"
  },
  {
    "id": 36729,
    "english": "French Franc",
    "indonesian": "Franc Prancis"
  },
  {
    "id": 36730,
    "english": "Italian Lira",
    "indonesian": "Lira Italia"
  },
  {
    "id": 36731,
    "english": "Kuwaiti Dinar",
    "indonesian": "Dinar Kuwait"
  },
  {
    "id": 36732,
    "english": "Mexican Peso",
    "indonesian": "Peso Meksiko"
  },
  {
    "id": 36733,
    "english": "Nepalese Rupee",
    "indonesian": "Rupee Nepal"
  },
  {
    "id": 36734,
    "english": "United Arab Emirates Dirham",
    "indonesian": "Dirham Uni Emirat Arab"
  },
  {
    "id": 36735,
    "english": "honey",
    "indonesian": "madu"
  },
  {
    "id": 36736,
    "english": "natural (dry)",
    "indonesian": "alami (kering)"
  },
  {
    "id": 36737,
    "english": "wine",
    "indonesian": "anggur"
  },
  {
    "id": 36738,
    "english": "Semi-Washed",
    "indonesian": "semi-cuci"
  },
  {
    "id": 36739,
    "english": "Full-Washed",
    "indonesian": "cuci penuh"
  },
  {
    "id": 36741,
    "english": "Parchment Coffee",
    "indonesian": "Kopi Parchment"
  },
  {
    "id": 36742,
    "english": "Quality Control",
    "indonesian": "Kontrol Kualitas"
  },
  {
    "id": 36743,
    "english": "Batch Production",
    "indonesian": "Produksi Batch"
  },
  {
    "id": 36744,
    "english": "Green Beans",
    "indonesian": "Biji Hijau"
  },
  {
    "id": 36745,
    "english": "Cupping",
    "indonesian": "Cupping"
  },
  {
    "id": 36746,
    "english": "Agrifound Light Red",
    "indonesian": "Agrifound Merah Muda"
  },
  {
    "id": 36747,
    "english": "Agrifound Red",
    "indonesian": "Agrifound Merah"
  },
  {
    "id": 36748,
    "english": "Agrifound Rose",
    "indonesian": "Agrifound Mawar"
  },
  {
    "id": 36749,
    "english": "Agrifound White",
    "indonesian": "Agrifound Putih"
  },
  {
    "id": 36750,
    "english": "Arad-H",
    "indonesian": "Arad-H"
  },
  {
    "id": 36751,
    "english": "Arka Bindu",
    "indonesian": "Arka Bindu"
  },
  {
    "id": 36752,
    "english": "Arka Kalyan",
    "indonesian": "Arka Kalyan"
  },
  {
    "id": 36753,
    "english": "Arka Kihriman",
    "indonesian": "Arka Kihriman"
  },
  {
    "id": 36754,
    "english": "Arka Kirtinaan",
    "indonesian": "Arka Kirtinaan"
  },
  {
    "id": 36755,
    "english": "Arka Lalima",
    "indonesian": "Arka Lalima"
  },
  {
    "id": 36756,
    "english": "Arka Niketan",
    "indonesian": "Arka Niketan"
  },
  {
    "id": 36757,
    "english": "Arka Pitambar",
    "indonesian": "Arka Pitambar"
  },
  {
    "id": 36758,
    "english": "Arka Pragathi",
    "indonesian": "Arka Pragathi"
  },
  {
    "id": 36759,
    "english": "Arka Sona",
    "indonesian": "Arka Sona"
  },
  {
    "id": 36760,
    "english": "Arka Swadista",
    "indonesian": "Arka Swadista"
  },
  {
    "id": 36761,
    "english": "Arka Ujjwal",
    "indonesian": "Arka Ujjwal"
  },
  {
    "id": 36762,
    "english": "Arka Vishwas",
    "indonesian": "Arka Vishwas"
  },
  {
    "id": 36763,
    "english": "Bangalore rose",
    "indonesian": "Mawar Bangalore"
  },
  {
    "id": 36764,
    "english": "Bhima super red",
    "indonesian": "Bhima super merah"
  },
  {
    "id": 36765,
    "english": "Bhima red",
    "indonesian": "Bhima merah"
  },
  {
    "id": 36766,
    "english": "Bhima raj dark red",
    "indonesian": "Bhima raj merah gelap"
  },
  {
    "id": 36767,
    "english": "Bhima Shakti red",
    "indonesian": "Bhima Shakti merah"
  },
  {
    "id": 36768,
    "english": "Bhima Kiran light red",
    "indonesian": "Bhima Kiran merah muda"
  },
  {
    "id": 36769,
    "english": "Bhima light red",
    "indonesian": "Bhima merah muda"
  },
  {
    "id": 36770,
    "english": "Bhima shubra white",
    "indonesian": "Bhima shubra putih"
  },
  {
    "id": 36771,
    "english": "Bhima shweta white",
    "indonesian": "Bhima putih shweta"
  },
  {
    "id": 36772,
    "english": "Bhima Safed",
    "indonesian": "Bhima Safed"
  },
  {
    "id": 36773,
    "english": "Early Grano",
    "indonesian": "Early Grano"
  },
  {
    "id": 36774,
    "english": "Kalyanpur Red Round",
    "indonesian": "Kalyanpur Merah Bulat"
  },
  {
    "id": 36775,
    "english": "Nimar local",
    "indonesian": "Lokal Nimar"
  },
  {
    "id": 36776,
    "english": "Phule Safeed",
    "indonesian": "Phule Safeed"
  },
  {
    "id": 36777,
    "english": "Phule Survana",
    "indonesian": "Phule Survana"
  },
  {
    "id": 36778,
    "english": "Phule Samarth",
    "indonesian": "Phule Samarth"
  },
  {
    "id": 36779,
    "english": "Phule Swarna",
    "indonesian": "Phule Swarna"
  },
  {
    "id": 36780,
    "english": "Punjab Selection",
    "indonesian": "Pilihan Punjab"
  },
  {
    "id": 36781,
    "english": "Pusa Madhavi",
    "indonesian": "Pusa Madhavi"
  },
  {
    "id": 36782,
    "english": "Pusa Ridhi",
    "indonesian": "Pusa Ridhi"
  },
  {
    "id": 36783,
    "english": "Spanish brown",
    "indonesian": "Cokelat Spanyol"
  },
  {
    "id": 36784,
    "english": "Suprex",
    "indonesian": "Suprex"
  },
  {
    "id": 36785,
    "english": "Talaja Local",
    "indonesian": "Lokal Talaja"
  },
  {
    "id": 36786,
    "english": "Bhima",
    "indonesian": "Bhima"
  },
  {
    "id": 36787,
    "english": "Girna",
    "indonesian": "Girna"
  },
  {
    "id": 36788,
    "english": "Manjira",
    "indonesian": "Manjira"
  },
  {
    "id": 36789,
    "english": "NIRA",
    "indonesian": "NIRA"
  },
  {
    "id": 36790,
    "english": "Sagarmatyalu",
    "indonesian": "Sagarmatyalu"
  },
  {
    "id": 36791,
    "english": "Sharda",
    "indonesian": "Sharda"
  },
  {
    "id": 36792,
    "english": "Tara",
    "indonesian": "Tara"
  },
  {
    "id": 36793,
    "english": "banana fruit",
    "indonesian": "buah pisang"
  },
  {
    "id": 36794,
    "english": "Farsem",
    "indonesian": "Farsem"
  },
  {
    "id": 36795,
    "english": "Amazonas Embrapa",
    "indonesian": "Amazonas Embrapa"
  },
  {
    "id": 36796,
    "english": "Fibra",
    "indonesian": "Fibra"
  },
  {
    "id": 36797,
    "english": "Espeto",
    "indonesian": "Espeto"
  },
  {
    "id": 36798,
    "english": "Mandim branca",
    "indonesian": "Mandim branca"
  },
  {
    "id": 36799,
    "english": "Platina",
    "indonesian": "Platina"
  },
  {
    "id": 36800,
    "english": "Sonara",
    "indonesian": "Sonara"
  },
  {
    "id": 36801,
    "english": "Jarina",
    "indonesian": "Jarina"
  },
  {
    "id": 36802,
    "english": "Arari",
    "indonesian": "Arari"
  },
  {
    "id": 36803,
    "english": "Cacau",
    "indonesian": "Cacau"
  },
  {
    "id": 36804,
    "english": "Taquari",
    "indonesian": "Taquari"
  },
  {
    "id": 36805,
    "english": "Liyaye",
    "indonesian": "Liyaye"
  },
  {
    "id": 36806,
    "english": "Vitamin A cassava",
    "indonesian": "Singkong Vitamin A"
  },
  {
    "id": 36807,
    "english": "Malyoha",
    "indonesian": "Malyoha"
  },
  {
    "id": 36808,
    "english": "Sawa sawa",
    "indonesian": "Sawa sawa"
  },
  {
    "id": 36809,
    "english": "Mapendo",
    "indonesian": "Mapendo"
  },
  {
    "id": 36810,
    "english": "Game changer",
    "indonesian": "Perubahan permainan"
  },
  {
    "id": 36811,
    "english": "Hope",
    "indonesian": "Harapan"
  },
  {
    "id": 36812,
    "english": "Poundable",
    "indonesian": "Poundable"
  },
  {
    "id": 36813,
    "english": "Farmer's pride",
    "indonesian": "Kebanggaan petani"
  },
  {
    "id": 36814,
    "english": "Dixon",
    "indonesian": "Dixon"
  },
  {
    "id": 36815,
    "english": "Ayaya",
    "indonesian": "Ayaya"
  },
  {
    "id": 36816,
    "english": "Sunshine",
    "indonesian": "Sunshine"
  },
  {
    "id": 36817,
    "english": "Fineface",
    "indonesian": "Fineface"
  },
  {
    "id": 36818,
    "english": "Kirimumpale",
    "indonesian": "Kirimumpale"
  },
  {
    "id": 36819,
    "english": "Magana",
    "indonesian": "Magana"
  },
  {
    "id": 36820,
    "english": "Abiriya",
    "indonesian": "Abiriya"
  },
  {
    "id": 36821,
    "english": "Sanje",
    "indonesian": "Sanje"
  },
  {
    "id": 36822,
    "english": "Njule",
    "indonesian": "Njule"
  },
  {
    "id": 36823,
    "english": "Bao, Alodo-alodo",
    "indonesian": "Bao, Alodo-alodo"
  },
  {
    "id": 36824,
    "english": "Bukalasa",
    "indonesian": "Bukalasa"
  },
  {
    "id": 36825,
    "english": "Fumba chai",
    "indonesian": "Fumba chai"
  },
  {
    "id": 36826,
    "english": "AKENA",
    "indonesian": "AKENA"
  },
  {
    "id": 36827,
    "english": "Royal quinoa",
    "indonesian": "Quinoa kerajaan"
  },
  {
    "id": 36828,
    "english": "Blanca de Junin",
    "indonesian": "Blanca de Junin"
  },
  {
    "id": 36829,
    "english": "Amarilla Marangani",
    "indonesian": "Amarilla Marangani"
  },
  {
    "id": 36830,
    "english": "Blanca de Juli",
    "indonesian": "Blanca de Juli"
  },
  {
    "id": 36831,
    "english": "Kankolla",
    "indonesian": "Kankolla"
  },
  {
    "id": 36832,
    "english": "Hulhuas",
    "indonesian": "Hulhuas"
  },
  {
    "id": 36833,
    "english": "Huacariz",
    "indonesian": "Huacariz"
  },
  {
    "id": 36834,
    "english": "Cheweca",
    "indonesian": "Cheweca"
  },
  {
    "id": 36835,
    "english": "Egyptian Pink",
    "indonesian": "Pink Mesir"
  },
  {
    "id": 36836,
    "english": "Elephant",
    "indonesian": "Gajah"
  },
  {
    "id": 36837,
    "english": "Tuscan",
    "indonesian": "Tuscan"
  },
  {
    "id": 36838,
    "english": "Endory",
    "indonesian": "Endory"
  },
  {
    "id": 36839,
    "english": "Raghiani",
    "indonesian": "Raghiani"
  },
  {
    "id": 36840,
    "english": "Rashli",
    "indonesian": "Rashli"
  },
  {
    "id": 36841,
    "english": "Jaminiya",
    "indonesian": "Jaminiya"
  },
  {
    "id": 36842,
    "english": "Sebha",
    "indonesian": "Sebha"
  },
  {
    "id": 36843,
    "english": "Barka",
    "indonesian": "Barka"
  },
  {
    "id": 36844,
    "english": "Zerda",
    "indonesian": "Zerda"
  },
  {
    "id": 36845,
    "english": "Fezzan",
    "indonesian": "Fezzan"
  },
  {
    "id": 36846,
    "english": "Mexicali",
    "indonesian": "Mexicali"
  },
  {
    "id": 36847,
    "english": "Masuli",
    "indonesian": "Masuli"
  },
  {
    "id": 36848,
    "english": "Khumal 4",
    "indonesian": "Khumal 4"
  },
  {
    "id": 36849,
    "english": "Ram",
    "indonesian": "Ram"
  },
  {
    "id": 36850,
    "english": "Khumal 8",
    "indonesian": "Khumal 8"
  },
  {
    "id": 36851,
    "english": "Janaki",
    "indonesian": "Janaki"
  },
  {
    "id": 36852,
    "english": "Judi",
    "indonesian": "Judi"
  },
  {
    "id": 36853,
    "english": "Supersweet",
    "indonesian": "Supersweet"
  },
  {
    "id": 36854,
    "english": "Deccan Hybrid",
    "indonesian": "Deccan Hybrid"
  },
  {
    "id": 36855,
    "english": "Ganga safed",
    "indonesian": "Ganga safed"
  },
  {
    "id": 36856,
    "english": "Hi-starch",
    "indonesian": "Hi-starch"
  },
  {
    "id": 36857,
    "english": "Paras",
    "indonesian": "Paras"
  },
  {
    "id": 36858,
    "english": "White star",
    "indonesian": "Bintang putih"
  },
  {
    "id": 36859,
    "english": "Western Queen",
    "indonesian": "Ratu Barat"
  },
  {
    "id": 36860,
    "english": "Up- to-Date",
    "indonesian": "Terbaru"
  },
  {
    "id": 36861,
    "english": "Pentland Dell",
    "indonesian": "Pentland Dell"
  },
  {
    "id": 36862,
    "english": "Pimpernel",
    "indonesian": "Pimpernel"
  },
  {
    "id": 36863,
    "english": "Majestic",
    "indonesian": "Majestic"
  },
  {
    "id": 36864,
    "english": "Baraka",
    "indonesian": "Baraka"
  },
  {
    "id": 36865,
    "english": "Challenger",
    "indonesian": "Challenger"
  },
  {
    "id": 36866,
    "english": "Courage",
    "indonesian": "Courage"
  },
  {
    "id": 36867,
    "english": "Victoria",
    "indonesian": "Victoria"
  },
  {
    "id": 36868,
    "english": "Innovator",
    "indonesian": "Innovator"
  },
  {
    "id": 36869,
    "english": "Papa pastusa",
    "indonesian": "Papa pastusa"
  },
  {
    "id": 36870,
    "english": "Papa sabanera",
    "indonesian": "Papa sabanera"
  },
  {
    "id": 36871,
    "english": "Canchan",
    "indonesian": "Canchan"
  },
  {
    "id": 36872,
    "english": "Huaych’a",
    "indonesian": "Huaych’a"
  },
  {
    "id": 36873,
    "english": "Runapapa",
    "indonesian": "Runapapa"
  },
  {
    "id": 36874,
    "english": "Phureja roja",
    "indonesian": "Phureja roja"
  },
  {
    "id": 36875,
    "english": "Yuraj imilla",
    "indonesian": "Yuraj imilla"
  },
  {
    "id": 36876,
    "english": "Jaspe",
    "indonesian": "Jaspe"
  },
  {
    "id": 36877,
    "english": "India",
    "indonesian": "India"
  },
  {
    "id": 36878,
    "english": "ACC madam blue",
    "indonesian": "ACC madam blue"
  },
  {
    "id": 36879,
    "english": "Abbot",
    "indonesian": "Abbot"
  },
  {
    "id": 36880,
    "english": "Erika",
    "indonesian": "Erika"
  },
  {
    "id": 36881,
    "english": "Jazzy",
    "indonesian": "Jazzy"
  },
  {
    "id": 36882,
    "english": "Krone",
    "indonesian": "Krone"
  },
  {
    "id": 36883,
    "english": "Labella",
    "indonesian": "Labella"
  },
  {
    "id": 36884,
    "english": "Lady Amarilla",
    "indonesian": "Lady Amarilla"
  },
  {
    "id": 36885,
    "english": "Laperla",
    "indonesian": "Laperla"
  },
  {
    "id": 36886,
    "english": "Little giant",
    "indonesian": "Little giant"
  },
  {
    "id": 36887,
    "english": "Melody",
    "indonesian": "Melody"
  },
  {
    "id": 36888,
    "english": "Musica",
    "indonesian": "Musica"
  },
  {
    "id": 36889,
    "english": "Umatilla Russet",
    "indonesian": "Umatilla Russet"
  },
  {
    "id": 36890,
    "english": "Norland",
    "indonesian": "Norland"
  },
  {
    "id": 36891,
    "english": "Irish Cobbler",
    "indonesian": "Irish Cobbler"
  },
  {
    "id": 36892,
    "english": "Moutain rose",
    "indonesian": "Moutain rose"
  },
  {
    "id": 36893,
    "english": "Cheiftan",
    "indonesian": "Cheiftan"
  },
  {
    "id": 36894,
    "english": "Viking",
    "indonesian": "Viking"
  },
  {
    "id": 36895,
    "english": "Elba",
    "indonesian": "Elba"
  },
  {
    "id": 36896,
    "english": "Red La soda",
    "indonesian": "Red La soda"
  },
  {
    "id": 36897,
    "english": "Lady Roseta",
    "indonesian": "Lady Roseta"
  },
  {
    "id": 36898,
    "english": "Jankdev",
    "indonesian": "Jankdev"
  },
  {
    "id": 36899,
    "english": "Khumal Bikas",
    "indonesian": "Khumal Bikas"
  },
  {
    "id": 36900,
    "english": "Ramsai",
    "indonesian": "Ramsai"
  },
  {
    "id": 36901,
    "english": "Golsai",
    "indonesian": "Golsai"
  },
  {
    "id": 36902,
    "english": "Saune",
    "indonesian": "Saune"
  },
  {
    "id": 36903,
    "english": "Bharlange",
    "indonesian": "Bharlange"
  },
  {
    "id": 36904,
    "english": "Jirmale",
    "indonesian": "Jirmale"
  },
  {
    "id": 36905,
    "english": "Dambersi",
    "indonesian": "Dambersi"
  },
  {
    "id": 36906,
    "english": "Ramala",
    "indonesian": "Ramala"
  },
  {
    "id": 36907,
    "english": "tukdah",
    "indonesian": "tukdah"
  },
  {
    "id": 36908,
    "english": "Copati",
    "indonesian": "Copati"
  },
  {
    "id": 36909,
    "english": "Kashi Amul",
    "indonesian": "Kashi Amul"
  },
  {
    "id": 36910,
    "english": "Kashi Adarsh",
    "indonesian": "Kashi Adarsh"
  },
  {
    "id": 36911,
    "english": "Kashi Abhiman",
    "indonesian": "Kashi Abhiman"
  },
  {
    "id": 36912,
    "english": "Kashi Anupam",
    "indonesian": "Kashi Anupam"
  },
  {
    "id": 36913,
    "english": "Kashi Sharad",
    "indonesian": "Kashi Sharad"
  },
  {
    "id": 36914,
    "english": "Kashi Hemant",
    "indonesian": "Kashi Hemant"
  },
  {
    "id": 36915,
    "english": "Kashi Amrit",
    "indonesian": "Kashi Amrit"
  },
  {
    "id": 36916,
    "english": "Kashi Vishesh",
    "indonesian": "Kashi Vishesh"
  },
  {
    "id": 36917,
    "english": "Vaishali",
    "indonesian": "Vaishali"
  },
  {
    "id": 36918,
    "english": "Rupali",
    "indonesian": "Rupali"
  },
  {
    "id": 36919,
    "english": "Rashmi",
    "indonesian": "Rashmi"
  },
  {
    "id": 36920,
    "english": "Rajni",
    "indonesian": "Rajni"
  },
  {
    "id": 36921,
    "english": "Sioux",
    "indonesian": "Sioux"
  },
  {
    "id": 36922,
    "english": "Best of All",
    "indonesian": "Best of All"
  },
  {
    "id": 36923,
    "english": "Marglobe",
    "indonesian": "Marglobe"
  },
  {
    "id": 36924,
    "english": "Roma",
    "indonesian": "Roma"
  },
  {
    "id": 36925,
    "english": "Punjab Chuhra",
    "indonesian": "Punjab Chuhra"
  },
  {
    "id": 36926,
    "english": "Shivalik",
    "indonesian": "Shivalik"
  },
  {
    "id": 36927,
    "english": "Versha",
    "indonesian": "Versha"
  },
  {
    "id": 36928,
    "english": "Bravo",
    "indonesian": "Bravo"
  },
  {
    "id": 36929,
    "english": "Archana",
    "indonesian": "Archana"
  },
  {
    "id": 36930,
    "english": "Sadabahar",
    "indonesian": "Sadabahar"
  },
  {
    "id": 36931,
    "english": "Arka Ahuti",
    "indonesian": "Arka Ahuti"
  },
  {
    "id": 36932,
    "english": "Arka Abha",
    "indonesian": "Arka Abha"
  },
  {
    "id": 36933,
    "english": "Arka Meghali",
    "indonesian": "Arka Meghali"
  },
  {
    "id": 36934,
    "english": "Pant Bahar",
    "indonesian": "Pant Bahar"
  },
  {
    "id": 36935,
    "english": "Arka Saurabh",
    "indonesian": "Arka Saurabh"
  },
  {
    "id": 36936,
    "english": "Arka Alok",
    "indonesian": "Arka Alok"
  },
  {
    "id": 36937,
    "english": "Sea Island cotton",
    "indonesian": "Sea Island cotton"
  },
  {
    "id": 36938,
    "english": "American Up-land cotton",
    "indonesian": "American Up-land cotton"
  },
  {
    "id": 36939,
    "english": "Catui",
    "indonesian": "Catui"
  },
  {
    "id": 36940,
    "english": "Novo",
    "indonesian": "Novo"
  },
  {
    "id": 36941,
    "english": "Mundo",
    "indonesian": "Mundo"
  },
  {
    "id": 36942,
    "english": "Garnica",
    "indonesian": "Garnica"
  },
  {
    "id": 36943,
    "english": "Erecta.",
    "indonesian": "Erecta."
  },
  {
    "id": 36944,
    "english": "Agaro",
    "indonesian": "Agaro"
  },
  {
    "id": 36945,
    "english": "Barbuk Sudan",
    "indonesian": "Barbuk Sudan"
  },
  {
    "id": 36946,
    "english": "Bedessa",
    "indonesian": "Bedessa"
  },
  {
    "id": 36947,
    "english": "Dega",
    "indonesian": "Dega"
  },
  {
    "id": 36948,
    "english": "H3",
    "indonesian": "H3"
  },
  {
    "id": 36949,
    "english": "native heirloom",
    "indonesian": "varietas warisan lokal"
  },
  {
    "id": 36950,
    "english": "Rume Sudan",
    "indonesian": "Rume Sudan"
  },
  {
    "id": 36951,
    "english": "Sawa",
    "indonesian": "Sawa"
  },
  {
    "id": 36952,
    "english": "Tafari Kela",
    "indonesian": "Tafari Kela"
  },
  {
    "id": 36953,
    "english": "Andog sari",
    "indonesian": "Andog sari"
  },
  {
    "id": 36954,
    "english": "Ethiopian",
    "indonesian": "Ethiopian"
  },
  {
    "id": 36955,
    "english": "Linie S",
    "indonesian": "Linie S"
  },
  {
    "id": 36956,
    "english": "Castillo®",
    "indonesian": "Castillo®"
  },
  {
    "id": 36957,
    "english": "Catimor,",
    "indonesian": "Catimor"
  },
  {
    "id": 36958,
    "english": "Typica,",
    "indonesian": "Typica"
  },
  {
    "id": 36959,
    "english": "Catuai.",
    "indonesian": "Catuai"
  },
  {
    "id": 36960,
    "english": "Moka",
    "indonesian": "Moka"
  },
  {
    "id": 36961,
    "english": "Culi",
    "indonesian": "Culi"
  },
  {
    "id": 36962,
    "english": "mara catura",
    "indonesian": "mara catura"
  },
  {
    "id": 36963,
    "english": "Poovan",
    "indonesian": "Poovan"
  },
  {
    "id": 36964,
    "english": "Monthan",
    "indonesian": "Monthan"
  },
  {
    "id": 36965,
    "english": "Rasthali",
    "indonesian": "Rasthali"
  },
  {
    "id": 36966,
    "english": "Nendran",
    "indonesian": "Nendran"
  },
  {
    "id": 36967,
    "english": "red banana",
    "indonesian": "pisang merah"
  },
  {
    "id": 36968,
    "english": "grand naine",
    "indonesian": "grand naine"
  },
  {
    "id": 36969,
    "english": "Karpooravalli",
    "indonesian": "Karpooravalli"
  },
  {
    "id": 36970,
    "english": "yellow dwarf Bananas",
    "indonesian": "pisang kerdil kuning"
  },
  {
    "id": 36971,
    "english": "Red dwarf Bananas.",
    "indonesian": "pisang kerdil merah"
  },
  {
    "id": 36972,
    "english": "green Bananas",
    "indonesian": "pisang hijau"
  },
  {
    "id": 36973,
    "english": "Green",
    "indonesian": "hijau"
  },
  {
    "id": 36974,
    "english": "Black",
    "indonesian": "hitam"
  },
  {
    "id": 36975,
    "english": "Argene",
    "indonesian": "Argene"
  },
  {
    "id": 36976,
    "english": "Serkamo",
    "indonesian": "Serkamo"
  },
  {
    "id": 36977,
    "english": "S",
    "indonesian": "S"
  },
  {
    "id": 36978,
    "english": "Tate",
    "indonesian": "Tate"
  },
  {
    "id": 36979,
    "english": "Ahadu",
    "indonesian": "Ahadu"
  },
  {
    "id": 36980,
    "english": "Borkena",
    "indonesian": "Borkena"
  },
  {
    "id": 36981,
    "english": "Obsa",
    "indonesian": "Obsa"
  },
  {
    "id": 36982,
    "english": "Dicho",
    "indonesian": "Dicho"
  },
  {
    "id": 36983,
    "english": "Barsan",
    "indonesian": "Barsan"
  },
  {
    "id": 36984,
    "english": "Lidan",
    "indonesian": "Lidan"
  },
  {
    "id": 36985,
    "english": "Arkebe",
    "indonesian": "Arkebe"
  },
  {
    "id": 36986,
    "english": "Smrat",
    "indonesian": "Smrat"
  },
  {
    "id": 36987,
    "english": "Bonay",
    "indonesian": "Bonay"
  },
  {
    "id": 36988,
    "english": "Bhavani",
    "indonesian": "Bhavani"
  },
  {
    "id": 36989,
    "english": "Panchali",
    "indonesian": "Panchali"
  },
  {
    "id": 36990,
    "english": "Sangam",
    "indonesian": "Sangam"
  },
  {
    "id": 36991,
    "english": "Pakola",
    "indonesian": "Pakola"
  },
  {
    "id": 36992,
    "english": "Canola Raya",
    "indonesian": "Canola Raya"
  },
  {
    "id": 36993,
    "english": "Rainbow",
    "indonesian": "Rainbow"
  },
  {
    "id": 36994,
    "english": "Amazon",
    "indonesian": "Amazon"
  },
  {
    "id": 36995,
    "english": "Mercedes",
    "indonesian": "Mercedes"
  },
  {
    "id": 36996,
    "english": "Frontana",
    "indonesian": "Frontana"
  },
  {
    "id": 36997,
    "english": "Mentana",
    "indonesian": "Mentana"
  },
  {
    "id": 36998,
    "english": "Tucano",
    "indonesian": "Tucano"
  },
  {
    "id": 36999,
    "english": "Vacaria",
    "indonesian": "Vacaria"
  },
  {
    "id": 37000,
    "english": "Pavao",
    "indonesian": "Pavao"
  },
  {
    "id": 37001,
    "english": "Climax",
    "indonesian": "Climax"
  },
  {
    "id": 37002,
    "english": "Richmond",
    "indonesian": "Richmond"
  },
  {
    "id": 37003,
    "english": "Rasant",
    "indonesian": "Rasant"
  },
  {
    "id": 37004,
    "english": "Timfo",
    "indonesian": "Timfo"
  },
  {
    "id": 37005,
    "english": "Alma",
    "indonesian": "Alma"
  },
  {
    "id": 37006,
    "english": "Basho",
    "indonesian": "Basho"
  },
  {
    "id": 37007,
    "english": "Bounty",
    "indonesian": "Bounty"
  },
  {
    "id": 37008,
    "english": "Champ",
    "indonesian": "Champ"
  },
  {
    "id": 37009,
    "english": "Comtal",
    "indonesian": "Comtal"
  },
  {
    "id": 37010,
    "english": "Tiller",
    "indonesian": "Tiller"
  },
  {
    "id": 37011,
    "english": "Clair",
    "indonesian": "Clair"
  },
  {
    "id": 37012,
    "english": "Barfleo",
    "indonesian": "Barfleo"
  },
  {
    "id": 37013,
    "english": "Kootenai",
    "indonesian": "Kootenai"
  },
  {
    "id": 37014,
    "english": "Barpenta",
    "indonesian": "Barpenta"
  },
  {
    "id": 37015,
    "english": "Toro",
    "indonesian": "Toro"
  },
  {
    "id": 37016,
    "english": "Mariposa",
    "indonesian": "Mariposa"
  },
  {
    "id": 37017,
    "english": "Champlain",
    "indonesian": "Champlain"
  },
  {
    "id": 37018,
    "english": "Finecut",
    "indonesian": "Finecut"
  },
  {
    "id": 37019,
    "english": "Gulfcut",
    "indonesian": "Gulfcut"
  },
  {
    "id": 37020,
    "english": "Pioneer",
    "indonesian": "Pioneer"
  },
  {
    "id": 37021,
    "english": "Reclaimar",
    "indonesian": "Reclaimar"
  },
  {
    "id": 37022,
    "english": "Salcut",
    "indonesian": "Salcut"
  },
  {
    "id": 37023,
    "english": "Topcut",
    "indonesian": "Topcut"
  },
  {
    "id": 37024,
    "english": "Boma",
    "indonesian": "Boma"
  },
  {
    "id": 37025,
    "english": "Callida",
    "indonesian": "Callida"
  },
  {
    "id": 37026,
    "english": "Elmba",
    "indonesian": "Elmba"
  },
  {
    "id": 37027,
    "english": "Marina",
    "indonesian": "Marina"
  },
  {
    "id": 37028,
    "english": "Sabre",
    "indonesian": "Sabre"
  },
  {
    "id": 37029,
    "english": "KP8",
    "indonesian": "KP8"
  },
  {
    "id": 37030,
    "english": "Nemcut",
    "indonesian": "Nemcut"
  },
  {
    "id": 37031,
    "english": "Asatsuyu",
    "indonesian": "Asatsuyu"
  },
  {
    "id": 37032,
    "english": "Katambora",
    "indonesian": "Katambora"
  },
  {
    "id": 37033,
    "english": "Tolgar",
    "indonesian": "Tolgar"
  },
  {
    "id": 37034,
    "english": "Egyptian giant",
    "indonesian": "Raksasa Mesir"
  },
  {
    "id": 37035,
    "english": "Marmand",
    "indonesian": "Marmand"
  },
  {
    "id": 37036,
    "english": "Edkawy",
    "indonesian": "Edkawy"
  },
  {
    "id": 37037,
    "english": "Pakmor-b",
    "indonesian": "Pakmor-b"
  },
  {
    "id": 37038,
    "english": "Floradade",
    "indonesian": "Floradade"
  },
  {
    "id": 37039,
    "english": "Mountain fresh plus",
    "indonesian": "Pegunungan segar plus"
  },
  {
    "id": 37040,
    "english": "Mountain spring",
    "indonesian": "Pegunungan musim semi"
  },
  {
    "id": 37041,
    "english": "Polbig",
    "indonesian": "Polbig"
  },
  {
    "id": 37042,
    "english": "Big beef",
    "indonesian": "Daging besar"
  },
  {
    "id": 37043,
    "english": "Boxcar willie",
    "indonesian": "Boxcar willie"
  },
  {
    "id": 37044,
    "english": "Mortgage lifter",
    "indonesian": "Pembebas hipotek"
  },
  {
    "id": 37045,
    "english": "Red pearl",
    "indonesian": "Mutia merah"
  },
  {
    "id": 37046,
    "english": "Sun gold",
    "indonesian": "Emas matahari"
  },
  {
    "id": 37047,
    "english": "Blackhawk",
    "indonesian": "Blackhawk"
  },
  {
    "id": 37048,
    "english": "Valentine",
    "indonesian": "Valentine"
  },
  {
    "id": 37049,
    "english": "Black eclipse",
    "indonesian": "Gerhana hitam"
  },
  {
    "id": 37050,
    "english": "Black bear",
    "indonesian": "Beruang hitam"
  },
  {
    "id": 37051,
    "english": "Abdin",
    "indonesian": "Abdin"
  },
  {
    "id": 37052,
    "english": "Hadi ( Okra – leaf Barakat )",
    "indonesian": "Hadi (Daun okra - Barakat)"
  },
  {
    "id": 37053,
    "english": "Kheiralla",
    "indonesian": "Kheiralla"
  },
  {
    "id": 37054,
    "english": "Wager",
    "indonesian": "Wager"
  },
  {
    "id": 37055,
    "english": "Burhan",
    "indonesian": "Burhan"
  },
  {
    "id": 37056,
    "english": "Khalifa",
    "indonesian": "Khalifa"
  },
  {
    "id": 37057,
    "english": "Bukalasa pedigree albar",
    "indonesian": "Bukalasa pedigree albar"
  },
  {
    "id": 37058,
    "english": "Serere albar type uganda (satu)",
    "indonesian": "Jenis Serere albar Uganda (satu)"
  },
  {
    "id": 37059,
    "english": "Guaraní inta bgrr",
    "indonesian": "Guaraní inta bgrr"
  },
  {
    "id": 37060,
    "english": "Nuopal rr",
    "indonesian": "Nuopal rr"
  },
  {
    "id": 37061,
    "english": "Purnima",
    "indonesian": "Purnima"
  },
  {
    "id": 37062,
    "english": "Jaydhar",
    "indonesian": "Jaydhar"
  },
  {
    "id": 37063,
    "english": "Malgari",
    "indonesian": "Malgari"
  },
  {
    "id": 37064,
    "english": "Abhadita,",
    "indonesian": "Abhadita"
  },
  {
    "id": 37065,
    "english": "Catuai,",
    "indonesian": "Catuai"
  },
  {
    "id": 37066,
    "english": "Caturra,",
    "indonesian": "Caturra"
  },
  {
    "id": 37067,
    "english": "Geisha,",
    "indonesian": "Geisha"
  },
  {
    "id": 37068,
    "english": "Lempira,",
    "indonesian": "Lempira"
  },
  {
    "id": 37069,
    "english": "Hartman",
    "indonesian": "Hartman"
  },
  {
    "id": 37070,
    "english": "Girard",
    "indonesian": "Girard"
  },
  {
    "id": 37071,
    "english": "Finch",
    "indonesian": "Finch"
  },
  {
    "id": 37072,
    "english": "Saffire",
    "indonesian": "Saffire"
  },
  {
    "id": 37073,
    "english": "Centennial",
    "indonesian": "Centennial"
  },
  {
    "id": 37074,
    "english": "Montola",
    "indonesian": "Montola"
  },
  {
    "id": 37075,
    "english": "merah besar",
    "indonesian": "merah besar"
  },
  {
    "id": 37076,
    "english": "curly green chilli",
    "indonesian": "cabai hijau keriting"
  },
  {
    "id": 37077,
    "english": "Red birds eye chilli",
    "indonesian": "cabai rawit merah"
  },
  {
    "id": 37078,
    "english": "green birds eye",
    "indonesian": "cabai rawit hijau"
  },
  {
    "id": 37079,
    "english": "kanthari",
    "indonesian": "kanthari"
  },
  {
    "id": 37080,
    "english": "kashmiri chilli",
    "indonesian": "cabai kashmiri"
  },
  {
    "id": 37081,
    "english": "Bhagya lakshmi",
    "indonesian": "Bhagya lakshmi"
  },
  {
    "id": 37082,
    "english": "birds eye chilli (dhani)",
    "indonesian": "cabai rawit (dhani)"
  },
  {
    "id": 37083,
    "english": "guntur chilli",
    "indonesian": "cabai guntur"
  },
  {
    "id": 37084,
    "english": "tomato chilli",
    "indonesian": "cabai tomat"
  },
  {
    "id": 37085,
    "english": "madras pari",
    "indonesian": "madras pari"
  },
  {
    "id": 37086,
    "english": "ramnad mundu",
    "indonesian": "ramnad mundu"
  },
  {
    "id": 37087,
    "english": "nagpur",
    "indonesian": "nagpur"
  },
  {
    "id": 37088,
    "english": "Crisphead",
    "indonesian": "Crisphead"
  },
  {
    "id": 37089,
    "english": "Butterhead",
    "indonesian": "Butterhead"
  },
  {
    "id": 37090,
    "english": "Romaine",
    "indonesian": "Romaine"
  },
  {
    "id": 37091,
    "english": "Loose leaf",
    "indonesian": "Daun lepas"
  },
  {
    "id": 37092,
    "english": "Frisbee",
    "indonesian": "Frisbee"
  },
  {
    "id": 37093,
    "english": "Radicchio",
    "indonesian": "Radicchio"
  },
  {
    "id": 37094,
    "english": "Oak leaf lettuce",
    "indonesian": "Selada daun oak"
  },
  {
    "id": 37095,
    "english": "stem lettuce",
    "indonesian": "selada batang"
  },
  {
    "id": 37096,
    "english": "Arugula",
    "indonesian": "Arugula"
  },
  {
    "id": 37097,
    "english": "cress",
    "indonesian": "cress"
  },
  {
    "id": 37098,
    "english": "Endive",
    "indonesian": "Endive"
  },
  {
    "id": 37099,
    "english": "coral lettuce",
    "indonesian": "selada karang"
  },
  {
    "id": 37100,
    "english": "Mache",
    "indonesian": "Mache"
  },
  {
    "id": 37101,
    "english": "Boston",
    "indonesian": "Boston"
  },
  {
    "id": 37102,
    "english": "Ambon banana",
    "indonesian": "pisang Ambon"
  },
  {
    "id": 37103,
    "english": "Barangan",
    "indonesian": "Barangan"
  },
  {
    "id": 37104,
    "english": "Kepok banana",
    "indonesian": "pisang Kepok"
  },
  {
    "id": 37105,
    "english": "Mas banana",
    "indonesian": "pisang Mas"
  },
  {
    "id": 37106,
    "english": "Cavendish",
    "indonesian": "Cavendish"
  },
  {
    "id": 37107,
    "english": "Lampung banana",
    "indonesian": "pisang Lampung"
  },
  {
    "id": 37108,
    "english": "Awk banana",
    "indonesian": "pisang Awak"
  },
  {
    "id": 37109,
    "english": "Champa",
    "indonesian": "Champa"
  },
  {
    "id": 37110,
    "english": "Ronit",
    "indonesian": "Ronit"
  },
  {
    "id": 37111,
    "english": "Sper Elad",
    "indonesian": "Sper Elad"
  },
  {
    "id": 37112,
    "english": "Trailblazer",
    "indonesian": "Trailblazer"
  },
  {
    "id": 37113,
    "english": "Vega",
    "indonesian": "Vega"
  },
  {
    "id": 37114,
    "english": "Candy",
    "indonesian": "Candy"
  },
  {
    "id": 37115,
    "english": "Exacta",
    "indonesian": "Exacta"
  },
  {
    "id": 37116,
    "english": "Red Sky",
    "indonesian": "Red Sky"
  },
  {
    "id": 37117,
    "english": "Redwing",
    "indonesian": "Redwing"
  },
  {
    "id": 37118,
    "english": "Bhima Shubhra",
    "indonesian": "Bhima Shubhra"
  },
  {
    "id": 37119,
    "english": "Brown Spanish",
    "indonesian": "Brown Spanish"
  },
  {
    "id": 37120,
    "english": "Punjab Naroya",
    "indonesian": "Punjab Naroya"
  },
  {
    "id": 37121,
    "english": "HERITAGE ENDURANCE",
    "indonesian": "HERITAGE ENDURANCE"
  },
  {
    "id": 37122,
    "english": "SARDI-GRAZER",
    "indonesian": "SARDI-GRAZER"
  },
  {
    "id": 37123,
    "english": "Tenera",
    "indonesian": "Tenera"
  },
  {
    "id": 37124,
    "english": "Golden acre",
    "indonesian": "Golden acre"
  },
  {
    "id": 37125,
    "english": "Danish ballhead",
    "indonesian": "Danish ballhead"
  },
  {
    "id": 37126,
    "english": "Kranti",
    "indonesian": "Kranti"
  },
  {
    "id": 37127,
    "english": "Manado Malay",
    "indonesian": "Manado Malay"
  },
  {
    "id": 37128,
    "english": "North Moluccan Malay",
    "indonesian": "North Moluccan Malay"
  },
  {
    "id": 37129,
    "english": "Ambon Malay",
    "indonesian": "Ambon Malay"
  },
  {
    "id": 37130,
    "english": "Banda Malay",
    "indonesian": "Banda Malay"
  },
  {
    "id": 37131,
    "english": "Lampong",
    "indonesian": "Lampong"
  },
  {
    "id": 37132,
    "english": "Muntok",
    "indonesian": "Muntok"
  },
  {
    "id": 37133,
    "english": "Sarawak pepper",
    "indonesian": "Sarawak pepper"
  },
  {
    "id": 37134,
    "english": "Jambi",
    "indonesian": "Jambi"
  },
  {
    "id": 37135,
    "english": "Baboon lemon",
    "indonesian": "Baboon lemon"
  },
  {
    "id": 37136,
    "english": "Brazilian sweet lemon",
    "indonesian": "Brazilian sweet lemon"
  },
  {
    "id": 37137,
    "english": "Bearss Lemons",
    "indonesian": "Bearss Lemons"
  },
  {
    "id": 37138,
    "english": "Punjab Baramasi",
    "indonesian": "Punjab Baramasi"
  },
  {
    "id": 37139,
    "english": "Punjab Galgal",
    "indonesian": "Punjab Galgal"
  },
  {
    "id": 37140,
    "english": "Lucknow seedless",
    "indonesian": "Lucknow seedless"
  },
  {
    "id": 37141,
    "english": "Pant Lemon (Seville)",
    "indonesian": "Pant Lemon (Seville)"
  },
  {
    "id": 37142,
    "english": "Lisbon lemon",
    "indonesian": "Lisbon lemon"
  },
  {
    "id": 37143,
    "english": "Jora tenga",
    "indonesian": "Jora tenga"
  },
  {
    "id": 37144,
    "english": "Rough lemon",
    "indonesian": "Rough lemon"
  },
  {
    "id": 37145,
    "english": "Nepali Round",
    "indonesian": "Nepali Round"
  },
  {
    "id": 37146,
    "english": "Chakradhar",
    "indonesian": "Chakradhar"
  },
  {
    "id": 37147,
    "english": "Rasraj",
    "indonesian": "Rasraj"
  },
  {
    "id": 37148,
    "english": "Red dwarf Bananas",
    "indonesian": "pisang Red dwarf"
  },
  {
    "id": 37149,
    "english": "Baswant 780",
    "indonesian": "Baswant 780"
  },
  {
    "id": 37150,
    "english": "Hisar-2",
    "indonesian": "Hisar-2"
  },
  {
    "id": 37151,
    "english": "Pusa Ratnar",
    "indonesian": "Pusa Ratnar"
  },
  {
    "id": 37152,
    "english": "Pusa Red",
    "indonesian": "Pusa Red"
  },
  {
    "id": 37153,
    "english": "Pusa white flat",
    "indonesian": "Pusa putih datar"
  },
  {
    "id": 37154,
    "english": "Pusa White Round",
    "indonesian": "Pusa putih bulat"
  },
  {
    "id": 37155,
    "english": "Udaipur -101",
    "indonesian": "Udaipur -101"
  },
  {
    "id": 37156,
    "english": "Udaipur -102",
    "indonesian": "Udaipur -102"
  },
  {
    "id": 37157,
    "english": "CoLk 94184 (Birendra)",
    "indonesian": "CoLk 94184 (Birendra)"
  },
  {
    "id": 37158,
    "english": "CoOr 03151(Sabita)",
    "indonesian": "CoOr 03151(Sabita)"
  },
  {
    "id": 37159,
    "english": "CGKusum-1",
    "indonesian": "CGKusum-1"
  },
  {
    "id": 37160,
    "english": "Malviya Kusum 305",
    "indonesian": "Malviya Kusum 305"
  },
  {
    "id": 37161,
    "english": "Nag-7",
    "indonesian": "Nag-7"
  },
  {
    "id": 37162,
    "english": "Nari 38",
    "indonesian": "Nari 38"
  },
  {
    "id": 37163,
    "english": "Phule Kusuma",
    "indonesian": "Phule Kusuma"
  },
  {
    "id": 37164,
    "english": "MY 5465",
    "indonesian": "MY 5465"
  },
  {
    "id": 37165,
    "english": "SP 701284",
    "indonesian": "SP 701284"
  },
  {
    "id": 37166,
    "english": "Adira 1",
    "indonesian": "Adira 1"
  },
  {
    "id": 37167,
    "english": "Adira 2",
    "indonesian": "Adira 2"
  },
  {
    "id": 37168,
    "english": "Adira 4",
    "indonesian": "Adira 4"
  },
  {
    "id": 37169,
    "english": "Malang 1",
    "indonesian": "Malang 1"
  },
  {
    "id": 37170,
    "english": "Malang 2",
    "indonesian": "Malang 2"
  },
  {
    "id": 37171,
    "english": "Malang 4",
    "indonesian": "Malang 4"
  },
  {
    "id": 37172,
    "english": "Casca roxa",
    "indonesian": "Casca roxa"
  },
  {
    "id": 37173,
    "english": "Mayombe",
    "indonesian": "Mayombe"
  },
  {
    "id": 37174,
    "english": "Musimwa",
    "indonesian": "Musimwa"
  },
  {
    "id": 37175,
    "english": "Obasanjo-2",
    "indonesian": "Obasanjo-2"
  },
  {
    "id": 37176,
    "english": "Baba 70",
    "indonesian": "Baba 70"
  },
  {
    "id": 37177,
    "english": "Nyaraboke",
    "indonesian": "Nyaraboke"
  },
  {
    "id": 37178,
    "english": "Karangwa",
    "indonesian": "Karangwa"
  },
  {
    "id": 37179,
    "english": "Kabiriti",
    "indonesian": "Kabiriti"
  },
  {
    "id": 37180,
    "english": "Mingoro",
    "indonesian": "Mingoro"
  },
  {
    "id": 37181,
    "english": "Kwatamumpale",
    "indonesian": "Kwatamumpale"
  },
  {
    "id": 37182,
    "english": "Ogwok",
    "indonesian": "Ogwok"
  },
  {
    "id": 37183,
    "english": "NASE 19",
    "indonesian": "NASE 19"
  },
  {
    "id": 37184,
    "english": "NAROCASS 1",
    "indonesian": "NAROCASS 1"
  },
  {
    "id": 37185,
    "english": "NAROCASS 2",
    "indonesian": "NAROCASS 2"
  },
  {
    "id": 37186,
    "english": "Inca red",
    "indonesian": "Inca merah"
  },
  {
    "id": 37187,
    "english": "Rosada de Junin",
    "indonesian": "Rosada de Junin"
  },
  {
    "id": 37188,
    "english": "Mantaro",
    "indonesian": "Mantaro"
  },
  {
    "id": 37189,
    "english": "Rosada Taraco",
    "indonesian": "Rosada Taraco"
  },
  {
    "id": 37190,
    "english": "Mokhtar",
    "indonesian": "Mokhtar"
  },
  {
    "id": 37191,
    "english": "Sidi Masri",
    "indonesian": "Sidi Masri"
  },
  {
    "id": 37192,
    "english": "Zellaf",
    "indonesian": "Zellaf"
  },
  {
    "id": 37193,
    "english": "Kufra 1",
    "indonesian": "Kufra 1"
  },
  {
    "id": 37194,
    "english": "Merjawi",
    "indonesian": "Merjawi"
  },
  {
    "id": 37195,
    "english": "Buhut 103",
    "indonesian": "Buhut 103"
  },
  {
    "id": 37196,
    "english": "Embrapa 49",
    "indonesian": "Embrapa 49"
  },
  {
    "id": 37197,
    "english": "6505 B",
    "indonesian": "6505 B"
  },
  {
    "id": 37198,
    "english": "Chhommrong",
    "indonesian": "Chhommrong"
  },
  {
    "id": 37199,
    "english": "Lekali Dhan 3",
    "indonesian": "Lekali Dhan 3"
  },
  {
    "id": 37200,
    "english": "Radha 4",
    "indonesian": "Radha 4"
  },
  {
    "id": 37201,
    "english": "Sarju 52",
    "indonesian": "Sarju 52"
  },
  {
    "id": 37202,
    "english": "BP 1",
    "indonesian": "BP 1"
  },
  {
    "id": 37203,
    "english": "Agroceres 12",
    "indonesian": "Agroceres 12"
  },
  {
    "id": 37204,
    "english": "Ganga 4",
    "indonesian": "Ganga 4"
  },
  {
    "id": 37205,
    "english": "Ganga 7",
    "indonesian": "Ganga 7"
  },
  {
    "id": 37206,
    "english": "Rajendra hybrid makka 2",
    "indonesian": "Rajendra hibrid makka 2"
  },
  {
    "id": 37207,
    "english": "Kawanda Comp A",
    "indonesian": "Kawanda Kom A"
  },
  {
    "id": 37208,
    "english": "Papa criolla",
    "indonesian": "Papa criolla"
  },
  {
    "id": 37209,
    "english": "Criolla Sua Pa",
    "indonesian": "Criolla Sua Pa"
  },
  {
    "id": 37210,
    "english": "Criolla Dorada",
    "indonesian": "Criolla Dorada"
  },
  {
    "id": 37211,
    "english": "Qhoyllupapa",
    "indonesian": "Qhoyllupapa"
  },
  {
    "id": 37212,
    "english": "Qhenipapa",
    "indonesian": "Qhenipapa"
  },
  {
    "id": 37213,
    "english": "Wila imilla",
    "indonesian": "Wila imilla"
  },
  {
    "id": 37214,
    "english": "Chiar Imilla",
    "indonesian": "Chiar Imilla"
  },
  {
    "id": 37215,
    "english": "Sani imilla",
    "indonesian": "Sani imilla"
  },
  {
    "id": 37216,
    "english": "Russet Norkotah",
    "indonesian": "Russet Norkotah"
  },
  {
    "id": 37217,
    "english": "Ranger Russet",
    "indonesian": "Ranger Russet"
  },
  {
    "id": 37218,
    "english": "Red pontiac",
    "indonesian": "Red pontiac"
  },
  {
    "id": 37219,
    "english": "Kennebec",
    "indonesian": "Kennebec"
  },
  {
    "id": 37220,
    "english": "Yukon Gold",
    "indonesian": "Yukon Gold"
  },
  {
    "id": 37221,
    "english": "Kufri jyoti",
    "indonesian": "Kufri jyoti"
  },
  {
    "id": 37222,
    "english": "Kufri sindhuri",
    "indonesian": "Kufri sindhuri"
  },
  {
    "id": 37223,
    "english": "Kufri Chandramukhi",
    "indonesian": "Kufri Chandramukhi"
  },
  {
    "id": 37224,
    "english": "Kufri Pukhraj",
    "indonesian": "Kufri Pukhraj"
  },
  {
    "id": 37225,
    "english": "Kufri Khyati",
    "indonesian": "Kufri Khyati"
  },
  {
    "id": 37226,
    "english": "Kufri Arun",
    "indonesian": "Kufri Arun"
  },
  {
    "id": 37227,
    "english": "Kufri Surya",
    "indonesian": "Kufri Surya"
  },
  {
    "id": 37228,
    "english": "Kufri Kanchan",
    "indonesian": "Kufri Kanchan"
  },
  {
    "id": 37229,
    "english": "Kufri Bahar",
    "indonesian": "Kufri Bahar"
  },
  {
    "id": 37230,
    "english": "Kufri Megha",
    "indonesian": "Kufri Megha"
  },
  {
    "id": 37231,
    "english": "Khumal Upahar",
    "indonesian": "Khumal Upahar"
  },
  {
    "id": 37232,
    "english": "Khumal Seto-1",
    "indonesian": "Khumal Seto-1"
  },
  {
    "id": 37233,
    "english": "Chibesai",
    "indonesian": "Chibesai"
  },
  {
    "id": 37234,
    "english": "Tukdah-135",
    "indonesian": "Tukdah-135"
  },
  {
    "id": 37235,
    "english": "Tukdah- 383",
    "indonesian": "Tukdah- 383"
  },
  {
    "id": 37236,
    "english": "Tukdah-78",
    "indonesian": "Tukdah-78"
  },
  {
    "id": 37237,
    "english": "Happy Valley- 36",
    "indonesian": "Happy Valley- 36"
  },
  {
    "id": 37238,
    "english": "Thurbo 3",
    "indonesian": "Thurbo 3"
  },
  {
    "id": 37239,
    "english": "Sikkim 1",
    "indonesian": "Sikkim 1"
  },
  {
    "id": 37240,
    "english": "Rungli 144",
    "indonesian": "Rungli 144"
  },
  {
    "id": 37241,
    "english": "Kashi Aman",
    "indonesian": "Kashi Aman"
  },
  {
    "id": 37242,
    "english": "Pusa Ruby",
    "indonesian": "Pusa Ruby"
  },
  {
    "id": 37243,
    "english": "Pusa Early Dwarf",
    "indonesian": "Pusa Early Dwarf"
  },
  {
    "id": 37244,
    "english": "Co 1",
    "indonesian": "Co 1"
  },
  {
    "id": 37245,
    "english": "Arka Vikas ( Sel 22 )",
    "indonesian": "Arka Vikas ( Sel 22 )"
  },
  {
    "id": 37246,
    "english": "Arka Saurabh ( Sel - 4)",
    "indonesian": "Arka Saurabh ( Sel - 4)"
  },
  {
    "id": 37247,
    "english": "Arka Ahuti ( Sel 11 )",
    "indonesian": "Arka Ahuti ( Sel 11 )"
  },
  {
    "id": 37248,
    "english": "Arka Vardan ( FM hyb -2)",
    "indonesian": "Arka Vardan ( FM hyb -2)"
  },
  {
    "id": 37249,
    "english": "Arka Shreshta",
    "indonesian": "Arka Shreshta"
  },
  {
    "id": 37250,
    "english": "Round Pusa",
    "indonesian": "Round Pusa"
  },
  {
    "id": 37251,
    "english": "Pusa Hybrid -2",
    "indonesian": "Pusa Hybrid -2"
  },
  {
    "id": 37252,
    "english": "Pusa Red Plum",
    "indonesian": "Pusa Red Plum"
  },
  {
    "id": 37253,
    "english": "Solan Gola",
    "indonesian": "Solan Gola"
  },
  {
    "id": 37254,
    "english": "Pusa Gaurav",
    "indonesian": "Pusa Gaurav"
  },
  {
    "id": 37255,
    "english": "Narendra Tomato 1",
    "indonesian": "Narendra Tomato 1"
  },
  {
    "id": 37256,
    "english": "Narendra Tomato 2",
    "indonesian": "Narendra Tomato 2"
  },
  {
    "id": 37257,
    "english": "Selection 10",
    "indonesian": "Selection 10"
  },
  {
    "id": 37258,
    "english": "Abyssinia",
    "indonesian": "Abyssinia"
  },
  {
    "id": 37259,
    "english": "Geisha(1931)",
    "indonesian": "Geisha(1931)"
  },
  {
    "id": 37260,
    "english": "Geisha(1956)",
    "indonesian": "Geisha(1956)"
  },
  {
    "id": 37261,
    "english": "Kudhumi/ Kurume",
    "indonesian": "Kudhumi/ Kurume"
  },
  {
    "id": 37262,
    "english": "Miqe",
    "indonesian": "Miqe"
  },
  {
    "id": 37263,
    "english": "Bergundal",
    "indonesian": "Bergundal"
  },
  {
    "id": 37264,
    "english": "Andong Sari",
    "indonesian": "Andong Sari"
  },
  {
    "id": 37265,
    "english": "dwarf cavendish",
    "indonesian": "dwarf cavendish"
  },
  {
    "id": 37266,
    "english": "Neypoovan",
    "indonesian": "Neypoovan"
  },
  {
    "id": 37267,
    "english": "Vayal vazhai",
    "indonesian": "Vayal vazhai"
  },
  {
    "id": 37268,
    "english": "Oolong",
    "indonesian": "Oolong"
  },
  {
    "id": 37269,
    "english": "Adi",
    "indonesian": "Adi"
  },
  {
    "id": 37270,
    "english": "Abasena",
    "indonesian": "Abasena"
  },
  {
    "id": 37271,
    "english": "Kelafo-74",
    "indonesian": "Kelafo-74"
  },
  {
    "id": 37272,
    "english": "Mehado-80",
    "indonesian": "Mehado-80"
  },
  {
    "id": 37273,
    "english": "E",
    "indonesian": "E"
  },
  {
    "id": 37274,
    "english": "Humera-1",
    "indonesian": "Humera-1"
  },
  {
    "id": 37275,
    "english": "Setit-1",
    "indonesian": "Setit-1"
  },
  {
    "id": 37276,
    "english": "Shawarobit",
    "indonesian": "Shawarobit"
  },
  {
    "id": 37277,
    "english": "Pusa Vishal ML-818",
    "indonesian": "Pusa Vishal ML-818"
  },
  {
    "id": 37278,
    "english": "Vaibhav",
    "indonesian": "Vaibhav"
  },
  {
    "id": 37279,
    "english": "Pusa kalyani",
    "indonesian": "Pusa kalyani"
  },
  {
    "id": 37280,
    "english": "Patan 66",
    "indonesian": "Patan 66"
  },
  {
    "id": 37281,
    "english": "Gujrat sarsav - 1",
    "indonesian": "Gujrat sarsav - 1"
  },
  {
    "id": 37282,
    "english": "Qinyou- 10",
    "indonesian": "Qinyou- 10"
  },
  {
    "id": 37283,
    "english": "Amelando",
    "indonesian": "Amelando"
  },
  {
    "id": 37284,
    "english": "Trinitario",
    "indonesian": "Trinitario"
  },
  {
    "id": 37285,
    "english": "Tiiti",
    "indonesian": "Tiiti"
  },
  {
    "id": 37286,
    "english": "Hokuo",
    "indonesian": "Hokuo"
  },
  {
    "id": 37287,
    "english": "Zenyatta",
    "indonesian": "Zenyatta"
  },
  {
    "id": 37288,
    "english": "Mohawk",
    "indonesian": "Mohawk"
  },
  {
    "id": 37289,
    "english": "Nemkat",
    "indonesian": "Nemkat"
  },
  {
    "id": 37290,
    "english": "TV 23",
    "indonesian": "TV 23"
  },
  {
    "id": 37291,
    "english": "Black cat (06252)",
    "indonesian": "Kucing hitam (06252)"
  },
  {
    "id": 37292,
    "english": "Barakat ( 90 )",
    "indonesian": "Barakat ( 90 )"
  },
  {
    "id": 37293,
    "english": "Barac ( 67 ) acala",
    "indonesian": "Barac ( 67 ) acala"
  },
  {
    "id": 37294,
    "english": "Siddig ( sudan pima)",
    "indonesian": "Siddig ( Sudan Pima )"
  },
  {
    "id": 37295,
    "english": "Siokra 1-4",
    "indonesian": "Siokra 1-4"
  },
  {
    "id": 37296,
    "english": "Bikaneri nerma",
    "indonesian": "Bikaneri Nerma"
  },
  {
    "id": 37297,
    "english": "Eknath",
    "indonesian": "Eknath"
  },
  {
    "id": 37298,
    "english": "Khandwa–2",
    "indonesian": "Khandwa–2"
  },
  {
    "id": 37299,
    "english": "Badnawar–1",
    "indonesian": "Badnawar–1"
  },
  {
    "id": 37300,
    "english": "Supriya",
    "indonesian": "Supriya"
  },
  {
    "id": 37301,
    "english": "Oker",
    "indonesian": "Oker"
  },
  {
    "id": 37302,
    "english": "Erlin",
    "indonesian": "Erlin"
  },
  {
    "id": 37303,
    "english": "Cabai rawit",
    "indonesian": "Cabai Rawit"
  },
  {
    "id": 37304,
    "english": "Cabai keriting",
    "indonesian": "Cabai Keriting"
  },
  {
    "id": 37305,
    "english": "cayenne pepper(hottest chilli)",
    "indonesian": "Cayenne Pepper (Cabai Terpedas)"
  },
  {
    "id": 37306,
    "english": "cabai ceremai",
    "indonesian": "Cabai Ceremai"
  },
  {
    "id": 37307,
    "english": "Bengkulu",
    "indonesian": "Bengkulu"
  },
  {
    "id": 37308,
    "english": "lembang",
    "indonesian": "Lembang"
  },
  {
    "id": 37309,
    "english": "jwala",
    "indonesian": "Jwala"
  },
  {
    "id": 37310,
    "english": "sangli sannam",
    "indonesian": "Sangli Sannam"
  },
  {
    "id": 37311,
    "english": "G.T.sannam",
    "indonesian": "G.T. Sannam"
  },
  {
    "id": 37312,
    "english": "Bibb lettuce",
    "indonesian": "Selada Bibb"
  },
  {
    "id": 37313,
    "english": "little gem lettuce",
    "indonesian": "Selada Little Gem"
  },
  {
    "id": 37314,
    "english": "Raja bagus banana",
    "indonesian": "Pisang Raja Bagus"
  },
  {
    "id": 37315,
    "english": "Jackfruit banana",
    "indonesian": "Pisang Jackfruit"
  },
  {
    "id": 37316,
    "english": "Ebenezer",
    "indonesian": "Ebenezer"
  },
  {
    "id": 37317,
    "english": "Mercury",
    "indonesian": "Mercury"
  },
  {
    "id": 37318,
    "english": "Bhima Super",
    "indonesian": "Bhima Super"
  },
  {
    "id": 37319,
    "english": "Bhima Dark Red",
    "indonesian": "Bhima Dark Red"
  },
  {
    "id": 37320,
    "english": "Bhima Shweta",
    "indonesian": "Bhima Shweta"
  },
  {
    "id": 37321,
    "english": "Pusa Madhv",
    "indonesian": "Pusa Madhv"
  },
  {
    "id": 37322,
    "english": "Raj 171",
    "indonesian": "Raj 171"
  },
  {
    "id": 37323,
    "english": "ALFAMASTER 10",
    "indonesian": "ALFAMASTER 10"
  },
  {
    "id": 37324,
    "english": "Titan5",
    "indonesian": "Titan5"
  },
  {
    "id": 37325,
    "english": "sf force11",
    "indonesian": "SF Force11"
  },
  {
    "id": 37326,
    "english": "SARDI 10",
    "indonesian": "SARDI 10"
  },
  {
    "id": 37327,
    "english": "HERITAGE 10",
    "indonesian": "HERITAGE 10"
  },
  {
    "id": 37328,
    "english": "ALFAMASTER 11",
    "indonesian": "ALFAMASTER 11"
  },
  {
    "id": 37329,
    "english": "Jersey wakefield",
    "indonesian": "Jersey Wakefield"
  },
  {
    "id": 37330,
    "english": "Pusa Drum Head",
    "indonesian": "Pusa Drum Head"
  },
  {
    "id": 37331,
    "english": "Pusa Mukta",
    "indonesian": "Pusa Mukta"
  },
  {
    "id": 37332,
    "english": "SAMSORG 45",
    "indonesian": "SAMSORG 45"
  },
  {
    "id": 37333,
    "english": "SAMSORG 46",
    "indonesian": "SAMSORG 46"
  },
  {
    "id": 37334,
    "english": "SAMSORG 47",
    "indonesian": "SAMSORG 47"
  },
  {
    "id": 37335,
    "english": "SAMSORG 48",
    "indonesian": "SAMSORG 48"
  },
  {
    "id": 37336,
    "english": "Kupang Malay",
    "indonesian": "Kupang Malay"
  },
  {
    "id": 37337,
    "english": "Dorshapo",
    "indonesian": "Dorshapo"
  },
  {
    "id": 37338,
    "english": "PAU Baramasi-1",
    "indonesian": "PAU Baramasi-1"
  },
  {
    "id": 37339,
    "english": "Gondhoraj",
    "indonesian": "Gondhoraj"
  },
  {
    "id": 37340,
    "english": "Pat Nebu",
    "indonesian": "Pat Nebu"
  },
  {
    "id": 37341,
    "english": "Kaji nemu",
    "indonesian": "Kaji Nemu"
  },
  {
    "id": 37342,
    "english": "Gol nemu",
    "indonesian": "Gol Nemu"
  },
  {
    "id": 37343,
    "english": "BO 128 (Pramod)",
    "indonesian": "BO 128 (Pramod)"
  },
  {
    "id": 37344,
    "english": "Co-1",
    "indonesian": "Co-1"
  },
  {
    "id": 37345,
    "english": "Co-2",
    "indonesian": "Co-2"
  },
  {
    "id": 37346,
    "english": "Granex 429",
    "indonesian": "Granex 429"
  },
  {
    "id": 37347,
    "english": "Granex 55",
    "indonesian": "Granex 55"
  },
  {
    "id": 37348,
    "english": "HA 60",
    "indonesian": "HA 60"
  },
  {
    "id": 37349,
    "english": "N 2-4-1",
    "indonesian": "N 2-4-1"
  },
  {
    "id": 37350,
    "english": "N-257-9-1",
    "indonesian": "N-257-9-1"
  },
  {
    "id": 37351,
    "english": "N-53",
    "indonesian": "N-53"
  },
  {
    "id": 37352,
    "english": "NHRDF Red",
    "indonesian": "NHRDF Merah"
  },
  {
    "id": 37353,
    "english": "NHRDF Red 2",
    "indonesian": "NHRDF Merah 2"
  },
  {
    "id": 37354,
    "english": "NHRDF Red3",
    "indonesian": "NHRDF Merah 3"
  },
  {
    "id": 37355,
    "english": "NHRDF Red4",
    "indonesian": "NHRDF Merah 4"
  },
  {
    "id": 37356,
    "english": "S-48",
    "indonesian": "S-48"
  },
  {
    "id": 37357,
    "english": "Tana F1",
    "indonesian": "Tana F1"
  },
  {
    "id": 37358,
    "english": "VL-3",
    "indonesian": "VL-3"
  },
  {
    "id": 37359,
    "english": "OC 671",
    "indonesian": "OC 671"
  },
  {
    "id": 37360,
    "english": "COC 771",
    "indonesian": "COC 771"
  },
  {
    "id": 37361,
    "english": "COC 772",
    "indonesian": "COC 772"
  },
  {
    "id": 37362,
    "english": "COC 773",
    "indonesian": "COC 773"
  },
  {
    "id": 37363,
    "english": "COC 8001 (C 66191)",
    "indonesian": "COC 8001 (C 66191)"
  },
  {
    "id": 37364,
    "english": "COC 774",
    "indonesian": "COC 774"
  },
  {
    "id": 37365,
    "english": "COC 775",
    "indonesian": "COC 775"
  },
  {
    "id": 37366,
    "english": "COC 776",
    "indonesian": "COC 776"
  },
  {
    "id": 37367,
    "english": "COC 777",
    "indonesian": "COC 777"
  },
  {
    "id": 37368,
    "english": "COC 778",
    "indonesian": "COC 778"
  },
  {
    "id": 37369,
    "english": "COC 779",
    "indonesian": "COC 779"
  },
  {
    "id": 37370,
    "english": "CO 419",
    "indonesian": "CO 419"
  },
  {
    "id": 37371,
    "english": "CO 6304",
    "indonesian": "CO 6304"
  },
  {
    "id": 37372,
    "english": "COC 8001",
    "indonesian": "COC 8001"
  },
  {
    "id": 37373,
    "english": "COC 85061",
    "indonesian": "COC 85061"
  },
  {
    "id": 37374,
    "english": "COC 86062",
    "indonesian": "COC 86062"
  },
  {
    "id": 37375,
    "english": "COSi 86071",
    "indonesian": "COSi 86071"
  },
  {
    "id": 37376,
    "english": "COC 90063",
    "indonesian": "COC 90063"
  },
  {
    "id": 37377,
    "english": "CO 8021",
    "indonesian": "CO 8021"
  },
  {
    "id": 37378,
    "english": "COC 91061",
    "indonesian": "COC 91061"
  },
  {
    "id": 37379,
    "english": "COC 92061",
    "indonesian": "COC 92061"
  },
  {
    "id": 37380,
    "english": "CO 8362",
    "indonesian": "CO 8362"
  },
  {
    "id": 37381,
    "english": "COG 93076",
    "indonesian": "COG 93076"
  },
  {
    "id": 37382,
    "english": "CO 8208",
    "indonesian": "CO 8208"
  },
  {
    "id": 37383,
    "english": "COG 94077",
    "indonesian": "COG 94077"
  },
  {
    "id": 37384,
    "english": "COG 95076",
    "indonesian": "COG 95076"
  },
  {
    "id": 37385,
    "english": "CO 85019",
    "indonesian": "CO 85019"
  },
  {
    "id": 37386,
    "english": "COSi 95071",
    "indonesian": "COSi 95071"
  },
  {
    "id": 37387,
    "english": "COSi 96071",
    "indonesian": "COSi 96071"
  },
  {
    "id": 37388,
    "english": "CO 86010",
    "indonesian": "CO 86010"
  },
  {
    "id": 37389,
    "english": "COC 98061",
    "indonesian": "COC 98061"
  },
  {
    "id": 37390,
    "english": "COSi 98071",
    "indonesian": "COSi 98071"
  },
  {
    "id": 37391,
    "english": "CO 86249",
    "indonesian": "CO 86249"
  },
  {
    "id": 37392,
    "english": "COC 99061",
    "indonesian": "COC 99061"
  },
  {
    "id": 37393,
    "english": "CO 86032",
    "indonesian": "CO 86032"
  },
  {
    "id": 37394,
    "english": "COC (SC) 22",
    "indonesian": "COC (SC) 22"
  },
  {
    "id": 37395,
    "english": "CO Si (SC) 6",
    "indonesian": "CO Si (SC) 6"
  },
  {
    "id": 37396,
    "english": "COG (SC) 5",
    "indonesian": "COG (SC) 5"
  },
  {
    "id": 37397,
    "english": "CoC 23",
    "indonesian": "CoC 23"
  },
  {
    "id": 37398,
    "english": "CoC 24",
    "indonesian": "CoC 24"
  },
  {
    "id": 37399,
    "english": "TNAU SC Si 7",
    "indonesian": "TNAU SC Si 7"
  },
  {
    "id": 37400,
    "english": "TNAU SC Si 8",
    "indonesian": "TNAU SC Si 8"
  },
  {
    "id": 37401,
    "english": "Co 0118 (Karan-2)",
    "indonesian": "Co 0118 (Karan-2)"
  },
  {
    "id": 37402,
    "english": "Co 0124 (Karan-5)",
    "indonesian": "Co 0124 (Karan-5)"
  },
  {
    "id": 37403,
    "english": "Co 0218 (Shreyas)",
    "indonesian": "Co 0218 (Shreyas)"
  },
  {
    "id": 37404,
    "english": "Co 0232 (Kamal)",
    "indonesian": "Co 0232 (Kamal)"
  },
  {
    "id": 37405,
    "english": "Co 0233 (Kosi)",
    "indonesian": "Co 0233 (Kosi)"
  },
  {
    "id": 37406,
    "english": "Co 0237 (Karan-8)",
    "indonesian": "Co 0237 (Karan-8)"
  },
  {
    "id": 37407,
    "english": "Co 0238 (Karan-4)",
    "indonesian": "Co 0238 (Karan-4)"
  },
  {
    "id": 37408,
    "english": "Co 0239 (Karan-6)",
    "indonesian": "Co 0239 (Karan-6)"
  },
  {
    "id": 37409,
    "english": "Co 0403 (Samriddhi)",
    "indonesian": "Co 0403 (Samriddhi)"
  },
  {
    "id": 37410,
    "english": "Co 05009 (Karan-10)",
    "indonesian": "Co 05009 (Karan-10)"
  },
  {
    "id": 37411,
    "english": "Co 05011 (Karan-9)",
    "indonesian": "Co 05011 (Karan-9)"
  },
  {
    "id": 37412,
    "english": "Co 06027",
    "indonesian": "Co 06027"
  },
  {
    "id": 37413,
    "english": "Co 06030",
    "indonesian": "Co 06030"
  },
  {
    "id": 37414,
    "english": "Co 09022 (Karan 12)",
    "indonesian": "Co 09022 (Karan 12)"
  },
  {
    "id": 37415,
    "english": "Co 2001-13 (Sulabh)",
    "indonesian": "Co 2001-13 (Sulabh)"
  },
  {
    "id": 37416,
    "english": "Co 2001-15 (Mangal)",
    "indonesian": "Co 2001-15 (Mangal)"
  },
  {
    "id": 37417,
    "english": "Co 8371 (Bhima)",
    "indonesian": "Co 8371 (Bhima)"
  },
  {
    "id": 37418,
    "english": "Co 85004 (Prabha)",
    "indonesian": "Co 85004 (Prabha)"
  },
  {
    "id": 37419,
    "english": "Co 86032 (Nayana)",
    "indonesian": "Co 86032 (Nayana)"
  },
  {
    "id": 37420,
    "english": "Co 86249 (Bhavani)",
    "indonesian": "Co 86249 (Bhavani)"
  },
  {
    "id": 37421,
    "english": "Co 87025 (Kalyani)",
    "indonesian": "Co 87025 (Kalyani)"
  },
  {
    "id": 37422,
    "english": "Co 87044 (Uttara)",
    "indonesian": "Co 87044 (Uttara)"
  },
  {
    "id": 37423,
    "english": "Co 87263 (Sarayu)",
    "indonesian": "Co 87263 (Sarayu)"
  },
  {
    "id": 37424,
    "english": "Co 87268 (Moti)",
    "indonesian": "Co 87268 (Moti)"
  },
  {
    "id": 37425,
    "english": "Co 89029 (Gandak)",
    "indonesian": "Co 89029 (Gandak)"
  },
  {
    "id": 37426,
    "english": "Co 91010 (Dhanush)",
    "indonesian": "Co 91010 (Dhanush)"
  },
  {
    "id": 37427,
    "english": "Co 94008 (Shyama)",
    "indonesian": "Co 94008 (Shyama)"
  },
  {
    "id": 37428,
    "english": "Co 98014 (Karan-1)",
    "indonesian": "Co 98014 (Karan-1)"
  },
  {
    "id": 37429,
    "english": "Co 99004 (Damodar)",
    "indonesian": "Co 99004 (Damodar)"
  },
  {
    "id": 37430,
    "english": "CoC 01061 (CoC (SC) 23)",
    "indonesian": "CoC 01061 (CoC (SC) 23)"
  },
  {
    "id": 37431,
    "english": "CoH 119 (Haryana Ganna - 119)",
    "indonesian": "CoH 119 (Haryana Ganna - 119)"
  },
  {
    "id": 37432,
    "english": "CoH 128",
    "indonesian": "CoH 128"
  },
  {
    "id": 37433,
    "english": "CoH 2201 (Haryana-92)",
    "indonesian": "CoH 2201 (Haryana-92)"
  },
  {
    "id": 37434,
    "english": "CoH 92201(Haryana-92)",
    "indonesian": "CoH 92201(Haryana-92)"
  },
  {
    "id": 37435,
    "english": "CoJ 20193 (CoJ 89)",
    "indonesian": "CoJ 20193 (CoJ 89)"
  },
  {
    "id": 37436,
    "english": "CoM 88121 (Krishna)",
    "indonesian": "CoM 88121 (Krishna)"
  },
  {
    "id": 37437,
    "english": "CoP 06436 (CoP 2061)",
    "indonesian": "CoP 06436 (CoP 2061)"
  },
  {
    "id": 37438,
    "english": "CoPant 90223 (Pant 90223)",
    "indonesian": "CoPant 90223 (Pant 90223)"
  },
  {
    "id": 37439,
    "english": "CoPant 97222",
    "indonesian": "CoPant 97222"
  },
  {
    "id": 37440,
    "english": "CoPk 05191 (Pratap Ganna-1)",
    "indonesian": "CoPk 05191 (Pratap Ganna-1)"
  },
  {
    "id": 37441,
    "english": "CoS 1230 (Raseeli)",
    "indonesian": "CoS 1230 (Raseeli)"
  },
  {
    "id": 37442,
    "english": "CoS 91230 (Raseeli)",
    "indonesian": "CoS 91230 (Raseeli)"
  },
  {
    "id": 37443,
    "english": "CoS 94270 (Sweta)",
    "indonesian": "CoS 94270 (Sweta)"
  },
  {
    "id": 37444,
    "english": "CoS 96268 (Mithas)",
    "indonesian": "CoS 96268 (Mithas)"
  },
  {
    "id": 37445,
    "english": "CoS 96275 (Sweety)",
    "indonesian": "CoS 96275 (Sweety)"
  },
  {
    "id": 37446,
    "english": "CoSe 01421 (Imarti)",
    "indonesian": "CoSe 01421 (Imarti)"
  },
  {
    "id": 37447,
    "english": "CoSe 92423 (Rajbhog)",
    "indonesian": "CoSe 92423 (Rajbhog)"
  },
  {
    "id": 37448,
    "english": "CoSe 95255 (Rachna)",
    "indonesian": "CoSe 95255 (Rachna)"
  },
  {
    "id": 37449,
    "english": "CoSe 95422 (Rasbhari)",
    "indonesian": "CoSe 95422 (Rasbhari)"
  },
  {
    "id": 37450,
    "english": "CoSe 96234 (Rashmi)",
    "indonesian": "CoSe 96234 (Rashmi)"
  },
  {
    "id": 37451,
    "english": "CoSe 96436 (Jalpari)",
    "indonesian": "CoSe 96436 (Jalpari)"
  },
  {
    "id": 37452,
    "english": "CoSnk 05103",
    "indonesian": "CoSnk 05103"
  },
  {
    "id": 37453,
    "english": "CoSnk 05104",
    "indonesian": "CoSnk 05104"
  },
  {
    "id": 37454,
    "english": "A-2",
    "indonesian": "A-2"
  },
  {
    "id": 37455,
    "english": "A-300",
    "indonesian": "A-300"
  },
  {
    "id": 37456,
    "english": "AKS-207",
    "indonesian": "AKS-207"
  },
  {
    "id": 37457,
    "english": "Annigeri-1(A-1)",
    "indonesian": "Annigeri-1(A-1)"
  },
  {
    "id": 37458,
    "english": "DSH-129",
    "indonesian": "DSH-129"
  },
  {
    "id": 37459,
    "english": "DSH-185",
    "indonesian": "DSH-185"
  },
  {
    "id": 37460,
    "english": "IGKV Kusum (RSS 2016-03)",
    "indonesian": "IGKV Kusum (RSS 2016-03)"
  },
  {
    "id": 37461,
    "english": "ISF-1",
    "indonesian": "ISF-1"
  },
  {
    "id": 37462,
    "english": "ISF-764",
    "indonesian": "ISF-764"
  },
  {
    "id": 37463,
    "english": "JSF-1",
    "indonesian": "JSF-1"
  },
  {
    "id": 37464,
    "english": "JSF-97",
    "indonesian": "JSF-97"
  },
  {
    "id": 37465,
    "english": "JSF-99",
    "indonesian": "JSF-99"
  },
  {
    "id": 37466,
    "english": "JSI-7",
    "indonesian": "JSI-7"
  },
  {
    "id": 37467,
    "english": "JSI-73",
    "indonesian": "JSI-73"
  },
  {
    "id": 37468,
    "english": "Lakshmi Priya (ISF 764)",
    "indonesian": "Lakshmi Priya (ISF 764)"
  },
  {
    "id": 37469,
    "english": "MKH-11",
    "indonesian": "MKH-11"
  },
  {
    "id": 37470,
    "english": "MRSA-521",
    "indonesian": "MRSA-521"
  },
  {
    "id": 37471,
    "english": "N-62-8",
    "indonesian": "N-62-8"
  },
  {
    "id": 37472,
    "english": "NARI-57",
    "indonesian": "NARI-57"
  },
  {
    "id": 37473,
    "english": "NARI-6",
    "indonesian": "NARI-6"
  },
  {
    "id": 37474,
    "english": "NARI-96",
    "indonesian": "NARI-96"
  },
  {
    "id": 37475,
    "english": "NARI-H-15",
    "indonesian": "NARI-H-15"
  },
  {
    "id": 37476,
    "english": "NARI-H-23",
    "indonesian": "NARI-H-23"
  },
  {
    "id": 37477,
    "english": "NARI-NH-1",
    "indonesian": "NARI-NH-1"
  },
  {
    "id": 37478,
    "english": "PBNS-12",
    "indonesian": "PBNS-12"
  },
  {
    "id": 37479,
    "english": "PBNS-40",
    "indonesian": "PBNS-40"
  },
  {
    "id": 37480,
    "english": "PKV-Pink",
    "indonesian": "PKV-Pink"
  },
  {
    "id": 37481,
    "english": "Pride (ISF 1)",
    "indonesian": "Pride (ISF 1)"
  },
  {
    "id": 37482,
    "english": "S-144",
    "indonesian": "S-144"
  },
  {
    "id": 37483,
    "english": "SSF-12-40",
    "indonesian": "SSF-12-40"
  },
  {
    "id": 37484,
    "english": "SSF-13-71",
    "indonesian": "SSF-13-71"
  },
  {
    "id": 37485,
    "english": "SSF-658",
    "indonesian": "SSF-658"
  },
  {
    "id": 37486,
    "english": "SSF-708",
    "indonesian": "SSF-708"
  },
  {
    "id": 37487,
    "english": "TSF-1",
    "indonesian": "TSF-1"
  },
  {
    "id": 37488,
    "english": "Type-6503",
    "indonesian": "Type-6503"
  },
  {
    "id": 37489,
    "english": "CC93-7711",
    "indonesian": "CC93-7711"
  },
  {
    "id": 37490,
    "english": "CC93-7510",
    "indonesian": "CC93-7510"
  },
  {
    "id": 37491,
    "english": "CC01-1940",
    "indonesian": "CC01-1940"
  },
  {
    "id": 37492,
    "english": "CC84-75",
    "indonesian": "CC84-75"
  },
  {
    "id": 37493,
    "english": "RD 7511",
    "indonesian": "RD 7511"
  },
  {
    "id": 37494,
    "english": "PR 61-632",
    "indonesian": "PR 61-632"
  },
  {
    "id": 37495,
    "english": "Co 421",
    "indonesian": "Co 421"
  },
  {
    "id": 37496,
    "english": "POJ-2878",
    "indonesian": "POJ-2878"
  },
  {
    "id": 37497,
    "english": "PR 11-41",
    "indonesian": "PR 11-41"
  },
  {
    "id": 37498,
    "english": "MZC 74-275",
    "indonesian": "MZC 74-275"
  },
  {
    "id": 37499,
    "english": "PR 62-66",
    "indonesian": "PR 62-66"
  },
  {
    "id": 37500,
    "english": "UB 1/2",
    "indonesian": "UB 1/2"
  },
  {
    "id": 37501,
    "english": "UB 15/10",
    "indonesian": "UB 15/10"
  },
  {
    "id": 37502,
    "english": "UB 881-5",
    "indonesian": "UB 881-5"
  },
  {
    "id": 37503,
    "english": "UB 477-2",
    "indonesian": "UB 477-2"
  },
  {
    "id": 37504,
    "english": "BRS Purus",
    "indonesian": "BRS Purus"
  },
  {
    "id": 37505,
    "english": "TME 419",
    "indonesian": "TME 419"
  },
  {
    "id": 37506,
    "english": "F100",
    "indonesian": "F100"
  },
  {
    "id": 37507,
    "english": "Gbasumenge",
    "indonesian": "Gbasumenge"
  },
  {
    "id": 37508,
    "english": "Ofumbachai",
    "indonesian": "Ofumbachai"
  },
  {
    "id": 37509,
    "english": "Icilcil",
    "indonesian": "Icilcil"
  },
  {
    "id": 37510,
    "english": "Ebwanaterak",
    "indonesian": "Ebwanaterak"
  },
  {
    "id": 37511,
    "english": "NASE 14",
    "indonesian": "NASE 14"
  },
  {
    "id": 37512,
    "english": "NASE 3",
    "indonesian": "NASE 3"
  },
  {
    "id": 37513,
    "english": "NASE 1",
    "indonesian": "NASE 1"
  },
  {
    "id": 37514,
    "english": "Ccoito",
    "indonesian": "Ccoito"
  },
  {
    "id": 37515,
    "english": "Salcedo INIA",
    "indonesian": "Salcedo INIA"
  },
  {
    "id": 37516,
    "english": "Illpa INIA",
    "indonesian": "Illpa INIA"
  },
  {
    "id": 37517,
    "english": "INIA 415 - Pasankalla",
    "indonesian": "INIA 415 - Pasankalla"
  },
  {
    "id": 37518,
    "english": "INIA 420-Negra Collana",
    "indonesian": "INIA 420-Negra Collana"
  },
  {
    "id": 37519,
    "english": "INIA 427 - Amarilla",
    "indonesian": "INIA 427 - Amarilla"
  },
  {
    "id": 37520,
    "english": "INIA 431-Altiplano",
    "indonesian": "INIA 431-Altiplano"
  },
  {
    "id": 37521,
    "english": "INIA 441- Senor del Huerto",
    "indonesian": "INIA 441- Senor del Huerto"
  },
  {
    "id": 37522,
    "english": "13D843",
    "indonesian": "13D843"
  },
  {
    "id": 37523,
    "english": "14G498",
    "indonesian": "14G498"
  },
  {
    "id": 37524,
    "english": "13G519",
    "indonesian": "13G519"
  },
  {
    "id": 37525,
    "english": "BRS 213",
    "indonesian": "BRS 213"
  },
  {
    "id": 37526,
    "english": "BRS 282",
    "indonesian": "BRS 282"
  },
  {
    "id": 37527,
    "english": "SL 958",
    "indonesian": "SL 958"
  },
  {
    "id": 37528,
    "english": "SL 744",
    "indonesian": "SL 744"
  },
  {
    "id": 37529,
    "english": "SL 525",
    "indonesian": "SL 525"
  },
  {
    "id": 37530,
    "english": "DM6563 IPRO",
    "indonesian": "DM6563 IPRO"
  },
  {
    "id": 37531,
    "english": "DM 5958",
    "indonesian": "DM 5958"
  },
  {
    "id": 37532,
    "english": "22-61 RY",
    "indonesian": "22-61 RY"
  },
  {
    "id": 37533,
    "english": "P005T13R",
    "indonesian": "P005T13R"
  },
  {
    "id": 37534,
    "english": "NSC Leroy RR2Y",
    "indonesian": "NSC Leroy RR2Y"
  },
  {
    "id": 37535,
    "english": "UA 5612",
    "indonesian": "UA 5612"
  },
  {
    "id": 37536,
    "english": "JTN 5503",
    "indonesian": "JTN 5503"
  },
  {
    "id": 37537,
    "english": "AG 6534",
    "indonesian": "AG 6534"
  },
  {
    "id": 37538,
    "english": "BMX Garra",
    "indonesian": "BMX Garra"
  },
  {
    "id": 37539,
    "english": "BMX Icone",
    "indonesian": "BMX Icone"
  },
  {
    "id": 37540,
    "english": "Monsoy M5892",
    "indonesian": "Monsoy M5892"
  },
  {
    "id": 37541,
    "english": "AFS 110RR",
    "indonesian": "AFS 110RR"
  },
  {
    "id": 37542,
    "english": "TMG 7262 RR",
    "indonesian": "TMG 7262 RR"
  },
  {
    "id": 37543,
    "english": "BRS 284",
    "indonesian": "BRS 284"
  },
  {
    "id": 37544,
    "english": "BRS 267",
    "indonesian": "BRS 267"
  },
  {
    "id": 37545,
    "english": "Chianung 242",
    "indonesian": "Chianung 242"
  },
  {
    "id": 37546,
    "english": "CH 45",
    "indonesian": "CH 45"
  },
  {
    "id": 37547,
    "english": "RH 245",
    "indonesian": "RH 245"
  },
  {
    "id": 37548,
    "english": "Bisi 222",
    "indonesian": "Bisi 222"
  },
  {
    "id": 37549,
    "english": "NK 7328",
    "indonesian": "NK 7328"
  },
  {
    "id": 37550,
    "english": "PV 61177 SRR",
    "indonesian": "PV 61177 SRR"
  },
  {
    "id": 37551,
    "english": "PV 61180 RIB",
    "indonesian": "PV 61180 RIB"
  },
  {
    "id": 37552,
    "english": "TH6079 VT2P",
    "indonesian": "TH6079 VT2P"
  },
  {
    "id": 37553,
    "english": "PV 60172 RR",
    "indonesian": "PV 60172 RR"
  },
  {
    "id": 37554,
    "english": "Agroceres 303",
    "indonesian": "Agroceres 303"
  },
  {
    "id": 37555,
    "english": "C 929",
    "indonesian": "C 929"
  },
  {
    "id": 37556,
    "english": "Himalayan 123",
    "indonesian": "Himalayan 123"
  },
  {
    "id": 37557,
    "english": "C6006",
    "indonesian": "C6006"
  },
  {
    "id": 37558,
    "english": "Col 17",
    "indonesian": "Col 17"
  },
  {
    "id": 37559,
    "english": "Dl 507",
    "indonesian": "Dl 507"
  },
  {
    "id": 37560,
    "english": "N 7822",
    "indonesian": "N 7822"
  },
  {
    "id": 37561,
    "english": "SRM 553",
    "indonesian": "SRM 553"
  },
  {
    "id": 37562,
    "english": "T7677 VT2P",
    "indonesian": "T7677 VT2P"
  },
  {
    "id": 37563,
    "english": "T2889 CONV",
    "indonesian": "T2889 CONV"
  },
  {
    "id": 37564,
    "english": "T6107 VT2P",
    "indonesian": "T6107 VT2P"
  },
  {
    "id": 37565,
    "english": "UH 615",
    "indonesian": "UH 615"
  },
  {
    "id": 37566,
    "english": "H 517",
    "indonesian": "H 517"
  },
  {
    "id": 37567,
    "english": "Longe 1",
    "indonesian": "Longe 1"
  },
  {
    "id": 37568,
    "english": "Longe 4",
    "indonesian": "Longe 4"
  },
  {
    "id": 37569,
    "english": "Longe 6H",
    "indonesian": "Longe 6H"
  },
  {
    "id": 37570,
    "english": "Longe 8H",
    "indonesian": "Longe 8H"
  },
  {
    "id": 37571,
    "english": "PAN 67",
    "indonesian": "PAN 67"
  },
  {
    "id": 37572,
    "english": "DK 8051",
    "indonesian": "DK 8051"
  },
  {
    "id": 37573,
    "english": "DK 803 1",
    "indonesian": "DK 803 1"
  },
  {
    "id": 37574,
    "english": "UH 5402",
    "indonesian": "UH 5402"
  },
  {
    "id": 37575,
    "english": "WE 2101",
    "indonesian": "WE 2101"
  },
  {
    "id": 37576,
    "english": "PAN 7 M - 89",
    "indonesian": "PAN 7 M - 89"
  },
  {
    "id": 37577,
    "english": "BPI",
    "indonesian": "BPI"
  },
  {
    "id": 37578,
    "english": "R12",
    "indonesian": "R12"
  },
  {
    "id": 37579,
    "english": "Criolla Ocarina",
    "indonesian": "Criolla Ocarina"
  },
  {
    "id": 37580,
    "english": "Luk’ys Ch’oqhepitus",
    "indonesian": "Luk’ys Ch’oqhepitus"
  },
  {
    "id": 37581,
    "english": "AAC Shirley",
    "indonesian": "AAC Shirley"
  },
  {
    "id": 37582,
    "english": "AAC Canada Gold Doree",
    "indonesian": "AAC Canada Gold Doree"
  },
  {
    "id": 37583,
    "english": "Russet Burbank",
    "indonesian": "Russet Burbank"
  },
  {
    "id": 37584,
    "english": "MS 42.3",
    "indonesian": "MS 42.3"
  },
  {
    "id": 37585,
    "english": "IPY -8",
    "indonesian": "IPY -8"
  },
  {
    "id": 37586,
    "english": "Ct First",
    "indonesian": "Ct First"
  },
  {
    "id": 37587,
    "english": "PV 40",
    "indonesian": "PV 40"
  },
  {
    "id": 37588,
    "english": "PV 1",
    "indonesian": "PV 1"
  },
  {
    "id": 37589,
    "english": "AV 2",
    "indonesian": "AV 2"
  },
  {
    "id": 37590,
    "english": "Dannock durn 668",
    "indonesian": "Dannock durn 668"
  },
  {
    "id": 37591,
    "english": "Dannock durn 777",
    "indonesian": "Dannock durn 777"
  },
  {
    "id": 37592,
    "english": "Pusa 120",
    "indonesian": "Pusa 120"
  },
  {
    "id": 37593,
    "english": "S-152",
    "indonesian": "S-152"
  },
  {
    "id": 37594,
    "english": "HS 102",
    "indonesian": "HS 102"
  },
  {
    "id": 37595,
    "english": "Arka Ashish ( IIHR - 674 )",
    "indonesian": "Arka Ashish ( IIHR - 674 )"
  },
  {
    "id": 37596,
    "english": "Arka Abha ( BWR 1)",
    "indonesian": "Arka Abha ( BWR 1)"
  },
  {
    "id": 37597,
    "english": "Arka Alok ( BER - 5 )",
    "indonesian": "Arka Alok ( BER - 5 )"
  },
  {
    "id": 37598,
    "english": "Arka Vishal ( FM HYB -1)",
    "indonesian": "Arka Vishal ( FM HYB -1)"
  },
  {
    "id": 37599,
    "english": "Arka Abhijit ( BRH 2)",
    "indonesian": "Arka Abhijit ( BRH 2)"
  },
  {
    "id": 37600,
    "english": "HS101",
    "indonesian": "HS101"
  },
  {
    "id": 37601,
    "english": "Pusa Hybrid - 4",
    "indonesian": "Pusa Hybrid - 4"
  },
  {
    "id": 37602,
    "english": "Pant T-10",
    "indonesian": "Pant T-10"
  },
  {
    "id": 37603,
    "english": "Pant T-3",
    "indonesian": "Pant T-3"
  },
  {
    "id": 37604,
    "english": "AC-238",
    "indonesian": "AC-238"
  },
  {
    "id": 37605,
    "english": "SL 28",
    "indonesian": "SL 28"
  },
  {
    "id": 37606,
    "english": "SL 14",
    "indonesian": "SL 14"
  },
  {
    "id": 37607,
    "english": "KP 423",
    "indonesian": "KP 423"
  },
  {
    "id": 37608,
    "english": "selection 9/Sln.9/S.2790",
    "indonesian": "selection 9/Sln.9/S.2790"
  },
  {
    "id": 37609,
    "english": "Selection 7.3/ Sln.7.3",
    "indonesian": "Selection 7.3/ Sln.7.3"
  },
  {
    "id": 37610,
    "english": "Selection 6/Sln.6",
    "indonesian": "Selection 6/Sln.6"
  },
  {
    "id": 37611,
    "english": "Selection 4/ Sln.4",
    "indonesian": "Selection 4/ Sln.4"
  },
  {
    "id": 37612,
    "english": "S288",
    "indonesian": "S288"
  },
  {
    "id": 37613,
    "english": "jember S795",
    "indonesian": "jember S795"
  },
  {
    "id": 37614,
    "english": "cioccie / Choche",
    "indonesian": "cioccie / Choche"
  },
  {
    "id": 37615,
    "english": "USDA/USDA762",
    "indonesian": "USDA/USDA762"
  },
  {
    "id": 37616,
    "english": "Hibrido de Timor (HDT) Tim Tim",
    "indonesian": "Hibrido de Timor (HDT) Tim Tim"
  },
  {
    "id": 37617,
    "english": "303/577 tea clone",
    "indonesian": "303/577 tea clone"
  },
  {
    "id": 37618,
    "english": "6/8 tea clone",
    "indonesian": "6/8 tea clone"
  },
  {
    "id": 37619,
    "english": "31/8 tea clone",
    "indonesian": "31/8 tea clone"
  },
  {
    "id": 37620,
    "english": "108/82 tea clone",
    "indonesian": "108/82 tea clone"
  },
  {
    "id": 37621,
    "english": "100/5 tea clone.",
    "indonesian": "100/5 tea clone."
  },
  {
    "id": 37622,
    "english": "CC 85-92",
    "indonesian": "CC 85-92"
  },
  {
    "id": 37623,
    "english": "CC 84-75",
    "indonesian": "CC 84-75"
  },
  {
    "id": 37624,
    "english": "V 71-51",
    "indonesian": "V 71-51"
  },
  {
    "id": 37625,
    "english": "CC 93-3895",
    "indonesian": "CC 93-3895"
  },
  {
    "id": 37626,
    "english": "CC 93-4418",
    "indonesian": "CC 93-4418"
  },
  {
    "id": 37627,
    "english": "CC 92-2198",
    "indonesian": "CC 92-2198"
  },
  {
    "id": 37628,
    "english": "CC 93-7510",
    "indonesian": "CC 93-7510"
  },
  {
    "id": 37629,
    "english": "CC 92-2804",
    "indonesian": "CC 92-2804"
  },
  {
    "id": 37630,
    "english": "CC 87-434",
    "indonesian": "CC 87-434"
  },
  {
    "id": 37631,
    "english": "CC 93-4181",
    "indonesian": "CC 93-4181"
  },
  {
    "id": 37632,
    "english": "CC 93-3826",
    "indonesian": "CC 93-3826"
  },
  {
    "id": 37633,
    "english": "CC 87-505",
    "indonesian": "CC 87-505"
  },
  {
    "id": 37634,
    "english": "CC 85-57",
    "indonesian": "CC 85-57"
  },
  {
    "id": 37635,
    "english": "CC 85-47",
    "indonesian": "CC 85-47"
  },
  {
    "id": 37636,
    "english": "CC 92-2154",
    "indonesian": "CC 92-2154"
  },
  {
    "id": 37637,
    "english": "CC 92-2188",
    "indonesian": "CC 92-2188"
  },
  {
    "id": 37638,
    "english": "CC 93-3817",
    "indonesian": "CC 93-3817"
  },
  {
    "id": 37639,
    "english": "CC 93-7711",
    "indonesian": "CC 93-7711"
  },
  {
    "id": 37640,
    "english": "CC 01-1940",
    "indonesian": "CC 01-1940"
  },
  {
    "id": 37641,
    "english": "PR 1141",
    "indonesian": "PR 1141"
  },
  {
    "id": 37642,
    "english": "CC 86-45",
    "indonesian": "CC 86-45"
  },
  {
    "id": 37643,
    "english": "sjkjkjk",
    "indonesian": "sjkjkjk"
  },
  {
    "id": 37644,
    "english": "xyz",
    "indonesian": "xyz"
  },
  {
    "id": 37645,
    "english": "T-85",
    "indonesian": "T-85"
  },
  {
    "id": 37646,
    "english": "MH-97-6(Boreda)",
    "indonesian": "MH-97-6(Boreda)"
  },
  {
    "id": 37647,
    "english": "Rasa N - 26",
    "indonesian": "Rasa N - 26"
  },
  {
    "id": 37648,
    "english": "NLV- 1",
    "indonesian": "NLV- 1"
  },
  {
    "id": 37649,
    "english": "Narendra Mung-1 LGG-460",
    "indonesian": "Narendra Mung-1 LGG-460"
  },
  {
    "id": 37650,
    "english": "SML-668",
    "indonesian": "SML-668"
  },
  {
    "id": 37651,
    "english": "RMG-492",
    "indonesian": "RMG-492"
  },
  {
    "id": 37652,
    "english": "IPM-02-3",
    "indonesian": "IPM-02-3"
  },
  {
    "id": 37653,
    "english": "HUM-16",
    "indonesian": "HUM-16"
  },
  {
    "id": 37654,
    "english": "AKM-4",
    "indonesian": "AKM-4"
  },
  {
    "id": 37655,
    "english": "PKV-Green Gold",
    "indonesian": "PKV-Emas Hijau"
  },
  {
    "id": 37656,
    "english": "AKM-8802",
    "indonesian": "AKM-8802"
  },
  {
    "id": 37657,
    "english": "BRSMG Camaleao",
    "indonesian": "BRSMG Camaleao"
  },
  {
    "id": 37658,
    "english": "Ouro Verde MG 2",
    "indonesian": "Ouro Verde MG 2"
  },
  {
    "id": 37659,
    "english": "MGS Esmeralda",
    "indonesian": "MGS Esmeralda"
  },
  {
    "id": 37660,
    "english": "PBN - 2002",
    "indonesian": "PBN - 2002"
  },
  {
    "id": 37661,
    "english": "GSL - 1",
    "indonesian": "GSL - 1"
  },
  {
    "id": 37662,
    "english": "HNS - 3",
    "indonesian": "HNS - 3"
  },
  {
    "id": 37663,
    "english": "PBN - 9501",
    "indonesian": "PBN - 9501"
  },
  {
    "id": 37664,
    "english": "PBN - 9502",
    "indonesian": "PBN - 9502"
  },
  {
    "id": 37665,
    "english": "PBN - 2001",
    "indonesian": "PBN - 2001"
  },
  {
    "id": 37666,
    "english": "GSL - 441",
    "indonesian": "GSL - 441"
  },
  {
    "id": 37667,
    "english": "HNS - 4",
    "indonesian": "HNS - 4"
  },
  {
    "id": 37668,
    "english": "Fengyou - 737",
    "indonesian": "Fengyou - 737"
  },
  {
    "id": 37669,
    "english": "Youyan - 10",
    "indonesian": "Youyan - 10"
  },
  {
    "id": 37670,
    "english": "CS 117",
    "indonesian": "CS 117"
  },
  {
    "id": 37671,
    "english": "CS 123",
    "indonesian": "CS 123"
  },
  {
    "id": 37672,
    "english": "CS 141",
    "indonesian": "CS 141"
  },
  {
    "id": 37673,
    "english": "CATIE-R1",
    "indonesian": "CATIE-R1"
  },
  {
    "id": 37674,
    "english": "CATIE-R4",
    "indonesian": "CATIE-R4"
  },
  {
    "id": 37675,
    "english": "CC-137",
    "indonesian": "CC-137"
  },
  {
    "id": 37676,
    "english": "ICS-95 T1",
    "indonesian": "ICS-95 T1"
  },
  {
    "id": 37677,
    "english": "PMCT-58",
    "indonesian": "PMCT-58"
  },
  {
    "id": 37678,
    "english": "CRIN TC-2",
    "indonesian": "CRIN TC-2"
  },
  {
    "id": 37679,
    "english": "CRIN TC-1",
    "indonesian": "CRIN TC-1"
  },
  {
    "id": 37680,
    "english": "CRIN TC-3",
    "indonesian": "CRIN TC-3"
  },
  {
    "id": 37681,
    "english": "CRIN TC-5",
    "indonesian": "CRIN TC-5"
  },
  {
    "id": 37682,
    "english": "BH 1146",
    "indonesian": "BH 1146"
  },
  {
    "id": 37683,
    "english": "Esmeralda 86",
    "indonesian": "Esmeralda 86"
  },
  {
    "id": 37684,
    "english": "JF 90",
    "indonesian": "JF 90"
  },
  {
    "id": 37685,
    "english": "BR 18 Terena",
    "indonesian": "BR 18 Terena"
  },
  {
    "id": 37686,
    "english": "Itasca",
    "indonesian": "Itasca"
  },
  {
    "id": 37687,
    "english": "Bottinia II",
    "indonesian": "Bottinia II"
  },
  {
    "id": 37688,
    "english": "Winnetou",
    "indonesian": "Winnetou"
  },
  {
    "id": 37689,
    "english": "AmeriStand 201T",
    "indonesian": "AmeriStand 201T"
  },
  {
    "id": 37690,
    "english": "AmeriStand 435TQ RR",
    "indonesian": "AmeriStand 435TQ RR"
  },
  {
    "id": 37691,
    "english": "AmeriStand 318TQ",
    "indonesian": "AmeriStand 318TQ"
  },
  {
    "id": 37692,
    "english": "AmeriStand 419LH Brand",
    "indonesian": "AmeriStand 419LH Brand"
  },
  {
    "id": 37693,
    "english": "AmeriStand 420LH RR Brand",
    "indonesian": "AmeriStand 420LH RR Brand"
  },
  {
    "id": 37694,
    "english": "AmeriStand 480 HVXRR",
    "indonesian": "AmeriStand 480 HVXRR"
  },
  {
    "id": 37695,
    "english": "AmeriStand 481 HVXRR",
    "indonesian": "AmeriStand 481 HVXRR"
  },
  {
    "id": 37696,
    "english": "AmeriStand 445NT",
    "indonesian": "AmeriStand 445NT"
  },
  {
    "id": 37697,
    "english": "AmeriStand 457TQ RR",
    "indonesian": "AmeriStand 457TQ RR"
  },
  {
    "id": 37698,
    "english": "AmeriStand 415NT RR",
    "indonesian": "AmeriStand 415NT RR"
  },
  {
    "id": 37699,
    "english": "AmeriStand 416NT RR",
    "indonesian": "AmeriStand 416NT RR"
  },
  {
    "id": 37700,
    "english": "AmeriStand 427TQ",
    "indonesian": "AmeriStand 427TQ"
  },
  {
    "id": 37701,
    "english": "AmeriStand 446NT",
    "indonesian": "AmeriStand 446NT"
  },
  {
    "id": 37702,
    "english": "AmeriStand 428TQ",
    "indonesian": "AmeriStand 428TQ"
  },
  {
    "id": 37703,
    "english": "AmeriStand 455TQ RR",
    "indonesian": "AmeriStand 455TQ RR"
  },
  {
    "id": 37704,
    "english": "AmeriStand 518NT",
    "indonesian": "AmeriStand 518NT"
  },
  {
    "id": 37705,
    "english": "KP4",
    "indonesian": "KP4"
  },
  {
    "id": 37706,
    "english": "KG2",
    "indonesian": "KG2"
  },
  {
    "id": 37707,
    "english": "TV1",
    "indonesian": "TV1"
  },
  {
    "id": 37708,
    "english": "TV14",
    "indonesian": "TV14"
  },
  {
    "id": 37709,
    "english": "TV16",
    "indonesian": "TV16"
  },
  {
    "id": 37710,
    "english": "TV17",
    "indonesian": "TV17"
  },
  {
    "id": 37711,
    "english": "TV20",
    "indonesian": "TV20"
  },
  {
    "id": 37712,
    "english": "TV22",
    "indonesian": "TV22"
  },
  {
    "id": 37713,
    "english": "UPASI 9  (Arthrey)",
    "indonesian": "UPASI 9 (Arthrey)"
  },
  {
    "id": 37714,
    "english": "UPASI 1 (Ever green)",
    "indonesian": "UPASI 1 (Ever green)"
  },
  {
    "id": 37715,
    "english": "UPASI 10 (Pandian)",
    "indonesian": "UPASI 10 (Pandian)"
  },
  {
    "id": 37716,
    "english": "UPASI 14 (Singara)",
    "indonesian": "UPASI 14 (Singara)"
  },
  {
    "id": 37717,
    "english": "UPASI 2 (Jayaram)",
    "indonesian": "UPASI 2 (Jayaram)"
  },
  {
    "id": 37718,
    "english": "UPASI 17 (Swarna)",
    "indonesian": "UPASI 17 (Swarna)"
  },
  {
    "id": 37719,
    "english": "UPASI 24",
    "indonesian": "UPASI 24"
  },
  {
    "id": 37720,
    "english": "UPASI 25",
    "indonesian": "UPASI 25"
  },
  {
    "id": 37721,
    "english": "UPASI 16",
    "indonesian": "UPASI 16"
  },
  {
    "id": 37722,
    "english": "UPASI 27",
    "indonesian": "UPASI 27"
  },
  {
    "id": 37723,
    "english": "UPASI 28 (UPASI 10 * TRI2025)",
    "indonesian": "UPASI 28 (UPASI 10 * TRI2025)"
  },
  {
    "id": 37724,
    "english": "Cheyenne e448",
    "indonesian": "Cheyenne e448"
  },
  {
    "id": 37725,
    "english": "Gs 12",
    "indonesian": "Gs 12"
  },
  {
    "id": 37726,
    "english": "Nairouz (th 99806)",
    "indonesian": "Nairouz (th 99806)"
  },
  {
    "id": 37727,
    "english": "Tomaland (th 01308)",
    "indonesian": "Tomaland (th 01308)"
  },
  {
    "id": 37728,
    "english": "Tyrmes",
    "indonesian": "Tyrmes"
  },
  {
    "id": 37729,
    "english": "S.209",
    "indonesian": "S.209"
  },
  {
    "id": 37730,
    "english": "Ppp.1-2",
    "indonesian": "Ppp.1-2"
  },
  {
    "id": 37731,
    "english": "Roc-1",
    "indonesian": "Roc-1"
  },
  {
    "id": 37732,
    "english": "Ss33",
    "indonesian": "Ss33"
  },
  {
    "id": 37733,
    "english": "S.q-5",
    "indonesian": "S.q-5"
  },
  {
    "id": 37734,
    "english": "Pet-8",
    "indonesian": "Pet-8"
  },
  {
    "id": 37735,
    "english": "End-1",
    "indonesian": "End-1"
  },
  {
    "id": 37736,
    "english": "Eur.2-2",
    "indonesian": "Eur.2-2"
  },
  {
    "id": 37737,
    "english": "Vf-145",
    "indonesian": "Vf-145"
  },
  {
    "id": 37738,
    "english": "Ucx-281",
    "indonesian": "Ucx-281"
  },
  {
    "id": 37739,
    "english": "Bhn 589 (v ff t)*",
    "indonesian": "Bhn 589 (v ff t)*"
  },
  {
    "id": 37740,
    "english": "Celebrity (v ff n t a st)",
    "indonesian": "Celebrity (v ff n t a st)"
  },
  {
    "id": 37741,
    "english": "Albar ( 57 ) 12 and acrain",
    "indonesian": "Albar ( 57 ) 12 dan acrain"
  },
  {
    "id": 37742,
    "english": "Hamid ( bb - 82)",
    "indonesian": "Hamid ( bb - 82)"
  },
  {
    "id": 37743,
    "english": "Knight ( bb - 90)",
    "indonesian": "Knight ( bb - 90)"
  },
  {
    "id": 37744,
    "english": "Bgrr y guaraní inta bgrr",
    "indonesian": "Bgrr y guaraní inta bgrr"
  },
  {
    "id": 37745,
    "english": "Pora 3 inta bgrr",
    "indonesian": "Pora 3 inta bgrr"
  },
  {
    "id": 37746,
    "english": "Guazuncho 4 inta bgrr",
    "indonesian": "Guazuncho 4 inta bgrr"
  },
  {
    "id": 37747,
    "english": "Guazuncho 2000 rr",
    "indonesian": "Guazuncho 2000 rr"
  },
  {
    "id": 37748,
    "english": "Dp402 bgrr",
    "indonesian": "Dp402 bgrr"
  },
  {
    "id": 37749,
    "english": "Dp1238 bgrr",
    "indonesian": "Dp1238 bgrr"
  },
  {
    "id": 37750,
    "english": "Siokra l23",
    "indonesian": "Siokra l23"
  },
  {
    "id": 37751,
    "english": "Siokra v-16",
    "indonesian": "Siokra v-16"
  },
  {
    "id": 37752,
    "english": "Sicala v-2",
    "indonesian": "Sicala v-2"
  },
  {
    "id": 37753,
    "english": "Cs50",
    "indonesian": "Cs50"
  },
  {
    "id": 37754,
    "english": "Sicot 189",
    "indonesian": "Sicot 189"
  },
  {
    "id": 37755,
    "english": "Sicot f-1",
    "indonesian": "Sicot f-1"
  },
  {
    "id": 37756,
    "english": "Cnpa ita 90",
    "indonesian": "Cnpa ita 90"
  },
  {
    "id": 37757,
    "english": "Brs ita 96",
    "indonesian": "Brs ita 96"
  },
  {
    "id": 37758,
    "english": "Cnpa ita 97",
    "indonesian": "Cnpa ita 97"
  },
  {
    "id": 37759,
    "english": "Brs antares",
    "indonesian": "Brs antares"
  },
  {
    "id": 37760,
    "english": "Brs 286",
    "indonesian": "Brs 286"
  },
  {
    "id": 37761,
    "english": "Brs ita⁄ba",
    "indonesian": "Brs ita⁄ba"
  },
  {
    "id": 37762,
    "english": "Brs sucupira",
    "indonesian": "Brs sucupira"
  },
  {
    "id": 37763,
    "english": "Dp 1646 b2xf",
    "indonesian": "Dp 1646 b2xf"
  },
  {
    "id": 37764,
    "english": "Dp 1840 b3xf",
    "indonesian": "Dp 1840 b3xf"
  },
  {
    "id": 37765,
    "english": "Dp 1820 b3xf",
    "indonesian": "Dp 1820 b3xf"
  },
  {
    "id": 37766,
    "english": "Dp 1845 b3xf",
    "indonesian": "Dp 1845 b3xf"
  },
  {
    "id": 37767,
    "english": "Ng 5711 b3xf",
    "indonesian": "Ng 5711 b3xf"
  },
  {
    "id": 37768,
    "english": "Ng 3406 b2xf",
    "indonesian": "Ng 3406 b2xf"
  },
  {
    "id": 37769,
    "english": "Ng 4545 b2xf",
    "indonesian": "Ng 4545 b2xf"
  },
  {
    "id": 37770,
    "english": "Ng 4936",
    "indonesian": "Ng 4936"
  },
  {
    "id": 37771,
    "english": "B3xf",
    "indonesian": "B3xf"
  },
  {
    "id": 37772,
    "english": "Phy 400",
    "indonesian": "Phy 400"
  },
  {
    "id": 37773,
    "english": "Phy 444 wrf",
    "indonesian": "Phy 444 wrf"
  },
  {
    "id": 37774,
    "english": "Phy 480 w3fe",
    "indonesian": "Phy 480 w3fe"
  },
  {
    "id": 37775,
    "english": "Phy 350 w3fe",
    "indonesian": "Phy 350 w3fe"
  },
  {
    "id": 37776,
    "english": "W3fe",
    "indonesian": "W3fe"
  },
  {
    "id": 37777,
    "english": "Lh 900",
    "indonesian": "Lh 900"
  },
  {
    "id": 37778,
    "english": "F414",
    "indonesian": "F414"
  },
  {
    "id": 37779,
    "english": "F 505",
    "indonesian": "F 505"
  },
  {
    "id": 37780,
    "english": "H 777",
    "indonesian": "H 777"
  },
  {
    "id": 37781,
    "english": "RS–810",
    "indonesian": "RS–810"
  },
  {
    "id": 37782,
    "english": "G-cot –12",
    "indonesian": "G-cot –12"
  },
  {
    "id": 37783,
    "english": "MCU– 5VT",
    "indonesian": "MCU– 5VT"
  },
  {
    "id": 37784,
    "english": "LK–861",
    "indonesian": "LK–861"
  },
  {
    "id": 37785,
    "english": "IHCAFE-90",
    "indonesian": "IHCAFE-90"
  },
  {
    "id": 37786,
    "english": "S-541",
    "indonesian": "S-541"
  },
  {
    "id": 37787,
    "english": "S-200",
    "indonesian": "S-200"
  },
  {
    "id": 37788,
    "english": "S-400",
    "indonesian": "S-400"
  },
  {
    "id": 37789,
    "english": "LBGB-77",
    "indonesian": "LBGB-77"
  },
  {
    "id": 37790,
    "english": "RIO DULCE INTA",
    "indonesian": "RIO DULCE INTA"
  },
  {
    "id": 37791,
    "english": "IPORA GUAZU",
    "indonesian": "IPORA GUAZU"
  },
  {
    "id": 37792,
    "english": "LBH-8-INTA",
    "indonesian": "LBH-8-INTA"
  },
  {
    "id": 37793,
    "english": "LB-66-INTA",
    "indonesian": "LB-66-INTA"
  },
  {
    "id": 37794,
    "english": "S-208",
    "indonesian": "S-208"
  },
  {
    "id": 37795,
    "english": "C/W 4440",
    "indonesian": "C/W 4440"
  },
  {
    "id": 37796,
    "english": "S-317",
    "indonesian": "S-317"
  },
  {
    "id": 37797,
    "english": "Mt.3697",
    "indonesian": "Mt.3697"
  },
  {
    "id": 37798,
    "english": "Cabai gendot",
    "indonesian": "Cabai gendot"
  },
  {
    "id": 37799,
    "english": "cabai katokkon",
    "indonesian": "cabai katokkon"
  },
  {
    "id": 37800,
    "english": "cabai domba",
    "indonesian": "cabai domba"
  },
  {
    "id": 37801,
    "english": "cabai hiyung",
    "indonesian": "cabai hiyung"
  },
  {
    "id": 37802,
    "english": "lampung",
    "indonesian": "lampung"
  },
  {
    "id": 37803,
    "english": "jalapeno",
    "indonesian": "jalapeno"
  },
  {
    "id": 37804,
    "english": "co1",
    "indonesian": "co1"
  },
  {
    "id": 37805,
    "english": "k1",
    "indonesian": "k1"
  },
  {
    "id": 37806,
    "english": "hindupur-s7",
    "indonesian": "hindupur-s7"
  },
  {
    "id": 37807,
    "english": "tadappally",
    "indonesian": "tadappally"
  },
  {
    "id": 37808,
    "english": "sattur-s4",
    "indonesian": "sattur-s4"
  },
  {
    "id": 37809,
    "english": "Batavia lettuce",
    "indonesian": "selada Batavia"
  },
  {
    "id": 37810,
    "english": "pisang",
    "indonesian": "pisang"
  },
  {
    "id": 37811,
    "english": "RB867515",
    "indonesian": "RB867515"
  },
  {
    "id": 37812,
    "english": "RB966928",
    "indonesian": "RB966928"
  },
  {
    "id": 37813,
    "english": "SP81-3250",
    "indonesian": "SP81-3250"
  },
  {
    "id": 37814,
    "english": "Yellow Queen F1",
    "indonesian": "Kuning Ratu F1"
  },
  {
    "id": 37815,
    "english": "N-2-4-1",
    "indonesian": "N-2-4-1"
  },
  {
    "id": 37816,
    "english": "S-148",
    "indonesian": "S-148"
  },
  {
    "id": 37817,
    "english": "PHB 2884",
    "indonesian": "PHB 2884"
  },
  {
    "id": 37818,
    "english": "PHB 2168",
    "indonesian": "PHB 2168"
  },
  {
    "id": 37819,
    "english": "PSB 164",
    "indonesian": "PSB 164"
  },
  {
    "id": 37820,
    "english": "PCB 164",
    "indonesian": "PCB 164"
  },
  {
    "id": 37821,
    "english": "Stamina gt5",
    "indonesian": "Stamina gt5"
  },
  {
    "id": 37822,
    "english": "titan7",
    "indonesian": "titan7"
  },
  {
    "id": 37823,
    "english": "303/557 clone",
    "indonesian": "klon 303/557"
  },
  {
    "id": 37824,
    "english": "11/4 clone",
    "indonesian": "klon 11/4"
  },
  {
    "id": 37825,
    "english": "108/82 clone",
    "indonesian": "klon 108/82"
  },
  {
    "id": 37826,
    "english": "7/9 clone",
    "indonesian": "klon 7/9"
  },
  {
    "id": 37827,
    "english": "100/5 clone",
    "indonesian": "klon 100/5"
  },
  {
    "id": 37828,
    "english": "31/8 clone",
    "indonesian": "klon 31/8"
  },
  {
    "id": 37829,
    "english": "12/19 clone",
    "indonesian": "klon 12/19"
  },
  {
    "id": 37830,
    "english": "12/12 clone",
    "indonesian": "klon 12/12"
  },
  {
    "id": 37831,
    "english": "6/8 clone",
    "indonesian": "klon 6/8"
  },
  {
    "id": 37832,
    "english": "6/10 clone",
    "indonesian": "klon 6/10"
  },
  {
    "id": 37833,
    "english": "31/11 clone",
    "indonesian": "klon 31/11"
  },
  {
    "id": 37834,
    "english": "Nyelungkup",
    "indonesian": "Nyelungkup"
  },
  {
    "id": 37835,
    "english": "PAU Baramasi",
    "indonesian": "PAU Baramasi"
  },
  {
    "id": 37837,
    "english": "Tillering stage",
    "indonesian": "Tahap anakan"
  },
  {
    "id": 37838,
    "english": "Stem elongation",
    "indonesian": "Pemanjangan batang"
  },
  {
    "id": 37839,
    "english": "Panicle initiation",
    "indonesian": "Inisiasi malai"
  },
  {
    "id": 37840,
    "english": "Booting stage",
    "indonesian": "Tahap booting"
  },
  {
    "id": 37841,
    "english": "Flowering stage",
    "indonesian": "Tahap berbunga"
  },
  {
    "id": 37842,
    "english": "Milking stage",
    "indonesian": "Tahap pemerahan"
  },
  {
    "id": 37843,
    "english": "Dough stage",
    "indonesian": "Tahap adonan"
  },
  {
    "id": 37844,
    "english": "Mature stage",
    "indonesian": "Tahap matang"
  },
  {
    "id": 37845,
    "english": "Ramsai",
    "indonesian": "Ramsai"
  },
  {
    "id": 37846,
    "english": "Golsai",
    "indonesian": "Golsai"
  },
  {
    "id": 37847,
    "english": "Chibesai",
    "indonesian": "Chibesai"
  },
  {
    "id": 37848,
    "english": "Saune",
    "indonesian": "Saune"
  },
  {
    "id": 37849,
    "english": "Bharlange",
    "indonesian": "Bharlange"
  },
  {
    "id": 37850,
    "english": "Jirmale",
    "indonesian": "Jirmale"
  },
  {
    "id": 37851,
    "english": "Dambersi",
    "indonesian": "Dambersi"
  },
  {
    "id": 37852,
    "english": "Ramala",
    "indonesian": "Ramala"
  },
  {
    "id": 37853,
    "english": "TV 23",
    "indonesian": "TV 23"
  },
  {
    "id": 37854,
    "english": "UPASI 9  (Arthrey)",
    "indonesian": "UPASI 9  (Arthrey)"
  },
  {
    "id": 37855,
    "english": "UPASI 1 (Ever green)",
    "indonesian": "UPASI 1 (Ever green)"
  },
  {
    "id": 37856,
    "english": "UPASI 10 (Pandian)",
    "indonesian": "UPASI 10 (Pandian)"
  },
  {
    "id": 37857,
    "english": "UPASI 14 (Singara)",
    "indonesian": "UPASI 14 (Singara)"
  },
  {
    "id": 37858,
    "english": "UPASI 2 (Jayaram)",
    "indonesian": "UPASI 2 (Jayaram)"
  },
  {
    "id": 37859,
    "english": "UPASI 17 (Swarna)",
    "indonesian": "UPASI 17 (Swarna)"
  },
  {
    "id": 37860,
    "english": "Masuli",
    "indonesian": "Masuli"
  },
  {
    "id": 37861,
    "english": "Khumal 4",
    "indonesian": "Khumal 4"
  },
  {
    "id": 37862,
    "english": "Ram",
    "indonesian": "Ram"
  },
  {
    "id": 37863,
    "english": "Khumal 8",
    "indonesian": "Khumal 8"
  },
  {
    "id": 37864,
    "english": "Chhommrong",
    "indonesian": "Chhommrong"
  },
  {
    "id": 37865,
    "english": "Lekali Dhan 3",
    "indonesian": "Lekali Dhan 3"
  },
  {
    "id": 37866,
    "english": "Radha 4",
    "indonesian": "Radha 4"
  },
  {
    "id": 37867,
    "english": "Janaki",
    "indonesian": "Janaki"
  },
  {
    "id": 37868,
    "english": "Judi",
    "indonesian": "Judi"
  },
  {
    "id": 37869,
    "english": "Sarju 52",
    "indonesian": "Sarju 52"
  },
  {
    "id": 37870,
    "english": "Kufri jyoti",
    "indonesian": "Kufri jyoti"
  },
  {
    "id": 37871,
    "english": "Kufri sindhuri",
    "indonesian": "Kufri sindhuri"
  },
  {
    "id": 37872,
    "english": "Khumal Upahar",
    "indonesian": "Khumal Upahar"
  },
  {
    "id": 37873,
    "english": "Jankdev",
    "indonesian": "Jankdev"
  },
  {
    "id": 37874,
    "english": "Khumal Seto-1",
    "indonesian": "Khumal Seto-1"
  },
  {
    "id": 37875,
    "english": "Khumal Bikas",
    "indonesian": "Khumal Bikas"
  },
  {
    "id": 37876,
    "english": "Birendra sagar",
    "indonesian": "Birendra sagar"
  },
  {
    "id": 37877,
    "english": "Palpa",
    "indonesian": "Palpa"
  },
  {
    "id": 37878,
    "english": "Dhankuta ",
    "indonesian": "Dhankuta"
  },
  {
    "id": 37879,
    "english": "Taplejung ",
    "indonesian": "Taplejung"
  },
  {
    "id": 37880,
    "english": "Diktel ",
    "indonesian": "Diktel"
  },
  {
    "id": 37881,
    "english": "Basrai dwarf",
    "indonesian": "Kerdil Basrai"
  },
  {
    "id": 37882,
    "english": "dwarf cavendish",
    "indonesian": "cavendish kerdil"
  },
  {
    "id": 37884,
    "english": "william hybrid",
    "indonesian": "hibrida william"
  },
  {
    "id": 37885,
    "english": "malbhog",
    "indonesian": "malbhog"
  },
  {
    "id": 37886,
    "english": "dhusre",
    "indonesian": "dhusre"
  },
  {
    "id": 37887,
    "english": "mungre",
    "indonesian": "mungre"
  },
  {
    "id": 37888,
    "english": "marche",
    "indonesian": "marche"
  },
  {
    "id": 37889,
    "english": "dhose",
    "indonesian": "dhose"
  },
  {
    "id": 37890,
    "english": "hazari",
    "indonesian": "hazari"
  },
  {
    "id": 37891,
    "english": "Kathmandu local",
    "indonesian": "Lokal Kathmandu"
  },
  {
    "id": 37892,
    "english": "Pahilo Surjo",
    "indonesian": "Pahilo Surjo"
  },
  {
    "id": 37893,
    "english": "SS-72 (Super Shakti 72)",
    "indonesian": "SS-72 (Super Shakti 72)"
  },
  {
    "id": 37894,
    "english": "KFSH-1 (Kanchan F1)",
    "indonesian": "KFSH-1 (Kanchan F1)"
  },
  {
    "id": 37895,
    "english": "Poshilo makai jawa",
    "indonesian": "Poshilo makai jawa"
  },
  {
    "id": 37896,
    "english": "Srijan-1",
    "indonesian": "Srijan-1"
  },
  {
    "id": 37897,
    "english": "Srijan-2",
    "indonesian": "Srijan-2"
  },
  {
    "id": 37898,
    "english": "Srijan-3",
    "indonesian": "Srijan-3"
  },
  {
    "id": 37899,
    "english": "Srijan-4",
    "indonesian": "Srijan-4"
  },
  {
    "id": 37900,
    "english": "Madhuri",
    "indonesian": "Madhuri"
  },
  {
    "id": 37901,
    "english": "Kalyan ",
    "indonesian": "Kalyan"
  },
  {
    "id": 37902,
    "english": "Pratiksha ",
    "indonesian": "Pratiksha"
  },
  {
    "id": 37903,
    "english": "Pratigya",
    "indonesian": "Pratigya"
  },
  {
    "id": 37904,
    "english": "Zinc Gahun 2",
    "indonesian": "Zinc Gahun 2"
  },
  {
    "id": 37905,
    "english": "Bheri-Ganga",
    "indonesian": "Bheri-Ganga"
  },
  {
    "id": 37906,
    "english": "Himganga",
    "indonesian": "Himganga"
  },
  {
    "id": 37907,
    "english": "Khumal-Shakti",
    "indonesian": "Khumal-Shakti"
  },
  {
    "id": 37908,
    "english": "Borlaug 2020",
    "indonesian": "Borlaug 2020"
  },
  {
    "id": 37909,
    "english": "Pusa Ruby",
    "indonesian": "Pusa Ruby"
  },
  {
    "id": 37910,
    "english": "Arka Abha:",
    "indonesian": "Arka Abha"
  },
  {
    "id": 37911,
    "english": "Srijana",
    "indonesian": "Srijana"
  },
  {
    "id": 37912,
    "english": "Roma VF",
    "indonesian": "Roma VF"
  },
  {
    "id": 37913,
    "english": "Nepali Oxheart",
    "indonesian": "Nepali Oxheart"
  },
  {
    "id": 37914,
    "english": "Lisbon",
    "indonesian": "Lisbon"
  },
  {
    "id": 37915,
    "english": "Nepali Round",
    "indonesian": "Nepali Round"
  },
  {
    "id": 37916,
    "english": "Nibuwa",
    "indonesian": "Nibuwa"
  },
  {
    "id": 37917,
    "english": "Eureka",
    "indonesian": "Eureka"
  },
  {
    "id": 37918,
    "english": "Citron",
    "indonesian": "Citron"
  },
  {
    "id": 37919,
    "english": "Jhambiri (rough lemon)",
    "indonesian": "Jhambiri (jeruk nipis kasar)"
  },
  {
    "id": 37920,
    "english": "Nepali oblong",
    "indonesian": "Nepali oblong"
  },
  {
    "id": 37921,
    "english": "Nepal",
    "indonesian": "Nepal"
  },
  {
    "id": 37922,
    "english": "India",
    "indonesian": "India"
  },
  {
    "id": 37923,
    "english": "Soil and Climatic Requirements",
    "indonesian": "Persyaratan Tanah dan Iklim"
  },
  {
    "id": 37924,
    "english": "Hadi ( okra - leaf barakat )",
    "indonesian": "Hadi (okra - daun barakat)"
  },
  {
    "id": 37925,
    "english": "Khandwa-2",
    "indonesian": "Khandwa-2"
  },
  {
    "id": 37926,
    "english": "Badnawar-1",
    "indonesian": "Badnawar-1"
  },
  {
    "id": 37927,
    "english": "Rs-810",
    "indonesian": "Rs-810"
  },
  {
    "id": 37928,
    "english": "G-cot -12",
    "indonesian": "G-cot -12"
  },
  {
    "id": 37929,
    "english": "Mcu- 5vt",
    "indonesian": "Mcu- 5vt"
  },
  {
    "id": 37930,
    "english": "Lk-861",
    "indonesian": "Lk-861"
  },
  {
    "id": 37931,
    "english": "TV 1",
    "indonesian": "TV 1"
  },
  {
    "id": 37932,
    "english": "Kopati 1",
    "indonesian": "Kopati 1"
  },
  {
    "id": 37933,
    "english": "C x R",
    "indonesian": "C x R"
  },
  {
    "id": 37934,
    "english": "Bourbon/ moka",
    "indonesian": "Bourbon/ moka"
  },
  {
    "id": 37935,
    "english": "karpoora poovan",
    "indonesian": "karpoora poovan"
  },
  {
    "id": 37936,
    "english": "Basrai",
    "indonesian": "Basrai"
  },
  {
    "id": 37937,
    "english": "Singapuri",
    "indonesian": "Singapuri"
  },
  {
    "id": 37938,
    "english": "Chakrakeli",
    "indonesian": "Chakrakeli"
  },
  {
    "id": 37939,
    "english": "Mundo Nova (Silang Typica-Bourbon from Brazil)",
    "indonesian": "Mundo Nova (Silang Typica-Bourbon dari Brasil)"
  },
  {
    "id": 37940,
    "english": "Catimor Lines (Andungsari Ateng Jaluk Kartika/Catuai/Katai - mix breed arabica-robusta).",
    "indonesian": "Catimor Lines (Andungsari Ateng Jaluk Kartika/Catuai/Katai - campuran arabika-robusta)"
  },
  {
    "id": 37941,
    "english": "Maran",
    "indonesian": "Maran"
  },
  {
    "id": 37942,
    "english": "Nadia",
    "indonesian": "Nadia"
  },
  {
    "id": 37943,
    "english": "Karakkal",
    "indonesian": "Karakkal"
  },
  {
    "id": 37944,
    "english": "Ernad Chernad",
    "indonesian": "Ernad Chernad"
  },
  {
    "id": 37945,
    "english": "China",
    "indonesian": "China"
  },
  {
    "id": 37946,
    "english": "Rio-De-Janeiro",
    "indonesian": "Rio-De-Janeiro"
  },
  {
    "id": 37947,
    "english": "Sleeva Local",
    "indonesian": "Sleeva Local"
  },
  {
    "id": 37948,
    "english": "Narasapattam",
    "indonesian": "Narasapattam"
  },
  {
    "id": 37949,
    "english": "Varadha",
    "indonesian": "Varadha"
  },
  {
    "id": 37950,
    "english": "Himachal",
    "indonesian": "Himachal"
  },
  {
    "id": 37951,
    "english": "IISR",
    "indonesian": "IISR"
  },
  {
    "id": 37952,
    "english": "Dusehri",
    "indonesian": "Dusehri"
  },
  {
    "id": 37953,
    "english": "Alphanso",
    "indonesian": "Alphanso"
  },
  {
    "id": 37954,
    "english": "LANGRA",
    "indonesian": "LANGRA"
  },
  {
    "id": 37955,
    "english": "Amarpali",
    "indonesian": "Amarpali"
  },
  {
    "id": 37956,
    "english": "Mallika",
    "indonesian": "Mallika"
  },
  {
    "id": 37957,
    "english": "Bombay green",
    "indonesian": "Bombay hijau"
  },
  {
    "id": 37958,
    "english": "Fazli",
    "indonesian": "Fazli"
  },
  {
    "id": 37959,
    "english": "Samarbehisht  Chausa",
    "indonesian": "Samarbehisht Chausa"
  },
  {
    "id": 37960,
    "english": "Neelam",
    "indonesian": "Neelam"
  },
  {
    "id": 37961,
    "english": "Sindhu",
    "indonesian": "Sindhu"
  },
  {
    "id": 37962,
    "english": "Arka aruna",
    "indonesian": "Arka aruna"
  },
  {
    "id": 37963,
    "english": "Arka Puneet",
    "indonesian": "Arka Puneet"
  },
  {
    "id": 37964,
    "english": "Early kunwar",
    "indonesian": "Early kunwar"
  },
  {
    "id": 37965,
    "english": "Early Synthetic",
    "indonesian": "Early Synthetic"
  },
  {
    "id": 37966,
    "english": "Pusa Katki",
    "indonesian": "Pusa Katki"
  },
  {
    "id": 37967,
    "english": "Pant Gobhi-2",
    "indonesian": "Pant Gobhi-2"
  },
  {
    "id": 37968,
    "english": "Pant Gobhi-3",
    "indonesian": "Pant Gobhi-3"
  },
  {
    "id": 37969,
    "english": "Pusa Synthetic",
    "indonesian": "Pusa Synthetic"
  },
  {
    "id": 37970,
    "english": "Pant Shubhra",
    "indonesian": "Pant Shubhra"
  },
  {
    "id": 37971,
    "english": "Punjab Giant-26",
    "indonesian": "Punjab Giant-26"
  },
  {
    "id": 37972,
    "english": "Pusa Snowball-1",
    "indonesian": "Pusa Snowball-1"
  },
  {
    "id": 37973,
    "english": "Pusa Snowball-2",
    "indonesian": "Pusa Snowball-2"
  },
  {
    "id": 37974,
    "english": "Sonwball-16",
    "indonesian": "Sonwball-16"
  },
  {
    "id": 37975,
    "english": "Dania Kalimpong",
    "indonesian": "Dania Kalimpong"
  },
  {
    "id": 37976,
    "english": "BUCK MAXIFLOR",
    "indonesian": "BUCK MAXIFLOR"
  },
  {
    "id": 37977,
    "english": "SURSEM ORION",
    "indonesian": "SURSEM ORION"
  },
  {
    "id": 37978,
    "english": "Light Speckled Kidney Bean",
    "indonesian": "Kacang Merah Berbintik Ringan"
  },
  {
    "id": 37979,
    "english": "Dark Red Kidney Bean",
    "indonesian": "Kacang Merah Berbintik Merah Gelap"
  },
  {
    "id": 37980,
    "english": "Pink Kidney Bean",
    "indonesian": "Kacang Merah Berbintik Pink"
  },
  {
    "id": 37981,
    "english": "Yellow Kidney Beans",
    "indonesian": "Kacang Merah Kuning"
  },
  {
    "id": 37982,
    "english": "Malviya - 137",
    "indonesian": "Malviya - 137"
  },
  {
    "id": 37983,
    "english": "Arun",
    "indonesian": "Arun"
  },
  {
    "id": 37984,
    "english": "VL Rajma 125",
    "indonesian": "VL Rajma 125"
  },
  {
    "id": 37985,
    "english": "Arka Komal",
    "indonesian": "Arka Komal"
  },
  {
    "id": 37986,
    "english": "Ooty-1",
    "indonesian": "Ooty-1"
  },
  {
    "id": 37987,
    "english": "Pusa Himalatha",
    "indonesian": "Pusa Himalatha"
  },
  {
    "id": 37988,
    "english": "Pusa Parvati",
    "indonesian": "Pusa Parvati"
  },
  {
    "id": 37989,
    "english": "Phule Surekha",
    "indonesian": "Phule Surekha"
  },
  {
    "id": 37990,
    "english": "Pusa majesty",
    "indonesian": "Pusa majesty"
  },
  {
    "id": 37991,
    "english": "Pusa giant",
    "indonesian": "Pusa giant"
  },
  {
    "id": 37992,
    "english": "Pusa delcious",
    "indonesian": "Pusa delcious"
  },
  {
    "id": 37993,
    "english": "Pusa drawf",
    "indonesian": "Pusa drawf"
  },
  {
    "id": 37994,
    "english": "Coorg honey",
    "indonesian": "Coorg honey"
  },
  {
    "id": 37995,
    "english": "Honey dew",
    "indonesian": "Honey dew"
  },
  {
    "id": 37996,
    "english": "Golden queen",
    "indonesian": "Golden queen"
  },
  {
    "id": 37997,
    "english": "Amasya beyazı",
    "indonesian": "Amasya beyazı"
  },
  {
    "id": 37998,
    "english": "Antep karası",
    "indonesian": "Antep karası"
  },
  {
    "id": 37999,
    "english": "Bahceli karas",
    "indonesian": "Bahceli karas"
  },
  {
    "id": 38000,
    "english": "Cavus",
    "indonesian": "Cavus"
  },
  {
    "id": 38001,
    "english": "Cevsen",
    "indonesian": "Cevsen"
  },
  {
    "id": 38002,
    "english": "Crimson",
    "indonesian": "Crimson"
  },
  {
    "id": 38003,
    "english": "Dimrit",
    "indonesian": "Dimrit"
  },
  {
    "id": 38004,
    "english": "Hafizali",
    "indonesian": "Hafizali"
  },
  {
    "id": 38005,
    "english": "Karasabi",
    "indonesian": "Karasabi"
  },
  {
    "id": 38006,
    "english": "Yamuna Safed-2",
    "indonesian": "Yamuna Safed-2"
  },
  {
    "id": 38007,
    "english": "Bhima Omkar",
    "indonesian": "Bhima Omkar"
  },
  {
    "id": 38008,
    "english": "Godavari",
    "indonesian": "Godavari"
  },
  {
    "id": 38009,
    "english": "Baswant",
    "indonesian": "Baswant"
  },
  {
    "id": 38010,
    "english": "Lahsun 2",
    "indonesian": "Lahsun 2"
  },
  {
    "id": 38011,
    "english": "Eva",
    "indonesian": "Eva"
  },
  {
    "id": 38012,
    "english": "Gala",
    "indonesian": "Gala"
  },
  {
    "id": 38013,
    "english": "Fuji",
    "indonesian": "Fuji"
  },
  {
    "id": 38014,
    "english": "Honeycrisp",
    "indonesian": "Honeycrisp"
  },
  {
    "id": 38015,
    "english": "Red Delicious",
    "indonesian": "Red Delicious"
  },
  {
    "id": 38016,
    "english": "Vitoria",
    "indonesian": "Vitoria"
  },
  {
    "id": 38017,
    "english": "Timpson",
    "indonesian": "Timpson"
  },
  {
    "id": 38018,
    "english": "Red globe",
    "indonesian": "Red globe"
  },
  {
    "id": 38019,
    "english": "Italia",
    "indonesian": "Italia"
  },
  {
    "id": 38020,
    "english": "Thampson",
    "indonesian": "Thampson"
  },
  {
    "id": 38021,
    "english": "Crimson red",
    "indonesian": "Crimson red"
  },
  {
    "id": 38022,
    "english": "Zinc Gahun 1",
    "indonesian": "Zinc Gahun 1"
  },
  {
    "id": 38023,
    "english": "Ghaiya-3",
    "indonesian": "Ghaiya-3"
  },
  {
    "id": 38024,
    "english": "Hardinath-4",
    "indonesian": "Hardinath-4"
  },
  {
    "id": 38025,
    "english": "Hardinath-5",
    "indonesian": "Hardinath-5"
  },
  {
    "id": 38026,
    "english": "Hardinath-6",
    "indonesian": "Hardinath-6"
  },
  {
    "id": 38027,
    "english": "Khumal Basmati-16",
    "indonesian": "Khumal Basmati-16"
  },
  {
    "id": 38028,
    "english": "Ganga Sagar-1",
    "indonesian": "Ganga Sagar-1"
  },
  {
    "id": 38029,
    "english": "Ganga Sagar-2",
    "indonesian": "Ganga Sagar-2"
  },
  {
    "id": 38030,
    "english": "Cardinal",
    "indonesian": "Cardinal"
  },
  {
    "id": 38031,
    "english": "Khumal Ujjwol",
    "indonesian": "Khumal Ujjwol"
  },
  {
    "id": 38032,
    "english": "Bajhang local",
    "indonesian": "Bajhang local"
  },
  {
    "id": 38033,
    "english": "Kalyan",
    "indonesian": "Kalyan"
  },
  {
    "id": 38034,
    "english": "Pratiksha",
    "indonesian": "Pratiksha"
  },
  {
    "id": 38035,
    "english": "Dhankuta",
    "indonesian": "Dhankuta"
  },
  {
    "id": 38036,
    "english": "Taplejung",
    "indonesian": "Taplejung"
  },
  {
    "id": 38037,
    "english": "Diktel",
    "indonesian": "Diktel"
  },
  {
    "id": 38038,
    "english": "Navel orange",
    "indonesian": "Navel orange"
  },
  {
    "id": 38039,
    "english": "Blood orange",
    "indonesian": "Blood orange"
  },
  {
    "id": 38040,
    "english": "Tanjerine",
    "indonesian": "Tanjerine"
  },
  {
    "id": 38041,
    "english": "Acid less orange",
    "indonesian": "Jeruk Tanpa Asam"
  },
  {
    "id": 38042,
    "english": "Mandarin",
    "indonesian": "Mandarin"
  },
  {
    "id": 38043,
    "english": "Seville orange",
    "indonesian": "Jeruk Seville"
  },
  {
    "id": 38044,
    "english": "Bahia",
    "indonesian": "Bahia"
  },
  {
    "id": 38045,
    "english": "Patan red",
    "indonesian": "Patan Merah"
  },
  {
    "id": 38046,
    "english": "Nuwakot Local",
    "indonesian": "Lokal Nuwakot"
  },
  {
    "id": 38047,
    "english": "White Globe",
    "indonesian": "Globe Putih"
  },
  {
    "id": 38048,
    "english": "Castillo®",
    "indonesian": "Castillo®"
  },
  {
    "id": 38049,
    "english": "tukdah 246",
    "indonesian": "tukdah 246"
  },
  {
    "id": 38050,
    "english": "CP First",
    "indonesian": "CP Pertama"
  },
  {
    "id": 38051,
    "english": "Tv 14",
    "indonesian": "Tv 14"
  },
  {
    "id": 38052,
    "english": "Bannock Burn 668",
    "indonesian": "Bannock Burn 668"
  },
  {
    "id": 38053,
    "english": "Bannock Burn 777",
    "indonesian": "Bannock Burn 777"
  },
  {
    "id": 38054,
    "english": "TRS1",
    "indonesian": "TRS1"
  },
  {
    "id": 38055,
    "english": "TR14",
    "indonesian": "TR14"
  },
  {
    "id": 38056,
    "english": "TR15",
    "indonesian": "TR15"
  },
  {
    "id": 38057,
    "english": "Matti",
    "indonesian": "Matti"
  },
  {
    "id": 38058,
    "english": "Typica (Bergandal Sidikalang - Sumatera).",
    "indonesian": "Typica (Bergandal Sidikalang - Sumatera)"
  },
  {
    "id": 38059,
    "english": "Hibrido de Timor (HDT Cross breed Arabica-Robusta; Tim-tim Aceh)",
    "indonesian": "Hibrido de Timor (HDT Persilangan Arabika-Robusta; Tim-tim Aceh)"
  },
  {
    "id": 38060,
    "english": "Linie S (S-288 S-795 Andungsari Komasti; Aceh Flores)",
    "indonesian": "Linie S (S-288 S-795 Andungsari Komasti; Aceh Flores)"
  },
  {
    "id": 38061,
    "english": "Ethiopian lines (Rambung Abyssina USDA)",
    "indonesian": "Ethiopian lines (Rambung Abyssina USDA)"
  },
  {
    "id": 38062,
    "english": "Jawa (Java Coffee !700AD)",
    "indonesian": "Jawa (Kopi Jawa 1700 M)"
  },
  {
    "id": 38063,
    "english": "Wynad Local",
    "indonesian": "Lokal Wynad"
  },
  {
    "id": 38064,
    "english": "Punjab Giant-35",
    "indonesian": "Punjab Giant-35"
  },
  {
    "id": 38065,
    "english": "VANDERHAVE VDH 480",
    "indonesian": "VANDERHAVE VDH 480"
  },
  {
    "id": 38066,
    "english": "NIDERA PARADISE 6",
    "indonesian": "NIDERA PARADISE 6"
  },
  {
    "id": 38067,
    "english": "DEKALB DEKASOL 3881",
    "indonesian": "DEKALB DEKASOL 3881"
  },
  {
    "id": 38068,
    "english": "Carioca Kidney Bean (IAC 1850)",
    "indonesian": "Kacang Kidney Carioca (IAC 1850)"
  },
  {
    "id": 38069,
    "english": "P.D.R -14 (Uday)",
    "indonesian": "P.D.R -14 (Uday)"
  },
  {
    "id": 38070,
    "english": "V.L - 63",
    "indonesian": "V.L - 63"
  },
  {
    "id": 38071,
    "english": "Ambar (I.I.P.R -96-4)",
    "indonesian": "Ambar (I.I.P.R -96-4)"
  },
  {
    "id": 38072,
    "english": "Utkarsh (I.I.P.R - 98-5)",
    "indonesian": "Utkarsh (I.I.P.R - 98-5)"
  },
  {
    "id": 38073,
    "english": "RBL 6",
    "indonesian": "RBL 6"
  },
  {
    "id": 38074,
    "english": "YCD1",
    "indonesian": "YCD1"
  },
  {
    "id": 38075,
    "english": "TKD1",
    "indonesian": "TKD1"
  },
  {
    "id": 38076,
    "english": "Pant Anupama* (UPF 191)",
    "indonesian": "Pant Anupama* (UPF 191)"
  },
  {
    "id": 38077,
    "english": "Co2",
    "indonesian": "Co2"
  },
  {
    "id": 38078,
    "english": "Co3",
    "indonesian": "Co3"
  },
  {
    "id": 38079,
    "english": "Co4",
    "indonesian": "Co4"
  },
  {
    "id": 38080,
    "english": "Erenkoy beyazı",
    "indonesian": "Erenkoy beyazı"
  },
  {
    "id": 38081,
    "english": "TSH 565",
    "indonesian": "TSH 565"
  },
  {
    "id": 38082,
    "english": "ICS 95",
    "indonesian": "ICS 95"
  },
  {
    "id": 38083,
    "english": "BMI 67",
    "indonesian": "BMI 67"
  },
  {
    "id": 38084,
    "english": "IMC 67",
    "indonesian": "IMC 67"
  },
  {
    "id": 38085,
    "english": "ICS 1",
    "indonesian": "ICS 1"
  },
  {
    "id": 38086,
    "english": "ICS 6",
    "indonesian": "ICS 6"
  },
  {
    "id": 38087,
    "english": "ICS 39",
    "indonesian": "ICS 39"
  },
  {
    "id": 38088,
    "english": "UF 667",
    "indonesian": "UF 667"
  },
  {
    "id": 38089,
    "english": "PG 18",
    "indonesian": "PG 18"
  },
  {
    "id": 38090,
    "english": "BRS ISIS",
    "indonesian": "BRS ISIS"
  },
  {
    "id": 38091,
    "english": "BRS NUBIA",
    "indonesian": "BRS NUBIA"
  },
  {
    "id": 38092,
    "english": "CSV 21S",
    "indonesian": "CSV 21S"
  },
  {
    "id": 38093,
    "english": "CSV 23R",
    "indonesian": "CSV 23R"
  },
  {
    "id": 38094,
    "english": "NM 92",
    "indonesian": "NM 92"
  },
  {
    "id": 38095,
    "english": "NM 94",
    "indonesian": "NM 94"
  },
  {
    "id": 38096,
    "english": "VC 6372",
    "indonesian": "VC 6372"
  },
  {
    "id": 38097,
    "english": "VC 3960 - 80",
    "indonesian": "VC 3960 - 80"
  },
  {
    "id": 38098,
    "english": "CN9-5",
    "indonesian": "CN9-5"
  },
  {
    "id": 38099,
    "english": "VC6173 B -10",
    "indonesian": "VC6173 B -10"
  },
  {
    "id": 38100,
    "english": "VC1973A",
    "indonesian": "VC1973A"
  },
  {
    "id": 38101,
    "english": "VC6173B-11",
    "indonesian": "VC6173B-11"
  },
  {
    "id": 38102,
    "english": "VC6173A",
    "indonesian": "VC6173A"
  },
  {
    "id": 38103,
    "english": "Wheat (Nepal)",
    "indonesian": "Gandum (Nepal)"
  },
  {
    "id": 38104,
    "english": "Sorghum (Nepal)",
    "indonesian": "Sorgum (Nepal)"
  },
  {
    "id": 38105,
    "english": "Green gram (Nepal)",
    "indonesian": "Kacang hijau (Nepal)"
  },
  {
    "id": 38106,
    "english": "Nutmeg&mace (Nepal)",
    "indonesian": "Pala & bunga pala (Nepal)"
  },
  {
    "id": 38107,
    "english": "Tomato (Nepal)",
    "indonesian": "Tomat (Nepal)"
  },
  {
    "id": 38108,
    "english": "Lemon (Nepal)",
    "indonesian": "Lemon (Nepal)"
  },
  {
    "id": 38109,
    "english": "Onion (Nepal)",
    "indonesian": "Bawang (Nepal)"
  },
  {
    "id": 38110,
    "english": "Banana (Nepal)",
    "indonesian": "Pisang (Nepal)"
  },
  {
    "id": 38111,
    "english": "Pearl millet (Nepal)",
    "indonesian": "Millet mutiara (Nepal)"
  },
  {
    "id": 38112,
    "english": "Ginger (Nepal)",
    "indonesian": "Jahe (Nepal)"
  },
  {
    "id": 38113,
    "english": "Garlic (Nepal)",
    "indonesian": "Bawang putih (Nepal)"
  },
  {
    "id": 38114,
    "english": "Rapeseed (Nepal)",
    "indonesian": "Rapeseed (Nepal)"
  },
  {
    "id": 38115,
    "english": "Start date",
    "indonesian": "Tanggal mulai"
  },
  {
    "id": 38116,
    "english": "End date",
    "indonesian": "Tanggal berakhir"
  },
  {
    "id": 38117,
    "english": "Our recommendation",
    "indonesian": "Rekomendasi kami"
  },
  {
    "id": 38118,
    "english": "Your soil pH",
    "indonesian": "pH tanah Anda"
  },
  {
    "id": 38119,
    "english": "Your soil organic carbon",
    "indonesian": "Karbon organik tanah Anda"
  },
  {
    "id": 38120,
    "english": "Your soil nitrogen",
    "indonesian": "Nitrogen tanah Anda"
  },
  {
    "id": 38121,
    "english": "Your soil phosphorus",
    "indonesian": "Fosfor tanah Anda"
  },
  {
    "id": 38122,
    "english": "Your soil potassium",
    "indonesian": "Kalium tanah Anda"
  },
  {
    "id": 38123,
    "english": "Your soil sulfur",
    "indonesian": "Belerang tanah Anda"
  },
  {
    "id": 38124,
    "english": "Your date of irrigation",
    "indonesian": "Tanggal irigasi Anda"
  },
  {
    "id": 38125,
    "english": "Your water volume",
    "indonesian": "Volume air Anda"
  },
  {
    "id": 38126,
    "english": "Days",
    "indonesian": "Hari"
  },
  {
    "id": 38127,
    "english": "Date",
    "indonesian": "Tanggal"
  },
  {
    "id": 38133,
    "english": "agriculture lime",
    "indonesian": "kapur pertanian"
  },
  {
    "id": 38134,
    "english": "dolomite",
    "indonesian": "dolomit"
  },
  {
    "id": 38135,
    "english": "Sandy loam soil",
    "indonesian": "Tanah lempung berpasir"
  },
  {
    "id": 38136,
    "english": "Clay loam soil",
    "indonesian": "Tanah lempung liat"
  },
  {
    "id": 38137,
    "english": "Silt loam soil",
    "indonesian": "Tanah lempung lanau"
  },
  {
    "id": 38143,
    "english": "Chicken Litter",
    "indonesian": "Kotoran ayam"
  },
  {
    "id": 38145,
    "english": "Manure",
    "indonesian": "Pupuk kandang"
  },
  {
    "id": 38146,
    "english": "dolomite",
    "indonesian": "dolomit"
  },
  {
    "id": 38148,
    "english": "Mango (Brazil)",
    "indonesian": "Mangga (Brazil)"
  },
  {
    "id": 38149,
    "english": "Area Of Request",
    "indonesian": "Area Permintaan"
  },
  {
    "id": 38151,
    "english": "Maize/Corn (Uganda)",
    "indonesian": "Jagung (Uganda)"
  },
  {
    "id": 38152,
    "english": "Sugar cane (Colombia)",
    "indonesian": "Tebu (Kolombia)"
  },
  {
    "id": 38153,
    "english": "Sugar cane (India)",
    "indonesian": "Tebu (India)"
  },
  {
    "id": 38154,
    "english": "sugarcane(brazil)",
    "indonesian": "tebu (Brazil)"
  },
  {
    "id": 38155,
    "english": "Banana(indonesia)",
    "indonesian": "Pisang (Indonesia)"
  },
  {
    "id": 38156,
    "english": "Lettuce(Libya)",
    "indonesian": "Selada (Libya)"
  },
  {
    "id": 38157,
    "english": "Soya (India)",
    "indonesian": "Kedelai (India)"
  },
  {
    "id": 38163,
    "english": "Hydraulic nozzles/sprayers",
    "indonesian": "Nosel/Semprotan Hidraulik"
  },
  {
    "id": 38164,
    "english": "Electrostatically charged sprayers",
    "indonesian": "Semprotan Bermuatan Elektrostatis"
  },
  {
    "id": 38165,
    "english": "Aerial spraying",
    "indonesian": "Penyemprotan Udara"
  },
  {
    "id": 38166,
    "english": "Fumigation",
    "indonesian": "Fumigasi"
  },
  {
    "id": 38167,
    "english": "Days after sowing when pest was detected",
    "indonesian": "Hari setelah penanaman ketika hama terdeteksi"
  },
  {
    "id": 38172,
    "english": "Cultural/Natural",
    "indonesian": "Kultural/Alami"
  },
  {
    "id": 38173,
    "english": "none",
    "indonesian": "tidak ada"
  },
  {
    "id": 38174,
    "english": "Deep ploughing",
    "indonesian": "Bajak Dalam"
  },
  {
    "id": 38175,
    "english": "Natural enemies/parasitism",
    "indonesian": "Musuh Alami/Parasitisme"
  },
  {
    "id": 38176,
    "english": "Push and pull",
    "indonesian": "Dorong dan Tarik"
  },
  {
    "id": 38177,
    "english": "Ash and chilli",
    "indonesian": "Abu dan cabai"
  },
  {
    "id": 38178,
    "english": "Plant extracts",
    "indonesian": "Ekstrak Tanaman"
  },
  {
    "id": 38179,
    "english": "Use of mesh",
    "indonesian": "Penggunaan jaring"
  },
  {
    "id": 38180,
    "english": "Uprooting of infested plants by hand",
    "indonesian": "Pencabutan tanaman yang terserang hama dengan tangan"
  },
  {
    "id": 38181,
    "english": "Traps and bagging",
    "indonesian": "Perangkap dan pembungkusan"
  },
  {
    "id": 38182,
    "english": "Bio pesticides",
    "indonesian": "Pestisida hayati"
  },
  {
    "id": 38183,
    "english": "Bio fumigation",
    "indonesian": "Fumigasi hayati"
  },
  {
    "id": 38184,
    "english": "Scarecrows",
    "indonesian": "Orang-orangan sawah"
  },
  {
    "id": 38185,
    "english": "Tillage",
    "indonesian": "Pengolahan tanah"
  },
  {
    "id": 38186,
    "english": "Pruning",
    "indonesian": "Pemangkasan"
  },
  {
    "id": 38187,
    "english": "Hand picking of pests",
    "indonesian": "Memetik hama dengan tangan"
  },
  {
    "id": 38196,
    "english": "Cultural/Mechanical/Biological",
    "indonesian": "Kultural/Mekanis/Biologis"
  },
  {
    "id": 38197,
    "english": "Remove diseased plant",
    "indonesian": "Menghilangkan tanaman yang sakit"
  },
  {
    "id": 38198,
    "english": "Mulching",
    "indonesian": "Mulsa"
  },
  {
    "id": 38199,
    "english": "Crop rotation",
    "indonesian": "Rotasi tanaman"
  },
  {
    "id": 38200,
    "english": "Planting resistant cultivars",
    "indonesian": "Menanam varietas tahan"
  },
  {
    "id": 38201,
    "english": "Use of oils and soaps",
    "indonesian": "Penggunaan minyak dan sabun"
  },
  {
    "id": 38202,
    "english": "Use of bio fumigants",
    "indonesian": "Penggunaan fumigan hayati"
  },
  {
    "id": 38203,
    "english": "Others",
    "indonesian": "Lainnya"
  },
  {
    "id": 38206,
    "english": "False codling moth",
    "indonesian": "Ngengat codling palsu"
  },
  {
    "id": 38207,
    "english": "Scales",
    "indonesian": "Skala"
  },
  {
    "id": 38208,
    "english": "FCM larvae tunnel into the fruit, leaving behind a characteristic entry hole and a brown.",
    "indonesian": "Larva FCM masuk ke dalam buah, meninggalkan lubang masuk yang khas dan coklat."
  },
  {
    "id": 38209,
    "english": "Corky patch on the fruit surface feeding on the pulp and seeds.",
    "indonesian": "Noda gabus pada permukaan buah memakan daging dan biji."
  },
  {
    "id": 38210,
    "english": "Larvae can cause fruit to drop prematurely from the tree.",
    "indonesian": "Larva dapat menyebabkan buah jatuh sebelum waktunya dari pohon."
  },
  {
    "id": 38211,
    "english": "Thrips feed on the leaves of avocado trees, causing them to become distorted, curled, and discolored.",
    "indonesian": "Thrips memakan daun pohon alpukat, menyebabkan daun menjadi terdistorsi, melengkung, dan berubah warna."
  },
  {
    "id": 38212,
    "english": "The leaves may also have a silvery appearance.",
    "indonesian": "Daun juga bisa terlihat keperakan."
  },
  {
    "id": 38213,
    "english": "It can damage the flowers of avocado trees, resulting in reduced fruit set and yield.",
    "indonesian": "Ini dapat merusak bunga pohon alpukat, menghasilkan pengurangan pembentukan buah dan hasil."
  },
  {
    "id": 38214,
    "english": "Scales feed on the sap of avocado leaves, causing them to turn yellow and wilt.",
    "indonesian": "Skala memakan getah daun alpukat, menyebabkan daun menguning dan layu."
  },
  {
    "id": 38215,
    "english": "The leaves may also have a sticky residue on them and it can cause damage to the bark of avocado trees, resulting in cracks and lesions.",
    "indonesian": "Daun juga dapat memiliki residu lengket dan dapat merusak kulit pohon alpukat, menghasilkan retakan dan lesi."
  },
  {
    "id": 38216,
    "english": "This can lead to reduced tree vigor and yield.",
    "indonesian": "Ini dapat menyebabkan pengurangan kekuatan dan hasil pohon."
  },
  {
    "id": 38217,
    "english": "Fruit flies lay their eggs in the skin of the avocado fruit, resulting in small puncture marks on the surface, The eggs hatch into larvae, which feed on the flesh of the avocado fruit.",
    "indonesian": "Lalat buah bertelur di kulit buah alpukat, menghasilkan tanda-tanda tusukan kecil di permukaan. Telur menetas menjadi larva, yang memakan daging buah alpukat."
  },
  {
    "id": 38218,
    "english": "This can result in the fruit becoming soft and mushy, and may also cause premature ripening and In severe cases of fruit fly infestation.",
    "indonesian": "Ini dapat menyebabkan buah menjadi lembek dan mungkin juga menyebabkan pematangan dini. Pada kasus infestasi lalat buah yang parah."
  },
  {
    "id": 38219,
    "english": "The avocado fruit may drop prematurely from the tree.",
    "indonesian": "Buah alpukat mungkin jatuh sebelum waktunya dari pohon."
  },
  {
    "id": 38220,
    "english": "Root rot",
    "indonesian": "Busuk akar"
  },
  {
    "id": 38221,
    "english": "Cercospora Fruit Spot",
    "indonesian": "Bercak buah Cercospora"
  },
  {
    "id": 38222,
    "english": "Scab disease",
    "indonesian": "Penyakit kudis"
  },
  {
    "id": 38223,
    "english": "The first signs of the disease are observed in the tree canopy.",
    "indonesian": "Tanda-tanda pertama penyakit ini diamati di kanopi pohon."
  },
  {
    "id": 38224,
    "english": "Leaves are small, pale green, often wilted with brown tips, and drop readily.",
    "indonesian": "Daun kecil, hijau pucat, sering layu dengan ujung coklat, dan mudah rontok."
  },
  {
    "id": 38225,
    "english": "Shoots die back from the tips, and eventually the tree is reduced to a bare framework of dying branches.",
    "indonesian": "Tunas mati dari ujung, dan akhirnya pohon menyusut menjadi kerangka kosong dari cabang-cabang yang sekarat."
  },
  {
    "id": 38226,
    "english": "Plants can get anthracnose at any stage, but it causes the most damage between flowering and harvesting.",
    "indonesian": "Tanaman dapat terkena antraknosa pada tahap apa pun, tetapi menyebabkan kerusakan paling besar antara berbunga dan panen."
  },
  {
    "id": 38227,
    "english": "Dry spots, dark brown in color, form on the skin, leading to abnormal development.",
    "indonesian": "Noda kering, berwarna coklat tua, terbentuk di kulit, menyebabkan perkembangan abnormal."
  },
  {
    "id": 38228,
    "english": "In severe attacks, the young fruits drop.",
    "indonesian": "Dalam serangan yang parah, buah muda jatuh."
  },
  {
    "id": 38229,
    "english": "Symptoms occur on leaves, fruit, twigs and fruit stems at any time during the growing season",
    "indonesian": "Gejala muncul pada daun, buah, ranting, dan tangkai buah kapan saja selama musim tanam"
  },
  {
    "id": 38230,
    "english": "Small, light-yellow spots later changing to reddish-brown appear on fruits and leaves which eventually become hard and crack.",
    "indonesian": "Noda kecil berwarna kuning muda kemudian berubah menjadi coklat kemerahan muncul di buah dan daun yang akhirnya menjadi keras dan retak."
  },
  {
    "id": 38231,
    "english": "On fruit, the first sign of infection is a darkening of the epidermis followed by swelling of the underlying tissues which raises a small dark spot.",
    "indonesian": "Pada buah, tanda pertama infeksi adalah penggelapan epidermis diikuti oleh pembengkakan jaringan di bawahnya yang mengangkat noda gelap kecil."
  },
  {
    "id": 38232,
    "english": "Symptoms on fruit initially appear as corky, raised, oval or irregular shaped brown to purplish-brown spots.",
    "indonesian": "Gejala pada buah awalnya muncul sebagai bercak berwarna coklat hingga coklat keunguan yang berbentuk oval atau tidak beraturan dan terangkat."
  },
  {
    "id": 38233,
    "english": "As the disease progresses, spots enlarge and coalesce to form large rough areas over the fruit surface.",
    "indonesian": "Seiring perkembangan penyakit, bercak membesar dan bergabung membentuk area kasar besar di permukaan buah."
  },
  {
    "id": 38234,
    "english": "Cracking of these rough areas may allow secondary organisms to penetrate and rot the fruit.",
    "indonesian": "Retakan pada area kasar ini dapat memungkinkan organisme sekunder masuk dan merusak buah."
  },
  {
    "id": 38235,
    "english": "Pea Aphids",
    "indonesian": "Kutu Daun Kacang"
  },
  {
    "id": 38236,
    "english": "Pea Stem fly",
    "indonesian": "Lalat Batang Kacang"
  },
  {
    "id": 38237,
    "english": "Pea Moth",
    "indonesian": "Ngengat Kacang"
  },
  {
    "id": 38238,
    "english": "Pea Weevil/ bruchid",
    "indonesian": "Kumbang Kacang/ bruchid"
  },
  {
    "id": 38239,
    "english": "Pea Thrips",
    "indonesian": "Thrips Kacang"
  },
  {
    "id": 38240,
    "english": "A colony consists of winged and wingless adults and various sizes of nymphs. Aphids may be black, yellow, or pink, but mostly are various shades of green.",
    "indonesian": "Sebuah koloni terdiri dari dewasa bersayap dan tidak bersayap serta nimfa berbagai ukuran. Kutu daun mungkin berwarna hitam, kuning, atau merah muda, tetapi kebanyakan adalah berbagai nuansa hijau."
  },
  {
    "id": 38241,
    "english": "Feeding by large numbers discolors foliage, curls leaves, and damages developing buds.",
    "indonesian": "Pemberian makan oleh jumlah besar mengubah warna dedaunan, menggulung daun, dan merusak kuncup yang sedang berkembang."
  },
  {
    "id": 38242,
    "english": "They suck the sap of the cells, owing to which the leaves turn pale and yellow.",
    "indonesian": "Mereka menghisap getah sel, menyebabkan daun menjadi pucat dan kuning."
  },
  {
    "id": 38243,
    "english": "Larvae of the insect make a tunnel in the leaf, causing severe damage.",
    "indonesian": "Larva serangga membuat terowongan di daun, menyebabkan kerusakan parah."
  },
  {
    "id": 38244,
    "english": "The large number of tunnels made by the larvae between the lower and upper epidermis interferes with photosynthesis and the proper growth of the plants, making them look unattractive.",
    "indonesian": "Banyaknya terowongan yang dibuat oleh larva antara epidermis bawah dan atas mengganggu fotosintesis dan pertumbuhan tanaman yang tepat, membuatnya terlihat tidak menarik."
  },
  {
    "id": 38245,
    "english": "Drying dropping of leaves in severe cases",
    "indonesian": "Mengeringkan daun yang jatuh pada kasus yang parah"
  },
  {
    "id": 38246,
    "english": "The maggot of the insect damages the internal tissue; consequently, the entire plant dies. The damage is more acute when the crop is sown early.",
    "indonesian": "Belatung serangga merusak jaringan internal; akibatnya, seluruh tanaman mati. Kerusakan lebih parah ketika tanaman ditabur lebih awal."
  },
  {
    "id": 38247,
    "english": "The adults also cause damage by puncturing the leaves, and the injured parts turn yellow.",
    "indonesian": "Serangga dewasa juga menyebabkan kerusakan dengan menusuk daun, dan bagian yang terluka berubah menjadi kuning."
  },
  {
    "id": 38248,
    "english": "The damage is more severe on seedlings than on the grown-up plants",
    "indonesian": "Kerusakan lebih parah pada bibit daripada pada tanaman yang sudah dewasa"
  },
  {
    "id": 38249,
    "english": "The caterpillar makes a hole in pods and feeds upon developing seed.",
    "indonesian": "Ulat membuat lubang di polong dan memakan biji yang sedang berkembang."
  },
  {
    "id": 38250,
    "english": "In the early stages, they feed on the foliage and sometimes cause serious defoliation.",
    "indonesian": "Pada tahap awal, mereka memakan daun dan kadang-kadang menyebabkan pengguguran daun yang serius."
  },
  {
    "id": 38251,
    "english": "During the reproductive stage, they bore the developing pod and feed on the seeds with their head typically thrust inside and most of the part of the body outside.",
    "indonesian": "Selama tahap reproduksi, mereka membosankan polong yang berkembang dan memakan bijinya dengan kepala biasanya didorong ke dalam dan sebagian besar tubuh berada di luar."
  },
  {
    "id": 38252,
    "english": "The caterpillars feed on the developing peas in the pods; they also leave frass, which contaminates the end produce.",
    "indonesian": "Ulat memakan kacang polong yang sedang berkembang di dalam polong; mereka juga meninggalkan kotoran, yang mencemari hasil akhir."
  },
  {
    "id": 38253,
    "english": "Within each pod, 1 or 2 individual peas tend to be partially eaten, and attacked pods may develop a yellow appearance and ripen early.",
    "indonesian": "Di dalam setiap polong, 1 atau 2 kacang polong cenderung dimakan sebagian, dan polong yang diserang mungkin berwarna kuning dan matang lebih awal."
  },
  {
    "id": 38254,
    "english": "When pea pods are opened for shelling, one or more creamy white caterpillars, up to 14 mm long, with dark dots on the body may be found eating into the peas",
    "indonesian": "Ketika polong kacang polong dibuka untuk dikupas, satu atau lebih ulat putih krem, hingga 14 mm panjangnya, dengan bintik-bintik gelap di tubuhnya dapat ditemukan memakan kacang polong."
  },
  {
    "id": 38255,
    "english": "Adults feed on blossoms and lay eggs on young pods.",
    "indonesian": "Serangga dewasa memakan bunga dan bertelur di polong muda."
  },
  {
    "id": 38256,
    "english": "Larvae, after hatching from the eggs, burrow into green seed.",
    "indonesian": "Larva, setelah menetas dari telur, menggali ke dalam biji hijau."
  },
  {
    "id": 38257,
    "english": "The larvae burrow straight through the pods to feed on the seed, so they are not readily found for identification until the seed is mature (above), and it is too late for control.",
    "indonesian": "Larva menggali langsung melalui polong untuk memakan bijinya, sehingga mereka tidak mudah ditemukan untuk identifikasi sampai bijinya matang (di atas), dan sudah terlambat untuk dikendalikan."
  },
  {
    "id": 38258,
    "english": "Leaves fed upon by thrips often become dull green and later develop a silvery-white discoloration on the upper surface.",
    "indonesian": "Daun yang dimakan oleh thrips sering menjadi hijau kusam dan kemudian berkembang menjadi perubahan warna putih keperakan pada permukaan atas."
  },
  {
    "id": 38259,
    "english": "The discolored areas are usually marked by many tiny black excrement spots.",
    "indonesian": "Area yang berubah warna biasanya ditandai dengan banyak bintik kotoran hitam kecil."
  },
  {
    "id": 38260,
    "english": "When thrips feed on developing tissues at the shoot tip or in flower buds, they can cause distorted growth.",
    "indonesian": "Ketika thrips memakan jaringan yang sedang berkembang di ujung tunas atau dalam kuncup bunga, mereka dapat menyebabkan pertumbuhan yang terdistorsi."
  },
  {
    "id": 38261,
    "english": "Pod Spot and Ascochyta Blight",
    "indonesian": "Bercak Polong dan Ascochyta Blight"
  },
  {
    "id": 38262,
    "english": "Mosaic and Streak",
    "indonesian": "Mosaik dan Garis-garis"
  },
  {
    "id": 38263,
    "english": "Yellowing of lower leaves and stunting of plants.",
    "indonesian": "Penguningan daun bagian bawah dan kerdilnya tanaman."
  },
  {
    "id": 38264,
    "english": "The stem may be slightly swollen and brittle near the soil.",
    "indonesian": "Batang mungkin sedikit bengkak dan rapuh di dekat tanah."
  },
  {
    "id": 38265,
    "english": "Externally, the root system appears healthy; however, secondary root rots are likely to occur on plants wilted for long periods.",
    "indonesian": "Secara eksternal, sistem akar tampak sehat; namun, pembusukan akar sekunder mungkin terjadi pada tanaman yang layu dalam jangka waktu lama."
  },
  {
    "id": 38266,
    "english": "It attacks leaves first, producing faint, slightly discolored specks from which grayish white powdery growth of mycelium develops.",
    "indonesian": "Ini menyerang daun terlebih dahulu, menghasilkan bintik-bintik samar yang sedikit berubah warna dari mana pertumbuhan jamur miselium berwarna putih keabu-abuan berkembang."
  },
  {
    "id": 38267,
    "english": "Powdery growth spreads over leaf, stem, and pod.",
    "indonesian": "Pertumbuhan jamur menyebar di atas daun, batang, dan polong."
  },
  {
    "id": 38268,
    "english": "The leaves turn yellow and die.",
    "indonesian": "Daun berubah menjadi kuning dan mati."
  },
  {
    "id": 38269,
    "english": "The stem of the plant becomes malformed and the affected plant dies out.",
    "indonesian": "Batang tanaman menjadi cacat dan tanaman yang terkena mati."
  },
  {
    "id": 38270,
    "english": "Yellow spots having aecia in round or elongated clusters.",
    "indonesian": "Bintik-bintik kuning memiliki aecia dalam kelompok bulat atau memanjang."
  },
  {
    "id": 38271,
    "english": "Then the uredopustules develop which are powdery and light brown in appearance.",
    "indonesian": "Kemudian uredopustule berkembang yang berbentuk bubuk dan berwarna coklat muda."
  },
  {
    "id": 38272,
    "english": "Reddish brown to black streaks appear on primary and secondary roots.",
    "indonesian": "Garis-garis coklat kemerahan hingga hitam muncul di akar primer dan sekunder."
  },
  {
    "id": 38273,
    "english": "These streaks coalesce at later stages, leading to girdling of the lower stem.",
    "indonesian": "Garis-garis ini menyatu pada tahap selanjutnya, menyebabkan pengikatan batang bawah."
  },
  {
    "id": 38274,
    "english": "Red discoloration of the vascular system can be seen, especially near cotyledon attachment.",
    "indonesian": "Perubahan warna merah pada sistem vaskular dapat terlihat, terutama di dekat lampiran kotiledon."
  },
  {
    "id": 38275,
    "english": "Black to purplish streaks on stems reaching from the root zone to about 25 cm up the stem.",
    "indonesian": "Garis-garis hitam hingga keunguan pada batang mencapai dari zona akar hingga sekitar 25 cm ke atas batang."
  },
  {
    "id": 38276,
    "english": "Leaf spots are gray-purplish.",
    "indonesian": "Bercak daun berwarna abu-abu keunguan."
  },
  {
    "id": 38277,
    "english": "Foot and stem lesions girdle and weaken the stem, leading to crop lodging and yield loss.",
    "indonesian": "Lesi pada kaki dan batang mengikat dan melemahkan batang, menyebabkan robohnya tanaman dan kehilangan hasil."
  },
  {
    "id": 38278,
    "english": "A grayish white, moldy growth appears on the lower leaf surface, and a yellowish area appears on the opposite side of the leaf.",
    "indonesian": "Pertumbuhan jamur berwarna putih keabu-abuan muncul di permukaan daun bagian bawah, dan area kekuningan muncul di sisi berlawanan dari daun."
  },
  {
    "id": 38279,
    "english": "Infected leaves can turn yellow and die if the weather is cool and damp.",
    "indonesian": "Daun yang terinfeksi dapat berubah menjadi kuning dan mati jika cuaca dingin dan lembab."
  },
  {
    "id": 38280,
    "english": "Stems may be distorted and stunted.",
    "indonesian": "Batang mungkin terdistorsi dan kerdil."
  },
  {
    "id": 38281,
    "english": "Brown blotches appear on pods, and mold may grow inside pods.",
    "indonesian": "Noda coklat muncul di polong, dan jamur mungkin tumbuh di dalam polong."
  },
  {
    "id": 38282,
    "english": "Mottled patterns on leaves.",
    "indonesian": "Pola belang-belang pada daun."
  },
  {
    "id": 38283,
    "english": "Yellow leaf veins.",
    "indonesian": "Urat daun kuning."
  },
  {
    "id": 38284,
    "english": "Downward curling of leaflets as well as a transient clearing and swelling of leaf veins in most cultivars.",
    "indonesian": "Melengkung ke bawah dari anak daun serta pembersihan sementara dan pembengkakan urat daun di sebagian besar kultivar."
  },
  {
    "id": 38285,
    "english": "African Armyworm",
    "indonesian": "Ulat Tentara Afrika"
  },
  {
    "id": 38286,
    "english": "Bean Aphid",
    "indonesian": "Kutu Kacang"
  },
  {
    "id": 38287,
    "english": "Crown and Root Aphids",
    "indonesian": "Kutu Mahkota dan Akar"
  },
  {
    "id": 38288,
    "english": "Cutworms feed on the roots.",
    "indonesian": "Cutworms memakan akar."
  },
  {
    "id": 38289,
    "english": "Causing small and large superficial holes.",
    "indonesian": "Menyebabkan lubang dangkal kecil dan besar."
  },
  {
    "id": 38290,
    "english": "Completely eat the leaves.",
    "indonesian": "Memakan daun sepenuhnya."
  },
  {
    "id": 38291,
    "english": "The African army indirectly injures the carrot crop by destroying the stem or foliage. The crop cannot produce enough food when foliage is destroyed, reducing yields.",
    "indonesian": "Ulat tentara Afrika secara tidak langsung merusak tanaman wortel dengan menghancurkan batang atau dedaunan. Tanaman tidak dapat menghasilkan cukup makanan ketika dedaunan hancur, mengurangi hasil panen."
  },
  {
    "id": 38292,
    "english": "The African armyworm is also known as a caterpillar.",
    "indonesian": "Ulat tentara Afrika juga dikenal sebagai ulat."
  },
  {
    "id": 38293,
    "english": "When the caterpillars are 3 cm long, they could have already caused massive losses.",
    "indonesian": "Ketika ulat-ulat panjangnya mencapai 3 cm, mereka mungkin sudah menyebabkan kerugian besar."
  },
  {
    "id": 38294,
    "english": "Bean aphid may transmit celery mosaic but little is known in this regard.",
    "indonesian": "Kutu kacang mungkin menularkan mosaik seledri tetapi sedikit yang diketahui tentang hal ini."
  },
  {
    "id": 38295,
    "english": "Bean aphid only occasionally builds up on carrots.",
    "indonesian": "Kutu kacang hanya sesekali menumpuk pada wortel."
  },
  {
    "id": 38296,
    "english": "It is known regarding economic thresholds and damage.",
    "indonesian": "Ini diketahui mengenai ambang ekonomi dan kerusakan."
  },
  {
    "id": 38297,
    "english": "These aphids occur infrequently and only occasionally cause injury.",
    "indonesian": "Kutu ini jarang terjadi dan hanya sesekali menyebabkan cedera."
  },
  {
    "id": 38298,
    "english": "High populations may stunt growth.",
    "indonesian": "Populasi tinggi dapat mengerdilkan pertumbuhan."
  },
  {
    "id": 38299,
    "english": "It is more serious that the tops may be weakened by their feeding and break off during harvest, leaving the carrot in the ground.",
    "indonesian": "Lebih serius bahwa bagian atas dapat dilemahkan oleh makan mereka dan patah saat panen, meninggalkan wortel di tanah."
  },
  {
    "id": 38300,
    "english": "Bacterial soft rot",
    "indonesian": "Busuk lunak bakteri"
  },
  {
    "id": 38301,
    "english": "Leaf blight",
    "indonesian": "Penyakit daun busuk"
  },
  {
    "id": 38302,
    "english": "The disease generally appears as a soft, watery, and slimy decay of the taproot. The decay rapidly consumes the core of the carrot, often leaving the epidermis/peel intact.",
    "indonesian": "Penyakit ini umumnya muncul sebagai busuk lunak, berair, dan berlendir pada akar tunggang. Pembusukan dengan cepat menghabiskan inti wortel, seringkali meninggalkan epidermis/kulit utuh."
  },
  {
    "id": 38303,
    "english": "Rotted tissues retain their natural color until they completely decay. The infected carrot is not fit for consumption and unsellable.",
    "indonesian": "Jaringan yang membusuk mempertahankan warna alami mereka sampai mereka benar-benar membusuk. Wortel yang terinfeksi tidak layak untuk dikonsumsi dan tidak dapat dijual."
  },
  {
    "id": 38304,
    "english": "A foul odor may be associated with soft rot.",
    "indonesian": "Bau busuk mungkin terkait dengan busuk lunak."
  },
  {
    "id": 38305,
    "english": "Whitish powdery growth on the undersurface of the leaves.",
    "indonesian": "Pertumbuhan serbuk putih di permukaan bawah daun."
  },
  {
    "id": 38306,
    "english": "As the disease progresses, powdery spots appear on both surfaces of the leaves and on stems.",
    "indonesian": "Seiring perkembangan penyakit, bintik-bintik berdebu muncul di kedua permukaan daun dan batang."
  },
  {
    "id": 38307,
    "english": "Under severe disease pressure, the leaves turn brown, twisted, and brittle before shriveling and dying.",
    "indonesian": "Di bawah tekanan penyakit yang parah, daun menjadi coklat, melengkung, dan rapuh sebelum mengerut dan mati."
  },
  {
    "id": 38308,
    "english": "Older leaves are attacked first.",
    "indonesian": "Daun yang lebih tua diserang terlebih dahulu."
  },
  {
    "id": 38309,
    "english": "Dark grey to brown spots, angular, with yellow margins, occur on the leaves and petioles.",
    "indonesian": "Bintik-bintik abu-abu gelap hingga coklat, berbentuk sudut, dengan tepi kuning, terjadi pada daun dan tangkai daun."
  },
  {
    "id": 38310,
    "english": "Under favorable conditions, the spots merge and the leaves rapidly blacken, wither, and die.",
    "indonesian": "Dalam kondisi yang menguntungkan, bintik-bintik itu menyatu dan daun dengan cepat menghitam, layu, dan mati."
  },
  {
    "id": 38311,
    "english": "Weevil",
    "indonesian": "Kumbang"
  },
  {
    "id": 38312,
    "english": "Tuber moth",
    "indonesian": "Ngengat umbi"
  },
  {
    "id": 38313,
    "english": "Whitefly",
    "indonesian": "Lalat putih"
  },
  {
    "id": 38314,
    "english": "Sweet Potato Virus disease",
    "indonesian": "Penyakit Virus Ubi Jalar"
  },
  {
    "id": 38315,
    "english": "Black rot",
    "indonesian": "Busuk hitam"
  },
  {
    "id": 38316,
    "english": "Potato mosaic virus",
    "indonesian": "Virus mosaik kentang"
  },
  {
    "id": 38317,
    "english": "An infested tuber is often riddled with cavities or tunnels.",
    "indonesian": "Umbi yang terinfeksi sering kali penuh dengan rongga atau terowongan."
  },
  {
    "id": 38318,
    "english": "Thickening and malformation of vines and often cracking of the tissue.",
    "indonesian": "Penebalan dan malformasi batang dan seringkali retaknya jaringan."
  },
  {
    "id": 38319,
    "english": "Discoloration, cracking, or wilting of damaged vines.",
    "indonesian": "Perubahan warna, retak, atau layu pada batang yang rusak."
  },
  {
    "id": 38320,
    "english": "It is a pest of field and storage.",
    "indonesian": "Ini adalah hama di lapangan dan penyimpanan."
  },
  {
    "id": 38321,
    "english": "Larva tunnels into foliage, stem, and tubers.",
    "indonesian": "Larva masuk ke dalam daun, batang, dan umbi."
  },
  {
    "id": 38322,
    "english": "Galleries are formed near tuber eyes.",
    "indonesian": "Galeri terbentuk di dekat mata umbi."
  },
  {
    "id": 38323,
    "english": "Damage the undersides of leaves by sucking their plant sap.",
    "indonesian": "Merusak bagian bawah daun dengan mengisap getah tanaman mereka."
  },
  {
    "id": 38324,
    "english": "They damage young and soft parts of plants such as new leaves and shoots.",
    "indonesian": "Mereka merusak bagian muda dan lunak dari tanaman seperti daun dan tunas baru."
  },
  {
    "id": 38325,
    "english": "Leaves become rolled up and turn pale and gradually dry up.",
    "indonesian": "Daun menjadi bergulung dan berubah pucat dan perlahan-lahan mengering."
  },
  {
    "id": 38326,
    "english": "Development of sooty mold on the plant.",
    "indonesian": "Pertumbuhan jamur jelaga pada tanaman."
  },
  {
    "id": 38327,
    "english": "Blackening of the leaves that dry and fall off.",
    "indonesian": "Penyepuhan daun yang kering dan rontok."
  },
  {
    "id": 38328,
    "english": "Chlorotic spots, yellowing.",
    "indonesian": "Bercak klorotik, menguning."
  },
  {
    "id": 38329,
    "english": "Stunted vines.",
    "indonesian": "Tanaman menjalar terhambat."
  },
  {
    "id": 38330,
    "english": "Narrow yellow leaves with deformed edges.",
    "indonesian": "Daun kuning sempit dengan tepi yang cacat."
  },
  {
    "id": 38331,
    "english": "Yield reductions in roots.",
    "indonesian": "Pengurangan hasil pada akar."
  },
  {
    "id": 38332,
    "english": "Symptoms generally are seen at harvest, after curing or after storage.",
    "indonesian": "Gejala umumnya terlihat saat panen, setelah penyembuhan, atau setelah penyimpanan."
  },
  {
    "id": 38333,
    "english": "A dry, firm, dark-colored rot that does not extend into the cortex of the sweet potato root.",
    "indonesian": "Penyakit busuk kering, keras, berwarna gelap yang tidak menyebar ke korteks akar ubi jalar."
  },
  {
    "id": 38334,
    "english": "Dark sunken, darkish spots on the roots and the lower parts of the stem.",
    "indonesian": "Bercak gelap yang tenggelam, berwarna gelap pada akar dan bagian bawah batang."
  },
  {
    "id": 38335,
    "english": "Necrotic spots observed on lower leaves.",
    "indonesian": "Bercak nekrotik teramati pada daun bagian bawah."
  },
  {
    "id": 38336,
    "english": "Discoloring, wilting, and death of foliage and, eventually, the death of the sweet potato vine.",
    "indonesian": "Pembusukan, layu, dan kematian daun dan, akhirnya, kematian tanaman ubi jalar."
  },
  {
    "id": 38337,
    "english": "It rapidly spreads in high moisture and low temperature.",
    "indonesian": "Penyebarannya cepat dalam kelembaban tinggi dan suhu rendah."
  },
  {
    "id": 38338,
    "english": "Black specks observed on tubers.",
    "indonesian": "Titik-titik hitam teramati pada umbi."
  },
  {
    "id": 38339,
    "english": "Affected plants show drying up.",
    "indonesian": "Tanaman yang terkena menunjukkan kekeringan."
  },
  {
    "id": 38340,
    "english": "In infected tubers, at the time of sprouting, black, brown color appears on eyes.",
    "indonesian": "Pada umbi yang terinfeksi, pada saat bertunas, warna hitam, coklat muncul di mata."
  },
  {
    "id": 38341,
    "english": "Unhealthy plants with leaf discoloration.",
    "indonesian": "Tanaman tidak sehat dengan perubahan warna pada daun."
  },
  {
    "id": 38342,
    "english": "Wilting leaves.",
    "indonesian": "Daun layu."
  },
  {
    "id": 38343,
    "english": "Stunted growth.",
    "indonesian": "Pertumbuhan terhambat."
  },
  {
    "id": 38344,
    "english": "Curculios beetle",
    "indonesian": "Kumbang Curculios"
  },
  {
    "id": 38345,
    "english": "Rose scale insects",
    "indonesian": "Serangga Skala Mawar"
  },
  {
    "id": 38346,
    "english": "Rose chaffer beetle",
    "indonesian": "Kumbang Rose Chaffer"
  },
  {
    "id": 38347,
    "english": "Black spot",
    "indonesian": "Bercak hitam"
  },
  {
    "id": 38348,
    "english": "Rose mosaic virus",
    "indonesian": "Virus Mozaik Mawar"
  },
  {
    "id": 38349,
    "english": "Crown gall",
    "indonesian": "Gangguan Mahkota"
  },
  {
    "id": 38350,
    "english": "Distorted flower buds and leaves.",
    "indonesian": "Kuncup bunga dan daun yang terdistorsi."
  },
  {
    "id": 38351,
    "english": "Sticky honeydew substance that is secreted by the aphids.",
    "indonesian": "Zat madu lengket yang dikeluarkan oleh kutu daun."
  },
  {
    "id": 38352,
    "english": "Black sooty mold growing on the honeydew.",
    "indonesian": "Jamur jelaga hitam tumbuh di atas madu."
  },
  {
    "id": 38353,
    "english": "Rose curculios are reddish-brown weevils with dark spots.",
    "indonesian": "Kumbang Curculios mawar adalah kumbang berwarna cokelat kemerahan dengan bintik-bintik gelap."
  },
  {
    "id": 38354,
    "english": "Adult rose curculios feed on the flower buds, poking their long snouts inside.",
    "indonesian": "Kumbang Curculios mawar dewasa memakan tunas bunga, menusukkan belalai panjang mereka ke dalam."
  },
  {
    "id": 38355,
    "english": "If the flowers open, they will be full of ragged holes.",
    "indonesian": "Jika bunga mekar, mereka akan penuh dengan lubang-lubang yang tidak rata."
  },
  {
    "id": 38356,
    "english": "Mainly found on the stems and branches of the plant, lack of control will allow the pest to spread to flower stalks and petioles.",
    "indonesian": "Biasanya ditemukan pada batang dan cabang tanaman, kurangnya kontrol akan memungkinkan hama tersebut menyebar ke tangkai bunga dan tangkai daun."
  },
  {
    "id": 38357,
    "english": "Plants would be stunted, spindly, and with a white, flaky crust of scales on the bark.",
    "indonesian": "Tanaman akan terhambat pertumbuhannya, ramping, dan dengan kerak putih berbintik-bintik pada kulit kayu."
  },
  {
    "id": 38358,
    "english": "Turn yellow and die back.",
    "indonesian": "Berubah menjadi kuning dan mati mundur."
  },
  {
    "id": 38359,
    "english": "They have a voracious appetite and can quickly skeletonize leaves, leaving only the veins behind.",
    "indonesian": "Mereka memiliki nafsu makan yang besar dan dapat dengan cepat menjadikan daun berlekuk, meninggalkan hanya urat belakang."
  },
  {
    "id": 38360,
    "english": "Create holes in the fruits, making them less attractive and reducing seed viability.",
    "indonesian": "Membuat lubang-lubang pada buah, membuatnya kurang menarik dan mengurangi daya hidup benih."
  },
  {
    "id": 38361,
    "english": "They can consume the petals and damage the blooms, reducing the aesthetic value of the roses.",
    "indonesian": "Mereka dapat mengonsumsi kelopak dan merusak bunga, mengurangi nilai estetika mawar."
  },
  {
    "id": 38362,
    "english": "White powdery growth is visible on the plant.",
    "indonesian": "Pertumbuhan berpudar putih terlihat pada tanaman."
  },
  {
    "id": 38363,
    "english": "Infected leaves turn purplish and drop.",
    "indonesian": "Daun yang terinfeksi berubah menjadi ungu dan rontok."
  },
  {
    "id": 38364,
    "english": "Flower buds may fail to open.",
    "indonesian": "Kuncup bunga mungkin gagal mekar."
  },
  {
    "id": 38365,
    "english": "Conspicuous circular black spots with fringed margins appear on either side of leaves.",
    "indonesian": "Bercak hitam berbentuk bulat yang mencolok dengan tepi berjumbai muncul di kedua sisi daun."
  },
  {
    "id": 38366,
    "english": "Leaves become chlorotic.",
    "indonesian": "Daun menjadi klorotik."
  },
  {
    "id": 38367,
    "english": "Leaves dry up and drop prematurely.",
    "indonesian": "Daun mengering dan rontok secara prematur."
  },
  {
    "id": 38368,
    "english": "Yellowing in a mosaic pattern. Chlorotic (yellow) rings or wavy lines (which can look similar to leaf miner damage).",
    "indonesian": "Kuning dalam pola mozaik. Cincin klorotik (kuning) atau garis-garis berombak (yang dapat terlihat mirip dengan kerusakan pengerat daun)."
  },
  {
    "id": 38369,
    "english": "Yellowing of the veins.",
    "indonesian": "Penguningan pembuluh."
  },
  {
    "id": 38370,
    "english": "Mottled flower color.",
    "indonesian": "Warna bunga belang-belang."
  },
  {
    "id": 38371,
    "english": "New crown galls are usually pale colored and somewhat round.",
    "indonesian": "Bengkak mahkota baru biasanya berwarna pucat dan agak bulat."
  },
  {
    "id": 38372,
    "english": "As they enlarge, they become rough, irregularly shaped, and hard.",
    "indonesian": "Ketika mereka membesar, mereka menjadi kasar, berbentuk tidak beraturan, dan keras."
  },
  {
    "id": 38373,
    "english": "Crown gall can easily be confused with the graft union, but the graft union will not continue to grow larger.",
    "indonesian": "Bengkak mahkota dengan mudah dapat disalahartikan dengan penyambungan, tetapi penyambungan tidak akan terus tumbuh lebih besar."
  },
  {
    "id": 38374,
    "english": "Pod borers",
    "indonesian": "Penggerek polong"
  },
  {
    "id": 38375,
    "english": "Armyworms",
    "indonesian": "Ulat tentara"
  },
  {
    "id": 38376,
    "english": "Root knot nematodes",
    "indonesian": "Nematoda simpul akar"
  },
  {
    "id": 38377,
    "english": "Flower thrips",
    "indonesian": "Thrips bunga"
  },
  {
    "id": 38378,
    "english": "Cowpea mosaic",
    "indonesian": "Mozaik kacang kuda"
  },
  {
    "id": 38379,
    "english": "Macrophomina root rot",
    "indonesian": "Busuk akar Macrophomina"
  },
  {
    "id": 38380,
    "english": "Bore holes on the buds, flower or pods.",
    "indonesian": "Membuat lubang pada tunas, bunga, atau polong."
  },
  {
    "id": 38381,
    "english": "Infested pods and flowers are webbed together.",
    "indonesian": "Polong dan bunga yang terinfeksi disatukan oleh jaring."
  },
  {
    "id": 38382,
    "english": "Defoliation in early stages & later feed on seed larvae thrust head inside the pods and the rest of the body hanging out & make round holes.",
    "indonesian": "Pengguguran daun pada tahap awal & kemudian memakan larva biji yang menancapkan kepala ke dalam polong dan sisa tubuhnya tergantung & membuat lubang bulat."
  },
  {
    "id": 38383,
    "english": "Damage by the worms comprises singular or grouped shaped holes on the leaves of infested plants.",
    "indonesian": "Kerusakan oleh cacing meliputi lubang-lubang berbentuk tunggal atau berkelompok pada daun tanaman yang terinfeksi."
  },
  {
    "id": 38384,
    "english": "Under heavy infestations, windowing of leaves is observed.",
    "indonesian": "Di bawah infestasi yang berat, teramati adanya jendela pada daun."
  },
  {
    "id": 38385,
    "english": "Egg clusters appear as cottony or fuzzy substance on the leaf surface.",
    "indonesian": "Klaster telur muncul sebagai zat berbulu atau berbulu di permukaan daun."
  },
  {
    "id": 38386,
    "english": "They usually appear sporadically within a cowpea field.",
    "indonesian": "Mereka biasanya muncul secara sporadis di lapangan kacang kuda."
  },
  {
    "id": 38387,
    "english": "Symptoms include stunting, yellowing, wilting, and formation of galls on host roots. Infected plants occur in patches in the field.",
    "indonesian": "Gejala meliputi pertumbuhan terhambat, penguningan, layu, dan pembentukan kutil pada akar inang. Tanaman yang terinfeksi terjadi dalam bercak di lapangan."
  },
  {
    "id": 38388,
    "english": "Infected roots become knotty; in severely infected plants, the root system is reduced, and the rootlets are almost completely absent.",
    "indonesian": "Akar yang terinfeksi menjadi berbintil; pada tanaman yang terinfeksi parah, sistem akar berkurang, dan akar kecil hampir tidak ada sama sekali."
  },
  {
    "id": 38389,
    "english": "Damage is prominent on petioles, leaves, and flowers that are heavily infested.",
    "indonesian": "Kerusakan sangat terlihat pada pelepah, daun, dan bunga yang terinfeksi parah."
  },
  {
    "id": 38390,
    "english": "Damaged petioles and leaves have tiny holes surrounded by discolored areas.",
    "indonesian": "Pelepah dan daun yang rusak memiliki lubang-lubang kecil yang dikelilingi oleh daerah yang berubah warna."
  },
  {
    "id": 38391,
    "english": "Infested flowers are brown, dried, or completely distorted.",
    "indonesian": "Bunga yang terinfeksi berwarna coklat, kering, atau benar-benar terdistorsi."
  },
  {
    "id": 38392,
    "english": "The germinating seedling turns brown-red and dies.",
    "indonesian": "Tunas biji yang sedang tumbuh berubah menjadi coklat-merah dan mati."
  },
  {
    "id": 38393,
    "english": "Irregular to round brown spots with chlorotic halos appear on leaves, and later spread to the stem.",
    "indonesian": "Bercak coklat tidak beraturan hingga bulat dengan halo klorotik muncul pada daun, dan kemudian menyebar ke batang."
  },
  {
    "id": 38394,
    "english": "Stem may break, pods are also infected leading to shriveled seeds.",
    "indonesian": "Batang mungkin patah, polong juga terinfeksi yang mengakibatkan biji mengkerut."
  },
  {
    "id": 38395,
    "english": "It is caused by a virus transmitted by aphids.",
    "indonesian": "Ini disebabkan oleh virus yang ditularkan oleh kutu daun."
  },
  {
    "id": 38396,
    "english": "The affected leaves become pale yellow and exhibit mosaic, vein banding symptoms.",
    "indonesian": "Daun yang terkena menjadi kuning pucat dan menunjukkan gejala mozaik, pembentukan urat."
  },
  {
    "id": 38397,
    "english": "The affected leaves become reduced in size and show puckering. Pods are also reduced and become twisted.",
    "indonesian": "Daun yang terkena menjadi berukuran lebih kecil dan menunjukkan kerutan. Polong juga berkurang dan menjadi kusut."
  },
  {
    "id": 38398,
    "english": "Powdery mildew is visible on all the aerial parts of the affected plants.",
    "indonesian": "Jamur tepung terlihat pada semua bagian tanaman yang terkena."
  },
  {
    "id": 38399,
    "english": "Symptoms first start from leaves and then spread to stem, branches, and pods.",
    "indonesian": "Gejala pertama mulai dari daun dan kemudian menyebar ke batang, cabang, dan polong."
  },
  {
    "id": 38400,
    "english": "This white growth consists of the fungus and its spores.",
    "indonesian": "Pertumbuhan putih ini terdiri dari jamur dan spora-spornya."
  },
  {
    "id": 38401,
    "english": "The fungus attacks all aerial parts and at any stage of plant growth.",
    "indonesian": "Jamur menyerang semua bagian tanaman yang berada di atas tanah dan pada setiap tahap pertumbuhan tanaman."
  },
  {
    "id": 38402,
    "english": "Symptoms include circular, black, sunken spots with a dark center and bright red-orange margins on leaves and pods.",
    "indonesian": "Gejalanya termasuk bercak hitam, cekung, berbentuk bulat dengan pusat yang gelap dan pinggiran merah-orange terang pada daun dan polong."
  },
  {
    "id": 38403,
    "english": "In severe infections, the affected parts wither off.",
    "indonesian": "Pada infeksi yang parah, bagian yang terkena menjadi layu."
  },
  {
    "id": 38404,
    "english": "Symptoms begin appearing at 4 weeks as raised white cankers at the base of the stem.",
    "indonesian": "Gejala mulai muncul pada 4 minggu sebagai kanker putih yang menonjol di pangkal batang."
  },
  {
    "id": 38405,
    "english": "The affected plants become stunted with dark green and mottled leaves that are reduced in size.",
    "indonesian": "Tanaman yang terkena menjadi terhambat pertumbuhannya dengan daun yang berwarna hijau gelap dan belang-belang yang berkurang ukurannya."
  },
  {
    "id": 38406,
    "english": "Leaves of affected plants dry and drop.",
    "indonesian": "Daun tanaman yang terkena menjadi kering dan rontok."
  },
  {
    "id": 38407,
    "english": "Establishment stage",
    "indonesian": "Tahap pendirian"
  },
  {
    "id": 38408,
    "english": "Budding stage",
    "indonesian": "Tahap tunas"
  },
  {
    "id": 38409,
    "english": "Flower initiation and blooming stage",
    "indonesian": "Tahap inisiasi dan mekar bunga"
  },
  {
    "id": 38410,
    "english": "Seed Germination",
    "indonesian": "Perkecambahan biji"
  },
  {
    "id": 38411,
    "english": "Harvest",
    "indonesian": "Panen"
  },
  {
    "id": 38412,
    "english": "Storage root initiation stage",
    "indonesian": "Tahap inisiasi penyimpanan akar"
  },
  {
    "id": 38413,
    "english": "Storage root bulking stage",
    "indonesian": "Tahap pembesaran penyimpanan akar"
  },
  {
    "id": 38414,
    "english": "Vegetative growth stage",
    "indonesian": "Tahap pertumbuhan vegetatif"
  },
  {
    "id": 38415,
    "english": "Inflorescence  stage",
    "indonesian": "Tahap infloresens"
  },
  {
    "id": 38416,
    "english": "Ripening  stage",
    "indonesian": "Tahap pematangan"
  },
  {
    "id": 38417,
    "english": "Ammonium phosphate sulphate(20-20-0)",
    "indonesian": "Ammonium fosfat sulfat(20-20-0)"
  },
  {
    "id": 38418,
    "english": "Ammonium sulphate(20-0-0)",
    "indonesian": "Ammonium sulfat(20-0-0)"
  },
  {
    "id": 38419,
    "english": "Borax",
    "indonesian": "Borak"
  },
  {
    "id": 38421,
    "english": "Chelated iron",
    "indonesian": "Zat besi kelat"
  },
  {
    "id": 38422,
    "english": "Chelated Zinc",
    "indonesian": "Seng kelat"
  },
  {
    "id": 38423,
    "english": "Manganese sulphate",
    "indonesian": "Sulfat mangan"
  },
  {
    "id": 38424,
    "english": "NPK (10-26-26)",
    "indonesian": "NPK (10-26-26)"
  },
  {
    "id": 38425,
    "english": "NPK(12-32-16)",
    "indonesian": "NPK (12-32-16)"
  },
  {
    "id": 38426,
    "english": "NPK (20-20-10)",
    "indonesian": "NPK (20-20-10)"
  },
  {
    "id": 38427,
    "english": "Potassium chloride (0-0-60)",
    "indonesian": "Klorida potasium (0-0-60)"
  },
  {
    "id": 38428,
    "english": "SSP",
    "indonesian": "SSP"
  },
  {
    "id": 38429,
    "english": "TSP",
    "indonesian": "TSP"
  },
  {
    "id": 38430,
    "english": "Urea ammonium phosphate(28-28-0)",
    "indonesian": "Fosfat amonium urea (28-28-0)"
  },
  {
    "id": 38431,
    "english": "DAP(18-46-0)",
    "indonesian": "DAP (18-46-0)"
  },
  {
    "id": 38432,
    "english": "Ferrous sulphate",
    "indonesian": "Sulfat besi"
  },
  {
    "id": 38433,
    "english": "Neem coated urea",
    "indonesian": "Urea berlapis neem"
  },
  {
    "id": 38434,
    "english": "NPK(15-15-15)",
    "indonesian": "NPK (15-15-15)"
  },
  {
    "id": 38435,
    "english": "NPK (19-19-19)(water soluble)",
    "indonesian": "NPK (19-19-19) (larut dalam air)"
  },
  {
    "id": 38436,
    "english": "Potassium nitrate(13-0-45)(water soluble)",
    "indonesian": "Nitrat kalium (13-0-45) (larut dalam air)"
  },
  {
    "id": 38437,
    "english": "Sulphur",
    "indonesian": "Sulfur"
  },
  {
    "id": 38438,
    "english": "Zincated urea",
    "indonesian": "Urea berzat seng"
  },
  {
    "id": 38439,
    "english": "Nano urea",
    "indonesian": "Nano urea"
  },
  {
    "id": 38440,
    "english": "NPK mixed fertilizer with boron(10-20-10:0.3)",
    "indonesian": "Pupuk NPK campuran dengan boron (10-20-10:0.3)"
  },
  {
    "id": 38441,
    "english": "Mixed fertilizer fortified with Zinc(20-20-0:1.0)",
    "indonesian": "Pupuk campuran diperkaya dengan Zinc(20-20-0:1.0)"
  },
  {
    "id": 38442,
    "english": "Hairy catterpiller",
    "indonesian": "Ulat berbulu"
  },
  {
    "id": 38443,
    "english": "Soybean",
    "indonesian": "Kedelai"
  },
  {
    "id": 38444,
    "english": "Infected stems are often red inside (sometimes pale) and a distinct zig-zag tunnel may be observed – with maggots or pupae inside.",
    "indonesian": "Batang yang terinfeksi seringkali berwarna merah di dalam (kadang-kadang pucat) dan terowongan berzigzag yang jelas mungkin teramati - dengan ulat atau kepompong di dalamnya."
  },
  {
    "id": 38445,
    "english": "May even cause plant death, especially in younger plants particularly if damage occurs in the plant’s hypocotyl (basal stem) region.",
    "indonesian": "Dapat menyebabkan kematian tanaman, terutama pada tanaman muda terutama jika kerusakan terjadi di wilayah hipokotil (batang basal) tanaman."
  },
  {
    "id": 38446,
    "english": "Large infestations (3 or more maggots per plant) may cause wilting",
    "indonesian": "Infestasi besar (3 atau lebih ulat per tanaman) dapat menyebabkan layu"
  },
  {
    "id": 38447,
    "english": "The young larvae feeds on the chlorophyll of young leaves and skeletonize it",
    "indonesian": "Larva muda memakan klorofil daun muda dan menyisirnya"
  },
  {
    "id": 38448,
    "english": "Light pale brownish yellow stout moth",
    "indonesian": "Kupu-kupu coklat kuning pucat yang kuat"
  },
  {
    "id": 38449,
    "english": "Forewings are olive green to pale brown with a dark brown circular spot in the centre",
    "indonesian": "Sayap depan hijau zaitun hingga coklat pucat dengan bercak coklat gelap bundar di tengah"
  },
  {
    "id": 38450,
    "english": "Due to attack of the insect the leaves turn yellow and become curled",
    "indonesian": "Akibat serangan serangga, daun menjadi kuning dan menjadi keriting"
  },
  {
    "id": 38451,
    "english": "Chlorotic spots and sooty molds develop on the affected tissues",
    "indonesian": "Bintik-bintik klorotik dan jamur jelaga berkembang pada jaringan yang terkena"
  },
  {
    "id": 38452,
    "english": "During heavy infections, these spots may come together and spread over the whole leaf, apart from the area around the veins.",
    "indonesian": "Selama infeksi berat, bintik-bintik ini mungkin bersatu dan menyebar ke seluruh daun, kecuali daerah di sekitar urat daun."
  },
  {
    "id": 38453,
    "english": "Scrapping of leaves, pin holes or small to medium elongated holes",
    "indonesian": "Penggarukan daun, lubang jarum atau lubang kecil hingga sedang yang memanjang"
  },
  {
    "id": 38454,
    "english": "Singular, or closely grouped circular to irregularly shaped holes in foliage",
    "indonesian": "Lubang tunggal, atau berkelompok rapat berbentuk bulat hingga tidak beraturan pada dedaunan"
  },
  {
    "id": 38455,
    "english": "Can cause serious damage to maize at all stages",
    "indonesian": "Dapat menyebabkan kerusakan serius pada jagung pada semua tahapan"
  },
  {
    "id": 38456,
    "english": "Leaves look like brownish-yellow in colour.",
    "indonesian": "Daun terlihat seperti berwarna kuning kecoklatan."
  },
  {
    "id": 38457,
    "english": "The final instar larvae feed on the leaves from the margin",
    "indonesian": "Larva instar terakhir memakan daun dari pinggiran"
  },
  {
    "id": 38458,
    "english": "The damaged leaves of the plant appear in skeletonised/ net/ web form",
    "indonesian": "Daun rusak tanaman muncul dalam bentuk berserat / jaring / web"
  },
  {
    "id": 38459,
    "english": "Tan or reddish-brown lesions (spots) develop first on the underside of leaves",
    "indonesian": "Lesi (bintik-bintik) berwarna coklat kekuningan atau merah kecoklatan pertama kali berkembang di bagian bawah daun"
  },
  {
    "id": 38460,
    "english": "Symptoms begin on leaves in the lower plant canopy",
    "indonesian": "Gejala dimulai pada daun di kanopi tanaman bagian bawah"
  },
  {
    "id": 38461,
    "english": "Small pustules (blisters) develop in the lesions, which break open and release masses of tan spores",
    "indonesian": "Pustula kecil (blister) berkembang di lesi, yang pecah dan melepaskan massa spora berwarna coklat kekuningan"
  },
  {
    "id": 38462,
    "english": "Mottling appears as light and dark green patches on individual leaves",
    "indonesian": "Bercak muncul sebagai bercak hijau terang dan gelap pada daun individu"
  },
  {
    "id": 38463,
    "english": "Symptoms are most obvious on young, rapidly growing leaves",
    "indonesian": "Gejala paling jelas pada daun muda yang tumbuh dengan cepat"
  },
  {
    "id": 38464,
    "english": "The disease is characterized by light and day green mottling on the leaves often accompanied by wilting of young leaves in sunny days when plants first become infected.",
    "indonesian": "Penyakit ini ditandai dengan bercak hijau terang dan harian pada daun yang sering disertai layu pada daun muda di hari-hari yang cerah ketika tanaman pertama kali terinfeksi."
  },
  {
    "id": 38465,
    "english": "Symptoms usually begin in the upper canopy because young leaves are most susceptible",
    "indonesian": "Gejala biasanya dimulai di kanopi atas karena daun muda paling rentan"
  },
  {
    "id": 38466,
    "english": "Small, angular, reddish-brown lesions are surrounded by a yellow halo.",
    "indonesian": "Lesi kecil, berbentuk sudut, berwarna coklat kekuningan dikelilingi oleh aura kuning."
  },
  {
    "id": 38467,
    "english": "As the disease progresses, lesions often grow together to produce large, irregularly shaped dead areas",
    "indonesian": "Seiring perkembangan penyakit, lesi sering tumbuh bersama-sama untuk menghasilkan area mati yang besar dan berbentuk tidak beraturan"
  },
  {
    "id": 38468,
    "english": "Foliar symptoms can be similar to those of sudden death syndrome and stem canker and appear after early pod set",
    "indonesian": "Gejala daun dapat mirip dengan sindrom kematian tiba-tiba dan kanker batang dan muncul setelah penentuan polong awal"
  },
  {
    "id": 38469,
    "english": "Stem symptoms usually occur prior to leaf symptoms",
    "indonesian": "Gejala batang biasanya terjadi sebelum gejala daun"
  },
  {
    "id": 38470,
    "english": "Can occur even if foliar symptoms never appear",
    "indonesian": "Dapat terjadi bahkan jika gejala daun tidak pernah muncul"
  },
  {
    "id": 38471,
    "english": "Coffee berry borer is the most serious pest of coffee worldwide.",
    "indonesian": "Penggerek buah kopi adalah hama paling serius pada kopi di seluruh dunia."
  },
  {
    "id": 38472,
    "english": "The female beetle bores into the berries through the navel region and makes tunnels in the hard bean, laying about 15 eggs.",
    "indonesian": "Kumbang betina menggerek ke dalam buah melalui daerah pusar dan membuat terowongan di biji yang keras, meletakkan sekitar 15 telur."
  },
  {
    "id": 38473,
    "english": "The larvae feed on the beans, making small tunnels. A typical pinhole at the tip of the berries indicates the presence of the pest, which damages young as well as ripe berries. In severe infestation, 30 to 80% of berries may be affected, resulting in heavy crop loss.",
    "indonesian": "Larva memakan biji, membuat terowongan kecil. Lubang jarum tipikal di ujung buah menunjukkan keberadaan hama, yang merusak buah muda maupun matang. Pada infeksi parah, 30 hingga 80% buah dapat terkena, menyebabkan kerugian panen yang besar."
  },
  {
    "id": 38474,
    "english": "Serious pest of Arabica coffee.",
    "indonesian": "Hama serius pada kopi Arabika."
  },
  {
    "id": 38475,
    "english": "Infested plants show external ridges around the stem.",
    "indonesian": "Tanaman yang terinfeksi menunjukkan lekukan eksternal di sekitar batang."
  },
  {
    "id": 38476,
    "english": "Affected plants also show yellowing and wilting of leaves.",
    "indonesian": "Tanaman yang terkena juga menunjukkan kuning dan layu pada daun."
  },
  {
    "id": 38477,
    "english": "Withered (faster in young branches and delayed in older twigs) or dried branches, attacked leaves fall prematurely.",
    "indonesian": "Cabang yang layu (lebih cepat pada cabang muda dan tertunda pada dahan tua) atau kering, daun yang diserang rontok lebih awal."
  },
  {
    "id": 38478,
    "english": "Terminal leaves wilt, droop, and dry up.",
    "indonesian": "Daun terminal layu, menggantung, dan kering."
  },
  {
    "id": 38479,
    "english": "Severe infestation can result in the loss of a considerable number of productive branches.",
    "indonesian": "Infestasi parah dapat menyebabkan hilangnya sejumlah cabang produktif."
  },
  {
    "id": 38480,
    "english": "The larva causes damage in Arabica and Robusta coffee by boring into young stems, primary and secondary branches to feed on the wood.",
    "indonesian": "Larva menyebabkan kerusakan pada kopi Arabika dan Robusta dengan meresap ke dalam batang muda, cabang utama dan sekunder untuk memakan kayu."
  },
  {
    "id": 38481,
    "english": "In the early stages of attack, young plants or branches show signs of wilting. Infested parts bear one or two holes through which pellet-like excrement of the larva hangs out and accumulates at the base of the plant.",
    "indonesian": "Pada tahap awal serangan, tanaman muda atau cabang menunjukkan tanda-tanda layu. Bagian yang terinfeksi membawa satu atau dua lubang tempat kotoran larva yang mirip dengan pelet menggantung dan menumpuk di dasar tanaman."
  },
  {
    "id": 38482,
    "english": "In advanced cases, the branch or the whole plant dries up.",
    "indonesian": "Pada kasus lanjutan, cabang atau seluruh tanaman mengering."
  },
  {
    "id": 38483,
    "english": "Berry Borer",
    "indonesian": "Penggerek Buah"
  },
  {
    "id": 38484,
    "english": "White Stem Borer",
    "indonesian": "Penggerek Batang Putih"
  },
  {
    "id": 38485,
    "english": "Shot Hole Borer",
    "indonesian": "Penggerek Lubang Peluru"
  },
  {
    "id": 38486,
    "english": "Red Borer",
    "indonesian": "Penggerek Merah"
  },
  {
    "id": 38487,
    "english": "This is an important disease causing economic loss particularly in arabica coffee.",
    "indonesian": "Ini adalah penyakit penting yang menyebabkan kerugian ekonomi terutama pada kopi arabika."
  },
  {
    "id": 38488,
    "english": "On the lower surface of the infected leaves, small pale yellowish spots appear early after the first rains in the season.",
    "indonesian": "Pada permukaan bagian bawah daun yang terinfeksi, bercak kecil berwarna kekuningan muda muncul pada awal musim hujan pertama."
  },
  {
    "id": 38489,
    "english": "These spots soon increase in size and number, and many such spots coalesce at severity causing premature defoliation.severe defoliation leads to debilitation of the bushes and results in poor cropping in the succeeding seasons.",
    "indonesian": "Bercak-brcak ini segera membesar dalam ukuran dan jumlah, dan banyak bercak seperti itu bergabung dengan keparahan yang menyebabkan pengguguran daun prematur. Pengguguran daun yang parah menyebabkan melemahnya semak dan menghasilkan hasil yang buruk pada musim-musim berikutnya."
  },
  {
    "id": 38490,
    "english": "Necrotic spots on the exposed surface of green berries enlarge and cover the major portion.",
    "indonesian": "Bercak nekrotik pada permukaan buah hijau yang terpapar membesar dan menutupi bagian utama."
  },
  {
    "id": 38491,
    "english": "Fruit skin shrivels and sticks fast to the parchment.",
    "indonesian": "Kulit buah mengkerut dan menempel kuat pada pergam"
  },
  {
    "id": 38492,
    "english": "The centers of the spots turn grayish-white and are encircled by a distinct ring (0.2–0.6 inches in diameter) of brown tissue",
    "indonesian": "Pusat bercak berubah menjadi putih keabu-abuan dan dikelilingi oleh cincin yang jelas (0,2–0,6 inci diameter) dari jaringan coklat"
  },
  {
    "id": 38493,
    "english": "Circular brown spots with light-brown/grey centers, surrounded by a wide dark brown ring and and yellow halos, around 15 mm wide appear on leaves",
    "indonesian": "Bercak coklat bulat dengan pusat berwarna coklat muda/abu-abu, dikelilingi oleh cincin coklat tua yang lebar dan dan aura kuning, sekitar 15 mm lebar muncul di daun"
  },
  {
    "id": 38494,
    "english": "The spots mostly occur between the veins and also on the margins. Sometimes spots grow into large blotches, and a leaf bligh occurs.",
    "indonesian": "Bercak-brcak ini sebagian besar terjadi di antara pembuluh darah dan juga di pinggirannya. Kadang-kadang bercak tumbuh menjadi bercak besar, dan kerontokan daun terjadi."
  },
  {
    "id": 38495,
    "english": "This usually happens in cooler, wet areas above 600 m altitude. Infections on the berries are generally smaller, around 5 mm wide, but sometimes they cover the whole berry.",
    "indonesian": "Ini biasanya terjadi di daerah yang lebih dingin dan basah di atas ketinggian 600 m. Infeksi pada buah-buahan umumnya lebih kecil, sekitar 5 mm lebar, tetapi kadang-kadang mereka menutupi seluruh buah."
  },
  {
    "id": 38496,
    "english": "Monitor for this disease and treat at early stages of development on berries and branches.",
    "indonesian": "Pantau penyakit ini dan lakukan penanganan pada tahap awal perkembangannya pada buah dan cabang."
  },
  {
    "id": 38497,
    "english": "Early symptoms may be leaf yellowing and drop of leaves that are found mid-branch, small 'spots or lesions' on ripening berries",
    "indonesian": "Gejala awal mungkin adalah kuning pada daun dan gugurnya daun yang ditemukan di tengah cabang, 'bintik-bintik atau lesi' kecil pada buah yang sedang matang"
  },
  {
    "id": 38498,
    "english": "Dark browning of lateral or vertical stem(s), vertical tip die-back, and premature berry death.",
    "indonesian": "Pembelokan gelap batang lateral atau vertikal, kematian ujung vertikal, dan kematian buah yang prematur."
  },
  {
    "id": 38499,
    "english": "Berry Blotch",
    "indonesian": "Bercak Buah"
  },
  {
    "id": 38500,
    "english": "Anthracnose / Dieback",
    "indonesian": "Antraknosa / Kematian Kembali"
  },
  {
    "id": 38501,
    "english": "Drying of entire crown.",
    "indonesian": "Pengeringan mahkota keseluruhan."
  },
  {
    "id": 38502,
    "english": "Cause extensive damage to roots and base of shoot.",
    "indonesian": "Menyebabkan kerusakan yang luas pada akar dan dasar tunas."
  },
  {
    "id": 38503,
    "english": "Leaves become yellow.",
    "indonesian": "Daun menjadi kuning."
  },
  {
    "id": 38504,
    "english": "Covered with black sooty mold.",
    "indonesian": "Ditutupi dengan jamur hitam."
  },
  {
    "id": 38505,
    "english": "Top leaves get dried up and lateral buds germinate.",
    "indonesian": "Daun paling atas mengering dan tunas lateral berkecambah."
  },
  {
    "id": 38506,
    "english": "In severe cases, it looks like fiery appearance.",
    "indonesian": "Dalam kasus yang parah, itu terlihat seperti penampilan yang membara."
  },
  {
    "id": 38507,
    "english": "It shows very slow growth of the plant.",
    "indonesian": "Ini menunjukkan pertumbuhan tanaman yang sangat lambat."
  },
  {
    "id": 38508,
    "english": "Infested leaves look white with black dots.",
    "indonesian": "Daun yang terinfeksi terlihat putih dengan bintik-bintik hitam."
  },
  {
    "id": 38509,
    "english": "Large number of white-colored nymphs and adults on the undersurface of the leaf.",
    "indonesian": "Jumlah besar nimfa berwarna putih dan dewasa di permukaan bawah daun."
  },
  {
    "id": 38510,
    "english": "Heavy secretion of honeydew leads to the development of sooty mold.",
    "indonesian": "Sekresi madu yang berat menyebabkan perkembangan jamur hitam."
  },
  {
    "id": 38511,
    "english": "Leaves become brittle and dry completely.",
    "indonesian": "Daun menjadi rapuh dan kering sepenuhnya."
  },
  {
    "id": 38512,
    "english": "Internodes constricted and shortened, with a number of boreholes.",
    "indonesian": "Internode terbatas dan dipersingkat, dengan sejumlah lubang bor."
  },
  {
    "id": 38513,
    "english": "Boreholes are plugged with fresh excreta in the nodal region.",
    "indonesian": "Lubang bor ditutupi dengan ekskreta segar di daerah nodal."
  },
  {
    "id": 38514,
    "english": "Frass materials are present on the affected portion.",
    "indonesian": "Material serpih hadir pada bagian yang terkena."
  },
  {
    "id": 38515,
    "english": "Stalks become discoloured and hollow.",
    "indonesian": "Batang menjadi berwarna buram dan berongga."
  },
  {
    "id": 38516,
    "english": "Internal tissues are reddened with intermingled transverse white spots",
    "indonesian": "Jaringan internal menjadi merah dengan bercampur bintik-bintik putih melintang"
  },
  {
    "id": 38517,
    "english": "A sour smell emanates.",
    "indonesian": "Mengeluarkan bau asam."
  },
  {
    "id": 38518,
    "english": "Whip like structure of 25 – 150 cm.Whip covered by translucent silvery membrane enclosing mass of black powdery spores.",
    "indonesian": "Struktur seperti cambuk sepanjang 25 – 150 cm. Cambuk ditutupi oleh membran perak transparan yang menampung massa spora berbubuk hitam."
  },
  {
    "id": 38519,
    "english": "Initial thin canes with elongated internodes later become reduced in length.",
    "indonesian": "Tunas awal yang tipis dengan internode yang memanjang kemudian menjadi berkurang panjangnya."
  },
  {
    "id": 38520,
    "english": "Profuse sprouting of lateral buds with narrow, erect leaves especially in ratoon crop",
    "indonesian": "Munculnya tunas samping yang banyak dengan daun sempit dan tegak terutama pada tanaman rebahan"
  },
  {
    "id": 38521,
    "english": "Rusty appearance on leaves",
    "indonesian": "Tampak karat pada daun"
  },
  {
    "id": 38522,
    "english": "Premature death of the leaf.",
    "indonesian": "Kematian daun yang prematur."
  },
  {
    "id": 38523,
    "english": "These spots are turn red-brown to brown in color",
    "indonesian": "Bintik-bintik ini berubah menjadi warna coklat kemerahan hingga coklat"
  },
  {
    "id": 38524,
    "english": "Proliferation of vegetative buds",
    "indonesian": "Proliferasi tunas vegetatif"
  },
  {
    "id": 38525,
    "english": "The tillers bear pale yellow to completely chlorotic leaves",
    "indonesian": "Tunas menyandang daun kuning muda hingga benar-benar klorotik"
  },
  {
    "id": 38526,
    "english": "The canes are thin with short internodes",
    "indonesian": "Tunasnya tipis dengan internode pendek"
  },
  {
    "id": 38527,
    "english": "Yellowing of the leaf midrib on the underside of the leaf",
    "indonesian": "Daun menguning pada tulang daun di bagian bawah daun"
  },
  {
    "id": 38528,
    "english": "Discoloration of leaves",
    "indonesian": "Pemutihan daun"
  },
  {
    "id": 38529,
    "english": "Bunchy appearance of the plant",
    "indonesian": "Tampak berumpun dari tanaman"
  },
  {
    "id": 38530,
    "english": "Smut (fungal)",
    "indonesian": "Jamur Sumbul"
  },
  {
    "id": 38531,
    "english": "Grassy shoot",
    "indonesian": "Tunas Rumput"
  },
  {
    "id": 38532,
    "english": "Yellow leaf disease(virus)",
    "indonesian": "Penyakit Daun Kuning (virus)"
  },
  {
    "id": 38533,
    "english": "Mango Hopper",
    "indonesian": "Hama Hopper Mangga"
  },
  {
    "id": 38534,
    "english": "Mango Mealy Bug",
    "indonesian": "Kutu Putih Mangga"
  },
  {
    "id": 38535,
    "english": "Mango Bark Eating Caterpillar",
    "indonesian": "Ulat Penggerek Kulit Mangga"
  },
  {
    "id": 38536,
    "english": "Mango Fruit Fly",
    "indonesian": "Lalat Buah Mangga"
  },
  {
    "id": 38537,
    "english": "Inflorescence Midge",
    "indonesian": "Midge Bunga"
  },
  {
    "id": 38538,
    "english": "Mango Stem Borer",
    "indonesian": "Penggerek Batang Mangga"
  },
  {
    "id": 38539,
    "english": "Mango Seed Weevil",
    "indonesian": "Kumbang Bijirin Mangga"
  },
  {
    "id": 38540,
    "english": "Mango Leaf Webber",
    "indonesian": "Pembuat Jaring Daun Mangga"
  },
  {
    "id": 38541,
    "english": "Mango Shoot Gall Psylla",
    "indonesian": "Psylla Gagal Tunas Mangga"
  },
  {
    "id": 38542,
    "english": "Mango malformation",
    "indonesian": "Malformasi Mangga"
  },
  {
    "id": 38543,
    "english": "Bacterial Canker",
    "indonesian": "Kanker Bakteri"
  },
  {
    "id": 38544,
    "english": "Mango Dieback",
    "indonesian": "Pengeringan Mangga"
  },
  {
    "id": 38545,
    "english": "Phoma Blight",
    "indonesian": "Penyakit Blight Phoma"
  },
  {
    "id": 38546,
    "english": "Mango Black Tip",
    "indonesian": "Ujung Hitam Mangga"
  },
  {
    "id": 38547,
    "english": "Adults and nymphs suck sap from tender shoots and flowers, causing drying of flowers and subsequent dropping. It secretes honeydew that develops sooty mold, reducing photosynthesis.",
    "indonesian": "Dewasa dan nimfa mengisap getah dari tunas dan bunga muda, menyebabkan pengeringan bunga dan penumpahan berikutnya. Itu mengeluarkan madu embun yang mengembangkan jamur hitam, mengurangi fotosintesis."
  },
  {
    "id": 38548,
    "english": "Heavy puncturing and continuous draining of the sap cause curling and drying of the infested tissue.",
    "indonesian": "Penusukan berat dan drainase berkelanjutan getah menyebabkan keriting dan pengeringan jaringan yang terinfeksi."
  },
  {
    "id": 38549,
    "english": "Hoppers shelter in the cracks and crevices of the bark or underside the leaves of the trees during the off season.",
    "indonesian": "Belalang berlindung di retakan dan celah-celah kulit atau bagian bawah daun pohon selama musim liburan."
  },
  {
    "id": 38550,
    "english": "Nymphs and adults suck plant sap and it secretes honey dew that develops sooty mould.",
    "indonesian": "Nimfa dan dewasa mengisap getah tanaman dan mengeluarkan embun madu yang mengembangkan jamur hitam."
  },
  {
    "id": 38551,
    "english": "Grub tunnels in the sapwood on the trunk or branches.",
    "indonesian": "Lorong larva di kayu gubal pada batang atau cabang."
  },
  {
    "id": 38552,
    "english": "Grub bore into the sapwood and making irregular tunnels.",
    "indonesian": "Larva membuat lorong ke kayu gubal dan membuat lorong yang tidak teratur."
  },
  {
    "id": 38553,
    "english": "Caterpillars bore into the trunk or junction of branches make zig zag galleries. Presence of gallery made out of silk and frass is the key symptom.",
    "indonesian": "Ulat penggerek membuat lorong di batang atau persimpangan cabang dan membuat galeri zig-zag. Kehadiran galeri yang terbuat dari sutera dan kotoran adalah gejala kunci."
  },
  {
    "id": 38554,
    "english": "Caterpillars remain hidden in the tunnel during day time, come out at night and feed on the bark.",
    "indonesian": "Ulat tetap tersembunyi di dalam lorong saat siang hari, keluar pada malam hari dan makan kulit kayu."
  },
  {
    "id": 38555,
    "english": "Due to infestation, flow of sap is hindered, plant growth arrested and fruit formation is drastically reduced",
    "indonesian": "Akibat infestasi, aliran getah terhambat, pertumbuhan tanaman terhenti dan pembentukan buah secara drastis berkurang"
  },
  {
    "id": 38556,
    "english": "The female punctures fruits with its pointed ovipositor and insert eggs inside.",
    "indonesian": "Betina menusuk buah dengan ovipositor berujung tajam dan memasukkan telur ke dalamnya."
  },
  {
    "id": 38557,
    "english": "Infested fruits exhibit puncture marks & oozing.",
    "indonesian": "Buah yang terinfeksi menunjukkan tanda-tanda tusukan dan rembesan."
  },
  {
    "id": 38558,
    "english": "After hatching, maggot feeds on the pulp of fruit which result in dropping & rottening of frui",
    "indonesian": "Setelah menetas, belatung memakan daging buah yang mengakibatkan buah jatuh dan membusuk."
  },
  {
    "id": 38559,
    "english": "After hatching, the maggot feeds on the pulp of the fruit, resulting in dropping and rotting of the fruit.",
    "indonesian": "Setelah menetas, belatung memakan daging buah yang mengakibatkan buah jatuh dan membusuk."
  },
  {
    "id": 38560,
    "english": "It attacks floral buds, tender fruits & tender leaves.",
    "indonesian": "Serangga ini menyerang tunas bunga, buah muda, dan daun muda."
  },
  {
    "id": 38561,
    "english": "The Infested mango buds, shoots and young fruits develop many small blister galls, about 3-4 mm long, each containing a yellow maggot.",
    "indonesian": "Tunas, tunas, dan buah muda mangga yang terinfeksi mengembangkan banyak kutil blister kecil, sekitar 3-4 mm panjangnya, masing-masing berisi belatung kuning."
  },
  {
    "id": 38562,
    "english": "In severe attacks the affected plant parts shrivel and die also small emergence holes may be detected on galls",
    "indonesian": "Pada serangan parah, bagian tanaman yang terkena mengkerut dan mati juga lubang kecil mungkin terdeteksi pada kutil."
  },
  {
    "id": 38563,
    "english": "In severe attacks the affected plant parts shrivel and die also small emergence holes may be detected on galls.",
    "indonesian": "Pada serangan parah, bagian tanaman yang terkena mengkerut dan mati juga lubang kecil mungkin terdeteksi pada kutil."
  },
  {
    "id": 38564,
    "english": "Grubs start feeding below the bark of branches making tunnels, subsequently bore into the main stem.",
    "indonesian": "Larva mulai makan di bawah kulit kayu cabang membuat terowongan, kemudian melubangi batang utama."
  },
  {
    "id": 38565,
    "english": "Frass coming out of the entry point indicates presence of trunk borer.",
    "indonesian": "Frass yang keluar dari titik masuk menunjukkan keberadaan penggerek batang."
  },
  {
    "id": 38566,
    "english": "Damage results in yellowing of leaves followed by drying of terminal shoots and branches, leading to the death of whole tree.",
    "indonesian": "Kerusakan mengakibatkan kuningnya daun diikuti oleh pengeringan tunas dan cabang terminal, menyebabkan kematian seluruh pohon."
  },
  {
    "id": 38567,
    "english": "Grub makes zigzag tunnels in pulp",
    "indonesian": "Larva membuat lorong zigzag dalam daging buah"
  },
  {
    "id": 38568,
    "english": "Eats unripe tissue and bore into cotyledon",
    "indonesian": "Memakan jaringan yang belum matang dan melubangi kotiledon"
  },
  {
    "id": 38569,
    "english": "Fruit dropping at marble stage",
    "indonesian": "Buah jatuh pada tahap marmer"
  },
  {
    "id": 38570,
    "english": "Oviposition injuries on marble sized fruits",
    "indonesian": "Cedera oviposisi pada buah berukuran marmer"
  },
  {
    "id": 38571,
    "english": "Larva is pale green with brown head and prothoracic shield.",
    "indonesian": "Larva berwarna hijau pucat dengan kepala cokelat dan perisai prothoracic."
  },
  {
    "id": 38572,
    "english": "Adult is brownish moth with wavy lines on forewings.Initially caterpillars feed on leaf surface gregariously by scrapping.Later they make web on tender shoots and leaves together and feed within.",
    "indonesian": "Dewasa adalah ngengat cokelat dengan garis-garis bergelombang di sayap depan. Awalnya ulat makan di permukaan daun secara berkelompok dengan menggaruk. Kemudian mereka membuat jaring pada tunas dan daun muda bersama-sama dan makan di dalamnya."
  },
  {
    "id": 38573,
    "english": "Several caterpillars may be found in a single webbed up cluster of leaves.",
    "indonesian": "Beberapa ulat dapat ditemukan dalam satu gugusan daun yang dijaring."
  },
  {
    "id": 38574,
    "english": "Nymphs suck cell sap from adjacent buds.",
    "indonesian": "Nimfa mengisap getah sel dari tunas yang berdekatan."
  },
  {
    "id": 38575,
    "english": "As a result of feeding, buds develop into hard conical green galls",
    "indonesian": "Akibat dari pemberian makanan, tunas berkembang menjadi kutil hijau kerucut yang keras"
  },
  {
    "id": 38576,
    "english": "Consequently, there is no flowering and fruit setting. Nymphs over winter inside the galls.",
    "indonesian": "Akibatnya, tidak ada berbunga dan berbuah. Nimfa berada di dalam kutil selama musim dingin."
  },
  {
    "id": 38577,
    "english": "Large infestations (3 or more maggots per plant) may cause wilting.",
    "indonesian": "Infestasi besar (3 atau lebih belatung per tanaman) dapat menyebabkan layu."
  },
  {
    "id": 38578,
    "english": "The young larvae feed on the chlorophyll of young leaves and skeletonize them.",
    "indonesian": "Ulat muda memakan klorofil daun muda dan mengeluarkan kerangka daun."
  },
  {
    "id": 38579,
    "english": "Light pale brownish yellow stout moth.",
    "indonesian": "Ngengat berwarna cokelat muda kekuningan yang kuat."
  },
  {
    "id": 38580,
    "english": "Forewings are olive green to pale brown with a dark brown circular spot in the center.",
    "indonesian": "Sayap depan berwarna hijau zaitun hingga cokelat muda dengan bintik cokelat gelap di tengahnya."
  },
  {
    "id": 38581,
    "english": "Due to attack by the insect, the leaves turn yellow and become curled.",
    "indonesian": "Akibat serangan oleh serangga, daun berubah menjadi kuning dan menggulung."
  },
  {
    "id": 38582,
    "english": "Chlorotic spots and sooty molds develop on the affected tissues.",
    "indonesian": "Bercak klorotik dan jamur jelaga berkembang pada jaringan yang terkena."
  },
  {
    "id": 38583,
    "english": "Scrapping of leaves, pinholes, or small to medium elongated holes.",
    "indonesian": "Mengikis daun, lubang jarum, atau lubang kecil hingga sedang yang memanjang."
  },
  {
    "id": 38584,
    "english": "Singular or closely grouped circular to irregularly shaped holes in foliage.",
    "indonesian": "Lubang tunggal atau berkelompok rapat, berbentuk bulat hingga tidak beraturan pada daun."
  },
  {
    "id": 38585,
    "english": "Can cause serious damage to soybean at all stages.",
    "indonesian": "Dapat menyebabkan kerusakan serius pada kedelai pada semua tahap."
  },
  {
    "id": 38586,
    "english": "Leaves look brownish-yellow in color.",
    "indonesian": "Daun berwarna kuning kecokelatan."
  },
  {
    "id": 38587,
    "english": "The final instar larvae feed on the leaves from the margin.",
    "indonesian": "Larva instar terakhir memakan daun dari pinggiran."
  },
  {
    "id": 38588,
    "english": "The damaged leaves of the plant appear in a skeletonized/net/web form.",
    "indonesian": "Daun yang rusak dari tanaman muncul dalam bentuk jaringan/net/web."
  },
  {
    "id": 38589,
    "english": "It attacks the leaves, flowers, stalks of panicle and fruits, causing superficial white powdery appearance on it",
    "indonesian": "Serangga ini menyerang daun, bunga, tangkai tandan dan buah, menyebabkan penampilan tepi berbentuk serbuk putih pada permukaannya"
  },
  {
    "id": 38590,
    "english": "The disease spread by wind very rapidly. Generally the infection starts from the inflorescence and spreads downwards covering the floral axis, tender leaves and soft stem.",
    "indonesian": "Penyakit ini menyebar dengan cepat oleh angin. Umumnya infeksi dimulai dari infloresensi dan menyebar ke bawah menutupi sumbu bunga, daun muda, dan batang yang lunak."
  },
  {
    "id": 38591,
    "english": "Flowers fail to open, blacken or become brown, dry and may fall from panicles",
    "indonesian": "Bunga gagal mekar, menjadi hitam atau cokelat, kering, dan mungkin jatuh dari tandan"
  },
  {
    "id": 38592,
    "english": "On leaves, lesions start as small, angular, brown to black spots that can enlarge to form extensive dead areas.",
    "indonesian": "Pada daun, lesi dimulai sebagai bintik-bintik kecil, berbentuk sudut, berwarna cokelat hingga hitam yang dapat membesar membentuk area mati yang luas."
  },
  {
    "id": 38593,
    "english": "The first symptoms on panicles are small black or dark-brown spots, which can enlarge coalesce and kill the flowers before fruits are produced. Petioles, twigs, and stems are also susceptible and develop into typical black colour.",
    "indonesian": "Gejala pertama pada tandan adalah bintik-bintik kecil berwarna hitam atau cokelat gelap, yang dapat membesar, menyatu, dan membunuh bunga sebelum buah diproduksi. Petiol, ranting, dan batang juga rentan dan berkembang menjadi warna hitam yang khas."
  },
  {
    "id": 38594,
    "english": "Twig dieback occurs when severe, elongated, blackened lesions form on stems and twigs die back apically.",
    "indonesian": "Kematian ranting terjadi ketika lesi yang parah, memanjang, dan menghitam terbentuk pada batang dan ranting mati kembali secara apikal."
  },
  {
    "id": 38595,
    "english": "Vegetative Malformation: It is more commonly found on young seedlings. It is characterized by disrupting of apical growth resulting in several small flushes..",
    "indonesian": "Malformasi Vegetatif: Lebih umum ditemukan pada bibit muda. Ditandai dengan gangguan pertumbuhan apikal yang menghasilkan beberapa flush kecil."
  },
  {
    "id": 38596,
    "english": "The multi-branching of shoot apex with scaly leaves is known as “Bunchy Top” or “Witches’ Broom”. The malformed seedlings, remain stunted and die.",
    "indonesian": "Perbanyakan multi-cabang pucuk tunas dengan daun bersisik dikenal sebagai “Bunchy Top” atau “Witches’ Broom”. Bibit yang cacat, tetap kerdil dan mati."
  },
  {
    "id": 38597,
    "english": "Floral Malformation: In malformation of inflorescens, shows variation in the panicle. Malformed head dries up in black mass and persist for long time",
    "indonesian": "Malformasi Bunga: Pada malformasi inflorescens, menunjukkan variasi pada tandan. Kepala yang cacat mengering dalam massa hitam dan bertahan lama"
  },
  {
    "id": 38598,
    "english": "The disease is noticed on leaves, leaf stalks, stems, twigs, branches and fruits, initially producing water-soaked lesions, later turning into typical canker.",
    "indonesian": "Penyakit ini terlihat pada daun, tangkai daun, batang, ranting, cabang, dan buah, awalnya menghasilkan lesi berair, kemudian berubah menjadi kanker tipikal."
  },
  {
    "id": 38599,
    "english": "Water-soaked irregular satellites to angular raised lesions measuring 1-4 mm in diameter are formed. These lesions are light yellow in colour, initially with yellow halo but with age enlarge or coalesce to form irregular necrotic cankerous patches with dark brown colour.",
    "indonesian": "Lesi berair tidak teratur yang berbentuk satelit hingga lesi yang menonjol berukuran 1-4 mm diameternya terbentuk. Lesi ini berwarna kuning muda, awalnya dengan halo kuning tetapi seiring bertambahnya usia membesar atau bergabung membentuk bercak nekrosis tidak teratur dengan warna cokelat gelap."
  },
  {
    "id": 38600,
    "english": "Water-soaked, dark brown to black-coloured lesions are observed which gradually developed into cankerous, raised or flat spots. These spots often, burst extruding gummy substances containing highly contagious bacterial cells",
    "indonesian": "Lesi berwarna cokelat tua hingga hitam yang berair diamati yang secara bertahap berkembang menjadi bercak kanker, menonjol atau datar. Bercak ini sering pecah mengeluarkan substansi getah yang mengandung sel bakteri yang sangat menular."
  },
  {
    "id": 38601,
    "english": "The pathogen causing dieback, tip dieback, graft union blight, twig blight, seedling rot, wood stain, stem-end rot, black root rot, fruit rot, dry rot, brown rot of panicle etc.",
    "indonesian": "Patogen yang menyebabkan kematian cabang, kematian ujung, layu persilangan, layu ranting, busuk bibit, noda kayu, busuk ujung batang, busuk akar hitam, busuk buah, busuk kering, busuk cokelat pada tandan, dll."
  },
  {
    "id": 38602,
    "english": "It is characterized by drying back of twigs from top to downwards, particularly in older trees followed by drying of leaves which gives an appearance of fire scorch.",
    "indonesian": "Ditandai dengan kekeringan kembali dari ranting dari atas ke bawah, terutama pada pohon-pohon yang lebih tua diikuti oleh pengeringan daun yang memberikan tampilan seperti terbakar."
  },
  {
    "id": 38603,
    "english": "Internal browning in wood tissue is observed when it is slit open along with the long axis.",
    "indonesian": "Pembusukan internal dalam jaringan kayu teramati ketika dibelah sepanjang sumbu panjangnya."
  },
  {
    "id": 38604,
    "english": "Symptoms of the disease are noticeable only on old leaves",
    "indonesian": "Gejala penyakit hanya terlihat pada daun tua."
  },
  {
    "id": 38605,
    "english": "Initially, the lesions are angular, minute, irregular, yellow to light brown, scattered over leaf lamina.",
    "indonesian": "Awalnya, lesi berbentuk sudut, kecil, tidak teratur, kuning hingga cokelat muda, tersebar di atas lamina daun."
  },
  {
    "id": 38606,
    "english": "As the lesions enlarge their colour changes from brown to cinnamon and they become almost irregular.",
    "indonesian": "Seiring lesi membesar, warnanya berubah dari cokelat menjadi kayu manis dan mereka menjadi hampir tidak teratur."
  },
  {
    "id": 38607,
    "english": "Symptoms become visible when the mango fruits attain marbel size",
    "indonesian": "Gejalanya menjadi terlihat ketika buah mangga mencapai ukuran marbel."
  },
  {
    "id": 38608,
    "english": "Small etiolated area develops near the distal end of the fruit which gradually spreads, turns nearly black and covers the tip of the fruit completely",
    "indonesian": "Area etiolasi kecil berkembang di dekat ujung distal buah yang secara bertahap menyebar, hampir menjadi hitam, dan menutupi ujung buah sepenuhnya."
  },
  {
    "id": 38609,
    "english": "The black area remains hard and the growth of the fruit is checked.",
    "indonesian": "Area hitam tetap keras dan pertumbuhan buah terhambat."
  },
  {
    "id": 38610,
    "english": "Hoppers shelter in the cracks and crevices of the bark or underside of the leaves of the trees during the off season.",
    "indonesian": "Belalang berlindung di retakan dan celah-celah kulit batang atau bagian bawah daun pohon selama musim sepi."
  },
  {
    "id": 38611,
    "english": "Nymphs and adults suck plant sap and secrete honeydew that develops sooty mold.",
    "indonesian": "Nimfa dan dewasa mengisap getah tanaman dan mengeluarkan madu embun yang berkembang menjadi jamur jelaga."
  },
  {
    "id": 38612,
    "english": "Grubs tunnel in the sapwood on the trunk or branches, making irregular tunnels.",
    "indonesian": "Ularan menggali di kayu gubal di batang atau ranting, membuat terowongan yang tidak beraturan."
  },
  {
    "id": 38613,
    "english": "Caterpillars bore into the trunk or junction of branches, making zigzag galleries. Presence of galleries made out of silk and frass is the key symptom.",
    "indonesian": "Ulat bulu membosankan ke batang atau persimpangan ranting, membuat galeri zigzag. Keberadaan galeri yang terbuat dari sutra dan kotoran adalah gejala kunci."
  },
  {
    "id": 38614,
    "english": "Caterpillars remain hidden in the tunnel during the daytime, come out at night, and feed on the bark.",
    "indonesian": "Ulat bulu tetap tersembunyi di dalam terowongan selama siang hari, keluar pada malam hari, dan makan kulit kayu."
  },
  {
    "id": 38615,
    "english": "Due to infestation, the flow of sap is hindered, plant growth is arrested, and fruit formation is drastically reduced.",
    "indonesian": "Akibat serangan, aliran getah terhambat, pertumbuhan tanaman terhenti, dan pembentukan buah secara drastis berkurang."
  },
  {
    "id": 38616,
    "english": "The female punctures fruits with its pointed ovipositor and inserts eggs inside.",
    "indonesian": "Betina menusuk buah dengan ovipositor berujung runcingnya dan menyuntikkan telur ke dalamnya."
  },
  {
    "id": 38617,
    "english": "Infested fruits exhibit puncture marks and oozing.",
    "indonesian": "Buah yang terinfeksi menunjukkan bekas tusukan dan mengeluarkan cairan."
  },
  {
    "id": 38618,
    "english": "It attacks floral buds, tender fruits, and tender leaves.",
    "indonesian": "Serangan ini menyerang kuncup bunga, buah muda, dan daun muda."
  },
  {
    "id": 38619,
    "english": "The infested mango buds, shoots, and young fruits develop many small blister galls, each containing a yellow maggot.",
    "indonesian": "Kuncup, tunas, dan buah muda mangga yang terinfeksi mengembangkan banyak bisul kecil, masing-masing berisi ulat berwarna kuning."
  },
  {
    "id": 38620,
    "english": "Grubs start feeding below the bark of branches, making tunnels, and subsequently bore into the main stem.",
    "indonesian": "Ularan mulai makan di bawah kulit kayu cabang, membuat terowongan, dan kemudian menggali ke batang utama."
  },
  {
    "id": 38621,
    "english": "Frass coming out of the entry point indicates the presence of the trunk borer.",
    "indonesian": "Kotoran yang keluar dari titik masuk menunjukkan adanya penggerek batang."
  },
  {
    "id": 38622,
    "english": "Damage results in yellowing of leaves, followed by drying of terminal shoots and branches, leading to the death of the whole tree.",
    "indonesian": "Kerusakan menyebabkan daun menguning, diikuti oleh pengeringan tunas dan cabang terminal, yang mengakibatkan kematian seluruh pohon."
  },
  {
    "id": 38623,
    "english": "Grubs make zigzag tunnels in pulp, eat unripe tissue, and bore into cotyledon.",
    "indonesian": "Ularan membuat terowongan zigzag di dalam pulpa, memakan jaringan belum matang, dan menggali ke dalam kotiledon."
  },
  {
    "id": 38624,
    "english": "Fruit dropping at the marble stage.",
    "indonesian": "Buah jatuh pada tahap marmer."
  },
  {
    "id": 38625,
    "english": "Oviposition injuries on marble-sized fruits.",
    "indonesian": "Cedera ovisiposisi pada buah berukuran marmer."
  },
  {
    "id": 38626,
    "english": "As a result of feeding, buds develop into hard conical green galls.",
    "indonesian": "Akibat makan, kuncup berkembang menjadi bisul hijau konikal keras."
  },
  {
    "id": 38687,
    "english": "Loosening",
    "indonesian": "Pelonggaran"
  },
  {
    "id": 38688,
    "english": "De-suckering",
    "indonesian": "Pemangkasan Tunas"
  },
  {
    "id": 38689,
    "english": "Pinching",
    "indonesian": "Penjepitan"
  },
  {
    "id": 38690,
    "english": "Earthing up",
    "indonesian": "Pelemparan Tanah"
  },
  {
    "id": 38691,
    "english": "Lifting up",
    "indonesian": "Mengangkat"
  },
  {
    "id": 38692,
    "english": "Support Trailing & Stalking",
    "indonesian": "Mendukung Rantai & Menyusuri"
  },
  {
    "id": 38693,
    "english": "Sweetpotato virus disease (SPVD)",
    "indonesian": "Penyakit Virus Ubi Jalar (SPVD)"
  },
  {
    "id": 38694,
    "english": "Potato mosaic disease",
    "indonesian": "Penyakit Mosaik Kentang"
  },
  {
    "id": 38695,
    "english": "Red scale",
    "indonesian": "Kutu Merah"
  },
  {
    "id": 38696,
    "english": "Rose curculios",
    "indonesian": "Kumbang Daun Mawar"
  },
  {
    "id": 38697,
    "english": "White flies",
    "indonesian": "Kutu Putih"
  },
  {
    "id": 38698,
    "english": "Root knot nematodes",
    "indonesian": "Nematoda Benang Akar"
  },
  {
    "id": 38724,
    "english": "Coffee Berry blotch",
    "indonesian": "Bercak Buah Kopi"
  },
  {
    "id": 38725,
    "english": "Coffee cercospora leaf spot",
    "indonesian": "Bercak Daun Cercospora Kopi"
  },
  {
    "id": 38735,
    "english": "Pigeon pea (Peru)",
    "indonesian": "Kacang Peru"
  },
  {
    "id": 38736,
    "english": "SIPAN",
    "indonesian": null
  },
  {
    "id": 38737,
    "english": "PROMPEX2000",
    "indonesian": null
  },
  {
    "id": 38738,
    "english": "La Negra",
    "indonesian": null
  },
  {
    "id": 38739,
    "english": "La Pacarana",
    "indonesian": null
  },
  {
    "id": 38741,
    "english": "Ants and mealy bugs pose a serious threat to pineapple production because the ants carry the mealy bugs from diseased plants onto healthy plants resulting in the spread of the disease throughout the field.",
    "indonesian": "Semut dan kutu sisik merupakan ancaman serius bagi produksi nanas karena semut membawa kutu sisik dari tanaman yang sakit ke tanaman yang sehat sehingga menyebabkan penyebaran penyakit di seluruh lapangan."
  },
  {
    "id": 38742,
    "english": "Severe infestations can cause wilting of the leaves with the leaves eventually turning orange-brown and withering.",
    "indonesian": "Serangan yang parah dapat menyebabkan layu pada daun dengan daun akhirnya berubah menjadi coklat-orange dan layu."
  },
  {
    "id": 38743,
    "english": "Control becomes more difficult if there are weeds and other local plants acting as hosts for the mealy bug. Initial control should be directed against the ants to ensure success.",
    "indonesian": "Pengendalian menjadi lebih sulit jika ada gulma dan tanaman lokal lain yang bertindak sebagai inang bagi kutu sisik. Pengendalian awal harus ditujukan terhadap semut untuk memastikan keberhasilan."
  },
  {
    "id": 38744,
    "english": "Pest nematodes are tiny slender unsegmented worms that infest plant roots, reducing root growth and causing root death thus reducing the plant’s ability to absorb water and nutrients.",
    "indonesian": "Nematoda hama adalah cacing kecil yang ramping dan tidak bersegmen yang menginfeksi akar tanaman, mengurangi pertumbuhan akar dan menyebabkan kematian akar sehingga mengurangi kemampuan tanaman untuk menyerap air dan nutrisi."
  },
  {
    "id": 38745,
    "english": "The result is a poorly developed root system causing stunting of plants.",
    "indonesian": "Hasilnya adalah sistem akar yang berkembang buruk menyebabkan pertumbuhan tanaman terhambat."
  },
  {
    "id": 38746,
    "english": "Leaves turn yellow and then red and are less erect than those of healthy plants. Tips are withered.",
    "indonesian": "Daun berubah menjadi kuning dan kemudian merah dan kurang tegak dibandingkan dengan tanaman yang sehat. Ujungnya layu."
  },
  {
    "id": 38747,
    "english": "Butterfly larvae",
    "indonesian": "Larva kupu-kupu"
  },
  {
    "id": 38748,
    "english": "Butterfly larvae can damage flowers.",
    "indonesian": "Larva kupu-kupu dapat merusak bunga."
  },
  {
    "id": 38749,
    "english": "The adult butterflies lay eggs when the plants are at the flowering stage.",
    "indonesian": "Kupu-kupu dewasa bertelur saat tanaman berada di tahap berbunga."
  },
  {
    "id": 38750,
    "english": "Fruits are also affected by larvae.",
    "indonesian": "Buah juga terpengaruh oleh larva."
  },
  {
    "id": 38751,
    "english": "Rodents",
    "indonesian": "Hewan pengerat"
  },
  {
    "id": 38752,
    "english": "Rats can be very destructive pests in pineapple fields and also pose a serious hazard to pineapples in storage",
    "indonesian": "Tikus dapat menjadi hama yang sangat merusak di kebun nanas dan juga menimbulkan bahaya serius bagi nanas yang disimpan."
  },
  {
    "id": 38753,
    "english": "Rats damage pineapples in the field when they bite, urinate and or defecate on the crop making the fruits unmarketable.",
    "indonesian": "Tikus merusak nanas di ladang ketika mereka menggigit, kencing, atau buang air besar pada tanaman sehingga membuat buah tidak dapat dipasarkan."
  },
  {
    "id": 38754,
    "english": "Even higher crop loss due to rodent damage may occur where pineapples are stored",
    "indonesian": "Kehilangan hasil tanaman yang lebih tinggi akibat kerusakan hewan pengerat mungkin terjadi di tempat penyimpanan nanas."
  },
  {
    "id": 38755,
    "english": "Mealybug wilt",
    "indonesian": "Layu kutu sisik"
  },
  {
    "id": 38756,
    "english": "The most visible symptom is a bright bronze to red colouration of the leaves of the young plant or a pinkish and/or yellowish colouration of the older leaves.",
    "indonesian": "Gejala yang paling terlihat adalah pewarnaan daun dari warna perunggu terang hingga merah pada tanaman muda atau pewarnaan daun yang kemerahan dan/atau kuning kecoklatan pada daun yang lebih tua."
  },
  {
    "id": 38757,
    "english": "Wilting starts at the tip of the leaves.",
    "indonesian": "Layu dimulai dari ujung daun."
  },
  {
    "id": 38758,
    "english": "If the plants continue to grow, the leaves lose turgidity and curl outwards",
    "indonesian": "Jika tanaman terus tumbuh, daun kehilangan turgor dan melengkung keluar."
  },
  {
    "id": 38759,
    "english": "These fungal problems are caused by various Phytophthora and Pythium species.",
    "indonesian": "Masalah jamur ini disebabkan oleh berbagai spesies Phytophthora dan Pythium."
  },
  {
    "id": 38760,
    "english": "The symptoms of root rots are a reduction in plant growth with the development of reddish coloured leaves and the browning of the leaf margins.",
    "indonesian": "Gejala busuk akar adalah penurunan pertumbuhan tanaman dengan perkembangan daun berwarna kemerahan dan penghitaman pinggiran daun."
  },
  {
    "id": 38761,
    "english": "Affected plants eventually die",
    "indonesian": "Tanaman yang terkena akhirnya mati."
  },
  {
    "id": 38762,
    "english": "Phytophthora heart rot",
    "indonesian": "Busuk hati Phytophthora"
  },
  {
    "id": 38763,
    "english": "The symptoms are rotting at the base of the leaves in the centre of the leaf whorl (heart) of young non-flowering plants.",
    "indonesian": "Gejalanya adalah pembusukan di dasar daun di pusat pusaran daun (hati) tanaman muda yang tidak berbunga."
  },
  {
    "id": 38764,
    "english": "In a more developed stage, young leaves can easily be pulled from the plant.",
    "indonesian": "Pada tahap yang lebih berkembang, daun muda dapat dengan mudah dicabut dari tanaman."
  },
  {
    "id": 38765,
    "english": "The base of the leaves eventually rots and has a bad smell.",
    "indonesian": "Dasar daun akhirnya membusuk dan berbau tidak sedap."
  },
  {
    "id": 38766,
    "english": "Fruitlet core rot",
    "indonesian": "Busuk inti buah kecil"
  },
  {
    "id": 38767,
    "english": "Fruitlet Core Rot is caused by a combination of Penicillium and Fusarium spp.",
    "indonesian": "Busuk inti buah kecil disebabkan oleh kombinasi Penicillium dan Fusarium spp."
  },
  {
    "id": 38768,
    "english": "Although the symptoms of this disease generally appear during storage, infection starts in the field. Mites are thought to be associated with this disease, through causing injury to the fruitlets.",
    "indonesian": "Meskipun gejala penyakit ini umumnya muncul selama penyimpanan, infeksi dimulai di lapangan. Kutu berhubungan dengan penyakit ini, melalui menyebabkan luka pada buah kecil."
  },
  {
    "id": 38769,
    "english": "The infected tissue of the fruit has a water-soaked appearance which eventually discolours becoming light to dark brown.",
    "indonesian": "Jaringan yang terinfeksi pada buah memiliki penampilan tergenang air yang akhirnya memudar menjadi coklat terang hingga coklat gelap."
  },
  {
    "id": 38770,
    "english": "The fungus attacks all aerial part parts and at any stage of plant growth.",
    "indonesian": "Jamur menyerang semua bagian udara dan pada setiap tahap pertumbuhan tanaman."
  },
  {
    "id": 38771,
    "english": "Symptoms are circular, black, sunken spots with dark center and bright red orange margins on leaves and pods.",
    "indonesian": "Gejalanya adalah bercak hitam, cekung, dengan pusat gelap dan pinggiran merah oranye cerah pada daun dan polong."
  },
  {
    "id": 38772,
    "english": "Irregular spots, and dead areas on leaves that often follow the veins of the leaves",
    "indonesian": "Bercak tidak teratur, dan area mati pada daun yang sering mengikuti urat daun"
  },
  {
    "id": 38773,
    "english": "Spots produced are small, numerous in number with pale brown centre and reddish brown margin.",
    "indonesian": "Bercak yang dihasilkan kecil, banyak jumlahnya dengan pusat coklat pucat dan pinggiran coklat kemerahan."
  },
  {
    "id": 38774,
    "english": "Small necrotic flecks that enlarge to form circular, tan or grey spots.",
    "indonesian": "Bintik nekrotik kecil yang membesar membentuk bercak bulat, coklat keabuan atau abu-abu."
  },
  {
    "id": 38775,
    "english": "The center of the lesions dry out and has a white appearance",
    "indonesian": "Pusat lesi mengering dan memiliki penampilan putih."
  },
  {
    "id": 38776,
    "english": "The affected leaves turn yellow in colour and brown irregular lesions appear on leaves.",
    "indonesian": "Daun yang terkena berubah menjadi kuning dan muncul bercak tidak teratur berwarna coklat pada daun."
  },
  {
    "id": 38777,
    "english": "The affected plants dry up gradually. When the tap root of the affected plant is split open, reddening of internal tissues is visible.",
    "indonesian": "Tanaman yang terkena mengering secara bertahap. Ketika akar utama tanaman yang terkena dibelah, pengerasan jaringan internal terlihat."
  },
  {
    "id": 38778,
    "english": "In the initial stages, the fungus causes seed rot, seedling blight and root rot symptoms.",
    "indonesian": "Pada tahap awal, jamur menyebabkan pembusukan benih, penyakit bibit dan gejala busuk akar."
  },
  {
    "id": 38779,
    "english": "The earliest symptoms appear on youngest leaves as chlorosis around some lateral veins and its branches near the margin.",
    "indonesian": "Gejala awal muncul pada daun muda sebagai klorosis di sekitar beberapa urat lateral dan cabangnya dekat tepi."
  },
  {
    "id": 38780,
    "english": "The leaves show curling of margin downwards.",
    "indonesian": "Daun menunjukkan kerut pada tepi bagian bawah."
  },
  {
    "id": 38781,
    "english": "The veins show reddish brown discolouration on the under surface which also extends to the petiole.",
    "indonesian": "Urat menunjukkan perubahan warna coklat kemerahan pada permukaan bagian bawah yang juga meluas ke pelepah."
  },
  {
    "id": 38782,
    "english": "White powdery patches appear on leaves and other green parts which later become dull coloured.",
    "indonesian": "Bercak bubuk putih muncul pada daun dan bagian hijau lainnya yang kemudian menjadi berwarna kusam."
  },
  {
    "id": 38783,
    "english": "In severe infections, foliage becomes yellow causing premature defoliation.",
    "indonesian": "Pada infeksi yang parah, dedaunan menjadi kuning menyebabkan penumpasan daun sebelum waktunya."
  },
  {
    "id": 38784,
    "english": "When the infection is severe, both the surfaces of the leaves are completely covered by whitish powdery growth.",
    "indonesian": "Ketika infeksi parah, kedua permukaan daun sepenuhnya ditutupi oleh pertumbuhan bubuk putih."
  },
  {
    "id": 38785,
    "english": "Similar spots also occur on branches and pods.",
    "indonesian": "Bercak serupa juga terjadi pada cabang dan polong."
  },
  {
    "id": 38786,
    "english": "Under favourable environmental conditions, severe leaf spotting and defoliation occurs at the time of flowering and pod formation.",
    "indonesian": "Di bawah kondisi lingkungan yang menguntungkan, terjadi penumpasan daun dan defoliasi yang parah pada saat berbunga dan pembentukan polong."
  },
  {
    "id": 38787,
    "english": "ther",
    "indonesian": "lain"
  },
  {
    "id": 38788,
    "english": "These enlarge gradually and turn as raised brown streaks spreading upwards.",
    "indonesian": "Ini membesar secara bertahap dan berubah menjadi garis coklat yang terangkat yang menjalar ke atas."
  },
  {
    "id": 38789,
    "english": "Plants are stunted and leaves dark green, mottled and reduced in size.",
    "indonesian": "Tanaman terhambat pertumbuhannya dan daun berwarna hijau tua, belang-belang, dan berukuran lebih kecil."
  },
  {
    "id": 38790,
    "english": "Normal leaves on the affected plants drop suddenly and dry.",
    "indonesian": "Daun normal pada tanaman yang terkena tiba-tiba gugur dan mengering."
  },
  {
    "id": 38791,
    "english": "Yellow Mosaic",
    "indonesian": "Mosaik Kuning"
  },
  {
    "id": 38792,
    "english": "Initially mild scattered yellow spots appear on young leaves.",
    "indonesian": "Awalnya bercak kuning yang ringan tersebar muncul pada daun muda."
  },
  {
    "id": 38793,
    "english": "The next trifoliate leaves emerging from the growing apex show irregular yellow and green patches alternating with each other.",
    "indonesian": "Daun trifoliate berikutnya yang muncul dari apex tumbuh menunjukkan bercak kuning dan hijau yang tidak teratur bergantian satu sama lain."
  },
  {
    "id": 38794,
    "english": "Spots gradually increase in size and ultimately some leaves turn completely yellow.",
    "indonesian": "Bercak secara bertahap membesar dan pada akhirnya beberapa daun berubah menjadi kuning sepenuhnya."
  },
  {
    "id": 38795,
    "english": "Leaves, inflorescence stalk, and young pods covered with dark-colored aphids",
    "indonesian": "Daun, tangkai infloresensi, dan polong muda tertutup oleh kutu daun berwarna gelap"
  },
  {
    "id": 38796,
    "english": "Leaf mottling and crinkling, and plant dwarfing",
    "indonesian": "Bercak daun dan kerutan, dan tanaman kerdil"
  },
  {
    "id": 38797,
    "english": "Honeydew secretion with black ant movements",
    "indonesian": "Sekresi madu embun dengan gerakan semut hitam"
  },
  {
    "id": 38798,
    "english": "The adult blister beetle primarily feeds on flowers",
    "indonesian": "Kumbang blister dewasa pada dasarnya memakan bunga"
  },
  {
    "id": 38799,
    "english": "Feeding damage can also be found on tender leaves and shoots",
    "indonesian": "Kerusakan pakan juga dapat ditemukan pada daun dan tunas muda"
  },
  {
    "id": 38800,
    "english": "The beetles often attack beans in swarms but generally in small patches within the field",
    "indonesian": "Kumbang sering menyerang kacang dalam gerombolan tetapi umumnya dalam remasan kecil di dalam lapangan"
  },
  {
    "id": 38801,
    "english": "Buds, flowers, and young pods with boreholes",
    "indonesian": "Tunas, bunga, dan polong muda dengan lubang bor"
  },
  {
    "id": 38802,
    "english": "Presence of slug-like caterpillar",
    "indonesian": "Keberadaan ulat mirip siput"
  },
  {
    "id": 38803,
    "english": "Defoliation in early stages",
    "indonesian": "Penumpasan daun pada tahap awal"
  },
  {
    "id": 38804,
    "english": "Larva's head alone thrust inside the pods and the rest of the body hanging out",
    "indonesian": "Kepala larva tertanam sendirian di dalam polong dan bagian tubuh lainnya menggantung di luar"
  },
  {
    "id": 38805,
    "english": "Pods with round holes",
    "indonesian": "Polong dengan lubang bulat"
  },
  {
    "id": 38806,
    "english": "Grass blue butterfly",
    "indonesian": "Kupu-kupu biru rumput"
  },
  {
    "id": 38807,
    "english": "Buds, flowers, and young pods with boreholes and presence of slug-like caterpillar",
    "indonesian": "Tunas, bunga, dan polong muda dengan lubang bor dan keberadaan ulat mirip siput"
  },
  {
    "id": 38808,
    "english": "Larval entry hole on the pod is plugged with excreta",
    "indonesian": "Lubang masuk larva pada polong disumbat dengan kotoran"
  },
  {
    "id": 38809,
    "english": "Pod damage is characterized by multiple holes per pod, made by individual larva",
    "indonesian": "Kerusakan pada polong ditandai dengan beberapa lubang per polong, yang dibuat oleh larva individu"
  },
  {
    "id": 38810,
    "english": "Leafhopper",
    "indonesian": "Walang sangit"
  },
  {
    "id": 38811,
    "english": "Leaves mottled and yellowish in color",
    "indonesian": "Daun bercak dan kuning dalam warna"
  },
  {
    "id": 38812,
    "english": "Green color insects found under the surface of leaves",
    "indonesian": "Serangga berwarna hijau ditemukan di bawah permukaan daun"
  },
  {
    "id": 38813,
    "english": "Yellowing of leaves from tip to downwards",
    "indonesian": "Daun menguning dari ujung ke bawah"
  },
  {
    "id": 38814,
    "english": "Lab lab bug or Stink bug",
    "indonesian": "Kutu Lab-lab atau Kutu Bau"
  },
  {
    "id": 38815,
    "english": "Both nymphs and adults cluster on the tender shoots and suck the sap",
    "indonesian": "Baik nimfa maupun dewasa berkumpul pada tunas muda dan mengisap getah"
  },
  {
    "id": 38816,
    "english": "Heavily infested vines dry and shed away",
    "indonesian": "Tanaman yang terinfestasi berat kering dan rontok"
  },
  {
    "id": 38817,
    "english": "Moderately infested plants remain weak and stunted in growth",
    "indonesian": "Tanaman yang terinfestasi sedang tetap lemah dan terhambat pertumbuhannya"
  },
  {
    "id": 38818,
    "english": "Pod bugs",
    "indonesian": "Kutu Polong"
  },
  {
    "id": 38819,
    "english": "Pods with black spots",
    "indonesian": "Polong dengan bercak hitam"
  },
  {
    "id": 38820,
    "english": "Shedding of green pods",
    "indonesian": "Rontoknya polong hijau"
  },
  {
    "id": 38821,
    "english": "Poorly filled pods with shriveled grains inside",
    "indonesian": "Polong yang tidak terisi dengan biji yang kering di dalamnya"
  },
  {
    "id": 38822,
    "english": "Spiny pod borer",
    "indonesian": "Penggerek Polong Berduri"
  },
  {
    "id": 38823,
    "english": "Dropping of flowers and young pods",
    "indonesian": "Rontoknya bunga dan polong muda"
  },
  {
    "id": 38824,
    "english": "Older pods marked with a brown spot where a larva has entered",
    "indonesian": "Polong yang lebih tua ditandai dengan bercak coklat di mana larva telah masuk"
  },
  {
    "id": 38825,
    "english": "Caterpillar first feeds on foliage, later bores into pods and feeds on seeds",
    "indonesian": "Ulat pertama kali memakan daun, kemudian menggerek polong dan memakan biji"
  },
  {
    "id": 38826,
    "english": "Spotted Pod Borer",
    "indonesian": "Penggerek Polong Berbintik"
  },
  {
    "id": 38827,
    "english": "Whitish growth of fungus",
    "indonesian": "Pertumbuhan jamur berwarna putih kusam"
  },
  {
    "id": 38828,
    "english": "Pods turn brown to black",
    "indonesian": "Polong berubah menjadi coklat hingga hitam"
  },
  {
    "id": 38829,
    "english": "Stem Girdler",
    "indonesian": "Pemotong Batang"
  },
  {
    "id": 38830,
    "english": "Beans become discolored as a result of infection",
    "indonesian": "Kacang menjadi mengalami perubahan warna sebagai akibat dari infeksi"
  },
  {
    "id": 38831,
    "english": "Earliest symptom is the appearance of a greyish brown water soaked lesion on the outer bark",
    "indonesian": "Gejala awal adalah munculnya lesi berwarna abu-abu kecoklatan yang terendam air pada kulit kayu luar"
  },
  {
    "id": 38832,
    "english": "Cankers appear either on the main trunk, jorquettes or fan branches",
    "indonesian": "Kanker muncul baik pada batang utama, jorquettes, atau cabang kipas"
  },
  {
    "id": 38833,
    "english": "A reddish brown liquid oozes out from these lesions, which later dries up to form rusty deposits",
    "indonesian": "Cairan berwarna coklat kekuningan mengalir keluar dari lesi ini, yang kemudian mengering membentuk endapan berkarat"
  },
  {
    "id": 38834,
    "english": "First indication of the disease is a characteristic yellowing of one or two leaves on the second or third flush behind the growing tip",
    "indonesian": "Tanda pertama penyakit ini adalah kuning khas satu atau dua daun pada flush kedua atau ketiga di belakang ujung pertumbuhan"
  },
  {
    "id": 38835,
    "english": "Diseased leaves fall within a few days of turning yellow and the other leaves on the shoot show similar symptoms",
    "indonesian": "Daun yang sakit gugur dalam beberapa hari setelah berubah menjadi kuning dan daun lainnya pada tunas menunjukkan gejala serupa"
  },
  {
    "id": 38836,
    "english": "When the infected shoot is split lengthwise there is always a characteristic brown streaking",
    "indonesian": "Ketika tunas yang terinfeksi dibelah memanjang selalu terdapat coretan coklat khas"
  },
  {
    "id": 38837,
    "english": "Colonizes on the tender parts of the plant",
    "indonesian": "Berkolonisasi pada bagian-bagian tanaman yang lembut"
  },
  {
    "id": 38838,
    "english": "Stunting, chlorosis, and defoliation",
    "indonesian": "Pertumbuhan terhambat, klorosis, dan pengguguran daun"
  },
  {
    "id": 38839,
    "english": "Circular water-soaked spots around the feeding punctures",
    "indonesian": "Bercak basah berbentuk lingkaran di sekitar lubang tusukan makanan"
  },
  {
    "id": 38840,
    "english": "Punctures appear as reddish brown spots",
    "indonesian": "Lubang tusukan muncul sebagai bercak coklat kemerahan"
  },
  {
    "id": 38841,
    "english": "Leaves curl up, badly deformed, and shoots dry up",
    "indonesian": "Daun bergulung, sangat cacat, dan tunas mengering"
  },
  {
    "id": 38842,
    "english": "Nymphs and adults suck the sap from flowers, tender shoots, and pods",
    "indonesian": "Nimfa dan dewasa mengisap getah dari bunga, tunas muda, dan polong"
  },
  {
    "id": 38843,
    "english": "Excrete honey dew",
    "indonesian": "Mengekskresikan madu embun"
  },
  {
    "id": 38844,
    "english": "Development of sooty mold fungus on the leaves and pods",
    "indonesian": "Pertumbuhan jamur jelaga pada daun dan polong"
  },
  {
    "id": 38845,
    "english": "Colonize on the underside of tender leaves, succulent stem, flower buds, and small cherelles",
    "indonesian": "Berkolonisasi pada bagian bawah daun yang lembut, batang yang lembut, tunas bunga, dan cerel"
  },
  {
    "id": 38846,
    "english": "Premature shedding of flowers and curling of leaves",
    "indonesian": "Pengguguran dini bunga dan bergulungnya daun"
  },
  {
    "id": 38847,
    "english": "Wilting and distortion of leaves and young shoots",
    "indonesian": "Pengeringan dan distorsi daun dan tunas muda"
  },
  {
    "id": 38848,
    "english": "Girdler the branches and inserts whitish spindle shaped eggs singly into the tissue in a slanting manner",
    "indonesian": "Membelit cabang dan menyisipkan telur berbentuk fusiform putih ke dalam jaringan dengan cara miring"
  },
  {
    "id": 38849,
    "english": "Branches above the girdle wither and dry",
    "indonesian": "Cabang di atas ikatannya layu dan mengering"
  },
  {
    "id": 38850,
    "english": "Wilting of branches",
    "indonesian": "Pelayuan cabang"
  },
  {
    "id": 38852,
    "english": "Coffee (saudi arabia)",
    "indonesian": "Kopi (Arab Saudi)"
  },
  {
    "id": 38853,
    "english": "Khawlani",
    "indonesian": "Khawlani"
  },
  {
    "id": 38854,
    "english": "Al Adini",
    "indonesian": "Al Adini"
  },
  {
    "id": 38855,
    "english": "Al Tuffahi",
    "indonesian": "Al Tuffahi"
  },
  {
    "id": 38856,
    "english": "Al Tisawa",
    "indonesian": "Al Tisawa"
  },
  {
    "id": 38857,
    "english": "Berri",
    "indonesian": "Berri"
  },
  {
    "id": 38858,
    "english": "Harari",
    "indonesian": "Harari"
  },
  {
    "id": 38859,
    "english": "Bahri",
    "indonesian": "Bahri"
  },
  {
    "id": 38860,
    "english": "Dark, dull or blue-green leaves",
    "indonesian": "Daun yang gelap, kusam, atau berwarna hijau kebiruan"
  },
  {
    "id": 38861,
    "english": "Leaves look burnt at the tip",
    "indonesian": "Daun terlihat terbakar di ujungnya"
  },
  {
    "id": 38862,
    "english": "Yellowing and white interveinal stripping of lower leaves",
    "indonesian": "Pembungaan kuning dan garis putih di antara urat daun bagian bawah"
  },
  {
    "id": 38863,
    "english": "Vegetative buds instead of reproductive buds",
    "indonesian": "Tunas vegetatif bukan tunas reproduktif"
  },
  {
    "id": 38864,
    "english": "SythenticFertilizerNitrogenUnit",
    "indonesian": "Unit Pupuk Nitrogen Sintetis"
  },
  {
    "id": 38865,
    "english": "SythenticFertilizerPhosphorousUnit",
    "indonesian": "Unit Pupuk Fosfor Sintetis"
  },
  {
    "id": 38866,
    "english": "SythenticFertilizerPotassiumUnit",
    "indonesian": "Unit Pupuk Kalium Sintetis"
  },
  {
    "id": 38867,
    "english": "Milligram per Litter per Acre",
    "indonesian": "Miligram per Liter per Acre"
  },
  {
    "id": 38868,
    "english": "Milligram per Litter per Hectare",
    "indonesian": "Miligram per Liter per Hektar"
  },
  {
    "id": 38869,
    "english": "Milliliter per Litter per Acre",
    "indonesian": "Mililiter per Liter per Acre"
  },
  {
    "id": 38870,
    "english": "Milliliter per Litter per Hectare",
    "indonesian": "Mililiter per Liter per Hektar"
  },
  {
    "id": 38871,
    "english": "Milligram per litre per acre",
    "indonesian": "Miligram per liter per hektar"
  },
  {
    "id": 38872,
    "english": "Milligram per litre per hectare",
    "indonesian": "Miligram per liter per hektar"
  },
  {
    "id": 38873,
    "english": "Yellow leaves",
    "indonesian": "Daun kuning"
  },
  {
    "id": 38874,
    "english": "Circular to irregular-shaped water-soaked spots on leaves.",
    "indonesian": "Bintik-bintik berbentuk air di daun berbentuk bulat hingga tidak beraturan."
  },
  {
    "id": 38875,
    "english": "Broad yellow hollow may be seen around lesions.",
    "indonesian": "Lubang kuning luas mungkin terlihat di sekitar luka."
  },
  {
    "id": 38876,
    "english": "Round black spots on leaves",
    "indonesian": "Bintik hitam bulat di daun"
  },
  {
    "id": 38877,
    "english": "Spots enlarged and concentric rings in a bull's eye pattern seen in the center of the diseased area",
    "indonesian": "Bintik-bintik membesar dan cincin konsentrik dalam pola mata banteng terlihat di tengah area yang terkena penyakit"
  },
  {
    "id": 38878,
    "english": "Infected tubers shows a brown, corky dry rot.",
    "indonesian": "Umbi yang terinfeksi menunjukkan pembusukan kering coklat, berongga."
  },
  {
    "id": 38879,
    "english": "Plants shows dwarfing",
    "indonesian": "Tanaman menunjukkan kerdil"
  },
  {
    "id": 38880,
    "english": "If affected tubers cut across, the browning of the xylem vessel is seen, and upon squeezing, the whitish bacterial oozes out.",
    "indonesian": "Jika umbi terkena, pemotongan melintang, pengerutan pembuluh xilema terlihat, dan saat diperas, bakteri putih mengalir keluar."
  },
  {
    "id": 38881,
    "english": "Plant shows wilting",
    "indonesian": "Tanaman menunjukkan layu"
  },
  {
    "id": 38882,
    "english": "Arial tubers",
    "indonesian": "Umbi udara"
  },
  {
    "id": 38883,
    "english": "On tubers, black sclerotial bodies are formed.",
    "indonesian": "Pada umbi, tubuh sklerotial hitam terbentuk."
  },
  {
    "id": 38884,
    "english": "Raised, hard, black patches on the surface of the tuber",
    "indonesian": "Bercak hitam yang timbul, keras di permukaan umbi"
  },
  {
    "id": 38885,
    "english": "Wilting of leaves",
    "indonesian": "Pelayuan daun"
  },
  {
    "id": 38886,
    "english": "Light-brown honey dew in the head just after flowering",
    "indonesian": "Dembun madu cokelat muda di kepala tepat setelah berbunga"
  },
  {
    "id": 38887,
    "english": "The black purple, cattle-horn like, ergots covered with white sphacelia are produced in the infected flowers replacing the seeds",
    "indonesian": "Ergot hitam ungu, seperti tanduk sapi, tertutup oleh sfacelia putih dihasilkan dalam bunga yang terinfeksi menggantikan biji"
  },
  {
    "id": 38888,
    "english": "Sugary droplets on the infected flower parts.",
    "indonesian": "Tetesan gula di bagian bunga yang terinfeksi"
  },
  {
    "id": 38889,
    "english": "The lesions are drab, rectangular to long oval and about 2-5 x 1-2 mm in size.",
    "indonesian": "Lesi kusam, berbentuk persegi panjang hingga oval panjang dan sekitar 2-5 x 1-2 mm."
  },
  {
    "id": 38890,
    "english": "Leaf Lesion",
    "indonesian": "Lesi daun"
  },
  {
    "id": 38891,
    "english": "Swelling lessions at early spring",
    "indonesian": "Pembengkakan lesi di awal musim semi"
  },
  {
    "id": 38892,
    "english": "Reddish brown to iron rust colour lessions",
    "indonesian": "Lesi berwarna coklat kemerahan hingga karat besi"
  },
  {
    "id": 38893,
    "english": "Blackened stems and shrivelled grain",
    "indonesian": "Batang yang menghitam dan biji yang mengkerut"
  },
  {
    "id": 38894,
    "english": "The lesions are at first purplish black small spots and then become round and ash white",
    "indonesian": "Lesi pada awalnya adalah bintik-bintik kecil berwarna ungu kehitaman dan kemudian menjadi bulat dan berwarna putih abu-abu"
  },
  {
    "id": 38895,
    "english": "Leaf blight with rolling from leaf tip",
    "indonesian": "Busuk daun dengan bergulung dari ujung daun"
  },
  {
    "id": 38896,
    "english": "Death of immature leaves",
    "indonesian": "Kematian daun yang belum matang"
  },
  {
    "id": 38897,
    "english": "Branch dieback",
    "indonesian": "Kematian kembali cabang"
  },
  {
    "id": 38898,
    "english": "Thinning of the canopy.",
    "indonesian": "Penipisan kanopi"
  },
  {
    "id": 38899,
    "english": "Wilted, yellowed, or browned leaves.",
    "indonesian": "Daun layu, menguning, atau memerah."
  },
  {
    "id": 38900,
    "english": "The stems develop water-soaked spots which later may be covered with a cottony white growth.",
    "indonesian": "Batang mengembangkan bintik-bintik yang berair yang kemudian mungkin tertutup dengan pertumbuhan putih berbulu."
  },
  {
    "id": 38901,
    "english": "As the disease progresses, affected portions of the stem develop a bleached appearance, and eventually the tissues shred.",
    "indonesian": "Seiring perkembangan penyakit, bagian-bagian batang yang terkena mengembangkan penampilan yang memudar, dan akhirnya jaringan mengelupas."
  },
  {
    "id": 38902,
    "english": "Girdling of the stem results in premature ripening and in lodging of plants.",
    "indonesian": "Pengikatan batang menghasilkan pematangan prematur dan penumpukan tanaman."
  },
  {
    "id": 38903,
    "english": "Stem become hollow due to internal rotting.",
    "indonesian": "Batang menjadi berongga akibat pembusukan internal."
  },
  {
    "id": 38904,
    "english": "Midrib cracking of lower leaves, browning of veins and withering is observed.",
    "indonesian": "Retakan di tulang daun bawah, pengerutan pembuluh dan layu diamati."
  },
  {
    "id": 38905,
    "english": "In severe cases, the vesicular bundles of the stem also turn brown and the plant collapses.",
    "indonesian": "Pada kasus yang parah, bundel vesikular batang juga berubah menjadi coklat dan tanaman roboh."
  },
  {
    "id": 38906,
    "english": "Patches of the crop wilt, exhibit stunted growth and have swollen, misshapen roots which decay by rotting.",
    "indonesian": "Patches tanaman layu, menunjukkan pertumbuhan yang terhambat dan memiliki akar bengkak, tidak beraturan yang membusuk."
  },
  {
    "id": 38907,
    "english": "Tiny nodules to large club shaped outgrowths develop in root system.",
    "indonesian": "Nodul kecil hingga pertumbuhan keluar berbentuk klub besar berkembang dalam sistem akar."
  },
  {
    "id": 38908,
    "english": "Leaves turn pale green or yellow followed by wilting and under severe conditions the plants die",
    "indonesian": "Daun berubah menjadi hijau muda atau kuning diikuti oleh layu dan di bawah kondisi yang parah tanaman mati"
  },
  {
    "id": 38909,
    "english": "Leaf spots initially are angular, translucent, light green, later developing into grayish-white irregular necrotic (dead) patches.",
    "indonesian": "Bintik-bintik pada daun pada awalnya berbentuk sudut, transparan, hijau muda, kemudian berkembang menjadi bercak nekrotik (mati) tidak beraturan berwarna putih keabu-abuan."
  },
  {
    "id": 38910,
    "english": "The stems of flower clusters become swollen.",
    "indonesian": "Batang dari kelompok bunga menjadi bengkak."
  },
  {
    "id": 38911,
    "english": "Frequently associated with white rust. May develop late in the season on turnip-type (Polish) canola varieties.",
    "indonesian": "Sering dikaitkan dengan karat putih. Mungkin berkembang di akhir musim pada varietas kanola tipe turnip (Polandia)."
  },
  {
    "id": 38912,
    "english": "Damping-off may occur if plants are infected at the seedling stage due to infected seed.",
    "indonesian": "Penyakit rebah bisa terjadi jika tanaman terinfeksi pada tahap benih karena benih yang terinfeksi."
  },
  {
    "id": 38913,
    "english": "Plants affected after the seedling stage may be stunted. Generalized leaf spots, becoming numerous across the field, have been observed in fall-planted crops after initial windblown spore (ascospore) infections.",
    "indonesian": "Tanaman yang terpengaruh setelah tahap benih mungkin terhambat pertumbuhannya. Bercak daun yang tersebar luas, menjadi banyak di seluruh lapangan, telah diamati pada tanaman yang ditanam di musim gugur setelah infeksi spora awal (ascospore) yang terbawa angin."
  },
  {
    "id": 38914,
    "english": "Brown-to-black rot can be found inside affected stems. Vascular tissues may turn black in color prior to external rot symptoms.",
    "indonesian": "Pembusukan berwarna coklat hingga hitam dapat ditemukan di dalam batang yang terkena. Jaringan vaskular dapat berubah menjadi hitam sebelum gejala pembusukan eksternal muncul."
  },
  {
    "id": 38915,
    "english": "Hard black bodies, the sclerotia, are formed inside the stem and occasionally on the stem surface.",
    "indonesian": "Benda hitam keras, sklerotia, terbentuk di dalam batang dan kadang-kadang di permukaan batang."
  },
  {
    "id": 38916,
    "english": "First signs are red, yellow or purple colours at the ends or edges of older leaves, then yellowing in the middle of the leaf.",
    "indonesian": "Tanda-tanda pertama adalah warna merah, kuning atau ungu di ujung atau tepi daun yang lebih tua, kemudian kuning di bagian tengah daun."
  },
  {
    "id": 38917,
    "english": "Late infected plants show leaf symptoms but are not stunted and have lower yield loss.",
    "indonesian": "Tanaman yang terinfeksi secara terlambat menunjukkan gejala daun tetapi tidak terhambat pertumbuhannya dan memiliki kerugian hasil yang lebih rendah."
  },
  {
    "id": 38918,
    "english": "Colours are more intense between leaf veins and on the upper side of the leaf.",
    "indonesian": "Warnanya lebih intens di antara urat daun dan di sisi atas daun."
  },
  {
    "id": 38919,
    "english": "Verticillium wilt in canola most often appear near the end of the season as the plants begin to ripen.",
    "indonesian": "Layu Verticillium pada kanola paling sering muncul menjelang akhir musim saat tanaman mulai matang."
  },
  {
    "id": 38920,
    "english": "While the stem is still green, a vertical yellow or brown band extending up one side of the stem may be visible.",
    "indonesian": "Sementara batang masih hijau, sebuah pita kuning atau coklat vertikal yang membentang di satu sisi batang mungkin terlihat."
  },
  {
    "id": 38921,
    "english": "Infected plants are often stunted and pale, and produce fewer flowers, branches and pods.",
    "indonesian": "Tanaman yang terinfeksi seringkali terhambat pertumbuhannya dan pucat, dan menghasilkan lebih sedikit bunga, cabang, dan polong."
  },
  {
    "id": 38922,
    "english": "Yellow to brown spots on the upper leaf surface  which have white dust-like spores on the corresponding under leaf surface.",
    "indonesian": "Bercak kuning hingga coklat pada permukaan daun bagian atas yang memiliki spora putih berdebu di permukaan daun bawah yang sesuai."
  },
  {
    "id": 38923,
    "english": "Swellings on roots and stems",
    "indonesian": "Pembengkakan pada akar dan batang"
  },
  {
    "id": 38924,
    "english": "Flowers get malformed and become sterile.",
    "indonesian": "Bunga menjadi cacat dan menjadi steril."
  },
  {
    "id": 38925,
    "english": "First symptoms may appear as small, light green spots, which later turn white and finally result in blister-like, raised, white pustules, usually on the lower leaf surface.",
    "indonesian": "Gejala pertama mungkin muncul sebagai bercak hijau kecil, yang kemudian berubah menjadi putih dan akhirnya menghasilkan pustula putih seperti blister, biasanya di bagian bawah permukaan daun."
},
{
    "id": 38926,
    "english": "Seed pedicels may terminate and form staghorns without seeds developing. Seed yield and quality are severely reduced.",
    "indonesian": "Pedisel biji bisa berhenti dan membentuk tanduk-tanduk tanpa biji berkembang. Hasil biji dan kualitasnya sangat berkurang."
},
{
    "id": 38927,
    "english": "Pustules can develop on the upper or lower leaf surfaces or on stems and consist of masses of sporangia.",
    "indonesian": "Pustula dapat berkembang di permukaan daun atas atau bawah atau di batang dan terdiri dari massa sporangia."
},
{
    "id": 38928,
    "english": "All floral parts are transformed into green leafy structures followed by abundant vein clearing in different flower parts.",
    "indonesian": "Semua bagian bunga berubah menjadi struktur daun hijau yang diikuti oleh pembersihan vena yang melimpah di bagian bunga yang berbeda."
},
{
    "id": 38929,
    "english": "In severe infection, the entire inflorescences is replaced by short twisted leaves closely arranged on a stem with short internodes, abundant abnormal branches bend down",
    "indonesian": "Pada infeksi yang parah, seluruh infloresensi digantikan oleh daun pendek yang melingkar erat diatur pada batang dengan internode pendek, cabang abnormal yang melimpah membungkuk ke bawah"
},
{
    "id": 38930,
    "english": "Finally, plants look like witches broom.",
    "indonesian": "Akhirnya, tanaman terlihat seperti sapu penyihir."
},
{
    "id": 38931,
    "english": "Plants of all stage are affected.",
    "indonesian": "Tanaman dari semua tahap terpengaruh."
},
{
    "id": 38932,
    "english": "Water soaked, small and irregular spots are formed on the leaves which later increases and turn brown, under favourable conditions.",
    "indonesian": "Bercak basah, kecil, dan tidak beraturan terbentuk di daun yang kemudian membesar dan berubah menjadi coklat, di bawah kondisi yang menguntungkan."
},
{
    "id": 38933,
    "english": "Leaves become dry and brittle, severely infected leaves defoliate",
    "indonesian": "Daun menjadi kering dan rapuh, daun yang terinfeksi parah gugur"
},
{
    "id": 38934,
    "english": "Disease appears as small, angular brown leaf spots of 3 mm diameter with gray center and dark margin delimited by veins.",
    "indonesian": "Penyakit muncul sebagai bercak daun coklat kecil yang berbentuk angular dengan diameter 3 mm dengan pusat abu-abu dan tepi gelap yang dibatasi oleh urat."
},
{
    "id": 38935,
    "english": "In severity of the disease defoliation occurs.",
    "indonesian": "Pada keparahan penyakit terjadi defoliasi."
},
{
    "id": 38936,
    "english": "Under favourable conditions, the disease spreads to leaf petiole, stem and capsules producing linear dark coloured deep seated lesions.",
    "indonesian": "Di bawah kondisi yang menguntungkan, penyakit menyebar ke tangkai daun, batang, dan kapsul menghasilkan lesi berwarna gelap yang dalam dan berbentuk linear."
},
{
    "id": 38937,
    "english": "The fungus attacks young seedling, their stem become water soaked soft and incapable of supporting the seedling which falls over and dies.",
    "indonesian": "Jamur menyerang bibit muda, batang mereka menjadi basah dan lembut dan tidak mampu menopang bibit yang jatuh dan mati."
},
{
    "id": 38938,
    "english": "On older seedlings elongated brownish black lesions appear which increase in length and width girdling",
    "indonesian": "Pada bibit yang lebih tua, lesi coklat kehitaman muncul yang bertambah panjang dan lebarnya mengelilingi."
},
{
    "id": 38939,
    "english": "The stem and plant dies.",
    "indonesian": "Batang dan tanaman mati."
},
{
  "id": 38940,
  "english": "The leaves turn yellow and then dry up slowly.",
  "indonesian": "Daun-daun berubah menjadi kuning dan kemudian mengering perlahan-lahan."
},
{
  "id": 38941,
  "english": "Begin drying of leaf tip downwards.",
  "indonesian": "Mulai mengering dari ujung daun ke bawah."
},
{
  "id": 38942,
  "english": "The entire plant shows complete drying of the foliage",
  "indonesian": "Seluruh tanaman menunjukkan pengeringan lengkap pada daun-daunnya."
},
{
  "id": 38943,
  "english": "Leaves turn to pale green.",
  "indonesian": "Daun-daun berubah menjadi hijau pucat."
},
{
  "id": 38944,
  "english": "On leaves, cottony white mycelial growth develops and appears white.",
  "indonesian": "Di atas daun, pertumbuhan miselium putih berbulu berkembang dan tampak putih."
},
{
  "id": 38945,
  "english": "White downy growth appears on the surface of the leaves.",
  "indonesian": "Pertumbuhan berbulu putih muncul pada permukaan daun."
},
{
  "id": 38946,
  "english": "Botrytis is the major disease of onions in cool climate areas.",
  "indonesian": "Botrytis adalah penyakit utama pada bawang di daerah dengan iklim sejuk."
},
{
  "id": 38947,
  "english": "Light infections do not affect yields but heavy infections causing major yield reductions can occur.",
  "indonesian": "Infeksi ringan tidak mempengaruhi hasil tetapi infeksi berat yang menyebabkan penurunan hasil besar dapat terjadi."
},
{
  "id": 38948,
  "english": "Hundreds of white specks are seen on the foliage.",
  "indonesian": "Ratusan bintik putih terlihat pada daun-daun."
},
{
  "id": 38949,
  "english": "Seedlings topple after emerging from soil.",
  "indonesian": "Bibit tumbang setelah muncul dari tanah."
},
{
  "id": 38950,
  "english": "It occurs at ground or below ground level.",
  "indonesian": "Ini terjadi di permukaan tanah atau di bawah permukaan tanah."
},
{
  "id": 38951,
  "english": "Infected tissues appear soft and water soaked.",
  "indonesian": "Jaringan yang terinfeksi terlihat lembut dan basah."
},
{
  "id": 38952,
  "english": "Black smut sori are seen at the base of the leaves and leaf surface.",
  "indonesian": "Sori smut hitam terlihat di pangkal daun dan permukaan daun."
},
{
  "id": 38953,
  "english": "Black powdery mass is seen after rupturing of sorus wall.",
  "indonesian": "Massa bubuk hitam terlihat setelah pecahnya dinding sori."
},
{
  "id": 38954,
  "english": "The infection progresses inward from leaf to leaf",
  "indonesian": "Infeksi berkembang ke dalam dari satu daun ke daun lainnya."
},
{
  "id": 38955,
  "english": "The initial symptoms are yellowing and dieback of leaf tips.",
  "indonesian": "Gejala awal adalah kuning dan kematian ujung daun."
},
{
  "id": 38956,
  "english": "Later, scales, stem plates and roots get destroyed.",
  "indonesian": "Kemudian, sisik, pelat batang, dan akar hancur."
},
{
  "id": 38957,
  "english": "The bulbs become soft and water soaked.",
  "indonesian": "Umbi menjadi lunak dan basah."
},
{
  "id": 38958,
  "english": "Begins as small, elliptical lesions.",
  "indonesian": "Dimulai sebagai lesi kecil, elips."
},
{
  "id": 38959,
  "english": "Lesions turn purplish-brown progressively surrounded by chlorotic margins.",
  "indonesian": "Lesi berubah menjadi coklat keunguan secara bertahap dikelilingi oleh tepi klorotik."
},
{
  "id": 38960,
  "english": "Lesions begin at tip of older leaves and accumulate on the leaves making it fall off",
  "indonesian": "Lesi dimulai di ujung daun yang lebih tua dan menumpuk pada daun-daun sehingga daunnya jatuh."
},
{
  "id": 38961,
  "english": "Yellow to orange colored small flecks develop in the middle of the leaf.",
  "indonesian": "Bercak kecil berwarna kuning hingga oranye berkembang di tengah-tengah daun."
},
{
  "id": 38962,
  "english": "Flecks spread to form elongated, spindle shaped to ovate, diffused spots.",
  "indonesian": "Bercak menyebar membentuk bercak yang memanjang, berbentuk spindle hingga oval, dan diffused."
},
{
  "id": 38963,
  "english": "Flecks are surrounded by a characteristic pink margin.",
  "indonesian": "Bercak dikelilingi oleh tepi berwarna merah muda yang khas."
},
{
  "id": 38964,
  "english": "Abnormal elongation of the neck.",
  "indonesian": "Pemanjangan abnormal pada leher."
},
{
  "id": 38965,
  "english": "Water-soaked lesions that are pale yellow in color appear initially on leaf blades.",
  "indonesian": "Lesi yang berwarna kuning pucat yang basah muncul pada awalnya pada helai daun."
},
{
  "id": 38966,
  "english": "Infected leaves develop yellow streaks that spread progressively leading to yellow leaves.",
  "indonesian": "Daun yang terinfeksi mengembangkan garis kuning yang menyebar secara progresif menyebabkan daun kuning."
},
{
  "id": 38967,
  "english": "Leaves curl and plants wilt.",
  "indonesian": "Daun menggulung dan tanaman layu."
},
{
  "id": 38968,
  "english": "Bulbs do not grow to full size although they are firm and solid.",
  "indonesian": "Umbi tidak tumbuh sampai ukuran penuh meskipun mereka kokoh dan padat."
},
{
  "id": 38969,
  "english": "Leaves show lesions that maybe diamond or spindle-shaped.",
  "indonesian": "Daun menunjukkan lesi yang mungkin berbentuk berlian atau spindle."
},
{
  "id": 38970,
  "english": "They are straw-colored and sometimes have distinct green center with yellow borders.",
  "indonesian": "Mereka berwarna jerami dan kadang-kadang memiliki pusat hijau yang jelas dengan tepi kuning."
},
{
  "id": 38971,
  "english": "Flower stalks are infected in later stages.",
  "indonesian": "Batang bunga terinfeksi pada tahap-tahap selanjutnya."
},
{
  "id": 38972,
  "english": "Reduced bulb size",
  "indonesian": "Ukuran umbi berkurang"
},
{
  "id": 38973,
  "english": "Roots turn pink or maroon when infected.",
  "indonesian": "Akar berubah menjadi merah muda atau marun saat terinfeksi."
},
{
  "id": 38974,
  "english": "In severe cases the roots may die and the plants become weakened",
  "indonesian": "Pada kasus yang parah, akar dapat mati dan tanaman menjadi lemah"
},
{
  "id": 38975,
  "english": "Infection usually is through neck tissues as foliage dies down at maturity.",
  "indonesian": "Infeksi biasanya melalui jaringan leher saat daun mati pada tahap kematangan."
},
{
  "id": 38976,
  "english": "Infected bulbs are discoloured black around the neck, and affected scales shrivel.",
  "indonesian": "Umbi yang terinfeksi mengalami perubahan warna menjadi hitam di sekitar leher, dan sisik yang terkena mengkerut."
},
{
  "id": 38977,
  "english": "Masses of powdery black spores develop as streaks along veins on and between outer dry scale",
  "indonesian": "Massa spora hitam berbentuk bubuk berkembang sebagai garis sepanjang urat pada dan di antara sisik kering luar."
},
{
  "id": 38978,
  "english": "Infected bulbs are discoloured green around the neck, and affected scales shrivel.",
  "indonesian": "Umbi yang terinfeksi berwarna hijau di sekitar leher, dan sisik yang terkena mengkerut."
},
{
  "id": 38979,
  "english": "Masses of powdery green spores generally are arranged as streaks along veins on",
  "indonesian": "Massa spora hijau berbentuk bubuk umumnya disusun sebagai garis sepanjang urat pada"
},
{
  "id": 38980,
  "english": "Bacterial soft rot is mainly a problem on mature bulbs.",
  "indonesian": "Busuk lunak bakteri pada umumnya menjadi masalah pada umbi yang sudah matang."
},
{
  "id": 38981,
  "english": "Affected scales first appear water-soaked and pale yellow to light brown.",
  "indonesian": "Sisik yang terkena terlihat pertama kali basah dan berwarna kuning pucat hingga coklat muda."
},
{
  "id": 38982,
  "english": "As the soft rot progresses, invaded fleshy scales become soft",
  "indonesian": "Seiring dengan perkembangan busuk lunak, sisik berdaging yang terinfeksi menjadi lunak"
},
{
  "id": 38983,
  "english": "Leaves turn yellow",
  "indonesian": "Daun berubah menjadi kuning"
},
{
  "id": 38984,
  "english": "Main root system rots away.",
  "indonesian": "Sistem akar utama membusuk."
},
{
  "id": 38985,
  "english": "Tea bush eventually dies.",
  "indonesian": "Semak teh akhirnya mati."
},
{
  "id": 38986,
  "english": "Decline of the bush",
  "indonesian": "Penurunan semak"
},
{
  "id": 38987,
  "english": "Wood bears superficial irregular dark‐grey to black raised patches",
  "indonesian": "Kayu membawa bercak naik tidak teratur dari abu-abu gelap hingga hitam"
},
{
  "id": 38988,
  "english": "Dead branches carry small black patches.",
  "indonesian": "Cabang mati membawa bercak hitam kecil."
},
{
  "id": 38989,
  "english": "Yellow or brown foliage on affected branches",
  "indonesian": "Daun kuning atau coklat pada cabang yang terkena"
},
{
  "id": 38990,
  "english": "Lesions at the collar region of the bush",
  "indonesian": "Lesi di daerah kerah semak"
},
{
  "id": 38991,
  "english": "Dead wood can be seen by scraping back the bark",
  "indonesian": "Kayu mati dapat terlihat dengan menggosok kembali kulit kayu"
},
{
  "id": 38992,
  "english": "Small, oval, pale yellow-green spots appearing on young leaves.",
  "indonesian": "Bercak kecil, oval, berwarna hijau kuning pucat muncul pada daun muda."
},
{
  "id": 38993,
  "english": "Spots are surrounded by a narrow, yellow zone.",
  "indonesian": "Bercak dikelilingi oleh zona kuning yang sempit."
},
{
  "id": 38994,
  "english": "Eventually, the dried tissue falls, leading to defoliation",
  "indonesian": "Akhirnya, jaringan yang kering jatuh, menyebabkan defoliasi"
},
{
  "id": 38995,
  "english": "Seedlings develop yellowish cotyledons and may be reddish on the underside; seedlings may die within two to four weeks after planting.",
  "indonesian": "Bibit mengembangkan kotiledon berwarna kuning kecoklatan dan mungkin berwarna kemerahan di bagian bawah; bibit bisa mati dalam dua hingga empat minggu setelah ditanam."
},
{
  "id": 38996,
  "english": "Leaves may have a bluish-green cast.",
  "indonesian": "Daun mungkin memiliki warna hijau kebiruan."
},
{
  "id": 38997,
  "english": "Roots are grayish or light brown, water-soaked, and have a reduced mass.",
  "indonesian": "Akar berwarna keabu-abuan atau coklat muda, basah, dan memiliki massa yang berkurang."
},
{
  "id": 38998,
  "english": "Plants appear stunted and yellow.",
  "indonesian": "Tanaman terlihat kerdil dan kuning."
},
{
  "id": 38999,
  "english": "Lateral and fibrous roots are reduced.",
  "indonesian": "Akar lateral dan serabut berkurang."
},
{
  "id": 39000,
  "english": "Existing roots may be black and rotted.",
  "indonesian": "Akar yang ada mungkin hitam dan membusuk."
},
{
  "id": 39001,
  "english": "Seedlings fail to emerge or die soon after emergence.",
  "indonesian": "Bibit gagal muncul atau mati segera setelah muncul."
},
{
  "id": 39002,
  "english": "Plants appear stunted, yellow or reddish-purple lower leaves, may be wilted.",
  "indonesian": "Tanaman terlihat kerdil, daun bawah kuning atau merah ungu kemerahan, mungkin layu."
},
{
  "id": 39003,
  "english": "Taproots have tan to brown or red-brown to black lesions and can be rotted just below the crown",
  "indonesian": "Akar utama memiliki lesi warna coklat muda hingga coklat atau coklat merah hingga hitam dan dapat membusuk tepat di bawah mahkota."
},
{
  "id": 39004,
  "english": "If emergence occurs, plants appear stunted, yellowish, may be wilted.",
  "indonesian": "Jika munculnya terjadi, tanaman terlihat kerdil, kekuningan, mungkin layu."
},
{
  "id": 39005,
  "english": "Roots appear waterlogged, mushy, rotted.",
  "indonesian": "Akar terlihat tergenang air, lembek, membusuk."
},
{
  "id": 39006,
  "english": "Stunted plants have many spindly, shortened stems and small, light green to yellow leaflets.",
  "indonesian": "Tanaman kerdil memiliki banyak batang yang kurus, pendek, dan daun kecil berwarna hijau muda hingga kuning."
},
{
  "id": 39007,
  "english": "Outer vascular taproot tissue becomes yellow to dark golden brown.",
  "indonesian": "Jaringan pembuluh darah luar akar utama berubah menjadi kuning hingga coklat keemasan tua."
},
{
  "id": 39008,
  "english": "Leaves may be cupped.",
  "indonesian": "Daun mungkin terlipat."
},
{
  "id": 39009,
  "english": "Tan, sunken, and elliptical lesions develop on the taproot where lateral roots emerge",
  "indonesian": "Lesi berwarna coklat muda, cekung, dan elips berkembang di akar utama tempat akar lateral muncul"
},
{
  "id": 39010,
  "english": "During the winter, existing root lesions turn black.",
  "indonesian": "Selama musim dingin, lesi akar yang ada menjadi hitam."
},
{
  "id": 39011,
  "english": "Scattered, wilted plants are the first evidence.",
  "indonesian": "Tanaman yang tersebar dan layu adalah bukti pertama."
},
{
  "id": 39012,
  "english": "One side of the stem may wilt and die or the whole plant may be affected.",
  "indonesian": "Salah satu sisi batang mungkin layu dan mati atau seluruh tanaman dapat terpengaruh."
},
{
  "id": 39013,
  "english": "Stems and leaves appear bleached",
  "indonesian": "Batang dan daun terlihat memudar"
},
{
  "id": 39014,
  "english": "Stem tips wilt and bend forming a 'shepherd's crook'",
  "indonesian": "Ujung batang layu dan melengkung membentuk 'tongkat gembala'"
},
{
  "id": 39015,
  "english": "Diamond-shaped, ash-gray lesions with dark-brown to purple borders develop on lower stems.",
  "indonesian": "Lesi berbentuk berlian, abu-abu dengan tepian coklat tua hingga ungu berkembang di batang bawah."
},
{
  "id": 39016,
  "english": "Lesions may girdle the stem, causing plants to wilt, drop leaves, and have straw-colored shoots.",
  "indonesian": "Lesi mungkin mengelilingi batang, menyebabkan tanaman layu, daun rontok, dan memiliki tunas berwarna jerami."
},
{
  "id": 39017,
  "english": "Systemic symptoms, such as chlorosis, generally appear on the second leaf, and all the subsequent leaves and panicles of the infected plant show symptoms.",
  "indonesian": "Gejala sistemik, seperti klorosis, umumnya muncul pada daun kedua, dan semua daun dan malai berikutnya dari tanaman yang terinfeksi menunjukkan gejala."
},
{
  "id": 39018,
  "english": "Leaf symptoms begin as chlorosis at the base of the leaf lamina, and successively higher leaves show a progression of greater leaf area coverage by the symptoms.",
  "indonesian": "Gejala daun dimulai sebagai klorosis di dasar lamina daun, dan daun yang semakin tinggi menunjukkan perkembangan penutupan area daun yang lebih besar oleh gejala tersebut."
},
{
  "id": 39019,
  "english": "Infected chlorotic areas produce a massive amount of asexual spores, generally on the lower surface, giving the leaf a 'downy' appearance.",
  "indonesian": "Area klorotik yang terinfeksi menghasilkan sejumlah besar spora aseksual, umumnya pada permukaan bawah, memberi daun penampilan 'berbulu'."
},
{
  "id": 39020,
  "english": "Rust symptoms first appear on lower leaves as typical pustules containing reddish-brown powder (uredospores).",
  "indonesian": "Gejala karat pertama muncul pada daun bagian bawah sebagai pustula tipikal yang berisi bubuk coklat kemerahan (uredospora)."
},
{
  "id": 39021,
  "english": "Later, dark brown teliospores are produced. Symptoms can occur on both the upper and lower surfaces of the leaves but mostly on the upper surface and also on the stem. Highly susceptible cultivars develop large pustules on leaf blades and sheaths.",
  "indonesian": "Kemudian, teliospora coklat gelap diproduksi. Gejala dapat terjadi pada kedua permukaan daun, tetapi sebagian besar pada permukaan atas dan juga pada batang. Varietas yang sangat rentan mengembangkan pustula besar pada helai daun dan selubung."
},
{
  "id": 39022,
  "english": "It appears, generally after the grain-filling stage, causing little or no loss in grain yield.",
  "indonesian": "Muncul, umumnya setelah tahap pengisian biji, menyebabkan sedikit atau tidak ada kerugian hasil biji."
},
{
  "id": 39023,
  "english": "In the infected florets, ovaries are converted into structures called sori.",
  "indonesian": "Pada bunga yang terinfeksi, ovarium diubah menjadi struktur yang disebut sori."
},
{
  "id": 39024,
  "english": "The sori are larger than grains and appear as enlarged, oval to conical bodies projecting somewhat beyond the glumes in place of grains. Initially,",
  "indonesian": "Sori lebih besar dari biji dan muncul sebagai tubuh yang membesar, oval hingga kerucut yang menonjol agak melebihi glum dalam bentuk biji. Pada awalnya,"
},
{
  "id": 39025,
  "english": "The sori are bright green but later turn brown to black",
  "indonesian": "Sori berwarna hijau terang tetapi kemudian berubah menjadi coklat hingga hitam"
},
{
  "id": 39026,
  "english": "The disease is easily identified as a honeydew substance of creamy to light pinkish ooze out of the infected florets which contains numerous conidia.",
  "indonesian": "Penyakit ini mudah dikenali sebagai zat madu berwarna krem hingga merah muda muda yang mengalir keluar dari bunga yang terinfeksi yang berisi banyak konidia."
},
{
  "id": 39027,
  "english": "Within two weeks, these droplets dry out as hard dark black structures larger than seeds, protruding out from the florets in place of grain, which are called sclerotia.",
  "indonesian": "Dalam waktu dua minggu, tetesan ini mengering menjadi struktur hitam gelap keras yang lebih besar dari biji, menonjol keluar dari bunga daripada biji, yang disebut sklerotium."
},
{
  "id": 39028,
  "english": "Here the loss in grain yield is directly proportional to the percentage of infection as the infected seed is fully transformed into sclerotium.",
  "indonesian": "Di sini kerugian hasil biji secara langsung berbanding lurus dengan persentase infeksi karena biji yang terinfeksi sepenuhnya berubah menjadi sklerotium."
},
{
  "id": 39029,
  "english": "Whip-like structure of 25 – 150 cm. Whip covered by translucent silvery membrane enclosing a mass of black powdery spores.",
  "indonesian": "Struktur seperti cambuk dari 25 - 150 cm. Cambuk tertutup membran transparan berwarna perak yang menutupi massa spora berbubuk hitam."
},
{
  "id": 39030,
  "english": "These spots turn red-brown to brown in color",
  "indonesian": "Bintik-bintik ini berubah menjadi coklat merah hingga coklat."
},
{
  "id": 39031,
  "english": "Affected leaves are brittle with their margins rolled upwards.",
  "indonesian": "Daun yang terpengaruh rapuh dengan pinggirannya yang menggulung ke atas."
},
{
  "id": 39032,
  "english": "Do not produce bunches of any commercial value",
  "indonesian": "Tidak menghasilkan tandan dengan nilai komersial apa pun"
},
{
  "id": 39033,
  "english": "Yellowing of lower leaves, including leaf blades and petioles.",
  "indonesian": "Penguningan daun bagian bawah, termasuk helai daun dan pelepah."
},
{
  "id": 39034,
  "english": "Yellowish to reddish streaks are noted with intensification of color towards the rhizome.",
  "indonesian": "Garis-garis kuning hingga kemerahan dicatat dengan intensifikasi warna menuju rimpang."
},
{
  "id": 39035,
  "english": "Longitudinal splitting of pseudostem.",
  "indonesian": "Pemisahan memanjang pada pseudostem."
},
{
  "id": 39036,
  "english": "Infected fruits become black and rotten.",
  "indonesian": "Buah yang terinfeksi menjadi hitam dan membusuk."
},
{
  "id": 39037,
  "english": "Black lesions on the pedicel.",
  "indonesian": "Lesi hitam pada pedisel."
},
{
  "id": 39038,
  "english": "Fruit shrivelled",
  "indonesian": "Buah kering"
},
{
  "id": 39039,
  "english": "Reduced bunch size and uneven ripening of fruit",
  "indonesian": "Ukuran tandan yang berkurang dan pematangan buah yang tidak merata"
},
{
  "id": 39040,
  "english": "Reduces the plant's photosynthetic potential.",
  "indonesian": "Mengurangi potensi fotosintesis tanaman."
},
{
  "id": 39041,
  "english": "Defoliation",
  "indonesian": "Pengguguran daun"
},
{
  "id": 39042,
  "english": "Small water-soaked tan spots on outer leaves",
  "indonesian": "Bintik-bintik kecoklatan kecil yang berair pada daun bagian luar"
},
{
  "id": 39043,
  "english": "Shot-hole appearance on the plant",
  "indonesian": "Penampilan lubang tembak pada tanaman"
},
{
  "id": 39044,
  "english": "Outer leaves often break off",
  "indonesian": "Daun bagian luar sering patah"
},
{
  "id": 39045,
  "english": "Soft watery lesions on leaves",
  "indonesian": "Lesi air yang lembut pada daun"
},
{
  "id": 39046,
  "english": "Leaves collapse and lie on the soil surface",
  "indonesian": "Daun roboh dan terbaring di permukaan tanah"
},
{
  "id": 39047,
  "english": "Black fungal structures on infected leaf tissue",
  "indonesian": "Struktur jamur hitam pada jaringan daun yang terinfeksi"
},
{
  "id": 39048,
  "english": "White fungal growth on both sides of leaves",
  "indonesian": "Pertumbuhan jamur putih di kedua sisi daun"
},
{
  "id": 39049,
  "english": "Leaves turning yellow or brown",
  "indonesian": "Daun berubah menjadi kuning atau coklat"
},
{
  "id": 39050,
  "english": "Small black fruiting bodies may be visible",
  "indonesian": "Struktur buah kecil berwarna hitam mungkin terlihat"
},
{
  "id": 39051,
  "english": "Small chlorotic spots on old leaves",
  "indonesian": "Bintik-bintik klorotik kecil pada daun tua"
},
{
  "id": 39052,
  "english": "Lesions may fall out creating holes",
  "indonesian": "Lesi mungkin terjatuh dan membentuk lubang"
},
{
  "id": 39053,
  "english": "Wilting leaves and plant death",
  "indonesian": "Daun layu dan kematian tanaman"
},
{
  "id": 39054,
  "english": "Veins enlarged and clear",
  "indonesian": "Pembuluh darah melebar dan jelas"
},
{
  "id": 39055,
  "english": "Puckered or ruffled leaves",
  "indonesian": "Daun mengerut atau berkerut"
},
{
  "id": 39056,
  "english": "Upright outer leaves",
  "indonesian": "Daun luar tegak"
},
{
  "id": 39057,
  "english": "Circular lesions and black patches on chili pods",
  "indonesian": "Lesi bulat dan bercak hitam pada polong cabai"
},
{
  "id": 39058,
  "english": "Irregular brown spots with dark brown holes on leaves and stems",
  "indonesian": "Bintik-bintik coklat tidak teratur dengan lubang berwarna coklat gelap pada daun dan batang"
},
{
  "id": 39059,
  "english": "The affected fruits may fall off subsequently",
  "indonesian": "Buah yang terkena mungkin akan rontok kemudian"
},
{
  "id": 39060,
  "english": "Black lesions on stems",
  "indonesian": "Lesi hitam pada batang"
},
{
  "id": 39061,
  "english": "Circular gray-brown lesions on leaves and wilting of the plant",
  "indonesian": "Lesi abu-abu-coklat bulat pada daun dan layu tanaman"
},
{
  "id": 39062,
  "english": "Dark lesions on fruit which may be covered in white sporangia",
  "indonesian": "Lesi gelap pada buah yang mungkin ditutupi oleh sporangium putih"
},
{
  "id": 39063,
  "english": "Upward curling in the leaves, crinkling appearance",
  "indonesian": "Daun yang melengkung ke atas, tampilan keriput"
},
{
  "id": 39064,
  "english": "Shortening of petioles, internodes, and bunchy leaves",
  "indonesian": "Pendeknya petiol, internode, dan daun berumpun"
},
{
  "id": 39065,
  "english": "Severe stunting in plants",
  "indonesian": "Pertumbuhan terhambat yang parah pada tanaman"
},
{
  "id": 39066,
  "english": "The leaves turn yellow and die",
  "indonesian": "Daun berubah menjadi kuning dan mati"
},
{
  "id": 39067,
  "english": "Initial slight yellowing of the foliage and wilting of the upper leaves",
  "indonesian": "Daun menguning sedikit pada awalnya dan layu pada daun bagian atas"
},
{
  "id": 39068,
  "english": "The vascular system of the plant is discoloured",
  "indonesian": "Sistem pembuluh tanaman mengalami perubahan warna"
},
{
  "id": 39069,
  "english": "Dieback of twigs",
  "indonesian": "Penyusutan pada ranting kecil"
},
{
  "id": 39070,
  "english": "Premature leaf drop",
  "indonesian": "Pengguguran daun prematur"
},
{
  "id": 39071,
  "english": "Dark staining on fruit",
  "indonesian": "Pewarnaan gelap pada buah"
},
{
  "id": 39072,
  "english": "The disease causes small, round blister-like formations on leaves, branches, stems, new shoots, and fruit",
  "indonesian": "Penyakit ini menyebabkan pembentukan formasi kecil, bulat seperti blister pada daun, cabang, batang, tunas baru, dan buah"
},
{
  "id": 39073,
  "english": "Crater-like lesions form on the surface surrounded by an oily, water-soaked margin or yellow halo",
  "indonesian": "Lesi mirip kawah terbentuk di permukaan yang dikelilingi oleh pinggiran berminyak yang terendam air atau halo kuning"
},
{
  "id": 39074,
  "english": "In young fruit, an ooze of resinous substance may be observed.",
  "indonesian": "Pada buah muda, bisa diamati sekresi zat resinosa."
},
{
  "id": 39075,
  "english": "Citrus scab attacks the fruit, leaves, and twigs, producing slightly raised, irregular scabby or wart-like outgrowths.",
  "indonesian": "Scab sitrus menyerang buah, daun, dan ranting, menghasilkan pertumbuhan sedikit terangkat, berlekuk atau seperti kutil yang tidak teratur."
},
{
  "id": 39076,
  "english": "The scabs are grey or pinkish at first and become darker with age. They are more common on lemon fruits than leaves.",
  "indonesian": "Scab tersebut awalnya berwarna abu-abu atau kemerahan dan menjadi lebih gelap seiring bertambahnya usia. Mereka lebih umum pada buah lemon daripada daun."
},
{
  "id": 39077,
  "english": "The raised lumps associated with scab can be confused with symptoms caused by the disease botrytis or with wind-rub abrasions.",
  "indonesian": "Tonjolan yang meninggi yang terkait dengan scab dapat disalahartikan dengan gejala yang disebabkan oleh penyakit botrytis atau gesekan akibat angin."
},
{
  "id": 39078,
  "english": "Light green foliage, poor new growth, leaves may be dropping from the tree",
  "indonesian": "Daun berwarna hijau muda, pertumbuhan baru yang buruk, daun mungkin rontok dari pohon"
},
{
  "id": 39079,
  "english": "Severely infected trees are stunted and bushy in appearance with chlorotic leaves and brittle twigs",
  "indonesian": "Pohon yang terinfeksi parah menjadi terhambat pertumbuhannya dan tampak bersemak dengan daun menguning dan ranting yang rapuh"
},
{
  "id": 39080,
  "english": "Some strains of the virus cause elongated pits in the trunk and branches, which give the wood a rope-like appearance.",
  "indonesian": "Beberapa jenis virus menyebabkan alur yang memanjang di batang dan cabang, yang memberi kayu penampilan seperti tali."
},
{
  "id": 39081,
  "english": "Yellowing of leaf veins, blotchy mottling on leaf blades",
  "indonesian": "Kuning pada urat daun, bercak-bercak mottling pada daun"
},
{
  "id": 39082,
  "english": "Twig and limb dieback and fruits dropping prematurely",
  "indonesian": "Penyusutan dan kematian ranting dan cabang serta buah yang rontok secara prematur"
},
{
  "id": 39083,
  "english": "Small, misshapen fruit and fruit very bitter.",
  "indonesian": "Buah kecil, berbentuk tidak normal, dan sangat pahit."
},
{
  "id": 39084,
  "english": "Pale brown sunken spots may appear on the cotyledons of infected seedlings.",
  "indonesian": "Bintik-bintik cekung berwarna coklat muda mungkin muncul pada kotiledon bibit yang terinfeksi."
},
{
  "id": 39085,
  "english": "Lesions on leaves are dark brown.",
  "indonesian": "Lesi pada daun berwarna coklat gelap."
},
{
  "id": 39086,
  "english": "They are restricted to the veins on the lower leaf surface. On stems, lesions are elongated and sunken.",
  "indonesian": "Mereka terbatas pada urat pada permukaan daun bagian bawah. Pada batang, lesi memanjang dan cekung."
},
{
  "id": 39087,
  "english": "The fungus produces a grey mould on the lower surface of the spots.",
  "indonesian": "Jamur tersebut menghasilkan serbuk abu-abu pada permukaan bawah bintik-bintik."
},
{
  "id": 39088,
  "english": "Infected pods have brown blotches",
  "indonesian": "Polong yang terinfeksi memiliki bercak coklat"
},
{
  "id": 39089,
  "english": "The spots may increase in size, join together, and cause yellowing and necrosis of the affected leaves",
  "indonesian": "Bintik-bintik tersebut dapat membesar, bergabung bersama, dan menyebabkan menguning dan nekrosis pada daun yang terkena."
},
{
  "id": 39090,
  "english": "Rust-colored pustules form on the lower leaf surfaces.",
  "indonesian": "Pustula berwarna karat terbentuk pada permukaan bawah daun."
},
{
  "id": 39091,
  "english": "Severely infected leaves turn yellow, wilt, and then drop off of the plant.",
  "indonesian": "Daun yang terinfeksi parah berubah menjadi kuning, layu, dan kemudian rontok dari tanaman."
},
{
  "id": 39092,
  "english": "Stems and pods may also be infected. It affects most types of beans under humid conditions",
  "indonesian": "Batang dan polong juga dapat terinfeksi. Ini memengaruhi sebagian besar jenis kacang di bawah kondisi lembab"
},
{
  "id": 39093,
  "english": "Symptoms of bean common mosaic virus (BCMV) are cupping and twisting of leaves with a light and dark green mosaic pattern.",
  "indonesian": "Gejala virus mozaik umum kacang (BCMV) adalah daun yang bergelombang dan berputar dengan pola mozaik hijau terang dan gelap."
},
{
  "id": 39094,
  "english": "The dark green tissue is often bubbled and/or in bands next to the veins.",
  "indonesian": "Jaringan hijau tua sering berbintik-bintik dan/atau berpita di sebelah urat."
},
{
  "id": 39095,
  "english": "Affected plants produce smaller, curled pods with a greasy appearance resulting in poor yields.",
  "indonesian": "Tanaman yang terinfeksi menghasilkan polong yang lebih kecil dan keriting dengan penampilan berminyak yang mengakibatkan hasil yang buruk."
},
{
  "id": 39096,
  "english": "The initial symptoms of sweet orange scab form on very young fruit as lesions that are slightly raised and pink to light brown.",
  "indonesian": "Gejala awal keropeng jeruk manis terbentuk pada buah yang sangat muda sebagai lesi yang agak timbul dan berwarna merah muda hingga coklat muda."
},
{
  "id": 39097,
  "english": "The lesion color changes to yellowish brown and eventually to dark gray.",
  "indonesian": "Warna lesi berubah menjadi coklat kekuningan dan akhirnya menjadi abu-abu gelap."
},
{
  "id": 39098,
  "english": "Orange scab can cause premature fruit drop and stunt young nursery trees and new field plantings, but has little impact on fruit quality.",
  "indonesian": "Keropeng jeruk dapat menyebabkan buah rontok prematur dan menghambat pertumbuhan pohon penangkaran muda dan penanaman baru di lapangan, tetapi memiliki sedikit dampak pada kualitas buah."
},
{
  "id": 39099,
  "english": "Trees infected with tristeza show light green foliage, and some leaf drop.",
  "indonesian": "Pohon yang terinfeksi tristeza menunjukkan daun hijau muda, dan beberapa daun rontok."
},
{
  "id": 39100,
  "english": "Feeder roots die from the tip towards the main root.",
  "indonesian": "Akar makan mati dari ujung menuju akar utama."
},
{
  "id": 39101,
  "english": "Yellow seedlings, Stem pitting, poor fruit quality",
  "indonesian": "Bibit berwarna kuning, pembentukan lubang pada batang, kualitas buah yang buruk"
},
{
  "id": 39102,
  "english": "Lopsided, bitter, hard fruit with small, dark aborted seeds",
  "indonesian": "Buah yang tidak simetris, pahit, keras dengan biji kecil yang menggugurkan diri berwarna gelap"
},
{
  "id": 39103,
  "english": "Fruit that remains green even when ripe",
  "indonesian": "Buah yang tetap hijau bahkan saat sudah matang"
},
{
  "id": 39104,
  "english": "Asymmetrical blotchy mottling of leaves, yellow shoots, twig dieback",
  "indonesian": "Mottling bercak yang tidak simetris pada daun, tunas kuning, kematian ranting"
},
{
  "id": 39105,
  "english": "The earliest symptom of garlic rust is small, circular to elongate white flecks that occur on both sides of leaves.",
  "indonesian": "Gejala awal karat bawang putih adalah bintik-bintik putih kecil, bulat hingga memanjang yang terjadi di kedua sisi daun."
},
{
  "id": 39106,
  "english": "As the disease progresses, these small spots expand, and the leaf tissue covering the lesions ruptures and masses of orange, powdery spores (uredospores) then become visible as pustules.",
  "indonesian": "Seiring perkembangan penyakit, bintik-bintik kecil ini membesar, dan jaringan daun yang menutupi lesi pecah dan massa spora oranye, berbubuk (uredospora) kemudian menjadi terlihat sebagai pustula."
},
{
  "id": 39107,
  "english": "Severely infected leaves are almost entirely covered with pustules, resulting in extensive yellowing, wilting and premature drying of leaves.",
  "indonesian": "Daun yang terinfeksi parah hampir sepenuhnya tertutup pustula, mengakibatkan kuning yang luas, layu dan pengeringan daun yang prematur."
},
{
  "id": 39108,
  "english": "Twisting, curling of leaves.",
  "indonesian": "Puting, melipat daun."
},
{
  "id": 39109,
  "english": "Water-soaked lesions that are pale yellow in colour appear initially on leaf blades.",
  "indonesian": "Lesi yang berair dan berwarna kuning pucat muncul awalnya pada helai daun."
},
{
  "id": 39110,
  "english": "Parts of spear leaf petiole or rachi turning brown",
  "indonesian": "Bagian petiol atau rachi daun tombak berubah menjadi coklat"
},
{
  "id": 39111,
  "english": "Discoloration may be associated with a wet rot",
  "indonesian": "Perubahan warna dapat terkait dengan pembusukan basah"
},
{
  "id": 39112,
  "english": "Spear leaf may be wilted and/or chlorotic",
  "indonesian": "Daun tombak mungkin layu dan/atau klorotik"
},
{
  "id": 39113,
  "english": "Reduced growth of palm and older fronds turning chlorotic or necrotic",
  "indonesian": "Pertumbuhan palem yang berkurang dan frond tua berubah menjadi klorotik atau nekrotik"
},
{
  "id": 39114,
  "english": "Pale green foliage",
  "indonesian": "Daun berwarna hijau muda"
},
{
  "id": 39115,
  "english": "Drooping fronds",
  "indonesian": "Frond menggantung"
},
{
  "id": 39116,
  "english": "Field palms may exhibit a bright yellow chlorosis of leaves in the mid-canopy which starts at the tip pf the pinnae and moves towards petioles before affecting adjacent fronds and spreading to older leaves in the canopy.",
  "indonesian": "Palem lapangan mungkin menunjukkan klorosis kuning cerah pada daun di tengah kanopi yang dimulai dari ujung pinnae dan bergerak ke arah petiol sebelum memengaruhi frond yang berdekatan dan menyebar ke daun yang lebih tua di kanopi."
},
{
  "id": 39117,
  "english": "In older palms, lower leaves wilt and dry out and fronds break close to the base of the trunk; new fronds are chlorotic and stunted.",
  "indonesian": "Pada palem yang lebih tua, daun bawah layu dan kering dan frond patah dekat dengan dasar batang; frond baru klorotik dan terhambat."
},
{
  "id": 39118,
  "english": "Drying of leaves",
  "indonesian": "Pengeringan daun"
},
{
  "id": 39119,
  "english": "Tiny black spots on leaves which enlarge into 2 mm long elliptical, elongated lesions",
  "indonesian": "Bintik-bintik hitam kecil pada daun yang membesar menjadi lesi elips panjang sepanjang 2 mm"
},
{
  "id": 39120,
  "english": "Lesions may expand and be surrounded by black tissue and chlorosis between lesions",
  "indonesian": "Lesi dapat membesar dan dikelilingi oleh jaringan hitam dan klorosis di antara lesi"
},
{
  "id": 39121,
  "english": "Lesions may be present on leaf petioles and rachis",
  "indonesian": "Lesi mungkin ada pada tangkai daun dan rachis"
},
{
  "id": 39122,
  "english": "Leaf symptoms include round, brown spots with concentric rings",
  "indonesian": "Gejala pada daun termasuk bercak coklat bulat dengan cincin konsentris"
},
{
  "id": 39123,
  "english": "Spots often have a yellow halo, and can crack through the middle",
  "indonesian": "Bintik-bintik sering memiliki halo kuning, dan dapat retak di tengah"
},
{
  "id": 39124,
  "english": "As the disease spreads, leaves can develop enough spots that they begin to meld together to create large necrotic areas on leaves",
  "indonesian": "Saat penyakit menyebar, daun dapat mengembangkan cukup banyak bintik sehingga mereka mulai menyatu untuk membuat area nekrotik besar pada daun"
},
{
  "id": 39125,
  "english": "The young radical and the plumule are killed and there is complete rotting of the seedlings",
  "indonesian": "Radikal muda dan plumula mati dan ada pembusukan total pada bibit"
},
{
  "id": 39126,
  "english": "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level",
  "indonesian": "Fase pasca-perkecambahan ditandai dengan infeksi jaringan muda, juvenil dari kerah pada tingkat tanah"
},
{
  "id": 39127,
  "english": "The seedlings topple over or  collapse",
  "indonesian": "Bibit terjatuh atau roboh"
},
{
  "id": 39128,
  "english": "First appear as chlorotic or yellow (angular) areas near the leaf margins",
  "indonesian": "Pertama muncul sebagai area klorotik atau kuning (angular) dekat pinggiran daun"
},
{
  "id": 39129,
  "english": "Yellow area extends to veins and midrib forming characteristic ‘v’ shaped chlorotic spots which later turn black",
  "indonesian": "Area kuning memanjang hingga ke urat dan tulang daun membentuk bercak klorotik berbentuk 'v' yang kemudian berubah menjadi hitam"
},
{
  "id": 39130,
  "english": "Veins and veinlets turn brown and finally black",
  "indonesian": "Urat dan urat kecil berubah menjadi coklat dan akhirnya hitam"
},
{
  "id": 39131,
  "english": "Small purplish brown spots on under surface of leaves",
  "indonesian": "Bercak coklat ungu kecil pada permukaan bawah daun"
},
{
  "id": 39132,
  "english": "Small, pale yellow angular spots on upper surface of leaves, with downy growth on the under surface",
  "indonesian": "Bintik-bintik kecil berwarna kuning pucat di permukaan atas daun, dengan pertumbuhan berbulu di bawah permukaan"
},
{
  "id": 39133,
  "english": "The spots coalesce and the leaves shrivel and dries up prematurel",
  "indonesian": "Bintik-bintik bergabung dan daun layu dan mengering secara prematur"
},
{
  "id": 39134,
  "english": "Leaves sometime show signs of wilting or water loss",
  "indonesian": "Daun kadang-kadang menunjukkan tanda-tanda layu atau kehilangan air"
},
{
  "id": 39135,
  "english": "The stalk near the ground become water-soaked with brownish discolouration and are easily breakable.",
  "indonesian": "Batang dekat tanah menjadi basah dengan perubahan warna coklat dan mudah pecah."
},
{
  "id": 39136,
  "english": "The rotting tissues emit a putrid smell.",
  "indonesian": "Jaringan yang membusuk mengeluarkan bau busuk."
},
{
  "id": 39137,
  "english": "Small yellowish round or oval spots appear on the leaves",
  "indonesian": "Bintik-bintik kecil berwarna kuning bulat atau oval muncul di daun"
},
{
  "id": 39138,
  "english": "Yellowish spots enlarge and become elliptical",
  "indonesian": "Bintik-bintik kuning membesar dan menjadi elips"
},
{
  "id": 39139,
  "english": "Center becomes straw coloured with a reddish brown margin",
  "indonesian": "Tengah menjadi berwarna jerami dengan pinggiran coklat kemerahan"
},
{
  "id": 39140,
  "english": "Disease appears at pre-flowering stage in 40-50 days old plants but can also occur on younger plants",
  "indonesian": "Penyakit muncul pada tahap pra-pembungaan pada tanaman berumur 40-50 hari tetapi juga dapat terjadi pada tanaman yang lebih muda"
},
{
  "id": 39141,
  "english": "Symptoms develop on leaves, sheaths and stalks and can later spread to ears",
  "indonesian": "Gejala berkembang pada daun, selubung, dan batang dan kemudian dapat menyebar ke telinga"
},
{
  "id": 39142,
  "english": "On leaves and sheaths, a number of soaked, discolored concentric bands and rings are visible, often brown, tan or gray in color",
  "indonesian": "Pada daun dan selubung, beberapa garis dan cincin konsentris yang direndam, berwarna kecoklatan, kecoklatan, atau abu-abu sering terlihat"
},
{
  "id": 39143,
  "english": "It is characterized by the presence of long, narrow, brownish, interveinal stripes on leaves",
  "indonesian": "Ditandai dengan adanya garis-garis panjang, sempit, berwarna coklat, antara urat di daun"
},
{
  "id": 39144,
  "english": "Whitish downy fungal growth may be observed on close examination on underside of the stripes",
  "indonesian": "Pertumbuhan jamur putih berbulu dapat diamati pada pemeriksaan teliti pada bagian bawah garis-garis tersebut"
},
{
  "id": 39145,
  "english": "Early-stage symptoms are visible as flecks or blobs on the lowermost leaves, giving them a burnt appearance",
  "indonesian": "Gejala tahap awal terlihat sebagai bercak atau gumpalan pada daun paling bawah, memberi mereka tampilan terbakar"
},
{
  "id": 39146,
  "english": "Entire crop give a blasted or burnt appearance",
  "indonesian": "Seluruh tanaman memberikan tampilan terbakar atau terbakar"
},
{
  "id": 39147,
  "english": "Neck region of panicle develops a black color and shrivels completely / partially grain set inhibited, panicle breaks at the neck and hangs",
  "indonesian": "Daerah leher malai berkembang warna hitam dan mengering sepenuhnya / sebagian set biji terhambat, malai patah di leher dan menggantung"
},
{
  "id": 39148,
  "english": "Nodal Blast: Nodes become black and break up",
  "indonesian": "Ledakan Nodal: Node menjadi hitam dan pecah"
},
{
  "id": 39149,
  "english": "Water-soaked to yellowish stripes on leaf blades or starting at leaf tips",
  "indonesian": "Garis-garis berair hingga kuning pada bilah daun atau mulai dari ujung daun"
},
{
  "id": 39150,
  "english": "Appearance of bacterial ooze that looks like a milky or opaque dewdrop on young lesions early in the morning",
  "indonesian": "Munculnya lendir bakteri yang terlihat seperti embun susu atau buram pada lesi muda di pagi hari"
},
{
  "id": 39151,
  "english": "Lessions turn yellow to white as the disease advances",
  "indonesian": "Lesis berubah menjadi kuning menjadi putih saat penyakit berkembang"
},
{
  "id": 39152,
  "english": "Leaves become yellow or orange-yellow, may also have rust-colored spots",
  "indonesian": "Daun menjadi kuning atau kuning jingga, mungkin juga memiliki bintik-bintik berwarna karat"
},
{
  "id": 39153,
  "english": "Discoloration begins from leaf tip and extends down to the blade or the lower leaf portion",
  "indonesian": "Pembusukan dimulai dari ujung daun dan meluas hingga ke bilah atau bagian daun yang lebih rendah"
},
{
  "id": 39154,
  "english": "Delayed flowering, - panicles small and not completely exerted",
  "indonesian": "Pembungaan tertunda, - malai kecil dan tidak sepenuhnya terkeluarkan"
},
{
  "id": 39155,
  "english": "Irregular spots or lesions, with dark reddish brown margins and gray center",
  "indonesian": "Bintik-bintik atau lesi tidak teratur, dengan pinggiran coklat kemerahan gelap dan pusat abu-abu"
},
{
  "id": 39156,
  "english": "Discoloration in the flag leaf sheath",
  "indonesian": "Pembusukan pada selubung daun panji"
},
{
  "id": 39157,
  "english": "Lesions enlarge and often coalesce and may cover the entire leaf sheath",
  "indonesian": "Lesis membesar dan sering menyatu dan dapat menutupi seluruh selubung daun"
},
{
  "id": 39158,
  "english": "Yellow powdery pustules appear on leaves, forming stripes",
  "indonesian": "Pustula berbentuk bubuk kuning muncul pada daun, membentuk garis-garis"
},
{
  "id": 39159,
  "english": "Minimum temperature in the range of 7-13 degree C coupled with 85-100% relative humidity during night and maximum temperature in the range of 15-24 degree C during day are congenial for infection, development and spread of disease.",
  "indonesian": "Suhu minimum dalam kisaran 7-13 derajat C yang dikombinasikan dengan kelembaban relatif 85-100% selama malam dan suhu maksimum dalam kisaran 15-24 derajat C selama siang hari cocok untuk infeksi, perkembangan, dan penyebaran penyakit."
},
{
  "id": 39160,
  "english": "The characteristic symptom of yellow rust is of parallel rows of yellowish orange coloured pustules on the leaves of adult plants",
  "indonesian": "Gejala khas karat kuning adalah barisan paralel pustula berwarna oranye kekuningan pada daun tanaman dewasa"
},
{
  "id": 39161,
  "english": "Mild symptoms may be present prior to heading, including yellowish leaf streaks and stiff, dark green leaves",
  "indonesian": "Gejala ringan mungkin hadir sebelum heading, termasuk garis-garis daun kekuningan dan daun hijau tua yang kaku"
},
{
  "id": 39162,
  "english": "Olives",
  "indonesian": "Zaitun"
},
{
  "id": 39163,
  "english": "The fungus destroys the ears completely, turning them into a black loose powdery mass consisting of spores and leaving behind the rachis only.",
  "indonesian": "Jamur menghancurkan telinga sepenuhnya, mengubahnya menjadi massa berbentuk bubuk yang hitam dan longgar yang terdiri dari spora dan hanya meninggalkan rachis."
},
{
  "id": 39164,
  "english": "Leaf rust attacks foliage only",
  "indonesian": "Karat daun menyerang daun saja"
},
{
  "id": 39165,
  "english": "This rust disease occurs wherever wheat, barley and other cereal crops are grown",
  "indonesian": "Penyakit karat ini terjadi di mana saja gandum, barley, dan tanaman sereal lainnya ditanam"
},
{
  "id": 39166,
  "english": "Identifying symptoms are dusty, reddish-orange to reddish-brown fruiting bodies that appear on the leaf surface.",
  "indonesian": "Gejala identifikasi adalah tubuh buah berdebu, berwarna oranye kemerahan hingga cokelat kemerahan yang muncul pada permukaan daun."
},
{
  "id": 39167,
  "english": "An early symptom of bacterial leaf spot is small, water-soaked leaf spots on the older leaves of the plant",
  "indonesian": "Gejala awal bercak daun bakteri adalah bercak daun kecil yang terendam air pada daun-daun tua tanaman"
},
{
  "id": 39168,
  "english": "They can be caused by one or a combination of leaf spotting pathogens. Pyrenophora tritici-repentis causes tan spot on leaves and can also infect wheat kernels causing red or pink smudge and black point",
  "indonesian": "Mereka dapat disebabkan oleh satu atau kombinasi patogen bercak daun. Pyrenophora tritici-repentis menyebabkan bercak cokelat pada daun dan juga dapat menginfeksi biji gandum menyebabkan bercak merah atau pink dan titik hitam"
},
{
  "id": 39169,
  "english": "Severely infected kernels can result in significant downgrading of seed quality.",
  "indonesian": "Butir yang terinfeksi parah dapat menyebabkan penurunan signifikan dalam kualitas benih."
},
{
  "id": 39170,
  "english": "Olive knot can cause the death of small branches and twigs as well as the progressive debilitation of the tree, although it rarely kills it",
  "indonesian": "Gangguan simpul zaitun dapat menyebabkan kematian cabang-cabang kecil dan ranting serta pelemahan bertahap pohon, meskipun jarang menyebabkan kematian pohon tersebut"
},
{
  "id": 39171,
  "english": "Crop production is reduced in terms of both fruit quantity and size",
  "indonesian": "Produksi tanaman berkurang baik dari segi jumlah maupun ukuran buah"
},
{
  "id": 39172,
  "english": "Olives from infected branches have an unpleasant smell and a bitter, rancid taste",
  "indonesian": "Zaitun dari cabang-cabang yang terinfeksi memiliki aroma tidak sedap dan rasa pahit dan tengik"
},
{
  "id": 39173,
  "english": "The symptoms of this disease are generally lesions on the leaf blade, petiole, fruit peduncle and fruit.",
  "indonesian": "Gejala penyakit ini umumnya berupa lesi pada daun, tangkai daun, tangkai buah, dan buah."
},
{
  "id": 39174,
  "english": "These occur on the upper surface of the leaves in the form of small round blotches with a grey or muddy spot in the centre 6–10 mm in diameter, reminiscent of a peacock’s eye.",
  "indonesian": "Ini terjadi pada permukaan atas daun dalam bentuk bercak bulat kecil dengan bintik abu-abu atau kotor di tengahnya berdiameter 6–10 mm, mengingatkan pada mata merak."
},
{
  "id": 39175,
  "english": "Defoliation, twig death and bloom failure may ensue",
  "indonesian": "Pengguguran daun, kematian ranting, dan kegagalan mekar mungkin terjadi"
},
{
  "id": 39176,
  "english": "Infected trees have slowly thinning canopies and appear weak",
  "indonesian": "Pohon yang terinfeksi memiliki kanopi yang semakin menipis dan terlihat lemah"
},
{
  "id": 39177,
  "english": "This symptom often develops first on one side of the tree and then progresses over several years to involve the whole tree",
  "indonesian": "Gejala ini sering kali pertama kali berkembang di satu sisi pohon dan kemudian berkembang selama beberapa tahun untuk melibatkan seluruh pohon"
},
{
  "id": 39178,
  "english": "The bark and outer wood of the upper roots and crown show discoloration",
  "indonesian": "Kulit dan kayu luar dari akar bagian atas dan mahkota menunjukkan perubahan warna"
},
{
  "id": 39179,
  "english": "Phytophthora-infected trees have reduced growth, thin canopies, and often die.",
  "indonesian": "Pohon yang terinfeksi Phytophthora memiliki pertumbuhan yang terhambat, kanopi tipis, dan sering mati."
},
{
  "id": 39180,
  "english": "If the disease progresses rapidly, trees may die in 1 or 2 years",
  "indonesian": "Jika penyakit berkembang dengan cepat, pohon dapat mati dalam 1 atau 2 tahun"
},
{
  "id": 39181,
  "english": "Roots rotted by Phytophthora are dark and trees affected for long periods by Phytophthora root rot may have few root hairs",
  "indonesian": "Akar yang membusuk oleh Phytophthora berwarna gelap dan pohon yang terkena Phytophthora root rot untuk jangka waktu yang lama mungkin memiliki sedikit rambut akar"
},
{
  "id": 39182,
  "english": "Symptoms Disease is most commonly observed on aboveground plant parts",
  "indonesian": "Gejala Penyakit paling sering diamati pada bagian tanaman di atas tanah"
},
{
  "id": 39183,
  "english": "Diseased tissues may first appear as water-soaked areas",
  "indonesian": "Jaringan yang sakit mungkin pertama kali muncul sebagai area yang terendam air"
},
{
  "id": 39184,
  "english": "Turn a bleached white or brownish color with fluffy, cottony-white mycelium generally present",
  "indonesian": "Berubah menjadi warna putih yang memutih atau cokelat dengan miselium putih berbulu, biasanya hadir"
},
{
  "id": 39185,
  "english": "Stem infections by sclerotia first appear just after flowering and are accompanied by a soft, watery rot of basal stems.",
  "indonesian": "Infeksi batang oleh sklerotia pertama kali muncul tepat setelah berbunga dan disertai oleh pembusukan lunak dan berair pada batang dasar."
},
{
  "id": 39186,
  "english": "These lesions enlarge into a watery, rotten mass of tissue that is covered by a white moldy growth.",
  "indonesian": "Lesi ini membesar menjadi massa jaringan yang busuk dan berair yang ditutupi oleh pertumbuhan jamur berbulu putih."
},
{
  "id": 39187,
  "english": "Dark, irregularly-shaped sclerotia are often found in and around infected stems. Infection of stems and branches will cause affected plant parts to wilt and later die, taking on a bleached and dried.",
  "indonesian": "Sklerotia berwarna gelap, berbentuk tidak teratur sering ditemukan di dalam dan di sekitar batang yang terinfeksi. Infeksi batang dan cabang akan menyebabkan bagian tanaman yang terkena layu dan kemudian mati, berubah menjadi memutih dan mengering."
},
{
  "id": 39188,
  "english": "Safflower plants a few weeks after planting or at flowering stage are commonly attacked",
  "indonesian": "Tanaman benih a few weeks after planting or at flowering stage umumnya diserang"
},
{
  "id": 39189,
  "english": "Circular to irregular brown sunken spots of 3-10 mm diameter are formed on leaves",
  "indonesian": "Bercak cekung coklat berbentuk bulat hingga tidak teratur dengan diameter 3-10 mm terbentuk pada daun"
},
{
  "id": 39190,
  "english": "In severe infections bracts are also affected with reddish brown spots.affected flower buds turn brown and die.",
  "indonesian": "Pada infeksi yang parah, braktea juga terpengaruh dengan bercak cokelat kemerahan. Bunga-bunga yang terpengaruh berubah menjadi cokelat dan mati."
},
{
  "id": 39191,
  "english": "A white powder-like powder is deposited on the leaves,twigs and stems of safflower.",
  "indonesian": "Serbuk putih seperti bubuk terdeposit pada daun, ranting, dan batang safflower."
},
{
  "id": 39192,
  "english": "Due to its effect, the process of photosynthesis is inhibited",
  "indonesian": "Karena efeknya, proses fotosintesis terhambat"
},
{
  "id": 39193,
  "english": "The affected part of the plant turns black and dries up.",
  "indonesian": "Bagian tanaman yang terkena berubah menjadi hitam dan mengering."
},
{
  "id": 39194,
  "english": "Dark necrotic lesions 2-5 mm in diameter are formed first on hypocotyls and cotyledons.",
  "indonesian": "Lesi nekrotik gelap berdiameter 2-5 mm terbentuk pertama kali pada hipokotil dan kotiledon."
},
{
  "id": 39195,
  "english": "In mature plants, small brown to dark brown concentric spots of 1-2 mm appear on leaves.",
  "indonesian": "Pada tanaman dewasa, bercak konsentris kecil berwarna coklat hingga coklat tua dengan diameter 1-2 mm muncul pada daun."
},
{
  "id": 39196,
  "english": "Symptoms also appear on the stem and severely infected plants get blighted.",
  "indonesian": "Gejala juga muncul pada batang dan tanaman yang terinfeksi parah menjadi mati."
},
{
  "id": 39197,
  "english": "These spots soon increase in size and number, and many such spots coalesce at severity causing premature defoliation. Severe defoliation leads to debilitation of the bushes and results in poor cropping in the succeeding seasons.",
  "indonesian": "Bercak-bercak ini segera meningkat ukuran dan jumlahnya, dan banyak bercak seperti itu bergabung dengan keparahan yang menyebabkan pengguguran daun prematur. Pengguguran daun yang parah mengakibatkan pelemahan semak-semak dan mengakibatkan hasil panen yang buruk pada musim-musim berikutnya."
},
{
  "id": 39198,
  "english": "Water-soaked spots on leaves which are delimited by leaf veins, giving them an angular appearance;",
  "indonesian": "Bercak basah di daun yang dibatasi oleh urat daun, memberi mereka penampilan sudut;"
},
{
  "id": 39199,
  "english": "Lesions Increase in size and turn black and necrotic;",
  "indonesian": "Lesi meningkat ukuran dan berubah menjadi hitam dan nekrotik;"
},
{
  "id": 39200,
  "english": "Leaves Drop from the plant; disease may also cause elongated gray-black lesions extending from the leaves to petioles and stem which are known as the 'blackarm' phase;",
  "indonesian": "Daun jatuh dari tanaman; penyakit juga dapat menyebabkan lesi abu-abu-hitam yang memanjang dari daun hingga petiol dan batang yang dikenal sebagai fase 'blackarm';"
},
{
  "id": 39201,
  "english": "Initial symptoms on young seedlings are yellowing and browning of cotyledons, followed by a brown ring on the petiole.",
  "indonesian": "Gejala awal pada bibit muda adalah menguning dan menghitamnya kotiledon, diikuti oleh cincin coklat pada petiol."
},
{
  "id": 39202,
  "english": "Finally wilting & drying of the seedling occurs. Symptom at later stages includes loss of turgidity, yellowing, drooping and wilting starting from older leaves.",
  "indonesian": "Akhirnya, layu & pengeringan bibit terjadi. Gejala pada tahap-tahap selanjutnya termasuk kehilangan turgiditas, menguning, layu dan layu dimulai dari daun-daun yang lebih tua."
},
{
  "id": 39203,
  "english": "Browning or blackening of vascular tissues occur on the stem and spreads upwards and downwards. Infected plants appear stunted with fewer bolls.",
  "indonesian": "Pembusukan atau penghitaman jaringan pembuluh terjadi pada batang dan menyebar ke atas dan ke bawah. Tanaman yang terinfeksi tampak kerdil dengan lebih sedikit polong."
},
{
  "id": 39204,
  "english": "The disease may occur in all stages but more severe when plants are 45-60 days old.",
  "indonesian": "Penyakit ini dapat terjadi pada semua tahap tetapi lebih parah ketika tanaman berusia 45-60 hari."
},
{
  "id": 39205,
  "english": "Each spot has a central lesion surrounded by concentric rings. Several spots coalesce together to form blighted areas. The affected leaves become brittle and fall off.",
  "indonesian": "Setiap bercak memiliki lesi pusat yang dikelilingi oleh cincin konsentris. Beberapa bercak bergabung bersama untuk membentuk area yang mati. Daun yang terkena menjadi rapuh dan rontok."
},
{
  "id": 39206,
  "english": "Sometimes stem lesions are also seen. In severe cases, the spots may appear on bracts and bolls.",
  "indonesian": "Terkadang lesi batang juga terlihat. Pada kasus yang parah, bercak dapat muncul pada braktea dan polong."
},
{
  "id": 39207,
  "english": "Anthracnose in cotton can occur in all growth stages of the plant and it can affect all tissues.",
  "indonesian": "Antraknosa pada kapas dapat terjadi pada semua tahap pertumbuhan tanaman dan dapat memengaruhi semua jaringan."
},
{
  "id": 39208,
  "english": "It produces small reddish to light brown circular spots with black necrotic margins on the cotyledons and primary leaves.",
  "indonesian": "Ini menghasilkan bercak kecil berwarna kemerahan hingga cokelat muda dengan pinggiran nekrotik hitam pada kotiledon dan daun primer."
},
{
  "id": 39209,
  "english": "If the lesions develop on the collar region, the stem may be girdled, causing seedling or young plants to wilt and die.",
  "indonesian": "Jika lesi berkembang di daerah kerah, batang mungkin terjepit, menyebabkan bibit atau tanaman muda layu dan mati."
},
{
  "id": 39210,
  "english": "It affects the crop in square and boll formation stages Bronzing of veins followed by interveinal chlorosis, yellowing and scorching of leaves",
  "indonesian": "Ini memengaruhi tanaman pada tahap pembentukan kotak dan polong. Penyokong urat diikuti oleh klorosis interveinal, menguning dan mengering daun"
},
{
  "id": 39211,
  "english": "Leaves exhibit drying of leaf margins and areas between veins known as 'tiger stripe symptom'",
  "indonesian": "Daun menunjukkan pengeringan pinggir daun dan daerah di antara urat yang dikenal sebagai 'gejala garis harimau'"
},
{
  "id": 39212,
  "english": "Affected plants remain barren showing pinkish discoloration in stem and wood. It may produce smaller bolls",
  "indonesian": "Tanaman yang terkena tetap mandul menunjukkan perubahan warna kemerahan di batang dan kayu. Ini mungkin menghasilkan polong yang lebih kecil"
},
{
  "id": 39213,
  "english": "Small irregular brown lesions on leaves which expand and turn gray-brown or dark brown with concentric zones",
  "indonesian": "Lesi coklat kecil yang tidak teratur pada daun yang melebar dan berubah menjadi abu-abu-coklat atau coklat gelap dengan zona konsentris"
},
{
  "id": 39214,
  "english": "Older areas of lesions may dry out and drop from leaves causing shot hole",
  "indonesian": "Area lesi yang lebih tua mungkin mengering dan jatuh dari daun menyebabkan lubang tembak"
},
{
  "id": 39215,
  "english": "Lesions coalesce to form large necrotic patches",
  "indonesian": "Lesi bergabung untuk membentuk bercak nekrotik besar"
},
{
  "id": 39216,
  "english": "Small, dark brown necrotic spots on leaves which may be surrounded by a zone of yellow tissue",
  "indonesian": "Bercak nekrotik coklat tua kecil pada daun yang mungkin dikelilingi oleh zona jaringan kuning"
},
{
  "id": 39217,
  "english": "Water soaked spots on pods which turn brown and necrotic",
  "indonesian": "Bercak basah di polong yang berubah menjadi coklat dan nekrotik"
},
{
  "id": 39218,
  "english": "Pods may twist and distort in the area of infection.",
  "indonesian": "Polong dapat berputar dan mengalami distorsi di area infeksi."
},
{
  "id": 39219,
  "english": "Initially, the symptoms appear as small yellow/white spots on leaves.",
  "indonesian": "Awalnya, gejalanya muncul sebagai bercak kuning/putih kecil pada daun."
},
{
  "id": 39220,
  "english": "Later the spots become enlarged and show raised brick red rust pustules (uredinia).",
  "indonesian": "Kemudian bercak-bintik tersebut membesar dan menunjukkan pustula karat merah bata yang meninggi (uredinia)."
},
{
  "id": 39221,
  "english": "Normally these pustules are surrounded by a yellow halo. Premature leaf drop may occur if the disease is severe.",
  "indonesian": "Biasanya pustula ini dikelilingi oleh aureola kuning. Pengguguran daun prematur dapat terjadi jika penyakitnya parah."
},
{
  "id": 39222,
  "english": "Flowers covered in white, cottony fungal growth;",
  "indonesian": "Bunga-bunga tertutup pertumbuhan jamur putih, berbulu;"
},
{
  "id": 39223,
  "english": "Small, circular, dark green, water-soaked lesions on pods, leaves, and branches which enlarge and become slimy",
  "indonesian": "Lesi kecil, bulat, hijau tua, basah di air pada polong, daun, dan cabang yang membesar dan menjadi licin"
},
{
  "id": 39224,
  "english": "Cottony white growth may be visible on lesions during periods of high humidity; death of branches and/or the entire plant.",
  "indonesian": "Pertumbuhan putih berbulu mungkin terlihat pada lesi selama periode kelembaban tinggi; kematian cabang dan/atau seluruh tanaman."
},
{
  "id": 39225,
  "english": "Water-soaked spots on leaves which enlarge and become necrotic",
  "indonesian": "Bercak basah di daun yang membesar dan menjadi nekrotik"
},
{
  "id": 39226,
  "english": "Spots may be surrounded by a zone of yellow discoloration; lesions coalesce and give the plant a burned appearance",
  "indonesian": "Bercak mungkin dikelilingi oleh zona perubahan warna kuning; lesi bergabung dan memberikan tanaman penampilan terbakar"
},
{
  "id": 39227,
  "english": "Leaves That die remain attached to the plant; circular, sunken, red-brown lesions may be present on pods; pod lesions may ooze during humid conditions.",
  "indonesian": "Daun yang mati tetap melekat pada tanaman; lesi berbentuk bulat, cekung, berwarna cokelat kemerahan mungkin ada pada polong; lesi polong mungkin mengeluarkan cairan selama kondisi lembab."
},
{
  "id": 39228,
  "english": "On tomato, the affected area may be mistaken for sunscald. Sunscald develops as a white discoloration, but it occurs on the upper portions of the fruit, often the shoulders.",
  "indonesian": "Pada tomat, area yang terkena mungkin keliru dianggap sebagai luka matahari. Luka matahari berkembang sebagai perubahan warna putih, tetapi terjadi pada bagian atas buah, seringkali pada pundak."
},
{
  "id": 39229,
  "english": "Blossom end rot may also occur on the sides of the pepper fruit near the blossom end.",
  "indonesian": "Busuk ujung bunga juga dapat terjadi di sisi buah cabai dekat ujung bunga."
},
{
  "id": 39230,
  "english": "Molds often colonize the damaged area of affected fruit, resulting in a dark brown or black appearance.",
  "indonesian": "Jamur sering mengkolonisasi area yang rusak pada buah yang terkena, menyebabkan penampilan cokelat tua atau hitam."
},
{
  "id": 39231,
  "english": "The new growth of plants with tomato yellow leaf curl has reduced internodes, giving the plant a stunted appearance",
  "indonesian": "Pertumbuhan baru tanaman dengan kerutan daun kuning tomat memiliki internode yang lebih pendek, memberikan penampilan tanaman yang kerdil"
},
{
  "id": 39232,
  "english": "The new leaves are also greatly reduced in size and wrinkled, are yellowed between the veins, and have margins that curl upward, giving them a cup-like appearance.",
  "indonesian": "Daun-daun baru juga sangat berkurang ukurannya dan keriput, menguning di antara urat, dan memiliki pinggiran yang melengkung ke atas, memberi mereka penampilan seperti cangkir."
},
{
  "id": 39233,
  "english": "Flowers may appear but usually will drop before fruit is set",
  "indonesian": "Bunga mungkin muncul tetapi biasanya akan rontok sebelum buah terbentuk"
},
{
  "id": 39234,
  "english": "The fungus attacks the foliage causing characteristic leaf spots and blight. Early blight is first observed on the plants as small, black lesions mostly on the older foliage.",
  "indonesian": "Jamur menyerang daun menyebabkan bercak daun karakteristik dan penyakit layu. Penyakit layu awal pertama kali diamati pada tanaman sebagai lesi hitam kecil, sebagian besar pada daun yang lebih tua."
},
{
  "id": 39235,
  "english": "Spots enlarge, and by the time they are one-fourth inch in diameter or larger, concentric rings in a bull's eye pattern can be seen in the center of the diseased area.",
  "indonesian": "Bercak membesar, dan pada saat mereka berdiameter satu perempat inci atau lebih besar, cincin konsentris dalam pola mata lembu dapat terlihat di tengah area yang terkena penyakit."
},
{
  "id": 39236,
  "english": "Tissue surrounding the spots may turn yellow. If high temperature and humidity occur at this time, much of the foliage is killed.",
  "indonesian": "Jaringan di sekitar bercak mungkin berubah menjadi kuning. Jika suhu dan kelembaban tinggi terjadi pada saat ini, sebagian besar daun akan mati."
},
{
  "id": 39237,
  "english": "Brownish-green spots appear on the leaf margins and leaf tops. Later, large areas of the leaves turn brown completely.",
  "indonesian": "Bercak cokelat-hijau muncul di tepi daun dan bagian atas daun. Kemudian, area besar daun berubah menjadi cokelat sepenuhnya."
},
{
  "id": 39238,
  "english": "During wet weather, lesions on the lower side of the leaves may be covered with a gray to white moldy growth, making it easier to distinguish healthy from dead leaf tissue.",
  "indonesian": "Selama cuaca basah, lesi di bagian bawah daun mungkin tertutup dengan pertumbuhan jamur abu-abu hingga putih, sehingga lebih mudah membedakan jaringan daun yang sehat dari yang mati."
},
{
  "id": 39239,
  "english": "Greyish-green to dirty-brown and wrinkled stains appear on the fruits. At these spots, the fruit flesh is hardened.",
  "indonesian": "Noda abu-abu-hijau hingga cokelat kotor dan keriput muncul pada buah. Pada spot-spot ini, daging buah mengeras."
},
{
  "id": 39240,
  "english": "Characteristic symptoms of bacterial wilt are the rapid and complete wilting of normal grown-up plants.",
  "indonesian": "Gejala karakteristik layu bakteri adalah layu cepat dan lengkap pada tanaman dewasa yang normal."
},
{
  "id": 39241,
  "english": "Lower leaves may drop before wilting. Pathogen is mostly confined to the vascular region; in advantage cases, it may invade the cortex and pith and cause yellow-brown discoloration of tissues.",
  "indonesian": "Daun bagian bawah mungkin rontok sebelum layu. Patogen sebagian besar terbatas pada wilayah vaskular; dalam kasus yang menguntungkan, dapat menyerang korteks dan sumsum dan menyebabkan perubahan warna jaringan menjadi kuning-cokelat."
},
{
  "id": 39242,
  "english": "Infected plant parts when cut and immersed in clear water, a white streak of bacterial ooze is seen coming out from cut ends.",
  "indonesian": "Bagian tanaman yang terinfeksi ketika dipotong dan direndam dalam air jernih, tampak aliran putih lendir bakteri keluar dari ujung potongan."
},
{
  "id": 39243,
  "english": "The first symptom of the disease is clearing of the veinlets and chlorosis of the leaves.",
  "indonesian": "Gejala pertama penyakit adalah pembersihan pembuluh kecil dan klorosis pada daun."
},
{
  "id": 39244,
  "english": "The younger leaves may die in succession and the entire may wilt and die in a course of few days. Soon the petiole and the leaves droop and wilt.",
  "indonesian": "Daun muda dapat mati berturut-turut dan seluruhnya layu dan mati dalam beberapa hari. Segera tangkai daun dan daunnya menggantung dan layu."
},
{
  "id": 39245,
  "english": "In young plants, the symptom consists of clearing of veinlets and dropping of petioles. In the field, yellowing of the lower leaves first, and affected leaflets wilt and die.",
  "indonesian": "Pada tanaman muda, gejala terdiri dari pembersihan pembuluh kecil dan penurunan tangkai daun. Di lapangan, daun bagian bawah pertama kali menguning, dan daun terpengaruh layu dan mati."
},
{
  "id": 39246,
  "english": "The disease is characterized by light and dark green mottling on the leaves, often accompanied by wilting of young leaves on sunny days when plants first become infected.",
  "indonesian": "Penyakit ini ditandai dengan bercak hijau terang dan gelap pada daun, sering disertai dengan layu pada daun muda saat hari cerah ketika tanaman pertama kali terinfeksi."
},
{
  "id": 39247,
  "english": "The leaflets of affected leaves are usually distorted, puckered, and smaller than normal. Sometimes the leaflets become indented, resulting in 'fern leaf' symptoms.",
  "indonesian": "Daun yang terkena biasanya terdistorsi, mengerut, dan lebih kecil dari biasanya. Kadang-kadang daun terindentasi, menghasilkan gejala 'daun pakis'."
},
{
  "id": 39248,
  "english": "The virus is spread by contact with clothes, the hands of working labor, touching infected plants with healthy ones, plant debris, and implements.",
  "indonesian": "Virus menyebar melalui kontak dengan pakaian, tangan pekerja, menyentuh tanaman yang terinfeksi dengan yang sehat, serpihan tanaman, dan alat."
},
{
  "id": 39249,
  "english": "Black Spot On leaves are formed which enlarge rapidly and cause the fall of the leaf. When the main stem at the base is damaged, the entire vine wilts and sheds all the leaves and spikes.",
  "indonesian": "Bintik Hitam pada daun terbentuk yang membesar dengan cepat dan menyebabkan gugurnya daun. Ketika batang utama di bagian dasar rusak, seluruh tanaman menjalar layu dan menggugurkan semua daun dan duri."
},
{
  "id": 39250,
  "english": "The tender leaves and succulent shoot tips of freshly emerging runner shoots trailing on the soil turn black when infected.",
  "indonesian": "Daun muda dan ujung tunas muda dari tunas baru yang muncul yang menjalar di tanah menjadi hitam saat terinfeksi."
},
{
  "id": 39251,
  "english": "The disease spreads to the entire vine from these infected runner shoots and leaves during intermittent showers due to rain splash.",
  "indonesian": "Penyakit menyebar ke seluruh tanaman dari tunas runner dan daun yang terinfeksi selama hujan deras karena percikan air hujan."
},
{
  "id": 39252,
  "english": "It can be distinguished from the pollu (hollow berry) caused by the beetle by the presence of characteristic cracks on the infected berries.",
  "indonesian": "Ini dapat dibedakan dari pollu (buah kosong) yang disebabkan oleh kumbang dengan adanya retakan karakteristik pada buah yang terinfeksi."
},
{
  "id": 39253,
  "english": "The affected berries show brown sunken patches during the early stages, and their further development is affected.",
  "indonesian": "Buah yang terkena menunjukkan bercak cekung cokelat selama tahap awal, dan perkembangan lebih lanjutnya terganggu."
},
{
  "id": 39254,
  "english": "In later stages, the discoloration gradually increases, and the berries show the characteristic cross-splitting. Finally, the berries turn black and dry. The fungus also causes angular to irregular brownish lesions with a chlorotic halo on the leaves.",
  "indonesian": "Pada tahap selanjutnya, perubahan warna bertambah secara bertahap, dan buah-buah menunjukkan pecah silang karakteristik. Akhirnya, buah-buah berubah menjadi hitam dan kering. Jamur juga menyebabkan lesi cokelat berbentuk sudut hingga tidak beraturan dengan halo klorotik pada daun."
},
{
  "id": 39255,
  "english": "Infected cuttings show greyish lesions on leaves and stems.",
  "indonesian": "Potongan yang terinfeksi menunjukkan lesi abu-abu pada daun dan batang."
},
{
  "id": 39256,
  "english": "White-Colored Mycelium appears which later girdles the stem, causing rotting and wilting.",
  "indonesian": "Miselium berwarna putih muncul yang kemudian melingkari batang, menyebabkan pembusukan dan layu."
},
{
  "id": 39257,
  "english": "Small whitish to cream-colored grain-like sclerotial bodies appear on the mature lesions.",
  "indonesian": "Tubuh sklerotial kecil berwarna putih kekuningan hingga kekrem-an seperti biji-bijian muncul pada lesi matang."
},
{
  "id": 39258,
  "english": "Root necrosis and galling are the primary symptoms of the disease.",
  "indonesian": "Nekrosis akar dan pembengkakan adalah gejala utama penyakit ini."
},
{
  "id": 39259,
  "english": "Foliar yellowing (mild to moderate), followed by defoliation, die-back is seen.",
  "indonesian": "Kuningan daun (ringan hingga sedang), diikuti oleh pengguguran daun, pembusukan kembali terlihat."
},
{
  "id": 39260,
  "english": "In more pronounced conditions whole vine die. Browning of vascular tissue is seen if Fusarium sp. Is associated with the disease.",
  "indonesian": "Dalam kondisi yang lebih menonjol, seluruh tanaman menjalar mati. Peningkatan jaringan vaskular yang berwarna coklat terlihat jika Fusarium sp. Terkait dengan penyakit ini."
},
{
  "id": 39261,
  "english": "The disease is characterized by drying up of mature and immature branches from the tip downwards.",
  "indonesian": "Penyakit ini ditandai dengan pengeringan cabang matang dan tidak matang dari ujung ke bawah."
},
{
  "id": 39262,
  "english": "A few other fungi have been isolated from such trees.",
  "indonesian": "Beberapa jamur lain telah diisolasi dari pohon-pohon tersebut."
},
{
  "id": 39263,
  "english": "The infected branches should be cut and removed, and the cut end pasted with Bordeaux mixture 1%.",
  "indonesian": "Cabang yang terinfeksi harus dipotong dan dibuang, dan ujung potongan ditempel dengan campuran Bordeaux 1%."
},
{
  "id": 39264,
  "english": "Two types of blights are noticed in nutmeg. The first is a white thread blight wherein fine white hyphae aggregate to form fungal threads that traverse along the stem underneath the leaves in a fan-shaped or irregular manner causing blight in the affected portions.",
  "indonesian": "Dua jenis layu teramati pada pala. Yang pertama adalah layu benang putih di mana hifa putih halus mengumpul membentuk benang jamur yang menjalar di sepanjang batang di bawah daun dalam bentuk kipas atau dengan cara tidak teratur menyebabkan layu pada bagian yang terkena."
},
{
  "id": 39265,
  "english": "The second type of blight is called horsehair blight. Fine black silky threads of the fungus form an irregular, loose network on the stems and leaves.",
  "indonesian": "Jenis kedua layu disebut layu rambut kuda. Benang halus berwarna hitam seperti sutra dari jamur membentuk jaringan yang tidak teratur dan longgar pada batang dan daun."
},
{
  "id": 39266,
  "english": "These strands cause blight of leaves and stems. However, these threads hold up the detached, dried leaves on the tree, giving the appearance of a bird's nest when viewed from a distance.",
  "indonesian": "Benang-benang ini menyebabkan layu pada daun dan batang. Namun, benang-benang ini menahan daun-daun yang terlepas dan kering di pohon, memberikan penampilan sarang burung saat dilihat dari jarak jauh."
},
{
  "id": 39267,
  "english": "Immature fruit split, fruit rot, and fruit drop are serious in a majority of nutmeg. Immature fruit splitting and shedding are noticed in some trees without any apparent infection.",
  "indonesian": "Pecahnya buah yang belum matang, pembusukan buah, dan penurunan buah serius pada sebagian besar pala. Pembelahan dan pengguguran buah yang belum matang diamati pada beberapa pohon tanpa infeksi yang jelas."
},
{
  "id": 39268,
  "english": "In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discoloration of the rind resulting in rotting.",
  "indonesian": "Dalam kasus pembusukan buah, infeksi dimulai dari pedisel sebagai lesi gelap dan secara bertahap menyebar ke buah, menyebabkan perubahan warna cokelat pada kulit sehingga membusuk."
},
{
  "id": 39269,
  "english": "In advanced stages, the mace also rots, emitting a foul smell. Phytophthora sp. and Diplodia natalensis have been isolated from affected fruits.",
  "indonesian": "Pada tahap lanjut, bunga pala juga membusuk, mengeluarkan bau busuk. Phytophthora sp. dan Diplodia natalensis telah diisolasi dari buah yang terkena."
},
{
  "id": 39270,
  "english": "Necrotic spots develop on the lamina which are encircled by a chlorotic halo.",
  "indonesian": "Bintik nekrotik berkembang pada lamina yang dilingkari oleh halo klorotik."
},
{
  "id": 39271,
  "english": "In advanced stages, the necrotic spots become brittle and fall off resulting in shot holes.",
  "indonesian": "Pada tahap lanjut, bintik nekrotik menjadi rapuh dan terlepas menyebabkan lubang tembakan."
},
{
  "id": 39272,
  "english": "The infected branches should be cut and removed. The cut end should be pasted with Bordeaux paste.",
  "indonesian": "Cabang yang terinfeksi harus dipotong dan dibuang. Ujung potongan harus dilapisi dengan pasta Bordeaux."
},
{
  "id": 39273,
  "english": "The disease is a destructive one, widely distributed wherever the crop is grown.",
  "indonesian": "Penyakit ini merusak, tersebar luas di mana pun tanaman tersebut ditanam."
},
{
  "id": 39274,
  "english": "The most affected components are the number of seeds per head and the seed yield per plant.",
  "indonesian": "Komponen yang paling terpengaruh adalah jumlah biji per kepala dan hasil biji per tanaman."
},
{
  "id": 39275,
  "english": "Spots first appear on lower leaves, later spread to middle and upper leaves. At later stages, spots may be formed on petioles, stem, and ray florets.",
  "indonesian": "Bintik-bintik pertama muncul pada daun bawah, kemudian menyebar ke daun tengah dan atas. Pada tahap selanjutnya, bintik-bintik mungkin terbentuk pada pelepah, batang, dan kelopak bunga."
},
{
  "id": 39276,
  "english": "It is more prominent in the rabi season, and in the kharif season, the appearance is usually late.",
  "indonesian": "Ini lebih menonjol pada musim rabi, dan pada musim kharif, penampilannya biasanya terlambat."
},
{
  "id": 39277,
  "english": "Uredo pustules appear first on the lower leaves. Uredo pustules appear on the younger leaves and later spread over the entire vegetative surface covering stems, petioles, floral bracts, and petals.",
  "indonesian": "Pustula Uredo pertama muncul pada daun bawah. Pustula Uredo muncul pada daun muda dan kemudian menyebar ke seluruh permukaan vegetatif menutupi batang, pelepah, kelopak bunga, dan kelopak bunga."
},
{
  "id": 39278,
  "english": "Uredia often coalesce to cover large areas on the affected plant parts.",
  "indonesian": "Uredia sering bergabung untuk menutupi area besar pada bagian tanaman yang terkena."
},
{
  "id": 39279,
  "english": "Symptoms of the disease are evident as seedling damping off, systemic infection, local foliar lesions, and basal root or stem galls.",
  "indonesian": "Gejala penyakit terlihat sebagai rontoknya bibit, infeksi sistemik, lesi foliar lokal, dan gumpalan akar atau batang pangkal."
},
{
  "id": 39280,
  "english": "First symptoms are yellowing of the first pair of true leaves.",
  "indonesian": "Gejala pertama adalah menguningnya sepasang daun sejati pertama."
},
{
  "id": 39281,
  "english": "Sunflower plants carrying systemic infection are severely stunted, and leaves are entirely chlorotic.",
  "indonesian": "Tanaman bunga matahari yang membawa infeksi sistemik sangat terhambat pertumbuhannya, dan daunnya sepenuhnya mengalami klorosis."
},
{
  "id": 39282,
  "english": "Water-soaked circular or angular spots on leaves with a greasy, greenish appearance on lower leaves.",
  "indonesian": "Bintik-bintik bulat atau berbentuk sudut yang berair pada daun dengan penampilan hijau berminyak pada daun bagian bawah."
},
{
  "id": 39283,
  "english": "Lesions are usually gray with a darker margin; some lesions may have a narrow yellow border; tiny black fungal fruiting bodies may be present in the lesions.",
  "indonesian": "Lesi biasanya berwarna abu-abu dengan pinggiran yang lebih gelap; beberapa lesi mungkin memiliki batas kuning yang sempit; tubuh buah jamur hitam kecil mungkin ada di dalam lesi."
},
{
  "id": 39284,
  "english": "Yellow or chlorotic spots on leaves.",
  "indonesian": "Bintik-bintik kuning atau klorotik pada daun."
},
{
  "id": 39285,
  "english": "Dark olive green spots on leaves and fruit; may be a velvety growth on spots on undersides of leaves; twisting of leaves.",
  "indonesian": "Bintik-bintik hijau zaitun tua pada daun dan buah; mungkin ada pertumbuhan bulu halus pada bintik-bintik di bagian bawah daun; daun berkerut."
},
{
  "id": 39286,
  "english": "Distorted leaves; severely infected leaves turn yellow and drop from the tree.",
  "indonesian": "Daun yang terdistorsi; daun yang terinfeksi parah berubah menjadi kuning dan gugur dari pohon."
},
{
  "id": 39287,
  "english": "Fire blight symptoms may appear on the blossoms, shoots, branches, trunk, and rootstock.",
  "indonesian": "Gejala busuk api mungkin muncul pada bunga, tunas, cabang, batang, dan stok akar."
},
{
  "id": 39288,
  "english": "Watery exudate may be present on infected areas.",
  "indonesian": "Eksudat berair mungkin ada di area yang terinfeksi."
},
{
  "id": 39289,
  "english": "Blighted blossoms appear wilted, shriveled, and brown. Young fruitlets are also very susceptible.",
  "indonesian": "Bunga yang terserang busuk tampak layu, kering, dan coklat. Buah muda juga sangat rentan."
},
{
  "id": 39290,
  "english": "Leaf spots are first yellow, then turn bright orange-red, often with a bright red border.",
  "indonesian": "Bintik-bintik pada daun pertama kali kuning, kemudian berubah menjadi merah jingga terang, sering dengan pinggiran merah terang."
},
{
  "id": 39291,
  "english": "Small, raised, black dots form in the center of leaf spots on the upper leaf surface when the leaf spots mature.",
  "indonesian": "Titik-titik hitam kecil, terangkat, terbentuk di tengah bintik-bintik pada permukaan daun atas ketika bintik-bintik daun matang."
},
{
  "id": 39292,
  "english": "Rarely, green to brown irregular spots with black dots form on the fruit surface. Fruit spots do not extend deep into the fruit.",
  "indonesian": "Jarang, bintik-bintik tidak teratur hijau hingga coklat dengan titik-titik hitam terbentuk di permukaan buah. Bintik-bintik buah tidak menembus ke dalam buah."
},
{
  "id": 39293,
  "english": "Large brown rotten areas can form anywhere on the fruit but are most common on the blossom end.",
  "indonesian": "Area busuk coklat besar dapat terbentuk di mana saja pada buah tetapi paling umum terjadi di ujung bunga."
},
{
  "id": 39294,
  "english": "Brown to black concentric rings can often be seen on larger infections.",
  "indonesian": "Cincin konsentris coklat hingga hitam sering terlihat pada infeksi yang lebih besar."
},
{
  "id": 39295,
  "english": "The flesh of the apple is brown but remains firm. Small, black spots can be seen on older fruit infections.",
  "indonesian": "Daging apel berwarna coklat tetapi tetap keras. Titik-titik hitam kecil dapat terlihat pada infeksi buah yang lebih tua."
},
{
  "id": 39296,
  "english": "It attacks the leaves, flowers, stalks of panicle and fruits, causing a superficial white powdery appearance on it.",
  "indonesian": "Penyakit ini menyerang daun, bunga, tangkai malai, dan buah, menyebabkan penampilan serbuk putih yang dangkal pada permukaannya."
},
{
  "id": 39297,
  "english": "The disease spreads by wind very rapidly. Generally, the infection starts from the inflorescence and spreads downwards, covering the floral axis, tender leaves, and soft stem.",
  "indonesian": "Penyakit ini menyebar dengan sangat cepat melalui angin. Umumnya, infeksi dimulai dari infloresensi dan menyebar ke bawah, menutupi sumbu bunga, daun muda, dan batang yang lunak."
},
{
  "id": 39298,
  "english": "Flowers fail to open, blacken, or become brown, dry, and may fall from panicles.",
  "indonesian": "Bunga gagal mekar, menjadi hitam, atau menjadi coklat, kering, dan mungkin rontok dari malai."
},
{
  "id": 39299,
  "english": "The first symptoms on panicles are small black or dark-brown spots, which can enlarge, coalesce, and kill the flowers before fruits are produced. Petioles, twigs, and stems are also susceptible and develop into a typical black color.",
  "indonesian": "Gejala pertama pada malai adalah bintik-bintik hitam kecil atau coklat gelap, yang dapat membesar, bergabung, dan membunuh bunga sebelum buah diproduksi. Petiol, ranting, dan batang juga rentan dan berkembang menjadi warna hitam khas."
},
{
  "id": 39300,
  "english": "Vegetative Malformation: It is more commonly found on young seedlings. It is characterized by disrupting of apical growth resulting in several small flushes.",
  "indonesian": "Malformasi Vegetatif: Lebih umum ditemukan pada bibit muda. Ini ditandai dengan gangguan pertumbuhan apikal yang menghasilkan beberapa flush kecil."
},
{
  "id": 39301,
  "english": "The multi-branching of the shoot apex with scaly leaves is known as 'Bunchy Top' or 'Witches' Broom'. The malformed seedlings remain stunted and die.",
  "indonesian": "Cabang multi-asing dari apex tunas dengan daun bersisik dikenal sebagai 'Bunchy Top' atau 'Witches' Broom'. Bibit yang cacat tetap kerdil dan mati."
},
{
  "id": 39302,
  "english": "Floral Malformation: In malformation of inflorescence, shows variation in the panicle. Malformed head dries up in a black mass and persists for a long time.",
  "indonesian": "Malformasi Bunga: Dalam malformasi infloresensi, menunjukkan variasi di malai. Kepala yang cacat mengering menjadi massa hitam dan bertahan untuk waktu yang lama."
},
{
  "id": 39303,
  "english": "The disease is noticed on leaves, leaf stalks, stems, twigs, branches, and fruits, initially producing water-soaked lesions, later turning into a typical canker.",
  "indonesian": "Penyakit ini teramati pada daun, tangkai daun, batang, ranting, cabang, dan buah, awalnya menghasilkan lesi berair, kemudian berubah menjadi borok yang khas."
},
{
  "id": 39304,
  "english": "Water-soaked irregular satellites to angular raised lesions measuring 1-4 mm in diameter are formed. These lesions are light yellow in color, initially with a yellow halo but with age enlarge or coalesce to form irregular necrotic cankerous patches with dark brown color.",
  "indonesian": "Lesi berair tidak beraturan menjadi lesi terangkat angular berdiameter 1-4 mm terbentuk. Lesi ini berwarna kuning muda, awalnya dengan halo kuning tetapi seiring bertambahnya usia membesar atau bergabung membentuk bercak borok nekrotik yang tidak beraturan dengan warna coklat tua."
},
{
  "id": 39305,
  "english": "Water-soaked, dark brown to black-colored lesions are observed, which gradually develop into cankerous, raised or flat spots. These spots often burst, extruding gummy substances containing highly contagious bacterial cells.",
  "indonesian": "Lesi berwarna coklat tua hingga hitam yang berair teramati, yang secara bertahap berkembang menjadi bercak-bercak borok, terangkat atau datar. Bercak-bercak ini sering pecah, mengeluarkan zat berkleister yang mengandung sel bakteri yang sangat menular."
},
{
  "id": 39306,
  "english": "The pathogen causing dieback, tip dieback, graft union blight, twig blight, seedling rot, wood stain, stem-end rot, black root rot, fruit rot, dry rot, brown rot of panicle, etc.",
  "indonesian": "Patogen yang menyebabkan dieback, tip dieback, graft union blight, twig blight, seedling rot, wood stain, stem-end rot, black root rot, fruit rot, dry rot, brown rot of panicle, dll."
},
{
  "id": 39307,
  "english": "Foot rot",
  "indonesian": "Busuk kaki"
},
{
  "id": 39308,
  "english": "Papaya ring spot",
  "indonesian": "Bercak cincin pepaya"
},
{
  "id": 39309,
  "english": "On the undersurface of disease leaves are found patches of whitish powder growth",
  "indonesian": "Pada permukaan bawah daun penyakit ditemukan bercak pertumbuhan serbuk putih"
},
{
  "id": 39310,
  "english": "On upper surfaces, leaves at the infection site show blotches of yellow or pale green usually near vein, surrounded by normally colored tissue.",
  "indonesian": "Pada permukaan atas, daun di tempat infeksi menunjukkan bercak kuning atau hijau pucat biasanya dekat dengan urat, dikelilingi oleh jaringan berwarna normal."
},
{
  "id": 39311,
  "english": "Occasionally, fungus may attack the stem of young seedling when grown under reduced light condition.",
  "indonesian": "Kadang-kadang, jamur dapat menyerang batang bibit muda ketika tumbuh di bawah kondisi cahaya yang berkurang."
},
{
  "id": 39312,
  "english": "It is characterized by the appearance of water-soaked patches on the stem near the ground level.",
  "indonesian": "Ditandai dengan munculnya bercak-bercak yang berair pada batang dekat permukaan tanah."
},
{
  "id": 39313,
  "english": "These patches enlarge rapidly and girdle the stem, causing rotting of the tissues, which then turn dark brown or black. If the disease attack is mild, only one side of the stem rots and the plants remain stunted.",
  "indonesian": "Bercak-bercak ini membesar dengan cepat dan mengelilingi batang, menyebabkan pembusukan jaringan, yang kemudian berubah menjadi coklat tua atau hitam. Jika serangan penyakit ringan, hanya satu sisi batang yang membusuk dan tanaman tetap kerdil."
},
{
  "id": 39314,
  "english": "Fruit if formed are shriveled and malformed. Gradually the plant dies.",
  "indonesian": "Jika buah terbentuk kering dan cacat. Secara bertahap tanaman mati."
},
{
  "id": 39315,
  "english": "The disease occurs both in the field and in storage conditions.",
  "indonesian": "Penyakit terjadi baik di lapangan maupun dalam kondisi penyimpanan."
},
{
  "id": 39316,
  "english": "The spots on fruits first appear as brown superficial discoloration of the skin which develops into circular, slightly sunken areas and 1 to 3 cm in dia.",
  "indonesian": "Bercak pada buah pertama kali muncul sebagai perubahan warna coklat pada permukaan kulit yang berkembang menjadi daerah bulat, sedikit cekung dengan diameter 1 hingga 3 cm."
},
{
  "id": 39317,
  "english": "Gradually the lesions coalesce and sparse mycelia growth appears on the margins of the spots.",
  "indonesian": "Secara bertahap lesi-lesi bergabung dan pertumbuhan miselium yang jarang muncul di pinggiran bercak."
},
{
  "id": 39318,
  "english": "Infected plant initially shows chlorosis on youngest leaves followed by vein clearing, rugosity and prominent mottling of laminae.",
  "indonesian": "Tanaman yang terinfeksi awalnya menunjukkan klorosis pada daun muda diikuti oleh pembersihan urat, rugositas, dan mottling yang menonjol pada lamina."
},
{
  "id": 39319,
  "english": "Malformation and reduction of the lamina which may become extremely filiform.",
  "indonesian": "Malformasi dan pengurangan lamina yang mungkin menjadi sangat filiform."
},
{
  "id": 39320,
  "english": "Characteristically elongated dark green streak develop on petiole and upper half of the stems, infected fruits show circular concentric rings causes upto 56-60 % yield loss.",
  "indonesian": "Ciri-ciri garis hijau gelap yang terbentuk secara khas pada pelepah dan setengah bagian atas batang, buah yang terinfeksi menunjukkan cincin konsentris melingkar menyebabkan kerugian hasil hingga 56-60%."
},
{
  "id": 39321,
  "english": "Flattened oval to round disc-like insect covered in waxy substance on tree branches",
  "indonesian": "Serangga pipih berbentuk cakram oval hingga bulat yang dilapisi zat lilin pada cabang pohon"
},
{
  "id": 39322,
  "english": "Insects attract ants which may also be present",
  "indonesian": "Serangga menarik semut yang mungkin juga ada"
},
{
  "id": 39323,
  "english": "Insect colony may also be associated with growth of sooty mold due to fungal colonization of sugary honeydew excreted by the insect",
  "indonesian": "Kolonisasi serangga juga dapat dikaitkan dengan pertumbuhan jamur jelaga karena kolonisasi jamur dari madu manis yang dikeluarkan oleh serangga"
},
{
  "id": 39324,
  "english": "Colonize on the underside of tender leaves",
  "indonesian": "Kolonisasi pada bagian bawah daun yang lembut"
},
{
  "id": 39325,
  "english": "The female punctures outer wall of mature fruits with the help of its pointed ovipositor and insert eggs in small clusters inside mesocarp of mature fruits",
  "indonesian": "Betina menusuk dinding luar buah matang dengan bantuan ovipositor yang runcing dan memasukkan telur dalam kelompok kecil di dalam mesokarp buah matang"
},
{
  "id": 39326,
  "english": "On hatching, the maggots feed on fruit pulp",
  "indonesian": "Setelah menetas, belatung memakan daging buah"
},
{
  "id": 39327,
  "english": "The infested fruits start rotting due to further secondary infection",
  "indonesian": "Buah yang terinfeksi mulai membusuk akibat infeksi sekunder yang lebih lanjut"
},
{
  "id": 39328,
  "english": "Both nymphs and adults suck the sap from the lower leaf surfaces which leads to yellowing",
  "indonesian": "Baik nimfa maupun dewasa menghisap getah dari permukaan daun bagian bawah yang menyebabkan menguning"
},
{
  "id": 39329,
  "english": "When several insects suck the sap from the same leaf, yellow spots appear on the leaves",
  "indonesian": "Ketika beberapa serangga menghisap getah dari daun yang sama, bercak kuning muncul pada daun"
},
{
  "id": 39330,
  "english": "Crinkling, curling, bronzing, and drying, or “hopper burn”",
  "indonesian": "Keriput, menggulung, menguning, dan mengering, atau “hopper burn”"
},
{
  "id": 39331,
  "english": "Papaya (Saudi Arabia)",
  "indonesian": "Pepaya (Arab Saudi)"
},
{
  "id": 39332,
  "english": "Red lady",
  "indonesian": null
},
{
  "id": 39333,
  "english": "Red bella",
  "indonesian": null
},
{
  "id": 39334,
  "english": "Potato (Saudi Arabia)",
  "indonesian": "Kentang (Arab Saudi)"
},
{
  "id": 39335,
  "english": "Spunta",
  "indonesian": null
},
{
  "id": 39336,
  "english": "Ajax",
  "indonesian": null
},
{
  "id": 39337,
  "english": "Mirka",
  "indonesian": null
},
{
  "id": 39338,
  "english": "Diamont",
  "indonesian": null
},
{
  "id": 39339,
  "english": "Espunta",
  "indonesian": null
},
{
  "id": 39340,
  "english": "Citrix",
  "indonesian": null
},
{
  "id": 39341,
  "english": "Frizia",
  "indonesian": null
},
{
  "id": 39342,
  "english": "Kawalic",
  "indonesian": null
},
{
  "id": 39343,
  "english": "Aboulx",
  "indonesian": null
},
{
  "id": 39344,
  "english": "Mondial",
  "indonesian": null
},
{
  "id": 39345,
  "english": "Safaren",
  "indonesian": null
},
{
  "id": 39346,
  "english": "Edward",
  "indonesian": null
},
{
  "id": 39347,
  "english": "Etfadoal",
  "indonesian": null
},
{
  "id": 39348,
  "english": "Date Palm (Saudi arabia)",
  "indonesian": "Kurma (Arab Saudi)"
},
{
  "id": 39349,
  "english": "Ajwa",
  "indonesian": null
},
{
  "id": 39350,
  "english": "Safawi",
  "indonesian": null
},
{
  "id": 39351,
  "english": "Khalas",
  "indonesian": null
},
{
  "id": 39352,
  "english": "Sukkari",
  "indonesian": null
},
{
  "id": 39353,
  "english": "Khadrawy",
  "indonesian": null
},
{
  "id": 39354,
  "english": "Olive (Saudi Arabia)",
  "indonesian": "Zaitun (Arab Saudi)"
},
{
  "id": 39355,
  "english": "Arbosona",
  "indonesian": null
},
{
  "id": 39356,
  "english": "Arbequina",
  "indonesian": null
},
{
  "id": 39357,
  "english": "Picual",
  "indonesian": null
},
{
  "id": 39358,
  "english": "Koroneiki",
  "indonesian": null
},
{
  "id": 39359,
  "english": "Kaissy H-85",
  "indonesian": null
},
{
  "id": 39360,
  "english": "Picual H-78",
  "indonesian": null
},
{
  "id": 39361,
  "english": "Sorani",
  "indonesian": null
},
{
  "id": 39362,
  "english": "K-18",
  "indonesian": null
},
{
  "id": 39363,
  "english": "Pale or yellow choloric lesions on leaves surface",
  "indonesian": "Lesi pucat atau kuning pada permukaan daun"
},
{
  "id": 39364,
  "english": "Lesions turn pink, red, purple, or light-brown, depending on the plant’s pigments",
  "indonesian": "Lesi berubah menjadi pink, merah, ungu, atau cokelat muda, tergantung pada pigmen tanaman"
},
{
  "id": 39365,
  "english": "Initial symptoms are small, humid spots on the upper-third part of the stalk.",
  "indonesian": "Gejala awal berupa bercak kecil yang lembab pada bagian atas sepertiga batang."
},
{
  "id": 39366,
  "english": "The foliage becomes chlorotic and wilts",
  "indonesian": "Daun menjadi klorotik dan layu"
},
{
  "id": 39367,
  "english": "Panicle does not form grain and the stalk bends downward and tends to break easily.",
  "indonesian": "Malai tidak membentuk biji dan batang melengkung ke bawah dan cenderung mudah patah."
},
{
  "id": 39368,
  "english": "Dwarfing and bronze discolouration of the leaflets.",
  "indonesian": "Pengkerdilan dan perubahan warna menjadi perunggu pada daun kecil."
},
{
  "id": 39369,
  "english": "Lesions on the leaves are of irregular shape, and are bronze to reddish-brown with darker edges.",
  "indonesian": "Lesi pada daun memiliki bentuk yang tidak teratur, dan berwarna perunggu hingga cokelat kemerahan dengan pinggiran yang lebih gelap."
},
{
  "id": 39370,
  "english": "Stems shows necrosis",
  "indonesian": "Batang menunjukkan nekrosis"
},
{
  "id": 39371,
  "english": "Small irregular spots in leaves and stems",
  "indonesian": "Bercak kecil yang tidak teratur pada daun dan batang"
},
{
  "id": 39372,
  "english": "Cankers on old twings and brances",
  "indonesian": "Kanker pada ranting dan cabang tua"
},
{
  "id": 39373,
  "english": "Stunted sterile bushy shoots",
  "indonesian": "Tunas semak yang terhambat dan steril"
},
{
  "id": 39374,
  "english": "Drying of entire clump",
  "indonesian": "Pengeringan seluruh rumpun"
},
{
  "id": 39375,
  "english": "Drying of plants",
  "indonesian": "Pengeringan tanaman"
},
{
  "id": 39376,
  "english": "Mosaic apprearance on leaves",
  "indonesian": "Penampilan mozaik pada daun"
},
{
  "id": 39377,
  "english": "Drying, withering of leaves and finally plants die",
  "indonesian": "Pengeringan, layu daun dan akhirnya tanaman mati"
},
{
  "id": 39378,
  "english": "Leaves becomes necrotic and dries",
  "indonesian": "Daun menjadi nekrotik dan kering"
},
{
  "id": 39379,
  "english": "Brittle pseudostem",
  "indonesian": "Batang tiruan yang rapuh"
},
{
  "id": 39380,
  "english": "Lodging",
  "indonesian": "Penginapan"
},
{
  "id": 39381,
  "english": "Deformed leaves",
  "indonesian": "Daun yang cacat"
},
{
  "id": 39382,
  "english": "Yellow or pale green leaf spots",
  "indonesian": "Bercak daun kuning atau hijau pucat"
},
{
  "id": 39383,
  "english": "Reduced vegetative growth",
  "indonesian": "Pertumbuhan vegetatif yang terbatas"
},
{
  "id": 39384,
  "english": "Cankers on young stems",
  "indonesian": "Kanker pada batang muda"
},
{
  "id": 39385,
  "english": "Brown necrosis on leaves",
  "indonesian": "Nekrosis cokelat pada daun"
},
{
  "id": 39386,
  "english": "Drying stems",
  "indonesian": "Batang mengering"
},
{
  "id": 39387,
  "english": "Angular spots on limb",
  "indonesian": "Bercak sudut pada anggota badan"
},
{
  "id": 39388,
  "english": "Foliage burns",
  "indonesian": "Daun terbakar"
},
{
  "id": 39389,
  "english": "Leaves wilt",
  "indonesian": "Daun layu"
},
{
  "id": 39390,
  "english": "Necrosis of roots",
  "indonesian": "Nekrosis akar"
},
{
  "id": 39391,
  "english": "Knots in the roots",
  "indonesian": "Benjolan di akar"
},
{
  "id": 39392,
  "english": "The disease appears as small red colored spots on both surfaces of the leaf.",
  "indonesian": "Penyakit ini muncul sebagai bercak merah kecil pada kedua permukaan daun."
},
{
  "id": 39393,
  "english": "The center of the spot is white in color encircled by red, purple or brown margin.",
  "indonesian": "Pusat bercak berwarna putih dikelilingi oleh pinggiran merah, ungu, atau coklat."
},
{
  "id": 39394,
  "english": "Numerous small black dots like acervuli are seen on the white surface of the lesions.",
  "indonesian": "Banyak titik hitam kecil seperti acervuli terlihat pada permukaan putih lesi."
},
{
  "id": 39395,
  "english": "Develop a fluffy white or pinkish coloration. C. lunata colors the grain black.",
  "indonesian": "Mengembangkan pewarnaan putih atau kemerahan yang berbulu. C. lunata mewarnai biji hitam."
},
{
  "id": 39396,
  "english": "Grain infected with these fungi develop a fluffy white or pinkish coloration.",
  "indonesian": "Biji yang terinfeksi oleh jamur ini mengembangkan pewarnaan putih atau kemerahan yang berbulu."
},
{
  "id": 39397,
  "english": "Curvularia lunata is also frequently encountered and this fungus colors the grains black.",
  "indonesian": "Curvularia lunata juga sering dijumpai dan jamur ini mewarnai biji hitam."
},
{
  "id": 39398,
  "english": "The individual grains are replaced by smut sori. Sori are covered with creamy skin.",
  "indonesian": "Butiran-butiran individu digantikan oleh sori hama. Sori ditutupi dengan kulit krim."
},
{
  "id": 39399,
  "english": "Sori can be localized at a particular part of the head, or can occur over the entire inflorescence.",
  "indonesian": "Sori dapat terlokalisir di bagian tertentu dari kepala, atau dapat terjadi di seluruh infloresensi."
},
{
  "id": 39400,
  "english": "Ratoon crops exhibit a higher disease incidence",
  "indonesian": "Tanaman rebung menunjukkan kejadian penyakit yang lebih tinggi"
},
{
  "id": 39401,
  "english": "It invades the growing points of young plants, either through oospore or conidial infection.",
  "indonesian": "Ini menyerang titik pertumbuhan tanaman muda, baik melalui infeksi oospora atau konidial."
},
{
  "id": 39402,
  "english": "As the leaves unfold they exhibit green or yellow coloration.",
  "indonesian": "Saat daun terbuka, mereka menunjukkan pewarnaan hijau atau kuning."
},
{
  "id": 39403,
  "english": "Abundant downy white growth is produced on the lower surface of the leaves, which consists of sporangiophores and sporangia.",
  "indonesian": "Pertumbuhan putih berbulu yang melimpah dihasilkan pada permukaan bawah daun, yang terdiri dari sporangiophore dan sporangia."
},
{
  "id": 39404,
  "english": "The entire ear head is either completely or partially replaced by a large whitish gall.",
  "indonesian": "Seluruh kepala malai entah sepenuhnya atau sebagian digantikan oleh sebuah kantung putih besar."
},
{
  "id": 39405,
  "english": "The spores are blown away, exposing the dark filaments",
  "indonesian": "Spora dibawa angin, mengekspos serat gelap"
},
{
  "id": 39406,
  "english": "Relatively small proportion of the florets are infected.",
  "indonesian": "Proporsi bunga yang terinfeksi relatif kecil."
},
{
  "id": 39407,
  "english": "The sori or spore sacs are cylindrical, elongate, usually slightly curved with a relatively thick creamy-brown covering membrane.",
  "indonesian": "Sori atau kantung spora berbentuk silinder, memanjang, biasanya sedikit melengkung dengan membran penutup berwarna krim-coklat yang relatif tebal."
},
{
  "id": 39408,
  "english": "Sprouting, emergence of the bud",
  "indonesian": "Perkecambahan, munculnya tunas"
},
{
  "id": 39409,
  "english": "The sori, which vary in length from 3 to 18 mm, is the solid long black (often curved) pointed columella which extends almost the full length of the sorus and which remains conspicuous after the smut spores have been blown away",
  "indonesian": "Sori, yang panjangnya bervariasi dari 3 hingga 18 mm, adalah kolumela hitam panjang yang padat (sering kali melengkung) yang hampir mencapai seluruh panjang sorus dan tetap mencolok setelah spora smut telah terbawa angin"
},
{
  "id": 39410,
  "english": "The first symptoms are small flecks on the lower leaves (purple, tan or red depending upon the cultivar).",
  "indonesian": "Gejala pertama adalah bercak kecil pada daun bagian bawah (ungu, cokelat muda, atau merah tergantung pada varietas)."
},
{
  "id": 39411,
  "english": "Pustules (uredosori) appear on both surfaces of leaf as purplish spots which rupture to release reddish powdery masses of uredospores.",
  "indonesian": "Pustula (uredosori) muncul pada kedua permukaan daun sebagai bercak ungu yang pecah untuk melepaskan massa bubuk merah muda dari uredospora."
},
{
  "id": 39412,
  "english": "The pustules may also occur on the leaf sheaths and on the stalks of inflorescence",
  "indonesian": "Pustula juga bisa terjadi pada selubung daun dan pada tangkai infloresensi"
},
{
  "id": 39413,
  "english": "The young radical and the plumule are killed and there is complete rotting of the seedlings.",
  "indonesian": "Akar muda dan plmula mati dan ada pembusukan lengkap pada bibit."
},
{
  "id": 39414,
  "english": "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level.",
  "indonesian": "Fase pasca-tumbuh ditandai dengan infeksi jaringan muda, juvenil dari kerah pada tingkat tanah."
},
{
  "id": 39415,
  "english": "The infected tissues become soft and water soaked. The seedlings topple over or collapse.",
  "indonesian": "Jaringan yang terinfeksi menjadi lunak dan tergenang air. Bibit tumbang atau runtuh."
},
{
  "id": 39416,
  "english": "The disease is characterized by scattered, rapidly enlarging, irregular, brown, water-soaked lesions with characteristic gray-green borders.",
  "indonesian": "Penyakit ini ditandai dengan lesi berbentuk bercak, dengan cepat membesar, tidak teratur, coklat, tergenang air dengan batas berwarna abu-abu-hijau yang khas."
},
{
  "id": 39417,
  "english": "During mid nursery period causing leaf blight and blackening of roots and stems leading to death of seedlings. Water soaked brown to black lesions appear on the leaf.",
  "indonesian": "Selama periode awal masa penyadapan menyebabkan penyakit layu daun dan penghitaman akar dan batang yang mengakibatkan kematian bibit. Lesi berwarna coklat hingga hitam yang tergenang air muncul pada daun."
},
{
  "id": 39418,
  "english": "These patches enlarge and coalesce leading to wet rot of leaf tissue and midribs.",
  "indonesian": "Bercak-bercak ini membesar dan bergabung sehingga menyebabkan pembusukan basah pada jaringan daun dan pelepah daun tengah."
},
{
  "id": 39419,
  "english": "Just like damping off, sudden death of seedlings in patches is noticed in seed beds.",
  "indonesian": "Sama seperti damping off, kematian mendadak bibit dalam bercak terlihat di tempat tidur bibit."
},
{
  "id": 39420,
  "english": "Blackening of the collar region, wilting and rotting of leaves are the symptoms.",
  "indonesian": "Penghitaman daerah kerah, layu dan pembusukan daun adalah gejalanya."
},
{
  "id": 39421,
  "english": "Yellowing (chlorosis) of older leaves, wilting of plants, or flagging of leaf tips",
  "indonesian": "Pemucatan (klorosis) pada daun tua, layu tanaman, atau ujung daun menggugur"
},
{
  "id": 39422,
  "english": "Symptom appears as small water soaked spots with sunken center on leaves.",
  "indonesian": "Gejala muncul sebagai bercak kecil yang tergenang air dengan pusat cekung pada daun."
},
{
  "id": 39423,
  "english": "Spots become white with brown margin.",
  "indonesian": "Bercak menjadi putih dengan tepi cokelat."
},
{
  "id": 39424,
  "english": "Lesions occur also on midribs, petioles and lateral veins causing distortion and ragged.",
  "indonesian": "Lesi juga terjadi pada pelepah daun, tangkai daun, dan urat samping menyebabkan distorsi dan berkerut."
},
{
  "id": 39425,
  "english": "Several small, round brown lesions with 2-10 mm diameter on lower and mature leaves occur.",
  "indonesian": "Beberapa lesi cokelat bulat kecil dengan diameter 2-10 mm pada daun bawah dan dewasa terjadi."
},
{
  "id": 39426,
  "english": "Typical lesion with white parchment center surrounded by brown or tan colored margin resembling eye of frog.",
  "indonesian": "Lesi khas dengan pusat kertas putih yang dikelilingi oleh tepi berwarna cokelat atau cokelat muda menyerupai mata katak."
},
{
  "id": 39427,
  "english": "Different spots coalesce causing drying of leaves which wither prematurely.",
  "indonesian": "Bercak yang berbeda bergabung menyebabkan pengeringan daun yang layu secara prematur."
},
{
  "id": 39428,
  "english": "Infected leaves show mottling veins show shortened internodes with small, distorted leaves.",
  "indonesian": "Daun yang terinfeksi menunjukkan pembilasan urat-urat vena yang menunjukkan internodium yang pendek dengan daun kecil yang terdistorsi."
},
{
  "id": 39429,
  "english": "In later growth of plant stunted and limited to basal suckers, and the vine eventually dies.",
  "indonesian": "Pada pertumbuhan selanjutnya tanaman terhambat dan terbatas pada tunas basal, dan akhirnya tanaman anggur mati."
},
{
  "id": 39430,
  "english": "Dead and dying vines are usually present in a roughly circular pattern in the vineyard.",
  "indonesian": "Tanaman anggur mati dan layu biasanya ada dalam pola bundar kasar di kebun anggur."
},
{
  "id": 39431,
  "english": "Disease plants show leaves with mottling or mosaic pattern of light green and dark-green areas.",
  "indonesian": "Tanaman sakit menunjukkan daun dengan motif bercak atau mozaik dari daerah hijau muda dan hijau tua."
},
{
  "id": 39432,
  "english": "Vein clearing, greenish yellow mottling occur as primary symptoms on newly formed young leaves.",
  "indonesian": "Pembilasan urat, mottling kuning kehijauan terjadi sebagai gejala utama pada daun muda yang baru terbentuk."
},
{
  "id": 39433,
  "english": "Infection on young plants results in stunted growth, malformation, distortion and puckering of leaves. Dark-green blisters and sometime enations (leafy growth) appear on the dorsal side of the leaf.",
  "indonesian": "Infeksi pada tanaman muda mengakibatkan pertumbuhan terhambat, malformasi, distorsi, dan keriput daun. Gelembung hijau tua dan kadang-kadang enasi (pertumbuhan berdaun) muncul pada sisi dorsal daun."
},
{
  "id": 39434,
  "english": "Symptom development occurs particularly during and immediately following periods of heavy rains and high relative humidity.",
  "indonesian": "Pengembangan gejala terutama terjadi selama dan segera setelah periode hujan deras dan kelembaban relatif tinggi."
},
{
  "id": 39435,
  "english": "Wilting during the heat of the day.",
  "indonesian": "Layu selama panas siang hari."
},
{
  "id": 39436,
  "english": "Initially it appears on lower and older leaves as small brown, concentric circular lesions, which spread to upper leaves, petioles, stalks, and capsules even.",
  "indonesian": "Awalnya muncul pada daun yang lebih rendah dan lebih tua sebagai lesi kecil berwarna cokelat, lingkaran konsentris, yang menyebar ke daun atas, pelepah, batang, dan kapsul bahkan."
},
{
  "id": 39437,
  "english": "In warm weather under high humidity, the leaf spots enlarge, 1-3 cm in diameter, centers are necroses and turn brown with characteristic marking giving a target board appearance with a definite outline.",
  "indonesian": "Pada cuaca hangat di bawah kelembaban tinggi, bercak pada daun membesar, berdiameter 1-3 cm, pusatnya nekrosis dan berubah menjadi cokelat dengan tanda khas memberikan penampilan papan sasaran dengan garis tepi yang pasti."
},
{
  "id": 39438,
  "english": "In severe infection spots enlarge, coalesce, and damage large areas making leaves dark-brown, ragged, and worthless.",
  "indonesian": "Pada infeksi yang parah, bercak membesar, bergabung, dan merusak area besar membuat daun menjadi cokelat tua, berkerut, dan tidak berharga."
},
{
  "id": 39439,
  "english": "It is a complete root parasite affecting the yield and quality of tobacco.",
  "indonesian": "Ini adalah parasit akar lengkap yang memengaruhi hasil dan kualitas tembakau."
},
{
  "id": 39440,
  "english": "The shoots emerge in clusters, and their basal portion is attached to tobacco roots through which it draws nourishment and depletes the host, resulting in a yield loss of 24 to 52%. Affected plants become stunted, leaves turn pale, and wilt.",
  "indonesian": "Tunas muncul dalam kelompok, dan bagian basalnya melekat pada akar tembakau melalui mana ia menyerap nutrisi dan menguras inang, mengakibatkan kerugian hasil 24 hingga 52%. Tanaman yang terpengaruh menjadi terhambat, daun berubah pucat, dan layu."
},
{
  "id": 39441,
  "english": "Initially leaf tips droop, and as the attack intensifies, all the leaves wilt.",
  "indonesian": "Awalnya ujung daun menggantung, dan saat serangan intensif, semua daun layu."
},
{
  "id": 39442,
  "english": "Disease is characterized by downward curling & rolling of leaves; thickening; dark green in color with vein clearing effect; brittle; enation (cup like or frill like outgrowth), reduction in size.",
  "indonesian": "Penyakit ini ditandai dengan menggulung & melingkar ke bawah daun; penebalan; berwarna hijau gelap dengan efek pembersihan urat; rapuh; enasi (pertumbuhan seperti cangkir atau rumbai), penurunan ukuran."
},
{
  "id": 39443,
  "english": "Infected plants become stunted due to shortening of internodes and the formation of more lateral branches.",
  "indonesian": "Tanaman yang terinfeksi menjadi terhambat karena pemendekan internodium dan pembentukan cabang lateral yang lebih banyak."
},
{
  "id": 39444,
  "english": "Flowers are deformed; partly or completely sterile.",
  "indonesian": "Bunga-bunga terdeformasi; sebagian atau sepenuhnya steril."
},
{
  "id": 39445,
  "english": "Affected plants show leaves with mottling or mosaic pattern of light green and dark-green areas.",
  "indonesian": "Tanaman yang terpengaruh menunjukkan daun dengan motif bercak atau mozaik dari daerah hijau muda dan hijau tua."
},
{
  "id": 39446,
  "english": "Primary symptoms appear on newly formed young leaves as vein clearing, greenish yellow mottling.",
  "indonesian": "Gejala utama muncul pada daun muda yang baru terbentuk sebagai pembilasan urat, mottling kuning kehijauan."
},
{
  "id": 39447,
  "english": "Darkgreen blisters and sometime enations (leafy growth) appear on the dorsal side of the leaf.",
  "indonesian": "Gelembung hijau tua dan kadang-kadang enasi (pertumbuhan berdaun) muncul pada sisi dorsal daun."
},
{
  "id": 39448,
  "english": "Initially, greyish-white spots (about 0.5-cm in diameter) appear at the base of the lower leaves of the maturing plant.",
  "indonesian": "Pada awalnya, bercak-bercak putih keabu-abuan (sekitar 0,5 cm diameter) muncul di bagian dasar daun bawah tanaman yang matang."
},
{
  "id": 39449,
  "english": "Sometimes leaves with incipient infection result in blemishes on curing, which reduce the commercial value of leaves.",
  "indonesian": "Kadang-kadang daun dengan infeksi awal menghasilkan noda pada pengeringan, yang mengurangi nilai komersial daun."
},
{
  "id": 39450,
  "english": "Such leaves, on curing, get scorched and show brown patches rendering them unfit for marketing.",
  "indonesian": "Daun seperti itu, saat pengeringan, menjadi gosong dan menunjukkan bercak cokelat yang membuatnya tidak layak untuk pemasaran."
},
{
  "id": 39451,
  "english": "The leaves of the affected plants become yellow.",
  "indonesian": "Daun tanaman yang terkena menjadi kuning."
},
{
  "id": 39452,
  "english": "Water-soaked appearance is found at the base of the pseudostem, and rotting takes place at the basal portion.",
  "indonesian": "Penampilan tergenang air ditemukan di dasar pseudostem, dan pembusukan terjadi di bagian basal."
},
{
  "id": 39453,
  "english": "The affected rhizomes become soft and pulpy, and plants easily collapse on pressing.",
  "indonesian": "Rizom yang terkena menjadi lembut dan berpulp, dan tanaman dengan mudah roboh saat ditekan."
},
{
  "id": 39454,
  "english": "Mild drooping and curling of leaf margins of the lower leaf, and it progressively spreads through lower leaves to upper leaves.",
  "indonesian": "Pembengkokan dan kerut ringan pada tepi daun daun yang lebih rendah, dan secara bertahap menyebar melalui daun bawah ke daun atas."
},
{
  "id": 39455,
  "english": "At the severe condition, yellowing and wilting symptoms can be seen.",
  "indonesian": "Pada kondisi yang parah, gejala kuning dan layu dapat terlihat."
},
{
  "id": 39456,
  "english": "Milky ooze would be secreted from the affected pseudostem and rhizome when they are gently pressed by fingers.",
  "indonesian": "Getah susu akan dikeluarkan dari pseudostem dan rizom yang terkena ketika mereka dengan lembut ditekan oleh jari."
},
{
  "id": 39457,
  "english": "The symptoms of the disease start as a water-soaked spot and later turns as a white spot surrounded by dark brown margins and a yellow halo.",
  "indonesian": "Gejala penyakit dimulai sebagai bercak tergenang air dan kemudian berubah menjadi bercak putih yang dikelilingi oleh tepi cokelat gelap dan halo kuning."
},
{
  "id": 39458,
  "english": "Yellow halo",
  "indonesian": "Halo kuning"
},
{
  "id": 39459,
  "english": "The lesions enlarge and adjacent lesions coalesce to form necrotic areas.",
  "indonesian": "Lesi membesar dan lesi yang berdekatan bergabung untuk membentuk area nekrotik."
},
{
  "id": 39460,
  "english": "On upper surfaces, leaves at the infection site show blotches of yellow or pale green usually near veins, surrounded by normally colored tissue.",
  "indonesian": "Pada permukaan atas, daun di lokasi infeksi menunjukkan bercak kuning atau hijau pucat biasanya dekat dengan urat, dikelilingi oleh jaringan yang berwarna normal."
},
{
  "id": 39461,
  "english": "Occasionally, the fungus may attack the stem of young seedlings when grown under reduced light conditions.",
  "indonesian": "Kadang-kadang, jamur dapat menyerang batang bibit muda ketika ditanam di bawah kondisi cahaya yang berkurang."
},
{
  "id": 39462,
  "english": "The spots on fruits first appear as brown superficial discoloration of the skin which develops into circular, slightly sunken areas and 1 to 3 cm in diameter.",
  "indonesian": "Bercak pada buah pertama kali muncul sebagai perubahan warna cokelat di permukaan kulit yang berkembang menjadi area melingkar, agak cekung, dan berdiameter 1 hingga 3 cm."
},
{
  "id": 39463,
  "english": "Characteristically elongated dark green streaks develop on petiole and upper half of the stems, infected fruits show circular concentric rings causing up to 56-60% yield loss.",
  "indonesian": "Garis hijau tua yang memanjang secara khas berkembang pada petiol dan separuh bagian atas batang, buah yang terinfeksi menunjukkan cincin konsentrik melingkar yang menyebabkan kerugian hasil hingga 56-60%."
},
{
  "id": 39464,
  "english": "Roughly circular yellowish discolorations, called oil spots. White down (sporulation of the fungus), particularly on the lower leaf surface.",
  "indonesian": "Perubahan warna kekuningan secara kasar berbentuk lingkaran, disebut bercak minyak. Bulu putih (sporulasi jamur), terutama pada permukaan daun bawah."
},
{
  "id": 39465,
  "english": "The spots turn brown with time and severely infected leaves may drop.",
  "indonesian": "Bercak berubah menjadi cokelat seiring waktu dan daun yang terinfeksi parah mungkin rontok."
},
{
  "id": 39466,
  "english": "Infected shoot tips curl ('shepherd's crook') and a white down occurs on the stem (sporulation of the fungus)",
  "indonesian": "Ujung tunas yang terinfeksi menggulung ('tongkat gembala') dan getah putih terjadi pada batang (sporulasi jamur)"
},
{
  "id": 39467,
  "english": "The first powdery mildew lesions are frequently found on the undersides of leaves.",
  "indonesian": "Lesi pertama serbuk sari sering ditemukan di bagian bawah daun."
},
{
  "id": 39468,
  "english": "Very small orange to black spherical structures called cleistothecia develop on the upper and lower surfaces of leaves",
  "indonesian": "Struktur bulat kecil berwarna oranye hingga hitam yang disebut kleistotekia berkembang di permukaan atas dan bawah daun"
},
{
  "id": 39469,
  "english": "The gradual degeneration of the fungus over the course of the season",
  "indonesian": "Degenerasi bertahap jamur selama musim"
},
{
  "id": 39470,
  "english": "The fungus will cause small round spots",
  "indonesian": "Jamur akan menyebabkan bercak bulat kecil"
},
{
  "id": 39471,
  "english": "As they age, they give way to small holes (leaving a 'shot-hole' appearance)",
  "indonesian": "Saat bertambah tua, mereka memberi jalan pada lubang kecil (meninggalkan penampilan 'lubang tembak')"
},
{
  "id": 39472,
  "english": "Shoots: Deep elongated cankers, greyish in the center with a black edge",
  "indonesian": "Tunas: Cacar yang memanjang dan dalam, keabu-abuan di tengah dengan pinggiran hitam"
},
{
  "id": 39473,
  "english": "It can infect the green leaves and cause necrotic brown spots",
  "indonesian": "Ini dapat menginfeksi daun hijau dan menyebabkan bercak cokelat nekrotik"
},
{
  "id": 39474,
  "english": "Infected berries become covered with a greyish felt-like substance consisting of spores of the fungus",
  "indonesian": "Buah yang terinfeksi menjadi ditutupi dengan zat berbulu abu-abu yang mirip dengan kapas yang terdiri dari spora jamur"
},
{
  "id": 39475,
  "english": "Inflorescences can also be infected (b), causing the inflorescences to dry out or latent infections visible only at veraison.",
  "indonesian": "Infloresensi juga dapat terinfeksi (b), menyebabkan infloresensi mengering atau infeksi laten hanya terlihat pada masa veraison."
},
{
  "id": 39476,
  "english": "Leaves: presence of small brown lesions (2 to 10 mm in diameter) surrounded by a darker margin a ring of small black fruiting bodies (black pustules)",
  "indonesian": "Daun: adanya lesi cokelat kecil (2 hingga 10 mm dalam diameter) yang dikelilingi oleh tepi yang lebih gelap dan lingkaran tubuh buah hitam kecil (pustula hitam)"
},
{
  "id": 39477,
  "english": "Berries: At first, the berries become whitish then purple to black",
  "indonesian": "Buah: Pada awalnya, buah menjadi putih kemudian ungu menjadi hitam"
},
{
  "id": 39478,
  "english": "Berries: At the end of the season, berries will be covered by black pustules",
  "indonesian": "Buah: Pada akhir musim, buah akan ditutupi oleh pustula hitam"
},
{
  "id": 39479,
  "english": "Foliage spots first appear as small brown spots that are circular to angular in shape.",
  "indonesian": "Bercak daun pertama kali muncul sebagai bercak cokelat kecil yang berbentuk bulat hingga bersegi."
},
{
  "id": 39480,
  "english": "Foliage spots are irregular and turn dark brown or black. Stem lesions can girdle the stem and cause vines to wilt.",
  "indonesian": "Bercak daun tidak beraturan dan berubah menjadi cokelat tua atau hitam. Lesi batang dapat melingkari batang dan menyebabkan tanaman merambat layu."
},
{
  "id": 39481,
  "english": "The most striking diagnostic symptoms are produced on the fruit, where circular, black, sunken cankers appear.",
  "indonesian": "Gejala diagnostik paling mencolok muncul pada buah, di mana cacar hitam, cembung, berbentuk lingkaran muncul."
},
{
  "id": 39482,
  "english": "The disease starts as small, yellow spots which enlarge to form concentric rings on the upper leaf surfaces.",
  "indonesian": "Penyakit ini dimulai sebagai bercak kuning kecil yang membesar membentuk lingkaran konsentris di permukaan atas daun."
},
{
  "id": 39483,
  "english": "The pathogen also may cause fruit injury.",
  "indonesian": "Patogen juga dapat menyebabkan kerusakan pada buah."
},
{
  "id": 39484,
  "english": "Plants weakened by a lack of proper fertilizer or poor soils are more likely to be attacked than young, vigorously growing plants.",
  "indonesian": "Tanaman yang melemah karena kekurangan pupuk yang tepat atau tanah yang buruk lebih mungkin diserang daripada tanaman yang tumbuh muda dan subur."
},
{
  "id": 39485,
  "english": "Early symptoms of fruit blotch on foliage are useful in diagnosis. Small, water-soaked areas (a few millimeters in diameter) on cotyledons or leaves may develop, but they are easily overlooked.",
  "indonesian": "Gejala awal bercak buah pada daun sangat berguna dalam diagnosis. Daerah kecil yang berendam air (beberapa milimeter dalam diameter) pada kotiledon atau daun mungkin berkembang, tetapi mereka mudah terlewatkan."
},
{
  "id": 39486,
  "english": "These later turn brown, but they remain small and do not severely damage leaves. However, the leaf spots serve as a source of the pathogen to infect fruit.",
  "indonesian": "Kemudian bercak ini berubah menjadi coklat, tetapi tetap kecil dan tidak merusak daun secara parah. Namun, bercak daun berfungsi sebagai sumber patogen untuk menginfeksi buah."
},
{
  "id": 39487,
  "english": "Fruit infections first appear as small, water-soaked areas on the upper surface of melons.",
  "indonesian": "Infeksi buah pertama kali muncul sebagai daerah kecil yang berendam air di permukaan atas melon."
},
{
  "id": 39488,
  "english": "Initially, the blotches do not extend into the rind, but affected rinds eventually crack and become invaded by secondary pathogens.",
  "indonesian": "Awalnya, bercak tidak menyebar ke kulit, tetapi kulit yang terkena akhirnya retak dan diserang oleh patogen sekunder."
},
{
  "id": 39489,
  "english": "The disease is mostly confined to leaves, but stems and petioles may become diseased.",
  "indonesian": "Penyakit ini sebagian besar terbatas pada daun, tetapi batang dan tangkai daun juga dapat terkena penyakit."
},
{
  "id": 39490,
  "english": "Leaf spots first appear on younger leaves as small circular spots having dark green to purple margins, becoming white to light tan in the center.",
  "indonesian": "Bercak daun pertama kali muncul pada daun yang lebih muda sebagai bercak bulat kecil dengan tepi berwarna hijau gelap hingga ungu, menjadi putih hingga cokelat muda di tengah."
},
{
  "id": 39491,
  "english": "The leaf lamina around the spots may become chlorotic and eventually the entire leaf may turn yellow and fall off.",
  "indonesian": "Lamina daun di sekitar bercak mungkin menjadi klorotik dan akhirnya seluruh daun mungkin berubah menjadi kuning dan rontok."
},
{
  "id": 39492,
  "english": "Symptoms of mosaic appear on the youngest leaves when infection occurs at 6 – 8 leaves stage.",
  "indonesian": "Gejala mozaik muncul pada daun termuda ketika infeksi terjadi pada tahap daun 6 - 8."
},
{
  "id": 39493,
  "english": "Leaves curl downwards and become mottled, distorted, wrinkled and reduced in size.",
  "indonesian": "Daun menggulung ke bawah dan menjadi belang, terdistorsi, keriput, dan berkurang ukurannya."
},
{
  "id": 39494,
  "english": "Veins appear bunchy because of shortening of internodes.",
  "indonesian": "Pembuluh darah terlihat bergerombol karena penyusutan internode."
},
{
  "id": 39495,
  "english": "It is evident as a superficial, powdery, grayish-white growth on upper leaf surfaces, petioles, and even main stems of infected plants.",
  "indonesian": "Ini terlihat sebagai pertumbuhan superfisial, berpowder, abu-abu-putih pada permukaan daun atas, petiol, dan bahkan batang utama tanaman yang terinfeksi."
},
{
  "id": 39496,
  "english": "Affected areas turn yellow then brown and die.",
  "indonesian": "Daerah yang terkena berubah menjadi kuning kemudian coklat dan mati."
},
{
  "id": 39497,
  "english": "Some early disease results from spores produced on overwintering cucurbit debris or weeds but the major source of disease inoculum is windblown spores from southern crops.",
  "indonesian": "Beberapa penyakit awal disebabkan oleh spora yang dihasilkan pada sisa-sisa musim dingin atau gulma tetapi sumber utama inokulum penyakit adalah spora yang terbawa angin dari tanaman selatan."
},
{
  "id": 39498,
  "english": "Symptoms first appear as dull, greyish green appearance to the foliage.",
  "indonesian": "Gejala pertama muncul sebagai penampilan hijau keabu-abuan kusam pada dedaunan."
},
{
  "id": 39499,
  "english": "Affected vines wilt, become dry, turn brown and die.",
  "indonesian": "Tanaman merambat yang terkena layu, menjadi kering, berubah menjadi coklat dan mati."
},
{
  "id": 39500,
  "english": "Elongated brown lesions (dead areas) may develop along stems near the crown.",
  "indonesian": "Lesi coklat yang memanjang (area mati) dapat berkembang di sepanjang batang dekat mahkota."
},
{
  "id": 39501,
  "english": "Infected stems first appear water-soaked and then become dry, coarse, and tan.",
  "indonesian": "Batang yang terinfeksi awalnya terlihat berendam air dan kemudian menjadi kering, kasar, dan cokelat."
},
{
  "id": 39502,
  "english": "Older stem lesions (dead tissue) reveal small black fruiting bodies (pycnidia) within the affected tissues.",
  "indonesian": "Lesi batang yang lebih tua (jaringan mati) mengungkapkan tubuh buah hitam kecil (piknidia) di dalam jaringan yang terkena."
},
{
  "id": 39503,
  "english": "Stem lesions on melons exude a gummy, red-brown substance which may be mistaken for a symptom of Fusarium wilt.",
  "indonesian": "Lesi batang pada melon mengeluarkan zat lengket berwarna cokelat kemerahan yang mungkin keliru sebagai gejala layu Fusarium."
},
{
  "id": 39504,
  "english": "Powdery mildew first appears on the oldest leaves as yellow areas on the upper leaf surface.",
  "indonesian": "Mildiu tepung pertama kali muncul pada daun tertua sebagai daerah kuning pada permukaan daun atas."
},
{
  "id": 39505,
  "english": "The white mildew on the underside of the leaf often can only be seen with the aid of a hand lens.",
  "indonesian": "Mildiu putih di bagian bawah daun seringkali hanya bisa dilihat dengan bantuan lensa tangan."
},
{
  "id": 39506,
  "english": "As the disease increases, the areas of whitish, powdery growth become more apparent and can cover both upper and lower leaf surfaces.",
  "indonesian": "Seiring dengan peningkatan penyakit, area pertumbuhan berwarna putih seperti bubuk menjadi lebih jelas dan dapat menutupi kedua permukaan daun atas dan bawah."
},
{
  "id": 39507,
  "english": "Initial symptoms are a slight flagging of the plants in midday even when abundant moisture is present.",
  "indonesian": "Gejala awal adalah sedikit layu pada tanaman di tengah hari bahkan ketika kelembaban berlimpah."
},
{
  "id": 39508,
  "english": "This flagging will continue to worsen so that, by the third or fourth day, many of the plants are completely wilted.",
  "indonesian": "Layu ini akan terus memburuk sehingga, pada hari ketiga atau keempat, banyak tanaman benar-benar layu."
},
{
  "id": 39509,
  "english": "Affected plants appear to lack feeder roots; other roots become slightly misshapen and thick.",
  "indonesian": "Tanaman yang terkena tampaknya kekurangan akar pakan; akar lain menjadi sedikit terdistorsi dan tebal."
},
{
  "id": 39510,
  "english": "Symptoms are most striking on the new growth of young, rapidly growing plants.",
  "indonesian": "Gejala paling mencolok pada pertumbuhan baru tanaman muda yang tumbuh dengan cepat."
},
{
  "id": 39511,
  "english": "Leaves are dwarfed, misshapen, puckered, pale green in color, and exhibit mosaic patterns of light and dark green color.",
  "indonesian": "Daun berukuran kerdil, terdistorsi, mengerut, berwarna hijau pucat, dan menunjukkan pola mozaik warna hijau terang dan gelap."
},
{
  "id": 39512,
  "english": "Infected plants remain stunted throughout the season and may fail to set fruit or it will be small in size and poor in quality.",
  "indonesian": "Tanaman yang terinfeksi tetap kerdil sepanjang musim dan mungkin gagal menghasilkan buah atau akan kecil dan buruk kualitasnya."
},
{
  "id": 39513,
  "english": "Sometimes the vine terminals of infected plants become erect and hover over the canopy.",
  "indonesian": "Terkadang terminal tanaman yang terinfeksi menjadi tegak dan menggantung di atas kanopi."
},
{
  "id": 39514,
  "english": "Affected plants are often most numerous near edges of fields and appear in patches. Plants turn yellow and die back.",
  "indonesian": "Tanaman yang terkena seringkali paling banyak di dekat tepi ladang dan muncul dalam bentuk bercak. Tanaman berubah kuning dan mati kembali."
},
{
  "id": 39515,
  "english": "Numerous squash bugs may be present or there will be evidence of their prior feeding.",
  "indonesian": "Banyak kutu labu mungkin ada atau akan ada bukti makanan mereka sebelumnya."
},
{
  "id": 39516,
  "english": "When basal stems of affected plants are cross-sectioned, a ring of light brown discoloration is evident around the outer part (phloem) of the vascular core.",
  "indonesian": "Ketika batang dasar tanaman yang terkena dipotong melintang, lingkaran pewarnaan cokelat muda terlihat di sekitar bagian luar (floem) inti vaskular."
},
{
  "id": 39517,
  "english": "Aboveground, plants affected by root-knot nematode appear yellowed, stunted, or generally unthrifty.",
  "indonesian": "Di atas tanah, tanaman yang terkena nematoda akar-ikatan muncul menguning, kerdil, atau umumnya tidak sehat."
},
{
  "id": 39518,
  "english": "Affected areas often occur as patchy areas in a field or along a row of plants.",
  "indonesian": "Area yang terkena sering terjadi sebagai area bercak di ladang atau sepanjang baris tanaman."
},
{
  "id": 39519,
  "english": "Affected roots are disfigured, swollen, and stubby in appearance.",
  "indonesian": "Akar yang terkena terdistorsi, membengkak, dan pendek dalam penampilannya."
},
{
  "id": 39520,
  "english": "Symptoms first appear as yellowed wedge-shaped areas on older leaves, which eventually develop brown sectors.",
  "indonesian": "Gejala pertama muncul sebagai daerah berbentuk khas segi tiga berwarna kuning pada daun yang lebih tua, yang akhirnya berkembang menjadi sektor coklat."
},
{
  "id": 39521,
  "english": "Crown leaves collapse and wilt extends along individual vines.",
  "indonesian": "Daun mahkota runtuh dan layu menyebar sepanjang batang individu."
},
{
  "id": 39522,
  "english": "Wilt symptoms often are one-sided, in that individual vines wilt before the entire plant dies.",
  "indonesian": "Gejala layu seringkali satu sisi, di mana batang individu layu sebelum seluruh tanaman mati."
},
{
  "id": 39523,
  "english": "Externally gradual yellowing and drying of foliage, shrinkage/withering of canes.",
  "indonesian": "Secara bertahap daun menguning dan mengering, penyusutan/meninggalkan ranting."
},
{
  "id": 39524,
  "english": "Some symptoms",
  "indonesian": "Beberapa gejala"
},
{
  "id": 39525,
  "english": "Custom Symptom 2",
  "indonesian": "Gejala Khusus 2"
},
{
  "id": 39526,
  "english": "Circular gray-brown lesions on leaves and wilting the plant",
  "indonesian": "Lesi abu-abu-coklat bulat pada daun dan layu tanaman"
},
{
  "id": 39527,
  "english": "The vascular system of the plant is discolored",
  "indonesian": "Sistem vaskular tanaman mengalami perubahan warna"
},
{
  "id": 39528,
  "english": "Corollas of expanded blossoms appear blighted; brown lesions on leaves which have come into contact with infected blossoms.",
  "indonesian": "Mahkota bunga yang berkembang terlihat terinfeksi; lesi coklat pada daun yang telah bersentuhan dengan bunga terinfeksi."
},
{
  "id": 39529,
  "english": "Infected blossoms do not produce fruit",
  "indonesian": "Bunga yang terinfeksi tidak menghasilkan buah"
},
{
  "id": 39530,
  "english": "In large fields, severe infections are often visible as brown patches",
  "indonesian": "Di ladang besar, infeksi parah sering terlihat sebagai bercak coklat"
},
{
  "id": 39531,
  "english": "Infected berries are cream or pink in color and turn tan or gray",
  "indonesian": "Buah yang terinfeksi berwarna krem atau merah muda dan berubah menjadi coklat atau abu-abu"
},
{
  "id": 39532,
  "english": "Berries become shriveled and hard; shriveled skin of fruit breaks down to expose black rind of fungal tissue",
  "indonesian": "Buah menjadi kering dan keras; kulit buah yang mengering hancur sehingga menampakkan lapisan hitam jaringan jamur"
},
{
  "id": 39533,
  "english": "Death of infected shoots, leaves, and flowers",
  "indonesian": "Kematian tunas, daun, dan bunga yang terinfeksi"
},
{
  "id": 39534,
  "english": "White fluffy growth on the upper surfaces of leaves or the lower leaf surface",
  "indonesian": "Pertumbuhan putih berbulu di permukaan atas daun atau permukaan daun bagian bawah"
},
{
  "id": 39535,
  "english": "Leaves may be puckered in appearance; leaves may develop chlorotic spots with red borders",
  "indonesian": "Daun mungkin berkerut; daun mungkin mengembangkan bintik-bintik klorotik dengan tepi merah"
},
{
  "id": 39536,
  "english": "Leaves may drop from the plant",
  "indonesian": "Daun bisa rontok dari tanaman"
},
{
  "id": 39537,
  "english": "Elongated reddish streaks on green stems, purplish red leaves, cupped leaves.",
  "indonesian": "Garis merah memanjang pada batang hijau, daun merah ungu, daun tercuping."
},
{
  "id": 39538,
  "english": "Leaves may be elongated or strap-like.",
  "indonesian": "Daun mungkin memanjang atau seperti tali."
},
{
  "id": 39539,
  "english": "Reddish-purple fruit",
  "indonesian": "Buah berwarna ungu kemerahan"
},
{
  "id": 39540,
  "english": "It is a soil-borne disease caused by the fungus Sclerotiniascelorotiorum.",
  "indonesian": "Ini adalah penyakit yang berasal dari tanah yang disebabkan oleh jamur Sclerotiniascelorotiorum."
},
{
  "id": 39541,
  "english": "The white rust fungus attacks the lower surface of the outer leaves, and plants suddenly die.",
  "indonesian": "Jamur karat putih menyerang permukaan bawah daun luar, dan tanaman tiba-tiba mati."
},
{
  "id": 39542,
  "english": "White rust is an obligate parasite that attacks vegetative and flowering structures of the plants and can cause yellow lesions on the upper surface",
  "indonesian": "Karat putih adalah parasit obligat yang menyerang struktur vegetatif dan berbunga tanaman dan dapat menyebabkan lesi kuning pada permukaan atas"
},
{
  "id": 39543,
  "english": "Small purplish brown spots on the under surface of leaves",
  "indonesian": "Bercak kecil berwarna ungu coklat di bawah permukaan daun"
},
{
  "id": 39544,
  "english": "The most visible symptom is a bright bronze to red coloration of the leaves of the young plant or a pinkish and/or yellowish coloration of the older leaves.",
  "indonesian": "Gejala paling terlihat adalah pewarnaan daun yang cerah dari perunggu hingga merah pada tanaman muda atau pewarnaan merah muda dan/atau kuning pada daun yang lebih tua."
},
{
  "id": 39545,
  "english": "The symptoms of root rots are a reduction in plant growth with the development of reddish-colored leaves and the browning of the leaf margins.",
  "indonesian": "Gejala penyakit pembusukan akar adalah penurunan pertumbuhan tanaman dengan perkembangan daun berwarna kemerahan dan menguningnya tepi daun."
},
{
  "id": 39546,
  "english": "The symptoms are rotting at the base of the leaves in the center of the leaf whorl (heart) of young non-flowering plants.",
  "indonesian": "Gejalanya adalah pembusukan di pangkal daun di tengah kumpulan daun (hati) tanaman muda yang belum berbunga."
},
{
  "id": 39547,
  "english": "Water soaked appearance is found at the base of the pseudostem and rotting takes place at the basal portion.",
  "indonesian": "Penampilan berair terlihat di dasar pseudostem dan pembusukan terjadi di bagian pangkal."
},
{
  "id": 39548,
  "english": "The affected rhizomes become soft and pulpy and plants easily collapse on pressing.",
  "indonesian": "Rizom yang terkena menjadi lunak dan berpulp dan tanaman dengan mudah roboh saat ditekan."
},
{
  "id": 39549,
  "english": "The spots of 1-2mm diameter appear in more numbers, covering both sides of leaf.",
  "indonesian": "Bercak berdiameter 1-2mm muncul dalam jumlah yang lebih banyak, menutupi kedua sisi daun."
},
{
  "id": 39550,
  "english": "The attacked leaf presents a reddish-brown appearance instead of the normal green color.",
  "indonesian": "Daun yang diserang memiliki penampilan merah kecoklatan daripada warna hijau normal."
},
{
  "id": 39551,
  "english": "These spots coalesce to form irregular bigger patches.",
  "indonesian": "Bintik-bintik ini menyatu membentuk bercak besar yang tidak beraturan."
},
{
  "id": 39552,
  "english": "Yello halo",
  "indonesian": "Halo kuning"
},
{
  "id": 39553,
  "english": "Small brown lesions near top of berries (early on)",
  "indonesian": "Lesi kecil berwarna coklat di dekat bagian atas buah beri (awalnya)"
},
{
  "id": 39554,
  "english": "Powdery dead young leaves",
  "indonesian": "Daun muda yang mati berbentuk tepung"
},
{
  "id": 39555,
  "english": "Soft and mushy rotten holes or areas on fruit",
  "indonesian": "Lubang atau area busuk yang lunak dan lembek pada buah"
},
{
  "id": 39556,
  "english": "An early symptom of the disease is upward curling of the leaf margins.",
  "indonesian": "Gejala awal penyakit ini adalah tepi daun melengkung ke atas."
},
{
  "id": 39557,
  "english": "White powdery splotches on the top of leaves or stems",
  "indonesian": "Bercak putih berbentuk tepung di bagian atas daun atau batang"
},
{
  "id": 39558,
  "english": "Leaves look like they’re dusted with white powder (especially the underside)",
  "indonesian": "Daun tampak seperti ditaburi bubuk putih (terutama bagian bawah)"
},
{
  "id": 39559,
  "english": "Spots may later turn into tan or white centers with rusty-brown margins",
  "indonesian": "Bintik-bintik tersebut nantinya dapat berubah menjadi bagian tengah berwarna cokelat atau putih dengan pinggiran berwarna coklat karat"
},
{
  "id": 39560,
  "english": "Spots may merge together and kill whole leaves",
  "indonesian": "Bintik-bintik bisa menyatu dan membunuh seluruh daun"
},
{
  "id": 39561,
  "english": "Black or brown leathery texture on fruits near spots",
  "indonesian": "Tekstur kasar berwarna hitam atau coklat pada buah di dekat bintik-bintik"
},
{
  "id": 39562,
  "english": "It is fast acting as strawberry plants can suddenly wilt and die.",
  "indonesian": "Tindakannya cepat karena tanaman stroberi bisa tiba-tiba layu dan mati."
},
{
  "id": 39563,
  "english": "This disease affects the outer leaves first; they become yellow and eventually take on a scorched appearance.",
  "indonesian": "Penyakit ini menyerang daun terluar terlebih dahulu; warnanya menjadi kuning dan akhirnya tampak hangus."
},
{
  "id": 39564,
  "english": "It enters through roots and affects the water-conducting tissues in the crown",
  "indonesian": "Ia masuk melalui akar dan mempengaruhi jaringan penghantar air di mahkota"
},
{
  "id": 39565,
  "english": "Wilting foliage in spite of ample water",
  "indonesian": "Dedaunan layu meskipun banyak air"
},
{
  "id": 39566,
  "english": "Older leaves drying and dying off while younger leaves remain green",
  "indonesian": "Daun tua mengering dan mati sedangkan daun muda tetap hijau"
},
{
  "id": 39567,
  "english": "Orange or reddish-brown coloration in center of crowns",
  "indonesian": "Warna oranye atau coklat kemerahan di tengah mahkota"
},
{
  "id": 39568,
  "english": "Irregular dark purple or brown spots scattered over leaf surface",
  "indonesian": "Bintik-bintik ungu tua atau coklat tidak beraturan tersebar di permukaan daun"
},
{
  "id": 39569,
  "english": "Spots with purple centers and no defined border (the leaf spot disease has a clear margin)",
  "indonesian": "Bercak dengan bagian tengah berwarna ungu dan tidak memiliki batas yang jelas (penyakit bercak daun memiliki batas yang jelas)"
},
{
  "id": 39570,
  "english": "Dead leaves, flowers, or fruit (in severe infections)",
  "indonesian": "Daun, bunga, atau buah mati (pada infeksi parah)"
},
{
  "id": 39571,
  "english": "Lesions or \"spots\" are more numerous on upper leaf surfaces and appear circular to irregular in shape.",
  "indonesian": "Lesi atau \"bintik-bintik\" lebih banyak pada permukaan daun bagian atas dan berbentuk bulat hingga tidak beraturan."
},
{
  "id": 39572,
  "english": "These lesions often have definite reddish-purple to rusty-brown borders that surround a necrotic area.",
  "indonesian": "Lesi ini sering memiliki batas yang jelas berwarna merah keunguan hingga cokelat berkarat yang mengelilingi area nekrotik."
},
{
  "id": 39573,
  "english": "Susceptible varieties can be defoliated partly or completely by late summer.",
  "indonesian": "Varietas yang rentan dapat mengalami gugur daun sebagian atau seluruhnya pada akhir musim panas."
},
{
  "id": 39574,
  "english": "Gray and tan lesions that begin at leaf margins",
  "indonesian": "Lesi abu-abu dan cokelat muda yang dimulai dari tepi daun"
},
{
  "id": 39575,
  "english": "Blotches spread to cover first new leaves of spring plants",
  "indonesian": "Noda menyebar untuk menutupi daun baru pertama pada tanaman musim semi"
},
{
  "id": 39576,
  "english": "Brownish decay of the fruit calyx (green leaves on top of berries) that is purely cosmetic",
  "indonesian": "Kerusakan cokelat pada kelopak buah (daun hijau di atas buah beri) yang bersifat kosmetik semata"
},
{
  "id": 39577,
  "english": "Rapid wilting and death of lots of plants",
  "indonesian": "Layunya cepat dan kematian banyak tanaman"
},
{
  "id": 39578,
  "english": "Leaves turn dry, yellow, reddish, or brown at the margins and in the veins. New leaves stop developing",
  "indonesian": "Daun menjadi kering, kuning, kemerahan, atau cokelat di tepi dan di pembuluh. Daun baru berhenti berkembang"
},
{
  "id": 39579,
  "english": "Bluish or brownish-black blotches on runners",
  "indonesian": "Noda kebiruan atau cokelat kehitaman pada sulur"
},
{
  "id": 39580,
  "english": "Infected plants are stunted, with few runners and few fruit.",
  "indonesian": "Tanaman yang terinfeksi menjadi kerdil, dengan sedikit sulur dan sedikit buah."
},
{
  "id": 39581,
  "english": "New leaves are with bluish-green and may wilt",
  "indonesian": "Daun baru berwarna hijau kebiruan dan mungkin layu"
},
{
  "id": 39582,
  "english": "Older leaves may be reddish orange to yellow tinged",
  "indonesian": "Daun yang lebih tua mungkin berwarna oranye kemerahan hingga kuning"
},
{
  "id": 39583,
  "english": "Blotches are delineated by leaf veins",
  "indonesian": "Noda dibatasi oleh pembuluh daun"
},
{
  "id": 39584,
  "english": "Central dark brown to purple zone with reddish or lighter brown outer areas",
  "indonesian": "Zona tengah cokelat tua hingga ungu dengan area luar berwarna merah atau cokelat muda"
},
{
  "id": 39585,
  "english": "They have formed in older, necrotic diseased tissue and are diagnostic for Phomopsis leaf blight.",
  "indonesian": "Mereka terbentuk di jaringan yang lebih tua dan nekrotik serta merupakan diagnosis untuk Phomopsis leaf blight."
},
{
  "id": 39586,
  "english": "Brown or black colored spots on green and ripe berries",
  "indonesian": "Bintik berwarna cokelat atau hitam pada buah beri hijau dan matang"
},
{
  "id": 39587,
  "english": "Spots appear water-soaked",
  "indonesian": "Bintik tampak basah"
},
{
  "id": 39588,
  "english": "There are several spots on each berry",
  "indonesian": "Ada beberapa bintik pada setiap buah beri"
},
{
  "id": 39589,
  "english": "Infects strawberry bloom and green or mature fruit.",
  "indonesian": "Menginfeksi bunga stroberi dan buah hijau atau matang."
},
{
  "id": 39590,
  "english": "Infected blossom clusters turn brown and die.",
  "indonesian": "Kelompok bunga yang terinfeksi menjadi cokelat dan mati."
},
{
  "id": 39591,
  "english": "Green fruit become hard and leathery.",
  "indonesian": "Buah hijau menjadi keras dan seperti kulit."
},
{
  "id": 39592,
  "english": "Slimy or crusty beadlike structures that cover straw, lower leaves, sometimes petioles.",
  "indonesian": "Struktur seperti manik-manik berlendir atau berkerak yang menutupi jerami, daun bagian bawah, kadang-kadang tangkai daun."
},
{
  "id": 39593,
  "english": "Creamy-white, grey, purple or yellow.",
  "indonesian": "Putih krem, abu-abu, ungu atau kuning."
},
{
  "id": 39594,
  "english": "Eventually produce fruiting structures that are marshmallow-like in texture and produce powdery dry black spores.",
  "indonesian": "Akhirnya menghasilkan struktur buah yang bertekstur seperti marshmallow dan menghasilkan spora hitam kering yang seperti bubuk."
},
{
  "id": 39595,
  "english": "Fewer fine feeder roots and a bushy appearance",
  "indonesian": "Lebih sedikit akar penyerap halus dan penampilan yang rimbun"
},
{
  "id": 39596,
  "english": "Reddish-brown lesions on feeder roots (root lesion nematode), swells or galls on feeder roots (root knot nematode).",
  "indonesian": "Luka berwarna cokelat kemerahan pada akar penyerap (nematoda luka akar), bengkak atau galur pada akar penyerap (nematoda simpul akar)."
},
{
  "id": 39597,
  "english": "Uneven plant growth",
  "indonesian": "Pertumbuhan tanaman tidak merata"
},
{
  "id": 39598,
  "english": "Symptoms 1",
  "indonesian": "Gejala 1"
},
{
  "id": 39599,
  "english": "Symptoms 2",
  "indonesian": "Gejala 2"
},
{
  "id": 39600,
  "english": "Symptoms 3",
  "indonesian": "Gejala 3"
},
{
  "id": 39601,
  "english": "Symptoms 4",
  "indonesian": "Gejala 4"
},
{
  "id": 39602,
  "english": "The infected branches should be cut and removed and the cut end pasted with Bordeaux mixture 1%",
  "indonesian": "Cabang yang terinfeksi harus dipotong dan dihilangkan, dan ujung yang dipotong diberi campuran Bordeaux 1%"
},
{
  "id": 39603,
  "english": "Two types of blights are noticed in nutmeg. The first is a white thread blight wherein fine white hyphae aggregate to form fungal threads that traverse along the stem underneath the leaves in a fan shaped or irregular manner causing blight in the affected portions.",
  "indonesian": "Dua jenis penyakit hawar ditemukan pada pala. Yang pertama adalah hawar benang putih di mana hifa putih halus berkumpul membentuk benang jamur yang melintasi batang di bawah daun dengan cara berbentuk kipas atau tidak teratur, menyebabkan hawar pada bagian yang terkena."
},
{
  "id": 39604,
  "english": "The second type of blight is called horse hair blight. Fine black silky threads of the fungus form an irregular, loose network on the stems and leaves.",
  "indonesian": "Jenis hawar kedua disebut hawar rambut kuda. Benang hitam halus dari jamur membentuk jaringan longgar yang tidak teratur pada batang dan daun."
},
{
  "id": 39605,
  "english": "These strands cause blight of leaves and stems. However, these threads hold up the detached, dried leaves on the tree, giving the appearance of a birds nest, when viewed from a distance.",
  "indonesian": "Benang-benang ini menyebabkan hawar pada daun dan batang. Namun, benang-benang ini menahan daun kering yang lepas di pohon, memberikan tampilan sarang burung jika dilihat dari kejauhan."
},
{
  "id": 39606,
  "english": "Immature fruit split, fruit rot and fruit drop are serious in a majority of nutmeg, Immature fruit splitting and shedding are noticed in some trees without any apparent infection.",
  "indonesian": "Buah muda pecah, busuk buah dan buah jatuh adalah masalah serius pada sebagian besar pala. Pecah dan rontoknya buah muda terjadi pada beberapa pohon tanpa infeksi yang jelas."
},
{
  "id": 39607,
  "english": "In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discolouration of the rind resulting in rotting.",
  "indonesian": "Dalam kasus busuk buah, infeksi dimulai dari tangkai buah sebagai lesi gelap dan secara bertahap menyebar ke buah, menyebabkan perubahan warna kulit menjadi cokelat dan akhirnya membusuk."
},
{
  "id": 39608,
  "english": "In advanced stages, the mace also rots emitting a foul smell. Phytophthora sp. And Diplodia natalensis have been isolated from affected fruits.",
  "indonesian": "Pada tahap lanjut, fuli juga membusuk dan mengeluarkan bau busuk. Phytophthora sp. dan Diplodia natalensis telah diisolasi dari buah yang terinfeksi."
},
{
  "id": 39609,
  "english": "In advanced stages the necrotic spots become brittle and fall off resulting in shot holes.",
  "indonesian": "Pada tahap lanjut, bintik-bintik nekrotik menjadi rapuh dan rontok, menyebabkan lubang tembakan."
},
{
  "id": 39610,
  "english": "Water soaked lesions on leaves",
  "indonesian": "Lesi basah pada daun"
},
{
  "id": 39611,
  "english": "Entire bush appears burnt",
  "indonesian": "Seluruh semak terlihat terbakar"
},
{
  "id": 39612,
  "english": "Blackish brownish coloration of leaf sheath",
  "indonesian": "Warna seludang daun coklat kehitaman"
},
{
  "id": 39613,
  "english": "Small, dark brown to black lesions on cotyledons; oval or eye-shaped lesions on stems which turn sunken and brown with purple to red margins",
  "indonesian": "Luka kecil, coklat tua hingga hitam pada kotiledon; luka oval atau berbentuk mata pada batang yang menjadi cekung dan coklat dengan tepi ungu hingga merah"
},
{
  "id": 39614,
  "english": "Stems may break if cankers weaken stem; pods drying and shrinking above areas of visible symptoms",
  "indonesian": "Batang bisa patah jika kanker melemahkan batang; polong mengering dan menyusut di atas area gejala yang terlihat"
},
{
  "id": 39615,
  "english": "Reddish brown spots on pods which become circular and sunken with rust colored margin",
  "indonesian": "Bercak coklat kemerahan pada polong yang menjadi bulat dan cekung dengan tepi berwarna karat"
},
{
  "id": 39616,
  "english": "The leaves of the affected plants become yellowish in color, then drop and finally the whole plant dries out",
  "indonesian": "Daun tanaman yang terkena menjadi kekuningan, kemudian gugur dan akhirnya seluruh tanaman mengering"
},
{
  "id": 39617,
  "english": "Blackened tissue at the base of stem",
  "indonesian": "Jaringan yang menghitam di pangkal batang"
},
{
  "id": 39618,
  "english": "Symptoms may be present on only one side of the plant",
  "indonesian": "Gejala mungkin hanya muncul di satu sisi tanaman"
},
{
  "id": 39619,
  "english": "Caused by fungus, it occurs in young seedlings and grown-up plants",
  "indonesian": "Disebabkan oleh jamur, ini terjadi pada bibit muda dan tanaman dewasa"
},
{
  "id": 39620,
  "english": "Affected plants show formation of dark brown lesions on the stem near soil surface",
  "indonesian": "Tanaman yang terkena menunjukkan pembentukan lesi coklat tua pada batang dekat permukaan tanah"
},
{
  "id": 39621,
  "english": "Plants dry prematurely, particularly when they face drought stress",
  "indonesian": "Tanaman mengering sebelum waktunya, terutama saat menghadapi stres kekeringan"
},
{
  "id": 39622,
  "english": "It is transmitted by eriophyid mites from one plant to another",
  "indonesian": "Ini ditularkan oleh tungau eriophyid dari satu tanaman ke tanaman lain"
},
{
  "id": 39623,
  "english": "Affected plant becomes pale green and reduces leaf size. No flowering and deformity",
  "indonesian": "Tanaman yang terkena menjadi hijau pucat dan mengurangi ukuran daun. Tidak ada pembungaan dan deformasi"
},
{
  "id": 39624,
  "english": "Affected plants remain stunted and branch profusely, as a result of which they appear bushy. No flowers and fruits are borne on such affected plants resulting in total loss of yield",
  "indonesian": "Tanaman yang terkena tetap kerdil dan bercabang lebat, sehingga tampak rimbun. Tidak ada bunga dan buah pada tanaman yang terkena sehingga mengakibatkan kehilangan hasil panen secara total"
},
{
  "id": 39625,
  "english": "Symptoms appear on all aerial parts of plants as small, circular, necrotic spots that develop quickly, forming typical concentric rings",
  "indonesian": "Gejala muncul pada semua bagian udara tanaman berupa bintik nekrotik kecil melingkar yang berkembang cepat, membentuk cincin konsentris khas"
},
{
  "id": 39626,
  "english": "Water-soaked, circular to irregular spots occur. The center of the spot is straw-colored with raised reddish-brown margins",
  "indonesian": "Bercak melingkar hingga tidak beraturan yang basah air terjadi. Bagian tengah bercak berwarna jerami dengan tepi coklat kemerahan yang terangkat"
},
{
  "id": 39627,
  "english": "The spots are initially light brown and later turn dark brown. In severe infection, defoliation and drying of infected leaves, branches, and flower buds",
  "indonesian": "Bercak awalnya berwarna coklat muda dan kemudian berubah menjadi coklat tua. Pada infeksi parah, defoliasi dan pengeringan daun, cabang, dan kuncup bunga yang terinfeksi"
},
{
  "id": 39628,
  "english": "The disease first appears in the form of yellow, diffused spots scattered on the leaf lamina; such spots slowly expand and in later stages",
  "indonesian": "Penyakit pertama kali muncul dalam bentuk bercak kuning menyebar yang tersebar di lamina daun; bercak tersebut perlahan meluas dan pada tahap selanjutnya"
},
{
  "id": 39629,
  "english": "Yellow patches alternated with green patches developed on the leaves",
  "indonesian": "Bercak kuning bergantian dengan bercak hijau muncul di daun"
},
{
  "id": 39630,
  "english": "Such spots slowly expand and in later stages of disease development, affected leaflets show broad, yellow patches alternating with green color",
  "indonesian": "Bercak tersebut perlahan meluas dan pada tahap selanjutnya dari perkembangan penyakit, daun yang terkena menunjukkan bercak kuning lebar bergantian dengan warna hijau"
},
{
  "id": 39631,
  "english": "The powdery mildew symptoms appear mostly on older leaves, however, in severe cases even young buds and pods also get infected",
  "indonesian": "Gejala embun tepung kebanyakan muncul pada daun tua, namun pada kasus parah, kuncup muda dan polong juga terinfeksi"
},
{
  "id": 39632,
  "english": "Symptoms appear as dull red spots, limited by veins, appear on the upper surface of leaves and later white powdery patches develop on both surfaces",
  "indonesian": "Gejala muncul sebagai bercak merah kusam, dibatasi oleh urat daun, muncul di permukaan atas daun dan kemudian bercak putih tepung berkembang di kedua permukaan"
},
{
  "id": 39633,
  "english": "Entire lower leaf surface gets covered with powdery growth, leading to defoliation. The disease is also known to cause stunting of young plants and significantly reduces nodulation",
  "indonesian": "Seluruh permukaan bawah daun tertutup oleh pertumbuhan tepung, menyebabkan defoliasi. Penyakit ini juga diketahui menyebabkan kerdil pada tanaman muda dan secara signifikan mengurangi nodulasi"
},
{
  "id": 39634,
  "english": "Phytophthora blight resembles damping off disease as the seedlings die suddenly",
  "indonesian": "Busuk Phytophthora mirip dengan penyakit layu bibit karena bibit mati mendadak"
},
{
  "id": 39635,
  "english": "Infected plants have water-soaked lesions on their leaves",
  "indonesian": "Tanaman yang terinfeksi memiliki luka yang basah air pada daunnya"
},
{
  "id": 39636,
  "english": "Brown to black, slightly sunken lesions on their stems and petioles",
  "indonesian": "Luka coklat hingga hitam, sedikit cekung pada batang dan tangkainya"
},
{
  "id": 39637,
  "english": "Lesions girdle the main stems or branches which break at this point",
  "indonesian": "Luka mengelilingi batang utama atau cabang yang patah pada titik ini"
},
{
  "id": 39638,
  "english": "Causing several types of spots on the leaves and petioles of affected plants",
  "indonesian": "Menyebabkan beberapa jenis bercak pada daun dan tangkai tanaman yang terinfeksi"
},
{
  "id": 39639,
  "english": "The spots are triangular in outline and are raised above the surface of the leaf; very rarely, the upper surface is infected",
  "indonesian": "Bercak berbentuk segitiga dan terangkat di atas permukaan daun; sangat jarang, permukaan atas terinfeksi"
},
{
  "id": 39640,
  "english": "Infected leaves start drying, and in severe cases, defoliation may take place",
  "indonesian": "Daun yang terinfeksi mulai mengering, dan pada kasus parah, defoliasi bisa terjadi"
},
{
  "id": 39641,
  "english": "Sowing/Land Preparation Report",
  "indonesian": "Laporan Penanaman/Persiapan Lahan"
},
{
  "id": 39642,
  "english": "Pest and Disease Management Report",
  "indonesian": "Laporan Pengelolaan Hama dan Penyakit"
},
{
  "id": 39643,
  "english": "Brown rice",
  "indonesian": "Beras merah"
},
{
  "id": 39644,
  "english": "MyIrrigationWaterSources",
  "indonesian": "Sumber Air Irigasi Saya"
},
{
  "id": 39645,
  "english": "Bollworm",
  "indonesian": "Ulat penggerek buah kapas"
},
{
  "id": 39646,
  "english": "Mites",
  "indonesian": "Tungau"
},
{
  "id": 39647,
  "english": "Caterpillars",
  "indonesian": "Ulat"
},
{
  "id": 39648,
  "english": "Weevils",
  "indonesian": "Kumbang"
},
{
  "id": 39649,
  "english": "Cutworm",
  "indonesian": "Ulat pemotong"
},
{
  "id": 39650,
  "english": "Locusts",
  "indonesian": "Belalang"
},
{
  "id": 39651,
  "english": "Birds",
  "indonesian": "Burung"
},
{
  "id": 39652,
  "english": "Stalk borers",
  "indonesian": "Penggerek batang"
},
{
  "id": 39653,
  "english": "Moth",
  "indonesian": "Ngengat"
},
{
  "id": 39654,
  "english": "Stink bugs",
  "indonesian": "Kepik busuk"
},
{
  "id": 39655,
  "english": "Potato beetle",
  "indonesian": "Kumbang kentang"
},
{
  "id": 39656,
  "english": "Corn root worm",
  "indonesian": "Ulat akar jagung"
},
{
  "id": 39657,
  "english": "Mormon crickets",
  "indonesian": "Belalang Mormon"
},
{
  "id": 39658,
  "english": "Japanese Beetle",
  "indonesian": "Kumbang Jepang"
},
{
  "id": 39659,
  "english": "Fruitfly",
  "indonesian": "Lalat buah"
},
{
  "id": 39660,
  "english": "Leaf Webber",
  "indonesian": "Ulat penggulung daun"
},
{
  "id": 39661,
  "english": "Midge",
  "indonesian": "Nyamuk kecil"
},
{
  "id": 39662,
  "english": "San-Jose-scale",
  "indonesian": "Kutu sisik San Jose"
},
{
  "id": 39663,
  "english": "Capsule Borer",
  "indonesian": "Penggerek kapsul"
},
{
  "id": 39664,
  "english": "Cereal rust mite adults",
  "indonesian": "Tungau karat sereal dewasa"
},
{
  "id": 39665,
  "english": "Bihar hair caterpillar",
  "indonesian": "Ulat rambut Bihar"
},
{
  "id": 39666,
  "english": "Cabbage butterfly",
  "indonesian": "Kupu-kupu kubis"
},
{
  "id": 39667,
  "english": "Painted bug",
  "indonesian": "Kepik bergaris"
},
{
  "id": 39668,
  "english": "Bihar hairy caterpillar",
  "indonesian": "Ulat berbulu Bihar"
},
{
  "id": 39669,
  "english": "Red spider mites",
  "indonesian": "Tungau laba-laba merah"
},
{
  "id": 39670,
  "english": "Bulb mite",
  "indonesian": "Tungau umbi"
},
{
  "id": 39671,
  "english": "False Chinch Bug",
  "indonesian": "Kepik palsu"
},
{
  "id": 39672,
  "english": "Alfalfa Caterpillar",
  "indonesian": "Ulat alfalfa"
},
{
  "id": 39673,
  "english": "Blister Beetles",
  "indonesian": "Kumbang lepuh"
},
{
  "id": 39674,
  "english": "Clover Root Curculio",
  "indonesian": "Kumbang akar semanggi"
},
{
  "id": 39675,
  "english": "Grasshoppers",
  "indonesian": "Belalang"
},
{
  "id": 39676,
  "english": "Grey Weevil",
  "indonesian": "Kumbang abu-abu"
},
{
  "id": 39677,
  "english": "Greenflies",
  "indonesian": "Kutu hijau"
},
{
  "id": 39678,
  "english": "Brown citrus aphid",
  "indonesian": "Kutu daun jeruk coklat"
},
{
  "id": 39679,
  "english": "Citrus leaf miner",
  "indonesian": "Penggerek daun jeruk"
},
{
  "id": 39680,
  "english": "Citricolla scale or soft scales",
  "indonesian": "Kutu sisik lunak atau citricolla"
},
{
  "id": 39681,
  "english": "Asian citrus psyllid",
  "indonesian": "Psyllid jeruk Asia"
},
{
  "id": 39682,
  "english": "Garlic cutworm",
  "indonesian": "Ulat potong bawang putih"
},
{
  "id": 39683,
  "english": "Rhinoceros beetle",
  "indonesian": "Kumbang badak"
},
{
  "id": 39684,
  "english": "Cabbage diamondback moth",
  "indonesian": "Ngengat punggung berlian kubis"
},
{
  "id": 39685,
  "english": "Cabbage borer",
  "indonesian": "Penggerek kubis"
},
{
  "id": 39686,
  "english": "Bugs",
  "indonesian": "Serangga"
},
{
  "id": 39687,
  "english": "Mole cricket and ground cricket",
  "indonesian": "Jangkrik tanah dan jangkrik mole"
},
{
  "id": 39688,
  "english": "Hairy caterpillar",
  "indonesian": "Ulat berbulu"
},
{
  "id": 39689,
  "english": "Aphid",
  "indonesian": "Kutu daun"
},
{
  "id": 39690,
  "english": "Diamondback moth",
  "indonesian": "Ngengat punggung berlian"
},
{
  "id": 39691,
  "english": "Cauliflower butterfly",
  "indonesian": null
},
{
  "id": 39692,
  "english": "Gram Pod Borer/ Capsule Borer",
  "indonesian": null
},
{
  "id": 39693,
  "english": "Caterpillar",
  "indonesian": null
},
{
  "id": 39694,
  "english": "Bud Fly/Capsule Fly",
  "indonesian": null
},
{
  "id": 39695,
  "english": "American Boll Worm",
  "indonesian": null
},
{
  "id": 39696,
  "english": "Spotted Boll Worm",
  "indonesian": null
},
{
  "id": 39697,
  "english": "Pink Boll Worm",
  "indonesian": null
},
{
  "id": 39698,
  "english": "Jassid",
  "indonesian": null
},
{
  "id": 39699,
  "english": "Stinkbugs",
  "indonesian": null
},
{
  "id": 39700,
  "english": "Leaf eating caterpillar",
  "indonesian": null
},
{
  "id": 39701,
  "english": "Serpentine Leaf Miner",
  "indonesian": null
},
{
  "id": 39702,
  "english": "Pinworm",
  "indonesian": null
},
{
  "id": 39703,
  "english": "Top Shoot Borer",
  "indonesian": null
},
{
  "id": 39704,
  "english": "Leaf Gall Thrips",
  "indonesian": null
},
{
  "id": 39705,
  "english": "Leaf Miner Flies",
  "indonesian": null
},
{
  "id": 39706,
  "english": "Shoot and Capsule Bore",
  "indonesian": null
},
{
  "id": 39707,
  "english": "Green Mite",
  "indonesian": null
},
{
  "id": 39708,
  "english": "Variegated Cricket",
  "indonesian": null
},
{
  "id": 39709,
  "english": "Shoot Bug",
  "indonesian": null
},
{
  "id": 39710,
  "english": "Shootfly",
  "indonesian": null
},
{
  "id": 39711,
  "english": "Sorghum Cutworm",
  "indonesian": "Ulat potong sorgum"
},
{
  "id": 39712,
  "english": "Sorghum Midge",
  "indonesian": "Lalat sorgum"
},
{
  "id": 39713,
  "english": "Green Peach Aphid",
  "indonesian": "Kutu daun persik hijau"
},
{
  "id": 39714,
  "english": "Ground Beetles",
  "indonesian": "Kumbang tanah"
},
{
  "id": 39715,
  "english": "Root Knot Nematode",
  "indonesian": "Nematoda puru akar"
},
{
  "id": 39716,
  "english": "Shoot borer",
  "indonesian": "Penggerek pucuk"
},
{
  "id": 39717,
  "english": "Rhizome flies",
  "indonesian": "Lalat rimpang"
},
{
  "id": 39718,
  "english": "Rhizome scales",
  "indonesian": "Sisik rimpang"
},
{
  "id": 39719,
  "english": "Grape Berry Moth",
  "indonesian": "Ngengat beri anggur"
},
{
  "id": 39720,
  "english": "Grape Thrips",
  "indonesian": "Thrips anggur"
},
{
  "id": 39721,
  "english": "Grape Leaf Miner Flies",
  "indonesian": "Lalat penggerek daun anggur"
},
{
  "id": 39722,
  "english": "Grape Mealy Bugs",
  "indonesian": "Kutu putih anggur"
},
{
  "id": 39723,
  "english": "Grape Stem borer",
  "indonesian": "Penggerek batang anggur"
},
{
  "id": 39724,
  "english": "Red pumpkin beetle",
  "indonesian": "Kumbang labu merah"
},
{
  "id": 39725,
  "english": "Cucumber Beetle",
  "indonesian": "Kumbang mentimun"
},
{
  "id": 39726,
  "english": "Some Pest",
  "indonesian": "Beberapa Hama"
},
{
  "id": 39727,
  "english": "Blueberry flea beetle",
  "indonesian": "Kumbang kutu blueberry"
},
{
  "id": 39728,
  "english": "Sharpnosed leafhopper",
  "indonesian": "Walangsangit berhidung tajam"
},
{
  "id": 39729,
  "english": "Butterfly",
  "indonesian": "Kupu-kupu"
},
{
  "id": 39730,
  "english": "Leaf Roller",
  "indonesian": "Penggulung daun"
},
{
  "id": 39731,
  "english": "Cyclamen Mite",
  "indonesian": "Tungau cyclamen"
},
{
  "id": 39732,
  "english": "Potato Leafhopper",
  "indonesian": "Walangsangit kentang"
},
{
  "id": 39733,
  "english": "Root Weevil",
  "indonesian": "Kumbang akar"
},
{
  "id": 39734,
  "english": "Spittle Bugs",
  "indonesian": "Kepik ludah"
},
{
  "id": 39735,
  "english": "Strawberry Clipper (Bud) Weevil",
  "indonesian": "Kumbang penjepit stroberi (Kuncup)"
},
{
  "id": 39736,
  "english": "Tarnished Plant Bug",
  "indonesian": "Kepik tanaman ternoda"
},
{
  "id": 39737,
  "english": "Two-Spotted Mite",
  "indonesian": "Tungau dua bintik"
},
{
  "id": 39738,
  "english": "Western Flower Thrips",
  "indonesian": "Thrips bunga barat"
},
{
  "id": 39739,
  "english": "White Grubs (Japanese Beetle)",
  "indonesian": "Ulat putih (Kumbang Jepang)"
},
{
  "id": 39740,
  "english": "Cutworms and Armyworms",
  "indonesian": "Ulat potong dan ulat tentara"
},
{
  "id": 39741,
  "english": "New Pest",
  "indonesian": "Hama Baru"
},
{
  "id": 39742,
  "english": "New Pest 2",
  "indonesian": "Hama Baru 2"
},
{
  "id": 39743,
  "english": "Pod Fly",
  "indonesian": "Lalat Polong"
},
{
  "id": 39744,
  "english": "Plume Moth",
  "indonesian": "Ngengat Plume"
},
{
  "id": 39745,
  "english": "Typica (Bergandal, Sidikalang - Sumatera)",
  "indonesian": "Typica (Bergandal, Sidikalang - Sumatera)"
},
{
  "id": 39746,
  "english": "Jawa (Java Coffee, 1700AD)",
  "indonesian": "Jawa (Kopi Jawa, 1700 M)"
},
{
  "id": 39747,
  "english": "Arabusta (HDT; Hybrid of sterile Arabica and C. Robusta)",
  "indonesian": "Arabusta (HDT; Hibrida Arabika steril dan C. Robusta)"
},
{
  "id": 39748,
  "english": "Catimor Lines (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - mix breed arabica-robusta)",
  "indonesian": "Catimor Lines (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - campuran arabika-robusta)"
},
{
  "id": 39749,
  "english": "Bourbon Chocol",
  "indonesian": "Bourbon Chocol"
},
{
  "id": 39750,
  "english": "Jawa (Java Coffee, 1700 AD)",
  "indonesian": "Jawa (Kopi Jawa, 1700 M)"
},
{
  "id": 39751,
  "english": "test fuel",
  "indonesian": "bahan bakar uji"
},
{
  "id": 39752,
  "english": "tesr fuel",
  "indonesian": "bahan bakar tes"
},
{
  "id": 39753,
  "english": "my new fuel",
  "indonesian": "bahan bakar baru saya"
},
{
  "id": 39754,
  "english": "test",
  "indonesian": "uji"
},
{
  "id": 39755,
  "english": "Bacterial ooze",
  "indonesian": "Lendir bakteri"
},
{
  "id": 39756,
  "english": "Bacterial streaming",
  "indonesian": "Aliran bakteri"
},
{
  "id": 39757,
  "english": "Water soaked lesions",
  "indonesian": "Luka basah"
},
{
  "id": 39758,
  "english": "Canker",
  "indonesian": "Kanker"
},
{
  "id": 39759,
  "english": "Shepherds crook ends on woody plants",
  "indonesian": "Ujung penggembala pada tanaman berkayu"
},
{
  "id": 39760,
  "english": "Wildfire of tobacco",
  "indonesian": "Kebakaran tembakau"
},
{
  "id": 39761,
  "english": "Blight of beans",
  "indonesian": "Penyakit hawar pada kacang"
},
{
  "id": 39762,
  "english": "Fire blight",
  "indonesian": "Penyakit hawar api"
},
{
  "id": 39763,
  "english": "Soft rot",
  "indonesian": "Busuk lunak"
},
{
  "id": 39764,
  "english": "Aster yellows",
  "indonesian": "Aster kuning"
},
{
  "id": 39765,
  "english": "Cultural/natural/manual",
  "indonesian": "Budaya/alami/manual"
},
{
  "id": 39766,
  "english": "Fungal",
  "indonesian": "Jamur"
},
{
  "id": 39767,
  "english": "Viral",
  "indonesian": "Virus"
},
{
  "id": 39768,
  "english": "Bacterial",
  "indonesian": "Bakteri"
},
{
  "id": 39769,
  "english": "Leaf spots",
  "indonesian": "Bercak daun"
},
{
  "id": 39770,
  "english": "Bird's eye spot",
  "indonesian": "Bercak mata burung"
},
{
  "id": 39771,
  "english": "Damping off on seedlings",
  "indonesian": "Kelayuan pada bibit"
},
{
  "id": 39772,
  "english": "Apple scab",
  "indonesian": "Keropeng apel"
},
{
  "id": 39773,
  "english": "Fusarium Wilt",
  "indonesian": "Layuh fusarium"
},
{
  "id": 39774,
  "english": "Club root",
  "indonesian": "Akar gada"
},
{
  "id": 39775,
  "english": "Maize streak virus",
  "indonesian": "Virus garis-garis jagung"
},
{
  "id": 39776,
  "english": "Yellowed leaves",
  "indonesian": "Daun menguning"
},
{
  "id": 39777,
  "english": "Plant stunting",
  "indonesian": "Kerdil tanaman"
},
{
  "id": 39778,
  "english": "Potato virus",
  "indonesian": "Virus kentang"
},
{
  "id": 39779,
  "english": "Spotted wilt virus",
  "indonesian": "Virus layu bercak"
},
{
  "id": 39780,
  "english": "Plum pox virus",
  "indonesian": "Virus cacar prem"
},
{
  "id": 39781,
  "english": "Yellow leaf curl virus",
  "indonesian": "Virus keriting daun kuning"
},
{
  "id": 39782,
  "english": "Seed treatment",
  "indonesian": "Perlakuan benih"
},
{
  "id": 39783,
  "english": "Soil drenching",
  "indonesian": "Pengocoran tanah"
},
{
  "id": 39784,
  "english": "Dry, wet foliar spraying",
  "indonesian": "Penyemprotan daun kering, basah"
},
{
  "id": 39785,
  "english": "Last test",
  "indonesian": "Tes terakhir"
},
{
  "id": 39786,
  "english": "Testing last",
  "indonesian": "Pengujian terakhir"
},
{
  "id": 39787,
  "english": "Test last one",
  "indonesian": "Tes terakhir satu"
},
{
  "id": 39788,
  "english": "Testing last last",
  "indonesian": "Pengujian terakhir terakhir"
},
{
  "id": 39789,
  "english": "Testering",
  "indonesian": "Pengujian"
},
{
  "id": 39790,
  "english": "Testing",
  "indonesian": "Pengujian"
},
{
  "id": 39791,
  "english": "Hello test",
  "indonesian": "Halo tes"
},
{
  "id": 39792,
  "english": "New test",
  "indonesian": "Tes baru"
},
{
  "id": 39793,
  "english": "Zone",
  "indonesian": "Zona"
},
{
  "id": 39794,
  "english": "Paddock",
  "indonesian": "Padang penggembalaan"
},
{
  "id": 39795,
  "english": "Camp",
  "indonesian": "Kamp"
},
{
  "id": 39796,
  "english": "Pen",
  "indonesian": "Kandang"
},
{
  "id": 39797,
  "english": "Segment",
  "indonesian": "Segmen"
},
{
  "id": 39798,
  "english": "Pasture",
  "indonesian": "Padang rumput"
},
{
  "id": 39799,
  "english": "zero-grazing",
  "indonesian": "Penggembalaan nol"
},
{
  "id": 39800,
  "english": "fenced farming",
  "indonesian": "Pertanian berpagar"
},
{
  "id": 39801,
  "english": "enclosed ranching",
  "indonesian": "Peternakan tertutup"
},
{
  "id": 39802,
  "english": "my way",
  "indonesian": "caraku"
},
{
  "id": 39803,
  "english": "propping",
  "indonesian": "Penyanggaan"
},
{
  "id": 39804,
  "english": "Detrashing",
  "indonesian": "Pembersihan"
},
{
  "id": 39805,
  "english": "Topping",
  "indonesian": "Pemangkasan"
},
{
  "id": 39806,
  "english": "Nipping",
  "indonesian": "Pemotongan pucuk"
},
{
  "id": 39807,
  "english": "Loose Farming",
  "indonesian": "Pertanian bebas"
},
{
  "id": 39808,
  "english": "Conventional Barn System",
  "indonesian": "Sistem kandang konvensional"
},
{
  "id": 39809,
  "english": "Free Range System",
  "indonesian": "Sistem bebas berkeliaran"
},
{
  "id": 39810,
  "english": "semiwashed",
  "indonesian": "Semi dicuci"
},
{
  "id": 39811,
  "english": "fullwashed",
  "indonesian": "Sepenuhnya dicuci"
},
{
  "id": 39812,
  "english": "Hydro",
  "indonesian": "Hidro"
},
{
  "id": 39813,
  "english": "Optimize The Use Of Synthetic",
  "indonesian": "Mengoptimalkan penggunaan sintetis"
},
{
  "id": 39814,
  "english": "Currency setting saved successfully.",
  "indonesian": "Pengaturan mata uang berhasil disimpan."
},
{
  "id": 39815,
  "english": "Afghanistan",
  "indonesian": "Afganistan"
},
{
  "id": 39816,
  "english": "Åland Islands",
  "indonesian": "Kepulauan Åland"
},
{
  "id": 39817,
  "english": "Albania",
  "indonesian": "Albania"
},
{
  "id": 39818,
  "english": "Algeria",
  "indonesian": "Aljazair"
},
{
  "id": 39819,
  "english": "American Samoa",
  "indonesian": "Samoa Amerika"
},
{
  "id": 39820,
  "english": "Andorra",
  "indonesian": "Andorra"
},
{
  "id": 39821,
  "english": "Angola",
  "indonesian": "Angola"
},
{
  "id": 39822,
  "english": "Anguilla",
  "indonesian": "Anguilla"
},
{
  "id": 39823,
  "english": "Antarctica",
  "indonesian": "Antarktika"
},
{
  "id": 39824,
  "english": "Antigua and Barbuda",
  "indonesian": "Antigua dan Barbuda"
},
{
  "id": 39825,
  "english": "Argentina",
  "indonesian": "Argentina"
},
{
  "id": 39826,
  "english": "Armenia",
  "indonesian": "Armenia"
},
{
  "id": 39827,
  "english": "Aruba",
  "indonesian": "Aruba"
},
{
  "id": 39828,
  "english": "Australia",
  "indonesian": "Australia"
},
{
  "id": 39829,
  "english": "Austria",
  "indonesian": "Austria"
},
{
  "id": 39830,
  "english": "Azerbaijan",
  "indonesian": "Azerbaijan"
},
{
  "id": 39831,
  "english": "Bahamas",
  "indonesian": "Bahama"
},
{
  "id": 39832,
  "english": "Bahrain",
  "indonesian": "Bahrain"
},
{
  "id": 39833,
  "english": "Bangladesh",
  "indonesian": "Bangladesh"
},
{
  "id": 39834,
  "english": "Barbados",
  "indonesian": "Barbados"
},
{
  "id": 39835,
  "english": "Belarus",
  "indonesian": "Belarus"
},
{
  "id": 39836,
  "english": "Belgium",
  "indonesian": "Belgia"
},
{
  "id": 39837,
  "english": "Belize",
  "indonesian": "Belize"
},
{
  "id": 39838,
  "english": "Benin",
  "indonesian": "Benin"
},
{
  "id": 39839,
  "english": "Bermuda",
  "indonesian": "Bermuda"
},
{
  "id": 39840,
  "english": "Bhutan",
  "indonesian": "Bhutan"
},
{
  "id": 39841,
  "english": "Bolivia",
  "indonesian": "Bolivia"
},
{
  "id": 39842,
  "english": "Bosnia and Herzegovina",
  "indonesian": "Bosnia dan Herzegovina"
},
{
  "id": 39843,
  "english": "Botswana",
  "indonesian": "Botswana"
},
{
  "id": 39844,
  "english": "Bouvet Island",
  "indonesian": "Pulau Bouvet"
},
{
  "id": 39845,
  "english": "Brazil",
  "indonesian": "Brasil"
},
{
  "id": 39846,
  "english": "British Indian Ocean Territory",
  "indonesian": "Wilayah Samudra Hindia Britania"
},
{
  "id": 39847,
  "english": "British Virgin Islands",
  "indonesian": "Kepulauan Virgin Britania"
},
{
  "id": 39848,
  "english": "Brunei",
  "indonesian": "Brunei"
},
{
  "id": 39849,
  "english": "Bulgaria",
  "indonesian": "Bulgaria"
},
{
  "id": 39850,
  "english": "Burkina Faso",
  "indonesian": "Burkina Faso"
},
{
  "id": 39851,
  "english": "Burundi",
  "indonesian": "Burundi"
},
{
  "id": 39852,
  "english": "Cabo Verde",
  "indonesian": "Tanjung Verde"
},
{
  "id": 39853,
  "english": "Cambodia",
  "indonesian": "Kamboja"
},
{
  "id": 39854,
  "english": "Cameroon",
  "indonesian": "Kamerun"
},
{
  "id": 39855,
  "english": "Canada",
  "indonesian": "Kanada"
},
{
  "id": 39856,
  "english": "Caribbean Netherlands",
  "indonesian": "Karibia Belanda"
},
{
  "id": 39857,
  "english": "Cayman Islands",
  "indonesian": "Kepulauan Cayman"
},
{
  "id": 39858,
  "english": "Central African Republic",
  "indonesian": "Republik Afrika Tengah"
},
{
  "id": 39859,
  "english": "Chad",
  "indonesian": "Chad"
},
{
  "id": 39860,
  "english": "Chile",
  "indonesian": "Chili"
},
{
  "id": 39861,
  "english": "Christmas Island",
  "indonesian": "Pulau Natal"
},
{
  "id": 39862,
  "english": "Cocos (Keeling) Islands",
  "indonesian": "Kepulauan Cocos (Keeling)"
},
{
  "id": 39863,
  "english": "Comoros",
  "indonesian": "Komoro"
},
{
  "id": 39864,
  "english": "Congo Republic",
  "indonesian": "Republik Kongo"
},
{
  "id": 39865,
  "english": "Cook Islands",
  "indonesian": "Kepulauan Cook"
},
{
  "id": 39866,
  "english": "Costa Rica",
  "indonesian": "Kosta Rika"
},
{
  "id": 39867,
  "english": "Croatia",
  "indonesian": "Kroasia"
},
{
  "id": 39868,
  "english": "Cuba",
  "indonesian": "Kuba"
},
{
  "id": 39869,
  "english": "Curaçao",
  "indonesian": "Curaçao"
},
{
  "id": 39870,
  "english": "Cyprus",
  "indonesian": "Siprus"
},
{
  "id": 39871,
  "english": "Czechia",
  "indonesian": "Ceko"
},
{
  "id": 39872,
  "english": "Denmark",
  "indonesian": "Denmark"
},
{
  "id": 39873,
  "english": "Djibouti",
  "indonesian": "Jibuti"
},
{
  "id": 39874,
  "english": "Dominica",
  "indonesian": "Dominika"
},
{
  "id": 39875,
  "english": "Dominican Republic",
  "indonesian": "Republik Dominika"
},
{
  "id": 39876,
  "english": "DR Congo",
  "indonesian": "RD Kongo"
},
{
  "id": 39877,
  "english": "Ecuador",
  "indonesian": "Ekuador"
},
{
  "id": 39878,
  "english": "Egypt",
  "indonesian": "Mesir"
},
{
  "id": 39879,
  "english": "El Salvador",
  "indonesian": "El Salvador"
},
{
  "id": 39880,
  "english": "Equatorial Guinea",
  "indonesian": "Guinea Khatulistiwa"
},
{
  "id": 39881,
  "english": "Eritrea",
  "indonesian": "Eritrea"
},
{
  "id": 39882,
  "english": "Estonia",
  "indonesian": "Estonia"
},
{
  "id": 39883,
  "english": "Eswatini",
  "indonesian": "Eswatini"
},
{
  "id": 39884,
  "english": "Ethiopia",
  "indonesian": "Ethiopia"
},
{
  "id": 39885,
  "english": "Falkland Islands",
  "indonesian": "Kepulauan Falkland"
},
{
  "id": 39886,
  "english": "Faroe Islands",
  "indonesian": "Kepulauan Faroe"
},
{
  "id": 39887,
  "english": "Fiji",
  "indonesian": "Fiji"
},
{
  "id": 39888,
  "english": "Finland",
  "indonesian": "Finlandia"
},
{
  "id": 39889,
  "english": "France",
  "indonesian": "Perancis"
},
{
  "id": 39890,
  "english": "French Guiana",
  "indonesian": "Guyana Prancis"
},
{
  "id": 39891,
  "english": "French Polynesia",
  "indonesian": "Polinesia Prancis"
},
{
  "id": 39892,
  "english": "French Southern Territories",
  "indonesian": "Wilayah Selatan Prancis"
},
{
  "id": 39893,
  "english": "Gabon",
  "indonesian": "Gabon"
},
{
  "id": 39894,
  "english": "Gambia",
  "indonesian": "Gambia"
},
{
  "id": 39895,
  "english": "Georgia",
  "indonesian": "Georgia"
},
{
  "id": 39896,
  "english": "Germany",
  "indonesian": "Jerman"
},
{
  "id": 39897,
  "english": "Ghana",
  "indonesian": "Ghana"
},
{
  "id": 39898,
  "english": "Gibraltar",
  "indonesian": "Gibraltar"
},
{
  "id": 39899,
  "english": "Greece",
  "indonesian": "Yunani"
},
{
  "id": 39900,
  "english": "Greenland",
  "indonesian": "Greenland"
},
{
  "id": 39901,
  "english": "Grenada",
  "indonesian": "Grenada"
},
{
  "id": 39902,
  "english": "Guadeloupe",
  "indonesian": "Guadeloupe"
},
{
  "id": 39903,
  "english": "Guam",
  "indonesian": "Guam"
},
{
  "id": 39904,
  "english": "Guernsey",
  "indonesian": "Guernsey"
},
{
  "id": 39905,
  "english": "Guinea",
  "indonesian": "Guinea"
},
{
  "id": 39906,
  "english": "Guinea-Bissau",
  "indonesian": "Guinea-Bissau"
},
{
  "id": 39907,
  "english": "Guyana",
  "indonesian": "Guyana"
},
{
  "id": 39908,
  "english": "Haiti",
  "indonesian": "Haiti"
},
{
  "id": 39909,
  "english": "Heard Island and McDonald Islands",
  "indonesian": "Kepulauan Heard dan McDonald"
},
{
  "id": 39910,
  "english": "Honduras",
  "indonesian": "Honduras"
},
{
  "id": 39911,
  "english": "Hong Kong",
  "indonesian": "Hong Kong"
},
{
  "id": 39912,
  "english": "Hungary",
  "indonesian": "Hongaria"
},
{
  "id": 39913,
  "english": "Iceland",
  "indonesian": "Islandia"
},
{
  "id": 39914,
  "english": "Indonesia",
  "indonesian": "Indonesia"
},
{
  "id": 39915,
  "english": "Iran",
  "indonesian": "Iran"
},
{
  "id": 39916,
  "english": "Iraq",
  "indonesian": "Irak"
},
{
  "id": 39917,
  "english": "Ireland",
  "indonesian": "Irlandia"
},
{
  "id": 39918,
  "english": "Isle of Man",
  "indonesian": "Pulau Man"
},
{
  "id": 39919,
  "english": "Italy",
  "indonesian": "Italia"
},
{
  "id": 39920,
  "english": "Ivory Coast",
  "indonesian": "Pantai Gading"
},
{
  "id": 39921,
  "english": "Jamaica",
  "indonesian": "Jamaika"
},
{
  "id": 39922,
  "english": "Japan",
  "indonesian": "Jepang"
},
{
  "id": 39923,
  "english": "Jersey",
  "indonesian": "Jersey"
},
{
  "id": 39924,
  "english": "Jordan",
  "indonesian": "Yordania"
},
{
  "id": 39925,
  "english": "Kazakhstan",
  "indonesian": "Kazakhstan"
},
{
  "id": 39926,
  "english": "Kenya",
  "indonesian": "Kenya"
},
{
  "id": 39927,
  "english": "Kiribati",
  "indonesian": "Kiribati"
},
{
  "id": 39928,
  "english": "Kosovo",
  "indonesian": "Kosovo"
},
{
  "id": 39929,
  "english": "Kuwait",
  "indonesian": "Kuwait"
},
{
  "id": 39930,
  "english": "Kyrgyzstan",
  "indonesian": "Kirgistan"
},
{
  "id": 39931,
  "english": "Laos",
  "indonesian": "Laos"
},
{
  "id": 39932,
  "english": "Latvia",
  "indonesian": "Latvia"
},
{
  "id": 39933,
  "english": "Lebanon",
  "indonesian": "Lebanon"
},
{
  "id": 39934,
  "english": "Lesotho",
  "indonesian": "Lesotho"
},
{
  "id": 39935,
  "english": "Liberia",
  "indonesian": "Liberia"
},
{
  "id": 39936,
  "english": "Libya",
  "indonesian": "Libya"
},
{
  "id": 39937,
  "english": "Liechtenstein",
  "indonesian": "Liechtenstein"
},
{
  "id": 39938,
  "english": "Lithuania",
  "indonesian": "Lituania"
},
{
  "id": 39939,
  "english": "Luxembourg",
  "indonesian": "Luksemburg"
},
{
  "id": 39940,
  "english": "Macao",
  "indonesian": "Makau"
},
{
  "id": 39941,
  "english": "Madagascar",
  "indonesian": "Madagaskar"
},
{
  "id": 39942,
  "english": "Malawi",
  "indonesian": "Malawi"
},
{
  "id": 39943,
  "english": "Malaysia",
  "indonesian": "Malaysia"
},
{
  "id": 39944,
  "english": "Maldives",
  "indonesian": "Maladewa"
},
{
  "id": 39945,
  "english": "Mali",
  "indonesian": "Mali"
},
{
  "id": 39946,
  "english": "Malta",
  "indonesian": "Malta"
},
{
  "id": 39947,
  "english": "Marshall Islands",
  "indonesian": "Kepulauan Marshall"
},
{
  "id": 39948,
  "english": "Martinique",
  "indonesian": "Martinik"
},
{
  "id": 39949,
  "english": "Mauritania",
  "indonesian": "Mauritania"
},
{
  "id": 39950,
  "english": "Mauritius",
  "indonesian": "Mauritius"
},
{
  "id": 39951,
  "english": "Mayotte",
  "indonesian": "Mayotte"
},
{
  "id": 39952,
  "english": "Mexico",
  "indonesian": "Meksiko"
},
{
  "id": 39953,
  "english": "Micronesia",
  "indonesian": "Mikronesia"
},
{
  "id": 39954,
  "english": "Moldova",
  "indonesian": "Moldova"
},
{
  "id": 39955,
  "english": "Monaco",
  "indonesian": "Monako"
},
{
  "id": 39956,
  "english": "Mongolia",
  "indonesian": "Mongolia"
},
{
  "id": 39957,
  "english": "Montenegro",
  "indonesian": "Montenegro"
},
{
  "id": 39958,
  "english": "Montserrat",
  "indonesian": "Montserrat"
},
{
  "id": 39959,
  "english": "Morocco",
  "indonesian": "Maroko"
},
{
  "id": 39960,
  "english": "Mozambique",
  "indonesian": "Mozambik"
},
{
  "id": 39961,
  "english": "Myanmar",
  "indonesian": "Myanmar"
},
{
  "id": 39962,
  "english": "Namibia",
  "indonesian": "Namibia"
},
{
  "id": 39963,
  "english": "Nauru",
  "indonesian": "Nauru"
},
{
  "id": 39964,
  "english": "Netherlands",
  "indonesian": "Belanda"
},
{
  "id": 39965,
  "english": "Netherlands Antilles",
  "indonesian": "Antillen Belanda"
},
{
  "id": 39966,
  "english": "New Caledonia",
  "indonesian": "Kaledonia Baru"
},
{
  "id": 39967,
  "english": "New Zealand",
  "indonesian": "Selandia Baru"
},
{
  "id": 39968,
  "english": "Nicaragua",
  "indonesian": "Nikaragua"
},
{
  "id": 39969,
  "english": "Niger",
  "indonesian": "Niger"
},
{
  "id": 39970,
  "english": "Nigeria",
  "indonesian": "Nigeria"
},
{
  "id": 39971,
  "english": "Niue",
  "indonesian": "Niue"
},
{
  "id": 39972,
  "english": "Norfolk Island",
  "indonesian": "Pulau Norfolk"
},
{
  "id": 39973,
  "english": "North Korea",
  "indonesian": "Korea Utara"
},
{
  "id": 39974,
  "english": "North Macedonia",
  "indonesian": "Makedonia Utara"
},
{
  "id": 39975,
  "english": "Northern Mariana Islands",
  "indonesian": "Kepulauan Mariana Utara"
},
{
  "id": 39976,
  "english": "Norway",
  "indonesian": "Norwegia"
},
{
  "id": 39977,
  "english": "Oman",
  "indonesian": "Oman"
},
{
  "id": 39978,
  "english": "Pakistan",
  "indonesian": "Pakistan"
},
{
  "id": 39979,
  "english": "Palau",
  "indonesian": "Palau"
},
{
  "id": 39980,
  "english": "Palestine",
  "indonesian": "Palestina"
},
{
  "id": 39981,
  "english": "Panama",
  "indonesian": "Panama"
},
{
  "id": 39982,
  "english": "Papua New Guinea",
  "indonesian": "Papua Nugini"
},
{
  "id": 39983,
  "english": "Paraguay",
  "indonesian": "Paraguay"
},
{
  "id": 39984,
  "english": "Peru",
  "indonesian": "Peru"
},
{
  "id": 39985,
  "english": "Philippines",
  "indonesian": "Filipina"
},
{
  "id": 39986,
  "english": "Pitcairn Islands",
  "indonesian": "Kepulauan Pitcairn"
},
{
  "id": 39987,
  "english": "Poland",
  "indonesian": "Polandia"
},
{
  "id": 39988,
  "english": "Portugal",
  "indonesian": "Portugal"
},
{
  "id": 39989,
  "english": "Puerto Rico",
  "indonesian": "Puerto Riko"
},
{
  "id": 39990,
  "english": "Qatar",
  "indonesian": "Qatar"
},
{
  "id": 39991,
  "english": "Réunion",
  "indonesian": "Réunion"
},
{
  "id": 39992,
  "english": "Romania",
  "indonesian": "Rumania"
},
{
  "id": 39993,
  "english": "Russia",
  "indonesian": "Rusia"
},
{
  "id": 39994,
  "english": "Rwanda",
  "indonesian": "Rwanda"
},
{
  "id": 39995,
  "english": "Saint Barthélemy",
  "indonesian": "Saint Barthélemy"
},
{
  "id": 39996,
  "english": "Saint Helena",
  "indonesian": "Saint Helena"
},
{
  "id": 39997,
  "english": "Saint Kitts and Nevis",
  "indonesian": "Saint Kitts dan Nevis"
},
{
  "id": 39998,
  "english": "Saint Lucia",
  "indonesian": "Saint Lucia"
},
{
  "id": 39999,
  "english": "Saint Martin",
  "indonesian": "Saint Martin"
},
{
  "id": 40000,
  "english": "Saint Pierre and Miquelon",
  "indonesian": "Saint Pierre dan Miquelon"
},
{
  "id": 40001,
  "english": "Saint Vincent and the Grenadines",
  "indonesian": "Saint Vincent dan Grenadines"
},
{
  "id": 40002,
  "english": "Samoa",
  "indonesian": "Samoa"
},
{
  "id": 40003,
  "english": "San Marino",
  "indonesian": "San Marino"
},
{
  "id": 40004,
  "english": "São Tomé and Príncipe",
  "indonesian": "São Tomé dan Príncipe"
},
{
  "id": 40005,
  "english": "Saudi Arabia",
  "indonesian": "Arab Saudi"
},
{
  "id": 40006,
  "english": "Senegal",
  "indonesian": "Senegal"
},
{
  "id": 40007,
  "english": "Serbia",
  "indonesian": "Serbia"
},
{
  "id": 40008,
  "english": "Seychelles",
  "indonesian": "Seychelles"
},
{
  "id": 40009,
  "english": "Sierra Leone",
  "indonesian": "Sierra Leone"
},
{
  "id": 40010,
  "english": "Singapore",
  "indonesian": "Singapura"
},
{
  "id": 40011,
  "english": "Sint Maarten",
  "indonesian": "Sint Maarten"
},
{
  "id": 40012,
  "english": "Slovakia",
  "indonesian": "Slowakia"
},
{
  "id": 40013,
  "english": "Slovenia",
  "indonesian": "Slovenia"
},
{
  "id": 40014,
  "english": "Solomon Islands",
  "indonesian": "Kepulauan Solomon"
},
{
  "id": 40015,
  "english": "Somalia",
  "indonesian": "Somalia"
},
{
  "id": 40016,
  "english": "South Africa",
  "indonesian": "Afrika Selatan"
},
{
  "id": 40017,
  "english": "South Georgia and South Sandwich Islands",
  "indonesian": "Georgia Selatan dan Kepulauan Sandwich Selatan"
},
{
  "id": 40018,
  "english": "South Korea",
  "indonesian": "Korea Selatan"
},
{
  "id": 40019,
  "english": "South Sudan",
  "indonesian": "Sudan Selatan"
},
{
  "id": 40020,
  "english": "Spain",
  "indonesian": "Spanyol"
},
{
  "id": 40021,
  "english": "Sri Lanka",
  "indonesian": "Sri Lanka"
},
{
  "id": 40022,
  "english": "Sudan",
  "indonesian": "Sudan"
},
{
  "id": 40023,
  "english": "Suriname",
  "indonesian": "Suriname"
},
{
  "id": 40024,
  "english": "Svalbard and Jan Mayen",
  "indonesian": "Svalbard dan Jan Mayen"
},
{
  "id": 40025,
  "english": "Sweden",
  "indonesian": "Swedia"
},
{
  "id": 40026,
  "english": "Switzerland",
  "indonesian": "Swiss"
},
{
  "id": 40027,
  "english": "Syria",
  "indonesian": "Suriah"
},
{
  "id": 40028,
  "english": "Taiwan",
  "indonesian": "Taiwan"
},
{
  "id": 40029,
  "english": "Tajikistan",
  "indonesian": "Tajikistan"
},
{
  "id": 40030,
  "english": "Tanzania",
  "indonesian": "Tanzania"
},
{
  "id": 40031,
  "english": "Thailand",
  "indonesian": "Thailand"
},
{
  "id": 40032,
  "english": "Timor-Leste",
  "indonesian": "Timor-Leste"
},
{
  "id": 40033,
  "english": "Togo",
  "indonesian": "Togo"
},
{
  "id": 40034,
  "english": "Tokelau",
  "indonesian": "Tokelau"
},
{
  "id": 40035,
  "english": "Tonga",
  "indonesian": "Tonga"
},
{
  "id": 40036,
  "english": "Trinidad and Tobago",
  "indonesian": "Trinidad dan Tobago"
},
{
  "id": 40037,
  "english": "Tunisia",
  "indonesian": "Tunisia"
},
{
  "id": 40038,
  "english": "Turkey",
  "indonesian": "Turki"
},
{
  "id": 40039,
  "english": "Turkmenistan",
  "indonesian": "Turkmenistan"
},
{
  "id": 40040,
  "english": "Turks and Caicos Islands",
  "indonesian": "Kepulauan Turks dan Caicos"
},
{
  "id": 40041,
  "english": "Tuvalu",
  "indonesian": "Tuvalu"
},
{
  "id": 40042,
  "english": "U.S. Minor Outlying Islands",
  "indonesian": "Kepulauan Terluar Kecil Amerika Serikat"
},
{
  "id": 40043,
  "english": "U.S. Virgin Islands",
  "indonesian": "Kepulauan Virgin Amerika Serikat"
},
{
  "id": 40044,
  "english": "Ukraine",
  "indonesian": "Ukraina"
},
{
  "id": 40045,
  "english": "United Arab Emirates",
  "indonesian": "Uni Emirat Arab"
},
{
  "id": 40046,
  "english": "United Kingdom",
  "indonesian": "Inggris"
},
{
  "id": 40047,
  "english": "United States of America",
  "indonesian": "Amerika Serikat"
},
{
  "id": 40048,
  "english": "Uruguay",
  "indonesian": "Uruguay"
},
{
  "id": 40049,
  "english": "Uzbekistan",
  "indonesian": "Uzbekistan"
},
{
  "id": 40050,
  "english": "Vanuatu",
  "indonesian": "Vanuatu"
},
{
  "id": 40051,
  "english": "Vatican City",
  "indonesian": "Kota Vatikan"
},
{
  "id": 40052,
  "english": "Venezuela",
  "indonesian": "Venezuela"
},
{
  "id": 40053,
  "english": "Vietnam",
  "indonesian": "Vietnam"
},
{
  "id": 40054,
  "english": "Wallis and Futuna",
  "indonesian": "Wallis dan Futuna"
},
{
  "id": 40055,
  "english": "Western Sahara",
  "indonesian": "Sahara Barat"
},
{
  "id": 40056,
  "english": "Yemen",
  "indonesian": "Yaman"
},
{
  "id": 40057,
  "english": "Zambia",
  "indonesian": "Zambia"
},
{
  "id": 40058,
  "english": "Zimbabwe",
  "indonesian": "Zimbabwe"
},
{
  "id": 40059,
  "english": "QA Topic",
  "indonesian": "Topik QA"
},
{
  "id": 40060,
  "english": "Technical Issues",
  "indonesian": "Masalah Teknis"
},
{
  "id": 40061,
  "english": "Mungbean ( Brazil )",
  "indonesian": "Kacang Hijau (Brasil)"
},
{
  "id": 40062,
  "english": "Mungbean ( India )",
  "indonesian": "Kacang Hijau (India)"
},
{
  "id": 40063,
  "english": "Mungbean ( Ethiopia )",
  "indonesian": "Kacang Hijau (Ethiopia)"
},
{
  "id": 40064,
  "english": "Ginger",
  "indonesian": "Jahe"
},
{
  "id": 40065,
  "english": "Tobacco ( Canada )",
  "indonesian": "Tembakau (Kanada)"
},
{
  "id": 40066,
  "english": "Mango",
  "indonesian": "Mangga"
},
{
  "id": 40067,
  "english": "Cauliflower (India)",
  "indonesian": "Kol (India)"
},
{
  "id": 40068,
  "english": "Kidney bean (Brazil)",
  "indonesian": "Kacang Merah (Brasil)"
},
{
  "id": 40069,
  "english": "Kidney bean (India)",
  "indonesian": "Kacang Merah (India)"
},
{
  "id": 40070,
  "english": "Papaya (India)",
  "indonesian": "Pepaya (India)"
},
{
  "id": 40071,
  "english": "Grape",
  "indonesian": "Anggur"
},
{
  "id": 40072,
  "english": "Mango (India)",
  "indonesian": "Mangga (India)"
},
{
  "id": 40073,
  "english": "Cacao (Colombia)",
  "indonesian": "Kakao (Kolombia)"
},
{
  "id": 40074,
  "english": "Cacao (Peru)",
  "indonesian": "Kakao (Peru)"
},
{
  "id": 40075,
  "english": "Garlic (India)",
  "indonesian": "Bawang Putih (India)"
},
{
  "id": 40076,
  "english": "Apple (Brazil)",
  "indonesian": "Apel (Brasil)"
},
{
  "id": 40077,
  "english": "Orange",
  "indonesian": "Jeruk"
},
{
  "id": 40078,
  "english": "Strawberry (India)",
  "indonesian": "Stroberi (India)"
},
{
  "id": 40079,
  "english": "Strawberry (Brazil)",
  "indonesian": "Stroberi (Brasil)"
},
{
  "id": 40080,
  "english": "Turmeric (India)",
  "indonesian": "Kunyit (India)"
},
{
  "id": 40081,
  "english": "Papaya (Brazil)",
  "indonesian": "Pepaya (Brasil)"
},
{
  "id": 40082,
  "english": "Ginger (India)",
  "indonesian": "Jahe (India)"
},
{
  "id": 40083,
  "english": "Pearl Millet (India)",
  "indonesian": "Beras Sorghum (India)"
},
{
  "id": 40084,
  "english": "Broccoli (India)",
  "indonesian": "Brokoli (India)"
},
{
  "id": 40085,
  "english": "Apple (Nepal)",
  "indonesian": "Apel (Nepal)"
},
{
  "id": 40086,
  "english": "Blueberry (Brazil)",
  "indonesian": "Blueberry (Brasil)"
},
{
  "id": 40087,
  "english": "Oil palm (Colombia)",
  "indonesian": "Kelapa Sawit (Kolombia)"
},
{
  "id": 40088,
  "english": "Rice (Indonesia)",
  "indonesian": "Padi (Indonesia)"
},
{
  "id": 40089,
  "english": "Grape (Libya)",
  "indonesian": "Anggur (Libya)"
},
{
  "id": 40090,
  "english": "Sugarcane (Tanzania)",
  "indonesian": "Tebu (Tanzania)"
},
{
  "id": 40091,
  "english": "Alfalfa (Libya)",
  "indonesian": "Alfalfa (Libya)"
},
{
  "id": 40092,
  "english": "Grape (Brazil)",
  "indonesian": "Anggur (Brasil)"
},
{
  "id": 40093,
  "english": "Tobacco (Tanzania)",
  "indonesian": "Tembakau (Tanzania)"
},
{
  "id": 40094,
  "english": "Cacao (Honduras)",
  "indonesian": "Kakao (Honduras)"
},
{
  "id": 40095,
  "english": "Rice (Nigeria)",
  "indonesian": "Padi (Nigeria)"
},
{
  "id": 40096,
  "english": "Barley (Libya)",
  "indonesian": "Barli (Libya)"
},
{
  "id": 40097,
  "english": "Orange (Kenya)",
  "indonesian": "Jeruk (Kenya)"
},
{
  "id": 40134,
  "english": "Bags per Manzana",
  "indonesian": "Tas per Manzana"
},
{
  "id": 40135,
  "english": "Bushels per Manzana",
  "indonesian": "Bushel per Manzana"
},
{
  "id": 40136,
  "english": "Tonnes per Manzana",
  "indonesian": "Ton per Manzana"
},
{
  "id": 40137,
  "english": "Kilogram per Manzana",
  "indonesian": "Kilogram per Manzana"
},
{
  "id": 40138,
  "english": "Tonne per Manzana",
  "indonesian": "Ton per Manzana"
},
{
  "id": 40139,
  "english": "Manzana",
  "indonesian": "Manzana"
},
{
  "id": 40140,
  "english": "Gram per centimeter cube",
  "indonesian": "Gram per sentimeter kubik"
},
{
  "id": 40141,
  "english": "Kilogram per meter cube",
  "indonesian": "Kilogram per meter kubik"
},
{
  "id": 40142,
  "english": "Pound per meter cube",
  "indonesian": "Pound per meter kubik"
},
{
  "id": 40143,
  "english": "Pound per centimeter cube",
  "indonesian": "Pound per sentimeter kubik"
},
{
  "id": 40252,
  "english": "litres/hour",
  "indonesian": "liter/jam"
},
{
  "id": 40253,
  "english": "litres/second",
  "indonesian": "liter/detik"
},
{
  "id": 40259,
  "english": "Soil Information",
  "indonesian": "Informasi Tanah"
},
{
  "id": 40260,
  "english": "Crop Observation",
  "indonesian": "Observasi Tanaman"
},
{
  "id": 40261,
  "english": "Green gram (kenya)",
  "indonesian": "Kacang Hijau (Kenya)"
},
{
  "id": 40262,
  "english": "Raw Cacao Beans",
  "indonesian": "Biji Kakao Mentah"
},
{
  "id": 40263,
  "english": "Fermented And Dried Cacao Beans",
  "indonesian": "Biji Kakao Fermentasi dan Kering"
},
{
  "id": 40264,
  "english": "Cacao Nibs",
  "indonesian": "Keripik Kakao"
},
{
  "id": 40265,
  "english": "Cacao Mass (Liquid)",
  "indonesian": "Massa Kakao (Cair)"
},
{
  "id": 40266,
  "english": "Cacao Mass (Solid)",
  "indonesian": "Massa Kakao (Padat)"
},
{
  "id": 40267,
  "english": "Cacao Butter",
  "indonesian": "Mentega Kakao"
},
{
  "id": 40268,
  "english": "Cacao Powder",
  "indonesian": "Bubuk Kakao"
},
{
  "id": 40269,
  "english": "Chocolate Liquor",
  "indonesian": "Cokelat Cair"
},
{
  "id": 40270,
  "english": "Chocolate Products",
  "indonesian": "Produk Cokelat"
},
{
  "id": 40271,
  "english": "Fair Trade Or Specialty Deliveries",
  "indonesian": "Pengiriman Perdagangan Adil atau Khusus"
},
{
  "id": 40274,
  "english": "Coffee wilt disease",
  "indonesian": "Penyakit Layu Kopi"
},
{
  "id": 40275,
  "english": "It is a common wilt that results in complete death of coffee trees it infects. This vascular disease is induced by the fungal pathogen known by its (Fusarium xylarioides).",
  "indonesian": "Ini adalah penyakit layu umum yang menyebabkan kematian total pohon kopi yang terinfeksi. Penyakit vaskular ini disebabkan oleh patogen jamur yang dikenal sebagai (Fusarium xylarioides)."
},
{
  "id": 40276,
  "english": "Due to the nature of coffee wilt disease, coffee plants often exhibit symptoms of disruption to vascular systems. Internal symptoms are disturbances to conduction of water in the plant.",
  "indonesian": "Karena sifat penyakit layu kopi, tanaman kopi sering menunjukkan gejala gangguan pada sistem vaskular. Gejala internal adalah gangguan pada penghantaran air di dalam tanaman."
},
{
  "id": 40277,
  "english": "External symptoms include loss of moisture on leaves, discoloration, leaf loss, dieback of the infected region, swelling of trunks, cracks in mature trees and lastly plant death",
  "indonesian": "Gejala eksternal meliputi hilangnya kelembaban pada daun, perubahan warna, kerontokan daun, kematian kembali wilayah terinfeksi, pembengkakan batang, retakan pada pohon dewasa, dan akhirnya kematian tanaman"
},
{
  "id": 40283,
  "english": "Tickets",
  "indonesian": "Tiket"
},
{
  "id": 40290,
  "english": "You have been invited to the survey",
  "indonesian": "Anda telah diundang untuk survei"
},
{
  "id": 40291,
  "english": "Husk",
  "indonesian": "Tempurung"
},
{
  "id": 40296,
  "english": "Piles",
  "indonesian": "Tumpukan"
},
{
  "id": 40297,
  "english": "Boxes",
  "indonesian": "Kotak-kotak"
},
{
  "id": 40298,
  "english": "Orange scab",
  "indonesian": "Kudis jeruk"
},
{
  "id": 40299,
  "english": "Citrus tristeza virus",
  "indonesian": "Virus Citrus Tristeza"
},
{
  "id": 40300,
  "english": "Citrus greening",
  "indonesian": "Penghijauan Citrus"
},
{
  "id": 40301,
  "english": "Leaves curling, and leaves and twigs covered in a sticky substance (honeydew) which may be growing sooty mold.",
  "indonesian": "Daun menggulung, dan daun serta ranting tertutup zat lengket (madu) yang mungkin tumbuh jamur hitam."
},
{
  "id": 40302,
  "english": "Insects are small and soft-bodied and are black in color.",
  "indonesian": "Serangga kecil berbadan lunak dan berwarna hitam."
},
{
  "id": 40303,
  "english": "Aphids transmit tristeza virus on citrus.",
  "indonesian": "Kutu daun menularkan virus tristeza pada tanaman jeruk."
},
{
  "id": 40304,
  "english": "Tips of leaves in new growth flushes are twisted, and affected leaves do not expand properly.",
  "indonesian": "Ujung daun pada pertumbuhan baru menjadi keriting, dan daun yang terkena tidak berkembang dengan baik."
},
{
  "id": 40305,
  "english": "Trees may show symptoms of citrus greening.",
  "indonesian": "Pohon mungkin menunjukkan gejala penghijauan pada tanaman jeruk."
},
{
  "id": 40306,
  "english": "The insect is tiny (4 mm in length) and has a mottled brown appearance. The insect feeds at an angle to the plant, which makes it resemble thorns on the plant leaves.",
  "indonesian": "Serangga ini sangat kecil (panjang 4 mm) dan memiliki penampilan berwarna coklat belang. Serangga ini makan pada sudut tanaman, sehingga terlihat seperti duri pada daun tanaman."
},
{
  "id": 40307,
  "english": "Citrus leafminer larvae feed by creating shallow tunnels, or mines, in young leaves of citrus trees.",
  "indonesian": "Larva penggerek daun jeruk membuat terowongan dangkal, atau tambang, di daun muda pohon jeruk."
},
{
  "id": 40308,
  "english": "Leaf deformation - twisted or curled appearance.",
  "indonesian": "Deformasi daun - tampak keriting atau keriting."
},
{
  "id": 40309,
  "english": "White or gray tunnels on the leaf surface, stunted growth, and reduced fruit size.",
  "indonesian": "Terowongan putih atau abu-abu pada permukaan daun, pertumbuhan terhambat, dan ukuran buah yang lebih kecil."
},
{
  "id": 40310,
  "english": "Yellow seedlings,Stem pitting,poor fruit quality",
  "indonesian": "Perkecambahan kuning, gundukan pada batang, kualitas buah yang buruk"
},
{
  "id": 40311,
  "english": "Defoliation in early stages, The caterpillar makes holes in pod, insert the head and the rest of the body hanging out. feed from outside on developing seeds. Pods with round holes",
  "indonesian": "Defoliasi pada tahap awal, Ulat membuat lubang di polong, memasukkan kepala dan sisa tubuhnya menggantung. makan dari luar pada biji yang sedang berkembang. Polong dengan lubang bulat"
},
{
  "id": 40312,
  "english": "Larvae damage leaves, buds, flowers, pods and beans;",
  "indonesian": "Larva merusak daun, tunas, bunga, polong, dan biji;"
},
{
  "id": 40313,
  "english": "Eggs are laid singly on both upper and lower leaf surfaces and are initially creamy white but develop a brown-red ring after 24 hours and darken prior to hatching",
  "indonesian": "Telur diletakkan sendiri di kedua permukaan daun atas dan bawah dan awalnya berwarna putih krem ​​tetapi mengembangkan cincin merah coklat setelah 24 jam dan menggelap sebelum menetas"
},
{
  "id": 40314,
  "english": "They damage flowers causing discoloration and shedding",
  "indonesian": "Mereka merusak bunga menyebabkan perubahan warna dan gugur"
},
{
  "id": 40315,
  "english": "Damaged pods have small darkened entry holes on the surface and borers inside",
  "indonesian": "Polong yang rusak memiliki lubang masuk kecil yang menghitam di permukaan dan penggerek di dalam"
},
{
  "id": 40316,
  "english": "Infested pods and flowers are webbed together",
  "indonesian": "Polong dan bunga yang terinfeksi terjalin bersama"
},
{
  "id": 40317,
  "english": "Larvae often found binding leaves together and feeds on the chlorophyll while remaining inside the web",
  "indonesian": "Larva sering ditemukan mengikat daun bersama dan makan klorofil sambil tetap berada di dalam jaring"
},
{
  "id": 40318,
  "english": "Leaves rolled up apically and become white and dried up",
  "indonesian": "Daun digulung secara apikal dan menjadi putih dan kering"
},
{
  "id": 40319,
  "english": "Leaflets are webbed together with silk, and the larva feeds within the web",
  "indonesian": "Daun kecil terjalin bersama dengan sutra, dan larva makan di dalam jaring"
},
{
  "id": 40320,
  "english": "Dark brown encrustation on the pod wall",
  "indonesian": "Krustasi cokelat gelap di dinding polong"
},
{
  "id": 40321,
  "english": "Deforestation",
  "indonesian": "Deforestasi"
},
{
  "id": 40323,
  "english": "Deforestation Compliance Reports",
  "indonesian": "Laporan Kepatuhan Deforestasi"
},
{
  "id": 40324,
  "english": "Compliance Certification",
  "indonesian": "Sertifikasi Kepatuhan"
},
{
  "id": 40326,
  "english": "Order By",
  "indonesian": "Urutkan Berdasarkan"
},
{
  "id": 40327,
  "english": "button Create Admin Role? above",
  "indonesian": "tombol Buat Peran Admin? di atas"
},
{
  "id": 40328,
  "english": "Cassava Green Mite (Mononychellus tanajoa)\r\n",
  "indonesian": "Kutu hijau singkong (Mononychellus tanajoa)"
},
{
  "id": 40329,
  "english": "Whitefly (Aleurodicus dispersus)\r\n",
  "indonesian": "Kutu putih (Aleurodicus dispersus)"
},
{
  "id": 40330,
  "english": "Coffee Shot hole borer: Xylosandrus compactus\r\n",
  "indonesian": "Pembor tular kopi: Xylosandrus compactus"
},
{
  "id": 40331,
  "english": "Cassava Green Mite (Mononychellus tanajoa)\n",
  "indonesian": "Kutu Hijau Singkong (Mononychellus tanajoa)"
},
{
  "id": 40332,
  "english": "Whitefly (Aleurodicus dispersus)\n",
  "indonesian": "Kutu Putih (Aleurodicus dispersus)"
},
{
  "id": 40333,
  "english": "?Red spider mite",
  "indonesian": "Kutu laba-laba merah"
},
{
  "id": 40334,
  "english": "Cotton Spotted boll worm\n",
  "indonesian": "Ulat bola berbintik kapas"
},
{
  "id": 40335,
  "english": "Coffee Shot hole borer\n",
  "indonesian": "Pembor lubang tembakan kopi"
},
{
  "id": 40336,
  "english": "Tomato Gram pod borer\n",
  "indonesian": "Penggerek polong gram tomat"
},
{
  "id": 40337,
  "english": "Tomato Leaf eating caterpillar\n",
  "indonesian": "Ulat pemakan daun tomat"
},
{
  "id": 40338,
  "english": "Tomato Whitefly\n",
  "indonesian": "Kutu Putih Tomat"
},
{
  "id": 40339,
  "english": "Tomato Serpentine leaf miner.\n",
  "indonesian": "Penggerek daun tomat serpentin"
},
{
  "id": 40340,
  "english": "Leaf webber or roller and capsule borer\n",
  "indonesian": "Pengikat atau pembulat daun dan penggerek kapsul"
},
{
  "id": 40341,
  "english": "Aphids\n",
  "indonesian": "Kutu daun"
},
{
  "id": 40342,
  "english": "Corn earworm \n",
  "indonesian": "Ulat telinga jagung"
},
{
  "id": 40343,
  "english": "Shield scale\n",
  "indonesian": "Skala perisai"
},
{
  "id": 40344,
  "english": "Leaf beetle\n",
  "indonesian": "Kumbang daun"
},
{
  "id": 40345,
  "english": "African cassava mosaic disease\r\n",
  "indonesian": "Penyakit mozaik singkong Afrika"
},
{
  "id": 40346,
  "english": "African cassava mosaic disease\n",
  "indonesian": "Penyakit mozaik singkong Afrika"
},
{
  "id": 40347,
  "english": "Cotton Black arm/ Angular leaf spot\n",
  "indonesian": "Lengan hitam kapas / Bercak daun angular"
},
{
  "id": 40348,
  "english": "Cotton Anthracnose \n",
  "indonesian": "Antraknosa kapas"
},
{
  "id": 40349,
  "english": "Coffee Berry blotch\n",
  "indonesian": "Bercak buah kopi"
},
{
  "id": 40350,
  "english": "Coffee cercospora leaf spot\n",
  "indonesian": "Bercak daun cercospora kopi"
},
{
  "id": 40351,
  "english": "Tomato Blossom End Rot disease\n",
  "indonesian": "Penyakit akhir bunga busuk tomat"
},
{
  "id": 40352,
  "english": "Tomato leaf curl virus (ToLCV).\n",
  "indonesian": "Virus keriting daun tomat (ToLCV)"
},
{
  "id": 40353,
  "english": "Tomato Early blight\n",
  "indonesian": "Busuk awal tomat"
},
{
  "id": 40354,
  "english": "Tomato Late blight. \n",
  "indonesian": "Busuk akhir tomat"
},
{
  "id": 40355,
  "english": "White mold \n",
  "indonesian": "Jamur putih"
},
{
  "id": 40356,
  "english": "Fruit rot\r",
  "indonesian": "Busuk buah"
},
{
  "id": 40356,
  "english": "Fruit rot\r",
  "indonesian": "Busuk buah"
},
{
  "id": 40357,
  "english": "Huaych?a",
  "indonesian": "Huaych?a"
},
{
  "id": 40358,
  "english": "Hadi ( Okra ? leaf Barakat )",
  "indonesian": "Hadi (Okra - daun Barakat)"
},
{
  "id": 40359,
  "english": "Khandwa?2",
  "indonesian": "Khandwa?2"
},
{
  "id": 40360,
  "english": "Badnawar?1",
  "indonesian": "Badnawar?1"
},
{
  "id": 40361,
  "english": "Luk?ys Ch?oqhepitus",
  "indonesian": "Luk?ys Ch?oqhepitus"
},
{
  "id": 40362,
  "english": "Brs ita/ba",
  "indonesian": "Brs ita/ba"
},
{
  "id": 40363,
  "english": "RS?810",
  "indonesian": "RS?810"
},
{
  "id": 40364,
  "english": "G-cot ?12",
  "indonesian": "G-cot ?12"
},
{
  "id": 40365,
  "english": "MCU? 5VT",
  "indonesian": "MCU? 5VT"
},
{
  "id": 40366,
  "english": "LK?861",
  "indonesian": "LK?861"
},
{
  "id": 40367,
  "english": "Amasya beyazi",
  "indonesian": "Amasya beyazi"
},
{
  "id": 40368,
  "english": "Antep karasi",
  "indonesian": "Antep karasi"
},
{
  "id": 40369,
  "english": "Erenkoy beyazi",
  "indonesian": "Erenkoy beyazi"
},
{
  "id": 40370,
  "english": "The centers of the spots turn grayish-white and are encircled by a distinct ring (0.2?0.6 inches in diameter) of brown tissue",
  "indonesian": "Pusat-pusat bercak berubah menjadi putih keabu-abuan dan dikelilingi oleh cincin yang jelas (diameter 0,2-0,6 inci) dari jaringan coklat"
},
{
  "id": 40371,
  "english": "Infected stems are often red inside (sometimes pale) and a distinct zig-zag tunnel may be observed ? with maggots or pupae inside.",
  "indonesian": "Batang yang terinfeksi seringkali berwarna merah di dalam (kadang pucat) dan terlihat terowongan zig-zag yang jelas - dengan ulat atau kepompong di dalamnya."
},
{
  "id": 40372,
  "english": "May even cause plant death, especially in younger plants particularly if damage occurs in the plant?s hypocotyl (basal stem) region.",
  "indonesian": "Dapat menyebabkan kematian tanaman, terutama pada tanaman muda terutama jika kerusakan terjadi di wilayah hipokotil (batang basal) tanaman."
},
{
  "id": 40373,
  "english": "Whip like structure of 25 ? 150 cm.Whip covered by translucent silvery membrane enclosing mass of black powdery spores.",
  "indonesian": "Struktur seperti cambuk berukuran 25-150 cm. Cambuk tertutup membran transparan berwarna perak yang melingkupi massa spora berbubuk hitam."
},
{
  "id": 40374,
  "english": "The multi-branching of shoot apex with scaly leaves is known as ?Bunchy Top? or ?Witches? Broom?. The malformed seedlings, remain stunted and die.",
  "indonesian": "Percabangan multi dari puncak tunas dengan daun bersisik dikenal sebagai ?Bunchy Top? atau ?Witches? Broom?. Bibit yang cacat, tetap kerdil dan mati."
},
{
  "id": 40375,
  "english": "RMG-492 IPM-02-3",
  "indonesian": "RMG-492 IPM-02-3"
},
{
  "id": 40376,
  "english": "Smrat IPM-02-3 HUM-16",
  "indonesian": "Smrat IPM-02-3 HUM-16"
},
{
  "id": 40377,
  "english": "Vaibhav AKM-4 PKV-Green Gold AKM-8802",
  "indonesian": "Vaibhav AKM-4 PKV-Green Gold AKM-8802"
},
{
  "id": 40378,
  "english": "KPS1",
  "indonesian": "KPS1"
},
{
  "id": 40379,
  "english": "N22",
  "indonesian": "N22"
},
{
  "id": 40380,
  "english": "N26",
  "indonesian": "N26"
},
{
  "id": 40381,
  "english": "KS20",
  "indonesian": "KS20"
},
{
  "id": 40382,
  "english": "VC637245",
  "indonesian": "VC637245"
},
{
  "id": 40383,
  "english": "VC61753B",
  "indonesian": "VC61753B"
},
{
  "id": 40384,
  "english": "VC6173B",
  "indonesian": "VC6173B"
},
{
  "id": 40385,
  "english": "VC614850",
  "indonesian": "VC614850"
},
{
  "id": 40386,
  "english": "VC6137B",
  "indonesian": "VC6137B"
},
{
  "id": 40387,
  "english": "KAT 00301",
  "indonesian": "KAT 00301"
},
{
  "id": 40388,
  "english": "KAT 00308",
  "indonesian": "KAT 00308"
},
{
  "id": 40389,
  "english": "KAT 00309",
  "indonesian": "KAT 00309"
},
{
  "id": 40390,
  "english": "Orange (Brazil)",
  "indonesian": "Jeruk (Brasil)"
},
{
  "id": 40391,
  "english": "Pêra",
  "indonesian": "Pêra"
},
{
  "id": 40392,
  "english": "Valencia",
  "indonesian": "Valencia"
},
{
  "id": 40393,
  "english": "Hamlin",
  "indonesian": "Hamlin"
},
{
  "id": 40394,
  "english": "Westin",
  "indonesian": "Westin"
},
{
  "id": 40395,
  "english": "Orange (India)",
  "indonesian": "Jeruk (India)"
},
{
  "id": 40396,
  "english": "Khasi",
  "indonesian": "Khasi"
},
{
  "id": 40397,
  "english": "Coorg",
  "indonesian": "Coorg"
},
{
  "id": 40398,
  "english": "Batavian",
  "indonesian": "Batavian"
},
{
  "id": 40399,
  "english": "Jaffa",
  "indonesian": "Jaffa"
},
{
  "id": 40400,
  "english": "Pineapple orange",
  "indonesian": "Jeruk nanas"
},
{
  "id": 40401,
  "english": "Orange (Nepal)",
  "indonesian": "Jeruk (Nepal)"
},
{
  "id": 40402,
  "english": "mandarin orange (suntala)",
  "indonesian": "Jeruk mandarin (suntala)"
},
{
  "id": 40403,
  "english": "Khoku local",
  "indonesian": "Khoku lokal"
},
{
  "id": 40404,
  "english": "sweet orange (junar)",
  "indonesian": "Jeruk manis (junar)"
},
{
  "id": 40405,
  "english": "tangerines",
  "indonesian": "Jeruk keprok"
},
{
  "id": 40406,
  "english": "acid lime (kahati)",
  "indonesian": "Jeruk kahati"
},
{
  "id": 40407,
  "english": "pummelo (bhogate)",
  "indonesian": "Pomelo (bhogate)"
},
{
  "id": 40408,
  "english": "kumquat (muntala)",
  "indonesian": "Kumquat (muntala)"
},
{
  "id": 40409,
  "english": "Abacaxi",
  "indonesian": "Abacaxi"
},
{
  "id": 40410,
  "english": "Cayenne",
  "indonesian": "Cayenne"
},
{
  "id": 40411,
  "english": "Pernambuco",
  "indonesian": "Pernambuco"
},
{
  "id": 40412,
  "english": "Perotera",
  "indonesian": "Perotera"
},
{
  "id": 40413,
  "english": "Pest nematodes are tiny slender unsegmented worms that infest plant roots, reducing root growth and causing root death thus reducing the plant?s ability to absorb water and nutrients.",
  "indonesian": "Nematoda hama adalah cacing kecil ramping tidak bersisik yang menginfeksi akar tanaman, mengurangi pertumbuhan akar dan menyebabkan kematian akar sehingga mengurangi kemampuan tanaman untuk menyerap air dan nutrisi."
},
{
  "id": 40414,
  "english": "Dry pods showing pin head size hole",
  "indonesian": "Polong kering menunjukkan lubang berukuran kepala paku"
},
{
  "id": 40415,
  "english": "Seeds shriveled, striped, and partially eaten",
  "indonesian": "Biji mengering, bergaris, dan sebagian dimakan"
},
{
  "id": 40416,
  "english": "The larvae damage seeds as well as cause flowers, buds, and pods to drop",
  "indonesian": "Larva merusak biji serta menyebabkan bunga, tunas, dan polong gugur"
},
{
  "id": 40417,
  "english": "The caterpillar is greenish-brown in color and fringed with short hairs and spines",
  "indonesian": "Ulat bulu berwarna coklat kehijauan dengan ujung berambut pendek dan duri"
},
{
  "id": 40418,
  "english": "It also enters into the pod and feeds on developing grains",
  "indonesian": "Mereka juga masuk ke dalam polong dan memakan biji yang sedang berkembang"
},
{
  "id": 40419,
  "english": "The adults are medium to large (2.5 cm in length), usually black with large yellow spots and a red band across the abdomen, which sometimes changes into yellow spots",
  "indonesian": "Serangga dewasa berukuran sedang hingga besar (2,5 cm panjangnya), biasanya berwarna hitam dengan bintik-bintik kuning besar dan pita merah melintang di perut, yang kadang-kadang berubah menjadi bintik-bintik kuning"
},
{
  "id": 40420,
  "english": "Adults feed on the flowers, tender pods, and young leaves resulting in fewer pods",
  "indonesian": "Serangga dewasa memakan bunga, polong muda, dan daun muda yang mengakibatkan jumlah polong yang lebih sedikit"
},
{
  "id": 40421,
  "english": "An adult beetle can damage 20-30 flowers in a single day",
  "indonesian": "Seekor kumbang dewasa dapat merusak 20-30 bunga dalam satu hari"
},
{
  "id": 40422,
  "english": "Small soft-bodied insects on the underside of leaves and/or stems of the plant; usually green or yellow in color, but may be pink, brown, red, or black depending on species and host plant",
  "indonesian": "Serangga berbadan lunak kecil di bagian bawah daun dan/atau batang tanaman; biasanya berwarna hijau atau kuning, tetapi dapat berwarna merah muda, coklat, merah, atau hitam tergantung pada spesies dan tanaman inang"
},
{
  "id": 40423,
  "english": "If aphid infestation is heavy, it may cause leaves to yellow and/or distort, necrotic spots on leaves and/or stunted shoots",
  "indonesian": "Jika infestasi kutu daun parah, dapat menyebabkan daun menguning dan/atau merenggang, bercak nekrotik pada daun dan/atau tunas yang terhambat pertumbuhannya"
},
{
  "id": 40424,
  "english": "Aphids secrete a sticky, sugary substance called honeydew which encourages the growth of sooty mold on the plants",
  "indonesian": "Kutu daun mengeluarkan zat lengket manis yang disebut madu embun yang mendorong pertumbuhan jamur jelaga pada tanaman"
},
{
  "id": 40425,
  "english": "Alterneria Blight",
  "indonesian": "Penyakit layu Alternaria"
},
{
  "id": 40426,
  "english": "Sterility Mosaic",
  "indonesian": "Mosaik Sterilitas"
},
{
  "id": 40427,
  "english": "Alterneria Blight/Leaf Spot",
  "indonesian": "Penyakit Layu Alternaria/Bercak Daun"
},
{
  "id": 40428,
  "english": "Phytophthora Stem Blight",
  "indonesian": "Layu Batang Phytophthora"
},
{
  "id": 40429,
  "english": "Cercospora Leaf Spots",
  "indonesian": "Bercak Daun Cercospora"
},
{
  "id": 40430,
  "english": "valencia late",
  "indonesian": "valencia akhir"
},
{
  "id": 40431,
  "english": "washington navel",
  "indonesian": "navel washington"
},
{
  "id": 40432,
  "english": "Pixie orange",
  "indonesian": "jeruk pixie"
},
{
  "id": 40433,
  "english": "Mineola",
  "indonesian": "Mineola"
},
{
  "id": 40434,
  "english": "Crinkling, curling, bronzing, and drying, or ?hopper burn?",
  "indonesian": "Keriput, keriting, perunggu, dan pengeringan, atau 'pembakaran hopper'"
},
{
  "id": 40435,
  "english": "Wood bears superficial irregular dark-grey to black raised patches",
  "indonesian": "Kayu membawa bercak hitam-abu-abu tidak teratur yang menonjol"
},
{
  "id": 40436,
  "english": "Whip-like structure of 25 ? 150 cm. Whip covered by translucent silvery membrane enclosing a mass of black powdery spores.",
  "indonesian": "Struktur seperti cambuk berukuran 25 ? 150 cm. Cambuk tertutup membran transparan perak yang melingkupi massa spora bubuk hitam."
},
{
  "id": 40437,
  "english": "Yellow area extends to veins and midrib forming characteristic ?v? shaped chlorotic spots which later turn black",
  "indonesian": "Daerah kuning meluas ke urat-urat dan nervur utama membentuk bercak klorotik berbentuk 'v' yang kemudian berubah menjadi hitam"
},
{
  "id": 40438,
  "english": "These occur on the upper surface of the leaves in the form of small round blotches with a grey or muddy spot in the centre 6?10 mm in diameter, reminiscent of a peacock?s eye.",
  "indonesian": "Ini terjadi pada permukaan atas daun dalam bentuk bercak bulat kecil dengan bintik abu-abu atau keruh di tengah 6?10 mm diameter, seperti mata merak."
},
{
  "id": 40439,
  "english": "Lesions turn pink, red, purple, or light-brown, depending on the plant?s pigments",
  "indonesian": "Luka berubah menjadi pink, merah, ungu, atau cokelat muda, tergantung pada pigmen tanaman"
},
{
  "id": 40440,
  "english": "Symptoms of mosaic appear on the youngest leaves when infection occurs at 6 ? 8 leaves stage.",
  "indonesian": "Gejala mosaic muncul pada daun muda ketika infeksi terjadi pada tahap 6 ? 8 daun."
},
{
  "id": 40441,
  "english": "Leaves look like they?re dusted with white powder (especially the underside)",
  "indonesian": "Daun terlihat seperti ditaburi bedak putih (terutama bagian bawah)"
},
{
  "id": 40442,
  "english": "Lesions or 'spots' are more numerous on upper leaf surfaces and appear circular to irregular in shape.",
  "indonesian": "Luka atau 'bintik-bintik' lebih banyak terdapat pada permukaan atas daun dan berbentuk bulat hingga tidak beraturan."
},
{
  "id": 40443,
  "english": "55?less than 65 years",
  "indonesian": "55 ? kurang dari 65 tahun"
},
{
  "id": 40444,
  "english": "45?less than 55 years",
  "indonesian": "45 ? kurang dari 55 tahun"
},
{
  "id": 40445,
  "english": "35?less than 45 years",
  "indonesian": "35 ? kurang dari 45 tahun"
},
{
  "id": 40446,
  "english": "Mango (Saudi Arabia)",
  "indonesian": "Mangga (Arab Saudi)"
},
{
  "id": 40447,
  "english": "Alphonso",
  "indonesian": "Alphonso"
},
{
  "id": 40448,
  "english": "Chaunsa",
  "indonesian": "Chaunsa"
},
{
  "id": 40449,
  "english": "Sindhri",
  "indonesian": "Sindhri"
},
{
  "id": 40450,
  "english": "Anwar Ratol",
  "indonesian": "Anwar Ratol"
},
{
  "id": 40451,
  "english": "Keitt",
  "indonesian": "Keitt"
},
{
  "id": 40452,
  "english": "Tommy Atkins",
  "indonesian": "Tommy Atkins"
},
{
  "id": 40453,
  "english": "Pomegranate (Saudi Arabia)",
  "indonesian": "Buah Delima (Arab Saudi)"
},
{
  "id": 40454,
  "english": "Al-Taif",
  "indonesian": "Al-Taif"
},
{
  "id": 40455,
  "english": "Baladi",
  "indonesian": "Baladi"
},
{
  "id": 40456,
  "english": "Al-Yamani",
  "indonesian": "Al-Yamani"
},
{
  "id": 40457,
  "english": "Shami",
  "indonesian": "Shami"
},
{
  "id": 40458,
  "english": "Sour",
  "indonesian": "Asam"
},
{
  "id": 40459,
  "english": "Camel trot (Al-Qassim).",
  "indonesian": "Langkah Unta (Al-Qassim)"
},
{
  "id": 40460,
  "english": "The city",
  "indonesian": "Kota"
},
{
  "id": 40461,
  "english": "Molar",
  "indonesian": "Gigi Molar"
},
{
  "id": 40462,
  "english": "Dejativa",
  "indonesian": "Dejativa"
},
{
  "id": 40463,
  "english": "Al-Afar",
  "indonesian": "Al-Afar"
},
{
  "id": 40464,
  "english": "Al-Mashhad",
  "indonesian": "Al-Mashhad"
},
{
  "id": 40465,
  "english": "Tabuk",
  "indonesian": "Tabuk"
},
{
  "id": 40466,
  "english": "Al-Bahah",
  "indonesian": "Al-Bahah"
},
{
  "id": 40467,
  "english": "Manfaluti (wonderful)",
  "indonesian": "Manfaluti (indah)"
},
{
  "id": 40468,
  "english": "Wheat (Saudi Arabia)",
  "indonesian": "Gandum (Arab Saudi)"
},
{
  "id": 40469,
  "english": "Yecora Rojo",
  "indonesian": "Yecora Rojo"
},
{
  "id": 40470,
  "english": "Sakha 93",
  "indonesian": "Sakha 93"
},
{
  "id": 40471,
  "english": "Abedi",
  "indonesian": "Abedi"
},
{
  "id": 40472,
  "english": "Boyou 87",
  "indonesian": "Boyou 87"
},
{
  "id": 40473,
  "english": "Sahel 1",
  "indonesian": "Sahel 1"
},
{
  "id": 40474,
  "english": "Capello desprez",
  "indonesian": "Capello desprez"
},
{
  "id": 40475,
  "english": "Safa 11",
  "indonesian": "Safa 11"
},
{
  "id": 40476,
  "english": "Heap",
  "indonesian": "Timbunan"
},
{
  "id": 40477,
  "english": "Tray",
  "indonesian": "Nampan"
},
{
  "id": 40478,
  "english": "Basket",
  "indonesian": "Keranjang"
},
{
  "id": 40479,
  "english": "Forastero",
  "indonesian": "Forastero"
},
{
  "id": 40480,
  "english": "Drying trays",
  "indonesian": "Nampan pengeringan"
},
{
  "id": 40481,
  "english": "Elbas (movable dryers)",
  "indonesian": "Elbas (pengering bergerak)"
},
{
  "id": 40482,
  "english": "Drying Tunnels",
  "indonesian": "Tong pengeringan"
},
{
  "id": 40483,
  "english": "Cement",
  "indonesian": "Sememta"
},
{
  "id": 40484,
  "english": "Almonds",
  "indonesian": "Almond"
},
{
  "id": 40488,
  "english": "Dry Cacao",
  "indonesian": "Kakao Kering"
},
{
  "id": 40489,
  "english": "Cacao Data",
  "indonesian": "Data Kakao"
},
{
  "id": 40490,
  "english": "CacaoBuyingStation",
  "indonesian": "Stasiun Pembelian Kakao"
},
{
  "id": 40491,
  "english": "CacaoOfflineFarmerList",
  "indonesian": "Daftar Petani Kakao Offline"
},
{
  "id": 40542,
  "english": "Land Evaluation",
  "indonesian": "Evaluasi Tanah"
},
{
  "id": 40543,
  "english": "Unsuitable",
  "indonesian": "Tidak Sesuai"
},
{
  "id": 40544,
  "english": "Marginally Suitable",
  "indonesian": "Kurang Sesuai"
},
{
  "id": 40545,
  "english": "Moderately Suitable",
  "indonesian": "Cukup Sesuai"
},
{
  "id": 40546,
  "english": "Highly Suitable",
  "indonesian": "Sangat Sesuai"
},
{
  "id": 40547,
  "english": "Slope (%)",
  "indonesian": "Kemiringan (%)"
},
{
  "id": 40548,
  "english": "Soil texture (USDA class)",
  "indonesian": "Tekstur tanah (kelas USDA)"
},
{
  "id": 40549,
  "english": "Land",
  "indonesian": "Tanah"
},
{
  "id": 40550,
  "english": "Artificial surfaces (type)",
  "indonesian": "Permukaan buatan (jenis)"
},
{
  "id": 40551,
  "english": "Proximity to Type 1 and 2 Roads (meters)",
  "indonesian": "Jarak ke Jalan Tipe 1 dan 2 (meter)"
},
{
  "id": 40552,
  "english": "Soil Chemical Properties",
  "indonesian": "Sifat Kimia Tanah"
},
{
  "id": 40553,
  "english": "Soil Physical Properties",
  "indonesian": "Sifat Fisik Tanah"
},
{
  "id": 40554,
  "english": "Coarse fragments (vol%)",
  "indonesian": "Fragmentasi kasar (%)"
},
{
  "id": 40555,
  "english": "Soil organic carbon (%)",
  "indonesian": "Karbon Organik Tanah (%)"
},
{
  "id": 40556,
  "english": "Soil pH",
  "indonesian": "pH Tanah"
},
{
  "id": 40557,
  "english": "Soil salinity (ECe))",
  "indonesian": "Salinitas Tanah (ECe)"
},
{
  "id": 40558,
  "english": "Overall Score for Land Suitability",
  "indonesian": "Skor Kesesuaian Tanah Secara Keseluruhan"
},
{
  "id": 40559,
  "english": "Mean annual temperature (°C)",
  "indonesian": "Suhu Rata-rata Tahunan (°C)"
},
{
  "id": 40560,
  "english": "Weather",
  "indonesian": "Cuaca"
},
{
  "id": 40561,
  "english": "Mean minimum temperature of coldest month (°C)",
  "indonesian": "Suhu Minimum Rata-rata Bulan Terdingin (°C)"
},
{
  "id": 40562,
  "english": "Mean annual precipitation (mm)",
  "indonesian": "Curah Hujan Rata-rata Tahunan (mm)"
},
{
  "id": 40563,
  "english": "Weather Report",
  "indonesian": "Laporan Cuaca"
},
{
  "id": 40564,
  "english": "More than 4000",
  "indonesian": "Lebih dari 4000"
},
{
  "id": 40565,
  "english": "Between 2000-4000",
  "indonesian": "Antara 2000-4000"
},
{
  "id": 40566,
  "english": "Between 1000-2000",
  "indonesian": "Antara 1000-2000"
},
{
  "id": 40567,
  "english": "Between 10-1000",
  "indonesian": "Antara 10-1000"
},
{
  "id": 40568,
  "english": "More than 47",
  "indonesian": "Lebih dari 47"
},
{
  "id": 40569,
  "english": "Between 37-47",
  "indonesian": "Antara 37-47"
},
{
  "id": 40570,
  "english": "Between 10-37",
  "indonesian": "Antara 10-37"
},
{
  "id": 40571,
  "english": "Between 0-10",
  "indonesian": "Antara 0-10"
},
{
  "id": 40572,
  "english": "Any one of 1,10,12",
  "indonesian": "Salah satu dari 1,10,12"
},
{
  "id": 40573,
  "english": "8 or 9",
  "indonesian": "8 atau 9"
},
{
  "id": 40574,
  "english": "Any one of 2,3,4,5,6,7",
  "indonesian": "Salah satu dari 2,3,4,5,6,7"
},
{
  "id": 40575,
  "english": "More than 55",
  "indonesian": "Lebih dari 55"
},
{
  "id": 40576,
  "english": "Between 35-55",
  "indonesian": "Antara 35-55"
},
{
  "id": 40577,
  "english": "Between 15-35",
  "indonesian": "Antara 15-35"
},
{
  "id": 40578,
  "english": "Between 0-15",
  "indonesian": "Antara 0-15"
},
{
  "id": 40579,
  "english": "Less than 0.6",
  "indonesian": "Kurang dari 0.6"
},
{
  "id": 40580,
  "english": "Between 0.8 - 1.5",
  "indonesian": "Antara 0.8 - 1.5"
},
{
  "id": 40581,
  "english": "More than 1.5",
  "indonesian": "Lebih dari 1.5"
},
{
  "id": 40582,
  "english": "Less than 4 or More than 8.5",
  "indonesian": "Kurang dari 4 atau Lebih dari 8.5"
},
{
  "id": 40583,
  "english": "Between 4-5 or Between 7.5-8.5",
  "indonesian": "Antara 4-5 atau Antara 7.5-8.5"
},
{
  "id": 40584,
  "english": "Between 5-5.5 or Between 6.5-7.5",
  "indonesian": "Antara 5-5.5 atau Antara 6.5-7.5"
},
{
  "id": 40585,
  "english": "Between 5.5-6.5",
  "indonesian": "Antara 5.5-6.5"
},
{
  "id": 40586,
  "english": "More than 5",
  "indonesian": "Lebih dari 5"
},
{
  "id": 40587,
  "english": "Between 4-5",
  "indonesian": "Antara 4-5"
},
{
  "id": 40588,
  "english": "Between 3-4",
  "indonesian": "Antara 3-4"
},
{
  "id": 40589,
  "english": "Between 0-3",
  "indonesian": "Antara 0-3"
},
{
  "id": 40590,
  "english": "AREA-TOO-LARGE",
  "indonesian": "AREA-TOO-LARGE"
},
{
  "id": 40591,
  "english": "REPORT UNAVAILABLE FOR CIRCULAR GEOFENCE",
  "indonesian": "LAPORAN TIDAK TERSEDIA UNTUK GEOGARIS LINGKAR"
},
{
  "id": 40592,
  "english": "Any one of 1, 10, 11",
  "indonesian": "Salah satu dari 1, 10, 11"
},
{
  "id": 40593,
  "english": "Any one of 6, 7, 9",
  "indonesian": "Salah satu dari 6, 7, 9"
},
{
  "id": 40594,
  "english": "Any one of 2,3,4,5",
  "indonesian": "Salah satu dari 2,3,4,5"
},
{
  "id": 40595,
  "english": "More than 30",
  "indonesian": "Lebih dari 30"
},
{
  "id": 40596,
  "english": "Between 16-30",
  "indonesian": "Antara 16-30"
},
{
  "id": 40597,
  "english": "Between 8-16",
  "indonesian": "Antara 8-16"
},
{
  "id": 40598,
  "english": "Between 0-8",
  "indonesian": "Antara 0-8"
},
{
  "id": 40599,
  "english": "Any one of 4,5,6,7,8,9,10,11,12",
  "indonesian": "Salah satu dari 4,5,6,7,8,9,10,11,12"
},
{
  "id": 40600,
  "english": "2 or 3",
  "indonesian": "2 atau 3"
},
{
  "id": 40601,
  "english": "Less than 0.8",
  "indonesian": "Kurang dari 0.8"
},
{
  "id": 40602,
  "english": "Between 0.8-1.2",
  "indonesian": "Antara 0.8-1.2"
},
{
  "id": 40603,
  "english": "More than 1.2",
  "indonesian": "Lebih dari 1.2"
},
{
  "id": 40604,
  "english": "Less than 4.3 or More than 8.3",
  "indonesian": "Kurang dari 4.3 atau Lebih dari 8.3"
},
{
  "id": 40605,
  "english": "Between 4.3-4.5 or Between 7.5-8.3",
  "indonesian": "Antara 4.3-4.5 atau Antara 7.5-8.3"
},
{
  "id": 40606,
  "english": "Between 4.5-5 or Between 6.5-7.5",
  "indonesian": "Antara 4.5-5 atau Antara 6.5-7.5"
},
{
  "id": 40607,
  "english": "Between 5-6.5",
  "indonesian": "Antara 5-6.5"
},
{
  "id": 40608,
  "english": "Grassland",
  "indonesian": "Padang Rumput"
},
{
  "id": 40609,
  "english": "Artificial surfaces",
  "indonesian": "Permukaan Buatan"
},
{
  "id": 40610,
  "english": "Tree covered areas",
  "indonesian": "Kawasan Ditutupi Pohon"
},
{
  "id": 40611,
  "english": "Shrubs covered areas",
  "indonesian": "Kawasan Ditutupi Semak"
},
{
  "id": 40612,
  "english": "Herbaceous vegetation, aquatic or regularly flooded",
  "indonesian": "Vegetasi Herbaceous, Akuatik, atau Sering Banjir"
},
{
  "id": 40613,
  "english": "Bare soil / sparse vegetation",
  "indonesian": "Tanah Gersang / Vegetasi Jarang"
},
{
  "id": 40614,
  "english": "Mangroves",
  "indonesian": "Hutan Bakau"
},
{
  "id": 40615,
  "english": "Snow and glaciers",
  "indonesian": "Salju dan Gletser"
},
{
  "id": 40616,
  "english": "Water bodies",
  "indonesian": "Badan Air"
},
{
  "id": 40617,
  "english": "Moss and lichen",
  "indonesian": " Lumut dan Liken"
},
{
  "id": 40618,
  "english": "Clay",
  "indonesian": "Lempung"
},
{
  "id": 40619,
  "english": "Silty clay",
  "indonesian": "Lempung Berliat"
},
{
  "id": 40620,
  "english": "Sandy clay",
  "indonesian": "Lempung Berpasir"
},
{
  "id": 40621,
  "english": "Clay loam",
  "indonesian": "Tanah Lempung Berliat"
},
{
  "id": 40622,
  "english": "Silty clay loam",
  "indonesian": "Tanah Lempung Berliat Berpasir"
},
{
  "id": 40623,
  "english": "Sandy clay loam",
  "indonesian": "Tanah Lempung Berpasir"
},
{
  "id": 40624,
  "english": "Loam",
  "indonesian": "Tanah Liat"
},
{
  "id": 40625,
  "english": "Silty loam",
  "indonesian": "Tanah Liat Berliat"
},
{
  "id": 40626,
  "english": "Sandy loam",
  "indonesian": "Tanah Liat Berpasir"
},
{
  "id": 40627,
  "english": "Silt",
  "indonesian": "Liat"
},
{
  "id": 40628,
  "english": "Loamy sand",
  "indonesian": "Pasir Berliat"
},
{
  "id": 40629,
  "english": "Sand",
  "indonesian": "Pasir"
},
{
  "id": 40630,
  "english": "Less than 10 or More than 45",
  "indonesian": "Kurang dari 10 atau Lebih dari 45"
},
{
  "id": 40631,
  "english": "Between 30-45 or Between 10-15",
  "indonesian": "Antara 30-45 atau Antara 10-15"
},
{
  "id": 40632,
  "english": "Between 15-18 or Between 26-30",
  "indonesian": "Antara 15-18 atau Antara 26-30"
},
{
  "id": 40633,
  "english": "Between 18-26",
  "indonesian": "Antara 18-26"
},
{
  "id": 40634,
  "english": "Less than 8",
  "indonesian": "Kurang dari 8"
},
{
  "id": 40635,
  "english": "Between 8-13",
  "indonesian": "Antara 8-13"
},
{
  "id": 40636,
  "english": "Between 13-16",
  "indonesian": "Antara 13-16"
},
{
  "id": 40637,
  "english": "More than 16",
  "indonesian": "Lebih dari 16"
},
{
  "id": 40638,
  "english": "Less than 750 or More than 2500",
  "indonesian": "Kurang dari 750 atau Lebih dari 2500"
},
{
  "id": 40639,
  "english": "Between 750-1000 or Between 2000-2500",
  "indonesian": "Antara 750-1000 atau Antara 2000-2500"
},
{
  "id": 40640,
  "english": "Between 1800-2000 or Between 1000-1200",
  "indonesian": "Antara 1800-2000 atau Antara 1000-1200"
},
{
  "id": 40641,
  "english": "Between 1200-1800",
  "indonesian": "Antara 1200-1800"
},
{
  "id": 40642,
  "english": "Area too Large. Maximum area limit is 1000 hectares",
  "indonesian": "Area terlalu besar. Batas maksimum area adalah 1000 hektar"
},

{
  "id": 38420,
  "english": "Calcium ammonium nitrate(20-0-0)",
  "indonesian": "Kalsium amonium nitrat (20-0-0)"
},
{
  "id": 38736,
  "english": "SIPAN",
  "indonesian": "SIPAN"
},
{
  "id": 38737,
  "english": "PROMPEX2000",
  "indonesian": "PROMPEX2000"
},
{
  "id": 38738,
  "english": "La Negra",
  "indonesian": "La Negra"
},
{
  "id": 38739,
  "english": "La Pacarana",
  "indonesian": "La Pacarana"
},
{
  "id": 39332,
  "english": "Red lady",
  "indonesian": "Red lady"
},
{
  "id": 39333,
  "english": "Red bella",
  "indonesian": "Red bella"
},
{
  "id": 39335,
  "english": "Spunta",
  "indonesian": "Spunta"
},
{
  "id": 39336,
  "english": "Ajax",
  "indonesian": "Ajax"
},
{
  "id": 39337,
  "english": "Mirka",
  "indonesian": "Mirka"
},
{
  "id": 39338,
  "english": "Diamont",
  "indonesian": "Diamont"
},
{
  "id": 39339,
  "english": "Espunta",
  "indonesian": "Espunta"
},
{
  "id": 39340,
  "english": "Citrix",
  "indonesian": "Citrix"
},
{
  "id": 39341,
  "english": "Frizia",
  "indonesian": "Frizia"
},
{
  "id": 39342,
  "english": "Kawalic",
  "indonesian": "Kawalic"
},
{
  "id": 39343,
  "english": "Aboulx",
  "indonesian": "Aboulx"
},
{
  "id": 39344,
  "english": "Mondial",
  "indonesian": "Mondial"
},
{
  "id": 39345,
  "english": "Safaren",
  "indonesian": "Safaren"
},
{
  "id": 39346,
  "english": "Edward",
  "indonesian": "Edward"
},
{
  "id": 39347,
  "english": "Etfadoal",
  "indonesian": "Etfadoal"
},
{
  "id": 39349,
  "english": "Ajwa",
  "indonesian": "Ajwa"
},
{
  "id": 39350,
  "english": "Safawi",
  "indonesian": "Safawi"
},
{
  "id": 39351,
  "english": "Khalas",
  "indonesian": "Khalas"
},
{
  "id": 39352,
  "english": "Sukkari",
  "indonesian": "Sukkari"
},
{
  "id": 39353,
  "english": "Khadrawy",
  "indonesian": "Khadrawy"
},
{
  "id": 39355,
  "english": "Arbosona",
  "indonesian": "Arbosona"
},
{
  "id": 39356,
  "english": "Arbequina",
  "indonesian": "Arbequina"
},
{
  "id": 39357,
  "english": "Picual",
  "indonesian": "Picual"
},
{
  "id": 39358,
  "english": "Koroneiki",
  "indonesian": "Koroneiki"
},
{
  "id": 39359,
  "english": "Kaissy H-85",
  "indonesian": "Kaissy H-85"
},
{
  "id": 39360,
  "english": "Picual H-78",
  "indonesian": "Picual H-78"
},
{
  "id": 39361,
  "english": "Sorani",
  "indonesian": "Sorani"
},
{
  "id": 39362,
  "english": "K-18",
  "indonesian": "K-18"
},
{
  "id": 39691,
  "english": "Cauliflower butterfly",
  "indonesian": "Kupu-kupu kembang kol"
},
{
  "id": 39692,
  "english": "Gram Pod Borer/ Capsule Borer",
  "indonesian": "Penggerek Polong Gram / Penggerek Kapsul"
},
{
  "id": 39693,
  "english": "Caterpillar",
  "indonesian": "Ulat"
},
{
  "id": 39694,
  "english": "Bud Fly/Capsule Fly",
  "indonesian": "Lalat Kuncup / Lalat Kapsul"
},
{
  "id": 39695,
  "english": "American Boll Worm",
  "indonesian": "Ulat Penggerek Amerika"
},
{
  "id": 39696,
  "english": "Spotted Boll Worm",
  "indonesian": "Ulat Penggerek Bercak"
},
{
  "id": 39697,
  "english": "Pink Boll Worm",
  "indonesian": "Ulat Penggerek Merah Muda"
},
{
  "id": 39698,
  "english": "Jassid",
  "indonesian": "Jassid"
},
{
  "id": 39699,
  "english": "Stinkbugs",
  "indonesian": "Kepik bau"
},
{
  "id": 39700,
  "english": "Leaf eating caterpillar",
  "indonesian": "Ulat pemakan daun"
},
{
  "id": 39701,
  "english": "Serpentine Leaf Miner",
  "indonesian": "Penambang Daun Serpentine"
},
{
  "id": 39702,
  "english": "Pinworm",
  "indonesian": "Cacing kremi"
},
{
  "id": 39703,
  "english": "Top Shoot Borer",
  "indonesian": "Penggerek Tunas Atas"
},
{
  "id": 39704,
  "english": "Leaf Gall Thrips",
  "indonesian": "Thrips Empulur Daun"
},
{
  "id": 39705,
  "english": "Leaf Miner Flies",
  "indonesian": "Lalat Penambang Daun"
},
{
  "id": 39706,
  "english": "Shoot and Capsule Bore",
  "indonesian": "Penggerek Tunas dan Kapsul"
},
{
  "id": 39707,
  "english": "Green Mite",
  "indonesian": "Tungau Hijau"
},
{
  "id": 39708,
  "english": "Variegated Cricket",
  "indonesian": "Jangkrik Variegata"
},
{
  "id": 39709,
  "english": "Shoot Bug",
  "indonesian": "Kutu Tunas"
},
{
  "id": 39710,
  "english": "Shootfly",
  "indonesian": "Lalat Tunas"
}


];
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (const row of langaugeObjects) {
        let sql =
          "SELECT * FROM global_translation_metadata WHERE id = :id";
        const global_trans = await queryInterface.sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT,
          replacements: { id: row.id },
        });
        // update case
        if (global_trans && global_trans.length > 0) {
          let item = {};
          for (let key in row) {
            const language = key.toLocaleLowerCase().trim();
            item[language] = row[key];
          }
          await queryInterface.bulkUpdate("global_translation_metadata", item, {
            id: global_trans?.map(item => item.id)
          });
        }
        // insert case
        else {
          let item = {};
          for (let key in row) {
            const language = key.toLocaleLowerCase().trim();
            item[language] = row[key];
          }
          await queryInterface.insert(null, "global_translation_metadata", item);
        }
      }
    } catch (err) {
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    for (const obj of langaugeObjects) {
      await queryInterface.bulkDelete(
        "global_translation_metadata",
        { english: langaugeObjects[obj].english },
        {},
        {}
      );
    }
  },
};