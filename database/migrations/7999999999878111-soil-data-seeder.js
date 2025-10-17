'use strict';

module.exports = {
  up: async (queryInterface) => {
    let soilOrganicInput = 'soil-organic-input';
    let organicInput = 'organic-application-method';
    let synthAppMeth = 'synthetic-application-method';
    
    let appMethods = [
      "Basal application",
      "Top dressing",
      "Placement",
      "Band placement",
      "Pellet application",
      "Foliar application",
      "Injection into soil",
      "Fertigation",
      "Aerial application",
    ]

    let inputArr = []

    appMethods.forEach(el => {
      
      inputArr.push({
        groupName: organicInput,
        name: el,
        createdAt: new Date(), updatedAt: new Date()
      })
    })

    appMethods.forEach(el => {
      
      inputArr.push({
        groupName: synthAppMeth,
        name: el,
        createdAt: new Date(), updatedAt: new Date()
      })
    })

    await queryInterface.bulkInsert('options', [
      { groupName: soilOrganicInput, name: 'Gypsum', createdAt: new Date(), updatedAt: new Date()},
      { groupName: soilOrganicInput, name: 'agriculture lime', createdAt: new Date(), updatedAt: new Date()},
      { groupName: soilOrganicInput, name: 'burnt lime', createdAt: new Date(), updatedAt: new Date()},
      { groupName: soilOrganicInput, name: 'dolomite', createdAt: new Date(), updatedAt: new Date()},
      ...inputArr
    ]);
  },

  down: async () => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
