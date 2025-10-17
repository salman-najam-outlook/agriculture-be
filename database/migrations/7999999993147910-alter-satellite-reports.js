'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("satellite_reports", "farmId", {
        type: Sequelize.INTEGER,
        allowNull: true
    });
    await queryInterface.addColumn("satellite_reports", "geofenceId", {
        type: Sequelize.INTEGER,
        allowNull: true
    });
  },
  down: async (queryInterface, Sequelize) => {
  
  }
};


