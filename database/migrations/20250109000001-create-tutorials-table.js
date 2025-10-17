'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tutorials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Tutorial title'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Tutorial description'
      },
      url: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: 'Tutorial URL (video, PDF, or document link)'
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Organization ID - null means available to all organizations',
        references: {
          model: 'organization',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
                  user_type: {
                    type: Sequelize.ENUM('app', 'admin'),
                    allowNull: false,
                    defaultValue: 'app',
                    comment: 'User type: app or admin'
                  },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Whether tutorial is active'
      },
      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Display order for sorting'
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'User ID who created the tutorial',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'User ID who last updated the tutorial',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Add indexes for better performance
    await queryInterface.addIndex('tutorials', ['organization_id']);
    await queryInterface.addIndex('tutorials', ['is_active']);
    await queryInterface.addIndex('tutorials', ['display_order']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tutorials');
  }
};

