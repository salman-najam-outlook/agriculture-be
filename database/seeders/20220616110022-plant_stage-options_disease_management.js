'use strict';
const groupName = 'PlantStage';
const optionName = [
  'Germination',
  'Tillering',
  'Branching',
  'Budding',
  'Flowering',
  'Days after sowing',
  'Three leaf stage',
  'Stem elongation',
  'Flag leaf',
  'Bulb initiation',
  'Bulb formation',
  'Grain filling',
  'Ripening/maturity',
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
