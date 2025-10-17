'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("tree_upload_history", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            userId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            farmId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "user_farms",
                    key: "id"
                },
                onDelete: "CASCADE"
            },
            fileName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false
            },
            numberOfRowsInserted: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            numberOfRowsFailed: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            errors: {
                type: Sequelize.JSON,
                allowNull: true
            },
            key: {
                type: Sequelize.STRING,
                allowNull: false
            },
            zoneId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "geofences",
                    key: "id"
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("CURRENT_TIMESTAMP")
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("tree_upload_history");
    }
};
