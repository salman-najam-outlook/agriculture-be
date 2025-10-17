'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn("satellite_reports", "requestId", {
      type: Sequelize.STRING,
      allowNull: true
    })
  },
  down: async (queryInterface, Sequelize) => {

  }
};
