'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('soil_prep_practice', 'startDate', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
    queryInterface.changeColumn('soil_prep_practice', 'endDate', {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('soil_prep_practice', 'startDate', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    queryInterface.changeColumn('soil_prep_practice', 'endDate', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};
