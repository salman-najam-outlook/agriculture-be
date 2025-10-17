'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('user_membership', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      membership_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      satellite_report: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      advanced_report: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      membership_duration: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      membership_duration_unit: {
        allowNull: false,
        type: Sequelize.ENUM(['day(s)', 'week(s)', 'month(s)', 'year(s)']),
        defaultValue: "day(s)"
      },
      membership_fee: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      default_status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
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
    await queryInterface.dropTable('user_membership');
  }
};
