'use strict';
const groupName = 'CropPractices';
const practices = [
  'Earthing',
  'propping',
  'Detrashing',
  'Topping',
  'Nipping',
  'Pruning',
  'Others',
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (const name of practices) {
        let optionId = await queryInterface.rawSelect(
          'options',
          { where: { name, groupName } },
          ['id']
        );

        if (optionId == null) {
          await queryInterface.insert(null, 'options', {
            name,
            groupName,
          });
        }
      }
    } catch (err) {
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('options', { groupName });
    } catch (err) {
      console.log(err, '=============================');
      throw err;
    }
  },
};
