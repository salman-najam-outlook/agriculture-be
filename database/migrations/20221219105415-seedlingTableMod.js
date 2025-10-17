'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('seedlings', 'no_of_coffee_trees', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('seedlings', 'time_to_bear_fruit', {
      type: Sequelize.DATEONLY,
    });
    await queryInterface.addColumn('seedlings', 'bearing_fruit_status', {
      type: Sequelize.ENUM('producing_fruits', 'need_more_time'),
    });
    await queryInterface.addColumn('seedlings', 'seedlingStatus', {
      type: Sequelize.ENUM('available', 'completed'),
      defaultValue: 'available',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('seedlings', 'no_of_coffee_trees');
    await queryInterface.removeColumn('seedlings', 'time_to_bear_fruit');
    await queryInterface.removeColumn('seedlings', 'bearing_fruit_status');
    await queryInterface.removeColumn('seedlings', 'seedlingStatus');
  },
};
