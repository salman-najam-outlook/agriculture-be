"use strict";
const data = [
  {
    english: "Ebwanaterak",
    swahili: "Ebwanaterak",
  },
  {
    english: "NASE 14",
    swahili: "NASE 14",
  },
  {
    english: "NASE 3",
    swahili: "NASE 3",
  },
  {
    english: "NASE 1",
    swahili: "NASE 1",
  },
  {
    english: "Ccoito",
    swahili: "Coito",
  },
  {
    english: "Salcedo INIA",
    swahili: "Salcedo INIA",
  },
  {
    english: "Illpa INIA",
    swahili: "Illpa INIA",
  },
  {
    english: "INIA 415 - Pasankalla",
    swahili: "INIA 415 - Pasankalla",
  },
  {
    english: "INIA 420-Negra Collana",
    swahili: "INIA 420-Negra Collana",
  },
  {
    english: "INIA 427 - Amarilla",
    swahili: "INIA 427 - Amarilla",
  },
  {
    english: "INIA 431-Altiplano",
    swahili: "INIA 431-Altiplano",
  },
  {
    english: "INIA 441- Senor del Huerto",
    swahili: "INIA 441- Senor del Huerto",
  },
  {
    english: "13D843",
    swahili: "13D843",
  },
  {
    english: "14G498",
    swahili: "14G498",
  },
  {
    english: "13G519",
    swahili: "13G519",
  },
  {
    english: "BRS 213",
    swahili: "BRS 213",
  },
  {
    english: "BRS 282",
    swahili: "BRS 282",
  },
  {
    english: "SL 958",
    swahili: "SL 958",
  },
  {
    english: "SL 744",
    swahili: "SL 744",
  },
  {
    english: "SL 525",
    swahili: "SL 525",
  },
  {
    english: "DM6563 IPRO",
    swahili: "DM6563 IPRO",
  },
  {
    english: "DM 5958",
    swahili: "DM 5958",
  },
  {
    english: "22-61 RY",
    swahili: "22-61 RY",
  },
  {
    english: "P005T13R",
    swahili: "P005T13R",
  },
  {
    english: "NSC Leroy RR2Y",
    swahili: "NSC Leroy RR2Y",
  },
  {
    english: "UA 5612",
    swahili: "UA 5612",
  },
  {
    english: "JTN 5503",
    swahili: "JTN 5503",
  },
  {
    english: "AG 6534",
    swahili: "AG 6534",
  },
  {
    english: "BMX Garra",
    swahili: "BMX Garra",
  },
  {
    english: "BMX Icone",
    swahili: "Aikoni ya BMX",
  },
  {
    english: "Monsoy M5892",
    swahili: "Monsoy M5892",
  },
  {
    english: "AFS 110RR",
    swahili: "AFS 110RR",
  },
  {
    english: "TMG 7262 RR",
    swahili: "TMG 7262 RR",
  },
  {
    english: "BRS 284",
    swahili: "BRS 284",
  },
  {
    english: "BRS 267",
    swahili: "BRS 267",
  },
  {
    english: "Chianung 242",
    swahili: "Chianung 242",
  },
  {
    english: "CH 45",
    swahili: "CH 45",
  },
  {
    english: "RH 245",
    swahili: "RH 245",
  },
  {
    english: "Bisi 222",
    swahili: "Sehemu ya 222",
  },
  {
    english: "NK 7328",
    swahili: "NK 7328",
  },
  {
    english: "PV 61177 SRR",
    swahili: "PV 61177 SRR",
  },
  {
    english: "PV 61180 RIB",
    swahili: "PV 61180 RIB",
  },
  {
    english: "TH6079 VT2P",
    swahili: "TH6079 VT2P",
  },
  {
    english: "PV 60172 RR",
    swahili: "PV 60172 RR",
  },
  {
    english: "Agroceres 303",
    swahili: "Kilimo 303",
  },
  {
    english: "C 929",
    swahili: "C 929",
  },
  {
    english: "Himalayan 123",
    swahili: "Himalayan 123",
  },
  {
    english: "C6006",
    swahili: "C6006",
  },
  {
    english: "Col 17",
    swahili: "Kol 17",
  },
  {
    english: "Dl 507",
    swahili: "Dl 507",
  },
  {
    english: "N 7822",
    swahili: "N 7822",
  },
  {
    english: "SRM 553",
    swahili: "SRM 553",
  },
  {
    english: "T7677 VT2P",
    swahili: "T7677 VT2P",
  },
  {
    english: "T2889 CONV",
    swahili: "T2889 CONV",
  },
  {
    english: "T6107 VT2P",
    swahili: "T6107 VT2P",
  },
  {
    english: "UH 615",
    swahili: "UH 615",
  },
  {
    english: "H 517",
    swahili: "H 517",
  },
  {
    english: "Longe 1",
    swahili: "Urefu 1",
  },
  {
    english: "Longe 4",
    swahili: "Urefu 4",
  },
  {
    english: "Longe 6H",
    swahili: "Muda mrefu 6H",
  },
  {
    english: "Longe 8H",
    swahili: "Muda mrefu 8H",
  },
  {
    english: "PAN 67",
    swahili: "PAN 67",
  },
  {
    english: "DK 8051",
    swahili: "DK 8051",
  },
  {
    english: "DK 803 1",
    swahili: "DK 803 1",
  },
  {
    english: "UH 5402",
    swahili: "UH 5402",
  },
  {
    english: "WE 2101",
    swahili: "WE 2101",
  },
  {
    english: "PAN 7 M - 89",
    swahili: "PAN 7 M - 89",
  },
  {
    english: "BPI",
    swahili: "BPI",
  },
  {
    english: "R12",
    swahili: "R12",
  },
  {
    english: "Criolla Ocarina",
    swahili: "Criolla Ocarina",
  },
  {
    english: "Luk’ys Ch’oqhepitus",
    swahili: "Luk’ys Ch’oqhepitus",
  },
  {
    english: "AAC Shirley",
    swahili: "AAC Shirley",
  },
  {
    english: "AAC Canada Gold Doree",
    swahili: "AAC Canada Gold Doree",
  },
  {
    english: "Russet Burbank",
    swahili: "Russet Burbank",
  },
  {
    english: "MS 42.3",
    swahili: "MS 42.3",
  },
  {
    english: "IPY -8",
    swahili: "IPY -8",
  },
  {
    english: "Ct First",
    swahili: "Ct Kwanza",
  },
  {
    english: "PV 40",
    swahili: "PV 40",
  },
  {
    english: "PV 1",
    swahili: "PV 1",
  },
  {
    english: "AV 2",
    swahili: "AV 2",
  },
  {
    english: "Dannock durn 668",
    swahili: "Dannock 668",
  },
  {
    english: "Dannock durn 777",
    swahili: "Dannock 777",
  },
  {
    english: "Pusa 120",
    swahili: "Pusa 120",
  },
  {
    english: "S-152",
    swahili: "S-152",
  },
  {
    english: "HS 102",
    swahili: "HS 102",
  },
  {
    english: "Arka Ashish ( IIHR - 674 )",
    swahili: "Arka Ashish ( IIHR - 674 )",
  },
  {
    english: "Arka Abha ( BWR 1)",
    swahili: "Arka Abha ( BWR 1)",
  },
  {
    english: "Arka Alok ( BER - 5 )",
    swahili: "Arka Alok ( BER - 5 )",
  },
  {
    english: "Arka Vishal ( FM HYB -1)",
    swahili: "Arka Vishal ( FM HYB -1)",
  },
  {
    english: "Arka Abhijit ( BRH 2)",
    swahili: "Arka Abhijit (BRH 2)",
  },
  {
    english: "HS101",
    swahili: "HS101",
  },
  {
    english: "Pusa Hybrid - 4",
    swahili: "Mseto wa Pusa - 4",
  },
  {
    english: "Pant T-10",
    swahili: "Suruali T-10",
  },
  {
    english: "Pant T-3",
    swahili: "Suruali T-3",
  },
  {
    english: "AC-238",
    swahili: "AC-238",
  },
  {
    english: "SL 28",
    swahili: "SL 28",
  },
  {
    english: "SL 14",
    swahili: "SL 14",
  },
  {
    english: "KP 423",
    swahili: "KP 423",
  },
  {
    english: "selection 9/Sln.9/S.2790",
    swahili: "uteuzi 9/Sln.9/S.2790",
  },
  {
    english: "Selection 7.3/ Sln.7.3",
    swahili: "Uteuzi 7.3/ Sln.7.3",
  },
  {
    english: "Selection 6/Sln.6",
    swahili: "Uteuzi 6/Sln.6",
  },
  {
    english: "Selection 4/ Sln.4",
    swahili: "Uteuzi 4/ Sln.4",
  },
  {
    english: "S288",
    swahili: "S288",
  },
  {
    english: "jember S795",
    swahili: "jembe S795",
  },
  {
    english: "cioccie / Choche",
    swahili: "cioccie / Choche",
  },
  {
    english: "USDA/USDA762",
    swahili: "USDA/USDA762",
  },
  {
    english: "Hibrido de Timor (HDT) Tim Tim",
    swahili: "Hibrido de Timor (HDT) Tim Tim",
  },
  {
    english: "303/577 tea clone",
    swahili: "303/577 clone ya chai",
  },
  {
    english: "6/8 tea clone",
    swahili: "6/8 clone ya chai",
  },
  {
    english: "31/8 tea clone",
    swahili: "31/8 clone ya chai",
  },
  {
    english: "108/82 tea clone",
    swahili: "108/82 clone ya chai",
  },
  {
    english: "100/5 tea clone.",
    swahili: "100/5 clone ya chai.",
  },
  {
    english: "CC 85-92",
    swahili: "CC 85-92",
  },
  {
    english: "CC 84-75",
    swahili: "CC 84-75",
  },
  {
    english: "V 71-51",
    swahili: "V 71-51",
  },
  {
    english: "CC 93-3895",
    swahili: "CC 93-3895",
  },
  {
    english: "CC 93-4418",
    swahili: "CC 93-4418",
  },
  {
    english: "CC 92-2198",
    swahili: "CC 92-2198",
  },
  {
    english: "CC 93-7510",
    swahili: "CC 93-7510",
  },
  {
    english: "CC 92-2804",
    swahili: "CC 92-2804",
  },
  {
    english: "CC 87-434",
    swahili: "CC 87-434",
  },
  {
    english: "CC 93-4181",
    swahili: "CC 93-4181",
  },
  {
    english: "CC 93-3826",
    swahili: "CC 93-3826",
  },
  {
    english: "CC 87-505",
    swahili: "CC 87-505",
  },
  {
    english: "CC 85-57",
    swahili: "CC 85-57",
  },
  {
    english: "CC 85-47",
    swahili: "CC 85-47",
  },
  {
    english: "CC 92-2154",
    swahili: "CC 92-2154",
  },
  {
    english: "CC 92-2188",
    swahili: "CC 92-2188",
  },
  {
    english: "CC 93-3817",
    swahili: "CC 93-3817",
  },
  {
    english: "CC 93-7711",
    swahili: "CC 93-7711",
  },
  {
    english: "CC 01-1940",
    swahili: "CC 01-1940",
  },
  {
    english: "PR 1141",
    swahili: "PR 1141",
  },
  {
    english: "CC 86-45",
    swahili: "CC 86-45",
  },
  {
    english: "sjkjkjk",
    swahili: "sjkjkjk",
  },
  {
    english: "xyz",
    swahili: "xyz",
  },
  {
    english: "T-85",
    swahili: "T-85",
  },
  {
    english: "MH-97-6(Boreda)",
    swahili: "MH-97-6(Boreda)",
  },
  {
    english: "Rasa N - 26",
    swahili: "Rasa N - 26",
  },
  {
    english: "NLV- 1",
    swahili: "NLV- 1",
  },
  {
    english: "Narendra Mung-1 LGG-460",
    swahili: "Narendra Mung-1 LGG-460",
  },
  {
    english: "SML-668",
    swahili: "SML-668",
  },
  {
    english: "RMG-492",
    swahili: "RMG-492",
  },
  {
    english: "IPM-02-3",
    swahili: "IPM-02-3",
  },
  {
    english: "HUM-16",
    swahili: "HUM-16",
  },
  {
    english: "AKM-4",
    swahili: "AKM-4",
  },
  {
    english: "PKV-Green Gold",
    swahili: "PKV-Dhahabu ya Kijani",
  },
  {
    english: "AKM-8802",
    swahili: "AKM-8802",
  },
  {
    english: "BRSMG Camaleao",
    swahili: "BRSMG Camaleao",
  },
  {
    english: "Ouro Verde MG 2",
    swahili: "Ouro Verde MG 2",
  },
  {
    english: "MGS Esmeralda",
    swahili: "MGS Esmeralda",
  },
  {
    english: "PBN - 2002",
    swahili: "PBN - 2002",
  },
  {
    english: "GSL - 1",
    swahili: "GSL - 1",
  },
  {
    english: "HNS - 3",
    swahili: "HNS - 3",
  },
  {
    english: "PBN - 9501",
    swahili: "PBN - 9501",
  },
  {
    english: "PBN - 9502",
    swahili: "PBN - 9502",
  },
  {
    english: "PBN - 2001",
    swahili: "PBN - 2001",
  },
  {
    english: "GSL - 441",
    swahili: "GSL - 441",
  },
  {
    english: "HNS - 4",
    swahili: "HNS - 4",
  },
  {
    english: "Fengyou - 737",
    swahili: "Fengyou - 737",
  },
  {
    english: "Youyan - 10",
    swahili: "Youyan - 10",
  },
  {
    english: "CS 117",
    swahili: "CS117",
  },
  {
    english: "CS 123",
    swahili: "CS123",
  },
  {
    english: "CS 141",
    swahili: "CS141",
  },
  {
    english: "CATIE-R1",
    swahili: "CATIE-R1",
  },
  {
    english: "CATIE-R4",
    swahili: "CATIE-R4",
  },
  {
    english: "CC-137",
    swahili: "CC-137",
  },
  {
    english: "ICS-95 T1",
    swahili: "ICS-95 T1",
  },
  {
    english: "PMCT-58",
    swahili: "PMCT-58",
  },
  {
    english: "CRIN TC-2",
    swahili: "CRIN TC-2",
  },
  {
    english: "CRIN TC-1",
    swahili: "CRIN TC-1",
  },
  {
    english: "CRIN TC-3",
    swahili: "CRIN TC-3",
  },
  {
    english: "CRIN TC-5",
    swahili: "CRIN TC-5",
  },
  {
    english: "BH 1146",
    swahili: "BH 1146",
  },
  {
    english: "Esmeralda 86",
    swahili: "Esmeralda 86",
  },
  {
    english: "JF 90",
    swahili: "JF 90",
  },
  {
    english: "BR 18 Terena",
    swahili: "BR 18 Terena",
  },
  {
    english: "Itasca",
    swahili: "Itasca",
  },
  {
    english: "Bottinia II",
    swahili: "Bottinia II",
  },
  {
    english: "Winnetou",
    swahili: "Winnetou",
  },
  {
    english: "AmeriStand 201T",
    swahili: "AmeriStand 201T",
  },
  {
    english: "AmeriStand 435TQ RR",
    swahili: "AmeriStand 435TQ RR",
  },
  {
    english: "AmeriStand 318TQ",
    swahili: "AmeriStand 318TQ",
  },
  {
    english: "AmeriStand 419LH Brand",
    swahili: "Brand ya AmeriStand 419LH",
  },
  {
    english: "AmeriStand 420LH RR Brand",
    swahili: "Brand ya AmeriStand 420LH RR",
  },
  {
    english: "AmeriStand 480 HVXRR",
    swahili: "AmeriStand 480 HVXRR",
  },
  {
    english: "AmeriStand 481 HVXRR",
    swahili: "AmeriStand 481 HVXRR",
  },
  {
    english: "AmeriStand 445NT",
    swahili: "AmeriStand 445NT",
  },
  {
    english: "AmeriStand 457TQ RR",
    swahili: "AmeriStand 457TQ RR",
  },
  {
    english: "AmeriStand 415NT RR",
    swahili: "AmeriStand 415NT RR",
  },
  {
    english: "AmeriStand 416NT RR",
    swahili: "AmeriStand 416NT RR",
  },
  {
    english: "AmeriStand 427TQ",
    swahili: "AmeriStand 427TQ",
  },
  {
    english: "AmeriStand 446NT",
    swahili: "AmeriStand 446NT",
  },
  {
    english: "AmeriStand 428TQ",
    swahili: "AmeriStand 428TQ",
  },
  {
    english: "AmeriStand 455TQ RR",
    swahili: "AmeriStand 455TQ RR",
  },
  {
    english: "AmeriStand 518NT",
    swahili: "AmeriStand 518NT",
  },
  {
    english: "KP4",
    swahili: "KP4",
  },
  {
    english: "KG2",
    swahili: "KG2",
  },
  {
    english: "TV1",
    swahili: "TV1",
  },
  {
    english: "TV14",
    swahili: "TV14",
  },
  {
    english: "TV16",
    swahili: "TV16",
  },
  {
    english: "TV17",
    swahili: "TV17",
  },
  {
    english: "TV20",
    swahili: "TV20",
  },
  {
    english: "TV22",
    swahili: "TV22",
  },
  {
    english: "UPASI 24",
    swahili: "UPASI 24",
  },
  {
    english: "UPASI 25",
    swahili: "UPASI 25",
  },
  {
    english: "UPASI 16",
    swahili: "UPASI 16",
  },
  {
    english: "UPASI 27",
    swahili: "UPASI 27",
  },
  {
    english: "UPASI 28 (UPASI 10 * TRI2025)",
    swahili: "UPASI 28 (UPASI 10 * TRI2025)",
  },
  {
    english: "Cheyenne e448",
    swahili: "Cheyenne e448",
  },
  {
    english: "Gs 12",
    swahili: "Gs 12",
  },
  {
    english: "Nairouz (th 99806)",
    swahili: "Nairouz (th 99806)",
  },
  {
    english: "Tomaland (th 01308)",
    swahili: "Tomaland (th 01308)",
  },
  {
    english: "Tyrmes",
    swahili: "Tyrmes",
  },
  {
    english: "S.209",
    swahili: "S.209",
  },
  {
    english: "Ppp.1-2",
    swahili: "Uk.1-2",
  },
  {
    english: "Roc-1",
    swahili: "Roc-1",
  },
  {
    english: "Ss33",
    swahili: "Ss33",
  },
  {
    english: "S.q-5",
    swahili: "S.q-5",
  },
  {
    english: "Pet-8",
    swahili: "Pet-8",
  },
  {
    english: "End-1",
    swahili: "Mwisho-1",
  },
  {
    english: "Eur.2-2",
    swahili: "Euro.2-2",
  },
  {
    english: "Vf-145",
    swahili: "Vf-145",
  },
  {
    english: "Ucx-281",
    swahili: "Ucx-281",
  },
  {
    english: "Bhn 589 (v ff t)*",
    swahili: "Bhn 589 (v ff t)*",
  },
  {
    english: "Celebrity (v ff n t a st)",
    swahili: "Mtu Mashuhuri (v ff n t a st)",
  },
  {
    english: "Albar ( 57 ) 12 and acrain",
    swahili: "Albar ( 57 ) 12 na akraini",
  },
  {
    english: "Hamid ( bb - 82)",
    swahili: "Hamid ( bb - 82)",
  },
  {
    english: "Knight ( bb - 90)",
    swahili: "Knight ( bb - 90)",
  },
  {
    english: "Bgrr y guaraní inta bgrr",
    swahili: "Bgrr y guaraní inta bgrr",
  },
  {
    english: "Pora 3 inta bgrr",
    swahili: "Pora 3 inta bgrr",
  },
  {
    english: "Guazuncho 4 inta bgrr",
    swahili: "Guazuncho 4 inta bgrr",
  },
  {
    english: "Guazuncho 2000 rr",
    swahili: "Guazuncho 2000 rr",
  },
  {
    english: "Dp402 bgrr",
    swahili: "Dp402 bgrr",
  },
  {
    english: "Dp1238 bgrr",
    swahili: "Dp1238 bgrr",
  },
  {
    english: "Siokra l23",
    swahili: "Siokra l23",
  },
  {
    english: "Siokra v-16",
    swahili: "Siokra v-16",
  },
  {
    english: "Sicala v-2",
    swahili: "Sicala v-2",
  },
  {
    english: "Cs50",
    swahili: "Cs50",
  },
  {
    english: "Sicot 189",
    swahili: "Sikoti 189",
  },
  {
    english: "Sicot f-1",
    swahili: "Sicot f-1",
  },
  {
    english: "Cnpa ita 90",
    swahili: "Nambari ya 90",
  },
  {
    english: "Brs ita 96",
    swahili: "Nambari ya 96",
  },
  {
    english: "Cnpa ita 97",
    swahili: "Nambari ya 97",
  },
  {
    english: "Brs antares",
    swahili: "Brs antares",
  },
  {
    english: "Brs 286",
    swahili: "Sehemu ya 286",
  },
  {
    english: "Brs ita⁄ba",
    swahili: "Brs ita⁄ba",
  },
  {
    english: "Brs sucupira",
    swahili: "Brs sucupira",
  },
  {
    english: "Dp 1646 b2xf",
    swahili: "Dp 1646 b2xf",
  },
  {
    english: "Dp 1840 b3xf",
    swahili: "Dp 1840 b3xf",
  },
  {
    english: "Dp 1820 b3xf",
    swahili: "Dp 1820 b3xf",
  },
  {
    english: "Dp 1845 b3xf",
    swahili: "Dp 1845 b3xf",
  },
  {
    english: "Ng 5711 b3xf",
    swahili: "Ng 5711 b3xf",
  },
  {
    english: "Ng 3406 b2xf",
    swahili: "Ng 3406 b2xf",
  },
  {
    english: "Ng 4545 b2xf",
    swahili: "Ng 4545 b2xf",
  },
  {
    english: "Ng 4936",
    swahili: "Nd 4936",
  },
  {
    english: "B3xf",
    swahili: "B3xf",
  },
  {
    english: "Phy 400",
    swahili: "Phy 400",
  },
  {
    english: "Phy 444 wrf",
    swahili: "Phy 444 wrf",
  },
  {
    english: "Phy 480 w3fe",
    swahili: "Phy 480 w3fe",
  },
  {
    english: "Phy 350 w3fe",
    swahili: "Phy 350 w3fe",
  },
  {
    english: "W3fe",
    swahili: "W3fe",
  },
  {
    english: "Lh 900",
    swahili: "Lh 900",
  },
  {
    english: "F414",
    swahili: "F414",
  },
  {
    english: "F 505",
    swahili: "F 505",
  },
  {
    english: "H 777",
    swahili: "H 777",
  },
  {
    english: "RS–810",
    swahili: "RS��810",
  },
  {
    english: "G-cot –12",
    swahili: "G-cot –12",
  },
  {
    english: "MCU– 5VT",
    swahili: "MCU, 5VT",
  },
  {
    english: "LK–861",
    swahili: "LK��861",
  },
  {
    english: "IHCAFE-90",
    swahili: "IHCAFE-90",
  },
  {
    english: "S-541",
    swahili: "S-541",
  },
  {
    english: "S-200",
    swahili: "S-200",
  },
  {
    english: "S-400",
    swahili: "S-400",
  },
  {
    english: "LBGB-77",
    swahili: "LBGB-77",
  },
  {
    english: "RIO DULCE INTA",
    swahili: "RIO DULCE INTA",
  },
  {
    english: "IPORA GUAZU",
    swahili: "IPORA GUAZU",
  },
  {
    english: "LBH-8-INTA",
    swahili: "LBH-8-INTA",
  },
  {
    english: "LB-66-INTA",
    swahili: "LB-66-INTA",
  },
  {
    english: "S-208",
    swahili: "S-208",
  },
  {
    english: "C/W 4440",
    swahili: "C/W 4440",
  },
  {
    english: "S-317",
    swahili: "S-317",
  },
  {
    english: "Mt.3697",
    swahili: "Mt.3697",
  },
  {
    english: "Cabai gendot",
    swahili: "Cabai gendot",
  },
  {
    english: "cabai katokkon",
    swahili: "cabai katokkon",
  },
  {
    english: "cabai domba",
    swahili: "cabai domba",
  },
  {
    english: "cabai hiyung",
    swahili: "cabai hiyung",
  },
  {
    english: "lampung",
    swahili: "taa",
  },
  {
    english: "jalapeno",
    swahili: "jalapeno",
  },
  {
    english: "co1",
    swahili: "co1",
  },
  {
    english: "k1",
    swahili: "k1",
  },
  {
    english: "hindupur-s7",
    swahili: "hindupur-s7",
  },
  {
    english: "tadappally",
    swahili: "tadappally",
  },
  {
    english: "sattur-s4",
    swahili: "sattur-s4",
  },
  {
    english: "Batavia lettuce",
    swahili: "lettuce ya Batavia",
  },
  {
    english: "pisang",
    swahili: "pisang",
  },
  {
    english: "RB867515",
    swahili: "RB867515",
  },
  {
    english: "RB966928",
    swahili: "RB966928",
  },
  {
    english: "SP81-3250",
    swahili: "SP81-3250",
  },
  {
    english: "Yellow Queen F1",
    swahili: "Malkia wa Njano F1",
  },
  {
    english: "N-2-4-1",
    swahili: "N-2-4-1",
  },
  {
    english: "S-148",
    swahili: "S-148",
  },
  {
    english: "PHB 2884",
    swahili: "PHB 2884",
  },
  {
    english: "PHB 2168",
    swahili: "PHB 2168",
  },
  {
    english: "PSB 164",
    swahili: "Sehemu ya PSB164",
  },
  {
    english: "PCB 164",
    swahili: "PCB 164",
  },
  {
    english: "Stamina gt5",
    swahili: "Stamina gt5",
  },
  {
    english: "titan7",
    swahili: "titani7",
  },
  {
    english: "303/557 clone",
    swahili: "303/557 clone",
  },
  {
    english: "11/4 clone",
    swahili: "11/4 clone",
  },
  {
    english: "108/82 clone",
    swahili: "108/82 clone",
  },
  {
    english: "7/9 clone",
    swahili: "7/9 clone",
  },
  {
    english: "100/5 clone",
    swahili: "100/5 clone",
  },
  {
    english: "31/8 clone",
    swahili: "31/8 clone",
  },
  {
    english: "12/19 clone",
    swahili: "12/19 clone",
  },
  {
    english: "12/12 clone",
    swahili: "12/12 clone",
  },
  {
    english: "6/8 clone",
    swahili: "6/8 clone",
  },
  {
    english: "6/10 clone",
    swahili: "6/10 clone",
  },
  {
    english: "31/11 clone",
    swahili: "31/11 clone",
  },
  {
    english: "Nyelungkup",
    swahili: "Nyelungkup",
  },
  {
    english: "PAU Baramasi",
    swahili: "PAU Baramasi",
  },
  {
    english: "Hadi ( okra - leaf barakat )",
    swahili: "Hadi (barakat ya bamia)",
  },
  {
    english: "Khandwa-2",
    swahili: "Khandwa-2",
  },
  {
    english: "Badnawar-1",
    swahili: "Badnawar-1",
  },
  {
    english: "Rs-810",
    swahili: "Sh-810",
  },
  {
    english: "G-cot -12",
    swahili: "G-kitanda -12",
  },
  {
    english: "Mcu- 5vt",
    swahili: "Mcu- 5vt",
  },
  {
    english: "Lk-861",
    swahili: "Lk-861",
  },
  {
    english: "TV 1",
    swahili: "TV 1",
  },
  {
    english: "Kopati 1",
    swahili: "Kopati 1",
  },
  {
    english: "C x R",
    swahili: "C x R",
  },
  {
    english: "Bourbon/ moka",
    swahili: "Bourbon/ moka",
  },
  {
    english: "karpoora poovan",
    swahili: "karpoora poovan",
  },
  {
    english: "Basrai",
    swahili: "Basrai",
  },
  {
    english: "Singapuri",
    swahili: "Singapuri",
  },
  {
    english: "Chakrakeli",
    swahili: "Chakrakeli",
  },
  {
    english: "Mundo Nova (Silang Typica-Bourbon from Brazil)",
    swahili: "Mundo Nova (Silang Typica-Bourbon kutoka Brazili)",
  },
  {
    english:
      "Catimor Lines (Andungsari Ateng Jaluk Kartika/Catuai/Katai - mix breed arabica-robusta).",
    swahili:
      "Catimor Lines (Andungsari Ateng Jaluk Kartika/Catuai/Katai - changanya aina ya arabica-robusta).",
  },
  {
    english: "Maran",
    swahili: "Marani",
  },
  {
    english: "Nadia",
    swahili: "Nadia",
  },
  {
    english: "Karakkal",
    swahili: "Karakkal",
  },
  {
    english: "Ernad Chernad",
    swahili: "Ernad Chernad",
  },
  {
    english: "China",
    swahili: "China",
  },
  {
    english: "Rio-De-Janeiro",
    swahili: "Rio-De-Janeiro",
  },
  {
    english: "Sleeva Local",
    swahili: "Sleeva Mitaa",
  },
  {
    english: "Narasapattam",
    swahili: "Narasapattam",
  },
  {
    english: "Varadha",
    swahili: "Varadha",
  },
  {
    english: "Himachal",
    swahili: "Himachal",
  },
  {
    english: "IISR",
    swahili: "IISR",
  },
  {
    english: "Dusehri",
    swahili: "Dusehri",
  },
  {
    english: "Alphanso",
    swahili: "Alphanso",
  },
  {
    english: "LANGRA",
    swahili: "LANGRA",
  },
  {
    english: "Amarpali",
    swahili: "Amarpali",
  },
  {
    english: "Mallika",
    swahili: "Mallika",
  },
  {
    english: "Bombay green",
    swahili: "Bombay kijani",
  },
  {
    english: "Fazli",
    swahili: "Fazli",
  },
  {
    english: "Samarbehisht  Chausa",
    swahili: "Samarbehisht Chausa",
  },
  {
    english: "Neelam",
    swahili: "Neelam",
  },
  {
    english: "Sindhu",
    swahili: "Sindhu",
  },
  {
    english: "Arka aruna",
    swahili: "Arka aruna",
  },
  {
    english: "Arka Puneet",
    swahili: "Arka Puneet",
  },
  {
    english: "Early kunwar",
    swahili: "Kunwar mapema",
  },
  {
    english: "Early Synthetic",
    swahili: "Synthetic ya mapema",
  },
  {
    english: "Pusa Katki",
    swahili: "Pusa Katki",
  },
  {
    english: "Pant Gobhi-2",
    swahili: "Suruali Gobhi-2",
  },
  {
    english: "Pant Gobhi-3",
    swahili: "Suruali Gobhi-3",
  },
  {
    english: "Pusa Synthetic",
    swahili: "Pusa Synthetic",
  },
  {
    english: "Pant Shubhra",
    swahili: "Suruali Shubhra",
  },
  {
    english: "Punjab Giant-26",
    swahili: "Punjab Giant-26",
  },
  {
    english: "Pusa Snowball-1",
    swahili: "Pusa Snowball-1",
  },
  {
    english: "Pusa Snowball-2",
    swahili: "Pusa Snowball-2",
  },
  {
    english: "Sonwball-16",
    swahili: "Sonwball-16",
  },
  {
    english: "Dania Kalimpong",
    swahili: "Dania Kalimpong",
  },
  {
    english: "BUCK MAXIFLOR",
    swahili: "BUCK MAXIFLOR",
  },
  {
    english: "SURSEM ORION",
    swahili: "SURSEM ORION",
  },
  {
    english: "Light Speckled Kidney Bean",
    swahili: "Maharage ya Figo Nyepesi",
  },
  {
    english: "Dark Red Kidney Bean",
    swahili: "Bean Nyekundu ya Figo",
  },
  {
    english: "Pink Kidney Bean",
    swahili: "Maharage ya Pink Figo",
  },
  {
    english: "Yellow Kidney Beans",
    swahili: "Maharagwe ya Njano ya Figo",
  },
  {
    english: "Malviya - 137",
    swahili: "Malvia - 137",
  },
  {
    english: "Arun",
    swahili: "Arun",
  },
  {
    english: "VL Rajma 125",
    swahili: "VL Rajma 125",
  },
  {
    english: "Arka Komal",
    swahili: "Arka Komal",
  },
  {
    english: "Ooty-1",
    swahili: "Ooty-1",
  },
  {
    english: "Pusa Himalatha",
    swahili: "Pusa Himalatha",
  },
  {
    english: "Pusa Parvati",
    swahili: "Pusa Parvati",
  },
  {
    english: "Phule Surekha",
    swahili: "Phule Surekha",
  },
  {
    english: "Pusa majesty",
    swahili: "Pusa ukuu",
  },
  {
    english: "Pusa giant",
    swahili: "Pusa jitu",
  },
  {
    english: "Pusa delcious",
    swahili: "Pusa ladha",
  },
  {
    english: "Pusa drawf",
    swahili: "Mchoro wa Pusa",
  },
  {
    english: "Coorg honey",
    swahili: "Coorg asali",
  },
  {
    english: "Honey dew",
    swahili: "Umande wa asali",
  },
  {
    english: "Golden queen",
    swahili: "Malkia wa dhahabu",
  },
  {
    english: "Amasya beyazı",
    swahili: "Amasya beyazı",
  },
  {
    english: "Antep karası",
    swahili: "Antep karası",
  },
  {
    english: "Bahceli karas",
    swahili: "Bahceli karas",
  },
  {
    english: "Cavus",
    swahili: "Cavus",
  },
  {
    english: "Cevsen",
    swahili: "Cevsen",
  },
  {
    english: "Crimson",
    swahili: "Nyekundu",
  },
  {
    english: "Dimrit",
    swahili: "Dimrit",
  },
  {
    english: "Hafizali",
    swahili: "Hafizali",
  },
  {
    english: "Karasabi",
    swahili: "Karasabi",
  },
  {
    english: "Yamuna Safed-2",
    swahili: "Yamuna Safed-2",
  },
  {
    english: "Bhima Omkar",
    swahili: "Bhima Omkar",
  },
  {
    english: "Godavari",
    swahili: "Godavari",
  },
  {
    english: "Baswant",
    swahili: "Baswant",
  },
  {
    english: "Lahsun 2",
    swahili: "Laha 2",
  },
  {
    english: "Eva",
    swahili: "Eva",
  },
  {
    english: "Gala",
    swahili: "Gala",
  },
  {
    english: "Fuji",
    swahili: "Fuji",
  },
  {
    english: "Honeycrisp",
    swahili: "Mchuzi wa asali",
  },
  {
    english: "Red Delicious",
    swahili: "Nyekundu Ladha",
  },
  {
    english: "Vitoria",
    swahili: "Vitoria",
  },
  {
    english: "Timpson",
    swahili: "Timpson",
  },
  {
    english: "Red globe",
    swahili: "Dunia nyekundu",
  },
  {
    english: "Italia",
    swahili: "Italia",
  },
  {
    english: "Thampson",
    swahili: "Thampson",
  },
  {
    english: "Crimson red",
    swahili: "Nyekundu nyekundu",
  },
  {
    english: "Zinc Gahun 1",
    swahili: "Zinki Gahun 1",
  },
  {
    english: "Ghaiya-3",
    swahili: "Ghaiya-3",
  },
  {
    english: "Hardinath-4",
    swahili: "Hardinath-4",
  },
  {
    english: "Hardinath-5",
    swahili: "Hardinath-5",
  },
  {
    english: "Hardinath-6",
    swahili: "Hardinath-6",
  },
  {
    english: "Khumal Basmati-16",
    swahili: "Khumal Basmati-16",
  },
  {
    english: "Ganga Sagar-1",
    swahili: "Ganga Sagar-1",
  },
  {
    english: "Ganga Sagar-2",
    swahili: "Ganga Sagar-2",
  },
  {
    english: "Cardinal",
    swahili: "Kardinali",
  },
  {
    english: "Khumal Ujjwol",
    swahili: "Khumal Ujjwol",
  },
  {
    english: "Bajhang local",
    swahili: "Bajhang mitaa",
  },
  {
    english: "Kalyan",
    swahili: "Kalyan",
  },
  {
    english: "Pratiksha",
    swahili: "Pratiksha",
  },
  {
    english: "Dhankuta",
    swahili: "Dhankuta",
  },
  {
    english: "Taplejung",
    swahili: "Taplejung",
  },
  {
    english: "Diktel",
    swahili: "Diktel",
  },
  {
    english: "Navel orange",
    swahili: "Kitovu chungwa",
  },
  {
    english: "Blood orange",
    swahili: "Chungwa la damu",
  },
  {
    english: "Tanjerine",
    swahili: "Tanjerine",
  },
  {
    english: "Acid less orange",
    swahili: "Asidi chini ya machungwa",
  },
  {
    english: "Mandarin",
    swahili: "Mandarin",
  },
  {
    english: "Seville orange",
    swahili: "Seville machungwa",
  },
  {
    english: "Bahia",
    swahili: "Bahia",
  },
  {
    english: "Patan red",
    swahili: "Patan nyekundu",
  },
  {
    english: "Nuwakot Local",
    swahili: "Nuwakot Mitaa",
  },
  {
    english: "White Globe",
    swahili: "Globu Nyeupe",
  },
  {
    english: "CastilloÂ®",
    swahili: "CastilloÂ®",
  },
  {
    english: "tukdah 246",
    swahili: "siku 246",
  },
  {
    english: "CP First",
    swahili: "Kwanza CP",
  },
  {
    english: "Tv 14",
    swahili: "Tv 14",
  },
  {
    english: "Bannock Burn 668",
    swahili: "Bannock Burn 668",
  },
  {
    english: "Bannock Burn 777",
    swahili: "Bannock Burn 777",
  },
  {
    english: "TRS1",
    swahili: "TRS1",
  },
  {
    english: "TR14",
    swahili: "TR14",
  },
  {
    english: "TR15",
    swahili: "TR15",
  },
  {
    english: "Matti",
    swahili: "Matti",
  },
  {
    english: "Typica (Bergandal Sidikalang - Sumatera).",
    swahili: "Typica (Bergandal Sidikalang - Sumatera).",
  },
  {
    english: "Hibrido de Timor (HDT Cross breed Arabica-Robusta; Tim-tim Aceh)",
    swahili:
      "Hibrido de Timor (mfugo wa HDT Cross Arabica-Robusta; Tim-tim Aceh)",
  },
  {
    english: "Linie S (S-288 S-795 Andungsari Komasti; Aceh Flores)",
    swahili: "Linie S (S-288 S-795 Andungsari Komasti; Aceh Flores)",
  },
  {
    english: "Ethiopian lines (Rambung Abyssina USDA)",
    swahili: "Laini za Ethiopia (Rambung Abyssina USDA)",
  },
  {
    english: "Jawa (Java Coffee !700AD)",
    swahili: "Jawa (Jawa Coffee !700AD)",
  },
  {
    english: "Wynad Local",
    swahili: "Wynad Mitaa",
  },
  {
    english: "Punjab Giant-35",
    swahili: "Punjab Giant-35",
  },
  {
    english: "VANDERHAVE VDH 480",
    swahili: "VANDERHAVE VDH 480",
  },
  {
    english: "NIDERA PARADISE 6",
    swahili: "NIDERA PARADISE 6",
  },
  {
    english: "DEKALB DEKASOL 3881",
    swahili: "DEKALB DEKASOL 3881",
  },
  {
    english: "Carioca Kidney Bean (IAC 1850)",
    swahili: "Carioca Figo Bean (IAC 1850)",
  },
  {
    english: "P.D.R -14 (Uday)",
    swahili: "P.D.R -14 (Uday)",
  },
  {
    english: "V.L - 63",
    swahili: "V.L - 63",
  },
  {
    english: "Ambar (I.I.P.R -96-4)",
    swahili: "Ambar (I.I.P.R -96-4)",
  },
  {
    english: "Utkarsh (I.I.P.R - 98-5)",
    swahili: "Utkarsh (I.I.P.R - 98-5)",
  },
  {
    english: "RBL 6",
    swahili: "RBL 6",
  },
  {
    english: "YCD1",
    swahili: "YCD1",
  },
  {
    english: "TKD1",
    swahili: "TKD1",
  },
  {
    english: "Pant Anupama* (UPF 191)",
    swahili: "Suruali ya Anupama* (UPF 191)",
  },
  {
    english: "Co2",
    swahili: "Co2",
  },
  {
    english: "Co3",
    swahili: "Co3",
  },
  {
    english: "Co4",
    swahili: "Co4",
  },
  {
    english: "Erenkoy beyazı",
    swahili: "Erenkoy beyazı",
  },
  {
    english: "TSH 565",
    swahili: "TSH 565",
  },
  {
    english: "ICS 95",
    swahili: "ICS 95",
  },
  {
    english: "BMI 67",
    swahili: "BMI 67",
  },
  {
    english: "IMC 67",
    swahili: "IMC 67",
  },
  {
    english: "ICS 1",
    swahili: "ICS 1",
  },
  {
    english: "ICS 6",
    swahili: "ICS 6",
  },
  {
    english: "ICS 39",
    swahili: "ICS 39",
  },
  {
    english: "UF 667",
    swahili: "UF 667",
  },
  {
    english: "PG 18",
    swahili: "PG 18",
  },
  {
    english: "BRS ISIS",
    swahili: "ISIS ya BRS",
  },
  {
    english: "BRS NUBIA",
    swahili: "BRS NUBIA",
  },
  {
    english: "CSV 21S",
    swahili: "CSV 21S",
  },
  {
    english: "CSV 23R",
    swahili: "CSV 23R",
  },
  {
    english: "NM 92",
    swahili: "NM 92",
  },
  {
    english: "NM 94",
    swahili: "NM 94",
  },
  {
    english: "VC 6372",
    swahili: "VC 6372",
  },
  {
    english: "VC 3960 - 80",
    swahili: "VC 3960 - 80",
  },
  {
    english: "CN9-5",
    swahili: "CN9-5",
  },
  {
    english: "VC6173 B -10",
    swahili: "VC6173 B -10",
  },
  {
    english: "VC1973A",
    swahili: "VC1973A",
  },
  {
    english: "VC6173B-11",
    swahili: "VC6173B-11",
  },
  {
    english: "VC6173A",
    swahili: "VC6173A",
  },
  {
    english: "Soil and Climatic Requirements",
    swahili: "Udongo na Mahitaji ya Hali ya Hewa",
  },
  {
    english: "Tillering stage",
    swahili: "Hatua ya kulima",
  },
  {
    english: "Stem elongation",
    swahili: "Urefu wa shina",
  },
  {
    english: "Panicle initiation",
    swahili: "Uanzishaji wa hofu",
  },
  {
    english: "Booting stage",
    swahili: "Hatua ya uanzishaji",
  },
  {
    english: "Flowering stage",
    swahili: "Hatua ya maua",
  },
  {
    english: "Milking stage",
    swahili: "Hatua ya kukamua",
  },
  {
    english: "Dough stage",
    swahili: "Hatua ya unga",
  },
  {
    english: "Mature stage",
    swahili: "Hatua ya kukomaa",
  },
  {
    english: "Gram",
    swahili: "Gramu",
  },
  {
    english: "Kilogram",
    swahili: "Kilo",
  },
  {
    english: "Pound",
    swahili: "Pauni",
  },
  {
    english: "Centimeter",
    swahili: "Sentimita",
  },
  {
    english: "Meter",
    swahili: "Mita",
  },
  {
    english: "Liter-Per-Hectar",
    swahili: "Lita-Kwa-Hekta",
  },
  {
    english: "Milliliters per Square Meter",
    swahili: "Mililita kwa mita ya mraba",
  },
  {
    english: "Kilogram per Acre",
    swahili: "Kilo kwa Ekari",
  },
  {
    english: "Kilogram per Hectare",
    swahili: "Kilo kwa Hekta",
  },
  {
    english: "Tonnes per Hectare",
    swahili: "Tani kwa Hekta",
  },
  {
    english: "Bushels per Hectare",
    swahili: "Vichaka kwa Hekta",
  },
  {
    english: "Bushels per Acre",
    swahili: "Vichaka kwa Ekari",
  },
  {
    english: "Bags per Hectare",
    swahili: "Mifuko kwa Hekta",
  },
  {
    english: "Bags per Acre",
    swahili: "Mifuko kwa Ekari",
  },
  {
    english: "Tonnes per Acre",
    swahili: "Tani kwa Ekari",
  },
  {
    english: "Kilogram/Tree",
    swahili: "Kilo/Mti",
  },
  {
    english: "Acre",
    swahili: "Ekari",
  },
  {
    english: "Hectares",
    swahili: "Hekta",
  },
  {
    english: "Millimetres",
    swahili: "Milimita",
  },
  {
    english: "Centimeter",
    swahili: "Sentimita",
  },
  {
    english: "Meter",
    swahili: "Mita",
  },
  {
    english: "Acre",
    swahili: "Ekari",
  },
  {
    english: "Hectare",
    swahili: "Hekta",
  },
  {
    english: "Millileter",
    swahili: "Millileter",
  },
  {
    english: "Liter",
    swahili: "Lita",
  },
  {
    english: "Acre",
    swahili: "Ekari",
  },
  {
    english: "Hectare",
    swahili: "Hekta",
  },
  {
    english: "Kg",
    swahili: "Kilo",
  },
  {
    english: "Tonnes",
    swahili: "Tani",
  },
  {
    english: "Kilogram per Acre",
    swahili: "Kilo kwa Ekari",
  },
  {
    english: "Kilogram per Hectare",
    swahili: "Kilo kwa Hekta",
  },
  {
    english: "Tonnes per Acre",
    swahili: "Tani kwa Ekari",
  },
  {
    english: "Tonnes per Hectare",
    swahili: "Tani kwa Hekta",
  },
  {
    english: "Litres/hectare",
    swahili: "Lita/hekta",
  },
  {
    english: "Ounces/hectare",
    swahili: "Wanzi/hekta",
  },
  {
    english: "mg/hectare",
    swahili: "mg/hekta",
  },
  {
    english: "g/hectare",
    swahili: "g/hekta",
  },
  {
    english: "kg/hectare",
    swahili: "kg/hekta",
  },
  {
    english: "Litres",
    swahili: "Lita",
  },
  {
    english: "Ounces",
    swahili: "Onzi",
  },
  {
    english: "mg",
    swahili: "mg",
  },
  {
    english: "kg",
    swahili: "kilo",
  },
  {
    english: "g",
    swahili: "g",
  },
  {
    english: "Gallons/acre",
    swahili: "Galoni/ekari",
  },
  {
    english: "Gallons/hectare",
    swahili: "Galoni/hekta",
  },
  {
    english: "Liters/hectare",
    swahili: "Lita/hekta",
  },
  {
    english: "Liters/acre",
    swahili: "Lita/ekari",
  },
  {
    english: "Centimeter",
    swahili: "Sentimita",
  },
  {
    english: "Meter",
    swahili: "Mita",
  },
  {
    english: "kg/ha",
    swahili: "kg/ha",
  },
  {
    english: "ppm",
    swahili: "ppm",
  },
  {
    english: "mg/l",
    swahili: "mg/l",
  },
  {
    english: "Kg per hectare",
    swahili: "Kg kwa hekta",
  },
  {
    english: "Kg per acre",
    swahili: "Kg kwa ekari",
  },
  {
    english: "Tonne per hectare",
    swahili: "Tani kwa hekta",
  },
  {
    english: "Tonne per acre",
    swahili: "Tani kwa ekari",
  },
  {
    english: "Pounds",
    swahili: "Pauni",
  },
  {
    english: "Grams",
    swahili: "Gramu",
  },
  {
    english: "Kilograms",
    swahili: "Kilo",
  },
  {
    english: "Tonnes",
    swahili: "Tani",
  },
  {
    english: "Tonne per acre",
    swahili: "Tani kwa ekari",
  },
  {
    english: "Kg per hectare",
    swahili: "Kg kwa hekta",
  },
  {
    english: "Kg per acre",
    swahili: "Kg kwa ekari",
  },
  {
    english: "Tonne per hectare",
    swahili: "Tani kwa hekta",
  },
  {
    english: "Kilograms",
    swahili: "Kilo",
  },
  {
    english: "Tonnes",
    swahili: "Tani",
  },
  {
    english: "Pounds",
    swahili: "Pauni",
  },
  {
    english: "Tonne per hectare",
    swahili: "Tani kwa hekta",
  },
  {
    english: "Tonne per acre",
    swahili: "Tani kwa ekari",
  },
  {
    english: "Kg per acre",
    swahili: "Kg kwa ekari",
  },
  {
    english: "Kg per hectare",
    swahili: "Kg kwa hekta",
  },
  {
    english: "Kilograms",
    swahili: "Kilo",
  },
  {
    english: "Tonnes",
    swahili: "Tani",
  },
  {
    english: "Pounds",
    swahili: "Pauni",
  },
  {
    english: "kg/ha",
    swahili: "kg/ha",
  },
  {
    english: "ppm",
    swahili: "ppm",
  },
  {
    english: "mg/l",
    swahili: "mg/l",
  },
  {
    english: "kg/ml",
    swahili: "kg/ml",
  },
  {
    english: "g/ml",
    swahili: "g/ml",
  },
  {
    english: "kg/ha",
    swahili: "kg/ha",
  },
  {
    english: "ppm",
    swahili: "ppm",
  },
  {
    english: "mg/l",
    swahili: "mg/l",
  },
  {
    english: "mg/l",
    swahili: "mg/l",
  },
  {
    english: "kg/ha",
    swahili: "kg/ha",
  },
  {
    english: "ppm",
    swahili: "ppm",
  },
  {
    english: "Pounds",
    swahili: "Pauni",
  },
  {
    english: "Kilograms",
    swahili: "Kilo",
  },
  {
    english: "Tonnes",
    swahili: "Tani",
  },
  {
    english: "Milligrams (N)/Liter",
    swahili: "Miligramu (N)/Lita",
  },
  {
    english: "Kg (N)/hectare",
    swahili: "Kg (N)/hekta",
  },
  {
    english: "parts (N)/million",
    swahili: "sehemu (N)/milioni",
  },
  {
    english: "Milligrams (P2O5)/Liter",
    swahili: "Mililita (P2O5)/Lita",
  },
  {
    english: "Kg (P2O5)/hectare",
    swahili: "Kg (P2O5)/hekta",
  },
  {
    english: "parts (P2O5)/million",
    swahili: "sehemu (P2O5)/milioni",
  },
  {
    english: "Milligrams (K20)/Liter",
    swahili: "Miligramu (K20)/Lita",
  },
  {
    english: "Kg (K20)/hectare",
    swahili: "Kg (K20)/hekta",
  },
  {
    english: "parts (K20)/million",
    swahili: "sehemu (K20)/milioni",
  },
  {
    english: "kg per centimetre cube",
    swahili: "kilo kwa mchemraba wa sentimita",
  },
  {
    english: "kg/cm3",
    swahili: "kilo/cm3",
  },
  {
    english: "gr/m3",
    swahili: "gr/m3",
  },
  {
    english: "Ugandan shilling",
    swahili: "shilingi ya Uganda",
  },
  {
    english: "Indian rupee",
    swahili: "Rupia ya India",
  },
  {
    english: "United States dollar",
    swahili: "Dola ya Marekani",
  },
  {
    english: "Indonesian Rupiah",
    swahili: "Rupiah ya Indonesia",
  },
  {
    english: "Euro",
    swahili: "Euro",
  },
  {
    english: "Singapore Dollar",
    swahili: "Dola ya Singapore",
  },
  {
    english: "Brazilian Real",
    swahili: "Real ya Brazil",
  },
  {
    english: "Canadian Dollar",
    swahili: "Dola ya Kanada",
  },
  {
    english: "CFP Franc",
    swahili: "Faranga za CFP",
  },
  {
    english: "French Franc",
    swahili: "Franc ya Ufaransa",
  },
  {
    english: "Italian Lira",
    swahili: "Lira ya Italia",
  },
  {
    english: "Kuwaiti Dinar",
    swahili: "Dinari ya Kuwait",
  },
  {
    english: "Mexican Peso",
    swahili: "Peso ya Mexico",
  },
  {
    english: "Nepalese Rupee",
    swahili: "Rupia ya Nepali",
  },
  {
    english: "United Arab Emirates Dirham",
    swahili: "Dirham ya Falme za Kiarabu",
  },
  {
    english: "Increasing The Yields",
    swahili: "Kuongeza Mavuno",
  },
  {
    english: "Optimize The Use Of Synthetic Fertilizers",
    swahili: "Boresha Utumiaji wa Mbolea za Synthetic",
  },
  {
    english: "Wheat (Nepal)",
    swahili: "Ngano (Nepal)",
  },
  {
    english: "Sorghum (Nepal)",
    swahili: "Mtama (Nepal)",
  },
  {
    english: "Green gram (Nepal)",
    swahili: "Gramu ya kijani (Nepal)",
  },
  {
    english: "Nutmeg&mace (Nepal)",
    swahili: "Nutmeg&mace (Nepal)",
  },
  {
    english: "Tomato (Nepal)",
    swahili: "Nyanya (Nepal)",
  },
  {
    english: "Lemon (Nepal)",
    swahili: "Ndimu (Nepal)",
  },
  {
    english: "Onion (Nepal)",
    swahili: "Kitunguu (Nepal)",
  },
  {
    english: "Banana (Nepal)",
    swahili: "Ndizi (Nepal)",
  },
  {
    english: "Pearl millet (Nepal)",
    swahili: "Lulu mtama (Nepal)",
  },
  {
    english: "Ginger (Nepal)",
    swahili: "Tangawizi (Nepal)",
  },
  {
    english: "Garlic (Nepal)",
    swahili: "Kitunguu saumu (Nepal)",
  },
  {
    english: "Rapeseed ( Nepal )",
    swahili: "Mbakaji ( Nepal )",
  },
  {
    english: "Start date",
    swahili: "Tarehe ya kuanza",
  },
  {
    english: "End date",
    swahili: "Tarehe ya mwisho",
  },
  {
    english: "Our recommendation",
    swahili: "Pendekezo letu",
  },
  {
    english: "Your soil pH",
    swahili: "Udongo wako pH",
  },
  {
    english: "Your soil organic carbon",
    swahili: "Udongo wako wa kaboni ya kikaboni",
  },
  {
    english: "Your soil nitrogen",
    swahili: "Nitrojeni ya udongo wako",
  },
  {
    english: "Your soil phosphorus",
    swahili: "Fosforasi ya udongo wako",
  },
  {
    english: "Your soil potassium",
    swahili: "Udongo wako wa potasiamu",
  },
  {
    english: "Your soil sulfur",
    swahili: "Kiberiti cha udongo wako",
  },
  {
    english: "Your date of irrigation",
    swahili: "Tarehe yako ya umwagiliaji",
  },
  {
    english: "Your water volume",
    swahili: "Kiasi chako cha maji",
  },
  {
    english: "days",
    swahili: "siku",
  },
  {
    english: "Date",
    swahili: "Tarehe",
  },
  {
    english: "Gram",
    swahili: "Gramu",
  },
  {
    english: "Kilogram",
    swahili: "Kilo",
  },
  {
    english: "Pound",
    swahili: "Pauni",
  },
  {
    english: "Centimeter",
    swahili: "Sentimita",
  },
  {
    english: "Meter",
    swahili: "Mita",
  },
  {
    english: "Liter-Per-Hectar",
    swahili: "Lita-Kwa-Hekta",
  },
  {
    english: "Milliliters per Square Meter",
    swahili: "Mililita kwa mita ya mraba",
  },
  {
    english: "Kilogram per Acre",
    swahili: "Kilo kwa Ekari",
  },
  {
    english: "Kilogram per Hectare",
    swahili: "Kilo kwa Hekta",
  },
  {
    english: "Tonnes per Hectare",
    swahili: "Tani kwa Hekta",
  },
  {
    english: "Bushels per Hectare",
    swahili: "Vichaka kwa Hekta",
  },
  {
    english: "Bushels per Acre",
    swahili: "Vichaka kwa Ekari",
  },
  {
    english: "Bags per Hectare",
    swahili: "Mifuko kwa Hekta",
  },
  {
    english: "Bags per Acre",
    swahili: "Mifuko kwa Ekari",
  },
  {
    english: "Tonnes per Acre",
    swahili: "Tani kwa Ekari",
  },
  {
    english: "Kilogram/Tree",
    swahili: "Kilo/Mti",
  },
  {
    english: "Acre",
    swahili: "Ekari",
  },
  {
    english: "Hectares",
    swahili: "Hekta",
  },
  {
    english: "Millimetres",
    swahili: "Milimita",
  },
  {
    english: "Centimeter",
    swahili: "Sentimita",
  },
  {
    english: "Meter",
    swahili: "Mita",
  },
  {
    english: "Acre",
    swahili: "Ekari",
  },
  {
    english: "Hectare",
    swahili: "Hekta",
  },
  {
    english: "Millileter",
    swahili: "Millileter",
  },
  {
    english: "Liter",
    swahili: "Lita",
  },
  {
    english: "Acre",
    swahili: "Ekari",
  },
  {
    english: "Hectare",
    swahili: "Hekta",
  },
  {
    english: "Kg",
    swahili: "Kilo",
  },
  {
    english: "Tonnes",
    swahili: "Tani",
  },
  {
    english: "Kilogram per Acre",
    swahili: "Kilo kwa Ekari",
  },
  {
    english: "Kilogram per Hectare",
    swahili: "Kilo kwa Hekta",
  },
  {
    english: "Tonnes per Acre",
    swahili: "Tani kwa Ekari",
  },
  {
    english: "Tonnes per Hectare",
    swahili: "Tani kwa Hekta",
  },
  {
    english: "Litres/hectare",
    swahili: "Lita/hekta",
  },
  {
    english: "Ounces/hectare",
    swahili: "Wanzi/hekta",
  },
  {
    english: "mg/hectare",
    swahili: "mg/hekta",
  },
  {
    english: "g/hectare",
    swahili: "g/hekta",
  },
  {
    english: "kg/hectare",
    swahili: "kg/hekta",
  },
  {
    english: "Litres",
    swahili: "Lita",
  },
  {
    english: "Ounces",
    swahili: "Onzi",
  },
  {
    english: "mg",
    swahili: "mg",
  },
  {
    english: "kg",
    swahili: "kilo",
  },
  {
    english: "g",
    swahili: "g",
  },
  {
    english: "Gallons/acre",
    swahili: "Galoni/ekari",
  },
  {
    english: "Gallons/hectare",
    swahili: "Galoni/hekta",
  },
  {
    english: "Liters/hectare",
    swahili: "Lita/hekta",
  },
  {
    english: "Liters/acre",
    swahili: "Lita/ekari",
  },
  {
    english: "Centimeter",
    swahili: "Sentimita",
  },
  {
    english: "Meter",
    swahili: "Mita",
  },
  {
    english: "kg/ha",
    swahili: "kg/ha",
  },
  {
    english: "ppm",
    swahili: "ppm",
  },
  {
    english: "mg/l",
    swahili: "mg/l",
  },
  {
    english: "Kg per hectare",
    swahili: "Kg kwa hekta",
  },
  {
    english: "Kg per acre",
    swahili: "Kg kwa ekari",
  },
  {
    english: "Tonne per hectare",
    swahili: "Tani kwa hekta",
  },
  {
    english: "Tonne per acre",
    swahili: "Tani kwa ekari",
  },
  {
    english: "Pounds",
    swahili: "Pauni",
  },
  {
    english: "Grams",
    swahili: "Gramu",
  },
  {
    english: "Kilograms",
    swahili: "Kilo",
  },
  {
    english: "Tonnes",
    swahili: "Tani",
  },
  {
    english: "Tonne per acre",
    swahili: "Tani kwa ekari",
  },
  {
    english: "Kg per hectare",
    swahili: "Kg kwa hekta",
  },
  {
    english: "Kg per acre",
    swahili: "Kg kwa ekari",
  },
  {
    english: "Tonne per hectare",
    swahili: "Tani kwa hekta",
  },
  {
    english: "Kilograms",
    swahili: "Kilo",
  },
  {
    english: "Tonnes",
    swahili: "Tani",
  },
  {
    english: "Pounds",
    swahili: "Pauni",
  },
  {
    english: "Tonne per hectare",
    swahili: "Tani kwa hekta",
  },
  {
    english: "Tonne per acre",
    swahili: "Tani kwa ekari",
  },
  {
    english: "Kg per acre",
    swahili: "Kg kwa ekari",
  },
  {
    english: "Kg per hectare",
    swahili: "Kg kwa hekta",
  },
  {
    english: "Kilograms",
    swahili: "Kilo",
  },
  {
    english: "Tonnes",
    swahili: "Tani",
  },
  {
    english: "Pounds",
    swahili: "Pauni",
  },
  {
    english: "kg/ha",
    swahili: "kg/ha",
  },
  {
    english: "ppm",
    swahili: "ppm",
  },
  {
    english: "mg/l",
    swahili: "mg/l",
  },
  {
    english: "kg/ml",
    swahili: "kg/ml",
  },
  {
    english: "g/ml",
    swahili: "g/ml",
  },
  {
    english: "kg/ha",
    swahili: "kg/ha",
  },
  {
    english: "ppm",
    swahili: "ppm",
  },
  {
    english: "mg/l",
    swahili: "mg/l",
  },
  {
    english: "mg/l",
    swahili: "mg/l",
  },
  {
    english: "kg/ha",
    swahili: "kg/ha",
  },
  {
    english: "ppm",
    swahili: "ppm",
  },
  {
    english: "Pounds",
    swahili: "Pauni",
  },
  {
    english: "Kilograms",
    swahili: "Kilo",
  },
  {
    english: "Tonnes",
    swahili: "Tani",
  },
  {
    english: "Milligrams (N)/Liter",
    swahili: "Miligramu (N)/Lita",
  },
  {
    english: "Kg (N)/hectare",
    swahili: "Kg (N)/hekta",
  },
  {
    english: "parts (N)/million",
    swahili: "sehemu (N)/milioni",
  },
  {
    english: "Milligrams (P2O5)/Liter",
    swahili: "Mililita (P2O5)/Lita",
  },
  {
    english: "Kg (P2O5)/hectare",
    swahili: "Kg (P2O5)/hekta",
  },
  {
    english: "parts (P2O5)/million",
    swahili: "sehemu (P2O5)/milioni",
  },
  {
    english: "Milligrams (K20)/Liter",
    swahili: "Miligramu (K20)/Lita",
  },
  {
    english: "Kg (K20)/hectare",
    swahili: "Kg (K20)/hekta",
  },
  {
    english: "parts (K20)/million",
    swahili: "sehemu (K20)/milioni",
  },
  {
    english: "kg per centimetre cube",
    swahili: "kilo kwa mchemraba wa sentimita",
  },
  {
    english: "kg/cm3",
    swahili: "kilo/cm3",
  },
  {
    english: "gr/m3",
    swahili: "gr/m3",
  },
  {
    english: "Ugandan shilling",
    swahili: "shilingi ya Uganda",
  },
  {
    english: "Indian rupee",
    swahili: "Rupia ya India",
  },
  {
    english: "United States dollar",
    swahili: "Dola ya Marekani",
  },
  {
    english: "Indonesian Rupiah",
    swahili: "Rupiah ya Indonesia",
  },
  {
    english: "Euro",
    swahili: "Euro",
  },
  {
    english: "Singapore Dollar",
    swahili: "Dola ya Singapore",
  },
  {
    english: "Brazilian Real",
    swahili: "Real ya Brazil",
  },
  {
    english: "Canadian Dollar",
    swahili: "Dola ya Kanada",
  },
  {
    english: "CFP Franc",
    swahili: "Faranga za CFP",
  },
  {
    english: "French Franc",
    swahili: "Franc ya Ufaransa",
  },
  {
    english: "Italian Lira",
    swahili: "Lira ya Italia",
  },
  {
    english: "Kuwaiti Dinar",
    swahili: "Dinari ya Kuwait",
  },
  {
    english: "Mexican Peso",
    swahili: "Peso ya Mexico",
  },
  {
    english: "Nepalese Rupee",
    swahili: "Rupia ya Nepali",
  },
  {
    english: "United Arab Emirates Dirham",
    swahili: "Dirham ya Falme za Kiarabu",
  },
  {
    english: "Increasing The Yields",
    swahili: "Kuongeza Mavuno",
  },
  {
    english: "Optimize The Use Of Synthetic Fertilizers",
    swahili: "Boresha Utumiaji wa Mbolea za Synthetic",
  },
  {
    english: "agriculture lime",
    swahili: "kilimo cha chokaa",
  },
  {
    english: "dolomite",
    swahili: "dolomaiti",
  },
  {
    english: "Sandy loam soil",
    swahili: "Udongo wa udongo wa mchanga",
  },
  {
    english: "Clay loam soil",
    swahili: "Udongo wa udongo wa udongo",
  },
  {
    english: "Silt loam soil",
    swahili: "Udongo wa udongo wa silt",
  },
  {
    english: "chicken litter",
    swahili: "takataka ya kuku",
  },
  {
    english: "manure",
    swahili: "samadi",
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
