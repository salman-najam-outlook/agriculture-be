'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn(
        'comprehensnsive_analysis_reports',
        'cropName',
        { transaction }
      );
      await queryInterface.removeColumn(
        'comprehensnsive_analysis_reports',
        'report',
        { transaction }
      );
      await queryInterface.changeColumn(
        'comprehensnsive_analysis_reports',
        'createdAt',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
        },
        { transaction }
      );
      await queryInterface.changeColumn(
        'comprehensnsive_analysis_reports',
        'updatedAt',
        {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn(
            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
          ),
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'comprehensnsive_analysis_reports',
        'location',
        {
          type: Sequelize.STRING(300),
          allowNull: true,
          after: 'fileS3Key',
        },
        { transaction }
      );
      await queryInterface.addColumn(
        'comprehensnsive_analysis_reports',
        'name',
        {
          type: Sequelize.STRING(300),
          allowNull: true,
          after: 'id',
        },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'comprehensnsive_analysis_reports',
      'cropTypeId'
    );
    await queryInterface.removeColumn(
      'comprehensnsive_analysis_reports',
      'location'
    );
    await queryInterface.removeColumn(
      'comprehensnsive_analysis_reports',
      'name'
    );
    await queryInterface.addColumn(
      'comprehensnsive_analysis_reports',
      'cropName',
      {
        type: Sequelize.STRING,
      }
    );
    await queryInterface.addColumn(
      'comprehensnsive_analysis_reports',
      'report',
      {
        type: Sequelize.STRING,
      }
    );
  },
};
