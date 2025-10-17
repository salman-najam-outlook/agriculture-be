"use strict";
const translations = [
  {
    english: "Less than 10 or More than 45",
    swahili: "Chini ya 10 au Zaidi ya 45",
    spanish: "Menos de 10 o Más de 45",
    portugese: "Menos que 10 ou Mais que 45",
    dutch: "Minder dan 10 of Meer dan 45"
  },
  {
    english: "Between 30-45 or Between 10-15",
    swahili: "Kati ya 30-45 au Kati ya 10-15",
    spanish: "Entre 30-45 o Entre 10-15",
    portugese: "Entre 30-45 ou Entre 10-15",
    dutch: "Tussen 30-45 of Tussen 10-15"
  },
  {
    english: "Between 15-18 or Between 26-30",
    swahili: "Kati ya 15-18 au Kati ya 26-30",
    spanish: "Entre 15-18 o Entre 26-30",
    portugese: "Entre 15-18 ou Entre 26-30",
    dutch: "Tussen 15-18 of Tussen 26-30"
  },
  {
    english: "Between 18-26",
    swahili: "Kati ya 18-26",
    spanish: "Entre 18-26",
    portugese: "Entre 18-26",
    dutch: "Tussen 18-26"
  },
  {
    english: "Less than 8",
    swahili: "Chini ya 8",
    spanish: "Menos de 8",
    portugese: "Menos que 8",
    dutch: "Minder dan 8"
  },
  {
    english: "Between 8-13",
    swahili: "Kati ya 8-13",
    spanish: "Entre 8-13",
    portugese: "Entre 8-13",
    dutch: "Tussen 8-13"
  },
  {
    english: "Between 13-16",
    swahili: "Kati ya 13-16",
    spanish: "Entre 13-16",
    portugese: "Entre 13-16",
    dutch: "Tussen 13-16"
  },
  {
    english: "More than 16",
    swahili: "Zaidi ya 16",
    spanish: "Más de 16",
    portugese: "Mais que 16",
    dutch: "Meer dan 16"
  },
  {
    english: "Less than 750 or More than 2500",
    swahili: "Chini ya 750 au Zaidi ya 2500",
    spanish: "Menos de 750 o Más de 2500",
    portugese: "Menos que 750 ou Mais que 2500",
    dutch: "Minder dan 750 of Meer dan 2500"
  },
  {
    english: "Between 750-1000 or Between 2000-2500",
    swahili: "Kati ya 750-1000 au Kati ya 2000-2500",
    spanish: "Entre 750-1000 o Entre 2000-2500",
    portugese: "Entre 750-1000 ou Entre 2000-2500",
    dutch: "Tussen 750-1000 of Tussen 2000-2500"
  },
  {
    english: "Between 1800-2000 or Between 1000-1200",
    swahili: "Kati ya 1800-2000 au Kati ya 1000-1200",
    spanish: "Entre 1800-2000 o Entre 1000-1200",
    portugese: "Entre 1800-2000 ou Entre 1000-1200",
    dutch: "Tussen 1800-2000 of Tussen 1000-1200"
  },
  {
    english: "Between 1200-1800",
    swahili: "Kati ya 1200-1800",
    spanish: "Entre 1200-1800",
    portugese: "Entre 1200-1800",
    dutch: "Tussen 1200-1800"
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
