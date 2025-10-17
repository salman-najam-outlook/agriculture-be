'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('weed', 'herbicideUsedUnitId');
    await queryInterface.addColumn('weed', 'herbicideUsedUnitId', {
      allowNull: true,  
      type: Sequelize.INTEGER,  
      references: { as: 'herbicideunit', model: 'units', key: 'id' },
      onDelete: 'CASCADE'      
    });
    await queryInterface.removeColumn('weed', 'herbicideRateUnitId');
    await queryInterface.addColumn('weed', 'herbicideRateUnitId', {
      allowNull: true,    
      type: Sequelize.INTEGER, 
      references: { as: 'herbiciderateunit', model: 'units', key: 'id' },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
