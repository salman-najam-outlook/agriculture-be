const EsgReportTemplate = require('../../mongoose-models/esg-report/EsgReportTemplate');
const mongoose = require('mongoose');

const findEsgReportTemplates = async (organizationId) => {
  const templates = await EsgReportTemplate.find({
      organizationId: new mongoose.Types.ObjectId(organizationId)
    }).exec();
    return templates;
}

const findEsgReportTemplateById = async (templateId) => {
  return await EsgReportTemplate.findById(templateId).exec();
};

const createEsgReportTemplate = async (data) => {
  const template = await EsgReportTemplate.create(data);
  return template;
};

const updateEsgReportTemplate = async (templateId, data) => {
  const template = await EsgReportTemplate.findByIdAndUpdate(
    templateId,
    { $set: data },
    { new: true }
  ).exec();
  return template;
};

const deleteEsgReportTemplateById = async (templateId) => {
  const template = await EsgReportTemplate.findByIdAndUpdate(
    templateId,
    { deletedAt: new Date() },
    { new: true }
  ).exec();
  return template;
};

module.exports = {
  findEsgReportTemplates,
  findEsgReportTemplateById,
  createEsgReportTemplate,
  updateEsgReportTemplate,
  deleteEsgReportTemplateById,
};