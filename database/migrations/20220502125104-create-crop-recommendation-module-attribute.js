'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'CropRecommendationModuleAttributes',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        moduleId: {
          type: Sequelize.INTEGER,
          references: { model: 'CropRecommendationModules', key: 'id' },
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        type: {
          allowNull: false,
          type: Sequelize.ENUM('scale', 'pest', 'none', 'disease'),
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
      { uniqueKeys: { moduleIdAndName: { fields: ['name', 'moduleId'] } } }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CropRecommendationModuleAttributes');
  },
};
