'use strict';
const { Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class ActivationKeys extends Model {
    static associate(models) {

        this.belongsTo(models.Membership, {
          foreignKey: 'membership_type',
          targetKey: 'id',
          as: 'membership_assoc'
        });
  
        this.belongsTo(models.user, {
          foreignKey: 'user_id',
          targetKey: 'id',
          as: 'user_assoc'
        });
  
        this.belongsTo(models.generatedKeys, {
          foreignKey: 'generated_key_id',
          targetKey: 'id'
        });
        this.belongsTo(models.Organization, {
          foreignKey: 'org_id',
          targetKey: 'id'
        });
        this.belongsTo(models.Organization, {
          foreignKey: 'subOrgId',
          targetKey: 'id',
          as: 'subOrg'
        });
      }
  }
  ActivationKeys.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      license_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        defaultValue: null,
        allowNull: true,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      membership_type: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user_membership',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM(['activated', 'assigned', 'unassigned']),
        allowNull: false,
        defaultValue: 'unassigned',
      },
      generated_key_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'generated_keys',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'CASCADE',
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      membershipValidity: {
        type: DataTypes.DATE,
        get() {
          const extension = this.getDataValue('membershipExtendedDays');
          const membershipValidity = this.getDataValue('membershipValidity');

          if (membershipValidity) {
            return moment
              .utc(membershipValidity, process.env.DB_DATE_FORMAT)
              .format(process.env.DISPLAY_DATE_FORMAT);
          }

          return null;
        },
      },
      membershipExtendedBy: DataTypes.INTEGER,
      membershipExtendedDays: DataTypes.INTEGER,
      membershipExtensionReason: DataTypes.TEXT,
      org_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      subOrgId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'organizations',
          key: 'id',
        },
      }

    },
    {
      sequelize,
      modelName: 'activationKeys',
      tableName: 'activation_key',
    }
  );
  return ActivationKeys;
};
