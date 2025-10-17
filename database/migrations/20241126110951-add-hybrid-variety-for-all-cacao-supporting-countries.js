"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Fetch all cacao species
      const cacaoSpecies = await queryInterface.select(null, 'cacao_species', { transaction });

      for (const species of cacaoSpecies) {
        // Check if "Hybrid" variety already exists for the species
        const existingVariety = await queryInterface.select(null, 'cacao_variety', {
          where: {
            name: 'Hybrid',
            cacao_species: species.id,
          },
          transaction,
        });

        // If "Hybrid" variety does not exist, insert it
        if (existingVariety.length === 0) {
          await queryInterface.bulkInsert('cacao_variety', [{
            name: 'Hybrid',
            cacao_species: species.id,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          }], { transaction });
        }
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {

  },
};