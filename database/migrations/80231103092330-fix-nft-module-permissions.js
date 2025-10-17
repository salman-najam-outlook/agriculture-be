'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkUpdate(
        'modules',
        { isDeleted: null },
        { isDeleted: '0000-00-00 00:00:00' },
        { transaction }
      );
      const organizations = await queryInterface.select(null, 'organization', {
        where: { code: { [Sequelize.Op.ne]: 'oma' } },
      });
      const organizationIds = organizations.map((organization) => organization.id);
      const omaOrganization = await queryInterface.select(null, 'organization', {
        where: { code: 'oma' },
      });
      const omaOrganizationIds = omaOrganization.map((organization) => organization.id);
      const userMemberships = await queryInterface.select(null, 'user_membership', {
        where: { org_id: { [Sequelize.Op.in]: organizationIds } },
        transaction,
      });
      const userMembershipIds = userMemberships.map((membership) => membership.id);
      if (userMembershipIds && userMembershipIds.length > 0) {
        await queryInterface.bulkDelete(
          'user_role_membership_module_permission',
          {
            [Sequelize.Op.or]: [
              { membership_plan_id: { [Sequelize.Op.in]: userMembershipIds } },
              { user_role_id: { [Sequelize.Op.ne]: 'farmer' } },
            ],
            module_id: 'nft',
          },
          { transaction }
        );
      }

      await queryInterface.bulkDelete(
        'user_role_modules',
        {
          module_id: 'nft',
          user_role_id: { [Sequelize.Op.ne]: 'farmer' },
        },
        { transaction }
      );

      await queryInterface.bulkUpdate(
        'user_role_modules',
        { default_enabled: false },
        { module_id: 'nft' },
        { transaction }
      );

      for (const organizationId of omaOrganizationIds) {
        const existingRoleModules = await queryInterface.select(null, 'user_role_modules', {
          where: {
            user_role_id: 'farmer',
            module_id: 'nft',
            organization_id: organizationId,
          },
          transaction,
        });

        if (existingRoleModules.length > 0) {
          await queryInterface.bulkUpdate(
            'user_role_modules',
            {
              default_enabled: true,
            },
            {
              user_role_id: 'farmer',
              module_id: 'nft',
              organization_id: organizationId,
            },
            { transaction }
          );
        } else {
          await queryInterface.insert(
            null,
            'user_role_modules',
            {
              id: `farmer_nft_${organizationId}`,
              user_role_id: 'farmer',
              module_id: 'nft',
              default_enabled: true,
              organization_id: organizationId,
            },
            { transaction }
          );
        }
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
