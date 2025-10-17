'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('surveys_list', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          cascade: true
        }
      },
      title: Sequelize.STRING(100),
      description: Sequelize.TEXT,
      isScheduled: Sequelize.BOOLEAN,
      scheduledDate: Sequelize.STRING(100),
      isMultistep: Sequelize.BOOLEAN,
      questionForEachStep: Sequelize.INTEGER,
      surveyStatus: Sequelize.BOOLEAN,
      isSelectedUsers: Sequelize.BOOLEAN,
      linkedWithFarms: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('surveys_list');
  }
};
