'use strict';
let insertArr = [
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "United Arab Emirates Dirham",
		"symbol" : "AED",
		"abbreviation" : "AED"
	},
	{
		"name" : "Afghan Afghani",
		"symbol" : "AFN",
		"abbreviation" : "AFN"
	},
	{
		"name" : "East Caribbean Dollar",
		"symbol" : "$",
		"abbreviation" : "XCD"
	},
	{
		"name" : "East Caribbean Dollar",
		"symbol" : "$",
		"abbreviation" : "XCD"
	},
	{
		"name" : "Albanian Lek",
		"symbol" : "ALL",
		"abbreviation" : "ALL"
	},
	{
		"name" : "Armenian Dram",
		"symbol" : "AMD",
		"abbreviation" : "AMD"
	},
	{
		"name" : "Angolan Kwanza",
		"symbol" : "Kz",
		"abbreviation" : "AOA"
	},
	{
		"name" : "Argentine Peso",
		"symbol" : "$",
		"abbreviation" : "ARS"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Australian Dollar",
		"symbol" : "$",
		"abbreviation" : "AUD"
	},
	{
		"name" : "Aruban Florin",
		"symbol" : "AWG",
		"abbreviation" : "AWG"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Azerbaijani Manat",
		"symbol" : "AZN",
		"abbreviation" : "AZN"
	},
	{
		"name" : "Bosnia-Herzegovina Convertible Mark",
		"symbol" : "KM",
		"abbreviation" : "BAM"
	},
	{
		"name" : "Barbadian Dollar",
		"symbol" : "$",
		"abbreviation" : "BBD"
	},
	{
		"name" : "Bangladeshi Taka",
		"symbol" : "৳",
		"abbreviation" : "BDT"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "CFA Franc BCEAO",
		"symbol" : "XOF",
		"abbreviation" : "XOF"
	},
	{
		"name" : "Bulgarian Lev",
		"symbol" : "BGN",
		"abbreviation" : "BGN"
	},
	{
		"name" : "Bahraini Dinar",
		"symbol" : "BHD",
		"abbreviation" : "BHD"
	},
	{
		"name" : "Burundian Franc",
		"symbol" : "BIF",
		"abbreviation" : "BIF"
	},
	{
		"name" : "CFA Franc BCEAO",
		"symbol" : "XOF",
		"abbreviation" : "XOF"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Bermudan Dollar",
		"symbol" : "$",
		"abbreviation" : "BMD"
	},
	{
		"name" : "Brunei Dollar",
		"symbol" : "$",
		"abbreviation" : "BND"
	},
	{
		"name" : "Bolivian Boliviano",
		"symbol" : "Bs",
		"abbreviation" : "BOB"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Brazilian Real",
		"symbol" : "R$",
		"abbreviation" : "BRL"
	},
	{
		"name" : "Bahamian Dollar",
		"symbol" : "$",
		"abbreviation" : "BSD"
	},
	{
		"name" : "Bhutanese Ngultrum",
		"symbol" : "BTN",
		"abbreviation" : "BTN"
	},
	{
		"name" : "Norwegian Krone",
		"symbol" : "kr",
		"abbreviation" : "NOK"
	},
	{
		"name" : "Botswanan Pula",
		"symbol" : "P",
		"abbreviation" : "BWP"
	},
	{
		"name" : "Belarusian Ruble",
		"symbol" : "р.",
		"abbreviation" : "BYR"
	},
	{
		"name" : "Belize Dollar",
		"symbol" : "$",
		"abbreviation" : "BZD"
	},
	{
		"name" : "Canadian Dollar",
		"symbol" : "$",
		"abbreviation" : "CAD"
	},
	{
		"name" : "Australian Dollar",
		"symbol" : "$",
		"abbreviation" : "AUD"
	},
	{
		"name" : "Congolese Franc",
		"symbol" : "CDF",
		"abbreviation" : "CDF"
	},
	{
		"name" : "CFA Franc BEAC",
		"symbol" : "XAF",
		"abbreviation" : "XAF"
	},
	{
		"name" : "CFA Franc BEAC",
		"symbol" : "XAF",
		"abbreviation" : "XAF"
	},
	{
		"name" : "Swiss Franc",
		"symbol" : "CHF",
		"abbreviation" : "CHF"
	},
	{
		"name" : "CFA Franc BCEAO",
		"symbol" : "XOF",
		"abbreviation" : "XOF"
	},
	{
		"name" : "New Zealand Dollar",
		"symbol" : "$",
		"abbreviation" : "NZD"
	},
	{
		"name" : "Chilean Peso",
		"symbol" : "$",
		"abbreviation" : "CLP"
	},
	{
		"name" : "CFA Franc BEAC",
		"symbol" : "XAF",
		"abbreviation" : "XAF"
	},
	{
		"name" : "Chinese Yuan",
		"symbol" : "¥",
		"abbreviation" : "CNY"
	},
	{
		"name" : "Colombian Peso",
		"symbol" : "$",
		"abbreviation" : "COP"
	},
	{
		"name" : "Costa Rican Colón",
		"symbol" : "₡",
		"abbreviation" : "CRC"
	},
	{
		"name" : "Cuban Peso",
		"symbol" : "$",
		"abbreviation" : "CUP"
	},
	{
		"name" : "Cape Verdean Escudo",
		"symbol" : "CVE",
		"abbreviation" : "CVE"
	},
	{
		"name" : "Netherlands Antillean Guilder",
		"symbol" : "ANG",
		"abbreviation" : "ANG"
	},
	{
		"name" : "Australian Dollar",
		"symbol" : "$",
		"abbreviation" : "AUD"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Czech Republic Koruna",
		"symbol" : "Kč",
		"abbreviation" : "CZK"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Djiboutian Franc",
		"symbol" : "DJF",
		"abbreviation" : "DJF"
	},
	{
		"name" : "Danish Krone",
		"symbol" : "kr",
		"abbreviation" : "DKK"
	},
	{
		"name" : "East Caribbean Dollar",
		"symbol" : "$",
		"abbreviation" : "XCD"
	},
	{
		"name" : "Dominican Peso",
		"symbol" : "$",
		"abbreviation" : "DOP"
	},
	{
		"name" : "Algerian Dinar",
		"symbol" : "DZD",
		"abbreviation" : "DZD"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Egyptian Pound",
		"symbol" : "E£",
		"abbreviation" : "EGP"
	},
	{
		"name" : "Moroccan Dirham",
		"symbol" : "MAD",
		"abbreviation" : "MAD"
	},
	{
		"name" : "Eritrean Nakfa",
		"symbol" : "ERN",
		"abbreviation" : "ERN"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Ethiopian Birr",
		"symbol" : "ETB",
		"abbreviation" : "ETB"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Fijian Dollar",
		"symbol" : "$",
		"abbreviation" : "FJD"
	},
	{
		"name" : "Falkland Islands Pound",
		"symbol" : "£",
		"abbreviation" : "FKP"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Danish Krone",
		"symbol" : "kr",
		"abbreviation" : "DKK"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "CFA Franc BEAC",
		"symbol" : "XAF",
		"abbreviation" : "XAF"
	},
	{
		"name" : "British Pound Sterling",
		"symbol" : "£",
		"abbreviation" : "GBP"
	},
	{
		"name" : "East Caribbean Dollar",
		"symbol" : "$",
		"abbreviation" : "XCD"
	},
	{
		"name" : "Georgian Lari",
		"symbol" : "GEL",
		"abbreviation" : "GEL"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "British Pound Sterling",
		"symbol" : "£",
		"abbreviation" : "GBP"
	},
	{
		"name" : "Ghanaian Cedi",
		"symbol" : "GHS",
		"abbreviation" : "GHS"
	},
	{
		"name" : "Gibraltar Pound",
		"symbol" : "£",
		"abbreviation" : "GIP"
	},
	{
		"name" : "Danish Krone",
		"symbol" : "kr",
		"abbreviation" : "DKK"
	},
	{
		"name" : "Gambian Dalasi",
		"symbol" : "GMD",
		"abbreviation" : "GMD"
	},
	{
		"name" : "Guinean Franc",
		"symbol" : "FG",
		"abbreviation" : "GNF"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "CFA Franc BEAC",
		"symbol" : "XAF",
		"abbreviation" : "XAF"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "British Pound Sterling",
		"symbol" : "£",
		"abbreviation" : "GBP"
	},
	{
		"name" : "Guatemalan Quetzal",
		"symbol" : "Q",
		"abbreviation" : "GTQ"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "CFA Franc BCEAO",
		"symbol" : "XOF",
		"abbreviation" : "XOF"
	},
	{
		"name" : "Guyanaese Dollar",
		"symbol" : "$",
		"abbreviation" : "GYD"
	},
	{
		"name" : "Hong Kong Dollar",
		"symbol" : "$",
		"abbreviation" : "HKD"
	},
	{
		"name" : "Australian Dollar",
		"symbol" : "$",
		"abbreviation" : "AUD"
	},
	{
		"name" : "Honduran Lempira",
		"symbol" : "L",
		"abbreviation" : "HNL"
	},
	{
		"name" : "Croatian Kuna",
		"symbol" : "kn",
		"abbreviation" : "HRK"
	},
	{
		"name" : "Haitian Gourde",
		"symbol" : "HTG",
		"abbreviation" : "HTG"
	},
	{
		"name" : "Hungarian Forint",
		"symbol" : "Ft",
		"abbreviation" : "HUF"
	},
	{
		"name" : "Indonesian Rupiah",
		"symbol" : "Rp",
		"abbreviation" : "IDR"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Israeli New Sheqel",
		"symbol" : "₪",
		"abbreviation" : "ILS"
	},
	{
		"name" : "British Pound Sterling",
		"symbol" : "£",
		"abbreviation" : "GBP"
	},
	{
		"name" : "Indian Rupee",
		"symbol" : "₹",
		"abbreviation" : "INR"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Iraqi Dinar",
		"symbol" : "IQD",
		"abbreviation" : "IQD"
	},
	{
		"name" : "Iranian Rial",
		"symbol" : "IRR",
		"abbreviation" : "IRR"
	},
	{
		"name" : "Icelandic Króna",
		"symbol" : "kr",
		"abbreviation" : "ISK"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "British Pound Sterling",
		"symbol" : "£",
		"abbreviation" : "GBP"
	},
	{
		"name" : "Jamaican Dollar",
		"symbol" : "$",
		"abbreviation" : "JMD"
	},
	{
		"name" : "Jordanian Dinar",
		"symbol" : "JOD",
		"abbreviation" : "JOD"
	},
	{
		"name" : "Japanese Yen",
		"symbol" : "¥",
		"abbreviation" : "JPY"
	},
	{
		"name" : "Kenyan Shilling",
		"symbol" : "KES",
		"abbreviation" : "KES"
	},
	{
		"name" : "Kyrgystani Som",
		"symbol" : "KGS",
		"abbreviation" : "KGS"
	},
	{
		"name" : "Cambodian Riel",
		"symbol" : "៛",
		"abbreviation" : "KHR"
	},
	{
		"name" : "Australian Dollar",
		"symbol" : "$",
		"abbreviation" : "AUD"
	},
	{
		"name" : "Comorian Franc",
		"symbol" : "CF",
		"abbreviation" : "KMF"
	},
	{
		"name" : "East Caribbean Dollar",
		"symbol" : "$",
		"abbreviation" : "XCD"
	},
	{
		"name" : "North Korean Won",
		"symbol" : "₩",
		"abbreviation" : "KPW"
	},
	{
		"name" : "South Korean Won",
		"symbol" : "₩",
		"abbreviation" : "KRW"
	},
	{
		"name" : "Kuwaiti Dinar",
		"symbol" : "KWD",
		"abbreviation" : "KWD"
	},
	{
		"name" : "Cayman Islands Dollar",
		"symbol" : "$",
		"abbreviation" : "KYD"
	},
	{
		"name" : "Kazakhstani Tenge",
		"symbol" : "₸",
		"abbreviation" : "KZT"
	},
	{
		"name" : "Laotian Kip",
		"symbol" : "₭",
		"abbreviation" : "LAK"
	},
	{
		"name" : "Lebanese Pound",
		"symbol" : "L£",
		"abbreviation" : "LBP"
	},
	{
		"name" : "East Caribbean Dollar",
		"symbol" : "$",
		"abbreviation" : "XCD"
	},
	{
		"name" : "Swiss Franc",
		"symbol" : "CHF",
		"abbreviation" : "CHF"
	},
	{
		"name" : "Sri Lankan Rupee",
		"symbol" : "Rs",
		"abbreviation" : "LKR"
	},
	{
		"name" : "Liberian Dollar",
		"symbol" : "$",
		"abbreviation" : "LRD"
	},
	{
		"name" : "Lesotho Loti",
		"symbol" : "LSL",
		"abbreviation" : "LSL"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Libyan Dinar",
		"symbol" : "LYD",
		"abbreviation" : "LYD"
	},
	{
		"name" : "Moroccan Dirham",
		"symbol" : "MAD",
		"abbreviation" : "MAD"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Moldovan Leu",
		"symbol" : "MDL",
		"abbreviation" : "MDL"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Malagasy Ariary",
		"symbol" : "Ar",
		"abbreviation" : "MGA"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Macedonian Denar",
		"symbol" : "MKD",
		"abbreviation" : "MKD"
	},
	{
		"name" : "CFA Franc BCEAO",
		"symbol" : "XOF",
		"abbreviation" : "XOF"
	},
	{
		"name" : "Myanmar Kyat",
		"symbol" : "K",
		"abbreviation" : "MMK"
	},
	{
		"name" : "Mongolian Tugrik",
		"symbol" : "₮",
		"abbreviation" : "MNT"
	},
	{
		"name" : "Macanese Pataca",
		"symbol" : "MOP",
		"abbreviation" : "MOP"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Mauritanian Ouguiya",
		"symbol" : "MRO",
		"abbreviation" : "MRO"
	},
	{
		"name" : "East Caribbean Dollar",
		"symbol" : "$",
		"abbreviation" : "XCD"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Mauritian Rupee",
		"symbol" : "Rs",
		"abbreviation" : "MUR"
	},
	{
		"name" : "Maldivian Rufiyaa",
		"symbol" : "MVR",
		"abbreviation" : "MVR"
	},
	{
		"name" : "Malawian Kwacha",
		"symbol" : "MWK",
		"abbreviation" : "MWK"
	},
	{
		"name" : "Mexican Peso",
		"symbol" : "$",
		"abbreviation" : "MXN"
	},
	{
		"name" : "Malaysian Ringgit",
		"symbol" : "RM",
		"abbreviation" : "MYR"
	},
	{
		"name" : "Mozambican Metical",
		"symbol" : "MZN",
		"abbreviation" : "MZN"
	},
	{
		"name" : "Namibian Dollar",
		"symbol" : "$",
		"abbreviation" : "NAD"
	},
	{
		"name" : "CFP Franc",
		"symbol" : "XPF",
		"abbreviation" : "XPF"
	},
	{
		"name" : "CFA Franc BCEAO",
		"symbol" : "XOF",
		"abbreviation" : "XOF"
	},
	{
		"name" : "Australian Dollar",
		"symbol" : "$",
		"abbreviation" : "AUD"
	},
	{
		"name" : "Nigerian Naira",
		"symbol" : "₦",
		"abbreviation" : "NGN"
	},
	{
		"name" : "Nicaraguan Córdoba",
		"symbol" : "C$",
		"abbreviation" : "NIO"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Norwegian Krone",
		"symbol" : "kr",
		"abbreviation" : "NOK"
	},
	{
		"name" : "Nepalese Rupee",
		"symbol" : "Rs",
		"abbreviation" : "NPR"
	},
	{
		"name" : "Australian Dollar",
		"symbol" : "$",
		"abbreviation" : "AUD"
	},
	{
		"name" : "New Zealand Dollar",
		"symbol" : "$",
		"abbreviation" : "NZD"
	},
	{
		"name" : "New Zealand Dollar",
		"symbol" : "$",
		"abbreviation" : "NZD"
	},
	{
		"name" : "Omani Rial",
		"symbol" : "OMR",
		"abbreviation" : "OMR"
	},
	{
		"name" : "Panamanian Balboa",
		"symbol" : "PAB",
		"abbreviation" : "PAB"
	},
	{
		"name" : "Peruvian Nuevo Sol",
		"symbol" : "PEN",
		"abbreviation" : "PEN"
	},
	{
		"name" : "CFP Franc",
		"symbol" : "XPF",
		"abbreviation" : "XPF"
	},
	{
		"name" : "Papua New Guinean Kina",
		"symbol" : "PGK",
		"abbreviation" : "PGK"
	},
	{
		"name" : "Philippine Peso",
		"symbol" : "₱",
		"abbreviation" : "PHP"
	},
	{
		"name" : "Pakistani Rupee",
		"symbol" : "Rs",
		"abbreviation" : "PKR"
	},
	{
		"name" : "Polish Zloty",
		"symbol" : "zł",
		"abbreviation" : "PLN"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "New Zealand Dollar",
		"symbol" : "$",
		"abbreviation" : "NZD"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Israeli New Sheqel",
		"symbol" : "₪",
		"abbreviation" : "ILS"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Paraguayan Guarani",
		"symbol" : "₲",
		"abbreviation" : "PYG"
	},
	{
		"name" : "Qatari Rial",
		"symbol" : "QAR",
		"abbreviation" : "QAR"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Romanian Leu",
		"symbol" : "RON",
		"abbreviation" : "RON"
	},
	{
		"name" : "Serbian Dinar",
		"symbol" : "RSD",
		"abbreviation" : "RSD"
	},
	{
		"name" : "Russian Ruble",
		"symbol" : "RUB",
		"abbreviation" : "RUB"
	},
	{
		"name" : "Rwandan Franc",
		"symbol" : "RF",
		"abbreviation" : "RWF"
	},
	{
		"name" : "Saudi Riyal",
		"symbol" : "SAR",
		"abbreviation" : "SAR"
	},
	{
		"name" : "Solomon Islands Dollar",
		"symbol" : "$",
		"abbreviation" : "SBD"
	},
	{
		"name" : "Seychellois Rupee",
		"symbol" : "SCR",
		"abbreviation" : "SCR"
	},
	{
		"name" : "Sudanese Pound",
		"symbol" : "SDG",
		"abbreviation" : "SDG"
	},
	{
		"name" : "Swedish Krona",
		"symbol" : "kr",
		"abbreviation" : "SEK"
	},
	{
		"name" : "Singapore Dollar",
		"symbol" : "$",
		"abbreviation" : "SGD"
	},
	{
		"name" : "St. Helena Pound",
		"symbol" : "£",
		"abbreviation" : "SHP"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Norwegian Krone",
		"symbol" : "kr",
		"abbreviation" : "NOK"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Sierra Leonean Leone",
		"symbol" : "SLL",
		"abbreviation" : "SLL"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "CFA Franc BCEAO",
		"symbol" : "XOF",
		"abbreviation" : "XOF"
	},
	{
		"name" : "Somali Shilling",
		"symbol" : "SOS",
		"abbreviation" : "SOS"
	},
	{
		"name" : "Surinamese Dollar",
		"symbol" : "$",
		"abbreviation" : "SRD"
	},
	{
		"name" : "South Sudanese Pound",
		"symbol" : "£",
		"abbreviation" : "SSP"
	},
	{
		"name" : "São Tomé & Príncipe Dobra",
		"symbol" : "Db",
		"abbreviation" : "STD"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Netherlands Antillean Guilder",
		"symbol" : "ANG",
		"abbreviation" : "ANG"
	},
	{
		"name" : "Syrian Pound",
		"symbol" : "£",
		"abbreviation" : "SYP"
	},
	{
		"name" : "Swazi Lilangeni",
		"symbol" : "SZL",
		"abbreviation" : "SZL"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "CFA Franc BEAC",
		"symbol" : "XAF",
		"abbreviation" : "XAF"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "CFA Franc BCEAO",
		"symbol" : "XOF",
		"abbreviation" : "XOF"
	},
	{
		"name" : "Thai Baht",
		"symbol" : "฿",
		"abbreviation" : "THB"
	},
	{
		"name" : "Tajikistani Somoni",
		"symbol" : "TJS",
		"abbreviation" : "TJS"
	},
	{
		"name" : "New Zealand Dollar",
		"symbol" : "$",
		"abbreviation" : "NZD"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Turkmenistani Manat",
		"symbol" : "TMT",
		"abbreviation" : "TMT"
	},
	{
		"name" : "Tunisian Dinar",
		"symbol" : "TND",
		"abbreviation" : "TND"
	},
	{
		"name" : "Tongan Paʻanga",
		"symbol" : "T$",
		"abbreviation" : "TOP"
	},
	{
		"name" : "Turkish Lira",
		"symbol" : "₺",
		"abbreviation" : "TRY"
	},
	{
		"name" : "Trinidad & Tobago Dollar",
		"symbol" : "$",
		"abbreviation" : "TTD"
	},
	{
		"name" : "Australian Dollar",
		"symbol" : "$",
		"abbreviation" : "AUD"
	},
	{
		"name" : "New Taiwan Dollar",
		"symbol" : "NT$",
		"abbreviation" : "TWD"
	},
	{
		"name" : "Tanzanian Shilling",
		"symbol" : "TZS",
		"abbreviation" : "TZS"
	},
	{
		"name" : "Ukrainian Hryvnia",
		"symbol" : "₴",
		"abbreviation" : "UAH"
	},
	{
		"name" : "Ugandan Shilling",
		"symbol" : "UGX",
		"abbreviation" : "UGX"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Uruguayan Peso",
		"symbol" : "$",
		"abbreviation" : "UYU"
	},
	{
		"name" : "Uzbekistan Som",
		"symbol" : "UZS",
		"abbreviation" : "UZS"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "East Caribbean Dollar",
		"symbol" : "$",
		"abbreviation" : "XCD"
	},
	{
		"name" : "Venezuelan Bolívar",
		"symbol" : "Bs",
		"abbreviation" : "VEF"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "US Dollar",
		"symbol" : "$",
		"abbreviation" : "USD"
	},
	{
		"name" : "Vietnamese Dong",
		"symbol" : "₫",
		"abbreviation" : "VND"
	},
	{
		"name" : "Vanuatu Vatu",
		"symbol" : "VUV",
		"abbreviation" : "VUV"
	},
	{
		"name" : "CFP Franc",
		"symbol" : "XPF",
		"abbreviation" : "XPF"
	},
	{
		"name" : "Samoan Tala",
		"symbol" : "WST",
		"abbreviation" : "WST"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "Yemeni Rial",
		"symbol" : "YER",
		"abbreviation" : "YER"
	},
	{
		"name" : "Euro",
		"symbol" : "€",
		"abbreviation" : "EUR"
	},
	{
		"name" : "South African Rand",
		"symbol" : "R",
		"abbreviation" : "ZAR"
	},
	{
		"name" : "Zambian Kwacha",
		"symbol" : "ZK",
		"abbreviation" : "ZMW"
	},
	{
		"name" : "Zimbabwean Dollar (2009)",
		"symbol" : "ZWL",
		"abbreviation" : "ZWL"
	}
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Currencies', insertArr);

  },

  down: async (queryInterface, Sequelize) => {

  },
};
