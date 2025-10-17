'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('DiseaseManagements', 'daysAfterSowing', {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: 'for crop_stage type day_after_sowing only',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('DiseaseManagements', 'daysAfterSowing');
  },
};
