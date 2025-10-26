'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserMfaOtps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user',
      });
    }
  }
  
  UserMfaOtps.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      otp_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Hashed OTP code',
      },
      method: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: 'Method used to send OTP (mobile/email)',
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Expiration timestamp for OTP',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
      },
      used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Flag indicating if OTP has been used',
      },
    },
    {
      sequelize,
      modelName: 'UserMfaOtps',
      tableName: 'user_mfa_otps',
      timestamps: false,
      underscored: true,
    }
  );
  
  return UserMfaOtps;
};

