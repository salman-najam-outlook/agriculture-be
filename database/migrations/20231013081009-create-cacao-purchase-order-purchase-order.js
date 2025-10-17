'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cacao_purchase_orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderCode: Sequelize.STRING(10),
      buyingStationId: {
        type: Sequelize.INTEGER,
        comment: 'buyingStationId is a user id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      farmerId: {
        type:Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      farmId: {
        type:Sequelize.INTEGER,
        allowNull:true
      },
      zoneId: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      cacao_plantation: {
        type: Sequelize.INTEGER,
        references: {
          model: "cacao_plantations",
          key: "id",
        }
      },
      cacao_species: {
        type: Sequelize.INTEGER,
        references: {
          model: "cacao_species",
          key: "id"
        }
      },

      cacao_variety: {
        type: Sequelize.INTEGER,
        references: {
          model: "cacao_variety",
          key: "id",
        },
      },
      cacao_weight: {
        allowNull: true,
        type: Sequelize.ENUM('LBS', 'KG', 'Pounds'),
      },
      cacao_type: {
        allowNull: true,
        type: Sequelize.ENUM('Organic', 'Conventional', 'In Transition')
      },
      recordId: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      perKgPrice: Sequelize.FLOAT,
      grandTotal: Sequelize.FLOAT,
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isdeleted: {
        type: Sequelize.DATE,
      },
      purchasedAt: {
        type: Sequelize.DATEONLY,
        get() {
          const purchasedAt = this.getDataValue('purchasedAt');
          if (_.isEmpty(purchasedAt)) return null;
          return moment
            .utc(purchasedAt, process.env.DB_ONLYDATE_FORMAT)
            .format(process.env.ACCEPT_DATE_FORMAT);
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cacao_purchase_orders');
  }
};