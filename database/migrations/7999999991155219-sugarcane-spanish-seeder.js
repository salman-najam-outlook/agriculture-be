'use strict';
const moment = require("moment");
const { gasUnits } = require("../../helpers/consts");


  let reports_parent = [
    {english:"Land Preparation Report"          , spanish: "Informe de preparación de la tierra"                                      },
    {english:"Sowing/Planting Report"          , spanish: "Informe de Siembra/Plantación"                                      },
    {english:"Soil Management Report"          , spanish: "Informe de Gestión de Suelos"                                     },
    {english:"Irrigation Report"          , spanish: "Informe de riego"                                     },
    {english:"Weeding Report"          , spanish: "Informe de deshierbe"                                     },
    {english:"Pest Management Report"          , spanish: "Informe de manejo de plagas"                                   },
    {english:"Disease Management Report"          , spanish: "Informe de gestión de enfermedades"                                      },
    {english:"Harvesting Report"          , spanish: "Informe de cosecha"                                    },
    {english:"Storage Report"          , spanish: "Informe de almacenamiento"                                     },
    {english:"General Information Report"          , spanish: "Informe de información general"                                    },
    {english:"Special Operations"          , spanish: "Operaciones Especiales"                                    },
    
  ]
  




module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('global_translation_metadata', reports_parent, {});
  try {
    
  } catch (error) {
    
  }
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
