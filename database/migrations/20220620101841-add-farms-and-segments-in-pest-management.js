'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('pest_managements','farmId');
    await queryInterface.changeColumn('pest_managements', 'area', {
      allowNull: true,
      type: Sequelize.DOUBLE,
    });
    await queryInterface.createTable('pest_management_farms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      farmId: {
        allowNull: false,
        references: {
          model: 'user_farms',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      pestManagementId: {
        allowNull: false,
        references: {
          model: 'pest_managements',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });

    await queryInterface.createTable('pest_management_segments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      segmentId: {
        allowNull: false,
        references: {
          model: 'geofences',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      pestManagementId: {
        allowNull: false,
        references: {
          model: 'pest_managements',
          key: 'id',
        },
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('pest_management_farms');
    await queryInterface.dropTable('pest_management_segments');
  }
};
