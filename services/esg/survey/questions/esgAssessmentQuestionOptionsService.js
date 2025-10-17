const esgActionPlanService = require('../../../../services/esg/survey/questions/esgActionPlansService.js');
const esgGetDataQuestionService = require('../../../../services/esg/survey/questions/esgGetDataQuestionService.js');
const esgAssessmentQuestionOption = require('../../../../mongoose-models/survey/questions/esgAssessmentQuestionOptions.js');

exports.createQuestionOption = async (data) => {
    return await new esgAssessmentQuestionOption(data).save();
};

exports.getAllQuestionOptions = async () => {
    return await esgAssessmentQuestionOption.find({ deletedAt: null });
};

exports.getQuestionOptionById = async (id) => {
    return await esgAssessmentQuestionOption.findOne({ _id: id, deletedAt: null });
};

exports.updateQuestionOption = async (id, updateData) => {
    return await esgAssessmentQuestionOption.findByIdAndUpdate(
        id,
        { ...updateData, $inc: { __v: 1 } },
        { new: true, runValidators: true }
    );
};

exports.deleteQuestionOption = async (id) => {
    // Soft delete the question option
    const deletedOption = await esgAssessmentQuestionOption.findByIdAndUpdate(
        id,
        { deletedAt: new Date() },
        { new: true }
    );

    if (!deletedOption) return null;

   // Call to delete related GetDataQuestions & ActionPlans
    await esgGetDataQuestionService.deleteGetDataByQuestionOptionId(id);
    await esgActionPlanService.deleteActionPlansByQuestionOptionId(id);

    return deletedOption;
};