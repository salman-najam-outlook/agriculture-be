'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cacao_wind_breaker_tree_map_data', { 
      id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      plantation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cacao_plantations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      wind_breaker_tree_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
          model: 'wind_breaker_tree',
          key: 'id',
        },
        onDelete: "CASCADE",
      },
      number_of_trees: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cacao_wind_breaker_tree_map_data');
  }
};
