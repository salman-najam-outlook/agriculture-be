'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
      // Drop the existing foreign key constraint
      await queryInterface.removeConstraint('nutrient_management', 'nutrient_management_ibfk_2');
  
      // Alter the column to allow nulls
      await queryInterface.changeColumn('nutrient_management', 'cropTypeId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
  
      // Re-add the foreign key constraint
      await queryInterface.addConstraint('nutrient_management', {
        fields: ['cropTypeId'],
        type: 'foreign key',
        name: 'nutrient_management_ibfk_2', // you can reuse the original name
        references: {
          table: 'options',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // or your original behavior
      });  
  },

  async down(queryInterface, Sequelize) {
    // Before reverting, check if any cropTypeId are NULL
    const nullCountResult = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM nutrient_management WHERE cropTypeId IS NULL',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const nullCount = nullCountResult[0].count;

    if (nullCount > 0) {
      throw new Error(`Rollback blocked: ${nullCount} records have NULL cropTypeId. Please fix before rollback.`);
    }

    await queryInterface.changeColumn('nutrient_management', 'cropTypeId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'options',
        key: 'id',
      },
    });
  }
};
