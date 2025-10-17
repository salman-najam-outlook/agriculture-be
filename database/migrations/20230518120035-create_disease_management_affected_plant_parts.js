'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('disease_management_affected_plant_parts', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      plantPartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'plant_parts',
          key: 'id',
        },
      },
      diseaseManagementId: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
          model: 'disease_managements',
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
    await queryInterface.dropTable('disease_management_affected_plant_parts');
  }
};
