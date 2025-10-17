'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('activation_key', 'subOrgId', {
      type: Sequelize.INTEGER,
      allowNull: true,
        references: {
          model: 'organization',
          key: 'id',
        },
    
    });
    await queryInterface.addColumn('user_membership', 'subOrgId', {
      type: Sequelize.INTEGER,
      allowNull: true,
        references: {
          model: 'organization',
          key: 'id',
        },

    });
    await queryInterface.addColumn('generated_keys', 'subOrgId', {
      type: Sequelize.INTEGER,
      allowNull: true,
        references: {
          model: 'organization',
          key: 'id',
        },

    });
    await queryInterface.addColumn('csv_upload_jobs', 'subOrgId', {
      type: Sequelize.INTEGER,
      allowNull: true,
        references: {
          model: 'organization',
          key: 'id',
        },

    });
       await queryInterface.addColumn('roles', 'subOrgId', {
      type: Sequelize.INTEGER,
      allowNull: true,
        references: {
          model: 'organization',
          key: 'id',
        },

    });
  },

  async down(queryInterface, Sequelize) {

  },
};
