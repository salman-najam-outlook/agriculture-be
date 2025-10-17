"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pest_managements", "startOfPestControl", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn("pest_managements", "pestControlDuration", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn(
      "pest_managements",
      "culturalManualMethodId",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "pest_cultural_manual_methods",
          key: "id",
        },
      }
    );
    await queryInterface.addColumn(
      "pest_managements",
      "culturalManualMethodArea",
      {
        type: Sequelize.DOUBLE,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      "pest_managements",
      "culturalManualMethodAreaUnitId",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
    await queryInterface.addColumn("pest_managements", "chemicalInsecticides", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("pest_managements", "chemicalAppliedArea", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    await queryInterface.addColumn(
      "pest_managements",
      "chemicalAppliedAreaUnitId",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
    await queryInterface.addColumn(
      "pest_managements",
      "insecticideActiveIngredients",
      {
        allowNull: true,
        type: Sequelize.STRING,
      }
    );
    await queryInterface.addColumn("pest_managements", "totalInsecticideUsed", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    await queryInterface.addColumn(
      "pest_managements",
      "totalInsecticideUsedUnitId",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
    await queryInterface.addColumn("pest_managements", "insecticideDose", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
    await queryInterface.addColumn(
      "pest_managements",
      "insecticideDoseUnitId",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
    await queryInterface.addColumn("pest_managements", "insecticideEfficacy", {
      type: Sequelize.DOUBLE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {},
};
