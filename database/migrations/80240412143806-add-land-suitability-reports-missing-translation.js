"use strict";
const translations = [
  {
    english: "Any one of 1, 10, 11",
    swahili: "Moja kati ya 1, 10, 11",
    spanish: "Cualquiera de 1, 10, 11",
    portugese: "Qualquer um de 1, 10, 11",
    dutch: "Een van de 1, 10, 11"
  },
  {
    english: "Any one of 6, 7, 9",
    swahili: "Moja kati ya 6, 7, 9",
    spanish: "Cualquiera de 6, 7, 9",
    portugese: "Qualquer um de 6, 7, 9",
    dutch: "Een van de 6, 7, 9"
  },
  {
    english: "Any one of 2,3,4,5",
    swahili: "Moja kati ya 2, 3, 4, 5",
    spanish: "Cualquiera de 2, 3, 4, 5",
    portugese: "Qualquer um de 2, 3, 4, 5",
    dutch: "Een van de 2, 3, 4, 5"
  },
  {
    english: "More than 30",
    swahili: "Zaidi ya 30",
    spanish: "Más de 30",
    portugese: "Mais que 30",
    dutch: "Meer dan 30"
  },
  {
    english: "Between 16-30",
    swahili: "Kati ya 16-30",
    spanish: "Entre 16-30",
    portugese: "Entre 16-30",
    dutch: "Tussen 16-30"
  },
  {
    english: "Between 8-16",
    swahili: "Kati ya 8-16",
    spanish: "Entre 8-16",
    portugese: "Entre 8-16",
    dutch: "Tussen 8-16"
  },
  {
    english: "Between 0-8",
    swahili: "Kati ya 0-8",
    spanish: "Entre 0-8",
    portugese: "Entre 0-8",
    dutch: "Tussen 0-8"
  },
  {
    english: "Any one of 4,5,6,7,8,9,10,11,12",
    swahili: "Moja kati ya 4, 5, 6, 7, 8, 9, 10, 11, 12",
    spanish: "Cualquiera de 4, 5, 6, 7, 8, 9, 10, 11, 12",
    portugese: "Qualquer um de 4, 5, 6, 7, 8, 9, 10, 11, 12",
    dutch: "Een van de 4, 5, 6, 7, 8, 9, 10, 11, 12"
  },
  {
    english: "2 or 3",
    swahili: "2 au 3",
    spanish: "2 o 3",
    portugese: "2 ou 3",
    dutch: "2 of 3"
  },
  {
    english: "Less than 0.8",
    swahili: "Chini ya 0.8",
    spanish: "Menos de 0.8",
    portugese: "Menos que 0.8",
    dutch: "Minder dan 0.8"
  },
  {
    english: "Between 0.8-1.2",
    swahili: "Kati ya 0.8-1.2",
    spanish: "Entre 0.8-1.2",
    portugese: "Entre 0.8-1.2",
    dutch: "Tussen 0.8-1.2"
  },
  {
    english: "More than 1.2",
    swahili: "Zaidi ya 1.2",
    spanish: "Más de 1.2",
    portugese: "Mais que 1.2",
    dutch: "Meer dan 1.2"
  },
  {
    english: "Less than 4.3 or More than 8.3",
    swahili: "Chini ya 4.3 au Zaidi ya 8.3",
    spanish: "Menos de 4.3 o Más de 8.3",
    portugese: "Menos que 4.3 ou Mais que 8.3",
    dutch: "Minder dan 4.3 of Meer dan 8.3"
  },
  {
    english: "Between 4.3-4.5 or Between 7.5-8.3",
    swahili: "Kati ya 4.3-4.5 au Kati ya 7.5-8.3",
    spanish: "Entre 4.3-4.5 o Entre 7.5-8.3",
    portugese: "Entre 4.3-4.5 ou Entre 7.5-8.3",
    dutch: "Tussen 4.3-4.5 of Tussen 7.5-8.3"
  },
  {
    english: "Between 4.5-5 or Between 6.5-7.5",
    swahili: "Kati ya 4.5-5 au Kati ya 6.5-7.5",
    spanish: "Entre 4.5-5 o Entre 6.5-7.5",
    portugese: "Entre 4.5-5 ou Entre 6.5-7.5",
    dutch: "Tussen 4.5-5 of Tussen 6.5-7.5"
  },
  {
    english: "Between 5-6.5",
    swahili: "Kati ya 5-6.5",
    spanish: "Entre 5-6.5",
    portugese: "Entre 5-6.5",
    dutch: "Tussen 5-6.5"
  },
  {
    english: "Grassland",
    swahili: "Maeneo ya Nyasi",
    spanish: "Pastizales",
    portugese: "Pastagem",
    dutch: "Grasland"
  },
  {
    english: "Artificial surfaces",
    swahili: "Nyenzo bandia",
    spanish: "Superficies artificiales",
    portugese: "Superfícies artificiais",
    dutch: "Kunstmatige oppervlakken"
  },
  {
    english: "Tree covered areas",
    swahili: "Maeneo yenye Miti",
    spanish: "Áreas cubiertas de árboles",
    portugese: "Áreas cobertas por árvores",
    dutch: "Boombedekte gebieden"
  },
  {
    english: "Shrubs covered areas",
    swahili: "Maeneo yenye Mimea ya Kichaka",
    spanish: "Áreas cubiertas de arbustos",
    portugese: "Áreas cobertas por arbustos",
    dutch: "Gebieden bedekt met struiken"
  },
  {
    english: "Herbaceous vegetation, aquatic or regularly flooded",
    swahili: "Mimea ya kijani, maji au mara kwa mara yamefunikwa",
    spanish: "Vegetación herbácea, acuática o inundada regularmente",
    portugese: "Vegetação herbácea, aquática ou regularmente inundada",
    dutch: "Kruidachtige vegetatie, waterig of regelmatig overstroomd"
  },
  {
    english: "Bare soil / sparse vegetation",
    swahili: "Ardhi ya Uchi / Mimea Michache",
    spanish: "Suelo desnudo / vegetación dispersa",
    portugese: "Solo nu / vegetação esparsa",
    dutch: "Kale grond / schaarse vegetatie"
  },
  {
    english: "Mangroves",
    swahili: "Mangrove",
    spanish: "Manglares",
    portugese: "Manguezais",
    dutch: "Mangroves"
  },
  {
    english: "Snow and glaciers",
    swahili: "Barafu na Mabondeo",
    spanish: "Nieve y glaciares",
    portugese: "Neve e geleiras",
    dutch: "Sneeuw en gletsjers"
  },
  {
    english: "Water bodie",
    swahili: "Mwili wa Maji",
    spanish: "Cuerpo de agua",
    portugese: "Corpo de água",
    dutch: "Waterlichaam"
  },
  {
    english: "Moss and lichen",
    swahili: "Moss na lichen",
    spanish: "Musgo y líquenes",
    portugese: "Musgo e líquen",
    dutch: "Mos en korstmos"
  },
  {
    english: "Clay",
    swahili: "Chokaa",
    spanish: "Arcilla",
    portugese: "Argila",
    dutch: "Klei"
  },
  {
    english: "Silty clay",
    swahili: "Chokaa yenye mchanga",
    spanish: "Arcilla limosa",
    portugese: "Argila silicosa",
    dutch: "Zanderige klei"
  },
  {
    english: "Sandy clay",
    swahili: "Chokaa yenye mchanga",
    spanish: "Arcilla arenosa",
    portugese: "Argila arenosa",
    dutch: "Zanderige klei"
  },
  {
    english: "Clay loam",
    swahili: "Chokaa loam",
    spanish: "Arcilla limosa",
    portugese: "Argila argilosa",
    dutch: "Klei leem"
  },
  {
    english: "Silty clay loam",
    swahili: "Chokaa yenye mchanga loam",
    spanish: "Arcilla limosa limosa",
    portugese: "Argila silicosa argilosa",
    dutch: "Zanderige klei leem"
  },
  {
    english: "Sandy clay loam",
    swahili: "Chokaa yenye mchanga loam",
    spanish: "Arcilla arenosa limosa",
    portugese: "Argila arenosa argilosa",
    dutch: "Zanderige klei leem"
  },
  {
    english: "Loam",
    swahili: "Loam",
    spanish: "Limo",
    portugese: "Limo",
    dutch: "Leem"
  },
  {
    english: "Silty loam",
    swahili: "Loam yenye mchanga",
    spanish: "Limo limoso",
    portugese: "Limo silicoso",
    dutch: "Zanderig leem"
  },
  {
    english: "Sandy loam",
    swahili: "Loam yenye mchanga",
    spanish: "Limo arenoso",
    portugese: "Limo arenoso",
    dutch: "Zanderig leem"
  },
  {
    english: "Silt",
    swahili: "Silk",
    spanish: "Limo",
    portugese: "Limo",
    dutch: "Slib"
  },
  {
    english: "Loamy sand",
    swahili: "Mchanga wa mchanga",
    spanish: "Arena limosa",
    portugese: "Areia argilosa",
    dutch: "Leemzand"
  },
  {
    english: "Sand",
    swahili: "Mchanga",
    spanish: "Arena",
    portugese: "Areia",
    dutch: "Zand"
  }
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
