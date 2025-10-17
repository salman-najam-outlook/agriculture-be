'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('harvest_alert_info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      alertAdmin: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      alertFarmer: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      maxAllowed: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      unitId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'units_list', 
          key: 'id' 
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      organization: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'organization', 
          key: 'id' 
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('harvest_alert_info');
  }
};
