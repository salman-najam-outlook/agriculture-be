'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('tree_details', 'importImageName', {
            type: Sequelize.STRING,
            allowNull: true
        });

        await queryInterface.addColumn('tree_details', 'clientFarmId', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('tree_details', 'clientZoneId', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('tree_details', 'clientTimestamp', {
            type: Sequelize.INTEGER,
            allowNull: true
        });
        await queryInterface.addColumn('tree_details', 'clientDatestamp', {
            type: Sequelize.INTEGER,
            allowNull: false
        });


    },


    async down(queryInterface, Sequelize) { /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    }
};
