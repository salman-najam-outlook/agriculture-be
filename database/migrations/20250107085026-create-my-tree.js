
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("my_tree", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true,
        unique: true,
      },
      tree_id_by_user: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      farm_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "user_farms",
          key: "id",
        },
      },
      zone_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "geofences",
          key: "id",
        },
      },
      additional_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lat: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      lon: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      location_information: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tree_type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "tree_type",
          key: "id",
        },
      },
      tree_species_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "tree_species",
          key: "id",
        },
      },
      date_planted: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      additional_note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      program_type: {
        type: Sequelize.JSON, // stored multiple values of option ID
        allowNull: true,
      },
      health_condition: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "options",
          key: "id",
        },
      },
      record_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("my_tree");
  },
};
