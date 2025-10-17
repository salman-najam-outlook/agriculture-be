'use strict';
const data = [
  {
    "english": "Coffee (colombia)",
    "swahili": "Kahawa (kolombia)"
  },
  {
    "english": "coffee (Uganda)",
    "swahili": "kahawa (Uganda)"
  },
  {
    "english": "coffee (Guatemala)",
    "swahili": "kahawa (Guatemala)"
  },
  {
    "english": "coffee (Panama)",
    "swahili": "kahawa (Panama)"
  },
  {
    "english": "coffee (Peru)",
    "swahili": "kahawa (Peru)"
  },
  {
    "english": "coffee (Vietnam)",
    "swahili": "kahawa (Vietnam)"
  },
  {
    "english": "coffee (Honduras)",
    "swahili": "kahawa (Honduras)"
  },
  {
    "english": "Coffee berry borer",
    "swahili": "Kipekecha cha kahawa"
  },
  {
    "english": "Coffee berry borer (Hypothenemus hampei)",
    "swahili": "Kipekecha cha kahawa (Hypothenemus handai)"
  },
  {
    "english": "Coffee Berry blotch\\n",
    "swahili": "Kahawa berry\\n"
  },
  {
    "english": "Coffee Shot hole borer\\n",
    "swahili": "Kipekecha shimo la kahawa\\n"
  },
  {
    "english": "Coffee Shot hole borer: Xylosandrus compactus\\r\\n",
    "swahili": "Kipekecha mashimo ya Kahawa: Xylosandrus compactus\\r\\n"
  },
  {
    "english": "Coffee White stem borer",
    "swahili": "Kipekecha shina cheupe cha Kahawa"
  },
  {
    "english": "Coffee cercospora leaf spot\\n",
    "swahili": "Sehemu ya majani ya kahawa\\n"
  },
  {
    "english": "Coffee Red borer",
    "swahili": "Kahawa Red borer"
  },
  {
    "english": "Coffee Red borer: Zeuzera cof­feae (Cossidae: Lepidop­tera)",
    "swahili": "Kahawa Kipekecha Mwekundu: Zeuzera cof­feae (Cossidae: Lepidop­tera)"
  },
  {
    "english": "Coffee Leaf rust",
    "swahili": "Kutu ya majani ya kahawa"
  },
  {
    "english": "Coffee Anthracnose",
    "swahili": "Anthracnose ya kahawa"
  },
  {
    "english": "Coffee White stem borer (Xylotrechus quadripes)",
    "swahili": "Kipekecha shina Mweupe wa Kahawa (Xylotrechus quadripes)"
  },
  {
    "english": "Cut worms",
    "swahili": "Kata minyoo"
  },
  {
    "english": "safflower",
    "swahili": "safari"
  },
  {
    "english": "Flowering",
    "swahili": "Maua"
  },
  {
    "english": "Flowering",
    "swahili": "Maua"
  },
  {
    "english": "Flowering",
    "swahili": "Maua"
  },
  {
    "english": "Flowering",
    "swahili": "Maua"
  },
  {
    "english": "Flowering",
    "swahili": "Maua"
  },
  {
    "english": "Flowering",
    "swahili": "Maua"
  },
  {
    "english": "Flowering",
    "swahili": "Maua"
  },
  {
    "english": "Flowering",
    "swahili": "Maua"
  },
  {
    "english": "safflower bud fly/capsule fly",
    "swahili": "safflower bud fly/capsule fly"
  },
  {
    "english": "Safflower (Argentina)",
    "swahili": "Safflower (Argentina)"
  },
  {
    "english": "Safflower (USA)",
    "swahili": "Safflower (Marekani)"
  },
  {
    "english": "safflower bud flyCapsule fly/: Acanthiophilus helianthi",
    "swahili": "safflower bud flyCapsule fly/: Acanthiophilus helianthi"
  },
  {
    "english": "Safflower Cercospora leaf spot",
    "swahili": "Safflower Cercospora jani doa"
  },
  {
    "english": "Safflower Sclerotinia stem rot",
    "swahili": "Safflower Sclerotinia kuoza kwa shina"
  },
  {
    "english": "Safflower aphid",
    "swahili": "Safflower aphid"
  },
  {
    "english": "Safflower caterpillar",
    "swahili": "Kiwavi cha safflower"
  },
  {
    "english": "Safflower Alternaria leaf blight",
    "swahili": "Uharibifu wa majani ya Safflower Alternaria"
  },
  {
    "english": "Safflower gram pod borer/ capsule borer",
    "swahili": "Kipekecha ganda la gramu ya safflower/ kipekecha kapsuli"
  },
  {
    "english": "Safflower Gram pod borer/ Capsule borer: Helicoverpa armigera",
    "swahili": "Safflower Gram pod borer/ Kipekecha kapsuli: Helicoverpa armigera"
  },
  {
    "english": "Safflower Powdery mildew",
    "swahili": "Unga wa Safflower"
  },
  {
    "english": "Safflower Powdery mildew disease",
    "swahili": "Ugonjwa wa ukungu wa Safflower"
  },
  {
    "english": "Corm Weevil",
    "swahili": "Corm Weevil"
  },
  {
    "english": "Corn (Brazil)",
    "swahili": "Nafaka (Brazili)"
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
    "english": "Corn (Canada)",
    "swahili": "Nafaka (Kanada)"
  },
  {
    "english": "Corn (Argentina)",
    "swahili": "Nafaka (Argentina)"
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
    "english": "banana",
    "swahili": "ndizi"
  },
  {
    "english": "Banana (India)",
    "swahili": "Ndizi (India)"
  },
  {
    "english": "Banana (Bolivia)",
    "swahili": "Ndizi (Bolivia)"
  },
  {
    "english": "Banana (Indonesia)",
    "swahili": "Ndizi (Indonesia)"
  },
  {
    "english": "Downy mildew",
    "swahili": "Ugonjwa wa Downy"
  },
  {
    "english": "Cocoa (Panama)",
    "swahili": "Kakao (Panama)"
  },
  {
    "english": "Cocoa (Ivory Coast)",
    "swahili": "Kakao (Ivory Coast)"
  },
  {
    "english": "Coal Wood",
    "swahili": "Mbao ya Makaa ya Mawe"
  },
  {
    "english": "Coal Wood",
    "swahili": "Mbao ya Makaa ya Mawe"
  },
  {
    "english": "Capitulum borer",
    "swahili": "Kipekecha Capitulum"
  },
  {
    "english": "Pest and Disease Management",
    "swahili": "Udhibiti wa Wadudu na Magonjwa"
  },
  {
    "english": "Pest Management",
    "swahili": "Kudhibiti Wadudu"
  },
  {
    "english": "Pest Management",
    "swahili": "Kudhibiti Wadudu"
  },
  {
    "english": "Pest Management",
    "swahili": "Kudhibiti Wadudu"
  },
  {
    "english": "Pest Management Report",
    "swahili": "Ripoti ya Usimamizi wa Wadudu"
  },
  {
    "english": "Pests/Insects",
    "swahili": "Wadudu/Wadudu"
  },
  {
    "english": "Cotton Black arm/ Angular leaf spot\\n",
    "swahili": "Pamba mkono mweusi/ Doa la majani ya Angular\\n"
  },
  {
    "english": "Cotton Spotted boll worm\\n",
    "swahili": "Mdudu mwenye madoadoa ya Pamba\\n"
  },
  {
    "english": "Cupping stage",
    "swahili": "Hatua ya kombe"
  },
  {
    "english": "Crown galls/overgrowths",
    "swahili": "Unyogo wa taji / ukuaji mkubwa"
  },
  {
    "english": "Crown galls/overgrowths",
    "swahili": "Unyogo wa taji / ukuaji mkubwa"
  },
  {
    "english": "Chlorosis",
    "swahili": "Chlorosis"
  },
  {
    "english": "Chlorosis",
    "swahili": "Chlorosis"
  },
  {
    "english": "Quinoa (Bolivia)",
    "swahili": "Quinoa (Bolivia)"
  },
  {
    "english": "Quinoa moth",
    "swahili": "Nondo ya Quinoa"
  },
  {
    "english": "Artificial insemination",
    "swahili": "Kupandikiza kwa njia ya bandia"
  },
  {
    "english": "Agro Ecological zones",
    "swahili": "Kanda za Kiikolojia za Kilimo"
  },
  {
    "english": "cultivator",
    "swahili": "mkulima"
  },
  {
    "english": "Hoof care",
    "swahili": "Utunzaji wa kwato"
  },
  {
    "english": "Hoof trimming mashine",
    "swahili": "Mashine ya kukata kwato"
  },
  {
    "english": "Pseudostem Weevil",
    "swahili": "Pseudostem Weevil"
  },
  {
    "english": "African cassava mosaic disease\\n",
    "swahili": "African cassava mosaic disease\\n"
  },
  {
    "english": "African cassava mosaic disease\\r\\n",
    "swahili": "African cassava mosaic disease\\r\\n"
  },
  {
    "english": "Eriophyid mite",
    "swahili": "Eriophyid mite"
  },
  {
    "english": "Cereal rust mite adults",
    "swahili": "Utitiri wa kutu wa nafaka watu wazima"
  },
  {
    "english": "Irregular and chewed leaves/stems",
    "swahili": "Majani/shina zisizo za kawaida na zilizotafunwa"
  },
  {
    "english": "Irregular and chewed leaves/stems",
    "swahili": "Majani/shina zisizo za kawaida na zilizotafunwa"
  },
  {
    "english": "Method of application",
    "swahili": "Mbinu ya maombi"
  },
  {
    "english": "sugarcane",
    "swahili": "muwa"
  },
  {
    "english": "Sugarcane (Brazil)",
    "swahili": "Miwa (Brazili)"
  },
  {
    "english": "Sugarcane (India)",
    "swahili": "Miwa (India)"
  },
  {
    "english": "Sugarcane (Colombia)",
    "swahili": "Miwa (Kolombia)"
  },
  {
    "english": "Stage 0 (Pre-emergence)",
    "swahili": "Hatua ya 0 (Kuibuka kabla)"
  },
  {
    "english": "Stage 1 (Emerged)",
    "swahili": "Hatua ya 1 (Iliyoibuka)"
  },
  {
    "english": "Stage 2 (cob development)",
    "swahili": "Hatua ya 2 (maendeleo ya cob)"
  },
  {
    "english": "Stage 4 (flowering- pollination)",
    "swahili": "Hatua ya 4 (maua- uchavushaji)"
  },
  {
    "english": "Stage 5 (kernel development)",
    "swahili": "Hatua ya 5 (maendeleo ya kernel)"
  },
  {
    "english": "Stage 6 (grain filling)",
    "swahili": "Hatua ya 6 (kujaza nafaka)"
  },
  {
    "english": "Stage 7 (maturity)",
    "swahili": "Hatua ya 7 (ukomavu)"
  },
  {
    "english": "Ergot",
    "swahili": "Ergot"
  },
  {
    "english": "Early shoot borer",
    "swahili": "Kipekecha risasi mapema"
  },
  {
    "english": "Early bud",
    "swahili": "Mchuzi wa mapema"
  },
  {
    "english": "summer",
    "swahili": "majira ya joto"
  },
  {
    "english": "Heat shrink gun",
    "swahili": "Bunduki ya kupunguza joto"
  },
  {
    "english": "Alfalfa (North America)",
    "swahili": "Alfalfa (Amerika Kaskazini)"
  },
  {
    "english": "Alfalfa (Australia)",
    "swahili": "Alfalfa (Australia)"
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
    "english": "Alternaria blight",
    "swahili": "Ugonjwa wa Alternaria"
  },
  {
    "english": "Alternaria leaf spot",
    "swahili": "Mahali pa majani ya Alternaria"
  },
  {
    "english": "Silt loam soil",
    "swahili": "Udongo wa udongo wa silt"
  },
  {
    "english": "Grassy shoot disease",
    "swahili": "Ugonjwa wa risasi kwenye nyasi"
  },
  {
    "english": "Sorghum",
    "swahili": "Mtama"
  },
  {
    "english": "guava",
    "swahili": "guava"
  },
  {
    "english": "Tea (Nepal)",
    "swahili": "Chai (Nepal)"
  },
  {
    "english": "Tea (Uganda)",
    "swahili": "Chai (Uganda)"
  },
  {
    "english": "Tea Termites",
    "swahili": "Mchwa wa Chai"
  },
  {
    "english": "Tea Nematodes",
    "swahili": "Nematodes ya Chai"
  },
  {
    "english": "Tea Branch and collar canker",
    "swahili": "Tawi la Chai na kola"
  },
  {
    "english": "Tea Brown and Grey Blight",
    "swahili": "Chai Brown na Grey Blight"
  },
  {
    "english": "Tea mosquito bug",
    "swahili": "Mdudu wa mbu wa chai"
  },
  {
    "english": "Tea mosquitoe bugs",
    "swahili": "Wadudu wa mbu wa chai"
  },
  {
    "english": "Tea Black tea thrips",
    "swahili": "Chai Black tea thrips"
  },
  {
    "english": "Tea Scales",
    "swahili": "Mizani ya Chai"
  },
  {
    "english": "Tea Wood rot",
    "swahili": "Kuoza kwa Mbao ya Chai"
  },
  {
    "english": "Tea mites and spider mites",
    "swahili": "Vidudu vya chai na sarafu za buibui"
  },
  {
    "english": "Tea Aphids",
    "swahili": "Vidukari vya chai"
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
    "english": "Tea Armillaria root rot",
    "swahili": "Kuoza kwa mizizi ya chai ya Armillaria"
  },
  {
    "english": "rice",
    "swahili": "mchele"
  },
  {
    "english": "Rice (Nepal)",
    "swahili": "Mchele (Nepal)"
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
    "english": "Seedling stage",
    "swahili": "Hatua ya miche"
  },
  {
    "english": "Seedling stage",
    "swahili": "Hatua ya miche"
  },
  {
    "english": "Seedling damping off",
    "swahili": "Miche ikinyesha"
  },
  {
    "english": "Seedling damping off",
    "swahili": "Miche ikinyesha"
  },
  {
    "english": "Germination and emergence",
    "swahili": "Kuota na kuibuka"
  },
  {
    "english": "Germination stage",
    "swahili": "Hatua ya kuota"
  },
  {
    "english": "Germination stage",
    "swahili": "Hatua ya kuota"
  },
  {
    "english": "Germination stage",
    "swahili": "Hatua ya kuota"
  },
  {
    "english": "Germination stage",
    "swahili": "Hatua ya kuota"
  },
  {
    "english": "Germination stage",
    "swahili": "Hatua ya kuota"
  },
  {
    "english": "Germination/emergence",
    "swahili": "Kuota/kuibuka"
  },
  {
    "english": "Germination/emergence",
    "swahili": "Kuota/kuibuka"
  },
  {
    "english": "Germination/emergence",
    "swahili": "Kuota/kuibuka"
  },
  {
    "english": "Germination/emergence",
    "swahili": "Kuota/kuibuka"
  },
  {
    "english": "Germination/emergence",
    "swahili": "Kuota/kuibuka"
  },
  {
    "english": "Germination/emergence",
    "swahili": "Kuota/kuibuka"
  },
  {
    "english": "single",
    "swahili": "single"
  },
  {
    "english": "single",
    "swahili": "single"
  },
  {
    "english": "Damping off",
    "swahili": "Damping mbali"
  },
  {
    "english": "Chirkey viral disease",
    "swahili": "Ugonjwa wa virusi vya Chirkey"
  },
  {
    "english": "More leaf stage",
    "swahili": "Hatua ya majani zaidi"
  },
  {
    "english": "ghjj",
    "swahili": "ghjj"
  },
  {
    "english": "See DD here",
    "swahili": "Tazama DD hapa"
  },
  {
    "english": "See DD here",
    "swahili": "Tazama DD hapa"
  },
  {
    "english": "Drill",
    "swahili": "Chimba"
  },
  {
    "english": "Drill",
    "swahili": "Chimba"
  },
  {
    "english": "Warehouse Report",
    "swahili": "Ripoti ya Ghala"
  },
  {
    "english": "Warehouse Report",
    "swahili": "Ripoti ya Ghala"
  },
  {
    "english": "Chisel plow",
    "swahili": "Jembe la patasi"
  },
  {
    "english": "Chisel plow",
    "swahili": "Jembe la patasi"
  },
  {
    "english": "Gas",
    "swahili": "Gesi"
  },
  {
    "english": "Gas",
    "swahili": "Gesi"
  },
  {
    "english": "Cabbage (India)",
    "swahili": "Kabeji (India)"
  },
  {
    "english": "wet",
    "swahili": "mvua"
  },
  {
    "english": "Pink stem Borer",
    "swahili": "Kipekecha shina wa waridi"
  },
  {
    "english": "Shoot fly",
    "swahili": "Risasi inzi"
  },
  {
    "english": "Gummosis",
    "swahili": "Gummosis"
  },
  {
    "english": "gugj",
    "swahili": "gugj"
  },
  {
    "english": "wheat",
    "swahili": "ngano"
  },
  {
    "english": "Wheat (Brazil)",
    "swahili": "Ngano (Brazili)"
  },
  {
    "english": "Wheat (Lybia)",
    "swahili": "Ngano (Lybia)"
  },
  {
    "english": "wheat123",
    "swahili": "ngano123"
  },
  {
    "english": "Grass hopper",
    "swahili": "Hopper ya nyasi"
  },
  {
    "english": "Gram caterpillar",
    "swahili": "Gramu caterpillar"
  },
  {
    "english": "Gram pod borer",
    "swahili": "Gram pod borer"
  },
  {
    "english": "Green gram ( Brazil )",
    "swahili": "Gramu ya kijani (Brazil)"
  },
  {
    "english": "Green gram ( India )",
    "swahili": "Gramu ya kijani (India)"
  },
  {
    "english": "Green gram ( Ethiopia )",
    "swahili": "Gramu ya kijani (Ethiopia)"
  },
  {
    "english": "European Skipper",
    "swahili": "Nahodha wa Ulaya"
  },
  {
    "english": "autumn",
    "swahili": "vuli"
  },
  {
    "english": "Cabbage",
    "swahili": "Kabichi"
  },
  {
    "english": "Ring pattern on the leaves",
    "swahili": "Mchoro wa pete kwenye majani"
  },
  {
    "english": "Ring pattern on the leaves",
    "swahili": "Mchoro wa pete kwenye majani"
  },
  {
    "english": "Holes on leaves/fruits/grain",
    "swahili": "Mashimo kwenye majani/matunda/nafaka"
  },
  {
    "english": "Holes on leaves/fruits/grain",
    "swahili": "Mashimo kwenye majani/matunda/nafaka"
  },
  {
    "english": "Leaf rot",
    "swahili": "Kuoza kwa majani"
  },
  {
    "english": "Leaf rusting",
    "swahili": "Kuota kwa majani"
  },
  {
    "english": "Leaf spotting",
    "swahili": "Kuonekana kwa majani"
  },
  {
    "english": "Leafminers",
    "swahili": "Wachimba majani"
  },
  {
    "english": "Leaf hopper",
    "swahili": "Hopper ya majani"
  },
  {
    "english": "Leaf rusting",
    "swahili": "Kuota kwa majani"
  },
  {
    "english": "Leaf rot",
    "swahili": "Kuoza kwa majani"
  },
  {
    "english": "Leaf spotting",
    "swahili": "Kuonekana kwa majani"
  },
  {
    "english": "Leaf spot",
    "swahili": "Mahali pa majani"
  },
  {
    "english": "Leaf Crinkle",
    "swahili": "Mkunjo wa Majani"
  },
  {
    "english": "Leaf rust",
    "swahili": "Kutu ya majani"
  },
  {
    "english": "Leaf bud formation stage",
    "swahili": "Hatua ya kuunda bud ya majani"
  },
  {
    "english": "Leaf folder",
    "swahili": "Folda ya majani"
  },
  {
    "english": "Leaf beetle\\n",
    "swahili": "Mbawakawa wa majani\\n"
  },
  {
    "english": "Leaf miner files",
    "swahili": "Faili za mchimbaji wa majani"
  },
  {
    "english": "leaf visiblestage",
    "swahili": "hatua ya kuonekana kwa majani"
  },
  {
    "english": "Foliage formation",
    "swahili": "Uundaji wa majani"
  },
  {
    "english": "Leaf drop",
    "swahili": "Kushuka kwa majani"
  },
  {
    "english": "Leaf or neck blast",
    "swahili": "Jani au mlipuko wa shingo"
  },
  {
    "english": "Leaf Development",
    "swahili": "Maendeleo ya Majani"
  },
  {
    "english": "Leaf Growth",
    "swahili": "Ukuaji wa Majani"
  },
  {
    "english": "Leaf miner",
    "swahili": "Mchimbaji wa majani"
  },
  {
    "english": "Panama Wilt",
    "swahili": "Panama Wilt"
  },
  {
    "english": "Panama wilt disease",
    "swahili": "Ugonjwa wa mnyauko wa Panama"
  },
  {
    "english": "Panicle initiation",
    "swahili": "Uanzishaji wa hofu"
  },
  {
    "english": "Foilage growth",
    "swahili": "Ukuaji wa foilage"
  },
  {
    "english": "Livestock production equipment",
    "swahili": "Vifaa vya uzalishaji wa mifugo"
  },
  {
    "english": "Livestock production equipment",
    "swahili": "Vifaa vya uzalishaji wa mifugo"
  },
  {
    "english": "Intercultivation practices",
    "swahili": "Mazoea ya kilimo"
  },
  {
    "english": "Maturation",
    "swahili": "Kukomaa"
  },
  {
    "english": "Maturity",
    "swahili": "Ukomavu"
  },
  {
    "english": "Maturation",
    "swahili": "Kukomaa"
  },
  {
    "english": "Maturity",
    "swahili": "Ukomavu"
  },
  {
    "english": "Maturity",
    "swahili": "Ukomavu"
  },
  {
    "english": "Maturation phase",
    "swahili": "Awamu ya kukomaa"
  },
  {
    "english": "Maturity stage",
    "swahili": "Hatua ya ukomavu"
  },
  {
    "english": "Maturity stage",
    "swahili": "Hatua ya ukomavu"
  },
  {
    "english": "Maturation/harvesting",
    "swahili": "Kukomaa/kuvuna"
  },
  {
    "english": "Maturation/harvesting",
    "swahili": "Kukomaa/kuvuna"
  },
  {
    "english": "Maturation/harvesting",
    "swahili": "Kukomaa/kuvuna"
  },
  {
    "english": "Maturation/harvesting",
    "swahili": "Kukomaa/kuvuna"
  },
  {
    "english": "Maturity/harvesting stage",
    "swahili": "Hatua ya kukomaa/ kuvuna"
  },
  {
    "english": "Ripening/maturation",
    "swahili": "Kuiva/kupevuka"
  },
  {
    "english": "Ripening/maturation",
    "swahili": "Kuiva/kupevuka"
  },
  {
    "english": "Purple eye spot",
    "swahili": "Eneo la jicho la zambarau"
  },
  {
    "english": "Pasteurifers",
    "swahili": "Pasteurifers"
  },
  {
    "english": "Pasteurizers",
    "swahili": "Wafugaji"
  },
  {
    "english": "Pasteurizers",
    "swahili": "Wafugaji"
  },
  {
    "english": "Pythium",
    "swahili": "Pythium"
  },
  {
    "english": "Powdery mildew",
    "swahili": "Koga ya unga"
  },
  {
    "english": "Powdery mildew",
    "swahili": "Koga ya unga"
  },
  {
    "english": "Pyrilla",
    "swahili": "Pyrilla"
  },
  {
    "english": "Punts",
    "swahili": "Punti"
  },
  {
    "english": "Ripening phase",
    "swahili": "Awamu ya kukomaa"
  },
  {
    "english": "Ripening stage",
    "swahili": "Hatua ya kukomaa"
  },
  {
    "english": "Pailas or cauldrons",
    "swahili": "Pailas au cauldrons"
  },
  {
    "english": "First Vegetative phase",
    "swahili": "Awamu ya kwanza ya mboga"
  },
  {
    "english": "First Vegetative phase",
    "swahili": "Awamu ya kwanza ya mboga"
  },
  {
    "english": "First Vegetative phase",
    "swahili": "Awamu ya kwanza ya mboga"
  },
  {
    "english": "First Vegetative phase",
    "swahili": "Awamu ya kwanza ya mboga"
  },
  {
    "english": "Pod borer",
    "swahili": "Kipekecha ganda"
  },
  {
    "english": "Pod stage",
    "swahili": "Hatua ya Pod"
  },
  {
    "english": "Regrowth period",
    "swahili": "Kipindi cha ukuaji upya"
  },
  {
    "english": "Regrowth period",
    "swahili": "Kipindi cha ukuaji upya"
  },
  {
    "english": "Crinkled leaves",
    "swahili": "Majani yaliyokauka"
  },
  {
    "english": "Crinkled leaves",
    "swahili": "Majani yaliyokauka"
  },
  {
    "english": "Post harvest first vegetative stage",
    "swahili": "Baada ya kuvuna hatua ya kwanza ya mimea"
  },
  {
    "english": "Nutrient deficiency symptoms",
    "swahili": "Dalili za upungufu wa virutubishi"
  },
  {
    "english": "Inflorescence emergence",
    "swahili": "Kuibuka kwa inflorescence"
  },
  {
    "english": "Yellow or stripe rust",
    "swahili": "Njano au kutu ya mstari"
  },
  {
    "english": "Leaf spot with yellow halo",
    "swahili": "Doa la majani lenye halo ya manjano"
  },
  {
    "english": "Leaf spot with yellow halo",
    "swahili": "Doa la majani lenye halo ya manjano"
  },
  {
    "english": "Yellow leaf disease",
    "swahili": "Ugonjwa wa majani ya manjano"
  },
  {
    "english": "Scale",
    "swahili": "Mizani"
  },
  {
    "english": "Ph meter",
    "swahili": "Ph mita"
  },
  {
    "english": "Ph tape",
    "swahili": "Ph mkanda"
  },
  {
    "english": "Bumps on plant leaves",
    "swahili": "Matuta kwenye majani ya mmea"
  },
  {
    "english": "Bumps on plant leaves",
    "swahili": "Matuta kwenye majani ya mmea"
  },
  {
    "english": "White powdery substance on plant",
    "swahili": "Dutu nyeupe ya unga kwenye mmea"
  },
  {
    "english": "White powdery substance on plant",
    "swahili": "Dutu nyeupe ya unga kwenye mmea"
  },
  {
    "english": "Specks and blight on plants",
    "swahili": "Madoa na doa kwenye mimea"
  },
  {
    "english": "Specks and blight on plants",
    "swahili": "Vidonda na doa kwenye mimea"
  },
  {
    "english": "Petrol",
    "swahili": "Petroli"
  },
  {
    "english": "Petrol",
    "swahili": "Petroli"
  },
  {
    "english": "Transplanting stage",
    "swahili": "Hatua ya kupandikiza"
  },
  {
    "english": "Transplanting stage",
    "swahili": "Hatua ya kupandikiza"
  },
  {
    "english": "Early vegetative stage",
    "swahili": "Hatua ya mapema ya mimea"
  },
  {
    "english": "Early vegetative stage",
    "swahili": "Hatua ya mapema ya mimea"
  },
  {
    "english": "Initial Growth",
    "swahili": "Ukuaji wa Awali"
  },
  {
    "english": "Head development stage",
    "swahili": "Hatua ya maendeleo ya kichwa"
  },
  {
    "english": "Reproductive or heading stages",
    "swahili": "Hatua za uzazi au kichwa"
  },
  {
    "english": "Flowwering stage",
    "swahili": "Hatua ya maua"
  },
  {
    "english": "Pre flowering",
    "swahili": "Kabla ya maua"
  },
  {
    "english": "Precleaner",
    "swahili": "Precleaner"
  },
  {
    "english": "Pre reproduction",
    "swahili": "Kabla ya uzazi"
  },
  {
    "english": "Plant hopper",
    "swahili": "Hopper ya mmea"
  },
  {
    "english": "onion",
    "swahili": "kitunguu"
  },
  {
    "english": "Onion (India)",
    "swahili": "Kitunguu (India)"
  },
  {
    "english": "Onion (United_States)",
    "swahili": "Kitunguu (Marekani)"
  },
  {
    "english": "Onion (Zambia)",
    "swahili": "Kitunguu (Zambia)"
  },
  {
    "english": "Onion Thrips",
    "swahili": "Vitunguu Thrips"
  },
  {
    "english": "Onion Maggot",
    "swahili": "Mabuu ya vitunguu"
  },
  {
    "english": "Soft rotting of roots",
    "swahili": "Kuoza laini kwa mizizi"
  },
  {
    "english": "Soft rotting of roots",
    "swahili": "Kuoza laini kwa mizizi"
  },
  {
    "english": "peach",
    "swahili": "peach"
  },
  {
    "english": "Shrink tunnel",
    "swahili": "Shrink handaki"
  },
  {
    "english": "Economic Analysis",
    "swahili": "Uchambuzi wa Kiuchumi"
  },
  {
    "english": "Armyworm",
    "swahili": "Mdudu wa jeshi"
  },
  {
    "english": "Fall armyworm",
    "swahili": "Fall armyworm"
  },
  {
    "english": "Potato (Bolivia)",
    "swahili": "Viazi (Bolivia)"
  },
  {
    "english": "Potato (Nepal)",
    "swahili": "Viazi (Nepal)"
  },
  {
    "english": "Potato (India)",
    "swahili": "Viazi (India)"
  },
  {
    "english": "Potato (Canada)",
    "swahili": "Viazi (Kanada)"
  },
  {
    "english": "Potato (Colombia)",
    "swahili": "Viazi (Kolombia)"
  },
  {
    "english": "Potato (USA)",
    "swahili": "Viazi (Marekani)"
  },
  {
    "english": "Potato (Zambia)",
    "swahili": "Viazi (Zambia)"
  },
  {
    "english": "Late blight",
    "swahili": "Ugonjwa wa marehemu"
  },
  {
    "english": "Early blight",
    "swahili": "Ugonjwa wa mapema"
  },
  {
    "english": "Early and Mid Bloom",
    "swahili": "Maua ya mapema na ya kati"
  },
  {
    "english": "Iris Yellow Spot",
    "swahili": "Iris Mahali ya Njano"
  },
  {
    "english": "mangos",
    "swahili": "maembe"
  },
  {
    "english": "Presence of webs",
    "swahili": "Uwepo wa wavuti"
  },
  {
    "english": "Presence of webs",
    "swahili": "Uwepo wa wavuti"
  },
  {
    "english": "tomato",
    "swahili": "nyanya"
  },
  {
    "english": "Tomato (India)",
    "swahili": "Nyanya (India)"
  },
  {
    "english": "Tomato (Egypt)",
    "swahili": "Nyanya (Misri)"
  },
  {
    "english": "Tomato (usa)",
    "swahili": "Nyanya (USA)"
  },
  {
    "english": "Tomato Late blight. \\n",
    "swahili": "Nyanya marehemu blight. \\n"
  },
  {
    "english": "Tomato Blossom End Rot disease\\n",
    "swahili": "Tomato Blossom Komesha Ugonjwa wa Kuoza\\n"
  },
  {
    "english": "Tomato Serpentine leaf miner.\\n",
    "swahili": "Mchimbaji wa majani ya Nyanya Serpentine.\\n"
  },
  {
    "english": "Tomato leaf curl virus (ToLCV).\\n",
    "swahili": "Virusi vya kujikunja kwa majani ya nyanya (ToLCV).\\n"
  },
  {
    "english": "Tomato Leaf eating caterpillar\\n",
    "swahili": "Majani ya Nyanya anayekula kiwavi\\n"
  },
  {
    "english": "Tomato Early blight\\n",
    "swahili": "Ugonjwa wa ukungu wa Mapema wa Nyanya\\n"
  },
  {
    "english": "Tomato Gram pod borer\\n",
    "swahili": "Tomato Gram pod borer\\n"
  },
  {
    "english": "Tomato Whitefly\\n",
    "swahili": "Nyanya Whitefly\\n"
  },
  {
    "english": "Nutmeg & mace",
    "swahili": "Nutmeg & mace"
  },
  {
    "english": "Nutmeg&mace (Indonesia)",
    "swahili": "Nutmeg&mace (Indonesia)"
  },
  {
    "english": "flag leaf stage",
    "swahili": "hatua ya majani ya bendera"
  },
  {
    "english": "Rust",
    "swahili": "Kutu"
  },
  {
    "english": "Grasshopper",
    "swahili": "Panzi"
  },
  {
    "english": "Tillering/canopy development",
    "swahili": "Ukuzaji wa kulima / dari"
  },
  {
    "english": "Tillering/canopy development",
    "swahili": "Ukuzaji wa kulima / dari"
  },
  {
    "english": "Timothy (Canada)",
    "swahili": "Timothy (Kanada)"
  },
  {
    "english": "Timothy (USA)",
    "swahili": "Timotheo (Marekani)"
  },
  {
    "english": "2nd cut of timothy grass",
    "swahili": "Kata ya 2 ya nyasi ya timothy"
  },
  {
    "english": "Your yield (tonnes/ha)",
    "swahili": "Mavuno yako (tani/ha)"
  },
  {
    "english": "Your harvesting date",
    "swahili": "Tarehe yako ya kuvuna"
  },
  {
    "english": "Your herbicide dose/rate (litres/ha)",
    "swahili": "Kiwango/kiwango chako cha dawa (lita/hekta)"
  },
  {
    "english": "Dough stage",
    "swahili": "Hatua ya unga"
  },
  {
    "english": "Dough stage",
    "swahili": "Hatua ya unga"
  },
  {
    "english": "Mealybug",
    "swahili": "Mealybug"
  },
  {
    "english": "Casing Split and Root Growth",
    "swahili": "Mgawanyiko wa Casing na Ukuaji wa Mizizi"
  },
  {
    "english": "Barley (India)",
    "swahili": "Shayiri (India)"
  },
  {
    "english": "Olive fruit fly",
    "swahili": "Kuruka kwa matunda ya mizeituni"
  },
  {
    "english": "Olive knot",
    "swahili": "Fundo la Olive"
  },
  {
    "english": "Tooftaalee Organic",
    "swahili": "Tooftaalee Organic"
  },
  {
    "english": "Rake",
    "swahili": "Rake"
  },
  {
    "english": "Rake",
    "swahili": "Rake"
  },
  {
    "english": "Tuktuk",
    "swahili": "Tuktuk"
  },
  {
    "english": "Tuktuk",
    "swahili": "Tuktuk"
  },
  {
    "english": "Tuktuk",
    "swahili": "Tuktuk"
  },
  {
    "english": "Bacterial blight",
    "swahili": "Ugonjwa wa bakteria"
  },
  {
    "english": "Bacterial blight",
    "swahili": "Ugonjwa wa bakteria"
  },
  {
    "english": "Bacterial blight",
    "swahili": "Ugonjwa wa bakteria"
  },
  {
    "english": "Bacterial stalk rot",
    "swahili": "Kuoza kwa bua ya bakteria"
  },
  {
    "english": "Bacterial leaf blight",
    "swahili": "Uharibifu wa majani ya bakteria"
  },
  {
    "english": "Juice tank",
    "swahili": "Tangi ya juisi"
  },
  {
    "english": "Truck",
    "swahili": "Lori"
  },
  {
    "english": "Truck",
    "swahili": "Lori"
  },
  {
    "english": "Truck",
    "swahili": "Lori"
  },
  {
    "english": "Trailer sprayer",
    "swahili": "Kinyunyizio cha trela"
  },
  {
    "english": "Tractor",
    "swahili": "Trekta"
  },
  {
    "english": "Tractor",
    "swahili": "Trekta"
  },
  {
    "english": "Tractor (M)",
    "swahili": "Trekta (M)"
  },
  {
    "english": "vegitable",
    "swahili": "mboga"
  },
  {
    "english": "Vegetative stage",
    "swahili": "Hatua ya mimea"
  },
  {
    "english": "Vegetative stage",
    "swahili": "Hatua ya mimea"
  },
  {
    "english": "Vegetative stage",
    "swahili": "Hatua ya mimea"
  },
  {
    "english": "Vegetative stage",
    "swahili": "Hatua ya mimea"
  },
  {
    "english": "Vegetative stage",
    "swahili": "Hatua ya mimea"
  },
  {
    "english": "Vegetative phase",
    "swahili": "Awamu ya mboga"
  },
  {
    "english": "Vegetative stage",
    "swahili": "Hatua ya mimea"
  },
  {
    "english": "Vegetative stage",
    "swahili": "Hatua ya mimea"
  },
  {
    "english": "Vegetative phase",
    "swahili": "Awamu ya mboga"
  },
  {
    "english": "Vegetative phase",
    "swahili": "Awamu ya mboga"
  },
  {
    "english": "Vegetative growth",
    "swahili": "Ukuaji wa mimea"
  },
  {
    "english": "Vegetative growth",
    "swahili": "Ukuaji wa mimea"
  },
  {
    "english": "vegetative",
    "swahili": "mimea"
  },
  {
    "english": "vegetative",
    "swahili": "mimea"
  },
  {
    "english": "Square formation",
    "swahili": "Uundaji wa mraba"
  },
  {
    "english": "Foorkey viral disease",
    "swahili": "Ugonjwa wa virusi wa Fookey"
  },
  {
    "english": "Viral diseases",
    "swahili": "Magonjwa ya virusi"
  },
  {
    "english": "Wireworms",
    "swahili": "Wireworms"
  },
  {
    "english": "Die Back",
    "swahili": "Kufa Nyuma"
  },
  {
    "english": "Vehicle",
    "swahili": "Gari"
  },
  {
    "english": "Vehicle",
    "swahili": "Gari"
  },
  {
    "english": "Special Operations",
    "swahili": "Operesheni Maalum"
  },
  {
    "english": "Special operations (for applicable crops only)",
    "swahili": "Shughuli maalum (kwa mazao husika pekee)"
  },
  {
    "english": "Wilt",
    "swahili": "Wilt"
  },
  {
    "english": "Growth distortion/plant stunting",
    "swahili": "Kuharibika kwa ukuaji/kudumaa kwa mmea"
  },
  {
    "english": "Growth distortion/plant stunting",
    "swahili": "Kuharibika kwa ukuaji/kudumaa kwa mmea"
  },
  {
    "english": "Distorted plants/leaves",
    "swahili": "Mimea/majani yaliyopotoka"
  },
  {
    "english": "Distorted plants/leaves",
    "swahili": "Mimea/majani yaliyopotoka"
  },
  {
    "english": "Weighing",
    "swahili": "Kupima uzito"
  },
  {
    "english": "Semen freezing tank",
    "swahili": "Tangi ya kufungia shahawa"
  },
  {
    "english": "vsgsb",
    "swahili": "vsgsb"
  },
  {
    "english": "vhh",
    "swahili": "vhh"
  },
  {
    "english": "Whitefly (Aleurodicus dispersus)\\n",
    "swahili": "Inzi weupe (Aleurodicus dispersus)\\n"
  },
  {
    "english": "Whitefly (Aleurodicus dispersus)\\r\\n",
    "swahili": "Inzi weupe (Aleurodicus dispersus)\\r\\n"
  },
  {
    "english": "Whiteflies",
    "swahili": "Nzi weupe"
  },
  {
    "english": "Growth stage",
    "swahili": "Hatua ya ukuaji"
  },
  {
    "english": "Hammer",
    "swahili": "Nyundo"
  },
  {
    "english": "Hammer",
    "swahili": "Nyundo"
  },
  {
    "english": "Hammer (S)",
    "swahili": "Nyundo (S)"
  },
  {
    "english": "Green gram",
    "swahili": "Gramu ya kijani"
  },
  {
    "english": "Herbicide used",
    "swahili": "Dawa ya kuulia wadudu iliyotumika"
  },
  {
    "english": "Hands",
    "swahili": "Mikono"
  },
  {
    "english": "Hand hoe",
    "swahili": "Jembe la mkono"
  },
  {
    "english": "Hand hoe",
    "swahili": "Jembe la mkono"
  },
  {
    "english": "Half bloom stage - 1 st cut",
    "swahili": "Hatua ya nusu ya maua - kata 1"
  },
  {
    "english": "Combine harvestor",
    "swahili": "Unganisha mvunaji"
  },
  {
    "english": "Combine harvestor",
    "swahili": "Unganisha mvunaji"
  },
  {
    "english": "Harvesting Report",
    "swahili": "Ripoti ya Uvunaji"
  },
  {
    "english": "yest",
    "swahili": "ndio"
  },
  {
    "english": "Helminthosporium Leaf Spot",
    "swahili": "Doa la Majani la Helminthosporium"
  },
  {
    "english": "Harrow",
    "swahili": "Harrow"
  },
  {
    "english": "Harrow",
    "swahili": "Harrow"
  },
  {
    "english": "Hawk moth",
    "swahili": "Nondo wa mwewe"
  },
  {
    "english": "1. GENERAL CROP INFORMATION",
    "swahili": "1. TAARIFA YA MAZAO YA JUMLA"
  },
  {
    "english": "3. SOIL MANAGEMENT",
    "swahili": "3. USIMAMIZI WA UDONGO"
  },
  {
    "english": "4. IRRIGATION",
    "swahili": "4. UMWAGILIAJI"
  },
  {
    "english": "5. INTERCULTIVATION PRACTICES",
    "swahili": "5. MAZOEA YA KUINGILIANA"
  },
  {
    "english": "50% stigma emergence",
    "swahili": "50% kuibuka kwa unyanyapaa"
  },
  {
    "english": "7. HARVESTING",
    "swahili": "7. KUVUNA"
  },
  {
    "english": "8. STORAGE",
    "swahili": "8. HIFADHI"
  },
  {
    "english": "Plan Fee",
    "swahili": "Ada ya Mpango"
  },
  {
    "english": "Membership Fee is required",
    "swahili": "Ada ya Uanachama inahitajika"
  },
  {
    "english": "Soil inputs purchase orders",
    "swahili": "Maagizo ya ununuzi wa pembejeo za udongo"
  },
  {
    "english": "Type",
    "swahili": "Aina"
  },
  {
    "english": "Coffee Species",
    "swahili": "Aina za Kahawa"
  },
  {
    "english": "Coffee Variety",
    "swahili": "Aina ya Kahawa"
  },
  {
    "english": "Variety",
    "swahili": "Tofauti"
  },
  {
    "english": "Coffee variety tree deleted",
    "swahili": "Mti wa aina ya kahawa umefutwa"
  },
  {
    "english": "Coffee variety added successfully.",
    "swahili": "Aina ya kahawa imeongezwa kwa mafanikio."
  },
  {
    "english": "Coffee Specie added successfully.",
    "swahili": "Aina ya Kahawa imeongezwa kwa mafanikio."
  },
  {
    "english": "Coffee specie updated successfully.",
    "swahili": "Aina ya kahawa imesasishwa."
  },
  {
    "english": "Incorrect file type",
    "swahili": "Aina ya faili isiyo sahihi"
  },
  {
    "english": "File Type",
    "swahili": "Aina ya Faili"
  },
  {
    "english": "Currency ",
    "swahili": "Sarafu"
  },
  {
    "english": "organic-application-method",
    "swahili": "kikaboni-mbinu-maombi"
  },
  {
    "english": "organic-inputs",
    "swahili": "pembejeo za kikaboni"
  },
  {
    "english": "organic-input-application-freq",
    "swahili": "kikaboni-pembejeo-matumizi-freq"
  },
  {
    "english": "Plan Type",
    "swahili": "Aina ya Mpango"
  },
  {
    "english": "Tree type added successfully.",
    "swahili": "Aina ya mti imeongezwa kwa mafanikio."
  },
  {
    "english": "Tree type updated successfully.",
    "swahili": "Aina ya mti imesasishwa."
  },
  {
    "english": "Question type*",
    "swahili": "Aina ya swali*"
  },
  {
    "english": "Membership Type",
    "swahili": "Aina ya Uanachama"
  },
  {
    "english": "Membership Type",
    "swahili": "Aina ya Uanachama"
  },
  {
    "english": "Type of Access",
    "swahili": "Aina ya Ufikiaji"
  },
  {
    "english": "crop-type",
    "swahili": "aina ya mazao"
  },
  {
    "english": "Coffee species deleted",
    "swahili": "Aina za kahawa zimefutwa"
  },
  {
    "english": "Types of soil amendments used and quantity",
    "swahili": "Aina za marekebisho ya udongo kutumika na wingi"
  },
  {
    "english": "Special characters",
    "swahili": "Wahusika maalum"
  },
  {
    "english": "Assignee\n",
    "swahili": "Mkabidhiwa"
  },
  {
    "english": "Wild sunflower",
    "swahili": "Alizeti mwitu"
  },
  {
    "english": "Deactivated",
    "swahili": "Imezimwa"
  },
  {
    "english": "Unable to Login",
    "swahili": "Haiwezi Kuingia"
  },
  {
    "english": "Anhydrous ammonia",
    "swahili": "amonia isiyo na maji"
  },
  {
    "english": "Purchase Order",
    "swahili": "Agizo la Ununuzi"
  },
  {
    "english": "Reset Your Password",
    "swahili": "Weka upya Nenosiri lako"
  },
  {
    "english": "Enter Here",
    "swahili": "Ingia Hapa"
  },
  {
    "english": "Enter here",
    "swahili": "Ingia hapa"
  },
  {
    "english": "Enter your credentials.",
    "swahili": "Weka kitambulisho chako."
  },
  {
    "english": "Enter Your description here",
    "swahili": "Weka maelezo yako hapa"
  },
  {
    "english": "Enter mobile number",
    "swahili": "Weka nambari ya simu"
  },
  {
    "english": "Anthracnose",
    "swahili": "Ugonjwa wa Anthracnose"
  },
  {
    "english": "Anthracnose",
    "swahili": "Ugonjwa wa Anthracnose"
  },
  {
    "english": "Address",
    "swahili": "Anwani"
  },
  {
    "english": "IP address",
    "swahili": "Anwani ya IP"
  },
  {
    "english": "Aphanomyces Root Rot (Aphanomyces euteiches)",
    "swahili": "Aphanomyces Root Rot (Aphanomyces euteiches)"
  },
  {
    "english": "Aphids\\n",
    "swahili": "Vidukari\\n"
  },
  {
    "english": "Arabica",
    "swahili": "Kiarabu"
  },
  {
    "english": "Are you sure you want to delete {0} ticket?",
    "swahili": "Je, una uhakika unataka kufuta tikiti ya {0}?"
  },
  {
    "english": "Are you sure you want to delete role?",
    "swahili": "Je, una uhakika unataka kufuta jukumu?"
  },
  {
    "english": "Arka Bheem",
    "swahili": "Arka Bheem"
  },
  {
    "english": "Arusha",
    "swahili": "Arusha"
  },
  {
    "english": "APPOINT MANAGER",
    "swahili": "TEUA MENEJA"
  },
  {
    "english": "Ounces",
    "swahili": "Onzi"
  },
  {
    "english": "Three leaf stage",
    "swahili": "Hatua tatu za majani"
  },
  {
    "english": "Initial maturity stage",
    "swahili": "Awamu ya ukomavu wa awali"
  },
  {
    "english": "Post emergence",
    "swahili": "Kuibuka kwa chapisho"
  },
  {
    "english": "Change Settings",
    "swahili": "Badilisha Mipangilio"
  },
  {
    "english": "Change Global Settings",
    "swahili": "Badilisha Mipangilio ya Ulimwenguni"
  },
  {
    "english": "Change Default Plan",
    "swahili": "Badilisha Mpango Chaguomsingi"
  },
  {
    "english": "Custom",
    "swahili": "Desturi"
  },
  {
    "english": "You don't have any tickets assigned to you yet. Click on Create Ticket button on the top of this screen to get started.",
    "swahili": "Bado huna tikiti zozote ulizokabidhiwa. Bofya kitufe cha Unda Tiketi kilicho juu ya skrini hii ili kuanza."
  },
  {
    "english": "Specify the reason for membership extension",
    "swahili": "Bainisha sababu ya kuongeza muda wa uanachama"
  },
  {
    "english": "Email",
    "swahili": "Barua pepe"
  },
  {
    "english": "Email",
    "swahili": "Barua pepe"
  },
  {
    "english": "Email",
    "swahili": "Barua pepe"
  },
  {
    "english": "EMAIL SENT SUCCESSFULLY",
    "swahili": "BARUA PEPE IMETUMA KWA MAFANIKIO"
  },
  {
    "english": "E-mail is required",
    "swahili": "Barua pepe inahitajika"
  },
  {
    "english": "Email is required",
    "swahili": "Barua pepe inahitajika"
  },
  {
    "english": "E-mail must be valid",
    "swahili": "Barua pepe lazima iwe halali"
  },
  {
    "english": "Invalid email",
    "swahili": "Barua pepe si sahihi"
  },
  {
    "english": "Requestor Email",
    "swahili": "Barua pepe ya Muombaji"
  },
  {
    "english": "Price",
    "swahili": "Bei"
  },
  {
    "english": "Belimbing",
    "swahili": "Kubeza"
  },
  {
    "english": "Bergendal, Sidikalang",
    "swahili": "Bergendal, Sidikalang"
  },
  {
    "english": "Commodity",
    "swahili": "Bidhaa"
  },
  {
    "english": "Unsucc. login Lock-out period",
    "swahili": "Umeshindwa. kuingia Kipindi cha Kufungia nje"
  },
  {
    "english": "Manual (Human Energy)",
    "swahili": "Mwongozo (Nishati ya Binadamu)"
  },
  {
    "english": "Randomly",
    "swahili": "Nasibu"
  },
  {
    "english": "Blue Mountain",
    "swahili": "Mlima wa Bluu"
  },
  {
    "english": "Optimize cost",
    "swahili": "Boresha gharama"
  },
  {
    "english": "Brutte",
    "swahili": "Brutte"
  },
  {
    "english": "Dam",
    "swahili": "Bwawa"
  },
  {
    "english": "Reservoirs",
    "swahili": "Hifadhi za maji"
  },
  {
    "english": "Catimor",
    "swahili": "Catimor"
  },
  {
    "english": "Caturra",
    "swahili": "Caturra"
  },
  {
    "english": "Cercospora leaf spot / White spot",
    "swahili": "Doa la majani la Cercospora / Doa jeupe"
  },
  {
    "english": "Select",
    "swahili": "Chagua"
  },
  {
    "english": "Select Variety",
    "swahili": "Chagua Aina"
  },
  {
    "english": "Select Department",
    "swahili": "Idara iliyochaguliwa"
  },
  {
    "english": "Select Date Range",
    "swahili": "Chagua Masafa ya Tarehe"
  },
  {
    "english": "Select Month",
    "swahili": "Chagua Mwezi"
  },
  {
    "english": "Select Membership",
    "swahili": "Chagua Uanachama"
  },
  {
    "english": "Select Role",
    "swahili": "Chagua Jukumu"
  },
  {
    "english": "Select Week",
    "swahili": "Chagua Wiki"
  },
  {
    "english": "Selection 9 (Sln 9)",
    "swahili": "Chaguo 9 (Sln 9)"
  },
  {
    "english": "Tea",
    "swahili": "Chai"
  },
  {
    "english": "Tea (Nepal)",
    "swahili": "Chai (Nepal)"
  },
  {
    "english": "Source",
    "swahili": "Chanzo"
  },
  {
    "english": "Charrier",
    "swahili": "Mtoa huduma"
  },
  {
    "english": "Charrieriana",
    "swahili": "Charrieriana"
  },
  {
    "english": "Natural spring",
    "swahili": "Spring ya asili"
  },
  {
    "english": "Dry Milling Production Chart",
    "swahili": "Chati ya Uzalishaji wa Usagishaji Vikavu"
  },
  {
    "english": "Farmer Production Chart",
    "swahili": "Chati ya Uzalishaji wa Mkulima"
  },
  {
    "english": "Farmer Production Chart",
    "swahili": "Chati ya Uzalishaji wa Mkulima"
  },
  {
    "english": "Buying Station Production Chart",
    "swahili": "Chati ya Uzalishaji wa Kituo cha Kununua"
  },
  {
    "english": "Low",
    "swahili": "Chini"
  },
  {
    "english": "Less Then 1 Month",
    "swahili": "Chini Kisha Mwezi 1"
  },
  {
    "english": "Less Than 1 Month ",
    "swahili": "Chini ya Mwezi 1"
  },
  {
    "english": "Vegetative buds instead of",
    "swahili": "Buds za mboga badala ya"
  },
  {
    "english": "Vegetative buds instead of \nreproductive buds",
    "swahili": "Mimea ya mboga badala ya buds za uzazi"
  },
  {
    "english": "reproductive buds",
    "swahili": "buds za uzazi"
  },
  {
    "english": "suckers",
    "swahili": "wanyonyaji"
  },
  {
    "english": "Lime",
    "swahili": "Chokaa"
  },
  {
    "english": "Filter By",
    "swahili": "Chuja Kwa"
  },
  {
    "english": "MInute",
    "swahili": "Dakika"
  },
  {
    "english": "Damar",
    "swahili": "Damar"
  },
  {
    "english": "DAP",
    "swahili": "DAP"
  },
  {
    "english": "Dashboard",
    "swahili": "Dashibodi"
  },
  {
    "english": "Dashboard",
    "swahili": "Dashibodi"
  },
  {
    "english": "Storage Data Not Found",
    "swahili": "Data ya Hifadhi Haijapatikana"
  },
  {
    "english": "Coffee Data",
    "swahili": "Data ya Kahawa"
  },
  {
    "english": "Coffee Data\n",
    "swahili": "Data ya Kahawa"
  },
  {
    "english": "Coffee Data",
    "swahili": "Data ya Kahawa"
  },
  {
    "english": "Crop Observation Data Not Found",
    "swahili": "Data ya Uchunguzi wa Mazao Haijapatikana"
  },
  {
    "english": "Weeding Data Not Found",
    "swahili": "Data ya Palizi Haijapatikana"
  },
  {
    "english": "Sowing Data Not Found",
    "swahili": "Data ya Kupanda Haipatikani"
  },
  {
    "english": "Land Preparation Data Not Found",
    "swahili": "Data ya Maandalizi ya Ardhi Haijapatikana"
  },
  {
    "english": "Harvesting Data Not Found",
    "swahili": "Data ya Kuvuna Haijapatikana"
  },
  {
    "english": "Irrigation Data Not Found",
    "swahili": "Data ya Umwagiliaji Haijapatikana"
  },
  {
    "english": "Soil Management Data Not Found",
    "swahili": "Data ya Usimamizi wa Udongo Haijapatikana"
  },
  {
    "english": "herbicide-used",
    "swahili": "dawa-zinazotumika"
  },
  {
    "english": "herbicide-dose-rate",
    "swahili": "kiwango cha dawa ya kuulia wadudu"
  },
  {
    "english": "Defoamer",
    "swahili": "Defoamer"
  },
  {
    "english": "Diammonium phosphate",
    "swahili": "Phosphate ya almasi"
  },
  {
    "english": "dolomite",
    "swahili": "dolomite"
  },
  {
    "english": "Continue",
    "swahili": "Endelea"
  },
  {
    "english": "Location",
    "swahili": "Mahali"
  },
  {
    "english": "Location",
    "swahili": "Mahali"
  },
  {
    "english": "Region/District",
    "swahili": "Mkoa/Wilaya"
  },
  {
    "english": "File Uploaded Successfully",
    "swahili": "Faili Imepakiwa"
  },
  {
    "english": "your file",
    "swahili": "faili yako"
  },
  {
    "english": "Files accessed",
    "swahili": "Faili zimefikiwa"
  },
  {
    "english": "Uploaded Files",
    "swahili": "Faili Zilizopakiwa"
  },
  {
    "english": "Uploaded Files",
    "swahili": "Faili Zilizopakiwa"
  },
  {
    "english": "fungi",
    "swahili": "fangasi"
  },
  {
    "english": "FAQ",
    "swahili": "Maswali Yanayoulizwa Mara kwa Mara"
  },
  {
    "english": "Faq deleted",
    "swahili": "Faq imefutwa"
  },
  {
    "english": "Faq added successfully",
    "swahili": "Faq imeongezwa"
  },
  {
    "english": "Faq updated successfully",
    "swahili": "Faq imesasishwa"
  },
  {
    "english": "Finance",
    "swahili": "Fedha"
  },
  {
    "english": "File deleted successfully",
    "swahili": "Faili imefutwa"
  },
  {
    "english": "rock phosphate",
    "swahili": "phosphate ya mwamba"
  },
  {
    "english": "Potassium phosphate",
    "swahili": "Potasiamu phosphate"
  },
  {
    "english": "Potasium phosphate",
    "swahili": "Potasiamu phosphate"
  },
  {
    "english": "phosphorus",
    "swahili": "fosforasi"
  },
  {
    "english": "PhosphorusUnit",
    "swahili": "Kitengo cha Fosforasi"
  },
  {
    "english": "French Mission",
    "swahili": "Misheni ya Ufaransa"
  },
  {
    "english": "Activate Account",
    "swahili": "Washa Akaunti"
  },
  {
    "english": "Cancel",
    "swahili": "Ghairi"
  },
  {
    "english": "Delete",
    "swahili": "Futa"
  },
  {
    "english": "Delete Variety",
    "swahili": "Futa Aina"
  },
  {
    "english": "Delete Specie",
    "swahili": "Futa Aina"
  },
  {
    "english": "CLEAR ALL FILTERS",
    "swahili": "FUTA VICHUJI ZOTE"
  },
  {
    "english": "Delete Coffee Data",
    "swahili": "Futa Data ya Kahawa"
  },
  {
    "english": "Delete File",
    "swahili": "Futa Faili"
  },
  {
    "english": "Delete Faq",
    "swahili": "Futa Faq"
  },
  {
    "english": "Delete Role",
    "swahili": "Futa Jukumu"
  },
  {
    "english": "Delete Membership Plan",
    "swahili": "Futa Mpango wa Uanachama"
  },
  {
    "english": "Delete Membership Plan",
    "swahili": "Futa Mpango wa Uanachama"
  },
  {
    "english": "delete ticket",
    "swahili": "futa tikiti"
  },
  {
    "english": "CLEAR ALL",
    "swahili": "FUTA YOTE"
  },
  {
    "english": "red peach",
    "swahili": "peach nyekundu"
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
    "english": "Geisha / Gesha",
    "swahili": "Geisha / Gesha"
  },
  {
    "english": "Warehouse",
    "swahili": "Ghala"
  },
  {
    "english": "Warehouse",
    "swahili": "Ghala"
  },
  {
    "english": "Granary",
    "swahili": "Ghala"
  },
  {
    "english": "InBound Warehouse",
    "swahili": "Ghala la InBound"
  },
  {
    "english": "InBound Warehouse",
    "swahili": "Ghala la InBound"
  },
  {
    "english": "OutBound Warehouse",
    "swahili": "Ghala la OutBound"
  },
  {
    "english": "OutBound Warehouse",
    "swahili": "Ghala la OutBound"
  },
  {
    "english": "g",
    "swahili": "g"
  },
  {
    "english": "gm",
    "swahili": "gm"
  },
  {
    "english": "gram",
    "swahili": "gramu"
  },
  {
    "english": "Grams",
    "swahili": "Gramu"
  },
  {
    "english": "g/ac",
    "swahili": "g/ac"
  },
  {
    "english": "g/hc",
    "swahili": "g/hc"
  },
  {
    "english": "g/ml",
    "swahili": "g/ml"
  },
  {
    "english": "Guadeloupe Bonifieur",
    "swahili": "Guadeloupe Bonifieur"
  },
  {
    "english": "Siam weed",
    "swahili": "Siam magugu"
  },
  {
    "english": "Witch weed",
    "swahili": "Magugu ya mchawi"
  },
  {
    "english": "No specific timing",
    "swahili": "Hakuna muda maalum"
  },
  {
    "english": "Can not edit or update",
    "swahili": "Haiwezi kuhariri au kusasisha"
  },
  {
    "english": "Can't be less than 0",
    "swahili": "Haiwezi kuwa chini ya 0"
  },
  {
    "english": "Can't be less than 0",
    "swahili": "Haiwezi kuwa chini ya 0"
  },
  {
    "english": "Can't be less than 0",
    "swahili": "Haiwezi kuwa chini ya 0"
  },
  {
    "english": "Can't be less than 0",
    "swahili": "Haiwezi kuwa chini ya 0"
  },
  {
    "english": "No Data Found",
    "swahili": "Hakuna Data Imepatikana"
  },
  {
    "english": "NO DATA AVAILABLE",
    "swahili": "HAKUNA DATA INAYOPATIKANA"
  },
  {
    "english": "NO DATA AVAILABLE",
    "swahili": "HAKUNA DATA INAYOPATIKANA"
  },
  {
    "english": "No Admin Coffee data Found",
    "swahili": "Hakuna Data ya Kahawa ya Msimamizi Imepatikana"
  },
  {
    "english": "No Admin Roles Found",
    "swahili": "Hakuna Majukumu ya Msimamizi Yaliyopatikana"
  },
  {
    "english": " NO USER AVAILABLE",
    "swahili": "  HAKUNA MTUMIAJI ANAYEPATIKANA"
  },
  {
    "english": "NO LOG AVAILABLE",
    "swahili": "HAKUNA LOGU INAYOPATIKANA"
  },
  {
    "english": "No Date Found",
    "swahili": "Hakuna Tarehe Iliyopatikana"
  },
  {
    "english": "No Tickets Found!",
    "swahili": "Hakuna Tiketi Zilizopatikana!"
  },
  {
    "english": "No Activation Keys Found",
    "swahili": "Hakuna Vifunguo vya Uwezeshaji Vilivyopatikana"
  },
  {
    "english": "No activation keyss generated yet",
    "swahili": "Bado hakuna vitufe vya kuwezesha vilivyotolewa"
  },
  {
    "english": "Status",
    "swahili": "Hali"
  },
  {
    "english": "Status",
    "swahili": "Hali"
  },
  {
    "english": "Weather",
    "swahili": "Hali ya hewa"
  },
  {
    "english": "Weather",
    "swahili": "Hali ya hewa"
  },
  {
    "english": "Climatic conditions",
    "swahili": "Hali ya hewa"
  },
  {
    "english": "Keys Status",
    "swahili": "Hali ya Vifunguo"
  },
  {
    "english": "Ethiopian Harar",
    "swahili": "Harar ya Ethiopia"
  },
  {
    "english": "My Documents",
    "swahili": "Nyaraka Zangu"
  },
  {
    "english": "My Documents",
    "swahili": "Nyaraka Zangu"
  },
  {
    "english": "Action ",
    "swahili": "Kitendo"
  },
  {
    "english": "1st to nth trifoliolate stage",
    "swahili": "Hatua ya 1 hadi ya nth trifoliolate"
  },
  {
    "english": "Hawaiian Kona",
    "swahili": "Kona ya Hawaii"
  },
  {
    "english": "hdjdjd",
    "swahili": "hdjd"
  },
  {
    "english": "Hectare",
    "swahili": "Hekta"
  },
  {
    "english": "Hectares",
    "swahili": "Hekta"
  },
  {
    "english": "Upper case",
    "swahili": "Kesi ya juu"
  },
  {
    "english": "Lower case",
    "swahili": "Kesi ya chini"
  },
  {
    "english": "Acceptable range of characters ",
    "swahili": "Aina zinazokubalika za wahusika"
  },
  {
    "english": "Count Records",
    "swahili": "Hesabu Rekodi"
  },
  {
    "english": "Storage",
    "swahili": "Hifadhi"
  },
  {
    "english": "Storage",
    "swahili": "Hifadhi"
  },
  {
    "english": "Storage",
    "swahili": "Hifadhi"
  },
  {
    "english": "Download sample file",
    "swahili": "Pakua sampuli ya faili"
  },
  {
    "english": "Inadequate storage",
    "swahili": "Hifadhi isiyofaa"
  },
  {
    "english": "SAVE PERMISSIONS",
    "swahili": "HIFADHI VIBALI"
  },
  {
    "english": "Underground storage",
    "swahili": "Hifadhi ya chini ya ardhi"
  },
  {
    "english": "Pit storage",
    "swahili": "Hifadhi ya shimo"
  },
  {
    "english": "Clamp storage",
    "swahili": "Hifadhi ya clamp"
  },
  {
    "english": "Storage-Area",
    "swahili": "Eneo la Hifadhi"
  },
  {
    "english": "Storage-Yield",
    "swahili": "Uhifadhi-Mavuno"
  },
  {
    "english": "Quantity",
    "swahili": "Kiasi"
  },
  {
    "english": "Number of allowed Unsuccessful Login Attempts",
    "swahili": "Idadi ya Majaribio ya Kuingia Isiyoruhusiwa yanayoruhusiwa"
  },
  {
    "english": "Number of Days",
    "swahili": "Idadi ya Siku"
  },
  {
    "english": "Number of Days Remaining",
    "swahili": "Idadi ya Siku Zilizosalia"
  },
  {
    "english": "Number of unique passwords required",
    "swahili": "Idadi ya manenosiri ya kipekee inahitajika"
  },
  {
    "english": "Number of Keys",
    "swahili": "Idadi ya Funguo"
  },
  {
    "english": "Number of Activation Keys",
    "swahili": "Idadi ya Vifunguo vya Uwezeshaji"
  },
  {
    "english": "Department",
    "swahili": "Idara"
  },
  {
    "english": "Department is required",
    "swahili": "Idara inahitajika"
  },
  {
    "english": "Open",
    "swahili": "Fungua"
  },
  {
    "english": "Generated By",
    "swahili": "Imetolewa Na"
  },
  {
    "english": "Fuel Based",
    "swahili": "Kulingana na Mafuta"
  },
  {
    "english": "Customised ",
    "swahili": "Imebinafsishwa"
  },
  {
    "english": "Staggered",
    "swahili": "Kujikongoja"
  },
  {
    "english": "rainfed",
    "swahili": "mvua"
  },
  {
    "english": "Closed",
    "swahili": "Imefungwa"
  },
  {
    "english": "Expired",
    "swahili": "Muda wake umeisha"
  },
  {
    "english": "Rejected",
    "swahili": "Imekataliwa"
  },
  {
    "english": "Approved",
    "swahili": "Imeidhinishwa"
  },
  {
    "english": "irrigated",
    "swahili": "kumwagilia"
  },
  {
    "english": "Unable to delete",
    "swahili": "Imeshindwa kufuta"
  },
  {
    "english": "Unable to update",
    "swahili": "Imeshindwa kusasisha"
  },
  {
    "english": "Loading... Please wait",
    "swahili": "Inapakia... Tafadhali subiri"
  },
  {
    "english": " Coming Soon",
    "swahili": "  Inakuja Hivi Karibuni"
  },
  {
    "english": "Loading Data...",
    "swahili": "Inapakia Data..."
  },
  {
    "english": "Pending",
    "swahili": "Inasubiri"
  },
  {
    "english": "Loading Users... Please wait",
    "swahili": "Inapakia Watumiaji... Tafadhali subiri"
  },
  {
    "english": "Login",
    "swahili": "Ingia"
  },
  {
    "english": "Login Now",
    "swahili": "Ingia Sasa"
  },
  {
    "english": "Unique symbols",
    "swahili": "Alama za kipekee"
  },
  {
    "english": "SyntheticFertilizerApplicationRateWeightAreaUnit",
    "swahili": "SyntheticFertilizerApplicationRateWeightAreaUnit"
  },
  {
    "english": "synthetic-application-method",
    "swahili": "njia-ya-maombi-ya-sintetiki"
  },
  {
    "english": "Fertilizer application schedule",
    "swahili": "Ratiba ya uwekaji mbolea"
  },
  {
    "english": "community",
    "swahili": "jumuiya"
  },
  {
    "english": "Unsuccessful Login attempt",
    "swahili": "Jaribio la Kuingia halijafaulu"
  },
  {
    "english": "Gypsum",
    "swahili": "Gypsum"
  },
  {
    "english": "Java",
    "swahili": "Java"
  },
  {
    "english": "FAQ Answer",
    "swahili": "Maswali Yanayoulizwa Mara kwa Mara"
  },
  {
    "english": "Are you sure you want to change user status?",
    "swahili": "Je, una uhakika unataka kubadilisha hali ya mtumiaji?"
  },
  {
    "english": "Forgot Your Password?",
    "swahili": "Umesahau nenosiri yako?"
  },
  {
    "english": "Are you sure you want to delete Variety?",
    "swahili": "Je, una uhakika unataka kufuta Aina mbalimbali?"
  },
  {
    "english": "Are you sure you want to delete Specie?",
    "swahili": "Je, una uhakika unataka kufuta Spishi?"
  },
  {
    "english": "Are you sure you want to delete this faq?",
    "swahili": "Je, una uhakika unataka kufuta faq hii?"
  },
  {
    "english": "Are you sure you want to delete technical issues topic?",
    "swahili": "Je, una uhakika unataka kufuta mada ya masuala ya kiufundi?"
  },
  {
    "english": "Are you sure you want to delete this membership plan?",
    "swahili": "Je, una uhakika unataka kufuta mpango huu wa uanachama?"
  },
  {
    "english": "Are you sure you want to make this membership type default?",
    "swahili": "Je, una uhakika ungependa kufanya aina hii ya uanachama iwe chaguomsingi?"
  },
  {
    "english": "Are you sure you want to delete Supervisor role?",
    "swahili": "Je, una uhakika unataka kufuta jukumu la Msimamizi?"
  },
  {
    "english": "Are you sure you want to delete this membership plan?",
    "swahili": "Je, una uhakika unataka kufuta mpango huu wa uanachama?"
  },
  {
    "english": "Hoe/digger",
    "swahili": "Jembe/mchimbaji"
  },
  {
    "english": "Farm shed",
    "swahili": "Shamba la shamba"
  },
  {
    "english": "Reply",
    "swahili": "Jibu"
  },
  {
    "english": "City is required",
    "swahili": "Jiji linahitajika"
  },
  {
    "english": "City/Town",
    "swahili": "Mji/Mji"
  },
  {
    "english": "State is required",
    "swahili": "Jimbo linahitajika"
  },
  {
    "english": "Name",
    "swahili": "Jina"
  },
  {
    "english": "Display Name",
    "swahili": "Jina la Kuonyesha"
  },
  {
    "english": "File Name",
    "swahili": "Jina la faili"
  },
  {
    "english": "Answer name is required",
    "swahili": "Jina la jibu linahitajika"
  },
  {
    "english": "Role Name",
    "swahili": "Jina la jukumu"
  },
  {
    "english": "Role name is required",
    "swahili": "Jina la jukumu linahitajika"
  },
  {
    "english": "Role name must be less than 15 characters",
    "swahili": "Jina la jukumu lazima liwe chini ya herufi 15"
  },
  {
    "english": "Role name must be less than 15 characters",
    "swahili": "Jina la jukumu lazima liwe chini ya herufi 15"
  },
  {
    "english": "Dry Milling Name",
    "swahili": "Jina la Dry Milling"
  },
  {
    "english": "First Name",
    "swahili": "Jina la kwanza"
  },
  {
    "english": "Topic name is required",
    "swahili": "Jina la mada linahitajika"
  },
  {
    "english": "Topic name is required",
    "swahili": "Jina la mada linahitajika"
  },
  {
    "english": "Farmer Name",
    "swahili": "Jina la Mkulima"
  },
  {
    "english": "User Name",
    "swahili": "Jina la mtumiaji"
  },
  {
    "english": "Username",
    "swahili": "Jina la mtumiaji"
  },
  {
    "english": "Last Name",
    "swahili": "Jina la familia"
  },
  {
    "english": "Last Name is required",
    "swahili": "Jina la Mwisho linahitajika"
  },
  {
    "english": "Last Name must be less than 15 characters",
    "swahili": "Jina la Ukoo lazima liwe chini ya herufi 15"
  },
  {
    "english": "Last Name can contain only alphbets",
    "swahili": "Jina la Mwisho linaweza kuwa na alfabeti pekee"
  },
  {
    "english": "Module name",
    "swahili": "Jina la moduli"
  },
  {
    "english": "Plantation Name",
    "swahili": "Jina la shamba"
  },
  {
    "english": "Name is required",
    "swahili": "Jina linahitajika"
  },
  {
    "english": "file-name",
    "swahili": "jina la faili"
  },
  {
    "english": "Firstname is required",
    "swahili": "Jina la kwanza linahitajika"
  },
  {
    "english": "Firstname can contain only alphbets",
    "swahili": "Jina la kwanza linaweza kuwa na alfabeti pekee"
  },
  {
    "english": "Firstname must be less than 15 characters",
    "swahili": "Jina la kwanza lazima liwe chini ya herufi 15"
  },
  {
    "english": "Refrigerator",
    "swahili": "Jokofu"
  },
  {
    "english": "High temperatures/plastic cover",
    "swahili": "Joto la juu / kifuniko cha plastiki"
  },
  {
    "english": "Solar",
    "swahili": "Sola"
  },
  {
    "english": "Role",
    "swahili": "Jukumu"
  },
  {
    "english": "Role Requested",
    "swahili": "Jukumu Limeombwa"
  },
  {
    "english": "Role Assigned",
    "swahili": "Jukumu Limetolewa"
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
