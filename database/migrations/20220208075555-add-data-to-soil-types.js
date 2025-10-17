'use strict';

module.exports = {
  up: async (queryInterface) => {
    let soilData = [
      { imageS3Key: 'Soil/20211218145343Sandysoil.png',  name: 'Sandy soil' },
      { imageS3Key: 'Soil/20211218145341-ClaySoil.png', name: 'Clay soil' },
      { imageS3Key: 'Soil/20211218145344Siltsoil.png', name: 'Silt soil' },
      { imageS3Key: 'Soil/20211218145340LoamSoil.png', name: 'Peat soil' },
      { imageS3Key: 'Soil/20211218145342LoamSoil.png', name: 'Loom soil' }
    ];
    soilData.forEach(function(obj){
      obj.createdAt = new Date();
      obj.updatedAt = new Date();
    });
    return queryInterface.bulkInsert('soil_types', soilData);
  },

  down: async (queryInterface) => {
    queryInterface.bulkDelete('soil_types');
  }
};
