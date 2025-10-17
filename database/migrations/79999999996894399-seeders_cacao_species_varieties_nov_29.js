"use strict";

/** @type {import('sequelize-cli').Migration} */

const speciesData = [

  {
    name: 'Cacao (Peru)',
    varieties: [
      "CRIOLLO",
      "CCN-51",
      "FORASTERO",
      "TRINITARIO",
      "NACIONAL",
      "MARAÑÓN",
      "NATIVOS",
      "HÍBRIDAS UNAS",
      "MISCELANEO",
      "HUALLAGA",
      "UCAYALI - URUBAMBA",
    ],
  },
  {
    name: 'Cacao (Colombia)',
    varieties: [
      "FSV 41",
    "FSV 1",
    "FEAR 5",
    "CCN 51",
    "ICS 1",
    "FEC 2",
    "ICS 60",
    "ICS 39",
    "EET 8",
    "FLE 2",
    "FLE 3",
    "CAUCACIA 37",
    "CAUCACIA 39",
    "CAUCASIA 43",
    "FEAR 5",
    "FSA 12",
    "FSA 13",
    "CNCH 12",
    "CNCH 13",
    "TCS 01",
    ],
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const species of speciesData) {

      const speciesRes = await queryInterface.select(null, 'cacao_species', {
        where: {
          name: { [Sequelize.Op.like]: `%${species.name}%` },
        },
      });
      

      // select(
      //   null,
      //   'modules',
      //   {
      //     where: {
      //       parent_module_id: 'coffee',
      //       id: { [Sequelize.Op.like]: 'coffee/farmers%' },
      //     },
      //     transaction,
      //   },
      // )
      for (const variety of species.varieties) {
        await queryInterface.sequelize.query(
          `INSERT INTO cacao_variety (name, cacao_species) VALUES ('${variety}', ${speciesRes[0].id})`
        );
      }
    }
  },

  async down(queryInterface, Sequelize) {
   
  },
};
