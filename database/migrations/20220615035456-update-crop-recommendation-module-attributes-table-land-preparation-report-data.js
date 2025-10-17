'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.bulkUpdate('CropRecommendationModuleAttributes', 
      { name: 'Land preparation window' },
      { name: 'Land Prepration Window' }, // where
    );
    await queryInterface.bulkUpdate('CropRecommendationModuleAttributes', 
      { name: 'Soil/Land preparation activities' },
      { name: 'Soil/Land Prepration Activities' }, // where
    );
    await queryInterface.bulkUpdate('CropRecommendationModuleAttributes', 
      { name: 'Planting/Sowing windows' },
      { name: 'Planting/Sowing Window' }, // where
    );
    await queryInterface.bulkUpdate('CropRecommendationModuleAttributes', 
      { name: 'Planting material' },
      { name: 'Planting Materials' }, // where
    );
    await queryInterface.bulkUpdate('CropRecommendationModuleAttributes', 
      { name: 'Planting rate per hectare' },
      { name: 'Planting Rate Per Hactare' }, // where
    );
    await queryInterface.bulkUpdate('CropRecommendationModuleAttributes', 
      { name: 'Plant row spacing (cm)' },
      { name: 'Plant Row Spacing(cm)' }, // where
    );
    await queryInterface.bulkUpdate('CropRecommendationModuleAttributes', 
      { name: 'In-row plant spacing (cm)' },
      { name: 'In-Row Spacing(cm)' }, // where
    );
    await queryInterface.bulkUpdate('CropRecommendationModuleAttributes', 
      { name: 'Plant population density per ha' },
      { name: 'Plant Population/Density per Hectare' }, // where
    );
    await queryInterface.bulkUpdate('CropRecommendationModuleAttributes', 
      { name: 'Planting depth (cm)' },
      { name: 'Planting Depth(cm)' }, // where
    );
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
