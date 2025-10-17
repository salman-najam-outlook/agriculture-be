const ServiceType = require("../../../mongoose-models/survey/assessments/ServiceType");

exports.createServiceType = async (data) => {
  return await new ServiceType(data).save();
};

exports.getAllServiceTypes = async () => {
  return await ServiceType.find({ deletedAt: null });
};

exports.getServiceTypeById = async (id) => {
  return await ServiceType.findOne({ _id: id, deletedAt: null });
};

exports.updateServiceType = async (id, data) => {
  return await ServiceType.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteServiceType = async (id) => {
  return await ServiceType.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
};