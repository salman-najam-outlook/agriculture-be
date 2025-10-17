'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `UPDATE global_translation_metadata
       SET italian = 'EUDR Diligenza Dovuta'
       WHERE english = 'EUDR Due Diligence';`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `UPDATE global_translation_metadata
       SET italian = NULL
       WHERE english = 'EUDR Due Diligence';`
    );
  }
};
