'use strict';
const groupName = 'PlantBacterialDiseaseSign';
const optionName = [
  'Bacterial ooze',
  'Fruit spotting',
  'Crown gall',
  'Bacterial streaming',
  'Water soaked lesions',
  'Canker',
  'Leaf spot with yelow halo',
  'Shepherds crook ends on woody plants',
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
