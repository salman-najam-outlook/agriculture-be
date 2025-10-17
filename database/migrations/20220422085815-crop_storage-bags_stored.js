'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'crop_storage_bags_stored',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        cropStorageId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'crop_storage',
            key: 'id',
          },
          onDelete: 'CASCADE'
        },
        bagQty: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        bagCount: {
          type: Sequelize.DOUBLE,
          allowNull: false,
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
      },
      {
        uniqueKeys: {
          bagsUnit: {
            fields: ['bagQty', 'cropStorageId'],
          },
        },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('crop_storage_bags_stored');
  },
};
