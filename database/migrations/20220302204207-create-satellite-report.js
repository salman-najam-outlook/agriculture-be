'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('satellite_reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reportType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fromDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      toDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      cropType: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          as: 'crop',
          model: 'options',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      zoomLevel: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      centerLatitude : {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      centerLongitude : {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      sowingDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      harvestingDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      satelliteSource : {
        type: Sequelize.STRING,
        allowNull: true
      },
      inputImage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      geoImagePath: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shortImagePath: {
        type: Sequelize.STRING,
        allowNull: true
      },
      reportPDFPath: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('satellite_reports');
  }
};