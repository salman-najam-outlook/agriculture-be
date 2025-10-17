'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('soil_management', 'daysAfterSowing', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.addColumn('soil_management', 'cropHeight', {
        type: Sequelize.FLOAT,
        allowNull: true,
      }),
      queryInterface.addColumn('soil_management', 'cropHeightUnits', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('soil_management', 'daysAfterSowing'),
      queryInterface.removeColumn('soil_management', 'cropHeight'),
      queryInterface.removeColumn('soil_management', 'cropHeightUnits'),
    ]);
  },
};
