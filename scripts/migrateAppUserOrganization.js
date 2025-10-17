const app = require('../app');
const db = require(rootPath + '/models');
const { Op } = require('sequelize');
const moment = require('moment');

/**
 * Get a valid activation key
 *
 * @param {number} activationKeyId new activation key id (id column of `activation_key` table)
 * @param {number} organizationId new organization id to migrate the user to (id column of `organization` table)
 * @returns {Promise<null|ActivationKey>}
 */
async function getValidActivationKey(activationKeyId, organizationId) {
  try {
    const activationKey = await db.activationKeys.findOne({
      where: {
        id: activationKeyId,
        status: 'unassigned',
        is_deleted: false,
        org_id: organizationId,
      },
    });
    return activationKey;
  } catch (error) {
    console.error('Get activation failed: ', error.message);
    return null;
  }
}

/**
 * Get valid app user
 *
 * @param {number} userId app user id to migrate (id column of `users` table)
 * @returns {null|User}
 */
async function getValidAppUser(userId) {
  try {
    const user = await db.user.findOne({
      where: {
        id: userId,
        [Op.or]: [{ userType: { [Op.ne]: 'offline' } }, { userType: { [Op.is]: null } }],
      },
    });
    return user;
  } catch (error) {
    console.error(`Get user failed for User ID: ${userId}: `, error.message);
    return null;
  }
}

/**
 * Unassign users from old activation key and assign to new activation key
 *
 * @param {object} migrateConfig Configuration for migration
 * @param {User} migrateConfig.user App user object
 * @param {number} migrateConfig.organizationId  new organization id to migrate the user to (id column of `organization` table)
 * @param {number} migrateConfig.activationKeyId new activation key id (id column of `activation_key` table)
 * @param {object|undefined} migrateConfig.transaction sequelize transaction
 */
async function migrateActivationKey({ user, organizationId, transaction, activationKeyId }) {
  try {
    // Unassign old activation key for user
    await db.activationKeys.update(
      {
        user_id: null,
        user_email: null,
        status: 'unassigned',
      },
      {
        where: {
          user_id: user.id,
          org_id: { [Op.ne]: organizationId },
        },
        transaction,
      }
    );

    // Assign new activation key
    await db.activationKeys.update(
      {
        user_id: user.id,
        user_email: user.email,
        phone_no: user.mobile,
        status: 'activated',
      },
      {
        where: {
          id: activationKeyId,
        },
        transaction,
      }
    );
  } catch (error) {
    console.error('Old activation key unassign failed: ', error.message);
    throw error;
  }
}

/**
 * Get offline farmer Ids
 * @param {number} userId app user id to migrate (id column of `users` table)
 * @returns {Promise<number[]>}
 */
async function getOfflineFarmerIds(userId) {
  try {
    const userFarms = await db.user_farm.findAll({
      attributes: ['userId'],
      where: {
        technicianId: userId,
        userId: { [Op.ne]: userId },
      },
    });
    const farmerIds = userFarms.map((userFarm) => userFarm.userId);
    return Array.from(new Set(farmerIds));
  } catch (error) {
    console.error('Get offline farmer IDs failed: ', error.message);
    throw error;
  }
}

/**
 * Removes old data on `users_user_membership_map` table and generate new ones for offline farmer
 *
 * @param {object} migrateConfig Configuration for migration
 * @param {number[]} migrateConfig.offlineFarmerIds Ids of farmers to migrate (id column of `users` table)
 * @param {number} migrateConfig.userId app user id to migrate (id column of `users` table)
 * @param {number} migrateConfig.userMembershipId app user membership id to migrate (id column of `user_membership` table)
 * @param {number} migrateConfig.organizationId new organization id to migrate the user to (id column of `organization` table)
 * @param {object|undefined} migrateConfig.transaction sequelize transaction
 *
 */
async function migrateUserMembershipMap({
  offlineFarmerIds,
  userId,
  userMembershipId,
  organizationId,
  transaction = undefined,
}) {
  try {
    const newUserMembershipMaps = [{ user_id: userId, membership_id: userMembershipId }];

    if (offlineFarmerIds.length) {
      const userMemberships = await db.sequelize.query(
        `
        SELECT um.id FROM user_role_membership_map AS urmm
        INNER JOIN user_membership AS um
        ON urmm.membership_id = um.id
        WHERE
          urmm.user_role_id = 'coffee_farmer'
          AND urmm.membership_id NOT IN (
            SELECT
              membership_id
            FROM
              user_role_membership_map
            WHERE
              user_role_id = 'buying_station'
          )
          AND um.org_id = :organizationId
        LIMIT 1;
      `,
        { type: db.Sequelize.QueryTypes.SELECT, replacements: { organizationId } }
      );
      if (!userMemberships.length) {
        throw new Error(`No eligible membership found for offline farmer for User ID: ${userId}`);
      }

      const selectedMembershipId = userMemberships[0].id;
      for (const offlineFarmerId of offlineFarmerIds) {
        newUserMembershipMaps.push({
          user_id: offlineFarmerId,
          membership_id: selectedMembershipId,
        });
      }
    }

    await db.UserMembershipMap.destroy({
      where: {
        user_id: {
          [Op.in]: [...offlineFarmerIds, userId],
        },
      },
      transaction,
    });

    await db.UserMembershipMap.bulkCreate(newUserMembershipMaps, {
      transaction,
    });
  } catch (error) {
    console.error('Migrate user membership mapping failed: ', error.message);
    throw error;
  }
}

/**
 * Migrates users to new organization. (Updates `organization` column on `users` table)
 *
 * @param {object} migrateConfig Configuration for migration
 * @param {number[]} migrateConfig.userIds Ids of users to migrate (id column of `users` table)
 * @param {number} migrateConfig.organizationId new organization id to migrate the user to (id column of `organization` table)
 * @param {object|undefined} migrateConfig.transaction sequelize transaction
 */
async function updateUsersOrganization({ userIds, organizationId, transaction }) {
  try {
    await db.user.update(
      {
        organization: organizationId,
      },
      {
        where: {
          id: { [Op.in]: userIds },
        },
        transaction,
      }
    );
  } catch (error) {
    console.error('Migrate users organization failed: ', error.message);
    throw error;
  }
}

const membershipTypesWithGeneratedPermissionsCache = new Set();
/**
 * Generates permissions for activation key membership type
 *
 * @param {object} config Configuration for generating permissions
 * @param {ActivationKey} config.activationKey Activation key to generate permission for
 * @param {object|undefined} config.transaction sequelize transaction
 */
async function generatePermissionsForActivationKeyMembership({ activationKey, transaction }) {
  try {
    if (membershipTypesWithGeneratedPermissionsCache.has(activationKey.membership_type)) return;

    const userRoleMembershipMaps = await db.UserRoleMembershipMap.findAll({
      where: { membership_id: activationKey.membership_type },
    });

    const userRoleIds = userRoleMembershipMaps.map((userRoleMembershipMap) => userRoleMembershipMap.user_role_id);
    const userRoleModules = await db.UserRoleModule.findAll({
      where: {
        user_role_id: {
          [Op.in]: userRoleIds,
        },
        isdeleted: {
          [Op.is]: null,
        },
        [Op.or]: [{ organization_id: { [Op.is]: null } }, { organization_id: activationKey.org_id }],
      },
      include: [
        {
          model: db.Modules,
          where: {
            isDeleted: {
              [Op.is]: null,
            },
          },
          attributes: [],
          required: true,
          as: 'module',
        },
      ],
      order: [['createdAt', 'ASC']],
    });

    const organizationRoleModules = userRoleModules.reduce((prev, roleModule) => {
      const prevRoleModuleIdx = prev.findIndex((existingRoleModule) => {
        return (
          existingRoleModule.user_role_id === roleModule.user_role_id &&
          existingRoleModule.module_id === roleModule.module_id
        );
      });
      const hasPrevRoleModule = prevRoleModuleIdx !== -1;

      if (roleModule.organization_id) {
        if (hasPrevRoleModule) {
          prev[prevRoleModuleIdx] = roleModule;
        } else {
          prev.push(roleModule);
        }
      } else {
        if (hasPrevRoleModule) {
          if (!prev[prevRoleModuleIdx].organization_id) {
            prev[prevRoleModuleIdx] = roleModule;
          }
        } else {
          prev.push(roleModule);
        }
      }
      return prev;
    }, []);

    const permissions = await db.Permissions.findAll({ raw: true });
    const userMembershipModulePermissions = organizationRoleModules.reduce(
      (previousValue, { module_id, user_role_id, default_enabled }) => {
        permissions.forEach(({ id: permissionId }) => {
          previousValue.push({
            id: `${user_role_id}_${activationKey.membership_type}_${module_id}_${permissionId}`,
            user_role_id,
            membership_plan_id: activationKey.membership_type,
            module_id,
            permission_id: permissionId,
            createdAt: moment.utc(),
            updatedAt: moment.utc(),
            permitted: default_enabled,
          });
        });
        return previousValue;
      },
      []
    );

    await db.UserRoleMembershipPermissions.bulkCreate(userMembershipModulePermissions, {
      updateOnDuplicate: ['user_role_id', 'module_id', 'membership_plan_id', 'permission_id'],
      transaction,
    });
    membershipTypesWithGeneratedPermissionsCache.add(activationKey.membership_type);
  } catch (error) {
    console.error(
      `Generate permissions for membership of Aactivation Key ID: ${activationKey.id} failed: `,
      error.message
    );
    throw error;
  }
}

/**
 * Migrate app user to new organization
 *
 * @param {object} migrateConfig Configuration for migration
 * @param {number} migrateConfig.activationKeyId  new activation key id (id column of `activation_key` table)
 * @param {number} migrateConfig.userId app user id to migrate (id column of `users` table)
 * @param {number} migrateConfig.organizationId new organization id to migrate the user to (id column of `organization` table)
 *
 */
async function migrateAppUser({ activationKeyId, userId, organizationId }) {
  const transaction = await db.sequelize.transaction();
  try {
    const appUser = await getValidAppUser(userId);
    if (!appUser) {
      throw new Error(`User ID: ${userId} is not a valid app user ID`);
    }

    const activationKey = await getValidActivationKey(activationKeyId, organizationId);
    if (!activationKey) {
      throw new Error(`Activation Key ID: ${activationKeyId} invalid for User ID ${userId}`);
    }

    const offlineFarmerIds = await getOfflineFarmerIds(userId);

    await migrateActivationKey({
      activationKeyId,
      organizationId,
      transaction,
      user: appUser,
    });

    await migrateUserMembershipMap({
      offlineFarmerIds,
      userId,
      organizationId,
      userMembershipId: activationKey.membership_type,
      transaction,
    });

    await updateUsersOrganization({ organizationId, transaction, userIds: [...offlineFarmerIds, userId] });

    await generatePermissionsForActivationKeyMembership({ activationKey, transaction });
    await transaction.commit();
    console.log(`Migrate success for User ID: ${userId}`);
  } catch (error) {
    await transaction.rollback();
    console.error(`Migrate error for User ID ${userId}: `, error.message);
  }
}

/**
 * *NOTE:
 * Script Requirement:
 *  - Need new activation key id to assign
 *  - Need user id to migrate. This should be app user id only not offline farmer user id.
 *  - Need new organization id of user
 *
 * Script Details:
 *  - Migrates app user to new organization
 *  - Migrate offline farmer of app user to new organization
 *  - Generates permissions for membership type if permissions does not exist
 */
const migrateConfigs = [
  {
    // New activation key ID to assign
    activationKeyId: 229463,
    // User ID of app users(can include technician)
    userId: 125830,
    // New organization ID
    organizationId: 35,
  },
];

async function main() {
  try {
    for (const migrateConfig of migrateConfigs) {
      await migrateAppUser(migrateConfig);
    }
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
