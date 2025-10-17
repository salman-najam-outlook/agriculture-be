'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('equipment_mode_of_operation', 'recordId', {
      after: 'userID',
      allowNull: true,
      comment: 'Unique ID sent from app for offline mode',
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('equipment_group', 'recordId', {
      after: 'userID',
      allowNull: true,
      comment: 'Unique ID sent from app for offline mode',
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('equipment_name', 'recordId', {
      after: 'activity',
      allowNull: true,
      comment: 'Unique ID sent from app for offline mode',
      type: Sequelize.STRING,
    });

    let modeOfOperationsCount = 100;
    let groupCount = 100;
    let nameCount = 100;
    let modeOfOperations = await queryInterface.sequelize.query(
      'SELECT * FROM equipment_mode_of_operation', {
        type: queryInterface.sequelize.QueryTypes.SELECT
      });
    let groups = await queryInterface.sequelize.query(
      'SELECT * FROM equipment_group', {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });
    let names = await queryInterface.sequelize.query(
      'SELECT * FROM equipment_name', {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });

    modeOfOperations.forEach(async modeOfOperation => {
      modeOfOperation.recordId = `emoo${modeOfOperationsCount}`;
      modeOfOperationsCount++;

      await queryInterface.bulkUpdate(
        'equipment_mode_of_operation',
        modeOfOperation,
        { id: modeOfOperation.id }
      );
    });

    groups.forEach(async group => {
      group.recordId = `egr${groupCount}`;
      groupCount++;

      await queryInterface.bulkUpdate(
        'equipment_group',
        group,
        { id: group.id }
      );
    });
 
    names.forEach(async name => {
      name.recordId = `ena${nameCount}`;
      nameCount++;

      await queryInterface.bulkUpdate(
        'equipment_name',
        name,
        { id: name.id }
      );
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('equipment_mode_of_operation', 'recordId');
    await queryInterface.removeColumn('equipment_group', 'recordId');
    await queryInterface.removeColumn('equipment_name', 'recordId');
  }
};
