"use strict";

const crop_types = [
  "Acai palm",
  "Cashew",
  "Clover",
  "Nutmeg & mace",
  "Olives",
  "Pomegranate",
  "Watermelon",
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('options', 
      crop_types.map((type) => ({
        name: type,
        groupName: "crop-type",
        region: "general",
        countryCode: "general"
      })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('options', {}, {});
  },
};
