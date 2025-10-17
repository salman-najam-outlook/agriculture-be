'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dry_cacao_inbound_warehouse_map', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dryRegisterId: {
        type:Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'cacao_drying_process',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      inboundLotId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cacao_inbound_warehouse',
          key: 'id',
        },
      },
      totalLotQuantity: {
        type: Sequelize.DOUBLE
      },
      isdeleted: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dry_cacao_inbound_warehouse_map');
  }
};