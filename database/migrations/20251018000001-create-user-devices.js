'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      deviceId: {
        allowNull: false,
        type: Sequelize.STRING(255),
        comment: 'Unique identifier for the device (hash of device info)'
      },
      deviceType: {
        allowNull: true,
        type: Sequelize.STRING(50),
        comment: 'Type of device: mobile, tablet, desktop, etc.'
      },
      browser: {
        allowNull: true,
        type: Sequelize.STRING(100),
        comment: 'Browser name'
      },
      browserVersion: {
        allowNull: true,
        type: Sequelize.STRING(50),
        comment: 'Browser version'
      },
      os: {
        allowNull: true,
        type: Sequelize.STRING(100),
        comment: 'Operating system'
      },
      osVersion: {
        allowNull: true,
        type: Sequelize.STRING(50),
        comment: 'OS version'
      },
      deviceName: {
        allowNull: true,
        type: Sequelize.STRING(255),
        comment: 'Friendly device name'
      },
      ipAddress: {
        allowNull: true,
        type: Sequelize.STRING(45),
        comment: 'IP address used during device registration'
      },
      userAgent: {
        allowNull: true,
        type: Sequelize.TEXT,
        comment: 'Full user agent string'
      },
      lastUsedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      isTrusted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: 'Whether this device is trusted by the user'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Add unique constraint on userId and deviceId combination
    await queryInterface.addIndex('user_devices', ['userId', 'deviceId'], {
      unique: true,
      name: 'unique_user_device'
    });

    // Add index on userId for faster lookups
    await queryInterface.addIndex('user_devices', ['userId'], {
      name: 'idx_user_devices_userId'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_devices');
  }
};


