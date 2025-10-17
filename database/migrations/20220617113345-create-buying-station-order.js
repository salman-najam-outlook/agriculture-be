'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('BuyingStationOrders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        orderCode: {
          type: Sequelize.STRING(10),
        },
        buyingStationId: {
          type: Sequelize.INTEGER,
          comment: 'buyingStationId is a user id',
          references: {
            model: 'users',
            key: 'id',
          },
        },
        farmerId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        coffeeCherryQty: {
          type: Sequelize.FLOAT,
        },
        coffeeCherryQlty: {
          type: Sequelize.ENUM('A', 'B', 'C', 'D', 'E'),
        },
        coffeeCherryPic: {
          type: Sequelize.JSON,
        },
        perKgPrice: {
          type: Sequelize.FLOAT,
        },
        grandTotal: {
          type: Sequelize.FLOAT,
        },
        isPaid: {
          type: Sequelize.BOOLEAN,
          defaultValue: 0,
        },
        recordId: {
          type: Sequelize.STRING,
        },
        isdeleted: {
          type: Sequelize.DATE,
        },
        purchasedAt: {
          allowNull: false,
          type: Sequelize.DATEONLY,
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
    } catch (err) {
      console.log('problem: ', err);
      throw new Error(err.message);
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BuyingStationOrders');
  },
};
