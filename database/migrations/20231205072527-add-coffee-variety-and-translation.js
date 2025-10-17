"use strict";

const { QueryTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const translations = [
      {
        english: "Blend",
        hindi: "मिश्रित",
        marathi: "मिश्रण",
        spanish: "Mezcla",
        indonesian: "Campuran",
        portugese: "Mistura",
        nepali: "मिश्रण",
        french: "Mélange",
        arabic: "خلطة",
        swahili: "Mchanganyiko",
        bengali: "মিশ্রণ",
        oromo: "Haraya",
        somali: "Dhowaan",
        vietnamese: "Hỗn hợp",
        amharic: "በረኛ",
        greek: "Μείγμα",
        mandarin: "混合",
        japanese: "ブレンド",
        turkish: "Karışım",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    try {
      const coffeeSpeciesData = await queryInterface.sequelize.query(
        "SELECT * FROM coffee_species WHERE name = 'Arabica' OR name = 'Robusta' OR name = 'Liberica' OR  name = 'Hybrid'",
        {
          type: QueryTypes.SELECT,
        }
      );

      let coffeeVarietyData = [];
      coffeeSpeciesData.forEach((coffeeSpecies) => {
        coffeeVarietyData.push({
          name: "Blend",
          coffee_species: coffeeSpecies.id,
          status: "Active",
          isDeleted: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
      await queryInterface.bulkInsert("coffee_variety", coffeeVarietyData);
      await queryInterface.bulkInsert(
        "global_translation_metadata",
        translations
      );
    } catch (error) {
      console.error("Error:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
