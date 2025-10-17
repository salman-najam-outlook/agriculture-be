'use strict';
const moment = require("moment");
const { syntheticFertilizersContentBaseUnits } = require("../../helpers/consts");
const syntheticFertilizersContentUnitListsData = [];
syntheticFertilizersContentBaseUnits.forEach((item) =>
syntheticFertilizersContentUnitListsData.push({
    name: item.name,
    abbvr: item.abbvr,
    unitType: item.unitType,
    factor: item.factor,
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  })
);
module.exports = {
  async up (queryInterface, Sequelize) {    
     await queryInterface.bulkInsert("units_list", syntheticFertilizersContentUnitListsData, {});
  },

  async down (queryInterface, Sequelize) {   
    await queryInterface.bulkDelete('units_list', syntheticFertilizersContentUnitListsData, {});
  }
};
