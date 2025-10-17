'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'irrigation';

    // Utility: Check if column exists
    async function columnExists(column) {
      const [results] = await queryInterface.sequelize.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = '${tableName}'
        AND column_name = '${column}'
      `);
      return results.length > 0;
    }

    // Utility: Check if constraint exists
    async function constraintExists(constraint) {
      const [results] = await queryInterface.sequelize.query(`
        SELECT constraint_name
        FROM information_schema.table_constraints
        WHERE table_name = '${tableName}'
        AND constraint_name = '${constraint}'
      `);
      return results.length > 0;
    }

    // Step 1: Make irrigationType nullable
    const irrigationTypeConstraint = 'irrigation_ibfk_1';
    if (await constraintExists(irrigationTypeConstraint)) {
      await queryInterface.removeConstraint(tableName, irrigationTypeConstraint);
    }

    if (await columnExists('irrigationType')) {
      await queryInterface.changeColumn(tableName, 'irrigationType', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });

      await queryInterface.addConstraint(tableName, {
        fields: ['irrigationType'],
        type: 'foreign key',
        name: irrigationTypeConstraint,
        references: {
          table: 'irrigation_type',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }

    // Step 2: Add irrigationTypeUpdated if not exists
    if (!(await columnExists('irrigationTypeUpdated'))) {
      await queryInterface.addColumn(tableName, 'irrigationTypeUpdated', {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Reference to new hierarchical irrigation type system',
      });
    }

    // Step 3: Add waterSourceUpdated if not exists
    if (!(await columnExists('waterSourceUpdated'))) {
      await queryInterface.addColumn(tableName, 'waterSourceUpdated', {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Multi-select water source data as JSON array',
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    // Remove new columns
    await queryInterface.removeColumn('irrigation', 'waterSourceUpdated');
    await queryInterface.removeColumn('irrigation', 'irrigationTypeUpdated');
    
    // Restore irrigationType as not nullable
    await queryInterface.changeColumn('irrigation', 'irrigationType', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'irrigation_type',
        key: 'id',
      },
    });
  },
}; 