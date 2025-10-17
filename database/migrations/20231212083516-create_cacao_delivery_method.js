'use strict';

/** @type {import('sequelize-cli').Migration} */
const moment = require("moment");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('cacao_delivery_methods', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }, { transaction });

      await queryInterface.addColumn('cacao_purchase_orders', 'cacao_delivery_method_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'cacao_delivery_methods',
          key: 'id',
        }
      }, { transaction })

      const dropdownData = [
        {
          name: 'Raw Cacao Beans',
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          name: 'Fermented And Dried Cacao Beans',
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          name: 'Cacao Nibs',
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          name: 'Cacao Mass (Liquid)',
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          name: 'Cacao Mass (Solid)',
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          name: 'Cacao Butter',
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          name: 'Cacao Powder',
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          name: 'Chocolate Liquor',
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          name: 'Chocolate Products',
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        },
        {
          name: 'Fair Trade Or Specialty Deliveries',
          createdAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
        }
      ]

      await queryInterface.bulkInsert(
        "cacao_delivery_methods",
        dropdownData,
        {},
        {},
        { transaction }
      );

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('cacao_delivery_methods');
  }
};
