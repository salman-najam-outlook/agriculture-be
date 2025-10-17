'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tutorial extends Model {
    static associate(models) {
      this.belongsTo(models.Organization, {
        foreignKey: 'organization_id',
        as: 'organization',
        allowNull: true
      });
    }
  }
  Tutorial.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Tutorial title'
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Tutorial description'
      },
      url: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: 'Tutorial URL (video, PDF, or document link)'
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Organization ID - null means available to all organizations'
      },
                  user_type: {
                    type: DataTypes.ENUM('app', 'admin'),
                    allowNull: false,
                    defaultValue: 'app',
                    comment: 'User type: app or admin'
                  },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Whether tutorial is active'
      },
      display_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Display order for sorting'
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'User ID who created the tutorial'
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'User ID who last updated the tutorial'
      }
    },
    {
      sequelize,
      modelName: 'Tutorial',
      tableName: 'tutorials',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return Tutorial;
};

