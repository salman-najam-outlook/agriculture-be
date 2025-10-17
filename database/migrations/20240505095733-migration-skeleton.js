'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      // Add sidebar permission for reports all admin
      const a_roles = ['super_admin', 'solok_admin','internal_internal_admin']
      const modulesN = ['reports_parent']
      const adminModules = []
      for (const role of a_roles) {
        adminModules.push({
          id: `${role}_${modulesN[0]}`,
          name: `Farmer oma sy report_${Math.random()}`,
          parent_module_id: 'reports',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      const oma_roles = ['oma_oma_admin']
      const oma_module = ['avocado', 'avocado_tree']

      for (const module1 of oma_module) {
        adminModules.push({
          id: `${oma_roles[0]}_${module1}`,
          name: `Farmer oma 2 sy report_${Math.random()}`,
          parent_module_id: 'reports',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      await queryInterface.bulkInsert('modules', adminModules, {
        transaction,
      });

      const permissions = await queryInterface.select(null, 'permissions', { transaction });

      const userRoleMembershipModulePermissions2 = []
      for (const permission of permissions) {
        for (const rol of a_roles) {
          // role for avocado_farmer
          userRoleMembershipModulePermissions2.push({
            id: `${rol}_reports_parent_${permission.id}`,
            role_id: rol,
            module_id: `${rol}_reports_parent`,
            permission_id: permission.id,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        for (const mm of oma_module) {
          userRoleMembershipModulePermissions2.push({
            id: `oma_oma_admin_${mm}_${permission.id}`,
            role_id: 'oma_oma_admin',
            module_id: `oma_oma_admin_${mm}`,
            permission_id: permission.id,
            permitted: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        }
      }
      await queryInterface.bulkInsert('admin_users_roles_modules_permissions', userRoleMembershipModulePermissions2, {
        transaction,
      });
      console.log("Execute successfully")
      await transaction.commit()
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
