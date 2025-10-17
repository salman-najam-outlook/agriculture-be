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
     return Promise.all([
        queryInterface.createTable('equipment_equipment_activity', {
          id: {
            type:Sequelize.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
          }, 
          equipment_id:{
              type:Sequelize.INTEGER,
              allowNull: false,
              references: {
                model: "equipment",
                key: "id",
              },
          },
          equipment_activity_id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            references: {
              model: "equipment_activity",
              key: "id",
            },
          },
          
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
          },

          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn(
              "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ),
          },
        })
     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      await queryInterface.dropTable('equipment_equipment_activity')
    ])
  }
};
