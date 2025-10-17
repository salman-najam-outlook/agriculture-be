'use strict';
const groupName = 'FarmTypes';
const optionName = ['Zone', 'Paddock', 'Camp', 'Pen', 'Segment', 'Pasture'];

module.exports = {
  async up(queryInterface, Sequelize) {
    const setOptions = [];
    for (let name of optionName) {
      let isNameExist = await queryInterface.sequelize.query(
        'select * from options WHERE name=? and groupName=?',
        {
          plain: true,
          replacements: [name, groupName],
          type: queryInterface.sequelize.QueryTypes.SELECT,
        }
      );
      if (isNameExist !== null) continue;
      setOptions.push({ name, groupName });
    }

    if (setOptions.length > 0)
      await queryInterface.bulkInsert('options', setOptions, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('options', { groupName }, {});
  },
};
