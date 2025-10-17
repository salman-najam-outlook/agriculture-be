'use strict';

const translations = [
  {
    english: "Uganda",
    french: "Ouganda"
  },
  {
    english: "Bone Meal",
    french: "Farine d'os"
  },
  {
    english: "SynthenticFertilizerNitrogenUnit",
    french: "SynthenticEngraisAzoteUnité"
  },
  {
    english: "SynthenticFertilizerPhosphorousUnit",
    french: "SynthétiqueEngraisPhosphoreUnité"
  },
  {
    english: "SynthenticFertilizerPotassiumUnit",
    french: "SynthétiqueEngraisPotassiumUnité"
  },
  {
    english: "CoffeeParchmentDensityUnit",
    french: "CaféParcheminDensitéUnité"
  },
  {
    english: "Density",
    french: "Densité"
  },
  {
    english: "Cattura Cultivars (mutasi Bourbon; originated in Brazil)",
    french: "Cultivars Cattura (mutasi Bourbon; originaire du Brésil)"
  },
  {
    english: "Acaia",
    french: "Acaia"
  },
  {
    english: "Agata",
    french: "Agata"
  },
  {
    english: "Arabigo",
    french: "Arabigo"
  },
  {
    english: "Arusha",
    french: "Arusha"
  },
  {
    english: "Batian",
    french: "Batian"
  },
  {
    english: "Bernardina",
    french: "Bernardin"
  },
  {
    english: "Blawan Paumah",
    french: "Blawan Paumah"
  },
  {
    english: "Blue Mountain",
    french: "Montagne bleue"
  },
  {
    english: "Bonifieur",
    french: "Bonifieur"
  },
  {
    english: "Caturra",
    french: "Caturra"
  },
  {
    english: "Cauvery",
    french: "Impatience"
  },
  {
    english: "Cera",
    french: "Cera"
  },
  {
    english: "Chandragiri",
    french: "Chandragiri"
  },
  {
    english: "Coorgs",
    french: "Coorgs"
  },
  {
    english: "Emerald",
    french: "émeraude"
  },
  {
    english: "French Mission",
    french: "Mission française"
  },
  {
    english: "Gesha",
    french: "Descendez"
  },
  {
    english: "Guatemala",
    french: "Guatemala"
  },
  {
    english: "Harrar",
    french: "Harrar"
  },
  {
    english: "Harrar",
    french: "Harrar"
  },
  {
    english: "Jackson",
    french: "Jackson"
  },
  {
    english: "Jackson 2/1257",
    french: "Jackson 2/1257"
  },
  {
    english: "K7",
    french: "Code"
  },
  {
    english: "Kent",
    french: "Kent"
  },
  {
    english: "Kona",
    french: "Alors"
  },
  {
    english: "Laurina",
    french: "Laurina"
  },
  {
    english: "Lekempti",
    french: "Lecker"
  },
  {
    english: "Maracaturra",
    french: "Maracrarra"
  },
  {
    english: "Maragogipe",
    french: "Maragogipe"
  },
  {
    english: "maragogype",
    french: "maragogype"
  },
  {
    english: "Mayaguez",
    french: "Mayaguez"
  },
  {
    english: "Mibirizi",
    french: "Mibirizi"
  },
  {
    english: "Mocha/Mokka",
    french: "Mokcha/mokka"
  },
  {
    english: "Mundo Novo",
    french: "Nouveau monde"
  },
  {
    english: "Old Chiks",
    french: "Vieilles poussins"
  },
  {
    english: "Onix",
    french: "Onyx"
  },
  {
    english: "Orange Bourbon",
    french: "Bourbon orange"
  },
  {
    english: "Pacamara",
    french: "Pakamra"
  },
  {
    english: "Pacas",
    french: "Pacas"
  },
  {
    english: "Pache",
    french: "Paquet"
  },
  {
    english: "Pache Colis",
    french: "Pache Colis"
  },
  {
    english: "Pache Comum",
    french: "Pache commune"
  },
  {
    english: "Pink Bourbon",
    french: "Bourbon rose"
  },
  {
    english: "Red Bourbon",
    french: "Bourbon rouge"
  },
  {
    english: "Rosa Morena",
    french: "Rosa Morena"
  },
  {
    english: "Rubi",
    french: "Rubi"
  },
  {
    english: "Ruiru 11",
    french: "Ruiru 11"
  },
  {
    english: "Safira",
    french: "Saphir"
  },
  {
    english: "Sagada",
    french: "Sagada"
  },
  {
    english: "San Bernardo Aka Pache",
    french: "San Bernardo alias Pache"
  },
  {
    english: "San Ramon",
    french: "3 Ramon"
  },
  {
    english: "Santos",
    french: "Santos"
  },
  {
    english: "Selection 9",
    french: "Sélection 9"
  },
  {
    english: "Sidamo",
    french: "Sidamo"
  },
  {
    english: "Sl28",
    french: "SL28"
  },
  {
    english: "Sl34",
    french: "4 produits"
  },
  {
    english: "Sulawesi",
    french: "Acquitter"
  },
  {
    english: "Sumatra",
    french: "Sumatra"
  },
  {
    english: "Tekisic",
    french: "Tekisique"
  },
  {
    english: "Topazio",
    french: "Topaze"
  },
  {
    english: "Toraja",
    french: "Toraja"
  },
  {
    english: "Turmalina",
    french: "Tourmaline"
  },
  {
    english: "Turquesa",
    french: "Turquoise"
  },
  {
    english: "Typica",
    french: "Typique"
  },
  {
    english: "Venecia",
    french: "Venise"
  },
  {
    english: "Villa Sarchi",
    french: "Villa Sarchi"
  },
  {
    english: "Yellow Bourbon",
    french: "Bourbon jaune"
  },
  {
    english: "Erecta.",
    french: "Érigé."
  },
  {
    english: "Icatu",
    french: "Icatu"
  },
  {
    english: "Nemaya",
    french: "Idiot"
  },
  {
    english: "Nganda",
    french: "Nganda"
  },
  {
    english: "Pandi",
    french: "A été déposé"
  },
  {
    english: "Pawi",
    french: "Pawi"
  },
  {
    english: "Rakimin",
    french: "Brandy"
  },
  {
    english: "TR4",
    french: "Tr4"
  },
  {
    english: "TR5",
    french: "Perturbé"
  },
  {
    english: "TR6",
    french: "Plier"
  },
  {
    english: "TR7",
    french: "Soustraire"
  },
  {
    english: "TR8",
    french: "Tr8"
  },
  {
    english: "SA237",
    french: "Essuyer"
  },
  {
    english: "Wayanaad",
    french: "Mélanger"
  },
  {
    english: "Exelsa",
    french: "Évoluer"
  },
  {
    english: "Liberica",
    french: "Liberrica"
  },
  {
    english: "Arabusta",
    french: "Arabusta"
  },
  {
    english: "Arla",
    french: "Arla"
  },
  {
    english: "Batian",
    french: "Aux États-Unis"
  },
  {
    english: "Bogor Prada",
    french: "Bogor Prada"
  },
  {
    english: "Casiopea",
    french: "Casiopée"
  },
  {
    english: "Castillo",
    french: "Castillo"
  },
  {
    english: "Castillo El Rosario",
    french: "Château d'El Rosario"
  },
  {
    english: "Castillo El Tambo",
    french: "Château d'El Tambo"
  },
  {
    english: "Castillo La Trinidad",
    french: "La Trinidad Castillo"
  },
  {
    english: "Castillo Naranjal",
    french: "Château de Naranjal"
  },
  {
    english: "Castillo Paraguaicito",
    french: "Château de paraguite"
  },
  {
    english: "Castillo Santa Barbara",
    french: "Château de Santa Barbara"
  },
  {
    english: "Catigua",
    french: "Catiguua"
  },
  {
    english: "Catimor,",
    french: "Catimor,"
  },
  {
    english: "Catrenic",
    french: "Réglé"
  },
  {
    english: "Centroamericano",
    french: "Amérique centrale"
  },
  {
    english: "Colombia",
    french: "Colombie"
  },
  {
    english: "Devamachy",
    french: "Devamachi"
  },
  {
    english: "Evaluna",
    french: "Évaluation"
  },
  {
    english: "Fronton",
    french: "Devant"
  },
  {
    english: "Java",
    french: "Java"
  },
  {
    english: "Limani",
    french: "port"
  },
  {
    english: "Maracatu",
    french: "Maracatu"
  },
  {
    english: "Marsellesa",
    french: "Marseillaise"
  },
  {
    english: "Milenio",
    french: "Millénaire"
  },
  {
    english: "Mundo Maya",
    french: "Maya de Maya"
  },
  {
    english: "Nayarita",
    french: "Nayarita"
  },
  {
    english: "Nemaya",
    french: "Idiot"
  },
  {
    english: "Obata",
    french: "Et maintenez"
  },
  {
    english: "Oro Azteca",
    french: "Or aztec"
  },
  {
    english: "Parainema",
    french: "Parainema"
  },
  {
    english: "Paraiso",
    french: "Paradis"
  },
  {
    english: "Rasuna",
    french: "Rasuna"
  },
  {
    english: "Sarchimor",
    french: "Sarchimor"
  },
  {
    english: "Starmaya",
    french: "Starmaya"
  },
  {
    english: "Tabi",
    french: "Ou"
  },
  {
    english: "Timor",
    french: "Timor"
  },
  {
    english: "Tupi",
    french: "Tupi"
  },
  {
    english: "Variedad Colombia",
    french: "Variété colombie"
  },
  {
    english: "Pacamara",
    french: "Pakamra"
  },
  {
    english: "Typica",
    french: "Typique"
  },
  {
    english: "Liberica",
    french: "Liberrica"
  },
  {
    english: "Robusta",
    french: "Robuste"
  },
  {
    english: "Arabica",
    french: "Arabica"
  },
  {
    english: "Gamal (Gliricidia sepium)",
    french: "Gamal (Gliricidia Sepium)"
  },
  {
    english: "Sengon laut (Albizzia falcata)",
    french: "Sengon Laut (Albizzia Falcata)"
  },
  {
    english: "Lamtoro (Leucaena glauca)",
    french: "Lamtoro (Leucaena glauca)"
  },
  {
    english: "Gamal (Gliricidia sepium)",
    french: "Gamal (Gliricidia Sepium)"
  },
  {
    english: "Alpukat (Persea americana)",
    french: "Avocat (Persea Americana)"
  },
  {
    english: "Pinus (hard pines)",
    french: "Pinus (pins dur)"
  },
  {
    english: "Wind Breaker Tree 1",
    french: "Arbre de brise-vent 1"
  },
  {
    english: "Kayumanis",
    french: "Cannelle"
  },
  {
    english: "Karet",
    french: "Caoutchouc"
  },
  {
    english: "Kelapa",
    french: "Noix de coco"
  },
  {
    english: "Damar",
    french: "Chance"
  },
  {
    english: "Belimbing",
    french: "Fruits des étoiles"
  },
  {
    english: "Gram",
    french: "Gramme"
  },
  {
    english: "Kilogram",
    french: "Kilogramme"
  },
  {
    english: "Pound",
    french: "Livre"
  },
  {
    english: "Centimeter",
    french: "Centimètre"
  },
  {
    english: "Meter",
    french: "Mètre"
  },
  {
    english: "Liter-Per-Hectar",
    french: "Litre par hectar"
  },
  {
    english: "Milliliters per Square Meter",
    french: "Millilitres par mètre carré"
  },
  {
    english: "Kilogram per Acre",
    french: "Kilogramme par acre"
  },
  {
    english: "Kilogram per Hectare",
    french: "Kilogramme par hectare"
  },
  {
    english: "Tonnes per Hectare",
    french: "Tonnes par hectare"
  },
  {
    english: "Bushels per Hectare",
    french: "Boisseaux par hectare"
  },
  {
    english: "Bushels per Acre",
    french: "Boisseaux par acre"
  },
  {
    english: "Bags per Hectare",
    french: "Sacs par hectare"
  },
  {
    english: "Bags per Acre",
    french: "Sacs par acre"
  },
  {
    english: "Tonnes per Acre",
    french: "Tonnes per Acre"
  },
  {
    english: "Kilogram/Tree",
    french: "Kilogramme/Arbre"
  },
  {
    english: "acre",
    french: "acre"
  },
  {
    english: "Hectares",
    french: "Hectares"
  },
  {
    english: "Millimetres",
    french: "Millimètres"
  },
  {
    english: "Centimeter",
    french: "Centimètre"
  },
  {
    english: "Meter",
    french: "Mètre"
  },
  {
    english: "acre",
    french: "acre"
  },
  {
    english: "Hectare",
    french: "Hectare"
  },
  {
    english: "Millileter",
    french: "Nationalité"
  },
  {
    english: "Liter",
    french: "Litre"
  },
  {
    english: "acre",
    french: "acre"
  },
  {
    english: "Hectare",
    french: "Hectare"
  },
  {
    english: "Kg",
    french: "Kg"
  },
  {
    english: "Tonnes",
    french: "Tonnes"
  },
  {
    english: "Kilogram per Acre",
    french: "Kilogramme par acre"
  },
  {
    english: "Kilogram per Hectare",
    french: "Kilogramme par hectare"
  },
  {
    english: "Tonnes per Acre",
    french: "Tonnes per Acre"
  },
  {
    english: "Tonnes per Hectare",
    french: "Tonnes par hectare"
  },
  {
    english: "Litres/hectare",
    french: "Litres/hectare"
  },
  {
    english: "Ounces/hectare",
    french: "Onces/hectare"
  },
  {
    english: "mg/hectare",
    french: "mg/hector"
  },
  {
    english: "g/hectare",
    french: "g/hectare"
  },
  {
    english: "kg/hectare",
    french: "kg/hectare"
  },
  {
    english: "Litres",
    french: "Litres"
  },
  {
    english: "Ounces",
    french: "Onces"
  },
  {
    english: "mg",
    french: "mg"
  },
  {
    english: "Kg",
    french: "Kg"
  },
  {
    english: "g",
    french: "g"
  },
  {
    english: "Gallons/acre",
    french: "Gallons/acre"
  },
  {
    english: "Gallons/hectare",
    french: "Gallons/hectare"
  },
  {
    english: "Liters/hectare",
    french: "Litres/hectare"
  },
  {
    english: "Liters/acre",
    french: "Litres/acres"
  },
  {
    english: "Centimeter",
    french: "Centimètre"
  },
  {
    english: "Meter",
    french: "Mètre"
  },
  {
    english: "kg/ha",
    french: "kg/ha"
  },
  {
    english: "ppm",
    french: "ppm"
  },
  {
    english: "Kg per hectare",
    french: "Kg par hectare"
  },
  {
    english: "Kg per acre",
    french: "Kg par acre"
  },
  {
    english: "Tonne per hectare",
    french: "Tonne par hectare"
  },
  {
    english: "Tonne per acre",
    french: "Tonne per acre"
  },
  {
    english: "Grams",
    french: "Grammes"
  },
  {
    english: "Kilograms",
    french: "Kilogrammes"
  },
  {
    english: "Tonne per acre",
    french: "Tonne per acre"
  },
  {
    english: "Kg per hectare",
    french: "Kg par hectare"
  },
  {
    english: "Kg per acre",
    french: "Kg par acre"
  },
  {
    english: "Tonne per hectare",
    french: "Tonne par hectare"
  },
  {
    english: "Kilograms",
    french: "Kilogrammes"
  },
  {
    english: "Tonne per hectare",
    french: "Tonne par hectare"
  },
  {
    english: "Tonne per acre",
    french: "Tonne per acre"
  },
  {
    english: "Kg per acre",
    french: "Kg par acre"
  },
  {
    english: "Kg per hectare",
    french: "Kg par hectare"
  },
  {
    english: "Kilograms",
    french: "Kilogrammes"
  },
  {
    english: "kg\/ha",
    french: "kg \ha"
  },
  {
    english: "ppm",
    french: "ppm"
  },
  {
    english: "kg\/ml",
    french: "kg \ml"
  },
  {
    english: "g\/ml",
    french: "G \ml"
  },
  {
    english: "kg\/ha",
    french: "kg \ha"
  },
  {
    english: "ppm",
    french: "ppm"
  },
  {
    english: "kg\/ha",
    french: "kg \ha"
  },
  {
    english: "ppm",
    french: "ppm"
  },
  {
    english: "Kilograms",
    french: "Kilogrammes"
  },
  {
    english: "Milligrams (N)\/Liter",
    french: "Milligrammes (n) \litre"
  },
  {
    english: "Kg (N)\/hectare",
    french: "Kg (n) \hectare"
  },
  {
    english: "parts (N)\/million",
    french: "parties (n) \millions"
  },
  {
    english: "Milligrams (P2O5)\/Liter",
    french: "Milligrammes (p2o5) \litre"
  },
  {
    english: "Kg (P2O5)\/hectare",
    french: "Kg (p2o5) \hectare"
  },
  {
    english: "parts (P2O5)\/million",
    french: "parties (P2O5) \Million"
  },
  {
    english: "Milligrams (K20)\/Liter",
    french: "Milligrammes (K20) \litre"
  },
  {
    english: "Kg (K20)\/hectare",
    french: "Kg (k20) \hectare"
  },
  {
    english: "parts (K20)\/million",
    french: "parties (k20) \millions"
  },
  {
    english: "kg per centimetre cube",
    french: "kg pour le cube"
  },
  {
    english: "kg\/cm3",
    french: "kg \cm3"
  },
  {
    english: "gr\/m3",
    french: "Essayez \avec"
  },
  {
    english: "Increasing The Yields",
    french: "Augmenter les rendements"
  },
  {
    english: "Optimize The Use Of Synthetic Fertilizers",
    french: "Optimiser l'utilisation des engrais synthétiques"
  },
  {
    english: "Typica (Bergandal, Sidikalang - Sumatera).",
    french: "Typica (Bergandal, Sidikalang - Sumatra)."
  },
  {
    english: "Hibrido de Timor (HDT, Cross breed Arabica-Robusta; Tim-tim, Aceh)",
    french: "Hibrido de Timor (HDT, Cross Breed Arabica-Robusta; Tim-TIM, ACEH)"
  },
  {
    english: "Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)",
    french: "LINIE S (S-288, S-795, ANDUNGSARI, KOMASTI; ACEH FLORES)"
  },
  {
    english: "Ethiopian lines (Rambung Abyssina, USDA)",
    french: "Lignes éthiopiennes (Rambung Abyssin, USDA)"
  },
  {
    english: "Mundo Nova (Silang Typica-Bourbon, from Brazil)",
    french: "Mundo Nova (Silang typica-Bourbon, du Brésil)"
  },
  {
    english: 'Catimor Lines (Andungsari, Ateng, Jaluk, Kartika\/Catuai\/Katai - mix breed arabica-robusta).',
    french: "Lignées Catimor (Andungsari, Ateng, Jaluk, Kartika\/Catuai\/Katai - mélange de races arabica-robusta)."
  },
  {
    english: "Amarello De Botucatu",
    french: "Botucatu amarello"
  },
  {
    english: "Benguet",
    french: "Benguet"
  },
  {
    english: "Bergendal",
    french: "Bergendal"
  },
  {
    english: "Bergundal Aka Garundang",
    french: "Bergund alias Garundang"
  },
  {
    english: "Bmj",
    french: "BMJ"
  },
  {
    english: "Boubon Mayaguez 71",
    french: "Bourbon Mayaguez 71"
  },
  {
    english: "Bourbon",
    french: "Bourbon"
  },
  {
    english: "Bourbon Chocolá",
    french: "Bourbon Chocolá"
  },
  {
    english: "Bourbon Mayaguez 139",
    french: "Bourbon Mayaguez 139"
  },
  {
    english: "Bourbon Mayaguez 71",
    french: "Bourbon Mayaguez 71"
  },
  {
    english: "catuai",
    french: "menottes"
  },
  {
    english: "Chickumalgur",
    french: "Chickalgur"
  },
  {
    english: "Criollo",
    french: "le créole"
  },
  {
    english: "Culi Arabica",
    french: "Arabe cle"
  },
  {
    english: "Djimma",
    french: "D."
  },
  {
    english: "IAPAR59",
    french: "Moins cher"
  },
  {
    english: "Ibairi",
    french: "Rivière"
  },
  {
    english: "Jember/S795",
    french: "Jember/S795"
  },
  {
    english: "K20",
    french: "K20"
  },
  {
    english: "Kalossi",
    french: "Galos"
  },
  {
    english: "Kp423",
    french: "CAP 423"
  },
  {
    english: "Lintong",
    french: "Lintong"
  },
  {
    english: "Nyasaland",
    french: "Àflains"
  },
  {
    english: "Ouro Bronze",
    french: "Or de bronze"
  },
  {
    english: "Ouro Verde",
    french: "Or vert"
  },
  {
    english: "Pluma Hidalgo",
    french: "Stylo Hidalgo"
  },
  {
    english: "Pop3303/21",
    french: "Poin 03/21"
  },
  {
    english: "semperflorens",
    french: "Semperflorens"
  },
  {
    english: "Sidikalang",
    french: "Sidikalang"
  },
  {
    english: "Sl14",
    french: "SL14"
  },
  {
    english: "Sumatra Lintong",
    french: "Sumatra Lintong"
  },
  {
    english: "Usda762",
    french: "Surprendre"
  },
  {
    english: "Villalobos",
    french: "Villobos"
  },
  {
    english: "Walichu/ Wolisho",
    french: "Eau/publication"
  },
  {
    english: "Yirgacheffe",
    french: "Yirgacheffe"
  },
  {
    english: "Catimor (hybrid of Caturra x Timor)",
    french: "Catimor (hybride de Caturra x Timor)"
  },
  {
    english: "Jawa (Java Coffee, !700AD)",
    french: "Aller (aller café ,!)"
  },
  {
    english: "Arabusta (HDT; Hibrid of sterile CArabica and C.Robusta)",
    french: "Arabusta (HDT; Hibrid de carabica stérile et C.Robusta)"
  },
  {
    english: "Brs 1216",
    french: "BRS 1216"
  },
  {
    english: "Brs 2336",
    french: "BRS 2336"
  },
  {
    english: "Brs 3210",
    french: "BRS 3210"
  },
  {
    english: "Brs 3213",
    french: "BRS 3213"
  },
  {
    english: "Culi Robusta",
    french: "Culs robustes"
  },
  {
    english: "Jasli",
    french: "Berceau"
  },
  {
    english: "Kapeng Alamid",
    french: "Kapeng Alamid"
  },
  {
    english: "Kopi Luwak",
    french: "Café Luwak"
  },
  {
    english: "Selection 1r",
    french: "Sélection 1R"
  },
  {
    english: "Selection 2r",
    french: "Sélection 2R"
  },
  {
    english: "Selection 3r",
    french: "J'ai marché"
  },
  {
    english: "Sln 270",
    french: "SLN 270"
  },
  {
    english: "Sln 274",
    french: "SLN 274"
  },
  {
    english: "BP42",
    french: "Bp42"
  },
  {
    english: "BP234",
    french: "BP234"
  },
  {
    english: "BP288",
    french: "Repos"
  },
  {
    english: "BP358",
    french: "BP358"
  },
  {
    english: "BP409",
    french: "B. 409"
  },
  {
    english: "Kape Barako",
    french: "Café barako"
  },
  {
    english: "Sln288",
    french: "Pas"
  },
  {
    english: "Sln10",
    french: "SLN10"
  },
  {
    english: "Abyssinia 3",
    french: "Abyssinia 3"
  },
  {
    english: "Anacafe 14",
    french: "Anacafe 14"
  },
  {
    english: "Ateng",
    french: "Ateng"
  },
  {
    english: "Castillo Pueblo Bello",
    french: "Castillo Pueblo Bello"
  },
  {
    english: "Catiga Mg2",
    french: "Catiga Mg2"
  },
  {
    english: "Catimor 129",
    french: "Catimor 129"
  },
  {
    english: "Catimor F6.",
    french: "Catimor F6."
  },
  {
    english: "Catucai",
    french: "Ca vomissements"
  },
  {
    english: "Costa Rica 95 Aka Cr-95",
    french: "Costa Rica 95 AKA CR-95"
  },
  {
    english: "Cr (Costa Rica) 95",
    french: "CR (Costa Rica) 95"
  },
  {
    english: "Cuscatleco",
    french: "Cuscatleco"
  },
  {
    english: "Gayo Satu",
    french: "Gayo un"
  },
  {
    english: "Hibrido De Timor",
    french: "Timor"
  },
  {
    english: "Iapar 59",
    french: "IAPAR 59"
  },
  {
    english: "Icafe 95",
    french: "ICAFE 95"
  },
  {
    english: "IHcafe 90",
    french: "Ihcafe 90"
  },
  {
    english: "Ipar 103",
    french: "Nord 103"
  },
  {
    english: "Komasti",
    french: "Visite"
  },
  {
    english: "Lempira",
    french: "Lempira"
  },
  {
    english: "obata rojo",
    french: "Obata Rojo"
  },
  {
    english: "RAB C15",
    french: "Rab C15"
  },
  {
    english: "Rambung",
    french: "Région"
  },
  {
    english: "S.12 Kaffa",
    french: "S.12 Thurty"
  },
  {
    english: "Sigarar Utang",
    french: "Dette sumarar"
  },
  {
    english: "T5175",
    french: "175"
  },
  {
    english: "T5296",
    french: "Remplir"
  },
  {
    english: "T8667",
    french: "Cacher"
  },
  {
    english: "Hybrid",
    french: "Hybride"
  },
  {
    english: "Bourbon",
    french: "Bourbon"
  },
  {
    english: "Dadap (Eurythrina lithosperma)",
    french: "Dadap (Erythrina Lithosperm)"
  },
  {
    english: "Gamal (Glirisidia)",
    french: "Gamal (Glisidia)"
  },
  {
    english: "My Profile",
    french: "Mon profil"
  },
  {
    english: "Holes on leaves/fruits/grain",
    french: "Trous sur les feuilles/fruits/céréales"
  },
  {
    english: "Rolled and curled leaves",
    french: "Feuilles roulées et recourbrées"
  },
  {
    english: "Dead shoots",
    french: "Tirs morts"
  },
  {
    english: "Stunted/poor growth",
    french: "Croissance rabougrie/mauvaise"
  },
  {
    english: "Distorted plants/leaves",
    french: "Plantes/feuilles déformées"
  },
  {
    english: "Plant wilting",
    french: "Welting des plantes"
  },
  {
    english: "Irregular and chewed leaves/stems",
    french: "Feuilles/tiges irrégulières et mâchées"
  },
  {
    english: "Dying of the new leaves",
    french: "Mourir des nouvelles feuilles"
  },
  {
    english: "Presence of larvae",
    french: "Présence de larves"
  },
  {
    english: "Presence of droppings",
    french: "Présence de excréments"
  },
  {
    english: "Weak stems",
    french: "Tiges faibles"
  },
  {
    english: "Presence of webs",
    french: "Présence de toiles"
  },
  {
    english: "Weak roots",
    french: "Racines faibles"
  },
  {
    english: "Shoot and capsule borer",
    french: "Tir et foreur de capsule"
  },
  {
    english: "Aphids",
    french: "Pucerons"
  },
  {
    english: "Shoot Fly",
    french: "Mouche de pousse"
  },
  {
    english: "Nematodes",
    french: "Nématodes"
  },
  {
    english: "Cut worms",
    french: "Coups de vers"
  },
  {
    english: "Thrips",
    french: "Thrips"
  },
  {
    english: "Quinoa Moth",
    french: "Papillon de quinoa"
  },
  {
    english: "Leaf miner files",
    french: "Fichiers de mineurs de feuille"
  },
  {
    english: "Cassava Green Mite (Mononychellus tanajoa)",
    french: "Cassava Green Mite (Mononychellus Tanajo)"
  },
  {
    english: "Cassava mealy bug",
    french: "Cassava Maily Bug"
  },
  {
    english: "Whitefly (Aleurodicus dispersus)",
    french: "Whitefly (Aléurodique)"
  },
  {
    english: "Variegated cricket (Zonocerus variegatus)",
    french: "Cricket varié (Zonocerus variriegatus)"
  },
  {
    english: "Onion Thrips",
    french: "Thrips d'oignon"
  },
  {
    english: "Eriophyid mite",
    french: "Acarien ériophyide"
  },
  {
    english: "Onion Maggot",
    french: "Mouche d'oignon"
  },
  {
    english: "Earwig",
    french: "Percussion d'oreille"
  },
  {
    english: "Tea mites and spider mites",
    french: "Acariens de thé et acariens"
  },
  {
    english: "Tea Cutworms",
    french: "Ver de thé"
  },
  {
    english: "Tea Crickets",
    french: "Grillons de thé"
  },
  {
    english: "Tea mosquito bug",
    french: "Bogue de moustique de thé"
  },
  {
    english: "Borer",
    french: "Foreur"
  },
  {
    english: "Mealybug",
    french: "Coche"
  },
  {
    english: "Corm Weevil",
    french: "Chariot de chagrin"
  },
  {
    english: "Pseudostem weevil",
    french: "Pseudostem Wevil"
  },
  {
    english: "Nematode",
    french: "Nématode"
  },
  {
    english: "Stem Borer",
    french: "Foreur de tige"
  },
  {
    english: "Fall armyworm",
    french: "Vor à l'automne"
  },
  {
    english: "Ear head bug",
    french: "Bug de la tête d'oreille"
  },
  {
    english: "Rice Stem borer",
    french: "Foreur de tige de riz"
  },
  {
    english: "Rice hispa",
    french: "Riz hispa"
  },
  {
    english: "Leaf folder",
    french: "Dossier de feuille"
  },
  {
    english: "Plant hopper",
    french: "Trémie de plantes"
  },
  {
    english: "Bulb Mites",
    french: "Acariens"
  },
  {
    english: "Red Spider Mite",
    french: "Acarien de l'araignée rouge"
  },
  {
    english: "Safflower aphid",
    french: "Puceron de tradin"
  },
  {
    english: "Safflower gram pod borer\/ capsule borer",
    french: "Boreur à gramme de safflower \capsule"
  },
  {
    english: "Safflower caterpillar",
    french: "Caterpillar de cartame"
  },
  {
    english: "safflower bud fly\/capsule fly",
    french: "Bud de marabre mouche \capsule mouche"
  },
  {
    english: "Cotton American boll worm",
    french: "Coton American Boll Worm"
  },
  {
    english: "Cotton Spotted boll worm",
    french: "Ver de boll tacheté de coton"
  },
  {
    english: "Cotton Pink boll worm",
    french: "Ver boll rose en coton"
  },
  {
    english: "Cotton Jassid",
    french: "Coton jassid"
  },
  {
    english: "Tomato Gram pod borer",
    french: "Tomate gram pod foreur"
  },
  {
    english: "Tomato Leaf eating caterpillar",
    french: "Caterpillar mangeant des feuilles de tomate"
  },
  {
    english: "Tomato Whitefly",
    french: "File blanche de la tomate"
  },
  {
    english: "Tomato Serpentine leaf miner.",
    french: "Mineur de feuille serpentine tomate."
  },
  {
    english: "European skipper",
    french: "Skipper européen"
  },
  {
    english: "Cereal rust mite adults",
    french: "Adultes acariens de la rouille céréale"
  },
  {
    english: "Wireworms",
    french: "Vers de fil"
  },
  {
    english: "Grasshopper",
    french: "Sauterelle"
  },
  {
    english: "Bihar hair caterpiller",
    french: "Bihar Hairy Caterpillar"
  },
  {
    english: "Cabbage buterfly",
    french: "Papillon de chou"
  },
  {
    english: "Mustard aphid",
    french: "Puceron de moutarde"
  },
  {
    english: "Mustard sawfly",
    french: "Scie à moutarde"
  },
  {
    english: "Bean Aphids",
    french: "Pucerons de haricots"
  },
  {
    english: "Blister Beetle",
    french: "Coléoptère"
  },
  {
    english: "Blue butterfly",
    french: "Papillon bleu"
  },
  {
    english: "Gram pod borer",
    french: "Foreur de gramme"
  },
  {
    english: "Earhead Bug",
    french: "Bug de la tête d'oreille"
  },
  {
    english: "Ear Head Caterpillar",
    french: "Chenille d'oreille"
  },
  {
    english: "Pink Stem Borer",
    french: "Foreur de tige rose"
  },
  {
    english: "Plant Lice (Aphids)",
    french: "Pouce des pouces (pucerons)"
  },
  {
    english: "Leaf webber or roller and capsule borer",
    french: "Leaf webber ou rouleau et foreur de capsule"
  },
  {
    english: "Gall fly",
    french: "Moule à la volée"
  },
  {
    english: "Sesame leafhopper",
    french: "Sesame Leafhopper"
  },
  {
    english: "Hawk moth",
    french: "Papillon de faucon"
  },
  {
    english: "Earwig: Anisolabis stali",
    french: "Wig: Anisolabis Stali"
  },
  {
    english: "Alfalfa Looper",
    french: "Looper de luzerne"
  },
  {
    english: "Alfalfa Aphid",
    french: "Puceron de luzerne"
  },
  {
    english: "Cutworms",
    french: "Ver de coupé"
  },
  {
    english: "Fruit Rust,Thrips",
    french: "Rouille de fruits, thrips"
  },
  {
    english: "Slugs",
    french: "Limace"
  },
  {
    english: "Gram caterpillar",
    french: "Chenille à gramme"
  },
  {
    english: "Fruit fly",
    french: "Mouche des fruits"
  },
  {
    english: "Leaf Miner",
    french: "Mineur de feuille"
  },
  {
    english: "Citrus psyllid",
    french: "Psylle d'agrumes"
  },
  {
    english: "Scale Insects",
    french: "Insectes à l'échelle"
  },
  {
    english: "Aphids & Mealy Bugs",
    french: "Pucerons et coche"
  },
  {
    english: "Scale Insects:",
    french: "Insectes à l'échelle:"
  },
  {
    english: "Leaf Miner",
    french: "Mineur de feuille"
  },
  {
    english: "Black aphids",
    french: "Pucerons noirs"
  },
  {
    english: "Termites",
    french: "Termites"
  },
  {
    english: "Olive fruit fly",
    french: "Mouche aux fruits d'olive"
  },
  {
    english: "Olive moth",
    french: "Mite à l'olive"
  },
  {
    english: "Black Scale",
    french: "Échelle noire"
  },
  {
    english: "Mealy bugs",
    french: "Bogues farineuses"
  },
  {
    english: "Tea mosquitoe bugs",
    french: "Insectes de moustiques de thé"
  },
  {
    english: "Flatid Plant hoppers",
    french: "Trémies de plante plate"
  },
  {
    english: "Aphids",
    french: "Pucerons"
  },
  {
    english: "Mexican Bean Beetle",
    french: "Scarabée mexicaine"
  },
  {
    english: "Leafminers",
    french: "Liettes"
  },
  {
    english: "Corn Earworm",
    french: "Verrouillage de maïs"
  },
  {
    english: "White Scale",
    french: "Échelle blanche"
  },
  {
    english: "Shield Scale",
    french: "Écran de bouclier"
  },
  {
    english: "Leaf Beetle",
    french: "Scarabée à feuilles"
  },
  {
    english: "Capitulum Borer",
    french: "Chapitre Father"
  },
  {
    english: "Tobacco Caterpillar",
    french: "Chenille de tabac"
  },
  {
    english: "Leaf Hopper",
    french: "Trémie à feuilles"
  },
  {
    english: "Sunflower Beetle",
    french: "Scarabée de tournesol"
  },
  {
    english: "Mealy bug",
    french: "Bogue farineuse"
  },
  {
    english: "Grasshopper",
    french: "Sauterelle"
  },
  {
    english: "Mango Hopper (Idioscopus clypealis)",
    french: "Mango Hopper (Idioscopus Clypealis)"
  },
  {
    english: "Mango Mealy Bug (Drosicha mangiferae)",
    french: "Mango Mealy Bug (Drosicha Mangiferae)"
  },
  {
    english: "Mango Bark Eating Caterpillar (Indarbela quadrinotata)",
    french: "Caterpillar mangeant de l'écorce de mangue (Indarbela quadrinotata)"
  },
  {
    english: "Mango fruit fly: Bactrocera dorsalis",
    french: "Mango Fruit Fly: Bactrocera dorsalis"
  },
  {
    english: "Red Spider Mite",
    french: "Acarien de l'araignée rouge"
  },
  {
    english: "Woolly Aphids",
    french: "Pucerons laineux"
  },
  {
    english: "San Jose Scale",
    french: "Échelle de San Jose"
  },
  {
    english: "Codling Moth",
    french: "Papillon de codling"
  },
  {
    english: "European Red Mite",
    french: "Acarien rouge européen"
  },
  {
    english: "Placement",
    french: "Placement"
  },
  {
    english: "Band placement",
    french: "Placement de bande"
  },
  {
    english: "Foliar application",
    french: "Application foliaire"
  },
  {
    english: "Injection into soil",
    french: "Injection dans le sol"
  },
  {
    english: "Ugandan shilling",
    french: "Vieillissement ougandais"
  },
  {
    english: "Indian rupee",
    french: "Roupie indienne"
  },
  {
    english: "United States dollar",
    french: "dollar américain"
  },
  {
    english: "Indonesian Rupiah",
    french: "Roupie indonésienne"
  },
  {
    english: "Euro",
    french: "euro"
  },
  {
    english: "Singapore Dollar",
    french: "Dollar de Singapour"
  },
  {
    english: "Brazilian Real",
    french: "Brésilien réel"
  },
  {
    english: "Canadian Dollar",
    french: "Dollar canadien"
  },
  {
    english: "CFP Franc",
    french: "CFP Franc"
  },
  {
    english: "French Franc",
    french: "Franc français"
  },
  {
    english: "Italian Lira",
    french: "Lira italien"
  },
  {
    english: "Kuwaiti Dinar",
    french: "Koweïtien Dinar"
  },
  {
    english: "Mexican Peso",
    french: "Poids mexicain"
  },
  {
    english: "Nepalese Rupee",
    french: "Roupie népalaise"
  },
  {
    english: "United Arab Emirates Dirham",
    french: "Émirats arabes unis Dirham"
  },
  {
    english: "honey",
    french: "Miel"
  },
  {
    english: "natural (dry)",
    french: "Natural (sec)"
  },
  {
    english: "wine",
    french: "vin"
  },
  {
    english: "Semi-Washed",
    french: "Semi-lavé"
  },
  {
    english: "Full-Washed",
    french: "Entièrement lavé"
  },
  {
    english: "Parchment Coffee",
    french: "Café parchemin"
  },
  {
    english: "Quality Control",
    french: "Contrôle de qualité"
  },
  {
    english: "Batch Production",
    french: "Production par lots"
  },
  {
    english: "Green Beans",
    french: "Haricots verts"
  },
  {
    english: "Cupping",
    french: "Cuillères"
  },
  {
    english: "Agrifound Light Red",
    french: "Rouge léger rouge"
  },
  {
    english: "Agrifound Red",
    french: "Rouge agricole"
  },
  {
    english: "Agrifound Rose",
    french: "Rose aggravée"
  },
  {
    english: "Agrifound White",
    french: "Blanc agrandisé"
  },
  {
    english: "Arad-H",
    french: "volonté"
  },
  {
    english: "Arka Bindu",
    french: "Arka binda"
  },
  {
    english: "Arka Kalyan",
    french: "Retour kalyan"
  },
  {
    english: "Arka Kihriman",
    french: "Retour Kihriman"
  },
  {
    english: "Arka Kirtinaan",
    french: "Voir Kirtion"
  },
  {
    english: "Arka Lalima",
    french: "La plus haute cécité"
  },
  {
    english: "Arka Niketan",
    french: "Arka Niketan"
  },
  {
    english: "Arka Pitambar",
    french: "Mêlée ouverte"
  },
  {
    english: "Arka Pragathi",
    french: "Progrès de l'arka"
  },
  {
    english: "Arka Sona",
    french: "Arrière"
  },
  {
    english: "Arka Swadista",
    french: "ARKA TIGLIST"
  },
  {
    english: "Arka Ujjwal",
    french: "Les meilleurs veaux"
  },
  {
    english: "Arka Vishwas",
    french: "Extraire la confiance"
  },
  {
    english: "Bangalore rose",
    french: "Bangalore Rose"
  },
  {
    english: "Bhima super red",
    french: "Bhima super rouge"
  },
  {
    english: "Bhima red",
    french: "Bhima rouge"
  },
  {
    english: "Bhima raj dark red",
    french: "Bhima raj rouge foncé"
  },
  {
    english: "Bhima Shakti red",
    french: "Bhima shakti rouge"
  },
  {
    english: "Bhima Kiran light red",
    french: "Bhima kiran rouge clair"
  },
  {
    english: "Bhima light red",
    french: "Bhima rouge clair"
  },
  {
    english: "Bhima shubra white",
    french: "Bhima shubra blanc"
  },
  {
    english: "Bhima shweta white",
    french: "Bhima shweta blanc"
  },
  {
    english: "Bhima Safed",
    french: "Bhima blanc"
  },
  {
    english: "Early Grano",
    french: "Grano précoce"
  },
  {
    english: "Kalyanpur Red Round",
    french: "Kalyanpur rouge rond"
  },
  {
    english: "Nimar local",
    french: "Nimar local"
  },
  {
    english: "Phule Safeed",
    french: "Premier sapid"
  },
  {
    english: "Phule Survana",
    french: "Première survana"
  },
  {
    english: "Phule Samarth",
    french: "Premier capable"
  },
  {
    english: "Phule Swarna",
    french: "Premier or"
  },
  {
    english: "Punjab Selection",
    french: "Sélection du Punjab"
  },
  {
    english: "Pusa Madhavi",
    french: "Pusa Madhavi"
  },
  {
    english: "Pusa Ridhi",
    french: "Pusa Ridhi"
  },
  {
    english: "Spanish brown",
    french: "Brun espagnol"
  },
  {
    english: "Suprex",
    french: "Suprex"
  },
  {
    english: "Talaja Local",
    french: "Le sol est local"
  },
  {
    english: "Bhima",
    french: "Bhima"
  },
  {
    english: "Girna",
    french: "Automne"
  },
  {
    english: "Manjira",
    french: "Chemin"
  },
  {
    english: "NIRA",
    french: "GRAVE"
  },
  {
    english: "Sagarmatyalu",
    french: "Sagarmatyalue"
  },
  {
    english: "Sharda",
    french: "Fusillade"
  },
  {
    english: "Tara",
    french: "Tara"
  },
  {
    english: "banana fruit",
    french: "fruit de la banane"
  },
  {
    english: "Farsem",
    french: "Il a dessiné"
  },
  {
    english: "Amazonas Embrapa",
    french: "Amazonas Embrapa"
  },
  {
    english: "Fibra",
    french: "Fibre"
  },
  {
    english: "Espeto",
    french: "Cracher"
  },
  {
    english: "Mandim branca",
    french: "Mandim blanc"
  },
  {
    english: "Platina",
    french: "Platine"
  },
  {
    english: "Sonara",
    french: "Son"
  },
  {
    english: "Jarina",
    french: "Startina"
  },
  {
    english: "Arari",
    french: "Arari"
  },
  {
    english: "Cacau",
    french: "Cacao"
  },
  {
    english: "Taquari",
    french: "Taquari"
  },
  {
    english: "Liyaye",
    french: "C'est"
  },
  {
    english: "Vitamin A cassava",
    french: "Vitamine A Cassava"
  },
  {
    english: "Malyoha",
    french: "Son argent"
  },
  {
    english: "Sawa sawa",
    french: "Ombre"
  },
  {
    english: "Mapendo",
    french: "Amour"
  },
  {
    english: "Game changer",
    french: "Changeur de jeu"
  },
  {
    english: "Hope",
    french: "Espoir"
  },
  {
    english: "Poundable",
    french: "Coupable"
  },
  {
    english: "Farmer's pride",
    french: "Pride de l'agriculteur"
  },
  {
    english: "Dixon",
    french: "Dixon"
  },
  {
    english: "Ayaya",
    french: "Ils vont"
  },
  {
    english: "Sunshine",
    french: "Soleil"
  },
  {
    english: "Fineface",
    french: "Fine"
  },
  {
    english: "Kirimumpale",
    french: "À la lettre"
  },
  {
    english: "Magana",
    french: "Parlant"
  },
  {
    english: "Abiriya",
    french: "Ex"
  },
  {
    english: "Sanje",
    french: "Rêve"
  },
  {
    english: "Njule",
    french: "Se trépier"
  },
  {
    english: "Bao, Alodo-alodo",
    french: "Bao, allo-alodo"
  },
  {
    english: "Bukalasa",
    french: "Bukalasa"
  },
  {
    english: "Fumba chai",
    french: "Faire du thé"
  },
  {
    english: "AKENA",
    french: "Helke"
  },
  {
    english: "Royal quinoa",
    french: "Quinoa royal"
  },
  {
    english: "Blanca de Junin",
    french: "Blanca de Junin"
  },
  {
    english: "Amarilla Marangani",
    french: "Yellilla Maringani"
  },
  {
    english: "Blanca de Juli",
    french: "Le blanc de Juli"
  },
  {
    english: "Kankolla",
    french: "Kangelle"
  },
  {
    english: "Hulhuas",
    french: "Hulhuas"
  },
  {
    english: "Huacariz",
    french: "Huacariz"
  },
  {
    english: "Cheweca",
    french: "Mâchoire"
  },
  {
    english: "Egyptian Pink",
    french: "Rose égyptien"
  },
  {
    english: "Elephant",
    french: "Éléphant"
  },
  {
    english: "Tuscan",
    french: "Toscan"
  },
  {
    english: "Endory",
    french: "Endos"
  },
  {
    english: "Raghiani",
    french: "Riffans"
  },
  {
    english: "Rashli",
    french: "Rash"
  },
  {
    english: "Jaminiya",
    french: "Zèle"
  },
  {
    english: "Sebha",
    french: "Sabeba"
  },
  {
    english: "Barka",
    french: "Bonjour"
  },
  {
    english: "Zerda",
    french: "Zerda"
  },
  {
    english: "Fezzan",
    french: "Micro-organisme"
  },
  {
    english: "Mexicali",
    french: "Mexicali"
  },
  {
    english: "Masuli",
    french: "Masulu"
  },
  {
    english: "Khumal 4",
    french: "Khumal 4"
  },
  {
    english: "Ram",
    french: "RAM"
  },
  {
    english: "Khumal 8",
    french: "Khulal 8"
  },
  {
    english: "Janaki",
    french: "Janaki"
  },
  {
    english: "Judi",
    french: "Judi"
  },
  {
    english: "Supersweet",
    french: "Super doux"
  },
  {
    english: "Deccan Hybrid",
    french: "Deccan Hybrid"
  },
  {
    english: "Ganga safed",
    french: "Gange blanc"
  },
  {
    english: "Hi-starch",
    french: "Salut"
  },
  {
    english: "Paras",
    french: "Paras"
  },
  {
    english: "White star",
    french: "Étoile blanche"
  },
  {
    english: "Western Queen",
    french: "Reine occidentale"
  },
  {
    english: "Up- to-Date",
    french: "À jour"
  },
  {
    english: "Pentland Dell",
    french: "Pentland Dell"
  },
  {
    english: "Pimpernel",
    french: "Mouron"
  },
  {
    english: "Majestic",
    french: "Majestueux"
  },
  {
    english: "Baraka",
    french: "Baraka"
  },
  {
    english: "Challenger",
    french: "Challenger"
  },
  {
    english: "Courage",
    french: "Courage"
  },
  {
    english: "Victoria",
    french: "Victoria"
  },
  {
    english: "Innovator",
    french: "Innovateur"
  },
  {
    english: "Papa pastusa",
    french: "Pâte de papa"
  },
  {
    english: "Papa sabanera",
    french: "Sabanera Pope"
  },
  {
    english: "Canchan",
    french: "Canchan"
  },
  {
    english: "Huaych’a",
    french: "Huaych’a"
  },
  {
    english: "Runapapa",
    french: "L'homme"
  },
  {
    english: "Phureja roja",
    french: "Phureja rouge"
  },
  {
    english: "Yuraj imilla",
    french: "fille blanche"
  },
  {
    english: "Jaspe",
    french: "Jaspe"
  },
  {
    english: "India",
    french: "Inde"
  },
  {
    english: "ACC madam blue",
    french: "ACC Madam Blue"
  },
  {
    english: "Abbot",
    french: "Abbé"
  },
  {
    english: "Erika",
    french: "Erika"
  },
  {
    english: "Jazzy",
    french: "Jazzy"
  },
  {
    english: "Krone",
    french: "Couronne"
  },
  {
    english: "Labella",
    french: "La Bella"
  },
  {
    english: "Lady Amarilla",
    french: "Jaune"
  },
  {
    english: "Laperla",
    french: "Laperla"
  },
  {
    english: "Little giant",
    french: "Petit géant"
  },
  {
    english: "Melody",
    french: "Mélodie"
  },
  {
    english: "Musica",
    french: "Musica"
  },
  {
    english: "Umatilla Russet",
    french: "Russet Umatilla"
  },
  {
    english: "Norland",
    french: "Norland"
  },
  {
    english: "Irish Cobbler",
    french: "Cordonnier irlandais"
  },
  {
    english: "Moutain rose",
    french: "Montagne"
  },
  {
    english: "Cheiftan",
    french: "Cheices"
  },
  {
    english: "Viking",
    french: "Viking"
  },
  {
    english: "Elba",
    french: "Elbe"
  },
  {
    english: "Red La soda",
    french: "Le réseau de soda"
  },
  {
    english: "Lady Roseta",
    french: "Roseta de dame"
  },
  {
    english: "Jankdev",
    french: "Janakdev"
  },
  {
    english: "Khumal Bikas",
    french: "Khumal bikas"
  },
  {
    english: "Ramsai",
    french: "Ramsai"
  },
  {
    english: "Golsai",
    french: "Golsaï"
  },
  {
    english: "Saune",
    french: "Sauna"
  },
  {
    english: "Bharlange",
    french: "Va remplir"
  },
  {
    english: "Jirmale",
    french: "Jirmale"
  },
  {
    english: "Dambersi",
    french: "Damens"
  },
  {
    english: "Ramala",
    french: "Raamala"
  },
  {
    english: "tukdah",
    french: "Troupe"
  },
  {
    english: "Copati",
    french: "Chaussons"
  },
  {
    english: "Kashi Amul",
    french: "Perception amul"
  },
  {
    english: "Kashi Adarsh",
    french: "Kashi idéal"
  },
  {
    english: "Kashi Abhiman",
    french: "Kashi Pride"
  },
  {
    english: "Kashi Anupam",
    french: "Paroles Anupa M"
  },
  {
    english: "Kashi Sharad",
    french: "Kashi Sharad"
  },
  {
    english: "Kashi Hemant",
    french: "Kashi Hemant"
  },
  {
    english: "Kashi Amrit",
    french: "Kashi Nectar"
  },
  {
    english: "Kashi Vishesh",
    french: "Kashi Special"
  },
  {
    english: "Vaishali",
    french: "Vaishali"
  },
  {
    english: "Rupali",
    french: "Rupali"
  },
  {
    english: "Rashmi",
    french: "Rashmi"
  },
  {
    english: "Rajni",
    french: "Rajni"
  },
  {
    english: "Sioux",
    french: "Sioux"
  },
  {
    english: "Best of All",
    french: "Le meilleur de tous"
  },
  {
    english: "Marglobe",
    french: "Marglobe"
  },
  {
    english: "Roma",
    french: "Roms"
  },
  {
    english: "Punjab Chuhra",
    french: "Punjab Chuhra"
  },
  {
    english: "Shivalik",
    french: "Shivalik"
  },
  {
    english: "Versha",
    french: "Pluie"
  },
  {
    english: "Bravo",
    french: "Bravo"
  },
  {
    english: "Archana",
    french: "Archana"
  },
  {
    english: "Sadabahar",
    french: "À feuilles persistantes"
  },
  {
    english: "Arka Ahuti",
    french: "Arka Ahuti"
  },
  {
    english: "Arka Abha",
    french: "Le meilleur abha"
  },
  {
    english: "Arka Meghali",
    french: "Arka meurt"
  },
  {
    english: "Pant Bahar",
    french: "Pantalon bahar"
  },
  {
    english: "Arka Saurabh",
    french: "Arka Saurabh"
  },
  {
    english: "Arka Alok",
    french: "Le meilleur"
  },
  {
    english: "Sea Island cotton",
    french: "Coton de l'île de la mer"
  },
  {
    english: "American Up-land cotton",
    french: "Coton américain en terre"
  },
  {
    english: "Catui",
    french: "Cattui"
  },
  {
    english: "Novo",
    french: "Novo"
  },
  {
    english: "Mundo",
    french: "Monde"
  },
  {
    english: "Garnica",
    french: "Garnica"
  },
  {
    english: "Erecta",
    french: "Érection"
  },
  {
    english: "Agaro",
    french: "Gélose"
  },
  {
    english: "Barbuk Sudan",
    french: "Barbuk Soudan"
  },
  {
    english: "Bedessa",
    french: "Faire un bede"
  },
  {
    english: "Dega",
    french: "Calme"
  },
  {
    english: "H3",
    french: "Détester"
  },
  {
    english: "native heirloom",
    french: "héritage indigène"
  },
  {
    english: "Rume Sudan",
    french: "Lume Soudan"
  },
  {
    english: "Sawa",
    french: "D'ACCORD"
  },
  {
    english: "Tafari Kela",
    french: "Bifurquer"
  },
  {
    english: "Andog sari",
    french: "Andog sari"
  },
  {
    english: "Ethiopian",
    french: "Éthiopien"
  },
  {
    english: "Linie S",
    french: "Lignes s"
  },
  {
    english: "Castillo®",
    french: "Castillo®"
  },
  {
    english: "Catimor",
    french: "Califère"
  },
  {
    english: "Typica",
    french: "Typique"
  },
  {
    english: "Catuai",
    french: "menottes"
  },
  {
    english: "Moka",
    french: "Moka"
  },
  {
    english: "Culi",
    french: "Culi"
  },
  {
    english: "mara catura",
    french: "Mara Catura"
  },
  {
    english: "Poovan",
    french: "Poovan"
  },
  {
    english: "Monthan",
    french: "Moishan"
  },
  {
    english: "Rasthali",
    french: "Manteau"
  },
  {
    english: "Nendran",
    french: "Les alevins"
  },
  {
    english: "red banana",
    french: "banane rouge"
  },
  {
    english: "grand naine",
    french: "Grande femme"
  },
  {
    english: "Karpooravalli",
    french: "Carpe"
  },
  {
    english: "yellow dwarf Bananas",
    french: "bananes naines jaunes"
  },
  {
    english: "Red dwarf Bananas",
    french: "Bananes naines rouges"
  },
  {
    english: "green Bananas",
    french: "bananes vertes"
  },
  {
    english: "Green",
    french: "Vert"
  },
  {
    english: "Black",
    french: "Noir"
  },
  {
    english: "Argene",
    french: "Zens"
  },
  {
    english: "Serkamo",
    french: "Serkamo"
  },
  {
    english: "S",
    french: "S"
  },
  {
    english: "Tate",
    french: "Tate"
  },
  {
    english: "Ahadu",
    french: "Ahmed Ahadu"
  },
  {
    english: "Borkena",
    french: "Borkène"
  },
  {
    english: "Obsa",
    french: "Patience"
  },
  {
    english: "Dicho",
    french: "En disant"
  },
  {
    english: "Barsan",
    french: "Grange"
  },
  {
    english: "Lidan",
    french: "Lani"
  },
  {
    english: "Arkebe",
    french: "Archae"
  },
  {
    english: "Smrat",
    french: "Roi"
  },
  {
    english: "Bonay",
    french: "Bonay"
  },
  {
    english: "Bhavani",
    french: "Bhavani"
  },
  {
    english: "Panchali",
    french: "Panchali"
  },
  {
    english: "Sangam",
    french: "Sangame"
  },
  {
    english: "Pakola",
    french: "Peinture"
  },
  {
    english: "Canola Raya",
    french: "Canola raya"
  },
  {
    english: "Rainbow",
    french: "Arc-en-ciel"
  },
  {
    english: "Amazon",
    french: "Amazone"
  },
  {
    english: "Mercedes",
    french: "Mercedes"
  },
  {
    english: "Frontana",
    french: "Frontana"
  },
  {
    english: "Mentana",
    french: "Menta"
  },
  {
    english: "Tucano",
    french: "Toucan"
  },
  {
    english: "Vacaria",
    french: "Vacaria"
  },
  {
    english: "Pavao",
    french: "Paul"
  },
  {
    english: "Climax",
    french: "Climax"
  },
  {
    english: "Richmond",
    french: "Richmond"
  },
  {
    english: "Rasant",
    french: "Rapide"
  },
  {
    english: "Timfo",
    french: "Timfo"
  },
  {
    english: "Alma",
    french: "Alma"
  },
  {
    english: "Basho",
    french: "Ils disent"
  },
  {
    english: "Bounty",
    french: "Prime"
  },
  {
    english: "Champ",
    french: "Champion"
  },
  {
    english: "Comtal",
    french: "Compter"
  },
  {
    english: "Tiller",
    french: "Taller"
  },
  {
    english: "Clair",
    french: "Clair"
  },
  {
    english: "Barfleo",
    french: "Barfleo"
  },
  {
    english: "Kootenai",
    french: "Kootenai"
  },
  {
    english: "Barpenta",
    french: "Barpenta"
  },
  {
    english: "Toro",
    french: "Visite"
  },
  {
    english: "Mariposa",
    french: "Mariposa"
  },
  {
    english: "Champlain",
    french: "Champlain"
  },
  {
    english: "Finecut",
    french: "Finecam"
  },
  {
    english: "Gulfcut",
    french: "Golfe"
  },
  {
    english: "Pioneer",
    french: "Pionnière"
  },
  {
    english: "Reclaimar",
    french: "Reclatificateur"
  },
  {
    english: "Salcut",
    french: "Se saller"
  },
  {
    english: "Topcut",
    french: "Coupe en haut"
  },
  {
    english: "Boma",
    french: "Boma"
  },
  {
    english: "Callida",
    french: "Intelligent"
  },
  {
    english: "Elmba",
    french: "Élma"
  },
  {
    english: "Marina",
    french: "Marina"
  },
  {
    english: "Sabre",
    french: "Sabre"
  },
  {
    english: "KP8",
    french: "8"
  },
  {
    english: "Nemcut",
    french: "Nemcut"
  },
  {
    english: "Asatsuyu",
    french: "rosée du matin"
  },
  {
    english: "Katambora",
    french: "La radio"
  },
  {
    english: "Tolgar",
    french: "Tolgar"
  },
  {
    english: "Egyptian giant",
    french: "Géant égyptien"
  },
  {
    english: "Marmand",
    french: "Marme"
  },
  {
    english: "Edkawy",
    french: "Edcawa"
  },
  {
    english: "Pakmor-b",
    french: "Pakmor-b"
  },
  {
    english: "Floradade",
    french: "fleurir"
  },
  {
    english: "Mountain fresh plus",
    french: "Montagne fraîche plus"
  },
  {
    english: "Mountain spring",
    french: "Printemps de la montagne"
  },
  {
    english: "Polbig",
    french: "Polbig"
  },
  {
    english: "Big beef",
    french: "Gros bœuf"
  },
  {
    english: "Boxcar willie",
    french: "Willie de caisse"
  },
  {
    english: "Mortgage lifter",
    french: "Cavalier hypothécaire"
  },
  {
    english: "Red pearl",
    french: "Perle rouge"
  },
  {
    english: "Sun gold",
    french: "Or"
  },
  {
    english: "Blackhawk",
    french: "Blackhawk"
  },
  {
    english: "Valentine",
    french: "Valentin"
  },
  {
    english: "Black eclipse",
    french: "Éclipse noire"
  },
  {
    english: "Black bear",
    french: "Ours noir"
  },
  {
    english: "Abdin",
    french: "Abdin"
  },
  {
    english: "Hadi ( Okra – leaf Barakat )",
    french: "Hadi (aqra - lev barakat)"
  },
  {
    english: "Kheiralla",
    french: "Bien"
  },
  {
    english: "Wager",
    french: "Pari"
  },
  {
    english: "Burhan",
    french: "Burhan"
  },
  {
    english: "Khalifa",
    french: "Khalifa"
  },
  {
    english: "Bukalasa pedigree albar",
    french: "Bukalasa Pedigri Albar"
  },
  {
    english: "Serere albar type uganda (satu)",
    french: "Serere Albar Type Ouganda (un)"
  },
  {
    english: "Guaraní inta bgrr",
    french: "Guaraní inta bgrr"
  },
  {
    english: "Nuopal rr",
    french: "Nuopal RR"
  },
  {
    english: "Purnima",
    french: "Purnima"
  },
  {
    english: "Jaydhar",
    french: "Jayadhar"
  },
  {
    english: "Malgari",
    french: "Malgare"
  },
  {
    english: "Abhadita,",
    french: "Abadita,"
  },
  {
    english: "Catuai,",
    french: "Cattuai,"
  },
  {
    english: "Caturra,",
    french: "Caturra,"
  },
  {
    english: "Geisha,",
    french: "Geisha,"
  },
  {
    english: "Lempira,",
    french: "Lempira,"
  },
  {
    english: "Hartman",
    french: "Hartman"
  },
  {
    english: "Girard",
    french: "Girard"
  },
  {
    english: "Finch",
    french: "Bouvreuil"
  },
  {
    english: "Saffire",
    french: "Arasier"
  },
  {
    english: "Centennial",
    french: "Centenaire"
  },
  {
    english: "Montola",
    french: "Montola"
  },
  {
    english: "merah besar",
    french: "gros rouge"
  },
  {
    english: "curly green chilli",
    french: "Chilli vert bouclé"
  },
  {
    english: "Red birds eye chilli",
    french: "Chilli pour les oiseaux rouges"
  },
  {
    english: "green birds eye",
    french: "œil d'oiseaux verts"
  },
  {
    english: "kanthari",
    french: "Kanthari"
  },
  {
    english: "kashmiri chilli",
    french: "Chili cachemire"
  },
  {
    english: "Bhagya lakshmi",
    french: "Bhagya lakshmi"
  },
  {
    english: "birds eye chilli (dhani)",
    french: "Oiseaux aay chili (dhani)"
  },
  {
    english: "guntur chilli",
    french: "Ils sont des piments ganneaux"
  },
  {
    english: "tomato chilli",
    french: "piment de tomates"
  },
  {
    english: "madras pari",
    french: "Madras Paris"
  },
  {
    english: "ramnad mundu",
    french: "Ramnad Mundu"
  },
  {
    english: "nagpur",
    french: "Nagpur"
  },
  {
    english: "Crisphead",
    french: "Crisphead"
  },
  {
    english: "Butterhead",
    french: "Tête de beurre"
  },
  {
    english: "Romaine",
    french: "Romaine"
  },
  {
    english: "Loose leaf",
    french: "Feuille de feuille"
  },
  {
    english: "Frisbee",
    french: "Frisbee"
  },
  {
    english: "Radicchio",
    french: "Radicchio"
  },
  {
    english: "Oak leaf lettuce",
    french: "Laitue à feuilles de chêne"
  },
  {
    english: "stem lettuce",
    french: "laitue à tige"
  },
  {
    english: "Arugula",
    french: "Voisins"
  },
  {
    english: "cress",
    french: "cresson"
  },
  {
    english: "Endive",
    french: "Endive"
  },
  {
    english: "coral lettuce",
    french: "laitue corallienne"
  },
  {
    english: "Mache",
    french: "Mâché"
  },
  {
    english: "Boston",
    french: "Boston"
  },
  {
    english: "Ambon banana",
    french: "Ambon Banana"
  },
  {
    english: "Barangan",
    french: "Marchandises"
  },
  {
    english: "Kepok banana",
    french: "Kepok Banana"
  },
  {
    english: "Mas banana",
    french: "Plus de banane"
  },
  {
    english: "Cavendish",
    french: "Cavende"
  },
  {
    english: "Lampung banana",
    french: "Banane de Lampung"
  },
  {
    english: "Awk banana",
    french: "Banana Awk"
  },
  {
    english: "Champa",
    french: "Champa"
  },
  {
    english: "Ronit",
    french: "À côté"
  },
  {
    english: "Sper Elad",
    french: "J'espère Elad"
  },
  {
    english: "Trailblazer",
    french: "Pionnière"
  },
  {
    english: "Vega",
    french: "Vega"
  },
  {
    english: "Candy",
    french: "Bonbons"
  },
  {
    english: "Exacta",
    french: "Exact"
  },
  {
    english: "Red Sky",
    french: "ciel rouge"
  },
  {
    english: "Redwing",
    french: "Aile rouge"
  },
  {
    english: "Bhima Shubhra",
    french: "Bhima Shubhra"
  },
  {
    english: "Brown Spanish",
    french: "Espagnol brun"
  },
  {
    english: "Punjab Naroya",
    french: "Punjab Naroa"
  },
  {
    english: "HERITAGE ENDURANCE",
    french: "Endurance patrimoniale"
  },
  {
    english: "SARDI-GRAZER",
    french: "Grillon sardin"
  },
  {
    english: "Tenera",
    french: "Tendre"
  },
  {
    english: "Golden acre",
    french: "Acre doré"
  },
  {
    english: "Danish ballhead",
    french: "Tête de bal danish"
  },
  {
    english: "Kranti",
    french: "Révolution"
  },
  {
    english: "Manado Malay",
    french: "Manado malais"
  },
  {
    english: "North Moluccan Malay",
    french: "Malais nord"
  },
  {
    english: "Ambon Malay",
    french: "Ambon malais"
  },
  {
    english: "Banda Malay",
    french: "Banda malais"
  },
  {
    english: "Lampong",
    french: "Buisson"
  },
  {
    english: "Muntok",
    french: "Muntok"
  },
  {
    english: "Sarawak pepper",
    french: "Poivre de Sarawak"
  },
  {
    english: "Jambi",
    french: "Jambi"
  },
  {
    english: "Baboon lemon",
    french: "Citron babouin"
  },
  {
    english: "Brazilian sweet lemon",
    french: "Brésilien doux citron"
  },
  {
    english: "Bearss Lemons",
    french: "Citrons"
  },
  {
    english: "Punjab Baramasi",
    french: "Punjab Baramasi"
  },
  {
    english: "Punjab Galgal",
    french: "Punjab Galgal"
  },
  {
    english: "Lucknow seedless",
    french: "Lucknow sans pépins"
  },
  {
    english: "Pant Lemon (Seville)",
    french: "Pant de citron (Séville)"
  },
  {
    english: "Lisbon lemon",
    french: "Citron de Lisbonne"
  },
  {
    english: "Jora tenga",
    french: "Jora a"
  },
  {
    english: "Rough lemon",
    french: "Citron"
  },
  {
    english: "Nepali Round",
    french: "Népalais"
  },
  {
    english: "Chakradhar",
    french: "Chakradhar"
  },
  {
    english: "Rasraj",
    french: "Riterg"
  },
  {
    english: "Red dwarf Bananas",
    french: "Bananes naines rouges"
  },
  {
    english: "Baswant 780",
    french: "Baswant 780"
  },
  {
    english: "Hisar-2",
    french: "Hisar-2"
  },
  {
    english: "Pusa Ratnar",
    french: "Culte"
  },
  {
    english: "Pusa Red",
    french: "Pusa rouge"
  },
  {
    english: "Pusa white flat",
    french: "Pusa blanc plat"
  },
  {
    english: "Pusa White Round",
    french: "Pusa blanc rond"
  },
  {
    english: "Udaipur -101",
    french: "Udaipur -101"
  },
  {
    english: "Udaipur -102",
    french: "Udaipur -102"
  },
  {
    english: "CoLk 94184 (Birendra)",
    french: "Kak 94184 (Birendra)"
  },
  {
    english: "CoOr 03151(Sabita)",
    french: "Coor 03151 (Sabita)"
  },
  {
    english: "CGKusum-1",
    french: "Cgkusum-1"
  },
  {
    english: "Malviya Kusum 305",
    french: "Malavia Kusum 305"
  },
  {
    english: "Nag-7",
    french: "NAG 7"
  },
  {
    english: "Nari 38",
    french: "Nari 38"
  },
  {
    english: "Phule Kusuma",
    french: "Fule Kusum"
  },
  {
    english: "MY 5465",
    french: "Mon 5465"
  },
  {
    english: "SP 701284",
    french: "SP 701284"
  },
  {
    english: "Adira 1",
    french: "Adira 1"
  },
  {
    english: "Adira 2",
    french: "Adira 2"
  },
  {
    english: "Adira 4",
    french: "Adira 4"
  },
  {
    english: "Malang 1",
    french: "Malang 1"
  },
  {
    english: "Malang 2",
    french: "Malang 2"
  },
  {
    english: "Malang 4",
    french: "Malang 4"
  },
  {
    english: "Casca roxa",
    french: "Violet"
  },
  {
    english: "Mayombe",
    french: "Mayombe"
  },
  {
    english: "Musimwa",
    french: "Visites"
  },
  {
    english: "Obasanjo-2",
    french: "Obasanjo-2"
  },
  {
    english: "Baba 70",
    french: "Baba 70"
  },
  {
    english: "Nyaraboke",
    french: "Espagnol"
  },
  {
    english: "Karangwa",
    french: "Karangwa"
  },
  {
    english: "Kabiriti",
    french: "Kabirdi"
  },
  {
    english: "Mingoro",
    french: "Mingoro"
  },
  {
    english: "Kwatamumpale",
    french: "Dawbe"
  },
  {
    english: "Ogwok",
    french: "Folliste"
  },
  {
    english: "NASE 19",
    french: "Nez 19"
  },
  {
    english: "NAROCASS 1",
    french: "Narocasse 1"
  },
  {
    english: "NAROCASS 2",
    french: "Narocasse 2"
  },
  {
    english: "Inca red",
    french: "Incas rouge"
  },
  {
    english: "Rosada de Junin",
    french: "Junin's Pink"
  },
  {
    english: "Mantaro",
    french: "Mantaro"
  },
  {
    english: "Rosada Taraco",
    french: "Rosada Taraco"
  },
  {
    english: "Mokhtar",
    french: "Mokhtar"
  },
  {
    english: "Sidi Masri",
    french: "Sir égyptien"
  },
  {
    english: "Zellaf",
    french: "Zellaf"
  },
  {
    english: "Kufra 1",
    french: "Tronc 1"
  },
  {
    english: "Merjawi",
    french: "Aperçu"
  },
  {
    english: "Buhut 103",
    french: "Très 103"
  },
  {
    english: "Embrapa 49",
    french: "Embrapa 49"
  },
  {
    english: "6505 B",
    french: "6505 b"
  },
  {
    english: "Chhommrong",
    french: "Chhommrong"
  },
  {
    english: "Lekali Dhan 3",
    french: "Lac Dhan 3"
  },
  {
    english: "Radha 4",
    french: "Radha 4"
  },
  {
    english: "Sarju 52",
    french: "Série 52"
  },
  {
    english: "BP 1",
    french: "BP 1"
  },
  {
    english: "Agroceres 12",
    french: "Agroceres 12"
  },
  {
    english: "Ganga 4",
    french: "Ganga 4"
  },
  {
    english: "Ganga 7",
    french: "Ganga 7"
  },
  {
    english: "Rajendra hybrid makka 2",
    french: "Rajndra Hebram Makkah A."
  },
  {
    english: "Kawanda Comp A",
    french: "Kawanda comp a"
  },
  {
    english: "Papa criolla",
    french: "Créole Pope"
  },
  {
    english: "Criolla Sua Pa",
    french: "Criolla votre PA"
  },
  {
    english: "Criolla Dorada",
    french: "Créole doré"
  },
  {
    english: "Qhoyllupapa",
    french: "QHOYLLUPAPAPAPAPA."
  },
  {
    english: "Qhenipapa",
    french: "Qhenipapa."
  },
  {
    english: "Wila imilla",
    french: "La fille de Wila"
  },
  {
    english: "Chiar Imilla",
    french: "Même Imilla"
  },
  {
    english: "Sani imilla",
    french: "Connaître Imilla"
  },
  {
    english: "Russet Norkotah",
    french: "Russet Norkotah"
  },
  {
    english: "Ranger Russet",
    french: "Ranger Russet"
  },
  {
    english: "Red pontiac",
    french: "Pontiac rouge"
  },
  {
    english: "Kennebec",
    french: "Kennebec"
  },
  {
    english: "Yukon Gold",
    french: "Yuu maintenant ld"
  },
  {
    english: "Kufri jyoti",
    french: "Déconcertant"
  },
  {
    english: "Kufri sindhuri",
    french: "Kufri Sindhuri"
  },
  {
    english: "Kufri Chandramukhi",
    french: "Kufri chandramukhi"
  },
  {
    english: "Kufri Pukhraj",
    french: "Kufri Pukhraj"
  },
  {
    english: "Kufri Khyati",
    french: "Je suis mon frère"
  },
  {
    english: "Kufri Arun",
    french: "Kuffer Arun"
  },
  {
    english: "Kufri Surya",
    french: "Kufri Soleil"
  },
  {
    english: "Kufri Kanchan",
    french: "Kufri Kanchan"
  },
  {
    english: "Kufri Bahar",
    french: "Kufri Bahar"
  },
  {
    english: "Kufri Megha",
    french: "Consommer pour s'allumer"
  },
  {
    english: "Khumal Upahar",
    french: "Cadeau"
  },
  {
    english: "Khumal Seto-1",
    french: "Seto-1 humain"
  },
  {
    english: "Chibesai",
    french: "Festival Tiva"
  },
  {
    english: "Tukdah-135",
    french: "Tuktah-135"
  },
  {
    english: "Tukdah- 383",
    french: "Tuktah- 383"
  },
  {
    english: "Tukdah-78",
    french: "Tuka-78"
  },
  {
    english: "Happy Valley- 36",
    french: "Happy Valley- 36"
  },
  {
    english: "Thurbo 3",
    french: "Thurbo 3"
  },
  {
    english: "Sikkim 1",
    french: "Sikkim 1"
  },
  {
    english: "Rungli 144",
    french: "Rungli 144"
  },
  {
    english: "Kashi Aman",
    french: "Paroles Aman"
  },
  {
    english: "Pusa Ruby",
    french: "Pusa Ruby"
  },
  {
    english: "Pusa Early Dwarf",
    french: "Pusa Early Dwarf"
  },
  {
    english: "Co 1",
    french: "CO 1"
  },
  {
    english: "Arka Vikas ( Sel 22 )",
    french: "Extraire le développement (cellule 1)"
  },
  {
    english: "Arka Saurabh ( Sel - 4)",
    french: "Arka Saurabh (voile - 4)"
  },
  {
    english: "Arka Ahuti ( Sel 11 )",
    french: "Arka Ahuti (cellule 11)"
  },
  {
    english: "Arka Vardan ( FM hyb -2)",
    french: "Arka Vardan (FM Hub -2)"
  },
  {
    english: "Arka Shreshta",
    french: "Enragine"
  },
  {
    english: "Round Pusa",
    french: "Pusa ronde"
  },
  {
    english: "Pusa Hybrid -2",
    french: "Pusa hybride -2"
  },
  {
    english: "Pusa Red Plum",
    french: "Pusa Red Plum"
  },
  {
    english: "Solan Gola",
    french: "Solan Gola"
  },
  {
    english: "Pusa Gaurav",
    french: "Pusa Gaurav"
  },
  {
    english: "Narendra Tomato 1",
    french: "Narendra Tomato 1"
  },
  {
    english: "Narendra Tomato 2",
    french: "Narendra Tomato 2"
  },
  {
    english: "Selection 10",
    french: "Sélection 10"
  },
  {
    english: "Abyssinia",
    french: "Abyssinie"
  },
  {
    english: "Geisha(1931)",
    french: "Geisha (1931)"
  },
  {
    english: "Geisha(1956)",
    french: "Geisha (1956)"
  },
  {
    english: "Kudhumi/ Kurume",
    french: "Kudhumi/Kurume"
  },
  {
    english: "Miqe",
    french: "Miqé"
  },
  {
    english: "Bergundal",
    french: "Bergonde"
  },
  {
    english: "Andong Sari",
    french: "Andong Sari"
  },
  {
    english: "dwarf cavendish",
    french: "cavendish nain"
  },
  {
    english: "Neypoovan",
    french: "Neypoovan"
  },
  {
    english: "Vayal vazhai",
    french: "Vayal Vazhai"
  },
  {
    english: "Oolong",
    french: "Oolong"
  },
  {
    english: "Adi",
    french: "Adi"
  },
  {
    english: "Abasena",
    french: "Abasena"
  },
  {
    english: "Kelafo-74",
    french: "Kelafo-74"
  },
  {
    english: "Mehado-80",
    french: "Mehado-80"
  },
  {
    english: "E",
    french: "E"
  },
  {
    english: "Humera-1",
    french: "Humera-1"
  },
  {
    english: "Setit-1",
    french: "Sets-1"
  },
  {
    english: "Shawarobit",
    french: "Calendrier"
  },
  {
    english: "Pusa Vishal ML-818",
    french: "Pusa Vishal ML-818"
  },
  {
    english: "Vaibhav",
    french: "Vaiibhav"
  },
  {
    english: "Pusa kalyani",
    french: "Pusa Kalyanani"
  },
  {
    english: "Patan 66",
    french: "Patan 66"
  },
  {
    english: "Gujrat sarsav - 1",
    french: "Gujarat Sarasav - 1"
  },
  {
    english: "Qinyou- 10",
    french: "Qinyou- 10"
  },
  {
    english: "Amelando",
    french: "Amelando"
  },
  {
    english: "Trinitario",
    french: "Trinité"
  },
  {
    english: "Tiiti",
    french: "Tiiti"
  },
  {
    english: "Hokuo",
    french: "Hokko"
  },
  {
    english: "Zenyatta",
    french: "Zenyatta"
  },
  {
    english: "Mohawk",
    french: "Mohawk"
  },
  {
    english: "Nemkat",
    french: "Nemkat"
  },
  {
    english: "TV 23",
    french: "TV 23"
  },
  {
    english: "Black cat (06252)",
    french: "Chat noir (06252)"
  },
  {
    english: "Barakat ( 90 )",
    french: "Barakat ( 90 )"
  },
  {
    english: "Barac ( 67 ) acala",
    french: "Barak ( 67 ) seul"
  },
  {
    english: "Siddig ( sudan pima)",
    french: "Siddig ( Soudan Pima)"
  },
  {
    english: "Siokra 1-4",
    french: "Sikra 1-4"
  },
  {
    english: "Bikaneri nerma",
    french: "Bikaneri nira"
  },
  {
    english: "Eknath",
    french: "Eknath"
  },
  {
    english: "Khandwa–2",
    french: "Khandwa -2"
  },
  {
    english: "Badnawar–1",
    french: "Badnawar-1"
  },
  {
    english: "Supriya",
    french: "Supriya"
  },
  {
    english: "Oker",
    french: "Oker"
  },
  {
    english: "Erlin",
    french: "Erlin"
  },
  {
    english: "Cabai rawit",
    french: "Cabai rawit"
  },
  {
    english: "Cabai keriting",
    french: "Cabaï kériting"
  },
  {
    english: "cayenne pepper(hottest chilli)",
    french: "poivre de Cayenne (piment le plus fort)"
  },
  {
    english: "cabai ceremai",
    french: "cérémonie de cabai"
  },
  {
    english: "Bengkulu",
    french: "Bengkulu"
  },
  {
    english: "lembang",
    french: "lembang"
  },
  {
    english: "jwala",
    french: "jwala"
  },
  {
    english: "sangli sannam",
    french: "sangli Sannam"
  },
  {
    english: "G.T.sannam",
    french: "G.T.Sannam"
  },
  {
    english: "Bibb lettuce",
    french: "Bibb Laitue"
  },
  {
    english: "little gem lettuce",
    french: "Petite laitue gemme"
  },
  {
    english: "Raja bagus banana",
    french: "Banana's Nice King"
  },
  {
    english: "Jackfruit banana",
    french: "Banane de jacquier"
  },
  {
    english: "Ebenezer",
    french: "Niveau"
  },
  {
    english: "Mercury",
    french: "Mercure"
  },
  {
    english: "Bhima Super",
    french: "Bhima Super"
  },
  {
    english: "Bhima Dark Red",
    french: "Bhima rouge foncé"
  },
  {
    english: "Bhima Shweta",
    french: "Fuite de bimya"
  },
  {
    english: "Pusa Madhv",
    french: "Pusa Madv"
  },
  {
    english: "Raj 171",
    french: "Raj 171"
  },
  {
    english: "ALFAMASTER 10",
    french: "ALFAMASTER 10"
  },
  {
    english: "Titan5",
    french: "Titan5"
  },
  {
    english: "sf force11",
    french: "SF Force11"
  },
  {
    english: "SARDI 10",
    french: "SARDI 10"
  },
  {
    english: "HERITAGE 10",
    french: "HERITAGE 10"
  },
  {
    english: "ALFAMASTER 11",
    french: "ALFAMASTER 11"
  },
  {
    english: "Jersey wakefield",
    french: "Jersey Wakefield"
  },
  {
    english: "Pusa Drum Head",
    french: "Tête de tambour pusa"
  },
  {
    english: "Pusa Mukta",
    french: "Pusa Mukt"
  },
  {
    english: "SAMSORG 45",
    french: "Samsorg 45"
  },
  {
    english: "SAMSORG 46",
    french: "Samsorg 46"
  },
  {
    english: "SAMSORG 47",
    french: "Samsorg 47"
  },
  {
    english: "SAMSORG 48",
    french: "Samsorg 48"
  },
  {
    english: "Kupang Malay",
    french: "Kupang malais"
  },
  {
    english: "Dorshapo",
    french: "Dorshapo"
  },
  {
    english: "PAU Baramasi-1",
    french: "Pau Baramas-1"
  },
  {
    english: "Gondhoraj",
    french: "Jars"
  },
  {
    english: "Pat Nebu",
    french: "Patte"
  },
  {
    english: "Kaji nemu",
    french: "Kaji Nemo"
  },
  {
    english: "Gol nemu",
    french: "Gol à lui"
  },
  {
    english: "BO 128 (Pramod)",
    french: "Bo 128 (Pramod)"
  },
  {
    english: "Co-1",
    french: "Co-1"
  },
  {
    english: "Co-2",
    french: "Co-2"
  },
  {
    english: "Granex 429",
    french: "Granex 429"
  },
  {
    english: "Granex 55",
    french: "Granex 55"
  },
  {
    english: "HA 60",
    french: "Ha 60"
  },
  {
    english: "N 2-4-1",
    french: "N 2-4-1"
  },
  {
    english: "N-257-9-1",
    french: "N-257-9-1"
  },
  {
    english: "N-53",
    french: "N-53"
  },
  {
    english: "NHRDF Red",
    french: "NHRDF rouge"
  },
  {
    english: "NHRDF Red 2",
    french: "Nhrdf rouge 2"
  },
  {
    english: "NHRDF Red3",
    french: "Dissuasion nisradf"
  },
  {
    english: "NHRDF Red4",
    french: "NHRDF RED4"
  },
  {
    english: "S-48",
    french: "S-48"
  },
  {
    english: "Tana F1",
    french: "Elle est F1"
  },
  {
    english: "VL-3",
    french: "VL-3"
  },
  {
    english: "OC 671",
    french: "OC 671"
  },
  {
    english: "COC 771",
    french: "COC 771"
  },
  {
    english: "COC 772",
    french: "COC 772"
  },
  {
    english: "COC 773",
    french: "COC 773"
  },
  {
    english: "COC 8001 (C 66191)",
    french: "COC 8001 (C 66191)"
  },
  {
    english: "COC 774",
    french: "COC 774"
  },
  {
    english: "COC 775",
    french: "COC 775"
  },
  {
    english: "COC 776",
    french: "COC 776"
  },
  {
    english: "COC 777",
    french: "COC 777"
  },
  {
    english: "COC 778",
    french: "COC 778"
  },
  {
    english: "COC 779",
    french: "COC 779"
  },
  {
    english: "CO 419",
    french: "CO 419"
  },
  {
    english: "CO 6304",
    french: "CO 6304"
  },
  {
    english: "COC 8001",
    french: "COC 8001"
  },
  {
    english: "COC 85061",
    french: "COC 85061"
  },
  {
    english: "COC 86062",
    french: "COC 86062"
  },
  {
    english: "COSi 86071",
    french: "Cosi 86071"
  },
  {
    english: "COC 90063",
    french: "COC 90063"
  },
  {
    english: "CO 8021",
    french: "CO 8021"
  },
  {
    english: "COC 91061",
    french: "COC 91061"
  },
  {
    english: "COC 92061",
    french: "COC 92061"
  },
  {
    english: "CO 8362",
    french: "CO 8362"
  },
  {
    english: "COG 93076",
    french: "COG 93076"
  },
  {
    english: "CO 8208",
    french: "CO 8208"
  },
  {
    english: "COG 94077",
    french: "COG 94077"
  },
  {
    english: "COG 95076",
    french: "COG 95076"
  },
  {
    english: "CO 85019",
    french: "CO 85019"
  },
  {
    english: "COSi 95071",
    french: "Cosi 95071"
  },
  {
    english: "COSi 96071",
    french: "Cosi 96071"
  },
  {
    english: "CO 86010",
    french: "CO 86010"
  },
  {
    english: "COC 98061",
    french: "COC 98061"
  },
  {
    english: "COSi 98071",
    french: "Cosi 98071"
  },
  {
    english: "CO 86249",
    french: "CO 86249"
  },
  {
    english: "COC 99061",
    french: "COC 99061"
  },
  {
    english: "CO 86032",
    french: "CO 86032"
  },
  {
    english: "COC (SC) 22",
    french: "Coc (SC) 22"
  },
  {
    english: "CO Si (SC) 6",
    french: "Ce que si (sc) 6"
  },
  {
    english: "COG (SC) 5",
    french: "COG (SC) 5"
  },
  {
    english: "CoC 23",
    french: "COC 23"
  },
  {
    english: "CoC 24",
    french: "COC 24"
  },
  {
    english: "TNAU SC Si 7",
    french: "T? 7"
  },
  {
    english: "TNAU SC Si 8",
    french: "Minuscule smi 8"
  },
  {
    english: "Co 0118 (Karan-2)",
    french: "CO 0118 (Karan-2)"
  },
  {
    english: "Co 0124 (Karan-5)",
    french: "CO 0124 (Karan-5)"
  },
  {
    english: "Co 0218 (Shreyas)",
    french: "CO 0218 (Shreyas)"
  },
  {
    english: "Co 0232 (Kamal)",
    french: "CO 0232 (Lotus)"
  },
  {
    english: "Co 0233 (Kosi)",
    french: "Chaque 0233 (kosi)"
  },
  {
    english: "Co 0237 (Karan-8)",
    french: "CO 0237 (Karan-8)"
  },
  {
    english: "Co 0238 (Karan-4)",
    french: "CO 0238 (Karan-4)"
  },
  {
    english: "Co 0239 (Karan-6)",
    french: "CO 0239 (Karan-6)"
  },
  {
    english: "Co 0403 (Samriddhi)",
    french: "CO 0403 (prospérité)"
  },
  {
    english: "Co 05009 (Karan-10)",
    french: "CO 05009 (Karan-10)"
  },
  {
    english: "Co 05011 (Karan-9)",
    french: "CO 05011 (Karan-9)"
  },
  {
    english: "Co 06027",
    french: "CO 06027"
  },
  {
    english: "Co 06030",
    french: "CO 06030"
  },
  {
    english: "Co 09022 (Karan 12)",
    french: "CO 09022 (Karan 12)"
  },
  {
    english: "Co 2001-13 (Sulabh)",
    french: "CO 2001-13 (Sulabh)"
  },
  {
    english: "Co 2001-15 (Mangal)",
    french: "CO 2001-15 (Mars)"
  },
  {
    english: "Co 8371 (Bhima)",
    french: "CO 8371 (Bhima)"
  },
  {
    english: "Co 85004 (Prabha)",
    french: "CO 85004 (Prabha)"
  },
  {
    english: "Co 86032 (Nayana)",
    french: "CO 86032 (Nayana)"
  },
  {
    english: "Co 86249 (Bhavani)",
    french: "CO 86249 (Bhavani)"
  },
  {
    english: "Co 87025 (Kalyani)",
    french: "CO 87025 (Kalyani)"
  },
  {
    english: "Co 87044 (Uttara)",
    french: "CO 87044 (Uttara)"
  },
  {
    english: "Co 87263 (Sarayu)",
    french: "CO 87263 (Saryu)"
  },
  {
    english: "Co 87268 (Moti)",
    french: "CO 87268 (MOTI)"
  },
  {
    english: "Co 89029 (Gandak)",
    french: "CO 89029 (Gandak)"
  },
  {
    english: "Co 91010 (Dhanush)",
    french: "CO 91010 (Dhanush)"
  },
  {
    english: "Co 94008 (Shyama)",
    french: "CO 94008 (Shyama)"
  },
  {
    english: "Co 98014 (Karan-1)",
    french: "CO 98014 (Karan-1)"
  },
  {
    english: "Co 99004 (Damodar)",
    french: "CO 99004 (Damodar)"
  },
  {
    english: "CoC 01061 (CoC (SC) 23)",
    french: "COC 01061 (COC (SC) 23)"
  },
  {
    english: "CoH 119 (Haryana Ganna - 119)",
    french: "COH 119 (Haryana Ganna - 119)"
  },
  {
    english: "CoH 128",
    french: "COH 128"
  },
  {
    english: "CoH 2201 (Haryana-92)",
    french: "COH 2201 (Haryana-92)"
  },
  {
    english: "CoH 92201(Haryana-92)",
    french: "COH 92201 (Haryana-92)"
  },
  {
    english: "CoJ 20193 (CoJ 89)",
    french: "Prendre 20193 (prendre 89)"
  },
  {
    english: "CoM 88121 (Krishna)",
    french: "Com 88121 (Krishna)"
  },
  {
    english: "CoP 06436 (CoP 2061)",
    french: "COP 06436 (COP 2061)"
  },
  {
    english: "CoPant 90223 (Pant 90223)",
    french: "Copant 90223 (Pant 90223)"
  },
  {
    english: "CoPant 97222",
    french: "Copant 97222"
  },
  {
    english: "CoPk 05191 (Pratap Ganna-1)",
    french: "CoPk 05191 (Pratap Ganna-1)"
  },
  {
    english: "CoS 1230 (Raseeli)",
    french: "CoS 1230 (Raseeli)"
  },
  {
    english: "CoS 91230 (Raseeli)",
    french: "CoS 91230 (Raseeli)"
  },
  {
    english: "CoS 94270 (Sweta)",
    french: "Cos 94270 (Sweta)"
  },
  {
    english: "CoS 96268 (Mithas)",
    french: "Cos 96268 (douceur)"
  },
  {
    english: "CoS 96275 (Sweety)",
    french: "Cos 96275 (Sweety)"
  },
  {
    english: "CoSe 01421 (Imarti)",
    french: "Choses 01421 (imiti)"
  },
  {
    english: "CoSe 92423 (Rajbhog)",
    french: "Choses 92423 (Rajbhog)"
  },
  {
    english: "CoSe 95255 (Rachna)",
    french: "95255 serré (composition)"
  },
  {
    english: "CoSe 95422 (Rasbhari)",
    french: "COSEE 95422 (Rasbhari)"
  },
  {
    english: "CoSe 96234 (Rashmi)",
    french: "96234 serré (Rashmi)"
  },
  {
    english: "CoSe 96436 (Jalpari)",
    french: "Serré 96436 (sirène)"
  },
  {
    english: "CoSnk 05103",
    french: "Cosnk 05103"
  },
  {
    english: "CoSnk 05104",
    french: "Cosnk 05104"
  },
  {
    english: "A-2",
    french: "A-2"
  },
  {
    english: "A-300",
    french: "A-300"
  },
  {
    english: "AKS-207",
    french: "AKS-207"
  },
  {
    english: "Annigeri-1(A-1)",
    french: "Annigeri-1 (A-1)"
  },
  {
    english: "DSH-129",
    french: "DSH-129"
  },
  {
    english: "DSH-185",
    french: "DSH-185"
  },
  {
    english: "IGKV Kusum (RSS 2016-03)",
    french: "IGKV KUSUM (RSSS 2016-03)"
  },
  {
    english: "ISF-1",
    french: "ISF-1"
  },
  {
    english: "ISF-764",
    french: "ISF-764"
  },
  {
    english: "JSF-1",
    french: "JSF-1"
  },
  {
    english: "JSF-97",
    french: "JSF-97"
  },
  {
    english: "JSF-99",
    french: "JSF-99"
  },
  {
    english: "JSI-7",
    french: "Tu es-7"
  },
  {
    english: "JSI-73",
    french: "Vous êtes-73"
  },
  {
    english: "Lakshmi Priya (ISF 764)",
    french: "Lakshmi Priya (SAF 764)"
  },
  {
    english: "MKH-11",
    french: "MKH-11"
  },
  {
    english: "MRSA-521",
    french: "MRSA-521"
  },
  {
    english: "N-62-8",
    french: "N-62-8"
  },
  {
    english: "NARI-57",
    french: "Nari-57"
  },
  {
    english: "NARI-6",
    french: "Nari-6"
  },
  {
    english: "NARI-96",
    french: "Nari-96"
  },
  {
    english: "NARI-H-15",
    french: "Forme -H -15"
  },
  {
    english: "NARI-H-23",
    french: "Forme -H -23"
  },
  {
    english: "NARI-NH-1",
    french: "Forme h -1"
  },
  {
    english: "PBNS-12",
    french: "PBNS-12"
  },
  {
    english: "PBNS-40",
    french: "PBNS-40"
  },
  {
    english: "PKV-Pink",
    french: "Pkv-rose"
  },
  {
    english: "Pride (ISF 1)",
    french: "Pride (ISF 1)"
  },
  {
    english: "S-144",
    french: "S-144"
  },
  {
    english: "SSF-12-40",
    french: "SSF-12-40"
  },
  {
    english: "SSF-13-71",
    french: "SSF-13-71"
  },
  {
    english: "SSF-658",
    french: "SSF-658"
  },
  {
    english: "SSF-708",
    french: "SSF-708"
  },
  {
    english: "TSF-1",
    french: "TSF-1"
  },
  {
    english: "Type-6503",
    french: "Type-6503"
  },
  {
    english: "CC93-7711",
    french: "Sesus 7711"
  },
  {
    english: "CC93-7510",
    french: "SESUS 7510"
  },
  {
    english: "CC01-1940",
    french: "CC01-1940"
  },
  {
    english: "CC84-75",
    french: "CC84-75"
  },
  {
    english: "RD 7511",
    french: "RD 7511"
  },
  {
    english: "PR 61-632",
    french: "PR 61-632"
  },
  {
    english: "Co 421",
    french: "CO 421"
  },
  {
    english: "POJ-2878",
    french: "Femme-2878"
  },
  {
    english: "PR 11-41",
    french: "PR 11-41"
  },
  {
    english: "MZC 74-275",
    french: "MZC 74-275"
  },
  {
    english: "PR 62-66",
    french: "PR 62-66"
  },
  {
    english: "UB 1/2",
    french: "Ub 1/2"
  },
  {
    english: "UB 15/10",
    french: "UB 15/10"
  },
  {
    english: "UB 881-5",
    french: "UB 881-5"
  },
  {
    english: "UB 477-2",
    french: "UB 477-2"
  },
  {
    english: "BRS Purus",
    french: "Brs chili"
  },
  {
    english: "TME 419",
    french: "TME 419"
  },
  {
    english: "F100",
    french: "F100"
  },
  {
    english: "Gbasumenge",
    french: "Gbasumenge"
  },
  {
    english: "Ofumbachai",
    french: "Ofumbachai"
  },
  {
    english: "Icilcil",
    french: "Icilcil"
  },
  {
    english: "Ebwanaterak",
    french: "Ebwaterak"
  },
  {
    english: "NASE 14",
    french: "NASE 14"
  },
  {
    english: "NASE 3",
    french: "NASE 3"
  },
  {
    english: "NASE 1",
    french: "NASE 1"
  },
  {
    english: "Ccoito",
    french: "Ccoito"
  },
  {
    english: "Salcedo INIA",
    french: "Salcedo Inia"
  },
  {
    english: "Illpa INIA",
    french: "Illpa inia"
  },
  {
    english: "INIA 415 - Pasankalla",
    french: "Inia 415 - Passage"
  },
  {
    english: "INIA 420-Negra Collana",
    french: "Collier Inia 420-Nugran"
  },
  {
    english: "INIA 427 - Amarilla",
    french: "Inia 427 - Jaune"
  },
  {
    english: "INIA 431-Altiplano",
    french: "Inia 431-Altiplano"
  },
  {
    english: "INIA 441- Senor del Huerto",
    french: "Inia 441 - seigneur du jardin"
  },
  {
    english: "13D843",
    french: "13d843"
  },
  {
    english: "14G498",
    french: "14G498"
  },
  {
    english: "13G519",
    french: "13G519"
  },
  {
    english: "BRS 213",
    french: "BRS 213"
  },
  {
    english: "BRS 282",
    french: "BRS 282"
  },
  {
    english: "SL 958",
    french: "SL 958"
  },
  {
    english: "SL 744",
    french: "SL 744"
  },
  {
    english: "SL 525",
    french: "SL 525"
  },
  {
    english: "DM6563 IPRO",
    french: "Dm6563 ipro"
  },
  {
    english: "DM 5958",
    french: "DM 5958"
  },
  {
    english: "22-61 RY",
    french: "22-61 Ry"
  },
  {
    english: "P005T13R",
    french: "P005T13R"
  },
  {
    english: "NSC Leroy RR2Y",
    french: "NSC Leroy RR2Y"
  },
  {
    english: "UA 5612",
    french: "Faire 5612"
  },
  {
    english: "JTN 5503",
    french: "JTN 5503"
  },
  {
    english: "AG 6534",
    french: "AG 6534"
  },
  {
    english: "BMX Garra",
    french: "BMX Garra"
  },
  {
    english: "BMX Icone",
    french: "BMX icone"
  },
  {
    english: "Monsoy M5892",
    french: "Monsie M5892"
  },
  {
    english: "AFS 110RR",
    french: "AFS 110RR"
  },
  {
    english: "TMG 7262 RR",
    french: "TMG 7262 RR"
  },
  {
    english: "BRS 284",
    french: "BRS 284"
  },
  {
    english: "BRS 267",
    french: "BRS 267"
  },
  {
    english: "Chianung 242",
    french: "Chianung 242"
  },
  {
    english: "CH 45",
    french: "CH 45"
  },
  {
    english: "RH 245",
    french: "RH 245"
  },
  {
    english: "Bisi 222",
    french: "Dans le cas 222"
  },
  {
    english: "NK 7328",
    french: "NK 7328"
  },
  {
    english: "PV 61177 SRR",
    french: "PV 61177 SRR"
  },
  {
    english: "PV 61180 RIB",
    french: "PV 61180 COBLE"
  },
  {
    english: "TH6079 VT2P",
    french: "TH6079 VT2P"
  },
  {
    english: "PV 60172 RR",
    french: "PV 60172 RR"
  },
  {
    english: "Agroceres 303",
    french: "Agroceres 303"
  },
  {
    english: "C 929",
    french: "C 929"
  },
  {
    english: "Himalayan 123",
    french: "Himalayan 123"
  },
  {
    english: "C6006",
    french: "C6006"
  },
  {
    english: "Col 17",
    french: "Col 17"
  },
  {
    english: "Dl 507",
    french: "DL 507"
  },
  {
    english: "N 7822",
    french: "N 7822"
  },
  {
    english: "SRM 553",
    french: "SRM 553"
  },
  {
    english: "T7677 VT2P",
    french: "Tabtah"
  },
  {
    english: "T2889 CONV",
    french: "T2889 Conv"
  },
  {
    english: "T6107 VT2P",
    french: "T6107 VT2P"
  },
  {
    english: "UH 615",
    french: "Euh 615"
  },
  {
    english: "H 517",
    french: "H 517"
  },
  {
    english: "Longe 1",
    french: "Longe 1"
  },
  {
    english: "Longe 4",
    french: "Longe 4"
  },
  {
    english: "Longe 6H",
    french: "Longe 6h"
  },
  {
    english: "Longe 8H",
    french: "Longe 8h"
  },
  {
    english: "PAN 67",
    french: "Pan 67"
  },
  {
    english: "DK 8051",
    french: "DK 8051"
  },
  {
    english: "DK 803 1",
    french: "DK 803 1"
  },
  {
    english: "UH 5402",
    french: "Euh 5402"
  },
  {
    english: "WE 2101",
    french: "Nous 2101"
  },
  {
    english: "PAN 7 M - 89",
    french: "Pan 7 m - 89"
  },
  {
    english: "BPI",
    french: "BPI"
  },
  {
    english: "R12",
    french: "R12"
  },
  {
    english: "Criolla Ocarina",
    french: "Ocarina créole"
  },
  {
    english: "Luk’ys Ch’oqhepitus",
    french: "Luk’ys ch’oqhepitus"
  },
  {
    english: "AAC Shirley",
    french: "AAC Shirley"
  },
  {
    english: "AAC Canada Gold Doree",
    french: "AAC Canada Gold Doree"
  },
  {
    english: "Russet Burbank",
    french: "Burbank rousset"
  },
  {
    english: "MS 42.3",
    french: "MS 42.3"
  },
  {
    english: "IPY -8",
    french: "py -8"
  },
  {
    english: "Ct First",
    french: "CT d'abord"
  },
  {
    english: "PV 40",
    french: "PV 40"
  },
  {
    english: "PV 1",
    french: "PV 1"
  },
  {
    english: "AV 2",
    french: "De 2"
  },
  {
    english: "Dannock durn 668",
    french: "Dannock Durn 668"
  },
  {
    english: "Dannock durn 777",
    french: "Dannock Durn 777"
  },
  {
    english: "Pusa 120",
    french: "PUSA 120"
  },
  {
    english: "S-152",
    french: "S-152"
  },
  {
    english: "HS 102",
    french: "HS 102"
  },
  {
    english: "Arka Ashish ( IIHR - 674 )",
    french: "Voir Ashish (IHR - 674)"
  },
  {
    english: "Arka Abha ( BWR 1)",
    french: "Le meilleur abha (port 1)"
  },
  {
    english: "Arka Alok ( BER - 5 )",
    french: "Retour Alok (ber - 5)"
  },
  {
    english: "Arka Vishal ( FM HYB -1)",
    french: "Arka Vishal (Fum Hyb -1)"
  },
  {
    english: "Arka Abhijit ( BRH 2)",
    french: "Arka Abhijit (Grow 2)"
  },
  {
    english: "HS101",
    french: "HS101"
  },
  {
    english: "Pusa Hybrid - 4",
    french: "PUSA HYBRID - 4"
  },
  {
    english: "Pant T-10",
    french: "Pant T-10"
  },
  {
    english: "Pant T-3",
    french: "Pant T-3"
  },
  {
    english: "AC-238",
    french: "AC-238"
  },
  {
    english: "SL 28",
    french: "SL 28"
  },
  {
    english: "SL 14",
    french: "SL 14"
  },
  {
    english: "KP 423",
    french: "KP 423"
  },
  {
    english: "selection 9/Sln.9/S.2790",
    french: "Sélection 9/SLN.9/S.2790"
  },
  {
    english: "Selection 7.3/Sln.7.3",
    french: "Sélection 7.3/SLN.7.3"
  },
  {
    english: "Selection 6/Sln.6",
    french: "Sélection 6/SLN.6"
  },
  {
    english: "Selection 4/Sln.4",
    french: "Sélection 4/SLN.4"
  },
  {
    english: "S288",
    french: "jambe"
  },
  {
    english: "jember S795",
    french: "Jember S795"
  },
  {
    english: "cioccie / Choche",
    french: "cioccie / Choche"
  },
  {
    english: "USDA/USDA762",
    french: "USDA/USDA762"
  },
  {
    english: "Hibrido de Timor (HDT) Tim Tim",
    french: "Timor hybride (THA) Tim Tim"
  },
  {
    english: "303/577 tea clone",
    french: "303/577 Clone de thé"
  },
  {
    english: "6/8 tea clone",
    french: "Clone de thé 6/8"
  },
  {
    english: "31/8 tea clone",
    french: "Clone de thé 31/8"
  },
  {
    english: "108/82 tea clone",
    french: "108/82 Clone de thé"
  },
  {
    english: "100/5 tea clone.",
    french: "100/5 Clone de thé."
  },
  {
    english: "CC 85-92",
    french: "CC 85-92"
  },
  {
    english: "CC 84-75",
    french: "CC 84-75"
  },
  {
    english: "V 71-51",
    french: "V 71-51"
  },
  {
    english: "CC 93-3895",
    french: "CC 93-3895"
  },
  {
    english: "CC 93-4418",
    french: "CC 93-4418"
  },
  {
    english: "CC 92-2198",
    french: "CC 92-2198"
  },
  {
    english: "CC 93-7510",
    french: "CC 93-7510"
  },
  {
    english: "CC 92-2804",
    french: "CC 92-2804"
  },
  {
    english: "CC 87-434",
    french: "CC 87-434"
  },
  {
    english: "CC 93-4181",
    french: "CC 93-4181"
  },
  {
    english: "CC 93-3826",
    french: "CC 93-3826"
  },
  {
    english: "CC 87-505",
    french: "CC 87-505"
  },
  {
    english: "CC 85-57",
    french: "CC 85-57"
  },
  {
    english: "CC 85-47",
    french: "CC 85-47"
  },
  {
    english: "CC 92-2154",
    french: "CC 92-2154"
  },
  {
    english: "CC 92-2188",
    french: "CC 92-2188"
  },
  {
    english: "CC 93-3817",
    french: "CC 93-3817"
  },
  {
    english: "CC 93-7711",
    french: "CC 93-7711"
  },
  {
    english: "CC 01-1940",
    french: "CC 01-1940"
  },
  {
    english: "PR 1141",
    french: "PR 1141"
  },
  {
    english: "CC 86-45",
    french: "CC 86-45"
  },
  {
    english: "sjkjkjk",
    french: "sjkjkjk"
  },
  {
    english: "xyz",
    french: "xyz"
  },
  {
    english: "T-85",
    french: "T-85"
  },
  {
    english: "MH-97-6(Boreda)",
    french: "MH-97-6 (Boreda)"
  },
  {
    english: "Rasa N - 26",
    french: "Taste n - 26"
  },
  {
    english: "NLV- 1",
    french: "Nlv- 1"
  },
  {
    english: "Narendra Mung-1 LGG-460",
    french: "Narendra seulement LGG-460"
  },
  {
    english: "SML-668",
    french: "SML-668"
  },
  {
    english: "RMG-492",
    french: "RMG-492"
  },
  {
    english: "IPM-02-3",
    french: "IPM-02-3"
  },
  {
    english: "HUM-16",
    french: "HUM-16"
  },
  {
    english: "AKM-4",
    french: "AKM-4"
  },
  {
    english: "PKV-Green Gold",
    french: "Or-vert pkv"
  },
  {
    english: "AKM-8802",
    french: "AKM-8802"
  },
  {
    english: "BRSMG Camaleao",
    french: "BRSMG CAMALEAO"
  },
  {
    english: "Ouro Verde MG 2",
    french: "Green Gold Mg 2"
  },
  {
    english: "BRSMG Camaleao",
    french: "BRSMG CAMALEAO"
  },
  {
    english: "Ouro Verde MG 2",
    french: "Green Gold Mg 2"
  },
  {
    english: "GSL - 1",
    french: "GSL - 1"
  },
  {
    english: "HNS - 3",
    french: "HNS - 3"
  },
  {
    english: "PBN - 9501",
    french: "PBN - 9501"
  },
  {
    english: "PBN - 9502",
    french: "PBN - 9502"
  },
  {
    english: "PBN - 2001",
    french: "PBN - 2001"
  },
  {
    english: "GSL - 441",
    french: "GSL - 441"
  },
  {
    english: "HNS - 4",
    french: "HNS - 4"
  },
  {
    english: "Fengyou - 737",
    french: "Fe ng a -737"
  },
  {
    english: "Youyan - 10",
    french: "You Eye -10"
  },
  {
    english: "CS 117",
    french: "CS 117"
  },
  {
    english: "CS 123",
    french: "CS 123"
  },
  {
    english: "CS 141",
    french: "CS 141"
  },
  {
    english: "CATIE-R1",
    french: "Catie-r1"
  },
  {
    english: "CATIE-R4",
    french: "Catie-r4"
  },
  {
    english: "CC-137",
    french: "CC-137"
  },
  {
    english: "ICS-95 T1",
    french: "ICS-95 T1"
  },
  {
    english: "PMCT-58",
    french: "PMCT-58"
  },
  {
    english: "CRIN TC-2",
    french: "Crin TC-2"
  },
  {
    english: "CRIN TC-1",
    french: "Crin TC-1"
  },
  {
    english: "CRIN TC-3",
    french: "Crin TC-3"
  },
  {
    english: "CRIN TC-5",
    french: "Crin TC-5"
  },
  {
    english: "BH 1146",
    french: "BH 1146"
  },
  {
    english: "Esmeralda 86",
    french: "Esmeralda 86"
  },
  {
    english: "JF 90",
    french: "JF 90"
  },
  {
    english: "BR 18 Terena",
    french: "BR 18 Terena"
  },
  {
    english: "Itasca",
    french: "Itasca"
  },
  {
    english: "Bottinia II",
    french: "Bottinia II"
  },
  {
    english: "Winnetou",
    french: "Winnetou"
  },
  {
    english: "AmeriStand 201T",
    french: "Ameristand 201t"
  },
  {
    english: "AmeriStand 435TQ RR",
    french: "Ameristand 435TQ RR"
  },
  {
    english: "AmeriStand 318TQ",
    french: "Amérique 318TQ"
  },
  {
    english: "AmeriStand 419LH Brand",
    french: "Marque Ameristand 419LH"
  },
  {
    english: "AmeriStand 420LH RR Brand",
    french: "Ameristand 420LH RR Marque"
  },
  {
    english: "AmeriStand 480 HVXRR",
    french: "Ameristand 480 hvxrr"
  },
  {
    english: "AmeriStand 481 HVXRR",
    french: "Ameristand 481 hvxrr"
  },
  {
    english: "AmeriStand 445NT",
    french: "Amérique 445NT"
  },
  {
    english: "AmeriStand 457TQ RR",
    french: "Ameristand 457TQ RR"
  },
  {
    english: "AmeriStand 415NT RR",
    french: "Ameristand 415NT RR"
  },
  {
    english: "AmeriStand 416NT RR",
    french: "Ameristand 416NT RR"
  },
  {
    english: "AmeriStand 427TQ",
    french: "Ameristand 427TQ"
  },
  {
    english: "AmeriStand 446NT",
    french: "Amérique 446NT"
  },
  {
    english: "AmeriStand 428TQ",
    french: "Ameristand 428TQ"
  },
  {
    english: "AmeriStand 455TQ RR",
    french: "Ameristand 455TQ RR"
  },
  {
    english: "AmeriStand 518NT",
    french: "Amérique 518NT"
  },
  {
    english: "KP4",
    french: "KP4"
  },
  {
    english: "KG2",
    french: "Kg2"
  },
  {
    english: "TV1",
    french: "TV1"
  },
  {
    english: "TV14",
    french: "TV14"
  },
  {
    english: "TV16",
    french: "TV16"
  },
  {
    english: "TV17",
    french: "TV17"
  },
  {
    english: "TV20",
    french: "TV20"
  },
  {
    english: "TV22",
    french: "TV22"
  },
  {
    english: "UPASI 9  (Arthrey)",
    french: "Versez-moi (arthray)"
  },
  {
    english: "UPASI 1 (Ever green)",
    french: "Upasi 1 (toujours vert)"
  },
  {
    english: "UPASI 10 (Pandian)",
    french: "Télécharges 10 (Putian)"
  },
  {
    english: "UPASI 14 (Singara)",
    french: "Upasi 14 (Singara)"
  },
  {
    english: "UPASI 2 (Jayaram)",
    french: "Upasi 2 (Jairam)"
  },
  {
    english: "UPASI 17 (Swarna)",
    french: "Uppi 1 (doré)"
  },
  {
    english: "UPASI 24",
    french: "Carlin 24"
  },
  {
    english: "UPASI 25",
    french: "Punger 25"
  },
  {
    english: "UPASI 16",
    french: "Verser 16"
  },
  {
    english: "UPASI 27",
    french: "Verser 27"
  },
  {
    english: "UPASI 28 (UPASI 10 * TRI2025)",
    french: "Pun it 28 (jeu de mots 10 * trois2025)"
  },
  {
    english: "Cheyenne e448",
    french: "Cheyenne E448"
  },
  {
    english: "Gs 12",
    french: "GS 12"
  },
  {
    english: "Nairouz (th 99806)",
    french: "Nairouz (TH 99806)"
  },
  {
    english: "Tomaland (th 01308)",
    french: "Tomaland (TH 01308)"
  },
  {
    english: "Tyrmes",
    french: "Fromage"
  },
  {
    english: "S.209",
    french: "S.209"
  },
  {
    english: "Ppp.1-2",
    french: "Ppp.1-2"
  },
  {
    english: "Roc-1",
    french: "Roc-1"
  },
  {
    english: "Ss33",
    french: "Douloureux"
  },
  {
    english: "S.q-5",
    french: "S.Q-5"
  },
  {
    english: "Pet-8",
    french: "Animal de compagnie"
  },
  {
    english: "End-1",
    french: "Fin 1"
  },
  {
    english: "Eur.2-2",
    french: "EUR 2-2"
  },
  {
    english: "Vf-145",
    french: "VF-145"
  },
  {
    english: "Ucx-281",
    french: "UCX-281"
  },
  {
    english: "Bhn 589 (v ff t)*",
    french: "BHN 589 (V FF T) *"
  },
  {
    english: "Celebrity (v ff n t a st)",
    french: "Célébrité (v ff n t a st)"
  },
  {
    english: "Albar ( 57 ) 12 and acrain",
    french: "Écosse (57) 12 et Adly"
  },
  {
    english: "Hamid ( bb - 82)",
    french: "Hamid (BB - 82)"
  },
  {
    english: "Knight ( bb - 90)",
    french: "Knight (BB - 90)"
  },
  {
    english: "Bgrr y guaraní inta bgrr",
    french: "Bgr et guarani inta bgrr"
  },
  {
    english: "Pora 3 inta bgrr",
    french: "Pora 3 tandis que bgrr"
  },
  {
    english: "Guazuncho 4 inta bgrr",
    french: "Guazuncho 4 tandis que bgrr"
  },
  {
    english: "Guazuncho 2000 rr",
    french: "Guazuncho 2000 RR"
  },
  {
    english: "Dp402 bgrr",
    french: "Dp402 bgrr"
  },
  {
    english: "Dp1238 bgrr",
    french: "Dp1238 bgrr"
  },
  {
    english: "Siokra l23",
    french: "Surri Laa"
  },
  {
    english: "Siokra v-16",
    french: "Sioche B-16"
  },
  {
    english: "Sicala v-2",
    french: "Sicala V-2"
  },
  {
    english: "Cs50",
    french: "CS50"
  },
  {
    english: "Sicot 189",
    french: "Sicot 189"
  },
  {
    english: "Sicot f-1",
    french: "Sicot f-1"
  },
  {
    english: "Cnpa ita 90",
    french: "CNPA maintenant"
  },
  {
    english: "Brs ita 96",
    french: "BRS ITA 96"
  },
  {
    english: "Cnpa ita 97",
    french: "CNPA maintenant"
  },
  {
    english: "Brs antares",
    french: "BRS Antares"
  },
  {
    english: "Brs 286",
    french: "BRS 286"
  },
  {
    english: "Brs ita⁄ba",
    french: "Brs ita⁄ba"
  },
  {
    english: "Brs sucupira",
    french: "BRS SUPIRA"
  },
  {
    english: "Dp 1646 b2xf",
    french: "DP 1646 B2XF"
  },
  {
    english: "Dp 1840 b3xf",
    french: "DP 1840 B3XF"
  },
  {
    english: "Dp 1820 b3xf",
    french: "DP 1820 B3XF"
  },
  {
    english: "Dp 1845 b3xf",
    french: "DP 1845 B3XF"
  },
  {
    english: "Ng 5711 b3xf",
    french: "De 5711 b3xf"
  },
  {
    english: "Ng 3406 b2xf",
    french: "De 3406 b2xf"
  },
  {
    english: "Ng 4545 b2xf",
    french: "De 4545 b2xf"
  },
  {
    english: "Ng 4936",
    french: "De 4936"
  },
  {
    english: "B3xf",
    french: "Réfléchi"
  },
  {
    english: "Phy 400",
    french: "Phy 400"
  },
  {
    english: "Phy 444 wrf",
    french: "Phy 444 WRF"
  },
  {
    english: "Phy 480 w3fe",
    french: "Phy 480 W3FE"
  },
  {
    english: "Phy 350 w3fe",
    french: "Phy 350 W3FE"
  },
  {
    english: "W3fe",
    french: "Vorace"
  },
  {
    english: "Lh 900",
    french: "LH 900"
  },
  {
    english: "F414",
    french: "F414"
  },
  {
    english: "F 505",
    french: "F 505"
  },
  {
    english: "H 777",
    french: "H 777"
  },
  {
    english: "RS–810",
    french: "RS - 810"
  },
  {
    english: "G-cot –12",
    french: "G-Cot –12"
  },
  {
    english: "MCU– 5VT",
    french: "MCU - 5VT"
  },
  {
    english: "LK–861",
    french: "LK - 861"
  },
  {
    english: "IHCAFE-90",
    french: "Ihcafe-90"
  },
  {
    english: "S-541",
    french: "S-541"
  },
  {
    english: "S-200",
    french: "S-200"
  },
  {
    english: "S-400",
    french: "S-400"
  },
  {
    english: "LBGB-77",
    french: "LBGB-77"
  },
  {
    english: "RIO DULCE INTA",
    french: "Rio Dulce Inta"
  },
  {
    english: "IPORA GUAZU",
    french: "IPORA GUAZU"
  },
  {
    english: "LBH-8-INTA",
    french: "Civilisé"
  },
  {
    english: "LB-66-INTA",
    french: "À Batanta"
  },
  {
    english: "S-208",
    french: "S-208"
  },
  {
    english: "C\/W 4440",
    french: "C \W 4440"
  },
  {
    english: "S-317",
    french: "S-317"
  },
  {
    english: "Mt.3697",
    french: "Mt.3697"
  },
  {
    english: "Cabai gendot",
    french: "Poivre"
  },
  {
    english: "cabai katokkon",
    french: "Katokkon chili"
  },
  {
    english: "cabai domba",
    french: "chili mouton"
  },
  {
    english: "cabai hiyung",
    french: "Hiyung Chili"
  },
  {
    english: "lampung",
    french: "Lampe"
  },
  {
    english: "jalapeno",
    french: "Aquatique"
  },
  {
    english: "co1",
    french: "CO1"
  },
  {
    english: "k1",
    french: "K1"
  },
  {
    english: "hindupur-s7",
    french: "Hindupur-7"
  },
  {
    english: "tadappally",
    french: "tadappally"
  },
  {
    english: "sattur-s4",
    french: "Sattur-4"
  },
  {
    english: "Batavia lettuce",
    french: "Batavia Laitue"
  },
  {
    english: "pisang",
    french: "banane"
  },
  {
    english: "RB867515",
    french: "Évasé 15"
  },
  {
    english: "RB966928",
    french: "Rabtab"
  },
  {
    english: "SP81-3250",
    french: "SP81-3250"
  },
  {
    english: "Yellow Queen F1",
    french: "Reine jaune F1"
  },
  {
    english: "N-2-4-1",
    french: "N-2-4-1"
  },
  {
    english: "S-148",
    french: "S-148"
  },
  {
    english: "PHB 2884",
    french: "PHB 2884"
  },
  {
    english: "PHB 2168",
    french: "Phb 2168"
  },
  {
    english: "PSB 164",
    french: "PSB 164"
  },
  {
    english: "PCB 164",
    french: "PCB 164"
  },
  {
    english: "Stamina gt5",
    french: "Endurance gt5"
  },
  {
    english: "titan7",
    french: "Gratter"
  },
  {
    english: "303/557 clone",
    french: "303/557 Clone"
  },
  {
    english: "11/4 clone",
    french: "11/4 clone"
  },
  {
    english: "108/82 clone",
    french: "108/82 Clone"
  },
  {
    english: "7/9 clone",
    french: "Clone 7/9"
  },
  {
    english: "100/5 clone",
    french: "100/5 clone"
  },
  {
    english: "31/8 clone",
    french: "31/8 clone"
  },
  {
    english: "12/19 clone",
    french: "Clone 12/19"
  },
  {
    english: "12/12 clone",
    french: "12/12 Clone"
  },
  {
    english: "6/8 clone",
    french: "Clone 6/8"
  },
  {
    english: "6/10 clone",
    french: "Clone 6/10"
  },
  {
    english: "31/11 clone",
    french: "31/11 Clone"
  },
  {
    english: "Nyelungkup",
    french: "Briller"
  },
  {
    english: "PAU Baramasi",
    french: "Pau Baramas"
  },
  {
    english: "Tillering stage",
    french: "Étape de solling"
  },
  {
    english: "Stem elongation",
    french: "Allongement des tiges"
  },
  {
    english: "Panicle initiation",
    french: "Initiation de la panicule"
  },
  {
    english: "Booting stage",
    french: "Étape de démarrage"
  },
  {
    english: "Flowering stage",
    french: "Phase de floraison"
  },
  {
    english: "Milking stage",
    french: "Étape de traite"
  },
  {
    english: "Dough stage",
    french: "Étape de la pâte"
  },
  {
    english: "Mature stage",
    french: "Étape mature"
  },
  {
    english: "Ramsai",
    french: "Ramsai"
  },
  {
    english: "Golsai",
    french: "Golsaï"
  },
  {
    english: "Chibesai",
    french: "Festival Tiva"
  },
  {
    english: "Saune",
    french: "Sauna"
  },
  {
    english: "Bharlange",
    french: "Va remplir"
  },
  {
    english: "Jirmale",
    french: "Jirmale"
  },
  {
    english: "Dambersi",
    french: "Damens"
  },
  {
    english: "Ramala",
    french: "Raamala"
  },
  {
    english: "TV 23",
    french: "TV 23"
  },
  {
    english: "UPASI 9 (Arthrey)",
    french: "Versez-moi (arthray)"
  },
  {
    english: "UPASI 1 (Ever green)",
    french: "Upasi 1 (toujours vert)"
  },
  {
    english: "UPASI 10 (Pandian)",
    french: "Télécharges 10 (Putian)"
  },
  {
    english: "UPASI 14 (Singara)",
    french: "Upasi 14 (Singara)"
  },
  {
    english: "UPASI 2 (Jayaram)",
    french: "Upasi 2 (Jairam)"
  },
  {
    english: "UPASI 17 (Swarna)",
    french: "Uppi 1 (doré)"
  },
  {
    english: "Masuli",
    french: "Masulu"
  },
  {
    english: "Khumal 4",
    french: "Khumal 4"
  },
  {
    english: "Ram",
    french: "RAM"
  },
  {
    english: "Khumal 8",
    french: "Khulal 8"
  },
  {
    english: "Chhommrong",
    french: "Chhommrong"
  },
  {
    english: "Lekali Dhan 3",
    french: "Lac Dhan 3"
  },
  {
    english: "Radha 4",
    french: "Radha 4"
  },
  {
    english: "Janaki",
    french: "Janaki"
  },
  {
    english: "Judi",
    french: "Judi"
  },
  {
    english: "Sarju 52",
    french: "Série 52"
  },
  {
    english: "Kufri jyoti",
    french: "Déconcertant"
  },
  {
    english: "Kufri sindhuri",
    french: "Kufri Sindhuri"
  },
  {
    english: "Khumal Upahar",
    french: "Cadeau"
  },
  {
    english: "Jankdev",
    french: "Janakdev"
  },
  {
    english: "Khumal Seto-1",
    french: "Seto-1 humain"
  },
  {
    english: "Khumal Bikas",
    french: "Khumal bikas"
  },
  {
    english: "Birendra sagar",
    french: "Birendra Sagar"
  },
  {
    english: "Palpa",
    french: "Palpe"
  },
  {
    english: "Dhankuta ",
    french: "Dhankuta"
  },
  {
    english: "Taplejung ",
    french: "Taplejung"
  },
  {
    english: "Diktel ",
    french: "Protel"
  },
  {
    english: "Basrai dwarf",
    french: "Nain"
  },
  {
    english: "dwarf cavendish",
    french: "nain cavendish"
  },
  {
    english: "william hybrid",
    french: "William hybride"
  },
  {
    english: "malbhog",
    french: "Carbone"
  },
  {
    english: "dhusre",
    french: "Autres"
  },
  {
    english: "mungre",
    french: "seulement"
  },
  {
    english: "marche",
    french: "marches"
  },
  {
    english: "dhose",
    french: "dose"
  },
  {
    english: "hazari",
    french: "hazari"
  },
  {
    english: "Kathmandu local",
    french: "L'histoire de l'histoire"
  },
  {
    english: "Pahilo Surjo",
    french: "Premier soleil"
  },
  {
    english: "SS-72 (Super Shakti 72)",
    french: "SS-72 (Super Shakti 72)"
  },
  {
    english: "KFSH-1 (Kanchan F1)",
    french: "Kafash-1 (Kanchan F1)"
  },
  {
    english: "Poshilo makai jawa",
    french: "Poshilo makai java"
  },
  {
    english: "Srijan-1",
    french: "Création-1"
  },
  {
    english: "Srijan-2",
    french: "Création-2"
  },
  {
    english: "Srijan-3",
    french: "Création-3"
  },
  {
    english: "Srijan-4",
    french: "Création-4"
  },
  {
    english: "Madhuri",
    french: "Madhuri"
  },
  {
    english: "Kalyan ",
    french: "Kalyan"
  },
  {
    english: "Pratiksha ",
    french: "Attendez"
  },
  {
    english: "Pratigya",
    french: "Gage"
  },
  {
    english: "Zinc Gahun 2",
    french: "Atteindre le zinc"
  },
  {
    english: "Bheri-Ganga",
    french: "Beli-gird"
  },
  {
    english: "Himganga",
    french: "Himganga"
  },
  {
    english: "Khumal-Shakti",
    french: "Puissance de Khumal"
  },
  {
    english: "Borlaug 2020",
    french: "Borlaug 2020"
  },
  {
    english: "Pusa Ruby",
    french: "Pusa Ruby"
  },
  {
    english: "Arka Abha:",
    french: "Le meilleur abha:"
  },
  {
    english: "Srijana",
    french: "Création"
  },
  {
    english: "Roma VF",
    french: "Roma VF"
  },
  {
    english: "Nepali Oxheart",
    french: "Népalais Oxheart"
  },
  {
    english: "Lisbon",
    french: "Lisbonne"
  },
  {
    english: "Nepali Round",
    french: "Népalais"
  },
  {
    english: "Nibuwa",
    french: "Nibuwa"
  },
  {
    english: "Eureka",
    french: "Eureka"
  },
  {
    english: "Citron",
    french: "Citron"
  },
  {
    english: "Jhambiri (rough lemon)",
    french: "Jhambiri (citron rugueux)"
  },
  {
    english: "Nepali oblong",
    french: "Népalais oblong"
  },
  {
    english: "Nepal",
    french: "Népal"
  },
  {
    english: "India",
    french: "Inde"
  },
  {
    english: "Soil and Climatic Requirements",
    french: "Soil et exigences climatiques"
  },
  {
    english: "Hadi ( okra - leaf barakat )",
    french: "Hadi (aqra - lev barakat)"
  },
  {
    english: "Khandwa-2",
    french: "Khandwa-2"
  },
  {
    english: "Badnawar-1",
    french: "Badnawar-1"
  },
  {
    english: "Rs-810",
    french: "RS-810"
  },
  {
    english: "G-cot -12",
    french: "G-Cot -12"
  },
  {
    english: "Mcu- 5vt",
    french: "MCU- 5VT"
  },
  {
    english: "Lk-861",
    french: "LK-861"
  },
  {
    english: "TV 1",
    french: "TV 1"
  },
  {
    english: "Kopati 1",
    french: "Creuser 1"
  },
  {
    english: "C x R",
    french: "C x R"
  },
  {
    english: "Bourbon\/ moka",
    french: "Bourbon \moka"
  },
  {
    english: "karpoora poovan",
    french: "Karpoora Povan"
  },
  {
    english: "Basrai",
    french: "Basrai"
  },
  {
    english: "Singapuri",
    french: "Singapour"
  },
  {
    english: "Chakrakeli",
    french: "Hackpack"
  },
  {
    english: "Mundo Nova (Silang Typica-Bourbon from Brazil)",
    french: "Mundo Nova (Silang typica-Bourbon du Brésil)"
  },
  {
    english: 'Catimor Lines (Andungsari Ateng Jaluk Kartika\/Catuai\/Katai - mix breed arabica-robusta).',
    french: "Lignées Catimor (Andungsari Ateng Jaluk Kartika\/Catuai\/Katai - mélange de races arabica-robusta)."
  },
  {
    english: "Maran",
    french: "Maran"
  },
  {
    english: "Nadia",
    french: "Nadia"
  },
  {
    english: "Karakkal",
    french: "Karakkal"
  },
  {
    english: "Ernad Chernad",
    french: "Ernad Hernad"
  },
  {
    english: "China",
    french: "Chine"
  },
  {
    english: "Rio-De-Janeiro",
    french: "Rio de Janeiro"
  },
  {
    english: "Sleeva Local",
    french: "Sleeva local"
  },
  {
    english: "Narasapattam",
    french: "Narasapattan"
  },
  {
    english: "Varadha",
    french: "Inconfortable"
  },
  {
    english: "Himachal",
    french: "Himachal"
  },
  {
    english: "IISR",
    french: "Iisr"
  },
  {
    english: "Dusehri",
    french: "Dusehri"
  },
  {
    english: "Alphanso",
    french: "Alphanso"
  },
  {
    english: "LANGRA",
    french: "LANGRA"
  },
  {
    english: "Amarpali",
    french: "Amarpali"
  },
  {
    english: "Mallika",
    french: "Mallika"
  },
  {
    english: "Bombay green",
    french: "Bombay green"
  },
  {
    english: "Fazli",
    french: "Fazli"
  },
  {
    english: "Samarbehisht  Chausa",
    french: "Samarbehisht Chana"
  },
  {
    english: "Neelam",
    french: "Neelam"
  },
  {
    english: "Sindhu",
    french: "Sindhu"
  },
  {
    english: "Arka aruna",
    french: "Arka Aruna"
  },
  {
    english: "Arka Puneet",
    french: "Arka Puneet"
  },
  {
    english: "Early kunwar",
    french: "Early Kunwar"
  },
  {
    english: "Early Synthetic",
    french: "Synthétique précoce"
  },
  {
    english: "Pusa Katki",
    french: "Pusa Katki"
  },
  {
    english: "Pant Gobhi-2",
    french: "Pant Gobhi-2"
  },
  {
    english: "Pant Gobhi-3",
    french: "Pant Gobhi-3"
  },
  {
    english: "Pusa Synthetic",
    french: "Synthétique pusa"
  },
  {
    english: "Pant Shubhra",
    french: "Pantalon shubhra"
  },
  {
    english: "Punjab Giant-26",
    french: "Punjab Giant-26"
  },
  {
    english: "Pusa Snowball-1",
    french: "Pusa Snowball-1"
  },
  {
    english: "Pusa Snowball-2",
    french: "Pusa Snowball-2"
  },
  {
    english: "Sonwball-16",
    french: "Boule de neige-16"
  },
  {
    english: "Dania Kalimpong",
    french: "Dania Kalimpong"
  },
  {
    english: "BUCK MAXIFLOR",
    french: "BUCK MAXIFLOR"
  },
  {
    english: "SURSEM ORION",
    french: "SURSEM ORION"
  },
  {
    english: "Light Speckled Kidney Bean",
    french: "Haricot rénal moucheté"
  },
  {
    english: "Dark Red Kidney Bean",
    french: "Haricot rouge foncé"
  },
  {
    english: "Pink Kidney Bean",
    french: "Haricot rénal rose"
  },
  {
    english: "Yellow Kidney Beans",
    french: "Haricots rénaux jaunes"
  },
  {
    english: "Malviya - 137",
    french: "Malaviya - 137"
  },
  {
    english: "Arun",
    french: "Arun"
  },
  {
    english: "VL Rajma 125",
    french: "Val Rajma 125"
  },
  {
    english: "Arka Komal",
    french: "Comal arrière"
  },
  {
    english: "Ooty-1",
    french: "Ooty-1"
  },
  {
    english: "Pusa Himalatha",
    french: "Pusa Himalatha"
  },
  {
    english: "Pusa Parvati",
    french: "Pusa Parvat"
  },
  {
    english: "Phule Surekha",
    french: "Premier Surekh"
  },
  {
    english: "Pusa majesty",
    french: "Pusa Majesté"
  },
  {
    english: "Pusa giant",
    french: "Géant pusa"
  },
  {
    english: "Pusa delcious",
    french: "Pusa délicieux"
  },
  {
    english: "Pusa drawf",
    french: "Pusa nain"
  },
  {
    english: "Coorg honey",
    french: "Coorg Honey"
  },
  {
    english: "Honey dew",
    french: "Miellat"
  },
  {
    english: "Golden queen",
    french: "Reine dorée"
  },
  {
    english: "Amasya beyazı",
    french: "Amasya beyazi"
  },
  {
    english: "Antep karası",
    french: "Antep Karasi"
  },
  {
    english: "Bahceli karas",
    french: "Bahceli Karas"
  },
  {
    english: "Cavus",
    french: "Cavus"
  },
  {
    english: "Cevsen",
    french: "Cevsen"
  },
  {
    english: "Crimson",
    french: "Cramoisi"
  },
  {
    english: "Dimrit",
    french: "Hiver"
  },
  {
    english: "Hafizali",
    french: "Hafezel"
  },
  {
    english: "Karasabi",
    french: "Karsabi"
  },
  {
    english: "Yamuna Safed-2",
    french: "Yamuna Safed-2"
  },
  {
    english: "Bhima Omkar",
    french: "Bhima Omkar"
  },
  {
    english: "Godavari",
    french: "Godavari"
  },
  {
    english: "Baswant",
    french: "Mouchoir"
  },
  {
    english: "Lahsun 2",
    french: "Ail 2"
  },
  {
    english: "Eva",
    french: "Eva"
  },
  {
    english: "Gala",
    french: "Gala"
  },
  {
    english: "Fuji",
    french: "Fuji"
  },
  {
    english: "Honeycrisp",
    french: "Miel"
  },
  {
    english: "Red Delicious",
    french: "Rouge délicieux"
  },
  {
    english: "Vitoria",
    french: "Vitoria"
  },
  {
    english: "Timpson",
    french: "Tissy"
  },
  {
    english: "Red globe",
    french: "Globe rouge"
  },
  {
    english: "Italia",
    french: "Italie"
  },
  {
    english: "Thampson",
    french: "Thampson"
  },
  {
    english: "Crimson red",
    french: "rouge cramoisi"
  },
  {
    english: "Zinc Gahun 1",
    french: "Zinc Gahun 1"
  },
  {
    english: "Ghaiya-3",
    french: "Ghaiya-3"
  },
  {
    english: "Hardinath-4",
    french: "Hardinath-4"
  },
  {
    english: "Hardinath-5",
    french: "Hardinath-5"
  },
  {
    english: "Hardinath-6",
    french: "Hardinath-6"
  },
  {
    english: "Khumal Basmati-16",
    french: "Khumal Basmati-16"
  },
  {
    english: "Ganga Sagar-1",
    french: "Ganga Sagar-1"
  },
  {
    english: "Ganga Sagar-2",
    french: "Ganga Sagar-2"
  },
  {
    english: "Cardinal",
    french: "Cardinale"
  },
  {
    english: "Khumal Ujjwol",
    french: "Khumal Ujjwol"
  },
  {
    english: "Bajhang local",
    french: "Bajhang local"
  },
  {
    english: "Kalyan",
    french: "Kalyan"
  },
  {
    english: "Pratiksha",
    french: "Pratiksha"
  },
  {
    english: "Dhankuta",
    french: "Dhankuta"
  },
  {
    english: "Taplejung",
    french: "Taplejung"
  },
  {
    english: "Diktel",
    french: "Diktel"
  },
  {
    english: "Navel orange",
    french: "Orange au nombril"
  },
  {
    english: "Blood orange",
    french: "Orange sanguine"
  },
  {
    english: "Tanjerine",
    french: "Tangerine"
  },
  {
    english: "Acid less orange",
    french: "Acide moins orange"
  },
  {
    english: "Mandarin",
    french: "Mandarin"
  },
  {
    english: "Seville orange",
    french: "Séville Orange"
  },
  {
    english: "Bahia",
    french: "Bahia"
  },
  {
    english: "Patan red",
    french: "Patan rouge"
  },
  {
    english: "Nuwakot Local",
    french: "Nuwakot local"
  },
  {
    english: "White Globe",
    french: "Globe blanc"
  },
  {
    english: "Castillo®",
    french: "Castillo®"
  },
  {
    english: "tukdah 246",
    french: "tukdah 246"
  },
  {
    english: "CP First",
    french: "CP d'abord"
  },
  {
    english: "Tv 14",
    french: "Tv 14"
  },
  {
    english: "Bannock Burn 668",
    french: "Bannock Burn 668"
  },
  {
    english: "Bannock Burn 777",
    french: "Bannock Burn 777"
  },
  {
    english: "TRS1",
    french: "TRS1"
  },
  {
    english: "TR14",
    french: "TR14."
  },
  {
    english: "TR15",
    french: "TR15"
  },
  {
    english: "Matti",
    french: "Matti"
  },
  {
    english: "Typica (Bergandal Sidikalang - Sumatera).",
    french: "Typica (bergandal sidikalang - sumatra)."
  },
  {
    english: "Hibrido de Timor (HDT Cross breed Arabica-Robusta; Tim-tim Aceh)",
    french: "Hibrido de Timor (HDT Cross Breed Arabica-Robusta; Aceh Teams)"
  },
  {
    english: "Linie S (S-288 S-795 Andungsari Komasti; Aceh Flores)",
    french: "LINIE S (S-288 S-795 Andungsalar Komast;"
  },
  {
    english: "Ethiopian lines (Rambung Abyssina USDA)",
    french: "Lignes éthiopiennes (Rambung Abyssina USDA)"
  },
  {
    english: "Jawa (Java Coffee !700AD)",
    french: "Jawa (Java Coffee !700AD)"
  },
  {
    english: "Wynad Local",
    french: "Wynad local"
  },
  {
    english: "Punjab Giant-35",
    french: "Punjab Giant-35"
  },
  {
    english: "VANDERHAVE VDH 480",
    french: "VANDERHAVE VDH 480"
  },
  {
    english: "NIDERA PARADISE 6",
    french: "PARADIS NIDERA 6"
  },
  {
    english: "DEKALB DEKASOL 3881",
    french: "DEKALB DEKASOL 3881"
  },
  {
    english: "Carioca Kidney Bean (IAC 1850)",
    french: "Haricot rénal carioca (IAC 1850)"
  },
  {
    english: "P.D.R -14 (Uday)",
    french: "P.D.R -14 (Uday)"
  },
  {
    english: "V.L - 63",
    french: "V.L - 63"
  },
  {
    english: "Ambar (I.I.P.R -96-4)",
    french: "Ambar (I.I.P.R -96-4)"
  },
  {
    english: "Utkarsh (I.I.P.R - 98-5)",
    french: "Utkarsh (I.I.P.R - 98-5)"
  },
  {
    english: "RBL 6",
    french: "RBL 6"
  },
  {
    english: "YCD1",
    french: "YCD1"
  },
  {
    english: "TKD1",
    french: "TKD1"
  },
  {
    english: "Pant Anupama* (UPF 191)",
    french: "Pant Anupama * (UPF 191)"
  },
  {
    english: "Co2",
    french: "Co2"
  },
  {
    english: "Co3",
    french: "Co3"
  },
  {
    english: "Co4",
    french: "Co4"
  },
  {
    english: "Erenkoy beyazı",
    french: "Erenkoy blanc"
  },
  {
    english: "TSH 565",
    french: "TSH 565"
  },
  {
    english: "ICS 95",
    french: "ICS 95"
  },
  {
    english: "BMI 67",
    french: "BMI 67"
  },
  {
    english: "IMC 67",
    french: "IMC 67"
  },
  {
    english: "ICS 1",
    french: "ICS 1"
  },
  {
    english: "ICS 6",
    french: "ICS 6"
  },
  {
    english: "ICS 39",
    french: "ICS 39"
  },
  {
    english: "UF 667",
    french: "UF 667"
  },
  {
    english: "PG 18",
    french: "PG 18"
  },
  {
    english: "BRS ISIS",
    french: "BRS ISIS"
  },
  {
    english: "BRS NUBIA",
    french: "BRS NUBIE"
  },
  {
    english: "CSV 21S",
    french: "CSV 21S"
  },
  {
    english: "CSV 23R",
    french: "CSV 23R"
  },
  {
    english: "NM 92",
    french: "NM 92"
  },
  {
    english: "NM 94",
    french: "NM 94"
  },
  {
    english: "VC 6372",
    french: "VC 6372"
  },
  {
    english: "VC 3960 - 80",
    french: "VC 3960 - 80"
  },
  {
    english: "CN9-5",
    french: "CN9-5"
  },
  {
    english: "VC6173 B -10",
    french: "VC6173 B -10"
  },
  {
    english: "VC1973A",
    french: "VC1973A"
  },
  {
    english: "VC6173B-11",
    french: "VC6173B-11"
  },
  {
    english: "VC6173A",
    french: "VC6173A"
  },
  {
    english: "Wheat (Nepal)",
    french: "Blé (Népal)"
  },
  {
    english: "Sorghum (Nepal)",
    french: "Sorghum (Népal)"
  },
  {
    english: "Green gram (Nepal)",
    french: "Gram vert (Népal)"
  },
  {
    english: "Nutmeg&mace (Nepal)",
    french: "Noix de muscade et mace (Népal)"
  },
  {
    english: "Tomato (Nepal)",
    french: "Tomate (Népal)"
  },
  {
    english: "Lemon (Nepal)",
    french: "Citron (Népal)"
  },
  {
    english: "Onion (Nepal)",
    french: "Oignon (Népal)"
  },
  {
    english: "Banana (Nepal)",
    french: "Banane (Népal)"
  },
  {
    english: "Pearl millet (Nepal)",
    french: "Millet perlé (Népal)"
  },
  {
    english: "Ginger (Nepal)",
    french: "Gingembre (Népal)"
  },
  {
    english: "Garlic (Nepal)",
    french: "Ail (Népal)"
  },
  {
    english: "Rapeseed ( Nepal )",
    french: "Pançais (Népal)"
  },
  {
    english: "Our recommendation",
    french: "Notre recommandation"
  },
  {
    english: "Your soil pH",
    french: "Votre pH de sol"
  },
  {
    english: "Your soil organic carbon",
    french: "Votre sol biologique du sol"
  },
  {
    english: "Your soil nitrogen",
    french: "Votre sol azote"
  },
  {
    english: "Your soil phosphorus",
    french: "Votre phosphore de sol"
  },
  {
    english: "Your soil potassium",
    french: "Votre sol potassium"
  },
  {
    english: "Your soil sulfur",
    french: "Votre sol soufre"
  },
  {
    english: "Days",
    french: "Jours"
  },
  {
    english: "Date",
    french: "Date"
  },
  {
    english: "Area Of Request",
    french: "Zone de demande"
  },
  {
    english: "Maize/Corn (Uganda)",
    french: "Maïs/maïs (Ouganda)"
  },
  {
    english: "Sugar cane (Colombia)",
    french: "Canne à sucre (Colombie)"
  },
  {
    english: "Sugar cane (India)",
    french: "Canne à sucre (Inde)"
  },
  {
    english: "sugarcane(brazil)",
    french: "canne à sucre (Brésil)"
  },
  {
    english: "Banana(indonesia)",
    french: "Banane (Indonésie)"
  },
  {
    english: "Lettuce(Libya)",
    french: "Laitue (Libye)"
  },
  {
    english: "Soya (India)",
    french: "Soja (Inde)"
  },
  {
    english: "Days after sowing when pest was detected",
    french: "Jours après le semis lorsque le ravageur a été détecté"
  },
  {
    english: "False codling moth",
    french: "Faux papillon de codling"
  },
  {
    english: "Scales",
    french: "Balance"
  },
  {
    english: "FCM larvae tunnel into the fruit, leaving behind a characteristic entry hole and a brown.",
    french: "Tunnel de larves FCM dans le fruit, laissant derrière lui un trou d'entrée caractéristique et un brun."
  },
  {
    english: "Corky patch on the fruit surface feeding on the pulp and seeds.",
    french: "Patch Corky sur la surface des fruits se nourrissant de la pulpe et des graines."
  },
  {
    english: "Larvae can cause fruit to drop prematurely from the tree.",
    french: "Les larves peuvent faire tomber les fruits prématurément de l'arbre."
  },
  {
    english: "Thrips feed on the leaves of avocado trees, causing them to become distorted, curled, and discolored.",
    french: "Les thrips se nourrissent des feuilles des avocats, les faisant se déformer, bouclés et décolorés."
  },
  {
    english: "The leaves may also have a silvery appearance.",
    french: "Les feuilles peuvent également avoir une apparence argentée."
  },
  {
    english: " It can damage the flowers of avocado trees, resulting in reduced fruit set and yield.",
    french: "Il peut endommager les fleurs des avocats, entraînant une réduction des fruits et un rendement."
  },
  {
    english: "Scales feed on the sap of avocado leaves, causing them to turn yellow and wilt.",
    french: "Les échelles se nourrissent de la sève des feuilles d'avocat, les faisant devenir jaunes et flétris."
  },
  {
    english: "The leaves may also have a sticky residue on them and it can cause damage to the bark of avocado trees, resulting in cracks and lesions.",
    french: "Les feuilles peuvent également avoir un résidu collant sur eux et cela peut endommager l'écorce des avocats, entraînant des fissures et des lésions."
  },
  {
    english: "This can lead to reduced tree vigor and yield.",
    french: "Cela peut entraîner une vigueur et un rendement réduits."
  },
  {
    english: "Fruit flies lay their eggs in the skin of the avocado fruit, resulting in small puncture marks on the surface, The eggs hatch into larvae, which feed on the flesh of the avocado fruit.",
    french: "Les mouches des fruits pondent leurs œufs dans la peau de l'avocat, entraînant de petites marques de perforation à la surface, les œufs éclosent en larves, qui se nourrissent de la chair de l'avocat."
  },
  {
    english: "This can result in the fruit becoming soft and mushy, and may also cause premature ripening and In severe cases of fruit fly infestation.",
    french: "Cela peut entraîner le fait que les fruits deviennent doux et pâteux, et peuvent également provoquer une maturation prématurée et dans des cas graves d'infestation de mouches des fruits."
  },
  {
    english: "The avocado fruit may drop prematurely from the tree.",
    french: "Le fruit de l'avocat peut tomber prématurément de l'arbre."
  },
  {
    english: "Root rot",
    french: "Pourriture des racines"
  },
  {
    english: "Cercospora Fruit Spot",
    french: "Cercospora Fruit Spot"
  },
  {
    english: "Scab disease",
    french: "Maladie de la gale"
  },
  {
    english: "The first signs of the disease are observed in the tree canopy.",
    french: "Les premiers signes de la maladie sont observés dans la canopée des arbres."
  },
  {
    english: "Leaves are small, pale green, often wilted with brown tips, and drop readily.",
    french: "Les feuilles sont petites, vert pâle, souvent flétries de pointes brunes et tombent facilement."
  },
  {
    english: "Shoots die back from the tips, and eventually the tree is reduced to a bare framework of dying branches.",
    french: "Les pousses meurent des pointes, et finalement l'arbre est réduit à un cadre nu de branches mourantes."
  },
  {
    english: "Plants can get anthracnose at any stage, but it causes the most damage between flowering and harvesting.",
    french: "Les plantes peuvent obtenir l'anthracnose à n'importe quel stade, mais cela provoque le plus de dégâts entre la floraison et la récolte."
  },
  {
    english: "Dry spots, dark brown in color, form on the skin, leading to abnormal development.",
    french: "Des taches sèches, de couleur brun foncé, se forment sur la peau, conduisant à un développement anormal."
  },
  {
    english: "In severe attacks, the young fruits drop.",
    french: "Dans de graves attaques, les jeunes fruits tombent."
  },
  {
    english: "Symptoms occur on leaves, fruit, twigs and fruit stems at any time during the growing season",
    french: "Les symptômes se produisent sur les feuilles, les fruits, les brindilles et les tiges de fruits à tout moment pendant la saison de croissance"
  },
  {
    english: "Small, light-yellow spots later changing to reddish-brown appear on fruits and leaves which eventually become hard and crack.",
    french: "De petits taches jaune légère se changeant plus tard en brun rougeâtre apparaissent sur des fruits et des feuilles qui finissent par devenir durs et craquer."
  },
  {
    english: "On fruit, the first sign of infection is a darkening of the epidermis followed by swelling of the underlying tissues which raises a small dark spot.",
    french: "Sur les fruits, le premier signe d'infection est un assombrissement de l'épiderme suivi d'un gonflement des tissus sous-jacents qui soulève une petite tache sombre."
  },
  {
    english: "Symptoms on fruit initially appear as corky, raised, oval or irregular shaped brown to purplish-brown spots.",
    french: "Les symptômes sur les fruits apparaissent initialement comme des taches brun-bruns à liège, surélevées, ovales ou irrégulières."
  },
  {
    english: "As the disease progresses, spots enlarge and coalesce to form large rough areas over the fruit surface.",
    french: "Au fur et à mesure que la maladie progresse, les taches s'élargissent et fusionnent pour former de grandes zones rugueuses sur la surface des fruits."
  },
  {
    english: "Cracking of these rough areas may allow secondary organisms to penetrate and rot the fruit.",
    french: "La fissuration de ces zones rugueuses peut permettre aux organismes secondaires de pénétrer et de pourrir les fruits."
  },
  {
    english: "Pea Aphids",
    french: "Pucerons du pois"
  },
  {
    english: "Pea Stem fly",
    french: "Mouche de la tige de pois"
  },
  {
    english: "Pea Moth",
    french: "Papillon du pois"
  },
  {
    english: "Pea Weevil/ bruchid",
    french: "Charançon du pois/ bruchidé"
  },
  {
    english: "Pea Thrips",
    french: "Thrips de pois"
  },
  {
    english: "A colony consists of winged and wingless adults and various sizes of nymphs. Aphids may be black, yellow, or pink, but mostly are various shades of green.",
    french: "Une colonie se compose d'adultes ailés et sans ailes et de différentes tailles de nymphes.Les pucerons peuvent être noirs, jaunes ou roses, mais sont principalement diverses nuances de vert."
  },
  {
    english: "Feeding by large numbers discolors foliage, curls leaves, and damages developing buds.",
    french: "L'alimentation par un grand nombre découvre le feuillage, les boucles des feuilles et les dommages en développement des bourgeons."
  },
  {
    english: "They suck the sap of the cells, owing to which the leaves turn pale and yellow.",
    french: "Ils sucent la sève des cellules, en raison de laquelle les feuilles deviennent pâles et jaunes."
  },
  {
    english: "Larvae of the insect make a tunnel in the leaf, causing severe damage.",
    french: "Les larves de l'insecte font un tunnel dans la feuille, causant de graves dommages."
  },
  {
    english: "The large number of tunnels made by the larvae between the lower and upper epidermis interferes with photosynthesis and the proper growth of the plants, making them look unattractive.",
    french: "Le grand nombre de tunnels fabriqués par les larves entre l'épiderme inférieur et supérieur interfère avec la photosynthèse et la bonne croissance des plantes, ce qui les rend peu attrayants."
  },
  {
    english: "Drying dropping of leaves in severe cases",
    french: "Séchage tombant des feuilles dans des cas graves"
  },
  {
    english: "The maggot of the insect damages the internal tissue; consequently, the entire plant dies. The damage is more acute when the crop is sown early.",
    french: "L'asticote de l'insecte endommage le tissu interne;Par conséquent, toute la plante décède.Les dommages sont plus aigus lorsque la récolte est semée tôt."
  },
  {
    english: "The adults also cause damage by puncturing the leaves, and the injured parts turn yellow.",
    french: "Les adultes causent également des dommages en perforant les feuilles et les pièces blessées deviennent jaunes."
  },
  {
    english: "The damage is more severe on seedlings than on the grown-up plants",
    french: "Les dommages sont plus graves sur les semis que sur les plantes adultes"
  },
  {
    english: "The caterpillar makes a hole in pods and feeds upon developing seed.",
    french: "La chenille fait un trou dans les gousses et se nourrit du développement de graines."
  },
  {
    english: "In the early stages, they feed on the foliage and sometimes cause serious defoliation.",
    french: "Dans les premiers stades, ils se nourrissent du feuillage et provoquent parfois une défoliation grave."
  },
  {
    english: "During the reproductive stage, they bore the developing pod and feed on the seeds with their head typically thrust inside and most of the part of the body outside.",
    french: "Pendant la phase de reproduction, ils portaient la gousse en développement et se nourrissent des graines avec leur tête généralement poussé à l'intérieur et la majeure partie de la partie du corps à l'extérieur."
  },
  {
    english: "The caterpillars feed on the developing peas in the pods; they also leave frass, which contaminates the end produce.",
    french: "Les chenilles se nourrissent des pois en développement dans les gousses;Ils quittent également des frappes, ce qui contamine les produits finaux."
  },
  {
    english: "Within each pod, 1 or 2 individual peas tend to be partially eaten, and attacked pods may develop a yellow appearance and ripen early.",
    french: "Dans chaque pod, 1 ou 2 pois individuels ont tendance à être partiellement consommés, et les gousses attaquées peuvent développer une apparence jaune et mûrir tôt."
  },
  {
    english: "When pea pods are opened for shelling, one or more creamy white caterpillars, up to 14 mm long, with dark dots on the body may be found eating into the peas",
    french: "Lorsque des gousses de pois sont ouvertes pour des bombardements, une ou plusieurs chenilles blanches crémeuses, jusqu'à 14 mm de long, avec des points sombres sur le corps peuvent être trouvés dans les pois"
  },
  {
    english: "Adults feed on blossoms and lay eggs on young pods.",
    french: "Les adultes se nourrissent de fleurs et pondent des œufs sur de jeunes gousses."
  },
  {
    english: "Larvae, after hatching from the eggs, burrow into green seed.",
    french: "Les larves, après avoir éclos des œufs, creusent des graines vertes."
  },
  {
    english: "The larvae burrow straight through the pods to feed on the seed, so they are not readily found for identification until the seed is mature (above), and it is too late for control.",
    french: "Les larves s'enfoncent directement à travers les gousses pour se nourrir de la graine, de sorte qu'elles ne sont pas facilement trouvées pour l'identification jusqu'à ce que la graine soit mature (ci-dessus), et il est trop tard pour le contrôle."
  },
  {
    english: "Leaves fed upon by thrips often become dull green and later develop a silvery-white discoloration on the upper surface.",
    french: "Les feuilles alimentées par les thrips deviennent souvent vertes ternes et développent plus tard une décoloration blanche argentée sur la surface supérieure."
  },
  {
    english: "The discolored areas are usually marked by many tiny black excrement spots.",
    french: "Les zones décolorées sont généralement marquées par de nombreux minuscules points d'excrément noirs."
  },
  {
    english: "When thrips feed on developing tissues at the shoot tip or in flower buds, they can cause distorted growth.",
    french: "Lorsque les thrips se nourrissent du développement de tissus à la pointe des pousses ou dans les boutons floraux, ils peuvent provoquer une croissance déformée."
  },
  {
    english: "Pod Spot and Ascochyta Blight",
    french: "Pod Spot et Ascochyta Blight"
  },
  {
    english: "Mosaic and Streak",
    french: "Mosaïque et séquence"
  },
  {
    english: "Yellowing of lower leaves and stunting of plants.",
    french: "Jaunissement des feuilles inférieures et croissance des plantes."
  },
  {
    english: "The stem may be slightly swollen and brittle near the soil.",
    french: "La tige peut être légèrement gonflée et cassante près du sol."
  },
  {
    english: "Externally, the root system appears healthy; however, secondary root rots are likely to occur on plants wilted for long periods.",
    french: "À l'extérieur, le système racinaire semble sain;Cependant, les Rots racinaires secondaires sont susceptibles de se produire sur les plantes fanées pendant de longues périodes."
  },
  {
    english: "It attacks leaves first, producing faint, slightly discolored specks from which grayish white powdery growth of mycelium develops.",
    french: "Il attaque les feuilles en premier, produisant des taches légèrement décolorées et légèrement décolorées à partir desquelles se développe la croissance poudrée blanche grisâtre du mycélium."
  },
  {
    english: "Powdery growth spreads over leaf, stem, and pod.",
    french: "La croissance poudrée se propage sur les feuilles, la tige et la gousse."
  },
  {
    english: "The leaves turn yellow and die.",
    french: "Les feuilles deviennent jaunes et meurent."
  },
  {
    english: "The stem of the plant becomes malformed and the affected plant dies out.",
    french: "La tige de la plante devient mal formée et la plante affectée meurt."
  },
  {
    english: "Yellow spots having aecia in round or elongated clusters.",
    french: "Des taches jaunes ayant une aecia en grappes rondes ou allongées."
  },
  {
    english: "Then the uredopustules develop which are powdery and light brown in appearance.",
    french: "Ensuite, les pustules d'Uredo se développent qui sont en apparence poudreuse et brun clair."
  },
  {
    english: "Reddish brown to black streaks appear on primary and secondary roots.",
    french: "Les stries brun rougeâtre à noires apparaissent sur les racines primaires et secondaires."
  },
  {
    english: "These streaks coalesce at later stages, leading to girdling of the lower stem.",
    french: "Ces séquences fusionnent à des stades ultérieurs, conduisant à la ceinture de la tige inférieure."
  },
  {
    english: "Red discoloration of the vascular system can be seen, especially near cotyledon attachment.",
    french: "La décoloration rouge du système vasculaire peut être observée, en particulier près de l'attachement du cotylédon."
  },
  {
    english: "Black to purplish streaks on stems reaching from the root zone to about 25 cm up the stem.",
    french: "Des stries noires à violacées sur des tiges atteignant la zone racinaire à environ 25 cm sur la tige."
  },
  {
    english: "Leaf spots are gray-purplish.",
    french: "Les taches de feuilles sont-purplesh."
  },
  {
    english: "Foot and stem lesions girdle and weaken the stem, leading to crop lodging and yield loss.",
    french: "Les lésions des pieds et des tiges ceintent et affaiblissent la tige, conduisant à l'hébergement des cultures et à la perte de rendement."
  },
  {
    english: "A grayish white, moldy growth appears on the lower leaf surface, and a yellowish area appears on the opposite side of the leaf.",
    french: "Une croissance grisâtre et moisie apparaît sur la surface de la feuille inférieure, et une zone jaunâtre apparaît de la face opposée de la feuille."
  },
  {
    english: "Infected leaves can turn yellow and die if the weather is cool and damp.",
    french: "Les feuilles infectées peuvent devenir jaunes et mourir si le temps est frais et humide."
  },
  {
    english: "Stems may be distorted and stunted.",
    french: "Les tiges peuvent être déformées et ralenties."
  },
  {
    english: "Brown blotches appear on pods, and mold may grow inside pods.",
    french: "Les taches brunes apparaissent sur des gousses et la moisissure peut pousser à l'intérieur des gousses."
  },
  {
    english: "Mottled patterns on leaves.",
    french: "Motifs marbrés sur les feuilles."
  },
  {
    english: "Yellow leaf veins.",
    french: "Veines des feuilles jaunes."
  },
  {
    english: "Downward curling of leaflets as well as a transient clearing and swelling of leaf veins in most cultivars.",
    french: "Curling vers le bas des folioles ainsi qu'une clairière transitoire et un gonflement des veines des feuilles chez la plupart des cultivars."
  },
  {
    english: "African Armyworm",
    french: "Vor à l'armée africaine"
  },
  {
    english: "Bean Aphid",
    french: "Puceron de haricots"
  },
  {
    english: "Crown and Root Aphids",
    french: "Couronne et pucerons racinaires"
  },
  {
    english: "Cutworms feed on the roots.",
    french: "Les vers coupés se nourrissent des racines."
  },
  {
    english: "Causing small and large superficial holes.",
    french: "Provoquant de petits et grands trous superficiels."
  },
  {
    english: "Completely eat the leaves.",
    french: "Mangez complètement les feuilles."
  },
  {
    english: "The African army indirectly injures the carrot crop by destroying the stem or foliage. The crop cannot produce enough food when foliage is destroyed, reducing yields.",
    french: "L'armée africaine blesse indirectement la récolte de carottes en détruisant la tige ou le feuillage.La récolte ne peut pas produire suffisamment de nourriture lorsque le feuillage est détruit, réduisant les rendements."
  },
  {
    english: "The African armyworm is also known as a caterpillar.",
    french: "Le rotation de l'armée africaine est également connu sous le nom de chenille."
  },
  {
    english: "When the caterpillars are 3 cm long, they could have already caused massive losses.",
    french: "Lorsque les chenilles mesurent 3 cm de long, elles auraient déjà pu causer des pertes massives."
  },
  {
    english: "Bean aphid may transmit celery mosaic but little is known in this regard.",
    french: "Le puceron des haricots peut transmettre la mosaïque de céleri mais on sait peu de choses à cet égard."
  },
  {
    english: "Bean aphid only occasionally builds up on carrots.",
    french: "Le puceron des haricots ne s'appuie que de temps en temps sur les carottes."
  },
  {
    english: "It is known regarding economic thresholds and damage.",
    french: "Il est connu concernant les seuils économiques et les dommages."
  },
  {
    english: "These aphids occur infrequently and only occasionally cause injury.",
    french: "Ces pucerons se produisent rarement et ne provoquent qu'occasionnellement des blessures."
  },
  {
    english: "High populations may stunt growth.",
    french: "Les populations élevées peuvent prendre la croissance."
  },
  {
    english: "It is more serious that the tops may be weakened by their feeding and break off during harvest, leaving the carrot in the ground.",
    french: "Il est plus grave que les sommets puissent être affaiblis par leur alimentation et leur rupture pendant la récolte, laissant la carotte dans le sol."
  },
  {
    english: "Bacterial soft rot",
    french: "Pourriture douce bactérienne"
  },
  {
    english: "Leaf blight",
    french: "Brûlure des feuilles"
  },
  {
    english: "The disease generally appears as a soft, watery, and slimy decay of the taproot. The decay rapidly consumes the core of the carrot, often leaving the epidermis/peel intact.",
    french: "La maladie apparaît généralement comme une désintégration douce, aqueuse et visqueuse de la racine de la racine.La désintégration consomme rapidement le noyau de la carotte, laissant souvent l'épiderme/peelle intact."
  },
  {
    english: "Rotted tissues retain their natural color until they completely decay. The infected carrot is not fit for consumption and unsellable.",
    french: "Les tissus pourris conservent leur couleur naturelle jusqu'à ce qu'elles se décomposent complètement.La carotte infectée n'est pas adaptée à la consommation et insensable."
  },
  {
    english: "A foul odor may be associated with soft rot.",
    french: "Une odeur nauséabonde peut être associée à la pourriture douce."
  },
  {
    english: "Whitish powdery growth on the undersurface of the leaves.",
    french: "Croissance poudreuse blanchâtre sur la sous-parole des feuilles."
  },
  {
    english: "As the disease progresses, powdery spots appear on both surfaces of the leaves and on stems.",
    french: "Au fur et à mesure que la maladie progresse, les taches poudrées apparaissent sur les deux surfaces des feuilles et sur les tiges."
  },
  {
    english: "Under severe disease pressure, the leaves turn brown, twisted, and brittle before shriveling and dying.",
    french: "Sous une pression grave de la maladie, les feuilles brunissent, tordues et cassantes avant de se ratatiner et de mourir."
  },
  {
    english: "Older leaves are attacked first.",
    french: "Les feuilles plus âgées sont attaquées en premier."
  },
  {
    english: "Dark grey to brown spots, angular, with yellow margins, occur on the leaves and petioles.",
    french: "Des taches gris et brunes foncées, angulaires, avec des marges jaunes, se produisent sur les feuilles et les pétioles."
  },
  {
    english: "Under favorable conditions, the spots merge and the leaves rapidly blacken, wither, and die.",
    french: "Dans des conditions favorables, les taches fusionnent et les feuilles noircient, se flétrissent et meurent rapidement."
  },
  {
    english: "Weevil",
    french: "Charançon"
  },
  {
    english: "Tuber moth",
    french: "Tubercule"
  },
  {
    english: "Whitefly",
    french: "Fine"
  },
  {
    english: "Sweet Potato Virus disease",
    french: "Maladie du virus de la patate douce"
  },
  {
    english: "Black rot",
    french: "Pourriture noire"
  },
  {
    english: "Potato mosaic virus",
    french: "Virus de la mosaïque de pommes de terre"
  },
  {
    english: "An infested tuber is often riddled with cavities or tunnels.",
    french: "Un tubercule infesté est souvent criblé de cavités ou de tunnels."
  },
  {
    english: "Thickening and malformation of vines and often cracking of the tissue.",
    french: "Épaississement et malformation des vignes et souvent fissure du tissu."
  },
  {
    english: "Discoloration, cracking, or wilting of damaged vines.",
    french: "Décoloration, fissuration ou flétrissement des vignes endommagées."
  },
  {
    english: "It is a pest of field and storage.",
    french: "C'est un ravageur de champ et de stockage."
  },
  {
    english: "Larva tunnels into foliage, stem, and tubers.",
    french: "Tunnels de larve dans le feuillage, la tige et les tubercules."
  },
  {
    english: "Galleries are formed near tuber eyes.",
    french: "Des galeries se forment près des yeux de tubercule."
  },
  {
    english: "Damage the undersides of leaves by sucking their plant sap.",
    french: "Endommager le dessous des feuilles en aspirant la sève de leur plante."
  },
  {
    english: "They damage young and soft parts of plants such as new leaves and shoots.",
    french: "Ils endommagent des parties jeunes et douces de plantes telles que de nouvelles feuilles et des pousses."
  },
  {
    english: "Leaves become rolled up and turn pale and gradually dry up.",
    french: "Les feuilles deviennent enroulées et deviennent pâles et sèche progressivement."
  },
  {
    english: "Development of sooty mold on the plant.",
    french: "Développement de moisissures de suie sur la plante."
  },
  {
    english: "Blackening of the leaves that dry and fall off.",
    french: "Noircissement des feuilles qui sèchent et tombent."
  },
  {
    english: "Chlorotic spots, yellowing.",
    french: "Taches chlorotiques, jaunissement."
  },
  {
    english: "Stunted vines.",
    french: "Vignes rabougries."
  },
  {
    english: "Narrow yellow leaves with deformed edges.",
    french: "Feuilles jaunes étroites avec des bords déformés."
  },
  {
    english: "Yield reductions in roots.",
    french: "Réductions de rendement dans les racines."
  },
  {
    english: "Symptoms generally are seen at harvest, after curing or after storage.",
    french: "Les symptômes sont généralement observés lors de la récolte, après durcissement ou après le stockage."
  },
  {
    english: "A dry, firm, dark-colored rot that does not extend into the cortex of the sweet potato root.",
    french: "Une pourriture sèche, ferme et de couleur foncée qui ne s'étend pas dans le cortex de la racine de patate douce."
  },
  {
    english: "Dark sunken, darkish spots on the roots and the lower parts of the stem.",
    french: "Des taches sombres et sombres sur les racines et les parties inférieures de la tige."
  },
  {
    english: "Necrotic spots observed on lower leaves.",
    french: "Taches nécrotiques observées sur les feuilles inférieures."
  },
  {
    english: "Discoloring, wilting, and death of foliage and, eventually, the death of the sweet potato vine.",
    french: "Décoloration, flétrissement et mort du feuillage et, finalement, la mort de la vigne de patate douce."
  },
  {
    english: "It rapidly spreads in high moisture and low temperature.",
    french: "Il se propage rapidement en humidité élevée et à basse température."
  },
  {
    english: "Black specks observed on tubers.",
    french: "Pensées noires observées sur les tubercules."
  },
  {
    english: "Affected plants show drying up.",
    french: "Les plantes touchées montrent le séchage."
  },
  {
    english: "In infected tubers, at the time of sprouting, black, brown color appears on eyes.",
    french: "Dans les tubercules infectés, au moment de la germination, la couleur noire et brune apparaît sur les yeux."
  },
  {
    english: "Unhealthy plants with leaf discoloration.",
    french: "Plantes malsaines avec décoloration des feuilles."
  },
  {
    english: "Wilting leaves.",
    french: "Feuilles de flétrissement."
  },
  {
    english: "Stunted growth.",
    french: "Croissance rabougrie."
  },
  {
    english: "Curculios beetle",
    french: "Curculios Beetle"
  },
  {
    english: "Rose scale insects",
    french: "Insectes à l'échelle rose"
  },
  {
    english: "Rose chaffer beetle",
    french: "CHAFER CHAFER"
  },
  {
    english: "Black spot",
    french: "Tâche noire"
  },
  {
    english: "Rose mosaic virus",
    french: "Virus de la mosaïque rose"
  },
  {
    english: "Crown gall",
    french: "Flèche de la couronne"
  },
  {
    english: "Distorted flower buds and leaves.",
    french: "Bounons et feuilles fleuries déformées."
  },
  {
    english: "Sticky honeydew substance that is secreted by the aphids.",
    french: "Substance au miellat collante sécrétée par les pucerons."
  },
  {
    english: "Black sooty mold growing on the honeydew.",
    french: "Moule de suie noir poussant sur le miellat."
  },
  {
    english: "Rose curculios are reddish-brown weevils with dark spots.",
    french: "Les curculios roses sont des charançons brun rougeâtre avec des taches sombres."
  },
  {
    english: "Adult rose curculios feed on the flower buds, poking their long snouts inside.",
    french: "Les curculios de roses adultes se nourrissent des boutons floraux, poussant leurs longs museaux à l'intérieur."
  },
  {
    english: "If the flowers open, they will be full of ragged holes.",
    french: "Si les fleurs s'ouvrent, elles seront pleines de trous en lambeaux."
  },
  {
    english: "Mainly found on the stems and branches of the plant, lack of control will allow the pest to spread to flower stalks and petioles.",
    french: "Principalement trouvé sur les tiges et les branches de la plante, le manque de contrôle permettra au ravageur de se propager sur les tiges et les pétioles fleurissants."
  },
  {
    english: "Plants would be stunted, spindly, and with a white, flaky crust of scales on the bark.",
    french: "Les plantes seraient rabougries, grêlées et avec une croûte d'écailles blanches et feuilletées sur l'écorce."
  },
  {
    english: "Turn yellow and die back.",
    french: "Tournez jaune et mourez en arrière."
  },
  {
    english: "They have a voracious appetite and can quickly skeletonize leaves, leaving only the veins behind.",
    french: "Ils ont un appétit vorace et peuvent rapidement squeletter les feuilles, ne laissant que les veines derrière."
  },
  {
    english: "Create holes in the fruits, making them less attractive and reducing seed viability.",
    french: "Créez des trous dans les fruits, ce qui les rend moins attrayants et réduisant la viabilité des graines."
  },
  {
    english: "They can consume the petals and damage the blooms, reducing the aesthetic value of the roses.",
    french: "Ils peuvent consommer les pétales et endommager les fleurs, réduisant la valeur esthétique des roses."
  },
  {
    english: "White powdery growth is visible on the plant.",
    french: "La croissance poudreuse blanche est visible sur la plante."
  },
  {
    english: "Infected leaves turn purplish and drop.",
    french: "Les feuilles infectées deviennent violacées et tombent."
  },
  {
    english: "Flower buds may fail to open.",
    french: "Les boutons floraux peuvent ne pas s'ouvrir."
  },
  {
    english: "Conspicuous circular black spots with fringed margins appear on either side of leaves.",
    french: "Des taches noires circulaires visibles avec des marges à franges apparaissent de chaque côté des feuilles."
  },
  {
    english: "Leaves become chlorotic.",
    french: "Les feuilles deviennent chlorotiques."
  },
  {
    english: "Leaves dry up and drop prematurely.",
    french: "Les feuilles sèchent et tombent prématurément."
  },
  {
    english: "Yellowing in a mosaic pattern. Chlorotic (yellow) rings or wavy lines (which can look similar to leaf miner damage).",
    french: "Jaunissant dans un motif de mosaïque.Anneaux chlorotiques (jaunes) ou lignes ondulées (qui peuvent ressembler aux dommages des mineurs de feuilles)."
  },
  {
    english: "Yellowing of the veins.",
    french: "Jaunissement des veines."
  },
  {
    english: "Mottled flower color.",
    french: "Couleur fleurie marbrée."
  },
  {
    english: "New crown galls are usually pale colored and somewhat round.",
    french: "Les nouvelles galles de la couronne sont généralement de couleur pâle et quelque peu rondes."
  },
  {
    english: "As they enlarge, they become rough, irregularly shaped, and hard.",
    french: "Au fur et à mesure qu'ils agrandissent, ils deviennent rugueux, de façon irrégulière et dur."
  },
  {
    english: "Crown gall can easily be confused with the graft union, but the graft union will not continue to grow larger.",
    french: "Crown Gall peut facilement être confondu avec l'Union du greffon, mais le greffon ne continuera pas à grandir."
  },
  {
    english: "Pod borers",
    french: "Foreur"
  },
  {
    english: "Armyworms",
    french: "Ver de l'armée"
  },
  {
    english: "Root knot nematodes",
    french: "Nematodes à nœuds racinaires"
  },
  {
    english: "Flower thrips",
    french: "Thrips de fleurs"
  },
  {
    english: "Cowpea mosaic",
    french: "Cowpea Mosaic"
  },
  {
    english: "Macrophomina root rot",
    french: "Pourriture des racines de macrophomine"
  },
  {
    english: "Bore holes on the buds, flower or pods.",
    french: "Portant des trous sur les bourgeons, les fleurs ou les gousses."
  },
  {
    english: "Infested pods and flowers are webbed together.",
    french: "Les gousses et les fleurs infestées sont palmées ensemble."
  },
  {
    english: "Defoliation in early stages & later feed on seed larvae thrust head inside the pods and the rest of the body hanging out & make round holes.",
    french: "Défioliation aux premiers stades et se nourrissez plus tard de larves de graines poussé la tête à l'intérieur des gousses et le reste du corps suspendu et fait des trous ronds."
  },
  {
    english: "Damage by the worms comprises singular or grouped shaped holes on the leaves of infested plants.",
    french: "Les dommages des vers comprennent des trous de forme singulière ou groupés sur les feuilles des plantes infestées."
  },
  {
    english: "Under heavy infestations, windowing of leaves is observed.",
    french: "Sous des infestations lourdes, une fenêtre de feuilles est observée."
  },
  {
    english: "Egg clusters appear as cottony or fuzzy substance on the leaf surface.",
    french: "Les grappes d'oeufs apparaissent sous forme de substance cotonneuse ou floue à la surface des feuilles."
  },
  {
    english: "They usually appear sporadically within a cowpea field.",
    french: "Ils apparaissent généralement sporadiquement dans un champ de niébé."
  },
  {
    english: "Symptoms include stunting, yellowing, wilting, and formation of galls on host roots. Infected plants occur in patches in the field.",
    french: "Les symptômes comprennent le retard de croissance, le jaunissement, le flétrissement et la formation de galles sur les racines de l'hôte.Les plantes infectées se produisent dans des patchs sur le terrain."
  },
  {
    english: "Infected roots become knotty; in severely infected plants, the root system is reduced, and the rootlets are almost completely absent.",
    french: "Les racines infectées deviennent noueuses;Dans les plantes gravement infectées, le système racinaire est réduit et les radicelles sont presque complètement absentes."
  },
  {
    english: "Damage is prominent on petioles, leaves, and flowers that are heavily infested.",
    french: "Les dommages sont importants sur les pétioles, les feuilles et les fleurs fortement infestées."
  },
  {
    english: "Damaged petioles and leaves have tiny holes surrounded by discolored areas.",
    french: "Les pétioles et les feuilles endommagés ont de minuscules trous entourés de zones décolorées."
  },
  {
    english: "Infested flowers are brown, dried, or completely distorted.",
    french: "Les fleurs infestées sont brunes, séchées ou complètement déformées."
  },
  {
    english: "The germinating seedling turns brown-red and dies.",
    french: "Le semis en germination devient brun-rouge et décède."
  },
  {
    english: "Irregular to round brown spots with chlorotic halos appear on leaves, and later spread to the stem.",
    french: "Des taches brunes irrégulières à rondes avec des halos chlorotiques apparaissent sur les feuilles, puis se sont propagées à la tige."
  },
  {
    english: "Stem may break, pods are also infected leading to shriveled seeds.",
    french: "La tige peut se casser, des gousses sont également infectées, entraînant des graines ratatinées."
  },
  {
    english: "It is caused by a virus transmitted by aphids.",
    french: "Il est causé par un virus transmis par les pucerons."
  },
  {
    english: "The affected leaves become pale yellow and exhibit mosaic, vein banding symptoms.",
    french: "Les feuilles affectées deviennent jaune pâle et présentent des symptômes de mosaïque de bandes veineux."
  },
  {
    english: "The affected leaves become reduced in size and show puckering. Pods are also reduced and become twisted.",
    french: "Les feuilles affectées deviennent réduites en taille et montrent un pli.Les gousses sont également réduites et se tordent."
  },
  {
    english: "Powdery mildew is visible on all the aerial parts of the affected plants.",
    french: "Le moisissure poudrée est visible sur toutes les parties aériennes des plantes touchées."
  },
  {
    english: "Symptoms first start from leaves and then spread to stem, branches, and pods.",
    french: "Les symptômes commencent d'abord des feuilles, puis se propagent à la tige, aux branches et aux gousses."
  },
  {
    english: "This white growth consists of the fungus and its spores.",
    french: "Cette croissance blanche se compose du champignon et de ses spores."
  },
  {
    english: "The fungus attacks all aerial parts and at any stage of plant growth.",
    french: "Le champignon attaque toutes les pièces aériennes et à tout stade de la croissance des plantes."
  },
  {
    english: "Symptoms include circular, black, sunken spots with a dark center and bright red-orange margins on leaves and pods.",
    french: "Les symptômes comprennent des taches circulaires, noires et enfoncées avec un centre sombre et des marges rouge-orange vif sur les feuilles et les gousses."
  },
  {
    english: "In severe infections, the affected parts wither off.",
    french: "Dans des infections graves, les pièces affectées se déversent."
  },
  {
    english: "Symptoms begin appearing at 4 weeks as raised white cankers at the base of the stem.",
    french: "Les symptômes commencent à apparaître à 4 semaines comme des cankers blancs élevés à la base de la tige."
  },
  {
    english: "The affected plants become stunted with dark green and mottled leaves that are reduced in size.",
    french: "Les plantes affectées deviennent ralentis de feuilles vert foncé et marbrées qui sont réduites."
  },
  {
    english: "Leaves of affected plants dry and drop.",
    french: "Feuilles des plantes affectées sèche et tombent."
  },
  {
    english: "Establishment stage",
    french: "Étape de l'établissement"
  },
  {
    english: "Budding stage",
    french: "Étape en herbe"
  },
  {
    english: "Flower initiation and blooming stage",
    french: "Initiation des fleurs et étape de floraison"
  },
  {
    english: "Seed Germination",
    french: "Germination des graines"
  },
  {
    english: "Harvest",
    french: "Récolte"
  },
  {
    english: "Storage root initiation stage",
    french: "Étape d'initiation des racines de stockage"
  },
  {
    english: "Storage root bulking stage",
    french: "Étape de grume-root de stockage"
  },
  {
    english: "Vegetative growth stage",
    french: "Étape de croissance végétative"
  },
  {
    english: "Inflorescence stage",
    french: "Étape d'inflorescence"
  },
  {
    english: "Ripening stage",
    french: "Étape de maturation"
  },
  {
    english: "Loosening",
    french: "Relâchement"
  },
  {
    english: "De-suckering",
    french: "Dérivation"
  },
  {
    english: "Pinching",
    french: "Pincée"
  },
  {
    english: "Earthing up",
    french: "Fonds"
  },
  {
    english: "Lifting up",
    french: "Soulevant"
  },
  {
    english: "Support Trailing & Stalking",
    french: "Support de fuite et de harcèlement"
  },
  {
    english: "Sweetpotato virus disease (SPVD)",
    french: "Maladie du virus de l'onde de survêtement (SPVD)"
  },
  {
    english: "Potato mosaic disease",
    french: "Maladie de la mosaïque de pomme de terre"
  },
  {
    english: "Red scale",
    french: "Échelle rouge"
  },
  {
    english: "Rose curculios",
    french: "Rose curculios"
  },
  {
    english: "White flies",
    french: "Mouches blanches"
  },
  {
    english: "Root not nematodes",
    french: "Racine et nématodes"
  },
  {
    english: "Pigeon pea (Peru)",
    french: "Paire de pigments (par)"
  },
  {
    english: "SIPAN",
    french: "Sipan"
  },
  {
    english: "PROMPEX2000",
    french: "PROMPEX2000"
  },
  {
    english: "La Negra",
    french: "Le noir"
  },
  {
    english: "La Pacarana",
    french: "Rayer"
  },
  {
    english: "Ants and mealy bugs pose a serious threat to pineapple production because the ants carry the mealy bugs from diseased plants onto healthy plants resulting in the spread of the disease throughout the field.",
    french: "Les fourmis et les bogues farineux constituent une menace sérieuse pour la production d'ananas parce que les fourmis portent les insectes farineuses des plantes malades sur des plantes saines, ce qui entraîne la propagation de la maladie dans tout le domaine."
  },
  {
    english: "Severe infestations can cause wilting of the leaves with the leaves eventually turning orange-brown and withering.",
    french: "Des infestations graves peuvent provoquer un flétrissement des feuilles avec les feuilles qui deviennent finalement brun orange et flétri."
  },
  {
    english: "Control becomes more difficult if there are weeds and other local plants acting as hosts for the mealy bug. Initial control should be directed against the ants to ensure success.",
    french: "Le contrôle devient plus difficile s'il y a des mauvaises herbes et d'autres plantes locales agissant comme hôtes pour le bogue farineux.Le contrôle initial doit être dirigé contre les fourmis pour assurer le succès."
  },
  {
    english: "Pest nematodes are tiny slender unsegmented worms that infest plant roots, reducing root growth and causing root death thus reducing the plant’s ability to absorb water and nutrients.",
    french: "Les nématodes de ravageurs sont de minuscules vers minces non segmentés qui infestent les racines des plantes, réduisant la croissance des racines et provoquant la mort des racines, réduisant ainsi la capacité de la plante à absorber l'eau et les nutriments."
  },
  {
    english: "The result is a poorly developed root system causing stunting of plants.",
    french: "Le résultat est un système racinaire mal développé provoquant un retard de croissance des plantes."
  },
  {
    english: "Leaves turn yellow and then red and are less erect than those of healthy plants. Tips are withered.",
    french: "Les feuilles deviennent jaunes puis rouges et sont moins dressées que celles des plantes saines.Des conseils sont flétris."
  },
  {
    english: "Butterfly larvae",
    french: "Larves de papillon"
  },
  {
    english: "Butterfly larvae can damage flowers.",
    french: "Les larves de papillon peuvent endommager les fleurs."
  },
  {
    english: "The adult butterflies lay eggs when the plants are at the flowering stage.",
    french: "Les papillons adultes pondent des œufs lorsque les plantes sont au stade de la floraison."
  },
  {
    english: "Fruits are also affected by larvae.",
    french: "Les fruits sont également affectés par les larves."
  },
  {
    english: "Rodents",
    french: "Rongeurs"
  },
  {
    english: "Rats can be very destructive pests in pineapple fields and also pose a serious hazard to pineapples in storage",
    french: "Les rats peuvent être des parasites très destructeurs dans les champs d'ananas et poser un risque grave pour les ananas en stockage"
  },
  {
    english: "Rats damage pineapples in the field when they bite, urinate and or defecate on the crop making the fruits unmarketable.",
    french: "Les rats endommagent les ananas sur le terrain lorsqu'ils mordent, urinent et ou déférent sur la récolte, ce qui rend les fruits inébranlables."
  },
  {
    english: "Even higher crop loss due to rodent damage may occur where pineapples are stored",
    french: "Des pertes de récolte encore plus élevées en raison de dommages aux rongeurs peuvent se produire lorsque les ananas sont stockés"
  },
  {
    english: "Mealybug wilt",
    french: "Flétrissement des cochenilles"
  },
  {
    english: "The most visible symptom is a bright bronze to red colouration of the leaves of the young plant or a pinkish and/or yellowish colouration of the older leaves.",
    french: "Le symptôme le plus visible est un bronze vif à la coloration rouge des feuilles de la jeune plante ou une coloration rosée et/ou jaunâtre des feuilles plus âgées."
  },
  {
    english: "Wilting starts at the tip of the leaves.",
    french: "Le flétage commence à la pointe des feuilles."
  },
  {
    english: "If the plants continue to grow, the leaves lose turgidity and curl outwards",
    french: "Si les plantes continuent de croître, les feuilles perdent la turgidité et se recroquevillent vers l'extérieur"
  },
  {
    english: "These fungal problems are caused by various Phytophthora and Pythium species.",
    french: "Ces problèmes fongiques sont causés par diverses espèces de phytophthora et de pythium."
  },
  {
    english: "The symptoms of root rots are a reduction in plant growth with the development of reddish coloured leaves and the browning of the leaf margins.",
    french: "Les symptômes des pourries racinaires sont une réduction de la croissance des plantes avec le développement de feuilles de couleur rougeâtre et le brunissement des marges des feuilles."
  },
  {
    english: "Affected plants eventually die",
    french: "Les plantes touchées finissent par mourir"
  },
  {
    english: "Phytophthora heart rot",
    french: "Phytophthora Heart Rot"
  },
  {
    english: "The symptoms are rotting at the base of the leaves in the centre of the leaf whorl (heart) of young non-flowering plants.",
    french: "Les symptômes pourrissent à la base des feuilles au centre du verticille des feuilles (cœur) des jeunes plantes non fleriantes."
  },
  {
    english: "In a more developed stage, young leaves can easily be pulled from the plant.",
    french: "Dans une étape plus développée, les jeunes feuilles peuvent facilement être tirées de la plante."
  },
  {
    english: "The base of the leaves eventually rots and has a bad smell.",
    french: "La base des feuilles est finalement pourrie et a une mauvaise odeur."
  },
  {
    english: "Fruitlet core rot",
    french: "Rot de noyau de fruit de fruit"
  },
  {
    english: "Fruitlet Core Rot is caused by a combination of Penicillium and Fusarium spp.",
    french: "La pourriture du noyau des fruits de fruit est causée par une combinaison de pénicillium et de fusarium spp."
  },
  {
    english: "Although the symptoms of this disease generally appear during storage, infection starts in the field. Mites are thought to be associated with this disease, through causing injury to the fruitlets.",
    french: "Bien que les symptômes de cette maladie apparaissent généralement pendant le stockage, l'infection commence sur le terrain.On pense que les acariens sont associés à cette maladie, en causant des blessures aux fruits."
  },
  {
    english: "The infected tissue of the fruit has a water-soaked appearance which eventually discolours becoming light to dark brown.",
    french: "Le tissu infecté du fruit a une apparence imbibée de l'eau qui finit par se décolorer de devenir clair en brun foncé."
  },
  {
    english: "The fungus attacks all aerial part parts and at any stage of plant growth.",
    french: "Le champignon attaque toutes les parties aériennes et à tout stade de la croissance des plantes."
  },
  {
    english: "Symptoms are circular, black, sunken spots with dark center and bright red orange margins on leaves and pods.",
    french: "Les symptômes sont des taches circulaires, noires et coulées avec un centre foncé et des marges orange rouge vif sur les feuilles et les gousses."
  },
  {
    english: "Irregular spots, and dead areas on leaves that often follow the veins of the leaves",
    french: "Taches irrégulières et zones mortes sur les feuilles qui suivent souvent les veines des feuilles"
  },
  {
    english: "Spots produced are small, numerous in number with pale brown centre and reddish brown margin.",
    french: "Les taches produites sont petites, nombreuses avec un centre brun pâle et une marge brun rougeâtre."
  },
  {
    english: "Small necrotic flecks that enlarge to form circular, tan or grey spots.",
    french: "Petits taches nécrotiques qui agrandissent pour former des taches circulaires, bronzées ou grises."
  },
  {
    english: "The center of the lesions dry out and has a white appearance",
    french: "Le centre des lésions sèche et a une apparence blanche"
  },
  {
    english: "The affected leaves turn yellow in colour and brown irregular lesions appear on leaves.",
    french: "Les feuilles affectées deviennent jaunes en couleur et les lésions irrégulières brunes apparaissent sur les feuilles."
  },
  {
    english: "The affected plants dry up gradually. When the tap root of the affected plant is split open, reddening of internal tissues is visible.",
    french: "Les plantes touchées sèche progressivement.Lorsque la racine du robinet de la plante affectée est divisée, la rougeur des tissus internes est visible."
  },
  {
    english: "In the initial stages, the fungus causes seed rot, seedling blight and root rot symptoms.",
    french: "Dans les premiers stades, le champignon provoque la pourriture des graines, les symptômes de la brûlure des semis et de la pourriture des racines."
  },
  {
    english: "The earliest symptoms appear on youngest leaves as chlorosis around some lateral veins and its branches near the margin.",
    french: "Les premiers symptômes apparaissent sur les plus jeunes feuilles comme chlorose autour de certaines veines latérales et de ses branches près de la marge."
  },
  {
    english: "The leaves show curling of margin downwards.",
    french: "Les feuilles montrent un curling de marge vers le bas."
  },
  {
    english: "The veins show reddish brown discolouration on the under surface which also extends to the petiole.",
    french: "Les veines montrent une décoloration brun rougeâtre sur la surface sous la surface qui s'étend également au pétiole."
  },
  {
    english: "White powdery patches appear on leaves and other green parts which later become dull coloured.",
    french: "Les plaques poudreuses blanches apparaissent sur les feuilles et autres parties vertes qui deviennent plus tard de couleur terne."
  },
  {
    english: "In severe infections, foliage becomes yellow causing premature defoliation.",
    french: "Dans les infections graves, le feuillage devient jaune provoquant une défoliation prématurée."
  },
  {
    english: "When the infection is severe, both the surfaces of the leaves are completely covered by whitish powdery growth.",
    french: "Lorsque l'infection est sévère, les deux surfaces des feuilles sont complètement couvertes par une croissance poudreuse blanchâtre."
  },
  {
    english: "Similar spots also occur on branches and pods.",
    french: "Des taches similaires se produisent également sur les branches et les gousses."
  },
  {
    english: "Under favourable environmental conditions, severe leaf spotting and defoliation occurs at the time of flowering and pod formation.",
    french: "Dans des conditions environnementales favorables, des taches et une défoliation des feuilles sévères se produisent au moment de la floraison et de la formation de pods."
  },
  {
    english: "ther",
    french: "il"
  },
  {
    english: "These enlarge gradually and turn as raised brown streaks spreading upwards.",
    french: "Ceux-ci agrandissent progressivement et se tournent alors que les stries brunes relevées se propageant vers le haut."
  },
  {
    english: "Plants are stunted and leaves dark green, mottled and reduced in size.",
    french: "Les plantes sont rabougries et les feuilles vert foncé, marbrées et réduites en taille."
  },
  {
    english: "Normal leaves on the affected plants drop suddenly and dry.",
    french: "Les feuilles normales sur les plantes affectées tombent soudainement et sèchent."
  },
  {
    english: "Yellow Mosaic",
    french: "Mosaïque jaune"
  },
  {
    english: "Initially mild scattered yellow spots appear on young leaves.",
    french: "Initialement, des taches jaunes dispersées légères apparaissent sur les jeunes feuilles."
  },
  {
    english: "The next trifoliate leaves emerging from the growing apex show irregular yellow and green patches alternating with each other.",
    french: "Les prochaines feuilles trifoliées émergeant de l'apex en croissance montrent des plaques jaune et vertes irrégulières alternant entre elles."
  },
  {
    english: "Spots gradually increase in size and ultimately some leaves turn completely yellow.",
    french: "Les taches augmentent progressivement en taille et, finalement, certaines feuilles deviennent complètement jaunes."
  },
  {
    english: "Leaves, inflorescence stalk, and young pods covered with dark-colored aphids",
    french: "Feuilles, tige d'inflorescence et jeunes gousses recouvertes de pucerons de couleur foncée"
  },
  {
    english: "Leaf mottling and crinkling, and plant dwarfing",
    french: "Marbrure et fracture des feuilles, et nain végétal"
  },
  {
    english: "Honeydew secretion with black ant movements",
    french: "Sécrétion de miellat avec mouvements de fourmis noirs"
  },
  {
    english: "The adult blister beetle primarily feeds on flowers",
    french: "Le scarabée des cloques adultes se nourrit principalement de fleurs"
  },
  {
    english: "Feeding damage can also be found on tender leaves and shoots",
    french: "Les dommages alimentaires peuvent également être trouvés sur des feuilles tendres et des pousses"
  },
  {
    english: "The beetles often attack beans in swarms but generally in small patches within the field",
    french: "Les coléoptères attaquent souvent les haricots en essaims mais généralement en petites patchs dans le champ"
  },
  {
    english: "Buds, flowers, and young pods with boreholes",
    french: "Buds, fleurs et jeunes gousses avec des forages"
  },
  {
    english: "Presence of slug-like caterpillar",
    french: "Présence de chenille de limace"
  },
  {
    english: "Defoliation in early stages",
    french: "Défoliation aux premiers stades"
  },
  {
    english: "Larva's head alone thrust inside the pods and the rest of the body hanging out",
    french: "La tête de la larve seule pousse à l'intérieur des gousses et le reste du corps traîner"
  },
  {
    english: "Pods with round holes",
    french: "Pods avec des trous ronds"
  },
  {
    english: "Grass blue butterfly",
    french: "Grass Blue Butterfly"
  },
  {
    english: "Buds, flowers, and young pods with boreholes and presence of slug-like caterpillar",
    french: "Buds, fleurs et jeunes gousses avec des forages et présence de chenille en forme de limace"
  },
  {
    english: "Larval entry hole on the pod is plugged with excreta",
    french: "Le trou d'entrée larvaire sur le pod est branché avec des excréments"
  },
  {
    english: "Pod damage is characterized by multiple holes per pod, made by individual larva",
    french: "Les dommages causés par la gousse sont caractérisés par plusieurs trous par pod, fabriqués par une larve individuelle"
  },
  {
    english: "Leafhopper",
    french: "Cadavre"
  },
  {
    english: "Leaves mottled and yellowish in color",
    french: "Feuilles tachetées et jaunâtres de couleur"
  },
  {
    english: "Green color insects found under the surface of leaves",
    french: "Insectes de couleur verte trouvés sous la surface des feuilles"
  },
  {
    english: "Yellowing of leaves from tip to downwards",
    french: "Jaunissement des feuilles de la pointe à la baisse"
  },
  {
    english: "Lab lab bug or Stink bug",
    french: "Bogue de laboratoire de laboratoire ou bug puant"
  },
  {
    english: "Both nymphs and adults cluster on the tender shoots and suck the sap",
    french: "Les nymphes et les adultes se regroupent sur les pousses tendres et sucent la sève"
  },
  {
    english: "Heavily infested vines dry and shed away",
    french: "Les vignes fortement infestées sèchent et se débarrassent"
  },
  {
    english: "Moderately infested plants remain weak and stunted in growth",
    french: "Les plantes infestées modérément infestées restent faibles et ralentissantes en croissance"
  },
  {
    english: "Pod bugs",
    french: "Bogues"
  },
  {
    english: "Pods with black spots",
    french: "Pods avec des taches noires"
  },
  {
    english: "Shedding of green pods",
    french: "Débargnage des gousses vertes"
  },
  {
    english: "Poorly filled pods with shriveled grains inside",
    french: "Pods mal remplis de grains ratatinés à l'intérieur"
  },
  {
    english: "Spiny pod borer",
    french: "Finesse épineuse"
  },
  {
    english: "Dropping of flowers and young pods",
    french: "Goutte de fleurs et de jeunes gousses"
  },
  {
    english: "Older pods marked with a brown spot where a larva has entered",
    french: "Des gousses plus anciennes marquées d'un endroit brun où une larve est entrée"
  },
  {
    english: "Caterpillar first feeds on foliage, later bores into pods and feeds on seeds",
    french: "Caterpillar se nourrit d'abord du feuillage, se lance plus tard dans les gousses et se nourrit de graines"
  },
  {
    english: "Spotted Pod Borer",
    french: "Foreuse"
  },
  {
    english: "Whitish growth of fungus",
    french: "Croissance blanchâtre des champignons"
  },
  {
    english: "Pods turn brown to black",
    french: "Les gousses deviennent brunes en noir"
  },
  {
    english: "Stem Girdler",
    french: "Girdler de la tige"
  },
  {
    english: "Beans become discolored as a result of infection",
    french: "Les haricots deviennent décolorés à la suite d'une infection"
  },
  {
    english: "Earliest symptom is the appearance of a greyish brown water soaked lesion on the outer bark",
    french: "Le premier symptôme est l'apparition d'une lésion trempée d'eau brune grisâtre sur l'écorce extérieure"
  },
  {
    english: "Cankers appear either on the main trunk, jorquettes or fan branches",
    french: "Les cankers apparaissent soit sur le tronc principal, les jorquettes ou les branches de ventilateurs"
  },
  {
    english: "A reddish brown liquid oozes out from these lesions, which later dries up to form rusty deposits",
    french: "Un liquide brun rougeâtre suinte de ces lésions, qui se dessèche plus tard pour former des dépôts rouillés"
  },
  {
    english: "First indication of the disease is a characteristic yellowing of one or two leaves on the second or third flush behind the growing tip",
    french: "La première indication de la maladie est un jaunissement caractéristique d'une ou deux feuilles sur la deuxième ou la troisième affleuron derrière la pointe de croissance"
  },
  {
    english: "Diseased leaves fall within a few days of turning yellow and the other leaves on the shoot show similar symptoms",
    french: "Les feuilles malades tombent dans quelques jours suivant le fait de devenir jaune et les autres feuilles sur le tournage présentent des symptômes similaires"
  },
  {
    english: "When the infected shoot is split lengthwise there is always a characteristic brown streaking",
    french: "Lorsque la pousse infectée est divisée dans le sens de la longueur, il y a toujours une stade brune caractéristique"
  },
  {
    english: "Colonizes on the tender parts of the plant",
    french: "Colonise sur les parties tendres de la plante"
  },
  {
    english: "Stunting, chlorosis, and defoliation",
    french: "Srenauvage, chlorose et défoliation"
  },
  {
    english: "Circular water-soaked spots around the feeding punctures",
    french: "Taches circulaires imbibées d'eau autour des perforations alimentaires"
  },
  {
    english: "Punctures appear as reddish brown spots",
    french: "Les perforations apparaissent sous forme de taches brunes rougeâtres"
  },
  {
    english: "Leaves curl up, badly deformed, and shoots dry up",
    french: "Les feuilles se recroquevillent, gravement déformées et se dessèchent"
  },
  {
    english: "Nymphs and adults suck the sap from flowers, tender shoots, and pods",
    french: "Les nymphes et les adultes sucent la sève des fleurs, des pousses tendres et des gousses"
  },
  {
    english: "Excrete honey dew",
    french: "Dew Honey excrésité"
  },
  {
    english: "Development of sooty mold fungus on the leaves and pods",
    french: "Développement de champignons de moisissure de suie sur les feuilles et les gousses"
  },
  {
    english: "Colonize on the underside of tender leaves, succulent stem, flower buds, and small cherelles",
    french: "Coloniser sur le dessous des feuilles tendres, de la tige succulente, des boutons floraux et des petits cherelles"
  },
  {
    english: "Premature shedding of flowers and curling of leaves",
    french: "Déteclage prématuré des fleurs et curling des feuilles"
  },
  {
    english: "Wilting and distortion of leaves and young shoots",
    french: "Flétrissement et distorsion des feuilles et des jeunes pousses"
  },
  {
    english: "Girdler the branches and inserts whitish spindle shaped eggs singly into the tissue in a slanting manner",
    french: "Girdler les branches et insère des œufs en forme de broche blanchâtre à la fois dans le tissu d'une manière inclinée"
  },
  {
    english: "Branches above the girdle wither and dry",
    french: "Branches au-dessus de la ceinture se désécher et sécher"
  },
  {
    english: "Wilting of branches",
    french: "Flétrissement des branches"
  },
  {
    english: "Coffee (saudi arabia)",
    french: "Café (Arabie saoudite)"
  },
  {
    english: "Khawlani",
    french: "Khawlan"
  },
  {
    english: "Al Adini",
    french: "Ne condamnez pas"
  },
  {
    english: "Al Tuffahi",
    french: "Environ"
  },
  {
    english: "Al Tisawa",
    french: "Ne vous installez pas"
  },
  {
    english: "Berri",
    french: "Nouveau"
  },
  {
    english: "Harari",
    french: "Harari"
  },
  {
    english: "Bahri",
    french: "Bahri"
  },
  {
    english: "Dark, dull or blue-green leaves",
    french: "Feuilles foncées, ternes ou bleu-vert"
  },
  {
    english: "Leaves look burnt at the tip",
    french: "Les feuilles ont l'air brûlées à la pointe"
  },
  {
    english: "Yellowing and white interveinal stripping of lower leaves",
    french: "Jaunissement et décapage intervéinal blanc des feuilles inférieures"
  },
  {
    english: "Vegetative buds instead of reproductive buds",
    french: "Buds végétatifs au lieu de bourgeons de reproduction"
  },
  {
    english: "SythenticFertilizerNitrogenUnit",
    french: "Sythenticfertilizernitrogenunit"
  },
  {
    english: "SythenticFertilizerPhosphorousUnit",
    french: "Sythenticfertilizerphosphorenit"
  },
  {
    english: "SythenticFertilizerPotassiumUnit",
    french: "Synthenticfertilizerpotassiumunit"
  },
  {
    english: "Milligram per Litter per Acre",
    french: "Milligramme par litière par acre"
  },
  {
    english: "Milligram per Litter per Hectare",
    french: "Milligramme dans une lettre par hectare"
  },
  {
    english: "Milliliter per Litter per Acre",
    french: "Millilitre par litière par acre"
  },
  {
    english: "Milliliter per Litter per Hectare",
    french: "Millilitre dans la litière par hectare"
  },
  {
    english: "Milligram per litre per acre",
    french: "Milligramme par litre par acre"
  },
  {
    english: "Milligram per litre per hectare",
    french: "Milligramme dans un lit de hectare"
  },
  {
    english: "Yellow leaves",
    french: "Feuilles jaunes"
  },
  {
    english: "Circular to irregular-shaped water-soaked spots on leaves.",
    french: "Des taches circulaires à l'eau de forme irrégulière sur les feuilles."
  },
  {
    english: "Broad yellow hollow may be seen around lesions.",
    french: "Un large creux jaune peut être vu autour des lésions."
  },
  {
    english: "Round black spots on leaves",
    french: "Perches noires rondes sur les feuilles"
  },
  {
    english: "Spots enlarged and concentric rings in a bull's eye pattern seen in the center of the diseased area",
    french: "Des taches élargies et des anneaux concentriques dans un modèle de taureau vu au centre de la zone malade"
  },
  {
    english: "Infected tubers shows a brown, corky dry rot.",
    french: "Les tubercules infectés montrent une pourriture sèche brune et liky."
  },
  {
    english: "Plants shows dwarfing",
    french: "Les plantes montrent un nain"
  },
  {
    english: "If affected tubers cut across, the browning of the xylem vessel is seen, and upon squeezing, the whitish bacterial oozes out.",
    french: "Si les tubercules touchés ont traversé, le brunissement du vaisseau xylème est observé et, en compressant, le bactérien blanchâtre suinte."
  },
  {
    english: "Plant shows wilting",
    french: "Les spectacles de plante sont flétrissants"
  },
  {
    english: "Arial tubers",
    french: "Tubercules arial"
  },
  {
    english: "On tubers, black sclerotial bodies are formed.",
    french: "Sur les tubercules, des corps sclérotiaux noirs se forment."
  },
  {
    english: "Raised, hard, black patches on the surface of the tuber",
    french: "Patches noires surélevées à la surface du tubercule"
  },
  {
    english: "Wilting of leaves",
    french: "Flétrissement des feuilles"
  },
  {
    english: "Light-brown honey dew in the head just after flowering",
    french: "Rosée de miel brun clair dans la tête juste après la floraison"
  },
  {
    english: "The black purple, cattle-horn like, ergots covered with white sphacelia are produced in the infected flowers replacing the seeds",
    french: "Le violet noir, la corne de bétail comme, les ergots recouverts de sphacelia blanche sont produites dans les fleurs infectées remplaçant les graines"
  },
  {
    english: "Sugary droplets on the infected flower parts.",
    french: "Des gouttelettes sucrées sur les parties de fleurs infectées."
  },
  {
    english: "The lesions are drab, rectangular to long oval and about 2-5 x 1-2 mm in size.",
    french: "Les lésions sont ternes, rectangulaires à longues ovales et environ 2-5 x 1-2 mm."
  },
  {
    english: "Leaf Lesion",
    french: "Lésion des feuilles"
  },
  {
    english: "Swelling lessions at early spring",
    french: "Les lesions de gonflement au début du printemps"
  },
  {
    english: "Reddish brown to iron rust colour lessions",
    french: "Lésions de couleur brun rougeâtre à fer à fer"
  },
  {
    english: "Blackened stems and shrivelled grain",
    french: "Tiges noircies et grain ratatiné"
  },
  {
    english: "The lesions are at first purplish black small spots and then become round and ash white",
    french: "Les lésions sont d'abord de petites taches noires violacées, puis deviennent rondes et blancs blancs"
  },
  {
    english: "Leaf blight with rolling from leaf tip",
    french: "Blight à feuilles avec roulement de la pointe des feuilles"
  },
  {
    english: "Death of immature leaves",
    french: "Mort des feuilles immatures"
  },
  {
    english: "Branch dieback",
    french: "Dépérissement de la succursale"
  },
  {
    english: "Thinning of the canopy.",
    french: "Éclairage de la canopée."
  },
  {
    english: "Wilted, yellowed, or browned leaves.",
    french: "Feuilles flétries, jaunes ou brunes."
  },
  {
    english: "The stems develop water-soaked spots which later may be covered with a cottony white growth.",
    french: "Les tiges développent des taches imbibées d'eau qui pourraient plus tard être recouvertes d'une croissance blanche cotonnée."
  },
  {
    english: "As the disease progresses, affected portions of the stem develop a bleached appearance, and eventually the tissues shred.",
    french: "Au fur et à mesure que la maladie progresse, des parties affectées de la tige développent une apparence blanchie et finalement les tissus déchiquetés."
  },
  {
    english: "Girdling of the stem results in premature ripening and in lodging of plants.",
    french: "La ceinture de la tige entraîne une maturation prématurée et un logement des plantes."
  },
  {
    english: "Stem become hollow due to internal rotting.",
    french: "La tige devient creuse en raison de la pourriture interne."
  },
  {
    english: "Midrib cracking of lower leaves, browning of veins and withering is observed.",
    french: "Une fissuration médiane des feuilles inférieures, un brunissement des veines et un flétrissement est observé."
  },
  {
    english: "In severe cases, the vesicular bundles of the stem also turn brown and the plant collapses.",
    french: "Dans les cas graves, les faisceaux vésiculaires de la tige deviennent également bruns et la plante s'effondre."
  },
  {
    english: "Patches of the crop wilt, exhibit stunted growth and have swollen, misshapen roots which decay by rotting.",
    french: "Les plaques de la récolte se sont fard, présentent une croissance rabougrie et ont gonflé les racines difficultées qui se décomposent en pourries."
  },
  {
    english: "Tiny nodules to large club shaped outgrowths develop in root system.",
    french: "De minuscules nodules vers les grandes excroissances en forme de club se développent dans le système racinaire."
  },
  {
    english: "Leaves turn pale green or yellow followed by wilting and under severe conditions the plants die",
    french: "Les feuilles deviennent vert pâle ou jaune suivie d'un flétrissement et dans des conditions sévères, les plantes meurent"
  },
  {
    english: "Leaf spots initially are angular, translucent, light green, later developing into grayish-white irregular necrotic (dead) patches.",
    french: "Les taches de feuilles sont initialement angulaires, translucides, vert clair, se développent plus tard en patchs nécrotiques irréguliers grisâtres (morts)."
  },
  {
    english: "The stems of flower clusters become swollen.",
    french: "Les tiges des grappes de fleurs deviennent enflées."
  },
  {
    english: "Frequently associated with white rust. May develop late in the season on turnip-type (Polish) canola varieties.",
    french: "Fréquemment associé à la rouille blanche.Peut se développer à la fin de la saison sur les variétés de canola de type navigateur (polonais)."
  },
  {
    english: "Damping-off may occur if plants are infected at the seedling stage due to infected seed.",
    french: "Un amortissement peut se produire si les plantes sont infectées au stade des semis en raison de graines infectées."
  },
  {
    english: "Plants affected after the seedling stage may be stunted. Generalized leaf spots, becoming numerous across the field, have been observed in fall-planted crops after initial windblown spore (ascospore) infections.",
    french: "Les plantes touchées après le stade des semis peuvent être ralentis.Des taches foliaires généralisées, devenant nombreuses à travers le champ, ont été observées dans les cultures plantées par l'automne après les infections initiales de spores par vent (ascospore)."
  },
  {
    english: "Brown-to-black rot can be found inside affected stems. Vascular tissues may turn black in color prior to external rot symptoms.",
    french: "La pourriture brune à noir peut être trouvée à l'intérieur des tiges affectées.Les tissus vasculaires peuvent devenir de couleur noire avant les symptômes de pourriture externes."
  },
  {
    english: "Hard black bodies, the sclerotia, are formed inside the stem and occasionally on the stem surface.",
    french: "Les corps noirs durs, les sclérotes, se forment à l'intérieur de la tige et parfois sur la surface de la tige."
  },
  {
    english: "First signs are red, yellow or purple colours at the ends or edges of older leaves, then yellowing in the middle of the leaf.",
    french: "Les premiers signes sont les couleurs rouges, jaunes ou violettes aux extrémités ou les bords des feuilles plus anciennes, puis jaunissent au milieu de la feuille."
  },
  {
    english: "Late infected plants show leaf symptoms but are not stunted and have lower yield loss.",
    french: "Les plantes infectées tardives présentent des symptômes de feuilles mais ne sont pas ralentis et ont une perte de rendement plus faible."
  },
  {
    english: "Colours are more intense between leaf veins and on the upper side of the leaf.",
    french: "Les couleurs sont plus intenses entre les veines des feuilles et sur le côté supérieur de la feuille."
  },
  {
    english: "Verticillium wilt in canola most often appear near the end of the season as the plants begin to ripen.",
    french: "Verticillium Wilt dans le canola apparaît le plus souvent vers la fin de la saison alors que les plantes commencent à mûrir."
  },
  {
    english: "While the stem is still green, a vertical yellow or brown band extending up one side of the stem may be visible.",
    french: "Bien que la tige soit encore verte, une bande verticale jaune ou brune s'étendant sur un côté de la tige peut être visible."
  },
  {
    english: "Infected plants are often stunted and pale, and produce fewer flowers, branches and pods.",
    french: "Les plantes infectées sont souvent rabougries et pâles, et produisent moins de fleurs, de branches et de gousses."
  },
  {
    english: "Yellow to brown spots on the upper leaf surface which have white dust-like spores on the corresponding under leaf surface.",
    french: "Des taches jaunes à brunes sur la surface des feuilles supérieures qui ont des spores blanches en forme de poussière sur la surface de feuille correspondante."
  },
  {
    english: "Swellings on roots and stems",
    french: "Gonflement sur les racines et les tiges"
  },
  {
    english: "Flowers get malformed and become sterile.",
    french: "Les fleurs sont mal formées et deviennent stériles."
  },
  {
    english: "First symptoms may appear as small, light green spots, which later turn white and finally result in blister-like, raised, white pustules, usually on the lower leaf surface.",
    french: "Les premiers symptômes peuvent apparaître comme de petites taches vert clair, qui deviennent plus tard blanches et finalement entraîner des pustules blanches en forme de cloques, généralement sur la surface des feuilles inférieures."
  },
  {
    english: "Seed pedicels may terminate and form staghorns without seeds developing. Seed yield and quality are severely reduced.",
    french: "Les pédicelles de graines peuvent se terminer et former des staghornes sans se développer.Le rendement et la qualité des graines sont gravement réduits."
  },
  {
    english: "Pustules can develop on the upper or lower leaf surfaces or on stems and consist of masses of sporangia.",
    french: "Les pustules peuvent se développer sur les surfaces des feuilles supérieures ou inférieures ou sur des tiges et se composent de masses de sporange."
  },
  {
    english: "All floral parts are transformed into green leafy structures followed by abundant vein clearing in different flower parts.",
    french: "Toutes les parties florales sont transformées en structures feuillues vertes suivies d'une abondance abondante dans différentes parties de fleurs."
  },
  {
    english: "In severe infection, the entire inflorescences is replaced by short twisted leaves closely arranged on a stem with short internodes, abundant abnormal branches bend down",
    french: "Dans une infection sévère, l'ensemble des inflorescences sont remplacés par de courtes feuilles torsadées étroitement disposées sur une tige avec des entre-nœuds courts, des branches anormales abondantes se penchent"
  },
  {
    english: "Finally, plants look like witches broom.",
    french: "Enfin, les plantes ressemblent à des sorcières à balai."
  },
  {
    english: "Plants of all stage are affected.",
    french: "Les plantes de toutes les étapes sont affectées."
  },
  {
    english: "Water soaked, small and irregular spots are formed on the leaves which later increases and turn brown, under favourable conditions.",
    french: "L'eau trempée, de petits taches irrégulières se forment sur les feuilles qui augmentent plus tard et deviennent brunes, dans des conditions favorables."
  },
  {
    english: "Leaves become dry and brittle, severely infected leaves defoliate",
    french: "Les feuilles deviennent sèches et cassantes, les feuilles gravement infectées défolient"
  },
  {
    english: "Disease appears as small, angular brown leaf spots of 3 mm diameter with gray center and dark margin delimited by veins.",
    french: "La maladie apparaît comme de petites taches de feuilles brunes angulaires de 3 mm de diamètre avec un centre gris et une marge sombre délimitée par des veines."
  },
  {
    english: "In severity of the disease defoliation occurs.",
    french: "Dans la gravité de la maladie, la défoliation se produit."
  },
  {
    english: "Under favourable conditions, the disease spreads to leaf petiole, stem and capsules producing linear dark coloured deep seated lesions.",
    french: "Dans des conditions favorables, la maladie se propage à la pétiole des feuilles, à la tige et aux capsules produisant des lésions profondes de couleur foncée linéaire."
  },
  {
    english: "The fungus attacks young seedling, their stem become water soaked soft and incapable of supporting the seedling which falls over and dies.",
    french: "Le champignon attaque les jeunes semis, leur tige devient trempée d'eau douce et incapable de soutenir les semis qui tombent et meurt."
  },
  {
    english: "On older seedlings elongated brownish black lesions appear which increase in length and width girdling",
    french: "Sur les semis plus âgés, les lésions noires brunâtres allongées apparaissent qui augmentent en longueur et en largeur"
  },
  {
    english: "The stem and plant dies.",
    french: "La tige et la plante meurt."
  },
  {
    english: "The leaves turn yellow and then dry up slowly.",
    french: "Les feuilles deviennent jaunes puis sécher lentement."
  },
  {
    english: "Begin drying of leaf tip downwards.",
    french: "Commencez à sécher de la pointe des feuilles vers le bas."
  },
  {
    english: "The entire plant shows complete drying of the foliage",
    french: "L'usine entière montre un séchage complet du feuillage"
  },
  {
    english: "Leaves turn to pale green.",
    french: "Les feuilles se tournent vers le vert pâle."
  },
  {
    english: "On leaves, cottony white mycelial growth develops and appears white.",
    french: "Sur les feuilles, la croissance mycélienne blanche cotony se développe et semble blanche."
  },
  {
    english: "White downy growth appears on the surface of the leaves.",
    french: "La croissance du duvet blanc apparaît à la surface des feuilles."
  },
  {
    english: "Botrytis is the major disease of onions in cool climate areas.",
    french: "Botrytis est la principale maladie des oignons dans les zones climatiques fraîches."
  },
  {
    english: "Light infections do not affect yields but heavy infections causing major yield reductions can occur.",
    french: "Les infections légères n'affectent pas les rendements, mais des infections lourdes provoquant des réductions de rendement majeures peuvent survenir."
  },
  {
    english: "Hundreds of white specks are seen on the foliage.",
    french: "Des centaines de taches blanches sont visibles sur le feuillage."
  },
  {
    english: "Seedlings topple after emerging from soil.",
    french: "Les semis renversent après avoir émergé du sol."
  },
  {
    english: "It occurs at ground or below ground level.",
    french: "Il se produit au niveau du sol ou sous le sol."
  },
  {
    english: "Infected tissues appear soft and water soaked.",
    french: "Les tissus infectés semblent doux et trempés de l'eau."
  },
  {
    english: "Black smut sori are seen at the base of the leaves and leaf surface.",
    french: "Le charbon noir est visible à la base des feuilles et de la surface des feuilles."
  },
  {
    english: "Black powdery mass is seen after rupturing of sorus wall.",
    french: "La masse poudreuse noire est vue après la rupture du mur de Sorus."
  },
  {
    english: "The infection progresses inward from leaf to leaf",
    french: "L'infection progresse vers l'intérieur de la feuille à la feuille"
  },
  {
    english: "The initial symptoms are yellowing and dieback of leaf tips.",
    french: "Les symptômes initiaux sont jaunissants et les dépérissement des pointes des feuilles."
  },
  {
    english: "Later, scales, stem plates and roots get destroyed.",
    french: "Plus tard, les échelles, les plaques de tiges et les racines sont détruites."
  },
  {
    english: "The bulbs become soft and water soaked.",
    french: "Les ampoules deviennent douces et trempées d'eau."
  },
  {
    english: "Begins as small, elliptical lesions.",
    french: "Commence comme de petites lésions elliptiques."
  },
  {
    english: "Lesions turn purplish-brown progressively surrounded by chlorotic margins.",
    french: "Les lésions deviennent un brun violacé progressivement entouré de marges chlorotiques."
  },
  {
    english: "Lesions begin at tip of older leaves and accumulate on the leaves making it fall off",
    french: "Les lésions commencent à la pointe des feuilles plus âgées et s'accumulent sur les feuilles, ce qui le fait tomber"
  },
  {
    english: "Yellow to orange colored small flecks develop in the middle of the leaf.",
    french: "Les petits taches de couleur jaune à orange se développent au milieu de la feuille."
  },
  {
    english: "Flecks spread to form elongated, spindle shaped to ovate, diffused spots.",
    french: "Les taches se propagent pour former une broche allongée et en forme de taches ovales et diffusées."
  },
  {
    english: "Flecks are surrounded by a characteristic pink margin.",
    french: "Les taches sont entourées d'une marge rose caractéristique."
  },
  {
    english: "Abnormal elongation of the neck.",
    french: "Allongement anormal du cou."
  },
  {
    english: "Water-soaked lesions that are pale yellow in color appear initially on leaf blades.",
    french: "Les lésions imbibées d'eau qui sont de couleur jaune pâle apparaissent initialement sur les lames de feuilles."
  },
  {
    english: "Infected leaves develop yellow streaks that spread progressively leading to yellow leaves.",
    french: "Les feuilles infectées développent des stries jaunes qui se propagent progressivement conduisant à des feuilles jaunes."
  },
  {
    english: "Leaves curl and plants wilt.",
    french: "Les feuilles se boulonnent et les plantes se sont flétris."
  },
  {
    english: "Bulbs do not grow to full size although they are firm and solid.",
    french: "Les ampoules ne atteignent pas la grande taille, bien qu'elles soient ferme et solide."
  },
  {
    english: "Leaves show lesions that maybe diamond or spindle-shaped.",
    french: "Les feuilles montrent des lésions que peut-être le diamant ou le fuseau en forme de fuseau."
  },
  {
    english: "They are straw-colored and sometimes have distinct green center with yellow borders.",
    french: "Ils sont de couleur paille et ont parfois un centre vert distinct avec des bordures jaunes."
  },
  {
    english: "Flower stalks are infected in later stages.",
    french: "Les tiges de fleurs sont infectées à des stades ultérieurs."
  },
  {
    english: "Reduced bulb size",
    french: "Taille de l'ampoule réduite"
  },
  {
    english: "Roots turn pink or maroon when infected.",
    french: "Les racines deviennent roses ou marron lorsqu'elles sont infectées."
  },
  {
    english: "In severe cases the roots may die and the plants become weakened",
    french: "Dans les cas graves, les racines peuvent mourir et les plantes s'affaiblissent"
  },
  {
    english: "Infection usually is through neck tissues as foliage dies down at maturity.",
    french: "L'infection se fait généralement à travers les tissus du cou lorsque le feuillage s'éteint à maturité."
  },
  {
    english: "Infected bulbs are discoloured black around the neck, and affected scales shrivel.",
    french: "Les ampoules infectées sont décolorées en noir autour du cou et les écailles affectées se ratatinent."
  },
  {
    english: "Masses of powdery black spores develop as streaks along veins on and between outer dry scale",
    french: "Des masses de spores noires poudrées se développent comme des stries le long des veines sur et entre l'échelle sèche extérieure"
  },
  {
    english: "Infected bulbs are discoloured green around the neck, and affected scales shrivel.",
    french: "Les ampoules infectées sont décolorées vertes autour du cou et les écailles affectées se ratatinent."
  },
  {
    english: "Masses of powdery green spores generally are arranged as streaks along veins on",
    french: "Des masses de spores vertes poudrées sont généralement disposées comme des stries le long des veines"
  },
  {
    english: "Bacterial soft rot is mainly a problem on mature bulbs.",
    french: "La pourriture molle bactérienne est principalement un problème sur les ampoules matures."
  },
  {
    english: "Affected scales first appear water-soaked and pale yellow to light brown.",
    french: "Les échelles affectées apparaissent d'abord à l'eau et jaune pâle à brun clair."
  },
  {
    english: "As the soft rot progresses, invaded fleshy scales become soft",
    french: "À mesure que la pourriture douce progresse, les échelles charnues envahies deviennent douces"
  },
  {
    english: "Leaves turn yellow",
    french: "Les feuilles deviennent jaunes"
  },
  {
    english: "Main root system rots away.",
    french: "Le système racinaire principal se détache."
  },
  {
    english: "Tea bush eventually dies.",
    french: "Le buisson de thé meurt finalement."
  },
  {
    english: "Decline of the bush",
    french: "Déclin du buisson"
  },
  {
    english: "Wood bears superficial irregular dark‐grey to black raised patches",
    french: "Les ours en bois sont superficiels irréguliers de grem"
  },
  {
    english: "Dead branches carry small black patches.",
    french: "Les branches mortes portent de petites plaques noires."
  },
  {
    english: "Yellow or brown foliage on affected branches",
    french: "Feuillage jaune ou brun sur les branches affectées"
  },
  {
    english: "Lesions at the collar region of the bush",
    french: "Lésions dans la région du col de la brousse"
  },
  {
    english: "Dead wood can be seen by scraping back the bark",
    french: "Le bois mort peut être vu en grattant l'écorce"
  },
  {
    english: "Small, oval, pale yellow-green spots appearing on young leaves.",
    french: "Petites taches ovales et jaune pâle apparaissant sur les jeunes feuilles."
  },
  {
    english: "Spots are surrounded by a narrow, yellow zone.",
    french: "Les taches sont entourées d'une zone jaune étroite."
  },
  {
    english: "Eventually, the dried tissue falls, leading to defoliation",
    french: "Finalement, le tissu séché tombe, conduisant à une défoliation"
  },
  {
    english: "Seedlings develop yellowish cotyledons and may be reddish on the underside; seedlings may die within two to four weeks after planting.",
    french: "Les semis développent des cotylédons jaunâtres et peuvent être rougeâtre sur le dessous;Les semis peuvent mourir dans les deux à quatre semaines après la plantation."
  },
  {
    english: "Leaves may have a bluish-green cast.",
    french: "Les feuilles peuvent avoir un plâtre vert bleuâtre."
  },
  {
    english: "Roots are grayish or light brown, water-soaked, and have a reduced mass.",
    french: "Les racines sont grisâtres ou bruns clairs, imbibés d'eau et ont une masse réduite."
  },
  {
    english: "Plants appear stunted and yellow.",
    french: "Les plantes apparaissent rabougries et jaunes."
  },
  {
    english: "Lateral and fibrous roots are reduced.",
    french: "Les racines latérales et fibreuses sont réduites."
  },
  {
    english: "Existing roots may be black and rotted.",
    french: "Les racines existantes peuvent être noires et pourries."
  },
  {
    english: "Seedlings fail to emerge or die soon after emergence.",
    french: "Les semis ne parviennent pas à émerger ou à mourir peu de temps après l'émergence."
  },
  {
    english: "Plants appear stunted, yellow or reddish-purple lower leaves, may be wilted.",
    french: "Les plantes apparaissent rabougris, les feuilles inférieures à purge jaune ou rougeâtre peuvent être fanées."
  },
  {
    english: "Taproots have tan to brown or red-brown to black lesions and can be rotted just below the crown",
    french: "Les racines pimenttes ont des lésions brunes à brun ou rouge à noir et peuvent être pourries juste en dessous de la couronne"
  },
  {
    english: "If emergence occurs, plants appear stunted, yellowish, may be wilted.",
    french: "Si l'émergence se produit, les plantes semblent ralentis, jaunâtres, peuvent être fanées."
  },
  {
    english: "Roots appear waterlogged, mushy, rotted.",
    french: "Les racines apparaissent à eau, pâteuse, pourries."
  },
  {
    english: "Stunted plants have many spindly, shortened stems and small, light green to yellow leaflets.",
    french: "Les plantes rabougries ont de nombreuses tiges grêles et raccourcies et de petits folioles vert clair à jaune."
  },
  {
    english: "Outer vascular taproot tissue becomes yellow to dark golden brown.",
    french: "Le tissu de la racine de tapoot vasculaire externe devient jaune au brun doré foncé."
  },
  {
    english: "Leaves may be cupped.",
    french: "Les feuilles peuvent être en coupe."
  },
  {
    english: "Tan, sunken, and elliptical lesions develop on the taproot where lateral roots emerge",
    french: "Les lésions bronzées, coulées et elliptiques se développent sur la tapoot où les racines latérales émergent"
  },
  {
    english: "During the winter, existing root lesions turn black.",
    french: "Pendant l'hiver, les lésions racinaires existantes deviennent noires."
  },
  {
    english: "Scattered, wilted plants are the first evidence.",
    french: "Les plantes dispersées et fanées sont la première preuve."
  },
  {
    english: "One side of the stem may wilt and die or the whole plant may be affected.",
    french: "Un côté de la tige peut se flétri et mourir ou la plante entière peut être affectée."
  },
  {
    english: "Stems and leaves appear bleached",
    french: "Les tiges et les feuilles semblent blanchies"
  },
  {
    english: "Stem tips wilt and bend forming a shepherd's crook",
    french: "Conseils de tige Wilt et Bend Formant un escroc d'un berger"
  },
  {
    english: "Diamond-shaped, ash-gray lesions with dark-brown to purple borders develop on lower stems.",
    french: "Des lésions en forme de diamant et gris avec des frontières brun foncé à violet se développent sur des tiges inférieures."
  },
  {
    english: "Lesions may girdle the stem, causing plants to wilt, drop leaves, and have straw-colored shoots.",
    french: "Les lésions peuvent cesse de la tige, faisant flétrir les plantes, laisser tomber les feuilles et avoir des pousses de couleur paille."
  },
  {
    english: "Systemic symptoms, such as chlorosis, generally appear on the second leaf, and all the subsequent leaves and panicles of the infected plant show symptoms.",
    french: "Les symptômes systémiques, tels que la chlorose, apparaissent généralement sur la deuxième feuille, et toutes les feuilles et panicules ultérieures de la plante infectée présentent des symptômes."
  },
  {
    english: "Leaf symptoms begin as chlorosis at the base of the leaf lamina, and successively higher leaves show a progression of greater leaf area coverage by the symptoms.",
    french: "Les symptômes des feuilles commencent comme de la chlorose à la base de la lame des feuilles, et des feuilles successivement plus élevées montrent une progression d'une plus grande couverture de la zone foliaire par les symptômes."
  },
  {
    english: "Infected chlorotic areas produce a massive amount of asexual spores, generally on the lower surface, giving the leaf a \"downy\" appearance.",
    french: "Les zones chlorotiques infectées produisent une quantité massive de spores asexuées, généralement sur la surface inférieure, donnant à la feuille une apparence \"duveteuse\"."
  },
  {
    english: "Rust symptoms first appear on lower leaves as typical pustules containing reddish-brown powder (uredospores).",
    french: "Les symptômes de la rouille apparaissent d'abord sur les feuilles inférieures comme des pustules typiques contenant de la poudre brun rougeâtre (uredospores)."
  },
  {
    english: "Later, dark brown teliospores are produced. Symptoms can occur on both the upper and lower surfaces of the leaves but mostly on the upper surface and also on the stem. Highly susceptible cultivars develop large pustules on leaf blades and sheaths.",
    french: "Plus tard, des télésiospores brun foncé sont produites.Des symptômes peuvent survenir sur les surfaces supérieures et inférieures des feuilles mais principalement sur la surface supérieure et également sur la tige.Les cultivars très sensibles développent de grandes pustules sur les lames et les gaines foliaires."
  },
  {
    english: "It appears, generally after the grain-filling stage, causing little or no loss in grain yield.",
    french: "Il apparaît, généralement après le stade de remplissage des grains, provoquant peu ou pas de perte de rendement en grains."
  },
  {
    english: "In the infected florets, ovaries are converted into structures called sori.",
    french: "Dans les fleurons infectés, les ovaires sont convertis en structures appelées sori."
  },
  {
    english: "The sori are larger than grains and appear as enlarged, oval to conical bodies projecting somewhat beyond the glumes in place of grains. Initially,",
    french: "Les Sori sont plus grands que les grains et apparaissent comme élargis, ovales à coniques, se projetant quelque peu au-delà des grognements à la place des grains.Initialement,"
  },
  {
    english: "The sori are bright green but later turn brown to black",
    french: "Les sori sont vert vif mais deviennent plus tard brun en noir"
  },
  {
    english: "The disease is easily identified as a honeydew substance of creamy to light pinkish ooze out of the infected florets which contains numerous conidia.",
    french: "La maladie est facilement identifiée comme une substance miellée de suintement crémeux à rosâtre clair des fleurons infectés qui contient de nombreuses conidies."
  },
  {
    english: "Within two weeks, these droplets dry out as hard dark black structures larger than seeds, protruding out from the florets in place of grain, which are called sclerotia.",
    french: "En deux semaines, ces gouttelettes sèchent sous forme de structures noires foncées dures plus grandes que les graines, sortant des fleurons à la place du grain, qui sont appelés sclérotes."
  },
  {
    english: "Here the loss in grain yield is directly proportional to the percentage of infection as the infected seed is fully transformed into sclerotium.",
    french: "Ici, la perte de rendement en grains est directement proportionnelle au pourcentage d'infection car la graine infectée est complètement transformée en sclérotium."
  },
  {
    english: "Whip-like structure of 25 – 150 cm. Whip covered by translucent silvery membrane enclosing a mass of black powdery spores.",
    french: "Structure en forme de fouet de 25 à 150 cm.Fouet recouvert de membrane argentée translucide enferment une masse de spores poudreuses noires."
  },
  {
    english: "These spots turn red-brown to brown in color",
    french: "Ces taches deviennent du brun rouge en couleur brune"
  },
  {
    english: "Affected leaves are brittle with their margins rolled upwards.",
    french: "Les feuilles affectées sont fragiles avec leurs marges roulées vers le haut."
  },
  {
    english: "Do not produce bunches of any commercial value",
    french: "Ne produisez pas de grappes d'une valeur commerciale"
  },
  {
    english: "Yellowing of lower leaves, including leaf blades and petioles.",
    french: "Jaunissement des feuilles inférieures, y compris les lames de feuilles et les pétioles."
  },
  {
    english: "Yellowish to reddish streaks are noted with intensification of color towards the rhizome.",
    french: "Des stries jaunâtres à rougeâtre sont notées avec une intensification de la couleur vers le rhizome."
  },
  {
    english: "Longitudinal splitting of pseudostem.",
    french: "Diffusion longitudinale du pseudostem."
  },
  {
    english: "Infected fruits become black and rotten.",
    french: "Les fruits infectés deviennent noirs et pourris."
  },
  {
    english: "Black lesions on the pedicel.",
    french: "Lésions noires sur le pédicelle."
  },
  {
    english: "Fruit shrivelled",
    french: "Fruits ratatinés"
  },
  {
    english: "Reduced bunch size and uneven ripening of fruit",
    french: "Taille réduite des grappes et maturation inégale des fruits"
  },
  {
    english: "Reduces the plant's photosynthetic potential.",
    french: "Réduit le potentiel photosynthétique de la plante."
  },
  {
    english: "Defoliation",
    french: "Défoliation"
  },
  {
    english: "Small water-soaked tan spots on outer leaves",
    french: "Petites taches de bronzage imbibées d'eau sur les feuilles extérieures"
  },
  {
    english: "Shot-hole appearance on the plant",
    french: "Apparence de trous de tir sur la plante"
  },
  {
    english: "Outer leaves often break off",
    french: "Les feuilles extérieures se brisent souvent"
  },
  {
    english: "Soft watery lesions on leaves",
    french: "Lésions aqueuses douce sur les feuilles"
  },
  {
    english: "Leaves collapse and lie on the soil surface",
    french: "Les feuilles s'effondrent et se trouvent à la surface du sol"
  },
  {
    english: "Black fungal structures on infected leaf tissue",
    french: "Structures fongiques noires sur le tissu foliaire infecté"
  },
  {
    english: "White fungal growth on both sides of leaves",
    french: "Croissance fongique blanche des deux côtés des feuilles"
  },
  {
    english: "Leaves turning yellow or brown",
    french: "Les feuilles deviennent jaunes ou bruns"
  },
  {
    english: "Small black fruiting bodies may be visible",
    french: "De petits corps de fructification noirs peuvent être visibles"
  },
  {
    english: "Small chlorotic spots on old leaves",
    french: "Petites taches chlorotiques sur les vieilles feuilles"
  },
  {
    english: "Lesions may fall out creating holes",
    french: "Les lésions peuvent tomber en créant des trous"
  },
  {
    english: "Wilting leaves and plant death",
    french: "Feuilles de flétris et mort végétale"
  },
  {
    english: "Veins enlarged and clear",
    french: "Veines agrandies et claires"
  },
  {
    english: "Puckered or ruffled leaves",
    french: "Feuilles plissées ou ébouriffées"
  },
  {
    english: "Upright outer leaves",
    french: "Feuilles extérieures verticales"
  },
  {
    english: "Circular lesions and black patches on chili pods",
    french: "Lésions circulaires et patchs noirs sur les gousses de chili"
  },
  {
    english: "Irregular brown spots with dark brown holes on leaves and stems",
    french: "Taches brunes irrégulières avec des trous brun foncé sur les feuilles et les tiges"
  },
  {
    english: "The affected fruits may fall off subsequently",
    french: "Les fruits affectés peuvent tomber par la suite"
  },
  {
    english: "Black lesions on stems",
    french: "Lésions noires sur les tiges"
  },
  {
    english: "Circular gray-brown lesions on leaves and wilting of the plant",
    french: "Lésions gris-brun circulaires sur les feuilles et la flétrissement de la plante"
  },
  {
    english: "Dark lesions on fruit which may be covered in white sporangia",
    french: "Lésions sombres sur les fruits qui peuvent être recouverts de sporange blanc"
  },
  {
    english: "Upward curling in the leaves, crinkling appearance",
    french: "Curling vers le haut dans les feuilles, pliage de l'apparence"
  },
  {
    english: "Shortening of petioles, internodes, and bunchy leaves",
    french: "Shortening of pétioles, entre-noueurs et feuilles regroupées"
  },
  {
    english: "Severe stunting in plants",
    french: "Srenauvage sévère dans les plantes"
  },
  {
    english: "The leaves turn yellow and die",
    french: "Les feuilles deviennent jaunes et meurent"
  },
  {
    english: "Initial slight yellowing of the foliage and wilting of the upper leaves",
    french: "Boulonnage léger initial du feuillage et flétrissement des feuilles supérieures"
  },
  {
    english: "The vascular system of the plant is discoloured",
    french: "Le système vasculaire de la plante est décoloré"
  },
  {
    english: "Dieback of twigs",
    french: "Dépérissement des brindilles"
  },
  {
    english: "Premature leaf drop",
    french: "Goutte de feuille prématurée"
  },
  {
    english: "Dark staining on fruit",
    french: "Tachage sombre sur les fruits"
  },
  {
    english: "The disease causes small, round blister-like formations on leaves, branches, stems, new shoots, and fruit",
    french: "La maladie provoque de petites formations rondes en forme de cloques sur les feuilles, les branches, les tiges, les nouvelles pousses et les fruits"
  },
  {
    english: "Crater-like lesions form on the surface surrounded by an oily, water-soaked margin or yellow halo",
    french: "Des lésions en forme de cratère se forment à la surface entourée d'une marge huileuse et imbibée d'eau ou d'un halo jaune"
  },
  {
    english: "In young fruit, an ooze of resinous substance may be observed.",
    french: "Dans les jeunes fruits, une suintement de substance résineuse peut être observée."
  },
  {
    english: "Citrus scab attacks the fruit, leaves, and twigs, producing slightly raised, irregular scabby or wart-like outgrowths.",
    french: "La gale d'agrumes attaque les fruits, les feuilles et les brindilles, produisant une gale légèrement surélevée et irrégulière ou des excroissances en forme de verrue."
  },
  {
    english: "The scabs are grey or pinkish at first and become darker with age. They are more common on lemon fruits than leaves.",
    french: "Les croûtes sont grises ou rosées au début et deviennent plus sombres avec l'âge.Ils sont plus communs sur les fruits de citron que les feuilles."
  },
  {
    english: "The raised lumps associated with scab can be confused with symptoms caused by the disease botrytis or with wind-rub abrasions.",
    french: "Les grumeaux surélevés associés à la gale peuvent être confondus avec les symptômes causés par la maladie botrytis ou avec les abrasions de dénudés de vent."
  },
  {
    english: "Light green foliage, poor new growth, leaves may be dropping from the tree",
    french: "Feuillage vert clair, mauvaise croissance, les feuilles peuvent tomber de l'arbre"
  },
  {
    english: "Severely infected trees are stunted and bushy in appearance with chlorotic leaves and brittle twigs",
    french: "Les arbres gravement infectés sont rabougris et broussailleux avec des feuilles chlorotiques et des rameaux cassants"
  },
  {
    english: "Some strains of the virus cause elongated pits in the trunk and branches, which give the wood a rope-like appearance.",
    french: "Certaines souches du virus provoquent des fosses allongées dans le tronc et les branches, qui donnent au bois une apparence en forme de corde."
  },
  {
    english: "Yellowing of leaf veins, blotchy mottling on leaf blades",
    french: "Jaunissement des veines des feuilles, marbrure tachée sur les lames de feuilles"
  },
  {
    english: "Twig and limb dieback and fruits dropping prematurely",
    french: "Twig et membre Dieback et Fruits qui tombent prématurément"
  },
  {
    english: "Small, misshapen fruit and fruit very bitter.",
    french: "Petits fruits et fruits déformés très amers."
  },
  {
    english: "Pale brown sunken spots may appear on the cotyledons of infected seedlings.",
    french: "Les taches enfoncées brunes pâles peuvent apparaître sur les cotylédons des semis infectés."
  },
  {
    english: "Lesions on leaves are dark brown.",
    french: "Les lésions sur les feuilles sont brun foncé."
  },
  {
    english: "They are restricted to the veins on the lower leaf surface. On stems, lesions are elongated and sunken.",
    french: "Ils sont limités aux veines de la surface inférieure des feuilles.Sur les tiges, les lésions sont allongées et enfoncées."
  },
  {
    english: "The fungus produces a grey mould on the lower surface of the spots.",
    french: "Le champignon produit un moule gris sur la surface inférieure des taches."
  },
  {
    english: "Infected pods have brown blotches",
    french: "Les gousses infectées ont des taches brunes"
  },
  {
    english: "The spots may increase in size, join together, and cause yellowing and necrosis of the affected leaves",
    french: "Les taches peuvent augmenter en taille, se réunir et provoquer le jaunissement et la nécrose des feuilles affectées"
  },
  {
    english: "Rust-colored pustules form on the lower leaf surfaces.",
    french: "Les pustules de couleur rouille se forment sur les surfaces des feuilles inférieures."
  },
  {
    english: "Severely infected leaves turn yellow, wilt, and then drop off of the plant.",
    french: "Les feuilles gravement infectées deviennent jaunes, flétrissent, puis déposent de la plante."
  },
  {
    english: "Stems and pods may also be infected. It affects most types of beans under humid conditions",
    french: "Les tiges et les gousses peuvent également être infectées.Il affecte la plupart des types de haricots dans des conditions humides"
  },
  {
    english: "Symptoms of bean common mosaic virus (BCMV) are cupping and twisting of leaves with a light and dark green mosaic pattern.",
    french: "Les symptômes du virus de la mosaïque commun (BCMV) sont de ventouses et de torsion des feuilles avec un motif de mosaïque vert clair et vert foncé."
  },
  {
    english: "The dark green tissue is often bubbled and/or in bands next to the veins.",
    french: "Le tissu vert foncé est souvent bouillonnant et/ou dans des bandes à côté des veines."
  },
  {
    english: "Affected plants produce smaller, curled pods with a greasy appearance resulting in poor yields.",
    french: "Les plantes affectées produisent des gousses enroulées plus petites avec un aspect gras, entraînant de mauvais rendements."
  },
  {
    english: "The initial symptoms of sweet orange scab form on very young fruit as lesions that are slightly raised and pink to light brown.",
    french: "Les symptômes initiaux de la gale orange sucré se forment sur de très jeunes fruits comme des lésions légèrement surélevées et roses à brun clair."
  },
  {
    english: "The lesion color changes to yellowish brown and eventually to dark gray.",
    french: "La couleur des lésions se transforme en brun jaunâtre et finalement en gris foncé."
  },
  {
    english: "Orange scab can cause premature fruit drop and stunt young nursery trees and new field plantings, but has little impact on fruit quality.",
    french: "La gale d'orange peut provoquer des chutes de fruits prématurées et des jeunes arbres de pépinière et de nouvelles plantations de terrain, mais a peu d'impact sur la qualité des fruits."
  },
  {
    english: "Trees infected with tristeza show light green foliage, and some leaf drop.",
    french: "Les arbres infectés par Tristeza présentent un feuillage vert clair et une certaine goutte de feuilles."
  },
  {
    english: "Feeder roots die from the tip towards the main root.",
    french: "Les racines du mangeur meurent de la pointe vers la racine principale."
  },
  {
    english: "Yellow seedlings, Stem pitting, poor fruit quality",
    french: "Plants jaunes, piqûres de tige, mauvaise qualité des fruits"
  },
  {
    english: "Lopsided, bitter, hard fruit with small, dark aborted seeds",
    french: "Fruit déséquilibré, amer et dur avec de petites graines abandonnées sombres"
  },
  {
    english: "Fruit that remains green even when ripe",
    french: "Fruit qui reste vert même lorsqu'il est mûr"
  },
  {
    english: "Asymmetrical blotchy mottling of leaves, yellow shoots, twig dieback",
    french: "Motteries tachées asymétriques des feuilles, pousses jaunes, pure de terre"
  },
  {
    english: "The earliest symptom of garlic rust is small, circular to elongate white flecks that occur on both sides of leaves.",
    french: "Le premier symptôme de rouille à l'ail est petit, circulaire à allongé des taches blanches qui se produisent des deux côtés des feuilles."
  },
  {
    english: "As the disease progresses, these small spots expand, and the leaf tissue covering the lesions ruptures and masses of orange, powdery spores (uredospores) then become visible as pustules.",
    french: "Au fur et à mesure que la maladie progresse, ces petits endroits se développent et le tissu foliaire couvrant les rompre des lésions et les masses de spores oranges poudreuses (uredospores) deviennent alors visibles sous forme de pustules."
  },
  {
    english: "Severely infected leaves are almost entirely covered with pustules, resulting in extensive yellowing, wilting and premature drying of leaves.",
    french: "Les feuilles gravement infectées sont presque entièrement recouvertes de pustules, ce qui entraîne un jaunissement approfondi, un flétrissement et un séchage prématuré des feuilles."
  },
  {
    english: "Twisting, curling of leaves.",
    french: "Twist, curling des feuilles."
  },
  {
    english: "Water-soaked lesions that are pale yellow in colour appear initially on leaf blades.",
    french: "Les lésions imbibées d'eau qui sont de couleur jaune pâle apparaissent initialement sur les lames de feuilles."
  },
  {
    english: "Parts of spear leaf petiole or rachi turning brown",
    french: "Parties de la pétiole de la feuille de lance ou de Rachi devient brun"
  },
  {
    english: "Discoloration may be associated with a wet rot",
    french: "La décoloration peut être associée à une pourriture humide"
  },
  {
    english: "Spear leaf may be wilted and/or chlorotic",
    french: "La feuille de lance peut être fanée et/ou chlorotique"
  },
  {
    english: "Reduced growth of palm and older fronds turning chlorotic or necrotic",
    french: "Croissance réduite de la paume et des frondes plus âgées devenant chlorotique ou nécrotique"
  },
  {
    english: "Pale green foliage",
    french: "Feuillage vert pâle"
  },
  {
    english: "Drooping fronds",
    french: "Frondes tombantes"
  },
  {
    english: "Field palms may exhibit a bright yellow chlorosis of leaves in the mid-canopy which starts at the tip pf the pinnae and moves towards petioles before affecting adjacent fronds and spreading to older leaves in the canopy.",
    french: "Les palmiers de campagne peuvent présenter une chlorose jaune vif de feuilles dans le milieu de la canopie qui commence à la pointe du pinna et se déplace vers des pétioles avant d'affecter les frondes adjacentes et de se propager aux feuilles plus anciennes de la canopée."
  },
  {
    english: "In older palms, lower leaves wilt and dry out and fronds break close to the base of the trunk; new fronds are chlorotic and stunted.",
    french: "Chez les paumes plus âgées, les feuilles inférieures se flétrit et se séchent et les frondes se cassent près de la base du tronc;Les nouvelles frondes sont chlorotiques et ralentis."
  },
  {
    english: "Drying of leaves",
    french: "Séchage des feuilles"
  },
  {
    english: "Tiny black spots on leaves which enlarge into 2 mm long elliptical, elongated lesions",
    french: "De minuscules taches noires sur les feuilles qui agrandissent en lésions elliptiques et allongées de 2 mm de long"
  },
  {
    english: "Lesions may expand and be surrounded by black tissue and chlorosis between lesions",
    french: "Les lésions peuvent se développer et être entourées de tissus noirs et de chlorose entre les lésions"
  },
  {
    english: "Lesions may be present on leaf petioles and rachis",
    french: "Des lésions peuvent être présentes sur les pétioles et les rachis des feuilles"
  },
  {
    english: "Leaf symptoms include round, brown spots with concentric rings",
    french: "Les symptômes des feuilles comprennent des taches brunes rondes avec des anneaux concentriques"
  },
  {
    english: "Spots often have a yellow halo, and can crack through the middle",
    french: "Les taches ont souvent un halo jaune et peuvent se fissurer au milieu"
  },
  {
    english: "As the disease spreads, leaves can develop enough spots that they begin to meld together to create large necrotic areas on leaves",
    french: "À mesure que la maladie se propage, les feuilles peuvent développer suffisamment de taches pour commencer à se fondre pour créer de grandes zones nécrotiques sur les feuilles"
  },
  {
    english: "The young radical and the plumule are killed and there is complete rotting of the seedlings",
    french: "Les jeunes radicaux et les plumules sont tués et il y a une pourriture complète des semis"
  },
  {
    english: "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level",
    french: "La phase de post-émergence est caractérisée par l'infection des jeunes tissus juvéniles du collier au niveau du sol"
  },
  {
    english: "The seedlings topple over or  collapse",
    french: "Les semis renversent ou s'effondrent"
  },
  {
    english: "First appear as chlorotic or yellow (angular) areas near the leaf margins",
    french: "Apparaissent d'abord comme des zones chlorotiques ou jaunes (angulaires) près des marges des feuilles"
  },
  {
    english: "Yellow area extends to veins and midrib forming characteristic ‘v’ shaped chlorotic spots which later turn black",
    french: "La zone jaune s'étend aux veines et à la tronçon médiane formant des taches chlorotiques en forme de «V» caractéristiques qui deviennent plus tard noires"
  },
  {
    english: "Veins and veinlets turn brown and finally black",
    french: "Les veines et les veinlets deviennent bruns et enfin noirs"
  },
  {
    english: "Small purplish brown spots on under surface of leaves",
    french: "Petites taches brunes violacées sur la surface des feuilles"
  },
  {
    english: "Small, pale yellow angular spots on upper surface of leaves, with downy growth on the under surface",
    french: "Petites taches angulaires jaune pâle sur la surface supérieure des feuilles, avec une croissance duveteuse sur la surface sous"
  },
  {
    english: "The spots coalesce and the leaves shrivel and dries up prematurely",
    french: "Les taches fusionnent et les feuilles se rattrapent et sèche prématurément"
  },
  {
    english: "Leaves sometime show signs of wilting or water loss",
    french: "Feuilles parfois des signes de flétrissement ou de perte d'eau"
  },
  {
    english: "The stalk near the ground become water-soaked with brownish discolouration and are easily breakable.",
    french: "La tige près du sol devient imbibée d'eau avec une décoloration brunâtre et est facilement cassable."
  },
  {
    english: "The rotting tissues emit a putrid smell.",
    french: "Les tissus pourris émettent une odeur putride."
  },
  {
    english: "Small yellowish round or oval spots appear on the leaves",
    french: "De petites taches rond ou ovales jaunâtres apparaissent sur les feuilles"
  },
  {
    english: "Yellowish spots enlarge and become elliptical",
    french: "Les taches jaunâtres agrandissent et deviennent elliptiques"
  },
  {
    english: "Center becomes straw coloured with a reddish brown margin",
    french: "Le centre devient coloré en paille avec une marge brun rougeâtre"
  },
  {
    english: "Disease appears at pre-flowering stage in 40-50 days old plants but can also occur on younger plants",
    french: "La maladie apparaît au stade pré-fleenage dans des plantes vieilles de 40 à 50 jours mais peut également se produire sur des plantes plus jeunes"
  },
  {
    english: "Symptoms develop on leaves, sheaths and stalks and can later spread to ears",
    french: "Les symptômes se développent sur les feuilles, les gaines et les tiges et peuvent ensuite se propager aux oreilles"
  },
  {
    english: "On leaves and sheaths, a number of soaked, discolored concentric bands and rings are visible, often brown, tan or gray in color",
    french: "Sur les feuilles et les gaines, un certain nombre de bandes et anneaux concentriques trempés et décolorés sont de couleur visible, souvent brune, bronzée ou gris"
  },
  {
    english: "It is characterized by the presence of long, narrow, brownish, interveinal stripes on leaves",
    french: "Il se caractérise par la présence de rayures intervéinales longues, étroites, brunâtres et intervéinales sur les feuilles"
  },
  {
    english: "Whitish downy fungal growth may be observed on close examination on underside of the stripes",
    french: "Une croissance fongique du duvet blanchâtre peut être observée en un examen attentif sur le dessous des rayures"
  },
  {
    english: "Early-stage symptoms are visible as flecks or blobs on the lowermost leaves, giving them a burnt appearance",
    french: "Les symptômes à un stade précoce sont visibles sous forme de taches ou de taches sur les feuilles les plus basses, leur donnant une apparence brûlée"
  },
  {
    english: "Entire crop give a blasted or burnt appearance",
    french: "Une récolte entière donne une apparence dynamitée ou brûlée"
  },
  {
    english: "Neck region of panicle develops a black color and shrivels completely \/ partially grain set inhibited, panicle breaks at the neck and hangs",
    french: "La région du cou de la panicule développe une couleur noire et se rétrécit complètement \partiellement des grains inhibés, la panicule se brise au cou et pend"
  },
  {
    english: "Nodal Blast: Nodes become black and break up",
    french: "Blast nodal: les nœuds deviennent noirs et se brisent"
  },
  {
    english: "Water-soaked to yellowish stripes on leaf blades or starting at leaf tips",
    french: "Des rayures à l'eau à l'eau sur les lames de feuilles ou à commencer par les pointes des feuilles"
  },
  {
    english: "Appearance of bacterial ooze that looks like a milky or opaque dewdrop on young lesions early in the morning",
    french: "Apparence de suintement bactérien qui ressemble à une goutte de rosée laiteuse ou opaque sur les jeunes lésions tôt le matin"
  },
  {
    english: "Lessions turn yellow to white as the disease advances",
    french: "Les lerions deviennent jaunes en blanc à mesure que la maladie avance"
  },
  {
    english: "Leaves become yellow or orange-yellow, may also have rust-colored spots",
    french: "Les feuilles deviennent jaune ou jaune orange, peuvent également avoir des taches de couleur rouille"
  },
  {
    english: "Discoloration begins from leaf tip and extends down to the blade or the lower leaf portion",
    french: "La décoloration commence par la pointe des feuilles et s'étend jusqu'à la lame ou la partie feuille inférieure"
  },
  {
    english: "Delayed flowering, - panicles small and not completely exerted",
    french: "Floraison retardée, - panicules petites et non complètement exercées"
  },
  {
    english: "Irregular spots or lesions, with dark reddish brown margins and gray center",
    french: "Taches ou lésions irrégulières, avec des marges brunes rougeâtres foncées et un centre gris"
  },
  {
    english: "Discoloration in the flag leaf sheath",
    french: "Décoloration dans la gaine des feuilles de drapeau"
  },
  {
    english: "Lesions enlarge and often coalesce and may cover the entire leaf sheath",
    french: "Les lésions agrandis et fusionnent souvent et peuvent couvrir toute la gaine des feuilles"
  },
  {
    english: "Yellow powdery pustules appear on leaves, forming stripes",
    french: "Les pustules poudreux jaunes apparaissent sur les feuilles, formant des rayures"
  },
  {
    english: "Minimum temperature in the range of 7-13 degree C coupled with 85-100% relative humidity during night and maximum temperature in the range of 15-24 degree C during day are congenial for infection, development and spread of disease.",
    french: "La température minimale dans la plage de 7 à 13 degrés C couplée avec 85 à 100% d'humidité relative pendant la nuit et la température maximale dans la plage de 15-24 degrés C pendant la journée est sympathique pour l'infection, le développement et la propagation de la maladie."
  },
  {
    english: "The characteristic symptom of yellow rust is of parallel rows of yellowish orange coloured pustules on the leaves of adult plants",
    french: "Le symptôme caractéristique de la rouille jaune est de rangées parallèles de pustules de couleur orange jaunâtre sur les feuilles des plantes adultes"
  },
  {
    english: "Mild symptoms may be present prior to heading, including yellowish leaf streaks and stiff, dark green leaves",
    french: "Des symptômes légers peuvent être présents avant la tête, notamment des stries de feuilles jaunâtres et des feuilles raides et vert foncé"
  },
  {
    english: "Olives",
    french: "Olives"
  },
  {
    english: "The fungus destroys the ears completely, turning them into a black loose powdery mass consisting of spores and leaving behind the rachis only.",
    french: "Le champignon détruit complètement les oreilles, les transformant en une masse poudreuse lâche noire composée de spores et ne laissant que le Rachis."
  },
  {
    english: "Leaf rust attacks foliage only",
    french: "La rouille des feuilles attaque le feuillage uniquement"
  },
  {
    english: "This rust disease occurs wherever wheat, barley and other cereal crops are grown",
    french: "Cette maladie de rouille se produit partout où le blé, l'orge et d'autres cultures de céréales sont cultivées"
  },
  {
    english: "Identifying symptoms are dusty, reddish-orange to reddish-brown fruiting bodies that appear on the leaf surface.",
    french: "L'identification des symptômes est une fructification poussiéreuse et orange rougeâtre à brun rougeâtre qui apparaît sur la surface des feuilles."
  },
  {
    english: "An early symptom of bacterial leaf spot is small, water-soaked leaf spots on the older leaves of the plant",
    french: "Un symptôme précoce de la tache de feuille bactérienne est de petites taches de feuilles imbibées d'eau sur les feuilles plus anciennes de la plante"
  },
  {
    english: "They can be caused by one or a combination of leaf spotting pathogens. Pyrenophora tritici-repentis causes tan spot on leaves and can also infect wheat kernels causing red or pink smudge and black point",
    french: "Ils peuvent être causés par une ou une combinaison d'agents pathogènes de repérage des feuilles.Pyrenophora Triti-Repentis provoque une tache de bronzage sur les feuilles et peut également infecter les grains de blé provoquant une tache rouge ou rose et un point noir"
  },
  {
    english: "Severely infected kernels can result in significant downgrading of seed quality.",
    french: "Les noyaux gravement infectés peuvent entraîner une rétrogradation significative de la qualité des semences."
  },
  {
    english: "Olive knot can cause the death of small branches and twigs as well as the progressive debilitation of the tree, although it rarely kills it",
    french: "Le nœud d'olivier peut entraîner la mort de petites branches et brindilles ainsi que la débilitation progressive de l'arbre, bien qu'il le tue rarement"
  },
  {
    english: "Crop production is reduced in terms of both fruit quantity and size",
    french: "La production des cultures est réduite en termes de quantité de fruits et de taille"
  },
  {
    english: "Olives from infected branches have an unpleasant smell and a bitter, rancid taste",
    french: "Les olives des branches infectées ont une odeur désagréable et un goût amer et rance"
  },
  {
    english: "The symptoms of this disease are generally lesions on the leaf blade, petiole, fruit peduncle and fruit.",
    french: "Les symptômes de cette maladie sont généralement des lésions sur la lame des feuilles, la pétiole, le pédoncule des fruits et les fruits."
  },
  {
    english: "These occur on the upper surface of the leaves in the form of small round blotches with a grey or muddy spot in the centre 6–10 mm in diameter, reminiscent of a peacock’s eye.",
    french: "Ceux-ci se produisent sur la surface supérieure des feuilles sous la forme de petites taches rondes avec une tache grise ou boueuse au centre de 6 à 10 mm de diamètre, rappelant l'œil d'un paon."
  },
  {
    english: "Defoliation, twig death and bloom failure may ensue",
    french: "Défoliation, mort de brindilles et défaillance de la floraison peut s'ensuivre"
  },
  {
    english: "Infected trees have slowly thinning canopies and appear weak",
    french: "Les arbres infectés ont lentement un amincissement des auvents et semblent faibles"
  },
  {
    english: "This symptom often develops first on one side of the tree and then progresses over several years to involve the whole tree",
    french: "Ce symptôme se développe souvent d'abord d'un côté de l'arbre, puis progresse sur plusieurs années pour impliquer l'arbre entier"
  },
  {
    english: "The bark and outer wood of the upper roots and crown show discoloration",
    french: "L'écorce et le bois extérieur des racines supérieures et de la couronne montrent une décoloration"
  },
  {
    english: "Phytophthora-infected trees have reduced growth, thin canopies, and often die.",
    french: "Les arbres infectés par Phytophthora ont réduit la croissance, des auvents minces et meurent souvent."
  },
  {
    english: "If the disease progresses rapidly, trees may die in 1 or 2 years",
    french: "Si la maladie progresse rapidement, les arbres peuvent mourir dans 1 ou 2 ans"
  },
  {
    english: "Roots rotted by Phytophthora are dark and trees affected for long periods by Phytophthora root rot may have few root hairs",
    french: "Les racines pourries par Phytophthora sont sombres et les arbres affectés pendant de longues périodes par la pourriture des racines de Phytophthora peuvent avoir peu de poils racinaires"
  },
  {
    english: "Symptoms Disease is most commonly observed on aboveground plant parts",
    french: "Les maladies des symptômes sont le plus souvent observées sur les parties de la plante"
  },
  {
    english: "Diseased tissues may first appear as water-soaked areas",
    french: "Les tissus malades peuvent d'abord apparaître comme des zones imbibées d'eau"
  },
  {
    english: "Turn a bleached white or brownish color with fluffy, cottony-white mycelium generally present",
    french: "Tournez une couleur blanche blanchie ou brunâtre avec un mycélium blanc moelleux et blanc cotony généralement présent"
  },
  {
    english: "Stem infections by sclerotia first appear just after flowering and are accompanied by a soft, watery rot of basal stems.",
    french: "Les infections des tiges par les sclérotes apparaissent d'abord juste après la floraison et sont accompagnées d'une pourriture douce et aqueuse de tiges basales."
  },
  {
    english: "These lesions enlarge into a watery, rotten mass of tissue that is covered by a white moldy growth.",
    french: "Ces lésions s'élargissent dans une masse aqueuse et pourrie de tissu recouverte d'une croissance moisie blanche."
  },
  {
    english: "Dark, irregularly-shaped sclerotia are often found in and around infected stems. Infection of stems and branches will cause affected plant parts to wilt and later die, taking on a bleached and dried.",
    french: "Les sclérotes sombres et de forme irrégulière se trouvent souvent dans et autour des tiges infectées.L'infection des tiges et des branches provoquera la flétrissement des parties des plantes et meurtra plus tard, prenant un blanchiment et séché."
  },
  {
    english: "Safflower plants a few weeks after planting or at flowering stage are commonly attacked",
    french: "Les plantes de carthame quelques semaines après la plantation ou au stade de floraison sont généralement attaquées"
  },
  {
    english: "Circular to irregular brown sunken spots of 3-10 mm diameter are formed on leaves",
    french: "Des taches englouties brunes circulaires à irrégulières de 3 à 10 mm de diamètre se forment sur les feuilles"
  },
  {
    english: "In severe infections bracts are also affected with reddish brown spots.affected flower buds turn brown and die.",
    french: "Dans les infections sévères, les bractées sont également affectées par des taches brunes rougeâtres. Les boutons floraux affectés deviennent bruns et meurent."
  },
  {
    english: "A white powder-like powder is deposited on the leaves,twigs and stems of safflower.",
    french: "Une poudre de poudre blanche est déposée sur les feuilles, les brindilles et les tiges de carthame."
  },
  {
    english: "Due to its effect, the process of photosynthesis is inhibited",
    french: "En raison de son effet, le processus de photosynthèse est inhibé"
  },
  {
    english: "The affected part of the plant turns black and dries up.",
    french: "La partie affectée de la plante devient noir et sèche."
  },
  {
    english: "Dark necrotic lesions 2-5 mm in diameter are formed first on hypocotyls and cotyledons.",
    french: "Des lésions nécrotiques sombres de 2 à 5 mm de diamètre se forment d'abord sur des hypocotyles et des cotylédons."
  },
  {
    english: "In mature plants, small brown to dark brown concentric spots of 1-2 mm appear on leaves.",
    french: "Dans les plantes matures, les petits taches concentriques bruns bruns à 1 à 2 mm apparaissent sur les feuilles."
  },
  {
    english: "Symptoms also appear on the stem and severely infected plants get blighted.",
    french: "Les symptômes apparaissent également sur la tige et les plantes gravement infectées sont détruites."
  },
  {
    english: "These spots soon increase in size and number, and many such spots coalesce at severity causing premature defoliation. Severe defoliation leads to debilitation of the bushes and results in poor cropping in the succeeding seasons.",
    french: "Ces taches augmentent rapidement en taille et en nombre, et de nombreux points de ce type fusionnent à la gravité, provoquant une défoliation prématurée.Une défoliation sévère entraîne une débilitation des buissons et entraîne une mauvaise culture au cours des saisons suivantes."
  },
  {
    english: "Water-soaked spots on leaves which are delimited by leaf veins, giving them an angular appearance;",
    french: "Des taches imbibées d'eau sur les feuilles qui sont délimitées par des veines des feuilles, leur donnant une apparence angulaire;"
  },
  {
    english: "Lesions Increase in size and turn black and necrotic;",
    french: "Les lésions augmentent en taille et deviennent noires et nécrotiques;"
  },
  {
    english: "Leaves Drop from the plant; disease may also cause elongated gray-black lesions extending from the leaves to petioles and stem which are known as the 'blackarm' phase;",
    french: "Les feuilles tombent de la plante;La maladie peut également provoquer des lésions gris-noir allongées s'étendant des feuilles aux pétioles et à la tige qui sont connues sous le nom de phase «Blackarm»;"
  },
  {
    english: "Initial symptoms on young seedlings are yellowing and browning of cotyledons, followed by a brown ring on the petiole.",
    french: "Les premiers symptômes sur les jeunes semis sont jaunissants et le brunissement des cotylédons, suivis d'un anneau brun sur le pétiole."
  },
  {
    english: "Finally wilting & drying of the seedling occurs. Symptom at later stages includes loss of turgidity, yellowing, drooping and wilting starting from older leaves.",
    french: "Enfin, le flétrissement et le séchage des semis se produisent.Les symptômes à des stades ultérieurs comprennent la perte de turgidité, de jaunissement, de tombant et de flétrissement à partir des feuilles plus âgées."
  },
  {
    english: "Browning or blackening of vascular tissues occur on the stem and spreads upwards and downwards. Infected plants appear stunted with fewer bolls.",
    french: "Le brunissement ou le noircissement des tissus vasculaires se produisent sur la tige et se propage vers le haut et vers le bas.Les plantes infectées semblent ralentis avec moins de capsules."
  },
  {
    english: "The disease may occur in all stages but more severe when plants are 45-60 days old.",
    french: "La maladie peut survenir à tous les stades mais plus grave lorsque les plantes ont 45 à 60 jours."
  },
  {
    english: "Each spot has a central lesion surrounded by concentric rings. Several spots coalesce together to form blighted areas. The affected leaves become brittle and fall off.",
    french: "Chaque endroit a une lésion centrale entourée d'anneaux concentriques.Plusieurs spots fusionnent ensemble pour former des zones détruites.Les feuilles affectées deviennent cassantes et tombent."
  },
  {
    english: "Sometimes stem lesions are also seen. In severe cases, the spots may appear on bracts and bolls.",
    french: "Parfois, des lésions STEM sont également observées.Dans les cas graves, les taches peuvent apparaître sur les bractées et les capsules."
  },
  {
    english: "Anthracnose in cotton can occur in all growth stages of the plant and it can affect all tissues.",
    french: "L'anthracnose dans le coton peut se produire à tous les stades de croissance de la plante et il peut affecter tous les tissus."
  },
  {
    english: "It produces small reddish to light brown circular spots with black necrotic margins on the cotyledons and primary leaves.",
    french: "Il produit de petites taches circulaires rougeâtres à brun clair avec des marges nécrotiques noires sur les cotylédons et les feuilles primaires."
  },
  {
    english: "If the lesions develop on the collar region, the stem may be girdled, causing seedling or young plants to wilt and die.",
    french: "Si les lésions se développent sur la région du col, la tige peut être ceinturée, ce qui fait que les semis ou les jeunes plantes se flétrissent et meurent."
  },
  {
    english: "It affects the crop in square and boll formation stages Bronzing of veins followed by interveinal chlorosis, yellowing and scorching of leaves",
    french: "Il affecte la récolte des étapes de formation carrée et de la capsule."
  },
  {
    english: "Leaves exhibit drying of leaf margins and areas between veins known as 'tiger stripe symptom'",
    french: "Les feuilles présentent du séchage des marges des feuilles et des zones entre les veines appelées «symptôme de bande de tigre»"
  },
  {
    english: "Affected plants remain barren showing pinkish discoloration in stem and wood. It may produce smaller bolls",
    french: "Les plantes touchées restent stériles montrant une décoloration rosâtre dans la tige et le bois.Il peut produire de plus petites capsules"
  },
  {
    english: "Small irregular brown lesions on leaves which expand and turn gray-brown or dark brown with concentric zones",
    french: "Petites lésions brunes irrégulières sur les feuilles qui se développent et deviennent brun gris ou brun foncé avec des zones concentriques"
  },
  {
    english: "Older areas of lesions may dry out and drop from leaves causing shot hole",
    french: "Les zones plus anciennes des lésions peuvent se sécher et tomber des feuilles provoquant un trou de tir"
  },
  {
    english: "Lesions coalesce to form large necrotic patches",
    french: "Les lésions fusionnent pour former de grandes parcelles nécrotiques"
  },
  {
    english: "Small, dark brown necrotic spots on leaves which may be surrounded by a zone of yellow tissue",
    french: "Petites taches nécrotiques brun foncé sur les feuilles qui peuvent être entourées d'une zone de tissu jaune"
  },
  {
    english: "Water soaked spots on pods which turn brown and necrotic",
    french: "Les taches trempées d'eau sur des gousses qui deviennent brunes et nécrotiques"
  },
  {
    english: "Pods may twist and distort in the area of infection.",
    french: "Les gousses peuvent se tordre et se déformer dans le domaine de l'infection."
  },
  {
    english: "Initially, the symptoms appear as small yellow/white spots on leaves.",
    french: "Initialement, les symptômes apparaissent sous forme de petites taches jaunes/blanches sur les feuilles."
  },
  {
    english: "Later the spots become enlarged and show raised brick red rust pustules (uredinia).",
    french: "Plus tard, les taches deviennent agrandies et montrent des pustules de rouille rouge en briques surélevées (Uredinia)."
  },
  {
    english: "Normally these pustules are surrounded by a yellow halo. Premature leaf drop may occur if the disease is severe.",
    french: "Normalement, ces pustules sont entourées d'un halo jaune.Une goutte de feuille prématurée peut se produire si la maladie est grave."
  },
  {
    english: "Flowers covered in white, cottony fungal growth;",
    french: "Fleurs recouvertes de croissance fongique blanche et cotonale;"
  },
  {
    english: "Small, circular, dark green, water-soaked lesions on pods, leaves, and branches which enlarge and become slimy",
    french: "Petites lésions circulaires, vert foncé, imbibées d'eau sur les gousses, les feuilles et les branches qui agrandissent et deviennent visqueuses"
  },
  {
    english: "Cottony white growth may be visible on lesions during periods of high humidity; death of branches and/or the entire plant.",
    french: "La croissance des blancs cotons peut être visible sur les lésions pendant les périodes d'humidité élevée;décès des branches et/ou toute la plante."
  },
  {
    english: "Water-soaked spots on leaves which enlarge and become necrotic",
    french: "Des taches imbibées d'eau sur les feuilles qui agrandissent et deviennent nécrotiques"
  },
  {
    english: "Spots may be surrounded by a zone of yellow discoloration; lesions coalesce and give the plant a burned appearance",
    french: "Les taches peuvent être entourées d'une zone de décoloration jaune;Les lésions fusionnent et donnent à l'usine une apparence brûlée"
  },
  {
    english: "Leaves That die remain attached to the plant; circular, sunken, red-brown lesions may be present on pods; pod lesions may ooze during humid conditions.",
    french: "Les feuilles qui meurent restent attachées à la plante;Des lésions circulaires, coulées et brun rouges peuvent être présentes sur des gousses;Les lésions de pod peuvent suinter dans des conditions humides."
  },
  {
    english: "On tomato, the affected area may be mistaken for sunscald. Sunscald develops as a white discoloration, but it occurs on the upper portions of the fruit, often the shoulders.",
    french: "Sur la tomate, la zone touchée peut être confondue avec Sunscbald.Scoupsald se développe comme une décoloration blanche, mais elle se produit sur les parties supérieures du fruit, souvent les épaules."
  },
  {
    english: "Blossom end rot may also occur on the sides of the pepper fruit near the blossom end.",
    french: "La pourriture des fleurs peut également se produire sur les côtés du fruit de poivre près de l'extrémité de la fleur."
  },
  {
    english: "Molds often colonize the damaged area of affected fruit, resulting in a dark brown or black appearance.",
    french: "Les moisissures colonisent souvent la zone endommagée des fruits affectés, ce qui entraîne un aspect brun foncé ou noir."
  },
  {
    english: "The new growth of plants with tomato yellow leaf curl has reduced internodes, giving the plant a stunted appearance",
    french: "La nouvelle croissance des plantes avec une boucle de feuilles jaunes de tomate a réduit les entre-nœuds, donnant à la plante un aspect ralenti"
  },
  {
    english: "The new leaves are also greatly reduced in size and wrinkled, are yellowed between the veins, and have margins that curl upward, giving them a cup-like appearance.",
    french: "Les nouvelles feuilles sont également considérablement réduites en taille et ridées, sont jaunies entre les veines et ont des marges qui se recroquevillent vers le haut, leur donnant une apparence en forme de coupe."
  },
  {
    english: "Flowers may appear but usually will drop before fruit is set",
    french: "Les fleurs peuvent apparaître mais baisseront généralement avant que les fruits ne soient réglés"
  },
  {
    english: "The fungus attacks the foliage causing characteristic leaf spots and blight. Early blight is first observed on the plants as small, black lesions mostly on the older foliage.",
    french: "Le champignon attaque le feuillage provoquant des taches de feuilles caractéristiques et la brûlure.La brûlure précoce est d'abord observée sur les plantes comme de petites lésions noires principalement sur le feuillage plus âgé."
  },
  {
    english: "Spots enlarge, and by the time they are one-fourth inch in diameter or larger, concentric rings in a bull's eye pattern can be seen in the center of the diseased area.",
    french: "Les taches agrandissent, et au moment où ils ont un quart de diamètre ou plus, des anneaux concentriques dans un motif de taureau peuvent être vus au centre de la zone malade."
  },
  {
    english: "Tissue surrounding the spots may turn yellow. If high temperature and humidity occur at this time, much of the foliage is killed.",
    french: "Les tissus entourant les taches peuvent devenir jaunes.Si une température et une humidité élevées se produisent à ce moment, une grande partie du feuillage est tuée."
  },
  {
    english: "Brownish-green spots appear on the leaf margins and leaf tops. Later, large areas of the leaves turn brown completely.",
    french: "Les taches brunâtres-vert apparaissent sur les marges des feuilles et les sommets des feuilles.Plus tard, de grandes zones des feuilles brunissent complètement."
  },
  {
    english: "During wet weather, lesions on the lower side of the leaves may be covered with a gray to white moldy growth, making it easier to distinguish healthy from dead leaf tissue.",
    french: "Par temps humide, les lésions du côté inférieur des feuilles peuvent être recouvertes d'une croissance gris à blanc moisie, ce qui facilite la distinction saine du tissu des feuilles mortes."
  },
  {
    english: "Greyish-green to dirty-brown and wrinkled stains appear on the fruits. At these spots, the fruit flesh is hardened.",
    french: "Les taches grisâtre-vert à brun sale et ridées apparaissent sur les fruits.À ces endroits, la chair des fruits est durcie."
  },
  {
    english: "Characteristic symptoms of bacterial wilt are the rapid and complete wilting of normal grown-up plants.",
    french: "Les symptômes caractéristiques du flétrissement bactérien sont le flétrissement rapide et complet des plantes adultes normales."
  },
  {
    english: "Lower leaves may drop before wilting. Pathogen is mostly confined to the vascular region; in advantage cases, it may invade the cortex and pith and cause yellow-brown discoloration of tissues.",
    french: "Les feuilles inférieures peuvent tomber avant la flétrissement.Le pathogène est principalement confiné à la région vasculaire;Dans les cas d'avantages, il peut envahir le cortex et la moelle et provoquer une décoloration brun jaune des tissus."
  },
  {
    english: "Infected plant parts when cut and immersed in clear water, a white streak of bacterial ooze is seen coming out from cut ends.",
    french: "Pièces de plantes infectées Lorsqu'elles sont coupées et immergées dans de l'eau claire, une séquence blanche de suintement bactérienne est observée sortant des extrémités coupées."
  },
  {
    english: "The first symptom of the disease is clearing of the veinlets and chlorosis of the leaves.",
    french: "Le premier symptôme de la maladie est le nettoyage des veinules et la chlorose des feuilles."
  },
  {
    english: "The younger leaves may die in succession and the entire may wilt and die in a course of few days. Soon the petiole and the leaves droop and wilt.",
    french: "Les feuilles plus jeunes peuvent mourir successivement et l'ensemble peut se flétrir et mourir en quelques jours.Bientôt, le pétiole et les feuilles tombent et se flétrissent."
  },
  {
    english: "In young plants, the symptom consists of clearing of veinlets and dropping of petioles. In the field, yellowing of the lower leaves first, and affected leaflets wilt and die.",
    french: "Chez les jeunes plantes, le symptôme consiste en la défrichement des veinulets et une baisse de pétioles.Sur le terrain, le jaunissement des feuilles inférieurs d'abord et les folioles affectées se flétrissent et meurent."
  },
  {
    english: "The disease is characterized by light and dark green mottling on the leaves, often accompanied by wilting of young leaves on sunny days when plants first become infected.",
    french: "La maladie se caractérise par des marchons clairs et vert foncé sur les feuilles, souvent accompagnés de flétrissement des jeunes feuilles les jours ensoleillés lorsque les plantes sont infectées pour la première fois."
  },
  {
    english: "The leaflets of affected leaves are usually distorted, puckered, and smaller than normal. Sometimes the leaflets become indented, resulting in \"fern leaf\" symptoms.",
    french: "Les folioles des feuilles affectées sont généralement déformées, plissées et plus petites que la normale.Parfois, les folioles deviennent en retrait, entraînant des symptômes de \"feuilles de fougère\"."
  },
  {
    english: "The virus is spread by contact with clothes, the hands of working labor, touching infected plants with healthy ones, plant debris, and implements.",
    french: "Le virus est réparti par contact avec les vêtements, les mains du travail de travail, touchant des plantes infectées par des plantes saines, des débris végétaux et des outils."
  },
  {
    english: "Black Spot On leaves are formed which enlarge rapidly and cause the fall of the leaf. When the main stem at the base is damaged, the entire vine wilts and sheds all the leaves and spikes.",
    french: "Une tache noire sur les feuilles se forme qui agrandir rapidement et provoquer la chute de la feuille.Lorsque la tige principale à la base est endommagée, la vigne entière se flétrie et perd toutes les feuilles et les pointes."
  },
  {
    english: "The tender leaves and succulent shoot tips of freshly emerging runner shoots trailing on the soil turn black when infected.",
    french: "Les feuilles tendres et les pousses succulentes des pousses de coureurs fraîchement émergentes traînent sur le sol deviennent noires lorsqu'elles sont infectées."
  },
  {
    english: "The disease spreads to the entire vine from these infected runner shoots and leaves during intermittent showers due to rain splash.",
    french: "La maladie se propage à toute la vigne à partir de ces pousses de coureurs infectées et part pendant des averses intermittentes en raison des éclaboussures de pluie."
  },
  {
    english: "It can be distinguished from the pollu (hollow berry) caused by the beetle by the presence of characteristic cracks on the infected berries.",
    french: "Il peut être distingué de la pollu (baie creuse) causée par le scarabée par la présence de fissures caractéristiques sur les baies infectées."
  },
  {
    english: "The affected berries show brown sunken patches during the early stages, and their further development is affected.",
    french: "Les baies affectées montrent des parcelles enfoncées brunes au cours des premiers stades, et leur développement ultérieur est affecté."
  },
  {
    english: "In later stages, the discoloration gradually increases, and the berries show the characteristic cross-splitting. Finally, the berries turn black and dry. The fungus also causes angular to irregular brownish lesions with a chlorotic halo on the leaves.",
    french: "Au stade ultérieur, la décoloration augmente progressivement et les baies montrent la caractéristique croisée croisée.Enfin, les baies deviennent noires et sèches.Le champignon provoque également des lésions brunâtres angulaires à irrégulières avec un halo chlorotique sur les feuilles."
  },
  {
    english: "Infected cuttings show greyish lesions on leaves and stems.",
    french: "Les boutures infectées montrent des lésions grisâtres sur les feuilles et les tiges."
  },
  {
    english: "White-Colored Mycelium appears which later girdles the stem, causing rotting and wilting.",
    french: "Le mycélium de couleur blanche apparaît qui suit plus tard la tige, provoquant la pourriture et le flétrissement."
  },
  {
    english: "Small whitish to cream-colored grain-like sclerotial bodies appear on the mature lesions.",
    french: "Les petits corps sclérotiaux blanchâtres à des grains de couleur crème apparaissent sur les lésions matures."
  },
  {
    english: "Root necrosis and galling are the primary symptoms of the disease.",
    french: "La nécrose radiculaire et l'édulgation sont les principaux symptômes de la maladie."
  },
  {
    english: "Foliar yellowing (mild to moderate), followed by defoliation, die-back is seen.",
    french: "Le jaunissement foliaire (léger à modéré), suivi d'une défoliation, le dos est vu."
  },
  {
    english: "In more pronounced conditions whole vine die. Browning of vascular tissue is seen if Fusarium sp. Is associated with the disease.",
    french: "Dans des conditions plus prononcées, la vigne entière meurt.Le brunissement du tissu vasculaire est observé si Fusarium sp.Est associé à la maladie."
  },
  {
    english: "The disease is characterized by drying up of mature and immature branches from the tip downwards.",
    french: "La maladie se caractérise par le séchage des branches matures et immatures à partir de la pointe vers le bas."
  },
  {
    english: "A few other fungi have been isolated from such trees.",
    french: "Quelques autres champignons ont été isolés de ces arbres."
  },
  {
    english: "The infected branches should be cut and removed, and the cut end pasted with Bordeaux mixture 1%.",
    french: "Les branches infectées doivent être coupées et retirées, et l'extrémité de coupe collée avec le mélange Bordeaux 1%."
  },
  {
    english: "Two types of blights are noticed in nutmeg. The first is a white thread blight wherein fine white hyphae aggregate to form fungal threads that traverse along the stem underneath the leaves in a fan-shaped or irregular manner causing blight in the affected portions.",
    french: "Deux types de brûlures sont remarqués dans la muscade.Le premier est une brûlure du fil blanc dans lequel des hyprégats blancs fines blancs pour former des fils fongiques qui traversent la tige sous les feuilles de manière en forme de ventilateur ou irrégulière provoquant la brûlure dans les parties affectées."
  },
  {
    english: "The second type of blight is called horsehair blight. Fine black silky threads of the fungus form an irregular, loose network on the stems and leaves.",
    french: "Le deuxième type de brûlure est appelé Horsehai Blight.Les fils soyeux noirs fins du champignon forment un réseau irrégulier et lâche sur les tiges et les feuilles."
  },
  {
    english: "These strands cause blight of leaves and stems. However, these threads hold up the detached, dried leaves on the tree, giving the appearance of a bird's nest when viewed from a distance.",
    french: "Ces brins provoquent la brûlure des feuilles et des tiges.Cependant, ces fils retiennent les feuilles séchées détachées sur l'arbre, donnant l'apparence d'un nid d'oiseau vu à distance."
  },
  {
    english: "Immature fruit split, fruit rot, and fruit drop are serious in a majority of nutmeg. Immature fruit splitting and shedding are noticed in some trees without any apparent infection.",
    french: "La division des fruits immatures, la pourriture des fruits et la chute des fruits sont graves dans la majorité de la muscade.Le fractionnement et la perte de fruits immatures sont remarqués dans certains arbres sans aucune infection apparente."
  },
  {
    english: "In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discoloration of the rind resulting in rotting.",
    french: "Dans le cas de la pourriture des fruits, l'infection commence à partir du pédicelle sous forme de lésions sombres et se propage progressivement aux fruits, provoquant une décoloration brune de l'écorce entraînant une pourriture."
  },
  {
    english: "In advanced stages, the mace also rots, emitting a foul smell. Phytophthora sp. and Diplodia natalensis have been isolated from affected fruits.",
    french: "À des stades avancés, la masse rot également, émettant une odeur nauséabonde.Phytophthora sp.et Diplodia natalensis a été isolé des fruits touchés."
  },
  {
    english: "Necrotic spots develop on the lamina which are encircled by a chlorotic halo.",
    french: "Des taches nécrotiques se développent sur la lame qui est entourée d'un halo chlorotique."
  },
  {
    english: "In advanced stages, the necrotic spots become brittle and fall off resulting in shot holes.",
    french: "Dans les étapes avancées, les taches nécrotiques deviennent fragiles et tombent entraînant des trous de tir."
  },
  {
    english: "The infected branches should be cut and removed. The cut end should be pasted with Bordeaux paste.",
    french: "Les branches infectées doivent être coupées et retirées.L'extrémité coupée doit être collée avec de la pâte de bordeaux."
  },
  {
    english: "The disease is a destructive one, widely distributed wherever the crop is grown.",
    french: "La maladie est destructrice, largement distribuée partout où la récolte est cultivée."
  },
  {
    english: "The most affected components are the number of seeds per head and the seed yield per plant.",
    french: "Les composants les plus touchés sont le nombre de graines par tête et le rendement des graines par plante."
  },
  {
    english: "Spots first appear on lower leaves, later spread to middle and upper leaves. At later stages, spots may be formed on petioles, stem, and ray florets.",
    french: "Les taches apparaissent d'abord sur les feuilles inférieures, plus tard réparties aux feuilles moyennes et supérieures.Au stade ultérieur, des taches peuvent être formées sur des pétioles, des tiges et des fleurons de rayons."
  },
  {
    english: "It is more prominent in the rabi season, and in the kharif season, the appearance is usually late.",
    french: "Il est plus important dans la saison des rabi, et pendant la saison de Kharif, l'apparition est généralement en retard."
  },
  {
    english: "Uredo pustules appear first on the lower leaves. Uredo pustules appear on the younger leaves and later spread over the entire vegetative surface covering stems, petioles, floral bracts, and petals.",
    french: "Les pustules d'Uredo apparaissent en premier sur les feuilles inférieures.Les pustules d'Uredo apparaissent sur les feuilles plus jeunes et s'étalaient plus tard sur toute la surface végétative couvrant les tiges, les pétioles, les bractées florales et les pétales."
  },
  {
    english: "Uredia often coalesce to cover large areas on the affected plant parts.",
    french: "Uredia fusionne souvent pour couvrir de grandes surfaces sur les parties de la plante affectées."
  },
  {
    english: "Symptoms of the disease are evident as seedling damping off, systemic infection, local foliar lesions, and basal root or stem galls.",
    french: "Les symptômes de la maladie sont évidents car les semis amortissent, l'infection systémique, les lésions foliaires locales et les galles de racine ou de tige basales."
  },
  {
    english: "First symptoms are yellowing of the first pair of true leaves.",
    french: "Les premiers symptômes sont le jaunissement de la première paire de vraies feuilles."
  },
  {
    english: "Sunflower plants carrying systemic infection are severely stunted, and leaves are entirely chlorotic.",
    french: "Les plantes de tournesol transportant une infection systémique sont sévèrement ralentis et les feuilles sont entièrement chlorotiques."
  },
  {
    english: "Water-soaked circular or angular spots on leaves with a greasy, greenish appearance on lower leaves.",
    french: "Des taches circulaires ou angulaires imbibées d'eau sur des feuilles avec une apparence grasse et verdâtre sur les feuilles inférieures."
  },
  {
    english: "Lesions are usually gray with a darker margin; some lesions may have a narrow yellow border; tiny black fungal fruiting bodies may be present in the lesions.",
    french: "Les lésions sont généralement grises avec une marge plus foncée;Certaines lésions peuvent avoir une bordure jaune étroite;De minuscules corps fongiques noirs peuvent être présents dans les lésions."
  },
  {
    english: "Yellow or chlorotic spots on leaves.",
    french: "Taches jaunes ou chlorotiques sur les feuilles."
  },
  {
    english: "Dark olive green spots on leaves and fruit; may be a velvety growth on spots on undersides of leaves; twisting of leaves.",
    french: "Taches vert olive foncé sur les feuilles et les fruits;Peut être une croissance veloutée sur les taches sur le dessous des feuilles;Twist des feuilles."
  },
  {
    english: "Distorted leaves; severely infected leaves turn yellow and drop from the tree.",
    french: "Feuilles déformées;Les feuilles gravement infectées deviennent jaunes et tombent de l'arbre."
  },
  {
    english: "Fire blight symptoms may appear on the blossoms, shoots, branches, trunk, and rootstock.",
    french: "Les symptômes de la brûlure des incendies peuvent apparaître sur les fleurs, les pousses, les branches, le coffre et le porte-greffe."
  },
  {
    english: "Watery exudate may be present on infected areas.",
    french: "Un exsudat aqueux peut être présent sur les zones infectées."
  },
  {
    english: "Blighted blossoms appear wilted, shriveled, and brown. Young fruitlets are also very susceptible.",
    french: "Les fleurs détruites apparaissent flétries, ratatinées et brunes.Les jeunes fruits sont également très sensibles."
  },
  {
    english: "Leaf spots are first yellow, then turn bright orange-red, often with a bright red border.",
    french: "Les taches de feuilles sont d'abord jaunes, puis deviennent rouge orange vif, souvent avec une bordure rouge vif."
  },
  {
    english: "Small, raised, black dots form in the center of leaf spots on the upper leaf surface when the leaf spots mature.",
    french: "Les petits points noirs surélevés se forment au centre des taches de feuilles sur la surface de la feuille supérieure lorsque les taches foliaires mûrissent."
  },
  {
    english: "Rarely, green to brown irregular spots with black dots form on the fruit surface. Fruit spots do not extend deep into the fruit.",
    french: "Rarement, des taches irrégulières vertes à brunes avec des points noirs se forment à la surface des fruits.Les taches de fruits ne s'étendent pas profondément dans les fruits."
  },
  {
    english: "Large brown rotten areas can form anywhere on the fruit but are most common on the blossom end.",
    french: "De grandes zones pourris brunes peuvent se former n'importe où sur les fruits, mais sont les plus fréquentes à l'extrémité de la fleur."
  },
  {
    english: "Brown to black concentric rings can often be seen on larger infections.",
    french: "Les anneaux concentriques bruns à noirs peuvent souvent être vus sur des infections plus importantes."
  },
  {
    english: "The flesh of the apple is brown but remains firm. Small, black spots can be seen on older fruit infections.",
    french: "La chair de la pomme est brune mais reste ferme.De petites taches noires peuvent être observées sur des infections aux fruits plus anciennes."
  },
  {
    english: "It attacks the leaves, flowers, stalks of panicle and fruits, causing a superficial white powdery appearance on it.",
    french: "Il attaque les feuilles, les fleurs, les tiges de panicule et de fruits, provoquant une apparence poudreuse blanche superficielle dessus."
  },
  {
    english: "The disease spreads by wind very rapidly. Generally, the infection starts from the inflorescence and spreads downwards, covering the floral axis, tender leaves, and soft stem.",
    french: "La maladie se propage par le vent très rapidement.Généralement, l'infection commence à partir de l'inflorescence et se propage vers le bas, couvrant l'axe floral, les feuilles tendres et la tige douce."
  },
  {
    english: "Flowers fail to open, blacken, or become brown, dry, and may fall from panicles.",
    french: "Les fleurs ne parviennent pas à s'ouvrir, à noircir ou à devenir brunes, à sécher et peuvent tomber des panicules."
  },
  {
    english: "The first symptoms on panicles are small black or dark-brown spots, which can enlarge, coalesce, and kill the flowers before fruits are produced. Petioles, twigs, and stems are also susceptible and develop into a typical black color.",
    french: "Les premiers symptômes sur les panicules sont les petits taches noires ou brun foncé, qui peuvent agrandir, fusionner et tuer les fleurs avant la production de fruits.Les pétioles, les brindilles et les tiges sont également sensibles et se transforment en une couleur noire typique."
  },
  {
    english: "Vegetative Malformation: It is more commonly found on young seedlings. It is characterized by disrupting of apical growth resulting in several small flushes.",
    french: "Malformation végétative: il se trouve plus couramment sur les jeunes semis.Il se caractérise par la perturbation de la croissance apicale, ce qui entraîne plusieurs petites rinçages."
  },
  {
    english: "The multi-branching of the shoot apex with scaly leaves is known as 'Bunchy Top' or 'Witches' Broom'. The malformed seedlings remain stunted and die.",
    french: "Le multi-raming de l'apex des pousses avec des feuilles écailleuses est connue sous le nom de «Bunchy Top» ou «Broom Witches».Les semis malformés restent rabougris et meurent."
  },
  {
    english: "Floral Malformation: In malformation of inflorescence, shows variation in the panicle. Malformed head dries up in a black mass and persists for a long time.",
    french: "Malformation florale: dans la malformation de l'inflorescence, montre une variation de la panicule.La tête mal formée se règne dans une masse noire et persiste pendant longtemps."
  },
  {
    english: "The disease is noticed on leaves, leaf stalks, stems, twigs, branches, and fruits, initially producing water-soaked lesions, later turning into a typical canker.",
    french: "La maladie est remarquée sur les feuilles, les tiges des feuilles, les tiges, les brindilles, les branches et les fruits, produisant initialement des lésions imbibées d'eau, se transformant plus tard en un chancre typique."
  },
  {
    english: "Water-soaked irregular satellites to angular raised lesions measuring 1-4 mm in diameter are formed. These lesions are light yellow in color, initially with a yellow halo but with age enlarge or coalesce to form irregular necrotic cankerous patches with dark brown color.",
    french: "Des satellites irréguliers imbibés d'eau aux lésions surélevées angulaires mesurant 1 à 4 mm de diamètre sont formées.Ces lésions sont de couleur jaune clair, initialement avec un halo jaune mais avec l'âge agrandir ou fusionner pour former des plaques cankères nécrotiques irrégulières avec une couleur brun foncé."
  },
  {
    english: "Water-soaked, dark brown to black-colored lesions are observed, which gradually develop into cankerous, raised or flat spots. These spots often burst, extruding gummy substances containing highly contagious bacterial cells.",
    french: "Des lésions imbibées de brun foncé à noir sont observées, qui se développent progressivement en points cankurés, surélevés ou plats.Ces taches éclatent souvent, extrudant des substances gommeuses contenant des cellules bactériennes hautement contagieuses."
  },
  {
    english: "The pathogen causing dieback, tip dieback, graft union blight, twig blight, seedling rot, wood stain, stem-end rot, black root rot, fruit rot, dry rot, brown rot of panicle, etc.",
    french: "L'agent pathogène provoquant le dépérissement, la dépérissement de la pointe, la brûlure de l'union du greffon, la brûlure des brindilles, la pourriture des semis, la teinture en bois, la pourriture de la tige, la pourriture des racines noires, la pourriture des fruits, la pourriture sèche, la pourriture brune de la panicule, etc."
  },
  {
    english: "Foot rot",
    french: "Pourriture des pieds"
  },
  {
    english: "Papaya ring spot",
    french: "Papaya Ring Spot"
  },
  {
    english: "On the undersurface of disease leaves are found patches of whitish powder growth",
    french: "Sur la surface inférieure des feuilles de maladie se trouvent des plaques de croissance de la poudre blanchâtre"
  },
  {
    english: "On upper surfaces, leaves at the infection site show blotches of yellow or pale green usually near vein, surrounded by normally colored tissue.",
    french: "Sur les surfaces supérieures, les feuilles du site d'infection montrent des taches de jaune ou de vert pâle généralement près de la veine, entourée de tissus normalement colorés."
  },
  {
    english: "Occasionally, fungus may attack the stem of young seedling when grown under reduced light condition.",
    french: "Parfois, les champignons peuvent attaquer la tige des jeunes semis lorsqu'ils sont cultivés en état de lumière réduite."
  },
  {
    english: "It is characterized by the appearance of water-soaked patches on the stem near the ground level.",
    french: "Il se caractérise par l'apparition de plaques imbibées d'eau sur la tige près du sol."
  },
  {
    english: "These patches enlarge rapidly and girdle the stem, causing rotting of the tissues, which then turn dark brown or black. If the disease attack is mild, only one side of the stem rots and the plants remain stunted.",
    french: "Ces patchs agrandissent rapidement et cessent la tige, provoquant la pourriture des tissus, qui deviennent ensuite brun foncé ou noir.Si l'attaque de la maladie est légère, un seul côté des Rots de la tige et que les plantes restent rabougries."
  },
  {
    english: "Fruit if formed are shriveled and malformed. Gradually the plant dies.",
    french: "Les fruits s'ils sont formés sont ratatinés et malformés.Peu à peu, la plante décède."
  },
  {
    english: "The disease occurs both in the field and in storage conditions.",
    french: "La maladie se produit à la fois sur le terrain et dans des conditions de stockage."
  },
  {
    english: "The spots on fruits first appear as brown superficial discoloration of the skin which develops into circular, slightly sunken areas and 1 to 3 cm in dia.",
    french: "Les taches sur les fruits apparaissent d'abord comme une décoloration superficielle brune de la peau qui se développe en zones circulaires et légèrement enfoncées et de 1 à 3 cm de dia."
  },
  {
    english: "Gradually the lesions coalesce and sparse mycelia growth appears on the margins of the spots.",
    french: "Peu à peu, les lésions fusionnent et la croissance des mycéliums clairsemée apparaît sur les marges des spots."
  },
  {
    english: "Infected plant initially shows chlorosis on youngest leaves followed by vein clearing, rugosity and prominent mottling of laminae.",
    french: "L'usine infectée montre initialement de la chlorose sur les plus jeunes feuilles suivies d'une clairière veineuse, d'un rugosité et d'une martelage proéminente des lamelles."
  },
  {
    english: "Malformation and reduction of the lamina which may become extremely filiform.",
    french: "Malformation et réduction de la lame qui peut devenir extrêmement filiforme."
  },
  {
    english: "Characteristically elongated dark green streak develop on petiole and upper half of the stems, infected fruits show circular concentric rings causes upto 56-60 % yield loss.",
    french: "La séquence de vert foncé allongé caractéristique se développe sur le pétiole et la moitié supérieure des tiges, les fruits infectés montrent que les anneaux concentriques circulaires provoquent jusqu'à 56 à 60% de perte de rendement."
  },
  {
    english: "Flattened oval to round disc-like insect covered in waxy substance on tree branches",
    french: "Insecte ovale à un disque rond recouvert de substance cireuse sur les branches d'arbres"
  },
  {
    english: "Insects attract ants which may also be present",
    french: "Les insectes attirent des fourmis qui peuvent également être présentes"
  },
  {
    english: "Insect colony may also be associated with growth of sooty mold due to fungal colonization of sugary honeydew excreted by the insect",
    french: "La colonie des insectes peut également être associée à la croissance de moisissures de suie dues à la colonisation fongique de miellat sucré excrété par l'insecte"
  },
  {
    english: "Colonize on the underside of tender leaves",
    french: "Coloniser sur le dessous des feuilles tendres"
  },
  {
    english: "The female punctures outer wall of mature fruits with the help of its pointed ovipositor and insert eggs in small clusters inside mesocarp of mature fruits",
    french: "La femelle ponctue la paroi extérieure des fruits matures à l'aide de son ovipositeur pointu et insérer des œufs en petits grappes à l'intérieur du mésocarpe de fruits matures"
  },
  {
    english: "On hatching, the maggots feed on fruit pulp",
    french: "À l'éclosion, les asticots se nourrissent de pulpe de fruits"
  },
  {
    english: "The infested fruits start rotting due to further secondary infection",
    french: "Les fruits infestés commencent à pourrir en raison d'une infection secondaire supplémentaire"
  },
  {
    english: "Both nymphs and adults suck the sap from the lower leaf surfaces which leads to yellowing",
    french: "Les nymphes et les adultes aspirent la sève des surfaces des feuilles inférieures, ce qui entraîne un jaunissement"
  },
  {
    english: "When several insects suck the sap from the same leaf, yellow spots appear on the leaves",
    french: "Lorsque plusieurs insectes sucent la sève de la même feuille, les taches jaunes apparaissent sur les feuilles"
  },
  {
    english: "Crinkling, curling, bronzing, and drying, or “hopper burn”",
    french: "Brincet, curling, bronzage et séchage, ou «brûlure de la trémie»"
  },
  {
    english: "Papaya (Saudi Arabia)",
    french: "Papaya (Arabie saoudite)"
  },
  {
    english: "Red lady",
    french: "Dame rouge"
  },
  {
    english: "Red bella",
    french: "Bella rouge"
  },
  {
    english: "Potato (Saudi Arabia)",
    french: "Pomme de terre (Arabie saoudite)"
  },
  {
    english: "Spunta",
    french: "Apparence"
  },
  {
    english: "Ajax",
    french: "Ajax"
  },
  {
    english: "Mirka",
    french: "Mirka"
  },
  {
    english: "Diamont",
    french: "Diamont"
  },
  {
    english: "Espunta",
    french: "Escenta"
  },
  {
    english: "Citrix",
    french: "Citrix"
  },
  {
    english: "Frizia",
    french: "Friish"
  },
  {
    english: "Kawalic",
    french: "Kawalic"
  },
  {
    english: "Aboulx",
    french: "Aboulx"
  },
  {
    english: "Mondial",
    french: "Monde"
  },
  {
    english: "Safaren",
    french: "Safar"
  },
  {
    english: "Edward",
    french: "Edward"
  },
  {
    english: "Etfadoal",
    french: "Etvado"
  },
  {
    english: "Date Palm (Saudi arabia)",
    french: "Palme de date (Arabie saoudite)"
  },
  {
    english: "Ajwa",
    french: "S'il te plaît"
  },
  {
    english: "Safawi",
    french: "Safawi"
  },
  {
    english: "Khalas",
    french: "ça suffit"
  },
  {
    english: "Sukkari",
    french: "Complètement"
  },
  {
    english: "Khadrawy",
    french: "Vert"
  },
  {
    english: "Olive (Saudi Arabia)",
    french: "Olive (Arabie saoudite)"
  },
  {
    english: "Arbosona",
    french: "Arbosona"
  },
  {
    english: "Arbequina",
    french: "Arbequina"
  },
  {
    english: "Picual",
    french: "Pictual"
  },
  {
    english: "Koroneiki",
    french: "Chilose"
  },
  {
    english: "Kaissy H-85",
    french: "Kaissy H-85"
  },
  {
    english: "Picual H-78",
    french: "Picual H-78"
  },
  {
    english: "Sorani",
    french: "Sorani"
  },
  {
    english: "K-18",
    french: "K-18"
  },
  {
    english: "Pale or yellow choloric lesions on leaves surface",
    french: "Lésions choloriques pâles ou jaunes sur la surface des feuilles"
  },
  {
    english: "Lesions turn pink, red, purple, or light-brown, depending on the plant’s pigments",
    french: "Les lésions deviennent roses, rouges, violettes ou bruns légères, selon les pigments de la plante"
  },
  {
    english: "Initial symptoms are small, humid spots on the upper-third part of the stalk.",
    french: "Les symptômes initiaux sont de petits taches humides sur la partie supérieure du tiers de la tige."
  },
  {
    english: "The foliage becomes chlorotic and wilts",
    french: "Le feuillage devient chlorotique et Wilts"
  },
  {
    english: "Panicle does not form grain and the stalk bends downward and tends to break easily.",
    french: "La panicule ne forme pas de grain et la tige se plie vers le bas et a tendance à se casser facilement."
  },
  {
    english: "Dwarfing and bronze discolouration of the leaflets.",
    french: "Nain et décoloration en bronze des folioles."
  },
  {
    english: "Lesions on the leaves are of irregular shape, and are bronze to reddish-brown with darker edges.",
    french: "Les lésions sur les feuilles ont une forme irrégulière et sont du bronze à brun rougeâtre avec des bords plus sombres."
  },
  {
    english: "Stems shows necrosis",
    french: "Les tiges montrent une nécrose"
  },
  {
    english: "Small irregular spots in leaves and stems",
    french: "Petites taches irrégulières dans les feuilles et les tiges"
  },
  {
    english: "Cankers on old twings and brances",
    french: "Cankers sur les vieilles brindilles et branches"
  },
  {
    english: "Stunted sterile bushy shoots",
    french: "Tushs stériles rabougries"
  },
  {
    english: "Drying of entire clump",
    french: "Séchage de la touffe entière"
  },
  {
    english: "Drying of plants",
    french: "Séchage des plantes"
  },
  {
    english: "Mosaic apprearance on leaves",
    french: "Apparence en mosaïque sur les feuilles"
  },
  {
    english: "Drying, withering of leaves and finally plants die",
    french: "Séchage, flétrison des feuilles et enfin les plantes meurent"
  },
  {
    english: "Leaves becomes necrotic and dries",
    french: "Les feuilles deviennent nécrotiques et sèche"
  },
  {
    english: "Brittle pseudostem",
    french: "Pseudostem fragile"
  },
  {
    english: "Lodging",
    french: "Hébergement"
  },
  {
    english: "Deformed leaves",
    french: "Feuilles déformées"
  },
  {
    english: "Yellow or pale green leaf spots",
    french: "Taches de feuille jaune ou vert pâle"
  },
  {
    english: "Reduced vegetative growth",
    french: "Croissance végétative réduite"
  },
  {
    english: "Cankers on young stems",
    french: "Cankers sur les jeunes tiges"
  },
  {
    english: "Brown necrosis on leaves",
    french: "Nécrose brune sur les feuilles"
  },
  {
    english: "Drying stems",
    french: "Tiges de séchage"
  },
  {
    english: "Angular spots on limb",
    french: "Taches angulaires sur les membres"
  },
  {
    english: "Foliage burns",
    french: "Burnes du feuillage"
  },
  {
    english: "Leaves wilt",
    french: "Feuilles Wilt"
  },
  {
    english: "Necrosis of roots",
    french: "Nécrose des racines"
  },
  {
    english: "Knots in the roots",
    french: "Nœuds dans les racines"
  },
  {
    english: "The disease appears as small red colored spots on both surfaces of the leaf.",
    french: "La maladie apparaît sous forme de petites taches de couleur rouge sur les deux surfaces de la feuille."
  },
  {
    english: "The center of the spot is white in color encircled by red, purple or brown margin.",
    french: "Le centre de l'endroit est de couleur blanche encerclée par une marge rouge, violette ou brune."
  },
  {
    english: "Numerous small black dots like acervuli are seen on the white surface of the lesions.",
    french: "De nombreux petits points noirs comme les acernuli sont observés sur la surface blanche des lésions."
  },
  {
    english: "Develop a fluffy white or pinkish coloration. C. lunata colors the grain black.",
    french: "Développez une coloration blanche ou rosâtre moelleuse.C. Lunata colore le grain noir."
  },
  {
    english: "Grain infected with these fungi develop a fluffy white or pinkish coloration.",
    french: "Les grains infectés par ces champignons développent une coloration blanche ou rosâtre moelleuse."
  },
  {
    english: "Curvularia lunata is also frequently encountered and this fungus colors the grains black.",
    french: "Curvularia lunata est également fréquemment rencontrée et ce champignon colore les grains en noir."
  },
  {
    english: "The individual grains are replaced by smut sori. Sori are covered with creamy skin.",
    french: "Les grains individuels sont remplacés par le charbon Sori.Les sori sont recouverts de peau crémeuse."
  },
  {
    english: "Sori can be localized at a particular part of the head, or can occur over the entire inflorescence.",
    french: "SORI peut être localisé dans une partie particulière de la tête, ou peut se produire sur toute l'inflorescence."
  },
  {
    english: "Ratoon crops exhibit a higher disease incidence",
    french: "Les cultures de raton présentent une incidence de maladie plus élevée"
  },
  {
    english: "It invades the growing points of young plants, either through oospore or conidial infection.",
    french: "Il envahit les points de croissance des jeunes plantes, soit par une infection Oospore ou conidiale."
  },
  {
    english: "As the leaves unfold they exhibit green or yellow coloration.",
    french: "Au fur et à mesure que les feuilles se déroulent, ils présentent une coloration verte ou jaune."
  },
  {
    english: "Abundant downy white growth is produced on the lower surface of the leaves, which consists of sporangiophores and sporangia.",
    french: "Une croissance blanche du duvet abondante est produite sur la surface inférieure des feuilles, qui se compose de sporangiophores et de sporanges."
  },
  {
    english: "The entire ear head is either completely or partially replaced by a large whitish gall.",
    french: "La tête d'oreille entière est complètement ou partiellement remplacée par une grande galle blanchâtre."
  },
  {
    english: "The spores are blown away, exposing the dark filaments",
    french: "Les spores sont époustouflées, exposant les filaments sombres"
  },
  {
    english: "Relatively small proportion of the florets are infected.",
    french: "Une proportion relativement faible des fleurons est infectée."
  },
  {
    english: "The sori or spore sacs are cylindrical, elongate, usually slightly curved with a relatively thick creamy-brown covering membrane.",
    french: "Les sacs sori ou spores sont cylindriques, allongés, généralement légèrement incurvés avec une membrane de recouvrement crémeuse relativement épaisse."
  },
  {
    english: "Sprouting, emergence of the bud",
    french: "Germer, émergence de l'œuf"
  },
  {
    english: "The sori, which vary in length from 3 to 18 mm, is the solid long black (often curved) pointed columella which extends almost the full length of the sorus and which remains conspicuous after the smut spores have been blown away",
    french: "Le sori, qui varie en longueur de 3 à 18 mm, est la columella pointue noire longue (souvent courbée) solide qui s'étend sur presque toute la longueur du Sorus et qui reste visible après que les spores de charbon ont été époustouflées"
  },
  {
    english: "The first symptoms are small flecks on the lower leaves (purple, tan or red depending upon the cultivar).",
    french: "Les premiers symptômes sont de petits taches sur les feuilles inférieures (violet, beige ou rouge selon le cultivar)."
  },
  {
    english: "Pustules (uredosori) appear on both surfaces of leaf as purplish spots which rupture to release reddish powdery masses of uredospores.",
    french: "Les pustules (uredosori) apparaissent sur les deux surfaces de feuilles comme des taches violacées qui se rompent pour libérer des masses poudreuses rougeâtres d'Uredospores."
  },
  {
    english: "The pustules may also occur on the leaf sheaths and on the stalks of inflorescence",
    french: "Les pustules peuvent également se produire sur les gaines foliaires et sur les tiges de l'inflorescence"
  },
  {
    english: "The young radical and the plumule are killed and there is complete rotting of the seedlings.",
    french: "Le jeune radical et la plumule sont tués et il y a une pourriture complète des semis."
  },
  {
    english: "The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level.",
    french: "La phase de post-émergence est caractérisée par l'infection des jeunes tissus juvéniles du collier au niveau du sol."
  },
  {
    english: "The infected tissues become soft and water soaked. The seedlings topple over or collapse.",
    french: "Les tissus infectés deviennent doux et trempés d'eau.Les semis renversent ou s'effondrent."
  },
  {
    english: "The disease is characterized by scattered, rapidly enlarging, irregular, brown, water-soaked lesions with characteristic gray-green borders.",
    french: "La maladie se caractérise par des lésions dispersées, agrandies rapidement, irrégulières, brunes et imbibées d'eau avec des bordures gris-vert caractéristiques."
  },
  {
    english: "During mid nursery period causing leaf blight and blackening of roots and stems leading to death of seedlings. Water soaked brown to black lesions appear on the leaf.",
    french: "Au milieu de la pépinière, provoquant la brûlure des feuilles et le noircissement des racines et des tiges entraînant la mort de semis.L'eau brunsée aux lésions noires apparaît sur la feuille."
  },
  {
    english: "These patches enlarge and coalesce leading to wet rot of leaf tissue and midribs.",
    french: "Ces parcelles agrandis et fusionnent conduisant à la pourriture humide du tissu des feuilles et des promenades médianes."
  },
  {
    english: "Just like damping off, sudden death of seedlings in patches is noticed in seed beds.",
    french: "Tout comme l'amortissement, la mort soudaine de semis dans des taches est remarquée dans des lits de graines."
  },
  {
    english: "Blackening of the collar region, wilting and rotting of leaves are the symptoms.",
    french: "Le noircissement de la région du col, le flétrissement et la pourriture des feuilles sont les symptômes."
  },
  {
    english: "Yellowing (chlorosis) of older leaves, wilting of plants, or flagging of leaf tips",
    french: "Jaunissement (chlorose) des feuilles plus anciennes, un flétrissement des plantes ou une signalisation des pointes de feuilles"
  },
  {
    english: "Symptom appears as small water soaked spots with sunken center on leaves.",
    french: "Le symptôme apparaît comme de petites taches trempées d'eau avec un centre coulé sur les feuilles."
  },
  {
    english: "Spots become white with brown margin.",
    french: "Les taches deviennent blanches avec une marge brune."
  },
  {
    english: "Lesions occur also on midribs, petioles and lateral veins causing distortion and ragged.",
    french: "Les lésions se produisent également sur des nervures médianes, des pétioles et des veines latérales provoquant une distorsion et en lambeaux."
  },
  {
    english: "Several small, round brown lesions with 2-10 mm diameter on lower and mature leaves occur.",
    french: "Plusieurs petites lésions brunes rondes avec 2 à 10 mm de diamètre sur les feuilles inférieures et matures se produisent."
  },
  {
    english: "Typical lesion with white parchment center surrounded by brown or tan colored margin resembling eye of frog.",
    french: "Lésion typique avec centre de parchemin blanc entouré de marge marron ou de couleur bronzée ressemblant à l'œil de grenouille."
  },
  {
    english: "Different spots coalesce causing drying of leaves which wither prematurely.",
    french: "Différents endroits fusionnent provoquant un séchage des feuilles qui se flétrissent prématurément."
  },
  {
    english: "Infected leaves show mottling veins show shortened internodes with small, distorted leaves.",
    french: "Les feuilles infectées montrent que les veines de martelage montrent des entre-nœuds raccourcis avec de petites feuilles déformées."
  },
  {
    english: "In later growth of plant stunted and limited to basal suckers, and the vine eventually dies.",
    french: "Dans la croissance ultérieure des plantes rabougries et limitées aux rejets basaux, et la vigne meurt finalement."
  },
  {
    english: "Dead and dying vines are usually present in a roughly circular pattern in the vineyard.",
    french: "Les vignes mortes et mourantes sont généralement présentes dans un motif à peu près circulaire dans le vignoble."
  },
  {
    english: "Disease plants show leaves with mottling or mosaic pattern of light green and dark-green areas.",
    french: "Les plantes de maladie montrent des feuilles avec des marbrures ou un motif de mosaïque des zones vert clair et vert foncé."
  },
  {
    english: "Vein clearing, greenish yellow mottling occur as primary symptoms on newly formed young leaves.",
    french: "La clairière des veines, les marbrures jaunes verdâtres se produisent comme symptômes primaires sur les jeunes feuilles nouvellement formées."
  },
  {
    english: "Infection on young plants results in stunted growth, malformation, distortion and puckering of leaves. Dark-green blisters and sometime enations (leafy growth) appear on the dorsal side of the leaf.",
    french: "L'infection contre les jeunes plantes entraîne une croissance, une malformation, une distorsion et un pli des feuilles.Des cloques vert foncé et parfois des endes (croissance feuillue) apparaissent du côté dorsal de la feuille."
  },
  {
    english: "Symptom development occurs particularly during and immediately following periods of heavy rains and high relative humidity.",
    french: "Le développement des symptômes se produit en particulier pendant et immédiatement après des périodes de fortes pluies et une humidité relative élevée."
  },
  {
    english: "Wilting during the heat of the day.",
    french: "Flétrissant pendant la chaleur de la journée."
  },
  {
    english: "Initially it appears on lower and older leaves as small brown, concentric circular lesions, which spread to upper leaves, petioles, stalks, and capsules even.",
    french: "Initialement, il apparaît sur les feuilles inférieures et plus anciennes comme de petites lésions circulaires brunes et concentriques, qui se propagent même aux feuilles supérieures, pétioles, tiges et capsules."
  },
  {
    english: "In warm weather under high humidity, the leaf spots enlarge, 1-3 cm in diameter, centers are necroses and turn brown with characteristic marking giving a target board appearance with a definite outline.",
    french: "Par temps chaud sous une humidité élevée, les taches foliaires agrandissent, de 1 à 3 cm de diamètre, les centres sont des nécroses et deviennent bruns avec un marquage caractéristique donnant une apparition à la carte cible avec un contour définitif."
  },
  {
    english: "In severe infection spots enlarge, coalesce, and damage large areas making leaves dark-brown, ragged, and worthless.",
    french: "Dans l'infection sévère, les taches agrandis, fusionnent et endommagent de grandes zones, ce qui rend les feuilles brun foncé, en lambeaux et sans valeur."
  },
  {
    english: "It is a complete root parasite affecting the yield and quality of tobacco.",
    french: "Il s'agit d'un parasite racinaire complet affectant le rendement et la qualité du tabac."
  },
  {
    english: "The shoots emerge in clusters, and their basal portion is attached to tobacco roots through which it draws nourishment and depletes the host, resulting in a yield loss of 24 to 52%. Affected plants become stunted, leaves turn pale, and wilt.",
    french: "Les pousses émergent en grappes, et leur partie basale est attachée aux racines du tabac à travers lesquelles il tire la nourriture et épuise l'hôte, entraînant une perte de rendement de 24 à 52%.Les plantes touchées deviennent rabougries, les feuilles se pâle et se flétrissent."
  },
  {
    english: "Initially leaf tips droop, and as the attack intensifies, all the leaves wilt.",
    french: "Initialement, les pointes des feuilles tombent et que l'attaque s'intensifie, toutes les feuilles se flétrissent."
  },
  {
    english: "Disease is characterized by downward curling & rolling of leaves; thickening; dark green in color with vein clearing effect; brittle; enation (cup like or frill like outgrowth), reduction in size.",
    french: "La maladie est caractérisée par un curling et un roulement vers le bas des feuilles;épaississant;Couleur vert foncé avec effet de clairière des veines;fragile;ENation (tasse comme ou infiltration comme la croissance), réduction de taille."
  },
  {
    english: "Infected plants become stunted due to shortening of internodes and the formation of more lateral branches.",
    french: "Les plantes infectées deviennent un ralentissement en raison du raccourcissement des entre-nœuds et de la formation de branches plus latérales."
  },
  {
    english: "Flowers are deformed; partly or completely sterile.",
    french: "Les fleurs sont déformées;en partie ou complètement stérile."
  },
  {
    english: "Affected plants show leaves with mottling or mosaic pattern of light green and dark-green areas.",
    french: "Les plantes touchées montrent des feuilles avec un motif de marchons ou de mosaïque des zones vert clair et vert foncé."
  },
  {
    english: "Primary symptoms appear on newly formed young leaves as vein clearing, greenish yellow mottling.",
    french: "Les symptômes primaires apparaissent sur les jeunes feuilles nouvellement formées sous forme de clairière veineuse, de marbrure jaune verdâtre."
  },
  {
    english: "Darkgreen blisters and sometime enations (leafy growth) appear on the dorsal side of the leaf.",
    french: "Les cloques DarkGreen et parfois des étions (croissance feuillue) apparaissent du côté dorsal de la feuille."
  },
  {
    english: "Initially, greyish-white spots (about 0.5-cm in diameter) appear at the base of the lower leaves of the maturing plant.",
    french: "Initialement, les taches grisâtre-blanc (environ 0,5 cm de diamètre) apparaissent à la base des feuilles inférieures de la plante de maturation."
  },
  {
    english: "Sometimes leaves with incipient infection result in blemishes on curing, which reduce the commercial value of leaves.",
    french: "Parfois, les feuilles avec une infection naissante entraînent des imperfections sur le durcissement, ce qui réduit la valeur commerciale des feuilles."
  },
  {
    english: "Such leaves, on curing, get scorched and show brown patches rendering them unfit for marketing.",
    french: "De telles feuilles, sur le durcissement, se brûlent et montrent des patchs bruns les rendant inaptes à la commercialisation."
  },
  {
    english: "The leaves of the affected plants become yellow.",
    french: "Les feuilles des plantes affectées deviennent jaunes."
  },
  {
    english: "Water-soaked appearance is found at the base of the pseudostem, and rotting takes place at the basal portion.",
    french: "L'apparence imbibée de l'eau est trouvée à la base du pseudostem, et la pourriture a lieu à la partie basale."
  },
  {
    english: "The affected rhizomes become soft and pulpy, and plants easily collapse on pressing.",
    french: "Les rhizomes affectés deviennent doux et pulpeux, et les plantes s'effondrent facilement sur la pression."
  },
  {
    english: "Mild drooping and curling of leaf margins of the lower leaf, and it progressively spreads through lower leaves to upper leaves.",
    french: "Une baisse légère et un curling des marges des feuilles de la feuille inférieure, et elle se propage progressivement à travers les feuilles inférieures aux feuilles supérieures."
  },
  {
    english: "At the severe condition, yellowing and wilting symptoms can be seen.",
    french: "À l'état sévère, des symptômes de jaunissement et de flétrissement peuvent être observés."
  },
  {
    english: "Milky ooze would be secreted from the affected pseudostem and rhizome when they are gently pressed by fingers.",
    french: "Le looze laiteux serait sécrété par le pseudostem et le rhizome affectés lorsqu'ils seront doucement pressés par des doigts."
  },
  {
    english: "The symptoms of the disease start as a water-soaked spot and later turns as a white spot surrounded by dark brown margins and a yellow halo.",
    french: "Les symptômes de la maladie commencent comme un endroit imbibé d'eau et se tournent plus tard comme une tache blanche entourée de marges brun foncé et d'un halo jaune."
  },
  {
    english: "Yellow halo",
    french: "Halo jaune"
  },
  {
    english: "The lesions enlarge and adjacent lesions coalesce to form necrotic areas.",
    french: "Les lésions agrandis et les lésions adjacentes fusionnent pour former des zones nécrotiques."
  },
  {
    english: "On upper surfaces, leaves at the infection site show blotches of yellow or pale green usually near veins, surrounded by normally colored tissue.",
    french: "Sur les surfaces supérieures, les feuilles du site d'infection montrent des taches de jaune ou de vert pâle généralement près des veines, entourées de tissus normalement colorés."
  },
  {
    english: "Occasionally, the fungus may attack the stem of young seedlings when grown under reduced light conditions.",
    french: "Parfois, le champignon peut attaquer la tige des jeunes plants lorsqu'il est cultivé dans des conditions de lumière réduites."
  },
  {
    english: "The spots on fruits first appear as brown superficial discoloration of the skin which develops into circular, slightly sunken areas and 1 to 3 cm in diameter.",
    french: "Les taches sur les fruits apparaissent d'abord comme une décoloration superficielle brune de la peau qui se développe en zones circulaires et légèrement enfoncées et de 1 à 3 cm de diamètre."
  },
  {
    english: "Characteristically elongated dark green streaks develop on petiole and upper half of the stems, infected fruits show circular concentric rings causing up to 56-60% yield loss.",
    french: "Les stries vert foncé caractéristique se développent sur le pétiole et la moitié supérieure des tiges, les fruits infectés montrent des anneaux concentriques circulaires causant jusqu'à 56 à 60% de perte de rendement."
  },
  {
    english: "Roughly circular yellowish discolorations, called oil spots. White down (sporulation of the fungus), particularly on the lower leaf surface.",
    french: "Décolorations jaunâtres à peu près circulaires, appelées taches d'huile.Blanc vers le bas (sporulation du champignon), en particulier à la surface des feuilles inférieures."
  },
  {
    english: "The spots turn brown with time and severely infected leaves may drop.",
    french: "Les taches deviennent brunes avec le temps et les feuilles gravement infectées peuvent baisser."
  },
  {
    english: "Infected shoot tips curl ('shepherd's crook') and a white down occurs on the stem (sporulation of the fungus)",
    french: "Tips de pousse infectés Curl ('Shepher's Crook') et un blanc se produit sur la tige (sporulation du champignon)"
  },
  {
    english: "The first powdery mildew lesions are frequently found on the undersides of leaves.",
    french: "Les premières lésions de mildiou poudreuse se trouvent fréquemment sur le dessous des feuilles."
  },
  {
    english: "Very small orange to black spherical structures called cleistothecia develop on the upper and lower surfaces of leaves",
    french: "Très petite structures sphériques oranges à noires appelées cleistothécia se développent sur les surfaces supérieures et inférieures des feuilles"
  },
  {
    english: "The gradual degeneration of the fungus over the course of the season",
    french: "La dégénérescence progressive du champignon au cours de la saison"
  },
  {
    english: "The fungus will cause small round spots",
    french: "Le champignon provoquera de petites points ronds"
  },
  {
    english: "As they age, they give way to small holes (leaving a 'shot-hole' appearance)",
    french: "En vieillissant, ils cèdent la place à de petits trous (laissant une apparence de «trou de tir»)"
  },
  {
    english: "Shoots: Deep elongated cankers, greyish in the center with a black edge",
    french: "Pousses: cankers profonds allongés, grisâtre au centre avec un bord noir"
  },
  {
    english: "It can infect the green leaves and cause necrotic brown spots",
    french: "Il peut infecter les feuilles vertes et provoquer des taches brunes nécrotiques"
  },
  {
    english: "Infected berries become covered with a greyish felt-like substance consisting of spores of the fungus",
    french: "Les baies infectées deviennent couvertes d'une substance en feutre grisâtre composée de spores de champignon"
  },
  {
    english: "Inflorescences can also be infected (b), causing the inflorescences to dry out or latent infections visible only at veraison.",
    french: "Les inflorescences peuvent également être infectées (b), ce qui a provoqué des infections des inflorescences ou des infections latentes visibles uniquement à la veraison."
  },
  {
    english: "Leaves: presence of small brown lesions (2 to 10 mm in diameter) surrounded by a darker margin a ring of small black fruiting bodies (black pustules)",
    french: "Feuilles: présence de petites lésions brunes (2 à 10 mm de diamètre) entourées d'une marge plus foncée un anneau de petits corps de fructification noirs (pustules noirs)"
  },
  {
    english: "Berries: At first, the berries become whitish then purple to black",
    french: "Baies: Au début, les baies deviennent blanchâtres puis violettes au noir"
  },
  {
    english: "Berries: At the end of the season, berries will be covered by black pustules",
    french: "Baies: À la fin de la saison, les baies seront couvertes de pustules noires"
  },
  {
    english: "Foliage spots first appear as small brown spots that are circular to angular in shape.",
    french: "Les taches de feuillage apparaissent d'abord comme de petites taches brunes qui sont circulaires à angulaires."
  },
  {
    english: "Foliage spots are irregular and turn dark brown or black. Stem lesions can girdle the stem and cause vines to wilt.",
    french: "Les taches de feuillage sont irrégulières et deviennent brunes foncées ou noires.Les lésions de la tige peuvent cesse de la tige et provoquent la flétrissement des vignes."
  },
  {
    english: "The most striking diagnostic symptoms are produced on the fruit, where circular, black, sunken cankers appear.",
    french: "Les symptômes diagnostiques les plus frappants sont produits sur le fruit, où apparaissent les cankers circulaires, noirs et enfoncées."
  },
  {
    english: "The disease starts as small, yellow spots which enlarge to form concentric rings on the upper leaf surfaces.",
    french: "La maladie commence comme de petites taches jaunes qui agrandissent pour former des anneaux concentriques sur les surfaces des feuilles supérieures."
  },
  {
    english: "The pathogen also may cause fruit injury.",
    french: "Le pathogène peut également provoquer des lésions des fruits."
  },
  {
    english: "Plants weakened by a lack of proper fertilizer or poor soils are more likely to be attacked than young, vigorously growing plants.",
    french: "Les plantes affaiblies par un manque d'engrais approprié ou des sols pauvres sont plus susceptibles d'être attaqués que les jeunes plantes en croissance vigoureuse."
  },
  {
    english: "Early symptoms of fruit blotch on foliage are useful in diagnosis. Small, water-soaked areas (a few millimeters in diameter) on cotyledons or leaves may develop, but they are easily overlooked.",
    french: "Les premiers symptômes de tache des fruits sur le feuillage sont utiles dans le diagnostic.De petites zones imbibées d'eau (quelques millimètres de diamètre) sur des cotylédons ou des feuilles peuvent se développer, mais elles sont facilement négligées."
  },
  {
    english: "These later turn brown, but they remain small and do not severely damage leaves. However, the leaf spots serve as a source of the pathogen to infect fruit.",
    french: "Ceux-ci deviennent plus tard bruns, mais ils restent petits et n'endommagent pas gravement les feuilles.Cependant, les taches foliaires servent de source de pathogène pour infecter les fruits."
  },
  {
    english: "Fruit infections first appear as small, water-soaked areas on the upper surface of melons.",
    french: "Les infections aux fruits apparaissent d'abord comme de petites zones imbibées d'eau sur la surface supérieure des melons."
  },
  {
    english: "Initially, the blotches do not extend into the rind, but affected rinds eventually crack and become invaded by secondary pathogens.",
    french: "Initialement, les taches ne s'étendent pas dans l'écorce, mais les rides affectées finalement se fissurent et sont envahies par les agents pathogènes secondaires."
  },
  {
    english: "The disease is mostly confined to leaves, but stems and petioles may become diseased.",
    french: "La maladie est principalement confinée aux feuilles, mais les tiges et les pétioles peuvent devenir malades."
  },
  {
    english: "Leaf spots first appear on younger leaves as small circular spots having dark green to purple margins, becoming white to light tan in the center.",
    french: "Les taches de feuilles apparaissent d'abord sur des feuilles plus jeunes comme de petites taches circulaires ayant des marges vert foncé à violet, devenant blanc pour bronzer au centre."
  },
  {
    english: "The leaf lamina around the spots may become chlorotic and eventually the entire leaf may turn yellow and fall off.",
    french: "La lame des feuilles autour des taches peut devenir chlorotique et finalement la feuille entière peut devenir jaune et tomber."
  },
  {
    english: "Symptoms of mosaic appear on the youngest leaves when infection occurs at 6 – 8 leaves stage.",
    french: "Les symptômes de la mosaïque apparaissent sur les feuilles les plus jeunes lorsque l'infection se produit à 6 à 8 feuilles."
  },
  {
    english: "Leaves curl downwards and become mottled, distorted, wrinkled and reduced in size.",
    french: "Les feuilles s'enroulent vers le bas et deviennent marbrées, déformées, ridées et réduites."
  },
  {
    english: "Veins appear bunchy because of shortening of internodes.",
    french: "Les veines semblent regroupées en raison du raccourcissement des entre-nœuds."
  },
  {
    english: "It is evident as a superficial, powdery, grayish-white growth on upper leaf surfaces, petioles, and even main stems of infected plants.",
    french: "Il est évident comme une croissance superficielle, poudreuse et grisâtre sur les surfaces des feuilles supérieures, les pétioles et même les principales tiges des plantes infectées."
  },
  {
    english: "Affected areas turn yellow then brown and die.",
    french: "Les zones affectées deviennent jaunes puis brunes et meurent."
  },
  {
    english: "Some early disease results from spores produced on overwintering cucurbit debris or weeds but the major source of disease inoculum is windblown spores from southern crops.",
    french: "Certaines maladies précoces résultent de spores produites sur les débris de cucurbit d'hivernage ou les mauvaises herbes, mais la principale source d'inoculum de la maladie est les spores soufflées par le vent des cultures du sud."
  },
  {
    english: "Symptoms first appear as dull, greyish green appearance to the foliage.",
    french: "Les symptômes apparaissent d'abord comme une apparence verte grisâtre et grisâtre au feuillage."
  },
  {
    english: "Affected vines wilt, become dry, turn brown and die.",
    french: "Les vignes affectées se fard, deviennent sèches, brunissent et meurent."
  },
  {
    english: "Elongated brown lesions (dead areas) may develop along stems near the crown.",
    french: "Les lésions brunes allongées (zones mortes) peuvent se développer le long des tiges près de la couronne."
  },
  {
    english: "Infected stems first appear water-soaked and then become dry, coarse, and tan.",
    french: "Les tiges infectées apparaissent d'abord à l'eau et deviennent ensuite sèches, grossières et bronzées."
  },
  {
    english: "Older stem lesions (dead tissue) reveal small black fruiting bodies (pycnidia) within the affected tissues.",
    french: "Les lésions de tige plus anciennes (tissu mort) révèlent de petits corps de fructification noirs (pycnidia) dans les tissus affectés."
  },
  {
    english: "Stem lesions on melons exude a gummy, red-brown substance which may be mistaken for a symptom of Fusarium wilt.",
    french: "Les lésions STEM sur les melons respirent une substance gommeuse et brun rouge qui peut être confondue avec un symptôme de flétrissement du fusarium."
  },
  {
    english: "Powdery mildew first appears on the oldest leaves as yellow areas on the upper leaf surface.",
    french: "Le mildiou poudré apparaît d'abord sur les feuilles les plus anciennes sous forme de zones jaunes sur la surface de la feuille supérieure."
  },
  {
    english: "The white mildew on the underside of the leaf often can only be seen with the aid of a hand lens.",
    french: "Le mildiou sur le dessous de la feuille ne peut souvent être vu qu'à l'aide d'une lentille à main."
  },
  {
    english: "As the disease increases, the areas of whitish, powdery growth become more apparent and can cover both upper and lower leaf surfaces.",
    french: "À mesure que la maladie augmente, les zones de croissance blanchâtre et poudreuse deviennent plus apparentes et peuvent couvrir les surfaces des feuilles supérieures et inférieures."
  },
  {
    english: "Initial symptoms are a slight flagging of the plants in midday even when abundant moisture is present.",
    french: "Les premiers symptômes sont une légère signalisation des plantes à midi même en cas d'humidité abondante."
  },
  {
    english: "This flagging will continue to worsen so that, by the third or fourth day, many of the plants are completely wilted.",
    french: "Cette signalisation continuera de s'aggraver afin que, au troisième ou au quatrième jour, de nombreuses plantes soient complètement flétries."
  },
  {
    english: "Affected plants appear to lack feeder roots; other roots become slightly misshapen and thick.",
    french: "Les plantes affectées semblent manquer de racines d'alimentation;D'autres racines deviennent légèrement déformés et épaisses."
  },
  {
    english: "Symptoms are most striking on the new growth of young, rapidly growing plants.",
    french: "Les symptômes sont les plus frappants sur la nouvelle croissance des jeunes plantes en croissance rapide."
  },
  {
    english: "Leaves are dwarfed, misshapen, puckered, pale green in color, and exhibit mosaic patterns of light and dark green color.",
    french: "Les feuilles sont éclipsées, déformées, plissées, de couleur verte pâle et présentent des motifs mosaïques de couleur claire et vert foncé."
  },
  {
    english: "Infected plants remain stunted throughout the season and may fail to set fruit or it will be small in size and poor in quality.",
    french: "Les plantes infectées restent rabougries tout au long de la saison et peuvent ne pas régler les fruits ou il sera de petite taille et de qualité médiocre."
  },
  {
    english: "Sometimes the vine terminals of infected plants become erect and hover over the canopy.",
    french: "Parfois, les terminaux de vigne des plantes infectées deviennent dressées et planent au-dessus de la canopée."
  },
  {
    english: "Affected plants are often most numerous near edges of fields and appear in patches. Plants turn yellow and die back.",
    french: "Les plantes affectées sont souvent les plus nombreux à proximité des champs et apparaissent dans les patchs.Les plantes deviennent jaunes et meurent en arrière."
  },
  {
    english: "Numerous squash bugs may be present or there will be evidence of their prior feeding.",
    french: "De nombreux bogues de courge peuvent être présents ou il y aura des preuves de leur alimentation préalable."
  },
  {
    english: "When basal stems of affected plants are cross-sectioned, a ring of light brown discoloration is evident around the outer part (phloem) of the vascular core.",
    french: "Lorsque les tiges basales des plantes affectées sont transversales, un anneau de décoloration brun clair est évident autour de la partie extérieure (phloème) du noyau vasculaire."
  },
  {
    english: "Aboveground, plants affected by root-knot nematode appear yellowed, stunted, or generally unthrifty.",
    french: "Au-dessus du sol, les plantes touchées par des nématodes à nœuds racinaires semblent jaunies, ralentis ou généralement non lancées."
  },
  {
    english: "Affected areas often occur as patchy areas in a field or along a row of plants.",
    french: "Les zones touchées se produisent souvent comme des zones inégales dans un champ ou le long d'une rangée de plantes."
  },
  {
    english: "Affected roots are disfigured, swollen, and stubby in appearance.",
    french: "Les racines affectées sont défigurées, enflées et en apparence tronquée."
  },
  {
    english: "Symptoms first appear as yellowed wedge-shaped areas on older leaves, which eventually develop brown sectors.",
    french: "Les symptômes apparaissent d'abord comme des zones en forme de coin jaunis sur les feuilles plus âgées, qui finissent par développer des secteurs bruns."
  },
  {
    english: "Crown leaves collapse and wilt extends along individual vines.",
    french: "Les feuilles de la couronne s'effondrent et se flétrissent le long des vignes individuelles."
  },
  {
    english: "Wilt symptoms often are one-sided, in that individual vines wilt before the entire plant dies.",
    french: "Les symptômes de flétrissement sont souvent unilatéraux, dans cette vigne individuelle, la mort de la plante entière."
  },
  {
    english: "Externally gradual yellowing and drying of foliage, shrinkage/withering of canes.",
    french: "Le jaunissement et le séchage progressifs extérieurs du feuillage, le rétrécissement/la flétage des cannes."
  },
  {
    english: "Some symptoms",
    french: "Certains symptômes"
  },
  {
    english: "Custom Symptom 2",
    french: "Symptôme personnalisé 2"
  },
  {
    english: "Circular gray-brown lesions on leaves and wilting the plant",
    french: "Lésions grise-brun circulaires sur les feuilles et flétrissant la plante"
  },
  {
    english: "The vascular system of the plant is discolored",
    french: "Le système vasculaire de la plante est décoloré"
  },
  {
    english: "Corollas of expanded blossoms appear blighted; brown lesions on leaves which have come into contact with infected blossoms.",
    french: "Les corolles des fleurs élargies semblent détruites;Lésions brunes sur les feuilles qui sont entrées en contact avec des fleurs infectées."
  },
  {
    english: "Infected blossoms do not produce fruit",
    french: "Les fleurs infectées ne produisent pas de fruits"
  },
  {
    english: "In large fields, severe infections are often visible as brown patches",
    french: "Dans de grands champs, les infections graves sont souvent visibles sous forme de plaques brunes"
  },
  {
    english: "Infected berries are cream or pink in color and turn tan or gray",
    french: "Les baies infectées sont de couleur crème ou rose et tourner le bronzage ou le gris"
  },
  {
    english: "Berries become shriveled and hard; shriveled skin of fruit breaks down to expose black rind of fungal tissue",
    french: "Les baies deviennent ratatinées et dures;La peau ratatinée de fruits se décompose pour exposer une croûte noire de tissu fongique"
  },
  {
    english: "Death of infected shoots, leaves, and flowers",
    french: "Mort des pousses, feuilles et fleurs infectées"
  },
  {
    english: "White fluffy growth on the upper surfaces of leaves or the lower leaf surface",
    french: "Croissance duveteuse blanche sur les surfaces supérieures des feuilles ou de la surface de la feuille inférieure"
  },
  {
    english: "Leaves may be puckered in appearance; leaves may develop chlorotic spots with red borders",
    french: "Les feuilles peuvent être plissées en apparence;Les feuilles peuvent développer des taches chlorotiques avec des bordures rouges"
  },
  {
    english: "Leaves may drop from the plant",
    french: "Les feuilles peuvent tomber de la plante"
  },
  {
    english: "Elongated reddish streaks on green stems, purplish red leaves, cupped leaves.",
    french: "Des stries rougeâtre allongées sur des tiges vertes, des feuilles rouges violacées, des feuilles en coupe."
  },
  {
    english: "Leaves may be elongated or strap-like.",
    french: "Les feuilles peuvent être allongées ou en forme de sangle."
  },
  {
    english: "Reddish-purple fruit",
    french: "Fruit à l'assiette rougeâtre"
  },
  {
    english: "It is a soil-borne disease caused by the fungus Sclerotiniascelorotiorum.",
    french: "Il s'agit d'une maladie transmise par le sol causée par le champignon sclérotiniascelororiorum."
  },
  {
    english: "The white rust fungus attacks the lower surface of the outer leaves, and plants suddenly die.",
    french: "Le champignon de rouille blanc attaque la surface inférieure des feuilles externes et les plantes meurent soudainement."
  },
  {
    english: "White rust is an obligate parasite that attacks vegetative and flowering structures of the plants and can cause yellow lesions on the upper surface",
    french: "La rouille blanche est un parasite obligatoire qui attaque les structures végétatives et à fleurs des plantes et peut provoquer des lésions jaunes sur la surface supérieure"
  },
  {
    english: "Small purplish brown spots on the under surface of leaves",
    french: "Petites taches brunes violacées sur la surface sous les feuilles"
  },
  {
    english: "The most visible symptom is a bright bronze to red coloration of the leaves of the young plant or a pinkish and/or yellowish coloration of the older leaves.",
    french: "Le symptôme le plus visible est un bronze vif à la coloration rouge des feuilles de la jeune plante ou une coloration rosée et/ou jaunâtre des feuilles plus âgées."
  },
  {
    english: "The symptoms of root rots are a reduction in plant growth with the development of reddish-colored leaves and the browning of the leaf margins.",
    french: "Les symptômes des pourries racinaires sont une réduction de la croissance des plantes avec le développement de feuilles de couleur rougeâtre et le brunissement des marges des feuilles."
  },
  {
    english: "The symptoms are rotting at the base of the leaves in the center of the leaf whorl (heart) of young non-flowering plants.",
    french: "Les symptômes pourrissent à la base des feuilles au centre du verticille des feuilles (cœur) des jeunes plantes non fleriantes."
  },
  {
    english: "Water soaked appearance is found at the base of the pseudostem and rotting takes place at the basal portion.",
    french: "L'apparence trempée de l'eau est trouvée à la base du pseudostem et la pourriture a lieu à la partie basale."
  },
  {
    english: "The affected rhizomes become soft and pulpy and plants easily collapse on pressing.",
    french: "Les rhizomes affectés deviennent doux et pulpeux et les plantes s'effondrent facilement sur la pression."
  },
  {
    english: "The spots of 1-2mm diameter appear in more numbers, covering both sides of leaf.",
    french: "Les taches de 1 à 2 mm de diamètre apparaissent en plus de nombres, couvrant les deux côtés de la feuille."
  },
  {
    english: "The attacked leaf presents a reddish-brown appearance instead of the normal green color.",
    french: "La feuille attaquée présente une apparence brun rougeâtre au lieu de la couleur verte normale."
  },
  {
    english: "These spots coalesce to form irregular bigger patches.",
    french: "Ces taches fusionnent pour former des plaques irrégulières plus grandes."
  },
  {
    english: "Yello halo",
    french: "Yelelo Gallo"
  },
  {
    english: "Small brown lesions near top of berries (early on)",
    french: "Petites lésions brunes près du sommet des baies (tôt)"
  },
  {
    english: "Powdery dead young leaves",
    french: "Feuilles jeunes poudreuses"
  },
  {
    english: "Soft and mushy rotten holes or areas on fruit",
    french: "Trous ou zones pourrissins doux et pâteux sur les fruits"
  },
  {
    english: "An early symptom of the disease is upward curling of the leaf margins.",
    french: "Un symptôme précoce de la maladie est le curling à la hausse des marges des feuilles."
  },
  {
    english: "White powdery splotches on the top of leaves or stems",
    french: "Des taches de poudre blanches sur le dessus des feuilles ou des tiges"
  },
  {
    english: "Leaves look like they’re dusted with white powder (especially the underside)",
    french: "Les feuilles semblent saupoudrant de poudre blanche (en particulier le dessous)"
  },
  {
    english: "Spots may later turn into tan or white centers with rusty-brown margins",
    french: "Les taches peuvent plus tard se transformer en centres bronzés ou blancs avec des marges brun rouillées"
  },
  {
    english: "Spots may merge together and kill whole leaves",
    french: "Les taches peuvent fusionner et tuer des feuilles entières"
  },
  {
    english: "Black or brown leathery texture on fruits near spots",
    french: "Texture coriace noire ou marron sur les fruits à proximité"
  },
  {
    english: "It is fast acting as strawberry plants can suddenly wilt and die.",
    french: "Il agit rapidement car les plantes aux fraises peuvent soudainement flétrir et mourir."
  },
  {
    english: "This disease affects the outer leaves first; they become yellow and eventually take on a scorched appearance.",
    french: "Cette maladie affecte d'abord les feuilles extérieures;Ils deviennent jaunes et finissent par prendre une apparence brûlée."
  },
  {
    english: "It enters through roots and affects the water-conducting tissues in the crown",
    french: "Il entre par les racines et affecte les tissus conducteurs d'eau dans la couronne"
  },
  {
    english: "Wilting foliage in spite of ample water",
    french: "Le feuillage flétri"
  },
  {
    english: "Older leaves drying and dying off while younger leaves remain green",
    french: "Les feuilles plus âgées séchaient et mouraient pendant que les feuilles plus jeunes restent vertes"
  },
  {
    english: "Orange or reddish-brown coloration in center of crowns",
    french: "Coloration brun orange ou rougeâtre au centre des couronnes"
  },
  {
    english: "Irregular dark purple or brown spots scattered over leaf surface",
    french: "Des taches irrégulières violettes foncées ou brunes dispersées sur la surface des feuilles"
  },
  {
    english: "Spots with purple centers and no defined border (the leaf spot disease has a clear margin)",
    french: "Taches avec centres violets et aucune frontière définie (la maladie des taches foliaires a une marge claire)"
  },
  {
    english: "Dead leaves, flowers, or fruit (in severe infections)",
    french: "Feuilles mortes, fleurs ou fruits (en infections graves)"
  },
  {
    english: "Lesions or \"spots\" are more numerous on upper leaf surfaces and appear circular to irregular in shape.",
    french: "Les lésions ou les «taches» sont plus nombreux sur les surfaces des feuilles supérieures et apparaissent circulaires à une forme irrégulière."
  },
  {
    english: "These lesions often have definite reddish-purple to rusty-brown borders that surround a necrotic area.",
    french: "Ces lésions ont souvent des frontières rougeâtre à violet rougeâtre aux frontières brun rouillées qui entourent une zone nécrotique."
  },
  {
    english: "Susceptible varieties can be defoliated partly or completely by late summer.",
    french: "Les variétés sensibles peuvent être défoliées en partie ou complètement à la fin de l'été."
  },
  {
    english: "Gray and tan lesions that begin at leaf margins",
    french: "Lésions grises et bronzées qui commencent aux marges des feuilles"
  },
  {
    english: "Blotches spread to cover first new leaves of spring plants",
    french: "Des taches se propagent pour couvrir les premières nouvelles feuilles des plantes de printemps"
  },
  {
    english: "Brownish decay of the fruit calyx (green leaves on top of berries) that is purely cosmetic",
    french: "Décroissance brunâtre du calice fruit (feuilles vertes sur les baies) qui est purement cosmétique"
  },
  {
    english: "Rapid wilting and death of lots of plants",
    french: "Filation rapide et mort de nombreuses plantes"
  },
  {
    english: "Leaves turn dry, yellow, reddish, or brown at the margins and in the veins. New leaves stop developing",
    french: "Les feuilles deviennent sèches, jaunes, rougeâtres ou brunes en marge et dans les veines.De nouvelles feuilles cessent de se développer"
  },
  {
    english: "Bluish or brownish-black blotches on runners",
    french: "Blots bleuâtre ou brunâtre-noir sur les coureurs"
  },
  {
    english: "Infected plants are stunted, with few runners and few fruit.",
    french: "Les plantes infectées sont rabougries, avec peu de coureurs et peu de fruits."
  },
  {
    english: "New leaves are with bluish-green and may wilt",
    french: "Les nouvelles feuilles sont avec un vert bleuâtre et peuvent faire le flétrissement"
  },
  {
    english: "Older leaves may be reddish orange to yellow tinged",
    french: "Les feuilles plus anciennes peuvent être orange rougeâtre à jaune teintée"
  },
  {
    english: "Blotches are delineated by leaf veins",
    french: "Les taches sont délimitées par les veines des feuilles"
  },
  {
    english: "Central dark brown to purple zone with reddish or lighter brown outer areas",
    french: "Zone centrale brun foncé à violet avec des zones extérieures rougeâtres ou brun plus claires"
  },
  {
    english: "They have formed in older, necrotic diseased tissue and are diagnostic for Phomopsis leaf blight.",
    french: "Ils se sont formés dans des tissus malades nécrotiques plus âgés et sont diagnostiques pour la brûlure des feuilles de phomopsis."
  },
  {
    english: "Brown or black colored spots on green and ripe berries",
    french: "Taches brunes ou noires sur les baies vertes et mûres"
  },
  {
    english: "Spots appear water-soaked",
    french: "Les taches semblent imbibées d'eau"
  },
  {
    english: "There are several spots on each berry ",
    french: "Il y a plusieurs taches sur chaque baie"
  },
  {
    english: "Infects strawberry bloom and green or mature fruit.",
    french: "Infecte la fleur de fraise et les fruits verts ou matures."
  },
  {
    english: "Infected blossom clusters turn brown and die.",
    french: "Les grappes de fleurs infectées deviennent brunes et meurent."
  },
  {
    english: "Green fruit become hard and leathery.",
    french: "Les fruits verts deviennent durs et coriaces."
  },
  {
    english: "Slimy or crusty beadlike structures that cover straw, lower leaves, sometimes petioles.",
    french: "Des structures de perles visqueuses ou croustillantes qui couvrent la paille, les feuilles inférieures, parfois les pétioles."
  },
  {
    english: "Creamy-white, grey, purple or yellow.",
    french: "White crémeux, gris, violet ou jaune."
  },
  {
    english: "Eventually produce fruiting structures that are marshmallow-like in texture and produce powdery dry black spores.",
    french: "Finalement, produire des structures de fructification qui ressemblent à une texture et produisent des spores noires sèches poudreuses."
  },
  {
    english: "Fewer fine feeder roots and a bushy appearance",
    french: "Moins de racines de mangeoires fines et une apparence touffue"
  },
  {
    english: "Reddish-brown lesions on feeder roots (root lesion nematode), swells or galls on feeder roots (root knot nematode).",
    french: "Lésions brun rougeâtre sur les racines de l'alimentation (nématode de lésion racinaire), gonflement ou galles sur les racines du mangeur (nématode à nœuds racinaires)."
  },
  {
    english: "Uneven plant growth",
    french: "Croissance inégale des plantes"
  },
  {
    english: "Symptoms 1",
    french: "Symptômes 1"
  },
  {
    english: "Symptoms 2",
    french: "Symptômes 2"
  },
  {
    english: "Symptoms 3",
    french: "Symptômes 3"
  },
  {
    english: "Symptoms 4",
    french: "Symptômes 4"
  },
  {
    english: "The infected branches should be cut and removed and the cut end pasted with Bordeaux mixture 1%",
    french: "Les branches infectées doivent être coupées et retirées et l'extrémité coupée collée avec le mélange Bordeaux 1%"
  },
  {
    english: "Two types of blights are noticed in nutmeg. The first is a white thread blight wherein fine white hyphae aggregate to form fungal threads that traverse along the stem underneath the leaves in a fan shaped or irregular manner causing blight in the affected portions.",
    french: "Deux types de brûlures sont remarqués dans la muscade.Le premier est une brûlure du fil blanc dans lequel des hyphae blancs fines agrégés pour former des fils fongiques qui traversent le long de la tige sous les feuilles d'une manière en forme de ventilateur ou irrégulière provoquant la brûlure dans les parties affectées."
  },
  {
    english: "The second type of blight is called horse hair blight. Fine black silky threads of the fungus form an irregular, loose network on the stems and leaves.",
    french: "Le deuxième type de brûlure est appelé la brûlure des poils de cheval.Les fils soyeux noirs fins du champignon forment un réseau irrégulier et lâche sur les tiges et les feuilles."
  },
  {
    english: "These strands cause blight of leaves and stems. However, these threads hold up the detached, dried leaves on the tree, giving the appearance of a birds nest, when viewed from a distance.",
    french: "Ces brins provoquent la brûlure des feuilles et des tiges.Cependant, ces fils retiennent les feuilles séchées détachées sur l'arbre, donnant l'apparence d'un nid d'oiseaux, vu à distance."
  },
  {
    english: "Immature fruit split, fruit rot and fruit drop are serious in a majority of nutmeg, Immature fruit splitting and shedding are noticed in some trees without any apparent infection.",
    french: "La division des fruits immatures, la pourriture des fruits et la chute des fruits sont graves dans la majorité de la muscade, la séparation et la perte de fruits immatures sont remarqués dans certains arbres sans aucune infection apparente."
  },
  {
    english: "In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discoloration of the rind resulting in rotting.",
    french: "Dans le cas de la pourriture des fruits, l'infection commence à partir du pédicelle sous forme de lésions sombres et se propage progressivement aux fruits, provoquant une décoloration brune de l'écorce entraînant une pourriture."
  },
  {
    english: "In advanced stages, the mace also rots emitting a foul smell. Phytophthora sp. And Diplodia natalensis have been isolated from affected fruits.",
    french: "En stades avancés, la masse pourre également émettant une odeur nauséabonde.Phytophthora sp.Et Diplodia natalensis a été isolé des fruits touchés."
  },
  {
    english: "In advanced stages the necrotic spots become brittle and fall off resulting in shot holes.",
    french: "À des étapes avancées, les taches nécrotiques deviennent fragiles et tombent, ce qui entraîne des trous de tir."
  },
  {
    english: "Water soaked lesions on leaves",
    french: "Lésions trempées d'eau sur les feuilles"
  },
  {
    english: "Entire bush appears burnt",
    french: "Le buisson entier semble brûlé"
  },
  {
    english: "Blackish brownish coloration of leaf sheath",
    french: "Coloration brunâtre noirâtre de la gaine des feuilles"
  },
  {
    english: "Small, dark brown to black lesions on cotyledons; oval or eye-shaped lesions on stems which turn sunken and brown with purple to red margins",
    french: "Petites lésions brun foncé à noires sur les cotylédons;Des lésions ovales ou en forme d'œil sur des tiges qui deviennent enfoncées et brunes avec des marges violettes à rouges"
  },
  {
    english: "Stems may break if cankers weaken stem; pods drying and shrinking above areas of visible symptoms",
    french: "Les tiges peuvent se casser si les cankers affaiblissent la tige;Pods Sèche et rétrécissant au-dessus des zones de symptômes visibles"
  },
  {
    english: "Reddish brown spots on pods which become circular and sunken with rust colored margin",
    french: "Taches brunes rougeâtres sur des gousses qui deviennent circulaires et enfoncées avec une marge de couleur rouille"
  },
  {
    english: "The leaves of the affected plants become yellowish in color, then drop and finally the whole plant dries out",
    french: "Les feuilles des plantes touchées deviennent de couleur jaunâtre, puis tombent et finalement toute la plante sèche"
  },
  {
    english: "Blackened tissue at the base of stem",
    french: "Tissu noirci à la base de la tige"
  },
  {
    english: "Symptoms may be present on only one side of the plant",
    french: "Les symptômes peuvent être présents d'un seul côté de la plante"
  },
  {
    english: "Caused by fungus, it occurs in young seedlings and grown-up plants",
    french: "Causée par des champignons, il se produit chez les jeunes semis et les plantes adultes"
  },
  {
    english: "Affected plants show formation of dark brown lesions on the stem near soil surface",
    french: "Les plantes affectées montrent la formation de lésions brun foncé sur la tige près de la surface du sol"
  },
  {
    english: "Plants dry prematurely, particularly when they face drought stress",
    french: "Les plantes sèchent prématurément, en particulier lorsqu'ils font face à un stress de sécheresse"
  },
  {
    english: "It is transmitted by eriophyid mites from one plant to another",
    french: "Il est transmis par des acariens ériophyid d'une plante à une autre"
  },
  {
    english: "Affected plant becomes pale green and reduces leaf size. No flowering and deformity",
    french: "La plante affectée devient vert pâle et réduit la taille des feuilles.Pas de floraison et de déformation"
  },
  {
    english: "Affected plants remain stunted and branch profusely, as a result of which they appear bushy. No flowers and fruits are borne on such affected plants resulting in total loss of yield",
    french: "Les plantes touchées restent rabougries et se ramifient abondamment, à la suite de laquelle elles semblent touffues.Aucune fleurs et fruits ne sont portés sur de telles plantes touchées entraînant une perte totale de rendement"
  },
  {
    english: "Symptoms appear on all aerial parts of plants as small, circular, necrotic spots that develop quickly, forming typical concentric rings",
    french: "Les symptômes apparaissent sur toutes les parties aériennes des plantes comme de petites taches circulaires et nécrotiques qui se développent rapidement, formant des anneaux concentriques typiques"
  },
  {
    english: "Water-soaked, circular to irregular spots occur. The center of the spot is straw-colored with raised reddish-brown margins",
    french: "Des taches circulaires à l'eau, circulaires à irrégulières se produisent.Le centre de l'endroit est en paille avec des marges brun rougistes surélevées"
  },
  {
    english: "The spots are initially light brown and later turn dark brown. In severe infection, defoliation and drying of infected leaves, branches, and flower buds",
    french: "Les taches sont initialement brun claire et deviennent plus tard brun foncé.En infection sévère, défoliation et séchage des feuilles, branches et boutons fleurisés infectés"
  },
  {
    english: "The disease first appears in the form of yellow, diffused spots scattered on the leaf lamina; such spots slowly expand and in later stages",
    french: "La maladie apparaît d'abord sous forme de taches diffusées jaunes dispersées sur la lame des feuilles;De tels taches se développent lentement et les stades ultérieurs"
  },
  {
    english: "Yellow patches alternated with green patches developed on the leaves",
    french: "Plaques jaunes alternées avec des plaques vertes développées sur les feuilles"
  },
  {
    english: "Such spots slowly expand and in later stages of disease development, affected leaflets show broad, yellow patches alternating with green color",
    french: "Ces taches se dilatent lentement et à des stades ultérieurs du développement de la maladie, les folioles affectées montrent de larges parcelles jaunes alternant avec la couleur verte"
  },
  {
    english: "The powdery mildew symptoms appear mostly on older leaves, however, in severe cases even young buds and pods also get infected",
    french: "Les symptômes de mildiou poudreux apparaissent principalement sur des feuilles plus âgées, cependant, dans des cas graves, même les jeunes bourgeons et gousses sont également infectés"
  },
  {
    english: "Symptoms appear as dull red spots, limited by veins, appear on the upper surface of leaves and later white powdery patches develop on both surfaces",
    french: "Les symptômes apparaissent sous forme de taches rouges ternes, limitées par les veines, apparaissent sur la surface supérieure des feuilles et plus tard, les plaques blanches poudreuses se développent sur les deux surfaces"
  },
  {
    english: "Entire lower leaf surface gets covered with powdery growth, leading to defoliation. The disease is also known to cause stunting of young plants and significantly reduces nodulation",
    french: "La surface de feuille inférieure entière est recouverte d'une croissance poudreuse, conduisant à la défoliation.La maladie est également connue pour provoquer un retard de croissance des jeunes plantes et réduit considérablement la nodulation"
  },
  {
    english: "Phytophthora blight resembles damping off disease as the seedlings die suddenly",
    french: "La brûlure de Phytophthora ressemble à une amortissement de la maladie à mesure que les semis meurent soudainement"
  },
  {
    english: "Infected plants have water-soaked lesions on their leaves",
    french: "Les plantes infectées ont des lésions imbibées d'eau sur leurs feuilles"
  },
  {
    english: "Brown to black, slightly sunken lesions on their stems and petioles",
    french: "Des lésions brunes à noir, légèrement englouties sur leurs tiges et pétioles"
  },
  {
    english: "Lesions girdle the main stems or branches which break at this point",
    french: "Lésions Girdle les tiges ou les branches principales qui se brisent à ce stade"
  },
  {
    english: "Causing several types of spots on the leaves and petioles of affected plants",
    french: "Provoquant plusieurs types de taches sur les feuilles et les pétioles des plantes affectées"
  },
  {
    english: "The spots are triangular in outline and are raised above the surface of the leaf; very rarely, the upper surface is infected",
    french: "Les taches sont triangulaires dans le contour et sont soulevées au-dessus de la surface de la feuille;Très rarement, la surface supérieure est infectée"
  },
  {
    english: "Infected leaves start drying, and in severe cases, defoliation may take place",
    french: "Les feuilles infectées commencent à sécher et, dans des cas graves, une défoliation peut avoir lieu"
  },
  {
    english: "Sowing/Land Preparation Report",
    french: "Rapport de semis/préparation des terres"
  },
  {
    english: "Pest and Disease Management Report",
    french: "Rapport de gestion des ravageurs et des maladies"
  },
  {
    english: "Brown rice",
    french: "riz brun"
  },
  {
    english: "MyIrrigationWaterSources",
    french: "MyirRigationwatersources"
  },
  {
    english: "Bollworm",
    french: "Ver de boule"
  },
  {
    english: "Mites",
    french: "Acariens"
  },
  {
    english: "Caterpillars",
    french: "Les chenilles"
  },
  {
    english: "Weevils",
    french: "Charançon"
  },
  {
    english: "Cutworm",
    french: "Ver de coupé"
  },
  {
    english: "Locusts",
    french: "Sauterelle"
  },
  {
    english: "Birds",
    french: "Des oiseaux"
  },
  {
    english: "Stalk borers",
    french: "Foreuse"
  },
  {
    english: "Moth",
    french: "Papillon de nuit"
  },
  {
    english: "Stink bugs",
    french: "Punaises"
  },
  {
    english: "Potato beetle",
    french: "Coléoptère"
  },
  {
    english: "Corn root worm",
    french: "Ver de la racine de maïs"
  },
  {
    english: "Mormon crickets",
    french: "Grillons mormons"
  },
  {
    english: "Japanese Beetle",
    french: "Scarabée japonais"
  },
  {
    english: "Fruitfly",
    french: "Mouche des fruits"
  },
  {
    english: "Leaf Webber",
    french: "Leaf Webber"
  },
  {
    english: "Midge",
    french: "Moucheron"
  },
  {
    english: "San-Jose-scale",
    french: "À l'échelle de la san-jose"
  },
  {
    english: "Capsule Borer",
    french: "Foreur de capsule"
  },
  {
    english: "Creal rust mite adults",
    french: "Adultes acariens de Rust Creal"
  },
  {
    english: "Bihar hair caterpillar",
    french: "Bihar Hair Caterpillar"
  },
  {
    english: "Cabbage butterfly",
    french: "Papillon de chou"
  },
  {
    english: "Painted bug",
    french: "Bug peint"
  },
  {
    english: "Bihar hairy caterpillar",
    french: "Bihar Hairy Caterpillar"
  },
  {
    english: "Red spider mites",
    french: "Acariens d'araignée rouge"
  },
  {
    english: "Bulb mite",
    french: "Acarien"
  },
  {
    english: "False Chinch Bug",
    french: "Faux chinch bogue"
  },
  {
    english: "Alfalfa Caterpillar",
    french: "Caterpillar de luzerne"
  },
  {
    english: "Blister Beetles",
    french: "Coléoptères"
  },
  {
    english: "Clover Root Curculio",
    french: "Curculio racine de trèfle"
  },
  {
    english: "Grasshoppers",
    french: "Sauterelle"
  },
  {
    english: "Grey Weevil",
    french: "Chargot gris"
  },
  {
    english: "Greenflies",
    french: "Greenflies"
  },
  {
    english: "Brown citrus aphid",
    french: "Puceron d'agrumes bruns"
  },
  {
    english: "Citrus leaf miner",
    french: "Mineur à feuilles d'agrumes"
  },
  {
    english: "Citricolla scale or soft scales",
    french: "Échelle de Citricolla ou échelles molles"
  },
  {
    english: "Asian citrus psyllid",
    french: "Psyllid d'agrumes asiatiques"
  },
  {
    english: "Garlic cutworm",
    french: "Ver coupé à l'ail"
  },
  {
    english: "Rhinoceros beetle",
    french: "Rhinocéros coléoptère"
  },
  {
    english: "Cabbage diamondback moth",
    french: "Moth de chou diamantback"
  },
  {
    english: "Cabbage borer",
    french: "Foreur de chou"
  },
  {
    english: "Bugs",
    french: "Insectes"
  },
  {
    english: "Mole cricket and ground cricket",
    french: "Cricket et cricket au sol"
  },
  {
    english: "Hairy caterpillar",
    french: "Chenille poilue"
  },
  {
    english: "Aphid",
    french: "Puceron"
  },
  {
    english: "Diamondback moth",
    french: "Papillon de diamant"
  },
  {
    english: "Cauliflower butterfly",
    french: "Papillon de chou-fleur"
  },
  {
    english: "Gram Pod Borer/ Capsule Borer",
    french: "Gram pod foreur/ capsule foreur"
  },
  {
    english: "Caterpillar",
    french: "chenille"
  },
  {
    english: "Bud Fly/ Capsule Fly",
    french: "Mouche de bourgeon/ capsule mouche"
  },
  {
    english: "American Boll Worm",
    french: "Ver de la capsule"
  },
  {
    english: "Spotted Boll Worm",
    french: "Ver de la capsule"
  },
  {
    english: "Pink Boll Worm",
    french: "Ver boll rose"
  },
  {
    english: "Jassid",
    french: "Jass"
  },
  {
    english: "Stinkbugs",
    french: "Punaises"
  },
  {
    english: "Leaf eating caterpillar",
    french: "Caterpillar à manger des feuilles"
  },
  {
    english: "Serpentine Leaf Miner",
    french: "Mineur de feuille de serpentine"
  },
  {
    english: "Pinworm",
    french: "Verrou"
  },
  {
    english: "Top Shoot Borer",
    french: "Top Shoot Foreer"
  },
  {
    english: "Leaf Gall Thrips",
    french: "Thrips de la gamme de feuilles"
  },
  {
    english: "Leaf Miner Flies",
    french: "Les mouches des mineurs de feuilles"
  },
  {
    english: "Shoot and Capsule Bore",
    french: "Pousse et alésage de capsule"
  },
  {
    english: "Green Mite",
    french: "Acarien vert"
  },
  {
    english: "Variegated Cricket",
    french: "Cricket varié"
  },
  {
    english: "Shoot Bug",
    french: "Bug"
  },
  {
    english: "Shootfly",
    french: "Fusillade"
  },
  {
    english: "Sorghum Cutworm",
    french: "Ver de sorgho"
  },
  {
    english: "Sorghum Midge",
    french: "Fourgon de sorgho"
  },
  {
    english: "Green Peach Aphid",
    french: "Puceron de pêche verte"
  },
  {
    english: "Ground Beetles",
    french: "Coléoptères"
  },
  {
    english: "Root Knot Nematode",
    french: "Nematode à nœuds racinaire"
  },
  {
    english: "Shoot borer",
    french: "Tirer de la fureur"
  },
  {
    english: "Rhizome flies",
    french: "Rhizome vole"
  },
  {
    english: "Rhizome scales",
    french: "Écailles de rhizome"
  },
  {
    english: "Grape Berry Moth",
    french: "Mite de baies de raisin"
  },
  {
    english: "Grape Thrips",
    french: "Thrips de raisin"
  },
  {
    english: "Grape Leaf Miner Flies",
    french: "Les mouches des mineurs de la feuille de raisin"
  },
  {
    english: "Grape Mealy Bugs",
    french: "Insectes de raisin de raisin"
  },
  {
    english: "Grape Stem borer",
    french: "Foreur"
  },
  {
    english: "Red pumpkin beetle",
    french: "Coléoptère de citrouille rouge"
  },
  {
    english: "Cucumber Beetle",
    french: "Coléoptère"
  },
  {
    english: "Some Pest",
    french: "Quelques ravageurs"
  },
  {
    english: "Blueberry flea beetle",
    french: "Beetle aux myrtilles"
  },
  {
    english: "Sharpnosed leafhopper",
    french: "Cadavre tranchant"
  },
  {
    english: "Butterfly",
    french: "Papillon"
  },
  {
    english: "Leaf Roller",
    french: "Rouleau de feuille"
  },
  {
    english: "Cyyclamen Mite",
    french: "Acarien de cyyclamen"
  },
  {
    english: "Potato Leafhopper",
    french: "Cingle à feuilles de pomme de terre"
  },
  {
    english: "Root Weevil",
    french: "Charançon racine"
  },
  {
    english: "Spittle Bugs",
    french: "Bogues"
  },
  {
    english: "Strawberry Clipper (Bud) Weevil",
    french: "Clipper aux fraises (bourgeon) charançon"
  },
  {
    english: "Tarnished Plant Bug",
    french: "Bug de végétal terni"
  },
  {
    english: "Two - Spotted Mite",
    french: "Acarien à deux"
  },
  {
    english: "Western Flower Thrips",
    french: "Thrips de fleurs occidentales"
  },
  {
    english: "White Grubs (Japanese Beetle)",
    french: "Grubs blancs (scarabée japonais)"
  },
  {
    english: "Cutworms and Armyworms",
    french: "Coupworms et Armyworms"
  },
  {
    english: "New Pest",
    french: "Nouveau ravageur"
  },
  {
    english: "New Pest 2",
    french: "Nouveau ravageur 2"
  },
  {
    english: "Pod Fly",
    french: "Voler"
  },
  {
    english: "Plume Moth",
    french: "Panache"
  },
  {
    english: "Typica (Bergandal, Sidikalang - Sumatera)",
    french: "Typica (Bergandal, Sidikalang - Sumatra)"
  },
  {
    english: "Jawa (Java Coffee, 1700AD)",
    french: "Jawa (Java Coffee, 1700ad)"
  },
  {
    english: "Arabusta (HDT; Hybrid of sterile Arabica and C. Robusta)",
    french: "Arabusta (HDT; hybride d'Arabica stérile et C. robusta)"
  },
  {
    english: "Catimor Lines (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - mix breed arabica-robusta)",
    french: "CATIMOR LINES (ANDUNGSARI, ATENG, JALUK, KARTIKA/CATUAI/WAITI - MIX BROAKE ARABICA -ROBUSTA)"
  },
  {
    english: "Bourbon Chocol",
    french: "Chocolat de bourbon"
  },
  {
    english: "Jawa (Java Coffee, 1700 AD)",
    french: "Allez (allez au café, 3)"
  },
  {
    english: "test fuel",
    french: "carburant de test"
  },
  {
    english: "tesr fuel",
    french: "Test de carburant"
  },
  {
    english: "my new fuel",
    french: "Mon nouveau carburant"
  },
  {
    english: "test",
    french: "test"
  },
  {
    english: "Bacterial ooze",
    french: "Suintement bactérien"
  },
  {
    english: "Bacterial streaming",
    french: "Streaming bactérien"
  },
  {
    english: "Water soaked lesions",
    french: "Lésions trempées d'eau"
  },
  {
    english: "Canker",
    french: "Chancre"
  },
  {
    english: "Shepherds crook ends on woody plants",
    french: "Shepherds Crook se termine sur les plantes ligneuses"
  },
  {
    english: "Wildfire of tobacco",
    french: "Incendie de tabac"
  },
  {
    english: "Blight of beans",
    french: "Blight des haricots"
  },
  {
    english: "Fire blight",
    french: "Brûlure du feu"
  },
  {
    english: "Soft rot",
    french: "Pourriture douce"
  },
  {
    english: "Aster yellows",
    french: "Aster jaunes"
  },
  {
    english: "Cultural/natural/manual",
    french: "Culturel/naturel/manuel"
  },
  {
    english: "Fungal",
    french: "Fongique"
  },
  {
    english: "Viral",
    french: "Virale"
  },
  {
    english: "Bacterial",
    french: "Bactérien"
  },
  {
    english: "Leaf spots",
    french: "Taches de feuille"
  },
  {
    english: "Bird's eye spot",
    french: "Point des yeux de l'oiseau"
  },
  {
    english: "Damping off on seedlings",
    french: "Atténuer les semis"
  },
  {
    english: "Apple scab",
    french: "Gale de pomme"
  },
  {
    english: "Fusarium Wilt",
    french: "Fusarium Want"
  },
  {
    english: "Club root",
    french: "Racine du club"
  },
  {
    english: "Maize streak virus",
    french: "Virus de la strie de maïs"
  },
  {
    english: "Yellowed leaves",
    french: "Feuilles jaunies"
  },
  {
    english: "Plant stunting",
    french: "Rabougard de plante"
  },
  {
    english: "Potato virus",
    french: "Virus de la pomme de terre"
  },
  {
    english: "Spotted wilt virus",
    french: "Virus de flétris"
  },
  {
    english: "Plum pox virus",
    french: "Virus de la variole de prune"
  },
  {
    english: "Yellow leaf curl virus",
    french: "Virus de la boucle des feuilles jaunes"
  },
  {
    english: "Seed treatment",
    french: "Traitement des graines"
  },
  {
    english: "Soil drenching",
    french: "Terre trempée du sol"
  },
  {
    english: "Dry, wet foliar spraying",
    french: "Pulvérisation foliaire sec et humide"
  },
  {
    english: "Last test",
    french: "Dernier test"
  },
  {
    english: "Testing last",
    french: "Tester en dernier"
  },
  {
    english: "Test last one",
    french: "Tester le dernier"
  },
  {
    english: "Testing last last",
    french: "Test dernier dernier"
  },
  {
    english: "Testering",
    french: "Test"
  },
  {
    english: "Testing",
    french: "Essai"
  },
  {
    english: "Hello test",
    french: "Hello Test"
  },
  {
    english: "New test",
    french: "Nouveau test"
  },
  {
    english: "Zone",
    french: "Zone"
  },
  {
    english: "Paddock",
    french: "Paddock"
  },
  {
    english: "Camp",
    french: "Camp"
  },
  {
    english: "Pen",
    french: "Stylo"
  },
  {
    english: "Segment",
    french: "Segment"
  },
  {
    english: "Pasture",
    french: "Pâturage"
  },
  {
    english: "zero-grazing",
    french: "zéro"
  },
  {
    english: "fenced farming",
    french: "agriculture clôturée"
  },
  {
    english: "enclosed ranching",
    french: "élevage ci-joint"
  },
  {
    english: "my way",
    french: "mon chemin"
  },
  {
    english: "propping",
    french: "soutenant"
  },
  {
    english: "Detrashing",
    french: "Détachement"
  },
  {
    english: "Topping",
    french: "Garniture"
  },
  {
    english: "Nipping",
    french: "Grignotage"
  },
  {
    english: "Loose Farming",
    french: "Agriculture lâche"
  },
  {
    english: "Conventional Barn System",
    french: "Système de grange conventionnel"
  },
  {
    english: "Free Range System",
    french: "Système en liberté"
  },
  {
    english: "semiwashed",
    french: "semi-lavé"
  },
  {
    english: "fullwashed",
    french: "à plein essor"
  },
  {
    english: "Hydro",
    french: "Hydroélectricité"
  },
  {
    english: "Optimize The Use Of Synthetic",
    french: "Optimiser l'utilisation de synthétique"
  },
  {
    english: "Currency setting saved successfully.",
    french: "Réglage des devises économisées avec succès."
  },
  {
    english: "Afghanistan",
    french: "Afghanistan"
  },
  {
    english: "Åland Islands",
    french: "Iles Aland"
  },
  {
    english: "Albania",
    french: "Albanie"
  },
  {
    english: "Algeria",
    french: "Algérie"
  },
  {
    english: "American Samoa",
    french: "Samoa américaine"
  },
  {
    english: "Andorra",
    french: "Andorre"
  },
  {
    english: "Angola",
    french: "Angola"
  },
  {
    english: "Anguilla",
    french: "Anguille"
  },
  {
    english: "Antarctica",
    french: "Antarctique"
  },
  {
    english: "Antigua and Barbuda",
    french: "Antigua-et-Barbuda"
  },
  {
    english: "Argentina",
    french: "Argentine"
  },
  {
    english: "Armenia",
    french: "Arménie"
  },
  {
    english: "Aruba",
    french: "Aruba"
  },
  {
    english: "Australia",
    french: "Australie"
  },
  {
    english: "Austria",
    french: "L'Autriche"
  },
  {
    english: "Azerbaijan",
    french: "Azerbaïdjan"
  },
  {
    english: "Bahamas",
    french: "Bahamas"
  },
  {
    english: "Bahrain",
    french: "Bahreïn"
  },
  {
    english: "Bangladesh",
    french: "Bangladesh"
  },
  {
    english: "Barbados",
    french: "Barbade"
  },
  {
    english: "Belarus",
    french: "Biélorussie"
  },
  {
    english: "Belgium",
    french: "Belgique"
  },
  {
    english: "Belize",
    french: "Belize"
  },
  {
    english: "Benin",
    french: "Bénin"
  },
  {
    english: "Bermuda",
    french: "Bermudes"
  },
  {
    english: "Bhutan",
    french: "Bhoutan"
  },
  {
    english: "Bolivia",
    french: "Bolivie"
  },
  {
    english: "Bosnia and Herzegovina",
    french: "Bosnie Herzégovine"
  },
  {
    english: "Botswana",
    french: "Botwana"
  },
  {
    english: "Bouvet Island",
    french: "Île Bouvet"
  },
  {
    english: "Brazil",
    french: "Brésil"
  },
  {
    english: "British Indian Ocean Territory",
    french: "Territoire britannique de l'océan Indien"
  },
  {
    english: "British Virgin Islands",
    french: "Îles Vierges britanniques"
  },
  {
    english: "Brunei",
    french: "Brunei"
  },
  {
    english: "Bulgaria",
    french: "Bulgarie"
  },
  {
    english: "Burkina Faso",
    french: "Burkina Faso"
  },
  {
    english: "Burundi",
    french: "Burundi"
  },
  {
    english: "Cabo Verde",
    french: "Cap-Vert"
  },
  {
    english: "Cambodia",
    french: "Cambodge"
  },
  {
    english: "Cameroon",
    french: "Cameroun"
  },
  {
    english: "Canada",
    french: "Canada"
  },
  {
    english: "Caribbean Netherlands",
    french: "Caraïbes Pays-Bas"
  },
  {
    english: "Cayman Islands",
    french: "Îles Caïmans"
  },
  {
    english: "Central African Republic",
    french: "République centrafricaine"
  },
  {
    english: "Chad",
    french: "Tchad"
  },
  {
    english: "Chile",
    french: "Chili"
  },
  {
    english: "Christmas Island",
    french: "L'île de noël"
  },
  {
    english: "Cocos (Keeling) Islands",
    french: "Îles Cocos (Keeling)"
  },
  {
    english: "Comoros",
    french: "Comores"
  },
  {
    english: "Congo Republic",
    french: "République du Congo"
  },
  {
    english: "Cook Islands",
    french: "les Îles Cook"
  },
  {
    english: "Costa Rica",
    french: "Costa Rica"
  },
  {
    english: "Croatia",
    french: "Croatie"
  },
  {
    english: "Cuba",
    french: "Cuba"
  },
  {
    english: "Curaçao",
    french: "Curacao"
  },
  {
    english: "Cyprus",
    french: "Chypre"
  },
  {
    english: "Czechia",
    french: "Tchécie"
  },
  {
    english: "Denmark",
    french: "Danemark"
  },
  {
    english: "Djibouti",
    french: "Djibouti"
  },
  {
    english: "Dominica",
    french: "Dominique"
  },
  {
    english: "Dominican Republic",
    french: "République dominicaine"
  },
  {
    english: "DR Congo",
    french: "Dr Congo"
  },
  {
    english: "Ecuador",
    french: "Equateur"
  },
  {
    english: "Egypt",
    french: "Egypte"
  },
  {
    english: "El Salvador",
    french: "Le sauveur"
  },
  {
    english: "Equatorial Guinea",
    french: "Guinée Équatoriale"
  },
  {
    english: "Eritrea",
    french: "Érythrée"
  },
  {
    english: "Estonia",
    french: "Estonie"
  },
  {
    english: "Eswatini",
    french: "Dans le tatouage"
  },
  {
    english: "Ethiopia",
    french: "Ethiopie"
  },
  {
    english: "Falkland Islands",
    french: "les îles Falkland"
  },
  {
    english: "Faroe Islands",
    french: "Îles Féroé"
  },
  {
    english: "Fiji",
    french: "Fidji"
  },
  {
    english: "Finland",
    french: "Finlande"
  },
  {
    english: "France",
    french: "France"
  },
  {
    english: "French Guiana",
    french: "Guyane Française"
  },
  {
    english: "French Polynesia",
    french: "Polynésie française"
  },
  {
    english: "French Southern Territories",
    french: "Territoires du Sud français"
  },
  {
    english: "Gabon",
    french: "Gabon"
  },
  {
    english: "Gambia",
    french: "Gambie"
  },
  {
    english: "Georgia",
    french: "Géorgie"
  },
  {
    english: "Germany",
    french: "Allemagne"
  },
  {
    english: "Ghana",
    french: "Ghana"
  },
  {
    english: "Gibraltar",
    french: "Gibraltar"
  },
  {
    english: "Greece",
    french: "Grèce"
  },
  {
    english: "Greenland",
    french: "Groenland"
  },
  {
    english: "Grenada",
    french: "Grenade"
  },
  {
    english: "Guadeloupe",
    french: "Guadeloupe"
  },
  {
    english: "Guam",
    french: "Guam"
  },
  {
    english: "Guernsey",
    french: "Guernesey"
  },
  {
    english: "Guinea",
    french: "Guinée"
  },
  {
    english: "Guinea-Bissau",
    french: "Guinée-Bissau"
  },
  {
    english: "Guyana",
    french: "Guyane"
  },
  {
    english: "Haiti",
    french: "Haïti"
  },
  {
    english: "Heard Island and McDonald Islands",
    french: "Entendus îles et îles McDonald"
  },
  {
    english: "Honduras",
    french: "Honduras"
  },
  {
    english: "Hong Kong",
    french: "Hong Kong"
  },
  {
    english: "Hungary",
    french: "Hongrie"
  },
  {
    english: "Iceland",
    french: "Islande"
  },
  {
    english: "Indonesia",
    french: "Indonésie"
  },
  {
    english: "Iran",
    french: "L'Iran"
  },
  {
    english: "Iraq",
    french: "Irak"
  },
  {
    english: "Ireland",
    french: "Irlande"
  },
  {
    english: "Isle of Man",
    french: "île de Man"
  },
  {
    english: "Italy",
    french: "Italie"
  },
  {
    english: "Ivory Coast",
    french: "Côte d'Ivoire"
  },
  {
    english: "Jamaica",
    french: "Jamaïque"
  },
  {
    english: "Japan",
    french: "Japon"
  },
  {
    english: "Jersey",
    french: "Jersey"
  },
  {
    english: "Jordan",
    french: "Jordan"
  },
  {
    english: "Kazakhstan",
    french: "Kazakhstan"
  },
  {
    english: "Kenya",
    french: "Kenya"
  },
  {
    english: "Kiribati",
    french: "Kiribati"
  },
  {
    english: "Kosovo",
    french: "Kosovo"
  },
  {
    english: "Kuwait",
    french: "Koweit"
  },
  {
    english: "Kyrgyzstan",
    french: "Kirghizistan"
  },
  {
    english: "Laos",
    french: "Laos"
  },
  {
    english: "Latvia",
    french: "Lettonie"
  },
  {
    english: "Lebanon",
    french: "Liban"
  },
  {
    english: "Lesotho",
    french: "Lesotho"
  },
  {
    english: "Liberia",
    french: "Libéria"
  },
  {
    english: "Libya",
    french: "Libye"
  },
  {
    english: "Liechtenstein",
    french: "Liechtenstein"
  },
  {
    english: "Lithuania",
    french: "Lituanie"
  },
  {
    english: "Luxembourg",
    french: "Luxembourg"
  },
  {
    english: "Macao",
    french: "Macao"
  },
  {
    english: "Madagascar",
    french: "Madagascar"
  },
  {
    english: "Malawi",
    french: "Malawi"
  },
  {
    english: "Malaysia",
    french: "Malaisie"
  },
  {
    english: "Maldives",
    french: "Maldives"
  },
  {
    english: "Mali",
    french: "Mali"
  },
  {
    english: "Malta",
    french: "Malte"
  },
  {
    english: "Marshall Islands",
    french: "Iles Marshall"
  },
  {
    english: "Martinique",
    french: "Martinique"
  },
  {
    english: "Mauritania",
    french: "Mauritanie"
  },
  {
    english: "Mauritius",
    french: "Maurice"
  },
  {
    english: "Mayotte",
    french: "Mayotte"
  },
  {
    english: "Mexico",
    french: "Mexique"
  },
  {
    english: "Micronesia",
    french: "Micronésie"
  },
  {
    english: "Moldova",
    french: "Moldavie"
  },
  {
    english: "Monaco",
    french: "Monaco"
  },
  {
    english: "Mongolia",
    french: "Mongolie"
  },
  {
    english: "Montenegro",
    french: "Monténégro"
  },
  {
    english: "Montserrat",
    french: "Montserrat"
  },
  {
    english: "Morocco",
    french: "Maroc"
  },
  {
    english: "Mozambique",
    french: "Mozambique"
  },
  {
    english: "Myanmar",
    french: "Myanmar"
  },
  {
    english: "Namibia",
    french: "Namibie"
  },
  {
    english: "Nauru",
    french: "Nauru"
  },
  {
    english: "Netherlands",
    french: "Pays-Bas"
  },
  {
    english: "Netherlands Antilles",
    french: "Antilles néerlandaises"
  },
  {
    english: "New Caledonia",
    french: "Nouvelle Calédonie"
  },
  {
    english: "New Zealand",
    french: "Nouvelle-Zélande"
  },
  {
    english: "Nicaragua",
    french: "Nicaragua"
  },
  {
    english: "Niger",
    french: "Niger"
  },
  {
    english: "Nigeria",
    french: "Nigeria"
  },
  {
    english: "Niue",
    french: "Niue"
  },
  {
    english: "Norfolk Island",
    french: "l'ile de Norfolk"
  },
  {
    english: "North Korea",
    french: "Corée du Nord"
  },
  {
    english: "North Macedonia",
    french: "Macédoine du Nord"
  },
  {
    english: "Northern Mariana Islands",
    french: "Îles Mariannes du Nord"
  },
  {
    english: "Norway",
    french: "Norvège"
  },
  {
    english: "Oman",
    french: "Oman"
  },
  {
    english: "Pakistan",
    french: "Pakistan"
  },
  {
    english: "Palau",
    french: "Palaos"
  },
  {
    english: "Palestine",
    french: "Palestine"
  },
  {
    english: "Panama",
    french: "Panama"
  },
  {
    english: "Papua New Guinea",
    french: "Papouasie Nouvelle Guinée"
  },
  {
    english: "Paraguay",
    french: "Paraguay"
  },
  {
    english: "Peru",
    french: "Pérou"
  },
  {
    english: "Philippines",
    french: "Philippines"
  },
  {
    english: "Pitcairn Islands",
    french: "Îles Pitcairn"
  },
  {
    english: "Poland",
    french: "Pologne"
  },
  {
    english: "Portugal",
    french: "le Portugal"
  },
  {
    english: "Puerto Rico",
    french: "Porto Rico"
  },
  {
    english: "Qatar",
    french: "Qatar"
  },
  {
    english: "Réunion",
    french: "Réunion"
  },
  {
    english: "Romania",
    french: "Roumanie"
  },
  {
    english: "Russia",
    french: "Russie"
  },
  {
    english: "Rwanda",
    french: "Rwanda"
  },
  {
    english: "Saint Barthélemy",
    french: "Saint Barthélemy"
  },
  {
    english: "Saint Helena",
    french: "Saint Helena"
  },
  {
    english: "Saint Kitts and Nevis",
    french: "Saint-Christophe-et-Niévès"
  },
  {
    english: "Saint Lucia",
    french: "Sainte-Lucie"
  },
  {
    english: "Saint Martin",
    french: "Saint Martin"
  },
  {
    english: "Saint Pierre and Miquelon",
    french: "Saint Pierre and Miquelon"
  },
  {
    english: "Saint Vincent and the Grenadines",
    french: "Saint-Vincent-et-les-Grenadines"
  },
  {
    english: "Samoa",
    french: "Samoa"
  },
  {
    english: "San Marino",
    french: "Saint Marin"
  },
  {
    english: "São Tomé and Príncipe",
    french: "São Tomé et Príncipe"
  },
  {
    english: "Saudi Arabia",
    french: "Arabie Saoudite"
  },
  {
    english: "Senegal",
    french: "Sénégal"
  },
  {
    english: "Serbia",
    french: "Serbie"
  },
  {
    english: "Seychelles",
    french: "les Seychelles"
  },
  {
    english: "Sierra Leone",
    french: "Sierra Leone"
  },
  {
    english: "Singapore",
    french: "Singapour"
  },
  {
    english: "Sint Maarten",
    french: "St Martin"
  },
  {
    english: "Slovakia",
    french: "Slovaquie"
  },
  {
    english: "Slovenia",
    french: "Slovènie"
  },
  {
    english: "Solomon Islands",
    french: "Les îles Salomon"
  },
  {
    english: "Somalia",
    french: "Somalie"
  },
  {
    english: "South Africa",
    french: "Afrique du Sud"
  },
  {
    english: "South Georgia and South Sandwich Islands",
    french: "Géorgie du Sud et îles Sandwich du Sud"
  },
  {
    english: "South Korea",
    french: "Corée du Sud"
  },
  {
    english: "South Sudan",
    french: "Soudan du sud"
  },
  {
    english: "Spain",
    french: "Espagne"
  },
  {
    english: "Sri Lanka",
    french: "Sri Lanka"
  },
  {
    english: "Sudan",
    french: "Soudan"
  },
  {
    english: "Suriname",
    french: "Suriname"
  },
  {
    english: "Svalbard and Jan Mayen",
    french: "Svalbard et Jan Mayen"
  },
  {
    english: "Sweden",
    french: "Suède"
  },
  {
    english: "Switzerland",
    french: "Suisse"
  },
  {
    english: "Syria",
    french: "Syrie"
  },
  {
    english: "Taiwan",
    french: "Taïwan"
  },
  {
    english: "Tajikistan",
    french: "Tadjikistan"
  },
  {
    english: "Tanzania",
    french: "Tanzanie"
  },
  {
    english: "Thailand",
    french: "Thaïlande"
  },
  {
    english: "Timor-Leste",
    french: "Timor Read"
  },
  {
    english: "Togo",
    french: "Aller"
  },
  {
    english: "Tokelau",
    french: "Tokelau"
  },
  {
    english: "Tonga",
    french: "Tonga"
  },
  {
    english: "Trinidad and Tobago",
    french: "Trinité-et-Tobago"
  },
  {
    english: "Tunisia",
    french: "Tunisie"
  },
  {
    english: "Turkey",
    french: "Turquie"
  },
  {
    english: "Turkmenistan",
    french: "Turkménistan"
  },
  {
    english: "Turks and Caicos Islands",
    french: "îles Turques-et-Caïques"
  },
  {
    english: "Tuvalu",
    french: "Tuvalu"
  },
  {
    english: "U.S. Minor Outlying Islands",
    french: "Îles mineures américaines"
  },
  {
    english: "U.S. Virgin Islands",
    french: "Îles Vierges américaines"
  },
  {
    english: "Ukraine",
    french: "Ukraine"
  },
  {
    english: "United Arab Emirates",
    french: "Emirats Arabes Unis"
  },
  {
    english: "United Kingdom",
    french: "Royaume-Uni"
  },
  {
    english: "United States of America",
    french: "les états-unis d'Amérique"
  },
  {
    english: "Uruguay",
    french: "Uruguay"
  },
  {
    english: "Uzbekistan",
    french: "Ouzbékistan"
  },
  {
    english: "Vanuatu",
    french: "Vanuatu"
  },
  {
    english: "Vatican City",
    french: "Cité du Vatican"
  },
  {
    english: "Venezuela",
    french: "Venezuela"
  },
  {
    english: "Vietnam",
    french: "Vietnam"
  },
  {
    english: "Wallis and Futuna",
    french: "Wallis et Futuna"
  },
  {
    english: "Western Sahara",
    french: "Sahara occidental"
  },
  {
    english: "Yemen",
    french: "Yémen"
  },
  {
    english: "Zambia",
    french: "Zambie"
  },
  {
    english: "Zimbabwe",
    french: "Zimbabwe"
  },
  {
    english: "QA Topic",
    french: "Sujet QA"
  },
  {
    english: "Technical Issues",
    french: "Problèmes techniques"
  },
  {
    english: "Mungbean ( Brazil )",
    french: "Mungbean (Brésil)"
  },
  {
    english: "Mungbean ( India )",
    french: "Mungbean (Inde)"
  },
  {
    english: "Mungbean ( Ethiopia )",
    french: "Mungbean (Éthiopie)"
  },
  {
    english: "Ginger",
    french: "Gingembre"
  },
  {
    english: "Tobacco ( Canada )",
    french: "Tabac (Canada)"
  },
  {
    english: "Mango",
    french: "mangue"
  },
  {
    english: "Cauliflower (India)",
    french: "Chou-fleur (Inde)"
  },
  {
    english: "Kidney bean (Brazil)",
    french: "Haricot rénal (Brésil)"
  },
  {
    english: "Kidney bean (India)",
    french: "Haricot rénal (Inde)"
  },
  {
    english: "Papaya (India)",
    french: "Papaya (Inde)"
  },
  {
    english: "Grape",
    french: "Raisin"
  },
  {
    english: "Mango (India)",
    french: "Mangue (Inde)"
  },
  {
    english: "Cacao (Colombia)",
    french: "Cocoa (Colombie)"
  },
  {
    english: "Cacao (Peru)",
    french: "Cacao (Pérou)"
  },
  {
    english: "Garlic (India)",
    french: "Ail (Inde)"
  },
  {
    english: "Apple (Brazil)",
    french: "Pomme (Brésil)"
  },
  {
    english: "Orange",
    french: "Orange"
  },
  {
    english: "Strawberry (India)",
    french: "Fraise (Inde)"
  },
  {
    english: "Strawberry (Brazil)",
    french: "Fraise (Brésil)"
  },
  {
    english: "Turmeric (India)",
    french: "Curcuma (Inde)"
  },
  {
    english: "Papaya (Brazil)",
    french: "Papaya (Brésil)"
  },
  {
    english: "Ginger (India)",
    french: "Gingembre (Inde)"
  },
  {
    english: "Pearl Millet (India)",
    french: "Millet perlé (Inde)"
  },
  {
    english: "Broccoli (India)",
    french: "Brocoli (Inde)"
  },
  {
    english: "Apple (Nepal)",
    french: "Pomme (Népal)"
  },
  {
    english: "Blueberry (Brazil)",
    french: "Myrtille (Brésil)"
  },
  {
    english: "Oil palm (Colombia)",
    french: "Palme à huile (Colombie)"
  },
  {
    english: "Rice (Indonesia)",
    french: "Riz (Indonésie)"
  },
  {
    english: "Grape (Libya)",
    french: "Raisin (Libye)"
  },
  {
    english: "Sugarcane (Tanzania)",
    french: "Canne à sucre (Tanzanie)"
  },
  {
    english: "Alfalfa (Libya)",
    french: "Luzerne (Libye)"
  },
  {
    english: "Grape (Brazil)",
    french: "Raisin (Brésil)"
  },
  {
    english: "Tobacco (Tanzania)",
    french: "Tabac (Tanzanie)"
  },
  {
    english: "Cacao (Honduras)",
    french: "Cocoa (Honduras)"
  },
  {
    english: "Rice (Nigeria)",
    french: "Riz (Nigéria)"
  },
  {
    english: "Barley (Libya)",
    french: "Orge (Libye)"
  },
  {
    english: "Orange (Kenya)",
    french: "Orange (Kenya)"
  },
  {
    english: "litres/hour",
    french: "litres/heure"
  },
  {
    english: " litres/second",
    french: "litres/seconde"
  },
  {
    english: "Green gram (kenya)",
    french: "Gram vert (Kenya)"
  },
  {
    english: "Coffee wilt disease",
    french: "Maladie du café"
  },
  {
    english: "It is a common wilt that results in complete death of coffee trees it infects. This vascular disease is induced by the fungal pathogen known by its (Fusarium xylarioides).",
    french: "C'est un flétrissement commun qui entraîne une mort complète des cafés qu'il infecte.Cette maladie vasculaire est induite par le pathogène fongique connu par son (Fusarium xylarioides)."
  },
  {
    english: "Due to the nature of coffee wilt disease, coffee plants often exhibit symptoms of disruption to vascular systems. Internal symptoms are disturbances to conduction of water in the plant.",
    french: "En raison de la nature de la maladie du café, les plantes de café présentent souvent des symptômes de perturbation des systèmes vasculaires.Les symptômes internes sont des perturbations de la conduction de l'eau dans la plante."
  },
  {
    english: "External symptoms include loss of moisture on leaves, discoloration, leaf loss, dieback of the infected region, swelling of trunks, cracks in mature trees and lastly plant death",
    french: "Les symptômes externes comprennent la perte d'humidité sur les feuilles, la décoloration, la perte de feuilles, le dépérissement de la région infectée, le gonflement des troncs, les fissures dans les arbres matures et enfin la mort végétale"
  },
  {
    english: "Tickets",
    french: "Des billets"
  },
  {
    english: "Piles",
    french: "Tas"
  },
  {
    english: "Boxes",
    french: "Des boites"
  },
  {
    english: "Orange scab",
    french: "Gale d'orange"
  },
  {
    english: "Citrus tristeza virus",
    french: "Virus de tristesse des agrumes"
  },
  {
    english: "Citrus greening",
    french: "Verdissement des agrumes"
  },
  {
    english: "Leaves curling, and leaves and twigs covered in a sticky substance (honeydew) which may be growing sooty mold.",
    french: "Feuilles bouclées et feuilles et brindilles recouvertes d'une substance collante (miellat) qui peut faire pousser des moisissures de suie."
  },
  {
    english: "Insects are small and soft-bodied and are black in color.",
    french: "Les insectes sont petits et à corps doux et sont de couleur noire."
  },
  {
    english: "Aphids transmit tristeza virus on citrus.",
    french: "Les pucerons transmettent le virus Tristeza sur les agrumes."
  },
  {
    english: "Tips of leaves in new growth flushes are twisted, and affected leaves do not expand properly.",
    french: "Les pointes des feuilles dans de nouvelles rinçages de croissance sont tordues et les feuilles affectées ne se développent pas correctement."
  },
  {
    english: "Trees may show symptoms of citrus greening.",
    french: "Les arbres peuvent montrer des symptômes d'écologisation d'agrumes."
  },
  {
    english: "The insect is tiny (4 mm in length) and has a mottled brown appearance. The insect feeds at an angle to the plant, which makes it resemble thorns on the plant leaves.",
    french: "L'insecte est minuscule (4 mm de longueur) et a une apparence brun marbrée.L'insecte se nourrit d'un angle par rapport à la plante, ce qui le fait ressembler à des épines sur les feuilles de la plante."
  },
  {
    english: "Citrus leafminer larvae feed by creating shallow tunnels, or mines, in young leaves of citrus trees.",
    french: "Les larves de mineurs d'agrumes se nourrissent en créant des tunnels peu profonds, ou mines, dans de jeunes feuilles d'arbres d'agrumes."
  },
  {
    english: "Leaf deformation - twisted or curled appearance.",
    french: "Déformation des feuilles - Aspect tordu ou bouclé."
  },
  {
    english: "White or gray tunnels on the leaf surface, stunted growth, and reduced fruit size.",
    french: "Tunnels blancs ou gris à la surface des feuilles, croissance rabougrie et taille des fruits réduite."
  },
  {
    english: "Yellow seedlings,Stem pitting,poor fruit quality",
    french: "Plants jaunes, piqûres de tige, mauvaise qualité des fruits"
  },
  {
    english: "Defoliation in early stages, The caterpillar makes holes in pod, insert the head and the rest of the body hanging out. feed from outside on developing seeds. Pods with round holes",
    french: "Défioliation En début de stades, la chenille fait des trous dans la pod, insérer la tête et le reste du corps qui traîne.se nourrir de l'extérieur sur le développement de graines.Pods avec des trous ronds"
  },
  {
    english: "Larvae damage leaves, buds, flowers, pods and beans;",
    french: "Les larves endommagent les feuilles, les bourgeons, les fleurs, les gousses et les haricots;"
  },
  {
    english: "Eggs are laid singly on both upper and lower leaf surfaces and are initially creamy white but develop a brown-red ring after 24 hours and darken prior to hatching",
    french: "Les œufs sont pondus seuls sur les surfaces des feuilles supérieures et inférieures et sont initialement blancs crémeux mais développent un anneau rouge brun après 24 heures et s'assombrissent avant l'éclosion"
  },
  {
    english: "They damage flowers causing discoloration and shedding",
    french: "Ils endommagent les fleurs provoquant une décoloration et une perte"
  },
  {
    english: "Damaged pods have small darkened entry holes on the surface and borers inside",
    french: "Les gousses endommagées ont de petits trous d'entrée assombris à la surface et les foreurs à l'intérieur"
  },
  {
    english: "Infested pods and flowers are webbed together",
    french: "Les gousses et les fleurs infestées sont palmées ensemble"
  },
  {
    english: "Larvae often found binding leaves together and feeds on the chlorophyll while remaining inside the web",
    french: "Les larves ont souvent trouvé des feuilles de liaison ensemble et se nourrissent de la chlorophylle tout en restant à l'intérieur du Web"
  },
  {
    english: "Leaves rolled up apically and become white and dried up",
    french: "Feuilles enroulées apicalement et deviennent blanches et séchées"
  },
  {
    english: "Leaflets are webbed together with silk, and the larva feeds within the web",
    french: "Les dépliants sont palmés avec de la soie, et la larve se nourrit du Web"
  },
  {
    english: "Dark brown encrustation on the pod wall",
    french: "Incrustation brun foncé sur le mur de la gousse"
  },
  {
    english: "Deforestation",
    french: "La déforestation"
  },
  {
    english: "Cacao Overview",
    french: "Aperçu du Cacao"
  },
  {
    english: "Deforestation Compliance Reports",
    french: "Rapports de conformité de la déforestation"
  },
  {
    english: "Compliance Certification",
    french: "Certification de conformité"
  },
  {
    english: "Order By",
    french: "Commandé par"
  },
  {
    english: "button Create Admin Role? above",
    french: "Bouton Créer un rôle d'administration?au-dessus de"
  },
  {
    english: "Cassava Green Mite (Mononychellus tanajoa)\r\n",
    french: "Cassava Green Mite (Mononychellus Tanajo)"
  },
  {
    english: "Whitefly (Aleurodicus dispersus)\r\n",
    french: "Whitefly (Aléurodique)"
  },
  {
    english: "Coffee Shot hole borer: Xylosandrus compactus\r\n",
    french: "Fauteur de coups de café au café: Xylosandrus compactus"
  },
  {
    english: "Cassava Green Mite (Mononychellus tanajoa)\n",
    french: "Cassava Green Mite (Mononychellus Tanajo)"
  },
  {
    english: "Whitefly (Aleurodicus dispersus)\n",
    french: "Whitefly (Aléurodique)"
  },
  {
    english: "?Red spider mite",
    french: "? Red Spider Acarien"
  },
  {
    english: "Cotton Spotted boll worm\n",
    french: "Ver de boll tacheté de coton"
  },
  {
    english: "Coffee Shot hole borer\n",
    french: "Force de trou de café"
  },
  {
    english: "Tomato Gram pod borer\n",
    french: "Tomate gram pod foreur"
  },
  {
    english: "Tomato Leaf eating caterpillar\n",
    french: "Caterpillar mangeant des feuilles de tomate"
  },
  {
    english: "Tomato Whitefly\n",
    french: "File blanche de la tomate"
  },
  {
    english: "Tomato Serpentine leaf miner.\n",
    french: "Mineur de feuille serpentine tomate."
  },
  {
    english: "Leaf webber or roller and capsule borer\n",
    french: "Leaf webber ou rouleau et foreur de capsule"
  },
  {
    english: "Aphids\n",
    french: "Pucerons"
  },
  {
    english: "Corn earworm \n",
    french: "Verrouillage de maïs"
  },
  {
    english: "Shield scale\n",
    french: "Écran de bouclier"
  },
  {
    english: "Leaf beetle\n",
    french: "Scarabée à feuilles"
  },
  {
    english: "African cassava mosaic disease\r\n",
    french: "Maladie de la mosaïque du manioc africain"
  },
  {
    english: "African cassava mosaic disease\n",
    french: "Maladie de la mosaïque du manioc africain"
  },
  {
    english: "Cotton Black arm\/ Angular leaf spot\n",
    french: "Coton Brun noir \point de feuille angulaire"
  },
  {
    english: "Cotton Anthracnose \n",
    french: "Anthracnose de coton"
  },
  {
    english: "Coffee Berry blotch\n",
    french: "Tampon de baies de café"
  },
  {
    english: "Coffee cercospora leaf spot\n",
    french: "Café Cercospora Leaf Spot"
  },
  {
    english: "Tomato Blossom End Rot disease\n",
    french: "Maladie de la pourriture de la fleur de tomate"
  },
  {
    english: "Tomato leaf curl virus (ToLCV).\n",
    french: "Virus de boucle des feuilles de tomate (TOLCV)."
  },
  {
    english: "Tomato Early blight\n",
    french: "Tomate Early Blight"
  },
  {
    english: "Tomato Late blight. \n",
    french: "Bright tardif tomate."
  },
  {
    english: "White mold \n",
    french: "Moule blanc"
  },
  {
    english: "Fruit rot\r",
    french: "Pourriture des fruits"
  },
  {
    english: "Huaych?a",
    french: "Huaych? A"
  },
  {
    english: "Hadi ( Okra ? leaf Barakat )",
    french: "Hadi (lire? Lev Barakat)"
  },
  {
    english: "Khandwa?2",
    french: "Khandwa?"
  },
  {
    english: "Badnawar?1",
    french: "Badnawar?"
  },
  {
    english: "Luk?ys Ch?oqhepitus",
    french: "LUK? YS CH? OQHEPITUS"
  },
  {
    english: "Brs ita\/ba",
    french: "Brs ita\/ba"
  },
  {
    english: "RS?810",
    french: "RS?810"
  },
  {
    english: "G-cot ?12",
    french: "G-cot ?12"
  },
  {
    english: "MCU? 5VT",
    french: "MCU? 5VT"
  },
  {
    english: "LK?861",
    french: "LK?861"
  },
  {
    english: "Amasya beyazi",
    french: "Amasya blanc"
  },
  {
    english: "Antep karasi",
    french: "Antep Karasi"
  },
  {
    english: "Erenkoy beyazi",
    french: "Familles en Ereckuy"
  },
  {
    english: "The centers of the spots turn grayish-white and are encircled by a distinct ring (0.2?0.6 inches in diameter) of brown tissue",
    french: "Les centres des taches deviennent du blanc grisâtre et sont entourés d'un anneau distinct (0,2? 0,6 pouces de diamètre) de tissu brun"
  },
  {
    english: "Infected stems are often red inside (sometimes pale) and a distinct zig-zag tunnel may be observed ? with maggots or pupae inside.",
    french: "Les tiges infectées sont souvent rouges à l'intérieur (parfois pâles) et un tunnel zig-zag distinct peut être observé?avec des asticots ou des pupes à l'intérieur."
  },
  {
    english: "May even cause plant death, especially in younger plants particularly if damage occurs in the plant?s hypocotyl (basal stem) region.",
    french: "Peut même provoquer la mort des plantes, en particulier chez les plantes plus jeunes, en particulier si des dommages se produisent dans la région hypocotyle de la plante (tige basale)."
  },
  {
    english: "Whip like structure of 25 ? 150 cm.Whip covered by translucent silvery membrane enclosing mass of black powdery spores.",
    french: "Whip comme une structure de 25?150 CM"
  },
  {
    english: "The multi-branching of shoot apex with scaly leaves is known as ?Bunchy Top? or ?Witches? Broom?. The malformed seedlings, remain stunted and die.",
    french: "Le multi-ramification de l'apex de pousse avec des feuilles écailleuses est connue sous le nom de «top bunchy?ou? sorcières?Balai?.Les semis malformés, restent rabougris et meurent."
  },
  {
    english: "RMG-492 IPM-02-3",
    french: "RMG-492 IPM-02-3"
  },
  {
    english: "Smrat IPM-02-3 HUM-16",
    french: "Empereur IPM-02-3 HUM-16"
  },
  {
    english: "Vaibhav AKM-4 PKV-Green Gold AKM-8802",
    french: "Unité de luxe 1 Puck-Green Gold Unit-1"
  },
  {
    english: "KPS1",
    french: "Kp1"
  },
  {
    english: "N22",
    french: "télécommande"
  },
  {
    english: "N26",
    french: "N26"
  },
  {
    english: "KS20",
    french: "Ks20"
  },
  {
    english: "VC637245",
    french: "Il est coupé 45"
  },
  {
    english: "VC61753B",
    french: "FESTA 1753 B"
  },
  {
    english: "VC6173B",
    french: "FESTA 173 B"
  },
  {
    english: "VC614850",
    french: "VC614850"
  },
  {
    english: "VC6137B",
    french: "Festival 137 b"
  },
  {
    english: "KAT 00301",
    french: "Kat 00301"
  },
  {
    english: "KAT 00308",
    french: "Kat 00308"
  },
  {
    english: "KAT 00309",
    french: "Kat 00309"
  },
  {
    english: "Orange (Brazil)",
    french: "Orange (Brésil)"
  },
  {
    english: "Pêra",
    french: "Poire"
  },
  {
    english: "Valencia",
    french: "Valence"
  },
  {
    english: "Hamlin",
    french: "Hamlin"
  },
  {
    english: "Westin",
    french: "Westin"
  },
  {
    english: "Orange (India)",
    french: "Orange (Inde)"
  },
  {
    english: "Khasi",
    french: "Khasi"
  },
  {
    english: "Coorg",
    french: "Coorg"
  },
  {
    english: "Batavian",
    french: "Batavien"
  },
  {
    english: "Jaffa",
    french: "Jaffa"
  },
  {
    english: "Pineapple orange",
    french: "Ananas orange"
  },
  {
    english: "Orange (Nepal)",
    french: "Orange (Népal)"
  },
  {
    english: "mandarin orange (suntala)",
    french: "Mandarin Orange (Sunntala)"
  },
  {
    english: "Khoku local",
    french: "Khoku local"
  },
  {
    english: "sweet orange (junar)",
    french: "Orange sucré (Junar)"
  },
  {
    english: "tangerines",
    french: "mandarines"
  },
  {
    english: "acid lime (kahati)",
    french: "Chaux acide (disons)"
  },
  {
    english: "pummelo (bhogate)",
    french: "Pummelo (souffrance)"
  },
  {
    english: "kumquat (muntala)",
    french: "Kumquat (Muntala)"
  },
  {
    english: "Abacaxi",
    french: "Ananas"
  },
  {
    english: "Cayenne",
    french: "Cayenne"
  },
  {
    english: "Pernambuco",
    french: "Pernambuco"
  },
  {
    english: "Perotera",
    french: "Perotestra"
  },
  {
    english: "Pest nematodes are tiny slender unsegmented worms that infest plant roots, reducing root growth and causing root death thus reducing the plant?s ability to absorb water and nutrients.",
    french: "Les nématodes de ravageurs sont de minuscules vers minces non segmentés qui infestent les racines des plantes, réduisant la croissance des racines et provoquant la mort des racines, réduisant ainsi la capacité de la plante à absorber l'eau et les nutriments."
  },
  {
    english: "Dry pods showing pin head size hole",
    french: "Poss secs montrant le trou de taille de tête de broche"
  },
  {
    english: "Seeds shriveled, striped, and partially eaten",
    french: "Les graines ratatinées, rayées et partiellement mangées"
  },
  {
    english: "The larvae damage seeds as well as cause flowers, buds, and pods to drop",
    french: "Les larves endommagent les graines et font tomber les fleurs, les bourgeons et les gousses"
  },
  {
    english: "The caterpillar is greenish-brown in color and fringed with short hairs and spines",
    french: "La chenille est de couleur brun verdâtre et frangée de cheveux courts et d'épines"
  },
  {
    english: "It also enters into the pod and feeds on developing grains",
    french: "Il entre également dans la cosse et se nourrit de grains en développement"
  },
  {
    english: "The adults are medium to large (2.5 cm in length), usually black with large yellow spots and a red band across the abdomen, which sometimes changes into yellow spots",
    french: "Les adultes sont moyens à grands (2,5 cm de longueur), généralement noirs avec de grandes taches jaunes et une bande rouge à travers l'abdomen, ce qui se transforme parfois en taches jaunes"
  },
  {
    english: "Adults feed on the flowers, tender pods, and young leaves resulting in fewer pods",
    french: "Les adultes se nourrissent des fleurs, des gousses tendres et des jeunes feuilles entraînant moins de gousses"
  },
  {
    english: "An adult beetle can damage 20-30 flowers in a single day",
    french: "Un scarabée adulte peut endommager 20 à 30 fleurs en une seule journée"
  },
  {
    english: "Small soft-bodied insects on the underside of leaves and/or stems of the plant; usually green or yellow in color, but may be pink, brown, red, or black depending on species and host plant",
    french: "Petits insectes à corps doux sur le dessous des feuilles et/ou des tiges de la plante;généralement de couleur verte ou jaune, mais peut être rose, brun, rouge ou noir selon les espèces et la plante hôte"
  },
  {
    english: "If aphid infestation is heavy, it may cause leaves to yellow and/or distort, necrotic spots on leaves and/or stunted shoots",
    french: "Si l'infestation des pucerons est lourde, elle peut faire en sorte que les feuilles soient jaunes et/ou déformer, des taches nécrotiques sur les feuilles et/ou des pousses rabougries"
  },
  {
    english: "Aphids secrete a sticky, sugary substance called honeydew which encourages the growth of sooty mold on the plants",
    french: "Les pucerons sécrètent une substance collante et sucrée appelée Honeydew qui encourage la croissance des moisissures de suie sur les plantes"
  },
  {
    english: "Alterneria Blight",
    french: "Alternaria Blight"
  },
  {
    english: "Sterility Mosaic",
    french: "Mosaïque de stérilité"
  },
  {
    english: "Alterneria Blight/Leaf Spot",
    french: "Alternaria Blight/Leaf Spot"
  },
  {
    english: "Phytophthora Stem Blight",
    french: "Blight de tige Phytophthora"
  },
  {
    english: "Cercospora Leaf Spots",
    french: "Cercospora Leaf"
  },
  {
    english: "valencia late",
    french: "Valence en retard"
  },
  {
    english: "washington navel",
    french: "nombril de Washington"
  },
  {
    english: "Pixie orange",
    french: "Pixie Orange"
  },
  {
    english: "Mineola",
    french: "Mineola"
  },
  {
    english: "Crinkling, curling, bronzing, and drying, or ?hopper burn?",
    french: "Brincet, curling, bronzage et séchage, ou? Hopper brûle?"
  },
  {
    english: "Wood bears superficial irregular dark-grey to black raised patches",
    french: "Les ours en bois sont superficiels de gris foncé irrégulier aux taches surélevées noires"
  },
  {
    english: "Whip-like structure of 25 ? 150 cm. Whip covered by translucent silvery membrane enclosing a mass of black powdery spores.",
    french: "Structure en forme de fouet de 25?150 cm.Fouet recouvert de membrane argentée translucide enferment une masse de spores poudreuses noires."
  },
  {
    english: "Yellow area extends to veins and midrib forming characteristic ?v? shaped chlorotic spots which later turn black",
    french: "La zone jaune s'étend aux veines et à la caractéristique de formage de la nervure médiane? V?Des taches chlorotiques en forme qui deviennent plus tard noires"
  },
  {
    english: "These occur on the upper surface of the leaves in the form of small round blotches with a grey or muddy spot in the centre 6?10 mm in diameter, reminiscent of a peacock?s eye.",
    french: "Ceux-ci se produisent sur la surface supérieure des feuilles sous la forme de petites taches rondes avec une tache grise ou boueuse au centre 6 de 10 mm de diamètre, rappelant l'œil d'un paon."
  },
  {
    english: "Lesions turn pink, red, purple, or light-brown, depending on the plant?s pigments",
    french: "Les lésions deviennent roses, rouges, violettes ou bruns légères, selon les pigments de la plante"
  },
  {
    english: "Symptoms of mosaic appear on the youngest leaves when infection occurs at 6 ? 8 leaves stage.",
    french: "Les symptômes de la mosaïque apparaissent sur les plus jeunes feuilles lorsque l'infection se produit à 6?8 feuilles étape."
  },
  {
    english: "Leaves look like they?re dusted with white powder (especially the underside)",
    french: "Les feuilles ressemblent à ce qu'elles sont saupoudrées de poudre blanche (en particulier le dessous)"
  },
  {
    english: "Lesions or spots are more numerous on upper leaf surfaces and appear circular to irregular in shape.",
    french: "Les lésions ou les taches sont plus nombreuses sur les surfaces des feuilles supérieures et apparaissent circulaires à une forme irrégulière."
  },
  {
    english: "55?less than 65 years",
    french: "55? Moins de 65 ans"
  },
  {
    english: "45?less than 55 years",
    french: "45? Moins de 55 ans"
  },
  {
    english: "35?less than 45 years",
    french: "35? Moins de 45 ans"
  },
  {
    english: "Mango (Saudi Arabia)",
    french: "Mangue (Arabie saoudite)"
  },
  {
    english: "Alphonso",
    french: "Alphonso"
  },
  {
    english: "Chaunsa",
    french: "Cordial"
  },
  {
    english: "Sindhri",
    french: "Sindhri"
  },
  {
    english: "Anwar Ratol",
    french: "Anwar Ratol"
  },
  {
    english: "Keitt",
    french: "Keitt"
  },
  {
    english: "Tommy Atkins",
    french: "Tommy Atkins"
  },
  {
    english: "Pomegranate (Saudi Arabia)",
    french: "Grenade (Arabie saoudite)"
  },
  {
    english: "Al-Taif",
    french: "Taif"
  },
  {
    english: "Baladi",
    french: "Ballades"
  },
  {
    english: "Al-Yamani",
    french: "Yéménite"
  },
  {
    english: "Shami",
    french: "Chii"
  },
  {
    english: "Sour",
    french: "Aigre"
  },
  {
    english: "Camel trot (Al-Qassim).",
    french: "Kamel (al -qassim)."
  },
  {
    english: "The city",
    french: "La ville"
  },
  {
    english: "Molar",
    french: "Molaire"
  },
  {
    english: "Dejativa",
    french: "BAILLEUR"
  },
  {
    english: "Al-Afar",
    french: "la souris"
  },
  {
    english: "Al-Mashhad",
    french: "la scène"
  },
  {
    english: "Tabuk",
    french: "Les tabous"
  },
  {
    english: "Al-Bahah",
    french: "Cour"
  },
  {
    english: "Manfaluti (wonderful)",
    french: "Manfalute (merveilleux)"
  },
  {
    english: "Wheat (Saudi Arabia)",
    french: "Blé (Arabie saoudite)"
  },
  {
    english: "Yecora Rojo",
    french: "Yecora rouge"
  },
  {
    english: "Sakha 93",
    french: "Nous construisons 93"
  },
  {
    english: "Abedi",
    french: "Abedi"
  },
  {
    english: "Boyou 87",
    french: "Bo a 87"
  },
  {
    english: "Sahel 1",
    french: "Sahel 1"
  },
  {
    english: "Capello desprez",
    french: "Capello desprez"
  },
  {
    english: "Safa 11",
    french: "Safa 11"
  },
  {
    english: "Heap",
    french: "Tas"
  },
  {
    english: "Tray",
    french: "Plateau"
  },
  {
    english: "Basket",
    french: "Panier"
  },
  {
    english: "Forastero",
    french: "Étranger"
  },
  {
    english: "Drying trays",
    french: "Plateaux de séchage"
  },
  {
    english: "Elbas (movable dryers)",
    french: "Elbas (séchoirs mobiles)"
  },
  {
    english: "Drying Tunnels",
    french: "Tunnels de séchage"
  },
  {
    english: "Cement",
    french: "Ciment"
  },
  {
    english: "Almonds",
    french: "Amandes"
  },
  {
    english: "Dry Cacao",
    french: "Cacao sec"
  },
  {
    english: "Cacao Data",
    french: "Données de cacao"
  },
  {
    english: "CacaoBuyingStation",
    french: "Station de cacaobuisy"
  },
  {
    english: "CacaoOfflineFarmerList",
    french: "Cacaoofflinefarmerlist"
  },
  {
    english: "AREA-TOO-LARGE",
    french: "Zone trop large"
  },
  {
    english: "REPORT UNAVAILABLE FOR CIRCULAR GEOFENCE",
    french: "Rapport indisponible pour la géofence circulaire"
  },
  {
    english: "Erecta.",
    french: "Érigé."
  },
  {
    english: "Catimor,",
    french: "Catimor,"
  },
  {
    english: "Typica,",
    french: "Typica,"
  },
  {
    english: "Catuai.",
    french: "Catuai."
  },
  {
    english: "Red dwarf Bananas.",
    french: "Bananes naines rouges."
  },
  {
    english: "Selection 7.3/ Sln.7.3",
    french: "Sélection 7.3/ SLN.7.3"
  },
  {
    english: "Selection 4/ Sln.4",
    french: "Sélection 4/ SLN.4"
  },
  {
    english: "MGS Esmeralda",
    french: "MGS Esmeralda"
  },
  {
    english: "PBN - 2002",
    french: "PBN - 2002"
  },
  {
    english: "Rapeseed (Nepal)",
    french: "Pançais (Népal)"
  },
  {
    english: "Chicken Litter",
    french: "Litière de poulet"
  },
  {
    english: "It can damage the flowers of avocado trees, resulting in reduced fruit set and yield.",
    french: "Il peut endommager les fleurs des avocats, entraînant une réduction des fruits et un rendement."
  },
  {
    english: "Inflorescence stage",
    french: "Étape d'inflorescence"
  },
  {
    english: "Ripening stage",
    french: "Étape de maturation"
  },
  {
    english: "Yellow to brown spots on the upper leaf surface which have white dust-like spores on the corresponding under leaf surface.",
    french: "Des taches jaunes à brunes sur la surface des feuilles supérieures qui ont des spores blanches en forme de poussière sur la surface de feuille correspondante."
  },
  {
    english: "Stem tips wilt and bend forming a 'shepherd's crook'",
    french: "Les extrémités des tiges se flétrissent et se plient, formant une « houlette de berger »"
  },
  {
    english: "Infected chlorotic areas produce a massive amount of asexual spores, generally on the lower surface, giving the leaf a 'downy' appearance.",
    french: "Les zones chlorotiques infectées produisent une quantité massive de spores asexuées, généralement sur la surface inférieure, donnant à la feuille une apparence «duveteuse»."
  },
  {
    english: "The spots coalesce and the leaves shrivel and dries up prematurely",
    french: "Les taches fusionnent et les feuilles se rattrapent et sèche prématurément"
  },
  {
    english: "The leaflets of affected leaves are usually distorted, puckered, and smaller than normal. Sometimes the leaflets become indented, resulting in 'fern leaf' symptoms.",
    french: "Les folioles des feuilles affectées sont généralement déformées, plissées et plus petites que la normale.Parfois, les folioles deviennent en retrait, entraînant des symptômes de «feuilles de fougère»."
  },
  {
    english: "There are several spots on each berry",
    french: "Il y a plusieurs taches sur chaque baie"
  },
  {
    english: "In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discoloration of the rind resulting in rotting.",
    french: "Dans le cas de la pourriture des fruits, l'infection commence à partir du pédicelle sous forme de lésions sombres et se propage progressivement aux fruits, provoquant une décoloration brune de l'écorce entraînant une pourriture."
  },
  {
    english: "Bud Fly/Capsule Fly",
    french: "Mouche de bourgeon/capsule mouche"
  },
  {
    english: "Cyclamen Mite",
    french: "Acarien de cyclamen"
  },
  {
    english: "Two-Spotted Mite",
    french: "Acarien à deux points"
  },
  {
    english: "litres/second",
    french: "litres/seconde"
  },
  {
    english: "Lesions or 'spots' are more numerous on upper leaf surfaces and appear circular to irregular in shape.",
    french: "Les lésions ou les «taches» sont plus nombreuses sur les surfaces des feuilles supérieures et apparaissent circulaires à une forme irrégulière."
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (const translation of translations) {
      const existingTranslations = await queryInterface.sequelize.query(
        'SELECT * FROM global_translation_metadata where english = :english',
        {
          replacements: { english: translation.english },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      if (existingTranslations && existingTranslations.length > 0) {
        await queryInterface.bulkUpdate(
          'global_translation_metadata',
          translation,
          {
            id: { [Sequelize.Op.in]: existingTranslations.map((translation) => translation.id) },
          }
        );
      } else {
        await queryInterface.insert(null, 'global_translation_metadata', translation);
      }
    }
  },

  async down(queryInterface, Sequelize) { }

};
