'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('options','recordId', {
      after: 'groupName',
      allowNull: true,
      type: Sequelize.STRING,
    });

    let options = await queryInterface.sequelize.query(
      'SELECT * FROM options WHERE groupName = "fuel-type"', {
        type: queryInterface.sequelize.QueryTypes.SELECT
    });

    let optionsCount = 100;
    options.forEach(async option => {
      option.recordId = `eft${optionsCount}`;
      optionsCount++;

      await queryInterface.bulkUpdate(
        'options',
        option,
        { id: option.id }
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
    await queryInterface.removeColumn('options', 'recordId');
  }
};
