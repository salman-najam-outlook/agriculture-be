'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('land_evaluation_classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      report_eval_id:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:'land_evaluation_details',
          key:'id'
        }
      },
      class: {
        type: Sequelize.STRING,
        allowNull:true
      },
      range:{
        type:Sequelize.STRING,
        allowNull:true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('land_evaluation_classes');
  }
};