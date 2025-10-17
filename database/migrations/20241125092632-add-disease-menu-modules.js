"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const userRoleIds = ["farmer"];
      const organizationCodes = ["dimitra"];

      const modules = [
        {
          id: "disease_management/add_crop_disease_data",
          name: "Add Crop Disease Data",
        },
        {
          id: "disease_management/detect_crop_disease",
          name: "Detect Crop Disease",
        },
      ];

      // Insert new modules under the parent module 'my_crops'
      const newModules = modules.map((mod) => ({
        id: mod.id,
        name: mod.name,
        parent_module_id: "my_crops",
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("modules", newModules, { transaction });

      // Insert user role modules
      const userRoleModules = [];
      modules.forEach((mod) => {
        userRoleIds.forEach((userRoleId) => {
          userRoleModules.push({
            id: `${userRoleId}_${mod.id}`,
            user_role_id: userRoleId,
            module_id: mod.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });
      await queryInterface.bulkInsert("user_role_modules", userRoleModules, {
        transaction,
      });

      // Fetch organizations
      const organizations = await queryInterface.select(null, "organization", {
        where: { code: { [Sequelize.Op.in]: organizationCodes } },
        transaction,
      });
      const organizationIds = organizations.map(
        (organization) => organization.id
      );

      // Fetch user memberships
      const userMemberships = await queryInterface.select(
        null,
        "user_membership",
        {
          where: { org_id: { [Sequelize.Op.in]: organizationIds } },
          transaction,
        }
      );

      // Fetch permissions
      const permissions = await queryInterface.select(null, "permissions", {
        transaction,
      });

      if (
        permissions &&
        permissions.length > 0 &&
        userMemberships &&
        userMemberships.length > 0
      ) {
        const userRoleMembershipModulePermissions = [];
        for (const userMembership of userMemberships) {
          for (const permission of permissions) {
            for (const userRoleId of userRoleIds) {
              for (const module of modules) {
                userRoleMembershipModulePermissions.push({
                  id: `${userRoleId}_${userMembership.id}_${module.id}_${permission.id}`,
                  user_role_id: userRoleId,
                  module_id: module.id,
                  membership_plan_id: userMembership.id,
                  permission_id: permission.id,
                  permitted: 1,
                  isdeleted: null,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                });
              }
            }
          }
        }

        await queryInterface.bulkInsert(
          "user_role_membership_module_permission",
          userRoleMembershipModulePermissions,
          {
            transaction,
          }
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {},
};
