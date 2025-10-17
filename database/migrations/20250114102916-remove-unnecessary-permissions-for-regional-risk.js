'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Delete records where role_id is not 'dds_superadmin' or 'super_admin' and module_id contains '_dds_superregional_risk_assessment'
      const deleteQuery = `
        DELETE FROM admin_users_roles_modules_permissions
        WHERE role_id NOT IN ('dds_superadmin', 'super_admin')
        AND module_id LIKE '%_dds_regional_risk_assessment%'
      `;

      await queryInterface.sequelize.query(deleteQuery, {
        type: Sequelize.QueryTypes.DELETE,
        transaction,
      });

      await transaction.commit();
      console.log('Permissions deleted successfully.');
    } catch (error) {
      await transaction.rollback();
      console.error('Error deleting permissions:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    // Note: Reverting a DELETE operation is not straightforward as it requires knowing the exact data that was deleted.
    // For simplicity, this down method will be left empty.
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // No revert operation defined
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error('Error in down method:', error);
      throw error;
    }
  },
};