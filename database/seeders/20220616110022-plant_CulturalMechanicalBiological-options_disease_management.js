'use strict';
const groupName = 'PlantCulturalMechanicalBiological';
const optionName = [
  'Mulching',
  'Crop rotation',
  'Remove diseased plant',
  'Planting resistant cultivars',
  'Use of bio fumigants',
  'Use of oils and soaps',
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const set = optionName.map((name) => ({ name, groupName }));
    await queryInterface.bulkDelete('options', { groupName }, {});
    await queryInterface.bulkInsert('options', set, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('options', { groupName }, {});
  },
};
