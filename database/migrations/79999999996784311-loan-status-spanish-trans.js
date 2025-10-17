'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query("UPDATE global_translation_metadata SET spanish = 'Pagado totalmente' WHERE english LIKE 'Cleared';");
    await queryInterface.sequelize.query("UPDATE global_translation_metadata SET spanish = 'Pagado parcialmente' WHERE english LIKE 'Uncleared';");
    await queryInterface.sequelize.query("UPDATE global_translation_metadata SET spanish = 'Sin préstamo' WHERE english LIKE 'No Loan';");

  },

  down: async (queryInterface, Sequelize) => {

  },
};

