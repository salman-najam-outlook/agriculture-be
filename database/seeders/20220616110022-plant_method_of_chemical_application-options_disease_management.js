'use strict';
const groupName = 'MethodOfChemicalApplication';
const optionName = [
  'Seed treatment',
  'Soil drenching',
  'Dry, wet foliar spraying',
  'Fumigation',
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
