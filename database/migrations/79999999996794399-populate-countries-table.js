'use strict';
let insertArr = [{
  name: 'Andorra',
  iso2: 'AD',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'United Arab Emirates',
  iso2: 'AE',
  currency: 'United Arab Emirates Dirham',
  currency_symbol: 'AED',
  currency_code: 'AED'
},
{
  name: 'Afghanistan',
  iso2: 'AF',
  currency: 'Afghan Afghani',
  currency_symbol: 'AFN',
  currency_code: 'AFN'
},
{
  name: 'Antigua and Barbuda',
  iso2: 'AG',
  currency: 'East Caribbean Dollar',
  currency_symbol: '$',
  currency_code: 'XCD'
},
{
  name: 'Anguilla',
  iso2: 'AI',
  currency: 'East Caribbean Dollar',
  currency_symbol: '$',
  currency_code: 'XCD'
},
{
  name: 'Albania',
  iso2: 'AL',
  currency: 'Albanian Lek',
  currency_symbol: 'ALL',
  currency_code: 'ALL'
},
{
  name: 'Armenia',
  iso2: 'AM',
  currency: 'Armenian Dram',
  currency_symbol: 'AMD',
  currency_code: 'AMD'
},
{
  name: 'Angola',
  iso2: 'AO',
  currency: 'Angolan Kwanza',
  currency_symbol: 'Kz',
  currency_code: 'AOA'
},
{
  name: 'Argentina',
  iso2: 'AR',
  currency: 'Argentine Peso',
  currency_symbol: '$',
  currency_code: 'ARS'
},
{
  name: 'American Samoa',
  iso2: 'AS',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Austria',
  iso2: 'AT',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Australia',
  iso2: 'AU',
  currency: 'Australian Dollar',
  currency_symbol: '$',
  currency_code: 'AUD'
},
{
  name: 'Aruba',
  iso2: 'AW',
  currency: 'Aruban Florin',
  currency_symbol: 'AWG',
  currency_code: 'AWG'
},
{
  name: 'Åland',
  iso2: 'AX',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Azerbaijan',
  iso2: 'AZ',
  currency: 'Azerbaijani Manat',
  currency_symbol: 'AZN',
  currency_code: 'AZN'
},
{
  name: 'Bosnia and Herzegovina',
  iso2: 'BA',
  currency: 'Bosnia-Herzegovina Convertible Mark',
  currency_symbol: 'KM',
  currency_code: 'BAM'
},
{
  name: 'Barbados',
  iso2: 'BB',
  currency: 'Barbadian Dollar',
  currency_symbol: '$',
  currency_code: 'BBD'
},
{
  name: 'Bangladesh',
  iso2: 'BD',
  currency: 'Bangladeshi Taka',
  currency_symbol: '৳',
  currency_code: 'BDT'
},
{
  name: 'Belgium',
  iso2: 'BE',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Burkina Faso',
  iso2: 'BF',
  currency: 'CFA Franc BCEAO',
  currency_symbol: 'XOF',
  currency_code: 'XOF'
},
{
  name: 'Bulgaria',
  iso2: 'BG',
  currency: 'Bulgarian Lev',
  currency_symbol: 'BGN',
  currency_code: 'BGN'
},
{
  name: 'Bahrain',
  iso2: 'BH',
  currency: 'Bahraini Dinar',
  currency_symbol: 'BHD',
  currency_code: 'BHD'
},
{
  name: 'Burundi',
  iso2: 'BI',
  currency: 'Burundian Franc',
  currency_symbol: 'BIF',
  currency_code: 'BIF'
},
{
  name: 'Benin',
  iso2: 'BJ',
  currency: 'CFA Franc BCEAO',
  currency_symbol: 'XOF',
  currency_code: 'XOF'
},
{
  name: 'Saint Barthélemy',
  iso2: 'BL',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Bermuda',
  iso2: 'BM',
  currency: 'Bermudan Dollar',
  currency_symbol: '$',
  currency_code: 'BMD'
},
{
  name: 'Brunei',
  iso2: 'BN',
  currency: 'Brunei Dollar',
  currency_symbol: '$',
  currency_code: 'BND'
},
{
  name: 'Bolivia',
  iso2: 'BO',
  currency: 'Bolivian Boliviano',
  currency_symbol: 'Bs',
  currency_code: 'BOB'
},
{
  name: 'Bonaire',
  iso2: 'BQ',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Brazil',
  iso2: 'BR',
  currency: 'Brazilian Real',
  currency_symbol: 'R$',
  currency_code: 'BRL'
},
{
  name: 'Bahamas',
  iso2: 'BS',
  currency: 'Bahamian Dollar',
  currency_symbol: '$',
  currency_code: 'BSD'
},
{
  name: 'Bhutan',
  iso2: 'BT',
  currency: 'Bhutanese Ngultrum',
  currency_symbol: 'BTN',
  currency_code: 'BTN'
},
{
  name: 'Bouvet Island',
  iso2: 'BV',
  currency: 'Norwegian Krone',
  currency_symbol: 'kr',
  currency_code: 'NOK'
},
{
  name: 'Botswana',
  iso2: 'BW',
  currency: 'Botswanan Pula',
  currency_symbol: 'P',
  currency_code: 'BWP'
},
{
  name: 'Belarus',
  iso2: 'BY',
  currency: 'Belarusian Ruble',
  currency_symbol: 'р.',
  currency_code: 'BYR'
},
{
  name: 'Belize',
  iso2: 'BZ',
  currency: 'Belize Dollar',
  currency_symbol: '$',
  currency_code: 'BZD'
},
{
  name: 'Canada',
  iso2: 'CA',
  currency: 'Canadian Dollar',
  currency_symbol: '$',
  currency_code: 'CAD'
},
{
  name: 'Cocos [Keeling] Islands',
  iso2: 'CC',
  currency: 'Australian Dollar',
  currency_symbol: '$',
  currency_code: 'AUD'
},
{
  name: 'Democratic Republic of the Congo',
  iso2: 'CD',
  currency: 'Congolese Franc',
  currency_symbol: 'CDF',
  currency_code: 'CDF'
},
{
  name: 'Central African Republic',
  iso2: 'CF',
  currency: 'CFA Franc BEAC',
  currency_symbol: 'XAF',
  currency_code: 'XAF'
},
{
  name: 'Republic of the Congo',
  iso2: 'CG',
  currency: 'CFA Franc BEAC',
  currency_symbol: 'XAF',
  currency_code: 'XAF'
},
{
  name: 'Switzerland',
  iso2: 'CH',
  currency: 'Swiss Franc',
  currency_symbol: 'CHF',
  currency_code: 'CHF'
},
{
  name: 'Ivory Coast',
  iso2: 'CI',
  currency: 'CFA Franc BCEAO',
  currency_symbol: 'XOF',
  currency_code: 'XOF'
},
{
  name: 'Cook Islands',
  iso2: 'CK',
  currency: 'New Zealand Dollar',
  currency_symbol: '$',
  currency_code: 'NZD'
},
{
  name: 'Chile',
  iso2: 'CL',
  currency: 'Chilean Peso',
  currency_symbol: '$',
  currency_code: 'CLP'
},
{
  name: 'Cameroon',
  iso2: 'CM',
  currency: 'CFA Franc BEAC',
  currency_symbol: 'XAF',
  currency_code: 'XAF'
},
{
  name: 'China',
  iso2: 'CN',
  currency: 'Chinese Yuan',
  currency_symbol: '¥',
  currency_code: 'CNY'
},
{
  name: 'Colombia',
  iso2: 'CO',
  currency: 'Colombian Peso',
  currency_symbol: '$',
  currency_code: 'COP'
},
{
  name: 'Costa Rica',
  iso2: 'CR',
  currency: 'Costa Rican Colón',
  currency_symbol: '₡',
  currency_code: 'CRC'
},
{
  name: 'Cuba',
  iso2: 'CU',
  currency: 'Cuban Peso',
  currency_symbol: '$',
  currency_code: 'CUP'
},
{
  name: 'Cape Verde',
  iso2: 'CV',
  currency: 'Cape Verdean Escudo',
  currency_symbol: 'CVE',
  currency_code: 'CVE'
},
{
  name: 'Curacao',
  iso2: 'CW',
  currency: 'Netherlands Antillean Guilder',
  currency_symbol: 'ANG',
  currency_code: 'ANG'
},
{
  name: 'Christmas Island',
  iso2: 'CX',
  currency: 'Australian Dollar',
  currency_symbol: '$',
  currency_code: 'AUD'
},
{
  name: 'Cyprus',
  iso2: 'CY',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Czechia',
  iso2: 'CZ',
  currency: 'Czech Republic Koruna',
  currency_symbol: 'Kč',
  currency_code: 'CZK'
},
{
  name: 'Germany',
  iso2: 'DE',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Djibouti',
  iso2: 'DJ',
  currency: 'Djiboutian Franc',
  currency_symbol: 'DJF',
  currency_code: 'DJF'
},
{
  name: 'Denmark',
  iso2: 'DK',
  currency: 'Danish Krone',
  currency_symbol: 'kr',
  currency_code: 'DKK'
},
{
  name: 'Dominica',
  iso2: 'DM',
  currency: 'East Caribbean Dollar',
  currency_symbol: '$',
  currency_code: 'XCD'
},
{
  name: 'Dominican Republic',
  iso2: 'DO',
  currency: 'Dominican Peso',
  currency_symbol: '$',
  currency_code: 'DOP'
},
{
  name: 'Algeria',
  iso2: 'DZ',
  currency: 'Algerian Dinar',
  currency_symbol: 'DZD',
  currency_code: 'DZD'
},
{
  name: 'Ecuador',
  iso2: 'EC',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Estonia',
  iso2: 'EE',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Egypt',
  iso2: 'EG',
  currency: 'Egyptian Pound',
  currency_symbol: 'E£',
  currency_code: 'EGP'
},
{
  name: 'Western Sahara',
  iso2: 'EH',
  currency: 'Moroccan Dirham',
  currency_symbol: 'MAD',
  currency_code: 'MAD'
},
{
  name: 'Eritrea',
  iso2: 'ER',
  currency: 'Eritrean Nakfa',
  currency_symbol: 'ERN',
  currency_code: 'ERN'
},
{
  name: 'Spain',
  iso2: 'ES',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Ethiopia',
  iso2: 'ET',
  currency: 'Ethiopian Birr',
  currency_symbol: 'ETB',
  currency_code: 'ETB'
},
{
  name: 'Finland',
  iso2: 'FI',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Fiji',
  iso2: 'FJ',
  currency: 'Fijian Dollar',
  currency_symbol: '$',
  currency_code: 'FJD'
},
{
  name: 'Falkland Islands',
  iso2: 'FK',
  currency: 'Falkland Islands Pound',
  currency_symbol: '£',
  currency_code: 'FKP'
},
{
  name: 'Micronesia',
  iso2: 'FM',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Faroe Islands',
  iso2: 'FO',
  currency: 'Danish Krone',
  currency_symbol: 'kr',
  currency_code: 'DKK'
},
{
  name: 'France',
  iso2: 'FR',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Gabon',
  iso2: 'GA',
  currency: 'CFA Franc BEAC',
  currency_symbol: 'XAF',
  currency_code: 'XAF'
},
{
  name: 'United Kingdom',
  iso2: 'GB',
  currency: 'British Pound Sterling',
  currency_symbol: '£',
  currency_code: 'GBP'
},
{
  name: 'Grenada',
  iso2: 'GD',
  currency: 'East Caribbean Dollar',
  currency_symbol: '$',
  currency_code: 'XCD'
},
{
  name: 'Georgia',
  iso2: 'GE',
  currency: 'Georgian Lari',
  currency_symbol: 'GEL',
  currency_code: 'GEL'
},
{
  name: 'French Guiana',
  iso2: 'GF',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Guernsey',
  iso2: 'GG',
  currency: 'British Pound Sterling',
  currency_symbol: '£',
  currency_code: 'GBP'
},
{
  name: 'Ghana',
  iso2: 'GH',
  currency: 'Ghanaian Cedi',
  currency_symbol: 'GHS',
  currency_code: 'GHS'
},
{
  name: 'Gibraltar',
  iso2: 'GI',
  currency: 'Gibraltar Pound',
  currency_symbol: '£',
  currency_code: 'GIP'
},
{
  name: 'Greenland',
  iso2: 'GL',
  currency: 'Danish Krone',
  currency_symbol: 'kr',
  currency_code: 'DKK'
},
{
  name: 'Gambia',
  iso2: 'GM',
  currency: 'Gambian Dalasi',
  currency_symbol: 'GMD',
  currency_code: 'GMD'
},
{
  name: 'Guinea',
  iso2: 'GN',
  currency: 'Guinean Franc',
  currency_symbol: 'FG',
  currency_code: 'GNF'
},
{
  name: 'Guadeloupe',
  iso2: 'GP',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Equatorial Guinea',
  iso2: 'GQ',
  currency: 'CFA Franc BEAC',
  currency_symbol: 'XAF',
  currency_code: 'XAF'
},
{
  name: 'Greece',
  iso2: 'GR',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'South Georgia and the South Sandwich Islands',
  iso2: 'GS',
  currency: 'British Pound Sterling',
  currency_symbol: '£',
  currency_code: 'GBP'
},
{
  name: 'Guatemala',
  iso2: 'GT',
  currency: 'Guatemalan Quetzal',
  currency_symbol: 'Q',
  currency_code: 'GTQ'
},
{
  name: 'Guam',
  iso2: 'GU',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Guinea-Bissau',
  iso2: 'GW',
  currency: 'CFA Franc BCEAO',
  currency_symbol: 'XOF',
  currency_code: 'XOF'
},
{
  name: 'Guyana',
  iso2: 'GY',
  currency: 'Guyanaese Dollar',
  currency_symbol: '$',
  currency_code: 'GYD'
},
{
  name: 'Hong Kong',
  iso2: 'HK',
  currency: 'Hong Kong Dollar',
  currency_symbol: '$',
  currency_code: 'HKD'
},
{
  name: 'Heard Island and McDonald Islands',
  iso2: 'HM',
  currency: 'Australian Dollar',
  currency_symbol: '$',
  currency_code: 'AUD'
},
{
  name: 'Honduras',
  iso2: 'HN',
  currency: 'Honduran Lempira',
  currency_symbol: 'L',
  currency_code: 'HNL'
},
{
  name: 'Croatia',
  iso2: 'HR',
  currency: 'Croatian Kuna',
  currency_symbol: 'kn',
  currency_code: 'HRK'
},
{
  name: 'Haiti',
  iso2: 'HT',
  currency: 'Haitian Gourde',
  currency_symbol: 'HTG',
  currency_code: 'HTG'
},
{
  name: 'Hungary',
  iso2: 'HU',
  currency: 'Hungarian Forint',
  currency_symbol: 'Ft',
  currency_code: 'HUF'
},
{
  name: 'Indonesia',
  iso2: 'ID',
  currency: 'Indonesian Rupiah',
  currency_symbol: 'Rp',
  currency_code: 'IDR'
},
{
  name: 'Ireland',
  iso2: 'IE',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Israel',
  iso2: 'IL',
  currency: 'Israeli New Sheqel',
  currency_symbol: '₪',
  currency_code: 'ILS'
},
{
  name: 'Isle of Man',
  iso2: 'IM',
  currency: 'British Pound Sterling',
  currency_symbol: '£',
  currency_code: 'GBP'
},
{
  name: 'India',
  iso2: 'IN',
  currency: 'Indian Rupee',
  currency_symbol: '₹',
  currency_code: 'INR'
},
{
  name: 'British Indian Ocean Territory',
  iso2: 'IO',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Iraq',
  iso2: 'IQ',
  currency: 'Iraqi Dinar',
  currency_symbol: 'IQD',
  currency_code: 'IQD'
},
{
  name: 'Iran',
  iso2: 'IR',
  currency: 'Iranian Rial',
  currency_symbol: 'IRR',
  currency_code: 'IRR'
},
{
  name: 'Iceland',
  iso2: 'IS',
  currency: 'Icelandic Króna',
  currency_symbol: 'kr',
  currency_code: 'ISK'
},
{
  name: 'Italy',
  iso2: 'IT',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Jersey',
  iso2: 'JE',
  currency: 'British Pound Sterling',
  currency_symbol: '£',
  currency_code: 'GBP'
},
{
  name: 'Jamaica',
  iso2: 'JM',
  currency: 'Jamaican Dollar',
  currency_symbol: '$',
  currency_code: 'JMD'
},
{
  name: 'Jordan',
  iso2: 'JO',
  currency: 'Jordanian Dinar',
  currency_symbol: 'JOD',
  currency_code: 'JOD'
},
{
  name: 'Japan',
  iso2: 'JP',
  currency: 'Japanese Yen',
  currency_symbol: '¥',
  currency_code: 'JPY'
},
{
  name: 'Kenya',
  iso2: 'KE',
  currency: 'Kenyan Shilling',
  currency_symbol: 'KES',
  currency_code: 'KES'
},
{
  name: 'Kyrgyzstan',
  iso2: 'KG',
  currency: 'Kyrgystani Som',
  currency_symbol: 'KGS',
  currency_code: 'KGS'
},
{
  name: 'Cambodia',
  iso2: 'KH',
  currency: 'Cambodian Riel',
  currency_symbol: '៛',
  currency_code: 'KHR'
},
{
  name: 'Kiribati',
  iso2: 'KI',
  currency: 'Australian Dollar',
  currency_symbol: '$',
  currency_code: 'AUD'
},
{
  name: 'Comoros',
  iso2: 'KM',
  currency: 'Comorian Franc',
  currency_symbol: 'CF',
  currency_code: 'KMF'
},
{
  name: 'Saint Kitts and Nevis',
  iso2: 'KN',
  currency: 'East Caribbean Dollar',
  currency_symbol: '$',
  currency_code: 'XCD'
},
{
  name: 'North Korea',
  iso2: 'KP',
  currency: 'North Korean Won',
  currency_symbol: '₩',
  currency_code: 'KPW'
},
{
  name: 'South Korea',
  iso2: 'KR',
  currency: 'South Korean Won',
  currency_symbol: '₩',
  currency_code: 'KRW'
},
{
  name: 'Kuwait',
  iso2: 'KW',
  currency: 'Kuwaiti Dinar',
  currency_symbol: 'KWD',
  currency_code: 'KWD'
},
{
  name: 'Cayman Islands',
  iso2: 'KY',
  currency: 'Cayman Islands Dollar',
  currency_symbol: '$',
  currency_code: 'KYD'
},
{
  name: 'Kazakhstan',
  iso2: 'KZ',
  currency: 'Kazakhstani Tenge',
  currency_symbol: '₸',
  currency_code: 'KZT'
},
{
  name: 'Laos',
  iso2: 'LA',
  currency: 'Laotian Kip',
  currency_symbol: '₭',
  currency_code: 'LAK'
},
{
  name: 'Lebanon',
  iso2: 'LB',
  currency: 'Lebanese Pound',
  currency_symbol: 'L£',
  currency_code: 'LBP'
},
{
  name: 'Saint Lucia',
  iso2: 'LC',
  currency: 'East Caribbean Dollar',
  currency_symbol: '$',
  currency_code: 'XCD'
},
{
  name: 'Liechtenstein',
  iso2: 'LI',
  currency: 'Swiss Franc',
  currency_symbol: 'CHF',
  currency_code: 'CHF'
},
{
  name: 'Sri Lanka',
  iso2: 'LK',
  currency: 'Sri Lankan Rupee',
  currency_symbol: 'Rs',
  currency_code: 'LKR'
},
{
  name: 'Liberia',
  iso2: 'LR',
  currency: 'Liberian Dollar',
  currency_symbol: '$',
  currency_code: 'LRD'
},
{
  name: 'Lesotho',
  iso2: 'LS',
  currency: 'Lesotho Loti',
  currency_symbol: 'LSL',
  currency_code: 'LSL'
},
{
  name: 'Lithuania',
  iso2: 'LT',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Luxembourg',
  iso2: 'LU',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Latvia',
  iso2: 'LV',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Libya',
  iso2: 'LY',
  currency: 'Libyan Dinar',
  currency_symbol: 'LYD',
  currency_code: 'LYD'
},
{
  name: 'Morocco',
  iso2: 'MA',
  currency: 'Moroccan Dirham',
  currency_symbol: 'MAD',
  currency_code: 'MAD'
},
{
  name: 'Monaco',
  iso2: 'MC',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Moldova',
  iso2: 'MD',
  currency: 'Moldovan Leu',
  currency_symbol: 'MDL',
  currency_code: 'MDL'
},
{
  name: 'Montenegro',
  iso2: 'ME',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Saint Martin',
  iso2: 'MF',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Madagascar',
  iso2: 'MG',
  currency: 'Malagasy Ariary',
  currency_symbol: 'Ar',
  currency_code: 'MGA'
},
{
  name: 'Marshall Islands',
  iso2: 'MH',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Macedonia',
  iso2: 'MK',
  currency: 'Macedonian Denar',
  currency_symbol: 'MKD',
  currency_code: 'MKD'
},
{
  name: 'Mali',
  iso2: 'ML',
  currency: 'CFA Franc BCEAO',
  currency_symbol: 'XOF',
  currency_code: 'XOF'
},
{
  name: 'Myanmar [Burma]',
  iso2: 'MM',
  currency: 'Myanmar Kyat',
  currency_symbol: 'K',
  currency_code: 'MMK'
},
{
  name: 'Mongolia',
  iso2: 'MN',
  currency: 'Mongolian Tugrik',
  currency_symbol: '₮',
  currency_code: 'MNT'
},
{
  name: 'Macao',
  iso2: 'MO',
  currency: 'Macanese Pataca',
  currency_symbol: 'MOP',
  currency_code: 'MOP'
},
{
  name: 'Northern Mariana Islands',
  iso2: 'MP',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Martinique',
  iso2: 'MQ',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Mauritania',
  iso2: 'MR',
  currency: 'Mauritanian Ouguiya',
  currency_symbol: 'MRO',
  currency_code: 'MRO'
},
{
  name: 'Montserrat',
  iso2: 'MS',
  currency: 'East Caribbean Dollar',
  currency_symbol: '$',
  currency_code: 'XCD'
},
{
  name: 'Malta',
  iso2: 'MT',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Mauritius',
  iso2: 'MU',
  currency: 'Mauritian Rupee',
  currency_symbol: 'Rs',
  currency_code: 'MUR'
},
{
  name: 'Maldives',
  iso2: 'MV',
  currency: 'Maldivian Rufiyaa',
  currency_symbol: 'MVR',
  currency_code: 'MVR'
},
{
  name: 'Malawi',
  iso2: 'MW',
  currency: 'Malawian Kwacha',
  currency_symbol: 'MWK',
  currency_code: 'MWK'
},
{
  name: 'Mexico',
  iso2: 'MX',
  currency: 'Mexican Peso',
  currency_symbol: '$',
  currency_code: 'MXN'
},
{
  name: 'Malaysia',
  iso2: 'MY',
  currency: 'Malaysian Ringgit',
  currency_symbol: 'RM',
  currency_code: 'MYR'
},
{
  name: 'Mozambique',
  iso2: 'MZ',
  currency: 'Mozambican Metical',
  currency_symbol: 'MZN',
  currency_code: 'MZN'
},
{
  name: 'Namibia',
  iso2: 'NA',
  currency: 'Namibian Dollar',
  currency_symbol: '$',
  currency_code: 'NAD'
},
{
  name: 'New Caledonia',
  iso2: 'NC',
  currency: 'CFP Franc',
  currency_symbol: 'XPF',
  currency_code: 'XPF'
},
{
  name: 'Niger',
  iso2: 'NE',
  currency: 'CFA Franc BCEAO',
  currency_symbol: 'XOF',
  currency_code: 'XOF'
},
{
  name: 'Norfolk Island',
  iso2: 'NF',
  currency: 'Australian Dollar',
  currency_symbol: '$',
  currency_code: 'AUD'
},
{
  name: 'Nigeria',
  iso2: 'NG',
  currency: 'Nigerian Naira',
  currency_symbol: '₦',
  currency_code: 'NGN'
},
{
  name: 'Nicaragua',
  iso2: 'NI',
  currency: 'Nicaraguan Córdoba',
  currency_symbol: 'C$',
  currency_code: 'NIO'
},
{
  name: 'Netherlands',
  iso2: 'NL',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Norway',
  iso2: 'NO',
  currency: 'Norwegian Krone',
  currency_symbol: 'kr',
  currency_code: 'NOK'
},
{
  name: 'Nepal',
  iso2: 'NP',
  currency: 'Nepalese Rupee',
  currency_symbol: 'Rs',
  currency_code: 'NPR'
},
{
  name: 'Nauru',
  iso2: 'NR',
  currency: 'Australian Dollar',
  currency_symbol: '$',
  currency_code: 'AUD'
},
{
  name: 'Niue',
  iso2: 'NU',
  currency: 'New Zealand Dollar',
  currency_symbol: '$',
  currency_code: 'NZD'
},
{
  name: 'New Zealand',
  iso2: 'NZ',
  currency: 'New Zealand Dollar',
  currency_symbol: '$',
  currency_code: 'NZD'
},
{
  name: 'Oman',
  iso2: 'OM',
  currency: 'Omani Rial',
  currency_symbol: 'OMR',
  currency_code: 'OMR'
},
{
  name: 'Panama',
  iso2: 'PA',
  currency: 'Panamanian Balboa',
  currency_symbol: 'PAB',
  currency_code: 'PAB'
},
{
  name: 'Peru',
  iso2: 'PE',
  currency: 'Peruvian Nuevo Sol',
  currency_symbol: 'PEN',
  currency_code: 'PEN'
},
{
  name: 'French Polynesia',
  iso2: 'PF',
  currency: 'CFP Franc',
  currency_symbol: 'XPF',
  currency_code: 'XPF'
},
{
  name: 'Papua New Guinea',
  iso2: 'PG',
  currency: 'Papua New Guinean Kina',
  currency_symbol: 'PGK',
  currency_code: 'PGK'
},
{
  name: 'Philippines',
  iso2: 'PH',
  currency: 'Philippine Peso',
  currency_symbol: '₱',
  currency_code: 'PHP'
},
{
  name: 'Pakistan',
  iso2: 'PK',
  currency: 'Pakistani Rupee',
  currency_symbol: 'Rs',
  currency_code: 'PKR'
},
{
  name: 'Poland',
  iso2: 'PL',
  currency: 'Polish Zloty',
  currency_symbol: 'zł',
  currency_code: 'PLN'
},
{
  name: 'Saint Pierre and Miquelon',
  iso2: 'PM',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Pitcairn Islands',
  iso2: 'PN',
  currency: 'New Zealand Dollar',
  currency_symbol: '$',
  currency_code: 'NZD'
},
{
  name: 'Puerto Rico',
  iso2: 'PR',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Palestine',
  iso2: 'PS',
  currency: 'Israeli New Sheqel',
  currency_symbol: '₪',
  currency_code: 'ILS'
},
{
  name: 'Portugal',
  iso2: 'PT',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Palau',
  iso2: 'PW',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Paraguay',
  iso2: 'PY',
  currency: 'Paraguayan Guarani',
  currency_symbol: '₲',
  currency_code: 'PYG'
},
{
  name: 'Qatar',
  iso2: 'QA',
  currency: 'Qatari Rial',
  currency_symbol: 'QAR',
  currency_code: 'QAR'
},
{
  name: 'Réunion',
  iso2: 'RE',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Romania',
  iso2: 'RO',
  currency: 'Romanian Leu',
  currency_symbol: 'RON',
  currency_code: 'RON'
},
{
  name: 'Serbia',
  iso2: 'RS',
  currency: 'Serbian Dinar',
  currency_symbol: 'RSD',
  currency_code: 'RSD'
},
{
  name: 'Russia',
  iso2: 'RU',
  currency: 'Russian Ruble',
  currency_symbol: 'RUB',
  currency_code: 'RUB'
},
{
  name: 'Rwanda',
  iso2: 'RW',
  currency: 'Rwandan Franc',
  currency_symbol: 'RF',
  currency_code: 'RWF'
},
{
  name: 'Saudi Arabia',
  iso2: 'SA',
  currency: 'Saudi Riyal',
  currency_symbol: 'SAR',
  currency_code: 'SAR'
},
{
  name: 'Solomon Islands',
  iso2: 'SB',
  currency: 'Solomon Islands Dollar',
  currency_symbol: '$',
  currency_code: 'SBD'
},
{
  name: 'Seychelles',
  iso2: 'SC',
  currency: 'Seychellois Rupee',
  currency_symbol: 'SCR',
  currency_code: 'SCR'
},
{
  name: 'Sudan',
  iso2: 'SD',
  currency: 'Sudanese Pound',
  currency_symbol: 'SDG',
  currency_code: 'SDG'
},
{
  name: 'Sweden',
  iso2: 'SE',
  currency: 'Swedish Krona',
  currency_symbol: 'kr',
  currency_code: 'SEK'
},
{
  name: 'Singapore',
  iso2: 'SG',
  currency: 'Singapore Dollar',
  currency_symbol: '$',
  currency_code: 'SGD'
},
{
  name: 'Saint Helena',
  iso2: 'SH',
  currency: 'St. Helena Pound',
  currency_symbol: '£',
  currency_code: 'SHP'
},
{
  name: 'Slovenia',
  iso2: 'SI',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Svalbard and Jan Mayen',
  iso2: 'SJ',
  currency: 'Norwegian Krone',
  currency_symbol: 'kr',
  currency_code: 'NOK'
},
{
  name: 'Slovakia',
  iso2: 'SK',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Sierra Leone',
  iso2: 'SL',
  currency: 'Sierra Leonean Leone',
  currency_symbol: 'SLL',
  currency_code: 'SLL'
},
{
  name: 'San Marino',
  iso2: 'SM',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Senegal',
  iso2: 'SN',
  currency: 'CFA Franc BCEAO',
  currency_symbol: 'XOF',
  currency_code: 'XOF'
},
{
  name: 'Somalia',
  iso2: 'SO',
  currency: 'Somali Shilling',
  currency_symbol: 'SOS',
  currency_code: 'SOS'
},
{
  name: 'Suriname',
  iso2: 'SR',
  currency: 'Surinamese Dollar',
  currency_symbol: '$',
  currency_code: 'SRD'
},
{
  name: 'South Sudan',
  iso2: 'SS',
  currency: 'South Sudanese Pound',
  currency_symbol: '£',
  currency_code: 'SSP'
},
{
  name: 'São Tomé and Príncipe',
  iso2: 'ST',
  currency: 'São Tomé & Príncipe Dobra',
  currency_symbol: 'Db',
  currency_code: 'STD'
},
{
  name: 'El Salvador',
  iso2: 'SV',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Sint Maarten',
  iso2: 'SX',
  currency: 'Netherlands Antillean Guilder',
  currency_symbol: 'ANG',
  currency_code: 'ANG'
},
{
  name: 'Syria',
  iso2: 'SY',
  currency: 'Syrian Pound',
  currency_symbol: '£',
  currency_code: 'SYP'
},
{
  name: 'Swaziland',
  iso2: 'SZ',
  currency: 'Swazi Lilangeni',
  currency_symbol: 'SZL',
  currency_code: 'SZL'
},
{
  name: 'Turks and Caicos Islands',
  iso2: 'TC',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Chad',
  iso2: 'TD',
  currency: 'CFA Franc BEAC',
  currency_symbol: 'XAF',
  currency_code: 'XAF'
},
{
  name: 'French Southern Territories',
  iso2: 'TF',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Togo',
  iso2: 'TG',
  currency: 'CFA Franc BCEAO',
  currency_symbol: 'XOF',
  currency_code: 'XOF'
},
{
  name: 'Thailand',
  iso2: 'TH',
  currency: 'Thai Baht',
  currency_symbol: '฿',
  currency_code: 'THB'
},
{
  name: 'Tajikistan',
  iso2: 'TJ',
  currency: 'Tajikistani Somoni',
  currency_symbol: 'TJS',
  currency_code: 'TJS'
},
{
  name: 'Tokelau',
  iso2: 'TK',
  currency: 'New Zealand Dollar',
  currency_symbol: '$',
  currency_code: 'NZD'
},
{
  name: 'East Timor',
  iso2: 'TL',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Turkmenistan',
  iso2: 'TM',
  currency: 'Turkmenistani Manat',
  currency_symbol: 'TMT',
  currency_code: 'TMT'
},
{
  name: 'Tunisia',
  iso2: 'TN',
  currency: 'Tunisian Dinar',
  currency_symbol: 'TND',
  currency_code: 'TND'
},
{
  name: 'Tonga',
  iso2: 'TO',
  currency: 'Tongan Paʻanga',
  currency_symbol: 'T$',
  currency_code: 'TOP'
},
{
  name: 'Turkey',
  iso2: 'TR',
  currency: 'Turkish Lira',
  currency_symbol: '₺',
  currency_code: 'TRY'
},
{
  name: 'Trinidad and Tobago',
  iso2: 'TT',
  currency: 'Trinidad & Tobago Dollar',
  currency_symbol: '$',
  currency_code: 'TTD'
},
{
  name: 'Tuvalu',
  iso2: 'TV',
  currency: 'Australian Dollar',
  currency_symbol: '$',
  currency_code: 'AUD'
},
{
  name: 'Taiwan',
  iso2: 'TW',
  currency: 'New Taiwan Dollar',
  currency_symbol: 'NT$',
  currency_code: 'TWD'
},
{
  name: 'Tanzania',
  iso2: 'TZ',
  currency: 'Tanzanian Shilling',
  currency_symbol: 'TZS',
  currency_code: 'TZS'
},
{
  name: 'Ukraine',
  iso2: 'UA',
  currency: 'Ukrainian Hryvnia',
  currency_symbol: '₴',
  currency_code: 'UAH'
},
{
  name: 'Uganda',
  iso2: 'UG',
  currency: 'Ugandan Shilling',
  currency_symbol: 'UGX',
  currency_code: 'UGX'
},
{
  name: 'U.S. Minor Outlying Islands',
  iso2: 'UM',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'United States',
  iso2: 'US',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Uruguay',
  iso2: 'UY',
  currency: 'Uruguayan Peso',
  currency_symbol: '$',
  currency_code: 'UYU'
},
{
  name: 'Uzbekistan',
  iso2: 'UZ',
  currency: 'Uzbekistan Som',
  currency_symbol: 'UZS',
  currency_code: 'UZS'
},
{
  name: 'Vatican City',
  iso2: 'VA',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Saint Vincent and the Grenadines',
  iso2: 'VC',
  currency: 'East Caribbean Dollar',
  currency_symbol: '$',
  currency_code: 'XCD'
},
{
  name: 'Venezuela',
  iso2: 'VE',
  currency: 'Venezuelan Bolívar',
  currency_symbol: 'Bs',
  currency_code: 'VEF'
},
{
  name: 'British Virgin Islands',
  iso2: 'VG',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'U.S. Virgin Islands',
  iso2: 'VI',
  currency: 'US Dollar',
  currency_symbol: '$',
  currency_code: 'USD'
},
{
  name: 'Vietnam',
  iso2: 'VN',
  currency: 'Vietnamese Dong',
  currency_symbol: '₫',
  currency_code: 'VND'
},
{
  name: 'Vanuatu',
  iso2: 'VU',
  currency: 'Vanuatu Vatu',
  currency_symbol: 'VUV',
  currency_code: 'VUV'
},
{
  name: 'Wallis and Futuna',
  iso2: 'WF',
  currency: 'CFP Franc',
  currency_symbol: 'XPF',
  currency_code: 'XPF'
},
{
  name: 'Samoa',
  iso2: 'WS',
  currency: 'Samoan Tala',
  currency_symbol: 'WST',
  currency_code: 'WST'
},
{
  name: 'Kosovo',
  iso2: 'XK',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'Yemen',
  iso2: 'YE',
  currency: 'Yemeni Rial',
  currency_symbol: 'YER',
  currency_code: 'YER'
},
{
  name: 'Mayotte',
  iso2: 'YT',
  currency: 'Euro',
  currency_symbol: '€',
  currency_code: 'EUR'
},
{
  name: 'South Africa',
  iso2: 'ZA',
  currency: 'South African Rand',
  currency_symbol: 'R',
  currency_code: 'ZAR'
},
{
  name: 'Zambia',
  iso2: 'ZM',
  currency: 'Zambian Kwacha',
  currency_symbol: 'ZK',
  currency_code: 'ZMW'
},
{
  name: 'Zimbabwe',
  iso2: 'ZW',
  currency: 'Zimbabwean Dollar (2009)',
  currency_symbol: 'ZWL',
  currency_code: 'ZWL'
}]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('countries', insertArr);

  },

  down: async (queryInterface, Sequelize) => {

  },
};
