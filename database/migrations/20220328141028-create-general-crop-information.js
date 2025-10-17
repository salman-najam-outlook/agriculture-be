'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'general_crop_information',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        cropType: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'options',
            key: 'id',
          },
        },
        cropVariety: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'crops',
            key: 'id',
          },
        },
        region: {
          type: Sequelize.TEXT,
        },
        recommendedRegion: {
          type: Sequelize.TEXT,
        },
        temperature: {
          type: Sequelize.STRING,
        },
        humidity: {
          type: Sequelize.STRING,
        },
        radiation: {
          type: Sequelize.STRING,
        },
        rainfall: {
          type: Sequelize.STRING,
        },
        evapotranspiration: {
          type: Sequelize.STRING,
        },
        expectedYield: {
          type: Sequelize.STRING,
        },
        season: {
          type: Sequelize.STRING,
        },
        recommendedSeason: {
          type: Sequelize.STRING,
        },
        organization: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'organization',
            key: 'id',
          },
        },
        language: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        uniqueKeys: {
          Items_unique: {
            fields: ['cropType', 'cropVariety', 'organization', 'language'],
          },
        },
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('general_crop_information');
  },
};
