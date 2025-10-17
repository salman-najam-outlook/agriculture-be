'use strict';

const groupName = 'PrimaryCropGoals';
const optionName = [
  { optionCode: 'increase_yield', name: 'Increasing The Yields' },
  { optionCode: 'maximize_income', name: 'Maximize Income' },
  {
    optionCode: 'optimize_fertilizer',
    name: 'Optimize The Use Of Synthetic Fertilizers',
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      for (const { name, optionCode } of optionName) {
        let existence = await queryInterface.rawSelect(
          'options',
          { where: { name, groupName } },
          ['id']
        );

        if (existence == null) {
          await queryInterface.insert(null, 'options', {
            name,
            groupName,
            optionCode,
          });
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {},
};
