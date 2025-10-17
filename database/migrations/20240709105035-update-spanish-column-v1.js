'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.sequelize.query(
        "UPDATE global_translation_metadata SET spanish = 'Equipo' WHERE spanish = 'equipo';",
        { transaction }
      );
      await queryInterface.sequelize.query(
        "UPDATE global_translation_metadata SET spanish = 'Planes de Membresia' WHERE spanish = 'Plan de membresia';",
        { transaction }
      );
      await transaction.commit()
    }catch(err){
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
