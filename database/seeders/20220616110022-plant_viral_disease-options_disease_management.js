'use strict';
const groupName = 'PlantViralDisease';
const optionName = [
  'Mosaic virus',
  'Potato virus',
  'Spotted wilt virus',
  'Plum pox virus',
  'Yellow leaf curl virus',
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
