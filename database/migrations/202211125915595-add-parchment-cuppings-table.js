'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('parchment_coffees', 'qualityControlDensityUnit', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "qualityControlDensity"
    });
    await queryInterface.addColumn('parchment_coffees', 'batchProductionDensityUnit', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "batchProductionDensity"
    });
    await queryInterface.addColumn('parchment_coffees', 'greenBeansId', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "greenBeansBags"
    });
    await queryInterface.addColumn('parchment_coffees', 'greenBeansExpiry', {
      type: Sequelize.DATE,
      allowNull: true,
      after: "greenBeansId"
    });
    await queryInterface.addColumn('parchment_coffees', 'greenBeansLabel', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "greenBeansExpiry"
    });
    await queryInterface.addColumn('parchment_coffees', 'totalWaste', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "greenBeansLabel"
    });

    await queryInterface.addColumn('parchment_cuppings', 'finalScore', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "cuppingNote"
    });

    await queryInterface.addColumn('parchment_quality_gradings', 'qualityScore', {
      type: Sequelize.ENUM('A', 'B', 'C', 'D', 'E'),
      allowNull: true,
      after: "quantityUnit"
    });
    await queryInterface.addColumn('parchment_quality_gradings', 'label', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "qualityScore"
    });
  },
  down: async (queryInterface, Sequelize) => {
  }
};
