const EsgReport = require('../../mongoose-models/esg-report/EsgReport');
const mongoose = require('mongoose');

const findEsgReports = async (organizationId) => {
  const reports = await EsgReport.find({
    organizationId: new mongoose.Types.ObjectId(organizationId)
  }).populate('templateId').exec();
  return reports;
};

const findEsgReportById = async (reportId) => {
  return await EsgReport.findById(reportId).exec();
};

const createEsgReport = async (data) => {
  const report = await EsgReport.create(data);
  return report;
};

const updateEsgReport = async (reportId, data) => {
  const report = await EsgReport.findByIdAndUpdate(
    reportId,
    { $set: data },
    { new: true }
  ).exec();
  return report;
};

const deleteEsgReportById = async (reportId) => {
  const report = await EsgReport.findByIdAndUpdate(
    reportId,
    { deletedAt: new Date() },
    { new: true }
  ).exec();
  return report;
};

module.exports = {
  findEsgReports,
  findEsgReportById,
  createEsgReport,
  updateEsgReport,
  deleteEsgReportById,
};