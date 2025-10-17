'use strict';

module.exports ={
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('faq_sections', 'bn', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('faq_sections', 'om', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('faq_sections', 'so', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('faq_sections', 'vi', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.addColumn('faq_sections', 'am', {
      type: Sequelize.TEXT,
      allowNull: true
    });


  },
  down: async (queryInterface, Sequelize) => {

  }
};
