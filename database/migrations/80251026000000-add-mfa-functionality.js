'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add MFA columns to users table
    await queryInterface.addColumn('users', 'is_mfa_enabled', {
      type: Sequelize.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: 'Flag to enable/disable MFA for user'
    });

    await queryInterface.addColumn('users', 'mfa_method', {
      type: Sequelize.ENUM('mobile', 'email'),
      allowNull: false,
      defaultValue: 'email',
      comment: 'Method used for MFA authentication'
    });

    await queryInterface.addColumn('users', 'mfa_enrolled_at', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: 'Timestamp when MFA was first enrolled'
    });

    await queryInterface.addColumn('users', 'failed_mfa_attempts', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: 'Counter for failed MFA attempts'
    });

    await queryInterface.addColumn('users', 'last_failed_attempt_at', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: 'Timestamp of last failed MFA attempt'
    });

    await queryInterface.addColumn('users', 'mfa_locked_until', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: 'Timestamp until which MFA is locked due to multiple failed attempts'
    });

    // Create user_mfa_otps table
    await queryInterface.createTable('user_mfa_otps', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      otp_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Hashed OTP code'
      },
      method: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: 'Method used to send OTP (mobile/email)'
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: 'Expiration timestamp for OTP'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Flag indicating if OTP has been used'
      },
    });

    // Add indexes for performance
    await queryInterface.addIndex('user_mfa_otps', ['user_id'], {
      name: 'idx_user_mfa_otps_user_id'
    });

    await queryInterface.addIndex('user_mfa_otps', ['expires_at'], {
      name: 'idx_user_mfa_otps_expires_at'
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop indexes
    await queryInterface.removeIndex('user_mfa_otps', 'idx_user_mfa_otps_user_id');
    await queryInterface.removeIndex('user_mfa_otps', 'idx_user_mfa_otps_expires_at');

    // Drop user_mfa_otps table
    await queryInterface.dropTable('user_mfa_otps');

    // Remove MFA columns from users table
    await queryInterface.removeColumn('users', 'mfa_locked_until');
    await queryInterface.removeColumn('users', 'last_failed_attempt_at');
    await queryInterface.removeColumn('users', 'failed_mfa_attempts');
    await queryInterface.removeColumn('users', 'mfa_enrolled_at');
    await queryInterface.removeColumn('users', 'mfa_method');
    await queryInterface.removeColumn('users', 'is_mfa_enabled');
  },
};

