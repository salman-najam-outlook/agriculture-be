const esgGetDataQuestion = require('../../../../mongoose-models/survey/questions/esgGetDataQuestion.js');

exports.createGetDataQuestion = async (data) => {
    return await new esgGetDataQuestion(data).save();
};

exports.getAllGetDataQuestions = async () => {
    return await esgGetDataQuestion.find({ deletedAt: null });
};

exports.getAllGetDataQuestionsByOptionId = async (optionId) => {
    return await esgGetDataQuestion.find({ esgAssessmentQuestionOptionId: optionId, deletedAt: null }).lean();
};

exports.getAllGetDataQuestionsByQuestionId = async (questionId) => {
    return await esgGetDataQuestion.find({ esgAssessmentQuestionId: questionId, esgAssessmentQuestionOptionId: null, deletedAt: null });
};

exports.getGetDataQuestionById = async (id) => {
    return await esgGetDataQuestion.findOne({ _id: id, deletedAt: null });
};

exports.updateGetDataQuestion = async (id, updateData) => {
    return await esgGetDataQuestion.findByIdAndUpdate(
        id,
        { ...updateData, $inc: { __v: 1 } }, 
        { new: true, runValidators: true }
    );
};

exports.deleteGetDataQuestion = async (id) => {
    return await esgGetDataQuestion.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
};

exports.deleteGetDataByQuestionOptionId = async (questionOptionId) => {
    return await esgGetDataQuestion.updateMany(
        { esgAssessmentQuestionOptionId: questionOptionId },
        { deletedAt: new Date() }
    );
};