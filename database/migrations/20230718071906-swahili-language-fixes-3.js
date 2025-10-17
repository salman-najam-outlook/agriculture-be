'use strict';
const data = [
  {
    "english": "Role is required",
    "swahili": "Jukumu linahitajika"
  },
  {
    "english": "Admin Role",
    "swahili": "Jukumu la Msimamizi"
  },
  {
    "english": "User Role",
    "swahili": "Wajibu wa Mtumiaji"
  },
  {
    "english": "User role is required",
    "swahili": "Jukumu la mtumiaji linahitajika"
  },
  {
    "english": "Membership Role",
    "swahili": "Jukumu la Uanachama"
  },
  {
    "english": "Role created successfully",
    "swahili": "Jukumu limeundwa"
  },
  {
    "english": "Total",
    "swahili": "Jumla"
  },
  {
    "english": "TotalLimeWeightUnit",
    "swahili": "TotalLimeWeightUnit"
  },
  {
    "english": "TotalOrganicInputAppliedWeightUnit",
    "swahili": "TotalOrganicInputAppliedWeightUnit"
  },
  {
    "english": "TotalSyntheticFertilizerUsedWeightUnit",
    "swahili": "TotalSyntheticFertilizerUsedWeightUnit"
  },
  {
    "english": "High",
    "swahili": "Juu"
  },
  {
    "english": "K7",
    "swahili": "K7"
  },
  {
    "english": "Family Tribe",
    "swahili": "Kabila la Familia"
  },
  {
    "english": "Family Tribe",
    "swahili": "Kabila la Familia"
  },
  {
    "english": "Pre-emergence",
    "swahili": "Kabla ya kuibuka"
  },
  {
    "english": "Pre-planting/land preparation",
    "swahili": "Kabla ya kupanda/maandalizi ya ardhi"
  },
  {
    "english": "Magnesite",
    "swahili": "Magnesite"
  },
  {
    "english": "Coffee",
    "swahili": "Kahawa"
  },
  {
    "english": "Coffee",
    "swahili": "Kahawa"
  },
  {
    "english": "Karet",
    "swahili": "Karet"
  },
  {
    "english": "Welcome! Login",
    "swahili": "Karibu! Ingia"
  },
  {
    "english": "Medium",
    "swahili": "Kati"
  },
  {
    "english": "Kayumanis",
    "swahili": "Kayumanis"
  },
  {
    "english": "Kelapa",
    "swahili": "Kelapa"
  },
  {
    "english": "Max Users Allowed ",
    "swahili": "Watumiaji wa Juu Wanaoruhusiwa"
  },
  {
    "english": "Booth 8",
    "swahili": "Kibanda 8"
  },
  {
    "english": "Header",
    "swahili": "Kijajuu"
  },
  {
    "english": "Heading",
    "swahili": "Kichwa"
  },
  {
    "english": "Question Title*",
    "swahili": "Kichwa cha Swali*"
  },
  {
    "english": "Add Survey Question",
    "swahili": "Ongeza Swali la Utafiti"
  },
  {
    "english": "Survey Builder",
    "swahili": "Mjenzi wa Utafiti"
  },
  {
    "english": "Survery Builder",
    "swahili": "Mjenzi wa Survery"
  },
  {
    "english": "Tracker",
    "swahili": "Mfuatiliaji"
  },
  {
    "english": "parameter",
    "swahili": "kigezo"
  },
  {
    "english": "Stick",
    "swahili": "Fimbo"
  },
  {
    "english": "OrganicInputApplicationRateWeightAreaUnit",
    "swahili": "OrganicInputApplicationRateWeightAreaUnit"
  },
  {
    "english": "Colombian",
    "swahili": "wa Colombia"
  },
  {
    "english": "Every five years (5 points)",
    "swahili": "Kila baada ya miaka mitano (pointi 5)"
  },
  {
    "english": "Every five years",
    "swahili": "Kila baada ya miaka mitano"
  },
  {
    "english": "Every two years",
    "swahili": "Kila baada ya miaka miwili"
  },
  {
    "english": "Every two years (5 points)",
    "swahili": "Kila baada ya miaka miwili (pointi 5)"
  },
  {
    "english": "Quarterly",
    "swahili": "Kila robo"
  },
  {
    "english": "Every crop season (5 points)",
    "swahili": "Kila msimu wa mazao (pointi 5)"
  },
  {
    "english": "Monthly",
    "swahili": "Kila mwezi"
  },
  {
    "english": "Per hour",
    "swahili": "Kwa saa"
  },
  {
    "english": "Daily",
    "swahili": "Kila siku"
  },
  {
    "english": "Weekly",
    "swahili": "Kila wiki"
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
    "english": "Kg",
    "swahili": "Kilo"
  },
  {
    "english": "Kilogram",
    "swahili": "Kilo"
  },
  {
    "english": "Kilograms",
    "swahili": "Kilo"
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
    "english": "Kg/Acre",
    "swahili": "Kg/Ekari"
  },
  {
    "english": "kg/ha",
    "swahili": "kg/ha"
  },
  {
    "english": "Kg/Hectare",
    "swahili": "Kg/Hekta"
  },
  {
    "english": "Crop lifter",
    "swahili": "Kiinua mazao"
  },
  {
    "english": "Modern-sprinkler",
    "swahili": "Kisasa-sprinkler"
  },
  {
    "english": "Modern-drip",
    "swahili": "Kisasa-drip"
  },
  {
    "english": "Graft",
    "swahili": "Kupandikiza"
  },
  {
    "english": "Priority",
    "swahili": "Kipaumbele"
  },
  {
    "english": "Unit",
    "swahili": "Kitengo"
  },
  {
    "english": "Well",
    "swahili": "Vizuri"
  },
  {
    "english": "Knife",
    "swahili": "Kisu"
  },
  {
    "english": "Cultural/Manual/Mechanical",
    "swahili": "Kiutamaduni/Mwongozo/Mitambo"
  },
  {
    "english": "Terminal ID",
    "swahili": "Kitambulisho cha terminal"
  },
  {
    "english": "button Create Admin Role” above",
    "swahili": "kitufe Unda Jukumu la Msimamizi, hapo juu"
  },
  {
    "english": "button above",
    "swahili": "kitufe hapo juu"
  },
  {
    "english": "Onion ",
    "swahili": "Kitunguu"
  },
  {
    "english": "Agrifound Dark Red",
    "swahili": "Agrifound Giza Nyekundu"
  },
  {
    "english": "Garlic",
    "swahili": "Kitunguu saumu"
  },
  {
    "english": "Garlic (Zambia)",
    "swahili": "Kitunguu saumu (Zambia)"
  },
  {
    "english": "Salinity",
    "swahili": "Chumvi"
  },
  {
    "english": "Soil salinity and acidity",
    "swahili": "Chumvi ya udongo na asidi"
  },
  {
    "english": "Volume-Area",
    "swahili": "Kiasi-Eneo"
  },
  {
    "english": "Ammonium chloride",
    "swahili": "Kloridi ya amonia"
  },
  {
    "english": "Potassium chloride",
    "swahili": "Kloridi ya potasiamu"
  },
  {
    "english": "Potasium chloride",
    "swahili": "Kloridi ya potasiamu"
  },
  {
    "english": "Activation Keys Quota",
    "swahili": "Sehemu ya Vifunguo vya Uanzishaji"
  },
  {
    "english": "Crop residue retention (1 point)",
    "swahili": "Uhifadhi wa mabaki ya mazao (pointi 1)"
  },
  {
    "english": "Approve/Reject",
    "swahili": "Idhinisha/Kataa"
  },
  {
    "english": "improve soil health",
    "swahili": "kuboresha afya ya udongo"
  },
  {
    "english": "Improve the quality of produce",
    "swahili": "Kuboresha ubora wa mazao"
  },
  {
    "english": "Improve livestock breeds",
    "swahili": "Kuboresha mifugo"
  },
  {
    "english": "Improve animal welfare",
    "swahili": "Kuboresha ustawi wa wanyama"
  },
  {
    "english": "Improve adaptation to climate change",
    "swahili": "Kuboresha kukabiliana na mabadiliko ya hali ya hewa"
  },
  {
    "english": "Improve reproductive performance",
    "swahili": "Kuboresha utendaji wa uzazi"
  },
  {
    "english": "Fertigation",
    "swahili": "Fertigation"
  },
  {
    "english": "tissue culture",
    "swahili": "utamaduni wa tishu"
  },
  {
    "english": "Budding",
    "swahili": "Chipukizi"
  },
  {
    "english": "Early flowering",
    "swahili": "Maua ya mapema"
  },
  {
    "english": "harvesting-fresh-yield",
    "swahili": "kuvuna-fresh-mavuno"
  },
  {
    "english": "harvesting-yield-household-consumption",
    "swahili": "kuvuna-mavuno-matumizi-ya-kaya"
  },
  {
    "english": "Necrosis",
    "swahili": "Nekrosisi"
  },
  {
    "english": "Raking",
    "swahili": "Kuweka alama"
  },
  {
    "english": "Top dressing",
    "swahili": "Mavazi ya juu"
  },
  {
    "english": "Smother/mulching",
    "swahili": "Kuziba/kutandaza"
  },
  {
    "english": "Mowing/ploughing",
    "swahili": "Kukata/kulima"
  },
  {
    "english": "Freezing",
    "swahili": "Kuganda"
  },
  {
    "english": "Unsuccessful login Lock-out period",
    "swahili": "Kipindi cha Kufungia nje hakijafaulu"
  },
  {
    "english": "Last Login",
    "swahili": "Mwisho wa Kuingia"
  },
  {
    "english": "Ripening",
    "swahili": "Kuiva"
  },
  {
    "english": "Grain filling",
    "swahili": "Kujaza nafaka"
  },
  {
    "english": "Drying",
    "swahili": "Kukausha"
  },
  {
    "english": "Rain water harvesting",
    "swahili": "Uvunaji wa maji ya mvua"
  },
  {
    "english": "Tillering",
    "swahili": "Kulima"
  },
  {
    "english": "Hoeing",
    "swahili": "Hoeing"
  },
  {
    "english": "Harrowing",
    "swahili": "Kusumbua"
  },
  {
    "english": "propagation",
    "swahili": "uenezi"
  },
  {
    "english": "Something went wrong. Please try after sometime.",
    "swahili": "Hitilafu fulani imetokea. Tafadhali jaribu baada ya muda fulani."
  },
  {
    "english": "Something went wrong",
    "swahili": "Hitilafu fulani imetokea"
  },
  {
    "english": "User already exist with this email.",
    "swahili": "Mtumiaji tayari yuko na barua pepe hii."
  },
  {
    "english": "User already exist with this mobile number.",
    "swahili": "Mtumiaji tayari yupo na nambari hii ya simu."
  },
  {
    "english": "User already exist with this email.",
    "swahili": "Mtumiaji tayari yuko na barua pepe hii."
  },
  {
    "english": "Spraying",
    "swahili": "Kunyunyizia dawa"
  },
  {
    "english": "Irrigation",
    "swahili": "Umwagiliaji"
  },
  {
    "english": "Irrigation",
    "swahili": "Umwagiliaji"
  },
  {
    "english": "Manual irrigation",
    "swahili": "Umwagiliaji wa mikono"
  },
  {
    "english": "Surface irrigation",
    "swahili": "Umwagiliaji wa uso"
  },
  {
    "english": "Drip irrigation",
    "swahili": "Umwagiliaji wa matone"
  },
  {
    "english": "Sprinkler irrigation",
    "swahili": "Kunyunyizia umwagiliaji"
  },
  {
    "english": "Sub surface irrigation",
    "swahili": "Umwagiliaji chini ya uso"
  },
  {
    "english": "Localized irrigation",
    "swahili": "Umwagiliaji wa ndani"
  },
  {
    "english": "Traditional irrigation",
    "swahili": "Umwagiliaji wa jadi"
  },
  {
    "english": "Irrigation-Area",
    "swahili": "Umwagiliaji-Eneo"
  },
  {
    "english": "Irrigation-Volume",
    "swahili": "Umwagiliaji-Kiasi"
  },
  {
    "english": "Dehorning",
    "swahili": "Kupunguza pembe"
  },
  {
    "english": "Increase Crop Health",
    "swahili": "Kuongeza Afya ya Mazao"
  },
  {
    "english": "Increase Crop Health",
    "swahili": "Kuongeza Afya ya Mazao"
  },
  {
    "english": "Activation",
    "swahili": "Uwezeshaji"
  },
  {
    "english": "Pellet application",
    "swahili": "Maombi ya Pellet"
  },
  {
    "english": "Maximize income",
    "swahili": "Kuongeza mapato"
  },
  {
    "english": "Increase animal yield",
    "swahili": "Kuongeza mavuno ya wanyama"
  },
  {
    "english": "increase crop yield",
    "swahili": "kuongeza mavuno ya mazao"
  },
  {
    "english": "User Listing",
    "swahili": "Orodha ya Watumiaji"
  },
  {
    "english": "Weeding",
    "swahili": "Kupalilia"
  },
  {
    "english": "Weeding",
    "swahili": "Kupalilia"
  },
  {
    "english": "Sowing",
    "swahili": "Kupanda"
  },
  {
    "english": "Sowing/Planting",
    "swahili": "Kupanda/Kupanda"
  },
  {
    "english": "Sowing/planting",
    "swahili": "Kupanda/kupanda"
  },
  {
    "english": "Sowing/Planting",
    "swahili": "Kupanda/Kupanda"
  },
  {
    "english": "Planting cover crops (1 point)",
    "swahili": "Kupanda mazao ya kufunika (pointi 1)"
  },
  {
    "english": "grafting",
    "swahili": "kupandikizwa"
  },
  {
    "english": "Assigning Activation Keys",
    "swahili": "Inakabidhi Vifunguo vya Uwezeshaji"
  },
  {
    "english": "Yellowing and white interveinal  stripping of lower leaves",
    "swahili": "Njano na nyeupe kukatwa kwa mishipa ya majani ya chini"
  },
  {
    "english": "Winnowing",
    "swahili": "Kushinda"
  },
  {
    "english": "measurement",
    "swahili": "kipimo"
  },
  {
    "english": "Reduced effectiveness of fertilizers",
    "swahili": "Kupunguza ufanisi wa mbolea"
  },
  {
    "english": "Shedding of leaves",
    "swahili": "Kumwaga kwa majani"
  },
  {
    "english": "Threshing",
    "swahili": "Kupura"
  },
  {
    "english": "Clearing of land",
    "swahili": "Kusafisha ardhi"
  },
  {
    "english": "Dry Milling",
    "swahili": "Kusaga Kavu"
  },
  {
    "english": "Eartagging/Animal Identification",
    "swahili": "Utambulisho wa masikio/Mnyama"
  },
  {
    "english": "Mulching (1 point)",
    "swahili": "Kutandaza (pointi 1)"
  },
  {
    "english": "Levelling",
    "swahili": "Kusawazisha"
  },
  {
    "english": "Marketing",
    "swahili": "Masoko"
  },
  {
    "english": "Unable to verify Email",
    "swahili": "Imeshindwa kuthibitisha Barua pepe"
  },
  {
    "english": "Drilling",
    "swahili": "Kuchimba visima"
  },
  {
    "english": "Auto-Logout",
    "swahili": "Ondoka kiotomatiki"
  },
  {
    "english": "Spading",
    "swahili": "Kurusha"
  },
  {
    "english": " Password Criteria Setup",
    "swahili": "  Uwekaji wa Vigezo vya Nenosiri"
  },
  {
    "english": "Terracing (1 point)",
    "swahili": "Mtaro (pointi 1)"
  },
  {
    "english": "Manual (hand) harvesting",
    "swahili": "Uvunaji wa mikono (mkono)."
  },
  {
    "english": "Mechanical harvesting",
    "swahili": "Uvunaji wa mitambo"
  },
  {
    "english": "Hand pulling",
    "swahili": "Kuvuta kwa mikono"
  },
  {
    "english": "Salting",
    "swahili": "Kuweka chumvi"
  },
  {
    "english": "liming-schedule",
    "swahili": "ratiba ya kuweka liming"
  },
  {
    "english": "liming-material",
    "swahili": "liming-nyenzo"
  },
  {
    "english": "liming-application-frequency",
    "swahili": "liming-application-frequency"
  },
  {
    "english": "Surface/broadcasting application",
    "swahili": "Uso/utangazaji wa programu"
  },
  {
    "english": "Side dressing",
    "swahili": "Mavazi ya upande"
  },
  {
    "english": "Surface application and deep ploughed",
    "swahili": "Uwekaji wa uso na kulimwa kwa kina"
  },
  {
    "english": "Surface application and deep ploughed into the soil",
    "swahili": "Uwekaji wa uso na kupandwa kwa kina kwenye udongo"
  },
  {
    "english": "Spot application",
    "swahili": "Maombi ya doa"
  },
  {
    "english": "Surface application",
    "swahili": "Utumizi wa uso"
  },
  {
    "english": "LimingRateWeightAreaUnit",
    "swahili": "LimingRateWeightAreaUnit"
  },
  {
    "english": "Sodicity",
    "swahili": "Sodicity"
  },
  {
    "english": "Presence of fertility weeds (chickweed, chicory, clover, dandelion, pigweed, mugwort)(1 point)",
    "swahili": "Uwepo wa magugu ya uzazi (kifaranga, chicory, clover, dandelion, nguruwe, mugwort)(pointi 1)"
  },
  {
    "english": "Earthworm/grub presence(1 point)",
    "swahili": "Uwepo wa minyoo/kunguru(pointi 1)"
  },
  {
    "english": "vegetative-propagation",
    "swahili": "uenezaji wa mimea"
  },
  {
    "english": "Early senescing of older leaves",
    "swahili": "Kukatwa kwa majani ya zamani"
  },
  {
    "english": "By Name",
    "swahili": "Kwa Jina"
  },
  {
    "english": "By Year",
    "swahili": "Kwa Mwaka"
  },
  {
    "english": "By Year",
    "swahili": "Kwa Mwaka"
  },
  {
    "english": "By Month",
    "swahili": "Kwa Mwezi"
  },
  {
    "english": "Per Day",
    "swahili": "Kwa siku"
  },
  {
    "english": "By Production ",
    "swahili": "Kwa Uzalishaji"
  },
  {
    "english": "By Week",
    "swahili": "Kwa Wiki"
  },
  {
    "english": "Due Descending",
    "swahili": "Kutokana na Kushuka"
  },
  {
    "english": "Due Ascending",
    "swahili": "Kutokana na Kupanda"
  },
  {
    "english": "Lamtoro (Leucaena glauca)",
    "swahili": "Lamtoro (Leucaena glauca)"
  },
  {
    "english": "goal-target",
    "swahili": "lengo-lengo"
  },
  {
    "english": "goal-permission",
    "swahili": "ruhusa ya lengo"
  },
  {
    "english": "l",
    "swahili": "l"
  },
  {
    "english": "Liter",
    "swahili": "Lita"
  },
  {
    "english": "Litres",
    "swahili": "Lita"
  },
  {
    "english": "Liter-Per-Hectar",
    "swahili": "Lita-Kwa-Hekta"
  },
  {
    "english": "l/ac",
    "swahili": "l/ac"
  },
  {
    "english": "Liters/acre",
    "swahili": "Lita/ekari"
  },
  {
    "english": "l/hc",
    "swahili": "l/hc"
  },
  {
    "english": "Liters/hectare",
    "swahili": "Lita/hekta"
  },
  {
    "english": "White deposits on soil",
    "swahili": "Amana nyeupe kwenye udongo"
  },
  {
    "english": "Weak stalks/stems",
    "swahili": "Mabua/shina dhaifu"
  },
  {
    "english": "Ponds",
    "swahili": "Mabwawa"
  },
  {
    "english": "Topics",
    "swahili": "Mada"
  },
  {
    "english": "subject",
    "swahili": "somo"
  },
  {
    "english": "Topic added successfully",
    "swahili": "Mada imeongezwa kwa mafanikio"
  },
  {
    "english": "MInutes",
    "swahili": "Dakika"
  },
  {
    "english": "Purple spots on leaves",
    "swahili": "Matangazo ya zambarau kwenye majani"
  },
  {
    "english": "Description is required",
    "swahili": "Ufafanuzi unahitajika"
  },
  {
    "english": "Description",
    "swahili": "Maelezo"
  },
  {
    "english": "Password details will be sent to your email address.",
    "swahili": "Maelezo ya nenosiri yatatumwa kwa anwani yako ya barua pepe."
  },
  {
    "english": "Password details will be sent to your email address.",
    "swahili": "Maelezo ya nenosiri yatatumwa kwa anwani yako ya barua pepe."
  },
  {
    "english": "Password details will be sent to phone number.",
    "swahili": "Maelezo ya nenosiri yatatumwa kwa nambari ya simu."
  },
  {
    "english": "Description is required",
    "swahili": "Ufafanuzi unahitajika"
  },
  {
    "english": "Flooding",
    "swahili": "Mafuriko"
  },
  {
    "english": "Floods",
    "swahili": "Mafuriko"
  },
  {
    "english": "Crushed shells",
    "swahili": "Magamba yaliyosagwa"
  },
  {
    "english": "Milk weed",
    "swahili": "Maziwa ya magugu"
  },
  {
    "english": "Location",
    "swahili": "Mahali"
  },
  {
    "english": "Corn (Argentina)",
    "swahili": "Nafaka (Argentina)"
  },
  {
    "english": "Corn (Brazil)",
    "swahili": "Nafaka (Brazili)"
  },
  {
    "english": "Corn (Canada)",
    "swahili": "Nafaka (Kanada)"
  },
  {
    "english": "Corn (India)",
    "swahili": "Mahindi (India)"
  },
  {
    "english": "Corn (Indonesia)",
    "swahili": "Nafaka (Indonesia)"
  },
  {
    "english": "Maize/Corn (Uganda)",
    "swahili": "Mahindi/Mahindi (Uganda)"
  },
  {
    "english": "Corn (Uganda)",
    "swahili": "Mahindi (Uganda)"
  },
  {
    "english": "Corn (USA)",
    "swahili": "Mahindi (Marekani)"
  },
  {
    "english": "Dark, dull or blue green leaves",
    "swahili": "Majani ya kijani kibichi, giza au bluu"
  },
  {
    "english": "Dark leaves",
    "swahili": "Majani ya giza"
  },
  {
    "english": "Necrotic leaves",
    "swahili": "Majani ya Necrotic"
  },
  {
    "english": "Leaves look burnt at tip",
    "swahili": "Majani yanaonekana kuchomwa kwa ncha"
  },
  {
    "english": "Unsuccessful Login Attemps",
    "swahili": "Jaribio la Kuingia Lisilofanikiwa"
  },
  {
    "english": "Unsuccessful Login Attempts",
    "swahili": "Jaribio la Kuingia Bila Mafanikio"
  },
  {
    "english": "Ground water",
    "swahili": "Maji ya chini"
  },
  {
    "english": "Surface water",
    "swahili": "Maji ya uso"
  },
  {
    "english": "Plantations Name",
    "swahili": "Jina la Plantations"
  },
  {
    "english": "winter",
    "swahili": "majira ya baridi"
  },
  {
    "english": "spring",
    "swahili": "chemchemi"
  },
  {
    "english": "Admin Roles",
    "swahili": "Majukumu ya Msimamizi"
  },
  {
    "english": "Admin Roles",
    "swahili": "Majukumu ya Msimamizi"
  },
  {
    "english": "Roles deleted successfully",
    "swahili": "Majukumu yamefutwa"
  },
  {
    "english": "Roles updated successfully",
    "swahili": "Majukumu yamesasishwa"
  },
  {
    "english": "Roles created successfully",
    "swahili": "Majukumu yameundwa"
  },
  {
    "english": "Loading Roles",
    "swahili": "Inapakia Majukumu"
  },
  {
    "english": "Roles Allowed ",
    "swahili": "Majukumu Yanayoruhusiwa"
  },
  {
    "english": "Shears",
    "swahili": "Shears"
  },
  {
    "english": "farming-goals",
    "swahili": "malengo ya kilimo"
  },
  {
    "english": "Dry Milling Targets",
    "swahili": "Malengo ya Kusaga Kavu"
  },
  {
    "english": "Dry Milling Targets",
    "swahili": "Malengo ya Kusaga Kavu"
  },
  {
    "english": "Crop Goals",
    "swahili": "Malengo ya Mazao"
  },
  {
    "english": "Crop Goals",
    "swahili": "Malengo ya Mazao"
  },
  {
    "english": "My Goals",
    "swahili": "Malengo Yangu"
  },
  {
    "english": "Payments",
    "swahili": "Malipo"
  },
  {
    "english": "Payments",
    "swahili": "Malipo"
  },
  {
    "english": "Interveinal chlorosis of new leaves",
    "swahili": "Chlorosisi ya kati ya majani mapya"
  },
  {
    "english": "Chlorosis/yellowing of leaves",
    "swahili": "Chlorosis/njano ya majani"
  },
  {
    "english": "New report requests can be submitted after completing current report requests",
    "swahili": "Maombi ya ripoti mpya yanaweza kuwasilishwa baada ya kukamilisha maombi ya sasa ya ripoti"
  },
  {
    "english": "Comments",
    "swahili": "Maoni"
  },
  {
    "english": "Twice every crop season",
    "swahili": "Mara mbili kila msimu wa mazao"
  },
  {
    "english": "Once every crop season",
    "swahili": "Mara moja kila msimu wa mazao"
  },
  {
    "english": "Once every cropping season",
    "swahili": "Mara moja kila msimu wa kupanda"
  },
  {
    "english": "Once every cropping season(5 points)",
    "swahili": "Mara moja kila msimu wa kupanda (pointi 5)"
  },
  {
    "english": "Four times every crop season",
    "swahili": "Mara nne kila msimu wa mazao"
  },
  {
    "english": "Thrice every crop season",
    "swahili": "Mara tatu kila msimu wa mazao"
  },
  {
    "english": "Maragaturra",
    "swahili": "Maragaturra"
  },
  {
    "english": "Maragogipe",
    "swahili": "Maragogipe"
  },
  {
    "english": "Unsuccessful Login Attemps",
    "swahili": "Jaribio la Kuingia Lisilofanikiwa"
  },
  {
    "english": "Reports",
    "swahili": "Ripoti"
  },
  {
    "english": "Reports",
    "swahili": "Ripoti"
  },
  {
    "english": "Permissions",
    "swahili": "Ruhusa"
  },
  {
    "english": "Permissions",
    "swahili": "Ruhusa"
  },
  {
    "english": "Permissions Updated",
    "swahili": "Ruhusa Zimesasishwa"
  },
  {
    "english": "Hours",
    "swahili": "Saa"
  },
  {
    "english": "Plantations ",
    "swahili": "Mashamba"
  },
  {
    "english": "Plantations",
    "swahili": "Mashamba"
  },
  {
    "english": "Plantations ",
    "swahili": "Mashamba"
  },
  {
    "english": "Thin/weak stems",
    "swahili": "Mashina nyembamba/dhaifu"
  },
  {
    "english": "Dark green/brownish stems",
    "swahili": "Mashina ya kijani kibichi/kahawia"
  },
  {
    "english": "Field toppers",
    "swahili": "Vifuniko vya shamba"
  },
  {
    "english": "Huller",
    "swahili": "Huller"
  },
  {
    "english": "Paddy thresher",
    "swahili": "Kipura mpunga"
  },
  {
    "english": "Sheller",
    "swahili": "Sheller"
  },
  {
    "english": "Reaper",
    "swahili": "Mvunaji"
  },
  {
    "english": "Sugarcane harvester",
    "swahili": "Mvuna miwa"
  },
  {
    "english": "Purple/reddish stems",
    "swahili": "Mashina ya zambarau/nyekundu"
  },
  {
    "english": "Slips",
    "swahili": "Miteremko"
  },
  {
    "english": "Windrowers",
    "swahili": "Dirisha"
  },
  {
    "english": "Self propelled reapers",
    "swahili": "Wavunaji wanaojiendesha wenyewe"
  },
  {
    "english": "Days",
    "swahili": "Siku"
  },
  {
    "english": "Days",
    "swahili": "Siku"
  },
  {
    "english": "Days after sowing",
    "swahili": "Siku baada ya kupanda"
  },
  {
    "english": "Days after sowing (number of days)",
    "swahili": "Siku baada ya kupanda (idadi ya siku)"
  },
  {
    "english": "Technical inquiry",
    "swahili": "Uchunguzi wa kiufundi"
  },
  {
    "english": "Survey Questions",
    "swahili": "Maswali ya Utafiti"
  },
  {
    "english": "FAQ'S",
    "swahili": "MASWALI"
  },
  {
    "english": "FAQ",
    "swahili": "Maswali Yanayoulizwa Mara kwa Mara"
  },
  {
    "english": "Soil test results",
    "swahili": "Matokeo ya mtihani wa udongo"
  },
  {
    "english": "Energy-consumption",
    "swahili": "Matumizi ya nishati"
  },
  {
    "english": "General inquiry",
    "swahili": "Uchunguzi wa jumla"
  },
  {
    "english": "Technical inquiry",
    "swahili": "Uchunguzi wa kiufundi"
  },
  {
    "english": "Mayaguez",
    "swahili": "Mayaguez"
  },
  {
    "english": "My crops",
    "swahili": "Mazao yangu"
  },
  {
    "english": "My crops",
    "swahili": "Mazao yangu"
  },
  {
    "english": "My Crops",
    "swahili": "Mazao Yangu"
  },
  {
    "english": "Observations",
    "swahili": "Uchunguzi"
  },
  {
    "english": "seed",
    "swahili": "mbegu"
  },
  {
    "english": "Seeds",
    "swahili": "Mbegu"
  },
  {
    "english": "Seed tubers",
    "swahili": "Mizizi ya mbegu"
  },
  {
    "english": "Starter solutions",
    "swahili": "Suluhisho za kuanza"
  },
  {
    "english": "vegetable",
    "swahili": "mboga"
  },
  {
    "english": "Compost",
    "swahili": "Mbolea"
  },
  {
    "english": "Vermicompost",
    "swahili": "Mbolea ya mimea"
  },
  {
    "english": "Vermicompost (5 points)",
    "swahili": "Vermicompost (pointi 5)"
  },
  {
    "english": "Treated compost (5 points)",
    "swahili": "Mbolea iliyotibiwa (pointi 5)"
  },
  {
    "english": "Untreated compost",
    "swahili": "Mbolea isiyotibiwa"
  },
  {
    "english": "fertilizer",
    "swahili": "mbolea"
  },
  {
    "english": "Treated manure (5 points)",
    "swahili": "Samadi iliyotibiwa (pointi 5)"
  },
  {
    "english": "Turkey litter",
    "swahili": "Uturuki takataka"
  },
  {
    "english": "Pig farm yard manure",
    "swahili": "Mbolea ya shamba la nguruwe"
  },
  {
    "english": "Water pollution",
    "swahili": "Uchafuzi wa maji"
  },
  {
    "english": "Soil pollution due to untreated organic inputs",
    "swahili": "Uchafuzi wa udongo kutokana na pembejeo za kikaboni ambazo hazijatibiwa"
  },
  {
    "english": "Picker",
    "swahili": "Kiteua"
  },
  {
    "english": "Hybrid / Robusta ",
    "swahili": "Mseto / Robusta"
  },
  {
    "english": "Pig slurry",
    "swahili": "Nguruwe tope"
  },
  {
    "english": "Seedling",
    "swahili": "Miche"
  },
  {
    "english": "Picker in menu",
    "swahili": "Kiteua kwenye menyu"
  },
  {
    "english": "Plucker",
    "swahili": "Mchumaji"
  },
  {
    "english": "Manager",
    "swahili": "Meneja"
  },
  {
    "english": "Sales Manager",
    "swahili": "Meneja Mauzo"
  },
  {
    "english": "SALES MANAGER APPOINTED SUCCESSFULLY",
    "swahili": "MENEJA MAUZO ATEULIWA KWA MAFANIKIO"
  },
  {
    "english": "Content Manager",
    "swahili": "Kidhibiti Maudhui"
  },
  {
    "english": "other",
    "swahili": "nyingine"
  },
  {
    "english": "Other",
    "swahili": "Nyingine"
  },
  {
    "english": "Division/sets",
    "swahili": "Mgawanyiko/seti"
  },
  {
    "english": "editor",
    "swahili": "mhariri"
  },
  {
    "english": "Months",
    "swahili": "Miezi"
  },
  {
    "english": "1-6 Months",
    "swahili": "Miezi 1-6"
  },
  {
    "english": "1-8 months",
    "swahili": "Miezi 1-8"
  },
  {
    "english": "6-12 Months",
    "swahili": "Miezi 6-12"
  },
  {
    "english": "livestock",
    "swahili": "mifugo"
  },
  {
    "english": "My livestock",
    "swahili": "Mifugo yangu"
  },
  {
    "english": "My livestock",
    "swahili": "Mifugo yangu"
  },
  {
    "english": "My Livestock",
    "swahili": "Mifugo Yangu"
  },
  {
    "english": "Jute bags",
    "swahili": "Mifuko ya jute"
  },
  {
    "english": "Reduced or zero tillage systems (1 point)",
    "swahili": "Mifumo iliyopunguzwa au sifuri ya kulima (pointi 1)"
  },
  {
    "english": "mg",
    "swahili": "mg"
  },
  {
    "english": "mg/l",
    "swahili": "mg/l"
  },
  {
    "english": "mg/L/acre",
    "swahili": "mg/L/ekari"
  },
  {
    "english": "mg/L/hectare",
    "swahili": "mg/L/hekta"
  },
  {
    "english": "Millileter",
    "swahili": "Millileter"
  },
  {
    "english": "ml",
    "swahili": "ml"
  },
  {
    "english": "Milliliters per Square Meter",
    "swahili": "Mililita kwa mita ya mraba"
  },
  {
    "english": "Milliliter/Liter per Acre",
    "swahili": "Mililita/Lita kwa Ekari"
  },
  {
    "english": "Milliliter/Liter per Hectare",
    "swahili": "Mililita/Lita kwa Hekta"
  },
  {
    "english": "ml/L/acre",
    "swahili": "ml/L/ekari"
  },
  {
    "english": "ml/L/hectare",
    "swahili": "ml/L/hekta"
  },
  {
    "english": "mL/m2",
    "swahili": "mL/m2"
  },
  {
    "english": "Millimetres",
    "swahili": "Milimita"
  },
  {
    "english": "mm",
    "swahili": "mm"
  },
  {
    "english": "Milligram",
    "swahili": "Miligramu"
  },
  {
    "english": "Milligram/Liter per Acre",
    "swahili": "Miligramu/Lita kwa Ekari"
  },
  {
    "english": "Milligram/Liter per Hectare",
    "swahili": "Miligramu/Lita kwa Hekta"
  },
  {
    "english": "MIN (minutes)",
    "swahili": "MIN (dakika)"
  },
  {
    "english": "Settings",
    "swahili": "Mipangilio"
  },
  {
    "english": "Settings Not Updated",
    "swahili": "Mipangilio Haijasasishwa"
  },
  {
    "english": "General Settings",
    "swahili": "Mipangilio ya Jumla"
  },
  {
    "english": "Login/Logout Settings",
    "swahili": "Mipangilio ya Kuingia/Toka"
  },
  {
    "english": "Profile authentication settings",
    "swahili": "Mipangilio ya uthibitishaji wa wasifu"
  },
  {
    "english": "Global Settings",
    "swahili": "Mipangilio ya Ulimwenguni"
  },
  {
    "english": "Settings Updated",
    "swahili": "Mipangilio Imesasishwa"
  },
  {
    "english": "Membership Plans",
    "swahili": "Mipango ya Uanachama"
  },
  {
    "english": "Square Meter",
    "swahili": "Mita ya mraba"
  },
  {
    "english": "Square Yard",
    "swahili": "Yadi ya Mraba"
  },
  {
    "english": "Nails",
    "swahili": "Misumari"
  },
  {
    "english": "m",
    "swahili": "m"
  },
  {
    "english": "Meter",
    "swahili": "Mita"
  },
  {
    "english": "meters",
    "swahili": "mita"
  },
  {
    "english": "Observations",
    "swahili": "Uchunguzi"
  },
  {
    "english": "Poor infrastructure",
    "swahili": "Miundombinu duni"
  },
  {
    "english": "sugar cane",
    "swahili": "muwa"
  },
  {
    "english": "Sugar cane",
    "swahili": "Muwa"
  },
  {
    "english": "Sugar cane (Colombia)",
    "swahili": "Miwa (Kolombia)"
  },
  {
    "english": "Sugarcane (Colombia)",
    "swahili": "Miwa (Kolombia)"
  },
  {
    "english": "Sugar cane (India)",
    "swahili": "Miwa (India)"
  },
  {
    "english": "Sugarcane (India)",
    "swahili": "Miwa (India)"
  },
  {
    "english": "sugarcane(brazil)",
    "swahili": "miwa (brazil)"
  },
  {
    "english": "Underdeveloped roots",
    "swahili": "Mizizi isiyo na maendeleo"
  },
  {
    "english": "Sparse roots (1 point)",
    "swahili": "Mizizi michache (pointi 1)"
  },
  {
    "english": "Dense roots (1 point)",
    "swahili": "Mizizi mnene (pointi 1)"
  },
  {
    "english": "Region/State",
    "swahili": "Mkoa/Jimbo"
  },
  {
    "english": "Farmer",
    "swahili": "Mkulima"
  },
  {
    "english": "Farmer, Buying Station, Warehouse",
    "swahili": "Mkulima, Kituo cha Kununulia, Ghala"
  },
  {
    "english": "Curling and shedding of leaves",
    "swahili": "Curling na kumwaga majani"
  },
  {
    "english": "Soil erosion",
    "swahili": "Mmomonyoko wa udongo"
  },
  {
    "english": "Mocha",
    "swahili": "Mocha"
  },
  {
    "english": "Modules",
    "swahili": "Moduli"
  },
  {
    "english": "Modules Allowed ",
    "swahili": "Moduli Zinazoruhusiwa"
  },
  {
    "english": "Available Modules",
    "swahili": "Moduli Zinazopatikana"
  },
  {
    "english": "Monoammonium phosphate",
    "swahili": "Fosfati ya Monoammonium"
  },
  {
    "english": "Descending ",
    "swahili": "Kushuka"
  },
  {
    "english": "Ascending ",
    "swahili": "Kupanda"
  },
  {
    "english": "Default Plan",
    "swahili": "Mpango Chaguomsingi"
  },
  {
    "english": "Membership Plan",
    "swahili": "Mpango wa Uanachama"
  },
  {
    "english": "Membership Plan",
    "swahili": "Mpango wa Uanachama"
  },
  {
    "english": "Membership plan must be less than 20 characters",
    "swahili": "Mpango wa uanachama lazima uwe chini ya vibambo 20"
  },
  {
    "english": "Membership Plan is required",
    "swahili": "Mpango wa Uanachama unahitajika"
  },
  {
    "english": "Dimitra Admin",
    "swahili": "Msimamizi wa Dimitra"
  },
  {
    "english": "Community Admin",
    "swahili": "Msimamizi wa Jumuiya"
  },
  {
    "english": "crop-season",
    "swahili": "msimu wa mazao"
  },
  {
    "english": "Oscillating cutter",
    "swahili": "Oscillating cutter"
  },
  {
    "english": "motor",
    "swahili": "motor"
  },
  {
    "english": "viewer",
    "swahili": "mtazamaji"
  },
  {
    "english": "Wind Breaker Tree",
    "swahili": "Mti wa Kuvunja Upepo"
  },
  {
    "english": "Horticulture Tree",
    "swahili": "Mti wa Kilimo cha bustani"
  },
  {
    "english": "Shade Tree",
    "swahili": "Mti wa Kivuli"
  },
  {
    "english": "Shade tree deleted",
    "swahili": "Mti wa kivuli umefutwa"
  },
  {
    "english": "Wind breaker tree deleted",
    "swahili": "Mti wa kuvunja upepo umefutwa"
  },
  {
    "english": "River",
    "swahili": "Mto"
  },
  {
    "english": "Creek",
    "swahili": "mto mdogo"
  },
  {
    "english": "Deactivate User",
    "swahili": "Zima Mtumiaji"
  },
  {
    "english": "User",
    "swahili": "Mtumiaji"
  },
  {
    "english": "User",
    "swahili": "Mtumiaji"
  },
  {
    "english": "User Selected",
    "swahili": "Mtumiaji Amechaguliwa"
  },
  {
    "english": "User Added",
    "swahili": "Mtumiaji Ameongezwa"
  },
  {
    "english": "User Activated",
    "swahili": "Mtumiaji Amilishwa"
  },
  {
    "english": "User Deactivated",
    "swahili": "Mtumiaji Amezimwa"
  },
  {
    "english": "User Not Added",
    "swahili": "Mtumiaji Hajaongezwa"
  },
  {
    "english": "Admin User has been created successfully.",
    "swahili": "Mtumiaji Msimamizi ameundwa kwa mafanikio."
  },
  {
    "english": "Single User",
    "swahili": "Mtumiaji Mmoja"
  },
  {
    "english": "Active",
    "swahili": "Inayotumika"
  },
  {
    "english": "User doesn't exist.",
    "swahili": "Mtumiaji hayupo."
  },
  {
    "english": "Code Activation Time ",
    "swahili": "Muda wa Kuanzisha Msimbo"
  },
  {
    "english": "Plan Duration",
    "swahili": "Muda wa Mpango"
  },
  {
    "english": "Plan Duration*",
    "swahili": "Muda wa Mpango*"
  },
  {
    "english": "Membership Duration is required",
    "swahili": "Muda wa Uanachama unahitajika"
  },
  {
    "english": "Crop Overview",
    "swahili": "Muhtasari wa mazao"
  },
  {
    "english": "Crops Overview",
    "swahili": "Muhtasari wa Mazao"
  },
  {
    "english": "Mundo Novo",
    "swahili": "Mundo Novo"
  },
  {
    "english": "Muriate of potash",
    "swahili": "Muriate ya potashi"
  },
  {
    "english": "Invalid email format",
    "swahili": "Umbizo la barua pepe si sahihi"
  },
  {
    "english": "Invalid mobile number format",
    "swahili": "Muundo batili wa nambari ya simu"
  },
  {
    "english": "short rains",
    "swahili": "mvua fupi"
  },
  {
    "english": "long rains",
    "swahili": "mvua ndefu"
  },
  {
    "english": "Year/s",
    "swahili": "Mwaka/s"
  },
  {
    "english": "Reed",
    "swahili": "mwanzi"
  },
  {
    "english": "Beginning bloom/first flower stage",
    "swahili": "Mwanzo wa maua / hatua ya maua ya kwanza"
  },
  {
    "english": "Month/s",
    "swahili": "Mwezi/s"
  },
  {
    "english": "Mycoleptodiscus Crown and Root Rot",
    "swahili": "Taji ya Mycoleptodiscus na Kuoza kwa Mizizi"
  },
  {
    "english": "Perimeter",
    "swahili": "Mzunguko"
  },
  {
    "english": "crop-lifecycle",
    "swahili": "mzunguko wa maisha ya mazao"
  },
  {
    "english": "Nabal",
    "swahili": "Nabali"
  },
  {
    "english": "nitrogen",
    "swahili": "naitrojeni"
  },
  {
    "english": "NitrogenUnit",
    "swahili": "Kitengo cha nitrojeni"
  },
  {
    "english": "numbers",
    "swahili": "nambari"
  },
  {
    "english": "Country code",
    "swahili": "Msimbo wa nchi"
  },
  {
    "english": "Country Code is required",
    "swahili": "Msimbo wa Nchi unahitajika"
  },
  {
    "english": "Mobile",
    "swahili": "Rununu"
  },
  {
    "english": "Mobile Number",
    "swahili": "Namba ya simu ya mkononi"
  },
  {
    "english": "Phone Number",
    "swahili": "Nambari ya simu"
  },
  {
    "english": "Phone",
    "swahili": "Simu"
  },
  {
    "english": "Phone is required",
    "swahili": "Simu inahitajika"
  },
  {
    "english": "Mobile number is required",
    "swahili": "Nambari ya simu inahitajika"
  },
  {
    "english": "Phone must be valid",
    "swahili": "Simu lazima iwe halali"
  },
  {
    "english": "Keys Number",
    "swahili": "Nambari ya Vifunguo"
  },
  {
    "english": "Country",
    "swahili": "Nchi"
  },
  {
    "english": "Banana (Bolivia)",
    "swahili": "Ndizi (Bolivia)"
  },
  {
    "english": "Banana (India)",
    "swahili": "Ndizi (India)"
  },
  {
    "english": "Banana(indonesia)",
    "swahili": "Ndizi (indonesia)"
  },
  {
    "english": "Password",
    "swahili": "Nenosiri"
  },
  {
    "english": "Password is required",
    "swahili": "Nenosiri linahitajika"
  },
  {
    "english": "Your password is reset successfully",
    "swahili": "Nenosiri lako limewekwa upya"
  },
  {
    "english": "New Password",
    "swahili": "Nenosiri Mpya"
  },
  {
    "english": "Crops vigour/healthy crops (2 points)",
    "swahili": "Mazao yenye nguvu/mazao yenye afya (alama 2)"
  },
  {
    "english": "Wind Energy",
    "swahili": "Nishati ya Upepo"
  },
  {
    "english": "Description must be 40 characters or less",
    "swahili": "Maelezo lazima yawe na vibambo 40 au chini ya hapo"
  },
  {
    "english": "Description must be less than 40 characters",
    "swahili": "Maelezo lazima yawe chini ya herufi 40"
  },
  {
    "english": "Calcium nitrate",
    "swahili": "Nitrati ya kalsiamu"
  },
  {
    "english": "Potassium nitrate",
    "swahili": "Nitrati ya potasiamu"
  },
  {
    "english": "Potasium nitrate",
    "swahili": "Nitrati ya potasiamu"
  },
  {
    "english": "Sodium nitrate",
    "swahili": "Nitrati ya sodiamu"
  },
  {
    "english": "Geographical access point",
    "swahili": "Sehemu ya ufikiaji wa kijiografia"
  },
  {
    "english": "NPK",
    "swahili": "NPK"
  },
  {
    "english": "Compound NPK",
    "swahili": "Mchanganyiko wa NPK"
  },
  {
    "english": "Couch grass",
    "swahili": "Nyasi za kitanda"
  },
  {
    "english": "Elephant grass",
    "swahili": "Nyasi za tembo"
  },
  {
    "english": "Nutgrass",
    "swahili": "Nutgrass"
  },
  {
    "english": "Star grass",
    "swahili": "Nyasi ya nyota"
  },
  {
    "english": "Spear grass",
    "swahili": "Nyasi za mkuki"
  },
  {
    "english": "Thin",
    "swahili": "Nyembamba"
  },
  {
    "english": "Role Request",
    "swahili": "Ombi la Wajibu"
  },
  {
    "english": "Role Requests",
    "swahili": "Maombi ya Wajibu"
  },
  {
    "english": "Deactivate Account",
    "swahili": "Zima Akaunti"
  },
  {
    "english": "Deactivate",
    "swahili": "Zima"
  },
  {
    "english": "Add New coffeeVariety Tree Type",
    "swahili": "Ongeza kahawa Mpya Aina ya Mti"
  },
  {
    "english": "Add New Coffee Specie",
    "swahili": "Ongeza Aina Mpya ya Kahawa"
  },
  {
    "english": "Add New Coffee Specie",
    "swahili": "Ongeza Aina Mpya ya Kahawa"
  },
  {
    "english": "Add New windBreaker Tree Type",
    "swahili": "Ongeza Aina Mpya ya Mti wa WindBreaker"
  },
  {
    "english": "Add New horticultureInfo Tree Type",
    "swahili": "Ongeza Aina Mpya ya Miti ya HorticultureInfo"
  },
  {
    "english": "Add Department",
    "swahili": "Ongeza Idara"
  },
  {
    "english": "Activate",
    "swahili": "Washa"
  },
  {
    "english": "Add Membership Plan",
    "swahili": "Ongeza Mpango wa Uanachama"
  },
  {
    "english": "Add Membership Plan",
    "swahili": "Ongeza Mpango wa Uanachama"
  },
  {
    "english": "Add New",
    "swahili": "Ongeza Mpya"
  },
  {
    "english": "Add New shadeTree Tree Type",
    "swahili": "Ongeza Kivuli Kipya Aina ya Mti"
  },
  {
    "english": "Add New User",
    "swahili": "Ongeza Mtumiaji Mpya"
  },
  {
    "english": "Add Admin User",
    "swahili": "Ongeza Mtumiaji Msimamizi"
  },
  {
    "english": "UploAd Image/Video",
    "swahili": "PakiaTaswira/Video"
  },
  {
    "english": "Add Survey Question",
    "swahili": "Ongeza Swali la Utafiti"
  },
  {
    "english": "Add Membership",
    "swahili": "Ongeza Uanachama"
  },
  {
    "english": "EXTEND VALIDITY",
    "swahili": "ONGEZA UHAKIKA"
  },
  {
    "english": "BULK UPLOAD USERS",
    "swahili": "WATUMIAJI WENGI WA KUPAKIA"
  },
  {
    "english": "Show Data",
    "swahili": "Onyesha Data"
  },
  {
    "english": "Display in FAQ section",
    "swahili": "Onyesha katika sehemu ya Maswali Yanayoulizwa Mara kwa Mara"
  },
  {
    "english": "Activation Keys List",
    "swahili": "Orodha ya Vifunguo vya Uanzishaji"
  },
  {
    "english": "User Listing",
    "swahili": "Orodha ya Watumiaji"
  },
  {
    "english": "OTP is invalid.",
    "swahili": "OTP ni batili."
  },
  {
    "english": "OTP sent on email",
    "swahili": "OTP imetumwa kwa barua pepe"
  },
  {
    "english": "OTP sent successfully",
    "swahili": "OTP imetumwa kwa mafanikio"
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
    "english": "Pache Colis",
    "swahili": "Pache Colis"
  },
  {
    "english": "Pache Comum",
    "swahili": "Pache Comum"
  },
  {
    "english": "Cutlass",
    "swahili": "Kata"
  },
  {
    "english": "Order By\n",
    "swahili": "Agiza Kwa"
  },
  {
    "english": "Avocado (Kenya)",
    "swahili": "Parachichi (Kenya)"
  },
  {
    "english": "lb",
    "swahili": "LB"
  },
  {
    "english": "Pound",
    "swahili": "Pauni"
  },
  {
    "english": "Pounds",
    "swahili": "Pauni"
  },
  {
    "english": "Chloritic leaf margins",
    "swahili": "Mipaka ya majani ya kloridi"
  },
  {
    "english": "Poor quality inputs(seeds and fertilizers)",
    "swahili": "Pembejeo zisizo na ubora (mbegu na mbolea)"
  },
  {
    "english": "Organic inputs",
    "swahili": "Pembejeo za kikaboni"
  },
  {
    "english": "Inorganic inputs",
    "swahili": "Pembejeo zisizo za kawaida"
  },
  {
    "english": "Inadequate inputs (seeds and fertilizers)",
    "swahili": "Pembejeo zisizofaa (mbegu na mbolea)"
  },
  {
    "english": "First ploughing",
    "swahili": "Kwanza kulima"
  },
  {
    "english": "potassium",
    "swahili": "potasiamu"
  },
  {
    "english": "PotassiumUnit",
    "swahili": "Kitengo cha Potasiamu"
  },
  {
    "english": "Decrease animal death rate",
    "swahili": "Punguza kiwango cha vifo vya wanyama"
  },
  {
    "english": "Easy to work with (1 point)",
    "swahili": "Rahisi kufanya kazi na (pointi 1)"
  },
  {
    "english": "Orange, Yellow Bourbon",
    "swahili": "Chungwa, Bourbon ya Njano"
  },
  {
    "english": "Purplish and red pigment on leaves",
    "swahili": "Rangi ya zambarau na nyekundu kwenye majani"
  },
  {
    "english": "Refractometer",
    "swahili": "Refractometer"
  },
  {
    "english": "Regrowth",
    "swahili": "Ukuaji upya"
  },
  {
    "english": "Back",
    "swahili": "Nyuma"
  },
  {
    "english": "BACK",
    "swahili": "NYUMA"
  },
  {
    "english": "Edit",
    "swahili": "Hariri"
  },
  {
    "english": "Edit Admin Role",
    "swahili": "Badilisha Jukumu la Msimamizi"
  },
  {
    "english": "Edit Membership Plan",
    "swahili": "Hariri Mpango wa Uanachama"
  },
  {
    "english": "Edit User",
    "swahili": "Badilisha Mtumiaji"
  },
  {
    "english": "Edit App User",
    "swahili": "Badilisha Mtumiaji wa Programu"
  },
  {
    "english": "edit ticket",
    "swahili": "hariri tiketi"
  },
  {
    "english": "Pitchfork",
    "swahili": "Pitchfork"
  },
  {
    "english": "Irrigation records",
    "swahili": "Rekodi za umwagiliaji"
  },
  {
    "english": "ADVANCE REPORT",
    "swahili": "RIPOTI YA ADVANCE"
  },
  {
    "english": "Advanced Report is required",
    "swahili": "Ripoti ya Kina inahitajika"
  },
  {
    "english": "Farmer Selling Report",
    "swahili": "Ripoti ya Uuzaji wa Mkulima"
  },
  {
    "english": "Buying Station Report",
    "swahili": "Ripoti ya Kituo cha Kununua"
  },
  {
    "english": "Satellite Report is required",
    "swahili": "Ripoti ya Setilaiti inahitajika"
  },
  {
    "english": "Satellite Reports",
    "swahili": "Ripoti za Satellite"
  },
  {
    "english": "Satellite Reports Allowed ",
    "swahili": "Ripoti za Setilaiti Zinaruhusiwa"
  },
  {
    "english": "Satellite Reports are ready for download",
    "swahili": "Ripoti za Setilaiti ziko tayari kupakuliwa"
  },
  {
    "english": "Advanced Reports",
    "swahili": "Ripoti za Juu"
  },
  {
    "english": "Advanced Reports Allowed ",
    "swahili": "Ripoti za Kina Zinaruhusiwa"
  },
  {
    "english": "Role Updated",
    "swahili": "Jukumu Limesasishwa"
  },
  {
    "english": "rttrd",
    "swahili": "rttrd"
  },
  {
    "english": "Permissions",
    "swahili": "Ruhusa"
  },
  {
    "english": "Allowances",
    "swahili": "Posho"
  },
  {
    "english": "Permissions",
    "swahili": "Ruhusa"
  },
  {
    "english": "Permissions not Updated",
    "swahili": "Ruhusa hazijasasishwa"
  },
  {
    "english": "Permissions Updated",
    "swahili": "Ruhusa Zimesasishwa"
  },
  {
    "english": "Ruiru 11",
    "swahili": "Ruiru 11"
  },
  {
    "english": "Low soil fertility",
    "swahili": "Rutuba ya chini ya udongo"
  },
  {
    "english": "S795",
    "swahili": "S795"
  },
  {
    "english": "Reason for Extension",
    "swahili": "Sababu ya Kuongeza"
  },
  {
    "english": "Safflower",
    "swahili": "Safflower"
  },
  {
    "english": "Sagada",
    "swahili": "Sagada"
  },
  {
    "english": "Lettuce(Libya)",
    "swahili": "Lettuce (Libya)"
  },
  {
    "english": "Potassium magnesium sulphate",
    "swahili": "Sulphate ya magnesiamu ya potasiamu"
  },
  {
    "english": "SulphurUnit",
    "swahili": "Kitengo cha Sulphur"
  },
  {
    "english": "Untreated manure",
    "swahili": "Mbolea isiyotibiwa"
  },
  {
    "english": "Poultry litter",
    "swahili": "Takataka za kuku"
  },
  {
    "english": "Green manure (clover, pigeon peas, e.t.c)",
    "swahili": "Mbolea ya kijani (clover, mbaazi, n.k.)"
  },
  {
    "english": "Green manure (5 points)",
    "swahili": "Mbolea ya kijani (pointi 5)"
  },
  {
    "english": "Sheep farm yard manure",
    "swahili": "Mbolea ya shamba la kondoo"
  },
  {
    "english": "Goat farm yard manure",
    "swahili": "Mbolea ya shamba la mbuzi"
  },
  {
    "english": "Share via Email",
    "swahili": "Shiriki kupitia Barua pepe"
  },
  {
    "english": "Santos",
    "swahili": "Santos"
  },
  {
    "english": "Cankers",
    "swahili": "Saratani"
  },
  {
    "english": "Sarchimor",
    "swahili": "Sarchimor"
  },
  {
    "english": "Update",
    "swahili": "Sasisha"
  },
  {
    "english": "Update",
    "swahili": "Sasisha"
  },
  {
    "english": "Update coffeeVariety Tree Type",
    "swahili": "Sasisha aina ya mti wa kahawa"
  },
  {
    "english": "Update Coffee Specie",
    "swahili": "Sasisha Aina ya Kahawa"
  },
  {
    "english": "Update windBreaker Tree Type",
    "swahili": "Sasisha Aina ya Mti wa WindBreaker"
  },
  {
    "english": "Update horticultureInfo Tree Type",
    "swahili": "Sasisha Aina ya Mti wa HorticultureInfo"
  },
  {
    "english": "Update shadeTree Tree Type",
    "swahili": "Sasisha kivuliMti Aina ya Mti"
  },
  {
    "english": "Update Plantation Status",
    "swahili": "Sasisha Hali ya Upandaji miti"
  },
  {
    "english": "OK",
    "swahili": "sawa"
  },
  {
    "english": "Module Accessed",
    "swahili": "Moduli Imefikiwa"
  },
  {
    "english": "This field cannot be blank",
    "swahili": "Sehemu hii haiwezi kuwa tupu"
  },
  {
    "english": "This field is required",
    "swahili": "Sehemu hii inahitajika"
  },
  {
    "english": "Short internodes",
    "swahili": "Internodes fupi"
  },
  {
    "english": "ppm",
    "swahili": "ppm"
  },
  {
    "english": "Email can not be empty",
    "swahili": "Barua pepe haiwezi kuwa tupu"
  },
  {
    "english": "Crown",
    "swahili": "Taji"
  },
  {
    "english": "Sengon laut (Albizzia falcata)",
    "swahili": "Sengon laut (Albizzia falcata)"
  },
  {
    "english": "cm",
    "swahili": "sentimita"
  },
  {
    "english": "Shovel",
    "swahili": "Jembe"
  },
  {
    "english": "Farm",
    "swahili": "Shamba"
  },
  {
    "english": "Plantation",
    "swahili": "Upandaji miti"
  },
  {
    "english": "My farm",
    "swahili": "Shamba langu"
  },
  {
    "english": "My farm",
    "swahili": "Shamba langu"
  },
  {
    "english": "My Farm",
    "swahili": "Shamba langu"
  },
  {
    "english": "farm-ownership-type",
    "swahili": "aina ya umiliki wa shamba"
  },
  {
    "english": "Farm/Location",
    "swahili": "Shamba/Mahali"
  },
  {
    "english": "Silo",
    "swahili": "Silo"
  },
  {
    "english": "corms",
    "swahili": "corms"
  },
  {
    "english": "Direct injection",
    "swahili": "Sindano ya moja kwa moja"
  },
  {
    "english": "Stiff and weak stem",
    "swahili": "Shina ngumu na dhaifu"
  },
  {
    "english": "Function accessed",
    "swahili": "Chaguo za kukokotoa zimefikiwa"
  },
  {
    "english": "Ethiopian Sidama",
    "swahili": "Sidama wa Ethiopia"
  },
  {
    "english": "Day",
    "swahili": "Siku"
  },
  {
    "english": "I don't have a schedule",
    "swahili": "Sina ratiba"
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
    "english": "Soybean(Argentina)",
    "swahili": "Maharage ya Soya(Argentina)"
  },
  {
    "english": "Soybean(Bolivia)",
    "swahili": "Maharage ya Soya(Bolivia)"
  },
  {
    "english": "Soybean(Canada)",
    "swahili": "Maharage ya Soya(Kanada)"
  },
  {
    "english": "Soya (India)",
    "swahili": "Soya (India)"
  },
  {
    "english": "Soybean(Paraguay)",
    "swahili": "Soya (Paraguay)"
  },
  {
    "english": "Soybean(USA)",
    "swahili": "Maharage ya Soya(Marekani)"
  },
  {
    "english": "Buying Station ",
    "swahili": "Kituo cha Kununulia"
  },
  {
    "english": "Buying Station",
    "swahili": "Kituo cha Kununulia"
  },
  {
    "english": "SulawesiToraja Kalossi",
    "swahili": "SulawesiToraja Kalossi"
  },
  {
    "english": "Potassium sulphate",
    "swahili": "Sulphate ya potasiamu"
  },
  {
    "english": "Potasium sulphate",
    "swahili": "Sulphate ya potasiamu"
  },
  {
    "english": "SumatraMandheling and SumatraLintong",
    "swahili": "SumatraMandheling na SumatraLintong"
  },
  {
    "english": "Super phosphate",
    "swahili": "Superphosphate"
  },
  {
    "english": "Single superphosphate",
    "swahili": "Superphosphate moja"
  },
  {
    "english": "FAQ Question",
    "swahili": "Swali la Maswali Yanayoulizwa Mara kwa Mara"
  },
  {
    "english": "Question is required",
    "swahili": "Swali linahitajika"
  },
  {
    "english": "Activity log details",
    "swahili": "Maelezo ya kumbukumbu ya shughuli"
  },
  {
    "english": "Horticulture info deleted",
    "swahili": "Maelezo ya kilimo cha bustani yamefutwa"
  },
  {
    "english": "Activity Logs",
    "swahili": "Kumbukumbu za Shughuli"
  },
  {
    "english": "Activity Log",
    "swahili": "Kumbukumbu ya Shughuli"
  },
  {
    "english": "Additional Information Required",
    "swahili": "Taarifa ya Ziada Inahitajika"
  },
  {
    "english": "Requestor details",
    "swahili": "Maelezo ya mwombaji"
  },
  {
    "english": "Please enter the email address associated with your account.",
    "swahili": "Tafadhali ingiza anwani ya barua pepe inayohusishwa na akaunti yako."
  },
  {
    "english": "Please enter your new password.",
    "swahili": "Tafadhali weka nenosiri lako jipya."
  },
  {
    "english": "Please enter correct OTP.",
    "swahili": "Tafadhali weka OTP sahihi."
  },
  {
    "english": "Please enter OTP received on email/mobile",
    "swahili": "Tafadhali ingiza OTP iliyopokelewa kwa barua pepe/simu"
  },
  {
    "english": "Please enter the email address associated with your account.",
    "swahili": "Tafadhali ingiza anwani ya barua pepe inayohusishwa na akaunti yako."
  },
  {
    "english": "Please enter your mobile number associated with your account.",
    "swahili": "Tafadhali weka nambari yako ya simu inayohusishwa na akaunti yako."
  },
  {
    "english": "You can contact us!",
    "swahili": "Unaweza kuwasiliana nasi!"
  },
  {
    "english": "Please select the Role above to show permissions",
    "swahili": "Tafadhali chagua Jukumu hapo juu ili kuonyesha ruhusa"
  },
  {
    "english": "Please try after sometime",
    "swahili": "Tafadhali jaribu baada ya muda fulani"
  },
  {
    "english": "Please upload the user data file.",
    "swahili": "Tafadhali pakia faili ya data ya mtumiaji."
  },
  {
    "english": "Please create admin role using the",
    "swahili": "Tafadhali tengeneza jukumu la msimamizi kwa kutumia"
  },
  {
    "english": "Please enter your mobile number associated with your account. Password details will be sent to phone number.",
    "swahili": "Tafadhali weka nambari yako ya simu inayohusishwa na akaunti yako. Maelezo ya nenosiri yatatumwa kwa nambari ya simu."
  },
  {
    "english": "Please enter valid credentials",
    "swahili": "Tafadhali weka kitambulisho halali"
  },
  {
    "english": "Please enter valid credentials.",
    "swahili": "Tafadhali weka kitambulisho halali."
  },
  {
    "english": "Please generate the activation keyss",
    "swahili": "Tafadhali tengeneza vitufe vya kuwezesha"
  },
  {
    "english": "Please generate the activation keyss using the Generate Activation Keyss",
    "swahili": "Tafadhali tengeneza vitufe vya kuwezesha kwa kutumia Funguo za Uanzishaji"
  },
  {
    "english": "search",
    "swahili": "tafuta"
  },
  {
    "english": "browse",
    "swahili": "kuvinjari"
  },
  {
    "english": "browse",
    "swahili": "kuvinjari"
  },
  {
    "english": "Tonnes",
    "swahili": "Tani"
  },
  {
    "english": "Tonnage",
    "swahili": "Tani"
  },
  {
    "english": "Tonne per Acre",
    "swahili": "Tani kwa Ekari"
  },
  {
    "english": "Tonnes per Acre",
    "swahili": "Tani kwa Ekari"
  },
  {
    "english": "Tonne per Hectare",
    "swahili": "Tani kwa Hekta"
  },
  {
    "english": "Tonnes per Hectare",
    "swahili": "Tani kwa Hekta"
  },
  {
    "english": "tonne/Acre",
    "swahili": "tani/Ekari"
  },
  {
    "english": "tonnes/acre",
    "swahili": "tani/ekari"
  },
  {
    "english": "Tonnes/Acres",
    "swahili": "Tani/Ekari"
  },
  {
    "english": "tonne/ha",
    "swahili": "tani/ha"
  },
  {
    "english": "Tonnes/Hectar",
    "swahili": "Tani/Hekta"
  },
  {
    "english": "tonnes/hectare",
    "swahili": "tani/hekta"
  },
  {
    "english": "Date",
    "swahili": "Tarehe"
  },
  {
    "english": "Date Descending",
    "swahili": "Tarehe ya Kushuka"
  },
  {
    "english": "Date Ascending",
    "swahili": "Tarehe ya Kupanda"
  },
  {
    "english": "Requested Date",
    "swahili": "Tarehe Iliyoomba"
  },
  {
    "english": "Requested date and time",
    "swahili": "Tarehe na wakati ulioombwa"
  },
  {
    "english": "Due Date",
    "swahili": "Tarehe ya kukamilisha"
  },
  {
    "english": "View",
    "swahili": "Tazama"
  },
  {
    "english": "View all uploaded files",
    "swahili": "Tazama faili zote zilizopakiwa"
  },
  {
    "english": "View Permissions",
    "swahili": "Tazama Ruhusa"
  },
  {
    "english": "VIEW ACTIVATION KEYS",
    "swahili": "TAZAMA VIFUNGUO VYA kuwezesha"
  },
  {
    "english": "Appoint Sales Manager",
    "swahili": "Teua Meneja wa Uuzaji"
  },
  {
    "english": "Assign Sales Manager",
    "swahili": "Weka Meneja Mauzo"
  },
  {
    "english": "CONFIRM",
    "swahili": "THIBITISHA"
  },
  {
    "english": "Confirm Password",
    "swahili": "Thibitisha Nenosiri"
  },
  {
    "english": "Ticket For",
    "swahili": "Tiketi Kwa"
  },
  {
    "english": "Tickets",
    "swahili": "Tiketi"
  },
  {
    "english": "Tickets",
    "swahili": "Tiketi"
  },
  {
    "english": "Ticket deleted successfully",
    "swahili": "Tikiti imefutwa"
  },
  {
    "english": "Ticket created successfully",
    "swahili": "Tikiti imeundwa"
  },
  {
    "english": "Timor, Arabusta",
    "swahili": "Timor, Arabusta"
  },
  {
    "english": "GENERATE ACTIVATION KEYS",
    "swahili": "TENGENEZA VIFUNGUO VYA kuwezesha"
  },
  {
    "english": "GENERATE KEYS",
    "swahili": "TENGENEZA FUNGUO"
  },
  {
    "english": "Acceptable range of characters ",
    "swahili": "Aina mbalimbali zinazokubalika za wahusika"
  },
  {
    "english": "Auto-Logout from app",
    "swahili": "Ondoka kiotomatiki kutoka kwa programu"
  },
  {
    "english": "Website",
    "swahili": "Tovuti"
  },
  {
    "english": "Triple superphosphate",
    "swahili": "Superphosphate mara tatu"
  },
  {
    "english": "SEND EMAIL",
    "swahili": "KUTUMA BARUA PEPE"
  },
  {
    "english": "Export as CSV",
    "swahili": "Hamisha kama CSV"
  },
  {
    "english": "Resend OTP",
    "swahili": "Tuma tena OTP"
  },
  {
    "english": "SEND NOW",
    "swahili": "TUMA SASA"
  },
  {
    "english": "Fruit deformation",
    "swahili": "Deformation ya matunda"
  },
  {
    "english": "Typica",
    "swahili": "Aina"
  },
  {
    "english": "Dayflower",
    "swahili": "Maua ya mchana"
  },
  {
    "english": "My Geofences",
    "swahili": "Geofences yangu"
  },
  {
    "english": "My Geofences",
    "swahili": "Geofences yangu"
  },
  {
    "english": "Membership",
    "swahili": "Uanachama"
  },
  {
    "english": "Valid Memberships",
    "swahili": "Uanachama Halali"
  },
  {
    "english": "Membership Added successfully",
    "swahili": "Uanachama Umeongezwa"
  },
  {
    "english": "Membership updated successfully",
    "swahili": "Uanachama umesasishwa"
  },
  {
    "english": "Membership deleted successfully",
    "swahili": "Uanachama umefutwa"
  },
  {
    "english": "Membership updated successfully",
    "swahili": "Uanachama umesasishwa"
  },
  {
    "english": "Membership created successfully",
    "swahili": "Uanachama umeundwa"
  },
  {
    "english": "Subscription Up To",
    "swahili": "Usajili Hadi"
  },
  {
    "english": "General inquiry",
    "swahili": "Uchunguzi wa jumla"
  },
  {
    "english": "Small leaf size",
    "swahili": "Ukubwa mdogo wa majani"
  },
  {
    "english": "Dry compacted soil",
    "swahili": "Kavu udongo uliounganishwa"
  },
  {
    "english": "Loose sandy soil",
    "swahili": "udongo huru wa mchanga"
  },
  {
    "english": "Water logged",
    "swahili": "Maji yameingia"
  },
  {
    "english": "Silt soil",
    "swahili": "Udongo wa silt"
  },
  {
    "english": "Sandy soil",
    "swahili": "Udongo wa mchanga"
  },
  {
    "english": "Clay soil",
    "swahili": "Udongo wa udongo"
  },
  {
    "english": "Peat soil",
    "swahili": "Udongo wa peat"
  },
  {
    "english": "Loam soil",
    "swahili": "Udongo wa udongo"
  },
  {
    "english": "Light coloured  soil",
    "swahili": "Udongo wa rangi nyepesi"
  },
  {
    "english": "Dark coloured  soil (1 point)",
    "swahili": "Udongo wa rangi nyeusi (pointi 1)"
  },
  {
    "english": "Moist soil (1 point)",
    "swahili": "Udongo unyevu (pointi 1)"
  },
  {
    "english": "soil-risk",
    "swahili": "hatari ya udongo"
  },
  {
    "english": "soil-organic-input",
    "swahili": "udongo-kikaboni-pembejeo"
  },
  {
    "english": "soil-testing-schedule",
    "swahili": "ratiba ya kupima udongo"
  },
  {
    "english": "soil-application-stage",
    "swahili": "udongo-maombi-hatua"
  },
  {
    "english": "soil-application-method",
    "swahili": "udongo-matumizi-mbinu"
  },
  {
    "english": "soil-description",
    "swahili": "udongo-maelezo"
  },
  {
    "english": "soil-fertilizer",
    "swahili": "udongo-mbolea"
  },
  {
    "english": "soil-input-type",
    "swahili": "udongo-pembejeo-aina"
  },
  {
    "english": "soil-record",
    "swahili": "rekodi ya udongo"
  },
  {
    "english": "soil-practice",
    "swahili": "udongo-mazoezi"
  },
  {
    "english": "Uganda",
    "swahili": "Uganda"
  },
  {
    "english": "Pest Disease",
    "swahili": "Ugonjwa wa Wadudu"
  },
  {
    "english": "Pest Disease",
    "swahili": "Ugonjwa wa Wadudu"
  },
  {
    "english": "Membership Validity",
    "swahili": "Uhalali wa Uanachama"
  },
  {
    "english": "Membership Validity",
    "swahili": "Uhalali wa Uanachama"
  },
  {
    "english": "Extended Membership Validity",
    "swahili": "Uhalali wa Uanachama Ulioongezwa"
  },
  {
    "english": "message",
    "swahili": "ujumbe"
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
