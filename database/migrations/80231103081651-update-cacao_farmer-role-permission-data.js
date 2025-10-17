'use strict';

const isdeleted = '2023-11-03 09:45:00';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkUpdate(
        'user_role_membership_module_permission',
        { isdeleted },
        {
          user_role_id: 'cacao_farmer',
          module_id: {
            [Sequelize.Op.notIn]: Sequelize.literal(`(SELECT id FROM modules WHERE parent_module_id = 'cacao' AND id LIKE 'cacao_farmer%')`),
          },
        },
        { transaction }
      );

      await queryInterface.bulkUpdate(
        'user_role_modules',
        { isdeleted },
        {
          user_role_id: 'cacao_farmer',
          module_id: {
            [Sequelize.Op.notIn]: Sequelize.literal(`(SELECT id FROM modules WHERE parent_module_id = 'cacao' AND id LIKE 'cacao_farmer%')`),
          },
        },
        { transaction }
      );

      const cacaoFarmerModules = await queryInterface.select(
        null,
        'modules',
        {
          where: {
            parent_module_id: 'cacao',
            id: { [Sequelize.Op.like]: 'cacao_farmer%' },
          },
          transaction,
        },
      );

      const existingFarmerRoleModules = await queryInterface.select(
        null,
        'user_role_modules',
        {
          where: {
            user_role_id: 'cacao_farmer',
            module_id: {
              [Sequelize.Op.in]: Sequelize.literal(
                `(SELECT id FROM modules WHERE parent_module_id = 'cacao' AND id LIKE 'cacao_farmer%')`
              ),
            },
          },
          transaction,
        },
      );

      const existingFarmerModuleIds = existingFarmerRoleModules.map((userRoleModule) => userRoleModule.module_id);
      const nonExistingFarmerModules = cacaoFarmerModules.filter(
        (module) => !existingFarmerModuleIds.includes(module.id)
      );

      if (nonExistingFarmerModules.length > 0) {
        const newFarmerRoleModules = nonExistingFarmerModules.map((module) => ({
          id: `cacao_farmer_${module.id}`,
          module_id: module.id,
          user_role_id: 'cacao_farmer',
          default_enabled: true,
        }));

        await queryInterface.bulkInsert('user_role_modules', newFarmerRoleModules, { transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkUpdate(
        'user_role_membership_module_permission',
        { isdeleted: null },
        {
          user_role_id: 'cacao_farmer',
          isdeleted,
          module_id: {
            [Sequelize.Op.notIn]: Sequelize.literal(`(SELECT id FROM modules WHERE parent_module_id = 'cacao' AND id LIKE 'cacao_farmer%')`),
          },
        },
        { transaction }
      );
      await queryInterface.bulkUpdate(
        'user_role_modules',
        { isdeleted: null },
        {
          user_role_id: 'cacao_farmer',
          isdeleted,
          module_id: {
            [Sequelize.Op.notIn]: Sequelize.literal(`(SELECT id FROM modules WHERE parent_module_id = 'cacao' AND id LIKE 'cacao_farmer%')`),
          },
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
