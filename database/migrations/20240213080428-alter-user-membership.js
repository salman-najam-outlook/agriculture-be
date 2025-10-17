'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("user_membership","feeUnitType",{
      type:Sequelize.STRING,
      allowNull:true,
    });

    await queryInterface.addColumn("user_membership","allowed_users",{
      type:Sequelize.INTEGER,
      allowNull:true,
    })

    await queryInterface.addColumn("user_membership","allowed_farms",{
      type:Sequelize.INTEGER,
      allowNull:true,
    })

    await queryInterface.addColumn("user_membership","advanceReportTypeUnit",{
      type:Sequelize.STRING,
      allowNull:true,
    })

    await queryInterface.addColumn("user_membership","advancedReportUnit",{
      type:Sequelize.STRING,
      allowNull:true,
    })

    await queryInterface.addColumn("user_membership","satelliteReportTypeUnit",{
      type:Sequelize.STRING,
      allowNull:true,
    })


    await queryInterface.addColumn("user_membership","deforestationReport",{
      type:Sequelize.INTEGER,
      allowNull:true,
    })

    await queryInterface.addColumn("user_membership","deforestationReportTypeUnit",{
      type:Sequelize.STRING,
      allowNull:true,
    })

    await queryInterface.addColumn("user_membership","deforestationReportUnit",{
      type:Sequelize.STRING,
      allowNull:true,
    })

    await queryInterface.addColumn("user_membership","basicFarmLevelReport",{
      type:Sequelize.INTEGER,
      allowNull:true,
    })

    await queryInterface.addColumn("user_membership","advancedFarmLevelReport",{
      type:Sequelize.INTEGER,
      allowNull:true,
    })
    await queryInterface.addColumn("user_membership","largeAreaReport",{
      type:Sequelize.INTEGER,
      allowNull:true,
    })
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
