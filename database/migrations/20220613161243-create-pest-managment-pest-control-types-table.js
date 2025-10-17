'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('pest_management_pest_control_types', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      pestControlTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pest_control_types',
          key: 'id',
        },
      },
      pestManagementId: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
          model: 'pest_managements',
          key: 'id',
        }
      },
      startOfPestControl: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      pestControlDuration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      otherDatesOfPestControl: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      culturalManualMethodId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'pest_cultural_manual_methods',
          key: 'id',
        }
      },
      culturalManualMethodArea: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      culturalManualMethodAreaUnitId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      chemicalInsecticides: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      chemicalAppliedArea: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      chemicalAppliedAreaUnitId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      //
      insecticideActiveIngredients: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      totalInsecticideUsed: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      totalInsecticideUsedUnitId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      insecticideDose: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      insecticideDoseUnitId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      insecticideEfficacy: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      //
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
    await queryInterface.dropTable('pest_management_pest_control_types');
  }
};
