'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'manage_trees',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        plantation_id: {
          type: Sequelize.INTEGER,
          references: { model: 'plantations', key: 'id' },
        },
        seedling_id: {
          type: Sequelize.INTEGER,
          references: { model: 'seedlings', key: 'id' },
        },
        date: {
          allowNull: true,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
        },
        coffee_species: {
          type: Sequelize.INTEGER,
          references: { model: 'coffee_species', key: 'id' },
        },
        coffee_variety: {
          type: Sequelize.INTEGER,
          references: { model: 'coffee_variety', key: 'id' },
        },
        no_of_coffee_trees: {
          type: Sequelize.INTEGER
        },
        comment: {
          type: Sequelize.STRING,
          allowNull: true,
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
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('manage_trees');
  },
};
