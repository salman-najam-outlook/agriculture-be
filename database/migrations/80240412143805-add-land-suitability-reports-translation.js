"use strict";
const translations = [
  {
    english: "Land Evaluation",
    swahili: "Tathmini ya Ardhi",
    spanish: "Evaluación de Terreno",
    portugese: "Avaliação de Terra",
    dutch: "Grond Evaluatie",
  },
  {
    english: "Unsuitable",
    swahili: "Hafai",
    spanish: "No Apto",
    portugese: "Inadequado",
    dutch: "Ongeschikt",
  },
  {
    english: "Marginally Suitable",
    swahili: "Kwa Kiasi",
    spanish: "Marginalmente Apto",
    portugese: "Marginalmente Adequado",
    dutch: "Marginaal Geschikt",
  },
  {
    english: "Moderately Suitable",
    swahili: "Kwa Kiasi Kikubwa",
    spanish: "Moderadamente Apto",
    portugese: "Moderadamente Adequado",
    dutch: "Matig Geschikt",
  },
  {
    english: "Highly Suitable",
    swahili: "Kwa Kiwango Kikubwa",
    spanish: "Altamente Apto",
    portugese: "Altamente Adequado",
    dutch: "Zeer Geschikt",
  },
  {
    english: "Slope (%)",
    swahili: "Mwinamo (%)",
    spanish: "Pendiente (%)",
    portugese: "Inclinação (%)",
    dutch: "Helling (%)",
  },
  {
    english: "Soil texture (USDA class)",
    swahili: "Muundo wa Udongo (Darasa la USDA)",
    spanish: "Textura del Suelo (clase USDA)",
    portugese: "Textura do Solo (classe USDA)",
    dutch: "Bodemtextuur (USDA-klasse)",
  },
  {
    english: "Land",
    swahili: "Ardhi",
    spanish: "Tierra",
    portugese: "Terra",
    dutch: "Grond"
  },
  {
    english: "Artificial surfaces (type)",
    swahili: "Nyenzo bandia (aina)",
    spanish: "Superficies artificiales (tipo)",
    portugese: "Superfícies artificiais (tipo)",
    dutch: "Kunstmatige oppervlakken (type)"
  },
  {
    english: "Proximity to Type 1 and 2 Roads (meters)",
    swahili: "Ukaribu na Barabara za Aina 1 na 2 (mita)",
    spanish: "Proximidad a Carreteras de Tipo 1 y 2 (metros)",
    portugese: "Proximidade às Estradas de Tipo 1 e 2 (metros)",
    dutch: "Nabijheid van Type 1 en 2 Wegen (meters)"
  },
  {
    english: "Soil Chemical Properties",
    swahili: "Mali za Kemikali za Udongo",
    spanish: "Propiedades Químicas del Suelo",
    portugese: "Propriedades Químicas do Solo",
    dutch: "Chemische Eigenschappen van de Grond"
  },
  {
    english: "Soil Physical Properties",
    swahili: "Mali za Fizikia ya Udongo",
    spanish: "Propiedades Físicas del Suelo",
    portugese: "Propriedades Físicas do Solo",
    dutch: "Fysische Eigenschappen van de Grond"
  },
  {
    english: "Coarse fragments (vol%)",
    swahili: "Vipande Vikali (Asilimia ya Kiasi)",
    spanish: "Fragmentos Gruesos (vol.%)",
    portugese: "Fragmentos Grossos (vol.%)",
    dutch: "Grove Fragmenten (vol%)",
  },
  {
    english: "Soil organic carbon (%)",
    swahili: "Carboni ya Ardhi ya Kikaboni (%)",
    spanish: "Carbono Orgánico del Suelo (%)",
    portugese: "Carbono Orgânico do Solo (%)",
    dutch: "Organische Koolstof van de Grond (%)",
  },
  {
    english: "Soil pH",
    swahili: "pH ya Ardhi",
    spanish: "pH del Suelo",
    portugese: "pH do Solo",
    dutch: "Bodem pH",
  },
  {
    english: "Soil salinity (ECe))",
    swahili: "Chumvi ya Udongo (ECe))",
    spanish: "Salinidad del Suelo (ECe))",
    portugese: "Salinidade do Solo (ECe))",
    dutch: "Bodemzoutgehalte (ECe))",
  },
  {
    english: "Overall Score for Land Suitability",
    swahili: "Alama ya Jumla kwa Ufaa wa Ardhi",
    spanish: "Puntuación General para la Adecuación del Terreno",
    portugese: "Pontuação Geral para Adequação do Solo",
    dutch: "Algemene Score voor Grondgeschiktheid",
  },
  {
    english: "Mean annual temperature (°C)",
    swahili: "Joto la kila mwaka (°C)",
    spanish: "Temperatura Media Anual (°C)",
    portugese: "Temperatura Média Anual (°C)",
    dutch: "Gemiddelde Jaarlijkse Temperatuur (°C)",
  },
  {
    english: "Weather",
    swahili: "Hali ya Hewa",
    spanish: "Clima",
    portugese: "Tempo",
    dutch: "Weer",
  },
  {
    english: "Mean minimum temperature of coldest month (°C)",
    swahili: "Joto la Chini Zaidi la Mwezi Baridi Zaidi (°C)",
    spanish: "Temperatura Mínima Media del Mes Más Frío (°C)",
    portugese: "Temperatura Mínima Média do Mês Mais Frio (°C)",
    dutch: "Gemiddelde Minimumtemperatuur van de Koudste Maand (°C)",
  },
  {
    english: "Mean annual precipitation (mm)",
    swahili: "Mvua ya kila mwaka (mm)",
    spanish: "Precipitación Anual Media (mm)",
    portugese: "Precipitação Anual Média (mm)",
    dutch: "Gemiddelde Jaarlijkse Neerslag (mm)",
  },
  {
    english: "Weather Report",
    swahili: "Ripoti ya Hali ya Hewa",
    spanish: "Informe Meteorológico",
    portugese: "Relatório Meteorológico",
    dutch: "Weerrapport",
  },
  {
    english: "More than 4000",
    swahili: "Zaidi ya 4000",
    spanish: "Más de 4000",
    portugese: "Mais de 4000",
    dutch: "Meer dan 4000",
  },
  {
    english: "Between 2000-4000",
    swahili: "Kati ya 2000-4000",
    spanish: "Entre 2000 y 4000",
    portugese: "Entre 2000 e 4000",
    dutch: "Tussen 2000-4000",
  },
  {
    english: "Between 1000-2000",
    swahili: "Kati ya 1000-2000",
    spanish: "Entre 1000 y 2000",
    portugese: "Entre 1000 e 2000",
    dutch: "Tussen 1000-2000",
  },
  {
    english: "Between 10-1000",
    swahili: "Kati ya 10-1000",
    spanish: "Entre 10 y 1000",
    portugese: "Entre 10 e 1000",
    dutch: "Tussen 10-1000",
  },
  {
    english: "More than 47",
    swahili: "Zaidi ya 47",
    spanish: "Más de 47",
    portugese: "Mais de 47",
    dutch: "Meer dan 47",
  },
  {
    english: "Between 37-47",
    swahili: "Kati ya 37-47",
    spanish: "Entre 37 y 47",
    portugese: "Entre 37 e 47",
    dutch: "Tussen 37-47",
  },
  {
    english: "Between 10-37",
    swahili: "Kati ya 10-37",
    spanish: "Entre 10 y 37",
    portugese: "Entre 10 e 37",
    dutch: "Tussen 10-37",
  },
  {
    english: "Between 0-10",
    swahili: "Kati ya 0-10",
    spanish: "Entre 0 y 10",
    portugese: "Entre 0 e 10",
    dutch: "Tussen 0-10",
  },
  {
    english: "Any one of 1,10,12",
    swahili: "Moja kati ya 1,10,12",
    spanish: "Cualquiera de 1, 10, 12",
    portugese: "Qualquer um de 1, 10, 12",
    dutch: "Een van 1,10,12",
  },
  {
    english: "8 or 9",
    swahili: "8 au 9",
    spanish: "8 o 9",
    portugese: "8 ou 9",
    dutch: "8 of 9"
  },
  {
    english: "Any one of 2,3,4,5,6,7",
    swahili: "Moja kati ya 2,3,4,5,6,7",
    spanish: "Cualquiera de 2, 3, 4, 5, 6, 7",
    portugese: "Qualquer um de 2, 3, 4, 5, 6, 7",
    dutch: "Een van 2,3,4,5,6,7",
  },
  {
    english: "More than 55",
    swahili: "Zaidi ya 55",
    spanish: "Más de 55",
    portugese: "Mais de 55",
    dutch: "Meer dan 55",
  },
  {
    english: "Between 35-55",
    swahili: "Kati ya 35-55",
    spanish: "Entre 35 y 55",
    portugese: "Entre 35 e 55",
    dutch: "Tussen 35-55",
  },
  {
    english: "Between 15-35",
    swahili: "Kati ya 15-35",
    spanish: "Entre 15 y 35",
    portugese: "Entre 15 e 35",
    dutch: "Tussen 15-35",
  },
  {
    english: "Between 0-15",
    swahili: "Kati ya 0-15",
    spanish: "Entre 0 y 15",
    portugese: "Entre 0 e 15",
    dutch: "Tussen 0-15",
  },
  {
    english: "Less than 0.6",
    swahili: "Chini ya 0.6",
    spanish: "Menos de 0.6",
    portugese: "Menos que 0.6",
    dutch: "Minder dan 0.6",
  },
  {
    english: "Between 0.8 - 1.5",
    swahili: "Kati ya 0.8 - 1.5",
    spanish: "Entre 0.8 y 1.5",
    portugese: "Entre 0.8 e 1.5",
    dutch: "Tussen 0.8 en 1.5",
  },
  {
    english: "More than 1.5",
    swahili: "Zaidi ya 1.5",
    spanish: "Más de 1.5",
    portugese: "Mais de 1.5",
    dutch: "Meer dan 1.5",
  },
  {
    english: "Less than 4 or More than 8.5",
    swahili: "Chini ya 4 au Zaidi ya 8.5",
    spanish: "Menos de 4 o Más de 8.5",
    portugese: "Menos de 4 ou Mais de 8.5",
    dutch: "Minder dan 4 of Meer dan 8.5",
  },
  {
    english: "Between 4-5 or Between 7.5-8.5",
    swahili: "Kati ya 4-5 au Kati ya 7.5-8.5",
    spanish: "Entre 4-5 o Entre 7.5-8.5",
    portugese: "Entre 4-5 ou Entre 7.5-8.5",
    dutch: "Tussen 4-5 of Tussen 7.5-8.5",
  },
  {
    english: "Between 5-5.5 or Between 6.5-7.5",
    swahili: "Kati ya 5-5.5 au Kati ya 6.5-7.5",
    spanish: "Entre 5-5.5 o Entre 6.5-7.5",
    portugese: "Entre 5-5.5 ou Entre 6.5-7.5",
    dutch: "Tussen 5-5.5 of Tussen 6.5-7.5",
  },
  {
    english: "Between 5.5-6.5",
    swahili: "Kati ya 5.5-6.5",
    spanish: "Entre 5.5-6.5",
    portugese: "Entre 5.5-6.5",
    dutch: "Tussen 5.5-6.5",
  },
  {
    english: "More than 5",
    swahili: "Zaidi ya 5",
    spanish: "Más de 5",
    portugese: "Mais de 5",
    dutch: "Meer dan 5",
  },
  {
    english: "Between 4-5",
    swahili: "Kati ya 4-5",
    spanish: "Entre 4-5",
    portugese: "Entre 4-5",
    dutch: "Tussen 4-5",
  },
  {
    english: "Between 3-4",
    swahili: "Kati ya 3-4",
    spanish: "Entre 3-4",
    portugese: "Entre 3-4",
    dutch: "Tussen 3-4",
  },
  {
    english: "Between 0-3",
    swahili: "Kati ya 0-3",
    spanish: "Entre 0-3",
    portugese: "Entre 0-3",
    dutch: "Tussen 0-3",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const englishTranslations = translations.map((data) => data.english);

      await queryInterface.bulkDelete("global_translation_metadata", {
        english: {
          [Sequelize.Op.in]: englishTranslations,
        },
      });

      await queryInterface.bulkInsert(
        "global_translation_metadata",
        translations
      );

      console.log("Migration completed successfully.");
    } catch (error) {
      console.error("Error occurred during migration:", error);
    }
  },

  async down(queryInterface, Sequelize) {},
};
