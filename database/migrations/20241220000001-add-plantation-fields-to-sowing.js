'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('sowing', 'plantation_id', {
      allowNull: true,
      type: Sequelize.STRING,
      unique: true,
      comment: 'Auto-generated plantation ID in format [Farm]-[Crop]-[SowingDate]-[Sequence]'
    });
    
    await queryInterface.addColumn('sowing', 'plantation_status', {
      allowNull: false,
      type: Sequelize.ENUM('active', 'inactive', 'fully_harvested'),
      defaultValue: 'active',
      comment: 'Plantation status - active, inactive, or fully_harvested'
    });
    

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('sowing', 'plantation_id');
    await queryInterface.removeColumn('sowing', 'plantation_status');
  }
}; 