"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      // this.belongsTo(models.EnterprisePlan, {
      //   foreignKey: 'planId',
      //   targetKey: 'id',
      //   as: 'plan_assoc'
      // });
      this.hasMany(models.MapUserOrganization, {
        foreignKey: 'organizationId',
        sourceKey: 'id',
        as: 'mapUserOrganization'
      });
      this.hasMany(models.Membership, {
        foreignKey: 'org_id',
        sourceKey: 'id',
        as: 'memberships',
      });

      this.belongsTo(models.Organization, {
        foreignKey: 'parentId',
        as: 'parent'
      });

      // Many-to-Many relationship with Product
      this.belongsToMany(models.Product, {
        through: models.OrganizationProduct,
        foreignKey: 'organizationId',
        as: 'products'
      });

      this.hasMany(models.user, {
        foreignKey: 'organization',
        as: 'users',
      });

      this.belongsTo(models.user, {
        foreignKey: 'primaryUserId',
        as: 'primaryUser'
      });

    }
  }
  Organization.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
          get() {
          const rawValue = this.getDataValue('name');
          if (rawValue) {
            const parts = rawValue.split('_');
            // Check if there's an underscore and if the part after it looks like a timestamp
            if (parts.length > 1 && /^\d+$/.test(parts[parts.length - 1])) {
              return parts.slice(0, -1).join('_'); // Exclude the last part
            }
          }
          return rawValue; // Return original if no timestamp suffix found or no underscore
        }
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
      },
      splashScreen: {
        type: DataTypes.STRING,
      },
      registrationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      activationKeysAllowed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      activationKeysUsed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      paymentStatus: {
        type: DataTypes.ENUM("paid", "inpaid", "pending"),
        allowNull: false,
        defaultValue: "pending",
      },
      status: {
        type: DataTypes.ENUM(
          "inProcess",
          "active",
          "deactivated"
        ),
        allowNull: false,
        defaultValue: "deactivated",
      },
      subscriptionEndDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      planId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dimitraPointSystem: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      satelliteReportsAllowed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      advancedReportsAllowed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      weatherReportsAllowed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
      },
      recordId: {
        type: DataTypes.STRING(60),
      },
      is_logo_hide: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_splash_hide: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      custom_otp: {
        type: DataTypes.STRING(10)
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'organizations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      isSubOrganization: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      licenseId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accessmentReportUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isTest: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      primaryUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      },
    },
    {
      sequelize,
      modelName: "Organization",
      tableName: "organization",
    }
  );
  return Organization;
};