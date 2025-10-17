"use strict";

const data = [
  {
    english: "Area Of Request",
    swahili: "Eneo la Ombi",
  },
  {
    english: " Select a role to view permissions.",
    swahili: "Chagua jukumu ili kuona ruhusa.",
  },
  {
    english: "•Red spider mite",
    swahili: "•Nyekundu wa buibui",
  },
  {
    english: "(Download the sample .csv file to follow the structure)",
    swahili: "(Pakua sampuli ya faili ya .csv kufuata muundo)",
  },
  {
    english: "Day/s",
    swahili: "Siku",
  },
  {
    english: "Stem elongation",
    swahili: "Urefu wa shina",
  },
  {
    english: "Stem elongation",
    swahili: "Urefu wa shina",
  },
  {
    english: "Stem elongation",
    swahili: "Urefu wa shina",
  },
  {
    english: "Stem rust",
    swahili: "Kutu ya shina",
  },
  {
    english: "Stem rust",
    swahili: "Kutu ya shina",
  },
  {
    english: "Tobacco caterpillar",
    swahili: "Kiwavi wa tumbaku",
  },
  {
    english: "set",
    swahili: "kuweka",
  },
  {
    english: "set",
    swahili: "kuweka",
  },
  {
    english: "Sesame leafhopper",
    swahili: "Ufuta wa majani ya ufuta",
  },
  {
    english: "Sesame (ethopia)",
    swahili: "Ufuta (ethopia)",
  },
  {
    english: "Oil palm",
    swahili: "Mafuta ya mitende",
  },
  {
    english: "Oil palm (Brazil)",
    swahili: "Mafuta ya mawese (Brazil)",
  },
  {
    english: "Oil palm (Indonesia)",
    swahili: "Mafuta ya mawese (Indonesia)",
  },
  {
    english: "unmapped",
    swahili: "haijapangwa",
  },
  {
    english: "Sickle",
    swahili: "Mundu",
  },
  {
    english: "Sickle",
    swahili: "Mundu",
  },
  {
    english: "Granulator/Pulverizer",
    swahili: "Granulator/Pulverizer",
  },
  {
    english: "Termites",
    swahili: "Mchwa",
  },
  {
    english: "Dehorner",
    swahili: "Dehorner",
  },
  {
    english: "Dehorner",
    swahili: "Dehorner",
  },
  {
    english: "Milking machine",
    swahili: "Mashine ya kukamua",
  },
  {
    english: "Milking machine",
    swahili: "Mashine ya kukamua",
  },
  {
    english: "Milk stage",
    swahili: "Hatua ya maziwa",
  },
  {
    english: "Milk stage",
    swahili: "Hatua ya maziwa",
  },
  {
    english: "Second Vegetative phase",
    swahili: "Awamu ya pili ya mboga",
  },
  {
    english: "Second Vegetative phase",
    swahili: "Awamu ya pili ya mboga",
  },
  {
    english: "Second Vegetative phase",
    swahili: "Awamu ya pili ya mboga",
  },
  {
    english: "Second Vegetative phase",
    swahili: "Awamu ya pili ya mboga",
  },
  {
    english: "Wheelbarrow",
    swahili: "Mkokoteni",
  },
  {
    english: "Wheelbarrow",
    swahili: "Mkokoteni",
  },
  {
    english: "Thermometer",
    swahili: "Kipima joto",
  },
  {
    english: "Rosette",
    swahili: "Rosette",
  },
  {
    english: "Rosette",
    swahili: "Rosette",
  },
  {
    english: "Bulbing stage",
    swahili: "Hatua ya balbu",
  },
  {
    english: "Bulbing stage",
    swahili: "Hatua ya balbu",
  },
  {
    english: "Bags",
    swahili: "Mifuko",
  },
  {
    english: "Bags",
    swahili: "Mifuko",
  },
  {
    english: "Thread blight",
    swahili: "Uharibifu wa thread",
  },
  {
    english: "Blister beetle",
    swahili: "Mende ya malengelenge",
  },
  {
    english: "Crop Stages",
    swahili: "Hatua za Mazao",
  },
  {
    english: "Crop production equipment",
    swahili: "Vifaa vya uzalishaji wa mazao",
  },
  {
    english: "Crop production equipment",
    swahili: "Vifaa vya uzalishaji wa mazao",
  },
  {
    english: "Harvest and Storage",
    swahili: "Mavuno na Uhifadhi",
  },
  {
    english: "Harvest stage",
    swahili: "Hatua ya mavuno",
  },
  {
    english: "Harvest stage",
    swahili: "Hatua ya mavuno",
  },
  {
    english: "Harvest stage",
    swahili: "Hatua ya mavuno",
  },
  {
    english: "Harvesting",
    swahili: "Kuvuna",
  },
  {
    english: "Harvesting",
    swahili: "Kuvuna",
  },
  {
    english: "Harvesting",
    swahili: "Kuvuna",
  },
  {
    english: "Harvesting",
    swahili: "Kuvuna",
  },
  {
    english: "Harvesting",
    swahili: "Kuvuna",
  },
  {
    english: "Harvesting",
    swahili: "Kuvuna",
  },
  {
    english: "Crop establishment stage",
    swahili: "Hatua ya uanzishaji wa mazao",
  },
  {
    english: "Cropping Systems",
    swahili: "Mifumo ya Kupanda",
  },
  {
    english: "fruits",
    swahili: "matunda",
  },
  {
    english: "Fruit development",
    swahili: "Maendeleo ya matunda",
  },
  {
    english: "Fruit rot\\r",
    swahili: "Kuoza kwa matunda\\r",
  },
  {
    english: "Fruit fly",
    swahili: "Kuruka kwa matunda",
  },
  {
    english: "Fruit development stage",
    swahili: "Hatua ya ukuaji wa matunda",
  },
  {
    english: "Fruiting stage",
    swahili: "Hatua ya matunda",
  },
  {
    english: "beans",
    swahili: "maharage",
  },
  {
    english: "Gall fly",
    swahili: "Nyongo inaruka",
  },
  {
    english: "Pod filling",
    swahili: "Kujaza ganda",
  },
  {
    english: "Pod development",
    swahili: "Ukuzaji wa ganda",
  },
  {
    english: "Fruit formation",
    swahili: "Uundaji wa matunda",
  },
  {
    english: "Fruit spotting",
    swahili: "Kuonekana kwa matunda",
  },
  {
    english: "Fruit spotting",
    swahili: "Kuonekana kwa matunda",
  },
  {
    english: "Fruit RustThrips",
    swahili: "Matunda RustThrips",
  },
  {
    english: "Phyllody",
    swahili: "Phyllody",
  },
  {
    english: "Phytophthora",
    swahili: "Phytophthora",
  },
  {
    english: "Phytophthora Damping Off and Root Rot",
    swahili: "Phytophthora Damping Off na Kuoza kwa Mizizi",
  },
  {
    english: "Frosty Pod",
    swahili: "Frosty Pod",
  },
  {
    english: "Freezers/Fridges",
    swahili: "Friji/Friji",
  },
  {
    english: "Freezers/Fridges",
    swahili: "Friji/Friji",
  },
  {
    english: "Flowering / Reproductive phase",
    swahili: "Awamu ya maua / uzazi",
  },
  {
    english: "Flowering / Reproductive phase",
    swahili: "Awamu ya maua / uzazi",
  },
  {
    english: "Flowering / Reproductive phase",
    swahili: "Awamu ya maua / uzazi",
  },
  {
    english: "Flowering / Reproductive phase",
    swahili: "Awamu ya maua / uzazi",
  },
  {
    english: "Flowering / Reproductive phase",
    swahili: "Awamu ya maua / uzazi",
  },
  {
    english: "Flowering / Reproductive phase",
    swahili: "Awamu ya maua / uzazi",
  },
  {
    english: "Flowering / Reproductive phase",
    swahili: "Awamu ya maua / uzazi",
  },
  {
    english: "Flower initiation and flowering stage",
    swahili: "Hatua ya kuanza kwa maua na maua",
  },
  {
    english: "Flowering stage",
    swahili: "Hatua ya maua",
  },
  {
    english: "Flowering stage",
    swahili: "Hatua ya maua",
  },
  {
    english: "Flowering stage:",
    swahili: "Hatua ya maua:",
  },
  {
    english: "Flatid Plant hoppers",
    swahili: "Flatid Plant hoppers",
  },
  {
    english: "Borer",
    swahili: "Mpishi",
  },
  {
    english: "Burdizzo",
    swahili: "Burdizzo",
  },
  {
    english: "Burdizzo",
    swahili: "Burdizzo",
  },
  {
    english: "Bulb initiation",
    swahili: "Kuanzishwa kwa balbu",
  },
  {
    english: "Bulb initiation",
    swahili: "Kuanzishwa kwa balbu",
  },
  {
    english: "Bulb Mites",
    swahili: "Utitiri wa Balbu",
  },
  {
    english: "Bulb development",
    swahili: "Maendeleo ya balbu",
  },
  {
    english: "Bulb development",
    swahili: "Maendeleo ya balbu",
  },
  {
    english: "Growing point differentiation (GPD) stage",
    swahili: "Hatua ya utofautishaji wa pointi za kukua (GPD).",
  },
  {
    english: "Binder or Flocculant",
    swahili: "Binder au Flocculant",
  },
  {
    english: "Pearl Millet",
    swahili: "Mtama wa Lulu",
  },
  {
    english: "Bunchy Top",
    swahili: "Bunchy Juu",
  },
  {
    english: "Bunchy top virus",
    swahili: "Virusi vya juu vya bunchy",
  },
  {
    english: "Bean filling stage",
    swahili: "Hatua ya kujaza maharagwe",
  },
  {
    english: "Bean rust",
    swahili: "Kutu ya maharagwe",
  },
  {
    english: "Bean Aphids",
    swahili: "Vidukari vya Maharage",
  },
  {
    english: "Seeder",
    swahili: "Mkulima",
  },
  {
    english: "Beans (Brazil)",
    swahili: "Maharage (Brazili)",
  },
  {
    english: "Basal Rot",
    swahili: "Kuoza kwa Basal",
  },
  {
    english: "Basal application",
    swahili: "Maombi ya msingi",
  },
  {
    english: "Ox drawn plough",
    swahili: "Ng'ombe jembe la kukokotwa",
  },
  {
    english: "Ox drawn plough",
    swahili: "Ng'ombe jembe la kukokotwa",
  },
  {
    english: "Boll formation",
    swahili: "Uundaji wa boll",
  },
  {
    english: "Diseases",
    swahili: "Magonjwa",
  },
  {
    english: "Banded leaf and sheath blight",
    swahili: "Uharibifu wa jani na sheath",
  },
  {
    english: "brinjal",
    swahili: "brinjal",
  },
  {
    english: "Bacterial brown spot",
    swahili: "Doa ya hudhurungi ya bakteria",
  },
  {
    english: "Bacterial leaf spot",
    swahili: "Doa ya majani ya bakteria",
  },
  {
    english: "battery",
    swahili: "betri",
  },
  {
    english: "Sowing/Planting Report",
    swahili: "Ripoti ya Kupanda/Kupanda",
  },
  {
    english: "Branding",
    swahili: "Kuweka chapa",
  },
  {
    english: "Branding iron",
    swahili: "chuma chapa",
  },
  {
    english: "Presence of droppings",
    swahili: "Uwepo wa kinyesi",
  },
  {
    english: "Presence of droppings",
    swahili: "Uwepo wa kinyesi",
  },
  {
    english: "Boot stage",
    swahili: "Hatua ya boot",
  },
  {
    english: "Boot stage",
    swahili: "Hatua ya boot",
  },
  {
    english: "Stalk rot",
    swahili: "Kuoza kwa bua",
  },
  {
    english: "Damping Off: Pythium aphanidermatum P. debaryanum and P. ultimum",
    swahili: "Damping Off: Pythium aphanidermatum P. debaryanum na P. ultimum",
  },
  {
    english: "Disbudder",
    swahili: "Disbudder",
  },
  {
    english: "Disbudder",
    swahili: "Disbudder",
  },
  {
    english: "Diesel",
    swahili: "Dizeli",
  },
  {
    english: "Diesel",
    swahili: "Dizeli",
  },
  {
    english: "Dying of the new leaves",
    swahili: "Kufa kwa majani mapya",
  },
  {
    english: "Dying of the new leaves",
    swahili: "Kufa kwa majani mapya",
  },
  {
    english: "Sorghum ( Nigeria )",
    swahili: "Mtama (Nigeria)",
  },
  {
    english: "Weeding Report",
    swahili: "Ripoti ya palizi",
  },
  {
    english: "Weeding date",
    swahili: "Tarehe ya palizi",
  },
  {
    english: "Weeding Method",
    swahili: "Mbinu ya Palizi",
  },
  {
    english: "Nematode",
    swahili: "Nematode",
  },
  {
    english: "Manual",
    swahili: "Mwongozo",
  },
  {
    english: "Personal",
    swahili: "Binafsi",
  },
  {
    english: "Knapsack sprayer",
    swahili: "Kinyunyizio cha vifurushi",
  },
  {
    english: "Blue butterfly",
    swahili: "Kipepeo ya bluu",
  },
  {
    english: "Nematodes",
    swahili: "Nematodes",
  },
  {
    english: "Lemon",
    swahili: "Ndimu",
  },
  {
    english: "Lemon (Brazil)",
    swahili: "Limao (Brazili)",
  },
  {
    english: "Lemon (India)",
    swahili: "Ndimu (India)",
  },
  {
    english: "Lemon Scab",
    swahili: "Lemon Scab",
  },
  {
    english: "Blight",
    swahili: "Blight",
  },
  {
    english: "Necrotic spots",
    swahili: "Matangazo ya Necrotic",
  },
  {
    english: "Necrotic spots",
    swahili: "Matangazo ya Necrotic",
  },
  {
    english: "Manual Labour",
    swahili: "Kazi ya Mwongozo",
  },
  {
    english: "Physiological maturity",
    swahili: "Ukomavu wa kisaikolojia",
  },
  {
    english: "Branching",
    swahili: "Kuweka matawi",
  },
  {
    english: "Branching",
    swahili: "Kuweka matawi",
  },
  {
    english: "Full bloom/flower in top two nodes stage",
    swahili: "Chanua/maua kamili katika hatua ya vifundo viwili vya juu",
  },
  {
    english: "Shield scale\\n",
    swahili: "Mizani ya ngao\\n",
  },
  {
    english: "Shoot and capsule borer",
    swahili: "Risasi na kipekecha kibonge",
  },
  {
    english: "White mold",
    swahili: "Mold nyeupe",
  },
  {
    english: "White mold",
    swahili: "Mold nyeupe",
  },
  {
    english: "White rot",
    swahili: "Kuoza nyeupe",
  },
  {
    english: "White fly",
    swahili: "Nzi mweupe",
  },
  {
    english: "White mold \\n",
    swahili: "Ukungu mweupe \\n",
  },
  {
    english: "White grub",
    swahili: "Nguruwe nyeupe",
  },
  {
    english: "White scale",
    swahili: "Mizani nyeupe",
  },
  {
    english: "Sett rot",
    swahili: "Weka kuoza",
  },
  {
    english: "Inns",
    swahili: "Nyumba za kulala wageni",
  },
  {
    english: "Cleared",
    swahili: "Imefutwa",
  },
  {
    english: "Cleared",
    swahili: "Imefutwa",
  },
  {
    english: "General Crop Information",
    swahili: "Taarifa za Jumla za Mazao",
  },
  {
    english: "General Information Report",
    swahili: "Taarifa ya Taarifa ya Jumla",
  },
  {
    english: "Type of cultural/mechanical/manual method",
    swahili: "Aina ya njia ya kitamaduni/mitambo/ya mwongozo",
  },
  {
    english: "Group equipment",
    swahili: "Vifaa vya kikundi",
  },
  {
    english: "Plant wilting",
    swahili: "Kunyauka kwa mmea",
  },
  {
    english: "Plant wilting",
    swahili: "Kunyauka kwa mmea",
  },
  {
    english: "Plant establishment stage",
    swahili: "Hatua ya uanzishwaji wa mimea",
  },
  {
    english: "Plant lice (Aphids)",
    swahili: "Chawa wa mimea (Aphids)",
  },
  {
    english: "Vascular Streak Dieback",
    swahili: "Dieback ya Mshindo wa Mishipa",
  },
  {
    english: "Active tillering stage",
    swahili: "Hatua inayotumika ya kulima",
  },
  {
    english: "Active tillering stage",
    swahili: "Hatua inayotumika ya kulima",
  },
  {
    english: "Siliqua stage",
    swahili: "Hatua ya siliqua",
  },
  {
    english: "Irrigation Report",
    swahili: "Ripoti ya Umwagiliaji",
  },
  {
    english: "Irrigation Management",
    swahili: "Usimamizi wa Umwagiliaji",
  },
  {
    english: "Citrus Canker",
    swahili: "Saratani ya Citrus",
  },
  {
    english: "Citrus Psyllid",
    swahili: "Psyllid ya Citrus",
  },
  {
    english: "Safflower caterpillar: Perigaea capensis",
    swahili: "Safflower caterpillar: Perigaea capensis",
  },
  {
    english: "apple",
    swahili: "tufaha",
  },
  {
    english: "Cercospora leaf spot",
    swahili: "Mahali pa majani ya Cercospora",
  },
  {
    english: "Sorghum downy mildew",
    swahili: "Ukungu wa mtama",
  },
  {
    english: "Sorghum grain mould",
    swahili: "Ukungu wa nafaka ya mtama",
  },
  {
    english: "Sandy loam soil",
    swahili: "Udongo wa udongo wa mchanga",
  },
  {
    english: "Watering can",
    swahili: "Kumwagilia unaweza",
  },
  {
    english: "Watering can",
    swahili: "Kumwagilia unaweza",
  },
  {
    english: "Drying oven",
    swahili: "Kukausha tanuri",
  },
  {
    english: "Soybean(Bolivia)",
    swahili: "Maharage ya Soya(Bolivia)",
  },
  {
    english: "Soybean (Brazil)",
    swahili: "Maharage ya Soya (Brazil)",
  },
  {
    english: "Soybean(India)",
    swahili: "Maharage ya Soya(India)",
  },
  {
    english: "Soybean(Canada)",
    swahili: "Maharage ya Soya(Kanada)",
  },
  {
    english: "Soybean(Argentina)",
    swahili: "Maharage ya Soya(Argentina)",
  },
  {
    english: "Soybean(USA)",
    swahili: "Maharage ya Soya(Marekani)",
  },
  {
    english: "Soybean(Paraguay)",
    swahili: "Soya (Paraguay)",
  },
  {
    english: "Soybean brown stem rot",
    swahili: "Kuoza kwa shina la maharagwe ya soya",
  },
  {
    english: "Soybean Rust",
    swahili: "Kutu ya Soya",
  },
  {
    english: "Soybean Mosaic",
    swahili: "Mosaic ya Soya",
  },
  {
    english: "Septoria leaf spot",
    swahili: "Sehemu ya majani ya Septoria",
  },
  {
    english: "Cotton American boll worm",
    swahili: "Pamba American boll minyoo",
  },
  {
    english: "Cotton Pink boll worm",
    swahili: "Cotton Pink boll worm",
  },
  {
    english: "Sunflower (Argentina)",
    swahili: "Alizeti (Argentina)",
  },
  {
    english: "Sunflower beetle",
    swahili: "Mende ya alizeti",
  },
  {
    english: "Slasher",
    swahili: "Slasher",
  },
  {
    english: "Slasher",
    swahili: "Slasher",
  },
  {
    english: "Scale Insects",
    swahili: "Wadudu wadogo",
  },
  {
    english: "Scale Insects:",
    swahili: "Wadudu wadogo:",
  },
  {
    english: "Screen",
    swahili: "Skrini",
  },
  {
    english: "Drying machines",
    swahili: "Mashine ya kukausha",
  },
  {
    english: "dry",
    swahili: "kavu",
  },
  {
    english: "Dry beans",
    swahili: "Maharage kavu",
  },
  {
    english: "Dry beans (brazil)",
    swahili: "Maharage makavu (brazil)",
  },
  {
    english: "Dry Root Rot and Leaf Blight",
    swahili: "Kuoza kwa Mizizi Kavu na Blight ya Majani",
  },
  {
    english: "Stunted/poor growth",
    swahili: "Ukuaji duni / duni",
  },
  {
    english: "Stunted/poor growth",
    swahili: "Ukuaji duni / duni",
  },
  {
    english: "Stolon formation stage",
    swahili: "Hatua ya malezi ya Stolon",
  },
  {
    english: "Stem fly",
    swahili: "Kuruka kwa shina",
  },
  {
    english: "Stem borer",
    swahili: "Kipekecha shina",
  },
  {
    english: "Stem canker",
    swahili: "Uvimbe wa shina",
  },
  {
    english: "Stage 3 (vegetative growth pre-flowering)",
    swahili: "Hatua ya 3 (ukuaji wa mimea kabla ya maua)",
  },
  {
    english: "Stage 8 (Harvest)",
    swahili: "Hatua ya 8 (Mavuno)",
  },
  {
    english: "Self pruning stage",
    swahili: "Hatua ya kujipogoa mwenyewe",
  },
  {
    english: "Self-propelled sprayer",
    swahili: "Kinyunyizio cha kujisukuma mwenyewe",
  },
  {
    english: "Late bud",
    swahili: "Chipukizi marehemu",
  },
  {
    english: "Storage Report",
    swahili: "Ripoti ya Hifadhi",
  },
  {
    english: "Storage containers",
    swahili: "Vyombo vya kuhifadhi",
  },
  {
    english: "Storage containers",
    swahili: "Vyombo vya kuhifadhi",
  },
  {
    english: "Damping off / Root Rot",
    swahili: "Damping off / Kuoza kwa Mizizi",
  },
  {
    english: "Grand growth/elongation",
    swahili: "Ukuaji mkubwa / urefu",
  },
  {
    english: "Grand growth/elongation",
    swahili: "Ukuaji mkubwa / urefu",
  },
  {
    english: "Brown rot",
    swahili: "Kuoza kwa hudhurungi",
  },
  {
    english: "Brown stripe downy mildew",
    swahili: "Ukungu wa rangi ya kahawia",
  },
  {
    english: "Land Preparation Report",
    swahili: "Ripoti ya Maandalizi ya Ardhi",
  },
  {
    english: "Land Preparation and Sowing",
    swahili: "Maandalizi ya Ardhi na Kupanda",
  },
  {
    english: "Land Preparation and Planting",
    swahili: "Maandalizi na Upandaji Ardhi",
  },
  {
    english: "Soil Management Report",
    swahili: "Ripoti ya Usimamizi wa Udongo",
  },
  {
    english: "Rice tungro virus",
    swahili: "Virusi vya tungro ya mchele",
  },
  {
    english: "Ring applicator",
    swahili: "Mwombaji wa pete",
  },
  {
    english: "Ring applicator",
    swahili: "Mwombaji wa pete",
  },
  {
    english: "Ridge plough",
    swahili: "Jembe la matuta",
  },
  {
    english: "Ridge plough",
    swahili: "Jembe la matuta",
  },
  {
    english: "Rhodes",
    swahili: "Rhodes",
  },
  {
    english: "2nd cut of rhodes grass",
    swahili: "Kata ya 2 ya nyasi za rhodes",
  },
  {
    english: "Disease Management",
    swahili: "Udhibiti wa Magonjwa",
  },
  {
    english: "Disease Management",
    swahili: "Udhibiti wa Magonjwa",
  },
  {
    english: "Disease Management",
    swahili: "Udhibiti wa Magonjwa",
  },
  {
    english: "Disease Management Report",
    swahili: "Ripoti ya Usimamizi wa Magonjwa",
  },
  {
    english: "Rapeseed",
    swahili: "Mbegu za ubakaji",
  },
  {
    english: "Rapeseed (India)",
    swahili: "Mbakaji (India)",
  },
  {
    english: "Rapeseed (Canada)",
    swahili: "Mbakaji (Kanada)",
  },
  {
    english: "Rapeseed (China)",
    swahili: "Mbakaji (Uchina)",
  },
  {
    english: "Rapeseed ( European Union )",
    swahili: "Rapeseed ( Umoja wa Ulaya)",
  },
  {
    english: "Planting",
    swahili: "Kupanda",
  },
  {
    english: "Planting",
    swahili: "Kupanda",
  },
  {
    english: "Planting",
    swahili: "Kupanda",
  },
  {
    english: "Rosette stage",
    swahili: "Hatua ya Rosette",
  },
  {
    english: "Ratoon stunting",
    swahili: "Ratoon kudumaa",
  },
  {
    english: "Presence of larvae",
    swahili: "Uwepo wa mabuu",
  },
  {
    english: "Presence of larvae",
    swahili: "Uwepo wa mabuu",
  },
  {
    english: "Red rot",
    swahili: "Kuoza nyekundu",
  },
  {
    english: "Garlic (Zambia)",
    swahili: "Kitunguu saumu (Zambia)",
  },
  {
    english: "Leaf Blight (Blast)",
    swahili: "Uvimbe wa Majani (Mlipuko)",
  },
  {
    english: "Leaf spot and shot hole",
    swahili: "Doa la majani na shimo la risasi",
  },
  {
    english: "Leaf webber or roller and capsule borer\\n",
    swahili: "Webber ya majani au roller na kipekecha kapsuli\\n",
  },
  {
    english: "Lorry",
    swahili: "Lori",
  },
  {
    english: "Lorry",
    swahili: "Lori",
  },
  {
    english: "Lorry",
    swahili: "Lori",
  },
  {
    english: "Rolled and curled leaves",
    swahili: "Majani yaliyovingirishwa na yaliyopindika",
  },
  {
    english: "Rolled and curled leaves",
    swahili: "Majani yaliyovingirishwa na yaliyopindika",
  },
  {
    english: "Late Bloom",
    swahili: "Marehemu Bloom",
  },
  {
    english: "Lettuce (Libya)",
    swahili: "Lettuce (Libya)",
  },
  {
    english: "Loose Smut",
    swahili: "Smut Huru",
  },
  {
    english: "Product Processing",
    swahili: "Usindikaji wa Bidhaa",
  },
  {
    english: "Emergence",
    swahili: "Dharura",
  },
  {
    english: "Emergence stage",
    swahili: "Hatua ya kuibuka",
  },
  {
    english: "Emergence stage",
    swahili: "Hatua ya kuibuka",
  },
  {
    english: "Emergence stage",
    swahili: "Hatua ya kuibuka",
  },
  {
    english: "Emergence stage",
    swahili: "Hatua ya kuibuka",
  },
  {
    english: "Emergence stage",
    swahili: "Hatua ya kuibuka",
  },
  {
    english: "Emergence stage",
    swahili: "Hatua ya kuibuka",
  },
  {
    english: "Emergence stage",
    swahili: "Hatua ya kuibuka",
  },
  {
    english: "Emergence stage",
    swahili: "Hatua ya kuibuka",
  },
  {
    english: "Pickup",
    swahili: "Inua",
  },
  {
    english: "Pickup",
    swahili: "Inua",
  },
  {
    english: "Pickup",
    swahili: "Inua",
  },
  {
    english: "Incubators",
    swahili: "Incubators",
  },
  {
    english: "Incubators",
    swahili: "Incubators",
  },
  {
    english: "Wooly Aphid",
    swahili: "Aphid ya Wooly",
  },
  {
    english: "Safflower (India)",
    swahili: "Safflower (India)",
  },
  {
    english: "Cardamom (Nepal)",
    swahili: "Cardamom (Nepal)",
  },
  {
    english: "No Loan",
    swahili: "Hakuna Mkopo",
  },
  {
    english: "No Loan",
    swahili: "Hakuna Mkopo",
  },
  {
    english: "Internode Borer",
    swahili: "Internode Borer",
  },
  {
    english: "Ear head bug",
    swahili: "Kidudu cha kichwa cha sikio",
  },
  {
    english: "Ear Head caterpillar",
    swahili: "Sikio Kiwavi",
  },
  {
    english: "Earwig",
    swahili: "Earwig",
  },
  {
    english: "Earhead bug",
    swahili: "Mdudu wa masikio",
  },
  {
    english: "Equipments",
    swahili: "Vifaa",
  },
  {
    english: "Yield losses",
    swahili: "Hasara za mavuno",
  },
  {
    english: "lentils",
    swahili: "dengu",
  },
  {
    english: "Slugs",
    swahili: "Slugs",
  },
  {
    english: "Corn earworm \\n",
    swahili: "Nguruwe wa mahindi \\n",
  },
  {
    english: "Maize",
    swahili: "Mahindi",
  },
  {
    english: "Gemini virus",
    swahili: "Virusi vya Gemini",
  },
  {
    english: "Chilli (India)",
    swahili: "Pilipili (India)",
  },
  {
    english: "Chilli (Indonesia)",
    swahili: "Pilipili (Indonesia)",
  },
  {
    english: "Uncleared",
    swahili: "Haijabainishwa",
  },
  {
    english: "Uncleared",
    swahili: "Haijabainishwa",
  },
  {
    english: "Mixer",
    swahili: "Mchanganyiko",
  },
  {
    english: "Clay loam soil",
    swahili: "Udongo wa udongo wa udongo",
  },
  {
    english: "peas",
    swahili: "mbaazi",
  },
  {
    english:
      "Mainfield Sowing/Planting (units: Field crop (cm); Tree crops (m) wherever applicable)",
    swahili:
      "Kupanda/Kupanda kwenye shamba (Vitengo: Mazao ya shambani (cm); Mazao ya miti (m) popote inapohitajika)",
  },
  {
    english: "Smut",
    swahili: "Smut",
  },
  {
    english: "Mealy bugs",
    swahili: "Wadudu wa mealy",
  },
  {
    english: "Mould board plough",
    swahili: "Jembe la ubao wa ukungu",
  },
  {
    english: "Mould board plough",
    swahili: "Jembe la ubao wa ukungu",
  },
  {
    english: "Mexican bean beetle",
    swahili: "Mende ya maharagwe ya Mexico",
  },
  {
    english: "Maydis leaf blight",
    swahili: "Ugonjwa wa ukungu wa majani ya Maydis",
  },
  {
    english: "Mapped",
    swahili: "Imepangwa",
  },
  {
    english: "Mottling leaves",
    swahili: "Majani ya mottling",
  },
  {
    english: "Mottling leaves",
    swahili: "Majani ya mottling",
  },
  {
    english: "Mosaic leaf pattern",
    swahili: "Mfano wa jani la Musa",
  },
  {
    english: "Mosaic leaf pattern",
    swahili: "Mfano wa jani la Musa",
  },
  {
    english: "Mosaic virus",
    swahili: "Virusi vya Musa",
  },
  {
    english: "Mungbean",
    swahili: "Mungbean",
  },
  {
    english: "Sheath rot",
    swahili: "Kuoza kwa ala",
  },
  {
    english: "Muttock",
    swahili: "Muttock",
  },
  {
    english: "Muttock",
    swahili: "Muttock",
  },
  {
    english: "Dead shoots",
    swahili: "Shina zilizokufa",
  },
  {
    english: "Dead shoots",
    swahili: "Shina zilizokufa",
  },
  {
    english: "Aphids",
    swahili: "Vidukari",
  },
  {
    english: "Aphids & Mealy Bugs",
    swahili: "Aphids & Mealy Bugs",
  },
  {
    english: "Anthracnose and Red Rot",
    swahili: "Anthracnose na Kuoza Mwekundu",
  },
  {
    english: "Thrips",
    swahili: "Thrips",
  },
  {
    english: "Cassava (Brazil)",
    swahili: "Mihogo (Brazili)",
  },
  {
    english: "Cassava (Nigeria)",
    swahili: "Muhogo (Nigeria)",
  },
  {
    english: "Cassava (Indonesia)",
    swahili: "Muhogo (Indonesia)",
  },
  {
    english: "Cassava (Democratic republic of the Congo)",
    swahili: "Muhogo (Jamhuri ya Kidemokrasia ya Kongo)",
  },
  {
    english: "Cassava (Uganda)",
    swahili: "Muhogo (Uganda)",
  },
  {
    english: "Cassava brown streak disease",
    swahili: "Ugonjwa wa michirizi ya kahawia ya mihogo",
  },
  {
    english: "Cassava mealy bug",
    swahili: "Mdudu wa unga wa muhogo",
  },
  {
    english: "Cassava Green Mite (Mononychellus tanajoa)\\n",
    swahili: "Mite ya Kijani cha Mihogo (Mononychellus tanajoa)\\n",
  },
  {
    english: "Cassava Green Mite (Mononychellus tanajoa)\\r\\n",
    swahili: "Mite ya Kijani cha Mihogo (Mononychellus tanajoa)\\r\\n",
  },
  {
    english: "Cultipacker",
    swahili: "Mkulima",
  },
  {
    english: "Cultipacker",
    swahili: "Mkulima",
  },
  {
    english: "Olive (Lybia)",
    swahili: "Olive (Lybia)",
  },
  {
    english: "Olive (Libya)",
    swahili: "Olive (Libya)",
  },
  {
    english: "Olive leaf spot",
    swahili: "Mahali pa majani ya mizeituni",
  },
  {
    english: "Olive moth",
    swahili: "Olive nondo",
  },
  {
    english: "Sprouting emergence of the bud",
    swahili: "Kuchipua kuibuka kwa bud",
  },
  {
    english: "Subsoiler",
    swahili: "Subsoiler",
  },
  {
    english: "Subsoiler",
    swahili: "Subsoiler",
  },
  {
    english: "Ear tags applicator",
    swahili: "Mwombaji wa vitambulisho vya masikioni",
  },
  {
    english: "Ear tags applicator",
    swahili: "Mwombaji wa vitambulisho vya masikioni",
  },
  {
    english: "Car",
    swahili: "Gari",
  },
  {
    english: "Car",
    swahili: "Gari",
  },
  {
    english: "Car",
    swahili: "Gari",
  },
  {
    english: "Reason",
    swahili: "Sababu",
  },
  {
    english: "Wilting",
    swahili: "Kunyauka",
  },
  {
    english: "Wilting",
    swahili: "Kunyauka",
  },
  {
    english: "Organic Strategies",
    swahili: "Mikakati ya Kikaboni",
  },
  {
    english: "Black scale",
    swahili: "Kiwango cheusi",
  },
  {
    english: "Black Pod Rot",
    swahili: "Kuoza kwa Podi Nyeusi",
  },
  {
    english: "Black scurf",
    swahili: "Mweusi mweusi",
  },
  {
    english: "Black pepper",
    swahili: "Pilipili nyeusi",
  },
  {
    english: "Black pepper (Indonesia)",
    swahili: "Pilipili nyeusi (Indonesia)",
  },
  {
    english: "Spade fork",
    swahili: "Uma jembe",
  },
  {
    english: "Weak stems",
    swahili: "Shina dhaifu",
  },
  {
    english: "Weak stems",
    swahili: "Shina dhaifu",
  },
  {
    english: "Weak roots",
    swahili: "Mizizi dhaifu",
  },
  {
    english: "Weak roots",
    swahili: "Mizizi dhaifu",
  },
  {
    english: "Tuber formation stage",
    swahili: "Hatua ya malezi ya mizizi",
  },
  {
    english: "Tuber formation stage",
    swahili: "Hatua ya malezi ya mizizi",
  },
  {
    english: "Tuber development stage",
    swahili: "Hatua ya maendeleo ya mizizi",
  },
  {
    english: "Tuber developement stage",
    swahili: "Hatua ya maendeleo ya mizizi",
  },
  {
    english: "Tuber development stage",
    swahili: "Hatua ya maendeleo ya mizizi",
  },
  {
    english: "Varieties",
    swahili: "Aina mbalimbali",
  },
  {
    english: "Cotton (brazil)",
    swahili: "Pamba (brazil)",
  },
  {
    english: "Cotton(Sudan)",
    swahili: "Pamba (Sudan)",
  },
  {
    english: "Cotton (india)",
    swahili: "Pamba (India)",
  },
  {
    english: "Cotton (australia)",
    swahili: "Pamba (australia)",
  },
  {
    english: "Cotton (argentina)",
    swahili: "Pamba (ajentina)",
  },
  {
    english: "Cotton (Uganda)",
    swahili: "Pamba (Uganda)",
  },
  {
    english: "Cotton (usa)",
    swahili: "Pamba (USA)",
  },
  {
    english: "Cotton Fusarium wilt",
    swahili: "Mnyauko wa Pamba Fusarium",
  },
  {
    english: "Cotton Anthracnose \\n",
    swahili: "Anthracnose ya Pamba \\n",
  },
  {
    english: "Cotton Alterneria leaf spot",
    swahili: "Madoa ya majani ya Pamba ya Alterneria",
  },
  {
    english: "Cotton Jassid",
    swahili: "Jassid ya Pamba",
  },
  {
    english: "Hoof cutter",
    swahili: "Mkata kwato",
  },
  {
    english: "Harvest / Reproductive phase",
    swahili: "Awamu ya mavuno / uzazi",
  },
  {
    english: "Harvest / Reproductive phase",
    swahili: "Awamu ya mavuno / uzazi",
  },
  {
    english: "Harvest / Reproductive phase",
    swahili: "Awamu ya mavuno / uzazi",
  },
  {
    english: "Harvest / Reproductive phase",
    swahili: "Awamu ya mavuno / uzazi",
  },
  {
    english: "Harvest / Reproductive phase",
    swahili: "Awamu ya mavuno / uzazi",
  },
  {
    english: "Harvest / Reproductive phase",
    swahili: "Awamu ya mavuno / uzazi",
  },
  {
    english: "Harvest / Reproductive phase",
    swahili: "Awamu ya mavuno / uzazi",
  },
  {
    english: "Harvesting phase",
    swahili: "Awamu ya kuvuna",
  },
  {
    english: "Harvesting phase",
    swahili: "Awamu ya kuvuna",
  },
  {
    english: "Harvesting stage",
    swahili: "Hatua ya kuvuna",
  },
  {
    english: "Harvesting stage",
    swahili: "Hatua ya kuvuna",
  },
  {
    english: "Harvesting stage",
    swahili: "Hatua ya kuvuna",
  },
  {
    english: "Harvesting stage - 1 st cut",
    swahili: "Hatua ya kuvuna - kata 1",
  },
  {
    english: "Post harvest phase",
    swahili: "Awamu ya baada ya mavuno",
  },
  {
    english: "Post harvest phase",
    swahili: "Awamu ya baada ya mavuno",
  },
  {
    english: "Post harvest phase",
    swahili: "Awamu ya baada ya mavuno",
  },
  {
    english: "Cutworms",
    swahili: "Minyoo",
  },
  {
    english: "Cutworms",
    swahili: "Minyoo",
  },
  {
    english: "Covered Kernel Smut",
    swahili: "Kernel Smut iliyofunikwa",
  },
  {
    english: "Hoe",
    swahili: "Jembe",
  },
  {
    english: "Hoe",
    swahili: "Jembe",
  },
  {
    english: "coffee (Bolivia)",
    swahili: "kahawa (Bolivia)",
  },
  {
    english: "Coffee (Brazil)",
    swahili: "Kahawa (Brazili)",
  },
  {
    english: "coffee (India)",
    swahili: "kahawa (India)",
  },
  {
    english: "Coffee (Ethiopia)",
    swahili: "Kahawa (Ethiopia)",
  },
  {
    english: "Coffee (Indonesia)",
    swahili: "Kahawa (Indonesia)",
  },
  {
    english: "coffee (Mexico)",
    swahili: "kahawa (Meksiko)",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
