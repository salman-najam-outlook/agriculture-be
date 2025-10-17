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
          user_role_id: 'dry_milling',
          module_id: {
            [Sequelize.Op.notIn]: Sequelize.literal(`(
                SELECT id FROM modules
                WHERE (parent_module_id = 'cacao' AND (id LIKE 'cacao_dry_milling%' OR id LIKE 'cacao_warehouse%'))
                OR (parent_module_id = 'coffee' AND id LIKE 'coffee/dry-milling%')
                OR (parent_module_id = 'warehouse')
              )`),
          },
        },
        { transaction }
      );

      await queryInterface.bulkUpdate(
        'user_role_modules',
        { isdeleted },
        {
          user_role_id: 'dry_milling',
          module_id: {
            [Sequelize.Op.notIn]: Sequelize.literal(`(
                SELECT id FROM modules
                WHERE (parent_module_id = 'cacao' AND (id LIKE 'cacao_dry_milling%' OR id LIKE 'cacao_warehouse%'))
                OR (parent_module_id = 'coffee' AND id LIKE 'coffee/dry-milling%')
                OR (parent_module_id = 'warehouse')
              )`),
          },
        },
        { transaction }
      );

      const dryMillingModules = await queryInterface.select(
        null,
        'modules',
        {
          where: {
            [Sequelize.Op.or]: [
              {
                parent_module_id: 'cacao',
                id: {
                  [Sequelize.Op.or]: [
                    { [Sequelize.Op.like]: 'cacao_dry_milling%' },
                    { [Sequelize.Op.like]: 'cacao_warehouse%' },
                  ]
                }
              },
              {
                parent_module_id: 'coffee',
                id: { [Sequelize.Op.like]: 'coffee/dry-milling%' }
              },
              {
                parent_module_id: 'warehouse',
              }
            ]
          },
          transaction,
        },
      );

      const existingRoleModules = await queryInterface.select(
        null,
        'user_role_modules',
        {
          where: {
            user_role_id: 'dry_milling',
            module_id: {
              [Sequelize.Op.in]: Sequelize.literal(`(
                  SELECT id FROM modules 
                  WHERE (parent_module_id = 'cacao' AND (id LIKE 'cacao_dry_milling%' OR id LIKE 'cacao_warehouse%'))
                  OR (parent_module_id = 'coffee' AND id LIKE 'coffee/dry-milling%')
                  OR (parent_module_id = 'warehouse')
                )`),
            },
          },
          transaction,
        },
      );

      const existingModuleIds = existingRoleModules.map((userRoleModule) => userRoleModule.module_id);
      const nonExistingModules = dryMillingModules.filter(
        (module) => !existingModuleIds.includes(module.id)
      );

      if (nonExistingModules.length > 0) {
        const newRoleModules = nonExistingModules.map((module) => ({
          id: `dry_milling_${module.id}`,
          module_id: module.id,
          user_role_id: 'dry_milling',
          default_enabled: true,
        }));

        await queryInterface.bulkInsert('user_role_modules', newRoleModules, { transaction });
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
          user_role_id: 'dry_milling',
          isdeleted,
          module_id: {
            [Sequelize.Op.notIn]: Sequelize.literal(`(
                SELECT id FROM modules
                WHERE (parent_module_id = 'cacao' AND (id LIKE 'cacao_dry_milling%' OR id LIKE 'cacao_warehouse%'))
                OR (parent_module_id = 'coffee' AND id LIKE 'coffee/dry-milling%')
                OR (parent_module_id = 'warehouse')
              )`),
          },
        },
        { transaction }
      );
      await queryInterface.bulkUpdate(
        'user_role_modules',
        { isdeleted: null },
        {
          user_role_id: 'dry_milling',
          isdeleted,
          module_id: {
            [Sequelize.Op.notIn]: Sequelize.literal(`(
                SELECT id FROM modules
                WHERE (parent_module_id = 'cacao' AND (id LIKE 'cacao_dry_milling%' OR id LIKE 'cacao_warehouse%'))
                OR (parent_module_id = 'coffee' AND id LIKE 'coffee/dry-milling%')
                OR (parent_module_id = 'warehouse')
              )`),
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
