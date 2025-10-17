'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('user_role_modules', 'organization_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'organization',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }, { transaction });

      await queryInterface.addColumn('user_role_modules', 'default_enabled', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }, { transaction });

      await queryInterface.bulkUpdate('user_role_modules', { default_enabled: true });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('user_role_modules', 'organization_id'),
        queryInterface.removeColumn('user_role_modules', 'default_enabled'),
      ]);
    });
  }
};
