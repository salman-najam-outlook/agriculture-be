'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'disease_type_and_crop_type',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        diseaseTypeId: {
          type: Sequelize.INTEGER,
          references: { model: 'disease_types', key: 'id' },
        },
        cropTypeId: {
          type: Sequelize.INTEGER,
          references: { model: 'options', key: 'id' },
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
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(
      'disease_type_and_crop_type'
    );
  },
};
