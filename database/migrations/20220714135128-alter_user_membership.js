'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('user_membership', 'membership_duration_in_days', {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: "membership_duration_unit"
    });


  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('user_membership', 'membership_duration_in_days');
  }
};
