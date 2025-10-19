'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDevices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with User model
      this.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  
  UserDevices.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      deviceId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Unique identifier for the device (hash of device info)'
      },
      deviceType: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'Type of device: mobile, tablet, desktop, etc.'
      },
      browser: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Browser name'
      },
      browserVersion: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'Browser version'
      },
      os: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Operating system'
      },
      osVersion: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'OS version'
      },
      deviceName: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: 'Friendly device name'
      },
      ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true,
        comment: 'IP address used during device registration'
      },
      userAgent: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Full user agent string'
      },
      lastUsedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      isTrusted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Whether this device is trusted by the user'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: 'user_devices',
      modelName: 'UserDevices',
      timestamps: true,
      underscored: false,
      indexes: [
        {
          unique: true,
          fields: ['userId', 'deviceId'],
          name: 'unique_user_device'
        },
        {
          fields: ['userId'],
          name: 'idx_user_devices_userId'
        }
      ]
    }
  );
  
  return UserDevices;
};


