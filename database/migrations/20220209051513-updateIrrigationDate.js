'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('irrigation', 'endDate');
    await queryInterface.removeColumn('irrigation', 'startDate');
  },

  down: async (queryInterface, Sequelize) => {
    //
  },
};
