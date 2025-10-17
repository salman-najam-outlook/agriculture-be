'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Update permissions for super_admin role
      const updateQuery = `
        UPDATE admin_users_roles_modules_permissions
        SET permitted = 0
        WHERE module_id != 'super_admin_dds_regional_risk_assessment'
        AND role_id = 'super_admin'
      `;

      await queryInterface.sequelize.query(updateQuery, {
        type: Sequelize.QueryTypes.UPDATE,
        transaction,
      });

      await transaction.commit();
      console.log('Permissions updated successfully.');
    } catch (error) {
      await transaction.rollback();
      console.error('Error updating permissions:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Revert permissions for super_admin role
      const revertQuery = `
        UPDATE admin_users_roles_modules_permissions
        SET permitted = 1
        WHERE module_id != 'super_admin_dds_regional_risk_assessment'
        AND role_id = 'super_admin'
      `;

      await queryInterface.sequelize.query(revertQuery, {
        type: Sequelize.QueryTypes.UPDATE,
        transaction,
      });

      await transaction.commit();
      console.log('Permissions reverted successfully.');
    } catch (error) {
      await transaction.rollback();
      console.error('Error reverting permissions:', error);
      throw error;
    }
  },
};