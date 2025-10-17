'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cacao_drying_process', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dryingCode:{
        type:Sequelize.STRING,
        allowNull:true,
      },
      dryingInitialDate:{
        type:Sequelize.DATE,
        allowNull:false,
      },
      initialWeight: {
        type:Sequelize.INTEGER,
        allowNull:true
      },
      preDryingTime: {
        type:Sequelize.STRING,
        allowNull:true
      },
      dryingTime: {
        type:Sequelize.STRING,
        allowNull:true
      },
      typeOfDrying: {
        type:Sequelize.STRING,
        allowNull:true,
      },
      labelType: {
        type:Sequelize.ENUM('Export','Domestic 1','Domestic 2'),
        allowNull:true,
      },
      dryingHumidity: {
        type:Sequelize.INTEGER,
        allowNull:true
      },
      dryingFlavor:{
        type:Sequelize.INTEGER,
        allowNull:true,
      },
      finalWeight:{
        type:Sequelize.INTEGER,
        allowNull:true,
      },
      weightPerBag:{
        type:Sequelize.INTEGER,
        allowNull:true
      },
      numberOfBags:{
        type:Sequelize.INTEGER,
        allowNull:true,
      },
      status:Sequelize.STRING,
      isdeleted:{
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.fn('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cacao_drying_process');
  }
};