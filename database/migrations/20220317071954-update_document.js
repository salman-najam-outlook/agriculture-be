'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('document', 'parentId');
    await queryInterface.addColumn('document', 'parentId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'document', key: 'id'
      },
      onDelete: 'CASCADE'
    });
    
    // await queryInterface.addConstraint('document', {
    //   type: 'foreign key',
    //   fields: ['parentId'],
    //   name: 'document_parentId_fkey',
    //   references: {
    //     table: 'document',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE'
    // });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
