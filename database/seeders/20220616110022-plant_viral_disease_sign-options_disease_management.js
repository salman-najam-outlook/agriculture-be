'use strict';
const groupName = 'PlantViralDiseaseSign';
const optionName = [
  'Maize streak virus',
  'Mosaic leaf pattern',
  'Crinkled leaves',
  'Yellowed leaves',
  'Plant stunting',
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
