'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('app_user_module_recomm_maps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      moduleId: {
        type: Sequelize.STRING,
        collate: 'utf8mb4_0900_ai_ci',
        unique: true,
        references: {
          model: 'modules',
          key: 'id',
        },
      },
      attributeNum: {
        type: Sequelize.STRING,
        collate: 'utf8mb4_0900_ai_ci',
        unique: true,
        references: {
          model: 'CropRecommendationModuleAttributes',
          key: 'attributeNum',
        },
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
    }, 
    {
      collate: 'utf8mb4_0900_ai_ci' // Set the collation of the "users" table to "utf8_general_ci"
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('app_user_module_recomm_maps');
  },
};