'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsToMany(models.UserRole, {
        as: 'user_role_assoc',
        through: 'UserRoleMembershipMap',
        foreignKey: 'user_role_id',
        otherKey: 'membership_id',
      });
      this.belongsTo(models.Organization, {
        foreignKey: 'org_id',
        as: 'org_assoc',
        allowNull: true
      });
      this.belongsTo(models.Organization, {
        foreignKey: 'subOrgId',
        as: 'subOrg',
        allowNull: true
      })
      this.hasOne(models.UserMembershipMap, {
        foreignKey: 'membership_id',
        sourceKey: 'id',
        as: 'membershipMap',
      });
      this.hasMany(models.UserRoleMembershipMap, {
        foreignKey: 'membership_id',
        sourceKey: 'id',
        as: 'userRoleMembershipMap',
      });
      this.hasMany(models.UserRoleMembershipPermissions, {
        foreignKey: 'membership_plan_id',
        sourceKey: 'id',
        as: 'roleModulePermAssoc',
      });
      this.belongsToMany(models.Modules, {
        through: models.UserMembershipModulesPermission,
        foreignKey: 'userMembershipId',
        otherKey: 'moduleId',
        as: 'accessToModules',
      });

      this.hasMany(models.activationKeys, {
        foreignKey: 'membership_type',
        sourceKey: 'id',
      });
    }
  }
  Membership.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      membership_type: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      satellite_report: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      advanced_report: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      membership_duration: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      membership_duration_in_days: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      membership_duration_unit: {
        allowNull: false,
        type: DataTypes.ENUM(['day(s)', 'week(s)', 'month(s)', 'year(s)']),
        defaultValue: 'day(s)',
      },
      membership_fee: {
        allowNull: false,
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      default_status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      org_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'organization',
          key: 'id',
        },
      },
      subOrgId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'organizations',
          key: 'id',
        },
      },
      plan_type:{
        type: DataTypes.ENUM('global', 'enterprise'),
        allowNull: false
      },
      feeUnitType:{
        type:DataTypes.STRING,
        allowNull:true,
      },

      allowed_users:{
        type:DataTypes.INTEGER,
        allowNull:true,
      },
      allowed_farms:{
        type:DataTypes.INTEGER,
        allowNull:true,
      },
      advanceReportTypeUnit:{
        type:DataTypes.STRING,
        allowNull:true,
      },
      advancedReportUnit:{
        type:DataTypes.STRING,
        allowNull:true,
      },
      satelliteReportTypeUnit:{
        type:DataTypes.STRING,
        allowNull:true,
      },
      deforestationReport:{
        type:DataTypes.INTEGER,
        allowNull:true,
      },
      deforestationReportTypeUnit:{
        type:DataTypes.STRING,
        allowNull:true,
      },
      deforestationReportUnit:{
        type:DataTypes.STRING,
        allowNull:true,
      },
      basicFarmLevelReport:{
        type:DataTypes.INTEGER,
        allowNull:true,
      },
      advancedFarmLevelReport:{
        type:DataTypes.INTEGER,
        allowNull:true,
      },
      largeAreaReport:{
        type:DataTypes.INTEGER,
        allowNull:true,
      },
    },
    {
      sequelize,
      tableName: 'user_membership',
      modelName: 'Membership',
    }
  );
  return Membership;
};
