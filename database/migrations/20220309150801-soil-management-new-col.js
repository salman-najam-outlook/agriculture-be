'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('soil_management', 'segment', {
      type: Sequelize.INTEGER,
      after: 'farm',
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('soil_management', 'segment');
  },
};
