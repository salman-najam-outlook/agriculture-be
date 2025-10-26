'use strict';
const _ = require('lodash');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Roles, {
        through: 'AdminUserRoles',
        foreignKey: 'user_id',
        otherKey: 'role_id',
        as: 'admin_user_roles',
      });
          this.hasMany(models.AdminUserRoles, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as: 'admin_user_roles_assoc',
      });
      this.belongsToMany(models.Roles, {
        through: 'UserRoles',
        foreignKey: 'user_id',
        otherKey: 'role_id',
        as: 'user_role_assoc',
      });
      this.belongsToMany(models.Departments, {
        through: 'UserDepartment',
        foreignKey: 'user_id',
        otherKey: 'department_id',
        as: 'user_dept_assoc',
      });
      this.belongsToMany(models.Membership, {
        through: 'UserMembershipMap',
        foreignKey: 'user_id',
        otherKey: 'membership_id',
        as: 'user_membership',
      });
      this.belongsToMany(models.Roles, {
        through: 'UserRoles',
        foreignKey: 'user_id',
        otherKey: 'role_id',
        as: 'user_role',
      });
      this.hasOne(models.UserMembershipMap, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as: 'membershipMap',
      });
      this.hasOne(models.BuyingStationFarmer, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: "offlineFarmerData"
      });
      this.hasOne(models.CacaoBuyingStationFarmer, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: "offlineCacaoFarmerData"
      });
      this.hasOne(models.BuyingStationFarmer, {
        foreignKey: 'buyingStationOrderId',
        sourceKey: 'id',
        as: "buyingStation"
      });
      // this.hasOne(models.CacaoBuyingStationFarmer, {
      //   foreignKey: 'buyingStationOrderId',
      //   sourceKey: 'id',
      //   as: "cacaoBuyingStation"
      // });
      this.hasOne(models.UserRegistrationToken, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'regToken',
      });
      this.hasMany(models.UserDevices, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'devices',
      });
      this.hasMany(models.UserMfaOtps, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as: 'mfaOtps',
      });
      this.hasMany(models.activationKeys, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as: 'activation',
      });
      this.hasMany(models.BuyingStationOrder, {
        foreignKey: 'farmerId',
        sourceKey: 'id',
        as: 'buyingStationOrder',
      });
      this.hasMany(models.CacaoPurchaseOrder, {
        foreignKey: 'farmerId',
        sourceKey: 'id',
        as: 'cacaoBuyingStationOrder',
      });

      this.hasMany(models.CacaoDryingProcess,{
        foreignKey:'dryRegisterUserId',
        sourceKey:'id',
        as:'cacaoDryingProcess'
      })
      this.hasOne(models.UserCurrencySettings, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'currencySelected',
      });
      this.hasMany(models.ParchmentCoffee, {
        foreignKey: 'dryMillingUserId',
        sourceKey: 'id',
        as: 'dryMillingParchment',
      });
      this.hasMany(models.UserMembershipMap, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as: 'manyMembershipMap',
      });
      this.hasMany(models.BuyingStationOrder, {
        foreignKey: 'buyingStationId',
        sourceKey: 'id',
        as: 'buyingStationPurchaseOrders',
      });
      this.hasMany(models.CacaoPurchaseOrder, {
        foreignKey: 'buyingStationId',
        sourceKey: 'id',
        as: 'cacaoBuyingStationPurchaseOrders',
      });
      this.hasMany(models.BuyingStationProcessingBatch, {
        foreignKey: 'buyingStationId',
        sourceKey: 'id',
        as: 'buyingStationProcessingBatches',
      });
      this.hasMany(models.user_farm, {
        foreignKey: "userId",
        as: "farms",
      });
      this.hasMany(models.Equipment, {
        foreignKey: "userID",
        as: "equipment",
      });
      this.hasMany(models.ticketSelectedUser, {
        foreignKey: "userID",
          as: 'ticketSelectedUsers'
      });
      this.hasOne(models.UserScore, {
        as: 'userScore',
        foreignKey: 'userId',
      });

      this.belongsTo(models.Organization, {
        foreignKey: 'organization', 
        as: 'org',
      });

      this.belongsTo(models.Organization, {
        foreignKey: 'subOrganizationId', 
        as: 'subOrg',
      });
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          const firstName = this.firstName ?? '';
          const middleName = this.middleName ?? '';
          const lastName = this.lastName ?? '';
        
          let fullName = firstName;
        
          if (middleName) {
            fullName += ` ${middleName}`;
          }
        
          if (lastName) {
            fullName += ` ${lastName}`;
          }
        
          return fullName.trim() || null;
        },
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      gender: DataTypes.STRING(10),
      id_number:DataTypes.STRING(20),
      countryCode: DataTypes.MEDIUMINT,
      mobile: DataTypes.STRING(15),
      email: DataTypes.STRING(100),
      unverifiedMobile: DataTypes.STRING(15),
      unverifiedEmail: DataTypes.STRING(100),
      password: DataTypes.STRING,
      language: DataTypes.STRING,
      countryId: DataTypes.STRING,
      countryIsoCode: DataTypes.STRING,
      country: DataTypes.STRING,
      stateId: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      village: DataTypes.STRING,
      otp: DataTypes.INTEGER,
      otp_channel: DataTypes.STRING,
      buisnessName: DataTypes.STRING,
      address: DataTypes.TEXT,
      fax: DataTypes.STRING,
      website: DataTypes.STRING,
      localPremiseId: DataTypes.STRING,
      federalPremiseId: DataTypes.STRING,
      dimitraUserId: DataTypes.STRING,
      userType: DataTypes.ENUM("owner", "breeder", "offline", "online"),
      registrationUserType: DataTypes.STRING,//ENUM("ekspor", "koperasi","keduanya","cooperative_union", "cooperative_society", "company", "estate", "agent"),
      adminType: DataTypes.ENUM(
        "connected_farmer",
        "connected_coffee",
        "connected_cacao"
      ),
      pushNotification: DataTypes.BOOLEAN,
      notificationSound: DataTypes.BOOLEAN,
      isLogin: DataTypes.BOOLEAN,
      verified: DataTypes.BOOLEAN,
      synced: DataTypes.BOOLEAN,
      // isFirstLogin: DataTypes.BOOLEAN,
      profilePicUrl: DataTypes.STRING,
      // isLivestockUser: DataTypes.STRING,
      app_type: DataTypes.STRING,
      profilePicS3Key: DataTypes.STRING,
      profilePicName: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      isFirstLogin: DataTypes.BOOLEAN,
      registration_type: DataTypes.ENUM('mobile', 'email'),
      loginAttempts: DataTypes.STRING,
      lockedToken: DataTypes.STRING,
      isLivestockUser: DataTypes.STRING,
      organization: {
        type: DataTypes.INTEGER,
        references: {
          model: 'organization',
          key: 'id',
        },
      },
      subOrganizationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'organization',
          key: 'id',
        },
      },
      partnerTribe: DataTypes.STRING,
      buyingStationPic: DataTypes.JSON,
      partnerPic: DataTypes.JSON,
      managerTribe: DataTypes.STRING,
      dryMillingPic: DataTypes.JSON,
      userTribe: DataTypes.STRING,
      facilityPicUrl: DataTypes.STRING,
      facilityPicS3Key: DataTypes.STRING,
      facilityPicName: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      permissionToContact: DataTypes.BOOLEAN,
      preRegistrationStatus: DataTypes.ENUM('inprogress', 'complete'),
      preRegistrationToken: DataTypes.STRING,
      source: DataTypes.STRING,
      farm_limit: DataTypes.INTEGER,
      friendly_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      eori_number:DataTypes.STRING,
      licenseNumber: DataTypes.STRING,
      companyId: DataTypes.STRING,
      recordId:DataTypes.STRING,
      NoOfFarmsPlanningtoonboard: DataTypes.STRING,
      is_mfa_enabled: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: 'Flag to enable/disable MFA for user',
      },
      mfa_method: {
        type: DataTypes.ENUM('mobile', 'email'),
        allowNull: false,
        defaultValue: 'email',
        comment: 'Method used for MFA authentication',
      },
      mfa_enrolled_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Timestamp when MFA was first enrolled',
      },
      failed_mfa_attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Counter for failed MFA attempts',
      },
      last_failed_attempt_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Timestamp of last failed MFA attempt',
      },
      mfa_locked_until: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Timestamp until which MFA is locked due to multiple failed attempts',
      }
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'user',
    }
  );
  return User;
};
