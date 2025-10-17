'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('soil_prep_practice_geofences', 'deletedAt', {
          type:Sequelize.DataTypes.DATE,
          allowNull:true,
          after:'updatedAt'
      }),

      queryInterface.addColumn('map_weed_geofences', 'deletedAt', {
          type:Sequelize.DataTypes.DATE,
          allowNull:true,
          after:'updatedAt'
      }),

      queryInterface.addColumn('map_user_goal_geofences', 'deletedAt', {
          type:Sequelize.DataTypes.DATE,
          allowNull:true,
          after:'updatedAt'
      }),

      queryInterface.addColumn('map_soil_fertility_audit_geofences', 'deletedAt', {
          type:Sequelize.DataTypes.DATE,
          allowNull:true,
          after:'updatedAt'
      }),

      queryInterface.addColumn('geofence_coordinates', 'deletedAt', {
          type:Sequelize.DataTypes.DATE,
          allowNull:true,
          after:'updatedAt'
      }),

      queryInterface.addColumn('equipment_usersegment', 'deletedAt', {
          type:Sequelize.DataTypes.DATE,
          allowNull:true,
          after:'updatedAt'
      }),

      queryInterface.addColumn('map_sowing_geofences', 'deletedAt', {
          type:Sequelize.DataTypes.DATE,
          allowNull:true,
          after:'updatedAt'
      }),

      queryInterface.addColumn('survey_questions_response', 'deletedAt', {
        type:Sequelize.DataTypes.DATE,
        allowNull:true,
        after:'updatedAt'
      }),

      queryInterface.addColumn('satellite_reports', 'deletedAt', {
        type:Sequelize.DataTypes.DATE,
        allowNull:true,
        after:'updatedAt'
      }),

      queryInterface.addColumn('map_harvesting_geofencing', 'deletedAt', {
          type:Sequelize.DataTypes.DATE,
          allowNull:true,
          after:'updatedAt'
       }),

     queryInterface.addColumn('map_planting_geofencing', 'deletedAt', {
        type:Sequelize.DataTypes.DATE,
        allowNull:true,
        after:'updatedAt'
     }),

     queryInterface.addColumn('map_soilpreparation_geofence', 'deletedAt', {
        type:Sequelize.DataTypes.DATE,
        allowNull:true,
        after:'updatedAt'
      }),
    ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return Promise.all([
      queryInterface.removeColumn('soil_prep_practice_geofences', 'deletedAt'),
      queryInterface.removeColumn('map_weed_geofences', 'deletedAt'),
      queryInterface.removeColumn('map_user_goal_geofences', 'deletedAt'),
      queryInterface.removeColumn('map_soil_fertility_audit_geofences', 'deletedAt'),
      queryInterface.removeColumn('geofence_coordinates', 'deletedAt'),

      queryInterface.removeColumn('equipment_usersegment', 'deletedAt'),
      queryInterface.removeColumn('map_sowing_geofences', 'deletedAt'),
      queryInterface.removeColumn('survey_questions_response', 'deletedAt'),
      queryInterface.removeColumn('satellite_reports', 'deletedAt'),
      queryInterface.removeColumn('map_harvesting_geofencing', 'deletedAt'),
      queryInterface.removeColumn('map_planting_geofencing', 'deletedAt'),
      queryInterface.removeColumn('map_soilpreparation_geofence', 'deletedAt')
    ])

  }
};
