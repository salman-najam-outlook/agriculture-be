'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create crops_traceability table
    await queryInterface.createTable('crops_traceability', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      slogan: {
        type: Sequelize.STRING,
        allowNull: false
      },
      additional_logos: {
        type: Sequelize.JSON,
        allowNull: true
      },
      origin_title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      origin_description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      map_link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      origin_image: {
        allowNull: false,
        type: Sequelize.JSON
      },
      cooperative_title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cooperative_description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      website_link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cooperative_image: {
        allowNull: false,
        type: Sequelize.JSON
      },
      traceability_title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      traceability_description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      traceability_image: {
        allowNull: false,
        type: Sequelize.JSON
      },
      organization_id: {
        allowNull: true,
        type: Sequelize.INTEGER
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

    // Create crop_label_formats table
    await queryInterface.createTable('crop_label_formats', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: true,
        type: Sequelize.JSON
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

    // Create crops_traceability_labels table
    await queryInterface.createTable('crops_traceability_labels', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
          model: 'users',
          key: 'id',
        }, 
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      label_format: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      label_preview: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      logo: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      background_color_code: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      text_color_code: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      is_active: {
        type: Sequelize.TINYINT(1),
        defaultValue: 1,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('crops_traceability_labels');
    await queryInterface.dropTable('crop_label_formats');
    await queryInterface.dropTable('crops_traceability');
  }
};
