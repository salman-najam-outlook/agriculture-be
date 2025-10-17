'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('traceability', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      //additional information
      slogan: {
        type: Sequelize.STRING,
        allowNull: false
      },

      additional_logos: {
        type: Sequelize.JSON,
        allowNull: true,
      },

      //origin


      origin_title: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      origin_description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      map_link: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      origin_image: {
        allowNull: false,
        type: Sequelize.JSON,
      },

      //cooperative_informations

      cooperative_title: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      cooperative_description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      website_link: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      cooperative_image: {
        allowNull: false,
        type: Sequelize.JSON,
      },

      //traceability_informations
      traceability_title: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      traceability_description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      traceability_image: {
        allowNull: false,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('traceability');
  },
};
