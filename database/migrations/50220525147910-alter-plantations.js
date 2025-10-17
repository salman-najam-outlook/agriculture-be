'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('plantations', 'coffee_variety');
    await queryInterface.removeColumn('plantations', 'coffee_species');

    await queryInterface.addColumn("plantations", "coffee_variety", {
       type: Sequelize.INTEGER,
        references: {
          model: 'coffee_variety',
          key: 'id',
        },
        allowNull: true
    });
    await queryInterface.addColumn("plantations", "coffee_species", {
          type: Sequelize.INTEGER,
        references: {
          model: 'coffee_species',
          key: 'id',
        },
        allowNull: true
    });
  },
  down: async (queryInterface, Sequelize) => {
  
  }
};


