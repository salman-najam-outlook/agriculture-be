'use strict';
const moment = require("moment");
const { syntheticFertilizersContentBaseUnits } = require("../../helpers/consts");

module.exports = {
  async up (queryInterface, Sequelize) {    
     await queryInterface.bulkInsert("units_list", syntheticFertilizersContentBaseUnits,  );
  },

  async down (queryInterface, Sequelize) {   
    await queryInterface.bulkDelete('units_list', syntheticFertilizersContentBaseUnits, {});
  }
};
