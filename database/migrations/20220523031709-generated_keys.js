'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      'generated_keys',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        membership_type: {
          type: Sequelize.INTEGER,
          references: {
            model: 'user_membership',
            key: 'id',
          },
          allowNull: false,
          onDelete: 'CASCADE',
        },
        generated_by: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          allowNull: false
        },
        sales_manager: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          allowNull: true
        },
        admin_role: {
          type: Sequelize.STRING,
          references: {
            model: 'roles',
            key: 'id',
          },
          allowNull: false
        },
        number_of_keys: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        comment: {
          type: Sequelize.STRING,
          allowNull: true
        },
        progress: {
          type: Sequelize.STRING,
          allowNull: true
        },
        job_id: {
          type: Sequelize.STRING,
          allowNull: true
        },
        is_deleted: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: 0
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn(
            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
          ),
        },
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('generated_keys');
  }
};
