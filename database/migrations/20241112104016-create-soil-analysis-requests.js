'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('soil_analysis_request', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        latitude: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        longitude: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        // FAILED or SUCCESS or PENDING
        status: {
          type: Sequelize.STRING,
          allowNull: true,
          validate: {
            isIn: [['FAILED', 'SUCCESS', 'PENDING']],
          },
        },
        remarks: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        refreshAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('soil_analysis_request', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};