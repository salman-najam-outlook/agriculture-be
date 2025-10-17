'use strict';
const groupName = 'PlantBacterialDisease';
const optionName = [
  'Wilt',
  'Wildfire of tobacco',
  'Blight of beans',
  'Fire blight',
  'Crown gall',
  'Soft rot',
  'Aster yellows',
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
