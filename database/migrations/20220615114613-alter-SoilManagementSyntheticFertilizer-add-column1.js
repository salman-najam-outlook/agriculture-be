'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {   
     queryInterface.addColumn('soil_management_synthetic_fertilizers', 'requestIdSyntheticFertilizer', {
      type: Sequelize.STRING,
      default: ''
     });

     queryInterface.addColumn('soil_management_synthetic_fertilizers', 'requestStatusSyntheticFertilizer', {
      type: Sequelize.STRING,
      default: ''
     });
  },

  async down (queryInterface, Sequelize) {
  queryInterface.removeColumn('soil_management_synthetic_fertilizers', 'requestIdSyntheticFertilizer', {});
  queryInterface.removeColumn('soil_management_synthetic_fertilizers', 'requestStatusSyntheticFertilizer', {});
  }
};
