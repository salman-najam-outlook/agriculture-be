'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
 
      await queryInterface.addColumn('user_events', 'farmId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'user_farms',
          key: 'id',
        },
      });
      await queryInterface.addColumn('user_events', 'zoneId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'geofences',
          key: 'id',
        },
      });
      await queryInterface.addColumn('user_events', 'calendarMetadataId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'agronomic_calendar_metadata',
          key: 'id',
        },
      });
      await queryInterface.addColumn('user_events', 'triggerDate', {
        type: Sequelize.DATE,
        allowNull: true,
      });
      await queryInterface.addColumn('user_events', 'tz', {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {},
};
