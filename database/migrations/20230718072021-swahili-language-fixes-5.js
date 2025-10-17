'use strict';

const data = [
  {
    "english": "Liyaye",
    "swahili": "Liyaye"
  },
  {
    "english": "Vitamin A cassava",
    "swahili": "Muhogo wa Vitamini A"
  },
  {
    "english": "Malyoha",
    "swahili": "Malyoha"
  },
  {
    "english": "Sawa sawa",
    "swahili": "Sawa sawa"
  },
  {
    "english": "Mapendo",
    "swahili": "Mapendo"
  },
  {
    "english": "Game changer",
    "swahili": "Kubadilisha mchezo"
  },
  {
    "english": "Hope",
    "swahili": "Tumaini"
  },
  {
    "english": "Poundable",
    "swahili": "Inayoweza kupinduka"
  },
  {
    "english": "Farmer's pride",
    "swahili": "Fahari ya mkulima"
  },
  {
    "english": "Dixon",
    "swahili": "Dixon"
  },
  {
    "english": "Ayaya",
    "swahili": "Ayaya"
  },
  {
    "english": "Sunshine",
    "swahili": "Mwanga wa jua"
  },
  {
    "english": "Fineface",
    "swahili": "Fineface"
  },
  {
    "english": "Kirimumpale",
    "swahili": "Kirimumpale"
  },
  {
    "english": "Magana",
    "swahili": "Magana"
  },
  {
    "english": "Abiriya",
    "swahili": "Abiriya"
  },
  {
    "english": "Sanje",
    "swahili": "Sanje"
  },
  {
    "english": "Njule",
    "swahili": "Njule"
  },
  {
    "english": "Bao, Alodo-alodo",
    "swahili": "Bao, Alodo-alodo"
  },
  {
    "english": "Bukalasa",
    "swahili": "Bukalasa"
  },
  {
    "english": "Fumba chai",
    "swahili": "Fumba chai"
  },
  {
    "english": "AKENA",
    "swahili": "AKENA"
  },
  {
    "english": "Royal quinoa",
    "swahili": "Quinoa ya kifalme"
  },
  {
    "english": "Blanca de Junin",
    "swahili": "Blanca de Junin"
  },
  {
    "english": "Amarilla Marangani",
    "swahili": "Amarilla Marangani"
  },
  {
    "english": "Blanca de Juli",
    "swahili": "Blanca de Juli"
  },
  {
    "english": "Kankolla",
    "swahili": "Kankolla"
  },
  {
    "english": "Hulhuas",
    "swahili": "Hulhuas"
  },
  {
    "english": "Huacariz",
    "swahili": "Huakariz"
  },
  {
    "english": "Cheweca",
    "swahili": "Cheweka"
  },
  {
    "english": "Egyptian Pink",
    "swahili": "Pink ya Misri"
  },
  {
    "english": "Elephant",
    "swahili": "Tembo"
  },
  {
    "english": "Tuscan",
    "swahili": "Tuscan"
  },
  {
    "english": "Endory",
    "swahili": "Endory"
  },
  {
    "english": "Raghiani",
    "swahili": "Raghiani"
  },
  {
    "english": "Rashli",
    "swahili": "Rashli"
  },
  {
    "english": "Jaminiya",
    "swahili": "Jamani"
  },
  {
    "english": "Sebha",
    "swahili": "Sebha"
  },
  {
    "english": "Barka",
    "swahili": "Barka"
  },
  {
    "english": "Zerda",
    "swahili": "Zerda"
  },
  {
    "english": "Fezzan",
    "swahili": "Fezzan"
  },
  {
    "english": "Mexicali",
    "swahili": "Mexicali"
  },
  {
    "english": "Supersweet",
    "swahili": "Utamu wa hali ya juu"
  },
  {
    "english": "Deccan Hybrid",
    "swahili": "Mseto wa Deccan"
  },
  {
    "english": "Ganga safed",
    "swahili": "Ganga salama"
  },
  {
    "english": "Hi-starch",
    "swahili": "Hi-wanga"
  },
  {
    "english": "Paras",
    "swahili": "Paras"
  },
  {
    "english": "White star",
    "swahili": "Nyota nyeupe"
  },
  {
    "english": "Western Queen",
    "swahili": "Malkia wa Magharibi"
  },
  {
    "english": "Up- to-Date",
    "swahili": "Imesasishwa"
  },
  {
    "english": "Pentland Dell",
    "swahili": "Pentland Dell"
  },
  {
    "english": "Pimpernel",
    "swahili": "Pimpernel"
  },
  {
    "english": "Majestic",
    "swahili": "Mkuu"
  },
  {
    "english": "Baraka",
    "swahili": "Baraka"
  },
  {
    "english": "Challenger",
    "swahili": "Mshindani"
  },
  {
    "english": "Courage",
    "swahili": "Ujasiri"
  },
  {
    "english": "Victoria",
    "swahili": "Victoria"
  },
  {
    "english": "Innovator",
    "swahili": "Mvumbuzi"
  },
  {
    "english": "Papa pastusa",
    "swahili": "Papa pasta"
  },
  {
    "english": "Papa sabanera",
    "swahili": "Papa sabanera"
  },
  {
    "english": "Canchan",
    "swahili": "Canchan"
  },
  {
    "english": "Huaych’a",
    "swahili": "Huaych��a"
  },
  {
    "english": "Runapapa",
    "swahili": "Runapapa"
  },
  {
    "english": "Phureja roja",
    "swahili": "Phureja roja"
  },
  {
    "english": "Yuraj imilla",
    "swahili": "Yuraj milla"
  },
  {
    "english": "Jaspe",
    "swahili": "Jaspe"
  },
  {
    "english": "ACC madam blue",
    "swahili": "ACC madam blue"
  },
  {
    "english": "Abbot",
    "swahili": "Abate"
  },
  {
    "english": "Erika",
    "swahili": "Erika"
  },
  {
    "english": "Jazzy",
    "swahili": "Jazzy"
  },
  {
    "english": "Krone",
    "swahili": "Krone"
  },
  {
    "english": "Labella",
    "swahili": "Labela"
  },
  {
    "english": "Lady Amarilla",
    "swahili": "Mwanamke Amarilla"
  },
  {
    "english": "Laperla",
    "swahili": "Laperla"
  },
  {
    "english": "Little giant",
    "swahili": "Jitu kidogo"
  },
  {
    "english": "Melody",
    "swahili": "Melody"
  },
  {
    "english": "Musica",
    "swahili": "Muziki"
  },
  {
    "english": "Umatilla Russet",
    "swahili": "Umatilla Russet"
  },
  {
    "english": "Norland",
    "swahili": "Norland"
  },
  {
    "english": "Irish Cobbler",
    "swahili": "Cobbler wa Ireland"
  },
  {
    "english": "Moutain rose",
    "swahili": "Mlima rose"
  },
  {
    "english": "Cheiftan",
    "swahili": "Cheiftan"
  },
  {
    "english": "Viking",
    "swahili": "Viking"
  },
  {
    "english": "Elba",
    "swahili": "Elba"
  },
  {
    "english": "Red La soda",
    "swahili": "Nyekundu La soda"
  },
  {
    "english": "Lady Roseta",
    "swahili": "Bibi Roseta"
  },
  {
    "english": "tukdah",
    "swahili": "tukdah"
  },
  {
    "english": "Copati",
    "swahili": "Copati"
  },
  {
    "english": "Kashi Amul",
    "swahili": "Kashi Amul"
  },
  {
    "english": "Kashi Adarsh",
    "swahili": "Kashi Adarsh"
  },
  {
    "english": "Kashi Abhiman",
    "swahili": "Kashi Abhiman"
  },
  {
    "english": "Kashi Anupam",
    "swahili": "Kashi Anupam"
  },
  {
    "english": "Kashi Sharad",
    "swahili": "Kashi Sharad"
  },
  {
    "english": "Kashi Hemant",
    "swahili": "Kashi Hemant"
  },
  {
    "english": "Kashi Amrit",
    "swahili": "Kashi Amrit"
  },
  {
    "english": "Kashi Vishesh",
    "swahili": "Kashi Vishesh"
  },
  {
    "english": "Vaishali",
    "swahili": "Vaishali"
  },
  {
    "english": "Rupali",
    "swahili": "Rupali"
  },
  {
    "english": "Rashmi",
    "swahili": "Rashmi"
  },
  {
    "english": "Rajni",
    "swahili": "Rajni"
  },
  {
    "english": "Sioux",
    "swahili": "Sioux"
  },
  {
    "english": "Best of All",
    "swahili": "Nzuri kwa zote"
  },
  {
    "english": "Marglobe",
    "swahili": "Marglobe"
  },
  {
    "english": "Roma",
    "swahili": "Roma"
  },
  {
    "english": "Punjab Chuhra",
    "swahili": "Punjab Chuhra"
  },
  {
    "english": "Shivalik",
    "swahili": "Shivalik"
  },
  {
    "english": "Versha",
    "swahili": "Versha"
  },
  {
    "english": "Bravo",
    "swahili": "Bravo"
  },
  {
    "english": "Archana",
    "swahili": "Archana"
  },
  {
    "english": "Sadabahar",
    "swahili": "Sadabahar"
  },
  {
    "english": "Arka Ahuti",
    "swahili": "Ark Ahuti"
  },
  {
    "english": "Arka Abha",
    "swahili": "Arka Abha"
  },
  {
    "english": "Arka Meghali",
    "swahili": "Arka Meghali"
  },
  {
    "english": "Pant Bahar",
    "swahili": "Pant Bahar"
  },
  {
    "english": "Arka Saurabh",
    "swahili": "Arka Saurabh"
  },
  {
    "english": "Arka Alok",
    "swahili": "Arka Alok"
  },
  {
    "english": "Sea Island cotton",
    "swahili": "Pamba ya Kisiwa cha Bahari"
  },
  {
    "english": "American Up-land cotton",
    "swahili": "Pamba ya Amerika ya Juu"
  },
  {
    "english": "Catui",
    "swahili": "Catui"
  },
  {
    "english": "Novo",
    "swahili": "Novo"
  },
  {
    "english": "Mundo",
    "swahili": "Mundo"
  },
  {
    "english": "Garnica",
    "swahili": "Garnica"
  },
  {
    "english": "Erecta.",
    "swahili": "Erecta."
  },
  {
    "english": "Agaro",
    "swahili": "Agaro"
  },
  {
    "english": "Barbuk Sudan",
    "swahili": "Barbuk Sudan"
  },
  {
    "english": "Bedessa",
    "swahili": "Bedessa"
  },
  {
    "english": "Dega",
    "swahili": "Dega"
  },
  {
    "english": "H3",
    "swahili": "H3"
  },
  {
    "english": "native heirloom",
    "swahili": "urithi wa asili"
  },
  {
    "english": "Rume Sudan",
    "swahili": "Rume Sudan"
  },
  {
    "english": "Sawa",
    "swahili": "Sawa"
  },
  {
    "english": "Tafari Kela",
    "swahili": "Tafari Kela"
  },
  {
    "english": "Andog sari",
    "swahili": "Andog sari"
  },
  {
    "english": "Ethiopian",
    "swahili": "wa Ethiopia"
  },
  {
    "english": "Linie S",
    "swahili": "Lini S"
  },
  {
    "english": "Castillo®",
    "swahili": "Castillo®"
  },
  {
    "english": "Catimor,",
    "swahili": "Catimor,"
  },
  {
    "english": "Typica,",
    "swahili": "Aina,"
  },
  {
    "english": "Catuai.",
    "swahili": "Catuai."
  },
  {
    "english": "Moka",
    "swahili": "Moka"
  },
  {
    "english": "Culi",
    "swahili": "Culi"
  },
  {
    "english": "mara catura",
    "swahili": "mara catura"
  },
  {
    "english": "Poovan",
    "swahili": "Poovan"
  },
  {
    "english": "Monthan",
    "swahili": "Monthan"
  },
  {
    "english": "Rasthali",
    "swahili": "Rasthali"
  },
  {
    "english": "Nendran",
    "swahili": "Nendran"
  },
  {
    "english": "red banana",
    "swahili": "ndizi nyekundu"
  },
  {
    "english": "grand naine",
    "swahili": "mkuu naine"
  },
  {
    "english": "Karpooravalli",
    "swahili": "Karpooravalli"
  },
  {
    "english": "yellow dwarf Bananas",
    "swahili": "njano kibete Ndizi"
  },
  {
    "english": "Red dwarf Bananas.",
    "swahili": "Ndizi za rangi nyekundu."
  },
  {
    "english": "green Bananas",
    "swahili": "Ndizi za kijani"
  },
  {
    "english": "Green",
    "swahili": "Kijani"
  },
  {
    "english": "Black",
    "swahili": "Nyeusi"
  },
  {
    "english": "Argene",
    "swahili": "Argene"
  },
  {
    "english": "Serkamo",
    "swahili": "Serkamo"
  },
  {
    "english": "S",
    "swahili": "S"
  },
  {
    "english": "Tate",
    "swahili": "Tate"
  },
  {
    "english": "Ahadu",
    "swahili": "Ahadu"
  },
  {
    "english": "Borkena",
    "swahili": "Borkena"
  },
  {
    "english": "Obsa",
    "swahili": "Obsa"
  },
  {
    "english": "Dicho",
    "swahili": "Dicho"
  },
  {
    "english": "Barsan",
    "swahili": "Barsan"
  },
  {
    "english": "Lidan",
    "swahili": "Lidani"
  },
  {
    "english": "Arkebe",
    "swahili": "Arkebe"
  },
  {
    "english": "Smrat",
    "swahili": "Smrat"
  },
  {
    "english": "Bonay",
    "swahili": "Bonay"
  },
  {
    "english": "Bhavani",
    "swahili": "Bhavani"
  },
  {
    "english": "Panchali",
    "swahili": "Panchli"
  },
  {
    "english": "Sangam",
    "swahili": "Sangam"
  },
  {
    "english": "Pakola",
    "swahili": "Pakola"
  },
  {
    "english": "Canola Raya",
    "swahili": "Canola Raya"
  },
  {
    "english": "Rainbow",
    "swahili": "Upinde wa mvua"
  },
  {
    "english": "Amazon",
    "swahili": "Amazon"
  },
  {
    "english": "Mercedes",
    "swahili": "Mercedes"
  },
  {
    "english": "Frontana",
    "swahili": "Mbele"
  },
  {
    "english": "Mentana",
    "swahili": "Mentana"
  },
  {
    "english": "Tucano",
    "swahili": "Tucano"
  },
  {
    "english": "Vacaria",
    "swahili": "Vacaria"
  },
  {
    "english": "Pavao",
    "swahili": "Pavao"
  },
  {
    "english": "Climax",
    "swahili": "Kilele"
  },
  {
    "english": "Richmond",
    "swahili": "Richmond"
  },
  {
    "english": "Rasant",
    "swahili": "Rasant"
  },
  {
    "english": "Timfo",
    "swahili": "Timfo"
  },
  {
    "english": "Alma",
    "swahili": "Alma"
  },
  {
    "english": "Basho",
    "swahili": "Basho"
  },
  {
    "english": "Bounty",
    "swahili": "Fadhila"
  },
  {
    "english": "Champ",
    "swahili": "Bingwa"
  },
  {
    "english": "Comtal",
    "swahili": "Comtal"
  },
  {
    "english": "Tiller",
    "swahili": "Mkulima"
  },
  {
    "english": "Clair",
    "swahili": "Clair"
  },
  {
    "english": "Barfleo",
    "swahili": "Barfleo"
  },
  {
    "english": "Kootenai",
    "swahili": "Kootenai"
  },
  {
    "english": "Barpenta",
    "swahili": "Barpenta"
  },
  {
    "english": "Toro",
    "swahili": "Toro"
  },
  {
    "english": "Mariposa",
    "swahili": "Mariposa"
  },
  {
    "english": "Champlain",
    "swahili": "Champlain"
  },
  {
    "english": "Finecut",
    "swahili": "Njia nzuri"
  },
  {
    "english": "Gulfcut",
    "swahili": "Gulfcut"
  },
  {
    "english": "Pioneer",
    "swahili": "Painia"
  },
  {
    "english": "Reclaimar",
    "swahili": "Mdai upya"
  },
  {
    "english": "Salcut",
    "swahili": "Salcut"
  },
  {
    "english": "Topcut",
    "swahili": "Njia ya juu"
  },
  {
    "english": "Boma",
    "swahili": "Boma"
  },
  {
    "english": "Callida",
    "swahili": "Callida"
  },
  {
    "english": "Elmba",
    "swahili": "Elmba"
  },
  {
    "english": "Marina",
    "swahili": "Marina"
  },
  {
    "english": "Sabre",
    "swahili": "Saber"
  },
  {
    "english": "KP8",
    "swahili": "KP8"
  },
  {
    "english": "Nemcut",
    "swahili": "Nemcut"
  },
  {
    "english": "Asatsuyu",
    "swahili": "Asatsuyu"
  },
  {
    "english": "Katambora",
    "swahili": "Katambora"
  },
  {
    "english": "Tolgar",
    "swahili": "Tolgar"
  },
  {
    "english": "Egyptian giant",
    "swahili": "jitu la Misri"
  },
  {
    "english": "Marmand",
    "swahili": "Marmand"
  },
  {
    "english": "Edkawy",
    "swahili": "Edkawy"
  },
  {
    "english": "Pakmor-b",
    "swahili": "Pakmor-b"
  },
  {
    "english": "Floradade",
    "swahili": "Floradade"
  },
  {
    "english": "Mountain fresh plus",
    "swahili": "Mlima safi zaidi"
  },
  {
    "english": "Mountain spring",
    "swahili": "Spring ya mlima"
  },
  {
    "english": "Polbig",
    "swahili": "Polbig"
  },
  {
    "english": "Big beef",
    "swahili": "Ng'ombe kubwa"
  },
  {
    "english": "Boxcar willie",
    "swahili": "Boxcar willie"
  },
  {
    "english": "Mortgage lifter",
    "swahili": "Mortgage lifter"
  },
  {
    "english": "Red pearl",
    "swahili": "Lulu nyekundu"
  },
  {
    "english": "Sun gold",
    "swahili": "dhahabu ya jua"
  },
  {
    "english": "Blackhawk",
    "swahili": "Blackhawk"
  },
  {
    "english": "Valentine",
    "swahili": "Valentine"
  },
  {
    "english": "Black eclipse",
    "swahili": "Kupatwa kwa giza"
  },
  {
    "english": "Black bear",
    "swahili": "Dubu mweusi"
  },
  {
    "english": "Abdin",
    "swahili": "Abdin"
  },
  {
    "english": "Hadi ( Okra – leaf Barakat )",
    "swahili": "Hadi ( Okra – jani Barakat )"
  },
  {
    "english": "Kheiralla",
    "swahili": "Kheiralla"
  },
  {
    "english": "Wager",
    "swahili": "Wager"
  },
  {
    "english": "Burhan",
    "swahili": "Burhan"
  },
  {
    "english": "Khalifa",
    "swahili": "Khalifa"
  },
  {
    "english": "Bukalasa pedigree albar",
    "swahili": "Ukoo wa Bukalasa albar"
  },
  {
    "english": "Serere albar type uganda (satu)",
    "swahili": "Serere albar aina uganda (satu)"
  },
  {
    "english": "Guaraní inta bgrr",
    "swahili": "Guaraní inta bgrr"
  },
  {
    "english": "Nuopal rr",
    "swahili": "Nuopal rr"
  },
  {
    "english": "Purnima",
    "swahili": "Purnima"
  },
  {
    "english": "Jaydhar",
    "swahili": "Jaydhar"
  },
  {
    "english": "Malgari",
    "swahili": "Malgari"
  },
  {
    "english": "Abhadita,",
    "swahili": "Ahadita,"
  },
  {
    "english": "Catuai,",
    "swahili": "Catuai,"
  },
  {
    "english": "Caturra,",
    "swahili": "Caturra,"
  },
  {
    "english": "Geisha,",
    "swahili": "Geisha,"
  },
  {
    "english": "Lempira,",
    "swahili": "Lempira,"
  },
  {
    "english": "Hartman",
    "swahili": "Hartman"
  },
  {
    "english": "Girard",
    "swahili": "Girard"
  },
  {
    "english": "Finch",
    "swahili": "Finch"
  },
  {
    "english": "Saffire",
    "swahili": "Saffire"
  },
  {
    "english": "Centennial",
    "swahili": "Karne"
  },
  {
    "english": "Montola",
    "swahili": "Montola"
  },
  {
    "english": "merah besar",
    "swahili": "merah besar"
  },
  {
    "english": "curly green chilli",
    "swahili": "pilipili ya kijani kibichi"
  },
  {
    "english": "Red birds eye chilli",
    "swahili": "Ndege nyekundu macho ya pilipili"
  },
  {
    "english": "green birds eye",
    "swahili": "ndege ya kijani jicho"
  },
  {
    "english": "kanthari",
    "swahili": "kanthari"
  },
  {
    "english": "kashmiri chilli",
    "swahili": "kashmiri pilipili"
  },
  {
    "english": "Bhagya lakshmi",
    "swahili": "Bhagya lakshmi"
  },
  {
    "english": "birds eye chilli (dhani)",
    "swahili": "ndege jicho pilipili (dhani)"
  },
  {
    "english": "guntur chilli",
    "swahili": "pilipili ya moto"
  },
  {
    "english": "tomato chilli",
    "swahili": "nyanya pilipili"
  },
  {
    "english": "madras pari",
    "swahili": "madras pari"
  },
  {
    "english": "ramnad mundu",
    "swahili": "ramnad mundu"
  },
  {
    "english": "nagpur",
    "swahili": "nagpur"
  },
  {
    "english": "Crisphead",
    "swahili": "Crisphead"
  },
  {
    "english": "Butterhead",
    "swahili": "Butterhead"
  },
  {
    "english": "Romaine",
    "swahili": "Romaine"
  },
  {
    "english": "Loose leaf",
    "swahili": "Lege jani"
  },
  {
    "english": "Frisbee",
    "swahili": "Frisbee"
  },
  {
    "english": "Radicchio",
    "swahili": "Radicchio"
  },
  {
    "english": "Oak leaf lettuce",
    "swahili": "lettuce ya majani ya mwaloni"
  },
  {
    "english": "stem lettuce",
    "swahili": "lettuce ya shina"
  },
  {
    "english": "Arugula",
    "swahili": "Arugula"
  },
  {
    "english": "cress",
    "swahili": "cress"
  },
  {
    "english": "Endive",
    "swahili": "Endive"
  },
  {
    "english": "coral lettuce",
    "swahili": "lettuce ya matumbawe"
  },
  {
    "english": "Mache",
    "swahili": "Mache"
  },
  {
    "english": "Boston",
    "swahili": "Boston"
  },
  {
    "english": "Ambon banana",
    "swahili": "Ndizi ya Ambon"
  },
  {
    "english": "Barangan",
    "swahili": "Barangan"
  },
  {
    "english": "Kepok banana",
    "swahili": "Kepok ndizi"
  },
  {
    "english": "Mas banana",
    "swahili": "Mas ndizi"
  },
  {
    "english": "Cavendish",
    "swahili": "Cavendish"
  },
  {
    "english": "Lampung banana",
    "swahili": "Ndizi ya Lampung"
  },
  {
    "english": "Awk banana",
    "swahili": "Awk ndizi"
  },
  {
    "english": "Champa",
    "swahili": "Champa"
  },
  {
    "english": "Ronit",
    "swahili": "Ronit"
  },
  {
    "english": "Sper Elad",
    "swahili": "Sper Elad"
  },
  {
    "english": "Trailblazer",
    "swahili": "Trailblazer"
  },
  {
    "english": "Vega",
    "swahili": "Vega"
  },
  {
    "english": "Candy",
    "swahili": "Pipi"
  },
  {
    "english": "Exacta",
    "swahili": "Exact"
  },
  {
    "english": "Red Sky",
    "swahili": "Anga Nyekundu"
  },
  {
    "english": "Redwing",
    "swahili": "Redwing"
  },
  {
    "english": "Bhima Shubhra",
    "swahili": "Bhima Shubhra"
  },
  {
    "english": "Brown Spanish",
    "swahili": "Brown Kihispania"
  },
  {
    "english": "Punjab Naroya",
    "swahili": "Punjab Naroya"
  },
  {
    "english": "HERITAGE ENDURANCE",
    "swahili": "UVUMILIVU WA URITHI"
  },
  {
    "english": "SARDI-GRAZER",
    "swahili": "SARDI-GRAZER"
  },
  {
    "english": "Tenera",
    "swahili": "Tenera"
  },
  {
    "english": "Golden acre",
    "swahili": "Ekari ya dhahabu"
  },
  {
    "english": "Danish ballhead",
    "swahili": "Mpira wa Kideni"
  },
  {
    "english": "Kranti",
    "swahili": "Kranti"
  },
  {
    "english": "Manado Malay",
    "swahili": "Manado Malay"
  },
  {
    "english": "North Moluccan Malay",
    "swahili": "Kaskazini Moluccan Malay"
  },
  {
    "english": "Ambon Malay",
    "swahili": "Ambon Malay"
  },
  {
    "english": "Banda Malay",
    "swahili": "Banda Malay"
  },
  {
    "english": "Lampong",
    "swahili": "Lampong"
  },
  {
    "english": "Muntok",
    "swahili": "Muntok"
  },
  {
    "english": "Sarawak pepper",
    "swahili": "Pilipili ya Sarawak"
  },
  {
    "english": "Jambi",
    "swahili": "Jambi"
  },
  {
    "english": "Baboon lemon",
    "swahili": "Ndimu ya nyani"
  },
  {
    "english": "Brazilian sweet lemon",
    "swahili": "Limau tamu ya Brazili"
  },
  {
    "english": "Bearss Lemons",
    "swahili": "Dubu Ndimu"
  },
  {
    "english": "Punjab Baramasi",
    "swahili": "Punjab Baramasi"
  },
  {
    "english": "Punjab Galgal",
    "swahili": "Punjab Galgal"
  },
  {
    "english": "Lucknow seedless",
    "swahili": "Lucknow bila mbegu"
  },
  {
    "english": "Pant Lemon (Seville)",
    "swahili": "Pant Lemon (Seville)"
  },
  {
    "english": "Lisbon lemon",
    "swahili": "Lisbon limau"
  },
  {
    "english": "Jora tenga",
    "swahili": "Jora tenga"
  },
  {
    "english": "Rough lemon",
    "swahili": "Lemon mbaya"
  },
  {
    "english": "Chakradhar",
    "swahili": "Chakradhar"
  },
  {
    "english": "Rasraj",
    "swahili": "Rasraj"
  },
  {
    "english": "Red dwarf Bananas",
    "swahili": "Ndizi za rangi nyekundu"
  },
  {
    "english": "Baswant 780",
    "swahili": "Baswant 780"
  },
  {
    "english": "Hisar-2",
    "swahili": "Hisar-2"
  },
  {
    "english": "Pusa Ratnar",
    "swahili": "Pusa Ratnar"
  },
  {
    "english": "Pusa Red",
    "swahili": "Pusa Nyekundu"
  },
  {
    "english": "Pusa white flat",
    "swahili": "Pusa nyeupe gorofa"
  },
  {
    "english": "Pusa White Round",
    "swahili": "Mzunguko wa Pusa White"
  },
  {
    "english": "Udaipur -101",
    "swahili": "Udaipur -101"
  },
  {
    "english": "Udaipur -102",
    "swahili": "Udaipur -102"
  },
  {
    "english": "CoLk 94184 (Birendra)",
    "swahili": "CoLk 94184 (Birendra)"
  },
  {
    "english": "CoOr 03151(Sabita)",
    "swahili": "CoOr 03151(Sabita)"
  },
  {
    "english": "CGKusum-1",
    "swahili": "CGKusum-1"
  },
  {
    "english": "Malviya Kusum 305",
    "swahili": "Malvia Kusum 305"
  },
  {
    "english": "Nag-7",
    "swahili": "Nag-7"
  },
  {
    "english": "Nari 38",
    "swahili": "Nari 38"
  },
  {
    "english": "Phule Kusuma",
    "swahili": "Phule Kusuma"
  },
  {
    "english": "MY 5465",
    "swahili": "MY 5465"
  },
  {
    "english": "SP 701284",
    "swahili": "SP 701284"
  },
  {
    "english": "Adira 1",
    "swahili": "Adira 1"
  },
  {
    "english": "Adira 2",
    "swahili": "Adira 2"
  },
  {
    "english": "Adira 4",
    "swahili": "Adira 4"
  },
  {
    "english": "Malang 1",
    "swahili": "Malango 1"
  },
  {
    "english": "Malang 2",
    "swahili": "Malango 2"
  },
  {
    "english": "Malang 4",
    "swahili": "Mbele 4"
  },
  {
    "english": "Casca roxa",
    "swahili": "Casca roxa"
  },
  {
    "english": "Mayombe",
    "swahili": "Mayombe"
  },
  {
    "english": "Musimwa",
    "swahili": "Musimwa"
  },
  {
    "english": "Obasanjo-2",
    "swahili": "Obasanjo-2"
  },
  {
    "english": "Baba 70",
    "swahili": "Baba 70"
  },
  {
    "english": "Nyaraboke",
    "swahili": "Nyaraboke"
  },
  {
    "english": "Karangwa",
    "swahili": "Karangwa"
  },
  {
    "english": "Kabiriti",
    "swahili": "Kabiriti"
  },
  {
    "english": "Mingoro",
    "swahili": "Mingoro"
  },
  {
    "english": "Kwatamumpale",
    "swahili": "Kwatamumpale"
  },
  {
    "english": "Ogwok",
    "swahili": "Ogwok"
  },
  {
    "english": "NASE 19",
    "swahili": "NASE 19"
  },
  {
    "english": "NAROCASS 1",
    "swahili": "NAROCASS 1"
  },
  {
    "english": "NAROCASS 2",
    "swahili": "NAROCASS 2"
  },
  {
    "english": "Inca red",
    "swahili": "Inka nyekundu"
  },
  {
    "english": "Rosada de Junin",
    "swahili": "Rosada de Junin"
  },
  {
    "english": "Mantaro",
    "swahili": "Mantaro"
  },
  {
    "english": "Rosada Taraco",
    "swahili": "Rosada Taraco"
  },
  {
    "english": "Mokhtar",
    "swahili": "Mokhtar"
  },
  {
    "english": "Sidi Masri",
    "swahili": "Sidi Masri"
  },
  {
    "english": "Zellaf",
    "swahili": "Zellaf"
  },
  {
    "english": "Kufra 1",
    "swahili": "Kufra 1"
  },
  {
    "english": "Merjawi",
    "swahili": "Merjawi"
  },
  {
    "english": "Buhut 103",
    "swahili": "Buhut 103"
  },
  {
    "english": "Embrapa 49",
    "swahili": "Mbele 49"
  },
  {
    "english": "6505 B",
    "swahili": "6505 B"
  },
  {
    "english": "BP 1",
    "swahili": "BP 1"
  },
  {
    "english": "Agroceres 12",
    "swahili": "Kilimo 12"
  },
  {
    "english": "Ganga 4",
    "swahili": "Ganga 4"
  },
  {
    "english": "Ganga 7",
    "swahili": "Ganga 7"
  },
  {
    "english": "Rajendra hybrid makka 2",
    "swahili": "Rajendra mseto makka 2"
  },
  {
    "english": "Kawanda Comp A",
    "swahili": "Kawanda Comp A"
  },
  {
    "english": "Papa criolla",
    "swahili": "Papa criola"
  },
  {
    "english": "Criolla Sua Pa",
    "swahili": "Criolla Sua Pa"
  },
  {
    "english": "Criolla Dorada",
    "swahili": "Criolla Dorada"
  },
  {
    "english": "Qhoyllupapa",
    "swahili": "Qhoylupapa"
  },
  {
    "english": "Qhenipapa",
    "swahili": "Qhenipapa"
  },
  {
    "english": "Wila imilla",
    "swahili": "Wila milla"
  },
  {
    "english": "Chiar Imilla",
    "swahili": "Chiar Imilla"
  },
  {
    "english": "Sani imilla",
    "swahili": "Sani imilla"
  },
  {
    "english": "Russet Norkotah",
    "swahili": "Russet Norkotah"
  },
  {
    "english": "Ranger Russet",
    "swahili": "Mgambo Russet"
  },
  {
    "english": "Red pontiac",
    "swahili": "Pontiac nyekundu"
  },
  {
    "english": "Kennebec",
    "swahili": "Kennebec"
  },
  {
    "english": "Yukon Gold",
    "swahili": "Yukon Gold"
  },
  {
    "english": "Kufri Chandramukhi",
    "swahili": "Kufri Chandramukhi"
  },
  {
    "english": "Kufri Pukhraj",
    "swahili": "Kufri Pukhraj"
  },
  {
    "english": "Kufri Khyati",
    "swahili": "Kufri Khyati"
  },
  {
    "english": "Kufri Arun",
    "swahili": "Kufri Arun"
  },
  {
    "english": "Kufri Surya",
    "swahili": "Kufri Surya"
  },
  {
    "english": "Kufri Kanchan",
    "swahili": "Kufri Kanchan"
  },
  {
    "english": "Kufri Bahar",
    "swahili": "Kufri Bahar"
  },
  {
    "english": "Kufri Megha",
    "swahili": "Kufri Megha"
  },
  {
    "english": "Tukdah-135",
    "swahili": "Tukdah-135"
  },
  {
    "english": "Tukdah- 383",
    "swahili": "Tukda - 383"
  },
  {
    "english": "Tukdah-78",
    "swahili": "Tukda-78"
  },
  {
    "english": "Happy Valley- 36",
    "swahili": "Bonde la Furaha - 36"
  },
  {
    "english": "Thurbo 3",
    "swahili": "Thurbo 3"
  },
  {
    "english": "Sikkim 1",
    "swahili": "Sikkim 1"
  },
  {
    "english": "Rungli 144",
    "swahili": "Sura ya 144"
  },
  {
    "english": "Kashi Aman",
    "swahili": "Kashi Aman"
  },
  {
    "english": "Pusa Early Dwarf",
    "swahili": "Pusa Mapema Dwarf"
  },
  {
    "english": "Co 1",
    "swahili": "Co 1"
  },
  {
    "english": "Arka Vikas ( Sel 22 )",
    "swahili": "Arka Vikas ( Sel 22)"
  },
  {
    "english": "Arka Saurabh ( Sel - 4)",
    "swahili": "Arka Saurabh ( Sel - 4)"
  },
  {
    "english": "Arka Ahuti ( Sel 11 )",
    "swahili": "Arka Ahuti ( Sel 11 )"
  },
  {
    "english": "Arka Vardan ( FM hyb -2)",
    "swahili": "Arka Vardan ( FM hyb -2)"
  },
  {
    "english": "Arka Shreshta",
    "swahili": "Arka Shreshta"
  },
  {
    "english": "Round Pusa",
    "swahili": "Mzunguko wa Pusa"
  },
  {
    "english": "Pusa Hybrid -2",
    "swahili": "Pusa Hybrid -2"
  },
  {
    "english": "Pusa Red Plum",
    "swahili": "Pusa Red Plum"
  },
  {
    "english": "Solan Gola",
    "swahili": "Solan Gola"
  },
  {
    "english": "Pusa Gaurav",
    "swahili": "Pusa Gaurav"
  },
  {
    "english": "Narendra Tomato 1",
    "swahili": "Nyanya ya Narendra 1"
  },
  {
    "english": "Narendra Tomato 2",
    "swahili": "Nyanya ya Narendra 2"
  },
  {
    "english": "Selection 10",
    "swahili": "Uteuzi 10"
  },
  {
    "english": "Abyssinia",
    "swahili": "Abyssinia"
  },
  {
    "english": "Geisha(1931)",
    "swahili": "Geisha(1931)"
  },
  {
    "english": "Geisha(1956)",
    "swahili": "Geisha(1956)"
  },
  {
    "english": "Kudhumi/ Kurume",
    "swahili": "Kudhumi/ Kurume"
  },
  {
    "english": "Miqe",
    "swahili": "Miqe"
  },
  {
    "english": "Bergundal",
    "swahili": "Bergundal"
  },
  {
    "english": "Andong Sari",
    "swahili": "Andong Sari"
  },
  {
    "english": "Neypoovan",
    "swahili": "Neypoovan"
  },
  {
    "english": "Vayal vazhai",
    "swahili": "Vayal vazhai"
  },
  {
    "english": "Oolong",
    "swahili": "Oolong"
  },
  {
    "english": "Adi",
    "swahili": "Adi"
  },
  {
    "english": "Abasena",
    "swahili": "Abasena"
  },
  {
    "english": "Kelafo-74",
    "swahili": "Kelafo-74"
  },
  {
    "english": "Mehado-80",
    "swahili": "Mehado-80"
  },
  {
    "english": "E",
    "swahili": "E"
  },
  {
    "english": "Humera-1",
    "swahili": "Humera-1"
  },
  {
    "english": "Setit-1",
    "swahili": "Seti-1"
  },
  {
    "english": "Shawarobit",
    "swahili": "Shawarobit"
  },
  {
    "english": "Pusa Vishal ML-818",
    "swahili": "Pusa Vishal ML-818"
  },
  {
    "english": "Vaibhav",
    "swahili": "Vaibhav"
  },
  {
    "english": "Pusa kalyani",
    "swahili": "Pusa kalyani"
  },
  {
    "english": "Patan 66",
    "swahili": "Sehemu ya 66"
  },
  {
    "english": "Gujrat sarsav - 1",
    "swahili": "Gujrat sarsav - 1"
  },
  {
    "english": "Qinyou- 10",
    "swahili": "Qinyou- 10"
  },
  {
    "english": "Amelando",
    "swahili": "Amelando"
  },
  {
    "english": "Trinitario",
    "swahili": "Trinitario"
  },
  {
    "english": "Tiiti",
    "swahili": "Tiiti"
  },
  {
    "english": "Hokuo",
    "swahili": "Hokuo"
  },
  {
    "english": "Zenyatta",
    "swahili": "Zenyatta"
  },
  {
    "english": "Mohawk",
    "swahili": "Mohawk"
  },
  {
    "english": "Nemkat",
    "swahili": "Nemkat"
  },
  {
    "english": "Black cat (06252)",
    "swahili": "Paka mweusi (06252)"
  },
  {
    "english": "Barakat ( 90 )",
    "swahili": "Barakat ( 90 )"
  },
  {
    "english": "Barac ( 67 ) acala",
    "swahili": "Baraka ( 67 ) acala"
  },
  {
    "english": "Siddig ( sudan pima)",
    "swahili": "Siddig (sudan pima)"
  },
  {
    "english": "Siokra 1-4",
    "swahili": "Siokra 1-4"
  },
  {
    "english": "Bikaneri nerma",
    "swahili": "Bikaneri nerma"
  },
  {
    "english": "Eknath",
    "swahili": "Eknath"
  },
  {
    "english": "Khandwa–2",
    "swahili": "Khandwa, 2"
  },
  {
    "english": "Badnawar–1",
    "swahili": "Badnawar�1"
  },
  {
    "english": "Supriya",
    "swahili": "Supriya"
  },
  {
    "english": "Oker",
    "swahili": "Sawa"
  },
  {
    "english": "Erlin",
    "swahili": "Erlin"
  },
  {
    "english": "Cabai rawit",
    "swahili": "Cabai rawit"
  },
  {
    "english": "Cabai keriting",
    "swahili": "Cabai keriting"
  },
  {
    "english": "cayenne pepper(hottest chilli)",
    "swahili": "pilipili ya cayenne (pilipili kali zaidi)"
  },
  {
    "english": "cabai ceremai",
    "swahili": "cabai ceremai"
  },
  {
    "english": "Bengkulu",
    "swahili": "Bengkulu"
  },
  {
    "english": "lembang",
    "swahili": "lembang"
  },
  {
    "english": "jwala",
    "swahili": "jwala"
  },
  {
    "english": "sangli sannam",
    "swahili": "sangli sannam"
  },
  {
    "english": "G.T.sannam",
    "swahili": "G.T.sannam"
  },
  {
    "english": "Bibb lettuce",
    "swahili": "lettuce ya bibb"
  },
  {
    "english": "little gem lettuce",
    "swahili": "lettuce kidogo ya gem"
  },
  {
    "english": "Raja bagus banana",
    "swahili": "Raja bagus ndizi"
  },
  {
    "english": "Jackfruit banana",
    "swahili": "Jackfruit ndizi"
  },
  {
    "english": "Ebenezer",
    "swahili": "Ebenezer"
  },
  {
    "english": "Mercury",
    "swahili": "Zebaki"
  },
  {
    "english": "Bhima Super",
    "swahili": "Bhima Super"
  },
  {
    "english": "Bhima Dark Red",
    "swahili": "Bhima Nyekundu Iliyokolea"
  },
  {
    "english": "Bhima Shweta",
    "swahili": "Bhima Shweta"
  },
  {
    "english": "Pusa Madhv",
    "swahili": "Pusa Madhv"
  },
  {
    "english": "Raj 171",
    "swahili": "Raj 171"
  },
  {
    "english": "ALFAMASTER 10",
    "swahili": "ALFAMASTER 10"
  },
  {
    "english": "Titan5",
    "swahili": "Titan5"
  },
  {
    "english": "sf force11",
    "swahili": "nguvu ya sf11"
  },
  {
    "english": "SARDI 10",
    "swahili": "SARDI 10"
  },
  {
    "english": "HERITAGE 10",
    "swahili": "URITHI 10"
  },
  {
    "english": "ALFAMASTER 11",
    "swahili": "ALFAMASTER 11"
  },
  {
    "english": "Jersey wakefield",
    "swahili": "Uwanja wa wake wa Jersey"
  },
  {
    "english": "Pusa Drum Head",
    "swahili": "Pusa Drum Head"
  },
  {
    "english": "Pusa Mukta",
    "swahili": "Pusa Mukta"
  },
  {
    "english": "SAMSORG 45",
    "swahili": "SAMSORG 45"
  },
  {
    "english": "SAMSORG 46",
    "swahili": "SAMSORG 46"
  },
  {
    "english": "SAMSORG 47",
    "swahili": "SAMSORG 47"
  },
  {
    "english": "SAMSORG 48",
    "swahili": "SAMSORG 48"
  },
  {
    "english": "Kupang Malay",
    "swahili": "Kupang Malay"
  },
  {
    "english": "Dorshapo",
    "swahili": "Dorshapo"
  },
  {
    "english": "PAU Baramasi-1",
    "swahili": "PAU Baramasi-1"
  },
  {
    "english": "Gondhoraj",
    "swahili": "Gondhoraj"
  },
  {
    "english": "Pat Nebu",
    "swahili": "Pat Nebu"
  },
  {
    "english": "Kaji nemu",
    "swahili": "Kaji nemu"
  },
  {
    "english": "Gol nemu",
    "swahili": "Gol nemu"
  },
  {
    "english": "BO 128 (Pramod)",
    "swahili": "BO 128 (Pramodi)"
  },
  {
    "english": "Co-1",
    "swahili": "Co-1"
  },
  {
    "english": "Co-2",
    "swahili": "Co-2"
  },
  {
    "english": "Granex 429",
    "swahili": "Granex 429"
  },
  {
    "english": "Granex 55",
    "swahili": "Granex 55"
  },
  {
    "english": "HA 60",
    "swahili": "HA 60"
  },
  {
    "english": "N 2-4-1",
    "swahili": "N 2-4-1"
  },
  {
    "english": "N-257-9-1",
    "swahili": "N-257-9-1"
  },
  {
    "english": "N-53",
    "swahili": "N-53"
  },
  {
    "english": "NHRDF Red",
    "swahili": "NHRDF Nyekundu"
  },
  {
    "english": "NHRDF Red 2",
    "swahili": "NHRDF Nyekundu 2"
  },
  {
    "english": "NHRDF Red3",
    "swahili": "NHRDF Nyekundu3"
  },
  {
    "english": "NHRDF Red4",
    "swahili": "NHRDF Red4"
  },
  {
    "english": "S-48",
    "swahili": "S-48"
  },
  {
    "english": "Tana F1",
    "swahili": "Tana F1"
  },
  {
    "english": "VL-3",
    "swahili": "VL-3"
  },
  {
    "english": "OC 671",
    "swahili": "OC 671"
  },
  {
    "english": "COC 771",
    "swahili": "COC 771"
  },
  {
    "english": "COC 772",
    "swahili": "COC 772"
  },
  {
    "english": "COC 773",
    "swahili": "COC 773"
  },
  {
    "english": "COC 8001 (C 66191)",
    "swahili": "COC 8001 (C 66191)"
  },
  {
    "english": "COC 774",
    "swahili": "COC 774"
  },
  {
    "english": "COC 775",
    "swahili": "COC 775"
  },
  {
    "english": "COC 776",
    "swahili": "COC 776"
  },
  {
    "english": "COC 777",
    "swahili": "COC 777"
  },
  {
    "english": "COC 778",
    "swahili": "COC 778"
  },
  {
    "english": "COC 779",
    "swahili": "COC 779"
  },
  {
    "english": "CO 419",
    "swahili": "CO 419"
  },
  {
    "english": "CO 6304",
    "swahili": "CO 6304"
  },
  {
    "english": "COC 8001",
    "swahili": "COC 8001"
  },
  {
    "english": "COC 85061",
    "swahili": "COC 85061"
  },
  {
    "english": "COC 86062",
    "swahili": "COC 86062"
  },
  {
    "english": "COSi 86071",
    "swahili": "COSi 86071"
  },
  {
    "english": "COC 90063",
    "swahili": "COC 90063"
  },
  {
    "english": "CO 8021",
    "swahili": "CO 8021"
  },
  {
    "english": "COC 91061",
    "swahili": "COC 91061"
  },
  {
    "english": "COC 92061",
    "swahili": "COC 92061"
  },
  {
    "english": "CO 8362",
    "swahili": "CO 8362"
  },
  {
    "english": "COG 93076",
    "swahili": "COG 93076"
  },
  {
    "english": "CO 8208",
    "swahili": "CO 8208"
  },
  {
    "english": "COG 94077",
    "swahili": "COG 94077"
  },
  {
    "english": "COG 95076",
    "swahili": "COG 95076"
  },
  {
    "english": "CO 85019",
    "swahili": "CO 85019"
  },
  {
    "english": "COSi 95071",
    "swahili": "COSi 95071"
  },
  {
    "english": "COSi 96071",
    "swahili": "COSi 96071"
  },
  {
    "english": "CO 86010",
    "swahili": "CO 86010"
  },
  {
    "english": "COC 98061",
    "swahili": "COC 98061"
  },
  {
    "english": "COSi 98071",
    "swahili": "COSi 98071"
  },
  {
    "english": "CO 86249",
    "swahili": "CO 86249"
  },
  {
    "english": "COC 99061",
    "swahili": "COC 99061"
  },
  {
    "english": "CO 86032",
    "swahili": "CO 86032"
  },
  {
    "english": "COC (SC) 22",
    "swahili": "COC (SC) 22"
  },
  {
    "english": "CO Si (SC) 6",
    "swahili": "CO Si (SC) 6"
  },
  {
    "english": "COG (SC) 5",
    "swahili": "COG (SC) 5"
  },
  {
    "english": "CoC 23",
    "swahili": "CoC 23"
  },
  {
    "english": "CoC 24",
    "swahili": "CoC 24"
  },
  {
    "english": "TNAU SC Si 7",
    "swahili": "TNAU SC Si 7"
  },
  {
    "english": "TNAU SC Si 8",
    "swahili": "TNAU SC Si 8"
  },
  {
    "english": "Co 0118 (Karan-2)",
    "swahili": "Co 0118 (Karan-2)"
  },
  {
    "english": "Co 0124 (Karan-5)",
    "swahili": "Co 0124 (Karan-5)"
  },
  {
    "english": "Co 0218 (Shreyas)",
    "swahili": "Co 0218 (Shreyas)"
  },
  {
    "english": "Co 0232 (Kamal)",
    "swahili": "Co 0232 (Kamal)"
  },
  {
    "english": "Co 0233 (Kosi)",
    "swahili": "Co 0233 (Kosi)"
  },
  {
    "english": "Co 0237 (Karan-8)",
    "swahili": "Co 0237 (Karan-8)"
  },
  {
    "english": "Co 0238 (Karan-4)",
    "swahili": "Co 0238 (Karan-4)"
  },
  {
    "english": "Co 0239 (Karan-6)",
    "swahili": "Co 0239 (Karan-6)"
  },
  {
    "english": "Co 0403 (Samriddhi)",
    "swahili": "Co 0403 (Samriddhi)"
  },
  {
    "english": "Co 05009 (Karan-10)",
    "swahili": "Co 05009 (Karan-10)"
  },
  {
    "english": "Co 05011 (Karan-9)",
    "swahili": "Co 05011 (Karan-9)"
  },
  {
    "english": "Co 06027",
    "swahili": "Co 06027"
  },
  {
    "english": "Co 06030",
    "swahili": "Co 06030"
  },
  {
    "english": "Co 09022 (Karan 12)",
    "swahili": "Co 09022 (Karan 12)"
  },
  {
    "english": "Co 2001-13 (Sulabh)",
    "swahili": "Co 2001-13 (Sulabh)"
  },
  {
    "english": "Co 2001-15 (Mangal)",
    "swahili": "Co 2001-15 (Mangal)"
  },
  {
    "english": "Co 8371 (Bhima)",
    "swahili": "Co 8371 (Bhima)"
  },
  {
    "english": "Co 85004 (Prabha)",
    "swahili": "Co 85004 (Prabha)"
  },
  {
    "english": "Co 86032 (Nayana)",
    "swahili": "Co 86032 (Nayana)"
  },
  {
    "english": "Co 86249 (Bhavani)",
    "swahili": "Co 86249 (Bhavani)"
  },
  {
    "english": "Co 87025 (Kalyani)",
    "swahili": "Co 87025 (Kalyani)"
  },
  {
    "english": "Co 87044 (Uttara)",
    "swahili": "Co 87044 (Uttara)"
  },
  {
    "english": "Co 87263 (Sarayu)",
    "swahili": "Co 87263 (Sarayu)"
  },
  {
    "english": "Co 87268 (Moti)",
    "swahili": "Co 87268 (Moti)"
  },
  {
    "english": "Co 89029 (Gandak)",
    "swahili": "Co 89029 (Gandak)"
  },
  {
    "english": "Co 91010 (Dhanush)",
    "swahili": "Co 91010 (Dhanush)"
  },
  {
    "english": "Co 94008 (Shyama)",
    "swahili": "Co 94008 (Shyama)"
  },
  {
    "english": "Co 98014 (Karan-1)",
    "swahili": "Co 98014 (Karan-1)"
  },
  {
    "english": "Co 99004 (Damodar)",
    "swahili": "Co 99004 (Damodar)"
  },
  {
    "english": "CoC 01061 (CoC (SC) 23)",
    "swahili": "CoC 01061 (CoC (SC) 23)"
  },
  {
    "english": "CoH 119 (Haryana Ganna - 119)",
    "swahili": "CoH 119 (Haryana Ganna - 119)"
  },
  {
    "english": "CoH 128",
    "swahili": "CoH 128"
  },
  {
    "english": "CoH 2201 (Haryana-92)",
    "swahili": "CoH 2201 (Haryana-92)"
  },
  {
    "english": "CoH 92201(Haryana-92)",
    "swahili": "CoH 92201(Haryana-92)"
  },
  {
    "english": "CoJ 20193 (CoJ 89)",
    "swahili": "CoJ 20193 (CoJ 89)"
  },
  {
    "english": "CoM 88121 (Krishna)",
    "swahili": "CoM 88121 (Krishna)"
  },
  {
    "english": "CoP 06436 (CoP 2061)",
    "swahili": "CoP 06436 (CoP 2061)"
  },
  {
    "english": "CoPant 90223 (Pant 90223)",
    "swahili": "CoPant 90223 (Pant 90223)"
  },
  {
    "english": "CoPant 97222",
    "swahili": "CoPant 97222"
  },
  {
    "english": "CoPk 05191 (Pratap Ganna-1)",
    "swahili": "CoPk 05191 (Pratap Ganna-1)"
  },
  {
    "english": "CoS 1230 (Raseeli)",
    "swahili": "CoS 1230 (Raseeli)"
  },
  {
    "english": "CoS 91230 (Raseeli)",
    "swahili": "CoS 91230 (Raseeli)"
  },
  {
    "english": "CoS 94270 (Sweta)",
    "swahili": "CoS 94270 (Sweta)"
  },
  {
    "english": "CoS 96268 (Mithas)",
    "swahili": "CoS 96268 (Mithas)"
  },
  {
    "english": "CoS 96275 (Sweety)",
    "swahili": "CoS 96275 (Tamu)"
  },
  {
    "english": "CoSe 01421 (Imarti)",
    "swahili": "CoSe 01421 (Imarti)"
  },
  {
    "english": "CoSe 92423 (Rajbhog)",
    "swahili": "CoSe 92423 (Rajbhog)"
  },
  {
    "english": "CoSe 95255 (Rachna)",
    "swahili": "CoSe 95255 (Rachna)"
  },
  {
    "english": "CoSe 95422 (Rasbhari)",
    "swahili": "CoSe 95422 (Rasbhari)"
  },
  {
    "english": "CoSe 96234 (Rashmi)",
    "swahili": "CoSe 96234 (Rashmi)"
  },
  {
    "english": "CoSe 96436 (Jalpari)",
    "swahili": "CoSe 96436 (Jalpari)"
  },
  {
    "english": "CoSnk 05103",
    "swahili": "CoSnk 05103"
  },
  {
    "english": "CoSnk 05104",
    "swahili": "CoSnk 05104"
  },
  {
    "english": "A-2",
    "swahili": "A-2"
  },
  {
    "english": "A-300",
    "swahili": "A-300"
  },
  {
    "english": "AKS-207",
    "swahili": "AKS-207"
  },
  {
    "english": "Annigeri-1(A-1)",
    "swahili": "Annigeri-1(A-1)"
  },
  {
    "english": "DSH-129",
    "swahili": "DSH-129"
  },
  {
    "english": "DSH-185",
    "swahili": "DSH-185"
  },
  {
    "english": "IGKV Kusum (RSS 2016-03)",
    "swahili": "IGKV Kusum (RSS 2016-03)"
  },
  {
    "english": "ISF-1",
    "swahili": "ISF-1"
  },
  {
    "english": "ISF-764",
    "swahili": "ISF-764"
  },
  {
    "english": "JSF-1",
    "swahili": "JSF-1"
  },
  {
    "english": "JSF-97",
    "swahili": "JSF-97"
  },
  {
    "english": "JSF-99",
    "swahili": "JSF-99"
  },
  {
    "english": "JSI-7",
    "swahili": "JSI-7"
  },
  {
    "english": "JSI-73",
    "swahili": "JSI-73"
  },
  {
    "english": "Lakshmi Priya (ISF 764)",
    "swahili": "Lakshmi Priya (ISF 764)"
  },
  {
    "english": "MKH-11",
    "swahili": "MKH-11"
  },
  {
    "english": "MRSA-521",
    "swahili": "MRSA-521"
  },
  {
    "english": "N-62-8",
    "swahili": "N-62-8"
  },
  {
    "english": "NARI-57",
    "swahili": "NARI-57"
  },
  {
    "english": "NARI-6",
    "swahili": "NARI-6"
  },
  {
    "english": "NARI-96",
    "swahili": "NARI-96"
  },
  {
    "english": "NARI-H-15",
    "swahili": "NARI-H-15"
  },
  {
    "english": "NARI-H-23",
    "swahili": "NARI-H-23"
  },
  {
    "english": "NARI-NH-1",
    "swahili": "NARI-NH-1"
  },
  {
    "english": "PBNS-12",
    "swahili": "PBNS-12"
  },
  {
    "english": "PBNS-40",
    "swahili": "PBNS-40"
  },
  {
    "english": "PKV-Pink",
    "swahili": "PKV-Pink"
  },
  {
    "english": "Pride (ISF 1)",
    "swahili": "Fahari (ISF 1)"
  },
  {
    "english": "S-144",
    "swahili": "S-144"
  },
  {
    "english": "SSF-12-40",
    "swahili": "SSF-12-40"
  },
  {
    "english": "SSF-13-71",
    "swahili": "SSF-13-71"
  },
  {
    "english": "SSF-658",
    "swahili": "SSF-658"
  },
  {
    "english": "SSF-708",
    "swahili": "SSF-708"
  },
  {
    "english": "TSF-1",
    "swahili": "TSF-1"
  },
  {
    "english": "Type-6503",
    "swahili": "Aina-6503"
  },
  {
    "english": "CC93-7711",
    "swahili": "CC93-7711"
  },
  {
    "english": "CC93-7510",
    "swahili": "CC93-7510"
  },
  {
    "english": "CC01-1940",
    "swahili": "CC01-1940"
  },
  {
    "english": "CC84-75",
    "swahili": "CC84-75"
  },
  {
    "english": "RD 7511",
    "swahili": "RD 7511"
  },
  {
    "english": "PR 61-632",
    "swahili": "PR 61-632"
  },
  {
    "english": "Co 421",
    "swahili": "Co 421"
  },
  {
    "english": "POJ-2878",
    "swahili": "POJ-2878"
  },
  {
    "english": "PR 11-41",
    "swahili": "PR 11-41"
  },
  {
    "english": "MZC 74-275",
    "swahili": "MZC 74-275"
  },
  {
    "english": "PR 62-66",
    "swahili": "PR 62-66"
  },
  {
    "english": "UB 1/2",
    "swahili": "UB 1/2"
  },
  {
    "english": "UB 15/10",
    "swahili": "UB 15/10"
  },
  {
    "english": "UB 881-5",
    "swahili": "UB 881-5"
  },
  {
    "english": "UB 477-2",
    "swahili": "UB 477-2"
  },
  {
    "english": "BRS Purus",
    "swahili": "BRS Purus"
  },
  {
    "english": "TME 419",
    "swahili": "TME 419"
  },
  {
    "english": "F100",
    "swahili": "F100"
  },
  {
    "english": "Gbasumenge",
    "swahili": "Gbasumenge"
  },
  {
    "english": "Ofumbachai",
    "swahili": "Ofumbachai"
  },
  {
    "english": "Icilcil",
    "swahili": "Icilcil"
  },
  {
    "english": "dolomite",
    "swahili": "dolomiti"
  },
  {
    "english": "Sandy loam soil",
    "swahili": "Udongo wa mfinyanzi wa mchanga"
  },
  {
    "english": "Clay loam soil",
    "swahili": "Udongo wa mfinyanzi wa mfinyanzi"
  },
  {
    "english": "Silt loam soil",
    "swahili": "Udongo wa mfinyanzi wa matope"
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
