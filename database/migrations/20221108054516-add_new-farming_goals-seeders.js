'use strict';

const groupName = 'farming-goals';
const farmingGoals = [
  {
    name: 'Increase Crop Health',
    optionCode: 'increase_crop_health_farming_goals',
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let goal of farmingGoals) {
      let optionId = await queryInterface.rawSelect(
        'options',
        { where: { groupName, name: goal.name } },
        ['id']
      );

      // create if not exist
      if (optionId === null) {
        await queryInterface.insert(null, 'options', {
          groupName,
          name: goal.name,
          optionCode: goal.optionCode,
        });
      } else {
        queryInterface.bulkUpdate(
          'options',
          { optionCode: goal.optionCode },
          {
            id: optionId,
          }
        );
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
