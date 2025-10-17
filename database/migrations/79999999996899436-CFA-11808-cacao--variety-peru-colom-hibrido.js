
'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
    
    async up(queryInterface, Sequelize) {
        let cacaoVariety = "Hibrido", cacaoSpecies = [], insertArr = []
         cacaoSpecies = await queryInterface.sequelize.query(
            `SELECT * FROM cacao_species where name like '%Cacao (Peru)%' or name like '%Cacao (Colombia)%'`, {
              type: queryInterface.sequelize.QueryTypes.SELECT
            });

            insertArr = cacaoSpecies.map(el => {
                return {
                    name: cacaoVariety,
                    cacao_species: el.id
                }
            })

            queryInterface.bulkInsert('cacao_variety',insertArr);


    },

    async down(queryInterface, Sequelize) {
  
    },
};
        