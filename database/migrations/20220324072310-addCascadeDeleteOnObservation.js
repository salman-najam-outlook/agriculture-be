'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crop Observation Variety
    await queryInterface.removeConstraint(
      'crop_observation_variety',
      'crop_observation_variety_ibfk_1',
    );
    await queryInterface.addConstraint('crop_observation_variety', {
      fields: ['observation'],
      type: 'foreign key',
      name: 'crop_observation_variety_observation_fk',
      references: {
        table: 'crop_observation',
        field: 'id',
      },
      onDelete: 'cascade',
    });
    // Crop Observation Toxicity
    await queryInterface.removeConstraint(
      'crop_observation_toxicity_list',
      'crop_observation_toxicity_list_ibfk_1',
    );
    await queryInterface.addConstraint('crop_observation_toxicity_list', {
      fields: ['observation'],
      type: 'foreign key',
      name: 'crop_observation_toxicity_list_observation_fk',
      references: {
        table: 'crop_observation',
        field: 'id',
      },
      onDelete: 'cascade',
    });

    // Crop Observation Pest Infestation
    await queryInterface.removeConstraint(
      'crop_observation_pestInfestation_list',
      'crop_observation_pestInfestation_list_ibfk_1',
    );

    await queryInterface.addConstraint(
      'crop_observation_pestInfestation_list',
      {
        fields: ['observation'],
        type: 'foreign key',
        name: 'crop_observation_pestInfestation_list_observation_fk',
        references: {
          table: 'crop_observation',
          field: 'id',
        },
        onDelete: 'cascade',
      },
    );

    // Crop Observation Deficiency
    await queryInterface.removeConstraint(
      'crop_observation_deficiency_list',
      'crop_observation_deficiency_list_ibfk_1',
    );
    await queryInterface.addConstraint('crop_observation_deficiency_list', {
      fields: ['observation'],
      type: 'foreign key',
      name: 'crop_observation_deficiency_list_observation_fk',
      references: {
        table: 'crop_observation',
        field: 'id',
      },
      onDelete: 'cascade',
    });

    // Crop Observation Disease
    await queryInterface.removeConstraint(
      'crop_observation_disease_list',
      'crop_observation_disease_list_ibfk_1',
    );
    await queryInterface.addConstraint('crop_observation_disease_list', {
      fields: ['observation'],
      type: 'foreign key',
      name: 'crop_observation_disease_list_observation_fk',
      references: {
        table: 'crop_observation',
        field: 'id',
      },
      onDelete: 'cascade',
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
