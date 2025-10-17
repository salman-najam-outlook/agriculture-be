'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('options', 'optionCode', {
    //   type: Sequelize.STRING,
    //   unique: true,
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('options', 'optionCode');
  },
};
