'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('unit_types', 'label', {
      type: Sequelize.STRING(600),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('unit_types', 'label');
  },
};
