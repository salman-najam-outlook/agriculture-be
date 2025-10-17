'use strict';
const groupName = 'PlantFungalDiseaseSign';
const optionName = [
  'Chlorosis',
  'Leaf rust',
  'Stem rust',
  'White mold',
  'Powdery mildew',
  'Leaf spots',
  'Birds eye spot',
  'Damping off on seedlings',
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
