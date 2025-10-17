'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('global_translation_metadata', 'indonesian', {
      type: Sequelize.STRING(),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('global_translation_metadata', 'indonesian');
  },
};
