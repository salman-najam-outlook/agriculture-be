'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('soil_types', 'description', {
      type: Sequelize.TEXT,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('soil_types', 'description');
  },
};
