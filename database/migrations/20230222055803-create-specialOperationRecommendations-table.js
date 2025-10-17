'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'SpecialOperationRecommendations',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        cropTypeId: {
          type: Sequelize.INTEGER,
          references: { model: 'options', key: 'id' },
          allowNull: false,
        },
        practiceId: {
          type: Sequelize.INTEGER,
          references: { model: 'crop_observation_special_operation_practice', key: 'id' },
          allowNull: false,
        },
        periodSummary: {
          type: Sequelize.JSON,
          allowNull: false,
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
    await queryInterface.dropTable('SpecialOperationRecommendations');
  },
};
