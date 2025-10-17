'use strict';
const groupName = 'PlantPartAffected';
const optionName = [
  'Leaves',
  'Stem',
  'Grain',
  'Tuber',
  'Fruit',
  'Roots',
  'Flowers',
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
