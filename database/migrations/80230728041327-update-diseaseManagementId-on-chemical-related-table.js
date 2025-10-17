'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.changeColumn(
        'disease_management_chemical_type',
        'diseaseManagementId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        { transaction }
      );

      await queryInterface.removeConstraint(
        'disease_management_chemical_type',
        'disease_management_chemical_type_ibfk_1',
        { transaction }
      );

      await queryInterface.addConstraint('disease_management_chemical_type', {
        fields: ['diseaseManagementId'],
        type: 'foreign key',
        name: 'disease_management_chemical_type_ibfk_1',
        references: {
          table: 'disease_managements',
          field: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'RESTRICT',
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint(
        'disease_management_chemical_type',
        'disease_management_chemical_type_ibfk_1',
        { transaction }
      );

      await queryInterface.addConstraint('disease_management_chemical_type', {
        fields: ['diseaseManagementId'],
        type: 'foreign key',
        name: 'disease_management_chemical_type_ibfk_1',
        references: {
          table: 'disease_managements',
          field: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        transaction,
      });

      await queryInterface.changeColumn(
        'disease_management_chemical_type',
        'diseaseManagementId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
