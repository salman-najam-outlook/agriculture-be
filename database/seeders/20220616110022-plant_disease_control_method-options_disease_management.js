'use strict';
const groupName = 'PlantDiseaseControlMethod';
const optionName = ['Cultural/natural/manual', 'Chemical'];

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
