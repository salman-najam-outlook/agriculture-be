'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'occ_komodo_inserted_ids',
        {
          id: {
            type: Sequelize.BIGINT({ unsigned: true }),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          dataType: {
            type: Sequelize.ENUM('FARMER', 'BATCH'),
            allowNull: false,
          },
          insertedId: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
          },
          onChainData: {
            type: Sequelize.JSON,
            allowNull: false,
          },
          status: {
            type: Sequelize.ENUM('PROCESSING', 'ERROR', 'SUCCESS'),
            allowNull: false,
          },
          dataId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
          },
        },
        { transaction }
      );

      await queryInterface.addIndex('occ_komodo_inserted_ids', ['dataId', 'dataType'], {
        transaction,
      });
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('occ_komodo_inserted_ids');
  },
};
