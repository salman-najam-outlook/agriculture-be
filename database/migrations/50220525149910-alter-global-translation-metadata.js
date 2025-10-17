'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {


    await queryInterface.addColumn("global_translation_metadata", "greek", {
       type: Sequelize.TEXT,
        allowNull: true
    });
    await queryInterface.addColumn("global_translation_metadata", "mandarin", {
          type: Sequelize.TEXT,
        allowNull: true
    });
    await queryInterface.addColumn("global_translation_metadata", "turkish", {
          type: Sequelize.TEXT,
        allowNull: true
    });
  },
  down: async (queryInterface, Sequelize) => {
  
  }
};


