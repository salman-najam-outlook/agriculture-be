'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', { 
      id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ticketUserType: {
        type: Sequelize.ENUM('Single User', 'Group of users', 'Dimitra Admin'),
        allowNull: false,
      },
      requestorName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      requestorEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },     
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("open", "closed", "additional information required"),
        allowNull: true,
      },
      priority: {
        type: Sequelize.ENUM("Low", "Medium", "High"),
        allowNull: true,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      areaOfRequest: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("Question", "Incident", "Problem"),
        allowNull: false,
      },
      asigneeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      requesterId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      }
  });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('tickets');
  }
};
