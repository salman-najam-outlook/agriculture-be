'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkUpdate('coffee_species', 
      { status: null },
    );
    await queryInterface.changeColumn('coffee_species', 'status', {
      type: Sequelize.BOOLEAN,
      defaulVaule: true
    })
    await queryInterface.bulkUpdate('coffee_species', 
      { status: true },
    );
  },
  down: async (queryInterface, Sequelize) => {
  }
};
