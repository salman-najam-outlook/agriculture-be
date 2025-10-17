'use strict';
const setGlobalSetting = [
  {
    currencyId: 1,
    codeActivationTimeQty: 20,
    codeActivationTimeUom: 'hours',
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert(
      'GlobalSettings',
      setGlobalSetting,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('GlobalSettings', null, {});
  },
};
