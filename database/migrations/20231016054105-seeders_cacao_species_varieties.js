"use strict";

/** @type {import('sequelize-cli').Migration} */

const speciesData = [
  {
    name: 'Cocoa (Ivory Coast)',
    varieties: [
      'Amelando',
      'CRIN TC-2',
      'CRIN TC-1',
      'Amazon',
      'CRIN TC-3',
      'Trinitario',
      'CRIN TC-5',
      'Mercedes',
    ],
  },
  {
    name: 'Cocoa (Panama)',
    varieties: [
      'CATIE-R1',
      'CATIE-R4',
      'CC-137',
      'ICS-95 T1',
      'PMCT-58',
    ],
  },
  {
    name: 'Cocoa (Peru)',
    varieties: [
      'IMC 67',
      'ICS 1',
      'ICS 6',
      'ICS 39',
      'UF 667',
    ],
  },
  {
    name: 'Cocoa (Colombia)',
    varieties: [
      'TSH 565',
      'ICS 95',
      'BMI 67',
    ],
  },
  {
    name: 'Cocoa (Honduras)',
    varieties: [
      'Indio Rojo',
      'Mayan Red',
      'Criollo Antiguo',
      'Santa Bárbara',
      'Intibucá',
      'Copán',
      'Olancho',
    ],
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (const species of speciesData) {
      const [speciesId, _] = await queryInterface.sequelize.query(
        `INSERT INTO cacao_species (name) VALUES ('${species.name}')`,
        { type: Sequelize.QueryTypes.INSERT }
      );

      for (const variety of species.varieties) {
        await queryInterface.sequelize.query(
          `INSERT INTO cacao_variety (name, cacao_species) VALUES ('${variety}', ${speciesId})`
        );
      }
    }
  },

  async down(queryInterface, Sequelize) {
   
  },
};
