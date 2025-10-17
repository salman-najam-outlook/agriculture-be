"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("my_tree_images", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      my_tree_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Nullable because it can be linked to MyTree
        references: {
          model: "my_tree",
          key: "id",
        },
      },
      my_tree_history_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Nullable because it can be linked to MyTreeHistory
        references: {
          model: "my_tree_history",
          key: "id",
        },
      },
      file_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      s3_key: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("my_tree_images");
  },
};
