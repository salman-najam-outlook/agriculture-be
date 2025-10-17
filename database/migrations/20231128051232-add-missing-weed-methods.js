'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const translationData =[
      {
        english: "Machete",
        hindi: "",
        marathi: "",
        nepali: "",
        spanish: "Machete",
        indonesian: "",
        arabic: "",
        portugese: "",
        french: "",
        swahili: "",
        bengali: "",
        oromo: "",
        somali: "",
        amharic: "",
        vietnamese: "",
        greek: "",
        mandarin: "",
        turkish: "",
      },
      {
        english: "Hoe",
        hindi: "",
        marathi: "",
        nepali: "",
        spanish: "Azadon",
        indonesian: "",
        arabic: "",
        portugese: "",
        french: "",
        swahili: "",
        bengali: "",
        oromo: "",
        somali: "",
        amharic: "",
        vietnamese: "",
        greek: "",
        mandarin: "",
        turkish: "",
      },
      {
        english: "mower",
        hindi: "",
        marathi: "",
        nepali: "",
        spanish: "motoguadaña",
        indonesian: "",
        arabic: "",
        portugese: "",
        french: "",
        swahili: "",
        bengali: "",
        oromo: "",
        somali: "",
        amharic: "",
        vietnamese: "",
        greek: "",
        mandarin: "",
        turkish: "",
      },
    ]

    await queryInterface.bulkInsert('global_translation_metadata',translationData)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
