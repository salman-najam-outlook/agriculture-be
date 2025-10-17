'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('traceability_labels', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
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
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('traceability_labels');
  }
};
