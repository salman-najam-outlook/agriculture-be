'use strict';

const unitTypes = require('../../models/unitTypes');
const moment = require('moment')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const data = [
      {
        "english": "Millimetres",
        "swahili": "Milimita",
        "spanish": "Milímetros",
        "arabic": "مليمترات" 
      },
      {
        "english": "litres/hour",
        "swahili": "lita kwa saa",
        "spanish": "litros/hora",
        "arabic": "ليتر في الساعة" 
      },
      {
        "english": " litres/second",
        "swahili": "lita kwa sekunde",
        "spanish": "litros/segundo",
        "arabic": "ليتر في الثانية" 
      }
    ]
    const unitType = await queryInterface.sequelize.query(
      `SELECT id FROM unit_types where name = 'Irrigation-Volume'`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    console.log(unitType[0].id)

    if(unitType && unitType.length){
    const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
     const insertQuery = `
      insert into units_list (name, abbvr, unitType, createdAt, updatedAt) values 
      ("litres/hour", "l/H", ${unitType[0].id}, "${currentDateTime}", "${currentDateTime}"),
      ("litres/second", "l/S", ${unitType[0].id},"${currentDateTime}", "${currentDateTime}")
     `
     await queryInterface.sequelize.query(insertQuery)
    }

    for (const row of data) {
      let sql =
        "SELECT * FROM global_translation_metadata WHERE english = :english";
      const global_trans = await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { english: row.english },
      });

      // update case
      if (global_trans && global_trans.length > 0) {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.bulkUpdate("global_translation_metadata", item, {
          id: global_trans?.map(item => item.id)
        });
      }
      // insert case
      else {
        let item = {};
        for (let key in row) {
          const language = key.toLocaleLowerCase().trim();
          item[language] = row[key];
        }
        await queryInterface.insert(null, "global_translation_metadata", item);
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
