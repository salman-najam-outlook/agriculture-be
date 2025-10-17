'use strict';

module.exports = {
  async up(queryInterface) {
    // Geofence Cordinates
    await queryInterface.addConstraint('geofence_coordinates', {
      type: 'foreign key',
      fields: ['geoFenceId'],
      name: 'geofence_coordinates_geoFenceId_fk',
      references: {
        table: 'geofences',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
    // Audit Responses
    await queryInterface.addConstraint('audit_responses', {
      type: 'foreign key',
      fields: ['farmId'],
      name: 'audit_responses_farmId_fk',
      references: {
        table: 'user_farms',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
    // Soil Management
    await queryInterface.addConstraint('soil_management', {
      type: 'foreign key',
      fields: ['farm'],
      name: 'soil_management_farmId_fk',
      references: {
        table: 'user_farms',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint('geofences', 'geofences_farmId_fk');
    await queryInterface.removeConstraint(
      'geofence_coordinates',
      'geofence_coordinates_geoFenceId_fk',
    );
    await queryInterface.removeConstraint(
      'audit_responses',
      'audit_responses_farmId_fk',
    );
    await queryInterface.removeConstraint(
      'soil_management',
      'soil_management_farmId_fk',
    );
  },
};
