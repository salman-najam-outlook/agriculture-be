'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('carbon_credit_projects', 'project_type', {
      type: Sequelize.ENUM(
        'agroforestry',
        'regenerative_agriculture',
        'avoided_deforestation',
        'forestry'
      ),
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE carbon_credit_projects 
      SET project_type = 'forestry' 
      WHERE project_type = 'avoided_deforestation'
    `);

    await queryInterface.changeColumn('carbon_credit_projects', 'project_type', {
      type: Sequelize.ENUM(
        'agroforestry',
        'regenerative_agriculture',
        'forestry'
      ),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('carbon_credit_projects', 'project_type', {
      type: Sequelize.ENUM(
        'agroforestry',
        'regenerative_agriculture',
        'avoided_deforestation',
        'forestry'
      ),
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE carbon_credit_projects 
      SET project_type = 'avoided_deforestation' 
      WHERE project_type = 'forestry'
    `);

    await queryInterface.changeColumn('carbon_credit_projects', 'project_type', {
      type: Sequelize.ENUM(
        'agroforestry',
        'regenerative_agriculture',
        'avoided_deforestation'
      ),
      allowNull: false,
    });
  }
};