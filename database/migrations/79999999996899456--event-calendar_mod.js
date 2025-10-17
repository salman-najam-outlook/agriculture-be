'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
 
      await queryInterface.addColumn('user_event_calendars', 'dailyDate', {
        type: Sequelize.DATE,
        allowNull: true,
      });
  
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {},
};
