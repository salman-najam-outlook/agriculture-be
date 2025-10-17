'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('plantation_traceability', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      plantation_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'sowing',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        comment: 'Reference to sowing ID (sowing.id) for reliable traceability'
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        comment: 'User who owns this plantation'
      },
      activity_type: {
        allowNull: false,
        type: Sequelize.STRING(50),
        comment: 'Type of agricultural activity - validated in application layer'
      },
      activity_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: 'ID of the specific activity record'
      },
      activity_date: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: 'Date when the activity was performed'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add indexes for better performance
    await queryInterface.addIndex('plantation_traceability', ['plantation_id']);
    await queryInterface.addIndex('plantation_traceability', ['user_id']);
    await queryInterface.addIndex('plantation_traceability', ['activity_type']);
    await queryInterface.addIndex('plantation_traceability', ['activity_id']);
    await queryInterface.addIndex('plantation_traceability', ['activity_date']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('plantation_traceability');
  }
}; 