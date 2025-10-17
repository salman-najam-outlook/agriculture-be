"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Insert parent module
      let parentModuleEntry = {
        id: `app_eudr_due_diligence`,
        name: "EUDR Due Diligence",
        createdAt: new Date(),
        updatedAt: new Date(),
        module_type: "app_user",
      };
      await queryInterface.bulkInsert("parent_modules", [parentModuleEntry], { transaction });

      // Insert EUDR assessment module
      const modules = [
        {
          id: `app_eudr_due_diligence/eudr_assessment`,
          name: "EUDR Assessment",
          parent_module_id: `app_eudr_due_diligence`,
          isDeleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      await queryInterface.bulkInsert("modules", modules, { transaction });

      // Define user roles and organization codes
      const userRoleIds = ["farmer"];
      const organizationCodes = ["dimitra"];

      // Insert user role modules
      const userRoleModules = modules.map((mod) => ({
        id: `${userRoleIds[0]}_${mod.id}`,
        user_role_id: userRoleIds[0],
        module_id: mod.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await queryInterface.bulkInsert("user_role_modules", userRoleModules, { transaction });

      // Fetch organizations
      const organizations = await queryInterface.sequelize.query(
        `SELECT id FROM organization WHERE code IN (:codes)`,
        {
          replacements: { codes: organizationCodes },
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        }
      );
      const organizationIds = organizations.map((organization) => organization.id);

      // Fetch user memberships
      const userMemberships = await queryInterface.sequelize.query(
        `SELECT id FROM user_membership WHERE org_id IN (:orgIds)`,
        {
          replacements: { orgIds: organizationIds },
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        }
      );

      // Fetch permissions
      const permissions = await queryInterface.sequelize.query(
        `SELECT id FROM permissions`,
        {
          type: Sequelize.QueryTypes.SELECT,
          transaction,
        }
      );

      // Insert user role membership module permissions
      if (permissions.length > 0 && userMemberships.length > 0) {
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
          { transaction }
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete("user_role_membership_module_permission", {
        module_id: {
          [Sequelize.Op.like]: 'app_eudr_due_diligence%'
        }
      }, { transaction });

      await queryInterface.bulkDelete("user_role_modules", {
        module_id: {
          [Sequelize.Op.like]: 'app_eudr_due_diligence%'
        }
      }, { transaction });

      await queryInterface.bulkDelete("modules", {
        id: {
          [Sequelize.Op.like]: 'app_eudr_due_diligence%'
        }
      }, { transaction });

      await queryInterface.bulkDelete("parent_modules", {
        id: 'app_eudr_due_diligence'
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },
};