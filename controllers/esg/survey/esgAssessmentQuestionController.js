const { logErrorOccurred } = require(rootPath + '/helpers/general');
const { success, error } = require(rootPath + '/helpers/language');
const esgAssessmentQuestionService = require('../../..//services/esg/survey/esgAssessmentQuestionService.js');
const { successResp, serverError, successRespSync, errorResp } = require(rootPath + '/helpers/api');

exports.createQuestion = async (req, res) => {
    try {
        const newQuestion = await esgAssessmentQuestionService.createQuestion(req.body, req.user);
        return res.status(201).json(
            await successRespSync(
                {
                    msg: success.CREATED,
                    data: newQuestion, statusCode: 201
                })
        );
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await esgAssessmentQuestionService.getAllQuestions();
        return res.json(
            await successResp({
                msg: success.FETCH,
                data: questions
            }));
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.getQuestionById = async (req, res, next) => {
    try {
        const question = await esgAssessmentQuestionService.getQuestionById(req.params.id);
        if (!question) {
            return res.status(404).json(
                await errorResp({
                    msg: error.NOT_FOUND,
                    code: 404
                }));
        }

        res.locals.data = question;
        next();
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await esgAssessmentQuestionService.updateQuestion(req.params.id, req.body, req.user);
        if (!updatedQuestion) {
            return res.status(404).json(
                await errorResp({
                    msg: error.NOT_FOUND,
                    code: 404
                }));
        }
        return res.json(
            await successResp({
            msg: success.UPDATED,
            data: updatedQuestion,
            code: 200
        }));
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await esgAssessmentQuestionService.deleteQuestion(req.params.id, req.user);
        if (!deletedQuestion) {
            return res.status(404).json(
                await errorResp({
                    msg: error.NOT_FOUND,
                    code: 404
                }));
        }
        return res.json(
            await successRespSync({
                msg: success.DELETED
            }));
    } catch (err) {
        logErrorOccurred(__filename, err);
        return serverError(res, err);
    }
};

/**
 * @description Handles the submission of an assessment question with related options, GetData fields, and Action Plans.
 */
exports.submitAssessmentQuestion = async (req, res) => {
    try {
        const { question, options = [] } = req.body;

        if (!question || !question.esgAssessmentId) {
            return res.status(400).json(
                await errorResp({ msg: "Invalid request. Question data and assessment ID are required.", code: 400 })
            );
        }

        // Call the service to handle transaction logic
        const response = await esgAssessmentQuestionService.submitAssessmentQuestion(question, options, req.user);

        return res.status(201).json(await successRespSync(response));
    } catch (err) {
        console.error("Error in submitAssessmentQuestion:", err);
        return serverError(res, err);
    }
};