'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('parchment_coffees', {
      id: { 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dryMillingUserId: {
        comment: 'dryMillingUserId is a user id',
        references: {
          key: 'id',
          model: 'users',
        },
        type: Sequelize.INTEGER,
      },
      purchaseDate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      barcode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      parchmentChecking: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      parchmentCheckingUnitId: {
        type: Sequelize.INTEGER,
      },
      qualityControlHumidity: {
        type: Sequelize.DOUBLE,
      },
      qualityControlDensity: {
        type: Sequelize.DOUBLE,
      },
      parchmentQualityScore: {
        type: Sequelize.ENUM('A', 'B', 'C', 'D', 'E'),
      },
      batchProductionKilogramAsalan: {
        type: Sequelize.DOUBLE,
      },
      batchProductionDensity: {
        type: Sequelize.DOUBLE,
      },
      batchProductionPrimaryDefect: {
        type: Sequelize.DOUBLE,
      },
      batchProductionSecondaryDefect: {
        type: Sequelize.DOUBLE,
      },
      greenBeansTotal: {
        type: Sequelize.DOUBLE,
      },
      greenBeansBags: {
        type: Sequelize.INTEGER,
      },
      cuppingCupperName: {
        type: Sequelize.STRING,
      },
      cuppingFragrance: {
        type: Sequelize.STRING,
      },
      cuppingAromas: {
        type: Sequelize.STRING,
      },
      cuppingFlavour: {
        type: Sequelize.STRING,
      },
      cuppingAcidity: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cuppingAcidityRange: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cuppingBody: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cuppingBodyRange: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cuppingAfterTaste: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cuppingBalance: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cuppingBalanceRange: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cuppingNote: {
        allowNull: true,
        type: Sequelize.TEXT('long'),
      },
      cuppingFile: {
        type: Sequelize.JSON,
      },
      status: {
        allowNull: true,
        default: 'Parchment Coffee',
        type: Sequelize.ENUM('Completed', 'Parchment Coffee', 'Quality Control', 'Batch Production', 'Green Beans', 'Cupping'),
      },
      isdeleted: {
        type: Sequelize.DATE,
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

    await queryInterface.dropTable('parchment_coffees');
  }
};
