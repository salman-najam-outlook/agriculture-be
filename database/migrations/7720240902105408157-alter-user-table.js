'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.changeColumn('users', 'NoOfFarmsPlanningtoonboard', {
      type: Sequelize.STRING,
      allowNull: true,
      defaulVaule: null
    });

  },
  down: async (queryInterface, Sequelize) => {

  },
};
