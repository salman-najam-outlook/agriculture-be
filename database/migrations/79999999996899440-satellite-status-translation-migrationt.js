'use strict';
let jsonData = [
  {
    "english": "AREA-TOO-LARGE",
    "spanish": "ÁREA DEMASIADO GRANDE",
    "swahili": "ENEO-KUBWA SANA"
},
{
    "english": "REPORT UNAVAILABLE FOR CIRCULAR GEOFENCE",
    "spanish": "INFORME NO DISPONIBLE PARA GEOFENCE CIRCULAR",
    "swahili": "RIPOTI HAIPO KWA GEOFENCE YA WARAKA"
}
]
const moment = require("moment")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      let langaugeObjects = jsonData.map(el => {
        el.createdAt= moment.utc().format("YYYY-MM-DD HH:mm:ss")
        el.updatedAt= moment.utc().format("YYYY-MM-DD HH:mm:ss")

        return el
      })

      await queryInterface.bulkInsert(
        "global_translation_metadata",
        langaugeObjects,
        {},
        {}
      );
    } catch (error) {
      console.log(error)
    }


  },
  down: async (queryInterface, Sequelize) => {

  },
};
