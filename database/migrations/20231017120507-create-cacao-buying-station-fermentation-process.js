'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cacao_fermentation_process', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate:{
        type:Sequelize.DATEONLY
      },
      endDate:{
        type:Sequelize.DATEONLY
      },
      purchaseOrder:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      fermentationCode:{
        type:Sequelize.STRING(10),
        allowNull:true
      },
      buyingStationId:{
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      initialWeight:{
        type:Sequelize.INTEGER,
        allowNull:true
      },
      finalWeight:{
        type:Sequelize.INTEGER,
        allowNull:true,
      },
      performance:{
        type:Sequelize.INTEGER,
        allowNull:true,
      },
      fermentationPercentage:{
        type:Sequelize.INTEGER,
        allowNull:true,
      },
      fermentationMethod:{
        type:Sequelize.ENUM('Boxes','Piles','Bags'),
        allowNull:true,
      },
      status:{
        type:Sequelize.ENUM('All','Completed','Pending'),
        allowNull:true,
      },
      isdeleted:{
        type:Sequelize.DATE,
        allowNull:true,
      },
      recordId: {
        allowNull: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('cacao_fermentation_process');
  }
};