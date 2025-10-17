'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parchment_cuppings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      parchmentCoffeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'parchment_coffees',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'CASCADE'
      },
      parchmentQualityGradingId: {
        allowNull: true,
        // references: {
        //   model: 'parchment_quality_gradings',
        //   key: 'uniqueIdentifier',
        // },
        type: Sequelize.STRING,
      },
      cupperName: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cuppingFragrance: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cuppingTime: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cuppingAromas: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      cuppingFlavour: {
        allowNull: true,
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
      isDeleted: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('parchment_cuppings');
  }
};
