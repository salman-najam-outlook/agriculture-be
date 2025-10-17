'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cacao_traceability', {
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

      slogan: {
        type: Sequelize.STRING,
        allowNull: false
      },

      additional_logos: {
        type: Sequelize.JSON,
        allowNull: true,
      },

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

      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
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

    await queryInterface.createTable('cacao_traceability_informations', {
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
      farmAndZone: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      farmer_history: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      CacaoLandArea: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },

      CacaoVaritey: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },

      annualProduction: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },

      farmAndZone: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },

      recordId: {
        type:Sequelize.STRING,
        allowNull:true
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

    await queryInterface.createTable('cacao_traceability_labels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      organization_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      title: { allowNull: false, type: Sequelize.STRING },
      label_format: { allowNull: false, type: Sequelize.INTEGER },
      label_preview: { allowNull: false, type: Sequelize.JSON },
      logo: { allowNull: false, type: Sequelize.JSON },
      background_color_code: { allowNull: false, type: Sequelize.STRING },
      text_color_code: { allowNull: false, type: Sequelize.STRING },
      is_active: { defaultValue: true, type: Sequelize.BOOLEAN },
      
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
    await queryInterface.dropTable('cacao_traceability');
    await queryInterface.dropTable('cacao_traceability_informations');
    await queryInterface.dropTable('cacao_traceability_labels');
  },
};
