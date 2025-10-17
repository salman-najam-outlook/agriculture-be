'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const plantationData = await queryInterface.sequelize.query(
      "SELECT id, cacao_variety FROM cacao_plantations"
    );

    const transformedPlantationMapData = plantationData[0]
      .filter((row) => row.cacao_variety !== null)
      .map((row) => ({
        cacao_plantation_id: row.id,
        cacao_variety_id: row.cacao_variety,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    await queryInterface.bulkInsert(
      "cacao_plantation_varieties",
      transformedPlantationMapData,
      {}
    );

    const manageTreesData = await queryInterface.sequelize.query(
      "SELECT id, cacao_variety FROM cacao_manage_trees"
    );

    const transformedMangeTreesMapData = manageTreesData[0]
      .filter((row) => row.cacao_variety !== null)
      .map((row) => ({
        manage_cacao_trees_id: row.id,
        cacao_variety_id: row.cacao_variety,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    await queryInterface.bulkInsert(
      "manage_cacao_trees_varieties",
      transformedMangeTreesMapData,
      {}
    );

    await queryInterface.removeConstraint('cacao_plantations', 'cacao_plantations_ibfk_2');
    await queryInterface.removeColumn('cacao_plantations', 'cacao_variety');

    await queryInterface.removeConstraint('cacao_manage_trees', 'cacao_manage_trees_ibfk_3');
    await queryInterface.removeColumn('cacao_manage_trees', 'cacao_variety');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('cacao_plantations', 'cacao_variety', {
      type: Sequelize.INTEGER,
      references: {
        model: 'coffee_variety',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addColumn('cacao_manage_trees', 'cacao_variety', {
      type: Sequelize.INTEGER,
      references: {
        model: 'coffee_variety',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
};
