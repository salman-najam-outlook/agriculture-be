'use strict';

const translations = [
  {
    english: 'Uganda',
    portugese: 'Uganda'
  },
  {
    english: 'Bone Meal',
    portugese: 'Farinha de Osso'
  },
  {
    english: 'SynthenticFertilizerNitrogenUnit',
    portugese: 'Unidade de Nitrogênio de Fertilizante Sintético'
  },
  {
    english: 'SynthenticFertilizerPhosphorousUnit',
    portugese: 'Unidade de Fósforo de Fertilizante Sintético'
  },
  {
    english: 'SynthenticFertilizerPotassiumUnit',
    portugese: 'Unidade de Potássio de Fertilizante Sintético'
  },
  {
    english: 'CoffeeParchmentDensityUnit',
    portugese: 'Unidade de Densidade do Pergaminho de Café'
  },
  {
    english: 'Density',
    portugese: 'Densidade'
  },
  {
    english: 'Cattura Cultivars (mutasi Bourbon; originated in Brazil)',
    portugese: 'Cultivares Cattura (mutasi Bourbon; originário do Brasil)'
  },
  {
    english: 'Acaia',
    portugese: 'Acaia'
  },
  {
    english: 'Agata',
    portugese: 'Agata'
  },
  {
    english: 'Arabigo',
    portugese: 'Arábica'
  },
  {
    english: 'Arusha',
    portugese: 'Arusha'
  },
  {
    english: 'Batian',
    portugese: 'Batian'
  },
  {
    english: 'Bernardina',
    portugese: 'Bernardina'
  },
  {
    english: 'Blawan Paumah',
    portugese: 'Blawan Paumah'
  },
  {
    english: 'Blue Mountain',
    portugese: 'Blue Mountain'
  },
  {
    english: 'Bonifieur',
    portugese: 'Bonifieur'
  },
  {
    english: 'Caturra',
    portugese: 'Caturra'
  },
  {
    english: 'Cauvery',
    portugese: 'Cauvery'
  },
  {
    english: 'Cera',
    portugese: 'Cera'
  },
  {
    english: 'Chandragiri',
    portugese: 'Chandragiri'
  },
  {
    english: 'Coorgs',
    portugese: 'Coorgs'
  },
  {
    english: 'Emerald',
    portugese: 'Esmeralda'
  },
  {
    english: 'French Mission',
    portugese: 'Missão Francesa'
  },
  {
    english: 'Gesha',
    portugese: 'Gesha'
  },
  {
    english: 'Guatemala',
    portugese: 'Guatemala'
  },
  {
    english: 'Harrar',
    portugese: 'Harrar'
  },
  {
    english: 'Harrar',
    portugese: 'Harrar'
  },
  {
    english: 'Jackson',
    portugese: 'Jackson'
  },
  {
    english: 'Jackson 2/1257',
    portugese: 'Jackson 2/1257'
  },
  {
    english: 'K7',
    portugese: 'K7'
  },
  {
    english: 'Kent',
    portugese: 'Kent'
  },
  {
    english: 'Kona',
    portugese: 'Kona'
  },
  {
    english: 'Laurina',
    portugese: 'Laurina'
  },
  {
    english: 'Lekempti',
    portugese: 'Lekempti'
  },
  {
    english: 'Maracaturra',
    portugese: 'Maracaturra'
  },
  {
    english: 'Maragogipe',
    portugese: 'Maragogipe'
  },
  {
    english: 'maragogype',
    portugese: 'Maragogipe'
  },
  {
    english: 'Mayaguez',
    portugese: 'Mayaguez'
  },
  {
    english: 'Mibirizi',
    portugese: 'Mibirizi'
  },
  {
    english: 'Mocha/Mokka',
    portugese: 'Mocha/Mokka'
  },
  {
    english: 'Mundo Novo',
    portugese: 'Mundo Novo'
  },
  {
    english: 'Old Chiks',
    portugese: 'Old Chiks'
  },
  {
    english: 'Onix',
    portugese: 'Onix'
  },
  {
    english: 'Orange Bourbon',
    portugese: 'Bourbon Laranja'
  },
  {
    english: 'Pacamara',
    portugese: 'Pacamara'
  },
  {
    english: 'Pacas',
    portugese: 'Pacas'
  },
  {
    english: 'Pache',
    portugese: 'Pache'
  },
  {
    english: 'Pache Colis',
    portugese: 'Pache Colis'
  },
  {
    english: 'Pache Comum',
    portugese: 'Pache Comum'
  },
  {
    english: 'Pink Bourbon',
    portugese: 'Bourbon Rosa'
  },
  {
    english: 'Red Bourbon',
    portugese: 'Bourbon Vermelho'
  },
  {
    english: 'Rosa Morena',
    portugese: 'Rosa Morena'
  },
  {
    english: 'Rubi',
    portugese: 'Rubi'
  },
  {
    english: 'Ruiru 11',
    portugese: 'Ruiru 11'
  },
  {
    english: 'Safira',
    portugese: 'Safira'
  },
  {
    english: 'Sagada',
    portugese: 'Sagada'
  },
  {
    english: 'San Bernardo Aka Pache',
    portugese: 'San Bernardo Aka Pache'
  },
  {
    english: 'San Ramon',
    portugese: 'San Ramon'
  },
  {
    english: 'Santos',
    portugese: 'Santos'
  },
  {
    english: 'Selection 9',
    portugese: 'Seleção 9'
  },
  {
    english: 'Sidamo',
    portugese: 'Sidamo'
  },
  {
    english: 'Sl28',
    portugese: 'Sl28'
  },
  {
    english: 'Sl34',
    portugese: 'Sl34'
  },
  {
    english: 'Sulawesi',
    portugese: 'Sulawesi'
  },
  {
    english: 'Sumatra',
    portugese: 'Sumatra'
  },
  {
    english: 'Tekisic',
    portugese: 'Tekisic'
  },
  {
    english: 'Topazio',
    portugese: 'Topázio'
  },
  {
    english: 'Toraja',
    portugese: 'Toraja'
  },
  {
    english: 'Turmalina',
    portugese: 'Turmalina'
  },
  {
    english: 'Turquesa',
    portugese: 'Turquesa'
  },
  {
    english: 'Typica',
    portugese: 'Typica'
  },
  {
    english: 'Venecia',
    portugese: 'Venecia'
  },
  {
    english: 'Villa Sarchi',
    portugese: 'Villa Sarchi'
  },
  {
    english: 'Yellow Bourbon',
    portugese: 'Bourbon Amarelo'
  },
  {
    english: 'Erecta.',
    portugese: 'Erecta'
  },
  {
    english: 'Icatu',
    portugese: 'Icatu'
  },
  {
    english: 'Nemaya',
    portugese: 'Nemaya'
  },
  {
    english: 'Nganda',
    portugese: 'Nganda'
  },
  {
    english: 'Pandi',
    portugese: 'Pandi'
  },
  {
    english: 'Pawi',
    portugese: 'Pawi'
  },
  {
    english: 'Rakimin',
    portugese: 'Rakimin'
  },
  {
    english: 'TR4',
    portugese: 'TR4'
  },
  {
    english: 'TR5',
    portugese: 'TR5'
  },
  {
    english: 'TR6',
    portugese: 'TR6'
  },
  {
    english: 'TR7',
    portugese: 'TR7'
  },
  {
    english: 'TR8',
    portugese: 'TR8'
  },
  {
    english: 'SA237',
    portugese: 'SA237'
  },
  {
    english: 'Wayanaad',
    portugese: 'Wayanaad'
  },
  {
    english: 'Exelsa',
    portugese: 'Exelsa'
  },
  {
    english: 'Liberica',
    portugese: 'Liberica'
  },
  {
    english: 'Arabusta',
    portugese: 'Arabusta'
  },
  {
    english: 'Arla',
    portugese: 'Arla'
  },
  {
    english: 'Batian',
    portugese: 'Batian'
  },
  {
    english: 'Bogor Prada',
    portugese: 'Bogor Prada'
  },
  {
    english: 'Casiopea',
    portugese: 'Casiopea'
  },
  {
    english: 'Castillo',
    portugese: 'Castillo'
  },
  {
    english: 'Castillo El Rosario',
    portugese: 'Castillo El Rosario'
  },
  {
    english: 'Castillo El Tambo',
    portugese: 'Castillo El Tambo'
  },
  {
    english: 'Castillo La Trinidad',
    portugese: 'Castillo La Trinidad'
  },
  {
    english: 'Castillo Naranjal',
    portugese: 'Castillo Naranjal'
  },
  {
    english: 'Castillo Paraguaicito',
    portugese: 'Castillo Paraguaicito'
  },
  {
    english: 'Castillo Santa Barbara',
    portugese: 'Castillo Santa Barbara'
  },
  {
    english: 'Catigua',
    portugese: 'Catigua'
  },
  {
    english: 'Catimor,',
    portugese: 'Catimor'
  },
  {
    english: 'Catrenic',
    portugese: 'Catrenic'
  },
  {
    english: 'Centroamericano',
    portugese: 'Centroamericano'
  },
  {
    english: 'Colombia',
    portugese: 'Colômbia'
  },
  {
    english: 'Devamachy',
    portugese: 'Devamachy'
  },
  {
    english: 'Evaluna',
    portugese: 'Evaluna'
  },
  {
    english: 'Fronton',
    portugese: 'Fronton'
  },
  {
    english: 'Java',
    portugese: 'Java'
  },
  {
    english: 'Limani',
    portugese: 'Limani'
  },
  {
    english: 'Maracatu',
    portugese: 'Maracatu'
  },
  {
    english: 'Marsellesa',
    portugese: 'Marsellesa'
  },
  {
    english: 'Milenio',
    portugese: 'Milenio'
  },
  {
    english: 'Mundo Maya',
    portugese: 'Mundo Maya'
  },
  {
    english: 'Nayarita',
    portugese: 'Nayarita'
  },
  {
    english: 'Nemaya',
    portugese: 'Nemaya'
  },
  {
    english: 'Obata',
    portugese: 'Obata'
  },
  {
    english: 'Oro Azteca',
    portugese: 'Oro Azteca'
  },
  {
    english: 'Parainema',
    portugese: 'Parainema'
  },
  {
    english: 'Paraiso',
    portugese: 'Paraíso'
  },
  {
    english: 'Rasuna',
    portugese: 'Rasuna'
  },
  {
    english: 'Sarchimor',
    portugese: 'Sarchimor'
  },
  {
    english: 'Starmaya',
    portugese: 'Starmaya'
  },
  {
    english: 'Tabi',
    portugese: 'Tabi'
  },
  {
    english: 'Timor',
    portugese: 'Timor'
  },
  {
    english: 'Tupi',
    portugese: 'Tupi'
  },
  {
    english: 'Variedad Colombia',
    portugese: 'Variedade Colômbia'
  },
  {
    english: 'Pacamara',
    portugese: 'Pacamara'
  },
  {
    english: 'Typica',
    portugese: 'Typica'
  },
  {
    english: 'Liberica',
    portugese: 'Liberica'
  },
  {
    english: 'Robusta',
    portugese: 'Robusta'
  },
  {
    english: 'Arabica',
    portugese: 'Arabica'
  },
  {
    english: 'Gamal (Gliricidia sepium)',
    portugese: 'Gamal (Gliricidia sepium)'
  },
  {
    english: 'Sengon laut (Albizzia falcata)',
    portugese: 'Sengon laut (Albizzia falcata)'
  },
  {
    english: 'Lamtoro (Leucaena glauca)',
    portugese: 'Lamtoro (Leucaena glauca)'
  },
  {
    english: 'Gamal (Gliricidia sepium)',
    portugese: 'Gamal (Gliricidia sepium)'
  },
  {
    english: 'Alpukat (Persea americana)',
    portugese: 'Alpukat (Persea americana)'
  },
  {
    english: 'Pinus (hard pines)',
    portugese: 'Pinus (pinheiros duros)'
  },
  {
    english: 'Wind Breaker Tree 1',
    portugese: 'Árvore quebra-vento 1'
  },
  {
    english: 'Kayumanis',
    portugese: 'Kayumanis'
  },
  {
    english: 'Karet',
    portugese: 'Karet'
  },
  {
    english: 'Kelapa',
    portugese: 'Kelapa'
  },
  {
    english: 'Damar',
    portugese: 'Damar'
  },
  {
    english: 'Belimbing',
    portugese: 'Belimbing'
  },
  {
    english: 'Gram',
    portugese: 'Grama'
  },
  {
    english: 'Kilogram',
    portugese: 'Quilograma'
  },
  {
    english: 'Pound',
    portugese: 'Libra'
  },
  {
    english: 'Centimeter',
    portugese: 'Centímetro'
  },
  {
    english: 'Meter',
    portugese: 'Metro'
  },
  {
    english: 'Liter-Per-Hectar',
    portugese: 'Litro-Por-Hectare'
  },
  {
    english: 'Milliliters per Square Meter',
    portugese: 'Mililitros por Metro Quadrado'
  },
  {
    english: 'Kilogram per Acre',
    portugese: 'Quilograma por Acre'
  },
  {
    english: 'Kilogram per Hectare',
    portugese: 'Quilograma por Hectare'
  },
  {
    english: 'Tonnes per Hectare',
    portugese: 'Toneladas por Hectare'
  },
  {
    english: 'Bushels per Hectare',
    portugese: 'Alqueires por Hectare'
  },
  {
    english: 'Bushels per Acre',
    portugese: 'Alqueires por Acre'
  },
  {
    english: 'Bags per Hectare',
    portugese: 'Sacolas por Hectare'
  },
  {
    english: 'Bags per Acre',
    portugese: 'Sacolas por Acre'
  },
  {
    english: 'Tonnes per Acre',
    portugese: 'Toneladas por Acre'
  },
  {
    english: 'Kilogram/Tree',
    portugese: 'Quilograma/Árvore'
  },
  {
    english: 'acre',
    portugese: 'Acre'
  },
  {
    english: 'Hectares',
    portugese: 'Hectares'
  },
  {
    english: 'Millimetres',
    portugese: 'Milímetros'
  },
  {
    english: 'Centimeter',
    portugese: 'Centímetro'
  },
  {
    english: 'Meter',
    portugese: 'Metro'
  },
  {
    english: 'acre',
    portugese: 'Acre'
  },
  {
    english: 'Hectare',
    portugese: 'Hectare'
  },
  {
    english: 'Millileter',
    portugese: 'Mililitro'
  },
  {
    english: 'Liter',
    portugese: 'Litro'
  },
  {
    english: 'acre',
    portugese: 'Acre'
  },
  {
    english: 'Hectare',
    portugese: 'Hectare'
  },
  {
    english: 'Kg',
    portugese: 'Quilograma'
  },
  {
    english: 'Tonnes',
    portugese: 'Toneladas'
  },
  {
    english: 'Kilogram per Acre',
    portugese: 'Quilograma por Acre'
  },
  {
    english: 'Kilogram per Hectare',
    portugese: 'Quilograma por Hectare'
  },
  {
    english: 'Tonnes per Acre',
    portugese: 'Toneladas por Acre'
  },
  {
    english: 'Tonnes per Hectare',
    portugese: 'Toneladas por Hectare'
  },
  {
    english: 'Litres/hectare',
    portugese: 'Litros/hectare'
  },
  {
    english: 'Ounces/hectare',
    portugese: 'Onças/hectare'
  },
  {
    english: 'mg/hectare',
    portugese: 'mg/hectare'
  },
  {
    english: 'g/hectare',
    portugese: 'g/hectare'
  },
  {
    english: 'kg/hectare',
    portugese: 'kg/hectare'
  },
  {
    english: 'Litres',
    portugese: 'Litros'
  },
  {
    english: 'Ounces',
    portugese: 'Onças'
  },
  {
    english: 'mg',
    portugese: 'mg'
  },
  {
    english: 'Kg',
    portugese: 'Quilograma'
  },
  {
    english: 'g',
    portugese: 'g'
  },
  {
    english: 'Gallons/acre',
    portugese: 'Galões/acre'
  },
  {
    english: 'Gallons/hectare',
    portugese: 'Galões/hectare'
  },
  {
    english: 'Liters/hectare',
    portugese: 'Litros/hectare'
  },
  {
    english: 'Liters/acre',
    portugese: 'Litros/acre'
  },
  {
    english: 'Centimeter',
    portugese: 'Centímetro'
  },
  {
    english: 'Meter',
    portugese: 'Metro'
  },
  {
    english: 'kg/ha',
    portugese: 'kg/ha'
  },
  {
    english: 'ppm',
    portugese: 'ppm'
  },
  {
    english: 'Kg per hectare',
    portugese: 'Quilograma por hectare'
  },
  {
    english: 'Kg per acre',
    portugese: 'Quilograma por acre'
  },
  {
    english: 'Tonne per hectare',
    portugese: 'Tonelada por hectare'
  },
  {
    english: 'Tonne per acre',
    portugese: 'Tonelada por acre'
  },
  {
    english: 'Grams',
    portugese: 'Gramas'
  },
  {
    english: 'Kilograms',
    portugese: 'Quilogramas'
  },
  {
    english: 'Tonne per acre',
    portugese: 'Tonelada por acre'
  },
  {
    english: 'Kg per hectare',
    portugese: 'Quilograma por hectare'
  },
  {
    english: 'Kg per acre',
    portugese: 'Quilograma por acre'
  },
  {
    english: 'Tonne per hectare',
    portugese: 'Tonelada por hectare'
  },
  {
    english: 'Kilograms',
    portugese: 'Quilogramas'
  },
  {
    english: 'Tonne per hectare',
    portugese: 'Tonelada por hectare'
  },
  {
    english: 'Tonne per acre',
    portugese: 'Tonelada por acre'
  },
  {
    english: 'Kg per acre',
    portugese: 'Quilograma por acre'
  },
  {
    english: 'Kg per hectare',
    portugese: 'Quilograma por hectare'
  },
  {
    english: 'Kilograms',
    portugese: 'Quilogramas'
  },
  {
    english: 'kg\/ha',
    portugese: 'kg/ha'
  },
  {
    english: 'ppm',
    portugese: 'ppm'
  },
  {
    english: 'kg\/ml',
    portugese: 'kg/ml'
  },
  {
    english: 'g\/ml',
    portugese: 'g/ml'
  },
  {
    english: 'kg\/ha',
    portugese: 'kg/ha'
  },
  {
    english: 'ppm',
    portugese: 'ppm'
  },
  {
    english: 'kg\/ha',
    portugese: 'kg/ha'
  },
  {
    english: 'ppm',
    portugese: 'ppm'
  },
  {
    english: 'Kilograms',
    portugese: 'Quilogramas'
  },
  {
    english: 'Milligrams (N)\/Liter',
    portugese: 'Miligramas (N)\/Litro'
  },
  {
    english: 'Kg (N)\/hectare',
    portugese: 'Kg (N)\/hectare'
  },
  {
    english: 'parts (N)\/million',
    portugese: 'partes (N)\/milhão'
  },
  {
    english: 'Milligrams (P2O5)\/Liter',
    portugese: 'Miligramas (P2O5)\/Litro'
  },
  {
    english: 'Kg (P2O5)\/hectare',
    portugese: 'Kg (P2O5)\/hectare'
  },
  {
    english: 'parts (P2O5)\/million',
    portugese: 'partes (P2O5)\/milhão'
  },
  {
    english: 'Milligrams (K20)\/Liter',
    portugese: 'Miligramas (K20)\/Litro'
  },
  {
    english: 'Kg (K20)\/hectare',
    portugese: 'Kg (K20)\/hectare'
  },
  {
    english: 'parts (K20)\/million',
    portugese: 'partes (K20)\/milhão'
  },
  {
    english: 'kg per centimetre cube',
    portugese: 'kg por centímetro cúbico'
  },
  {
    english: 'kg\/cm3',
    portugese: 'kg/cm³'
  },
  {
    english: 'gr\/m3',
    portugese: 'gr/m³'
  },
  {
    english: 'Increasing The Yields',
    portugese: 'Aumentando Os Rendimentos'
  },
  {
    english: 'Optimize The Use Of Synthetic Fertilizers',
    portugese: 'Otimizar O Uso De Fertilizantes Sintéticos'
  },
  {
    english: 'Typica (Bergandal, Sidikalang - Sumatera).',
    portugese: 'Typica (Bergandal, Sidikalang - Sumatera)'
  },
  {
    english: 'Hibrido de Timor (HDT, Cross breed Arabica-Robusta; Tim-tim, Aceh)',
    portugese: 'Híbrido De Timor (HDT, Cruzamento Arabica-Robusta; Tim-tim, Aceh)'
  },
  {
    english: 'Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)',
    portugese: 'Linie S (S-288, S-795, Andungsari, Komasti; Aceh, Flores)'
  },
  {
    english: 'Ethiopian lines (Rambung Abyssina, USDA)',
    portugese: 'Linhas Etíopes (Rambung Abyssina, USDA)'
  },
  {
    english: 'Mundo Nova (Silang Typica-Bourbon, from Brazil)',
    portugese: 'Mundo Nova (Silang Typica-Bourbon, do Brasil)'
  },
  {
    english: 'Catimor Lines (Andungsari, Ateng, Jaluk, Kartika\/Catuai\/Katai - mix breed arabica-robusta).',
    portugese: 'Catimor Lines (Andungsari, Ateng, Jaluk, Kartika\/Catuai'
  },
  {
    english: 'Amarello De Botucatu',
    portugese: 'Amarello De Botucatu'
  },
  {
    english: 'Benguet',
    portugese: 'Benguet'
  },
  {
    english: 'Bergendal',
    portugese: 'Bergendal'
  },
  {
    english: 'Bergundal Aka Garundang',
    portugese: 'Bergundal Aka Garundang'
  },
  {
    english: 'Bmj',
    portugese: 'Bmj'
  },
  {
    english: 'Boubon Mayaguez 71',
    portugese: 'Boubon Mayaguez 71'
  },
  {
    english: 'Bourbon',
    portugese: 'Bourbon'
  },
  {
    english: 'Bourbon Chocolá',
    portugese: 'Bourbon Chocolá'
  },
  {
    english: 'Bourbon Mayaguez 139',
    portugese: 'Bourbon Mayaguez 139'
  },
  {
    english: 'Bourbon Mayaguez 71',
    portugese: 'Bourbon Mayaguez 71'
  },
  {
    english: 'catuai',
    portugese: 'catuai'
  },
  {
    english: 'Chickumalgur',
    portugese: 'Chickumalgur'
  },
  {
    english: 'Criollo',
    portugese: 'Criollo'
  },
  {
    english: 'Culi Arabica',
    portugese: 'Culi Arabica'
  },
  {
    english: 'Djimma',
    portugese: 'Djimma'
  },
  {
    english: 'IAPAR59',
    portugese: 'IAPAR59'
  },
  {
    english: 'Ibairi',
    portugese: 'Ibairi'
  },
  {
    english: 'Jember/S795',
    portugese: 'Jember/S795'
  },
  {
    english: 'K20',
    portugese: 'K20'
  },
  {
    english: 'Kalossi',
    portugese: 'Kalossi'
  },
  {
    english: 'Kp423',
    portugese: 'Kp423'
  },
  {
    english: 'Lintong',
    portugese: 'Lintong'
  },
  {
    english: 'Nyasaland',
    portugese: 'Nyasaland'
  },
  {
    english: 'Ouro Bronze',
    portugese: 'Ouro Bronze'
  },
  {
    english: 'Ouro Verde',
    portugese: 'Ouro Verde'
  },
  {
    english: 'Pluma Hidalgo',
    portugese: 'Pluma Hidalgo'
  },
  {
    english: 'Pop3303/21',
    portugese: 'Pop3303/21'
  },
  {
    english: 'semperflorens',
    portugese: 'semperflorens'
  },
  {
    english: 'Sidikalang',
    portugese: 'Sidikalang'
  },
  {
    english: 'Sl14',
    portugese: 'Sl14'
  },
  {
    english: 'Sumatra Lintong',
    portugese: 'Sumatra Lintong'
  },
  {
    english: 'Usda762',
    portugese: 'Usda762'
  },
  {
    english: 'Villalobos',
    portugese: 'Villalobos'
  },
  {
    english: 'Walichu/ Wolisho',
    portugese: 'Walichu/ Wolisho'
  },
  {
    english: 'Yirgacheffe',
    portugese: 'Yirgacheffe'
  },
  {
    english: 'Catimor (hybrid of Caturra x Timor)',
    portugese: 'Catimor (hybrid of Caturra x Timor)'
  },
  {
    english: 'Jawa (Java Coffee, !700AD)',
    portugese: 'Jawa (Java Coffee, !700AD)'
  },
  {
    english: 'Arabusta (HDT; Hibrid of sterile CArabica and C.Robusta)',
    portugese: 'Arabusta (HDT; Hibrid of sterile CArabica and C.Robusta)'
  },
  {
    english: 'Brs 1216',
    portugese: 'Brs 1216'
  },
  {
    english: 'Brs 2336',
    portugese: 'Brs 2336'
  },
  {
    english: 'Brs 3210',
    portugese: 'Brs 3210'
  },
  {
    english: 'Brs 3213',
    portugese: 'Brs 3213'
  },
  {
    english: 'Culi Robusta',
    portugese: 'Culi Robusta'
  },
  {
    english: 'Jasli',
    portugese: 'Jasli'
  },
  {
    english: 'Kapeng Alamid',
    portugese: 'Kapeng Alamid'
  },
  {
    english: 'Kopi Luwak',
    portugese: 'Kopi Luwak'
  },
  {
    english: 'Selection 1r',
    portugese: 'Selection 1r'
  },
  {
    english: 'Selection 2r',
    portugese: 'Selection 2r'
  },
  {
    english: 'Selection 3r',
    portugese: 'Selection 3r'
  },
  {
    english: 'Sln 270',
    portugese: 'Sln 270'
  },
  {
    english: 'Sln 274',
    portugese: 'Sln 274'
  },
  {
    english: 'BP42',
    portugese: 'BP42'
  },
  {
    english: 'BP234',
    portugese: 'BP234'
  },
  {
    english: 'BP288',
    portugese: 'BP288'
  },
  {
    english: 'BP358',
    portugese: 'BP358'
  },
  {
    english: 'BP409',
    portugese: 'BP409'
  },
  {
    english: 'Kape Barako',
    portugese: 'Kape Barako'
  },
  {
    english: 'Sln288',
    portugese: 'Sln288'
  },
  {
    english: 'Sln10',
    portugese: 'Sln10'
  },
  {
    english: 'Abyssinia 3',
    portugese: 'Abyssinia 3'
  },
  {
    english: 'Anacafe 14',
    portugese: 'Anacafe 14'
  },
  {
    english: 'Ateng',
    portugese: 'Ateng'
  },
  {
    english: 'Castillo Pueblo Bello',
    portugese: 'Castillo Pueblo Bello'
  },
  {
    english: 'Catiga Mg2',
    portugese: 'Catiga Mg2'
  },
  {
    english: 'Catimor 129',
    portugese: 'Catimor 129'
  },
  {
    english: 'Catimor F6.',
    portugese: 'Catimor F6.'
  },
  {
    english: 'Catucai',
    portugese: 'Catucai'
  },
  {
    english: 'Costa Rica 95 Aka Cr-95',
    portugese: 'Costa Rica 95 Aka Cr-95'
  },
  {
    english: 'Cr (Costa Rica) 95',
    portugese: 'Cr (Costa Rica) 95'
  },
  {
    english: 'Cuscatleco',
    portugese: 'Cuscatleco'
  },
  {
    english: 'Gayo Satu',
    portugese: 'Gayo Satu'
  },
  {
    english: 'Hibrido De Timor',
    portugese: 'Hibrido De Timor'
  },
  {
    english: 'Iapar 59',
    portugese: 'Iapar 59'
  },
  {
    english: 'Icafe 95',
    portugese: 'Icafe 95'
  },
  {
    english: 'IHcafe 90',
    portugese: 'IHcafe 90'
  },
  {
    english: 'Ipar 103',
    portugese: 'Ipar 103'
  },
  {
    english: 'Komasti',
    portugese: 'Komasti'
  },
  {
    english: 'Lempira',
    portugese: 'Lempira'
  },
  {
    english: 'obata rojo',
    portugese: 'obata rojo'
  },
  {
    english: 'RAB C15',
    portugese: 'RAB C15'
  },
  {
    english: 'Rambung',
    portugese: 'Rambung'
  },
  {
    english: 'S.12 Kaffa',
    portugese: 'S.12 Kaffa'
  },
  {
    english: 'Sigarar Utang',
    portugese: 'Sigarar Utang'
  },
  {
    english: 'T5175',
    portugese: 'T5175'
  },
  {
    english: 'T5296',
    portugese: 'T5296'
  },
  {
    english: 'T8667',
    portugese: 'T8667'
  },
  {
    english: 'Hybrid',
    portugese: 'Híbrido'
  },
  {
    english: 'Bourbon',
    portugese: 'Bourbon'
  },
  {
    english: 'Dadap (Eurythrina lithosperma)',
    portugese: 'Dadap (Eurythrina lithosperma)'
  },
  {
    english: 'Gamal (Glirisidia)',
    portugese: 'Gamal (Glirisidia)'
  },
  {
    english: 'My Profile',
    portugese: 'Meu Perfil'
  },
  {
    english: 'Holes on leaves/fruits/grain',
    portugese: 'Buracos em folhas/frutos/grãos'
  },
  {
    english: 'Rolled and curled leaves',
    portugese: 'Folhas enroladas e encaracoladas'
  },
  {
    english: 'Dead shoots',
    portugese: 'Brotações mortas'
  },
  {
    english: 'Stunted/poor growth',
    portugese: 'Crescimento prejudicado/pobre'
  },
  {
    english: 'Distorted plants/leaves',
    portugese: 'Plantas/folhas distorcidas'
  },
  {
    english: 'Plant wilting',
    portugese: 'Murchamento da planta'
  },
  {
    english: 'Irregular and chewed leaves/stems',
    portugese: 'Folhas/ramos irregulares e mastigados'
  },
  {
    english: 'Dying of the new leaves',
    portugese: 'Morte das novas folhas'
  },
  {
    english: 'Presence of larvae',
    portugese: 'Presença de larvas'
  },
  {
    english: 'Presence of droppings',
    portugese: 'Presença de fezes'
  },
  {
    english: 'Weak stems',
    portugese: 'Hastes fracas'
  },
  {
    english: 'Presence of webs',
    portugese: 'Presença de teias'
  },
  {
    english: 'Weak roots',
    portugese: 'Raízes fracas'
  },
  {
    english: 'Shoot and capsule borer',
    portugese: 'Perfurador de brotos e cápsulas'
  },
  {
    english: 'Aphids',
    portugese: 'Afídeos'
  },
  {
    english: 'Shoot Fly',
    portugese: 'Mosca de Tiro'
  },
  {
    english: 'Nematodes',
    portugese: 'Nematóides'
  },
  {
    english: 'Cut worms',
    portugese: 'Verme de corte'
  },
  {
    english: 'Thrips',
    portugese: 'Tripes'
  },
  {
    english: 'Quinoa Moth',
    portugese: 'Traça da Quinoa'
  },
  {
    english: 'Leaf miner files',
    portugese: 'Arquivos de mineração de folhas'
  },
  {
    english: 'Cassava Green Mite (Mononychellus tanajoa)',
    portugese: 'Ácaro Verde da Mandioca (Mononychellus tanajoa)'
  },
  {
    english: 'Cassava mealy bug',
    portugese: 'Cochonilha da Mandioca'
  },
  {
    english: 'Whitefly (Aleurodicus dispersus)',
    portugese: 'Mosca-branca (Aleurodicus dispersus)'
  },
  {
    english: 'Variegated cricket (Zonocerus variegatus)',
    portugese: 'Gafanhoto Variegado (Zonocerus variegatus)'
  },
  {
    english: 'Onion Thrips',
    portugese: 'Tripes da Cebola'
  },
  {
    english: 'Eriophyid mite',
    portugese: 'Ácaro Eriophyid'
  },
  {
    english: 'Onion Maggot',
    portugese: 'Bicho-da-Cebola'
  },
  {
    english: 'Earwig',
    portugese: 'Forficula'
  },
  {
    english: 'Tea mites and spider mites',
    portugese: 'Ácaros do chá e ácaros da aranha'
  },
  {
    english: 'Tea Cutworms',
    portugese: 'Lagartas do chá'
  },
  {
    english: 'Tea Crickets',
    portugese: 'Gafanhotos do chá'
  },
  {
    english: 'Tea mosquito bug',
    portugese: 'Percevejo Mosquito do chá'
  },
  {
    english: 'Borer',
    portugese: 'Broca'
  },
  {
    english: 'Mealybug',
    portugese: 'Cochonilha'
  },
  {
    english: 'Corm Weevil',
    portugese: 'Besouro Corm'
  },
  {
    english: 'Pseudostem weevil',
    portugese: 'Besouro do pseudocaule'
  },
  {
    english: 'Nematode',
    portugese: 'Nematóide'
  },
  {
    english: 'Stem Borer',
    portugese: 'Broca do caule'
  },
  {
    english: 'Fall armyworm',
    portugese: 'Lagarta do exército do outono'
  },
  {
    english: 'Ear head bug',
    portugese: 'Percevejo de cabeça de ouvido'
  },
  {
    english: 'Rice Stem borer',
    portugese: 'Broca do caule de arroz'
  },
  {
    english: 'Rice hispa',
    portugese: 'Hispa do arroz'
  },
  {
    english: 'Leaf folder',
    portugese: 'Dobrador de folhas'
  },
  {
    english: 'Plant hopper',
    portugese: 'Pulador de plantas'
  },
  {
    english: 'Bulb Mites',
    portugese: 'Ácaros do bulbo'
  },
  {
    english: 'Red Spider Mite',
    portugese: 'Ácaro Vermelho'
  },
  {
    english: 'Safflower aphid',
    portugese: 'Afídeo do cártamo'
  },
  {
    english: 'Safflower gram pod borer\/ capsule borer',
    portugese: 'Broca de vagem de grama de cártamo'
  },
  {
    english: 'Safflower caterpillar',
    portugese: 'Lagarta do cártamo'
  },
  {
    english: 'safflower bud fly\/capsule fly',
    portugese: 'Mosca de botão de cártamo'
  },
  {
    english: 'Cotton American boll worm',
    portugese: 'Broca americana de algodão'
  },
  {
    english: 'Cotton Spotted boll worm',
    portugese: 'Broca manchada de algodão'
  },
  {
    english: 'Cotton Pink boll worm',
    portugese: 'Broca rosa de algodão'
  },
  {
    english: 'Cotton Jassid',
    portugese: 'Jassid do algodão'
  },
  {
    english: 'Tomato Gram pod borer',
    portugese: 'Broca de vagem de tomate'
  },
  {
    english: 'Tomato Leaf eating caterpillar',
    portugese: 'Lagarta comendo folhas de tomate'
  },
  {
    english: 'Tomato Whitefly',
    portugese: 'Mosca-branca do tomateiro'
  },
  {
    english: 'Tomato Serpentine leaf miner.',
    portugese: 'Minador de folhas serpentino do tomateiro.'
  },
  {
    english: 'European skipper',
    portugese: 'Borboleta europeia'
  },
  {
    english: 'Cereal rust mite adults',
    portugese: 'Ácaros adultos de ferrugem de cereais'
  },
  {
    english: 'Wireworms',
    portugese: 'Larvas de arame'
  },
  {
    english: 'Grasshopper',
    portugese: 'Gafanhoto'
  },
  {
    english: 'Bihar hair caterpiller',
    portugese: 'Lagarta de cabelo de Bihar'
  },
  {
    english: 'Cabbage buterfly',
    portugese: 'Borboleta do repolho'
  },
  {
    english: 'Mustard aphid',
    portugese: 'Afídeo da mostarda'
  },
  {
    english: 'Mustard sawfly',
    portugese: 'Vespa da mostarda'
  },
  {
    english: 'Bean Aphids',
    portugese: 'Afídeos do feijão'
  },
  {
    english: 'Blister Beetle',
    portugese: 'Besouro de bolha'
  },
  {
    english: 'Blue butterfly',
    portugese: 'Borboleta azul'
  },
  {
    english: 'Gram pod borer',
    portugese: 'Broca de vagem de grama'
  },
  {
    english: 'Earhead Bug',
    portugese: 'Percevejo de cabeça de ouvido'
  },
  {
    english: 'Ear Head Caterpillar',
    portugese: 'Lagarta de cabeça de orelha'
  },
  {
    english: 'Pink Stem Borer',
    portugese: 'Broca rosa do caule'
  },
  {
    english: 'Plant Lice (Aphids)',
    portugese: 'Piolhos de plantas (Afídeos)'
  },
  {
    english: 'Leaf webber or roller and capsule borer',
    portugese: 'Tecedor ou enrolador de folhas e broca de cápsulas'
  },
  {
    english: 'Gall fly',
    portugese: 'Mosca de galhas'
  },
  {
    english: 'Sesame leafhopper',
    portugese: 'Cigarrinha do gergelim'
  },
  {
    english: 'Hawk moth',
    portugese: 'Mariposa-falcão'
  },
  {
    english: 'Earwig: Anisolabis stali',
    portugese: 'Forficula: Anisolabis stali'
  },
  {
    english: 'Alfalfa Looper',
    portugese: 'Loopers de alfafa'
  },
  {
    english: 'Alfalfa Aphid',
    portugese: 'Afídeo da alfafa'
  },
  {
    english: 'Cutworms',
    portugese: 'Lagartas cortadoras'
  },
  {
    english: 'Fruit Rust,Thrips',
    portugese: 'Ferrugem de frutas, Tripes'
  },
  {
    english: 'Slugs',
    portugese: 'Lesmas'
  },
  {
    english: 'Gram caterpillar',
    portugese: 'Lagarta da grama'
  },
  {
    english: 'Fruit fly',
    portugese: 'Mosca da fruta'
  },
  {
    english: 'Leaf Miner',
    portugese: 'Minador de folhas'
  },
  {
    english: 'Citrus psyllid',
    portugese: 'Psilídeo dos citros'
  },
  {
    english: 'Scale Insects',
    portugese: 'Insetos de escama'
  },
  {
    english: 'Aphids & Mealy Bugs',
    portugese: 'Afídeos e Cochonilhas'
  },
  {
    english: 'Scale Insects:',
    portugese: 'Insetos de escama:'
  },
  {
    english: 'Leaf Miner',
    portugese: 'Minador de folhas'
  },
  {
    english: 'Black aphids',
    portugese: 'Afídeos negros'
  },
  {
    english: 'Termites',
    portugese: 'Cupins'
  },
  {
    english: 'Olive fruit fly',
    portugese: 'Mosca da azeitona'
  },
  {
    english: 'Olive moth',
    portugese: 'Traça da oliveira'
  },
  {
    english: 'Black Scale',
    portugese: 'Escama negra'
  },
  {
    english: 'Mealy bugs',
    portugese: 'Cochonilhas'
  },
  {
    english: 'Tea mosquitoe bugs',
    portugese: 'Percevejos do mosquito do chá'
  },
  {
    english: 'Flatid Plant hoppers',
    portugese: 'Saltadores de plantas flatid'
  },
  {
    english: 'Aphids',
    portugese: 'Afídeos'
  },
  {
    english: 'Mexican Bean Beetle',
    portugese: 'Besouro mexicano do feijão'
  },
  {
    english: 'Leafminers',
    portugese: 'Minadores de folhas'
  },
  {
    english: 'Corn Earworm',
    portugese: 'Lagarta do milho'
  },
  {
    english: 'White Scale',
    portugese: 'Escama branca'
  },
  {
    english: 'Shield Scale',
    portugese: 'Escama escudo'
  },
  {
    english: 'Leaf Beetle',
    portugese: 'Besouro de folha'
  },
  {
    english: 'Capitulum Borer',
    portugese: 'Broca de capitúlio'
  },
  {
    english: 'Tobacco Caterpillar',
    portugese: 'Lagarta do tabaco'
  },
  {
    english: 'Leaf Hopper',
    portugese: 'Saltador de folhas'
  },
  {
    english: 'Sunflower Beetle',
    portugese: 'Besouro do girassol'
  },
  {
    english: 'Mealy bug',
    portugese: 'Cochonilha'
  },
  {
    english: 'Grasshopper',
    portugese: 'Gafanhoto'
  },
  {
    english: 'Mango Hopper (Idioscopus clypealis)',
    portugese: 'Percevejo do mangueira (Idioscopus clypealis)'
  },
  {
    english: 'Mango Mealy Bug (Drosicha mangiferae)',
    portugese: 'Cochonilha da manga (Drosicha mangiferae)'
  },
  {
    english: 'Mango Bark Eating Caterpillar (Indarbela quadrinotata)',
    portugese: 'Lagarta de casca de manga (Indarbela quadrinotata)'
  },
  {
    english: 'Mango fruit fly: Bactrocera dorsalis',
    portugese: 'Mosca-das-frutas da manga: Bactrocera dorsalis'
  },
  {
    english: 'Red Spider Mite',
    portugese: 'Ácaro vermelho'
  },
  {
    english: 'Woolly Aphids',
    portugese: 'Afídeos lanosos'
  },
  {
    english: 'San Jose Scale',
    portugese: 'Escama de San José'
  },
  {
    english: 'Codling Moth',
    portugese: 'Mariposa-da-maçã'
  },
  {
    english: 'European Red Mite',
    portugese: 'Ácaro vermelho europeu'
  },
  {
    english: 'Placement',
    portugese: 'Colocação'
  },
  {
    english: 'Band placement',
    portugese: 'Colocação de bandas'
  },
  {
    english: 'Foliar application',
    portugese: 'Aplicação foliar'
  },
  {
    english: 'Injection into soil',
    portugese: 'Injeção no solo'
  },
  {
    english: 'Ugandan shilling',
    portugese: 'Xelim ugandense'
  },
  {
    english: 'Indian rupee',
    portugese: 'Rúpia indiana'
  },
  {
    english: 'United States dollar',
    portugese: 'Dólar dos Estados Unidos'
  },
  {
    english: 'Indonesian Rupiah',
    portugese: 'Rupia indonésia'
  },
  {
    english: 'Euro',
    portugese: 'Euro'
  },
  {
    english: 'Singapore Dollar',
    portugese: 'Dólar de Singapura'
  },
  {
    english: 'Brazilian Real',
    portugese: 'Real brasileiro'
  },
  {
    english: 'Canadian Dollar',
    portugese: 'Dólar canadense'
  },
  {
    english: 'CFP Franc',
    portugese: 'Franco CFP'
  },
  {
    english: 'French Franc',
    portugese: 'Franco francês'
  },
  {
    english: 'Italian Lira',
    portugese: 'Lira italiana'
  },
  {
    english: 'Kuwaiti Dinar',
    portugese: 'Dinar kuwaitiano'
  },
  {
    english: 'Mexican Peso',
    portugese: 'Peso mexicano'
  },
  {
    english: 'Nepalese Rupee',
    portugese: 'Rúpia nepalesa'
  },
  {
    english: 'United Arab Emirates Dirham',
    portugese: 'Dirham dos Emirados Árabes Unidos'
  },
  {
    english: 'honey',
    portugese: 'mel'
  },
  {
    english: 'natural (dry)',
    portugese: 'natural (seco)'
  },
  {
    english: 'wine',
    portugese: 'vinho'
  },
  {
    english: 'Semi-Washed',
    portugese: 'Semi-lavado'
  },
  {
    english: 'Full-Washed',
    portugese: 'Totalmente lavado'
  },
  {
    english: 'Parchment Coffee',
    portugese: 'Café pergaminho'
  },
  {
    english: 'Quality Control',
    portugese: 'Controle de qualidade'
  },
  {
    english: 'Batch Production',
    portugese: 'Produção em lotes'
  },
  {
    english: 'Green Beans',
    portugese: 'Feijão verde'
  },
  {
    english: 'Cupping',
    portugese: 'Prova de café'
  },
  {
    english: 'Agrifound Light Red',
    portugese: 'Agrifound Light Red'
  },
  {
    english: 'Agrifound Red',
    portugese: 'Agrifound Red'
  },
  {
    english: 'Agrifound Rose',
    portugese: 'Agrifound Rose'
  },
  {
    english: 'Agrifound White',
    portugese: 'Agrifound White'
  },
  {
    english: 'Arad-H',
    portugese: 'Arad-H'
  },
  {
    english: 'Arka Bindu',
    portugese: 'Arka Bindu'
  },
  {
    english: 'Arka Kalyan',
    portugese: 'Arka Kalyan'
  },
  {
    english: 'Arka Kihriman',
    portugese: 'Arka Kihriman'
  },
  {
    english: 'Arka Kirtinaan',
    portugese: 'Arka Kirtinaan'
  },
  {
    english: 'Arka Lalima',
    portugese: 'Arka Lalima'
  },
  {
    english: 'Arka Niketan',
    portugese: 'Arka Niketan'
  },
  {
    english: 'Arka Pitambar',
    portugese: 'Arka Pitambar'
  },
  {
    english: 'Arka Pragathi',
    portugese: 'Arka Pragathi'
  },
  {
    english: 'Arka Sona',
    portugese: 'Arka Sona'
  },
  {
    english: 'Arka Swadista',
    portugese: 'Arka Swadista'
  },
  {
    english: 'Arka Ujjwal',
    portugese: 'Arka Ujjwal'
  },
  {
    english: 'Arka Vishwas',
    portugese: 'Arka Vishwas'
  },
  {
    english: 'Bangalore rose',
    portugese: 'Rosa de Bangalore'
  },
  {
    english: 'Bhima super red',
    portugese: 'Bhima super vermelho'
  },
  {
    english: 'Bhima red',
    portugese: 'Bhima vermelho'
  },
  {
    english: 'Bhima raj dark red',
    portugese: 'Bhima raj vermelho escuro'
  },
  {
    english: 'Bhima Shakti red',
    portugese: 'Bhima Shakti vermelho'
  },
  {
    english: 'Bhima Kiran light red',
    portugese: 'Bhima Kiran vermelho claro'
  },
  {
    english: 'Bhima light red',
    portugese: 'Bhima vermelho claro'
  },
  {
    english: 'Bhima shubra white',
    portugese: 'Bhima shubra branco'
  },
  {
    english: 'Bhima shweta white',
    portugese: 'Bhima shweta branco'
  },
  {
    english: 'Bhima Safed',
    portugese: 'Bhima Safed'
  },
  {
    english: 'Early Grano',
    portugese: 'Early Grano'
  },
  {
    english: 'Kalyanpur Red Round',
    portugese: 'Kalyanpur Redondo Vermelho'
  },
  {
    english: 'Nimar local',
    portugese: 'Nimar local'
  },
  {
    english: 'Phule Safeed',
    portugese: 'Phule Safeed'
  },
  {
    english: 'Phule Survana',
    portugese: 'Phule Survana'
  },
  {
    english: 'Phule Samarth',
    portugese: 'Phule Samarth'
  },
  {
    english: 'Phule Swarna',
    portugese: 'Phule Swarna'
  },
  {
    english: 'Punjab Selection',
    portugese: 'Seleção Punjab'
  },
  {
    english: 'Pusa Madhavi',
    portugese: 'Pusa Madhavi'
  },
  {
    english: 'Pusa Ridhi',
    portugese: 'Pusa Ridhi'
  },
  {
    english: 'Spanish brown',
    portugese: 'Marrom espanhol'
  },
  {
    english: 'Suprex',
    portugese: 'Suprex'
  },
  {
    english: 'Talaja Local',
    portugese: 'Talaja Local'
  },
  {
    english: 'Bhima',
    portugese: 'Bhima'
  },
  {
    english: 'Girna',
    portugese: 'Girna'
  },
  {
    english: 'Manjira',
    portugese: 'Manjira'
  },
  {
    english: 'NIRA',
    portugese: 'NIRA'
  },
  {
    english: 'Sagarmatyalu',
    portugese: 'Sagarmatyalu'
  },
  {
    english: 'Sharda',
    portugese: 'Sharda'
  },
  {
    english: 'Tara',
    portugese: 'Tara'
  },
  {
    english: 'banana fruit',
    portugese: 'fruta banana'
  },
  {
    english: 'Farsem',
    portugese: 'Farsem'
  },
  {
    english: 'Amazonas Embrapa',
    portugese: 'Amazonas Embrapa'
  },
  {
    english: 'Fibra',
    portugese: 'Fibra'
  },
  {
    english: 'Espeto',
    portugese: 'Espeto'
  },
  {
    english: 'Mandim branca',
    portugese: 'Mandim branca'
  },
  {
    english: 'Platina',
    portugese: 'Platina'
  },
  {
    english: 'Sonara',
    portugese: 'Sonara'
  },
  {
    english: 'Jarina',
    portugese: 'Jarina'
  },
  {
    english: 'Arari',
    portugese: 'Arari'
  },
  {
    english: 'Cacau',
    portugese: 'Cacau'
  },
  {
    english: 'Taquari',
    portugese: 'Taquari'
  },
  {
    english: 'Liyaye',
    portugese: 'Liyaye'
  },
  {
    english: 'Vitamin A cassava',
    portugese: 'Mandioca vitamina A'
  },
  {
    english: 'Malyoha',
    portugese: 'Malyoha'
  },
  {
    english: 'Sawa sawa',
    portugese: 'Sawa sawa'
  },
  {
    english: 'Mapendo',
    portugese: 'Mapendo'
  },
  {
    english: 'Game changer',
    portugese: 'Game changer'
  },
  {
    english: 'Hope',
    portugese: 'Esperança'
  },
  {
    english: 'Poundable',
    portugese: 'Poundable'
  },
  {
    english: 'Farmer\'s pride',
    portugese: 'Orgulho do agricultor'
  },
  {
    english: 'Dixon',
    portugese: 'Dixon'
  },
  {
    english: 'Ayaya',
    portugese: 'Ayaya'
  },
  {
    english: 'Sunshine',
    portugese: 'Luz do sol'
  },
  {
    english: 'Fineface',
    portugese: 'Fineface'
  },
  {
    english: 'Kirimumpale',
    portugese: 'Kirimumpale'
  },
  {
    english: 'Magana',
    portugese: 'Magana'
  },
  {
    english: 'Abiriya',
    portugese: 'Abiriya'
  },
  {
    english: 'Sanje',
    portugese: 'Sanje'
  },
  {
    english: 'Njule',
    portugese: 'Njule'
  },
  {
    english: 'Bao, Alodo-alodo',
    portugese: 'Bao, Alodo-alodo'
  },
  {
    english: 'Bukalasa',
    portugese: 'Bukalasa'
  },
  {
    english: 'Fumba chai',
    portugese: 'Fumba chai'
  },
  {
    english: 'AKENA',
    portugese: 'AKENA'
  },
  {
    english: 'Royal quinoa',
    portugese: 'Quinoa real'
  },
  {
    english: 'Blanca de Junin',
    portugese: 'Blanca de Junin'
  },
  {
    english: 'Amarilla Marangani',
    portugese: 'Amarilla Marangani'
  },
  {
    english: 'Blanca de Juli',
    portugese: 'Blanca de Juli'
  },
  {
    english: 'Kankolla',
    portugese: 'Kankolla'
  },
  {
    english: 'Hulhuas',
    portugese: 'Hulhuas'
  },
  {
    english: 'Huacariz',
    portugese: 'Huacariz'
  },
  {
    english: 'Cheweca',
    portugese: 'Cheweca'
  },
  {
    english: 'Egyptian Pink',
    portugese: 'Rosa egípcia'
  },
  {
    english: 'Elephant',
    portugese: 'Elefante'
  },
  {
    english: 'Tuscan',
    portugese: 'Toscano'
  },
  {
    english: 'Endory',
    portugese: 'Endory'
  },
  {
    english: 'Raghiani',
    portugese: 'Raghiani'
  },
  {
    english: 'Rashli',
    portugese: 'Rashli'
  },
  {
    english: 'Jaminiya',
    portugese: 'Jaminiya'
  },
  {
    english: 'Sebha',
    portugese: 'Sebha'
  },
  {
    english: 'Barka',
    portugese: 'Barka'
  },
  {
    english: 'Zerda',
    portugese: 'Zerda'
  },
  {
    english: 'Fezzan',
    portugese: 'Fezzan'
  },
  {
    english: 'Mexicali',
    portugese: 'Mexicali'
  },
  {
    english: 'Masuli',
    portugese: 'Masuli'
  },
  {
    english: 'Khumal 4',
    portugese: 'Khumal 4'
  },
  {
    english: 'Ram',
    portugese: 'Ram'
  },
  {
    english: 'Khumal 8',
    portugese: 'Khumal 8'
  },
  {
    english: 'Janaki',
    portugese: 'Janaki'
  },
  {
    english: 'Judi',
    portugese: 'Judi'
  },
  {
    english: 'Supersweet',
    portugese: 'Supersweet'
  },
  {
    english: 'Deccan Hybrid',
    portugese: 'Deccan Hybrid'
  },
  {
    english: 'Ganga safed',
    portugese: 'Ganga safed'
  },
  {
    english: 'Hi-starch',
    portugese: 'Hi-starch'
  },
  {
    english: 'Paras',
    portugese: 'Paras'
  },
  {
    english: 'White star',
    portugese: 'Estrela branca'
  },
  {
    english: 'Western Queen',
    portugese: 'Western Queen'
  },
  {
    english: 'Up- to-Date',
    portugese: 'Atualizado'
  },
  {
    english: 'Pentland Dell',
    portugese: 'Pentland Dell'
  },
  {
    english: 'Pimpernel',
    portugese: 'Pimpernel'
  },
  {
    english: 'Majestic',
    portugese: 'Majestic'
  },
  {
    english: 'Baraka',
    portugese: 'Baraka'
  },
  {
    english: 'Challenger',
    portugese: 'Challenger'
  },
  {
    english: 'Courage',
    portugese: 'Coragem'
  },
  {
    english: 'Victoria',
    portugese: 'Vitória'
  },
  {
    english: 'Innovator',
    portugese: 'Inovador'
  },
  {
    english: 'Papa pastusa',
    portugese: 'Papa pastusa'
  },
  {
    english: 'Papa sabanera',
    portugese: 'Papa sabanera'
  },
  {
    english: 'Canchan',
    portugese: 'Canchan'
  },
  {
    english: 'Huaych’a',
    portugese: 'Huaych’a'
  },
  {
    english: 'Runapapa',
    portugese: 'Runapapa'
  },
  {
    english: 'Phureja roja',
    portugese: 'Phureja roja'
  },
  {
    english: 'Yuraj imilla',
    portugese: 'Yuraj imilla'
  },
  {
    english: 'Jaspe',
    portugese: 'Jaspe'
  },
  {
    english: 'India',
    portugese: 'Índia'
  },
  {
    english: 'ACC madam blue',
    portugese: 'ACC madam blue'
  },
  {
    english: 'Abbot',
    portugese: 'Abbot'
  },
  {
    english: 'Erika',
    portugese: 'Erika'
  },
  {
    english: 'Jazzy',
    portugese: 'Jazzy'
  },
  {
    english: 'Krone',
    portugese: 'Krone'
  },
  {
    english: 'Labella',
    portugese: 'Labella'
  },
  {
    english: 'Lady Amarilla',
    portugese: 'Lady Amarilla'
  },
  {
    english: 'Laperla',
    portugese: 'Laperla'
  },
  {
    english: 'Little giant',
    portugese: 'Pequeno gigante'
  },
  {
    english: 'Melody',
    portugese: 'Melodia'
  },
  {
    english: 'Musica',
    portugese: 'Música'
  },
  {
    english: 'Umatilla Russet',
    portugese: 'Umatilla Russet'
  },
  {
    english: 'Norland',
    portugese: 'Norland'
  },
  {
    english: 'Irish Cobbler',
    portugese: 'Cobbler irlandês'
  },
  {
    english: 'Moutain rose',
    portugese: 'Rosa da montanha'
  },
  {
    english: 'Cheiftan',
    portugese: 'Cheiftan'
  },
  {
    english: 'Viking',
    portugese: 'Viking'
  },
  {
    english: 'Elba',
    portugese: 'Elba'
  },
  {
    english: 'Red La soda',
    portugese: 'Red La soda'
  },
  {
    english: 'Lady Roseta',
    portugese: 'Lady Roseta'
  },
  {
    english: 'Jankdev',
    portugese: 'Jankdev'
  },
  {
    english: 'Khumal Bikas',
    portugese: 'Khumal Bikas'
  },
  {
    english: 'Ramsai',
    portugese: 'Ramsai'
  },
  {
    english: 'Golsai',
    portugese: 'Golsai'
  },
  {
    english: 'Saune',
    portugese: 'Saune'
  },
  {
    english: 'Bharlange',
    portugese: 'Bharlange'
  },
  {
    english: 'Jirmale',
    portugese: 'Jirmale'
  },
  {
    english: 'Dambersi',
    portugese: 'Dambersi'
  },
  {
    english: 'Ramala',
    portugese: 'Ramala'
  },
  {
    english: 'tukdah',
    portugese: 'tukdah'
  },
  {
    english: 'Copati',
    portugese: 'Copati'
  },
  {
    english: 'Kashi Amul',
    portugese: 'Kashi Amul'
  },
  {
    english: 'Kashi Adarsh',
    portugese: 'Kashi Adarsh'
  },
  {
    english: 'Kashi Abhiman',
    portugese: 'Kashi Abhiman'
  },
  {
    english: 'Kashi Anupam',
    portugese: 'Kashi Anupam'
  },
  {
    english: 'Kashi Sharad',
    portugese: 'Kashi Sharad'
  },
  {
    english: 'Kashi Hemant',
    portugese: 'Kashi Hemant'
  },
  {
    english: 'Kashi Amrit',
    portugese: 'Kashi Amrit'
  },
  {
    english: 'Kashi Vishesh',
    portugese: 'Kashi Vishesh'
  },
  {
    english: 'Vaishali',
    portugese: 'Vaishali'
  },
  {
    english: 'Rupali',
    portugese: 'Rupali'
  },
  {
    english: 'Rashmi',
    portugese: 'Rashmi'
  },
  {
    english: 'Rajni',
    portugese: 'Rajni'
  },
  {
    english: 'Sioux',
    portugese: 'Sioux'
  },
  {
    english: 'Best of All',
    portugese: 'O Melhor de Todos'
  },
  {
    english: 'Marglobe',
    portugese: 'Marglobe'
  },
  {
    english: 'Roma',
    portugese: 'Roma'
  },
  {
    english: 'Punjab Chuhra',
    portugese: 'Punjab Chuhra'
  },
  {
    english: 'Shivalik',
    portugese: 'Shivalik'
  },
  {
    english: 'Versha',
    portugese: 'Versha'
  },
  {
    english: 'Bravo',
    portugese: 'Bravo'
  },
  {
    english: 'Archana',
    portugese: 'Archana'
  },
  {
    english: 'Sadabahar',
    portugese: 'Sadabahar'
  },
  {
    english: 'Arka Ahuti',
    portugese: 'Arka Ahuti'
  },
  {
    english: 'Arka Abha',
    portugese: 'Arka Abha'
  },
  {
    english: 'Arka Meghali',
    portugese: 'Arka Meghali'
  },
  {
    english: 'Pant Bahar',
    portugese: 'Pant Bahar'
  },
  {
    english: 'Arka Saurabh',
    portugese: 'Arka Saurabh'
  },
  {
    english: 'Arka Alok',
    portugese: 'Arka Alok'
  },
  {
    english: 'Sea Island cotton',
    portugese: 'Algodão Sea Island'
  },
  {
    english: 'American Up-land cotton',
    portugese: 'Algodão Americano Up-land'
  },
  {
    english: 'Catui',
    portugese: 'Catui'
  },
  {
    english: 'Novo',
    portugese: 'Novo'
  },
  {
    english: 'Mundo',
    portugese: 'Mundo'
  },
  {
    english: 'Garnica',
    portugese: 'Garnica'
  },
  {
    english: 'Erecta',
    portugese: 'Erecta'
  },
  {
    english: 'Agaro',
    portugese: 'Agaro'
  },
  {
    english: 'Barbuk Sudan',
    portugese: 'Barbuk Sudão'
  },
  {
    english: 'Bedessa',
    portugese: 'Bedessa'
  },
  {
    english: 'Dega',
    portugese: 'Dega'
  },
  {
    english: 'H3',
    portugese: 'H3'
  },
  {
    english: 'native heirloom',
    portugese: 'nativo herdado'
  },
  {
    english: 'Rume Sudan',
    portugese: 'Rume Sudão'
  },
  {
    english: 'Sawa',
    portugese: 'Sawa'
  },
  {
    english: 'Tafari Kela',
    portugese: 'Tafari Kela'
  },
  {
    english: 'Andog sari',
    portugese: 'Andog sari'
  },
  {
    english: 'Ethiopian',
    portugese: 'Etíope'
  },
  {
    english: 'Linie S',
    portugese: 'Linie S'
  },
  {
    english: 'Castillo®',
    portugese: 'Castillo®'
  },
  {
    english: 'Catimor',
    portugese: 'Catimor'
  },
  {
    english: 'Typica',
    portugese: 'Typica'
  },
  {
    english: 'Catuai',
    portugese: 'Catuai'
  },
  {
    english: 'Moka',
    portugese: 'Moka'
  },
  {
    english: 'Culi',
    portugese: 'Culi'
  },
  {
    english: 'mara catura',
    portugese: 'mara catura'
  },
  {
    english: 'Poovan',
    portugese: 'Poovan'
  },
  {
    english: 'Monthan',
    portugese: 'Monthan'
  },
  {
    english: 'Rasthali',
    portugese: 'Rasthali'
  },
  {
    english: 'Nendran',
    portugese: 'Nendran'
  },
  {
    english: 'red banana',
    portugese: 'banana vermelha'
  },
  {
    english: 'grand naine',
    portugese: 'grande naine'
  },
  {
    english: 'Karpooravalli',
    portugese: 'Karpooravalli'
  },
  {
    english: 'yellow dwarf Bananas',
    portugese: 'Bananas anãs amarelas'
  },
  {
    english: 'Red dwarf Bananas',
    portugese: 'Bananas anãs vermelhas'
  },
  {
    english: 'green Bananas',
    portugese: 'Bananas verdes'
  },
  {
    english: 'Green',
    portugese: 'Verde'
  },
  {
    english: 'Black',
    portugese: 'Preto'
  },
  {
    english: 'Argene',
    portugese: 'Argene'
  },
  {
    english: 'Serkamo',
    portugese: 'Serkamo'
  },
  {
    english: 'S',
    portugese: 'S'
  },
  {
    english: 'Tate',
    portugese: 'Tate'
  },
  {
    english: 'Ahadu',
    portugese: 'Ahadu'
  },
  {
    english: 'Borkena',
    portugese: 'Borkena'
  },
  {
    english: 'Obsa',
    portugese: 'Obsa'
  },
  {
    english: 'Dicho',
    portugese: 'Dicho'
  },
  {
    english: 'Barsan',
    portugese: 'Barsan'
  },
  {
    english: 'Lidan',
    portugese: 'Lidan'
  },
  {
    english: 'Arkebe',
    portugese: 'Arkebe'
  },
  {
    english: 'Smrat',
    portugese: 'Smrat'
  },
  {
    english: 'Bonay',
    portugese: 'Bonay'
  },
  {
    english: 'Bhavani',
    portugese: 'Bhavani'
  },
  {
    english: 'Panchali',
    portugese: 'Panchali'
  },
  {
    english: 'Sangam',
    portugese: 'Sangam'
  },
  {
    english: 'Pakola',
    portugese: 'Pakola'
  },
  {
    english: 'Canola Raya',
    portugese: 'Canola Raya'
  },
  {
    english: 'Rainbow',
    portugese: 'Arco-íris'
  },
  {
    english: 'Amazon',
    portugese: 'Amazônia'
  },
  {
    english: 'Mercedes',
    portugese: 'Mercedes'
  },
  {
    english: 'Frontana',
    portugese: 'Frontana'
  },
  {
    english: 'Mentana',
    portugese: 'Mentana'
  },
  {
    english: 'Tucano',
    portugese: 'Tucano'
  },
  {
    english: 'Vacaria',
    portugese: 'Vacaria'
  },
  {
    english: 'Pavao',
    portugese: 'Pavão'
  },
  {
    english: 'Climax',
    portugese: 'Clímax'
  },
  {
    english: 'Richmond',
    portugese: 'Richmond'
  },
  {
    english: 'Rasant',
    portugese: 'Rasant'
  },
  {
    english: 'Timfo',
    portugese: 'Timfo'
  },
  {
    english: 'Alma',
    portugese: 'Alma'
  },
  {
    english: 'Basho',
    portugese: 'Basho'
  },
  {
    english: 'Bounty',
    portugese: 'Bounty'
  },
  {
    english: 'Champ',
    portugese: 'Champ'
  },
  {
    english: 'Comtal',
    portugese: 'Comtal'
  },
  {
    english: 'Tiller',
    portugese: 'Tiller'
  },
  {
    english: 'Clair',
    portugese: 'Clair'
  },
  {
    english: 'Barfleo',
    portugese: 'Barfleo'
  },
  {
    english: 'Kootenai',
    portugese: 'Kootenai'
  },
  {
    english: 'Barpenta',
    portugese: 'Barpenta'
  },
  {
    english: 'Toro',
    portugese: 'Toro'
  },
  {
    english: 'Mariposa',
    portugese: 'Mariposa'
  },
  {
    english: 'Champlain',
    portugese: 'Champlain'
  },
  {
    english: 'Finecut',
    portugese: 'Finecut'
  },
  {
    english: 'Gulfcut',
    portugese: 'Gulfcut'
  },
  {
    english: 'Pioneer',
    portugese: 'Pioneer'
  },
  {
    english: 'Reclaimar',
    portugese: 'Reclaimar'
  },
  {
    english: 'Salcut',
    portugese: 'Salcut'
  },
  {
    english: 'Topcut',
    portugese: 'Topcut'
  },
  {
    english: 'Boma',
    portugese: 'Boma'
  },
  {
    english: 'Callida',
    portugese: 'Callida'
  },
  {
    english: 'Elmba',
    portugese: 'Elmba'
  },
  {
    english: 'Marina',
    portugese: 'Marina'
  },
  {
    english: 'Sabre',
    portugese: 'Sabre'
  },
  {
    english: 'KP8',
    portugese: 'KP8'
  },
  {
    english: 'Nemcut',
    portugese: 'Nemcut'
  },
  {
    english: 'Asatsuyu',
    portugese: 'Asatsuyu'
  },
  {
    english: 'Katambora',
    portugese: 'Katambora'
  },
  {
    english: 'Tolgar',
    portugese: 'Tolgar'
  },
  {
    english: 'Egyptian giant',
    portugese: 'Gigante egípcio'
  },
  {
    english: 'Marmand',
    portugese: 'Marmand'
  },
  {
    english: 'Edkawy',
    portugese: 'Edkawy'
  },
  {
    english: 'Pakmor-b',
    portugese: 'Pakmor-b'
  },
  {
    english: 'Floradade',
    portugese: 'Floradade'
  },
  {
    english: 'Mountain fresh plus',
    portugese: 'Mountain fresh plus'
  },
  {
    english: 'Mountain spring',
    portugese: 'Mountain spring'
  },
  {
    english: 'Polbig',
    portugese: 'Polbig'
  },
  {
    english: 'Big beef',
    portugese: 'Big beef'
  },
  {
    english: 'Boxcar willie',
    portugese: 'Boxcar willie'
  },
  {
    english: 'Mortgage lifter',
    portugese: 'Mortgage lifter'
  },
  {
    english: 'Red pearl',
    portugese: 'Red pearl'
  },
  {
    english: 'Sun gold',
    portugese: 'Sun gold'
  },
  {
    english: 'Blackhawk',
    portugese: 'Blackhawk'
  },
  {
    english: 'Valentine',
    portugese: 'Valentine'
  },
  {
    english: 'Black eclipse',
    portugese: 'Black eclipse'
  },
  {
    english: 'Black bear',
    portugese: 'Black bear'
  },
  {
    english: 'Abdin',
    portugese: 'Abdin'
  },
  {
    english: 'Hadi ( Okra – leaf Barakat )',
    portugese: 'Hadi ( Okra – leaf Barakat )'
  },
  {
    english: 'Kheiralla',
    portugese: 'Kheiralla'
  },
  {
    english: 'Wager',
    portugese: 'Wager'
  },
  {
    english: 'Burhan',
    portugese: 'Burhan'
  },
  {
    english: 'Khalifa',
    portugese: 'Khalifa'
  },
  {
    english: 'Bukalasa pedigree albar',
    portugese: 'Bukalasa pedigree albar'
  },
  {
    english: 'Serere albar type uganda (satu)',
    portugese: 'Serere albar type uganda (satu)'
  },
  {
    english: 'Guaraní inta bgrr',
    portugese: 'Guaraní inta bgrr'
  },
  {
    english: 'Nuopal rr',
    portugese: 'Nuopal rr'
  },
  {
    english: 'Purnima',
    portugese: 'Purnima'
  },
  {
    english: 'Jaydhar',
    portugese: 'Jaydhar'
  },
  {
    english: 'Malgari',
    portugese: 'Malgari'
  },
  {
    english: 'Abhadita,',
    portugese: 'Abhadita'
  },
  {
    english: 'Catuai,',
    portugese: 'Catuai'
  },
  {
    english: 'Caturra,',
    portugese: 'Caturra'
  },
  {
    english: 'Geisha,',
    portugese: 'Geisha'
  },
  {
    english: 'Lempira,',
    portugese: 'Lempira'
  },
  {
    english: 'Hartman',
    portugese: 'Hartman'
  },
  {
    english: 'Girard',
    portugese: 'Girard'
  },
  {
    english: 'Finch',
    portugese: 'Finch'
  },
  {
    english: 'Saffire',
    portugese: 'Saffire'
  },
  {
    english: 'Centennial',
    portugese: 'Centennial'
  },
  {
    english: 'Montola',
    portugese: 'Montola'
  },
  {
    english: 'merah besar',
    portugese: 'merah besar'
  },
  {
    english: 'curly green chilli',
    portugese: 'curly green chilli'
  },
  {
    english: 'Red birds eye chilli',
    portugese: 'Red birds eye chilli'
  },
  {
    english: 'green birds eye',
    portugese: 'green birds eye'
  },
  {
    english: 'kanthari',
    portugese: 'kanthari'
  },
  {
    english: 'kashmiri chilli',
    portugese: 'kashmiri chilli'
  },
  {
    english: 'Bhagya lakshmi',
    portugese: 'Bhagya lakshmi'
  },
  {
    english: 'birds eye chilli (dhani)',
    portugese: 'birds eye chilli (dhani)'
  },
  {
    english: 'guntur chilli',
    portugese: 'guntur chilli'
  },
  {
    english: 'tomato chilli',
    portugese: 'tomato chilli'
  },
  {
    english: 'madras pari',
    portugese: 'madras pari'
  },
  {
    english: 'ramnad mundu',
    portugese: 'ramnad mundu'
  },
  {
    english: 'nagpur',
    portugese: 'nagpur'
  },
  {
    english: 'Crisphead',
    portugese: 'Crisphead'
  },
  {
    english: 'Butterhead',
    portugese: 'Butterhead'
  },
  {
    english: 'Romaine',
    portugese: 'Romaine'
  },
  {
    english: 'Loose leaf',
    portugese: 'Loose leaf'
  },
  {
    english: 'Frisbee',
    portugese: 'Frisbee'
  },
  {
    english: 'Radicchio',
    portugese: 'Radicchio'
  },
  {
    english: 'Oak leaf lettuce',
    portugese: 'Oak leaf lettuce'
  },
  {
    english: 'stem lettuce',
    portugese: 'stem lettuce'
  },
  {
    english: 'Arugula',
    portugese: 'Arugula'
  },
  {
    english: 'cress',
    portugese: 'cress'
  },
  {
    english: 'Endive',
    portugese: 'Endive'
  },
  {
    english: 'coral lettuce',
    portugese: 'coral lettuce'
  },
  {
    english: 'Mache',
    portugese: 'Mache'
  },
  {
    english: 'Boston',
    portugese: 'Boston'
  },
  {
    english: 'Ambon banana',
    portugese: 'Ambon banana'
  },
  {
    english: 'Barangan',
    portugese: 'Barangan'
  },
  {
    english: 'Kepok banana',
    portugese: 'Kepok banana'
  },
  {
    english: 'Mas banana',
    portugese: 'Mas banana'
  },
  {
    english: 'Cavendish',
    portugese: 'Cavendish'
  },
  {
    english: 'Lampung banana',
    portugese: 'Lampung banana'
  },
  {
    english: 'Awk banana',
    portugese: 'Awk banana'
  },
  {
    english: 'Champa',
    portugese: 'Champa'
  },
  {
    english: 'Ronit',
    portugese: 'Ronit'
  },
  {
    english: 'Sper Elad',
    portugese: 'Sper Elad'
  },
  {
    english: 'Trailblazer',
    portugese: 'Trailblazer'
  },
  {
    english: 'Vega',
    portugese: 'Vega'
  },
  {
    english: 'Candy',
    portugese: 'Candy'
  },
  {
    english: 'Exacta',
    portugese: 'Exacta'
  },
  {
    english: 'Red Sky',
    portugese: 'Red Sky'
  },
  {
    english: 'Redwing',
    portugese: 'Redwing'
  },
  {
    english: 'Bhima Shubhra',
    portugese: 'Bhima Shubhra'
  },
  {
    english: 'Brown Spanish',
    portugese: 'Brown Spanish'
  },
  {
    english: 'Punjab Naroya',
    portugese: 'Punjab Naroya'
  },
  {
    english: 'HERITAGE ENDURANCE',
    portugese: 'HERITAGE ENDURANCE'
  },
  {
    english: 'SARDI-GRAZER',
    portugese: 'SARDI-GRAZER'
  },
  {
    english: 'Tenera',
    portugese: 'Tenera'
  },
  {
    english: 'Golden acre',
    portugese: 'Golden acre'
  },
  {
    english: 'Danish ballhead',
    portugese: 'Danish ballhead'
  },
  {
    english: 'Kranti',
    portugese: 'Kranti'
  },
  {
    english: 'Manado Malay',
    portugese: 'Manado Malay'
  },
  {
    english: 'North Moluccan Malay',
    portugese: 'North Moluccan Malay'
  },
  {
    english: 'Ambon Malay',
    portugese: 'Ambon Malay'
  },
  {
    english: 'Banda Malay',
    portugese: 'Banda Malay'
  },
  {
    english: 'Lampong',
    portugese: 'Lampong'
  },
  {
    english: 'Muntok',
    portugese: 'Muntok'
  },
  {
    english: 'Sarawak pepper',
    portugese: 'Sarawak pepper'
  },
  {
    english: 'Jambi',
    portugese: 'Jambi'
  },
  {
    english: 'Baboon lemon',
    portugese: 'Baboon lemon'
  },
  {
    english: 'Brazilian sweet lemon',
    portugese: 'Brazilian sweet lemon'
  },
  {
    english: 'Bearss Lemons',
    portugese: 'Bearss Lemons'
  },
  {
    english: 'Punjab Baramasi',
    portugese: 'Punjab Baramasi'
  },
  {
    english: 'Punjab Galgal',
    portugese: 'Punjab Galgal'
  },
  {
    english: 'Lucknow seedless',
    portugese: 'Lucknow seedless'
  },
  {
    english: 'Pant Lemon (Seville)',
    portugese: 'Pant Lemon (Seville)'
  },
  {
    english: 'Lisbon lemon',
    portugese: 'Lisbon lemon'
  },
  {
    english: 'Jora tenga',
    portugese: 'Jora tenga'
  },
  {
    english: 'Rough lemon',
    portugese: 'Rough lemon'
  },
  {
    english: 'Nepali Round',
    portugese: 'Nepali Round'
  },
  {
    english: 'Chakradhar',
    portugese: 'Chakradhar'
  },
  {
    english: 'Rasraj',
    portugese: 'Rasraj'
  },
  {
    english: 'Red dwarf Bananas',
    portugese: 'Red dwarf Bananas'
  },
  {
    english: 'Baswant 780',
    portugese: 'Baswant 780'
  },
  {
    english: 'Hisar-2',
    portugese: 'Hisar-2'
  },
  {
    english: 'Pusa Ratnar',
    portugese: 'Pusa Ratnar'
  },
  {
    english: 'Pusa Red',
    portugese: 'Pusa Red'
  },
  {
    english: 'Pusa white flat',
    portugese: 'Pusa white flat'
  },
  {
    english: 'Pusa White Round',
    portugese: 'Pusa White Round'
  },
  {
    english: 'Udaipur -101',
    portugese: 'Udaipur -101'
  },
  {
    english: 'Udaipur -102',
    portugese: 'Udaipur -102'
  },
  {
    english: 'CoLk 94184 (Birendra)',
    portugese: 'CoLk 94184 (Birendra)'
  },
  {
    english: 'CoOr 03151(Sabita)',
    portugese: 'CoOr 03151(Sabita)'
  },
  {
    english: 'CGKusum-1',
    portugese: 'CGKusum-1'
  },
  {
    english: 'Malviya Kusum 305',
    portugese: 'Malviya Kusum 305'
  },
  {
    english: 'Nag-7',
    portugese: 'Nag-7'
  },
  {
    english: 'Nari 38',
    portugese: 'Nari 38'
  },
  {
    english: 'Phule Kusuma',
    portugese: 'Phule Kusuma'
  },
  {
    english: 'MY 5465',
    portugese: 'MY 5465'
  },
  {
    english: 'SP 701284',
    portugese: 'SP 701284'
  },
  {
    english: 'Adira 1',
    portugese: 'Adira 1'
  },
  {
    english: 'Adira 2',
    portugese: 'Adira 2'
  },
  {
    english: 'Adira 4',
    portugese: 'Adira 4'
  },
  {
    english: 'Malang 1',
    portugese: 'Malang 1'
  },
  {
    english: 'Malang 2',
    portugese: 'Malang 2'
  },
  {
    english: 'Malang 4',
    portugese: 'Malang 4'
  },
  {
    english: 'Casca roxa',
    portugese: 'Casca roxa'
  },
  {
    english: 'Mayombe',
    portugese: 'Mayombe'
  },
  {
    english: 'Musimwa',
    portugese: 'Musimwa'
  },
  {
    english: 'Obasanjo-2',
    portugese: 'Obasanjo-2'
  },
  {
    english: 'Baba 70',
    portugese: 'Baba 70'
  },
  {
    english: 'Nyaraboke',
    portugese: 'Nyaraboke'
  },
  {
    english: 'Karangwa',
    portugese: 'Karangwa'
  },
  {
    english: 'Kabiriti',
    portugese: 'Kabiriti'
  },
  {
    english: 'Mingoro',
    portugese: 'Mingoro'
  },
  {
    english: 'Kwatamumpale',
    portugese: 'Kwatamumpale'
  },
  {
    english: 'Ogwok',
    portugese: 'Ogwok'
  },
  {
    english: 'NASE 19',
    portugese: 'NASE 19'
  },
  {
    english: 'NAROCASS 1',
    portugese: 'NAROCASS 1'
  },
  {
    english: 'NAROCASS 2',
    portugese: 'NAROCASS 2'
  },
  {
    english: 'Inca red',
    portugese: 'Inca red'
  },
  {
    english: 'Rosada de Junin',
    portugese: 'Rosada de Junin'
  },
  {
    english: 'Mantaro',
    portugese: 'Mantaro'
  },
  {
    english: 'Rosada Taraco',
    portugese: 'Rosada Taraco'
  },
  {
    english: 'Mokhtar',
    portugese: 'Mokhtar'
  },
  {
    english: 'Sidi Masri',
    portugese: 'Sidi Masri'
  },
  {
    english: 'Zellaf',
    portugese: 'Zellaf'
  },
  {
    english: 'Kufra 1',
    portugese: 'Kufra 1'
  },
  {
    english: 'Merjawi',
    portugese: 'Merjawi'
  },
  {
    english: 'Buhut 103',
    portugese: 'Buhut 103'
  },
  {
    english: 'Embrapa 49',
    portugese: 'Embrapa 49'
  },
  {
    english: '6505 B',
    portugese: '6505 B'
  },
  {
    english: 'Chhommrong',
    portugese: 'Chhommrong'
  },
  {
    english: 'Lekali Dhan 3',
    portugese: 'Lekali Dhan 3'
  },
  {
    english: 'Radha 4',
    portugese: 'Radha 4'
  },
  {
    english: 'Sarju 52',
    portugese: 'Sarju 52'
  },
  {
    english: 'BP 1',
    portugese: 'BP 1'
  },
  {
    english: 'Agroceres 12',
    portugese: 'Agroceres 12'
  },
  {
    english: 'Ganga 4',
    portugese: 'Ganga 4'
  },
  {
    english: 'Ganga 7',
    portugese: 'Ganga 7'
  },
  {
    english: 'Rajendra hybrid makka 2',
    portugese: 'Rajendra hybrid makka 2'
  },
  {
    english: 'Kawanda Comp A',
    portugese: 'Kawanda Comp A'
  },
  {
    english: 'Papa criolla',
    portugese: 'Papa criolla'
  },
  {
    english: 'Criolla Sua Pa',
    portugese: 'Criolla Sua Pa'
  },
  {
    english: 'Criolla Dorada',
    portugese: 'Criolla Dorada'
  },
  {
    english: 'Qhoyllupapa',
    portugese: 'Qhoyllupapa'
  },
  {
    english: 'Qhenipapa',
    portugese: 'Qhenipapa'
  },
  {
    english: 'Wila imilla',
    portugese: 'Wila imilla'
  },
  {
    english: 'Chiar Imilla',
    portugese: 'Chiar Imilla'
  },
  {
    english: 'Sani imilla',
    portugese: 'Sani imilla'
  },
  {
    english: 'Russet Norkotah',
    portugese: 'Russet Norkotah'
  },
  {
    english: 'Ranger Russet',
    portugese: 'Ranger Russet'
  },
  {
    english: 'Red pontiac',
    portugese: 'Red pontiac'
  },
  {
    english: 'Kennebec',
    portugese: 'Kennebec'
  },
  {
    english: 'Yukon Gold',
    portugese: 'Yukon Gold'
  },
  {
    english: 'Kufri jyoti',
    portugese: 'Kufri jyoti'
  },
  {
    english: 'Kufri sindhuri',
    portugese: 'Kufri sindhuri'
  },
  {
    english: 'Kufri Chandramukhi',
    portugese: 'Kufri Chandramukhi'
  },
  {
    english: 'Kufri Pukhraj',
    portugese: 'Kufri Pukhraj'
  },
  {
    english: 'Kufri Khyati',
    portugese: 'Kufri Khyati'
  },
  {
    english: 'Kufri Arun',
    portugese: 'Kufri Arun'
  },
  {
    english: 'Kufri Surya',
    portugese: 'Kufri Surya'
  },
  {
    english: 'Kufri Kanchan',
    portugese: 'Kufri Kanchan'
  },
  {
    english: 'Kufri Bahar',
    portugese: 'Kufri Bahar'
  },
  {
    english: 'Kufri Megha',
    portugese: 'Kufri Megha'
  },
  {
    english: 'Khumal Upahar',
    portugese: 'Khumal Upahar'
  },
  {
    english: 'Khumal Seto-1',
    portugese: 'Khumal Seto-1'
  },
  {
    english: 'Chibesai',
    portugese: 'Chibesai'
  },
  {
    english: 'Tukdah-135',
    portugese: 'Tukdah-135'
  },
  {
    english: 'Tukdah- 383',
    portugese: 'Tukdah- 383'
  },
  {
    english: 'Tukdah-78',
    portugese: 'Tukdah-78'
  },
  {
    english: 'Happy Valley- 36',
    portugese: 'Happy Valley- 36'
  },
  {
    english: 'Thurbo 3',
    portugese: 'Thurbo 3'
  },
  {
    english: 'Sikkim 1',
    portugese: 'Sikkim 1'
  },
  {
    english: 'Rungli 144',
    portugese: 'Rungli 144'
  },
  {
    english: 'Kashi Aman',
    portugese: 'Kashi Aman'
  },
  {
    english: 'Pusa Ruby',
    portugese: 'Pusa Ruby'
  },
  {
    english: 'Pusa Early Dwarf',
    portugese: 'Pusa Early Dwarf'
  },
  {
    english: 'Co 1',
    portugese: 'Co 1'
  },
  {
    english: 'Arka Vikas ( Sel 22 )',
    portugese: 'Arka Vikas ( Sel 22 )'
  },
  {
    english: 'Arka Saurabh ( Sel - 4)',
    portugese: 'Arka Saurabh ( Sel - 4)'
  },
  {
    english: 'Arka Ahuti ( Sel 11 )',
    portugese: 'Arka Ahuti ( Sel 11 )'
  },
  {
    english: 'Arka Vardan ( FM hyb -2)',
    portugese: 'Arka Vardan ( FM hyb -2)'
  },
  {
    english: 'Arka Shreshta',
    portugese: 'Arka Shreshta'
  },
  {
    english: 'Round Pusa',
    portugese: 'Round Pusa'
  },
  {
    english: 'Pusa Hybrid -2',
    portugese: 'Pusa Hybrid -2'
  },
  {
    english: 'Pusa Red Plum',
    portugese: 'Pusa Red Plum'
  },
  {
    english: 'Solan Gola',
    portugese: 'Solan Gola'
  },
  {
    english: 'Pusa Gaurav',
    portugese: 'Pusa Gaurav'
  },
  {
    english: 'Narendra Tomato 1',
    portugese: 'Narendra Tomato 1'
  },
  {
    english: 'Narendra Tomato 2',
    portugese: 'Narendra Tomato 2'
  },
  {
    english: 'Selection 10',
    portugese: 'Selection 10'
  },
  {
    english: 'Abyssinia',
    portugese: 'Abyssinia'
  },
  {
    english: 'Geisha(1931)',
    portugese: 'Geisha(1931)'
  },
  {
    english: 'Geisha(1956)',
    portugese: 'Geisha(1956)'
  },
  {
    english: 'Kudhumi/ Kurume',
    portugese: 'Kudhumi/ Kurume'
  },
  {
    english: 'Miqe',
    portugese: 'Miqe'
  },
  {
    english: 'Bergundal',
    portugese: 'Bergundal'
  },
  {
    english: 'Andong Sari',
    portugese: 'Andong Sari'
  },
  {
    english: 'dwarf cavendish',
    portugese: 'dwarf cavendish'
  },
  {
    english: 'Neypoovan',
    portugese: 'Neypoovan'
  },
  {
    english: 'Vayal vazhai',
    portugese: 'Vayal vazhai'
  },
  {
    english: 'Oolong',
    portugese: 'Oolong'
  },
  {
    english: 'Adi',
    portugese: 'Adi'
  },
  {
    english: 'Abasena',
    portugese: 'Abasena'
  },
  {
    english: 'Kelafo-74',
    portugese: 'Kelafo-74'
  },
  {
    english: 'Mehado-80',
    portugese: 'Mehado-80'
  },
  {
    english: 'E',
    portugese: 'E'
  },
  {
    english: 'Humera-1',
    portugese: 'Humera-1'
  },
  {
    english: 'Setit-1',
    portugese: 'Setit-1'
  },
  {
    english: 'Shawarobit',
    portugese: 'Shawarobit'
  },
  {
    english: 'Pusa Vishal ML-818',
    portugese: 'Pusa Vishal ML-818'
  },
  {
    english: 'Vaibhav',
    portugese: 'Vaibhav'
  },
  {
    english: 'Pusa kalyani',
    portugese: 'Pusa kalyani'
  },
  {
    english: 'Patan 66',
    portugese: 'Patan 66'
  },
  {
    english: 'Gujrat sarsav - 1',
    portugese: 'Gujrat sarsav - 1'
  },
  {
    english: 'Qinyou- 10',
    portugese: 'Qinyou- 10'
  },
  {
    english: 'Amelando',
    portugese: 'Amelando'
  },
  {
    english: 'Trinitario',
    portugese: 'Trinitario'
  },
  {
    english: 'Tiiti',
    portugese: 'Tiiti'
  },
  {
    english: 'Hokuo',
    portugese: 'Hokuo'
  },
  {
    english: 'Zenyatta',
    portugese: 'Zenyatta'
  },
  {
    english: 'Mohawk',
    portugese: 'Mohawk'
  },
  {
    english: 'Nemkat',
    portugese: 'Nemkat'
  },
  {
    english: 'TV 23',
    portugese: 'TV 23'
  },
  {
    english: 'Black cat (06252)',
    portugese: 'Black cat (06252)'
  },
  {
    english: 'Barakat ( 90 )',
    portugese: 'Barakat ( 90 )'
  },
  {
    english: 'Barac ( 67 ) acala',
    portugese: 'Barac ( 67 ) acala'
  },
  {
    english: 'Siddig ( sudan pima)',
    portugese: 'Siddig ( sudan pima)'
  },
  {
    english: 'Siokra 1-4',
    portugese: 'Siokra 1-4'
  },
  {
    english: 'Bikaneri nerma',
    portugese: 'Bikaneri nerma'
  },
  {
    english: 'Eknath',
    portugese: 'Eknath'
  },
  {
    english: 'Khandwa–2',
    portugese: 'Khandwa–2'
  },
  {
    english: 'Badnawar–1',
    portugese: 'Badnawar–1'
  },
  {
    english: 'Supriya',
    portugese: 'Supriya'
  },
  {
    english: 'Oker',
    portugese: 'Oker'
  },
  {
    english: 'Erlin',
    portugese: 'Erlin'
  },
  {
    english: 'Cabai rawit',
    portugese: 'Cabai rawit'
  },
  {
    english: 'Cabai keriting',
    portugese: 'Cabai keriting'
  },
  {
    english: 'cayenne pepper(hottest chilli)',
    portugese: 'cayenne pepper(hottest chilli)'
  },
  {
    english: 'cabai ceremai',
    portugese: 'cabai ceremai'
  },
  {
    english: 'Bengkulu',
    portugese: 'Bengkulu'
  },
  {
    english: 'lembang',
    portugese: 'lembang'
  },
  {
    english: 'jwala',
    portugese: 'jwala'
  },
  {
    english: 'sangli sannam',
    portugese: 'sangli sannam'
  },
  {
    english: 'G.T.sannam',
    portugese: 'G.T.sannam'
  },
  {
    english: 'Bibb lettuce',
    portugese: 'alface Bibb'
  },
  {
    english: 'little gem lettuce',
    portugese: 'pequena alface gem'
  },
  {
    english: 'Raja bagus banana',
    portugese: 'banana Raja bagus'
  },
  {
    english: 'Jackfruit banana',
    portugese: 'banana Jackfruit'
  },
  {
    english: 'Ebenezer',
    portugese: 'Ebenezer'
  },
  {
    english: 'Mercury',
    portugese: 'Mercúrio'
  },
  {
    english: 'Bhima Super',
    portugese: 'Bhima Super'
  },
  {
    english: 'Bhima Dark Red',
    portugese: 'Bhima Vermelho Escuro'
  },
  {
    english: 'Bhima Shweta',
    portugese: 'Bhima Shweta'
  },
  {
    english: 'Pusa Madhv',
    portugese: 'Pusa Madhv'
  },
  {
    english: 'Raj 171',
    portugese: 'Raj 171'
  },
  {
    english: 'ALFAMASTER 10',
    portugese: 'ALFAMASTER 10'
  },
  {
    english: 'Titan5',
    portugese: 'Titan5'
  },
  {
    english: 'sf force11',
    portugese: 'sf force11'
  },
  {
    english: 'SARDI 10',
    portugese: 'SARDI 10'
  },
  {
    english: 'HERITAGE 10',
    portugese: 'HERITAGE 10'
  },
  {
    english: 'ALFAMASTER 11',
    portugese: 'ALFAMASTER 11'
  },
  {
    english: 'Jersey wakefield',
    portugese: 'Jersey wakefield'
  },
  {
    english: 'Pusa Drum Head',
    portugese: 'Pusa Drum Head'
  },
  {
    english: 'Pusa Mukta',
    portugese: 'Pusa Mukta'
  },
  {
    english: 'SAMSORG 45',
    portugese: 'SAMSORG 45'
  },
  {
    english: 'SAMSORG 46',
    portugese: 'SAMSORG 46'
  },
  {
    english: 'SAMSORG 47',
    portugese: 'SAMSORG 47'
  },
  {
    english: 'SAMSORG 48',
    portugese: 'SAMSORG 48'
  },
  {
    english: 'Kupang Malay',
    portugese: 'Kupang Malay'
  },
  {
    english: 'Dorshapo',
    portugese: 'Dorshapo'
  },
  {
    english: 'PAU Baramasi-1',
    portugese: 'PAU Baramasi-1'
  },
  {
    english: 'Gondhoraj',
    portugese: 'Gondhoraj'
  },
  {
    english: 'Pat Nebu',
    portugese: 'Pat Nebu'
  },
  {
    english: 'Kaji nemu',
    portugese: 'Kaji nemu'
  },
  {
    english: 'Gol nemu',
    portugese: 'Gol nemu'
  },
  {
    english: 'BO 128 (Pramod)',
    portugese: 'BO 128 (Pramod)'
  },
  {
    english: 'Co-1',
    portugese: 'Co-1'
  },
  {
    english: 'Co-2',
    portugese: 'Co-2'
  },
  {
    english: 'Granex 429',
    portugese: 'Granex 429'
  },
  {
    english: 'Granex 55',
    portugese: 'Granex 55'
  },
  {
    english: 'HA 60',
    portugese: 'HA 60'
  },
  {
    english: 'N 2-4-1',
    portugese: 'N 2-4-1'
  },
  {
    english: 'N-257-9-1',
    portugese: 'N-257-9-1'
  },
  {
    english: 'N-53',
    portugese: 'N-53'
  },
  {
    english: 'NHRDF Red',
    portugese: 'NHRDF Vermelho'
  },
  {
    english: 'NHRDF Red 2',
    portugese: 'NHRDF Vermelho 2'
  },
  {
    english: 'NHRDF Red3',
    portugese: 'NHRDF Vermelho 3'
  },
  {
    english: 'NHRDF Red4',
    portugese: 'NHRDF Vermelho 4'
  },
  {
    english: 'S-48',
    portugese: 'S-48'
  },
  {
    english: 'Tana F1',
    portugese: 'Tana F1'
  },
  {
    english: 'VL-3',
    portugese: 'VL-3'
  },
  {
    english: 'OC 671',
    portugese: 'OC 671'
  },
  {
    english: 'COC 771',
    portugese: 'COC 771'
  },
  {
    english: 'COC 772',
    portugese: 'COC 772'
  },
  {
    english: 'COC 773',
    portugese: 'COC 773'
  },
  {
    english: 'COC 8001 (C 66191)',
    portugese: 'COC 8001 (C 66191)'
  },
  {
    english: 'COC 774',
    portugese: 'COC 774'
  },
  {
    english: 'COC 775',
    portugese: 'COC 775'
  },
  {
    english: 'COC 776',
    portugese: 'COC 776'
  },
  {
    english: 'COC 777',
    portugese: 'COC 777'
  },
  {
    english: 'COC 778',
    portugese: 'COC 778'
  },
  {
    english: 'COC 779',
    portugese: 'COC 779'
  },
  {
    english: 'CO 419',
    portugese: 'CO 419'
  },
  {
    english: 'CO 6304',
    portugese: 'CO 6304'
  },
  {
    english: 'COC 8001',
    portugese: 'COC 8001'
  },
  {
    english: 'COC 85061',
    portugese: 'COC 85061'
  },
  {
    english: 'COC 86062',
    portugese: 'COC 86062'
  },
  {
    english: 'COSi 86071',
    portugese: 'COSi 86071'
  },
  {
    english: 'COC 90063',
    portugese: 'COC 90063'
  },
  {
    english: 'CO 8021',
    portugese: 'CO 8021'
  },
  {
    english: 'COC 91061',
    portugese: 'COC 91061'
  },
  {
    english: 'COC 92061',
    portugese: 'COC 92061'
  },
  {
    english: 'CO 8362',
    portugese: 'CO 8362'
  },
  {
    english: 'COG 93076',
    portugese: 'COG 93076'
  },
  {
    english: 'CO 8208',
    portugese: 'CO 8208'
  },
  {
    english: 'COG 94077',
    portugese: 'COG 94077'
  },
  {
    english: 'COG 95076',
    portugese: 'COG 95076'
  },
  {
    english: 'CO 85019',
    portugese: 'CO 85019'
  },
  {
    english: 'COSi 95071',
    portugese: 'COSi 95071'
  },
  {
    english: 'COSi 96071',
    portugese: 'COSi 96071'
  },
  {
    english: 'CO 86010',
    portugese: 'CO 86010'
  },
  {
    english: 'COC 98061',
    portugese: 'COC 98061'
  },
  {
    english: 'COSi 98071',
    portugese: 'COSi 98071'
  },
  {
    english: 'CO 86249',
    portugese: 'CO 86249'
  },
  {
    english: 'COC 99061',
    portugese: 'COC 99061'
  },
  {
    english: 'CO 86032',
    portugese: 'CO 86032'
  },
  {
    english: 'COC (SC) 22',
    portugese: 'COC (SC) 22'
  },
  {
    english: 'CO Si (SC) 6',
    portugese: 'CO Si (SC) 6'
  },
  {
    english: 'COG (SC) 5',
    portugese: 'COG (SC) 5'
  },
  {
    english: 'CoC 23',
    portugese: 'CoC 23'
  },
  {
    english: 'CoC 24',
    portugese: 'CoC 24'
  },
  {
    english: 'TNAU SC Si 7',
    portugese: 'TNAU SC Si 7'
  },
  {
    english: 'TNAU SC Si 8',
    portugese: 'TNAU SC Si 8'
  },
  {
    english: 'Co 0118 (Karan-2)',
    portugese: 'Co 0118 (Karan-2)'
  },
  {
    english: 'Co 0124 (Karan-5)',
    portugese: 'Co 0124 (Karan-5)'
  },
  {
    english: 'Co 0218 (Shreyas)',
    portugese: 'Co 0218 (Shreyas)'
  },
  {
    english: 'Co 0232 (Kamal)',
    portugese: 'Co 0232 (Kamal)'
  },
  {
    english: 'Co 0233 (Kosi)',
    portugese: 'Co 0233 (Kosi)'
  },
  {
    english: 'Co 0237 (Karan-8)',
    portugese: 'Co 0237 (Karan-8)'
  },
  {
    english: 'Co 0238 (Karan-4)',
    portugese: 'Co 0238 (Karan-4)'
  },
  {
    english: 'Co 0239 (Karan-6)',
    portugese: 'Co 0239 (Karan-6)'
  },
  {
    english: 'Co 0403 (Samriddhi)',
    portugese: 'Co 0403 (Samriddhi)'
  },
  {
    english: 'Co 05009 (Karan-10)',
    portugese: 'Co 05009 (Karan-10)'
  },
  {
    english: 'Co 05011 (Karan-9)',
    portugese: 'Co 05011 (Karan-9)'
  },
  {
    english: 'Co 06027',
    portugese: 'Co 06027'
  },
  {
    english: 'Co 06030',
    portugese: 'Co 06030'
  },
  {
    english: 'Co 09022 (Karan 12)',
    portugese: 'Co 09022 (Karan 12)'
  },
  {
    english: 'Co 2001-13 (Sulabh)',
    portugese: 'Co 2001-13 (Sulabh)'
  },
  {
    english: 'Co 2001-15 (Mangal)',
    portugese: 'Co 2001-15 (Mangal)'
  },
  {
    english: 'Co 8371 (Bhima)',
    portugese: 'Co 8371 (Bhima)'
  },
  {
    english: 'Co 85004 (Prabha)',
    portugese: 'Co 85004 (Prabha)'
  },
  {
    english: 'Co 86032 (Nayana)',
    portugese: 'Co 86032 (Nayana)'
  },
  {
    english: 'Co 86249 (Bhavani)',
    portugese: 'Co 86249 (Bhavani)'
  },
  {
    english: 'Co 87025 (Kalyani)',
    portugese: 'Co 87025 (Kalyani)'
  },
  {
    english: 'Co 87044 (Uttara)',
    portugese: 'Co 87044 (Uttara)'
  },
  {
    english: 'Co 87263 (Sarayu)',
    portugese: 'Co 87263 (Sarayu)'
  },
  {
    english: 'Co 87268 (Moti)',
    portugese: 'Co 87268 (Moti)'
  },
  {
    english: 'Co 89029 (Gandak)',
    portugese: 'Co 89029 (Gandak)'
  },
  {
    english: 'Co 91010 (Dhanush)',
    portugese: 'Co 91010 (Dhanush)'
  },
  {
    english: 'Co 94008 (Shyama)',
    portugese: 'Co 94008 (Shyama)'
  },
  {
    english: 'Co 98014 (Karan-1)',
    portugese: 'Co 98014 (Karan-1)'
  },
  {
    english: 'Co 99004 (Damodar)',
    portugese: 'Co 99004 (Damodar)'
  },
  {
    english: 'CoC 01061 (CoC (SC) 23)',
    portugese: 'CoC 01061 (CoC (SC) 23)'
  },
  {
    english: 'CoH 119 (Haryana Ganna - 119)',
    portugese: 'CoH 119 (Haryana Ganna - 119)'
  },
  {
    english: 'CoH 128',
    portugese: 'CoH 128'
  },
  {
    english: 'CoH 2201 (Haryana-92)',
    portugese: 'CoH 2201 (Haryana-92)'
  },
  {
    english: 'CoH 92201(Haryana-92)',
    portugese: 'CoH 92201(Haryana-92)'
  },
  {
    english: 'CoJ 20193 (CoJ 89)',
    portugese: 'CoJ 20193 (CoJ 89)'
  },
  {
    english: 'CoM 88121 (Krishna)',
    portugese: 'CoM 88121 (Krishna)'
  },
  {
    english: 'CoP 06436 (CoP 2061)',
    portugese: 'CoP 06436 (CoP 2061)'
  },
  {
    english: 'CoPant 90223 (Pant 90223)',
    portugese: 'CoPant 90223 (Pant 90223)'
  },
  {
    english: 'CoPant 97222',
    portugese: 'CoPant 97222'
  },
  {
    english: 'CoPk 05191 (Pratap Ganna-1)',
    portugese: 'CoPk 05191 (Pratap Ganna-1)'
  },
  {
    english: 'CoS 1230 (Raseeli)',
    portugese: 'CoS 1230 (Raseeli)'
  },
  {
    english: 'CoS 91230 (Raseeli)',
    portugese: 'CoS 91230 (Raseeli)'
  },
  {
    english: 'CoS 94270 (Sweta)',
    portugese: 'CoS 94270 (Sweta)'
  },
  {
    english: 'CoS 96268 (Mithas)',
    portugese: 'CoS 96268 (Mithas)'
  },
  {
    english: 'CoS 96275 (Sweety)',
    portugese: 'CoS 96275 (Sweety)'
  },
  {
    english: 'CoSe 01421 (Imarti)',
    portugese: 'CoSe 01421 (Imarti)'
  },
  {
    english: 'CoSe 92423 (Rajbhog)',
    portugese: 'CoSe 92423 (Rajbhog)'
  },
  {
    english: 'CoSe 95255 (Rachna)',
    portugese: 'CoSe 95255 (Rachna)'
  },
  {
    english: 'CoSe 95422 (Rasbhari)',
    portugese: 'CoSe 95422 (Rasbhari)'
  },
  {
    english: 'CoSe 96234 (Rashmi)',
    portugese: 'CoSe 96234 (Rashmi)'
  },
  {
    english: 'CoSe 96436 (Jalpari)',
    portugese: 'CoSe 96436 (Jalpari)'
  },
  {
    english: 'CoSnk 05103',
    portugese: 'CoSnk 05103'
  },
  {
    english: 'CoSnk 05104',
    portugese: 'CoSnk 05104'
  },
  {
    english: 'A-2',
    portugese: 'A-2'
  },
  {
    english: 'A-300',
    portugese: 'A-300'
  },
  {
    english: 'AKS-207',
    portugese: 'AKS-207'
  },
  {
    english: 'Annigeri-1(A-1)',
    portugese: 'Annigeri-1(A-1)'
  },
  {
    english: 'DSH-129',
    portugese: 'DSH-129'
  },
  {
    english: 'DSH-185',
    portugese: 'DSH-185'
  },
  {
    english: 'IGKV Kusum (RSS 2016-03)',
    portugese: 'IGKV Kusum (RSS 2016-03)'
  },
  {
    english: 'ISF-1',
    portugese: 'ISF-1'
  },
  {
    english: 'ISF-764',
    portugese: 'ISF-764'
  },
  {
    english: 'JSF-1',
    portugese: 'JSF-1'
  },
  {
    english: 'JSF-97',
    portugese: 'JSF-97'
  },
  {
    english: 'JSF-99',
    portugese: 'JSF-99'
  },
  {
    english: 'JSI-7',
    portugese: 'JSI-7'
  },
  {
    english: 'JSI-73',
    portugese: 'JSI-73'
  },
  {
    english: 'Lakshmi Priya (ISF 764)',
    portugese: 'Lakshmi Priya (ISF 764)'
  },
  {
    english: 'MKH-11',
    portugese: 'MKH-11'
  },
  {
    english: 'MRSA-521',
    portugese: 'MRSA-521'
  },
  {
    english: 'N-62-8',
    portugese: 'N-62-8'
  },
  {
    english: 'NARI-57',
    portugese: 'NARI-57'
  },
  {
    english: 'NARI-6',
    portugese: 'NARI-6'
  },
  {
    english: 'NARI-96',
    portugese: 'NARI-96'
  },
  {
    english: 'NARI-H-15',
    portugese: 'NARI-H-15'
  },
  {
    english: 'NARI-H-23',
    portugese: 'NARI-H-23'
  },
  {
    english: 'NARI-NH-1',
    portugese: 'NARI-NH-1'
  },
  {
    english: 'PBNS-12',
    portugese: 'PBNS-12'
  },
  {
    english: 'PBNS-40',
    portugese: 'PBNS-40'
  },
  {
    english: 'PKV-Pink',
    portugese: 'PKV-Pink'
  },
  {
    english: 'Pride (ISF 1)',
    portugese: 'Pride (ISF 1)'
  },
  {
    english: 'S-144',
    portugese: 'S-144'
  },
  {
    english: 'SSF-12-40',
    portugese: 'SSF-12-40'
  },
  {
    english: 'SSF-13-71',
    portugese: 'SSF-13-71'
  },
  {
    english: 'SSF-658',
    portugese: 'SSF-658'
  },
  {
    english: 'SSF-708',
    portugese: 'SSF-708'
  },
  {
    english: 'TSF-1',
    portugese: 'TSF-1'
  },
  {
    english: 'Type-6503',
    portugese: 'Type-6503'
  },
  {
    english: 'CC93-7711',
    portugese: 'CC93-7711'
  },
  {
    english: 'CC93-7510',
    portugese: 'CC93-7510'
  },
  {
    english: 'CC01-1940',
    portugese: 'CC01-1940'
  },
  {
    english: 'CC84-75',
    portugese: 'CC84-75'
  },
  {
    english: 'RD 7511',
    portugese: 'RD 7511'
  },
  {
    english: 'PR 61-632',
    portugese: 'PR 61-632'
  },
  {
    english: 'Co 421',
    portugese: 'Co 421'
  },
  {
    english: 'POJ-2878',
    portugese: 'POJ-2878'
  },
  {
    english: 'PR 11-41',
    portugese: 'PR 11-41'
  },
  {
    english: 'MZC 74-275',
    portugese: 'MZC 74-275'
  },
  {
    english: 'PR 62-66',
    portugese: 'PR 62-66'
  },
  {
    english: 'UB 1/2',
    portugese: 'UB 1/2'
  },
  {
    english: 'UB 15/10',
    portugese: 'UB 15/10'
  },
  {
    english: 'UB 881-5',
    portugese: 'UB 881-5'
  },
  {
    english: 'UB 477-2',
    portugese: 'UB 477-2'
  },
  {
    english: 'BRS Purus',
    portugese: 'BRS Purus'
  },
  {
    english: 'TME 419',
    portugese: 'TME 419'
  },
  {
    english: 'F100',
    portugese: 'F100'
  },
  {
    english: 'Gbasumenge',
    portugese: 'Gbasumenge'
  },
  {
    english: 'Ofumbachai',
    portugese: 'Ofumbachai'
  },
  {
    english: "Icilcil",
    portugese: "Icilcil"
  },
  {
    english: "Ebwanaterak",
    portugese: "Ebwanaterak"
  },
  {
    english: "NASE 14",
    portugese: "NASE 14"
  },
  {
    english: "NASE 3",
    portugese: "NASE 3"
  },
  {
    english: "NASE 1",
    portugese: "NASE 1"
  },
  {
    english: "Ccoito",
    portugese: "Ccoito"
  },
  {
    english: "Salcedo INIA",
    portugese: "Salcedo INIA"
  },
  {
    english: "Illpa INIA",
    portugese: "Illpa INIA"
  },
  {
    english: "INIA 415 - Pasankalla",
    portugese: "INIA 415 - Pasankalla"
  },
  {
    english: "INIA 420-Negra Collana",
    portugese: "INIA 420-Negra Collana"
  },
  {
    english: "INIA 427 - Amarilla",
    portugese: "INIA 427 - Amarilla"
  },
  {
    english: "INIA 431-Altiplano",
    portugese: "INIA 431-Altiplano"
  },
  {
    english: "INIA 441- Senor del Huerto",
    portugese: "INIA 441- Senor del Huerto"
  },
  {
    english: "13D843",
    portugese: "13D843"
  },
  {
    english: "14G498",
    portugese: "14G498"
  },
  {
    english: "13G519",
    portugese: "13G519"
  },
  {
    english: "BRS 213",
    portugese: "BRS 213"
  },
  {
    english: "BRS 282",
    portugese: "BRS 282"
  },
  {
    english: "SL 958",
    portugese: "SL 958"
  },
  {
    english: "SL 744",
    portugese: "SL 744"
  },
  {
    english: "SL 525",
    portugese: "SL 525"
  },
  {
    english: "DM6563 IPRO",
    portugese: "DM6563 IPRO"
  },
  {
    english: "DM 5958",
    portugese: "DM 5958"
  },
  {
    english: "22-61 RY",
    portugese: "22-61 RY"
  },
  {
    english: "P005T13R",
    portugese: "P005T13R"
  },
  {
    english: "NSC Leroy RR2Y",
    portugese: "NSC Leroy RR2Y"
  },
  {
    english: "UA 5612",
    portugese: "UA 5612"
  },
  {
    english: "JTN 5503",
    portugese: "JTN 5503"
  },
  {
    english: "AG 6534",
    portugese: "AG 6534"
  },
  {
    english: "BMX Garra",
    portugese: "BMX Garra"
  },
  {
    english: "BMX Icone",
    portugese: "BMX Icone"
  },
  {
    english: "Monsoy M5892",
    portugese: "Monsoy M5892"
  },
  {
    english: "AFS 110RR",
    portugese: "AFS 110RR"
  },
  {
    english: "TMG 7262 RR",
    portugese: "TMG 7262 RR"
  },
  {
    english: "BRS 284",
    portugese: "BRS 284"
  },
  {
    english: "BRS 267",
    portugese: "BRS 267"
  },
  {
    english: "Chianung 242",
    portugese: "Chianung 242"
  },
  {
    english: "CH 45",
    portugese: "CH 45"
  },
  {
    english: "RH 245",
    portugese: "RH 245"
  },
  {
    english: "Bisi 222",
    portugese: "Bisi 222"
  },
  {
    english: "NK 7328",
    portugese: "NK 7328"
  },
  {
    english: "PV 61177 SRR",
    portugese: "PV 61177 SRR"
  },
  {
    english: "PV 61180 RIB",
    portugese: "PV 61180 RIB"
  },
  {
    english: "TH6079 VT2P",
    portugese: "TH6079 VT2P"
  },
  {
    english: "PV 60172 RR",
    portugese: "PV 60172 RR"
  },
  {
    english: "Agroceres 303",
    portugese: "Agroceres 303"
  },
  {
    english: "C 929",
    portugese: "C 929"
  },
  {
    english: "Himalayan 123",
    portugese: "Himalayan 123"
  },
  {
    english: "C6006",
    portugese: "C6006"
  },
  {
    english: "Col 17",
    portugese: "Col 17"
  },
  {
    english: "Dl 507",
    portugese: "Dl 507"
  },
  {
    english: "N 7822",
    portugese: "N 7822"
  },
  {
    english: "SRM 553",
    portugese: "SRM 553"
  },
  {
    english: "T7677 VT2P",
    portugese: "T7677 VT2P"
  },
  {
    english: "T2889 CONV",
    portugese: "T2889 CONV"
  },
  {
    english: "T6107 VT2P",
    portugese: "T6107 VT2P"
  },
  {
    english: "UH 615",
    portugese: "UH 615"
  },
  {
    english: "H 517",
    portugese: "H 517"
  },
  {
    english: "Longe 1",
    portugese: "Longe 1"
  },
  {
    english: "Longe 4",
    portugese: "Longe 4"
  },
  {
    english: "Longe 6H",
    portugese: "Longe 6H"
  },
  {
    english: "Longe 8H",
    portugese: "Longe 8H"
  },
  {
    english: "PAN 67",
    portugese: "PAN 67"
  },
  {
    english: "DK 8051",
    portugese: "DK 8051"
  },
  {
    english: "DK 803 1",
    portugese: "DK 803 1"
  },
  {
    english: "UH 5402",
    portugese: "UH 5402"
  },
  {
    english: "WE 2101",
    portugese: "WE 2101"
  },
  {
    english: "PAN 7 M - 89",
    portugese: "PAN 7 M - 89"
  },
  {
    english: "BPI",
    portugese: "BPI"
  },
  {
    english: "R12",
    portugese: "R12"
  },
  {
    english: "Criolla Ocarina",
    portugese: "Criolla Ocarina"
  },
  {
    english: "Luk’ys Ch’oqhepitus",
    portugese: "Luk’ys Ch’oqhepitus"
  },
  {
    english: "AAC Shirley",
    portugese: "AAC Shirley"
  },
  {
    english: "AAC Canada Gold Doree",
    portugese: "AAC Canada Gold Doree"
  },
  {
    english: "Russet Burbank",
    portugese: "Russet Burbank"
  },
  {
    english: "MS 42.3",
    portugese: "MS 42.3"
  },
  {
    english: "IPY -8",
    portugese: "IPY -8"
  },
  {
    english: "Ct First",
    portugese: "Ct First"
  },
  {
    english: "PV 40",
    portugese: "PV 40"
  },
  {
    english: "PV 1",
    portugese: "PV 1"
  },
  {
    english: "AV 2",
    portugese: "AV 2"
  },
  {
    english: "Dannock durn 668",
    portugese: "Dannock durn 668"
  },
  {
    english: "Dannock durn 777",
    portugese: "Dannock durn 777"
  },
  {
    english: "Pusa 120",
    portugese: "Pusa 120"
  },
  {
    english: "S-152",
    portugese: "S-152"
  },
  {
    english: "HS 102",
    portugese: "HS 102"
  },
  {
    english: "Arka Ashish ( IIHR - 674 )",
    portugese: "Arka Ashish ( IIHR - 674 )"
  },
  {
    english: "Arka Abha ( BWR 1)",
    portugese: "Arka Abha ( BWR 1)"
  },
  {
    english: "Arka Alok ( BER - 5 )",
    portugese: "Arka Alok ( BER - 5 )"
  },
  {
    english: "Arka Vishal ( FM HYB -1)",
    portugese: "Arka Vishal ( FM HYB -1)"
  },
  {
    english: "Arka Abhijit ( BRH 2)",
    portugese: "Arka Abhijit ( BRH 2)"
  },
  {
    english: "HS101",
    portugese: "HS101"
  },
  {
    english: "Pusa Hybrid - 4",
    portugese: "Pusa Hybrid - 4"
  },
  {
    english: "Pant T-10",
    portugese: "Pant T-10"
  },
  {
    english: "Pant T-3",
    portugese: "Pant T-3"
  },
  {
    english: "AC-238",
    portugese: "AC-238"
  },
  {
    english: "SL 28",
    portugese: "SL 28"
  },
  {
    english: "SL 14",
    portugese: "SL 14"
  },
  {
    english: "KP 423",
    portugese: "KP 423"
  },
  {
    english: "selection 9/Sln.9/S.2790",
    portugese: "selection 9/Sln.9/S.2790"
  },
  {
    english: "Selection 7.3/Sln.7.3",
    portugese: "Selection 7.3/Sln.7.3"
  },
  {
    english: "Selection 6/Sln.6",
    portugese: "Selection 6/Sln.6"
  },
  {
    english: "Selection 4/Sln.4",
    portugese: "Selection 4/Sln.4"
  },
  {
    english: "S288",
    portugese: "S288"
  },
  {
    english: "jember S795",
    portugese: "jember S795"
  },
  {
    english: "cioccie / Choche",
    portugese: "cioccie / Choche"
  },
  {
    english: "USDA/USDA762",
    portugese: "USDA/USDA762"
  },
  {
    english: "Hibrido de Timor (HDT) Tim Tim",
    portugese: "Hibrido de Timor (HDT) Tim Tim"
  },
  {
    english: "303/577 tea clone",
    portugese: "303/577 tea clone"
  },
  {
    english: "6/8 tea clone",
    portugese: "6/8 tea clone"
  },
  {
    english: "31/8 tea clone",
    portugese: "31/8 tea clone"
  },
  {
    english: "108/82 tea clone",
    portugese: "108/82 tea clone"
  },
  {
    english: "100/5 tea clone.",
    portugese: "100/5 tea clone."
  },
  {
    english: "CC 85-92",
    portugese: "CC 85-92"
  },
  {
    english: "CC 84-75",
    portugese: "CC 84-75"
  },
  {
    english: "V 71-51",
    portugese: "V 71-51"
  },
  {
    english: "CC 93-3895",
    portugese: "CC 93-3895"
  },
  {
    english: "CC 93-4418",
    portugese: "CC 93-4418"
  },
  {
    english: "CC 92-2198",
    portugese: "CC 92-2198"
  },
  {
    english: "CC 93-7510",
    portugese: "CC 93-7510"
  },
  {
    english: "CC 92-2804",
    portugese: "CC 92-2804"
  },
  {
    english: "CC 87-434",
    portugese: "CC 87-434"
  },
  {
    english: "CC 93-4181",
    portugese: "CC 93-4181"
  },
  {
    english: "CC 93-3826",
    portugese: "CC 93-3826"
  },
  {
    english: "CC 87-505",
    portugese: "CC 87-505"
  },
  {
    english: "CC 85-57",
    portugese: "CC 85-57"
  },
  {
    english: "CC 85-47",
    portugese: "CC 85-47"
  },
  {
    english: "CC 92-2154",
    portugese: "CC 92-2154"
  },
  {
    english: "CC 92-2188",
    portugese: "CC 92-2188"
  },
  {
    english: "CC 93-3817",
    portugese: "CC 93-3817"
  },
  {
    english: "CC 93-7711",
    portugese: "CC 93-7711"
  },
  {
    english: "CC 01-1940",
    portugese: "CC 01-1940"
  },
  {
    english: "PR 1141",
    portugese: "PR 1141"
  },
  {
    english: "CC 86-45",
    portugese: "CC 86-45"
  },
  {
    english: "sjkjkjk",
    portugese: "sjkjkjk"
  },
  {
    english: "xyz",
    portugese: "xyz"
  },
  {
    english: "T-85",
    portugese: "T-85"
  },
  {
    english: "MH-97-6(Boreda)",
    portugese: "MH-97-6(Boreda)"
  },
  {
    english: "Rasa N - 26",
    portugese: "Rasa N - 26"
  },
  {
    english: "NLV- 1",
    portugese: "NLV- 1"
  },
  {
    english: "Narendra Mung-1 LGG-460",
    portugese: "Narendra Mung-1 LGG-460"
  },
  {
    english: "SML-668",
    portugese: "SML-668"
  },
  {
    english: "RMG-492",
    portugese: "RMG-492"
  },
  {
    english: "IPM-02-3",
    portugese: "IPM-02-3"
  },
  {
    english: "HUM-16",
    portugese: "HUM-16"
  },
  {
    english: "AKM-4",
    portugese: "AKM-4"
  },
  {
    english: "PKV-Green Gold",
    portugese: "PKV-Green Gold"
  },
  {
    english: "AKM-8802",
    portugese: "AKM-8802"
  },
  {
    english: "BRSMG Camaleao",
    portugese: "BRSMG Camaleao"
  },
  {
    english: "Ouro Verde MG 2",
    portugese: "Ouro Verde MG 2"
  },
  {
    english: "BRSMG Camaleao",
    portugese: "BRSMG Camaleao"
  },
  {
    english: "Ouro Verde MG 2",
    portugese: "Ouro Verde MG 2"
  },
  {
    english: "GSL - 1",
    portugese: "GSL - 1"
  },
  {
    english: "HNS - 3",
    portugese: "HNS - 3"
  },
  {
    english: "PBN - 9501",
    portugese: "PBN - 9501"
  },
  {
    english: "PBN - 9502",
    portugese: "PBN - 9502"
  },
  {
    english: "PBN - 2001",
    portugese: "PBN - 2001"
  },
  {
    english: "GSL - 441",
    portugese: "GSL - 441"
  },
  {
    english: "HNS - 4",
    portugese: "HNS - 4"
  },
  {
    english: "Fengyou - 737",
    portugese: "Fengyou - 737"
  },
  {
    english: "Youyan - 10",
    portugese: "Youyan - 10"
  },
  {
    english: "CS 117",
    portugese: "CS 117"
  },
  {
    english: "CS 123",
    portugese: "CS 123"
  },
  {
    english: "CS 141",
    portugese: "CS 141"
  },
  {
    english: "CATIE-R1",
    portugese: "CATIE-R1"
  },
  {
    english: "CATIE-R4",
    portugese: "CATIE-R4"
  },
  {
    english: "CC-137",
    portugese: "CC-137"
  },
  {
    english: "ICS-95 T1",
    portugese: "ICS-95 T1"
  },
  {
    english: "PMCT-58",
    portugese: "PMCT-58"
  },
  {
    english: "CRIN TC-2",
    portugese: "CRIN TC-2"
  },
  {
    english: "CRIN TC-1",
    portugese: "CRIN TC-1"
  },
  {
    english: "CRIN TC-3",
    portugese: "CRIN TC-3"
  },
  {
    english: "CRIN TC-5",
    portugese: "CRIN TC-5"
  },
  {
    english: "BH 1146",
    portugese: "BH 1146"
  },
  {
    english: "Esmeralda 86",
    portugese: "Esmeralda 86"
  },
  {
    english: "JF 90",
    portugese: "JF 90"
  },
  {
    english: "BR 18 Terena",
    portugese: "BR 18 Terena"
  },
  {
    english: "Itasca",
    portugese: "Itasca"
  },
  {
    english: "Bottinia II",
    portugese: "Bottinia II"
  },
  {
    english: "Winnetou",
    portugese: "Winnetou"
  },
  {
    english: "AmeriStand 201T",
    portugese: "AmeriStand 201T"
  },
  {
    english: "AmeriStand 435TQ RR",
    portugese: "AmeriStand 435TQ RR"
  },
  {
    english: "AmeriStand 318TQ",
    portugese: "AmeriStand 318TQ"
  },
  {
    english: "AmeriStand 419LH Brand",
    portugese: "AmeriStand 419LH Brand"
  },
  {
    english: "AmeriStand 420LH RR Brand",
    portugese: "AmeriStand 420LH RR Brand"
  },
  {
    english: "AmeriStand 480 HVXRR",
    portugese: "AmeriStand 480 HVXRR"
  },
  {
    english: "AmeriStand 481 HVXRR",
    portugese: "AmeriStand 481 HVXRR"
  },
  {
    english: "AmeriStand 445NT",
    portugese: "AmeriStand 445NT"
  },
  {
    english: "AmeriStand 457TQ RR",
    portugese: "AmeriStand 457TQ RR"
  },
  {
    english: "AmeriStand 415NT RR",
    portugese: "AmeriStand 415NT RR"
  },
  {
    english: "AmeriStand 416NT RR",
    portugese: "AmeriStand 416NT RR"
  },
  {
    english: "AmeriStand 427TQ",
    portugese: "AmeriStand 427TQ"
  },
  {
    english: "AmeriStand 446NT",
    portugese: "AmeriStand 446NT"
  },
  {
    english: "AmeriStand 428TQ",
    portugese: "AmeriStand 428TQ"
  },
  {
    english: "AmeriStand 455TQ RR",
    portugese: "AmeriStand 455TQ RR"
  },
  {
    english: "AmeriStand 518NT",
    portugese: "AmeriStand 518NT"
  },
  {
    english: "KP4",
    portugese: "KP4"
  },
  {
    english: "KG2",
    portugese: "KG2"
  },
  {
    english: "TV1",
    portugese: "TV1"
  },
  {
    english: "TV14",
    portugese: "TV14"
  },
  {
    english: "TV16",
    portugese: "TV16"
  },
  {
    english: "TV17",
    portugese: "TV17"
  },
  {
    english: "TV20",
    portugese: "TV20"
  },
  {
    english: "TV22",
    portugese: "TV22"
  },
  {
    english: "UPASI 9  (Arthrey)",
    portugese: "UPASI 9  (Arthrey)"
  },
  {
    english: "UPASI 1 (Ever green)",
    portugese: "UPASI 1 (Sempre Verde)"
  },
  {
    english: "UPASI 10 (Pandian)",
    portugese: "UPASI 10 (Pandian)"
  },
  {
    english: "UPASI 14 (Singara)",
    portugese: "UPASI 14 (Singara)"
  },
  {
    english: "UPASI 2 (Jayaram)",
    portugese: "UPASI 2 (Jayaram)"
  },
  {
    english: "UPASI 17 (Swarna)",
    portugese: "UPASI 17 (Swarna)"
  },
  {
    english: "UPASI 24",
    portugese: "UPASI 24"
  },
  {
    english: "UPASI 25",
    portugese: "UPASI 25"
  },
  {
    english: "UPASI 16",
    portugese: "UPASI 16"
  },
  {
    english: "UPASI 27",
    portugese: "UPASI 27"
  },
  {
    english: "UPASI 28 (UPASI 10 * TRI2025)",
    portugese: "UPASI 28 (UPASI 10 * TRI2025)"
  },
  {
    english: "Cheyenne e448",
    portugese: "Cheyenne e448"
  },
  {
    english: "Gs 12",
    portugese: "Gs 12"
  },
  {
    english: "Nairouz (th 99806)",
    portugese: "Nairouz (th 99806)"
  },
  {
    english: "Tomaland (th 01308)",
    portugese: "Tomaland (th 01308)"
  },
  {
    english: "Tyrmes",
    portugese: "Tyrmes"
  },
  {
    english: "S.209",
    portugese: "S.209"
  },
  {
    english: "Ppp.1-2",
    portugese: "Ppp.1-2"
  },
  {
    english: "Roc-1",
    portugese: "Roc-1"
  },
  {
    english: "Ss33",
    portugese: "Ss33"
  },
  {
    english: "S.q-5",
    portugese: "S.q-5"
  },
  {
    english: "Pet-8",
    portugese: "Pet-8"
  },
  {
    english: "End-1",
    portugese: "End-1"
  },
  {
    english: "Eur.2-2",
    portugese: "Eur.2-2"
  },
  {
    english: "Vf-145",
    portugese: "Vf-145"
  },
  {
    english: "Ucx-281",
    portugese: "Ucx-281"
  },
  {
    english: "Bhn 589 (v ff t)*",
    portugese: "Bhn 589 (v ff t)*"
  },
  {
    english: "Celebrity (v ff n t a st)",
    portugese: "Celebrity (v ff n t a st)"
  },
  {
    english: "Albar ( 57 ) 12 and acrain",
    portugese: "Albar ( 57 ) 12 and acrain"
  },
  {
    english: "Hamid ( bb - 82)",
    portugese: "Hamid ( bb - 82)"
  },
  {
    english: "Knight ( bb - 90)",
    portugese: "Knight ( bb - 90)"
  },
  {
    english: "Bgrr y guaraní inta bgrr",
    portugese: "Bgrr y guaraní inta bgrr"
  },
  {
    english: "Pora 3 inta bgrr",
    portugese: "Pora 3 inta bgrr"
  },
  {
    english: "Guazuncho 4 inta bgrr",
    portugese: "Guazuncho 4 inta bgrr"
  },
  {
    english: "Guazuncho 2000 rr",
    portugese: "Guazuncho 2000 rr"
  },
  {
    english: "Dp402 bgrr",
    portugese: "Dp402 bgrr"
  },
  {
    english: "Dp1238 bgrr",
    portugese: "Dp1238 bgrr"
  },
  {
    english: "Siokra l23",
    portugese: "Siokra l23"
  },
  {
    english: "Siokra v-16",
    portugese: "Siokra v-16"
  },
  {
    english: "Sicala v-2",
    portugese: "Sicala v-2"
  },
  {
    english: "Cs50",
    portugese: "Cs50"
  },
  {
    english: "Sicot 189",
    portugese: "Sicot 189"
  },
  {
    english: "Sicot f-1",
    portugese: "Sicot f-1"
  },
  {
    english: "Cnpa ita 90",
    portugese: "Cnpa ita 90"
  },
  {
    english: "Brs ita 96",
    portugese: "Brs ita 96"
  },
  {
    english: "Cnpa ita 97",
    portugese: "Cnpa ita 97"
  },
  {
    english: "Brs antares",
    portugese: "Brs antares"
  },
  {
    english: "Brs 286",
    portugese: "Brs 286"
  },
  {
    english: "Brs ita⁄ba",
    portugese: "Brs ita⁄ba"
  },
  {
    english: "Brs sucupira",
    portugese: "Brs sucupira"
  },
  {
    english: "Dp 1646 b2xf",
    portugese: "Dp 1646 b2xf"
  },
  {
    english: "Dp 1840 b3xf",
    portugese: "Dp 1840 b3xf"
  },
  {
    english: "Dp 1820 b3xf",
    portugese: "Dp 1820 b3xf"
  },
  {
    english: "Dp 1845 b3xf",
    portugese: "Dp 1845 b3xf"
  },
  {
    english: "Ng 5711 b3xf",
    portugese: "Ng 5711 b3xf"
  },
  {
    english: "Ng 3406 b2xf",
    portugese: "Ng 3406 b2xf"
  },
  {
    english: "Ng 4545 b2xf",
    portugese: "Ng 4545 b2xf"
  },
  {
    english: "Ng 4936",
    portugese: "Ng 4936"
  },
  {
    english: "B3xf",
    portugese: "B3xf"
  },
  {
    english: "Phy 400",
    portugese: "Phy 400"
  },
  {
    english: "Phy 444 wrf",
    portugese: "Phy 444 wrf"
  },
  {
    english: "Phy 480 w3fe",
    portugese: "Phy 480 w3fe"
  },
  {
    english: "Phy 350 w3fe",
    portugese: "Phy 350 w3fe"
  },
  {
    english: "W3fe",
    portugese: "W3fe"
  },
  {
    english: "Lh 900",
    portugese: "Lh 900"
  },
  {
    english: "F414",
    portugese: "F414"
  },
  {
    english: "F 505",
    portugese: "F 505"
  },
  {
    english: "H 777",
    portugese: "H 777"
  },
  {
    english: "RS–810",
    portugese: "RS–810"
  },
  {
    english: "G-cot –12",
    portugese: "G-cot –12"
  },
  {
    english: "MCU– 5VT",
    portugese: "MCU– 5VT"
  },
  {
    english: "LK–861",
    portugese: "LK–861"
  },
  {
    english: "IHCAFE-90",
    portugese: "IHCAFE-90"
  },
  {
    english: "S-541",
    portugese: "S-541"
  },
  {
    english: "S-200",
    portugese: "S-200"
  },
  {
    english: "S-400",
    portugese: "S-400"
  },
  {
    english: "LBGB-77",
    portugese: "LBGB-77"
  },
  {
    english: "RIO DULCE INTA",
    portugese: "RIO DULCE INTA"
  },
  {
    english: "IPORA GUAZU",
    portugese: "IPORA GUAZU"
  },
  {
    english: "LBH-8-INTA",
    portugese: "LBH-8-INTA"
  },
  {
    english: "LB-66-INTA",
    portugese: "LB-66-INTA"
  },
  {
    english: "S-208",
    portugese: "S-208"
  },
  {
    english: "C\/W 4440",
    portugese: "C\/W 4440"
  },
  {
    english: "S-317",
    portugese: "S-317"
  },
  {
    english: "Mt.3697",
    portugese: "Mt.3697"
  },
  {
    english: "Cabai gendot",
    portugese: "Cabai gendot"
  },
  {
    english: "cabai katokkon",
    portugese: "cabai katokkon"
  },
  {
    english: "cabai domba",
    portugese: "cabai domba"
  },
  {
    english: "cabai hiyung",
    portugese: "cabai hiyung"
  },
  {
    english: "lampung",
    portugese: "lampung"
  },
  {
    english: "jalapeno",
    portugese: "jalapeno"
  },
  {
    english: "co1",
    portugese: "co1"
  },
  {
    english: "k1",
    portugese: "k1"
  },
  {
    english: "hindupur-s7",
    portugese: "hindupur-s7"
  },
  {
    english: "tadappally",
    portugese: "tadappally"
  },
  {
    english: "sattur-s4",
    portugese: "sattur-s4"
  },
  {
    english: "Batavia lettuce",
    portugese: "Alface Batávia"
  },
  {
    english: "pisang",
    portugese: "pisang"
  },
  {
    english: "RB867515",
    portugese: "RB867515"
  },
  {
    english: "RB966928",
    portugese: "RB966928"
  },
  {
    english: "SP81-3250",
    portugese: "SP81-3250"
  },
  {
    english: "Yellow Queen F1",
    portugese: "Yellow Queen F1"
  },
  {
    english: "N-2-4-1",
    portugese: "N-2-4-1"
  },
  {
    english: "S-148",
    portugese: "S-148"
  },
  {
    english: "PHB 2884",
    portugese: "PHB 2884"
  },
  {
    english: "PHB 2168",
    portugese: "PHB 2168"
  },
  {
    english: "PSB 164",
    portugese: "PSB 164"
  },
  {
    english: "PCB 164",
    portugese: "PCB 164"
  },
  {
    english: "Stamina gt5",
    portugese: "Stamina gt5"
  },
  {
    english: "titan7",
    portugese: "titan7"
  },
  {
    english: "303/557 clone",
    portugese: "303/557 clone"
  },
  {
    english: "11/4 clone",
    portugese: "11/4 clone"
  },
  {
    english: "108/82 clone",
    portugese: "108/82 clone"
  },
  {
    english: "7/9 clone",
    portugese: "7/9 clone"
  },
  {
    english: "100/5 clone",
    portugese: "100/5 clone"
  },
  {
    english: "31/8 clone",
    portugese: "31/8 clone"
  },
  {
    english: "12/19 clone",
    portugese: "12/19 clone"
  },
  {
    english: "12/12 clone",
    portugese: "12/12 clone"
  },
  {
    english: "6/8 clone",
    portugese: "6/8 clone"
  },
  {
    english: "6/10 clone",
    portugese: "6/10 clone"
  },
  {
    english: "31/11 clone",
    portugese: "31/11 clone"
  },
  {
    english: "Nyelungkup",
    portugese: "Nyelungkup"
  },
  {
    english: "PAU Baramasi",
    portugese: "PAU Baramasi"
  },
  {
    english: "Tillering stage",
    portugese: "Estágio de perfilhamento"
  },
  {
    english: "Stem elongation",
    portugese: "Alongamento do caule"
  },
  {
    english: "Panicle initiation",
    portugese: "Iniciação de panícula"
  },
  {
    english: "Booting stage",
    portugese: "Estágio de emborrachamento"
  },
  {
    english: "Flowering stage",
    portugese: "Estágio de floração"
  },
  {
    english: "Milking stage",
    portugese: "Estágio de ordenha"
  },
  {
    english: "Dough stage",
    portugese: "Estágio de massa"
  },
  {
    english: "Mature stage",
    portugese: "Estágio de maturação"
  },
  {
    english: "Ramsai",
    portugese: "Ramsai"
  },
  {
    english: "Golsai",
    portugese: "Golsai"
  },
  {
    english: "Chibesai",
    portugese: "Chibesai"
  },
  {
    english: "Saune",
    portugese: "Saune"
  },
  {
    english: "Bharlange",
    portugese: "Bharlange"
  },
  {
    english: "Jirmale",
    portugese: "Jirmale"
  },
  {
    english: "Dambersi",
    portugese: "Dambersi"
  },
  {
    english: "Ramala",
    portugese: "Ramala"
  },
  {
    english: "TV 23",
    portugese: "TV 23"
  },
  {
    english: "UPASI 9 (Arthrey)",
    portugese: "UPASI 9 (Arthrey)"
  },
  {
    english: "UPASI 1 (Ever green)",
    portugese: "UPASI 1 (Ever green)"
  },
  {
    english: "UPASI 10 (Pandian)",
    portugese: "UPASI 10 (Pandian)"
  },
  {
    english: "UPASI 14 (Singara)",
    portugese: "UPASI 14 (Singara)"
  },
  {
    english: "UPASI 2 (Jayaram)",
    portugese: "UPASI 2 (Jayaram)"
  },
  {
    english: "UPASI 17 (Swarna)",
    portugese: "UPASI 17 (Swarna)"
  },
  {
    english: 'Masuli',
    portugese: 'Masuli'
  },
  {
    english: 'Khumal 4',
    portugese: 'Khumal 4'
  },
  {
    english: 'Ram',
    portugese: 'Ram'
  },
  {
    english: 'Khumal 8',
    portugese: 'Khumal 8'
  },
  {
    english: 'Chhommrong',
    portugese: 'Chhommrong'
  },
  {
    english: 'Lekali Dhan 3',
    portugese: 'Lekali Dhan 3'
  },
  {
    english: 'Radha 4',
    portugese: 'Radha 4'
  },
  {
    english: 'Janaki',
    portugese: 'Janaki'
  },
  {
    english: 'Judi',
    portugese: 'Judi'
  },
  {
    english: 'Sarju 52',
    portugese: 'Sarju 52'
  },
  {
    english: 'Kufri jyoti',
    portugese: 'Kufri jyoti'
  },
  {
    english: 'Kufri sindhuri',
    portugese: 'Kufri sindhuri'
  },
  {
    english: 'Khumal Upahar',
    portugese: 'Khumal Upahar'
  },
  {
    english: 'Jankdev',
    portugese: 'Jankdev'
  },
  {
    english: 'Khumal Seto-1',
    portugese: 'Khumal Seto-1'
  },
  {
    english: 'Khumal Bikas',
    portugese: 'Khumal Bikas'
  },
  {
    english: 'Birendra sagar',
    portugese: 'Birendra sagar'
  },
  {
    english: 'Palpa',
    portugese: 'Palpa'
  },
  {
    english: 'Dhankuta ',
    portugese: 'Dhankuta'
  },
  {
    english: 'Taplejung ',
    portugese: 'Taplejung'
  },
  {
    english: 'Diktel ',
    portugese: 'Diktel'
  },
  {
    english: 'Basrai dwarf',
    portugese: 'Basrai dwarf'
  },
  {
    english: 'dwarf cavendish',
    portugese: 'dwarf cavendish'
  },
  {
    english: 'william hybrid',
    portugese: 'william hybrid'
  },
  {
    english: 'malbhog',
    portugese: 'malbhog'
  },
  {
    english: 'dhusre',
    portugese: 'dhusre'
  },
  {
    english: 'mungre',
    portugese: 'mungre'
  },
  {
    english: 'marche',
    portugese: 'marche'
  },
  {
    english: 'dhose',
    portugese: 'dhose'
  },
  {
    english: 'hazari',
    portugese: 'hazari'
  },
  {
    english: 'Kathmandu local',
    portugese: 'Kathmandu local'
  },
  {
    english: 'Pahilo Surjo',
    portugese: 'Pahilo Surjo'
  },
  {
    english: 'SS-72 (Super Shakti 72)',
    portugese: 'SS-72 (Super Shakti 72)'
  },
  {
    english: 'KFSH-1 (Kanchan F1)',
    portugese: 'KFSH-1 (Kanchan F1)'
  },
  {
    english: 'Poshilo makai jawa',
    portugese: 'Poshilo makai jawa'
  },
  {
    english: 'Srijan-1',
    portugese: 'Srijan-1'
  },
  {
    english: 'Srijan-2',
    portugese: 'Srijan-2'
  },
  {
    english: 'Srijan-3',
    portugese: 'Srijan-3'
  },
  {
    english: 'Srijan-4',
    portugese: 'Srijan-4'
  },
  {
    english: 'Madhuri',
    portugese: 'Madhuri'
  },
  {
    english: 'Kalyan ',
    portugese: 'Kalyan'
  },
  {
    english: 'Pratiksha ',
    portugese: 'Pratiksha'
  },
  {
    english: 'Pratigya',
    portugese: 'Pratigya'
  },
  {
    english: 'Zinc Gahun 2',
    portugese: 'Zinc Gahun 2'
  },
  {
    english: 'Bheri-Ganga',
    portugese: 'Bheri-Ganga'
  },
  {
    english: 'Himganga',
    portugese: 'Himganga'
  },
  {
    english: 'Khumal-Shakti',
    portugese: 'Khumal-Shakti'
  },
  {
    english: 'Borlaug 2020',
    portugese: 'Borlaug 2020'
  },
  {
    english: 'Pusa Ruby',
    portugese: 'Pusa Ruby'
  },
  {
    english: 'Arka Abha:',
    portugese: 'Arka Abha:'
  },
  {
    english: 'Srijana',
    portugese: 'Srijana'
  },
  {
    english: 'Roma VF',
    portugese: 'Roma VF'
  },
  {
    english: 'Nepali Oxheart',
    portugese: 'Nepali Oxheart'
  },
  {
    english: 'Lisbon',
    portugese: 'Lisbon'
  },
  {
    english: 'Nepali Round',
    portugese: 'Nepali Round'
  },
  {
    english: 'Nibuwa',
    portugese: 'Nibuwa'
  },
  {
    english: 'Eureka',
    portugese: 'Eureka'
  },
  {
    english: 'Citron',
    portugese: 'Citron'
  },
  {
    english: 'Jhambiri (rough lemon)',
    portugese: 'Jhambiri (rough lemon)'
  },
  {
    english: 'Nepali oblong',
    portugese: 'Nepali oblong'
  },
  {
    english: 'Nepal',
    portugese: 'Nepal'
  },
  {
    english: 'India',
    portugese: 'Índia'
  },
  {
    english: 'Soil and Climatic Requirements',
    portugese: 'Requisitos do solo e do clima'
  },
  {
    english: 'Hadi ( okra - leaf barakat )',
    portugese: 'Hadi ( quiabo - folha barakat )'
  },
  {
    english: 'Khandwa-2',
    portugese: 'Khandwa-2'
  },
  {
    english: 'Badnawar-1',
    portugese: 'Badnawar-1'
  },
  {
    english: 'Rs-810',
    portugese: 'Rs-810'
  },
  {
    english: 'G-cot -12',
    portugese: 'G-cot -12'
  },
  {
    english: 'Mcu- 5vt',
    portugese: 'Mcu- 5vt'
  },
  {
    english: 'Lk-861',
    portugese: 'Lk-861'
  },
  {
    english: 'TV 1',
    portugese: 'TV 1'
  },
  {
    english: 'Kopati 1',
    portugese: 'Kopati 1'
  },
  {
    english: 'C x R',
    portugese: 'C x R'
  },
  {
    english: 'Bourbon\/ moka',
    portugese: 'Bourbon\/ moka'
  },
  {
    english: 'karpoora poovan',
    portugese: 'karpoora poovan'
  },
  {
    english: 'Basrai',
    portugese: 'Basrai'
  },
  {
    english: 'Singapuri',
    portugese: 'Singapuri'
  },
  {
    english: 'Chakrakeli',
    portugese: 'Chakrakeli'
  },
  {
    english: 'Mundo Nova (Silang Typica-Bourbon from Brazil)',
    portugese: 'Mundo Nova (Silang Typica-Bourbon do Brasil)'
  },
  {
    english: 'Catimor Lines (Andungsari Ateng Jaluk Kartika\/Catuai\/Katai - mix breed arabica-robusta).',
    portugese: 'Linhas de Catimor (Andungsari Ateng Jaluk Kartika\/Catuai\/Katai - mistura de café arábica-robusta)'
  },
  {
    english: 'Maran',
    portugese: 'Maran'
  },
  {
    english: 'Nadia',
    portugese: 'Nadia'
  },
  {
    english: 'Karakkal',
    portugese: 'Karakkal'
  },
  {
    english: 'Ernad Chernad',
    portugese: 'Ernad Chernad'
  },
  {
    english: 'China',
    portugese: 'China'
  },
  {
    english: 'Rio-De-Janeiro',
    portugese: 'Rio de Janeiro'
  },
  {
    english: 'Sleeva Local',
    portugese: 'Sleeva Local'
  },
  {
    english: 'Narasapattam',
    portugese: 'Narasapattam'
  },
  {
    english: 'Varadha',
    portugese: 'Varadha'
  },
  {
    english: 'Himachal',
    portugese: 'Himachal'
  },
  {
    english: 'IISR',
    portugese: 'IISR'
  },
  {
    english: 'Dusehri',
    portugese: 'Dusehri'
  },
  {
    english: 'Alphanso',
    portugese: 'Alphanso'
  },
  {
    english: 'LANGRA',
    portugese: 'LANGRA'
  },
  {
    english: 'Amarpali',
    portugese: 'Amarpali'
  },
  {
    english: 'Mallika',
    portugese: 'Mallika'
  },
  {
    english: 'Bombay green',
    portugese: 'Bombay verde'
  },
  {
    english: 'Fazli',
    portugese: 'Fazli'
  },
  {
    english: 'Samarbehisht  Chausa',
    portugese: 'Samarbehisht Chausa'
  },
  {
    english: 'Neelam',
    portugese: 'Neelam'
  },
  {
    english: 'Sindhu',
    portugese: 'Sindhu'
  },
  {
    english: 'Arka aruna',
    portugese: 'Arka aruna'
  },
  {
    english: 'Arka Puneet',
    portugese: 'Arka Puneet'
  },
  {
    english: 'Early kunwar',
    portugese: 'Early kunwar'
  },
  {
    english: 'Early Synthetic',
    portugese: 'Early Synthetic'
  },
  {
    english: 'Pusa Katki',
    portugese: 'Pusa Katki'
  },
  {
    english: 'Pant Gobhi-2',
    portugese: 'Pant Gobhi-2'
  },
  {
    english: 'Pant Gobhi-3',
    portugese: 'Pant Gobhi-3'
  },
  {
    english: 'Pusa Synthetic',
    portugese: 'Pusa Synthetic'
  },
  {
    english: 'Pant Shubhra',
    portugese: 'Pant Shubhra'
  },
  {
    english: 'Punjab Giant-26',
    portugese: 'Punjab Giant-26'
  },
  {
    english: 'Pusa Snowball-1',
    portugese: 'Pusa Snowball-1'
  },
  {
    english: 'Pusa Snowball-2',
    portugese: 'Pusa Snowball-2'
  },
  {
    english: 'Sonwball-16',
    portugese: 'Sonwball-16'
  },
  {
    english: 'Dania Kalimpong',
    portugese: 'Dania Kalimpong'
  },
  {
    english: 'BUCK MAXIFLOR',
    portugese: 'BUCK MAXIFLOR'
  },
  {
    english: 'SURSEM ORION',
    portugese: 'SURSEM ORION'
  },
  {
    english: 'Light Speckled Kidney Bean',
    portugese: 'Light Speckled Kidney Bean'
  },
  {
    english: 'Dark Red Kidney Bean',
    portugese: 'Dark Red Kidney Bean'
  },
  {
    english: 'Pink Kidney Bean',
    portugese: 'Pink Kidney Bean'
  },
  {
    english: 'Yellow Kidney Beans',
    portugese: 'Yellow Kidney Beans'
  },
  {
    english: 'Malviya - 137',
    portugese: 'Malviya - 137'
  },
  {
    english: 'Arun',
    portugese: 'Arun'
  },
  {
    english: 'VL Rajma 125',
    portugese: 'VL Rajma 125'
  },
  {
    english: 'Arka Komal',
    portugese: 'Arka Komal'
  },
  {
    english: 'Ooty-1',
    portugese: 'Ooty-1'
  },
  {
    english: 'Pusa Himalatha',
    portugese: 'Pusa Himalatha'
  },
  {
    english: 'Pusa Parvati',
    portugese: 'Pusa Parvati'
  },
  {
    english: 'Phule Surekha',
    portugese: 'Phule Surekha'
  },
  {
    english: 'Pusa majesty',
    portugese: 'Pusa majesty'
  },
  {
    english: 'Pusa giant',
    portugese: 'Pusa giant'
  },
  {
    english: 'Pusa delcious',
    portugese: 'Pusa delcious'
  },
  {
    english: 'Pusa drawf',
    portugese: 'Pusa drawf'
  },
  {
    english: 'Coorg honey',
    portugese: 'Coorg honey'
  },
  {
    english: 'Honey dew',
    portugese: 'Honey dew'
  },
  {
    english: 'Golden queen',
    portugese: 'Golden queen'
  },
  {
    english: 'Amasya beyazı',
    portugese: 'Amasya beyazı'
  },
  {
    english: 'Antep karası',
    portugese: 'Antep karası'
  },
  {
    english: 'Bahceli karas',
    portugese: 'Bahceli karas'
  },
  {
    english: 'Cavus',
    portugese: 'Cavus'
  },
  {
    english: 'Cevsen',
    portugese: 'Cevsen'
  },
  {
    english: 'Crimson',
    portugese: 'Crimson'
  },
  {
    english: 'Dimrit',
    portugese: 'Dimrit'
  },
  {
    english: 'Hafizali',
    portugese: 'Hafizali'
  },
  {
    english: 'Karasabi',
    portugese: 'Karasabi'
  },
  {
    english: 'Yamuna Safed-2',
    portugese: 'Yamuna Safed-2'
  },
  {
    english: 'Bhima Omkar',
    portugese: 'Bhima Omkar'
  },
  {
    english: 'Godavari',
    portugese: 'Godavari'
  },
  {
    english: 'Baswant',
    portugese: 'Baswant'
  },
  {
    english: 'Lahsun 2',
    portugese: 'Lahsun 2'
  },
  {
    english: 'Eva',
    portugese: 'Eva'
  },
  {
    english: 'Gala',
    portugese: 'Gala'
  },
  {
    english: 'Fuji',
    portugese: 'Fuji'
  },
  {
    english: 'Honeycrisp',
    portugese: 'Honeycrisp'
  },
  {
    english: 'Red Delicious',
    portugese: 'Red Delicious'
  },
  {
    english: 'Vitoria',
    portugese: 'Vitoria'
  },
  {
    english: 'Timpson',
    portugese: 'Timpson'
  },
  {
    english: 'Red globe',
    portugese: 'Red globe'
  },
  {
    english: 'Italia',
    portugese: 'Italia'
  },
  {
    english: 'Thampson',
    portugese: 'Thampson'
  },
  {
    english: 'Crimson red',
    portugese: 'Crimson red'
  },
  {
    english: 'Zinc Gahun 1',
    portugese: 'Zinco Gahun 1'
  },
  {
    english: 'Ghaiya-3',
    portugese: 'Ghaiya-3'
  },
  {
    english: 'Hardinath-4',
    portugese: 'Hardinath-4'
  },
  {
    english: 'Hardinath-5',
    portugese: 'Hardinath-5'
  },
  {
    english: 'Hardinath-6',
    portugese: 'Hardinath-6'
  },
  {
    english: 'Khumal Basmati-16',
    portugese: 'Khumal Basmati-16'
  },
  {
    english: 'Ganga Sagar-1',
    portugese: 'Ganga Sagar-1'
  },
  {
    english: 'Ganga Sagar-2',
    portugese: 'Ganga Sagar-2'
  },
  {
    english: 'Cardinal',
    portugese: 'Cardinal'
  },
  {
    english: 'Khumal Ujjwol',
    portugese: 'Khumal Ujjwol'
  },
  {
    english: 'Bajhang local',
    portugese: 'Bajhang local'
  },
  {
    english: 'Kalyan',
    portugese: 'Kalyan'
  },
  {
    english: 'Pratiksha',
    portugese: 'Pratiksha'
  },
  {
    english: 'Dhankuta',
    portugese: 'Dhankuta'
  },
  {
    english: 'Taplejung',
    portugese: 'Taplejung'
  },
  {
    english: 'Diktel',
    portugese: 'Diktel'
  },
  {
    english: 'Navel orange',
    portugese: 'Laranja de umbigo'
  },
  {
    english: 'Blood orange',
    portugese: 'Laranja sanguínea'
  },
  {
    english: 'Tanjerine',
    portugese: 'Tangerina'
  },
  {
    english: 'Acid less orange',
    portugese: 'Laranja sem ácido'
  },
  {
    english: 'Mandarin',
    portugese: 'Mandarim'
  },
  {
    english: 'Seville orange',
    portugese: 'Laranja Sevilha'
  },
  {
    english: 'Bahia',
    portugese: 'Bahia'
  },
  {
    english: 'Patan red',
    portugese: 'Vermelho Patan'
  },
  {
    english: 'Nuwakot Local',
    portugese: 'Local de Nuwakot'
  },
  {
    english: 'White Globe',
    portugese: 'Globo Branco'
  },
  {
    english: 'Castillo®',
    portugese: 'Castillo®'
  },
  {
    english: 'tukdah 246',
    portugese: 'tukdah 246'
  },
  {
    english: 'CP First',
    portugese: 'CP Primeiro'
  },
  {
    english: 'Tv 14',
    portugese: 'Tv 14'
  },
  {
    english: 'Bannock Burn 668',
    portugese: 'Bannock Burn 668'
  },
  {
    english: 'Bannock Burn 777',
    portugese: 'Bannock Burn 777'
  },
  {
    english: 'TRS1',
    portugese: 'TRS1'
  },
  {
    english: 'TR14',
    portugese: 'TR14'
  },
  {
    english: 'TR15',
    portugese: 'TR15'
  },
  {
    english: 'Matti',
    portugese: 'Matti'
  },
  {
    english: 'Typica (Bergandal Sidikalang - Sumatera).',
    portugese: 'Typica (Bergandal Sidikalang - Sumatera).'
  },
  {
    english: 'Hibrido de Timor (HDT Cross breed Arabica-Robusta; Tim-tim Aceh)',
    portugese: 'Híbrido de Timor (HDT Cruzamento de Arábica-Robusta; Tim-tim Aceh)'
  },
  {
    english: 'Linie S (S-288 S-795 Andungsari Komasti; Aceh Flores)',
    portugese: 'Linie S (S-288 S-795 Andungsari Komasti; Aceh Flores)'
  },
  {
    english: 'Ethiopian lines (Rambung Abyssina USDA)',
    portugese: 'Linhas Etíopes (Rambung Abyssina USDA)'
  },
  {
    english: 'Jawa (Java Coffee !700AD)',
    portugese: 'Jawa (Café Java! 700AD)'
  },
  {
    english: 'Wynad Local',
    portugese: 'Local de Wynad'
  },
  {
    english: 'Punjab Giant-35',
    portugese: 'Gigante de Punjab-35'
  },
  {
    english: 'VANDERHAVE VDH 480',
    portugese: 'VANDERHAVE VDH 480'
  },
  {
    english: 'NIDERA PARADISE 6',
    portugese: 'Paraíso NIDERA 6'
  },
  {
    english: 'DEKALB DEKASOL 3881',
    portugese: 'DEKALB DEKASOL 3881'
  },
  {
    english: 'Carioca Kidney Bean (IAC 1850)',
    portugese: 'Feijão Carioca (IAC 1850)'
  },
  {
    english: 'P.D.R -14 (Uday)',
    portugese: 'P.D.R -14 (Uday)'
  },
  {
    english: 'V.L - 63',
    portugese: 'V.L - 63'
  },
  {
    english: 'Ambar (I.I.P.R -96-4)',
    portugese: 'Ambar (I.I.P.R -96-4)'
  },
  {
    english: 'Utkarsh (I.I.P.R - 98-5)',
    portugese: 'Utkarsh (I.I.P.R - 98-5)'
  },
  {
    english: 'RBL 6',
    portugese: 'RBL 6'
  },
  {
    english: 'YCD1',
    portugese: 'YCD1'
  },
  {
    english: 'TKD1',
    portugese: 'TKD1'
  },
  {
    english: 'Pant Anupama* (UPF 191)',
    portugese: 'Pant Anupama* (UPF 191)'
  },
  {
    english: 'Co2',
    portugese: 'Co2'
  },
  {
    english: 'Co3',
    portugese: 'Co3'
  },
  {
    english: 'Co4',
    portugese: 'Co4'
  },
  {
    english: 'Erenkoy beyazı',
    portugese: 'Erenkoy beyazı'
  },
  {
    english: 'TSH 565',
    portugese: 'TSH 565'
  },
  {
    english: 'ICS 95',
    portugese: 'ICS 95'
  },
  {
    english: 'BMI 67',
    portugese: 'BMI 67'
  },
  {
    english: 'IMC 67',
    portugese: 'IMC 67'
  },
  {
    english: 'ICS 1',
    portugese: 'ICS 1'
  },
  {
    english: 'ICS 6',
    portugese: 'ICS 6'
  },
  {
    english: 'ICS 39',
    portugese: 'ICS 39'
  },
  {
    english: 'UF 667',
    portugese: 'UF 667'
  },
  {
    english: 'PG 18',
    portugese: 'PG 18'
  },
  {
    english: 'BRS ISIS',
    portugese: 'BRS ISIS'
  },
  {
    english: 'BRS NUBIA',
    portugese: 'BRS NUBIA'
  },
  {
    english: 'CSV 21S',
    portugese: 'CSV 21S'
  },
  {
    english: 'CSV 23R',
    portugese: 'CSV 23R'
  },
  {
    english: 'NM 92',
    portugese: 'NM 92'
  },
  {
    english: 'NM 94',
    portugese: 'NM 94'
  },
  {
    english: 'VC 6372',
    portugese: 'VC 6372'
  },
  {
    english: 'VC 3960 - 80',
    portugese: 'VC 3960 - 80'
  },
  {
    english: 'CN9-5',
    portugese: 'CN9-5'
  },
  {
    english: 'VC6173 B -10',
    portugese: 'VC6173 B -10'
  },
  {
    english: 'VC1973A',
    portugese: 'VC1973A'
  },
  {
    english: 'VC6173B-11',
    portugese: 'VC6173B-11'
  },
  {
    english: 'VC6173A',
    portugese: 'VC6173A'
  },
  {
    english: 'Wheat (Nepal)',
    portugese: 'Trigo (Nepal)'
  },
  {
    english: 'Sorghum (Nepal)',
    portugese: 'Sorgo (Nepal)'
  },
  {
    english: 'Green gram (Nepal)',
    portugese: 'Grão verde (Nepal)'
  },
  {
    english: 'Nutmeg&mace (Nepal)',
    portugese: 'Nutmeg & mace (Nepal)'
  },
  {
    english: 'Tomato (Nepal)',
    portugese: 'Tomate (Nepal)'
  },
  {
    english: 'Lemon (Nepal)',
    portugese: 'Limão (Nepal)'
  },
  {
    english: 'Onion (Nepal)',
    portugese: 'Cebola (Nepal)'
  },
  {
    english: 'Banana (Nepal)',
    portugese: 'Banana (Nepal)'
  },
  {
    english: 'Pearl millet (Nepal)',
    portugese: 'Milheto pérola (Nepal)'
  },
  {
    english: 'Ginger (Nepal)',
    portugese: 'Gengibre (Nepal)'
  },
  {
    english: 'Garlic (Nepal)',
    portugese: 'Alho (Nepal)'
  },
  {
    english: 'Rapeseed ( Nepal )',
    portugese: 'Semente de colza (Nepal)'
  },
  {
    english: 'Our recommendation',
    portugese: 'Nossa recomendação'
  },
  {
    english: 'Your soil pH',
    portugese: 'O pH do seu solo'
  },
  {
    english: 'Your soil organic carbon',
    portugese: 'O carbono orgânico do seu solo'
  },
  {
    english: 'Your soil nitrogen',
    portugese: 'O nitrogênio do seu solo'
  },
  {
    english: 'Your soil phosphorus',
    portugese: 'O fósforo do seu solo'
  },
  {
    english: 'Your soil potassium',
    portugese: 'O potássio do seu solo'
  },
  {
    english: 'Your soil sulfur',
    portugese: 'O enxofre do seu solo'
  },
  {
    english: 'Days',
    portugese: 'Dias'
  },
  {
    english: 'Date',
    portugese: 'Data'
  },
  {
    english: 'Area Of Request',
    portugese: 'Área de pedido'
  },
  {
    english: 'Maize/Corn (Uganda)',
    portugese: 'Milho (Uganda)'
  },
  {
    english: 'Sugar cane (Colombia)',
    portugese: 'Cana-de-açúcar (Colômbia)'
  },
  {
    english: 'Sugar cane (India)',
    portugese: 'Cana-de-açúcar (Índia)'
  },
  {
    english: 'sugarcane(brazil)',
    portugese: 'Cana-de-açúcar (Brasil)'
  },
  {
    english: 'Banana(indonesia)',
    portugese: 'Banana (Indonésia)'
  },
  {
    english: 'Lettuce(Libya)',
    portugese: 'Alface (Líbia)'
  },
  {
    english: 'Soya (India)',
    portugese: 'Soja (Índia)'
  },
  {
    english: 'Days after sowing when pest was detected',
    portugese: 'Dias após a semeadura quando a praga foi detectada'
  },
  {
    english: 'False codling moth',
    portugese: 'Traça da falsa codificação'
  },
  {
    english: 'Scales',
    portugese: 'Escalas'
  },
  {
    english: 'FCM larvae tunnel into the fruit, leaving behind a characteristic entry hole and a brown.',
    portugese: 'As larvas do FCM escavam no fruto, deixando para trás um orifício de entrada característico e um marrom.'
  },
  {
    english: 'Corky patch on the fruit surface feeding on the pulp and seeds.',
    portugese: 'Mancha corcunda na superfície do fruto alimentando-se da polpa e das sementes.'
  },
  {
    english: 'Larvae can cause fruit to drop prematurely from the tree.',
    portugese: 'As larvas podem fazer o fruto cair prematuramente da árvore.'
  },
  {
    english: 'Thrips feed on the leaves of avocado trees, causing them to become distorted, curled, and discolored.',
    portugese: 'Tripes se alimentam das folhas das árvores de abacate, fazendo com que fiquem distorcidas, enroladas e descoloridas.'
  },
  {
    english: 'The leaves may also have a silvery appearance.',
    portugese: 'As folhas também podem ter uma aparência prateada.'
  },
  {
    english: ' It can damage the flowers of avocado trees, resulting in reduced fruit set and yield.',
    portugese: 'Pode danificar as flores das árvores de abacate, resultando em menor produção de frutos e rendimento.'
  },
  {
    english: 'Scales feed on the sap of avocado leaves, causing them to turn yellow and wilt.',
    portugese: 'As escalas se alimentam da seiva das folhas de abacate, fazendo com que fiquem amarelas e murchem.'
  },
  {
    english: 'The leaves may also have a sticky residue on them and it can cause damage to the bark of avocado trees, resulting in cracks and lesions.',
    portugese: 'As folhas também podem ter um resíduo pegajoso e podem causar danos à casca das árvores de abacate, resultando em rachaduras e lesões.'
  },
  {
    english: 'This can lead to reduced tree vigor and yield.',
    portugese: 'Isso pode levar a uma redução na vigorosidade da árvore e no rendimento.'
  },
  {
    english: 'Fruit flies lay their eggs in the skin of the avocado fruit, resulting in small puncture marks on the surface, The eggs hatch into larvae, which feed on the flesh of the avocado fruit.',
    portugese: 'As moscas-das-frutas depositam seus ovos na pele do fruto do abacate, resultando em pequenas marcas de perfuração na superfície. Os ovos eclodem em larvas, que se alimentam da polpa do fruto do abacate.'
  },
  {
    english: 'This can result in the fruit becoming soft and mushy, and may also cause premature ripening and In severe cases of fruit fly infestation.',
    portugese: 'Isso pode resultar no amolecimento e empapamento do fruto, e também pode causar amadurecimento prematuro e, em casos graves de infestação de moscas-das-frutas.'
  },
  {
    english: 'The avocado fruit may drop prematurely from the tree.',
    portugese: 'O fruto do abacate pode cair prematuramente da árvore.'
  },
  {
    english: 'Root rot',
    portugese: 'Podridão das raízes'
  },
  {
    english: 'Cercospora Fruit Spot',
    portugese: 'Mancha de frutas de Cercospora'
  },
  {
    english: 'Scab disease',
    portugese: 'Doença da crosta'
  },
  {
    english: 'The first signs of the disease are observed in the tree canopy.',
    portugese: 'Os primeiros sinais da doença são observados no dossel da árvore.'
  },
  {
    english: 'Leaves are small, pale green, often wilted with brown tips, and drop readily.',
    portugese: 'As folhas são pequenas, verde-pálidas, muitas vezes murchas com pontas marrons e caem facilmente.'
  },
  {
    english: 'Shoots die back from the tips, and eventually the tree is reduced to a bare framework of dying branches.',
    portugese: 'Os brotos morrem das pontas para trás e, eventualmente, a árvore é reduzida a uma estrutura esquelética de galhos moribundos.'
  },
  {
    english: 'Plants can get anthracnose at any stage, but it causes the most damage between flowering and harvesting.',
    portugese: 'As plantas podem ser afetadas por antracnose em qualquer estágio, mas ela causa mais danos entre a floração e a colheita.'
  },
  {
    english: 'Dry spots, dark brown in color, form on the skin, leading to abnormal development.',
    portugese: 'Manchas secas, de cor marrom escura, se formam na pele, levando a um desenvolvimento anormal.'
  },
  {
    english: 'In severe attacks, the young fruits drop.',
    portugese: 'Em ataques graves, os frutos jovens caem.'
  },
  {
    english: 'Symptoms occur on leaves, fruit, twigs and fruit stems at any time during the growing season',
    portugese: 'Os sintomas ocorrem em folhas, frutos, galhos e caules de frutos a qualquer momento durante a estação de crescimento'
  },
  {
    english: 'Small, light-yellow spots later changing to reddish-brown appear on fruits and leaves which eventually become hard and crack.',
    portugese: 'Pequenas manchas amarelo-claras que depois mudam para marrom-avermelhado aparecem em frutos e folhas que eventualmente ficam duras e racham.'
  },
  {
    english: 'On fruit, the first sign of infection is a darkening of the epidermis followed by swelling of the underlying tissues which raises a small dark spot.',
    portugese: 'No fruto, o primeiro sinal de infecção é um escurecimento da epiderme seguido de inchaço dos tecidos subjacentes, que levanta uma pequena mancha escura.'
  },
  {
    english: 'Symptoms on fruit initially appear as corky, raised, oval or irregular shaped brown to purplish-brown spots.',
    portugese: 'Os sintomas no fruto inicialmente aparecem como manchas marrom a marrom-arroxeadas, corcundas, ovais ou de forma irregular.'
  },
  {
    english: 'As the disease progresses, spots enlarge and coalesce to form large rough areas over the fruit surface.',
    portugese: 'Conforme a doença avança, as manchas aumentam e se fundem para formar grandes áreas ásperas na superfície do fruto.'
  },
  {
    english: 'Cracking of these rough areas may allow secondary organisms to penetrate and rot the fruit.',
    portugese: 'A rachadura dessas áreas ásperas pode permitir que organismos secundários penetrem e apodreçam o fruto.'
  },
  {
    english: 'Pea Aphids',
    portugese: 'Afídeos da ervilha'
  },
  {
    english: 'Pea Stem fly',
    portugese: 'Mosca da haste da ervilha'
  },
  {
    english: 'Pea Moth',
    portugese: 'Mariposa da ervilha'
  },
  {
    english: 'Pea Weevil/ bruchid',
    portugese: 'Gorgulho da ervilha / brucídio'
  },
  {
    english: 'Pea Thrips',
    portugese: 'Tripes da ervilha'
  },
  {
    english: 'A colony consists of winged and wingless adults and various sizes of nymphs. Aphids may be black, yellow, or pink, but mostly are various shades of green.',
    portugese: 'Uma colônia consiste em adultos alados e sem asas e vários tamanhos de ninfas. Os afídeos podem ser pretos, amarelos ou rosas, mas na maioria das vezes são vários tons de verde.'
  },
  {
    english: 'Feeding by large numbers discolors foliage, curls leaves, and damages developing buds.',
    portugese: 'A alimentação por um grande número de indivíduos descolora a folhagem, enrola as folhas e danifica os brotos em desenvolvimento.'
  },
  {
    english: 'They suck the sap of the cells, owing to which the leaves turn pale and yellow.',
    portugese: 'Eles sugam a seiva das células, o que faz com que as folhas fiquem pálidas e amarelas.'
  },
  {
    english: 'Larvae of the insect make a tunnel in the leaf, causing severe damage.',
    portugese: 'As larvas do inseto fazem um túnel na folha, causando danos graves.'
  },
  {
    english: "The large number of tunnels made by the larvae between the lower and upper epidermis interferes with photosynthesis and the proper growth of the plants, making them look unattractive.",
    portugese: "O grande número de túneis feitos pelas larvas entre a epiderme inferior e superior interfere na fotossíntese e no crescimento adequado das plantas, tornando-as pouco atraentes."
  },
  {
    english: "Drying dropping of leaves in severe cases",
    portugese: "Secagem e queda de folhas em casos graves"
  },
  {
    english: "The maggot of the insect damages the internal tissue; consequently, the entire plant dies. The damage is more acute when the crop is sown early.",
    portugese: "A larva do inseto danifica o tecido interno; consequentemente, toda a planta morre. O dano é mais grave quando a cultura é plantada cedo."
  },
  {
    english: "The adults also cause damage by puncturing the leaves, and the injured parts turn yellow.",
    portugese: "Os adultos também causam danos ao perfurar as folhas, e as partes lesionadas ficam amarelas."
  },
  {
    english: "The damage is more severe on seedlings than on the grown-up plants",
    portugese: "O dano é mais grave em mudas do que em plantas adultas"
  },
  {
    english: "The caterpillar makes a hole in pods and feeds upon developing seed.",
    portugese: "A lagarta faz um buraco nas vagens e se alimenta das sementes em desenvolvimento."
  },
  {
    english: "In the early stages, they feed on the foliage and sometimes cause serious defoliation.",
    portugese: "Nos estágios iniciais, eles se alimentam da folhagem e às vezes causam séria desfolha."
  },
  {
    english: "During the reproductive stage, they bore the developing pod and feed on the seeds with their head typically thrust inside and most of the part of the body outside.",
    portugese: "Durante o estágio reprodutivo, eles perfuram a vagem em desenvolvimento e se alimentam das sementes com a cabeça geralmente enfiada para dentro e a maior parte do corpo para fora."
  },
  {
    english: "The caterpillars feed on the developing peas in the pods; they also leave frass, which contaminates the end produce.",
    portugese: "As lagartas se alimentam das ervilhas em desenvolvimento nas vagens; elas também deixam excrementos, que contaminam o produto final."
  },
  {
    english: "Within each pod, 1 or 2 individual peas tend to be partially eaten, and attacked pods may develop a yellow appearance and ripen early.",
    portugese: "Dentro de cada vagem, 1 ou 2 ervilhas individuais tendem a ser parcialmente comidas, e vagens atacadas podem desenvolver uma aparência amarela e amadurecer precocemente."
  },
  {
    english: "When pea pods are opened for shelling, one or more creamy white caterpillars, up to 14 mm long, with dark dots on the body may be found eating into the peas",
    portugese: "Quando as vagens de ervilha são abertas para a retirada, uma ou mais lagartas brancas cremosas, de até 14 mm de comprimento, com pontos escuros no corpo podem ser encontradas comendo as ervilhas."
  },
  {
    english: "Adults feed on blossoms and lay eggs on young pods.",
    portugese: "Os adultos se alimentam das flores e colocam ovos nas vagens jovens."
  },
  {
    english: "Larvae, after hatching from the eggs, burrow into green seed.",
    portugese: "As larvas, após eclodirem dos ovos, perfuram a semente verde."
  },
  {
    english: "The larvae burrow straight through the pods to feed on the seed, so they are not readily found for identification until the seed is mature (above), and it is too late for control.",
    portugese: "As larvas perfuram diretamente as vagens para se alimentarem das sementes, então elas não são facilmente encontradas para identificação até que a semente esteja madura (acima), e é tarde demais para o controle."
  },
  {
    english: "Leaves fed upon by thrips often become dull green and later develop a silvery-white discoloration on the upper surface.",
    portugese: "Folhas alimentadas por tripes frequentemente se tornam verdes opacas e posteriormente desenvolvem uma descoloração branca-prateada na superfície superior."
  },
  {
    english: "The discolored areas are usually marked by many tiny black excrement spots.",
    portugese: "As áreas descoloridas são geralmente marcadas por muitos pequenos pontos pretos de excremento."
  },
  {
    english: "When thrips feed on developing tissues at the shoot tip or in flower buds, they can cause distorted growth.",
    portugese: "Quando os tripes se alimentam de tecidos em desenvolvimento na ponta do broto ou em botões de flores, eles podem causar crescimento distorcido."
  },
  {
    english: "Pod Spot and Ascochyta Blight",
    portugese: "Mancha na vagem e Míldio"
  },
  {
    english: "Mosaic and Streak",
    portugese: "Mosaico e Estrias"
  },
  {
    english: "Yellowing of lower leaves and stunting of plants.",
    portugese: "Amarelecimento das folhas inferiores e nanismo das plantas."
  },
  {
    english: "The stem may be slightly swollen and brittle near the soil.",
    portugese: "O caule pode estar ligeiramente inchado e quebradiço próximo ao solo."
  },
  {
    english: "Externally, the root system appears healthy; however, secondary root rots are likely to occur on plants wilted for long periods.",
    portugese: "Externamente, o sistema radicular parece saudável; no entanto, é provável que podridões secundárias das raízes ocorram em plantas murchas por longos períodos."
  },
  {
    english: "It attacks leaves first, producing faint, slightly discolored specks from which grayish white powdery growth of mycelium develops.",
    portugese: "Ele ataca primeiro as folhas, produzindo manchas fracas e ligeiramente descoloridas, a partir das quais se desenvolve um crescimento pulverulento esbranquiçado de micélio."
  },
  {
    english: "Powdery growth spreads over leaf, stem, and pod.",
    portugese: "O crescimento pulverulento se espalha sobre folha, caule e vagem."
  },
  {
    english: "The leaves turn yellow and die.",
    portugese: "As folhas ficam amarelas e morrem."
  },
  {
    english: "The stem of the plant becomes malformed and the affected plant dies out.",
    portugese: "O caule da planta fica deformado e a planta afetada morre."
  },
  {
    english: "Yellow spots having aecia in round or elongated clusters.",
    portugese: "Manchas amarelas com ácias em aglomerados redondos ou alongados."
  },
  {
    english: "Then the uredopustules develop which are powdery and light brown in appearance.",
    portugese: "Em seguida, desenvolvem-se as uredoespículas, que são pulverulentas e de cor marrom clara."
  },
  {
    english: "Reddish brown to black streaks appear on primary and secondary roots.",
    portugese: "Estrias marrom avermelhadas a pretas aparecem em raízes primárias e secundárias."
  },
  {
    english: "These streaks coalesce at later stages, leading to girdling of the lower stem.",
    portugese: "Essas estrias se fundem em estágios posteriores, levando ao anelamento do caule inferior."
  },
  {
    english: "Red discoloration of the vascular system can be seen, especially near cotyledon attachment.",
    portugese: "Descoloração vermelha do sistema vascular pode ser vista, especialmente perto da ligação do cotilédone."
  },
  {
    english: "Black to purplish streaks on stems reaching from the root zone to about 25 cm up the stem.",
    portugese: "Estrias pretas a arroxeadas nos caules que vão da zona da raiz até cerca de 25 cm acima do caule."
  },
  {
    english: "Leaf spots are gray-purplish.",
    portugese: "As manchas nas folhas são cinza-arroxeadas."
  },
  {
    english: "Foot and stem lesions girdle and weaken the stem, leading to crop lodging and yield loss.",
    portugese: "As lesões nos pés e nos caules circundam e enfraquecem o caule, levando ao tombamento da cultura e à perda de rendimento."
  },
  {
    english: "A grayish white, moldy growth appears on the lower leaf surface, and a yellowish area appears on the opposite side of the leaf.",
    portugese: "Um crescimento esbranquiçado e mofado aparece na superfície inferior da folha, e uma área amarelada aparece no lado oposto da folha."
  },
  {
    english: "Infected leaves can turn yellow and die if the weather is cool and damp.",
    portugese: "As folhas infectadas podem ficar amarelas e morrer se o tempo estiver frio e úmido."
  },
  {
    english: "Stems may be distorted and stunted.",
    portugese: "Os caules podem estar distorcidos e atrofiados."
  },
  {
    english: "Brown blotches appear on pods, and mold may grow inside pods.",
    portugese: "Manchas marrons aparecem nas vagens, e mofo pode crescer dentro das vagens."
  },
  {
    english: "Mottled patterns on leaves.",
    portugese: "Padrões marmorizados nas folhas."
  },
  {
    english: "Yellow leaf veins.",
    portugese: "Veias das folhas amarelas."
  },
  {
    english: "Downward curling of leaflets as well as a transient clearing and swelling of leaf veins in most cultivars.",
    portugese: "Curvatura descendente dos folíolos, bem como um clareamento transitório e um inchaço das veias das folhas na maioria das cultivares."
  },
  {
    english: "African Armyworm",
    portugese: "Lagarta do exército africano"
  },
  {
    english: "Bean Aphid",
    portugese: "Pulgão do feijão"
  },
  {
    english: "Crown and Root Aphids",
    portugese: "Afídeos da coroa e da raiz"
  },
  {
    english: "Cutworms feed on the roots.",
    portugese: "As lagartas cortam as raízes."
  },
  {
    english: "Causing small and large superficial holes.",
    portugese: "Causando pequenos e grandes buracos superficiais."
  },
  {
    english: "Completely eat the leaves.",
    portugese: "Comem completamente as folhas."
  },
  {
    english: "The African army indirectly injures the carrot crop by destroying the stem or foliage. The crop cannot produce enough food when foliage is destroyed, reducing yields.",
    portugese: "A lagarta do exército africano fere indiretamente a cultura da cenoura destruindo o caule ou a folhagem. A cultura não pode produzir comida suficiente quando a folhagem é destruída, reduzindo os rendimentos."
  },
  {
    english: "The African armyworm is also known as a caterpillar.",
    portugese: "A lagarta do exército africano também é conhecida como uma lagarta."
  },
  {
    english: "When the caterpillars are 3 cm long, they could have already caused massive losses.",
    portugese: "Quando as lagartas têm 3 cm de comprimento, elas já podem ter causado perdas massivas."
  },
  {
    english: "Bean aphid may transmit celery mosaic but little is known in this regard.",
    portugese: "O pulgão do feijão pode transmitir o mosaico do aipo, mas pouco se sabe a esse respeito."
  },
  {
    english: "Bean aphid only occasionally builds up on carrots.",
    portugese: "O pulgão do feijão apenas ocasionalmente se acumula em cenouras."
  },
  {
    english: "It is known regarding economic thresholds and damage.",
    portugese: "É conhecido em relação a limiares econômicos e danos."
  },
  {
    english: "These aphids occur infrequently and only occasionally cause injury.",
    portugese: "Esses afídeos ocorrem raramente e só ocasionalmente causam danos."
  },
  {
    english: "High populations may stunt growth.",
    portugese: "Populações altas podem retardar o crescimento."
  },
  {
    english: "It is more serious that the tops may be weakened by their feeding and break off during harvest, leaving the carrot in the ground.",
    portugese: "É mais grave que as partes superiores possam ser enfraquecidas por sua alimentação e se rompam durante a colheita, deixando a cenoura no solo."
  },
  {
    english: "Bacterial soft rot",
    portugese: "Apodrecimento mole bacteriano"
  },
  {
    english: "Leaf blight",
    portugese: "Mancha foliar"
  },
  {
    english: "The disease generally appears as a soft, watery, and slimy decay of the taproot. The decay rapidly consumes the core of the carrot, often leaving the epidermis/peel intact.",
    portugese: "A doença geralmente aparece como uma decomposição mole, aquosa e viscosa da raiz principal. A decomposição consome rapidamente o núcleo da cenoura, muitas vezes deixando a epiderme/casca intacta."
  },
  {
    english: "Rotted tissues retain their natural color until they completely decay. The infected carrot is not fit for consumption and unsellable.",
    portugese: "Os tecidos podres mantêm sua cor natural até se decompor completamente. A cenoura infectada não é adequada para consumo e não pode ser vendida."
  },
  {
    english: "A foul odor may be associated with soft rot.",
    portugese: "Um odor fétido pode estar associado ao apodrecimento mole."
  },
  {
    english: "Whitish powdery growth on the undersurface of the leaves.",
    portugese: "Crescimento pulverulento esbranquiçado na superfície inferior das folhas."
  },
  {
    english: "As the disease progresses, powdery spots appear on both surfaces of the leaves and on stems.",
    portugese: "Conforme a doença avança, manchas pulverulentas aparecem em ambas as superfícies das folhas e nos caules."
  },
  {
    english: "Under severe disease pressure, the leaves turn brown, twisted, and brittle before shriveling and dying.",
    portugese: "Sob pressão grave da doença, as folhas ficam marrons, torcidas e quebradiças antes de murchar e morrer."
  },
  {
    english: "Older leaves are attacked first.",
    portugese: "As folhas mais velhas são atacadas primeiro."
  },
  {
    english: "Dark grey to brown spots, angular, with yellow margins, occur on the leaves and petioles.",
    portugese: "Manchas escuras acinzentadas a marrons, angulares, com margens amarelas, ocorrem nas folhas e pecíolos."
  },
  {
    english: "Under favorable conditions, the spots merge and the leaves rapidly blacken, wither, and die.",
    portugese: "Em condições favoráveis, as manchas se fundem e as folhas rapidamente escurecem, murcham e morrem."
  },
  {
    english: "Weevil",
    portugese: "Gorgulho"
  },
  {
    english: "Tuber moth",
    portugese: "Mariposa da tuberosa"
  },
  {
    english: "Whitefly",
    portugese: "Mosca branca"
  },
  {
    english: "Sweet Potato Virus disease",
    portugese: "Doença do vírus da batata-doce"
  },
  {
    english: "Black rot",
    portugese: "Podridão negra"
  },
  {
    english: "Potato mosaic virus",
    portugese: "Vírus do mosaico da batata"
  },
  {
    english: "An infested tuber is often riddled with cavities or tunnels.",
    portugese: "Uma batata-doce infestada frequentemente está cheia de cavidades ou túneis."
  },
  {
    english: "Thickening and malformation of vines and often cracking of the tissue.",
    portugese: "Espessamento e malformação das vinhas e frequentemente rachaduras no tecido."
  },
  {
    english: "Discoloration, cracking, or wilting of damaged vines.",
    portugese: "Descoloração, rachaduras ou murcha das vinhas danificadas."
  },
  {
    english: "It is a pest of field and storage.",
    portugese: "É uma praga do campo e do armazenamento."
  },
  {
    english: "Larva tunnels into foliage, stem, and tubers.",
    portugese: "A larva faz túneis nas folhas, caules e tubérculos."
  },
  {
    english: "Galleries are formed near tuber eyes.",
    portugese: "Galerias são formadas perto dos olhos do tubérculo."
  },
  {
    english: "Damage the undersides of leaves by sucking their plant sap.",
    portugese: "Danificam a parte inferior das folhas sugando sua seiva."
  },
  {
    english: "They damage young and soft parts of plants such as new leaves and shoots.",
    portugese: "Danificam partes jovens e macias das plantas, como novas folhas e brotos."
  },
  {
    english: "Leaves become rolled up and turn pale and gradually dry up.",
    portugese: "As folhas enrolam-se e tornam-se pálidas e secam gradualmente."
  },
  {
    english: "Development of sooty mold on the plant.",
    portugese: "Desenvolvimento de mofo fuliginoso na planta."
  },
  {
    english: "Blackening of the leaves that dry and fall off.",
    portugese: "Escurecimento das folhas que secam e caem."
  },
  {
    english: "Chlorotic spots, yellowing.",
    portugese: "Manchas cloróticas, amarelamento."
  },
  {
    english: "Stunted vines.",
    portugese: "Videiras atrofiadas."
  },
  {
    english: "Narrow yellow leaves with deformed edges.",
    portugese: "Folhas estreitas e amarelas com bordas deformadas."
  },
  {
    english: "Yield reductions in roots.",
    portugese: "Reduções de rendimento nas raízes."
  },
  {
    english: "Symptoms generally are seen at harvest, after curing or after storage.",
    portugese: "Os sintomas geralmente são vistos na colheita, após a cura ou após o armazenamento."
  },
  {
    english: "A dry, firm, dark-colored rot that does not extend into the cortex of the sweet potato root.",
    portugese: "Uma podridão seca, firme, de cor escura que não se estende até o córtex da raiz da batata-doce."
  },
  {
    english: 'Dark sunken, darkish spots on the roots and the lower parts of the stem.',
    portugese: 'Manchas escuras afundadas, escuras nas raízes e nas partes inferiores do caule.'
  },
  {
    english: 'Necrotic spots observed on lower leaves.',
    portugese: 'Manchas necróticas observadas nas folhas inferiores.'
  },
  {
    english: 'Discoloring, wilting, and death of foliage and, eventually, the death of the sweet potato vine.',
    portugese: 'Descoloração, murchamento e morte da folhagem e, eventualmente, a morte da vinha da batata-doce.'
  },
  {
    english: 'It rapidly spreads in high moisture and low temperature.',
    portugese: 'Se espalha rapidamente em alta umidade e baixa temperatura.'
  },
  {
    english: 'Black specks observed on tubers.',
    portugese: 'Pontos pretos observados nos tubérculos.'
  },
  {
    english: 'Affected plants show drying up.',
    portugese: 'Plantas afetadas mostram secagem.'
  },
  {
    english: 'In infected tubers, at the time of sprouting, black, brown color appears on eyes.',
    portugese: 'Nos tubérculos infectados, no momento da brotação, aparece cor preta, marrom nos olhos.'
  },
  {
    english: 'Unhealthy plants with leaf discoloration.',
    portugese: 'Plantas doentes com descoloração das folhas.'
  },
  {
    english: 'Wilting leaves.',
    portugese: 'Folhas murchas.'
  },
  {
    english: 'Stunted growth.',
    portugese: 'Crescimento atrofiado.'
  },
  {
    english: 'Curculios beetle',
    portugese: 'Besouro curculio'
  },
  {
    english: 'Rose scale insects',
    portugese: 'Insetos escama de rosa'
  },
  {
    english: 'Rose chaffer beetle',
    portugese: 'Besouro de chaffer rosa'
  },
  {
    english: 'Black spot',
    portugese: 'Mancha preta'
  },
  {
    english: 'Rose mosaic virus',
    portugese: 'Vírus do mosaico da rosa'
  },
  {
    english: 'Crown gall',
    portugese: 'Galha de coroa'
  },
  {
    english: 'Distorted flower buds and leaves.',
    portugese: 'Botões de flores e folhas distorcidas.'
  },
  {
    english: 'Sticky honeydew substance that is secreted by the aphids.',
    portugese: 'Substância pegajosa de melado que é secretada pelos pulgões.'
  },
  {
    english: 'Black sooty mold growing on the honeydew.',
    portugese: 'Mofo fuliginoso preto crescendo no melado.'
  },
  {
    english: 'Rose curculios are reddish-brown weevils with dark spots.',
    portugese: 'Curculios de rosa são besouros marrons avermelhados com manchas escuras.'
  },
  {
    english: 'Adult rose curculios feed on the flower buds, poking their long snouts inside.',
    portugese: 'Os curculios adultos de rosa se alimentam dos botões de flores, enfiando seus longos focinhos para dentro.'
  },
  {
    english: 'If the flowers open, they will be full of ragged holes.',
    portugese: 'Se as flores se abrirem, estarão cheias de buracos irregulares.'
  },
  {
    english: 'Mainly found on the stems and branches of the plant, lack of control will allow the pest to spread to flower stalks and petioles.',
    portugese: 'Principalmente encontrados nos caules e galhos da planta, a falta de controle permitirá que a praga se espalhe para hastes de flores e pecíolos.'
  },
  {
    english: 'Plants would be stunted, spindly, and with a white, flaky crust of scales on the bark.',
    portugese: 'As plantas ficariam atrofiadas, esguias e com uma crosta branca e escamosa sobre a casca.'
  },
  {
    english: 'Turn yellow and die back.',
    portugese: 'Ficam amarelas e secam.'
  },
  {
    english: 'They have a voracious appetite and can quickly skeletonize leaves, leaving only the veins behind.',
    portugese: 'Eles têm um apetite voraz e podem rapidamente esqueletizar folhas, deixando apenas as veias para trás.'
  },
  {
    english: 'Create holes in the fruits, making them less attractive and reducing seed viability.',
    portugese: 'Crie buracos nos frutos, tornando-os menos atraentes e reduzindo a viabilidade das sementes.'
  },
  {
    english: 'They can consume the petals and damage the blooms, reducing the aesthetic value of the roses.',
    portugese: 'Eles podem consumir as pétalas e danificar as flores, reduzindo o valor estético das rosas.'
  },
  {
    english: 'White powdery growth is visible on the plant.',
    portugese: 'Crescimento pulverulento branco é visível na planta.'
  },
  {
    english: 'Infected leaves turn purplish and drop.',
    portugese: 'Folhas infectadas ficam arroxeadas e caem.'
  },
  {
    english: 'Flower buds may fail to open.',
    portugese: 'Os botões das flores podem falhar em abrir.'
  },
  {
    english: 'Conspicuous circular black spots with fringed margins appear on either side of leaves.',
    portugese: 'Manchas pretas circulares conspícuas com margens franjadas aparecem em ambos os lados das folhas.'
  },
  {
    english: 'Leaves become chlorotic.',
    portugese: 'As folhas se tornam cloróticas.'
  },
  {
    english: 'Leaves dry up and drop prematurely.',
    portugese: 'As folhas secam e caem prematuramente.'
  },
  {
    english: 'Yellowing in a mosaic pattern. Chlorotic (yellow) rings or wavy lines (which can look similar to leaf miner damage).',
    portugese: 'Amarelecimento em um padrão de mosaico. Anéis cloróticos (amarelos) ou linhas onduladas (que podem se parecer com danos de minador de folhas).'
  },
  {
    english: 'Yellowing of the veins.',
    portugese: 'Amarelecimento das veias.'
  },
  {
    english: 'Mottled flower color.',
    portugese: 'Cor da flor manchada.'
  },
  {
    english: 'New crown galls are usually pale colored and somewhat round.',
    portugese: 'As novas galhas da coroa geralmente são de cor clara e um tanto redondas.'
  },
  {
    english: 'As they enlarge, they become rough, irregularly shaped, and hard.',
    portugese: 'À medida que crescem, tornam-se ásperas, com formato irregular e duras.'
  },
  {
    english: 'Crown gall can easily be confused with the graft union, but the graft union will not continue to grow larger.',
    portugese: 'A galha da coroa pode ser facilmente confundida com a união do enxerto, mas a união do enxerto não continuará a crescer mais.'
  },
  {
    english: 'Pod borers',
    portugese: 'Brocas de vagem'
  },
  {
    english: 'Armyworms',
    portugese: 'Lagartas do exército'
  },
  {
    english: 'Root knot nematodes',
    portugese: 'Nematoides de galhas'
  },
  {
    english: 'Flower thrips',
    portugese: 'Tripes de flores'
  },
  {
    english: 'Cowpea mosaic',
    portugese: 'Mosaico de feijão-caupi'
  },
  {
    english: 'Macrophomina root rot',
    portugese: 'Podridão radicular de Macrophomina'
  },
  {
    english: 'Bore holes on the buds, flower or pods.',
    portugese: 'Faça buracos nos botões, flores ou vagens.'
  },
  {
    english: 'Infested pods and flowers are webbed together.',
    portugese: 'Vagens e flores infestadas estão emaranhadas juntas.'
  },
  {
    english: 'Defoliation in early stages & later feed on seed larvae thrust head inside the pods and the rest of the body hanging out & make round holes.',
    portugese: 'Desfolhamento nas primeiras fases e mais tarde alimentação em larvas de semente empurrando a cabeça dentro das vagens e o restante do corpo pendurado para fora e faz buracos redondos.'
  },
  {
    english: 'Damage by the worms comprises singular or grouped shaped holes on the leaves of infested plants.',
    portugese: 'O dano causado pelas lagartas consiste em buracos com formas singulares ou agrupadas nas folhas das plantas infestadas.'
  },
  {
    english: 'Under heavy infestations, windowing of leaves is observed.',
    portugese: 'Sob infestações severas, é observada a formação de janelas nas folhas.'
  },
  {
    english: 'Egg clusters appear as cottony or fuzzy substance on the leaf surface.',
    portugese: 'Os aglomerados de ovos aparecem como uma substância felpuda ou algodonosa na superfície da folha.'
  },
  {
    english: 'They usually appear sporadically within a cowpea field.',
    portugese: 'Eles geralmente aparecem de forma esporádica dentro de um campo de feijão-caupi.'
  },
  {
    english: 'Symptoms include stunting, yellowing, wilting, and formation of galls on host roots. Infected plants occur in patches in the field.',
    portugese: 'Os sintomas incluem nanismo, amarelecimento, murcha e formação de galhas nas raízes hospedeiras. Plantas infectadas ocorrem em manchas no campo.'
  },
  {
    english: 'Infected roots become knotty; in severely infected plants, the root system is reduced, and the rootlets are almost completely absent.',
    portugese: 'As raízes infectadas se tornam nodosas; em plantas severamente infectadas, o sistema radicular é reduzido, e as radículas estão quase completamente ausentes.'
  },
  {
    english: 'Damage is prominent on petioles, leaves, and flowers that are heavily infested.',
    portugese: 'O dano é proeminente em pecíolos, folhas e flores que estão fortemente infestados.'
  },
  {
    english: 'Damaged petioles and leaves have tiny holes surrounded by discolored areas.',
    portugese: 'Pecíolos e folhas danificados têm pequenos buracos cercados por áreas descoloridas.'
  },
  {
    english: 'Infested flowers are brown, dried, or completely distorted.',
    portugese: 'Flores infestadas estão marrons, secas ou completamente distorcidas.'
  },
  {
    english: 'The germinating seedling turns brown-red and dies.',
    portugese: 'A plântula germinante fica marrom-vermelha e morre.'
  },
  {
    english: 'Irregular to round brown spots with chlorotic halos appear on leaves, and later spread to the stem.',
    portugese: 'Manchas irregulares a redondas de cor marrom com halos cloróticos aparecem nas folhas e depois se espalham para o caule.'
  },
  {
    english: 'Stem may break, pods are also infected leading to shriveled seeds.',
    portugese: 'O caule pode quebrar, as vagens também estão infectadas levando a sementes enrugadas.'
  },
  {
    english: 'It is caused by a virus transmitted by aphids.',
    portugese: 'É causado por um vírus transmitido por pulgões.'
  },
  {
    english: 'The affected leaves become pale yellow and exhibit mosaic, vein banding symptoms.',
    portugese: 'As folhas afetadas ficam amareladas pálidas e exibem sintomas de mosaico e faixas nas veias.'
  },
  {
    english: 'The affected leaves become reduced in size and show puckering. Pods are also reduced and become twisted.',
    portugese: 'As folhas afetadas ficam reduzidas em tamanho e apresentam rugas. As vagens também são reduzidas e ficam torcidas.'
  },
  {
    english: 'Powdery mildew is visible on all the aerial parts of the affected plants.',
    portugese: 'Oídio é visível em todas as partes aéreas das plantas afetadas.'
  },
  {
    english: 'Symptoms first start from leaves and then spread to stem, branches, and pods.',
    portugese: 'Os sintomas começam primeiro pelas folhas e depois se espalham para o caule, ramos e vagens.'
  },
  {
    english: 'This white growth consists of the fungus and its spores.',
    portugese: 'Este crescimento branco consiste no fungo e em suas esporas.'
  },
  {
    english: 'The fungus attacks all aerial parts and at any stage of plant growth.',
    portugese: 'O fungo ataca todas as partes aéreas e em qualquer estágio do crescimento da planta.'
  },
  {
    english: 'Symptoms include circular, black, sunken spots with a dark center and bright red-orange margins on leaves and pods.',
    portugese: 'Os sintomas incluem manchas circulares, pretas e afundadas com um centro escuro e margens vermelhas-laranja brilhantes nas folhas e vagens.'
  },
  {
    english: 'In severe infections, the affected parts wither off.',
    portugese: 'Em infecções severas, as partes afetadas murcham.'
  },
  {
    english: 'Symptoms begin appearing at 4 weeks as raised white cankers at the base of the stem.',
    portugese: 'Os sintomas começam a aparecer às 4 semanas como cancros brancos elevados na base do caule.'
  },
  {
    english: 'The affected plants become stunted with dark green and mottled leaves that are reduced in size.',
    portugese: 'As plantas afetadas ficam nanicas com folhas verde-escuras e manchadas que são reduzidas em tamanho.'
  },
  {
    english: 'Leaves of affected plants dry and drop.',
    portugese: 'As folhas das plantas afetadas secam e caem.'
  },
  {
    english: 'Establishment stage',
    portugese: 'Estágio de estabelecimento'
  },
  {
    english: 'Budding stage',
    portugese: 'Estágio de brotação'
  },
  {
    english: 'Flower initiation and blooming stage',
    portugese: 'Estágio de iniciação e florescimento das flores'
  },
  {
    english: 'Seed Germination',
    portugese: 'Germinação de sementes'
  },
  {
    english: 'Harvest',
    portugese: 'Colheita'
  },
  {
    english: 'Storage root initiation stage',
    portugese: 'Estágio de iniciação da formação da raiz de armazenamento'
  },
  {
    english: 'Storage root bulking stage',
    portugese: 'Estágio de crescimento da raiz de armazenamento'
  },
  {
    english: 'Vegetative growth stage',
    portugese: 'Estágio de crescimento vegetativo'
  },
  {
    english: 'Inflorescence stage',
    portugese: 'Estágio de inflorescência'
  },
  {
    english: 'Ripening stage',
    portugese: 'Estágio de amadurecimento'
  },
  {
    english: 'Loosening',
    portugese: 'Afrouxamento'
  },
  {
    english: 'De-suckering',
    portugese: 'Desbrotação'
  },
  {
    english: 'Pinching',
    portugese: 'Beliscamento'
  },
  {
    english: 'Earthing up',
    portugese: 'Aterramento'
  },
  {
    english: 'Lifting up',
    portugese: 'Elevação'
  },
  {
    english: 'Support Trailing & Stalking',
    portugese: 'Suporte de rastreamento e caça'
  },
  {
    english: 'Sweetpotato virus disease (SPVD)',
    portugese: 'Doença do vírus do batata-doce (SPVD)'
  },
  {
    english: 'Potato mosaic disease',
    portugese: 'Doença do mosaico da batata'
  },
  {
    english: 'Red scale',
    portugese: 'Escala vermelha'
  },
  {
    english: 'Rose curculios',
    portugese: 'Curculionídeos da rosa'
  },
  {
    english: 'White flies',
    portugese: 'Mosca branca'
  },
  {
    english: 'Root not nematodes',
    portugese: 'Nematoides das raízes'
  },
  {
    english: 'Pigeon pea (Peru)',
    portugese: 'Ervilha-de-pombo (Peru)'
  },
  {
    english: 'SIPAN',
    portugese: 'SIPAN'
  },
  {
    english: 'PROMPEX2000',
    portugese: 'PROMPEX2000'
  },
  {
    english: 'La Negra',
    portugese: 'La Negra'
  },
  {
    english: 'La Pacarana',
    portugese: 'La Pacarana'
  },
  {
    english: 'Ants and mealy bugs pose a serious threat to pineapple production because the ants carry the mealy bugs from diseased plants onto healthy plants resulting in the spread of the disease throughout the field.',
    portugese: 'Formigas e cochonilhas representam uma séria ameaça à produção de abacaxi porque as formigas carregam as cochonilhas das plantas doentes para as plantas saudáveis, resultando na disseminação da doença por todo o campo.'
  },
  {
    english: 'Severe infestations can cause wilting of the leaves with the leaves eventually turning orange-brown and withering.',
    portugese: 'Infestações severas podem causar murcha das folhas, com estas eventualmente ficando alaranjadas-acastanhadas e murchando.'
  },
  {
    english: 'Control becomes more difficult if there are weeds and other local plants acting as hosts for the mealy bug. Initial control should be directed against the ants to ensure success.',
    portugese: 'O controle se torna mais difícil se houver ervas daninhas e outras plantas locais atuando como hospedeiras para a cochonilha. O controle inicial deve ser direcionado contra as formigas para garantir o sucesso.'
  },
  {
    english: 'Pest nematodes are tiny slender unsegmented worms that infest plant roots, reducing root growth and causing root death thus reducing the plant’s ability to absorb water and nutrients.',
    portugese: 'Os nematoides de pragas são vermes finos e não segmentados que infestam as raízes das plantas, reduzindo o crescimento das raízes e causando a morte das raízes, reduzindo assim a capacidade da planta de absorver água e nutrientes.'
  },
  {
    english: 'The result is a poorly developed root system causing stunting of plants.',
    portugese: 'O resultado é um sistema radicular mal desenvolvido, causando nanismo das plantas.'
  },
  {
    english: 'Leaves turn yellow and then red and are less erect than those of healthy plants. Tips are withered.',
    portugese: 'As folhas ficam amarelas e depois vermelhas e são menos eretas do que as das plantas saudáveis. As pontas estão murchas.'
  },
  {
    english: 'Butterfly larvae',
    portugese: 'Larvas de borboleta'
  },
  {
    english: 'Butterfly larvae can damage flowers.',
    portugese: 'Larvas de borboleta podem danificar flores.'
  },
  {
    english: 'The adult butterflies lay eggs when the plants are at the flowering stage.',
    portugese: 'As borboletas adultas depositam ovos quando as plantas estão no estágio de floração.'
  },
  {
    english: 'Fruits are also affected by larvae.',
    portugese: 'As frutas também são afetadas por larvas.'
  },
  {
    english: 'Rodents',
    portugese: 'Roedores'
  },
  {
    english: 'Rats can be very destructive pests in pineapple fields and also pose a serious hazard to pineapples in storage',
    portugese: 'Os ratos podem ser pragas muito destrutivas em plantações de abacaxi e também representam um sério perigo para os abacaxis armazenados.'
  },
  {
    english: 'Rats damage pineapples in the field when they bite, urinate and or defecate on the crop making the fruits unmarketable.',
    portugese: 'Os ratos danificam os abacaxis na plantação quando mordem, urinam e/ou defecam na cultura, tornando as frutas não comercializáveis.'
  },
  {
    english: 'Even higher crop loss due to rodent damage may occur where pineapples are stored',
    portugese: 'A perda de colheita ainda maior devido aos danos causados por roedores pode ocorrer onde os abacaxis são armazenados'
  },
  {
    english: 'Mealybug wilt',
    portugese: 'Murcha causada por cochonilha'
  },
  {
    english: 'The most visible symptom is a bright bronze to red colouration of the leaves of the young plant or a pinkish and/or yellowish colouration of the older leaves.',
    portugese: 'O sintoma mais visível é uma coloração bronzeada a vermelha brilhante das folhas da planta jovem ou uma coloração rosada e/ou amarelada das folhas mais antigas.'
  },
  {
    english: 'Wilting starts at the tip of the leaves.',
    portugese: 'A murcha começa na ponta das folhas.'
  },
  {
    english: 'If the plants continue to grow, the leaves lose turgidity and curl outwards',
    portugese: 'Se as plantas continuarem a crescer, as folhas perdem turgidez e enrolam para fora.'
  },
  {
    english: 'These fungal problems are caused by various Phytophthora and Pythium species.',
    portugese: 'Esses problemas fúngicos são causados por várias espécies de Phytophthora e Pythium.'
  },
  {
    english: 'The symptoms of root rots are a reduction in plant growth with the development of reddish coloured leaves and the browning of the leaf margins.',
    portugese: 'Os sintomas de podridões radiculares são uma redução no crescimento das plantas com o desenvolvimento de folhas de cor avermelhada e o escurecimento das margens das folhas.'
  },
  {
    english: 'Affected plants eventually die',
    portugese: 'As plantas afetadas eventualmente morrem'
  },
  {
    english: 'Phytophthora heart rot',
    portugese: 'Podridão do coração de Phytophthora'
  },
  {
    english: 'The symptoms are rotting at the base of the leaves in the centre of the leaf whorl (heart) of young non-flowering plants.',
    portugese: 'Os sintomas são podridão na base das folhas no centro do verticilo foliar (coração) de plantas jovens não florescentes.'
  },
  {
    english: 'In a more developed stage, young leaves can easily be pulled from the plant.',
    portugese: 'Num estágio mais avançado, as folhas jovens podem ser facilmente arrancadas da planta.'
  },
  {
    english: 'The base of the leaves eventually rots and has a bad smell.',
    portugese: 'A base das folhas eventualmente apodrece e tem um mau cheiro.'
  },
  {
    english: 'Fruitlet core rot',
    portugese: 'Podridão central do frutículo'
  },
  {
    english: 'Fruitlet Core Rot is caused by a combination of Penicillium and Fusarium spp.',
    portugese: 'A Podridão Central do Frutículo é causada por uma combinação de Penicillium e Fusarium spp.'
  },
  {
    english: 'Although the symptoms of this disease generally appear during storage, infection starts in the field. Mites are thought to be associated with this disease, through causing injury to the fruitlets.',
    portugese: 'Embora os sintomas desta doença geralmente apareçam durante o armazenamento, a infecção começa no campo. Acredita-se que os ácaros estejam associados a esta doença, causando lesões nos frutículos.'
  },
  {
    english: 'The infected tissue of the fruit has a water-soaked appearance which eventually discolours becoming light to dark brown.',
    portugese: 'O tecido infectado da fruta tem uma aparência encharcada de água que eventualmente se descolora, tornando-se de marrom claro a escuro.'
  },
  {
    english: 'The fungus attacks all aerial part parts and at any stage of plant growth.',
    portugese: 'O fungo ataca todas as partes aéreas e em qualquer estágio de crescimento da planta.'
  },
  {
    english: 'Symptoms are circular, black, sunken spots with dark center and bright red orange margins on leaves and pods.',
    portugese: 'Os sintomas são manchas circulares, negras, afundadas, com centro escuro e margens vermelho-alaranjadas brilhantes em folhas e vagens.'
  },
  {
    english: 'Irregular spots, and dead areas on leaves that often follow the veins of the leaves',
    portugese: 'Manchas irregulares e áreas mortas nas folhas que frequentemente seguem as veias das folhas.'
  },
  {
    english: 'Spots produced are small, numerous in number with pale brown centre and reddish brown margin.',
    portugese: 'As manchas produzidas são pequenas, numerosas, com centro marrom claro e margem marrom avermelhada.'
  },
  {
    english: 'Small necrotic flecks that enlarge to form circular, tan or grey spots.',
    portugese: 'Pequenas manchas necróticas que se ampliam formando manchas circulares, de cor bege ou cinza.'
  },
  {
    english: 'The center of the lesions dry out and has a white appearance',
    portugese: 'O centro das lesões seca e apresenta uma aparência branca.'
  },
  {
    english: 'The affected leaves turn yellow in colour and brown irregular lesions appear on leaves.',
    portugese: 'As folhas afetadas tornam-se amarelas e apresentam lesões irregulares marrons.'
  },
  {
    english: 'The affected plants dry up gradually. When the tap root of the affected plant is split open, reddening of internal tissues is visible.',
    portugese: 'As plantas afetadas secam gradualmente. Quando a raiz principal da planta afetada é dividida, é visível o avermelhamento dos tecidos internos.'
  },
  {
    english: 'In the initial stages, the fungus causes seed rot, seedling blight and root rot symptoms.',
    portugese: 'Nos estágios iniciais, o fungo causa apodrecimento de sementes, queima de mudas e sintomas de podridão radicular.'
  },
  {
    english: 'The earliest symptoms appear on youngest leaves as chlorosis around some lateral veins and its branches near the margin.',
    portugese: 'Os primeiros sintomas aparecem nas folhas mais jovens como clorose ao redor de algumas veias laterais e de seus ramos próximos à margem.'
  },
  {
    english: 'The leaves show curling of margin downwards.',
    portugese: 'As folhas mostram enrolamento da margem para baixo.'
  },
  {
    english: 'The veins show reddish brown discolouration on the under surface which also extends to the petiole.',
    portugese: 'As veias mostram descoloração marrom avermelhada na face inferior, que também se estende até o pecíolo.'
  },
  {
    english: 'White powdery patches appear on leaves and other green parts which later become dull coloured.',
    portugese: 'Manchas pulverulentas brancas aparecem nas folhas e em outras partes verdes, que posteriormente se tornam de cor opaca.'
  },
  {
    english: 'In severe infections, foliage becomes yellow causing premature defoliation.',
    portugese: 'Em infecções graves, a folhagem fica amarela, causando desfolhamento prematuro.'
  },
  {
    english: 'When the infection is severe, both the surfaces of the leaves are completely covered by whitish powdery growth.',
    portugese: 'Quando a infecção é grave, ambas as superfícies das folhas são completamente cobertas por crescimento pulverulento esbranquiçado.'
  },
  {
    english: 'Similar spots also occur on branches and pods.',
    portugese: 'Manchas semelhantes também ocorrem em ramos e vagens.'
  },
  {
    english: 'Under favourable environmental conditions, severe leaf spotting and defoliation occurs at the time of flowering and pod formation.',
    portugese: 'Em condições ambientais favoráveis, ocorre uma severa mancha foliar e desfolhamento durante o florescimento e a formação de vagens.'
  },
  {
    english: 'ther',
    portugese: 'lá'
  },
  {
    english: 'These enlarge gradually and turn as raised brown streaks spreading upwards.',
    portugese: 'Esses aumentam gradualmente e se transformam em estrias marrons elevadas que se espalham para cima.'
  },
  {
    english: 'Plants are stunted and leaves dark green, mottled and reduced in size.',
    portugese: 'As plantas são atrofiadas e as folhas são de cor verde escura, manchadas e reduzidas de tamanho.'
  },
  {
    english: 'Normal leaves on the affected plants drop suddenly and dry.',
    portugese: 'As folhas normais das plantas afetadas caem repentinamente e secam.'
  },
  {
    english: 'Yellow Mosaic',
    portugese: 'Mosaico Amarelo'
  },
  {
    english: 'Initially mild scattered yellow spots appear on young leaves.',
    portugese: 'Inicialmente, manchas amarelas dispersas levemente aparecem nas folhas jovens.'
  },
  {
    english: 'The next trifoliate leaves emerging from the growing apex show irregular yellow and green patches alternating with each other.',
    portugese: 'As próximas folhas trifoliadas que emergem do ápice em crescimento mostram manchas amarelas e verdes irregulares alternadas entre si.'
  },
  {
    english: 'Spots gradually increase in size and ultimately some leaves turn completely yellow.',
    portugese: 'As manchas aumentam gradualmente de tamanho e, eventualmente, algumas folhas ficam completamente amarelas.'
  },
  {
    english: 'Leaves, inflorescence stalk, and young pods covered with dark-colored aphids',
    portugese: 'Folhas, pedúnculo da inflorescência e vagens jovens cobertos com pulgões de cor escura.'
  },
  {
    english: 'Leaf mottling and crinkling, and plant dwarfing',
    portugese: 'Marmorização e enrugamento das folhas, e nanismo da planta.'
  },
  {
    english: 'Honeydew secretion with black ant movements',
    portugese: 'Secreção de melada com movimentos de formigas pretas.'
  },
  {
    english: 'The adult blister beetle primarily feeds on flowers',
    portugese: 'O besouro adulto da bolha se alimenta principalmente de flores.'
  },
  {
    english: 'Feeding damage can also be found on tender leaves and shoots',
    portugese: 'Danos de alimentação também podem ser encontrados em folhas e brotos tenros.'
  },
  {
    english: 'The beetles often attack beans in swarms but generally in small patches within the field',
    portugese: 'Os besouros frequentemente atacam feijões em enxames, mas geralmente em pequenos agrupamentos dentro do campo.'
  },
  {
    english: 'Buds, flowers, and young pods with boreholes',
    portugese: 'Botões, flores e vagens jovens com furos.'
  },
  {
    english: 'Presence of slug-like caterpillar',
    portugese: 'Presença de lagarta semelhante a lesma.'
  },
  {
    english: 'Defoliation in early stages',
    portugese: 'Desfolhamento nos estágios iniciais.'
  },
  {
    english: 'Larva\'s head alone thrust inside the pods and the rest of the body hanging out',
    portugese: 'Apenas a cabeça da larva é inserida nas vagens e o restante do corpo fica para fora.'
  },
  {
    english: 'Pods with round holes',
    portugese: 'Vagens com buracos redondos.'
  },
  {
    english: 'Grass blue butterfly',
    portugese: 'Borboleta azul das gramíneas.'
  },
  {
    english: 'Buds, flowers, and young pods with boreholes and presence of slug-like caterpillar',
    portugese: 'Botões, flores e vagens jovens com furos e presença de lagarta semelhante a lesma.'
  },
  {
    english: 'Larval entry hole on the pod is plugged with excreta',
    portugese: 'O buraco de entrada da larva na vagem é tampado com excrementos.'
  },
  {
    english: 'Pod damage is characterized by multiple holes per pod, made by individual larva',
    portugese: 'O dano nas vagens é caracterizado por múltiplos buracos por vagem, feitos por larvas individuais.'
  },
  {
    english: 'Leafhopper',
    portugese: 'Cigarrinha.'
  },
  {
    english: 'Leaves mottled and yellowish in color',
    portugese: 'Folhas marmorizadas e amareladas.'
  },
  {
    english: 'Green color insects found under the surface of leaves',
    portugese: 'Insetos de cor verde encontrados sob a superfície das folhas.'
  },
  {
    english: 'Yellowing of leaves from tip to downwards',
    portugese: 'Amarelecimento das folhas da ponta para baixo.'
  },
  {
    english: 'Lab lab bug or Stink bug',
    portugese: 'Percevejo do lab-lab ou Percevejo-fedor.'
  },
  {
    english: 'Both nymphs and adults cluster on the tender shoots and suck the sap',
    portugese: 'Tanto as ninfas quanto os adultos se agrupam nos brotos tenros e sugam a seiva.'
  },
  {
    english: 'Heavily infested vines dry and shed away',
    portugese: 'Vinhas fortemente infestadas secam e se desprendem.'
  },
  {
    english: 'Moderately infested plants remain weak and stunted in growth',
    portugese: 'Plantas moderadamente infestadas permanecem fracas e atrofiadas no crescimento.'
  },
  {
    english: 'Pod bugs',
    portugese: 'Percevejos de vagens.'
  },
  {
    english: 'Pods with black spots',
    portugese: 'Vagens com manchas pretas.'
  },
  {
    english: 'Shedding of green pods',
    portugese: 'Queda de vagens verdes.'
  },
  {
    english: 'Poorly filled pods with shriveled grains inside',
    portugese: 'Vagens mal preenchidas com grãos enrugados dentro.'
  },
  {
    english: 'Spiny pod borer',
    portugese: 'Percevejo espinhoso de vagens.'
  },
  {
    english: 'Dropping of flowers and young pods',
    portugese: 'Queda de flores e vagens jovens.'
  },
  {
    english: 'Older pods marked with a brown spot where a larva has entered',
    portugese: 'Vagens mais antigas marcadas com uma mancha marrom onde uma larva entrou.'
  },
  {
    english: 'Caterpillar first feeds on foliage, later bores into pods and feeds on seeds',
    portugese: 'A lagarta primeiro se alimenta da folhagem, depois perfura as vagens e se alimenta das sementes.'
  },
  {
    english: 'Spotted Pod Borer',
    portugese: 'Percevejo de vagens manchado.'
  },
  {
    english: 'Whitish growth of fungus',
    portugese: 'Crescimento esbranquiçado de fungos.'
  },
  {
    english: 'Pods turn brown to black',
    portugese: 'Vagens ficam marrons a pretas.'
  },
  {
    english: 'Stem Girdler',
    portugese: 'Roedor do caule.'
  },
  {
    english: 'Beans become discolored as a result of infection',
    portugese: 'Os feijões ficam descoloridos como resultado da infecção.'
  },
  {
    english: 'Earliest symptom is the appearance of a greyish brown water soaked lesion on the outer bark',
    portugese: 'O primeiro sintoma é o aparecimento de uma lesão encharcada de água acinzentada marrom na casca externa.'
  },
  {
    english: 'Cankers appear either on the main trunk, jorquettes or fan branches',
    portugese: 'Úlceras aparecem no tronco principal, jorquetes ou ramos leques.'
  },
  {
    english: 'A reddish brown liquid oozes out from these lesions, which later dries up to form rusty deposits',
    portugese: 'Um líquido marrom avermelhado escorre dessas lesões, que mais tarde seca para formar depósitos enferrujados.'
  },
  {
    english: 'First indication of the disease is a characteristic yellowing of one or two leaves on the second or third flush behind the growing tip',
    portugese: 'O primeiro sinal da doença é o amarelamento característico de uma ou duas folhas no segundo ou terceiro broto atrás do ápice em crescimento.'
  },
  {
    english: 'Diseased leaves fall within a few days of turning yellow and the other leaves on the shoot show similar symptoms',
    portugese: 'As folhas doentes caem dentro de alguns dias após ficarem amarelas e as outras folhas no broto apresentam sintomas semelhantes.'
  },
  {
    english: 'When the infected shoot is split lengthwise there is always a characteristic brown streaking',
    portugese: 'Quando o broto infectado é dividido longitudinalmente, sempre há um estriamento marrom característico.'
  },
  {
    english: 'Colonizes on the tender parts of the plant',
    portugese: 'Coloniza as partes tenras da planta.'
  },
  {
    english: 'Stunting, chlorosis, and defoliation',
    portugese: 'Enanismo, clorose e desfolhamento.'
  },
  {
    english: 'Circular water-soaked spots around the feeding punctures',
    portugese: 'Manchas circulares encharcadas de água ao redor das perfurações de alimentação.'
  },
  {
    english: 'Punctures appear as reddish brown spots',
    portugese: 'As perfurações aparecem como manchas marrons avermelhadas.'
  },
  {
    english: 'Leaves curl up, badly deformed, and shoots dry up',
    portugese: 'As folhas se enrolam, deformam-se gravemente e os brotos secam.'
  },
  {
    english: 'Nymphs and adults suck the sap from flowers, tender shoots, and pods',
    portugese: 'Ninfas e adultos sugam a seiva das flores, brotos tenros e vagens.'
  },
  {
    english: 'Excrete honey dew',
    portugese: 'Excretam melada.'
  },
  {
    english: 'Development of sooty mold fungus on the leaves and pods',
    portugese: 'Desenvolvimento de fungos de fuligem nas folhas e vagens.'
  },
  {
    english: 'Colonize on the underside of tender leaves, succulent stem, flower buds, and small cherelles',
    portugese: 'Colonizam na parte inferior das folhas tenras, caule suculento, botões florais e pequenas cerejas.'
  },
  {
    english: 'Premature shedding of flowers and curling of leaves',
    portugese: 'Queda prematura de flores e enrolamento de folhas.'
  },
  {
    english: 'Wilting and distortion of leaves and young shoots',
    portugese: 'Murchamento e distorção de folhas e brotos jovens.'
  },
  {
    english: 'Girdler the branches and inserts whitish spindle shaped eggs singly into the tissue in a slanting manner',
    portugese: 'Cortam os ramos e inserem ovos brancos em forma de fuso singularmente no tecido de forma inclinada.'
  },
  {
    english: 'Branches above the girdle wither and dry',
    portugese: 'Ramos acima do cinto secam e secam.'
  },
  {
    english: 'Wilting of branches',
    portugese: 'Murchamento dos ramos.'
  },
  {
    english: 'Coffee (saudi arabia)',
    portugese: 'Café (Arábia Saudita).'
  },
  {
    english: 'Khawlani',
    portugese: 'Khawlani.'
  },
  {
    english: 'Al Adini',
    portugese: 'Al Adini.'
  },
  {
    english: 'Al Tuffahi',
    portugese: 'Al Tuffahi.'
  },
  {
    english: 'Al Tisawa',
    portugese: 'Al Tisawa.'
  },
  {
    english: 'Berri',
    portugese: 'Berri.'
  },
  {
    english: 'Harari',
    portugese: 'Harari.'
  },
  {
    english: 'Bahri',
    portugese: 'Bahri.'
  },
  {
    english: 'Dark, dull or blue-green leaves',
    portugese: 'Folhas escuras, opacas ou azul-esverdeadas.'
  },
  {
    english: 'Leaves look burnt at the tip',
    portugese: 'As folhas parecem queimadas na ponta.'
  },
  {
    english: 'Yellowing and white interveinal stripping of lower leaves',
    portugese: 'Amarelamento e desfolhamento interveinal branco das folhas inferiores.'
  },
  {
    english: 'Vegetative buds instead of reproductive buds',
    portugese: 'Gomos vegetativos em vez de gomos reprodutivos.'
  },
  {
    english: 'SythenticFertilizerNitrogenUnit',
    portugese: 'Unidade de Nitrogênio de Fertilizante Sintético.'
  },
  {
    english: 'SythenticFertilizerPhosphorousUnit',
    portugese: 'Unidade de Fósforo de Fertilizante Sintético.'
  },
  {
    english: 'SythenticFertilizerPotassiumUnit',
    portugese: 'Unidade de Potássio de Fertilizante Sintético.'
  },
  {
    english: 'Milligram per Litter per Acre',
    portugese: 'Miligrama por Litro por Acre'
  },
  {
    english: 'Milligram per Litter per Hectare',
    portugese: 'Miligrama por Litro por Hectare'
  },
  {
    english: 'Milliliter per Litter per Acre',
    portugese: 'Mililitro por Litro por Acre'
  },
  {
    english: 'Milliliter per Litter per Hectare',
    portugese: 'Mililitro por Litro por Hectare'
  },
  {
    english: 'Milligram per litre per acre',
    portugese: 'Miligrama por litro por acre'
  },
  {
    english: 'Milligram per litre per hectare',
    portugese: 'Miligrama por litro por hectare'
  },
  {
    english: 'Yellow leaves',
    portugese: 'Folhas amarelas'
  },
  {
    english: 'Circular to irregular-shaped water-soaked spots on leaves.',
    portugese: 'Manchas aquosas de forma circular a irregular nas folhas.'
  },
  {
    english: 'Broad yellow hollow may be seen around lesions.',
    portugese: 'Pode ser visto um vazio amarelo amplo ao redor das lesões.'
  },
  {
    english: 'Round black spots on leaves',
    portugese: 'Manchas pretas redondas nas folhas'
  },
  {
    english: "Spots enlarged and concentric rings in a bull's eye pattern seen in the center of the diseased area",
    portugese: 'Manchas ampliadas e anéis concêntricos em um padrão de olho de boi vistos no centro da área doente.'
  },
  {
    english: 'Infected tubers shows a brown, corky dry rot.',
    portugese: 'Tubérculos infectados mostram uma podridão seca marrom e cortiça.'
  },
  {
    english: 'Plants shows dwarfing',
    portugese: 'Plantas apresentam nanismo'
  },
  {
    english: 'If affected tubers cut across, the browning of the xylem vessel is seen, and upon squeezing, the whitish bacterial oozes out.',
    portugese: 'Se os tubérculos afetados forem cortados transversalmente, é observado o escurecimento do vaso xilema e, ao apertar, a exsudação bacteriana esbranquiçada.'
  },
  {
    english: 'Plant shows wilting',
    portugese: 'Planta mostra murcha'
  },
  {
    english: 'Arial tubers',
    portugese: 'Tubérculos aéreos'
  },
  {
    english: 'On tubers, black sclerotial bodies are formed.',
    portugese: 'Nos tubérculos, formam-se corpos escleróticos pretos.'
  },
  {
    english: 'Raised, hard, black patches on the surface of the tuber',
    portugese: 'Manchas pretas elevadas e duras na superfície do tubérculo'
  },
  {
    english: 'Wilting of leaves',
    portugese: 'Murcha de folhas'
  },
  {
    english: 'Light-brown honey dew in the head just after flowering',
    portugese: 'Melada de cor marrom-clara na cabeça logo após a floração'
  },
  {
    english: 'The black purple, cattle-horn like, ergots covered with white sphacelia are produced in the infected flowers replacing the seeds',
    portugese: 'Os ergots negros roxos, parecidos com chifres de gado, cobertos com esfacélias brancas são produzidos nas flores infectadas, substituindo as sementes.'
  },
  {
    english: 'Sugary droplets on the infected flower parts.',
    portugese: 'Gotículas açucaradas nas partes da flor infectadas.'
  },
  {
    english: 'The lesions are drab, rectangular to long oval and about 2-5 x 1-2 mm in size.',
    portugese: 'As lesões são opacas, retangulares a ovaladas alongadas e têm cerca de 2-5 x 1-2 mm de tamanho.'
  },
  {
    english: 'Leaf Lesion',
    portugese: 'Lesão foliar'
  },
  {
    english: 'Swelling lessions at early spring',
    portugese: 'Inchaço nas lesões no início da primavera'
  },
  {
    english: 'Reddish brown to iron rust colour lessions',
    portugese: 'Manchas de cor ferrugem marrom avermelhada a ferrugem'
  },
  {
    english: 'Blackened stems and shrivelled grain',
    portugese: 'Hastes enegrecidas e grãos enrugados'
  },
  {
    english: 'The lesions are at first purplish black small spots and then become round and ash white',
    portugese: 'As lesões são inicialmente pequenas manchas pretas arroxeadas e depois tornam-se redondas e branco cinzentas'
  },
  {
    english: 'Leaf blight with rolling from leaf tip',
    portugese: 'Queima de folhas com enrolamento a partir da ponta da folha'
  },
  {
    english: 'Death of immature leaves',
    portugese: 'Morte de folhas imaturas'
  },
  {
    english: 'Branch dieback',
    portugese: 'Recuo dos ramos'
  },
  {
    english: 'Thinning of the canopy.',
    portugese: 'Desbaste da copa.'
  },
  {
    english: 'Wilted, yellowed, or browned leaves.',
    portugese: 'Folhas murchas, amareladas ou amarronzadas.'
  },
  {
    english: 'The stems develop water-soaked spots which later may be covered with a cottony white growth.',
    portugese: 'Os caules desenvolvem manchas encharcadas que posteriormente podem ser cobertas com um crescimento branco algodonoso.'
  },
  {
    english: 'As the disease progresses, affected portions of the stem develop a bleached appearance, and eventually the tissues shred.',
    portugese: 'Conforme a doença avança, as porções afetadas do caule desenvolvem uma aparência esbranquiçada e, eventualmente, os tecidos se desfazem.'
  },
  {
    english: 'Girdling of the stem results in premature ripening and in lodging of plants.',
    portugese: 'O anelamento do caule resulta em amadurecimento precoce e no tombamento das plantas.'
  },
  {
    english: 'Stem become hollow due to internal rotting.',
    portugese: 'O caule torna-se oco devido à podridão interna.'
  },
  {
    english: 'Midrib cracking of lower leaves, browning of veins and withering is observed.',
    portugese: 'Observa-se rachaduras da nervura central das folhas inferiores, escurecimento das veias e murcha.'
  },
  {
    english: 'In severe cases, the vesicular bundles of the stem also turn brown and the plant collapses.',
    portugese: 'Em casos graves, os feixes vasculares do caule também ficam marrons e a planta entra em colapso.'
  },
  {
    english: 'Patches of the crop wilt, exhibit stunted growth and have swollen, misshapen roots which decay by rotting.',
    portugese: 'Manchas da cultura murcham, exibem crescimento retardado e têm raízes inchadas e deformadas que se decompõem por apodrecimento.'
  },
  {
    english: 'Tiny nodules to large club shaped outgrowths develop in root system.',
    portugese: 'Pequenos nódulos a grandes crescimentos em forma de clava desenvolvem-se no sistema radicular.'
  },
  {
    english: 'Leaves turn pale green or yellow followed by wilting and under severe conditions the plants die',
    portugese: 'As folhas tornam-se verde-pálidas ou amarelas seguidas de murcha e, em condições severas, as plantas morrem'
  },
  {
    english: 'Leaf spots initially are angular, translucent, light green, later developing into grayish-white irregular necrotic (dead) patches.',
    portugese: 'As manchas nas folhas inicialmente são angulares, translúcidas, verde-claras, e depois se desenvolvem em manchas necróticas irregulares acinzentadas-brancas.'
  },
  {
    english: 'The stems of flower clusters become swollen.',
    portugese: 'Os caules dos cachos de flores ficam inchados.'
  },
  {
    english: 'Frequently associated with white rust. May develop late in the season on turnip-type (Polish) canola varieties.',
    portugese: 'Frequentemente associada à ferrugem branca. Pode se desenvolver tardiamente na temporada em variedades de canola do tipo nabo (polonês).'
  },
  {
    english: 'Damping-off may occur if plants are infected at the seedling stage due to infected seed.',
    portugese: 'A damping-off pode ocorrer se as plantas forem infectadas no estágio de plântula devido a sementes infectadas.'
  },
  {
    english: 'Plants affected after the seedling stage may be stunted. Generalized leaf spots, becoming numerous across the field, have been observed in fall-planted crops after initial windblown spore (ascospore) infections.',
    portugese: 'As plantas afetadas após o estágio de plântula podem ser retardadas. Manchas foliares generalizadas, tornando-se numerosas em todo o campo, foram observadas em cultivos plantados no outono após infecções iniciais de esporos transportados pelo vento (ascosporos).'
  },
  {
    english: 'Brown-to-black rot can be found inside affected stems. Vascular tissues may turn black in color prior to external rot symptoms.',
    portugese: 'A podridão marrom a preta pode ser encontrada dentro dos caules afetados. Os tecidos vasculares podem ficar pretos antes dos sintomas externos de podridão.'
  },
  {
    english: 'Hard black bodies, the sclerotia, are formed inside the stem and occasionally on the stem surface.',
    portugese: 'Corpos pretos duros, os esclerótios, são formados dentro do caule e ocasionalmente na superfície do caule.'
  },
  {
    english: 'First signs are red, yellow or purple colours at the ends or edges of older leaves, then yellowing in the middle of the leaf.',
    portugese: 'Os primeiros sinais são cores vermelhas, amarelas ou roxas nas extremidades ou bordas das folhas mais velhas, seguidas de amarelamento no meio da folha.'
  },
  {
    english: 'Late infected plants show leaf symptoms but are not stunted and have lower yield loss.',
    portugese: 'Plantas infectadas tardiamente apresentam sintomas foliares, mas não são atrofiadas e têm perda de rendimento inferior.'
  },
  {
    english: 'Colours are more intense between leaf veins and on the upper side of the leaf.',
    portugese: 'As cores são mais intensas entre as veias das folhas e no lado superior da folha.'
  },
  {
    english: 'Verticillium wilt in canola most often appear near the end of the season as the plants begin to ripen.',
    portugese: 'O murchamento por Verticillium na canola geralmente aparece perto do final da temporada, quando as plantas começam a amadurecer.'
  },
  {
    english: 'While the stem is still green, a vertical yellow or brown band extending up one side of the stem may be visible.',
    portugese: 'Enquanto o caule ainda está verde, uma faixa vertical amarela ou marrom que se estende por um lado do caule pode ser visível.'
  },
  {
    english: 'Infected plants are often stunted and pale, and produce fewer flowers, branches and pods.',
    portugese: 'As plantas infectadas costumam ser atrofiadas e pálidas, e produzem menos flores, ramos e vagens.'
  },
  {
    english: 'Yellow to brown spots on the upper leaf surface which have white dust-like spores on the corresponding under leaf surface.',
    portugese: 'Manchas amarelas a marrons na superfície superior da folha que têm esporos brancos semelhantes a poeira na superfície inferior correspondente da folha.'
  },
  {
    english: 'Swellings on roots and stems',
    portugese: 'Inchaços nas raízes e caules'
  },
  {
    english: 'Flowers get malformed and become sterile.',
    portugese: 'As flores ficam deformadas e se tornam estéreis.'
  },
  {
    english: 'First symptoms may appear as small, light green spots, which later turn white and finally result in blister-like, raised, white pustules, usually on the lower leaf surface.',
    portugese: 'Os primeiros sintomas podem aparecer como pequenas manchas verde-claras, que depois se tornam brancas e resultam finalmente em bolhas elevadas, brancas, geralmente na superfície inferior da folha.'
  },
  {
    english: 'Seed pedicels may terminate and form staghorns without seeds developing. Seed yield and quality are severely reduced.',
    portugese: 'Os pedicelos das sementes podem terminar e formar chifres sem que as sementes se desenvolvam. O rendimento e a qualidade das sementes são severamente reduzidos.'
  },
  {
    english: 'Pustules can develop on the upper or lower leaf surfaces or on stems and consist of masses of sporangia.',
    portugese: 'Pústulas podem se desenvolver nas superfícies superior ou inferior das folhas ou nos caules e consistir em massas de esporângios.'
  },
  {
    english: 'All floral parts are transformed into green leafy structures followed by abundant vein clearing in different flower parts.',
    portugese: 'Todas as partes florais são transformadas em estruturas folhosas verdes seguidas de desbaste abundante das veias em diferentes partes da flor.'
  },
  {
    english: 'In severe infection, the entire inflorescences is replaced by short twisted leaves closely arranged on a stem with short internodes, abundant abnormal branches bend down',
    portugese: 'Em infecções graves, a inflorescência inteira é substituída por folhas curtas torcidas dispostas próximas em um caule com entrenós curtos, abundantes ramos anormais dobram para baixo'
  },
  {
    english: 'Finally, plants look like witches broom.',
    portugese: 'Finalmente, as plantas parecem vassouras de bruxa.'
  },
  {
    english: 'Plants of all stage are affected.',
    portugese: 'Plantas de todas as fases são afetadas.'
  },
  {
    english: 'Water soaked, small and irregular spots are formed on the leaves which later increases and turn brown, under favourable conditions.',
    portugese: 'Manchas pequenas e irregulares encharcadas de água são formadas nas folhas, que mais tarde aumentam e tornam-se marrons, em condições favoráveis.'
  },
  {
    english: 'Leaves become dry and brittle, severely infected leaves defoliate',
    portugese: 'As folhas tornam-se secas e quebradiças, as folhas severamente infectadas desfolham'
  },
  {
    english: 'Disease appears as small, angular brown leaf spots of 3 mm diameter with gray center and dark margin delimited by veins.',
    portugese: 'A doença aparece como pequenas manchas foliares angulares marrons de 3 mm de diâmetro com centro cinza e margem escura delimitada por veias.'
  },
  {
    english: 'In severity of the disease defoliation occurs.',
    portugese: 'Na gravidade da doença ocorre desfolha.'
  },
  {
    english: 'Under favourable conditions, the disease spreads to leaf petiole, stem and capsules producing linear dark coloured deep seated lesions.',
    portugese: 'Em condições favoráveis, a doença se espalha para o pecíolo, caule e cápsulas produzindo lesões lineares profundas de cor escura.'
  },
  {
    english: 'The fungus attacks young seedling, their stem become water soaked soft and incapable of supporting the seedling which falls over and dies.',
    portugese: 'O fungo ataca plântulas jovens, seus caules ficam encharcados de água e macios, incapazes de sustentar a plântula que tomba e morre.'
  },
  {
    english: 'On older seedlings elongated brownish black lesions appear which increase in length and width girdling',
    portugese: 'Em plântulas mais velhas, aparecem lesões alongadas marrons a pretas que aumentam em comprimento e largura'
  },
  {
    english: 'The stem and plant dies.',
    portugese: 'O caule e a planta morrem.'
  },
  {
    english: 'The leaves turn yellow and then dry up slowly.',
    portugese: 'As folhas ficam amarelas e depois secam lentamente.'
  },
  {
    english: 'Begin drying of leaf tip downwards.',
    portugese: 'Começo da secagem da ponta da folha para baixo.'
  },
  {
    english: 'The entire plant shows complete drying of the foliage',
    portugese: 'A planta inteira mostra secagem completa da folhagem.'
  },
  {
    english: 'Leaves turn to pale green.',
    portugese: 'As folhas ficam verde-pálidas.'
  },
  {
    english: 'On leaves, cottony white mycelial growth develops and appears white.',
    portugese: 'Nas folhas, desenvolve-se crescimento micelial branco algodonoso e aparece branco.'
  },
  {
    english: 'White downy growth appears on the surface of the leaves.',
    portugese: 'Crescimento branco lanoso aparece na superfície das folhas.'
  },
  {
    english: 'Botrytis is the major disease of onions in cool climate areas.',
    portugese: 'Botrytis é a principal doença da cebola em áreas de clima frio.'
  },
  {
    english: 'Light infections do not affect yields but heavy infections causing major yield reductions can occur.',
    portugese: 'Infecções leves não afetam os rendimentos, mas infecções graves que causam grandes reduções nos rendimentos podem ocorrer.'
  },
  {
    english: 'Hundreds of white specks are seen on the foliage.',
    portugese: 'Centenas de pontinhos brancos são vistos na folhagem.'
  },
  {
    english: 'Seedlings topple after emerging from soil.',
    portugese: 'As plântulas tombam após emergirem do solo.'
  },
  {
    english: 'It occurs at ground or below ground level.',
    portugese: 'Ocorre ao nível do solo ou abaixo do solo.'
  },
  {
    english: 'Infected tissues appear soft and water soaked.',
    portugese: 'Os tecidos infectados parecem moles e encharcados de água.'
  },
  {
    english: 'Black smut sori are seen at the base of the leaves and leaf surface.',
    portugese: 'Esporos de carvão negro são vistos na base das folhas e na superfície das folhas.'
  },
  {
    english: 'Black powdery mass is seen after rupturing of sorus wall.',
    portugese: 'Massa pulverulenta negra é vista após a ruptura da parede do soros.'
  },
  {
    english: 'The infection progresses inward from leaf to leaf',
    portugese: 'A infecção avança para dentro, de folha para folha.'
  },
  {
    english: 'The initial symptoms are yellowing and dieback of leaf tips.',
    portugese: 'Os sintomas iniciais são o amarelamento e o secamento das pontas das folhas.'
  },
  {
    english: 'Later, scales, stem plates and roots get destroyed.',
    portugese: 'Posteriormente, as escamas, placas do caule e raízes são destruídas.'
  },
  {
    english: 'The bulbs become soft and water soaked.',
    portugese: 'Os bulbos ficam moles e encharcados de água.'
  },
  {
    english: 'Begins as small, elliptical lesions.',
    portugese: 'Começa como pequenas lesões elípticas.'
  },
  {
    english: 'Lesions turn purplish-brown progressively surrounded by chlorotic margins.',
    portugese: 'As lesões ficam progressivamente marrom-arroxeadas cercadas por margens cloróticas.'
  },
  {
    english: 'Lesions begin at tip of older leaves and accumulate on the leaves making it fall off',
    portugese: 'As lesões começam na ponta das folhas mais antigas e se acumulam nas folhas, fazendo-as cair.'
  },
  {
    english: 'Yellow to orange colored small flecks develop in the middle of the leaf.',
    portugese: 'Pequenas manchas de cor amarela a laranja se desenvolvem no meio da folha.'
  },
  {
    english: 'Flecks spread to form elongated, spindle shaped to ovate, diffused spots.',
    portugese: 'Manchas se espalham para formar manchas alongadas, em forma de fuso para ovadas, difusas.'
  },
  {
    english: 'Flecks are surrounded by a characteristic pink margin.',
    portugese: 'As manchas são cercadas por uma margem rosa característica.'
  },
  {
    english: 'Abnormal elongation of the neck.',
    portugese: 'Elongação anormal do pescoço.'
  },
  {
    english: 'Water-soaked lesions that are pale yellow in color appear initially on leaf blades.',
    portugese: 'Lesões encharcadas de água, de cor amarelo pálido, aparecem inicialmente nas lâminas foliares.'
  },
  {
    english: 'Infected leaves develop yellow streaks that spread progressively leading to yellow leaves.',
    portugese: 'As folhas infectadas desenvolvem estrias amarelas que se espalham progressivamente, levando a folhas amarelas.'
  },
  {
    english: 'Leaves curl and plants wilt.',
    portugese: 'As folhas enrolam e as plantas murcham.'
  },
  {
    english: 'Bulbs do not grow to full size although they are firm and solid.',
    portugese: 'Os bulbos não crescem até o tamanho completo, embora sejam firmes e sólidos.'
  },
  {
    english: 'Leaves show lesions that maybe diamond or spindle-shaped.',
    portugese: 'As folhas apresentam lesões que podem ser em forma de diamante ou fuso.'
  },
  {
    english: 'They are straw-colored and sometimes have distinct green center with yellow borders.',
    portugese: 'Elas têm cor de palha e às vezes têm um centro verde distinto com bordas amarelas.'
  },
  {
    english: 'Flower stalks are infected in later stages.',
    portugese: 'As hastes das flores são infectadas em estágios posteriores.'
  },
  {
    english: 'Reduced bulb size',
    portugese: 'Redução do tamanho do bulbo.'
  },
  {
    english: 'Roots turn pink or maroon when infected.',
    portugese: 'As raízes ficam cor-de-rosa ou marrom quando infectadas.'
  },
  {
    english: 'In severe cases the roots may die and the plants become weakened',
    portugese: 'Em casos graves, as raízes podem morrer e as plantas ficam enfraquecidas.'
  },
  {
    english: 'Infection usually is through neck tissues as foliage dies down at maturity.',
    portugese: 'A infecção geralmente ocorre através dos tecidos do pescoço à medida que a folhagem morre quando madura.'
  },
  {
    english: 'Infected bulbs are discoloured black around the neck, and affected scales shrivel.',
    portugese: 'Os bulbos infectados ficam descoloridos de preto ao redor do pescoço e as escamas afetadas enrugam.'
  },
  {
    english: 'Masses of powdery black spores develop as streaks along veins on and between outer dry scale',
    portugese: 'Massas de esporos pretos pulverulentos se desenvolvem como estrias ao longo das veias na escama externa seca.'
  },
  {
    english: 'Infected bulbs are discoloured green around the neck, and affected scales shrivel.',
    portugese: 'Os bulbos infectados ficam descoloridos de verde ao redor do pescoço e as escamas afetadas enrugam.'
  },
  {
    english: 'Masses of powdery green spores generally are arranged as streaks along veins on',
    portugese: 'Massas de esporos verdes pulverulentos geralmente são dispostas como estrias ao longo das veias em'
  },
  {
    english: 'Bacterial soft rot is mainly a problem on mature bulbs.',
    portugese: 'A podridão mole bacteriana é principalmente um problema em bulbos maduros.'
  },
  {
    english: 'Affected scales first appear water-soaked and pale yellow to light brown.',
    portugese: 'As escamas afetadas primeiro aparecem encharcadas de água e de cor amarelo pálido a marrom claro.'
  },
  {
    english: 'As the soft rot progresses, invaded fleshy scales become soft',
    portugese: 'Conforme a podridão mole avança, as escamas carnudas invadidas ficam moles'
  },
  {
    english: 'Leaves turn yellow',
    portugese: 'As folhas ficam amarelas.'
  },
  {
    english: 'Main root system rots away.',
    portugese: 'O sistema radicular principal apodrece.'
  },
  {
    english: 'Tea bush eventually dies.',
    portugese: 'O arbusto de chá eventualmente morre.'
  },
  {
    english: 'Decline of the bush',
    portugese: 'Declínio do arbusto.'
  },
  {
    english: 'Wood bears superficial irregular dark‐grey to black raised patches',
    portugese: 'A madeira apresenta manchas escuras irregulares superficialmente elevadas de cinza escuro a preto.'
  },
  {
    english: 'Dead branches carry small black patches.',
    portugese: 'Os ramos mortos apresentam pequenas manchas pretas.'
  },
  {
    english: 'Yellow or brown foliage on affected branches',
    portugese: 'Folhagem amarela ou marrom nos ramos afetados.'
  },
  {
    english: 'Lesions at the collar region of the bush',
    portugese: 'Lesões na região do colarinho do arbusto.'
  },
  {
    english: 'Dead wood can be seen by scraping back the bark',
    portugese: 'A madeira morta pode ser vista raspando a casca para trás.'
  },
  {
    english: 'Small, oval, pale yellow-green spots appearing on young leaves.',
    portugese: 'Pequenas manchas ovais de cor verde-amarelada aparecendo em folhas jovens.'
  },
  {
    english: 'Spots are surrounded by a narrow, yellow zone.',
    portugese: 'As manchas são cercadas por uma zona estreita e amarela.'
  },
  {
    english: 'Eventually, the dried tissue falls, leading to defoliation',
    portugese: 'Eventualmente, o tecido seco cai, levando à desfoliação.'
  },
  {
    english: 'Seedlings develop yellowish cotyledons and may be reddish on the underside; seedlings may die within two to four weeks after planting.',
    portugese: 'As plântulas desenvolvem cotilédones amarelados e podem apresentar coloração avermelhada na parte inferior; as plântulas podem morrer dentro de duas a quatro semanas após o plantio.'
  },
  {
    english: 'Leaves may have a bluish-green cast.',
    portugese: 'As folhas podem ter uma coloração azul-esverdeada.'
  },
  {
    english: 'Roots are grayish or light brown, water-soaked, and have a reduced mass.',
    portugese: 'As raízes são acinzentadas ou marrom-claras, encharcadas de água e têm massa reduzida.'
  },
  {
    english: 'Plants appear stunted and yellow.',
    portugese: 'As plantas parecem atrofiadas e amareladas.'
  },
  {
    english: 'Lateral and fibrous roots are reduced.',
    portugese: 'As raízes laterais e fibrosas são reduzidas.'
  },
  {
    english: 'Existing roots may be black and rotted.',
    portugese: 'As raízes existentes podem estar pretas e podres.'
  },
  {
    english: 'Seedlings fail to emerge or die soon after emergence.',
    portugese: 'As plântulas não conseguem emergir ou morrem logo após a emergência.'
  },
  {
    english: 'Plants appear stunted, yellow or reddish-purple lower leaves, may be wilted.',
    portugese: 'As plantas parecem atrofiadas, com folhas inferiores amarelas ou roxo-avermelhadas, podendo estar murchas.'
  },
  {
    english: 'Taproots have tan to brown or red-brown to black lesions and can be rotted just below the crown',
    portugese: 'As raízes principais têm lesões de cor bege a marrom ou marrom-avermelhado a preto e podem estar apodrecidas logo abaixo da coroa.'
  },
  {
    english: 'If emergence occurs, plants appear stunted, yellowish, may be wilted.',
    portugese: 'Se a emergência ocorrer, as plantas aparecem atrofiadas, amareladas, podendo estar murchas.'
  },
  {
    english: 'Roots appear waterlogged, mushy, rotted.',
    portugese: 'As raízes parecem encharcadas, moles, podres.'
  },
  {
    english: 'Stunted plants have many spindly, shortened stems and small, light green to yellow leaflets.',
    portugese: 'Plantas atrofiadas têm muitos caules esguios e encurtados e folíolos pequenos, de cor verde-claro a amarelo.'
  },
  {
    english: 'Outer vascular taproot tissue becomes yellow to dark golden brown.',
    portugese: 'O tecido vascular externo da raiz principal torna-se de amarelo a marrom-dourado escuro.'
  },
  {
    english: 'Leaves may be cupped.',
    portugese: 'As folhas podem estar encurvadas.'
  },
  {
    english: 'Tan, sunken, and elliptical lesions develop on the taproot where lateral roots emerge',
    portugese: 'Lesões de cor bege, afundadas e elípticas desenvolvem-se na raiz principal onde as raízes laterais emergem.'
  },
  {
    english: 'During the winter, existing root lesions turn black.',
    portugese: 'Durante o inverno, as lesões radiculares existentes ficam pretas.'
  },
  {
    english: 'Scattered, wilted plants are the first evidence.',
    portugese: 'Plantas murchas e espalhadas são as primeiras evidências.'
  },
  {
    english: 'One side of the stem may wilt and die or the whole plant may be affected.',
    portugese: 'Um lado do caule pode murchar e morrer ou toda a planta pode ser afetada.'
  },
  {
    english: 'Stems and leaves appear bleached',
    portugese: 'Os caules e as folhas parecem descorados.'
  },
  {
    english: "Stem tips wilt and bend forming a shepherd's crook",
    portugese: 'As pontas dos caules murcham e dobram formando um "gancho de pastor".'
  },
  {
    english: 'Diamond-shaped, ash-gray lesions with dark-brown to purple borders develop on lower stems.',
    portugese: 'Lesões de forma diamantada, de cor cinza-fuligem com bordas de marrom-escuro a roxo desenvolvem-se nos caules inferiores.'
  },
  {
    english: 'Lesions may girdle the stem, causing plants to wilt, drop leaves, and have straw-colored shoots.',
    portugese: 'As lesões podem circundar o caule, causando o murchamento das plantas, a queda de folhas e brotos de cor palha.'
  },
  {
    english: 'Systemic symptoms, such as chlorosis, generally appear on the second leaf, and all the subsequent leaves and panicles of the infected plant show symptoms.',
    portugese: 'Os sintomas sistêmicos, como a clorose, geralmente aparecem na segunda folha, e todas as folhas subsequentes e panículas da planta infectada mostram sintomas.'
  },
  {
    english: 'Leaf symptoms begin as chlorosis at the base of the leaf lamina, and successively higher leaves show a progression of greater leaf area coverage by the symptoms.',
    portugese: 'Os sintomas foliares começam como clorose na base da lâmina foliar, e folhas sucessivamente mais altas mostram uma progressão de maior cobertura da área foliar pelos sintomas.'
  },
  {
    english: 'Infected chlorotic areas produce a massive amount of asexual spores, generally on the lower surface, giving the leaf a "downy" appearance.',
    portugese: 'As áreas cloróticas infectadas produzem uma quantidade massiva de esporos assexuais, geralmente na superfície inferior, conferindo à folha uma aparência "lanosa".'
  },
  {
    english: 'Rust symptoms first appear on lower leaves as typical pustules containing reddish-brown powder (uredospores).',
    portugese: 'Os sintomas de ferrugem aparecem primeiro nas folhas inferiores como pústulas típicas contendo pó marrom-avermelhado (uredósporos).'
  },
  {
    english: 'Later, dark brown teliospores are produced. Symptoms can occur on both the upper and lower surfaces of the leaves but mostly on the upper surface and also on the stem. Highly susceptible cultivars develop large pustules on leaf blades and sheaths.',
    portugese: 'Posteriormente, são produzidos teliosporos marrons escuros. Os sintomas podem ocorrer em ambas as superfícies das folhas, mas principalmente na superfície superior e também no caule. Cultivares altamente suscetíveis desenvolvem grandes pústulas nas lâminas foliares e bainhas.'
  },
  {
    english: 'It appears, generally after the grain-filling stage, causing little or no loss in grain yield.',
    portugese: 'Aparece geralmente após o estágio de enchimento dos grãos, causando pouco ou nenhum prejuízo na produção de grãos.'
  },
  {
    english: 'In the infected florets, ovaries are converted into structures called sori.',
    portugese: 'Nas flores infectadas, os ovários são convertidos em estruturas chamadas soros.'
  },
  {
    english: 'The sori are larger than grains and appear as enlarged, oval to conical bodies projecting somewhat beyond the glumes in place of grains. Initially,',
    portugese: 'Os soros são maiores do que os grãos e aparecem como corpos ovalados a cônicos aumentados, projetando-se um pouco além das glumas no lugar dos grãos. Inicialmente,'
  },
  {
    english: 'The sori are bright green but later turn brown to black',
    portugese: 'Os soros são verde brilhante, mas depois ficam marrom a preto'
  },
  {
    english: 'The disease is easily identified as a honeydew substance of creamy to light pinkish ooze out of the infected florets which contains numerous conidia.',
    portugese: 'A doença é facilmente identificada como uma substância de melada de cor creme a rosada clara que escorre das flores infectadas, contendo numerosas conídias.'
  },
  {
    english: 'Within two weeks, these droplets dry out as hard dark black structures larger than seeds, protruding out from the florets in place of grain, which are called sclerotia.',
    portugese: 'Dentro de duas semanas, essas gotículas secam e se tornam estruturas pretas escuras e duras maiores do que as sementes, projetando-se para fora das flores no lugar do grão, chamadas de esclerócios.'
  },
  {
    english: 'Here the loss in grain yield is directly proportional to the percentage of infection as the infected seed is fully transformed into sclerotium.',
    portugese: 'Aqui a perda na produção de grãos é diretamente proporcional ao percentual de infecção, pois a semente infectada é totalmente transformada em esclerócio.'
  },
  {
    english: 'Whip-like structure of 25 – 150 cm. Whip covered by translucent silvery membrane enclosing a mass of black powdery spores.',
    portugese: 'Estrutura semelhante a um chicote de 25 a 150 cm. O chicote é coberto por uma membrana prateada translúcida, envolvendo uma massa de esporos em pó preto.'
  },
  {
    english: 'These spots turn red-brown to brown in color',
    portugese: 'Essas manchas tornam-se vermelho-marrom a marrom'
  },
  {
    english: 'Affected leaves are brittle with their margins rolled upwards.',
    portugese: 'As folhas afetadas são quebradiças com as bordas enroladas para cima.'
  },
  {
    english: 'Do not produce bunches of any commercial value',
    portugese: 'Não produzem cachos de nenhum valor comercial'
  },
  {
    english: 'Yellowing of lower leaves, including leaf blades and petioles.',
    portugese: 'Amarelamento das folhas inferiores, incluindo lâminas foliares e pecíolos.'
  },
  {
    english: 'Yellowish to reddish streaks are noted with intensification of color towards the rhizome.',
    portugese: 'Estrias amareladas a avermelhadas são observadas com intensificação da cor em direção ao rizoma.'
  },
  {
    english: 'Longitudinal splitting of pseudostem.',
    portugese: 'Rachadura longitudinal do pseudocaule.'
  },
  {
    english: 'Infected fruits become black and rotten.',
    portugese: 'Os frutos infectados ficam pretos e podres.'
  },
  {
    english: 'Black lesions on the pedicel.',
    portugese: 'Lesões pretas no pedicelo.'
  },
  {
    english: 'Fruit shrivelled',
    portugese: 'Fruta enrugada'
  },
  {
    english: 'Reduced bunch size and uneven ripening of fruit',
    portugese: 'Tamanho do cacho reduzido e amadurecimento desigual da fruta'
  },
  {
    english: 'Reduces the plant\'s photosynthetic potential.',
    portugese: 'Reduz o potencial fotossintético da planta.'
  },
  {
    english: 'Defoliation',
    portugese: 'Desfolhamento'
  },
  {
    english: 'Small water-soaked tan spots on outer leaves',
    portugese: 'Pequenas manchas castanhas encharcadas de água nas folhas exteriores'
  },
  {
    english: 'Shot-hole appearance on the plant',
    portugese: 'Aparência de buraco de tiro na planta'
  },
  {
    english: 'Outer leaves often break off',
    portugese: 'As folhas exteriores frequentemente quebram'
  },
  {
    english: 'Soft watery lesions on leaves',
    portugese: 'Lesões aquosas e suaves nas folhas'
  },
  {
    english: 'Leaves collapse and lie on the soil surface',
    portugese: 'As folhas caem e deitam-se na superfície do solo'
  },
  {
    english: 'Black fungal structures on infected leaf tissue',
    portugese: 'Estruturas fúngicas negras no tecido foliar infectado'
  },
  {
    english: 'White fungal growth on both sides of leaves',
    portugese: 'Crescimento fúngico branco em ambos os lados das folhas'
  },
  {
    english: 'Leaves turning yellow or brown',
    portugese: 'Folhas a ficarem amarelas ou castanhas'
  },
  {
    english: 'Small black fruiting bodies may be visible',
    portugese: 'Pequenos corpos frutíferos pretos podem ser visíveis'
  },
  {
    english: 'Small chlorotic spots on old leaves',
    portugese: 'Pequenas manchas cloróticas nas folhas antigas'
  },
  {
    english: 'Lesions may fall out creating holes',
    portugese: 'As lesões podem cair, criando buracos'
  },
  {
    english: 'Wilting leaves and plant death',
    portugese: 'Murchamento das folhas e morte da planta'
  },
  {
    english: 'Veins enlarged and clear',
    portugese: 'Veias aumentadas e claras'
  },
  {
    english: 'Puckered or ruffled leaves',
    portugese: 'Folhas enrugadas ou franzidas'
  },
  {
    english: 'Upright outer leaves',
    portugese: 'Folhas exteriores erectas'
  },
  {
    english: 'Circular lesions and black patches on chili pods',
    portugese: 'Lesões circulares e manchas pretas em vagens de pimenta'
  },
  {
    english: 'Irregular brown spots with dark brown holes on leaves and stems',
    portugese: 'Manchas castanhas irregulares com buracos castanhos escuros nas folhas e nos caules'
  },
  {
    english: 'The affected fruits may fall off subsequently',
    portugese: 'As frutas afetadas podem cair subsequentemente'
  },
  {
    english: 'Black lesions on stems',
    portugese: 'Lesões negras nos caules'
  },
  {
    english: 'Circular gray-brown lesions on leaves and wilting of the plant',
    portugese: 'Lesões circulares de cor castanho-acinzentado nas folhas e murchamento da planta'
  },
  {
    english: 'Dark lesions on fruit which may be covered in white sporangia',
    portugese: 'Lesões escuras na fruta que podem estar cobertas de esporângios brancos'
  },
  {
    english: 'Upward curling in the leaves, crinkling appearance',
    portugese: 'Enrolamento para cima nas folhas, aparência franzida'
  },
  {
    english: 'Shortening of petioles, internodes, and bunchy leaves',
    portugese: 'Encurtamento dos pecíolos, internódios e folhas aglomeradas'
  },
  {
    english: 'Severe stunting in plants',
    portugese: 'Atraso grave no crescimento das plantas'
  },
  {
    english: 'The leaves turn yellow and die',
    portugese: 'As folhas ficam amarelas e morrem'
  },
  {
    english: 'Initial slight yellowing of the foliage and wilting of the upper leaves',
    portugese: 'Amarelecimento inicial ligeiro da folhagem e murchamento das folhas superiores'
  },
  {
    english: 'The vascular system of the plant is discoloured',
    portugese: 'O sistema vascular da planta está descolorido'
  },
  {
    english: 'Dieback of twigs',
    portugese: 'Morte de galhos'
  },
  {
    english: 'Premature leaf drop',
    portugese: 'Queda prematura das folhas'
  },
  {
    english: 'Dark staining on fruit',
    portugese: 'Manchas escuras na fruta'
  },
  {
    english: 'The disease causes small, round blister-like formations on leaves, branches, stems, new shoots, and fruit',
    portugese: 'A doença causa pequenas formações redondas semelhantes a bolhas em folhas, ramos, caules, novos brotos e frutas'
  },
  {
    english: 'Crater-like lesions form on the surface surrounded by an oily, water-soaked margin or yellow halo',
    portugese: 'Lesões em forma de cratera formam-se na superfície, rodeadas por uma margem oleosa encharcada de água ou um halo amarelo'
  },
  {
    english: 'In young fruit, an ooze of resinous substance may be observed.',
    portugese: 'Em frutas jovens, pode-se observar uma exsudação de substância resinosas.'
  },
  {
    english: 'Citrus scab attacks the fruit, leaves, and twigs, producing slightly raised, irregular scabby or wart-like outgrowths.',
    portugese: 'A sarna cítrica ataca a fruta, folhas e galhos, produzindo crescimentos levemente elevados, irregulares, descamativos ou semelhantes a verrugas.'
  },
  {
    english: 'The scabs are grey or pinkish at first and become darker with age. They are more common on lemon fruits than leaves.',
    portugese: 'As crostas são cinzentas ou rosadas no início e tornam-se mais escuras com a idade. São mais comuns em frutas de limão do que em folhas.'
  },
  {
    english: 'The raised lumps associated with scab can be confused with symptoms caused by the disease botrytis or with wind-rub abrasions.',
    portugese: 'Os inchaços elevados associados à sarna podem ser confundidos com sintomas causados pela doença botrytis ou com abrasões causadas pelo vento.'
  },
  {
    english: 'Light green foliage, poor new growth, leaves may be dropping from the tree',
    portugese: 'Folhagem verde clara, crescimento novo fraco, folhas podem estar caindo da árvore'
  },
  {
    english: 'Severely infected trees are stunted and bushy in appearance with chlorotic leaves and brittle twigs',
    portugese: 'Árvores gravemente infectadas são atrofiadas e arbustivas, com aparência de folhas cloróticas e galhos quebradiços'
  },
  {
    english: 'Some strains of the virus cause elongated pits in the trunk and branches, which give the wood a rope-like appearance.',
    portugese: 'Algumas cepas do vírus causam fossas alongadas no tronco e nos galhos, o que confere à madeira uma aparência semelhante a corda.'
  },
  {
    english: 'Yellowing of leaf veins, blotchy mottling on leaf blades',
    portugese: 'Amarelecimento das veias das folhas, marmorização irregular nas lâminas das folhas'
  },
  {
    english: 'Twig and limb dieback and fruits dropping prematurely',
    portugese: 'Morte de ramos e galhos e queda prematura de frutos'
  },
  {
    english: 'Small, misshapen fruit and fruit very bitter.',
    portugese: 'Frutas pequenas e deformadas e frutas muito amargas.'
  },
  {
    english: 'Pale brown sunken spots may appear on the cotyledons of infected seedlings.',
    portugese: 'Manchas afundadas de cor marrom pálido podem aparecer nos cotilédones de plântulas infectadas.'
  },
  {
    english: 'Lesions on leaves are dark brown.',
    portugese: 'As lesões nas folhas são de cor marrom escura.'
  },
  {
    english: 'They are restricted to the veins on the lower leaf surface. On stems, lesions are elongated and sunken.',
    portugese: 'Elas estão restritas às veias na superfície inferior da folha. Nos caules, as lesões são alongadas e afundadas.'
  },
  {
    english: 'The fungus produces a grey mould on the lower surface of the spots.',
    portugese: 'O fungo produz um mofo cinzento na superfície inferior das manchas.'
  },
  {
    english: 'Infected pods have brown blotches',
    portugese: 'Vagens infectadas têm manchas marrons'
  },
  {
    english: 'The spots may increase in size, join together, and cause yellowing and necrosis of the affected leaves',
    portugese: 'As manchas podem aumentar de tamanho, juntar-se e causar amarelecimento e necrose das folhas afetadas'
  },
  {
    english: 'Rust-colored pustules form on the lower leaf surfaces.',
    portugese: 'Pústulas de cor ferrugem se formam na superfície inferior das folhas.'
  },
  {
    english: 'Severely infected leaves turn yellow, wilt, and then drop off of the plant.',
    portugese: 'Folhas gravemente infectadas ficam amarelas, murcham e depois caem da planta.'
  },
  {
    english: 'Stems and pods may also be infected. It affects most types of beans under humid conditions',
    portugese: 'Caules e vagens também podem ser infectados. Afeta a maioria dos tipos de feijão em condições úmidas'
  },
  {
    english: 'Symptoms of bean common mosaic virus (BCMV) are cupping and twisting of leaves with a light and dark green mosaic pattern.',
    portugese: 'Os sintomas do vírus do mosaico comum do feijão (BCMV) são a xícara e a torção das folhas com um padrão de mosaico verde claro e escuro.'
  },
  {
    english: 'The dark green tissue is often bubbled and/or in bands next to the veins.',
    portugese: 'O tecido verde escuro frequentemente apresenta bolhas e/ou faixas próximas às veias.'
  },
  {
    english: 'Affected plants produce smaller, curled pods with a greasy appearance resulting in poor yields.',
    portugese: 'As plantas afetadas produzem vagens menores e enroladas com uma aparência oleosa resultando em baixos rendimentos.'
  },
  {
    english: 'The initial symptoms of sweet orange scab form on very young fruit as lesions that are slightly raised and pink to light brown.',
    portugese: 'Os sintomas iniciais da sarna doce da laranja formam-se em frutas muito jovens como lesões que são levemente elevadas e rosadas a marrom claro.'
  },
  {
    english: 'The lesion color changes to yellowish brown and eventually to dark gray.',
    portugese: 'A cor da lesão muda para marrom amarelado e eventualmente para cinza escuro.'
  },
  {
    english: 'Orange scab can cause premature fruit drop and stunt young nursery trees and new field plantings, but has little impact on fruit quality.',
    portugese: 'A sarna laranja pode causar queda prematura de frutos e prejudicar árvores jovens de viveiro e novos plantios no campo, mas tem pouco impacto na qualidade dos frutos.'
  },
  {
    english: 'Trees infected with tristeza show light green foliage, and some leaf drop.',
    portugese: 'Árvores infectadas com a tristeza mostram folhagem verde clara e alguma queda de folhas.'
  },
  {
    english: 'Feeder roots die from the tip towards the main root.',
    portugese: 'As raízes alimentadoras morrem da ponta em direção à raiz principal.'
  },
  {
    english: 'Yellow seedlings, Stem pitting, poor fruit quality',
    portugese: 'Plântulas amarelas, Pontuações no caule, Má qualidade dos frutos'
  },
  {
    english: 'Lopsided, bitter, hard fruit with small, dark aborted seeds',
    portugese: 'Fruta desigual, amarga, dura com sementes pequenas e escuras abortadas'
  },
  {
    english: 'Fruit that remains green even when ripe',
    portugese: 'Fruta que permanece verde mesmo quando madura'
  },
  {
    english: 'Asymmetrical blotchy mottling of leaves, yellow shoots, twig dieback',
    portugese: 'Marmorização manchada assimétrica das folhas, brotos amarelos, morte de galhos'
  },
  {
    english: 'The earliest symptom of garlic rust is small, circular to elongate white flecks that occur on both sides of leaves.',
    portugese: 'O primeiro sintoma da ferrugem do alho são pequenas manchas brancas circulares a alongadas que ocorrem em ambos os lados das folhas.'
  },
  {
    english: 'As the disease progresses, these small spots expand, and the leaf tissue covering the lesions ruptures and masses of orange, powdery spores (uredospores) then become visible as pustules.',
    portugese: 'Conforme a doença avança, essas pequenas manchas se expandem, e o tecido foliar que cobre as lesões se rompe e massas de esporos alaranjados e pulverulentos (uredósporos) então se tornam visíveis como pústulas.'
  },
  {
    english: 'Severely infected leaves are almost entirely covered with pustules, resulting in extensive yellowing, wilting and premature drying of leaves.',
    portugese: 'Folhas gravemente infectadas são quase inteiramente cobertas por pústulas, resultando em amarelamento extensivo, murcha e secagem prematura das folhas.'
  },
  {
    english: 'Twisting, curling of leaves.',
    portugese: 'Torção, enrolamento das folhas.'
  },
  {
    english: 'Water-soaked lesions that are pale yellow in colour appear initially on leaf blades.',
    portugese: 'Lesões encharcadas de água que são de cor amarelo pálido aparecem inicialmente nas lâminas das folhas.'
  },
  {
    english: 'Parts of spear leaf petiole or rachi turning brown',
    portugese: 'Partes do pecíolo ou raque da folha de lança ficando marrom'
  },
  {
    english: 'Discoloration may be associated with a wet rot',
    portugese: 'A descoloração pode estar associada a uma podridão úmida'
  },
  {
    english: 'Spear leaf may be wilted and/or chlorotic',
    portugese: 'A folha de lança pode estar murcha e/ou clorótica'
  },
  {
    english: 'Reduced growth of palm and older fronds turning chlorotic or necrotic',
    portugese: 'Crescimento reduzido da palma e frondes mais antigas tornando-se cloróticas ou necróticas'
  },
  {
    english: 'Pale green foliage',
    portugese: 'Folhagem verde pálida'
  },
  {
    english: 'Drooping fronds',
    portugese: 'Frondes caídas'
  },
  {
    english: 'Field palms may exhibit a bright yellow chlorosis of leaves in the mid-canopy which starts at the tip pf the pinnae and moves towards petioles before affecting adjacent fronds and spreading to older leaves in the canopy.',
    portugese: 'As palmeiras de campo podem apresentar uma clorose amarela brilhante das folhas no meio da copa, que começa na ponta das pinas e se move em direção aos pecíolos antes de afetar as frondes adjacentes e se espalhar para folhas mais antigas na copa.'
  },
  {
    english: 'In older palms, lower leaves wilt and dry out and fronds break close to the base of the trunk; new fronds are chlorotic and stunted.',
    portugese: 'Nas palmeiras mais antigas, as folhas inferiores murcham e secam, e as frondes quebram perto da base do tronco; novas frondes são cloróticas e atrofiadas.'
  },
  {
    english: 'Drying of leaves',
    portugese: 'Secagem das folhas'
  },
  {
    english: 'Tiny black spots on leaves which enlarge into 2 mm long elliptical, elongated lesions',
    portugese: 'Pequenas manchas pretas nas folhas que se expandem em lesões elípticas e alongadas de 2 mm de comprimento'
  },
  {
    english: 'Lesions may expand and be surrounded by black tissue and chlorosis between lesions',
    portugese: 'As lesões podem se expandir e serem cercadas por tecido preto e clorose entre as lesões'
  },
  {
    english: 'Lesions may be present on leaf petioles and rachis',
    portugese: 'As lesões podem estar presentes nos pecíolos das folhas e nas ráquis'
  },
  {
    english: 'Leaf symptoms include round, brown spots with concentric rings',
    portugese: 'Os sintomas nas folhas incluem manchas redondas e marrons com anéis concêntricos'
  },
  {
    english: 'Spots often have a yellow halo, and can crack through the middle',
    portugese: 'As manchas frequentemente têm um halo amarelo e podem rachar ao meio'
  },
  {
    english: 'As the disease spreads, leaves can develop enough spots that they begin to meld together to create large necrotic areas on leaves',
    portugese: 'Conforme a doença se espalha, as folhas podem desenvolver manchas suficientes para que comecem a se fundir para criar grandes áreas necróticas nas folhas'
  },
  {
    english: 'The young radical and the plumule are killed and there is complete rotting of the seedlings',
    portugese: 'A raiz jovem e a plúmula são mortas e há apodrecimento completo das plântulas'
  },
  {
    english: 'The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level',
    portugese: 'A fase pós-emergência é caracterizada pela infecção dos tecidos jovens e juvenis do colarinho ao nível do solo'
  },
  {
    english: 'The seedlings topple over or  collapse',
    portugese: 'As plântulas tombam ou colapsam'
  },
  {
    english: 'First appear as chlorotic or yellow (angular) areas near the leaf margins',
    portugese: 'Primeiro aparecem como áreas cloróticas ou amarelas (angulares) próximas às margens das folhas'
  },
  {
    english: 'Yellow area extends to veins and midrib forming characteristic ‘v’ shaped chlorotic spots which later turn black',
    portugese: 'A área amarela se estende até as veias e a nervura central, formando manchas cloróticas características em forma de "v" que posteriormente se tornam pretas'
  },
  {
    english: 'Veins and veinlets turn brown and finally black',
    portugese: 'As veias e veias tornam-se marrons e finalmente pretas'
  },
  {
    english: 'Small purplish brown spots on under surface of leaves',
    portugese: 'Pequenas manchas marrom arroxeadas na parte inferior das folhas'
  },
  {
    english: 'Small, pale yellow angular spots on upper surface of leaves, with downy growth on the under surface',
    portugese: 'Pequenas manchas angulares de cor amarelo pálido na superfície superior das folhas, com crescimento lanoso na superfície inferior'
  },
  {
    english: 'The spots coalesce and the leaves shrivel and dries up prematurely',
    portugese: 'As manchas se fundem e as folhas murcham e secam prematuramente'
  },
  {
    english: 'Leaves sometime show signs of wilting or water loss',
    portugese: 'Às vezes, as folhas mostram sinais de murcha ou perda de água'
  },
  {
    english: 'The stalk near the ground become water-soaked with brownish discolouration and are easily breakable.',
    portugese: 'O caule próximo ao solo fica encharcado de água com descoloração marrom e fica facilmente quebradiço.'
  },
  {
    english: 'The rotting tissues emit a putrid smell.',
    portugese: 'Os tecidos em decomposição emitem um cheiro podre.'
  },
  {
    english: 'Small yellowish round or oval spots appear on the leaves',
    portugese: 'Pequenas manchas amareladas redondas ou ovais aparecem nas folhas'
  },
  {
    english: 'Yellowish spots enlarge and become elliptical',
    portugese: 'As manchas amareladas aumentam e tornam-se elípticas'
  },
  {
    english: 'Center becomes straw coloured with a reddish brown margin',
    portugese: 'O centro torna-se de cor palha com uma margem marrom avermelhada'
  },
  {
    english: 'Disease appears at pre-flowering stage in 40-50 days old plants but can also occur on younger plants',
    portugese: 'A doença aparece no estágio pré-florescimento em plantas de 40-50 dias, mas também pode ocorrer em plantas mais jovens'
  },
  {
    english: 'Symptoms develop on leaves, sheaths and stalks and can later spread to ears',
    portugese: 'Os sintomas se desenvolvem em folhas, bainhas e caules e podem posteriormente se espalhar para as espigas'
  },
  {
    english: 'On leaves and sheaths, a number of soaked, discolored concentric bands and rings are visible, often brown, tan or gray in color',
    portugese: 'Em folhas e bainhas, é visível uma série de faixas e anéis concêntricos encharcados e descoloridos, frequentemente de cor marrom, bege ou cinza.'
  },
  {
    english: 'It is characterized by the presence of long, narrow, brownish, interveinal stripes on leaves',
    portugese: 'É caracterizada pela presença de listras longas, estreitas, amarronzadas, interveinais nas folhas.'
  },
  {
    english: 'Whitish downy fungal growth may be observed on close examination on underside of the stripes',
    portugese: 'Um crescimento fúngico branco e felpudo pode ser observado em um exame detalhado na parte inferior das listras.'
  },
  {
    english: 'Early-stage symptoms are visible as flecks or blobs on the lowermost leaves, giving them a burnt appearance',
    portugese: 'Os sintomas em estágio inicial são visíveis como manchas ou grânulos nas folhas mais baixas, dando-lhes uma aparência queimada.'
  },
  {
    english: 'Entire crop give a blasted or burnt appearance',
    portugese: 'Toda a cultura apresenta uma aparência queimada ou destruída.'
  },
  {
    english: 'Neck region of panicle develops a black color and shrivels completely \/ partially grain set inhibited, panicle breaks at the neck and hangs',
    portugese: 'A região do colo da panícula desenvolve uma cor preta e encolhe completamente \/ parcialmente, a formação de grãos é inibida, a panícula se quebra no colo e fica pendurada.'
  },
  {
    english: 'Nodal Blast: Nodes become black and break up',
    portugese: 'Explosão nodal: Os nós ficam pretos e se rompem.'
  },
  {
    english: 'Water-soaked to yellowish stripes on leaf blades or starting at leaf tips',
    portugese: 'Listras encharcadas a amareladas nas lâminas das folhas ou começando nas pontas das folhas.'
  },
  {
    english: 'Appearance of bacterial ooze that looks like a milky or opaque dewdrop on young lesions early in the morning',
    portugese: 'Aparecimento de exsudato bacteriano que se parece com uma gota de orvalho leitosa ou opaca em lesões jovens no início da manhã.'
  },
  {
    english: 'Lessions turn yellow to white as the disease advances',
    portugese: 'As lesões tornam-se amarelas a brancas à medida que a doença avança.'
  },
  {
    english: 'Leaves become yellow or orange-yellow, may also have rust-colored spots',
    portugese: 'As folhas tornam-se amarelas ou amarelo-alaranjadas, podendo também ter manchas de cor de ferrugem.'
  },
  {
    english: 'Discoloration begins from leaf tip and extends down to the blade or the lower leaf portion',
    portugese: 'A descoloração começa na ponta da folha e se estende até a lâmina ou a parte inferior da folha.'
  },
  {
    english: 'Delayed flowering, - panicles small and not completely exerted',
    portugese: 'Floração tardia, - panículas pequenas e não completamente expostas.'
  },
  {
    english: 'Irregular spots or lesions, with dark reddish brown margins and gray center',
    portugese: 'Manchas ou lesões irregulares, com margens marrons avermelhadas escuras e centro cinza.'
  },
  {
    english: 'Discoloration in the flag leaf sheath',
    portugese: 'Descoloração na bainha da folha bandeira.'
  },
  {
    english: 'Lesions enlarge and often coalesce and may cover the entire leaf sheath',
    portugese: 'As lesões aumentam e muitas vezes se fundem e podem cobrir toda a bainha da folha.'
  },
  {
    english: 'Yellow powdery pustules appear on leaves, forming stripes',
    portugese: 'Pústulas empoeiradas amarelas aparecem nas folhas, formando listras.'
  },
  {
    english: 'Minimum temperature in the range of 7-13 degree C coupled with 85-100% relative humidity during night and maximum temperature in the range of 15-24 degree C during day are congenial for infection, development and spread of disease.',
    portugese: 'A temperatura mínima na faixa de 7-13 graus Celsius, juntamente com 85-100% de umidade relativa durante a noite e temperatura máxima na faixa de 15-24 graus Celsius durante o dia são propícias para a infecção, desenvolvimento e disseminação da doença.'
  },
  {
    english: 'The characteristic symptom of yellow rust is of parallel rows of yellowish orange coloured pustules on the leaves of adult plants',
    portugese: 'O sintoma característico da ferrugem amarela são fileiras paralelas de pústulas de cor alaranjada amarelada nas folhas de plantas adultas.'
  },
  {
    english: 'Mild symptoms may be present prior to heading, including yellowish leaf streaks and stiff, dark green leaves',
    portugese: 'Sintomas leves podem estar presentes antes da emissão das espigas, incluindo listras foliares amareladas e folhas verde-escuras e rígidas.'
  },
  {
    english: 'Olives',
    portugese: 'Azeitonas'
  },
  {
    english: 'The fungus destroys the ears completely, turning them into a black loose powdery mass consisting of spores and leaving behind the rachis only.',
    portugese: 'O fungo destrói completamente as espigas, transformando-as em uma massa pulverulenta solta preta composta por esporos e deixando apenas o ráquis para trás.'
  },
  {
    english: 'Leaf rust attacks foliage only',
    portugese: 'A ferrugem foliar ataca apenas a folhagem.'
  },
  {
    english: 'This rust disease occurs wherever wheat, barley and other cereal crops are grown',
    portugese: 'Esta doença de ferrugem ocorre onde quer que o trigo, a cevada e outras culturas de cereais sejam cultivadas.'
  },
  {
    english: 'Identifying symptoms are dusty, reddish-orange to reddish-brown fruiting bodies that appear on the leaf surface.',
    portugese: 'Os sintomas identificadores são corpos frutíferos empoeirados, de cor laranja-avermelhada a marrom-avermelhada, que aparecem na superfície da folha.'
  },
  {
    english: 'An early symptom of bacterial leaf spot is small, water-soaked leaf spots on the older leaves of the plant',
    portugese: 'Um sintoma inicial de mancha foliar bacteriana são pequenas manchas encharcadas de água nas folhas mais antigas da planta.'
  },
  {
    english: 'They can be caused by one or a combination of leaf spotting pathogens. Pyrenophora tritici-repentis causes tan spot on leaves and can also infect wheat kernels causing red or pink smudge and black point',
    portugese: 'Elas podem ser causadas por um ou uma combinação de patógenos que causam manchas nas folhas. Pyrenophora tritici-repentis causa manchas pardas nas folhas e também pode infectar os grãos de trigo, causando manchas vermelhas ou rosadas e pontos pretos.'
  },
  {
    english: 'Severely infected kernels can result in significant downgrading of seed quality.',
    portugese: 'Grãos gravemente infectados podem resultar em uma depreciação significativa da qualidade das sementes.'
  },
  {
    english: 'Olive knot can cause the death of small branches and twigs as well as the progressive debilitation of the tree, although it rarely kills it',
    portugese: 'O nó de oliveira pode causar a morte de pequenos galhos e ramagens, bem como a debilitação progressiva da árvore, embora raramente a mate.'
  },
  {
    english: 'Crop production is reduced in terms of both fruit quantity and size',
    portugese: 'A produção da cultura é reduzida tanto em termos de quantidade quanto de tamanho dos frutos.'
  },
  {
    english: 'Olives from infected branches have an unpleasant smell and a bitter, rancid taste',
    portugese: 'As azeitonas de galhos infectados têm um cheiro desagradável e um sabor amargo e rançoso.'
  },
  {
    english: 'The symptoms of this disease are generally lesions on the leaf blade, petiole, fruit peduncle and fruit.',
    portugese: 'Os sintomas desta doença são geralmente lesões na lâmina da folha, pecíolo, pedúnculo do fruto e fruto.'
  },
  {
    english: 'These occur on the upper surface of the leaves in the form of small round blotches with a grey or muddy spot in the centre 6–10 mm in diameter, reminiscent of a peacock’s eye.',
    portugese: 'Essas ocorrem na superfície superior das folhas na forma de pequenas manchas redondas com uma mancha cinza ou lamacenta no centro, com 6 a 10 mm de diâmetro, lembrando um olho de pavão.'
  },
  {
    english: 'Defoliation, twig death and bloom failure may ensue',
    portugese: 'Pode ocorrer desfolha, morte de ramos e falha na floração.'
  },
  {
    english: 'Infected trees have slowly thinning canopies and appear weak',
    portugese: 'Árvores infectadas têm copas que vão se adelgaçando lentamente e parecem fracas.'
  },
  {
    english: 'This symptom often develops first on one side of the tree and then progresses over several years to involve the whole tree',
    portugese: 'Esse sintoma frequentemente se desenvolve primeiro em um lado da árvore e depois progride ao longo de vários anos para envolver toda a árvore.'
  },
  {
    english: 'The bark and outer wood of the upper roots and crown show discoloration',
    portugese: 'A casca e a madeira externa das raízes superiores e da coroa mostram descoloração.'
  },
  {
    english: 'Phytophthora-infected trees have reduced growth, thin canopies, and often die.',
    portugese: 'Árvores infectadas por Phytophthora têm crescimento reduzido, copas finas e frequentemente morrem.'
  },
  {
    english: 'If the disease progresses rapidly, trees may die in 1 or 2 years',
    portugese: 'Se a doença progredir rapidamente, as árvores podem morrer em 1 ou 2 anos.'
  },
  {
    english: 'Roots rotted by Phytophthora are dark and trees affected for long periods by Phytophthora root rot may have few root hairs',
    portugese: 'As raízes apodrecidas por Phytophthora são escuras e árvores afetadas por longos períodos de podridão das raízes por Phytophthora podem ter poucos pelos radiculares.'
  },
  {
    english: 'Symptoms Disease is most commonly observed on aboveground plant parts',
    portugese: 'Os sintomas da doença são mais comumente observados em partes da planta acima do solo.'
  },
  {
    english: 'Diseased tissues may first appear as water-soaked areas',
    portugese: 'Os tecidos doentes podem aparecer primeiro como áreas encharcadas de água.'
  },
  {
    english: 'Turn a bleached white or brownish color with fluffy, cottony-white mycelium generally present',
    portugese: 'Tornam-se de cor branca desbotada ou marrom-avermelhada, com micélio branco fofinho geralmente presente.'
  },
  {
    english: 'Stem infections by sclerotia first appear just after flowering and are accompanied by a soft, watery rot of basal stems.',
    portugese: 'As infecções do caule por esclerócios aparecem logo após a floração e são acompanhadas por uma podridão aquosa e macia dos caules basais.'
  },
  {
    english: 'These lesions enlarge into a watery, rotten mass of tissue that is covered by a white moldy growth.',
    portugese: 'Essas lesões se ampliam em uma massa aquosa e podre de tecido coberta por um crescimento mofado branco.'
  },
  {
    english: 'Dark, irregularly-shaped sclerotia are often found in and around infected stems. Infection of stems and branches will cause affected plant parts to wilt and later die, taking on a bleached and dried.',
    portugese: 'Esclerócios de forma irregular e escura são frequentemente encontrados em e ao redor dos caules infectados. A infecção dos caules e ramos fará com que as partes afetadas da planta murchem e, posteriormente, morram, adquirindo uma aparência branca e seca.'
  },
  {
    english: 'Safflower plants a few weeks after planting or at flowering stage are commonly attacked',
    portugese: 'Plantas de cártamo algumas semanas após o plantio ou no estágio de floração são comumente atacadas.'
  },
  {
    english: 'Circular to irregular brown sunken spots of 3-10 mm diameter are formed on leaves',
    portugese: 'Manchas marrons circulares a irregulares afundadas de 3-10 mm de diâmetro são formadas nas folhas.'
  },
  {
    english: 'In severe infections bracts are also affected with reddish brown spots.affected flower buds turn brown and die.',
    portugese: 'Em infecções graves, as brácteas também são afetadas por manchas marrons avermelhadas. Os botões florais afetados ficam marrons e morrem.'
  },
  {
    english: 'A white powder-like powder is deposited on the leaves,twigs and stems of safflower.',
    portugese: 'Um pó branco semelhante a pó é depositado nas folhas, ramos e caules do cártamo.'
  },
  {
    english: 'Due to its effect, the process of photosynthesis is inhibited',
    portugese: 'Devido ao seu efeito, o processo de fotossíntese é inibido'
  },
  {
    english: 'The affected part of the plant turns black and dries up.',
    portugese: 'A parte afetada da planta fica preta e seca.'
  },
  {
    english: 'Dark necrotic lesions 2-5 mm in diameter are formed first on hypocotyls and cotyledons.',
    portugese: 'Lesões necróticas escuras de 2-5 mm de diâmetro são formadas primeiro nos hipocótilos e cotilédones.'
  },
  {
    english: 'In mature plants, small brown to dark brown concentric spots of 1-2 mm appear on leaves.',
    portugese: 'Em plantas maduras, pequenas manchas concêntricas marrons a marrons escuras de 1-2 mm aparecem nas folhas.'
  },
  {
    english: 'Symptoms also appear on the stem and severely infected plants get blighted.',
    portugese: 'Os sintomas também aparecem no caule e as plantas severamente infectadas ficam comprometidas.'
  },
  {
    english: 'These spots soon increase in size and number, and many such spots coalesce at severity causing premature defoliation. Severe defoliation leads to debilitation of the bushes and results in poor cropping in the succeeding seasons.',
    portugese: 'Essas manchas logo aumentam de tamanho e número, e muitas delas se unem em gravidade causando desfolha prematura. A desfolha severa leva à debilitação das plantas e resulta em má colheita nas estações seguintes.'
  },
  {
    english: 'Water-soaked spots on leaves which are delimited by leaf veins, giving them an angular appearance;',
    portugese: 'Manchas encharcadas de água nas folhas que são delimitadas pelas nervuras das folhas, dando-lhes uma aparência angular;'
  },
  {
    english: 'Lesions Increase in size and turn black and necrotic;',
    portugese: 'As lesões aumentam de tamanho e ficam pretas e necróticas;'
  },
  {
    english: "Leaves Drop from the plant; disease may also cause elongated gray-black lesions extending from the leaves to petioles and stem which are known as the 'blackarm' phase;",
    portugese: "As folhas caem da planta; a doença também pode causar lesões cinza-pretas alongadas que se estendem das folhas aos pecíolos e caule, conhecidas como fase do 'braço preto';"
  },
  {
    english: 'Initial symptoms on young seedlings are yellowing and browning of cotyledons, followed by a brown ring on the petiole.',
    portugese: 'Os sintomas iniciais em plântulas jovens são amarelamento e escurecimento dos cotilédones, seguidos por um anel marrom no pecíolo.'
  },
  {
    english: 'Finally wilting & drying of the seedling occurs. Symptom at later stages includes loss of turgidity, yellowing, drooping and wilting starting from older leaves.',
    portugese: 'Finalmente, ocorre murcha e secagem da plântula. O sintoma em estágios posteriores inclui perda de turgidez, amarelamento, inclinação e murcha começando pelas folhas mais velhas.'
  },
  {
    english: 'Browning or blackening of vascular tissues occur on the stem and spreads upwards and downwards. Infected plants appear stunted with fewer bolls.',
    portugese: 'O escurecimento ou enegrecimento dos tecidos vasculares ocorre no caule e se espalha para cima e para baixo. As plantas infectadas parecem atrofiadas com menos cápsulas.'
  },
  {
    english: 'The disease may occur in all stages but more severe when plants are 45-60 days old.',
    portugese: 'A doença pode ocorrer em todas as fases, mas é mais grave quando as plantas têm 45-60 dias.'
  },
  {
    english: 'Each spot has a central lesion surrounded by concentric rings. Several spots coalesce together to form blighted areas. The affected leaves become brittle and fall off.',
    portugese: 'Cada mancha tem uma lesão central cercada por anéis concêntricos. Várias manchas se fundem para formar áreas comprometidas. As folhas afetadas se tornam quebradiças e caem.'
  },
  {
    english: 'Sometimes stem lesions are also seen. In severe cases, the spots may appear on bracts and bolls.',
    portugese: 'Às vezes, também são observadas lesões no caule. Em casos graves, as manchas podem aparecer em brácteas e cápsulas.'
  },
  {
    english: 'Anthracnose in cotton can occur in all growth stages of the plant and it can affect all tissues.',
    portugese: 'A antracnose no algodão pode ocorrer em todos os estágios de crescimento da planta e pode afetar todos os tecidos.'
  },
  {
    english: 'It produces small reddish to light brown circular spots with black necrotic margins on the cotyledons and primary leaves.',
    portugese: 'Produz pequenas manchas circulares de coloração avermelhada a marrom claro com margens necróticas pretas nos cotilédones e folhas primárias.'
  },
  {
    english: 'If the lesions develop on the collar region, the stem may be girdled, causing seedling or young plants to wilt and die.',
    portugese: 'Se as lesões se desenvolverem na região do colo, o caule pode ser estrangulado, causando murcha e morte de plântulas ou plantas jovens.'
  },
  {
    english: 'It affects the crop in square and boll formation stages Bronzing of veins followed by interveinal chlorosis, yellowing and scorching of leaves',
    portugese: 'Afeta a cultura nos estágios de formação de quadrado e cápsula. Bronzeamento de veias seguido de clorose interveinal, amarelamento e queima das folhas'
  },
  {
    english: "Leaves exhibit drying of leaf margins and areas between veins known as 'tiger stripe symptom'",
    portugese: "As folhas apresentam secagem das margens das folhas e áreas entre as veias conhecidas como 'sintoma de listras de tigre'"
  },
  {
    english: 'Affected plants remain barren showing pinkish discoloration in stem and wood. It may produce smaller bolls',
    portugese: 'Plantas afetadas permanecem estéreis mostrando descoloração rosada no caule e madeira. Pode produzir cápsulas menores'
  },
  {
    english: 'Small irregular brown lesions on leaves which expand and turn gray-brown or dark brown with concentric zones',
    portugese: 'Pequenas lesões irregulares marrons nas folhas que se expandem e se tornam cinza-marrom ou marrom escuro com zonas concêntricas'
  },
  {
    english: 'Older areas of lesions may dry out and drop from leaves causing shot hole',
    portugese: 'Áreas mais antigas das lesões podem secar e cair das folhas causando orifícios de tiro'
  },
  {
    english: 'Lesions coalesce to form large necrotic patches',
    portugese: 'Lesões se fundem para formar grandes manchas necróticas'
  },
  {
    english: 'Small, dark brown necrotic spots on leaves which may be surrounded by a zone of yellow tissue',
    portugese: 'Pequenas manchas necróticas escuras nas folhas que podem ser cercadas por uma zona de tecido amarelo'
  },
  {
    english: 'Water soaked spots on pods which turn brown and necrotic',
    portugese: 'Manchas encharcadas de água em vagens que se tornam marrons e necróticas'
  },
  {
    english: 'Pods may twist and distort in the area of infection.',
    portugese: 'As vagens podem torcer e distorcer na área de infecção.'
  },
  {
    english: 'Initially, the symptoms appear as small yellow/white spots on leaves.',
    portugese: 'Inicialmente, os sintomas aparecem como pequenas manchas amarelas/brancas nas folhas.'
  },
  {
    english: 'Later the spots become enlarged and show raised brick red rust pustules (uredinia).',
    portugese: 'Posteriormente, as manchas aumentam de tamanho e mostram pústulas de ferrugem vermelho tijolo elevadas (uredo).'
  },
  {
    english: 'Normally these pustules are surrounded by a yellow halo. Premature leaf drop may occur if the disease is severe.',
    portugese: 'Normalmente, essas pústulas são cercadas por um halo amarelo. A queda prematura das folhas pode ocorrer se a doença for grave.'
  },
  {
    english: 'Flowers covered in white, cottony fungal growth;',
    portugese: 'Flores cobertas por crescimento fúngico branco e algodonoso;'
  },
  {
    english: 'Small, circular, dark green, water-soaked lesions on pods, leaves, and branches which enlarge and become slimy',
    portugese: 'Pequenas lesões circulares, escuras e verdes, encharcadas de água em vagens, folhas e galhos que aumentam de tamanho e ficam viscosas'
  },
  {
    english: 'Cottony white growth may be visible on lesions during periods of high humidity; death of branches and/or the entire plant.',
    portugese: 'O crescimento branco e algodonoso pode ser visível em lesões durante períodos de alta umidade; morte de galhos e/ou da planta inteira.'
  },
  {
    english: 'Water-soaked spots on leaves which enlarge and become necrotic',
    portugese: 'Manchas encharcadas de água nas folhas que aumentam de tamanho e se tornam necróticas'
  },
  {
    english: 'Spots may be surrounded by a zone of yellow discoloration; lesions coalesce and give the plant a burned appearance',
    portugese: 'As manchas podem ser cercadas por uma zona de descoloração amarela; as lesões se fundem e dão à planta uma aparência queimada'
  },
  {
    english: 'Leaves That die remain attached to the plant; circular, sunken, red-brown lesions may be present on pods; pod lesions may ooze during humid conditions.',
    portugese: 'As folhas que morrem permanecem presas à planta; lesões circulares, afundadas, de cor marrom-vermelho podem estar presentes nas vagens; as lesões das vagens podem exsudar durante condições úmidas.'
  },
  {
    english: 'On tomato, the affected area may be mistaken for sunscald. Sunscald develops as a white discoloration, but it occurs on the upper portions of the fruit, often the shoulders.',
    portugese: 'No tomate, a área afetada pode ser confundida com queimadura solar. A queimadura solar se desenvolve como uma descoloração branca, mas ocorre nas porções superiores do fruto, frequentemente os ombros.'
  },
  {
    english: 'Blossom end rot may also occur on the sides of the pepper fruit near the blossom end.',
    portugese: 'A podridão apical da flor também pode ocorrer nas laterais do fruto de pimentão próximo à extremidade da flor.'
  },
  {
    english: 'Molds often colonize the damaged area of affected fruit, resulting in a dark brown or black appearance.',
    portugese: 'Os mofo frequentemente colonizam a área danificada dos frutos afetados, resultando em uma aparência marrom escuro ou preta.'
  },
  {
    english: 'The new growth of plants with tomato yellow leaf curl has reduced internodes, giving the plant a stunted appearance',
    portugese: 'O novo crescimento de plantas com o enrolamento foliar amarelo do tomateiro tem entrenós reduzidos, dando à planta uma aparência retardada'
  },
  {
    english: 'The new leaves are also greatly reduced in size and wrinkled, are yellowed between the veins, and have margins that curl upward, giving them a cup-like appearance.',
    portugese: 'As novas folhas também são muito reduzidas em tamanho e enrugadas, ficam amareladas entre as veias e têm margens que se curvam para cima, dando-lhes uma aparência de xícara.'
  },
  {
    english: 'Flowers may appear but usually will drop before fruit is set',
    portugese: 'As flores podem aparecer, mas geralmente caem antes do fruto ser formado'
  },
  {
    english: 'The fungus attacks the foliage causing characteristic leaf spots and blight. Early blight is first observed on the plants as small, black lesions mostly on the older foliage.',
    portugese: 'O fungo ataca o follaje causando manchas características nas folhas e murcha. A mancha foliar precoce é observada primeiro nas plantas como pequenas lesões negras, principalmente no follaje mais antigo.'
  },
  {
    english: "Spots enlarge, and by the time they are one-fourth inch in diameter or larger, concentric rings in a bull's eye pattern can be seen in the center of the diseased area.",
    portugese: 'As manchas aumentam e, quando têm um quarto de polegada de diâmetro ou mais, anéis concêntricos em um padrão de olho de boi podem ser vistos no centro da área doente.'
  },
  {
    english: 'Tissue surrounding the spots may turn yellow. If high temperature and humidity occur at this time, much of the foliage is killed.',
    portugese: 'O tecido circundante às manchas pode ficar amarelo. Se ocorrer alta temperatura e umidade neste momento, grande parte do follaje é morto.'
  },
  {
    english: 'Brownish-green spots appear on the leaf margins and leaf tops. Later, large areas of the leaves turn brown completely.',
    portugese: 'Manchas marrom-esverdeadas aparecem nas margens das folhas e nas partes superiores das folhas. Mais tarde, grandes áreas das folhas ficam completamente marrons.'
  },
  {
    english: 'During wet weather, lesions on the lower side of the leaves may be covered with a gray to white moldy growth, making it easier to distinguish healthy from dead leaf tissue.',
    portugese: 'Durante o tempo úmido, lesões na parte inferior das folhas podem ser cobertas com um crescimento de mofo cinza a branco, tornando mais fácil distinguir o tecido foliar saudável do morto.'
  },
  {
    english: 'Greyish-green to dirty-brown and wrinkled stains appear on the fruits. At these spots, the fruit flesh is hardened.',
    portugese: 'Manchas esverdeadas acinzentadas a marrom sujo e enrugadas aparecem nos frutos. Nessas manchas, a polpa do fruto está endurecida.'
  },
  {
    english: 'Characteristic symptoms of bacterial wilt are the rapid and complete wilting of normal grown-up plants.',
    portugese: 'Os sintomas característicos da murcha bacteriana são o murchamento rápido e completo das plantas adultas normais.'
  },
  {
    english: 'Lower leaves may drop before wilting. Pathogen is mostly confined to the vascular region; in advantage cases, it may invade the cortex and pith and cause yellow-brown discoloration of tissues.',
    portugese: 'As folhas inferiores podem cair antes de murchar. O patógeno está principalmente confinado à região vascular; em casos vantajosos, pode invadir o córtex e a medula e causar descoloração amarelo-marrom dos tecidos.'
  },
  {
    english: 'Infected plant parts when cut and immersed in clear water, a white streak of bacterial ooze is seen coming out from cut ends.',
    portugese: 'Partes da planta infectadas, quando cortadas e imersas em água limpa, apresentam uma estria branca de exsudato bacteriano saindo das extremidades cortadas.'
  },
  {
    english: 'The first symptom of the disease is clearing of the veinlets and chlorosis of the leaves.',
    portugese: 'O primeiro sintoma da doença é o clareamento dos vênulas e clorose das folhas.'
  },
  {
    english: 'The younger leaves may die in succession and the entire may wilt and die in a course of few days. Soon the petiole and the leaves droop and wilt.',
    portugese: 'As folhas mais jovens podem morrer sucessivamente e a planta inteira pode murchar e morrer em questão de poucos dias. Logo o pecíolo e as folhas se curvam e murcham.'
  },
  {
    english: 'In young plants, the symptom consists of clearing of veinlets and dropping of petioles. In the field, yellowing of the lower leaves first, and affected leaflets wilt and die.',
    portugese: 'Nas plantas jovens, o sintoma consiste no clareamento das vênulas e queda dos pecíolos. No campo, o amarelamento das folhas mais baixas primeiro, e os folíolos afetados murcham e morrem.'
  },
  {
    english: 'The disease is characterized by light and dark green mottling on the leaves, often accompanied by wilting of young leaves on sunny days when plants first become infected.',
    portugese: 'A doença é caracterizada por manchas claras e escuras nas folhas, frequentemente acompanhadas de murcha das folhas jovens em dias ensolarados quando as plantas são infectadas pela primeira vez.'
  },
  {
    english: 'The leaflets of affected leaves are usually distorted, puckered, and smaller than normal. Sometimes the leaflets become indented, resulting in "fern leaf" symptoms.',
    portugese: 'Os folíolos das folhas afetadas geralmente estão distorcidos, enrugados e menores que o normal. Às vezes, os folíolos ficam indentados, resultando em sintomas de "folha de samambaia".'
  },
  {
    english: 'The virus is spread by contact with clothes, the hands of working labor, touching infected plants with healthy ones, plant debris, and implements.',
    portugese: 'O vírus é transmitido pelo contato com roupas, as mãos do trabalho, tocando plantas infectadas com saudáveis, detritos vegetais e implementos.'
  },
  {
    english: 'Black Spot On leaves are formed which enlarge rapidly and cause the fall of the leaf. When the main stem at the base is damaged, the entire vine wilts and sheds all the leaves and spikes.',
    portugese: 'Manchas pretas nas folhas são formadas e se alargam rapidamente, causando a queda da folha. Quando o caule principal na base é danificado, toda a videira murcha e perde todas as folhas e espinhos.'
  },
  {
    english: 'The tender leaves and succulent shoot tips of freshly emerging runner shoots trailing on the soil turn black when infected.',
    portugese: 'As folhas tenras e as pontas dos brotos suculentos dos brotos corredores recém-emergentes que se arrastam no solo ficam pretas quando infectadas.'
  },
  {
    english: 'The disease spreads to the entire vine from these infected runner shoots and leaves during intermittent showers due to rain splash.',
    portugese: 'A doença se espalha por toda a videira a partir desses brotos corredores e folhas infectadas durante chuvas intermitentes devido a respingos de chuva.'
  },
  {
    english: 'It can be distinguished from the pollu (hollow berry) caused by the beetle by the presence of characteristic cracks on the infected berries.',
    portugese: 'Pode ser distinguido do pollu (baga oca) causado pelo besouro pela presença de rachaduras características nas bagas infectadas.'
  },
  {
    english: 'The affected berries show brown sunken patches during the early stages, and their further development is affected.',
    portugese: 'As bagas afetadas mostram manchas marrons afundadas durante os estágios iniciais, e seu desenvolvimento posterior é afetado.'
  },
  {
    english: "In later stages, the discoloration gradually increases, and the berries show the characteristic cross-splitting. Finally, the berries turn black and dry. The fungus also causes angular to irregular brownish lesions with a chlorotic halo on the leaves.",
    portugese: "Nas fases posteriores, a descoloração aumenta gradualmente, e as bagas mostram a característica divisão transversal. Finalmente, as bagas ficam pretas e secas. O fungo também causa lesões castanhas angulares a irregulares com um halo clorótico nas folhas."
  },
  {
    english: "Infected cuttings show greyish lesions on leaves and stems.",
    portugese: "Estacas infectadas mostram lesões esbranquiçadas nas folhas e caules."
  },
  {
    english: "White-Colored Mycelium appears which later girdles the stem, causing rotting and wilting.",
    portugese: "Micélio branco aparece e posteriormente circunda o caule, causando apodrecimento e murcha."
  },
  {
    english: "Small whitish to cream-colored grain-like sclerotial bodies appear on the mature lesions.",
    portugese: "Pequenos corpos esclerotiais esbranquiçados a creme aparecem nas lesões maduras."
  },
  {
    english: "Root necrosis and galling are the primary symptoms of the disease.",
    portugese: "A necrose radicular e o engrossamento são os principais sintomas da doença."
  },
  {
    english: "Foliar yellowing (mild to moderate), followed by defoliation, die-back is seen.",
    portugese: "Amarelecimento foliar (de leve a moderado), seguido de desfolha e morte de parte dos ramos são observados."
  },
  {
    english: "In more pronounced conditions whole vine die. Browning of vascular tissue is seen if Fusarium sp. Is associated with the disease.",
    portugese: "Em condições mais pronunciadas, a planta inteira morre. O escurecimento do tecido vascular é observado se Fusarium sp. estiver associado à doença."
  },
  {
    english: "The disease is characterized by drying up of mature and immature branches from the tip downwards.",
    portugese: "A doença é caracterizada pelo ressecamento dos ramos maduros e imaturos da ponta para baixo."
  },
  {
    english: "A few other fungi have been isolated from such trees.",
    portugese: "Alguns outros fungos foram isolados dessas árvores."
  },
  {
    english: "The infected branches should be cut and removed, and the cut end pasted with Bordeaux mixture 1%.",
    portugese: "Os ramos infectados devem ser cortados e removidos, e a extremidade cortada deve ser coberta com uma mistura de Bordeaux a 1%."
  },
  {
    english: "Two types of blights are noticed in nutmeg. The first is a white thread blight wherein fine white hyphae aggregate to form fungal threads that traverse along the stem underneath the leaves in a fan-shaped or irregular manner causing blight in the affected portions.",
    portugese: "Dois tipos de murchas são observadas na noz-moscada. O primeiro é uma murcha de fios brancos, onde finos hifas brancos se agregam para formar fios fúngicos que percorrem o caule por baixo das folhas de forma irregular ou em forma de leque, causando murcha nas partes afetadas."
  },
  {
    english: "The second type of blight is called horsehair blight. Fine black silky threads of the fungus form an irregular, loose network on the stems and leaves.",
    portugese: "O segundo tipo de murcha é chamado de murcha de pelos de cavalo. Finos fios de seda preta do fungo formam uma rede irregular e solta nos caules e folhas."
  },
  {
    english: "These strands cause blight of leaves and stems. However, these threads hold up the detached, dried leaves on the tree, giving the appearance of a bird's nest when viewed from a distance.",
    portugese: "Esses filamentos causam a murcha das folhas e caules. No entanto, esses fios sustentam as folhas secas e desprendidas na árvore, dando a aparência de um ninho de pássaro quando visto de longe."
  },
  {
    english: "Immature fruit split, fruit rot, and fruit drop are serious in a majority of nutmeg. Immature fruit splitting and shedding are noticed in some trees without any apparent infection.",
    portugese: "A divisão de frutos imaturos, a podridão dos frutos e a queda dos frutos são graves na maioria das nozes-moscada. A divisão e queda de frutos imaturos são observadas em algumas árvores sem nenhuma infecção aparente."
  },
  {
    english: "In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discoloration of the rind resulting in rotting.",
    portugese: "No caso da podridão dos frutos, a infecção começa no pedicelo como lesões escuras e gradualmente se espalha para o fruto, causando descoloração marrom da casca resultando em apodrecimento."
  },
  {
    english: "In advanced stages, the mace also rots, emitting a foul smell. Phytophthora sp. and Diplodia natalensis have been isolated from affected fruits.",
    portugese: "Em estágios avançados, a macela também apodrece, emitindo um cheiro ruim. Phytophthora sp. e Diplodia natalensis foram isolados de frutos afetados."
  },
  {
    english: "Necrotic spots develop on the lamina which are encircled by a chlorotic halo.",
    portugese: "Manchas necróticas se desenvolvem na lâmina, que são circundadas por um halo clorótico."
  },
  {
    english: "In advanced stages, the necrotic spots become brittle and fall off resulting in shot holes.",
    portugese: "Em estágios avançados, as manchas necróticas se tornam quebradiças e caem, resultando em furos."
  },
  {
    english: "The infected branches should be cut and removed. The cut end should be pasted with Bordeaux paste.",
    portugese: "Os ramos infectados devem ser cortados e removidos. A extremidade cortada deve ser coberta com pasta de Bordeaux."
  },
  {
    english: "The disease is a destructive one, widely distributed wherever the crop is grown.",
    portugese: "A doença é destrutiva, amplamente distribuída onde a cultura é cultivada."
  },
  {
    english: "The most affected components are the number of seeds per head and the seed yield per plant.",
    portugese: "Os componentes mais afetados são o número de sementes por cabeça e o rendimento de sementes por planta."
  },
  {
    english: "Spots first appear on lower leaves, later spread to middle and upper leaves. At later stages, spots may be formed on petioles, stem, and ray florets.",
    portugese: "As manchas aparecem primeiro nas folhas inferiores, depois se espalham para as folhas do meio e superiores. Em estágios posteriores, as manchas podem se formar nos pecíolos, caule e flores laterais."
  },
  {
    english: "It is more prominent in the rabi season, and in the kharif season, the appearance is usually late.",
    portugese: "É mais proeminente na estação rabi, e na estação kharif, a aparência geralmente é tardia."
  },
  {
    english: "Uredo pustules appear first on the lower leaves. Uredo pustules appear on the younger leaves and later spread over the entire vegetative surface covering stems, petioles, floral bracts, and petals.",
    portugese: "As pústulas de uredo aparecem primeiro nas folhas inferiores. As pústulas de uredo aparecem nas folhas mais jovens e depois se espalham por toda a superfície vegetativa cobrindo caules, pecíolos, brácteas florais e pétalas."
  },
  {
    english: "Uredia often coalesce to cover large areas on the affected plant parts.",
    portugese: "Uredia frequentemente se fundem para cobrir grandes áreas nas partes afetadas da planta."
  },
  {
    english: "Symptoms of the disease are evident as seedling damping off, systemic infection, local foliar lesions, and basal root or stem galls.",
    portugese: "Os sintomas da doença são evidentes como tombamento de plântulas, infecção sistêmica, lesões foliares locais e galhas radiculares ou basais."
  },
  {
    english: "First symptoms are yellowing of the first pair of true leaves.",
    portugese: "Os primeiros sintomas são o amarelecimento do primeiro par de folhas verdadeiras."
  },
  {
    english: "Sunflower plants carrying systemic infection are severely stunted, and leaves are entirely chlorotic.",
    portugese: "As plantas de girassol infectadas sistemicamente são severamente atrofiadas, e as folhas estão inteiramente cloróticas."
  },
  {
    english: "Water-soaked circular or angular spots on leaves with a greasy, greenish appearance on lower leaves.",
    portugese: "Manchas circulares ou angulares encharcadas de água nas folhas com uma aparência gordurosa esverdeada nas folhas inferiores."
  },
  {
    english: "Lesions are usually gray with a darker margin; some lesions may have a narrow yellow border; tiny black fungal fruiting bodies may be present in the lesions.",
    portugese: "As lesões geralmente são cinzas com uma margem mais escura; algumas lesões podem ter uma borda amarela estreita; pequenos corpos frutíferos fúngicos pretos podem estar presentes nas lesões."
  },
  {
    english: "Yellow or chlorotic spots on leaves.",
    portugese: "Manchas amarelas ou cloróticas nas folhas."
  },
  {
    english: "Dark olive green spots on leaves and fruit; may be a velvety growth on spots on undersides of leaves; twisting of leaves.",
    portugese: "Manchas verde-oliva escuras nas folhas e frutos; pode haver um crescimento aveludado nas manchas na parte inferior das folhas; torção das folhas."
  },
  {
    english: "Distorted leaves; severely infected leaves turn yellow and drop from the tree.",
    portugese: "Folhas distorcidas; folhas gravemente infectadas ficam amarelas e caem da árvore."
  },
  {
    english: "Fire blight symptoms may appear on the blossoms, shoots, branches, trunk, and rootstock.",
    portugese: "Os sintomas do fogo bacteriano podem aparecer nas flores, brotos, ramos, tronco e porta-enxertos."
  },
  {
    english: "Watery exudate may be present on infected areas.",
    portugese: "Exsudato aquoso pode estar presente em áreas infectadas."
  },
  {
    english: "Blighted blossoms appear wilted, shriveled, and brown. Young fruitlets are also very susceptible.",
    portugese: "As flores afetadas pelo crestamento bacteriano aparecem murchas, enrugadas e marrons. Os frutos jovens também são muito suscetíveis."
  },
  {
    english: "Leaf spots are first yellow, then turn bright orange-red, often with a bright red border.",
    portugese: "As manchas nas folhas são primeiro amarelas, depois ficam vermelho-alaranjadas brilhantes, frequentemente com uma borda vermelha brilhante."
  },
  {
    english: "Small, raised, black dots form in the center of leaf spots on the upper leaf surface when the leaf spots mature.",
    portugese: "Pequenos pontos pretos elevados se formam no centro das manchas nas folhas na superfície superior da folha quando as manchas nas folhas amadurecem."
  },
  {
    english: "Rarely, green to brown irregular spots with black dots form on the fruit surface. Fruit spots do not extend deep into the fruit.",
    portugese: "Raramente, manchas irregulares verdes a marrons com pontos pretos se formam na superfície da fruta. As manchas na fruta não se estendem profundamente na fruta."
  },
  {
    english: "Large brown rotten areas can form anywhere on the fruit but are most common on the blossom end.",
    portugese: "Grandes áreas podres marrons podem se formar em qualquer lugar na fruta, mas são mais comuns na extremidade da flor."
  },
  {
    english: "Brown to black concentric rings can often be seen on larger infections.",
    portugese: "Anéis concêntricos marrons a pretos podem frequentemente ser vistos em infecções maiores."
  },
  {
    english: "The flesh of the apple is brown but remains firm. Small, black spots can be seen on older fruit infections.",
    portugese: "A polpa da maçã é marrom, mas permanece firme. Pequenas manchas pretas podem ser vistas em infecções antigas de frutas."
  },
  {
    english: "It attacks the leaves, flowers, stalks of panicle and fruits, causing a superficial white powdery appearance on it.",
    portugese: "Ataca as folhas, flores, hastes da panícula e frutos, causando uma aparência superficial branca e pulverulenta."
  },
  {
    english: "The disease spreads by wind very rapidly. Generally, the infection starts from the inflorescence and spreads downwards, covering the floral axis, tender leaves, and soft stem.",
    portugese: "A doença se espalha rapidamente pelo vento. Geralmente, a infecção começa a partir da inflorescência e se espalha para baixo, cobrindo o eixo floral, folhas tenras e caule macio."
  },
  {
    english: "Flowers fail to open, blacken, or become brown, dry, and may fall from panicles.",
    portugese: "As flores não conseguem abrir, escurecem ou ficam marrons, secam e podem cair das panículas."
  },
  {
    english: "The first symptoms on panicles are small black or dark-brown spots, which can enlarge, coalesce, and kill the flowers before fruits are produced. Petioles, twigs, and stems are also susceptible and develop into a typical black color.",
    portugese: "Os primeiros sintomas nas panículas são pequenas manchas pretas ou marrons escuras, que podem aumentar, coalescer e matar as flores antes que os frutos sejam produzidos. Os pecíolos, ramos e caules também são suscetíveis e desenvolvem uma cor preta típica."
  },
  {
    english: "Vegetative Malformation: It is more commonly found on young seedlings. It is characterized by disrupting of apical growth resulting in several small flushes.",
    portugese: "Malformação Vegetativa: É mais comumente encontrada em mudas jovens. É caracterizada pela interrupção do crescimento apical resultando em várias brotações pequenas."
  },
  {
    english: "The multi-branching of the shoot apex with scaly leaves is known as 'Bunchy Top' or 'Witches' Broom'. The malformed seedlings remain stunted and die.",
    portugese: "A ramificação múltipla do ápice do broto com folhas escamosas é conhecida como 'Bunchy Top' ou 'Vassoura de Bruxa'. As mudas malformadas permanecem atrofiadas e morrem."
  },
  {
    english: "Floral Malformation: In malformation of inflorescence, shows variation in the panicle. Malformed head dries up in a black mass and persists for a long time.",
    portugese: "Malformação Floral: Na malformação da inflorescência, mostra variação na panícula. A cabeça malformada seca em uma massa preta e persiste por muito tempo."
  },
  {
    english: "The disease is noticed on leaves, leaf stalks, stems, twigs, branches, and fruits, initially producing water-soaked lesions, later turning into a typical canker.",
    portugese: "A doença é notada em folhas, pecíolos, caules, ramos, galhos e frutos, inicialmente produzindo lesões encharcadas de água, que mais tarde se transformam em um cancro típico."
  },
  {
    english: "Water-soaked irregular satellites to angular raised lesions measuring 1-4 mm in diameter are formed. These lesions are light yellow in color, initially with a yellow halo but with age enlarge or coalesce to form irregular necrotic cankerous patches with dark brown color.",
    portugese: "Lesões irregulares elevadas de forma angular, encharcadas de água, medindo 1-4 mm de diâmetro são formadas. Essas lesões são de cor amarelo claro, inicialmente com um halo amarelo, mas com o tempo aumentam ou se fundem para formar manchas necróticas irregulares com cor marrom escura."
  },
  {
    english: "Water-soaked, dark brown to black-colored lesions are observed, which gradually develop into cankerous, raised or flat spots. These spots often burst, extruding gummy substances containing highly contagious bacterial cells.",
    portugese: "Lesões escuras a pretas, encharcadas de água, são observadas, que gradualmente se desenvolvem em manchas ulcerosas, elevadas ou planas. Essas manchas frequentemente se rompem, extraindo substâncias gomosas contendo células bacterianas altamente contagiosas."
  },
  {
    english: "The pathogen causing dieback, tip dieback, graft union blight, twig blight, seedling rot, wood stain, stem-end rot, black root rot, fruit rot, dry rot, brown rot of panicle, etc.",
    portugese: "O patógeno que causa murcha, morte do ponteiro, queima da união do enxerto, murcha de ramos, podridão de mudas, mancha em madeira, podridão do ápice do caule, podridão da raiz preta, podridão do fruto, podridão seca, podridão marrom da panícula, etc."
  },
  {
    english: "Foot rot",
    portugese: "Podridão do pé"
  },
  {
    english: "Papaya ring spot",
    portugese: "Anel de mancha do mamão"
  },
  {
    english: "On the undersurface of disease leaves are found patches of whitish powder growth",
    portugese: "Na superfície inferior das folhas doentes são encontrados patches de crescimento de pó branco"
  },
  {
    english: "On upper surfaces, leaves at the infection site show blotches of yellow or pale green usually near vein, surrounded by normally colored tissue.",
    portugese: "Na superfície superior, as folhas no local da infecção mostram manchas amarelas ou verde pálido geralmente perto da veia, cercadas por tecido normalmente colorido."
  },
  {
    english: "Occasionally, fungus may attack the stem of young seedling when grown under reduced light condition.",
    portugese: "Ocasionalmente, o fungo pode atacar o caule da muda jovem quando cultivado em condições de luz reduzida."
  },
  {
    english: "It is characterized by the appearance of water-soaked patches on the stem near the ground level.",
    portugese: "É caracterizado pelo aparecimento de manchas encharcadas de água no caule próximo ao nível do solo."
  },
  {
    english: "These patches enlarge rapidly and girdle the stem, causing rotting of the tissues, which then turn dark brown or black. If the disease attack is mild, only one side of the stem rots and the plants remain stunted.",
    portugese: "Essas manchas aumentam rapidamente e envolvem o caule, causando apodrecimento dos tecidos, que então se tornam marrons escuros ou pretos. Se o ataque da doença for leve, apenas um lado do caule apodrece e as plantas permanecem atrofiadas."
  },
  {
    english: "Fruit if formed are shriveled and malformed. Gradually the plant dies.",
    portugese: "Se frutas forem formadas, elas ficam enrugadas e deformadas. Gradualmente, a planta morre."
  },
  {
    english: "The disease occurs both in the field and in storage conditions.",
    portugese: "A doença ocorre tanto no campo quanto em condições de armazenamento."
  },
  {
    english: "The spots on fruits first appear as brown superficial discoloration of the skin which develops into circular, slightly sunken areas and 1 to 3 cm in dia.",
    portugese: "As manchas nos frutos aparecem primeiro como descoloração superficial marrom da pele, que se desenvolve em áreas circulares ligeiramente afundadas e de 1 a 3 cm de diâmetro."
  },
  {
    english: "Gradually the lesions coalesce and sparse mycelia growth appears on the margins of the spots.",
    portugese: "Gradualmente, as lesões se fundem e um crescimento micelial esparsado aparece nas margens das manchas."
  },
  {
    english: "Infected plant initially shows chlorosis on youngest leaves followed by vein clearing, rugosity and prominent mottling of laminae.",
    portugese: "A planta infectada inicialmente mostra clorose nas folhas mais jovens, seguida por clareamento de veias, rugosidade e marmorização proeminente das lâminas."
  },
  {
    english: "Malformation and reduction of the lamina which may become extremely filiform.",
    portugese: "Malformação e redução da lâmina, que pode se tornar extremamente filiforme."
  },
  {
    english: "Characteristically elongated dark green streak develop on petiole and upper half of the stems, infected fruits show circular concentric rings causes upto 56-60 % yield loss.",
    portugese: "Listras verde-escuras alongadas se desenvolvem caracteristicamente no pecíolo e na metade superior dos caules, frutos infectados mostram anéis concêntricos circulares causando perda de rendimento de até 56-60%."
  },
  {
    english: "Flattened oval to round disc-like insect covered in waxy substance on tree branches",
    portugese: "Inseto achatado, oval a redondo, coberto por uma substância cerosa em ramos de árvores."
  },
  {
    english: "Insects attract ants which may also be present",
    portugese: "Os insetos atraem formigas que também podem estar presentes."
  },
  {
    english: "Insect colony may also be associated with growth of sooty mold due to fungal colonization of sugary honeydew excreted by the insect",
    portugese: "A colônia de insetos também pode estar associada ao crescimento de mofo fuliginoso devido à colonização fúngica do melado açucarado excretado pelo inseto."
  },
  {
    english: "Colonize on the underside of tender leaves",
    portugese: "Colonizar na parte inferior de folhas tenras."
  },
  {
    english: "The female punctures outer wall of mature fruits with the help of its pointed ovipositor and insert eggs in small clusters inside mesocarp of mature fruits",
    portugese: "A fêmea perfura a parede externa dos frutos maduros com a ajuda de seu ovipositor pontiagudo e insere ovos em pequenos aglomerados dentro do mesocarpo dos frutos maduros."
  },
  {
    english: "On hatching, the maggots feed on fruit pulp",
    portugese: "Ao eclodir, as larvas se alimentam da polpa do fruto."
  },
  {
    english: "The infested fruits start rotting due to further secondary infection",
    portugese: "Os frutos infestados começam a apodrecer devido a uma infecção secundária adicional."
  },
  {
    english: "Both nymphs and adults suck the sap from the lower leaf surfaces which leads to yellowing",
    portugese: "Tanto as ninfas quanto os adultos sugam a seiva das superfícies inferiores das folhas, o que leva ao amarelamento."
  },
  {
    english: "When several insects suck the sap from the same leaf, yellow spots appear on the leaves",
    portugese: "Quando vários insetos sugam a seiva da mesma folha, aparecem manchas amarelas nas folhas."
  },
  {
    english: "Crinkling, curling, bronzing, and drying, or “hopper burn”",
    portugese: "Enrugamento, enrolamento, bronzeamento e secagem, ou 'queimadura de gafanhoto'"
  },
  {
    english: "Papaya (Saudi Arabia)",
    portugese: "Mamão (Arábia Saudita)"
  },
  {
    english: "Red lady",
    portugese: "Dama vermelha"
  },
  {
    english: "Red bella",
    portugese: "Bela vermelha"
  },
  {
    english: "Potato (Saudi Arabia)",
    portugese: "Batata (Arábia Saudita)"
  },
  {
    english: "Spunta",
    portugese: "Spunta"
  },
  {
    english: "Ajax",
    portugese: "Ajax"
  },
  {
    english: "Mirka",
    portugese: "Mirka"
  },
  {
    english: "Diamont",
    portugese: "Diamont"
  },
  {
    english: "Espunta",
    portugese: "Espunta"
  },
  {
    english: "Citrix",
    portugese: "Citrix"
  },
  {
    english: "Frizia",
    portugese: "Frizia"
  },
  {
    english: 'Kawalic',
    portugese: 'Kawalic'
  },
  {
    english: 'Aboulx',
    portugese: 'Aboulx'
  },
  {
    english: 'Mondial',
    portugese: 'Mondial'
  },
  {
    english: 'Safaren',
    portugese: 'Safaren'
  },
  {
    english: 'Edward',
    portugese: 'Edward'
  },
  {
    english: 'Etfadoal',
    portugese: 'Etfadoal'
  },
  {
    english: 'Date Palm (Saudi arabia)',
    portugese: 'Tamareira (Arábia Saudita)'
  },
  {
    english: 'Ajwa',
    portugese: 'Ajwa'
  },
  {
    english: 'Safawi',
    portugese: 'Safawi'
  },
  {
    english: 'Khalas',
    portugese: 'Khalas'
  },
  {
    english: 'Sukkari',
    portugese: 'Sukkari'
  },
  {
    english: 'Khadrawy',
    portugese: 'Khadrawy'
  },
  {
    english: 'Olive (Saudi Arabia)',
    portugese: 'Azeitona (Arábia Saudita)'
  },
  {
    english: 'Arbosona',
    portugese: 'Arbosona'
  },
  {
    english: 'Arbequina',
    portugese: 'Arbequina'
  },
  {
    english: 'Picual',
    portugese: 'Picual'
  },
  {
    english: 'Koroneiki',
    portugese: 'Koroneiki'
  },
  {
    english: 'Kaissy H-85',
    portugese: 'Kaissy H-85'
  },
  {
    english: 'Picual H-78',
    portugese: 'Picual H-78'
  },
  {
    english: 'Sorani',
    portugese: 'Sorani'
  },
  {
    english: 'K-18',
    portugese: 'K-18'
  },
  {
    english: 'Pale or yellow choloric lesions on leaves surface',
    portugese: 'Lesões cloróticas pálidas ou amarelas na superfície das folhas'
  },
  {
    english: 'Lesions turn pink, red, purple, or light-brown, depending on the plant’s pigments',
    portugese: 'As lesões tornam-se rosa, vermelhas, roxas ou castanho-claro, dependendo dos pigmentos da planta'
  },
  {
    english: 'Initial symptoms are small, humid spots on the upper-third part of the stalk.',
    portugese: 'Os sintomas iniciais são pequenas manchas úmidas na parte superior do terço do caule.'
  },
  {
    english: 'The foliage becomes chlorotic and wilts',
    portugese: 'A folhagem torna-se clorótica e murcha'
  },
  {
    english: 'Panicle does not form grain and the stalk bends downward and tends to break easily.',
    portugese: 'A panícula não forma grãos e o caule se curva para baixo e tende a quebrar facilmente.'
  },
  {
    english: 'Dwarfing and bronze discolouration of the leaflets.',
    portugese: 'Ananismo e descoloração bronzeada dos folíolos.'
  },
  {
    english: 'Lesions on the leaves are of irregular shape, and are bronze to reddish-brown with darker edges.',
    portugese: 'As lesões nas folhas têm forma irregular e são de cor bronzeada a marrom avermelhada com bordas mais escuras.'
  },
  {
    english: 'Stems shows necrosis',
    portugese: 'Os caules mostram necrose.'
  },
  {
    english: 'Small irregular spots in leaves and stems',
    portugese: 'Pequenas manchas irregulares nas folhas e caules.'
  },
  {
    english: 'Cankers on old twings and brances',
    portugese: 'Úlceras nos ramos e galhos antigos.'
  },
  {
    english: 'Stunted sterile bushy shoots',
    portugese: 'Brotações arbustivas estéreis e atrofiadas.'
  },
  {
    english: 'Drying of entire clump',
    portugese: 'Secagem de todo o agrupamento.'
  },
  {
    english: 'Drying of plants',
    portugese: 'Secagem das plantas.'
  },
  {
    english: 'Mosaic apprearance on leaves',
    portugese: 'Aparência de mosaico nas folhas.'
  },
  {
    english: 'Drying, withering of leaves and finally plants die',
    portugese: 'Secagem, murchamento das folhas e, finalmente, morte das plantas.'
  },
  {
    english: 'Leaves becomes necrotic and dries',
    portugese: 'As folhas tornam-se necróticas e secas.'
  },
  {
    english: 'Brittle pseudostem',
    portugese: 'Pseudocaule quebradiço.'
  },
  {
    english: 'Lodging',
    portugese: 'Deitamento.'
  },
  {
    english: 'Deformed leaves',
    portugese: 'Folhas deformadas.'
  },
  {
    english: 'Yellow or pale green leaf spots',
    portugese: 'Manchas amarelas ou verde-pálidas nas folhas.'
  },
  {
    english: 'Reduced vegetative growth',
    portugese: 'Crescimento vegetativo reduzido.'
  },
  {
    english: 'Cankers on young stems',
    portugese: 'Úlceras nos caules jovens.'
  },
  {
    english: 'Brown necrosis on leaves',
    portugese: 'Necrose marrom nas folhas.'
  },
  {
    english: 'Drying stems',
    portugese: 'Caules secos.'
  },
  {
    english: 'Angular spots on limb',
    portugese: 'Manchas angulares no ramo.'
  },
  {
    english: 'Foliage burns',
    portugese: 'Queimaduras na folhagem.'
  },
  {
    english: 'Leaves wilt',
    portugese: 'Folhas murcham.'
  },
  {
    english: 'Necrosis of roots',
    portugese: 'Necrose das raízes.'
  },
  {
    english: 'Knots in the roots',
    portugese: 'Nós nas raízes.'
  },
  {
    english: 'The disease appears as small red colored spots on both surfaces of the leaf.',
    portugese: 'A doença aparece como pequenas manchas vermelhas em ambas as superfícies da folha.'
  },
  {
    english: 'The center of the spot is white in color encircled by red, purple or brown margin.',
    portugese: 'O centro da mancha é de cor branca, cercado por uma margem vermelha, roxa ou marrom.'
  },
  {
    english: 'Numerous small black dots like acervuli are seen on the white surface of the lesions.',
    portugese: 'Numerosos pontos pretos pequenos, como acérvulos, são vistos na superfície branca das lesões.'
  },
  {
    english: 'Develop a fluffy white or pinkish coloration. C. lunata colors the grain black.',
    portugese: 'Desenvolvem uma coloração branca fofa ou rosada. C. lunata colore o grão de preto.'
  },
  {
    english: 'Grain infected with these fungi develop a fluffy white or pinkish coloration.',
    portugese: 'Os grãos infectados por esses fungos desenvolvem uma coloração branca fofa ou rosada.'
  },
  {
    english: 'Curvularia lunata is also frequently encountered and this fungus colors the grains black.',
    portugese: 'Curvularia lunata também é frequentemente encontrada e esse fungo colore os grãos de preto.'
  },
  {
    english: 'The individual grains are replaced by smut sori. Sori are covered with creamy skin.',
    portugese: 'Os grãos individuais são substituídos por sori de carvão. Os sori são cobertos com uma pele cremosa.'
  },
  {
    english: 'Sori can be localized at a particular part of the head, or can occur over the entire inflorescence.',
    portugese: 'Os sori podem ser localizados em uma parte específica da cabeça ou podem ocorrer em toda a inflorescência.'
  },
  {
    english: 'Ratoon crops exhibit a higher disease incidence',
    portugese: 'As culturas de rebrota apresentam uma incidência de doenças mais alta.'
  },
  {
    english: 'It invades the growing points of young plants, either through oospore or conidial infection.',
    portugese: 'Invade os pontos de crescimento das plantas jovens, seja através de oosporos ou infecção conidial.'
  },
  {
    english: 'As the leaves unfold they exhibit green or yellow coloration.',
    portugese: 'Conforme as folhas se desdobram, elas exibem coloração verde ou amarela.'
  },
  {
    english: 'Abundant downy white growth is produced on the lower surface of the leaves, which consists of sporangiophores and sporangia.',
    portugese: 'Um crescimento branco lanoso abundante é produzido na face inferior das folhas, que consiste em esporangióforos e esporângios.'
  },
  {
    english: 'The entire ear head is either completely or partially replaced by a large whitish gall.',
    portugese: 'Toda a espiga é substituída completamente ou parcialmente por uma grande galha esbranquiçada.'
  },
  {
    english: 'The spores are blown away, exposing the dark filaments',
    portugese: 'Os esporos são soprados, expondo os filamentos escuros'
  },
  {
    english: 'Relatively small proportion of the florets are infected.',
    portugese: 'Proporção relativamente pequena das flores está infectada.'
  },
  {
    english: 'The sori or spore sacs are cylindrical, elongate, usually slightly curved with a relatively thick creamy-brown covering membrane.',
    portugese: 'Os sori ou sacos de esporos são cilíndricos, alongados, geralmente levemente curvados, com uma membrana de cobertura cremosa e marrom relativamente espessa.'
  },
  {
    english: 'Sprouting, emergence of the bud',
    portugese: 'Brotação, emergência do broto'
  },
  {
    english: 'The sori, which vary in length from 3 to 18 mm, is the solid long black (often curved) pointed columella which extends almost the full length of the sorus and which remains conspicuous after the smut spores have been blown away',
    portugese: 'Os sori, que variam de comprimento de 3 a 18 mm, são o sólido e longo colúmela preto (muitas vezes curvo) apontado que se estende quase por toda a extensão do sorus e que permanece visível após os esporos de carvão terem sido soprados.'
  },
  {
    english: 'The first symptoms are small flecks on the lower leaves (purple, tan or red depending upon the cultivar).',
    portugese: 'Os primeiros sintomas são pequenas manchas nas folhas inferiores (roxo, marrom ou vermelho dependendo do cultivar).'
  },
  {
    english: 'Pustules (uredosori) appear on both surfaces of leaf as purplish spots which rupture to release reddish powdery masses of uredospores.',
    portugese: 'Pústulas (uredosporos) aparecem em ambas as superfícies da folha como manchas arroxeadas que se rompem para liberar massas pulverulentas avermelhadas de uredósporos.'
  },
  {
    english: 'The pustules may also occur on the leaf sheaths and on the stalks of inflorescence',
    portugese: 'As pústulas também podem ocorrer nas bainhas das folhas e nos caules da inflorescência.'
  },
  {
    english: 'The young radical and the plumule are killed and there is complete rotting of the seedlings.',
    portugese: 'O radical jovem e a plúmula são mortos e há apodrecimento completo das plântulas.'
  },
  {
    english: 'The post-emergence phase is characterized by the infection of the young, juvenile tissues of the collar at the ground level.',
    portugese: 'A fase pós-emergência é caracterizada pela infecção dos tecidos jovens e juvenis da coleira no nível do solo.'
  },
  {
    english: 'The infected tissues become soft and water soaked. The seedlings topple over or collapse.',
    portugese: 'Os tecidos infectados tornam-se moles e encharcados. As plântulas tombam ou colapsam.'
  },
  {
    english: 'The disease is characterized by scattered, rapidly enlarging, irregular, brown, water-soaked lesions with characteristic gray-green borders.',
    portugese: 'A doença é caracterizada por lesões dispersas, rapidamente crescentes, irregulares, marrons, encharcadas de água, com bordas cinza-esverdeadas características.'
  },
  {
    english: 'During mid nursery period causing leaf blight and blackening of roots and stems leading to death of seedlings. Water soaked brown to black lesions appear on the leaf.',
    portugese: 'Durante o período de viveiro médio, causando queima de folhas e enegrecimento de raízes e caules, levando à morte das plântulas. Lesões marrons a pretas encharcadas de água aparecem na folha.'
  },
  {
    english: 'These patches enlarge and coalesce leading to wet rot of leaf tissue and midribs.',
    portugese: 'Esses remendos se expandem e se fundem, levando à podridão úmida do tecido foliar e das nervuras centrais.'
  },
  {
    english: 'Just like damping off, sudden death of seedlings in patches is noticed in seed beds.',
    portugese: 'Assim como no damping off, a morte súbita de plântulas em manchas é observada nos canteiros de sementes.'
  },
  {
    english: 'Blackening of the collar region, wilting and rotting of leaves are the symptoms.',
    portugese: 'O enegrecimento da região do colarinho, murchamento e apodrecimento das folhas são os sintomas.'
  },
  {
    english: 'Yellowing (chlorosis) of older leaves, wilting of plants, or flagging of leaf tips',
    portugese: 'Amarelamento (clorose) das folhas mais antigas, murchamento das plantas ou inclinação das pontas das folhas.'
  },
  {
    english: 'Symptom appears as small water soaked spots with sunken center on leaves.',
    portugese: 'O sintoma aparece como pequenas manchas encharcadas de água com centro afundado nas folhas.'
  },
  {
    english: 'Spots become white with brown margin.',
    portugese: 'As manchas tornam-se brancas com margem marrom.'
  },
  {
    english: 'Lesions occur also on midribs, petioles and lateral veins causing distortion and ragged.',
    portugese: 'Lesões ocorrem também nas nervuras centrais, pecíolos e veias laterais causando distorção e irregularidade.'
  },
  {
    english: 'Several small, round brown lesions with 2-10 mm diameter on lower and mature leaves occur.',
    portugese: 'Várias pequenas lesões marrons redondas com diâmetro de 2-10 mm ocorrem em folhas inferiores e maduras.'
  },
  {
    english: 'Typical lesion with white parchment center surrounded by brown or tan colored margin resembling eye of frog.',
    portugese: 'Lesão típica com centro de pergaminho branco cercado por margem marrom ou bege, semelhante ao olho de sapo.'
  },
  {
    english: 'Different spots coalesce causing drying of leaves which wither prematurely.',
    portugese: 'Diferentes manchas coalescem, causando secagem das folhas que murcham prematuramente.'
  },
  {
    english: 'Infected leaves show mottling veins show shortened internodes with small, distorted leaves.',
    portugese: 'Folhas infectadas mostram veias moteadas com entrenós encurtados e folhas pequenas e distorcidas.'
  },
  {
    english: 'In later growth of plant stunted and limited to basal suckers, and the vine eventually dies.',
    portugese: 'No crescimento posterior da planta, ela fica atrofiada e limitada a rebentos basais, e a videira eventualmente morre.'
  },
  {
    english: 'Dead and dying vines are usually present in a roughly circular pattern in the vineyard.',
    portugese: 'Vinhas mortas e moribundas geralmente estão presentes em um padrão aproximadamente circular no vinhedo.'
  },
  {
    english: 'Disease plants show leaves with mottling or mosaic pattern of light green and dark-green areas.',
    portugese: 'As plantas doentes mostram folhas com padrão moteado ou em mosaico de áreas verde-claras e verde-escuras.'
  },
  {
    english: 'Vein clearing, greenish yellow mottling occur as primary symptoms on newly formed young leaves.',
    portugese: 'O desbaste das nervuras, o moteado esverdeado-amarelado ocorrem como sintomas primários em folhas jovens recém-formadas.'
  },
  {
    english: 'Infection on young plants results in stunted growth, malformation, distortion and puckering of leaves. Dark-green blisters and sometime enations (leafy growth) appear on the dorsal side of the leaf.',
    portugese: 'A infecção em plantas jovens resulta em crescimento atrofiado, má formação, distorção e enrugamento das folhas. Bolhas verde-escuras e às vezes enações (crescimento folhoso) aparecem no lado dorsal da folha.'
  },
  {
    english: 'Symptom development occurs particularly during and immediately following periods of heavy rains and high relative humidity.',
    portugese: 'O desenvolvimento dos sintomas ocorre especialmente durante e imediatamente após períodos de chuvas intensas e alta umidade relativa.'
  },
  {
    english: 'Wilting during the heat of the day.',
    portugese: 'Murchamento durante o calor do dia.'
  },
  {
    english: 'Initially it appears on lower and older leaves as small brown, concentric circular lesions, which spread to upper leaves, petioles, stalks, and capsules even.',
    portugese: 'Inicialmente aparece em folhas inferiores e mais velhas como pequenas lesões marrons, circulares e concêntricas, que se espalham para folhas superiores, pecíolos, hastes e até cápsulas.'
  },
  {
    english: 'In warm weather under high humidity, the leaf spots enlarge, 1-3 cm in diameter, centers are necroses and turn brown with characteristic marking giving a target board appearance with a definite outline.',
    portugese: 'Em clima quente e com alta umidade, as manchas nas folhas se ampliam, com 1-3 cm de diâmetro, os centros são necroses e ficam marrons com marcações características, dando uma aparência de tabuleiro de alvo com um contorno definido.'
  },
  {
    english: 'In severe infection spots enlarge, coalesce, and damage large areas making leaves dark-brown, ragged, and worthless.',
    portugese: 'Em infecções graves, as manchas se ampliam, se fundem e danificam grandes áreas, tornando as folhas escuras, irregulares e sem valor.'
  },
  {
    english: 'It is a complete root parasite affecting the yield and quality of tobacco.',
    portugese: 'É um parasita de raiz completo que afeta o rendimento e a qualidade do tabaco.'
  },
  {
    english: 'The shoots emerge in clusters, and their basal portion is attached to tobacco roots through which it draws nourishment and depletes the host, resulting in a yield loss of 24 to 52%. Affected plants become stunted, leaves turn pale, and wilt.',
    portugese: 'Os brotos emergem em grupos, e sua porção basal é ligada às raízes do tabaco através das quais ele retira nutrientes e esgota o hospedeiro, resultando em uma perda de rendimento de 24 a 52%. As plantas afetadas tornam-se atrofiadas, as folhas ficam pálidas e murcham.'
  },
  {
    english: 'Initially leaf tips droop, and as the attack intensifies, all the leaves wilt.',
    portugese: 'Inicialmente as pontas das folhas ficam caídas, e à medida que o ataque se intensifica, todas as folhas murcham.'
  },
  {
    english: 'Disease is characterized by downward curling & rolling of leaves; thickening; dark green in color with vein clearing effect; brittle; enation (cup like or frill like outgrowth), reduction in size.',
    portugese: 'A doença é caracterizada por enrolamento para baixo e enrolamento das folhas; espessamento; verde escuro com efeito de clareamento das nervuras; quebradiço; enação (crescimento em forma de xícara ou babado), redução de tamanho.'
  },
  {
    english: 'Infected plants become stunted due to shortening of internodes and the formation of more lateral branches.',
    portugese: 'As plantas infectadas ficam atrofiadas devido ao encurtamento dos entrenós e à formação de mais ramos laterais.'
  },
  {
    english: 'Flowers are deformed; partly or completely sterile.',
    portugese: 'As flores são deformadas; parcialmente ou completamente estéreis.'
  },
  {
    english: 'Affected plants show leaves with mottling or mosaic pattern of light green and dark-green areas.',
    portugese: 'As plantas afetadas mostram folhas com padrão moteado ou em mosaico de áreas verde-claras e verde-escuras.'
  },
  {
    english: 'Primary symptoms appear on newly formed young leaves as vein clearing, greenish yellow mottling.',
    portugese: 'Os sintomas primários aparecem em folhas jovens recém-formadas como desbaste das nervuras, moteado esverdeado-amarelado.'
  },
  {
    english: 'Darkgreen blisters and sometime enations (leafy growth) appear on the dorsal side of the leaf.',
    portugese: 'Bolhas verdes escuras e às vezes enações (crescimento folhoso) aparecem no lado dorsal da folha.'
  },
  {
    english: 'Initially, greyish-white spots (about 0.5-cm in diameter) appear at the base of the lower leaves of the maturing plant.',
    portugese: 'Inicialmente, manchas esbranquiçadas acinzentadas (com cerca de 0,5 cm de diâmetro) aparecem na base das folhas inferiores da planta em crescimento.'
  },
  {
    english: 'Sometimes leaves with incipient infection result in blemishes on curing, which reduce the commercial value of leaves.',
    portugese: 'Às vezes, folhas com infecção incipiente resultam em manchas durante o processo de cura, o que reduz o valor comercial das folhas.'
  },
  {
    english: 'Such leaves, on curing, get scorched and show brown patches rendering them unfit for marketing.',
    portugese: 'Tais folhas, durante o processo de cura, queimam e mostram manchas marrons, tornando-as inadequadas para comercialização.'
  },
  {
    english: 'The leaves of the affected plants become yellow.',
    portugese: 'As folhas das plantas afetadas tornam-se amarelas.'
  },
  {
    english: 'Water-soaked appearance is found at the base of the pseudostem, and rotting takes place at the basal portion.',
    portugese: 'Aparência encharcada é encontrada na base do pseudocaule, e apodrecimento ocorre na porção basal.'
  },
  {
    english: 'The affected rhizomes become soft and pulpy, and plants easily collapse on pressing.',
    portugese: 'Os rizomas afetados tornam-se moles e fibrosos, e as plantas desmoronam facilmente ao pressionar.'
  },
  {
    english: 'Mild drooping and curling of leaf margins of the lower leaf, and it progressively spreads through lower leaves to upper leaves.',
    portugese: 'Murchamento leve e enrolamento das margens das folhas da parte inferior, e se espalha progressivamente pelas folhas inferiores para as superiores.'
  },
  {
    english: 'At the severe condition, yellowing and wilting symptoms can be seen.',
    portugese: 'Em condições severas, podem ser observados sintomas de amarelamento e murchamento.'
  },
  {
    english: 'Milky ooze would be secreted from the affected pseudostem and rhizome when they are gently pressed by fingers.',
    portugese: 'Uma secreção leitosa seria secretada do pseudocaule e do rizoma afetados quando pressionados suavemente pelos dedos.'
  },
  {
    english: 'The symptoms of the disease start as a water-soaked spot and later turns as a white spot surrounded by dark brown margins and a yellow halo.',
    portugese: 'Os sintomas da doença começam como um ponto encharcado e mais tarde se transformam em um ponto branco cercado por margens marrom-escuro e um halo amarelo.'
  },
  {
    english: 'Yellow halo',
    portugese: 'Halo amarelo'
  },
  {
    english: 'The lesions enlarge and adjacent lesions coalesce to form necrotic areas.',
    portugese: 'As lesões se ampliam e as lesões adjacentes se fundem para formar áreas necróticas.'
  },
  {
    english: 'On upper surfaces, leaves at the infection site show blotches of yellow or pale green usually near veins, surrounded by normally colored tissue.',
    portugese: 'Nas superfícies superiores, as folhas no local da infecção mostram manchas amarelas ou verde-claras geralmente perto das nervuras, cercadas por tecido normalmente colorido.'
  },
  {
    english: 'Occasionally, the fungus may attack the stem of young seedlings when grown under reduced light conditions.',
    portugese: 'Ocasionalmente, o fungo pode atacar o caule de plântulas jovens quando cultivado em condições de luz reduzida.'
  },
  {
    english: 'The spots on fruits first appear as brown superficial discoloration of the skin which develops into circular, slightly sunken areas and 1 to 3 cm in diameter.',
    portugese: 'As manchas nos frutos aparecem primeiro como descoloração superficial marrom da pele, que se desenvolve em áreas circulares ligeiramente afundadas e com 1 a 3 cm de diâmetro.'
  },
  {
    english: 'Characteristically elongated dark green streaks develop on petiole and upper half of the stems, infected fruits show circular concentric rings causing up to 56-60% yield loss.',
    portugese: 'Estrias escuras alongadas caracteristicamente se desenvolvem no pecíolo e na metade superior dos caules, frutos infectados mostram anéis concêntricos circulares causando até 56-60% de perda de rendimento.'
  },
  {
    english: 'Roughly circular yellowish discolorations, called oil spots. White down (sporulation of the fungus), particularly on the lower leaf surface.',
    portugese: 'Descolorações amareladas aproximadamente circulares, chamadas de manchas de óleo. Penugem branca (esporulação do fungo), especialmente na superfície inferior da folha.'
  },
  {
    english: 'The spots turn brown with time and severely infected leaves may drop.',
    portugese: 'As manchas ficam marrons com o tempo e as folhas gravemente infectadas podem cair.'
  },
  {
    english: "Infected shoot tips curl ('shepherd's crook') and a white down occurs on the stem (sporulation of the fungus)",
    portugese: 'As pontas dos brotos infectados se curvam ("bengala do pastor") e uma penugem branca ocorre no caule (esporulação do fungo).'
  },
  {
    english: "The first powdery mildew lesions are frequently found on the undersides of leaves.",
    portugese: "As primeiras lesões de oídio são frequentemente encontradas na parte inferior das folhas."
  },
  {
    english: "Very small orange to black spherical structures called cleistothecia develop on the upper and lower surfaces of leaves",
    portugese: "Estruturas esféricas muito pequenas, de laranja a preto, chamadas cleistotecas, desenvolvem-se nas superfícies superior e inferior das folhas."
  },
  {
    english: "The gradual degeneration of the fungus over the course of the season",
    portugese: "A degeneração gradual do fungo ao longo da temporada."
  },
  {
    english: "The fungus will cause small round spots",
    portugese: "O fungo causará pequenas manchas redondas."
  },
  {
    english: "As they age, they give way to small holes (leaving a 'shot-hole' appearance)",
    portugese: "Conforme envelhecem, dão lugar a pequenos buracos (deixando uma aparência de 'buraco de tiro')."
  },
  {
    english: "Shoots: Deep elongated cankers, greyish in the center with a black edge",
    portugese: "Brotos: Cancros alongados profundos, acinzentados no centro com uma borda preta."
  },
  {
    english: "It can infect the green leaves and cause necrotic brown spots",
    portugese: "Pode infectar as folhas verdes e causar manchas necróticas marrons."
  },
  {
    english: "Infected berries become covered with a greyish felt-like substance consisting of spores of the fungus",
    portugese: "As bagas infectadas tornam-se cobertas com uma substância acinzentada semelhante a feltro, composta por esporos do fungo."
  },
  {
    english: "Inflorescences can also be infected (b), causing the inflorescences to dry out or latent infections visible only at veraison.",
    portugese: "As inflorescências também podem ser infectadas (b), causando o ressecamento das inflorescências ou infecções latentes visíveis apenas na véraison."
  },
  {
    english: "Leaves: presence of small brown lesions (2 to 10 mm in diameter) surrounded by a darker margin a ring of small black fruiting bodies (black pustules)",
    portugese: "Folhas: presença de pequenas lesões marrons (2 a 10 mm de diâmetro) cercadas por uma margem mais escura e um anel de pequenos corpos frutíferos pretos (pústulas pretas)."
  },
  {
    english: "Berries: At first, the berries become whitish then purple to black",
    portugese: "Bagas: No início, as bagas tornam-se esbranquiçadas e depois roxas a pretas."
  },
  {
    english: "Berries: At the end of the season, berries will be covered by black pustules",
    portugese: "Bagas: No final da temporada, as bagas estarão cobertas por pústulas pretas."
  },
  {
    english: "Foliage spots first appear as small brown spots that are circular to angular in shape.",
    portugese: "As manchas nas folhas aparecem primeiro como pequenas manchas marrons de formato circular a angular."
  },
  {
    english: "Foliage spots are irregular and turn dark brown or black. Stem lesions can girdle the stem and cause vines to wilt.",
    portugese: "As manchas nas folhas são irregulares e tornam-se marrom escuro ou pretas. Lesões no caule podem estrangular o caule e fazer com que as videiras murchem."
  },
  {
    english: "The most striking diagnostic symptoms are produced on the fruit, where circular, black, sunken cankers appear.",
    portugese: "Os sintomas diagnósticos mais marcantes são produzidos na fruta, onde aparecem cancroes circulares, pretos e afundados."
  },
  {
    english: "The disease starts as small, yellow spots which enlarge to form concentric rings on the upper leaf surfaces.",
    portugese: "A doença começa como pequenas manchas amarelas que aumentam para formar anéis concêntricos nas superfícies superiores das folhas."
  },
  {
    english: "The pathogen also may cause fruit injury.",
    portugese: "O patógeno também pode causar danos à fruta."
  },
  {
    english: "Plants weakened by a lack of proper fertilizer or poor soils are more likely to be attacked than young, vigorously growing plants.",
    portugese: "Plantas enfraquecidas pela falta de fertilizante adequado ou solos pobres têm mais probabilidade de serem atacadas do que plantas jovens e vigorosas."
  },
  {
    english: "Early symptoms of fruit blotch on foliage are useful in diagnosis. Small, water-soaked areas (a few millimeters in diameter) on cotyledons or leaves may develop, but they are easily overlooked.",
    portugese: "Os primeiros sintomas de mancha de fruta nas folhas são úteis no diagnóstico. Pequenas áreas encharcadas de água (alguns milímetros de diâmetro) em cotilédones ou folhas podem se desenvolver, mas são facilmente ignoradas."
  },
  {
    english: "These later turn brown, but they remain small and do not severely damage leaves. However, the leaf spots serve as a source of the pathogen to infect fruit.",
    portugese: "Essas mais tarde tornam-se marrons, mas permanecem pequenas e não danificam severamente as folhas. No entanto, as manchas nas folhas servem como uma fonte do patógeno para infectar a fruta."
  },
  {
    english: "Fruit infections first appear as small, water-soaked areas on the upper surface of melons.",
    portugese: "As infecções na fruta aparecem primeiro como pequenas áreas encharcadas de água na superfície superior dos melões."
  },
  {
    english: "Initially, the blotches do not extend into the rind, but affected rinds eventually crack and become invaded by secondary pathogens.",
    portugese: "Inicialmente, as manchas não se estendem para a casca, mas as cascas afetadas eventualmente racham e são invadidas por patógenos secundários."
  },
  {
    english: "The disease is mostly confined to leaves, but stems and petioles may become diseased.",
    portugese: "A doença é principalmente confinada às folhas, mas os caules e pecíolos podem ser afetados."
  },
  {
    english: "Leaf spots first appear on younger leaves as small circular spots having dark green to purple margins, becoming white to light tan in the center.",
    portugese: "As manchas nas folhas aparecem primeiro em folhas mais jovens como pequenas manchas circulares com margens verdes escuras a roxas, tornando-se brancas a bege claro no centro."
  },
  {
    english: "The leaf lamina around the spots may become chlorotic and eventually the entire leaf may turn yellow and fall off.",
    portugese: "A lâmina foliar ao redor das manchas pode se tornar clorótica e eventualmente toda a folha pode ficar amarela e cair."
  },
  {
    english: "Symptoms of mosaic appear on the youngest leaves when infection occurs at 6 – 8 leaves stage.",
    portugese: "Os sintomas de mosaico aparecem nas folhas mais jovens quando a infecção ocorre no estágio de 6 a 8 folhas."
  },
  {
    english: "Leaves curl downwards and become mottled, distorted, wrinkled and reduced in size.",
    portugese: "As folhas se curvam para baixo e se tornam manchadas, distorcidas, enrugadas e reduzidas em tamanho."
  },
  {
    english: "Veins appear bunchy because of shortening of internodes.",
    portugese: "As veias parecem amontoadas devido ao encurtamento dos entrenós."
  },
  {
    english: "It is evident as a superficial, powdery, grayish-white growth on upper leaf surfaces, petioles, and even main stems of infected plants.",
    portugese: "É evidente como um crescimento superficial, pulverulento, esbranquiçado e acinzentado nas superfícies das folhas, pecíolos e até mesmo nos caules principais das plantas infectadas."
  },
  {
    english: "Affected areas turn yellow then brown and die.",
    portugese: "As áreas afetadas ficam amarelas e depois marrons e morrem."
  },
  {
    english: "Some early disease results from spores produced on overwintering cucurbit debris or weeds but the major source of disease inoculum is windblown spores from southern crops.",
    portugese: "Algumas doenças precoces resultam de esporos produzidos em detritos ou ervas daninhas de cucurbitáceas que hibernam, mas a principal fonte de inóculo da doença são os esporos levados pelo vento das plantações do sul."
  },
  {
    english: "Symptoms first appear as dull, greyish green appearance to the foliage.",
    portugese: "Os sintomas aparecem inicialmente como uma aparência verde acinzentada e sem brilho nas folhas."
  },
  {
    english: "Affected vines wilt, become dry, turn brown and die.",
    portugese: "As vinhas afetadas murcham, secam, ficam marrons e morrem."
  },
  {
    english: "Elongated brown lesions (dead areas) may develop along stems near the crown.",
    portugese: "Lesões marrons alongadas (áreas mortas) podem se desenvolver ao longo dos caules perto da coroa."
  },
  {
    english: "Infected stems first appear water-soaked and then become dry, coarse, and tan.",
    portugese: "Os caules infectados primeiro parecem encharcados e depois ficam secos, grosseiros e cor de bronze."
  },
  {
    english: "Older stem lesions (dead tissue) reveal small black fruiting bodies (pycnidia) within the affected tissues.",
    portugese: "As lesões antigas nos caules (tecido morto) revelam pequenos corpos frutíferos pretos (picnídios) dentro dos tecidos afetados."
  },
  {
    english: "Stem lesions on melons exude a gummy, red-brown substance which may be mistaken for a symptom of Fusarium wilt.",
    portugese: "As lesões nos caules de melões exsudam uma substância pegajosa de cor vermelho-marrom, que pode ser confundida com um sintoma de murcha de Fusarium."
  },
  {
    english: "Powdery mildew first appears on the oldest leaves as yellow areas on the upper leaf surface.",
    portugese: "O oídio aparece primeiro nas folhas mais antigas como áreas amarelas na superfície superior da folha."
  },
  {
    english: "The white mildew on the underside of the leaf often can only be seen with the aid of a hand lens.",
    portugese: "O oídio branco na parte inferior da folha frequentemente só pode ser visto com a ajuda de uma lente de aumento."
  },
  {
    english: "As the disease increases, the areas of whitish, powdery growth become more apparent and can cover both upper and lower leaf surfaces.",
    portugese: "À medida que a doença avança, as áreas de crescimento esbranquiçado e pulverulento se tornam mais aparentes e podem cobrir tanto as superfícies superior quanto inferior das folhas."
  },
  {
    english: "Initial symptoms are a slight flagging of the plants in midday even when abundant moisture is present.",
    portugese: "Os sintomas iniciais são um leve murchamento das plantas ao meio-dia, mesmo quando há umidade abundante."
  },
  {
    english: "This flagging will continue to worsen so that, by the third or fourth day, many of the plants are completely wilted.",
    portugese: "Esse murchamento continuará a piorar, de modo que, no terceiro ou quarto dia, muitas das plantas estarão completamente murchas."
  },
  {
    english: "Affected plants appear to lack feeder roots; other roots become slightly misshapen and thick.",
    portugese: "As plantas afetadas parecem não ter raízes alimentadoras; outras raízes tornam-se ligeiramente deformadas e grossas."
  },
  {
    english: "Symptoms are most striking on the new growth of young, rapidly growing plants.",
    portugese: "Os sintomas são mais evidentes no novo crescimento de plantas jovens e em rápido crescimento."
  },
  {
    english: "Leaves are dwarfed, misshapen, puckered, pale green in color, and exhibit mosaic patterns of light and dark green color.",
    portugese: "As folhas são atrofiadas, deformadas, enrugadas, de cor verde pálido e exibem padrões de mosaico de cores verde clara e escura."
  },
  {
    english: "Infected plants remain stunted throughout the season and may fail to set fruit or it will be small in size and poor in quality.",
    portugese: "As plantas infectadas permanecem atrofiadas durante toda a estação e podem não produzir frutos ou estes serão pequenos e de má qualidade."
  },
  {
    english: "Sometimes the vine terminals of infected plants become erect and hover over the canopy.",
    portugese: "Às vezes, os terminais das videiras de plantas infectadas se tornam eretos e pairam sobre o dossel."
  },
  {
    english: "Affected plants are often most numerous near edges of fields and appear in patches. Plants turn yellow and die back.",
    portugese: "As plantas afetadas são frequentemente mais numerosas perto das bordas dos campos e aparecem em manchas. As plantas ficam amarelas e morrem."
  },
  {
    english: "Numerous squash bugs may be present or there will be evidence of their prior feeding.",
    portugese: "Numerosos percevejos podem estar presentes ou haverá evidências de sua alimentação anterior."
  },
  {
    english: "When basal stems of affected plants are cross-sectioned, a ring of light brown discoloration is evident around the outer part (phloem) of the vascular core.",
    portugese: "Quando os caules basais das plantas afetadas são seccionados transversalmente, um anel de descoloração marrom clara é evidente ao redor da parte externa (floema) do núcleo vascular."
  },
  {
    english: "Aboveground, plants affected by root-knot nematode appear yellowed, stunted, or generally unthrifty.",
    portugese: "Acima do solo, as plantas afetadas pelo nematoide das galhas apresentam-se amareladas, atrofiadas ou geralmente pouco saudáveis."
  },
  {
    english: "Affected areas often occur as patchy areas in a field or along a row of plants.",
    portugese: "As áreas afetadas frequentemente ocorrem como áreas irregulares em um campo ou ao longo de uma fileira de plantas."
  },
  {
    english: "Affected roots are disfigured, swollen, and stubby in appearance.",
    portugese: "As raízes afetadas são deformadas, inchadas e curtas em sua aparência."
  },
  {
    english: "Symptoms first appear as yellowed wedge-shaped areas on older leaves, which eventually develop brown sectors.",
    portugese: "Os sintomas aparecem primeiro como áreas amareladas em forma de cunha nas folhas mais antigas, que eventualmente desenvolvem setores marrons."
  },
  {
    english: "Crown leaves collapse and wilt extends along individual vines.",
    portugese: "As folhas da coroa se encolhem e o murchamento se estende ao longo de videiras individuais."
  },
  {
    english: "Wilt symptoms often are one-sided, in that individual vines wilt before the entire plant dies.",
    portugese: "Os sintomas de murchamento muitas vezes são unilaterais, ou seja, as videiras individuais murcham antes que toda a planta morra."
  },
  {
    english: "Externally gradual yellowing and drying of foliage, shrinkage/withering of canes.",
    portugese: "Externamente, amarelamento gradual e secagem da folhagem, encolhimento/murchamento dos caules."
  },
  {
    english: "Some symptoms",
    portugese: "Alguns sintomas"
  },
  {
    english: "Custom Symptom 2",
    portugese: "Sintoma Personalizado 2"
  },
  {
    english: "Circular gray-brown lesions on leaves and wilting the plant",
    portugese: "Lesões circulares acinzentadas-marrom nas folhas e murchamento da planta"
  },
  {
    english: "The vascular system of the plant is discolored",
    portugese: "O sistema vascular da planta está descolorido"
  },
  {
    english: "Corollas of expanded blossoms appear blighted; brown lesions on leaves which have come into contact with infected blossoms.",
    portugese: "As corolas das flores expandidas parecem murchas; lesões marrons nas folhas que entraram em contato com flores infectadas."
  },
  {
    english: "Infected blossoms do not produce fruit",
    portugese: "Flores infectadas não produzem frutos"
  },
  {
    english: "In large fields, severe infections are often visible as brown patches",
    portugese: "Em campos grandes, infecções severas são frequentemente visíveis como manchas marrons"
  },
  {
    english: "Infected berries are cream or pink in color and turn tan or gray",
    portugese: "Bagas infectadas são de cor creme ou rosa e tornam-se bege ou cinza"
  },
  {
    english: "Berries become shriveled and hard; shriveled skin of fruit breaks down to expose black rind of fungal tissue",
    portugese: "As bagas tornam-se enrugadas e duras; a pele enrugada do fruto se rompe para expor a casca preta do tecido fúngico"
  },
  {
    english: "Death of infected shoots, leaves, and flowers",
    portugese: "Morte de brotos, folhas e flores infectadas"
  },
  {
    english: "White fluffy growth on the upper surfaces of leaves or the lower leaf surface",
    portugese: "Crescimento fofo e branco na superfície superior das folhas ou na superfície inferior das folhas"
  },
  {
    english: "Leaves may be puckered in appearance; leaves may develop chlorotic spots with red borders",
    portugese: "As folhas podem apresentar-se enrugadas; as folhas podem desenvolver manchas cloróticas com bordas vermelhas"
  },
  {
    english: "Leaves may drop from the plant",
    portugese: "As folhas podem cair da planta"
  },
  {
    english: "Elongated reddish streaks on green stems, purplish red leaves, cupped leaves.",
    portugese: "Estrias avermelhadas alongadas em caules verdes, folhas avermelhadas, folhas dobradas."
  },
  {
    english: "Leaves may be elongated or strap-like.",
    portugese: "As folhas podem ser alongadas ou em forma de correia."
  },
  {
    english: "Reddish-purple fruit",
    portugese: "Frutos avermelhados-roxos"
  },
  {
    english: "It is a soil-borne disease caused by the fungus Sclerotiniascelorotiorum.",
    portugese: "É uma doença transmitida pelo solo causada pelo fungo Sclerotiniascelorotiorum."
  },
  {
    english: "The white rust fungus attacks the lower surface of the outer leaves, and plants suddenly die.",
    portugese: "O fungo da ferrugem branca ataca a superfície inferior das folhas externas, e as plantas morrem repentinamente."
  },
  {
    english: "White rust is an obligate parasite that attacks vegetative and flowering structures of the plants and can cause yellow lesions on the upper surface",
    portugese: "A ferrugem branca é um parasita obrigatório que ataca estruturas vegetativas e florais das plantas e pode causar lesões amarelas na superfície superior"
  },
  {
    english: "Small purplish brown spots on the under surface of leaves",
    portugese: "Pequenas manchas castanho-arroxeadas na superfície inferior das folhas"
  },
  {
    english: "The most visible symptom is a bright bronze to red coloration of the leaves of the young plant or a pinkish and/or yellowish coloration of the older leaves.",
    portugese: "O sintoma mais visível é uma coloração bronzeada a vermelha brilhante das folhas da planta jovem ou uma coloração rosada e/ou amarelada das folhas mais velhas."
  },
  {
    english: "The symptoms of root rots are a reduction in plant growth with the development of reddish-colored leaves and the browning of the leaf margins.",
    portugese: "Os sintomas das podridões radiculares são uma redução no crescimento da planta com o desenvolvimento de folhas de cor avermelhada e o amarelamento das margens das folhas."
  },
  {
    english: "The symptoms are rotting at the base of the leaves in the center of the leaf whorl (heart) of young non-flowering plants.",
    portugese: "Os sintomas são a decomposição na base das folhas no centro do tufo de folhas (coração) de plantas jovens não floridas."
  },
  {
    english: "Water soaked appearance is found at the base of the pseudostem and rotting takes place at the basal portion.",
    portugese: "A aparência encharcada de água é encontrada na base do pseudocaule e a decomposição ocorre na porção basal."
  },
  {
    english: "The affected rhizomes become soft and pulpy and plants easily collapse on pressing.",
    portugese: "Os rizomas afetados tornam-se moles e pulposos e as plantas colapsam facilmente ao serem pressionadas."
  },
  {
    english: "The spots of 1-2mm diameter appear in more numbers, covering both sides of leaf.",
    portugese: "As manchas de 1-2mm de diâmetro aparecem em maior número, cobrindo ambos os lados da folha."
  },
  {
    english: "The attacked leaf presents a reddish-brown appearance instead of the normal green color.",
    portugese: "A folha atacada apresenta uma aparência marrom-avermelhada em vez da cor verde normal."
  },
  {
    english: "These spots coalesce to form irregular bigger patches.",
    portugese: "Essas manchas se fundem para formar manchas maiores e irregulares."
  },
  {
    english: "Yello halo",
    portugese: "Halo amarelo"
  },
  {
    english: "Small brown lesions near top of berries (early on)",
    portugese: "Pequenas lesões marrons perto do topo das bagas (no início)"
  },
  {
    english: "Powdery dead young leaves",
    portugese: "Folhas jovens mortas em pó"
  },
  {
    english: 'Soft and mushy rotten holes or areas on fruit',
    portugese: 'Buracos ou áreas podres macias e esponjosas em frutas'
  },
  {
    english: 'An early symptom of the disease is upward curling of the leaf margins.',
    portugese: 'Um sintoma inicial da doença é o enrolamento para cima das margens das folhas.'
  },
  {
    english: 'White powdery splotches on the top of leaves or stems',
    portugese: 'Manchas pulverulentas brancas na parte superior das folhas ou caules'
  },
  {
    english: 'Leaves look like they’re dusted with white powder (especially the underside)',
    portugese: 'As folhas parecem estar cobertas de pó branco (especialmente na parte inferior)'
  },
  {
    english: 'Spots may later turn into tan or white centers with rusty-brown margins',
    portugese: 'Manchas podem mais tarde se transformar em centros beges ou brancos com margens marrom ferrugem'
  },
  {
    english: 'Spots may merge together and kill whole leaves',
    portugese: 'Manchas podem se unir e matar folhas inteiras'
  },
  {
    english: 'Black or brown leathery texture on fruits near spots',
    portugese: 'Textura de couro preto ou marrom em frutas próximas a manchas'
  },
  {
    english: 'It is fast acting as strawberry plants can suddenly wilt and die.',
    portugese: 'É de ação rápida, já que as plantas de morango podem murchar e morrer repentinamente.'
  },
  {
    english: 'This disease affects the outer leaves first; they become yellow and eventually take on a scorched appearance.',
    portugese: 'Essa doença afeta primeiro as folhas externas; elas se tornam amarelas e eventualmente adquirem uma aparência queimada.'
  },
  {
    english: 'It enters through roots and affects the water-conducting tissues in the crown',
    portugese: 'Entra pelas raízes e afeta os tecidos condutores de água na coroa'
  },
  {
    english: 'Wilting foliage in spite of ample water',
    portugese: 'Murchamento das folhagens apesar da água abundante'
  },
  {
    english: 'Older leaves drying and dying off while younger leaves remain green',
    portugese: 'Folhas mais velhas secando e morrendo enquanto as mais jovens permanecem verdes'
  },
  {
    english: 'Orange or reddish-brown coloration in center of crowns',
    portugese: 'Coloração alaranjada ou marrom-avermelhada no centro das coroas'
  },
  {
    english: 'Irregular dark purple or brown spots scattered over leaf surface',
    portugese: 'Manchas escuras irregulares roxas ou marrons espalhadas pela superfície da folha'
  },
  {
    english: 'Spots with purple centers and no defined border (the leaf spot disease has a clear margin)',
    portugese: 'Manchas com centros roxos e sem borda definida (a doença de mancha foliar tem uma margem clara)'
  },
  {
    english: 'Dead leaves, flowers, or fruit (in severe infections)',
    portugese: 'Folhas, flores ou frutas mortas (em infecções graves)'
  },
  {
    english: 'Lesions or "spots" are more numerous on upper leaf surfaces and appear circular to irregular in shape.',
    portugese: 'As lesões ou "manchas" são mais numerosas nas superfícies superiores das folhas e têm formato circular a irregular.'
  },
  {
    english: 'These lesions often have definite reddish-purple to rusty-brown borders that surround a necrotic area.',
    portugese: 'Essas lesões frequentemente têm bordas definidas de vermelho-roxo a marrom ferrugem que cercam uma área necrótica.'
  },
  {
    english: 'Susceptible varieties can be defoliated partly or completely by late summer.',
    portugese: 'Variedades suscetíveis podem ser desfolhadas parcialmente ou completamente no final do verão.'
  },
  {
    english: 'Gray and tan lesions that begin at leaf margins',
    portugese: 'Lesões cinza e bege que começam nas margens das folhas'
  },
  {
    english: 'Blotches spread to cover first new leaves of spring plants',
    portugese: 'Manchas se espalham para cobrir as primeiras folhas novas das plantas de primavera'
  },
  {
    english: 'Brownish decay of the fruit calyx (green leaves on top of berries) that is purely cosmetic',
    portugese: 'Decomposição amarronzada do cálice da fruta (folhas verdes no topo das bagas) que é puramente cosmética'
  },
  {
    english: 'Rapid wilting and death of lots of plants',
    portugese: 'Murchamento rápido e morte de muitas plantas'
  },
  {
    english: 'Leaves turn dry, yellow, reddish, or brown at the margins and in the veins. New leaves stop developing',
    portugese: 'As folhas ficam secas, amarelas, avermelhadas ou marrons nas margens e nas veias. Novas folhas deixam de se desenvolver'
  },
  {
    english: 'Bluish or brownish-black blotches on runners',
    portugese: 'Manchas azuladas ou marrons-escuras nos estolhos'
  },
  {
    english: 'Infected plants are stunted, with few runners and few fruit.',
    portugese: 'Plantas infectadas são atrofiadas, com poucos estolhos e poucos frutos.'
  },
  {
    english: 'New leaves are with bluish-green and may wilt',
    portugese: 'As novas folhas são de cor verde-azulada e podem murchar'
  },
  {
    english: 'Older leaves may be reddish orange to yellow tinged',
    portugese: 'As folhas mais velhas podem ser tingidas de vermelho alaranjado a amarelo'
  },
  {
    english: 'Blotches are delineated by leaf veins',
    portugese: 'Manchas são delineadas pelas veias das folhas'
  },
  {
    english: 'Central dark brown to purple zone with reddish or lighter brown outer areas',
    portugese: 'Zona central marrom-escuro a roxa com áreas externas avermelhadas ou marrom mais claro'
  },
  {
    english: 'They have formed in older, necrotic diseased tissue and are diagnostic for Phomopsis leaf blight.',
    portugese: 'Elas se formaram em tecido doente necrótico mais antigo e são diagnósticas para o murchamento foliar de Phomopsis.'
  },
  {
    english: 'Brown or black colored spots on green and ripe berries',
    portugese: 'Manchas de cor marrom ou preta em bagas verdes e maduras'
  },
  {
    english: 'Spots appear water-soaked',
    portugese: 'Manchas aparecem encharcadas de água'
  },
  {
    english: 'There are several spots on each berry ',
    portugese: 'Há várias manchas em cada fruta'
  },
  {
    english: 'Infects strawberry bloom and green or mature fruit.',
    portugese: 'Infecta a floração do morango e frutas verdes ou maduras.'
  },
  {
    english: 'Infected blossom clusters turn brown and die.',
    portugese: 'Os cachos de flores infectados ficam marrons e morrem.'
  },
  {
    english: 'Green fruit become hard and leathery.',
    portugese: 'As frutas verdes ficam duras e com textura de couro.'
  },
  {
    english: "Slimy or crusty beadlike structures that cover straw, lower leaves, sometimes petioles.",
    portugese: "Estruturas semelhantes a contas viscosas ou crostosas que cobrem palha, folhas inferiores, às vezes pecíolos."
  },
  {
    english: "Creamy-white, grey, purple or yellow.",
    portugese: "Branco-cremoso, cinza, roxo ou amarelo."
  },
  {
    english: "Eventually produce fruiting structures that are marshmallow-like in texture and produce powdery dry black spores.",
    portugese: "Eventualmente, produzem estruturas frutíferas que são semelhantes a marshmallows em textura e produzem esporos pretos secos e pulverulentos."
  },
  {
    english: "Fewer fine feeder roots and a bushy appearance",
    portugese: "Menos raízes alimentadoras finas e uma aparência arbustiva."
  },
  {
    english: "Reddish-brown lesions on feeder roots (root lesion nematode), swells or galls on feeder roots (root knot nematode).",
    portugese: "Lesões de cor marrom-avermelhada em raízes alimentadoras (nematóide de lesão radicular), inchaços ou galhas em raízes alimentadoras (nematóide de galha radicular)."
  },
  {
    english: "Uneven plant growth",
    portugese: "Crescimento desigual da planta."
  },
  {
    english: "Symptoms 1",
    portugese: "Sintomas 1"
  },
  {
    english: "Symptoms 2",
    portugese: "Sintomas 2"
  },
  {
    english: "Symptoms 3",
    portugese: "Sintomas 3"
  },
  {
    english: "Symptoms 4",
    portugese: "Sintomas 4"
  },
  {
    english: "The infected branches should be cut and removed and the cut end pasted with Bordeaux mixture 1%",
    portugese: "Os galhos infectados devem ser cortados e removidos e a extremidade cortada deve ser colada com uma mistura de Bordeaux a 1%."
  },
  {
    english: "Two types of blights are noticed in nutmeg. The first is a white thread blight wherein fine white hyphae aggregate to form fungal threads that traverse along the stem underneath the leaves in a fan shaped or irregular manner causing blight in the affected portions.",
    portugese: "Dois tipos de murchamentos são observados no noz-moscada. O primeiro é um murchamento de fio branco, no qual finas hifas brancas se agregam para formar fios fúngicos que percorrem o caule sob as folhas em forma de leque ou de maneira irregular, causando murchamento nas porções afetadas."
  },
  {
    english: "The second type of blight is called horse hair blight. Fine black silky threads of the fungus form an irregular, loose network on the stems and leaves.",
    portugese: "O segundo tipo de murchamento é chamado de murchamento de cabelo de cavalo. Finos fios de seda preta do fungo formam uma rede irregular e solta nos caules e folhas."
  },
  {
    english: "These strands cause blight of leaves and stems. However, these threads hold up the detached, dried leaves on the tree, giving the appearance of a birds nest, when viewed from a distance.",
    portugese: "Esses fios causam murchamento das folhas e dos caules. No entanto, esses fios seguram as folhas secas destacadas na árvore, dando a aparência de um ninho de pássaros, quando visto de longe."
  },
  {
    english: "Immature fruit split, fruit rot and fruit drop are serious in a majority of nutmeg, Immature fruit splitting and shedding are noticed in some trees without any apparent infection.",
    portugese: "A divisão de frutos imaturos, a podridão dos frutos e a queda de frutos são graves na maioria das noz-moscada. A divisão e a queda de frutos imaturos são observadas em algumas árvores sem nenhuma infecção aparente."
  },
  {
    english: "In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discoloration of the rind resulting in rotting.",
    portugese: "No caso da podridão dos frutos, a infecção começa no pedicelo como lesões escuras e gradualmente se espalha para o fruto, causando descoloração marrom da casca resultando em apodrecimento."
  },
  {
    english: "In advanced stages, the mace also rots emitting a foul smell. Phytophthora sp. And Diplodia natalensis have been isolated from affected fruits.",
    portugese: "Em estágios avançados, a macis também apodrece emitindo um cheiro ruim. Phytophthora sp. E Diplodia natalensis foram isolados de frutos afetados."
  },
  {
    english: "In advanced stages the necrotic spots become brittle and fall off resulting in shot holes.",
    portugese: "Em estágios avançados, as manchas necróticas tornam-se quebradiças e caem, resultando em buracos de tiro."
  },
  {
    english: "Water soaked lesions on leaves",
    portugese: "Lesões encharcadas de água nas folhas"
  },
  {
    english: "Entire bush appears burnt",
    portugese: "O arbusto inteiro parece queimado"
  },
  {
    english: "Blackish brownish coloration of leaf sheath",
    portugese: "Coloração acastanhada negra da bainha foliar"
  },
  {
    english: "Small, dark brown to black lesions on cotyledons; oval or eye-shaped lesions on stems which turn sunken and brown with purple to red margins",
    portugese: "Pequenas lesões de cor marrom escura a preta nos cotilédones; lesões ovais ou em forma de olho nos caules que se tornam afundadas e marrons com margens roxas a vermelhas"
  },
  {
    english: "Stems may break if cankers weaken stem; pods drying and shrinking above areas of visible symptoms",
    portugese: "Os caules podem quebrar se os cancros enfraquecerem o caule; vagens secando e encolhendo acima das áreas de sintomas visíveis"
  },
  {
    english: "Reddish brown spots on pods which become circular and sunken with rust colored margin",
    portugese: "Manchas marrons avermelhadas em vagens que se tornam circulares e afundadas com margem de cor ferrugem"
  },
  {
    english: "The leaves of the affected plants become yellowish in color, then drop and finally the whole plant dries out",
    portugese: "As folhas das plantas afetadas tornam-se amareladas, depois caem e, finalmente, toda a planta seca"
  },
  {
    english: "Blackened tissue at the base of stem",
    portugese: "Tecido enegrecido na base do caule"
  },
  {
    english: "Symptoms may be present on only one side of the plant",
    portugese: "Os sintomas podem estar presentes apenas em um lado da planta"
  },
  {
    english: "Caused by fungus, it occurs in young seedlings and grown-up plants",
    portugese: "Causado por fungos, ocorre em plântulas jovens e plantas adultas"
  },
  {
    english: "Affected plants show formation of dark brown lesions on the stem near soil surface",
    portugese: "As plantas afetadas mostram a formação de lesões marrom escuro no caule próximo à superfície do solo"
  },
  {
    english: "Plants dry prematurely, particularly when they face drought stress",
    portugese: "As plantas secam prematuramente, especialmente quando enfrentam estresse hídrico"
  },
  {
    english: "It is transmitted by eriophyid mites from one plant to another",
    portugese: "É transmitida por ácaros eriofídeos de uma planta para outra"
  },
  {
    english: "Affected plant becomes pale green and reduces leaf size. No flowering and deformity",
    portugese: "A planta afetada torna-se verde pálido e reduz o tamanho das folhas. Sem floração e deformidade"
  },
  {
    english: "Affected plants remain stunted and branch profusely, as a result of which they appear bushy. No flowers and fruits are borne on such affected plants resulting in total loss of yield",
    portugese: "As plantas afetadas permanecem atrofiadas e ramificam-se profusamente, resultando em um aspecto arbustivo. Nenhuma flor e fruto são produzidos em tais plantas afetadas, resultando em perda total de rendimento"
  },
  {
    english: "Symptoms appear on all aerial parts of plants as small, circular, necrotic spots that develop quickly, forming typical concentric rings",
    portugese: "Os sintomas aparecem em todas as partes aéreas das plantas como pequenas manchas necróticas, circulares, que se desenvolvem rapidamente, formando anéis concêntricos típicos"
  },
  {
    english: "Water-soaked, circular to irregular spots occur. The center of the spot is straw-colored with raised reddish-brown margins",
    portugese: "Manchas encharcadas de água, circulares a irregulares, ocorrem. O centro da mancha é de cor palha com margens avermelhado-marrom levantadas"
  },
  {
    english: "The spots are initially light brown and later turn dark brown. In severe infection, defoliation and drying of infected leaves, branches, and flower buds",
    portugese: "As manchas são inicialmente de cor marrom clara e depois se tornam marrom escuras. Em infecções graves, desfolha e secagem de folhas, ramos e botões de flores infectados"
  },
  {
    english: "The disease first appears in the form of yellow, diffused spots scattered on the leaf lamina; such spots slowly expand and in later stages",
    portugese: "A doença aparece primeiro na forma de manchas amarelas difusas espalhadas na lâmina foliar; tais manchas se expandem lentamente e em estágios posteriores"
  },
  {
    english: "Yellow patches alternated with green patches developed on the leaves",
    portugese: "Manchas amarelas alternadas com manchas verdes desenvolvidas nas folhas"
  },
  {
    english: "Such spots slowly expand and in later stages of disease development, affected leaflets show broad, yellow patches alternating with green color",
    portugese: "Essas manchas se expandem lentamente e, em estágios posteriores do desenvolvimento da doença, folíolos afetados mostram amplas manchas amarelas alternando com a cor verde"
  },
  {
    english: "The powdery mildew symptoms appear mostly on older leaves, however, in severe cases even young buds and pods also get infected",
    portugese: "Os sintomas do míldio pulverulento aparecem principalmente nas folhas mais velhas, no entanto, em casos graves, até mesmo botões jovens e vagens também são infectados"
  },
  {
    english: "Symptoms appear as dull red spots, limited by veins, appear on the upper surface of leaves and later white powdery patches develop on both surfaces",
    portugese: "Os sintomas aparecem como manchas vermelhas opacas, limitadas pelas veias, aparecem na superfície superior das folhas e depois manchas brancas pulverulentas se desenvolvem em ambas as superfícies"
  },
  {
    english: "Entire lower leaf surface gets covered with powdery growth, leading to defoliation. The disease is also known to cause stunting of young plants and significantly reduces nodulation",
    portugese: "Toda a superfície inferior da folha fica coberta com crescimento pulverulento, levando à desfolha. A doença também é conhecida por causar atrofiamento das plantas jovens e reduzir significativamente a nodulação"
  },
  {
    english: "Phytophthora blight resembles damping off disease as the seedlings die suddenly",
    portugese: "A requeima de Phytophthora se assemelha à doença de tombamento, pois as mudas morrem repentinamente"
  },
  {
    english: "Infected plants have water-soaked lesions on their leaves",
    portugese: "Plantas infectadas têm lesões encharcadas de água em suas folhas"
  },
  {
    english: "Brown to black, slightly sunken lesions on their stems and petioles",
    portugese: "Lesões de marrom a preto, ligeiramente afundadas, em seus caules e pecíolos"
  },
  {
    english: "Lesions girdle the main stems or branches which break at this point",
    portugese: "Lesões circundam os caules principais ou galhos que se quebram neste ponto"
  },
  {
    english: "Causing several types of spots on the leaves and petioles of affected plants",
    portugese: "Causando vários tipos de manchas nas folhas e pecíolos das plantas afetadas"
  },
  {
    english: "The spots are triangular in outline and are raised above the surface of the leaf; very rarely, the upper surface is infected",
    portugese: "As manchas são triangulares no contorno e se elevam acima da superfície da folha; muito raramente, a superfície superior é infectada"
  },
  {
    english: "Infected leaves start drying, and in severe cases, defoliation may take place",
    portugese: "Folhas infectadas começam a secar, e em casos graves, pode ocorrer desfolha"
  },
  {
    english: "Sowing/Land Preparation Report",
    portugese: "Relatório de Semeadura/Preparação do Solo"
  },
  {
    english: "Pest and Disease Management Report",
    portugese: "Relatório de Manejo de Pragas e Doenças"
  },
  {
    english: "Brown rice",
    portugese: "Arroz integral"
  },
  {
    english: "MyIrrigationWaterSources",
    portugese: "Minhas Fontes de Água de Irrigação"
  },
  {
    english: "Bollworm",
    portugese: "Lagarta-da-maçã"
  },
  {
    english: "Mites",
    portugese: "Ácaros"
  },
  {
    english: "Caterpillars",
    portugese: "Lagartas"
  },
  {
    english: "Weevils",
    portugese: "Gorgulhos"
  },
  {
    english: "Cutworm",
    portugese: "Lagarta-rosca"
  },
  {
    english: "Locusts",
    portugese: "Gafanhotos"
  },
  {
    english: "Birds",
    portugese: "Pássaros"
  },
  {
    english: "Stalk borers",
    portugese: "Brocas de caule"
  },
  {
    english: "Moth",
    portugese: "Mariposa"
  },
  {
    english: "Stink bugs",
    portugese: "Percevejos"
  },
  {
    english: "Potato beetle",
    portugese: "Besouro-da-batata"
  },
  {
    english: "Corn root worm",
    portugese: "Larva-da-raiz-do-milho"
  },
  {
    english: "Mormon crickets",
    portugese: "Grilos Mórmons"
  },
  {
    english: "Japanese Beetle",
    portugese: "Besouro Japonês"
  },
  {
    english: "Fruitfly",
    portugese: "Mosca-da-fruta"
  },
  {
    english: "Leaf Webber",
    portugese: "Aranhiço-da-folha"
  },
  {
    english: "Midge",
    portugese: "Mosca-das-galhas"
  },
  {
    english: "San-Jose-scale",
    portugese: "Cochonilha-de-San-José"
  },
  {
    english: "Capsule Borer",
    portugese: "Broca da cápsula"
  },
  {
    english: "Creal rust mite adults",
    portugese: "Ácaro-da-ferrugem-do-cereal adultos"
  },
  {
    english: "Bihar hair caterpillar",
    portugese: "Lagarta cabeluda de Bihar"
  },
  {
    english: "Cabbage butterfly",
    portugese: "Borboleta da couve"
  },
  {
    english: "Painted bug",
    portugese: "Percevejo pintado"
  },
  {
    english: "Bihar hairy caterpillar",
    portugese: "Lagarta cabeluda de Bihar"
  },
  {
    english: "Red spider mites",
    portugese: "Ácaros vermelhos"
  },
  {
    english: "Bulb mite",
    portugese: "Ácaro do bulbo"
  },
  {
    english: "False Chinch Bug",
    portugese: "Percevejo-falso"
  },
  {
    english: "Alfalfa Caterpillar",
    portugese: "Lagarta da alfafa"
  },
  {
    english: "Blister Beetles",
    portugese: "Besouros vesicantes"
  },
  {
    english: "Clover Root Curculio",
    portugese: "Curculio da raiz do trevo"
  },
  {
    english: "Grasshoppers",
    portugese: "Gafanhotos"
  },
  {
    english: "Grey Weevil",
    portugese: "Gorgulho cinza"
  },
  {
    english: "Greenflies",
    portugese: "Moscas verdes"
  },
  {
    english: "Brown citrus aphid",
    portugese: "Pulgão marrom dos citros"
  },
  {
    english: "Citrus leaf miner",
    portugese: "Minador das folhas de citros"
  },
  {
    english: "Citricolla scale or soft scales",
    portugese: "Cochonilha citricola ou cochonilhas moles"
  },
  {
    english: "Asian citrus psyllid",
    portugese: "Psilídeo asiático dos citros"
  },
  {
    english: "Garlic cutworm",
    portugese: "Lagarta-rosca do alho"
  },
  {
    english: "Rhinoceros beetle",
    portugese: "Besouro-rinoceronte"
  },
  {
    english: "Cabbage diamondback moth",
    portugese: "Mariposa da couve"
  },
  {
    english: "Cabbage borer",
    portugese: "Broca da couve"
  },
  {
    english: "Bugs",
    portugese: "Insetos"
  },
  {
    english: "Mole cricket and ground cricket",
    portugese: "Grilo-toupeira e grilo de solo"
  },
  {
    english: "Hairy caterpillar",
    portugese: "Lagarta cabeluda"
  },
  {
    english: "Aphid",
    portugese: "Pulgão"
  },
  {
    english: "Diamondback moth",
    portugese: "Traça-da-couve"
  },
  {
    english: "Cauliflower butterfly",
    portugese: "Borboleta da couve-flor"
  },
  {
    english: "Gram Pod Borer/ Capsule Borer",
    portugese: "Broca da vagem/ Broca da cápsula"
  },
  {
    english: "Caterpillar",
    portugese: "Lagarta"
  },
  {
    english: "Bud Fly/ Capsule Fly",
    portugese: "Mosca do botão/ Mosca da cápsula"
  },
  {
    english: "American Boll Worm",
    portugese: "Lagarta-da-maçã americana"
  },
  {
    english: "Spotted Boll Worm",
    portugese: "Lagarta-da-maçã pintada"
  },
  {
    english: "Pink Boll Worm",
    portugese: "Lagarta-da-maçã rosa"
  },
  {
    english: "Jassid",
    portugese: "Cigarrinha"
  },
  {
    english: "Stinkbugs",
    portugese: "Percevejos"
  },
  {
    english: "Leaf eating caterpillar",
    portugese: "Lagarta comedora de folhas"
  },
  {
    english: "Serpentine Leaf Miner",
    portugese: "Minador serpentina"
  },
  {
    english: "Pinworm",
    portugese: "Traça-do-tomateiro"
  },
  {
    english: "Top Shoot Borer",
    portugese: "Broca do broto"
  },
  {
    english: "Leaf Gall Thrips",
    portugese: "Tripes da galha da folha"
  },
  {
    english: "Leaf Miner Flies",
    portugese: "Moscas minadoras de folhas"
  },
  {
    english: "Shoot and Capsule Bore",
    portugese: "Broca do caule e cápsula"
  },
  {
    english: "Green Mite",
    portugese: "Ácaro verde"
  },
  {
    english: "Variegated Cricket",
    portugese: "Grilo variegado"
  },
  {
    english: "Shoot Bug",
    portugese: "Percevejo do broto"
  },
  {
    english: "Shootfly",
    portugese: "Mosca-da-brotação"
  },
  {
    english: "Sorghum Cutworm",
    portugese: "Lagarta-rosca do sorgo"
  },
  {
    english: "Sorghum Midge",
    portugese: "Mosca-do-sorgo"
  },
  {
    english: "Green Peach Aphid",
    portugese: "Pulgão-verde-do-pêssego"
  },
  {
    english: "Ground Beetles",
    portugese: "Besouros de solo"
  },
  {
    english: "Root Knot Nematode",
    portugese: "Nematóide das galhas"
  },
  {
    english: "Shoot borer",
    portugese: "Broca do broto"
  },
  {
    english: "Rhizome flies",
    portugese: "Moscas do rizoma"
  },
  {
    english: "Rhizome scales",
    portugese: "Cochonilhas do rizoma"
  },
  {
    english: "Grape Berry Moth",
    portugese: "Traça da uva"
  },
  {
    english: "Grape Thrips",
    portugese: "Tripes da uva"
  },
  {
    english: "Grape Leaf Miner Flies",
    portugese: "Moscas minadoras das folhas da uva"
  },
  {
    english: "Grape Mealy Bugs",
    portugese: "Cochonilhas farináceas da uva"
  },
  {
    english: "Grape Stem borer",
    portugese: "Broca do caule da uva"
  },
  {
    english: "Red pumpkin beetle",
    portugese: "Besouro vermelho da abóbora"
  },
  {
    english: "Cucumber Beetle",
    portugese: "Besouro do pepino"
  },
  {
    english: "Some Pest",
    portugese: "Alguma praga"
  },
  {
    english: "Blueberry flea beetle",
    portugese: "Besouro-pulga do mirtilo"
  },
  {
    english: "Sharpnosed leafhopper",
    portugese: "Cigarrinha de nariz afiado"
  },
  {
    english: "Butterfly",
    portugese: "Borboleta"
  },
  {
    english: "Leaf Roller",
    portugese: "Enrolador de folhas"
  },
  {
    english: "Cyyclamen Mite",
    portugese: "Ácaro do ciclâmen"
  },
  {
    english: "Potato Leafhopper",
    portugese: "Cigarrinha da batata"
  },
  {
    english: "Root Weevil",
    portugese: "Gorgulho da raiz"
  },
  {
    english: "Spittle Bugs",
    portugese: "Cigarrinhas-espumosas"
  },
  {
    english: "Strawberry Clipper (Bud) Weevil",
    portugese: "Gorgulho do morango"
  },
  {
    english: "Tarnished Plant Bug",
    portugese: "Percevejo manchado"
  },
  {
    english: "Two - Spotted Mite",
    portugese: "Ácaro de duas manchas"
  },
  {
    english: "Western Flower Thrips",
    portugese: "Tripes da flor ocidental"
  },
  {
    english: "White Grubs (Japanese Beetle)",
    portugese: "Larvas brancas (Besouro japonês)"
  },
  {
    english: "Cutworms and Armyworms",
    portugese: "Lagartas e lagartas militares"
  },
  {
    english: "New Pest",
    portugese: "Nova praga"
  },
  {
    english: "New Pest 2",
    portugese: "Nova praga 2"
  },
  {
    english: "Pod Fly",
    portugese: "Mosca da vagem"
  },
  {
    english: "Plume Moth",
    portugese: "Mariposa da pluma"
  },
  {
    english: "Typica (Bergandal, Sidikalang - Sumatera)",
    portugese: "Typica (Bergandal, Sidikalang - Sumatra)"
  },
  {
    english: "Jawa (Java Coffee, 1700AD)",
    portugese: "Jawa (Café Java, 1700AD)"
  },
  {
    english: "Arabusta (HDT; Hybrid of sterile Arabica and C. Robusta)",
    portugese: "Arabusta (HDT; Híbrido de Arábica estéril e C. Robusta)"
  },
  {
    english: "Catimor Lines (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - mix breed arabica-robusta)",
    portugese: "Linhas Catimor (Andungsari, Ateng, Jaluk, Kartika/Catuai/Katai - mistura de Arábica-Robusta)"
  },
  {
    english: "Bourbon Chocol",
    portugese: "Bourbon Chocol"
  },
  {
    english: "Jawa (Java Coffee, 1700 AD)",
    portugese: "Jawa (Café Java, 1700 AD)"
  },
  {
    english: "test fuel",
    portugese: "combustível de teste"
  },
  {
    english: "tesr fuel",
    portugese: "combustível de teste"
  },
  {
    english: "my new fuel",
    portugese: "meu novo combustível"
  },
  {
    english: "test",
    portugese: "teste"
  },
  {
    english: "Bacterial ooze",
    portugese: "Exsudado bacteriano"
  },
  {
    english: "Bacterial streaming",
    portugese: "Transmissão bacteriana"
  },
  {
    english: "Water soaked lesions",
    portugese: "Lesões encharcadas"
  },
  {
    english: "Canker",
    portugese: "Cancro"
  },
  {
    english: "Shepherds crook ends on woody plants",
    portugese: "Extremidades curvas em plantas lenhosas"
  },
  {
    english: "Wildfire of tobacco",
    portugese: "Fogo selvagem do tabaco"
  },
  {
    english: "Blight of beans",
    portugese: "Míldio do feijão"
  },
  {
    english: "Fire blight",
    portugese: "Fogo bacteriano"
  },
  {
    english: "Soft rot",
    portugese: "Podridão mole"
  },
  {
    english: "Aster yellows",
    portugese: "Amarelão do áster"
  },
  {
    english: "Cultural/natural/manual",
    portugese: "Cultural/natural/manual"
  },
  {
    english: "Fungal",
    portugese: "Fúngico"
  },
  {
    english: "Viral",
    portugese: "Viral"
  },
  {
    english: "Bacterial",
    portugese: "Bacteriana"
  },
  {
    english: "Leaf spots",
    portugese: "Manchas nas folhas"
  },
  {
    english: "Bird's eye spot",
    portugese: "Mancha de olho de pássaro"
  },
  {
    english: "Damping off on seedlings",
    portugese: "Tombamento de mudas"
  },
  {
    english: "Apple scab",
    portugese: "Sarna da macieira"
  },
  {
    english: "Fusarium Wilt",
    portugese: "Murcha de Fusarium"
  },
  {
    english: "Club root",
    portugese: "Raiz de couve"
  },
  {
    english: "Maize streak virus",
    portugese: "Vírus do estriado do milho"
  },
  {
    english: "Yellowed leaves",
    portugese: "Folhas amareladas"
  },
  {
    english: "Plant stunting",
    portugese: "Retardo no crescimento das plantas"
  },
  {
    english: "Potato virus",
    portugese: "Vírus da batata"
  },
  {
    english: "Spotted wilt virus",
    portugese: "Vírus da murcha manchada"
  },
  {
    english: "Plum pox virus",
    portugese: "Vírus da varíola da ameixa"
  },
  {
    english: "Yellow leaf curl virus",
    portugese: "Vírus do enrolamento amarelo da folha"
  },
  {
    english: "Seed treatment",
    portugese: "Tratamento de sementes"
  },
  {
    english: "Soil drenching",
    portugese: "Encharcamento do solo"
  },
  {
    english: "Dry, wet foliar spraying",
    portugese: "Pulverização foliar seca e úmida"
  },
  {
    english: "Last test",
    portugese: "Último teste"
  },
  {
    english: "Testing last",
    portugese: "Testando o último"
  },
  {
    english: "Test last one",
    portugese: "Testar o último"
  },
  {
    english: "Testing last last",
    portugese: "Testando o último último"
  },
  {
    english: "Testering",
    portugese: "Testando"
  },
  {
    english: "Testing",
    portugese: "Testando"
  },
  {
    english: "Hello test",
    portugese: "Olá teste"
  },
  {
    english: "New test",
    portugese: "Novo teste"
  },
  {
    english: "Zone",
    portugese: "Zona"
  },
  {
    english: "Paddock",
    portugese: "Piquete"
  },
  {
    english: "Camp",
    portugese: "Campo"
  },
  {
    english: "Pen",
    portugese: "Gaiola"
  },
  {
    english: "Segment",
    portugese: "Segmento"
  },
  {
    english: "Pasture",
    portugese: "Pastagem"
  },
  {
    english: "zero-grazing",
    portugese: "zero pastoreio"
  },
  {
    english: "fenced farming",
    portugese: "agricultura cercada"
  },
  {
    english: "enclosed ranching",
    portugese: "pecuária fechada"
  },
  {
    english: "my way",
    portugese: "meu caminho"
  },
  {
    english: "propping",
    portugese: "sustentação"
  },
  {
    english: "Detrashing",
    portugese: "Descarte"
  },
  {
    english: "Topping",
    portugese: "Cobertura"
  },
  {
    english: "Nipping",
    portugese: "Beliscando"
  },
  {
    english: "Loose Farming",
    portugese: "Agricultura solta"
  },
  {
    english: "Conventional Barn System",
    portugese: "Sistema de celeiro convencional"
  },
  {
    english: "Free Range System",
    portugese: "Sistema de criação ao ar livre"
  },
  {
    english: "semiwashed",
    portugese: "semi-lavado"
  },
  {
    english: "fullwashed",
    portugese: "totalmente lavado"
  },
  {
    english: "Hydro",
    portugese: "Hidro"
  },
  {
    english: "Optimize The Use Of Synthetic",
    portugese: "Otimizar o uso de sintéticos"
  },
  {
    english: "Currency setting saved successfully.",
    portugese: "Configuração de moeda salva com sucesso."
  },
  {
    english: "Afghanistan",
    portugese: "Afeganistão"
  },
  {
    english: "Åland Islands",
    portugese: "Ilhas Åland"
  },
  {
    english: "Albania",
    portugese: "Albânia"
  },
  {
    english: "Algeria",
    portugese: "Argélia"
  },
  {
    english: "American Samoa",
    portugese: "Samoa Americana"
  },
  {
    english: "Andorra",
    portugese: "Andorra"
  },
  {
    english: "Angola",
    portugese: "Angola"
  },
  {
    english: "Anguilla",
    portugese: "Anguila"
  },
  {
    english: "Antarctica",
    portugese: "Antártica"
  },
  {
    english: "Antigua and Barbuda",
    portugese: "Antígua e Barbuda"
  },
  {
    english: "Argentina",
    portugese: "Argentina"
  },
  {
    english: "Armenia",
    portugese: "Armênia"
  },
  {
    english: "Aruba",
    portugese: "Aruba"
  },
  {
    english: "Australia",
    portugese: "Austrália"
  },
  {
    english: "Austria",
    portugese: "Áustria"
  },
  {
    english: "Azerbaijan",
    portugese: "Azerbaijão"
  },
  {
    english: "Bahamas",
    portugese: "Bahamas"
  },
  {
    english: "Bahrain",
    portugese: "Bahrein"
  },
  {
    english: "Bangladesh",
    portugese: "Bangladesh"
  },
  {
    english: "Barbados",
    portugese: "Barbados"
  },
  {
    english: "Belarus",
    portugese: "Bielorrússia"
  },
  {
    english: "Belgium",
    portugese: "Bélgica"
  },
  {
    english: "Belize",
    portugese: "Belize"
  },
  {
    english: "Benin",
    portugese: "Benim"
  },
  {
    english: "Bermuda",
    portugese: "Bermudas"
  },
  {
    english: "Bhutan",
    portugese: "Butão"
  },
  {
    english: "Bolivia",
    portugese: "Bolívia"
  },
  {
    english: "Bosnia and Herzegovina",
    portugese: "Bósnia e Herzegovina"
  },
  {
    english: "Botswana",
    portugese: "Botswana"
  },
  {
    english: "Bouvet Island",
    portugese: "Ilha Bouvet"
  },
  {
    english: "Brazil",
    portugese: "Brasil"
  },
  {
    english: "British Indian Ocean Territory",
    portugese: "Território Britânico do Oceano Índico"
  },
  {
    english: "British Virgin Islands",
    portugese: "Ilhas Virgens Britânicas"
  },
  {
    english: "Brunei",
    portugese: "Brunei"
  },
  {
    english: "Bulgaria",
    portugese: "Bulgária"
  },
  {
    english: "Burkina Faso",
    portugese: "Burkina Faso"
  },
  {
    english: "Burundi",
    portugese: "Burundi"
  },
  {
    english: "Cabo Verde",
    portugese: "Cabo Verde"
  },
  {
    english: "Cambodia",
    portugese: "Camboja"
  },
  {
    english: "Cameroon",
    portugese: "Camarões"
  },
  {
    english: "Canada",
    portugese: "Canadá"
  },
  {
    english: "Caribbean Netherlands",
    portugese: "Caribe Neerlandês"
  },
  {
    english: "Cayman Islands",
    portugese: "Ilhas Cayman"
  },
  {
    english: "Central African Republic",
    portugese: "República Centro-Africana"
  },
  {
    english: "Chad",
    portugese: "Chade"
  },
  {
    english: "Chile",
    portugese: "Chile"
  },
  {
    english: "Christmas Island",
    portugese: "Ilha do Natal"
  },
  {
    english: "Cocos (Keeling) Islands",
    portugese: "Ilhas Cocos (Keeling)"
  },
  {
    english: "Comoros",
    portugese: "Comores"
  },
  {
    english: "Congo Republic",
    portugese: "República do Congo"
  },
  {
    english: "Cook Islands",
    portugese: "Ilhas Cook"
  },
  {
    english: "Costa Rica",
    portugese: "Costa Rica"
  },
  {
    english: "Croatia",
    portugese: "Croácia"
  },
  {
    english: "Cuba",
    portugese: "Cuba"
  },
  {
    english: "Curaçao",
    portugese: "Curaçao"
  },
  {
    english: "Cyprus",
    portugese: "Chipre"
  },
  {
    english: "Czechia",
    portugese: "Tchéquia"
  },
  {
    english: "Denmark",
    portugese: "Dinamarca"
  },
  {
    english: "Djibouti",
    portugese: "Djibuti"
  },
  {
    english: "Dominica",
    portugese: "Dominica"
  },
  {
    english: "Dominican Republic",
    portugese: "República Dominicana"
  },
  {
    english: "DR Congo",
    portugese: "República Democrática do Congo"
  },
  {
    english: "Ecuador",
    portugese: "Equador"
  },
  {
    english: "Egypt",
    portugese: "Egito"
  },
  {
    english: "El Salvador",
    portugese: "El Salvador"
  },
  {
    english: "Equatorial Guinea",
    portugese: "Guiné Equatorial"
  },
  {
    english: "Eritrea",
    portugese: "Eritreia"
  },
  {
    english: "Estonia",
    portugese: "Estônia"
  },
  {
    english: "Eswatini",
    portugese: "Essuatíni"
  },
  {
    english: "Ethiopia",
    portugese: "Etiópia"
  },
  {
    english: "Falkland Islands",
    portugese: "Ilhas Falkland"
  },
  {
    english: "Faroe Islands",
    portugese: "Ilhas Faroe"
  },
  {
    english: "Fiji",
    portugese: "Fiji"
  },
  {
    english: "Finland",
    portugese: "Finlândia"
  },
  {
    english: "France",
    portugese: "França"
  },
  {
    english: "French Guiana",
    portugese: "Guiana Francesa"
  },
  {
    english: "French Polynesia",
    portugese: "Polinésia Francesa"
  },
  {
    english: "French Southern Territories",
    portugese: "Territórios Franceses do Sul"
  },
  {
    english: "Gabon",
    portugese: "Gabão"
  },
  {
    english: "Gambia",
    portugese: "Gâmbia"
  },
  {
    english: "Georgia",
    portugese: "Geórgia"
  },
  {
    english: "Germany",
    portugese: "Alemanha"
  },
  {
    english: "Ghana",
    portugese: "Gana"
  },
  {
    english: "Gibraltar",
    portugese: "Gibraltar"
  },
  {
    english: "Greece",
    portugese: "Grécia"
  },
  {
    english: "Greenland",
    portugese: "Gronelândia"
  },
  {
    english: "Grenada",
    portugese: "Granada"
  },
  {
    english: "Guadeloupe",
    portugese: "Guadalupe"
  },
  {
    english: "Guam",
    portugese: "Guam"
  },
  {
    english: "Guernsey",
    portugese: "Guernsey"
  },
  {
    english: "Guinea",
    portugese: "Guiné"
  },
  {
    english: "Guinea-Bissau",
    portugese: "Guiné-Bissau"
  },
  {
    english: "Guyana",
    portugese: "Guiana"
  },
  {
    english: "Haiti",
    portugese: "Haiti"
  },
  {
    english: "Heard Island and McDonald Islands",
    portugese: "Ilha Heard e Ilhas McDonald"
  },
  {
    english: "Honduras",
    portugese: "Honduras"
  },
  {
    english: "Hong Kong",
    portugese: "Hong Kong"
  },
  {
    english: "Hungary",
    portugese: "Hungria"
  },
  {
    english: "Iceland",
    portugese: "Islândia"
  },
  {
    english: "Indonesia",
    portugese: "Indonésia"
  },
  {
    english: "Iran",
    portugese: "Irã"
  },
  {
    english: "Iraq",
    portugese: "Iraque"
  },
  {
    english: "Ireland",
    portugese: "Irlanda"
  },
  {
    english: "Isle of Man",
    portugese: "Ilha de Man"
  },
  {
    english: "Italy",
    portugese: "Itália"
  },
  {
    english: "Ivory Coast",
    portugese: "Costa do Marfim"
  },
  {
    english: "Jamaica",
    portugese: "Jamaica"
  },
  {
    english: "Japan",
    portugese: "Japão"
  },
  {
    english: "Jersey",
    portugese: "Jersey"
  },
  {
    english: "Jordan",
    portugese: "Jordânia"
  },
  {
    english: "Kazakhstan",
    portugese: "Cazaquistão"
  },
  {
    english: "Kenya",
    portugese: "Quênia"
  },
  {
    english: "Kiribati",
    portugese: "Kiribati"
  },
  {
    english: "Kosovo",
    portugese: "Kosovo"
  },
  {
    english: "Kuwait",
    portugese: "Kuwait"
  },
  {
    english: "Kyrgyzstan",
    portugese: "Quirguistão"
  },
  {
    english: "Laos",
    portugese: "Laos"
  },
  {
    english: "Latvia",
    portugese: "Letônia"
  },
  {
    english: "Lebanon",
    portugese: "Líbano"
  },
  {
    english: "Lesotho",
    portugese: "Lesoto"
  },
  {
    english: "Liberia",
    portugese: "Libéria"
  },
  {
    english: "Libya",
    portugese: "Líbia"
  },
  {
    english: "Liechtenstein",
    portugese: "Liechtenstein"
  },
  {
    english: "Lithuania",
    portugese: "Lituânia"
  },
  {
    english: "Luxembourg",
    portugese: "Luxemburgo"
  },
  {
    english: "Macao",
    portugese: "Macau"
  },
  {
    english: "Madagascar",
    portugese: "Madagáscar"
  },
  {
    english: "Malawi",
    portugese: "Malawi"
  },
  {
    english: "Malaysia",
    portugese: "Malásia"
  },
  {
    english: "Maldives",
    portugese: "Maldivas"
  },
  {
    english: "Mali",
    portugese: "Mali"
  },
  {
    english: "Malta",
    portugese: "Malta"
  },
  {
    english: "Marshall Islands",
    portugese: "Ilhas Marshall"
  },
  {
    english: "Martinique",
    portugese: "Martinica"
  },
  {
    english: "Mauritania",
    portugese: "Mauritânia"
  },
  {
    english: "Mauritius",
    portugese: "Maurício"
  },
  {
    english: "Mayotte",
    portugese: "Mayotte"
  },
  {
    english: "Mexico",
    portugese: "México"
  },
  {
    english: "Micronesia",
    portugese: "Micronésia"
  },
  {
    english: "Moldova",
    portugese: "Moldávia"
  },
  {
    english: "Monaco",
    portugese: "Mônaco"
  },
  {
    english: "Mongolia",
    portugese: "Mongólia"
  },
  {
    english: "Montenegro",
    portugese: "Montenegro"
  },
  {
    english: "Montserrat",
    portugese: "Montserrat"
  },
  {
    english: "Morocco",
    portugese: "Marrocos"
  },
  {
    english: "Mozambique",
    portugese: "Moçambique"
  },
  {
    english: "Myanmar",
    portugese: "Mianmar"
  },
  {
    english: "Namibia",
    portugese: "Namíbia"
  },
  {
    english: "Nauru",
    portugese: "Nauru"
  },
  {
    english: "Netherlands",
    portugese: "Países Baixos"
  },
  {
    english: "Netherlands Antilles",
    portugese: "Antilhas Neerlandesas"
  },
  {
    english: "New Caledonia",
    portugese: "Nova Caledônia"
  },
  {
    english: 'New Zealand',
    portugese: 'Nova Zelândia'
  },
  {
    english: 'Nicaragua',
    portugese: 'Nicarágua'
  },
  {
    english: 'Niger',
    portugese: 'Níger'
  },
  {
    english: 'Nigeria',
    portugese: 'Nigéria'
  },
  {
    english: 'Niue',
    portugese: 'Niue'
  },
  {
    english: 'Norfolk Island',
    portugese: 'Ilha Norfolk'
  },
  {
    english: 'North Korea',
    portugese: 'Coreia do Norte'
  },
  {
    english: 'North Macedonia',
    portugese: 'Macedônia do Norte'
  },
  {
    english: 'Northern Mariana Islands',
    portugese: 'Ilhas Marianas do Norte'
  },
  {
    english: 'Norway',
    portugese: 'Noruega'
  },
  {
    english: 'Oman',
    portugese: 'Omã'
  },
  {
    english: 'Pakistan',
    portugese: 'Paquistão'
  },
  {
    english: 'Palau',
    portugese: 'Palau'
  },
  {
    english: 'Palestine',
    portugese: 'Palestina'
  },
  {
    english: 'Panama',
    portugese: 'Panamá'
  },
  {
    english: 'Papua New Guinea',
    portugese: 'Papua-Nova Guiné'
  },
  {
    english: 'Paraguay',
    portugese: 'Paraguai'
  },
  {
    english: 'Peru',
    portugese: 'Peru'
  },
  {
    english: 'Philippines',
    portugese: 'Filipinas'
  },
  {
    english: 'Pitcairn Islands',
    portugese: 'Ilhas Pitcairn'
  },
  {
    english: 'Poland',
    portugese: 'Polônia'
  },
  {
    english: 'Portugal',
    portugese: 'Portugal'
  },
  {
    english: 'Puerto Rico',
    portugese: 'Porto Rico'
  },
  {
    english: 'Qatar',
    portugese: 'Catar'
  },
  {
    english: 'Réunion',
    portugese: 'Reunião'
  },
  {
    english: 'Romania',
    portugese: 'Romênia'
  },
  {
    english: 'Russia',
    portugese: 'Rússia'
  },
  {
    english: 'Rwanda',
    portugese: 'Ruanda'
  },
  {
    english: 'Saint Barthélemy',
    portugese: 'São Bartolomeu'
  },
  {
    english: 'Saint Helena',
    portugese: 'Santa Helena'
  },
  {
    english: 'Saint Kitts and Nevis',
    portugese: 'São Cristóvão e Nevis'
  },
  {
    english: 'Saint Lucia',
    portugese: 'Santa Lúcia'
  },
  {
    english: 'Saint Martin',
    portugese: 'São Martinho'
  },
  {
    english: 'Saint Pierre and Miquelon',
    portugese: 'Saint Pierre e Miquelon'
  },
  {
    english: 'Saint Vincent and the Grenadines',
    portugese: 'São Vicente e Granadinas'
  },
  {
    english: 'Samoa',
    portugese: 'Samoa'
  },
  {
    english: 'San Marino',
    portugese: 'San Marino'
  },
  {
    english: 'São Tomé and Príncipe',
    portugese: 'São Tomé e Príncipe'
  },
  {
    english: 'Saudi Arabia',
    portugese: 'Arábia Saudita'
  },
  {
    english: 'Senegal',
    portugese: 'Senegal'
  },
  {
    english: 'Serbia',
    portugese: 'Sérvia'
  },
  {
    english: 'Seychelles',
    portugese: 'Seychelles'
  },
  {
    english: 'Sierra Leone',
    portugese: 'Serra Leoa'
  },
  {
    english: 'Singapore',
    portugese: 'Singapura'
  },
  {
    english: 'Sint Maarten',
    portugese: 'São Martinho (Países Baixos)'
  },
  {
    english: 'Slovakia',
    portugese: 'Eslováquia'
  },
  {
    english: 'Slovenia',
    portugese: 'Eslovênia'
  },
  {
    english: 'Solomon Islands',
    portugese: 'Ilhas Salomão'
  },
  {
    english: 'Somalia',
    portugese: 'Somália'
  },
  {
    english: 'South Africa',
    portugese: 'África do Sul'
  },
  {
    english: "South Georgia and South Sandwich Islands",
    portugese: "Ilhas Geórgia do Sul e Sandwich do Sul"
  },
  {
    english: "South Korea",
    portugese: "Coreia do Sul"
  },
  {
    english: "South Sudan",
    portugese: "Sudão do Sul"
  },
  {
    english: "Spain",
    portugese: "Espanha"
  },
  {
    english: "Sri Lanka",
    portugese: "Sri Lanka"
  },
  {
    english: "Sudan",
    portugese: "Sudão"
  },
  {
    english: "Suriname",
    portugese: "Suriname"
  },
  {
    english: "Svalbard and Jan Mayen",
    portugese: "Svalbard e Jan Mayen"
  },
  {
    english: "Sweden",
    portugese: "Suécia"
  },
  {
    english: "Switzerland",
    portugese: "Suíça"
  },
  {
    english: "Syria",
    portugese: "Síria"
  },
  {
    english: "Taiwan",
    portugese: "Taiwan"
  },
  {
    english: "Tajikistan",
    portugese: "Tajiquistão"
  },
  {
    english: "Tanzania",
    portugese: "Tanzânia"
  },
  {
    english: "Thailand",
    portugese: "Tailândia"
  },
  {
    english: "Timor-Leste",
    portugese: "Timor-Leste"
  },
  {
    english: "Togo",
    portugese: "Togo"
  },
  {
    english: "Tokelau",
    portugese: "Tokelau"
  },
  {
    english: "Tonga",
    portugese: "Tonga"
  },
  {
    english: "Trinidad and Tobago",
    portugese: "Trindade e Tobago"
  },
  {
    english: "Tunisia",
    portugese: "Tunísia"
  },
  {
    english: "Turkey",
    portugese: "Turquia"
  },
  {
    english: "Turkmenistan",
    portugese: "Turcomenistão"
  },
  {
    english: "Turks and Caicos Islands",
    portugese: "Ilhas Turks e Caicos"
  },
  {
    english: "Tuvalu",
    portugese: "Tuvalu"
  },
  {
    english: "U.S. Minor Outlying Islands",
    portugese: "Ilhas Menores Distantes dos Estados Unidos"
  },
  {
    english: "U.S. Virgin Islands",
    portugese: "Ilhas Virgens Americanas"
  },
  {
    english: "Ukraine",
    portugese: "Ucrânia"
  },
  {
    english: "United Arab Emirates",
    portugese: "Emirados Árabes Unidos"
  },
  {
    english: "United Kingdom",
    portugese: "Reino Unido"
  },
  {
    english: "United States of America",
    portugese: "Estados Unidos da América"
  },
  {
    english: "Uruguay",
    portugese: "Uruguai"
  },
  {
    english: "Uzbekistan",
    portugese: "Uzbequistão"
  },
  {
    english: "Vanuatu",
    portugese: "Vanuatu"
  },
  {
    english: "Vatican City",
    portugese: "Cidade do Vaticano"
  },
  {
    english: "Venezuela",
    portugese: "Venezuela"
  },
  {
    english: "Vietnam",
    portugese: "Vietnã"
  },
  {
    english: "Wallis and Futuna",
    portugese: "Wallis e Futuna"
  },
  {
    english: "Western Sahara",
    portugese: "Saara Ocidental"
  },
  {
    english: "Yemen",
    portugese: "Iêmen"
  },
  {
    english: "Zambia",
    portugese: "Zâmbia"
  },
  {
    english: "Zimbabwe",
    portugese: "Zimbábue"
  },
  {
    english: "QA Topic",
    portugese: "Tópico de QA"
  },
  {
    english: "Technical Issues",
    portugese: "Questões Técnicas"
  },
  {
    english: "Mungbean ( Brazil )",
    portugese: "Feijão-mungo ( Brasil )"
  },
  {
    english: "Mungbean ( India )",
    portugese: "Feijão-mungo ( Índia )"
  },
  {
    english: "Mungbean ( Ethiopia )",
    portugese: "Feijão-mungo ( Etiópia )"
  },
  {
    english: "Ginger",
    portugese: "Gengibre"
  },
  {
    english: "Tobacco ( Canada )",
    portugese: "Tabaco ( Canadá )"
  },
  {
    english: "Mango",
    portugese: "Manga"
  },
  {
    english: "Cauliflower (India)",
    portugese: "Couve-flor (Índia)"
  },
  {
    english: "Kidney bean (Brazil)",
    portugese: "Feijão Vermelho (Brasil)"
  },
  {
    english: "Kidney bean (India)",
    portugese: "Feijão Vermelho (Índia)"
  },
  {
    english: "Papaya (India)",
    portugese: "Papaia (Índia)"
  },
  {
    english: "Grape",
    portugese: "Uva"
  },
  {
    english: "Mango (India)",
    portugese: "Manga (Índia)"
  },
  {
    english: "Cacao (Colombia)",
    portugese: "Cacau (Colômbia)"
  },
  {
    english: "Cacao (Peru)",
    portugese: "Cacau (Peru)"
  },
  {
    english: "Garlic (India)",
    portugese: "Alho (Índia)"
  },
  {
    english: "Apple (Brazil)",
    portugese: "Maçã (Brasil)"
  },
  {
    english: "Orange",
    portugese: "Laranja"
  },
  {
    english: "Strawberry (India)",
    portugese: "Morango (Índia)"
  },
  {
    english: "Strawberry (Brazil)",
    portugese: "Morango (Brasil)"
  },
  {
    english: "Turmeric (India)",
    portugese: "Cúrcuma (Índia)"
  },
  {
    english: "Papaya (Brazil)",
    portugese: "Papaia (Brasil)"
  },
  {
    english: "Ginger (India)",
    portugese: "Gengibre (Índia)"
  },
  {
    english: "Pearl Millet (India)",
    portugese: "Pérola Milheto (Índia)"
  },
  {
    english: "Broccoli (India)",
    portugese: "Brócolis (Índia)"
  },
  {
    english: "Apple (Nepal)",
    portugese: "Maçã (Nepal)"
  },
  {
    english: "Blueberry (Brazil)",
    portugese: "Mirtilo (Brasil)"
  },
  {
    english: "Oil palm (Colombia)",
    portugese: "Palmeira de Óleo (Colômbia)"
  },
  {
    english: "Rice (Indonesia)",
    portugese: "Arroz (Indonésia)"
  },
  {
    english: "Grape (Libya)",
    portugese: "Uva (Líbia)"
  },
  {
    english: "Sugarcane (Tanzania)",
    portugese: "Cana-de-açúcar (Tanzânia)"
  },
  {
    english: "Alfalfa (Libya)",
    portugese: "Alfafa (Líbia)"
  },
  {
    english: "Grape (Brazil)",
    portugese: "Uva (Brasil)"
  },
  {
    english: "Tobacco (Tanzania)",
    portugese: "Tabaco (Tanzânia)"
  },
  {
    english: "Cacao (Honduras)",
    portugese: "Cacau (Honduras)"
  },
  {
    english: "Rice (Nigeria)",
    portugese: "Arroz (Nigéria)"
  },
  {
    english: "Barley (Libya)",
    portugese: "Cevada (Líbia)"
  },
  {
    english: "Orange (Kenya)",
    portugese: "Laranja (Quênia)"
  },
  {
    english: "litres/hour",
    portugese: "litros/hora"
  },
  {
    english: " litres/second",
    portugese: "litros/segundo"
  },
  {
    english: "Green gram (kenya)",
    portugese: "Grão-de-bico (Quênia)"
  },
  {
    english: "Coffee wilt disease",
    portugese: "Murcha do Café"
  },
  {
    english: "It is a common wilt that results in complete death of coffee trees it infects. This vascular disease is induced by the fungal pathogen known by its (Fusarium xylarioides).",
    portugese: "É uma murcha comum que resulta na morte completa das árvores de café que infecta. Essa doença vascular é induzida pelo patógeno fúngico conhecido pelo seu (Fusarium xylarioides)."
  },
  {
    english: "Due to the nature of coffee wilt disease, coffee plants often exhibit symptoms of disruption to vascular systems. Internal symptoms are disturbances to conduction of water in the plant.",
    portugese: "Devido à natureza da doença do murchamento do café, as plantas de café frequentemente apresentam sintomas de perturbação nos sistemas vasculares. Os sintomas internos são perturbações na condução da água na planta."
  },
  {
    english: "External symptoms include loss of moisture on leaves, discoloration, leaf loss, dieback of the infected region, swelling of trunks, cracks in mature trees and lastly plant death",
    portugese: "Os sintomas externos incluem perda de umidade nas folhas, descoloração, queda de folhas, morte das regiões infectadas, inchaço dos troncos, rachaduras em árvores maduras e, por último, morte da planta"
  },
  {
    english: "Tickets",
    portugese: "Bilhetes"
  },
  {
    english: "Piles",
    portugese: "Pilhas"
  },
  {
    english: "Boxes",
    portugese: "Caixas"
  },
  {
    english: "Orange scab",
    portugese: "Crosta de laranja"
  },
  {
    english: "Citrus tristeza virus",
    portugese: "Vírus da tristeza dos citros"
  },
  {
    english: "Citrus greening",
    portugese: "Amarelecimento dos citros"
  },
  {
    english: "Leaves curling, and leaves and twigs covered in a sticky substance (honeydew) which may be growing sooty mold.",
    portugese: "Folhas enroladas e folhas e galhos cobertos por uma substância pegajosa (melada) que pode estar cultivando mofo fuliginoso."
  },
  {
    english: "Insects are small and soft-bodied and are black in color.",
    portugese: "Os insetos são pequenos, de corpo mole e de cor preta."
  },
  {
    english: "Aphids transmit tristeza virus on citrus.",
    portugese: "Afídios transmitem o vírus da tristeza nos citros."
  },
  {
    english: "Tips of leaves in new growth flushes are twisted, and affected leaves do not expand properly.",
    portugese: "As pontas das folhas em novos brotos de crescimento estão torcidas e as folhas afetadas não se expandem corretamente."
  },
  {
    english: "Trees may show symptoms of citrus greening.",
    portugese: "As árvores podem apresentar sintomas de amarelecimento dos citros."
  },
  {
    english: "The insect is tiny (4 mm in length) and has a mottled brown appearance. The insect feeds at an angle to the plant, which makes it resemble thorns on the plant leaves.",
    portugese: "O inseto é pequeno (4 mm de comprimento) e tem uma aparência marrom manchada. O inseto se alimenta em um ângulo em relação à planta, o que faz com que se assemelhe a espinhos nas folhas da planta."
  },
  {
    english: "Citrus leafminer larvae feed by creating shallow tunnels, or mines, in young leaves of citrus trees.",
    portugese: "As larvas do minador dos citros se alimentam criando túneis rasos ou minas nas folhas jovens das árvores de citros."
  },
  {
    english: "Leaf deformation - twisted or curled appearance.",
    portugese: "Deformação das folhas - aparência torcida ou enrolada."
  },
  {
    english: "White or gray tunnels on the leaf surface, stunted growth, and reduced fruit size.",
    portugese: "Túneis brancos ou cinzas na superfície das folhas, crescimento retardado e tamanho reduzido dos frutos."
  },
  {
    english: "Yellow seedlings,Stem pitting,poor fruit quality",
    portugese: "Mudas amarelas, escurecimento do caule, má qualidade dos frutos"
  },
  {
    english: "Defoliation in early stages, The caterpillar makes holes in pod, insert the head and the rest of the body hanging out. feed from outside on developing seeds. Pods with round holes",
    portugese: "Desfolha nos estágios iniciais, a lagarta faz buracos na vagem, insere a cabeça e o resto do corpo para fora, alimenta-se do exterior das sementes em desenvolvimento. Vagens com buracos redondos."
  },
  {
    english: "Larvae damage leaves, buds, flowers, pods and beans;",
    portugese: "As larvas danificam folhas, botões, flores, vagens e grãos;"
  },
  {
    english: "Eggs are laid singly on both upper and lower leaf surfaces and are initially creamy white but develop a brown-red ring after 24 hours and darken prior to hatching",
    portugese: "Os ovos são depositados individualmente nas superfícies superior e inferior das folhas e são inicialmente branco-cremosos, mas desenvolvem um anel marrom-vermelho após 24 horas e escurecem antes da eclosão."
  },
  {
    english: "They damage flowers causing discoloration and shedding",
    portugese: "Eles danificam as flores causando descoloração e queda"
  },
  {
    english: "Damaged pods have small darkened entry holes on the surface and borers inside",
    portugese: "Vagens danificadas têm pequenos buracos de entrada escurecidos na superfície e brocas no interior"
  },
  {
    english: "Infested pods and flowers are webbed together",
    portugese: "Vagens e flores infestadas são unidas por teias"
  },
  {
    english: "Larvae often found binding leaves together and feeds on the chlorophyll while remaining inside the web",
    portugese: "As larvas frequentemente são encontradas unindo folhas e se alimentando da clorofila enquanto permanecem dentro da teia"
  },
  {
    english: "Leaves rolled up apically and become white and dried up",
    portugese: "Folhas enroladas apicalmente e tornam-se brancas e secas"
  },
  {
    english: "Leaflets are webbed together with silk, and the larva feeds within the web",
    portugese: "Folhetos são unidos por teias de seda, e a larva se alimenta dentro da teia"
  },
  {
    english: "Dark brown encrustation on the pod wall",
    portugese: "Incrustação marrom escura na parede da vagem"
  },
  {
    english: "Deforestation",
    portugese: "Desmatamento"
  },
  {
    english: "Cacao Overview",
    portugese: "Visão Geral do Cacau"
  },
  {
    english: "Deforestation Compliance Reports",
    portugese: "Relatórios de Conformidade com o Desmatamento"
  },
  {
    english: "Compliance Certification",
    portugese: "Certificação de Conformidade"
  },
  {
    english: "Order By",
    portugese: "Ordenar Por"
  },
  {
    english: "button Create Admin Role? above",
    portugese: "botão Criar Função de Administrador? acima"
  },
  {
    english: "Cassava Green Mite (Mononychellus tanajoa)\r\n",
    portugese: "Ácaro-verde da mandioca (Mononychellus tanajoa)"
  },
  {
    english: "Whitefly (Aleurodicus dispersus)\r\n",
    portugese: "Mosca-branca (Aleurodicus dispersus)"
  },
  {
    english: "Coffee Shot hole borer: Xylosandrus compactus\r\n",
    portugese: "Broca do furo de tiro do café: Xylosandrus compactus"
  },
  {
    english: "Cassava Green Mite (Mononychellus tanajoa)\n",
    portugese: "Ácaro-verde da mandioca (Mononychellus tanajoa)"
  },
  {
    english: "Whitefly (Aleurodicus dispersus)\n",
    portugese: "Mosca-branca (Aleurodicus dispersus)"
  },
  {
    english: '?Red spider mite',
    portugese: 'Ácaro vermelho'
  },
  {
    english: 'Cotton Spotted boll worm\n',
    portugese: 'Lagarta enjeitada do algodão'
  },
  {
    english: 'Coffee Shot hole borer\n',
    portugese: 'Broca dos pontinhos no café'
  },
  {
    english: 'Tomato Gram pod borer\n',
    portugese: 'Broca do grão de tomate'
  },
  {
    english: 'Tomato Leaf eating caterpillar\n',
    portugese: 'Lagarta comendo folhas de tomate'
  },
  {
    english: 'Tomato Whitefly\n',
    portugese: 'Mosca branca do tomateiro'
  },
  {
    english: 'Tomato Serpentine leaf miner.\n',
    portugese: 'Minador da folha serpentina do tomate'
  },
  {
    english: 'Leaf webber or roller and capsule borer\n',
    portugese: 'Teceira ou enroladora de folhas e broca de cápsulas'
  },
  {
    english: 'Aphids\n',
    portugese: 'Afídeos'
  },
  {
    english: 'Corn earworm \n',
    portugese: 'Lagarta da espiga do milho'
  },
  {
    english: 'Shield scale\n',
    portugese: 'Escama de escudo'
  },
  {
    english: 'Leaf beetle\n',
    portugese: 'Besouro de folha'
  },
  {
    english: 'African cassava mosaic disease\r\n',
    portugese: 'Doença africana do mosaico da mandioca'
  },
  {
    english: 'African cassava mosaic disease\n',
    portugese: 'Doença africana do mosaico da mandioca'
  },
  {
    english: 'Cotton Black arm\/ Angular leaf spot\n',
    portugese: 'Mancha angular\/ mancha angular da folha do algodão'
  },
  {
    english: 'Cotton Anthracnose \n',
    portugese: 'Antracnose do algodão'
  },
  {
    english: 'Coffee Berry blotch\n',
    portugese: 'Mancha das bagas do café'
  },
  {
    english: 'Coffee cercospora leaf spot\n',
    portugese: 'Mancha foliar de cercospora do café'
  },
  {
    english: 'Tomato Blossom End Rot disease\n',
    portugese: 'Podridão apical do tomate'
  },
  {
    english: 'Tomato leaf curl virus (ToLCV).\n',
    portugese: 'Vírus do enrolamento da folha do tomate (ToLCV)'
  },
  {
    english: 'Tomato Early blight\n',
    portugese: 'Míldio precoce do tomate'
  },
  {
    english: 'Tomato Late blight. \n',
    portugese: 'Míldio tardio do tomate'
  },
  {
    english: 'White mold \n',
    portugese: 'Mofo branco'
  },
  {
    english: 'Fruit rot\r',
    portugese: 'Podridão da fruta'
  },
  {
    english: 'Huaych?a',
    portugese: 'Huaych?a'
  },
  {
    english: 'Hadi ( Okra ? leaf Barakat )',
    portugese: 'Hadi (Okra - folha Barakat)'
  },
  {
    english: 'Khandwa?2',
    portugese: 'Khandwa?2'
  },
  {
    english: 'Badnawar?1',
    portugese: 'Badnawar?1'
  },
  {
    english: 'Luk?ys Ch?oqhepitus',
    portugese: 'Luk?ys Ch?oqhepitus'
  },
  {
    english: 'Brs ita\/ba',
    portugese: 'Brs ita/ba'
  },
  {
    english: 'RS?810',
    portugese: 'RS?810'
  },
  {
    english: 'G-cot ?12',
    portugese: 'G-cot ?12'
  },
  {
    english: 'MCU? 5VT',
    portugese: 'MCU? 5VT'
  },
  {
    english: 'LK?861',
    portugese: 'LK?861'
  },
  {
    english: 'Amasya beyazi',
    portugese: 'Amasya beyazi'
  },
  {
    english: 'Antep karasi',
    portugese: 'Antep karasi'
  },
  {
    english: 'Erenkoy beyazi',
    portugese: 'Erenkoy beyazi'
  },
  {
    english: 'The centers of the spots turn grayish-white and are encircled by a distinct ring (0.2?0.6 inches in diameter) of brown tissue',
    portugese: 'Os centros dos pontos tornam-se branco-acinzentados e são cercados por um anel distinto (0,2?0,6 polegadas de diâmetro) de tecido marrom'
  },
  {
    english: 'Infected stems are often red inside (sometimes pale) and a distinct zig-zag tunnel may be observed ? with maggots or pupae inside.',
    portugese: 'Os caules infectados muitas vezes são vermelhos por dentro (às vezes pálidos) e pode ser observado um túnel em zigue-zague distinto - com larvas ou pupas dentro.'
  },
  {
    english: 'May even cause plant death, especially in younger plants particularly if damage occurs in the plant?s hypocotyl (basal stem) region.',
    portugese: 'Pode até causar a morte da planta, especialmente em plantas mais jovens, principalmente se ocorrer danos na região do hipocótilo (caule basal) da planta.'
  },
  {
    english: 'Whip like structure of 25 ? 150 cm.Whip covered by translucent silvery membrane enclosing mass of black powdery spores.',
    portugese: 'Estrutura semelhante a um chicote de 25 a 150 cm. Chicote coberto por uma membrana translúcida prateada que envolve uma massa de esporos pulverulentos pretos.'
  },
  {
    english: "The multi-branching of shoot apex with scaly leaves is known as ?Bunchy Top? or ?Witches? Broom?. The malformed seedlings, remain stunted and die.",
    portugese: "A ramificação múltipla do ápice do broto com folhas escamosas é conhecida como 'Bunchy Top' ou 'Witches' Broom'. As mudas malformadas permanecem atrofiadas e morrem."
  },
  {
    english: 'RMG-492 IPM-02-3',
    portugese: 'RMG-492 IPM-02-3'
  },
  {
    english: 'Smrat IPM-02-3 HUM-16',
    portugese: 'Smrat IPM-02-3 HUM-16'
  },
  {
    english: 'Vaibhav AKM-4 PKV-Green Gold AKM-8802',
    portugese: 'Vaibhav AKM-4 PKV-Verde Ouro AKM-8802'
  },
  {
    english: 'KPS1',
    portugese: 'KPS1'
  },
  {
    english: 'N22',
    portugese: 'N22'
  },
  {
    english: 'N26',
    portugese: 'N26'
  },
  {
    english: 'KS20',
    portugese: 'KS20'
  },
  {
    english: 'VC637245',
    portugese: 'VC637245'
  },
  {
    english: 'VC61753B',
    portugese: 'VC61753B'
  },
  {
    english: 'VC6173B',
    portugese: 'VC6173B'
  },
  {
    english: 'VC614850',
    portugese: 'VC614850'
  },
  {
    english: 'VC6137B',
    portugese: 'VC6137B'
  },
  {
    english: 'KAT 00301',
    portugese: 'KAT 00301'
  },
  {
    english: 'KAT 00308',
    portugese: 'KAT 00308'
  },
  {
    english: 'KAT 00309',
    portugese: 'KAT 00309'
  },
  {
    english: "Orange (Brazil)",
    portugese: "Laranja (Brasil)"
  },
  {
    english: "Pêra",
    portugese: "Pêra"
  },
  {
    english: "Valencia",
    portugese: "Valência"
  },
  {
    english: "Hamlin",
    portugese: "Hamlin"
  },
  {
    english: "Westin",
    portugese: "Westin"
  },
  {
    english: "Orange (India)",
    portugese: "Laranja (Índia)"
  },
  {
    english: "Khasi",
    portugese: "Khasi"
  },
  {
    english: "Coorg",
    portugese: "Coorg"
  },
  {
    english: "Batavian",
    portugese: "Batávia"
  },
  {
    english: "Jaffa",
    portugese: "Jaffa"
  },
  {
    english: "Pineapple orange",
    portugese: "Laranja abacaxi"
  },
  {
    english: "Orange (Nepal)",
    portugese: "Laranja (Nepal)"
  },
  {
    english: "mandarin orange (suntala)",
    portugese: "Laranja mandarim (suntala)"
  },
  {
    english: "Khoku local",
    portugese: "Khoku local"
  },
  {
    english: "sweet orange (junar)",
    portugese: "Laranja doce (junar)"
  },
  {
    english: "tangerines",
    portugese: "Tangerinas"
  },
  {
    english: "acid lime (kahati)",
    portugese: "Limão ácido (kahati)"
  },
  {
    english: "pummelo (bhogate)",
    portugese: "Pomelo (bhogate)"
  },
  {
    english: "kumquat (muntala)",
    portugese: "kumquat (muntala)"
  },
  {
    english: "Abacaxi",
    portugese: "Abacaxi"
  },
  {
    english: "Cayenne",
    portugese: "Cayenne"
  },
  {
    english: "Pernambuco",
    portugese: "Pernambuco"
  },
  {
    english: "Perotera",
    portugese: "Perotera"
  },
  {
    english: "Pest nematodes are tiny slender unsegmented worms that infest plant roots, reducing root growth and causing root death thus reducing the plant?s ability to absorb water and nutrients.",
    portugese: "Os nematoides de praga são vermes minúsculos, delgados e não segmentados que infestam as raízes das plantas, reduzindo o crescimento das raízes e causando a morte das raízes, reduzindo assim a capacidade da planta de absorver água e nutrientes."
  },
  {
    english: "Dry pods showing pin head size hole",
    portugese: "Vagens secas mostrando buraco do tamanho de uma cabeça de alfinete"
  },
  {
    english: "Seeds shriveled, striped, and partially eaten",
    portugese: "Sementes enrugadas, listradas e parcialmente comidas"
  },
  {
    english: "The larvae damage seeds as well as cause flowers, buds, and pods to drop",
    portugese: "As larvas danificam sementes e também causam a queda de flores, botões e vagens"
  },
  {
    english: "The caterpillar is greenish-brown in color and fringed with short hairs and spines",
    portugese: "A lagarta é de cor verde-amarelada e franjada com pelos curtos e espinhos"
  },
  {
    english: "It also enters into the pod and feeds on developing grains",
    portugese: "Também entra na vagem e se alimenta dos grãos em desenvolvimento"
  },
  {
    english: "The adults are medium to large (2.5 cm in length), usually black with large yellow spots and a red band across the abdomen, which sometimes changes into yellow spots",
    portugese: "Os adultos são médios a grandes (2,5 cm de comprimento), geralmente pretos com grandes manchas amarelas e uma faixa vermelha no abdômen, que às vezes se transforma em manchas amarelas"
  },
  {
    english: "Adults feed on the flowers, tender pods, and young leaves resulting in fewer pods",
    portugese: "Os adultos se alimentam das flores, vagens tenras e folhas jovens, resultando em menos vagens"
  },
  {
    english: "An adult beetle can damage 20-30 flowers in a single day",
    portugese: "Um besouro adulto pode danificar 20-30 flores em um único dia"
  },
  {
    english: "Small soft-bodied insects on the underside of leaves and/or stems of the plant; usually green or yellow in color, but may be pink, brown, red, or black depending on species and host plant",
    portugese: "Pequenos insetos de corpo mole na parte inferior das folhas e/ou caules da planta; geralmente verdes ou amarelos, mas podem ser rosados, marrons, vermelhos ou pretos, dependendo da espécie e da planta hospedeira"
  },
  {
    english: "If aphid infestation is heavy, it may cause leaves to yellow and/or distort, necrotic spots on leaves and/or stunted shoots",
    portugese: "Se a infestação de pulgões for intensa, pode fazer com que as folhas amarelem e/ou se deformem, manchas necróticas nas folhas e/ou brotos atrofiados"
  },
  {
    english: "Aphids secrete a sticky, sugary substance called honeydew which encourages the growth of sooty mold on the plants",
    portugese: "Os pulgões secretam uma substância pegajosa e açucarada chamada de melada, que estimula o crescimento de fungos fuliginosos nas plantas"
  },
  {
    english: "Alterneria Blight",
    portugese: "Mancha de alternária"
  },
  {
    english: "Sterility Mosaic",
    portugese: "Mosaico de esterilidade"
  },
  {
    english: "Alterneria Blight/Leaf Spot",
    portugese: "Mancha de alternária/mancha foliar"
  },
  {
    english: "Phytophthora Stem Blight",
    portugese: "Murcha do colo por Phytophthora"
  },
  {
    english: "Cercospora Leaf Spots",
    portugese: "Manchas foliares de cercospora"
  },
  {
    english: "valencia late",
    portugese: "valencia tarde"
  },
  {
    english: "washington navel",
    portugese: "washington navel"
  },
  {
    english: "Pixie orange",
    portugese: "Laranja Pixie"
  },
  {
    english: 'Mineola',
    portugese: 'Mineola'
  },
  {
    english: 'Crinkling, curling, bronzing, and drying, or ?hopper burn?',
    portugese: 'Enrugamento, encaracolamento, bronzeamento e secagem, ou queimadura de cigarrinha'
  },
  {
    english: 'Wood bears superficial irregular dark-grey to black raised patches',
    portugese: 'A madeira apresenta manchas irregulares superficiais de cinza-escuro a preto elevado'
  },
  {
    english: 'Whip-like structure of 25 ? 150 cm. Whip covered by translucent silvery membrane enclosing a mass of black powdery spores.',
    portugese: 'Estrutura semelhante a um chicote de 25 a 150 cm. Chicote coberto por uma membrana prateada translúcida que envolve uma massa de esporos pulverulentos negros.'
  },
  {
    english: 'Yellow area extends to veins and midrib forming characteristic ?v? shaped chlorotic spots which later turn black',
    portugese: 'A área amarela estende-se até às veias e à nervura central formando manchas cloróticas em forma de "v" característica que posteriormente ficam pretas'
  },
  {
    english: 'These occur on the upper surface of the leaves in the form of small round blotches with a grey or muddy spot in the centre 6?10 mm in diameter, reminiscent of a peacock?s eye.',
    portugese: 'Estas ocorrem na superfície superior das folhas sob a forma de pequenas manchas redondas com uma mancha cinzenta ou lamacenta no centro, com 6 a 10 mm de diâmetro, reminiscentes de um olho de pavão.'
  },
  {
    english: 'Lesions turn pink, red, purple, or light-brown, depending on the plant?s pigments',
    portugese: 'As lesões tornam-se rosadas, vermelhas, roxas ou castanhas-claras, dependendo dos pigmentos da planta'
  },
  {
    english: 'Symptoms of mosaic appear on the youngest leaves when infection occurs at 6 ? 8 leaves stage.',
    portugese: 'Os sintomas de mosaico aparecem nas folhas mais jovens quando a infeção ocorre na fase das 6 a 8 folhas.'
  },
  {
    english: 'Leaves look like they?re dusted with white powder (especially the underside)',
    portugese: 'As folhas parecem estar cobertas de pó branco (especialmente na parte inferior)'
  },
  {
    english: 'Lesions or spots are more numerous on upper leaf surfaces and appear circular to irregular in shape.',
    portugese: 'As lesões ou manchas são mais numerosas nas superfícies superiores das folhas e têm forma circular a irregular.'
  },
  {
    english: '55?less than 65 years',
    portugese: '55 a menos de 65 anos'
  },
  {
    english: '45?less than 55 years',
    portugese: '45 a menos de 55 anos'
  },
  {
    english: '35?less than 45 years',
    portugese: '35 a menos de 45 anos'
  },
  {
    english: 'Mango (Saudi Arabia)',
    portugese: 'Manga (Arábia Saudita)'
  },
  {
    english: 'Alphonso',
    portugese: 'Alphonso'
  },
  {
    english: 'Chaunsa',
    portugese: 'Chaunsa'
  },
  {
    english: 'Sindhri',
    portugese: 'Sindhri'
  },
  {
    english: 'Anwar Ratol',
    portugese: 'Anwar Ratol'
  },
  {
    english: 'Keitt',
    portugese: 'Keitt'
  },
  {
    english: 'Tommy Atkins',
    portugese: 'Tommy Atkins'
  },
  {
    english: 'Pomegranate (Saudi Arabia)',
    portugese: 'Romã (Arábia Saudita)'
  },
  {
    english: 'Al-Taif',
    portugese: 'Al-Taif'
  },
  {
    english: 'Baladi',
    portugese: 'Baladi'
  },
  {
    english: 'Al-Yamani',
    portugese: 'Al-Yamani'
  },
  {
    english: 'Shami',
    portugese: 'Shami'
  },
  {
    english: 'Sour',
    portugese: 'Azedo'
  },
  {
    english: 'Camel trot (Al-Qassim).',
    portugese: 'Trote de camelo (Al-Qassim)'
  },
  {
    english: 'The city',
    portugese: 'A cidade'
  },
  {
    english: 'Molar',
    portugese: 'Molar'
  },
  {
    english: 'Dejativa',
    portugese: 'Dejativa'
  },
  {
    english: 'Al-Afar',
    portugese: 'Al-Afar'
  },
  {
    english: 'Al-Mashhad',
    portugese: 'Al-Mashhad'
  },
  {
    english: 'Tabuk',
    portugese: 'Tabuk'
  },
  {
    english: 'Al-Bahah',
    portugese: 'Al-Bahah'
  },
  {
    english: 'Manfaluti (wonderful)',
    portugese: 'Manfaluti (maravilhoso)'
  },
  {
    english: 'Wheat (Saudi Arabia)',
    portugese: 'Trigo (Arábia Saudita)'
  },
  {
    english: 'Yecora Rojo',
    portugese: 'Yecora Rojo'
  },
  {
    english: 'Sakha 93',
    portugese: 'Sakha 93'
  },
  {
    english: 'Abedi',
    portugese: 'Abedi'
  },
  {
    english: 'Boyou 87',
    portugese: 'Boyou 87'
  },
  {
    english: 'Sahel 1',
    portugese: 'Sahel 1'
  },
  {
    english: 'Capello desprez',
    portugese: 'Capello desprez'
  },
  {
    english: 'Safa 11',
    portugese: 'Safa 11'
  },
  {
    english: 'Heap',
    portugese: 'Monte'
  },
  {
    english: 'Tray',
    portugese: 'Tabuleiro'
  },
  {
    english: 'Basket',
    portugese: 'Cesto'
  },
  {
    english: 'Forastero',
    portugese: 'Forastero'
  },
  {
    english: 'Drying trays',
    portugese: 'Tabuleiros de secagem'
  },
  {
    english: 'Elbas (movable dryers)',
    portugese: 'Elbas (secadores móveis)'
  },
  {
    english: 'Drying Tunnels',
    portugese: 'Túneis de secagem'
  },
  {
    english: 'Cement',
    portugese: 'Cimento'
  },
  {
    english: 'Almonds',
    portugese: 'Amêndoas'
  },
  {
    english: 'Dry Cacao',
    portugese: 'Cacau seco'
  },
  {
    english: 'Cacao Data',
    portugese: 'Dados de cacau'
  },
  {
    english: 'CacaoBuyingStation',
    portugese: 'Estação de compra de cacau'
  },
  {
    english: 'CacaoOfflineFarmerList',
    portugese: 'Lista offline de agricultores de cacau'
  },
  {
    english: 'AREA-TOO-LARGE',
    portugese: 'ÁREA MUITO GRANDE'
  },
  {
    english: 'REPORT UNAVAILABLE FOR CIRCULAR GEOFENCE',
    portugese: 'RELATÓRIO INDISPONÍVEL PARA CERCA GEOFENCIAL CIRCULAR'
  },
  {
    english: 'Erecta.',
    portugese: 'Erecta.'
  },
  {
    english: 'Catimor,',
    portugese: 'Catimor,'
  },
  {
    english: 'Typica,',
    portugese: 'Typica,'
  },
  {
    english: 'Catuai.',
    portugese: 'Catuai.'
  },
  {
    english: 'Red dwarf Bananas.',
    portugese: 'Bananas vermelhas anãs.'
  },
  {
    english: 'Selection 7.3/ Sln.7.3',
    portugese: 'Seleção 7.3/ Sln.7.3'
  },
  {
    english: 'Selection 4/ Sln.4',
    portugese: 'Seleção 4/ Sln.4'
  },
  {
    english: 'MGS Esmeralda',
    portugese: 'MGS Esmeralda'
  },
  {
    english: 'PBN - 2002',
    portugese: 'PBN - 2002'
  },
  {
    english: 'Rapeseed (Nepal)',
    portugese: 'Colza (Nepal)'
  },
  {
    english: 'Chicken Litter',
    portugese: 'Estreco de galinha'
  },
  {
    english: 'It can damage the flowers of avocado trees, resulting in reduced fruit set and yield.',
    portugese: 'Pode danificar as flores das árvores de abacate, resultando em redução da frutificação e do rendimento.'
  },
  {
    english: 'Inflorescence stage',
    portugese: 'Estágio de inflorescência'
  },
  {
    english: 'Ripening stage',
    portugese: 'Estágio de amadurecimento'
  },
  {
    english: 'Yellow to brown spots on the upper leaf surface which have white dust-like spores on the corresponding under leaf surface.',
    portugese: 'Manchas amarelas a castanhas na superfície superior da folha que têm esporos brancos semelhantes a pó na superfície inferior correspondente da folha.'
  },
  {
    english: "Stem tips wilt and bend forming a 'shepherd's crook'",
    portugese: 'As pontas dos caules murcham e dobram formando um "gancho de pastor"'
  },
  {
    english: "Infected chlorotic areas produce a massive amount of asexual spores, generally on the lower surface, giving the leaf a 'downy' appearance.",
    portugese: "As áreas cloróticas infectadas produzem uma grande quantidade de esporos assexuais, geralmente na superfície inferior, dando à folha uma aparência 'lanosa'."
  },
  {
    english: 'The spots coalesce and the leaves shrivel and dries up prematurely',
    portugese: 'As manchas se fundem e as folhas murcham e secam prematuramente'
  },
  {
    english: "The leaflets of affected leaves are usually distorted, puckered, and smaller than normal. Sometimes the leaflets become indented, resulting in 'fern leaf' symptoms.",
    portugese: 'Os folíolos das folhas afetadas geralmente estão distorcidos, enrugados e menores que o normal. Às vezes, os folíolos ficam indentados, resultando em sintomas de "folha de samambaia".'
  },
  {
    english: 'There are several spots on each berry',
    portugese: 'Há várias manchas em cada baga'
  },
  {
    english: 'In the case of fruit rot, the infection starts from the pedicel as dark lesions and gradually spreads to the fruit, causing brown discoloration of the rind resulting in rotting.',
    portugese: 'No caso de podridão da fruta, a infecção começa do pedicelo como lesões escuras e se espalha gradualmente para a fruta, causando descoloração marrom da casca resultando em apodrecimento.'
  },
  {
    english: 'Bud Fly/Capsule Fly',
    portugese: 'Mosca dos botões/Mosca da cápsula'
  },
  {
    english: 'Cyclamen Mite',
    portugese: 'Ácaro do ciclame'
  },
  {
    english: 'Two-Spotted Mite',
    portugese: 'Ácaro rajado'
  },
  {
    english: 'litres/second',
    portugese: 'litros/segundo'
  },
  {
    english: "Lesions or 'spots' are more numerous on upper leaf surfaces and appear circular to irregular in shape.",
    portugese: 'As lesões ou "manchas" são mais numerosas nas superfícies superiores das folhas e aparecem em forma circular a irregular.'
  }
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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

  async down (queryInterface, Sequelize) {}

};
