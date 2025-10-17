'use strict';

const data = [
  {
    "english": "General",
    "swahili": "Mkuu"
  },
  {
    "english": "Farm Audit",
    "swahili": "Ukaguzi wa shamba"
  },
  {
    "english": "Drought",
    "swahili": "Ukame"
  },
  {
    "english": "Milking",
    "swahili": "Kukamua"
  },
  {
    "english": "using the Generate Activation Keyss",
    "swahili": "kwa kutumia Funguo za Uanzishaji"
  },
  {
    "english": "Poor root development",
    "swahili": "Maendeleo duni ya mizizi"
  },
  {
    "english": "Stunted growth",
    "swahili": "Ukuaji uliodumaa"
  },
  {
    "english": "Poor crop growth",
    "swahili": "Ukuaji mbaya wa mazao"
  },
  {
    "english": "Vigorous growth",
    "swahili": "Ukuaji wa nguvu"
  },
  {
    "english": "Slow growth",
    "swahili": "Ukuaji wa polepole"
  },
  {
    "english": "File Size",
    "swahili": "Ukubwa wa faili"
  },
  {
    "english": "Horticulture",
    "swahili": "Kilimo cha bustani"
  },
  {
    "english": "Electricity",
    "swahili": "Umeme"
  },
  {
    "english": "Forgot Password?",
    "swahili": "Umesahau nywila?"
  },
  {
    "english": "Logged out successfully",
    "swahili": "Umetoka nje kwa mafanikio"
  },
  {
    "english": "Maximum password age",
    "swahili": "Umri wa juu wa nenosiri"
  },
  {
    "english": "Are you sure you want to delete record?",
    "swahili": "Je, una uhakika unataka kufuta rekodi?"
  },
  {
    "english": "Are you sure you want to delete ticket?",
    "swahili": "Je, una uhakika unataka kufuta tikiti?"
  },
  {
    "english": "Drag and drop or browse your file.",
    "swahili": "Buruta na uangushe au uvinjari faili yako."
  },
  {
    "english": "You can download the report by clicking here",
    "swahili": "Unaweza kupakua ripoti hiyo kwa kubofya hapa"
  },
  {
    "english": "You can now use your new password to login into your account.",
    "swahili": "Sasa unaweza kutumia nenosiri lako jipya kuingia katika akaunti yako."
  },
  {
    "english": "Create",
    "swahili": "Unda"
  },
  {
    "english": "CREATE ADMIN ROLE",
    "swahili": "TENGENEZA NAFASI YA ADMIN"
  },
  {
    "english": "Create Topic",
    "swahili": "Tengeneza Mada"
  },
  {
    "english": "CREATE FAQ",
    "swahili": "TUNZA MASWALI"
  },
  {
    "english": "Create Ticket",
    "swahili": "Tengeneza Tiketi"
  },
  {
    "english": "Create Ticket for Dimitra Admin",
    "swahili": "Unda Tiketi kwa Msimamizi wa Dimitra"
  },
  {
    "english": "Create Ticket for App User",
    "swahili": "Unda Tiketi kwa Mtumiaji wa Programu"
  },
  {
    "english": "Thickness",
    "swahili": "Unene"
  },
  {
    "english": "Irrigation",
    "swahili": "Umwagiliaji"
  },
  {
    "english": "Access to Satellite Reports (Set of 5 reports)",
    "swahili": "Upatikanaji wa Ripoti za Satellite (Seti ya ripoti 5)"
  },
  {
    "english": "Access to Advanced Reports",
    "swahili": "Upatikanaji wa Ripoti za Kina"
  },
  {
    "english": "Curing",
    "swahili": "Kuponya"
  },
  {
    "english": "Urea",
    "swahili": "Urea"
  },
  {
    "english": "length",
    "swahili": "urefu"
  },
  {
    "english": "Allowed minimum password length",
    "swahili": "Urefu wa chini kabisa wa nenosiri unaoruhusiwa"
  },
  {
    "english": "Password length",
    "swahili": "Urefu wa nenosiri"
  },
  {
    "english": "Crop height (height in cm or m)",
    "swahili": "Urefu wa mazao (urefu kwa cm au m)"
  },
  {
    "english": "Web page URL",
    "swahili": "URL ya ukurasa wa wavuti"
  },
  {
    "english": "Transportation",
    "swahili": "Usafiri"
  },
  {
    "english": "Profile Not Updated",
    "swahili": "Wasifu Haujasasishwa"
  },
  {
    "english": "Crop Registration",
    "swahili": "Usajili wa Mazao"
  },
  {
    "english": "Animal Registration",
    "swahili": "Usajili wa Wanyama"
  },
  {
    "english": "User Not Updated",
    "swahili": "Mtumiaji Hajasasishwa"
  },
  {
    "english": "User Updated",
    "swahili": "Mtumiaji Alisasishwa"
  },
  {
    "english": "Farm Registration",
    "swahili": "Usajili wa Shamba"
  },
  {
    "english": "Farm Registration",
    "swahili": "Usajili wa Shamba"
  },
  {
    "english": "Crop Registration",
    "swahili": "Usajili wa Mazao"
  },
  {
    "english": "Water management (1 point)",
    "swahili": "Usimamizi wa maji (pointi 1)"
  },
  {
    "english": "crop-water-mgmt",
    "swahili": "mazao-maji-mgmt"
  },
  {
    "english": "Soil Management",
    "swahili": "Usimamizi wa Udongo"
  },
  {
    "english": "Soil Management",
    "swahili": "Usimamizi wa Udongo"
  },
  {
    "english": "Soil Management",
    "swahili": "Usimamizi wa Udongo"
  },
  {
    "english": "Processing",
    "swahili": "Inachakata"
  },
  {
    "english": "Email ID",
    "swahili": "Kitambulisho cha barua pepe"
  },
  {
    "english": "Perchament ID",
    "swahili": "Kitambulisho cha Perchament"
  },
  {
    "english": "User ID",
    "swahili": "Kitambulisho cha Mtumiaji"
  },
  {
    "english": "Land preparation",
    "swahili": "Maandalizi ya ardhi"
  },
  {
    "english": "Land/Soil Preparation",
    "swahili": "Maandalizi ya Ardhi/Udongo"
  },
  {
    "english": "Land/Soil Preparation",
    "swahili": "Maandalizi ya Ardhi/Udongo"
  },
  {
    "english": "Profile Authentication",
    "swahili": "Uthibitishaji wa Wasifu"
  },
  {
    "english": "Profile Authentication",
    "swahili": "Uthibitishaji wa Wasifu"
  },
  {
    "english": "Post harvest handling",
    "swahili": "Utunzaji wa baada ya mavuno"
  },
  {
    "english": "Weed infestation",
    "swahili": "Uvamizi wa magugu"
  },
  {
    "english": "Targeted/precision fertilizer application (1 point)",
    "swahili": "Uwekaji mbolea uliolengwa/usahihi (pointi 1)"
  },
  {
    "english": "Plough placement",
    "swahili": "Uwekaji wa jembe"
  },
  {
    "english": "Production ",
    "swahili": "Uzalishaji"
  },
  {
    "english": "Buying Station Production",
    "swahili": "Uzalishaji wa Kituo cha Kununua"
  },
  {
    "english": "weight",
    "swahili": "uzito"
  },
  {
    "english": "Weight",
    "swahili": "Uzito"
  },
  {
    "english": "Weight-Area",
    "swahili": "Uzito-Eneo"
  },
  {
    "english": "variegated cricket (Zonocerus variegatus)",
    "swahili": "kriketi ya variegated (Zonocerus variegatus)"
  },
  {
    "english": "equipment",
    "swahili": "vifaa"
  },
  {
    "english": "My Equipment",
    "swahili": "Vifaa Vyangu"
  },
  {
    "english": "My Equipment",
    "swahili": "Vifaa Vyangu"
  },
  {
    "english": "Activation Keys",
    "swahili": "Vifunguo vya Uwezeshaji"
  },
  {
    "english": "Activation Keys",
    "swahili": "Vifunguo vya Uwezeshaji"
  },
  {
    "english": "Activation Keys Unassigned",
    "swahili": "Vifunguo vya Amilisho Havijakabidhiwa"
  },
  {
    "english": "Keys Activated ",
    "swahili": "Vifunguo Vimewashwa"
  },
  {
    "english": "Remaining Activation Keys",
    "swahili": "Vifunguo Vilivyobaki vya Uamilisho"
  },
  {
    "english": "Activation Keys Assigned ",
    "swahili": "Vifunguo vya Amilisho Vimekabidhiwa"
  },
  {
    "english": "Generated Activation Keys ",
    "swahili": "Funguo za Uanzishaji Zilizozalishwa"
  },
  {
    "english": "Pending and Used Keys",
    "swahili": "Vifunguo Vinavyosubiri na Vilivyotumika"
  },
  {
    "english": "Activation keyss assigned succesfully",
    "swahili": "Vitufe vya kuwezesha vimekabidhiwa"
  },
  {
    "english": "Streams",
    "swahili": "Mitiririko"
  },
  {
    "english": "Inhibitors",
    "swahili": "Vizuizi"
  },
  {
    "english": "cuttings",
    "swahili": "vipandikizi"
  },
  {
    "english": "vine cuttings",
    "swahili": "vipandikizi vya mzabibu"
  },
  {
    "english": "virus",
    "swahili": "virusi"
  },
  {
    "english": "micronutrient",
    "swahili": "micronutrient"
  },
  {
    "english": "yield",
    "swahili": "mavuno"
  },
  {
    "english": "Drag and drop or",
    "swahili": "Buruta na uangushe au"
  },
  {
    "english": "vvhhhf",
    "swahili": "vvhhf"
  },
  {
    "english": "Metal containers",
    "swahili": "Vyombo vya chuma"
  },
  {
    "english": "Medium",
    "swahili": "Kati"
  },
  {
    "english": "perennial",
    "swahili": "kudumu"
  },
  {
    "english": "Pests",
    "swahili": "Wadudu"
  },
  {
    "english": "Time",
    "swahili": "Wakati"
  },
  {
    "english": "Time",
    "swahili": "Wakati"
  },
  {
    "english": "When i can afford it",
    "swahili": "Wakati ninaweza kumudu"
  },
  {
    "english": "Submit",
    "swahili": "Wasilisha"
  },
  {
    "english": "Users",
    "swahili": "Watumiaji"
  },
  {
    "english": "Registered Users",
    "swahili": "Watumiaji Waliosajiliwa"
  },
  {
    "english": "Deactivated Users ",
    "swahili": "Watumiaji Waliozimwa"
  },
  {
    "english": "Active Users",
    "swahili": "Watumiaji Hai"
  },
  {
    "english": "Multiple Users",
    "swahili": "Watumiaji Nyingi"
  },
  {
    "english": "Users",
    "swahili": "Watumiaji"
  },
  {
    "english": "Users per page",
    "swahili": "Watumiaji kwa kila ukurasa"
  },
  {
    "english": "App Users",
    "swahili": "Watumiaji wa Programu"
  },
  {
    "english": "Admin Users",
    "swahili": "Watumiaji wa Usimamizi"
  },
  {
    "english": "Fruit harvesting net with blade",
    "swahili": "Wavu wa kuvuna matunda kwa blade"
  },
  {
    "english": "Mark as Read",
    "swahili": "Weka alama kama Imesomwa"
  },
  {
    "english": "UPLOAD ASSIGNED DATA CSV",
    "swahili": "PAKIA CSV YA DATA ILIYOGAIWA"
  },
  {
    "english": "Download",
    "swahili": "Pakua"
  },
  {
    "english": "Download as CSV",
    "swahili": "Pakua kama CSV"
  },
  {
    "english": "Download as PDF",
    "swahili": "Pakua kama PDF"
  },
  {
    "english": "Upload Images/Videos",
    "swahili": "Pakia Picha/Video"
  },
  {
    "english": "Week/s",
    "swahili": "Wiki/s"
  },
  {
    "english": "Weeks",
    "swahili": "Wiki"
  },
  {
    "english": "Straight",
    "swahili": "Moja kwa moja"
  },
  {
    "english": "of",
    "swahili": "ya"
  },
  {
    "english": "Ethiopian Yirgacheffe",
    "swahili": "Yirgacheffe wa Ethiopia"
  },
  {
    "english": "More than 1 year ",
    "swahili": "Zaidi ya mwaka 1"
  },
  {
    "english": "Olive (Lybia)",
    "swahili": "Olive (Lybia)"
  },
  {
    "english": "crop",
    "swahili": "mazao"
  },
  {
    "english": "Lakes",
    "swahili": "Maziwa"
  },
  {
    "english": "All",
    "swahili": "Wote"
  },
  {
    "english": "All",
    "swahili": "Wote"
  },
  {
    "english": "Gram",
    "swahili": "Gramu"
  },
  {
    "english": "Kilogram",
    "swahili": "Kilo"
  },
  {
    "english": "Pound",
    "swahili": "Pauni"
  },
  {
    "english": "Centimeter",
    "swahili": "Sentimita"
  },
  {
    "english": "Meter",
    "swahili": "Mita"
  },
  {
    "english": "Liter-Per-Hectar",
    "swahili": "Lita-Kwa-Hekta"
  },
  {
    "english": "Milliliters per Square Meter",
    "swahili": "Mililita kwa mita ya mraba"
  },
  {
    "english": "Kilogram per Acre",
    "swahili": "Kilo kwa Ekari"
  },
  {
    "english": "Kilogram per Hectare",
    "swahili": "Kilo kwa Hekta"
  },
  {
    "english": "Tonnes per Hectare",
    "swahili": "Tani kwa Hekta"
  },
  {
    "english": "Bushels per Hectare",
    "swahili": "Vichaka kwa Hekta"
  },
  {
    "english": "Bushels per Acre",
    "swahili": "Vichaka kwa Ekari"
  },
  {
    "english": "Bags per Hectare",
    "swahili": "Mifuko kwa Hekta"
  },
  {
    "english": "Bags per Acre",
    "swahili": "Mifuko kwa Ekari"
  },
  {
    "english": "Tonnes per Acre",
    "swahili": "Tani kwa Ekari"
  },
  {
    "english": "Kilogram/Tree",
    "swahili": "Kilo/Mti"
  },
  {
    "english": "Acre",
    "swahili": "Ekari"
  },
  {
    "english": "Hectares",
    "swahili": "Hekta"
  },
  {
    "english": "Millimetres",
    "swahili": "Milimita"
  },
  {
    "english": "Centimeter",
    "swahili": "Sentimita"
  },
  {
    "english": "Meter",
    "swahili": "Mita"
  },
  {
    "english": "Acre",
    "swahili": "Ekari"
  },
  {
    "english": "Hectare",
    "swahili": "Hekta"
  },
  {
    "english": "Millileter",
    "swahili": "Millileter"
  },
  {
    "english": "Liter",
    "swahili": "Lita"
  },
  {
    "english": "Acre",
    "swahili": "Ekari"
  },
  {
    "english": "Hectare",
    "swahili": "Hekta"
  },
  {
    "english": "Kg",
    "swahili": "Kilo"
  },
  {
    "english": "Tonnes",
    "swahili": "Tani"
  },
  {
    "english": "Kilogram per Acre",
    "swahili": "Kilo kwa Ekari"
  },
  {
    "english": "Kilogram per Hectare",
    "swahili": "Kilo kwa Hekta"
  },
  {
    "english": "Tonnes per Acre",
    "swahili": "Tani kwa Ekari"
  },
  {
    "english": "Tonnes per Hectare",
    "swahili": "Tani kwa Hekta"
  },
  {
    "english": "Litres/hectare",
    "swahili": "Lita/hekta"
  },
  {
    "english": "Ounces/hectare",
    "swahili": "Wanzi/hekta"
  },
  {
    "english": "mg/hectare",
    "swahili": "mg/hekta"
  },
  {
    "english": "g/hectare",
    "swahili": "g/hekta"
  },
  {
    "english": "kg/hectare",
    "swahili": "kg/hekta"
  },
  {
    "english": "Litres",
    "swahili": "Lita"
  },
  {
    "english": "Ounces",
    "swahili": "Onzi"
  },
  {
    "english": "mg",
    "swahili": "mg"
  },
  {
    "english": "kg",
    "swahili": "kilo"
  },
  {
    "english": "g",
    "swahili": "g"
  },
  {
    "english": "Gallons/acre",
    "swahili": "Galoni/ekari"
  },
  {
    "english": "Gallons/hectare",
    "swahili": "Galoni/hekta"
  },
  {
    "english": "Liters/hectare",
    "swahili": "Lita/hekta"
  },
  {
    "english": "Liters/acre",
    "swahili": "Lita/ekari"
  },
  {
    "english": "Centimeter",
    "swahili": "Sentimita"
  },
  {
    "english": "Meter",
    "swahili": "Mita"
  },
  {
    "english": "kg/ha",
    "swahili": "kg/ha"
  },
  {
    "english": "ppm",
    "swahili": "ppm"
  },
  {
    "english": "mg/l",
    "swahili": "mg/l"
  },
  {
    "english": "Kg per hectare",
    "swahili": "Kg kwa hekta"
  },
  {
    "english": "Kg per acre",
    "swahili": "Kg kwa ekari"
  },
  {
    "english": "Tonne per hectare",
    "swahili": "Tani kwa hekta"
  },
  {
    "english": "Tonne per acre",
    "swahili": "Tani kwa ekari"
  },
  {
    "english": "Pounds",
    "swahili": "Pauni"
  },
  {
    "english": "Grams",
    "swahili": "Gramu"
  },
  {
    "english": "Kilograms",
    "swahili": "Kilo"
  },
  {
    "english": "Tonnes",
    "swahili": "Tani"
  },
  {
    "english": "Tonne per acre",
    "swahili": "Tani kwa ekari"
  },
  {
    "english": "Kg per hectare",
    "swahili": "Kg kwa hekta"
  },
  {
    "english": "Kg per acre",
    "swahili": "Kg kwa ekari"
  },
  {
    "english": "Tonne per hectare",
    "swahili": "Tani kwa hekta"
  },
  {
    "english": "Kilograms",
    "swahili": "Kilo"
  },
  {
    "english": "Tonnes",
    "swahili": "Tani"
  },
  {
    "english": "Pounds",
    "swahili": "Pauni"
  },
  {
    "english": "Tonne per hectare",
    "swahili": "Tani kwa hekta"
  },
  {
    "english": "Tonne per acre",
    "swahili": "Tani kwa ekari"
  },
  {
    "english": "Kg per acre",
    "swahili": "Kg kwa ekari"
  },
  {
    "english": "Kg per hectare",
    "swahili": "Kg kwa hekta"
  },
  {
    "english": "Kilograms",
    "swahili": "Kilo"
  },
  {
    "english": "Tonnes",
    "swahili": "Tani"
  },
  {
    "english": "Pounds",
    "swahili": "Pauni"
  },
  {
    "english": "kg/ha",
    "swahili": "kg/ha"
  },
  {
    "english": "ppm",
    "swahili": "ppm"
  },
  {
    "english": "mg/l",
    "swahili": "mg/l"
  },
  {
    "english": "kg/ml",
    "swahili": "kg/ml"
  },
  {
    "english": "g/ml",
    "swahili": "g/ml"
  },
  {
    "english": "kg/ha",
    "swahili": "kg/ha"
  },
  {
    "english": "ppm",
    "swahili": "ppm"
  },
  {
    "english": "mg/l",
    "swahili": "mg/l"
  },
  {
    "english": "mg/l",
    "swahili": "mg/l"
  },
  {
    "english": "kg/ha",
    "swahili": "kg/ha"
  },
  {
    "english": "ppm",
    "swahili": "ppm"
  },
  {
    "english": "Pounds",
    "swahili": "Pauni"
  },
  {
    "english": "Kilograms",
    "swahili": "Kilo"
  },
  {
    "english": "Tonnes",
    "swahili": "Tani"
  },
  {
    "english": "Milligrams (N)/Liter",
    "swahili": "Miligramu (N)/Lita"
  },
  {
    "english": "Kg (N)/hectare",
    "swahili": "Kg (N)/hekta"
  },
  {
    "english": "parts (N)/million",
    "swahili": "sehemu (N)/milioni"
  },
  {
    "english": "Milligrams (P2O5)/Liter",
    "swahili": "Mililita (P2O5)/Lita"
  },
  {
    "english": "Kg (P2O5)/hectare",
    "swahili": "Kg (P2O5)/hekta"
  },
  {
    "english": "parts (P2O5)/million",
    "swahili": "sehemu (P2O5)/milioni"
  },
  {
    "english": "Milligrams (K20)/Liter",
    "swahili": "Miligramu (K20)/Lita"
  },
  {
    "english": "Kg (K20)/hectare",
    "swahili": "Kg (K20)/hekta"
  },
  {
    "english": "parts (K20)/million",
    "swahili": "sehemu (K20)/milioni"
  },
  {
    "english": "kg per centimetre cube",
    "swahili": "kilo kwa mchemraba wa sentimita"
  },
  {
    "english": "kg/cm3",
    "swahili": "kilo/cm3"
  },
  {
    "english": "gr/m3",
    "swahili": "gr/m3"
  },
  {
    "english": "Increasing The Yields",
    "swahili": "Kuongeza Mavuno"
  },
  {
    "english": "Optimize The Use Of Synthetic Fertilizers",
    "swahili": "Boresha Utumiaji wa Mbolea za Synthetic"
  },
  {
    "english": "Cattura Cultivars (mutasi Bourbon; originated in Brazil)",
    "swahili": "Mimea ya Cattura (mutasi Bourbon; asili yake ni Brazili)"
  },
  {
    "english": "Acaia",
    "swahili": "Acaia"
  },
  {
    "english": "Agata",
    "swahili": "Agata"
  },
  {
    "english": "Arabigo",
    "swahili": "Arabigo"
  },
  {
    "english": "Arusha",
    "swahili": "Arusha"
  },
  {
    "english": "Batian",
    "swahili": "Batian"
  },
  {
    "english": "Bernardina",
    "swahili": "Bernardina"
  },
  {
    "english": "Blawan Paumah",
    "swahili": "Blawan Paumah"
  },
  {
    "english": "Blue Mountain",
    "swahili": "Mlima wa Bluu"
  },
  {
    "english": "Bonifieur",
    "swahili": "Bonifieur"
  },
  {
    "english": "Caturra",
    "swahili": "Caturra"
  },
  {
    "english": "Cauvery",
    "swahili": "Cauvery"
  },
  {
    "english": "Cera",
    "swahili": "Cera"
  },
  {
    "english": "Chandragiri",
    "swahili": "Chandragiri"
  },
  {
    "english": "Coorgs",
    "swahili": "Coorgs"
  },
  {
    "english": "Emerald",
    "swahili": "Zamaradi"
  },
  {
    "english": "French Mission",
    "swahili": "Misheni ya Ufaransa"
  },
  {
    "english": "Gesha",
    "swahili": "Gesha"
  },
  {
    "english": "Guatemala",
    "swahili": "Guatemala"
  },
  {
    "english": "Harrar",
    "swahili": "Harrar"
  },
  {
    "english": "Harrar",
    "swahili": "Harrar"
  },
  {
    "english": "Jackson",
    "swahili": "Jackson"
  },
  {
    "english": "Jackson 2/1257",
    "swahili": "Jackson 2/1257"
  },
  {
    "english": "K7",
    "swahili": "K7"
  },
  {
    "english": "Kent",
    "swahili": "Kent"
  },
  {
    "english": "Kona",
    "swahili": "Kona"
  },
  {
    "english": "Laurina",
    "swahili": "Laurina"
  },
  {
    "english": "Lekempti",
    "swahili": "Lekempti"
  },
  {
    "english": "Maracaturra",
    "swahili": "Maracaturra"
  },
  {
    "english": "Maragogipe",
    "swahili": "Maragogipe"
  },
  {
    "english": "maragogype",
    "swahili": "maragogype"
  },
  {
    "english": "Mayaguez",
    "swahili": "Mayaguez"
  },
  {
    "english": "Mibirizi",
    "swahili": "Mibirizi"
  },
  {
    "english": "Mocha/Mokka",
    "swahili": "Mocha/Mokka"
  },
  {
    "english": "Mundo Novo",
    "swahili": "Mundo Novo"
  },
  {
    "english": "Old Chiks",
    "swahili": "Mzee Chiks"
  },
  {
    "english": "Onix",
    "swahili": "Onix"
  },
  {
    "english": "Orange Bourbon",
    "swahili": "Bourbon ya machungwa"
  },
  {
    "english": "Pacamara",
    "swahili": "Pacamara"
  },
  {
    "english": "Pacas",
    "swahili": "Paka"
  },
  {
    "english": "Pache",
    "swahili": "Pache"
  },
  {
    "english": "Pache Colis",
    "swahili": "Pache Colis"
  },
  {
    "english": "Pache Comum",
    "swahili": "Pache Comum"
  },
  {
    "english": "Pink Bourbon",
    "swahili": "Bourbon ya Pink"
  },
  {
    "english": "Red Bourbon",
    "swahili": "Bourbon nyekundu"
  },
  {
    "english": "Rosa Morena",
    "swahili": "Rosa Morena"
  },
  {
    "english": "Rubi",
    "swahili": "Rubi"
  },
  {
    "english": "Ruiru 11",
    "swahili": "Ruiru 11"
  },
  {
    "english": "Safira",
    "swahili": "Safira"
  },
  {
    "english": "Sagada",
    "swahili": "Sagada"
  },
  {
    "english": "San Bernardo Aka Pache",
    "swahili": "San Bernardo Aka Pache"
  },
  {
    "english": "San Ramon",
    "swahili": "San Ramon"
  },
  {
    "english": "Santos",
    "swahili": "Santos"
  },
  {
    "english": "Selection 9",
    "swahili": "Uteuzi 9"
  },
  {
    "english": "Sidamo",
    "swahili": "Sidamo"
  },
  {
    "english": "Sl28",
    "swahili": "Sl28"
  },
  {
    "english": "Sl34",
    "swahili": "Sl34"
  },
  {
    "english": "Sulawesi",
    "swahili": "Sulawesi"
  },
  {
    "english": "Sumatra",
    "swahili": "Sumatra"
  },
  {
    "english": "Tekisic",
    "swahili": "Tekisic"
  },
  {
    "english": "Topazio",
    "swahili": "Topazio"
  },
  {
    "english": "Toraja",
    "swahili": "Toraja"
  },
  {
    "english": "Turmalina",
    "swahili": "Turmalina"
  },
  {
    "english": "Turquesa",
    "swahili": "Turquesa"
  },
  {
    "english": "Typica",
    "swahili": "Aina"
  },
  {
    "english": "Venecia",
    "swahili": "Venecia"
  },
  {
    "english": "Villa Sarchi",
    "swahili": "Villa Sarchi"
  },
  {
    "english": "Yellow Bourbon",
    "swahili": "Bourbon ya Njano"
  },
  {
    "english": "Erecta",
    "swahili": "Erecta"
  },
  {
    "english": "Icatu",
    "swahili": "Icatu"
  },
  {
    "english": "Nemaya",
    "swahili": "Nemaya"
  },
  {
    "english": "Nganda",
    "swahili": "Nganda"
  },
  {
    "english": "Pandi",
    "swahili": "Pandi"
  },
  {
    "english": "Pawi",
    "swahili": "Pawi"
  },
  {
    "english": "Rakimin",
    "swahili": "Rakimin"
  },
  {
    "english": "TR4",
    "swahili": "TR4"
  },
  {
    "english": "TR5",
    "swahili": "TR5"
  },
  {
    "english": "TR6",
    "swahili": "TR6"
  },
  {
    "english": "TR7",
    "swahili": "TR7"
  },
  {
    "english": "TR8",
    "swahili": "TR8"
  },
  {
    "english": "SA237",
    "swahili": "SA237"
  },
  {
    "english": "Wayanaad",
    "swahili": "Wayanaad"
  },
  {
    "english": "Exelsa",
    "swahili": "Exelsa"
  },
  {
    "english": "Liberica",
    "swahili": "Liberia"
  },
  {
    "english": "Arabusta",
    "swahili": "Arabusta"
  },
  {
    "english": "Arla",
    "swahili": "Arla"
  },
  {
    "english": "Batian",
    "swahili": "Batian"
  },
  {
    "english": "Bogor Prada",
    "swahili": "Bogor Prada"
  },
  {
    "english": "Casiopea",
    "swahili": "Kasiopea"
  },
  {
    "english": "Castillo",
    "swahili": "Castillo"
  },
  {
    "english": "Castillo El Rosario",
    "swahili": "Castillo El Rosario"
  },
  {
    "english": "Castillo El Tambo",
    "swahili": "Castillo El Tambo"
  },
  {
    "english": "Castillo La Trinidad",
    "swahili": "Castillo La Trinidad"
  },
  {
    "english": "Castillo Naranjal",
    "swahili": "Castillo Naranjal"
  },
  {
    "english": "Castillo Paraguaicito",
    "swahili": "Castillo Paraguaicito"
  },
  {
    "english": "Castillo Santa Barbara",
    "swahili": "Castillo Santa Barbara"
  },
  {
    "english": "Catigua",
    "swahili": "Catigua"
  },
  {
    "english": "Catimor",
    "swahili": "Catimor"
  },
  {
    "english": "Catrenic",
    "swahili": "Catrenic"
  },
  {
    "english": "Centroamericano",
    "swahili": "Centroamericano"
  },
  {
    "english": "Colombia",
    "swahili": "Kolombia"
  },
  {
    "english": "Devamachy",
    "swahili": "Devamachy"
  },
  {
    "english": "Evaluna",
    "swahili": "Evaluna"
  },
  {
    "english": "Fronton",
    "swahili": "Fronton"
  },
  {
    "english": "Java",
    "swahili": "Java"
  },
  {
    "english": "Limani",
    "swahili": "Limani"
  },
  {
    "english": "Maracatu",
    "swahili": "Maracatu"
  },
  {
    "english": "Marsellesa",
    "swahili": "Marsellesa"
  },
  {
    "english": "Milenio",
    "swahili": "Milenio"
  },
  {
    "english": "Mundo Maya",
    "swahili": "Mundo Maya"
  },
  {
    "english": "Nayarita",
    "swahili": "Nayarita"
  },
  {
    "english": "Nemaya",
    "swahili": "Nemaya"
  },
  {
    "english": "Obata",
    "swahili": "Obata"
  },
  {
    "english": "Oro Azteca",
    "swahili": "Oro Azteca"
  },
  {
    "english": "Parainema",
    "swahili": "Parainema"
  },
  {
    "english": "Paraiso",
    "swahili": "Paraiso"
  },
  {
    "english": "Rasuna",
    "swahili": "Rasuna"
  },
  {
    "english": "Sarchimor",
    "swahili": "Sarchimor"
  },
  {
    "english": "Starmaya",
    "swahili": "Starmaya"
  },
  {
    "english": "Tabi",
    "swahili": "Tabi"
  },
  {
    "english": "Timor",
    "swahili": "Timor"
  },
  {
    "english": "Tupi",
    "swahili": "Tupi"
  },
  {
    "english": "Variedad Colombia",
    "swahili": "Variedad Colombia"
  },
  {
    "english": "Pacamara",
    "swahili": "Pacamara"
  },
  {
    "english": "Typica",
    "swahili": "Aina"
  },
  {
    "english": "Liberica",
    "swahili": "Liberia"
  },
  {
    "english": "Robusta",
    "swahili": "Robusta"
  },
  {
    "english": "Arabica",
    "swahili": "Kiarabu"
  },
  {
    "english": "Gamal (Gliricidia sepium)",
    "swahili": "Gamal (Gliricidia sepium)"
  },
  {
    "english": "Sengon laut (Albizzia falcata)",
    "swahili": "Sengon laut (Albizzia falcata)"
  },
  {
    "english": "Lamtoro (Leucaena glauca)",
    "swahili": "Lamtoro (Leucaena glauca)"
  },
  {
    "english": "Gamal (Gliricidia sepium)",
    "swahili": "Gamal (Gliricidia sepium)"
  },
  {
    "english": "Alpukat (Persea americana)",
    "swahili": "Alpukat (Persea americana)"
  },
  {
    "english": "Pinus (hard pines)",
    "swahili": "Pinus (misonobari migumu)"
  },
  {
    "english": "Wind Breaker Tree 1",
    "swahili": "Mti wa Kuvunja Upepo 1"
  },
  {
    "english": "Kayumanis",
    "swahili": "Kayumanis"
  },
  {
    "english": "Karet",
    "swahili": "Karet"
  },
  {
    "english": "Kelapa",
    "swahili": "Kelapa"
  },
  {
    "english": "Damar",
    "swahili": "Damar"
  },
  {
    "english": "Belimbing",
    "swahili": "Kubeza"
  },
  {
    "english": "SynthenticFertilizerNitrogenUnit",
    "swahili": "SynthenticFertilizerNitrogenUnit"
  },
  {
    "english": "SynthenticFertilizerPhosphorousUnit",
    "swahili": "SynthenticFertilizerPhosphorousUnit"
  },
  {
    "english": "SynthenticFertilizerPotassiumUnit",
    "swahili": "SynthenticFertilizerPotassiumUnit"
  },
  {
    "english": "CoffeeParchmentDensityUnit",
    "swahili": "CoffeeParchmentDensityUnit"
  },
  {
    "english": "Density",
    "swahili": "Msongamano"
  },
  {
    "english": "Ramsai",
    "swahili": "Ramsai"
  },
  {
    "english": "Golsai",
    "swahili": "Golsai"
  },
  {
    "english": "Chibesai",
    "swahili": "Chibesai"
  },
  {
    "english": "Saune",
    "swahili": "Saune"
  },
  {
    "english": "Bharlange",
    "swahili": "Bharlange"
  },
  {
    "english": "Jirmale",
    "swahili": "Jirmale"
  },
  {
    "english": "Dambersi",
    "swahili": "Dambersi"
  },
  {
    "english": "Ramala",
    "swahili": "Ramala"
  },
  {
    "english": "TV 23",
    "swahili": "TV 23"
  },
  {
    "english": "UPASI 9  (Arthrey)",
    "swahili": "UPASI 9 (Arthrey)"
  },
  {
    "english": "UPASI 1 (Ever green)",
    "swahili": "UPASI 1 (kijani kibichi kila wakati)"
  },
  {
    "english": "UPASI 10 (Pandian)",
    "swahili": "UPASI 10 (Pandian)"
  },
  {
    "english": "UPASI 14 (Singara)",
    "swahili": "UPASI 14 (Singara)"
  },
  {
    "english": "UPASI 2 (Jayaram)",
    "swahili": "UPASI 2 (Jayaram)"
  },
  {
    "english": "UPASI 17 (Swarna)",
    "swahili": "UPASI 17 (Swarna)"
  },
  {
    "english": "Masuli",
    "swahili": "Masuli"
  },
  {
    "english": "Khumal 4",
    "swahili": "Khumal 4"
  },
  {
    "english": "Ram",
    "swahili": "Ram"
  },
  {
    "english": "Khumal 8",
    "swahili": "Khumal 8"
  },
  {
    "english": "Chhommrong",
    "swahili": "Chhommrong"
  },
  {
    "english": "Lekali Dhan 3",
    "swahili": "Lekali Dhan 3"
  },
  {
    "english": "Radha 4",
    "swahili": "Radha 4"
  },
  {
    "english": "Janaki",
    "swahili": "Janaki"
  },
  {
    "english": "Judi",
    "swahili": "Judi"
  },
  {
    "english": "Sarju 52",
    "swahili": "Sura ya 52"
  },
  {
    "english": "Kufri jyoti",
    "swahili": "Kufri jyoti"
  },
  {
    "english": "Kufri sindhuri",
    "swahili": "Kufri sindhuri"
  },
  {
    "english": "Khumal Upahar",
    "swahili": "Khumal Upahar"
  },
  {
    "english": "Jankdev",
    "swahili": "Jankdev"
  },
  {
    "english": "Khumal Seto-1",
    "swahili": "Khumal Seto-1"
  },
  {
    "english": "Khumal Bikas",
    "swahili": "Khumal Bikas"
  },
  {
    "english": "Birendra sagar",
    "swahili": "Birendra sagar"
  },
  {
    "english": "Palpa",
    "swahili": "Palpa"
  },
  {
    "english": "Dhankuta ",
    "swahili": "Dhankuta"
  },
  {
    "english": "Taplejung ",
    "swahili": "Taplejung"
  },
  {
    "english": "Diktel ",
    "swahili": "Diktel"
  },
  {
    "english": "Basrai dwarf",
    "swahili": "Basrai kibete"
  },
  {
    "english": "dwarf cavendish",
    "swahili": "kibete cavendish"
  },
  {
    "english": "Robusta",
    "swahili": "Robusta"
  },
  {
    "english": "william hybrid",
    "swahili": "William mseto"
  },
  {
    "english": "malbhog",
    "swahili": "malbhog"
  },
  {
    "english": "dhusre",
    "swahili": "dhusre"
  },
  {
    "english": "mungre",
    "swahili": "mungre"
  },
  {
    "english": "marche",
    "swahili": "maandamano"
  },
  {
    "english": "dhose",
    "swahili": "dhose"
  },
  {
    "english": "hazari",
    "swahili": "hazari"
  },
  {
    "english": "Kathmandu local",
    "swahili": "Kathmandu mtaa"
  },
  {
    "english": "Pahilo Surjo",
    "swahili": "Pahilo Surjo"
  },
  {
    "english": "SS-72 (Super Shakti 72)",
    "swahili": "SS-72 (Super Shakti 72)"
  },
  {
    "english": "KFSH-1 (Kanchan F1)",
    "swahili": "KFSH-1 (Kanchan F1)"
  },
  {
    "english": "Poshilo makai jawa",
    "swahili": "Poshilo makai jawa"
  },
  {
    "english": "Srijan-1",
    "swahili": "Srijan-1"
  },
  {
    "english": "Srijan-2",
    "swahili": "Srijan-2"
  },
  {
    "english": "Srijan-3",
    "swahili": "Srijan-3"
  },
  {
    "english": "Srijan-4",
    "swahili": "Srijan-4"
  },
  {
    "english": "Madhuri",
    "swahili": "Madhuri"
  },
  {
    "english": "Kalyan ",
    "swahili": "Kalyan"
  },
  {
    "english": "Pratiksha ",
    "swahili": "Pratiksha"
  },
  {
    "english": "Pratigya",
    "swahili": "Pratigya"
  },
  {
    "english": "Zinc Gahun 2",
    "swahili": "Zinki Gahun 2"
  },
  {
    "english": "Bheri-Ganga",
    "swahili": "Bheri-Ganga"
  },
  {
    "english": "Himganga",
    "swahili": "Himganga"
  },
  {
    "english": "Khumal-Shakti",
    "swahili": "Khumal-Shakti"
  },
  {
    "english": "Borlaug 2020",
    "swahili": "Borlaug 2020"
  },
  {
    "english": "Pusa Ruby",
    "swahili": "Pusa Ruby"
  },
  {
    "english": "Arka Abha:",
    "swahili": "Arka Abha:"
  },
  {
    "english": "Srijana",
    "swahili": "Srijana"
  },
  {
    "english": "Roma VF",
    "swahili": "Roma VF"
  },
  {
    "english": "Nepali Oxheart",
    "swahili": "Moyo wa Oxe wa Kinepali"
  },
  {
    "english": "Lisbon",
    "swahili": "Lizaboni"
  },
  {
    "english": "Nepali Round",
    "swahili": "Mzunguko wa Kinepali"
  },
  {
    "english": "Nibuwa",
    "swahili": "Nibuwa"
  },
  {
    "english": "Eureka",
    "swahili": "Eureka"
  },
  {
    "english": "Citron",
    "swahili": "Citron"
  },
  {
    "english": "Jhambiri (rough lemon)",
    "swahili": "Jhambiri (ndimu mbaya)"
  },
  {
    "english": "Nepali oblong",
    "swahili": "Mviringo wa Kinepali"
  },
  {
    "english": "Typica (Bergandal, Sidikalang - Sumatera).",
    "swahili": "Typica (Bergandal, Sidikalang - Sumatera)."
  },
  {
    "english": "Hibrido de Timor (HDT, Cross breed Arabica-Robusta; Tim-tim, Aceh)",
    "swahili": "Hibrido de Timor (HDT, aina ya Cross Arabica-Robusta; Tim-tim, Aceh)"
  },
  {
    "english": "Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)",
    "swahili": "Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)"
  },
  {
    "english": "Ethiopian lines (Rambung Abyssina, USDA)",
    "swahili": "Laini za Ethiopia (Rambung Abyssina, USDA)"
  },
  {
    "english": "Mundo Nova (Silang Typica-Bourbon, from Brazil)",
    "swahili": "Mundo Nova (Silang Typica-Bourbon, kutoka Brazili)"
  },
  {
    "english": "Catimor Lines (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - mix breed arabica-robusta).",
    "swahili": "Catimor Lines (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - changanya aina ya arabica-robusta)."
  },
  {
    "english": "Amarello De Botucatu",
    "swahili": "Amarello De Botucatu"
  },
  {
    "english": "Benguet",
    "swahili": "Benguet"
  },
  {
    "english": "Bergendal",
    "swahili": "Bergendal"
  },
  {
    "english": "Bergundal Aka Garundang",
    "swahili": "Bergumal Aka Garundang"
  },
  {
    "english": "Bmj",
    "swahili": "Bmj"
  },
  {
    "english": "Boubon Mayaguez 71",
    "swahili": "Boubon Mayaguez 71"
  },
  {
    "english": "Bourbon",
    "swahili": "Bourbon"
  },
  {
    "english": "Bourbon Chocolá",
    "swahili": "Chokoleti ya Bourboná"
  },
  {
    "english": "Bourbon Mayaguez 139",
    "swahili": "Bourbon Mayaguez 139"
  },
  {
    "english": "Bourbon Mayaguez 71",
    "swahili": "Bourbon Mayaguez 71"
  },
  {
    "english": "catuai",
    "swahili": "katuai"
  },
  {
    "english": "Chickumalgur",
    "swahili": "Chickumalgur"
  },
  {
    "english": "Criollo",
    "swahili": "Criollo"
  },
  {
    "english": "Culi Arabica",
    "swahili": "Culi Arabica"
  },
  {
    "english": "Djimma",
    "swahili": "Djimma"
  },
  {
    "english": "IAPAR59",
    "swahili": "IAPAR59"
  },
  {
    "english": "Ibairi",
    "swahili": "Ibairi"
  },
  {
    "english": "Jember/S795",
    "swahili": "Jember/S795"
  },
  {
    "english": "K20",
    "swahili": "K20"
  },
  {
    "english": "Kalossi",
    "swahili": "Kalosi"
  },
  {
    "english": "Kp423",
    "swahili": "Kp423"
  },
  {
    "english": "Lintong",
    "swahili": "Lintong"
  },
  {
    "english": "Nyasaland",
    "swahili": "Nyasaland"
  },
  {
    "english": "Ouro Bronze",
    "swahili": "Ouro Bronze"
  },
  {
    "english": "Ouro Verde",
    "swahili": "Ouro Verde"
  },
  {
    "english": "Pluma Hidalgo",
    "swahili": "Pluma Hidalgo"
  },
  {
    "english": "Pop3303/21",
    "swahili": "Pop3303/21"
  },
  {
    "english": "semperflorens",
    "swahili": "semperflorens"
  },
  {
    "english": "Sidikalang",
    "swahili": "Sidikalang"
  },
  {
    "english": "Sl14",
    "swahili": "Sl14"
  },
  {
    "english": "Sumatra Lintong",
    "swahili": "Sumatra Lintong"
  },
  {
    "english": "Usda762",
    "swahili": "USD762"
  },
  {
    "english": "Villalobos",
    "swahili": "Villalobos"
  },
  {
    "english": "Walichu/ Wolisho",
    "swahili": "Walichu/ Wolisho"
  },
  {
    "english": "Yirgacheffe",
    "swahili": "Yirgacheffe"
  },
  {
    "english": "Catimor (hybrid of Caturra x Timor)",
    "swahili": "Catimor (mseto wa Caturra x Timor)"
  },
  {
    "english": "Jawa (Java Coffee, !700AD)",
    "swahili": "Jawa (Java Coffee, !700AD)"
  },
  {
    "english": "Arabusta (HDT; Hibrid of sterile CArabica and C.Robusta)",
    "swahili": "Arabusta (HDT; Hibrid of tasa CArabica na C.Robusta)"
  },
  {
    "english": "Brs 1216",
    "swahili": "Nambari ya 1216"
  },
  {
    "english": "Brs 2336",
    "swahili": "Nambari ya 2336"
  },
  {
    "english": "Brs 3210",
    "swahili": "Nambari ya 3210"
  },
  {
    "english": "Brs 3213",
    "swahili": "Nambari ya 3213"
  },
  {
    "english": "Culi Robusta",
    "swahili": "Culi Robusta"
  },
  {
    "english": "Jasli",
    "swahili": "Jasli"
  },
  {
    "english": "Kapeng Alamid",
    "swahili": "Kapeng Alamid"
  },
  {
    "english": "Kopi Luwak",
    "swahili": "Kopi Luwak"
  },
  {
    "english": "Selection 1r",
    "swahili": "Uteuzi 1r"
  },
  {
    "english": "Selection 2r",
    "swahili": "Uteuzi 2r"
  },
  {
    "english": "Selection 3r",
    "swahili": "Uteuzi 3r"
  },
  {
    "english": "Sln 270",
    "swahili": "Nambari ya 270"
  },
  {
    "english": "Sln 274",
    "swahili": "Nambari ya 274"
  },
  {
    "english": "BP42",
    "swahili": "BP42"
  },
  {
    "english": "BP234",
    "swahili": "BP234"
  },
  {
    "english": "BP288",
    "swahili": "BP288"
  },
  {
    "english": "BP358",
    "swahili": "BP358"
  },
  {
    "english": "BP409",
    "swahili": "BP409"
  },
  {
    "english": "Kape Barako",
    "swahili": "Kape Barako"
  },
  {
    "english": "Sln288",
    "swahili": "Sln288"
  },
  {
    "english": "Sln10",
    "swahili": "Sln10"
  },
  {
    "english": "Abyssinia 3",
    "swahili": "Abyssinia 3"
  },
  {
    "english": "Anacafe 14",
    "swahili": "Anacafe 14"
  },
  {
    "english": "Ateng",
    "swahili": "Ateng"
  },
  {
    "english": "Castillo Pueblo Bello",
    "swahili": "Castillo Pueblo Bello"
  },
  {
    "english": "Catiga Mg2",
    "swahili": "Catiga Mg2"
  },
  {
    "english": "Catimor 129",
    "swahili": "Catimor 129"
  },
  {
    "english": "Catimor F6.",
    "swahili": "Catimor F6."
  },
  {
    "english": "Catucai",
    "swahili": "Catucai"
  },
  {
    "english": "Costa Rica 95 Aka Cr-95",
    "swahili": "Kosta Rika 95 Aka Cr-95"
  },
  {
    "english": "Cr (Costa Rica) 95",
    "swahili": "Cr (Kosta Rika) 95"
  },
  {
    "english": "Cuscatleco",
    "swahili": "Cuscatleco"
  },
  {
    "english": "Gayo Satu",
    "swahili": "Gayo Satu"
  },
  {
    "english": "Hibrido De Timor",
    "swahili": "Hibrido De Timor"
  },
  {
    "english": "Iapar 59",
    "swahili": "Ibara ya 59"
  },
  {
    "english": "Icafe 95",
    "swahili": "Ikafe 95"
  },
  {
    "english": "IHcafe 90",
    "swahili": "IHcafe 90"
  },
  {
    "english": "Ipar 103",
    "swahili": "Ibara ya 103"
  },
  {
    "english": "Komasti",
    "swahili": "Komasti"
  },
  {
    "english": "Lempira",
    "swahili": "Lempira"
  },
  {
    "english": "obata rojo",
    "swahili": "obata rojo"
  },
  {
    "english": "RAB C15",
    "swahili": "RAB C15"
  },
  {
    "english": "Rambung",
    "swahili": "Rambung"
  },
  {
    "english": "S.12 Kaffa",
    "swahili": "S.12 Kaffa"
  },
  {
    "english": "Sigarar Utang",
    "swahili": "Sigarar Utang"
  },
  {
    "english": "T5175",
    "swahili": "T5175"
  },
  {
    "english": "T5296",
    "swahili": "T5296"
  },
  {
    "english": "T8667",
    "swahili": "T8667"
  },
  {
    "english": "Hybrid",
    "swahili": "Mseto"
  },
  {
    "english": "Bourbon",
    "swahili": "Bourbon"
  },
  {
    "english": "Dadap (Eurythrina lithosperma)",
    "swahili": "Dadap (Eurythrina lithosperma)"
  },
  {
    "english": "Gamal (Glirisidia)",
    "swahili": "Gamal (Glirisidia)"
  },
  {
    "english": "Nepal",
    "swahili": "Nepal"
  },
  {
    "english": "India",
    "swahili": "India"
  },
  {
    "english": "Holes on leaves/fruits/grain",
    "swahili": "Mashimo kwenye majani/matunda/nafaka"
  },
  {
    "english": "Rolled and curled leaves",
    "swahili": "Majani yaliyovingirishwa na yaliyopindika"
  },
  {
    "english": "Dead shoots",
    "swahili": "Shina zilizokufa"
  },
  {
    "english": "Stunted/poor growth",
    "swahili": "Ukuaji duni / duni"
  },
  {
    "english": "Distorted plants/leaves",
    "swahili": "Mimea/majani yaliyopotoka"
  },
  {
    "english": "Plant wilting",
    "swahili": "Kunyauka kwa mmea"
  },
  {
    "english": "Irregular and chewed leaves/stems",
    "swahili": "Majani/shina zisizo za kawaida na zilizotafunwa"
  },
  {
    "english": "Dying of the new leaves",
    "swahili": "Kufa kwa majani mapya"
  },
  {
    "english": "Presence of larvae",
    "swahili": "Uwepo wa mabuu"
  },
  {
    "english": "Presence of droppings",
    "swahili": "Uwepo wa kinyesi"
  },
  {
    "english": "Weak stems",
    "swahili": "Shina dhaifu"
  },
  {
    "english": "Presence of webs",
    "swahili": "Uwepo wa wavuti"
  },
  {
    "english": "Weak roots",
    "swahili": "Mizizi dhaifu"
  },
  {
    "english": "Shoot and capsule borer",
    "swahili": "Risasi na kipekecha kibonge"
  },
  {
    "english": "Aphids",
    "swahili": "Vidukari"
  },
  {
    "english": "Shoot fly",
    "swahili": "Risasi inzi"
  },
  {
    "english": "Nematodes",
    "swahili": "Nematodes"
  },
  {
    "english": "Cut worms",
    "swahili": "Kata minyoo"
  },
  {
    "english": "Thrips",
    "swahili": "Thrips"
  },
  {
    "english": "Quinoa moth",
    "swahili": "Nondo ya Quinoa"
  },
  {
    "english": "Leaf miner files",
    "swahili": "Faili za mchimbaji wa majani"
  },
  {
    "english": "Cassava Green Mite (Mononychellus tanajoa)",
    "swahili": "Mite ya Kijani cha Mihogo (Mononychellus tanajoa)"
  },
  {
    "english": "Cassava mealy bug",
    "swahili": "Mdudu wa unga wa muhogo"
  },
  {
    "english": "Whitefly (Aleurodicus dispersus)",
    "swahili": "Inzi weupe (Aleurodicus dispersus)"
  },
  {
    "english": "Variegated cricket (Zonocerus variegatus)",
    "swahili": "Kriketi ya aina mbalimbali (Zonocerus variegatus)"
  },
  {
    "english": "Onion Thrips",
    "swahili": "Vitunguu Thrips"
  },
  {
    "english": "Eriophyid mite",
    "swahili": "Eriophyid mite"
  },
  {
    "english": "Onion Maggot",
    "swahili": "Mabuu ya vitunguu"
  },
  {
    "english": "Earwig",
    "swahili": "Earwig"
  },
  {
    "english": "Tea mites and spider mites",
    "swahili": "Vidudu vya chai na sarafu za buibui"
  },
  {
    "english": "Tea Cutworms",
    "swahili": "Minyoo ya Chai"
  },
  {
    "english": "Tea Crickets",
    "swahili": "Kriketi za Chai"
  },
  {
    "english": "Tea mosquito bug",
    "swahili": "Mdudu wa mbu wa chai"
  },
  {
    "english": "Pyrilla",
    "swahili": "Pyrilla"
  },
  {
    "english": "Wooly Aphid",
    "swahili": "Aphid ya Wooly"
  },
  {
    "english": "Borer",
    "swahili": "Mpishi"
  },
  {
    "english": "White grub",
    "swahili": "Nguruwe nyeupe"
  },
  {
    "english": "Internode Borer",
    "swahili": "Internode Borer"
  },
  {
    "english": "Mealybug",
    "swahili": "Mealybug"
  },
  {
    "english": "Early shoot borer",
    "swahili": "Kipekecha risasi mapema"
  },
  {
    "english": "Corm Weevil",
    "swahili": "Corm Weevil"
  },
  {
    "english": "Pseudostem Weevil",
    "swahili": "Pseudostem Weevil"
  },
  {
    "english": "Nematode",
    "swahili": "Nematode"
  },
  {
    "english": "Stem borer",
    "swahili": "Kipekecha shina"
  },
  {
    "english": "Fall armyworm",
    "swahili": "Fall armyworm"
  },
  {
    "english": "Ear head bug",
    "swahili": "Kidudu cha kichwa cha sikio"
  },
  {
    "english": "Rice Stem borer",
    "swahili": "Kipekecha shina wa Mchele"
  },
  {
    "english": "Rice Hispa",
    "swahili": "Mchele Hispa"
  },
  {
    "english": "Leaf folder",
    "swahili": "Folda ya majani"
  },
  {
    "english": "Plant hopper",
    "swahili": "Hopper ya mmea"
  },
  {
    "english": "Stem fly",
    "swahili": "Kuruka kwa shina"
  },
  {
    "english": "Pod borer",
    "swahili": "Kipekecha ganda"
  },
  {
    "english": "White fly",
    "swahili": "Nzi mweupe"
  },
  {
    "english": "Armyworm",
    "swahili": "Mdudu wa jeshi"
  },
  {
    "english": "Bulb Mites",
    "swahili": "Utitiri wa Balbu"
  },
  {
    "english": "Red spider mite",
    "swahili": "Mite nyekundu ya buibui"
  },
  {
    "english": "Safflower aphid",
    "swahili": "Safflower aphid"
  },
  {
    "english": "Safflower gram pod borer/ capsule borer",
    "swahili": "Kipekecha ganda la gramu ya safflower/ kipekecha kapsuli"
  },
  {
    "english": "Safflower caterpillar",
    "swahili": "Kiwavi cha safflower"
  },
  {
    "english": "safflower bud fly/capsule fly",
    "swahili": "safflower bud fly/capsule fly"
  },
  {
    "english": "Cotton American boll worm",
    "swahili": "Pamba American boll minyoo"
  },
  {
    "english": "Cotton Spotted boll worm",
    "swahili": "Mdudu mwenye madoadoa ya Pamba"
  },
  {
    "english": "Cotton Pink boll worm",
    "swahili": "Cotton Pink boll worm"
  },
  {
    "english": "Cotton Jassid",
    "swahili": "Jassid ya Pamba"
  },
  {
    "english": "Coffee berry borer",
    "swahili": "Kipekecha cha kahawa"
  },
  {
    "english": "Coffee White stem borer",
    "swahili": "Kipekecha shina cheupe cha Kahawa"
  },
  {
    "english": "Coffee Shot hole borer",
    "swahili": "Kipekecha shimo cha kahawa"
  },
  {
    "english": "Coffee Red borer",
    "swahili": "Kahawa Red borer"
  },
  {
    "english": "Tomato Gram pod borer",
    "swahili": "Nyanya Gram pod borer"
  },
  {
    "english": "Tomato Leaf eating caterpillar",
    "swahili": "Tomato Leaf kula kiwavi"
  },
  {
    "english": "Tomato Whitefly",
    "swahili": "Nyanya Whitefly"
  },
  {
    "english": "Tomato Serpentine leaf miner.",
    "swahili": "Mchimbaji wa majani ya Nyanya Serpentine."
  },
  {
    "english": "European Skipper",
    "swahili": "Nahodha wa Ulaya"
  },
  {
    "english": "Cereal rust mite adults",
    "swahili": "Utitiri wa kutu wa nafaka watu wazima"
  },
  {
    "english": "Wireworms",
    "swahili": "Wireworms"
  },
  {
    "english": "Grasshopper",
    "swahili": "Panzi"
  },
  {
    "english": "Bihar hair caterpiller",
    "swahili": "Bihar nywele kiwavi"
  },
  {
    "english": "Cabbage buterfly",
    "swahili": "Kabichi kipepeo"
  },
  {
    "english": "Mustard aphid",
    "swahili": "Aphid ya haradali"
  },
  {
    "english": "Mustard sawfly",
    "swahili": "Mustard sawfly"
  },
  {
    "english": "Bean Aphids",
    "swahili": "Vidukari vya Maharage"
  },
  {
    "english": "Blister beetle",
    "swahili": "Mende ya malengelenge"
  },
  {
    "english": "Blue butterfly",
    "swahili": "Kipepeo ya bluu"
  },
  {
    "english": "Gram pod borer",
    "swahili": "Gram pod borer"
  },
  {
    "english": "Earhead bug",
    "swahili": "Mdudu wa masikio"
  },
  {
    "english": "Ear Head caterpillar",
    "swahili": "Sikio Kiwavi"
  },
  {
    "english": "Pink stem borer",
    "swahili": "Kipekecha shina wa waridi"
  },
  {
    "english": "Plant lice (Aphids)",
    "swahili": "Chawa wa mimea (Aphids)"
  },
  {
    "english": "Leaf webber or roller and capsule borer",
    "swahili": "Utando wa majani au roller na kipekecha kapsuli"
  },
  {
    "english": "Gall fly",
    "swahili": "Nyongo inaruka"
  },
  {
    "english": "Sesame leafhopper",
    "swahili": "Ufuta wa majani ya ufuta"
  },
  {
    "english": "Hawk moth",
    "swahili": "Nondo wa mwewe"
  },
  {
    "english": "Earwig: Anisolabis stali",
    "swahili": "Earwig: Anisolabis stali"
  },
  {
    "english": "Alfalfa Looper",
    "swahili": "Alfalfa Looper"
  },
  {
    "english": "Alfalfa Aphid",
    "swahili": "Alfalfa Aphid"
  },
  {
    "english": "Cutworms",
    "swahili": "Minyoo"
  },
  {
    "english": "Fruit Rust,Thrips",
    "swahili": "Kutu ya Matunda, Thrips"
  },
  {
    "english": "Slugs",
    "swahili": "Slugs"
  },
  {
    "english": "Gram caterpillar",
    "swahili": "Gramu caterpillar"
  },
  {
    "english": "Fruit fly",
    "swahili": "Kuruka kwa matunda"
  },
  {
    "english": "Leaf miner",
    "swahili": "Mchimbaji wa majani"
  },
  {
    "english": "Citrus Psyllid",
    "swahili": "Psyllid ya Citrus"
  },
  {
    "english": "Scale Insects",
    "swahili": "Wadudu wadogo"
  },
  {
    "english": "Aphids & Mealy Bugs",
    "swahili": "Aphids & Mealy Bugs"
  },
  {
    "english": "Scale Insects:",
    "swahili": "Wadudu wadogo:"
  },
  {
    "english": "Leaf Miner",
    "swahili": "Mchimbaji wa majani"
  },
  {
    "english": "Black Aphids",
    "swahili": "Vidukari Weusi"
  },
  {
    "english": "Termites",
    "swahili": "Mchwa"
  },
  {
    "english": "Olive fruit fly",
    "swahili": "Kuruka kwa matunda ya mizeituni"
  },
  {
    "english": "Olive moth",
    "swahili": "Olive nondo"
  },
  {
    "english": "Black scale",
    "swahili": "Kiwango cheusi"
  },
  {
    "english": "Mealy bugs",
    "swahili": "Wadudu wa mealy"
  },
  {
    "english": "Tea mosquitoe bugs",
    "swahili": "Wadudu wa mbu wa chai"
  },
  {
    "english": "Flatid Plant hoppers",
    "swahili": "Flatid Plant hoppers"
  },
  {
    "english": "Aphids",
    "swahili": "Vidukari"
  },
  {
    "english": "Mexican bean beetle",
    "swahili": "Mende ya maharagwe ya Mexico"
  },
  {
    "english": "Leafminers",
    "swahili": "Wachimba majani"
  },
  {
    "english": "Corn earworm",
    "swahili": "Nguruwe ya mahindi"
  },
  {
    "english": "White scale",
    "swahili": "Mizani nyeupe"
  },
  {
    "english": "Shield scale",
    "swahili": "Kiwango cha ngao"
  },
  {
    "english": "Leaf beetle",
    "swahili": "Mende ya majani"
  },
  {
    "english": "Capitulum borer",
    "swahili": "Kipekecha Capitulum"
  },
  {
    "english": "Tobacco caterpillar",
    "swahili": "Kiwavi wa tumbaku"
  },
  {
    "english": "Leaf hopper",
    "swahili": "Hopper ya majani"
  },
  {
    "english": "Sunflower beetle",
    "swahili": "Mende ya alizeti"
  },
  {
    "english": "Mealy bug",
    "swahili": "Mdudu wa mealy"
  },
  {
    "english": "Grasshopper",
    "swahili": "Panzi"
  },
  {
    "english": "Mango Hopper (Idioscopus clypealis)",
    "swahili": "Mango Hopper (Idioscopus clypealis)"
  },
  {
    "english": "Mango Mealy Bug (Drosicha mangiferae)",
    "swahili": "Mdudu wa Mango Mealy (Drosicha mangiferae)"
  },
  {
    "english": "Mango Bark Eating Caterpillar (Indarbela quadrinotata)",
    "swahili": "Kiwavi Anayekula Gome la Embe (Indarbela quadrinotata)"
  },
  {
    "english": "Mango fruit fly: Bactrocera dorsalis",
    "swahili": "Nzi wa tunda la embe: Bactrocera dorsalis"
  },
  {
    "english": "Red spider mite",
    "swahili": "Mite nyekundu ya buibui"
  },
  {
    "english": "Woolly aphids",
    "swahili": "Vidukari vya manyoya"
  },
  {
    "english": "San jose scale",
    "swahili": "San Jose wadogo"
  },
  {
    "english": "Codling moth",
    "swahili": "Codling nondo"
  },
  {
    "english": "European red mite",
    "swahili": "Mite nyekundu ya Ulaya"
  },
  {
    "english": "Placement",
    "swahili": "Uwekaji"
  },
  {
    "english": "Band Placement",
    "swahili": "Uwekaji wa bendi"
  },
  {
    "english": "Foliar Application",
    "swahili": "Maombi ya Foliar"
  },
  {
    "english": "Injection into Soil",
    "swahili": "Sindano kwenye Udongo"
  },
  {
    "english": "Ugandan shilling",
    "swahili": "shilingi ya Uganda"
  },
  {
    "english": "Indian rupee",
    "swahili": "Rupia ya India"
  },
  {
    "english": "United States dollar",
    "swahili": "Dola ya Marekani"
  },
  {
    "english": "Indonesian Rupiah",
    "swahili": "Rupiah ya Indonesia"
  },
  {
    "english": "Euro",
    "swahili": "Euro"
  },
  {
    "english": "Singapore Dollar",
    "swahili": "Dola ya Singapore"
  },
  {
    "english": "Brazilian Real",
    "swahili": "Real ya Brazil"
  },
  {
    "english": "Canadian Dollar",
    "swahili": "Dola ya Kanada"
  },
  {
    "english": "CFP Franc",
    "swahili": "Faranga za CFP"
  },
  {
    "english": "French Franc",
    "swahili": "Franc ya Ufaransa"
  },
  {
    "english": "Italian Lira",
    "swahili": "Lira ya Italia"
  },
  {
    "english": "Kuwaiti Dinar",
    "swahili": "Dinari ya Kuwait"
  },
  {
    "english": "Mexican Peso",
    "swahili": "Peso ya Mexico"
  },
  {
    "english": "Nepalese Rupee",
    "swahili": "Rupia ya Nepali"
  },
  {
    "english": "United Arab Emirates Dirham",
    "swahili": "Dirham ya Falme za Kiarabu"
  },
  {
    "english": "Honey",
    "swahili": "Asali"
  },
  {
    "english": "Natural (Dry)",
    "swahili": "Asili (kavu)"
  },
  {
    "english": "Wine",
    "swahili": "Mvinyo"
  },
  {
    "english": "Semi-Washed",
    "swahili": "Imeoshwa nusu"
  },
  {
    "english": "Full-Washed",
    "swahili": "Imeoshwa Kamili"
  },
  {
    "english": "Honey",
    "swahili": "Asali"
  },
  {
    "english": "Natural (Dry)",
    "swahili": "Asili (kavu)"
  },
  {
    "english": "Wine",
    "swahili": "Mvinyo"
  },
  {
    "english": "Semi-Washed",
    "swahili": "Imeoshwa nusu"
  },
  {
    "english": "Full-Washed",
    "swahili": "Imeoshwa Kamili"
  },
  {
    "english": "Completed",
    "swahili": "Imekamilika"
  },
  {
    "english": "Parchment Coffee",
    "swahili": "Kahawa ya ngozi"
  },
  {
    "english": "Quality Control",
    "swahili": "Udhibiti wa Ubora"
  },
  {
    "english": "Batch Production",
    "swahili": "Uzalishaji wa Kundi"
  },
  {
    "english": "Green Beans",
    "swahili": "Maharage ya Kijani"
  },
  {
    "english": "Cupping",
    "swahili": "Kupika kikombe"
  },
  {
    "english": "Agrifound Light Red",
    "swahili": "Agrifound Mwanga Nyekundu"
  },
  {
    "english": "Agrifound Red",
    "swahili": "Agrifound Red"
  },
  {
    "english": "Agrifound Rose",
    "swahili": "Agrifound Rose"
  },
  {
    "english": "Agrifound White",
    "swahili": "Agrifound White"
  },
  {
    "english": "Arad-H",
    "swahili": "Arad-H"
  },
  {
    "english": "Arka Bindu",
    "swahili": "Arka Bindu"
  },
  {
    "english": "Arka Kalyan",
    "swahili": "Arka Kalyan"
  },
  {
    "english": "Arka Kihriman",
    "swahili": "Arka Kihriman"
  },
  {
    "english": "Arka Kirtinaan",
    "swahili": "Arka Kirtinaan"
  },
  {
    "english": "Arka Lalima",
    "swahili": "Arka Lalima"
  },
  {
    "english": "Arka Niketan",
    "swahili": "Arka Niketan"
  },
  {
    "english": "Arka Pitambar",
    "swahili": "Arka Pitambar"
  },
  {
    "english": "Arka Pragathi",
    "swahili": "Arka Pragathi"
  },
  {
    "english": "Arka Sona",
    "swahili": "Arka Sona"
  },
  {
    "english": "Arka Swadista",
    "swahili": "Arka Swadista"
  },
  {
    "english": "Arka Ujjwal",
    "swahili": "Arka Ujjwal"
  },
  {
    "english": "Arka Vishwas",
    "swahili": "Arka Vishwas"
  },
  {
    "english": "Bangalore rose",
    "swahili": "Bangalore rose"
  },
  {
    "english": "Bhima super red",
    "swahili": "Bhima nyekundu sana"
  },
  {
    "english": "Bhima red",
    "swahili": "Bhima nyekundu"
  },
  {
    "english": "Bhima raj dark red",
    "swahili": "Bhima raj nyekundu iliyokolea"
  },
  {
    "english": "Bhima Shakti red",
    "swahili": "Bhima Shakti nyekundu"
  },
  {
    "english": "Bhima Kiran light red",
    "swahili": "Bhima Kiran nyekundu isiyokolea"
  },
  {
    "english": "Bhima light red",
    "swahili": "Bhima nyekundu nyekundu"
  },
  {
    "english": "Bhima shubra white",
    "swahili": "Bhima shubra nyeupe"
  },
  {
    "english": "Bhima shweta white",
    "swahili": "Bhima shweta nyeupe"
  },
  {
    "english": "Bhima Safed",
    "swahili": "Bhima Safed"
  },
  {
    "english": "Early Grano",
    "swahili": "Grano ya mapema"
  },
  {
    "english": "Kalyanpur Red Round",
    "swahili": "Mzunguko Mwekundu wa Kalyanpur"
  },
  {
    "english": "Nimar local",
    "swahili": "Nimar wa ndani"
  },
  {
    "english": "Phule Safeed",
    "swahili": "Phule Salama"
  },
  {
    "english": "Phule Survana",
    "swahili": "Phule Survana"
  },
  {
    "english": "Phule Samarth",
    "swahili": "Phule Samarth"
  },
  {
    "english": "Phule Swarna",
    "swahili": "Phule Swarna"
  },
  {
    "english": "Punjab Selection",
    "swahili": "Uchaguzi wa Punjab"
  },
  {
    "english": "Pusa Madhavi",
    "swahili": "Pusa Madhavi"
  },
  {
    "english": "Pusa Ridhi",
    "swahili": "Pusa Ridhi"
  },
  {
    "english": "Spanish brown",
    "swahili": "Kihispania kahawia"
  },
  {
    "english": "Suprex",
    "swahili": "Suprex"
  },
  {
    "english": "Talaja Local",
    "swahili": "Talaja Mitaa"
  },
  {
    "english": "Bhima",
    "swahili": "Bhima"
  },
  {
    "english": "Girna",
    "swahili": "Girna"
  },
  {
    "english": "Manjira",
    "swahili": "Manjira"
  },
  {
    "english": "NIRA",
    "swahili": "NIRA"
  },
  {
    "english": "Sagarmatyalu",
    "swahili": "Sagarmatyalu"
  },
  {
    "english": "Sharda",
    "swahili": "Sharda"
  },
  {
    "english": "Tara",
    "swahili": "Tara"
  },
  {
    "english": "banana fruit",
    "swahili": "matunda ya ndizi"
  },
  {
    "english": "Farsem",
    "swahili": "Farsem"
  },
  {
    "english": "Amazonas Embrapa",
    "swahili": "Amazonas Embrapa"
  },
  {
    "english": "Fibra",
    "swahili": "Fibra"
  },
  {
    "english": "Espeto",
    "swahili": "Espeto"
  },
  {
    "english": "Mandim branca",
    "swahili": "Mandim branca"
  },
  {
    "english": "Platina",
    "swahili": "Platina"
  },
  {
    "english": "Sonara",
    "swahili": "Sonara"
  },
  {
    "english": "Jarina",
    "swahili": "Jarina"
  },
  {
    "english": "Arari",
    "swahili": "Aari"
  },
  {
    "english": "Cacau",
    "swahili": "Cacau"
  },
  {
    "english": "Taquari",
    "swahili": "Taquari"
  },
]
module.exports = {
  async up (queryInterface, Sequelize) {
    for (const row of data) {
      let sql =
        "SELECT * FROM global_translation_metadata WHERE english = :english";
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
