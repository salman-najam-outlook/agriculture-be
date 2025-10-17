'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('irrigation', 'cropVariety');
  },

  down: async (queryInterface, Sequelize) => {
    //
  },
};
