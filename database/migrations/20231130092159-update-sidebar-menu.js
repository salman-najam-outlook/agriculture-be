'use strict';

const { QueryTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

      let sql = "SELECT * FROM organization";

      const organizations = await queryInterface.sequelize.query(sql,{
        type:QueryTypes.SELECT
      });

      if(organizations){
        for(const org of organizations){
          sql = 'UPDATE sidebar_menu SET name = "Main Dashboard" WHERE parent_menu_id = :parent_menu_id AND id= :id AND organization = :org';

          await queryInterface.sequelize.query(sql,{
            type:QueryTypes.UPDATE,
            replacements:{
              parent_menu_id : 'reports_parent',
              id:'report_dashboard',
              org:org.id
            }
          })

          // UPDATE THE CROP OVERVIW ORDER;

          sql = 'SELECT * FROM sidebar_menu WHERE id= :id AND organization = :org';

          const settingsOrder = await queryInterface.sequelize.query(sql,{
            type:QueryTypes.SELECT,
            replacements:{
              id:'users/profiles',
              org:org.id
            }
          });

          if(settingsOrder && settingsOrder.length > 0 && settingsOrder[0].order !==undefined){
            let newSql = 'UPDATE sidebar_menu SET `order` = :orderId WHERE id= :id AND organization = :org';

            const data= await queryInterface.sequelize.query(newSql,{
              type:QueryTypes.UPDATE,
              replacements:{
                orderId:parseInt(settingsOrder[0].order) +1,
                id:"crops_overview",
                org:org.id
              }
            });
          }
        }
      }


      
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
