'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.removeConstraint('disease_managements', 'disease_managements_ibfk_2');
  
      await queryInterface.changeColumn('disease_managements', 'cropTypeId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
  
      await queryInterface.addConstraint('disease_managements', {
        fields: ['cropTypeId'],
        type: 'foreign key',
        name: 'disease_management_ibfk_2',
        references: {
          table: 'options',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });  
  },

  async down(queryInterface, Sequelize) {
    const nullCountResult = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM disease_managements WHERE cropTypeId IS NULL',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const nullCount = nullCountResult[0].count;

    if (nullCount > 0) {
      throw new Error(`Rollback blocked: ${nullCount} records have NULL cropTypeId. Please fix before rollback.`);
    }

    await queryInterface.changeColumn('disease_managements', 'cropTypeId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'options',
        key: 'id',
      },
    });
  }
}; 