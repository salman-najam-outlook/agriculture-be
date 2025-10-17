'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_score_survey_responses', {
      id: {
        type: Sequelize.BIGINT({ unsigned: true }),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userScoreId: {
        type: Sequelize.BIGINT({ unsigned: true }),
        references: {
          key: 'id',
          model: 'user_scores',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      questionId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answerIdOrValue: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_score_survey_responses');
  },
};
