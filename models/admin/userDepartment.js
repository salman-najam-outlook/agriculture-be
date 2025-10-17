'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDepartment extends Model {
    static associate(models) {

      this.belongsTo(models.Departments, {
        foreignKey: 'department_id',
        targetKey: 'id',
      });

      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });

    }
  }
  UserDepartment.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      department_id: {
        type: DataTypes.STRING,
        references: {
          model: 'Departments',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.STRING,
        references: {
            model: 'Users',
            key: 'id',
          },
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'UserDepartment',
      tableName: 'user_department',
    }
  );
  return UserDepartment;
};
