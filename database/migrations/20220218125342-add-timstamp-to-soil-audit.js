'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('soil_fertility_audit', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false
    });
    await queryInterface.addColumn('soil_fertility_audit', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('soil_fertility_audit', 'createdAt');
    await queryInterface.removeColumn('soil_fertility_audit', 'updatedAt');
  }
};
