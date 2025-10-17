'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'DiseaseManagementAndOptions',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        type: {
          type: Sequelize.STRING,
        },
        diseaseManagementId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'DiseaseManagements',
            key: 'id',
          },
        },
        optionId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'options',
            key: 'id',
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
        uniqueKeys: {
          uqTypeOptionDiseaseId: {
            fields: ['diseaseManagementId', 'optionId', 'type'],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DiseaseManagementAndOptions');
  },
};
