"use strict";
const translations = [
  {
    english: "Area too Large. Maximum area limit is 1000 hectares",
    swahili: "Eneo ni Kubwa Sana. Kikomo cha eneo kikubwa ni Hektari 1000",
    spanish: "Área demasiado grande. El límite máximo de área es de 1000 hectáreas",
    portugese: "Área muito Grande. O limite máximo de área é de 1000 hectares",
    dutch: "Gebied te Groot. Maximale oppervlakte limiet is 1000 hectare"
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
