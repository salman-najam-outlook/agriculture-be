'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('disease_management_chemical_type_map', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT({ unsigned: true }),
        autoIncrement: true,
        allowNull: false,
      },
      diseaseManagementId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'disease_managements',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      chemicalTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'disease_management_chemical_type',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

    const diseaseManagementChemicalType = await queryInterface.select(null, 'disease_management_chemical_type');
    const diseaseManagementChemicalTypeMapData = diseaseManagementChemicalType.map((item) => ({
      diseaseManagementId: item.diseaseManagementId,
      chemicalTypeId: item.id,
    })).filter(item => !!item.diseaseManagementId);
    if (diseaseManagementChemicalTypeMapData.length > 0) {
      await queryInterface.bulkInsert('disease_management_chemical_type_map', diseaseManagementChemicalTypeMapData);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('disease_management_chemical_type_map');
  },
};
