const mongoose = require('mongoose');
const esgAssessment = require('../../../mongoose-models/survey/assessments/esgAssessment.js');
const esgActionPlan = require('../../../mongoose-models/survey/questions/esgActionPlans.js');
const esgGetDataQuestion = require(rootPath + '/mongoose-models/survey/questions/esgGetDataQuestion.js');
const esgAssessmentQuestion = require('../../../mongoose-models/survey/assessments/esgAssessmentQuestion.js');
const esgAssessmentQuestionOption = require('../../../mongoose-models/survey/questions/esgAssessmentQuestionOptions.js');
const esgGetDataQuestionService = require('../../esg/survey/questions/esgGetDataQuestionService.js');
const esgActionPlanService = require('../../esg/survey/questions/esgActionPlansService.js');


exports.createQuestion = async (data, user) => {
    const { esgHeadingId, esgAssessmentId } = data;

    const questionCount = await esgAssessmentQuestion.countDocuments({ esgAssessmentId, esgHeadingId });

    const order = questionCount + 1;

    const newQuestion = new esgAssessmentQuestion({
        ...data,
        order,
        createdByUser: user.mongoId,
        _clientMetadata: user.clientMetadata,
    });

    return await newQuestion.save();
};

exports.getAllQuestions = async () => {
    return await esgAssessmentQuestion.find({ deletedAt: null });
};

exports.getAllQuestionsByQuestionHeadingId = async (esgHeadingId) => {
    return await esgAssessmentQuestion.find({ esgHeadingId,  deletedAt: null }).sort({ order: 1 });
};

exports.getQuestionById = async (id) => {
    const question = await esgAssessmentQuestion.findOne({ _id: id, deletedAt: null }).lean();

    if (!question) {
        return { success: false, message: "Question not found" };
    }

    const questionOptions = await esgAssessmentQuestionOption.find({ esgAssessmentQuestionId: id, deletedAt: null }).lean();

    let options = [];

    if (questionOptions.length > 0) {
        options = await Promise.all(
            questionOptions.map(async (option) => {
                const getData = await esgGetDataQuestionService.getAllGetDataQuestionsByOptionId(option._id);
                const actionPlans = await esgActionPlanService.getAllActionPlanByOptionId(option._id);
                return { ...option, getData, actionPlans };
            })
        );
    }

    // Fetch GetData for "get-data" questions type
    let questionGetData = [];
    if (question.questionType === "get-data") {
        questionGetData = await esgGetDataQuestionService.getAllGetDataQuestionsByQuestionId(question._id);
    }

    return { question: { ...question, getData: questionGetData }, options };
};

exports.updateQuestion = async (questionId, updateData, user) => {
    try {
        const updatedQuestion = await esgAssessmentQuestion.findByIdAndUpdate(
            questionId,
            { ...updateData.question, $inc: { __v: 1 }, lastModifiedByUser: user.mongoId, _clientMetadata: user.clientMetadata },
            { new: true, runValidators: true }
        );

        if (!updatedQuestion) {
            throw new Error("Question not found.");
        }

        const incomingOptions = updateData.options || [];

        const updatePromises = incomingOptions
            .filter(option => option._id)
            .map(option => 
                esgAssessmentQuestionOption.findByIdAndUpdate(
                    option._id,
                    { ...option, $inc: { __v: 1 } },
                    { new: true, runValidators: true }
                )
            );

        await Promise.all(updatePromises);

        return { success: true, message: "Question and options updated successfully." };

    } catch (error) {
        console.error("Error updating question and options:", error);
        throw new Error("Failed to update question and options.");
    }
};

// Soft Delete ESG Assessment Question and related data
exports.deleteQuestion = async (id, user) => {
    const deletedQuestion = await esgAssessmentQuestion.findByIdAndUpdate(id, { deletedAt: new Date(), lastModifiedByUser: user.mongoId, _clientMetadata: user.clientMetadata }, { new: true });

    if (deletedQuestion) {
        // Soft delete related QuestionOptions
        await esgAssessmentQuestionOption.updateMany({ esgAssessmentQuestionId: id }, { deletedAt: new Date() });

        // Soft delete related GetDataQuestions
        await esgGetDataQuestion.updateMany({ esgAssessmentQuestionId: id }, { deletedAt: new Date() });

        // Soft delete related ActionPlans
        await esgActionPlan.updateMany({ esgAssessmentQuestionId: id }, { deletedAt: new Date() });
    }

    return deletedQuestion;
};

/**
 * Handles the submission of an assessment question along with its options, Get Data fields, and Action Plans.
 * Ensures that all operations succeed together or none are committed.
 */
exports.submitAssessmentQuestion = async (questionData, options = [], user) => {
    try {
        const newQuestion = await this.createQuestion(questionData, user);

        const questionOptions = [];
        const getDataEntries = [];
        const actionPlans = [];

        if (questionData.questionType === "get-data" && questionData.getData) {
            questionData.getData.forEach(getData => {
                getDataEntries.push({
                    ...getData,
                    esgAssessmentQuestionId: newQuestion._id,
                    esgAssessmentQuestionOptionId: null,
                    createdBy: getData.createdBy || questionData.createdBy,
                    orgId: getData.orgId || questionData.orgId
                });
            });
        }

        options.forEach(option => {
            // Generate unique ObjectId for referencing
            const optionId = new mongoose.Types.ObjectId();

            questionOptions.push({
                ...option,
                _id: optionId,
                esgAssessmentQuestionId: newQuestion._id,
                createdBy: option.createdBy || questionData.createdBy,
                orgId: option.orgId || questionData.orgId
            });

            if (option.getData && option.getData.length > 0) {
                option.getData.forEach(getData => {
                    getDataEntries.push({
                        ...getData,
                        esgAssessmentQuestionId: newQuestion._id,
                        esgAssessmentQuestionOptionId: optionId,
                        createdBy: getData.createdBy || questionData.createdBy,
                        orgId: getData.orgId || questionData.orgId
                    });
                });
            }

            if (option.actionPlans && option.actionPlans.length > 0) {
                option.actionPlans.forEach(actionPlan => {
                    actionPlans.push({
                        ...actionPlan,
                        esgAssessmentQuestionId: newQuestion._id,
                        esgAssessmentQuestionOptionId: optionId,
                        createdBy: actionPlan.createdBy || questionData.createdBy,
                        orgId: actionPlan.orgId || questionData.orgId
                    });
                });
            }
        });

        // Question Options, GetData, and Action Plans
        if (questionOptions.length > 0) await esgAssessmentQuestionOption.insertMany(questionOptions);
        if (getDataEntries.length > 0) await esgGetDataQuestion.insertMany(getDataEntries);
        if (actionPlans.length > 0) await esgActionPlan.insertMany(actionPlans);

        return {
            success: true,
            msg: "Assessment Question and related data successfully created.",
            data: {newQuestion}
        };
    } catch (err) {
        console.error("Error in submitAssessmentQuestion:", err);
        throw new Error("Failed to submit assessment question.");
    }
};