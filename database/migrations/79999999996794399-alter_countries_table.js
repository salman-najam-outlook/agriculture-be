'use strict';

// for later
// "currencies": {
//   "ADP": {
//     "displayName": "Andorran Peseta",
//     "displayName-count-one": "Andorran peseta",
//     "displayName-count-other": "Andorran pesetas",
//     "symbol": "ADP"
//   },
//   "AED": {
//     "displayName": "United Arab Emirates Dirham",
//     "displayName-count-one": "UAE dirham",
//     "displayName-count-other": "UAE dirhams",
//     "symbol": "AED"
//   },
//   "AFA": {
//     "displayName": "Afghan Afghani (1927–2002)",
//     "displayName-count-one": "Afghan afghani (1927–2002)",
//     "displayName-count-other": "Afghan afghanis (1927–2002)",
//     "symbol": "AFA"
//   },
//   "AFN": {
//     "displayName": "Afghan Afghani",
//     "displayName-count-one": "Afghan Afghani",
//     "displayName-count-other": "Afghan Afghanis",
//     "symbol": "AFN"
//   },
//   "ALK": {
//     "displayName": "Albanian Lek (1946–1965)",
//     "displayName-count-one": "Albanian lek (1946–1965)",
//     "displayName-count-other": "Albanian lekë (1946–1965)"
//   },
//   "ALL": {
//     "displayName": "Albanian Lek",
//     "displayName-count-one": "Albanian lek",
//     "displayName-count-other": "Albanian lekë",
//     "symbol": "ALL"
//   },
//   "AMD": {
//     "displayName": "Armenian Dram",
//     "displayName-count-one": "Armenian dram",
//     "displayName-count-other": "Armenian drams",
//     "symbol": "AMD"
//   },
//   "ANG": {
//     "displayName": "Netherlands Antillean Guilder",
//     "displayName-count-one": "Netherlands Antillean guilder",
//     "displayName-count-other": "Netherlands Antillean guilders",
//     "symbol": "ANG"
//   },
//   "AOA": {
//     "displayName": "Angolan Kwanza",
//     "displayName-count-one": "Angolan kwanza",
//     "displayName-count-other": "Angolan kwanzas",
//     "symbol": "AOA",
//     "symbol-alt-narrow": "Kz"
//   },
//   "AOK": {
//     "displayName": "Angolan Kwanza (1977–1991)",
//     "displayName-count-one": "Angolan kwanza (1977–1991)",
//     "displayName-count-other": "Angolan kwanzas (1977–1991)",
//     "symbol": "AOK"
//   },
//   "AON": {
//     "displayName": "Angolan New Kwanza (1990–2000)",
//     "displayName-count-one": "Angolan new kwanza (1990–2000)",
//     "displayName-count-other": "Angolan new kwanzas (1990–2000)",
//     "symbol": "AON"
//   },
//   "AOR": {
//     "displayName": "Angolan Readjusted Kwanza (1995–1999)",
//     "displayName-count-one": "Angolan readjusted kwanza (1995–1999)",
//     "displayName-count-other": "Angolan readjusted kwanzas (1995–1999)",
//     "symbol": "AOR"
//   },
//   "ARA": {
//     "displayName": "Argentine Austral",
//     "displayName-count-one": "Argentine austral",
//     "displayName-count-other": "Argentine australs",
//     "symbol": "ARA"
//   },
//   "ARL": {
//     "displayName": "Argentine Peso Ley (1970–1983)",
//     "displayName-count-one": "Argentine peso ley (1970–1983)",
//     "displayName-count-other": "Argentine pesos ley (1970–1983)",
//     "symbol": "ARL"
//   },
//   "ARM": {
//     "displayName": "Argentine Peso (1881–1970)",
//     "displayName-count-one": "Argentine peso (1881–1970)",
//     "displayName-count-other": "Argentine pesos (1881–1970)",
//     "symbol": "ARM"
//   },
//   "ARP": {
//     "displayName": "Argentine Peso (1983–1985)",
//     "displayName-count-one": "Argentine peso (1983–1985)",
//     "displayName-count-other": "Argentine pesos (1983–1985)",
//     "symbol": "ARP"
//   },
//   "ARS": {
//     "displayName": "Argentine Peso",
//     "displayName-count-one": "Argentine peso",
//     "displayName-count-other": "Argentine pesos",
//     "symbol": "ARS",
//     "symbol-alt-narrow": "$"
//   },
//   "ATS": {
//     "displayName": "Austrian Schilling",
//     "displayName-count-one": "Austrian schilling",
//     "displayName-count-other": "Austrian schillings",
//     "symbol": "ATS"
//   },
//   "AUD": {
//     "displayName": "Australian Dollar",
//     "displayName-count-one": "Australian dollar",
//     "displayName-count-other": "Australian dollars",
//     "symbol": "A$",
//     "symbol-alt-narrow": "$"
//   },
//   "AWG": {
//     "displayName": "Aruban Florin",
//     "displayName-count-one": "Aruban florin",
//     "displayName-count-other": "Aruban florin",
//     "symbol": "AWG"
//   },
//   "AZM": {
//     "displayName": "Azerbaijani Manat (1993–2006)",
//     "displayName-count-one": "Azerbaijani manat (1993–2006)",
//     "displayName-count-other": "Azerbaijani manats (1993–2006)",
//     "symbol": "AZM"
//   },
//   "AZN": {
//     "displayName": "Azerbaijani Manat",
//     "displayName-count-one": "Azerbaijani manat",
//     "displayName-count-other": "Azerbaijani manats",
//     "symbol": "AZN"
//   },
//   "BAD": {
//     "displayName": "Bosnia-Herzegovina Dinar (1992–1994)",
//     "displayName-count-one": "Bosnia-Herzegovina dinar (1992–1994)",
//     "displayName-count-other": "Bosnia-Herzegovina dinars (1992–1994)",
//     "symbol": "BAD"
//   },
//   "BAM": {
//     "displayName": "Bosnia-Herzegovina Convertible Mark",
//     "displayName-count-one": "Bosnia-Herzegovina convertible mark",
//     "displayName-count-other": "Bosnia-Herzegovina convertible marks",
//     "symbol": "BAM",
//     "symbol-alt-narrow": "KM"
//   },
//   "BAN": {
//     "displayName": "Bosnia-Herzegovina New Dinar (1994–1997)",
//     "displayName-count-one": "Bosnia-Herzegovina new dinar (1994–1997)",
//     "displayName-count-other": "Bosnia-Herzegovina new dinars (1994–1997)",
//     "symbol": "BAN"
//   },
//   "BBD": {
//     "displayName": "Barbadian Dollar",
//     "displayName-count-one": "Barbadian dollar",
//     "displayName-count-other": "Barbadian dollars",
//     "symbol": "BBD",
//     "symbol-alt-narrow": "$"
//   },
//   "BDT": {
//     "displayName": "Bangladeshi Taka",
//     "displayName-count-one": "Bangladeshi taka",
//     "displayName-count-other": "Bangladeshi takas",
//     "symbol": "BDT",
//     "symbol-alt-narrow": "৳"
//   },
//   "BEC": {
//     "displayName": "Belgian Franc (convertible)",
//     "displayName-count-one": "Belgian franc (convertible)",
//     "displayName-count-other": "Belgian francs (convertible)",
//     "symbol": "BEC"
//   },
//   "BEF": {
//     "displayName": "Belgian Franc",
//     "displayName-count-one": "Belgian franc",
//     "displayName-count-other": "Belgian francs",
//     "symbol": "BEF"
//   },
//   "BEL": {
//     "displayName": "Belgian Franc (financial)",
//     "displayName-count-one": "Belgian franc (financial)",
//     "displayName-count-other": "Belgian francs (financial)",
//     "symbol": "BEL"
//   },
//   "BGL": {
//     "displayName": "Bulgarian Hard Lev",
//     "displayName-count-one": "Bulgarian hard lev",
//     "displayName-count-other": "Bulgarian hard leva",
//     "symbol": "BGL"
//   },
//   "BGM": {
//     "displayName": "Bulgarian Socialist Lev",
//     "displayName-count-one": "Bulgarian socialist lev",
//     "displayName-count-other": "Bulgarian socialist leva",
//     "symbol": "BGM"
//   },
//   "BGN": {
//     "displayName": "Bulgarian Lev",
//     "displayName-count-one": "Bulgarian lev",
//     "displayName-count-other": "Bulgarian leva",
//     "symbol": "BGN"
//   },
//   "BGO": {
//     "displayName": "Bulgarian Lev (1879–1952)",
//     "displayName-count-one": "Bulgarian lev (1879–1952)",
//     "displayName-count-other": "Bulgarian leva (1879–1952)",
//     "symbol": "BGO"
//   },
//   "BHD": {
//     "displayName": "Bahraini Dinar",
//     "displayName-count-one": "Bahraini dinar",
//     "displayName-count-other": "Bahraini dinars",
//     "symbol": "BHD"
//   },
//   "BIF": {
//     "displayName": "Burundian Franc",
//     "displayName-count-one": "Burundian franc",
//     "displayName-count-other": "Burundian francs",
//     "symbol": "BIF"
//   },
//   "BMD": {
//     "displayName": "Bermudan Dollar",
//     "displayName-count-one": "Bermudan dollar",
//     "displayName-count-other": "Bermudan dollars",
//     "symbol": "BMD",
//     "symbol-alt-narrow": "$"
//   },
//   "BND": {
//     "displayName": "Brunei Dollar",
//     "displayName-count-one": "Brunei dollar",
//     "displayName-count-other": "Brunei dollars",
//     "symbol": "BND",
//     "symbol-alt-narrow": "$"
//   },
//   "BOB": {
//     "displayName": "Bolivian Boliviano",
//     "displayName-count-one": "Bolivian boliviano",
//     "displayName-count-other": "Bolivian bolivianos",
//     "symbol": "BOB",
//     "symbol-alt-narrow": "Bs"
//   },
//   "BOL": {
//     "displayName": "Bolivian Boliviano (1863–1963)",
//     "displayName-count-one": "Bolivian boliviano (1863–1963)",
//     "displayName-count-other": "Bolivian bolivianos (1863–1963)",
//     "symbol": "BOL"
//   },
//   "BOP": {
//     "displayName": "Bolivian Peso",
//     "displayName-count-one": "Bolivian peso",
//     "displayName-count-other": "Bolivian pesos",
//     "symbol": "BOP"
//   },
//   "BOV": {
//     "displayName": "Bolivian Mvdol",
//     "displayName-count-one": "Bolivian mvdol",
//     "displayName-count-other": "Bolivian mvdols",
//     "symbol": "BOV"
//   },
//   "BRB": {
//     "displayName": "Brazilian New Cruzeiro (1967–1986)",
//     "displayName-count-one": "Brazilian new cruzeiro (1967–1986)",
//     "displayName-count-other": "Brazilian new cruzeiros (1967–1986)",
//     "symbol": "BRB"
//   },
//   "BRC": {
//     "displayName": "Brazilian Cruzado (1986–1989)",
//     "displayName-count-one": "Brazilian cruzado (1986–1989)",
//     "displayName-count-other": "Brazilian cruzados (1986–1989)",
//     "symbol": "BRC"
//   },
//   "BRE": {
//     "displayName": "Brazilian Cruzeiro (1990–1993)",
//     "displayName-count-one": "Brazilian cruzeiro (1990–1993)",
//     "displayName-count-other": "Brazilian cruzeiros (1990–1993)",
//     "symbol": "BRE"
//   },
//   "BRL": {
//     "displayName": "Brazilian Real",
//     "displayName-count-one": "Brazilian real",
//     "displayName-count-other": "Brazilian reals",
//     "symbol": "R$",
//     "symbol-alt-narrow": "R$"
//   },
//   "BRN": {
//     "displayName": "Brazilian New Cruzado (1989–1990)",
//     "displayName-count-one": "Brazilian new cruzado (1989–1990)",
//     "displayName-count-other": "Brazilian new cruzados (1989–1990)",
//     "symbol": "BRN"
//   },
//   "BRR": {
//     "displayName": "Brazilian Cruzeiro (1993–1994)",
//     "displayName-count-one": "Brazilian cruzeiro (1993–1994)",
//     "displayName-count-other": "Brazilian cruzeiros (1993–1994)",
//     "symbol": "BRR"
//   },
//   "BRZ": {
//     "displayName": "Brazilian Cruzeiro (1942–1967)",
//     "displayName-count-one": "Brazilian cruzeiro (1942–1967)",
//     "displayName-count-other": "Brazilian cruzeiros (1942–1967)",
//     "symbol": "BRZ"
//   },
//   "BSD": {
//     "displayName": "Bahamian Dollar",
//     "displayName-count-one": "Bahamian dollar",
//     "displayName-count-other": "Bahamian dollars",
//     "symbol": "BSD",
//     "symbol-alt-narrow": "$"
//   },
//   "BTN": {
//     "displayName": "Bhutanese Ngultrum",
//     "displayName-count-one": "Bhutanese ngultrum",
//     "displayName-count-other": "Bhutanese ngultrums",
//     "symbol": "BTN"
//   },
//   "BUK": {
//     "displayName": "Burmese Kyat",
//     "displayName-count-one": "Burmese kyat",
//     "displayName-count-other": "Burmese kyats",
//     "symbol": "BUK"
//   },
//   "BWP": {
//     "displayName": "Botswanan Pula",
//     "displayName-count-one": "Botswanan pula",
//     "displayName-count-other": "Botswanan pulas",
//     "symbol": "BWP",
//     "symbol-alt-narrow": "P"
//   },
//   "BYB": {
//     "displayName": "Belarusian New Ruble (1994–1999)",
//     "displayName-count-one": "Belarusian new ruble (1994–1999)",
//     "displayName-count-other": "Belarusian new rubles (1994–1999)",
//     "symbol": "BYB"
//   },
//   "BYR": {
//     "displayName": "Belarusian Ruble",
//     "displayName-count-one": "Belarusian ruble",
//     "displayName-count-other": "Belarusian rubles",
//     "symbol": "BYR",
//     "symbol-alt-narrow": "р."
//   },
//   "BZD": {
//     "displayName": "Belize Dollar",
//     "displayName-count-one": "Belize dollar",
//     "displayName-count-other": "Belize dollars",
//     "symbol": "BZD",
//     "symbol-alt-narrow": "$"
//   },
//   "CAD": {
//     "displayName": "Canadian Dollar",
//     "displayName-count-one": "Canadian dollar",
//     "displayName-count-other": "Canadian dollars",
//     "symbol": "CA$",
//     "symbol-alt-narrow": "$"
//   },
//   "CDF": {
//     "displayName": "Congolese Franc",
//     "displayName-count-one": "Congolese franc",
//     "displayName-count-other": "Congolese francs",
//     "symbol": "CDF"
//   },
//   "CHE": {
//     "displayName": "WIR Euro",
//     "displayName-count-one": "WIR euro",
//     "displayName-count-other": "WIR euros",
//     "symbol": "CHE"
//   },
//   "CHF": {
//     "displayName": "Swiss Franc",
//     "displayName-count-one": "Swiss franc",
//     "displayName-count-other": "Swiss francs",
//     "symbol": "CHF"
//   },
//   "CHW": {
//     "displayName": "WIR Franc",
//     "displayName-count-one": "WIR franc",
//     "displayName-count-other": "WIR francs",
//     "symbol": "CHW"
//   },
//   "CLE": {
//     "displayName": "Chilean Escudo",
//     "displayName-count-one": "Chilean escudo",
//     "displayName-count-other": "Chilean escudos",
//     "symbol": "CLE"
//   },
//   "CLF": {
//     "displayName": "Chilean Unit of Account (UF)",
//     "displayName-count-one": "Chilean unit of account (UF)",
//     "displayName-count-other": "Chilean units of account (UF)",
//     "symbol": "CLF"
//   },
//   "CLP": {
//     "displayName": "Chilean Peso",
//     "displayName-count-one": "Chilean peso",
//     "displayName-count-other": "Chilean pesos",
//     "symbol": "CLP",
//     "symbol-alt-narrow": "$"
//   },
//   "CNX": {
//     "displayName": "Chinese People’s Bank Dollar",
//     "displayName-count-one": "Chinese People’s Bank dollar",
//     "displayName-count-other": "Chinese People’s Bank dollars"
//   },
//   "CNY": {
//     "displayName": "Chinese Yuan",
//     "displayName-count-one": "Chinese yuan",
//     "displayName-count-other": "Chinese yuan",
//     "symbol": "CN¥",
//     "symbol-alt-narrow": "¥"
//   },
//   "COP": {
//     "displayName": "Colombian Peso",
//     "displayName-count-one": "Colombian peso",
//     "displayName-count-other": "Colombian pesos",
//     "symbol": "COP",
//     "symbol-alt-narrow": "$"
//   },
//   "COU": {
//     "displayName": "Colombian Real Value Unit",
//     "displayName-count-one": "Colombian real value unit",
//     "displayName-count-other": "Colombian real value units",
//     "symbol": "COU"
//   },
//   "CRC": {
//     "displayName": "Costa Rican Colón",
//     "displayName-count-one": "Costa Rican colón",
//     "displayName-count-other": "Costa Rican colóns",
//     "symbol": "CRC",
//     "symbol-alt-narrow": "₡"
//   },
//   "CSD": {
//     "displayName": "Serbian Dinar (2002–2006)",
//     "displayName-count-one": "Serbian dinar (2002–2006)",
//     "displayName-count-other": "Serbian dinars (2002–2006)",
//     "symbol": "CSD"
//   },
//   "CSK": {
//     "displayName": "Czechoslovak Hard Koruna",
//     "displayName-count-one": "Czechoslovak hard koruna",
//     "displayName-count-other": "Czechoslovak hard korunas",
//     "symbol": "CSK"
//   },
//   "CUC": {
//     "displayName": "Cuban Convertible Peso",
//     "displayName-count-one": "Cuban convertible peso",
//     "displayName-count-other": "Cuban convertible pesos",
//     "symbol": "CUC",
//     "symbol-alt-narrow": "$"
//   },
//   "CUP": {
//     "displayName": "Cuban Peso",
//     "displayName-count-one": "Cuban peso",
//     "displayName-count-other": "Cuban pesos",
//     "symbol": "CUP",
//     "symbol-alt-narrow": "$"
//   },
//   "CVE": {
//     "displayName": "Cape Verdean Escudo",
//     "displayName-count-one": "Cape Verdean escudo",
//     "displayName-count-other": "Cape Verdean escudos",
//     "symbol": "CVE"
//   },
//   "CYP": {
//     "displayName": "Cypriot Pound",
//     "displayName-count-one": "Cypriot pound",
//     "displayName-count-other": "Cypriot pounds",
//     "symbol": "CYP"
//   },
//   "CZK": {
//     "displayName": "Czech Republic Koruna",
//     "displayName-count-one": "Czech Republic koruna",
//     "displayName-count-other": "Czech Republic korunas",
//     "symbol": "CZK",
//     "symbol-alt-narrow": "Kč"
//   },
//   "DDM": {
//     "displayName": "East German Mark",
//     "displayName-count-one": "East German mark",
//     "displayName-count-other": "East German marks",
//     "symbol": "DDM"
//   },
//   "DEM": {
//     "displayName": "German Mark",
//     "displayName-count-one": "German mark",
//     "displayName-count-other": "German marks",
//     "symbol": "DEM"
//   },
//   "DJF": {
//     "displayName": "Djiboutian Franc",
//     "displayName-count-one": "Djiboutian franc",
//     "displayName-count-other": "Djiboutian francs",
//     "symbol": "DJF"
//   },
//   "DKK": {
//     "displayName": "Danish Krone",
//     "displayName-count-one": "Danish krone",
//     "displayName-count-other": "Danish kroner",
//     "symbol": "DKK",
//     "symbol-alt-narrow": "kr"
//   },
//   "DOP": {
//     "displayName": "Dominican Peso",
//     "displayName-count-one": "Dominican peso",
//     "displayName-count-other": "Dominican pesos",
//     "symbol": "DOP",
//     "symbol-alt-narrow": "$"
//   },
//   "DZD": {
//     "displayName": "Algerian Dinar",
//     "displayName-count-one": "Algerian dinar",
//     "displayName-count-other": "Algerian dinars",
//     "symbol": "DZD"
//   },
//   "ECS": {
//     "displayName": "Ecuadorian Sucre",
//     "displayName-count-one": "Ecuadorian sucre",
//     "displayName-count-other": "Ecuadorian sucres",
//     "symbol": "ECS"
//   },
//   "ECV": {
//     "displayName": "Ecuadorian Unit of Constant Value",
//     "displayName-count-one": "Ecuadorian unit of constant value",
//     "displayName-count-other": "Ecuadorian units of constant value",
//     "symbol": "ECV"
//   },
//   "EEK": {
//     "displayName": "Estonian Kroon",
//     "displayName-count-one": "Estonian kroon",
//     "displayName-count-other": "Estonian kroons",
//     "symbol": "EEK"
//   },
//   "EGP": {
//     "displayName": "Egyptian Pound",
//     "displayName-count-one": "Egyptian pound",
//     "displayName-count-other": "Egyptian pounds",
//     "symbol": "EGP",
//     "symbol-alt-narrow": "E£"
//   },
//   "ERN": {
//     "displayName": "Eritrean Nakfa",
//     "displayName-count-one": "Eritrean nakfa",
//     "displayName-count-other": "Eritrean nakfas",
//     "symbol": "ERN"
//   },
//   "ESA": {
//     "displayName": "Spanish Peseta (A account)",
//     "displayName-count-one": "Spanish peseta (A account)",
//     "displayName-count-other": "Spanish pesetas (A account)",
//     "symbol": "ESA"
//   },
//   "ESB": {
//     "displayName": "Spanish Peseta (convertible account)",
//     "displayName-count-one": "Spanish peseta (convertible account)",
//     "displayName-count-other": "Spanish pesetas (convertible account)",
//     "symbol": "ESB"
//   },
//   "ESP": {
//     "displayName": "Spanish Peseta",
//     "displayName-count-one": "Spanish peseta",
//     "displayName-count-other": "Spanish pesetas",
//     "symbol": "ESP",
//     "symbol-alt-narrow": "₧"
//   },
//   "ETB": {
//     "displayName": "Ethiopian Birr",
//     "displayName-count-one": "Ethiopian birr",
//     "displayName-count-other": "Ethiopian birrs",
//     "symbol": "ETB"
//   },
//   "EUR": {
//     "displayName": "Euro",
//     "displayName-count-one": "euro",
//     "displayName-count-other": "euros",
//     "symbol": "€",
//     "symbol-alt-narrow": "€"
//   },
//   "FIM": {
//     "displayName": "Finnish Markka",
//     "displayName-count-one": "Finnish markka",
//     "displayName-count-other": "Finnish markkas",
//     "symbol": "FIM"
//   },
//   "FJD": {
//     "displayName": "Fijian Dollar",
//     "displayName-count-one": "Fijian dollar",
//     "displayName-count-other": "Fijian dollars",
//     "symbol": "FJD",
//     "symbol-alt-narrow": "$"
//   },
//   "FKP": {
//     "displayName": "Falkland Islands Pound",
//     "displayName-count-one": "Falkland Islands pound",
//     "displayName-count-other": "Falkland Islands pounds",
//     "symbol": "FKP",
//     "symbol-alt-narrow": "£"
//   },
//   "FRF": {
//     "displayName": "French Franc",
//     "displayName-count-one": "French franc",
//     "displayName-count-other": "French francs",
//     "symbol": "FRF"
//   },
//   "GBP": {
//     "displayName": "British Pound Sterling",
//     "displayName-count-one": "British pound sterling",
//     "displayName-count-other": "British pounds sterling",
//     "symbol": "£",
//     "symbol-alt-narrow": "£"
//   },
//   "GEK": {
//     "displayName": "Georgian Kupon Larit",
//     "displayName-count-one": "Georgian kupon larit",
//     "displayName-count-other": "Georgian kupon larits",
//     "symbol": "GEK"
//   },
//   "GEL": {
//     "displayName": "Georgian Lari",
//     "displayName-count-one": "Georgian lari",
//     "displayName-count-other": "Georgian laris",
//     "symbol": "GEL"
//   },
//   "GHC": {
//     "displayName": "Ghanaian Cedi (1979–2007)",
//     "displayName-count-one": "Ghanaian cedi (1979–2007)",
//     "displayName-count-other": "Ghanaian cedis (1979–2007)",
//     "symbol": "GHC"
//   },
//   "GHS": {
//     "displayName": "Ghanaian Cedi",
//     "displayName-count-one": "Ghanaian cedi",
//     "displayName-count-other": "Ghanaian cedis",
//     "symbol": "GHS"
//   },
//   "GIP": {
//     "displayName": "Gibraltar Pound",
//     "displayName-count-one": "Gibraltar pound",
//     "displayName-count-other": "Gibraltar pounds",
//     "symbol": "GIP",
//     "symbol-alt-narrow": "£"
//   },
//   "GMD": {
//     "displayName": "Gambian Dalasi",
//     "displayName-count-one": "Gambian dalasi",
//     "displayName-count-other": "Gambian dalasis",
//     "symbol": "GMD"
//   },
//   "GNF": {
//     "displayName": "Guinean Franc",
//     "displayName-count-one": "Guinean franc",
//     "displayName-count-other": "Guinean francs",
//     "symbol": "GNF",
//     "symbol-alt-narrow": "FG"
//   },
//   "GNS": {
//     "displayName": "Guinean Syli",
//     "displayName-count-one": "Guinean syli",
//     "displayName-count-other": "Guinean sylis",
//     "symbol": "GNS"
//   },
//   "GQE": {
//     "displayName": "Equatorial Guinean Ekwele",
//     "displayName-count-one": "Equatorial Guinean ekwele",
//     "displayName-count-other": "Equatorial Guinean ekwele",
//     "symbol": "GQE"
//   },
//   "GRD": {
//     "displayName": "Greek Drachma",
//     "displayName-count-one": "Greek drachma",
//     "displayName-count-other": "Greek drachmas",
//     "symbol": "GRD"
//   },
//   "GTQ": {
//     "displayName": "Guatemalan Quetzal",
//     "displayName-count-one": "Guatemalan quetzal",
//     "displayName-count-other": "Guatemalan quetzals",
//     "symbol": "GTQ",
//     "symbol-alt-narrow": "Q"
//   },
//   "GWE": {
//     "displayName": "Portuguese Guinea Escudo",
//     "displayName-count-one": "Portuguese Guinea escudo",
//     "displayName-count-other": "Portuguese Guinea escudos",
//     "symbol": "GWE"
//   },
//   "GWP": {
//     "displayName": "Guinea-Bissau Peso",
//     "displayName-count-one": "Guinea-Bissau peso",
//     "displayName-count-other": "Guinea-Bissau pesos",
//     "symbol": "GWP"
//   },
//   "GYD": {
//     "displayName": "Guyanaese Dollar",
//     "displayName-count-one": "Guyanaese dollar",
//     "displayName-count-other": "Guyanaese dollars",
//     "symbol": "GYD",
//     "symbol-alt-narrow": "$"
//   },
//   "HKD": {
//     "displayName": "Hong Kong Dollar",
//     "displayName-count-one": "Hong Kong dollar",
//     "displayName-count-other": "Hong Kong dollars",
//     "symbol": "HK$",
//     "symbol-alt-narrow": "$"
//   },
//   "HNL": {
//     "displayName": "Honduran Lempira",
//     "displayName-count-one": "Honduran lempira",
//     "displayName-count-other": "Honduran lempiras",
//     "symbol": "HNL",
//     "symbol-alt-narrow": "L"
//   },
//   "HRD": {
//     "displayName": "Croatian Dinar",
//     "displayName-count-one": "Croatian dinar",
//     "displayName-count-other": "Croatian dinars",
//     "symbol": "HRD"
//   },
//   "HRK": {
//     "displayName": "Croatian Kuna",
//     "displayName-count-one": "Croatian kuna",
//     "displayName-count-other": "Croatian kunas",
//     "symbol": "HRK",
//     "symbol-alt-narrow": "kn"
//   },
//   "HTG": {
//     "displayName": "Haitian Gourde",
//     "displayName-count-one": "Haitian gourde",
//     "displayName-count-other": "Haitian gourdes",
//     "symbol": "HTG"
//   },
//   "HUF": {
//     "displayName": "Hungarian Forint",
//     "displayName-count-one": "Hungarian forint",
//     "displayName-count-other": "Hungarian forints",
//     "symbol": "HUF",
//     "symbol-alt-narrow": "Ft"
//   },
//   "IDR": {
//     "displayName": "Indonesian Rupiah",
//     "displayName-count-one": "Indonesian rupiah",
//     "displayName-count-other": "Indonesian rupiahs",
//     "symbol": "IDR",
//     "symbol-alt-narrow": "Rp"
//   },
//   "IEP": {
//     "displayName": "Irish Pound",
//     "displayName-count-one": "Irish pound",
//     "displayName-count-other": "Irish pounds",
//     "symbol": "IEP"
//   },
//   "ILP": {
//     "displayName": "Israeli Pound",
//     "displayName-count-one": "Israeli pound",
//     "displayName-count-other": "Israeli pounds",
//     "symbol": "ILP"
//   },
//   "ILR": {
//     "displayName": "Israeli Sheqel (1980–1985)",
//     "displayName-count-one": "Israeli sheqel (1980–1985)",
//     "displayName-count-other": "Israeli sheqels (1980–1985)"
//   },
//   "ILS": {
//     "displayName": "Israeli New Sheqel",
//     "displayName-count-one": "Israeli new sheqel",
//     "displayName-count-other": "Israeli new sheqels",
//     "symbol": "₪",
//     "symbol-alt-narrow": "₪"
//   },
//   "INR": {
//     "displayName": "Indian Rupee",
//     "displayName-count-one": "Indian rupee",
//     "displayName-count-other": "Indian rupees",
//     "symbol": "₹",
//     "symbol-alt-narrow": "₹"
//   },
//   "IQD": {
//     "displayName": "Iraqi Dinar",
//     "displayName-count-one": "Iraqi dinar",
//     "displayName-count-other": "Iraqi dinars",
//     "symbol": "IQD"
//   },
//   "IRR": {
//     "displayName": "Iranian Rial",
//     "displayName-count-one": "Iranian rial",
//     "displayName-count-other": "Iranian rials",
//     "symbol": "IRR"
//   },
//   "ISJ": {
//     "displayName": "Icelandic Króna (1918–1981)",
//     "displayName-count-one": "Icelandic króna (1918–1981)",
//     "displayName-count-other": "Icelandic krónur (1918–1981)"
//   },
//   "ISK": {
//     "displayName": "Icelandic Króna",
//     "displayName-count-one": "Icelandic króna",
//     "displayName-count-other": "Icelandic krónur",
//     "symbol": "ISK",
//     "symbol-alt-narrow": "kr"
//   },
//   "ITL": {
//     "displayName": "Italian Lira",
//     "displayName-count-one": "Italian lira",
//     "displayName-count-other": "Italian liras",
//     "symbol": "ITL"
//   },
//   "JMD": {
//     "displayName": "Jamaican Dollar",
//     "displayName-count-one": "Jamaican dollar",
//     "displayName-count-other": "Jamaican dollars",
//     "symbol": "JMD",
//     "symbol-alt-narrow": "$"
//   },
//   "JOD": {
//     "displayName": "Jordanian Dinar",
//     "displayName-count-one": "Jordanian dinar",
//     "displayName-count-other": "Jordanian dinars",
//     "symbol": "JOD"
//   },
//   "JPY": {
//     "displayName": "Japanese Yen",
//     "displayName-count-one": "Japanese yen",
//     "displayName-count-other": "Japanese yen",
//     "symbol": "¥",
//     "symbol-alt-narrow": "¥"
//   },
//   "KES": {
//     "displayName": "Kenyan Shilling",
//     "displayName-count-one": "Kenyan shilling",
//     "displayName-count-other": "Kenyan shillings",
//     "symbol": "KES"
//   },
//   "KGS": {
//     "displayName": "Kyrgystani Som",
//     "displayName-count-one": "Kyrgystani som",
//     "displayName-count-other": "Kyrgystani soms",
//     "symbol": "KGS"
//   },
//   "KHR": {
//     "displayName": "Cambodian Riel",
//     "displayName-count-one": "Cambodian riel",
//     "displayName-count-other": "Cambodian riels",
//     "symbol": "KHR",
//     "symbol-alt-narrow": "៛"
//   },
//   "KMF": {
//     "displayName": "Comorian Franc",
//     "displayName-count-one": "Comorian franc",
//     "displayName-count-other": "Comorian francs",
//     "symbol": "KMF",
//     "symbol-alt-narrow": "CF"
//   },
//   "KPW": {
//     "displayName": "North Korean Won",
//     "displayName-count-one": "North Korean won",
//     "displayName-count-other": "North Korean won",
//     "symbol": "KPW",
//     "symbol-alt-narrow": "₩"
//   },
//   "KRH": {
//     "displayName": "South Korean Hwan (1953–1962)",
//     "displayName-count-one": "South Korean hwan (1953–1962)",
//     "displayName-count-other": "South Korean hwan (1953–1962)",
//     "symbol": "KRH"
//   },
//   "KRO": {
//     "displayName": "South Korean Won (1945–1953)",
//     "displayName-count-one": "South Korean won (1945–1953)",
//     "displayName-count-other": "South Korean won (1945–1953)",
//     "symbol": "KRO"
//   },
//   "KRW": {
//     "displayName": "South Korean Won",
//     "displayName-count-one": "South Korean won",
//     "displayName-count-other": "South Korean won",
//     "symbol": "₩",
//     "symbol-alt-narrow": "₩"
//   },
//   "KWD": {
//     "displayName": "Kuwaiti Dinar",
//     "displayName-count-one": "Kuwaiti dinar",
//     "displayName-count-other": "Kuwaiti dinars",
//     "symbol": "KWD"
//   },
//   "KYD": {
//     "displayName": "Cayman Islands Dollar",
//     "displayName-count-one": "Cayman Islands dollar",
//     "displayName-count-other": "Cayman Islands dollars",
//     "symbol": "KYD",
//     "symbol-alt-narrow": "$"
//   },
//   "KZT": {
//     "displayName": "Kazakhstani Tenge",
//     "displayName-count-one": "Kazakhstani tenge",
//     "displayName-count-other": "Kazakhstani tenges",
//     "symbol": "KZT",
//     "symbol-alt-narrow": "₸"
//   },
//   "LAK": {
//     "displayName": "Laotian Kip",
//     "displayName-count-one": "Laotian kip",
//     "displayName-count-other": "Laotian kips",
//     "symbol": "LAK",
//     "symbol-alt-narrow": "₭"
//   },
//   "LBP": {
//     "displayName": "Lebanese Pound",
//     "displayName-count-one": "Lebanese pound",
//     "displayName-count-other": "Lebanese pounds",
//     "symbol": "LBP",
//     "symbol-alt-narrow": "L£"
//   },
//   "LKR": {
//     "displayName": "Sri Lankan Rupee",
//     "displayName-count-one": "Sri Lankan rupee",
//     "displayName-count-other": "Sri Lankan rupees",
//     "symbol": "LKR",
//     "symbol-alt-narrow": "Rs"
//   },
//   "LRD": {
//     "displayName": "Liberian Dollar",
//     "displayName-count-one": "Liberian dollar",
//     "displayName-count-other": "Liberian dollars",
//     "symbol": "LRD",
//     "symbol-alt-narrow": "$"
//   },
//   "LSL": {
//     "displayName": "Lesotho Loti",
//     "displayName-count-one": "Lesotho loti",
//     "displayName-count-other": "Lesotho lotis",
//     "symbol": "LSL"
//   },
//   "LTL": {
//     "displayName": "Lithuanian Litas",
//     "displayName-count-one": "Lithuanian litas",
//     "displayName-count-other": "Lithuanian litai",
//     "symbol": "LTL",
//     "symbol-alt-narrow": "Lt"
//   },
//   "LTT": {
//     "displayName": "Lithuanian Talonas",
//     "displayName-count-one": "Lithuanian talonas",
//     "displayName-count-other": "Lithuanian talonases",
//     "symbol": "LTT"
//   },
//   "LUC": {
//     "displayName": "Luxembourgian Convertible Franc",
//     "displayName-count-one": "Luxembourgian convertible franc",
//     "displayName-count-other": "Luxembourgian convertible francs",
//     "symbol": "LUC"
//   },
//   "LUF": {
//     "displayName": "Luxembourgian Franc",
//     "displayName-count-one": "Luxembourgian franc",
//     "displayName-count-other": "Luxembourgian francs",
//     "symbol": "LUF"
//   },
//   "LUL": {
//     "displayName": "Luxembourg Financial Franc",
//     "displayName-count-one": "Luxembourg financial franc",
//     "displayName-count-other": "Luxembourg financial francs",
//     "symbol": "LUL"
//   },
//   "LVL": {
//     "displayName": "Latvian Lats",
//     "displayName-count-one": "Latvian lats",
//     "displayName-count-other": "Latvian lati",
//     "symbol": "LVL",
//     "symbol-alt-narrow": "Ls"
//   },
//   "LVR": {
//     "displayName": "Latvian Ruble",
//     "displayName-count-one": "Latvian ruble",
//     "displayName-count-other": "Latvian rubles",
//     "symbol": "LVR"
//   },
//   "LYD": {
//     "displayName": "Libyan Dinar",
//     "displayName-count-one": "Libyan dinar",
//     "displayName-count-other": "Libyan dinars",
//     "symbol": "LYD"
//   },
//   "MAD": {
//     "displayName": "Moroccan Dirham",
//     "displayName-count-one": "Moroccan dirham",
//     "displayName-count-other": "Moroccan dirhams",
//     "symbol": "MAD"
//   },
//   "MAF": {
//     "displayName": "Moroccan Franc",
//     "displayName-count-one": "Moroccan franc",
//     "displayName-count-other": "Moroccan francs",
//     "symbol": "MAF"
//   },
//   "MCF": {
//     "displayName": "Monegasque Franc",
//     "displayName-count-one": "Monegasque franc",
//     "displayName-count-other": "Monegasque francs",
//     "symbol": "MCF"
//   },
//   "MDC": {
//     "displayName": "Moldovan Cupon",
//     "displayName-count-one": "Moldovan cupon",
//     "displayName-count-other": "Moldovan cupon",
//     "symbol": "MDC"
//   },
//   "MDL": {
//     "displayName": "Moldovan Leu",
//     "displayName-count-one": "Moldovan leu",
//     "displayName-count-other": "Moldovan lei",
//     "symbol": "MDL"
//   },
//   "MGA": {
//     "displayName": "Malagasy Ariary",
//     "displayName-count-one": "Malagasy Ariary",
//     "displayName-count-other": "Malagasy Ariaries",
//     "symbol": "MGA",
//     "symbol-alt-narrow": "Ar"
//   },
//   "MGF": {
//     "displayName": "Malagasy Franc",
//     "displayName-count-one": "Malagasy franc",
//     "displayName-count-other": "Malagasy francs",
//     "symbol": "MGF"
//   },
//   "MKD": {
//     "displayName": "Macedonian Denar",
//     "displayName-count-one": "Macedonian denar",
//     "displayName-count-other": "Macedonian denari",
//     "symbol": "MKD"
//   },
//   "MKN": {
//     "displayName": "Macedonian Denar (1992–1993)",
//     "displayName-count-one": "Macedonian denar (1992–1993)",
//     "displayName-count-other": "Macedonian denari (1992–1993)",
//     "symbol": "MKN"
//   },
//   "MLF": {
//     "displayName": "Malian Franc",
//     "displayName-count-one": "Malian franc",
//     "displayName-count-other": "Malian francs",
//     "symbol": "MLF"
//   },
//   "MMK": {
//     "displayName": "Myanmar Kyat",
//     "displayName-count-one": "Myanmar kyat",
//     "displayName-count-other": "Myanmar kyats",
//     "symbol": "MMK",
//     "symbol-alt-narrow": "K"
//   },
//   "MNT": {
//     "displayName": "Mongolian Tugrik",
//     "displayName-count-one": "Mongolian tugrik",
//     "displayName-count-other": "Mongolian tugriks",
//     "symbol": "MNT",
//     "symbol-alt-narrow": "₮"
//   },
//   "MOP": {
//     "displayName": "Macanese Pataca",
//     "displayName-count-one": "Macanese pataca",
//     "displayName-count-other": "Macanese patacas",
//     "symbol": "MOP"
//   },
//   "MRO": {
//     "displayName": "Mauritanian Ouguiya",
//     "displayName-count-one": "Mauritanian ouguiya",
//     "displayName-count-other": "Mauritanian ouguiyas",
//     "symbol": "MRO"
//   },
//   "MTL": {
//     "displayName": "Maltese Lira",
//     "displayName-count-one": "Maltese lira",
//     "displayName-count-other": "Maltese lira",
//     "symbol": "MTL"
//   },
//   "MTP": {
//     "displayName": "Maltese Pound",
//     "displayName-count-one": "Maltese pound",
//     "displayName-count-other": "Maltese pounds",
//     "symbol": "MTP"
//   },
//   "MUR": {
//     "displayName": "Mauritian Rupee",
//     "displayName-count-one": "Mauritian rupee",
//     "displayName-count-other": "Mauritian rupees",
//     "symbol": "MUR",
//     "symbol-alt-narrow": "Rs"
//   },
//   "MVP": {
//     "displayName": "Maldivian Rupee (1947–1981)",
//     "displayName-count-one": "Maldivian rupee (1947–1981)",
//     "displayName-count-other": "Maldivian rupees (1947–1981)"
//   },
//   "MVR": {
//     "displayName": "Maldivian Rufiyaa",
//     "displayName-count-one": "Maldivian rufiyaa",
//     "displayName-count-other": "Maldivian rufiyaas",
//     "symbol": "MVR"
//   },
//   "MWK": {
//     "displayName": "Malawian Kwacha",
//     "displayName-count-one": "Malawian Kwacha",
//     "displayName-count-other": "Malawian Kwachas",
//     "symbol": "MWK"
//   },
//   "MXN": {
//     "displayName": "Mexican Peso",
//     "displayName-count-one": "Mexican peso",
//     "displayName-count-other": "Mexican pesos",
//     "symbol": "MX$",
//     "symbol-alt-narrow": "$"
//   },
//   "MXP": {
//     "displayName": "Mexican Silver Peso (1861–1992)",
//     "displayName-count-one": "Mexican silver peso (1861–1992)",
//     "displayName-count-other": "Mexican silver pesos (1861–1992)",
//     "symbol": "MXP"
//   },
//   "MXV": {
//     "displayName": "Mexican Investment Unit",
//     "displayName-count-one": "Mexican investment unit",
//     "displayName-count-other": "Mexican investment units",
//     "symbol": "MXV"
//   },
//   "MYR": {
//     "displayName": "Malaysian Ringgit",
//     "displayName-count-one": "Malaysian ringgit",
//     "displayName-count-other": "Malaysian ringgits",
//     "symbol": "MYR",
//     "symbol-alt-narrow": "RM"
//   },
//   "MZE": {
//     "displayName": "Mozambican Escudo",
//     "displayName-count-one": "Mozambican escudo",
//     "displayName-count-other": "Mozambican escudos",
//     "symbol": "MZE"
//   },
//   "MZM": {
//     "displayName": "Mozambican Metical (1980–2006)",
//     "displayName-count-one": "Mozambican metical (1980–2006)",
//     "displayName-count-other": "Mozambican meticals (1980–2006)",
//     "symbol": "MZM"
//   },
//   "MZN": {
//     "displayName": "Mozambican Metical",
//     "displayName-count-one": "Mozambican metical",
//     "displayName-count-other": "Mozambican meticals",
//     "symbol": "MZN"
//   },
//   "NAD": {
//     "displayName": "Namibian Dollar",
//     "displayName-count-one": "Namibian dollar",
//     "displayName-count-other": "Namibian dollars",
//     "symbol": "NAD",
//     "symbol-alt-narrow": "$"
//   },
//   "NGN": {
//     "displayName": "Nigerian Naira",
//     "displayName-count-one": "Nigerian naira",
//     "displayName-count-other": "Nigerian nairas",
//     "symbol": "NGN",
//     "symbol-alt-narrow": "₦"
//   },
//   "NIC": {
//     "displayName": "Nicaraguan Córdoba (1988–1991)",
//     "displayName-count-one": "Nicaraguan córdoba (1988–1991)",
//     "displayName-count-other": "Nicaraguan córdobas (1988–1991)",
//     "symbol": "NIC"
//   },
//   "NIO": {
//     "displayName": "Nicaraguan Córdoba",
//     "displayName-count-one": "Nicaraguan córdoba",
//     "displayName-count-other": "Nicaraguan córdobas",
//     "symbol": "NIO",
//     "symbol-alt-narrow": "C$"
//   },
//   "NLG": {
//     "displayName": "Dutch Guilder",
//     "displayName-count-one": "Dutch guilder",
//     "displayName-count-other": "Dutch guilders",
//     "symbol": "NLG"
//   },
//   "NOK": {
//     "displayName": "Norwegian Krone",
//     "displayName-count-one": "Norwegian krone",
//     "displayName-count-other": "Norwegian kroner",
//     "symbol": "NOK",
//     "symbol-alt-narrow": "kr"
//   },
//   "NPR": {
//     "displayName": "Nepalese Rupee",
//     "displayName-count-one": "Nepalese rupee",
//     "displayName-count-other": "Nepalese rupees",
//     "symbol": "NPR",
//     "symbol-alt-narrow": "Rs"
//   },
//   "NZD": {
//     "displayName": "New Zealand Dollar",
//     "displayName-count-one": "New Zealand dollar",
//     "displayName-count-other": "New Zealand dollars",
//     "symbol": "NZ$",
//     "symbol-alt-narrow": "$"
//   },
//   "OMR": {
//     "displayName": "Omani Rial",
//     "displayName-count-one": "Omani rial",
//     "displayName-count-other": "Omani rials",
//     "symbol": "OMR"
//   },
//   "PAB": {
//     "displayName": "Panamanian Balboa",
//     "displayName-count-one": "Panamanian balboa",
//     "displayName-count-other": "Panamanian balboas",
//     "symbol": "PAB"
//   },
//   "PEI": {
//     "displayName": "Peruvian Inti",
//     "displayName-count-one": "Peruvian inti",
//     "displayName-count-other": "Peruvian intis",
//     "symbol": "PEI"
//   },
//   "PEN": {
//     "displayName": "Peruvian Nuevo Sol",
//     "displayName-count-one": "Peruvian nuevo sol",
//     "displayName-count-other": "Peruvian nuevos soles",
//     "symbol": "PEN"
//   },
//   "PES": {
//     "displayName": "Peruvian Sol (1863–1965)",
//     "displayName-count-one": "Peruvian sol (1863–1965)",
//     "displayName-count-other": "Peruvian soles (1863–1965)",
//     "symbol": "PES"
//   },
//   "PGK": {
//     "displayName": "Papua New Guinean Kina",
//     "displayName-count-one": "Papua New Guinean kina",
//     "displayName-count-other": "Papua New Guinean kina",
//     "symbol": "PGK"
//   },
//   "PHP": {
//     "displayName": "Philippine Peso",
//     "displayName-count-one": "Philippine peso",
//     "displayName-count-other": "Philippine pesos",
//     "symbol": "PHP",
//     "symbol-alt-narrow": "₱"
//   },
//   "PKR": {
//     "displayName": "Pakistani Rupee",
//     "displayName-count-one": "Pakistani rupee",
//     "displayName-count-other": "Pakistani rupees",
//     "symbol": "PKR",
//     "symbol-alt-narrow": "Rs"
//   },
//   "PLN": {
//     "displayName": "Polish Zloty",
//     "displayName-count-one": "Polish zloty",
//     "displayName-count-other": "Polish zlotys",
//     "symbol": "PLN",
//     "symbol-alt-narrow": "zł"
//   },
//   "PLZ": {
//     "displayName": "Polish Zloty (1950–1995)",
//     "displayName-count-one": "Polish zloty (PLZ)",
//     "displayName-count-other": "Polish zlotys (PLZ)",
//     "symbol": "PLZ"
//   },
//   "PTE": {
//     "displayName": "Portuguese Escudo",
//     "displayName-count-one": "Portuguese escudo",
//     "displayName-count-other": "Portuguese escudos",
//     "symbol": "PTE"
//   },
//   "PYG": {
//     "displayName": "Paraguayan Guarani",
//     "displayName-count-one": "Paraguayan guarani",
//     "displayName-count-other": "Paraguayan guaranis",
//     "symbol": "PYG",
//     "symbol-alt-narrow": "₲"
//   },
//   "QAR": {
//     "displayName": "Qatari Rial",
//     "displayName-count-one": "Qatari rial",
//     "displayName-count-other": "Qatari rials",
//     "symbol": "QAR"
//   },
//   "RHD": {
//     "displayName": "Rhodesian Dollar",
//     "displayName-count-one": "Rhodesian dollar",
//     "displayName-count-other": "Rhodesian dollars",
//     "symbol": "RHD"
//   },
//   "ROL": {
//     "displayName": "Romanian Leu (1952–2006)",
//     "displayName-count-one": "Romanian leu (1952–2006)",
//     "displayName-count-other": "Romanian Lei (1952–2006)",
//     "symbol": "ROL"
//   },
//   "RON": {
//     "displayName": "Romanian Leu",
//     "displayName-count-one": "Romanian leu",
//     "displayName-count-other": "Romanian lei",
//     "symbol": "RON"
//   },
//   "RSD": {
//     "displayName": "Serbian Dinar",
//     "displayName-count-one": "Serbian dinar",
//     "displayName-count-other": "Serbian dinars",
//     "symbol": "RSD"
//   },
//   "RUB": {
//     "displayName": "Russian Ruble",
//     "displayName-count-one": "Russian ruble",
//     "displayName-count-other": "Russian rubles",
//     "symbol": "RUB",
//     "symbol-alt-variant": "₽"
//   },
//   "RUR": {
//     "displayName": "Russian Ruble (1991–1998)",
//     "displayName-count-one": "Russian ruble (1991–1998)",
//     "displayName-count-other": "Russian rubles (1991–1998)",
//     "symbol": "RUR",
//     "symbol-alt-narrow": "р."
//   },
//   "RWF": {
//     "displayName": "Rwandan Franc",
//     "displayName-count-one": "Rwandan franc",
//     "displayName-count-other": "Rwandan francs",
//     "symbol": "RWF",
//     "symbol-alt-narrow": "RF"
//   },
//   "SAR": {
//     "displayName": "Saudi Riyal",
//     "displayName-count-one": "Saudi riyal",
//     "displayName-count-other": "Saudi riyals",
//     "symbol": "SAR"
//   },
//   "SBD": {
//     "displayName": "Solomon Islands Dollar",
//     "displayName-count-one": "Solomon Islands dollar",
//     "displayName-count-other": "Solomon Islands dollars",
//     "symbol": "SBD",
//     "symbol-alt-narrow": "$"
//   },
//   "SCR": {
//     "displayName": "Seychellois Rupee",
//     "displayName-count-one": "Seychellois rupee",
//     "displayName-count-other": "Seychellois rupees",
//     "symbol": "SCR"
//   },
//   "SDD": {
//     "displayName": "Sudanese Dinar (1992–2007)",
//     "displayName-count-one": "Sudanese dinar (1992–2007)",
//     "displayName-count-other": "Sudanese dinars (1992–2007)",
//     "symbol": "SDD"
//   },
//   "SDG": {
//     "displayName": "Sudanese Pound",
//     "displayName-count-one": "Sudanese pound",
//     "displayName-count-other": "Sudanese pounds",
//     "symbol": "SDG"
//   },
//   "SDP": {
//     "displayName": "Sudanese Pound (1957–1998)",
//     "displayName-count-one": "Sudanese pound (1957–1998)",
//     "displayName-count-other": "Sudanese pounds (1957–1998)",
//     "symbol": "SDP"
//   },
//   "SEK": {
//     "displayName": "Swedish Krona",
//     "displayName-count-one": "Swedish krona",
//     "displayName-count-other": "Swedish kronor",
//     "symbol": "SEK",
//     "symbol-alt-narrow": "kr"
//   },
//   "SGD": {
//     "displayName": "Singapore Dollar",
//     "displayName-count-one": "Singapore dollar",
//     "displayName-count-other": "Singapore dollars",
//     "symbol": "SGD",
//     "symbol-alt-narrow": "$"
//   },
//   "SHP": {
//     "displayName": "St. Helena Pound",
//     "displayName-count-one": "St. Helena pound",
//     "displayName-count-other": "St. Helena pounds",
//     "symbol": "SHP",
//     "symbol-alt-narrow": "£"
//   },
//   "SIT": {
//     "displayName": "Slovenian Tolar",
//     "displayName-count-one": "Slovenian tolar",
//     "displayName-count-other": "Slovenian tolars",
//     "symbol": "SIT"
//   },
//   "SKK": {
//     "displayName": "Slovak Koruna",
//     "displayName-count-one": "Slovak koruna",
//     "displayName-count-other": "Slovak korunas",
//     "symbol": "SKK"
//   },
//   "SLL": {
//     "displayName": "Sierra Leonean Leone",
//     "displayName-count-one": "Sierra Leonean leone",
//     "displayName-count-other": "Sierra Leonean leones",
//     "symbol": "SLL"
//   },
//   "SOS": {
//     "displayName": "Somali Shilling",
//     "displayName-count-one": "Somali shilling",
//     "displayName-count-other": "Somali shillings",
//     "symbol": "SOS"
//   },
//   "SRD": {
//     "displayName": "Surinamese Dollar",
//     "displayName-count-one": "Surinamese dollar",
//     "displayName-count-other": "Surinamese dollars",
//     "symbol": "SRD",
//     "symbol-alt-narrow": "$"
//   },
//   "SRG": {
//     "displayName": "Surinamese Guilder",
//     "displayName-count-one": "Surinamese guilder",
//     "displayName-count-other": "Surinamese guilders",
//     "symbol": "SRG"
//   },
//   "SSP": {
//     "displayName": "South Sudanese Pound",
//     "displayName-count-one": "South Sudanese pound",
//     "displayName-count-other": "South Sudanese pounds",
//     "symbol": "SSP",
//     "symbol-alt-narrow": "£"
//   },
//   "STD": {
//     "displayName": "São Tomé & Príncipe Dobra",
//     "displayName-count-one": "São Tomé & Príncipe dobra",
//     "displayName-count-other": "São Tomé & Príncipe dobras",
//     "symbol": "STD",
//     "symbol-alt-narrow": "Db"
//   },
//   "SUR": {
//     "displayName": "Soviet Rouble",
//     "displayName-count-one": "Soviet rouble",
//     "displayName-count-other": "Soviet roubles",
//     "symbol": "SUR"
//   },
//   "SVC": {
//     "displayName": "Salvadoran Colón",
//     "displayName-count-one": "Salvadoran colón",
//     "displayName-count-other": "Salvadoran colones",
//     "symbol": "SVC"
//   },
//   "SYP": {
//     "displayName": "Syrian Pound",
//     "displayName-count-one": "Syrian pound",
//     "displayName-count-other": "Syrian pounds",
//     "symbol": "SYP",
//     "symbol-alt-narrow": "£"
//   },
//   "SZL": {
//     "displayName": "Swazi Lilangeni",
//     "displayName-count-one": "Swazi lilangeni",
//     "displayName-count-other": "Swazi emalangeni",
//     "symbol": "SZL"
//   },
//   "THB": {
//     "displayName": "Thai Baht",
//     "displayName-count-one": "Thai baht",
//     "displayName-count-other": "Thai baht",
//     "symbol": "THB",
//     "symbol-alt-narrow": "฿"
//   },
//   "TJR": {
//     "displayName": "Tajikistani Ruble",
//     "displayName-count-one": "Tajikistani ruble",
//     "displayName-count-other": "Tajikistani rubles",
//     "symbol": "TJR"
//   },
//   "TJS": {
//     "displayName": "Tajikistani Somoni",
//     "displayName-count-one": "Tajikistani somoni",
//     "displayName-count-other": "Tajikistani somonis",
//     "symbol": "TJS"
//   },
//   "TMM": {
//     "displayName": "Turkmenistani Manat (1993–2009)",
//     "displayName-count-one": "Turkmenistani manat (1993–2009)",
//     "displayName-count-other": "Turkmenistani manat (1993–2009)",
//     "symbol": "TMM"
//   },
//   "TMT": {
//     "displayName": "Turkmenistani Manat",
//     "displayName-count-one": "Turkmenistani manat",
//     "displayName-count-other": "Turkmenistani manat",
//     "symbol": "TMT"
//   },
//   "TND": {
//     "displayName": "Tunisian Dinar",
//     "displayName-count-one": "Tunisian dinar",
//     "displayName-count-other": "Tunisian dinars",
//     "symbol": "TND"
//   },
//   "TOP": {
//     "displayName": "Tongan Paʻanga",
//     "displayName-count-one": "Tongan paʻanga",
//     "displayName-count-other": "Tongan paʻanga",
//     "symbol": "TOP",
//     "symbol-alt-narrow": "T$"
//   },
//   "TPE": {
//     "displayName": "Timorese Escudo",
//     "displayName-count-one": "Timorese escudo",
//     "displayName-count-other": "Timorese escudos",
//     "symbol": "TPE"
//   },
//   "TRL": {
//     "displayName": "Turkish Lira (1922–2005)",
//     "displayName-count-one": "Turkish lira (1922–2005)",
//     "displayName-count-other": "Turkish Lira (1922–2005)",
//     "symbol": "TRL"
//   },
//   "TRY": {
//     "displayName": "Turkish Lira",
//     "displayName-count-one": "Turkish lira",
//     "displayName-count-other": "Turkish Lira",
//     "symbol": "TRY",
//     "symbol-alt-narrow": "₺",
//     "symbol-alt-variant": "TL"
//   },
//   "TTD": {
//     "displayName": "Trinidad & Tobago Dollar",
//     "displayName-count-one": "Trinidad & Tobago dollar",
//     "displayName-count-other": "Trinidad & Tobago dollars",
//     "symbol": "TTD",
//     "symbol-alt-narrow": "$"
//   },
//   "TWD": {
//     "displayName": "New Taiwan Dollar",
//     "displayName-count-one": "New Taiwan dollar",
//     "displayName-count-other": "New Taiwan dollars",
//     "symbol": "NT$",
//     "symbol-alt-narrow": "NT$"
//   },
//   "TZS": {
//     "displayName": "Tanzanian Shilling",
//     "displayName-count-one": "Tanzanian shilling",
//     "displayName-count-other": "Tanzanian shillings",
//     "symbol": "TZS"
//   },
//   "UAH": {
//     "displayName": "Ukrainian Hryvnia",
//     "displayName-count-one": "Ukrainian hryvnia",
//     "displayName-count-other": "Ukrainian hryvnias",
//     "symbol": "UAH",
//     "symbol-alt-narrow": "₴"
//   },
//   "UAK": {
//     "displayName": "Ukrainian Karbovanets",
//     "displayName-count-one": "Ukrainian karbovanets",
//     "displayName-count-other": "Ukrainian karbovantsiv",
//     "symbol": "UAK"
//   },
//   "UGS": {
//     "displayName": "Ugandan Shilling (1966–1987)",
//     "displayName-count-one": "Ugandan shilling (1966–1987)",
//     "displayName-count-other": "Ugandan shillings (1966–1987)",
//     "symbol": "UGS"
//   },
//   "UGX": {
//     "displayName": "Ugandan Shilling",
//     "displayName-count-one": "Ugandan shilling",
//     "displayName-count-other": "Ugandan shillings",
//     "symbol": "UGX"
//   },
//   "USD": {
//     "displayName": "US Dollar",
//     "displayName-count-one": "US dollar",
//     "displayName-count-other": "US dollars",
//     "symbol": "$",
//     "symbol-alt-narrow": "$"
//   },
//   "USN": {
//     "displayName": "US Dollar (Next day)",
//     "displayName-count-one": "US dollar (next day)",
//     "displayName-count-other": "US dollars (next day)",
//     "symbol": "USN"
//   },
//   "USS": {
//     "displayName": "US Dollar (Same day)",
//     "displayName-count-one": "US dollar (same day)",
//     "displayName-count-other": "US dollars (same day)",
//     "symbol": "USS"
//   },
//   "UYI": {
//     "displayName": "Uruguayan Peso (Indexed Units)",
//     "displayName-count-one": "Uruguayan peso (indexed units)",
//     "displayName-count-other": "Uruguayan pesos (indexed units)",
//     "symbol": "UYI"
//   },
//   "UYP": {
//     "displayName": "Uruguayan Peso (1975–1993)",
//     "displayName-count-one": "Uruguayan peso (1975–1993)",
//     "displayName-count-other": "Uruguayan pesos (1975–1993)",
//     "symbol": "UYP"
//   },
//   "UYU": {
//     "displayName": "Uruguayan Peso",
//     "displayName-count-one": "Uruguayan peso",
//     "displayName-count-other": "Uruguayan pesos",
//     "symbol": "UYU",
//     "symbol-alt-narrow": "$"
//   },
//   "UZS": {
//     "displayName": "Uzbekistan Som",
//     "displayName-count-one": "Uzbekistan som",
//     "displayName-count-other": "Uzbekistan som",
//     "symbol": "UZS"
//   },
//   "VEB": {
//     "displayName": "Venezuelan Bolívar (1871–2008)",
//     "displayName-count-one": "Venezuelan bolívar (1871–2008)",
//     "displayName-count-other": "Venezuelan bolívars (1871–2008)",
//     "symbol": "VEB"
//   },
//   "VEF": {
//     "displayName": "Venezuelan Bolívar",
//     "displayName-count-one": "Venezuelan bolívar",
//     "displayName-count-other": "Venezuelan bolívars",
//     "symbol": "VEF",
//     "symbol-alt-narrow": "Bs"
//   },
//   "VND": {
//     "displayName": "Vietnamese Dong",
//     "displayName-count-one": "Vietnamese dong",
//     "displayName-count-other": "Vietnamese dong",
//     "symbol": "₫",
//     "symbol-alt-narrow": "₫"
//   },
//   "VNN": {
//     "displayName": "Vietnamese Dong (1978–1985)",
//     "displayName-count-one": "Vietnamese dong (1978–1985)",
//     "displayName-count-other": "Vietnamese dong (1978–1985)",
//     "symbol": "VNN"
//   },
//   "VUV": {
//     "displayName": "Vanuatu Vatu",
//     "displayName-count-one": "Vanuatu vatu",
//     "displayName-count-other": "Vanuatu vatus",
//     "symbol": "VUV"
//   },
//   "WST": {
//     "displayName": "Samoan Tala",
//     "displayName-count-one": "Samoan tala",
//     "displayName-count-other": "Samoan tala",
//     "symbol": "WST"
//   },
//   "XAF": {
//     "displayName": "CFA Franc BEAC",
//     "displayName-count-one": "CFA franc BEAC",
//     "displayName-count-other": "CFA francs BEAC",
//     "symbol": "FCFA"
//   },
//   "XAG": {
//     "displayName": "Silver",
//     "displayName-count-one": "troy ounce of silver",
//     "displayName-count-other": "troy ounces of silver",
//     "symbol": "XAG"
//   },
//   "XAU": {
//     "displayName": "Gold",
//     "displayName-count-one": "troy ounce of gold",
//     "displayName-count-other": "troy ounces of gold",
//     "symbol": "XAU"
//   },
//   "XBA": {
//     "displayName": "European Composite Unit",
//     "displayName-count-one": "European composite unit",
//     "displayName-count-other": "European composite units",
//     "symbol": "XBA"
//   },
//   "XBB": {
//     "displayName": "European Monetary Unit",
//     "displayName-count-one": "European monetary unit",
//     "displayName-count-other": "European monetary units",
//     "symbol": "XBB"
//   },
//   "XBC": {
//     "displayName": "European Unit of Account (XBC)",
//     "displayName-count-one": "European unit of account (XBC)",
//     "displayName-count-other": "European units of account (XBC)",
//     "symbol": "XBC"
//   },
//   "XBD": {
//     "displayName": "European Unit of Account (XBD)",
//     "displayName-count-one": "European unit of account (XBD)",
//     "displayName-count-other": "European units of account (XBD)",
//     "symbol": "XBD"
//   },
//   "XCD": {
//     "displayName": "East Caribbean Dollar",
//     "displayName-count-one": "East Caribbean dollar",
//     "displayName-count-other": "East Caribbean dollars",
//     "symbol": "EC$",
//     "symbol-alt-narrow": "$"
//   },
//   "XDR": {
//     "displayName": "Special Drawing Rights",
//     "displayName-count-one": "special drawing rights",
//     "displayName-count-other": "special drawing rights",
//     "symbol": "XDR"
//   },
//   "XEU": {
//     "displayName": "European Currency Unit",
//     "displayName-count-one": "European currency unit",
//     "displayName-count-other": "European currency units",
//     "symbol": "XEU"
//   },
//   "XFO": {
//     "displayName": "French Gold Franc",
//     "displayName-count-one": "French gold franc",
//     "displayName-count-other": "French gold francs",
//     "symbol": "XFO"
//   },
//   "XFU": {
//     "displayName": "French UIC-Franc",
//     "displayName-count-one": "French UIC-franc",
//     "displayName-count-other": "French UIC-francs",
//     "symbol": "XFU"
//   },
//   "XOF": {
//     "displayName": "CFA Franc BCEAO",
//     "displayName-count-one": "CFA franc BCEAO",
//     "displayName-count-other": "CFA francs BCEAO",
//     "symbol": "CFA"
//   },
//   "XPD": {
//     "displayName": "Palladium",
//     "displayName-count-one": "troy ounce of palladium",
//     "displayName-count-other": "troy ounces of palladium",
//     "symbol": "XPD"
//   },
//   "XPF": {
//     "displayName": "CFP Franc",
//     "displayName-count-one": "CFP franc",
//     "displayName-count-other": "CFP francs",
//     "symbol": "CFPF"
//   },
//   "XPT": {
//     "displayName": "Platinum",
//     "displayName-count-one": "troy ounce of platinum",
//     "displayName-count-other": "troy ounces of platinum",
//     "symbol": "XPT"
//   },
//   "XRE": {
//     "displayName": "RINET Funds",
//     "displayName-count-one": "RINET Funds unit",
//     "displayName-count-other": "RINET Funds units",
//     "symbol": "XRE"
//   },
//   "XSU": {
//     "displayName": "Sucre",
//     "displayName-count-one": "Sucre",
//     "displayName-count-other": "Sucres",
//     "symbol": "XSU"
//   },
//   "XTS": {
//     "displayName": "Testing Currency Code",
//     "displayName-count-one": "Testing Currency unit",
//     "displayName-count-other": "Testing Currency units",
//     "symbol": "XTS"
//   },
//   "XUA": {
//     "displayName": "ADB Unit of Account",
//     "displayName-count-one": "ADB unit of account",
//     "displayName-count-other": "ADB units of account",
//     "symbol": "XUA"
//   },
//   "YDD": {
//     "displayName": "Yemeni Dinar",
//     "displayName-count-one": "Yemeni dinar",
//     "displayName-count-other": "Yemeni dinars",
//     "symbol": "YDD"
//   },
//   "YER": {
//     "displayName": "Yemeni Rial",
//     "displayName-count-one": "Yemeni rial",
//     "displayName-count-other": "Yemeni rials",
//     "symbol": "YER"
//   },
//   "YUD": {
//     "displayName": "Yugoslavian Hard Dinar (1966–1990)",
//     "displayName-count-one": "Yugoslavian hard dinar (1966–1990)",
//     "displayName-count-other": "Yugoslavian hard dinars (1966–1990)",
//     "symbol": "YUD"
//   },
//   "YUM": {
//     "displayName": "Yugoslavian New Dinar (1994–2002)",
//     "displayName-count-one": "Yugoslavian new dinar (1994–2002)",
//     "displayName-count-other": "Yugoslavian new dinars (1994–2002)",
//     "symbol": "YUM"
//   },
//   "YUN": {
//     "displayName": "Yugoslavian Convertible Dinar (1990–1992)",
//     "displayName-count-one": "Yugoslavian convertible dinar (1990–1992)",
//     "displayName-count-other": "Yugoslavian convertible dinars (1990–1992)",
//     "symbol": "YUN"
//   },
//   "YUR": {
//     "displayName": "Yugoslavian Reformed Dinar (1992–1993)",
//     "displayName-count-one": "Yugoslavian reformed dinar (1992–1993)",
//     "displayName-count-other": "Yugoslavian reformed dinars (1992–1993)",
//     "symbol": "YUR"
//   },
//   "ZAL": {
//     "displayName": "South African Rand (financial)",
//     "displayName-count-one": "South African rand (financial)",
//     "displayName-count-other": "South African rands (financial)",
//     "symbol": "ZAL"
//   },
//   "ZAR": {
//     "displayName": "South African Rand",
//     "displayName-count-one": "South African rand",
//     "displayName-count-other": "South African rand",
//     "symbol": "ZAR",
//     "symbol-alt-narrow": "R"
//   },
//   "ZMK": {
//     "displayName": "Zambian Kwacha (1968–2012)",
//     "displayName-count-one": "Zambian kwacha (1968–2012)",
//     "displayName-count-other": "Zambian kwachas (1968–2012)",
//     "symbol": "ZMK"
//   },
//   "ZMW": {
//     "displayName": "Zambian Kwacha",
//     "displayName-count-one": "Zambian kwacha",
//     "displayName-count-other": "Zambian kwachas",
//     "symbol": "ZMW",
//     "symbol-alt-narrow": "ZK"
//   },
//   "ZRN": {
//     "displayName": "Zairean New Zaire (1993–1998)",
//     "displayName-count-one": "Zairean new zaire (1993–1998)",
//     "displayName-count-other": "Zairean new zaires (1993–1998)",
//     "symbol": "ZRN"
//   },
//   "ZRZ": {
//     "displayName": "Zairean Zaire (1971–1993)",
//     "displayName-count-one": "Zairean zaire (1971–1993)",
//     "displayName-count-other": "Zairean zaires (1971–1993)",
//     "symbol": "ZRZ"
//   },
//   "ZWD": {
//     "displayName": "Zimbabwean Dollar (1980–2008)",
//     "displayName-count-one": "Zimbabwean dollar (1980–2008)",
//     "displayName-count-other": "Zimbabwean dollars (1980–2008)",
//     "symbol": "ZWD"
//   },
//   "ZWL": {
//     "displayName": "Zimbabwean Dollar (2009)",
//     "displayName-count-one": "Zimbabwean dollar (2009)",
//     "displayName-count-other": "Zimbabwean dollars (2009)",
//     "symbol": "ZWL"
//   },
//   "ZWR": {
//     "displayName": "Zimbabwean Dollar (2008)",
//     "displayName-count-one": "Zimbabwean dollar (2008)",
//     "displayName-count-other": "Zimbabwean dollars (2008)",
//     "symbol": "ZWR"
//   }
// }


// "country": [
//   {
//       "countryCode": "AD",
//       "countryName": "Andorra",
//       "currencyCode": "EUR",
//       "population": "84000",
//       "capital": "Andorra la Vella",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "AE",
//       "countryName": "United Arab Emirates",
//       "currencyCode": "AED",
//       "population": "4975593",
//       "capital": "Abu Dhabi",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "AF",
//       "countryName": "Afghanistan",
//       "currencyCode": "AFN",
//       "population": "29121286",
//       "capital": "Kabul",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "AG",
//       "countryName": "Antigua and Barbuda",
//       "currencyCode": "XCD",
//       "population": "86754",
//       "capital": "St. John's",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "AI",
//       "countryName": "Anguilla",
//       "currencyCode": "XCD",
//       "population": "13254",
//       "capital": "The Valley",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "AL",
//       "countryName": "Albania",
//       "currencyCode": "ALL",
//       "population": "2986952",
//       "capital": "Tirana",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "AM",
//       "countryName": "Armenia",
//       "currencyCode": "AMD",
//       "population": "2968000",
//       "capital": "Yerevan",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "AO",
//       "countryName": "Angola",
//       "currencyCode": "AOA",
//       "population": "13068161",
//       "capital": "Luanda",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "AQ",
//       "countryName": "Antarctica",
//       "currencyCode": "",
//       "population": "0",
//       "capital": "",
//       "continentName": "Antarctica"
//   },
//   {
//       "countryCode": "AR",
//       "countryName": "Argentina",
//       "currencyCode": "ARS",
//       "population": "41343201",
//       "capital": "Buenos Aires",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "AS",
//       "countryName": "American Samoa",
//       "currencyCode": "USD",
//       "population": "57881",
//       "capital": "Pago Pago",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "AT",
//       "countryName": "Austria",
//       "currencyCode": "EUR",
//       "population": "8205000",
//       "capital": "Vienna",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "AU",
//       "countryName": "Australia",
//       "currencyCode": "AUD",
//       "population": "21515754",
//       "capital": "Canberra",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "AW",
//       "countryName": "Aruba",
//       "currencyCode": "AWG",
//       "population": "71566",
//       "capital": "Oranjestad",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "AX",
//       "countryName": "Åland",
//       "currencyCode": "EUR",
//       "population": "26711",
//       "capital": "Mariehamn",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "AZ",
//       "countryName": "Azerbaijan",
//       "currencyCode": "AZN",
//       "population": "8303512",
//       "capital": "Baku",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "BA",
//       "countryName": "Bosnia and Herzegovina",
//       "currencyCode": "BAM",
//       "population": "4590000",
//       "capital": "Sarajevo",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "BB",
//       "countryName": "Barbados",
//       "currencyCode": "BBD",
//       "population": "285653",
//       "capital": "Bridgetown",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "BD",
//       "countryName": "Bangladesh",
//       "currencyCode": "BDT",
//       "population": "156118464",
//       "capital": "Dhaka",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "BE",
//       "countryName": "Belgium",
//       "currencyCode": "EUR",
//       "population": "10403000",
//       "capital": "Brussels",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "BF",
//       "countryName": "Burkina Faso",
//       "currencyCode": "XOF",
//       "population": "16241811",
//       "capital": "Ouagadougou",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "BG",
//       "countryName": "Bulgaria",
//       "currencyCode": "BGN",
//       "population": "7148785",
//       "capital": "Sofia",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "BH",
//       "countryName": "Bahrain",
//       "currencyCode": "BHD",
//       "population": "738004",
//       "capital": "Manama",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "BI",
//       "countryName": "Burundi",
//       "currencyCode": "BIF",
//       "population": "9863117",
//       "capital": "Bujumbura",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "BJ",
//       "countryName": "Benin",
//       "currencyCode": "XOF",
//       "population": "9056010",
//       "capital": "Porto-Novo",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "BL",
//       "countryName": "Saint Barthélemy",
//       "currencyCode": "EUR",
//       "population": "8450",
//       "capital": "Gustavia",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "BM",
//       "countryName": "Bermuda",
//       "currencyCode": "BMD",
//       "population": "65365",
//       "capital": "Hamilton",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "BN",
//       "countryName": "Brunei",
//       "currencyCode": "BND",
//       "population": "395027",
//       "capital": "Bandar Seri Begawan",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "BO",
//       "countryName": "Bolivia",
//       "currencyCode": "BOB",
//       "population": "9947418",
//       "capital": "Sucre",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "BQ",
//       "countryName": "Bonaire",
//       "currencyCode": "USD",
//       "population": "18012",
//       "capital": "Kralendijk",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "BR",
//       "countryName": "Brazil",
//       "currencyCode": "BRL",
//       "population": "201103330",
//       "capital": "Brasília",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "BS",
//       "countryName": "Bahamas",
//       "currencyCode": "BSD",
//       "population": "301790",
//       "capital": "Nassau",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "BT",
//       "countryName": "Bhutan",
//       "currencyCode": "BTN",
//       "population": "699847",
//       "capital": "Thimphu",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "BV",
//       "countryName": "Bouvet Island",
//       "currencyCode": "NOK",
//       "population": "0",
//       "capital": "",
//       "continentName": "Antarctica"
//   },
//   {
//       "countryCode": "BW",
//       "countryName": "Botswana",
//       "currencyCode": "BWP",
//       "population": "2029307",
//       "capital": "Gaborone",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "BY",
//       "countryName": "Belarus",
//       "currencyCode": "BYR",
//       "population": "9685000",
//       "capital": "Minsk",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "BZ",
//       "countryName": "Belize",
//       "currencyCode": "BZD",
//       "population": "314522",
//       "capital": "Belmopan",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "CA",
//       "countryName": "Canada",
//       "currencyCode": "CAD",
//       "population": "33679000",
//       "capital": "Ottawa",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "CC",
//       "countryName": "Cocos [Keeling] Islands",
//       "currencyCode": "AUD",
//       "population": "628",
//       "capital": "West Island",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "CD",
//       "countryName": "Democratic Republic of the Congo",
//       "currencyCode": "CDF",
//       "population": "70916439",
//       "capital": "Kinshasa",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "CF",
//       "countryName": "Central African Republic",
//       "currencyCode": "XAF",
//       "population": "4844927",
//       "capital": "Bangui",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "CG",
//       "countryName": "Republic of the Congo",
//       "currencyCode": "XAF",
//       "population": "3039126",
//       "capital": "Brazzaville",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "CH",
//       "countryName": "Switzerland",
//       "currencyCode": "CHF",
//       "population": "7581000",
//       "capital": "Bern",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "CI",
//       "countryName": "Ivory Coast",
//       "currencyCode": "XOF",
//       "population": "21058798",
//       "capital": "Yamoussoukro",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "CK",
//       "countryName": "Cook Islands",
//       "currencyCode": "NZD",
//       "population": "21388",
//       "capital": "Avarua",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "CL",
//       "countryName": "Chile",
//       "currencyCode": "CLP",
//       "population": "16746491",
//       "capital": "Santiago",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "CM",
//       "countryName": "Cameroon",
//       "currencyCode": "XAF",
//       "population": "19294149",
//       "capital": "Yaoundé",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "CN",
//       "countryName": "China",
//       "currencyCode": "CNY",
//       "population": "1330044000",
//       "capital": "Beijing",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "CO",
//       "countryName": "Colombia",
//       "currencyCode": "COP",
//       "population": "47790000",
//       "capital": "Bogotá",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "CR",
//       "countryName": "Costa Rica",
//       "currencyCode": "CRC",
//       "population": "4516220",
//       "capital": "San José",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "CU",
//       "countryName": "Cuba",
//       "currencyCode": "CUP",
//       "population": "11423000",
//       "capital": "Havana",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "CV",
//       "countryName": "Cape Verde",
//       "currencyCode": "CVE",
//       "population": "508659",
//       "capital": "Praia",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "CW",
//       "countryName": "Curacao",
//       "currencyCode": "ANG",
//       "population": "141766",
//       "capital": "Willemstad",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "CX",
//       "countryName": "Christmas Island",
//       "currencyCode": "AUD",
//       "population": "1500",
//       "capital": "Flying Fish Cove",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "CY",
//       "countryName": "Cyprus",
//       "currencyCode": "EUR",
//       "population": "1102677",
//       "capital": "Nicosia",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "CZ",
//       "countryName": "Czechia",
//       "currencyCode": "CZK",
//       "population": "10476000",
//       "capital": "Prague",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "DE",
//       "countryName": "Germany",
//       "currencyCode": "EUR",
//       "population": "81802257",
//       "capital": "Berlin",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "DJ",
//       "countryName": "Djibouti",
//       "currencyCode": "DJF",
//       "population": "740528",
//       "capital": "Djibouti",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "DK",
//       "countryName": "Denmark",
//       "currencyCode": "DKK",
//       "population": "5484000",
//       "capital": "Copenhagen",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "DM",
//       "countryName": "Dominica",
//       "currencyCode": "XCD",
//       "population": "72813",
//       "capital": "Roseau",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "DO",
//       "countryName": "Dominican Republic",
//       "currencyCode": "DOP",
//       "population": "9823821",
//       "capital": "Santo Domingo",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "DZ",
//       "countryName": "Algeria",
//       "currencyCode": "DZD",
//       "population": "34586184",
//       "capital": "Algiers",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "EC",
//       "countryName": "Ecuador",
//       "currencyCode": "USD",
//       "population": "14790608",
//       "capital": "Quito",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "EE",
//       "countryName": "Estonia",
//       "currencyCode": "EUR",
//       "population": "1291170",
//       "capital": "Tallinn",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "EG",
//       "countryName": "Egypt",
//       "currencyCode": "EGP",
//       "population": "80471869",
//       "capital": "Cairo",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "EH",
//       "countryName": "Western Sahara",
//       "currencyCode": "MAD",
//       "population": "273008",
//       "capital": "Laâyoune / El Aaiún",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "ER",
//       "countryName": "Eritrea",
//       "currencyCode": "ERN",
//       "population": "5792984",
//       "capital": "Asmara",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "ES",
//       "countryName": "Spain",
//       "currencyCode": "EUR",
//       "population": "46505963",
//       "capital": "Madrid",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "ET",
//       "countryName": "Ethiopia",
//       "currencyCode": "ETB",
//       "population": "88013491",
//       "capital": "Addis Ababa",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "FI",
//       "countryName": "Finland",
//       "currencyCode": "EUR",
//       "population": "5244000",
//       "capital": "Helsinki",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "FJ",
//       "countryName": "Fiji",
//       "currencyCode": "FJD",
//       "population": "875983",
//       "capital": "Suva",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "FK",
//       "countryName": "Falkland Islands",
//       "currencyCode": "FKP",
//       "population": "2638",
//       "capital": "Stanley",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "FM",
//       "countryName": "Micronesia",
//       "currencyCode": "USD",
//       "population": "107708",
//       "capital": "Palikir",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "FO",
//       "countryName": "Faroe Islands",
//       "currencyCode": "DKK",
//       "population": "48228",
//       "capital": "Tórshavn",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "FR",
//       "countryName": "France",
//       "currencyCode": "EUR",
//       "population": "64768389",
//       "capital": "Paris",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "GA",
//       "countryName": "Gabon",
//       "currencyCode": "XAF",
//       "population": "1545255",
//       "capital": "Libreville",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "GB",
//       "countryName": "United Kingdom",
//       "currencyCode": "GBP",
//       "population": "62348447",
//       "capital": "London",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "GD",
//       "countryName": "Grenada",
//       "currencyCode": "XCD",
//       "population": "107818",
//       "capital": "St. George's",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "GE",
//       "countryName": "Georgia",
//       "currencyCode": "GEL",
//       "population": "4630000",
//       "capital": "Tbilisi",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "GF",
//       "countryName": "French Guiana",
//       "currencyCode": "EUR",
//       "population": "195506",
//       "capital": "Cayenne",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "GG",
//       "countryName": "Guernsey",
//       "currencyCode": "GBP",
//       "population": "65228",
//       "capital": "St Peter Port",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "GH",
//       "countryName": "Ghana",
//       "currencyCode": "GHS",
//       "population": "24339838",
//       "capital": "Accra",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "GI",
//       "countryName": "Gibraltar",
//       "currencyCode": "GIP",
//       "population": "27884",
//       "capital": "Gibraltar",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "GL",
//       "countryName": "Greenland",
//       "currencyCode": "DKK",
//       "population": "56375",
//       "capital": "Nuuk",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "GM",
//       "countryName": "Gambia",
//       "currencyCode": "GMD",
//       "population": "1593256",
//       "capital": "Bathurst",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "GN",
//       "countryName": "Guinea",
//       "currencyCode": "GNF",
//       "population": "10324025",
//       "capital": "Conakry",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "GP",
//       "countryName": "Guadeloupe",
//       "currencyCode": "EUR",
//       "population": "443000",
//       "capital": "Basse-Terre",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "GQ",
//       "countryName": "Equatorial Guinea",
//       "currencyCode": "XAF",
//       "population": "1014999",
//       "capital": "Malabo",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "GR",
//       "countryName": "Greece",
//       "currencyCode": "EUR",
//       "population": "11000000",
//       "capital": "Athens",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "GS",
//       "countryName": "South Georgia and the South Sandwich Islands",
//       "currencyCode": "GBP",
//       "population": "30",
//       "capital": "Grytviken",
//       "continentName": "Antarctica"
//   },
//   {
//       "countryCode": "GT",
//       "countryName": "Guatemala",
//       "currencyCode": "GTQ",
//       "population": "13550440",
//       "capital": "Guatemala City",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "GU",
//       "countryName": "Guam",
//       "currencyCode": "USD",
//       "population": "159358",
//       "capital": "Hagåtña",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "GW",
//       "countryName": "Guinea-Bissau",
//       "currencyCode": "XOF",
//       "population": "1565126",
//       "capital": "Bissau",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "GY",
//       "countryName": "Guyana",
//       "currencyCode": "GYD",
//       "population": "748486",
//       "capital": "Georgetown",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "HK",
//       "countryName": "Hong Kong",
//       "currencyCode": "HKD",
//       "population": "6898686",
//       "capital": "Hong Kong",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "HM",
//       "countryName": "Heard Island and McDonald Islands",
//       "currencyCode": "AUD",
//       "population": "0",
//       "capital": "",
//       "continentName": "Antarctica"
//   },
//   {
//       "countryCode": "HN",
//       "countryName": "Honduras",
//       "currencyCode": "HNL",
//       "population": "7989415",
//       "capital": "Tegucigalpa",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "HR",
//       "countryName": "Croatia",
//       "currencyCode": "HRK",
//       "population": "4284889",
//       "capital": "Zagreb",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "HT",
//       "countryName": "Haiti",
//       "currencyCode": "HTG",
//       "population": "9648924",
//       "capital": "Port-au-Prince",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "HU",
//       "countryName": "Hungary",
//       "currencyCode": "HUF",
//       "population": "9982000",
//       "capital": "Budapest",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "ID",
//       "countryName": "Indonesia",
//       "currencyCode": "IDR",
//       "population": "242968342",
//       "capital": "Jakarta",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "IE",
//       "countryName": "Ireland",
//       "currencyCode": "EUR",
//       "population": "4622917",
//       "capital": "Dublin",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "IL",
//       "countryName": "Israel",
//       "currencyCode": "ILS",
//       "population": "7353985",
//       "capital": "",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "IM",
//       "countryName": "Isle of Man",
//       "currencyCode": "GBP",
//       "population": "75049",
//       "capital": "Douglas",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "IN",
//       "countryName": "India",
//       "currencyCode": "INR",
//       "population": "1173108018",
//       "capital": "New Delhi",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "IO",
//       "countryName": "British Indian Ocean Territory",
//       "currencyCode": "USD",
//       "population": "4000",
//       "capital": "",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "IQ",
//       "countryName": "Iraq",
//       "currencyCode": "IQD",
//       "population": "29671605",
//       "capital": "Baghdad",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "IR",
//       "countryName": "Iran",
//       "currencyCode": "IRR",
//       "population": "76923300",
//       "capital": "Tehran",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "IS",
//       "countryName": "Iceland",
//       "currencyCode": "ISK",
//       "population": "308910",
//       "capital": "Reykjavik",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "IT",
//       "countryName": "Italy",
//       "currencyCode": "EUR",
//       "population": "60340328",
//       "capital": "Rome",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "JE",
//       "countryName": "Jersey",
//       "currencyCode": "GBP",
//       "population": "90812",
//       "capital": "Saint Helier",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "JM",
//       "countryName": "Jamaica",
//       "currencyCode": "JMD",
//       "population": "2847232",
//       "capital": "Kingston",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "JO",
//       "countryName": "Jordan",
//       "currencyCode": "JOD",
//       "population": "6407085",
//       "capital": "Amman",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "JP",
//       "countryName": "Japan",
//       "currencyCode": "JPY",
//       "population": "127288000",
//       "capital": "Tokyo",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "KE",
//       "countryName": "Kenya",
//       "currencyCode": "KES",
//       "population": "40046566",
//       "capital": "Nairobi",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "KG",
//       "countryName": "Kyrgyzstan",
//       "currencyCode": "KGS",
//       "population": "5776500",
//       "capital": "Bishkek",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "KH",
//       "countryName": "Cambodia",
//       "currencyCode": "KHR",
//       "population": "14453680",
//       "capital": "Phnom Penh",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "KI",
//       "countryName": "Kiribati",
//       "currencyCode": "AUD",
//       "population": "92533",
//       "capital": "Tarawa",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "KM",
//       "countryName": "Comoros",
//       "currencyCode": "KMF",
//       "population": "773407",
//       "capital": "Moroni",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "KN",
//       "countryName": "Saint Kitts and Nevis",
//       "currencyCode": "XCD",
//       "population": "51134",
//       "capital": "Basseterre",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "KP",
//       "countryName": "North Korea",
//       "currencyCode": "KPW",
//       "population": "22912177",
//       "capital": "Pyongyang",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "KR",
//       "countryName": "South Korea",
//       "currencyCode": "KRW",
//       "population": "48422644",
//       "capital": "Seoul",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "KW",
//       "countryName": "Kuwait",
//       "currencyCode": "KWD",
//       "population": "2789132",
//       "capital": "Kuwait City",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "KY",
//       "countryName": "Cayman Islands",
//       "currencyCode": "KYD",
//       "population": "44270",
//       "capital": "George Town",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "KZ",
//       "countryName": "Kazakhstan",
//       "currencyCode": "KZT",
//       "population": "15340000",
//       "capital": "Astana",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "LA",
//       "countryName": "Laos",
//       "currencyCode": "LAK",
//       "population": "6368162",
//       "capital": "Vientiane",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "LB",
//       "countryName": "Lebanon",
//       "currencyCode": "LBP",
//       "population": "4125247",
//       "capital": "Beirut",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "LC",
//       "countryName": "Saint Lucia",
//       "currencyCode": "XCD",
//       "population": "160922",
//       "capital": "Castries",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "LI",
//       "countryName": "Liechtenstein",
//       "currencyCode": "CHF",
//       "population": "35000",
//       "capital": "Vaduz",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "LK",
//       "countryName": "Sri Lanka",
//       "currencyCode": "LKR",
//       "population": "21513990",
//       "capital": "Colombo",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "LR",
//       "countryName": "Liberia",
//       "currencyCode": "LRD",
//       "population": "3685076",
//       "capital": "Monrovia",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "LS",
//       "countryName": "Lesotho",
//       "currencyCode": "LSL",
//       "population": "1919552",
//       "capital": "Maseru",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "LT",
//       "countryName": "Lithuania",
//       "currencyCode": "EUR",
//       "population": "2944459",
//       "capital": "Vilnius",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "LU",
//       "countryName": "Luxembourg",
//       "currencyCode": "EUR",
//       "population": "497538",
//       "capital": "Luxembourg",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "LV",
//       "countryName": "Latvia",
//       "currencyCode": "EUR",
//       "population": "2217969",
//       "capital": "Riga",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "LY",
//       "countryName": "Libya",
//       "currencyCode": "LYD",
//       "population": "6461454",
//       "capital": "Tripoli",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "MA",
//       "countryName": "Morocco",
//       "currencyCode": "MAD",
//       "population": "33848242",
//       "capital": "Rabat",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "MC",
//       "countryName": "Monaco",
//       "currencyCode": "EUR",
//       "population": "32965",
//       "capital": "Monaco",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "MD",
//       "countryName": "Moldova",
//       "currencyCode": "MDL",
//       "population": "4324000",
//       "capital": "Chişinău",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "ME",
//       "countryName": "Montenegro",
//       "currencyCode": "EUR",
//       "population": "666730",
//       "capital": "Podgorica",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "MF",
//       "countryName": "Saint Martin",
//       "currencyCode": "EUR",
//       "population": "35925",
//       "capital": "Marigot",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "MG",
//       "countryName": "Madagascar",
//       "currencyCode": "MGA",
//       "population": "21281844",
//       "capital": "Antananarivo",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "MH",
//       "countryName": "Marshall Islands",
//       "currencyCode": "USD",
//       "population": "65859",
//       "capital": "Majuro",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "MK",
//       "countryName": "Macedonia",
//       "currencyCode": "MKD",
//       "population": "2062294",
//       "capital": "Skopje",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "ML",
//       "countryName": "Mali",
//       "currencyCode": "XOF",
//       "population": "13796354",
//       "capital": "Bamako",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "MM",
//       "countryName": "Myanmar [Burma]",
//       "currencyCode": "MMK",
//       "population": "53414374",
//       "capital": "Naypyitaw",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "MN",
//       "countryName": "Mongolia",
//       "currencyCode": "MNT",
//       "population": "3086918",
//       "capital": "Ulan Bator",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "MO",
//       "countryName": "Macao",
//       "currencyCode": "MOP",
//       "population": "449198",
//       "capital": "Macao",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "MP",
//       "countryName": "Northern Mariana Islands",
//       "currencyCode": "USD",
//       "population": "53883",
//       "capital": "Saipan",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "MQ",
//       "countryName": "Martinique",
//       "currencyCode": "EUR",
//       "population": "432900",
//       "capital": "Fort-de-France",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "MR",
//       "countryName": "Mauritania",
//       "currencyCode": "MRO",
//       "population": "3205060",
//       "capital": "Nouakchott",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "MS",
//       "countryName": "Montserrat",
//       "currencyCode": "XCD",
//       "population": "9341",
//       "capital": "Plymouth",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "MT",
//       "countryName": "Malta",
//       "currencyCode": "EUR",
//       "population": "403000",
//       "capital": "Valletta",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "MU",
//       "countryName": "Mauritius",
//       "currencyCode": "MUR",
//       "population": "1294104",
//       "capital": "Port Louis",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "MV",
//       "countryName": "Maldives",
//       "currencyCode": "MVR",
//       "population": "395650",
//       "capital": "Malé",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "MW",
//       "countryName": "Malawi",
//       "currencyCode": "MWK",
//       "population": "15447500",
//       "capital": "Lilongwe",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "MX",
//       "countryName": "Mexico",
//       "currencyCode": "MXN",
//       "population": "112468855",
//       "capital": "Mexico City",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "MY",
//       "countryName": "Malaysia",
//       "currencyCode": "MYR",
//       "population": "28274729",
//       "capital": "Kuala Lumpur",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "MZ",
//       "countryName": "Mozambique",
//       "currencyCode": "MZN",
//       "population": "22061451",
//       "capital": "Maputo",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "NA",
//       "countryName": "Namibia",
//       "currencyCode": "NAD",
//       "population": "2128471",
//       "capital": "Windhoek",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "NC",
//       "countryName": "New Caledonia",
//       "currencyCode": "XPF",
//       "population": "216494",
//       "capital": "Noumea",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "NE",
//       "countryName": "Niger",
//       "currencyCode": "XOF",
//       "population": "15878271",
//       "capital": "Niamey",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "NF",
//       "countryName": "Norfolk Island",
//       "currencyCode": "AUD",
//       "population": "1828",
//       "capital": "Kingston",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "NG",
//       "countryName": "Nigeria",
//       "currencyCode": "NGN",
//       "population": "154000000",
//       "capital": "Abuja",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "NI",
//       "countryName": "Nicaragua",
//       "currencyCode": "NIO",
//       "population": "5995928",
//       "capital": "Managua",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "NL",
//       "countryName": "Netherlands",
//       "currencyCode": "EUR",
//       "population": "16645000",
//       "capital": "Amsterdam",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "NO",
//       "countryName": "Norway",
//       "currencyCode": "NOK",
//       "population": "5009150",
//       "capital": "Oslo",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "NP",
//       "countryName": "Nepal",
//       "currencyCode": "NPR",
//       "population": "28951852",
//       "capital": "Kathmandu",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "NR",
//       "countryName": "Nauru",
//       "currencyCode": "AUD",
//       "population": "10065",
//       "capital": "Yaren",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "NU",
//       "countryName": "Niue",
//       "currencyCode": "NZD",
//       "population": "2166",
//       "capital": "Alofi",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "NZ",
//       "countryName": "New Zealand",
//       "currencyCode": "NZD",
//       "population": "4252277",
//       "capital": "Wellington",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "OM",
//       "countryName": "Oman",
//       "currencyCode": "OMR",
//       "population": "2967717",
//       "capital": "Muscat",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "PA",
//       "countryName": "Panama",
//       "currencyCode": "PAB",
//       "population": "3410676",
//       "capital": "Panama City",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "PE",
//       "countryName": "Peru",
//       "currencyCode": "PEN",
//       "population": "29907003",
//       "capital": "Lima",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "PF",
//       "countryName": "French Polynesia",
//       "currencyCode": "XPF",
//       "population": "270485",
//       "capital": "Papeete",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "PG",
//       "countryName": "Papua New Guinea",
//       "currencyCode": "PGK",
//       "population": "6064515",
//       "capital": "Port Moresby",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "PH",
//       "countryName": "Philippines",
//       "currencyCode": "PHP",
//       "population": "99900177",
//       "capital": "Manila",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "PK",
//       "countryName": "Pakistan",
//       "currencyCode": "PKR",
//       "population": "184404791",
//       "capital": "Islamabad",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "PL",
//       "countryName": "Poland",
//       "currencyCode": "PLN",
//       "population": "38500000",
//       "capital": "Warsaw",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "PM",
//       "countryName": "Saint Pierre and Miquelon",
//       "currencyCode": "EUR",
//       "population": "7012",
//       "capital": "Saint-Pierre",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "PN",
//       "countryName": "Pitcairn Islands",
//       "currencyCode": "NZD",
//       "population": "46",
//       "capital": "Adamstown",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "PR",
//       "countryName": "Puerto Rico",
//       "currencyCode": "USD",
//       "population": "3916632",
//       "capital": "San Juan",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "PS",
//       "countryName": "Palestine",
//       "currencyCode": "ILS",
//       "population": "3800000",
//       "capital": "",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "PT",
//       "countryName": "Portugal",
//       "currencyCode": "EUR",
//       "population": "10676000",
//       "capital": "Lisbon",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "PW",
//       "countryName": "Palau",
//       "currencyCode": "USD",
//       "population": "19907",
//       "capital": "Melekeok",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "PY",
//       "countryName": "Paraguay",
//       "currencyCode": "PYG",
//       "population": "6375830",
//       "capital": "Asunción",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "QA",
//       "countryName": "Qatar",
//       "currencyCode": "QAR",
//       "population": "840926",
//       "capital": "Doha",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "RE",
//       "countryName": "Réunion",
//       "currencyCode": "EUR",
//       "population": "776948",
//       "capital": "Saint-Denis",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "RO",
//       "countryName": "Romania",
//       "currencyCode": "RON",
//       "population": "21959278",
//       "capital": "Bucharest",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "RS",
//       "countryName": "Serbia",
//       "currencyCode": "RSD",
//       "population": "7344847",
//       "capital": "Belgrade",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "RU",
//       "countryName": "Russia",
//       "currencyCode": "RUB",
//       "population": "140702000",
//       "capital": "Moscow",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "RW",
//       "countryName": "Rwanda",
//       "currencyCode": "RWF",
//       "population": "11055976",
//       "capital": "Kigali",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "SA",
//       "countryName": "Saudi Arabia",
//       "currencyCode": "SAR",
//       "population": "25731776",
//       "capital": "Riyadh",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "SB",
//       "countryName": "Solomon Islands",
//       "currencyCode": "SBD",
//       "population": "559198",
//       "capital": "Honiara",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "SC",
//       "countryName": "Seychelles",
//       "currencyCode": "SCR",
//       "population": "88340",
//       "capital": "Victoria",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "SD",
//       "countryName": "Sudan",
//       "currencyCode": "SDG",
//       "population": "35000000",
//       "capital": "Khartoum",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "SE",
//       "countryName": "Sweden",
//       "currencyCode": "SEK",
//       "population": "9828655",
//       "capital": "Stockholm",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "SG",
//       "countryName": "Singapore",
//       "currencyCode": "SGD",
//       "population": "4701069",
//       "capital": "Singapore",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "SH",
//       "countryName": "Saint Helena",
//       "currencyCode": "SHP",
//       "population": "7460",
//       "capital": "Jamestown",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "SI",
//       "countryName": "Slovenia",
//       "currencyCode": "EUR",
//       "population": "2007000",
//       "capital": "Ljubljana",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "SJ",
//       "countryName": "Svalbard and Jan Mayen",
//       "currencyCode": "NOK",
//       "population": "2550",
//       "capital": "Longyearbyen",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "SK",
//       "countryName": "Slovakia",
//       "currencyCode": "EUR",
//       "population": "5455000",
//       "capital": "Bratislava",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "SL",
//       "countryName": "Sierra Leone",
//       "currencyCode": "SLL",
//       "population": "5245695",
//       "capital": "Freetown",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "SM",
//       "countryName": "San Marino",
//       "currencyCode": "EUR",
//       "population": "31477",
//       "capital": "San Marino",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "SN",
//       "countryName": "Senegal",
//       "currencyCode": "XOF",
//       "population": "12323252",
//       "capital": "Dakar",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "SO",
//       "countryName": "Somalia",
//       "currencyCode": "SOS",
//       "population": "10112453",
//       "capital": "Mogadishu",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "SR",
//       "countryName": "Suriname",
//       "currencyCode": "SRD",
//       "population": "492829",
//       "capital": "Paramaribo",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "SS",
//       "countryName": "South Sudan",
//       "currencyCode": "SSP",
//       "population": "8260490",
//       "capital": "Juba",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "ST",
//       "countryName": "São Tomé and Príncipe",
//       "currencyCode": "STD",
//       "population": "175808",
//       "capital": "São Tomé",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "SV",
//       "countryName": "El Salvador",
//       "currencyCode": "USD",
//       "population": "6052064",
//       "capital": "San Salvador",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "SX",
//       "countryName": "Sint Maarten",
//       "currencyCode": "ANG",
//       "population": "37429",
//       "capital": "Philipsburg",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "SY",
//       "countryName": "Syria",
//       "currencyCode": "SYP",
//       "population": "22198110",
//       "capital": "Damascus",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "SZ",
//       "countryName": "Swaziland",
//       "currencyCode": "SZL",
//       "population": "1354051",
//       "capital": "Mbabane",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "TC",
//       "countryName": "Turks and Caicos Islands",
//       "currencyCode": "USD",
//       "population": "20556",
//       "capital": "Cockburn Town",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "TD",
//       "countryName": "Chad",
//       "currencyCode": "XAF",
//       "population": "10543464",
//       "capital": "N'Djamena",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "TF",
//       "countryName": "French Southern Territories",
//       "currencyCode": "EUR",
//       "population": "140",
//       "capital": "Port-aux-Français",
//       "continentName": "Antarctica"
//   },
//   {
//       "countryCode": "TG",
//       "countryName": "Togo",
//       "currencyCode": "XOF",
//       "population": "6587239",
//       "capital": "Lomé",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "TH",
//       "countryName": "Thailand",
//       "currencyCode": "THB",
//       "population": "67089500",
//       "capital": "Bangkok",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "TJ",
//       "countryName": "Tajikistan",
//       "currencyCode": "TJS",
//       "population": "7487489",
//       "capital": "Dushanbe",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "TK",
//       "countryName": "Tokelau",
//       "currencyCode": "NZD",
//       "population": "1466",
//       "capital": "",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "TL",
//       "countryName": "East Timor",
//       "currencyCode": "USD",
//       "population": "1154625",
//       "capital": "Dili",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "TM",
//       "countryName": "Turkmenistan",
//       "currencyCode": "TMT",
//       "population": "4940916",
//       "capital": "Ashgabat",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "TN",
//       "countryName": "Tunisia",
//       "currencyCode": "TND",
//       "population": "10589025",
//       "capital": "Tunis",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "TO",
//       "countryName": "Tonga",
//       "currencyCode": "TOP",
//       "population": "122580",
//       "capital": "Nuku'alofa",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "TR",
//       "countryName": "Turkey",
//       "currencyCode": "TRY",
//       "population": "77804122",
//       "capital": "Ankara",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "TT",
//       "countryName": "Trinidad and Tobago",
//       "currencyCode": "TTD",
//       "population": "1228691",
//       "capital": "Port of Spain",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "TV",
//       "countryName": "Tuvalu",
//       "currencyCode": "AUD",
//       "population": "10472",
//       "capital": "Funafuti",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "TW",
//       "countryName": "Taiwan",
//       "currencyCode": "TWD",
//       "population": "22894384",
//       "capital": "Taipei",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "TZ",
//       "countryName": "Tanzania",
//       "currencyCode": "TZS",
//       "population": "41892895",
//       "capital": "Dodoma",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "UA",
//       "countryName": "Ukraine",
//       "currencyCode": "UAH",
//       "population": "45415596",
//       "capital": "Kiev",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "UG",
//       "countryName": "Uganda",
//       "currencyCode": "UGX",
//       "population": "33398682",
//       "capital": "Kampala",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "UM",
//       "countryName": "U.S. Minor Outlying Islands",
//       "currencyCode": "USD",
//       "population": "0",
//       "capital": "",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "US",
//       "countryName": "United States",
//       "currencyCode": "USD",
//       "population": "310232863",
//       "capital": "Washington",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "UY",
//       "countryName": "Uruguay",
//       "currencyCode": "UYU",
//       "population": "3477000",
//       "capital": "Montevideo",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "UZ",
//       "countryName": "Uzbekistan",
//       "currencyCode": "UZS",
//       "population": "27865738",
//       "capital": "Tashkent",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "VA",
//       "countryName": "Vatican City",
//       "currencyCode": "EUR",
//       "population": "921",
//       "capital": "Vatican City",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "VC",
//       "countryName": "Saint Vincent and the Grenadines",
//       "currencyCode": "XCD",
//       "population": "104217",
//       "capital": "Kingstown",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "VE",
//       "countryName": "Venezuela",
//       "currencyCode": "VEF",
//       "population": "27223228",
//       "capital": "Caracas",
//       "continentName": "South America"
//   },
//   {
//       "countryCode": "VG",
//       "countryName": "British Virgin Islands",
//       "currencyCode": "USD",
//       "population": "21730",
//       "capital": "Road Town",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "VI",
//       "countryName": "U.S. Virgin Islands",
//       "currencyCode": "USD",
//       "population": "108708",
//       "capital": "Charlotte Amalie",
//       "continentName": "North America"
//   },
//   {
//       "countryCode": "VN",
//       "countryName": "Vietnam",
//       "currencyCode": "VND",
//       "population": "89571130",
//       "capital": "Hanoi",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "VU",
//       "countryName": "Vanuatu",
//       "currencyCode": "VUV",
//       "population": "221552",
//       "capital": "Port Vila",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "WF",
//       "countryName": "Wallis and Futuna",
//       "currencyCode": "XPF",
//       "population": "16025",
//       "capital": "Mata-Utu",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "WS",
//       "countryName": "Samoa",
//       "currencyCode": "WST",
//       "population": "192001",
//       "capital": "Apia",
//       "continentName": "Oceania"
//   },
//   {
//       "countryCode": "XK",
//       "countryName": "Kosovo",
//       "currencyCode": "EUR",
//       "population": "1800000",
//       "capital": "Pristina",
//       "continentName": "Europe"
//   },
//   {
//       "countryCode": "YE",
//       "countryName": "Yemen",
//       "currencyCode": "YER",
//       "population": "23495361",
//       "capital": "Sanaa",
//       "continentName": "Asia"
//   },
//   {
//       "countryCode": "YT",
//       "countryName": "Mayotte",
//       "currencyCode": "EUR",
//       "population": "159042",
//       "capital": "Mamoudzou",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "ZA",
//       "countryName": "South Africa",
//       "currencyCode": "ZAR",
//       "population": "49000000",
//       "capital": "Pretoria",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "ZM",
//       "countryName": "Zambia",
//       "currencyCode": "ZMW",
//       "population": "13460305",
//       "capital": "Lusaka",
//       "continentName": "Africa"
//   },
//   {
//       "countryCode": "ZW",
//       "countryName": "Zimbabwe",
//       "currencyCode": "ZWL",
//       "population": "13061000",
//       "capital": "Harare",
//       "continentName": "Africa"
//   }
// ]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('countries', 'currency_code', {
      allowNull: true,
      type: Sequelize.STRING,
    });


  },

  down: async (queryInterface, Sequelize) => {

  },
};
