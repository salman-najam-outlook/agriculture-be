'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('pest_managements', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      farmId: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
          model: 'user_farms',
          key: 'id',
        }
      },
      area: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      areaUnitId: {
        type: Sequelize.INTEGER,
      },
      cropTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'options',
          key: 'id',
        },
        allowNull: true,
      },
      cropVarietyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dateOfFirstPestDetection: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      numberOfPlantsAffected: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cropStageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pestTypeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'pest_types',
          key: 'id',
        },
      },
      actualDaysAfterPestDetection: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pestControlTypeId: {
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
    await queryInterface.dropTable('pest_managements');
  }
};
