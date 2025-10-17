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
      'activation_key',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        license_key: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          defaultValue: null,
          allowNull: true
        },
        user_email: {
          type: Sequelize.STRING,
          allowNull: true
        },
        phone_no: {
          type: Sequelize.STRING,
          allowNull: true
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
        status: {
          type: Sequelize.ENUM(["activated", "assigned", "unassigned"]),
          allowNull: false,
          defaultValue: "unassigned"
        },
        generated_key_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'generated_keys',
            key: 'id',
          },
          allowNull: true,
          onDelete: 'CASCADE',
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
    await queryInterface.dropTable('activation_key');
  }
};
