'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      await queryInterface.createTable('dry_milling_outbound_warehouse', {
        id: { 
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        clientName: {
          type: Sequelize.STRING,
        },
        orderDetail: {
          type: Sequelize.STRING,
        },
        amount: {
          type: Sequelize.DOUBLE,
        },
        quantity: {
          type: Sequelize.INTEGER,
        },
        outboundUnitValue: {
          type: Sequelize.INTEGER,
        },
        outboundUnitId: {
          type: Sequelize.INTEGER,
        },
        isdeleted: {
          type: Sequelize.DATE,
        },
        recordId: {
          type: Sequelize.STRING,
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
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('dry_milling_outbound_warehouse');
  }
};
