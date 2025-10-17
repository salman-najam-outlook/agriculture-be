'use strict';
const { Model } = require('sequelize');
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  class GeneratedKeys extends Model {
    static associate(models) {

        this.belongsTo(models.Membership, {
          foreignKey: 'membership_type',
          targetKey: 'id',
          as: 'membership_assoc'
        });
  
        this.belongsTo(models.user, {
          foreignKey: 'generated_by',
          targetKey: 'id',
          as: 'generated_assoc'
        });

        this.belongsTo(models.user, {
          foreignKey: 'sales_manager',
          targetKey: 'id',
          as: 'sales_manager_assoc'
        });
        this.belongsTo(models.Roles, {
          foreignKey: 'admin_role',
          targetKey: 'id',
          as: 'role_assoc'
        });

      this.belongsTo(models.Organization, {
        foreignKey: 'subOrgId',
        as: 'subOrg',
        allowNull: true
      })

      this.belongsTo(models.Organization, {
        foreignKey: 'org_id',
        as: 'org',
        allowNull: true
      })
  
      }
  }
  GeneratedKeys.init(
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
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
          generated_by: {
            type: DataTypes.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            allowNull: false
          },
          sales_manager: {
            type: DataTypes.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            allowNull: true
          },
          admin_role: {
            type: DataTypes.STRING,
            references: {
              model: 'roles',
              key: 'id',
            },
            allowNull: false
          },
          number_of_keys: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          comment: {
            type: DataTypes.STRING,
            allowNull: true
          },
          progress: {
            type: DataTypes.STRING,
            allowNull: true
          },
          job_id: {
            type: DataTypes.STRING,
            allowNull: true
          },
          csv_url: {
            type: DataTypes.STRING,
            allowNull: true
          },
          pdf_url: {
            type: DataTypes.STRING,
            allowNull: true
          },
          is_deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 0
          },
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
          },
          createdAt: {
            allowNull: true,
            type: DataTypes.DATE,
            get: function() {
              return moment.utc(this.getDataValue('createdAt')).format('YYYY-MM-DD hh:mm:ss');
            }
          },
          updatedAt: {
            allowNull: true,
            type: DataTypes.DATE,
            get: function() {
              return moment.utc(this.getDataValue('updatedAt')).format('YYYY-MM-DD hh:mm:ss');
            }
          },
    },
    {
      sequelize,
      modelName: 'generatedKeys',
      tableName: 'generated_keys',
    }
  );
  return GeneratedKeys;
};
