'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const plantationData = await queryInterface.sequelize.query(
      "SELECT id, coffee_variety FROM plantations"
    );

    const transformedPlantationMapData = plantationData[0]
      .filter((row) => row.coffee_variety !== null)
      .map((row) => ({
        coffee_plantation_id: row.id,
        coffee_variety_id: row.coffee_variety,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    await queryInterface.bulkInsert(
      "coffee_plantation_varieties",
      transformedPlantationMapData,
      {}
    );

    const manageTreesData = await queryInterface.sequelize.query(
      "SELECT id, coffee_variety FROM manage_trees"
    );

    const transformedMangeTreesMapData = manageTreesData[0]
      .filter((row) => row.coffee_variety !== null)
      .map((row) => ({
        manage_trees_id: row.id,
        coffee_variety_id: row.coffee_variety,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    await queryInterface.bulkInsert(
      "manage_trees_varieties",
      transformedMangeTreesMapData,
      {}
    );

    await queryInterface.removeConstraint('plantations', 'plantations_coffee_variety_foreign_idx');
    await queryInterface.removeColumn('plantations', 'coffee_variety');

    await queryInterface.removeConstraint('manage_trees', 'manage_trees_ibfk_4');
    await queryInterface.removeColumn('manage_trees', 'coffee_variety');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('plantations', 'coffee_variety', {
      type: Sequelize.INTEGER,
      references: {
        model: 'coffee_variety',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addColumn('manage_trees', 'coffee_variety', {
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