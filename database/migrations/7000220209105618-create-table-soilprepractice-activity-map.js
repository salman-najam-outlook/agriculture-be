'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    ALTER TABLE soil_prep_practice MODIFY COLUMN activityId int NULL;
  `);
    await queryInterface.createTable('map_soil_prep_practice_activity', {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      soil_prep_practiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'soil_prep_practice',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      activityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'soil_prep_activity',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    }
    );

    await queryInterface.addIndex('map_soil_prep_practice_activity', ['soil_prep_practiceId', 'activityId'], {
      unique: true,
      name: 'soil_prep_practiceId_activityId_index',
    });

  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('map_soil_prep_practice_activity');
  }
};
