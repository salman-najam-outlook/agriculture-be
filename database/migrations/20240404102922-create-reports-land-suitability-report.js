'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('land_suitability_reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id:{
        type:Sequelize.INTEGER,
        allowNull:true,
        references:{
          model:'users',
          key:'id'
        }
      },

      farm_id:{
        allowNull:true,
        type:Sequelize.INTEGER,
        references:{
          model:'user_farms',
          key:'id'
        }
      },
      
      country:{
        type:Sequelize.STRING,
        allowNull:true,
      },

      state:{
        type:Sequelize.STRING,
        allowNull:true,
      },


      latitude:{
        type:Sequelize.STRING,
        allowNull:true,
      },

      longitude:{
        type:Sequelize.STRING,
        allowNull:true,
      },

      issuedDate:{
        type:Sequelize.DATE,
        allowNull:true,
      },

      is_deleted:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: 0
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
    await queryInterface.dropTable('land_suitability_reports');
  }
};