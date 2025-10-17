'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('FarmSizeRanges', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            from: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            to: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            isInclusive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            globalSettingId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'GlobalSettings',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        });

        // Add column globalSettingId if it doesn't exist
        const td = await queryInterface.describeTable('FarmSizeRanges');

        if (!td.globalSettingId) {
            await queryInterface.addColumn('FarmSizeRanges', 'globalSettingId', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'GlobalSettings',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            });
        }

        // Add columns to GlobalSettings table if they don't exist
        const tableDefinition = await queryInterface.describeTable('GlobalSettings');

        if (!tableDefinition.smallFarmId) {
            await queryInterface.addColumn('GlobalSettings', 'smallFarmId', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'FarmSizeRanges',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            });
        }

        if (!tableDefinition.mediumFarmId) {
            await queryInterface.addColumn('GlobalSettings', 'mediumFarmId', {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'FarmSizeRanges',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            });
        }

        if (!tableDefinition.largeFarm) {
            await queryInterface.addColumn('GlobalSettings', 'largeFarm', {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            });
        }
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.removeColumn('GlobalSettings', 'smallFarmId');
        await queryInterface.removeColumn('GlobalSettings', 'mediumFarmId');
        await queryInterface.removeColumn('GlobalSettings', 'largeFarm');
        await queryInterface.dropTable('FarmSizeRanges');
    }
};
