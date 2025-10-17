'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('irrigation', 'irrigationSchedule');
    await queryInterface.addColumn('irrigation', 'irrigationSchedule', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'irrigation_schedule',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    //
  },
};
