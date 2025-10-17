"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.sequelize.query(`
    ALTER TABLE map_buying_station_farmer_user ADD UNIQUE KEY upsert_index (userId);
  `);


  },
  down: async (queryInterface, Sequelize) => {

  },
};
