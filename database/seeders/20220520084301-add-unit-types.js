'use strict';
const moment = require("moment");
const { syntheticFertilizersContentUnitTypes } = require("../../helpers/consts");
const syntheticFertilizersContentUnitsData = [];
syntheticFertilizersContentUnitTypes.forEach((item) => {
syntheticFertilizersContentUnitsData.push({
    name: item,
    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
}
);
console.log(syntheticFertilizersContentUnitsData);

module.exports = {
  async up (queryInterface, Sequelize) {     
     await queryInterface.bulkInsert("unit_types", syntheticFertilizersContentUnitsData, {});
  },
  async down (queryInterface, Sequelize) {   
     await queryInterface.bulkDelete('unit_types', syntheticFertilizersContentUnitsData, {});
  }
};
