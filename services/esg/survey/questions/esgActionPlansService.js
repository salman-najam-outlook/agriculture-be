const esgActionPlan = require('../../../../mongoose-models/survey/questions/esgActionPlans.js');

exports.createActionPlan = async (data) => {
    return await new esgActionPlan(data).save();
};

exports.getAllActionPlans = async () => {
    return await esgActionPlan.find({ deletedAt: null });
};

exports.getActionPlanById = async (id) => {
    return await esgActionPlan.findOne({ _id: id, deletedAt: null });
};

exports.getAllActionPlanByOptionId = async (optionId) => {
    return await esgActionPlan.find({ esgAssessmentQuestionOptionId: optionId, deletedAt: null }).lean();
};

exports.updateActionPlan = async (id, updateData) => {
    return await esgActionPlan.findByIdAndUpdate(
        id,
        { ...updateData, $inc: { __v: 1 } },
        { new: true, runValidators: true }
    );
};

exports.deleteActionPlan = async (id) => {
    return await esgActionPlan.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
};

exports.deleteActionPlansByQuestionOptionId = async (questionOptionId) => {
    return await esgActionPlan.updateMany(
        { esgAssessmentQuestionOptionId: questionOptionId },
        { deletedAt: new Date() }
    );
};