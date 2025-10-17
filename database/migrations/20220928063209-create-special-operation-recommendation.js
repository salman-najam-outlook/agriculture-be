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
          comment: 'in option table',
          references: { model: 'options', key: 'id' },
        },
        // cropVarietyId: {
        //   type: Sequelize.INTEGER,
        // },
        cropPracticeId: {
          type: Sequelize.INTEGER,
          comment: 'in option table',
          references: { model: 'options', key: 'id' },
        },
        summary: {
          type: Sequelize.JSON,
        },
        period: {
          type: Sequelize.JSON,
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
        uniqueKeys: {
          uniqCropPractice: {
            fields: ['cropTypeId', 'cropPracticeId'],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SpecialOperationRecommendations');
  },
};
