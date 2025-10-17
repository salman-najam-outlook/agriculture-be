'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cacao_buying_station_productions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buyingStationId: {
        type: Sequelize.INTEGER
      },
      targetVal:{
        type:Sequelize.FLOAT
      },
      year:{
        type:Sequelize.SMALLINT
      },
      recordId:{
        type:Sequelize.STRING
      },
      isdeleted:{
        type:Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      uniqueKeys:{
        cacaoStationYearUniq:{
          fields:['buyingStationId','year']
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cacao_buying_station_productions');
  }
};