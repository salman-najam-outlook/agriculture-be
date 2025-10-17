"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("organization", "registrationDate", {
      type: Sequelize.DATE,
      allowNull: false,
      after: "splashScreen",
      defaultValue: Sequelize.fn("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("organization", "activationKeysAllowed", {
      type: Sequelize.INTEGER,
      after: "splashScreen",
      allowNull: false,
    });
    await queryInterface.addColumn("organization", "activationKeysUsed", {
      type: Sequelize.INTEGER,
      befafterore: "splashScreen",
      allowNull: true,
    });
    await queryInterface.addColumn("organization", "subscriptionEndDate", {
      type: Sequelize.DATE,
      after: "splashScreen",
      allowNull: true,
    });
    await queryInterface.addColumn("organization", "paymentStatus", {
      type: Sequelize.ENUM("paid", "inpaid", "pending"),
      after: "splashScreen",
      defaultValue: "pending",
      allowNull: false,
    });
    await queryInterface.addColumn("organization", "status", {
      type: Sequelize.ENUM("inProcess", "active", "deactivated"),
      after: "splashScreen",
      defaultValue: "deactivated",
      allowNull: false,
    });
    await queryInterface.addColumn("organization", "planId", {
      type: Sequelize.INTEGER,
      after: "splashScreen",
      allowNull: true,
    });
    await queryInterface.addColumn("organization", "dimitraPointSystem", {
      type: Sequelize.BOOLEAN,
      after: "splashScreen",
      defaultValue: false,
      allowNull: false,
    });
    await queryInterface.addColumn("organization", "satelliteReportsAllowed", {
      type: Sequelize.INTEGER,
      after: "planId",
      allowNull: true,
    });
    await queryInterface.addColumn("organization", "advancedReportsAllowed", {
      type: Sequelize.INTEGER,
      after: "planId",
      allowNull: true,
    });
    await queryInterface.addColumn("organization", "weatherReportsAllowed", {
      type: Sequelize.INTEGER,
      after: "planId",
      allowNull: true,
    });
    await queryInterface.addColumn("organization", "isDeleted", {
      type: Sequelize.BOOLEAN,
      after: "createdAt",
      allowNull: true,
      defaultValue: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("organization", "registrationDate");
    await queryInterface.removeColumn("organization", "activationKeysAllowed");
    await queryInterface.removeColumn("organization", "activationKeysUsed");
    await queryInterface.removeColumn("organization", "subscriptionEndDate");
    await queryInterface.removeColumn("organization", "paymentStatus");
    await queryInterface.removeColumn("organization", "status");
    await queryInterface.removeColumn("organization", "planId");
    await queryInterface.removeColumn("organization", "dimitraPointSystem");
    await queryInterface.removeColumn("organization", "weatherReportsAllowed");
    await queryInterface.removeColumn("organization", "advancedReportsAllowed");
    await queryInterface.removeColumn(
      "organization",
      "satelliteReportsAllowed"
    );
    await queryInterface.removeColumn("organization", "isDeleted");
  },
};
