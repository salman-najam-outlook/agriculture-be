const cron = require('node-cron');
const db = require(rootPath + "/models");
const { Op } = require('sequelize');
const { syncMarketPlaceUserData } = require("../../helpers/marketplace_sync");

class UserRoleExclusionHelper {
  /**
   * Validate input data for user role operations
   * @param {number} userId - The ID of the user
   * @param {string} roleId - The ID of the role
   * @param {object} data - Additional data for the operation
   * @throws {Error} - If validation fails
   */
  static validateInputs(userId, roleId, data = {}) {
    if (!userId || !roleId) {
      throw new Error("Invalid input: userId and roleId are required.");
    }
    if (data.deactivation_reason === undefined && data.type === "deactivateUser") {
      throw new Error("Invalid input: deactivation_reason is required for deactivation.");
    }
  }

  /**
   * Construct payload for user role operations
   * @param {object} data - Data for the operation
   * @param {string} type - Operation type ('deactivateUser' or 'reactivateUser')
   * @returns {object} - Constructed payload
   */
  static constructPayload(data, type) {
    const isDeactivation = type === "deactivateUser";
    return {
      user_id: data.userId,
      role_id: data.roleId,
      deactivation_reason: isDeactivation ? data.deactivation_reason : null,
      is_active: !isDeactivation,
      deactivation_start_date: isDeactivation ? data.deactivation_start_date || new Date() : null,
      deactivation_end_date: isDeactivation ? data.deactivation_end_date || null : null,
      activation_date: isDeactivation ? null : new Date(),
      range: data.range || null,
    };
  }

  /**
   * Find or update the UserRoleExclusion record
   * @param {object} payload - Payload for the operation
   * @param {object} transaction - Sequelize transaction
   * @returns {Promise<void>}
   */
  static async findOrUpdateExclusion(payload, transaction) {
    const [exclusion, created] = await db.UserRoleExclusion.findOrCreate({
      where: { user_id: payload.user_id, role_id: payload.role_id },
      defaults: payload,
      transaction,
    });

    if (!created) {
      await exclusion.update(payload, { transaction });
    }
  }

  /**
   * Deactivate a user for a specific role
   * @param {number} userId - The ID of the user to deactivate
   * @param {string} roleId - The ID of the role to deactivate
   * @param {object} data - Additional data for deactivation
   * @returns {Promise<object>} - Success message
   */
  static async deactivateUser(userId, roleId, data) {
    this.validateInputs(userId, roleId, { ...data, type: "deactivateUser" });

    const payload = this.constructPayload({ userId, roleId, ...data }, "deactivateUser");

    return db.sequelize.transaction(async (transaction) => {
      await this.findOrUpdateExclusion(payload, transaction);
      await syncMarketPlaceUserData({ ...payload, id: userId, type: "deactivateUser" });
      return { message: "User deactivated successfully." };
    }).catch((error) => {
      console.error("Error deactivating user:", error.message);
      throw new Error("Failed to deactivate user. Please try again.");
    });
  }

  /**
   * Reactivate a user for a specific role
   * @param {number} userId - The ID of the user to reactivate
   * @param {string} roleId - The ID of the role to reactivate
   * @returns {Promise<object>} - Success message
   */
  static async reactivateUser(userId, roleId) {
    this.validateInputs(userId, roleId);

    const payload = this.constructPayload({ userId, roleId }, "reactivateUser");

    return db.sequelize.transaction(async (transaction) => {
      await this.findOrUpdateExclusion(payload, transaction);
      await syncMarketPlaceUserData({ ...payload, id: userId, type: "reactivateUser" });
      return { message: "User reactivated successfully." };
    }).catch((error) => {
      console.error("Error reactivating user:", error.message);
      throw new Error("Failed to reactivate user. Please try again.");
    });
  }

  /**
   * Automatically activate users whose deactivation period has ended
   */
  static async activateUsersAutomatically() {
    console.log('Checking for users to activate...');
    const now = new Date();

    try {
      // Find users whose deactivation period has ended
      const usersToActivate = await db.UserRoleExclusion.findAll({
        where: {
          is_active: false,
          deactivation_end_date: {
            [Op.lte]: now, // Users whose deactivation_end_date is less than or equal to now
          },
        },
      });

      if (usersToActivate.length > 0) {
        console.log(`Activating ${usersToActivate.length} users...`);

        // Activate users
        for (const user of usersToActivate) {
          user.is_active = true;
          user.deactivation_reason = null;
          user.deactivation_start_date = null;
          user.deactivation_end_date = null;
          user.activation_date = now;

          await user.save(); // Save the updated user record

          // Sync the user data to the marketplace
          const payload = {
            id: user.user_id,
            type: 'reactivateUser',
            deactivation_reason: null,
            is_active: true,
            deactivation_start_date: null,
            deactivation_end_date: null,
            activation_date: now,
            range: null, // Add range if applicable
          };

          try {
            await syncMarketPlaceUserData(payload);
            console.log(`User ${user.id} synced to marketplace successfully.`);
          } catch (syncError) {
            console.error(`Failed to sync user ${user.id} to marketplace:`, syncError.message);
          }
        }

        console.log('Users activated and synced successfully.');
      } else {
        console.log('No users to activate.');
      }
    } catch (error) {
      console.error('Error activating users:', error.message);
      throw new Error('Failed to activate users. Please check the logs for more details.');
    }
  }
}

// Schedule the cron job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running the user activation cron job...');
  await UserRoleExclusionHelper.activateUsersAutomatically();
});

module.exports = UserRoleExclusionHelper;