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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
      const transaction = await queryInterface.sequelize.transaction();
      try{
        await queryInterface.sequelize.query(
          "UPDATE global_translation_metadata SET spanish = 'Método Manual/Mecánico' WHERE spanish = 'Químico';",
          { transaction }
        );
        await queryInterface.sequelize.query(
          "UPDATE global_translation_metadata SET spanish = 'Manual/Mecánico' WHERE spanish = 'Cultural/ manual/ mecánico';",
          { transaction }
        );
        await queryInterface.sequelize.query(
          "UPDATE global_translation_metadata SET spanish = 'Brotes' WHERE spanish = 'Provenir';",
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
