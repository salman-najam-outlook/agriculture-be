'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carbon_credit_projects_modules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carbon_credit_projects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      module_name: {
        type: Sequelize.ENUM(
          "sowing",
          "seeding",
          "harvesting",
          "fertilizers",
          "equipment"
        ),
        allowNull: false,
      },
      recurring_time: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      recurring_period: {
        type: Sequelize.ENUM(
          "Y",
          "M"
        ),
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      approval: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carbon_credit_projects_modules');
  },
};
