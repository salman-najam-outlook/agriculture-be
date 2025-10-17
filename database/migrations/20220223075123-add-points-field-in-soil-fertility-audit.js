'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('soil_fertility_audit', 'points', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('soil_fertility_audit', 'points');
  }
};
