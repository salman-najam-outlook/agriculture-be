'use strict';
const groupName = 'PlantFungalDisease';
const optionName = [
  'Rust',
  'Smut',
  'Black spot',
  'Downy Mildew',
  'Powdery Mildew',
  'Apple scab',
  'Fusarium Wilt',
  'Soft rot',
  'Club root',
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
