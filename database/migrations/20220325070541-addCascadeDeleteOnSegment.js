'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    //  Irrigation Segment
    await queryInterface.removeConstraint(
      'irrigation_segment',
      'irrigation_segment_ibfk_1',
    );
    await queryInterface.addConstraint('irrigation_segment', {
      type: 'foreign key',
      fields: ['segment'],
      name: 'irrigation_segment_segment_fk',
      references: {
        table: 'geofences',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    // Equipment Segment
    await queryInterface.removeConstraint(
      'equipment_usersegment',
      'equipment_usersegment_ibfk_2',
    );
    await queryInterface.addConstraint('equipment_usersegment', {
      type: 'foreign key',
      fields: ['geoFenceID'],
      name: 'equipment_usersegment_geoFenceId_fk',
      references: {
        table: 'geofences',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    // Crop Storage Segment
    await queryInterface.removeConstraint(
      'crop_storage_segment',
      'crop_storage_segment_ibfk_2',
    );
    await queryInterface.addConstraint('crop_storage_segment', {
      type: 'foreign key',
      fields: ['segment'],
      name: 'crop_storage_segment_segment_fk',
      references: {
        table: 'geofences',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    // Crop Observation
    await queryInterface.removeConstraint(
      'crop_observation_segment',
      'crop_observation_segment_ibfk_1',
    );
    await queryInterface.addConstraint('crop_observation_segment', {
      type: 'foreign key',
      fields: ['segment'],
      name: 'crop_observation_segment_segment_fk',
      references: {
        table: 'geofences',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
    'segment', '', 'id', 'geofences';

    // HarvestingSegment
    await queryInterface.removeConstraint(
      'harvesting_segment',
      'harvesting_segment_ibfk_1',
    );
    await queryInterface.addConstraint('harvesting_segment', {
      type: 'foreign key',
      fields: ['segment'],
      name: 'harvesting_segment_segment_fk',
      references: {
        table: 'geofences',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    '', '', 'id', 'geofences';

    // MapSowingGeofences
    await queryInterface.removeConstraint(
      'map_sowing_geofences',
      'map_sowing_geofences_ibfk_1',
    );
    await queryInterface.addConstraint('map_sowing_geofences', {
      type: 'foreign key',
      fields: ['geofenceId'],
      name: 'map_sowing_geofences_segment_fk',
      references: {
        table: 'geofences',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    // MapWeedGeofences
    await queryInterface.removeConstraint(
      'map_weed_geofences',
      'map_weed_geofences_ibfk_1',
    );
    await queryInterface.addConstraint('map_weed_geofences', {
      type: 'foreign key',
      fields: ['geofenceId'],
      name: 'map_weed_geofences_segment_fk',
      references: {
        table: 'geofences',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });

    // MapSoilFertilityAuditGeofences
    await queryInterface.removeConstraint(
      'map_soil_fertility_audit_geofences',
      'map_soil_fertility_audit_geofences_ibfk_1',
    );
    await queryInterface.addConstraint('map_soil_fertility_audit_geofences', {
      type: 'foreign key',
      fields: ['geofenceId'],
      name: 'map_soil_fertility_audit_geofences_segment_fk',
      references: {
        table: 'geofences',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
