'use strict';
const moment = require('moment');
const { comprehensiveReportTypeData } = require("../../helpers/consts");
module.exports = {
  async up (queryInterface, Sequelize) {
    let comprehensiveReportTypeSeed=[];
    comprehensiveReportTypeData.forEach((data) =>
    comprehensiveReportTypeSeed.push({
        cropName: data.cropName,
        fileS3Key: data.fileS3Key,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      })
    );
    await queryInterface.bulkInsert("comprehensnsive_analysis_reports", comprehensiveReportTypeSeed, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comprehensnsive_analysis_reports', null, {});
  }
};

