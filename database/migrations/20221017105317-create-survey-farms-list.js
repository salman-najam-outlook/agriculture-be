'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('survey_farms_list', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      surveyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'surveys_list',
          key: 'id',
          cascade: true
        }
      },
      farmId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_farms',
          key: 'id',
          cascade: true
        }
      },
      isDisabled: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('survey_farms_list');
  }
};
