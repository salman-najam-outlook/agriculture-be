'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('soil_information', 'calcium', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
   
    await queryInterface.addColumn('soil_information', 'magnesium', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
   
    await queryInterface.addColumn('soil_information', 'iron', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
   
    await queryInterface.addColumn('soil_information', 'zinc', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    
    await queryInterface.addColumn('soil_information', 'boron', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('soil_information', 'calcium');
    await queryInterface.removeColumn('soil_information', 'magnesium');
    await queryInterface.removeColumn('soil_information', 'iron');
    await queryInterface.removeColumn('soil_information', 'zinc');
    await queryInterface.removeColumn('soil_information', 'boron');
  }
};
