'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('pest_management_application_methods', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      applicationMethodId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'options',
          key: 'id',
        },
      },
      pestManagementId: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
          model: 'pest_managements',
          key: 'id',
        }
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('pest_management_application_methods');
  }
};
