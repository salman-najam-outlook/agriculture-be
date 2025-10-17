'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('soil_management', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      farm: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user_farms',
          key: 'id',
        },
      },
      area: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },

      cropType: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      cropVariety: {
        type: Sequelize.INTEGER,
      },

      dateOfApplication: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      stage: {
        type: Sequelize.INTEGER,
        references: {
          model: 'soil_application_stage',
          key: 'id',
        },
      },
      applicationMethod: {
        type: Sequelize.INTEGER,
        references: {
          model: 'soil_application_method',
          key: 'id',
        },
      },

      limingMaterial: {
        type: Sequelize.INTEGER,
      },
      doneSoilTestingBefore: {
        type: Sequelize.BOOLEAN,
      },
      ph: {
        type: Sequelize.INTEGER,
      },
      bulkDensity: {
        type: Sequelize.INTEGER,
      },
      soilOrganicCarbon: {
        type: Sequelize.INTEGER,
      },
      nitrogen: {
        type: Sequelize.INTEGER,
      },
      phosphorus: {
        type: Sequelize.INTEGER,
      },
      potassium: {
        type: Sequelize.INTEGER,
      },
      sulfur: {
        type: Sequelize.INTEGER,
      },
      totalLimeApplied: {
        type: Sequelize.INTEGER,
      },
      limingRate: {
        type: Sequelize.INTEGER,
      },
      totalOrganicInputApplied: {
        type: Sequelize.INTEGER,
      },
      organicInputsApplicationFrequency: {
        type: Sequelize.INTEGER,
      },
      nitrogenContent: {
        type: Sequelize.INTEGER,
      },
      phosphorusContent: {
        type: Sequelize.INTEGER,
      },
      potassiumContent: {
        type: Sequelize.INTEGER,
      },
      totalSyntheticFertilizerUsed: {
        type: Sequelize.INTEGER,
      },
      syntheticFertilizerApplicationRate: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('soil_management');
  },
};
