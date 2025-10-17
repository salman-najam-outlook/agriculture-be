'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkUpdate('coffee_variety', 
      { status: null },
    );
    await queryInterface.changeColumn('coffee_variety', 'status', {
      type: Sequelize.BOOLEAN,
      defaulVaule: true
    })
    await queryInterface.bulkUpdate('coffee_variety', 
      { status: true },
    );
  },
  down: async (queryInterface, Sequelize) => {
  }
};
